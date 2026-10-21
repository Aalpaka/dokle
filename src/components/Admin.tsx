"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { assignTiers, priorForTier, tierFor } from "@/lib/scoring";

async function api<T>(path: string, method = "GET", body?: unknown): Promise<T> {
  const res = await fetch(path, {
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
type Meta = { skin: { id: string; groups: Record<string, string>; perDay: number; today: string; tiers: TierInfo[] } };

// tierovi skina, sortirani od najčešćeg prema najrjeđem (kao u configu)
const Tiers = createContext<TierInfo[]>([]);

const pct = (n: number) => String(n).replace(".", ",");

// kanonski odgovori počinju velikim slovom (server to i sam osigura)
const upperFirst = (v: string) => v.charAt(0).toLocaleUpperCase("hr") + v.slice(1);

/** Prozor preko stranice (native dialog: Esc i klik izvan zatvaraju). */
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (d && !d.open) d.showModal();
  }, []);
  return (
    <dialog ref={ref} className="modal" onClose={onClose} onClick={(e) => e.target === ref.current && onClose()} aria-label={title}>
      <div className="stack">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <h2>{title}</h2>
          <button className="ghost small-btn" onClick={onClose} aria-label="Zatvori">✕</button>
        </div>
        {children}
      </div>
    </dialog>
  );
}

/** Oznaka prijevoza; `tier` kad je već izračunat za cijelu kategoriju (assignTiers), inače po udjelu. */
function TierLabel({ share, rare, tier }: { share: number; rare?: boolean; tier?: TierInfo }) {
  const tiers = useContext(Tiers);
  const t = tier ?? (tiers.length ? tierFor({ tiers }, share, rare) : undefined);
  return t ? <span className="chip">{t.emoji} {t.name}</span> : null;
}

/** Koji broj upisati za koji prijevoz (sredina raspona), za unos više odgovora odjednom. */
function TierLegend() {
  const tiers = useContext(Tiers);
  return (
    <p className="small">
      Procjena za prijevoz: {tiers.map((t, i) => `${t.emoji} ${t.name} =${priorForTier(tiers, i)}${t.rare ? "!" : ""}`).join(" · ")}
    </p>
  );
}

/** Izbor prijevoza umjesto postotka; vraća procjenu iz sredine raspona tiera. Zadano je najrjeđi obični tier. */
function useTierPrior() {
  const tiers = useContext(Tiers);
  const [index, setIndex] = useState(() => Math.max(tiers.findLastIndex((t) => !t.rare), 0));
  const select = (
    <label className="small">
      prijevoz
      <select className="field" value={index} onChange={(e) => setIndex(Number(e.target.value))} aria-label="Prijevoz">
        {tiers.map((t, i) => (
          <option key={t.name} value={i}>
            {t.emoji} {t.name} ({t.rare ? "1 do 2 najrjeđa po kategoriji" : i === 0 ? `${pct(t.minShare)} % i više` : t.minShare ? `${pct(t.minShare)} do ${pct(tiers[i - 1].minShare)} %` : `ispod ${pct(tiers[i - 1].minShare)} %`})
          </option>
        ))}
      </select>
    </label>
  );
  return { select, prior: tiers.length ? priorForTier(tiers, index) : 0.1, rare: !!tiers[index]?.rare };
}

const TABS = ["Dan", "Za pregled", "Igrači", "Sadržaj", "Raspored", "Odgovori"] as const;
type Tab = (typeof TABS)[number];

export default function Admin() {
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
        {tab === "Za pregled" && <Review />}
        {tab === "Igrači" && <Players />}
        {tab === "Sadržaj" && <Content groups={m.groups} />}
        {tab === "Raspored" && <Schedule perDay={m.perDay} />}
        {tab === "Odgovori" && <Attempts today={m.today} />}
      </section>
      </Tiers.Provider>
    </AdminShell>
  );
}

