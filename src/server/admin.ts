import "server-only";
import { and, asc, desc, eq, gte, ilike, inArray, isNotNull, isNull, sql } from "drizzle-orm";
import { db } from "@/db";
import {
  answerAliases,
  answers,
  attempts,
  removedAliases,
  categories,
  dailyPuzzles,
  games,
  leagueMembers,
  leagues,
  players,
  puzzleCategories,
  reviewDecisions,
  rounds,
} from "@/db/schema";
import { capitalize, fold, parseSeedAnswers } from "@/lib/matcher";
import { stationAt } from "@/lib/scoring";
import { computeStats } from "@/lib/stats";
import { dayNumber, localDate } from "@/lib/day";
import { addDays, dailyAverages, weekDays } from "@/lib/league";
import { placeAt } from "@/skins/mjesta";
import { routeHistogram, routeLabels } from "@/lib/compare";
import { isAdminEmail } from "./accounts";
import { resolveIdentity } from "./player";
import { categoryShares, clearCategoryCache, clearPuzzleCache, followersOf, getOrCreatePuzzle, pairedSlugs, rejectReports, rescoreMisses, rescoreReported, type Skin } from "./game";

/** Id admina ili null. Lokalno se može uključiti ADMIN_DEV_BYPASS=1 (nikad u produkciji). */
export async function requireAdmin(): Promise<{ playerId: string | null } | null> {
  if (process.env.NODE_ENV !== "production" && process.env.ADMIN_DEV_BYPASS === "1") return { playerId: null };
  const { playerId, user } = await resolveIdentity(false, true);
  return user && isAdminEmail(user.email) ? { playerId } : null;
}

// ---------- Pregled dana ----------

/** Stupci "gdje su stali" kao na kraju igre, s gradovima ispod osi, prosjekom i najdaljim. */
function routeOf(skin: Skin, kms: number[]) {
  const best = kms.length ? Math.max(...kms) : 0;
  const avg = kms.length ? Math.round(kms.reduce((a, b) => a + b, 0) / kms.length) : 0;
  return {
    hist: routeHistogram(skin.config, kms),
    labels: routeLabels(skin.config, best),
    avgKm: avg,
    avgAt: placeAt(skin.id, skin.config, avg),
    bestKm: best,
    bestAt: placeAt(skin.id, skin.config, best),
  };
}

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
    .where(and(eq(games.puzzleId, puzzle.id), eq(games.ranked, true)));
  // partije "za gušt" (taj dan već igrana druga država) ne ulaze u statistiku dana, samo se prebroje
  const [{ unranked }] = await db
    .select({ unranked: sql<number>`count(*)::int` })
    .from(games)
    .where(and(eq(games.puzzleId, puzzle.id), eq(games.ranked, false)));

  const kms = await db
    .select({ km: games.totalKm })
    .from(games)
    .where(and(eq(games.puzzleId, puzzle.id), eq(games.ranked, true), isNotNull(games.finishedAt)));
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
    .where(and(eq(games.puzzleId, puzzle.id), eq(games.ranked, true)))
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
    .where(and(eq(games.puzzleId, puzzle.id), eq(games.ranked, true)))
    .groupBy(attempts.categoryId);
  const misses = await db
    .select({ categoryId: rounds.categoryId, n: sql<number>`count(*)::int` })
    .from(rounds)
    .innerJoin(games, eq(games.id, rounds.gameId))
    .where(and(eq(games.puzzleId, puzzle.id), eq(games.ranked, true), isNull(rounds.answerId), isNotNull(rounds.answeredAt)))
    .groupBy(rounds.categoryId);

  // svi odgovori današnjih kategorija s udjelom i prijevozom koji taj dan vrijede
  const shares = new Map<number, { canonical: string; n: number; share: number; tier: string }[]>();
  for (const c of cats)
    shares.set(
      c.id,
      (await categoryShares(skin, puzzle.id, c.id, true)).map((a) => ({
        canonical: a.canonical,
        n: a.n,
        share: a.share,
        tier: a.tier.name,
      })),
    );

  return {
    date,
    puzzle: { number: puzzle.number },
    totals: { ...totals, unranked },
    stations: skin.config.stations.map((s) => ({ name: s.name, n: stations.get(s.name) ?? 0 })).filter((s) => s.n > 0),
    route: routeOf(skin, kms.map((k) => k.km)),
    categories: cats.map((c) => {
      const a = att.find((x) => x.categoryId === c.id);
      return {
        ...c,
        top: top.filter((t) => t.categoryId === c.id).slice(0, 8).map(({ canonical, n }) => ({ canonical, n })),
        attempts: a?.total ?? 0,
        rejected: a?.rejected ?? 0,
        misses: misses.find((m) => m.categoryId === c.id)?.n ?? 0,
        answers: shares.get(c.id) ?? [],
      };
    }),
  };
}

