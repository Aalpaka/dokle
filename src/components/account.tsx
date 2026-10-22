"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
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

/** Desni kut zaglavlja: za prijavljene (admin), lige i nadimak (link na profil), inače gumb za prijavu. */
export function AccountLink({ me }: { me: Me | null }) {
  const path = usePathname();
  if (!me?.authEnabled) return null;
  if (me.user)
    return (
      <nav className="acct-nav" aria-label="Račun">
        {me.user.isAdmin && (
          <a className="acct" href="/admin" aria-current={path.startsWith("/admin") ? "page" : undefined} title="Admin">
            <span>⚙️</span><span className="wide">Admin</span>
          </a>
        )}
        <a className="acct" href="/lige" aria-current={path.startsWith("/lig") ? "page" : undefined} title="Lige">
          <span>🏆</span><span className="wide">Lige</span>
        </a>
        <a className="acct" href="/profil" aria-current={path === "/profil" ? "page" : undefined}>
          <span className="nm">{me.user.nickname ?? "Profil"}</span>
          {me.stats && me.stats.currentStreak > 0 && <span className="wide">· 🔥 {me.stats.currentStreak}</span>}
        </a>
      </nav>
    );
  return <GoogleButton label="Prijava" className="ghost small-btn" />;
}

/** Okvir za stranice izvan igre (profil, lige): isto zaglavlje i ista širina kao glavna stranica. */
export function PageShell({ me, children }: { me: Me | null; children: React.ReactNode }) {
  return (
    <div className="wrap">
      <header className="top">
        <a href="/" className="plate" style={{ textDecoration: "none" }}>Dokle?</a>
        <div className="spacer" />
        <AccountLink me={me} />
      </header>
      {children}
    </div>
  );
}
