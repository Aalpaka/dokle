"use client";

import { useState } from "react";
import { GoogleButton, PageShell, signOut, useMe } from "./account";
import { MyLeagues } from "./Leagues";
import { skinFetch, useSkin, useT } from "./skin";

export default function Profile() {
  const [reload, setReload] = useState(0);
  const me = useMe(reload);
  const t = useT();

  return (
    <PageShell me={me}>
      {!me ? (
        <section className="card"><p className="loading">{t("Učitavam…")}</p></section>
      ) : !me.user ? (
        <section className="card stack">
          <h1>{t("Tvoj profil")}</h1>
          <p>{t("Prijavi se s Googleom da spremiš partije, pratiš streak i vidiš povijest na svakom uređaju.")}</p>
          {me.authEnabled ? <div className="row"><GoogleButton /></div> : <p className="small">{t("Prijava trenutno nije uključena.")}</p>}
        </section>
      ) : (
        <LoggedIn me={me} onChange={() => setReload((x) => x + 1)} />
      )}
    </PageShell>
  );
}

function LoggedIn({ me, onChange }: { me: NonNullable<ReturnType<typeof useMe>>; onChange: () => void }) {
  const s = me.stats!;
  const [nick, setNick] = useState(me.user!.nickname ?? "");
  const [msg, setMsg] = useState("");
  const t = useT();
  const { href, name } = useSkin();

  const saveNick = async () => {
    const r = await skinFetch("/api/me", { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({ nickname: nick }) });
    const body = await r.json();
    setMsg(r.ok ? t("Spremljeno.") : t(body.error));
    if (r.ok) onChange();
  };
  const del = async () => {
    if (!confirm(t("Obrisati račun? Partije ostaju u statistici igre, ali više neće biti povezane s tobom."))) return;
    await skinFetch("/api/me", { method: "DELETE" });
    window.location.href = href("/");
  };

  return (
    <div className="page-grid profile">
      <section className="card stack head">
        <span className="eyebrow">{t("Profil")}</span>
        <h1>{me.user!.nickname}</h1>
        <div className="stats">
          <Stat value={s.currentStreak} label={t("trenutni streak")} />
          <Stat value={s.longestStreak} label={t("najdulji streak")} />
          <Stat value={s.played} label={t("odigranih dana")} />
          <Stat value={s.avgKm} label={t("prosjek km")} />
          <Stat value={s.bestKm} label={t("najdalje km")} />
        </div>
      </section>

      <section className="card stack hist">
        <span className="eyebrow">{t("Povijest")} · {name}</span>
        {me.history.length ? (
          <ul className="recap history">
            {me.history.map((h) => {
              const [y, m, d] = h.date.split("-");
              return (
                <li key={h.date}>
                  <span className="n">#{h.number}</span>
                  <span className="w"><span className="a">{h.station}</span><span className="c">{+d}. {+m}. {y}.</span></span>
                  <span className="k">{h.km} km</span>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="small">{t("Još nema završenih partija.")} <a href={href("/")}>{t("Odigraj današnju.")}</a></p>
        )}
      </section>

      <div className="side">
        <section className="card stack lg">
          <span className="eyebrow">{t("Lige")}</span>
          <MyLeagues />
        </section>

        <section className="card stack">
          <span className="eyebrow">{t("Nadimak")}</span>
          <p className="small">{t("Ovo ime vide drugi igrači; tvoje pravo ime i email ne prikazujemo.")}</p>
          <form className="nick" onSubmit={(e) => { e.preventDefault(); saveNick(); }}>
            <input value={nick} maxLength={24} onChange={(e) => setNick(e.target.value)} aria-label={t("Nadimak")} />
            <button type="submit">{t("Spremi")}</button>
          </form>
          {msg && <p className="small">{msg}</p>}
        </section>

        <section className="card stack">
          <span className="eyebrow">{t("Račun")}</span>
          <span className="small">{t("Prijavljen kao")} {me.user!.email}</span>
          <div className="row">
            <button className="ghost" onClick={() => signOut(href("/"))}>{t("Odjava")}</button>
            <button className="danger" onClick={del}>{t("Obriši račun")}</button>
          </div>
          <p className="small"><a href="/privatnost">{t("Privatnost")}</a>{me.user!.isAdmin && <> · <a href="/admin">Admin</a></>}</p>
        </section>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return <div className="stat"><b>{value}</b><span>{label}</span></div>;
}
