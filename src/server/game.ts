import "server-only";
import { and, asc, eq, isNotNull, isNull, sql } from "drizzle-orm";
import { db } from "@/db";
import {
  answerAliases,
  answers,
  attempts,
  categories,
  dailyPuzzles,
  games,
  players,
  puzzleCategories,
  rounds,
  skins,
} from "@/db/schema";
import { buildIndex, fold, match, type MatchIndex } from "@/lib/matcher";
import { blendedShare, scoreKm, speedFor, tierFor } from "@/lib/scoring";
import { dayNumber, localDate } from "@/lib/day";
import { compareDay, type DayCompare } from "@/lib/compare";
import type { SkinConfig } from "@/skins/types";

// Odgovor stigne s malim kašnjenjem mreže; toliko tolerancije na serveru.
const GRACE_MS = 2500;
const CACHE_MS = 60_000;

export type Skin = { id: string; name: string; timezone: string; launchDate: string; config: SkinConfig };

const skinCache = new Map<string, { at: number; skin: Skin }>();
export async function getSkin(id: string): Promise<Skin> {
  const hit = skinCache.get(id);
  if (hit && Date.now() - hit.at < CACHE_MS) return hit.skin;
  const [skin] = await db.select().from(skins).where(eq(skins.id, id));
  if (!skin) throw new Error(`Nepoznat skin: ${id}`);
  skinCache.set(id, { at: Date.now(), skin });
  return skin;
}

type CategoryData = { id: number; title: string; hint: string | null; group: string; index: MatchIndex; prior: Map<number, number>; rare: Set<number> };
const categoryCache = new Map<number, { at: number; data: CategoryData }>();

async function getCategory(id: number): Promise<CategoryData> {
  const hit = categoryCache.get(id);
  if (hit && Date.now() - hit.at < CACHE_MS) return hit.data;
  const [cat] = await db.select().from(categories).where(eq(categories.id, id));
  const rows = await db
    .select({ id: answers.id, canonical: answers.canonical, prior: answers.priorShare, rare: answers.rare, alias: answerAliases.alias })
    .from(answers)
    .leftJoin(answerAliases, eq(answerAliases.answerId, answers.id))
    .where(eq(answers.categoryId, id))
    .orderBy(asc(answers.id));
  const byId = new Map<number, { id: number; canonical: string; variants: string[] }>();
  const prior = new Map<number, number>();
  const rare = new Set<number>();
  for (const r of rows) {
    if (r.rare) rare.add(r.id);
    if (!byId.has(r.id)) byId.set(r.id, { id: r.id, canonical: r.canonical, variants: [] });
    if (r.alias) byId.get(r.id)!.variants.push(r.alias);
    prior.set(r.id, r.prior);
  }
  const data = { id, title: cat.title, hint: cat.hint, group: cat.group, index: buildIndex([...byId.values()], cat.strip), prior, rare };
  categoryCache.set(id, { at: Date.now(), data });
  return data;
}

/** Zagonetka za dan; ako ne postoji, slaže je iz najdulje nekorištenih aktivnih kategorija. */
export async function getOrCreatePuzzle(skin: Skin, date: string) {
  const existing = await loadPuzzle(skin.id, date);
  if (existing) return existing;

  const pattern = skin.config.dailyPattern;
  const lastUsed = db
    .select({ categoryId: puzzleCategories.categoryId, last: sql<string>`max(${dailyPuzzles.date})`.as("last") })
    .from(puzzleCategories)
    .innerJoin(dailyPuzzles, eq(dailyPuzzles.id, puzzleCategories.puzzleId))
    .groupBy(puzzleCategories.categoryId)
    .as("last_used");
  const pool = await db
    .select({ id: categories.id, group: categories.group })
    .from(categories)
    .leftJoin(lastUsed, eq(lastUsed.categoryId, categories.id))
    .where(and(eq(categories.skinId, skin.id), eq(categories.active, true)))
    .orderBy(sql`${lastUsed.last} asc nulls first`, sql`random()`);

  const picked: number[] = [];
  for (const group of pattern) {
    const c = pool.find((p) => p.group === group && !picked.includes(p.id));
    if (!c) throw new Error(`Nema dovoljno aktivnih kategorija u grupi ${group}`);
    picked.push(c.id);
  }

  await db.transaction(async (tx) => {
    const [p] = await tx
      .insert(dailyPuzzles)
      .values({ skinId: skin.id, date, number: dayNumber(skin.launchDate, date) })
      .onConflictDoNothing()
      .returning();
    if (!p) return; // netko drugi ju je upravo napravio
    await tx.insert(puzzleCategories).values(picked.map((categoryId, position) => ({ puzzleId: p.id, position, categoryId })));
  });
  return (await loadPuzzle(skin.id, date))!;
}

