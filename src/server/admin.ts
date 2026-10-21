import "server-only";
import { and, asc, desc, eq, gte, ilike, inArray, isNotNull, isNull, sql } from "drizzle-orm";
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
  reviewDecisions,
  rounds,
} from "@/db/schema";
import { fold, parseSeedAnswers } from "@/lib/matcher";
import { stationAt } from "@/lib/scoring";
import { computeStats } from "@/lib/stats";
import { dayNumber, localDate } from "@/lib/day";
import { isAdminEmail } from "./accounts";
import { resolveIdentity } from "./player";
import { clearCategoryCache, getOrCreatePuzzle, rescoreMisses, type Skin } from "./game";

/** Id admina ili null. Lokalno se može uključiti ADMIN_DEV_BYPASS=1 (nikad u produkciji). */
export async function requireAdmin(): Promise<{ playerId: string | null } | null> {
  if (process.env.NODE_ENV !== "production" && process.env.ADMIN_DEV_BYPASS === "1") return { playerId: null };
  const { playerId, user } = await resolveIdentity();
  return user && isAdminEmail(user.email) ? { playerId } : null;
}

// ---------- Pregled dana ----------

export async function dayOverview(skin: Skin, date: string) {
  const [puzzle] = await db
    .select()
    .from(dailyPuzzles)
    .where(and(eq(dailyPuzzles.skinId, skin.id), eq(dailyPuzzles.date, date)));
  if (!puzzle) return { date, puzzle: null };

  const [totals] = await db
    .select({
      started: sql<number>`count(*)::int`,
      finished: sql<number>`count(${games.finishedAt})::int`,
      registered: sql<number>`count(${players.authUserId})::int`,
      avgKm: sql<number>`coalesce(round(avg(${games.totalKm}) filter (where ${games.finishedAt} is not null)), 0)::int`,
    })
    .from(games)
    .innerJoin(players, eq(players.id, games.playerId))
    .where(eq(games.puzzleId, puzzle.id));

  const kms = await db
    .select({ km: games.totalKm })
    .from(games)
    .where(and(eq(games.puzzleId, puzzle.id), isNotNull(games.finishedAt)));
  const stations = new Map<string, number>();
  for (const { km } of kms) {
    const s = stationAt(skin.config, km).name;
    stations.set(s, (stations.get(s) ?? 0) + 1);
  }

  const cats = await db
    .select({ position: puzzleCategories.position, id: categories.id, title: categories.title })
    .from(puzzleCategories)
    .innerJoin(categories, eq(categories.id, puzzleCategories.categoryId))
    .where(eq(puzzleCategories.puzzleId, puzzle.id))
    .orderBy(asc(puzzleCategories.position));

  const top = await db
    .select({ categoryId: rounds.categoryId, canonical: answers.canonical, n: sql<number>`count(*)::int` })
    .from(rounds)
    .innerJoin(games, eq(games.id, rounds.gameId))
    .innerJoin(answers, eq(answers.id, rounds.answerId))
    .where(eq(games.puzzleId, puzzle.id))
    .groupBy(rounds.categoryId, answers.canonical)
    .orderBy(desc(sql`count(*)`));
  const att = await db
    .select({
      categoryId: attempts.categoryId,
      total: sql<number>`count(*)::int`,
      rejected: sql<number>`count(*) filter (where not ${attempts.accepted})::int`,
    })
    .from(attempts)
    .innerJoin(games, eq(games.id, attempts.gameId))
    .where(eq(games.puzzleId, puzzle.id))
    .groupBy(attempts.categoryId);
  const misses = await db
    .select({ categoryId: rounds.categoryId, n: sql<number>`count(*)::int` })
    .from(rounds)
    .innerJoin(games, eq(games.id, rounds.gameId))
    .where(and(eq(games.puzzleId, puzzle.id), isNull(rounds.answerId), isNotNull(rounds.answeredAt)))
    .groupBy(rounds.categoryId);

  return {
    date,
    puzzle: { number: puzzle.number },
    totals,
    stations: skin.config.stations.map((s) => ({ name: s.name, n: stations.get(s.name) ?? 0 })).filter((s) => s.n > 0),
    categories: cats.map((c) => {
      const a = att.find((x) => x.categoryId === c.id);
      return {
        ...c,
        top: top.filter((t) => t.categoryId === c.id).slice(0, 8).map(({ canonical, n }) => ({ canonical, n })),
        attempts: a?.total ?? 0,
        rejected: a?.rejected ?? 0,
        misses: misses.find((m) => m.categoryId === c.id)?.n ?? 0,
      };
    }),
  };
}

// ---------- Pregled odbijenih odgovora ----------

