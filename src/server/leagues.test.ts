import { afterAll, describe, expect, it } from "vitest";
import { inArray } from "drizzle-orm";
import { db, sql } from "@/db";
import { games, leagues, players } from "@/db/schema";
import { ensurePlayer, getSkin, startNext, submitAnswer } from "./game";
import {
  createLeague,
  deleteLeague,
  joinLeague,
  leagueByCode,
  leagueView,
  leaveAllLeagues,
  leaveLeague,
  memberDay,
  memberDuel,
  myLeagues,
  pastWeek,
  reactToAnswer,
  removeMember,
} from "./leagues";

// Integracijski testovi nad lokalnom bazom (npm run db:migrate && npm run db:seed).
const created: string[] = [];
const newPlayer = async (nickname: string) => {
  const id = crypto.randomUUID();
  created.push(id);
  await ensurePlayer(id);
  await db.update(players).set({ nickname }).where(inArray(players.id, [id]));
  return id;
};

async function playToday(playerId: string, raw: string) {
  const skin = await getSkin("hr");
  let state = await startNext(skin, playerId, 0);
  while (state.phase !== "end") {
    const r = await submitAnswer(skin, playerId, raw, true);
    if (r.status !== "scored") throw new Error(r.status);
    state = r.state.phase === "end" ? r.state : await startNext(skin, playerId, 0);
  }
  return state;
}

