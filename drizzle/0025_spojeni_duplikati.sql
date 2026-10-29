-- Ista osoba ili stvar upisana dvaput pod različitim pravopisom ("Anna Kurnikova" i "Ana Kurnjikova", vidi spojeni.ts) spaja se u
-- jedan odgovor, u svakom skinu gdje postoje oba: runde, pokušaji i odluke admina prelaze na zadržani odgovor, drugi naziv i
-- njegove varijante postaju aliasi, procjene se zbrajaju (osim ako ju je admin ručno mijenjao ili je odgovor helikopter).
CREATE TABLE "_spoj" AS
SELECT d."id" AS "drop_id", k."id" AS "keep_id"
FROM (VALUES
  ('tenis', 'Ana Kurnjikova', 'Anna Kurnikova'),
  ('tenis', 'Arina Sabaljenka', 'Aryna Sabalenka'),
  ('tenis', 'Jekaterina Makarova', 'Ekaterina Makarova'),
  ('tenis', 'Jelena Ribakina', 'Elena Rybakina'),
  ('tenis', 'Jelena Vesnina', 'Elena Vesnina'),
  ('tenis', 'Igor Andrejev', 'Igor Andreev'),
  ('tenis', 'Mihail Južnjij', 'Mikhail Youzhny'),
  ('tenis', 'Nikolaj Davydenko', 'Nikolaj Davidenko'),
  ('tenis', 'Nikoloz Basilašvili', 'Nikoloz Basilashvili'),
  ('tenis', 'Anastazija Pavljučenkova', 'Anastasia Pavlyuchenkova'),
  ('tenis', 'Jelena Dementjeva', 'Elena Dementieva'),
  ('tenis', 'Mónika Szeles', 'Monica Seles'),
  ('tenis', 'Viktorija Azarenka', 'Victoria Azarenka'),
  ('kosarkas-svijet', 'Andrej Kiriljenko', 'Andrei Kirilenko'),
  ('kosarkas-svijet', 'Zaza Pačulija', 'Zaza Pachulia'),
  ('sportas-svijet', 'Andrej Kiriljenko', 'Andrei Kirilenko'),
  ('sportas-svijet', 'Aleksandar Aljehin', 'Alexander Alekhine'),
  ('pisac', 'Matija Antun Relković', 'Matija Antun Reljković'),
  ('strani-pisac', 'Matija Antun Relković', 'Matija Antun Reljković'),
  ('strani-pisac', 'Anna Ahmatova', 'Ana Ahmatova'),
  ('strani-pisac', 'Ivan Aleksejevič Bunjin', 'Ivan Bunin'),
  ('strani-pisac', 'Omar Hajjam', 'Omar Hajam'),
  ('strani-pisac', 'Jasunari Kavabata', 'Yasunari Kawabata'),
  ('strani-pisac', 'Nagib Mahfuz', 'Naguib Mahfouz'),
  ('slikar', 'Alexej von Jawlensky', 'Aleksej Javlenski'),
  ('slikar', 'Viktor Mihajlovič Vasnjecov', 'Viktor Vasnecov'),
  ('slikar', 'Alphonse Mucha', 'Alfons Mucha'),
  ('znanstvenik', 'Đuro Pilar', 'Gjuro Pilar'),
  ('znanstvenik', 'Teodor Wikerhauser', 'Teodor Wickerhauser'),
  ('znanstvenik', 'Afan Ramić', 'Affan Ramić'),
  ('strani-znanstvenik', 'Grigorij Pereljman', 'Grigorij Perelman'),
  ('strani-znanstvenik', 'Đuro Pilar', 'Gjuro Pilar'),
  ('strani-znanstvenik', 'Teodor Wikerhauser', 'Teodor Wickerhauser'),
  ('strani-znanstvenik', 'Carl Benz', 'Karl Benz'),
  ('zlikovac', 'Mephisto', 'Mefisto'),
  ('voce', 'Pastrnak', 'Pastrnjak'),
  ('dinamo', 'Fatos Beqiraj', 'Fatos Bećiraj'),
  ('dinamo', 'Mounsef Bakrar', 'Monsef Bakrar'),
  ('filozof', 'Anzelmo Canterburyjski', 'Anselmo Canterburyjski'),
  ('filozof', 'William Occam', 'Vilim Ockham'),
  ('svjetska-znamenitost', 'Kelnska katedrala', 'Kölnska katedrala'),
  ('znamenitost', 'Kozija ćuprija', 'Kozja ćuprija'),
  ('hr-vladar', 'Isa-beg Isaković', 'Isa-beg Ishaković')
) AS p("slug", "drop_name", "keep_name")
JOIN "categories" c ON c."slug" = p."slug"
JOIN "answers" d ON d."category_id" = c."id" AND d."canonical" = p."drop_name"
JOIN "answers" k ON k."category_id" = c."id" AND k."canonical" = p."keep_name";--> statement-breakpoint
UPDATE "rounds" r SET "answer_id" = s."keep_id" FROM "_spoj" s WHERE r."answer_id" = s."drop_id";--> statement-breakpoint
UPDATE "attempts" t SET "answer_id" = s."keep_id" FROM "_spoj" s WHERE t."answer_id" = s."drop_id";--> statement-breakpoint
UPDATE "review_decisions" v SET "answer_id" = s."keep_id" FROM "_spoj" s WHERE v."answer_id" = s."drop_id";--> statement-breakpoint
INSERT INTO "answer_aliases" ("answer_id", "alias")
SELECT s."keep_id", d."canonical" FROM "_spoj" s JOIN "answers" d ON d."id" = s."drop_id"
UNION SELECT s."keep_id", x."alias" FROM "_spoj" s JOIN "answer_aliases" x ON x."answer_id" = s."drop_id"
ON CONFLICT DO NOTHING;--> statement-breakpoint
-- varijante koje je admin obrisao ostaju obrisane i na zadržanom odgovoru (inače bi ih seed vratio)
INSERT INTO "removed_aliases" ("answer_id", "alias")
SELECT s."keep_id", x."alias" FROM "_spoj" s JOIN "removed_aliases" x ON x."answer_id" = s."drop_id"
ON CONFLICT DO NOTHING;--> statement-breakpoint
UPDATE "answers" k SET "prior_share" = k."prior_share" + d."prior_share"
FROM "_spoj" s JOIN "answers" d ON d."id" = s."drop_id"
WHERE k."id" = s."keep_id" AND k."edited_at" IS NULL AND NOT k."rare";--> statement-breakpoint
UPDATE "answers" k SET "fact" = d."fact"
FROM "_spoj" s JOIN "answers" d ON d."id" = s."drop_id"
WHERE k."id" = s."keep_id" AND k."fact" IS NULL AND d."fact" IS NOT NULL AND d."fact" <> '';--> statement-breakpoint
DELETE FROM "answers" a USING "_spoj" s WHERE a."id" = s."drop_id";--> statement-breakpoint
DROP TABLE "_spoj";
