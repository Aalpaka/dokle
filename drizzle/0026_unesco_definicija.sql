-- Pitanje "unesco-hr" (samo hr skin; ba i rs pod tim slugom imaju pitanja o manastirima) dobiva jasniju definiciju:
-- vrijede samo svjetska baština i nematerijalna baština. Seed ne mijenja postojeće kategorije, pa se naslov i hint mijenjaju ovdje.
UPDATE "categories" SET
  "title" = 'Hrvatska svjetska ili nematerijalna baština UNESCO-a',
  "hint" = 'Lokaliteti svjetske baštine i nematerijalna baština; geoparkovi, rezervati biosfere i privremeni popis ne vrijede'
WHERE "skin_id" = 'hr' AND "slug" = 'unesco-hr';--> statement-breakpoint
-- geoparkovi i rezervati biosfere više nisu točni odgovori; brišu se samo ako ih nijedna runda, pokušaj ni odluka admina ne koristi
-- (aliasi i obrisane varijante idu kaskadno)
DELETE FROM "answers" a USING "categories" c
WHERE c."id" = a."category_id" AND c."skin_id" = 'hr' AND c."slug" = 'unesco-hr'
  AND a."canonical" IN ('Geopark Papuk', 'Geopark Viški arhipelag', 'Rezervat biosfere Velebit', 'Rezervat biosfere Mura-Drava-Dunav', 'Geopark Biokovo-Imotska jezera')
  AND NOT EXISTS (SELECT 1 FROM "rounds" r WHERE r."answer_id" = a."id")
  AND NOT EXISTS (SELECT 1 FROM "attempts" t WHERE t."answer_id" = a."id")
  AND NOT EXISTS (SELECT 1 FROM "review_decisions" v WHERE v."answer_id" = a."id");
