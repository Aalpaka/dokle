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