async function loadPuzzle(skinId: string, date: string) {
  const [p] = await db
    .select()
    .from(dailyPuzzles)
    .where(and(eq(dailyPuzzles.skinId, skinId), eq(dailyPuzzles.date, date)));
  if (!p) return null;
  const cats = await db
    .select()
    .from(puzzleCategories)
    .where(eq(puzzleCategories.puzzleId, p.id))
    .orderBy(asc(puzzleCategories.position));
  if (!cats.length) return null;
  return { ...p, categoryIds: cats.map((c) => c.categoryId) };
}

type Puzzle = NonNullable<Awaited<ReturnType<typeof loadPuzzle>>>;

export async function ensurePlayer(id: string) {
  await db
    .insert(players)
    .values({ id })
    .onConflictDoUpdate({ target: players.id, set: { lastSeenAt: new Date() } });
}

async function findGame(playerId: string, puzzleId: number) {
  const [g] = await db
    .select()
    .from(games)
    .where(and(eq(games.playerId, playerId), eq(games.puzzleId, puzzleId)));
  return g ?? null;
}

// ---------- Stanje za klijenta ----------

export type RoundView = {
  position: number;
  category: { title: string; hint: string | null; group: string };
  raw: string | null;
  canonical: string | null;
  share: number | null;
  km: number;
  tier: string;
  emoji: string;
  icon?: string;
  speed: { multiplier: number; emoji: string; name: string } | null; // samo kad je brzina promijenila km
};

export type GameState = {
  skin: { id: string; timezone: string; config: SkinConfig };
  date: string;
  number: number;
  perDay: number;
  phase: "intro" | "play" | "reveal" | "end";
  totalKm: number;
  rounds: RoundView[];
  current?: { position: number; category: { title: string; hint: string | null; group: string }; remainingMs: number };
  reveal?: Reveal;
};

export type Reveal = { top: { canonical: string; share: number }[]; rare: { canonical: string; share: number }[] };

// stari nazivi tierova (prije Bajsa i Motora) se prepoznaju po udjelu
function baseTier(cfg: SkinConfig, tier: string, share: number | null) {
  return cfg.tiers.find((t) => t.name === tier) ?? (share !== null ? tierFor(cfg, share) : null);
}

export async function getState(skin: Skin, playerId: string | null): Promise<GameState> {
  const date = localDate(skin.timezone);
  const puzzle = await getOrCreatePuzzle(skin, date);
  const base = {
    skin: { id: skin.id, timezone: skin.timezone, config: skin.config },
    date,
    number: puzzle.number,
    perDay: puzzle.categoryIds.length,
  };
  const game = playerId ? await findGame(playerId, puzzle.id) : null;
  if (!game) return { ...base, phase: "intro", totalKm: 0, rounds: [] };

  await expireOpenRound(skin, puzzle, game.id);
  const rows = await db
    .select({ r: rounds, canonical: answers.canonical })
    .from(rounds)
    .leftJoin(answers, eq(answers.id, rounds.answerId))
    .where(eq(rounds.gameId, game.id))
    .orderBy(asc(rounds.position));

  const views: RoundView[] = [];
  let current: GameState["current"];
  for (const { r, canonical } of rows) {
    const cat = await getCategory(r.categoryId);
    const category = { title: cat.title, hint: cat.hint, group: cat.group };
    if (r.answeredAt) {
      const base = r.answerId !== null ? baseTier(skin.config, r.tier ?? "", r.share) : null;
      const step = speedFor(skin.config, r.answeredAt.getTime() - r.startedAt.getTime());
      views.push({
        position: r.position,
        category,
        raw: r.raw,
        canonical,
        share: r.share,
        km: r.km ?? 0,
        tier: r.tier ?? skin.config.miss.name,
        emoji: base?.emoji ?? skin.config.miss.emoji,
        icon: base?.icon,
        speed: base && r.km !== base.km && step.multiplier !== 1 ? { multiplier: step.multiplier, emoji: step.emoji, name: step.name } : null,
      });
    } else {
      const remainingMs = skin.config.secondsPerCategory * 1000 - (Date.now() - r.startedAt.getTime());
      current = { position: r.position, category, remainingMs: Math.max(0, remainingMs) };
    }
  }
  const totalKm = views.reduce((a, v) => a + v.km, 0);
  if (current) return { ...base, phase: "play", totalKm, rounds: views, current };
  if (views.length >= base.perDay) return { ...base, phase: "end", totalKm, rounds: views };
  if (!views.length) return { ...base, phase: "intro", totalKm, rounds: views };
  const last = views[views.length - 1];
  return { ...base, phase: "reveal", totalKm, rounds: views, reveal: await buildReveal(skin, puzzle, rows[last.position].r.categoryId, last.canonical) };
}

