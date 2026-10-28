-- Reakcije članova lige (😂 🔥 🤦 👏) na današnje odgovore drugih članova; jedna po osobi po odgovoru.
CREATE TABLE "league_reactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"league_id" integer NOT NULL,
	"game_id" integer NOT NULL,
	"position" integer NOT NULL,
	"player_id" uuid NOT NULL,
	"emoji" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "league_reactions" ADD CONSTRAINT "league_reactions_league_id_leagues_id_fk" FOREIGN KEY ("league_id") REFERENCES "public"."leagues"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "league_reactions" ADD CONSTRAINT "league_reactions_game_id_games_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "league_reactions" ADD CONSTRAINT "league_reactions_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "league_reactions_one" ON "league_reactions" USING btree ("league_id","game_id","position","player_id");--> statement-breakpoint
CREATE INDEX "league_reactions_game" ON "league_reactions" USING btree ("game_id");
