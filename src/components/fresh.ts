"use client";

import { useSyncExternalStore } from "react";

// Mobitel drži karticu otvorenom satima i vraća je bez učitavanja (i iz bfcache-a na "natrag"). Stranice podatke
// dohvaćaju samo kad se otvore, pa bi pokazivale km od zadnjeg učitavanja, iako je admin u međuvremenu naknadno
// bodovao odgovor. Ključ se poveća kad se igrač vrati nakon AWAY_MS ili kad preglednik vrati stranicu iz bfcache-a.
const AWAY_MS = 30_000;

let version = 0;
let awayAt = 0;
let wired = false;
const subs = new Set<() => void>();

function bump() {
  version++;
  subs.forEach((f) => f());
}

function leave() {
  awayAt ||= Date.now();
}

function back() {
  const away = awayAt;
  awayAt = 0;
  if (away && Date.now() - away >= AWAY_MS) bump();
}

function wire() {
  if (wired) return;
  wired = true;
  document.addEventListener("visibilitychange", () => (document.visibilityState === "hidden" ? leave() : back()));
  // računalo: prozor u pozadini ostaje "visible"
  window.addEventListener("blur", leave);
  window.addEventListener("focus", back);
  window.addEventListener("pageshow", (e) => {
    if (e.persisted) {
      awayAt = 0;
      bump();
    }
  });
}

function subscribe(cb: () => void) {
  wire();
  subs.add(cb);
  return () => {
    subs.delete(cb);
  };
}

/** Broj koji se poveća kad se igrač vrati na staru karticu; staviti ga u ovisnosti efekta koji dohvaća podatke. */
export function useReturnKey() {
  return useSyncExternalStore(subscribe, () => version, () => 0);
}
