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
  it("dionice po stanicama", () => {
    const c = compareDay(hr, [0, 59, 60, 1199, 1200, 1300], 60);
    expect(c.bins.length).toBe(hr.stations.length);
    expect(c.bins[0]).toBe(2); // Vukovar
    expect(c.bins[1]).toBe(1); // Osijek
    expect(c.bins[c.bins.length - 2]).toBe(1); // Ston
    expect(c.bins[c.bins.length - 1]).toBe(2); // Dubrovnik i dalje
    expect(c.bins.reduce((a, b) => a + b, 0)).toBe(6);
  });
});
