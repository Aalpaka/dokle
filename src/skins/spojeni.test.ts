import { describe, expect, it } from "vitest";
import { parseSeedAnswers } from "@/lib/matcher";
import { hrCategories } from "./hr/categories";
import { regionalCategories } from "./regional";
import { baContent } from "./ba/kategorije";
import { rsContent } from "./rs/kategorije";
import { spojeni } from "./spojeni";

const skins = { hr: hrCategories, ba: regionalCategories(hrCategories, baContent), rs: regionalCategories(hrCategories, rsContent) };

describe("spojeni duplikati", () => {
  it("spojeni naziv nije više zaseban odgovor, nego varijanta zadržanog", () => {
    let kept = 0;
    for (const [skin, cats] of Object.entries(skins))
      for (const c of cats) {
        const m = spojeni[c.slug];
        if (!m) continue;
        const list = parseSeedAnswers(c.answers);
        for (const [drop, keep] of Object.entries(m)) {
          expect(list.some((a) => a.canonical === drop), `${skin} ${c.slug}: ${drop}`).toBe(false);
          const k = list.find((a) => a.canonical === keep);
          if (k?.variants.includes(drop)) kept++;
        }
      }
    // svaki par iz spojeni.ts postoji barem u jednom skinu (inače je naziv krivo prepisan)
    const pairs = Object.values(spojeni).reduce((n, m) => n + Object.keys(m).length, 0);
    expect(kept).toBeGreaterThanOrEqual(pairs);
  });
});
