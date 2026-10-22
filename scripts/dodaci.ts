// Generira src/skins/hr/kategorije/dodaci.ts iz popisa <slug>.txt ("# udio" pa "A/alias; B; ..."), preskače odgovore koji već postoje.
// Pokretanje: DODACI_DIR=<mapa> npx tsx scripts/dodaci.ts <slug>...
import { readFileSync, writeFileSync, existsSync } from "fs";
import { hrCategories } from "../src/skins/hr/categories";
import { fold, parseSeedAnswers } from "../src/lib/matcher";
const key = (s: string) => fold(s).replace(/ /g, "");
const out: Record<string, string> = {};
for (const slug of process.argv.slice(2)) {
  const c = hrCategories.find((x) => x.slug === slug)!;
  const seen = new Set(parseSeedAnswers(c.answers).flatMap((a) => [a.canonical, ...a.variants]).map(key));
  let share = 0.1; const add: string[] = []; let skipped: string[] = [];
  for (const line of readFileSync(process.env.DODACI_DIR + "/" + slug + ".txt", "utf8").split("\n")) {
    if (line.startsWith("#")) { share = parseFloat(line.slice(1)); continue; }
    for (const e of line.split(";").map((s) => s.trim()).filter(Boolean)) {
      const names = e.split("/").map((s) => s.trim());
      if (names.some((n) => seen.has(key(n)))) { skipped.push(e); continue; }
      names.forEach((n) => seen.add(key(n)));
      add.push(`${names.join("/")}=${share}`);
    }
  }
  // zbroj udjela pitanja mora ostati ispod 130 (test), pa se novi po potrebi razmjerno smanje
  const room = 128 - parseSeedAnswers(c.answers).reduce((t, a) => t + a.share, 0);
  const total = add.reduce((t, e) => t + parseFloat(e.split("=")[1]), 0);
  if (total > room) {
    const k = room / total;
    for (let i = 0; i < add.length; i++) {
      const [n, v] = add[i].split("=");
      add[i] = `${n}=${Math.max(0.002, +(parseFloat(v) * k).toPrecision(2))}`;
    }
  }
  console.error(slug, "+", add.length, "preskočeno:", skipped.join(", "));
  out[slug] = add.join("; ");
}
const f = "src/skins/hr/kategorije/dodaci.ts";
const prev: Record<string, string> = existsSync(f) ? (await import("../" + f)).dodaci : {};
const all = { ...prev, ...out };
writeFileSync(f, "// Dodatni odgovori za postojeća pitanja (seed dodaje odgovore koji još nisu u bazi).\nexport const dodaci: Record<string, string> = {\n" +
  Object.entries(all).map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)},`).join("\n") + "\n};\n");
