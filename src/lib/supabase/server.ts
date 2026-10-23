import "server-only";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { authEnabled, supabaseAnonKey, supabaseUrl } from "./config";

/** Supabase klijent za route handlere; čita i osvježava sesiju u kolačićima. */
export async function supabaseServer() {
  const store = await cookies();
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list) => {
        for (const { name, value, options } of list) store.set(name, value, options);
      },
    },
  });
}

export type AuthUser = { id: string; email: string | null };

/**
 * Prijavljeni korisnik ili null; ne vjeruje kolačiću naslijepo. Obično se potpis tokena provjerava lokalno
 * (getClaims, javni ključ projekta se pamti), bez poziva Supabaseu za svaki zahtjev; email je tada samo za prikaz.
 * strict=true pita Supabase Auth (admin, spajanje računa): vidi i sesiju odjavljenu na drugom uređaju, a email
 * vraća samo ako je potvrđen (Google ga uvijek potvrdi), da nepotvrđena adresa ne otvori /admin.
 */
export async function currentAuthUser(strict = false): Promise<AuthUser | null> {
  if (!authEnabled) return null;
  const auth = (await supabaseServer()).auth;
  if (strict) {
    const { data } = await auth.getUser();
    if (!data.user) return null;
    return { id: data.user.id, email: data.user.email_confirmed_at ? (data.user.email ?? null) : null };
  }
  const { data } = await auth.getClaims();
  const c = data?.claims;
  return c?.sub ? { id: c.sub, email: typeof c.email === "string" && c.email ? c.email : null } : null;
}

/** Briše korisnika iz Supabase Autha (email ostaje samo ako service_role ključ nije postavljen). */
export async function deleteAuthUser(id: string) {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!authEnabled || !key) return;
  const admin = createClient(supabaseUrl, key, { auth: { persistSession: false } });
  await admin.auth.admin.deleteUser(id);
}
