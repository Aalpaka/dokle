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
 * Prijavljeni korisnik ili null; provjera ide preko Supabasea, ne vjeruje kolačiću naslijepo.
 * Email samo ako je potvrđen (Google ga uvijek potvrdi), da nepotvrđena adresa ne otvori /admin.
 */
export async function currentAuthUser(): Promise<AuthUser | null> {
  if (!authEnabled) return null;
  const { data } = await (await supabaseServer()).auth.getUser();
  if (!data.user) return null;
  return { id: data.user.id, email: data.user.email_confirmed_at ? (data.user.email ?? null) : null };
}

/** Briše korisnika iz Supabase Autha (email ostaje samo ako service_role ključ nije postavljen). */
export async function deleteAuthUser(id: string) {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!authEnabled || !key) return;
  const admin = createClient(supabaseUrl, key, { auth: { persistSession: false } });
  await admin.auth.admin.deleteUser(id);
}
