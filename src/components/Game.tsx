"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { AnswerList, GameState, RoundView } from "@/server/game";
import { BUCKET_KM, type DayCompare } from "@/lib/compare";
import type { SkinConfig, Station } from "@/skins/types";
import { formatShare, landingAt, stationAt } from "@/lib/scoring";
import { maps, withVisuals } from "@/skins/maps";
import { setMuted, sfx, useMuted } from "@/lib/sound";
import MapStage from "./MapStage";
import { vehicleIcons } from "./vehicleIcons";
import { AccountLink, GoogleButton, useMe, type Me } from "./account";
import { LeaguesBox } from "./Leagues";

async function api<T>(path: string, body?: unknown): Promise<T> {
  const res = await fetch(path, {
    method: body === undefined ? "GET" : "POST",
    headers: body === undefined ? undefined : { "content-type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: "no-store",
  });
  return res.json() as Promise<T>;
}

type AnswerResponse = { status: "rejected" } | { status: "scored"; state: GameState } | { status: "no-round" };

export default function Game() {
  const [state, setState] = useState<GameState | null>(null);
  const [showEnd, setShowEnd] = useState(false);
  const [error, setError] = useState(false);
  // odbrojavanje prije kategorije: 3, 2, 1, 0 = "Kreni!" dok server ne pokrene rundu
  const [count, setCount] = useState<number | null>(null);
  // profil (streak) se osvježava kad partija završi
  const me = useMe(state?.phase === "end" || showEnd);
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
  // kraj počinje s kartom na vrhu, gdje ide replay
  useEffect(() => {
    if (showEnd) window.scrollTo(0, 0);
  }, [showEnd]);

  useEffect(() => {
    if (count === null) return;
    sfx.count(count === 0);
    if (count === 0) {
      api<GameState>("/api/game/start", {}).then(
        (s) => {
          setState(s);
          setCount(null);
        },
        () => setError(true),
      );
      return;
    }
    const t = setTimeout(() => setCount(count - 1), 750);
    return () => clearTimeout(t);
  }, [count]);

  if (error) return <Shell><div className="stage empty" /><section className="panel">Nešto je pošlo krivo. Osvježi stranicu.</section></Shell>;
  if (!state) return <Shell><div className="stage empty" /><section className="panel loading">Učitavam…</section></Shell>;

  const cfg = withVisuals(state.skin.id, state.skin.config);
  // djeca čitaju state.skin.config, pa im se predaje konfiguracija s logima iz koda
  const vstate: GameState = { ...state, skin: { ...state.skin, config: cfg } };
  const start = () => setCount(3);
  const phase = state.phase === "reveal" && showEnd ? "end" : state.phase;

  const map = maps[state.skin.id] ?? maps.hr;
  if (phase === "intro" && count === null) return <Landing state={state} cfg={cfg} me={me} onStart={start} />;

  // igra stane na jedan ekran (karta + pitanje), kraj je obična stranica koja se skrola
  return (
    <Shell state={state} me={me} fit={phase !== "end"}>
      <MapStage cfg={cfg} map={map} rounds={state.rounds} perDay={state.perDay} ended={phase === "end"} inset={phase === "end" ? 0 : sheet} />
      <section className="panel" aria-live="polite" ref={panelRef}>
        {count !== null && <Ready n={count} cfg={cfg} position={state.rounds.length} perDay={state.perDay} />}
        {count === null && phase === "play" && state.current && (
          <Play key={state.current.position} state={vstate} onScored={setState} onLost={load} />
        )}
        {count === null && phase === "reveal" && (
          <Reveal
            state={vstate}
            onNext={() => (state.rounds.length >= state.perDay ? setShowEnd(true) : start())}
          />
        )}
        {phase === "end" && <End state={vstate} me={me} />}
      </section>
      {phase === "end" && <p className="credit">{map.credit} Zvukovi su sintetizirani u pregledniku.</p>}
    </Shell>
  );
}

function Shell({ state, me = null, fit = false, children }: { state?: GameState; me?: Me | null; fit?: boolean; children: React.ReactNode }) {
  const cfg = state?.skin.config;
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
        <div className="plate">{cfg?.title ?? "Dokle?"}</div>
        {state && cfg && (
          <div className="meta">
            <b>#{state.number}</b> · {+d}. {+m}. {y}.<br />
            {cfg.stations[0].name} → {cfg.stations[cfg.stations.length - 1].name} · {cfg.maxKm} km
          </div>
        )}
        <div className="spacer" />
        <MuteButton />
        <AccountLink me={me} />
      </header>
      {children}
    </div>
  );
}

