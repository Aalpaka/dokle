// Puni bazu skinom i početnim kategorijama. Može se pokretati više puta: config skina osvježava, kategorije i odgovore samo dodaje
// (jedina izmjena postojećih je oznaka najrjeđeg odgovora za helikopter).
import { and, eq } from "drizzle-orm";
import { db, sql } from "../src/db";
import { answerAliases, answers, categories, skins } from "../src/db/schema";
import { parseSeedAnswers } from "../src/lib/matcher";
import { localDate } from "../src/lib/day";
import { hrSkin } from "../src/skins/hr/config";
import { hrCategories } from "../src/skins/hr/categories";
import { baSkin } from "../src/skins/ba/config";
import { rsSkin } from "../src/skins/rs/config";
import { regionalCategories } from "../src/skins/regional";
import { baContent } from "../src/skins/ba/kategorije";
import { rsContent } from "../src/skins/rs/kategorije";

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
      .values({ skinId: skin.id, slug: c.slug, title: c.title, hint: c.hint ?? null, group: c.group, strip: c.strip })
      .onConflictDoNothing()
      .returning();
    if (!cat) [cat] = await db.select().from(categories).where(and(eq(categories.skinId, skin.id), eq(categories.slug, c.slug)));
    // odgovori i aliasi idu skupno po kategoriji: upit po odgovoru je za desetke tisuća odgovora predug za build
    const seeded = parseSeedAnswers(c.answers);
    const inserted = await db
      .insert(answers)
      .values(seeded.map((a) => ({ categoryId: cat.id, canonical: a.canonical, priorShare: a.share, rare: a.rare })))
      .onConflictDoNothing()
      .returning({ id: answers.id });
    added += inserted.length;
    const byCanonical = new Map((await db.select().from(answers).where(eq(answers.categoryId, cat.id))).map((x) => [x.canonical, x]));
    const aliases: { answerId: number; alias: string }[] = [];
    for (const a of seeded) {
      const ans = byCanonical.get(a.canonical)!;
      // najrjeđi (helikopter) se označava i na postojećim odgovorima; procjena se smije samo spustiti
      if (a.rare && !ans.rare) {
        await db
          .update(answers)
          .set({ rare: true, priorShare: Math.min(ans.priorShare, a.share) })
          .where(eq(answers.id, ans.id));
        marked++;
      }
      for (const alias of a.variants) aliases.push({ answerId: ans.id, alias });
    }
    if (aliases.length) await db.insert(answerAliases).values(aliases).onConflictDoNothing();
  }
  console.log(`${skin.id}: ${cats.length} kategorija, ${added} novih odgovora, ${marked} označeno za helikopter`);
}

await sql.end();
