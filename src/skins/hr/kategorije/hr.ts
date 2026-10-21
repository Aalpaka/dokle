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
      Snježnik=0.5; Kamešnica=0.5; Ćićarija=0.5; Sveti Ilija=0.5; Bilogora=0.5; Dilj/Dilj gora=0.4; Zrinska gora=0.4;
      Požeška gora=0.3; Obruč=0.3; Promina=0.3; Vojak=0.3; Strahinjčica=0.3; Ravna gora=0.3; Zavižan=0.3;
      Tulove grede=0.3; Japetić=0.3; Sinjal=0.3; Vaganski vrh=0.3; Macelj=0.2; Moseć=0.2; Lisina=0.2; Sniježnica=0.3;
      Rilić=0.3; Opor=0.3; Perun=0.3; Omiška Dinara=0.3; Visočica=0.3; Sveto brdo=0.3; Sveta Gera/Trdinov vrh=0.3;
      Plešivica=0.3; Tuhobić=0.3; Šatorina=0.2; Crnopac=0.2; Viševica=0.2; Bitoraj=0.2; Hum=0.2; Sveti Nikola=0.2;
      Osorščica=0.2; Obzova=0.2; Okić=0.2; Kuna gora=0.2; Trgovska gora=0.2; Šamarica=0.2; Vukomeričke gorice=0.2;
      Brezovo polje=0.2; Matokit=0.1; Cesargradska gora=0.1; Oštrc=0.1; Ličko sredogorje=0.1; Orljak=0.1;
      Kamenjak=0.1; Televrin=0.1; Žbevnica=0.1`,
  },
  {
    slug: "park",
    group: "hr",
    title: "Nacionalni park ili zaštićeno područje u Hrvatskoj",
    hint: "Nacionalni park, park prirode, rezervat ili spomenik prirode",
    strip: ["park", "np", "pp", "nacionalni"],
    answers: `Plitvička jezera/Plitvice/NP Plitvice=28; Krka/NP Krka/Slapovi Krke=14; Kopački rit=6; Kornati=5;
      Brijuni/Brioni=5; Paklenica=5; Mljet=4; Risnjak=3; Biokovo=2.5; Lonjsko polje=2.5; Sjeverni Velebit=2; Papuk=2;
      Telašćica=2; Velebit/Park prirode Velebit=2; Učka=1.5; Vransko jezero=1.5; Medvednica=1.5; Žumberak=1;
      Lastovsko otočje/Lastovo=1; Kamenjak/Rt Kamenjak=0.8; Maksimir/Park Maksimir=0.8;
      Dinara/Park prirode Dinara=0.5; Marjan/Park-šuma Marjan=0.5; Lokrum=0.5; Rastoke=0.5; Delta Neretve=0.5;
      Crveno jezero=0.4; Modro jezero=0.4; Baćinska jezera=0.3; Malostonski zaljev=0.3; Cerovačke špilje=0.2;
      Vražji prolaz=0.2; Zeleni vir=0.2; Samarske stijene=0.2; Rožanski kukovi/Hajdučki kukovi=0.2;
      Cetina/Izvor Cetine=0.2; Modrić špilja=0.1; Limski kanal/Limski zaljev=1; Modra špilja/Biševo=1;
      Barać špilje/Baraćeve špilje=0.5; Zlatni rt=0.5; Arboretum Trsteno/Trsteno=0.5;
      Mura-Drava/Regionalni park Mura-Drava=0.5; Palud=0.3; Pantan=0.3; Motovunska šuma=0.3;
      Grabovača/Park Grabovača=0.3; Veternica=0.3; Lokvarka/Špilja Lokvarka=0.3; Vrelo/Špilja Vrelo=0.3;
      Biserujka=0.3; Manita peć=0.3; Botanički vrt=0.3; Moslavačka gora=0.3; Kamačnik=0.3; Crna Mlaka=0.3;
      Velebitski botanički vrt=0.3; Đula-Medvedica=0.2; Komrčar=0.2; Dundo=0.2; Tuškanac=0.2; Dotršćina=0.2;
      Arboretum Opeke/Opeke=0.2; Golubovec=0.1; Šijana=0.1; Grmoščica=0.1; Turopoljski lug=0.1; Štirovača=0.1;
      Krčić=0.1; Prašnik=0.1; Krapje Đol=0.1`,
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
      Zabranjena ljubav=3; Ruža vjetrova=2; Crno-bijeli svijet/Crno bijeli svijet=2; Stipe u gostima=2; Luda kuća=2;
      Svećenikova djeca=2; Novine=1.5; Mejaši=1.5; Bračne vode=1.5; Odmori se, zaslužio si/Odmori se zasluzio si=1.5;
      Ne daj se, Nina/Ne daj se Nina=1.5; Što je muškarac bez brkova=1.5; Kad mrtvi zapjevaju=1; Maršal=1;
      Metastaze=1; Na terapiji=1; Pogrešan čovjek=1; Bumbari=1; Najbolje godine=1; Družba Pere Kvržice=1;
      Koko i duhovi=1; Mamutica=0.8; Vlak u snijegu=0.8; Fine mrtve djevojke=0.8; Ne okreći se sine=0.5; Breza=0.5;
      Ljudožder vegetarijanac=0.5; Seljačka buna=0.5; Dobre namjere=0.5; Počivali u miru=0.5; Nemoj nikome reći=0.5;
      Dar mar=0.5; Oprosti za kung fu=0.4; Uspjeh=0.4; H8=0.3; Gospa=0.3; Surogat=0.3; Zlatne godine=0.3;
      Libertas=0.3; Zora dubrovačka=0.3; Kotlovina=0.3; Duh babe Ilonke=0.3;
      Čudnovate zgode šegrta Hlapića/Šegrt Hlapić/Hlapić=1; Zvizdan=1; Kako je počeo rat na mom otoku=1;
      Bitka na Neretvi=1; Leteći medvjedići=1; Prosjaci i sinovi=0.5; U registraturi=0.5; Nepokoreni grad=0.5;
      Zauvijek susjedi=0.5; Na granici=0.5; Kiklop=0.5; Okupacija u 26 slika=0.5; Glembajevi=0.5; Ježeva kućica=0.5;
      Murina=0.5; Kapelski kresovi=0.3; Zakon ljubavi=0.3; Villa Maria=0.3; Obični ljudi=0.3;
      Pjevajte nešto ljubavno=0.3; Što je Iva snimila 21. listopada 2003./Što je Iva snimila=0.3; Ničiji sin=0.3;
      Ne gledaj mi u pijat=0.3; Duga mračna noć=0.3; Vuk samotnjak=0.3; Područje bez signala=0.3; Sigurno mjesto=0.3;
      General=0.3; Sedamdeset i dva dana=0.3; Ne dao Bog većeg zla=0.3; Nikola Tesla=0.2; Putovanje u Vučjak=0.2;
      Lisice=0.2; Tajna Nikole Tesle=0.2; Mali=0.2; Rondo=0.1`,
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
      Petar Preradović/Preradović=1.5; Miro Gavran/Gavran=1.5; Ranko Marinković/Marinković=1;
      Pavao Pavličić/Pavličić=1; Ante Tomić=1; Miljenko Jergović/Jergović=1; Petar Hektorović/Hektorović=0.8;
      Ksaver Šandor Gjalski/Gjalski=0.8; Ante Kovačić=0.8; Josip Kozarac/Kozarac=0.8; Vjenceslav Novak=0.8;
      Dinko Šimunović/Šimunović=0.8; Grigor Vitez/Vitez=0.8; Ivan Kušan/Kušan=0.8; Goran Tribuson/Tribuson=0.8;
      Dubravka Ugrešić/Ugrešić=0.8; Petar Zoranić/Zoranić=0.5; Eugen Kumičić/Kumičić=0.5; Ivo Vojnović/Vojnović=0.5;
      Slobodan Novak=0.5; Slavko Kolar/Kolar=0.5; Zvonimir Balog/Balog=0.5; Hrvoje Hitrec/Hitrec=0.5;
      Luko Paljetak/Paljetak=0.5; Jure Kaštelan/Kaštelan=0.5; Hanibal Lucić/Lucić=0.4; Antun Šoljan/Šoljan=0.4;
      Slavenka Drakulić/Drakulić=0.4; Ivana Simić Bodrožić=0.4; Zoran Ferić/Ferić=0.4; Fran Galović/Galović=0.4;
      Janko Polić Kamov/Kamov=0.4; Vladan Desnica/Desnica=0.4; Ivan Aralica/Aralica=0.4; Janko Leskovar/Leskovar=0.3;
      Milan Begović/Begović=0.3; Ivan Slamnig/Slamnig=0.3; Kristian Novak=0.3; Arsen Dedić=0.3;
      Dragutin Domjanić/Domjanić=0.3; Nedjeljko Fabrio/Fabrio=0.3; Josip Pupačić/Pupačić=0.3; Faust Vrančić=0.2;
      Andrija Kačić Miošić/Kačić=0.5; Matija Antun Reljković/Reljković=0.4; Ljudevit Gaj/Gaj=0.5;
      Tituš Brezovački/Brezovački=0.2; Marija Jurić Zagorka/Zagorka=0.5; Antun Mihanović/Mihanović=0.3;
      Miljenko Smoje/Smoje=0.3; Fran Krsto Frankopan/Frankopan=0.2; Stanko Vraz/Vraz=0.2; Gustav Krklec/Krklec=0.2;
      Ivo Brešan/Brešan=0.2; Šiško Menčetić/Menčetić=0.1; Džore Držić=0.1; Mavro Vetranović/Vetranović=0.1;
      Nikola Nalješković/Nalješković=0.1; Juraj Baraković/Baraković=0.1; Ivan Bunić Vučić/Bunić=0.1;
      Junije Palmotić/Palmotić=0.1; Ignjat Đurđević/Đurđević=0.1; Antun Kanižlić/Kanižlić=0.1;
      Filip Grabovac/Grabovac=0.1; Pavao Ritter Vitezović/Vitezović=0.1; Bartol Kašić/Kašić=0.1;
      Juraj Križanić/Križanić=0.1; Dimitrija Demeter/Demeter=0.1; Ivan Kukuljević Sakcinski/Kukuljević=0.1;
      Luka Botić/Botić=0.1; August Harambašić/Harambašić=0.1; Josip Eugen Tomić=0.1; Fran Mažuranić=0.1;
      Vladimir Vidrić/Vidrić=0.1; Milutin Cihlar Nehajev/Nehajev=0.1; Viktor Car Emin/Car Emin=0.1;
      August Cesarec/Cesarec=0.1; Nikola Šop/Šop=0.1; Ivo Kozarčanin/Kozarčanin=0.1; Petar Šegedin/Šegedin=0.1;
      Vjekoslav Kaleb/Kaleb=0.1; Slavko Mihalić/Mihalić=0.1; Vesna Krmpotić/Krmpotić=0.1; Zvonimir Golob/Golob=0.1;
      Tonko Maroević/Maroević=0.1; Danijel Dragojević/Dragojević=0.1; Irena Vrkljan/Vrkljan=0.1;
      Daša Drndić/Drndić=0.1; Sunčana Škrinjarić/Škrinjarić=0.1; Jagoda Truhelka/Truhelka=0.1; Anto Gardaš/Gardaš=0.1;
      Milivoj Matošec/Matošec=0.1; Pajo Kanižaj/Kanižaj=0.1; Božidar Prosenjak/Prosenjak=0.1;
      Damir Karakaš/Karakaš=0.1; Renato Baretić/Baretić=0.1; Robert Perišić=0.1; Edo Popović=0.1; Jurica Pavičić=0.1;
      Ivan Raos/Raos=0.1`,
  },
  {
    slug: "brend",
    group: "hr",
    title: "Hrvatski proizvod, tvrtka ili brend",
    strip: [],
    answers: `Vegeta=12; Kraš=8; Podravka=8; Cedevita=7; Ledo=5; Ožujsko=4; Franck=3; Jamnica=3; Karlovačko=3;
      Bajadera=3; Dorina=2; Jana=2; Dukat=2; Vindija=2; Gavrilović=2; Čokolino=2; Rimac/Rimac Automobili=2; Konzum=2;
      Ki-Ki/Kiki/Kiki bombon=1.5; Domaćica=1.5; Napolitanke=1.5; Lino Lada/Linolada=1.5; Pliva=1.5; Jadrolinija=1.5;
      INA=1.5; Borovo=1.5; Studena=1; Zvijezda=1; PIK Vrbovec/PIK=1; Životinjsko carstvo=1; Croatia Airlines=1;
      Končar=1; Studenac=1; Badel/Badel 1862=0.8; Belupo=0.8; Tisak=0.8; Tommy=0.8; Kraš Express=0.5;
      Pan/Pan pivo=0.5; Koestlin=0.5; Atlantic/Atlantic Grupa=0.5; Infobip=0.5; Plodine=0.5; Varteks=0.5; Fant=0.5;
      Brionka=0.3; Fortenova=0.3; Ronhill=0.3; Walter Wolf=0.3; Kamensko=0.3; Galeb=0.3; Paški sir=1;
      Maraschino Maraska/Maraska=0.5; Nanobit=0.3; Photomath=0.3; HEP=0.5; Hrvatska pošta=0.3;
      HT/Hrvatski Telekom=0.5; Agrokor=0.8; Kravata/Kravate=0.5; Kulen/Slavonski kulen=0.5;
      Licitar/Licitarsko srce=0.5; Zagrebačka banka/Zaba=0.5; Pršut/Dalmatinski pršut/Istarski pršut=0.3; Penkala=0.3;
      Čazmatrans=0.3; PBZ/Privredna banka=0.3; 24sata=0.3; Nova TV=0.3; HRT=0.3; HŽ/Hrvatske željeznice=0.3;
      Belje=0.3; Osječko=0.3; Mlinar=0.3; Kandit=0.3; Pipi=0.3; Saponia=0.3; Emmezeta=0.3; Pevex=0.3; KTC=0.3;
      Bronhi=0.3; Z bregov=0.3; Croata=0.3; Jutarnji list/Jutarnji=0.2; Večernji list/Večernji=0.2;
      Slobodna Dalmacija=0.2; Index/Index.hr=0.2; Ribola=0.2; Koka=0.2; Kutjevo=0.2; Tomislav pivo=0.2;
      Velebitsko=0.2; Ličanka=0.2; Zvečevo=0.2; Bakina tajna=0.2; Krašotice=0.2; Pelinkovac=0.2; Travarica=0.2;
      Đuro Đaković=0.2; Uljanik=0.2; Brodosplit=0.2; DOK-ING/Doking=0.2; Faks helizim/Faks=0.2; Eva=0.2;
      Hrvatska lutrija/Loto=0.2; Super Sport=0.2; ZET=0.2; HPB/Hrvatska poštanska banka=0.2;
      TDR/Tvornica duhana Rovinj=0.2; Links=0.2; Griotte=0.1; Sirela=0.1; Pivac=0.1; Iločki podrumi=0.1; Zmajsko=0.1;
      Žito=0.1; Klara=0.1; Greyp=0.1; Microblink=0.1; Gideon=0.1; Orqa=0.1; Verne=0.1; Ericsson Nikola Tesla=0.1;
      Dalekovod=0.1; Petrokemija=0.1; Sancta Domenica=0.1; Benston=0.1; Filter 160=0.1; Iskon=0.1; Samoborček=0.1;
      Bermet=0.1; Torpedo=0.1`,
  },
  {
    slug: "kolac",
    group: "hr",
    title: "Kolač ili slastica",
    strip: ["kolac"],
    answers: `Kremšnita/Krempita/Samoborska kremšnita=10; Palačinke/Palačinka=8; Orahnjača=7; Makovnjača=5;
      Štrudla/Savijača/Štrudl=5; Fritule/Fritole=4; Krafne/Krofne/Pokladnice=4; Torta=4;
      Pita od jabuka/Jabučnjak/Pita s jabukama=4; Vanilin kiflice/Kiflice=3; Čupavci=3; Baklava=3; Tiramisu=3;
      Sladoled=3; Rožata=2.5; Rapska torta=2; Kroštule=2; Breskvice=2; Mađarica=2; Puding=2;
      Knedle sa šljivama/Knedle=2; Medenjaci=1.5; Linzeri/Linzer=1.5; Sacher torta/Sacher=1.5;
      Cheesecake/Torta od sira=1.5; Keksi=1.5; Kuglof=1.5; Šnenokle/Snježne kugle=1.5; Bučnica=1; Paprenjaci=1;
      Šape=1; Tulumbe=1; Hurmašice=1; Muffini=1; Čokoladna torta=1; Doboš torta=1; Pinca=1; Bajadera=1; Uštipci=1;
      Krem karamel=1; Rizogalo=1; Štrukli=1; Sirnica=0.8; Brownie=0.8; Princes krafne=0.8; Ruske kape=0.5;
      Tufahije=0.5; Panna cotta=0.5; Kuglice=0.5; Torta od mrkve=0.5; Arancini=0.4; Mandulat=0.3; Zlevka=0.3;
      Mantala=0.2; Ravani=0.2; Šampita=0.5; Mramorni kolač/Mramorni=0.5; Rolada/Biskvit rolada=0.5;
      Lijena pita/Lenja pita=0.5; Ekler/Éclair=0.5; Kroasan/Croissant=0.5; Gofre/Vafli/Waffle=0.5; Kesten pire=0.5;
      Švarcvald torta/Schwarzwald torta=0.5; Esterhazy torta/Esterházy=0.3; Gibanica/Pita od sira=0.3; Pusice=0.3;
      Ledene kocke=0.3; Biskvit=0.3; Krokan=0.3; Paradižot=0.3; Pandišpanj=0.3; Pita od bundeve=0.3;
      Pita od višanja=0.3; Profiterole=0.3; Makaron/Macarons=0.3; Cupcake/Kapkejk=0.3; Pavlova=0.3; Halva=0.3;
      Indijaneri/Indijanci=0.3; Donut=0.3; Reform torta=0.2; Moskva šnita=0.2; Prekmurska gibanica=0.2;
      Bruštulani=0.2; Rafioli=0.2; Cukarini=0.2; Vasina torta=0.2; Punč šnite/Punč torta=0.2; Kolač od rogača=0.2;
      Lumblija=0.1`,
  },
  {
    slug: "vino",
    group: "hr",
    title: "Hrvatsko vino ili sorta grožđa",
    strip: ["vino"],
    answers: `Plavac mali/Plavac=15; Graševina=12; Malvazija/Malvazija istarska=10; Pošip=6; Teran=5; Dingač=5;
      Babić=3; Žlahtina=3; Traminac=3; Postup=2; Grk=2; Frankovka=2; Muškat/Muškat momjanski/Momjanski muškat=2;
      Merlot=2; Cabernet/Cabernet sauvignon/Kabernet=2; Prošek=2; Rizling/Rajnski rizling=1.5; Chardonnay/Šardone=1.5;
      Vugava=1; Debit=1; Maraština=1; Crljenak/Crljenak kaštelanski/Tribidrag=1; Škrlet=1;
      Sauvignon/Sauvignon bijeli=1; Pinot sivi/Sivi pinot=0.8; Bogdanjuša=0.5; Kujundžuša=0.5; Plavina=0.5;
      Kraljevina=0.5; Pinot crni=0.5; Portugizac=0.5; Lasina=0.3; Rukatac=0.3; Gegić=0.3; Ninčuša=0.2; Trnjak=0.2;
      Zweigelt=0.2; Pinot bijeli=0.3; Syrah=0.2; Ivan Dolac=0.5; Dobričić=0.3; Faros=0.3; Zlatan Plavac=0.3;
      Pušipel=0.3; Malvasija dubrovačka=0.3; Bakarska vodica=0.3; Opolo=0.3; Kadarka=0.2;
      Silvanac/Silvanac zeleni=0.2; Muškat žuti=0.2; Muškat ruža=0.2; Ružica=0.2; Moslavac/Furmint=0.2; Borgonja=0.2;
      Cabernet franc=0.2; Müller-Thurgau/Muller Thurgau=0.2; Refošk=0.2; Babica=0.1; Hrvatica=0.1; Pagadebit=0.1;
      Glavinuša=0.1; Ljutun=0.1; Plemenka=0.1; Drnekuša=0.1`,
  },
  {
    slug: "pice",
    group: "hr",
    title: "Rakija ili alkoholno piće",
    strip: [],
    answers: `Šljivovica/Šljivovača=14; Travarica=10; Lozovača/Loza=9; Pelinkovac/Pelin=7; Rakija=5;
      Viljamovka/Vilijamovka/Kruškovača/Kruškovac=4; Medica/Medenica=4; Orahovac=3; Maraskino/Maraschino=3; Pivo=3;
      Vino=3; Biska=2; Dunjevača/Dunja=2; Gemišt=2; Votka/Vodka=2; Viski/Whisky=2; Komovica=1.5; Bambus=1.5;
      Prošek=1.5; Vinjak=1.5; Jägermeister/Jeger=1.5; Jabukovača=1; Smokovača=1; Bevanda=1; Višnjevac/Višnja=1;
      Klekovača/Borovička=1; Gin=1; Rum=1; Tekila/Tequila=1; Rogačica=0.5; Kupinovac=0.5; Liker=0.5; Šampanjac=0.5;
      Teranino=0.3; Bermet=0.2; Aperol=1; Baileys/Bejlis=1; Konjak/Cognac=1; Prosecco=1; Kuhano vino=1;
      Absint/Absinthe=0.5; Ouzo=0.5; Sake=0.5; Brendi/Brandy=0.5; Vermut/Martini=0.5; Campari=0.5; Amaretto=0.5;
      Limoncello=0.5; Sambuca=0.5; Medovina=0.5; Špricer=0.5; Šnaps=0.5; Kajsijevača/Marelovača=0.3;
      Cherry/Cherry Brandy=0.3; Grappa=0.3; Porto=0.3; Becherovka=0.3; Malibu=0.3; Cider/Jabučno vino=0.3;
      Bourbon=0.3; Brinjevec=0.2; Amaro=0.2; Soju=0.2; Mezcal=0.2; Kalvados/Calvados=0.2; Šeri/Sherry=0.2; Unicum=0.2;
      Kahlúa=0.2; Cointreau=0.2; Mistrà/Mistra=0.2; Borovnica=0.2; Pálinka/Palinka=0.2; Cachaça=0.1; Armanjak=0.1;
      Arak=0.1; Pastis=0.1; Pisco=0.1`,
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
      Vukovarsko-srijemska=1; Virovitičko-podravska=0.8; Požeško-slavonska=0.8; Brodsko-posavska=0.8; Prigorje=0.5;
      Turopolje=0.5; Ravni kotari=0.5; Bukovica=0.3; Dolina Neretve=0.3; Makarsko primorje/Makarska rivijera=0.5;
      Žumberak=0.3; Pokuplje=0.3; Gacka=0.3; Krbava=0.3; Poljica=0.3; Cetinska krajina=0.3; Imotska krajina=0.3;
      Vojna krajina=0.3; Pounje=0.2; Velebitsko podgorje/Podgorje=0.2; Pelješac=0.2; Dubrovačko primorje=0.2;
      Župa dubrovačka/Župa=0.2; Đakovština=0.2; Podunavlje/Hrvatsko podunavlje=0.2; Bilogora=0.2; Vinodol=0.2;
      Labinština=0.1; Bujština=0.1; Liburnija=0.1`,
  },
  {
    slug: "kvart",
    group: "hr",
    title: "Zagrebački kvart ili naselje",
    strip: ["kvart", "naselje"],
    answers: `Trešnjevka=8; Dubrava=6; Maksimir=5; Sesvete=5; Novi Zagreb=4; Trnje=4; Gornji grad=4; Špansko=3;
      Črnomerec=3; Jarun=3; Donji grad=3; Podsused=2; Medveščak=2; Peščenica=2; Knežija=2; Travno=2; Vrapče=2;
      Kaptol=2; Savica=1.5; Kustošija=1.5; Utrina=1; Siget=1; Sopot=1; Zapruđe=1; Dugave=1; Trnsko=1; Remetinec=1;
      Stenjevec=1; Šalata=1; Šestine=1; Gračani=1; Rudeš=1; Sloboština=0.8; Malešnica=0.8; Tuškanac=0.8; Voltino=0.8;
      Ljubljanica=0.8; Prečko=0.8; Gajnice=0.5; Ribnjak=0.5; Pantovčak=0.5; Markuševec=0.5; Vrbik=0.5; Martinovka=0.5;
      Kajzerica=0.5; Lanište=0.5; Blato=0.5; Sveta Klara=0.5; Jakuševec=0.5; Žitnjak=0.5; Borongaj=0.5;
      Ferenščica=0.5; Kozari bok/Kozari=0.5; Svetice=0.5; Ravnice=0.5; Srednjaci=0.5; Cvjetno naselje=0.5;
      Kvatrić=0.5; Ksaver=0.3; Botinec=0.3; Hrelić=0.3; Volovčica=0.3; Folnegovićevo naselje/Folnegovićevo=0.3;
      Retkovec=0.3; Mlinovi=0.3; Bukovac=0.3; Petruševec=0.3; Granešina=0.3; Jelkovec/Novi Jelkovec=0.3;
      Staglišće=0.3; Kruge=0.3; Studentski grad=0.2; Brestje=0.1; Brezovica=0.2; Podsljeme=0.2; Lučko=0.2;
      Jankomir=0.2; Sveti Duh=0.2; Gornja Dubrava=0.1; Donja Dubrava=0.1; Dubec=0.1; Trnava=0.1; Čulinec=0.1;
      Poljanice=0.1; Ivanja Reka=0.1; Resnik=0.1; Kozari putevi=0.1; Hrastje=0.1; Sesvetski Kraljevec=0.1; Kašina=0.1;
      Vugrovec=0.1; Jordanovac=0.1; Laščina=0.1; Remete=0.1; Prekrižje=0.1; Jabukovac=0.1; Zelengaj=0.1; Vrbani=0.1;
      Prisavlje=0.1; Savski gaj=0.1; Središće=0.1; Odra=0.1; Kupinečki Kraljevec=0.1; Perjavica=0.1; Mikulići=0.1;
      Horvati=0.1; Borovje=0.1; Čučerje=0.1; Sigečica=0.1; Hrvatski Leskovac=0.1; Mala Mlaka=0.1; Veliko Polje=0.1;
      Buzin=0.1`,
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
      Mali Tabor=0.3; Prandau/Dvorac Prandau-Normann=0.3; Gvozdansko=0.3; Bosiljevo=0.3; Sokolac=0.3; Drivenik=0.3;
      Grobnik=0.3; Kaštel Gomilica/Gomilica=0.3; Morosini-Grimani/Svetvinčenat=0.3; Brezovica/Dvorac Brezovica=0.3;
      Lužnica/Dvorac Lužnica=0.2; Januševec/Dvorac Januševec=0.2; Petrapilosa=0.2; Kostel=0.2; Cesargrad=0.2;
      Lukavec=0.2; Bokar=0.2; Oštrc=0.1; Zadarske zidine=0.5; Dvigrad=0.5; Tvrđava svetog Ivana/Sveti Ivan=0.3;
      Kaštel Lukšić=0.3; Zrin=0.3; Kaštel Frankopan=0.3; Motovunske zidine/Motovun=0.3; Kaštel Pula/Pulski kaštel=0.3;
      Susedgrad=0.3; Dvorac Novi Dvori/Novi Dvori=0.3; Dvorac Bežanec/Bežanec=0.2; Dvorac Miljana/Miljana=0.2;
      Dvorac Bistra=0.2; Dvorac Mailáth/Mailáth=0.2; Dvorac Tikveš/Tikveš=0.2; Dvorac Khuen-Belasi/Nuštar=0.2;
      Dvorac Erdődy/Erdődy=0.2; Dvorac Janković/Janković=0.2; Dvorac Kerestinec/Kerestinec=0.2; Modruš=0.2; Rmanj=0.2;
      Drežnik=0.2; Cetin/Cetingrad=0.2; Ostrovica=0.2; Kalnik/Stari grad Kalnik=0.2;
      Tvrđava Kostajnica/Kostajnica=0.2; Korčulanske zidine=0.2; Okić grad/Okić=0.2; Dvorac Kutjevo=0.1;
      Dvorac Laduč/Laduč=0.1; Dvorac Gjalski/Gjalski=0.1; Dvorac Jakovlje=0.1; Stari grad Slunj/Slunj=0.1; Vrana=0.1;
      Garić=0.1; Lobor=0.1; Grebengrad=0.1; Zelingrad=0.1; Kaštel Štafilić=0.1; Tržan=0.1`,
  },
  {
    slug: "eurovizija",
    group: "hr",
    title: "Hrvatski izvođač na Euroviziji",
    hint: "Uključujući Hrvate koji su nastupali za Jugoslaviju",
    strip: [],
    answers: `Baby Lasagna=25; Let 3/Let tri=12; Severina=10; Doris Dragović/Doris=5; Riva=4;
      Tony Cetinski/Toni Cetinski=3; Nina Badrić=3; Jacques Houdek=3; Danijela/Danijela Martinović=2;
      Roko/Roko Blažević=2; Albina=2; Marko Bošnjak=2; Franka/Franka Batelić=1.5; Mia Dimšić=1.5; Nina Kraljić=1.5;
      Kraljevi ulice=1.5; Magazin=1.5; Klapa s Mora=1; Boris Novković=1; Vanna=0.8; Goran Karan=0.8; Maja Blagdan=0.8;
      Feminnem=0.8; Damir Kedžo=0.8; Novi fosili=0.8; Igor Cukrov=0.5; Dado Topić=0.5; Ivan Mikulić=0.5;
      Claudia Beni=0.5; Vesna Pisarović=0.5; Tereza Kesovija=0.5; Daria Kinzer/Daria=0.4; Dragonfly=0.3;
      E.N.I./ENI=0.3; Put=0.3; Andrea Šušnjara=0.3; 75 Cents=0.2; Lidija Horvat=0.2; Tajči=1; Vlado Kalember=0.5;
      Srebrna krila=0.5; Emilija Kokić=0.5; Vice Vukov=0.5; Dubrovački trubaduri=0.5;
      Krunoslav Slabinac/Kićo Slabinac=0.3; Izolda Barudžija/Izolda=0.2; Lado/Ansambl Lado=0.2`,
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
      Borovik=0.3; Savica=0.3; Prološko blato=0.3; Lepenica=0.3; Zajarki=0.2; Omladinsko jezero=0.2; Kaluđerovac=0.2;
      Brljansko jezero/Brljan=0.2; Čiče/Jezero Čiče=0.2; Varaždinsko jezero=0.2; Tribalj=0.1; Gavanovac=0.1;
      Milanovac=0.1; Okrugljak=0.1; Batinovac=0.1; Ciginovac=0.1; Novakovića brod=0.1; Ričice=0.1; Lapovac=0.1;
      Ježevo=0.1; Siromaja=0.1; Dubravsko jezero=0.1; Čakovečko jezero=0.1`,
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
      Gordan Grlić Radman=0.3; Nikola Grmoja=0.3; Davor Ivo Stier=0.3; Damir Kajin=0.3; Ljudevit Gaj=0.5;
      Josip Juraj Strossmayer/Strossmayer=0.5; Nikola Tesla/Tesla=0.3; Matija Gubec/Gubec=0.3;
      Trpimir/Knez Trpimir=0.3; Branimir/Knez Branimir=0.3; Ante Gotovina/Gotovina=0.3;
      Alojzije Stepinac/Stepinac=0.3; Ljudevit Posavski=0.2; Petar Svačić=0.2; Ivan Mažuranić=0.2;
      Ante Trumbić/Trumbić=0.2; Frano Supilo/Supilo=0.2; Vladimir Bakarić/Bakarić=0.2; Rade Končar=0.2;
      Ante Marković=0.2; Janko Bobetko/Bobetko=0.2; Vlado Gotovac/Gotovac=0.2; Branimir Glavaš/Glavaš=0.2;
      Ruđer Bošković/Bošković=0.2; Višeslav/Knez Višeslav=0.1; Borna/Knez Borna=0.1; Domagoj/Knez Domagoj=0.1;
      Mutimir=0.1; Stjepan Držislav/Držislav=0.1; Kraljica Jelena/Jelena Slavna=0.1; Toma Bakač Erdödy/Bakač=0.1;
      Pavao Šubić=0.1; Karoly Khuen-Héderváry/Khuen=0.1; Franjo Rački/Rački=0.1; Juraj Dobrila/Dobrila=0.1;
      Ivan Šubašić/Šubašić=0.1; Ana Katarina Zrinska/Katarina Zrinska=0.1; Faust Vrančić/Vrančić=0.1;
      Milka Planinc/Planinc=0.1; Stipe Šuvar/Šuvar=0.1; Ivo Lola Ribar=0.1; Mladen Markač/Markač=0.1; Blago Zadro=0.1;
      Josip Reihl-Kir=0.1; Ivić Pašalić/Pašalić=0.1; Zdravko Tomac=0.1; Dobroslav Paraga/Paraga=0.1;
      Anto Đapić/Đapić=0.1; Marko Veselica=0.1; Mirela Holy=0.1; Ivan Jakovčić/Jakovčić=0.1; Ljubo Jurčić=0.1;
      Slavko Linić/Linić=0.1; Tonino Picula/Picula=0.1; Dubravka Šuica/Šuica=0.1; Ranko Ostojić=0.1;
      Damir Polančec=0.1; Berislav Rončević=0.1; Milijan Brkić=0.1; Marko Primorac=0.1; Ivana Kekin=0.1;
      Vojko Obersnel/Obersnel=0.1; Žarko Domljan=0.1; Luka Bebić=0.1`,
  },
  {
    slug: "prezime",
    group: "hr",
    title: "Hrvatsko prezime",
    strip: ["prezime"],
    answers: `Horvat=12; Kovačević=5; Babić=4; Marić=3; Modrić=3; Jurić=2.5; Novak=2.5; Kovačić=2; Knežević=2;
      Vuković=2; Marković=2; Petrović=2; Perić=1.5; Matić=1.5; Tomić=1.5; Pavlović=1.5; Kovač=1.5; Božić=1.2;
      Blažević=1.2; Grgić=1.2; Pavić=1; Radić=1; Filipović=1; Šarić=1; Lovrić=1; Vidović=1; Perković=1; Tuđman=0.8;
      Popović=0.8; Bošnjak=0.8; Jukić=0.8; Barišić=0.8; Novaković=0.8; Vrdoljak=0.8; Martinović=0.8; Šimić=0.8;
      Rakitić=0.7; Mandžukić=0.6; Kostelić=0.6; Ivanišević=0.6; Ivanović=0.6; Mikulić=0.6; Ivić=0.6; Lončar=0.6;
      Brkić=0.6; Nikolić=0.6; Kolar=0.6; Mandić=0.6; Galić=0.6; Klarić=0.6; Ćosić=0.5; Bilić=0.5; Josipović=0.5;
      Šimunović=0.5; Pavičić=0.5; Mlinarić=0.5; Lukić=0.5; Rukavina=0.5; Varga=0.5; Kos=0.5; Plenković=0.5;
      Milanović=0.5; Čilić=0.5; Perišić=0.5; Dalić=0.5; Dragojević=0.5; Šuker=0.4; Vlašić=0.4; Matijević=0.4;
      Jakovljević=0.4; Dujmović=0.4; Antunović=0.4; Bašić=0.4; Ivančić=0.4; Herceg=0.4; Šimunić=0.4; Begić=0.4;
      Đurić=0.4; Petković=0.4; Rajić=0.4; Ivanković=0.4; Barić=0.4; Pejić=0.4; Jelić=0.4; Kralj=0.4; Kraljević=0.4;
      Srna=0.3; Boban=0.3; Gvardiol=0.3; Topić=0.3; Pranjić=0.3; Glavaš=0.3; Zorić=0.3; Ćurić=0.3; Petrić=0.3;
      Mihaljević=0.3; Bukvić=0.3; Zovko=0.3; Čolak=0.3; Ljubičić=0.3; Vlahović=0.3; Vukelić=0.3; Vučković=0.3;
      Krznarić=0.3; Mamić=0.3; Mesić=0.3; Tadić=0.3; Batinić=0.3; Ilić=0.3; Jurišić=0.3; Grubišić=0.3; Baričević=0.3;
      Kolarić=0.3; Budimir=0.3; Žagar=0.3; Brajković=0.3; Medved=0.3; Golub=0.3; Rogić=0.3; Matković=0.2;
      Matošević=0.2; Grgurić=0.2; Tomašić=0.2; Tomljanović=0.2; Prpić=0.2; Balog=0.2; Crnković=0.2; Cindrić=0.2;
      Dragičević=0.2; Mikić=0.2; Miletić=0.2; Janković=0.2; Sanader=0.2; Račan=0.2; Gotovina=0.2; Tesla=0.2;
      Meštrović=0.2; Krleža=0.2; Marulić=0.2; Gundulić=0.2; Zrinski=0.2; Frankopan=0.2; Jelačić=0.2; Starčević=0.2;
      Šenoa=0.2; Matoš=0.2; Ujević=0.2; Gaj=0.15; Kranjčević=0.15; Mažuranić=0.15; Preradović=0.15; Nazor=0.15;
      Cesarić=0.15; Drašković=0.15; Kvaternik=0.15; Pintarić=0.15; Cetinski=0.15; Grašo=0.15; Rozga=0.15; Škoro=0.15;
      Dvornik=0.15; Ćorluka=0.15; Lovren=0.15; Subašić=0.15; Kramarić=0.15; Brozović=0.15; Livaković=0.15; Olić=0.15;
      Prosinečki=0.15; Bokšić=0.15; Štimac=0.15; Kranjčar=0.15; Tudor=0.15; Kolak=0.15; Valentić=0.15; Benković=0.15;
      Fabijanić=0.15; Ivandić=0.15; Lisac=0.15; Orešković=0.15; Radoš=0.15; Vukić=0.15; Zec=0.15; Pletikosa=0.1;
      Jarni=0.1; Ladić=0.1; Stanić=0.1; Asanović=0.1; Vida=0.1; Bjelić=0.1; Kokot=0.1; Mlakar=0.1; Pongrac=0.1;
      Rončević=0.1; Sertić=0.1; Smolić=0.1; Sokol=0.1; Stipić=0.1; Šegota=0.1; Tomljenović=0.1; Toth=0.1; Zubak=0.1;
      Žužul=0.1; Jambrešić=0.1; Kukuljević=0.05; Pupačić=0.05`,
  },
  {
    slug: "glumac-hr",
    group: "hr",
    title: "Hrvatski glumac ili glumica",
    strip: ["glumac", "glumica"],
    answers: `Rade Šerbedžija/Šerbedžija=12; Goran Višnjić/Višnjić=8; Mustafa Nadarević/Nadarević=5;
      Boris Dvornik/Dvornik=5; Ena Begović=4; Ivo Gregurević/Gregurević=4; Zrinka Cvitešić/Cvitešić=4; Relja Bašić=3;
      Mia Begović=3; Goran Navojec=3; Mira Furlan/Furlan=2.5; Tarik Filipović=2; Bojan Navojec=2; Leon Lučev/Lučev=2;
      Krešimir Mikić=2; Vedran Mlikota/Mlikota=2; Nataša Janjić/Nataša Janjić Medančić=2; Zlatko Vitez=1.5;
      Dragan Despot=1.5; Ivica Vidović=1.5; Lana Barić=1.5; Filip Šovagović=1.5; Ljubomir Kerekeš/Kerekeš=1.5;
      Rene Bitorajac/Bitorajac=1.5; Fabijan Šovagović=1; Hrvoje Kečkeš/Kečkeš=1; Žarko Potočnjak=1; Boris Buzančić=1;
      Đuro Utješanović=1; Linda Begonja=1; Ecija Ojdanić=1; Doris Pinčić=1; Frano Mašković=1; Pero Kvrgić=1;
      Boris Svrtan=1; Nikša Butijer=0.8; Iva Šulentić=0.8; Jelena Perčin=0.8; Barbara Nola=0.8;
      Milka Podrug Kokotović=0.5; Smiljka Bencet=0.5; Mirjana Bohanec=0.5; Ksenija Pajić=0.5; Tena Jeić Gajski=0.5;
      Ana Ugarković=0.5; Igor Mešin=0.5; Asim Ugljen=0.5; Ranko Zidarić=0.5; Robert Ugrina=0.5; Ivan Herceg=0.5;
      Rakan Rushaidat=0.5; Marko Cindrić=0.5; Ivana Roščić=0.5; Judita Franković=0.5; Daria Lorenci=0.5;
      Goran Grgić=0.5; Sven Medvešek=0.5; Vanja Drach=0.5; Ivo Serdar=0.5; Nela Eržišnik=0.5; Zlatko Crnković=0.5;
      Siniša Popović=0.5; Bojana Gregorić=0.5; Csilla Barath Bastaić=0.3; Matija Prskalo=0.3; Kruno Valentić=0.3;
      Josip Marotti=0.3; Ozren Grabarić=0.3; Slavko Juraga=0.3; Lucija Šerbedžija=0.3; Jelena Miholjević=0.3;
      Ivana Bolanča=0.3; Zdenko Jelčić=0.3; Vinko Kraljević=0.3; Ana Karić=0.3; Mladen Vulić=0.3; Ivan Glowatzky=0.3;
      Petra Kurtela=0.3; Iva Babić=0.3; Dijana Vidušin=0.3; Mirela Brekalo=0.3; Sanja Vejnović=0.3; Milan Štrljić=0.3;
      Alen Liverić=0.3; Dražen Kühn=0.3; Dušan Gojić=0.2; Mirko Boman=0.2; Elizabeta Kukić=0.2; Danko Ljuština=0.2;
      Tonko Lonza=0.2; Marinko Prga=0.2; Živko Anočić=0.2; Toma Medvešek=0.2; Tvrtko Jurić=0.2; Janko Rakoš=0.2;
      Jadranka Đokić=0.2; Nina Violić=0.2; Ksenija Marinković=0.2; Dubravko Sidor=0.2; Edo Vujić=0.2;
      Kristijan Ugrina=0.2; Radovan Ruždjak=0.2; Vilim Matula=0.2; Mirta Zečević=0.2; Areta Ćurković=0.2;
      Ivan Đuričić=0.2; Božidar Boban=0.2; Luka Petrušić=0.1; Ivana Rushaidat=0.1; Antun Nalis=0.05;
      Mia Oremović=0.05`,
  },
  {
    slug: "tv-lice",
    group: "hr",
    title: "Hrvatski TV voditelj ili novinar",
    hint: "Voditelji, novinari, komentatori, meteorolozi…",
    strip: ["voditelj", "voditeljica", "novinar", "novinarka"],
    answers: `Tarik Filipović/Tarik=7; Antonija Blaće/Blaće=6; Duško Ćurlić/Ćurlić=5; Aleksandar Stanković=4;
      Zoran Vakula/Vakula=4; Oliver Mlakar/Mlakar=4; Daniela Trbović=3; Branko Uvodić/Uvodić=3; Joško Lokas/Lokas=2.5;
      Mirko Fodor/Fodor=2.5; Ivan Šarić=2.5; Velimir Bujanec/Bujanec=2.5; Mila Elegović=2; Nikolina Pišek=2;
      Tatjana Jurić=2; Drago Ćosić=2; Mladen Delić=2; Goran Milić=2; Zoran Šprajc/Šprajc=1.5; Mislav Bago/Bago=1.5;
      Željko Malnar/Malnar=1.5; Denis Latin=1.5; Siniša Glavašević/Glavašević=1; Frano Ridjan=1; Petar Pereža=1;
      Ante Tomić=1; Hloverka Novak Srzić/Hloverka=0.8; Helga Vlahović=0.8; Davor Meštrović=0.8; Marijana Batinić=0.8;
      Ella Dvornik=0.8; Boris Dežulović/Dežulović=0.8; Davor Butković=0.8; Tomislav Klauški=0.5; Viktor Ivančić=0.5;
      Predrag Lucić=0.5; Heni Erceg=0.5; Jelena Lovrić=0.5; Gordan Malić=0.5; Tihomir Ladišić=0.5; Dijana Čuljak=0.5;
      Elizabeta Gojan=0.5; Karmela Vukov-Colić=0.5; Danijela Dvornik=0.5; Sanja Doležal=0.5; Igor Mirković=0.5;
      Marcel Holjevac=0.5; Robert Knjaz=0.3; Mirjana Hrga=0.3; Dalibor Petko=0.3; Nevena Rendeli=0.3; Maja Sever=0.3;
      Ivica Đikić=0.3; Drago Pilsel=0.3; Lazo Goluža=0.05; Milan Sijerković=0.05; Ivo Pukanić=0.3; Jurica Pavičić=0.3;
      Miljenko Jergović=0.3; Inoslav Bešker=0.2; Zrinka Vrabec-Mojzeš=0.2; Ksenija Urličić=0.2; Mladen Kušec=0.2`,
  },
  {
    slug: "tv-emisija",
    group: "hr",
    title: "Hrvatska TV emisija, kviz ili reality show",
    hint: "Bilo što s hrvatske televizije osim serija i filmova",
    strip: ["emisija", "kviz", "show"],
    answers: `Dnevnik/Dnevnik HRT/Dnevnik Nove TV=9; Big Brother/Veliki brat/Celebrity Big Brother=7;
      Tko želi biti milijunaš/Milijunaš=7; Ples sa zvijezdama=5; Potjera=5; Lijepom našom=4; Kviskoteka=4;
      Ljubav je na selu=4; Farma=3; Survivor=3; Masterchef/MasterChef Hrvatska=3; Supertalent=3; Zvijezde pjevaju=2.5;
      Hrvatska traži zvijezdu=2.5; Večera za 5/Večera za pet=2.5; Nedjeljom u 2/Nedjeljom u dva=2.5; Dora=2;
      Dobro jutro Hrvatska/Dobro jutro=2; Tvoje lice zvuči poznato=2; The Voice/The Voice Hrvatska=2; Otvoreno=1.5;
      RTL Danas=1.5; Provjereno=1.5; Najslabija karika=1.5; Kolo sreće=1.5; Gospodin savršeni=1.5; Brak na prvu=1.5;
      Život na vagi=1.5; Superpotjera=1; Exkluziv/Exkluziv Tabloid=1; Red Carpet=1; In Magazin=1; Bujica=0.8;
      Nightmare Stage=0.8; Mir i dobro=0.8; Plodovi zemlje=0.8; Briljanteen=0.8; Mijenjam ženu=0.8;
      Tri, dva, jedan, kuhaj/Tri dva jedan kuhaj/3 2 1 kuhaj=0.8; Volim Hrvatsku=0.5; Hrvatska uživo=0.5;
      RTL Direkt=0.5; Ninja Warrior/Ninja Warrior Hrvatska=0.5; Juhuhu=0.5; Kod nas doma=0.5; Studio 4=0.3;
      Peti dan=0.3; More=0.3; TV kalendar=0.3; Glas domovine=0.3; Hrvatska kronika=0.2; Večernja škola=0.2;
      Latinica=0.05; Pola ure kulture=0.05; Turbo Limač Show/Turbo Limač=0.8;
      Kocka, kocka, kockica/Kocka kocka kockica=0.5; Hrvatski top model/Top model=0.3; Jel' me netko tražio=0.3;
      Sport nedjeljom=0.2; Županijska panorama=0.2`,
  },
  {
    slug: "slavonija",
    group: "hr",
    title: "Mjesto u Slavoniji, Baranji ili Srijemu",
    hint: "Grad, mjesto ili selo",
    strip: ["grad", "selo", "mjesto"],
    answers: `Osijek=22; Vukovar=12; Vinkovci=8; Slavonski Brod/Brod=7; Đakovo=6; Požega/Slavonska Požega=4;
      Našice=2.5; Virovitica=2.5; Ilok=2.5; Županja=2; Beli Manastir=1.5; Nova Gradiška=1.5; Valpovo=1.5; Belišće=1.2;
      Donji Miholjac=1.2; Slatina=1; Orahovica=0.8; Kutjevo=0.8; Pleternica=0.6; Daruvar=0.6; Bilje=0.6; Čepin=0.6;
      Pakrac=0.5; Lipik=0.5; Darda=0.5; Erdut=0.5; Dalj=0.5; Otok=0.4; Tenja=0.4; Bizovac=0.4; Batina=0.4;
      Borovo/Borovo Naselje=0.4; Kopačevo=0.3; Aljmaš=0.3; Kneževi Vinogradi=0.3; Zmajevac=0.3; Karanac=0.3;
      Tovarnik=0.3; Šarengrad=0.3; Ivankovo=0.3; Gunja=0.3; Babina Greda=0.3; Đurđenovac=0.3; Okučani=0.3;
      Pitomača=0.3; Draž=0.2; Popovac=0.2; Čeminac=0.2; Ernestinovo=0.2; Antunovac=0.2; Sarvaš=0.2; Klisa=0.2;
      Bogdanovci=0.2; Nuštar=0.2; Lovas=0.2; Bapska=0.2; Sotin=0.2; Andrijaševci=0.2; Stari Mikanovci=0.2;
      Nijemci=0.2; Bošnjaci=0.2; Drenovci=0.2; Vrbanja=0.2; Cerna=0.2; Gradište=0.2; Privlaka=0.2; Vrpolje=0.2;
      Strizivojna=0.2; Gorjani=0.2; Oriovac=0.2; Sibinj=0.2; Slavonski Šamac=0.2; Velika Kopanica=0.2;
      Donji Andrijevci=0.2; Stara Gradiška=0.2; Cernik=0.2; Kaptol=0.2; Velika=0.2; Suhopolje=0.2; Voćin=0.2;
      Lug=0.15; Kneževo=0.15; Petlovac=0.15; Mirkovci=0.15; Trpinja=0.15; Jarmina=0.15; Lipovac=0.15; Tikveš=0.1;
      Jagodnjak=0.1; Baranjsko Petrovo Selo=0.1; Suza=0.1; Kotlina=0.1; Topolje=0.1; Branjin Vrh=0.1; Bolman=0.1;
      Kozarac=0.1; Laslovo=0.1; Vladislavci=0.1; Šodolovci=0.1; Nemetin=0.1; Bijelo Brdo=0.1; Tordinci=0.1;
      Opatovac=0.1; Negoslavci=0.1; Bobota=0.1; Markušica=0.1; Cerić=0.1; Retkovci=0.1; Soljani=0.1; Račinovci=0.1;
      Štitar=0.1; Rokovci=0.1; Komletinci=0.1; Slakovci=0.1; Tompojevci=0.1; Vođinci=0.1; Semeljci=0.1;
      Levanjska Varoš=0.1; Viškovci=0.1; Satnica Đakovačka=0.1; Punitovci=0.1; Drenje=0.1; Trnava=0.1; Feričanci=0.1;
      Podgorač=0.1; Koška=0.1; Čačinci=0.1; Petrijevci=0.1; Josipovac=0.1; Višnjevac=0.1; Brodski Stupnik=0.1;
      Garčin=0.1; Bebrina=0.1; Sikirevci=0.1; Gornja Vrba=0.1; Bukovlje=0.1; Davor=0.1; Nova Kapela=0.1; Rešetari=0.1;
      Staro Petrovo Selo=0.1; Jakšić=0.1; Brestovac=0.1; Čaglin=0.1; Sirač=0.1; Đulovac=0.1; Čađavica=0.1;
      Špišić Bukovica=0.1; Mohovo=0.05; Lipovača=0.05; Ilača=0.05; Bršadin=0.05; Novi Mikanovci=0.05; Strošinci=0.05;
      Prkovci=0.05; Kešinci=0.05; Mrzović=0.05; Široko Polje=0.05; Donja Motičina=0.05; Zdenci=0.05; Crnac=0.05;
      Mikleuš=0.05; Sopje=0.05; Nova Bukovica=0.05; Lukač=0.05; Gradina=0.05; Badljevina=0.05; Končanica=0.05;
      Vetovo=0.05; Bektež=0.05; Ruševo=0.05; Batrina=0.05; Vrbje=0.05; Dragalić=0.05; Gornji Bogićevci=0.05;
      Klakar=0.05; Podcrkavlje=0.05; Gundinci=0.05; Lužani=0.05; Magadenovac=0.05; Marijanci=0.05; Viljevo=0.05;
      Podravska Moslavina=0.05; Ladimirevci=0.05; Harkanovci=0.05; Vardarac=0.05; Mece=0.05; Grabovac=0.05;
      Zlatna Greda=0.05; Paulin Dvor=0.05; Hrastin=0.05; Vuka=0.05; Duboševica=0.05; Piškorevci=0.05`,
  },
  {
    slug: "istra",
    group: "hr",
    title: "Mjesto u Istri",
    hint: "Grad, mjesto ili selo",
    strip: ["grad", "selo", "mjesto"],
    answers: `Pula=20; Rovinj=12; Poreč=10; Umag=6; Pazin=5; Motovun=4; Labin=4; Novigrad=3; Buzet=2.5; Medulin=2.5;
      Rabac=2; Vrsar=2; Fažana=1.5; Grožnjan=1.5; Buje=1.5; Vodnjan=1.5; Hum=1.2; Funtana=1; Žminj=1; Svetvinčenat=1;
      Bale=1; Premantura=1; Višnjan=0.8; Kanfanar=0.8; Barban=0.8; Raša=0.8; Plomin=0.8; Roč=0.8; Savudrija=0.8;
      Tar/Tar-Vabriga=0.5; Banjole=0.5; Ližnjan=0.5; Marčana=0.5; Kršan=0.5; Pićan=0.5; Oprtalj=0.5; Brtonigla=0.5;
      Livade=0.3; Vabriga=0.3; Pomer=0.3; Krnica=0.3; Gračišće=0.3; Lupoglav=0.3; Momjan=0.3; Tinjan=0.3;
      Vižinada=0.3; Sveti Lovreč=0.3; Peroj=0.3; Beram=0.3; Dvigrad=0.3; Lanišće=0.2; Cerovlje=0.2; Završje=0.2;
      Karojba=0.2; Kaštelir=0.2; Sveta Nedelja=0.2; Rakalj=0.2; Štinjan=0.2; Šišan=0.2; Galižana=0.2;
      Sveti Petar u Šumi=0.2; Draguć=0.2; Kringa=0.2; Červar/Červar-Porat=0.2; Valbandon=0.2; Labinci=0.1;
      Nedešćina=0.1; Valtura=0.1; Juršići=0.1; Boljun=0.1; Kožljak=0.1; Čepić=0.1; Vranja=0.1; Kotli=0.1;
      Rovinjsko Selo=0.1; Nova Vas=0.1; Zambratija=0.1; Lovrečica=0.1; Bašanija=0.1; Dajla=0.1; Trviž=0.1; Lindar=0.1;
      Koromačno=0.1; Trget=0.1; Vinkuran=0.1; Barbariga=0.1; Kaštel=0.1; Gologorica=0.05; Ripenda=0.05; Vinež=0.05;
      Smoljanci=0.05; Petrovija=0.05; Babići=0.05; Karigador=0.05; Zarečje=0.05; Ravni=0.05; Skitača=0.05; Volme=0.05;
      Divšići=0.05; Loborika=0.05; Kavran=0.05; Prodol=0.05; Kloštar=0.05; Vrh=0.05; Zrenj=0.05; Sovinjak=0.05`,
  },
  {
    slug: "zagorje",
    group: "hr",
    title: "Mjesto u Zagorju, Međimurju ili Podravini",
    hint: "Grad, mjesto ili selo na sjeveru Hrvatske",
    strip: ["grad", "selo", "mjesto"],
    answers: `Varaždin=16; Čakovec=14; Krapina=10; Koprivnica=8; Zabok=4; Marija Bistrica=4; Đurđevac=3; Ludbreg=3;
      Ivanec=2.5; Lepoglava=2.5; Kumrovec=2.5; Trakošćan=2; Donja Stubica=2; Oroslavje=1.5; Zlatar=1.5; Pregrada=1.5;
      Klanjec=1.5; Prelog=1.5; Novi Marof=1.2; Gornja Stubica=1.2; Krapinske Toplice=1.2; Varaždinske Toplice=1.2;
      Mursko Središće=1; Stubičke Toplice=1; Tuhelj/Tuheljske Toplice=1; Bedekovčina=0.8; Sveti Križ Začretje=0.8;
      Sveti Martin na Muri=0.8; Hlebine=0.8; Konjščina=0.5; Hum na Sutli=0.5; Desinić=0.5; Veliko Trgovišće=0.5;
      Štrigova=0.5; Nedelišće=0.5; Kotoriba=0.5; Virje=0.5; Molve=0.5; Virovitica=0.5; Mače=0.3; Mihovljan=0.3;
      Radoboj=0.3; Đurmanec=0.3; Jesenje=0.3; Lobor=0.3; Zlatar Bistrica=0.3; Maruševec=0.3; Vinica=0.3; Bednja=0.3;
      Donji Kraljevec=0.3; Goričan=0.3; Donja Dubrava=0.3; Mala Subotica=0.3; Drnje=0.3; Peteranec=0.3; Legrad=0.3;
      Novigrad Podravski=0.3; Pitomača=0.3; Petrovsko=0.2; Budinščina=0.2; Hrašćina=0.2; Zagorska Sela=0.2;
      Kraljevec na Sutli=0.2; Belec=0.2; Sračinec=0.2; Petrijanec=0.2; Cestica=0.2; Vidovec=0.2;
      Trnovec Bartolovečki=0.2; Sveti Ilija=0.2; Jalžabet=0.2; Klenovnik=0.2; Gornji Kneginec=0.2; Sveta Marija=0.2;
      Pribislavec=0.2; Šenkovec=0.2; Strahoninec=0.2; Belica=0.2; Orehovica=0.2; Podturen=0.2; Selnica=0.2;
      Sveti Juraj na Bregu=0.2; Đelekovec=0.2; Kalinovac=0.2; Ferdinandovac=0.2; Podravske Sesvete=0.2; Gola=0.2;
      Kloštar Podravski=0.2; Koprivnički Ivanec=0.2; Sokolovac=0.2; Rasinja=0.2; Beretinec=0.1; Martijanec=0.1;
      Mali Bukovec=0.1; Veliki Bukovec=0.1; Sveti Đurđ=0.1; Breznički Hum=0.1; Visoko=0.1; Donja Voća=0.1;
      Ljubeščica=0.1; Breznica=0.1; Dekanovec=0.1; Domašinec=0.1; Vratišinec=0.1; Gornji Mihaljevec=0.1;
      Peklenica=0.1; Macinec=0.1; Lopatinec=0.1; Pušćine=0.1; Kuršanec=0.1; Ivanovec=0.1; Novo Virje=0.1;
      Gubaševo=0.05; Novi Golubovec=0.05; Hodošan=0.05`,
  },
  {
    slug: "dalmatinska-zagora",
    group: "hr",
    title: "Mjesto u Dalmatinskoj zagori",
    hint: "Grad, mjesto ili selo u zaleđu Dalmacije",
    strip: ["grad", "selo", "mjesto"],
    answers: `Sinj=18; Imotski=14; Knin=12; Drniš=8; Vrgorac=5; Trilj=4; Vrlika=3; Klis=2; Muć=2; Dicmo=1.5;
      Dugopolje=1; Hrvace=1; Otok=1; Cista Provo=0.8; Zagvozd=0.8; Šestanovac=0.8; Proložac=0.8; Zmijavci=0.8;
      Lovreć=0.5; Podbablje=0.5; Runovići=0.5; Aržano=0.5; Kijevo=0.5; Kistanje=0.5; Lokvičići=0.3; Studenci=0.3;
      Lećevica=0.3; Košute=0.3; Brnaze=0.3; Ervenik=0.3; Oklaj=0.3; Biskupija=0.3; Kamenmost=0.2; Prgomet=0.2;
      Primorski Dolac=0.2; Neorić=0.2; Bisko=0.2; Gala=0.2; Ruda=0.2; Grab=0.2; Glavice=0.2; Civljane=0.2; Cetina=0.2;
      Golubić=0.2; Strmica=0.2; Unešić=0.2; Ružić=0.2; Siverić=0.2; Kozica=0.2; Rašćane=0.2; Glavina=0.2; Vinjani=0.2;
      Ričice=0.2; Cista Velika=0.2; Sutina=0.1; Gizdavac=0.1; Konjsko=0.1; Ogorje=0.1; Vedrine=0.1; Jabuka=0.1;
      Ugljane=0.1; Čačvina=0.1; Vojnić Sinjski=0.1; Maovice=0.1; Koljane=0.1; Miljevci=0.1; Badanj=0.1; Dusina=0.1;
      Ravča=0.1; Krivodol=0.1; Postranje=0.1; Svib=0.1; Grubine=0.1; Biorine=0.1; Kotezi=0.05; Brštanovo=0.05;
      Gljev=0.05; Kljake=0.05`,
  },
  {
    slug: "lika-gorski",
    group: "hr",
    title: "Mjesto u Lici, Gorskom kotaru ili na Kordunu",
    hint: "Grad, mjesto ili selo",
    strip: ["grad", "selo", "mjesto"],
    answers: `Gospić=18; Otočac=7; Delnice=7; Plitvička Jezera/Plitvice=6; Ogulin=5; Korenica/Titova Korenica=4;
      Slunj=4; Perušić=2; Udbina=2; Gračac=2; Fužine=2; Donji Lapac=1.5; Brinje=1.5; Čabar=1.5; Ravna Gora=1.5;
      Lokve=1.5; Smiljan=1.5; Vrbovsko=1.2; Lovinac=1; Mrkopalj=1; Skrad=1; Rakovica=1; Vrhovine=0.8; Kuterevo=0.8;
      Krasno=0.8; Vojnić=0.8; Brod Moravice=0.5; Brod na Kupi=0.5; Lič=0.5; Lički Osik=0.5; Srb=0.5; Rastoke=0.5;
      Gerovo=0.3; Tršće=0.3; Prezid=0.3; Kosinj=0.3; Saborsko=0.3; Plaški=0.3; Josipdol=0.3; Tounj=0.3; Medak=0.3;
      Krnjak=0.3; Cetingrad=0.3; Vrginmost=0.3; Begovo Razdolje=0.3; Crni Lug=0.3; Gornje Jelenje=0.2;
      Lički Ribnik=0.2; Pazarište=0.2; Ličko Lešće=0.2; Švica=0.2; Sinac=0.2; Kompolje=0.2; Ličko Petrovo Selo=0.2;
      Bunić=0.2; Veljun=0.2; Primišlje=0.2; Lasinja=0.2; Barilović=0.2; Stari Laz=0.2; Zalesina=0.2;
      Severin na Kupi=0.2; Drežnica=0.2; Vrata=0.2; Lukovdol=0.2; Brlog=0.2; Žuta Lokva=0.2; Bruvno=0.1;
      Debelo Brdo=0.1; Mušaluk=0.1; Sunger=0.1; Kupjak=0.1; Moravice=0.1; Zagorje Ogulinsko=0.1; Oštarije=0.1;
      Jasenak=0.1; Plešce=0.1; Hrvatsko=0.1; Grabovac=0.1; Drežnik Grad=0.1; Bjelopolje=0.1; Mukinje=0.1; Dabar=0.1;
      Jezerane=0.1; Stajnica=0.1; Križpolje=0.1; Leskova Draga=0.05; Kozji Vrh=0.05; Razloge=0.05;
      Vrelo Koreničko=0.05; Kaluđerovac=0.05; Vrebac=0.05; Lipovo Polje=0.05; Letinac=0.05; Lipice=0.05; Kuželj=0.05;
      Mazin=0.05`,
  },
  {
    slug: "banovina",
    group: "hr",
    title: "Mjesto u Sisačko-moslavačkoj županiji",
    hint: "Banovina, Moslavina i Posavina oko Siska",
    strip: ["grad", "selo", "mjesto"],
    answers: `Sisak=25; Petrinja=14; Kutina=8; Glina=6; Novska=5; Hrvatska Kostajnica/Kostajnica=4; Topusko=3;
      Popovača=3; Jasenovac=2.5; Sunja=2; Dvor=2; Lekenik=1; Lipovljani=1; Čigoč=1; Martinska Ves=0.5;
      Velika Ludina=0.5; Hrvatska Dubica=0.5; Gvozd=0.5; Lonja=0.5; Krapje=0.5; Banova Jaruga=0.5; Majur=0.3;
      Donji Kukuruzari=0.3; Repušnica=0.3; Zrin=0.3; Mošćenica=0.3; Voloder=0.3; Mužilovčica=0.2; Gušće=0.2;
      Budaševo=0.2; Topolovac=0.2; Hrastovica=0.2; Gora=0.2; Majske Poljane=0.2; Kratečko=0.2; Osekovo=0.2;
      Stružec=0.2; Galdovo=0.1; Žažina=0.1; Mala Gorica=0.1; Divuša=0.1; Rujevac=0.1; Maja=0.1; Brest Pokupski=0.1;
      Mečenčani=0.1; Komarevo=0.1; Bobovac=0.1; Prelošćica=0.1; Puska=0.1; Gračenica=0.1; Ilova=0.1; Jamarica=0.1;
      Rajić=0.1; Bročice=0.1; Brestača=0.1; Subocka=0.1; Kozarice=0.1; Uštica=0.1; Baćin=0.1; Jabukovac=0.1;
      Moslavačka Slatina=0.1; Kutinska Slatina=0.1; Kraljeva Velika=0.1; Drenov Bok=0.1; Taborište=0.05; Mlaka=0.05;
      Volinja=0.05; Kraljevčani=0.05; Gornja Bačuga=0.05; Glinska Poljana=0.05; Hrvatsko Selo=0.05; Žirovac=0.05;
      Husain=0.05; Gornja Jelenska=0.05; Piljenice=0.05; Jazavica=0.05; Košutarica=0.05; Unčani=0.05;
      Mustafina Klada=0.05`,
  },
  {
    slug: "otok-mjesto",
    group: "hr",
    title: "Mjesto na hrvatskom otoku",
    hint: "Grad, mjesto ili selo na bilo kojem otoku",
    strip: ["grad", "selo", "mjesto"],
    answers: `Hvar=9; Korčula=7; Krk=7; Supetar=5; Bol=5; Mali Lošinj=5; Rab=4; Pag=4; Novalja=3.5; Stari Grad=3;
      Jelsa=2.5; Vis=2.5; Komiža=2.5; Vela Luka=2; Cres=2; Baška=2; Punat=1.5; Malinska=1.5; Omišalj=1.2; Njivice=1.2;
      Vrbnik=1.2; Veli Lošinj=1.2; Milna=1.2; Murter=1; Postira=0.8; Pučišća=0.8; Sutivan=0.8; Lumbarda=0.8;
      Blato=0.8; Preko=0.8; Vir=0.8; Lastovo=0.6; Kali=0.6; Kukljica=0.6; Sali=0.6; Lopar=0.6; Betina=0.6; Tisno=0.6;
      Vrboska=0.6; Jezera=0.4; Sućuraj=0.4; Lopud=0.4; Nerezine=0.4; Osor=0.4; Lubenice=0.4; Silba=0.4; Tkon=0.4;
      Zlarin=0.4; Ubli=0.3; Šipanska Luka=0.3; Suđurađ=0.3; Polače=0.3; Pomena=0.3; Sobra=0.3; Babino Polje=0.3;
      Valun=0.3; Martinšćica=0.3; Beli=0.3; Susak=0.3; Unije=0.3; Ilovik=0.3; Olib=0.3; Božava=0.3; Ugljan=0.3;
      Pašman=0.3; Prvić Luka=0.3; Krapanj=0.3; Kolan=0.3; Povljana=0.3; Lun=0.3; Kampor=0.3; Barbat=0.3; Dobrinj=0.3;
      Šilo=0.3; Nerežišća=0.3; Selca=0.3; Sumartin=0.3; Škrip=0.3; Grohote=0.3; Stomorska=0.3; Maslinica=0.3;
      Nečujam=0.3; Okrug Gornji=0.3; Saplunara=0.2; Okuklje=0.2; Goveđari=0.2; Merag=0.2; Premuda=0.2; Molat=0.2;
      Ist=0.2; Veli Rat=0.2; Veli Iž=0.2; Šepurine=0.2; Kaprije=0.2; Žirje=0.2; Mandre=0.2; Šimuni=0.2;
      Stara Novalja=0.2; Banjol=0.2; Palit=0.2; Supetarska Draga=0.2; Jurandvor=0.2; Povlja=0.2; Splitska=0.2;
      Sveta Nedjelja=0.2; Smokvica=0.2; Čara=0.2; Račišće=0.2; Žrnovo=0.2; Rogač=0.2; Slatine=0.2; Koločep=0.2;
      Prožura=0.1; Maranovići=0.1; Kozarica=0.1; Ropa=0.1; Korita=0.1; Orlec=0.1; Porozina=0.1; Ćunski=0.1;
      Artatore=0.1; Sveti Jakov=0.1; Punta Križa=0.1; Zverinac=0.1; Sestrunj=0.1; Rivanj=0.1; Rava=0.1; Brbinj=0.1;
      Žman=0.1; Luka=0.1; Soline=0.1; Zaglav=0.1; Poljana=0.1; Sutomišćica=0.1; Lukoran=0.1; Ždrelac=0.1; Mali Iž=0.1;
      Zubovići=0.1; Metajna=0.1; Caska=0.1; Gajac=0.1; Vlašići=0.1; Dinjiška=0.1; Jakišnica=0.1; Potočnica=0.1;
      Mundanije=0.1; Klimno=0.1; Čižići=0.1; Glavotok=0.1; Kornić=0.1; Pinezići=0.1; Garica=0.1; Draga Bašćanska=0.1;
      Stara Baška=0.1; Ložišća=0.1; Bobovišća=0.1; Dol=0.1; Donji Humac=0.1; Gornji Humac=0.1; Murvica=0.1; Pitve=0.1;
      Brusje=0.1; Zavala=0.1; Ivan Dolac=0.1; Grablje=0.1; Rukavac=0.1; Podšpilje=0.1; Pupnat=0.1; Brna=0.1;
      Prižba=0.1; Prigradica=0.1; Arbanija=0.1; Okrug Donji=0.1; Mastrinka=0.1; Drvenik Veliki=0.1; Biševo=0.1;
      Donje Čelo=0.1; Belej=0.05; Ustrine=0.05; Savar=0.05; Dragove=0.05; Verunić=0.05; Muline=0.05; Banj=0.05;
      Dobropoljana=0.05; Neviđane=0.05; Mrljane=0.05; Linardići=0.05; Mirca=0.05; Pražnice=0.05; Gdinj=0.05;
      Bogomolje=0.05; Zastražišće=0.05; Vrisnik=0.05; Svirče=0.05; Plisko Polje=0.05; Oključna=0.05; Podstražje=0.05;
      Gornje Selo=0.05; Srednje Selo=0.05; Donje Selo=0.05; Žedno=0.05; Drvenik Mali=0.05; Gornje Čelo=0.05;
      Žena Glava=0.05; Grščica=0.05`,
  },
  {
    slug: "mjesto-k",
    group: "hr",
    title: "Mjesto u Hrvatskoj na slovo K",
    hint: "Grad, mjesto ili selo kojem ime počinje na K",
    strip: ["grad", "selo", "mjesto"],
    answers: `Karlovac=20; Koprivnica=12; Knin=8; Krapina=7; Kutina=6; Krk=6; Korčula=5; Kaštela=5; Križevci=3;
      Komiža=2; Klis=2; Kastav=2; Kraljevica=1.5; Karlobag=1.5; Kumrovec=1.5; Kutjevo=1.5; Kostrena=1; Klanjec=1;
      Kostajnica/Hrvatska Kostajnica=1; Korenica=0.8; Kistanje=0.8; Krapinske Toplice=0.8; Kijevo=0.5; Kali=0.5;
      Kukljica=0.5; Kanfanar=0.5; Kaštel Stari=0.5; Kaštel Sućurac=0.5; Kaštel Lukšić=0.5; Kaštel Novi=0.5;
      Kloštar Ivanić=0.5; Kupari=0.5; Klek=0.5; Kaštel Gomilica=0.3; Kaštel Kambelovac=0.3; Kaštel Štafilić=0.3;
      Kneževi Vinogradi=0.3; Kotoriba=0.3; Križ=0.3; Kalnik=0.3; Konjščina=0.3; Krašić=0.3; Kuterevo=0.3; Krapanj=0.3;
      Kaptol=0.2; Koška=0.2; Krasno=0.2; Kršan=0.2; Kukuljanovo=0.2; Kučište=0.2; Komarna=0.2; Kaprije=0.2;
      Kampor=0.2; Kolan=0.2; Karin=0.2; Klana=0.2; Karojba=0.1; Kaštelir=0.1; Klenovnik=0.1; Kalinovac=0.1;
      Kloštar Podravski=0.1; Koprivnički Ivanec=0.1; Kraljevec na Sutli=0.1; Komletinci=0.1; Kozarac=0.1;
      Kravarsko=0.1; Kringa=0.1; Krnica=0.1; Kuna=0.1; Kozica=0.1; Kornić=0.1; Klimno=0.1; Kožino=0.1; Kruševo=0.1;
      Konjsko=0.1; Kamenmost=0.1; Krasica=0.1; Križišće=0.1; Kapela=0.1; Kosinj=0.1; Kompolje=0.1; Kneževo=0.1;
      Kopačevo=0.1; Karanac=0.1; Klisa=0.1; Krapje=0.1; Kerestinec=0.1; Kašina=0.1; Kustići=0.05; Kaniža=0.05;
      Kuželj=0.05; Kotli=0.05; Kozji Vrh=0.05; Koromačno=0.05; Kotlina=0.05; Kešinci=0.05; Koprivna=0.05; Klakar=0.05;
      Končanica=0.05; Kotezi=0.05; Kozarice=0.05; Kratečko=0.05; Komarevo=0.05; Kutinska Slatina=0.05;
      Kraljeva Velika=0.05; Kostanjevac=0.05; Kupljenovo=0.05; Kakma=0.05; Kašić=0.05`,
  },
  {
    slug: "mjesto-s",
    group: "hr",
    title: "Mjesto u Hrvatskoj na slovo S",
    hint: "Grad, mjesto ili selo kojem ime počinje na S (ne na Š)",
    strip: ["grad", "selo", "mjesto"],
    answers: `Split=25; Sisak=12; Slavonski Brod=8; Sinj=6; Samobor=6; Senj=4; Solin=3; Supetar=3; Skradin=2; Ston=2;
      Slatina=2; Stari Grad/Starigrad/Starigrad-Paklenica=2; Slunj=1.5; Sesvete=1; Sveta Nedelja=1; Sveti Ivan Zelina/Zelina=1; Selce=1;
      Sveti Filip i Jakov=0.8; Sukošan=0.8; Stobreč=0.5; Seget=0.5; Slano=0.5;
      Sali=0.5; Sutivan=0.5; Sveti Martin na Muri=0.5; Sveti Križ Začretje=0.5; Stubičke Toplice=0.5; Sunja=0.5;
      Savudrija=0.5; Svetvinčenat=0.5; Smiljan=0.5; Stomorska=0.3; Silba=0.3; Susak=0.3; Sućuraj=0.3; Sumartin=0.3;
      Selca=0.3; Smokvica=0.3; Sveti Rok=0.3; Sveti Lovreč=0.2; Sveti Petar u Šumi=0.2; Stari Mikanovci=0.2;
      Strizivojna=0.2; Sotin=0.2; Sarvaš=0.2; Sibinj=0.2; Slavonski Šamac=0.2; Suhopolje=0.2; Seline=0.2; Skrad=0.2;
      Srb=0.2; Stupnik=0.2; Stara Gradiška=0.2; Slakovci=0.1; Semeljci=0.1; Sikirevci=0.1; Sirač=0.1; Sokolovac=0.1;
      Sračinec=0.1; Sveti Đurđ=0.1; Sveti Ilija=0.1; Sveti Juraj na Bregu=0.1; Sveti Petar Orehovec=0.1;
      Sveti Ivan Žabno=0.1; Sveta Marija=0.1; Saplunara=0.1; Sobra=0.1; Suđurađ=0.1; Supetarska Draga=0.1;
      Sestrunj=0.1; Soline=0.1; Stankovci=0.1; Saborsko=0.1; Severin na Kupi=0.1; Strmica=0.1; Siverić=0.1;
      Studenci=0.1; Slivno=0.1; Sveti Juraj=0.1; Stari Jankovci=0.1; Staro Petrovo Selo=0.1; Soljani=0.1; Savar=0.05;
      Sinac=0.05; Sutina=0.05; Stilja=0.05; Strošinci=0.05; Satnica Đakovačka=0.05; Sopje=0.05; Strahoninec=0.05;
      Selnica=0.05; Sesvetski Kraljevec=0.05; Sveti Martin pod Okićem=0.05; Slavetić=0.05; Sošice=0.05;
      Smokovljani=0.05; Stravča=0.05; Stinica=0.05; Sutomišćica=0.05; Sreser=0.05; Smilčić=0.05`,
  },
  {
    slug: "mjesto-p",
    group: "hr",
    title: "Mjesto u Hrvatskoj na slovo P",
    hint: "Grad, mjesto ili selo kojem ime počinje na P",
    strip: ["grad", "selo", "mjesto"],
    answers: `Pula=18; Poreč=8; Požega=6; Petrinja=5; Pag=5; Primošten=3; Ploče=3; Pazin=3; Pakrac=2; Podstrana=1.5;
      Pakoštane=1.5; Punat=1.5; Popovača=1.5; Podgora=1.5; Preko=1; Pirovac=1; Prelog=1; Pregrada=1; Pleternica=1;
      Plitvička Jezera/Plitvice=1; Perušić=0.8; Posedarje=0.5; Petrčane=0.5; Premantura=0.5; Plomin=0.5; Pitomača=0.5;
      Postira=0.5; Pučišća=0.5; Povljana=0.3; Privlaka=0.3; Pisak=0.3; Promajna=0.3; Potomje=0.3; Pašman=0.3;
      Povlja=0.2; Pićan=0.2; Pridvorje=0.2; Plat=0.2; Polača=0.2; Pisarovina=0.2; Pokupsko=0.2; Plešivica=0.2;
      Polače=0.2; Pomena=0.2; Poličnik=0.2; Primorski Dolac=0.1; Prgomet=0.1; Podbablje=0.1; Proložac=0.1;
      Petrijevci=0.1; Podgorač=0.1; Punitovci=0.1; Pribislavec=0.1; Podturen=0.1; Peteranec=0.1;
      Podravske Sesvete=0.1; Petrovsko=0.1; Pušća=0.1; Pazarište=0.1; Prezid=0.1; Plaški=0.1; Palit=0.1; Pupnat=0.1;
      Prižba=0.1; Prigradica=0.1; Pitve=0.1; Prvić Luka=0.1; Peroj=0.1; Pomer=0.1; Podaca=0.1; Perković=0.1;
      Podcrkavlje=0.05; Preseka=0.05; Plešce=0.05; Primišlje=0.05; Prožura=0.05; Plisko Polje=0.05; Podšpilje=0.05;
      Podstražje=0.05; Pražnice=0.05; Petrovija=0.05; Pinezići=0.05; Porozina=0.05; Punta Križa=0.05; Poljana=0.05;
      Pločice=0.05; Popovići=0.05; Plano=0.05; Pridraga=0.05; Pijavičino=0.05`,
  },
  {
    slug: "mjesto-b",
    group: "hr",
    title: "Mjesto u Hrvatskoj na slovo B",
    hint: "Grad, mjesto ili selo kojem ime počinje na B",
    strip: ["grad", "selo", "mjesto"],
    answers: `Bjelovar=15; Biograd na Moru/Biograd=6; Bol=5; Beli Manastir=4; Benkovac=4; Brela=4; Buzet=4; Baška=4;
      Baška Voda=3; Belišće=3; Buje=2; Bakar=2; Bibinje=1; Bale=1; Barban=1; Bedekovčina=1; Bilje=1; Bizovac=1;
      Batina=1; Blato=1; Bregana=0.5; Bribir=0.5; Brinje=0.5; Brtonigla=0.5; Bošnjaci=0.5; Babina Greda=0.5;
      Bapska=0.5; Bilice=0.5; Brdovec=0.5; Banjole=0.5; Bednja=0.3; Bistra=0.3; Brckovljani=0.3; Bosiljevo=0.3;
      Brgat=0.3; Baćina=0.3; Bakarac=0.3; Bogdanovci=0.3; Brodski Stupnik=0.2; Bebrina=0.2; Bukovlje=0.2; Borovo=0.2;
      Bobota=0.1; Bijelo Brdo=0.1; Branjin Vrh=0.1; Bolman=0.1; Beretinec=0.1; Belica=0.1; Belec=0.1; Breznica=0.1;
      Breznički Hum=0.1; Budinščina=0.1; Bedenica=0.1; Barilović=0.1; Brlog=0.1; Bruvno=0.1; Bunić=0.1; Banjol=0.1;
      Barbat=0.1; Beli=0.1; Babino Polje=0.1; Biskupija=0.1; Božava=0.1; Baške Oštarije=0.1; Brod Moravice=0.1;
      Brod na Kupi=0.1; Brezovica=0.1; Belej=0.05; Bobovišća=0.05; Brusje=0.05; Bogomolje=0.05; Brna=0.05;
      Brsečine=0.05; Badljevina=0.05; Bektež=0.05; Brestovac=0.05; Batrina=0.05; Bjelopolje=0.05; Brštanovo=0.05;
      Bisko=0.05; Brnaze=0.05; Boljun=0.05; Bašanija=0.05; Babići=0.05; Barbariga=0.05; Beram=0.05; Budrovci=0.05;
      Bračevci=0.05; Brbinj=0.05; Banj=0.05; Biševo=0.05; Blace=0.05; Buševec=0.05; Bestovje=0.05; Bobovica=0.05;
      Bratuš=0.05; Bast=0.05`,
  },
  {
    slug: "mjesto-v",
    group: "hr",
    title: "Mjesto u Hrvatskoj na slovo V",
    hint: "Grad, mjesto ili selo kojem ime počinje na V",
    strip: ["grad", "selo", "mjesto"],
    answers: `Varaždin=18; Vukovar=15; Vinkovci=10; Virovitica=7; Velika Gorica=6; Vodice=5; Vis=4; Vrsar=2;
      Valpovo=2; Vrgorac=2; Vir=2; Vela Luka=2; Vrlika=1.5; Vrbovec=1.5; Vodnjan=1.5; Vrbnik=1; Vrbovsko=0.8;
      Veli Lošinj=0.8; Volosko=0.5; Viškovo=0.5; Vojnić=0.5; Vrhovine=0.5; Vrpolje=0.5; Vrboska=0.5; Vrana=0.5;
      Virje=0.5; Veliko Trgovišće=0.5; Višnjan=0.5; Velika Kopanica=0.3; Veliki Grđevac=0.3; Velika=0.3; Vrsi=0.3;
      Valun=0.3; Vinišće=0.3; Vinjerac=0.3; Vranjic=0.3; Vid=0.3; Vladislavci=0.2; Voćin=0.2; Velika Ludina=0.2;
      Vinica=0.2; Veliko Trojstvo=0.2; Vižinada=0.2; Velika Mlaka=0.2; Viljevo=0.1; Velika Pisanica=0.1;
      Veliki Bukovec=0.1; Vidovec=0.1; Visoko=0.1; Vratišinec=0.1; Vuka=0.1; Vrata=0.1; Vabriga=0.1; Valtura=0.1;
      Vođinci=0.1; Viškovci=0.1; Vrbanja=0.1; Veli Iž=0.1; Veli Rat=0.1; Vinkuran=0.05; Vranja=0.05; Vrbje=0.05;
      Vardarac=0.05; Vrelo Koreničko=0.05; Vrebac=0.05; Verunić=0.05; Vlašići=0.05; Vrisnik=0.05; Vinjani=0.05;
      Vedrine=0.05; Vojnić Sinjski=0.05; Vrbanj=0.05; Vrh=0.05; Volme=0.05; Vinež=0.05; Vučevica=0.05`,
  },
  {
    slug: "mjesto-pridjev",
    group: "hr",
    title: "Mjesto koje počinje riječju Novi, Stari, Veliki, Mali, Donji ili Gornji",
    hint: "Vrijedi i ženski i srednji rod: Nova, Staro, Velika, Malo, Donja, Gornje…",
    strip: ["grad", "selo", "mjesto"],
    answers: `Velika Gorica=15; Mali Lošinj=10; Nova Gradiška=8; Novi Vinodolski=8; Stari Grad=8; Donji Miholjac=6;
      Donja Stubica=4; Gornja Stubica=3; Novi Marof=3; Veli Lošinj=2; Mali Ston=1.5; Donji Lapac=1.5;
      Veliko Trgovišće=1.5; Stara Gradiška=1; Velika Kopanica=1; Mala Subotica=0.5; Donji Kraljevec=0.5;
      Donji Andrijevci=0.5; Donja Dubrava=0.5; Veliki Grđevac=0.5; Velika Ludina=0.5; Velika Mlaka=0.3;
      Gornje Jelenje=0.3; Gornji Kneginec=0.3; Nova Kapela=0.3; Stari Mikanovci=0.3; Staro Petrovo Selo=0.3;
      Donji Kukuruzari=0.3; Velika=0.3; Velika Pisanica=0.3; Veliki Bukovec=0.3; Mali Bukovec=0.2; Mali Iž=0.2;
      Veli Iž=0.2; Veli Rat=0.2; Donja Voća=0.2; Donja Motičina=0.2; Donji Humac=0.2; Donji Vidovec=0.2;
      Donja Lomnica=0.2; Gornji Mihaljevec=0.2; Gornja Vrba=0.2; Gornji Bogićevci=0.2; Gornji Humac=0.2;
      Nova Bukovica=0.2; Novo Virje=0.2; Nova Rača=0.2; Stari Jankovci=0.2; Stara Novalja=0.2; Stara Baška=0.2;
      Stari Laz=0.2; Veliko Trojstvo=0.2; Donje Čelo=0.1; Donje Selo=0.1; Gornje Čelo=0.1; Gornje Selo=0.1;
      Gornja Rijeka=0.1; Gornja Bačuga=0.1; Gornja Jelenska=0.1; Novi Golubovec=0.1; Novi Mikanovci=0.1; Nova Vas=0.1;
      Novo Selo=0.1; Novo Čiče=0.1; Staro Čiče=0.1; Mala Gorica=0.1; Mala Mlaka=0.1; Velo Grablje=0.1;
      Malo Grablje=0.1; Mala Ludina=0.05; Velika Trnovitica=0.05`,
  },
  {
    slug: "znamenitost",
    group: "hr",
    title: "Znamenitost ili turistička atrakcija u Hrvatskoj",
    hint: "Građevina, spomenik, muzej ili prirodna atrakcija (ne cijeli grad)",
    strip: [],
    answers: `Plitvička jezera/Plitvice/NP Plitvička jezera=9; Dioklecijanova palača/Dioklecijanova=6.5;
      Arena/Pulska arena/Amfiteatar u Puli=5; Dubrovačke zidine/Zidine Dubrovnika/Gradske zidine=4;
      Krka/Slapovi Krke/NP Krka=4; Zlatni rat=2.5; Morske orgulje=2.5; Stradun/Placa=2; Trakošćan/Dvorac Trakošćan=2;
      Pelješki most=2; Zagrebačka katedrala/Katedrala Uznesenja=2; Eufrazijeva bazilika/Eufrazijana=1.5;
      Katedrala svetog Jakova/Šibenska katedrala=1.5; Trg bana Jelačića/Jelačić plac=1.5; Pozdrav Suncu=1.5;
      Crkva svetog Marka/Sveti Marko=1.5; Mirogoj=1.5; Kornati=1.5; Brijuni=1.5; Modra špilja/Plava špilja=1.5;
      Vukovarski vodotoranj/Vodotoranj=1.5; Lovrijenac/Tvrđava Lovrijenac=1.5; Klis/Tvrđava Klis=1.5; Marjan=1.5;
      Skradinski buk=1; Grgur Ninski/Kip Grgura Ninskog=1; Peristil=1; Gornji grad=1; Maksimir=1; Tvrđa=1;
      Sveti Donat/Crkva svetog Donata=1; Đakovačka katedrala=1; Rastoke=1; Biokovo/Skywalk=1;
      Modro jezero=1; Stonske zidine/Zidine Stona=1; Katedrala svetog Duje/Sveti Duje=1; Salona=1;
      Trsat/Trsatska gradina=1; Splitska riva/Riva=1; Sljeme/Medvednica=0.7; Veliki Tabor=0.7; Medvedgrad=0.7;
      Kamenita vrata=0.7; Lotrščak/Kula Lotrščak=0.7; Muzej prekinutih veza=0.7; Dolac/Tržnica Dolac=0.7; Tkalčićeva/Tkalča=0.7;
      Zrinjevac=0.7; Jarun=0.7; Uspinjača=0.7; Knežev dvor/Kneževa palača=0.7; Onofrijeva fontana=0.7; Lokrum=0.7;
      Srđ/Žičara Srđ=0.7; Crveno jezero=0.7; Meštrovićeva galerija/Galerija Meštrović=0.7;
      Fortica/Španjola/Tvrđava Fortica=0.7; Krčki most=0.7; Paklenica=0.7; Kopački rit=0.7; Marija Bistrica=0.7;
      Bašćanska ploča/Baška ploča=0.7; Hušnjakovo/Muzej krapinskih neandertalaca/Krapinski pračovjek=0.7;
      Staro selo Kumrovec/Kumrovec=0.7; Memorijalni centar Nikola Tesla/Smiljan=0.7; Jasenovac/Kameni cvijet=0.7;
      Stari grad Varaždin/Varaždinska tvrđava=0.7; Kninska tvrđava=0.7; Lungomare=0.7; Djevojka s galebom=0.7; Korzo=0.7;
      Sveta Eufemija/Crkva svete Eufemije=0.7; Trg svetog Marka/Markov trg=0.5; Tvrđava svetog Nikole=0.5;
      Kanjon Cetine=0.3; Ovčara=0.3; Dvorac Eltz=0.3; Vučedol=0.3; Sponza/Palača Sponza=0.3; Orlandov stup=0.3;
      Arboretum Trsteno/Trsteno=0.3; Kuća Marka Pola=0.3; Kalelarga=0.3; Kamerlengo/Kaštel Kamerlengo=0.3;
      Trogirska katedrala/Katedrala svetog Lovre=0.3; Slavoluk Sergijevaca=0.3; Augustov hram=0.3; Dubovac=0.3;
      Aquatika=0.3; Kuterevo=0.3; Lonjsko polje=0.3; Telašćica=0.3; Učka=0.3; Velebit=0.3; Banski dvori=0.3;
      Muzej Mimara/Mimara=0.3; Tehnički muzej=0.3; Muzej iluzija=0.3; Poljud=0.3; Zoološki vrt/Zoo=0.3;
      Botanički vrt=0.3; Bundek=0.3; HNK/Hrvatsko narodno kazalište=0.3; Ilica=0.3; Vrelo Cetine=0.3;
      Gospa Sinjska=0.2; Crkva svetog Križa=0.2; Tvrđava svetog Mihovila=0.2; Masleniški most=0.2; Roški slap=0.2;
      Iločki podrumi=0.2; Narona=0.2; Vela spila=0.2; Baredine=0.2; Cerovačke špilje=0.2; Grabovača=0.2;
      Villa Angiolina=0.2; Molo longo=0.2; Revelin=0.2; Vransko jezero=0.2; Glagoljska aleja=0.1;
      Vodnjanske mumije/Mumije u Vodnjanu=0.1`,
  },
  {
    slug: "festival",
    group: "hr",
    title: "Festival ili manifestacija u Hrvatskoj",
    hint: "Glazbeni, filmski, folklorni, sportski ili gastro događaj, danas ili nekad",
    strip: ["festival"],
    answers: `Ultra/Ultra Europe=10; Sinjska alka/Alka=10; Riječki karneval/Karneval=8; INmusic=6;
      Advent u Zagrebu/Advent=6; Splitski festival/Festival zabavne glazbe Split=4; Dora=4;
      Motovun Film Festival/Motovunski filmski festival=3; Pulski filmski festival/Pula Film Festival=3;
      Dubrovačke ljetne igre/Ljetne igre=3; Špancirfest=3; Vinkovačke jeseni=3; Đakovački vezovi=2; Hideout=2;
      Samoborski fašnik/Fašnik=1.5; Festival dalmatinskih klapa Omiš/Omiški festival=1.5;
      Sveti Vlaho/Festa svetog Vlaha=1.5; Snježna kraljica=1.5; Croatia Open/ATP Umag=1; Animafest=1;
      Varaždinske barokne večeri=1; Smotra folklora/Međunarodna smotra folklora=1; Melodije Istre i Kvarnera/MIK=1;
      Cest is d'Best=1; Noć muzeja=1; Martinje=1; Sudamja=1; Fresh Island=1; Sonus=1; Porin=1; Outlook=0.5;
      Dimensions=0.5; Love International=0.5; Defected Croatia/Defected=0.5; Seasplash=0.5; Terraneo=0.5;
      Zagreb Film Festival=0.5; ZagrebDox=0.5; Brodsko kolo=0.5; Zlatne žice Slavonije=0.5;
      Hrvatski radijski festival=0.5; Festival svjetla=0.5; Marunada=0.5; Rapska fjera=0.5;
      Međunarodni dječji festival=0.5; Interliber=0.5; Zagreb Pride/Pride=0.5; Ljeto na Strossu=0.5;
      Festival kajkavskih popevki/Krapinski festival=0.5; Zagrebfest=0.5; Splitsko ljeto=0.5; Sea Star=0.5;
      The Garden Festival/Garden Festival=0.5; Zagreb Marathon/Zagrebački maraton=0.3; Tour of Croatia=0.3;
      Vukovar Film Festival=0.3; Paški karneval=0.3; Hartera=0.3; Osječko ljeto kulture=0.3; Šokačko sijelo=0.3;
      Unknown Festival/Unknown=0.3; Osorske glazbene večeri=0.3; Zadarfest=0.3; Festival mediteranskog filma=0.3;
      Vinistra=0.3; Festival svjetskog kazališta=0.3; Eurokaz=0.3; Trka na prstenac=0.1; Picokijada=0.1`,
  },
  {
    slug: "znanstvenik",
    group: "hr",
    title: "Hrvatski znanstvenik, izumitelj ili liječnik",
    hint: "Rođen ili djelovao u Hrvatskoj, bilo kad",
    strip: [],
    answers: `Nikola Tesla/Tesla=30; Ruđer Bošković/Bošković=12; Slavoljub Penkala/Penkala=7; Faust Vrančić/Vrančić=6;
      Andrija Mohorovičić/Mohorovičić=5; Lavoslav Ružička/Ružička=5; Vladimir Prelog/Prelog=4;
      Andrija Štampar/Štampar=4; Ivan Vučetić/Vučetić=3; Mate Rimac=3; Marin Getaldić/Getaldić=2;
      Miroslav Radman/Radman=2; Dragutin Gorjanović-Kramberger/Gorjanović-Kramberger/Gorjanović=2;
      Milutin Milanković/Milanković=2; Ivan Lupis/Ivan Blaž Lupis=1; Franjo Hanaman=1; David Schwarz=1;
      Josip Belušić=1; Ivan Supek=1; Markantun de Dominis/Marko Antun de Dominis=1; Igor Rudan=1; Ivica Puljak=1;
      Dragan Primorac=1; Ivan Đikić=0.5; Gordan Lauc=0.5; Marin Soljačić=0.5; Rudolf Fizir=0.5; Herman Dalmatin=0.5;
      Frane Petrić/Franjo Petrić=0.5; Benedikt Kotruljević/Benko Kotruljević=0.5; Đuro Baglivi/Baglivi=0.5;
      Vladimir Paar=0.5; Federik Grisogono=0.3; Oton Kučera=0.3; Spiridion Brusina=0.3; Mirko Dražen Grmek=0.3;
      Hrvoje Požar=0.3; Bogoslav Šulek=0.3; Vladimir Varićak=0.3; Danilo Blanuša=0.3; Ante Šercer=0.3;
      Ivica Kostović=0.3; Vatroslav Jagić=0.3; Fran Bubanović=0.3; Božo Težak=0.3; Zvonimir Janko=0.3;
      Josip Torbar=0.3; Fran Gundrum Oriovčanin=0.1; Josip Lončar=0.1; Josip Pančić=0.5; Fran Mihaljević=0.5;
      Andrija Hebrang=0.5; Đuro Kurepa=0.2; Stjepan Gradić=0.2; Ivan Krstitelj Lalangue=0.2; Ivan Horvat=0.2;
      Ljudevit Vukotinović=0.2; Gjuro Pilar=0.2; Nikola Nalješković=0.2; Teodor Wickerhauser=0.2; Ivo Padovan=0.2;
      Tomislav Uzelac=0.2; Stjepan Škreb=0.2`,
  },
  {
    slug: "kosarkas",
    group: "hr",
    title: "Hrvatski košarkaš ili košarkašica",
    hint: "Bilo koja generacija",
    strip: [],
    answers: `Dražen Petrović/Petrović=25; Toni Kukoč/Kukoč=12; Dino Rađa/Rađa=10; Krešimir Ćosić/Ćosić=6;
      Bojan Bogdanović/Bogdanović=5; Dario Šarić/Šarić=5; Stojko Vranković/Vranković=4; Ivica Zubac/Zubac=4;
      Mario Hezonja/Hezonja=3; Zoran Planinić/Planinić=2; Roko Ukić/Ukić=2; Arijan Komazec/Komazec=2;
      Velimir Perasović/Perasović=2; Danko Cvjetićanin/Cvjetićanin=1.5; Nikola Vujčić/Vujčić=1.5;
      Gordan Giriček/Giriček=1.5; Žan Tabak/Tabak=1.5; Aleksandar Petrović/Aco Petrović=1.5; Ante Tomić=1.5;
      Damir Mulaomerović=1; Marko Popović=1; Ante Žižić=1; Dragan Bender=1; Krunoslav Simon/Kruno Simon=1;
      Mihovil Nakić=1; Franjo Arapović=0.5; Vladimir Krstić=0.5; Davor Kus=0.5; Damir Markota=0.5; Luka Žorić=0.5;
      Marko Tomas=0.5; Mario Kasun=0.5; Nikola Prkačin=0.5; Mirko Novosel=0.5; Petar Skansi=0.5; Andro Knego=0.5;
      Željko Jerkov=0.5; Veljko Mršić=0.5; Slaven Rimac=0.5; Miro Bilan=0.5; Rok Stipčević=0.5; Damjan Rudež=0.5;
      Luka Šamanić=0.5; Karlo Matković=0.5; Roko Prkačin=0.5; Antonija Mišura=0.5; Žana Lelas=0.5; Danira Bilić=0.3;
      Ana Lelas=0.3; Damir Šolman=0.3; Krešimir Lončar=0.3; Vladan Alanović=0.3; Alan Gregov=0.3; Bruno Šundov=0.3;
      Matej Mamić=0.3; Jakov Vladović=0.3; Tomislav Zubčić=0.3; Filip Krušlin=0.3; Davor Pejčinović=0.3;
      Marko Banić=0.3; Josip Sesar=0.3; Rato Tvrdić=0.1; Hrvoje Perinčić=0.1`,
  },
  {
    slug: "rukomet-vaterpolo",
    group: "hr",
    title: "Hrvatski rukometaš ili vaterpolist",
    hint: "Rukomet ili vaterpolo, muški ili ženski, bilo koja generacija",
    strip: [],
    answers: `Ivano Balić/Balić=15; Domagoj Duvnjak/Duvnjak=12; Igor Vori/Vori=6; Luka Cindrić/Cindrić=5;
      Perica Bukić/Bukić=5; Ivan Čupić/Čupić=4; Mirko Alilović/Alilović=3; Blaženko Lacković/Lacković=3;
      Manuel Štrlek/Štrlek=3; Vlado Šola/Šola=3; Igor Hinić/Hinić=3; Sandro Sukno/Sukno=3; Josip Pavić=3;
      Igor Karačić/Karačić=2; Petar Metličić/Metličić=2; Mirza Džomba/Džomba=2; Slavko Goluža/Goluža=2;
      Frano Vićan/Vićan=2; Patrik Ćavar/Ćavar=1.5; Venio Losert/Losert=1.5; Ivan Buljubašić=1.5; Andro Bušlje=1.5;
      Samir Barać=1.5; Maro Joković=1.5; Valter Matošević=1; Nikša Kaleb=1; Iztok Puc=1; Zlatko Saračević=1;
      Irfan Smajlagić=1; Alvaro Načinović=1; Denis Špoljarić=1; Drago Vuković=1; Zlatko Horvat=1; Davor Dominiković=1;
      Damir Burić=1; Dubravko Šimenc=1; Paulo Obradović=1; Xavier García=1; Nikša Dobud=1; Miho Bošković=1;
      Marko Bijač=1; Božidar Jović=0.5; Goran Perkovac=0.5; Domagoj Pavlović=0.5; Marino Marić=0.5; Željko Musa=0.5;
      Jakov Gojun=0.5; Marko Kopljar=0.5; Tonči Valčić=0.5; Ivan Ninčević=0.5; Luka Stepančić=0.5; Ivan Pešić=0.5;
      Filip Ivić=0.5; Marin Šego=0.5; Damir Bičanić=0.5; Renato Sulić=0.5; Vedran Zrnić=0.5; Hrvoje Horvat=0.5;
      Zdravko Zovko=0.5; Andrea Penezić=0.5; Ratko Štritof=0.5; Anđelo Šetka=0.5; Loren Fatović=0.5; Luka Lončar=0.5;
      Konstantin Kharkov=0.5; Luka Bukić=0.5; Tin Lučin=0.3; Mario Šoštarić=0.3; David Mandić=0.3;
      Veron Načinović=0.3; Dominik Kuzmanović=0.3; Ana Debelić=0.3; Dejana Milosavljević=0.3; Paula Posavec=0.3;
      Rino Burić=0.3; Jerko Marinić Kragić=0.3; Goran Sukno=0.3; Tomislav Paškvalin=0.3; Ronald Lopatny=0.3;
      Petar Muslim=0.3; Zdravko Miljak=0.1; Ozren Bonačić=0.1`,
  },
  {
    slug: "hajduk",
    group: "hr",
    title: "Nogometaš Hajduka",
    hint: "Igrao za Hajduk bilo kad u povijesti kluba",
    strip: [],
    answers: `Marko Livaja/Livaja=15; Slaven Bilić/Bilić=5; Igor Štimac/Štimac=5; Alen Bokšić/Bokšić=5;
      Darijo Srna/Dario Srna/Srna=4; Stipe Pletikosa/Pletikosa=4; Aljoša Asanović/Asanović=4; Milan Rapaić/Rapaić=4;
      Igor Tudor/Tudor=4; Robert Jarni/Jarni=3; Nikola Vlašić/Vlašić=3; Nikola Kalinić=3; Ivan Perišić/Perišić=2;
      Danijel Subašić/Subašić=2; Tonči Gabrić/Gabrić=2; Frane Matošić/Matošić=2; Bernard Vukas/Vukas=2;
      Ivica Šurjak/Šurjak=2; Mario Pašalić/Pašalić=2; Josip Juranović/Juranović=2; Lovro Kalinić=2; Zlatko Vujović=2;
      Niko Kranjčar/Kranjčar=1.5; Zoran Vujović=1; Goran Vučević=1; Ivica Mornar=1; Ivan Leko=1;
      Nikica Jelavić/Jelavić=1; Mirko Hrgović=1; Senijad Ibričić=1; Ante Vukušić=1; Srđan Andrić=1; Ivan Strinić=1;
      Filip Krovinović=1; Stipe Biuk=1; Tomislav Erceg=1; Ardian Kozniku=1; Stjepan Andrijašević=1; Vladimir Beara=1;
      Dražen Mužinić=1; Jurica Jerković=1; Ivan Buljan=1; Blaž Slišković=1; Mijo Caktaš=1; Ante Erceg=0.5;
      Ante Palaversa=0.5; Toma Bašić=0.5; Josip Radošević=0.5; Domagoj Bradarić=0.5; Marin Ljubičić=0.5;
      Franko Andrijašević=0.5; Jurica Buljat=0.5; Mato Neretljak=0.5; Dante Stipica=0.5; Nikola Jerkan=0.5;
      Ante Miše=0.5; Vedran Rožić=0.5; Luka Peruzović=0.5; Petar Nadoveza=0.5; Ivan Pudar=0.5; Ivan Gudelj=0.5;
      Boro Primorac=0.5; Branko Oblak=0.5; Jan Mlakar=0.5; Rokas Pukštas=0.5; Ivan Dolček=0.3; Lukas Grgić=0.3;
      Emir Sahiti=0.3; Andrija Balić=0.3; Bassel Jradi=0.3; Mario Maloča=0.3; Hari Vukas=0.3; Zvonimir Deranja=0.3;
      Darko Butorović=0.3; Mario Boljat=0.3; Ivan Katalinić=0.3; Ivica Hlevnjak=0.3; Ante Žanetić=0.3;
      Leo Lemešić=0.1; Šime Luketin=0.1`,
  },
  {
    slug: "dinamo",
    group: "hr",
    title: "Nogometaš Dinama",
    hint: "Igrao za Dinamo bilo kad u povijesti kluba (i kao Croatia Zagreb)",
    strip: [],
    answers: `Luka Modrić/Modrić=13; Zvonimir Boban/Boban=5; Mario Mandžukić/Mandžukić=5; Davor Šuker/Šuker=4.5;
      Joško Gvardiol/Gvardiol=4.5; Robert Prosinečki/Prosinečki=3.5; Mateo Kovačić/Kovačić=3.5; Dani Olmo/Olmo=3.5;
      Mislav Oršić/Oršić=3.5; Dominik Livaković/Livaković=3.5; Dejan Lovren/Lovren=2.5; Marcelo Brozović/Brozović=2.5;
      Bruno Petković/Petković=2.5; Eduardo da Silva/Eduardo=2.5; Josip Šutalo/Šutalo=1.5; Vedran Ćorluka/Ćorluka=1.5;
      Niko Kranjčar=1.5; Zlatko Kranjčar=1.5; Ivica Olić/Olić=1.5; Dražen Ladić/Ladić=1.5; Milan Badelj/Badelj=1.5;
      Josip Šimunić/Šimunić=1.5; Dario Šimić=1.5; Martin Baturina/Baturina=0.9; Lovro Majer/Majer=0.9; Krunoslav Jurčić=0.9;
      Velimir Zajec/Zajec=0.9; Marko Mlinarić/Mlinarić=0.9; Stjepan Deverić=0.9; Igor Cvitanović=0.9; Goran Vlaović/Vlaović=0.9;
      Tomislav Butina=0.9; Sammir=0.9; Ognjen Vukojević=0.9; Boško Balaban=0.9; Igor Bišćan=0.9; Danijel Pranjić=0.9;
      Alen Halilović=0.9; Marko Pjaca=0.9; Marko Rog=0.9; Ante Ćorić=0.9; Arijan Ademi=0.9; El Arabi Hillel Soudani/Soudani=0.9;
      Mario Gavranović=0.9; Domagoj Vida=0.9; Šime Vrsaljko=0.9; Borna Sosa=0.9; Josip Brekalo=0.9; Robert Kovač=0.9;
      Tomislav Ivković=0.9; Silvio Marić=0.4; Robert Špehar=0.4; Ivan Turina=0.4; Ivan Kelava=0.4; Jerko Leko=0.4;
      Tomislav Šokota=0.4; Etto=0.4; Junior Fernandes=0.4; Kristijan Jakić=0.4; Luka Ivanušec=0.4; Petar Sučić=0.4;
      Dino Perić=0.4; Josip Mišić=0.4; Sandro Kulenović=0.4; Kevin Theophile-Catherine=0.4; Amer Gojak=0.4;
      Izet Hajrović=0.4; Duje Čop=0.4; Tin Jedvaj=0.4; Nikola Moro=0.4; Marin Leovac=0.4; Mihael Mikić=0.4;
      Josip Pivarić=0.4; Gordon Schildenfeld=0.4; Stjepan Lamza=0.4; Rudolf Belin=0.4; Slaven Zambata=0.4;
      Dražan Jerković=0.4; Željko Čajkovski=0.4; Snješko Cerin=0.4; Borislav Cvetković=0.4; Ivica Horvat=0.3;
      Fatos Bećiraj=0.3; Stefan Ristovski=0.3; Petar Stojanović=0.3; Leonardo Sigali=0.3; Paulo Machado=0.3;
      Dario Špikić=0.3; Mahir Emreli=0.3; Zvjezdan Cvetković=0.3; Ismet Hadžić=0.3; Džemal Mustedanagić=0.3;
      Josip Kuže=0.3; Dionizije Dvornić=0.3; Mladen Ramljak=0.1; Zlatko Škorić=0.1`,
  },
  {
    slug: "trener",
    group: "hr",
    title: "Hrvatski trener ili izbornik, bilo koji sport",
    hint: "Bilo koja generacija i bilo koji sport",
    strip: [],
    answers: `Zlatko Dalić/Dalić=20; Miroslav Blažević/Ćiro Blažević/Ćiro=12; Lino Červar/Červar=6;
      Ratko Rudić/Rudić=5; Slaven Bilić/Bilić=5; Niko Kovač=4; Igor Tudor/Tudor=4; Igor Štimac/Štimac=3;
      Otto Barić/Barić=3; Mirko Novosel/Novosel=3; Tomislav Ivić/Ivić=2; Ante Čačić/Čačić=2; Nenad Bjelica/Bjelica=2;
      Ante Kostelić=2; Goran Ivanišević=2; Ivan Ljubičić=2; Nikola Pilić=2; Ivan Leko/Leko=1.5; Robert Prosinečki=1.5;
      Sergej Jakirović/Jakirović=1.5; Jasmin Repeša/Repeša=1.5; Mirko Jozić/Jozić=1.5; Branko Zebec=1;
      Vlatko Marković=1; Krunoslav Jurčić=1; Zoran Mamić=1; Igor Bišćan=1; Zlatko Kranjčar=1; Ivo Šušak=1;
      Branko Ivanković=1; Neven Spahija=1; Aleksandar Petrović=1; Velimir Perasović=1; Željko Babić=1;
      Slavko Goluža=1; Ivica Tucak=1; Josip Kuže=1; Joško Vlašić=1; Petar Skansi=0.5; Hrvoje Horvat=0.5;
      Zdravko Zovko=0.5; Ivo Trumbić=0.5; Vjekoslav Kobešćak=0.1; Luka Peruzović=0.5; Stanko Poklepović=0.5;
      Ante Miše=0.5; Damir Krznar=0.5; Zoran Vulić=0.5; Mario Cvitanović=0.5; Igor Cvitanović=0.5; Dragan Skočić=0.5;
      Zvonimir Soldo=0.5; Željko Krajan=0.5; Ilija Lončarević=0.3; Tomislav Ivković=0.3; Robert Jarni=0.3;
      Dražen Anzulović=0.3; Damir Mulaomerović=0.3; Goran Perkovac=0.3; Velimir Kljaić=0.5; Dražen Jerković=0.1`,
  },
  {
    slug: "klub-ostalo",
    group: "hr",
    title: "Hrvatski sportski klub izvan nogometa",
    hint: "Košarka, rukomet, vaterpolo, hokej, odbojka, veslanje..., danas ili nekad",
    strip: ["kk", "rk", "vk", "hk", "ok", "zkk", "zrk", "havk", "haok", "khl", "hvk"],
    answers: `Cibona=20; Zagreb/RK Zagreb/PPD Zagreb/Croatia osiguranje/Badel 1862=10; Jug/Jug Dubrovnik=7; Mladost=6;
      Medveščak=6; Split/Jugoplastika/KK Split=6; Zadar/KK Zadar=5; Cedevita=4; Primorje=3; POŠK=2; Nexe/RK Nexe=2;
      Podravka/Podravka Vegeta=2; Šibenik/Šibenka=2; Mornar=1.5; Metković=1; Jadran=1; Bjelovar/Partizan Bjelovar=1;
      Zamet=1; Lokomotiva=1; Osijek/Vrijednosnice Osijek=0.5; Alkar=0.5; Poreč=0.5; Sisak=0.5; Gusar=0.5;
      Gospić/Gospić Industrogradnja=0.5; Nada=0.5; Solaris=0.5; Dubrovnik=0.5; Rijeka=0.5; Karlovac=0.3; Varaždin=0.3;
      Dubrava=0.3; Sesvete=0.3; Spačva=0.3; Gorica=0.3; Novi Zagreb=0.3; Korčula=0.3; Dinamo-Zrinjevac=0.3;
      ASK Split=0.3; Zabok=0.3; Zrinjevac=0.3; Moslavina=0.3; Futsal Dinamo=0.3; Olimpija Karlovac=0.1; Kvarner=0.2;
      Kaštela/Ribola Kaštela=0.2; Samobor=0.2; Novo Vrijeme=0.2; Olmissum=0.2; Nacional=0.2; HAŠK=0.2;
      Hrvatski sokol=0.2`,
  },
  {
    slug: "medij",
    group: "hr",
    title: "Hrvatske novine, časopis, TV, radio ili portal",
    hint: "Danas ili nekad",
    strip: [],
    answers: `Jutarnji list/Jutarnji=7; Večernji list/Večernji=7; 24sata=7; HRT/HTV/Hrvatska televizija=7;
      Nova TV/Nova=7; RTL=5.5; Index/Index.hr=5.5; Slobodna Dalmacija/Slobodna=4; Novi list=3; N1=2; Telegram=2;
      Tportal=2; Net.hr=2; Sportske novosti=2; Narodni radio=2; Otvoreni radio=2; Glas Slavonije=1.5; Vjesnik=1.5;
      Feral Tribune/Feral=1.5; Nacional=1.5; Globus=1.5; Gloria=1.5; Dnevnik.hr=1.5; Hrvatski radio/HR1/Radio Zagreb=1.5;
      Antena Zagreb/Antena=1.5; Radio 101=1.5; Radio Dalmacija=1.5; Glas Istre=0.7; Zadarski list=0.7; Novosti=0.7;
      Poslovni dnevnik=0.7; Story=0.7; Glas Koncila=0.7; Bug=0.7; Smib=0.7; Hina=0.7; Doma TV=0.7; RTL2=0.7; Z1=0.7; OTV=0.7; CMC=0.7;
      Arena Sport=0.7; Direktno=0.7; Sportnet=0.7; Enter Zagreb=0.7; Extra FM=0.7; Totalni FM=0.7; Šibenski list=0.4;
      Varaždinske vijesti=0.4; Lider=0.4; Privredni vjesnik=0.4; Arena=0.4; Modra lasta=0.4; Nedjeljna Dalmacija=0.4;
      Start=0.4; Polet=0.4; Plavi vjesnik=0.4; Faktograf=0.4; H-Alter=0.4; Lupiga=0.4; Narod.hr=0.4; Dnevno.hr=0.4;
      Srednja.hr=0.4; Gol.hr=0.4; Laudato TV/Laudato=0.4; Radio Sljeme=0.4; Yammat FM=0.4; Laganini FM=0.4;
      Radio Marija=0.4; Hrvatski katolički radio/HKR=0.4; Studio=0.2; Danas=0.2; Kanal Ri=0.2; Osječka televizija=0.2;
      Zimo=0.2; Monitor.hr=0.2; Dalmacija Danas=0.2; Dalmatinski portal=0.2; Morski.hr=0.2; Radio Martin=0.2;
      Radio Kaj=0.2; Radio Banovina=0.2; Radio Rijeka=0.2; Radio Split=0.2; Radio Osijek=0.2; Soundset Plavi=0.2;
      Radio Student=0.2; Arkzin=0.1; Kerempuh=0.1`,
  },
  {
    slug: "trgovina",
    group: "hr",
    title: "Trgovina ili trgovački lanac u Hrvatskoj",
    hint: "Supermarket, dućan ili lanac, danas ili nekad",
    strip: ["trgovina", "supermarket"],
    answers: `Konzum=11.5; Lidl=9; Kaufland=6; Spar/Interspar=4.5; Studenac=4.5; DM=4.5; Plodine=4; Tommy=4;
      Müller/Mueller=3; Ikea=3; Emmezeta=2.5; Zara=2.5; H&M=2.5; Eurospin=1.5; KTC=1.5; Metro=1.5; Pevex=1.5; Bauhaus=1.5; Lesnina=1.5;
      Bipa=1.5; Nama=1.5; Tisak=1.5; Billa=1.5; Pepco=1.5; Mlinar=1.5; Ribola=0.8; Trgovina Krk=0.8; JYSK=0.8; Harvey Norman=0.8; Links=0.8;
      Sancta Domenica=0.8; Douglas=0.8; Getro=0.8; Mercator=0.8; Diona=0.8; Kerum=0.8; Decathlon=0.8; Intersport=0.8; Sport Vision=0.8;
      C&A=0.8; New Yorker=0.8; Deichmann=0.8; KiK=0.8; Tedi=0.8; Action=0.8; Obi=0.8; XXXLutz=0.8; Algoritam=0.8; Pan-Pek=0.8; Boso=0.4;
      Elipso=0.4; Žabac=0.4; NTL=0.4; Hervis=0.4; Pull&Bear=0.4; Bershka=0.4; CCC=0.4; Takko=0.4; Mango=0.4;
      Reserved=0.4; Sinsay=0.4; Varteks=0.4; Borovo=0.4; Instar=0.4; Hgspot=0.4; iStyle=0.4; Baumax=0.4;
      Prima namještaj=0.4; Znanje=0.4; Profil=0.4; Školska knjiga=0.4; Sephora=0.4; eKupi=0.4; Merkur=0.2; Ljevak=0.2;
      Lonia=0.1; Mikronis=0.1`,
  },
  {
    slug: "zagreb-ulica",
    group: "hr",
    title: "Ulica, trg ili park u Zagrebu",
    hint: "Ulica, avenija, trg, park ili šetalište",
    strip: ["ulica", "trg", "park"],
    answers: `Trg bana Josipa Jelačića/Trg bana Jelačića/Jelačić plac/Jelačićev trg=10.5; Ilica=8.5; Maksimir=3.5;
      Tkalčićeva/Tkalča=3.5; Ulica grada Vukovara/Vukovarska/Vukovarska avenija=3.5; Savska/Savska cesta=3;
      Zrinjevac/Trg Nikole Šubića Zrinskog=3; Cvjetni trg/Trg Petra Preradovića/Cvjetni=3;
      Trg kralja Tomislava/Tomislavac=2; Markov trg/Trg svetog Marka=2; Britanski trg/Britanac=2;
      Kvaternikov trg/Kvatrić=2; Jarun=2; Slavonska avenija/Slavonska=2; Radićeva=1.5; Bundek=1.5; Ribnjak=1.5;
      Heinzelova=1.5; Zagrebačka avenija=1.5; Avenija Dubrovnik=1.5; Selska/Selska cesta=1.5; Draškovićeva=1.5; Branimirova=1.5;
      Frankopanska=1.5; Gajeva=1.5; Bogovićeva=1.5; Kaptol=1.5; Mirogoj=1.5; Vlaška=1; Dolac=1;
      Trg Republike Hrvatske/Trg maršala Tita=1; Trg žrtava fašizma/Trg hrvatskih velikana=1;
      Strossmayerovo šetalište/Strossmartre=1; Masarykova=0.7; Praška=0.7; Petrinjska=0.7; Jurišićeva=0.7; Palmotićeva=0.7;
      Martićeva=0.7; Opatovina=0.7; Mesnička=0.7; Radnička/Radnička cesta=0.7; Ljubljanska avenija=0.7;
      Avenija Marina Držića/Držićeva=0.7; Avenija Većeslava Holjevca=0.7; Maksimirska=0.7; Zvonimirova=0.7; Šubićeva=0.7;
      Petrova=0.7; Strossmayerov trg=0.7; Trg Ante Starčevića=0.7; Botanički vrt=0.7; Lenucijeva potkova=0.7; Tuškanac=0.7;
      Šalata=0.7; Nova cesta=0.7; Ozaljska=0.7; Tratinska=0.7; Kamenita=0.7; Teslina=0.7; Preradovićeva=0.7; Varšavska=0.7;
      Hebrangova=0.7; Horvaćanska=0.7; Kranjčevićeva=0.7; Krvavi most=0.7; Ulica Hrvatske bratske zajednice=0.4;
      Avenija Dubrava=0.4; Trg Francuske Republike=0.4; Trg Stjepana Radića=0.4; Zagrebačka cesta=0.4;
      Ulica Republike Austrije=0.4; Bakačeva=0.4; Gundulićeva=0.4; Tomićeva=0.4; Mihanovićeva=0.4; Krešimirov trg=0.4;
      Voćarska=0.4; Medvedgradska=0.4; Ksaverska cesta=0.4; Mlinarska=0.4; Prisavlje=0.4; Savica=0.4;
      Mažuranićev trg=0.4; Marulićev trg=0.4; Grič=0.4; Katarinin trg=0.4; Opatička=0.4; Šenoina=0.4; Skalinska=0.4;
      Ilirski trg=0.2; Pavla Radića=0.2; Amruševa=0.2; Berislavićeva=0.2; Đorđićeva=0.2; Laščinska=0.2; Demetrova=0.2;
      Ćirilometodska=0.2; Kušlanova=0.2; Jadranska avenija=0.2; Park Stara Trešnjevka=0.2; Jelenovac=0.2;
      Dotrščina=0.2; Pod zidom=0.1; Mletačka=0.1`,
  },
  {
    slug: "kvart-grad",
    group: "hr",
    title: "Kvart u Splitu, Rijeci ili Osijeku",
    hint: "Gradski kotar, kvart ili naselje u jednom od ta tri grada",
    strip: [],
    answers: `Bačvice=6; Split 3=5; Trsat=5; Varoš/Veli Varoš=4; Poljud=4; Žnjan=4; Sušak=4; Kantrida=4; Tvrđa=4;
      Spinut=3; Meje=3; Gripe=3; Zamet=3; Gornji grad=3; Donji grad=3; Bol=2; Lovret=2; Lokve=2; Mertojak=2;
      Sućidar=2; Brda=2; Trstenik=2; Firule=2; Pećine=2; Kozala=2; Vežica/Gornja Vežica/Donja Vežica=2; Retfala=2;
      Jug II/Jug 2/Jug=2; Sjenjak=2; Kman=1.5; Ravne njive=1.5; Turnić=1.5; Drenova=1.5; Novi grad=1.5; Višnjevac=1.5;
      Kocunar=1; Mejaši=1; Neslanovac=1; Plokite=1; Pujanke=1; Sirobuja=1; Visoka=1; Stobreč=1; Blatine/Škrape=1;
      Lučac=1; Manuš=1; Dobri=1; Pehlin=1; Srdoči=1; Škurinje=1; Krnjevo=1; Belveder=1; Brajda=1; Mlaka=1;
      Podmurvice=1; Industrijska četvrt=1; Josipovac=1; Tenja=1; Šine=0.5; Kamen=0.5; Zenta=0.5; Martinkovac=0.5;
      Grbci=0.5; Orehovica=0.5; Hosti=0.5; Pulac=0.5; Školjić=0.5; Delta=0.5; Draga=0.5; Briješće=0.5; Sarvaš=0.5;
      Cvjetno naselje=0.5; Bosutsko naselje=0.5; Zeleno polje=0.5; Pazdigrad=0.3; Brašćine=0.3; Pašac=0.3;
      Rujevica=0.3; Klisa=0.3; Vijenac=0.3; Nemetin=0.3; Tvrđavica=0.3; Duilovo=0.1; Svilno=0.1`,
  },
  {
    slug: "plaza-hr",
    group: "hr",
    title: "Plaža u Hrvatskoj",
    hint: "Ime plaže ili uvale za kupanje, na moru, jezeru ili rijeci",
    strip: ["plaza", "uvala"],
    answers: `Zlatni rat=15; Bačvice=8; Zrće=5; Sakarun/Saharun=4; Stiniva=4; Punta rata=4; Kamenjak=3;
      Rajska plaža=3; Banje=3; Vela plaža=3; Nugal=2; Kraljičina plaža=2; Kašjuni=2; Žnjan=2; Čikat=2; Šunj=2;
      Pasjača=1; Kupari=1; Lapad=1; Pržina=1; Slanica=1; Proizd=1; Dubovica=1; Medveja=1; Slatina=1; Lovrečina=1;
      Firule=1; Bene=1; Kolovare=1; Borik=1; Jadrija=1; Raduča=1; Srebrna=1; Pupnatska luka=1; Saplunara=1;
      Prapratno=1; Sveti Jakov=1; Zlatni rt=1; Jarun=1; Divna=0.5; Sabunike=0.5; Ručica=0.5; Kandarola=0.5;
      Sahara=0.5; Ježinac=0.5; Trstenik=0.5; Kaštelet=0.5; Kantrida=0.5; Ostro=0.5; Oprna=0.5; Banj=0.5;
      Pokonji Dol=0.5; Stončica=0.5; Lone=0.5; Girandella=0.5; Plava laguna=0.5; Zelena laguna=0.5; Velika plaža=0.5;
      Bundek=0.5; Šoderica=0.5; Copacabana=0.5; Buža=0.3; Caska=0.3; Saplun=0.1; Žurkovo=0.1`,
  },
  {
    slug: "spilja-slap",
    group: "hr",
    title: "Špilja, jama ili slap u Hrvatskoj",
    hint: "Špilja, pećina, jama, ponor ili slap",
    strip: ["spilja", "spilje", "pecina", "jama", "slap", "slapovi"],
    answers: `Modra špilja/Plava špilja=10; Skradinski buk=10; Veliki slap=6; Roški slap=5; Krka/Slapovi Krke=5;
      Plitvice/Plitvička jezera=4; Rastoke=3; Barać/Baraćeve špilje=3; Cerovačke špilje=2; Veternica=2;
      Pazinska jama/Pazinski ponor=2; Lukina jama=2; Vrelo=1.5; Zelena špilja=1; Grabovača=1; Lokvarka=1;
      Manita peć=1; Biserujka=1; Vela spila=1; Baredine=1; Romualdova pećina=1; Vranjača=1; Vindija=1; Sopot=1;
      Gubavica=1; Manojlovac/Manojlovački slap=1; Zarečki krov=1; Zeleni vir=1; Slapovi Mrežnice=1; Modrič=0.5;
      Mramornica=0.5; Feštinsko kraljevstvo=0.5; Slovačka jama=0.5; Đula-Medvedica/Đula=0.5; Velebita=0.5;
      Ledena jama=0.5; Bilušića buk=0.5; Brljan=0.5; Krčić=0.5; Galovački buk=0.5; Sastavci=0.5; Vražji prolaz=0.5;
      Gospodska pećina=0.3; Šipun=0.3; Medvidina špilja=0.3; Miljacka=0.3; Milke Trnine=0.3; Visoki buk=0.3; Rača=0.3;
      Tounjčica=0.3; Jopićeva špilja=0.3; Patkov gušt=0.1`,
  },
  {
    slug: "obicaj",
    group: "hr",
    title: "Hrvatski običaj, tradicija ili narodni ples",
    hint: "Običaj, blagdanski ritual, narodni ples, pjevanje ili rukotvorina",
    strip: [],
    answers: `Kolo=8; Klapa/Klapsko pjevanje=6; Sinjska alka/Alka=5; Bećarac=4; Licitar/Licitarsko srce/Medičarstvo=4;
      Moreška=4; Maškare/Fašnik/Karneval=4; Linđo/Poskočica=3; Ojkanje/Ojkača=3; Drmeš=3; Zvončari=3; Pisanice=3;
      Gange/Ganga=2; Nijemo kolo=2; Badnjak=2; Krijes/Ivanjski krijes/Ivanje=2; Martinje=2; Za Križen=2;
      Čipka/Paška čipka/Lepoglavska čipka/Hvarska čipka=2; Kolinje/Svinjokolja=2; Narodna nošnja/Nošnja=2; Kravata=2;
      Festa svetog Vlaha/Sveti Vlaho=1.5; Kumpanija=1; Kraljice/Ljelje=1; Ladarice=1; Vincekovo=1;
      Tamburica/Tamburaška glazba=1; Lucijino žito/Božićno žito=1; Adventski vijenac=1; Jaslice/Betlehem=1;
      Koledari/Koleda=1; Šestinski kišobran=1; Guslanje/Gusle=1; Slavonsko kolo=1; Dvoglasje/Istarska ljestvica=1;
      Rera=0.5; Prelo=0.5; Sijelo=0.5; Dožinjci=0.5; Jurjevo/Jurjaši=0.5; Pleter=0.5; Glagoljaštvo/Glagoljica=0.5;
      Sopile/Sopele=0.5; Balun=0.5; Čuvari Kristova groba/Turci=0.5; Hodočašće=0.5; Blagoslov jela=0.5; Kumstvo=0.3;
      Barjaktar=0.3; Pust=0.3; Polaženik=0.1; Zeleni Juraj=0.1; Picigin=2; Briškula/Trešeta/Briškula i trešeta=1;
      Bocanje/Boće/Balote=1; Ponoćka=1; Kićenje bora=1; Sveti Nikola/Nikolinje=1; Cvjetnica=0.5; Krampus=0.5;
      Svi sveti=0.5; Vez/Vezenje=0.5; Trka na prstenac=0.3; Fjaka=0.5; Mih/Mišnice/Dude=0.3`,
  },
  {
    slug: "knjizevno-djelo",
    group: "hr",
    title: "Djelo hrvatske književnosti ili lektira",
    hint: "Naslov romana, drame, pjesme ili zbirke",
    strip: [],
    answers: `Čudnovate zgode šegrta Hlapića/Šegrt Hlapić/Hlapić=6; Judita=3.5; Zlatarovo zlato=3; Vlak u snijegu=3;
      Družba Pere Kvržice/Pero Kvržica=3; Priče iz davnine=2.5; Dundo Maroje=2.5; Smrt Smail-age Čengića=2.5;
      Povratak Filipa Latinovicza/Filip Latinovicz=2.5; Gospoda Glembajevi/Glembajevi=2.5; Mali princ=2.5; Osman=2;
      Koko u Parizu=2; Jama=2; Romeo i Julija=2; Dubravka=1; Ribanje i ribarsko prigovaranje/Ribanje=1;
      Seljačka buna=1; Čuvaj se senjske ruke=1; Kiklop=1; Na rubu pameti=1; Balade Petrice Kerempuha=1;
      Šuma Striborova=1; Mirisi, zlato i tamjan=1; Đuka Begović=1; Grička vještica=1; Tena=1; U registraturi=1;
      Smogovci=1; Veli Jože=1; Ježeva kućica=1; Na Drini ćuprija=1; Hamlet=1; Zločin i kazna=1;
      Junaci Pavlove ulice=1; Planine=0.6; Robinja=0.6; Suze sina razmetnoga=0.6; Diogenes=0.6; Prosjak Luka=0.6;
      Hrvatski bog Mars=0.6; Zastave=0.6; Banket u Blitvi=0.6; Regoč=0.6; Novela od Stanca=0.6; Skup=0.6; Mrtvi kapitali=0.6;
      Posljednji Stipančići=0.6; Svakidašnja jadikovka=0.6; Glorija=0.6; Proljeća Ivana Galeba=0.6; Dnevnik malog Perice=0.6;
      Uzbuna na Zelenom vrhu=0.6; Zagonetni dječak=0.6; Koko i duhovi=0.6; Nevidljiva Iva=0.6; Zlatni danci=0.6;
      Duh u močvari=0.6; Breza=0.6; Predstava Hamleta u selu Mrduša Donja=0.6; Lijepa naša/Horvatska domovina=0.6;
      Ana Karenjina=0.6; Kralj Edip=0.6; Antigona=0.6; Ilijada=0.6; Odiseja=0.6; Don Quijote=0.6; Stranac=0.6; Proces=0.6;
      Preobrazba=0.6; Starac i more=0.6; Lovac u žitu=0.6; Pipi Duga Čarapa=0.6; Emil i detektivi=0.6;
      Pustolovine Toma Sawyera/Tom Sawyer=0.6; Dnevnik Anne Frank=0.6; Orlovi rano lete=0.6; Božanstvena komedija=0.6;
      Kraljevo=0.3; U agoniji=0.3; Leda=0.3; Kći Lotršćaka=0.3; Davidijada=0.3; Prijan Lovro=0.3;
      Karanfil s pjesnikova groba=0.3; Fiškal=0.3; Kip domovine leta 188*/Kip domovine=0.3; Jesenje veče=0.3;
      Utjeha kose=0.3; Kolajna=0.3; Lelek sebra=0.3; Oblak=0.3; Balada iz predgrađa=0.3; Voćka poslije kiše=0.3;
      Preobraženja=0.3; Opomena=0.3; Isušena kaljuža=0.3; Ruke=0.3; Kratki izlet=0.3; More=0.3;
      Neprijatelj broj jedan=0.3; Lažeš, Melita=0.3; Mrvice iz dnevnog boravka=0.3; Zaboravljeni sin=0.3;
      Kako smo lomili noge=0.3; Kad bi drveće hodalo=0.3; Dobri duh Zagreba=0.3; Što je muškarac bez brkova=0.3;
      Sarajevski Marlboro=0.3; Mama Leone=0.3; Štefica Cvek u raljama života=0.3; Svoga tijela gospodar=0.3;
      Satir iliti divji čovik=0.3; Razgovor ugodni naroda slovinskoga=0.3; Urota zrinsko-frankopanska=0.3;
      Pod starim krovovima=0.3; Dubrovačka trilogija=0.3; Ekvinocij=0.3; Medvjed Brundo=0.3; Hrvatski Faust=0.3;
      Prosjaci i sinovi=0.3; Madame Bovary=0.3; Gospodar muha=0.3; Heidi=0.3; Robinson Crusoe=0.3; Pinokio=0.3;
      Alisa u zemlji čudesa=0.3; Faust=0.3; Rat i mir=0.3; Slika Doriana Graya=0.3; Plameni inkvizitori=0.2;
      Tirena=0.2; Grižula=0.2; Branka=0.2; Kletva=0.2; Baruničina ljubav=0.2; Tito Dorčić=0.2; Dva svijeta=0.2;
      Mora=0.2; Cvijet sa raskršća=0.2; Notturno=0.2; Mojsije=0.2; Iseljenik=0.2; Moj dom=0.2;
      Pobratimstvo lica u svemiru=0.2; Visoki jablani=0.2; Visoka žuta žita=0.2; Baraka Pet Be=0.2;
      Cvrčak pod vodopadom=0.2; Zore i vihori=0.2; Ljubav ili smrt=0.2; Ništa nas ne smije iznenaditi=0.2;
      Hotel Zagorje=0.2; Putnik=0.2; Rodu o jeziku=0.2; Olga i Lina=0.2; Propali dvori=0.2; Pustolov pred vratima=0.2;
      Bijeli jelen=0.2; Šarko=0.2; Tifusari=0.2; Bolja polovica hrabrosti=0.2; Djeca Božja=0.2; Čangi=0.2; Kandid=0.2;
      Braća Karamazovi=0.2; Revizor=0.2; Životinjska farma=0.2; Oliver Twist=0.2; Cvit razgovora=0.1;
      Vila Slovinka=0.1`,
  },
  {
    slug: "stranka",
    group: "hr",
    title: "Hrvatska politička stranka, danas ili nekad",
    hint: "Stranka, pokret ili koalicija, pod imenom ili kraticom",
    strip: ["stranka"],
    answers: `HDZ/Hrvatska demokratska zajednica=30; SDP/Socijaldemokratska partija=25; Možemo=8;
      Most/Most nezavisnih lista=8; Domovinski pokret/DP=5; HNS/Hrvatska narodna stranka=4;
      HSP/Hrvatska stranka prava=4; HSS/Hrvatska seljačka stranka/Hrvatska pučka seljačka stranka=4;
      HSLS/Hrvatska socijalno-liberalna stranka=3; IDS/Istarski demokratski sabor=3; Živi zid=3;
      SKH/Savez komunista Hrvatske/KPH/Komunistička partija Hrvatske=2; Stranka prava=2;
      HDSSB/Hrvatski demokratski savez Slavonije i Baranje=2; Laburisti/Hrvatski laburisti=1; Fokus=1; Centar=1;
      Pametno=1; HSU/Hrvatska stranka umirovljenika=1; SDSS/Samostalna demokratska srpska stranka=1;
      Hrvatski suverenisti/Suverenisti=1; Bandić Milan 365/Stranka rada i solidarnosti=1;
      ORaH/Održivi razvoj Hrvatske=1; HSP AS/HSP dr. Ante Starčević=1; Zagreb je naš=1;
      KPJ/SKJ/Komunistička partija Jugoslavije/Savez komunista Jugoslavije=1; Narodna stranka/Ilirska stranka=1;
      Hrvatsko-srpska koalicija=1; Reformisti=0.5; Nova ljevica=0.5; Radnička fronta=0.5; Hrast=0.5;
      Hrvatska konzervativna stranka/HKS=0.5; Glas=0.5; Nezavisna platforma Sjever/NPS=0.5;
      PGS/Primorsko-goranski savez=0.5; Mađaroni/Unionistička stranka=0.5; Frankovci/Čista stranka prava=0.5;
      Ustaše/Ustaški pokret=0.5; Hrvatski blok=0.3; HKDU=0.3; Libra=0.3; Demokratski centar/DC=0.3; HIP=0.3;
      Neovisni za Hrvatsku/NHR=0.3; Stranka s imenom i prezimenom=0.3; HDS/Hrvatska demokratska stranka=0.3;
      KNS/Koalicija narodnog sporazuma=0.3; SDS/Srpska demokratska stranka=0.3;
      Akcija socijaldemokrata Hrvatske/ASH=0.1`,
  },
];