function MuteButton() {
  const muted = useMuted();
  return (
    <button
      type="button"
      className="iconbtn"
      aria-pressed={muted}
      aria-label={muted ? "Uključi zvuk" : "Isključi zvuk"}
      title={muted ? "Uključi zvuk" : "Isključi zvuk"}
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
  const [y, m, d] = state.date.split("-");
  return (
    <div className="landing">
      <div className="landing-bg" aria-hidden="true" />
      <header className="landing-top">
        <span className="meta"><b>#{state.number}</b> · {+d}. {+m}.<span className="wide"> {y}.</span></span>
        <div className="spacer" />
        <MuteButton />
        <AccountLink me={me} />
      </header>
      <main className="landing-main">
        <h1 className="plate big">{cfg.title}</h1>
        <p className="route-line">{first.name} → {last.name} · {cfg.maxKm} km</p>
        <p className="lead">
          {state.perDay} kategorija, za svaku jedan odgovor. Što je tvoj odgovor rjeđi među igračima, to brže putuješ prema{" "}
          {last.dative ?? last.name}.
        </p>
        <ul className="vehicles" aria-label="Prijevoz prema rijetkosti odgovora">
          {cfg.tiers.map((t) => (
            <li key={t.name} style={{ "--vc": t.color } as React.CSSProperties}>
              <span className={"vb" + (t.badge ?? t.icon ? " logo" : "")} dangerouslySetInnerHTML={{ __html: t.badge ?? t.icon ? `<img src="${t.badge ?? t.icon}" alt="">` : vehicleIcons[t.vehicle] }} />
              <b>{t.name}</b>
              <small>+{t.km} km</small>
            </li>
          ))}
        </ul>
        <p className="rarity-hint"><span>češći odgovor</span><span>rjeđi odgovor</span></p>
        <button className="start" autoFocus onClick={onStart}>Kreni iz {first.genitive ?? first.name}</button>
        <details className="howto">
          <summary>Pravila</summary>
          <ul className="rules">
            <li><span className="k">{cfg.secondsPerCategory}s</span><span>po kategoriji, vrijeme kreće odmah, Enter šalje odgovor</span></li>
            <li><span className="k">1×</span><span>jedan odgovor; ako ga nemamo na popisu, probaj opet dok traje vrijeme</span></li>
            <li><span className="k">⚡</span><span>što brže odgovoriš, to više km; ako se predugo misliš, dobiješ malo manje</span></li>
            <li><span className="k">{cfg.miss.emoji}</span><span>bez odgovora: {cfg.miss.name.toLowerCase()}, 0 km</span></li>
            <li><span className="k">📅</span><span>kategorije su svaki dan iste za sve, nova ruta u ponoć</span></li>
          </ul>
        </details>
      </main>
    </div>
  );
}

function Play({ state, onScored, onLost }: { state: GameState; onScored: (s: GameState) => void; onLost: () => void }) {
  const cfg = state.skin.config;
  const cur = state.current!;
  const seconds = cfg.secondsPerCategory;
  const [value, setValue] = useState("");
  const [left, setLeft] = useState(cur.remainingMs / 1000);
  const [sending, setSending] = useState<{ kind: "idle" | "preview" | "nope"; canonical?: string | null }>({ kind: "idle" });
  const busy = useRef(false);
  const valueRef = useRef(value);
  valueRef.current = value;

  const send = useCallback(
    async (raw: string, final: boolean) => {
      if (busy.current) return;
      busy.current = true;
      try {
        const r = await api<AnswerResponse>("/api/game/answer", { raw, final });
        if (r.status === "scored") onScored(r.state);
        else if (r.status === "rejected") {
          sfx.wrong();
          setSending({ kind: "nope" });
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
    const deadline = performance.now() + cur.remainingMs;
    let raf = 0, lastBeep = Math.ceil(cur.remainingMs / 1000);
    const tick = () => {
      const l = Math.max(0, (deadline - performance.now()) / 1000);
      setLeft(l);
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
  }, [cur.remainingMs, send]);

  // "Šalje se:" pregled sa servera
  useEffect(() => {
    if (!value.trim()) return setSending({ kind: "idle" });
    const ctrl = new AbortController();
    const t = setTimeout(() => {
      fetch("/api/game/preview?q=" + encodeURIComponent(value), { signal: ctrl.signal })
        .then((r) => r.json())
        .then((r: { canonical: string | null }) => setSending({ kind: "preview", canonical: r.canonical }))
        .catch(() => {});
    }, 120);
    return () => { clearTimeout(t); ctrl.abort(); };
  }, [value]);

  const shown = sending.kind === "preview" ? (sending.canonical ?? value.trim()) : "";
  const changed = sending.kind === "preview" && !!sending.canonical && value.trim().toLowerCase() !== sending.canonical.toLowerCase();

  return (
    <div className="stack">
      <div className="qhead">
        <span className="eyebrow">{cfg.groups[cur.category.group]}</span>
        <span className="qnum">{cur.position + 1} / {state.perDay}</span>
      </div>
      <div className="cat">{cur.category.title}</div>
      {cur.category.hint && <p className="hint">{cur.category.hint}</p>}
      <div className={"timer" + (left <= 5 ? " low" : "")}>
        <i style={{ transform: `scaleX(${left / seconds})` }} />
      </div>
      <div className="trow"><span>{Math.ceil(left)} s</span><span>Rjeđi odgovor = brže prijevozno sredstvo</span></div>
      <form
        className="answer"
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          if (value.trim()) send(value, false);
        }}
      >
        <input
          autoFocus
          type="text"
          enterKeyHint="send"
          autoCapitalize="sentences"
          spellCheck={false}
          aria-label="Tvoj odgovor"
          placeholder="Tvoj odgovor"
          value={value}
          onChange={(e) => {
            // prvo slovo uvijek veliko, kao u kanonskim odgovorima
            const v = e.target.value;
            setValue(v.charAt(0).toLocaleUpperCase("hr") + v.slice(1));
            sfx.type();
          }}
        />
        <button type="submit">Pošalji</button>
      </form>
      {sending.kind === "nope" ? (
        <div className="sending nope">Nema tog odgovora na popisu. Probaj nešto drugo.</div>
      ) : sending.kind === "preview" ? (
        <div className={"sending" + (changed ? " changed" : "")}>Šalje se: <b>{shown}</b></div>
      ) : (
        <div className="sending">Upiši odgovor i stisni Enter.</div>
      )}
    </div>
  );
}

function Ready({ n, cfg, position, perDay }: { n: number; cfg: SkinConfig; position: number; perDay: number }) {
  return (
    <div className="countdown">
      <span className="eyebrow">Kategorija {position + 1} / {perDay}</span>
      <div className="num" key={n}>{n > 0 ? n : "Kreni!"}</div>
      <span className="small">Imaš {cfg.secondsPerCategory} sekundi za jedan odgovor.</span>
    </div>
  );
}

function Reveal({ state, onNext }: { state: GameState; onNext: () => void }) {
  const cfg = withVisuals(state.skin.id, state.skin.config);
  const r = state.rounds[state.rounds.length - 1];
  const before = landingAt(cfg, state.totalKm - r.km);
  const after = landingAt(cfg, state.totalKm);
  const last = state.rounds.length >= state.perDay;
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
            <div>{what(r)}</div>
            <div className="small">{r.tier}{r.speed && <> · {r.speed.emoji} {r.speed.name} ×{String(r.speed.multiplier).replace(".", ",")}</>}</div>
          </div>
          <span className="km">+{r.km}</span>
        </div>
        {after !== before && (
          <p className="small">{after === cfg.overshoot?.station ? `Preletio si ${cfg.stations[cfg.stations.length - 1].name} i završio u` : "Prošao si"}: <b>{after.name}</b></p>
        )}
      </div>
      <div className="row">
        <button autoFocus onClick={onNext}>{last ? "Vidi dokle si stigao" : "Dalje"}</button>
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

function what(r: RoundView) {
  if (r.canonical) return <><b>{r.canonical}</b> · {formatShare(r.share ?? 0)} igrača</>;
  if (r.raw) return <>„{r.raw}” nije na našem popisu.</>;
  return <>Nisi stigao odgovoriti.</>;
}

function End({ state, me }: { state: GameState; me: Me | null }) {
  const cfg = withVisuals(state.skin.id, state.skin.config);
  const km = state.totalKm;
  const st = landingAt(cfg, km);
  const next = cfg.stations.find((s) => s.km > km);
  const first = cfg.stations[0];
  const [copied, setCopied] = useState("");
  const [cmp, setCmp] = useState<Compare | null>(null);
  useEffect(() => {
    api<Compare | null>("/api/game/compare").then(setCmp, () => setCmp(null));
  }, []);
  const share = shareText(state, st, cmp?.ahead ?? null);
  const onShare = () => {
    const copy = () =>
      navigator.clipboard.writeText(share).then(() => setCopied("Kopirano, zalijepi gdje želiš."), () => setCopied("Kopiraj ručno."));
    // na mobitelu otvori izbornik za dijeljenje, na računalu samo kopiraj
    if (navigator.share && matchMedia("(pointer: coarse)").matches) navigator.share({ text: share }).catch((e) => { if (e?.name !== "AbortError") copy(); });
    else copy();
  };
  return (
    <div className="stack">
      <div className="end-head">
        <span className="eyebrow">Kraj puta za danas</span>
        <Countdown timezone={state.skin.timezone} className="next-route" />
      </div>
      <div className="arrive">
        <span className="kmt">{first.name} → {km} km</span>
        <span className="town">{st.name}</span>
        <span>{st.message}</span>
      </div>
      {next && <p className="small">Do {next.genitive ?? next.name} ti je falilo još {next.km - km} km.</p>}
      {cmp && <CompareChart c={cmp} cfg={cfg} />}
      <span className="small">Klikni kategoriju za sve moguće odgovore i koliko je koji vrijedio.</span>
      <ul className="recap">
        {state.rounds.map((r) => (
          <RecapRow key={r.position} r={r} cfg={cfg} />
        ))}
      </ul>
      <pre className="share">{share}</pre>
      <div className="row">
        <button onClick={onShare}>Podijeli rezultat</button>
        <span className="small">{copied}</span>
      </div>
      {me?.authEnabled && !me.user && (
        <div className="savebox">
          <b>Spremi rezultat i prati streak</b>
          <span className="small">Prijavom se današnja partija sprema na tvoj račun, pa povijest vidiš na svakom uređaju.</span>
          <div className="row"><GoogleButton /></div>
        </div>
      )}
      {me?.user && <LeaguesBox />}
      {me?.user && me.stats && (
        <p className="small">
          🔥 Streak: <b>{me.stats.currentStreak}</b> {me.stats.currentStreak === 1 ? "dan" : "dana"} · <a href="/profil">tvoja povijest</a>
        </p>
      )}
    </div>
  );
}

/** Tekst za dijeljenje: naslov i km, ruta, usporedba, pa prijevoz po kategorijama u dva reda (bez oznaka brzine). */
function shareText(state: GameState, town: Station, ahead: number | null) {
  const cfg = state.skin.config;
  const flag = town.km > cfg.maxKm ? " 🙃" : state.totalKm >= cfg.maxKm ? " 🏁" : "";
  const km = state.totalKm;
  const half = Math.ceil(state.rounds.length / 2);
  const icons = state.rounds.map((r) => r.emoji);
  return [
    `Dokle? #${state.number} · ${km} km`,
    `📍 ${cfg.stations[0].name} → ${town.name}${flag}`,
    ...(ahead != null ? [`🏆 Dalje od ${ahead} % igrača`] : []),
    "",
    icons.slice(0, half).join(" "),
    icons.slice(half).join(" "),
    "",
    location.origin,
  ].join("\n");
}

type Compare = DayCompare & { mine: number };

/** Gdje su danas stali ostali: stupci po 100 km uz rutu (iza igrača zeleno, ispred sivo), igračev stupac žut s pločom TI. */
function CompareChart({ c, cfg }: { c: Compare; cfg: SkinConfig }) {
  if (c.ahead === null)
    return (
      <div className="compare">
        <p className="cmp-head">Prvi si danas završio partiju. Navrati kasnije i vidi gdje su stali ostali.</p>
      </div>
    );
  const end = c.hist.length * BUCKET_KM;
  const pct = (km: number) => `${(100 * Math.min(km, end)) / end}%`;
  const top = Math.max(1, ...c.hist);
  const avgAt = stationAt(cfg, c.avgKm);
  // glavne stanice osim starta (na mobitelu se sudara sa Zagrebom); Budva je preblizu Dubrovniku, piše u retku ispod
  const labels = cfg.stations.filter((s) => s.alwaysLabel && s.km > 0);
  return (
    <div className="compare">
      <p className="cmp-head">
        Stigao si dalje od <span className="cmp-pct">{c.ahead} %</span> igrača
      </p>
      <span className="cmp-sub">Gdje su danas stali igrači</span>
      <div className="cmp-chart" role="img" aria-label={`Gdje su danas stali igrači. Ti si na ${c.mine} km.`}>
        <div className="cmp-bars">
          {c.hist.map((n, i) => (
            <div
              key={i}
              className={"cmp-col" + (i === c.mineBin ? " mine" : i > c.mineBin ? " front" : "")}
              style={{ animationDelay: `${i * 40}ms` }}
            >
              {i === c.mineBin ? <span className="cmp-ti">TI</span> : n > 0 && <span className="cmp-n">{n}</span>}
              {n > 0 && <span className="cmp-bar" style={{ height: `${(100 * n) / top}%` }} />}
            </div>
          ))}
        </div>
        <div className="cmp-axis">
          {labels.map((s) => {
            const edge = s.km / end > 0.9 ? " last" : "";
            return (
              <span key={s.name} className={"cmp-city" + edge} style={{ left: pct(s.km) }}>
                {s.name}
                <small>{s.km} km</small>
              </span>
            );
          })}
        </div>
      </div>
      <p className="cmp-key">
        <span><i className="behind" />iza tebe</span>
        <span><i className="front" />ispred tebe</span>
      </p>
      <p className="small">
        Završenih partija danas: <b>{c.players}</b> · prosjek {c.avgKm} km ({avgAt.name}) · najdalje {c.bestKm} km ({c.bestTown})
      </p>
    </div>
  );
}

function RecapRow({ r, cfg }: { r: RoundView; cfg: SkinConfig }) {
  const [open, setOpen] = useState(false);
  return (
    <li className={open ? "open" : ""}>
      <button type="button" className="recap-row" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span><TierIcon emoji={r.emoji} icon={iconFor(cfg, r)} />{r.speed?.emoji}</span>
        <span>
          <span className="c">{r.category.title}</span><br />
          <span className="a">{r.canonical ?? (r.raw ? `„${r.raw}”` : "—")}</span>
        </span>
        <span className="k">+{r.km}</span>
        <span className="chev" aria-hidden="true">{open ? "▴" : "▾"}</span>
      </button>
      {open && <AllAnswers position={r.position} cfg={cfg} />}
    </li>
  );
}

/** Svi odgovori kategorije s udjelom i prijevozom, s pretragom. */
function AllAnswers({ position, cfg }: { position: number; cfg: SkinConfig }) {
  const [list, setList] = useState<AnswerList | null | "error">(null);
  const [q, setQ] = useState("");
  useEffect(() => {
    api<AnswerList | null>(`/api/game/answers?position=${position}`).then((l) => setList(l ?? "error"), () => setList("error"));
  }, [position]);
  if (list === null) return <div className="allans small">Učitavam odgovore…</div>;
  if (list === "error") return <div className="allans small">Odgovori se ne mogu učitati.</div>;
  const fold = (s: string) => s.toLowerCase().replace(/đ/g, "d").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const f = fold(q.trim());
  const shown = f ? list.answers.filter((a) => fold(a.canonical).includes(f)) : list.answers;
  return (
    <div className="allans">
      <input
        className="field"
        type="search"
        placeholder={`Traži među ${list.answers.length} odgovora`}
        aria-label="Traži odgovor"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <span className="small">Udio igrača danas i km koje odgovor donosi, bez bonusa za brzinu.</span>
      <ol>
        {shown.map((a) => {
          const t = cfg.tiers.find((x) => x.name === a.tier);
          return (
            <li key={a.canonical} className={a.canonical === list.mine ? "mine" : ""}>
              <span className="ti">{t && <TierIcon emoji={t.emoji} icon={t.badge ?? t.icon} />}</span>
              <span className="n">{a.canonical}{a.canonical === list.mine && <em> · tvoj</em>}</span>
              <span className="s">{formatShare(a.share)}</span>
              <span className="k">+{a.km}</span>
            </li>
          );
        })}
        {!shown.length && <li className="small">Nema takvog odgovora.</li>}
      </ol>
    </div>
  );
}

function Countdown({ timezone, className = "small" }: { timezone: string; className?: string }) {
  const [text, setText] = useState("");
  useEffect(() => {
    const tick = () => {
      const parts = new Intl.DateTimeFormat("en-GB", { timeZone: timezone, hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
        .formatToParts(new Date());
      const h = +parts.find((p) => p.type === "hour")!.value;
      const m = +parts.find((p) => p.type === "minute")!.value;
      const leftMin = 24 * 60 - (h * 60 + m);
      setText(`Nova ruta za ${Math.floor(leftMin / 60)} h ${String(leftMin % 60).padStart(2, "0")} min`);
    };
    tick();
    const t = setInterval(tick, 30000);
    return () => clearInterval(t);
  }, [timezone]);
  return <span className={className}>{text}</span>;
}
