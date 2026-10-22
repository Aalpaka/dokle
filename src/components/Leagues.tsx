"use client";

import { useCallback, useEffect, useState } from "react";
import { GoogleButton, PageShell, useMe } from "./account";
import { PERIODS, PERIOD_LABEL, type Period, type StandingRow } from "@/lib/league";
import type { LeagueSummary, LeagueView, MemberDay } from "@/server/leagues";
import { SKIN_META, isSkinId } from "@/skins/meta";
import { codeConfigs } from "@/skins/maps";
import Modal from "./Modal";
import { skinFetch, useSkin, useT, type T } from "./skin";

async function post<T>(url: string, body: unknown): Promise<T> {
  const r = await skinFetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
  const out = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(out.error ?? "Greška");
  return out as T;
}

function useMyLeagues() {
  const [list, setList] = useState<LeagueSummary[] | null>(null);
  useEffect(() => {
    skinFetch("/api/lige", { cache: "no-store" })
      .then((r) => r.json())
      .then((b) => setList(b.leagues), () => setList([]));
  }, []);
  return list;
}

const members = (n: number, t: T) => {
  const d = n % 10, h = n % 100;
  return `${n} ${t(d === 1 && h !== 11 ? "član" : d >= 2 && d <= 4 && (h < 12 || h > 14) ? "člana" : "članova")}`;
};
const medal = (rank: number) => ["🥇", "🥈", "🥉"][rank - 1] ?? `${rank}.`;
const fmtDate = (d: string) => {
  const [y, m, day] = d.split("-");
  return `${+day}. ${+m}. ${y}.`;
};

function NewLeagueForm() {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const t = useT();
  const { href } = useSkin();
  const create = async () => {
    try {
      const { code } = await post<{ code: string }>("/api/lige", { name });
      window.location.href = href(`/liga/${code}`);
    } catch (e) {
      setMsg(t((e as Error).message));
    }
  };
  return (
    <>
      <form className="nick" onSubmit={(e) => { e.preventDefault(); create(); }}>
        <input value={name} maxLength={40} placeholder={t("npr. Ekipa iz ureda")} onChange={(e) => setName(e.target.value)} aria-label={t("Ime nove lige")} />
        <button type="submit">{t("Napravi")}</button>
      </form>
      {msg && <p className="small">{msg}</p>}
    </>
  );
}

// ---------- /lige ----------

