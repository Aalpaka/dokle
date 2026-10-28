import "server-only";
import { randomBytes } from "node:crypto";
import { eq, inArray } from "drizzle-orm";
import { db } from "@/db";
import { playerAvatars } from "@/db/schema";
import { AVATAR_KEY_RE, MAX_AVATAR_BYTES, avatarUrl, sniffImage } from "@/lib/avatar";

/** Sprema novu sliku igrača pod novim ključem (stari URL prestaje vrijediti); null ako slika nije dopuštena. */
export async function setAvatar(playerId: string, data: Buffer): Promise<string | null> {
  const mime = sniffImage(data);
  if (!mime || data.length > MAX_AVATAR_BYTES) return null;
  const key = randomBytes(16).toString("base64url");
  await db
    .insert(playerAvatars)
    .values({ playerId, key, mime, data })
    .onConflictDoUpdate({ target: playerAvatars.playerId, set: { key, mime, data, updatedAt: new Date() } });
  return avatarUrl(key);
}

export async function deleteAvatar(playerId: string) {
  await db.delete(playerAvatars).where(eq(playerAvatars.playerId, playerId));
}

export async function avatarByKey(key: string) {
  if (!AVATAR_KEY_RE.test(key)) return null;
  const [a] = await db.select({ mime: playerAvatars.mime, data: playerAvatars.data }).from(playerAvatars).where(eq(playerAvatars.key, key));
  return a ?? null;
}

/** URL slike za svakog igrača koji je ima (bez samih bajtova). */
export async function avatarUrls(playerIds: string[]): Promise<Map<string, string>> {
  if (!playerIds.length) return new Map();
  const rows = await db
    .select({ playerId: playerAvatars.playerId, key: playerAvatars.key })
    .from(playerAvatars)
    .where(inArray(playerAvatars.playerId, playerIds));
  return new Map(rows.map((r) => [r.playerId, avatarUrl(r.key)]));
}
