import "server-only";
import { cookies } from "next/headers";
import { currentAuthUser, type AuthUser } from "@/lib/supabase/server";
import { getPlayer, linkAccount } from "./accounts";

const COOKIE = "dokle_pid";
const COOKIE_OPTS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * 365,
};

export type Identity = { playerId: string | null; user: AuthUser | null };

/**
 * Tko igra: prijavljeni korisnik (njegov igrač, uz spajanje anonimnih partija) ili anonimni igrač iz kolačića.
 * Kolačić igrača koji ima račun vrijedi samo uz važeću sesiju; nakon odjave igra se kao novi anonimni igrač.
 * create=true stvara anonimnog igrača ako ga nema.
 */
export async function resolveIdentity(create = false): Promise<Identity> {
  const store = await cookies();
  const raw = store.get(COOKIE)?.value;
  let pid = raw && /^[0-9a-f-]{36}$/.test(raw) ? raw : null;
  const hasSession = store.getAll().some((c) => c.name.startsWith("sb-"));
  const user = hasSession ? await currentAuthUser() : null;

  if (user) {
    const player = pid ? await getPlayer(pid) : null;
    const id = player?.authUserId === user.id ? player.id : await linkAccount(pid, user.id, user.email);
    if (id !== pid) store.set(COOKIE, id, COOKIE_OPTS);
    return { playerId: id, user };
  }
  if (pid) {
    const player = await getPlayer(pid);
    if (player?.authUserId) pid = null;
  }
  if (!pid && create) {
    pid = crypto.randomUUID();
    store.set(COOKIE, pid, COOKIE_OPTS);
  }
  return { playerId: pid, user: null };
}

export async function clearPlayerCookie() {
  (await cookies()).delete(COOKIE);
}
