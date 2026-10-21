import type { Station } from "@/skins/types";

// Web Mercator na zoomu 9, pomaknut i skaliran kao reljefna slika (scripts/map/README.md)
const WORLD = 256 * 512;
const LEFT = 70323.7688888889, TOP = 46234.61268614327, RIGHT = 72726.75555555556;
const SCALE = 1600 / (RIGHT - LEFT);

export type Pt = [number, number];

export function project(lon: number, lat: number): Pt {
  const s = Math.sin((lat * Math.PI) / 180);
  return [
    (((lon + 180) / 360) * WORLD - LEFT) * SCALE,
    ((0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI)) * WORLD - TOP) * SCALE,
  ];
}

function catmull(pts: Pt[], steps: number): Pt[] {
  const out: Pt[] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
    for (let k = 0; k < steps; k++) {
      const t = k / steps, t2 = t * t, t3 = t2 * t;
      const c = (j: 0 | 1) =>
        0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t3);
      out.push([c(0), c(1)]);
    }
  }
  out.push(pts[pts.length - 1]);
  return out;
}

type Leg = { pts: Pt[]; cum: number[]; len: number; a: number; b: number };

/** Ruta kao gusta polilinija; km igre se po dionicama preslikavaju na duljinu crte. */
export class Route {
  readonly legs: Leg[];
  readonly maxKm: number;

  constructor(stations: Station[], via: [number, number][][]) {
    this.legs = [];
    for (let i = 0; i < stations.length - 1; i++) {
      const a = stations[i], b = stations[i + 1];
      const raw = [[a.lon, a.lat], ...(via[i] ?? []), [b.lon, b.lat]].map(([lo, la]) => project(lo, la));
      const pts = catmull(raw, 10);
      const cum = [0];
      for (let k = 1; k < pts.length; k++) cum.push(cum[k - 1] + Math.hypot(pts[k][0] - pts[k - 1][0], pts[k][1] - pts[k - 1][1]));
      this.legs.push({ pts, cum, len: cum[cum.length - 1], a: a.km, b: b.km });
    }
    this.maxKm = stations[stations.length - 1].km;
  }

  /** Točka i smjer (radijani) na zadanom km. */
  at(km: number): { x: number; y: number; angle: number } {
    const k = Math.max(0, Math.min(this.maxKm, km));
    const leg = this.legs.find((l) => k <= l.b) ?? this.legs[this.legs.length - 1];
    const d = ((k - leg.a) / (leg.b - leg.a)) * leg.len;
    let j = 1;
    while (j < leg.cum.length - 1 && leg.cum[j] < d) j++;
    const t = (d - leg.cum[j - 1]) / (leg.cum[j] - leg.cum[j - 1] || 1);
    const p = leg.pts[j - 1], q = leg.pts[j];
    return { x: p[0] + (q[0] - p[0]) * t, y: p[1] + (q[1] - p[1]) * t, angle: Math.atan2(q[1] - p[1], q[0] - p[0]) };
  }

  /** SVG path dijela rute od k0 do k1 km. */
  path(k0: number, k1: number, step = 1.5): string {
    const out: string[] = [];
    for (let k = k0; k < k1; k += step) {
      const p = this.at(k);
      out.push(p.x.toFixed(1) + "," + p.y.toFixed(1));
    }
    const e = this.at(k1);
    out.push(e.x.toFixed(1) + "," + e.y.toFixed(1));
    return "M" + out.join("L");
  }
}
