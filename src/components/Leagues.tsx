"use client";

import { useCallback, useEffect, useState } from "react";
import { GoogleButton, PageShell, useMe } from "./account";
import { PERIODS, PERIOD_LABEL, type Period, type StandingRow } from "@/lib/league";
import type { LeagueSummary, LeagueView } from "@/server/leagues";

async function post<T>(url: string, body: unknown): Promise<T> {
  const r = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
  const out = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(out.error ?? "Greška");
  return out as T;
}

function useMyLeagues() {
  const [list, setList] = useState<LeagueSummary[] | null>(null);
  useEffect(() => {
    fetch("/api/lige", { cache: "no-store" })
      .then((r) => r.json())
      .then((b) => setList(b.leagues), () => setList([]));
  }, []);
  return list;
}

const leagueUrl = (code: string) => `${window.location.origin}/liga/${code}`;
const members = (n: number) => {
  const d = n % 10, h = n % 100;
  return `${n} ${d === 1 && h !== 11 ? "član" : d >= 2 && d <= 4 && (h < 12 || h > 14) ? "člana" : "članova"}`;
};
const medal = (rank: number) => ["🥇", "🥈", "🥉"][rank - 1] ?? `${rank}.`;
const fmtDate = (d: string) => {
  const [y, m, day] = d.split("-");
  return `${+day}. ${+m}. ${y}.`;
};

function NewLeagueForm() {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const create = async () => {
    try {
      const { code } = await post<{ code: string }>("/api/lige", { name });
      window.location.href = `/liga/${code}`;
    } catch (e) {
      setMsg((e as Error).message);
    }
  };
  return (
    <>
      <form className="nick" onSubmit={(e) => { e.preventDefault(); create(); }}>
        <input value={name} maxLength={40} placeholder="npr. Ekipa iz ureda" onChange={(e) => setName(e.target.value)} aria-label="Ime nove lige" />
        <button type="submit">Napravi</button>
      </form>
      {msg && <p className="small">{msg}</p>}
    </>
  );
}

// ---------- /lige ----------

