"use client";

import { useState } from "react";
import { GoogleButton, signOut, useMe } from "./account";
import { MyLeagues } from "./Leagues";

export default function Profile() {
  const [reload, setReload] = useState(0);
  const me = useMe(reload);

  return (
    <div className="wrap">
      <header className="top single">
        <a href="/" className="plate" style={{ textDecoration: "none" }}>Dokle?</a>
      </header>
      <section className="card single">
        {!me ? (
          <p className="loading">Učitavam…</p>
        ) : !me.user ? (
          <div className="stack">
            <h1>Tvoj profil</h1>
            <p>Prijavi se s Googleom da spremiš partije, pratiš streak i vidiš povijest na svakom uređaju.</p>
            {me.authEnabled ? <div className="row"><GoogleButton /></div> : <p className="small">Prijava trenutno nije uključena.</p>}
          </div>
        ) : (
          <LoggedIn me={me} onChange={() => setReload((x) => x + 1)} />
        )}
      </section>
    </div>
  );
}

function LoggedIn({ me, onChange }: { me: NonNullable<ReturnType<typeof useMe>>; onChange: () => void }) {
  const s = me.stats!;
  const [nick, setNick] = useState(me.user!.nickname ?? "");
  const [msg, setMsg] = useState("");

  const saveNick = async () => {
    const r = await fetch("/api/me", { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({ nickname: nick }) });
    const body = await r.json();
    setMsg(r.ok ? "Spremljeno." : body.error);
    if (r.ok) onChange();
  };
  const del = async () => {
    if (!confirm("Obrisati račun? Partije ostaju u statistici igre, ali više neće biti povezane s tobom.")) return;
    await fetch("/api/me", { method: "DELETE" });
    window.location.href = "/";
  };

  return (
    <div className="stack">
      <span className="eyebrow">Profil</span>
      <h1>{me.user!.nickname}</h1>
      <div className="stats">
        <Stat value={s.currentStreak} label="trenutni streak" />
        <Stat value={s.longestStreak} label="najdulji streak" />
        <Stat value={s.played} label="odigranih dana" />
        <Stat value={s.avgKm} label="prosjek km" />
        <Stat value={s.bestKm} label="najdalje km" />
      </div>

      <span className="eyebrow">Lige</span>
      <MyLeagues />

      <span className="eyebrow">Povijest</span>
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
        <p className="small">Još nema završenih partija. <a href="/">Odigraj današnju.</a></p>
      )}

      <span className="eyebrow">Nadimak</span>
      <p className="small">Ovo ime vide drugi igrači; tvoje pravo ime i email ne prikazujemo.</p>
      <form className="nick" onSubmit={(e) => { e.preventDefault(); saveNick(); }}>
        <input value={nick} maxLength={24} onChange={(e) => setNick(e.target.value)} aria-label="Nadimak" />
        <button type="submit">Spremi</button>
      </form>
      {msg && <p className="small">{msg}</p>}

      <div className="row" style={{ justifyContent: "space-between" }}>
        <span className="small">Prijavljen kao {me.user!.email}</span>
        <div className="row">
          <button className="ghost" onClick={signOut}>Odjava</button>
          <button className="danger" onClick={del}>Obriši račun</button>
        </div>
      </div>
      <p className="small"><a href="/privatnost">Privatnost</a>{me.user!.isAdmin && <> · <a href="/admin">Admin</a></>}</p>
    </div>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return <div className="stat"><b>{value}</b><span>{label}</span></div>;
}
