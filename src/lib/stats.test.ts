import { describe, expect, it } from "vitest";
import { computeStats } from "./stats";

const d = (date: string, km = 100) => ({ date, km });

describe("computeStats", () => {
  it("bez partija", () => {
    expect(computeStats([], "2026-10-21")).toMatchObject({ played: 0, currentStreak: 0, longestStreak: 0 });
  });
  it("streak do danas", () => {
    const s = computeStats([d("2026-10-19"), d("2026-10-20"), d("2026-10-21")], "2026-10-21");
    expect(s).toMatchObject({ currentStreak: 3, longestStreak: 3 });
  });
  it("streak živi ako je zadnja partija jučer", () => {
    expect(computeStats([d("2026-10-19"), d("2026-10-20")], "2026-10-21").currentStreak).toBe(2);
  });
  it("prekinut streak", () => {
    const s = computeStats([d("2026-10-10"), d("2026-10-11"), d("2026-10-12"), d("2026-10-18")], "2026-10-21");
    expect(s).toMatchObject({ currentStreak: 0, longestStreak: 3 });
  });
  it("preko kraja mjeseca i km", () => {
    const s = computeStats([d("2026-10-31", 200), d("2026-11-01", 400)], "2026-11-01");
    expect(s).toMatchObject({ currentStreak: 2, avgKm: 300, bestKm: 400, played: 2 });
  });
});
