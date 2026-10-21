import { describe, expect, it } from "vitest";
import { assignTiers, blendedShare, commonCount, priorForTier, scoreKm, speedFor, stationAt, tierFor } from "./scoring";
import { dayNumber, localDate } from "./day";
import { hrConfig } from "@/skins/hr/config";

describe("scoring", () => {
  it("bez igrača vraća procjenu", () => {
    expect(blendedShare(22, 0, 0, 50)).toBe(22);
  });
  it("s puno igrača prevladava stvarni udio", () => {
    expect(blendedShare(22, 1, 1000, 50)).toBeCloseTo((50 * 22 + 100) / 1050);
  });
  it("tierovi", () => {
    expect(tierFor(hrConfig, 22).km).toBe(10);
    expect(tierFor(hrConfig, 0.4).km).toBe(125);
    expect(tierFor(hrConfig, 2).km).toBe(70);
  });
  it("najčešći odgovori uvijek pješice", () => {
    expect(commonCount(30)).toBe(2);
    expect(commonCount(50)).toBe(3);
    expect(commonCount(120)).toBe(4);
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
    const lost = base.map((a, i) => (i === 20 ? { ...a, rare: true, share: 2.5, n: 6 } : a));
    expect(heli(lost)).toEqual([29]);
    // 60+ odgovora: dva helikoptera
    expect(heli(Array.from({ length: 70 }, (_, i) => ({ share: 10 - i * 0.1, n: 0, rare: false })))).toEqual([68, 69]);
  });
  it("helikopter samo za označene najrjeđe odgovore", () => {
    expect(tierFor(hrConfig, 0.05).name).toBe("Croatia Airlines");
    expect(tierFor(hrConfig, 0.05, true).name).toBe("Milanovićev helikopter");
    expect(tierFor(hrConfig, 0.05, true).km).toBe(150);
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
  it("brzina", () => {
    expect(speedFor(hrConfig, 3000).multiplier).toBe(1.3);
    expect(speedFor(hrConfig, 5000).multiplier).toBe(1.3);
    expect(speedFor(hrConfig, 9000).multiplier).toBe(1.15);
    expect(speedFor(hrConfig, 15000).multiplier).toBe(1);
    expect(speedFor(hrConfig, 26000).multiplier).toBe(0.9);
  });
  it("km s brzinom", () => {
    expect(scoreKm(hrConfig, 0.1, 4000).km).toBe(163); // 125 × 1,3
    expect(scoreKm(hrConfig, 3, 9000).km).toBe(81); // 70 × 1,15
    expect(scoreKm(hrConfig, 30, 24000).km).toBe(9); // 10 × 0,9
    expect(8 * scoreKm(hrConfig, 0, 0).km).toBeGreaterThan(hrConfig.maxKm);
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
