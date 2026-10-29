// Ista osoba ili stvar upisana dvaput pod različitim pravopisom ("Anna Kurnikova" i "Ana Kurnjikova"). Dva odgovora dijele
// statistiku i zbunjuju tipfelere (dva bliska odgovora, pa se ne pogađa), pa se spajaju: drugi naziv postaje varijanta prvoga.
// Migracija 0025 to isto radi u bazi (runde i pokušaji prelaze na zadržani odgovor). Ključ je slug, pa vrijedi u svim skinovima.
import { fold, parseSeedAnswers } from "../lib/matcher";
import type { SeedCategory } from "./hr/categories";

/** slug -> { naziv koji nestaje: naziv koji ostaje } */
export const spojeni: Record<string, Record<string, string>> = {
  tenis: {
    "Ana Kurnjikova": "Anna Kurnikova",
    "Arina Sabaljenka": "Aryna Sabalenka",
    "Jekaterina Makarova": "Ekaterina Makarova",
    "Jelena Ribakina": "Elena Rybakina",
    "Jelena Vesnina": "Elena Vesnina",
    "Igor Andrejev": "Igor Andreev",
    "Mihail Južnjij": "Mikhail Youzhny",
    "Nikolaj Davydenko": "Nikolaj Davidenko",
    "Nikoloz Basilašvili": "Nikoloz Basilashvili",
    "Anastazija Pavljučenkova": "Anastasia Pavlyuchenkova",
    "Jelena Dementjeva": "Elena Dementieva",
    "Mónika Szeles": "Monica Seles",
    "Viktorija Azarenka": "Victoria Azarenka",
  },
  "kosarkas-svijet": { "Andrej Kiriljenko": "Andrei Kirilenko", "Zaza Pačulija": "Zaza Pachulia" },
  "sportas-svijet": { "Andrej Kiriljenko": "Andrei Kirilenko", "Aleksandar Aljehin": "Alexander Alekhine" },
  pisac: { "Matija Antun Relković": "Matija Antun Reljković" },
  "strani-pisac": {
    "Matija Antun Relković": "Matija Antun Reljković",
    "Anna Ahmatova": "Ana Ahmatova",
    "Ivan Aleksejevič Bunjin": "Ivan Bunin",
    "Omar Hajjam": "Omar Hajam",
    "Jasunari Kavabata": "Yasunari Kawabata",
    "Nagib Mahfuz": "Naguib Mahfouz",
  },
  slikar: {
    "Alexej von Jawlensky": "Aleksej Javlenski",
    "Viktor Mihajlovič Vasnjecov": "Viktor Vasnecov",
    "Alphonse Mucha": "Alfons Mucha",
  },
  znanstvenik: { "Đuro Pilar": "Gjuro Pilar", "Teodor Wikerhauser": "Teodor Wickerhauser", "Afan Ramić": "Affan Ramić" },
  "strani-znanstvenik": {
    "Grigorij Pereljman": "Grigorij Perelman",
    "Đuro Pilar": "Gjuro Pilar",
    "Teodor Wikerhauser": "Teodor Wickerhauser",
    "Carl Benz": "Karl Benz",
  },
  zlikovac: { Mephisto: "Mefisto" },
  voce: { Pastrnak: "Pastrnjak" },
  dinamo: { "Fatos Beqiraj": "Fatos Bećiraj", "Mounsef Bakrar": "Monsef Bakrar" },
  filozof: { "Anzelmo Canterburyjski": "Anselmo Canterburyjski", "William Occam": "Vilim Ockham" },
  "svjetska-znamenitost": { "Kelnska katedrala": "Kölnska katedrala" },
  znamenitost: { "Kozija ćuprija": "Kozja ćuprija" },
  "hr-vladar": { "Isa-beg Isaković": "Isa-beg Ishaković" },
};

/** Spaja duplikate iz spojeni.ts; udjeli se zbrajaju (osim kod helikoptera), a nazivi i varijante drugoga postaju varijante zadržanog. */
export function withSpojeni(c: SeedCategory): SeedCategory {
  const m = spojeni[c.slug];
  if (!m) return c;
  const list = parseSeedAnswers(c.answers);
  let changed = false;
  for (const [drop, keep] of Object.entries(m)) {
    const d = list.findIndex((x) => x.canonical === drop);
    const k = list.find((x) => x.canonical === keep);
    if (d < 0 || !k) continue;
    const [x] = list.splice(d, 1);
    const seen = new Set([k.canonical, ...k.variants].map(fold));
    for (const v of [x.canonical, ...x.variants]) if (!seen.has(fold(v))) { seen.add(fold(v)); k.variants.push(v); }
    if (!k.rare) k.share = +(k.share + x.share).toPrecision(4); // helikopter zadržava svoju procjenu
    changed = true;
  }
  if (!changed) return c;
  const answers = list.map((a) => `${[a.canonical, ...a.variants].join("/")}=${a.share}${a.rare ? "!" : ""}`).join(";");
  return { ...c, answers };
}
