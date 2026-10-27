-- "Želim da se ovaj računa" se odnosi na jedan odbijeni pokušaj runde (i kad je runda kasnije pogođena); dosadašnje
-- prijave su bile konačni upis. "Fali na popisu" se može prijaviti za više pokušaja, bez utjecaja na km.
ALTER TABLE "rounds" ADD COLUMN "reported_raw" text;--> statement-breakpoint
UPDATE "rounds" SET "reported_raw" = "raw" WHERE "reported_at" IS NOT NULL;--> statement-breakpoint
ALTER TABLE "attempts" ADD COLUMN "reported_at" timestamp with time zone;
