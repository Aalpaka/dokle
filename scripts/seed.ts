// Puni bazu skinom i početnim kategorijama. Može se pokretati više puta: config skina osvježava, kategorije i odgovore samo dodaje
// (jedina izmjena postojećih je oznaka najrjeđeg odgovora za helikopter). Izmjene iz admina (naziv, rijetkost) ostaju.
import { and, eq, inArray, sql as dsql } from "drizzle-orm";
import { db, sql } from "../src/db";
import { answerAliases, answers, categories, dailyPuzzles, puzzleCategories, removedAliases, skins } from "../src/db/schema";
import { parseSeedAnswers } from "../src/lib/matcher";
import { dayNumber, localDate } from "../src/lib/day";
import { pickCategories, plannedSlugs } from "../src/lib/pick";
import { RASPORED } from "../src/skins/hr/raspored";
import { hrSkin } from "../src/skins/hr/config";
import { hrCategories } from "../src/skins/hr/categories";
import { baSkin } from "../src/skins/ba/config";
import { rsSkin } from "../src/skins/rs/config";
import { regionalCategories } from "../src/skins/regional";
import { baContent } from "../src/skins/ba/kategorije";
import { rsContent } from "../src/skins/rs/kategorije";
import { OTVORENA } from "../src/skins/otvorena";
import { zanimljivosti } from "../src/skins/hr/kategorije/zanimljivosti";

// BiH i Srbija imaju svoje kopije općih kategorija (svoja statistika odgovora), s domaćim parovima hrvatskih tema
const SKINS = [
  { skin: hrSkin, categories: hrCategories },
  { skin: baSkin, categories: regionalCategories(hrCategories, baContent) },
  { skin: rsSkin, categories: regionalCategories(hrCategories, rsContent) },
];

for (const { skin, categories: cats } of SKINS) {
  // dan lansiranja se upisuje samo kod prvog dodavanja skina; novi skinovi kreću s #1 na dan deploya
  const launchDate = (skin as { launchDate?: string }).launchDate ?? localDate(skin.timezone);
  await db
    .insert(skins)
    .values({ ...skin, launchDate })
    .onConflictDoUpdate({ target: skins.id, set: { name: skin.name, timezone: skin.timezone, config: skin.config } });

  let added = 0, marked = 0;
  for (const c of cats) {
    // postojeće kategorije se ne diraju (admin ih je možda uredio), dodaju se samo nove
    let [cat] = await db
      .insert(categories)
      .values({ skinId: skin.id, slug: c.slug, title: c.title, hint: c.hint ?? null, group: c.group, strip: c.strip, open: OTVORENA.has(c.slug) })
      .onConflictDoNothing()
      .returning();
    if (!cat) [cat] = await db.select().from(categories).where(and(eq(categories.skinId, skin.id), eq(categories.slug, c.slug)));
    // nove opće riječi ("jezero", "republika") se dodaju i postojećim kategorijama; admin ih ne uređuje
    const strip = [...new Set([...cat.strip, ...c.strip])];
    if (strip.length !== cat.strip.length) [cat] = await db.update(categories).set({ strip }).where(eq(categories.id, cat.id)).returning();
    // odgovori i aliasi idu skupno po kategoriji: upit po odgovoru je za desetke tisuća odgovora predug za build
    const seeded = parseSeedAnswers(c.answers);
    // odgovor koji je admin preimenovao prepoznaje se po izvornom nazivu (seedCanonical), da se ne vrati kao novi
    const known = new Map<string, typeof answers.$inferSelect>();
    const loadKnown = async () => {
      known.clear();
      const rows = await db.select().from(answers).where(eq(answers.categoryId, cat.id));
      for (const x of rows) known.set(x.canonical, x);
      for (const x of rows) if (x.seedCanonical && !known.has(x.seedCanonical)) known.set(x.seedCanonical, x);
    };
    await loadKnown();
    const fresh = seeded.filter((a) => !known.has(a.canonical));
    if (fresh.length) {
      const inserted = await db
        .insert(answers)
        .values(fresh.map((a) => ({ categoryId: cat.id, canonical: a.canonical, priorShare: a.share, rare: a.rare })))
        .onConflictDoNothing()
        .returning({ id: answers.id });
      added += inserted.length;
      await loadKnown();
    }
    // varijante koje je admin obrisao ostaju obrisane
    const removed = new Set(
      (await db.select().from(removedAliases).innerJoin(answers, eq(answers.id, removedAliases.answerId)).where(eq(answers.categoryId, cat.id))).map(
        (r) => `${r.removed_aliases.answerId}:${r.removed_aliases.alias}`,
      ),
    );
    const aliases: { answerId: number; alias: string }[] = [];
    for (const a of seeded) {
      const ans = known.get(a.canonical)!;
      // najrjeđi (helikopter) se označava i na postojećim odgovorima; procjena se smije samo spustiti.
      // Odgovor kojem je admin ručno mijenjao rijetkost (editedAt) ostaje kako ga je admin ostavio.
      if (a.rare && !ans.rare && !ans.editedAt) {
        await db
          .update(answers)
          .set({ rare: true, priorShare: Math.min(ans.priorShare, a.share) })
          .where(eq(answers.id, ans.id));
        marked++;
      }
      for (const alias of a.variants) if (!removed.has(`${ans.id}:${alias}`)) aliases.push({ answerId: ans.id, alias });
    }
    if (aliases.length) await db.insert(answerAliases).values(aliases).onConflictDoNothing();
    // zanimljivosti su na hrvatskom (i za BiH), upisuju se samo gdje ih još nema; "" znači da ju je admin obrisao
    const facts = skin.id === "rs" ? undefined : zanimljivosti[c.slug];
    for (const [canonical, fact] of Object.entries(facts ?? {})) {
      const ans = known.get(canonical);
      if (ans && ans.fact === null) await db.update(answers).set({ fact }).where(eq(answers.id, ans.id));
    }
  }
  console.log(`${skin.id}: ${cats.length} kategorija, ${added} novih odgovora, ${marked} označeno za helikopter`);
}

