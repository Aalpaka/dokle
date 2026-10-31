import { afterAll, describe, expect, it } from "vitest";
import { and, desc, eq, inArray } from "drizzle-orm";
import { db, sql } from "@/db";
import { localDate } from "@/lib/day";
import { configOn } from "@/lib/scoring";
import { answers, categories, dailyPuzzles, games, players, puzzleCategories, rounds } from "@/db/schema";
import { answerList, categoryShares, clearPuzzleCache, dayCompare, ensurePlayer, getOrCreatePuzzle, getSkin, getState, pairedSlugs, startNext, submitAnswer } from "./game";

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
    let state = await startNext(skin, id, 0);
    expect(await answerList(skin, id, 0)).toBeNull();

    while (state.phase !== "end") {
      const r = await submitAnswer(skin, id, "zzqx nema", true);
      if (r.status !== "scored") throw new Error(r.status);
      state = r.state.phase === "end" ? r.state : await startNext(skin, id, 0);
    }

    const list = await answerList(skin, id, 0);
    expect(list).not.toBeNull();
    expect(list!.mine).toBeNull();
    expect(list!.answers.length).toBeGreaterThanOrEqual(20);
    // poredano po udjelu, a odgovori posebnog tiera (helikopter) su uvijek na dnu
    const rare = new Set(skin.config.tiers.filter((t) => t.rare).map((t) => t.name));
    for (const part of [list!.answers.filter((a) => !rare.has(a.tier)), list!.answers.filter((a) => rare.has(a.tier))]) {
      const shares = part.map((a) => a.share);
      expect(shares).toEqual([...shares].sort((a, b) => b - a));
    }
    // km prijevoza kakve vrijede za partije tog dana
    const cfg = configOn(skin.config, localDate(skin.timezone));
    expect(list!.answers.every((a) => cfg.tiers.some((t) => t.name === a.tier && t.km === a.km))).toBe(true);
    expect(await answerList(skin, id, state.perDay)).toBeNull();
  });

  it("najčešći odgovor ide pješice", async () => {
    const skin = await getSkin("hr");
    const id = crypto.randomUUID();
    ids.push(id);
    await ensurePlayer(id);
    const state = await startNext(skin, id, 0);
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
    const state = await startNext(skin, id, 0);
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

  it("u popisu svoj odgovor ima prijevoz koji je dobio, i stoji među odgovorima tog prijevoza", async () => {
    const skin = await getSkin("hr");
    const id = crypto.randomUUID();
    ids.push(id);
    await ensurePlayer(id);
    let state = await startNext(skin, id, 0);
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
      state = r.state.phase === "end" ? r.state : await startNext(skin, id, 0);
    }

    // kao da je odgovor u međuvremenu promijenio prijevoz: igrač je dobio drugi od onoga koji sad vrijedi
    const now = (await answerList(skin, id, 0))!.answers.find((a) => a.canonical === top.canonical)!.tier;
    const got = skin.config.tiers.find((t) => !t.rare && t.name !== now)!;
    const [game] = await db.select({ id: games.id }).from(games).where(eq(games.playerId, id));
    await db.update(rounds).set({ tier: got.name, share: 0.001 }).where(and(eq(rounds.gameId, game.id), eq(rounds.position, 0)));

    const list = (await answerList(skin, id, 0))!;
    expect(list.mine).toBe(top.canonical);
    expect(list.answers.filter((a) => a.canonical === top.canonical)).toHaveLength(1);
    const at = list.answers.findIndex((a) => a.canonical === top.canonical);
    expect(list.answers[at]).toMatchObject({ tier: got.name, km: configOn(skin.config, localDate(skin.timezone)).tiers.find((t) => t.name === got.name)!.km, share: 0.001 });
    // stoji među odgovorima prijevoza koji je dobio: prije njega nijedan rjeđi prijevoz, poslije nijedan češći
    const rank = (name: string) => skin.config.tiers.findIndex((t) => t.name === name);
    expect(list.answers.slice(0, at).every((a) => rank(a.tier) <= rank(got.name))).toBe(true);
    expect(list.answers.slice(at + 1).every((a) => rank(a.tier) >= rank(got.name))).toBe(true);
  });

  it("od live faze pitanja iz testa se vraćaju ravnopravno s novima, a već korištena live ne", async () => {
    const hr = await getSkin("hr");
    const ready = (await pairedSlugs("hr"))!;
    // kategorije iz dana koji već postoje u bazi ne ulaze u podjelu (njihov datum bi pomiješao redoslijed)
    const usedElsewhere = new Set((await db.select({ id: puzzleCategories.categoryId }).from(puzzleCategories)).map((r) => r.id));
    const all = (await db.select({ id: categories.id, group: categories.group, slug: categories.slug, open: categories.open }).from(categories).where(and(eq(categories.skinId, "hr"), eq(categories.active, true))))
      .filter((c) => ready.has(c.slug) && !usedElsewhere.has(c.id))
      .sort((a, b) => a.id - b.id);
    // po grupi: 2 nikad korištene (ne jako otvorene, da ih ne preskoči pravilo o jednom otvorenom), 2 već korištene live,
    // ostale samo u testu
    const fresh = new Set<number>(), live: number[] = [], test: number[] = [];
    for (const g of new Set(all.map((c) => c.group))) {
      const cs = all.filter((c) => c.group === g).sort((a, b) => Number(a.open) - Number(b.open));
      cs.slice(0, 2).forEach((c) => fresh.add(c.id));
      live.push(...cs.slice(2, 4).map((c) => c.id));
      test.push(...cs.slice(4).map((c) => c.id));
    }
    const dates = ["2026-10-02", "2099-03-01", "2099-03-02", "2026-10-03"];
    await db.delete(dailyPuzzles).where(inArray(dailyPuzzles.date, dates));
    const insertDay = async (date: string, catIds: number[]) => {
      const [p] = await db.insert(dailyPuzzles).values({ skinId: "hr", date, number: 1 }).returning();
      await db.insert(puzzleCategories).values(catIds.map((categoryId, position) => ({ puzzleId: p.id, position, categoryId })));
    };
    try {
      await insertDay("2026-10-02", test);
      await insertDay("2099-03-01", live);
      clearPuzzleCache();
      // u testnoj fazi se testni dani i dalje broje: uzima samo nikad korištene
      const before = (await getOrCreatePuzzle(hr, "2026-10-03")).categoryIds;
      expect(before.every((id) => fresh.has(id))).toBe(true);
      await db.delete(dailyPuzzles).where(eq(dailyPuzzles.date, "2026-10-03"));
      clearPuzzleCache();
      const picked = (await getOrCreatePuzzle(hr, "2099-03-02")).categoryIds;
      expect(picked.some((id) => live.includes(id))).toBe(false);
      // stari izbor bi opet uzeo samo nikad korištene; sad su i testne u igri
      expect(picked.some((id) => test.includes(id))).toBe(true);
    } finally {
      await db.delete(dailyPuzzles).where(inArray(dailyPuzzles.date, dates));
      clearPuzzleCache();
    }
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
    expect((await startNext(hr, id, 0)).ranked).toBe(true);
    expect((await getState(rs, id)).ranked).toBe(false);
    expect((await startNext(rs, id, 0)).ranked).toBe(false);
    expect((await getState(hr, id)).ranked).toBe(true);
    // odgovori iz partije izvan konkurencije ne mijenjaju udjele ni poredak odgovora
    const puzzle = await getOrCreatePuzzle(rs, localDate(rs.timezone));
    const before = await categoryShares(rs, puzzle.id, puzzle.categoryIds[0], true);
    // završena partija izvan konkurencije nema usporedbu s ostalima
    let st = await getState(rs, id);
    let first = true;
    while (st.phase !== "end") {
      const r = await submitAnswer(rs, id, first ? before.at(-1)!.canonical : "zzqx nema", true);
      first = false;
      if (r.status !== "scored") throw new Error(r.status);
      st = r.state.phase === "end" ? r.state : await startNext(rs, id, 0);
    }
    expect(await dayCompare(rs, id)).toBeNull();
    expect(await categoryShares(rs, puzzle.id, puzzle.categoryIds[0], true)).toEqual(before);
  });
});
