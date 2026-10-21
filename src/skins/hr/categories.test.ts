import { describe, expect, it } from "vitest";
import { fold, parseSeedAnswers } from "@/lib/matcher";
import { hrCategories } from "./categories";
import { hrConfig } from "./config";

const key = (s: string) => fold(s).replace(/ /g, "");

describe("hr kategorije", () => {
  it("slugovi su jedinstveni", () => {
    const slugs = hrCategories.map((c) => c.slug);
    expect(slugs.length).toBe(new Set(slugs).size);
  });

  it("svaka grupa iz rasporeda ima dovoljno kategorija", () => {
    for (const c of hrCategories) expect(Object.keys(hrConfig.groups)).toContain(c.group);
    for (const g of Object.keys(hrConfig.groups)) {
      const n = hrCategories.filter((c) => c.group === g).length;
      expect(n, g).toBeGreaterThanOrEqual(20);
    }
  });

  it.each(hrCategories.map((c) => [c.slug, c] as const))("%s: odgovori su ispravni", (_slug, c) => {
    const answers = parseSeedAnswers(c.answers);
    expect(answers.length).toBeGreaterThanOrEqual(25);
    const canon = answers.map((a) => a.canonical);
    expect(canon.filter((x, i) => canon.indexOf(x) !== i), "dupli odgovori").toEqual([]);
    const owner = new Map<string, string>();
    for (const a of answers) {
      expect(a.canonical, c.answers.slice(0, 40)).toBeTruthy();
      expect(Number.isFinite(a.share) && a.share > 0, `${a.canonical}=${a.share}`).toBe(true);
      for (const v of [a.canonical, ...a.variants]) {
        const k = key(v);
        expect(k, `prazna varijanta kod ${a.canonical}`).toBeTruthy();
        // ista varijanta ne smije voditi na dva različita odgovora
        const prev = owner.get(k);
        expect(prev === undefined || prev === a.canonical, `"${v}" je i kod ${prev} i kod ${a.canonical}`).toBe(true);
        owner.set(k, a.canonical);
      }
    }
    const total = answers.reduce((s, a) => s + a.share, 0);
    expect(total).toBeGreaterThan(60);
    expect(total).toBeLessThan(130);
    // helikopter: 1 najrjeđi odgovor, 2 u kategorijama sa 60+ odgovora
    const rare = answers.filter((a) => a.rare);
    expect(rare.length, "broj helikoptera").toBe(answers.length >= 60 ? 2 : 1);
    for (const a of rare) expect(a.share, a.canonical).toBeLessThanOrEqual(0.3);
  });
});
