"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";
import type { PlayerStats } from "@/lib/stats";

export type Me = {
  authEnabled: boolean;
  user: { nickname: string | null; email: string | null; isAdmin: boolean } | null;
  stats: PlayerStats | null;
  history: { date: string; number: number; km: number; station: string }[];
};

export function useMe(reloadKey: unknown = 0) {
  const [me, setMe] = useState<Me | null>(null);
  useEffect(() => {
    fetch("/api/me", { cache: "no-store" })
      .then((r) => r.json())
      .then(setMe, () => {});
  }, [reloadKey]);
  return me;
}

export function signInWithGoogle(next = window.location.pathname) {
  const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;
  return supabaseBrowser().auth.signInWithOAuth({ provider: "google", options: { redirectTo } });
}

export async function signOut() {
  await fetch("/api/auth/logout", { method: "POST" });
  window.location.href = "/";
}

export function GoogleButton({ label = "Prijavi se s Googleom", className }: { label?: string; className?: string }) {
  const [busy, setBusy] = useState(false);
  return (
    <button
      className={className}
      disabled={busy}
      onClick={() => {
        setBusy(true);
        signInWithGoogle().then(({ error }) => error && setBusy(false));
      }}
    >
      {label}
    </button>
  );
}

/** Desni kut zaglavlja: nadimak s linkom na profil ili gumb za prijavu. */
export function AccountLink({ me }: { me: Me | null }) {
  if (!me?.authEnabled) return null;
  if (me.user)
    return (
      <a className="acct" href="/profil">
        {me.user.nickname ?? "Profil"}
        {me.stats && me.stats.currentStreak > 0 && <span> · 🔥 {me.stats.currentStreak}</span>}
      </a>
    );
  return <GoogleButton label="Prijava" className="ghost small-btn" />;
}
