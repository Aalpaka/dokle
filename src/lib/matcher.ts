// Prepoznavanje odgovora: ćirilica, dijakritici, dj→đ, ekavica→ijekavica, strani pravopis (w, y, x, ph, sh, dvostruka slova),
// padežni nastavci, redoslijed riječi i tipfeleri (zamjena susjednih slova za 4+ slova, 1 greška po riječi za 6+ slova).
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
const ekaWords = (f: string) => f.split(" ").map(eka).join(" ");
const ENDINGS = ["ima", "ama", "om", "em", "a", "e", "i", "u", "o"];

function stem(k: string): string {
  for (const e of ENDINGS) if (k.length - e.length >= 3 && k.endsWith(e)) return k.slice(0, -e.length);
  return k;
}

// strani pravopis na hrvatski izgovor: "Mississippi" = "Misisipi", "Washington" = "Vašington", "Philadelphia" = "Filadelfia"
const ROMAN = /^[ivxlcdm]+$/;
const phonWord = (w: string) => {
  if (w.length < 4 || /\d/.test(w) || ROMAN.test(w)) return w; // kratice, brojevi i rimski brojevi ostaju kako jesu
  const p = w
    .replace(/sch|sh/g, "s")
    .replace(/ch/g, "c")
    .replace(/zh/g, "z")
    .replace(/ph/g, "f")
    .replace(/th/g, "t")
    .replace(/ck/g, "k")
    .replace(/w/g, "v")
    .replace(/q/g, "k")
    .replace(/x/g, "ks")
    .replace(/y/g, "i")
    .replace(/([a-z])\1+/g, "$1");
  return p.length < 4 ? w : p; // "SDSS" ≠ "SDS", "Eevee" ≠ "EVE"
};
const phon = (f: string) => f.split(" ").map(phonWord).join("");

// riječi abecedno: "Lisinski Vatroslav" = "Vatroslav Lisinski"
const sorted = (f: string) => f.split(" ").sort().join("");

/** Damerau-Levenshtein (zamjena susjednih slova = 1 greška); vraća max+1 čim pređe max. */
export function typoDistance(a: string, b: string, max: number): number {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev2: number[] = [];
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let best = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      let d = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d = Math.min(d, prev2[j - 2] + 1);
      cur.push(d);
      if (d < best) best = d;
    }
    if (best > max) return max + 1;
    prev2 = prev;
    prev = cur;
  }
  return prev[b.length];
}

// zamjena dvaju susjednih slova, ali ne prvog ("Hvra" = Hvar, a "Amra" ≠ Mara, "Rđava" ≠ Drava)
const isSwap = (a: string, b: string) => {
  if (a.length !== b.length || a === b || a[0] !== b[0]) return false;
  let i = 0;
  while (a[i] === b[i]) i++;
  return a[i] === b[i + 1] && a[i + 1] === b[i] && a.slice(i + 2) === b.slice(i + 2);
};

/** Je li riječ tipfeler: kraće od 4 slova samo točno, 4–5 samo zamjena susjednih (ne prvog), 6+ jedna greška. Brojeve nikad. */
const fixed = (w: string) => /\d/.test(w) || ROMAN.test(w);

function wordTypo(a: string, b: string): boolean {
  const n = Math.min(a.length, b.length);
  if (n < 4 || fixed(a) || fixed(b)) return false;
  if (n < 6) return isSwap(a, b);
  return typoDistance(a, b, 1) <= 1;
}

/** Broj riječi s tipfelerom (0 = isto), null ako nije tipfeler. Višečlani odgovori: svaka riječ za sebe,
 *  pa "Gornja Stubica" ≠ "Donja Stubica", "Michael Jordan" ≠ "Michael Norman". */
function typoScore(input: string, answer: string): number | null {
  const iw = input.split(" "), aw = answer.split(" ");
  if (iw.length === aw.length) {
    let n = 0;
    for (let w = 0; w < iw.length; w++) {
      if (iw[w] === aw[w]) continue;
      if (!wordTypo(iw[w], aw[w])) { n = -1; break; }
      n++;
    }
    if (n >= 0) return n;
  }
  // razmak viška ili manjka ("Mali Lošinj" / "Malilošinj"): cijeli niz smije imati samo jedan tipfeler
  if (iw.length === 1 && aw.length === 1) return null;
  if ([...iw, ...aw].some((w) => ROMAN.test(w))) return null; // "Luj XIV" ≠ "Luj XVI"
  return wordTypo(keyOf(input), keyOf(answer)) ? 1 : null;
}

export type MatchAnswer = { id: number; canonical: string; variants: string[] };

export type MatchIndex = {
  answers: (MatchAnswer & { keys: string[]; folded: string[] })[];
  strip: string[];
  exact: Map<string, Set<number>>;
  eka: Map<string, Set<number>>;
  phon: Map<string, Set<number>>;
  stem: Map<string, Set<number>>;
  words: Map<string, Set<number>>;
  short: Map<string, Set<number>>;
};

// riječ iz strip popisa u bilo kojem padežu ili broju: "jezero" skida i "jezera", "jezeru"
const stripWord = (w: string, strip: string[]) => strip.some((s) => s === w || (!s.includes(" ") && stem(s) === stem(w)));

