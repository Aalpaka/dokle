export type Station = {
  name: string;
  genitive?: string; // "Do Osijeka ti je falilo..."
  dative?: string; // "putuješ prema Dubrovniku"
  km: number;
  lon: number;
  lat: number;
  message: string;
  labelOffset?: [number, number];
  alwaysLabel?: boolean;
};

// icon = URL sličice (logo) koja u igri zamjenjuje emoji; emoji ostaje za tekst za dijeljenje
// vehicle = animacija na karti, color = boja traga; badge = sličica na karti ako se razlikuje od icon
// rare = poseban tier samo za odgovore označene kao najrjeđi (helikopter), dok im udio ne naraste iznad najrjeđeg običnog tiera
export type Vehicle = "walk" | "bike" | "train" | "bus" | "car" | "plane" | "heli";
export type Tier = { minShare: number; km: number; emoji: string; name: string; icon?: string; badge?: string; vehicle: Vehicle; color: string; rare?: boolean };

// množitelj km prema brzini odgovora; emoji/name prazni = bez oznake
export type SpeedStep = { maxSeconds?: number; multiplier: number; emoji: string; name: string };

// Karta skina; živi u klijentskom kodu (src/skins/maps.ts), ne šalje se u stanju igre
export type SkinMap = {
  image: { href: string; x: number; y: number; width: number; height: number };
  // šira karta manje rezolucije ispod glavne, da se kod "cijele rute" vidi i okolica umjesto praznih rubova
  backdrop?: { href: string; x: number; y: number; width: number; height: number };
  // međutočke rute [lon, lat] za svaku dionicu između dviju stanica
  via: [number, number][][];
  ferries: { name: string; from: [number, number]; to: [number, number] }[];
  towns: [string, number, number][]; // mjesta koja se samo prikazuju
  // "crash": kopnena vozila tu stanu i zabiju se (zvuk `clip`); "pass": samo natpis `message` u prolazu
  landmarks: { name: string; lon: number; lat: number; kind: "crash" | "pass"; message?: string; clip?: string }[];
  // snimka koja se pusti kad vozilo stigne ili prođe kroz postaju, po imenu postaje
  stationClips?: Record<string, string>;
  countries: [string, number, number][];
  border: string; // SVG path u koordinatama karte
  dashedBorder?: string; // sporna granica, crta se isprekidano
  rivers: { name: string; d: string }[];
  // središte i širina pogleda "Cijela ruta" u koordinatama karte
  overview: { x: number; y: number; width: number; height: number };
  credit: string;
  // znak na tabli kad se stigne na cilj (zadano ⛵, cilj je na moru)
  finishEmoji?: string;
  // snimka uz uzlijetanje helikoptera (samo Hrvatska)
  heliClip?: boolean;
  // cesta od cilja do postaje produžetka (overshoot), crta se tek kad se vozi
  overshootVia?: [number, number][];
};

export type SkinConfig = {
  title: string;
  secondsPerCategory: number;
  // redoslijed grupa kategorija u danu, npr. ["hr","opce","zaigrano",...]
  dailyPattern: string[];
  groups: Record<string, string>; // id grupe -> naziv za prikaz
  // dnevne kategorije prate ovaj skin: isti slugovi isti dan (domaća grupa ima svoju verziju istog sluga)
  mirror?: string;
  maxKm: number;
  stations: Station[];
  // easter egg: tko skupi više od overKm, ne stane na cilju nego produži do ove postaje (izvan rute i usporedbe)
  overshoot?: { overKm: number; station: Station };
  // km prijevoza (po redu tiers) i prag produžetka za partije prije datuma `until`; tiers i overshoot vrijede od tog dana
  before?: { until: string; tierKm: number[]; overKm?: number };
  tiers: Tier[]; // sortirano od najčešćeg prema najrjeđem
  speed: SpeedStep[]; // sortirano po maxSeconds, zadnji bez granice
  miss: { km: number; emoji: string; name: string };
  // k iz koncepta: koliko "virtualnih" igrača vrijedi procjena prije stvarnih podataka
  priorWeight: number;
};
