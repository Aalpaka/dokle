import { afterAll, describe, expect, it } from "vitest";
import { and, eq, inArray } from "drizzle-orm";
import { db, sql } from "@/db";
import { answers, categories, dailyPuzzles, games, players, reviewDecisions, rounds } from "@/db/schema";
import { ensurePlayer, getOrCreatePuzzle, getSkin, startNext, submitAnswer } from "./game";
import { decide, listCategories, reviewQueue, searchAttempts, setSchedule } from "./admin";

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

  it("raspored se slaže u hrvatskom adminu i vrijedi za sve tri države", async () => {
    const date = "2099-02-01";
    const [hr, ba] = [await getSkin("hr"), await getSkin("ba")];
    try {
      await expect(setSchedule(ba, date, null)).rejects.toThrow(/prati Hrvatsku/);
      expect((await listCategories(hr)).every((c) => !c.missing.length)).toBe(true);
      const old = await getOrCreatePuzzle(ba, date);
      // ručno složen hrvatski dan: BiH se ponovno složi po njemu
      const cats = await listCategories(hr);
      await setSchedule(hr, date, hr.config.dailyPattern.map((g, i) => cats.filter((c) => c.group === g)[i].id));
      const slugs = async (catIds: number[]) =>
        (await db.select({ id: categories.id, slug: categories.slug }).from(categories).where(inArray(categories.id, catIds))).reduce(
          (m, r) => m.set(r.id, r.slug),
          new Map<number, string>(),
        );
      const hrP = await getOrCreatePuzzle(hr, date);
      const baP = await getOrCreatePuzzle(ba, date);
      expect(baP.id).not.toBe(old.id);
      const [hs, bs] = [await slugs(hrP.categoryIds), await slugs(baP.categoryIds)];
      expect(baP.categoryIds.map((id) => bs.get(id))).toEqual(hrP.categoryIds.map((id) => hs.get(id)));
    } finally {
      await db.delete(dailyPuzzles).where(eq(dailyPuzzles.date, date));
    }
  });
});
