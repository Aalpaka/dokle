import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Jedna konekcija po procesu; u dev načinu preživi hot reload.
const g = globalThis as unknown as { __dokleSql?: ReturnType<typeof postgres> };
const sql = g.__dokleSql ?? postgres(process.env.DATABASE_URL!, { max: 5, prepare: false });
if (process.env.NODE_ENV !== "production") g.__dokleSql = sql;

export const db = drizzle(sql, { schema });
export type Db = typeof db;
export { sql };
