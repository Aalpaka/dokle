"use client";

import { Fragment, createContext, useCallback, useContext, useEffect, useState } from "react";
import { GoogleButton, PageShell, useMe } from "./account";
import { PERIODS, PERIOD_LABEL, REACTIONS, addDays, type Period, type Reaction, type StandingRow } from "@/lib/league";
import type { LeagueSummary, LeagueView, MemberDay, MemberDuel, PastWeek, StandingView } from "@/server/leagues";
import { SKIN_META, isSkinId } from "@/skins/meta";
import { codeConfigs } from "@/skins/maps";
import { Chip } from "./Chip";
import Modal from "./Modal";
import WeekChart from "./WeekChart";
import { useNarrow } from "./Race";
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

/** Izgled članova lige (slika, boja, inicijali) po javnom id-u člana, za kružiće u svim popisima stranice. */
type Look = { faces: Record<number, string>; color: Map<number, string>; tag: Map<number, string> };
const LookCtx = createContext<Look>({ faces: {}, color: new Map(), tag: new Map() });
const lookOf = (view: LeagueView): Look => ({
  faces: view.faces ?? {},
  color: new Map((view.today ?? []).map((m) => [m.memberId, m.color])),
  tag: new Map((view.today ?? []).map((m) => [m.memberId, m.tag])),
});

/** Mali kružić člana uz ime: slika ili inicijali u boji člana. */
function Face({ id }: { id: number }) {
  const l = useContext(LookCtx);
  return <Chip className="face" src={l.faces[id]} color={l.color.get(id)}>{l.tag.get(id)}</Chip>;
}
const Faces = ({ list }: { list: { memberId: number }[] }) => (
  <span className="faces">{list.map((m) => <Face key={m.memberId} id={m.memberId} />)}</span>
);

export function LeaguePage({ code }: { code: string }) {
  const me = useMe();
  const [period, setPeriod] = useState<Period>("week");
  const [view, setView] = useState<LeagueView | null>(null);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(0);
  const [day, setDay] = useState<{ memberId: number; date: string } | null>(null);
  const [rival, setRival] = useState<number | null>(null);
  const [pastWeek, setPastWeek] = useState<string | null>(null);
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
    <LookCtx.Provider value={lookOf(view)}>
    <PageShell me={me}>
      <section className="card league-hero">
        <div className="lh-top">
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
        </div>
        <TodayTrack view={view} />
        {view.week && <TeamKm km={view.week.km} reach={view.week.reach} />}
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
            {period === "week" && view.week && (
              <div className="lg-week">
                <span className="eyebrow">{t("Prosjek km po danu")}</span>
                <WeekChart days={view.week.days} today={view.week.today} compact />
              </div>
            )}
            <Standings
              rows={view.standings!}
              me={view.meMemberId}
              period={period}
              weekFrom={view.weekFrom!}
              onDay={(r) => setDay({ memberId: r.memberId, date: r.bestDate! })}
              onRival={setRival}
            />
          </section>
        </div>

        <div className="side">
          <Awards view={view} />
          <Answers view={view} act={act} />
          <Legends view={view} />
          <Hall view={view} onWeek={setPastWeek} />
          <Settings view={view} act={act} />
        </div>
      </div>
      {day && <DayModal code={view.code} {...day} onClose={() => setDay(null)} />}
      {rival !== null && <DuelModal code={view.code} memberId={rival} me={view.meMemberId} onClose={() => setRival(null)} />}
      {pastWeek && <WeekModal code={view.code} from={pastWeek} me={view.meMemberId} onClose={() => setPastWeek(null)} />}
    </PageShell>
    </LookCtx.Provider>
  );
}

const names = (list: { nickname: string }[], t: T) => {
  const n = list.map((x) => x.nickname);
  return n.length < 2 ? (n[0] ?? "") : `${n.slice(0, -1).join(", ")} ${t("i")} ${n.at(-1)}`;
};
const plural = (n: number, one: string, few: string, many: string) => {
  const d = n % 10, h = n % 100;
  return d === 1 && h !== 11 ? one : d >= 2 && d <= 4 && (h < 12 || h > 14) ? few : many;
};
const fmtKm = (km: number) => km.toLocaleString("hr-HR");
const weekRange = (from: string) => {
  const [, m1, d1] = from.split("-").map(Number);
  const [, m2, d2] = addDays(from, 6).split("-").map(Number);
  return m1 === m2 ? `${d1}.–${d2}. ${m2}.` : `${d1}. ${m1}. – ${d2}. ${m2}.`;
};

