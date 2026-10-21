// Nove kategorije grupe "Hrvatska".
import type { SeedCategory } from "../categories";

export const hrKategorije: SeedCategory[] = [
  {
    slug: "grad-kopno",
    group: "hr",
    title: "Hrvatski grad u unutrašnjosti",
    hint: "Grad ili mjesto koje nije na moru",
    strip: ["grad"],
    answers: `Zagreb=17; Osijek=10; Karlovac=6; Varaždin=6; Slavonski Brod/Brod=5; Vukovar=5; Sisak=4; Vinkovci=4;
      Đakovo=3; Čakovec=3; Koprivnica=3; Bjelovar=3; Požega/Slavonska Požega=2.5; Gospić=2; Knin=2; Samobor=2;
      Velika Gorica=2; Virovitica=1.5; Križevci=1; Krapina=1; Petrinja=1; Kutina=1; Našice=1; Ogulin=1; Sinj=1;
      Imotski=0.8; Zaprešić=0.8; Daruvar=0.8; Nova Gradiška=0.8; Ilok=0.8; Županja=0.7; Valpovo=0.5;
      Beli Manastir=0.5; Ivanić-Grad/Ivanić Grad=0.5; Pakrac=0.5; Metković=0.5; Pazin=0.5; Lipik=0.4; Glina=0.4;
      Đurđevac=0.4; Jastrebarsko/Jaska=0.4; Dugo Selo=0.4; Zabok=0.3; Garešnica=0.3; Čazma=0.3; Ludbreg=0.3;
      Ivanec=0.3; Lepoglava=0.3; Sveti Ivan Zelina/Zelina=0.3; Slunj=0.3; Otočac=0.3; Delnice=0.3; Drniš=0.3;
      Buzet=0.3; Slatina=0.3; Novska=0.3; Motovun=0.3; Novi Marof=0.2; Zlatar=0.2; Pregrada=0.2; Donja Stubica=0.2;
      Vrbovec=0.2; Duga Resa=0.2; Benkovac=0.2; Trilj=0.2; Vrgorac=0.2; Belišće=0.2; Donji Miholjac=0.2;
      Orahovica=0.2; Kutjevo=0.2; Prelog=0.2; Buje=0.2; Oroslavje=0.15; Klanjec=0.15; Ozalj=0.15; Obrovac=0.15;
      Pleternica=0.15; Hrvatska Kostajnica/Kostajnica=0.15; Vrbovsko=0.1; Čabar=0.1; Korenica/Titova Korenica=0.1;
      Vrlika=0.1; Opuzen=0.1; Popovača=0.1; Grubišno Polje=0.1; Mursko Središće=0.1`,
  },
  {
    slug: "planina",
    group: "hr",
    title: "Planina ili brdo u Hrvatskoj",
    strip: ["planina", "brdo", "gora"],
    answers: `Velebit=24; Medvednica/Sljeme/Zagrebačka gora=15; Biokovo=10; Dinara=7; Učka=6; Risnjak=4; Mosor=3;
      Papuk=3; Žumberak/Žumberačko gorje/Samoborsko gorje=3; Kozjak=2; Ivanščica=2; Kalnik=1.5; Psunj=1;
      Kapela/Velika Kapela/Mala Kapela=1; Klek=1; Sveti Jure=1; Marjan=1; Petrova gora=0.8; Bjelolasica=0.8;
      Svilaja=0.8; Vidova gora=0.8; Srđ=0.8; Krndija=0.5; Moslavačka gora=0.5; Plješivica/Lička Plješivica=0.5;
      Snježnik=0.5; Kamešnica=0.5; Ćićarija=0.5; Sveti Ilija=0.5; Bilogora=0.5; Dilj/Dilj gora=0.4;
      Zrinska gora=0.4; Požeška gora=0.3; Obruč=0.3; Promina=0.3; Vojak=0.3; Strahinjčica=0.3; Ravna gora=0.3;
      Zavižan=0.3; Tulove grede=0.3; Japetić=0.3; Sinjal=0.3; Vaganski vrh=0.3; Macelj=0.2; Moseć=0.2;
      Lisina=0.2`,
  },
  {
    slug: "park",
    group: "hr",
    title: "Nacionalni park ili zaštićeno područje u Hrvatskoj",
    hint: "Nacionalni park, park prirode, rezervat ili spomenik prirode",
    strip: ["park", "np", "pp", "nacionalni"],
    answers: `Plitvička jezera/Plitvice/NP Plitvice=28; Krka/NP Krka/Slapovi Krke=14; Kopački rit=6; Kornati=5;
      Brijuni/Brioni=5; Paklenica=5; Mljet=4; Risnjak=3; Biokovo=2.5; Lonjsko polje=2.5; Sjeverni Velebit=2;
      Papuk=2; Telašćica=2; Velebit/Park prirode Velebit=2; Učka=1.5; Vransko jezero=1.5; Medvednica=1.5;
      Žumberak=1; Lastovsko otočje/Lastovo=1; Kamenjak/Rt Kamenjak=0.8; Maksimir/Park Maksimir=0.8;
      Dinara/Park prirode Dinara=0.5; Marjan/Park-šuma Marjan=0.5; Lokrum=0.5; Rastoke=0.5; Delta Neretve=0.5;
      Crveno jezero=0.4; Modro jezero=0.4; Baćinska jezera=0.3; Malostonski zaljev=0.3; Cerovačke špilje=0.2;
      Vražji prolaz=0.2; Zeleni vir=0.2; Samarske stijene=0.2; Rožanski kukovi/Hajdučki kukovi=0.2;
      Cetina/Izvor Cetine=0.2; Modrić špilja=0.1`,
  },
  {
    slug: "sportas",
    group: "hr",
    title: "Hrvatski sportaš ili sportašica",
    strip: [],
    answers: `Luka Modrić/Modrić=14; Janica Kostelić/Janica/Kostelić=8; Goran Ivanišević/Ivanišević/Goran=6;
      Blanka Vlašić/Blanka=4; Sandra Perković/Sandra Elkasević=3; Dražen Petrović=3; Marin Čilić/Čilić=2.5;
      Toni Kukoč/Kukoč=2; Davor Šuker/Šuker=2; Ivan Rakitić/Rakitić=2; Ivan Perišić/Perišić=2;
      Mario Mandžukić/Mandžukić=2; Mirko Filipović/Cro Cop/Crocop=2; Joško Gvardiol/Gvardiol=1.5;
      Ivica Kostelić/Ivica=1.5; Ivano Balić/Balić=1.5; Domagoj Duvnjak/Duvnjak=1; Valent Sinković/Martin Sinković/Braća Sinković/Sinković=1;
      Mateo Kovačić/Kovačić=1; Dominik Livaković/Livaković=1; Zvonimir Boban/Boban=1; Ivica Olić/Olić=1;
      Darijo Srna/Srna=1; Danijel Subašić/Subašić=0.8; Robert Prosinečki/Prosinečki=0.8; Slaven Bilić/Bilić=0.8;
      Iva Majoli/Majoli=0.8; Sara Kolak=0.8; Filip Hrgović/Hrgović=0.8; Bojan Bogdanović=0.8;
      Marcelo Brozović/Brozović=0.8; Dino Rađa/Rađa=0.6; Dario Šarić/Šarić=0.6; Donna Vekić/Vekić=0.6;
      Andrej Kramarić/Kramarić=0.6; Dejan Lovren/Lovren=0.5; Borna Ćorić/Ćorić=0.5; Mate Pavić=0.5;
      Igor Vori/Vori=0.5; Mate Parlov/Parlov=0.5; Ivica Zubac/Zubac=0.5; Krešimir Ćosić=0.5;
      Vedran Ćorluka/Ćorluka=0.5; Niko Kovač=0.5; Šime Vrsaljko/Vrsaljko=0.5; Igor Štimac/Štimac=0.5;
      Alen Bokšić/Bokšić=0.5; Zrinka Ljutić/Ljutić=0.5; Mirjana Lučić=0.4; Nikola Mektić/Mektić=0.4;
      Ivan Ljubičić/Ljubičić=0.4; Matea Jelić=0.4; Ana Konjuh/Konjuh=0.4; Petra Martić=0.4; Tin Srbić/Srbić=0.4;
      Filip Zubčić=0.4; Mario Ančić/Ančić=0.3; Mirza Džomba/Džomba=0.3; Duje Draganja=0.3; Damir Martin=0.3;
      Barbara Matić=0.3; Stojko Vranković=0.3; Ante Rebić/Rebić=0.3; Josip Šimunić/Šimunić=0.3;
      Robert Jarni=0.3; Dario Šimić=0.3; Robert Kovač=0.3; Josip Pavić=0.3; Sandro Sukno=0.3; Ratko Rudić=0.3;
      Luka Cindrić=0.2; Giovanni Cernogoraz=0.2; Josip Glasnović=0.2; Lucija Zaninović=0.2; Martina Zubčić=0.2;
      Filip Ude=0.2; Stipe Žunić=0.2; Natko Zrnčić-Dim=0.2; Aco Petrović=0.2; Leona Popović=0.1`,
  },
  {
    slug: "reprezentativac",
    group: "hr",
    title: "Hrvatski nogometni reprezentativac",
    hint: "Bilo koji igrač koji je nastupio za Vatrene",
    strip: [],
    answers: `Luka Modrić/Modrić=20; Davor Šuker/Šuker=6; Mario Mandžukić/Mandžukić=5; Ivan Rakitić/Rakitić=5;
      Ivan Perišić/Perišić=5; Joško Gvardiol/Gvardiol=4; Mateo Kovačić/Kovačić=3; Dominik Livaković/Livaković=3;
      Danijel Subašić/Subašić=3; Zvonimir Boban/Boban=3; Robert Prosinečki/Prosinečki=2.5; Darijo Srna/Srna=2.5;
      Marcelo Brozović/Brozović=2.5; Ivica Olić/Olić=2; Dejan Lovren/Lovren=2; Domagoj Vida/Vida=2;
      Andrej Kramarić/Kramarić=2; Vedran Ćorluka/Ćorluka=1.5; Šime Vrsaljko/Vrsaljko=1.5; Mario Pašalić/Pašalić=1;
      Ante Rebić/Rebić=1; Josip Šimunić/Šimunić=1; Alen Bokšić/Bokšić=1; Robert Jarni/Jarni=1; Igor Štimac/Štimac=1;
      Slaven Bilić/Bilić=1; Niko Kranjčar/Kranjčar=1; Eduardo/Eduardo da Silva=1; Stipe Pletikosa/Pletikosa=1;
      Dražen Ladić/Ladić=0.8; Igor Tudor/Tudor=0.8; Mladen Petrić/Petrić=0.8; Josip Juranović/Juranović=0.8;
      Lovro Majer/Majer=0.8; Bruno Petković/Petković=0.8; Mislav Oršić/Oršić=0.8; Aljoša Asanović/Asanović=0.5;
      Mario Stanić/Stanić=0.5; Robert Kovač=0.5; Niko Kovač=0.5; Dario Šimić/Šimić=0.5; Ivan Klasnić/Klasnić=0.5;
      Ante Budimir/Budimir=0.5; Duje Ćaleta-Car/Ćaleta-Car=0.5; Milan Badelj/Badelj=0.5; Goran Vlaović/Vlaović=0.5;
      Dado Pršo/Pršo=0.6; Marko Livaja/Livaja=0.6; Borna Sosa/Sosa=0.6; Nikola Vlašić/Vlašić=0.6;
      Danijel Pranjić/Pranjić=0.4; Ivan Strinić/Strinić=0.4; Josip Stanišić/Stanišić=0.4; Josip Šutalo/Šutalo=0.4;
      Martin Baturina/Baturina=0.4; Marko Pjaca/Pjaca=0.4; Nikica Jelavić/Jelavić=0.4; Zvonimir Soldo/Soldo=0.4;
      Ognjen Vukojević/Vukojević=0.3; Tin Jedvaj/Jedvaj=0.3; Luka Sučić/Sučić=0.3; Alen Halilović/Halilović=0.3;
      Krunoslav Jurčić/Jurčić=0.3; Kristijan Jakić/Jakić=0.2; Davor Vugrinec/Vugrinec=0.2; Silvio Marić=0.2;
      Anthony Šerić/Šerić=0.2; Boris Živković/Živković=0.2; Jerko Leko/Leko=0.2; Tomislav Butina/Butina=0.2;
      Ivo Grbić/Grbić=0.2; Igor Bišćan/Bišćan=0.3; Ivan Leko=0.1; Marin Pongračić/Pongračić=0.2;
      Petar Sučić=0.1; Luka Ivanušec/Ivanušec=0.2; Antonio Mirko Čolak/Čolak=0.1; Josip Brekalo/Brekalo=0.2;
      Filip Bradarić=0.1; Ivan Santini/Santini=0.1; Marko Rog=0.2`,
  },
  {
    slug: "serija",
    group: "hr",
    title: "Hrvatska serija, film ili crtić",
    strip: [],
    answers: `Naše malo misto/Malo misto=10; Velo misto=6; Gruntovčani=5; Bitange i princeze=5; Smogovci=4;
      Profesor Baltazar/Baltazar=4; Tko pjeva zlo ne misli=3; Naši i vaši=3; Kud puklo da puklo=3; Larin izbor=3;
      Zabranjena ljubav=3; Ruža vjetrova=2; Crno-bijeli svijet/Crno bijeli svijet=2; Stipe u gostima=2;
      Luda kuća=2; Svećenikova djeca=2; Novine=1.5; Mejaši=1.5; Bračne vode=1.5; Odmori se, zaslužio si/Odmori se zasluzio si=1.5;
      Ne daj se, Nina/Ne daj se Nina=1.5; Što je muškarac bez brkova=1.5; Kad mrtvi zapjevaju=1; Maršal=1;
      Metastaze=1; Na terapiji=1; Pogrešan čovjek=1; Bumbari=1; Najbolje godine=1; Družba Pere Kvržice=1;
      Koko i duhovi=1; Mamutica=0.8; Vlak u snijegu=0.8; Fine mrtve djevojke=0.8; Ne okreći se sine=0.5;
      Breza=0.5; Ljudožder vegetarijanac=0.5; Seljačka buna=0.5; Dobre namjere=0.5; Počivali u miru=0.5;
      Nemoj nikome reći=0.5; Dar mar=0.5; Oprosti za kung fu=0.4; Uspjeh=0.4; H8=0.3; Gospa=0.3; Surogat=0.3;
      Zlatne godine=0.3; Libertas=0.3; Zora dubrovačka=0.3; Kotlovina=0.3; Duh babe Ilonke=0.3;
      Čudnovate zgode šegrta Hlapića/Šegrt Hlapić/Hlapić=1`,
  },
  {
    slug: "pisac",
    group: "hr",
    title: "Hrvatski pisac ili pjesnik",
    strip: [],
    answers: `Miroslav Krleža/Krleža=10; Marko Marulić/Marulić=8; August Šenoa/Šenoa=8; Tin Ujević/Ujević/Tin=6;
      Antun Gustav Matoš/Matoš/AG Matoš=6; Ivana Brlić-Mažuranić/Brlić-Mažuranić=5; Ivan Gundulić/Gundulić=4;
      Marin Držić/Držić=4; Ivan Mažuranić/Mažuranić=3; Ivo Andrić/Andrić=3; Dobriša Cesarić/Cesarić=2;
      Vladimir Nazor/Nazor=2; Silvije Strahimir Kranjčević/Kranjčević=2; Dragutin Tadijanović/Tadijanović=2;
      Vesna Parun/Parun=2; Mato Lovrak/Lovrak=2; Antun Branko Šimić/Šimić=1.5; Ivan Goran Kovačić/Goran Kovačić=1.5;
      Petar Preradović/Preradović=1.5; Miro Gavran/Gavran=1.5; Ranko Marinković/Marinković=1; Pavao Pavličić/Pavličić=1;
      Ante Tomić=1; Miljenko Jergović/Jergović=1; Petar Hektorović/Hektorović=0.8; Ksaver Šandor Gjalski/Gjalski=0.8;
      Ante Kovačić=0.8; Josip Kozarac/Kozarac=0.8; Vjenceslav Novak=0.8; Dinko Šimunović/Šimunović=0.8;
      Grigor Vitez/Vitez=0.8; Ivan Kušan/Kušan=0.8; Goran Tribuson/Tribuson=0.8; Dubravka Ugrešić/Ugrešić=0.8;
      Petar Zoranić/Zoranić=0.5; Eugen Kumičić/Kumičić=0.5; Ivo Vojnović/Vojnović=0.5; Slobodan Novak=0.5;
      Slavko Kolar/Kolar=0.5; Zvonimir Balog/Balog=0.5; Hrvoje Hitrec/Hitrec=0.5; Luko Paljetak/Paljetak=0.5;
      Jure Kaštelan/Kaštelan=0.5; Hanibal Lucić/Lucić=0.4; Antun Šoljan/Šoljan=0.4; Slavenka Drakulić/Drakulić=0.4;
      Ivana Simić Bodrožić=0.4; Zoran Ferić/Ferić=0.4; Fran Galović/Galović=0.4; Janko Polić Kamov/Kamov=0.4;
      Vladan Desnica/Desnica=0.4; Ivan Aralica/Aralica=0.4; Janko Leskovar/Leskovar=0.3; Milan Begović/Begović=0.3;
      Ivan Slamnig/Slamnig=0.3; Kristian Novak=0.3; Arsen Dedić=0.3; Dragutin Domjanić/Domjanić=0.3;
      Nedjeljko Fabrio/Fabrio=0.3; Josip Pupačić/Pupačić=0.3; Faust Vrančić=0.2; Andrija Kačić Miošić/Kačić=0.5;
      Matija Antun Reljković/Reljković=0.4; Ljudevit Gaj/Gaj=0.5; Tituš Brezovački/Brezovački=0.2`,
  },
  {
    slug: "brend",
    group: "hr",
    title: "Hrvatski proizvod, tvrtka ili brend",
    strip: [],
    answers: `Vegeta=12; Kraš=8; Podravka=8; Cedevita=7; Ledo=5; Ožujsko=4; Franck=3; Jamnica=3; Karlovačko=3;
      Bajadera=3; Dorina=2; Jana=2; Dukat=2; Vindija=2; Gavrilović=2; Čokolino=2; Rimac/Rimac Automobili=2;
      Konzum=2; Ki-Ki/Kiki/Kiki bombon=1.5; Domaćica=1.5; Napolitanke=1.5; Lino Lada/Linolada=1.5; Pliva=1.5;
      Jadrolinija=1.5; INA=1.5; Borovo=1.5; Studena=1; Zvijezda=1; PIK Vrbovec/PIK=1; Životinjsko carstvo=1;
      Croatia Airlines=1; Končar=1; Studenac=1; Badel/Badel 1862=0.8; Belupo=0.8; Tisak=0.8; Tommy=0.8;
      Kraš Express=0.5; Pan/Pan pivo=0.5; Koestlin=0.5; Atlantic/Atlantic Grupa=0.5; Infobip=0.5; Plodine=0.5;
      Varteks=0.5; Fant=0.5; Brionka=0.3; Fortenova=0.3; Ronhill=0.3; Walter Wolf=0.3; Kamensko=0.3; Galeb=0.3;
      Paški sir=1; Maraschino Maraska/Maraska=0.5; Nanobit=0.3; Photomath=0.3; HEP=0.5; Hrvatska pošta=0.3;
      HT/Hrvatski Telekom=0.5; Agrokor=0.8`,
  },
  {
    slug: "kolac",
    group: "hr",
    title: "Kolač ili slastica",
    strip: ["kolac"],
    answers: `Kremšnita/Krempita/Samoborska kremšnita=10; Palačinke/Palačinka=8; Orahnjača=7; Makovnjača=5;
      Štrudla/Savijača/Štrudl=5; Fritule/Fritole=4; Krafne/Krofne/Pokladnice=4; Torta=4; Pita od jabuka/Jabučnjak/Pita s jabukama=4;
      Vanilin kiflice/Kiflice=3; Čupavci=3; Baklava=3; Tiramisu=3; Sladoled=3; Rožata=2.5; Rapska torta=2;
      Kroštule=2; Breskvice=2; Mađarica=2; Puding=2; Knedle sa šljivama/Knedle=2; Medenjaci=1.5; Linzeri/Linzer=1.5;
      Sacher torta/Sacher=1.5; Cheesecake/Torta od sira=1.5; Keksi=1.5; Kuglof=1.5; Šnenokle/Snježne kugle=1.5;
      Bučnica=1; Paprenjaci=1; Šape=1; Tulumbe=1; Hurmašice=1; Muffini=1; Čokoladna torta=1; Doboš torta=1;
      Pinca=1; Bajadera=1; Uštipci=1; Krem karamel=1; Rizogalo=1; Štrukli=1; Sirnica=0.8; Brownie=0.8;
      Princes krafne=0.8; Ruske kape=0.5; Tufahije=0.5; Panna cotta=0.5; Kuglice=0.5; Torta od mrkve=0.5;
      Arancini=0.4; Mandulat=0.3; Zlevka=0.3; Mantala=0.2; Ravani=0.2`,
  },
  {
    slug: "vino",
    group: "hr",
    title: "Hrvatsko vino ili sorta grožđa",
    strip: ["vino"],
    answers: `Plavac mali/Plavac=15; Graševina=12; Malvazija/Malvazija istarska=10; Pošip=6; Teran=5; Dingač=5;
      Babić=3; Žlahtina=3; Traminac=3; Postup=2; Grk=2; Frankovka=2; Muškat/Muškat momjanski/Momjanski muškat=2;
      Merlot=2; Cabernet/Cabernet sauvignon/Kabernet=2; Prošek=2; Rizling/Rajnski rizling=1.5;
      Chardonnay/Šardone=1.5; Vugava=1; Debit=1; Maraština=1; Crljenak/Crljenak kaštelanski/Tribidrag=1; Škrlet=1;
      Sauvignon/Sauvignon bijeli=1; Pinot sivi/Sivi pinot=0.8; Bogdanjuša=0.5; Kujundžuša=0.5; Plavina=0.5;
      Kraljevina=0.5; Pinot crni=0.5; Portugizac=0.5; Lasina=0.3; Rukatac=0.3; Gegić=0.3; Ninčuša=0.2; Trnjak=0.2;
      Zweigelt=0.2; Pinot bijeli=0.3; Syrah=0.2`,
  },
  {
    slug: "pice",
    group: "hr",
    title: "Rakija ili alkoholno piće",
    strip: [],
    answers: `Šljivovica/Šljivovača=14; Travarica=10; Lozovača/Loza=9; Pelinkovac/Pelin=7; Rakija=5;
      Viljamovka/Vilijamovka/Kruškovača/Kruškovac=4; Medica/Medenica=4; Orahovac=3; Maraskino/Maraschino=3;
      Pivo=3; Vino=3; Biska=2; Dunjevača/Dunja=2; Gemišt=2; Votka/Vodka=2; Viski/Whisky=2; Komovica=1.5;
      Bambus=1.5; Prošek=1.5; Vinjak=1.5; Jägermeister/Jeger=1.5; Jabukovača=1; Smokovača=1; Bevanda=1;
      Višnjevac/Višnja=1; Klekovača/Borovička=1; Gin=1; Rum=1; Tekila/Tequila=1; Rogačica=0.5; Kupinovac=0.5;
      Liker=0.5; Šampanjac=0.5; Teranino=0.3; Bermet=0.2`,
  },
  {
    slug: "zupanija",
    group: "hr",
    title: "Hrvatska županija ili regija",
    strip: ["zupanija", "regija"],
    answers: `Dalmacija=10; Slavonija=8; Istra=8; Zagorje/Hrvatsko zagorje=5; Lika=5; Gorski kotar=3; Kvarner=3;
      Međimurje=3; Baranja=2; Zagora/Dalmatinska zagora=2; Zagrebačka=2; Grad Zagreb=2; Splitsko-dalmatinska=2;
      Podravina=1.5; Krapinsko-zagorska=1.5; Varaždinska=1.5; Primorsko-goranska=1.5; Zadarska=1.5;
      Osječko-baranjska=1.5; Istarska=1.5; Dubrovačko-neretvanska=1.5; Međimurska=1.5; Srijem=1; Posavina=1;
      Moslavina=1; Kordun=1; Banovina/Banija=1; Konavle=1; Primorje/Hrvatsko primorje=1; Sisačko-moslavačka=1;
      Karlovačka=1; Koprivničko-križevačka=1; Bjelovarsko-bilogorska=1; Ličko-senjska=1; Šibensko-kninska=1;
      Vukovarsko-srijemska=1; Virovitičko-podravska=0.8; Požeško-slavonska=0.8; Brodsko-posavska=0.8;
      Prigorje=0.5; Turopolje=0.5; Ravni kotari=0.5; Bukovica=0.3; Dolina Neretve=0.3`,
  },
  {
    slug: "kvart",
    group: "hr",
    title: "Zagrebački kvart ili naselje",
    strip: ["kvart", "naselje"],
    answers: `Trešnjevka=8; Dubrava=6; Maksimir=5; Sesvete=5; Novi Zagreb=4; Trnje=4; Gornji grad=4; Špansko=3;
      Črnomerec=3; Jarun=3; Donji grad=3; Podsused=2; Medveščak=2; Peščenica=2; Knežija=2; Travno=2; Vrapče=2;
      Kaptol=2; Savica=1.5; Kustošija=1.5; Utrina=1; Siget=1; Sopot=1; Zapruđe=1; Dugave=1; Trnsko=1; Remetinec=1;
      Stenjevec=1; Šalata=1; Šestine=1; Gračani=1; Rudeš=1; Sloboština=0.8; Malešnica=0.8; Tuškanac=0.8;
      Voltino=0.8; Ljubljanica=0.8; Prečko=0.8; Gajnice=0.5; Ribnjak=0.5; Pantovčak=0.5; Markuševec=0.5; Vrbik=0.5;
      Martinovka=0.5; Kajzerica=0.5; Lanište=0.5; Blato=0.5; Sveta Klara=0.5; Jakuševec=0.5; Žitnjak=0.5;
      Borongaj=0.5; Ferenščica=0.5; Kozari bok/Kozari=0.5; Svetice=0.5; Ravnice=0.5; Srednjaci=0.5;
      Cvjetno naselje=0.5; Kvatrić=0.5; Ksaver=0.3; Botinec=0.3; Hrelić=0.3; Volovčica=0.3;
      Folnegovićevo naselje/Folnegovićevo=0.3; Retkovec=0.3; Mlinovi=0.3; Bukovac=0.3; Petruševec=0.3;
      Granešina=0.3; Jelkovec/Novi Jelkovec=0.3; Staglišće=0.3; Kruge=0.3; Studentski grad=0.2; Brestje=0.1`,
  },
  {
    slug: "utvrda",
    group: "hr",
    title: "Dvorac, utvrda ili zidine u Hrvatskoj",
    strip: ["dvorac", "tvrdava", "utvrda", "kastel", "zidine"],
    answers: `Trakošćan=15; Veliki Tabor=6; Klis/Tvrđava Klis=6; Dioklecijanova palača=5;
      Dubrovačke zidine/Zidine Dubrovnika=5; Tvrđa/Osječka Tvrđa=4; Nehaj=3; Lovrijenac=3; Medvedgrad=3;
      Trsat/Trsatska gradina=2; Stonske zidine/Ston=2; Kninska tvrđava/Knin=2; Tvrđava svetog Nikole/Sveti Nikola=1.5;
      Stari grad Varaždin/Varaždin=1.5; Minčeta=1; Fortica/Španjola=1; Dubovac=1; Dvorac Eltz/Eltz=1;
      Dvorac Pejačević/Pejačević=1; Kamerlengo=1; Knežev dvor=1; Revelin=0.8; Barone=0.8; Ozalj/Stari grad Ozalj=0.8;
      Tvrđava Brod/Brodska tvrđava=0.8; Stari grad Čakovec/Čakovec=0.8; Tvrđava svetog Mihovila/Sveti Mihovil=0.5;
      Ružica grad=0.5; Oršić/Dvorac Oršić=0.5; Odescalchi/Dvorac Odescalchi=0.5; Kaštel Pazin/Pazin=0.5;
      Mali Tabor=0.3; Prandau/Dvorac Prandau-Normann=0.3; Gvozdansko=0.3; Bosiljevo=0.3; Sokolac=0.3;
      Drivenik=0.3; Grobnik=0.3; Kaštel Gomilica/Gomilica=0.3; Morosini-Grimani/Svetvinčenat=0.3;
      Brezovica/Dvorac Brezovica=0.3; Lužnica/Dvorac Lužnica=0.2; Januševec/Dvorac Januševec=0.2;
      Petrapilosa=0.2; Kostel=0.2; Cesargrad=0.2; Lukavec=0.2; Bokar=0.2; Oštrc=0.1`,
  },
  {
    slug: "eurovizija",
    group: "hr",
    title: "Hrvatski izvođač na Euroviziji",
    hint: "Uključujući Hrvate koji su nastupali za Jugoslaviju",
    strip: [],
    answers: `Baby Lasagna=25; Let 3/Let tri=12; Severina=10; Doris Dragović/Doris=5; Riva=4; Tony Cetinski/Toni Cetinski=3;
      Nina Badrić=3; Jacques Houdek=3; Danijela/Danijela Martinović=2; Roko/Roko Blažević=2; Albina=2;
      Marko Bošnjak=2; Franka/Franka Batelić=1.5; Mia Dimšić=1.5; Nina Kraljić=1.5; Kraljevi ulice=1.5;
      Magazin=1.5; Klapa s Mora=1; Boris Novković=1; Vanna=0.8; Goran Karan=0.8; Maja Blagdan=0.8;
      Feminnem=0.8; Damir Kedžo=0.8; Novi fosili=0.8; Igor Cukrov=0.5; Dado Topić=0.5; Ivan Mikulić=0.5;
      Claudia Beni=0.5; Vesna Pisarović=0.5; Tereza Kesovija=0.5; Daria Kinzer/Daria=0.4; Dragonfly=0.3;
      E.N.I./ENI=0.3; Put=0.3; Andrea Šušnjara=0.3; 75 Cents=0.2; Lidija Horvat=0.2`,
  },
  {
    slug: "zensko-ime",
    group: "hr",
    title: "Žensko ime",
    strip: [],
    answers: `Ana=8; Marija=7; Ivana=5; Petra=4; Lucija=4; Mia=3; Sara=3; Maja=3; Martina=3; Katarina/Kata=3;
      Ena=2; Lana=2; Nikolina=2; Marina=2; Kristina=2; Iva=2; Jelena=2; Josipa=1.5; Tea=1.5; Dora=1.5; Lea=1.5;
      Nika=1.5; Ema=1.5; Marta=1.5; Ivona=1; Klara=1; Karla=1; Laura=1; Elena=1; Paula=1; Mara=1; Vesna=1;
      Sanja=1; Tanja=1; Andrea=1; Barbara=1; Nina=1; Eva=1; Snježana=0.8; Mirjana=0.8; Danijela=0.8;
      Antonija=0.8; Helena=0.8; Irena=0.8; Mateja=0.8; Monika=0.8; Nataša=0.8; Tamara=0.8; Valentina=0.8;
      Matea=0.8; Hana=0.8; Lena=0.6; Rita=0.5; Ankica/Anka=0.5; Gordana=0.5; Dubravka=0.5; Branka=0.5;
      Ljiljana=0.5; Antonela=0.5; Dijana=0.5; Jasna=0.5; Lidija=0.5; Renata=0.5; Željka=0.5; Magdalena=0.5;
      Mihaela=0.5; Tena=0.5; Una=0.5; Tara=0.5; Silvija=0.4; Vanja=0.4; Gabrijela=0.4; Slavica=0.4; Štefica=0.4;
      Lora=0.4; Nora=0.4; Ela=0.4; Franka=0.4; Vita=0.4; Ivka=0.3; Zrinka=0.3; Višnja=0.3; Vlatka=0.3;
      Blanka=0.3; Iris=0.3; Bruna=0.3; Klaudija=0.3; Roza/Rozalija=0.2; Aurora=0.2; Jana=0.8; Lara=0.8;
      Kaja=0.5; Rebeka=0.3; Ines=0.5; Sonja=0.5; Biserka=0.2; Đurđica=0.2`,
  },
  {
    slug: "musko-ime",
    group: "hr",
    title: "Muško ime",
    strip: [],
    answers: `Ivan=8; Marko=6; Luka=5; Josip/Joža/Jozo=4; Ante=4; Tomislav/Tomo=3; Stjepan/Stipe/Stipo/Štef=3;
      Petar/Pero=3; Nikola=2.5; Mario=2; Matej=2; Filip=2; David=2; Antonio=1.5; Mateo=1.5; Goran=1.5; Hrvoje=1.5;
      Karlo=1; Lovro=1; Jakov=1; Dario=1; Davor=1; Domagoj=1; Dražen=1; Damir=1; Darko=1; Igor=1;
      Krešimir/Krešo=1; Mate=1; Mirko=1; Ivica=1; Ivo=1; Jure=1; Marin=1; Martin=1; Matija=1; Robert=0.8;
      Zoran=0.8; Zvonimir/Zvonko=0.8; Željko=0.8; Boris=0.8; Bruno=0.8; Dominik=0.8; Leon=0.8; Niko=0.8;
      Roko=0.8; Toni=0.8; Franjo=0.8; Kristijan=0.5; Mladen=0.5; Mislav=0.5; Neven=0.5; Siniša=0.5; Slaven=0.5;
      Tihomir=0.5; Vedran=0.5; Branko=0.5; Dino=0.5; Duje=0.5; Frane/Frano=0.5; Juraj=0.5; Leo=0.5; Patrik=0.5;
      Šime=0.5; Viktor=0.5; Zlatko=0.5; Nenad=0.4; Branimir=0.4; Mihael=0.4; Vito=0.4; Đuro=0.4; Joško=0.4;
      Krunoslav/Kruno=0.4; Gabrijel=0.3; Mihovil=0.3; Dragutin=0.3; Valentin=0.3; Emanuel=0.2; Borna=0.5;
      Fran=0.5; Noa=0.4; Gabriel=0.3; Lukas=0.3; Tin=0.5; Vid=0.3; Ilija=0.3; Andrija=0.4; Ognjen=0.2`,
  },
  {
    slug: "jezero",
    group: "hr",
    title: "Jezero u Hrvatskoj",
    strip: ["jezero"],
    answers: `Vransko jezero/Vransko=15; Plitvička jezera/Plitvice=15; Jarun=10; Bundek=8; Peruča=6; Modro jezero=4;
      Crveno jezero=3; Prokljansko jezero/Prokljan=2; Kozjak=2; Lokvarsko jezero/Lokve=2; Visovačko jezero/Visovac=2;
      Trakošćansko jezero=1.5; Prošćansko jezero/Prošće=1; Bajer=1; Sabljaci=1; Baćinska jezera=1;
      Mljetska jezera/Veliko jezero/Malo jezero=1; Šoderica=1; Galovac=0.5; Jezero Mir/Mir=0.5; Sakadaš=0.5;
      Kopačko jezero=0.8; Kruščica=0.5; Rakitje=0.5; Gradinsko jezero=0.3; Kuti=0.3; Ponikve=0.3; Butoniga=0.3;
      Borovik=0.3; Savica=0.3`,
  },
  {
    slug: "politicar",
    group: "hr",
    title: "Hrvatski političar ili povijesna osoba",
    hint: "Političar, ban, kralj ili državnik, i danas i kroz povijest",
    strip: [],
    answers: `Franjo Tuđman/Tuđman=14; Andrej Plenković/Plenković=11; Zoran Milanović/Milanović=9;
      Kolinda Grabar-Kitarović/Kolinda/Grabar-Kitarović=7; Ivo Sanader/Sanader=5; Stjepan Mesić/Stipe Mesić/Mesić=5;
      Ivo Josipović/Josipović=3.5; Josip Broz Tito/Tito=4; Milan Bandić/Bandić=3.5; Jadranka Kosor/Kosor=3;
      Ivica Račan/Račan=3; Stjepan Radić/Radić=3; Josip Jelačić/Ban Jelačić/Jelačić=3; Tomislav Tomašević/Tomašević=3;
      Kralj Tomislav=3; Ante Starčević/Starčević=2; Miroslav Škoro/Škoro=2; Ivan Pernar/Pernar=2;
      Nikola Šubić Zrinski/Zrinski=1.5; Petar Zrinski=0.8; Fran Krsto Frankopan/Frankopan=0.8; Gojko Šušak/Šušak=1;
      Tihomir Orešković/Orešković=1; Božo Petrov=1; Gordan Jandroković/Jandroković=1; Vesna Pusić=1;
      Radimir Čačić/Čačić=1; Vladimir Šeks/Šeks=1; Tomislav Karamarko/Karamarko=1; Željko Kerum/Kerum=1;
      Milorad Pupovac/Pupovac=1; Mislav Kolakušić/Kolakušić=1; Ante Pavelić=1; Davor Božinović/Božinović=0.8;
      Petar Krešimir IV/Petar Krešimir=0.8; Zvonimir/Kralj Zvonimir=0.8; Eugen Kvaternik/Kvaternik=0.3;
      Vladko Maček/Maček=0.5; Savka Dabčević-Kučar=0.5; Mate Granić=0.5; Željko Reiner=0.5; Dražen Budiša=0.5;
      Davor Bernardić=0.5; Peđa Grbin=0.5; Siniša Hajdaš Dončić=0.5; Sandra Benčić=0.5; Ivan Penava=0.5;
      Ruža Tomašić=0.5; Dalija Orešković=0.5; Dragan Primorac=0.5; Zdravko Marić=0.5; Mika Tripalo=0.3;
      Andrija Hebrang=0.3; Hrvoje Šarinić=0.3; Nikica Valentić=0.3; Zlatko Mateša=0.3; Franjo Gregurić=0.3;
      Josip Manolić=0.3; Marijana Petir=0.3; Bruna Esih=0.3; Anka Mrak-Taritaš=0.3; Ivan Anušić=0.3;
      Gordan Grlić Radman=0.3; Nikola Grmoja=0.3; Davor Ivo Stier=0.3; Damir Kajin=0.3; Ljudevit Gaj=0.5`,
  },
];
