import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privatnost · Dokle?" };

const CONTACT = "alan.baudoin@gmail.com";

// Izjava o privatnosti (GDPR čl. 13); Google je traži i za OAuth prijavu.
export default function Privatnost() {
  return (
    <div className="wrap">
      <header className="top single">
        <a href="/" className="plate" style={{ textDecoration: "none" }}>Dokle?</a>
      </header>
      <section className="card single prose">
        <h1>Privatnost</h1>
        <p>Dokle? je dnevna igra. Prikupljamo samo ono što treba za igru i statistiku.</p>
        <h2>Tko odgovara za podatke</h2>
        <p>
          Igru vodi Alan Baudoin, fizička osoba iz Hrvatske. Za sva pitanja o tvojim podacima piši na{" "}
          <a href={`mailto:${CONTACT}`}>{CONTACT}</a>.
        </p>
        <h2>Što spremamo i zašto</h2>
        <ul>
          <li>Tvoje odgovore i rezultate partija, za bodovanje, ljestvice i statistiku odgovora.</li>
          <li>Nasumični identifikator u kolačiću, da igra zna da si to ti i da ne igraš isti dan dvaput.</li>
          <li>
            Grubu lokaciju (državu i grad) koju poslužitelj procijeni iz tvoje IP adrese, vrstu uređaja (mobitel, tablet ili
            računalo) i domenu stranice s koje si došao (npr. google), za statistiku o tome odakle se igra. Samu IP adresu ne spremamo.
          </li>
          <li>Ako se prijaviš s Googleom: Googleov identifikator računa, email adresu i nadimak koji sam odabereš, da tvoja povijest, streak i lige rade na svakom uređaju. Ako sam dodaš profilnu sliku, spremamo njenu smanjenu kopiju (192 × 192 piksela).</li>
        </ul>
        <p>
          Pravna osnova je izvršenje usluge koju tražiš, tj. igranje i korisnički račun (čl. 6. st. 1. b GDPR-a). Anonimnu statistiku
          odgovora i grubu lokaciju vodimo na temelju legitimnog interesa da igra bude poštena i zanimljiva (čl. 6. st. 1. f).
        </p>
        <h2>Kolačići</h2>
        <p>
          Koristimo samo nužne kolačiće: identifikator igrača i, ako se prijaviš, kolačiće prijave. U pregledniku pamtimo i je li
          zvuk isključen. Nemamo oglase, analitiku ni kolačiće za praćenje, pa ne tražimo privolu.
        </p>
        <h2>Tko još vidi podatke</h2>
        <ul>
          <li>Drugi igrači vide samo tvoj nadimak, profilnu sliku ako si je dodao, kilometre i odgovore (u ligama kojima se pridružiš). Ne vide tvoje ime ni email, a Googleovu sliku računa ne koristimo.</li>
          <li>Supabase (baza i prijava, poslužitelji u Irskoj, EU).</li>
          <li>Vercel (poslužuje stranicu, poslužitelji u Dublinu, Irska; tvrtka je iz SAD-a i prenosi podatke prema EU-US Data Privacy Frameworku).</li>
          <li>Google, kad se prikaže ili koristi Googleov gumb za prijavu (učitava se s Googleovih poslužitelja).</li>
        </ul>
        <p>Ne prodajemo i ne dijelimo podatke nikome drugome.</p>
        <h2>Koliko dugo</h2>
        <p>
          Podatke računa čuvamo dok ga ne obrišeš; tada brišemo i lokaciju, uređaj i izvor dolaska. Odgovori i rezultati ostaju trajno, ali nakon brisanja računa samo kao anonimna
          statistika koja se ne može povezati s tobom.
        </p>
        <h2>Tvoja prava</h2>
        <p>
          Na stranici <a href="/profil">Profil</a> možeš promijeniti nadimak i profilnu sliku i obrisati račun. Tada brišemo vezu s Google računom,
          email, nadimak i sliku. Možeš i zatražiti uvid u svoje podatke, ispravak, ograničenje obrade, prijenos ili prigovor; piši na
          adresu gore i odgovorit ćemo u roku od mjesec dana. Ako misliš da kršimo pravila, možeš podnijeti pritužbu Agenciji za
          zaštitu osobnih podataka (<a href="https://azop.hr">azop.hr</a>).
        </p>
        <p>Pravila igre su u <a href="/uvjeti">uvjetima korištenja</a>.</p>
        <p className="small">Zadnja izmjena: 26. listopada 2026.</p>
      </section>
    </div>
  );
}