/** Odgovor bez opće riječi s početka ili kraja: "Dubravsko jezero" -> "dubravsko", "Plitvička jezera" -> "plitvicka". */
function shorten(f: string, strip: string[]): string[] {
  const out: string[] = [];
  for (const s of strip) {
    if (s.includes(" ") && f.startsWith(s + " ")) out.push(f.slice(s.length + 1));
    if (s.includes(" ") && f.endsWith(" " + s)) out.push(f.slice(0, -s.length - 1));
  }
  const w = f.split(" ");
  if (w.length > 1 && stripWord(w[0], strip)) out.push(w.slice(1).join(" "));
  if (w.length > 1 && stripWord(w[w.length - 1], strip)) out.push(w.slice(0, -1).join(" "));
  return out.filter((x) => keyOf(x).length >= 3);
}

export function buildIndex(answers: MatchAnswer[], strip: string[] = []): MatchIndex {
  strip = [...new Set(strip.map(fold).filter(Boolean))];
  const idx: MatchIndex = { answers: [], strip, exact: new Map(), eka: new Map(), phon: new Map(), stem: new Map(), words: new Map(), short: new Map() };
  const add = (map: Map<string, Set<number>>, k: string, i: number) => {
    if (!map.has(k)) map.set(k, new Set());
    map.get(k)!.add(i);
  };
  const named = answers.map((a) => [a.canonical, ...a.variants].map(fold));
  const exactKeys = new Set(named.flat().map(keyOf));
  answers.forEach((a, i) => {
    // skraćeni oblici ("Dubravsko" za "Dubravsko jezero") vrijede samo točno upisani, ako nisu nečiji puni naziv i ako su jedinstveni
    const shorts = [...new Set(named[i].flatMap((f) => shorten(f, strip)))].filter((x) => !exactKeys.has(keyOf(x)) && !named[i].includes(x));
    for (const x of shorts) add(idx.short, keyOf(x), i);
    const folded = named[i];
    const keys = folded.map(keyOf);
    idx.answers.push({ ...a, keys, folded });
    for (const f of folded) if (f.includes(" ")) add(idx.words, sorted(f), i);
    for (const f of folded) add(idx.phon, phon(ekaWords(f)), i);
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
  if (w.length > 1 && stripWord(w[0], strip)) out.push(w.slice(1).join(" "));
  if (w.length > 1 && stripWord(w[w.length - 1], strip)) out.push(w.slice(0, -1).join(" "));
  return out;
}

const pick = (set?: Set<number>) => (set && set.size === 1 ? [...set][0] : null);

/** Vraća prepoznati odgovor ili null. */
export function match(idx: MatchIndex, input: string): MatchAnswer | null {
  const i = matchIndex(idx, input);
  return i === null ? null : idx.answers[i];
}

function matchIndex(idx: MatchIndex, input: string): number | null {
  const folded = candidates(input, idx.strip);
  if (!folded.length) return null;
  const cands = folded.map(keyOf);
  for (const k of cands) {
    const s = idx.exact.get(k);
    if (s) return [...s][0];
  }
  // skraćeni oblik samo za upis kakav jest: "Hudsonov tjesnac" ne smije preko "Hudsonov" u Hudsonov zaljev
  const short = pick(idx.short.get(cands[0]));
  if (short !== null) return short;
  for (const k of cands) {
    const i = pick(idx.eka.get(eka(k)));
    if (i !== null) return i;
  }
  for (const f of folded) {
    const i = f.includes(" ") ? pick(idx.words.get(sorted(f))) : null;
    if (i !== null) return i;
  }
  for (const f of folded) {
    const i = pick(idx.phon.get(phon(ekaWords(f))));
    if (i !== null) return i;
  }
  for (const k of cands) {
    const i = pick(idx.stem.get(stem(k))) ?? pick(idx.stem.get(stem(eka(k))));
    if (i !== null) return i;
  }
  return typoMatch(idx, folded);
}

// Tipfeler: najbliži odgovor pobjeđuje samo ako je jedini s najmanje grešaka (inače ne pogađamo). Za suparnike se broji
// i ono što je preblizu da bi samo prošlo: "Franka" ne ide u Branka dok postoji i Ranka.
function typoMatch(idx: MatchIndex, folded: string[]): number | null {
  let best = Infinity;
  let hit = new Set<number>();
  const near = new Set<number>();
  for (const f of folded) {
    const fe = ekaWords(f);
    const k = keyOf(f), ke = keyOf(fe);
    idx.answers.forEach((a, i) => {
      for (const af of a.folded) {
        const ae = ekaWords(af);
        if (typoDistance(k, keyOf(af), 1) <= 1 || typoDistance(ke, keyOf(ae), 1) <= 1) near.add(i);
        const d = Math.min(typoScore(f, af) ?? Infinity, typoScore(fe, ae) ?? Infinity);
        if (d === Infinity || d > best) continue;
        if (d < best) { best = d; hit = new Set(); }
        hit.add(i);
      }
    });
  }
  const i = pick(hit);
  return i !== null && [...near].every((n) => n === i) ? i : null;
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
