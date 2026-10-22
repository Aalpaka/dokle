import { describe, expect, it } from "vitest";
import { compareDay } from "./compare";
import { hrConfig as hr } from "@/skins/hr/config";

describe("compareDay", () => {
  it("sam igrač nema postotak", () => {
    const c = compareDay(hr, [300], 300);
    expect(c).toMatchObject({ players: 1, ahead: null, avgKm: 300, bestKm: 300 });
  });
  it("postotak ostalih s manje km", () => {
    // ostali: 100, 200, 500, 600 -> 2 od 4 iza
    expect(compareDay(hr, [100, 200, 400, 500, 600], 400).ahead).toBe(50);
    expect(compareDay(hr, [100, 200, 400], 400).ahead).toBe(100);
    expect(compareDay(hr, [400, 500, 600], 400).ahead).toBe(0);
  });
  it("izjednačeni nisu iza", () => {
    expect(compareDay(hr, [300, 300, 300], 300).ahead).toBe(0);
  });
  it("mjesto i najdalji grad", () => {
    expect(compareDay(hr, [100, 700, 700, 900], 700)).toMatchObject({ rank: 2, players: 4, bestKm: 900, bestTown: "Split" });
    expect(compareDay(hr, [700, 1423], 1423)).toMatchObject({ rank: 1, bestTown: "Budva" });
  });
});
