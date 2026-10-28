"use client";

import { useRef, useState } from "react";
import { AVATAR_PX, MAX_AVATAR_BYTES } from "@/lib/avatar";
import { raceTags } from "@/lib/league";
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
  const [byKm, setByKm] = useState(false);
  const t = useT();
  const { href, name } = useSkin();
  // povijest dolazi od najnovije; po udaljenosti od najdalje, a isti km od novijeg
  const history = byKm ? [...me.history].sort((a, b) => b.km - a.km || b.date.localeCompare(a.date)) : me.history;

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
        <div className="row hist-head">
          <span className="eyebrow">{t("Povijest")} · {name}</span>
          {me.history.length > 1 && (
            <div className="seg" role="group" aria-label={t("Poredaj")}>
              <button className={byKm ? "ghost" : ""} aria-pressed={!byKm} onClick={() => setByKm(false)}>{t("Najnovije")}</button>
              <button className={byKm ? "" : "ghost"} aria-pressed={byKm} onClick={() => setByKm(true)}>{t("Najdalje")}</button>
            </div>
          )}
        </div>
        {history.length ? (
          <ul className="recap history">
            {history.map((h, i) => {
              const [y, m, d] = h.date.split("-");
              return (
                <li key={h.date}>
                  <span className="n">{byKm ? `${i + 1}.` : `#${h.number}`}</span>
                  <span className="w"><span className="a">{h.station}</span><span className="c">{byKm && `#${h.number} · `}{+d}. {+m}. {y}.</span></span>
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

        <AvatarCard me={me} onChange={onChange} />

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
          <p className="small"><a href="/privatnost">{t("Privatnost")}</a> · <a href="/uvjeti">{t("Uvjeti korištenja")}</a>{me.user!.isAdmin && <> · <a href="/admin">Admin</a></>}</p>
        </section>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return <div className="stat"><b>{value}</b><span>{label}</span></div>;
}

/**
 * Slika se u pregledniku izreže na kvadrat iz sredine i smanji na AVATAR_PX (webp, a gdje preglednik ne zna webp
 * jpeg), pa na server ide desetak KB umjesto fotografije od nekoliko MB.
 */
async function shrink(file: File): Promise<Blob> {
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.src = url;
    await img.decode();
    const side = Math.min(img.naturalWidth, img.naturalHeight);
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = AVATAR_PX;
    const ctx = canvas.getContext("2d")!;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, (img.naturalWidth - side) / 2, (img.naturalHeight - side) / 2, side, side, 0, 0, AVATAR_PX, AVATAR_PX);
    const encode = (type: string, q: number) => new Promise<Blob | null>((ok) => canvas.toBlob(ok, type, q));
    for (const q of [0.85, 0.7, 0.5]) {
      let blob = await encode("image/webp", q);
      if (blob?.type !== "image/webp") blob = await encode("image/jpeg", q);
      if (blob && blob.size <= MAX_AVATAR_BYTES) return blob;
    }
    throw new Error("Slika je prevelika.");
  } finally {
    URL.revokeObjectURL(url);
  }
}

function AvatarCard({ me, onChange }: { me: NonNullable<ReturnType<typeof useMe>>; onChange: () => void }) {
  const t = useT();
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const avatar = me.user!.avatar;

  const upload = async (file: File | undefined) => {
    if (!file) return;
    setBusy(true);
    setMsg("");
    try {
      const blob = await shrink(file).catch(() => {
        throw new Error("Ovu sliku ne mogu otvoriti, probaj s drugom (JPG ili PNG).");
      });
      const r = await skinFetch("/api/me/slika", { method: "POST", headers: { "content-type": blob.type }, body: blob });
      const body = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(body.error ?? "Greška");
      setMsg(t("Spremljeno."));
      onChange();
    } catch (e) {
      setMsg(t((e as Error).message));
    } finally {
      setBusy(false);
      if (input.current) input.current.value = "";
    }
  };
  const remove = async () => {
    setBusy(true);
    await skinFetch("/api/me/slika", { method: "DELETE" });
    setBusy(false);
    setMsg("");
    onChange();
  };

  return (
    <section className="card stack">
      <span className="eyebrow">{t("Profilna slika")}</span>
      <div className="avatar-edit">
        <span className={"avatar-big" + (avatar ? " pic" : "")}>
          {avatar ? <img src={avatar} alt={t("Tvoja profilna slika")} /> : raceTags([me.user!.nickname ?? "?"])[0]}
        </span>
        <div className="stack">
          <p className="small">{t("Vide je članovi tvojih liga: u tablici, na traci i u utrci na karti. Ti na karti i dalje voziš svoje prijevozno sredstvo.")}</p>
          <div className="row">
            <button className="small-btn" disabled={busy} onClick={() => input.current?.click()}>
              {busy ? t("Šaljem…") : avatar ? t("Promijeni sliku") : t("Dodaj sliku")}
            </button>
            {avatar && <button className="ghost small-btn" disabled={busy} onClick={remove}>{t("Ukloni")}</button>}
          </div>
        </div>
      </div>
      <input ref={input} type="file" accept="image/*" hidden onChange={(e) => upload(e.target.files?.[0])} />
      {msg && <p className="small">{msg}</p>}
    </section>
  );
}
