// Kategorije za seed. Format answers: "Kanonski/varijanta/varijanta=udio%; ..."
// Udio = procjena postotka igrača koji bi dali taj odgovor; stvarni podaci je s vremenom nadjačaju.
// Seed samo dodaje nove kategorije i odgovore, pa se stare kategorije proširuju kroz prosirenja.ts.
import { parseSeedAnswers } from "../../lib/matcher";
import { RARE_PRIOR } from "../../lib/scoring";
import { aliasi } from "./kategorije/aliasi";
import { dodaci } from "./kategorije/dodaci";
import { helikopter } from "./kategorije/helikopter";
import { hrKategorije } from "./kategorije/hr";
import { kvizKategorije } from "./kategorije/kviz";
import { opceKategorije } from "./kategorije/opce";
import { prosirenja } from "./kategorije/prosirenja";
import { wikipedija } from "./kategorije/wikipedija";
import { zaigranoKategorije } from "./kategorije/zaigrano";

export type SeedCategory = { slug: string; group: string; title: string; hint?: string; strip: string[]; answers: string };

// početne kategorije iz prototipa
const pocetne: SeedCategory[] = [
  { "slug":"otok","group":"hr","title":"Hrvatski otok","strip":["otok","otoku","otoka"],"answers":"Krk=22;Hvar=16;Brač=14;Korčula=8;Pag=7;Cres=5;Rab=4;Vis=4;Lošinj/Mali Lošinj/Veli Lošinj=3;Mljet=2.5;Lastovo=1.5;Šolta=1.5;Dugi otok=1.2;Ugljan=1;Pašman=0.8;Murter=0.8;Čiovo=0.7;Brijuni/Veliki Brijun/Brioni=0.7;Kornat/Kornati=0.6;Vir=0.5;Šipan=0.4;Lopud=0.4;Susak=0.4;Lokrum=0.4;Goli otok=0.3;Silba=0.3;Koločep=0.2;Unije=0.2;Ilovik=0.2;Iž=0.2;Prvić=0.2;Zlarin=0.25;Olib=0.15;Žirje=0.15;Krapanj=0.15;Biševo=0.15;Premuda=0.1;Molat=0.1;Kaprije=0.1;Palagruža=0.1;Badija=0.1;Galešnjak=0.1;Drvenik Veli/Drvenik=0.08;Rava=0.05;Ist=0.05;Vrgada=0.05;Sveti Grgur=0.05;Sveti Klement=0.05;Jabuka=0.03;Sušac=0.03;Zverinac=0.03;Sestrunj=0.03;Obonjan=0.03;Plavnik=0.03" },
  { "slug":"rijeka","group":"hr","title":"Rijeka u Hrvatskoj","strip":["rijeka","rijeku","reka"],"answers":"Sava=25;Drava=18;Dunav=15;Kupa=9;Neretva=6;Krka=5;Cetina=4;Una=3;Korana=2.5;Mrežnica=1.5;Dobra=1.2;Zrmanja=1.2;Mirna=1;Gacka=0.8;Lika=0.7;Mura=0.6;Rječina=0.6;Vuka=0.6;Bosut=0.5;Krapina=0.4;Sutla=0.4;Lonja=0.3;Glina=0.3;Ilova=0.2;Orljava=0.2;Bednja=0.2;Raša=0.2;Česma=0.15;Jadro=0.15;Ombla/Rijeka dubrovačka=0.1;Čikola=0.1;Slunjčica=0.1;Žrnovnica=0.08;Pakra=0.08;Karašica=0.08;Ruda=0.05;Guduča=0.05;Kupčina=0.05;Vučica=0.05;Ljuta=0.05;Trebež=0.03;Matica=0.03" },
  { "slug":"jelo","group":"hr","title":"Jelo iz hrvatske kuhinje","strip":[],"answers":"Sarma=10;Pašticada=9;Štrukli/Zagorski štrukli/Štruklji=8;Kulen/Kulin=6;Fiš paprikaš/Fiš/Riblji paprikaš=5;Čobanac=5;Peka/Ispod peke=5;Burek=4;Ćevapi/Ćevapčići/Ćevap=4;Punjene paprike/Punjena paprika=3.5;Grah/Varivo od graha=3;Brudet/Brodet/Brujet=3;Crni rižot/Crni rizot=3;Fritule/Fritole=2.5;Pršut=2.5;Kremšnita/Samoborska kremšnita=2;Purica s mlincima/Mlinci/Pura s mlincima=2;Sir i vrhnje/Sir vrhnje=1.5;Zagrebački odrezak=1.5;Rožata/Rozata=1.2;Soparnik/Zeljanica=1.2;Bakalar/Bakalar na bijelo=1.2;Paški sir=1;Maneštra/Menestra=1;Čvarci=1;Kobasice/Kobasica=1;Zagorska juha=0.8;Fuži=0.8;Buzara=0.8;Orahnjača/Orehnjača=0.8;Makovnjača=0.6;Krvavice/Krvavica=0.6;Mađarica=0.6;Krafne=0.5;Pljukanci=0.4;Gregada=0.4;Bučnica=0.4;Hladetina=0.4;Ajngemahtes=0.4;Kotlovina=0.3;Kroštule=0.3;Viška pogača=0.3;Komiška pogača=0.2;Zlevanka=0.2;Paprenjaci=0.2;Licitar=0.2;Japrak=0.2;Rafioli=0.15;Arambašići/Sinjski arambašići=0.15;Ličke pole/Lički krumpir=0.15;Visovačka begavica=0.03" },
  { "slug":"glazba","group":"hr","title":"Hrvatski pjevač ili bend","strip":["klapa","grupa","bend"],"answers":"Oliver Dragojević/Oliver/Dragojević=9;Gibonni/Zlatan Stipišić=8;Severina/Severina Vučković=7;Prljavo kazalište/Prljavo=5;Parni valjak=5;Thompson/Marko Perković=4;Tony Cetinski/Toni Cetinski/Cetinski=4;Mišo Kovač=3.5;Jelena Rozga/Rozga=3.5;Doris Dragović/Doris=3;Let 3/Let tri=3;Baby Lasagna=3;Massimo/Massimo Savić=2.5;Hladno pivo=2.5;Nina Badrić=2;Petar Grašo/Grašo=1.5;Arsen Dedić/Arsen=1.2;Josipa Lisac=1.2;Dino Dvornik=1.2;Magazin=1.2;Vatra=1;Psihomodo pop/Psihomodo=1;Tereza Kesovija/Tereza=0.8;Colonia=0.8;Azra=0.8;Daleka obala=0.8;Gabi Novak=0.6;Lana Jurčević=0.6;Jacques Houdek/Houdek=0.6;Miroslav Škoro/Škoro=0.6;TBF/The Beat Fleet=0.6;Mia Dimšić=0.6;Klapa Intrade/Intrade=0.5;Goran Karan=0.5;Pips Chips & Videoclips/Pips chips=0.5;Edo Maajka=0.5;Vinko Coce=0.4;Haustor=0.4;Vojko V=0.4;Grše=0.4;Elemental=0.4;Jinx=0.4;Lidija Bačić=0.4;Maja Šuput=0.4;Novi fosili=0.4;Klapa Cambi/Cambi=0.3;ET=0.3;Lollobrigida=0.3;Majke=0.3;Neno Belan=0.3;Kemal Monteno=0.3;Matija Cvek=0.3;Mile Kekin=0.3;Damir Kedžo=0.3;Indira Levak=0.3;Siniša Vuco=0.3;Zlatni dukati=0.3;Riva=0.3;Davor Radolfi=0.2;Vice Vukov=0.2;Ivo Robić=0.2;Krunoslav Slabinac/Kićo Slabinac/Kićo=0.2;Rasta=0.2;Albina=0.2;Franka=0.2;Marko Tolja=0.2;Ivana Banfić=0.2;Pavel=0.2;Film=0.2;Kuku$/Kukus=0.1" },
  { "slug":"klub","group":"hr","title":"Nogometni klub iz Hrvatske","strip":["nk","hnk","gnk","rnk","fc"],"answers":"Dinamo/Dinamo Zagreb=30;Hajduk/Hajduk Split=28;Rijeka=10;Osijek=8;Lokomotiva/Loko=3;Slaven Belupo/Slaven/Belupo=2.5;Istra 1961/Istra=2;Varaždin=2;Gorica=2;Šibenik=1.5;Zadar=1.2;Zagreb=1;Inter Zaprešić/Inter=0.8;Cibalia=0.8;Hrvatski dragovoljac/Dragovoljac=0.4;RNK Split/Split=0.4;Marsonia=0.3;Rudeš=0.3;Vukovar 1991/Vukovar=0.3;Sesvete=0.2;Dugopolje=0.2;Solin=0.2;Kustošija=0.2;Međimurje=0.2;Orijent/Orijent 1919=0.2;Pomorac=0.15;Segesta=0.15;Opatija=0.1;Bjelovar=0.1;Belišće=0.1;Jarun=0.1;Croatia Zmijavci/Zmijavci=0.1;Junak Sinj/Junak=0.1;Neretva=0.1;Uskok=0.05;Mladost Ždralovi=0.05;Zagorec=0.05;Primorac=0.05;HAŠK/Hašk=0.05;Trešnjevka=0.05;Grafičar=0.05;Jadran Poreč=0.03" },
  { "slug":"obala","group":"hr","title":"Grad ili mjesto na Jadranu","strip":["grad"],"answers":"Split=18;Rijeka=12;Zadar=10;Dubrovnik=10;Pula=7;Šibenik=6;Makarska=4;Rovinj=3.5;Opatija=3;Poreč=3;Trogir=2.5;Crikvenica=2;Omiš=2;Umag=1.5;Senj=1.5;Biograd na Moru/Biograd=1;Vodice=1;Primošten=1;Novi Vinodolski=0.8;Kaštela=0.8;Cavtat=0.8;Hvar=0.8;Baška Voda=0.6;Korčula=0.6;Krk=0.6;Novalja=0.6;Ploče=0.5;Novigrad=0.5;Nin=0.5;Brela=0.5;Orebić=0.5;Tučepi=0.4;Podgora=0.4;Ston=0.4;Rabac=0.4;Rogoznica=0.4;Mali Lošinj=0.4;Bol=0.4;Rab=0.4;Pag=0.4;Medulin=0.4;Gradac=0.3;Labin=0.3;Karlobag=0.3;Starigrad-Paklenica/Paklenica=0.3;Pakoštane=0.3;Supetar=0.3;Stari Grad=0.3;Vis=0.3;Komiža=0.3;Vrsar=0.3;Lovran=0.3;Pirovac=0.2;Tisno=0.2;Podstrana=0.2;Jelsa=0.2;Malinska=0.2;Punat=0.2;Fažana=0.2;Kraljevica=0.2;Bakar=0.2;Murter=0.2;Slano=0.15;Seget=0.1;Stobreč=0.1;Klek=0.1;Kostrena=0.1;Moščenička Draga=0.1;Sukošan=0.1;Tribunj=0.1;Zaostrog=0.1;Ičići=0.05;Jablanac=0.05;Petrčane=0.05;Drvenik=0.05;Molunat=0.03" },
  { "slug":"riba","group":"opce","title":"Riba ili morski plod","strip":[],"answers":"Srdela/Srdele/Sardina/Sardine=12;Orada/Komarča=10;Brancin/Lubin=10;Tuna/Tunj=9;Lignja/Lignje=8;Hobotnica=6;Škampi/Škamp/Škampa=5;Dagnje/Dagnja/Mušule/Mušula=5;Oslić/Mol=3;Skuša/Skuše=3;Šaran=3;Losos=3;Pastrva=2.5;Bakalar=2;Som=1.5;Štuka=1.5;Kamenice/Kamenica/Oštrige/Oštriga=1.5;Jastog=1.5;Sipa=1.5;Kozice/Kozica/Gambori=1.2;Zubatac=1;Inćun/Inćuni/Brgljun=0.8;Škarpina=0.8;Cipal=0.6;List=0.6;Hlap=0.5;Trlja/Barbun=0.5;Rak=0.5;Kovač=0.4;Girica=0.4;Palamida=0.4;Kirnja=0.4;Kapica/Jakovska kapica=0.4;Morski pas/Psina=0.4;Gof=0.3;Ugor=0.3;Murina=0.3;Raža=0.3;Arbun=0.3;Pagar=0.3;Ježinac/Ježinci=0.3;Rakovica=0.3;Smuđ=0.3;Šnjur=0.2;Fratar=0.2;Plavica=0.2;Prstaci/Prstac=0.2;Grdobina/Rana=0.2;Ušata=0.1;Salpa=0.1;Bukva=0.1;Iglica=0.1;Kokot=0.1;Linjak=0.1;Jesetra=0.1;Kunjka=0.05;Deverika=0.05;Klen=0.05;Kečiga=0.05" },
  { "slug":"voce","group":"opce","title":"Voće ili povrće","strip":[],"answers":"Jabuka/Jabuke=18;Banana/Banane=10;Kruška=6;Mrkva/Mrkve=5;Krumpir/Krompir/Kumpir=5;Rajčica/Paradajz/Pomidor/Pomidori=4;Naranča/Naranđa=4;Jagoda/Jagode=4;Šljiva=3;Grožđe=3;Lubenica=3;Krastavac=2;Paprika=2;Luk=2;Trešnja=2;Kupus=1.5;Breskva=1.5;Limun=1.5;Smokva=1.2;Marelica/Kajsija=1;Mandarina=1;Kivi=1;Ananas=1;Mango=0.8;Malina=0.8;Višnja=0.6;Blitva=0.6;Grašak=0.6;Kukuruz=0.6;Salata=0.6;Grah=0.5;Tikvica=0.5;Bundeva/Buča=0.5;Dinja=0.5;Patlidžan=0.4;Brokula=0.4;Špinat=0.4;Češnjak/Bijeli luk=0.4;Avokado=0.4;Borovnica=0.4;Kupina=0.4;Maslina=0.4;Cvjetača/Karfiol=0.3;Cikla=0.3;Nar/Šipak=0.3;Celer=0.2;Peršin=0.2;Rotkvica=0.2;Kokos=0.2;Dunja=0.2;Grejp/Grejpfrut=0.2;Mahune=0.2;Poriluk=0.15;Kaki=0.15;Ribiz=0.15;Šparoga/Šparoge=0.15;Repa=0.15;Rogač=0.1;Ogrozd=0.1;Brusnica=0.1;Kelj=0.1;Komorač/Koromač=0.1;Artičoka=0.1;Batat=0.1;Limeta=0.1;Leća=0.1;Rikola/Rukola=0.1;Radič=0.1;Mušmula=0.05;Papaja=0.05;Rabarbara=0.05;Pastrnjak=0.05;Kelj pupčar=0.05;Bob=0.05;Žižula=0.03;Liči=0.03" },
  { "slug":"glavni","group":"opce","title":"Europski glavni grad","strip":["grad"],"answers":"Pariz=15;London=10;Rim=10;Berlin=9;Beč=7;Madrid=6;Zagreb=5;Budimpešta=4;Ljubljana=3;Prag=3;Amsterdam=3;Atena=2.5;Lisabon=2;Beograd=2;Sarajevo=2;Bruxelles/Brisel/Brussels=1.5;Varšava=1.2;Kopenhagen=1;Stockholm/Stokholm=1;Oslo=1;Helsinki=0.8;Dublin=0.8;Moskva=0.8;Bern=0.6;Kijev/Kyiv=0.6;Podgorica=0.6;Bukurešt=0.5;Sofija=0.5;Skopje=0.5;Bratislava=0.5;Tirana=0.4;Reykjavik=0.3;Vilnius=0.2;Riga=0.2;Tallinn/Talin=0.2;Minsk=0.2;Luksemburg=0.2;Vatikan=0.2;Monako=0.15;Priština=0.15;Vaduz=0.1;San Marino=0.1;Andora/Andorra la Vella=0.1;Valletta/Valeta=0.1;Nikozija=0.1;Ankara=0.1;Kišinjev/Chisinau=0.05;Tbilisi=0.05;Erevan/Jerevan=0.03;Baku=0.03" },
  { "slug":"auto","group":"opce","title":"Marka automobila","strip":[],"answers":"Volkswagen/VW/Folcvagen/Folksvagen=14;BMW=10;Mercedes/Mercedes-Benz=10;Audi=9;Opel=6;Renault=5;Toyota=5;Škoda=5;Fiat=4;Peugeot/Pežo=4;Ford=4;Citroën=2.5;Tesla=2;Ferrari=2;Porsche=2;Kia=1.5;Hyundai=1.5;Dacia=1.5;Mazda=1.2;Lamborghini=1;Honda=1;Nissan=1;Seat/Cupra=1;Volvo=1;Rimac=1;Suzuki=0.8;Alfa Romeo/Alfa=0.6;Mitsubishi=0.5;Yugo/Zastava/Stojadin=0.5;Jeep=0.5;Lada=0.4;Land Rover/Range Rover=0.4;Bugatti=0.4;Jaguar=0.3;Maserati=0.3;Mini=0.3;Subaru=0.3;Chevrolet=0.3;Bentley=0.2;Rolls-Royce=0.2;Smart=0.2;Dodge=0.2;Cadillac=0.2;Lexus=0.2;Trabant/Trabi=0.2;Aston Martin=0.2;McLaren=0.15;Lancia=0.1;Saab=0.1;Daewoo=0.1;Wartburg=0.05;Lotus=0.05;BYD=0.05;Koenigsegg=0.05;Chrysler=0.05;Infiniti=0.03;Polestar=0.03;Pagani=0.03;Buick=0.03;Tatra=0.03;Moskvič=0.03;Rover=0.03" },
  { "slug":"zivotinja","group":"opce","title":"Životinja s farme ili iz šume","strip":[],"answers":"Pas=12;Mačka/Mače=10;Krava=8;Konj=6;Svinja/Prase=5;Lisica=4;Medvjed=4;Vuk=4;Zec=4;Kokoš/Kokoška=3.5;Ovca=3;Jelen=3;Koza=2.5;Srna=2;Vjeverica=1.5;Divlja svinja/Vepar=1.5;Jež=1.5;Sova=1;Patka=1;Guska=1;Magarac/Tovar=1;Ris=0.6;Miš=0.6;Puran/Tuka/Pura=0.5;Bik=0.5;Jazavac=0.4;Kuna=0.4;Orao=0.4;Krtica=0.3;Štakor=0.3;Žaba=0.3;Zmija=0.3;Tvor=0.2;Lasica=0.2;Djetlić=0.2;Jastreb=0.2;Šišmiš=0.2;Tele=0.2;Janje=0.2;Fazan=0.2;Golub=0.2;Puh=0.15;Vidra=0.15;Dabar=0.15;Mufljon=0.1;Divokoza=0.1;Jelen lopatar/Lopatar=0.1;Prepelica=0.1;Vol=0.1;Kornjača=0.1;Bizon=0.05;Mazga=0.05;Lane=0.05;Puž=0.05;Bivol=0.05" },
  { "slug":"instrument","group":"opce","title":"Glazbeni instrument","strip":[],"answers":"Gitara=22;Klavir=15;Bubnjevi/Bubanj=10;Violina=8;Tamburica/Tambura=6;Harmonika=5;Flauta=3;Saksofon=3;Truba=3;Bas gitara/Bas=1.5;Violončelo/Čelo=1.2;Harfa=1;Klarinet=1;Kontrabas=0.8;Mandolina=0.8;Sintesajzer/Klavijature/Synth=0.8;Ukulele=0.8;Usna harmonika=0.6;Orgulje=0.6;Trombon=0.5;Tuba=0.4;Ksilofon=0.4;Viola=0.3;Triangl=0.3;Gusle=0.3;Rog=0.2;Oboa=0.2;Fagot=0.2;Tamburin=0.2;Lijerica=0.2;Sopile=0.2;Bendžo/Banjo=0.2;Blok flauta/Blokflauta=0.2;Mih/Mišnice/Diple=0.15;Čembalo=0.1;Bongo=0.1;Kahon/Cajon=0.1;Gajde=0.1;Činele=0.1;Dvojnice=0.05;Bisernica/Prim=0.05;Bugarija/Kontra=0.05;Berda/Bajs=0.05;Sitar=0.05;Didgeridoo=0.05;Kastanjete=0.05;Marimba=0.05;Timpani/Timpane=0.05;Okarina=0.05;Lutnja=0.05;Citra=0.05;Vibrafon=0.03;Melodika=0.03;Pikolo=0.03;Čelesta=0.02;Bariton=0.02" },
  { "slug":"plaza","group":"zaigrano","title":"Nešto što se nosi na plažu","strip":[],"answers":"Ručnik/Peškir=20;Kupaći/Kupaći kostim/Kupaće=12;Krema za sunčanje/Krema/Zaštitni faktor/Faktor=10;Sunčane naočale/Naočale=8;Suncobran=7;Japanke/Šlape/Natikače=6;Voda=3;Šešir=3;Knjiga=2;Lopta=2;Madrac/Napuhavač=2;Ležaljka=1.5;Torba=1.5;Kapa=1.5;Mobitel=1.5;Maska/Ronilačka maska=1;Pivo=1;Peraje=0.8;Hladnjak/Ručni frižider=0.8;Gumenjaci/Gumene papuče=0.6;Sendvič/Sendviči=0.6;Prostirka/Deka=0.6;Dihalica=0.5;Hrana=0.5;Lubenica=0.5;Šlauf/Kolut=0.5;Zvučnik=0.4;Slušalice=0.3;Kanta/Kantica=0.3;Lopatica=0.3;Rukavići/Plovci=0.3;Karte=0.3;Picigin/Loptica za picigin=0.3;Pareo=0.3;Ulje za sunčanje=0.3;Grickalice/Čips=0.3;Sladoled=0.3;Frizbi=0.2;Novine=0.2;Fotoaparat/Kamera=0.2;Ruksak=0.2;After sun/Losion poslije sunčanja=0.2;Cigarete=0.2;Sat=0.1;Ogrtač=0.1;Termos=0.1;Dijete=0.1;Svekrva=0.03" },
  { "slug":"frizider","group":"zaigrano","title":"Nešto što imaš u frižideru","strip":[],"answers":"Mlijeko=20;Jaja/Jaje=10;Sir=10;Maslac/Puter=6;Pivo=5;Jogurt=5;Šunka=3;Voda=3;Kobasice/Hrenovke=2.5;Majoneza=2;Vrhnje/Kiselo vrhnje=2;Salata=1.5;Kečap=1.5;Ajvar=1.5;Sok=1.5;Meso=1.5;Vino=1.2;Senf=1;Salama=1;Pašteta=0.8;Piletina=0.8;Kiseli krastavci/Krastavci=0.6;Čokolada=0.6;Kefir=0.5;Mrkva=0.5;Coca-Cola/Cola/Koka kola=0.5;Rajčica=0.4;Limun=0.4;Torta=0.4;Svježi sir=0.4;Margarin=0.4;Pršut=0.4;Ostaci/Ostaci ručka=0.3;Kulen=0.3;Jabuke=0.3;Juha=0.3;Mineralna=0.3;Sladoled=0.3;Slanina/Panceta=0.3;Kvasac=0.2;Sarma=0.2;Riba=0.2;Masline=0.2;Mozzarella/Mocarela=0.2;Led=0.2;Puding=0.2;Ništa=0.2;Lijekovi=0.1;Žaruljica=0.1;Kapari=0.05;Tofu=0.05;Humus/Hummus=0.05;Lak za nokte=0.03" },
  { "slug":"psovka","group":"zaigrano","title":"Psovka bez psovke","hint":"Blaži izrazi, npr. „sto mu gromova”","strip":[],"answers":"Kvragu=15;Majku mu=8;Bokte/Bog te=6;Dovraga/Do vraga=6;Ajme/Ajme meni=5;Ma daj=3;Prokletstvo=3;Sunce ti=3;Kog vraga=2;Pas mater/Pas ti mater=2;Isuse=2;Bože moj=2;Jao=2;Sunce ti žarko=1.5;Bemti/Bem ti=1.5;Ma idi=1;Gospe moja/Gospe=1;Boga ti=1;Grom te spalio=0.8;Ma koji=0.8;Krasno=0.5;Šit=0.5;Fuj=0.4;Kruca/Kruca fiks=0.4;Uf=0.4;Opa=0.4;Vrag te odnio/Vrag te odnija=0.4;Uh=0.3;Ups=0.3;Ma nemoj=0.3;Jarca=0.3;Ajoj=0.3;Đava/Vrag=0.3;Ijuu=0.2;Ajde bok=0.2;Svetog mi=0.2;Sakramento=0.2;Porca miseria/Porka miserija=0.2;Fak=0.2;Himmel=0.1;Muke Isusove=0.1;Zemljo otvori se=0.05" },
  { "slug":"dijalekt","group":"zaigrano","title":"Dalmatinska ili kajkavska riječ","strip":[],"answers":"Fjaka=12;Kaj=12;Gušt=6;Pomidor=6;Balun=4;Ćakula/Ćakulati=3;Pjat=3;Kužina=3;Pirun=3;Tovar=3;Šugaman=3;Marenda=3;Kak=2;Hiža=2;Kušin=2;Mularija=2;Đir=2;Barba=2;Ćaća=1.5;Nono=1.5;Nona=1.5;Gemišt=1.5;Škovacera=1.5;Zakaj=1;Purger=1;Fruštuk/Fruštik=1;Šufit=1;Teća=1;Tić=1;Škaf=1;Bevanda=1;Japa/Japica=0.8;Šporko=0.8;Bedast=0.6;Cuker=0.6;Bonaca=0.6;Kantun=0.6;Kaleta=0.6;Ponistra=0.6;Štramac=0.6;Mona=0.6;Nevera=0.6;Šjor=0.6;Lumbrela=0.6;Lancun=0.5;Fletno=0.5;Tavaja=0.5;Feral=0.5;Gda=0.4;Fajn=0.4;Ofinger=0.4;Lešo=0.4;Žmul=0.4;Štagalj=0.3;Fertik=0.3;Ganc=0.3;Cajt=0.3;Vužgati/Vužgi=0.3;Pajcek=0.3;Šlafrok=0.3;Brokva=0.3;Tecija=0.3;Armerun=0.3;Bocun=0.3;Kmica=0.2;Žnora=0.2;Kala=0.2;Piškota=0.2;Dibot=0.2;Kotula=0.1" },
];

