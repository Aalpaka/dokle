import "server-only";
import { and, asc, count, eq, gte, inArray, isNotNull, sql } from "drizzle-orm";
import { db } from "@/db";
import { answers, attempts, categories, dailyPuzzles, games, leagueMembers, leagueReactions, leagues, players, puzzleCategories, rounds } from "@/db/schema";
import { localDate } from "@/lib/day";
import { placeAt } from "@/skins/mjesta";
import {
  LEAGUE_LIMITS,
  LEGEND_DAYS,
  addDays,
  computeStandings,
  crowns,
  dailyAverages,
  dayAwards,
  duel,
  groupLegends,
  hallOfFame,
  newLeagueCode,
  periodStart,
  RACE_COLORS,
  raceTags,
  rankMoves,
  teamReach,
  weekDays,
  type AwardRound,
  type DayAvg,
  type DayAwards,
  type Duel,
  type GroupRound,
  type HallWeek,
  type Member,
  type MemberGame,
  type Period,
  type Reaction,
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
    await tx.delete(leagueReactions).where(and(eq(leagueReactions.leagueId, league.id), eq(leagueReactions.playerId, playerId)));
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
  await db.transaction(async (tx) => {
    await tx.delete(leagueMembers).where(eq(leagueMembers.id, memberId));
    await tx.delete(leagueReactions).where(and(eq(leagueReactions.leagueId, league.id), eq(leagueReactions.playerId, m.playerId)));
  });
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
        eq(games.ranked, true),
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

export type TodayStatus = {
  memberId: number;
  nickname: string;
  tag: string; // oznaka i boja kao u utrci na karti
  color: string;
  status: "done" | "playing" | "none";
  km: number; // dok igra: km do zadnje bodovane kategorije
  played: number; // bodovane kategorije
};
export type TodayAnswer = {
  memberId: number;
  nickname: string;
  answer: string | null;
  km: number;
  emoji: string;
  reactions: Partial<Record<Reaction, number>>;
  mine: Reaction | null; // moja reakcija na ovaj odgovor
  tag: "rare" | "same" | null; // Zokijeva desna ruka / ista misao
};
export type TodayAnswers = { position: number; title: string; group: string; answers: TodayAnswer[] }[];
export type StandingView = StandingRow & { move: number | null; crowns: number };
export type Legend = { group: string; memberId: number; nickname: string; avg: number };

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
  weekFrom?: string; // ponedjeljak tekućeg tjedna: pitanja i odgovori vide se samo za dane od tad
  standings?: StandingView[];
  today?: TodayStatus[];
  perDay?: number; // kategorija u partiji
  answers?: TodayAnswers | null; // null dok igrač nije završio današnju partiju
  awards?: DayAwards | null; // null dok igrač nije završio, ili dok nisu završila barem dvojica
  week?: { today: string; days: DayAvg[]; km: number; reach: string | null }; // tekući tjedan pon–ned
  hall?: HallWeek[];
  legends?: Legend[];
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
  const weekFrom = periodStart("week", today, today);
  const ids = members.map((m) => m.playerId);
  // streak treba i dane prije razdoblja
  const all = await finishedGames(skin, ids);
  const hall = hallOfFame(members, all, leagueStart, today);
  const crowned = crowns(hall);
  // pomak od jučer: tablica istog razdoblja do jučer (prvog dana razdoblja nema s čim usporediti)
  const yesterday = addDays(today, -1);
  const rows = computeStandings(members, all, from, today);
  const moves = rankMoves(rows, period !== "day" && yesterday >= from ? computeStandings(members, all, from, yesterday) : null);
  const standings = rows.map((r) => ({ ...r, move: moves.get(r.memberId) ?? null, crowns: crowned.get(r.memberId) ?? 0 }));
  // graf prosjeka i zajednički km uvijek za tekući tjedan, neovisno o odabranom razdoblju tablice
  const weekKm = all.filter((g) => g.date >= weekFrom && g.date <= today).reduce((a, g) => a + g.km, 0);
  const week = { today, days: dailyAverages(all, weekDays(weekFrom)), km: weekKm, reach: teamReach(weekKm) };

  const [puzzle] = await db
    .select()
    .from(dailyPuzzles)
    .where(and(eq(dailyPuzzles.skinId, skin.id), eq(dailyPuzzles.date, today)));
  const todays = puzzle
    ? await db
        .select({ id: games.id, playerId: games.playerId, finishedAt: games.finishedAt, km: games.totalKm })
        .from(games)
        .where(and(eq(games.puzzleId, puzzle.id), eq(games.ranked, true), inArray(games.playerId, ids)))
    : [];
  // tko još igra: km do zadnje bodovane kategorije, kao u utrci na karti (bez odgovora)
  const progress = todays.length
    ? await db
        .select({ gameId: rounds.gameId, n: sql<number>`count(*)::int`, km: sql<number>`coalesce(sum(${rounds.km}), 0)::int` })
        .from(rounds)
        .where(and(inArray(rounds.gameId, todays.map((g) => g.id)), isNotNull(rounds.km)))
        .groupBy(rounds.gameId)
    : [];
  const progressOf = new Map(progress.map((p) => [p.gameId, p]));
  const byPlayer = new Map(todays.map((g) => [g.playerId, g]));
  const tags = raceTags(members.map((m) => m.nickname));
  const todayStatus: TodayStatus[] = members
    .map((m, j) => {
      const g = byPlayer.get(m.playerId);
      const p = g ? progressOf.get(g.id) : undefined;
      const status: TodayStatus["status"] = !g ? "none" : g.finishedAt ? "done" : "playing";
      return {
        memberId: m.memberId,
        nickname: m.nickname,
        tag: tags[j],
        color: RACE_COLORS[j % RACE_COLORS.length],
        status,
        km: g?.finishedAt ? g.km : (p?.km ?? 0),
        played: p?.n ?? 0,
      };
    })
    .sort((a, b) => b.km - a.km || a.nickname.localeCompare(b.nickname, "hr"));

  const mineToday = byPlayer.get(me.playerId);
  const day = puzzle && mineToday?.finishedAt ? await dayAnswers(skin, league.id, me.playerId, puzzle.id, members, todays) : null;
  const legends = await leagueLegends(skin, members, today);
  return {
    ...base,
    period,
    from,
    weekFrom,
    standings,
    today: todayStatus,
    perDay: puzzle ? (await puzzleCats(puzzle.id)).length : 0,
    answers: day?.answers ?? null,
    awards: day?.awards ?? null,
    week,
    hall,
    legends,
  };
}

