import { addDays } from "./league";

/** Prvi dan javne (live) igre; sve prije toga je testna faza. Isti dan kreće i novo bodovanje (config.before.until). */
export const LIVE_FROM = "2026-11-02";

export type Phase = "test" | "live";

export function phaseOf(date: string): Phase {
  return date >= LIVE_FROM ? "live" : "test";
}

/**
 * Raspon datuma faze do danas (uključivo). Testna faza završava dan prije LIVE_FROM; live do danas.
 * `from` je null za test (od prvog dana), a `to` je null kad faza još nije počela.
 */
export function phaseRange(phase: Phase, today: string): { from: string | null; to: string | null } {
  if (phase === "test") {
    const last = addDays(LIVE_FROM, -1);
    return { from: null, to: today < last ? today : last };
  }
  return { from: LIVE_FROM, to: today >= LIVE_FROM ? today : null };
}

/**
 * Od kojeg datuma se gleda je li kategorija već bila za dan `date`: u live fazi se testna faza ne broji (pitanja iz
 * testa smiju se vratiti), a prije toga se broji sve.
 */
export function usedSince(date: string): string | null {
  return phaseOf(date) === "live" ? LIVE_FROM : null;
}
