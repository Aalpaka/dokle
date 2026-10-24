import { describe, expect, it } from "vitest";
import { compareDay } from "./compare";
import { hrConfig as hr } from "@/skins/hr/config";

describe("compareDay", () => {
  it("sam igrač nema postotak", () => {
    const c = compareDay("hr", hr, [300], 300);
    expect(c).toMatchObject({ players: 1, ahead: null, avgKm: 300, bestKm: 300 });
  });
  it("postotak ostalih s manje km", () => {
    // ostali: 100, 200, 500, 600 -> 2 od 4 iza
    expect(compareDay("hr", hr, [100, 200, 400, 500, 600], 400).ahead).toBe(50);
    expect(compareDay("hr", hr, [100, 200, 400], 400).ahead).toBe(100);
    expect(compareDay("hr", hr, [400, 500, 600], 400).ahead).toBe(0);
  });
  it("izjednačeni nisu iza", () => {
    expect(compareDay("hr", hr, [300, 300, 300], 300).ahead).toBe(0);
  });
  it("stupci po 100 km s igračem, najdalji grad", () => {
    const c = compareDay("hr", hr, [100, 150, 700, 700, 750, 1423], 700);
    expect(c.hist.length).toBe(15); // 0–1499
    expect(c.hist[1]).toBe(2);
    expect(c.hist[7]).toBe(3); // igrač, izjednačeni i 750
    expect(c.mineBin).toBe(7);
    expect(c.hist[14]).toBe(1);
    expect(c).toMatchObject({ behind: 2, bestKm: 1423, bestTown: "Budva" });
    expect(compareDay("hr", hr, [700], 700).hist.length).toBe(13); // do maxKm 1200 (zadnji stupac 1200–1299)
  });
});