export async function reviewQueue(skin: Skin, limit = 200) {
  const rows = await db
    .select({
      categoryId: attempts.categoryId,
      category: categories.title,
      normalized: attempts.normalized,
      n: sql<number>`count(distinct ${attempts.gameId})::int`,
      examples: sql<string[]>`(array_agg(distinct ${attempts.raw}))[1:5]`,
      last: sql<string>`max(${attempts.createdAt})`,
    })
    .from(attempts)
    .innerJoin(categories, eq(categories.id, attempts.categoryId))
    .leftJoin(
      reviewDecisions,
      and(eq(reviewDecisions.categoryId, attempts.categoryId), eq(reviewDecisions.normalized, attempts.normalized)),
    )
    .where(and(eq(categories.skinId, skin.id), eq(attempts.accepted, false), isNull(reviewDecisions.id), sql`${attempts.normalized} <> ''`))
    .groupBy(attempts.categoryId, categories.title, attempts.normalized)
    .orderBy(desc(sql`count(distinct ${attempts.gameId})`), desc(sql`max(${attempts.createdAt})`))
    .limit(limit);
  return rows;
}

export type ReviewAction =
  | { action: "answer"; categoryId: number; normalized: string; canonical: string; priorShare: number }
  | { action: "alias"; categoryId: number; normalized: string; answerId: number; alias: string }
  | { action: "reject"; categoryId: number; normalized: string };

export async function decide(skin: Skin, adminId: string | null, a: ReviewAction) {
  let answerId: number | null = null;
  if (a.action === "answer") {
    const [row] = await db
      .insert(answers)
      .values({ categoryId: a.categoryId, canonical: a.canonical.trim(), priorShare: a.priorShare, source: "review" })
      .onConflictDoUpdate({ target: [answers.categoryId, answers.canonical], set: { source: "review" } })
      .returning();
    answerId = row.id;
    // izvorni zapis igrača kao varijanta, da se prepoznaje i ubuduće
    if (fold(a.canonical) !== a.normalized)
      await db.insert(answerAliases).values({ answerId, alias: a.normalized }).onConflictDoNothing();
  } else if (a.action === "alias") {
    const [ans] = await db.select().from(answers).where(and(eq(answers.id, a.answerId), eq(answers.categoryId, a.categoryId)));
    if (!ans) throw new Error("Odgovor ne pripada kategoriji");
    answerId = ans.id;
    await db.insert(answerAliases).values({ answerId, alias: a.alias.trim() || a.normalized }).onConflictDoNothing();
  }
  const rescored = answerId ? await rescoreMisses(skin, a.categoryId, a.normalized, answerId) : 0;
  clearCategoryCache(a.categoryId);
  await db
    .insert(reviewDecisions)
    .values({ categoryId: a.categoryId, normalized: a.normalized, decision: a.action, answerId, rescored, decidedBy: adminId })
    .onConflictDoUpdate({
      target: [reviewDecisions.categoryId, reviewDecisions.normalized],
      set: { decision: a.action, answerId, rescored, decidedBy: adminId, createdAt: new Date() },
    });
  return { rescored };
}

// ---------- Igrači ----------

export async function playersOverview(skin: Skin) {
  const since = new Date(Date.now() - 14 * 86400000).toISOString().slice(0, 10);
  const daily = await db
    .select({
      date: dailyPuzzles.date,
      players: sql<number>`count(*)::int`,
      registered: sql<number>`count(${players.authUserId})::int`,
      finished: sql<number>`count(${games.finishedAt})::int`,
    })
    .from(games)
    .innerJoin(dailyPuzzles, eq(dailyPuzzles.id, games.puzzleId))
    .innerJoin(players, eq(players.id, games.playerId))
    .where(and(eq(dailyPuzzles.skinId, skin.id), gte(dailyPuzzles.date, since)))
    .groupBy(dailyPuzzles.date)
    .orderBy(desc(dailyPuzzles.date));

  const list = await db
    .select({ id: players.id, nickname: players.nickname, email: players.email, role: players.role, lastSeenAt: players.lastSeenAt })
    .from(players)
    .where(isNotNull(players.authUserId))
    .orderBy(desc(players.lastSeenAt))
    .limit(200);
  const ids = list.map((p) => p.id);
  const played = ids.length
    ? await db
        .select({ playerId: games.playerId, date: dailyPuzzles.date, km: games.totalKm })
        .from(games)
        .innerJoin(dailyPuzzles, eq(dailyPuzzles.id, games.puzzleId))
        .where(and(inArray(games.playerId, ids), isNotNull(games.finishedAt), eq(dailyPuzzles.skinId, skin.id)))
    : [];
  const today = localDate(skin.timezone);
  const [counts] = await db
    .select({ total: sql<number>`count(*)::int`, registered: sql<number>`count(${players.authUserId})::int` })
    .from(players);
  return {
    counts,
    daily,
    players: list.map((p) => ({ ...p, stats: computeStats(played.filter((g) => g.playerId === p.id), today) })),
  };
}

