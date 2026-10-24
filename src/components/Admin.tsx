"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { assignTiers, priorForRank, priorForTier } from "@/lib/scoring";
import { fold } from "@/lib/matcher";
import { addDays, type DayAvg } from "@/lib/league";
import Modal from "./Modal";
import WeekChart from "./WeekChart";
import { AccountLink, useMe } from "./account";
import { SkinProvider, skinFetch, useSkin } from "./skin";
import { SKIN_IDS, SKIN_META, type SkinId } from "@/skins/meta";

async function api<T>(path: string, method = "GET", body?: unknown): Promise<T> {
  const res = await skinFetch(path, {
    method,
    headers: body === undefined ? undefined : { "content-type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: "no-store",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Greška");
  return data as T;
}

function useLoad<T>(path: string | null) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState("");
  const reload = useCallback(() => {
    if (!path) return;
    setError("");
    api<T>(path).then(setData, (e: Error) => setError(e.message));
  }, [path]);
  useEffect(reload, [reload]);
  return { data, error, reload, setData };
}

type TierInfo = { name: string; emoji: string; minShare: number; rare?: boolean };
type Meta = { skin: { id: string; mirror: string | null; groups: Record<string, string>; perDay: number; today: string; tiers: TierInfo[] } };

// tierovi skina, sortirani od najčešćeg prema najrjeđem (kao u configu)
const Tiers = createContext<TierInfo[]>([]);

const pct = (n: number) => String(n).replace(".", ",");

// kanonski odgovori počinju velikim slovom (server to i sam osigura)
const upperFirst = (v: string) => v.charAt(0).toLocaleUpperCase("hr") + v.slice(1);

/** Koji broj upisati za koji prijevoz (sredina raspona), za unos više odgovora odjednom. */
function TierLegend() {
  const tiers = useContext(Tiers);
  return (
    <p className="small">
      Procjena za prijevoz: {tiers.map((t, i) => `${t.emoji} ${t.name} =${priorForTier(tiers, i)}${t.rare ? "!" : ""}`).join(" · ")}
    </p>
  );
}

/**
 * Izbor prijevoza umjesto postotka. S ostalim odgovorima kategorije (`others`) procjena smjesti odgovor u sredinu ranga
 * tog prijevoza (tier u igri ide po rangu), inače sredina raspona postotka. Zadano je najrjeđi obični tier.
 */
function useTierPrior(others?: { share: number; rare?: boolean }[]) {
  const tiers = useContext(Tiers);
  const [index, setIndex] = useState(() => Math.max(tiers.findLastIndex((t) => !t.rare), 0));
  const select = (
    <label className="small">
      prijevoz
      <select className="field" value={index} onChange={(e) => setIndex(Number(e.target.value))} aria-label="Prijevoz">
        {tiers.map((t, i) => (
          <option key={t.name} value={i}>
            {t.emoji} {t.name}{t.rare ? " (najrjeđi)" : others ? "" : ` (procjena ${pct(priorForTier(tiers, i))} %)`}
          </option>
        ))}
      </select>
    </label>
  );
  const prior = !tiers.length ? 0.1 : others ? priorForRank(tiers, index, others) : priorForTier(tiers, index);
  return { select, prior, rare: !!tiers[index]?.rare };
}

const TABS = ["Dan", "Statistika", "Za pregled", "Igrači", "Sadržaj", "Raspored", "Odgovori"] as const;
type Tab = (typeof TABS)[number];

/** Admin za jednu zemlju (?skin=ba); svaka zemlja ima svoje kategorije, raspored i igrače. */
export default function Admin({ skin }: { skin: SkinId }) {
  return (
    <SkinProvider skin={skin}>
      <AdminSkin />
    </SkinProvider>
  );
}

function AdminSkin() {
  const meta = useLoad<Meta>("/api/admin/me");
  const [tab, setTab] = useState<Tab>("Dan");

  if (meta.error)
    return (
      <AdminShell>
        <section className="card single stack">
          <h1>Admin</h1>
          <p>{meta.error} Prijavi se računom koji je u <code>ADMIN_EMAILS</code>.</p>
          <p><a href="/profil">Prijava</a></p>
        </section>
      </AdminShell>
    );
  if (!meta.data) return <AdminShell><p className="loading">Učitavam…</p></AdminShell>;
  const m = meta.data.skin;

  return (
    <AdminShell>
      <Tiers.Provider value={m.tiers ?? []}>
      <nav className="tabs" role="tablist">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t} className={tab === t ? "" : "ghost"} onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
      </nav>
      <section className="card stack">
        {tab === "Dan" && <Day today={m.today} />}
        {tab === "Statistika" && <GeneralStats today={m.today} />}
        {tab === "Za pregled" && <Review />}
        {tab === "Igrači" && <Players />}
        {tab === "Sadržaj" && <Content groups={m.groups} mirror={m.mirror} />}
        {tab === "Raspored" && <Schedule perDay={m.perDay} mirror={m.mirror} />}
        {tab === "Odgovori" && <Attempts today={m.today} />}
      </section>
      </Tiers.Provider>
    </AdminShell>
  );
}

function AdminShell({ children }: { children: React.ReactNode }) {
  const me = useMe();
  const { id } = useSkin();
  return (
    <div className="wrap">
      <header className="top">
        <a href="/" className="plate" style={{ textDecoration: "none" }}>Dokle?</a>
        <span className="eyebrow">Admin</span>
        <nav className="tabs" aria-label="Zemlja">
          {SKIN_IDS.map((s) => (
            <a key={s} href={s === "hr" ? "/admin" : `/admin?skin=${s}`} className={"acct" + (s === id ? "" : " ghost")} aria-current={s === id ? "page" : undefined}>
              {SKIN_META[s].flag} {SKIN_META[s].short}
            </a>
          ))}
        </nav>
        <div className="spacer" />
        <AccountLink me={me} />
      </header>
      {children}
    </div>
  );
}

function Err({ msg }: { msg: string }) {
  return msg ? <p className="sending nope">{msg}</p> : null;
}

// ---------- Dan ----------

type DayData = {
  date: string;
  puzzle: { number: number } | null;
  totals?: { started: number; finished: number; registered: number; avgKm: number; unranked: number };
  stations?: { name: string; n: number }[];
  categories?: {
    position: number;
    id: number;
    title: string;
    top: { canonical: string; n: number }[];
    attempts: number;
    rejected: number;
    misses: number;
    answers: { canonical: string; n: number; share: number; tier: string }[];
  }[];
};