export function LeaguesPage() {
  const me = useMe();
  const list = useMyLeagues();
  const t = useT();
  const { href } = useSkin();
  if (!me) return <PageShell me={me}><section className="card"><p className="loading">{t("Učitavam…")}</p></section></PageShell>;
  if (!me.user)
    return (
      <PageShell me={me}>
        <section className="card stack league-hero">
          <span className="eyebrow">{t("Lige")}</span>
          <h1>{t("Tko iz ekipe stigne najdalje?")}</h1>
          <p>{t("Napravi ligu, pošalji link prijateljima i svaki dan usporedite koliko ste kilometara prešli. Za lige se treba prijaviti.")}</p>
          {me.authEnabled ? <div className="row"><GoogleButton /></div> : <p className="small">{t("Prijava trenutno nije uključena.")}</p>}
        </section>
      </PageShell>
    );
  return (
    <PageShell me={me}>
      <div className="page-grid">
        <section className="card stack">
          <span className="eyebrow">{t("Tvoje lige")}</span>
          {!list ? (
            <p className="loading">{t("Učitavam…")}</p>
          ) : list.length ? (
            <ul className="league-cards">
              {list.map((l) => (
                <li key={l.code}>
                  <a href={href(`/liga/${l.code}`)}>
                    <span className="rank-big">{l.rank ? medal(l.rank) : "–"}</span>
                    <span className="lc-body">
                      <b>{l.name}</b>
                      <span className="small">
                        {members(l.members, t)}
                        {l.isOwner && ` · ${t("osnivač")}`}
                        {l.leader && ` · ${t("vodi {x}", { x: l.leader.nickname })} (${l.leader.km} km)`}
                      </span>
                    </span>
                    <span className="lc-km">{l.myKm}<small> km</small></span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>{t("Još nisi ni u jednoj ligi. Napravi svoju i pošalji link ekipi, ili otvori link koji ti je netko poslao.")}</p>
          )}
          {!!list?.length && <p className="small">{t("Mjesto i km za tekući tjedan (od ponedjeljka).")}</p>}
        </section>
        <div className="side">
          <section className="card stack">
            <span className="eyebrow">{t("Nova liga")}</span>
            <NewLeagueForm />
          </section>
          <section className="card stack">
            <span className="eyebrow">{t("Kako rade lige")}</span>
            <ul className="rules">
              <li><span className="k">🔗</span><span>{t("pošalji link lige, tko ga otvori i prijavi se, ulazi u ligu")}</span></li>
              <li><span className="k">🛣️</span><span>{t("igraš običnu dnevnu partiju, km se zbrajaju u tablici lige")}</span></li>
              <li><span className="k">📅</span><span>{t("tablica za danas, tjedan, mjesec i ukupno")}</span></li>
              <li><span className="k">👀</span><span>{t("kad odigraš, vidiš što su ostali danas odgovorili")}</span></li>
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
  const t = useT();
  const { href } = useSkin();
  return (
    <div className="stack">
      {!list ? (
        <p className="small">{t("Učitavam…")}</p>
      ) : list.length ? (
        <ul className="recap leagues">
          {list.map((l) => (
            <li key={l.code}>
              <a href={href(`/liga/${l.code}`)}>
                <span className="w"><span className="a">{l.name}</span><span className="c">{members(l.members, t)}{l.isOwner && ` · ${t("osnivač")}`}</span></span>
                <span className="k">{l.rank ? `${l.rank}. ${t("mjesto")}` : ""}</span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="small">{t("Još nisi ni u jednoj ligi.")}</p>
      )}
      <NewLeagueForm />
    </div>
  );
}

/** Okvir na kraju partije: mjesto u svakoj ligi ovaj tjedan ili poziv da napravi ligu. */
export function LeaguesBox() {
  const list = useMyLeagues();
  const t = useT();
  const { href } = useSkin();
  if (!list) return null;
  return (
    <div className="savebox">
      <b>🏆 {t("Lige")}</b>
      {list.length ? (
        <ul className="recap leagues">
          {list.map((l) => (
            <li key={l.code}>
              <a href={href(`/liga/${l.code}`)}>
                <span className="a">{l.name}</span>
                <span className="k">{l.rank ? `${l.rank}. ${t("ovaj tjedan")}` : ""}</span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <span className="small">{t("Napravi ligu s ekipom i pratite tko svaki dan stigne najdalje.")}</span>
      )}
      <a className="small" href={href("/lige")}>{list.length ? t("Sve lige i nova liga") : t("Napravi ligu")} →</a>
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
  const [day, setDay] = useState<{ memberId: number; date: string } | null>(null);
  const t = useT();
  const { id: skinId, href } = useSkin();

  useEffect(() => {
    skinFetch(`/api/lige/${code}?period=${period}`, { cache: "no-store" })
      .then(async (r) => {
        const b = (await r.json()) as LeagueView & { skinId?: string; error?: string };
        if (!r.ok) throw new Error(b.error);
        // liga pripada jednoj zemlji; link otvoren u drugoj vodi na pravu adresu
        if (isSkinId(b.skinId) && b.skinId !== skinId) {
          window.location.replace(`${SKIN_META[b.skinId].base}/liga/${code}`);
          return;
        }
        setView(b);
      })
      .catch((e) => setError(t(e.message)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, period, reload]);

  const act = useCallback(
    async (body: Record<string, unknown>, after?: () => void) => {
      try {
        await post(`/api/lige/${code}`, body);
        if (after) after();
        else setReload((x) => x + 1);
      } catch (e) {
        alert(t((e as Error).message));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [code],
  );

  if (error)
    return (
      <PageShell me={me}>
        <section className="card stack"><p>{error}</p><p className="small"><a href={href("/lige")}>{t("Tvoje lige")}</a></p></section>
      </PageShell>
    );
  if (!view || !me) return <PageShell me={me}><section className="card"><p className="loading">{t("Učitavam…")}</p></section></PageShell>;

  if (!view.isMember)
    return (
      <PageShell me={me}>
        <section className="card stack league-hero">
          <span className="eyebrow">{t("Poziv u ligu")}</span>
          <h1>{view.name}</h1>
          <p>
            {view.owner ? t("{x} te zove", { x: view.owner }) : t("Zovu te")} {t("u ligu")} ({members(view.members, t)}).{" "}
            {t("Svaki dan igraš običnu partiju, a km se zbrajaju u tablici lige.")}
          </p>
          {me.user ? (
            <div className="row"><button onClick={() => act({ action: "join" })}>{t("Uđi u ligu")}</button></div>
          ) : me.authEnabled ? (
            <>
              <p className="small">{t("Za lige se treba prijaviti, nakon prijave vraćaš se ovdje.")}</p>
              <div className="row"><GoogleButton /></div>
            </>
          ) : (
            <p className="small">{t("Prijava trenutno nije uključena.")}</p>
          )}
        </section>
      </PageShell>
    );

  const mine = view.standings!.find((r) => r.memberId === view.meMemberId);
  return (
    <PageShell me={me}>
      <section className="card league-hero">
        <div className="lh-main">
          <span className="eyebrow">{t("Liga")}</span>
          <h1>{view.name}</h1>
          <p className="small">{members(view.members, t)} · {t("osnivač")} {view.owner} · {t("od")} {fmtDate(view.createdAt.slice(0, 10))}</p>
          <Invite code={view.code} name={view.name} />
        </div>
        {mine && (
          <div className="lh-me">
            <span className="rank-big">{medal(mine.rank)}</span>
            <span className="small">{t(PERIOD_LABEL[period]).toLowerCase()} · {mine.km} km</span>
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
                    {t(PERIOD_LABEL[p])}
                  </button>
                ))}
              </nav>
              <span className="small">{period === "day" ? fmtDate(view.from!) : `${t("od")} ${fmtDate(view.from!)}`}</span>
            </div>
            <Standings rows={view.standings!} me={view.meMemberId} period={period} onDay={(r) => setDay({ memberId: r.memberId, date: r.bestDate! })} />
          </section>
          <section className="card stack">
            <span className="eyebrow">{t("Danas")}</span>
            <Today view={view} />
          </section>
        </div>

        <div className="side">
          <Answers view={view} />
          <Settings view={view} act={act} />
        </div>
      </div>
      {day && <DayModal code={view.code} {...day} onClose={() => setDay(null)} />}
    </PageShell>
  );
}

/** Jedan dan jednog člana: pitanja, odgovori i km po kategoriji. */
function DayModal({ code, memberId, date, onClose }: { code: string; memberId: number; date: string; onClose: () => void }) {
  const [data, setData] = useState<MemberDay | null>(null);
  const [error, setError] = useState("");
  const t = useT();
  const { id } = useSkin();
  useEffect(() => {
    skinFetch(`/api/lige/${code}/dan?clan=${memberId}&datum=${date}`, { cache: "no-store" })
      .then(async (r) => {
        const b = await r.json();
        if (!r.ok) throw new Error(b.error);
        setData(b);
      })
      .catch((e) => setError(t(e.message)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, memberId, date]);
  return (
    <Modal title={data ? `${data.nickname} · ${data.km} km` : t("Najbolji dan")} onClose={onClose} className="narrow">
      {error ? (
        <p>{error}</p>
      ) : !data ? (
        <p className="loading">{t("Učitavam…")}</p>
      ) : (
        <>
          <p className="small">
            {codeConfigs[id].title} #{data.number} · {fmtDate(data.date)} · {t("stigao do")} <b className="ink">{data.station}</b>
          </p>
          <ul className="day-rounds">
            {data.rounds.map((r, i) => (
              <li key={i}>
                <span className="em">{r.emoji}</span>
                <span className="q">
                  <span className="c">{r.title}</span>
                  <b>{r.answer ?? "—"}</b>
                </span>
                <span className="km">+{r.km}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </Modal>
  );
}

function Invite({ code, name }: { code: string; name: string }) {
  const [msg, setMsg] = useState("");
  const t = useT();
  const { id, href } = useSkin();
  const share = () => {
    const url = window.location.origin + href(`/liga/${code}`);
    const text = t("Uđi u moju ligu \"{x}\" na {igra}", { x: name, igra: codeConfigs[id].title });
    const copy = () => navigator.clipboard.writeText(url).then(() => setMsg(t("Link kopiran.")), () => setMsg(url));
    if (navigator.share && matchMedia("(pointer: coarse)").matches) navigator.share({ text, url }).catch((e) => { if (e?.name !== "AbortError") copy(); });
    else copy();
  };
  return (
    <div className="row">
      <button className="small-btn" onClick={share}>{t("Pozovi ekipu")}</button>
      <span className="small">{t("kod")} <b className="mono">{code}</b>{msg && ` · ${msg}`}</span>
    </div>
  );
}

function Standings({ rows, me, period, onDay }: { rows: StandingRow[]; me: number | null; period: Period; onDay: (r: StandingRow) => void }) {
  const full = period !== "day";
  const t = useT();
  return (
    <div className="table-scroll">
      <table className="league">
        <thead>
          <tr>
            <th className="rk">#</th>
            <th className="name">{t("Igrač")}</th>
            <th>km</th>
            {full && <th className="opt" title={t("odigranih dana")}>{t("dana")}</th>}
            {full && <th className="opt" title={t("prosjek km po danu")}>{t("prosjek")}</th>}
            {full && <th title={t("najviše km u jednom danu; klikni za taj dan")}>{t("najbolje")}</th>}
            {full && <th title={t("dani na kojima je stigao najdalje u ligi")}>🏆</th>}
            <th title={t("trenutni streak")}>🔥</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.memberId} className={(r.memberId === me ? "me " : "") + (r.rank <= 3 && r.km > 0 ? "top" : "")}>
              <td className="rk">{r.km > 0 ? medal(r.rank) : `${r.rank}.`}</td>
              <td className="name">{r.nickname}</td>
              <td><b>{r.km}</b></td>
              {full && <td className="opt">{r.played}</td>}
              {full && <td className="opt">{r.avgKm}</td>}
              {full && (
                <td>
                  {r.bestDate ? (
                    <button className="best-btn" onClick={() => onDay(r)} title={`${r.nickname}, ${fmtDate(r.bestDate)}`}>{r.bestKm}</button>
                  ) : (
                    r.bestKm
                  )}
                </td>
              )}
              {full && <td>{r.wins}</td>}
              <td>{r.streak}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {full && <p className="small legend">{t("dana = odigrani dani · najbolje = klikni za pitanja i odgovore tog dana · 🏆 = dani kad je stigao najdalje u ligi · 🔥 = streak")}</p>}
    </div>
  );
}

function Today({ view }: { view: LeagueView }) {
  const today = view.today!;
  const best = Math.max(1, ...today.map((x) => x.km));
  const tr = useT();
  const label = { done: "", playing: tr("igra…"), none: tr("još nije igrao") } as const;
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
  const t = useT();
  const { href } = useSkin();
  if (!view.answers)
    return (
      <section className="card stack">
        <span className="eyebrow">{t("Današnji odgovori")}</span>
        <p className="small">{t("Odigraj današnju partiju pa ćeš ovdje vidjeti što su ostali odgovorili.")} <a href={href("/")}>{t("Igraj")}</a></p>
      </section>
    );
  return (
    <section className="card stack">
      <details className="answers">
        <summary>{t("Današnji odgovori ekipe")}</summary>
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
  const t = useT();
  const { href } = useSkin();
  const toLeagues = () => (window.location.href = href("/lige"));
  const leave = () => {
    const extra = view.isOwner ? " " + (view.members > 1 ? t("Liga prelazi na najstarijeg člana.") : t("Liga će se obrisati jer si jedini član.")) : "";
    if (confirm(t("Izaći iz lige \"{x}\"?", { x: view.name }) + extra)) act({ action: "leave" }, toLeagues);
  };
  const others = view.today!.filter((m) => m.memberId !== view.meMemberId);
  return (
    <section className="card">
      <details className="answers">
        <summary>{t("Postavke lige")}</summary>
        <div className="stack">
          {view.isOwner && (
            <>
              <form className="nick" onSubmit={(e) => { e.preventDefault(); act({ action: "rename", name }); }}>
                <input value={name} maxLength={40} onChange={(e) => setName(e.target.value)} aria-label={t("Ime lige")} />
                <button type="submit">{t("Preimenuj")}</button>
              </form>
              {others.length > 0 && (
                <>
                  <span className="small">{t("Izbaci člana:")}</span>
                  <ul className="recap leagues">
                    {others.map((m) => (
                      <li key={m.memberId}>
                        <div>
                          <span className="a">{m.nickname}</span>
                          <button className="danger small-btn" onClick={() => confirm(t("Izbaciti {x}?", { x: m.nickname })) && act({ action: "kick", memberId: m.memberId })}>
                            {t("Izbaci")}
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
            <button className="ghost small-btn" onClick={leave}>{t("Izađi iz lige")}</button>
            {view.isOwner && (
              <button className="danger small-btn" onClick={() => confirm(t("Obrisati ligu \"{x}\" za sve članove?", { x: view.name })) && act({ action: "delete" }, toLeagues)}>
                {t("Obriši ligu")}
              </button>
            )}
          </div>
        </div>
      </details>
    </section>
  );
}
