import "server-only";
import { and, asc, count, eq, gte, inArray, isNotNull } from "drizzle-orm";
import { db } from "@/db";
import { answers, categories, dailyPuzzles, games, leagueMembers, leagues, players, puzzleCategories, rounds } from "@/db/schema";
import { localDate } from "@/lib/day";
import {
  LEAGUE_LIMITS,
  computeStandings,
  newLeagueCode,
  periodStart,
  type Member,
  type Period,
  type StandingRow,
} from "@/lib/league";
import type { Skin } from "./game";

export class LeagueError extends Error {}

type League = typeof leagues.$inferSelect;

export async function leagueByCode(code: string): Promise<League | null> {
  const [l] = await db.select().from(leagues).where(eq(leagues.code, code.toUpperCase()));
  return l ?? null;
}

async function membership(leagueId: number, playerId: string) {
  const [m] = await db
    .select()
    .from(leagueMembers)
    .where(and(eq(leagueMembers.leagueId, leagueId), eq(leagueMembers.playerId, playerId)));
  return m ?? null;
}

async function leagueCount(playerId: string) {
  const [r] = await db.select({ n: count() }).from(leagueMembers).where(eq(leagueMembers.playerId, playerId));
  return r.n;
}

export async function createLeague(skin: Skin, playerId: string, name: string): Promise<League> {
  if ((await leagueCount(playerId)) >= LEAGUE_LIMITS.leaguesPerPlayer)
    throw new LeagueError(`Možeš biti u najviše ${LEAGUE_LIMITS.leaguesPerPlayer} liga.`);
  for (let i = 0; i < 5; i++) {
    const league = await db.transaction(async (tx) => {
      const [l] = await tx
        .insert(leagues)
        .values({ skinId: skin.id, code: newLeagueCode(), name, ownerId: playerId })
        .onConflictDoNothing()
        .returning();
      if (l) await tx.insert(leagueMembers).values({ leagueId: l.id, playerId });
      return l;
    });
    if (league) return league;
  }
  throw new LeagueError("Nije uspjelo, pokušaj ponovno.");
}

export async function joinLeague(league: League, playerId: string) {
  if (await membership(league.id, playerId)) return;
  if ((await leagueCount(playerId)) >= LEAGUE_LIMITS.leaguesPerPlayer)
    throw new LeagueError(`Možeš biti u najviše ${LEAGUE_LIMITS.leaguesPerPlayer} liga. Izađi iz neke pa probaj opet.`);
  const [r] = await db.select({ n: count() }).from(leagueMembers).where(eq(leagueMembers.leagueId, league.id));
  if (r.n >= LEAGUE_LIMITS.membersPerLeague) throw new LeagueError(`Liga je puna (${LEAGUE_LIMITS.membersPerLeague} članova).`);
  await db.insert(leagueMembers).values({ leagueId: league.id, playerId }).onConflictDoNothing();
}

/** Izlazak iz lige. Ako izlazi osnivač, liga prelazi na najstarijeg člana; prazna liga se briše. */
export async function leaveLeague(league: League, playerId: string) {
  await db.transaction(async (tx) => {
    await tx.delete(leagueMembers).where(and(eq(leagueMembers.leagueId, league.id), eq(leagueMembers.playerId, playerId)));
    if (league.ownerId !== playerId) return;
    const [next] = await tx
      .select()
      .from(leagueMembers)
      .where(eq(leagueMembers.leagueId, league.id))
      .orderBy(asc(leagueMembers.joinedAt), asc(leagueMembers.id))
      .limit(1);
    if (next) await tx.update(leagues).set({ ownerId: next.playerId }).where(eq(leagues.id, league.id));
    else await tx.delete(leagues).where(eq(leagues.id, league.id));
  });
}

/** Brisanje računa: igrač izlazi iz svih liga. */
export async function leaveAllLeagues(playerId: string) {
  const mine = await db
    .select({ l: leagues })
    .from(leagueMembers)
    .innerJoin(leagues, eq(leagues.id, leagueMembers.leagueId))
    .where(eq(leagueMembers.playerId, playerId));
  for (const { l } of mine) await leaveLeague(l, playerId);
}

function requireOwner(league: League, playerId: string) {
  if (league.ownerId !== playerId) throw new LeagueError("To može samo osnivač lige.");
}

