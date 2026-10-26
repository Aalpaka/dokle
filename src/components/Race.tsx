"use client";

import { useEffect, useState } from "react";
import { kmAfter } from "@/lib/league";
import type { RaceLeague } from "@/server/leagues";
import { skinFetch, useT } from "./skin";

const KEY = "dokle_utrka";

/** Današnja utrka u ligama prijavljenog igrača; s `poll` se osvježava svake minute (ekipa igra kasnije). */
export function useLeagueRace(enabled: boolean, reloadKey: unknown, poll: boolean) {
  const [race, setRace] = useState<RaceLeague[] | null>(null);
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    skinFetch("/api/lige/utrka", { cache: "no-store" })
      .then((r) => r.json())
      .then((b) => setRace(b.leagues), () => {});
  }, [enabled, reloadKey, tick]);
  useEffect(() => {
    if (!enabled || !poll) return;
    const i = setInterval(() => document.visibilityState === "visible" && setTick((x) => x + 1), 60_000);
    return () => clearInterval(i);
  }, [enabled, poll]);
  return enabled ? race : null;
}

/** Odabrana liga za utrku ("off" = ugašeno); pamti se u pregledniku. */
export function useRaceChoice(race: RaceLeague[] | null) {
  const [choice, setChoice] = useState<string | null>(null);
  useEffect(() => {
    try {
      setChoice(localStorage.getItem(KEY));
    } catch {}
  }, []);
  const pick = (c: string) => {
    setChoice(c);
    try {
      localStorage.setItem(KEY, c);
    } catch {}
  };
  const league = !race?.length || choice === "off" ? null : (race.find((l) => l.code === choice) ?? race[0]);
  return { league, off: choice === "off", pick };
}

export function RacePanel({
  race,
  league,
  pick,
  myKms,
  step,
  perDay,
}: {
  race: RaceLeague[];
  league: RaceLeague | null;
  pick: (c: string) => void;
  myKms: number[];
  step: number;
  perDay: number;
}) {
  const t = useT();
  // na mobitelu je karta mala, pa je popis u početku sklopljen
  const [open, setOpen] = useState(true);
  useEffect(() => {
    if (matchMedia("(max-width: 700px)").matches) setOpen(false);
  }, []);

  if (!league)
    return (
      <button type="button" className="mapbtn solo race-on" onClick={() => pick(race[0].code)}>
        🏁 {t("Utrka lige")}
      </button>
    );

  const rows = [
    { id: 0, tag: league.me.tag, color: league.me.color, name: t("Ti"), km: kmAfter(myKms, step), playing: false, me: true },
    ...league.runners.map((r) => ({
      id: r.memberId,
      tag: r.tag,
      color: r.color,
      name: r.nickname,
      km: kmAfter(r.kms, step),
      // još igra i nije stigao do ove kategorije
      playing: !r.done && r.kms.length < Math.min(step, perDay),
      me: false,
    })),
  ].sort((a, b) => b.km - a.km || +b.me - +a.me);
  const myRank = rows.findIndex((r) => r.me) + 1;
  // dugačka liga: prvih pet i ja
  const shown = rows.filter((r, i) => i < 5 || r.me);
  const missing = league.members - 1 - league.runners.length;
  const after = step < perDay ? t("nakon {n}. kategorije", { n: step }) : t("danas");

  return (
    <div className={"race" + (open ? " open" : "")}>
      <button type="button" className="race-head" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span className="race-flag">🏁</span>
        <span className="race-name">{league.name}</span>
        <span className="race-rank">{myRank}. / {rows.length}</span>
        <span className="race-caret" aria-hidden="true">{open ? "▴" : "▾"}</span>
      </button>
      {open && (
        <>
          <div className="race-sub">{step === 0 ? t("na startu") : after}</div>
          <ol className="race-list">
            {shown.map((r) => (
              <li key={r.id} className={r.me ? "me" : undefined}>
                <span className="race-pos">{rows.indexOf(r) + 1}.</span>
                <span className="ghost-chip" style={{ background: r.color }}>{r.tag}</span>
                <span className="race-who">{r.name}{r.playing && <small> · {t("igra")}</small>}</span>
                <span className="race-km">{r.km} km</span>
              </li>
            ))}
          </ol>
          {league.runners.length === 0 && <p className="race-note">{t("Danas još nitko iz lige nije igrao.")}</p>}
          {league.runners.length > 0 && missing > 0 && <p className="race-note">{t("Još nisu igrali: {n}", { n: missing })}</p>}
          <select className="race-pick" value={league.code} onChange={(e) => pick(e.target.value)} aria-label={t("Liga na karti")}>
            {race.map((l) => (
              <option key={l.code} value={l.code}>{l.name}</option>
            ))}
            <option value="off">{t("Sakrij utrku")}</option>
          </select>
        </>
      )}
    </div>
  );
}
