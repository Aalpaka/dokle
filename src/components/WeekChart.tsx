"use client";

import type { DayAvg } from "@/lib/league";
import { useT } from "./skin";

const DAYS = ["Pon", "Uto", "Sri", "Čet", "Pet", "Sub", "Ned"];

/** Stupci pon–ned s prosjekom km; dan bez ijedne partije je prazan, budući dani su zatamnjeni. */
export default function WeekChart({ days, today }: { days: DayAvg[]; today: string }) {
  const t = useT();
  const max = Math.max(1, ...days.map((d) => d.avgKm ?? 0));
  return (
    <ol className="week-chart">
      {days.map((d, i) => {
        const future = d.date > today;
        const [, m, day] = d.date.split("-").map(Number);
        return (
          <li key={d.date} className={(d.date === today ? "today " : "") + (future ? "future" : "")}>
            <span className="wc-km">{d.avgKm === null ? (future ? "" : "—") : d.avgKm}</span>
            <span className="wc-col">
              {d.avgKm !== null && <span style={{ height: `${Math.max(2, (100 * d.avgKm) / max)}%` }} />}
            </span>
            <span className="wc-day">{t(DAYS[i])}</span>
            <span className="wc-date">{day}.<span className="wc-m">{m}.</span></span>
            <span className="wc-n">{d.players ? `${d.players} 👤` : ""}</span>
          </li>
        );
      })}
    </ol>
  );
}
