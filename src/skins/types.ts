export type Station = {
  name: string;
  genitive?: string; // "Do Osijeka ti je falilo..."
  dative?: string; // "putuješ prema Cavtatu"
  km: number;
  lon: number;
  lat: number;
  message: string;
  labelOffset?: [number, number];
  alwaysLabel?: boolean;
};

export type Tier = { minShare: number; km: number; emoji: string; name: string };

export type SkinMap = {
  viewBox: [number, number];
  // projekcija lon/lat -> x/y: x = (lon - lon0) * kx, y = (lat0 - lat) * ky
  projection: { lon0: number; lat0: number; kx: number; ky: number };
  outline: [number, number][];
  islands: [number, number, number, number, number][]; // lon, lat, rx, ry, kut
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
  miss: { km: number; emoji: string; name: string };
  map: SkinMap;
  // k iz koncepta: koliko "virtualnih" igrača vrijedi procjena prije stvarnih podataka
  priorWeight: number;
};
