"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { GameState, RoundView } from "@/server/game";
import type { SkinConfig } from "@/skins/types";
import { formatShare, stationAt } from "@/lib/scoring";
import RouteMap from "./RouteMap";
import { AccountLink, GoogleButton, useMe, type Me } from "./account";

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
  // profil (streak) se osvježava kad partija završi
  const me = useMe(state?.phase === "end" || showEnd);

  const load = useCallback(() => {
    api<GameState>("/api/game").then(setState, () => setError(true));
  }, []);
  useEffect(load, [load]);

  if (error) return <Shell><section className="card">Nešto je pošlo krivo. Osvježi stranicu.</section></Shell>;
  if (!state) return <Shell><section className="card loading">Učitavam…</section></Shell>;

  const cfg = state.skin.config;
  const start = () => api<GameState>("/api/game/start", {}).then(setState, () => setError(true));
  const phase = state.phase === "reveal" && showEnd ? "end" : state.phase;

  return (
    <Shell state={state} me={me}>
      <section className="card" aria-live="polite">
        {phase === "intro" && <Intro cfg={cfg} perDay={state.perDay} onStart={start} />}
        {phase === "play" && state.current && (
          <Play key={state.current.position} state={state} onScored={setState} onLost={load} />
        )}
        {phase === "reveal" && (
          <Reveal
            state={state}
            onNext={() => (state.rounds.length >= state.perDay ? setShowEnd(true) : start())}
          />
        )}
        {phase === "end" && <End state={state} me={me} />}
      </section>
      <RouteMap cfg={cfg} km={state.totalKm} />
    </Shell>
  );
}

function Shell({ state, me = null, children }: { state?: GameState; me?: Me | null; children: React.ReactNode }) {
  const cfg = state?.skin.config;
  const [y, m, d] = (state?.date ?? "").split("-");
  return (
    <div className="wrap">
      <header className="top">
        <div className="plate">{cfg?.title ?? "Dokle?"}</div>
        <div className="row">
          {state && cfg && (
            <div className="meta">
              <b>#{state.number}</b> · {+d}. {+m}. {y}.<br />
              {cfg.stations[0].name} → {cfg.stations[cfg.stations.length - 1].name} · {cfg.maxKm} km
            </div>
          )}
          <AccountLink me={me} />
        </div>
      </header>
      <div className="grid">{children}</div>
    </div>
  );
}

