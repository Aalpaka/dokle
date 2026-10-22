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
  myLeagues,
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
  let state = await startNext(skin, playerId);
  while (state.phase !== "end") {
    const r = await submitAnswer(skin, playerId, raw, true);
    if (r.status !== "scored") throw new Error(r.status);
    state = r.state.phase === "end" ? r.state : await startNext(skin, playerId);
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

    const mine = await myLeagues(skin, bruno);
    expect(mine).toEqual([expect.objectContaining({ code: league.code, members: 2, isOwner: false })]);
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