async function puzzleCats(puzzleId: number) {
  return db
    .select({ position: puzzleCategories.position, title: categories.title, group: categories.group })
    .from(puzzleCategories)
    .innerJoin(categories, eq(categories.id, puzzleCategories.categoryId))
    .where(eq(puzzleCategories.puzzleId, puzzleId))
    .orderBy(asc(puzzleCategories.position));
}

/** Odgovori završenih partija jednog dana po kategorijama, s reakcijama lige i nagradama dana. */
async function dayAnswers(
  skin: Skin,
  leagueId: number,
  viewerId: string,
  puzzleId: number,
  members: Member[],
  todays: { id: number; playerId: string; finishedAt: Date | null }[],
): Promise<{ answers: TodayAnswers; awards: DayAwards | null }> {
  const cats = await puzzleCats(puzzleId);
  const done = todays.filter((g) => g.finishedAt);
  const gameIds = done.map((g) => g.id);
  const rows = done.length
    ? await db
        .select({
          gameId: rounds.gameId,
          position: rounds.position,
          answerId: rounds.answerId,
          canonical: answers.canonical,
          km: rounds.km,
          tier: rounds.tier,
          share: rounds.share,
        })
        .from(rounds)
        .leftJoin(answers, eq(answers.id, rounds.answerId))
        .where(inArray(rounds.gameId, gameIds))
    : [];
  // vrijeme točnog odgovora (naknadno prihvaćeni odgovori ga nemaju, pa ne ulaze u najbrži prst)
  const times = done.length
    ? await db
        .select({ gameId: attempts.gameId, position: attempts.position, ms: sql<number>`min(${attempts.elapsedMs})::int` })
        .from(attempts)
        .where(and(inArray(attempts.gameId, gameIds), eq(attempts.accepted, true)))
        .groupBy(attempts.gameId, attempts.position)
    : [];
  const msOf = new Map(times.map((t) => [`${t.gameId}|${t.position}`, t.ms]));
  const reacts = done.length
    ? await db
        .select({ gameId: leagueReactions.gameId, position: leagueReactions.position, playerId: leagueReactions.playerId, emoji: leagueReactions.emoji })
        .from(leagueReactions)
        .where(and(eq(leagueReactions.leagueId, leagueId), inArray(leagueReactions.gameId, gameIds), inArray(leagueReactions.playerId, members.map((m) => m.playerId))))
    : [];
  const memberOf = new Map(done.map((g) => [g.id, members.find((m) => m.playerId === g.playerId)!]));
  const cfg = skin.config;
  const rareTier = cfg.tiers.find((t) => t.rare)?.name;
  const emoji = (tier: string | null, canonical: string | null) =>
    canonical === null ? cfg.miss.emoji : (cfg.tiers.find((t) => t.name === tier)?.emoji ?? "");
  const titleOf = new Map(cats.map((c) => [c.position, c.title]));
  const reactionsOf = (gameId: number, position: number) => reacts.filter((x) => x.gameId === gameId && x.position === position);

  const awardRounds: AwardRound[] = rows.map((r) => {
    const m = memberOf.get(r.gameId)!;
    return {
      memberId: m.memberId,
      nickname: m.nickname,
      position: r.position,
      title: titleOf.get(r.position) ?? "",
      answerId: r.canonical === null ? null : r.answerId,
      answer: r.canonical,
      share: r.share,
      rare: !!rareTier && r.tier === rareTier,
      ms: msOf.get(`${r.gameId}|${r.position}`) ?? null,
      reactions: reactionsOf(r.gameId, r.position).length,
    };
  });
  // nagrade imaju smisla tek kad su završila barem dvojica
  const awards = done.length >= 2 ? dayAwards(awardRounds) : null;
  const sameKeys = new Set(awards?.same.flatMap((s) => s.members.map((m) => `${m.memberId}|${s.position}`)));
  const rareKey = awards?.rare ? `${awards.rare.memberId}|${awards.rare.position}` : null;

  const out = cats.map((c) => ({
    position: c.position,
    title: c.title,
    group: c.group,
    answers: rows
      .filter((r) => r.position === c.position)
      .map((r): TodayAnswer => {
        const m = memberOf.get(r.gameId)!;
        const rs = reactionsOf(r.gameId, r.position);
        const counts: Partial<Record<Reaction, number>> = {};
        for (const x of rs) counts[x.emoji as Reaction] = (counts[x.emoji as Reaction] ?? 0) + 1;
        const key = `${m.memberId}|${r.position}`;
        return {
          memberId: m.memberId,
          nickname: m.nickname,
          answer: r.canonical,
          km: r.km ?? 0,
          emoji: emoji(r.tier, r.canonical),
          reactions: counts,
          mine: (rs.find((x) => x.playerId === viewerId)?.emoji as Reaction | undefined) ?? null,
          tag: key === rareKey ? "rare" : sameKeys.has(key) ? "same" : null,
        };
      })
      .sort((a, b) => b.km - a.km || a.nickname.localeCompare(b.nickname, "hr")),
  }));
  return { answers: out, awards };
}

