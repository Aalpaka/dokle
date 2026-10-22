import { plainTiers, regionalBase } from "../regional";
import type { SkinConfig } from "../types";

// Subotica → Vranje: Vojvodina, Beograd, zapadna i centralna Srbija, istok i jug.
// Zadnja dionica ide obilaznicom preko Kosova (vidi map.ts). km igre su stvarni km ceste skalirani na 1200.
export const rsConfig: SkinConfig = {
  ...regionalBase("rs"),
  title: "Докле, бре?",
  groups: { rs: "Srbija", opce: "Opšte", zaigrano: "Zaigrano", kviz: "Kviz" },
  stations: [
    { name: "Subotica", genitive: "Subotice", km: 0, lon: 19.665, lat: 46.1, message: "Još gledaš Gradsku kuću, nisi ni krenuo.", labelOffset: [8, -6], alwaysLabel: true },
    { name: "Sombor", genitive: "Sombora", km: 55, lon: 19.112, lat: 45.774, message: "Zeleni grad, fijakeri i salaši.", labelOffset: [-58, 4] },
    { name: "Novi Sad", genitive: "Novog Sada", km: 150, lon: 19.833, lat: 45.267, message: "Petrovaradin te gleda s druge obale.", labelOffset: [-62, 14], alwaysLabel: true },
    { name: "Zrenjanin", genitive: "Zrenjanina", km: 195, lon: 20.389, lat: 45.381, message: "Begej ispod mostova, Banat oko tebe.", labelOffset: [8, -4] },
    { name: "Beograd", genitive: "Beograda", km: 265, lon: 20.457, lat: 44.817, message: "Kalemegdan i ušće Save u Dunav.", labelOffset: [8, -4], alwaysLabel: true },
    { name: "Šabac", genitive: "Šapca", km: 345, lon: 19.694, lat: 44.756, message: "Mačva oko tebe, Sava pored tebe.", labelOffset: [-50, -2] },
    { name: "Valjevo", genitive: "Valjeva", km: 410, lon: 19.89, lat: 44.272, message: "Tešnjar i Kolubara.", labelOffset: [-54, 4] },
    { name: "Užice", genitive: "Užica", dative: "Užicu", km: 485, lon: 19.841, lat: 43.856, message: "Đetinja i stari grad na steni.", labelOffset: [-44, 12] },
    { name: "Čačak", genitive: "Čačka", km: 545, lon: 20.35, lat: 43.891, message: "Ovčar i Kablar su odmah tu.", labelOffset: [6, -6] },
    { name: "Kraljevo", genitive: "Kraljeva", km: 580, lon: 20.687, lat: 43.724, message: "Manastir Žiča je odmah tu.", labelOffset: [-6, 16] },
    { name: "Kragujevac", genitive: "Kragujevca", km: 630, lon: 20.911, lat: 44.012, message: "Šumadija, a pola puta je iza tebe.", labelOffset: [8, -4], alwaysLabel: true },
    { name: "Zaječar", genitive: "Zaječara", km: 780, lon: 22.264, lat: 43.904, message: "Gamzigrad je odmah iza ugla.", labelOffset: [8, -4] },
    { name: "Niš", genitive: "Niša", km: 865, lon: 21.896, lat: 43.321, message: "Tvrđava, Nišava i burek.", labelOffset: [-30, -4], alwaysLabel: true },
    { name: "Pirot", genitive: "Pirota", km: 930, lon: 22.586, lat: 43.153, message: "Ćilimi i pirotski kačkavalj.", labelOffset: [8, 4] },
    { name: "Leskovac", genitive: "Leskovca", km: 1015, lon: 21.946, lat: 42.998, message: "Roštilj je ovde ozbiljna stvar.", labelOffset: [8, 4] },
    { name: "Vranje", genitive: "Vranja", dative: "Vranju", km: 1200, lon: 21.9, lat: 42.551, message: "Stigao si do kraja puta.", labelOffset: [8, 4], alwaysLabel: true },
  ],
  tiers: plainTiers(["Peške", "Bicikl", "Voz", "Autobus", "Auto", "Avion", "Helikopter"]),
  speed: [
    { maxSeconds: 5, multiplier: 1.3, emoji: "⚡", name: "Munjevito" },
    { maxSeconds: 12, multiplier: 1.15, emoji: "💨", name: "Brzo" },
    { maxSeconds: 20, multiplier: 1, emoji: "", name: "" },
    { multiplier: 0.9, emoji: "🐌", name: "Sporo" },
  ],
  miss: { km: 0, emoji: "🚧", name: "Radovi na putu" },
};

export const rsSkin = {
  id: "rs",
  name: "Srbija",
  timezone: "Europe/Belgrade",
  // dan lansiranja (#1) seed upiše kad prvi put doda skin
  config: rsConfig,
};