export async function renameLeague(league: League, playerId: string, name: string) {
  requireOwner(league, playerId);
  await db.update(leagues).set({ name }).where(eq(leagues.id, league.id));
}

export async function removeMember(league: League, playerId: string, memberId: number) {
  requireOwner(league, playerId);
  const [m] = await db
    .select()
    .from(leagueMembers)
    .where(and(eq(leagueMembers.id, memberId), eq(leagueMembers.leagueId, league.id)));
  if (!m) throw new LeagueError("Taj igrač nije u ligi.");
  if (m.playerId === playerId) throw new LeagueError("Osnivač ne može izbaciti sebe; izađi iz lige.");
  await db.delete(leagueMembers).where(eq(leagueMembers.id, memberId));
}

export async function deleteLeague(league: League, playerId: string) {
  requireOwner(league, playerId);
  await db.delete(leagues).where(eq(leagues.id, league.id));
}

// ---------- Pregled ----------

async function membersOf(leagueId: number): Promise<(Member & { joinedAt: Date })[]> {
  const rows = await db
    .select({ memberId: leagueMembers.id, playerId: leagueMembers.playerId, nickname: players.nickname, joinedAt: leagueMembers.joinedAt })
    .from(leagueMembers)
    .innerJoin(players, eq(players.id, leagueMembers.playerId))
    .where(eq(leagueMembers.leagueId, leagueId))
    .orderBy(asc(leagueMembers.joinedAt));
  return rows.map((r) => ({ ...r, nickname: r.nickname ?? "Putnik" }));
}

async function finishedGames(skin: Skin, playerIds: string[], from?: string) {
  if (!playerIds.length) return [];
  return db
    .select({ playerId: games.playerId, date: dailyPuzzles.date, km: games.totalKm })
    .from(games)
    .innerJoin(dailyPuzzles, eq(dailyPuzzles.id, games.puzzleId))
    .where(
      and(
        inArray(games.playerId, playerIds),
        eq(dailyPuzzles.skinId, skin.id),
        isNotNull(games.finishedAt),
        from ? gte(dailyPuzzles.date, from) : undefined,
      ),
    );
}

export type LeagueSummary = {
  code: string;
  name: string;
  members: number;
  rank: number; // moje mjesto ovaj tjedan
  myKm: number;
  leader: { nickname: string; km: number } | null; // prvi ovaj tjedan, ako je itko igrao
  isOwner: boolean;
};

/** Lige igrača s njegovim mjestom u tekućem tjednu. */
export async function myLeagues(skin: Skin, playerId: string): Promise<LeagueSummary[]> {
  const mine = await db
    .select({ l: leagues })
    .from(leagueMembers)
    .innerJoin(leagues, eq(leagues.id, leagueMembers.leagueId))
    .where(and(eq(leagueMembers.playerId, playerId), eq(leagues.skinId, skin.id)))
    .orderBy(asc(leagueMembers.joinedAt));
  const today = localDate(skin.timezone);
  const out: LeagueSummary[] = [];
  for (const { l } of mine) {
    const members = await membersOf(l.id);
    const from = periodStart("week", today, today);
    const table = computeStandings(members, await finishedGames(skin, members.map((m) => m.playerId), from), from, today);
    const meId = members.find((m) => m.playerId === playerId)?.memberId;
    const myRow = table.find((r) => r.memberId === meId);
    out.push({
      code: l.code,
      name: l.name,
      members: members.length,
      rank: myRow?.rank ?? 0,
      myKm: myRow?.km ?? 0,
      leader: table[0]?.km ? { nickname: table[0].nickname, km: table[0].km } : null,
      isOwner: l.ownerId === playerId,
    });
  }
  return out;
}

export type TodayStatus = { memberId: number; nickname: string; status: "done" | "playing" | "none"; km: number };
export type TodayAnswers = { title: string; answers: { memberId: number; nickname: string; answer: string | null; km: number; emoji: string }[] }[];

export type LeagueView = {
  code: string;
  name: string;
  createdAt: string;
  isMember: boolean;
  isOwner: boolean;
  owner: string;
  meMemberId: number | null;
  members: number;
  period?: Period;
  from?: string;
  standings?: StandingRow[];
  today?: TodayStatus[];
  answers?: TodayAnswers | null; // null dok igrač nije završio današnju partiju
};

