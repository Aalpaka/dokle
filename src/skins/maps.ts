import type { SkinConfig, SkinMap } from "./types";
import { hrMap } from "./hr/map";
import { hrConfig } from "./hr/config";

// karte po skinu; drže se na klijentu jer su veće od ostatka konfiguracije
export const maps: Record<string, SkinMap> = { hr: hrMap };

const codeConfigs: Record<string, SkinConfig> = { hr: hrConfig };

/**
 * Konfiguracija iz baze s izgledom tierova (vozilo, boja, sličica) iz koda. Baza se osvježava tek
 * seedom na produkciji, pa preview i stari zapisi mogu imati tierove bez tih polja.
 */
export function withVisuals(skinId: string, cfg: SkinConfig): SkinConfig {
  const code = codeConfigs[skinId] ?? hrConfig;
  return {
    ...cfg,
    overshoot: cfg.overshoot ?? code.overshoot,
    tiers: cfg.tiers.map((t, i) => {
      const c = code.tiers.find((x) => x.name === t.name) ?? code.tiers[Math.min(i, code.tiers.length - 1)];
      return { ...t, vehicle: t.vehicle ?? c.vehicle, color: t.color ?? c.color, badge: t.badge ?? c.badge, icon: t.icon ?? c.icon };
    }),
  };
}
