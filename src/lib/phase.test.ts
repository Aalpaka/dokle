import { describe, expect, it } from "vitest";
import { LIVE_FROM, phaseOf, phaseRange, usedSince } from "./phase";

describe("faze igre", () => {
  it("live kreće 2.11.2026.", () => {
    expect(LIVE_FROM).toBe("2026-11-02");
    expect(phaseOf("2026-11-01")).toBe("test");
    expect(phaseOf("2026-11-02")).toBe("live");
  });

  it("raspon faze do danas", () => {
    expect(phaseRange("test", "2026-10-31")).toEqual({ from: null, to: "2026-10-31" });
    expect(phaseRange("test", "2026-11-20")).toEqual({ from: null, to: "2026-11-01" });
    expect(phaseRange("live", "2026-10-31")).toEqual({ from: "2026-11-02", to: null });
    expect(phaseRange("live", "2026-11-20")).toEqual({ from: "2026-11-02", to: "2026-11-20" });
  });

  it("u live fazi testni dani ne znače da je pitanje već bilo", () => {
    expect(usedSince("2026-11-01")).toBeNull();
    expect(usedSince("2026-11-02")).toBe("2026-11-02");
  });
});
