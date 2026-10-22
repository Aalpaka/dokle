// Domaće kategorije BiH, parovi preostalih hrvatskih: mediji, film, klubovi, treneri.
import type { SeedCategory } from "../../hr/categories";

export const baDomace6: SeedCategory[] = [
  {
    slug: "tv-lice",
    group: "ba",
    title: "TV voditelj ili novinar iz BiH",
    hint: "Voditelji, novinari, urednici, kolumnisti…",
    strip: ["voditelj", "voditeljica", "novinar", "novinarka"],
    answers: `Senad Hadžifejzović=12; Bakir Hadžiomerović=8; Avdo Avdić=6; Senad Pećanin=4; Senad Avdić=3; Zlatko Dizdarević=3;
      Gojko Berić=3; Duška Jurišić=2; Dragan Bursać=2; Emir Imamović Pirke/Pirke=2; Vildana Selimbegović=2; Željko Kopanja=1.5;
      Gordana Knežević=1; Boro Kontić=0.3!; Slobodan Vasković=0.3!`,
  },
  {
    slug: "tv-emisija",
    group: "ba",
    title: "Bh. film ili TV emisija",
    hint: "Igrani film iz BiH ili emisija s bh. televizije; serije ne vrijede",
    strip: ["film", "emisija"],
    answers: `Ničija zemlja=12; Top lista nadrealista/Nadrealisti=10; Grbavica=8; Quo vadis, Aida?=8;
      Sjećaš li se Dolly Bell=5; Otac na službenom putu=5; Valter brani Sarajevo/Valter=5; Face to Face=4; 60 minuta=4;
      Savršeni krug=3; Gori vatra=3; Kod amidže Idriza=3; Istraga=2; Cirkus Columbia=2; Ljeto u zlatnoj dolini=2; Snijeg=2; Go West=2;
      Epizoda u životu berača željeza=1.5; Smrt u Sarajevu=1; Na putu=1; Tigrovi=1; Teško je biti fin=1; Remake=1; Djeca=1; Most=1;
      Za one koji ne mogu da govore=0.3!; Jasmina=0.3!`,
  },
  {
    slug: "znanstvenik",
    group: "ba",
    title: "Umjetnik iz BiH: slikar, arhitekt ili režiser",
    hint: "Slikarstvo, kiparstvo, arhitektura, film ili pozorište, bilo kad",
    strip: [],
    answers: `Emir Kusturica/Kusturica=10; Danis Tanović=8; Jasmila Žbanić=8; Safet Zec=6; Mersad Berber=6; Ademir Kenović=4;
      Pjer Žalica=3; Aida Begić=3; Hajrudin Krvavac=3; Gabrijel Jurkić=2; Ismet Mujezinović=2; Juraj Neidhardt=2; Zlatko Ugljen=2;
      Srđan Vuletić=2; Ahmed Imamović=2; Dino Mustafić=1.5; Haris Pašović=1.5; Benjamin Filipović=1; Vojo Dimitrijević=1;
      Roman Petrović=1; Mevludin Ekmečić=1; Edo Numankadić=1; Jusuf Hadžifejzović=1; Šejla Kamerić=1; Lazar Drljača=0.3!;
      Affan Ramić=0.3!`,
  },
  {
    slug: "rukomet-vaterpolo",
    group: "ba",
    title: "Bh. sportaš izvan nogometa i košarke",
    hint: "Bilo koji drugi sport, i paraolimpijci; bilo koja generacija",
    strip: [],
    answers: `Amel Tuka/Tuka=12; Damir Džumhur/Džumhur=8; Larisa Cerić=5; Mirza Bašić=4; Hamza Alić=4; Mesud Pezer=4; Amel Mekić=3;
      Lana Pudar=3; Anton Josipović=3; Marijan Beneš=3; Kemal Mešić=2; Nerman Fatić=1; Danijel Šarić=2; Mirsad Terzić=2;
      Senjamin Burić=1.5; Benjamin Burić=1.5; Muhamed Toromanović=1; Abaz Arslanagić=1; Ermin Jusufović=1; Sabahudin Delalić=1;
      Safet Alibašić=0.3!; Mirzet Duran=0.3!`,
  },
  {
    slug: "hajduk",
    group: "ba",
    title: "Nogometaš Željezničara",
    hint: "Igrao za Želju bilo kad u historiji kluba",
    strip: [],
    answers: `Ivica Osim/Švabo=12; Edin Džeko/Džeko=10; Josip Katalinski=6; Mehmed Baždarević=5; Blagoje Bratić=4; Edin Bahtić=3;
      Haris Škoro=3; Josip Bukal=3; Enver Hadžiabdić=2; Mirsad Baljić=2; Vlado Čapljić=2; Radmilo Mihajlović=2; Hajrudin Saračević=2;
      Semir Štilić=1.5; Edin Višća=1.5; Sulejman Krpić=1; Zajko Zeba=0.3!`,
  },
  {
    slug: "dinamo",
    group: "ba",
    title: "Nogometaš FK Sarajeva",
    hint: "Igrao za Sarajevo bilo kad u historiji kluba",
    strip: [],
    answers: `Asim Ferhatović/Hase=12; Safet Sušić/Pape=10; Faruk Hadžibegić=6; Predrag Pašić=5; Husref Musemić=4; Fuad Muzurović=4;
      Boško Antić=3; Mirza Varešanović=3; Haris Duljević=2; Krste Velkoski=2; Gojko Cimirot=2; Amar Rahmanović=2; Benjamin Tatar=0.3!;
      Mersudin Ahmetović=0.3!`,
  },
  {
    slug: "trener",
    group: "ba",
    title: "Trener ili selektor iz BiH, bilo koji sport",
    hint: "Bilo koja generacija i bilo koji sport",
    strip: [],
    answers: `Ivica Osim/Švabo=14; Vahid Halilhodžić/Vaha=12; Mehmed Baždarević=6; Safet Sušić/Pape=6; Blaž Slišković/Baka=5;
      Dušan Bajević=4; Fuad Muzurović=3; Husref Musemić=2; Mirza Varešanović=2; Faruk Hadžibegić=2; Meho Kodro=0.3!;
      Abaz Arslanagić=0.3!`,
  },
];