/** Km po pitanju s grupom pitanja, za dvoboj i legende. */
async function groupRounds(skin: Skin, playerIds: string[], from?: string): Promise<GroupRound[]> {
  if (!playerIds.length) return [];
  return db
    .select({ playerId: games.playerId, date: dailyPuzzles.date, group: categories.group, km: sql<number>`coalesce(${rounds.km}, 0)::int` })
    .from(rounds)
    .innerJoin(games, eq(games.id, rounds.gameId))
    .innerJoin(dailyPuzzles, eq(dailyPuzzles.id, games.puzzleId))
    .innerJoin(categories, eq(categories.id, rounds.categoryId))
    .where(
      and(
        inArray(games.playerId, playerIds),
        eq(dailyPuzzles.skinId, skin.id),
        eq(games.ranked, true),
        isNotNull(games.finishedAt),
        from ? gte(dailyPuzzles.date, from) : undefined,
      ),
    );
}

const groupKeys = (skin: Skin) => Object.keys(skin.config.groups);

/** Legende lige po grupama pitanja u zadnjih 30 dana. */
async function leagueLegends(skin: Skin, members: Member[], today: string): Promise<Legend[]> {
  const rows = await groupRounds(skin, members.map((m) => m.playerId), addDays(today, -(LEGEND_DAYS - 1)));
  return groupLegends(members, rows, groupKeys(skin));
}

