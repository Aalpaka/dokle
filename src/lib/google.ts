"use client";
import { supabaseBrowser } from "@/lib/supabase/client";

// Google Identity Services: Googleov gumb na našoj stranici, pa ID token ide u Supabase (signInWithIdToken).
// Tako Google piše ime aplikacije umjesto <projekt>.supabase.co. Client ID mora biti isti kao u Supabaseu
// (Auth > Providers > Google), inače Supabase odbije token, a postojeći računi se ne bi prepoznali.
export const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";

type CredentialResponse = { credential: string };
export type GsiButtonOptions = {
  type?: "standard" | "icon";
  theme?: "outline" | "filled_blue" | "filled_black";
  size?: "large" | "medium" | "small";
  text?: "signin_with" | "signup_with" | "continue_with" | "signin";
  shape?: "rectangular" | "pill" | "circle" | "square";
  locale?: string;
};
type Gsi = {
  initialize(cfg: {
    client_id: string;
    callback: (r: CredentialResponse) => void;
    nonce: string;
    ux_mode: "popup";
    use_fedcm_for_button?: boolean;
  }): void;
  renderButton(el: HTMLElement, opts: GsiButtonOptions): void;
};
declare global {
  interface Window {
    google?: { accounts: { id: Gsi } };
  }
}

let ready: Promise<Gsi> | null = null;

function loadScript(): Promise<Gsi> {
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://accounts.google.com/gsi/client";
    s.async = true;
    s.onload = () => (window.google ? resolve(window.google.accounts.id) : reject(new Error("gsi")));
    s.onerror = () => reject(new Error("gsi"));
    document.head.appendChild(s);
  });
}

async function sha256Hex(text: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
}

/** Jednom po stranici: učita Googleovu skriptu i postavi nonce (Google dobiva hash, Supabase sirovu vrijednost). */
export function googleIdentity(): Promise<Gsi> {
  ready ??= (async () => {
    const nonce = crypto.randomUUID();
    const [gsi, hashed] = await Promise.all([loadScript(), sha256Hex(nonce)]);
    gsi.initialize({
      client_id: googleClientId,
      nonce: hashed,
      ux_mode: "popup",
      use_fedcm_for_button: true,
      callback: async ({ credential }) => {
        const { error } = await supabaseBrowser().auth.signInWithIdToken({ provider: "google", token: credential, nonce });
        if (error) return window.alert("Prijava nije uspjela. Pokušaj ponovno.");
        // /api/me veže Google račun uz igrača iz kolačića (kao prije /auth/callback), pa svježa stranica.
        await fetch("/api/me", { cache: "no-store" }).catch(() => {});
        window.location.reload();
      },
    });
    return gsi;
  })();
  ready.catch(() => (ready = null));
  return ready;
}