// ---------- Sadržaj ----------

export async function listCategories(skin: Skin) {
  return db
    .select({
      id: categories.id,
      slug: categories.slug,
      title: categories.title,
      hint: categories.hint,
      group: categories.group,
      active: categories.active,
      answers: sql<number>`(select count(*)::int from ${answers} where ${answers.categoryId} = ${categories.id})`,
      lastUsed: sql<string | null>`(select max(${dailyPuzzles.date}) from ${puzzleCategories} join ${dailyPuzzles} on ${dailyPuzzles.id} = ${puzzleCategories.puzzleId} where ${puzzleCategories.categoryId} = ${categories.id})`,
    })
    .from(categories)
    .where(eq(categories.skinId, skin.id))
    .orderBy(asc(categories.group), asc(categories.title));
}

export async function categoryDetail(id: number) {
  const [cat] = await db.select().from(categories).where(eq(categories.id, id));
  if (!cat) return null;
  const rows = await db
    .select({ id: answers.id, canonical: answers.canonical, priorShare: answers.priorShare, source: answers.source, alias: answerAliases.alias })
    .from(answers)
    .leftJoin(answerAliases, eq(answerAliases.answerId, answers.id))
    .where(eq(answers.categoryId, id))
    .orderBy(desc(answers.priorShare), asc(answers.canonical));
  const list: { id: number; canonical: string; priorShare: number; source: string; aliases: string[] }[] = [];
  for (const r of rows) {
    let a = list.find((x) => x.id === r.id);
    if (!a) list.push((a = { id: r.id, canonical: r.canonical, priorShare: r.priorShare, source: r.source, aliases: [] }));
    if (r.alias) a.aliases.push(r.alias);
  }
  return { ...cat, answers: list };
}

const slugify = (s: string) => fold(s).replace(/ /g, "-").slice(0, 40) || "kategorija";

/** Nova kategorija; odgovori u formatu seeda: "Kanonski/varijanta=udio; ..." */
export async function createCategory(skin: Skin, input: { title: string; group: string; hint?: string; strip?: string[]; answers: string }) {
  if (!skin.config.groups[input.group]) throw new Error("Nepoznata grupa");
  const parsed = parseSeedAnswers(input.answers).filter((a) => a.canonical && Number.isFinite(a.share));
  if (!parsed.length) throw new Error("Nema odgovora");
  return db.transaction(async (tx) => {
    const [cat] = await tx
      .insert(categories)
      .values({
        skinId: skin.id,
        slug: `${slugify(input.title)}-${Date.now().toString(36)}`,
        title: input.title.trim(),
        hint: input.hint?.trim() || null,
        group: input.group,
        strip: input.strip ?? [],
      })
      .returning();
    for (const a of parsed) {
      const [ans] = await tx.insert(answers).values({ categoryId: cat.id, canonical: a.canonical, priorShare: a.share }).onConflictDoNothing().returning();
      if (ans && a.variants.length)
        await tx.insert(answerAliases).values(a.variants.map((alias) => ({ answerId: ans.id, alias }))).onConflictDoNothing();
    }
    return cat;
  });
}

export async function updateCategory(id: number, patch: { active?: boolean; title?: string; hint?: string | null }) {
  const set: Partial<typeof categories.$inferInsert> = {};
  if (typeof patch.active === "boolean") set.active = patch.active;
  if (typeof patch.title === "string" && patch.title.trim()) set.title = patch.title.trim();
  if (patch.hint !== undefined) set.hint = patch.hint?.trim() || null;
  if (Object.keys(set).length) await db.update(categories).set(set).where(eq(categories.id, id));
  clearCategoryCache(id);
}

export async function addAnswer(categoryId: number, input: { canonical: string; variants: string[]; priorShare: number }) {
  const [ans] = await db
    .insert(answers)
    .values({ categoryId, canonical: input.canonical.trim(), priorShare: input.priorShare, source: "review" })
    .onConflictDoUpdate({ target: [answers.categoryId, answers.canonical], set: { priorShare: input.priorShare } })
    .returning();
  const variants = input.variants.map((v) => v.trim()).filter(Boolean);
  if (variants.length) await db.insert(answerAliases).values(variants.map((alias) => ({ answerId: ans.id, alias }))).onConflictDoNothing();
  clearCategoryCache(categoryId);
  return ans;
}

// ---------- Raspored ----------

