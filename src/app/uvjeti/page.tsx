import type { Metadata } from "next";

export const metadata: Metadata = { title: "Uvjeti korištenja · Dokle?" };

const CONTACT = "alan.baudoin@gmail.com";

// Kratki uvjeti korištenja; Google ih traži za objavu OAuth prijave.
export default function Uvjeti() {
  return (
    <div className="wrap">
      <header className="top single">
        <a href="/" className="plate" style={{ textDecoration: "none" }}>Dokle?</a>
      </header>
      <section className="card single prose">
        <h1>Uvjeti korištenja</h1>
        <p>Igranjem Dokle? prihvaćaš ove uvjete. Kratki su, pa ih pročitaj.</p>
        <h2>Igra</h2>
        <p>
          Dokle? je besplatna dnevna igra koju vodi Alan Baudoin. Igra se bez računa; prijava Googleom služi samo za povijest,
          streak i lige. Igru možemo mijenjati, privremeno isključiti ili ugasiti bez najave.
        </p>
        <h2>Fer igra</h2>
        <ul>
          <li>Ne koristi skripte, botove ni automatsko slanje odgovora i ne opterećuj stranicu namjerno.</li>
          <li>Ne pokušavaj zaobići pravila igre ni pristupiti tuđim podacima.</li>
          <li>Nadimak i ime lige ne smiju biti uvredljivi, tuđe ime ni reklama.</li>
        </ul>
        <p>Ako se to prekrši, možemo promijeniti nadimak, obrisati ligu, poništiti rezultate ili zabraniti pristup.</p>
        <h2>Bez jamstva</h2>
        <p>
          Igra je za zabavu. Trudimo se da odgovori, bodovanje i statistika budu točni, ali ne jamčimo da će igra uvijek raditi ni
          da su svi podaci bez greške. Ne odgovaramo za štetu nastalu korištenjem igre, osim ako to zakon ne dopušta isključiti.
        </p>
        <h2>Račun i podaci</h2>
        <p>
          Račun možeš obrisati kad god želiš na stranici <a href="/profil">Profil</a>. Kako postupamo s podacima piše na stranici{" "}
          <a href="/privatnost">Privatnost</a>.
        </p>
        <h2>Izmjene i pravo</h2>
        <p>
          Uvjete možemo mijenjati; nova verzija vrijedi od objave na ovoj stranici. Primjenjuje se hrvatsko pravo. Pitanja i
          prigovori: <a href={`mailto:${CONTACT}`}>{CONTACT}</a>.
        </p>
        <p className="small">Zadnja izmjena: 23. listopada 2026.</p>
      </section>
    </div>
  );
}
