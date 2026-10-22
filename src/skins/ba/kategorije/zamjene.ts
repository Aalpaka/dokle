// Zamjene hrvatskih kategorija iz općih grupa koje su o Hrvatskoj (isti slug, ista grupa, bosanski sadržaj).
import type { SeedCategory } from "../../hr/categories";

export const baZamjene: SeedCategory[] = [
  {
    slug: "dijalekt",
    group: "zaigrano",
    title: "Riječ iz bosanskog govora",
    hint: "Riječ koju ćeš čuti u BiH, i turcizmi iz svakodnevnog govora",
    strip: [],
    answers: `Bolan=8; Jaran/Jarane=6; Raja=5; Merak=5; Sevdah=4; Ćejf/Ćeif=4; Haman=3; Hajmo=3; Avlija=3; Kahva=3; Ćuprija=2; Dunjaluk=2;
      Jok=2; Halal=2; Sikter=2; Džaba=2; Mašala/Mašallah=2; Komšija=2; Mahala=2; Sokak=2; Akšam=1.5; Šeher=1.5; Inšala/Inšallah=1.5;
      Hairli/Hajirli=1; Sabah=1; Ahbab=1; Haber=1; Šejtan=1; Belaj=1; Ćorav=1; Kenjati=1; Insan=1; Burazer=1; Kapija=1; Ašik=1;
      Dert=1; Haram=1; Sevap=1; Pazar=1; Nafaka=1; Musafir=1; Dućan=1; Pendžer=1; Lahko=1; Đuture=0.5; Hasta=0.5; Hator=0.5;
      Taze=0.5; Kaldrma=0.5; Hrsuz=0.5; Baška=0.5; Badava=0.5; Jazuk=0.5; Ćorsokak=0.5; Zulum=0.5; Ahmak=0.5; Ćilim=0.5;
      Šićar=0.2!; Hendek=0.2!`,
  },
  {
    slug: "hr-vladar",
    group: "kviz",
    title: "Bosanski vladar, ban ili velikaš",
    hint: "Ban, kralj, herceg, velikaš ili namjesnik u Bosni, bilo kad",
    strip: ["kralj", "ban", "herceg"],
    answers: `Kulin ban/Ban Kulin/Kulin=15; Tvrtko I/Tvrtko Kotromanić/Kralj Tvrtko=12; Stjepan II. Kotromanić/Stjepan Kotromanić=6;
      Husein-kapetan Gradaščević/Husein Gradaščević/Zmaj od Bosne=5; Hrvoje Vukčić Hrvatinić/Hrvoje=4;
      Herceg Stjepan Vukčić Kosača/Herceg Stjepan/Stjepan Vukčić=4; Gazi Husrev-beg/Husrev-beg=4; Stjepan Tomašević=3;
      Katarina Kosača/Kraljica Katarina=3; Ali-paša Rizvanbegović=2; Mehmed-paša Sokolović=2; Isa-beg Ishaković=2; Alija Izetbegović=2;
      Stjepan Ostoja/Ostoja=1; Stjepan Dabiša/Dabiša=1; Tvrtko II=1; Stjepan Tomaš=1; Sandalj Hranić=1; Ban Borić/Borić=1;
      Ferhad-paša Sokolović=1; Benjamin Kállay/Kallay=1; Matej Ninoslav/Ninoslav=0.8; Stjepan I. Kotromanić=0.5; Jelena Gruba=0.5;
      Vlatko Vuković=0.5; Prijezda=0.2!; Pavle Radenović=0.2!`,
  },
  {
    slug: "hr-olimpijac",
    group: "kviz",
    title: "Olimpijski ili paraolimpijski medaljaš iz BiH",
    hint: "Vrijede i medalje sportaša iz BiH za Jugoslaviju, i sjedeća odbojka",
    strip: [],
    answers: `Mirza Delibašić/Kinđe=12; Dražen Dalipagić/Praja=8; Anton Josipović=6; Ermin Jusufović=4; Sabahudin Delalić=3;
      Safet Alibašić=3; Mirzet Duran=2; Žarko Varajić=3; Abaz Arslanagić=3; Milan Galić=2; Razija Mujanović=2;
      Sabit Hadžić=0.3!`,
  },
];