export async function schedule(skin: Skin, days = 14) {
  const today = localDate(skin.timezone);
  const dates = Array.from({ length: days }, (_, i) => {
    const [y, m, d] = today.split("-").map(Number);
    return new Date(Date.UTC(y, m - 1, d + i)).toISOString().slice(0, 10);
  });
  const puzzles = await db
    .select({ id: dailyPuzzles.id, date: dailyPuzzles.date, number: dailyPuzzles.number })
    .from(dailyPuzzles)
    .where(and(eq(dailyPuzzles.skinId, skin.id), inArray(dailyPuzzles.date, dates)));
  const pcs = puzzles.length
    ? await db
        .select({ puzzleId: puzzleCategories.puzzleId, position: puzzleCategories.position, categoryId: puzzleCategories.categoryId, title: categories.title })
        .from(puzzleCategories)
        .innerJoin(categories, eq(categories.id, puzzleCategories.categoryId))
        .where(inArray(puzzleCategories.puzzleId, puzzles.map((p) => p.id)))
        .orderBy(asc(puzzleCategories.position))
    : [];
  const played = puzzles.length
    ? await db
        .select({ puzzleId: games.puzzleId, n: sql<number>`count(*)::int` })
        .from(games)
        .where(inArray(games.puzzleId, puzzles.map((p) => p.id)))
        .groupBy(games.puzzleId)
    : [];
  return dates.map((date) => {
    const p = puzzles.find((x) => x.date === date);
    return {
      date,
      number: dayNumber(skin.launchDate, date),
      games: played.find((x) => x.puzzleId === p?.id)?.n ?? 0,
      categories: p ? pcs.filter((c) => c.puzzleId === p.id).map(({ position, categoryId, title }) => ({ position, categoryId, title })) : null,
    };
  });
}

/** Postavlja kategorije za dan; dozvoljeno samo dok taj dan nitko nije igrao. */
export async function setSchedule(skin: Skin, date: string, categoryIds: number[] | null) {
  const [p] = await db.select().from(dailyPuzzles).where(and(eq(dailyPuzzles.skinId, skin.id), eq(dailyPuzzles.date, date)));
  if (p) {
    const [g] = await db.select({ n: sql<number>`count(*)::int` }).from(games).where(eq(games.puzzleId, p.id));
    if (g.n > 0) throw new Error("Taj dan su igrači već igrali");
    await db.delete(dailyPuzzles).where(eq(dailyPuzzles.id, p.id));
  }
  if (!categoryIds) return getOrCreatePuzzle(skin, date); // automatski odabir
  if (categoryIds.length !== skin.config.dailyPattern.length || new Set(categoryIds).size !== categoryIds.length)
    throw new Error(`Treba ${skin.config.dailyPattern.length} različitih kategorija`);
  await db.transaction(async (tx) => {
    const [np] = await tx.insert(dailyPuzzles).values({ skinId: skin.id, date, number: dayNumber(skin.launchDate, date) }).returning();
    await tx.insert(puzzleCategories).values(categoryIds.map((categoryId, position) => ({ puzzleId: np.id, position, categoryId })));
  });
}

// ---------- Svi odgovori ----------

export async function searchAttempts(skin: Skin, f: { date?: string; categoryId?: number; q?: string; onlyRejected?: boolean; limit?: number }) {
  const conds = [eq(dailyPuzzles.skinId, skin.id)];
  if (f.date) conds.push(eq(dailyPuzzles.date, f.date));
  if (f.categoryId) conds.push(eq(attempts.categoryId, f.categoryId));
  if (f.q) conds.push(ilike(attempts.raw, `%${f.q}%`));
  if (f.onlyRejected) conds.push(eq(attempts.accepted, false));
  return db
    .select({
      createdAt: attempts.createdAt,
      date: dailyPuzzles.date,
      category: categories.title,
      raw: attempts.raw,
      normalized: attempts.normalized,
      answer: answers.canonical,
      accepted: attempts.accepted,
      timedOut: attempts.timedOut,
      elapsedMs: attempts.elapsedMs,
      player: sql<string>`coalesce(${players.nickname}, left(${players.id}::text, 8))`,
      registered: sql<boolean>`${players.authUserId} is not null`,
    })
    .from(attempts)
    .innerJoin(games, eq(games.id, attempts.gameId))
    .innerJoin(dailyPuzzles, eq(dailyPuzzles.id, games.puzzleId))
    .innerJoin(categories, eq(categories.id, attempts.categoryId))
    .innerJoin(players, eq(players.id, games.playerId))
    .leftJoin(answers, eq(answers.id, attempts.answerId))
    .where(and(...conds))
    .orderBy(desc(attempts.createdAt))
    .limit(f.limit ?? 500);
}
