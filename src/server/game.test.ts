import { afterAll, describe, expect, it } from "vitest";
import { and, eq, inArray } from "drizzle-orm";
import { db, sql } from "@/db";
import { answers, categories, games, players } from "@/db/schema";
import { answerList, ensurePlayer, getSkin, startNext, submitAnswer } from "./game";

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
});
