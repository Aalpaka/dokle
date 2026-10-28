import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { databaseUrl } from "./url";

// Jedna konekcija po procesu; u dev načinu preživi hot reload.
const g = globalThis as unknown as { __dokleSql?: ReturnType<typeof postgres> };
const sql =
  g.__dokleSql ??
  postgres(databaseUrl(), {
    max: 5,
    prepare: false, // Supabase pooler u transaction načinu ne podržava pripremljene upite
    idle_timeout: 20, // neaktivna funkcija ne drži mjesto u pooleru
    connect_timeout: 10,
  });
if (process.env.NODE_ENV !== "production") g.__dokleSql = sql;

export const db = drizzle(sql, { schema });
export type Db = typeof db;
export { sql };
