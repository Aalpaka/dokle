// Domaće kategorije BiH, nastavak: regije i mjesta po slovu (parovi hrvatskih regija i "mjesto na slovo").
import type { SeedCategory } from "../../hr/categories";

const mjesto = ["grad", "selo", "mjesto"];

export const baDomace4: SeedCategory[] = [
  {
    slug: "slavonija",
    group: "ba",
    title: "Mjesto u Posavini ili Semberiji",
    hint: "Grad, mjesto ili selo",
    strip: mjesto,
    answers: `Bijeljina=12; Brčko=10; Orašje=5; Bosanski Brod/Brod=5; Bosanski Šamac/Šamac=4; Odžak=4; Derventa=4; Modriča=4;
      Gradačac=3; Janja=3; Gradiška/Bosanska Gradiška=2; Srbac=1.5; Ugljevik=1; Dvorovi=1; Domaljevac=1; Pelagićevo=0.5;
      Vukosavlje=0.5; Donji Žabar=0.5; Velika Obarska=0.5; Amajlije=0.3; Crnjelovo=0.3; Batković=0.3; Patkovača=0.3; Ljeljenča=0.3;
      Gornji Rahić=0.3; Brka=0.3; Maoča=0.2; Crkvina=0.2; Sijekovac=0.2; Tolisa=0.2!; Bosanski Kobaš/Kobaš=0.2!`,
  },
  {
    slug: "istra",
    group: "ba",
    title: "Mjesto u Podrinju ili istočnoj Bosni",
    hint: "Grad, mjesto ili selo",
    strip: mjesto,
    answers: `Zvornik=10; Višegrad=10; Foča=8; Goražde=8; Srebrenica=6; Bratunac=5; Pale=3; Rogatica=3; Rudo=2; Čajniče=2; Vlasenica=2;
      Sokolac=2; Milići=1.5; Han Pijesak=1.5; Kalinovik=1; Ustikolina=1; Skelani=1; Žepa=1; Potočari=1; Tjentište=1; Šekovići=1;
      Kozluk=0.5; Međeđa=0.5; Ustiprača=0.5; Dobrun=0.5; Miljevina=0.5; Prača=0.5; Novo Goražde=0.5; Osmaci=0.5; Drinjača=0.3;
      Podromanija=0.3; Mokro=0.3; Brod na Drini=0.2; Kopači=0.2; Vitkovići=0.2!; Konjević Polje=0.2!`,
  },
  {
    slug: "zagorje",
    group: "ba",
    title: "Mjesto u srednjoj Bosni",
    hint: "Grad, mjesto ili selo",
    strip: mjesto,
    answers: `Zenica=12; Travnik=10; Visoko=6; Kakanj=5; Vitez=4; Bugojno=4; Jajce=4; Busovača=3; Novi Travnik=3; Fojnica=3; Kiseljak=3;
      Donji Vakuf=2; Gornji Vakuf/Uskoplje=2; Kreševo=2; Vareš=2; Breza=2; Žepče=2; Zavidovići=2; Maglaj=2; Olovo=1; Prusac=1;
      Turbe=1; Vranduk=1; Kraljeva Sutjeska=1; Guča Gora=0.5; Nova Bila=0.5; Dobretići=0.3; Nemila=0.3; Kaćuni=0.3;
      Gromiljak=0.2!; Dolac na Lašvi=0.2!`,
  },
  {
    slug: "dalmatinska-zagora",
    group: "ba",
    title: "Mjesto u Bosanskoj krajini",
    hint: "Grad, mjesto ili selo na sjeverozapadu BiH",
    strip: mjesto,
    answers: `Banja Luka=15; Bihać=10; Prijedor=8; Cazin=5; Sanski Most=5; Velika Kladuša=4; Bosanska Krupa=4; Ključ=3;
      Mrkonjić Grad=3; Novi Grad/Bosanski Novi=3; Gradiška=3; Bosanski Petrovac=2; Drvar=2; Kozarska Dubica=2; Laktaši=2; Prnjavor=2;
      Čelinac=1; Kotor Varoš=1; Šipovo=1; Kostajnica=1; Bužim=1; Kulen Vakuf=1; Martin Brod=1; Srbac=1; Ribnik=0.5; Glamoč=0.5;
      Bosansko Grahovo=0.5; Omarska=0.5; Ljubija=0.5; Kozarac=0.5; Vrnograč=0.5; Oštra Luka=0.3; Kneževo/Skender Vakuf=0.3;
      Ripač=0.3; Otoka=0.3; Pećigrad=0.3; Kamengrad=0.2; Krupa na Vrbasu=0.2!; Ivanjska=0.2!`,
  },
  {
    slug: "lika-gorski",
    group: "ba",
    title: "Mjesto u Tuzlanskom ili Dobojskom kraju",
    hint: "Grad, mjesto ili selo na sjeveroistoku BiH",
    strip: mjesto,
    answers: `Tuzla=14; Doboj=10; Lukavac=5; Gračanica=5; Živinice=5; Srebrenik=4; Tešanj=4; Kalesija=3; Banovići=3; Teslić=3; Gradačac=3;
      Kladanj=2; Lopare=1.5; Ugljevik=1.5; Jelah=1; Sapna=0.5; Teočak=0.5; Doboj Istok=0.5; Petrovo=0.5; Stanari=0.5; Usora=0.5;
      Puračić=0.5; Dubrave=0.5; Đurđevik=0.5; Kreka=0.5; Tojšići=0.3; Simin Han=0.3; Dobošnica=0.3; Klokotnica=0.2;
      Kakmuž=0.2!; Bukinje=0.2!`,
  },
  {
    slug: "banovina",
    group: "ba",
    title: "Mjesto u okolici Sarajeva",
    hint: "Grad, mjesto ili selo u Sarajevskom kantonu ili Istočnom Sarajevu, bez gradskih kvartova",
    strip: mjesto,
    answers: `Ilidža=10; Vogošća=6; Pale=6; Hadžići=5; Ilijaš=5; Istočno Sarajevo=4; Trnovo=3; Hrasnica=3; Tarčin=3; Lukavica=2;
      Butmir=2; Rajlovac=2; Pazarić=2; Lukomir=2; Blažuj=1; Semizovac=1; Jahorina=1; Bjelašnica=1; Umoljani=1; Krupac=0.5;
      Kasindo=0.5; Rakovica=0.5; Podlugovi=0.3; Otes=0.3; Bioča=0.3; Mokro=0.3; Hotonj=0.2!; Ugorsko=0.2!`,
  },
  {
    slug: "otok-mjesto",
    group: "ba",
    title: "Mjesto u BiH na slovo G",
    hint: "Grad, mjesto ili selo kojem ime počinje na G",
    strip: mjesto,
    answers: `Goražde=10; Gradačac=6; Gračanica=6; Gradiška=5; Grude=4; Gacko=4; Glamoč=3; Gornji Vakuf=3; Grahovo/Bosansko Grahovo=1;
      Gabela=1; Guča Gora=0.5; Gromiljak=0.5; Grabovica=0.5; Glavatičevo=0.5; Gornja Tuzla=0.5; Grbavica=0.3; Gornji Šeher=0.3;
      Gornji Rahić=0.3; Gnojnice=0.2!; Gornja Slatina=0.1!`,
  },
  {
    slug: "mjesto-k",
    group: "ba",
    title: "Mjesto u BiH na slovo K",
    hint: "Grad, mjesto ili selo kojem ime počinje na K",
    strip: mjesto,
    answers: `Konjic=8; Kakanj=6; Kiseljak=6; Ključ=4; Kladanj=3; Kalesija=3; Kupres=3; Kreševo=3; Kozarska Dubica=3; Kotor Varoš=2;
      Kostajnica=2; Kalinovik=2; Kulen Vakuf=1.5; Kraljeva Sutjeska=1.5; Kneževo=1; Kozluk=1; Kozarac=1; Kravica=0.5; Kreka=0.5;
      Kulaši=0.5; Kosor=0.3; Klobuk=0.3; Kruševo=0.3; Kotorsko=0.3; Krupa na Vrbasu=0.3; Kasindo=0.3; Krupac=0.3; Konjević Polje=0.3;
      Kamengrad=0.3; Kakmuž=0.2; Kaćuni=0.2!; Klokotnica=0.2!`,
  },
  {
    slug: "mjesto-s",
    group: "ba",
    title: "Mjesto u BiH na slovo S",
    hint: "Grad, mjesto ili selo kojem ime počinje na S (ne na Š)",
    strip: mjesto,
    answers: `Sarajevo=20; Srebrenica=6; Sanski Most=5; Srebrenik=4; Stolac=4; Sokolac=3; Srbac=2; Skelani=1; Sapna=1; Stanari=1; Slatina=1;
      Semizovac=0.5; Simin Han=0.5; Stup=0.5; Skender Vakuf=0.5; Sanica=0.3; Studenci=0.3; Sijekovac=0.2!; Struge=0.2!`,
  },
  {
    slug: "mjesto-p",
    group: "ba",
    title: "Mjesto u BiH na slovo P",
    hint: "Grad, mjesto ili selo kojem ime počinje na P",
    strip: mjesto,
    answers: `Prijedor=10; Pale=8; Prnjavor=4; Posušje=4; Počitelj=4; Prozor/Prozor-Rama=3; Pelagićevo=1; Petrovo=1; Prusac=1; Pazarić=1;
      Potočari=1; Petrovac=0.5; Puračić=0.5; Prača=0.5; Podromanija=0.3; Podlugovi=0.3; Patkovača=0.3; Pećigrad=0.2!; Potoci=0.2!`,
  },
  {
    slug: "mjesto-b",
    group: "ba",
    title: "Mjesto u BiH na slovo B",
    hint: "Grad, mjesto ili selo kojem ime počinje na B",
    strip: mjesto,
    answers: `Banja Luka=15; Bihać=10; Bijeljina=8; Brčko=8; Bugojno=4; Bileća=3; Blagaj=3; Breza=2; Banovići=2; Busovača=2;
      Bratunac=2; Bosanska Krupa=2; Bosanski Brod=2; Bužim=1; Bosanski Šamac=1; Bosanski Petrovac=1; Bosansko Grahovo=1;
      Bosanska Gradiška=0.5; Berkovići=0.5; Butmir=0.5; Blažuj=0.5; Buna=0.5; Bosanski Novi=0.3; Bosanska Dubica=0.3; Bočac=0.3;
      Bukinje=0.3; Batković=0.3; Bijelo Polje=0.3; Brod na Drini=0.3; Bosanska Otoka=0.3; Bijača=0.2; Bioča=0.2; Borač=0.2;
      Bosanski Kobaš=0.2!; Bila=0.2!`,
  },
  {
    slug: "mjesto-v",
    group: "ba",
    title: "Mjesto u BiH na slovo V",
    hint: "Grad, mjesto ili selo kojem ime počinje na V",
    strip: mjesto,
    answers: `Visoko=8; Višegrad=8; Vitez=5; Velika Kladuša=5; Vareš=4; Vogošća=4; Vlasenica=2; Vranduk=2; Vukosavlje=0.5; Vitina=0.5;
      Vrnograč=0.5; Vir=0.3; Velika Obarska=0.3; Vitkovići=0.3; Vrhpolje=0.3; Varcar Vakuf=0.3; Vozuća=0.2!; Vidovice=0.2!`,
  },
  {
    slug: "mjesto-pridjev",
    group: "ba",
    title: "Mjesto koje počinje riječju Bosanski, Novi, Gornji, Donji, Veliki ili Istočni",
    hint: "Vrijedi i ženski i srednji rod: Bosanska, Novo, Gornja, Donje, Velika, Istočno…",
    strip: mjesto,
    answers: `Bosanski Brod=5; Bosanska Krupa=5; Velika Kladuša=6; Gornji Vakuf=6; Donji Vakuf=6; Novi Travnik=6; Novi Grad=5;
      Istočno Sarajevo=5; Bosanski Šamac=4; Bosanski Petrovac=4; Bosansko Grahovo=3; Bosanska Gradiška=3; Bosanski Novi=3;
      Bosanska Dubica=2; Bosanska Kostajnica=2; Novo Sarajevo=2; Novo Goražde=1; Donji Žabar=1; Gornja Tuzla=1; Istočni Mostar=1;
      Istočni Drvar=0.5; Istočna Ilidža=0.5; Istočni Stari Grad=0.3; Bosanska Otoka=0.5; Bosanski Kobaš=0.3; Velika Obarska=0.5;
      Gornji Šeher=0.5; Novi Šeher=0.3; Gornji Rahić=0.3; Gornja Slatina=0.2!; Donja Gradina=0.2!`,
  },
];
