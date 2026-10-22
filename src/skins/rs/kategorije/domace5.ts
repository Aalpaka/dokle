// Domaće kategorije Srbije, nastavak: znamenitosti, sport, mediji, Beograd, običaji, književnost, stranke.
import type { SeedCategory } from "../../hr/categories";

export const rsDomace5: SeedCategory[] = [
  {
    slug: "znamenitost",
    group: "rs",
    title: "Znamenitost ili turistička atrakcija u Srbiji",
    hint: "Građevina, spomenik, muzej ili prirodna atrakcija (ne ceo grad)",
    strip: [],
    answers: `Kalemegdan=12; Hram Svetog Save/Hram=10; Petrovaradinska tvrđava/Petrovaradin=8; Skadarlija=4; Knez Mihailova=4; Ada Ciganlija=4;
      Avalski toranj=4; Đavolja varoš=4; Golubačka tvrđava=4; Studenica=3; Ćele kula=3; Lepenski vir=3; Drvengrad/Mećavnik=3;
      Šarganska osmica=3; Gamzigrad/Felix Romuliana=2; Viminacijum=2; Oplenac=2; Gradska kuća u Subotici/Gradska kuća=2;
      Narodna skupština/Skupština=2; Muzej Nikole Tesle=2; Kuća cveća=2; Pobednik=2; Smederevska tvrđava=2; Đerdapska klisura/Đerdap=2;
      Meandri Uvca/Uvac=2; Mileševa=1.5; Niška tvrđava=1.5; Resavska pećina=1.5; Most na Adi=1.5; Gardoš=1.5; Gazela=1; Beogradska arena=1;
      Žiča=1; Manasija=1; Ravanica=1; Sopoćani=1; Narodni muzej=1; Beograd na vodi=1; Šumarice=1; Sirogojno=1; Krušedol=0.5; Tršić=0.5;
      Fetislam=0.5; Medijana=0.2!; Bubanj=0.2!`,
  },
  {
    slug: "festival",
    group: "rs",
    title: "Festival ili manifestacija u Srbiji",
    hint: "Muzički, filmski, folklorni, sportski ili gastro događaj, danas ili nekad",
    strip: ["festival"],
    answers: `Exit=15; Guča/Sabor trubača/Dragačevski sabor=12; Nišville=4; Beer Fest/Belgrade Beer Fest=4; Roštiljijada=3; Bitef=2; Fest=2;
      Kobasicijada=2; Arsenal Fest=1.5; Gitarijada=1.5; Pasuljijada=1; Slaninijada=1; Kupusijada=1; Dužijanca=1; Lovefest=1;
      Kustendorf=1; Sterijino pozorje=1; Beogradski džez festival/Jazz festival=1; Palić film festival=1; Dani piva=1;
      Vrnjački karneval=1; Mokranjčevi dani=0.5; Bemus=0.5; Festival filmskog scenarija=0.5; Joakimfest=0.5; Kosidba na Rajcu=0.2!;
      Grožđebal=0.2!`,
  },
  {
    slug: "znanstvenik",
    group: "rs",
    title: "Srpski naučnik ili pronalazač",
    hint: "Naučnik, pronalazač ili lekar, bilo kad",
    strip: [],
    answers: `Nikola Tesla/Tesla=30; Mihajlo Pupin/Pupin=10; Milutin Milanković/Milanković=8; Mihailo Petrović Alas/Mika Alas=4; Josif Pančić=3;
      Jovan Cvijić=3; Mileva Marić=2; Đorđe Stanojević=1; Ognjeslav Kostović=1; Pavle Savić=1; Vuk Karadžić=1; Vladan Đorđević=0.5;
      Jovan Karamata=0.5; Dragoslav Srejović=0.5; Sima Lozanić=0.5; Gordana Vunjak-Novaković=0.5; Milan Jovanović Batut/Batut=0.2!;
      Ivan Đaja=0.2!`,
  },
  {
    slug: "kosarkas",
    group: "rs",
    title: "Srpski košarkaš ili košarkašica",
    hint: "Bilo koja generacija",
    strip: [],
    answers: `Nikola Jokić/Jokić=15; Vlade Divac/Divac=10; Dejan Bodiroga=6; Peja Stojaković/Predrag Stojaković=5; Miloš Teodosić=5;
      Saša Đorđević/Aleksandar Đorđević=4; Predrag Danilović=4; Bogdan Bogdanović=4; Vasilije Micić=3; Boban Marjanović=3;
      Radivoj Korać=3; Dragan Kićanović=2; Nemanja Bjelica=2; Darko Miličić=2; Željko Rebrača=2; Dražen Dalipagić=2; Zoran Slavnić=1.5;
      Nikola Kalinić=1; Nikola Milutinov=1; Nemanja Nedović=1; Vladimir Radmanović=1; Igor Rakočević=1; Marko Jarić=1;
      Milan Gurović=1; Žarko Paspalj=1; Dejan Tomašević=1; Ana Dabović=1; Stefan Jović=0.5; Marko Simonović=0.5; Sonja Vasić=0.5;
      Jelena Brooks=0.5; Milica Dabović=0.5; Stefan Marković=0.5; Novica Veličković=0.5; Aleksa Avramović=0.5; Nikola Topić=0.5;
      Uroš Tripković=0.5; Nevena Jovanović=0.3; Filip Petrušev=0.3; Dragan Tarlać=0.2!; Kosta Perović=0.2!`,
  },
  {
    slug: "rukomet-vaterpolo",
    group: "rs",
    title: "Srpski vaterpolista ili odbojkaš",
    hint: "Vaterpolo ili odbojka, muški ili ženski, bilo koja generacija",
    strip: [],
    answers: `Filip Filipović=8; Aleksandar Šapić=5; Tijana Bošković=5; Dušan Mandić=4; Andrija Prlainović=4; Vanja Udovičić=3;
      Vladimir Grbić=3; Nikola Grbić=3; Ivan Miljković=3; Vladimir Vujasinović=2; Slobodan Nikić=2; Živko Gocić=2; Maja Ognjenović=2;
      Brankica Mihajlović=2; Milan Aleksić=1; Nikola Rađen=1; Branislav Mitrović=1; Gojko Pijetlović=1; Duško Pijetlović=1;
      Stefan Mitrović=1; Igor Milanović=1; Dejan Savić=1; Danilo Ikodinović=1; Andrija Gerić=1; Goran Vujević=1; Đula Mešter=1;
      Uroš Kovačević=1; Aleksandar Atanasijević=1; Milena Rašić=1; Jovana Stevanović=1; Bojana Živković=1; Stefana Veljković=1;
      Jelena Nikolić=1; Nikola Jakšić=0.5; Viktor Rašović=0.5; Slobodan Boškan=0.5; Vasa Mijić=0.5; Veljko Petković=0.5;
      Slobodan Kovač=0.5; Marko Ivović=0.5; Bianka Buša=0.5; Silvija Popović=0.2!; Ana Bjelica=0.2!`,
  },
  {
    slug: "hajduk",
    group: "rs",
    title: "Fudbaler Crvene zvezde",
    hint: "Igrao za Zvezdu bilo kad u istoriji kluba",
    strip: [],
    answers: `Dragan Džajić/Džaja=8; Dragan Stojković Piksi/Piksi=8; Dejan Savićević=6; Robert Prosinečki=5; Siniša Mihajlović=5;
      Darko Pančev=5; Dejan Stanković=4; Rajko Mitić=4; Vladimir Jugović=3; Dragoslav Šekularac/Šeki=3; Miodrag Belodedić=2;
      Dušan Savić=2; Vladimir Petrović Pižon/Pižon=2; Bora Kostić=2; Stevan Stojanović=2; Nemanja Vidić=2; Nikola Žigić=2; Luka Jović=2;
      Vladimir Beara=1; Zoran Filipović=1; Milko Đurovski=1; Boško Đurovski=1; Refik Šabanadžović=1; Boško Janković=1;
      Aleksandar Katai=1; Mirko Ivanić=1; Milan Borjan=1; Guélor Kanga/Kanga=1; El Fardou Ben/Ben=1; Vladan Lukić=1; Goran Drulić=1;
      Perica Ognjenović=1; Darko Kovačević=1; Vojin Lazarević=1; Slobodan Marović=0.5; Ilija Najdoski=0.5; Milan Biševac=0.5;
      Ognjen Koroman=0.5; Dušan Basta=0.5; Marko Marin=0.5; Richmond Boakye=0.5; Osman Bukari=0.5; Hugo Vieira=0.5;
      Nenad Krstičić=0.5; Filip Stojković=0.5; Dejan Joveljić=0.5; Mihailo Pjanović=0.5; Dejan Petković Rambo=0.5;
      Zvonko Milojević=0.2!; Duško Radinović=0.2!`,
  },
  {
    slug: "dinamo",
    group: "rs",
    title: "Fudbaler Partizana",
    hint: "Igrao za Partizan bilo kad u istoriji kluba",
    strip: [],
    answers: `Predrag Mijatović=4; Savo Milošević=4; Mateja Kežman=4; Saša Ilić=4; Aleksandar Mitrović=4; Milan Galić=3; Stjepan Bobek=3;
      Momčilo Vukotić/Moca Vukotić=3; Stevan Jovetić=3; Adem Ljajić=2; Lazar Marković=2; Danko Lazović=2; Dragan Mance=2;
      Fahrudin Jusufi=1.5; Velibor Vasović=1.5; Zoran Tošić=1; Milutin Šoškić=1; Nenad Bjeković=1; Zvonko Živković=1; Fadil Vokrri=1;
      Ivica Kralj=1; Ivan Tomić=1; Cléo=1; Vladimir Stojković=1; Ricardo Gomes=1; Bibras Natcho=1; Vladimir Vermezović=0.5;
      Gordan Petrić=0.5; Albert Nađ=0.5; Igor Duljaj=0.5; Marko Lomić=0.5; Marko Šćepović=0.5; Almami Moreira=0.5;
      Ivan Stevanović=0.5; Uroš Đurđević=0.5; Leandre Tawamba=0.5; Seydouba Soumah/Soumah=0.5; Takuma Asano=0.5;
      Filip Stevanović=0.5; Saša Zdjelar=0.2!; Nemanja Rnić=0.2!`,
  },
  {
    slug: "trener",
    group: "rs",
    title: "Srpski trener ili selektor, bilo koji sport",
    hint: "Bilo koja generacija i bilo koji sport",
    strip: [],
    answers: `Željko Obradović=8; Svetislav Pešić=6; Dušan Ivković/Duda Ivković=6; Božidar Maljković=5; Dragan Stojković Piksi=5;
      Radomir Antić=4; Vujadin Boškov=4; Siniša Mihajlović=3; Miljan Miljanić=3; Aleksandar Nikolić/Aca Nikolić=3; Zoran Terzić=2;
      Nikola Grbić=2; Aleksandar Đorđević=2; Ljubiša Tumbaković=2; Dejan Stanković=2; Miroslav Đukić=1; Ljubinko Drulović=1;
      Igor Kokoškov=1; Dejan Savić=1; Saša Obradović=1; Dejan Radonjić=1; Ilija Petković=1; Slavoljub Muslin=1; Vladan Milojević=1;
      Ranko Žeravica=1; Dragan Šakota=1; Dejan Udovičić=0.5; Dragan Okuka=0.5; Nebojša Popović=0.5; Zoran Gajić=0.5;
      Ranko Popović=0.3; Ratko Dostanić=0.2!; Milan Živadinović=0.2!`,
  },
  {
    slug: "klub-ostalo",
    group: "rs",
    title: "Srpski sportski klub van fudbala",
    hint: "Košarka, rukomet, vaterpolo, odbojka, hokej..., danas ili nekad",
    strip: ["kk", "rk", "vk", "ok", "hk", "zkk", "okk"],
    answers: `KK Crvena zvezda/Crvena zvezda/Zvezda=10; KK Partizan/Partizan=10; Vojvodina=3; Mega/Mega Basket=3; VK Partizan=3; FMP=2;
      Radnički Kragujevac=2; OKK Beograd=2; Hemofarm/Vršac=2; VK Crvena zvezda=2; RK Vojvodina=2; Metaloplastika=2; Borac Čačak=1;
      Metalac Valjevo=1; RK Partizan=1; RK Crvena zvezda=1; OK Vojvodina=1; OK Crvena zvezda=1; OK Partizan=0.5; HK Partizan=0.5;
      HK Crvena zvezda=0.5; Spartak Subotica=0.5; ŽKK Crvena zvezda=0.5; Beobanka=0.2!; Dinamo Pančevo=0.2!`,
  },
  {
    slug: "medij",
    group: "rs",
    title: "Srpske novine, TV, radio ili portal",
    hint: "Danas ili nekad",
    strip: [],
    answers: `RTS=10; Pink/TV Pink=8; Politika=8; Blic=6; Kurir=5; Večernje novosti/Novosti=5; Informer=4; N1=4; B92=4; Danas=3; Nova S/Nova=3;
      Prva=3; Studio B=3; Happy=2; Radio Beograd=2; NIN=2; Vreme=2; Politikin Zabavnik/Zabavnik=2; RTV/RTV Vojvodina=2;
      Sportski žurnal=1.5; Radio S=1; Naxi=1; Nedeljnik=1; Mondo=1; Telegraf=1; Nova.rs=1; Alo=1; Dnevnik=1; O2=0.5; Mozzart Sport=0.5;
      Ilustrovana politika=0.5; Magyar Szó=0.3; Duga=0.2!; Radio 202=0.2!`,
  },
  {
    slug: "trgovina",
    group: "rs",
    title: "Prodavnica, lanac ili tržni centar u Srbiji",
    hint: "Supermarket, radnja, lanac ili tržni centar, danas ili nekad",
    strip: ["prodavnica", "market", "supermarket"],
    answers: `Maxi=10; Idea=8; Lidl=8; Univerexport=4; Mercator=4; Roda=3; Tempo=3; Aman=3; DIS=3; Lilly=3; DM=3; Gomex=2; C market=2;
      Robne kuće Beograd/RKB=2; Ušće/Ušće Shopping Center=2; Delta City=2; Galerija=2; Gigatron=2; Shop&Go=1; Super Vero=1; Metro=1;
      Big Fashion=1; Rajićeva=1; Promenada=1; Win Win=1; Tehnomanija=1; Ikea=1; Jumbo=0.5; Pekabeta=0.2!; Merkur=0.2!`,
  },
  {
    slug: "zagreb-ulica",
    group: "rs",
    title: "Ulica, trg ili park u Beogradu",
    hint: "Ulica, bulevar, trg, park ili šetalište",
    strip: ["ulica", "trg", "park"],
    answers: `Knez Mihailova=12; Terazije=6; Trg republike=6; Slavija=5; Skadarlija/Skadarska=5; Kalemegdan=4; Bulevar kralja Aleksandra=4;
      Kralja Milana=3; Tašmajdan=3; Nemanjina=2; Bulevar Mihajla Pupina=2; Strahinjića Bana=2; Studentski trg=2; Trg Nikole Pašića=2;
      Pionirski park=1.5; Bulevar Zorana Đinđića=1; Takovska=1; Karađorđeva=1; Cara Dušana=1; Topčiderski park=1; Ušće=1;
      Karađorđev park=1; Vojvode Stepe=1; Južni bulevar=1; Bulevar oslobođenja=1; Makedonska=0.5; Kosovska=0.5; Resavska=0.5;
      Njegoševa=0.5; Svetogorska=0.5; Gavrila Principa=0.5; Balkanska=0.5; Vasina=0.5; Hajd park=0.5; Bulevar despota Stefana=0.5;
      Glavna=0.5; Obilićev venac=0.5; Cetinjska=0.5; Kosančićev venac=0.2!; Zmaj Jovina=0.2!`,
  },
  {
    slug: "kvart-grad",
    group: "rs",
    title: "Kvart u Novom Sadu ili Nišu",
    hint: "Gradska četvrt, kvart ili naselje u jednom od ta dva grada",
    strip: [],
    answers: `Liman=6; Grbavica=4; Detelinara=4; Petrovaradin=4; Novo naselje=3; Telep=3; Podbara=2; Salajka=2; Pantelej=2; Medijana=2;
      Adice=1; Klisa=1; Satelit=1; Rotkvarija=1; Sremska Kamenica=1; Veternik=1; Stari grad=1; Palilula=1; Crveni krst=1; Čair=1;
      Durlan=1; Duvanište=1; Jagodin mala=1; Avijatičarsko naselje=0.5; Banatić=0.5; Ledena stena=0.5; Delijski vis=0.5;
      Brzi Brod=0.5; Šangaj=0.2!; Krive livade=0.2!`,
  },
  {
    slug: "plaza-hr",
    group: "rs",
    title: "Plaža ili kupalište u Srbiji",
    hint: "Ime plaže ili kupališta na reci ili jezeru",
    strip: ["plaza", "kupaliste"],
    answers: `Ada Ciganlija/Ada=15; Štrand=10; Srebrno jezero=6; Palić=5; Lido=4; Perućac=3; Belocrkvanska jezera/Bela Crkva=3; Drina=2;
      Zlatarsko jezero=2; Borsko jezero=1.5; Vlasinsko jezero=1; Bovansko jezero=1; Veliko ratno ostrvo=1; Ušće=1; Zaovine=0.5;
      Garaši=0.3; Oficirac=0.2!; Šodroš=0.2!`,
  },
  {
    slug: "spilja-slap",
    group: "rs",
    title: "Pećina ili vodopad u Srbiji",
    hint: "Pećina, jama, ponor ili vodopad",
    strip: ["pecina", "jama", "vodopad", "slap", "buk"],
    answers: `Resavska pećina=10; Lazareva pećina/Zlotska pećina=5; Potpećka pećina/Potpeć=5; Stopića pećina=5; Rajkova pećina=3;
      Veliki buk/Lisine=3; Gostiljski vodopad/Gostilje=3; Ceremošnja=2; Kopren=2; Jelovarnik=2; Bigar=2; Prskalo=1; Ripaljka=1;
      Tupavica=1; Prekonoška pećina=1; Petnička pećina=1; Hadži-Prodanova pećina=1; Risovača=1; Bogovinska pećina=1;
      Uvačka pećina/Ušačka pećina=1; Vernjikica=0.2!; Degurićka pećina=0.2!`,
  },
  {
    slug: "obicaj",
    group: "rs",
    title: "Srpski običaj, tradicija ili narodno kolo",
    hint: "Običaj, praznični ritual, narodna igra, pesma ili rukotvorina",
    strip: [],
    answers: `Krsna slava/Slava=12; Božić=6; Badnji dan/Badnjak=5; Uskrs=5; Kolo=5; Đurđevdan=4; Česnica=3; Ispraćaj=3; Vidovdan=2; Svadba=2;
      Srpska nova godina/Pravoslavna Nova godina=2; Kumstvo/Kum=2; Sveti Sava=2; Farbanje jaja/Uskršnja jaja=2; Prelo=1; Moba=1;
      Koljivo/Žito=1; Lazarice=1; Vrbica=1; Sabor=1; Vašar=1; Litija=1; Guslanje/Gusle=1; Ilindan=1; Petrovdan=1; Mitrovdan=1;
      Polaženik=1; Tucanje jajima=1; Opanci=1; Pirotski ćilim=1; Šajkača=1; Zdravica=1; Bajanje=0.5; Pobratimstvo=0.5; Ivanjdan=0.5;
      Kraljice=0.2!; Dodole=0.2!`,
  },
  {
    slug: "knjizevno-djelo",
    group: "rs",
    title: "Delo srpske književnosti ili lektira",
    hint: "Naslov romana, drame, pesme ili zbirke",
    strip: [],
    answers: `Na Drini ćuprija=10; Gorski vijenac=8; Nečista krv=6; Derviš i smrt=6; Pop Ćira i pop Spira=5; Gospođa ministarka=5; Koštana=4;
      Seobe=4; Hazarski rečnik=4; Prokleta avlija=4; Zona Zamfirova=4; Krvava bajka=4; Sumnjivo lice=3; Travnička hronika=3;
      Orlovi rano lete=3; Ježeva kućica=3; Ožalošćena porodica=2; Hajduk Stanko=2; Koreni=2; Kad su cvetale tikve=2; Tvrđava=2;
      Santa Maria della Salute=2; Kraljević Marko=2; Smrt majke Jugovića=2; Pokojnik=1.5; Banović Strahinja=1.5; Kosovka devojka=1.5;
      Dnevnik o Čarnojeviću=1; Ivkova slava=1; Vreme smrti=1; Deobe=1; Grobnica za Borisa Davidoviča=1; Bašta, pepeo=1;
      Đački rastanak=1; Plavi čuperak=1; Ženidba Dušanova=1; Peščanik=0.5; Jelena, žena koje nema=0.5;
      Godine koje su pojeli skakavci=0.5; Starac Vujadin=0.5; Utopljene duše=0.2!; Atlas opisan nebom=0.2!`,
  },
  {
    slug: "stranka",
    group: "rs",
    title: "Srpska politička stranka, danas ili nekad",
    hint: "Stranka, pokret ili koalicija, pod imenom ili skraćenicom",
    strip: ["stranka", "partija"],
    answers: `SNS/Srpska napredna stranka=12; SPS/Socijalistička partija Srbije=8; DS/Demokratska stranka=8; SRS/Srpska radikalna stranka=4;
      DSS/Demokratska stranka Srbije=3; SPO/Srpski pokret obnove=3; SSP/Stranka slobode i pravde=3; Dveri=2;
      Ne davimo Beograd/Zeleno-levi front=1.5; LDP/Liberalno-demokratska partija=1; Zavetnici=1; Kreni-Promeni=1;
      SVM/Savez vojvođanskih Mađara=1; LSV/Liga socijaldemokrata Vojvodine=1; G17 plus=1; JUL/Jugoslovenska levica=1;
      Savez komunista/SKJ=1; Narodna stranka=0.5; Pokret socijalista=0.5; SDA Sandžaka=0.5; Nova DSS=0.3; Nova stranka=0.2!;
      Zdrava Srbija=0.2!`,
  },
];
