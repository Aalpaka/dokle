import type { SkinConfig } from "../types";

export const hrConfig: SkinConfig = {
  title: "Dokle?",
  secondsPerCategory: 25,
  // 2 + 2 + 2 + 2, nikad ista grupa zaredom
  dailyPattern: ["hr", "opce", "kviz", "zaigrano", "hr", "opce", "kviz", "zaigrano"],
  groups: { hr: "Hrvatska", opce: "Općenito", zaigrano: "Zaigrano", kviz: "Kviz" },
  maxKm: 1200,
  stations: [
    { name: "Vukovar", genitive: "Vukovara", km: 0, lon: 19.0, lat: 45.35, message: "Još gledaš vodotoranj, ni krenuo nisi.", labelOffset: [-12, 18], alwaysLabel: true },
    { name: "Osijek", genitive: "Osijeka", km: 60, lon: 18.69, lat: 45.55, message: "A lega moj, nisi baš daleko stigao.", labelOffset: [6, -6] },
    { name: "Đakovo", genitive: "Đakova", km: 130, lon: 18.41, lat: 45.31, message: "U usta ti ga spakovo.", labelOffset: [6, 12] },
    { name: "Slavonski Brod", genitive: "Slavonskog Broda", km: 200, lon: 18.01, lat: 45.16, message: "Kraj Slavonije, Sava pokraj tebe.", labelOffset: [-4, 16] },
    { name: "Zagreb", genitive: "Zagreba", km: 290, lon: 15.98, lat: 45.81, message: "Štrukli na Dolcu, a more još daleko.", labelOffset: [6, -6], alwaysLabel: true },
    { name: "Karlovac", genitive: "Karlovca", km: 370, lon: 15.55, lat: 45.49, message: "Grad na četiri rijeke.", labelOffset: [6, -6] },
    { name: "Rijeka", genitive: "Rijeke", km: 450, lon: 14.44, lat: 45.33, message: "Napokon more. Kiša, naravno, pada.", labelOffset: [-4, -8] },
    { name: "Pula", genitive: "Pule", km: 530, lon: 13.85, lat: 44.87, message: "Arena je tu, ali gladijator nisi.", labelOffset: [-6, 16], alwaysLabel: true },
    { name: "Gospić", genitive: "Gospića", km: 620, lon: 15.37, lat: 44.55, message: "Tu nemoj pit vodu.", labelOffset: [8, 4] },
    { name: "Zadar", genitive: "Zadra", km: 710, lon: 15.23, lat: 44.12, message: "Morske orgulje i zalazak sunca.", labelOffset: [-36, 4] },
    { name: "Šibenik", genitive: "Šibenika", km: 790, lon: 15.89, lat: 43.73, message: "Katedrala sv. Jakova.", labelOffset: [-48, 6] },
    { name: "Split", genitive: "Splita", km: 870, lon: 16.44, lat: 43.51, message: "HŽV", labelOffset: [-6, 16], alwaysLabel: true },
    { name: "Makarska", genitive: "Makarske", km: 960, lon: 17.02, lat: 43.3, message: "Biokovo iznad, more ispod.", labelOffset: [8, -4] },
    { name: "Ston", genitive: "Stona", km: 1070, lon: 17.7, lat: 42.84, message: "Kamenice i zidine, Dubrovnik se već vidi.", labelOffset: [-28, 16] },
    { name: "Dubrovnik", genitive: "Dubrovnika", dative: "Dubrovniku", km: 1200, lon: 18.09, lat: 42.65, message: "Stradun! Stigao si do kraja puta.", labelOffset: [-58, 14], alwaysLabel: true },
  ],
  tiers: [
    { minShare: 20, km: 10, emoji: "🚶", name: "Pješice", vehicle: "walk", color: "#8a6d52" },
    { minShare: 10, km: 25, emoji: "🚲", name: "Bajs", icon: "/tiers/bajs.png", badge: "/tiers/bajs.svg", vehicle: "bike", color: "#d7262e" },
    { minShare: 5, km: 45, emoji: "🚆", name: "HŽ", icon: "/tiers/hz.png", vehicle: "train", color: "#1f5fae" },
    { minShare: 2, km: 70, emoji: "🚌", name: "Autobus", vehicle: "bus", color: "#ee8a00" },
    { minShare: 0.5, km: 100, emoji: "🚗", name: "Auto", vehicle: "car", color: "#13804a" },
    { minShare: 0, km: 125, emoji: "✈️", name: "Avion", vehicle: "plane", color: "#7a3db8" },
  ],
  // brzina odgovora (vrijeme od otvaranja kategorije do prihvaćenog odgovora); sortirano po maxSeconds, zadnji bez granice
  speed: [
    { maxSeconds: 5, multiplier: 1.3, emoji: "⚡", name: "Munjevito" },
    { maxSeconds: 12, multiplier: 1.15, emoji: "💨", name: "Brzo" },
    { maxSeconds: 20, multiplier: 1, emoji: "", name: "" },
    { multiplier: 0.9, emoji: "🐌", name: "Sporo" },
  ],
  miss: { km: 0, emoji: "🚧", name: "Radovi na cesti" },
  priorWeight: 50,
};

export const hrSkin = {
  id: "hr",
  name: "Hrvatska",
  timezone: "Europe/Zagreb",
  launchDate: "2026-10-21",
  config: hrConfig,
};
