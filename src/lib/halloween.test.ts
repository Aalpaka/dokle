import { describe, expect, it, vi } from "vitest";
import { HALLOWEEN_KEY, HALLOWEEN_SCRIPT, halloweenPreview, isHalloweenDay } from "./halloween";

function memoryStorage() {
  const m = new Map<string, string>();
  return { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => void m.set(k, v), removeItem: (k: string) => void m.delete(k) };
}

/** Pokrene skriptu iz <head> s lažnim preglednikom i vrati je li postavila temu. */
function runScript(now: string, search = "", storage = memoryStorage()) {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(now));
  const attrs: Record<string, string> = {};
  const document = { documentElement: { setAttribute: (k: string, v: string) => (attrs[k] = v) } };
  new Function("location", "sessionStorage", "document", HALLOWEEN_SCRIPT)({ search }, storage, document);
  vi.useRealTimers();
  return attrs["data-theme"] === "halloween";
}

describe("Noć vještica", () => {
  it("traje od ponoći do ponoći po zagrebačkom vremenu", () => {
    expect(isHalloweenDay(new Date("2026-10-30T22:59:59Z"))).toBe(false);
    expect(isHalloweenDay(new Date("2026-10-30T23:00:00Z"))).toBe(true); // 31. 10. 00:00 u Zagrebu
    expect(isHalloweenDay(new Date("2026-10-31T22:59:59Z"))).toBe(true);
    expect(isHalloweenDay(new Date("2026-10-31T23:00:00Z"))).toBe(false); // 1. 11. 00:00 u Zagrebu
    expect(isHalloweenDay(new Date("2027-10-31T12:00:00Z"))).toBe(true);
  });

  it("pregled s ?halloween=1 pamti se do ?halloween=0", () => {
    const s = memoryStorage();
    expect(halloweenPreview("", s)).toBe(false);
    expect(halloweenPreview("?halloween=1", s)).toBe(true);
    expect(s.getItem(HALLOWEEN_KEY)).toBe("1");
    expect(halloweenPreview("", s)).toBe(true);
    expect(halloweenPreview("?halloween=0", s)).toBe(false);
    expect(halloweenPreview("?halloween=1", null)).toBe(true);
  });

  it("skripta u <head> odlučuje isto", () => {
    expect(runScript("2026-10-30T22:59:00Z")).toBe(false);
    expect(runScript("2026-10-30T23:00:00Z")).toBe(true);
    expect(runScript("2026-10-31T23:00:00Z")).toBe(false);
    expect(runScript("2026-10-30T08:00:00Z", "?halloween=1")).toBe(true);
    const s = memoryStorage();
    s.setItem(HALLOWEEN_KEY, "1");
    expect(runScript("2026-10-30T08:00:00Z", "", s)).toBe(true);
    expect(runScript("2026-10-30T08:00:00Z", "?halloween=0", s)).toBe(false);
  });
});
