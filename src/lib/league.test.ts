import { describe, expect, it } from "vitest";
import { CODE_RE, addDays, cleanLeagueName, computeStandings, dailyAverages, newLeagueCode, periodStart, weekDays } from "./league";

const members = [
  { memberId: 1, playerId: "a", nickname: "Ana" },
  { memberId: 2, playerId: "b", nickname: "Bruno" },
  { memberId: 3, playerId: "c", nickname: "Cvita" },
];

describe("periodStart", () => {
  it("tjedan od ponedjeljka", () => {
    expect(periodStart("week", "2026-10-22", "2026-01-01")).toBe("2026-10-19"); // četvrtak
    expect(periodStart("week", "2026-10-19", "2026-01-01")).toBe("2026-10-19"); // ponedjeljak
    expect(periodStart("week", "2026-10-25", "2026-01-01")).toBe("2026-10-19"); // nedjelja
    expect(periodStart("week", "2026-11-02", "2026-01-01")).toBe("2026-11-02");
  });
  it("mjesec, dan, ukupno", () => {
    expect(periodStart("month", "2026-10-22", "2026-01-01")).toBe("2026-10-01");
    expect(periodStart("day", "2026-10-22", "2026-01-01")).toBe("2026-10-22");
    expect(periodStart("all", "2026-10-22", "2026-10-05")).toBe("2026-10-05");
  });
});

describe("computeStandings", () => {
  const games = [
    { playerId: "a", date: "2026-10-20", km: 300 },
    { playerId: "b", date: "2026-10-20", km: 500 },
    { playerId: "a", date: "2026-10-21", km: 400 },
    { playerId: "b", date: "2026-10-21", km: 400 },
    { playerId: "a", date: "2026-10-22", km: 350 },
    { playerId: "c", date: "2026-10-12", km: 1000 }, // prošli tjedan
  ];

  it("zbroj km, pobjede i poredak u tjednu", () => {
    const t = computeStandings(members, games, "2026-10-19", "2026-10-22");
    expect(t.map((r) => [r.nickname, r.rank, r.km, r.played, r.wins])).toEqual([
      ["Ana", 1, 1050, 3, 2],
      ["Bruno", 2, 900, 2, 2],
      ["Cvita", 3, 0, 0, 0],
    ]);
    expect(t[0]).toMatchObject({ avgKm: 350, bestKm: 400, bestDate: "2026-10-21", streak: 3 });
    expect(t[2].bestDate).toBeNull();
    expect(t[1].streak).toBe(2); // zadnji put igrao jučer, streak živi
  });

  it("isti km dijele mjesto", () => {
    const t = computeStandings(members, games, "2026-10-21", "2026-10-21");
    expect(t.map((r) => [r.nickname, r.rank])).toEqual([["Ana", 1], ["Bruno", 1], ["Cvita", 3]]);
  });

  it("dan bez ijednog km nije pobjeda", () => {
    const t = computeStandings(members, [{ playerId: "a", date: "2026-10-22", km: 0 }], "2026-10-22", "2026-10-22");
    expect(t[0].wins).toBe(0);
  });
});

describe("kod i ime lige", () => {
  it("kod je 6 znakova iz abecede", () => {
    for (let i = 0; i < 50; i++) expect(newLeagueCode()).toMatch(CODE_RE);
    expect(CODE_RE.test("ABC10O")).toBe(false);
  });
  it("ime", () => {
    expect(cleanLeagueName("  Ekipa   iz   ureda ")).toBe("Ekipa iz ureda");
    expect(cleanLeagueName("x")).toBeNull();
    expect(cleanLeagueName("<script>")).toBeNull();
    expect(cleanLeagueName(5)).toBeNull();
  });
});

describe("prosjek po danu", () => {
  it("tjedan pon–ned, i preko kraja mjeseca", () => {
    expect(weekDays("2026-10-26")).toEqual(["2026-10-26", "2026-10-27", "2026-10-28", "2026-10-29", "2026-10-30", "2026-10-31", "2026-11-01"]);
    expect(addDays("2026-10-19", 7)).toBe("2026-10-26");
    expect(addDays("2026-03-02", -7)).toBe("2026-02-23");
  });
  it("broji samo odigrane, dan bez partija je null", () => {
    const days = weekDays("2026-10-19");
    const avg = dailyAverages(
      [
        { date: "2026-10-19", km: 300 },
        { date: "2026-10-19", km: 501 },
        { date: "2026-10-21", km: 0 },
        { date: "2026-10-12", km: 999 },
      ],
      days,
    );
    expect(avg[0]).toEqual({ date: "2026-10-19", avgKm: 401, players: 2 });
    expect(avg[1]).toEqual({ date: "2026-10-20", avgKm: null, players: 0 });
    expect(avg[2]).toEqual({ date: "2026-10-21", avgKm: 0, players: 1 });
    expect(avg).toHaveLength(7);
  });
});
