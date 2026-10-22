import type { SkinConfig } from "@/skins/types";
import { landingAt } from "@/lib/scoring";

export type DayCompare = {
  players: number; // završene partije danas, s igračem
  ahead: number | null; // % ostalih igrača s manje km; null dok je igrač sam
  rank: number; // igračevo mjesto: 1 + broj ostalih s više km (izjednačeni dijele mjesto)
  avgKm: number;
  bestKm: number;
  bestTown: string; // gdje je završio najdalji (s easter eggom, npr. Budva)
};

/** Usporedba igračevih km sa svim završenim partijama dana (kms uključuje i igračevu). */
export function compareDay(cfg: SkinConfig, kms: number[], mine: number): DayCompare {
  const others = kms.length - 1;
  const below = kms.filter((k) => k < mine).length;
  const bestKm = kms.length ? Math.max(...kms) : 0;
  return {
    players: kms.length,
    ahead: others > 0 ? Math.round((100 * below) / others) : null,
    rank: 1 + kms.filter((k) => k > mine).length,
    avgKm: kms.length ? Math.round(kms.reduce((a, b) => a + b, 0) / kms.length) : 0,
    bestKm,
    bestTown: landingAt(cfg, bestKm).name,
  };
}
