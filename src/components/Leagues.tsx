"use client";

import { useCallback, useEffect, useState } from "react";
import { GoogleButton, useMe } from "./account";
import { PERIODS, PERIOD_LABEL, type Period, type StandingRow } from "@/lib/league";
import type { LeagueSummary, LeagueView } from "@/server/leagues";

async function post<T>(url: string, body: unknown): Promise<T> {
  const r = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
  const out = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(out.error ?? "Greška");
  return out as T;
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="wrap">
      <header className="top single">
        <a href="/" className="plate" style={{ textDecoration: "none" }}>Dokle?</a>
        <span className="spacer" />
        <a className="acct" href="/lige">Lige</a>
        <a className="acct" href="/profil">Profil</a>
      </header>
      <section className="card single">{children}</section>
    </div>
  );
}

const leagueUrl = (code: string) => `${window.location.origin}/liga/${code}`;

// ---------- /lige ----------

export function LeaguesPage() {
  const me = useMe();
  return (
    <Shell>
      {!me ? (
        <p className="loading">Učitavam…</p>
      ) : !me.user ? (
        <div className="stack">
          <h1>Lige</h1>
          <p>Napravi ligu s ekipom i pratite tko svaki dan stigne najdalje. Za lige se treba prijaviti.</p>
          {me.authEnabled ? <div className="row"><GoogleButton /></div> : <p className="small">Prijava trenutno nije uključena.</p>}
        </div>
      ) : (
        <div className="stack">
          <span className="eyebrow">Tvoje lige</span>
          <MyLeagues />
        </div>
      )}
    </Shell>
  );
}

