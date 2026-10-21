import type { SkinConfig } from "@/skins/types";

export type DayCompare = {
  players: number; // završene partije danas, s igračem
  ahead: number | null; // % ostalih igrača s manje km; null dok je igrač sam
  avgKm: number;
  bestKm: number;
  // broj igrača koji su stali na dionici od stanice i do sljedeće (zadnja: od cilja dalje)
  bins: number[];
};

/** Usporedba igračevih km sa svim završenim partijama dana (kms uključuje i igračevu). */
export function compareDay(cfg: SkinConfig, kms: number[], mine: number): DayCompare {
  const bins = cfg.stations.map(() => 0);
  for (const km of kms) {
    let i = 0;
    while (i + 1 < cfg.stations.length && km >= cfg.stations[i + 1].km) i++;
    bins[i]++;
  }
  const others = kms.length - 1;
  const below = kms.filter((k) => k < mine).length;
  return {
    players: kms.length,
    ahead: others > 0 ? Math.round((100 * below) / others) : null,
    avgKm: kms.length ? Math.round(kms.reduce((a, b) => a + b, 0) / kms.length) : 0,
    bestKm: kms.length ? Math.max(...kms) : 0,
    bins,
  };
}
