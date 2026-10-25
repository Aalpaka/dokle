-- Prijava odgovora koji fale na popisu i obavijest o naknadnom bodovanju.
ALTER TABLE "rounds" ADD COLUMN "reported_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "rounds" ADD COLUMN "rejected_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "rounds" ADD COLUMN "rescored_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "rounds" ADD COLUMN "rescore_seen_at" timestamp with time zone;
