import { afterAll, describe, expect, it } from "vitest";
import { and, desc, eq, inArray } from "drizzle-orm";
import { db, sql } from "@/db";
import { answerAliases, answers, categories, dailyPuzzles, games, players, removedAliases, reviewDecisions, rounds } from "@/db/schema";
import { dismissNotices, ensurePlayer, flagAttempt, getOrCreatePuzzle, getSkin, getState, reportRound, rescoreNotices, startNext, submitAnswer } from "./game";
import { decide, generalStats, listCategories, playerDetail, playersOverview, reviewQueue, searchAttempts, setSchedule, updateAnswer, weekAverages } from "./admin";
import { localDate } from "@/lib/day";
import { periodStart } from "@/lib/league";
import { kmFor, priorForRank } from "@/lib/scoring";

// Integracijski testovi nad lokalnom bazom (npm run db:migrate && npm run db:seed).
const WEIRD = "zzqx odgovor";
const KEPT = "zzqx prijava";
const NOPE = "zzqx nije";
const PLANE = "zzqx avion";
const EARLY = "zzqx prvi";
const SLOW = "zzqx spori";
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
    await db.delete(reviewDecisions).where(inArray(reviewDecisions.normalized, [WEIRD, KEPT, NOPE, PLANE, EARLY, SLOW]));
    await db.delete(answers).where(inArray(answers.canonical, ["Zzqx odgovor", "Zzqx prijava", "Zzqx avion", "Zzqx prvi", "Zzqx spori"]));
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
    expect(st.route.hist.length).toBeGreaterThanOrEqual(Math.floor(skin.config.maxKm / 100) + 1);
    expect(st.route.hist.reduce((a, n) => a + n, 0)).toBeGreaterThanOrEqual(1);
    expect(st.route.labels[0].km).toBe(0);
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

  it("prijava na kraju: računa se i fali odvojeno u redu, prihvaćanje javlja igraču, odbijanje skida provjeru", async () => {
    const skin = await getSkin("hr");
    const id = crypto.randomUUID();
    ids.push(id);
    await ensurePlayer(id);
    await startNext(skin, id, 0);
    // usred igre nepoznat odgovor se samo odbija; nema ostavljanja na provjeru
    expect((await submitAnswer(skin, id, KEPT, false)).status).toBe("rejected");
    const kept = await submitAnswer(skin, id, KEPT, true);
    if (kept.status !== "scored") throw new Error(kept.status);
    expect(kept.state.rounds[0]).toMatchObject({ raw: KEPT, km: 0, report: "open" });
    // druga runda: istekne vrijeme s nepoznatim upisom
    await startNext(skin, id, 0);
    const missed = await submitAnswer(skin, id, NOPE, true);
    if (missed.status !== "scored") throw new Error(missed.status);
    // prva runda: želi da se računa; druga: samo javlja da fali
    expect((await reportRound(skin, id, 0, KEPT))!.rounds[0]).toMatchObject({ report: "pending", emoji: "⏳", tier: "Na provjeri" });
    expect(await reportRound(skin, id, 0)).toBeNull(); // već prijavljeno
    expect(await reportRound(skin, id, 5)).toBeNull(); // ta runda ne postoji
    expect((await flagAttempt(skin, id, 1, NOPE))!.rounds[1].report).toBe("open"); // "fali" ne troši odabir

    const queue = await reviewQueue(skin);
    expect(queue[0].claims).toBeGreaterThan(0);
    const keptGroup = queue.find((g) => g.normalized === KEPT)!;
    expect(keptGroup).toMatchObject({ claims: 1, flags: 0 });
    const nope = queue.find((g) => g.normalized === NOPE)!;
    expect(nope).toMatchObject({ claims: 0, flags: 1 });

    const { rescored } = await decide(skin, null, { action: "answer", categoryId: keptGroup.categoryId, normalized: KEPT, canonical: "Zzqx prijava", priorShare: 0.1 });
    expect(rescored).toBe(1);
    const notices = await rescoreNotices(skin, id);
    expect(notices).toHaveLength(1);
    expect(notices[0]).toMatchObject({ canonical: "Zzqx prijava", position: 0 });
    expect(notices[0].km).toBeGreaterThan(0);
    expect((await getState(skin, id)).rounds[0].report).toBeUndefined();
    await dismissNotices(skin, id);
    expect(await rescoreNotices(skin, id)).toHaveLength(0);

    await decide(skin, null, { action: "reject", categoryId: nope.categoryId, normalized: NOPE });
    const other = crypto.randomUUID();
    ids.push(other);
    await ensurePlayer(other);
    await startNext(skin, other, 0);
    await submitAnswer(skin, other, KEPT + " x", true);
    await startNext(skin, other, 0);
    // odbijeni odgovor: igrač odmah vidi da je već provjeren
    expect(await submitAnswer(skin, other, NOPE, false)).toMatchObject({ status: "rejected", checked: true });
  });

  it("odobreni odgovor naknadno vozi baš prijevoz koji je admin odabrao", async () => {
    const skin = await getSkin("hr");
    const a = await playAllWith(PLANE);
    const [game] = await db.select().from(games).where(eq(games.playerId, a));
    const [r0] = await db.select().from(rounds).where(and(eq(rounds.gameId, game.id), eq(rounds.position, 0)));
    const others = await db.select({ share: answers.priorShare, rare: answers.rare }).from(answers).where(eq(answers.categoryId, r0.categoryId));
    const tiers = skin.config.tiers;
    // najbrži obični prijevoz (avion)
    const plane = tiers.findLastIndex((t) => !t.rare);
    await decide(skin, null, {
      action: "answer",
      categoryId: r0.categoryId,
      normalized: PLANE,
      canonical: "Zzqx avion",
      priorShare: priorForRank(tiers, plane, others),
      tier: tiers[plane].name,
    });
    const [after] = await db.select().from(rounds).where(and(eq(rounds.gameId, game.id), eq(rounds.position, 0)));
    expect(after.tier).toBe(tiers[plane].name);
    expect(after.km).toBe(kmFor(skin.config, tiers[plane], 0).km); // s množiteljem brzine prema vremenu upisa (ovdje odmah)
  });

  it("na kraju se može prijaviti odbijeni pokušaj i kad je runda pogođena; računa se bolji odgovor", async () => {
    const skin = await getSkin("hr");
    const id = crypto.randomUUID();
    ids.push(id);
    await ensurePlayer(id);
    let state = await startNext(skin, id, 0);
    const top = async (title: string) => {
      const [a] = await db
        .select({ canonical: answers.canonical })
        .from(answers)
        .innerJoin(categories, eq(categories.id, answers.categoryId))
        .where(and(eq(categories.skinId, "hr"), eq(categories.title, title)))
        .orderBy(desc(answers.priorShare))
        .limit(1);
      return a.canonical;
    };
    // prve dvije runde: odbijeni pokušaj (dvaput isti), pa najčešći odgovor; ostale promašaj
    while (state.phase !== "end") {
      const pos = state.current!.position;
      if (pos < 2) {
        const miss = pos === 0 ? EARLY : SLOW;
        expect((await submitAnswer(skin, id, miss, false)).status).toBe("rejected");
        expect((await submitAnswer(skin, id, miss.toUpperCase(), false)).status).toBe("rejected");
      }
      const r = await submitAnswer(skin, id, pos < 2 ? await top(state.current!.category.title) : "zzqx nema", true);
      if (r.status !== "scored") throw new Error(r.status);
      state = r.state.phase === "end" ? r.state : await startNext(skin, id, 0);
    }
    expect(state.rounds[0].misses).toEqual([{ raw: EARLY, state: "open", flag: "open" }]);
    expect(state.rounds[2].misses).toEqual([{ raw: "zzqx nema", state: "open", flag: "open" }]);
    const before = state.rounds[0];
    expect(before.canonical).not.toBeNull();

    // "fali na popisu" ne mijenja km i ne troši odabir; može ih biti više (ovdje runda 2)
    let fl = (await flagAttempt(skin, id, 2, "ZZQX NEMA"))!;
    expect(fl.rounds[2]).toMatchObject({ km: 0, misses: [{ raw: "zzqx nema", state: "open", flag: "pending" }] });
    expect(await flagAttempt(skin, id, 2, "zzqx nema")).toBeNull(); // već prijavljeno
    expect(await flagAttempt(skin, id, 2, EARLY)).toBeNull(); // nije iz te runde
    fl = (await flagAttempt(skin, id, 0, EARLY))!;
    expect(fl.rounds[0].misses).toEqual([{ raw: EARLY, state: "open", flag: "pending" }]);

    // pokušaj koji nije iz te runde se ne može odabrati da se računa; jedan po rundi
    expect(await reportRound(skin, id, 0, "zzqx nema")).toBeNull();
    let st = (await reportRound(skin, id, 0, EARLY))!;
    expect(st.rounds[0]).toMatchObject({ km: before.km, tier: before.tier, reported: EARLY, misses: [{ raw: EARLY, state: "pending" }] });
    expect(await reportRound(skin, id, 0, EARLY)).toBeNull();
    st = (await reportRound(skin, id, 1, SLOW))!;
    expect(st.rounds[1].misses).toEqual([{ raw: SLOW, state: "pending" }]);
    const queue = await reviewQueue(skin);
    const early = queue.find((g) => g.normalized === EARLY)!;
    expect(early).toMatchObject({ claims: 1, flags: 0 });

    // avion vrijedi više od pješačenja: runda dobiva novi odgovor, osnovne km aviona i obavijest
    const tiers = skin.config.tiers;
    const plane = tiers.findLastIndex((t) => !t.rare);
    const res = await decide(skin, null, { action: "answer", categoryId: early.categoryId, normalized: EARLY, canonical: "Zzqx prvi", priorShare: 0.0001, tier: tiers[plane].name });
    expect(res.rescored).toBe(1);
    st = await getState(skin, id);
    expect(st.rounds[0]).toMatchObject({ canonical: "Zzqx prvi", km: kmFor(skin.config, tiers[plane], 0).km, misses: [{ raw: EARLY, state: "accepted" }] });
    expect(st.totalKm).toBe(state.totalKm - before.km + kmFor(skin.config, tiers[plane], 0).km);
    // oznaka brzine je po vremenu prijavljenog pokušaja, ne po kraju runde
    expect(st.rounds[0].speed?.multiplier).toBe(kmFor(skin.config, tiers[plane], 0).speed.multiplier);
    expect((await rescoreNotices(skin, id)).map((n) => n.canonical)).toContain("Zzqx prvi");

    // pješice ne vrijedi više od onoga što je već imao: ostaje stari odgovor, bez obavijesti
    const slow = queue.find((g) => g.normalized === SLOW)!;
    await dismissNotices(skin, id);
    const res2 = await decide(skin, null, { action: "answer", categoryId: slow.categoryId, normalized: SLOW, canonical: "Zzqx spori", priorShare: 0.0001, tier: tiers[0].name });
    expect(res2.rescored).toBe(0);
    st = await getState(skin, id);
    expect(st.rounds[1]).toMatchObject({ canonical: state.rounds[1].canonical, km: state.rounds[1].km, misses: [{ raw: SLOW, state: "kept" }] });
    expect(await rescoreNotices(skin, id)).toHaveLength(0);
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
