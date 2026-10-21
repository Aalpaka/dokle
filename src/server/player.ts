import "server-only";
import { cookies } from "next/headers";

const COOKIE = "dokle_pid";

/** Id anonimnog igrača iz kolačića (null ako još nije igrao). */
export async function readPlayerId(): Promise<string | null> {
  const v = (await cookies()).get(COOKIE)?.value;
  return v && /^[0-9a-f-]{36}$/.test(v) ? v : null;
}

/** Id igrača; ako ga nema, stvara novi i postavlja kolačić na godinu dana. */
export async function playerIdOrCreate(): Promise<string> {
  const existing = await readPlayerId();
  if (existing) return existing;
  const id = crypto.randomUUID();
  (await cookies()).set(COOKIE, id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  return id;
}
