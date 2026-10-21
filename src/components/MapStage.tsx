"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { RoundView } from "@/server/game";
import type { SkinConfig, SkinMap, Tier, Vehicle } from "@/skins/types";
import { formatShare, stationAt } from "@/lib/scoring";
import { Route, project, type Pt } from "@/lib/route";
import { sfx } from "@/lib/sound";
import { MISS_COLOR, crashSign, vehicleIcons } from "./vehicleIcons";

// trajanje vožnje po vozilu (s); pješak je najsporiji, a prijeđe i najmanje km
const DURATION: Record<Vehicle, number> = { walk: 3.4, bike: 3.0, train: 2.9, bus: 2.9, car: 2.6, plane: 2.8 };

const EASE: Record<Vehicle, (t: number) => number> = {
  walk: (t) => t,
  bike: (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2),
  train: (t) => (t < 0.2 ? 2.5 * t * t : t > 0.8 ? 1 - 2.5 * (1 - t) ** 2 : 0.1 + (t - 0.2) * 1.333),
  bus: (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2),
  car: (t) => (t < 0.5 ? 8 * t ** 4 : 1 - 8 * (1 - t) ** 4),
  plane: (t) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2),
};

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
export default function MapStage({ cfg, map, rounds, perDay, ended = false }: { cfg: SkinConfig; map: SkinMap; rounds: RoundView[]; perDay: number; ended?: boolean }) {
  const route = useMemo(() => new Route(cfg.stations, map.via), [cfg.stations, map.via]);
  const stations = useMemo(() => cfg.stations.map((s) => project(s.lon, s.lat)), [cfg.stations]);
  const fullRoad = useMemo(() => route.path(0, route.maxKm), [route]);

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
  const [hudKm, setHudKm] = useState(() => rounds.reduce((a, r) => a + r.km, 0));
  const [toast, setToast] = useState<Toast | null>(null);
  const [arrival, setArrival] = useState<{ name: string; km: number; message: string; id: number } | null>(null);
  const [replaying, setReplaying] = useState(false);

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

  function drawSegments() {
    const g = segsRef.current;
    if (!g) return;
    let h = "";
    for (const s of sim.current.segments) {
      if (s.b - s.a < 0.1) continue;
      const d = route.path(s.a, s.b), c = s.tier.color;
      switch (s.tier.vehicle) {
        case "walk":
          h += `<path class="seg" d="${d}" stroke="${c}" stroke-width="4" stroke-dasharray="0.1 7"/>`;
          break;
        case "train":
          h += `<path class="seg" d="${d}" stroke="${c}" stroke-width="9" stroke-dasharray="1.5 4" stroke-linecap="butt"/><path class="seg" d="${d}" stroke="${c}" stroke-width="3"/>`;
          break;
        case "plane":
          h += `<path class="seg" d="${d}" stroke="${c}" stroke-width="3.5" stroke-dasharray="9 6"/>`;
          break;
        default: {
          const w = s.tier.vehicle === "bike" ? 3.5 : 5.5;
          h += `<path class="seg" d="${d}" stroke="#fff" stroke-width="${w + 2.5}"/><path class="seg" d="${d}" stroke="${c}" stroke-width="${w}"/>`;
        }
      }
    }
    g.innerHTML = h;
  }

  function arrive(i: number, quiet: boolean) {
    const s = cfg.stations[i], el = stationEls.current[i];
    if (el) {
      el.classList.remove("pop");
      void el.offsetWidth;
      el.classList.add("pop");
    }
    if (quiet) return;
    setArrival({ name: s.name, km: s.km, message: s.message, id: performance.now() });
    sfx.station();
  }

  function drive(tier: Tier, from: number, to: number, onDone?: () => void, quiet = false) {
    const S = sim.current;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seg = { a: from, b: from, tier };
    S.segments.push(seg);
    setVehicle(tier);
    // replay vozi brže i bez zvuka vozila
    const dur = (reduce ? 0.6 : DURATION[tier.vehicle] * (quiet ? 0.5 : 1)) * 1000;
    const a = route.at(from), b = route.at(to);
    S.anim = { tier, from, to, start: performance.now(), dur, seg, p0: [a.x, a.y], p1: [b.x, b.y], quiet, onDone };
    if (!quiet) sfx.vehicle(tier.vehicle, dur / 1000);
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
      default:
        S.flip = 1;
    }
    cfg.stations.forEach((s, i) => {
      if (s.km > prev && s.km <= k) arrive(i, a.quiet);
    });
    drawSegments();
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
        if (t) S.segments.push({ a: km, b: km + r.km, tier: t });
        km += r.km;
      }
      S.km = Math.min(km, route.maxKm);
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
    if (!tier) {
      sfx.miss();
      setVehicle(null);
      setToast({ color: MISS_COLOR, icon: vehicleIcons.miss, logo: false, title: cfg.miss.name, sub: r.raw ? `„${r.raw}” nije na popisu` : "Vrijeme je isteklo", km: "+0 km", id });
      badgeRef.current?.animate([{ translate: "0" }, { translate: "-5px" }, { translate: "5px" }, { translate: "0" }], { duration: 300, iterations: 2 });
      return;
    }
    sfx.correct();
    const b = badgeHtml(tier);
    const sp = r.speed ? ` · ${r.speed.emoji} ${r.speed.name} ×${String(r.speed.multiplier).replace(".", ",")}` : "";
    setToast({ color: tier.color, icon: b.html, logo: b.logo, title: `${r.canonical} · ${tier.name}`, sub: `${formatShare(r.share ?? 0)} igrača${sp}`, km: `+${r.km} km`, id });
    const to = Math.min(route.maxKm, before + r.km);
    const t = setTimeout(() => drive(tier, Math.min(before, route.maxKm), to, () => (to >= route.maxKm || isLast) && sfx.finish()), 350);
    return () => clearTimeout(t);
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
    trailRef.current?.setAttribute("d", "");
    drawSegments();
    setHudKm(0);
    setVehicle(cfg.tiers[0]);
    setReplaying(true);
    let i = 0, km = 0;
    const next = () => {
      if (S.replay !== id) return;
      if (i >= rounds.length) {
        setReplaying(false);
        sfx.finish();
        return;
      }
      const r = rounds[i++], t = tierOf(cfg, r), from = km;
      km += r.km;
      const b = badgeHtml(t);
      setToast({
        color: t ? t.color : MISS_COLOR, icon: b.html, logo: b.logo,
        title: `${i}. ${t ? `${r.canonical} · ${t.name}` : cfg.miss.name}`, sub: r.category.title, km: `+${r.km} km`, id: performance.now(),
      });
      if (!t) {
        setVehicle(null);
        setTimeout(next, 900);
        return;
      }
      drive(t, Math.min(from, route.maxKm), Math.min(km, route.maxKm), () => setTimeout(next, 250), true);
    };
    setTimeout(next, 700);
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
    let raf = 0, last = performance.now();
    const { image, overview } = map;
    const xmin = image.x, xmax = image.x + image.width, ymax = image.y + image.height;
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
      let tx: number, ty: number, tw: number;
      if (modeRef.current === "whole") {
        tw = Math.min(image.width, Math.max(overview.width, overview.height / aspect));
        tx = overview.x;
        ty = overview.y;
      } else {
        tw = S.anim ? (S.anim.tier.vehicle === "plane" ? 820 : 640) : 760;
        if (cw < 700) tw *= 0.85;
        tx = S.pos.x;
        ty = S.pos.y - S.lift * 0.4;
      }
      const k = 1 - Math.exp(-dt * (S.anim ? 4 : 2.4));
      S.cam.w += (tw - S.cam.w) * k;
      S.cam.x += (tx - S.cam.x) * k;
      S.cam.y += (ty - S.cam.y) * k;
      const vw = S.cam.w, vh = vw * aspect;
      let x0 = S.cam.x - vw / 2, y0 = S.cam.y - vh / 2;
      x0 = vw <= xmax - xmin ? Math.max(xmin, Math.min(xmax - vw, x0)) : (xmin + xmax - vw) / 2;
      y0 = vh <= ymax ? Math.max(0, Math.min(ymax - vh, y0)) : (ymax - vh) / 2;
      svg.setAttribute("viewBox", `${x0.toFixed(2)} ${y0.toFixed(2)} ${vw.toFixed(2)} ${vh.toFixed(2)}`);
      const sc = cw / vw, near = vw < 1150;
      for (const pin of pins.current) {
        const x = (pin.p[0] - x0) * sc, y = (pin.p[1] - y0) * sc;
        pin.el.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px)${pin.center ? " translate(-50%,-50%)" : ""}`;
        if (pin.fade) pin.el.classList.toggle("far", !near);
      }
      const v = vehRef.current, b = badgeRef.current, sh = shadowRef.current;
      if (v && b && sh) {
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

  const cur = stationAt(cfg, hudKm);
  const ahead = cfg.stations.filter((s) => s.km > hudKm).slice(0, 3);
  const last = cfg.stations[cfg.stations.length - 1];

  return (
    <div className="stage" ref={stageRef}>
      <svg className="map" ref={svgRef} viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <image href={map.image.href} x={map.image.x} y={map.image.y} width={map.image.width} height={map.image.height} preserveAspectRatio="none" />
        {map.rivers.map((r) => <path key={r.name} className="river" d={r.d} />)}
        <path className="border" d={map.border} />
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
          <div key={l.name} className="crash" title={l.name} ref={pin(project(l.lon, l.lat), { fade: true })}>
            <span className="sign" dangerouslySetInnerHTML={{ __html: crashSign }} />
            <span className="name">{l.name}</span>
          </div>
        ))}
        {cfg.stations.map((s, i) => (
          <div
            key={s.name}
            className={"stn" + (hudKm >= s.km ? " reached" : "") + (s === ahead[0] ? " next" : "")}
            ref={(el) => {
              if (el) stationEls.current[i] = el;
              pin(stations[i])(el);
            }}
          >
            <i /><span>{s.name}</span>
          </div>
        ))}
        <div className="veh" ref={vehRef}>
          <div className="shadow" ref={shadowRef} />
          <div className="badge" ref={badgeRef} />
        </div>
      </div>

      <div className="hud tl">
        <div className="now">
          {cur.name}
          <small>{hudKm} km od {cfg.stations[0].genitive ?? cfg.stations[0].name}</small>
        </div>
      </div>
      <div className="hud tr">
        <div className="signboard">
          {ahead.length ? (
            ahead.map((s) => (
              <div key={s.name}><span>{s.name}</span><span>{s.km - hudKm} km</span></div>
            ))
          ) : (
            <div><span>Cilj! {last.name}</span><span>⛵</span></div>
          )}
        </div>
      </div>
      {ended && (
        <div className="hud bl">
          <button type="button" className="mapbtn solo" disabled={replaying} onClick={replay}>{replaying ? "Replay…" : "↻ Ponovi put"}</button>
        </div>
      )}
      <div className="hud br">
        <div className="camseg" role="radiogroup" aria-label="Kamera">
          <button type="button" className="mapbtn" role="radio" aria-checked={mode === "follow"} onClick={() => setMode("follow")}>Kamera prati</button>
          <button type="button" className="mapbtn" role="radio" aria-checked={mode === "whole"} onClick={() => setMode("whole")}>Cijela ruta</button>
        </div>
      </div>
      {arrival && (
        <div className="stationmsg" key={arrival.id}>
          <small>Stigao si · {arrival.km} km</small>
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
