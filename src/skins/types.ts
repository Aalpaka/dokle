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
export type Vehicle = "walk" | "bike" | "train" | "bus" | "car" | "plane";
export type Tier = { minShare: number; km: number; emoji: string; name: string; icon?: string; badge?: string; vehicle: Vehicle; color: string };

// množitelj km prema brzini odgovora; emoji/name prazni = bez oznake
export type SpeedStep = { maxSeconds?: number; multiplier: number; emoji: string; name: string };

// Karta skina; živi u klijentskom kodu (src/skins/maps.ts), ne šalje se u stanju igre
export type SkinMap = {
  image: { href: string; x: number; y: number; width: number; height: number };
  // međutočke rute [lon, lat] za svaku dionicu između dviju stanica
  via: [number, number][][];
  ferries: { name: string; from: [number, number]; to: [number, number] }[];
  towns: [string, number, number][]; // mjesta koja se samo prikazuju
  landmarks: { name: string; lon: number; lat: number; kind: "crash" }[];
  countries: [string, number, number][];
  border: string; // SVG path u koordinatama karte
  rivers: { name: string; d: string }[];
  // središte i širina pogleda "Cijela ruta" u koordinatama karte
  overview: { x: number; y: number; width: number; height: number };
  credit: string;
};

export type SkinConfig = {
  title: string;
  secondsPerCategory: number;
  // redoslijed grupa kategorija u danu, npr. ["hr","opce","zaigrano",...]
  dailyPattern: string[];
  groups: Record<string, string>; // id grupe -> naziv za prikaz
  maxKm: number;
  stations: Station[];
  tiers: Tier[]; // sortirano od najčešćeg prema najrjeđem
  speed: SpeedStep[]; // sortirano po maxSeconds, zadnji bez granice
  miss: { km: number; emoji: string; name: string };
  // k iz koncepta: koliko "virtualnih" igrača vrijedi procjena prije stvarnih podataka
  priorWeight: number;
};
