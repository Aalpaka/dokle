import "server-only";

export type Origin = { country: string | null; city: string | null; device: string | null; referrer: string | null };

/** Odakle igrač igra: država i grad iz Vercelovih geo zaglavlja (procjena iz IP-a, sam IP se ne sprema),
 *  vrsta uređaja iz user-agenta i domena stranice s koje je došao (document.referrer, šalje ga klijent). */
export function requestOrigin(h: Headers, ref?: unknown): Origin {
  const city = h.get("x-vercel-ip-city");
  return {
    country: h.get("x-vercel-ip-country")?.slice(0, 2).toUpperCase() || null,
    city: city ? safeDecode(city).slice(0, 80) : null,
    device: deviceOf(h.get("user-agent") ?? ""),
    referrer: referrerHost(ref, h.get("host")),
  };
}

function safeDecode(s: string) {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

export function deviceOf(ua: string): string | null {
  if (!ua) return null;
  if (/bot|crawl|spider|preview/i.test(ua)) return "bot";
  if (/iPad|Tablet|Android(?!.*Mobile)/i.test(ua)) return "tablet";
  if (/Mobi|iPhone|Android/i.test(ua)) return "mobitel";
  return "računalo";
}

/** Samo domena (bez putanje i parametara), i to tuđa: naša vlastita stranica nije izvor. */
export function referrerHost(ref: unknown, ownHost: string | null): string | null {
  if (typeof ref !== "string" || !ref) return null;
  try {
    const host = new URL(ref).hostname.replace(/^www\./, "").toLowerCase();
    const own = (ownHost ?? "").split(":")[0].replace(/^www\./, "").toLowerCase();
    if (!host || host === own) return null;
    // Googleove zemaljske domene (google.hr, google.ba...) i aplikacije koje šalju android-app://
    return host.startsWith("google.") ? "google" : host.slice(0, 80);
  } catch {
    return null;
  }
}