const CHIP = 26; // širina kružića u traci (px)

/** Danas: traka od starta do cilja s kružićima članova (boje kao u utrci na karti) i tko je igrao, tko igra, tko nije. */
function TodayTrack({ view }: { view: LeagueView }) {
  const t = useT();
  const { id } = useSkin();
  const cfg = codeConfigs[id];
  const [width, setWidth] = useState(600);
  const [track, setTrack] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!track) return;
    const ro = new ResizeObserver(() => setWidth(track.clientWidth || 600));
    ro.observe(track);
    return () => ro.disconnect();
  }, [track]);
  const today = view.today!;
  const on = today.filter((m) => m.status !== "none");
  const done = today.filter((m) => m.status === "done");
  const waiting = today.filter((m) => m.status === "none");
  const span = Math.max(1, width - CHIP);
  const x = (km: number) => (Math.min(km, cfg.maxKm) / cfg.maxKm) * span;
  // kao u utrci na karti: kružić preblizu prethodnom odmakne se udesno (uz kraj ulijevo), poredak ostaje
  const placed = [...on].reverse().map((m) => ({ m, x: x(m.km) }));
  for (let i = 1; i < placed.length; i++) placed[i].x = Math.max(placed[i].x, placed[i - 1].x + CHIP + 1);
  for (let i = placed.length - 1; i >= 0; i--) placed[i].x = Math.min(placed[i].x, i === placed.length - 1 ? span : placed[i + 1].x - CHIP - 1);
  const towns = cfg.stations.filter((s) => s.alwaysLabel);
  return (
    <div className="lh-today">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <span className="eyebrow">{t("Danas")}</span>
        <span className="small">{t("završilo {n} od {m}", { n: done.length, m: today.length })}</span>
      </div>
      <div className="ttrack" ref={setTrack}>
        <i className="ttrack-road" />
        {towns.map((s, i) => (
          <span
            key={s.name}
            className={"ttrack-town" + (i === 0 ? " first" : i === towns.length - 1 ? " last" : "")}
            style={{ left: `${(100 * s.km) / cfg.maxKm}%` }}
          >
            {s.name}
          </span>
        ))}
        {placed.map(({ m, x }) => {
          const isMe = m.memberId === view.meMemberId;
          return (
            <Chip
              key={m.memberId}
              className={"tchip" + (isMe ? " me" : "") + (m.status === "playing" ? " playing" : "")}
              title={`${m.nickname} · ${m.km} km`}
              color={isMe ? undefined : m.color}
              src={isMe ? null : view.faces?.[m.memberId]}
              style={{ transform: `translateX(${x.toFixed(1)}px)`, zIndex: isMe ? 9 : 1 }}
            >
              {isMe ? t("TI") : m.tag}
            </Chip>
          );
        })}
      </div>
      <ul className="tstatus">
        {on.map((m) => (
          <li key={m.memberId} className={(m.memberId === view.meMemberId ? "me " : "") + m.status}>
            {m.memberId === view.meMemberId ? <i /> : <Face id={m.memberId} />}
            <b>{m.nickname}</b> {m.km} km
            {m.status === "playing" && <small> · {t("igra, {n}/{m}", { n: m.played, m: view.perDay ?? 0 })}</small>}
          </li>
        ))}
        {waiting.length > 0 && (
          <li className="none">{t("Još nisu igrali")}: {waiting.map((m) => m.nickname).join(", ")}</li>
        )}
      </ul>
    </div>
  );
}

