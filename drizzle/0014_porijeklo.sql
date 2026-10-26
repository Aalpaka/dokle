-- Gruba lokacija iz Vercelovih geo zaglavlja (bez IP adrese), vrsta uređaja i odakle je igrač prvi put došao.
ALTER TABLE "players" ADD COLUMN "country" text;--> statement-breakpoint
ALTER TABLE "players" ADD COLUMN "city" text;--> statement-breakpoint
ALTER TABLE "players" ADD COLUMN "device" text;--> statement-breakpoint
ALTER TABLE "players" ADD COLUMN "referrer" text;
