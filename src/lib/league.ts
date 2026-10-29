import { computeStats } from "./stats";

export const PERIODS = ["day", "week", "month", "all"] as const;
export type Period = (typeof PERIODS)[number];
export const PERIOD_LABEL: Record<Period, string> = { day: "Danas", week: "Tjedan", month: "Mjesec", all: "Ukupno" };

export const LEAGUE_LIMITS = { leaguesPerPlayer: 10, membersPerLeague: 50 };

// bez znakova koji se lako zamijene (0/O, 1/I/L)
const CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
export const CODE_RE = /^[A-HJ-KM-NP-Z2-9]{6}$/;

// kod je pozivnica: tko ga zna, ulazi u ligu i vidi odgovore članova, pa slučajan iz kriptografskog izvora
// (Math.random se da predvidjeti iz ranijih izlaza)
const secureRandom = () => crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32;

export function newLeagueCode(random = secureRandom): string {
  let s = "";
  for (let i = 0; i < 6; i++) s += CODE_ALPHABET[Math.floor(random() * CODE_ALPHABET.length)];
  return s;
}

const NAME = /^[\p{L}\p{N} _.,'!?&()-]{2,40}$/u;
export function cleanLeagueName(raw: unknown): string | null {
  const name = typeof raw === "string" ? raw.trim().replace(/\s+/g, " ") : "";
  return NAME.test(name) ? name : null;
}

const toIdx = (d: string) => {
  const [y, m, day] = d.split("-").map(Number);
  return Math.round(Date.UTC(y, m - 1, day) / 86400000);
};
const fromIdx = (i: number) => new Date(i * 86400000).toISOString().slice(0, 10);

/** Prvi dan razdoblja (uključivo). Tjedan kreće od ponedjeljka; "all" od osnivanja lige. */
export function periodStart(period: Period, today: string, leagueStart: string): string {
  if (period === "day") return today;
  if (period === "month") return today.slice(0, 8) + "01";
  if (period === "week") {
    const i = toIdx(today);
    const weekday = (new Date(i * 86400000).getUTCDay() + 6) % 7; // pon = 0
    return fromIdx(i - weekday);
  }
  return leagueStart;
}

export type MemberGame = { playerId: string; date: string; km: number };
export type Member = { memberId: number; playerId: string; nickname: string };

export type StandingRow = {
  memberId: number;
  nickname: string;
  rank: number;
  km: number; // zbroj km u razdoblju
  played: number; // odigrani dani u razdoblju
  avgKm: number;
  bestKm: number;
  bestDate: string | null; // dan najboljeg rezultata u razdoblju (kod jednakih km, raniji)
  wins: number; // dani u razdoblju na kojima je imao najviše km u ligi (dijeljeno prvo mjesto se računa svima)
  streak: number; // trenutni streak, neovisno o razdoblju
};

/** Tablica lige iz završenih partija članova. Poredak: km, pa prosjek, pa nadimak. */
export function computeStandings(members: Member[], games: MemberGame[], from: string, today: string): StandingRow[] {
  const inPeriod = games.filter((g) => g.date >= from && g.date <= today);
  const best = new Map<string, number>();
  for (const g of inPeriod) best.set(g.date, Math.max(best.get(g.date) ?? 0, g.km));

  const rows = members.map((m) => {
    const all = games.filter((g) => g.playerId === m.playerId);
    const mine = inPeriod.filter((g) => g.playerId === m.playerId);
    const km = mine.reduce((a, g) => a + g.km, 0);
    const top = mine.reduce<MemberGame | null>((b, g) => (!b || g.km > b.km || (g.km === b.km && g.date < b.date) ? g : b), null);
    return {
      memberId: m.memberId,
      nickname: m.nickname,
      rank: 0,
      km,
      played: mine.length,
      avgKm: mine.length ? Math.round(km / mine.length) : 0,
      bestKm: top?.km ?? 0,
      bestDate: top?.date ?? null,
      wins: mine.filter((g) => g.km > 0 && g.km === best.get(g.date)).length,
      streak: computeStats(all, today).currentStreak,
    };
  });
  rows.sort((a, b) => b.km - a.km || b.avgKm - a.avgKm || a.nickname.localeCompare(b.nickname, "hr"));
  rows.forEach((r, i) => {
    const prev = rows[i - 1];
    r.rank = prev && prev.km === r.km ? prev.rank : i + 1;
  });
  return rows;
}

/** Sedam datuma tjedna (pon–ned) koji počinje danom `monday`. */
export function weekDays(monday: string): string[] {
  const i = toIdx(monday);
  return Array.from({ length: 7 }, (_, d) => fromIdx(i + d));
}

/** Pomak datuma za n dana (npr. -7 za prošli tjedan). */
export function addDays(date: string, n: number): string {
  return fromIdx(toIdx(date) + n);
}

export type DayAvg = { date: string; avgKm: number | null; players: number };

/** Prosječni km po danu, samo od onih koji su taj dan završili partiju; dan bez ijedne partije ima avgKm null. */
export function dailyAverages(games: { date: string; km: number }[], days: string[]): DayAvg[] {
  return days.map((date) => {
    const kms = games.filter((g) => g.date === date).map((g) => g.km);
    return { date, avgKm: kms.length ? Math.round(kms.reduce((a, k) => a + k, 0) / kms.length) : null, players: kms.length };
  });
}

// ---------- Utrka na karti ----------

// boje kružića članova na karti; dovoljno različite od boja prijevoza i od karte
export const RACE_COLORS = ["#e4572e", "#2e86de", "#8e44ad", "#16a085", "#d81b60", "#f39c12", "#3d5a80", "#6d4c41", "#00897b", "#c0392b"];

const letters = (s: string) => [...s.normalize("NFC")].filter((c) => /\p{L}|\p{N}/u.test(c));

/**
 * Kratke oznake članova za kružiće na karti: prvo slovo nadimka, a kad dvoje počinje istim slovom
 * inicijali dviju riječi ("MH") ili prva dva slova ("Ma", "Mi"); ako ni to ne pomaže, slovo i broj.
 */
export function raceTags(nicknames: string[]): string[] {
  const first = (n: string) => (letters(n)[0] ?? "?").toLocaleUpperCase("hr");
  const second = (n: string) => {
    const words = n.trim().split(/\s+/).map(letters).filter((w) => w.length);
    if (words.length >= 2) return (words[0][0] + words[1][0]).toLocaleUpperCase("hr");
    const w = words[0] ?? ["?"];
    return w[0].toLocaleUpperCase("hr") + (w[1] ?? "").toLocaleLowerCase("hr");
  };
  const count = (tags: string[]) => tags.reduce((m, t) => m.set(t, (m.get(t) ?? 0) + 1), new Map<string, number>());
  let tags = nicknames.map(first);
  const c1 = count(tags);
  tags = tags.map((t, i) => (c1.get(t)! > 1 ? second(nicknames[i]) : t));
  const c2 = count(tags), seen = new Map<string, number>();
  return tags.map((t) => {
    if (c2.get(t)! === 1) return t;
    const k = (seen.get(t) ?? 0) + 1;
    seen.set(t, k);
    return t[0] + k;
  });
}

/** Km nakon prvih `step` kategorija (Infinity = sve odigrane). */
export const kmAfter = (kms: number[], step: number) => kms.slice(0, step).reduce((a, k) => a + k, 0);

// ---------- Pomak u tablici ----------

/** Pomak mjesta od jučer (+2 = skočio dva mjesta); null kad jučer nije bio u razdoblju (prvi dan tjedna, mjeseca). */
export function rankMoves(now: StandingRow[], before: StandingRow[] | null): Map<number, number | null> {
  const prev = new Map(before?.map((r) => [r.memberId, r.rank]));
  return new Map(now.map((r) => [r.memberId, before && prev.has(r.memberId) ? prev.get(r.memberId)! - r.rank : null]));
}

// ---------- Nagrade dana ----------

export const REACTIONS = ["😂", "🔥", "😮", "😢", "👏", "✍️"] as const;
export type Reaction = (typeof REACTIONS)[number];
export const isReaction = (x: unknown): x is Reaction => REACTIONS.includes(x as Reaction);

/** Jedna današnja runda člana koji je završio partiju. */
export type AwardRound = {
  memberId: number;
  nickname: string;
  position: number;
  title: string;
  answerId: number | null;
  answer: string | null;
  share: number | null; // % igrača u trenutku odgovora
  rare: boolean; // helikopter
  ms: number | null; // vrijeme točnog odgovora
  reactions: number;
};

type Who = { memberId: number; nickname: string };
export type DayAwards = {
  /** Zokijeva desna ruka: helikopter ako ga je itko dobio, inače najmanji % igrača. */
  rare: (Who & { position: number; title: string; answer: string; share: number | null; heli: boolean }) | null;
  /** Ista misao: isti odgovor na istom pitanju, najviše tri, najveće i najrjeđe grupe prve. */
  same: { position: number; title: string; answer: string; members: Who[] }[];
  /** Najbrži prst: najbrži točan odgovor. */
  fastest: (Who & { title: string; answer: string; ms: number }) | null;
  /** Radovi na cesti: najviše promašaja (svi s istim brojem). */
  roadworks: { members: Who[]; misses: number } | null;
  /** Odgovor dana: najviše reakcija ekipe (barem dvije). */
  liked: (Who & { title: string; answer: string; reactions: number }) | null;
};

const who = (r: AwardRound): Who => ({ memberId: r.memberId, nickname: r.nickname });

export function dayAwards(rounds: AwardRound[]): DayAwards {
  const hits = rounds.filter((r) => r.answerId !== null && r.answer !== null);
  const rarest = [...hits].sort(
    (a, b) => +b.rare - +a.rare || (a.share ?? Infinity) - (b.share ?? Infinity) || (a.ms ?? Infinity) - (b.ms ?? Infinity),
  )[0];

  const groups = new Map<string, AwardRound[]>();
  for (const r of hits) {
    const k = `${r.position}|${r.answerId}`;
    groups.set(k, [...(groups.get(k) ?? []), r]);
  }
  const same = [...groups.values()]
    .filter((g) => new Set(g.map((r) => r.memberId)).size > 1)
    .sort((a, b) => b.length - a.length || (a[0].share ?? Infinity) - (b[0].share ?? Infinity) || a[0].position - b[0].position)
    .slice(0, 3)
    .map((g) => ({ position: g[0].position, title: g[0].title, answer: g[0].answer!, members: g.map(who) }));

  const fast = hits.filter((r) => r.ms !== null).sort((a, b) => a.ms! - b.ms!)[0];

  const misses = new Map<number, { w: Who; n: number }>();
  for (const r of rounds) {
    const m = misses.get(r.memberId) ?? { w: who(r), n: 0 };
    if (r.answerId === null) m.n++;
    misses.set(r.memberId, m);
  }
  const most = Math.max(0, ...[...misses.values()].map((m) => m.n));

  const liked = [...hits].filter((r) => r.reactions >= 2).sort((a, b) => b.reactions - a.reactions || a.position - b.position)[0];

  return {
    rare: rarest ? { ...who(rarest), position: rarest.position, title: rarest.title, answer: rarest.answer!, share: rarest.share, heli: rarest.rare } : null,
    same,
    fastest: fast ? { ...who(fast), title: fast.title, answer: fast.answer!, ms: fast.ms! } : null,
    roadworks: most > 0 ? { members: [...misses.values()].filter((m) => m.n === most).map((m) => m.w), misses: most } : null,
    liked: liked ? { ...who(liked), title: liked.title, answer: liked.answer!, reactions: liked.reactions } : null,
  };
}

// ---------- Dvorana slavnih ----------

export type HallWeek = { from: string; winners: { memberId: number; nickname: string; km: number }[] };

/** Pobjednici svih završenih tjedana od osnivanja lige (najnoviji prvi); tjedan bez ijednog km se preskače. */
export function hallOfFame(members: Member[], games: MemberGame[], leagueStart: string, today: string): HallWeek[] {
  const thisWeek = periodStart("week", today, today);
  const out: HallWeek[] = [];
  for (let from = periodStart("week", leagueStart, leagueStart); from < thisWeek; from = addDays(from, 7)) {
    const table = computeStandings(members, games, from, addDays(from, 6));
    if (!table[0]?.km) continue;
    out.unshift({ from, winners: table.filter((r) => r.rank === 1).map((r) => ({ memberId: r.memberId, nickname: r.nickname, km: r.km })) });
  }
  return out;
}

/** Broj osvojenih tjedana po članu. */
export function crowns(weeks: HallWeek[]): Map<number, number> {
  const n = new Map<number, number>();
  for (const w of weeks) for (const x of w.winners) n.set(x.memberId, (n.get(x.memberId) ?? 0) + 1);
  return n;
}

// ---------- Dvoboj i legende ----------

export type GroupRound = { playerId: string; date: string; group: string; km: number };

export type Duel = {
  days: number; // dani koje su igrali oboje
  wins: number;
  losses: number;
  ties: number;
  last: ("w" | "l" | "t")[]; // zadnjih 10 zajedničkih dana, najstariji prvi
  bestWin: { date: string; margin: number } | null;
  worstLoss: { date: string; margin: number } | null;
  groups: { group: string; me: number | null; them: number | null }[]; // prosjek km po pitanju
};

/** Međusobni omjer dvaju igrača na danima koje su oboje odigrali. */
export function duel(me: string, them: string, games: MemberGame[], rounds: GroupRound[], groupKeys: string[]): Duel {
  const mine = new Map(games.filter((g) => g.playerId === me).map((g) => [g.date, g.km]));
  const common = games
    .filter((g) => g.playerId === them && mine.has(g.date))
    .map((g) => ({ date: g.date, diff: mine.get(g.date)! - g.km }))
    .sort((a, b) => a.date.localeCompare(b.date));
  const best = common.filter((c) => c.diff > 0).sort((a, b) => b.diff - a.diff || b.date.localeCompare(a.date))[0];
  const worst = common.filter((c) => c.diff < 0).sort((a, b) => a.diff - b.diff || b.date.localeCompare(a.date))[0];
  const dates = new Set(common.map((c) => c.date));
  const avg = (pid: string, group: string) => {
    const kms = rounds.filter((r) => r.playerId === pid && r.group === group && dates.has(r.date)).map((r) => r.km);
    return kms.length ? Math.round(kms.reduce((a, k) => a + k, 0) / kms.length) : null;
  };
  return {
    days: common.length,
    wins: common.filter((c) => c.diff > 0).length,
    losses: common.filter((c) => c.diff < 0).length,
    ties: common.filter((c) => c.diff === 0).length,
    last: common.slice(-10).map((c) => (c.diff > 0 ? "w" : c.diff < 0 ? "l" : "t")),
    bestWin: best ? { date: best.date, margin: best.diff } : null,
    worstLoss: worst ? { date: worst.date, margin: -worst.diff } : null,
    groups: groupKeys.map((group) => ({ group, me: avg(me, group), them: avg(them, group) })),
  };
}

export const LEGEND_DAYS = 30;
export const LEGEND_MIN_DAYS = 3;

/**
 * Legenda grupe: član s najvećim prosjekom km po pitanju te grupe u zadnjih 30 dana (barem 3 odigrana dana);
 * kod istog prosjeka više odigranih pitanja. Grupa bez ikoga s dovoljno dana nema legendu.
 */
export function groupLegends(members: Member[], rounds: GroupRound[], groupKeys: string[]): { group: string; memberId: number; nickname: string; avg: number }[] {
  const out: { group: string; memberId: number; nickname: string; avg: number }[] = [];
  for (const group of groupKeys) {
    let top: { m: Member; avg: number; n: number } | null = null;
    for (const m of members) {
      const mine = rounds.filter((r) => r.playerId === m.playerId);
      if (new Set(mine.map((r) => r.date)).size < LEGEND_MIN_DAYS) continue;
      const kms = mine.filter((r) => r.group === group).map((r) => r.km);
      if (!kms.length) continue;
      const avg = kms.reduce((a, k) => a + k, 0) / kms.length;
      if (!top || avg > top.avg || (avg === top.avg && kms.length > top.n)) top = { m, avg, n: kms.length };
    }
    if (top) out.push({ group, memberId: top.m.memberId, nickname: top.m.nickname, avg: Math.round(top.avg) });
  }
  return out;
}

// ---------- Kilometri ekipe ----------

// zračnom linijom iz Zagreba (otprilike); za BiH i Srbiju razlika je zanemariva za ovakvu usporedbu
const FAR = [
  { km: 384_400, to: "do Mjeseca" },
  { km: 40_075, to: "oko cijele Zemlje" },
  { km: 15_900, to: "do Sydneyja" },
  { km: 9_200, to: "do Tokija" },
  { km: 7_100, to: "do New Yorka" },
  { km: 3_900, to: "do Dubaija" },
  { km: 2_100, to: "do Kaira" },
  { km: 1_350, to: "do Londona" },
  { km: 1_080, to: "do Pariza" },
  { km: 520, to: "do Rima" },
  { km: 270, to: "do Beča" },
];

/** Najdalje odredište do kojeg bi ekipa stigla zajedničkim km ("do Tokija"), ili null ispod 270 km. */
export function teamReach(km: number): string | null {
  return FAR.find((f) => km >= f.km)?.to ?? null;
}
