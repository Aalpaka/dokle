import type { SkinMap } from "../types";
import { rsBorder, rsDashed, rsRivers } from "./mapGeo";

export const rsMap: SkinMap = {
  image: { href: "/map/rs-reljef.jpg", x: 739.39, y: 88.25, width: 2279, height: 1654 },
  backdrop: { href: "/map/rs-okolica.jpg", x: -36.36, y: -629.54, width: 4000, height: 2821 },
  // približno stvarne ceste
  via: [
    [[19.4, 45.95]],
    [[19.53, 45.61], [19.64, 45.57]],
    [[20.1, 45.35]],
    [[20.45, 45.1], [20.48, 44.95]],
    [[20.2, 44.65], [19.95, 44.72]],
    [[19.8, 44.5]],
    [[19.9, 44.1], [19.91, 43.99]],
    [[20.04, 43.85], [20.25, 43.89]],
    [[20.5, 43.82]],
    [[20.72, 43.92]],
    [[21.26, 43.98], [21.41, 43.86], [21.7, 43.85], [21.96, 43.83]],
    [[22.26, 43.57], [22.12, 43.42]],
    [[22.1, 43.27], [22.31, 43.22]],
    [[22.41, 43.07], [22.2, 43.0], [21.96, 42.97]],
    // Leskovac → Vranje obilaznicom preko Kosova (Medveđa, Podujevo, Priština, Gnjilane, Bujanovac)
    [[21.73, 42.92], [21.585, 42.84], [21.3, 42.88], [21.19, 42.91], [21.16, 42.66], [21.47, 42.46], [21.77, 42.48]],
  ],
  ferries: [],
  towns: [
    ["Kikinda", 20.47, 45.83], ["Senta", 20.08, 45.93], ["Bečej", 20.03, 45.62], ["Vrbas", 19.64, 45.57], ["Apatin", 18.98, 45.67],
    ["Bačka Palanka", 19.39, 45.25], ["Sremska Mitrovica", 19.61, 44.97], ["Ruma", 19.82, 45.01], ["Inđija", 20.08, 45.05],
    ["Pančevo", 20.64, 44.87], ["Vršac", 21.3, 45.12], ["Smederevo", 20.93, 44.66], ["Požarevac", 21.19, 44.62], ["Loznica", 19.22, 44.53],
    ["Lazarevac", 20.26, 44.38], ["Mladenovac", 20.7, 44.44], ["Aranđelovac", 20.56, 44.31], ["Gornji Milanovac", 20.46, 44.03],
    ["Bajina Bašta", 19.57, 43.97], ["Zlatibor", 19.7, 43.73], ["Prijepolje", 19.65, 43.39], ["Nova Varoš", 19.81, 43.46],
    ["Ivanjica", 20.23, 43.58], ["Novi Pazar", 20.51, 43.14], ["Raška", 20.61, 43.29], ["Kopaonik", 20.81, 43.29], ["Kruševac", 21.33, 43.58],
    ["Trstenik", 20.99, 43.62], ["Jagodina", 21.26, 43.98], ["Ćuprija", 21.37, 43.93], ["Paraćin", 21.41, 43.86], ["Svilajnac", 21.19, 44.23],
    ["Bor", 22.1, 44.07], ["Negotin", 22.53, 44.23], ["Kladovo", 22.61, 44.61], ["Donji Milanovac", 22.15, 44.46], ["Knjaževac", 22.26, 43.57],
    ["Sokobanja", 21.87, 43.64], ["Aleksinac", 21.7, 43.54], ["Prokuplje", 21.59, 43.23], ["Kuršumlija", 21.27, 43.14],
    ["Vlasotince", 21.96, 42.97], ["Dimitrovgrad", 22.79, 43.02], ["Surdulica", 22.17, 42.69], ["Bujanovac", 21.77, 42.46], ["Preševo", 21.65, 42.31],
  ],
  // obilaznica kroz Kosovo: vozilo ne staje, samo natpis u prolazu
  landmarks: [{ name: "Kosovo", lon: 21.16, lat: 42.66, kind: "pass", message: "Bolje da se ovde ne zaustavljamo." }],
  countries: [
    ["MAĐARSKA", 19.3, 46.35], ["RUMUNIJA", 21.9, 45.55], ["BUGARSKA", 23.15, 43.45], ["SEVERNA MAKEDONIJA", 21.6, 41.85],
    ["CRNA GORA", 19.35, 42.75], ["BOSNA I HERCEGOVINA", 18.65, 44.05], ["HRVATSKA", 18.55, 45.45],
  ],
  border: rsBorder,
  dashedBorder: rsDashed,
  rivers: rsRivers,
  finishEmoji: "🏁",
  overview: { x: 1866, y: 830, width: 1150, height: 1500 },
  credit: "Reljef: AWS Terrain Tiles (SRTM, GMTED2010, ETOPO1). Granice i rijeke: Natural Earth.",
};
