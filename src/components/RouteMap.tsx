import type { SkinConfig } from "@/skins/types";
import { stationAt } from "@/lib/scoring";

/** Karta rute s prijeđenim dijelom i autocestovnom pločom ispod. */
export default function RouteMap({ cfg, km }: { cfg: SkinConfig; km: number }) {
  const { map, stations, maxKm } = cfg;
  const { lon0, lat0, kx, ky } = map.projection;
  const proj = (lon: number, lat: number): [number, number] => [(lon - lon0) * kx, (lat0 - lat) * ky];
  const pts = stations.map((s) => proj(s.lon, s.lat));

  // točka na ruti za zadane km
  const at = (k: number) => {
    for (let i = 1; i < stations.length; i++)
      if (k <= stations[i].km) {
        const a = stations[i - 1], b = stations[i], t = (k - a.km) / (b.km - a.km);
        return { p: [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * t, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * t] as [number, number], i };
      }
    return { p: pts[pts.length - 1], i: pts.length };
  };
  const pos = at(Math.min(km, maxKm));
  const donePts = pts.slice(0, pos.i).concat([pos.p]);
  const cur = stationAt(cfg, km);
  const next = stations.find((s) => s.km > km);
  const path = (p: [number, number][]) => p.map((x) => x[0].toFixed(1) + "," + x[1].toFixed(1)).join(" ");
  const ahead = stations.filter((s) => s.km > km).slice(0, 3);
  const [w, h] = map.viewBox;
  const first = stations[0], last = stations[stations.length - 1];

  return (
    <section className="card mapcard">
      <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={`Karta rute od ${first.genitive ?? first.name} do ${last.genitive ?? last.name}`}>
        <rect className="sea" x="0" y="0" width={w} height={h} />
        <polygon className="landp" points={path(map.outline.map(([lo, la]) => proj(lo, la)))} />
        {map.islands.map(([lo, la, rx, ry, a], i) => {
          const [x, y] = proj(lo, la);
          return <ellipse key={i} className="landp" cx={x.toFixed(1)} cy={y.toFixed(1)} rx={rx} ry={ry} transform={`rotate(${a} ${x.toFixed(1)} ${y.toFixed(1)})`} />;
        })}
        <polyline className="route" points={path(pts)} />
        <polyline className="done" points={path(donePts)} />
        {stations.map((s, i) => {
          const [x, y] = pts[i];
          const [dx, dy] = s.labelOffset ?? [6, -6];
          return (
            <g key={s.name}>
              <circle className={"st" + (km >= s.km ? " reached" : "")} cx={x.toFixed(1)} cy={y.toFixed(1)} r={s === cur || s === next ? 5 : 3.5} />
              {(s.alwaysLabel || s === cur || s === next) && (
                <text className={"lbl" + (s === next ? " dim" : "")} x={(x + dx).toFixed(1)} y={(y + dy).toFixed(1)}>
                  {s.name}
                </text>
              )}
            </g>
          );
        })}
        <circle className="car" cx={pos.p[0].toFixed(1)} cy={pos.p[1].toFixed(1)} r="7" />
      </svg>
      <div className="signbar">
        <div className="now">
          Trenutno: {cur.name} · {km} km
        </div>
        {ahead.length ? (
          ahead.map((s) => (
            <div className="d" key={s.name}>
              <span>{s.name}</span>
              <span>{s.km - km} km</span>
            </div>
          ))
        ) : (
          <div className="d">
            <span>Cilj! {last.name}</span>
            <span>🏝️</span>
          </div>
        )}
      </div>
    </section>
  );
}