/** Popis igračevih liga i obrazac za novu ligu (na /lige i na profilu). */
export function MyLeagues() {
  const [list, setList] = useState<LeagueSummary[] | null>(null);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  useEffect(() => {
    fetch("/api/lige", { cache: "no-store" })
      .then((r) => r.json())
      .then((b) => setList(b.leagues), () => setList([]));
  }, []);
  const create = async () => {
    try {
      const { code } = await post<{ code: string }>("/api/lige", { name });
      window.location.href = `/liga/${code}`;
    } catch (e) {
      setMsg((e as Error).message);
    }
  };
  return (
    <div className="stack">
      {!list ? (
        <p className="small">Učitavam…</p>
      ) : list.length ? (
        <ul className="recap leagues">
          {list.map((l) => (
            <li key={l.code}>
              <a href={`/liga/${l.code}`}>
                <span className="w"><span className="a">{l.name}</span><span className="c">{l.members} {l.members === 1 ? "član" : "članova"}{l.isOwner && " · osnivač"}</span></span>
                <span className="k">{l.rank ? `${l.rank}. mjesto` : ""}</span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="small">Još nisi ni u jednoj ligi. Napravi svoju i pošalji link ekipi, ili otvori link koji ti je netko poslao.</p>
      )}
      <form className="nick" onSubmit={(e) => { e.preventDefault(); create(); }}>
        <input value={name} maxLength={40} placeholder="Ime nove lige, npr. Ekipa iz ureda" onChange={(e) => setName(e.target.value)} aria-label="Ime nove lige" />
        <button type="submit">Napravi ligu</button>
      </form>
      {msg && <p className="small">{msg}</p>}
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

  if (error) return <Shell><p>{error}</p><p className="small"><a href="/lige">Tvoje lige</a></p></Shell>;
  if (!view || !me) return <Shell><p className="loading">Učitavam…</p></Shell>;

  if (!view.isMember)
    return (
      <Shell>
        <div className="stack">
          <span className="eyebrow">Poziv u ligu</span>
          <h1>{view.name}</h1>
          <p>{view.owner ? `${view.owner} te zove` : "Zovu te"} u ligu ({view.members} {view.members === 1 ? "član" : "članova"}). Svaki dan igraš običnu partiju, a km se zbrajaju u tablici lige.</p>
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
        </div>
      </Shell>
    );

  return (
    <Shell>
      <div className="stack">
        <span className="eyebrow">Liga</span>
        <h1>{view.name}</h1>
        <Invite code={view.code} name={view.name} />

        <nav className="tabs" role="tablist">
          {PERIODS.map((p) => (
            <button key={p} role="tab" aria-selected={period === p} className={period === p ? "" : "ghost"} onClick={() => setPeriod(p)}>
              {PERIOD_LABEL[p]}
            </button>
          ))}
        </nav>
        <Standings rows={view.standings!} me={view.meMemberId} period={period} from={view.from!} />

        <span className="eyebrow">Danas</span>
        <Today view={view} />

        <Settings view={view} act={act} />
      </div>
    </Shell>
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
      <button className="ghost small-btn" onClick={share}>Pozovi ekipu</button>
      <span className="small">kod <b className="mono">{code}</b> {msg && `· ${msg}`}</span>
    </div>
  );
}

const fmtDate = (d: string) => {
  const [y, m, day] = d.split("-");
  return `${+day}. ${+m}. ${y}.`;
};

function Standings({ rows, me, period, from }: { rows: StandingRow[]; me: number | null; period: Period; from: string }) {
  return (
    <div className="stack" style={{ gap: 6 }}>
      {period !== "day" && <span className="small">od {fmtDate(from)}</span>}
      <div className="table-scroll">
        <table className="league">
          <thead>
            <tr>
              <th>#</th>
              <th className="name">Igrač</th>
              <th>km</th>
              {period !== "day" && <th title="odigranih dana">dana</th>}
              {period !== "day" && <th className="opt" title="prosjek km po danu">prosjek</th>}
              {period !== "day" && <th className="opt" title="najviše km u jednom danu">najbolje</th>}
              {period !== "day" && <th title="dani na kojima je stigao najdalje u ligi">🏆</th>}
              <th title="trenutni streak">🔥</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.memberId} className={r.memberId === me ? "me" : ""}>
                <td>{r.rank}.</td>
                <td className="name">{r.nickname}</td>
                <td><b>{r.km}</b></td>
                {period !== "day" && <td>{r.played}</td>}
                {period !== "day" && <td className="opt">{r.avgKm}</td>}
                {period !== "day" && <td className="opt">{r.bestKm}</td>}
                {period !== "day" && <td>{r.wins}</td>}
                <td>{r.streak}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Today({ view }: { view: LeagueView }) {
  const today = view.today!;
  const label = { done: "", playing: "igra…", none: "još nije igrao" } as const;
  return (
    <div className="stack" style={{ gap: 10 }}>
      <ul className="recap leagues">
        {today.map((t) => (
          <li key={t.memberId} className={t.memberId === view.meMemberId ? "me" : ""}>
            <div>
              <span className="a">{t.nickname}</span>
              <span className="k">{t.status === "done" ? `${t.km} km` : <span className="small">{label[t.status]}</span>}</span>
            </div>
          </li>
        ))}
      </ul>
      {view.answers ? (
        <details className="answers">
          <summary>Što je tko danas odgovorio</summary>
          {view.answers.map((c, i) => (
            <div key={i} className="stack" style={{ gap: 4 }}>
              <b>{c.title}</b>
              <ul className="small">
                {c.answers.map((a) => (
                  <li key={a.memberId}>
                    {a.emoji} {a.nickname}: <span className="ink">{a.answer ?? "—"}</span> · {a.km} km
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </details>
      ) : (
        <p className="small">Odigraj današnju partiju pa ćeš ovdje vidjeti što su ostali odgovorili. <a href="/">Igraj</a></p>
      )}
    </div>
  );
}

function Settings({ view, act }: { view: LeagueView; act: (b: Record<string, unknown>, after?: () => void) => void }) {
  const [name, setName] = useState(view.name);
  const toLeagues = () => (window.location.href = "/lige");
  const leave = () => {
    const extra = view.isOwner ? (view.members > 1 ? " Liga prelazi na najstarijeg člana." : " Liga će se obrisati jer si jedini član.") : "";
    if (confirm(`Izaći iz lige "${view.name}"?${extra}`)) act({ action: "leave" }, toLeagues);
  };
  return (
    <details className="answers">
      <summary>Postavke lige</summary>
      <div className="stack">
        {view.isOwner && (
          <>
            <form className="nick" onSubmit={(e) => { e.preventDefault(); act({ action: "rename", name }); }}>
              <input value={name} maxLength={40} onChange={(e) => setName(e.target.value)} aria-label="Ime lige" />
              <button type="submit">Preimenuj</button>
            </form>
            <span className="small">Izbaci člana:</span>
            <ul className="recap leagues">
              {view.today!
                .filter((m) => m.memberId !== view.meMemberId)
                .map((m) => (
                  <li key={m.memberId}>
                    <div>
                      <span className="a">{m.nickname}</span>
                      <button className="danger small-btn" onClick={() => confirm(`Izbaciti ${m.nickname}?`) && act({ action: "kick", memberId: m.memberId })}>Izbaci</button>
                    </div>
                  </li>
                ))}
            </ul>
          </>
        )}
        <p className="small">Osnivač: {view.owner}</p>
        <div className="row">
          <button className="ghost" onClick={leave}>Izađi iz lige</button>
          {view.isOwner && (
            <button className="danger" onClick={() => confirm(`Obrisati ligu "${view.name}" za sve članove?`) && act({ action: "delete" }, toLeagues)}>
              Obriši ligu
            </button>
          )}
        </div>
      </div>
    </details>
  );
}
