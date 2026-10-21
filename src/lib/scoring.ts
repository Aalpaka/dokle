import type { SkinConfig, SpeedStep, Station, Tier } from "@/skins/types";

/**
 * Udio igrača (%) za odgovor: procjena pomiješana sa stvarnim brojevima.
 * priorWeight (k) = koliko igrača procjena "vrijedi"; s više stvarnih igrača prevladavaju stvarni podaci.
 */
export function blendedShare(prior: number, count: number, total: number, k: number): number {
  return (k * prior + 100 * count) / (k + total);
}

/** Koliko najčešćih odgovora kategorije uvijek ide prvim tierom (pješice): 2, 3 ili 4 po veličini kategorije. */
export function commonCount(answers: number): number {
  return answers >= 80 ? 4 : answers >= 40 ? 3 : 2;
}

/**
 * Tier po udjelu. `common` = odgovor je među najčešćima kategorije (commonCount) i uvijek dobiva prvi tier;
 * odgovor označen kao najrjeđi (`rare`) umjesto najrjeđeg običnog tiera dobiva poseban tier.
 */
type TierLike = Pick<Tier, "minShare" | "rare">;

export function tierFor<T extends TierLike>(cfg: { tiers: T[] }, share: number, rare = false, common = false): T {
  if (common) return cfg.tiers[0];
  const normal = cfg.tiers.filter((t) => !t.rare);
  const t = normal.find((x) => share >= x.minShare) ?? normal[normal.length - 1];
  return (rare && t === normal[normal.length - 1] && cfg.tiers.find((x) => x.rare)) || t;
}

/** Procjena za odgovore označene kao najrjeđi (helikopter). */
export const RARE_PRIOR = 0.05;

/** Početna procjena (%) iz sredine raspona tiera, za admin kad bira prijevoz umjesto postotka. */
export function priorForTier(tiers: Pick<Tier, "minShare" | "rare">[], index: number): number {
  if (tiers[index].rare) return RARE_PRIOR;
  const min = tiers[index].minShare;
  const max = index > 0 ? tiers[index - 1].minShare : min * 1.5;
  return Math.round(((min + max) / 2) * 100) / 100;
}

export function speedFor(cfg: SkinConfig, elapsedMs: number): SpeedStep {
  const steps = cfg.speed ?? [];
  return steps.find((s) => s.maxSeconds === undefined || elapsedMs <= s.maxSeconds * 1000) ?? { multiplier: 1, emoji: "", name: "" };
}

/**
 * Tierovi za sve odgovore kategorije (sortirane od najčešćeg). Najčešći idu pješice (commonCount), ostali po
 * udjelu, a nijedan obični tier ne ostaje prazan: ako ga nitko ne dosegne, u njega se podigne najčešći odgovor
 * iz rjeđih tierova (ili, kad rjeđih nema, spusti najrjeđi iz češćeg). Helikopter odgovori se ne pomiču.
 */
export function assignTiers<T extends TierLike>(cfg: { tiers: T[] }, answers: { share: number; rare?: boolean }[]): T[] {
  const normal = cfg.tiers.filter((t) => !t.rare);
  const top = commonCount(answers.length);
  const out = answers.map((a, i) => tierFor(cfg, a.share, a.rare, i < top));
  const level = (t: T) => (t.rare ? -1 : normal.indexOf(t));
  const count = (k: number) => out.filter((t) => level(t) === k).length;
  for (let k = 1; k < normal.length; k++) {
    if (count(k)) continue;
    const i = out.findIndex((t) => level(t) > k);
    if (i >= 0) out[i] = normal[k];
  }
  // ako ni nakon toga nema rjeđih (npr. sve članice EU-a su česte), najrjeđi iz češćeg tiera ide dolje
  for (let k = normal.length - 1; k > 0; k--) {
    if (count(k)) continue;
    const i = out.findLastIndex((t) => level(t) > 0 && level(t) < k && count(level(t)) > 1);
    if (i >= 0) out[i] = normal[k];
  }
  return out;
}

/** Km za tier: km tiera puta množitelj brzine, zaokruženo. */
export function kmFor(cfg: SkinConfig, tier: Tier, elapsedMs: number): { tier: Tier; speed: SpeedStep; km: number } {
  const speed = speedFor(cfg, elapsedMs);
  return { tier, speed, km: Math.round(tier.km * speed.multiplier) };
}

/** Km za pogođeni odgovor: km tiera puta množitelj brzine, zaokruženo. */
export function scoreKm(cfg: SkinConfig, share: number, elapsedMs: number, rare = false, common = false): { tier: Tier; speed: SpeedStep; km: number } {
  return kmFor(cfg, tierFor(cfg, share, rare, common), elapsedMs);
}

export function stationAt(cfg: SkinConfig, km: number): Station {
  let s = cfg.stations[0];
  for (const x of cfg.stations) if (km >= x.km) s = x;
  return s;
}

export function formatShare(s: number): string {
  if (s < 0.1) return "< 0,1 %";
  return (s >= 1 ? String(Math.round(s)) : s.toFixed(1).replace(".", ",")) + " %";
}
