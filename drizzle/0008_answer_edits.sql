-- Uređivanje postojećih odgovora u adminu: seed prepoznaje preimenovane odgovore i ne dira ručno mijenjanu rijetkost.
ALTER TABLE "answers" ADD COLUMN "seed_canonical" text;--> statement-breakpoint
ALTER TABLE "answers" ADD COLUMN "edited_at" timestamp with time zone;
