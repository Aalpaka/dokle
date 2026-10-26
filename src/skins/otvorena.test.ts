import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { hrCategories } from "./hr/categories";
import { OTVORENA } from "./otvorena";

describe("jako otvorena pitanja", () => {
  it("svaki slug postoji", () => {
    const slugs = new Set(hrCategories.map((c) => c.slug));
    expect([...OTVORENA].filter((s) => !slugs.has(s))).toEqual([]);
  });

  it("migracija 0012 označi iste", () => {
    const sql = readFileSync(new URL("../../drizzle/0012_otvorena_pitanja.sql", import.meta.url), "utf8");
    const listed = [...sql.matchAll(/'([a-z0-9-]+)'/g)].map((m) => m[1]);
    expect(new Set(listed)).toEqual(OTVORENA);
  });
});
