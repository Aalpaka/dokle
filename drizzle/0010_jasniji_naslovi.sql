-- Jasniji naslovi kategorija "izvan Hrvatske/BiH/Srbije". Seed ne dira postojeće kategorije, pa se naslovi mijenjaju ovdje,
-- i samo ako ih admin u međuvremenu nije preimenovao.
UPDATE "categories" SET "title" = 'Jelo koje nije iz hrvatske kuhinje' WHERE "skin_id" = 'hr' AND "slug" = 'svjetsko-jelo' AND "title" = 'Jelo iz svjetske kuhinje';--> statement-breakpoint
UPDATE "categories" SET "title" = 'Znamenitost ili građevina izvan Hrvatske' WHERE "skin_id" = 'hr' AND "slug" = 'svjetska-znamenitost' AND "title" = 'Svjetska znamenitost ili građevina';--> statement-breakpoint
UPDATE "categories" SET "title" = 'Sportaš ili sportašica izvan Hrvatske, bez nogometa i tenisa' WHERE "skin_id" = 'hr' AND "slug" = 'sportas-svijet' AND "title" = 'Svjetski sportaš ili sportašica, bez nogometa i tenisa';--> statement-breakpoint
UPDATE "categories" SET "title" = 'Političar ili državnik izvan Hrvatske' WHERE "skin_id" = 'hr' AND "slug" = 'politicar-svijet' AND "title" = 'Svjetski političar ili državnik';--> statement-breakpoint
UPDATE "categories" SET "title" = 'Pisac ili pjesnik izvan Hrvatske' WHERE "skin_id" = 'hr' AND "slug" = 'strani-pisac' AND "title" = 'Strani pisac ili pjesnik';--> statement-breakpoint
UPDATE "categories" SET "title" = 'Znanstvenik ili izumitelj izvan Hrvatske' WHERE "skin_id" = 'hr' AND "slug" = 'strani-znanstvenik' AND "title" = 'Strani znanstvenik ili izumitelj';--> statement-breakpoint
UPDATE "categories" SET "title" = 'Strana tvrtka ili brend' WHERE "slug" = 'svjetski-brend' AND "title" = 'Svjetska tvrtka ili brend';--> statement-breakpoint
UPDATE "categories" SET "title" = 'Djelo strane književnosti' WHERE "slug" = 'svjetska-knjizevnost' AND "title" = 'Djelo svjetske književnosti';--> statement-breakpoint
UPDATE "categories" SET "title" = 'Pjevač ili bend izvan bivše Jugoslavije' WHERE "slug" = 'strani-izvodjac' AND "title" = 'Strani pjevač ili bend';--> statement-breakpoint
UPDATE "categories" SET "title" = 'Jelo koje nije iz bosanske kuhinje' WHERE "skin_id" = 'ba' AND "slug" = 'svjetsko-jelo' AND "title" = 'Jelo iz svjetske kuhinje';--> statement-breakpoint
UPDATE "categories" SET "title" = 'Sportaš ili sportašica izvan BiH, bez nogometa i tenisa' WHERE "skin_id" = 'ba' AND "slug" = 'sportas-svijet' AND "title" = 'Svjetski sportaš ili sportašica, bez nogometa i tenisa';--> statement-breakpoint
UPDATE "categories" SET "title" = 'Jelo koje nije iz srpske kuhinje' WHERE "skin_id" = 'rs' AND "slug" = 'svjetsko-jelo' AND "title" = 'Jelo iz svetske kuhinje';--> statement-breakpoint
UPDATE "categories" SET "title" = 'Sportista ili sportistkinja van Srbije, bez fudbala i tenisa' WHERE "skin_id" = 'rs' AND "slug" = 'sportas-svijet' AND "title" = 'Svetski sportista ili sportistkinja, bez fudbala i tenisa';
