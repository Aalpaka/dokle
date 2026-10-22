import { plainTiers, regionalBase } from "../regional";
import type { SkinConfig } from "../types";

// Bijeljina → Neum: sjeveroistok, Posavina, Krajina, srednja Bosna, Sarajevo, Hercegovina i na kraju more.
// km igre su stvarni km ceste skalirani na 1200.
export const baConfig: SkinConfig = {
  ...regionalBase("ba"),
  title: "Dokle, bolan?",
  groups: { ba: "BiH", opce: "Općenito", zaigrano: "Zaigrano", kviz: "Kviz" },
  stations: [
    { name: "Bijeljina", genitive: "Bijeljine", km: 0, lon: 19.214, lat: 44.757, message: "Još si u Semberiji, ni krenuo nisi.", labelOffset: [8, -6], alwaysLabel: true },
    { name: "Tuzla", genitive: "Tuzle", km: 90, lon: 18.676, lat: 44.538, message: "Grad soli i Panonskih jezera.", labelOffset: [8, 12] },
    { name: "Doboj", genitive: "Doboja", km: 165, lon: 18.087, lat: 44.731, message: "Tvrđava Gradina gleda na Bosnu.", labelOffset: [6, -6] },
    { name: "Banja Luka", genitive: "Banje Luke", km: 270, lon: 17.191, lat: 44.772, message: "Zelenilo i Vrbas kroz grad.", labelOffset: [6, -6], alwaysLabel: true },
    { name: "Prijedor", genitive: "Prijedora", km: 335, lon: 16.713, lat: 44.98, message: "Kozara je odmah tu.", labelOffset: [6, -6] },
    { name: "Bihać", genitive: "Bihaća", km: 450, lon: 15.87, lat: 44.816, message: "Una je ovdje najljepša.", labelOffset: [-46, 4] },
    { name: "Jajce", genitive: "Jajca", km: 625, lon: 17.27, lat: 44.342, message: "Pliva se ovdje ruši u Vrbas.", labelOffset: [-40, 4] },
    { name: "Travnik", genitive: "Travnika", km: 695, lon: 17.665, lat: 44.226, message: "Stari grad i Plava voda.", labelOffset: [-48, 14] },
    { name: "Zenica", genitive: "Zenice", km: 730, lon: 17.908, lat: 44.203, message: "Grad čelika na rijeci Bosni.", labelOffset: [8, -4] },
    { name: "Sarajevo", genitive: "Sarajeva", km: 810, lon: 18.413, lat: 43.856, message: "Baščaršija, Sebilj i golubovi.", labelOffset: [8, -4], alwaysLabel: true },
    { name: "Konjic", genitive: "Konjica", km: 880, lon: 17.961, lat: 43.652, message: "Stara ćuprija na Neretvi.", labelOffset: [8, 4] },
    { name: "Mostar", genitive: "Mostara", km: 950, lon: 17.808, lat: 43.343, message: "Stari most i Neretva ispod njega.", labelOffset: [-52, 4], alwaysLabel: true },
    { name: "Trebinje", genitive: "Trebinja", km: 1095, lon: 18.344, lat: 42.711, message: "Platani i Arslanagića most.", labelOffset: [8, 4] },
    { name: "Neum", genitive: "Neuma", dative: "Neumu", km: 1200, lon: 17.616, lat: 42.923, message: "More! Stigao si do kraja puta.", labelOffset: [-44, 14], alwaysLabel: true },
  ],
  tiers: plainTiers(["Pješice", "Bicikl", "Voz", "Autobus", "Auto", "Avion", "Helikopter"]),
  speed: [
    { maxSeconds: 5, multiplier: 1.3, emoji: "⚡", name: "Munjevito" },
    { maxSeconds: 12, multiplier: 1.15, emoji: "💨", name: "Brzo" },
    { maxSeconds: 20, multiplier: 1, emoji: "", name: "" },
    { multiplier: 0.9, emoji: "🐌", name: "Sporo" },
  ],
  miss: { km: 0, emoji: "🚧", name: "Radovi na cesti" },
};

export const baSkin = {
  id: "ba",
  name: "Bosna i Hercegovina",
  timezone: "Europe/Sarajevo",
  // dan lansiranja (#1) seed upiše kad prvi put doda skin
  config: baConfig,
};
