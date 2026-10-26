"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { RoundView } from "@/server/game";
import type { SkinConfig, SkinMap, Tier, Vehicle } from "@/skins/types";
import { formatShare, landingAt, routeKm, routeStations } from "@/lib/scoring";
import { placeAt } from "@/skins/mjesta";
import { Route, project, type Pt } from "@/lib/route";
import { sfx } from "@/lib/sound";
import { MISS_COLOR, crashSign, vehicleIcons } from "./vehicleIcons";
import { useT } from "./skin";
import { kmAfter } from "@/lib/league";
import type { RaceLeague, RaceRunner } from "@/server/leagues";
import { RacePanel, useRaceChoice } from "./Race";

// trajanje vožnje po vozilu (s); pješak je najsporiji, a prijeđe i najmanje km
// koliko kružić lige klizi do novog km (ms)
const GHOST_MS = 2200;

const DURATION: Record<Vehicle, number> = { walk: 3.4, bike: 3.0, train: 2.9, bus: 2.9, car: 2.6, plane: 2.8, heli: 3.2 };

const EASE: Record<Vehicle, (t: number) => number> = {
  walk: (t) => t,
  bike: (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2),
  train: (t) => (t < 0.2 ? 2.5 * t * t : t > 0.8 ? 1 - 2.5 * (1 - t) ** 2 : 0.1 + (t - 0.2) * 1.333),
  bus: (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2),
  car: (t) => (t < 0.5 ? 8 * t ** 4 : 1 - 8 * (1 - t) ** 4),
  plane: (t) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2),
  // helikopter prvo uzleti na mjestu, pa juri i sleti
  heli: (t) => (t < 0.18 ? 0 : t > 0.9 ? 1 : (1 - Math.cos(((t - 0.18) / 0.72) * Math.PI)) / 2),
};

// mobilna tipka kamere pokazuje u što se prebacuje
const WHOLE_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>';
const FOLLOW_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2.2" fill="currentColor"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg>';

type Segment = { a: number; b: number; tier: Tier };
type Anim = { tier: Tier; from: number; to: number; start: number; dur: number; seg: Segment; p0: Pt; p1: Pt; quiet: boolean; onDone?: () => void };
type Toast = { color: string; icon: string; logo: boolean; title: string; sub: string; km: string; id: number };

function tierOf(cfg: SkinConfig, r: RoundView): Tier | null {
  if (!r.canonical || r.km <= 0) return null;
  return cfg.tiers.find((t) => t.name === r.tier) ?? cfg.tiers.find((t) => t.emoji === r.emoji) ?? cfg.tiers[0];
}

function badgeHtml(t: Tier | null): { html: string; logo: boolean } {
  if (!t) return { html: vehicleIcons.miss, logo: false };
  const src = t.badge ?? t.icon;
  if (src) return { html: `<img src="${src}" alt="">`, logo: true };
  return { html: vehicleIcons[t.vehicle], logo: false };
}