function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="wrap">
      <header className="top">
        <a href="/" className="plate" style={{ textDecoration: "none" }}>Dokle?</a>
        <span className="eyebrow">Admin</span>
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
  totals?: { started: number; finished: number; registered: number; avgKm: number };
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
type CatDetail = { id: number; title: string; active: boolean; hint: string | null; answers: { id: number; canonical: string; priorShare: number; rare: boolean; source: string; aliases: string[] }[] };

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
  const tier = useTierPrior();
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

type PlayersData = {
  counts: { total: number; registered: number };
  daily: { date: string; players: number; registered: number; finished: number }[];
  players: { id: string; nickname: string | null; email: string | null; role: string; lastSeenAt: string; stats: { played: number; currentStreak: number; longestStreak: number; avgKm: number } }[];
};

function Players() {
  const { data, error } = useLoad<PlayersData>("/api/admin/players");
  return (
    <div className="stack">
      <h2>Igrači</h2>
      <Err msg={error} />
      {data && (
        <>
          <div className="stats">
            <Stat v={data.counts.total} l="ukupno igrača" />
            <Stat v={data.counts.registered} l="s računom" />
          </div>
          <span className="eyebrow">Zadnjih 14 dana</span>
          <table className="tbl">
            <thead><tr><th>Datum</th><th>Igrača</th><th>Završilo</th><th>S računom</th></tr></thead>
            <tbody>{data.daily.map((d) => <tr key={d.date}><td>{fmtDate(d.date)}</td><td>{d.players}</td><td>{d.finished}</td><td>{d.registered}</td></tr>)}</tbody>
          </table>
          <span className="eyebrow">Prijavljeni igrači</span>
          <table className="tbl">
            <thead><tr><th>Nadimak</th><th>Email</th><th>Odigrano</th><th>Streak</th><th>Najdulji</th><th>Prosjek km</th><th>Zadnji put</th></tr></thead>
            <tbody>
              {data.players.map((p) => (
                <tr key={p.id}>
                  <td>{p.nickname}{p.role === "admin" && " (admin)"}</td>
                  <td>{p.email}</td>
                  <td>{p.stats.played}</td>
                  <td>{p.stats.currentStreak}</td>
                  <td>{p.stats.longestStreak}</td>
                  <td>{p.stats.avgKm}</td>
                  <td>{new Date(p.lastSeenAt).toLocaleString("hr-HR")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

const fmtDate = (d: string) => {
  const [y, m, day] = d.split("-");
  return `${+day}. ${+m}. ${y}.`;
};

// ---------- Sadržaj ----------

type CatRow = { id: number; title: string; hint: string | null; group: string; active: boolean; answers: number; lastUsed: string | null };

function Content({ groups }: { groups: Record<string, string> }) {
  const { data, error, reload } = useLoad<CatRow[]>("/api/admin/categories");
  const [openId, setOpenId] = useState<number | null>(null);
  const [adding, setAdding] = useState(false);
  return (
    <div className="stack">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <h2>Kategorije</h2>
        <button className="small-btn" onClick={() => setAdding(!adding)}>{adding ? "Zatvori" : "Nova kategorija"}</button>
      </div>
      {adding && <NewCategory groups={groups} onDone={() => { setAdding(false); reload(); }} />}
      <Err msg={error} />
      <table className="tbl">
        <thead><tr><th>Kategorija</th><th>Grupa</th><th>Odgovora</th><th>Zadnje korištena</th><th>Aktivna</th><th></th></tr></thead>
        <tbody>
          {data?.map((c) => (
            <tr key={c.id} className={c.active ? "" : "off"}>
              <td>{c.title}</td>
              <td>{groups[c.group] ?? c.group}</td>
              <td>{c.answers}</td>
              <td>{c.lastUsed ? fmtDate(c.lastUsed) : "—"}</td>
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

function NewCategory({ groups, onDone }: { groups: Record<string, string>; onDone: () => void }) {
  const [title, setTitle] = useState("");
  const [group, setGroup] = useState(Object.keys(groups)[0]);
  const [hint, setHint] = useState("");
  const [strip, setStrip] = useState("");
  const [answers, setAnswers] = useState("");
  const [err, setErr] = useState("");
  return (
    <div className="decide stack" style={{ gap: 8 }}>
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
  const [canonical, setCanonical] = useState("");
  const [variants, setVariants] = useState("");
  const tier = useTierPrior();
  const tiers = useContext(Tiers);
  const [err, setErr] = useState("");
  if (!data) return error ? <Modal title="Odgovori" onClose={onClose}><Err msg={error} /></Modal> : null;
  // odgovori dolaze sortirani po procjeni; prijevoz kao u igri prije prvih igrača (najčešći pješice, bez praznih)
  const assigned = tiers.length ? assignTiers({ tiers }, data.answers.map((a) => ({ share: a.priorShare, rare: a.rare }))) : [];
  return (
    <Modal title={`${data.title} · ${data.answers.length}`} onClose={onClose}>
      <div className="row">
        <input className="field" placeholder="Novi odgovor" value={canonical} onChange={(e) => setCanonical(upperFirst(e.target.value))} />
        <input className="field" placeholder="Varijante, odvojene zarezom" value={variants} onChange={(e) => setVariants(e.target.value)} />
        {tier.select}
        <button
          className="small-btn"
          onClick={() =>
            api(`/api/admin/categories/${id}/answers`, "POST", { canonical, variants: variants.split(","), priorShare: tier.prior, rare: tier.rare }).then(
              () => { setCanonical(""); setVariants(""); reload(); onChange(); },
              (e: Error) => setErr(e.message),
            )
          }
        >
          Dodaj
        </button>
      </div>
      <Err msg={err} />
      <table className="tbl">
        <thead><tr><th>Odgovor</th><th>Varijante</th><th>Prijevoz (procjena)</th></tr></thead>
        <tbody>
          {data.answers.map((a, i) => (
            <tr key={a.id}><td>{a.canonical}{a.source === "review" && " ✎"}</td><td>{a.aliases.join(", ")}</td><td><TierLabel share={a.priorShare} rare={a.rare} tier={assigned[i]} /> <span className="small">{pct(a.priorShare)} %</span></td></tr>
          ))}
        </tbody>
      </table>
    </Modal>
  );
}

// ---------- Raspored ----------

type ScheduleDay = { date: string; number: number; games: number; categories: { position: number; categoryId: number; title: string }[] | null };

function Schedule({ perDay }: { perDay: number }) {
  const { data, error, setData } = useLoad<ScheduleDay[]>("/api/admin/schedule");
  const cats = useLoad<CatRow[]>("/api/admin/categories");
  const [edit, setEdit] = useState<{ date: string; ids: number[] } | null>(null);
  const [err, setErr] = useState("");
  const save = (date: string, categoryIds: number[] | null) =>
    api<ScheduleDay[]>("/api/admin/schedule", "POST", { date, categoryIds }).then(
      (d) => { setData(d); setEdit(null); setErr(""); },
      (e: Error) => setErr(e.message),
    );
  const active = (cats.data ?? []).filter((c) => c.active);
  return (
    <div className="stack">
      <h2>Raspored za sljedećih 14 dana</h2>
      <p className="small">Dan bez rasporeda složi se sam pri prvom igraču (najdulje nekorištene kategorije). Dan koji je netko već igrao ne može se mijenjati.</p>
      <Err msg={error || err} />
      {data?.map((d) => (
        <div key={d.date} className="review">
          <div className="row" style={{ justifyContent: "space-between" }}>
            <b>#{d.number} · {fmtDate(d.date)}</b>
            <div className="row">
              {d.games > 0 && <span className="chip">{d.games} igrača</span>}
              {d.games === 0 && (
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
