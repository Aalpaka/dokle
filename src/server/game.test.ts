import { afterAll, describe, expect, it } from "vitest";
import { and, desc, eq, inArray } from "drizzle-orm";
import { db, sql } from "@/db";
import { answers, categories, dailyPuzzles, games, players, rounds } from "@/db/schema";
import { answerList, ensurePlayer, getOrCreatePuzzle, getSkin, getState, startNext, submitAnswer } from "./game";

// Integracijski test nad lokalnom bazom (npm run db:migrate && npm run db:seed).
const ids: string[] = [];

describe.skipIf(!process.env.DATABASE_URL)("svi odgovori nakon igre", () => {
  afterAll(async () => {
    await db.delete(games).where(inArray(games.playerId, ids));
    await db.delete(players).where(inArray(players.id, ids));
    await sql.end();
  });

  it("popis je dostupan tek kad je partija gotova", async () => {
    const skin = await getSkin("hr");
    const id = crypto.randomUUID();
    ids.push(id);
    await ensurePlayer(id);
    let state = await startNext(skin, id);
    expect(await answerList(skin, id, 0)).toBeNull();

    while (state.phase !== "end") {
      const r = await submitAnswer(skin, id, "zzqx nema", true);
      if (r.status !== "scored") throw new Error(r.status);
      state = r.state.phase === "end" ? r.state : await startNext(skin, id);
    }

    const list = await answerList(skin, id, 0);
    expect(list).not.toBeNull();
    expect(list!.mine).toBeNull();
    expect(list!.answers.length).toBeGreaterThanOrEqual(20);
    const shares = list!.answers.map((a) => a.share);
    expect(shares).toEqual([...shares].sort((a, b) => b - a));
    expect(list!.answers.every((a) => skin.config.tiers.some((t) => t.name === a.tier && t.km === a.km))).toBe(true);
    expect(await answerList(skin, id, state.perDay)).toBeNull();
  });

  it("najčešći odgovor ide pješice", async () => {
    const skin = await getSkin("hr");
    const id = crypto.randomUUID();
    ids.push(id);
    await ensurePlayer(id);
    const state = await startNext(skin, id);
    const [top] = await db
      .select({ canonical: answers.canonical })
      .from(answers)
      .innerJoin(categories, eq(categories.id, answers.categoryId))
      .where(and(eq(categories.skinId, "hr"), eq(categories.title, state.current!.category.title)))
      .orderBy(desc(answers.priorShare))
      .limit(1);
    const r = await submitAnswer(skin, id, top.canonical, true);
    if (r.status !== "scored") throw new Error(r.status);
    expect(r.state.rounds[0].tier).toBe("Pješice");
  });

  it("najrjeđi odgovor vozi helikopter", async () => {
    const skin = await getSkin("hr");
    const id = crypto.randomUUID();
    ids.push(id);
    await ensurePlayer(id);
    const state = await startNext(skin, id);
    const [rare] = await db
      .select({ canonical: answers.canonical })
      .from(answers)
      .innerJoin(categories, eq(categories.id, answers.categoryId))
      .where(and(eq(categories.skinId, "hr"), eq(categories.title, state.current!.category.title), eq(answers.rare, true)));
    const r = await submitAnswer(skin, id, rare.canonical, true);
    if (r.status !== "scored") throw new Error(r.status);
    const round = r.state.rounds[0];
    expect(round.tier).toBe("Milanovićev helikopter");
    expect(round.km).toBeGreaterThanOrEqual(150 * 0.9);
  });

  it("u popisu svoj odgovor ima prijevoz koji je dobio, i kad se od tada promijenio", async () => {
    const skin = await getSkin("hr");
    const id = crypto.randomUUID();
    ids.push(id);
    await ensurePlayer(id);
    let state = await startNext(skin, id);
    const [top] = await db
      .select({ canonical: answers.canonical })
      .from(answers)
      .innerJoin(categories, eq(categories.id, answers.categoryId))
      .where(and(eq(categories.skinId, "hr"), eq(categories.title, state.current!.category.title)))
      .orderBy(desc(answers.priorShare))
      .limit(1);
    let first = true;
    while (state.phase !== "end") {
      const r = await submitAnswer(skin, id, first ? top.canonical : "zzqx nema", true);
      if (r.status !== "scored") throw new Error(r.status);
      first = false;
      state = r.state.phase === "end" ? r.state : await startNext(skin, id);
    }

    // kao da je odgovor u međuvremenu promijenio prijevoz: igrač je dobio drugi od onoga koji sad vrijedi
    const now = (await answerList(skin, id, 0))!.answers.find((a) => a.canonical === top.canonical)!.tier;
    const got = skin.config.tiers.find((t) => !t.rare && t.name !== now)!;
    const [game] = await db.select({ id: games.id }).from(games).where(eq(games.playerId, id));
    await db.update(rounds).set({ tier: got.name, share: 0.001 }).where(and(eq(rounds.gameId, game.id), eq(rounds.position, 0)));

    const list = (await answerList(skin, id, 0))!;
    expect(list.mine).toBe(top.canonical);
    expect(list.answers.find((a) => a.canonical === top.canonical)).toMatchObject({ tier: got.name, km: got.km, share: 0.001 });
    // i mjesto na listi je ono iz trenutka odgovora
    const normal = list.answers.filter((a) => !skin.config.tiers.find((t) => t.name === a.tier)?.rare);
    expect(normal.findIndex((a) => a.canonical === top.canonical)).toBeGreaterThan(0);
    expect(normal.map((a) => a.share)).toEqual([...normal.map((a) => a.share)].sort((a, b) => b - a));
  });

  it("BiH i Srbija dobiju iste kategorije kao Hrvatska, a broji se samo prva država dana", async () => {
    const date = "2099-01-01";
    try {
      const hr = await getOrCreatePuzzle(await getSkin("hr"), date);
      const slugsOf = async (catIds: number[]) => {
        const rows = await db.select({ id: categories.id, slug: categories.slug }).from(categories).where(inArray(categories.id, catIds));
        return catIds.map((id) => rows.find((r) => r.id === id)!.slug);
      };
      const want = await slugsOf(hr.categoryIds);
      for (const id of ["ba", "rs"]) {
        const got = await slugsOf((await getOrCreatePuzzle(await getSkin(id), date)).categoryIds);
        expect(got).toEqual(want);
      }
    } finally {
      await db.delete(dailyPuzzles).where(eq(dailyPuzzles.date, date));
    }

    const id = crypto.randomUUID();
    ids.push(id);
    const [hr, rs] = [await getSkin("hr"), await getSkin("rs")];
    expect((await getState(rs, id)).ranked).toBe(true);
    expect((await startNext(hr, id)).ranked).toBe(true);
    expect((await getState(rs, id)).ranked).toBe(false);
    expect((await startNext(rs, id)).ranked).toBe(false);
    expect((await getState(hr, id)).ranked).toBe(true);
  });
});