// najrjeđi nikad nije iznad ovoga, inače ne bi mogao do helikoptera (vidi tierFor)
const RARE_MAX = 0.3;

export const hrCategories: SeedCategory[] = [
  ...pocetne.map((c) => (prosirenja[c.slug] ? { ...c, answers: `${c.answers};${prosirenja[c.slug]}` } : c)),
  ...hrKategorije,
  ...opceKategorije,
  ...zaigranoKategorije,
  ...kvizKategorije,
].map(withDodaci).map(withAliasi).map(withWiki).map(withRare);

function format(list: ReturnType<typeof parseSeedAnswers>) {
  return list.map((a) => `${[a.canonical, ...a.variants].join("/")}=${a.share}${a.rare ? "!" : ""}`).join(";");
}

/** Dodatni odgovori iz dodaci.ts na kraj popisa. */
function withDodaci(c: SeedCategory): SeedCategory {
  return dodaci[c.slug] ? { ...c, answers: `${c.answers};${dodaci[c.slug]}` } : c;
}

/** Dodatni aliasi iz aliasi.ts za postojeće odgovore. */
function withAliasi(c: SeedCategory): SeedCategory {
  const m = aliasi[c.slug];
  if (!m) return c;
  const list = parseSeedAnswers(c.answers).map((a) => (m[a.canonical] ? { ...a, variants: [...a.variants, ...m[a.canonical].split("/")] } : a));
  return { ...c, answers: format(list) };
}

/** Udjeli dorađeni Wikipedia pregledima (wikipedija.ts) zamjenjuju ručne procjene. */
function withWiki(c: SeedCategory): SeedCategory {
  const shares = wikipedija[c.slug];
  if (!shares) return c;
  const list = parseSeedAnswers(c.answers).map((a) => (shares[a.canonical] ? { ...a, share: shares[a.canonical] } : a));
  return { ...c, answers: format(list) };
}

/** Označi najrjeđe odgovore iz helikopter.ts ("!" iza udjela); kojih još nema, dodaju se. */
function withRare(c: SeedCategory): SeedCategory {
  const names = helikopter[c.slug];
  if (!names) return c;
  const list = parseSeedAnswers(c.answers);
  for (const n of names) {
    const [canonical, ...variants] = n.split("/");
    const a = list.find((x) => x.canonical === canonical);
    if (a) Object.assign(a, { share: Math.min(a.share, RARE_MAX), rare: true });
    else list.push({ canonical, variants, share: RARE_PRIOR, rare: true });
  }
  return { ...c, answers: format(list) };
}