function Intro({ cfg, perDay, onStart }: { cfg: SkinConfig; perDay: number; onStart: () => void }) {
  const first = cfg.stations[0], last = cfg.stations[cfg.stations.length - 1];
  return (
    <div className="stack">
      <span className="eyebrow">Dnevna igra</span>
      <h1>Koliko daleko stigneš danas?</h1>
      <p>
        Kreneš iz {first.genitive ?? first.name}. Dobiješ {perDay} kategorija i za svaku upišeš jedan odgovor. Što je tvoj
        točan odgovor rjeđi među igračima, to dalje putuješ prema {last.dative ?? last.name}.
      </p>
      <ul className="rules">
        <li><span className="k">{perDay}×</span><span>kategorija, svaki dan iste za sve</span></li>
        <li><span className="k">{cfg.secondsPerCategory}s</span><span>po kategoriji, Enter šalje odgovor</span></li>
        <li><span className="k">1×</span><span>jedan odgovor; ako ga nemamo na popisu, probaj opet</span></li>
      </ul>
      <div className="tiers">
        {cfg.tiers.map((t) => (
          <div key={t.name}><span>{t.emoji} {t.name}</span><span>+{t.km}</span></div>
        ))}
        <div><span>{cfg.miss.emoji} Promašaj</span><span>0</span></div>
      </div>
      <div className="row">
        <button autoFocus onClick={onStart}>Kreni iz {first.genitive ?? first.name}</button>
      </div>
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
        else if (r.status === "rejected") setSending({ kind: "nope" });
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
    let raf = 0;
    const tick = () => {
      const l = Math.max(0, (deadline - performance.now()) / 1000);
      setLeft(l);
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
      <div className="trow"><span>{Math.ceil(left)} s</span><span>{state.totalKm} km</span></div>
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
          autoCapitalize="off"
          spellCheck={false}
          aria-label="Tvoj odgovor"
          placeholder="Tvoj odgovor"
          value={value}
          onChange={(e) => setValue(e.target.value)}
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

function Reveal({ state, onNext }: { state: GameState; onNext: () => void }) {
  const cfg = state.skin.config;
  const r = state.rounds[state.rounds.length - 1];
  const before = stationAt(cfg, state.totalKm - r.km);
  const after = stationAt(cfg, state.totalKm);
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
          <span className="emo">{r.emoji}</span>
          <div>
            <div>{what(r)}</div>
            <div className="small">{r.tier}</div>
          </div>
          <span className="km">+{r.km}</span>
        </div>
        {after !== before && <p className="small">Prošao si: <b>{after.name}</b></p>}
      </div>
      {state.reveal && (
        <div className="stack" style={{ gap: 6 }}>
          <span className="eyebrow">Najčešći odgovori</span>
          <Chips items={state.reveal.top} />
          <span className="eyebrow" style={{ marginTop: 6 }}>Rijetki koje si mogao</span>
          <Chips items={state.reveal.rare} />
        </div>
      )}
      <div className="row">
        <button autoFocus onClick={onNext}>{last ? "Vidi dokle si stigao" : "Dalje"}</button>
      </div>
    </div>
  );
}

function what(r: RoundView) {
  if (r.canonical) return <><b>{r.canonical}</b> · {formatShare(r.share ?? 0)} igrača</>;
  if (r.raw) return <>„{r.raw}” nije na našem popisu.</>;
  return <>Nisi stigao odgovoriti.</>;
}

function Chips({ items }: { items: { canonical: string; share: number }[] }) {
  return (
    <div className="chips">
      {items.map((a) => (
        <span className="chip" key={a.canonical}>{a.canonical}<span>{formatShare(a.share)}</span></span>
      ))}
    </div>
  );
}

function End({ state, me }: { state: GameState; me: Me | null }) {
  const cfg = state.skin.config;
  const km = state.totalKm;
  const st = stationAt(cfg, km);
  const next = cfg.stations.find((s) => s.km > km);
  const first = cfg.stations[0];
  const [copied, setCopied] = useState("");
  const share =
    `Dokle? #${state.number}\n${state.rounds.map((r) => r.emoji).join("")}\n${first.name} → ${st.name} · ${km} km` +
    (km >= cfg.maxKm ? `\nStigao sam u ${st.name}! 🏝️` : "");
  return (
    <div className="stack">
      <span className="eyebrow">Kraj puta za danas</span>
      <div className="arrive">
        <span className="kmt">{first.name} → {km} km</span>
        <span className="town">{st.name}</span>
        <span>{st.message}</span>
      </div>
      {next && <p className="small">Do {next.genitive ?? next.name} ti je falilo još {next.km - km} km.</p>}
      <ul className="recap">
        {state.rounds.map((r) => (
          <li key={r.position}>
            <span>{r.emoji}</span>
            <span>
              <span className="c">{r.category.title}</span><br />
              <span className="a">{r.canonical ?? (r.raw ? `„${r.raw}”` : "—")}</span>
            </span>
            <span className="k">+{r.km}</span>
          </li>
        ))}
      </ul>
      <pre className="share">{share}</pre>
      <div className="row">
        <button
          onClick={() =>
            navigator.clipboard.writeText(share).then(() => setCopied("Kopirano."), () => setCopied("Kopiraj ručno."))
          }
        >
          Kopiraj rezultat
        </button>
        <span className="small">{copied}</span>
      </div>
      {me?.authEnabled && !me.user && (
        <div className="savebox">
          <b>Spremi rezultat i prati streak</b>
          <span className="small">Prijavom se današnja partija sprema na tvoj račun, pa povijest vidiš na svakom uređaju.</span>
          <div className="row"><GoogleButton /></div>
        </div>
      )}
      {me?.user && me.stats && (
        <p className="small">
          🔥 Streak: <b>{me.stats.currentStreak}</b> {me.stats.currentStreak === 1 ? "dan" : "dana"} · <a href="/profil">tvoja povijest</a>
        </p>
      )}
      <Countdown timezone={state.skin.timezone} />
    </div>
  );
}

function Countdown({ timezone }: { timezone: string }) {
  const [text, setText] = useState("");
  useEffect(() => {
    const tick = () => {
      const parts = new Intl.DateTimeFormat("en-GB", { timeZone: timezone, hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
        .formatToParts(new Date());
      const h = +parts.find((p) => p.type === "hour")!.value;
      const m = +parts.find((p) => p.type === "minute")!.value;
      const leftMin = 24 * 60 - (h * 60 + m);
      setText(`Nova ruta za ${Math.floor(leftMin / 60)} h ${String(leftMin % 60).padStart(2, "0")} min.`);
    };
    tick();
    const t = setInterval(tick, 30000);
    return () => clearInterval(t);
  }, [timezone]);
  return <p className="small">{text}</p>;
}
