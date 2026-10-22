import { computeStats } from "./stats";

export const PERIODS = ["day", "week", "month", "all"] as const;
export type Period = (typeof PERIODS)[number];
export const PERIOD_LABEL: Record<Period, string> = { day: "Danas", week: "Tjedan", month: "Mjesec", all: "Ukupno" };

export const LEAGUE_LIMITS = { leaguesPerPlayer: 10, membersPerLeague: 50 };

// bez znakova koji se lako zamijene (0/O, 1/I/L)
const CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
export const CODE_RE = /^[A-HJ-KM-NP-Z2-9]{6}$/;

export function newLeagueCode(random = Math.random): string {
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
    return {
      memberId: m.memberId,
      nickname: m.nickname,
      rank: 0,
      km,
      played: mine.length,
      avgKm: mine.length ? Math.round(km / mine.length) : 0,
      bestKm: mine.length ? Math.max(...mine.map((g) => g.km)) : 0,
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
