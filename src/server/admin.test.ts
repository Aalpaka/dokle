import { afterAll, describe, expect, it } from "vitest";
import { and, eq, inArray } from "drizzle-orm";
import { db, sql } from "@/db";
import { answers, games, players, reviewDecisions, rounds } from "@/db/schema";
import { ensurePlayer, getSkin, startNext, submitAnswer } from "./game";
import { decide, reviewQueue, searchAttempts } from "./admin";

// Integracijski testovi nad lokalnom bazom (npm run db:migrate && npm run db:seed).
const WEIRD = "zzqx odgovor";
const ids: string[] = [];

async function playAllWith(raw: string) {
  const skin = await getSkin("hr");
  const id = crypto.randomUUID();
  ids.push(id);
  await ensurePlayer(id);
  let state = await startNext(skin, id);
  while (state.phase !== "end") {
    const r = await submitAnswer(skin, id, raw, true);
    if (r.status !== "scored") throw new Error(r.status);
    state = r.state.phase === "end" ? r.state : await startNext(skin, id);
  }
  return id;
}

describe.skipIf(!process.env.DATABASE_URL)("admin", () => {
  afterAll(async () => {
    await db.delete(games).where(inArray(games.playerId, ids));
    await db.delete(players).where(inArray(players.id, ids));
    await db.delete(reviewDecisions).where(eq(reviewDecisions.normalized, WEIRD));
    await db.delete(answers).where(eq(answers.canonical, "Zzqx odgovor"));
    await sql.end();
  });

  it("odbijeni upis je u redu za pregled, a prihvaćanje naknadno boduje", async () => {
    const skin = await getSkin("hr");
    const a = await playAllWith(WEIRD);
    await playAllWith(WEIRD);

    const queue = await reviewQueue(skin);
    const group = queue.find((g) => g.normalized === WEIRD)!;
    expect(group).toBeTruthy();
    expect(group.n).toBeGreaterThanOrEqual(2);

    const [game] = await db.select().from(games).where(eq(games.playerId, a));
    expect(game.totalKm).toBe(0);

    const { rescored } = await decide(skin, null, {
      action: "answer",
      categoryId: group.categoryId,
      normalized: WEIRD,
      canonical: "Zzqx odgovor",
      priorShare: 0.1,
    });
    expect(rescored).toBeGreaterThanOrEqual(2);

    const [after] = await db.select().from(games).where(eq(games.playerId, a));
    expect(after.totalKm).toBeGreaterThan(0);
    const [r] = await db.select().from(rounds).where(and(eq(rounds.gameId, after.id), eq(rounds.categoryId, group.categoryId)));
    expect(r.answerId).not.toBeNull();
    expect(r.km).toBe(after.totalKm);

    expect((await reviewQueue(skin)).some((g) => g.normalized === WEIRD && g.categoryId === group.categoryId)).toBe(false);
    const found = await searchAttempts(skin, { q: "zzqx", limit: 50 });
    expect(found.length).toBeGreaterThan(0);
  });
});
