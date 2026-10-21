# Dokle?

Dnevna igra: svaki dan 8 kategorija, za svaku jedan odgovor. Što je točan odgovor rjeđi među igračima,
to dalje putuješ od Iloka prema Cavtatu.

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

Testovi: `npm test`. Provjera tipova: `npm run typecheck`.

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
- **Igrači**: zasad anonimni, prepoznaju se po kolačiću `dokle_pid`. Google prijava dolazi u fazi 2.

## Skinovi

Sve vezano uz zemlju je u skinu (`src/skins/<id>/`): ruta, postaje, poruke, tierovi, karta i kategorije.
Seed ih upisuje u bazu (`skins.config`), a aplikacija ih čita iz baze. Novi skin (BiH, Srbija) =
nova mapa u `src/skins/` + unos u `scripts/seed.ts`. Koji skin se servira bira `DEFAULT_SKIN`.
