-- Varijante koje ne počinju zadanim slovom ne smiju vrijediti u pitanjima sa slovom: "Vatikan" ili "Amerika" u
-- "Država koja počinje na S ili Š", "Velika Britanija" u "Država koja počinje samoglasnikom", "Deva" u "Životinja na
-- slovo K". Seed ih više nema; ovdje se brišu iz baze (svi skinovi) i pamte kao obrisane, kao da ih je obrisao admin.
INSERT INTO "removed_aliases" ("answer_id", "alias")
SELECT aa."answer_id", aa."alias" FROM "answer_aliases" aa
  JOIN "answers" a ON a."id" = aa."answer_id"
  JOIN "categories" c ON c."id" = a."category_id"
WHERE (c."slug", aa."alias") IN (VALUES
    ('drzava-s', 'Amerika'), ('drzava-s', 'USA'), ('drzava-s', 'Cejlon'), ('drzava-s', 'El Salvador'),
    ('drzava-s', 'Centralnoafrička Republika'), ('drzava-s', 'Vatikan'), ('drzava-samoglasnik', 'Velika Britanija'), ('drzava-samoglasnik', 'Britanija'),
    ('drzava-samoglasnik', 'Timor-Leste'), ('drzava-samoglasnik', 'Timor'), ('drzava-samoglasnik', 'Svazi'), ('drzava-samoglasnik', 'Swaziland'),
    ('drzava-b-m', 'Sjeverna Makedonija'), ('zivotinja-k', 'Deva'), ('zivotinja-k', 'Orka'), ('zivotinja-k', 'Pijetao Kokot'),
    ('zivotinja-k', 'Lignja kalamar'), ('zivotinja-k', 'Grbavi kit'), ('mjesto-s', 'Zelina'), ('mjesto-k', 'Hrvatska Kostajnica'))
ON CONFLICT DO NOTHING;--> statement-breakpoint
DELETE FROM "answer_aliases" aa USING "answers" a, "categories" c
WHERE a."id" = aa."answer_id" AND c."id" = a."category_id" AND (c."slug", aa."alias") IN (VALUES
    ('drzava-s', 'Amerika'), ('drzava-s', 'USA'), ('drzava-s', 'Cejlon'), ('drzava-s', 'El Salvador'),
    ('drzava-s', 'Centralnoafrička Republika'), ('drzava-s', 'Vatikan'), ('drzava-samoglasnik', 'Velika Britanija'), ('drzava-samoglasnik', 'Britanija'),
    ('drzava-samoglasnik', 'Timor-Leste'), ('drzava-samoglasnik', 'Timor'), ('drzava-samoglasnik', 'Svazi'), ('drzava-samoglasnik', 'Swaziland'),
    ('drzava-b-m', 'Sjeverna Makedonija'), ('zivotinja-k', 'Deva'), ('zivotinja-k', 'Orka'), ('zivotinja-k', 'Pijetao Kokot'),
    ('zivotinja-k', 'Lignja kalamar'), ('zivotinja-k', 'Grbavi kit'), ('mjesto-s', 'Zelina'), ('mjesto-k', 'Hrvatska Kostajnica'));