/** Zajednički km ekipe ovaj tjedan. */
function TeamKm({ km, reach }: { km: number; reach: string | null }) {
  const t = useT();
  const { id } = useSkin();
  const cfg = codeConfigs[id];
  if (!km) return null;
  const times = km / cfg.maxKm;
  const route = `${cfg.stations[0].name} → ${cfg.stations.at(-1)!.name}`;
  const trips = times >= 1 ? t("{n} puta {r}", { n: times.toLocaleString("hr-HR", { maximumFractionDigits: 1 }), r: route }) : t("{n} % puta {r}", { n: Math.round(100 * times), r: route });
  return (
    <p className="team-km">
      👥 {t("Zajedno ovaj tjedan")}: <b>{fmtKm(km)} km</b>. {t("To je")} {trips}
      {reach ? `, ${t("dalje nego")} ${t(reach)}.` : "."}
    </p>
  );
}

function Move({ move }: { move: number | null }) {
  if (move === null) return null;
  if (move === 0) return <span className="mv eq" aria-label="isto mjesto">=</span>;
  return <span className={"mv " + (move > 0 ? "up" : "dn")}>{move > 0 ? "▲" : "▼"}{Math.abs(move)}</span>;
}

function Standings({
  rows,
  me,
  period,
  weekFrom,
  onDay,
  onRival,
}: {
  rows: StandingView[];
  me: number | null;
  period: Period;
  weekFrom: string;
  onDay: (r: StandingRow) => void;
  onRival: (memberId: number) => void;
}) {
  const full = period !== "day";
  const narrow = useNarrow();
  const [open, setOpen] = useState<number | null>(null);
  const t = useT();
  // pitanja i odgovori najboljeg dana vide se samo za tekući tjedan
  const best = (r: StandingRow) =>
    r.bestDate && r.bestDate >= weekFrom ? (
      <button className="best-btn" onClick={(e) => { e.stopPropagation(); onDay(r); }} title={`${r.nickname}, ${fmtDate(r.bestDate)}`}>{r.bestKm}</button>
    ) : (
      r.bestKm
    );
  const name = (r: StandingView) => (
    <span className="pname">
      <Face id={r.memberId} />
      {r.memberId === me || narrow ? (
        r.nickname
      ) : (
        <button className="name-btn" onClick={() => onRival(r.memberId)} title={t("Dvoboj: {x}", { x: r.nickname })}>{r.nickname}</button>
      )}
      {r.crowns > 0 && <span className="crowns" title={t("osvojenih tjedana")}>👑{r.crowns > 1 ? r.crowns : ""}</span>}
    </span>
  );
  const cols = narrow ? 4 : full ? 9 : 5;
  return (
    <div className="table-scroll">
      <table className={"league" + (narrow ? " narrow" : "")}>
        <thead>
          <tr>
            <th className="rk">#</th>
            <th className="mvc" aria-label={t("pomak od jučer")} />
            <th className="name">{t("Igrač")}</th>
            <th>km</th>
            {!narrow && full && <th title={t("odigranih dana")}>{t("dana")}</th>}
            {!narrow && full && <th title={t("prosjek km po danu")}>{t("prosjek")}</th>}
            {!narrow && full && <th title={t("najviše km u jednom danu; klikni za taj dan")}>{t("najbolje")}</th>}
            {!narrow && full && <th title={t("dani na kojima je stigao najdalje u ligi")}>🏆</th>}
            {!narrow && <th title={t("trenutni streak")}>🔥</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const isOpen = narrow && open === r.memberId;
            return (
              <Fragment key={r.memberId}>
                <tr
                  className={(r.memberId === me ? "me " : "") + (r.rank <= 3 && r.km > 0 ? "top " : "") + (narrow ? "tap" : "")}
                  onClick={narrow ? () => setOpen(isOpen ? null : r.memberId) : undefined}
                  aria-expanded={narrow ? isOpen : undefined}
                >
                  <td className="rk">{r.km > 0 ? medal(r.rank) : `${r.rank}.`}</td>
                  <td className="mvc">{full && <Move move={r.move} />}</td>
                  <td className="name">{name(r)}</td>
                  <td><b>{r.km}</b>{narrow && <span className="caret" aria-hidden>{isOpen ? "▴" : "▾"}</span>}</td>
                  {!narrow && full && <td>{r.played}</td>}
                  {!narrow && full && <td>{r.avgKm}</td>}
                  {!narrow && full && <td>{best(r)}</td>}
                  {!narrow && full && <td>{r.wins}</td>}
                  {!narrow && <td>{r.streak}</td>}
                </tr>
                {isOpen && (
                  <tr className={"details" + (r.memberId === me ? " me" : "")}>
                    <td colSpan={cols}>
                      <div className="row-details">
                        {full && <span>{t("dana")} <b>{r.played}</b></span>}
                        {full && <span>{t("prosjek")} <b>{r.avgKm}</b></span>}
                        {full && <span>{t("najbolje")} <b>{best(r)}</b></span>}
                        {full && <span>🏆 <b>{r.wins}</b></span>}
                        <span>🔥 <b>{r.streak}</b></span>
                        {r.memberId !== me && (
                          <button className="small-btn ghost" onClick={(e) => { e.stopPropagation(); onRival(r.memberId); }}>⚔️ {t("Dvoboj")}</button>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
      {narrow ? (
        <p className="small legend">{t("Dodirni igrača za detalje i dvoboj.")}</p>
      ) : (
        full && <p className="small legend">{t("▲▼ = pomak od jučer · klik na igrača = dvoboj · najbolje = klikni za pitanja i odgovore (samo ovaj tjedan) · 🏆 = dani kad je stigao najdalje u ligi · 👑 = osvojeni tjedni · 🔥 = streak")}</p>
      )}
    </div>
  );
}

/** Nagrade dana: vide ih oni koji su odigrali, kad su završila barem dvojica. */
function Awards({ view }: { view: LeagueView }) {
  const t = useT();
  const { id } = useSkin();
  if (!view.answers) return null;
  const a = view.awards;
  if (!a)
    return (
      <section className="card stack">
        <span className="eyebrow">{t("Nagrade dana")}</span>
        <p className="small">{t("Nagrade dana stižu kad danas odigra još netko iz lige.")}</p>
      </section>
    );
  const pct = (s: number) => (s < 1 ? s.toLocaleString("hr-HR", { maximumFractionDigits: 1 }) : Math.round(s).toString());
  return (
    <section className="card stack">
      <span className="eyebrow">{t("Nagrade dana")}</span>
      <ul className="awards">
        {a.rare && (
          <li>
            <span className="ic">{a.rare.heli ? "🚁" : "🦄"}</span>
            <span><span className="aw-t">{t("Zokijeva desna ruka")}</span><Face id={a.rare.memberId} /><b>{a.rare.nickname}</b>: „{a.rare.answer}”<small> · {a.rare.title}{a.rare.heli ? ` · ${t("helikopter")}` : a.rare.share !== null ? ` · ${pct(a.rare.share)} % ${t("igrača")}` : ""}</small></span>
          </li>
        )}
        {a.same.map((s) => (
          <li key={s.position}>
            <span className="ic">🤝</span>
            <span><span className="aw-t">{t("Ista misao")}</span><Faces list={s.members} /><b>{names(s.members, t)}</b>: „{s.answer}”<small> · {s.title}</small></span>
          </li>
        ))}
        {a.fastest && (
          <li>
            <span className="ic">⚡</span>
            <span><span className="aw-t">{t("Najbrži prst")}</span><Face id={a.fastest.memberId} /><b>{a.fastest.nickname}</b>: „{a.fastest.answer}” {t("za")} {(a.fastest.ms / 1000).toLocaleString("hr-HR", { maximumFractionDigits: 1 })} s<small> · {a.fastest.title}</small></span>
          </li>
        )}
        {a.liked && (
          <li>
            <span className="ic">😂</span>
            <span><span className="aw-t">{t("Odgovor dana")}</span><Face id={a.liked.memberId} /><b>{a.liked.nickname}</b>: „{a.liked.answer}”<small> · {a.liked.reactions} {t(plural(a.liked.reactions, "reakcija", "reakcije", "reakcija"))}</small></span>
          </li>
        )}
        {a.roadworks && (
          <li>
            <span className="ic">🚧</span>
            <span><span className="aw-t">{codeConfigs[id].miss.name}</span><Faces list={a.roadworks.members} /><b>{names(a.roadworks.members, t)}</b><small> · {a.roadworks.misses} {t(plural(a.roadworks.misses, "promašaj", "promašaja", "promašaja"))}</small></span>
          </li>
        )}
      </ul>
    </section>
  );
}

// "Legenda Kviza": grupa u genitivu
const GROUP_GEN: Record<string, string> = { hr: "Hrvatske", ba: "BiH", rs: "Srbije", opce: "općeg znanja", zaigrano: "Zaigranog", kviz: "Kviza" };
const legendTitle = (group: string, t: T) => t("Legenda {g}", { g: t(GROUP_GEN[group] ?? group) });

/** Legende lige: najbolji prosjek po grupi pitanja u zadnjih 30 dana. */
function Legends({ view }: { view: LeagueView }) {
  const t = useT();
  if (!view.legends?.length) return null;
  return (
    <section className="card stack">
      <span className="eyebrow">{t("Legende lige")}</span>
      <ul className="legends">
        {view.legends.map((l) => (
          <li key={l.group} className={l.memberId === view.meMemberId ? "me" : ""}>
            <span>🎓 {legendTitle(l.group, t)}</span>
            <span className="pname"><Face id={l.memberId} /><b>{l.nickname}</b></span>
            <span className="km">{l.avg} km</span>
          </li>
        ))}
      </ul>
      <p className="small">{t("Najviše km po pitanju u toj grupi u zadnjih 30 dana.")}</p>
    </section>
  );
}

/** Dvorana slavnih: pobjednici završenih tjedana; klik otvara tablicu tog tjedna (bez pitanja i odgovora). */
function Hall({ view, onWeek }: { view: LeagueView; onWeek: (from: string) => void }) {
  const t = useT();
  const hall = view.hall ?? [];
  const crownsOf = view.standings!.filter((r) => r.crowns > 0).sort((a, b) => b.crowns - a.crowns || a.nickname.localeCompare(b.nickname, "hr"));
  return (
    <section className="card stack">
      <span className="eyebrow">{t("Dvorana slavnih")}</span>
      {hall.length === 0 ? (
        <p className="small">{t("Prvi pobjednik tjedna upisuje se u ponedjeljak.")}</p>
      ) : (
        <>
          <div className="crown-list">
            {crownsOf.map((r) => (
              <span key={r.memberId} className={r.memberId === view.meMemberId ? "me" : ""}><Face id={r.memberId} /> {r.nickname} 👑×{r.crowns}</span>
            ))}
          </div>
          <ul className="hall">
            {hall.map((w) => (
              <li key={w.from}>
                <button onClick={() => onWeek(w.from)}>
                  <span className="hw-date">{t("tjedan")} {weekRange(w.from)}</span>
                  <span className="hw-win">👑 <Faces list={w.winners} /> {names(w.winners, t)}</span>
                  <span className="hw-km">{w.winners[0].km} km</span>
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

function WeekModal({ code, from, me, onClose }: { code: string; from: string; me: number | null; onClose: () => void }) {
  const [data, setData] = useState<PastWeek | null>(null);
  const [error, setError] = useState("");
  const t = useT();
  useEffect(() => {
    skinFetch(`/api/lige/${code}/tjedan?od=${from}`, { cache: "no-store" })
      .then(async (r) => {
        const b = await r.json();
        if (!r.ok) throw new Error(b.error);
        setData(b);
      })
      .catch((e) => setError(t(e.message)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, from]);
  return (
    <Modal title={`${t("Tjedan")} ${weekRange(from)}`} onClose={onClose}>
      {error ? (
        <p>{error}</p>
      ) : !data ? (
        <p className="loading">{t("Učitavam…")}</p>
      ) : (
        <>
          <WeekChart days={data.days} today={addDays(from, 6)} compact />
          <div className="table-scroll">
            <table className="league">
              <thead>
                <tr>
                  <th className="rk">#</th>
                  <th className="name">{t("Igrač")}</th>
                  <th>km</th>
                  <th className="opt">{t("dana")}</th>
                  <th className="opt">{t("prosjek")}</th>
                  <th>{t("najbolje")}</th>
                  <th>🏆</th>
                </tr>
              </thead>
              <tbody>
                {data.standings.map((r) => (
                  <tr key={r.memberId} className={(r.memberId === me ? "me " : "") + (r.rank <= 3 && r.km > 0 ? "top" : "")}>
                    <td className="rk">{r.km > 0 ? medal(r.rank) : `${r.rank}.`}</td>
                    <td className="name"><span className="pname"><Face id={r.memberId} />{r.nickname}</span></td>
                    <td><b>{r.km}</b></td>
                    <td className="opt">{r.played}</td>
                    <td className="opt">{r.avgKm}</td>
                    <td>{r.bestKm}</td>
                    <td>{r.wins}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="small">{t("Pitanja i odgovori prošlih tjedana se ne prikazuju.")}</p>
        </>
      )}
    </Modal>
  );
}

function DuelModal({ code, memberId, me, onClose }: { code: string; memberId: number; me: number | null; onClose: () => void }) {
  const [data, setData] = useState<MemberDuel | null>(null);
  const [error, setError] = useState("");
  const t = useT();
  const { id } = useSkin();
  const groups = codeConfigs[id].groups;
  useEffect(() => {
    skinFetch(`/api/lige/${code}/dvoboj?clan=${memberId}`, { cache: "no-store" })
      .then(async (r) => {
        const b = await r.json();
        if (!r.ok) throw new Error(b.error);
        setData(b);
      })
      .catch((e) => setError(t(e.message)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, memberId]);
  return (
    <Modal title={data ? t("Dvoboj: {x}", { x: data.them }) : t("Dvoboj")} onClose={onClose} className="narrow">
      {error ? (
        <p>{error}</p>
      ) : !data ? (
        <p className="loading">{t("Učitavam…")}</p>
      ) : data.days === 0 ? (
        <p>{t("Još niste igrali isti dan. Kad oboje odigrate, ovdje vidite tko je stigao dalje.")}</p>
      ) : (
        <div className="duel">
          <div className="duel-top">
            <span className="who me">{me !== null && <Face id={me} />}{t("Ti")}</span>
            <span className="score">{data.wins} : {data.losses}</span>
            <span className="who"><Face id={memberId} />{data.them}</span>
          </div>
          <p className="small duel-sub">
            {data.days} {t(plural(data.days, "zajednički dan", "zajednička dana", "zajedničkih dana"))}
            {data.ties > 0 && ` · ${data.ties} ${t("neriješeno")}`}
          </p>
          <div className="duel-last" aria-label={t("zadnji zajednički dani")}>
            {data.last.map((r, i) => (
              <i key={i} className={r} title={r === "w" ? t("ti") : r === "l" ? data.them : t("neriješeno")} />
            ))}
          </div>
          <p className="duel-key">{t("zadnji zajednički dani")}: <b>■ {t("ti")}</b> · <i>■ {data.them}</i></p>
          <span className="eyebrow">{t("Prosjek km po pitanju")}</span>
          {data.groups.map((g) => {
            const a = g.me ?? 0, b = g.them ?? 0;
            const share = a + b ? (100 * a) / (a + b) : 50;
            return (
              <div key={g.group} className="duel-row">
                <span className="lbl">{t(groups[g.group] ?? g.group)}</span>
                <span className="v me">{g.me ?? "–"}</span>
                <span className="bar"><span className="a" style={{ width: `${share}%` }} /><span className="b" style={{ width: `${100 - share}%` }} /></span>
                <span className="v">{g.them ?? "–"}</span>
              </div>
            );
          })}
          <ul className="duel-facts">
            {data.bestWin && <li>💪 {t("Tvoja najveća pobjeda")}: <b>+{data.bestWin.margin} km</b>, {fmtDate(data.bestWin.date)}</li>}
            {data.worstLoss && <li>😬 {t("Najveći poraz")}: <b>−{data.worstLoss.margin} km</b>, {fmtDate(data.worstLoss.date)}</li>}
            {data.legends.map((l) => (
              <li key={l.group}>🎓 {l.nickname === data.them ? data.them : t("Ti")}: {legendTitle(l.group, t)}</li>
            ))}
          </ul>
        </div>
      )}
    </Modal>
  );
}

/**
 * Današnji odgovori ekipe, pitanje po pitanje: strelice ili povlačenje prstom, na svakom odgovoru reakcije.
 * Vide se tek kad igrač odigra svoju partiju.
 */
function Answers({ view, act }: { view: LeagueView; act: (b: Record<string, unknown>, after?: () => void) => void }) {
  const t = useT();
  const { href } = useSkin();
  const [idx, setIdx] = useState(0);
  const [picking, setPicking] = useState<number | null>(null);
  const [touch, setTouch] = useState<number | null>(null);
  if (!view.answers)
    return (
      <section className="card stack">
        <span className="eyebrow">{t("Odgovori ekipe")}</span>
        <p className="small">{t("Odigraj današnju partiju pa ćeš ovdje vidjeti što su ostali odgovorili.")} <a href={href("/")}>{t("Igraj")}</a></p>
      </section>
    );
  const cats = view.answers;
  const i = Math.min(idx, cats.length - 1);
  const c = cats[i];
  const go = (d: number) => {
    setPicking(null);
    setIdx((i + d + cats.length) % cats.length);
  };
  const react = (memberId: number, emoji: Reaction | null) => {
    setPicking(null);
    act({ action: "react", memberId, position: c.position, emoji });
  };
  const reacted = (k: number) => cats[k].answers.some((a) => Object.keys(a.reactions).length > 0);
  return (
    <section
      className="card stack team-answers"
      onTouchStart={(e) => setTouch(e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touch === null) return;
        const dx = e.changedTouches[0].clientX - touch;
        setTouch(null);
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
      }}
    >
      <span className="eyebrow">{t("Odgovori ekipe")}</span>
      <div className="qnav">
        <button className="ghost" onClick={() => go(-1)} aria-label={t("Prethodno pitanje")}>‹</button>
        <span className="qt">
          <b>{c.title}</b>
          <span>{i + 1} / {cats.length}</span>
        </span>
        <button className="ghost" onClick={() => go(1)} aria-label={t("Iduće pitanje")}>›</button>
      </div>
      <div className="qdots">
        {cats.map((_, k) => (
          <button key={k} className={(k === i ? "on " : "") + (reacted(k) ? "r" : "")} onClick={() => { setPicking(null); setIdx(k); }} aria-label={`${k + 1}`} />
        ))}
      </div>
      <ul className="ta-list">
        {c.answers.map((a) => {
          const own = a.memberId === view.meMemberId;
          const counts = REACTIONS.filter((e) => a.reactions[e]);
          return (
            <li key={a.memberId} className={own ? "me" : ""}>
              <span className="who" title={a.nickname}>
                {own ? <i /> : <Face id={a.memberId} />}
                {own ? t("Ti") : a.nickname}
              </span>
              <span className="ans">
                {a.answer ?? "—"}
                {a.tag === "rare" && <span className="tag rare">{t("Zokijeva desna ruka")}</span>}
                {a.tag === "same" && <span className="tag same">{t("ista misao")}</span>}
              </span>
              <span className="km" title={`${a.km} km`}>{a.emoji} {a.km}</span>
              <span className={"reacts" + (picking === a.memberId ? " picking" : "")}>
                {counts.map((e) => (
                  <button
                    key={e}
                    className={"rpill" + (a.mine === e ? " mine" : "")}
                    disabled={own}
                    onClick={() => react(a.memberId, a.mine === e ? null : e)}
                    aria-label={`${e} ${a.reactions[e]}`}
                  >
                    {e} {a.reactions[e]}
                  </button>
                ))}
                {!own &&
                  (picking === a.memberId ? (
                    <span className="rpick">
                      {REACTIONS.map((e) => (
                        <button key={e} className={a.mine === e ? "mine" : ""} onClick={() => react(a.memberId, a.mine === e ? null : e)} aria-label={e}>{e}</button>
                      ))}
                    </span>
                  ) : (
                    <button className="rpill add" onClick={() => setPicking(a.memberId)} aria-label={t("Reagiraj")}>＋</button>
                  ))}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
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
            {codeConfigs[id].title} #{data.number} · {fmtDate(data.date)} · 📍 <b className="ink">{data.station}</b>
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
                          <span className="a pname"><Face id={m.memberId} />{m.nickname}</span>
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
