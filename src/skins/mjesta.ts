import type { SkinConfig, Station } from "./types";
import { landingAt } from "@/lib/scoring";
import { mjesta as hr } from "./hr/mjesta";
import { mjesta as ba } from "./ba/mjesta";
import { mjesta as rs } from "./rs/mjesta";

// po skinu: [od km, mjesto] uz rutu, generirano skriptom scripts/mjesta/gen.ts
const tables: Record<string, [number, string][]> = { hr, ba, rs };

/**
 * Najbliže stvarno mjesto točki na kojoj je igrač stao (ne samo postaje rute). Preko overKm je to
 * postaja produžetka (Budva), a između cilja i overKm cilj.
 */
export function placeAt(skinId: string, cfg: SkinConfig, km: number): string {
  const t = tables[skinId];
  const o = cfg.overshoot;
  if (!t || (o && km > o.overKm)) return landingAt(cfg, km).name;
  const k = Math.min(Math.max(0, km), cfg.maxKm);
  let lo = 0, hi = t.length - 1;
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (t[mid][0] <= k) lo = mid;
    else hi = mid - 1;
  }
  return t[lo][0] <= k ? t[lo][1] : landingAt(cfg, km).name;
}

/** Postaja rute najbliža po km (ispred ili iza), za njenu poruku na kraju; preko overKm postaja produžetka. */
export function nearestStation(cfg: SkinConfig, km: number): Station {
  const o = cfg.overshoot;
  if (o && km > o.overKm) return o.station;
  return cfg.stations.reduce((a, s) => (Math.abs(s.km - km) < Math.abs(a.km - km) ? s : a));
}