describe.skipIf(!process.env.DATABASE_URL)("lige", () => {
  afterAll(async () => {
    await db.delete(leagues).where(inArray(leagues.ownerId, created));
    await db.delete(games).where(inArray(games.playerId, created));
    await db.delete(players).where(inArray(players.id, created));
    await sql.end();
  });

  it("osnivanje, ulazak, tablica i današnji odgovori", async () => {
    const skin = await getSkin("hr");
    const ana = await newPlayer("Ana");
    const bruno = await newPlayer("Bruno");
    const cvita = await newPlayer("Cvita");
    const league = await createLeague(skin, ana, "Test liga");
    expect(league.code).toMatch(/^[A-Z2-9]{6}$/);
    await joinLeague(league, bruno);
    await joinLeague(league, bruno); // drugi put ništa ne mijenja

    // tko nije član vidi samo osnovno
    const outside = await leagueView(skin, league, cvita, "week");
    expect(outside).toMatchObject({ isMember: false, members: 2, owner: "Ana" });
    expect(outside.standings).toBeUndefined();

    await playToday(ana, "nešto");
    const v = await leagueView(skin, league, ana, "day");
    expect(v.isOwner).toBe(true);
    expect(v.standings!.map((r) => r.nickname)).toEqual(["Ana", "Bruno"]);
    expect(v.standings![0].played).toBe(1);
    expect(v.today!.find((t) => t.nickname === "Bruno")!.status).toBe("none");
    expect(v.answers).not.toBeNull();
    expect(v.answers!.length).toBe(8);
    expect(v.answers![0].answers.map((a) => a.nickname)).toEqual(["Ana"]);

    // Bruno nije odigrao pa ne vidi odgovore
    const vb = await leagueView(skin, league, bruno, "day");
    expect(vb.answers).toBeNull();
    expect(vb.isOwner).toBe(false);

    // dan jednog člana: Ana vidi svoj dan, Bruno tek kad sam odigra; tko nije u ligi ne vidi ništa
    const { localDate } = await import("@/lib/day");
    const today = localDate(skin.timezone);
    const anaId = v.standings![0].memberId;
    const day = await memberDay(skin, league, ana, anaId, today);
    expect(day).toMatchObject({ nickname: "Ana", date: today });
    expect(day.rounds.length).toBe(8);
    await expect(memberDay(skin, league, bruno, anaId, today)).rejects.toThrow(/Odigraj/);
    await expect(memberDay(skin, league, cvita, anaId, today)).rejects.toThrow(/Nisi u ovoj ligi/);
    await expect(memberDay(skin, league, ana, anaId, "2000-01-01")).rejects.toThrow(/samo za ovaj tjedan/);
    await playToday(bruno, "nešto");
    expect((await memberDay(skin, league, bruno, anaId, today)).nickname).toBe("Ana");

    // graf prosjeka: tekući tjedan pon–ned i kad je odabran dan; danas su igrala oba člana
    const w = (await leagueView(skin, league, ana, "day")).week!;
    expect(w.today).toBe(today);
    expect(w.days).toHaveLength(7);
    expect(w.days.find((d) => d.date === today)).toMatchObject({ players: 2, avgKm: 0 });

    const mine = await myLeagues(skin, bruno);
    expect(mine).toEqual([expect.objectContaining({ code: league.code, members: 2, isOwner: false })]);
  });

  it("reakcije, nagrade dana, dvoboj i prošli tjedni", async () => {
    const skin = await getSkin("hr");
    const { localDate } = await import("@/lib/day");
    const { addDays, periodStart } = await import("@/lib/league");
    const today = localDate(skin.timezone);
    const ana = await newPlayer("Ana R");
    const bruno = await newPlayer("Bruno R");
    const cvita = await newPlayer("Cvita R");
    const league = await createLeague(skin, ana, "Reakcije");
    await joinLeague(league, bruno);
    await joinLeague(league, cvita);
    const ids = (await leagueView(skin, league, ana, "week")).today!;
    const id = (n: string) => ids.find((t) => t.nickname === n)!.memberId;

    await playToday(ana, "nešto");
    // samo jedan je završio: odgovori da, nagrade još ne
    const solo = await leagueView(skin, league, ana, "week");
    expect(solo.answers).not.toBeNull();
    expect(solo.awards).toBeNull();
    await expect(reactToAnswer(skin, league, ana, id("Bruno R"), 0, "😂")).rejects.toThrow(/nije završio/);

    await playToday(bruno, "nešto");
    const v = await leagueView(skin, league, ana, "week");
    expect(v.awards!.roadworks!.misses).toBe(8);
    expect(v.awards!.rare).toBeNull();

    await expect(reactToAnswer(skin, league, ana, id("Ana R"), 0, "😂")).rejects.toThrow(/svoje/);
    await expect(reactToAnswer(skin, league, cvita, id("Ana R"), 0, "😂")).rejects.toThrow(/Odigraj/);
    await reactToAnswer(skin, league, ana, id("Bruno R"), 0, "😂");
    await reactToAnswer(skin, league, ana, id("Bruno R"), 0, "🔥"); // zamjena, ne druga reakcija
    const seen = (await leagueView(skin, league, bruno, "week")).answers![0].answers.find((a) => a.nickname === "Bruno R")!;
    expect(seen.reactions).toEqual({ "🔥": 1 });
    expect(seen.mine).toBeNull();
    expect((await leagueView(skin, league, ana, "week")).answers![0].answers.find((a) => a.nickname === "Bruno R")!.mine).toBe("🔥");
    await reactToAnswer(skin, league, ana, id("Bruno R"), 0, null);
    expect((await leagueView(skin, league, ana, "week")).answers![0].answers.find((a) => a.nickname === "Bruno R")!.reactions).toEqual({});
    await reactToAnswer(skin, league, ana, id("Bruno R"), 1, "👏");
    await leaveLeague(league, bruno); // izlazak briše reakcije koje je dao, a i njegovi odgovori nestaju iz lige
    await joinLeague(league, bruno);
    expect((await leagueView(skin, league, bruno, "week")).answers![1].answers.find((a) => a.nickname === "Bruno R")!.reactions).toEqual({ "👏": 1 });

    // dvoboj: danas su oboje imali 0 km
    const d = await memberDuel(skin, league, ana, (await leagueView(skin, league, ana, "week")).today!.find((t) => t.nickname === "Bruno R")!.memberId);
    expect(d).toMatchObject({ days: 1, wins: 0, losses: 0, ties: 1, them: "Bruno R" });
    await expect(memberDuel(skin, league, ana, id("Ana R"))).rejects.toThrow(/samim sobom/);

    // prošli tjedni: samo završeni tjedni od osnivanja lige
    const monday = periodStart("week", today, today);
    await expect(pastWeek(skin, league, ana, monday)).rejects.toThrow(/povijesti/);
    await expect(pastWeek(skin, league, ana, addDays(monday, -6))).rejects.toThrow(/povijesti/);
    await expect(pastWeek(skin, league, cvita, monday)).rejects.toThrow(/povijesti/);
    expect((await leagueView(skin, league, ana, "week")).hall).toEqual([]);
  });

  it("izbacivanje, izlazak osnivača i brisanje", async () => {
    const skin = await getSkin("hr");
    const a = await newPlayer("A");
    const b = await newPlayer("B");
    const league = await createLeague(skin, a, "Druga liga");
    await joinLeague(league, b);

    const view = await leagueView(skin, league, a, "week");
    const bMember = view.today!.find((t) => t.nickname === "B")!.memberId;
    await expect(removeMember(league, b, bMember)).rejects.toThrow(/osnivač/);
    await removeMember(league, a, bMember);
    expect((await leagueView(skin, league, a, "week")).members).toBe(1);

    await joinLeague(league, b);
    await leaveLeague(league, a); // vlasništvo prelazi na B
    const after = (await leagueByCode(league.code))!;
    expect(after.ownerId).toBe(b);

    await expect(deleteLeague(after, a)).rejects.toThrow();
    await leaveAllLeagues(b); // zadnji član izlazi, liga nestaje
    expect(await leagueByCode(league.code)).toBeNull();
  });

  it("ograničenje broja liga po igraču", async () => {
    const skin = await getSkin("hr");
    const p = await newPlayer("Skupljač");
    for (let i = 0; i < 10; i++) await createLeague(skin, p, `Liga ${i}`);
    await expect(createLeague(skin, p, "Jedanaesta")).rejects.toThrow(/najviše 10/);
  });
});