export type MemberDay = {
  nickname: string;
  date: string;
  number: number;
  km: number;
  station: string; // u genitivu: "stigao do Zadra"
  rounds: { title: string; answer: string | null; km: number; emoji: string }[];
};

/**
 * Jedan dan jednog člana lige (npr. najbolji rezultat iz tablice): pitanja i odgovori. Samo za dane tekućeg tjedna;
 * današnje odgovore vidi samo tko je i sam završio današnju partiju.
 */
export async function memberDay(skin: Skin, league: League, viewerId: string, memberId: number, date: string): Promise<MemberDay> {
  const members = await membersOf(league.id);
  if (!members.some((m) => m.playerId === viewerId)) throw new LeagueError("Nisi u ovoj ligi.");
  const member = members.find((m) => m.memberId === memberId);
  if (!member) throw new LeagueError("Taj igrač nije u ligi.");
  const today = localDate(skin.timezone);
  if (date < periodStart("week", today, today) || date > today) throw new LeagueError("Pitanja i odgovori vide se samo za ovaj tjedan.");
  const [puzzle] = await db
    .select()
    .from(dailyPuzzles)
    .where(and(eq(dailyPuzzles.skinId, skin.id), eq(dailyPuzzles.date, date)));
  const game = puzzle
    ? (await db.select().from(games).where(and(eq(games.puzzleId, puzzle.id), eq(games.playerId, member.playerId))))[0]
    : undefined;
  if (!puzzle || !game?.finishedAt) throw new LeagueError("Taj dan nema završene partije.");
  if (date === today && viewerId !== member.playerId) {
    const [mine] = await db.select().from(games).where(and(eq(games.puzzleId, puzzle.id), eq(games.playerId, viewerId)));
    if (!mine?.finishedAt) throw new LeagueError("Odigraj današnju partiju pa ćeš vidjeti tuđe današnje odgovore.");
  }
  const { answers: cats } = await dayAnswers(skin, league.id, viewerId, puzzle.id, members, [game]);
  return {
    nickname: member.nickname,
    date,
    number: puzzle.number,
    km: game.totalKm,
    station: placeAt(skin.id, skin.config, game.totalKm),
    rounds: cats.map((c) => {
      const a = c.answers[0];
      return { title: c.title, answer: a?.answer ?? null, km: a?.km ?? 0, emoji: a?.emoji ?? skin.config.miss.emoji };
    }),
  };
}

