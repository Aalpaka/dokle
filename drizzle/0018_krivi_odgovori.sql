-- Krivi odgovori u nogometnim pitanjima (provjereno na popisu hrvatskih reprezentativaca i infookvirima igrača): Hrgović je
-- igrao za BiH, Kelava i ostali samo za mlađe uzraste; Baturina, Labrović, Matić i Gulišija bili su samo u Hajdukovoj školi;
-- Špehar nikad nije igrao za Dinamo. Seed ih više nema (krivi.ts); brišu se samo u hr skinu i samo ako ih još nitko nije dao.
DELETE FROM "answers" a USING "categories" c
WHERE c."id" = a."category_id" AND c."skin_id" = 'hr' AND (c."slug", a."canonical") IN (VALUES
    ('reprezentativac', 'Mirko Hrgović'), ('reprezentativac', 'Ivan Kelava'), ('reprezentativac', 'Oliver Zelenika'),
    ('reprezentativac', 'Ante Erceg'), ('reprezentativac', 'Josip Tadić'), ('reprezentativac', 'Bartol Franjić'),
    ('reprezentativac', 'Domagoj Kosić'), ('hajduk', 'Martin Baturina'), ('hajduk', 'Nediljko Labrović'),
    ('hajduk', 'Bernardo Matić'), ('hajduk', 'Gregor Gulišija'), ('dinamo', 'Robert Špehar'), ('dinamo', 'Roko Šimić'),
    ('dinamo', 'David Čolina'), ('dinamo', 'Tomislav Štrkalj'), ('dinamo', 'Branimir Kalaica'), ('dinamo', 'Ivan Pavlica'))
  AND NOT EXISTS (SELECT 1 FROM "rounds" r WHERE r."answer_id" = a."id")
  AND NOT EXISTS (SELECT 1 FROM "attempts" t WHERE t."answer_id" = a."id")
  AND NOT EXISTS (SELECT 1 FROM "review_decisions" d WHERE d."answer_id" = a."id");
