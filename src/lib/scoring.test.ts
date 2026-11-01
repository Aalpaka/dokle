import { describe, expect, it } from "vitest";
import { assignTiers, blendedShare, configOn, kmFor, priorForRank, priorForTier, rareBelowAll, scoreKm, speedFor, stationAt, tierFor, tierSizes, landingAt, routeKm } from "./scoring";
import { dayNumber, localDate } from "./day";
import { hrConfig } from "@/skins/hr/config";
import { baConfig } from "@/skins/ba/config";
import { rsConfig } from "@/skins/rs/config";

describe("scoring", () => {
  it("helikopter ima procjenu ispod najrjeđeg običnog, tierovi ostaju isti", () => {
    const prior = new Map([[1, 30], [2, 5], [3, 0.21], [4, 0.0005], [5, 0.21]]);
    const out = rareBelowAll(prior, new Set([3, 5]));
    expect(out.get(3)).toBeCloseTo(0.00045);
    expect(out.get(5)).toBeCloseTo(0.00045);
    expect(out.get(4)).toBe(0.0005);
    expect(rareBelowAll(prior, new Set())).toBe(prior);
    const tiersOf = (p: Map<number, number>) => {
      const list = [...p].map(([id, share]) => ({ id, share, rare: id === 3 || id === 5 })).sort((a, b) => b.share - a.share);
      const t = assignTiers(hrConfig, list);
      return Object.fromEntries(list.map((a, i) => [a.id, t[i].name]));
    };
    expect(tiersOf(out)).toEqual(tiersOf(prior));
  });
  it("bez igrača vraća procjenu", () => {
    expect(blendedShare(22, 0, 0, 50)).toBe(22);
  });
  it("s puno igrača prevladava stvarni udio", () => {
    expect(blendedShare(22, 1, 1000, 50)).toBeCloseTo((50 * 22 + 100) / 1050);
  });
  it("tierovi", () => {
    expect(tierFor(hrConfig, 22).km).toBe(12);
    expect(tierFor(hrConfig, 0.4).km).toBe(150);
    expect(tierFor(hrConfig, 2).km).toBe(84);
  });
  it("prijevoz ide po rangu u pitanju", () => {
    expect(tierSizes(60)).toEqual([3, 7, 7, 7, 11]);
    expect(tierSizes(100)).toEqual([5, 7, 11, 11, 18]);
    expect(tierSizes(150)).toEqual([6, 8, 11, 17, 27]);
    // Pješice i Bajs zajedno bar 10, a s HŽ-om 15 do 25
    for (const n of [50, 60, 80, 100, 120, 150, 250]) {
      const [p, b, h] = tierSizes(n);
      expect(p + b, String(n)).toBeGreaterThanOrEqual(10);
      expect(p + b + h, String(n)).toBeGreaterThanOrEqual(15);
      expect(p + b + h, String(n)).toBeLessThanOrEqual(25);
    }
    const answers = Array.from({ length: 100 }, (_, i) => ({ share: 30 - i * 0.3, rare: i >= 98 }));
    const names = assignTiers(hrConfig, answers).map((t) => t.name);
    expect(hrConfig.tiers.map((t) => names.filter((x) => x === t.name).length)).toEqual([5, 7, 11, 11, 18, 46, 2]);
    expect(tierFor(hrConfig, 8, false, true).name).toBe("Pješice");
    expect(tierFor(hrConfig, 8).name).toBe("HŽ");
  });
  it("nijedan prijevoz ne ostaje prazan", () => {
    // 30 odgovora, svi između 3 i 1 %: bez popunjavanja bi Bajs i HŽ ostali prazni
    const answers = Array.from({ length: 30 }, (_, i) => ({ share: 3 - i * 0.07 }));
    answers.push({ share: 0.05, rare: true } as never);
    const t = assignTiers(hrConfig, answers).map((x) => x.name);
    for (const tier of hrConfig.tiers) expect(t, tier.name).toContain(tier.name);
    expect(t.slice(0, 2)).toEqual(["Pješice", "Pješice"]);
    expect(t.at(-1)).toBe("Milanovićev helikopter");
  });
  it("helikopter uvijek postoji i gubi se tek kad ga da puno igrača", () => {
    const base = Array.from({ length: 30 }, (_, i) => ({ share: 10 - i * 0.3, n: 0, rare: false }));
    const heli = (list: typeof base) => assignTiers(hrConfig, list).flatMap((t, i) => (t.rare ? [i] : []));
    // bez oznaka: najrjeđi odgovor dobije helikopter
    expect(heli(base)).toEqual([29]);
    // označeni ga zadrži i kad ga je dao jedan igrač
    const marked = base.map((a, i) => (i === 20 ? { ...a, rare: true, share: 1.5, n: 1 } : a));
    expect(heli(marked)).toEqual([20]);
    // a izgubi kad ga da puno igrača; tada ga dobije najrjeđi ostali
    const lost = base.map((a, i) => (i === 20 ? { ...a, rare: true, share: 2.5, n: 12 } : a));
    expect(heli(lost)).toEqual([29]);
    // 60+ odgovora: dva helikoptera
    expect(heli(Array.from({ length: 70 }, (_, i) => ({ share: 10 - i * 0.1, n: 0, rare: false })))).toEqual([68, 69]);
  });
  it("helikopter samo za označene najrjeđe odgovore", () => {
    expect(tierFor(hrConfig, 0.05).name).toBe("Croatia Airlines");
    expect(tierFor(hrConfig, 0.05, true).name).toBe("Milanovićev helikopter");
    expect(tierFor(hrConfig, 0.05, true).km).toBe(220);
    // kad ga puno igrača da, gubi helikopter
    expect(tierFor(hrConfig, 3, true).name).toBe("Čazmatrans");
  });
  it("procjena iz tiera pada u isti tier", () => {
    hrConfig.tiers.forEach((t, i) => expect(tierFor(hrConfig, priorForTier(hrConfig.tiers, i), t.rare).name).toBe(t.name));
    expect(priorForTier(hrConfig.tiers, 0)).toBe(25);
    expect(priorForTier(hrConfig.tiers, hrConfig.tiers.length - 2)).toBe(0.25);
    expect(priorForTier(hrConfig.tiers, hrConfig.tiers.length - 1)).toBe(0.05);
  });
  it("postaje", () => {
    expect(stationAt(hrConfig, 0).name).toBe("Vukovar");
    expect(stationAt(hrConfig, 300).name).toBe("Zagreb");
    expect(stationAt(hrConfig, 540).name).toBe("Pula");
    expect(stationAt(hrConfig, 1200).name).toBe("Dubrovnik");
    expect(stationAt(hrConfig, 1290).name).toBe("Dubrovnik");
  });
  it("preko Dubrovnika u Crnu Goru (easter egg)", () => {
    const allPlanes = 8 * scoreKm(hrConfig, 0, 0).km;
    expect(landingAt(hrConfig, hrConfig.maxKm).name).toBe("Dubrovnik");
    expect(landingAt(hrConfig, allPlanes).name).toBe("Dubrovnik");
    expect(landingAt(hrConfig, 7 * scoreKm(hrConfig, 0, 0).km + scoreKm(hrConfig, 0, 0, true).km).name).toBe("Dubrovnik");
    expect(landingAt(hrConfig, 6 * scoreKm(hrConfig, 0, 0).km + 2 * scoreKm(hrConfig, 0, 0, true).km).name).toBe("Budva");
    expect(landingAt(hrConfig, 1700).name).toBe("Dubrovnik");
    expect(landingAt(hrConfig, 1701).name).toBe("Budva");
    expect(stationAt(hrConfig, 1750).name).toBe("Dubrovnik");
    expect(routeKm(hrConfig, 1250)).toBe(hrConfig.maxKm);
    expect(routeKm(hrConfig, 1750)).toBe(hrConfig.overshoot!.station.km);
    expect(routeKm(hrConfig, 600)).toBe(600);
  });
  it("brzina", () => {
    expect(speedFor(hrConfig, 3000).multiplier).toBe(1.3);
    expect(speedFor(hrConfig, 5000).multiplier).toBe(1.3);
    expect(speedFor(hrConfig, 9000).multiplier).toBe(1.15);
    expect(speedFor(hrConfig, 15000).multiplier).toBe(1);
    expect(speedFor(hrConfig, 26000).multiplier).toBe(0.9);
  });
  it("helikopter i najsporiji vrijedi više od najbržeg aviona", () => {
    for (const cfg of [hrConfig, baConfig, rsConfig]) {
      const slowest = Math.min(...cfg.speed.map((s) => s.multiplier)), fastest = Math.max(...cfg.speed.map((s) => s.multiplier));
      const heli = cfg.tiers.find((t) => t.rare)!, best = Math.max(...cfg.tiers.filter((t) => !t.rare).map((t) => t.km));
      expect(Math.round(heli.km * slowest)).toBeGreaterThan(Math.round(best * fastest));
    }
  });
  it("km s brzinom", () => {
    expect(scoreKm(hrConfig, 0.1, 4000).km).toBe(195); // 150 × 1,3
    expect(scoreKm(hrConfig, 3, 9000).km).toBe(97); // 84 × 1,15
    expect(scoreKm(hrConfig, 30, 24000).km).toBe(11); // 12 × 0,9
    // 8 aviona normalnom brzinom stigne točno u Dubrovnik
    expect(8 * scoreKm(hrConfig, 0, 15000).km).toBe(hrConfig.maxKm);
  });
  it("stare km prijevoza za partije prije promjene", () => {
    for (const cfg of [hrConfig, baConfig, rsConfig]) {
      const old = configOn(cfg, "2026-11-01");
      expect(old.tiers.map((t) => t.km)).toEqual([10, 25, 45, 70, 100, 125, 185]);
      expect(old.tiers.map((t) => t.name)).toEqual(cfg.tiers.map((t) => t.name));
      expect(configOn(cfg, "2026-11-02")).toBe(cfg);
      // tier iz današnje konfiguracije dobije km dana partije
      const plane = cfg.tiers.find((t) => t.vehicle === "plane")!;
      expect(kmFor(old, plane, 4000).km).toBe(163);
      expect(kmFor(cfg, plane, 4000).km).toBe(195);
    }
    const old = configOn(hrConfig, "2026-10-30");
    expect(landingAt(old, 1401).name).toBe("Budva");
    expect(landingAt(old, 1400).name).toBe("Dubrovnik");
    expect(8 * scoreKm(old, 0, 15000).km).toBe(1000);
  });
});

