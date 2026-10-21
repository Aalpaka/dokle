import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privatnost · Dokle?" };

// Kratka izjava o privatnosti; Google je traži za OAuth prijavu.
export default function Privatnost() {
  return (
    <div className="wrap">
      <header className="top single">
        <a href="/" className="plate" style={{ textDecoration: "none" }}>Dokle?</a>
      </header>
      <section className="card single prose">
        <h1>Privatnost</h1>
        <p>Dokle? je dnevna igra. Prikupljamo samo ono što treba za igru i statistiku.</p>
        <h2>Što spremamo</h2>
        <ul>
          <li>Tvoje odgovore i rezultate partija, za bodovanje i statistiku odgovora.</li>
          <li>Nasumični identifikator u kolačiću, da igra zna da si to ti i da ne igraš isti dan dvaput.</li>
          <li>Ako se prijaviš s Googleom: Googleov identifikator računa, email adresu i nadimak koji sam odabereš.</li>
        </ul>
        <h2>Što ne radimo</h2>
        <ul>
          <li>Ne prikazujemo tvoje ime ni email drugim igračima.</li>
          <li>Ne prodajemo i ne dijelimo podatke, i nemamo oglase ni kolačiće za praćenje.</li>
        </ul>
        <h2>Brisanje</h2>
        <p>
          Na stranici <a href="/profil">Profil</a> možeš obrisati račun. Tada brišemo vezu s Google računom, email i nadimak;
          odgovori ostaju samo kao anonimna statistika.
        </p>
        <h2>Gdje su podaci</h2>
        <p>Podaci su u bazi kod Supabasea (EU, Frankfurt), a aplikacija radi na Vercelu.</p>
      </section>
    </div>
  );
}
