// Tekstovi sučelja pišu se na hrvatskom; za BiH i Srbiju ovdje su prijevodi istih rečenica.
// Ključ je hrvatski tekst, pa što nije prevedeno ostaje hrvatski. {x} u tekstu zamjenjuje se vrijednošću.
import type { Locale } from "@/skins/meta";
import { bs } from "./bs";
import { sr } from "./sr";

const dicts: Record<Locale, Record<string, string>> = { hr: {}, bs, sr };

export function translate(locale: Locale, hr: string, vars?: Record<string, string | number>): string {
  const text = dicts[locale][hr] ?? hr;
  return vars ? text.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m)) : text;
}

/** Svi ključevi rječnika, za test da su prijevodi potpuni. */
export const dictionaries = dicts;
