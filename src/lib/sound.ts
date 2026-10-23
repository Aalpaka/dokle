"use client";

import { useSyncExternalStore } from "react";
import type { Vehicle } from "@/skins/types";

// Zvukovi su sintetizirani Web Audiom, osim snimki iz public/sounds (helikopter). Zvuk smije krenuti tek
// nakon korisnikove interakcije, pa se kontekst otvara na prvi klik ili tipku.

const KEY = "dokle-mute";
let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let noiseBuf: AudioBuffer | null = null;
const samples: Partial<Record<string, AudioBuffer>> = {};
const SAMPLES = { heli: "/sounds/helikopter.mp3" };
let muted = false;
const listeners = new Set<() => void>();

if (typeof window !== "undefined") {
  try {
    muted = localStorage.getItem(KEY) === "1";
  } catch {}
  // Mobilni preglednici zvuk otključavaju tek na dodir koji se računa kao gesta (touchend, click), ne na
  // pointerdown, pa se pokušava na svaki od njih dok kontekst ne proradi.
  const events = ["pointerdown", "pointerup", "touchend", "click", "keydown"] as const;
  const unlock = () => {
    if (!init() || !ctx) return;
    // iOS: tihi zvuk unutar geste otvara audio, a "playback" sesija svira i kad je zvono utišano
    const nav = navigator as Navigator & { audioSession?: { type: string } };
    if (nav.audioSession) nav.audioSession.type = "playback";
    const s = ctx.createBufferSource();
    s.buffer = ctx.createBuffer(1, 1, ctx.sampleRate);
    s.connect(ctx.destination);
    s.start(0);
    void ctx.resume().then(() => {
      if (ctx?.state === "running") events.forEach((e) => window.removeEventListener(e, unlock, true));
    });
  };
  events.forEach((e) => window.addEventListener(e, unlock, true));
}

function init(): boolean {
  if (ctx) {
    if (ctx.state === "suspended") void ctx.resume();
    return true;
  }
  const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return false;
  ctx = new AC();
  master = ctx.createGain();
  master.gain.value = muted ? 0 : 0.7;
  master.connect(ctx.destination);
  noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
  const d = noiseBuf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  for (const [k, url] of Object.entries(SAMPLES))
    fetch(url)
      .then((r) => r.arrayBuffer())
      .then((b) => ctx!.decodeAudioData(b))
      .then((buf) => (samples[k] = buf))
      .catch(() => {});
  return true;
}

// svaki zvuk preskače posao kad je zvuk isključen ili kontekst još nije otvoren
function ready(): AudioContext | null {
  if (muted || !ctx || ctx.state !== "running") return null;
  return ctx;
}

function env(g: GainNode, t0: number, a: number, peak: number, rel: number) {
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(peak, t0 + a);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + a + rel);
}

function tone(c: AudioContext, type: OscillatorType, f: number, t0: number, a: number, peak: number, rel: number, f2?: number) {
  const o = c.createOscillator(), g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(f, t0);
  if (f2) o.frequency.exponentialRampToValueAtTime(f2, t0 + a + rel);
  env(g, t0, a, peak, rel);
  o.connect(g).connect(master!);
  o.start(t0);
  o.stop(t0 + a + rel + 0.05);
}

function noise(c: AudioContext, t0: number, dur: number, type: BiquadFilterType, f: number, q: number, peak: number, a = 0.005) {
  const s = c.createBufferSource(), fl = c.createBiquadFilter(), g = c.createGain();
  s.buffer = noiseBuf;
  fl.type = type;
  fl.frequency.value = f;
  fl.Q.value = q;
  env(g, t0, a, peak, dur);
  s.connect(fl).connect(g).connect(master!);
  s.start(t0, Math.random());
  s.stop(t0 + a + dur + 0.05);
}

