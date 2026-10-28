-- "Psina golema" je hrvatski naziv goleme psine (Cetorhinus maximus), a odgovor je imao varijante velike bijele psine
-- (Carcharodon carcharias). Seed ne mijenja postojeće odgovore, pa se odgovor ovdje preimenuje u Veliku bijelu psinu
-- (u svim skinovima, riba je zajednička kategorija), a golemu psinu seed dodaje kao novi odgovor.
UPDATE "answers" a SET "canonical" = 'Velika bijela psina'
FROM "categories" c
WHERE c."id" = a."category_id" AND c."slug" = 'riba' AND a."canonical" = 'Psina golema'
  AND NOT EXISTS (SELECT 1 FROM "answers" b WHERE b."category_id" = a."category_id" AND b."canonical" = 'Velika bijela psina');--> statement-breakpoint
-- izvorni naziv iz seeda ne smije više voditi na veliku bijelu psinu, inače bi seed golemoj psini dao njezin odgovor
UPDATE "answers" a SET "seed_canonical" = NULL
FROM "categories" c
WHERE c."id" = a."category_id" AND c."slug" = 'riba' AND a."seed_canonical" = 'Psina golema';--> statement-breakpoint
-- alias jednak novom nazivu više ne treba
DELETE FROM "answer_aliases" x USING "answers" a, "categories" c
WHERE x."answer_id" = a."id" AND c."id" = a."category_id" AND c."slug" = 'riba'
  AND a."canonical" = 'Velika bijela psina' AND x."alias" = 'Velika bijela psina';
