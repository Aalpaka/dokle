"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { halloweenPreview, isHalloweenDay } from "@/lib/halloween";
import { sfx } from "@/lib/sound";

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

// jumpscare: Game ga zove nakon prvog prihvaćenog odgovora; prikazuje ga <Halloween /> preko cijele stranice
let scareAt = 0;
const scareSubs = new Set<() => void>();

/** Monstrum i vrisak, samo dok je tema uključena i samo jednom po zemlji i danu (ne ponavlja se nakon osvježavanja). */
export function jumpscare(key: string) {
  if (!on) return;
  try {
    const k = "dokle-jumpscare:" + key;
    if (localStorage.getItem(k)) return;
    localStorage.setItem(k, "1");
  } catch {}
  sfx.scream();
  scareAt = Date.now();
  scareSubs.forEach((f) => f());
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

/** Ukrasi za Noć vještica (šišmiši preko stranice, jumpscare); boje i ostalo su u globals.css pod html[data-theme="halloween"]. */
export default function Halloween() {
  const active = useHalloween();
  useEffect(() => {
    check();
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, []);
  if (!active) return null;
  return (
    <>
      <Scare />
      <div className="hw-bats" aria-hidden="true">
        {BATS.map((b, i) => (
          <span key={i} style={{ top: b.top, animationDuration: `${b.dur}s`, animationDelay: `${b.delay}s`, width: b.size } as React.CSSProperties}>
            <svg viewBox="0 0 64 36"><path d={BAT_PATH} /></svg>
          </span>
        ))}
      </div>
    </>
  );
}

const SCARE_MS = 1700;

function Scare() {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const f = () => setShown(scareAt);
    scareSubs.add(f);
    return () => void scareSubs.delete(f);
  }, []);
  useEffect(() => {
    if (!shown) return;
    const id = setTimeout(() => setShown(0), SCARE_MS);
    return () => clearTimeout(id);
  }, [shown]);
  if (!shown) return null;
  return (
    <div className="hw-scare" key={shown} aria-hidden="true" onClick={() => setShown(0)}>
      <svg viewBox="0 0 400 440">
        <defs>
          <radialGradient id="hw-skin" cx="50%" cy="38%" r="60%">
            <stop offset="0" stopColor="#d9d3bf" />
            <stop offset=".65" stopColor="#8f8a74" />
            <stop offset="1" stopColor="#2b2a22" />
          </radialGradient>
          <radialGradient id="hw-eye" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#fff6a0" />
            <stop offset=".35" stopColor="#ff3b1f" />
            <stop offset="1" stopColor="#ff3b1f" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* glava: izdužena lubanja sa šiljatim ušima */}
        <path d="M200 18C110 18 52 88 50 178c-1 50 12 92 30 128 14 28 30 62 50 92 20 28 46 40 70 40s50-12 70-40c20-30 36-64 50-92 18-36 31-78 30-128C348 88 290 18 200 18z" fill="url(#hw-skin)" />
        <path d="M58 150L6 96l62 22zM342 150l52-54-62 22z" fill="#6f6a57" />
        {/* očne duplje i užarene zjenice */}
        <path d="M78 160c20-30 72-34 102-6-6 34-30 52-62 50-28-2-46-20-40-44z" fill="#0b0806" />
        <path d="M322 160c-20-30-72-34-102-6 6 34 30 52 62 50 28-2 46-20 40-44z" fill="#0b0806" />
        <circle cx="132" cy="172" r="26" fill="url(#hw-eye)" />
        <circle cx="268" cy="172" r="26" fill="url(#hw-eye)" />
        <circle cx="132" cy="172" r="5" fill="#fff" />
        <circle cx="268" cy="172" r="5" fill="#fff" />
        {/* nos i bore */}
        <path d="M200 206l-16 44h32z" fill="#1a1510" />
        <path d="M120 112c26-14 52-16 70-6M280 112c-26-14-52-16-70-6M96 236c10 14 20 20 34 22M304 236c-10 14-20 20-34 22" stroke="#3d3a2e" strokeWidth="5" fill="none" strokeLinecap="round" />
        {/* razjapljena usta sa zubima */}
        <path d="M118 282c24-18 140-18 164 0 6 50-22 118-82 120-60-2-88-70-82-120z" fill="#120404" />
        <path d="M124 286l14 34 12-38 14 40 12-42 12 44 12-44 12 42 12-40 14 38 14-34z" fill="#efe6c8" />
        <path d="M138 386l12-38 12 36 12-42 14 42 12-44 12 44 14-42 12 42 12-36 12 38z" fill="#e2d7b4" />
        {/* krv iz kutova usta */}
        <path d="M122 296c-2 22 0 44 4 62 2 6 6 6 7 0 1-18-1-40-5-60zM278 296c2 24 2 48-2 70-2 7-7 7-7 0-1-22 1-46 4-68z" fill="#9b0f0f" />
      </svg>
    </div>
  );
}
