import type { SkinMap } from "../types";
import { baBorder, baRivers } from "./mapGeo";

export const baMap: SkinMap = {
  image: { href: "/map/ba-reljef.jpg", x: 36.36, y: 350.58, width: 2012, height: 1196 },
  // približno stvarne ceste
  via: [
    [[18.85, 44.65]],
    [[18.31, 44.7]],
    [[17.66, 44.87], [17.42, 44.82]],
    [[16.95, 44.93]],
    [[16.45, 44.975], [16.3, 44.962], [16.23, 44.935], [16.15, 44.88]],
    [[16.37, 44.55], [16.77, 44.53], [17.08, 44.42]],
    [[17.4, 44.2], [17.58, 44.25]],
    [[17.8, 44.2]],
    [[18.12, 44.13], [18.18, 43.99]],
    [[18.2, 43.82], [18.1, 43.79]],
    [[17.76, 43.66], [17.82, 43.45]],
    [[17.96, 43.08], [18.09, 42.95]],
    [[18.15, 42.8], [17.96, 42.89], [17.75, 42.92]],
  ],
  ferries: [],
  towns: [
    ["Brčko", 18.81, 44.87], ["Zvornik", 19.1, 44.38], ["Gradačac", 18.43, 44.88], ["Srebrenik", 18.49, 44.71], ["Živinice", 18.65, 44.45],
    ["Maglaj", 18.1, 44.55], ["Tešanj", 17.99, 44.61], ["Derventa", 17.91, 44.98], ["Modriča", 18.3, 44.95], ["Prnjavor", 17.66, 44.87],
    ["Gradiška", 17.25, 45.14], ["Laktaši", 17.3, 44.91], ["Kozarska Dubica", 16.81, 45.18], ["Novi Grad", 16.29, 45.05],
    ["Bosanska Krupa", 16.15, 44.88], ["Cazin", 15.94, 44.97], ["Velika Kladuša", 15.81, 45.18], ["Sanski Most", 16.67, 44.77],
    ["Ključ", 16.77, 44.53], ["Bosanski Petrovac", 16.37, 44.55], ["Drvar", 16.38, 44.37], ["Glamoč", 16.85, 44.05], ["Livno", 17.01, 43.83],
    ["Tomislavgrad", 17.23, 43.72], ["Kupres", 17.28, 43.99], ["Bugojno", 17.45, 44.06], ["Mrkonjić Grad", 17.08, 44.42],
    ["Kotor Varoš", 17.37, 44.62], ["Teslić", 17.86, 44.61], ["Zavidovići", 18.15, 44.45], ["Kakanj", 18.12, 44.13], ["Visoko", 18.18, 43.99],
    ["Vareš", 18.33, 44.16], ["Kladanj", 18.69, 44.23], ["Vlasenica", 18.94, 44.18], ["Srebrenica", 19.3, 44.1], ["Višegrad", 19.29, 43.78],
    ["Goražde", 18.98, 43.67], ["Foča", 18.78, 43.51], ["Pale", 18.57, 43.82], ["Jablanica", 17.76, 43.66], ["Prozor", 17.61, 43.82],
    ["Posušje", 17.33, 43.47], ["Široki Brijeg", 17.59, 43.38], ["Ljubuški", 17.55, 43.2], ["Međugorje", 17.68, 43.19], ["Čapljina", 17.68, 43.12],
    ["Stolac", 17.96, 43.08], ["Nevesinje", 18.11, 43.26], ["Gacko", 18.53, 43.17], ["Bileća", 18.43, 42.87], ["Ljubinje", 18.09, 42.95],
  ],
  landmarks: [],
  countries: [
    ["HRVATSKA", 16.2, 45.45], ["SRBIJA", 19.85, 44.35], ["CRNA GORA", 19.15, 42.85], ["JADRANSKO MORE", 16.4, 42.95],
  ],
  border: baBorder,
  rivers: baRivers,
  overview: { x: 1065, y: 997, width: 1110, height: 1060 },
  credit: "Reljef: AWS Terrain Tiles (SRTM, GMTED2010, ETOPO1). Granice i rijeke: Natural Earth.",
};
