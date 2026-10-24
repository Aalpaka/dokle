import { afterAll, describe, expect, it } from "vitest";
import { and, eq, inArray } from "drizzle-orm";
import { db, sql } from "@/db";
import { answerAliases, answers, categories, dailyPuzzles, games, players, removedAliases, reviewDecisions, rounds } from "@/db/schema";
import { ensurePlayer, getOrCreatePuzzle, getSkin, startNext, submitAnswer } from "./game";
import { decide, generalStats, listCategories, playerDetail, playersOverview, reviewQueue, searchAttempts, setSchedule, updateAnswer, weekAverages } from "./admin";
import { localDate } from "@/lib/day";
import { periodStart } from "@/lib/league";

// Integracijski testovi nad lokalnom bazom (npm run db:migrate && npm run db:seed).
const WEIRD = "zzqx odgovor";
const ids: string[] = [];

async function playAllWith(raw: string) {
  const skin = await getSkin("hr");
  const id = crypto.randomUUID();
  ids.push(id);
  await ensurePlayer(id);
  let state = await startNext(skin, id, 0);
  while (state.phase !== "end") {
    const r = await submitAnswer(skin, id, raw, true);
    if (r.status !== "scored") throw new Error(r.status);
    state = r.state.phase === "end" ? r.state : await startNext(skin, id, 0);
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

  it("prosjek km po danu broji samo završene partije tog tjedna", async () => {
    const skin = await getSkin("hr");
    const today = localDate(skin.timezone);
    const before = (await weekAverages(skin, periodStart("week", today, today))).days.find((d) => d.date === today)!;
    await playAllWith("zzqx nista");
    const w = await weekAverages(skin, periodStart("week", today, today));
    expect(w.days).toHaveLength(7);
    expect(w.days[0].date).toBe(periodStart("week", today, today));
    expect(w.days.find((d) => d.date === today)!.players).toBe(before.players + 1);
  });

  it("uređivanje odgovora pamti izvorni naziv i ručnu rijetkost", async () => {
    const [cat] = await db.select().from(categories).where(and(eq(categories.skinId, "hr"), eq(categories.slug, "otok")));
    const [krk] = await db.select().from(answers).where(and(eq(answers.categoryId, cat.id), eq(answers.canonical, "Krk")));
    try {
      const row = await updateAnswer(cat.id, krk.id, { canonical: "otok krk zzqx", priorShare: 3.5, rare: false });
      expect(row).toMatchObject({ canonical: "Otok krk zzqx", seedCanonical: "Krk", priorShare: 3.5 });
      expect(row.editedAt).toBeTruthy();
      const aliases = await db.select().from(answerAliases).where(eq(answerAliases.answerId, krk.id));
      expect(aliases.map((a) => a.alias)).toContain("Krk");
      // drugo preimenovanje ne gubi izvorni naziv iz seeda
      expect((await updateAnswer(cat.id, krk.id, { canonical: "Krk zzqx" })).seedCanonical).toBe("Krk");
      await expect(updateAnswer(cat.id, krk.id, { canonical: "Hvar" })).rejects.toThrow("već postoji");
      await expect(updateAnswer(cat.id, krk.id, { priorShare: 0 })).rejects.toThrow();
    } finally {
      await db.update(answers).set({ canonical: krk.canonical, seedCanonical: null, priorShare: krk.priorShare, rare: krk.rare, editedAt: null }).where(eq(answers.id, krk.id));
      await db.delete(answerAliases).where(and(eq(answerAliases.answerId, krk.id), inArray(answerAliases.alias, ["Krk", "Otok krk zzqx"])));
    }
  });

  it("varijante: dodavanje, brisanje i zaštita od tuđeg odgovora", async () => {
    const [cat] = await db.select().from(categories).where(and(eq(categories.skinId, "hr"), eq(categories.slug, "otok")));
    const [krk] = await db.select().from(answers).where(and(eq(answers.categoryId, cat.id), eq(answers.canonical, "Krk")));
    const list = async () => (await db.select().from(answerAliases).where(eq(answerAliases.answerId, krk.id))).map((a) => a.alias);
    const before = await list();
    try {
      await updateAnswer(cat.id, krk.id, { addAliases: ["Zzqx krk", " "] });
      expect(await list()).toContain("Zzqx krk");
      await updateAnswer(cat.id, krk.id, { removeAliases: ["Zzqx krk"] });
      expect(await list()).not.toContain("Zzqx krk");
      expect((await db.select().from(removedAliases).where(eq(removedAliases.answerId, krk.id))).map((r) => r.alias)).toContain("Zzqx krk");
      // ponovno dodana varijanta više nije na popisu obrisanih
      await updateAnswer(cat.id, krk.id, { addAliases: ["Zzqx krk"] });
      expect((await db.select().from(removedAliases).where(eq(removedAliases.answerId, krk.id))).length).toBe(0);
      await expect(updateAnswer(cat.id, krk.id, { addAliases: ["hvar"] })).rejects.toThrow("Hvar");
    } finally {
      await db.delete(removedAliases).where(eq(removedAliases.answerId, krk.id));
      await db.delete(answerAliases).where(and(eq(answerAliases.answerId, krk.id), eq(answerAliases.alias, "Zzqx krk")));
    }
    expect(await list()).toEqual(before);
  });

  it("igrači: brojke, 30 dana i detalj igrača", async () => {
    const skin = await getSkin("hr");
    const id = await playAllWith("zzqx igrac");
    const o = await playersOverview(skin);
    expect(o.daily).toHaveLength(30);
    expect(o.daily.at(-1)!.date).toBe(o.today);
    expect(o.counts.activeToday).toBeGreaterThanOrEqual(1);
    const d = await playerDetail(skin, id);
    expect(d.games).toHaveLength(1);
    expect(d.games[0].finished).toBe(true);
  });

  it("opća statistika: ukupno, raspodjela km i prijevoz", async () => {
    const skin = await getSkin("hr");
    await playAllWith("zzqx stat");
    const st = await generalStats(skin);
    expect(st.totals.games).toBeGreaterThanOrEqual(1);
    expect(st.histogram[0].from).toBe(0);
    expect(st.histogram.reduce((a, h) => a + h.n, 0)).toBeGreaterThanOrEqual(1);
    expect(st.tiers.map((t) => t.name)).toEqual(skin.config.tiers.map((t) => t.name));
    expect(st.loyalty.reduce((a, b) => a + b.n, 0)).toBeGreaterThanOrEqual(1);
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
