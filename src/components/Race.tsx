"use client";

import { useEffect, useState } from "react";
import { kmAfter } from "@/lib/league";
import type { RaceLeague } from "@/server/leagues";
import { skinFetch, useT } from "./skin";
import { Chip } from "./Chip";

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

type RaceProps = {
  race: RaceLeague[];
  league: RaceLeague | null;
  pick: (c: string) => void;
  myKms: number[];
  step: number;
  perDay: number;
};

type Row = { id: number; tag: string; color: string; avatar: string | null; name: string; km: number; playing: boolean; me: boolean };

function raceRows(league: RaceLeague, myKms: number[], step: number, perDay: number, me: string): Row[] {
  return [
    { id: 0, tag: league.me.tag, color: league.me.color, avatar: null, name: me, km: kmAfter(myKms, step), playing: false, me: true },
    ...league.runners.map((r) => ({
      id: r.memberId,
      tag: r.tag,
      color: r.color,
      avatar: r.avatar,
      name: r.nickname,
      km: kmAfter(r.kms, step),
      // još igra i nije stigao do ove kategorije
      playing: !r.done && r.kms.length < Math.min(step, perDay),
      me: false,
    })),
  ].sort((a, b) => b.km - a.km || +b.me - +a.me);
}

/** Mobitel: karta je mala, pa utrka ide u traku (start → cilj) i popis umjesto kružića s imenima na karti. */
export function useNarrow() {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const m = matchMedia("(max-width: 700px)");
    const sync = () => setNarrow(m.matches);
    sync();
    m.addEventListener("change", sync);
    return () => m.removeEventListener("change", sync);
  }, []);
  return narrow;
}

function RaceOff({ race, pick }: Pick<RaceProps, "race" | "pick">) {
  const t = useT();
  return (
    <button type="button" className="mapbtn solo race-on" onClick={() => pick(race[0].code)}>
      🏁 {t("Utrka lige")}
    </button>
  );
}

function RaceHead({ league, rows, open, onToggle }: { league: RaceLeague; rows: Row[]; open: boolean; onToggle: () => void }) {
  return (
    <button type="button" className="race-head" aria-expanded={open} onClick={onToggle}>
      <span className="race-flag">🏁</span>
      <span className="race-name">{league.name}</span>
      <span className="race-rank">{rows.findIndex((r) => r.me) + 1}. / {rows.length}</span>
      <span className="race-caret" aria-hidden="true">{open ? "▴" : "▾"}</span>
    </button>
  );
}

/** Popis utrke: mjesto, oznaka, ime i km, pa napomene i izbor lige. */
function RaceBody({ race, league, pick, rows, step, perDay }: Omit<RaceProps, "myKms"> & { league: RaceLeague; rows: Row[] }) {
  const t = useT();
  // dugačka liga: prvih pet i ja
  const shown = rows.filter((r, i) => i < 5 || r.me);
  const missing = league.members - 1 - league.runners.length;
  const after = step < perDay ? t("nakon {n}. kategorije", { n: step }) : t("danas");
  return (
    <>
      <div className="race-sub">{step === 0 ? t("na startu") : after}</div>
      <ol className="race-list">
        {shown.map((r) => (
          <li key={r.id} className={r.me ? "me" : undefined}>
            <span className="race-pos">{rows.indexOf(r) + 1}.</span>
            <Chip className={r.me ? "me" : ""} color={r.me ? undefined : r.color} src={r.avatar}>{r.me ? "TI" : r.tag}</Chip>
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
  );
}

/** Računalo: popis u kutu karte. */
export function RacePanel({ race, league, pick, myKms, step, perDay }: RaceProps) {
  const t = useT();
  const [open, setOpen] = useState(true);
  if (!league) return <RaceOff race={race} pick={pick} />;
  const rows = raceRows(league, myKms, step, perDay, t("Ti"));
  return (
    <div className={"race" + (open ? " open" : "")}>
      <RaceHead league={league} rows={rows} open={open} onToggle={() => setOpen(!open)} />
      {open && <RaceBody race={race} league={league} pick={pick} rows={rows} step={step} perDay={perDay} />}
    </div>
  );
}

const CHIP = 24; // širina oznake u traci (px), za razmak kad su blizu

/**
 * Mobitel: traka od starta do cilja s oznakama svih, a popis se otvara dodirom. Za vrijeme igre je na vrhu karte,
 * na kraju (`card`) ispod karte, s otvorenim popisom.
 */
export function RaceStrip({ race, league, pick, myKms, step, perDay, maxKm, card = false }: RaceProps & { maxKm: number; card?: boolean }) {
  const t = useT();
  const [open, setOpen] = useState(card);
  const [width, setWidth] = useState(300);
  const [track, setTrack] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!track) return;
    const ro = new ResizeObserver(() => setWidth(track.clientWidth || 300));
    ro.observe(track);
    return () => ro.disconnect();
  }, [track]);
  if (!league) return card ? null : <RaceOff race={race} pick={pick} />;
  const rows = raceRows(league, myKms, step, perDay, t("Ti"));

  // na početku su svi blizu, pa traka ide do 300, 600 ili 900 km dok vodeći ne prijeđe više (rijetko se mijenja)
  const end = [300, 600, 900].find((k) => k < maxKm && rows[0].km <= k * 0.92) ?? maxKm;
  // jedan red: oznaka preblizu prethodnoj odmakne se udesno (a uz kraj trake ulijevo), pa se ništa ne prekriva,
  // a poredak ostaje kao na cesti
  const span = Math.max(1, width - CHIP);
  const gap = CHIP + 1;
  const placed = [...rows].reverse().map((r) => ({ r, x: (Math.min(r.km, end) / end) * span }));
  for (let i = 1; i < placed.length; i++) placed[i].x = Math.max(placed[i].x, placed[i - 1].x + gap);
  for (let i = placed.length - 1; i >= 0; i--) placed[i].x = Math.min(placed[i].x, i === placed.length - 1 ? span : placed[i + 1].x - gap);
  const height = CHIP + 8;

  return (
    <div className={"rstrip" + (card ? " card" : "") + (open ? " open" : "")}>
      <RaceHead league={league} rows={rows} open={open} onToggle={() => setOpen(!open)} />
      <div className="rtrack" ref={setTrack} style={{ height }} onClick={() => setOpen(!open)}>
        <i className={"rline" + (end < maxKm ? " part" : "")} />
        {end < maxKm && <span className="rend">{end} km</span>}
        {placed.map(({ r, x }) => (
          <Chip
            key={r.id}
            className={r.me ? "me" : ""}
            title={r.name}
            color={r.me ? undefined : r.color}
            src={r.avatar}
            style={{ transform: `translateX(${x.toFixed(1)}px)`, zIndex: r.me ? 9 : 1 }}
          >
            {r.me ? "TI" : r.tag}
          </Chip>
        ))}
      </div>
      {open && <RaceBody race={race} league={league} pick={pick} rows={rows} step={step} perDay={perDay} />}
    </div>
  );
}
