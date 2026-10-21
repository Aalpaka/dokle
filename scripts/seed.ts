// Puni bazu skinom i početnim kategorijama. Može se pokretati više puta: postojeće ne dira, dodaje novo.
import { and, eq } from "drizzle-orm";
import { db, sql } from "../src/db";
import { answerAliases, answers, categories, skins } from "../src/db/schema";
import { parseSeedAnswers } from "../src/lib/matcher";
import { hrSkin } from "../src/skins/hr/config";
import { hrCategories } from "../src/skins/hr/categories";

const SKINS = [{ skin: hrSkin, categories: hrCategories }];

for (const { skin, categories: cats } of SKINS) {
  await db
    .insert(skins)
    .values(skin)
    .onConflictDoUpdate({ target: skins.id, set: { name: skin.name, timezone: skin.timezone, config: skin.config } });

  let added = 0;
  for (const c of cats) {
    const [cat] = await db
      .insert(categories)
      .values({ skinId: skin.id, slug: c.slug, title: c.title, hint: c.hint ?? null, group: c.group, strip: c.strip })
      .onConflictDoUpdate({
        target: [categories.skinId, categories.slug],
        set: { title: c.title, hint: c.hint ?? null, group: c.group, strip: c.strip },
      })
      .returning();
    for (const a of parseSeedAnswers(c.answers)) {
      let [ans] = await db
        .insert(answers)
        .values({ categoryId: cat.id, canonical: a.canonical, priorShare: a.share })
        .onConflictDoNothing()
        .returning();
      if (ans) added++;
      else [ans] = await db.select().from(answers).where(and(eq(answers.categoryId, cat.id), eq(answers.canonical, a.canonical)));
      if (a.variants.length)
        await db
          .insert(answerAliases)
          .values(a.variants.map((alias) => ({ answerId: ans.id, alias })))
          .onConflictDoNothing();
    }
  }
  console.log(`${skin.id}: ${cats.length} kategorija, ${added} novih odgovora`);
}

await sql.end();
