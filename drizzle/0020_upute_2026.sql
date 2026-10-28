-- Upute koje idu do 2026.: Oscar za najbolji film 2026. ("Jedna bitka za drugom") dodan je među odgovore, a odgovori za glumu
-- i Ligu prvaka već imaju dobitnike iz 2026. (Michael B. Jordan, Jessie Buckley, Sean Penn, Amy Madigan; PSG i Barcelona).
-- Seed ne mijenja upute postojećih kategorija, pa se mijenja samo uputa koju admin nije dirao (u svim skinovima).
UPDATE "categories" SET "hint" = 'Bilo koja godina od 1929. do 2026.; hrvatski ili izvorni naslov' WHERE "slug" = 'oscar-film' AND "hint" = 'Bilo koja godina, od Krila (1929.) do Anore (2025.); hrvatski ili izvorni naslov';--> statement-breakpoint
UPDATE "categories" SET "hint" = 'Bilo koja godina od 1929. do 2026.; naš ili izvorni naslov' WHERE "slug" = 'oscar-film' AND "hint" = 'Bilo koja godina, od Krila (1929.) do Anore (2025.); naš ili izvorni naslov';--> statement-breakpoint
UPDATE "categories" SET "hint" = 'Glavna ili sporedna uloga, do 2026.' WHERE "slug" = 'oscar-gluma' AND "hint" = 'Glavna ili sporedna uloga, do 2025.';--> statement-breakpoint
UPDATE "categories" SET "hint" = 'Nogomet, muški ili ženski, do 2026.' WHERE "slug" = 'liga-prvaka-klub' AND "hint" = 'Nogomet, muški ili ženski, do 2025.';
