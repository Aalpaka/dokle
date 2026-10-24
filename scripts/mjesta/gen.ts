// Za svaki km rute najbliže stvarno mjesto iz popisa kandidata (naselja jedne države) -> src/skins/<id>/mjesta.ts (vidi README.md u ovoj mapi).
// npx tsx scripts/mjesta/gen.ts hr kandidati-hr.json hr.wikipedije
import { readFileSync, writeFileSync } from "node:fs";
import { Route, project } from "../../src/lib/route";
import { codeConfigs, maps } from "../../src/skins/maps";

const [skin, file, source = "Wikipedije"] = process.argv.slice(2);
const cfg = codeConfigs[skin], map = maps[skin];
const raw: [string, number, number, number][] = JSON.parse(readFileSync(file, "utf8"));

// piksela karte po km (na geografskoj širini rute je to približno stalno)
const pxPerKm = Math.hypot(...(([a, b]) => [b[0] - a[0], b[1] - a[1]])([project(16, 44), project(16, 44.009)]));
// "Brdo (Zadar)" -> "Brdo", "Podstrana – Mutogras" -> "Podstrana"
const display = (t: string) => t.replace(/\s*\(.*\)\s*$/, "").split(" – ")[0].trim();
const places = raw
  .filter(([t]) => !/\d/.test(t) && display(t).split(" ").length <= 4)
  .map(([t, lon, lat, views]) => ({ name: display(t), p: project(lon, lat), views }));
// postaje rute su uvijek mjesta (na koordinatama iz konfiguracije), s pregledima svog članka
for (const s of cfg.stations) {
  const views = Math.max(0, ...places.filter((x) => x.name === s.name).map((x) => x.views));
  places.push({ name: s.name, p: project(s.lon, s.lat), views });
}

const route = new Route(cfg.stations, map.via);
// poznatija mjesta (više pregleda na Wikipediji) blago imaju prednost: zaselak pobijedi grad samo ako je osjetno bliže
const weight = (v: number) => 1 + 0.1 * Math.log10(1 + v);
const runs: [number, string][] = [];
const dist: number[] = [];
for (let km = 0; km <= cfg.maxKm; km++) {
  const { x, y } = route.at(km);
  let best = places[0], bs = Infinity;
  for (const pl of places) {
    const s = Math.hypot(pl.p[0] - x, pl.p[1] - y) / weight(pl.views);
    if (s < bs) [best, bs] = [pl, s];
  }
  dist.push(Math.hypot(best.p[0] - x, best.p[1] - y) / pxPerKm);
  if (runs.at(-1)?.[1] !== best.name) runs.push([km, best.name]);
}
const out =
  `// GENERIRANO skriptom scripts/mjesta/gen.ts (naselja s ${source}). Ne uređivati ručno.\n` +
  `// [od km, mjesto]: najbliže stvarno mjesto točki na ruti, vrijedi do sljedećeg unosa.\n` +
  `export const mjesta: [number, string][] = [\n` +
  runs.map(([k, n]) => `  [${k}, ${JSON.stringify(n)}],`).join("\n") +
  `\n];\n`;
writeFileSync(`src/skins/${skin}/mjesta.ts`, out);
dist.sort((a, b) => a - b);
console.log(`${places.length} mjesta, ${runs.length} promjena; udaljenost do mjesta medijan ${dist[dist.length >> 1].toFixed(1)} km, najviše ${dist.at(-1)!.toFixed(1)} km`);