function engine(c: AudioContext, t: number, dur: number, bus: boolean) {
  const o = c.createOscillator(), o2 = c.createOscillator(), g = c.createGain(), fl = c.createBiquadFilter();
  o.type = "sawtooth";
  o2.type = "square";
  fl.type = "lowpass";
  fl.Q.value = 3;
  const f0 = bus ? 42 : 70, f1 = bus ? 70 : 190;
  o.frequency.setValueAtTime(f0, t);
  o.frequency.exponentialRampToValueAtTime(f1, t + dur * 0.6);
  o.frequency.exponentialRampToValueAtTime(f0 * 1.1, t + dur);
  o2.frequency.setValueAtTime(f0 / 2, t);
  o2.frequency.exponentialRampToValueAtTime(f1 / 2, t + dur * 0.6);
  fl.frequency.setValueAtTime(bus ? 260 : 420, t);
  fl.frequency.linearRampToValueAtTime(bus ? 500 : 1400, t + dur * 0.6);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.16, t + 0.15);
  g.gain.setValueAtTime(0.16, t + dur * 0.75);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(fl);
  o2.connect(fl);
  fl.connect(g).connect(master!);
  o.start(t);
  o2.start(t);
  o.stop(t + dur + 0.05);
  o2.stop(t + dur + 0.05);
  if (bus) noise(c, t + dur - 0.1, 0.45, "highpass", 3000, 0.7, 0.18, 0.02); // zračna kočnica
  else noise(c, t + dur * 0.45, 0.6, "bandpass", 900, 0.8, 0.12, 0.25); // prolazak
}

const clips = new Map<string, Promise<AudioBuffer | null>>();
let clipEnd = 0;

function loadClip(c: AudioContext, url: string) {
  let p = clips.get(url);
  if (!p) {
    p = fetch(url)
      .then((r) => (r.ok ? r.arrayBuffer() : null))
      .then((b) => (b ? c.decodeAudioData(b) : null))
      .catch(() => null);
    clips.set(url, p);
  }
  return p;
}

