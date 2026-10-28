"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/client";
import { googleClientId, googleIdentity } from "@/lib/google";
import { raceTags } from "@/lib/league";
import type { PlayerStats } from "@/lib/stats";
import { codeConfigs } from "@/skins/maps";
import { SkinPicker } from "./SkinPicker";
import { skinFetch, useSkin, useT } from "./skin";

export type Me = {
  authEnabled: boolean;
  user: { nickname: string | null; email: string | null; isAdmin: boolean } | null;
  stats: PlayerStats | null;
  history: { date: string; number: number; km: number; station: string }[];
};

export function useMe(reloadKey: unknown = 0) {
  const [me, setMe] = useState<Me | null>(null);
  useEffect(() => {
    skinFetch("/api/me", { cache: "no-store" })
      .then((r) => r.json())
      .then(setMe, () => {});
  }, [reloadKey]);
  return me;
}

export function signInWithGoogle(next = window.location.pathname) {
  const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;
  return supabaseBrowser().auth.signInWithOAuth({ provider: "google", options: { redirectTo } });
}

export async function signOut(home = "/") {
  await fetch("/api/auth/logout", { method: "POST" });
  window.location.href = home;
}

/**
 * Prijava. S NEXT_PUBLIC_GOOGLE_CLIENT_ID je to Googleov gumb na našoj stranici (Google piše ime aplikacije);
 * bez njega, ili ako se Googleova skripta ne učita, stari gumb koji vodi preko Supabaseove adrese.
 */
export function GoogleButton({ label, className, compact }: { label?: string; className?: string; compact?: boolean }) {
  const { htmlLang } = useSkin();
  const ref = useRef<HTMLDivElement>(null);
  const [fallback, setFallback] = useState(!googleClientId);
  useEffect(() => {
    if (!googleClientId) return;
    let live = true;
    googleIdentity().then(
      (gsi) => {
        if (live && ref.current)
          gsi.renderButton(
            ref.current,
            // na mobitelu u zaglavlju nema mjesta za tekst: samo okrugli G (Googleov gumb ne zna se suziti sam)
            compact && window.matchMedia("(max-width: 520px)").matches
              ? { type: "icon", theme: "filled_black", shape: "circle", locale: htmlLang, size: "large" }
              : {
                  theme: "filled_black",
                  shape: "pill",
                  locale: htmlLang,
                  size: compact ? "medium" : "large",
                  text: compact ? "signin" : "signin_with",
                },
          );
      },
      () => live && setFallback(true),
    );
    return () => {
      live = false;
    };
  }, [compact, htmlLang]);
  if (!fallback) return <div ref={ref} className="gsi-btn" />;
  return <RedirectButton label={label} className={className} />;
}

function RedirectButton({ label, className }: { label?: string; className?: string }) {
  const [busy, setBusy] = useState(false);
  const t = useT();
  return (
    <button
      className={className}
      disabled={busy}
      onClick={() => {
        setBusy(true);
        signInWithGoogle().then(({ error }) => error && setBusy(false));
      }}
    >
      {label ?? t("Prijavi se s Googleom")}
    </button>
  );
}

/**
 * Desni kut zaglavlja: za prijavljene (admin), lige i nadimak (link na profil), inače gumb za prijavu.
 * Na mobitelu su to samo ikone, a profil je kružić s prvim slovom nadimka.
 */
export function AccountLink({ me }: { me: Me | null }) {
  const path = usePathname();
  const { href, base } = useSkin();
  const t = useT();
  if (!me?.authEnabled) return null;
  const at = (p: string) => path === href(p) || path.startsWith(base + p + "/");
  if (me.user) {
    const nick = me.user.nickname ?? t("Profil");
    return (
      <nav className="acct-nav" aria-label="Račun">
        {me.user.isAdmin && (
          <a className="acct adm" href="/admin" aria-current={path.startsWith("/admin") ? "page" : undefined} title="Admin">
            <span>⚙️</span><span className="wide">Admin</span>
          </a>
        )}
        <a className="acct" href={href("/lige")} aria-current={at("/lige") || path.startsWith(base + "/liga/") ? "page" : undefined} title={t("Lige")}>
          <span>🏆</span><span className="wide">{t("Lige")}</span>
        </a>
        <a className="acct me" href={href("/profil")} aria-current={at("/profil") ? "page" : undefined}>
          <span className="av" aria-hidden="true">{raceTags([nick])[0]}</span>
          <span className="nm">{nick}</span>
          {me.stats && me.stats.currentStreak > 0 && <span className="wide">· 🔥 {me.stats.currentStreak}</span>}
        </a>
      </nav>
    );
  }
  return <GoogleButton label={t("Prijava")} className="ghost small-btn" compact />;
}

/** Okvir za stranice izvan igre (profil, lige): isto zaglavlje i ista širina kao glavna stranica. */
export function PageShell({ me, children }: { me: Me | null; children: React.ReactNode }) {
  const { id, href } = useSkin();
  return (
    <div className="wrap">
      <header className="top">
        <a href={href("/")} className="plate" style={{ textDecoration: "none" }}>{codeConfigs[id].title}</a>
        <div className="spacer" />
        <SkinPicker />
        <AccountLink me={me} />
      </header>
      {children}
    </div>
  );
}
