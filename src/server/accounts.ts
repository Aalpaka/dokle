import "server-only";
import { and, desc, eq, isNotNull, notInArray, sql } from "drizzle-orm";
import { db } from "@/db";
import { dailyPuzzles, games, players } from "@/db/schema";
import { computeStats } from "@/lib/stats";
import { localDate } from "@/lib/day";
import { placeAt } from "@/skins/mjesta";
import type { Skin } from "./game";

export function isAdminEmail(email: string | null | undefined) {
  if (!email) return false;
  const list = (process.env.ADMIN_EMAILS ?? "").split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
  return list.includes(email.toLowerCase());
}

const defaultNickname = () => `Putnik ${Math.floor(1000 + Math.random() * 9000)}`;

/**
 * Veže Google račun uz igrača i vraća id igrača za taj račun.
 * Anonimne partije s ovog preglednika prelaze na račun, osim za dane koje je račun već odigrao.
 */
export async function linkAccount(cookiePid: string | null, authUserId: string, email: string | null): Promise<string> {
  const role = isAdminEmail(email) ? "admin" : "player";
  return db.transaction(async (tx) => {
    const [account] = await tx.select().from(players).where(eq(players.authUserId, authUserId));
    const [anon] = cookiePid ? await tx.select().from(players).where(eq(players.id, cookiePid)) : [];

    if (account) {
      await tx.update(players).set({ email, role, lastSeenAt: new Date() }).where(eq(players.id, account.id));
      if (anon && !anon.authUserId && anon.id !== account.id) {
        const taken = tx.select({ id: games.puzzleId }).from(games).where(eq(games.playerId, account.id));
        await tx
          .update(games)
          .set({ playerId: account.id })
          .where(and(eq(games.playerId, anon.id), notInArray(games.puzzleId, taken)));
        // nakon spajanja se taj dan broji samo prva započeta partija, ostale države su "za gušt"
        await tx.execute(sql`
          update games g set ranked = false
          from daily_puzzles p
          where g.puzzle_id = p.id and g.player_id = ${account.id} and g.ranked
            and exists (
              select 1 from games o join daily_puzzles op on op.id = o.puzzle_id
              where o.player_id = g.player_id and op.date = p.date and op.skin_id <> p.skin_id
                and (o.started_at, o.id) < (g.started_at, g.id))`);
      }
      return account.id;
    }
    if (anon && !anon.authUserId) {
      await tx
        .update(players)
        .set({ authUserId, email, role, nickname: anon.nickname ?? defaultNickname(), lastSeenAt: new Date() })
        .where(eq(players.id, anon.id));
      return anon.id;
    }
    const id = crypto.randomUUID();
    await tx.insert(players).values({ id, authUserId, email, role, nickname: defaultNickname() });
    return id;
  });
}

export async function getPlayer(id: string) {
  const [p] = await db.select().from(players).where(eq(players.id, id));
  return p ?? null;
}

export async function setNickname(id: string, nickname: string) {
  await db.update(players).set({ nickname }).where(eq(players.id, id));
}

/** Brisanje računa: veza s Googleom, email i nadimak se brišu; anonimne partije ostaju u statistici. */
export async function anonymize(id: string) {
  await db.update(players).set({ authUserId: null, email: null, nickname: null, role: "player", country: null, city: null, device: null, referrer: null }).where(eq(players.id, id));
}

export async function profileFor(skin: Skin, playerId: string) {
  const rows = await db
    .select({ date: dailyPuzzles.date, number: dailyPuzzles.number, km: games.totalKm })
    .from(games)
    .innerJoin(dailyPuzzles, eq(dailyPuzzles.id, games.puzzleId))
    .where(and(eq(games.playerId, playerId), eq(dailyPuzzles.skinId, skin.id), eq(games.ranked, true), isNotNull(games.finishedAt)))
    .orderBy(desc(dailyPuzzles.date));
  const stats = computeStats(rows, localDate(skin.timezone));
  const history = rows.map((r) => ({ ...r, station: placeAt(skin.id, skin.config, r.km) }));
  return { stats, history };
}