/** Svi odgovori jedne današnje kategorije, grupirani po prijevozu koji taj dan vrijedi. */
function DayAnswers({ answers }: { answers: { canonical: string; n: number; share: number; tier: string }[] }) {
  const tiers = useContext(Tiers);
  return (
    <div className="stack" style={{ gap: 8 }}>
      {tiers.map((t) => {
        const list = answers.filter((a) => a.tier === t.name);
        if (!list.length) return null;
        return (
          <div key={t.name}>
            <span className="eyebrow">{t.emoji} {t.name} · {list.length}</span>
            <div className="chips">
              {list.map((a) => (
                <span key={a.canonical} className="chip">
                  {a.canonical}<span>{formatPct(a.share)}{a.n ? ` · ${a.n}×` : ""}</span>
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

const formatPct = (s: number) => (s < 0.1 ? "< 0,1 %" : `${pct(Math.round(s * 10) / 10)} %`);

type WeekData = { from: string; today: string; days: DayAvg[] };

/** Prosjek km svih igrača po danu, tjedan pon–ned; admin može listati i prošle tjedne. */
function WeekAverages({ today }: { today: string }) {
  const [date, setDate] = useState(today);
  const { data, error } = useLoad<WeekData>(`/api/admin/week?date=${date}`);
  const current = !!data && data.days.some((d) => d.date === data.today);
  const played = data?.days.filter((d) => d.avgKm !== null) ?? [];
  const total = played.reduce((a, d) => a + d.players, 0);
  const weekAvg = total ? Math.round(played.reduce((a, d) => a + d.avgKm! * d.players, 0) / total) : null;
  return (
    <div className="stack">
      <span className="eyebrow">Prosjek km po danu</span>
      <div className="row">
        <button className="ghost" onClick={() => data && setDate(addDays(data.from, -7))} aria-label="Prošli tjedan">‹</button>
        <span className="small">{data ? `${fmtDate(data.from).slice(0, -5)} – ${fmtDate(addDays(data.from, 6))}` : ""}</span>
        <button className="ghost" disabled={!data || current} onClick={() => data && setDate(addDays(data.from, 7))} aria-label="Sljedeći tjedan">›</button>
        {data && !current && <button className="ghost" onClick={() => setDate(today)}>Ovaj tjedan</button>}
      </div>
      <p className="small">
        Samo završene partije (bez „za gušt”); tko taj dan nije igrao ne ulazi u prosjek.
        {weekAvg !== null && <> Cijeli tjedan: <b>{weekAvg} km</b> iz {total} partija.</>}
      </p>
      <Err msg={error} />
      {data && <WeekChart days={data.days} today={data.today} />}
    </div>
  );
}

// ---------- Statistika ----------

type StatsData = {
  today: string;
  since: string;
  totals: { days: number; games: number; finished: number; players: number; avgKm: number; answered: number; hit: number; avgMs: number };
  best: { km: number; date: string; player: string } | null;
  tiers: { name: string; emoji: string; n: number }[];
  histogram: { from: number; n: number }[];
  loyalty: { label: string; n: number }[];
  hardest: { title: string; date: string; answered: number; missPct: number }[];
  easiest: { title: string; date: string; answered: number; missPct: number }[];
};

/** Vodoravni stupci s brojem i postotkom (prijevoz, vjernost igrača). */
function Bars({ rows }: { rows: { label: string; n: number }[] }) {
  const max = Math.max(1, ...rows.map((r) => r.n));
  const total = rows.reduce((a, r) => a + r.n, 0) || 1;
  return (
    <div className="stack" style={{ gap: 4 }}>
      {rows.map((r) => (
        <div key={r.label} className="bar wide">
          <span>{r.label}</span>
          <i style={{ width: `${(r.n / max) * 100}%` }} />
          <b>{r.n}</b>
          <em>{Math.round((100 * r.n) / total)} %</em>
        </div>
      ))}
    </div>
  );
}

/** Opće brojke igre (ne vežu se za jedan dan): ukupno, tjedni prosjek km, raspodjele zadnjih 30 dana. */
function GeneralStats({ today }: { today: string }) {
  const { data, error } = useLoad<StatsData>("/api/admin/stats");
  const t = data?.totals;
  const hmax = Math.max(1, ...(data?.histogram ?? []).map((h) => h.n));
  return (
    <div className="stack">
      <h2>Statistika</h2>
      <Err msg={error} />
      {data && t && (
        <div className="kpis">
          <Kpi v={t.days} l="dana igre" />
          <Kpi v={t.games} l="partija ukupno" />
          <Kpi v={t.players} l="različitih igrača" />
          <Kpi v={t.games ? Math.round((100 * t.finished) / t.games) : 0} l="% partija završeno" />
          <Kpi v={t.avgKm} l="prosjek km (sve partije)" />
          {data.best && <Kpi v={data.best.km} l="rekord km" sub={`${data.best.player}, ${fmtDate(data.best.date)}`} />}
        </div>
      )}
      <section className="stack panel-sub"><WeekAverages today={today} /></section>
      {data && t && (
        <>
          <p className="small">Ispod je zadnjih 30 dana ({fmtDate(data.since)} – {fmtDate(data.today)}).</p>
          <div className="kpis">
            <Kpi v={t.answered ? Math.round((100 * t.hit) / t.answered) : 0} l="% pitanja s točnim odgovorom" />
            <Kpi v={(t.avgMs / 1000).toFixed(1).replace(".", ",")} l="s prosječno do točnog odgovora" />
          </div>
          <div className="stat-grid">
            <section className="stack panel-sub">
              <span className="eyebrow">Koliko daleko igrači stignu</span>
              <div className="histo">
                {data.histogram.map((h) => (
                  <div key={h.from} className="histo-slot" title={`${h.from}–${h.from + 99} km: ${h.n} partija`}>
                    <span style={{ height: `${(100 * h.n) / hmax}%` }} />
                  </div>
                ))}
              </div>
              <div className="histo-x">
                {data.histogram.map((h, i) => <span key={h.from}>{i % 3 === 0 ? h.from : ""}</span>)}
              </div>
              <p className="small">Broj završenih partija po 100 km.</p>
            </section>
            <section className="stack panel-sub">
              <span className="eyebrow">Prijevoz za točne odgovore</span>
              <Bars rows={data.tiers.map((x) => ({ label: `${x.emoji} ${x.name}`, n: x.n }))} />
            </section>
            <section className="stack panel-sub">
              <span className="eyebrow">Koliko dana su igrači odigrali (od početka)</span>
              <Bars rows={data.loyalty} />
            </section>
            <section className="stack panel-sub">
              <span className="eyebrow">Najteže i najlakše kategorije</span>
              <p className="small">Udio igrača bez točnog odgovora.</p>
              <table className="tbl">
                <tbody>
                  {data.hardest.map((c) => <tr key={"h" + c.title}><td>{c.title}</td><td className="num">{c.missPct} %</td></tr>)}
                  {!!data.easiest.length && <tr><td colSpan={2} className="small">najlakše</td></tr>}
                  {data.easiest.map((c) => <tr key={"e" + c.title}><td>{c.title}</td><td className="num">{c.missPct} %</td></tr>)}
                </tbody>
              </table>
            </section>
          </div>
        </>
      )}
    </div>
  );
}

function Day({ today }: { today: string }) {
  const [date, setDate] = useState(today);
  const { data, error } = useLoad<DayData>(`/api/admin/day?date=${date}`);
  const maxStation = Math.max(1, ...(data?.stations ?? []).map((s) => s.n));
  return (
    <div className="stack">
      <div className="row">
        <h2>Pregled dana</h2>
        <input type="date" className="field" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <Err msg={error} />
      {data && !data.puzzle && <p className="small">Za taj dan nema zagonetke.</p>}
      {data?.totals && (
        <>
          <div className="stats">
            <Stat v={`#${data.puzzle!.number}`} l="dan" />
            <Stat v={data.totals.started} l="započelo" />
            <Stat v={data.totals.finished} l="završilo" />
            <Stat v={data.totals.registered} l="prijavljenih" />
            <Stat v={data.totals.avgKm} l="prosjek km" />
            <Stat v={data.totals.unranked} l="za gušt (ne broji se)" />
          </div>
          {!!data.stations?.length && (
            <div className="stack" style={{ gap: 4 }}>
              <span className="eyebrow">Gdje su stali</span>
              {data.stations.map((s) => (
                <div key={s.name} className="bar">
                  <span>{s.name}</span>
                  <i style={{ width: `${(s.n / maxStation) * 100}%` }} />
                  <b>{s.n}</b>
                </div>
              ))}
            </div>
          )}
          <span className="eyebrow">Kategorije</span>
          <table className="tbl">
            <thead><tr><th>#</th><th>Kategorija</th><th>Najčešći odgovori</th><th>Odbijenih upisa</th><th>Promašaja</th></tr></thead>
            <tbody>
              {data.categories!.map((c) => (
                <tr key={c.position}>
                  <td>{c.position + 1}</td>
                  <td>{c.title}</td>
                  <td>{c.top.map((t) => `${t.canonical} (${t.n})`).join(", ") || "—"}</td>
                  <td>{c.rejected} / {c.attempts}{c.attempts ? ` (${Math.round((c.rejected / c.attempts) * 100)} %)` : ""}</td>
                  <td>{c.misses}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <span className="eyebrow">Svi odgovori po prijevozu</span>
          <p className="small">Udio igrača danas (procjena pomiješana sa stvarnim odgovorima) i koliko ih je taj odgovor dalo.</p>
          {data.categories!.map((c) => (
            <details key={c.position} className="decide">
              <summary><b>{c.position + 1}. {c.title}</b> <span className="small">· {c.answers.length} odgovora</span></summary>
              <DayAnswers answers={c.answers} />
            </details>
          ))}
        </>
      )}
    </div>
  );
}

function Stat({ v, l }: { v: string | number; l: string }) {
  return <div className="stat"><b>{v}</b><span>{l}</span></div>;
}

// ---------- Za pregled ----------

type ReviewRow = { categoryId: number; category: string; normalized: string; n: number; examples: string[] };
type AnswerRow = { id: number; canonical: string; priorShare: number; rare: boolean; source: string; seedCanonical: string | null; edited: boolean; aliases: string[] };
type CatDetail = { id: number; title: string; active: boolean; hint: string | null; answers: AnswerRow[] };
const asOthers = (list: AnswerRow[], except?: number) => list.filter((a) => a.id !== except).map((a) => ({ share: a.priorShare, rare: a.rare }));

function Review() {
  const { data, error, reload } = useLoad<ReviewRow[]>("/api/admin/review");
  const [open, setOpen] = useState<string | null>(null);
  const [msg, setMsg] = useState("");
  const reject = (r: ReviewRow) =>
    api("/api/admin/review", "POST", { categoryId: r.categoryId, normalized: r.normalized, action: "reject" }).then(
      () => {
        setMsg(`Odbijeno: „${r.examples[0]}”.`);
        reload();
      },
      (e: Error) => setMsg(e.message),
    );
  return (
    <div className="stack">
      <h2>Odbijeni odgovori</h2>
      <p className="small">
        Upisi koje sustav nije prepoznao, grupirani po kategoriji i obliku, sortirani po broju igrača. Kad prihvatiš odgovor,
        igrači koji su ga upisali kao zadnji odgovor dobiju bodove naknadno.
      </p>
      <Err msg={error} />
      {msg && <p className="small"><b>{msg}</b></p>}
      {data && !data.length && <p className="small">Nema ništa za pregled.</p>}
      {data?.map((r) => {
        const key = `${r.categoryId}:${r.normalized}`;
        return (
          <div key={key} className="review">
            <div className="row" style={{ justifyContent: "space-between" }}>
              <div>
                <span className="c small">{r.category}</span><br />
                <b>{r.examples[0]}</b>{r.examples.length > 1 && <span className="small"> · {r.examples.slice(1).join(", ")}</span>}
              </div>
              <div className="row">
                <span className="chip">{r.n} {r.n === 1 ? "igrač" : "igrača"}</span>
                <button className="ghost small-btn" onClick={() => setOpen(open === key ? null : key)}>{open === key ? "Zatvori" : "Odluči"}</button>
                <button className="danger small-btn" onClick={() => reject(r)} aria-label="Nije točno" title="Nije točno">✕</button>
              </div>
            </div>
            {open === key && (
              <Decide
                row={r}
                onDone={(text) => {
                  setMsg(text);
                  setOpen(null);
                  reload();
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function Decide({ row, onDone }: { row: ReviewRow; onDone: (msg: string) => void }) {
  const cat = useLoad<CatDetail>(`/api/admin/categories/${row.categoryId}`);
  const [canonical, setCanonical] = useState(upperFirst(row.examples[0] ?? row.normalized));
  const tier = useTierPrior(cat.data ? asOthers(cat.data.answers) : undefined);
  const [answerId, setAnswerId] = useState("");
  const [err, setErr] = useState("");
  const send = (body: object, label: string) =>
    api<{ rescored: number }>("/api/admin/review", "POST", { categoryId: row.categoryId, normalized: row.normalized, ...body }).then(
      (r) => onDone(`${label}: „${row.examples[0]}”${r.rescored ? `, naknadno bodovano ${r.rescored}` : ""}.`),
      (e: Error) => setErr(e.message),
    );
  return (
    <div className="stack" style={{ gap: 10, marginTop: 10 }}>
      <div className="decide">
        <b>Novi točan odgovor</b>
        <div className="row">
          <input className="field" value={canonical} onChange={(e) => setCanonical(upperFirst(e.target.value))} aria-label="Kanonski oblik" />
          {tier.select}
          <button className="small-btn" onClick={() => send({ action: "answer", canonical, priorShare: tier.prior, rare: tier.rare }, "Dodan odgovor")}>Dodaj</button>
        </div>
      </div>
      <div className="decide">
        <b>Varijanta postojećeg odgovora</b>
        <div className="row">
          <select className="field" value={answerId} onChange={(e) => setAnswerId(e.target.value)} aria-label="Postojeći odgovor">
            <option value="">Odaberi odgovor…</option>
            {cat.data?.answers.slice().sort((a, b) => a.canonical.localeCompare(b.canonical, "hr")).map((a) => (
              <option key={a.id} value={a.id}>{a.canonical}</option>
            ))}
          </select>
          <button className="small-btn" disabled={!answerId} onClick={() => send({ action: "alias", answerId: Number(answerId), alias: row.examples[0] }, "Dodana varijanta")}>Spoji</button>
        </div>
      </div>
      <div className="row">
        <button className="danger small-btn" onClick={() => send({ action: "reject" }, "Odbijeno")}>Nije točno</button>
      </div>
      <Err msg={err} />
    </div>
  );
}

// ---------- Igrači ----------

type PlayerStats = { played: number; currentStreak: number; longestStreak: number; avgKm: number; bestKm: number };
type PlayerRow = { id: string; nickname: string | null; email: string | null; role: string; createdAt: string; lastSeenAt: string; lastPlayed: string | null; stats: PlayerStats };
type DailyRow = { date: string; players: number; registered: number; finished: number };
type PlayersData = {
  today: string;
  counts: { total: number; registered: number; newRegistered: number; activeToday: number; active7: number; active30: number };
  daily: DailyRow[];
  players: PlayerRow[];
};

/** "prije 5 min", "prije 3 h", "jučer", "prije 4 dana", a starije datum. */
function ago(iso: string) {
  const min = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (min < 2) return "upravo";
  if (min < 60) return `prije ${min} min`;
  const h = Math.round(min / 60);
  if (h < 24) return `prije ${h} h`;
  const d = Math.round(h / 24);
  if (d === 1) return "jučer";
  if (d < 14) return `prije ${d} dana`;
  return new Date(iso).toLocaleDateString("hr-HR");
}

// stupci popisa igrača; klik na naslov poreda po tom stupcu (od najvećeg)
/** Datum zadnje partije: "danas", "jučer" ili "21. 10.". */
function playedOn(date: string | null, today: string) {
  if (!date) return "—";
  if (date === today) return "danas";
  if (date === addDays(today, -1)) return "jučer";
  return fmtDate(date).slice(0, -6);
}

const SORTS = {
  lastPlayed: { label: "Zadnja partija", hint: "datum zadnje odigrane partije", get: (p: PlayerRow) => p.lastPlayed ?? "" },
  played: { label: "Dana", hint: "koliko je dana odigrao", get: (p: PlayerRow) => p.stats.played },
  currentStreak: { label: "Niz", hint: "uzastopnih dana sada (najdulji niz ispod)", get: (p: PlayerRow) => p.stats.currentStreak * 1000 + p.stats.longestStreak },
  avgKm: { label: "Prosjek", hint: "prosječno km po partiji", get: (p: PlayerRow) => p.stats.avgKm },
  bestKm: { label: "Rekord", hint: "najviše km u jednoj partiji", get: (p: PlayerRow) => p.stats.bestKm },
} as const;
type SortKey = keyof typeof SORTS;

/** Inicijal u krugu, boja stalna po igraču. */
function Avatar({ id, name }: { id: string; name: string }) {
  const hue = parseInt(id.slice(0, 6), 16) % 360;
  return <span className="avatar" style={{ background: `hsl(${hue} 45% 32%)` }} aria-hidden>{name.charAt(0).toLocaleUpperCase("hr")}</span>;
}

/** Igrači po danu zadnjih 30 dana: stupac = svi igrači, tamniji dio = s računom; danas istaknut. */
function ActivityChart({ daily, today }: { daily: DailyRow[]; today: string }) {
  const max = Math.max(1, ...daily.map((d) => d.players));
  return (
    <div className="activity">
      <div className="act-plot">
        {daily.map((d) => (
          <div key={d.date} className={"act-slot" + (d.date === today ? " today" : "")} title={`${fmtDate(d.date)}: ${d.players} igrača, ${d.registered} s računom, ${d.finished} završilo`}>
            <span className="act-bar" style={{ height: `${(100 * d.players) / max}%` }}>
              <i style={{ height: d.players ? `${(100 * d.registered) / d.players}%` : 0 }} />
            </span>
          </div>
        ))}
      </div>
      <div className="act-x">
        {daily.map((d, i) => <span key={d.date}>{i % 5 === 4 || d.date === today ? fmtDate(d.date).slice(0, -6) : ""}</span>)}
      </div>
      <p className="small legend"><i className="lg-all" /> svi igrači <i className="lg-reg" /> s računom · najviše {max} u danu</p>
    </div>
  );
}

function Players() {
  const { data, error } = useLoad<PlayersData>("/api/admin/players");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<SortKey>("lastPlayed");
  const [limit, setLimit] = useState(50);
  const [openId, setOpenId] = useState<string | null>(null);
  if (!data) return <div className="stack"><h2>Igrači</h2><Err msg={error} />{!error && <p className="loading">Učitavam…</p>}</div>;
  const c = data.counts;
  const needle = fold(q.trim());
  const list = data.players
    .filter((p) => !needle || fold(`${p.nickname ?? ""} ${p.email ?? ""}`).includes(needle))
    .sort((a, b) => {
      const x = SORTS[sort].get(a), y = SORTS[sort].get(b);
      return x < y ? 1 : x > y ? -1 : 0;
    });
  return (
    <div className="stack">
      <h2>Igrači</h2>
      <div className="kpis">
        <Kpi v={c.activeToday} l="igralo danas" />
        <Kpi v={c.active7} l="zadnjih 7 dana" />
        <Kpi v={c.active30} l="zadnjih 30 dana" />
        <Kpi v={c.registered} l="s računom" sub={c.newRegistered ? `+${c.newRegistered} ovaj tjedan` : undefined} />
        <Kpi v={c.total} l="ukupno (i anonimni)" />
      </div>
      <section className="stack panel-sub">
        <span className="eyebrow">Igrači po danu · 30 dana</span>
        <ActivityChart daily={data.daily} today={data.today} />
      </section>
      <section className="stack panel-sub">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <span className="eyebrow">Prijavljeni igrači · {list.length}</span>
          <input className="field" type="search" placeholder="Traži nadimak ili email" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Traži igrača" />
        </div>
        <div className="phead" role="row">
          <span />
          <span>Igrač</span>
          {(Object.keys(SORTS) as SortKey[]).map((k) => (
            <button key={k} className={"psort" + (sort === k ? " on" : "") + (k === "lastPlayed" ? " plast" : "") + (k === "currentStreak" ? " pstreak" : "") + (k === "bestKm" ? " pbest" : "")} title={SORTS[k].hint} onClick={() => setSort(k)}>
              {SORTS[k].label}{sort === k && " ↓"}
            </button>
          ))}
        </div>
        <ul className="plist">
          {list.slice(0, limit).map((p) => {
            const name = p.nickname || p.email || "bez imena";
            const s = p.stats;
            return (
              <li key={p.id}>
                <button className="prow" onClick={() => setOpenId(p.id)}>
                  <Avatar id={p.id} name={name} />
                  <span className="pwho">
                    <b>{name}{p.role === "admin" && <span className="tag">admin</span>}</b>
                    <span className="small">{p.email}</span>
                  </span>
                  <span className="pnum plast"><b>{playedOn(p.lastPlayed, data.today)}</b></span>
                  <span className="pnum"><b>{s.played}</b></span>
                  <span className="pnum pstreak"><b>{s.currentStreak ? `🔥 ${s.currentStreak}` : "0"}</b><span>najdulji {s.longestStreak}</span></span>
                  <span className="pnum"><b>{s.played ? s.avgKm : "—"}</b><span>km</span></span>
                  <span className="pnum pbest"><b>{s.played ? s.bestKm : "—"}</b><span>km</span></span>
                </button>
              </li>
            );
          })}
        </ul>
        <p className="small">Brojke su iz završenih partija u ovoj državi. Klik na igrača otvara sve njegove partije.</p>
        {list.length > limit && <button className="ghost small-btn" onClick={() => setLimit(limit + 100)}>Prikaži još ({list.length - limit})</button>}
      </section>
      {openId && <PlayerModal id={openId} onClose={() => setOpenId(null)} />}
    </div>
  );
}

function Kpi({ v, l, sub }: { v: number | string; l: string; sub?: string }) {
  return <div className="kpi"><b>{v}</b><span>{l}</span>{sub && <em>{sub}</em>}</div>;
}

type PlayerDetail = {
  id: string;
  nickname: string | null;
  email: string | null;
  createdAt: string;
  lastSeenAt: string;
  stats: PlayerStats;
  games: { date: string; number: number; km: number; finished: boolean; ranked: boolean; station: string | null }[];
  leagues: { name: string; code: string; members: number }[];
};

function PlayerModal({ id, onClose }: { id: string; onClose: () => void }) {
  const { data, error } = useLoad<PlayerDetail>(`/api/admin/players/${id}`);
  const name = data ? data.nickname || data.email || "bez imena" : "Igrač";
  const recent = (data?.games ?? []).filter((g) => g.finished).slice(0, 30).reverse();
  const max = Math.max(1, ...recent.map((g) => g.km));
  return (
    <Modal title={name} onClose={onClose}>
      <Err msg={error} />
      {data && (
        <>
          <p className="small">{data.email} · račun od {new Date(data.createdAt).toLocaleDateString("hr-HR")} · zadnji put na stranici {ago(data.lastSeenAt)}</p>
          <div className="stats">
            <Stat v={data.stats.played} l="odigranih dana" />
            <Stat v={data.stats.currentStreak} l="trenutni streak" />
            <Stat v={data.stats.longestStreak} l="najdulji streak" />
            <Stat v={data.stats.avgKm} l="prosjek km" />
            <Stat v={data.stats.bestKm} l="najdalje km" />
          </div>
          {recent.length > 1 && (
            <div className="stack" style={{ gap: 6 }}>
              <span className="eyebrow">Km po partiji · zadnjih {recent.length}</span>
              <div className="spark">
                {recent.map((g) => <i key={g.date} style={{ height: `${(100 * g.km) / max}%` }} title={`${fmtDate(g.date)}: ${g.km} km`} />)}
              </div>
            </div>
          )}
          {!!data.leagues.length && (
            <p className="small">Lige: {data.leagues.map((l) => `${l.name} (${l.members})`).join(", ")}</p>
          )}
          <span className="eyebrow">Partije</span>
          {data.games.length ? (
            <ul className="recap history">
              {data.games.map((g) => (
                <li key={g.date}>
                  <span className="n">#{g.number}</span>
                  <span className="w">
                    <span className="a">{g.station ?? "nije završio"}</span>
                    <span className="c">{fmtDate(g.date)}{!g.ranked && " · za gušt"}</span>
                  </span>
                  <span className="k">{g.finished ? `${g.km} km` : "—"}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="small">U ovoj državi još nije igrao.</p>
          )}
        </>
      )}
    </Modal>
  );
}

const fmtDate = (d: string) => {
  const [y, m, day] = d.split("-");
  return `${+day}. ${+m}. ${y}.`;
};

// ---------- Sadržaj ----------

type CatRow = { id: number; title: string; hint: string | null; group: string; active: boolean; answers: number; lastUsed: string | null; missing: SkinId[] };
type Unpaired = { slug: string; title: string; group: string };
const skinShort = (ids: SkinId[]) => ids.map((id) => SKIN_META[id]?.short ?? id).join(", ");

function Content({ groups, mirror }: { groups: Record<string, string>; mirror: string | null }) {
  const { data, error, reload } = useLoad<CatRow[]>("/api/admin/categories");
  const open = useLoad<Unpaired[]>(mirror ? "/api/admin/categories?unpaired" : null);
  const lone = (data ?? []).filter((c) => c.active && c.missing.length).length;
  const [openId, setOpenId] = useState<number | null>(null);
  const [adding, setAdding] = useState(false);
  return (
    <div className="stack">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <h2>Kategorije</h2>
        <button className="small-btn" onClick={() => setAdding(!adding)}>{adding ? "Zatvori" : "Nova kategorija"}</button>
      </div>
      <p className="small">
        {mirror
          ? "Raspored prati Hrvatsku: svaka kategorija ovdje je par hrvatske i dolazi isti dan. Nova kategorija se dodaje kao par postojeće hrvatske."
          : "BiH i Srbija svaki dan dobiju par istih kategorija. Hrvatska kategorija ulazi u raspored tek kad ima aktivan par u obje države."}
        {mirror && !!open.data?.length && <> Bez para ovdje: <b>{open.data.length}</b> hrvatskih kategorija (Hrvatska ih zato ne bira).</>}
        {!mirror && lone > 0 && <> Čeka par: <b>{lone}</b>.</>}
      </p>
      {adding && <NewCategory groups={groups} unpaired={mirror ? open.data ?? [] : null} onDone={() => { setAdding(false); reload(); open.reload(); }} />}
      <Err msg={error} />
      <table className="tbl">
        <thead><tr><th>Kategorija</th><th>Grupa</th><th>Odgovora</th><th>Zadnje korištena</th><th>Par</th><th>Aktivna</th><th></th></tr></thead>
        <tbody>
          {data?.map((c) => (
            <tr key={c.id} className={c.active ? "" : "off"}>
              <td>{c.title}</td>
              <td>{groups[c.group] ?? c.group}</td>
              <td>{c.answers}</td>
              <td>{c.lastUsed ? fmtDate(c.lastUsed) : "—"}</td>
              <td>{c.missing.length ? <span className="chip">nema: {skinShort(c.missing)}</span> : "✓"}</td>
              <td>
                <input
                  type="checkbox"
                  checked={c.active}
                  aria-label="Aktivna"
                  onChange={() => api(`/api/admin/categories/${c.id}`, "PATCH", { active: !c.active }).then(reload)}
                />
              </td>
              <td><button className="ghost small-btn" onClick={() => setOpenId(c.id)}>Odgovori</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      {openId && <CategoryAnswers id={openId} onChange={reload} onClose={() => setOpenId(null)} />}
    </div>
  );
}

function NewCategory({ groups, unpaired, onDone }: { groups: Record<string, string>; unpaired: Unpaired[] | null; onDone: () => void }) {
  const [title, setTitle] = useState("");
  const [group, setGroup] = useState(Object.keys(groups)[0]);
  const [pairOf, setPairOf] = useState("");
  const [hint, setHint] = useState("");
  const [strip, setStrip] = useState("");
  const [answers, setAnswers] = useState("");
  const [err, setErr] = useState("");
  return (
    <div className="decide stack" style={{ gap: 8 }}>
      {unpaired && (
        <select
          className="field"
          value={pairOf}
          onChange={(e) => {
            setPairOf(e.target.value);
            const c = unpaired.find((x) => x.slug === e.target.value);
            if (c && groups[c.group]) setGroup(c.group);
          }}
        >
          <option value="">Par za hrvatsku kategoriju…</option>
          {unpaired.map((c) => <option key={c.slug} value={c.slug}>{c.title}</option>)}
        </select>
      )}
      <input className="field" placeholder="Naslov, npr. Hrvatski planinski vrh" value={title} onChange={(e) => setTitle(e.target.value)} />
      <div className="row">
        <select className="field" value={group} onChange={(e) => setGroup(e.target.value)}>
          {Object.entries(groups).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <input className="field" placeholder="Pomoć (neobavezno)" value={hint} onChange={(e) => setHint(e.target.value)} />
        <input className="field" placeholder="Riječi koje se smiju izostaviti, npr. planina, vrh" value={strip} onChange={(e) => setStrip(e.target.value)} />
      </div>
      <textarea
        className="field"
        rows={6}
        placeholder={"Odgovori, jedan po retku ili odvojeni s ;\nOblik: Kanonski/varijanta/varijanta=procjena %\nDinara=20\nSveti Jure/Biokovo=15"}
        value={answers}
        onChange={(e) => setAnswers(e.target.value)}
      />
      <TierLegend />
      <div className="row">
        <button
          className="small-btn"
          onClick={() =>
            api("/api/admin/categories", "POST", {
              title,
              group,
              hint,
              strip: strip.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean),
              answers: answers.split(/[;\n]/).map((s) => s.trim()).filter(Boolean).join(";"),
              pairOf: pairOf || undefined,
            }).then(onDone, (e: Error) => setErr(e.message))
          }
        >
          Spremi kategoriju
        </button>
        <Err msg={err} />
      </div>
    </div>
  );
}

function CategoryAnswers({ id, onChange, onClose }: { id: number; onChange: () => void; onClose: () => void }) {
  const { data, error, reload } = useLoad<CatDetail>(`/api/admin/categories/${id}`);
  const tiers = useContext(Tiers);
  const [q, setQ] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [adding, setAdding] = useState(false);
  const [msg, setMsg] = useState("");
  if (!data) return error ? <Modal title="Odgovori" onClose={onClose}><Err msg={error} /></Modal> : null;
  // odgovori dolaze sortirani po procjeni; prijevoz kao u igri prije prvih igrača (po rangu)
  const assigned = tiers.length ? assignTiers({ tiers }, data.answers.map((a) => ({ share: a.priorShare, rare: a.rare }))) : [];
  const rows = data.answers.map((a, i) => ({ ...a, tier: assigned[i] }));
  const needle = fold(q.trim());
  const shown = needle ? rows.filter((r) => fold([r.canonical, ...r.aliases].join(" ")).includes(needle)) : rows;
  const saved = (text: string) => {
    setMsg(text);
    setEditId(null);
    setAdding(false);
    reload();
    onChange();
  };
  return (
    <Modal title={data.title} onClose={onClose} className="answers-modal">
      <div className="tier-summary">
        {tiers.map((t) => {
          const n = rows.filter((r) => r.tier === t).length;
          return <span key={t.name} className="chip">{t.emoji} {t.name}<span>{n}</span></span>;
        })}
        <span className="chip">ukupno<span>{rows.length}</span></span>
      </div>
      <div className="row">
        <input className="field grow" type="search" placeholder="Traži odgovor ili varijantu" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Traži" />
        <button className="small-btn" onClick={() => { setAdding(!adding); setEditId(null); }}>{adding ? "Zatvori" : "+ Novi odgovor"}</button>
      </div>
      {adding && <NewAnswer catId={id} others={asOthers(data.answers)} onSaved={saved} />}
      {msg && <p className="small ok-msg">{msg}</p>}
      <p className="small">
        Prijevoz je procjena prije igrača: u igri se procjena miješa sa stvarnim odgovorima, pa se odgovor s vremenom može pomaknuti.
        ✎ = ručno uređeno (seed to više ne mijenja).
      </p>
      {tiers.map((t) => {
        const list = shown.filter((r) => r.tier === t);
        if (!list.length) return null;
        return (
          <section key={t.name} className="ans-group">
            <h3 className="eyebrow">{t.emoji} {t.name} · {list.length}</h3>
            <ul className="ans-list">
              {list.map((a) =>
                editId === a.id ? (
                  <li key={a.id} className="ans-row editing">
                    <AnswerEdit catId={id} answer={a} others={asOthers(data.answers, a.id)} onSaved={saved} onCancel={() => setEditId(null)} />
                  </li>
                ) : (
                  <li key={a.id} className="ans-row">
                    <div className="ans-name">
                      <b>{a.canonical}</b>
                      {(a.edited || a.seedCanonical) && <span className="tag" title={a.seedCanonical ? `izvorno: ${a.seedCanonical}` : "ručno uređena rijetkost"}>✎</span>}
                      {a.source === "review" && <span className="tag" title="dodano u adminu">admin</span>}
                      {!!a.aliases.length && <span className="small ans-alias">{a.aliases.join(", ")}</span>}
                    </div>
                    <span className="ans-pct">{pct(a.priorShare)} %</span>
                    <button className="ghost small-btn" onClick={() => { setEditId(a.id); setAdding(false); setMsg(""); }}>Uredi</button>
                  </li>
                ),
              )}
            </ul>
          </section>
        );
      })}
      {!shown.length && <p className="small">Nema odgovora za „{q}”.</p>}
    </Modal>
  );
}

function NewAnswer({ catId, others, onSaved }: { catId: number; others: { share: number; rare?: boolean }[]; onSaved: (msg: string) => void }) {
  const [canonical, setCanonical] = useState("");
  const [variants, setVariants] = useState("");
  const tier = useTierPrior(others);
  const [err, setErr] = useState("");
  return (
    <div className="decide stack" style={{ gap: 8 }}>
      <div className="row">
        <input className="field grow" placeholder="Novi odgovor" value={canonical} onChange={(e) => setCanonical(upperFirst(e.target.value))} />
        <input className="field grow" placeholder="Varijante, odvojene zarezom" value={variants} onChange={(e) => setVariants(e.target.value)} />
        {tier.select}
        <button
          className="small-btn"
          onClick={() =>
            api(`/api/admin/categories/${catId}/answers`, "POST", { canonical, variants: variants.split(","), priorShare: tier.prior, rare: tier.rare }).then(
              () => onSaved(`Dodano: „${canonical}”.`),
              (e: Error) => setErr(e.message),
            )
          }
        >
          Dodaj
        </button>
      </div>
      <Err msg={err} />
    </div>
  );
}

/** Uređivanje jednog odgovora: naziv, prijevoz (ili točan postotak) i helikopter, s pregledom prijevoza prije spremanja. */
function AnswerEdit({ catId, answer, others, onSaved, onCancel }: { catId: number; answer: AnswerRow; others: { share: number; rare?: boolean }[]; onSaved: (msg: string) => void; onCancel: () => void }) {
  const tiers = useContext(Tiers);
  const [name, setName] = useState(answer.canonical);
  const [share, setShare] = useState(pct(answer.priorShare));
  const [rare, setRare] = useState(answer.rare);
  const [keepOld, setKeepOld] = useState(true);
  const [removed, setRemoved] = useState<string[]>([]);
  const [newAliases, setNewAliases] = useState("");
  const [err, setErr] = useState("");
  const added = newAliases.split(",").map((a) => a.trim()).filter(Boolean);
  const value = Number(share.replace(",", "."));
  const valid = Number.isFinite(value) && value > 0 && value <= 100;
  // prijevoz koji bi odgovor dobio s ovom procjenom (isti izračun kao popis gore)
  const all = [...others, { share: valid ? value : answer.priorShare, rare, me: true }].sort((a, b) => b.share - a.share);
  const preview = tiers.length ? assignTiers({ tiers }, all)[all.findIndex((a) => "me" in a)] : undefined;
  const pickTier = (i: number) => {
    setRare(!!tiers[i].rare);
    setShare(pct(priorForRank(tiers, i, others)));
  };
  const renamed = name.trim() && name.trim() !== answer.canonical;
  const save = () =>
    api(`/api/admin/categories/${catId}/answers/${answer.id}`, "PATCH", { canonical: name, priorShare: value, rare, keepOld, addAliases: added, removeAliases: removed }).then(
      () => onSaved(`Spremljeno: „${upperFirst(name.trim())}”${added.length ? `, dodano varijanti: ${added.length}` : ""}${removed.length ? `, obrisano: ${removed.length}` : ""}.`),
      (e: Error) => setErr(e.message),
    );
  return (
    <div className="stack ans-edit">
      <div className="ans-edit-grid">
        <label className="small">
          naziv
          <input className="field" value={name} onChange={(e) => setName(upperFirst(e.target.value))} autoFocus />
        </label>
        <label className="small">
          prijevoz
          <select className="field" value={preview ? tiers.indexOf(preview) : 0} onChange={(e) => pickTier(Number(e.target.value))}>
            {tiers.map((t, i) => <option key={t.name} value={i}>{t.emoji} {t.name}</option>)}
          </select>
        </label>
        <label className="small">
          procjena %
          <input className="field narrow-num" inputMode="decimal" value={share} onChange={(e) => setShare(e.target.value)} />
        </label>
        <label className="small check">
          <input type="checkbox" checked={rare} onChange={(e) => setRare(e.target.checked)} /> helikopter (najrjeđi)
        </label>
      </div>
      {renamed && (
        <label className="small check">
          <input type="checkbox" checked={keepOld} onChange={(e) => setKeepOld(e.target.checked)} /> „{answer.canonical}” ostaje kao varijanta (tko to upiše i dalje pogađa)
        </label>
      )}
      <div className="stack" style={{ gap: 6 }}>
        <span className="small">varijante (i ovo se prihvaća kao taj odgovor)</span>
        <div className="chips">
          {answer.aliases.map((a) => {
            const off = removed.includes(a);
            return (
              <button key={a} type="button" className={"chip alias-chip" + (off ? " off" : "")} title={off ? "Vrati" : "Obriši varijantu"}
                onClick={() => setRemoved(off ? removed.filter((x) => x !== a) : [...removed, a])}>
                {a} <span>{off ? "↺" : "✕"}</span>
              </button>
            );
          })}
          {!answer.aliases.length && <span className="small">Još nema varijanti.</span>}
        </div>
        <input className="field" placeholder="Nove varijante, odvojene zarezom (npr. otok Krk, Krčki otok)" value={newAliases} onChange={(e) => setNewAliases(e.target.value)} />
        <p className="small">Velika slova, kvačice i sitni tipfeleri se ionako prepoznaju; varijanta treba za drugi naziv ili kraticu.</p>
      </div>
      {answer.seedCanonical && <p className="small">Izvorni naziv iz seeda: {answer.seedCanonical}</p>}
      <div className="row">
        <button className="small-btn" disabled={!valid || !name.trim()} onClick={save}>Spremi</button>
        <button className="ghost small-btn" onClick={onCancel}>Odustani</button>
        {preview && <span className="small">Prije igrača: {preview.emoji} {preview.name}</span>}
        <Err msg={valid ? err : "Procjena mora biti između 0 i 100"} />
      </div>
    </div>
  );
}

// ---------- Raspored ----------

type ScheduleDay = { date: string; number: number; games: number; categories: { position: number; categoryId: number; title: string }[] | null };

function Schedule({ perDay, mirror }: { perDay: number; mirror: string | null }) {
  const { data, error, setData } = useLoad<ScheduleDay[]>("/api/admin/schedule");
  const cats = useLoad<CatRow[]>("/api/admin/categories");
  const [edit, setEdit] = useState<{ date: string; ids: number[] } | null>(null);
  const [err, setErr] = useState("");
  const save = (date: string, categoryIds: number[] | null) =>
    api<ScheduleDay[]>("/api/admin/schedule", "POST", { date, categoryIds }).then(
      (d) => { setData(d); setEdit(null); setErr(""); },
      (e: Error) => setErr(e.message),
    );
  const active = (cats.data ?? []).filter((c) => c.active && !c.missing.length);
  return (
    <div className="stack">
      <h2>Raspored za sljedećih 14 dana</h2>
      <p className="small">
        {mirror
          ? "Raspored prati Hrvatsku: isti dan dolaze parovi istih kategorija. Mijenja se u hrvatskom adminu."
          : "Dan bez rasporeda složi se sam pri prvom igraču (najdulje nekorištene kategorije s parom u BiH i Srbiji). Promjena dana vrijedi za sve tri države. Dan koji je netko već igrao ne može se mijenjati."}
      </p>
      <Err msg={error || err} />
      {data?.map((d) => (
        <div key={d.date} className="review">
          <div className="row" style={{ justifyContent: "space-between" }}>
            <b>#{d.number} · {fmtDate(d.date)}</b>
            <div className="row">
              {d.games > 0 && <span className="chip">{d.games} igrača</span>}
              {d.games === 0 && !mirror && (
                <>
                  <button className="ghost small-btn" onClick={() => setEdit({ date: d.date, ids: d.categories?.map((c) => c.categoryId) ?? Array(perDay).fill(0) })}>Uredi</button>
                  <button className="ghost small-btn" onClick={() => save(d.date, null)}>{d.categories ? "Složi ponovno" : "Složi automatski"}</button>
                </>
              )}
            </div>
          </div>
          {edit?.date === d.date ? (
            <div className="stack" style={{ gap: 6, marginTop: 8 }}>
              {edit.ids.map((id, i) => (
                <select key={i} className="field" value={id} onChange={(e) => setEdit({ ...edit, ids: edit.ids.map((x, j) => (j === i ? Number(e.target.value) : x)) })}>
                  <option value={0}>{i + 1}. odaberi kategoriju…</option>
                  {active.map((c) => <option key={c.id} value={c.id}>{i + 1}. {c.title}</option>)}
                </select>
              ))}
              <div className="row"><button className="small-btn" onClick={() => save(d.date, edit.ids)}>Spremi dan</button></div>
            </div>
          ) : (
            <p className="small">{d.categories ? d.categories.map((c) => c.title).join(" · ") : "Automatski"}</p>
          )}
        </div>
      ))}
    </div>
  );
}

// ---------- Odgovori ----------

type AttemptRow = { createdAt: string; date: string; category: string; raw: string; answer: string | null; accepted: boolean; timedOut: boolean; elapsedMs: number; player: string; registered: boolean };

function Attempts({ today }: { today: string }) {
  const [date, setDate] = useState(today);
  const [q, setQ] = useState("");
  const [rejected, setRejected] = useState(false);
  const qs = new URLSearchParams({ date, q, rejected: rejected ? "1" : "" }).toString();
  const { data, error } = useLoad<AttemptRow[]>(`/api/admin/attempts?${qs}`);
  return (
    <div className="stack">
      <div className="row">
        <h2>Svi upisi</h2>
        <input type="date" className="field" value={date} onChange={(e) => setDate(e.target.value)} />
        <input className="field" placeholder="Traži tekst" value={q} onChange={(e) => setQ(e.target.value)} />
        <label className="small"><input type="checkbox" checked={rejected} onChange={(e) => setRejected(e.target.checked)} /> samo odbijeni</label>
        <a href={`/api/admin/attempts?${qs}&format=csv`}>Izvoz CSV</a>
      </div>
      <Err msg={error} />
      <table className="tbl">
        <thead><tr><th>Vrijeme</th><th>Kategorija</th><th>Upis</th><th>Prepoznato</th><th>s</th><th>Igrač</th></tr></thead>
        <tbody>
          {data?.map((a, i) => (
            <tr key={i} className={a.accepted ? "" : "off"}>
              <td>{new Date(a.createdAt).toLocaleTimeString("hr-HR")}</td>
              <td>{a.category}</td>
              <td>{a.raw}</td>
              <td>{a.answer ?? (a.timedOut ? "kasno" : "—")}</td>
              <td>{(a.elapsedMs / 1000).toFixed(1)}</td>
              <td>{a.player}{a.registered && " ●"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {data?.length === 500 && <p className="small">Prikazano prvih 500; za sve koristi CSV.</p>}
    </div>
  );
}
