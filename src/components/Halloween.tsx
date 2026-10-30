"use client";

import { useEffect, useSyncExternalStore } from "react";
import { halloweenPreview, isHalloweenDay } from "@/lib/halloween";

// tema se uključuje skriptom u <head> (HALLOWEEN_SCRIPT); ovdje se svaku minutu provjerava je li dan prošao
let on = false;
const subs = new Set<() => void>();

function set(next: boolean) {
  if (next === on) return;
  on = next;
  if (on) document.documentElement.setAttribute("data-theme", "halloween");
  else document.documentElement.removeAttribute("data-theme");
  subs.forEach((f) => f());
}

function check() {
  let storage: Storage | null = null;
  try {
    storage = window.sessionStorage;
  } catch {}
  set(isHalloweenDay() || halloweenPreview(location.search, storage));
}

const subscribe = (f: () => void) => {
  subs.add(f);
  return () => subs.delete(f);
};

/** Je li danas Noć vještica (ili pregled s ?halloween=1). Na serveru i u prvom crtanju uvijek false. */
export function useHalloween() {
  return useSyncExternalStore(subscribe, () => on, () => false);
}

// šišmiši: različite visine, brzine i kašnjenja, da ne lete u stroju
const BATS = [
  { top: "14%", dur: 19, delay: 2, size: 34 },
  { top: "32%", dur: 26, delay: 11, size: 22 },
  { top: "8%", dur: 23, delay: 17, size: 26 },
];

const BAT_PATH =
  "M32 14c-2 0-3 2-3 4-3-5-9-8-16-7 3 2 4 5 3 8-4-2-9-1-13 2 5 1 9 4 11 8 2-3 6-4 9-2 2 2 5 3 9 3s7-1 9-3c3-2 7-1 9 2 2-4 6-7 11-8-4-3-9-4-13-2-1-3 0-6 3-8-7-1-13 2-16 7 0-2-1-4-3-4z";

/** Ukrasi za Noć vještica (šišmiši preko stranice); boje i ostalo su u globals.css pod html[data-theme="halloween"]. */
export default function Halloween() {
  const active = useHalloween();
  useEffect(() => {
    check();
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, []);
  if (!active) return null;
  return (
    <div className="hw-bats" aria-hidden="true">
      {BATS.map((b, i) => (
        <span key={i} style={{ top: b.top, animationDuration: `${b.dur}s`, animationDelay: `${b.delay}s`, width: b.size } as React.CSSProperties}>
          <svg viewBox="0 0 64 36"><path d={BAT_PATH} /></svg>
        </span>
      ))}
    </div>
  );
}
