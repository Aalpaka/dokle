// Zajedničko za skinove izvan Hrvatske (BiH, Srbija): obična prijevozna sredstva bez lokalnih memeova,
// iste km kao u Hrvatskoj, i kategorije bez onih koje su vezane uz Hrvatsku.
import type { SeedCategory } from "./hr/categories";
import { hrConfig } from "./hr/config";
import type { SkinConfig, Tier } from "./types";

/** Tierovi Hrvatske s generičkim imenima; bez sličica, pa se na karti crta ikona vozila. */
export function plainTiers(names: string[]): Tier[] {
  return hrConfig.tiers.map((t, i) => ({ minShare: t.minShare, km: t.km, emoji: t.emoji, name: names[i], vehicle: t.vehicle, color: t.color, ...(t.rare ? { rare: true } : {}) }));
}

// 3 + 3 + 2, nikad ista grupa zaredom (grupa "Hrvatska" ne postoji)
export const regionalPattern = ["opce", "kviz", "zaigrano", "opce", "kviz", "opce", "zaigrano", "kviz"];

export const regionalBase = {
  secondsPerCategory: hrConfig.secondsPerCategory,
  dailyPattern: regionalPattern,
  maxKm: hrConfig.maxKm,
  priorWeight: hrConfig.priorWeight,
} satisfies Partial<SkinConfig>;

// Kategorije iz općih grupa koje su vezane uz Hrvatsku: naslov ih definira kao "izvan Hrvatske"
// (pa bi igraču iz BiH ili Srbije hrvatski odgovori bili odbijeni), ili su o Hrvatskoj ili hrvatskom jeziku.
export const HR_SPECIFIC = new Set([
  // Općenito: "izvan Hrvatske" / "nije iz Hrvatske"
  "svjetska-planina", "strani-klub", "otok-svijet", "nogometas", "svjetsko-jelo", "svjetska-znamenitost", "jezero-svijet",
  "kosarkas-svijet", "sportas-svijet", "politicar-svijet", "strani-pisac", "strani-znanstvenik",
  // Kviz
  "hr-vladar", "hr-olimpijac", "jadran-grad",
  // Zaigrano
  "dijalekt", "exyu-izvodjac", "strani-film",
]);

// upute koje spominju hrvatski jezik ili naziv
const HINTS: Record<string, (lang: string) => string> = {
  "drzava-samoglasnik": (l) => `A, E, I, O ili U, ${l} naziv`,
  "drzava-b-m": (l) => `${cap(l)} naziv`,
  "drzava-s": (l) => `${cap(l)} naziv`,
  turcizam: () => "Turcizam u našem jeziku, i ako je u turski došao iz arapskog ili perzijskog",
  germanizam: () => "Germanizam u našem jeziku, i u svakodnevnom govoru",
  kost: () => "Naš ili latinski naziv; vrijede i skupine kostiju (npr. kosti zapešća)",
  zvijezda: () => "Naš ili latinski naziv; planeti ne vrijede",
  "oscar-film": () => "Bilo koja godina, od Krila (1929.) do Anore (2025.); naš ili izvorni naslov",
};

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Kategorije za skin izvan Hrvatske; `lang` je pridjev jezika za upute ("bosanski", "srpski"). */
export function regionalCategories(all: SeedCategory[], lang: string): SeedCategory[] {
  return all
    .filter((c) => c.group !== "hr" && !HR_SPECIFIC.has(c.slug))
    .map((c) => (HINTS[c.slug] ? { ...c, hint: HINTS[c.slug](lang) } : c));
}
