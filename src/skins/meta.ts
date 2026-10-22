// Popis skinova za klijent i server: adresa, jezik sučelja i oznaka u izborniku.
// Hrvatska je na korijenu stranice i uvijek je zadana; ostale zemlje imaju svoj prefiks.
export type SkinId = "hr" | "ba" | "rs";
export type Locale = "hr" | "bs" | "sr";

export type SkinMeta = { id: SkinId; locale: Locale; htmlLang: string; base: string; flag: string; name: string; short: string };

export const SKIN_META: Record<SkinId, SkinMeta> = {
  hr: { id: "hr", locale: "hr", htmlLang: "hr", base: "", flag: "🇭🇷", name: "Hrvatska", short: "HR" },
  ba: { id: "ba", locale: "bs", htmlLang: "bs", base: "/ba", flag: "🇧🇦", name: "Bosna i Hercegovina", short: "BiH" },
  rs: { id: "rs", locale: "sr", htmlLang: "sr-Latn", base: "/rs", flag: "🇷🇸", name: "Srbija", short: "SRB" },
};

export const SKIN_IDS = Object.keys(SKIN_META) as SkinId[];
// skinovi s vlastitim prefiksom adrese (/ba, /rs)
export const PREFIXED = SKIN_IDS.filter((id) => SKIN_META[id].base);

export function isSkinId(v: unknown): v is SkinId {
  return typeof v === "string" && v in SKIN_META;
}

/** Ista stranica u drugom skinu: /ba/lige -> /rs/lige; liga s kodom ne postoji u drugoj zemlji, pa vodi na popis liga. */
export function switchPath(path: string, to: SkinId): string {
  let rest = path;
  for (const id of PREFIXED) {
    const b = SKIN_META[id].base;
    if (rest === b || rest.startsWith(b + "/")) rest = rest.slice(b.length) || "/";
  }
  if (rest.startsWith("/liga/")) rest = "/lige";
  if (!["/", "/lige", "/profil"].includes(rest)) rest = "/";
  const base = SKIN_META[to].base;
  return rest === "/" ? base || "/" : base + rest;
}
