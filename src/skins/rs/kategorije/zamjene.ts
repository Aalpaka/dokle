// Zamene hrvatskih kategorija iz opštih grupa koje su o Hrvatskoj (isti slug, ista grupa, srpski sadržaj).
import type { SeedCategory } from "../../hr/categories";

export const rsZamjene: SeedCategory[] = [
  {
    slug: "dijalekt",
    group: "zaigrano",
    title: "Reč iz srpskog govora",
    hint: "Lokalizmi, vojvođanske reči, turcizmi i beogradski žargon",
    strip: [],
    answers: `Bre=8; More=4; Kvo=3; Keva=4; Ćale=4; Ortak=4; Klopa=3; Bleja=3; Fora=3; Kinta=3; Lova=3; Paor=3; Salaš=3; Sokak=3;
      Snaša=2; Ker=2; Frajla=2; Divaniti=2; Frtalj=2; Šamlica=2; Šparet=2; Šifonjer=2; Špajz=2; Kuruz=2; Pajtos=2; Kujna=1.5;
      Ajnfort=1.5; Gang=1; Andrmolj=1; Avlija=2; Komšija=2; Ćuprija=1; Kapija=1; Džaba=2; Jok=2; Đuskati=1.5; Smor=2; Cimer=1.5;
      Matori=1.5; Batica=1; Burazer=1.5; Gajba=1.5; Gajbica=0.5; Stari=1; Lik=1; Ribe=1; Kliker=0.5; Šljaka=1;
      Kafana=2; Lumpovati=1; Melem=0.5; Nafaka=0.5; Ćošak=1; Taze=0.5; Badava=0.5; Basamaci=0.5; Kaldrma=0.5;
      Đubre=1; Kibicovati=0.5; Ćorav=0.5; Pendžer=0.5; Ćilim=0.5; Ćasa=0.5; Šnajder=0.5; Ćušpajz=0.5; 
      Ladno=0.5; Ćebe=0.5; Đuvegija=0.2!; Ćuskija=0.2!`,
  },
  {
    slug: "hr-vladar",
    group: "kviz",
    title: "Srpski vladar, knez ili velikaš",
    hint: "Kralj, car, knez, despot ili velikaš, od Vlastimirovića do Karađorđevića",
    strip: ["kralj", "car", "knez", "despot"],
    answers: `Car Dušan/Dušan Silni/Stefan Dušan=15; Stefan Nemanja/Nemanja=12; Knez Lazar/Car Lazar/Lazar Hrebeljanović=12;
      Karađorđe/Đorđe Petrović=10; Knez Miloš/Miloš Obrenović=10; Sveti Sava/Rastko Nemanjić=6; Kralj Milutin/Stefan Milutin=5;
      Stefan Prvovenčani=5; Despot Stefan Lazarević/Stefan Lazarević=5; Đurađ Branković=4; Kralj Petar I/Petar I Karađorđević=5;
      Kralj Aleksandar/Aleksandar Karađorđević=5; Car Uroš/Stefan Uroš V=3; Kralj Vukašin/Vukašin Mrnjavčević=3;
      Kraljević Marko/Marko Mrnjavčević=4; Stefan Dečanski=3; Knez Mihailo/Mihailo Obrenović=3; Kralj Milan/Milan Obrenović=3;
      Aleksandar Obrenović=2; Kralj Petar II/Petar II Karađorđević=2; Stefan Radoslav=1;
      Stefan Vladislav=1; Stefan Uroš I=1; Dragutin/Kralj Dragutin=1.5; Vuk Branković=2; Miloš Obilić=2; 
      Jovan Uglješa=1; Despotica Jerina/Prokleta Jerina=1; Vlastimir=1; Mutimir=0.5; Petar Gojniković=0.5; Zaharija=0.3;
      Časlav Klonimirović/Časlav=0.2!; Mihailo Vojislavljević=0.2!`,
  },
  {
    slug: "hr-olimpijac",
    group: "kviz",
    title: "Srpski osvajač olimpijske medalje",
    hint: "Važe i medalje za Jugoslaviju i SCG",
    strip: [],
    answers: `Novak Đoković/Đoković=12; Milica Mandić=6; Nikola Jokić=6; Vlade Divac=5; Ivana Španović=5; Tijana Bošković=5;
      Dejan Bodiroga=3; Predrag Danilović=3; Žarko Paspalj=2; Aleksandar Đorđević=3; Bogdan Bogdanović=3; Vasilije Micić=2;
      Filip Filipović=5; Dušan Mandić=4; Andrija Prlainović=3; Vanja Udovičić=3; Aleksandar Šapić=4; Vladimir Vujasinović=2;
      Igor Milanović=2; Dejan Savić=2; Jasna Šekarić=5; Damir Mikec=3; 
      Milenko Zorić=2; Nikola Grbić=3; Vladimir Grbić=3; Ivan Miljković=3; Vladimir Batez=1; Goran Vujević=1;
      Đula Mešter=1; Brankica Mihajlović=2; Maja Ognjenović=2; Jovana Brakočević=2; Milena Rašić=1; Bojana Živković=1;
      Ana Antonijević=1; Stefan Jović=0.5; Dejan Majstorović=0.2!; Dušan Bulut=0.2!`,
  },
];
