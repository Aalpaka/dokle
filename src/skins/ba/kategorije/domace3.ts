// Domaće kategorije BiH, nastavak: imena, prezimena, političari, glumci.
import type { SeedCategory } from "../../hr/categories";

export const baDomace3: SeedCategory[] = [
  {
    slug: "zensko-ime",
    group: "ba",
    title: "Žensko ime",
    strip: [],
    answers: `Amina=4; Lejla=4; Amra=3; Emina=3; Jelena=3; Milica=3; Ana=3; Marija=3; Selma=2.5; Aida=2.5; Alma=2.5; Azra=2; Merima=2;
      Hana=2; Sara=2; Lana=2; Ajla=2; Belma=1.5; Lamija=1.5; Ema=1.5; Ivana=1.5; Dragana=1.5; Dženana=1.5; Amela=1.5; Jasmina=1.5;
      Maida=1; Medina=1; Šejla=1; Nejra=1; Adna=1; Esma=1; Fatima/Fata=1; Indira=1; Irma=1; Elma=1; Edina=1; Sabina=1; Sanela=1;
      Senada=1; Mirela=1; Sanja=1; Snježana=1; Gordana=1; Mirjana=1; Biljana=1; Vesna=1; Tanja=1; Svjetlana/Svetlana=1; Danijela=1;
      Maja=1; Marina=1; Nataša=1; Jovana=1; Tijana=1; Šemsa=0.8; Zehra=0.8; Zerina=0.8; Mirsada=0.8; Nermina=0.8; Nina=0.8; Amila=0.8;
      Anđela=0.8; Katarina=0.8; Mila=0.8; Sofija=0.8; Hajra=0.5; Hasiba=0.5; Dženita=0.5; Elvira=0.5; Emira=0.5; Enisa=0.5;
      Mejra=0.5; Nihada=0.5; Zejna=0.5; Alisa=0.5; Ajna=0.5; Asja=0.5; Dina=0.5; Dalila=0.5; Ena=0.5; Naida=0.5; Samira=0.5;
      Suada=0.5; Vildana=0.5; Teodora=0.5; Ivona=0.5; Martina=0.5; Petra=0.5; Lucija=0.5; Mia=0.5; Branka=0.5; Slavica=0.5;
      Zorica=0.5; Zumreta=0.3; Hatidža=0.3; Ilma=0.3; Mubera=0.3; Munira=0.3; Nedžada=0.3; Razija=0.3; Saliha=0.3; Sabiha=0.3;
      Sevda=0.3; Zlata=0.3; Dragica=0.3; Mara=0.3; Ljubica=0.3; Nada=0.3; Vera=0.3; Mira=0.3; Ranka=0.3; Refija=0.2; Zilha=0.2;
      Stoja=0.2; Rabija=0.2; Ćamka=0.1!; Đulsa=0.1!`,
  },
  {
    slug: "musko-ime",
    group: "ba",
    title: "Muško ime",
    strip: [],
    answers: `Amar=4; Emir=4; Adnan=3; Edin=3; Haris=3; Kenan=3; Mirza=3; Nikola=3; Marko=3; Armin=2.5; Admir=2.5; Adis=2; Amel=2;
      Alen=2; Almir=2; Anes=1.5; Benjamin=1.5; Belmin=1.5; Dino=1.5; Damir=2; Dženan=1.5; Elvir=1.5; Emin=1.5; Ermin=1.5; Faruk=1.5;
      Hamza=1.5; Harun=1.5; Hasan=1.5; Ibrahim=1.5; Jasmin=1.5; Kemal=1.5; Muhamed/Muhammed=1.5; Nedim=1.5; Samir=1.5; Senad=1.5;
      Tarik=1.5; Vedad=1; Zlatan=1; Stefan=1.5; Luka=1.5; Milan=1.5; Dragan=1.5; Zoran=1.5; Goran=1.5; Nenad=1; Dejan=1; Igor=1;
      Srđan=1; Saša=1; Bojan=1; Darko=1; Ivan=1.5; Josip=1; Mario=1; Ante=1; Mladen=1; Željko=1; Miloš=1; Dušan=1; Vladimir=1;
      Aleksandar=1; Petar=1; Đorđe=0.8; Ognjen=0.8; Lazar=0.8; Vuk=0.5; Džemal=0.8; Husein=0.8; Ismet=0.8; Kerim=0.8; Mahir=0.8;
      Mehmed=0.8; Mustafa=0.8; Nermin=0.8; Omer=0.8; Safet=0.8; Sead=0.8; Suad=0.8; Zijad=0.8; Ahmed=0.8; Alija=0.8; Asim=0.5;
      Avdo=0.5; Bakir=0.5; Dževad=0.5; Enes=0.5; Esad=0.5; Fikret=0.5; Hajrudin=0.5; Halid=0.5; Hamid=0.5; Ibro=0.5; Ismar=0.5;
      Izet=0.5; Jusuf=0.5; Kasim=0.5; Muhidin=0.5; Mujo=0.5; Haso=0.5; Nihad=0.5; Osman=0.5; Ramiz=0.5; Rasim=0.5; Refik=0.5;
      Sejo=0.3; Sulejman=0.5; Suljo=0.3; Šaban=0.3; Šefik=0.3; Zaim=0.3; Zijo=0.3; Slobodan=0.5; Branko=0.5; Ranko=0.3;
      Husnija=0.1!; Zuhdija=0.1!`,
  },
  {
    slug: "prezime",
    group: "ba",
    title: "Prezime iz BiH",
    strip: ["prezime"],
    answers: `Hodžić=4; Hadžić=3; Kovačević=3; Delić=3; Begić=3; Hasanović=3; Mehmedović=2.5; Omerović=2.5; Husić=2.5; Ibrahimović=2.5;
      Alić=2.5; Mujić=2; Halilović=2; Ahmetović=2; Bešić=2; Mešić=2; Smajić=2; Suljić=2; Salihović=2; Muminović=1.5; Karić=1.5;
      Hasić=1.5; Selimović=1.5; Imamović=1.5; Jusufović=1.5; Osmanović=1.5; Babić=1.5; Mahmutović=1.5; Mustafić=1.5; Softić=1;
      Spahić=1; Zukić=1; Avdić=1; Kurtović=1; Zec=1; Čolić=1; Džeko=1; Pjanić=0.8; Izetbegović=0.8; Savić=1.5; Jovanović=1.5;
      Petrović=1.5; Nikolić=1.5; Simić=1.5; Stojanović=1; Marković=1.5; Lukić=1; Đurić=1; Đukić=1; Popović=1; Tomić=1; Pavlović=1;
      Vasić=1; Mitrović=1; Stanković=1; Todorović=1; Lazić=1; Kovač=1; Marić=1.5; Jurić=1; Perić=1; Ćorić=1; Zovko=1;
      Prskalo=0.5; Jelić=0.5; Kraljević=0.5; Vidović=0.5; Grgić=0.5; Ivanković=0.5; Knezović=0.5; Bošnjak=0.5; Hadžiahmetović=0.5;
      Šehić=0.5; Šabić=0.5; Topić=0.5; Hamzić=0.5; Hadžiomerović=0.3; Bajrić=0.5; Ramić=0.5; Kadić=0.5; Hrustić=0.3; Pašić=0.5;
      Hamidović=0.5; Zahirović=0.3; Bajramović=0.5; Mujkić=0.3; Fazlić=0.3; Sarajlić=0.5; Mostarac=0.3; Tuzlak=0.2;
      Kulenović=0.2!; Sokolović=0.2!`,
  },
  {
    slug: "politicar",
    group: "ba",
    title: "Političar ili povijesna osoba iz BiH",
    hint: "Političar, ban, kralj ili državnik, i danas i kroz povijest",
    strip: [],
    answers: `Alija Izetbegović=15; Milorad Dodik/Dodik=12; Bakir Izetbegović=6; Dragan Čović/Čović=5; Željko Komšić/Komšić=5;
      Haris Silajdžić/Silajdžić=4; Denis Bećirović=3; Željka Cvijanović=3; Kulin ban/Ban Kulin=3; Tvrtko I/Tvrtko Kotromanić/Kralj Tvrtko=3;
      Husein-kapetan Gradaščević/Husein Gradaščević/Zmaj od Bosne=3; Nermin Nikšić=2; Elmedin Konaković=2; Zlatko Lagumdžija=2;
      Mladen Ivanić=2; Gazi Husrev-beg=2; Gavrilo Princip=2; Fahrudin Radončić=1.5; Mehmed-paša Sokolović=1.5; Džemal Bijedić=1.5;
      Nebojša Radmanović=1; Sulejman Tihić=1; Ejup Ganić=1; Borjana Krišto=1; Šefik Džaferović=1; Stjepan Kotromanić=1;
      Hrvoje Vukčić Hrvatinić=1; Herceg Stjepan Vukčić Kosača/Herceg Stjepan=1; Mehmed Spaho=1; Hamdija Pozderac=1;
      Branko Mikulić=1; Krešimir Zubak=0.5; Nikola Špirić=0.5; Zukan Helez=0.5; Sebija Izetbegović=0.5; Raif Dizdarević=0.5;
      Ali-paša Rizvanbegović=0.5; Stjepan Tomašević=0.5; Katarina Kosača/Kraljica Katarina=0.5; Ivo Miro Jović=0.2!; Avdo Humo=0.2!`,
  },
  {
    slug: "glumac-hr",
    group: "ba",
    title: "Glumac ili glumica iz BiH",
    strip: ["glumac", "glumica"],
    answers: `Emir Hadžihafizbegović=8; Branko Đurić/Đuro=6; Mustafa Nadarević=5; Zijah Sokolović=4; Boris Ler=2; Senad Bašić=2;
      Miraj Grbić=1.5; Ines Fančović=1.5; Moamer Kasumović=1.5; Admir Glamočak=1.5; Feđa Stukan=1.5; Davor Dujmović=1.5;
      Ermin Bravo=1; Jasna Žalica=1; Zana Marjanović=1; Nada Đurevska=1; Josip Pejaković=1; Slavko Štimac=1; Emir Kusturica=1;
      Zaim Muzaferija=0.8; Ermin Sijamija=0.5; Haris Burina=0.5; Selma Alispahić=0.5; Izudin Bajrović=0.5; Saša Petrović=0.5;
      Aleksandar Seksan=0.5; Adnan Hasković=0.5; Jasna Diklić=0.3; Nermin Tulić=0.2!; Mirsad Tuka=0.2!`,
  },
];
