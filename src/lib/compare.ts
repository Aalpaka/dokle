import type { SkinConfig } from "@/skins/types";
import { placeAt } from "@/skins/mjesta";

export const BUCKET_KM = 100;

export type DayCompare = {
  players: number; // završene partije danas, s igračem
  ahead: number | null; // % ostalih igrača s manje km; null dok je igrač sam
  behind: number; // broj ostalih s manje km
  avgKm: number;
  bestKm: number;
  bestTown: string; // gdje je završio najdalji (s easter eggom, npr. Budva)
  hist: number[]; // broj igrača po 100 km, s igračem
  mineBin: number; // igračev stupac
};

export type RouteLabel = { name: string; km: number };

/** Broj partija po 100 km, od starta do cilja (ili dalje ako je netko otišao preko). */
export function routeHistogram(cfg: SkinConfig, kms: number[]): number[] {
  const bestKm = kms.length ? Math.max(...kms) : 0;
  const hist = Array.from({ length: Math.floor(Math.max(cfg.maxKm, bestKm) / BUCKET_KM) + 1 }, () => 0);
  for (const k of kms) hist[Math.floor(k / BUCKET_KM)]++;
  return hist;
}

/** Glavni gradovi ispod osi; postaja produžetka (Budva) tek kad je netko stigao do nje. */
export function routeLabels(cfg: SkinConfig, bestKm: number): RouteLabel[] {
  const o = cfg.overshoot;
  return [...cfg.stations.filter((s) => s.alwaysLabel), ...(o && bestKm > o.overKm ? [o.station] : [])].map((s) => ({ name: s.name, km: s.km }));
}

/** Usporedba igračevih km sa svim završenim partijama dana (kms uključuje i igračevu). */
export function compareDay(skinId: string, cfg: SkinConfig, kms: number[], mine: number): DayCompare {
  const others = [...kms];
  const me = others.indexOf(mine);
  if (me >= 0) others.splice(me, 1);
  const below = others.filter((k) => k < mine).length;
  const bestKm = kms.length ? Math.max(...kms) : 0;
  const hist = routeHistogram(cfg, kms);
  return {
    players: kms.length,
    ahead: others.length > 0 ? Math.round((100 * below) / others.length) : null,
    behind: below,
    avgKm: kms.length ? Math.round(kms.reduce((a, b) => a + b, 0) / kms.length) : 0,
    bestKm,
    bestTown: placeAt(skinId, cfg, bestKm),
    hist,
    mineBin: Math.floor(mine / BUCKET_KM),
  };
}