export const sfx = {
  tick() {
    const c = ready();
    if (c) tone(c, "square", 1250, c.currentTime, 0.002, 0.05, 0.05);
  },
  type() {
    const c = ready();
    if (c) noise(c, c.currentTime, 0.025, "highpass", 3500, 0.7, 0.05);
  },
  wrong() {
    const c = ready();
    if (!c) return;
    const t = c.currentTime;
    tone(c, "square", 180, t, 0.005, 0.12, 0.16, 110);
    tone(c, "square", 140, t + 0.13, 0.005, 0.12, 0.22, 90);
  },
  /** Odbrojavanje: kratki ton za 3, 2, 1 i viši za start. */
  count(go: boolean) {
    const c = ready();
    if (c) tone(c, "triangle", go ? 1320 : 660, c.currentTime, 0.005, 0.2, go ? 0.45 : 0.18);
  },
  correct() {
    const c = ready();
    if (!c) return;
    [784, 988, 1319].forEach((f, i) => tone(c, "triangle", f, c.currentTime + i * 0.07, 0.005, 0.22, 0.3));
  },
  /** Sudar: tresak, škripa metala i staklo koje se rasipa. */
  crash() {
    const c = ready();
    if (!c) return;
    const t = c.currentTime;
    tone(c, "sawtooth", 1400, t, 0.01, 0.06, 0.35, 700);
    noise(c, t + 0.3, 0.5, "lowpass", 600, 0.7, 0.9);
    noise(c, t + 0.3, 0.25, "bandpass", 2200, 1.5, 0.35);
    tone(c, "square", 90, t + 0.3, 0.005, 0.25, 0.3, 40);
    for (let i = 0; i < 9; i++) tone(c, "sine", 2800 + Math.random() * 3200, t + 0.42 + i * 0.045 + Math.random() * 0.03, 0.002, 0.05, 0.12);
  },
  /** Snimljeni isječak iz public/; ako datoteke nema, ništa se ne čuje. Isječci se ne preklapaju, novi čeka kraj prethodnog. */
  clip(url: string, delay = 0) {
    const c = ready();
    if (!c) return;
    const at = c.currentTime + delay;
    loadClip(c, url).then((buf) => {
      if (!buf || !ready()) return;
      const s = c.createBufferSource();
      s.buffer = buf;
      s.connect(master!);
      const start = Math.max(at, c.currentTime, clipEnd);
      clipEnd = start + buf.duration;
      s.start(start);
    });
  },
  station() {
    const c = ready();
    if (!c) return;
    [1568, 2093].forEach((f, i) => {
      tone(c, "sine", f, c.currentTime + i * 0.12, 0.003, 0.18, 0.9);
      tone(c, "sine", f * 2.76, c.currentTime + i * 0.12, 0.003, 0.04, 0.4);
    });
  },
  miss() {
    const c = ready();
    if (!c) return;
    [392, 370, 349, 311].forEach((f, i) => tone(c, "sawtooth", f, c.currentTime + i * 0.22, 0.01, 0.09, i === 3 ? 0.7 : 0.2, i === 3 ? 260 : undefined));
  },
  finish() {
    const c = ready();
    if (!c) return;
    [523, 659, 784, 1047, 784, 1047].forEach((f, i) => tone(c, "triangle", f, c.currentTime + i * 0.13, 0.01, 0.22, i > 3 ? 0.6 : 0.18));
  },
  vehicle(v: Vehicle, dur: number, heliClip = true) {
    const c = ready();
    if (!c) return;
    const t = c.currentTime;
    if (v === "walk") {
      for (let s = 0; s < dur - 0.1; s += 0.42) noise(c, t + s, 0.09, "lowpass", 700, 1, 0.5);
    } else if (v === "bike") {
      for (const d of [0, 0.2]) {
        tone(c, "sine", 2350, t + d, 0.002, 0.16, 0.7);
        tone(c, "sine", 3420, t + d, 0.002, 0.06, 0.4);
      }
      for (let s = 0.4; s < dur - 0.1; s += 0.11) noise(c, t + s, 0.015, "highpass", 4500, 1, 0.08);
    } else if (v === "train") {
      for (const f of [311, 370]) {
        const o = c.createOscillator(), g = c.createGain(), fl = c.createBiquadFilter();
        o.type = "sawtooth";
        o.frequency.value = f;
        fl.type = "lowpass";
        fl.frequency.value = 1400;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.09, t + 0.05);
        g.gain.setValueAtTime(0.09, t + 0.6);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.8);
        o.connect(fl).connect(g).connect(master!);
        o.start(t);
        o.stop(t + 0.85);
      }
      for (let s = 0.7; s < dur - 0.2; s += 0.62) {
        noise(c, t + s, 0.06, "lowpass", 400, 1, 0.5);
        noise(c, t + s + 0.15, 0.06, "lowpass", 400, 1, 0.45);
      }
    } else if (v === "bus" || v === "car") {
      engine(c, t, dur, v === "bus");
    } else if (v === "plane") {
      const s = c.createBufferSource(), fl = c.createBiquadFilter(), g = c.createGain();
      s.buffer = noiseBuf;
      s.loop = true;
      fl.type = "bandpass";
      fl.Q.value = 1.2;
      fl.frequency.setValueAtTime(300, t);
      fl.frequency.exponentialRampToValueAtTime(2600, t + dur * 0.5);
      fl.frequency.exponentialRampToValueAtTime(400, t + dur + 0.4);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.5, t + dur * 0.5);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.5);
      s.connect(fl).connect(g).connect(master!);
      s.start(t);
      s.stop(t + dur + 0.6);
      tone(c, "sine", 220, t, 0.3, 0.05, dur, 440);
    } else if (v === "heli") {
      // "Vežite se, polijećemo!" pa elisa, koja ubrzava pri uzlijetanju
      const clip = heliClip ? samples.heli : undefined;
      if (clip) {
        const src = c.createBufferSource(), g = c.createGain();
        src.buffer = clip;
        g.gain.value = 1.3;
        src.connect(g).connect(master!);
        src.start(t);
      }
      let s = clip ? 0.6 : 0, gap = 0.16;
      while (s < dur) {
        noise(c, t + s, 0.05, "lowpass", 380, 1.4, clip && s < 1.5 ? 0.3 : 0.7);
        noise(c, t + s, 0.02, "bandpass", 1600, 2, 0.12);
        s += gap;
        gap = Math.max(0.075, gap * 0.93);
      }
      tone(c, "sawtooth", 95, t, 0.4, 0.03, dur, 120);
    }
  },
};

export function setMuted(m: boolean) {
  muted = m;
  try {
    localStorage.setItem(KEY, m ? "1" : "0");
  } catch {}
  if (ctx && master) master.gain.setTargetAtTime(m ? 0 : 0.7, ctx.currentTime, 0.02);
  if (!m && init()) sfx.correct();
  listeners.forEach((l) => l());
}

/** Je li zvuk isključen; na serveru uvijek false. */
export function useMuted(): boolean {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => muted,
    () => false,
  );
}
