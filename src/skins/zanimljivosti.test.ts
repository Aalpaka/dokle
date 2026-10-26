import { describe, expect, it } from "vitest";
import { parseSeedAnswers } from "@/lib/matcher";
import { hrCategories } from "./hr/categories";
import { zanimljivosti } from "./hr/kategorije/zanimljivosti";

describe("zanimljivosti", () => {
  it("svaka pripada postojećem odgovoru i stane u 300 znakova", () => {
    const bySlug = new Map(hrCategories.map((c) => [c.slug, new Set(parseSeedAnswers(c.answers).map((a) => a.canonical))]));
    const bad: string[] = [];
    for (const [slug, facts] of Object.entries(zanimljivosti)) {
      const canon = bySlug.get(slug);
      for (const [name, fact] of Object.entries(facts)) {
        if (!canon?.has(name)) bad.push(`${slug}: ${name}`);
        if (!fact.trim() || fact.length > 300) bad.push(`${slug}: ${name} (${fact.length} znakova)`);
      }
    }
    expect(bad).toEqual([]);
  });
});
