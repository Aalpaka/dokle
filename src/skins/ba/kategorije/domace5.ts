// Domaće kategorije BiH, nastavak: znamenitosti, sport, mediji, Sarajevo, običaji, književnost, stranke.
import type { SeedCategory } from "../../hr/categories";

export const baDomace5: SeedCategory[] = [
  {
    slug: "znamenitost",
    group: "ba",
    title: "Znamenitost ili turistička atrakcija u BiH",
    hint: "Građevina, spomenik, muzej ili prirodna atrakcija (ne cijeli grad)",
    strip: [],
    answers: `Stari most=20; Baščaršija=10; Sebilj=6; Vijećnica=6; Most Mehmed-paše Sokolovića/Most na Drini/Višegradski most=6; Kravice=4;
      Počitelj=4; Tunel spasa/Tunel=4; Gazi Husrev-begova džamija/Begova džamija=4; Tekija Blagaj/Vrelo Bune=4; Međugorje=3;
      Plivski vodopad/Vodopad u Jajcu=3; Ferhadija džamija=2; Kastel=2; Latinska ćuprija=2; Trebević/Bob staza=2; Vrelo Bosne=2;
      Andrićgrad=2; Panonska jezera=2; Zemaljski muzej=2; Vječna vatra=2; Piramida Sunca/Visočica=2; Kozja ćuprija=1.5;
      Avaz Twist Tower/Avaz=1.5; Vjetrenica=1.5; Spomenik na Tjentištu/Tjentište=1.5; Katedrala Srca Isusova/Katedrala=1.5;
      Mlinčići/Plivski mlinčići=1.5; Svrzina kuća=1; Kraljeva Sutjeska=1; Arslanagića most=1; Kujundžiluk=1; Morića han=1;
      Inat kuća=1; Saborna crkva=1; Sarajevske ruže=1; Titov bunker/ARK D-0=1; Stara ćuprija u Konjicu=0.5; Despića kuća=0.2!;
      Tašlihan=0.2!`,
  },
  {
    slug: "festival",
    group: "ba",
    title: "Festival ili manifestacija u BiH",
    hint: "Glazbeni, filmski, folklorni, sportski ili gastro događaj, danas ili nekad",
    strip: ["festival"],
    answers: `Sarajevo Film Festival/SFF=15; Skokovi sa Starog mosta/Skokovi=5; Baščaršijske noći=5; Sarajevo Jazz Fest/Jazz Fest=3;
      Demofest=2; MESS=2; Ajvatovica=2; Una regata=2; Sarajevska zima=2; Drinska regata=1.5; Kupreška kosidba/Kosidba=1;
      Lake Fest=1; OK Fest=1; Kids Festival=0.5; Mostarsko ljeto=0.3!; Bihać Jazz Fest=0.2!`,
  },
  {
    slug: "kosarkas",
    group: "ba",
    title: "Košarkaš ili košarkašica iz BiH",
    hint: "Bilo koja generacija",
    strip: [],
    answers: `Mirza Delibašić/Kinđe=12; Mirza Teletović=8; Jusuf Nurkić=8; Dražen Dalipagić=5; Razija Mujanović=4; Ratko Radovanović=3;
      Žarko Varajić=3; Džanan Musa=3; Nihad Đedović=3; Sabahudin Bilalović=2; Elmedin Kikanović=2; Kenan Bajramović=1;
      Edin Bavčić=1; Andrija Stipanović=1; Adin Vrabac=1; Henry Domercant=1; Nenad Marković=1; Mersada Bećirspahić=1; Sabit Hadžić=1;
      Ajdin Penava=0.3!`,
  },
  {
    slug: "klub-ostalo",
    group: "ba",
    title: "Sportski klub iz BiH izvan nogometa",
    hint: "Košarka, rukomet, odbojka..., danas ili nekad",
    strip: ["kk", "rk", "ok", "zkk", "hk"],
    answers: `Bosna/KK Bosna=10; Igokea=8; Široki=4; Jedinstvo Tuzla/Jedinstvo=4; Borac Banja Luka/RK Borac=4; Sloboda Tuzla/Sloboda Dita=3;
      RK Bosna=3; Izviđač=3; Spars=1; Sloga Doboj=1; Konjuh Živinice=1; RK Gračanica=1; Leotar=1; Čelik Zenica=0.3!; Kakanj=0.3!`,
  },
  {
    slug: "medij",
    group: "ba",
    title: "Novine, TV, radio ili portal iz BiH",
    hint: "Danas ili nekad",
    strip: [],
    answers: `Dnevni avaz/Avaz=10; Oslobođenje=10; Klix=8; FTV/Federalna televizija=6; Hayat=6; BHT1/BHRT=5; RTRS=5; Face TV/Face=4; N1=4;
      Al Jazeera Balkans/Al Jazeera=4; Nezavisne novine/Nezavisne=3; Glas Srpske=3; OBN=3; BN televizija/BN=3; Dnevni list=2;
      Slobodna Bosna=2; Dani=2; Radio Sarajevo=1; Istraga=1; Žurnal=1; Sarajevo-x=1; Depo=1; ATV=1; TV1=1;
      Večernje novine=0.5; Start=0.5; Fokus=0.5; TVSA=0.5; Radio Kameleon=0.5; Ljiljan=0.2!; Radio BIR=0.2!`,
  },
  {
    slug: "trgovina",
    group: "ba",
    title: "Trgovina, lanac ili tržni centar u BiH",
    hint: "Supermarket, dućan, lanac ili tržni centar, danas ili nekad",
    strip: ["trgovina", "supermarket", "market"],
    answers: `Bingo=15; Konzum=8; Mercator=5; Robot=4; SCC/Sarajevo City Center=4; BBI/BBI centar=4; Amko=3; Interex=3; Tropic=3; DM=3;
      Alta=2; Delta Planet=2; Hoše komerc/Hoše=1; Importanne=1; Mepas Mall/Mepas=1; Sloga=0.2!; Vemex=0.2!`,
  },
  {
    slug: "zagreb-ulica",
    group: "ba",
    title: "Ulica, trg ili park u Sarajevu",
    hint: "Ulica, avenija, trg, park ili šetalište",
    strip: ["ulica", "trg", "park"],
    answers: `Ferhadija=12; Maršala Tita/Titova=10; Baščaršija=8; Zmaja od Bosne=6; Obala Kulina bana=4; Saraći=4; Kovači=3;
      Trg oslobođenja=3; Alipašina=3; Vilsonovo šetalište/Wilsonovo šetalište/Vilsonovo=3; Bistrik=2; Skenderija=2; Džemala Bijedića=2;
      Mula Mustafe Bašeskije=2; Gazi Husrev-begova=2; Bulevar Meše Selimovića=2; Hamdije Kreševljakovića=1; Logavina=1; Strossmayerova=1;
      Branilaca Sarajeva=1; Čobanija=1; Zelenih beretki=1; Patriotske lige=1; Trg Alije Izetbegovića=1; Trg Bosne i Hercegovine=1;
      Veliki park=1; Grbavička=0.5; Ložionička=0.2!; Kranjčevićeva=0.2!`,
  },
  {
    slug: "kvart-grad",
    group: "ba",
    title: "Naselje u Banjoj Luci, Mostaru ili Tuzli",
    hint: "Gradski kvart ili naselje u jednom od ta tri grada",
    strip: [],
    answers: `Borik=5; Starčevica=3; Rondo=2; Bijeli Brijeg=2; Slatina=2; Kreka=2; Lauš=2; Obilićevo=2; Kočićev vijenac=1; Lazarevo=1;
      Paprikovac=1; Rosulje=1; Petrićevac=1; Nova Varoš=1; Mejdan=1; Česma=1; Budžak=1; Brankovac=1; Cernica=1; Carina=1;
      Donja Mahala=1; Zalik=1; Rudnik=1; Balinovac=1; Cim=1; Ilići=1; Brčanska Malta=1; Stupine=1; Sjenjak=1; Ada=0.5; Kuljani=0.5;
      Luka=0.5; Gornja Tuzla=0.5; Mosnik=0.5; Solana=0.5; Bukinje=0.5; Miladije=0.5; Simin Han=0.5; Batva=0.5; Šargovac=0.2!;
      Ši Selo=0.2!`,
  },
  {
    slug: "plaza-hr",
    group: "ba",
    title: "Kupalište ili plaža u BiH",
    hint: "Ime plaže, kupališta ili mjesta za kupanje, na moru, jezeru ili rijeci",
    strip: ["plaza", "kupaliste"],
    answers: `Neum=15; Kravice=10; Panonska jezera=6; Jablaničko jezero=5; Boračko jezero=5; Ramsko jezero=4; Una=4; Modrac=3; Bentbaša=3;
      Buna=2; Plivsko jezero=2; Vrbas=2; Neretva=2; Vrelo Bune=1; Banjalučka Ada/Ada=1; Prokoško jezero=1; Blidinje=1; Trebižat=1;
      Bilećko jezero=1; Zvorničko jezero=1; Drina=1; Koćuša=0.2!; Bunski kanali=0.2!`,
  },
  {
    slug: "spilja-slap",
    group: "ba",
    title: "Pećina ili vodopad u BiH",
    hint: "Pećina, špilja, jama, ponor ili vodopad",
    strip: ["pecina", "spilja", "jama", "vodopad", "slap", "buk"],
    answers: `Kravice=12; Štrbački buk=8; Plivski vodopad/Vodopad u Jajcu=8; Skakavac=6; Vjetrenica=6; Bijambare=4; Orlovača=3;
      Koćuša=2; Martin Brod=2; Bliha=2; Titova pećina=2; Milančev buk=1; Vrelo Bune=1; Duman=0.5; Hrustovača=0.2!; Badanj=0.2!`,
  },
  {
    slug: "obicaj",
    group: "ba",
    title: "Običaj, tradicija ili narodna pjesma u BiH",
    hint: "Običaj, praznik, blagdanski ritual, narodni ples, pjevanje ili rukotvorina",
    strip: [],
    answers: `Bajram=10; Ramazan=8; Iftar=5; Đurđevdan=5; Božić=4; Krsna slava/Slava=4; Uskrs=3; Teferič=3; Kurban-bajram/Kurban=3;
      Sehur=2; Badnjak=2; Mevlud=2; Ajvatovica=2; Sijelo=2; Kahva/Ispijanje kahve=2; Sevdalinka/Sevdah=2; Ganga=1.5; Prelo=1; Moba=1;
      Dernek=1; Ilindan=1; Jurjevdan/Hidrellez=1; Kolo=1; Bajramluk=1; Sofra=1; Hadž=1; Ašure=0.5; Ispraćaj u vojsku=0.5;
      Kosidba=0.5; Dženaza=0.5; Sunet/Sunećenje=0.5; Ćilim=0.5; Zimnica=0.5; Zijaret=0.3!; Ojkanje=0.3!`,
  },
  {
    slug: "knjizevno-djelo",
    group: "ba",
    title: "Djelo pisca iz BiH ili lektira",
    hint: "Naslov romana, drame, pjesme ili zbirke",
    strip: [],
    answers: `Na Drini ćuprija=15; Derviš i smrt=10; Travnička hronika=6; Prokleta avlija=5; Tvrđava=5; Hasanaginica=4; Orlovi rano lete=4;
      Ježeva kućica=4; Kameni spavač=3; Bašta sljezove boje=3; Emina=3; Zeleno busenje=2; Gospođica=2; Sarajevski Marlboro=2;
      Jazavac pred sudom=2; Stojanka majka Knežopoljka=2; Doživljaji Nikoletine Bursaća=2; Ostajte ovdje=2; Mama Leone=1.5;
      Modra rijeka=1.5; Most na Žepi=1; Aska i vuk=1; Znakovi pored puta=1; Anikina vremena=1; Magareće godine=1; Hajduci=1;
      Ex Ponto=1; Ostrvo=0.5; Krug=0.5; Tišine=0.5; Magla i mjesečina=0.5; Gluvi barut=0.5; Pretprazničko veče=0.5; Jablan=0.5;
      Dvori od oraha=0.5; Rod=0.5; Istočni diwan=0.5; Prolom=0.2!; Kroz mećavu=0.2!`,
  },
  {
    slug: "stranka",
    group: "ba",
    title: "Politička stranka u BiH, danas ili nekad",
    hint: "Stranka, pokret ili koalicija, pod imenom ili kraticom",
    strip: ["stranka"],
    answers: `SDA/Stranka demokratske akcije=12; SNSD/Savez nezavisnih socijaldemokrata=10; SDP/SDP BiH/Socijaldemokratska partija=8;
      HDZ BiH/HDZ/Hrvatska demokratska zajednica=8; SDS/Srpska demokratska stranka=6; Naša stranka=4; NiP/Narod i pravda=4;
      DF/Demokratska fronta=3; SBB/Savez za bolju budućnost=2; PDP/Partija demokratskog progresa=2; Trojka=1; DNS/Demokratski narodni savez=1;
      SBiH/Stranka za BiH=1; HDZ 1990=1; Socijalistička partija/SP=0.5; Ujedinjena Srpska=0.5; BPS/Bosanskohercegovačka patriotska stranka=0.5;
      Savez komunista/SK BiH=0.5; Pokret demokratske akcije/PDA=0.2!; Platforma za progres=0.2!`,
  },
];
