// Domaće kategorije Srbije (grupa "rs"), isti slugovi kao hrvatska grupa: isti dan igraju se usporedo
// (Rijeka u Hrvatskoj ↔ Reka u Srbiji). Gde Srbija nema par (ostrva, more), slug dobija najbliži srpski sadržaj.
// Kosovo nije u popisima mesta (ruta ga zaobilazi).
import type { SeedCategory } from "../../hr/categories";

const mesto = ["grad", "selo", "mesto", "mjesto"];

export const rsDomace1: SeedCategory[] = [
  {
    slug: "rijeka",
    group: "rs",
    title: "Reka u Srbiji",
    strip: ["reka", "reku", "rijeka"],
    answers: `Dunav=20; Sava=15; Morava/Velika Morava=12; Drina=8; Tisa=6; Zapadna Morava=4; Južna Morava=4; Ibar=4; Nišava=3; Timok=2;
      Tamiš=2; Begej=2; Kolubara=2; Mlava=1.5; Lim=1.5; Uvac=1.5; Pek=1; Toplica=1; Rasina=1; Pčinja=0.8; Jablanica=0.5;
      Veternica=0.5; Vlasina=0.5; Topčiderska reka=0.5; Ribnica=0.5; Jadar=0.5; Rzav=0.5; Raška=0.5; Studenica=0.5; Moravica=0.5;
      Gruža=0.5; Lepenica=0.5; Resava=0.5; Đetinja=0.5; Jasenica=0.3; Crni Timok=0.3; Beli Timok=0.3; Karaš=0.3; Nera=0.3;
      Bosut=0.3; Ljig=0.3; Tamnava=0.3; Gradac=0.3; Zlatica=0.2; Krivaja=0.2; Kosanica=0.2; Skrapež=0.2; Lugomir=0.2; Dičina=0.2;
      Temštica=0.2; Visočica=0.2; Rača=0.2; Porečka reka=0.2; Vrla=0.2; Kubršnica=0.15!; Jegrička=0.15!`,
  },
  {
    slug: "jelo",
    group: "rs",
    title: "Jelo iz srpske kuhinje",
    strip: [],
    answers: `Sarma=10; Pljeskavica=10; Ćevapi/Ćevapčići=10; Pasulj=8; Karađorđeva šnicla/Karađorđeva=6; Gibanica=6; Pečenje/Prasetina=4;
      Proja=4; Punjene paprike=4; Burek=4; Musaka=3; Đuveč=3; Podvarak=3; Ajvar=3; Kajmak=3; Prebranac=3; Komplet lepinja=3;
      Urnebes=2; Jagnjetina=2; Leskovačka mućkalica/Mućkalica=2; Riblja čorba=2; Kačamak=2; Pihtije=2; Pita=2; Paprikaš/Gulaš=2;
      Šopska salata=2; Ražnjići=2; Svadbarski kupus=1.5; Srpska salata=1.5; Čvarci=1.5; Čorba=1; Kiseli kupus=1; Ćufte=1; Uštipci=1;
      Popara=1; Kulen=1; Sremska kobasica=1; Vešalica/Bela vešalica=1; Gurmanska pljeskavica/Gurmanska=1; Pinđur=1; Sataraš=1;
      Krompir paprikaš=1; Boranija=1; Ćulbastija=0.5; Užička pršuta/Pršuta=0.5; Projara=0.5; Pohovani kačkavalj=0.5;
      Pirotski kačkavalj/Kačkavalj=0.5; Grašak=0.5; Kapama=0.2!; Škembići/Škembe čorba=0.2!`,
  },
  {
    slug: "glazba",
    group: "rs",
    title: "Pevač ili bend iz Srbije",
    strip: ["grupa", "bend"],
    answers: `Ceca/Svetlana Ražnatović=10; Riblja čorba=8; Đorđe Balašević/Balašević=8; Zdravko Čolić/Čola=6; Lepa Brena/Brena=6;
      Bajaga/Bajaga i instruktori/Momčilo Bajagić=5; Ekatarina Velika/EKV=4; Električni orgazam=4; Šaban Šaulić=4; Toma Zdravković=3;
      Željko Joksimović=3; Jelena Karleuša/Karleuša=3; Dragana Mirković=3; Aca Lukas=3; Saša Matić=2; Aleksandra Prijović=2;
      Marija Šerifović=2; Partibrejkers=2; Van Gogh=2; Galija=2; Idoli=2; Miroslav Ilić=2; Smak=1.5; Yu grupa=1.5; Lepa Lukić=1.5;
      Vesna Zmijanac=1.5; Sinan Sakić=1.5; Mile Kitić=1.5; Zvonko Bogdan=1.5; Seka Aleksić=1.5; Disciplina kičme=1; Šarlo akrobata=1;
      Kerber=1; Neverne bebe=1; Kanda, Kodža i Nebojša/KKN=1; Bora Đorđević/Bora Čorba=1; Vlado Georgiev=1; Zorica Brunclik=1;
      Džej Ramadanovski/Džej=1; Cune Gojković=1; Predrag Živković Tozovac/Tozovac=1; Đorđe Marjanović=1; Ana Nikolić=1;
      Nataša Bekvalac=1; Teya Dora=1; Konstrakta=1; Breskvica=1; Milica Pavlović=1; Darko Lazić=1; Beogradski sindikat=1;
      S.A.R.S.=1; Boban Marković=1; Šaban Bajramović=1; Generacija 5=0.8; Piloti=0.8; Zana=0.8; Nikolija=0.8; Miki Jevremović=0.5;
      Bisera Veletanlić=0.5; Olivera Katarina=0.5; Lola Novaković=0.5; Bebi Dol=0.5; Oliver Mandić=0.5; Slađana Milošević=0.5;
      Tanja Savić=0.5; Viki Miljković=0.5; Goca Tržan=0.5; Ivana Selakov=0.5; Mira Škorić=0.5; Bad Copy=0.5; Gru=0.5; Marčelo=0.5;
      Juice=0.5; Nevena Božović=0.5; Sara Jovanović=0.5; Desingerica=0.5; Devito=0.5; Relja Popović/Relja=0.5; Laki Pingvini=0.3;
      Bulevar=0.3; Tijana Bogićević=0.3; Luke Black=0.3; Laboratorija zvuka=0.2!; Bjesovi=0.2!`,
  },
  {
    slug: "klub",
    group: "rs",
    title: "Fudbalski klub iz Srbije",
    strip: ["fk", "ofk"],
    answers: `Crvena zvezda/Zvezda=30; Partizan=28; Vojvodina=8; Čukarički=3; Radnički Niš=3; TSC/Bačka Topola=2; Napredak Kruševac/Napredak=2;
      Spartak Subotica/Spartak=2; OFK Beograd=2; Rad=1.5; Novi Pazar=1.5; Mladost Lučani=1; Javor Ivanjica/Javor=1;
      Radnički Kragujevac=1; Borac Čačak=1; Zemun=1; Obilić=1; Voždovac=1; Metalac Gornji Milanovac/Metalac=0.8; Sloboda Užice=0.8;
      Jagodina=0.8; Radnik Surdulica=0.8; Smederevo=0.8; Mačva Šabac/Mačva=0.8; Železničar Pančevo=0.5; IMT=0.5;
      Proleter Novi Sad=0.5; Inđija=0.5; Dinamo Vranje=0.5; Kolubara=0.5; Hajduk Kula=0.5; Grafičar=0.5; Radnički Obrenovac=0.3;
      BSK Borča=0.3; Bežanija=0.3; Sinđelić Beograd=0.3; Teleoptik=0.3; Trajal Kruševac/Trajal=0.3; Mladost Novi Sad=0.3;
      Radnički Sombor=0.3; OFK Vršac=0.3; Timok Zaječar/Timok=0.3; Sloga Kraljevo=0.3; Bečej=0.2!; Jedinstvo Ub=0.2!`,
  },
  {
    slug: "grad-kopno",
    group: "rs",
    title: "Grad u Srbiji",
    hint: "Bilo koji grad ili opštinsko mesto",
    strip: ["grad"],
    answers: `Beograd=20; Novi Sad=12; Niš=10; Kragujevac=7; Subotica=6; Čačak=4; Kraljevo=4; Zrenjanin=4; Pančevo=4; Novi Pazar=3;
      Šabac=3; Smederevo=3; Leskovac=3; Valjevo=3; Kruševac=3; Užice=3; Vranje=3; Sombor=3; Zaječar=2; Pirot=2; Jagodina=2; Kikinda=2;
      Vršac=2; Sremska Mitrovica=2; Loznica=2; Požarevac=2; Bor=2; Prokuplje=1.5; Paraćin=1.5; Aranđelovac=1.5; Gornji Milanovac=1.5;
      Zemun=1.5; Sokobanja=1.5; Vrnjačka Banja=1.5; Ćuprija=1; Smederevska Palanka=1; Obrenovac=1; Lazarevac=1; Mladenovac=1;
      Bečej=1; Vrbas=1; Inđija=1; Stara Pazova=1; Ruma=1; Šid=1; Bačka Palanka=1; Bačka Topola=1; Knjaževac=1; Negotin=1; Kladovo=1;
      Aleksinac=1; Bajina Bašta=1; Zlatibor=1; Guča=1; Kula=0.8; Apatin=0.8; Senta=0.8; Bela Crkva=0.8; Trstenik=0.8; Ivanjica=0.8;
      Arilje=0.8; Požega=0.8; Prijepolje=0.8; Topola=0.8; Kanjiža=0.5; Novi Bečej=0.5; Kovin=0.5; Kovačica=0.5; Majdanpek=0.5;
      Golubac=0.5; Veliko Gradište=0.5; Despotovac=0.5; Svilajnac=0.5; Kuršumlija=0.5; Priboj=0.5; Nova Varoš=0.5; Sjenica=0.5;
      Tutin=0.5; Raška=0.5; Bujanovac=0.5; Preševo=0.5; Dimitrovgrad=0.5; Ub=0.5; Ada=0.3; Alibunar=0.3; Blace=0.3; Brus=0.3;
      Kosjerić=0.3; Lučani=0.3; Vladičin Han=0.3; Surdulica=0.3; Bela Palanka=0.3; Lebane=0.3; Vlasotince=0.3; Ljubovija=0.3;
      Mali Zvornik=0.3; Lajkovac=0.3; Ljig=0.3; Mionica=0.3; Lapovo=0.3; Petrovac na Mlavi=0.3; Kučevo=0.3; Boljevac=0.3;
      Svrljig=0.3; Bogatić=0.3; Irig=0.3; Beočin=0.3; Temerin=0.3; Žabalj=0.3; Titel=0.3; Srbobran=0.3; Odžaci=0.3; Bač=0.3;
      Opovo=0.2; Ćićevac=0.2; Bosilegrad=0.2; Babušnica=0.2; Medveđa=0.2; Žitorađa=0.2; Doljevac=0.2; Krupanj=0.2; Osečina=0.2;
      Rača=0.2; Batočina=0.2; Žagubica=0.2; Vladimirci=0.2; Koceljeva=0.2; Pećinci=0.2; Knić=0.1; Gadžin Han=0.1; Sečanj=0.1;
      Žitište=0.1; Nova Crnja=0.1; Novi Kneževac=0.1; Čoka=0.1; Mali Iđoš=0.1; Plandište=0.1; Crna Trava=0.1!; Trgovište=0.1!`,
  },
  {
    slug: "planina",
    group: "rs",
    title: "Planina ili brdo u Srbiji",
    strip: ["planina", "brdo", "gora"],
    answers: `Kopaonik=15; Zlatibor=14; Tara=10; Fruška gora=8; Stara planina=8; Rtanj=6; Avala=5; Divčibare/Maljen=3; Golija=3;
      Suva planina=3; Zlatar=2; Rudnik=2; Jastrebac=1.5; Kosmaj=1.5; Javor=1; Povlen=1; Besna Kobila=1; Ozren=1; Bukulja=1; Ovčar=1;
      Kablar=1; Goč=1; Mokra gora=1; Midžor=1; Cer=1; Vršačke planine/Vršački breg=1; Jelica=0.8; Miroč=0.5; Beljanica=0.5;
      Kučaj=0.5; Radan=0.5; Željin=0.5; Babin zub=0.5; Pančićev vrh=0.5; Tupižnica=0.3; Deli Jovan=0.3; Jadovnik=0.3; Murtenica=0.3;
      Čemerno=0.3; Gledićke planine=0.3; Crni vrh=0.3; Vidlič=0.3; Valjevske planine=0.3; Venčac=0.3; Vlašić=0.2; Bobija=0.2;
      Sokolska planina=0.2; Rogozna=0.2; Giljeva=0.15!; Medvednik=0.15!`,
  },
  {
    slug: "park",
    group: "rs",
    title: "Nacionalni park ili zaštićeno područje u Srbiji",
    hint: "Nacionalni park, park prirode, rezervat ili spomenik prirode",
    strip: ["park", "np", "pp", "nacionalni"],
    answers: `Tara/NP Tara=15; Fruška gora/NP Fruška gora=12; Kopaonik/NP Kopaonik=12; Đerdap/NP Đerdap=10; Stara planina=6;
      Deliblatska peščara=4; Uvac/Specijalni rezervat Uvac=4; Zasavica=3; Obedska bara=3; Đavolja varoš=3; Golija=2; Zlatibor=2;
      Mokra gora=2; Ovčarsko-kablarska klisura=2; Gornje Podunavlje=1.5; Carska bara=1.5; Sićevačka klisura=1.5; Lazarev kanjon=1.5;
      Ludaško jezero=1; Palić=1; Vlasina=1; Avala=1; Suva planina=0.8; Rajac=0.5; Košutnjak=0.5; Titelski breg=0.5;
      Vršačke planine=0.5; Subotička peščara=0.5; Rtanj=0.5; Kamena gora=0.3; Pčinja=0.2; Slano Kopovo=0.2!; Jerma=0.2!`,
  },
  {
    slug: "jezero",
    group: "rs",
    title: "Jezero u Srbiji",
    strip: ["jezero"],
    answers: `Palić/Palićko jezero=12; Srebrno jezero=10; Ada Ciganlija/Savsko jezero=8; Zlatarsko jezero/Zlatar=5; Vlasinsko jezero/Vlasina=5;
      Perućac/Jezero Perućac=4; Bovansko jezero=3; Đerdapsko jezero=3; Gružansko jezero=2; Ludaško jezero=2; Borsko jezero=2;
      Zaovine=2; Uvačko jezero/Uvac=2; Belocrkvanska jezera=2; Garaši=1; Sjeničko jezero=1; Potpećko jezero=1; Međuvršje=1; Rovni=1;
      Zavojsko jezero=1; Oblačinsko jezero=1; Šumaričko jezero=1; Rusanda=1; Barje=0.5; Ćelije=0.5; Slano Kopovo=0.5; Vrutci=0.5;
      Sot=0.5; Tikvara=0.5; Zobnatica=0.2!; Grlište=0.2!`,
  },
  {
    slug: "otok",
    group: "rs",
    title: "Banja u Srbiji",
    hint: "Srbija nema ostrva na moru, pa umesto njih: banja ili lečilište",
    strip: ["banja", "banji", "banju"],
    answers: `Vrnjačka Banja/Vrnjačka/Vrnjci=15; Sokobanja=12; Niška Banja/Niška=8; Banja Koviljača/Koviljača=6;
      Mataruška Banja/Mataruška=4; Ribarska Banja/Ribarska=4; Prolom Banja/Prolom=4; Lukovska Banja/Lukovska=3;
      Bukovička Banja/Bukovička=3; Jošanička Banja/Jošanička=3; Vranjska Banja/Vranjska=3; Vrdnik=2; Sijarinska Banja/Sijarinska=2;
      Gamzigradska Banja/Gamzigradska=2; Brestovačka Banja/Brestovačka=2; Ovčar Banja=2; Banja Vrujci/Vrujci=2; Kanjiža/Banja Kanjiža=2;
      Novopazarska Banja/Novopazarska=1.5; Kuršumlijska Banja/Kuršumlijska=1.5; Atomska Banja/Gornja Trepča=1.5; Rusanda=1.5;
      Banja Junaković/Junaković=1; Bujanovačka Banja/Bujanovačka=1; Selters Banja/Selters=1; Pribojska Banja/Pribojska=1;
      Zvonačka Banja/Zvonačka=1; Bogutovačka Banja/Bogutovac=0.5; Banja Ždrelo/Ždrelo=0.5; Slankamen/Banja Slankamen=0.5;
      Rajčinovića Banja=0.2!; Banja Badanja/Badanja=0.2!`,
  },
  {
    slug: "obala",
    group: "rs",
    title: "Grad ili mesto na Dunavu",
    hint: "Srbija nema mora, pa umesto obale: grad, mesto ili selo na Dunavu u Srbiji",
    strip: mesto,
    answers: `Beograd=18; Novi Sad=15; Zemun=6; Smederevo=6; Golubac=5; Kladovo=5; Donji Milanovac=4; Apatin=4; Sremski Karlovci=4;
      Pančevo=3; Veliko Gradište=3; Bačka Palanka=3; Petrovaradin=3; Grocka=2; Lepenski vir=1.5; Futog=1; Beočin=1;
      Novi Slankamen/Slankamen=1; Vinča=1; Kovin=1; Bezdan=1; Ram=1; Tekija=1; Kostolac=1; Begeč=0.5; Banoštor=0.5;
      Stari Slankamen=0.5; Bogojevo=0.5; Brza Palanka=0.5; Ritopek=0.5; Kovilj=0.5; Čortanovci=0.5; Stari Banovci/Banovci=0.5;
      Čerević=0.3; Bačko Novo Selo=0.3; Radujevac=0.3; Prahovo=0.3; Dobra=0.3; Dubravica=0.3; Surduk=0.3; Belegiš=0.3;
      Mihajlovac=0.3; Neštin=0.3; Krčedin=0.3; Sviloš=0.2; Brnjica=0.15!; Susek=0.15!`,
  },
];
