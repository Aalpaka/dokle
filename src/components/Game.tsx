"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { AnswerList, GameState, Miss, Notice, RoundView } from "@/server/game";
import { routeLabels, type DayCompare } from "@/lib/compare";
import RouteHist from "./RouteHist";
import type { SkinConfig } from "@/skins/types";
import { formatShare, landingAt } from "@/lib/scoring";
import { maps, withVisuals } from "@/skins/maps";
import { nearestStation, placeAt } from "@/skins/mjesta";
import { setMuted, sfx, useMuted } from "@/lib/sound";
import { fold } from "@/lib/matcher";
import MapStage from "./MapStage";
import { vehicleIcons } from "./vehicleIcons";
import { AccountLink, GoogleButton, useMe, type Me } from "./account";
import { SkinPicker } from "./SkinPicker";
import { SKIN_META, type SkinId } from "@/skins/meta";
import { skinFetch, useSkin, useT, type T } from "./skin";
import { LeaguesBox } from "./Leagues";
import { useLeagueRace } from "./Race";

async function api<T>(path: string, body?: unknown): Promise<T> {
  const res = await skinFetch(path, {
    method: body === undefined ? "GET" : "POST",
    headers: body === undefined ? undefined : { "content-type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: "no-store",
  });
  return res.json() as Promise<T>;
}

type AnswerResponse = { status: "rejected"; checked?: boolean } | { status: "scored"; state: GameState } | { status: "no-round" };

export default function Game() {
  const t = useT();
  const [state, setState] = useState<GameState | null>(null);
  const [showEnd, setShowEnd] = useState(false);
  const [error, setError] = useState(false);
  // server otvara iduću kategoriju; dok ne odgovori ostaje prethodni ekran, a odbrojavanje 3, 2, 1 je nad pitanjem (vidi Play)
  const [starting, setStarting] = useState(false);
  // profil (streak) se osvježava kad partija završi
  const me = useMe(state?.phase === "end" || showEnd);
  // utrka lige na karti: osvježi se nakon svake kategorije, a na kraju svake minute dok ekipa igra
  const race = useLeagueRace(!!me?.user && !!state?.ranked && state.phase !== "intro", state?.rounds.length, state?.phase === "end" || showEnd);
  // na mobitelu je panel donja ploča preko karte; karta zna koliko joj je dna pokriveno
  const [sheet, setSheet] = useState(0);
  const sheetObs = useRef<ResizeObserver | null>(null);
  const panelRef = useCallback((el: HTMLElement | null) => {
    sheetObs.current?.disconnect();
    if (!el) return;
    const measure = () => setSheet(getComputedStyle(el).position === "absolute" ? el.offsetHeight : 0);
    sheetObs.current = new ResizeObserver(measure);
    sheetObs.current.observe(el);
    measure();
  }, []);

  const load = useCallback(() => {
    api<GameState>("/api/game").then(setState, () => setError(true));
  }, []);
  useEffect(load, [load]);
  // naknadno prihvaćeni odgovori iz prijašnjih partija
  const [notices, setNotices] = useState<Notice[]>([]);
  useEffect(() => {
    api<Notice[]>("/api/game/notices").then((n) => setNotices(Array.isArray(n) ? n : []), () => {});
  }, []);
  const dismiss = () => {
    setNotices([]);
    api("/api/game/notices", {}).catch(() => {});
    // današnja partija je možda dobila km
    load();
  };
  // kraj počinje s kartom na vrhu, gdje ide replay
  useEffect(() => {
    if (showEnd) window.scrollTo(0, 0);
  }, [showEnd]);

  useEffect(() => {
    if (!starting) return;
    api<GameState>("/api/game/start", { ref: document.referrer }).then(
      (s) => {
        setState(s);
        setStarting(false);
      },
      () => setError(true),
    );
  }, [starting]);

  if (error) return <Shell><div className="stage empty" /><section className="panel">{t("Nešto je pošlo krivo. Osvježi stranicu.")}</section></Shell>;
  if (!state) return <Shell><div className="stage empty" /><section className="panel loading">{t("Učitavam…")}</section></Shell>;

  const cfg = withVisuals(state.skin.id, state.skin.config);
  // djeca čitaju state.skin.config, pa im se predaje konfiguracija s logima iz koda
  const vstate: GameState = { ...state, skin: { ...state.skin, config: cfg } };
  const start = () => setStarting(true);
  const phase = state.phase === "reveal" && showEnd ? "end" : state.phase;

  const map = maps[state.skin.id] ?? maps.hr;
  const notice = notices.length > 0 && <Notices list={notices} skinId={state.skin.id} cfg={cfg} onClose={dismiss} />;
  if (phase === "intro") return <>{notice}<Landing state={state} cfg={cfg} me={me} onStart={start} /></>;

  // igra stane na jedan ekran (karta + pitanje), kraj je obična stranica koja se skrola
  return (
    <Shell state={state} me={me} fit={phase !== "end"}>
      <MapStage skinId={state.skin.id} cfg={cfg} map={map} rounds={state.rounds} perDay={state.perDay} ended={phase === "end"} inset={phase === "end" ? 0 : sheet} race={race} />
      <section className="panel" aria-live="polite" ref={panelRef}>
        {phase === "play" && state.current && (
          <Play key={state.current.position} state={vstate} onScored={setState} onLost={load} />
        )}
        {phase === "reveal" && (
          <Reveal
            state={vstate}
            onNext={() => (state.rounds.length >= state.perDay ? setShowEnd(true) : start())}
            onState={setState}
          />
        )}
        {phase === "end" && <End state={vstate} me={me} onState={setState} />}
      </section>
      {notice}
      {phase === "end" && <p className="credit">{map.credit} {t("Zvukovi su sintetizirani u pregledniku.")}</p>}
    </Shell>
  );
}

function Shell({ state, me = null, fit = false, children }: { state?: GameState; me?: Me | null; fit?: boolean; children: React.ReactNode }) {
  const cfg = state?.skin.config;
  const { href } = useSkin();
  const [y, m, d] = (state?.date ?? "").split("-");
  const wrapRef = useRef<HTMLDivElement>(null);
  // mobitel: igra prati vidljivi dio ekrana, pa kad se otvori tipkovnica ploča s unosom ide gore s njom
  useEffect(() => {
    const vv = window.visualViewport, el = wrapRef.current;
    if (!fit || !vv || !el) return;
    const sync = () => {
      el.style.setProperty("--vvh", vv.height + "px");
      el.style.setProperty("--vvt", vv.offsetTop + "px");
    };
    sync();
    vv.addEventListener("resize", sync);
    vv.addEventListener("scroll", sync);
    return () => {
      vv.removeEventListener("resize", sync);
      vv.removeEventListener("scroll", sync);
    };
  }, [fit]);
  return (
    <div className={"wrap" + (fit ? " fit" : "")} ref={wrapRef}>
      <header className="top">
        <a href={href("/")} className="plate" style={{ textDecoration: "none" }}>{cfg?.title ?? "Dokle?"}</a>
        {state && cfg && (
          <div className="meta">
            <b>#{state.number}</b> · {+d}. {+m}. {y}.<br />
            {cfg.stations[0].name} → {cfg.stations[cfg.stations.length - 1].name} · {cfg.maxKm} km
          </div>
        )}
        <div className="spacer" />
        <MuteButton />
        <SkinPicker />
        <AccountLink me={me} />
      </header>
      {children}
    </div>
  );
}

function MuteButton() {
  const muted = useMuted();
  const t = useT();
  return (
    <button
      type="button"
      className="iconbtn"
      aria-pressed={muted}
      aria-label={muted ? t("Uključi zvuk") : t("Isključi zvuk")}
      title={muted ? t("Uključi zvuk") : t("Isključi zvuk")}
      onClick={() => setMuted(!muted)}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor" />
        {muted ? <path d="m16 9.5 5 5M21 9.5l-5 5" /> : <path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" />}
      </svg>
    </button>
  );
}

/** Početni ekran: veliki naziv, kratka pravila i start; karta dolazi tek nakon starta. */
function Landing({ state, cfg, me, onStart }: { state: GameState; cfg: SkinConfig; me: Me | null; onStart: () => void }) {
  const first = cfg.stations[0], last = cfg.stations[cfg.stations.length - 1];
  const t = useT();
  const [y, m, d] = state.date.split("-");
  return (
    <div className="landing">
      <div className="landing-bg" aria-hidden="true" style={{ "--landing-map": `url(${maps[state.skin.id]?.image.href ?? maps.hr.image.href})` } as React.CSSProperties} />
      <header className="landing-top">
        <span className="meta"><b>#{state.number}</b> · {+d}. {+m}.<span className="wide"> {y}.</span></span>
        <div className="spacer" />
        <MuteButton />
        <SkinPicker />
        <AccountLink me={me} />
      </header>
      <main className="landing-main">
        <h1 className={"plate big" + (cfg.title.length > 8 ? " long" : "")}>{cfg.title}</h1>
        <p className="route-line">{first.name} → {last.name} · {cfg.maxKm} km</p>
        <p className="lead">
          {t("{n} kategorija, za svaku jedan odgovor. Što je tvoj odgovor rjeđi među igračima, to brže putuješ prema {cilj}.", {
            n: state.perDay,
            cilj: last.dative ?? last.name,
          })}
        </p>
        <ul className="vehicles" aria-label={t("Prijevoz prema rijetkosti odgovora")}>
          {cfg.tiers.map((x) => (
            <li key={x.name} style={{ "--vc": x.color } as React.CSSProperties}>
              <span className={"vb" + (x.badge ?? x.icon ? " logo" : "")} dangerouslySetInnerHTML={{ __html: x.badge ?? x.icon ? `<img src="${x.badge ?? x.icon}" alt="">` : vehicleIcons[x.vehicle] }} />
              <b>{x.name}</b>
              <small>+{x.km} km</small>
            </li>
          ))}
        </ul>
        <p className="rarity-hint"><span>{t("češći odgovor")}</span><span>{t("rjeđi odgovor")}</span></p>
        {!state.ranked && <p className="unranked">{t("Danas si već odigrao drugu državu, pa je ova partija za gušt: ne ulazi u lige, streak ni postotke odgovora.")}</p>}
        <button className="start" autoFocus onClick={onStart}>{t("Kreni iz {mjesta}", { mjesta: first.genitive ?? first.name })}</button>
        <details className="howto">
          <summary>{t("Pravila")}</summary>
          <ul className="rules">
            <li><span className="k">{cfg.secondsPerCategory}s</span><span>{t("po kategoriji, vrijeme kreće 3 sekunde nakon što vidiš pitanje, Enter šalje odgovor")}</span></li>
            <li><span className="k">1×</span><span>{t("jedan odgovor; ako ga nemamo na popisu, probaj opet dok traje vrijeme")}</span></li>
            <li><span className="k">⚡</span><span>{t("što brže odgovoriš, to više km; ako se predugo misliš, dobiješ malo manje")}</span></li>
            <li><span className="k">{cfg.miss.emoji}</span><span>{t("bez odgovora: {x}, 0 km", { x: cfg.miss.name.toLowerCase() })}</span></li>
            <li><span className="k">📅</span><span>{t("kategorije su svaki dan iste za sve, nova ruta u ponoć")}</span></li>
          </ul>
        </details>
        <p className="legal small"><a href="/privatnost">{t("Privatnost")}</a>{" · "}<a href="/uvjeti">{t("Uvjeti korištenja")}</a></p>
      </main>
    </div>
  );
}

function Play({ state, onScored, onLost }: { state: GameState; onScored: (s: GameState) => void; onLost: () => void }) {
  const cfg = state.skin.config;
  const cur = state.current!;
  const t = useT();
  const seconds = cfg.secondsPerCategory;
  const [value, setValue] = useState("");
  // sekunde se iscrtavaju kroz React samo kad se promijene, a traka izravno u svakom okviru
  const [left, setLeft] = useState(Math.ceil(cur.remainingMs / 1000));
  // sekunde do početka vremena: pitanje se već vidi, ali odgovor se još ne može upisati
  const [wait, setWait] = useState(Math.ceil(cur.waitMs / 1000));
  const waiting = wait > 0;
  const inputRef = useRef<HTMLInputElement>(null);
  const barRef = useRef<HTMLElement>(null);
  const [sending, setSending] = useState<{ kind: "idle" | "preview" | "nope"; canonical?: string | null; raw?: string; checked?: boolean }>({ kind: "idle" });
  const busy = useRef(false);
  const valueRef = useRef(value);
  valueRef.current = value;

  const send = useCallback(
    async (raw: string, final: boolean, keep = false) => {
      if (busy.current) return;
      busy.current = true;
      try {
        const r = await api<AnswerResponse>("/api/game/answer", { raw, final, keep });
        if (r.status === "scored") onScored(r.state);
        else if (r.status === "rejected") {
          sfx.wrong();
          setSending({ kind: "nope", raw: raw.trim(), checked: r.checked });
        }
        else onLost();
      } finally {
        busy.current = false;
      }
    },
    [onScored, onLost],
  );

  // tajmer; server je mjerodavan, ovo je samo prikaz
  useEffect(() => {
    const begin = performance.now() + cur.waitMs;
    const deadline = begin + cur.remainingMs;
    let raf = 0, lastBeep = Math.ceil(cur.remainingMs / 1000), lastCount = Infinity;
    const tick = () => {
      const w = Math.ceil((begin - performance.now()) / 1000);
      if (w > 0) {
        // odbrojavanje nad pitanjem: 3, 2, 1, pa viši ton kad vrijeme krene
        if (w < lastCount) {
          lastCount = w;
          setWait(w);
          sfx.count(false);
        }
        raf = requestAnimationFrame(tick);
        return;
      }
      if (lastCount !== 0 && cur.waitMs > 0) {
        lastCount = 0;
        setWait(0);
        sfx.count(true);
        inputRef.current?.focus();
      }
      const l = Math.max(0, (deadline - performance.now()) / 1000);
      setLeft(Math.ceil(l));
      barRef.current?.style.setProperty("transform", `scaleX(${l / seconds})`);
      // zadnjih 5 sekundi otkucava
      if (l > 0 && l <= 5 && Math.ceil(l) < lastBeep) {
        lastBeep = Math.ceil(l);
        sfx.tick();
      }
      if (l <= 0) {
        busy.current = false;
        send(valueRef.current, true);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [cur.remainingMs, cur.waitMs, send]);

  // "Šalje se:" pregled sa servera; pita tek kad igrač zastane, a već viđeni upis (brisanje unatrag) ne pita opet
  const previews = useRef(new Map<string, string | null>());
  const lookup = useCallback(
    async (q: string, signal?: AbortSignal) => {
      const key = `${cur.position}|${q.toLowerCase()}`;
      if (previews.current.has(key)) return previews.current.get(key)!;
      const r: { canonical: string | null } = await skinFetch("/api/game/preview?q=" + encodeURIComponent(q), { signal }).then((r) => r.json());
      previews.current.set(key, r.canonical);
      return r.canonical;
    },
    [cur.position],
  );
  useEffect(() => {
    const q = value.trim();
    if (!q) return setSending({ kind: "idle" });
    // pregled koji stigne nakon slanja ne briše poruku o odbijenom odgovoru (ni gumb za provjeru)
    const show = (canonical: string | null) => setSending((s) => (s.kind === "nope" && s.raw === q ? s : { kind: "preview", canonical }));
    const cached = previews.current.get(`${cur.position}|${q.toLowerCase()}`);
    if (cached !== undefined) return show(cached);
    const ctrl = new AbortController();
    const timer = setTimeout(() => lookup(q, ctrl.signal).then(show).catch(() => {}), 300);
    return () => { clearTimeout(timer); ctrl.abort(); };
  }, [value, cur.position, lookup]);

  // alias ili tipfeler (ne samo dijakritici i velika slova) traži potvrdu: prvi Enter pokaže što će se poslati, drugi šalje
  const [confirm, setConfirm] = useState<string | null>(null);
  const differs = (q: string, canonical: string | null | undefined) => !!canonical && fold(q) !== fold(canonical);
  const submit = async () => {
    const q = value.trim();
    if (!q || waiting || busy.current) return;
    if (confirm === q) return send(value, false);
    let canonical: string | null = null;
    try {
      canonical = await lookup(q);
    } catch {
      // bez pregleda šaljemo odmah, server ionako provjerava
    }
    if (valueRef.current.trim() !== q) return;
    if (differs(q, canonical)) {
      setSending({ kind: "preview", canonical });
      setConfirm(q);
    } else send(value, false);
  };

  const shown = sending.kind === "preview" ? (sending.canonical ?? value.trim()) : "";
  const changed = sending.kind === "preview" && differs(value.trim(), sending.canonical);
  const confirming = changed && confirm === value.trim();

  return (
    <div className="stack">
      <div className="qhead">
        <span className="eyebrow">{cfg.groups[cur.category.group]}</span>
        <span className="qnum">{cur.position + 1} / {state.perDay}</span>
      </div>
      <div className="cat">{cur.category.title}</div>
      {cur.category.hint && <p className="hint">{cur.category.hint}</p>}
      <div className={"timer" + (left <= 5 ? " low" : "") + (waiting ? " wait" : "")}>
        <i ref={barRef} style={{ transform: `scaleX(${cur.remainingMs / 1000 / seconds})` }} />
      </div>
      {waiting ? (
        <div className="trow wait"><span>{t("Vrijeme kreće za")} <b className="waitnum" key={wait}>{wait}</b></span><span>{t("Rjeđi odgovor = brže prijevozno sredstvo")}</span></div>
      ) : (
        <div className="trow"><span>{left} s</span><span>{t("Rjeđi odgovor = brže prijevozno sredstvo")}</span></div>
      )}
      <form
        className="answer"
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <input
          ref={inputRef}
          autoFocus
          type="text"
          enterKeyHint="send"
          autoCapitalize="sentences"
          spellCheck={false}
          aria-label={t("Tvoj odgovor")}
          placeholder={waiting ? t("Pročitaj pitanje…") : t("Tvoj odgovor")}
          value={value}
          onChange={(e) => {
            // dok vrijeme ne krene ne može se upisivati (tipkovnica može ostati otvorena)
            if (waiting) return;
            // prvo slovo uvijek veliko, kao u kanonskim odgovorima
            const v = e.target.value;
            setValue(v.charAt(0).toLocaleUpperCase("hr") + v.slice(1));
            sfx.type();
          }}
        />
        <button type="submit" disabled={waiting} className={confirming ? "confirm" : undefined}>{confirming ? t("Potvrdi") : t("Pošalji")}</button>
      </form>
      {sending.kind === "nope" ? (
        sending.checked ? (
          <div className="sending nope">{t("„{x}” smo već provjerili i nije prihvaćen. Probaj nešto drugo.", { x: sending.raw ?? "" })}</div>
        ) : (
          <div className="sending nope keep">
            <span>{t("„{x}” još nemamo na popisu. Probaj nešto drugo ili ga ostavi na provjeru.", { x: sending.raw ?? "" })}</span>
            {/* igrač koji zna da je u pravu ne mora tražiti drugi odgovor: runda se zatvara, a km stižu kad ga prihvatimo */}
            <button type="button" className="ghost small-btn" onClick={() => send(sending.raw ?? value, false, true)}>{t("Siguran sam, provjerite")}</button>
          </div>
        )
      ) : confirming ? (
        <div className="sending ask" role="status">
          <span>{t("Misliš na")} <b>{shown}</b>?</span>
          <small>{t("Stisni Enter ili Potvrdi za slanje, ili ispravi odgovor.")}</small>
        </div>
      ) : sending.kind === "preview" ? (
        <div className={"sending" + (changed ? " changed" : "")}>{t("Šalje se:")} <b>{shown}</b></div>
      ) : (
        <div className="sending">{waiting ? t("Pročitaj pitanje, upisivanje kreće za koju sekundu.") : t("Upiši odgovor i stisni Enter.")}</div>
      )}
    </div>
  );
}

function Reveal({ state, onNext, onState }: { state: GameState; onNext: () => void; onState: (s: GameState) => void }) {
  const cfg = withVisuals(state.skin.id, state.skin.config);
  const r = state.rounds[state.rounds.length - 1];
  const before = landingAt(cfg, state.totalKm - r.km);
  const after = landingAt(cfg, state.totalKm);
  const last = state.rounds.length >= state.perDay;
  const t = useT();
  return (
    <div className="stack">
      <div className="qhead">
        <span className="eyebrow">{cfg.groups[r.category.group]}</span>
        <span className="qnum">{r.position + 1} / {state.perDay}</span>
      </div>
      <div className="cat">{r.category.title}</div>
      <div className={"result" + (r.canonical ? "" : " miss")}>
        <div className="big">
          <span className="emo"><TierIcon emoji={r.emoji} icon={iconFor(cfg, r)} /></span>
          <div>
            <div>{what(r, t)}</div>
            <div className="small">{t(r.tier)}{r.speed && <> · {r.speed.emoji} {r.speed.name} ×{String(r.speed.multiplier).replace(".", ",")}</>}</div>
          </div>
          <span className="km">+{r.km}</span>
        </div>
        {r.report && <ReportLine r={r} onState={onState} />}
        {r.fact && <p className="small fact">💡 {r.fact}</p>}
        {after !== before && (
          <p className="small">{after === cfg.overshoot?.station ? `Preletio si ${cfg.stations[cfg.stations.length - 1].name} i završio u` : t("Prošao si")}: <b>{after.name}</b></p>
        )}
      </div>
      <div className="row">
        <button autoFocus onClick={onNext}>{last ? t("Vidi dokle si stigao") : t("Dalje")}</button>
      </div>
    </div>
  );
}

/** Logo prijevoza ako ga tier ima, inače emoji (i kad se slika ne učita). */
function TierIcon({ emoji, icon }: { emoji: string; icon?: string }) {
  const [broken, setBroken] = useState(false);
  if (!icon || broken) return <>{emoji}</>;
  return <img className="tier-icon" src={icon} alt={emoji} onError={() => setBroken(true)} />;
}

function iconFor(cfg: SkinConfig, r: RoundView) {
  const t = r.canonical ? cfg.tiers.find((x) => x.name === r.tier) : undefined;
  return t?.badge ?? t?.icon ?? r.icon;
}

function what(r: RoundView, t: T) {
  if (r.canonical) return <><b>{r.canonical}</b> · {formatShare(r.share ?? 0)} {t("igrača")}</>;
  if (r.report === "pending") return <>{t("„{x}” je na provjeri.", { x: r.reported ?? r.raw ?? "" })}</>;
  if (r.report === "open") return <>{t("„{x}” još nemamo na popisu.", { x: r.raw ?? "" })}</>;
  if (r.raw) return <>{t("„{x}” nije na našem popisu.", { x: r.raw })}</>;
  return <>{t("Nisi stigao odgovoriti.")}</>;
}

/** Promašaj s upisom: prijava da odgovor fali, ili gdje je prijava. */
function ReportLine({ r, onState, compact = false }: { r: RoundView; onState: (s: GameState) => void; compact?: boolean }) {
  const t = useT();
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  if (r.report === "pending")
    return compact ? null : <p className="small report">{t("Ako je točan, km ti dodajemo naknadno i javimo ti kad ga prihvatimo.")}</p>;
  if (r.report !== "open") return null;
  const report = () => {
    setBusy(true);
    api<GameState | null>("/api/game/report", { position: r.position }).then(
      (s) => (s ? onState(s) : setFailed(true)),
      () => setFailed(true),
    ).finally(() => setBusy(false));
  };
  return (
    <p className={"small report" + (compact ? " compact" : "")}>
      {!compact && <span>{t("Siguran si da je točan?")} </span>}
      <button type="button" className="ghost small-btn" disabled={busy} onClick={report}>{t("Prijavi da fali")}</button>
      {failed && <span> {t("Prijava nije uspjela.")}</span>}
    </p>
  );
}

/** Odgovori koje je admin naknadno prihvatio: km su već dodani, igrač to sad saznaje. */
function Notices({ list, skinId, cfg, onClose }: { list: Notice[]; skinId: string; cfg: SkinConfig; onClose: () => void }) {
  const t = useT();
  return (
    <div className="notice" role="status">
      <b>{list.length === 1 ? t("Prihvatili smo tvoj odgovor! 🎉") : t("Prihvatili smo tvoje odgovore! 🎉")}</b>
      <ul>
        {list.map((n) => {
          const [, m, d] = n.date.split("-");
          return (
            <li key={`${n.gameId}:${n.position}`}>
              {t("„{x}” ({kategorija}, {datum}): +{km} km, partija sad ima {ukupno} km ({mjesto}).", {
                x: n.canonical,
                kategorija: n.category,
                datum: `${+d}. ${+m}.`,
                km: n.km,
                ukupno: n.totalKm,
                mjesto: placeAt(skinId, cfg, n.totalKm),
              })}
            </li>
          );
        })}
      </ul>
      <button type="button" onClick={onClose}>{t("Super")}</button>
    </div>
  );
}

function End({ state, me, onState }: { state: GameState; me: Me | null; onState: (s: GameState) => void }) {
  const cfg = withVisuals(state.skin.id, state.skin.config);
  const km = state.totalKm;
  // ime je najbliže stvarno mjesto, a šala iz poruke samo od postaje do koje je igrač blizu (cilj tek kad je stigao)
  const place = placeAt(state.skin.id, cfg, km);
  const egg = !!cfg.overshoot && km > cfg.overshoot.overKm;
  const near = nearestStation(cfg, km);
  const goal = cfg.stations[cfg.stations.length - 1];
  const message = egg || (Math.abs(near.km - km) <= 15 && (near !== goal || km >= goal.km)) ? near.message : "";
  const next = cfg.stations.find((s) => s.km > km);
  const first = cfg.stations[0];
  const t = useT();
  const { href } = useSkin();
  const [copied, setCopied] = useState("");
  const [cmp, setCmp] = useState<Compare | null>(null);
  // partija izvan konkurencije (druga država istog dana) nema usporedbu s ostalim igračima
  useEffect(() => {
    if (state.ranked) api<Compare | null>("/api/game/compare").then(setCmp, () => setCmp(null));
  }, [state.ranked]);
  const share = shareText(state, place, egg, cmp?.ahead ?? null, t);
  const onShare = () => {
    const copy = () =>
      navigator.clipboard.writeText(share).then(() => setCopied(t("Kopirano, zalijepi gdje želiš.")), () => setCopied(t("Kopiraj ručno.")));
    // na mobitelu otvori izbornik za dijeljenje, na računalu samo kopiraj
    if (navigator.share && matchMedia("(pointer: coarse)").matches) navigator.share({ text: share }).catch((e) => { if (e?.name !== "AbortError") copy(); });
    else copy();
  };
  return (
    <div className="stack">
      <div className="end-head">
        <span className="eyebrow">{t("Kraj puta za danas")}</span>
        <Countdown timezone={state.skin.timezone} className="next-route" />
      </div>
      <div className="arrive">
        <span className="kmt">{first.name} → {km} km</span>
        <span className="town">{place}</span>
        {!egg && near.name !== place && (
          <span className="near">{t("Najbliži veći grad: {grad}, {n} km", { grad: near.name, n: Math.abs(near.km - km) })}</span>
        )}
        {message && <span>{message}</span>}
      </div>
      {!state.ranked && <p className="small">{t("Izvan konkurencije: danas se broji samo prva država koju si odigrao.")}</p>}
      {next && <p className="small">{t("Do {mjesta} ti je falilo još {n} km.", { mjesta: next.genitive ?? next.name, n: next.km - km })}</p>}
      {cmp && <CompareChart c={cmp} cfg={cfg} skinId={state.skin.id} />}
      <span className="small">{t("Klikni kategoriju za sve moguće odgovore i koliko je koji vrijedio.")}</span>
      <ul className="recap">
        {state.rounds.map((r) => (
          <RecapRow key={r.position} r={r} cfg={cfg} onState={onState} />
        ))}
      </ul>
      <pre className="share">{share}</pre>
      <div className="row">
        <button onClick={onShare}>{t("Podijeli rezultat")}</button>
        <span className="small">{copied}</span>
      </div>
      {me?.authEnabled && !me.user && (
        <div className="savebox">
          <b>{t("Spremi rezultat i prati streak")}</b>
          <span className="small">{t("Prijavom se današnja partija sprema na tvoj račun, pa povijest vidiš na svakom uređaju.")}</span>
          <div className="row"><GoogleButton /></div>
        </div>
      )}
      {me?.user && <LeaguesBox />}
      {me?.user && me.stats && (
        <p className="small">
          🔥 Streak: <b>{me.stats.currentStreak}</b> {me.stats.currentStreak === 1 ? t("dan") : t("dana")} · <a href={href("/profil")}>{t("tvoja povijest")}</a>
        </p>
      )}
    </div>
  );
}

/** Tekst za dijeljenje: naslov i km, ruta, usporedba, pa prijevoz po kategorijama u dva reda (bez oznaka brzine). */
function shareText(state: GameState, town: string, egg: boolean, ahead: number | null, t: T) {
  const cfg = state.skin.config;
  const flag = egg ? " 🙃" : state.totalKm >= cfg.maxKm ? " 🏁" : "";
  const km = state.totalKm;
  const half = Math.ceil(state.rounds.length / 2);
  const icons = state.rounds.map((r) => r.emoji);
  return [
    `${cfg.title} #${state.number} · ${km} km`,
    `📍 ${cfg.stations[0].name} → ${town}${flag}`,
    ...(ahead != null ? [`🏆 ${t("Dalje od {n} % igrača", { n: ahead })}`] : []),
    "",
    icons.slice(0, half).join(" "),
    icons.slice(half).join(" "),
    "",
    location.origin + (SKIN_META[state.skin.id as SkinId]?.base ?? ""),
  ].join("\n");
}

type Compare = DayCompare & { mine: number };

/** Gdje su danas stali ostali: stupci po 100 km uz rutu bez brojeva (iza igrača zeleno, ispred sivo), igračev stupac žut s pločom TI. */
function CompareChart({ c, cfg, skinId }: { c: Compare; cfg: SkinConfig; skinId: string }) {
  const t = useT();
  if (c.ahead === null)
    return (
      <div className="compare">
        <p className="cmp-head">{t("Prvi si danas završio partiju. Navrati kasnije i vidi gdje su stali ostali.")}</p>
      </div>
    );
  const avgAt = placeAt(skinId, cfg, c.avgKm);
  return (
    <div className="compare">
      <p className="cmp-head">
        {t("Stigao si dalje od")} <span className="cmp-pct">{c.ahead} %</span> {t("igrača")}
      </p>
      <span className="cmp-sub">{t("Gdje su danas stali igrači")}</span>
      <RouteHist hist={c.hist} labels={routeLabels(cfg, c.bestKm)} mineBin={c.mineBin} label={`${t("Gdje su danas stali igrači")}. ${t("Ti si na {n} km.", { n: c.mine })}`} />
      <p className="cmp-key">
        <span><i className="behind" />{c.behind} {t("iza tebe")}</span>
        <span><i className="front" />{c.players - 1 - c.behind} {t("ispred tebe")}</span>
      </p>
      <p className="small">
        {t("Završenih partija danas:")} <b>{c.players}</b> · {t("prosjek")} {c.avgKm} km ({avgAt}) · {t("najdalje")} {c.bestKm} km ({c.bestTown})
      </p>
    </div>
  );
}

function RecapRow({ r, cfg, onState }: { r: RoundView; cfg: SkinConfig; onState: (s: GameState) => void }) {
  const t = useT();
  const [open, setOpen] = useState(false);
  return (
    <li className={open ? "open" : ""}>
      <button type="button" className="recap-row" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span><TierIcon emoji={r.emoji} icon={iconFor(cfg, r)} />{r.speed?.emoji}</span>
        <span>
          <span className="c">{r.category.title}</span><br />
          <span className="a">{r.canonical ?? (r.raw ? `„${r.raw}”` : "—")}</span>
          {r.report === "pending" && <span className="c"> · {t("na provjeri")}</span>}
        </span>
        <span className="k">+{r.km}</span>
        <span className="chev" aria-hidden="true">{open ? "▴" : "▾"}</span>
      </button>
      {/* promašaj kojem je jedini odbijeni upis onaj konačni ima samo gumb, popis tek kad ima više pokušaja ili je runda pogođena */}
      {r.misses?.some((m) => m.raw.toLowerCase() !== r.raw?.toLowerCase())
        ? <MissList r={r} misses={r.misses} onState={onState} />
        : r.report === "open" && <ReportLine r={r} onState={onState} compact />}
      {open && <AllAnswers position={r.position} cfg={cfg} />}
    </li>
  );
}

/** Odbijeni pokušaji runde; jedan se može prijaviti, i kad je igrač poslije pogodio. */
function MissList({ r, misses, onState }: { r: RoundView; misses: Miss[]; onState: (s: GameState) => void }) {
  const t = useT();
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const canCount = misses.some((m) => m.state === "open");
  const send = (raw: string, count: boolean) => {
    setBusy(true);
    setFailed(false);
    api<GameState | null>("/api/game/report", { position: r.position, raw, count }).then(
      (s) => (s ? onState(s) : setFailed(true)),
      () => setFailed(true),
    ).finally(() => setBusy(false));
  };
  const counted: Record<NonNullable<Miss["state"]>, string> = {
    open: "",
    pending: "⏳ " + t("želiš da se računa, na provjeri"),
    rejected: "🚧 " + t("nije prihvaćen"),
    accepted: "✅ " + t("prihvaćen, računa se"),
    kept: "✅ " + t("prihvaćen, ali ostaje odgovor koji vrijedi više"),
  };
  const flagged: Record<NonNullable<Miss["flag"]>, string> = {
    open: "",
    pending: "⏳ " + t("prijavljeno da fali"),
    rejected: "🚧 " + t("nije prihvaćen"),
    accepted: "✅ " + t("dodan na popis"),
  };
  return (
    <div className="misses small">
      <span className="c">
        {t("Nepriznato:")}{" "}
        {canCount &&
          (r.canonical
            ? t("„Prijavi da fali” nam samo javlja da odgovora nema na popisu. Jedan možeš odabrati da se računa: ako ga prihvatimo, računa se onaj koji vrijedi više km.")
            : t("„Prijavi da fali” nam samo javlja da odgovora nema na popisu. Jedan možeš odabrati da se računa: ako ga prihvatimo, km ti dodajemo naknadno."))}
      </span>
      <ul>
        {misses.map((m) => (
          <li key={m.raw}>
            <span className="a">„{m.raw}”</span>
            {m.state === "open" && (
              <button type="button" className="small-btn" disabled={busy} onClick={() => send(m.raw, true)}>{t("Želim da se ovaj računa")}</button>
            )}
            {m.state && m.state !== "open" && <span className={"st " + m.state}>{counted[m.state]}</span>}
            {m.flag === "open" && (
              <button type="button" className="ghost small-btn" disabled={busy} onClick={() => send(m.raw, false)}>{t("Prijavi da fali")}</button>
            )}
            {m.flag && m.flag !== "open" && <span className={"st " + m.flag}>{flagged[m.flag]}</span>}
          </li>
        ))}
      </ul>
      {failed && <span>{t("Prijava nije uspjela.")}</span>}
    </div>
  );
}

/** Svi odgovori kategorije s udjelom i prijevozom, s pretragom. */
function AllAnswers({ position, cfg }: { position: number; cfg: SkinConfig }) {
  const [list, setList] = useState<AnswerList | null | "error">(null);
  const [q, setQ] = useState("");
  const t = useT();
  useEffect(() => {
    api<AnswerList | null>(`/api/game/answers?position=${position}`).then((l) => setList(l ?? "error"), () => setList("error"));
  }, [position]);
  if (list === null) return <div className="allans small">{t("Učitavam odgovore…")}</div>;
  if (list === "error") return <div className="allans small">{t("Odgovori se ne mogu učitati.")}</div>;
  const fold = (s: string) => s.toLowerCase().replace(/đ/g, "d").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const f = fold(q.trim());
  const shown = f ? list.answers.filter((a) => fold(a.canonical).includes(f)) : list.answers;
  return (
    <div className="allans">
      <input
        className="field"
        type="search"
        placeholder={t("Traži među {n} odgovora", { n: list.answers.length })}
        aria-label={t("Traži odgovor")}
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <span className="small">{t("Udio igrača danas i km koje odgovor donosi, bez bonusa za brzinu.")}</span>
      <ol>
        {shown.map((a) => {
          const tier = cfg.tiers.find((x) => x.name === a.tier);
          return (
            <li key={a.canonical} className={a.canonical === list.mine ? "mine" : ""}>
              <span className="ti">{tier && <TierIcon emoji={tier.emoji} icon={tier.badge ?? tier.icon} />}</span>
              <span className="n">{a.canonical}{a.canonical === list.mine && <em> · {t("tvoj")}</em>}</span>
              <span className="s">{formatShare(a.share)}</span>
              <span className="k">+{a.km}</span>
              {a.fact && <span className="fact small">💡 {a.fact}</span>}
            </li>
          );
        })}
        {!shown.length && <li className="small">{t("Nema takvog odgovora.")}</li>}
      </ol>
    </div>
  );
}

function Countdown({ timezone, className = "small" }: { timezone: string; className?: string }) {
  const [text, setText] = useState("");
  const t = useT();
  useEffect(() => {
    const tick = () => {
      const parts = new Intl.DateTimeFormat("en-GB", { timeZone: timezone, hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
        .formatToParts(new Date());
      const h = +parts.find((p) => p.type === "hour")!.value;
      const m = +parts.find((p) => p.type === "minute")!.value;
      const leftMin = 24 * 60 - (h * 60 + m);
      setText(t("Nova ruta za {h} h {m} min", { h: Math.floor(leftMin / 60), m: String(leftMin % 60).padStart(2, "0") }));
    };
    tick();
    const timer = setInterval(tick, 30000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timezone]);
  return <span className={className}>{text}</span>;
}
