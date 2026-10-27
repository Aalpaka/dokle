-- Prijava se odnosi na jedan odbijeni pokušaj runde (i kad je runda kasnije pogođena); dosadašnje prijave su bile konačni upis.
ALTER TABLE "rounds" ADD COLUMN "reported_raw" text;--> statement-breakpoint
UPDATE "rounds" SET "reported_raw" = "raw" WHERE "reported_at" IS NOT NULL;
