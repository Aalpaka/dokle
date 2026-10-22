// Domaće kategorije BiH (grupa "ba"), isti slugovi kao hrvatska grupa: isti dan igraju se usporedo
// (Rijeka u Hrvatskoj ↔ Rijeka u BiH). Gdje BiH nema par (otoci, more), slug dobiva najbliži bosanski sadržaj.
import type { SeedCategory } from "../../hr/categories";

const mjesto = ["grad", "selo", "mjesto"];

export const baDomace1: SeedCategory[] = [
  {
    slug: "rijeka",
    group: "ba",
    title: "Rijeka u BiH",
    strip: ["rijeka", "rijeku", "reka"],
    answers: `Drina=20; Neretva=18; Bosna=14; Una=10; Vrbas=9; Sava=8; Miljacka=6; Sana=4; Pliva=3; Buna=2.5; Trebišnjica=1.5;
      Spreča=2; Ukrina=1.5; Lašva=1.5; Rama=1.2; Krivaja=1; Fojnica=1; Željeznica=1; Prača=0.8; Unac=0.8; Sutjeska=0.8;
      Trebižat=0.6; Lim=0.6; Ćehotina=0.5; Drinjača=0.5; Vrbanja=0.5; Usora=0.5; Bregava=0.5; Žepa=0.4; Tinja=0.4; Jala=0.4;
      Ugar=0.4; Rzav=0.3; Tolisa=0.3; Janj=0.3; Bila=0.3; Sanica=0.3; Gomjenica=0.3; Rakitnica=0.3; Lištica=0.3; Radobolja=0.3;
      Japra=0.2; Krupa=0.2; Drežanka=0.2; Doljanka=0.2; Misoča=0.2; Stavnja=0.2; Kreševka=0.2; Zujevina=0.2; Dobrinja=0.2;
      Mlječanica=0.2; Oskova=0.2; Bistrica=0.2; Neretvica=0.2!; Klokot=0.15!; Krušnica=0.1; Mokranjska Miljacka=0.1;
      Paljanska Miljacka=0.1; Gostelja=0.1; Ljuta=0.1`,
  },
  {
    slug: "jelo",
    group: "ba",
    title: "Jelo iz bosanske kuhinje",
    strip: [],
    answers: `Ćevapi/Ćevapčići/Ćevap/Ćevapi u somunu=16; Burek/Pita mesnica/Pita sa mesom=12; Bosanski lonac/Lonac=6; Begova čorba=5; Sarma=5;
      Sirnica=5; Zeljanica=4; Krompiruša/Krumpiruša=4; Punjene paprike/Dolma/Dolme=4; Japrak/Japraci=3; Klepe=3; Pljeskavica=3;
      Baklava=3; Tufahija/Tufahije=2.5; Grah=2; Somun=2; Ćufte/Ćufteta=2; Suho meso=2; Janjetina/Janjetina na ražnju=2;
      Tikvenica=2; Musaka=1.5; Hurmašice/Hurmašica=1.5; Ćimbur=1.5; Pura/Kačamak=1.5; Sudžuk=1.5; Kajmak=1.5;
      Travnički sir/Vlašićki sir=1.5; Ispod sača/Teletina ispod sača=1.5; Sogan dolma=1; Đuveč=1; Kljukuša=1;
      Uštipci=1; Livanjski sir=1; Tulumbe/Tulumba=1; Ružice=1; Halva=1; Sutlijaš=1; Bamija=0.8; Ćulbastija=0.3!; Kadaif=0.5;
      Hadžijski ćevap=0.5; Pilav=0.5; Kalja=0.5; Tarhana=0.3!; Šampita=0.5; Jabukovača=0.5; Gurabije=0.5; Maslenica=0.3;
      Pastrmka=0.5; Pečenje=0.5; Mantije=1; Kiseli kupus=0.3; Kupusara=0.3; Šiš ćevap=0.2`,
  },
  {
    slug: "glazba",
    group: "ba",
    title: "Pjevač ili bend iz BiH",
    strip: ["grupa", "bend"],
    answers: `Dino Merlin/Merlin=12; Halid Bešlić/Halid=10; Bijelo dugme=10; Zabranjeno pušenje=5; Hari Mata Hari/Hari Varešanović=5;
      Plavi orkestar=4; Crvena jabuka=4; Indexi=3; Kemal Monteno=3; Dubioza kolektiv/Dubioza=3; Zdravko Čolić/Čola=3;
      Goran Bregović/Bregović=3; Hanka Paldum=2; Šemsa Suljaković=2; Edo Maajka=2; Jala Brat/Jala=2; Buba Corelli=2;
      Haris Džinović=2; Lepa Brena/Brena=2; Željko Bebek/Bebek=1.5; Selma Bajrami=1.5; Halid Muslimović=1.5; Safet Isović=1.5;
      Silvana Armenulić=1.5; Zaim Imamović=1; Himzo Polovina=1; Davorin Popović=1; Mladen Vojičić Tifa/Tifa=1;
      Alen Islamović=1; Nele Karajlić/Dr. Nele Karajlić=1; Kemal Malovčić=1; Maya Berović=1; Elvis J. Kurtović=0.8;
      Amira Medunjanin/Amira=0.8; Mostar Sevdah Reunion=0.8; Laka/Elvir Laković Laka=0.8; Deen=0.8; Divlje jagode=0.8;
      Božo Vrećo=0.6; Regina=0.6; Letu štuke=0.6; Frenkie=0.6; Seid Memić Vajta/Vajta=0.6; Šerif Konjević=0.6;
      Damir Imamović=0.5; Amila Glamočak=0.5; Vatreni poljubac=0.5; Jadranka Stojaković=0.5; Beba Selimović=0.5; Meho Puzić=0.5;
      Nedžad Salković=0.5; Saša Lošić/Loša=0.5; Konvoj=0.4; Teška industrija=0.4; Zehra Deović=0.4; Pro arte=0.4;
      Ambasadori=0.3; Asim Brkan=0.3; Hasiba Agić=0.3; Emina Zečaj=0.3; Sikter=0.3; Valentino=0.3; Sejo Sexon=0.3;
      Nervozni poštar=0.2!; Bombaj štampa=0.2!; Fazla=0.2`,
  },
  {
    slug: "klub",
    group: "ba",
    title: "Nogometni klub iz BiH",
    strip: ["fk", "nk", "hšk", "hsk"],
    answers: `Željezničar/Željo=18; Sarajevo=16; Velež=10; Zrinjski=10; Borac Banja Luka/Borac=8; Široki Brijeg=5;
      Sloboda Tuzla/Sloboda=5; Čelik Zenica/Čelik=5; Tuzla City=2; Radnik Bijeljina/Radnik=2; Igman Konjic/Igman=1.5; Posušje=1.5;
      Leotar=1.5; Rudar Prijedor/Rudar=1.5; Zvijezda 09=1; Sloga Doboj/Sloga=1; Olimpik=1; Travnik=1; Krupa=0.8;
      Mladost Doboj Kakanj=0.8; Jedinstvo Bihać/Jedinstvo=0.8; GOŠK Gabela/GOŠK=0.5; Budućnost Banovići/Budućnost=0.5;
      Orašje=0.5; Drina Zvornik/Drina=0.5; Slavija=0.5; Modriča=0.4; Kozara Gradiška/Kozara=0.4; Brotnjo=0.4; Vitez=0.4;
      Iskra Bugojno/Iskra=0.4; Laktaši=0.3; Gradina Srebrenik/Gradina=0.3; Bosna Visoko=0.3; Sutjeska Foča=0.3; TOŠK Tešanj/TOŠK=0.3;
      Zvijezda Gradačac=0.3; Žepče=0.2; Radnik Hadžići=0.2; Podrinje Janja=0.2; Bratstvo Gračanica=0.2!;
      Mladost Velika Obarska=0.2!; Famos Hrasnica=0.1; Ljubuški=0.1; Tomislav Tomislavgrad=0.1`,
  },
  {
    slug: "grad-kopno",
    group: "ba",
    title: "Grad u BiH",
    hint: "Bilo koji grad ili općinsko mjesto",
    strip: ["grad"],
    answers: `Sarajevo=18; Banja Luka=12; Mostar=10; Tuzla=8; Zenica=7; Bihać=5; Bijeljina=4; Brčko=3; Doboj=3; Travnik=3;
      Prijedor=3; Trebinje=3; Goražde=2; Konjic=2; Visoko=2; Jajce=2; Cazin=2; Međugorje=1; Livno=1.5; Bugojno=1.5; Gradačac=1.5;
      Zvornik=1.5; Foča=1.5; Višegrad=1.5; Srebrenica=1; Kakanj=1; Gradiška/Bosanska Gradiška=1; Široki Brijeg=1; Neum=1;
      Čapljina=1; Lukavac=1; Kiseljak=0.8; Velika Kladuša=0.8; Sanski Most=0.8; Pale=0.8; Fojnica=0.6; Vitez=0.6;
      Bosanska Krupa=0.6; Derventa=0.6; Gračanica=0.6; Živinice=0.6; Ilidža=0.6; Ljubuški=0.6; Ključ=0.5; Modriča=0.5;
      Bosanski Brod/Brod=0.5; Srebrenik=0.5; Čitluk=0.5; Tomislavgrad/Duvno=0.5; Tešanj=0.5; Bosanski Šamac/Šamac=0.4; Orašje=0.4;
      Banovići=0.4; Kladanj=0.4; Olovo=0.4; Vareš=0.4; Breza=0.4; Ilijaš=0.4; Bileća=0.4; Stolac=0.4; Grude=0.4; Posušje=0.4;
      Mrkonjić Grad=0.4; Teslić=0.4; Maglaj=0.4; Zavidovići=0.4; Novi Travnik=0.4; Jablanica=0.4; Novi Grad/Bosanski Novi=0.4;
      Laktaši=0.4; Istočno Sarajevo=0.4; Kalesija=0.3; Hadžići=0.3; Sokolac=0.3; Rogatica=0.3; Nevesinje=0.3; Gacko=0.3;
      Kupres=0.3; Drvar=0.3; Bosanski Petrovac/Petrovac=0.3; Žepče=0.3; Donji Vakuf=0.3; Gornji Vakuf/Uskoplje/Gornji Vakuf-Uskoplje=0.3;
      Prozor/Prozor-Rama=0.3; Kozarska Dubica/Bosanska Dubica=0.3; Prnjavor=0.3; Bratunac=0.3; Odžak=0.3; Vogošća=0.3;
      Čajniče=0.2; Rudo=0.2; Ljubinje=0.2; Glamoč=0.2; Bosansko Grahovo/Grahovo=0.2; Šipovo=0.2; Kotor Varoš=0.2; Kreševo=0.2;
      Busovača=0.2; Srbac=0.2; Čelinac=0.2; Vlasenica=0.2; Milići=0.2; Han Pijesak=0.2; Ugljevik=0.2; Lopare=0.2; Bužim=0.2;
      Trnovo=0.2; Kostajnica/Bosanska Kostajnica=0.1; Kalinovik=0.1!; Ravno=0.1!; Usora=0.05; Stanari=0.05;
      Pelagićevo=0.05; Doboj Istok=0.05; Sapna=0.05; Teočak=0.05; Domaljevac=0.05; Dobretići=0.05; Berkovići=0.05; Ribnik=0.05;
      Jezero=0.05; Kneževo=0.05; Oštra Luka=0.05; Novo Goražde=0.05; Ustikolina=0.05; Prača=0.05`,
  },
  {
    slug: "planina",
    group: "ba",
    title: "Planina ili brdo u BiH",
    strip: ["planina", "brdo", "gora"],
    answers: `Bjelašnica=14; Jahorina=14; Igman=10; Vlašić=8; Trebević=6; Maglić=5; Treskavica=4; Prenj=4; Čvrsnica=3; Velež=3;
      Romanija=3; Kozara=3; Zelengora=2.5; Vranica=2.5; Grmeč=2; Ozren=1.5; Majevica=1.5; Konjuh=1; Cincar=1; Visočica=1;
      Dinara=1; Vran=0.8; Raduša=0.6; Šator=0.6; Klekovača=0.6; Kamešnica=0.5; Plješevica=0.5; Orjen=0.5; Volujak=0.5; Hum=0.5;
      Manjača=0.5; Vitorog=0.4; Leotar=0.4; Ljubuša=0.3; Bitovnja=0.3; Borja=0.3; Motajica=0.3; Prosara=0.3; Vučevo=0.3;
      Čabulja=0.3; Zvijezda=0.3; Javor=0.2; Trebava=0.2; Tušnica=0.2; Lelija=0.2!; Crvanj=0.2!; Ivan planina/Ivan sedlo=0.2`,
  },
  {
    slug: "park",
    group: "ba",
    title: "Nacionalni park ili zaštićeno područje u BiH",
    hint: "Nacionalni park, park prirode, rezervat ili spomenik prirode",
    strip: ["park", "np", "pp", "nacionalni"],
    answers: `Sutjeska/NP Sutjeska/Tjentište=18; Una/NP Una=16; Kozara/NP Kozara=10; Blidinje/Park prirode Blidinje=6;
      Hutovo blato=6; Vrelo Bosne=5; Drina/NP Drina=4; Perućica=3; Skakavac=2; Bijambare=2; Štrbački buk=1.5; Vjetrenica=1.5;
      Kravice/Kravica=1.5; Trebević=1; Prokoško jezero=1; Plivska jezera=0.8; Vrelo Bune=0.8; Martin Brod=0.5; Konjuh=0.4;
      Tajan=0.3!; Bardača=0.3!; Bentbaša=0.1; Zelengora=0.1`,
  },
  {
    slug: "jezero",
    group: "ba",
    title: "Jezero u BiH",
    strip: ["jezero"],
    answers: `Jablaničko jezero/Jablaničko=10; Buško jezero/Buško blato=8; Boračko jezero/Boračko=8; Ramsko jezero/Ramsko=7;
      Plivsko jezero/Plivska jezera/Plivsko=6; Modrac=5; Prokoško jezero/Prokoško=4; Bilećko jezero/Bilećko=4;
      Panonska jezera/Panonsko jezero=4; Blidinjsko jezero/Blidinje=3; Zvorničko jezero=2; Perućac/Jezero Perućac=2;
      Višegradsko jezero=1; Salakovac=1; Balkana jezero/Balkana=1; Šatorsko jezero=1; Orlovačko jezero=1; Donje Bare=0.8;
      Bočac=0.8; Deransko jezero=0.8; Gornje Bare=0.5; Svitavsko jezero=0.3!; Štirinsko jezero=0.3!; Grabovica=0.2;
      Kruščičko jezero/Kruščica=0.1`,
  },
  {
    slug: "otok",
    group: "ba",
    title: "Grad ili mjesto u Hercegovini",
    hint: "BiH nema otoka, pa umjesto njih: grad, mjesto ili selo u Hercegovini",
    strip: mjesto,
    answers: `Mostar=20; Trebinje=10; Međugorje=7; Neum=6; Čapljina=5; Konjic=5; Široki Brijeg=4; Ljubuški=4; Stolac=4; Čitluk=3;
      Počitelj=3; Blagaj=3; Jablanica=3; Bileća=2.5; Nevesinje=2; Gacko=2; Posušje=2; Grude=2; Tomislavgrad/Duvno=1.5;
      Livno=1.5; Ljubinje=1; Prozor/Prozor-Rama=1; Ravno=0.5; Kupres=0.5; Glamoč=0.4; Berkovići=0.3; Drežnica=0.4; Buna=0.4;
      Žitomislići=0.4; Gabela=0.4; Domanovići=0.3; Hutovo=0.3; Vitina=0.3; Zavala=0.3; Klobuk=0.2; Tihaljina=0.2; Studenci=0.2;
      Grabovica=0.2; Rakitno=0.2; Vir=0.2; Kruševo=0.2; Čerin=0.2; Dubrave=0.2; Hodovo=0.2; Aladinići=0.2; Kosor=0.2;
      Bijelo Polje=0.2; Raška Gora=0.2; Avtovac=0.2; Tasovčići=0.2; Ivanica=0.1; Trebimlja=0.1; Fatnica=0.1; Borač=0.1;
      Struge=0.1; Ostrožac=0.1; Glavatičevo=0.1; Bijača=0.1; Zupci=0.1; Mosko=0.1; Lastva=0.05; Rotimlja=0.1!;
      Arslanagića Most=0.05!`,
  },
  {
    slug: "obala",
    group: "ba",
    title: "Grad ili mjesto na Neretvi, Uni ili Drini",
    hint: "BiH ima malo mora, pa umjesto obale: mjesto na jednoj od tri rijeke",
    strip: mjesto,
    answers: `Mostar=18; Višegrad=10; Bihać=10; Konjic=8; Zvornik=7; Goražde=6; Foča=6; Jablanica=5; Čapljina=4; Bosanska Krupa=4;
      Novi Grad/Bosanski Novi=3; Bratunac=2; Martin Brod=2; Počitelj=2; Kozarska Dubica/Bosanska Dubica=2; Kostajnica=1.5;
      Janja=1.5; Žitomislići=1; Gabela=1; Buna=1; Glavatičevo=1; Kulen Vakuf=1; Ripač=0.8; Bosanska Otoka/Otoka=0.8;
      Ustikolina=0.8; Skelani=0.5; Kozluk=0.3; Drinjača=0.3; Međeđa=0.3; Ustiprača=0.3; Grabovica=0.3; Drežnica=0.3;
      Ostrožac=0.3; Brod na Drini=0.2; Lohovo=0.2!; Ulog=0.2!`,
  },
];
