-- Ispravci zapisa imena: "Mika Tripalo" je Miko Tripalo, a trener "Dražen Jerković" je Dražan Jerković.
-- Seed ne mijenja postojeće odgovore, pa se naziv mijenja ovdje (samo u hr skinu); stari zapis ostaje kao alias (aliasi.ts).
UPDATE "answers" a SET "canonical" = v."novo"
FROM "categories" c, (VALUES ('politicar', 'Mika Tripalo', 'Miko Tripalo'), ('trener', 'Dražen Jerković', 'Dražan Jerković')) AS v("slug", "staro", "novo")
WHERE c."id" = a."category_id" AND c."skin_id" = 'hr' AND c."slug" = v."slug" AND a."canonical" = v."staro"
  AND NOT EXISTS (SELECT 1 FROM "answers" b WHERE b."category_id" = a."category_id" AND b."canonical" = v."novo");--> statement-breakpoint
-- alias jednak novom nazivu više ne treba
DELETE FROM "answer_aliases" x USING "answers" a, "categories" c
WHERE x."answer_id" = a."id" AND c."id" = a."category_id" AND c."skin_id" = 'hr'
  AND (c."slug", a."canonical", x."alias") IN (VALUES ('politicar', 'Miko Tripalo', 'Miko Tripalo'), ('trener', 'Dražan Jerković', 'Dražan Jerković'));