// ---------- Prosjek km po danu ----------

/** Prosječni km svih igrača po danu za tjedan od ponedjeljka `monday`; broje se samo završene partije koje ulaze u statistiku. */
export async function weekAverages(skin: Skin, monday: string) {
  const days = weekDays(monday);
  const rows = await db
    .select({ date: dailyPuzzles.date, km: games.totalKm })
    .from(games)
    .innerJoin(dailyPuzzles, eq(dailyPuzzles.id, games.puzzleId))
    .where(
      and(
        eq(dailyPuzzles.skinId, skin.id),
        inArray(dailyPuzzles.date, days),
        eq(games.ranked, true),
        isNotNull(games.finishedAt),
      ),
    );
  return { from: monday, today: localDate(skin.timezone), days: dailyAverages(rows, days) };
}

// ---------- Opća statistika ----------

/** Brojke kroz sve dane skina (ukupno) i zadnjih 30 dana (raspodjele); samo partije koje se broje. */
export async function generalStats(skin: Skin) {
  const today = localDate(skin.timezone);
  const since = addDays(today, -29);
  const base = and(eq(dailyPuzzles.skinId, skin.id), eq(games.ranked, true));
  const recent = and(base, gte(dailyPuzzles.date, since));
  const [totals] = await db
    .select({
      days: sql<number>`count(distinct ${dailyPuzzles.date})::int`,
      games: sql<number>`count(*)::int`,
      finished: sql<number>`count(${games.finishedAt})::int`,
      players: sql<number>`count(distinct ${games.playerId})::int`,
      avgKm: sql<number>`coalesce(round(avg(${games.totalKm}) filter (where ${games.finishedAt} is not null)), 0)::int`,
    })
    .from(games)
    .innerJoin(dailyPuzzles, eq(dailyPuzzles.id, games.puzzleId))
    .where(base);
  const [best] = await db
    .select({ km: games.totalKm, date: dailyPuzzles.date, player: sql<string>`coalesce(${players.nickname}, 'anonimni igrač')` })
    .from(games)
    .innerJoin(dailyPuzzles, eq(dailyPuzzles.id, games.puzzleId))
    .innerJoin(players, eq(players.id, games.playerId))
    .where(and(base, isNotNull(games.finishedAt)))
    .orderBy(desc(games.totalKm), asc(games.finishedAt))
    .limit(1);
  // runde zadnjih 30 dana: pogođene, promašene, prijevoz i vrijeme odgovora
  const [answersRow] = await db
    .select({
      answered: sql<number>`count(*)::int`,
      hit: sql<number>`count(${rounds.answerId})::int`,
      avgMs: sql<number>`coalesce(round(avg(extract(epoch from ${rounds.answeredAt} - ${rounds.startedAt}) * 1000) filter (where ${rounds.answerId} is not null)), 0)::int`,
    })
    .from(rounds)
    .innerJoin(games, eq(games.id, rounds.gameId))
    .innerJoin(dailyPuzzles, eq(dailyPuzzles.id, games.puzzleId))
    .where(and(recent, isNotNull(rounds.answeredAt)));
  const tierRows = await db
    .select({ tier: rounds.tier, n: sql<number>`count(*)::int` })
    .from(rounds)
    .innerJoin(games, eq(games.id, rounds.gameId))
    .innerJoin(dailyPuzzles, eq(dailyPuzzles.id, games.puzzleId))
    .where(and(recent, isNotNull(rounds.answerId)))
    .groupBy(rounds.tier);
  const kms = await db
    .select({ km: games.totalKm })
    .from(games)
    .innerJoin(dailyPuzzles, eq(dailyPuzzles.id, games.puzzleId))
    .where(and(recent, isNotNull(games.finishedAt)));
  const route = routeOf(skin, kms.map((k) => k.km));
  // koliko se igrači vraćaju: broj odigranih dana po igraču (svi dani)
  const perPlayer = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(games)
    .innerJoin(dailyPuzzles, eq(dailyPuzzles.id, games.puzzleId))
    .where(and(base, isNotNull(games.finishedAt)))
    .groupBy(games.playerId);
  const loyalty = [
    { label: "1 dan", min: 1, max: 1 },
    { label: "2–3 dana", min: 2, max: 3 },
    { label: "4–7 dana", min: 4, max: 7 },
    { label: "8–14 dana", min: 8, max: 14 },
    { label: "15+ dana", min: 15, max: Infinity },
  ].map((b) => ({ label: b.label, n: perPlayer.filter((p) => p.n >= b.min && p.n <= b.max).length }));
  // kategorije zadnjih 30 dana po udjelu promašaja (bez točnog odgovora)
  const cats = await db
    .select({
      title: categories.title,
      date: sql<string>`max(${dailyPuzzles.date})`,
      answered: sql<number>`count(*)::int`,
      missed: sql<number>`count(*) filter (where ${rounds.answerId} is null)::int`,
    })
    .from(rounds)
    .innerJoin(games, eq(games.id, rounds.gameId))
    .innerJoin(dailyPuzzles, eq(dailyPuzzles.id, games.puzzleId))
    .innerJoin(categories, eq(categories.id, rounds.categoryId))
    .where(and(recent, isNotNull(rounds.answeredAt)))
    .groupBy(categories.id, categories.title)
    .having(sql`count(*) >= 5`);
  const byMiss = cats.map((c) => ({ ...c, missPct: Math.round((100 * c.missed) / c.answered) })).sort((a, b) => b.missPct - a.missPct);
  return {
    today,
    since,
    totals: { ...totals, ...answersRow },
    best: best ?? null,
    tiers: skin.config.tiers.map((t) => ({ name: t.name, emoji: t.emoji, n: tierRows.find((r) => r.tier === t.name)?.n ?? 0 })),
    route,
    loyalty,
    hardest: byMiss.slice(0, 5),
    easiest: byMiss.slice(Math.max(5, byMiss.length - 5)).reverse(),
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
      // igrači koji su prijavili da odgovor fali (ostavili su ga kao konačan, žele da se računa ili samo javljaju da fali)
      reports: sql<number>`count(distinct ${attempts.gameId}) filter (where ${rounds.reportedAt} is not null or ${attempts.reportedAt} is not null)::int`,
      examples: sql<string[]>`(array_agg(distinct ${attempts.raw}))[1:5]`,
      last: sql<string>`max(${attempts.createdAt})`,
    })
    .from(attempts)
    .innerJoin(categories, eq(categories.id, attempts.categoryId))
    .leftJoin(
      rounds,
      and(eq(rounds.gameId, attempts.gameId), eq(rounds.position, attempts.position), eq(rounds.reportedRaw, attempts.raw)),
    )
    .leftJoin(
      reviewDecisions,
      and(eq(reviewDecisions.categoryId, attempts.categoryId), eq(reviewDecisions.normalized, attempts.normalized)),
    )
    .where(and(eq(categories.skinId, skin.id), eq(attempts.accepted, false), isNull(reviewDecisions.id), sql`${attempts.normalized} <> ''`))
    .groupBy(attempts.categoryId, categories.title, attempts.normalized)
    .orderBy(
      desc(sql`count(distinct ${attempts.gameId}) filter (where ${rounds.reportedAt} is not null or ${attempts.reportedAt} is not null)`),
      desc(sql`count(distinct ${attempts.gameId})`),
      desc(sql`max(${attempts.createdAt})`),
    )
    .limit(limit);
  return rows;
}

