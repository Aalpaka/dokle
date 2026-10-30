// Dani složeni unaprijed (tematski dani): seed ih upiše pri deployu ako taj dan još ne postoji, a mijenjaju se i u adminu
// (Raspored). Za svako mjesto dana (redom kao dailyPattern: hr, opce, kviz, zaigrano, hr, opce, kviz, zaigrano) popis
// kandidata; uzima se prvi koji još nije bio, a mjesto bez slobodnog kandidata popuni se automatski. BiH i Srbija prate Hrvatsku.
export const RASPORED: Record<string, string[][]> = {
  // Noć vještica
  "2026-10-31": [
    ["utvrda", "spilja-slap"],
    ["kukac", "gmaz", "gljiva"],
    ["horor-lik"],
    ["horor-film"],
    ["spilja-slap", "utvrda"],
    ["gljiva", "gmaz", "kukac"],
    ["grcki-junak", "bog-ostali", "zastava-crna"],
    ["noc-vjestica", "mitolosko-bice"],
  ],
};
