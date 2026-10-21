import type { SkinConfig, SpeedStep, Station, Tier } from "@/skins/types";

/**
 * Udio igrača (%) za odgovor: procjena pomiješana sa stvarnim brojevima.
 * priorWeight (k) = koliko igrača procjena "vrijedi"; s više stvarnih igrača prevladavaju stvarni podaci.
 */
export function blendedShare(prior: number, count: number, total: number, k: number): number {
  return (k * prior + 100 * count) / (k + total);
}

export function tierFor(cfg: SkinConfig, share: number): Tier {
  return cfg.tiers.find((t) => share >= t.minShare) ?? cfg.tiers[cfg.tiers.length - 1];
}

/** Početna procjena (%) iz sredine raspona tiera, za admin kad bira prijevoz umjesto postotka. */
export function priorForTier(tiers: Pick<Tier, "minShare">[], index: number): number {
  const min = tiers[index].minShare;
  const max = index > 0 ? tiers[index - 1].minShare : min * 1.5;
  return Math.round(((min + max) / 2) * 100) / 100;
}

export function speedFor(cfg: SkinConfig, elapsedMs: number): SpeedStep {
  const steps = cfg.speed ?? [];
  return steps.find((s) => s.maxSeconds === undefined || elapsedMs <= s.maxSeconds * 1000) ?? { multiplier: 1, emoji: "", name: "" };
}

/** Km za pogođeni odgovor: km tiera puta množitelj brzine, zaokruženo. */
export function scoreKm(cfg: SkinConfig, share: number, elapsedMs: number): { tier: Tier; speed: SpeedStep; km: number } {
  const tier = tierFor(cfg, share);
  const speed = speedFor(cfg, elapsedMs);
  return { tier, speed, km: Math.round(tier.km * speed.multiplier) };
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