export type ReviewAction =
  // tier: prijevoz koji je admin odabrao; igrači koji se sad naknadno boduju dobiju baš njega
  | { action: "answer"; categoryId: number; normalized: string; canonical: string; priorShare: number; rare?: boolean; tier?: string }
  | { action: "alias"; categoryId: number; normalized: string; answerId: number; alias: string }
  | { action: "reject"; categoryId: number; normalized: string };

export async function decide(skin: Skin, adminId: string | null, a: ReviewAction) {
  let answerId: number | null = null;
  if (a.action === "answer") {
    const [row] = await db
      .insert(answers)
      .values({ categoryId: a.categoryId, canonical: capitalize(a.canonical), priorShare: a.priorShare, rare: !!a.rare, source: "review" })
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
  const chosen = a.action === "answer" && a.tier ? skin.config.tiers.find((t) => t.name === a.tier) : undefined;
  // prvo konačni promašaji, pa prijavljeni raniji pokušaji (tamo se računa bolji od dva odgovora)
  const rescored = answerId
    ? (await rescoreMisses(skin, a.categoryId, a.normalized, answerId, chosen)) + (await rescoreReported(skin, a.categoryId, a.normalized, answerId, chosen))
    : 0;
  if (a.action === "reject") await rejectReports(a.categoryId, a.normalized);
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

/**
 * Sve odigrane runde skina za analizu izvan admina (CSV): pitanje, upis, prepoznati odgovor, procjena i udio, prijevoz,
 * km i vrijeme. Igrači su samo broj partije.
 */
export async function exportRounds(skin: Skin) {
  return db
    .select({
      date: dailyPuzzles.date,
      game: games.id,
      ranked: games.ranked,
      position: rounds.position,
      slug: categories.slug,
      category: categories.title,
      group: categories.group,
      open: categories.open,
      raw: rounds.raw,
      answer: answers.canonical,
      prior: answers.priorShare,
      rare: answers.rare,
      share: rounds.share,
      tier: rounds.tier,
      km: rounds.km,
      elapsedMs: sql<number>`round(extract(epoch from (${rounds.answeredAt} - ${rounds.startedAt})) * 1000)::int`,
      reported: sql<boolean>`${rounds.reportedAt} is not null`,
      rescored: sql<boolean>`${rounds.rescoredAt} is not null`,
    })
    .from(rounds)
    .innerJoin(games, eq(games.id, rounds.gameId))
    .innerJoin(dailyPuzzles, eq(dailyPuzzles.id, games.puzzleId))
    .innerJoin(categories, eq(categories.id, rounds.categoryId))
    .leftJoin(answers, eq(answers.id, rounds.answerId))
    .where(and(eq(dailyPuzzles.skinId, skin.id), isNotNull(rounds.answeredAt)))
    .orderBy(asc(dailyPuzzles.date), asc(games.id), asc(rounds.position));
}

// ---------- Igrači ----------

export async function playersOverview(skin: Skin) {
  const today = localDate(skin.timezone);
  const since = addDays(today, -29);
  // svaki dan zadnjih 30, i dan bez igrača (za graf)
  const rows = await db
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
    .groupBy(dailyPuzzles.date);
  const daily = Array.from({ length: 30 }, (_, i) => addDays(since, i)).map(
    (date) => rows.find((r) => r.date === date) ?? { date, players: 0, registered: 0, finished: 0 },
  );

  const list = await db
    .select({
      id: players.id,
      nickname: players.nickname,
      email: players.email,
      role: players.role,
      createdAt: players.createdAt,
      lastSeenAt: players.lastSeenAt,
    })
    .from(players)
    .where(isNotNull(players.authUserId))
    .orderBy(desc(players.lastSeenAt))
    .limit(1000);
  const ids = list.map((p) => p.id);
  const played = ids.length
    ? await db
        .select({ playerId: games.playerId, date: dailyPuzzles.date, km: games.totalKm })
        .from(games)
        .innerJoin(dailyPuzzles, eq(dailyPuzzles.id, games.puzzleId))
        .where(and(inArray(games.playerId, ids), isNotNull(games.finishedAt), eq(games.ranked, true), eq(dailyPuzzles.skinId, skin.id)))
    : [];
  // statistika kao na profilu igrača: samo završene partije koje se broje
  const byPlayer = new Map<string, { date: string; km: number }[]>();
  for (const g of played) {
    if (!byPlayer.has(g.playerId)) byPlayer.set(g.playerId, []);
    byPlayer.get(g.playerId)!.push(g);
  }
  const [counts] = await db
    .select({
      total: sql<number>`count(*)::int`,
      registered: sql<number>`count(${players.authUserId})::int`,
      newRegistered: sql<number>`count(${players.authUserId}) filter (where ${players.createdAt} >= now() - interval '7 days')::int`,
    })
    .from(players);
  const active = (from: string) =>
    db
      .select({ n: sql<number>`count(distinct ${games.playerId})::int` })
      .from(games)
      .innerJoin(dailyPuzzles, eq(dailyPuzzles.id, games.puzzleId))
      .where(and(eq(dailyPuzzles.skinId, skin.id), gte(dailyPuzzles.date, from)))
      .then(([r]) => r.n);
  // odakle igraju svi igrači (i bez računa) koji su igrali zadnjih 30 dana; lokacija je zadnja poznata
  const seen = await db
    .selectDistinct({ id: players.id, country: players.country, city: players.city, device: players.device, referrer: players.referrer })
    .from(games)
    .innerJoin(dailyPuzzles, eq(dailyPuzzles.id, games.puzzleId))
    .innerJoin(players, eq(players.id, games.playerId))
    .where(and(eq(dailyPuzzles.skinId, skin.id), gte(dailyPuzzles.date, since)));
  const tally = (key: (p: (typeof seen)[number]) => string | null, top: number) => {
    const m = new Map<string, number>();
    for (const p of seen) {
      const k = key(p) ?? "";
      m.set(k, (m.get(k) ?? 0) + 1);
    }
    const rows = [...m].map(([label, n]) => ({ label, n })).sort((a, b) => b.n - a.n);
    const known = rows.filter((r) => r.label).slice(0, top);
    const rest = seen.length - known.reduce((a, r) => a + r.n, 0);
    return rest ? [...known, { label: "", n: rest }] : known;
  };
  const origins = {
    players: seen.length,
    known: seen.filter((p) => p.country).length,
    countries: tally((p) => p.country, 8),
    cities: tally((p) => (p.city ? `${p.city}|${p.country ?? ""}` : null), 10),
    devices: tally((p) => p.device, 4),
    referrers: tally((p) => p.referrer, 8),
  };
  return {
    today,
    origins,
    counts: { ...counts, activeToday: await active(today), active7: await active(addDays(today, -6)), active30: await active(since) },
    daily,
    players: list.map((p) => {
      const days = byPlayer.get(p.id) ?? [];
      return { ...p, lastPlayed: days.reduce<string | null>((m, d) => (m && m > d.date ? m : d.date), null), stats: computeStats(days, today) };
    }),
  };
}

/** Jedan igrač za admin: zadnje partije u ovom skinu i lige. */
export async function playerDetail(skin: Skin, id: string) {
  const [p] = await db
    .select({
      id: players.id, nickname: players.nickname, email: players.email, role: players.role, createdAt: players.createdAt, lastSeenAt: players.lastSeenAt,
      registered: sql<boolean>`${players.authUserId} is not null`, country: players.country, city: players.city, device: players.device, referrer: players.referrer,
    })
    .from(players)
    .where(eq(players.id, id));
  if (!p) throw new Error("Nema igrača");
  const rows = await db
    .select({ date: dailyPuzzles.date, number: dailyPuzzles.number, km: games.totalKm, finished: sql<boolean>`${games.finishedAt} is not null`, ranked: games.ranked })
    .from(games)
    .innerJoin(dailyPuzzles, eq(dailyPuzzles.id, games.puzzleId))
    .where(and(eq(games.playerId, id), eq(dailyPuzzles.skinId, skin.id)))
    .orderBy(desc(dailyPuzzles.date));
  const today = localDate(skin.timezone);
  const done = rows.filter((r) => r.finished && r.ranked);
  const myLeagues = await db
    .select({ name: leagues.name, code: leagues.code, members: sql<number>`(select count(*)::int from ${leagueMembers} m where m.league_id = ${leagues.id})` })
    .from(leagueMembers)
    .innerJoin(leagues, eq(leagues.id, leagueMembers.leagueId))
    .where(and(eq(leagueMembers.playerId, id), eq(leagues.skinId, skin.id)));
  return {
    ...p,
    stats: computeStats(done, today),
    games: rows.slice(0, 60).map((r) => ({ ...r, station: r.finished ? placeAt(skin.id, skin.config, r.km) : null })),
    leagues: myLeagues,
  };
}

// ---------- Sadržaj ----------

/** Kategorije skina; `missing` su države (hr, ba, rs) u kojima ta kategorija nema aktivan par s istim slugom. */
export async function listCategories(skin: Skin) {
  const related = skin.config.mirror ? [skin.config.mirror] : followersOf(skin.id);
  const others = related.length
    ? await db
        .select({ skinId: categories.skinId, slug: categories.slug })
        .from(categories)
        .where(and(inArray(categories.skinId, related), eq(categories.active, true)))
    : [];
  const rows = await db
    .select({
      id: categories.id,
      slug: categories.slug,
      title: categories.title,
      hint: categories.hint,
      group: categories.group,
      active: categories.active,
      open: categories.open,
      answers: sql<number>`(select count(*)::int from ${answers} where ${answers.categoryId} = ${categories.id})`,
      // upisi s tekstom i oni koje nismo prepoznali: koliko je pitanje otvoreno (naknadno odobreni se broje kao pogodak)
      typed: sql<number>`(select count(*)::int from ${rounds} where ${rounds.categoryId} = ${categories.id} and ${rounds.raw} is not null)`,
      missed: sql<number>`(select count(*)::int from ${rounds} where ${rounds.categoryId} = ${categories.id} and ${rounds.raw} is not null and ${rounds.answerId} is null)`,
      lastUsed: sql<string | null>`(select max(${dailyPuzzles.date}) from ${puzzleCategories} join ${dailyPuzzles} on ${dailyPuzzles.id} = ${puzzleCategories.puzzleId} where ${puzzleCategories.categoryId} = ${categories.id})`,
    })
    .from(categories)
    .where(eq(categories.skinId, skin.id))
    .orderBy(asc(categories.group), asc(categories.title));
  return rows.map((r) => ({ ...r, missing: related.filter((id) => !others.some((o) => o.skinId === id && o.slug === r.slug)) }));
}

/** Za BiH i Srbiju: hrvatske kategorije koje ovdje još nemaju par (bez njih Hrvatska tu kategoriju ne bira). */
export async function unpaired(skin: Skin) {
  if (!skin.config.mirror) return [];
  const mine = await db.select({ slug: categories.slug }).from(categories).where(eq(categories.skinId, skin.id));
  const have = new Set(mine.map((m) => m.slug));
  const source = await db
    .select({ slug: categories.slug, title: categories.title, group: categories.group })
    .from(categories)
    .where(and(eq(categories.skinId, skin.config.mirror), eq(categories.active, true)))
    .orderBy(asc(categories.title));
  // domaća grupa izvora (hr) ovdje je domaća grupa ovog skina
  const home = (g: string) => (g === skin.config.mirror ? skin.id : g);
  return source.filter((c) => !have.has(c.slug)).map((c) => ({ ...c, group: home(c.group) }));
}

export async function categoryDetail(id: number) {
  const [cat] = await db.select().from(categories).where(eq(categories.id, id));
  if (!cat) return null;
  const rows = await db
    .select({
      id: answers.id,
      canonical: answers.canonical,
      priorShare: answers.priorShare,
      rare: answers.rare,
      source: answers.source,
      seedCanonical: answers.seedCanonical,
      fact: answers.fact,
      edited: sql<boolean>`${answers.editedAt} is not null`,
      alias: answerAliases.alias,
    })
    .from(answers)
    .leftJoin(answerAliases, eq(answerAliases.answerId, answers.id))
    .where(eq(answers.categoryId, id))
    .orderBy(desc(answers.priorShare), asc(answers.canonical));
  type Row = Omit<(typeof rows)[number], "alias"> & { aliases: string[] };
  const byId = new Map<number, Row>();
  for (const { alias, ...r } of rows) {
    let a = byId.get(r.id);
    if (!a) byId.set(r.id, (a = { ...r, aliases: [] }));
    if (alias) a.aliases.push(alias);
  }
  return { ...cat, answers: [...byId.values()] };
}

const slugify = (s: string) => fold(s).replace(/ /g, "-").slice(0, 40) || "kategorija";

/** Nova kategorija; odgovori u formatu seeda: "Kanonski/varijanta=udio; ..." */
export async function createCategory(skin: Skin, input: { title: string; group: string; hint?: string; strip?: string[]; answers: string; pairOf?: string }) {
  if (!skin.config.groups[input.group]) throw new Error("Nepoznata grupa");
  // BiH i Srbija: svaka kategorija je par hrvatske, s istim slugom, da dođe isti dan
  let slug = `${slugify(input.title)}-${Date.now().toString(36)}`;
  if (skin.config.mirror) {
    const open = await unpaired(skin);
    const pair = open.find((c) => c.slug === input.pairOf);
    if (!pair) throw new Error("Odaberi hrvatsku kategoriju kojoj je ovo par");
    slug = pair.slug;
  }
  const parsed = parseSeedAnswers(input.answers)
    .filter((a) => a.canonical && Number.isFinite(a.share))
    .map((a) => ({ ...a, canonical: capitalize(a.canonical) }));
  if (!parsed.length) throw new Error("Nema odgovora");
  return db.transaction(async (tx) => {
    const [cat] = await tx
      .insert(categories)
      .values({
        skinId: skin.id,
        slug,
        title: input.title.trim(),
        hint: input.hint?.trim() || null,
        group: input.group,
        strip: input.strip ?? [],
      })
      .returning();
    for (const a of parsed) {
      const [ans] = await tx.insert(answers).values({ categoryId: cat.id, canonical: a.canonical, priorShare: a.share, rare: a.rare }).onConflictDoNothing().returning();
      if (ans && a.variants.length)
        await tx.insert(answerAliases).values(a.variants.map((alias) => ({ answerId: ans.id, alias }))).onConflictDoNothing();
    }
    return cat;
  });
}

export async function updateCategory(id: number, patch: { active?: boolean; open?: boolean; title?: string; hint?: string | null }) {
  const set: Partial<typeof categories.$inferInsert> = {};
  if (typeof patch.active === "boolean") set.active = patch.active;
  if (typeof patch.open === "boolean") set.open = patch.open;
  if (typeof patch.title === "string" && patch.title.trim()) set.title = patch.title.trim();
  if (patch.hint !== undefined) set.hint = patch.hint?.trim() || null;
  if (Object.keys(set).length) await db.update(categories).set(set).where(eq(categories.id, id));
  clearCategoryCache(id);
}

export async function addAnswer(categoryId: number, input: { canonical: string; variants: string[]; priorShare: number; rare?: boolean }) {
  const rare = !!input.rare;
  const [ans] = await db
    .insert(answers)
    .values({ categoryId, canonical: capitalize(input.canonical), priorShare: input.priorShare, rare, source: "review" })
    .onConflictDoUpdate({ target: [answers.categoryId, answers.canonical], set: { priorShare: input.priorShare, rare, editedAt: new Date() } })
    .returning();
  const variants = input.variants.map((v) => v.trim()).filter(Boolean);
  if (variants.length) await db.insert(answerAliases).values(variants.map((alias) => ({ answerId: ans.id, alias }))).onConflictDoNothing();
  clearCategoryCache(categoryId);
  return ans;
}

/**
 * Izmjena postojećeg odgovora: naziv, procjena i helikopter. Seed izmjene ne poništava: preimenovani odgovor pamti izvorni
 * naziv (seedCanonical), a ručno mijenjana rijetkost (editedAt) se više ne dira. Stari naziv može ostati kao varijanta.
 * Varijante se dodaju i brišu; obrisana se pamti (removedAliases) da je seed ne vrati.
 */
export async function updateAnswer(
  categoryId: number,
  answerId: number,
  patch: { canonical?: string; priorShare?: number; rare?: boolean; keepOld?: boolean; addAliases?: string[]; removeAliases?: string[]; fact?: string },
) {
  const [ans] = await db.select().from(answers).where(and(eq(answers.id, answerId), eq(answers.categoryId, categoryId)));
  if (!ans) throw new Error("Odgovor ne pripada kategoriji");
  const set: Partial<typeof answers.$inferInsert> = {};
  const canonical = patch.canonical?.trim() ? capitalize(patch.canonical.trim()) : ans.canonical;
  if (canonical !== ans.canonical) {
    const [taken] = await db.select({ id: answers.id }).from(answers).where(and(eq(answers.categoryId, categoryId), eq(answers.canonical, canonical)));
    if (taken) throw new Error(`„${canonical}” već postoji u ovoj kategoriji`);
    set.canonical = canonical;
    set.seedCanonical = ans.seedCanonical ?? ans.canonical;
  }
  if (patch.priorShare !== undefined) {
    if (!Number.isFinite(patch.priorShare) || patch.priorShare <= 0 || patch.priorShare > 100) throw new Error("Procjena mora biti između 0 i 100 %");
    if (patch.priorShare !== ans.priorShare) set.priorShare = patch.priorShare;
  }
  if (typeof patch.rare === "boolean" && patch.rare !== ans.rare) set.rare = patch.rare;
  if (set.priorShare !== undefined || set.rare !== undefined) set.editedAt = new Date();
  // prazna zanimljivost ostaje "" (ne null), da je seed ne vrati
  if (typeof patch.fact === "string" && patch.fact.trim() !== (ans.fact ?? "")) set.fact = patch.fact.trim();
  const add = [...new Set((patch.addAliases ?? []).map((a) => a.trim()).filter(Boolean))];
  const remove = (patch.removeAliases ?? []).filter(Boolean);
  if (add.length) {
    // varijanta koja već pripada drugom odgovoru kategorije bi zbunila prepoznavanje
    const others = await db
      .select({ id: answers.id, canonical: answers.canonical, alias: answerAliases.alias })
      .from(answers)
      .leftJoin(answerAliases, eq(answerAliases.answerId, answers.id))
      .where(and(eq(answers.categoryId, categoryId), sql`${answers.id} <> ${answerId}`));
    for (const a of add) {
      const clash = others.find((o) => fold(o.canonical) === fold(a) || (o.alias && fold(o.alias) === fold(a)));
      if (clash) throw new Error(`„${a}” već pripada odgovoru „${clash.canonical}”`);
    }
  }
  if (!Object.keys(set).length && !add.length && !remove.length) return ans;
  const [row] = await db.transaction(async (tx) => {
    if (add.length) {
      await tx.insert(answerAliases).values(add.map((alias) => ({ answerId, alias }))).onConflictDoNothing();
      await tx.delete(removedAliases).where(and(eq(removedAliases.answerId, answerId), inArray(removedAliases.alias, add)));
    }
    if (remove.length) {
      await tx.delete(answerAliases).where(and(eq(answerAliases.answerId, answerId), inArray(answerAliases.alias, remove)));
      await tx.insert(removedAliases).values(remove.map((alias) => ({ answerId, alias }))).onConflictDoNothing();
    }
    if (!Object.keys(set).length) return [ans];
    // tko je upisao stari naziv i dalje pogađa isti odgovor
    if (set.canonical && patch.keepOld !== false && fold(ans.canonical) !== fold(canonical))
      await tx.insert(answerAliases).values({ answerId, alias: ans.canonical }).onConflictDoNothing();
    return tx.update(answers).set(set).where(eq(answers.id, answerId)).returning();
  });
  clearCategoryCache(categoryId);
  return row;
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
  if (skin.config.mirror) throw new Error("Raspored ove države prati Hrvatsku; mijenja se u hrvatskom adminu");
  // dan se mijenja u svim državama odjednom (BiH i Srbija se ponovno slože po Hrvatskoj)
  const ids = [skin.id, ...followersOf(skin.id)];
  const ps = await db.select().from(dailyPuzzles).where(and(inArray(dailyPuzzles.skinId, ids), eq(dailyPuzzles.date, date)));
  if (ps.length) {
    const played = await db.select({ puzzleId: games.puzzleId }).from(games).where(inArray(games.puzzleId, ps.map((p) => p.id))).limit(1);
    if (played.length) throw new Error("Taj dan su igrači već igrali");
  }
  if (categoryIds) {
    if (categoryIds.length !== skin.config.dailyPattern.length || new Set(categoryIds).size !== categoryIds.length)
      throw new Error(`Treba ${skin.config.dailyPattern.length} različitih kategorija`);
    const ready = await pairedSlugs(skin.id);
    const chosen = await db.select({ slug: categories.slug, title: categories.title }).from(categories).where(inArray(categories.id, categoryIds));
    const lone = ready ? chosen.filter((c) => !ready.has(c.slug)) : [];
    if (lone.length) throw new Error(`Nema para u BiH ili Srbiji: ${lone.map((c) => c.title).join(", ")}`);
  }
  if (ps.length) await db.delete(dailyPuzzles).where(inArray(dailyPuzzles.id, ps.map((p) => p.id)));
  clearPuzzleCache();
  if (!categoryIds) return getOrCreatePuzzle(skin, date); // automatski odabir
  await db.transaction(async (tx) => {
    const [np] = await tx.insert(dailyPuzzles).values({ skinId: skin.id, date, number: dayNumber(skin.launchDate, date) }).returning();
    await tx.insert(puzzleCategories).values(categoryIds.map((categoryId, position) => ({ puzzleId: np.id, position, categoryId })));
  });
  clearPuzzleCache();
}

// ---------- Svi odgovori ----------

export type AttemptStatus = "ok" | "rejected" | "late";

export async function searchAttempts(skin: Skin, f: { date?: string; categoryId?: number; q?: string; status?: AttemptStatus; limit?: number }) {
  const conds = [eq(dailyPuzzles.skinId, skin.id)];
  if (f.date) conds.push(eq(dailyPuzzles.date, f.date));
  if (f.categoryId) conds.push(eq(attempts.categoryId, f.categoryId));
  if (f.q) conds.push(ilike(attempts.raw, `%${f.q}%`));
  if (f.status === "ok") conds.push(eq(attempts.accepted, true));
  if (f.status === "rejected") conds.push(eq(attempts.accepted, false), eq(attempts.timedOut, false));
  if (f.status === "late") conds.push(eq(attempts.timedOut, true));
  return db
    .select({
      createdAt: attempts.createdAt,
      date: dailyPuzzles.date,
      position: attempts.position,
      category: categories.title,
      raw: attempts.raw,
      normalized: attempts.normalized,
      answer: answers.canonical,
      accepted: attempts.accepted,
      timedOut: attempts.timedOut,
      elapsedMs: attempts.elapsedMs,
      gameId: attempts.gameId,
      gameKm: games.totalKm,
      finished: sql<boolean>`${games.finishedAt} is not null`,
      ranked: games.ranked,
      playerId: players.id,
      player: sql<string>`coalesce(${players.nickname}, left(${players.id}::text, 8))`,
      registered: sql<boolean>`${players.authUserId} is not null`,
      country: players.country,
      city: players.city,
      device: players.device,
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

/** Zbroj upisa jednog dana po ishodu i kategorije tog dana, za zaglavlje i filtar u adminu. */
export async function attemptsSummary(skin: Skin, date: string) {
  const day = and(eq(dailyPuzzles.skinId, skin.id), eq(dailyPuzzles.date, date));
  const [totals] = await db
    .select({
      total: sql<number>`count(*)::int`,
      ok: sql<number>`count(*) filter (where ${attempts.accepted})::int`,
      late: sql<number>`count(*) filter (where ${attempts.timedOut})::int`,
      players: sql<number>`count(distinct ${games.playerId})::int`,
    })
    .from(attempts)
    .innerJoin(games, eq(games.id, attempts.gameId))
    .innerJoin(dailyPuzzles, eq(dailyPuzzles.id, games.puzzleId))
    .where(day);
  const cats = await db
    .select({ id: categories.id, position: puzzleCategories.position, title: categories.title })
    .from(puzzleCategories)
    .innerJoin(dailyPuzzles, eq(dailyPuzzles.id, puzzleCategories.puzzleId))
    .innerJoin(categories, eq(categories.id, puzzleCategories.categoryId))
    .where(day)
    .orderBy(asc(puzzleCategories.position));
  return { ...totals, rejected: totals.total - totals.ok - totals.late, categories: cats };
}
