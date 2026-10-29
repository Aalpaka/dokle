// Zajedničko za skinove izvan Hrvatske (BiH, Srbija): obična prijevozna sredstva bez lokalnih memeova,
// iste km kao u Hrvatskoj, i kategorije bez onih koje su vezane uz Hrvatsku.
import { fold, parseSeedAnswers } from "../lib/matcher";
import type { SeedCategory } from "./hr/categories";
import { withSpojeni } from "./spojeni";
import { hrConfig } from "./hr/config";
import type { SkinConfig, Tier } from "./types";

/** Tierovi Hrvatske s generičkim imenima; bez sličica, pa se na karti crta ikona vozila. */
export function plainTiers(names: string[]): Tier[] {
  return hrConfig.tiers.map((t, i) => ({ minShare: t.minShare, km: t.km, emoji: t.emoji, name: names[i], vehicle: t.vehicle, color: t.color, ...(t.rare ? { rare: true } : {}) }));
}

/** Isti raspored kao Hrvatska, s domaćom grupom države umjesto "hr"; kategorije dana prate hrvatske (mirror). */
export function regionalBase(home: string) {
  return {
    secondsPerCategory: hrConfig.secondsPerCategory,
    dailyPattern: hrConfig.dailyPattern.map((g) => (g === "hr" ? home : g)),
    mirror: "hr",
    maxKm: hrConfig.maxKm,
    priorWeight: hrConfig.priorWeight,
  } satisfies Partial<SkinConfig>;
}

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
  "glavni-isto-slovo": (l) => `Po ${l}m nazivima, i kad se grad zove isto kao država; Š i S nisu isto slovo`,
  "oscar-film": () => "Bilo koja godina od 1929. do 2026.; naš ili izvorni naslov",
};

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// hrvatski sportaši za "svjetski sportaš" izvan Hrvatske (bez nogometa i tenisa)
export const svijetSport = `Janica Kostelić=1.5; Blanka Vlašić=1; Ivica Kostelić=1; Dražen Petrović=1; Sandra Perković=0.8;
  Mirko Filipović/Cro Cop=0.8; Toni Kukoč=0.5; Ivano Balić=0.5; Dino Rađa=0.3; Mate Parlov=0.3; Martin Sinković=0.3;
  Valent Sinković=0.3; Sara Kolak=0.3; Filip Hrgović=0.3; Matea Jelić=0.3; Domagoj Duvnjak=0.3; Duje Draganja=0.2;
  Damir Martin=0.2; Giovanni Cernogoraz=0.1`;

/**
 * Verzija hrvatske "izvan Hrvatske" kategorije za drugu državu: isti slug, iz popisa se miču domaći odgovori
 * (remove, po kanonskom imenu iz te ili iz addFrom kategorije, ili samo varijanta), a dodaju hrvatski iz domaće
 * hrvatske kategorije (addFrom) s upola manjim udjelom.
 */
export type Abroad = { title: string; hint?: string; remove?: string[]; addFrom?: string; add?: string };

/** Sadržaj države: domaće kategorije (isti slugovi kao hrvatska grupa), "izvan" verzije i zamjene ostalih hrvatskih. */
export type Country = { lang: string; domestic: SeedCategory[]; abroad: Record<string, Abroad>; replace: SeedCategory[] };

/** Dodaje domaće odgovore iz addFrom kategorija (npr. političari iz BiH među hrvatskim političarima) u remove "izvan" verzija. */
export function withRemoved(abroad: Record<string, Abroad>, extra: Record<string, string[]>): Record<string, Abroad> {
  for (const slug of Object.keys(extra)) if (!abroad[slug]) throw new Error(`Nema "izvan" verzije ${slug}`);
  return Object.fromEntries(Object.entries(abroad).map(([slug, a]) => [slug, extra[slug] ? { ...a, remove: [...(a.remove ?? []), ...extra[slug]] } : a]));
}

/** Dodatni odgovori (dodaci.ts) na kraj popisa kategorija. */
export function withDodaci(cats: SeedCategory[], dodaci: Record<string, string>): SeedCategory[] {
  return cats.map((c) => (dodaci[c.slug] ? { ...c, answers: `${c.answers};${dodaci[c.slug]}` } : c));
}

/** Kategorije za skin izvan Hrvatske: zajedničke, "izvan" verzije, zamjene i domaće; `lang` je pridjev jezika za upute. */
export function regionalCategories(all: SeedCategory[], country: Country): SeedCategory[] {
  const shared = all
    .filter((c) => c.group !== "hr" && !HR_SPECIFIC.has(c.slug))
    .map((c) => (HINTS[c.slug] ? { ...c, hint: HINTS[c.slug](country.lang) } : c));
  const abroad = Object.entries(country.abroad).map(([slug, a]) => abroadVersion(all, slug, a));
  // domaće zamjene mogu imati svoje duplikate (Isa-beg Ishaković / Isaković)
  return [...shared, ...abroad, ...country.replace, ...country.domestic].map(withSpojeni);
}

export function abroadVersion(all: SeedCategory[], slug: string, a: Abroad): SeedCategory {
  const base = all.find((c) => c.slug === slug);
  if (!base) throw new Error(`Nema kategorije ${slug}`);
  const list = parseSeedAnswers(base.answers);
  const from = a.addFrom ? parseSeedAnswers(all.find((c) => c.slug === a.addFrom)!.answers) : [];
  // remove vrijedi i za addFrom: domaći odgovor (npr. ćevapi u hrvatskim jelima) inače bi se vratio iz hrvatske kategorije
  const removed = new Set<string>();
  for (const r of a.remove ?? []) {
    const i = list.findIndex((x) => x.canonical === r);
    const f = from.find((x) => x.canonical === r);
    // samo varijanta ("Gibanica" uz Međimursku gibanicu): odgovor ostaje pod punim imenom
    if (i < 0 && !f && [...list, ...from].some((x) => x.variants.includes(r))) {
      removed.add(fold(r));
      continue;
    }
    if (i < 0 && !f) throw new Error(`${slug}: nema odgovora ${r}`);
    for (const x of [...(i >= 0 ? list.splice(i, 1) : []), ...(f ? [f] : [])]) [x.canonical, ...x.variants].forEach((n) => removed.add(fold(n)));
  }
  // ni varijanta stranog odgovora ne vrijedi za maknuti domaći ("Ćufte" uz Köfte)
  for (const x of list) x.variants = x.variants.filter((v) => !removed.has(fold(v)));
  const seen = new Set(list.flatMap((x) => [x.canonical, ...x.variants].map(fold)));
  const extra = [
    ...from.map((x) => ({ ...x, share: x.share / 2, rare: false })),
    ...(a.add ? parseSeedAnswers(a.add) : []),
  ];
  for (const x of extra) {
    if (seen.has(fold(x.canonical)) || removed.has(fold(x.canonical))) continue;
    // kratko ime koje već ima drugi odgovor ("Bogdanović" za Bogdana) ili maknuti domaći ("Ivanović" za Branislava) ne prenosi se,
    // a hrvatski odgovor (Bojan Bogdanović, Franjo Ivanović) ostaje pod punim imenom
    const variants = x.variants.filter((v) => !seen.has(fold(v)) && !removed.has(fold(v)));
    [x.canonical, ...variants].forEach((n) => seen.add(fold(n)));
    list.push({ ...x, variants });
  }
  const answers = list.map((x) => `${[x.canonical, ...x.variants].join("/")}=${x.share}${x.rare ? "!" : ""}`).join(";");
  return { ...base, title: a.title, hint: a.hint ?? base.hint, answers };
}