export function LeaguesPage() {
  const me = useMe();
  const list = useMyLeagues();
  if (!me) return <PageShell me={me}><section className="card"><p className="loading">Učitavam…</p></section></PageShell>;
  if (!me.user)
    return (
      <PageShell me={me}>
        <section className="card stack league-hero">
          <span className="eyebrow">Lige</span>
          <h1>Tko iz ekipe stigne najdalje?</h1>
          <p>Napravi ligu, pošalji link prijateljima i svaki dan usporedite koliko ste kilometara prešli. Za lige se treba prijaviti.</p>
          {me.authEnabled ? <div className="row"><GoogleButton /></div> : <p className="small">Prijava trenutno nije uključena.</p>}
        </section>
      </PageShell>
    );
  return (
    <PageShell me={me}>
      <div className="page-grid">
        <section className="card stack">
          <span className="eyebrow">Tvoje lige</span>
          {!list ? (
            <p className="loading">Učitavam…</p>
          ) : list.length ? (
            <ul className="league-cards">
              {list.map((l) => (
                <li key={l.code}>
                  <a href={`/liga/${l.code}`}>
                    <span className="rank-big">{l.rank ? medal(l.rank) : "–"}</span>
                    <span className="lc-body">
                      <b>{l.name}</b>
                      <span className="small">
                        {members(l.members)}
                        {l.isOwner && " · osnivač"}
                        {l.leader && ` · vodi ${l.leader.nickname} (${l.leader.km} km)`}
                      </span>
                    </span>
                    <span className="lc-km">{l.myKm}<small> km</small></span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>Još nisi ni u jednoj ligi. Napravi svoju i pošalji link ekipi, ili otvori link koji ti je netko poslao.</p>
          )}
          {!!list?.length && <p className="small">Mjesto i km za tekući tjedan (od ponedjeljka).</p>}
        </section>
        <div className="side">
          <section className="card stack">
            <span className="eyebrow">Nova liga</span>
            <NewLeagueForm />
          </section>
          <section className="card stack">
            <span className="eyebrow">Kako rade lige</span>
            <ul className="rules">
              <li><span className="k">🔗</span><span>pošalji link lige, tko ga otvori i prijavi se, ulazi u ligu</span></li>
              <li><span className="k">🛣️</span><span>igraš običnu dnevnu partiju, km se zbrajaju u tablici lige</span></li>
              <li><span className="k">📅</span><span>tablica za danas, tjedan, mjesec i ukupno</span></li>
              <li><span className="k">👀</span><span>kad odigraš, vidiš što su ostali danas odgovorili</span></li>
            </ul>
          </section>
        </div>
      </div>
    </PageShell>
  );
}

/** Sažeti popis liga i nova liga, za profil. */
export function MyLeagues() {
  const list = useMyLeagues();
  return (
    <div className="stack">
      {!list ? (
        <p className="small">Učitavam…</p>
      ) : list.length ? (
        <ul className="recap leagues">
          {list.map((l) => (
            <li key={l.code}>
              <a href={`/liga/${l.code}`}>
                <span className="w"><span className="a">{l.name}</span><span className="c">{members(l.members)}{l.isOwner && " · osnivač"}</span></span>
                <span className="k">{l.rank ? `${l.rank}. mjesto` : ""}</span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="small">Još nisi ni u jednoj ligi.</p>
      )}
      <NewLeagueForm />
    </div>
  );
}

/** Okvir na kraju partije: mjesto u svakoj ligi ovaj tjedan ili poziv da napravi ligu. */
export function LeaguesBox() {
  const list = useMyLeagues();
  if (!list) return null;
  return (
    <div className="savebox">
      <b>🏆 Lige</b>
      {list.length ? (
        <ul className="recap leagues">
          {list.map((l) => (
            <li key={l.code}>
              <a href={`/liga/${l.code}`}>
                <span className="a">{l.name}</span>
                <span className="k">{l.rank ? `${l.rank}. ovaj tjedan` : ""}</span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <span className="small">Napravi ligu s ekipom i pratite tko svaki dan stigne najdalje.</span>
      )}
      <a className="small" href="/lige">{list.length ? "Sve lige i nova liga" : "Napravi ligu"} →</a>
    </div>
  );
}

// ---------- /liga/KOD ----------

export function LeaguePage({ code }: { code: string }) {
  const me = useMe();
  const [period, setPeriod] = useState<Period>("week");
  const [view, setView] = useState<LeagueView | null>(null);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(0);

  useEffect(() => {
    fetch(`/api/lige/${code}?period=${period}`, { cache: "no-store" })
      .then(async (r) => {
        const b = await r.json();
        if (!r.ok) throw new Error(b.error);
        setView(b);
      })
      .catch((e) => setError(e.message));
  }, [code, period, reload]);

  const act = useCallback(
    async (body: Record<string, unknown>, after?: () => void) => {
      try {
        await post(`/api/lige/${code}`, body);
        if (after) after();
        else setReload((x) => x + 1);
      } catch (e) {
        alert((e as Error).message);
      }
    },
    [code],
  );

  if (error)
    return (
      <PageShell me={me}>
        <section className="card stack"><p>{error}</p><p className="small"><a href="/lige">Tvoje lige</a></p></section>
      </PageShell>
    );
  if (!view || !me) return <PageShell me={me}><section className="card"><p className="loading">Učitavam…</p></section></PageShell>;

  if (!view.isMember)
    return (
      <PageShell me={me}>
        <section className="card stack league-hero">
          <span className="eyebrow">Poziv u ligu</span>
          <h1>{view.name}</h1>
          <p>{view.owner ? `${view.owner} te zove` : "Zovu te"} u ligu ({members(view.members)}). Svaki dan igraš običnu partiju, a km se zbrajaju u tablici lige.</p>
          {me.user ? (
            <div className="row"><button onClick={() => act({ action: "join" })}>Uđi u ligu</button></div>
          ) : me.authEnabled ? (
            <>
              <p className="small">Za lige se treba prijaviti, nakon prijave vraćaš se ovdje.</p>
              <div className="row"><GoogleButton /></div>
            </>
          ) : (
            <p className="small">Prijava trenutno nije uključena.</p>
          )}
        </section>
      </PageShell>
    );

  const mine = view.standings!.find((r) => r.memberId === view.meMemberId);
  return (
    <PageShell me={me}>
      <section className="card league-hero">
        <div className="lh-main">
          <span className="eyebrow">Liga</span>
          <h1>{view.name}</h1>
          <p className="small">{members(view.members)} · osnivač {view.owner} · od {fmtDate(view.createdAt.slice(0, 10))}</p>
          <Invite code={view.code} name={view.name} />
        </div>
        {mine && (
          <div className="lh-me">
            <span className="rank-big">{medal(mine.rank)}</span>
            <span className="small">{PERIOD_LABEL[period].toLowerCase()} · {mine.km} km</span>
          </div>
        )}
      </section>

      <div className="page-grid">
        <div className="main">
          <section className="card stack">
            <div className="row" style={{ justifyContent: "space-between" }}>
              <nav className="tabs" role="tablist">
                {PERIODS.map((p) => (
                  <button key={p} role="tab" aria-selected={period === p} className={period === p ? "" : "ghost"} onClick={() => setPeriod(p)}>
                    {PERIOD_LABEL[p]}
                  </button>
                ))}
              </nav>
              <span className="small">{period === "day" ? fmtDate(view.from!) : `od ${fmtDate(view.from!)}`}</span>
            </div>
            <Standings rows={view.standings!} me={view.meMemberId} period={period} />
          </section>
          <section className="card stack">
            <span className="eyebrow">Danas</span>
            <Today view={view} />
          </section>
        </div>

        <div className="side">
          <Answers view={view} />
          <Settings view={view} act={act} />
        </div>
      </div>
    </PageShell>
  );
}

function Invite({ code, name }: { code: string; name: string }) {
  const [msg, setMsg] = useState("");
  const share = () => {
    const url = leagueUrl(code);
    const text = `Uđi u moju ligu "${name}" na Dokle?`;
    const copy = () => navigator.clipboard.writeText(url).then(() => setMsg("Link kopiran."), () => setMsg(url));
    if (navigator.share && matchMedia("(pointer: coarse)").matches) navigator.share({ text, url }).catch((e) => { if (e?.name !== "AbortError") copy(); });
    else copy();
  };
  return (
    <div className="row">
      <button className="small-btn" onClick={share}>Pozovi ekipu</button>
      <span className="small">kod <b className="mono">{code}</b>{msg && ` · ${msg}`}</span>
    </div>
  );
}

function Standings({ rows, me, period }: { rows: StandingRow[]; me: number | null; period: Period }) {
  const full = period !== "day";
  return (
    <div className="table-scroll">
      <table className="league">
        <thead>
          <tr>
            <th className="rk">#</th>
            <th className="name">Igrač</th>
            <th>km</th>
            {full && <th title="odigranih dana">dana</th>}
            {full && <th className="opt" title="prosjek km po danu">prosjek</th>}
            {full && <th className="opt" title="najviše km u jednom danu">najbolje</th>}
            {full && <th title="dani na kojima je stigao najdalje u ligi">🏆</th>}
            <th title="trenutni streak">🔥</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.memberId} className={(r.memberId === me ? "me " : "") + (r.rank <= 3 && r.km > 0 ? "top" : "")}>
              <td className="rk">{r.km > 0 ? medal(r.rank) : `${r.rank}.`}</td>
              <td className="name">{r.nickname}</td>
              <td><b>{r.km}</b></td>
              {full && <td>{r.played}</td>}
              {full && <td className="opt">{r.avgKm}</td>}
              {full && <td className="opt">{r.bestKm}</td>}
              {full && <td>{r.wins}</td>}
              <td>{r.streak}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {full && <p className="small legend">dana = odigrani dani · 🏆 = dani kad je stigao najdalje u ligi · 🔥 = streak</p>}
    </div>
  );
}

function Today({ view }: { view: LeagueView }) {
  const today = view.today!;
  const best = Math.max(1, ...today.map((t) => t.km));
  const label = { done: "", playing: "igra…", none: "još nije igrao" } as const;
  return (
    <ul className="today-bars">
      {today.map((t) => (
        <li key={t.memberId} className={t.memberId === view.meMemberId ? "me" : ""}>
          <span className="tb-name">{t.nickname}</span>
          {t.status === "done" ? (
            <>
              <span className="tb-bar"><span style={{ width: `${Math.max(2, (100 * t.km) / best)}%` }} /></span>
              <span className="tb-km">{t.km} km</span>
            </>
          ) : (
            <span className="tb-wait">{label[t.status]}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

function Answers({ view }: { view: LeagueView }) {
  if (!view.answers)
    return (
      <section className="card stack">
        <span className="eyebrow">Današnji odgovori</span>
        <p className="small">Odigraj današnju partiju pa ćeš ovdje vidjeti što su ostali odgovorili. <a href="/">Igraj</a></p>
      </section>
    );
  return (
    <section className="card stack">
      <details className="answers">
        <summary>Današnji odgovori ekipe</summary>
        <div className="answer-cats">
          {view.answers.map((c, i) => (
            <div key={i}>
              <b>{c.title}</b>
              <ul>
                {c.answers.map((a) => (
                  <li key={a.memberId} className={a.memberId === view.meMemberId ? "me" : ""}>
                    <span>{a.emoji}</span>
                    <span className="ans">{a.answer ?? "—"}</span>
                    <span className="who">{a.nickname}</span>
                    <span className="km">{a.km}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </details>
    </section>
  );
}

function Settings({ view, act }: { view: LeagueView; act: (b: Record<string, unknown>, after?: () => void) => void }) {
  const [name, setName] = useState(view.name);
  const toLeagues = () => (window.location.href = "/lige");
  const leave = () => {
    const extra = view.isOwner ? (view.members > 1 ? " Liga prelazi na najstarijeg člana." : " Liga će se obrisati jer si jedini član.") : "";
    if (confirm(`Izaći iz lige "${view.name}"?${extra}`)) act({ action: "leave" }, toLeagues);
  };
  const others = view.today!.filter((m) => m.memberId !== view.meMemberId);
  return (
    <section className="card">
      <details className="answers">
        <summary>Postavke lige</summary>
        <div className="stack">
          {view.isOwner && (
            <>
              <form className="nick" onSubmit={(e) => { e.preventDefault(); act({ action: "rename", name }); }}>
                <input value={name} maxLength={40} onChange={(e) => setName(e.target.value)} aria-label="Ime lige" />
                <button type="submit">Preimenuj</button>
              </form>
              {others.length > 0 && (
                <>
                  <span className="small">Izbaci člana:</span>
                  <ul className="recap leagues">
                    {others.map((m) => (
                      <li key={m.memberId}>
                        <div>
                          <span className="a">{m.nickname}</span>
                          <button className="danger small-btn" onClick={() => confirm(`Izbaciti ${m.nickname}?`) && act({ action: "kick", memberId: m.memberId })}>
                            Izbaci
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </>
          )}
          <div className="row">
            <button className="ghost small-btn" onClick={leave}>Izađi iz lige</button>
            {view.isOwner && (
              <button className="danger small-btn" onClick={() => confirm(`Obrisati ligu "${view.name}" za sve članove?`) && act({ action: "delete" }, toLeagues)}>
                Obriši ligu
              </button>
            )}
          </div>
        </div>
      </details>
    </section>
  );
}