// ---------- Akcije ----------

/** Počinje sljedeću kategoriju (ili vraća već otvorenu). Server pamti vrijeme početka. */
export async function startNext(skin: Skin, playerId: string): Promise<GameState> {
  await ensurePlayer(playerId);
  const puzzle = await getOrCreatePuzzle(skin, localDate(skin.timezone));
  await db.insert(games).values({ playerId, puzzleId: puzzle.id }).onConflictDoNothing();
  const game = (await findGame(playerId, puzzle.id))!;
  await expireOpenRound(skin, puzzle, game.id);

  const existing = await db.select().from(rounds).where(eq(rounds.gameId, game.id));
  const open = existing.find((r) => !r.answeredAt);
  if (!open && existing.length < puzzle.categoryIds.length) {
    const position = existing.length;
    await db
      .insert(rounds)
      .values({ gameId: game.id, position, categoryId: puzzle.categoryIds[position] })
      .onConflictDoNothing();
  }
  return getState(skin, playerId);
}

export type AnswerResult =
  | { status: "rejected"; normalized: string }
  | { status: "scored"; state: GameState }
  | { status: "no-round" };

/**
 * Upis odgovora za otvorenu kategoriju. Nepoznat odgovor se odbija dok ima vremena (igrač pokušava opet);
 * final=true (isteklo vrijeme na klijentu) ili isteklo vrijeme na serveru boduje kao promašaj.
 */
export async function submitAnswer(skin: Skin, playerId: string, raw: string, final: boolean): Promise<AnswerResult> {
  const puzzle = await getOrCreatePuzzle(skin, localDate(skin.timezone));
  const game = await findGame(playerId, puzzle.id);
  if (!game) return { status: "no-round" };
  const [open] = await db
    .select()
    .from(rounds)
    .where(and(eq(rounds.gameId, game.id), isNull(rounds.answeredAt)));
  if (!open) return { status: "no-round" };

  const input = raw.trim().slice(0, 200);
  const cat = await getCategory(open.categoryId);
  const elapsedMs = Date.now() - open.startedAt.getTime();
  const timedOut = elapsedMs > skin.config.secondsPerCategory * 1000 + GRACE_MS;
  const hit = input && !timedOut ? match(cat.index, input) : null;

  if (input) {
    await db.insert(attempts).values({
      gameId: game.id,
      position: open.position,
      categoryId: open.categoryId,
      raw: input,
      normalized: fold(input),
      answerId: hit?.id ?? null,
      accepted: !!hit,
      timedOut,
      elapsedMs,
    });
  }
  if (!hit && !final && !timedOut) return { status: "rejected", normalized: fold(input) };

  // zakašnjeli upis je spremljen u attempts, ali se boduje kao isteklo vrijeme
  await scoreRound(skin, puzzle, game.id, open.position, open.categoryId, timedOut ? null : input || null, hit?.id ?? null, elapsedMs);
  return { status: "scored", state: await getState(skin, playerId) };
}

/** "Šalje se:" pregled; radi samo za kategoriju koja je igraču trenutno otvorena. */
export async function previewAnswer(skin: Skin, playerId: string, raw: string): Promise<{ canonical: string | null }> {
  const puzzle = await getOrCreatePuzzle(skin, localDate(skin.timezone));
  const game = await findGame(playerId, puzzle.id);
  if (!game) return { canonical: null };
  const [open] = await db
    .select()
    .from(rounds)
    .where(and(eq(rounds.gameId, game.id), isNull(rounds.answeredAt)));
  if (!open) return { canonical: null };
  const cat = await getCategory(open.categoryId);
  return { canonical: match(cat.index, raw.slice(0, 200))?.canonical ?? null };
}

