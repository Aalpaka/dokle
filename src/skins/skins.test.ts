import { describe, expect, it } from "vitest";
import { hrCategories } from "./hr/categories";
import { HR_SPECIFIC, regionalCategories } from "./regional";
import { codeConfigs, maps } from "./maps";
import { SKIN_IDS, switchPath } from "./meta";
import { Route } from "@/lib/route";
import { dictionaries, translate } from "@/i18n";

describe("skinovi", () => {
  it.each(SKIN_IDS)("%s: ruta od 0 do maxKm, postaje rastu, karta ima dionicu za svaki par postaja", (id) => {
    const cfg = codeConfigs[id], map = maps[id];
    const km = cfg.stations.map((s) => s.km);
    expect(km[0]).toBe(0);
    expect(km.at(-1)).toBe(cfg.maxKm);
    expect(km.every((k, i) => i === 0 || k > km[i - 1])).toBe(true);
    expect(map.via.length).toBe(cfg.stations.length - 1);
    // svaka postaja i međutočka leži na slici karte
    const r = new Route(cfg.stations, map.via);
    for (let k = 0; k <= cfg.maxKm; k += 10) {
      const p = r.at(k);
      expect(p.x).toBeGreaterThan(map.image.x);
      expect(p.x).toBeLessThan(map.image.x + map.image.width);
      expect(p.y).toBeGreaterThan(map.image.y);
      expect(p.y).toBeLessThan(map.image.y + map.image.height);
    }
  });

  it.each(["ba", "rs"])("%s: isti km po prijevozu kao Hrvatska, bez logotipa i hrvatskih easter eggova", (id) => {
    const cfg = codeConfigs[id], hr = codeConfigs.hr;
    expect(cfg.tiers.map((t) => t.km)).toEqual(hr.tiers.map((t) => t.km));
    expect(cfg.tiers.map((t) => [t.vehicle, !!t.rare])).toEqual(hr.tiers.map((t) => [t.vehicle, !!t.rare]));
    expect(cfg.tiers.some((t) => t.icon || t.badge)).toBe(false);
    expect(cfg.overshoot).toBeUndefined();
    expect(maps[id].heliClip).toBeFalsy();
    expect(maps[id].landmarks.some((l) => l.kind === "crash")).toBe(false);
  });

  it("Srbija prolazi kroz Kosovo bez stajanja, s natpisom", () => {
    const l = maps.rs.landmarks.find((x) => x.name === "Kosovo")!;
    expect(l.kind).toBe("pass");
    expect(l.message).toBeTruthy();
    expect(maps.rs.dashedBorder).toBeTruthy();
    const km = new Route(codeConfigs.rs.stations, maps.rs.via).kmNear(l.lon, l.lat);
    expect(km).toBeGreaterThan(1015);
    expect(km).toBeLessThan(1200);
  });

  it("kategorije izvan Hrvatske: bez grupe Hrvatska i bez hrvatskih tema, dovoljno za raspored", () => {
    const cats = regionalCategories(hrCategories, "srpski");
    expect(cats.some((c) => c.group === "hr")).toBe(false);
    expect(cats.some((c) => HR_SPECIFIC.has(c.slug))).toBe(false);
    // svaki izbačeni slug postoji (zaštita od tipfelera)
    for (const s of HR_SPECIFIC) expect(hrCategories.some((c) => c.slug === s)).toBe(true);
    for (const g of ["opce", "kviz", "zaigrano"]) expect(cats.filter((c) => c.group === g).length).toBeGreaterThanOrEqual(40);
    expect(cats.find((c) => c.slug === "drzava-b-m")!.hint).toBe("Srpski naziv");
    for (const id of ["ba", "rs"]) expect(new Set(codeConfigs[id].dailyPattern)).toEqual(new Set(["opce", "kviz", "zaigrano"]));
  });

  it("prelazak u drugu zemlju zadržava stranicu", () => {
    expect(switchPath("/", "ba")).toBe("/ba");
    expect(switchPath("/ba", "hr")).toBe("/");
    expect(switchPath("/ba/lige", "rs")).toBe("/rs/lige");
    expect(switchPath("/profil", "rs")).toBe("/rs/profil");
    expect(switchPath("/rs/liga/ABC123", "ba")).toBe("/ba/lige");
    expect(switchPath("/admin", "ba")).toBe("/ba");
  });

  it("prijevodi: isti {x} kao u hrvatskom tekstu", () => {
    for (const d of Object.values(dictionaries))
      for (const [hr, tr] of Object.entries(d)) expect((tr.match(/\{\w+\}/g) ?? []).sort()).toEqual((hr.match(/\{\w+\}/g) ?? []).sort());
    expect(translate("sr", "Cijela ruta")).toBe("Cela ruta");
    expect(translate("hr", "Kreni iz {mjesta}", { mjesta: "Vukovara" })).toBe("Kreni iz Vukovara");
  });
});
