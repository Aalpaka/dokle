// Prepoznavanje odgovora: ćirilica, dijakritici, dj→đ, ekavica→ijekavica, padežni nastavci, 1 tipfeler za 6+ slova.
// Čista logika bez baze, koristi je server (provjera i "Šalje se:" pregled).

// srpska ćirilica u latinicu (odgovori su na latinici, a igrač u Srbiji može pisati i ćirilicom)
const CYR: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", ђ: "đ", е: "e", ж: "ž", з: "z", и: "i", ј: "j", к: "k", л: "l", љ: "lj", м: "m",
  н: "n", њ: "nj", о: "o", п: "p", р: "r", с: "s", т: "t", ћ: "ć", у: "u", ф: "f", х: "h", ц: "c", ч: "č", џ: "dž", ш: "š",
};

export function fold(s: string): string {
  return s
    .toLowerCase()
    .replace(/[\u0400-\u04ff]/g, (c) => CYR[c] ?? c)
    .replace(/[čć]/g, "c")
    .replace(/š/g, "s")
    .replace(/ž/g, "z")
    .replace(/đ/g, "d")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/dj/g, "d")
    .replace(/[^a-z0-9$ ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const keyOf = (s: string) => s.replace(/ /g, "");
const eka = (k: string) => k.replace(/ije/g, "e").replace(/([^aeiou])je/g, "$1e");
const ENDINGS = ["ima", "ama", "om", "em", "a", "e", "i", "u", "o"];

function stem(k: string): string {
  for (const e of ENDINGS) if (k.length - e.length >= 3 && k.endsWith(e)) return k.slice(0, -e.length);
  return k;
}

function lev1(a: string, b: string): boolean {
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0, j = 0, diff = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) { i++; j++; continue; }
    if (++diff > 1) return false;
    if (a.length > b.length) i++;
    else if (b.length > a.length) j++;
    else { i++; j++; }
  }
  return diff + (a.length - i) + (b.length - j) <= 1;
}

export type MatchAnswer = { id: number; canonical: string; variants: string[] };

export type MatchIndex = {
  answers: (MatchAnswer & { keys: string[] })[];
  strip: string[];
  exact: Map<string, Set<number>>;
  eka: Map<string, Set<number>>;
  stem: Map<string, Set<number>>;
};

export function buildIndex(answers: MatchAnswer[], strip: string[] = []): MatchIndex {
  const idx: MatchIndex = { answers: [], strip, exact: new Map(), eka: new Map(), stem: new Map() };
  const add = (map: Map<string, Set<number>>, k: string, i: number) => {
    if (!map.has(k)) map.set(k, new Set());
    map.get(k)!.add(i);
  };
  answers.forEach((a, i) => {
    const keys = [a.canonical, ...a.variants].map((v) => keyOf(fold(v)));
    idx.answers.push({ ...a, keys });
    for (const k of keys) {
      add(idx.exact, k, i);
      add(idx.eka, eka(k), i);
      add(idx.stem, stem(k), i);
      add(idx.stem, stem(eka(k)), i);
    }
  });
  return idx;
}

function candidates(input: string, strip: string[]): string[] {
  const f = fold(input);
  if (!f) return [];
  const out = [f];
  const w = f.split(" ");
  if (w.length > 1 && strip.includes(w[0])) out.push(w.slice(1).join(" "));
  if (w.length > 1 && strip.includes(w[w.length - 1])) out.push(w.slice(0, -1).join(" "));
  return out.map(keyOf);
}

const pick = (set?: Set<number>) => (set && set.size === 1 ? [...set][0] : null);

/** Vraća prepoznati odgovor ili null. */
export function match(idx: MatchIndex, input: string): MatchAnswer | null {
  const i = matchIndex(idx, input);
  return i === null ? null : idx.answers[i];
}

function matchIndex(idx: MatchIndex, input: string): number | null {
  const cands = candidates(input, idx.strip);
  if (!cands.length) return null;
  for (const k of cands) {
    const s = idx.exact.get(k);
    if (s) return [...s][0];
  }
  for (const k of cands) {
    const i = pick(idx.eka.get(eka(k)));
    if (i !== null) return i;
  }
  for (const k of cands) {
    const i = pick(idx.stem.get(stem(k))) ?? pick(idx.stem.get(stem(eka(k))));
    if (i !== null) return i;
  }
  for (const k of cands) {
    if (k.length < 6) continue;
    const hit = new Set<number>();
    idx.answers.forEach((a, i) => {
      if (a.keys.some((ak) => lev1(k, ak) || lev1(eka(k), eka(ak)))) hit.add(i);
    });
    const i = pick(hit);
    if (i !== null) return i;
  }
  return null;
}

/** Kanonski oblik s velikim prvim slovom ("krk" -> "Krk"); ostatak ostaje kako je upisan. */
export function capitalize(s: string): string {
  const t = s.trim();
  return t.charAt(0).toLocaleUpperCase("hr") + t.slice(1);
}

/** "Krk=22;Lošinj/Mali Lošinj=3;Silba=0.05!" -> [{canonical, variants, share, rare}]; "!" iza udjela = najrjeđi (helikopter) */
export function parseSeedAnswers(d: string) {
  return d.split(";").map((e) => {
    const [names, share = ""] = e.split("=");
    const [canonical, ...variants] = names.split("/").map((s) => s.trim());
    return { canonical, variants, share: parseFloat(share), rare: share.trim().endsWith("!") };
  });
}
