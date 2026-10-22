import type { SkinMap } from "../types";
import { hrBorder, hrRivers } from "./mapGeo";

export const hrMap: SkinMap = {
  image: { href: "/map/hr-reljef.jpg", x: -375.76, y: 0, width: 2352, height: 1563 },
  // približno stvarne ceste; Istra je krug (do Pule preko Pazina, natrag preko Labina, Cresa i Krka)
  via: [
    [[18.88, 45.45]],
    [[18.55, 45.43]],
    [[18.25, 45.2]],
    // Slavonski Brod → Zagreb ide obilaznicom kroz Gornje Jesenje
    [[17.6, 45.2], [17.25, 45.27], [16.98, 45.34], [16.75, 45.47], [16.55, 45.7], [16.4, 45.88], [16.2, 46.03], [16.05, 46.13], [15.96, 46.17], [15.93, 46.06], [15.97, 45.93]],
    [[15.8, 45.72], [15.65, 45.62]],
    [[15.3, 45.4], [15.05, 45.37], [14.8, 45.4], [14.6, 45.35]],
    [[14.33, 45.35], [14.17, 45.3], [13.94, 45.24], [13.84, 45.12], [13.85, 44.97]],
    [
      [13.99, 45.04], [14.12, 45.09], [14.233, 45.145], [14.287, 45.133], [14.36, 45.05], [14.408, 44.962], [14.452, 44.954],
      [14.505, 45.025], [14.53, 45.12], [14.555, 45.21], [14.575, 45.255], [14.62, 45.235], [14.69, 45.175], [14.79, 45.13],
      [14.9, 44.99], [15.0, 44.97], [15.24, 44.87],
    ],
    [[15.55, 44.4], [15.62, 44.27], [15.45, 44.18]],
    [[15.4, 43.97], [15.68, 43.8]],
    [[16.0, 43.62], [16.25, 43.53]],
    [[16.69, 43.44], [16.85, 43.36]],
    [[17.35, 43.1], [17.45, 43.04], [17.57, 42.97], [17.55, 42.9]],
    [[17.89, 42.78], [18.0, 42.7]],
  ],
  ferries: [
    { name: "Brestova – Porozina", from: [14.233, 45.145], to: [14.287, 45.133] },
    { name: "Merag – Valbiska", from: [14.452, 44.954], to: [14.505, 45.025] },
  ],
  towns: [
    ["Ilok", 19.38, 45.22], ["Vinkovci", 18.8, 45.29], ["Županja", 18.7, 45.08], ["Našice", 18.1, 45.49], ["Valpovo", 18.42, 45.66],
    ["Beli Manastir", 18.6, 45.77], ["Virovitica", 17.38, 45.83], ["Slatina", 17.7, 45.7], ["Požega", 17.68, 45.34],
    ["Nova Gradiška", 17.38, 45.26], ["Daruvar", 17.22, 45.59], ["Pakrac", 17.19, 45.44], ["Kutina", 16.78, 45.48], ["Sisak", 16.37, 45.48],
    ["Petrinja", 16.28, 45.44], ["Bjelovar", 16.84, 45.9], ["Koprivnica", 16.83, 46.16], ["Đurđevac", 17.07, 46.04], ["Varaždin", 16.34, 46.3],
    ["Čakovec", 16.43, 46.38], ["Krapina", 15.87, 46.16], ["Velika Gorica", 16.07, 45.71], ["Samobor", 15.71, 45.8],
    ["Jastrebarsko", 15.65, 45.67], ["Ogulin", 15.23, 45.27], ["Slunj", 15.59, 45.12], ["Delnice", 14.8, 45.4], ["Opatija", 14.3, 45.34],
    ["Crikvenica", 14.69, 45.18], ["Novi Vinodolski", 14.79, 45.13], ["Senj", 14.9, 44.99], ["Krk", 14.57, 45.03], ["Cres", 14.41, 44.96],
    ["Mali Lošinj", 14.47, 44.53], ["Rab", 14.76, 44.76], ["Novalja", 14.89, 44.56], ["Pag", 15.06, 44.44], ["Karlobag", 15.08, 44.53],
    ["Otočac", 15.24, 44.87], ["Plitvička jezera", 15.62, 44.88], ["Gračac", 15.85, 44.3], ["Umag", 13.52, 45.43], ["Poreč", 13.59, 45.23],
    ["Rovinj", 13.64, 45.08], ["Pazin", 13.94, 45.24], ["Labin", 14.12, 45.09], ["Knin", 16.2, 44.04], ["Benkovac", 15.61, 44.03],
    ["Biograd", 15.44, 43.94], ["Vodice", 15.78, 43.76], ["Primošten", 15.92, 43.59], ["Trogir", 16.25, 43.52], ["Sinj", 16.64, 43.7],
    ["Omiš", 16.69, 43.44], ["Imotski", 17.22, 43.45], ["Supetar", 16.55, 43.38], ["Bol", 16.66, 43.26], ["Hvar", 16.44, 43.17],
    ["Vis", 16.19, 43.06], ["Vela Luka", 16.72, 42.96], ["Korčula", 17.13, 42.96], ["Orebić", 17.18, 42.97], ["Lastovo", 16.9, 42.77],
    ["Ploče", 17.43, 43.05], ["Metković", 17.65, 43.05], ["Cavtat", 18.22, 42.58],
  ],
  landmarks: [{ name: "Gornje Jesenje", lon: 15.96, lat: 46.17, kind: "crash", clip: "/sounds/gornje-jesenje.mp3" }],
  countries: [
    ["SLOVENIJA", 14.55, 46.15], ["MAĐARSKA", 17.6, 46.4], ["BOSNA I HERCEGOVINA", 17.6, 44.35], ["SRBIJA", 19.45, 44.7],
    ["ITALIJA", 13.0, 43.6], ["JADRANSKO MORE", 15.0, 43.4], ["CRNA GORA", 19.05, 42.75],
  ],
  border: hrBorder,
  rivers: hrRivers,
  overview: { x: 805, y: 796, width: 1620, height: 1540 },
  // Dubrovnik → Cavtat → Debeli Brijeg → Herceg Novi → trajekt Kamenari → Tivat → Budva
  overshootVia: [[18.22, 42.58], [18.4, 42.5], [18.54, 42.45], [18.68, 42.46], [18.7, 42.43], [18.78, 42.33]],
  heliClip: true,
  credit: "Reljef: AWS Terrain Tiles (SRTM, GMTED2010, ETOPO1). Granice i rijeke: Natural Earth.",
};
