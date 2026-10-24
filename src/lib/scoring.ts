import type { SkinConfig, SpeedStep, Station, Tier } from "@/skins/types";

/**
 * Udio igrača (%) za odgovor: procjena pomiješana sa stvarnim brojevima.
 * priorWeight (k) = koliko igrača procjena "vrijedi"; s više stvarnih igrača prevladavaju stvarni podaci.
 * Uz k = 500 nekoliko ranih igrača odgovor pomakne najviše za prijevoz-dva, a ne iz aviona u Bajs.
 */
export function blendedShare(prior: number, count: number, total: number, k: number): number {
  return (k * prior + 100 * count) / (k + total);
}

/**
 * Koliko odgovora pitanja ide u svaki obični prijevoz po rangu (od najčešćeg); zadnji obični (avion) dobiva ostatak.
 * Pješice 5 %, Bajs 7 % i HŽ 11 % (najviše 6, 8 i 11), a Pješice i Bajs zajedno bar 10 (u pitanjima ispod 50 odgovora
 * razmjerno manje); Čazmatrans 11 % i Rimac 18 %. Npr. 60 odgovora: 3/7/7/7/11, 100: 5/7/11/11/18, 150: 6/8/11/17/27.
 */
const RANK_TIERS: { part: number; min: number; max?: number }[] = [
  { part: 0.05, min: 2, max: 6 },
  { part: 0.07, min: 1, max: 8 },
  { part: 0.11, min: 3, max: 11 },
  { part: 0.11, min: 3 },
  { part: 0.18, min: 3 },
];
const COMMON_MIN = 10;

export function tierSizes(answers: number): number[] {
  const out = RANK_TIERS.map((t) => Math.min(Math.max(Math.round(t.part * answers), t.min), t.max ?? Infinity));
  out[1] = Math.max(out[1], Math.round(COMMON_MIN * Math.min(1, answers / 50)) - out[0]);
  return out;
}

/**
 * Tier po udjelu (za stare partije i procjene u adminu; u igri tier ide po rangu, vidi assignTiers).
 * `common` = uvijek prvi tier; odgovor označen kao najrjeđi (`rare`) umjesto najrjeđeg običnog tiera dobiva poseban tier.
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

/**
 * Procjena (%) koja odgovor smjesti u sredinu ranga tiera `index` među ostalim odgovorima kategorije (za admin kad bira
 * prijevoz); tier u igri ide po rangu, pa sredina raspona postotka (priorForTier) često ne pogodi željeni tier.
 * Helikopter nije rang nego oznaka: vraća RARE_PRIOR. `others` su ostali odgovori, bilo kojim redom.
 */
export function priorForRank(tiers: Pick<Tier, "minShare" | "rare">[], index: number, others: { share: number; rare?: boolean }[]): number {
  if (tiers[index].rare) return RARE_PRIOR;
  const normal = tiers.filter((t) => !t.rare);
  const k = normal.indexOf(tiers[index]);
  const total = others.length + 1;
  // označeni helikopteri ne zauzimaju mjesta u rangu običnih tierova; ako ih je manje od rareCount, najrjeđi ostali postaju helikopter
  const list = others.filter((o) => !o.rare).map((o) => o.share).sort((a, b) => b - a);
  const fill = tiers.some((t) => t.rare) ? Math.max(0, rareCount(total) - (others.length - list.length)) : 0;
  const sizes = tierSizes(total);
  const start = sizes.slice(0, k).reduce((a, b) => a + b, 0);
  const end = k === normal.length - 1 ? Math.max(start, list.length - fill) : start + sizes[k] - 1;
  const rank = Math.min(Math.floor((start + end) / 2), list.length);
  const above = list[rank - 1], below = list[rank];
  const share = above === undefined ? (below ?? priorForTier(tiers, index)) * 1.2 + 0.1 : below === undefined ? above * 0.8 : (above + below) / 2;
  return Math.max(0.01, Math.round(share * 100) / 100);
}

export function speedFor(cfg: SkinConfig, elapsedMs: number): SpeedStep {
  const steps = cfg.speed ?? [];
  return steps.find((s) => s.maxSeconds === undefined || elapsedMs <= s.maxSeconds * 1000) ?? { multiplier: 1, emoji: "", name: "" };
}

/** Koliko helikopter odgovora kategorija uvijek ima: 1, a 2 u kategorijama sa 60+ odgovora. */
export function rareCount(answers: number): number {
  return answers >= 60 ? 2 : 1;
}

// označeni helikopter gubi titulu tek kad ga taj dan da puno igrača
export const RARE_LOSE = { minPlayers: 10, minShare: 2 };

/**
 * Tierovi za sve odgovore kategorije (sortirane od najčešćeg; `n` = koliko ih je taj dan dalo).
 * - Helikopter: označeni najrjeđi odgovori, osim ako ga je taj dan dalo puno igrača (RARE_LOSE). Uvijek ih je
 *   bar rareCount; što fali, popune najrjeđi ostali odgovori.
 * - Ostali po rangu: prvih nekoliko pješice, pa Bajs, HŽ... koliko kojih, kaže tierSizes; avion dobiva ostatak.
 */
export function assignTiers<T extends TierLike>(cfg: { tiers: T[] }, answers: { share: number; rare?: boolean; n?: number }[]): T[] {
  const normal = cfg.tiers.filter((t) => !t.rare);
  const heli = cfg.tiers.find((t) => t.rare);
  const sizes = tierSizes(answers.length);
  const out: (T | undefined)[] = answers.map(() => undefined);
  if (heli) {
    const top = sizes[0];
    const lost = (a: { share: number; n?: number }) => (a.n ?? 0) >= RARE_LOSE.minPlayers && a.share >= RARE_LOSE.minShare;
    answers.forEach((a, i) => {
      if (a.rare && i >= top && !lost(a)) out[i] = heli;
    });
    for (let i = answers.length - 1; i >= top && out.filter((t) => t === heli).length < rareCount(answers.length); i--)
      if (out[i] !== heli && !lost(answers[i])) out[i] = heli;
  }
  let k = 0, used = 0;
  return out.map((t) => {
    if (t) return t;
    while (k < normal.length - 1 && used >= sizes[k]) [k, used] = [k + 1, 0];
    used++;
    return normal[k];
  });
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

/** Gdje je igrač završio, s easter eggom: preko overshoot.overKm to nije cilj nego postaja produžetka. */
export function landingAt(cfg: SkinConfig, km: number): Station {
  const o = cfg.overshoot;
  return o && km > o.overKm ? o.station : stationAt(cfg, km);
}

/** Stanice rute na karti, s postajom produžetka na kraju. */
export function routeStations(cfg: SkinConfig): Station[] {
  return cfg.overshoot ? [...cfg.stations, cfg.overshoot.station] : cfg.stations;
}

/** Km na karti: do overKm najdalje cilj (višak se ne vidi), preko toga ravno do postaje produžetka. */
export function routeKm(cfg: SkinConfig, km: number): number {
  const o = cfg.overshoot;
  return o && km > o.overKm ? o.station.km : Math.min(km, cfg.maxKm);
}

export function formatShare(s: number): string {
  if (s < 0.1) return "< 0,1 %";
  return (s >= 1 ? String(Math.round(s)) : s.toFixed(1).replace(".", ",")) + " %";
}
