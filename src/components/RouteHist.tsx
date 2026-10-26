"use client";

import { BUCKET_KM, type RouteLabel } from "@/lib/compare";
import { useT } from "./skin";

/** Gdje su stali igrači: stupci po 100 km uz rutu, km na osi i glavni gradovi ispod.
 *  S mineBin: stupci iza igrača zeleni, ispred sivi, igračev žut s pločom TI; bez njega svi zeleni. */
export default function RouteHist({ hist, labels, mineBin, label, unit }: { hist: number[]; labels: RouteLabel[]; mineBin?: number; label: string; unit?: string }) {
  const t = useT();
  const end = hist.length * BUCKET_KM;
  const pct = (km: number) => `${(100 * Math.min(km, end)) / end}%`;
  const top = Math.max(1, ...hist);
  return (
    <div className="cmp-chart" role="img" aria-label={label}>
      <div className="cmp-bars">
        {hist.map((n, i) => (
          <div
            key={i}
            className={"cmp-col" + (mineBin === undefined ? "" : i === mineBin ? " mine" : i > mineBin ? " front" : "")}
            style={{ animationDelay: `${i * 40}ms` }}
            title={unit ? `${i * BUCKET_KM}–${i * BUCKET_KM + BUCKET_KM - 1} km: ${n} ${unit}` : undefined}
          >
            {i === mineBin && <span className="cmp-ti">{t("TI")}</span>}
            {n > 0 && <span className="cmp-bar" style={{ height: `${(100 * n) / top}%` }} />}
          </div>
        ))}
      </div>
      <div className="cmp-ticks">
        {hist.map((_, i) => (
          <span key={i} className={"cmp-tick" + (i % 2 ? " odd" : "")} style={{ left: pct(i * BUCKET_KM) }}>
            {i * BUCKET_KM}
          </span>
        ))}
      </div>
      <div className="cmp-axis">
        {labels.map((s, i) => (
          <span
            key={s.name}
            className={"cmp-city" + (s.km === 0 ? " first" : s.km / end > 0.9 ? " last" : "") + (i % 2 ? " low" : "")}
            style={{ left: pct(s.km) }}
          >
            {s.name}
          </span>
        ))}
      </div>
    </div>
  );
}
