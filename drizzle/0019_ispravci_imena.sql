-- Ispravci zapisa imena: "Mika Tripalo" je Miko Tripalo, a trener "Dražen Jerković" je Dražan Jerković.
-- Seed ne mijenja postojeće odgovore, pa se naziv mijenja ovdje (u hr skinu, a Tripalo i među političarima izvan BiH i
-- Srbije, koji ga preuzimaju iz hrvatske kategorije); stari zapis ostaje kao alias (aliasi.ts).
UPDATE "answers" a SET "canonical" = v."novo"
FROM "categories" c, (VALUES ('hr', 'politicar', 'Mika Tripalo', 'Miko Tripalo'), ('ba', 'politicar-svijet', 'Mika Tripalo', 'Miko Tripalo'),
    ('rs', 'politicar-svijet', 'Mika Tripalo', 'Miko Tripalo'), ('hr', 'trener', 'Dražen Jerković', 'Dražan Jerković')) AS v("skin", "slug", "staro", "novo")
WHERE c."id" = a."category_id" AND c."skin_id" = v."skin" AND c."slug" = v."slug" AND a."canonical" = v."staro"
  AND NOT EXISTS (SELECT 1 FROM "answers" b WHERE b."category_id" = a."category_id" AND b."canonical" = v."novo");--> statement-breakpoint
-- alias jednak novom nazivu više ne treba
DELETE FROM "answer_aliases" x USING "answers" a, "categories" c
WHERE x."answer_id" = a."id" AND c."id" = a."category_id"
  AND (c."skin_id", c."slug", a."canonical", x."alias") IN (VALUES ('hr', 'politicar', 'Miko Tripalo', 'Miko Tripalo'),
    ('ba', 'politicar-svijet', 'Miko Tripalo', 'Miko Tripalo'), ('rs', 'politicar-svijet', 'Miko Tripalo', 'Miko Tripalo'),
    ('hr', 'trener', 'Dražan Jerković', 'Dražan Jerković'));