// unaprijed složeni dani (raspored.ts): upisuju se samo ako taj dan još ne postoji (ni iz admina ni od igrača), pa ponovni deploy
// i ručna izmjena u adminu ostaju kako jesu. BiH i Srbija dan slože same po Hrvatskoj kad ga prvi put otvore.
const today = localDate(hrSkin.timezone);
const followers = SKINS.map((x) => x.skin.id).filter((id) => id !== hrSkin.id);
for (const [date, plan] of Object.entries(RASPORED)) {
  if (date < today) continue;
  const exists = await db.select({ id: dailyPuzzles.id }).from(dailyPuzzles).where(and(eq(dailyPuzzles.skinId, hrSkin.id), eq(dailyPuzzles.date, date)));
  if (exists.length) {
    console.log(`raspored ${date}: dan već postoji, ne dira se`);
    continue;
  }
  const lastUsed = new Map(
    (
      await db
        .select({ categoryId: puzzleCategories.categoryId, last: dsql<string>`max(${dailyPuzzles.date})::text` })
        .from(puzzleCategories)
        .innerJoin(dailyPuzzles, eq(dailyPuzzles.id, puzzleCategories.puzzleId))
        .groupBy(puzzleCategories.categoryId)
    ).map((r) => [r.categoryId, r.last]),
  );
  // samo kategorije aktivne u sve tri države (kao i automatski izbor)
  const paired = new Set(
    (
      await db
        .select({ slug: categories.slug, n: dsql<number>`count(distinct ${categories.skinId})::int` })
        .from(categories)
        .where(and(inArray(categories.skinId, [hrSkin.id, ...followers]), eq(categories.active, true)))
        .groupBy(categories.slug)
    )
      .filter((r) => r.n === followers.length + 1)
      .map((r) => r.slug),
  );
  const rows = await db
    .select({ id: categories.id, group: categories.group, slug: categories.slug, open: categories.open })
    .from(categories)
    .where(and(eq(categories.skinId, hrSkin.id), eq(categories.active, true)));
  const pool = rows
    .filter((r) => paired.has(r.slug))
    .map((r) => ({ ...r, last: lastUsed.get(r.id) ?? "", rnd: Math.random() }))
    .sort((a, b) => a.last.localeCompare(b.last) || a.rnd - b.rnd);
  const used = new Set(pool.filter((p) => p.last).map((p) => p.slug));
  const pattern = hrSkin.config.dailyPattern;
  const wanted = plannedSlugs(pattern, plan, pool, used);
  const ids = pickCategories(pattern, pool, wanted);
  const [{ launchDate }] = await db.select({ launchDate: skins.launchDate }).from(skins).where(eq(skins.id, hrSkin.id));
  await db.transaction(async (tx) => {
    const [np] = await tx.insert(dailyPuzzles).values({ skinId: hrSkin.id, date, number: dayNumber(launchDate, date) }).returning();
    await tx.insert(puzzleCategories).values(ids.map((categoryId, position) => ({ puzzleId: np.id, position, categoryId })));
  });
  console.log(`raspored ${date}: ${ids.map((id) => pool.find((p) => p.id === id)!.slug).join(", ")} (zadano: ${wanted.filter(Boolean).length}/${pattern.length})`);
}

await sql.end();
