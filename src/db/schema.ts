import {
  boolean,
  date,
  index,
  integer,
  jsonb,
  pgTable,
  primaryKey,
  real,
  serial,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import type { SkinConfig } from "@/skins/types";

// Skin = jedna zemlja/ruta (hr, kasnije ba, rs). Sve ostalo visi o skinu.
export const skins = pgTable("skins", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  timezone: text("timezone").notNull(),
  launchDate: date("launch_date").notNull(),
  config: jsonb("config").$type<SkinConfig>().notNull(),
});

export const categories = pgTable(
  "categories",
  {
    id: serial("id").primaryKey(),
    skinId: text("skin_id").notNull().references(() => skins.id),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    hint: text("hint"),
    group: text("group").notNull(), // grupe su definirane u configu skina
    strip: text("strip").array().notNull().default([]), // riječi koje se smiju izostaviti ("otok Krk")
    active: boolean("active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex("categories_skin_slug").on(t.skinId, t.slug)],
);

export const answers = pgTable(
  "answers",
  {
    id: serial("id").primaryKey(),
    categoryId: integer("category_id").notNull().references(() => categories.id),
    canonical: text("canonical").notNull(),
    priorShare: real("prior_share").notNull(), // procijenjeni % igrača prije stvarnih podataka
    rare: boolean("rare").notNull().default(false), // najrjeđi odgovor kategorije (poseban tier, helikopter)
    source: text("source").notNull().default("seed"), // seed | review
    // admin je preimenovao odgovor: izvorni naziv iz seeda, da ga seed ne doda ponovno kao novi odgovor
    seedCanonical: text("seed_canonical"),
    // admin je ručno mijenjao procjenu ili helikopter; seed to više ne dira
    editedAt: timestamp("edited_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex("answers_category_canonical").on(t.categoryId, t.canonical)],
);

export const answerAliases = pgTable(
  "answer_aliases",
  {
    id: serial("id").primaryKey(),
    answerId: integer("answer_id").notNull().references(() => answers.id, { onDelete: "cascade" }),
    alias: text("alias").notNull(),
  },
  (t) => [uniqueIndex("answer_aliases_answer_alias").on(t.answerId, t.alias)],
);

// varijante koje je admin obrisao; seed ih ne vraća
export const removedAliases = pgTable(
  "removed_aliases",
  {
    answerId: integer("answer_id").notNull().references(() => answers.id, { onDelete: "cascade" }),
    alias: text("alias").notNull(),
  },
  (t) => [primaryKey({ columns: [t.answerId, t.alias] })],
);

export const dailyPuzzles = pgTable(
  "daily_puzzles",
  {
    id: serial("id").primaryKey(),
    skinId: text("skin_id").notNull().references(() => skins.id),
    date: date("date").notNull(),
    number: integer("number").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex("daily_puzzles_skin_date").on(t.skinId, t.date)],
);

export const puzzleCategories = pgTable(
  "puzzle_categories",
  {
    puzzleId: integer("puzzle_id").notNull().references(() => dailyPuzzles.id, { onDelete: "cascade" }),
    position: integer("position").notNull(),
    categoryId: integer("category_id").notNull().references(() => categories.id),
  },
  (t) => [primaryKey({ columns: [t.puzzleId, t.position] })],
);

// Anonimni igrač ima samo id (iz kolačića); authUserId se puni nakon Google prijave.
export const players = pgTable("players", {
  id: uuid("id").primaryKey(),
  authUserId: uuid("auth_user_id").unique(),
  email: text("email"),
  nickname: text("nickname"),
  role: text("role").notNull().default("player"), // player | admin
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  lastSeenAt: timestamp("last_seen_at", { withTimezone: true }).notNull().defaultNow(),
});

export const games = pgTable(
  "games",
  {
    id: serial("id").primaryKey(),
    playerId: uuid("player_id").notNull().references(() => players.id),
    puzzleId: integer("puzzle_id").notNull().references(() => dailyPuzzles.id),
    startedAt: timestamp("started_at", { withTimezone: true }).notNull().defaultNow(),
    finishedAt: timestamp("finished_at", { withTimezone: true }),
    totalKm: integer("total_km").notNull().default(0),
    // false = igrač je taj dan već igrao drugu državu; partija ne ulazi u udjele, usporedbu, lige ni streak
    ranked: boolean("ranked").notNull().default(true),
  },
  (t) => [uniqueIndex("games_player_puzzle").on(t.playerId, t.puzzleId), index("games_puzzle").on(t.puzzleId)],
);

// Jedna kategorija unutar partije: kad je počela i koji je odgovor bodovan.
export const rounds = pgTable(
  "rounds",
  {
    gameId: integer("game_id").notNull().references(() => games.id, { onDelete: "cascade" }),
    position: integer("position").notNull(),
    categoryId: integer("category_id").notNull().references(() => categories.id),
    startedAt: timestamp("started_at", { withTimezone: true }).notNull().defaultNow(),
    answeredAt: timestamp("answered_at", { withTimezone: true }),
    raw: text("raw"),
    answerId: integer("answer_id").references(() => answers.id),
    share: real("share"), // % igrača u trenutku odgovora
    km: integer("km"),
    tier: text("tier"),
  },
  (t) => [primaryKey({ columns: [t.gameId, t.position] }), index("rounds_category_answer").on(t.categoryId, t.answerId)],
);

// Svaki upis, i odbijeni, za statistike i admin pregled.
export const attempts = pgTable(
  "attempts",
  {
    id: serial("id").primaryKey(),
    gameId: integer("game_id").notNull().references(() => games.id, { onDelete: "cascade" }),
    position: integer("position").notNull(),
    categoryId: integer("category_id").notNull().references(() => categories.id),
    raw: text("raw").notNull(),
    normalized: text("normalized").notNull(),
    answerId: integer("answer_id").references(() => answers.id),
    accepted: boolean("accepted").notNull(),
    timedOut: boolean("timed_out").notNull().default(false),
    elapsedMs: integer("elapsed_ms").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("attempts_category_normalized").on(t.categoryId, t.normalized), index("attempts_game").on(t.gameId)],
);

// Odluke admina o odbijenim odgovorima (grupirano po normaliziranom tekstu).
export const reviewDecisions = pgTable(
  "review_decisions",
  {
    id: serial("id").primaryKey(),
    categoryId: integer("category_id").notNull().references(() => categories.id),
    normalized: text("normalized").notNull(),
    decision: text("decision").notNull(), // answer | alias | reject
    answerId: integer("answer_id").references(() => answers.id),
    rescored: integer("rescored").notNull().default(0), // koliko je rundi naknadno bodovano
    decidedBy: uuid("decided_by").references(() => players.id),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex("review_decisions_category_normalized").on(t.categoryId, t.normalized)],
);

// Privatne lige prijavljenih igrača; ulazi se preko koda iz linka (/liga/KOD).
export const leagues = pgTable(
  "leagues",
  {
    id: serial("id").primaryKey(),
    skinId: text("skin_id").notNull().references(() => skins.id),
    code: text("code").notNull(),
    name: text("name").notNull(),
    ownerId: uuid("owner_id").notNull().references(() => players.id),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex("leagues_code").on(t.code)],
);

export const leagueMembers = pgTable(
  "league_members",
  {
    id: serial("id").primaryKey(), // javni id člana (id igrača se ne šalje drugima)
    leagueId: integer("league_id").notNull().references(() => leagues.id, { onDelete: "cascade" }),
    playerId: uuid("player_id").notNull().references(() => players.id),
    joinedAt: timestamp("joined_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex("league_members_league_player").on(t.leagueId, t.playerId), index("league_members_player").on(t.playerId)],
);
