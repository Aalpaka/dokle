import { describe, expect, it } from "vitest";
import {
  CODE_RE,
  addDays,
  cleanLeagueName,
  computeStandings,
  crowns,
  dailyAverages,
  dayAwards,
  duel,
  groupLegends,
  hallOfFame,
  kmAfter,
  newLeagueCode,
  periodStart,
  raceTags,
  rankMoves,
  teamReach,
  weekDays,
  type AwardRound,
} from "./league";

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

describe("oznake za utrku", () => {
  it("prvo slovo dok je jedinstveno", () => {
    expect(raceTags(["Ana", "marko", "Željko"])).toEqual(["A", "M", "Ž"]);
  });
  it("isto prvo slovo: inicijali ili dva slova", () => {
    expect(raceTags(["Marko Horvat", "Mia", "Ivan"])).toEqual(["MH", "Mi", "I"]);
  });
  it("i dalje isto: slovo i broj", () => {
    expect(raceTags(["Putnik", "Putnik", "Petra"])).toEqual(["P1", "P2", "Pe"]);
  });
  it("km do koraka", () => {
    expect(kmAfter([100, 50, 0, 30], 2)).toBe(150);
    expect(kmAfter([100, 50], Infinity)).toBe(150);
  });
});

describe("pomak u tablici", () => {
  const games = [
    { playerId: "a", date: "2026-10-20", km: 500 },
    { playerId: "b", date: "2026-10-20", km: 300 },
    { playerId: "b", date: "2026-10-21", km: 400 },
  ];
  it("mjesta od jučer", () => {
    const now = computeStandings(members, games, "2026-10-19", "2026-10-21");
    const before = computeStandings(members, games, "2026-10-19", "2026-10-20");
    const m = rankMoves(now, before);
    expect(m.get(2)).toBe(1); // Bruno s drugog na prvo
    expect(m.get(1)).toBe(-1);
    expect(m.get(3)).toBe(0);
  });
  it("prvi dan razdoblja nema pomaka", () => {
    const now = computeStandings(members, games, "2026-10-21", "2026-10-21");
    expect([...rankMoves(now, null).values()]).toEqual([null, null, null]);
  });
});

describe("nagrade dana", () => {
  const r = (memberId: number, position: number, answerId: number | null, extra: Partial<AwardRound> = {}): AwardRound => ({
    memberId,
    nickname: ["", "Ana", "Bruno", "Cvita"][memberId],
    position,
    title: `Pitanje ${position}`,
    answerId,
    answer: answerId === null ? null : `Odgovor ${answerId}`,
    share: 10,
    rare: false,
    ms: 8000,
    reactions: 0,
    ...extra,
  });

  it("rijetka zvjerka je helikopter i kad netko ima manji udio", () => {
    const a = dayAwards([r(1, 0, 5, { share: 0.2 }), r(2, 1, 7, { share: 1.5, rare: true }), r(3, 2, 9, { share: 3 })]);
    expect(a.rare).toMatchObject({ nickname: "Bruno", heli: true, answer: "Odgovor 7" });
    expect(dayAwards([r(1, 0, 5, { share: 0.2 }), r(2, 1, 7, { share: 1.5 })]).rare).toMatchObject({ nickname: "Ana", heli: false });
  });

  it("ista misao, najbrži prst, radovi na cesti i odgovor dana", () => {
    const a = dayAwards([
      r(1, 0, 5, { ms: 3000 }),
      r(2, 0, 5, { ms: 1400, reactions: 3 }),
      r(3, 0, 6),
      r(1, 1, 8, { share: 2 }),
      r(3, 1, 8, { share: 2 }),
      r(2, 1, null),
      r(3, 2, null),
      r(2, 2, null),
      r(1, 2, 4, { reactions: 1 }),
    ]);
    expect(a.same.map((s) => [s.position, s.members.map((m) => m.nickname)])).toEqual([
      [1, ["Ana", "Cvita"]], // rjeđi zajednički odgovor prvi
      [0, ["Ana", "Bruno"]],
    ]);
    expect(a.fastest).toMatchObject({ nickname: "Bruno", ms: 1400 });
    expect(a.roadworks).toEqual({ members: [{ memberId: 2, nickname: "Bruno" }], misses: 2 });
    expect(a.liked).toMatchObject({ nickname: "Bruno", reactions: 3 });
  });

  it("bez promašaja i reakcija nema tih nagrada", () => {
    const a = dayAwards([r(1, 0, 5, { reactions: 1 }), r(2, 0, 6)]);
    expect(a.roadworks).toBeNull();
    expect(a.liked).toBeNull();
    expect(a.same).toEqual([]);
  });
});

