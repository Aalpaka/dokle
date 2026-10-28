-- Krivi odgovori (provjereno na popisu hrvatskih reprezentativaca, infookvirima igrača i sastavima olimpijskih momčadi):
-- Hrgović je igrao za BiH, Kelava i ostali samo za mlađe uzraste; Baturina, Labrović, Matić i Gulišija bili su samo u
-- Hajdukovoj školi; Špehar nikad nije igrao za Dinamo; Sulić, Musa i Valčić nisu bili u olimpijskim rukometnim momčadima, a
-- Huklek je u Tokiju bio peti. Seed ih više nema (krivi.ts); brišu se samo u hr skinu i samo ako ih još nitko nije dao.
DELETE FROM "answers" a USING "categories" c
WHERE c."id" = a."category_id" AND c."skin_id" = 'hr' AND (c."slug", a."canonical") IN (VALUES
    ('reprezentativac', 'Mirko Hrgović'), ('reprezentativac', 'Ivan Kelava'), ('reprezentativac', 'Oliver Zelenika'),
    ('reprezentativac', 'Ante Erceg'), ('reprezentativac', 'Josip Tadić'), ('reprezentativac', 'Bartol Franjić'),
    ('reprezentativac', 'Domagoj Kosić'), ('hajduk', 'Martin Baturina'), ('hajduk', 'Nediljko Labrović'),
    ('hajduk', 'Bernardo Matić'), ('hajduk', 'Gregor Gulišija'), ('dinamo', 'Robert Špehar'), ('dinamo', 'Roko Šimić'),
    ('dinamo', 'David Čolina'), ('dinamo', 'Tomislav Štrkalj'), ('dinamo', 'Branimir Kalaica'), ('dinamo', 'Ivan Pavlica'),
    ('hr-olimpijac', 'Renato Sulić'), ('hr-olimpijac', 'Željko Musa'), ('hr-olimpijac', 'Tonči Valčić'), ('hr-olimpijac', 'Ivan Huklek'))
  AND NOT EXISTS (SELECT 1 FROM "rounds" r WHERE r."answer_id" = a."id")
  AND NOT EXISTS (SELECT 1 FROM "attempts" t WHERE t."answer_id" = a."id")
  AND NOT EXISTS (SELECT 1 FROM "review_decisions" d WHERE d."answer_id" = a."id");
