import { describe, expect, it } from "vitest";
import { pickCategories, plannedSlugs, type PoolCategory } from "./pick";

const cat = (id: number, group: string, open = false): PoolCategory => ({ id, group, slug: `k${id}`, open });

describe("pickCategories", () => {
  it("uzima najdulje nekorištene po grupama", () => {
    const pool = [cat(1, "a"), cat(2, "b"), cat(3, "a"), cat(4, "b")];
    expect(pickCategories(["a", "b", "a", "b"], pool)).toEqual([1, 2, 3, 4]);
  });

  it("najviše jedno jako otvoreno pitanje dnevno", () => {
    const pool = [cat(1, "z", true), cat(2, "k", true), cat(3, "z", true), cat(4, "k"), cat(5, "z")];
    expect(pickCategories(["z", "k", "z"], pool)).toEqual([1, 4, 5]);
  });

  it("otvoreno ipak uđe kad grupa nema ništa drugo", () => {
    const pool = [cat(1, "z", true), cat(2, "z", true)];
    expect(pickCategories(["z", "z"], pool)).toEqual([1, 2]);
  });

  it("skin koji prati drugi uzima iste slugove, i otvorene", () => {
    const pool = [cat(1, "z", true), cat(2, "z", true), cat(3, "z")];
    expect(pickCategories(["z", "z"], pool, ["k2", "k1"])).toEqual([2, 1]);
  });

  it("bez dovoljno kategorija baca grešku", () => {
    expect(() => pickCategories(["a", "a"], [cat(1, "a")])).toThrow(/grupi a/);
  });
});

describe("plannedSlugs", () => {
  const pool = [cat(1, "a"), cat(2, "b"), cat(3, "a"), cat(4, "b")];

  it("uzima prvog nekorištenog kandidata iz prave grupe", () => {
    expect(plannedSlugs(["a", "b"], [["k1", "k3"], ["k2"]], pool, new Set(["k1"]))).toEqual(["k3", "k2"]);
  });

  it("isti kandidat ne ide na dva mjesta, a mjesto bez kandidata ostaje prazno", () => {
    expect(plannedSlugs(["a", "a", "b"], [["k1"], ["k1"], ["k3", "nema"]], pool, new Set())).toEqual(["k1", null, null]);
  });

  it("pickCategories popuni prazna mjesta", () => {
    const wanted = plannedSlugs(["a", "b", "a", "b"], [["k3"], [], [], ["k2"]], pool, new Set());
    expect(pickCategories(["a", "b", "a", "b"], pool, wanted)).toEqual([3, 4, 1, 2]);
  });
});
