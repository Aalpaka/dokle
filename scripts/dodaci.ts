// Generira src/skins/<skin>/kategorije/dodaci.ts iz popisa <slug>.txt ("# udio" pa "A/alias; B; ..."), preskače odgovore koji već postoje.
// Redak "@ Kanonski = alias/alias" dodaje aliase postojećem odgovoru (aliasi.ts). Novi odgovori se dopisuju iza već postojećih dodataka.
// Pokretanje: DODACI_DIR=<mapa> [SKIN=ba|rs] npx tsx scripts/dodaci.ts <slug>...
import { readFileSync, writeFileSync, existsSync } from "fs";
import { hrCategories } from "../src/skins/hr/categories";
import { baContent } from "../src/skins/ba/kategorije";
import { rsContent } from "../src/skins/rs/kategorije";
import { fold, parseSeedAnswers } from "../src/lib/matcher";
const key = (s: string) => fold(s).replace(/ /g, "");
const skin = process.env.SKIN ?? "hr";
const source = skin === "hr" ? hrCategories : [...(skin === "ba" ? baContent : rsContent).domestic, ...(skin === "ba" ? baContent : rsContent).replace];
const out: Record<string, string> = {};
const aliasOut: Record<string, Record<string, string>> = {};
for (const slug of process.argv.slice(2)) {
  const c = source.find((x) => x.slug === slug)!;
  const existing = parseSeedAnswers(c.answers);
  const seen = new Set(existing.flatMap((a) => [a.canonical, ...a.variants]).map(key));
  let share = 0.1; const add: string[] = []; let skipped: string[] = [];
  for (const line of readFileSync(process.env.DODACI_DIR + "/" + slug + ".txt", "utf8").split("\n")) {
    if (line.startsWith("#")) { share = parseFloat(line.slice(1)); continue; }
    if (line.startsWith("@")) {
      const [canonical, list] = line.slice(1).split("=").map((s) => s.trim());
      if (!existing.some((a) => a.canonical === canonical)) throw new Error(`${slug}: nema odgovora ${canonical}`);
      const names = list.split("/").map((s) => s.trim()).filter((n) => !seen.has(key(n)));
      names.forEach((n) => seen.add(key(n)));
      if (names.length) { const m = (aliasOut[slug] ??= {}); m[canonical] = m[canonical] ? `${m[canonical]}/${names.join("/")}` : names.join("/"); }
      continue;
    }
    for (const e of line.split(";").map((s) => s.trim()).filter(Boolean)) {
      const names = e.split("/").map((s) => s.trim());
      if (names.some((n) => seen.has(key(n)))) { skipped.push(e); continue; }
      names.forEach((n) => seen.add(key(n)));
      add.push(`${names.join("/")}=${share}`);
    }
  }
  // zbroj udjela pitanja mora ostati ispod 160 (test), pa se novi po potrebi razmjerno smanje (DODACI_CAP mijenja granicu od 155)
  const room = Number(process.env.DODACI_CAP ?? 155) - parseSeedAnswers(c.answers).reduce((t, a) => t + a.share, 0);
  const total = add.reduce((t, e) => t + parseFloat(e.split("=")[1]), 0);
  if (total > room) {
    const k = room / total;
    for (let i = 0; i < add.length; i++) {
      const [n, v] = add[i].split("=");
      add[i] = `${n}=${Math.max(0.002, +(parseFloat(v) * k).toPrecision(2))}`;
    }
  }
  console.error(slug, "+", add.length, "preskočeno:", skipped.join(", "));
  if (add.length) out[slug] = add.join("; ");
}
const f = `src/skins/${skin}/kategorije/dodaci.ts`;
const prev: Record<string, string> = existsSync(f) ? (await import("../" + f)).dodaci : {};
const all = { ...prev };
for (const [slug, v] of Object.entries(out)) all[slug] = all[slug] ? `${all[slug]}; ${v}` : v;
writeFileSync(f, "// Dodatni odgovori za postojeća pitanja (seed dodaje odgovore koji još nisu u bazi).\nexport const dodaci: Record<string, string> = {\n" +
  Object.entries(all).map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)},`).join("\n") + "\n};\n");

const fa = `src/skins/${skin}/kategorije/aliasi.ts`;
const prevA: Record<string, Record<string, string>> = existsSync(fa) ? (await import("../" + fa)).aliasi : {};
for (const [slug, m] of Object.entries(aliasOut)) for (const [k, v] of Object.entries(m)) (prevA[slug] ??= {})[k] = prevA[slug][k] ? `${prevA[slug][k]}/${v}` : v;
writeFileSync(fa, "// Dodatni aliasi za postojeće odgovore (seed ih dodaje i odgovorima koji su već u bazi).\nexport const aliasi: Record<string, Record<string, string>> = {\n" +
  Object.entries(prevA).map(([k, m]) => `  ${JSON.stringify(k)}: { ${Object.entries(m).map(([c, v]) => `${JSON.stringify(c)}: ${JSON.stringify(v)}`).join(", ")} },`).join("\n") + "\n};\n");