export type PastWeek = { from: string; standings: (Omit<StandingRow, "bestDate" | "streak">)[]; days: DayAvg[] };

/** Tablica i graf prosjeka jednog završenog tjedna (dvorana slavnih); bez pitanja i odgovora. */
export async function pastWeek(skin: Skin, league: League, viewerId: string, from: string): Promise<PastWeek> {
  const members = await membersOf(league.id);
  if (!members.some((m) => m.playerId === viewerId)) throw new LeagueError("Nisi u ovoj ligi.");
  const today = localDate(skin.timezone);
  const leagueStart = localDate(skin.timezone, league.createdAt);
  if (periodStart("week", from, from) !== from || from >= periodStart("week", today, today) || from < periodStart("week", leagueStart, leagueStart))
    throw new LeagueError("Taj tjedan nije u povijesti lige.");
  const games = await finishedGames(skin, members.map((m) => m.playerId), from);
  const to = addDays(from, 6);
  const week = games.filter((g) => g.date <= to);
  return {
    from,
    standings: computeStandings(members, week, from, to).map(({ bestDate: _d, streak: _s, ...r }) => r),
    days: dailyAverages(week, weekDays(from)),
  };
}

export type MemberDuel = Duel & { me: string; them: string; legends: Legend[] };

/** Dvoboj gledatelja s članom lige: dani koje su oboje odigrali, bez pitanja i odgovora. */
export async function memberDuel(skin: Skin, league: League, viewerId: string, memberId: number): Promise<MemberDuel> {
  const members = await membersOf(league.id);
  const me = members.find((m) => m.playerId === viewerId);
  if (!me) throw new LeagueError("Nisi u ovoj ligi.");
  const them = members.find((m) => m.memberId === memberId);
  if (!them) throw new LeagueError("Taj igrač nije u ligi.");
  if (them.playerId === viewerId) throw new LeagueError("Dvoboj sa samim sobom uvijek završi neriješeno.");
  const pair = [me.playerId, them.playerId];
  const games: MemberGame[] = await finishedGames(skin, pair);
  const today = localDate(skin.timezone);
  const legends = (await leagueLegends(skin, members, today)).filter((l) => l.memberId === me.memberId || l.memberId === them.memberId);
  return { ...duel(me.playerId, them.playerId, games, await groupRounds(skin, pair), groupKeys(skin)), me: me.nickname, them: them.nickname, legends };
}

/** Reakcija na današnji odgovor člana; null je briše. Samo tko je završio današnju partiju, i ne na svoje odgovore. */
export async function reactToAnswer(skin: Skin, league: League, viewerId: string, memberId: number, position: number, emoji: Reaction | null) {
  const members = await membersOf(league.id);
  if (!members.some((m) => m.playerId === viewerId)) throw new LeagueError("Nisi u ovoj ligi.");
  const target = members.find((m) => m.memberId === memberId);
  if (!target) throw new LeagueError("Taj igrač nije u ligi.");
  if (target.playerId === viewerId) throw new LeagueError("Na svoje odgovore ne možeš reagirati.");
  const [puzzle] = await db
    .select()
    .from(dailyPuzzles)
    .where(and(eq(dailyPuzzles.skinId, skin.id), eq(dailyPuzzles.date, localDate(skin.timezone))));
  const day = puzzle
    ? await db.select().from(games).where(and(eq(games.puzzleId, puzzle.id), inArray(games.playerId, [viewerId, target.playerId])))
    : [];
  const mine = day.find((g) => g.playerId === viewerId);
  const theirs = day.find((g) => g.playerId === target.playerId);
  if (!mine?.finishedAt) throw new LeagueError("Odigraj današnju partiju pa možeš reagirati.");
  if (!theirs?.finishedAt || !theirs.ranked) throw new LeagueError("Taj igrač danas još nije završio.");
  const [round] = await db.select().from(rounds).where(and(eq(rounds.gameId, theirs.id), eq(rounds.position, position)));
  if (!round) throw new LeagueError("Nema tog pitanja.");
  const where = and(
    eq(leagueReactions.leagueId, league.id),
    eq(leagueReactions.gameId, theirs.id),
    eq(leagueReactions.position, position),
    eq(leagueReactions.playerId, viewerId),
  );
  if (!emoji) return void (await db.delete(leagueReactions).where(where));
  await db
    .insert(leagueReactions)
    .values({ leagueId: league.id, gameId: theirs.id, position, playerId: viewerId, emoji })
    .onConflictDoUpdate({
      target: [leagueReactions.leagueId, leagueReactions.gameId, leagueReactions.position, leagueReactions.playerId],
      set: { emoji, createdAt: new Date() },
    });
}