/** Karta s vozilom. S `ended` na kraju igre automatski jednom pusti replay cijelog puta. */
export default function MapStage({ skinId, cfg, map, rounds, perDay, ended = false, inset = 0, race = null }: { skinId: string; cfg: SkinConfig; map: SkinMap; rounds: RoundView[]; perDay: number; ended?: boolean; inset?: number; race?: RaceLeague[] | null }) {
  // ruta ide i do postaje produžetka (easter egg), ali cesta se do nje ne crta dok je netko ne prijeđe
  const allStations = useMemo(() => routeStations(cfg), [cfg]);
  const route = useMemo(() => new Route(allStations, [...map.via, map.overshootVia ?? []]), [allStations, map.via, map.overshootVia]);
  const stations = useMemo(() => allStations.map((s) => project(s.lon, s.lat)), [allStations]);
  const fullRoad = useMemo(() => route.path(0, cfg.maxKm), [route, cfg.maxKm]);
  // mjesta uz cestu sa znakom sudara: kopnena vozila tu se zabiju u prolazu
  const landmarks = useMemo(() => map.landmarks.map((l) => ({ ...l, km: route.kmNear(l.lon, l.lat) })), [map.landmarks, route]);
  const crashes = landmarks.filter((l) => l.kind === "crash");
  const t = useT();

  const stageRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const segsRef = useRef<SVGGElement>(null);
  const trailRef = useRef<SVGPathElement>(null);
  const vehRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  // elementi na karti koji prate kameru: [element, točka, pomak "-50%" za centriranje, skriva li se natpis izdaleka]
  const pins = useRef<{ el: HTMLElement; p: Pt; center?: boolean; fade?: boolean }[]>([]);
  const stationEls = useRef<HTMLDivElement[]>([]);

  const [mode, setMode] = useState<"follow" | "whole">("follow");
  const modeRef = useRef(mode);
  modeRef.current = mode;
  // donji dio karte pokriven pločom s pitanjem (mobitel); kamera centrira u vidljivi dio
  const insetRef = useRef(inset);
  insetRef.current = inset;
  const [hudKm, setHudKm] = useState(() => rounds.reduce((a, r) => a + r.km, 0));
  const [toast, setToast] = useState<Toast | null>(null);
  const [arrival, setArrival] = useState<{ name: string; km: number; message: string; egg: boolean; pass?: boolean; id: number } | null>(null);
  const [replaying, setReplaying] = useState(false);

  // utrka lige: kružići članova stoje gdje su oni bili nakon jednakog broja kategorija kao igrač (step);
  // na kraju (Infinity) gdje su završili, a replay ih vozi kategoriju po kategoriju uz igrača
  const { league, pick } = useRaceChoice(race);
  const runners = league?.runners ?? [];
  const [raceStep, setStep] = useState(ended ? Infinity : rounds.length);
  const raceRef = useRef({ runners: [] as RaceRunner[], step: raceStep, v: 0 });
  if (raceRef.current.runners !== runners || raceRef.current.step !== raceStep) raceRef.current = { runners, step: raceStep, v: raceRef.current.v + 1 };
  const ghostEls = useRef(new Map<number, HTMLDivElement>());
  // vožnja kružića: od-do km i početak, da klize mirno kao vozilo
  const ghostKm = useRef(new Map<number, { from: number; to: number; start: number }>());

  // stanje simulacije; mijenja se u petlji animacije, ne kroz React
  const sim = useRef({
    km: 0,
    segments: [] as Segment[],
    anim: null as Anim | null,
    seen: -1,
    replay: 0,
    busyUntil: 0,
    cam: { x: 0, y: 0, w: 760 },
    pos: { x: 0, y: 0 },
    lift: 0,
    rot: 0,
    flip: 1,
    bob: 0,
  });

  function setVehicle(t: Tier | null) {
    const b = badgeRef.current, v = vehRef.current;
    if (!b || !v) return;
    const { html, logo } = badgeHtml(t);
    b.innerHTML = html;
    b.classList.toggle("logo", logo);
    v.style.setProperty("--vc", t ? t.color : MISS_COLOR);
  }

  function segHtml(s: Segment) {
    if (s.b - s.a < 0.1) return "";
    const d = route.path(s.a, s.b), c = s.tier.color;
    switch (s.tier.vehicle) {
      case "walk":
        return `<path class="seg" d="${d}" stroke="${c}" stroke-width="4" stroke-dasharray="0.1 7"/>`;
      case "train":
        return `<path class="seg" d="${d}" stroke="${c}" stroke-width="9" stroke-dasharray="1.5 4" stroke-linecap="butt"/><path class="seg" d="${d}" stroke="${c}" stroke-width="3"/>`;
      case "plane":
        return `<path class="seg" d="${d}" stroke="${c}" stroke-width="3.5" stroke-dasharray="9 6"/>`;
      case "heli":
        return `<path class="seg" d="${d}" stroke="#fff" stroke-width="7" stroke-dasharray="2 6"/><path class="seg" d="${d}" stroke="${c}" stroke-width="4" stroke-dasharray="2 6"/>`;
      default: {
        const w = s.tier.vehicle === "bike" ? 3.5 : 5.5;
        return `<path class="seg" d="${d}" stroke="#fff" stroke-width="${w + 2.5}"/><path class="seg" d="${d}" stroke="${c}" stroke-width="${w}"/>`;
      }
    }
  }

  // svaka dionica u svojoj grupi; tijekom vožnje se mijenja samo zadnja, ne cijeli put
  function drawSegments(onlyLast = false) {
    const g = segsRef.current;
    if (!g) return;
    const segs = sim.current.segments;
    if (onlyLast && g.childElementCount === segs.length && segs.length) {
      g.lastElementChild!.innerHTML = segHtml(segs[segs.length - 1]);
      return;
    }
    g.innerHTML = segs.map((s) => `<g>${segHtml(s)}</g>`).join("");
  }

  function arrive(i: number, quiet: boolean) {
    const s = allStations[i], el = stationEls.current[i];
    if (el) {
      el.classList.remove("pop");
      void el.offsetWidth;
      el.classList.add("pop");
    }
    if (quiet) return;
    setArrival({ name: s.name, km: s.km, message: s.message, egg: s === cfg.overshoot?.station, id: performance.now() });
    sfx.station();
    const clip = map.stationClips?.[s.name];
    if (clip) sfx.clip(clip, 0.2);
  }

  function crash(c: (typeof landmarks)[number], quiet: boolean) {
    badgeRef.current?.animate(
      [{ translate: "0 0" }, { translate: "-6px 3px" }, { translate: "5px -4px" }, { translate: "-3px -2px" }, { translate: "0 0" }],
      { duration: 380, iterations: 2 },
    );
    if (quiet) return;
    sfx.crash();
    if (c.clip) sfx.clip(c.clip, 0.5);
  }

  // mjesto kroz koje se samo prolazi: natpis kao na postaji, bez stajanja
  function pass(l: (typeof landmarks)[number], quiet: boolean) {
    if (quiet) return;
    setArrival({ name: l.name, km: Math.round(l.km), message: l.message ?? "", egg: false, pass: true, id: performance.now() });
  }

  // kopneno vozilo koje prolazi pored znaka sudara stane tamo, odstoji i nastavi
  function driveVia(tier: Tier, from: number, to: number, onDone?: () => void, quiet = false) {
    const c = tier.vehicle === "plane" || tier.vehicle === "heli" ? undefined : crashes.find((x) => x.km > from && x.km < to);
    if (!c) return drive(tier, from, to, onDone, quiet);
    drive(tier, from, c.km, () => setTimeout(() => drive(tier, c.km, to, onDone, quiet), quiet ? 500 : 1500), quiet);
  }

  function drive(tier: Tier, from: number, to: number, onDone?: () => void, quiet = false) {
    const S = sim.current;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seg = { a: from, b: from, tier };
    S.segments.push(seg);
    setVehicle(tier);
    // replay vozi brže i bez zvuka vozila
    const dur = (reduce ? 0.6 : DURATION[tier.vehicle] * (quiet ? 0.75 : 1)) * 1000;
    const a = route.at(from), b = route.at(to);
    S.anim = { tier, from, to, start: performance.now(), dur, seg, p0: [a.x, a.y], p1: [b.x, b.y], quiet, onDone };
    if (!quiet) sfx.vehicle(tier.vehicle, dur / 1000, !!map.heliClip);
  }

  function step(now: number) {
    const S = sim.current, a = S.anim!;
    // rAF vrijeme okvira može biti malo prije početka vožnje, zato donja granica 0
    const raw = Math.max(0, Math.min(1, (now - a.start) / a.dur)), e = EASE[a.tier.vehicle](raw);
    const prev = S.km, k = a.from + (a.to - a.from) * e;
    a.seg.b = k;
    S.km = k;
    const p = route.at(k);
    const dir = Math.cos(p.angle) >= 0 ? 1 : -1;
    S.bob = 0;
    S.rot = 0;
    S.lift = 0;
    S.pos = p;
    switch (a.tier.vehicle) {
      case "walk":
        S.bob = -Math.abs(Math.sin(((raw * a.dur) / 1000) * Math.PI * 2.4)) * 5;
        S.flip = dir;
        break;
      case "bike":
        S.bob = Math.sin(raw * 40) * 1.2;
        S.rot = Math.sin(raw * 18) * 0.06;
        S.flip = dir;
        break;
      case "bus":
        S.rot = Math.sin(raw * 22) * 0.05;
        S.flip = 1;
        break;
      case "plane": {
        // avion leti ravno od početne do krajnje točke, u luku iznad karte
        const lift = Math.sin(raw * Math.PI);
        const [x0, y0] = a.p0, [x1, y1] = a.p1;
        S.lift = lift * Math.min(120, 40 + Math.hypot(x1 - x0, y1 - y0) * 0.5);
        const bx = x0 + (x1 - x0) * e, by = y0 + (y1 - y0) * e;
        S.pos = { x: bx, y: by };
        const ang = Math.atan2(y1 - y0, x1 - x0);
        S.rot = ang - lift * 0.25 * Math.sign(Math.cos(ang) || 1);
        S.flip = 1;
        trailRef.current?.setAttribute("d", `M${x0},${y0} Q${(x0 + bx) / 2},${(y0 + by) / 2 - S.lift * 0.6} ${bx},${by - S.lift}`);
        break;
      }
      case "heli": {
        // helikopter leti ravno i nisko: podigne se, ljulja se pod elisom i spusti na cilj
        const up = raw < 0.18 ? raw / 0.18 : raw > 0.9 ? (1 - raw) / 0.1 : 1;
        const [x0, y0] = a.p0, [x1, y1] = a.p1;
        S.lift = Math.sin((up * Math.PI) / 2) * 55 + Math.sin(raw * 30) * 2;
        S.pos = { x: x0 + (x1 - x0) * e, y: y0 + (y1 - y0) * e };
        const lean = raw > 0.18 && raw < 0.9 ? 0.18 : 0;
        S.flip = x1 >= x0 ? 1 : -1;
        S.rot = lean * S.flip + Math.sin(raw * 47) * 0.04;
        break;
      }
      default:
        S.flip = 1;
    }
    allStations.forEach((s, i) => {
      if (s.km > prev && s.km <= k) arrive(i, a.quiet);
    });
    if (a.tier.vehicle !== "plane" && a.tier.vehicle !== "heli")
      for (const l of landmarks) if (l.km > prev && l.km <= k) (l.kind === "crash" ? crash(l, a.quiet) : pass(l, a.quiet));
    drawSegments(true);
    setHudKm(Math.round(k));
    if (raw >= 1) {
      S.anim = null;
      S.lift = S.bob = S.rot = 0;
      S.km = a.to;
      setTimeout(() => trailRef.current?.setAttribute("d", ""), 600);
      if (!a.quiet) S.busyUntil = Math.max(S.busyUntil, now + 2000);
      a.onDone?.();
    }
  }

  // novi odgovori: prvi put samo nacrtaj stanje, kasnije animiraj
  useEffect(() => {
    const S = sim.current;
    if (S.seen < 0) {
      let km = 0;
      for (const r of rounds) {
        const t = tierOf(cfg, r);
        if (t) S.segments.push({ a: routeKm(cfg, km), b: routeKm(cfg, km + r.km), tier: t });
        km += r.km;
      }
      S.km = routeKm(cfg, km);
      const p = route.at(S.km);
      S.pos = p;
      S.cam = { x: p.x, y: p.y, w: 760 };
      const last = [...rounds].reverse().map((r) => tierOf(cfg, r)).find(Boolean) ?? cfg.tiers[0];
      setVehicle(last);
      drawSegments();
      S.seen = rounds.length;
      return;
    }
    if (rounds.length <= S.seen) return;
    // replay na kraju čeka da se odvozi i pročita zadnji odgovor
    S.busyUntil = performance.now() + 4500;
    const fresh = rounds.slice(S.seen);
    S.seen = rounds.length;
    if (S.anim) {
      S.anim.seg.b = S.anim.to;
      S.km = S.anim.to;
      S.anim = null;
    }
    const r = fresh[fresh.length - 1];
    const before = rounds.slice(0, -1).reduce((a, x) => a + x.km, 0);
    const tier = tierOf(cfg, r);
    const id = performance.now();
    const isLast = rounds.length >= perDay;
    setStep(rounds.length);
    if (!tier) {
      sfx.miss();
      setVehicle(null);
      // prijavljen odgovor nije promašaj nego čeka provjeru
      const sub = !r.raw ? t("Vrijeme je isteklo") : r.report === "pending" ? t("„{x}” je na provjeri", { x: r.raw }) : t("„{x}” nije na popisu", { x: r.raw });
      setToast({ color: MISS_COLOR, icon: vehicleIcons.miss, logo: false, title: r.report === "pending" ? `${r.emoji} ${t(r.tier)}` : cfg.miss.name, sub, km: "+0 km", id });
      badgeRef.current?.animate([{ translate: "0" }, { translate: "-5px" }, { translate: "5px" }, { translate: "0" }], { duration: 300, iterations: 2 });
      return;
    }
    sfx.correct();
    const b = badgeHtml(tier);
    const sp = r.speed ? ` · ${r.speed.emoji} ${r.speed.name} ×${String(r.speed.multiplier).replace(".", ",")}` : "";
    setToast({ color: tier.color, icon: b.html, logo: b.logo, title: `${r.canonical} · ${tier.name}`, sub: `${formatShare(r.share ?? 0)} ${t("igrača")}${sp}`, km: `+${r.km} km`, id });
    const to = routeKm(cfg, before + r.km);
    const timer = setTimeout(() => driveVia(tier, routeKm(cfg, before), to, () => (to >= cfg.maxKm || isLast) && sfx.finish()), 350);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rounds.length]);

  // replay: put se iscrta ispočetka, dionicu po dionicu
  function replay() {
    const S = sim.current, id = ++S.replay;
    S.anim = null;
    S.segments = [];
    S.km = 0;
    S.lift = S.bob = S.rot = 0;
    S.pos = route.at(0);
    // kamera skoči na start umjesto da preleti cijelu državu unatrag
    if (modeRef.current === "follow") S.cam = { ...S.cam, x: S.pos.x, y: S.pos.y };
    trailRef.current?.setAttribute("d", "");
    drawSegments();
    setHudKm(0);
    setVehicle(cfg.tiers[0]);
    setReplaying(true);
    setStep(0);
    let i = 0, km = 0;
    const next = () => {
      if (S.replay !== id) return;
      if (i >= rounds.length) {
        setReplaying(false);
        setStep(Infinity);
        sfx.finish();
        return;
      }
      const r = rounds[i++], t = tierOf(cfg, r), from = km;
      setStep(i);
      km += r.km;
      const b = badgeHtml(t);
      setToast({
        color: t ? t.color : MISS_COLOR, icon: b.html, logo: b.logo,
        title: `${i}. ${t ? `${r.canonical} · ${t.name}` : cfg.miss.name}`, sub: r.category.title, km: `+${r.km} km`, id: performance.now(),
      });
      if (!t) {
        setVehicle(null);
        setTimeout(next, 1200);
        return;
      }
      driveVia(t, routeKm(cfg, from), routeKm(cfg, km), () => setTimeout(next, 600), true);
    };
    setTimeout(next, 1200);
  }

  useEffect(() => {
    if (!ended) return;
    // zadnji odgovor stiže zajedno s krajem igre, pa replay kreće tek kad njegova vožnja završi i malo odstoji
    let t = 0;
    const wait = () => {
      const S = sim.current;
      if (S.anim || performance.now() < S.busyUntil) t = window.setTimeout(wait, 300);
      else replay();
    };
    t = window.setTimeout(wait, 500);
    return () => {
      clearTimeout(t);
      sim.current.replay++;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ended]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3600);
    return () => clearTimeout(t);
  }, [toast]);
  useEffect(() => {
    if (!arrival) return;
    const t = setTimeout(() => setArrival(null), 2600);
    return () => clearTimeout(t);
  }, [arrival]);

  // petlja kamere i animacije
  useEffect(() => {
    let raf = 0, last = performance.now(), lastBox = "", lastVeh = "", lastGhostBox = "", lastGhostV = -1;
    const { overview } = map;
    const bounds = map.backdrop ?? map.image;
    const xmin = bounds.x, xmax = bounds.x + bounds.width, ymin = bounds.y, ymax = bounds.y + bounds.height;
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const S = sim.current, stage = stageRef.current, svg = svgRef.current;
      if (!stage || !svg) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (S.anim) step(now);
      const cw = stage.clientWidth, ch = stage.clientHeight;
      if (!cw || !ch) return;
      const aspect = ch / cw;
      const cover = Math.min(insetRef.current, ch * 0.7), visible = (ch - cover) / cw;
      let tx: number, ty: number, tw: number;
      if (modeRef.current === "whole") {
        // cijela država mora stati i po visini, pa i na širokom ekranu karta smije biti uža od pogleda
        tw = Math.max(overview.width, overview.height / visible);
        tx = overview.x;
        ty = overview.y;
      } else {
        tw = S.anim ? (S.anim.tier.vehicle === "plane" || S.anim.tier.vehicle === "heli" ? 820 : 640) : 760;
        // mobitel: bliži zum, da sitne oznake ne prekriju kartu
        if (cw < 700) tw *= 0.7;
        tx = S.pos.x;
        ty = S.pos.y - S.lift * 0.4;
      }
      const shift = (cover / 2) * (tw / cw);
      ty += shift;
      const k = 1 - Math.exp(-dt * (S.anim ? 4 : 2.4));
      S.cam.w += (tw - S.cam.w) * k;
      S.cam.x += (tx - S.cam.x) * k;
      S.cam.y += (ty - S.cam.y) * k;
      // blizu cilja kamera sjedne, da se mirna karta prestane iscrtavati
      if (Math.abs(tw - S.cam.w) < 0.05 && Math.abs(tx - S.cam.x) < 0.05 && Math.abs(ty - S.cam.y) < 0.05) S.cam = { x: tx, y: ty, w: tw };
      const vw = S.cam.w, vh = vw * aspect;
      let x0 = S.cam.x - vw / 2, y0 = S.cam.y - vh / 2;
      x0 = vw <= xmax - xmin ? Math.max(xmin, Math.min(xmax - vw, x0)) : (xmin + xmax - vw) / 2;
      // ispod ploče smije viriti more, da i jug karte može doći u vidljivi dio
      const below = (cover / 2) * (vw / cw);
      y0 = vh <= ymax - ymin ? Math.max(ymin, Math.min(ymax - vh + 2 * below, y0)) : (ymin + ymax - vh) / 2 + below;
      // kad kamera miruje, ništa se ne dira: svaka promjena viewBoxa ponovno iscrta cijelu kartu
      const box = `${x0.toFixed(1)} ${y0.toFixed(1)} ${vw.toFixed(1)} ${vh.toFixed(1)} ${cw} ${ch} ${pins.current.length}`;
      const sc = cw / vw, near = vw < 1150;
      if (box !== lastBox) {
        lastBox = box;
        svg.setAttribute("viewBox", `${x0.toFixed(2)} ${y0.toFixed(2)} ${vw.toFixed(2)} ${vh.toFixed(2)}`);
        for (const pin of pins.current) {
          const x = (pin.p[0] - x0) * sc, y = (pin.p[1] - y0) * sc;
          pin.el.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px)${pin.center ? " translate(-50%,-50%)" : ""}`;
          if (pin.fade) pin.el.classList.toggle("far", !near);
        }
      }
      // kružići lige klize do svog km, a unatrag (početak replaya) samo se vrate na start;
      // blizu jedni drugima slože se u red iznad jednog štapića
      const R = raceRef.current;
      let moving = false;
      const gs: { el: HTMLDivElement; km: number; x: number; y: number }[] = [];
      for (const r of R.runners) {
        const el = ghostEls.current.get(r.memberId);
        if (!el) continue;
        const target = routeKm(cfg, kmAfter(r.kms, R.step));
        let g = ghostKm.current.get(r.memberId);
        const at = (x: NonNullable<typeof g>) => {
          const u = Math.min(1, (now - x.start) / GHOST_MS), e = u < 0.5 ? 2 * u * u : 1 - (-2 * u + 2) ** 2 / 2;
          return x.from + (x.to - x.from) * e;
        };
        if (!g || target < g.to) g = { from: target, to: target, start: 0 };
        else if (target > g.to) g = { from: at(g), to: target, start: now };
        ghostKm.current.set(r.memberId, g);
        const km = at(g);
        if (km !== g.to) moving = true;
        gs.push({ el, km, x: 0, y: 0 });
      }
      if (moving || box !== lastGhostBox || R.v !== lastGhostV) {
        lastGhostBox = box;
        lastGhostV = R.v;
        gs.sort((a, b) => b.km - a.km);
        const groups: (typeof gs)[] = [];
        for (const g of gs) {
          const p = route.at(g.km);
          g.x = (p.x - x0) * sc;
          g.y = (p.y - y0) * sc;
          const near = groups.find((c) => Math.hypot(c[0].x - g.x, c[0].y - g.y) < 22);
          if (near) near.push(g);
          else groups.push([g]);
        }
        const gap = cw < 700 ? 15 : 18;
        for (const c of groups)
          c.forEach((g, j) => {
            g.el.style.transform = `translate(${c[0].x.toFixed(1)}px,${c[0].y.toFixed(1)}px)`;
            g.el.style.setProperty("--dx", `${((j - (c.length - 1) / 2) * gap).toFixed(1)}px`);
            g.el.style.zIndex = String(100 - j);
            g.el.classList.toggle("stacked", j > 0);
          });
      }
      const v = vehRef.current, b = badgeRef.current, sh = shadowRef.current;
      const veh = `${box} ${S.pos.x} ${S.pos.y} ${S.lift} ${S.bob} ${S.rot} ${S.flip} ${b?.classList.contains("logo")}`;
      if (v && b && sh && veh !== lastVeh) {
        lastVeh = veh;
        v.style.transform = `translate(${((S.pos.x - x0) * sc).toFixed(1)}px,${((S.pos.y - y0) * sc).toFixed(1)}px)`;
        // ikona vozila gleda u smjer vožnje, logo (Bajs, HŽ) se nikad ne zrcali
        const flip = b.classList.contains("logo") ? 1 : S.flip;
        b.style.transform = `translateY(${-S.lift * sc + S.bob}px) rotate(${S.rot}rad) scaleX(${flip}) scale(${1 + S.lift / 260})`;
        sh.style.opacity = String(S.lift > 1 ? Math.min(0.9, S.lift / 60) : 0);
      }
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  const pin = (p: Pt, opts: { center?: boolean; fade?: boolean } = {}) => (el: HTMLElement | null) => {
    if (el && !pins.current.some((x) => x.el === el)) pins.current.push({ el, p, ...opts });
  };

  // nepomični natpisi na karti ne ovise o km, pa se ne iscrtavaju ponovno u svakom okviru vožnje
  const decor = useMemo(
    () => (
      <>
        {map.countries.map(([n, lo, la]) => (
          <div key={n} className="cname" ref={pin(project(lo, la), { center: true })}>{n}</div>
        ))}
        {map.towns.map(([n, lo, la]) => (
          <div key={n} className="town" ref={pin(project(lo, la), { fade: true })}><i /><span>{n}</span></div>
        ))}
        {map.ferries.map((f) => {
          const a = project(...f.from), b = project(...f.to);
          return <div key={f.name} className="ferrytag" ref={pin([(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], { fade: true })}><span>⛴ {f.name}</span></div>;
        })}
        {map.landmarks.map((l) => (
          <div key={l.name} className={l.kind === "crash" ? "crash" : "crash pass"} title={l.name} ref={pin(project(l.lon, l.lat), { fade: true })}>
            {l.kind === "crash" && <span className="sign" dangerouslySetInnerHTML={{ __html: crashSign }} />}
            <span className="name">{l.name}</span>
          </div>
        ))}
      </>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [map],
  );

  // na putu u Crnu Goru km na karti nisu stvarni km, pa se pokaže ukupno
  const egg = landingAt(cfg, hudKm) === cfg.overshoot?.station;
  const ahead = cfg.stations.filter((s) => s.km > hudKm).slice(0, 3);
  const last = cfg.stations[cfg.stations.length - 1];

  return (
    <div className="stage" ref={stageRef} style={{ "--inset": `${inset}px` } as React.CSSProperties}>
      <svg className="map" ref={svgRef} viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {map.backdrop && (
          <image href={map.backdrop.href} x={map.backdrop.x} y={map.backdrop.y} width={map.backdrop.width} height={map.backdrop.height} preserveAspectRatio="none" />
        )}
        {/* rub prema okolici je upečen u alfa kanal slike (scripts/map/feather.py); SVG maska sa zamućenjem
            se računala u svakom okviru i na mobitelu rušila igru */}
        <image href={map.image.href} x={map.image.x} y={map.image.y} width={map.image.width} height={map.image.height} preserveAspectRatio="none" />
        {map.rivers.map((r) => <path key={r.name} className="river" d={r.d} />)}
        <path className="border" d={map.border} />
        {map.dashedBorder && <path className="border dashed" d={map.dashedBorder} />}
        <path className="road-casing" d={fullRoad} />
        <path className="road" d={fullRoad} />
        {map.ferries.map((f) => {
          const a = project(...f.from), b = project(...f.to);
          return <path key={f.name} className="ferry" d={`M${a[0]},${a[1]}L${b[0]},${b[1]}`} />;
        })}
        <g ref={segsRef} />
        <path className="contrail" ref={trailRef} />
      </svg>
      <div className="overlay">
        {decor}
        {allStations.map((s, i) => (
          <div
            key={s.name}
            className={"stn" + (hudKm >= s.km ? " reached" : "") + (s === ahead[0] ? " next" : "") + (s === cfg.overshoot?.station ? " egg" : "")}
            ref={(el) => {
              if (el) stationEls.current[i] = el;
              pin(stations[i])(el);
            }}
          >
            <i /><span>{s.name}</span>
          </div>
        ))}
        {runners.map((r) => (
          <div
            key={r.memberId}
            className="ghost"
            title={r.nickname}
            ref={(el) => {
              if (el) ghostEls.current.set(r.memberId, el);
              else ghostEls.current.delete(r.memberId);
            }}
          >
            <i />
            <span className="ghost-chip" style={{ background: r.color }}>{r.tag}</span>
          </div>
        ))}
        <div className="veh" ref={vehRef}>
          <div className="shadow" ref={shadowRef} />
          <div className="badge" ref={badgeRef} />
        </div>
      </div>

      <div className="hud tl">
        <div className="now">
          {placeAt(skinId, cfg, hudKm)}
          <small>{t("{n} km od {mjesta}", { n: hudKm > cfg.maxKm ? rounds.reduce((a, r) => a + r.km, 0) : hudKm, mjesta: cfg.stations[0].genitive ?? cfg.stations[0].name })}</small>
        </div>
        {!!race?.length && <RacePanel race={race} league={league} pick={pick} myKms={rounds.map((r) => r.km)} step={raceStep} perDay={perDay} />}
      </div>
      <div className="hud tr">
        <div className="signboard">
          {egg ? (
            <div><span>Cilj! <s>{last.name}</s></span><span>🙃</span></div>
          ) : ahead.length ? (
            ahead.map((s) => (
              <div key={s.name}><span>{s.name}</span><span>{s.km - hudKm} km</span></div>
            ))
          ) : (
            <div><span>{t("Cilj!")} {last.name}</span><span>{map.finishEmoji ?? "⛵"}</span></div>
          )}
        </div>
      </div>
      {ended && (
        <div className="hud bl">
          <button type="button" className="mapbtn solo" disabled={replaying} onClick={replay}>{replaying ? "Replay…" : `↻ ${t("Ponovi put")}`}</button>
        </div>
      )}
      <div className="hud br">
        <div className="camseg" role="radiogroup" aria-label={t("Kamera")}>
          <button type="button" className="mapbtn" role="radio" aria-checked={mode === "follow"} onClick={() => setMode("follow")}>{t("Kamera prati")}</button>
          <button type="button" className="mapbtn" role="radio" aria-checked={mode === "whole"} onClick={() => setMode("whole")}>{t("Cijela ruta")}</button>
        </div>
        <button
          type="button"
          className="camtoggle"
          aria-label={mode === "follow" ? t("Kamera prati, prebaci na cijelu rutu") : t("Cijela ruta, prebaci na praćenje")}
          onClick={() => setMode(mode === "follow" ? "whole" : "follow")}
          dangerouslySetInnerHTML={{ __html: mode === "follow" ? WHOLE_ICON : FOLLOW_ICON }}
        />
      </div>
      {arrival && (
        <div className="stationmsg" key={arrival.id}>
          <small>{arrival.egg ? `Preletio si ${last.name}` : arrival.pass ? t("Prolaziš · {n} km", { n: arrival.km }) : t("Stigao si · {n} km", { n: arrival.km })}</small>
          <b>{arrival.name}</b>
          <p>{arrival.message}</p>
        </div>
      )}
      {toast && (
        <div className="maptoast" key={toast.id} style={{ "--vc": toast.color } as React.CSSProperties}>
          <div className={"tbadge" + (toast.logo ? " logo" : "")} dangerouslySetInnerHTML={{ __html: toast.icon }} />
          <div className="txt"><b>{toast.title}</b><div className="sub">{toast.sub}</div></div>
          <div className="km">{toast.km}</div>
        </div>
      )}
    </div>
  );
}