async function expireOpenRound(skin: Skin, puzzle: Puzzle, gameId: number) {
  const limit = skin.config.secondsPerCategory * 1000 + GRACE_MS;
  const [open] = await db
    .select()
    .from(rounds)
    .where(and(eq(rounds.gameId, gameId), isNull(rounds.answeredAt)));
  if (open && Date.now() - open.startedAt.getTime() > limit) {
    await scoreRound(skin, puzzle, gameId, open.position, open.categoryId, null, null, 0);
  }
}

async function scoreRound(
  skin: Skin,
  puzzle: Puzzle,
  gameId: number,
  position: number,
  categoryId: number,
  raw: string | null,
  answerId: number | null,
  elapsedMs: number,
) {
  const cfg = skin.config;
  let share: number | null = null;
  let km = cfg.miss.km;
  let tier = raw ? cfg.miss.name : "Isteklo vrijeme";
  if (answerId !== null) {
    const cat = await getCategory(categoryId);
    const { count, total } = await answerCounts(puzzle.id, categoryId, answerId);
    share = blendedShare(cat.prior.get(answerId) ?? 0, count, total, cfg.priorWeight);
    const scored = scoreKm(cfg, share, elapsedMs, cat.rare.has(answerId));
    km = scored.km;
    tier = scored.tier.name;
  }
  await db.transaction(async (tx) => {
    const updated = await tx
      .update(rounds)
      .set({ answeredAt: new Date(), raw, answerId, share, km, tier })
      .where(and(eq(rounds.gameId, gameId), eq(rounds.position, position), isNull(rounds.answeredAt)))
      .returning();
    if (!updated.length) return; // već bodovano (dvostruki klik)
    if (position === puzzle.categoryIds.length - 1) {
      const [{ total }] = await tx
        .select({ total: sql<number>`coalesce(sum(${rounds.km}), 0)::int` })
        .from(rounds)
        .where(eq(rounds.gameId, gameId));
      await tx.update(games).set({ finishedAt: new Date(), totalKm: total }).where(eq(games.id, gameId));
    }
  });
}

/** Koliko je igrača tog dana u kategoriji dalo ovaj odgovor, od svih s prihvaćenim odgovorom. */
async function answerCounts(puzzleId: number, categoryId: number, answerId: number) {
  const [row] = await db
    .select({
      count: sql<number>`count(*) filter (where ${rounds.answerId} = ${answerId})::int`,
      total: sql<number>`count(*)::int`,
    })
    .from(rounds)
    .innerJoin(games, eq(games.id, rounds.gameId))
    .where(and(eq(games.puzzleId, puzzleId), eq(rounds.categoryId, categoryId), isNotNull(rounds.answerId)));
  return row;
}

/** Svi odgovori kategorije s udjelom za taj dan, od najčešćeg prema najrjeđem. */
async function categoryShares(skin: Skin, puzzleId: number, categoryId: number) {
  const cat = await getCategory(categoryId);
  const counts = await db
    .select({ answerId: rounds.answerId, n: sql<number>`count(*)::int` })
    .from(rounds)
    .innerJoin(games, eq(games.id, rounds.gameId))
    .where(and(eq(games.puzzleId, puzzleId), eq(rounds.categoryId, categoryId), isNotNull(rounds.answerId)))
    .groupBy(rounds.answerId);
  const byId = new Map(counts.map((c) => [c.answerId!, c.n]));
  const total = counts.reduce((a, c) => a + c.n, 0);
  return cat.index.answers
    .map((a) => ({ canonical: a.canonical, rare: cat.rare.has(a.id), share: blendedShare(cat.prior.get(a.id) ?? 0, byId.get(a.id) ?? 0, total, skin.config.priorWeight) }))
    .sort((a, b) => b.share - a.share);
}

async function buildReveal(skin: Skin, puzzle: Puzzle, categoryId: number, mine: string | null): Promise<Reveal> {
  const all = await categoryShares(skin, puzzle.id, categoryId);
  return {
    top: all.slice(0, 4),
    rare: all.filter((a) => a.canonical !== mine).slice(-3).reverse(),
  };
}

export type AnswerList = {
  position: number;
  title: string;
  mine: string | null;
  answers: { canonical: string; share: number; tier: string; km: number }[];
};

