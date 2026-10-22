import type { SkinConfig } from "@/skins/types";
import { landingAt } from "@/lib/scoring";

export const BUCKET_KM = 100;

export type DayCompare = {
  players: number; // završene partije danas, s igračem
  ahead: number | null; // % ostalih igrača s manje km; null dok je igrač sam
  behind: number; // broj ostalih s manje km
  avgKm: number;
  bestKm: number;
  bestTown: string; // gdje je završio najdalji (s easter eggom, npr. Budva)
  // ostali igrači po 100 km (bez igrača): koliko ih je iza njega, koliko ispred ili izjednačeno
  hist: { behind: number; front: number }[];
};

/** Usporedba igračevih km sa svim završenim partijama dana (kms uključuje i igračevu). */
export function compareDay(cfg: SkinConfig, kms: number[], mine: number): DayCompare {
  const others = [...kms];
  const me = others.indexOf(mine);
  if (me >= 0) others.splice(me, 1);
  const below = others.filter((k) => k < mine).length;
  const bestKm = kms.length ? Math.max(...kms) : 0;
  const hist = Array.from({ length: Math.floor(Math.max(cfg.maxKm, bestKm) / BUCKET_KM) + 1 }, () => ({ behind: 0, front: 0 }));
  for (const k of others) hist[Math.floor(k / BUCKET_KM)][k < mine ? "behind" : "front"]++;
  return {
    players: kms.length,
    ahead: others.length > 0 ? Math.round((100 * below) / others.length) : null,
    behind: below,
    avgKm: kms.length ? Math.round(kms.reduce((a, b) => a + b, 0) / kms.length) : 0,
    bestKm,
    bestTown: landingAt(cfg, bestKm).name,
    hist,
  };
}
