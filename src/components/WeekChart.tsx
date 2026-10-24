"use client";

import type { DayAvg } from "@/lib/league";
import { useT } from "./skin";

const DAYS = ["Pon", "Uto", "Sri", "Čet", "Pet", "Sub", "Ned"];

/** Okrugli korak osi za otprilike četiri crte mreže. */
function axis(max: number): number[] {
  const step = [50, 100, 200, 250, 500].find((s) => max / s <= 4) ?? 500;
  const top = Math.max(step, Math.ceil(max / step) * step);
  return Array.from({ length: top / step + 1 }, (_, i) => i * step);
}

/** Bar chart pon–ned s prosjekom km; dan bez ijedne partije nema stupca, budući dani su zatamnjeni. */
export default function WeekChart({ days, today, compact }: { days: DayAvg[]; today: string; compact?: boolean }) {
  const t = useT();
  const ticks = axis(Math.max(0, ...days.map((d) => d.avgKm ?? 0)));
  const top = ticks.at(-1)!;
  return (
    <div className={"week-chart" + (compact ? " compact" : "")}>
      <div className="wc-y" aria-hidden>
        {ticks.map((v) => (
          <span key={v} style={{ bottom: `${(100 * v) / top}%` }}>{v}</span>
        ))}
      </div>
      <div className="wc-plot">
        {ticks.map((v) => (
          <i key={v} className="wc-grid" style={{ bottom: `${(100 * v) / top}%` }} />
        ))}
        {days.map((d) => (
          <div key={d.date} className={"wc-slot" + (d.date === today ? " today" : "")}>
            {d.avgKm !== null && (
              <span className="wc-bar" style={{ height: `${(100 * d.avgKm) / top}%` }}>
                <b>{d.avgKm}</b>
              </span>
            )}
          </div>
        ))}
      </div>
      <span />
      <ol className="wc-x">
        {days.map((d, i) => {
          const [, m, day] = d.date.split("-").map(Number);
          return (
            <li key={d.date} className={(d.date === today ? "today " : "") + (d.date > today ? "future" : "")}>
              <span className="wc-day">{t(DAYS[i])}</span>
              <span className="wc-date">{day}.<span className="wc-m">{m}.</span></span>
              <span className="wc-n">{d.players ? `${d.players} 👤` : d.date > today ? "" : "—"}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