describe("dvorana slavnih", () => {
  const games = [
    { playerId: "a", date: "2026-10-06", km: 900 }, // prije osnivanja lige
    { playerId: "a", date: "2026-10-13", km: 500 },
    { playerId: "b", date: "2026-10-14", km: 700 },
    { playerId: "a", date: "2026-10-20", km: 600 },
    { playerId: "b", date: "2026-10-21", km: 600 },
    { playerId: "c", date: "2026-10-27", km: 999 }, // tekući tjedan
  ];
  it("pobjednici završenih tjedana od osnivanja, najnoviji prvi, dijeljeno prvo mjesto", () => {
    const hall = hallOfFame(members, games, "2026-10-15", "2026-10-28");
    expect(hall.map((w) => [w.from, w.winners.map((x) => x.nickname)])).toEqual([
      ["2026-10-19", ["Ana", "Bruno"]],
      ["2026-10-12", ["Bruno"]],
    ]);
    expect(crowns(hall)).toEqual(new Map([[1, 1], [2, 2]]));
  });
});

describe("dvoboj i legende", () => {
  const games = [
    { playerId: "a", date: "2026-10-20", km: 500 },
    { playerId: "b", date: "2026-10-20", km: 300 },
    { playerId: "a", date: "2026-10-21", km: 400 },
    { playerId: "b", date: "2026-10-21", km: 450 },
    { playerId: "a", date: "2026-10-22", km: 400 },
    { playerId: "b", date: "2026-10-22", km: 400 },
    { playerId: "a", date: "2026-10-23", km: 900 }, // b nije igrao
  ];
  const rounds = [
    { playerId: "a", date: "2026-10-20", group: "kviz", km: 100 },
    { playerId: "b", date: "2026-10-20", group: "kviz", km: 40 },
    { playerId: "a", date: "2026-10-21", group: "hr", km: 30 },
    { playerId: "b", date: "2026-10-21", group: "hr", km: 70 },
    { playerId: "a", date: "2026-10-23", group: "hr", km: 125 }, // nije zajednički dan
  ];
  it("omjer, niz i prosjek po grupi samo na zajedničkim danima", () => {
    const d = duel("a", "b", games, rounds, ["hr", "kviz", "opce"]);
    expect(d).toMatchObject({ days: 3, wins: 1, losses: 1, ties: 1, last: ["w", "l", "t"] });
    expect(d.bestWin).toEqual({ date: "2026-10-20", margin: 200 });
    expect(d.worstLoss).toEqual({ date: "2026-10-21", margin: 50 });
    expect(d.groups).toEqual([
      { group: "hr", me: 30, them: 70 },
      { group: "kviz", me: 100, them: 40 },
      { group: "opce", me: null, them: null },
    ]);
  });
  it("legenda treba barem tri odigrana dana", () => {
    const r = [1, 2, 3].flatMap((d) => [
      { playerId: "a", date: `2026-10-0${d}`, group: "kviz", km: 50 },
      { playerId: "b", date: `2026-10-0${d}`, group: "kviz", km: 90 },
      { playerId: "c", date: `2026-10-0${d}`, group: "kviz", km: 70 },
    ]).filter((x) => !(x.playerId === "b" && x.date === "2026-10-03"));
    expect(groupLegends(members, r, ["kviz", "hr"])).toEqual([{ group: "kviz", memberId: 3, nickname: "Cvita", avg: 70 }]);
  });
});

describe("km ekipe", () => {
  it("najdalje odredište", () => {
    expect(teamReach(100)).toBeNull();
    expect(teamReach(4088)).toBe("do Dubaija");
    expect(teamReach(50_000)).toBe("oko cijele Zemlje");
  });
});
