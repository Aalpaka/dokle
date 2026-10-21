CREATE TABLE "answer_aliases" (
	"id" serial PRIMARY KEY NOT NULL,
	"answer_id" integer NOT NULL,
	"alias" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "answers" (
	"id" serial PRIMARY KEY NOT NULL,
	"category_id" integer NOT NULL,
	"canonical" text NOT NULL,
	"prior_share" real NOT NULL,
	"source" text DEFAULT 'seed' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "attempts" (
	"id" serial PRIMARY KEY NOT NULL,
	"game_id" integer NOT NULL,
	"position" integer NOT NULL,
	"category_id" integer NOT NULL,
	"raw" text NOT NULL,
	"normalized" text NOT NULL,
	"answer_id" integer,
	"accepted" boolean NOT NULL,
	"timed_out" boolean DEFAULT false NOT NULL,
	"elapsed_ms" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"skin_id" text NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"hint" text,
	"group" text NOT NULL,
	"strip" text[] DEFAULT '{}' NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "daily_puzzles" (
	"id" serial PRIMARY KEY NOT NULL,
	"skin_id" text NOT NULL,
	"date" date NOT NULL,
	"number" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "games" (
	"id" serial PRIMARY KEY NOT NULL,
	"player_id" uuid NOT NULL,
	"puzzle_id" integer NOT NULL,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"finished_at" timestamp with time zone,
	"total_km" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "players" (
	"id" uuid PRIMARY KEY NOT NULL,
	"auth_user_id" uuid,
	"nickname" text,
	"role" text DEFAULT 'player' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_seen_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "players_auth_user_id_unique" UNIQUE("auth_user_id")
);
--> statement-breakpoint
CREATE TABLE "puzzle_categories" (
	"puzzle_id" integer NOT NULL,
	"position" integer NOT NULL,
	"category_id" integer NOT NULL,
	CONSTRAINT "puzzle_categories_puzzle_id_position_pk" PRIMARY KEY("puzzle_id","position")
);
--> statement-breakpoint
CREATE TABLE "rounds" (
	"game_id" integer NOT NULL,
	"position" integer NOT NULL,
	"category_id" integer NOT NULL,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"answered_at" timestamp with time zone,
	"raw" text,
	"answer_id" integer,
	"share" real,
	"km" integer,
	"tier" text,
	CONSTRAINT "rounds_game_id_position_pk" PRIMARY KEY("game_id","position")
);
--> statement-breakpoint
CREATE TABLE "skins" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"timezone" text NOT NULL,
	"launch_date" date NOT NULL,
	"config" jsonb NOT NULL
);
--> statement-breakpoint
ALTER TABLE "answer_aliases" ADD CONSTRAINT "answer_aliases_answer_id_answers_id_fk" FOREIGN KEY ("answer_id") REFERENCES "public"."answers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "answers" ADD CONSTRAINT "answers_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attempts" ADD CONSTRAINT "attempts_game_id_games_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attempts" ADD CONSTRAINT "attempts_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attempts" ADD CONSTRAINT "attempts_answer_id_answers_id_fk" FOREIGN KEY ("answer_id") REFERENCES "public"."answers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_skin_id_skins_id_fk" FOREIGN KEY ("skin_id") REFERENCES "public"."skins"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "daily_puzzles" ADD CONSTRAINT "daily_puzzles_skin_id_skins_id_fk" FOREIGN KEY ("skin_id") REFERENCES "public"."skins"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "games" ADD CONSTRAINT "games_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "games" ADD CONSTRAINT "games_puzzle_id_daily_puzzles_id_fk" FOREIGN KEY ("puzzle_id") REFERENCES "public"."daily_puzzles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "puzzle_categories" ADD CONSTRAINT "puzzle_categories_puzzle_id_daily_puzzles_id_fk" FOREIGN KEY ("puzzle_id") REFERENCES "public"."daily_puzzles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "puzzle_categories" ADD CONSTRAINT "puzzle_categories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rounds" ADD CONSTRAINT "rounds_game_id_games_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rounds" ADD CONSTRAINT "rounds_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rounds" ADD CONSTRAINT "rounds_answer_id_answers_id_fk" FOREIGN KEY ("answer_id") REFERENCES "public"."answers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "answer_aliases_answer_alias" ON "answer_aliases" USING btree ("answer_id","alias");--> statement-breakpoint
CREATE UNIQUE INDEX "answers_category_canonical" ON "answers" USING btree ("category_id","canonical");--> statement-breakpoint
CREATE INDEX "attempts_category_normalized" ON "attempts" USING btree ("category_id","normalized");--> statement-breakpoint
CREATE INDEX "attempts_game" ON "attempts" USING btree ("game_id");--> statement-breakpoint
CREATE UNIQUE INDEX "categories_skin_slug" ON "categories" USING btree ("skin_id","slug");--> statement-breakpoint
CREATE UNIQUE INDEX "daily_puzzles_skin_date" ON "daily_puzzles" USING btree ("skin_id","date");--> statement-breakpoint
CREATE UNIQUE INDEX "games_player_puzzle" ON "games" USING btree ("player_id","puzzle_id");--> statement-breakpoint
CREATE INDEX "games_puzzle" ON "games" USING btree ("puzzle_id");--> statement-breakpoint
CREATE INDEX "rounds_category_answer" ON "rounds" USING btree ("category_id","answer_id");