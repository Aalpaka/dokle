-- Profilna slika prijavljenog igrača (smanjena u pregledniku, do 64 KB). Drugima se šalje samo nasumični ključ
-- (/api/slika/<ključ>), ne id igrača; novi upload dobiva novi ključ, pa se slika smije dugo keširati.
CREATE TABLE "player_avatars" (
	"player_id" uuid PRIMARY KEY NOT NULL,
	"key" text NOT NULL,
	"mime" text NOT NULL,
	"data" bytea NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "player_avatars" ADD CONSTRAINT "player_avatars_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "player_avatars_key" ON "player_avatars" USING btree ("key");--> statement-breakpoint
ALTER TABLE "player_avatars" ENABLE ROW LEVEL SECURITY;