// ---------- Utrka na karti ----------

export type RaceRunner = { memberId: number; nickname: string; tag: string; color: string; kms: number[]; done: boolean };
export type RaceLeague = { code: string; name: string; members: number; me: { tag: string; color: string }; runners: RaceRunner[] };

/**
 * Današnja utrka u svim ligama igrača: km po kategoriji svakog člana koji je danas igrao (i onih koji još igraju,
 * do zadnje bodovane kategorije). Odgovori se ne šalju, samo km, pa se utrka vidi i dok igrač još igra.
 */
export async function leagueRace(skin: Skin, playerId: string): Promise<RaceLeague[]> {
  const mine = await db
    .select({ l: leagues })
    .from(leagueMembers)
    .innerJoin(leagues, eq(leagues.id, leagueMembers.leagueId))
    .where(and(eq(leagueMembers.playerId, playerId), eq(leagues.skinId, skin.id)))
    .orderBy(asc(leagueMembers.joinedAt));
  if (!mine.length) return [];
  const [puzzle] = await db
    .select()
    .from(dailyPuzzles)
    .where(and(eq(dailyPuzzles.skinId, skin.id), eq(dailyPuzzles.date, localDate(skin.timezone))));
  const rosters = await Promise.all(mine.map(({ l }) => membersOf(l.id)));
  const ids = [...new Set(rosters.flat().map((m) => m.playerId))].filter((id) => id !== playerId);
  const todays =
    puzzle && ids.length
      ? await db
          .select({ id: games.id, playerId: games.playerId, finishedAt: games.finishedAt })
          .from(games)
          .where(and(eq(games.puzzleId, puzzle.id), eq(games.ranked, true), inArray(games.playerId, ids)))
      : [];
  const rows = todays.length
    ? await db
        .select({ gameId: rounds.gameId, position: rounds.position, km: rounds.km })
        .from(rounds)
        .where(and(inArray(rounds.gameId, todays.map((g) => g.id)), isNotNull(rounds.km)))
        .orderBy(asc(rounds.position))
    : [];
  const kmsOf = new Map(todays.map((g) => [g.playerId, { kms: rows.filter((r) => r.gameId === g.id).map((r) => r.km ?? 0), done: !!g.finishedAt }]));

  return mine.map(({ l }, i) => {
    const members = rosters[i];
    // oznake i boje po redu ulaska u ligu, pa član u istoj ligi uvijek ima istu boju
    const tags = raceTags(members.map((m) => m.nickname));
    const look = members.map((m, j) => ({ m, tag: tags[j], color: RACE_COLORS[j % RACE_COLORS.length] }));
    const me = look.find((x) => x.m.playerId === playerId)!;
    return {
      code: l.code,
      name: l.name,
      members: members.length,
      me: { tag: me.tag, color: me.color },
      runners: look
        .filter((x) => x.m.playerId !== playerId && kmsOf.get(x.m.playerId)?.kms.length)
        .map((x) => ({ memberId: x.m.memberId, nickname: x.m.nickname, tag: x.tag, color: x.color, ...kmsOf.get(x.m.playerId)! })),
    };
  });
}