describe("day", () => {
  it("ponoć po zagrebačkom vremenu", () => {
    // 22:30 UTC 21.10. = 00:30 22.10. u Zagrebu (ljetno vrijeme)
    expect(localDate("Europe/Zagreb", new Date("2026-10-21T22:30:00Z"))).toBe("2026-10-22");
  });
  it("broj dana", () => {
    expect(dayNumber("2026-10-21", "2026-10-21")).toBe(1);
    expect(dayNumber("2026-10-21", "2026-11-01")).toBe(12);
  });
});

describe("priorForRank", () => {
  it("procjena smjesti odgovor u odabrani tier po rangu", () => {
    const others = Array.from({ length: 99 }, (_, i) => ({ share: 30 / (i + 1), rare: i === 98 }));
    hrConfig.tiers.forEach((t, i) => {
      const prior = priorForRank(hrConfig.tiers, i, others);
      const all = [...others, { share: prior, rare: !!t.rare, me: true }].sort((a, b) => b.share - a.share);
      const tiers = assignTiers(hrConfig, all);
      expect(tiers[all.findIndex((a) => "me" in a)].name).toBe(t.name);
    });
  });
  it("radi i u maloj kategoriji", () => {
    const others = [{ share: 40 }, { share: 20 }, { share: 5 }];
    const prior = priorForRank(hrConfig.tiers, 0, others);
    expect(prior).toBeGreaterThan(20);
  });
});
