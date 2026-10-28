-- Jasnije upute za dva kviz pitanja (seed ne mijenja upute postojećih kategorija). Mijenja se samo uputa koju admin nije dirao.
-- Pobjednik Eurovizije 2026. (Bugarska, Dara – „Bangaranga”) dodan je među odgovore, pa uputa ide do 2026.
UPDATE "categories" SET "hint" = 'Bilo koja godina od 1956. do 2026.' WHERE "slug" = 'eurovizija-pobjednik' AND "hint" = 'Bilo koja godina od 1956. do 2025.';--> statement-breakpoint
-- "Svjetski prvak" bez upute može značiti i momčad (Ferrari, Red Bull), a odgovori su samo vozači
UPDATE "categories" SET "hint" = 'Vozač, ne momčad; od 1950. do 2025.' WHERE "slug" = 'f1-prvak' AND "hint" IS NULL;
