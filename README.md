# Dokle?

Dnevna igra: svaki dan 8 kategorija, za svaku jedan odgovor. Što je točan odgovor rjeđi među igračima,
to dalje putuješ od Vukovara prema Dubrovniku.

## Stack

- Next.js (App Router, TypeScript): igra i API u jednoj aplikaciji
- Postgres (lokalno Docker, u produkciji Supabase) preko Drizzle ORM-a
- Hosting: Vercel

## Lokalni razvoj

```bash
npm install
cp .env.example .env
docker compose up -d        # lokalni Postgres
npm run db:migrate          # tablice
npm run db:seed             # skin HR + početne kategorije
npm run dev                 # http://localhost:3000
```

Testovi: `npm test` (testovi računa trebaju lokalnu bazu s migracijama i seedom). Provjera tipova: `npm run typecheck`.

Promjena sheme: uredi `src/db/schema.ts`, pa `npm run db:generate` (nova migracija u `drizzle/`) i `npm run db:migrate`.

## Kako radi

- **Provjera odgovora je na serveru** (`src/server/game.ts`). Popisi odgovora nikad ne idu u preglednik;
  "Šalje se:" pregled pita server, i to samo za kategoriju koja je igraču trenutno otvorena.
- **Tajmer mjeri server**: kad igrač otvori kategoriju, sprema se vrijeme početka. Odgovor stigao nakon
  25 s (+2,5 s tolerancije) boduje se kao isteklo vrijeme.
- **Svaki upis se sprema** u `attempts`, i odbijeni, za statistike i admin pregled.
- **Rijetkost**: procjena iz seeda pomiješana sa stvarnim odgovorima tog dana,
  `udio = (k * procjena + 100 * broj) / (k + ukupno)`, k = 50 (`src/lib/scoring.ts`).
- **Dnevna zagonetka** se slaže sama pri prvom zahtjevu dana (najdulje nekorištene kategorije po
  rasporedu grupa iz skina). Dan počinje u ponoć po zagrebačkom vremenu.
- **Igrači**: igra radi bez prijave (kolačić `dokle_pid`). Google prijava ide preko Supabase Autha
  (`/auth/callback`); pri prijavi se anonimne partije s tog preglednika prebacuju na račun, osim dana koje
  je račun već odigrao (`src/server/accounts.ts`). Kolačić igrača s računom vrijedi samo uz važeću sesiju.
- **Profil** (`/profil`): streakovi, povijest, nadimak, odjava i brisanje računa. Streak = uzastopni dani,
  živi dok je zadnja partija danas ili jučer (`src/lib/stats.ts`).
- **Admin** (`/admin`, samo za `ADMIN_EMAILS`): pregled dana, odbijeni odgovori (novi odgovor, varijanta
  postojećeg ili odbij; prihvaćanje naknadno boduje igrače kojima je to bio zadnji odgovor), igrači,
  kategorije i odgovori, raspored za 14 dana unaprijed, pretraga svih upisa i CSV izvoz.
  Lokalno bez Supabasea: `ADMIN_DEV_BYPASS=1` uz `npm run dev` (u produkciji se ignorira).

Bez `NEXT_PUBLIC_SUPABASE_*` varijabli igra radi normalno, samo bez prijave. Upute za postavljanje
Supabasea i Google OAutha su u dokumentu projekta.

## Skinovi

Sve vezano uz zemlju je u skinu (`src/skins/<id>/`): ruta, postaje, poruke, tierovi, karta i kategorije.
Seed ih upisuje u bazu (`skins.config`), a aplikacija ih čita iz baze. Novi skin (BiH, Srbija) =
nova mapa u `src/skins/` + unos u `scripts/seed.ts`. Koji skin se servira bira `DEFAULT_SKIN`.

## Produkcija (Vercel)

Vercel pokreće `npm run vercel-build` (`scripts/vercel-build.sh`): u produkciji prvo migracije i seed
(seed osvježava config skina i dodaje nove kategorije, postojeće ne dira), pa build. Preview deployi
ne mijenjaju bazu. Funkcije rade u Frankfurtu (`vercel.json`), uz Supabase bazu.
