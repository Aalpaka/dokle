// Domaće kategorije Srbije, nastavak: imena, prezimena, političari, glumci, televizija.
import type { SeedCategory } from "../../hr/categories";

export const rsDomace3: SeedCategory[] = [
  {
    slug: "zensko-ime",
    group: "rs",
    title: "Žensko ime",
    strip: [],
    answers: `Jelena=6; Milica=6; Ana=5; Marija=5; Ivana=4; Jovana=4; Dragana=3; Tijana=3; Snežana=3; Gordana=3; Mirjana=3; Biljana=3;
      Vesna=3; Tanja=2.5; Svetlana=2.5; Danijela=2.5; Maja=2.5; Marina=2; Nataša=2; Katarina=2; Teodora=2; Sofija=2; Anđela=2; Mila=2;
      Sara=2; Nevena=2; Aleksandra=2; Kristina=1.5; Jasmina=1.5; Sanja=1.5; Slađana=1.5; Ljiljana=1.5; Milena=1.5; Bojana=1.5;
      Tamara=1.5; Dušica=1; Zorica=1; Zorana=1; Branka=1; Slavica=1; Radmila=1; Dragica=1; Olivera=1; Nada=1; Vera=1; Mira=1; Isidora=1;
      Lena=1; Lana=1; Nina=1; Dunja=1; Iva=1; Andrijana=1; Emilija=1; Danica=1; Valentina=1; Vanja=1; Ksenija=1; Natalija=1;
      Jelisaveta=0.8; Hana=0.8; Petra=0.8; Una=0.8; Ljubica=0.8; Desanka=0.5; Stanislava=0.5; Smilja=0.5; Milunka=0.5; Mileva=0.5;
      Nevenka=0.5; Ivona=0.5; Simona=0.5; Tea=0.5; Lea=0.5; Mia=0.5; Vasilija=0.3; Jagoda=0.3; Ruža=0.3; Zlata=0.3; Draginja=0.3;
      Persa=0.3; Kosara=0.3; Radojka=0.3; Stojanka=0.3; Spomenka=0.3; Ljubinka=0.3; Bosiljka=0.3; Dobrila=0.3; Vida=0.3;
      Vukosava=0.15!; Ilinka=0.15!`,
  },
  {
    slug: "musko-ime",
    group: "rs",
    title: "Muško ime",
    strip: [],
    answers: `Nikola=6; Marko=5; Stefan=5; Aleksandar=4; Milan=4; Luka=4; Nemanja=3; Miloš=3; Lazar=3; Dragan=3; Zoran=3; Goran=3;
      Vladimir=3; Petar=3; Nenad=2.5; Dejan=2.5; Đorđe=2.5; Dušan=2.5; Jovan=2.5; Uroš=2; Vuk=2; Ognjen=2; Filip=2; Slobodan=1.5;
      Srđan=1.5; Bojan=1.5; Darko=1.5; Saša=1.5; Igor=1.5; Ivan=1.5; Mihajlo=1.5; Danilo=1.5; Aleksa=1.5; Nebojša=1.5; Milorad=1;
      Miodrag=1; Mladen=1; Predrag=1; Branko=1; Veljko=1; Andrija=1; Pavle=1; Strahinja=1; Vasilije=1; David=1; Matija=1; Bogdan=1;
      Dimitrije=1; Sava=1; Andrej=1; Miroslav=1; Željko=1; Novak=1; Mateja=0.8; Dragoljub=0.5; Milovan=0.5; Dragiša=0.5;
      Radovan=0.5; Ratko=0.5; Živko=0.5; Momčilo=0.5; Velimir=0.5; Vojislav=0.5; Relja=0.5; Konstantin=0.5; Radoslav=0.5;
      Milutin=0.5; Zlatko=0.5; Dalibor=0.5; Rade=0.5; Mile=0.5; Žika=0.5; Mika=0.5; Pera=0.5; Stojan=0.5; Radomir=0.5; Čedomir=0.5;
      Vukašin=0.5; Živorad=0.3; Svetozar=0.3; Laza=0.3; Sima=0.3; Steva=0.3; Obrad=0.3; Blagoje=0.3; Tihomir=0.3; Budimir=0.3;
      Dobrivoje=0.2; Spasoje=0.15!; Milisav=0.15!`,
  },
  {
    slug: "prezime",
    group: "rs",
    title: "Srpsko prezime",
    strip: ["prezime"],
    answers: `Jovanović=6; Petrović=6; Nikolić=5; Marković=5; Đorđević=4; Stojanović=4; Ilić=3; Stanković=3; Pavlović=3; Milošević=3;
      Popović=3; Đukić=2; Kostić=2; Lazić=2; Mitrović=2; Simić=2; Todorović=2; Ristić=2; Živković=2; Kovačević=2; Savić=2; Vasić=2;
      Tomić=2; Đurić=2; Jović=1.5; Lukić=1.5; Milovanović=1.5; Radović=1.5; Stevanović=1.5; Obradović=1.5; Janković=1.5;
      Mihajlović=1.5; Ivanović=1.5; Radosavljević=1; Mladenović=1; Antić=1; Miletić=1; Marjanović=1; Božić=1; Babić=1; Milenković=1;
      Filipović=1; Gajić=1; Pešić=1; Nedeljković=1; Krstić=1; Zdravković=1; Novaković=1; Bogdanović=1; Mitić=1; Đoković=1;
      Dimitrijević=1; Aleksić=1; Milić=1; Stojković=1; Matić=1; Vuković=1; Kostadinović=0.5; Đokić=0.5; Arsić=0.5; Veljković=0.5;
      Tadić=0.5; Čolić=0.5; Spasić=0.5; Jakovljević=0.5; Milutinović=0.5; Nenadović=0.5; Obrenović=0.5; Karađorđević=0.5;
      Lazarević=0.5; Maksimović=0.5; Pantić=0.5; Perić=0.5; Ćirić=0.5; Gavrilović=0.5; Nemanjić=0.3; Popadić=0.3; Despotović=0.3;
      Šarčević=0.3; Prodanović=0.3; Bulatović=0.3; Hadži-Ristić=0.15!; Čarapić=0.15!`,
  },
  {
    slug: "politicar",
    group: "rs",
    title: "Srpski političar ili istorijska ličnost",
    hint: "Političar, knez, kralj, car ili državnik, i danas i kroz istoriju",
    strip: [],
    answers: `Aleksandar Vučić/Vučić=10; Slobodan Milošević=8; Zoran Đinđić/Đinđić=8; Josip Broz Tito/Tito=6; Karađorđe/Đorđe Petrović=5;
      Car Dušan/Dušan Silni/Stefan Dušan=5; Boris Tadić=4; Miloš Obrenović/Knez Miloš=4; Stefan Nemanja=4; Knez Lazar/Car Lazar=4;
      Vojislav Koštunica=3; Ivica Dačić=3; Tomislav Nikolić=3; Petar I Karađorđević/Kralj Petar=3;
      Aleksandar Karađorđević/Kralj Aleksandar=3; Sveti Sava=3; Nikola Pašić=3; Ana Brnabić=2; Vuk Drašković=2;
      Despot Stefan Lazarević=1.5; Čedomir Jovanović=1; Miloš Vučević=1; Đurađ Branković=1; Kralj Milutin=1; Stefan Prvovenčani=1;
      Mihailo Obrenović=1; Milan Obrenović=1; Aleksandar Obrenović=1; Aleksandar Ranković=1; Ivan Stambolić=1; Dobrica Ćosić=1;
      Ilija Garašanin=1; Dragan Đilas=1; Vuk Jeremić=1; Milan Panić=0.5; Zoran Živković=0.5; Mirko Cvetković=0.5;
      Svetozar Marković=0.5; Jovan Ristić=0.5; Milan Stojadinović=0.5; Nenad Čanak=0.5; Zdravko Ponoš=0.5; Bojan Pajtić=0.5;
      Siniša Mali=0.5; Zorana Mihajlović=0.5; Velimir Ilić=0.5; Mlađan Dinkić=0.5; Stojan Protić=0.2!; Dragoljub Mićunović=0.2!`,
  },
  {
    slug: "glumac-hr",
    group: "rs",
    title: "Srpski glumac ili glumica",
    strip: ["glumac", "glumica"],
    answers: `Dragan Nikolić/Gaga=6; Velimir Bata Živojinović/Bata Živojinović=6; Lazar Ristovski=5; Zoran Radmilović=5;
      Danilo Bata Stojković/Bata Stojković=5; Miodrag Petrović Čkalja/Čkalja=5; Miki Manojlović=4; Ljubiša Samardžić=4; Pavle Vuisić=4;
      Mija Aleksić=4; Nikola Simić=4; Milena Dravić=4; Sergej Trifunović=4; Nikola Kojo=4; Dragan Bjelogrlić=4; Miloš Biković=4;
      Mira Banjac=3; Mirjana Karanović=3; Nebojša Glogovac=3; Bora Todorović=3; Ružica Sokić=2; Seka Sablić=2; Milan Marić=2;
      Bogdan Diklić=2; Gordan Kičić=2; Nikola Đuričko=2; Branka Katić=2; Radoš Bajić=2; Žarko Laušević=2; Petar Božović=2;
      Ljuba Tadić=2; Dragomir Bojanić Gidra/Gidra=2; Voja Brajović=2; Vlastimir Đuza Stojiljković/Đuza=2; Aleksandar Berček=2;
      Branislav Lečić=1.5; Tihomir Stanić=1.5; Rade Marković=1.5; Bekim Fehmiu=1.5; Taško Načić=1.5; Žarko Radić=1.5;
      Svetozar Cvetković=1.5; Olivera Marković=1.5; Zoran Cvijanović=1.5; Anita Mančić=1; Sonja Savić=1; Mirjana Joković=1;
      Predrag Ejdus=1; Ljiljana Blagojević=1; Hristina Popović=1; Jelena Đokić=1; Vesna Trivalić=1; Danica Maksimović=1;
      Branimir Brstina=1; Uroš Đurić=1; Tamara Dragičević=1; Slavko Štimac=1; Sloboda Mićalović=1; Vojin Ćetković=1;
      Branislav Trifunović=1; Vuk Kostić=1; Bojan Žirović=0.5; Tanasije Uzunović=0.2!; Ljubomir Bandović=0.2!`,
  },
  {
    slug: "tv-lice",
    group: "rs",
    title: "TV voditelj ili novinar iz Srbije",
    hint: "Voditelji, novinari, komentatori…",
    strip: ["voditelj", "voditeljka", "novinar", "novinarka"],
    answers: `Ivan Ivanović=6; Milovan Ilić Minimaks/Minimaks=4; Zoran Kesić=4; Ognjen Amidžić=4; Olivera Kovačević=3; Milomir Marić=3;
      Jugoslav Ćosić=2; Mića Orlović=2; Mira Adanja Polak=2; Milojko Pantić=2; Jovana Joksimović=2; Tamara Grujić=2; Ana Mihajlovski=2;
      Bojana Lekić=1.5; Milan Kalinić=1.5; Dragan Nikitović=1; Snežana Dakić=1; Branko Kockica=1`,
  },
  {
    slug: "tv-emisija",
    group: "rs",
    title: "TV emisija, kviz ili rijaliti iz Srbije",
    hint: "Bilo šta sa srpske televizije osim serija i filmova",
    strip: ["emisija", "kviz", "show", "sou"],
    answers: `Slagalica=10; Zadruga=8; Zvezde Granda=6; Parovi=4; Veliki brat=4; Ko želi da bude milioner=4; Utisak nedelje=4;
      Dnevnik/Dnevnik RTS=3; Ja imam talenat=3; Ami G Show=3; Tvoje lice zvuči poznato=3; Farma=3; 24 minuta=3;
      Veče sa Ivanom Ivanovićem=3; Potera=3; Ćirilica=2; Pinkove zvezde=2; Survivor=2; Muzički tobogan=2; Bravo show=1; Grand show=1;
      Jutarnji program=1; Elita=1; Exathlon=1; Pevaj brate=1; Beogradska hronika=0.2!; Znanje-imanje=0.2!`,
  },
];