/** Svi mogući odgovori jedne današnje kategorije s km koje vrijede; tek kad je igrač završio partiju. */
export async function answerList(skin: Skin, playerId: string, position: number): Promise<AnswerList | null> {
  const puzzle = await getOrCreatePuzzle(skin, localDate(skin.timezone));
  const categoryId = puzzle.categoryIds[position];
  const game = await findGame(playerId, puzzle.id);
  if (categoryId === undefined || !game?.finishedAt) return null;
  const [mine] = await db
    .select({ canonical: answers.canonical })
    .from(rounds)
    .innerJoin(answers, eq(answers.id, rounds.answerId))
    .where(and(eq(rounds.gameId, game.id), eq(rounds.position, position)));
  const cat = await getCategory(categoryId);
  const all = await categoryShares(skin, puzzle.id, categoryId);
  return {
    position,
    title: cat.title,
    mine: mine?.canonical ?? null,
    answers: all.map((a) => {
      const t = tierFor(skin.config, a.share, a.rare);
      return { canonical: a.canonical, share: a.share, tier: t.name, km: t.km };
    }),
  };
}

/** Usporedba s ostalim igračima dana; tek kad je igrač završio partiju. */
export async function dayCompare(skin: Skin, playerId: string): Promise<(DayCompare & { mine: number }) | null> {
  const puzzle = await getOrCreatePuzzle(skin, localDate(skin.timezone));
  const game = await findGame(playerId, puzzle.id);
  if (!game?.finishedAt) return null;
  const rows = await db
    .select({ km: games.totalKm })
    .from(games)
    .where(and(eq(games.puzzleId, puzzle.id), isNotNull(games.finishedAt)));
  return { ...compareDay(skin.config, rows.map((r) => r.km), game.totalKm), mine: game.totalKm };
}

export function clearCategoryCache(id?: number) {
  if (id === undefined) categoryCache.clear();
  else categoryCache.delete(id);
}

/**
 * Naknadno bodovanje: runde koje su završile promašajem s upisom koji se normalizira u `normalized`
 * dobivaju odgovor `answerId`, udio, tier i km; ukupni km završenih partija se preračunava.
 */
export async function rescoreMisses(skin: Skin, categoryId: number, normalized: string, answerId: number): Promise<number> {
  clearCategoryCache(categoryId);
  const misses = await db
    .select({
      gameId: rounds.gameId,
      position: rounds.position,
      raw: rounds.raw,
      puzzleId: games.puzzleId,
      startedAt: rounds.startedAt,
      answeredAt: rounds.answeredAt,
    })
    .from(rounds)
    .innerJoin(games, eq(games.id, rounds.gameId))
    .where(and(eq(rounds.categoryId, categoryId), isNull(rounds.answerId), isNotNull(rounds.raw), isNotNull(rounds.answeredAt)));
  const hits = misses.filter((m) => fold(m.raw!) === normalized);
  if (!hits.length) return 0;

  const cat = await getCategory(categoryId);
  const byPuzzle = new Map<number, typeof hits>();
  for (const h of hits) byPuzzle.set(h.puzzleId, [...(byPuzzle.get(h.puzzleId) ?? []), h]);
  for (const [puzzleId, list] of byPuzzle) {
    await db.transaction(async (tx) => {
      for (const h of list)
        await tx.update(rounds).set({ answerId }).where(and(eq(rounds.gameId, h.gameId), eq(rounds.position, h.position)));
    });
    const { count, total } = await answerCounts(puzzleId, categoryId, answerId);
    const share = blendedShare(cat.prior.get(answerId) ?? 0, count, total, skin.config.priorWeight);
    await db.transaction(async (tx) => {
      for (const h of list) {
        const t = scoreKm(skin.config, share, h.answeredAt!.getTime() - h.startedAt.getTime(), cat.rare.has(answerId));
        await tx
          .update(rounds)
          .set({ share, km: t.km, tier: t.tier.name })
          .where(and(eq(rounds.gameId, h.gameId), eq(rounds.position, h.position)));
        await tx
          .update(games)
          .set({ totalKm: sql`(select coalesce(sum(${rounds.km}), 0) from ${rounds} where ${rounds.gameId} = ${h.gameId})` })
          .where(and(eq(games.id, h.gameId), isNotNull(games.finishedAt)));
      }
    });
  }
  return hits.length;
}
