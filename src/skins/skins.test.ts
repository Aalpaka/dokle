import { describe, expect, it } from "vitest";
import { hrCategories } from "./hr/categories";
import { HR_SPECIFIC, regionalCategories } from "./regional";
import { baContent } from "./ba/kategorije";
import { rsContent } from "./rs/kategorije";
import { parseSeedAnswers } from "@/lib/matcher";
import { codeConfigs, maps } from "./maps";
import { baBorder } from "./ba/mapGeo";
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

  it("ruta BiH ne izlazi iz granica države", () => {
    const polys = baBorder.split("M").filter(Boolean).map((d) => d.replace(/Z/g, "").split("L").map((p) => p.split(",").map(Number)));
    const inside = (x: number, y: number) => {
      let c = false;
      for (const poly of polys)
        for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
          const [xi, yi] = poly[i], [xj, yj] = poly[j];
          if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
        }
      return c;
    };
    const r = new Route(codeConfigs.ba.stations, maps.ba.via);
    const out = [];
    for (let k = 0; k <= codeConfigs.ba.maxKm; k += 2) if (!inside(r.at(k).x, r.at(k).y)) out.push(k);
    expect(out).toEqual([]);
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

  it.each([["ba", baContent], ["rs", rsContent]] as const)("%s: hrvatske teme imaju domaći par s istim slugom", (id, content) => {
    const cats = regionalCategories(hrCategories, content);
    const slugs = cats.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(cats.some((c) => c.group === "hr")).toBe(false);
    // domaće kategorije su parovi hrvatske grupe, zamjene i "izvan" verzije pokrivaju sve hrvatske teme iz općih grupa
    const hrGroup = new Set(hrCategories.filter((c) => c.group === "hr").map((c) => c.slug));
    for (const c of content.domestic) {
      expect(c.group).toBe(id);
      expect(hrGroup.has(c.slug)).toBe(true);
    }
    for (const c of content.replace) expect(hrCategories.find((h) => h.slug === c.slug)?.group).toBe(c.group);
    // svaka hrvatska kategorija ima par s istim slugom, pa sve tri države isti dan igraju "istu" kategoriju
    for (const h of hrCategories) expect(slugs, h.slug).toContain(h.slug);
    for (const g of ["opce", "kviz", "zaigrano", id]) expect(cats.filter((c) => c.group === g).length).toBeGreaterThanOrEqual(50);
    expect(cats.find((c) => c.slug === "drzava-b-m")!.hint).toBe(`${content.lang === "srpski" ? "Srpski" : "Bosanski"} naziv`);
    // "izvan" verzija nema domaći odgovor, a ima hrvatski
    const planina = parseSeedAnswers(cats.find((c) => c.slug === "svjetska-planina")!.answers).map((a) => a.canonical);
    expect(planina).toContain("Triglav");
    expect(planina).not.toContain(id === "ba" ? "Jahorina" : "Kopaonik");
    expect(planina).toContain("Velebit");
    for (const c of cats) expect(parseSeedAnswers(c.answers).every((a) => a.share > 0 && !a.canonical.includes("/"))).toBe(true);
    expect(new Set(codeConfigs[id].dailyPattern)).toEqual(new Set(["opce", "kviz", "zaigrano", id]));
    expect(codeConfigs[id].dailyPattern).toEqual(codeConfigs.hr.dailyPattern.map((g) => (g === "hr" ? id : g)));
    expect(codeConfigs[id].mirror).toBe("hr");
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