/** Stranica lige. Tko nije član vidi samo ime, osnivača i broj članova. */
export async function leagueView(skin: Skin, league: League, playerId: string | null, period: Period): Promise<LeagueView> {
  const members = await membersOf(league.id);
  const me = playerId ? members.find((m) => m.playerId === playerId) : undefined;
  const base: LeagueView = {
    code: league.code,
    name: league.name,
    createdAt: league.createdAt.toISOString(),
    isMember: !!me,
    isOwner: !!me && league.ownerId === playerId,
    owner: members.find((m) => m.playerId === league.ownerId)?.nickname ?? "",
    meMemberId: me?.memberId ?? null,
    members: members.length,
  };
  if (!me) return base;

  const today = localDate(skin.timezone);
  const leagueStart = localDate(skin.timezone, league.createdAt);
  const from = periodStart(period, today, leagueStart);
  const ids = members.map((m) => m.playerId);
  // streak treba i dane prije razdoblja
  const all = await finishedGames(skin, ids);
  const standings = computeStandings(members, all, from, today);

  const [puzzle] = await db
    .select()
    .from(dailyPuzzles)
    .where(and(eq(dailyPuzzles.skinId, skin.id), eq(dailyPuzzles.date, today)));
  const todays = puzzle
    ? await db
        .select({ id: games.id, playerId: games.playerId, finishedAt: games.finishedAt, km: games.totalKm })
        .from(games)
        .where(and(eq(games.puzzleId, puzzle.id), inArray(games.playerId, ids)))
    : [];
  const byPlayer = new Map(todays.map((g) => [g.playerId, g]));
  const todayStatus: TodayStatus[] = members
    .map((m) => {
      const g = byPlayer.get(m.playerId);
      const status: TodayStatus["status"] = !g ? "none" : g.finishedAt ? "done" : "playing";
      return { memberId: m.memberId, nickname: m.nickname, status, km: g?.finishedAt ? g.km : 0 };
    })
    .sort((a, b) => b.km - a.km || a.nickname.localeCompare(b.nickname, "hr"));

  const mineToday = byPlayer.get(me.playerId);
  const answersView = puzzle && mineToday?.finishedAt ? await todayAnswers(skin, puzzle.id, members, todays) : null;
  return { ...base, period, from, standings, today: todayStatus, answers: answersView };
}

async function todayAnswers(
  skin: Skin,
  puzzleId: number,
  members: Member[],
  todays: { id: number; playerId: string; finishedAt: Date | null }[],
): Promise<TodayAnswers> {
  const cats = await db
    .select({ position: puzzleCategories.position, title: categories.title })
    .from(puzzleCategories)
    .innerJoin(categories, eq(categories.id, puzzleCategories.categoryId))
    .where(eq(puzzleCategories.puzzleId, puzzleId))
    .orderBy(asc(puzzleCategories.position));
  const done = todays.filter((g) => g.finishedAt);
  const rows = done.length
    ? await db
        .select({ gameId: rounds.gameId, position: rounds.position, canonical: answers.canonical, km: rounds.km, tier: rounds.tier })
        .from(rounds)
        .leftJoin(answers, eq(answers.id, rounds.answerId))
        .where(inArray(rounds.gameId, done.map((g) => g.id)))
    : [];
  const memberOf = new Map(done.map((g) => [g.id, members.find((m) => m.playerId === g.playerId)!]));
  const cfg = skin.config;
  const emoji = (tier: string | null, canonical: string | null) =>
    canonical === null ? cfg.miss.emoji : (cfg.tiers.find((t) => t.name === tier)?.emoji ?? "");
  return cats.map((c) => ({
    title: c.title,
    answers: rows
      .filter((r) => r.position === c.position)
      .map((r) => {
        const m = memberOf.get(r.gameId)!;
        return { memberId: m.memberId, nickname: m.nickname, answer: r.canonical, km: r.km ?? 0, emoji: emoji(r.tier, r.canonical) };
      })
      .sort((a, b) => b.km - a.km || a.nickname.localeCompare(b.nickname, "hr")),
  }));
}
