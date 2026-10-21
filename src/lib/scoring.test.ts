import { describe, expect, it } from "vitest";
import { blendedShare, stationAt, tierFor } from "./scoring";
import { dayNumber, localDate } from "./day";
import { hrConfig } from "@/skins/hr/config";

describe("scoring", () => {
  it("bez igrača vraća procjenu", () => {
    expect(blendedShare(22, 0, 0, 50)).toBe(22);
  });
  it("s puno igrača prevladava stvarni udio", () => {
    expect(blendedShare(22, 1, 1000, 50)).toBeCloseTo((50 * 22 + 100) / 1050);
  });
  it("tierovi", () => {
    expect(tierFor(hrConfig, 22).km).toBe(10);
    expect(tierFor(hrConfig, 0.4).km).toBe(125);
    expect(tierFor(hrConfig, 2).km).toBe(70);
  });
  it("postaje", () => {
    expect(stationAt(hrConfig, 0).name).toBe("Ilok");
    expect(stationAt(hrConfig, 339).name).toBe("Zagreb");
    expect(stationAt(hrConfig, 1000).name).toBe("Cavtat");
  });
});

describe("day", () => {
  it("ponoć po zagrebačkom vremenu", () => {
    // 22:30 UTC 21.10. = 00:30 22.10. u Zagrebu (ljetno vrijeme)
    expect(localDate("Europe/Zagreb", new Date("2026-10-21T22:30:00Z"))).toBe("2026-10-22");
  });
  it("broj dana", () => {
    expect(dayNumber("2026-10-21", "2026-10-21")).toBe(1);
    expect(dayNumber("2026-10-21", "2026-11-01")).toBe(12);
  });
});
