import type { SkinConfig } from "../types";

export const hrConfig: SkinConfig = {
  title: "Dokle?",
  secondsPerCategory: 25,
  // miješano, nikad dvije zaigrane zaredom
  dailyPattern: ["hr", "opce", "zaigrano", "hr", "opce", "hr", "zaigrano", "opce"],
  groups: { hr: "Hrvatska", opce: "Općenito", zaigrano: "Zaigrano" },
  maxKm: 1000,
  stations: [
    { name: "Ilok", genitive: "Iloka", km: 0, lon: 19.376, lat: 45.222, message: "Još si u podrumu, ni izašao nisi.", labelOffset: [-12, 18], alwaysLabel: true },
    { name: "Vukovar", genitive: "Vukovara", km: 40, lon: 19.0, lat: 45.35, message: "Vodotoranj u retrovizoru.", labelOffset: [-50, -6] },
    { name: "Osijek", genitive: "Osijeka", km: 100, lon: 18.69, lat: 45.55, message: "A lega moj, nisi baš daleko stigao.", labelOffset: [6, -6] },
    { name: "Đakovo", genitive: "Đakova", km: 170, lon: 18.41, lat: 45.31, message: "U usta ti ga spakovo.", labelOffset: [6, 12] },
    { name: "Slavonski Brod", genitive: "Slavonskog Broda", km: 240, lon: 18.01, lat: 45.16, message: "Kraj Slavonije, Sava pokraj tebe.", labelOffset: [-4, 16] },
    { name: "Zagreb", genitive: "Zagreba", km: 320, lon: 15.98, lat: 45.81, message: "Štrukli na Dolcu, pola puta iza tebe.", labelOffset: [6, -6], alwaysLabel: true },
    { name: "Karlovac", genitive: "Karlovca", km: 400, lon: 15.55, lat: 45.49, message: "Grad na četiri rijeke.", labelOffset: [-56, 4] },
    { name: "Gospić", genitive: "Gospića", km: 470, lon: 15.37, lat: 44.55, message: "Tu nemoj pit vodu.", labelOffset: [8, 4] },
    { name: "Zadar", genitive: "Zadra", km: 550, lon: 15.23, lat: 44.12, message: "Morske orgulje i zalazak sunca.", labelOffset: [-36, 4] },
    { name: "Šibenik", genitive: "Šibenika", km: 620, lon: 15.89, lat: 43.73, message: "Katedrala sv. Jakova.", labelOffset: [-48, 6] },
    { name: "Split", genitive: "Splita", km: 700, lon: 16.44, lat: 43.51, message: "HŽV", labelOffset: [-6, 16], alwaysLabel: true },
    { name: "Makarska", genitive: "Makarske", km: 780, lon: 17.02, lat: 43.3, message: "Biokovo iznad, more ispod.", labelOffset: [8, -4] },
    { name: "Ston", genitive: "Stona", km: 860, lon: 17.7, lat: 42.84, message: "Kamenice i zidine.", labelOffset: [-28, 16] },
    { name: "Dubrovnik", genitive: "Dubrovnika", km: 930, lon: 18.09, lat: 42.65, message: "Stradun! Gotovo savršeno.", labelOffset: [-58, 14] },
    { name: "Cavtat", genitive: "Cavtata", dative: "Cavtatu", km: 1000, lon: 18.22, lat: 42.58, message: "Savršen dan, kraj puta.", labelOffset: [8, 4], alwaysLabel: true },
  ],
  tiers: [
    { minShare: 20, km: 10, emoji: "🚶", name: "Pješice" },
    { minShare: 10, km: 25, emoji: "🚲", name: "Biciklom" },
    { minShare: 5, km: 45, emoji: "🚌", name: "Autobusom" },
    { minShare: 2, km: 70, emoji: "🚗", name: "Autom" },
    { minShare: 0.5, km: 100, emoji: "⛴️", name: "Trajektom" },
    { minShare: 0, km: 125, emoji: "✈️", name: "Avionom" },
  ],
  miss: { km: 0, emoji: "🚧", name: "Radovi na cesti" },
  priorWeight: 50,
  map: {
    viewBox: [450, 430],
    projection: { lon0: 13.3, lat0: 46.6, kx: 71.3, ky: 100 },
    outline: [
      [13.5, 45.5], [13.9, 45.47], [14.3, 45.48], [14.6, 45.62], [14.85, 45.48], [15.2, 45.47], [15.3, 45.7], [15.55, 45.84], [15.68, 46.05], [15.98, 46.2],
      [16.3, 46.38], [16.6, 46.48], [16.88, 46.32], [17.3, 46.02], [17.7, 45.85], [18.2, 45.78], [18.6, 45.76], [18.88, 45.92], [18.95, 45.78], [19.05, 45.55],
      [19.0, 45.4], [19.42, 45.2], [19.1, 45.0], [18.85, 44.86], [18.6, 45.06], [18.3, 45.1], [18.0, 45.15], [17.5, 45.11], [17.0, 45.24], [16.6, 45.22],
      [16.35, 45.05], [15.95, 45.2], [15.8, 44.75], [16.1, 44.55], [16.4, 44.2], [16.6, 43.95], [16.95, 43.7], [17.3, 43.45], [17.6, 43.1], [17.65, 42.95],
      [18.0, 42.8], [18.45, 42.55], [18.52, 42.42], [18.22, 42.55], [18.07, 42.63], [17.7, 42.8], [17.35, 43.05], [17.02, 43.28], [16.44, 43.5], [16.05, 43.52],
      [15.9, 43.7], [15.5, 43.95], [15.22, 44.1], [15.18, 44.24], [15.3, 44.35], [15.07, 44.53], [14.92, 44.95], [14.69, 45.17], [14.44, 45.33], [14.3, 45.3],
      [14.18, 45.08], [14.02, 44.86], [13.85, 44.82], [13.66, 45.08], [13.58, 45.3],
    ],
    islands: [
      [14.62, 45.07, 9, 17, 25], [14.4, 44.85, 5, 22, -5], [14.45, 44.55, 4, 12, -20], [14.95, 44.52, 5, 22, -45], [14.75, 44.77, 4, 8, -30],
      [15.02, 44.0, 3.5, 14, -45], [15.15, 44.05, 3, 9, -45], [16.62, 43.33, 15, 6, 0], [16.7, 43.15, 22, 4, -5], [16.95, 42.95, 18, 4, -8],
      [17.5, 42.75, 14, 3.5, -15], [16.15, 43.05, 6, 4, 0], [17.25, 42.95, 22, 4, -20], [15.9, 43.48, 5, 4, 0],
    ],
  },
};

export const hrSkin = {
  id: "hr",
  name: "Hrvatska",
  timezone: "Europe/Zagreb",
  launchDate: "2026-10-21",
  config: hrConfig,
};
