// Nove kategorije grupe "Općenito".
import type { SeedCategory } from "../categories";

export const opceKategorije: SeedCategory[] = [
  {
    slug: "afrika",
    group: "opce",
    title: "Država u Africi",
    strip: ["drzava"],
    answers: `Egipat=14; Južnoafrička Republika/JAR/Južna Afrika=8; Nigerija=6; Kenija=6; Maroko=6; Alžir=4; Tunis=4;
      Libija=3; Etiopija=3; Gana=3; Kamerun=3; Senegal=3; Madagaskar=3; Obala Bjelokosti/Bjelokosna Obala=2;
      Somalija=2; Sudan=2; Tanzanija=2; Uganda=2; Ruanda=1.5; Angola=1.5; Zimbabve/Zimbabwe=1.5;
      Republika Kongo/Kongo=1.5; Demokratska Republika Kongo/DR Kongo/Zair=1; Mozambik=1; Zambija=1; Namibija=1;
      Bocvana/Botswana=1; Mali=1; Niger=1; Čad=1; Južni Sudan=0.5; Gabon=0.5; Gvineja=0.5; Liberija=0.5;
      Sijera Leone=0.5; Burkina Faso=0.5; Togo=0.5; Mauricijus=0.5; Sejšeli=0.5; Gvineja Bisau=0.3;
      Ekvatorska Gvineja=0.3; Benin=0.3; Mauritanija=0.3; Eritreja=0.3; Džibuti=0.3; Malavi=0.3; Lesoto=0.3;
      Esvatini/Svazi/Svazilend=0.3; Burundi=0.3; Srednjoafrička Republika=0.3;
      Zelenortska Republika/Zelenortski Otoci/Cabo Verde=0.3; Gambija=0.3; Komori=0.2;
      Sveti Toma i Princip/Sao Tome i Principe=0.1`,
  },
  {
    slug: "azija",
    group: "opce",
    title: "Država u Aziji",
    strip: ["drzava"],
    answers: `Kina=15; Japan=12; Indija=8; Tajland/Thailand=4; Južna Koreja/Koreja=4; Vijetnam=3; Sjeverna Koreja=2;
      Indonezija=2; Filipini=2; Iran=2; Saudijska Arabija=2; Turska=2; Malezija=1.5; Singapur=1.5; Pakistan=1.5;
      Afganistan=1.5; Irak=1.5; Ujedinjeni Arapski Emirati/UAE/Emirati=1.5; Katar=1.5; Izrael=1.5; Sirija=1;
      Mongolija=1; Nepal=1; Kazahstan=1; Rusija=1; Bangladeš=0.8; Šri Lanka=0.8; Kambodža=0.8; Jordan=0.8;
      Libanon=0.8; Tajvan=0.8; Butan=0.5; Mjanmar/Burma=0.5; Laos=0.5; Uzbekistan=0.5; Jemen=0.5; Oman=0.5;
      Kuvajt=0.5; Palestina=0.5; Gruzija=0.5; Armenija=0.5; Azerbajdžan=0.5; Maldivi=0.5; Turkmenistan=0.3;
      Kirgistan=0.3; Tadžikistan=0.3; Bahrein=0.3; Cipar=0.3; Brunej=0.2; Istočni Timor=0.2`,
  },
  {
    slug: "amerika",
    group: "opce",
    title: "Država u Sjevernoj ili Južnoj Americi",
    strip: ["drzava"],
    answers: `SAD/Amerika/Sjedinjene Američke Države=12; Brazil=12; Argentina=10; Kanada=8; Meksiko=8; Kuba=4; Čile=3;
      Kolumbija=3; Peru=2.5; Jamajka=2; Venezuela=2; Urugvaj=1.5; Ekvador=1; Bolivija=1; Paragvaj=1; Kostarika=1;
      Panama=1; Dominikanska Republika=0.8; Haiti=0.8; Bahami=0.8; Honduras=0.5; Gvatemala=0.5; Nikaragva=0.5;
      Salvador/El Salvador=0.5; Barbados=0.5; Trinidad i Tobago=0.5; Belize=0.3; Gvajana=0.3; Surinam=0.3;
      Grenada=0.2; Sveta Lucija=0.1; Dominika=0.1; Antigva i Barbuda=0.1; Sveti Kristofor i Nevis=0.1;
      Sveti Vincent i Grenadini=0.1`,
  },
  {
    slug: "svjetska-planina",
    group: "opce",
    title: "Planina ili vrh izvan Hrvatske",
    strip: ["planina", "planine", "vrh"],
    answers: `Mount Everest/Everest=20; Alpe=6; Himalaja=5; Kilimanjaro=5; Mont Blanc=5; Triglav=4; K2=3; Andi=2;
      Matterhorn=2; Olimp=2; Fuji/Fudži=2; Etna=2; Vezuv=2; Stjenjak/Stjenovite planine=1.5; Dolomiti=1.5;
      Durmitor=1.5; Elbrus=1; Aconcagua=1; Kavkaz=1; Pireneji=1; Karpati=1; Ural=1; Jahorina=1; Kopaonik=1;
      Bjelašnica=0.8; Denali/McKinley=0.5; Atlas=0.5; Apenini=0.5; Prokletije=0.5; Lovćen=0.5; Grossglockner=0.5;
      Ararat=0.5; Tatre=0.5; Šar planina=0.3; Igman=0.3; Vlašić=0.3; Rila=0.3; Zugspitze=0.3; Eiger=0.3;
      Annapurna=0.3; Ben Nevis=0.3; Sinaj=0.3; Mount Rushmore=0.3; Pirin=0.2; Musala=0.2; Kangchenjunga=0.2;
      Nanga Parbat=0.2; Stolna planina/Table Mountain=0.2; Krakatau=0.2; Lhotse=0.1; Makalu=0.1; Mount Kenya=0.1;
      Mauna Kea=0.1; Vinson=0.1; Kosciuszko=0.1; Maglić=0.2; Romanija=0.2; Zlatibor=0.3; Velež=0.2; Čvrsnica=0.2`,
  },
  {
    slug: "svjetska-rijeka",
    group: "opce",
    title: "Rijeka u svijetu",
    strip: ["rijeka", "reka"],
    answers: `Nil=15; Amazona=12; Dunav=8; Mississippi/Misisipi=5; Temza=5; Rajna=4; Sena=4; Volga=3; Sava=3; Jangce/Yangtze=2;
      Ganges/Ganga=2; Drina=2; Neretva=2; Drava=2; Tigris=1.5; Eufrat=1.5; Jordan=1; Mekong=1; Kongo=1;
      Kolorado/Colorado=1; Po=1; Tibar/Tiber=1; Morava=1; Bosna=1; Una=1; Tisa=1; Niger=0.5; Zambezi=0.5;
      Missouri=0.5; Rio Grande=0.5; Ind=0.5; Žuta rijeka/Huang He=0.5; Don=0.5; Dnjepar=0.5; Visla=0.5; Odra=0.5;
      Laba/Elba=0.5; Loire=0.5; Vardar=0.5; Vrbas=0.5; Mura=0.5; Soča=0.5; Hudson=0.3; Orinoco/Orinoko=0.3;
      Parana=0.3; Brahmaputra=0.3; Amur=0.3; Jenisej=0.3; Majna=0.3; Rona=0.3; Arno=0.3; Ljubljanica=0.3;
      Sveti Lovro=0.2; Jukon/Yukon=0.2; La Plata/Rio de la Plata=0.2; Lena=0.2; Ob=0.2; Ural=0.2; Dnjestar=0.2;
      Mosel/Moselle=0.2; Ebro=0.2; Tajo/Tejo=0.2; Inn=0.2; Limpopo=0.2; Mackenzie=0.1; Garonne=0.1; Douro=0.1;
      Shannon=0.1; Ibar=0.2; Lim=0.2; Tara=0.3; Timok=0.1; Marica=0.1`,
  },
  {
    slug: "pas",
    group: "opce",
    title: "Pasmina psa",
    strip: ["pas"],
    answers: `Labrador=10; Njemački ovčar/Vučjak=10; Dalmatiner=8; Zlatni retriver/Golden retriver=6; Pudla=4;
      Čivava/Chihuahua=4; Haski/Sibirski haski=4; Engleski buldog/Buldog/Bulldog=3; Francuski buldog=3;
      Rottweiler/Rotvajler=3; Jazavčar=3; Doberman=2.5; Pitbull/Pit bull=2.5; Bigl/Beagle=2; Tornjak=2;
      Jorkširski terijer/Yorkshire terijer/Jorki=2; Maltezer=2; Mops=2; Jack Russell=1.5; Bernardinac=1.5;
      Bokser=1.5; Mješanac/Avlijaner=1.5; Bernski planinski pas=1; Šnaucer=1; Shih Tzu/Šicu=1;
      Koker španijel/Koker=1; Njemačka doga/Doga=1; Hrt/Greyhound=1; Border koli/Border collie=1; Samojed=0.8;
      Akita=0.8; Pekinezer=0.8; Shiba Inu/Šiba=0.5; Mastif=0.5; Koli/Collie=0.5; Aljaški malamut/Malamut=0.5;
      Hrvatski ovčar=0.5; Šarplaninac=0.5; Cane corso=0.5; Bulterijer=0.5; Stafford/Staford=0.5;
      Velški korgi/Korgi/Corgi=0.5; Pomeranac=0.5; Belgijski ovčar/Malinois/Malinoa=0.5; Afganistanski hrt=0.3;
      Vižla=0.3; Weimaraner/Vajmarski ptičar=0.3; Pointer=0.3; Seter/Setter=0.3; Istarski gonič=0.3;
      Posavski gonič=0.3; Dogo argentino=0.3; Šar pej/Shar Pei=0.3; Čau čau/Chow chow=0.3; Baset/Basset=0.3;
      Australski ovčar=0.3; Newfoundland/Njufaundlender=0.3; Papiljon=0.2; Kavalir King Charles=0.2;
      Talijanski hrtić=0.1; Lhasa apso=0.1`,
  },
  {
    slug: "ptica",
    group: "opce",
    title: "Ptica",
    strip: [],
    answers: `Golub=10; Vrabac=8; Orao=7; Lastavica=5; Kos=4; Galeb=4; Sova=4; Papiga=4; Roda=3; Labud=3; Kokoš=3;
      Patka=3; Pingvin=3; Gavran=2; Vrana=2; Svraka=2; Djetlić=2; Sokol=2; Noj=2; Flamingo=2; Paun=2; Guska=1.5;
      Jastreb=1.5; Kanarinac=1.5; Kolibrić=1.5; Puran=1; Grlica=1; Fazan=1; Prepelica=1; Sjenica=1; Češljugar=1;
      Slavuj=1; Kukavica=1; Čaplja=1; Pelikan=1; Zeba=0.5; Tukan=0.5; Ždral=0.5; Kondor=0.5; Lešinar=0.5;
      Bjeloglavi sup/Sup=0.5; Ćuk=0.5; Crvendać=0.5; Čvorak=0.5; Albatros=0.3; Šojka/Kreja=0.3; Kraljić=0.3;
      Pupavac=0.3; Vodomar=0.3; Kormoran=0.3; Emu=0.3; Žuna=0.2; Vuga=0.2; Liska=0.2; Kivi=0.2; Ara=0.2;
      Kakadu=0.2; Tetrijeb=0.2; Jarebica=0.3; Šljuka=0.2; Drozd=0.3`,
  },
  {
    slug: "kukac",
    group: "opce",
    title: "Kukac ili pauk",
    strip: [],
    answers: `Mrav=12; Pčela=12; Komarac=8; Muha=8; Leptir=8; Bubamara=6; Osa=4; Pauk=4; Skakavac=3; Žohar=3;
      Cvrčak/Cikada=3; Bumbar=2; Stršljen=2; Bogomoljka=2; Vilin konjic=2; Moljac=1.5; Buha=1.5; Krpelj=1; Uš=1;
      Krijesnica=1; Gusjenica=1; Jelenak=0.8; Škorpion=0.5; Stjenica=0.5; Termit=0.5; Hrušt/Gundelj=0.5;
      Kornjaš=0.5; Krumpirova zlatica/Zlatica=0.5; Obad=0.5; Mušica=0.5; Svilena buba=0.3; Grinja=0.3; Rilaš=0.2;
      Strizibuba=0.2; Tarantula=0.3; Crna udovica=0.3; Skarabej=0.2`,
  },
  {
    slug: "africka-zivotinja",
    group: "opce",
    title: "Životinja koja živi u Africi",
    strip: [],
    answers: `Lav=15; Slon=10; Žirafa=10; Zebra=7; Nosorog=5; Nilski konj/Vodenkonj=5; Gepard=4; Leopard=3; Gorila=3;
      Krokodil=3; Majmun=2; Antilopa=2; Hijena=2; Gnu=1.5; Noj=1.5; Šimpanza=1.5; Deva=1.5; Afrički bivol/Bivol=1;
      Bradavičasta svinja/Facočer=1; Surikata/Merkat=1; Lemur=1; Gazela=1; Pavijan=1; Kameleon=0.5; Impala=0.5;
      Šakal=0.5; Kobra=0.5; Mamba/Crna mamba=0.5; Piton=0.5; Okapi=0.3; Mungos=0.3; Flamingo=0.3; Mandril=0.3;
      Hijenski pas/Divlji pas=0.3; Mravojed/Aardvark=0.3; Lešinar=0.3; Kudu=0.2; Oriks=0.2; Pangolin=0.2;
      Marabu=0.2; Karakal=0.2; Serval=0.2; Bongo=0.1`,
  },
  {
    slug: "morska-zivotinja",
    group: "opce",
    title: "Morska životinja koja nije riba",
    strip: [],
    answers: `Dupin=20; Kit=12; Hobotnica=8; Meduza=7; Rak=5; Morska zvijezda=5; Tuljan=4; Morska kornjača/Kornjača=4;
      Jastog=3; Lignja=3; Morski jež=3; Sipa=2; Školjka=2; Morž=2; Orka=2; Koralj=1.5; Morski lav=1.5; Pingvin=1.5;
      Dagnja=1; Kamenica=1; Spužva=1; Škamp=1; Narval=0.5; Morska vidra/Vidra=0.5; Morski krastavac/Trp=0.5;
      Vlasulja=0.5; Kozica=0.5; Galeb=0.5; Morski puž=0.3; Manati/Morska krava=0.3; Prstac=0.3; Jakobova kapica=0.3;
      Rakovica=0.3; Dugong=0.1`,
  },
  {
    slug: "cvijet",
    group: "opce",
    title: "Cvijet",
    strip: [],
    answers: `Ruža=20; Tulipan=10; Ljubičica/Ljubica=6; Margareta/Ivančica=5; Suncokret=5; Visibaba=4; Orhideja=4;
      Ljiljan=3; Karanfil=3; Lavanda=3; Maslačak=3; Krizantema=2; Jaglac=2; Narcis/Sunovrat=2; Đurđica=2; Mak=2;
      Tratinčica=2; Pelargonija/Muškatla=2; Perunika/Iris=1.5; Hortenzija=1.5; Jorgovan=1.5; Zumbul=1; Gerber=1;
      Kala=1; Jasmin=1; Magnolija=1; Ciklama=1; Božur=1; Neven=1; Kamilica=1; Oleandar/Oleander=1; Begonija=0.8;
      Gladiola=0.8; Mimoza=0.8; Lotos=0.5; Azaleja=0.5; Dalija=0.5; Runolist=0.5; Lokvanj=0.5; Šumarica/Anemona=0.5;
      Kukurijek=0.5; Bugenvilija=0.5; Petunija=0.5; Kamelija=0.3; Vrijes=0.3; Encijan=0.3; Frezija=0.3;
      Glicinija=0.3`,
  },
  {
    slug: "stablo",
    group: "opce",
    title: "Stablo",
    strip: ["stablo", "drvo"],
    answers: `Hrast=15; Bor=10; Bukva=6; Jela=5; Smreka=5; Lipa=5; Breza=5; Maslina=4; Jabuka=3; Kesten=3; Javor=3;
      Vrba=3; Topola=3; Jasen=2; Čempres=2; Palma=2; Orah=2; Trešnja=1.5; Smokva=1.5; Grab=1; Brijest/Brest=1;
      Platana=1; Bagrem=1; Dud=1; Kruška=1; Šljiva=1; Lovor=0.8; Joha/Jalša=0.5; Ariš=0.5; Tisa=0.5; Cedar=0.5;
      Baobab=0.5; Sekvoja=0.5; Eukaliptus=0.5; Ginko=0.5; Tuja=0.5; Lijeska/Ljeska=0.5; Divlji kesten=0.5;
      Limun=0.5; Naranča=0.5; Magnolija=0.3; Rogač=0.3; Glog=0.3; Bazga=0.3; Hrast lužnjak=0.3; Cer=0.2;
      Crnika=0.2; Plutnjak=0.1; Mandarina=0.2`,
  },
  {
    slug: "zacin",
    group: "opce",
    title: "Začin ili biljka za čaj",
    strip: ["caj"],
    answers: `Papar=12; Sol=8; Bosiljak=6; Peršin=6; Origano/Mravinac=5; Ružmarin=5; Paprika=5; Cimet=4;
      Lovor/Lovorov list=4; Češnjak/Bijeli luk=4; Metvica/Menta/Nana=4; Kamilica=3; Kadulja=3; Luk/Crveni luk=2;
      Majčina dušica/Timijan=2; Kurkuma=2; Đumbir=2; Vanilija=2; Kumin/Kim=1.5; Klinčići/Klinčić=1.5;
      Muškatni oraščić=1.5; Kopar=1.5; Čili/Feferoni=1.5; Curry/Kari=1.5; Lipa=1.5; Vlasac=1; Šafran=1; Lavanda=1;
      Matičnjak/Melisa=1; Vegeta=1; Šipak=0.8; Korijander/Korijandar=0.8; Celer=0.5; Gospina trava/Kantarion=0.5;
      Anis=0.5; Komorač=0.5; Hren=0.5; Senf/Gorušica=0.5; Kopriva=0.5; Estragon=0.3; Kardamom=0.3;
      Mažuran/Majoran=0.3; Stolisnik=0.3; Hibiskus=0.3; Bazga=0.3`,
  },
  {
    slug: "sport",
    group: "opce",
    title: "Sport",
    strip: [],
    answers: `Nogomet=20; Košarka=10; Tenis=8; Rukomet=7; Odbojka=5; Vaterpolo=5; Plivanje=3; Skijanje=3; Atletika=2;
      Boks=2; Hokej=2; Golf=1.5; Biciklizam=1.5; Formula 1/F1/Auto utrke=1.5; Šah=1.5; Stolni tenis/Ping pong=1.5;
      Badminton=1; Gimnastika=1; Judo=1; Karate=1; Taekwondo=1; Veslanje=1; Jedrenje=1; Trčanje=1;
      Mali nogomet/Futsal=1; Boćanje/Balote=1; Hrvanje=0.8; Ragbi=0.8; Bejzbol=0.8; Pikado=0.8; Biljar=0.8;
      Picigin=0.8; Kajak=0.5; Surfanje=0.5; Snowboard=0.5; Klizanje=0.5; Američki nogomet=0.5; Kriket=0.5;
      Kuglanje=0.5; Mačevanje=0.5; Streljaštvo=0.5; Konjički sport/Jahanje=0.5; Padel=0.5; Dizanje utega=0.5;
      MMA=0.5; Kik boks/Kickboxing=0.5; Rafting=0.3; Umjetničko klizanje=0.3; Streličarstvo=0.3; Triatlon=0.3;
      Curling=0.3; Biatlon=0.3; Skijaški skokovi=0.3; Sportsko penjanje/Penjanje=0.3; Ronjenje=0.3; Bob=0.2;
      Sankanje=0.2; Alpinizam=0.2; Polo=0.2; Softball=0.1; Lacrosse=0.1; Sumo=0.2; Squash=0.2; Skateboard=0.2`,
  },
  {
    slug: "strani-klub",
    group: "opce",
    title: "Nogometni klub izvan Hrvatske",
    strip: ["fc", "fk", "ac"],
    answers: `Real Madrid/Real=14; Barcelona/Barca=12; Bayern/Bayern München=6; Manchester United/Man Utd/United=6;
      Liverpool=5; Juventus/Juve=5; Milan/AC Milan=4; Inter/Inter Milan=4; Chelsea=3; Arsenal=3;
      Manchester City/City=3; PSG/Paris Saint-Germain=3; Borussia Dortmund/Dortmund=2; Atlético Madrid/Atletico=1.5;
      Ajax=1.5; Crvena zvezda/Zvezda=1.5; Roma=1; Napoli=1; Benfica=1; Porto=1; Tottenham/Spurs=1; Partizan=1;
      Lazio=0.5; Sporting=0.5; Celtic=0.5; Zrinjski=0.5; Galatasaray=0.5; Sevilla=0.5; Valencia=0.5;
      Bayer Leverkusen/Leverkusen=0.5; Schalke=0.5; Marseille=0.5; Newcastle=0.5; Fiorentina=0.5;
      Boca Juniors/Boca=0.5; Inter Miami=0.5; Rangers=0.3; Željezničar=0.3; Sarajevo=0.3; Velež=0.3; Olimpija=0.3;
      Maribor=0.3; Fenerbahçe=0.3; Olympiakos=0.3; RB Leipzig/Leipzig=0.3; Wolfsburg=0.3; Hamburg/HSV=0.3;
      Monaco=0.3; Lyon=0.3; Aston Villa=0.3; Everton=0.3; West Ham=0.3; Atalanta=0.3; PSV=0.3; Feyenoord=0.3;
      Salzburg=0.3; River Plate=0.3; Al Nassr=0.3; Beşiktaş=0.2; Panathinaikos=0.2; Villarreal=0.2;
      Real Sociedad=0.2; Athletic Bilbao=0.2; Eintracht Frankfurt=0.2; Stuttgart=0.2; Leeds=0.2; Torino=0.2;
      Anderlecht=0.2; Club Brugge=0.2; Rapid Beč/Rapid=0.2; Basel=0.2; Šahtar/Shakhtar=0.2; Dinamo Kijev=0.2;
      CSKA=0.2; Spartak=0.2; Zenit=0.2; Flamengo=0.2; Santos=0.2; LA Galaxy=0.2; Borac Banja Luka/Borac=0.1;
      Široki Brijeg=0.1`,
  },
  {
    slug: "jezik",
    group: "opce",
    title: "Jezik",
    strip: ["jezik"],
    answers: `Engleski=20; Njemački=12; Talijanski=7; Francuski=7; Španjolski=7; Hrvatski=6; Ruski=4;
      Kineski/Mandarinski=3; Japanski=2; Arapski=2; Portugalski=2; Latinski=2; Slovenski=1.5; Srpski=1.5;
      Mađarski=1.5; Češki=1; Poljski=1; Grčki=1; Turski=1; Nizozemski/Holandski=1; Slovački=0.8; Švedski=0.8;
      Bosanski=0.5; Albanski=0.5; Makedonski=0.5; Bugarski=0.5; Rumunjski=0.5; Ukrajinski=0.5; Norveški=0.5;
      Danski=0.5; Finski=0.5; Hebrejski=0.5; Hindi=0.5; Korejski=0.5; Svahili=0.5; Esperanto=0.5; Islandski=0.3;
      Irski=0.3; Starogrčki=0.3; Perzijski/Farsi=0.3; Romski=0.3; Baskijski=0.3; Katalonski=0.3;
      Znakovni jezik=0.3; Vijetnamski=0.2; Tajlandski=0.2; Indonezijski=0.2; Estonski=0.2; Litavski=0.2;
      Latvijski=0.2; Crnogorski=0.2; Velški=0.1; Bjeloruski=0.1; Gruzijski=0.1; Armenski=0.1; Kurdski=0.1;
      Urdu=0.1; Bengalski=0.1; Mongolski=0.1; Zulu=0.1; Klingonski=0.1; Staroslavenski=0.2`,
  },
  {
    slug: "zanimanje",
    group: "opce",
    title: "Zanimanje",
    strip: [],
    answers: `Liječnik/Doktor/Doktorica/Liječnica=12; Učitelj/Učiteljica=8; Policajac/Policajka=6; Vatrogasac=5;
      Konobar/Konobarica=4; Kuhar/Kuharica=4; Zidar=3; Programer/Programerka=3; Inženjer=3; Odvjetnik/Odvjetnica=3;
      Medicinska sestra/Sestra/Medicinski tehničar=3; Pilot=2; Vozač=2; Prodavač/Prodavačica=2; Frizer/Frizerka=2;
      Stolar=2; Električar=2; Vodoinstalater=2; Profesor/Profesorica=2; Mesar=1.5; Pekar=1.5; Poštar=1.5;
      Novinar/Novinarka=1.5; Glumac/Glumica=1.5; Zubar/Stomatolog=1.5; Poljoprivrednik/Seljak=1.5;
      Automehaničar/Mehaničar=1.5; Pjevač/Pjevačica=1; Ljekarnik/Farmaceut=1; Arhitekt=1; Ekonomist=1; Računovođa=1;
      Vojnik=1; Mornar/Pomorac=1; Ribar=1; Veterinar=1; Bankar=0.5; Krojač=0.5; Postolar=0.5; Dimnjačar=0.5;
      Smetlar=0.5; Čistačica=0.5; Soboslikar/Ličilac=0.5; Vrtlar=0.5; Psiholog=0.5; Sudac=0.5; Svećenik=0.5;
      Taksist=0.5; Fotograf=0.5; Dizajner=0.5; Slikar=0.5; Glazbenik=0.5; Znanstvenik=0.5; Barmen=0.5;
      Tesar=0.3; Limar=0.3; Bravar=0.3; Keramičar=0.3; Knjižničar=0.3; Trener=0.3; Astronaut=0.3; Kemičar=0.3;
      Političar=0.3; Influencer=0.3; Turistički vodič=0.3; Kirurg=0.3; Kozmetičarka=0.3; Kondukter=0.2;
      Biolog=0.2; Fizičar=0.2; Matematičar=0.2; Recepcioner=0.2; Spasilac=0.2; Primalja=0.2; Model=0.2;
      Sobarica=0.2; Dadilja=0.2; Notar/Javni bilježnik=0.2; Diplomat=0.1; Kapetan=0.2`,
  },
  {
    slug: "bolest",
    group: "opce",
    title: "Bolest ili zdravstvena tegoba",
    strip: [],
    answers: `Gripa=15; Prehlada=10; Korona/COVID/Covid-19/Koronavirus=8; Rak/Karcinom=6; Dijabetes/Šećerna bolest/Šećer=5;
      Upala pluća/Pneumonija=3; Angina=3; Vodene kozice/Kozice=3; Ospice=2; Astma=2; Alergija=2;
      Migrena/Glavobolja=2; Visoki tlak/Hipertenzija/Tlak=2; Infarkt/Srčani udar=2; Zaušnjaci=1.5;
      Tuberkuloza/TBC=1.5; Kuga=1.5; AIDS/HIV/Sida=1.5; Rubeola=1; Kolera=1; Malarija=1; Hepatitis/Žutica=1;
      Moždani udar/Inzult=1; Alzheimer/Alzheimerova bolest=1; Upala grla=1; Proljev/Dijareja=1; Bronhitis=1;
      Kašalj=1; Parkinson/Parkinsonova bolest=0.5; Upala uha=0.5; Tetanus=0.5; Bjesnoća=0.5; Boginje=0.5;
      Šarlah=0.5; Hemoroidi/Šuljevi=0.5; Sinusitis=0.5; Depresija=0.5; Reuma/Reumatizam=0.5; Mononukleoza=0.5;
      Upala slijepog crijeva/Apendicitis=0.5; Mamurluk=0.5; Temperatura/Groznica=0.5; Demencija=0.3; Lepra/Guba=0.3;
      Ebola=0.3; Hripavac=0.3; Difterija=0.3; Dječja paraliza/Polio=0.3; Cistitis=0.3; Gastritis=0.3; Čir=0.3;
      Anemija/Slabokrvnost=0.3; Artritis=0.3; Giht/Kostobolja=0.3; Epilepsija=0.3; Leukemija=0.3; Herpes=0.3;
      Akne=0.3; Borelioza/Lajmska bolest=0.3; Kila=0.2; Osteoporoza=0.2; Skolioza=0.2; Ekcem=0.2; Psorijaza=0.2;
      Celijakija=0.2; Salmoneloza=0.2; Šuga/Svrab=0.2; Konjunktivitis=0.2; Lumbago/Išijas=0.3; Kamenac/Bubrežni kamenac=0.2`,
  },
  {
    slug: "dio-tijela",
    group: "opce",
    title: "Dio tijela",
    strip: [],
    answers: `Ruka=12; Noga=10; Glava=8; Oko/Oči=6; Nos=5; Uho/Uši=4; Srce=4; Usta=3; Prst=3; Koljeno=2; Vrat=2;
      Trbuh=2; Leđa=2; Lakat=1.5; Rame=1.5; Kosa=1.5; Zub/Zubi=1.5; Jezik=1.5; Stopalo=1.5; Mozak=1.5; Pluća=1.5;
      Usne/Usna=1; Brada=1; Prsa/Grudi=1; Pupak=1; Šaka=1; Nokat=1; Jetra=1; Bubreg/Bubrezi=1; Želudac=1; Koža=1;
      Čelo=0.8; Peta=0.8; Dlan=0.8; Stražnjica/Guza=0.8; Kralježnica/Kičma=0.8; Obrve/Obrva=0.5;
      Trepavice/Trepavica=0.5; Obraz=0.5; Palac=0.5; Gležanj=0.5; Kuk=0.5; Bedro=0.5; Crijeva/Crijevo=0.5;
      Rebra/Rebro=0.5; Lubanja=0.5; Kost=0.5; Mišić=0.5; Krv=0.5; Grlo=0.5; Lisna kost/List=0.3; Zapešće=0.3;
      Pazuh=0.3; Slezena=0.3; Gušterača=0.3; Vena=0.3; Trtica=0.3; Lopatica=0.3; Krajnici/Mandule=0.3;
      Potkoljenica=0.2; Žučni mjehur/Žuč=0.2; Mokraćni mjehur=0.2; Arterija=0.2; Živac=0.2; Grkljan=0.2;
      Dušnik=0.2; Jednjak=0.2; Ključna kost=0.2; Zjenica=0.2; Šarenica=0.2; Nosnica=0.2; Desni=0.2;
      Slijepo crijevo=0.2; Ušna resica=0.1; Nepce=0.1; Prostata=0.1; Maternica=0.1; Jajnik=0.1; Dijafragma/Ošit=0.1;
      Štitnjača=0.2; Bradavica=0.1; Sljepoočnica=0.1`,
  },
  {
    slug: "valuta",
    group: "opce",
    title: "Valuta, nekad ili danas",
    strip: [],
    answers: `Euro=20; Dolar/Američki dolar=15; Kuna=10; Funta=5; Franak/Švicarski franak=4; Jen=3; Rubalj=3;
      Dinar=3; Konvertibilna marka/Marka/KM=3; Lira=2; Juan/Renminbi=1.5; Forinta=1.5; Kruna=1.5; Bitcoin=1.5;
      Rupija=1; Zlot=1; Pezo=1; Lev=0.5; Lej/Leu=0.5; Real=0.5; Von/Won=0.5; Dirham=0.5; Tolar=0.5; Drahma=0.5;
      Pezeta=0.5; Njemačka marka/DM=0.5; Rand=0.3; Šekel=0.3; Rijal=0.3; Šiling=0.3; Escudo=0.2; Gulden=0.2;
      Hrivnja=0.2; Baht/Bat=0.2; Ringit=0.1; Tenge=0.1; Lari=0.1; Dram=0.1; Naira=0.1; Dukat=0.3; Florin=0.2;
      Talir=0.2; Groš=0.2`,
  },
  {
    slug: "grad-njemacka",
    group: "opce",
    title: "Grad u Njemačkoj",
    strip: ["grad"],
    answers: `Berlin=18; München/Minhen=12; Hamburg=8; Frankfurt=7; Köln/Keln=6; Stuttgart=5; Dortmund=4;
      Düsseldorf/Diseldorf=3; Dresden=3; Leipzig/Lajpcig=3; Hannover/Hanover=2; Bremen=2; Nürnberg/Nirnberg=2;
      Bonn=1.5; Essen=1; Heidelberg=0.8; Duisburg=0.5; Bochum=0.5; Gelsenkirchen=0.5; Wolfsburg=0.5;
      Ingolstadt=0.5; Augsburg=0.5; Regensburg=0.5; Freiburg=0.5; Mannheim=0.5; Karlsruhe=0.5; Mainz=0.5;
      Potsdam=0.5; Leverkusen=0.5; Wiesbaden=0.3; Aachen=0.3; Münster=0.3; Bielefeld=0.3; Kiel=0.3; Lübeck=0.3;
      Rostock=0.3; Magdeburg=0.3; Erfurt=0.3; Weimar=0.3; Ulm=0.3; Kaiserslautern=0.3; Mönchengladbach=0.3;
      Jena=0.2; Kassel=0.2; Göttingen=0.2; Trier=0.2; Koblenz=0.2; Würzburg=0.2; Bamberg=0.2; Passau=0.2;
      Rosenheim=0.2; Garmisch-Partenkirchen/Garmisch=0.2; Wuppertal=0.2; Saarbrücken=0.2; Chemnitz=0.2;
      Braunschweig=0.2; Sindelfingen=0.2; Konstanz=0.2; Bayreuth=0.1; Halle=0.1; Oldenburg=0.1; Osnabrück=0.1;
      Heilbronn=0.1; Pforzheim=0.1; Offenbach=0.1; Darmstadt=0.1; Hoffenheim=0.1`,
  },
  {
    slug: "grad-italija",
    group: "opce",
    title: "Grad u Italiji",
    strip: ["grad"],
    answers: `Rim/Roma=15; Milano/Milan=10; Venecija/Venezia=8; Firenca/Firenze=6; Napulj/Napoli=5; Torino/Turin=4;
      Trst/Trieste=4; Bologna=2; Verona=2; Pisa=2; Genova/Đenova=2; Palermo=2; Bari=1; Udine=1; Padova/Padua=1;
      Ancona=1; Rimini=1; Siena=0.8; Pescara=0.5; Como=0.5; Bergamo=0.5; Brescia=0.5; Parma=0.5; Modena=0.5;
      Catania=0.5; Messina=0.3; Cagliari=0.3; Salerno=0.3; Perugia=0.3; Livorno=0.3; Ravenna=0.3; Treviso=0.3;
      Trento=0.3; Sanremo=0.3; Monza=0.3; Amalfi=0.3; Pompeji=0.3; Lignano=0.3; Jesolo=0.3; Taranto=0.2;
      Lecce=0.2; Brindisi=0.2; Assisi=0.2; Lucca=0.2; Ferrara=0.2; Vicenza=0.2; Bolzano=0.2; Gorizia=0.2;
      La Spezia=0.2; Sorrento=0.2; Bibione=0.2; Sassari=0.1; Cremona=0.1; Mantova/Mantua=0.1; Pavia=0.1;
      Reggio Calabria=0.1; Foggia=0.1; Matera=0.1; Sirakuza/Siracusa=0.1; Palmanova=0.1; Maranello=0.2`,
  },
  {
    slug: "grad-sad",
    group: "opce",
    title: "Grad u SAD-u",
    strip: ["grad"],
    answers: `New York/Njujork/NY=18; Los Angeles/LA=10; Chicago/Čikago=6; Miami/Majami=5; Las Vegas/Vegas=5;
      San Francisco=4; Washington/Vašington=4; Boston=3; Houston=2; Dallas=2; Seattle/Sijetl=2; Detroit=1.5;
      Philadelphia/Filadelfija=1.5; New Orleans=1.5; San Diego=1; Atlanta=1; Phoenix=1; Denver=1; Orlando=1;
      Pittsburgh=0.8; Nashville=0.5; Memphis=0.5; Austin=0.5; Cleveland=0.5; Baltimore=0.5; Minneapolis=0.5;
      St. Louis/Saint Louis=0.5; San Antonio=0.5; Kansas City=0.3; Indianapolis=0.3; Milwaukee=0.3;
      Salt Lake City=0.3; Portland=0.3; Sacramento=0.3; Honolulu=0.3; Anchorage=0.2; Charlotte=0.2; Tampa=0.2;
      Oklahoma City=0.2; Cincinnati=0.2; Buffalo=0.2; Albuquerque=0.2; Beverly Hills=0.2; San Jose=0.2;
      Oakland=0.2; Tucson=0.1; El Paso=0.1; Jacksonville=0.1; Columbus=0.1; Princeton=0.1; Malibu=0.1;
      Palo Alto=0.1; Newark=0.1; Atlantic City=0.1; Key West=0.1; Hollywood=0.3`,
  },
  {
    slug: "otok-svijet",
    group: "opce",
    title: "Otok izvan Hrvatske",
    strip: ["otok", "otoci"],
    answers: `Island=6; Grenland=6; Sicilija=6; Kreta=4; Bali=4; Havaji=4; Sardinija=3; Korzika=3; Cipar=3; Malta=3;
      Madagaskar=3; Maldivi=3; Mallorca/Majorka=3; Ibiza=3; Tenerife=2; Velika Britanija=2; Irska=2; Kuba=2;
      Santorini=2; Jamajka=1.5; Krf=1.5; Kanarski otoci/Kanari=1; Japan=1; Šri Lanka=1; Tajvan=1; Novi Zeland=1;
      Mikonos=1; Rodos=1; Capri=1; Zakintos=0.8; Tasmanija=0.5; Borneo=0.5; Sumatra=0.5; Java=0.5; Elba=0.5;
      Sejšeli=0.5; Mauricijus=0.5; Zanzibar=0.5; Tahiti=0.5; Bora Bora=0.5; Galapagos=0.5; Uskršnji otok=0.5;
      Bahami=0.5; Madeira=0.5; Nova Gvineja=0.3; Filipini=0.3; Kefalonija=0.3; Lezbos=0.3; Kos=0.3; Ischia=0.3;
      Fidži=0.3; Barbados=0.3; Portoriko=0.3; Manhattan=0.3; Phuket=0.3; Azori=0.3; Gran Canaria=0.3;
      Lanzarote=0.3; Alcatraz=0.2; Svalbard=0.2; Farski otoci=0.2; Sveta Helena=0.2; Fuerteventura=0.2;
      Menorca=0.2; Hokaido=0.1; Sahalin=0.1; Thassos/Tasos=0.3`,
  },
  {
    slug: "tenis",
    group: "opce",
    title: "Tenisač ili tenisačica",
    strip: [],
    answers: `Novak Đoković/Đoković/Nole=12; Roger Federer/Federer=10; Rafael Nadal/Nadal/Rafa=10;
      Goran Ivanišević/Ivanišević=5; Serena Williams/Serena=4; Marin Čilić/Čilić=3; Carlos Alcaraz/Alcaraz=3;
      Andy Murray/Murray=2; Jannik Sinner/Sinner=2; Pete Sampras/Sampras=1.5; Andre Agassi/Agassi=1.5;
      Maria Šarapova/Šarapova/Sharapova=1.5; Boris Becker/Becker=1; Steffi Graf/Graf=1; Monica Seles/Seles=1;
      Iva Majoli/Majoli=1; Borna Ćorić/Ćorić=1; Venus Williams/Venus=0.8; Martina Navratilova/Navratilova=0.8;
      Björn Borg/Borg=0.8; Donna Vekić/Vekić=0.8; John McEnroe/McEnroe=0.5; Daniil Medvedev/Medvedev=0.5;
      Alexander Zverev/Zverev=0.5; Ivan Ljubičić/Ljubičić=0.5; Ivo Karlović/Karlović=0.5; Iga Świątek/Swiatek=0.5;
      Ana Ivanović/Ivanović=0.5; Ivan Lendl/Lendl=0.3; Stefan Edberg/Edberg=0.3; Stan Wawrinka/Wawrinka=0.3;
      Dominic Thiem/Thiem=0.3; Juan Martin del Potro/Del Potro=0.3; Mario Ančić/Ančić=0.3; Petra Martić=0.3;
      Ana Konjuh/Konjuh=0.3; Mirjana Lučić=0.3; Mate Pavić=0.3; Nikola Mektić=0.3; Aryna Sabalenka/Sabalenka=0.3;
      Coco Gauff/Gauff=0.3; Naomi Osaka/Osaka=0.3; Simona Halep/Halep=0.3; Martina Hingis/Hingis=0.3;
      Jelena Janković/Janković=0.3; Nick Kyrgios/Kyrgios=0.3; Stefanos Tsitsipas/Tsitsipas=0.3;
      Andy Roddick/Roddick=0.3; Marat Safin/Safin=0.3; Thomas Muster/Muster=0.2; Kei Nishikori/Nishikori=0.2;
      Caroline Wozniacki/Wozniacki=0.2; Kim Clijsters/Clijsters=0.2; Lleyton Hewitt/Hewitt=0.2; Rod Laver/Laver=0.2;
      Arthur Ashe/Ashe=0.2; Jimmy Connors/Connors=0.2; Grigor Dimitrov/Dimitrov=0.2; Justine Henin/Henin=0.1;
      Janko Tipsarević/Tipsarević=0.1; Viktor Troicki/Troicki=0.1; Holger Rune/Rune=0.1; Gael Monfils/Monfils=0.1;
      Jo-Wilfried Tsonga/Tsonga=0.1; Gustavo Kuerten/Kuerten=0.1; Billie Jean King=0.1; Chris Evert/Evert=0.1;
      Jelena Dokić/Dokić=0.1; Tim Henman/Henman=0.1; Elena Rybakina/Rybakina=0.1; Emma Raducanu/Raducanu=0.1;
      Ilie Nastase/Nastase=0.1; Taylor Fritz/Fritz=0.1; Casper Ruud/Ruud=0.1`,
  },
  {
    slug: "nogometas",
    group: "opce",
    title: "Nogometaš izvan Hrvatske",
    hint: "Bilo koji strani nogometaš, nekad ili danas",
    strip: [],
    answers: `Lionel Messi/Messi/Leo Messi=16; Cristiano Ronaldo/Ronaldo/CR7=14; Kylian Mbappé/Mbappe=4;
      Erling Haaland/Haaland=3; Neymar=3; Zlatan Ibrahimović/Zlatan/Ibrahimović=3; Pelé/Pele=3;
      Diego Maradona/Maradona=3; Zinedine Zidane/Zidane=2; Ronaldinho=2; David Beckham/Beckham=2;
      Robert Lewandowski/Lewandowski=1.5; Mohamed Salah/Salah=1.5; Lamine Yamal/Yamal=1.5; Kaká/Kaka=1;
      Thierry Henry/Henry=1; Wayne Rooney/Rooney=1; Kevin De Bruyne/De Bruyne=1; Harry Kane/Kane=1;
      Jude Bellingham/Bellingham=1; Vinícius Júnior/Vinicius=1; Andrés Iniesta/Iniesta=1; Xavi=1;
      Sergio Ramos/Ramos=1; Gianluigi Buffon/Buffon=1; Edin Džeko/Džeko=1; Ronaldo Nazário/R9=1;
      Paolo Maldini/Maldini=0.8; Francesco Totti/Totti=0.8; Andrea Pirlo/Pirlo=0.8; Luis Suárez/Suarez=0.8;
      Gerard Piqué/Pique=0.5; Iker Casillas/Casillas=0.5; Alessandro Del Piero/Del Piero=0.5;
      Roberto Baggio/Baggio=0.5; Johan Cruyff/Cruyff=0.5; Franz Beckenbauer/Beckenbauer=0.5; Manuel Neuer/Neuer=0.5;
      Thomas Müller/Müller=0.5; Toni Kroos/Kroos=0.5; Antoine Griezmann/Griezmann=0.5; Karim Benzema/Benzema=0.5;
      Paul Pogba/Pogba=0.5; Didier Drogba/Drogba=0.5; Samuel Eto'o/Etoo=0.5; Roberto Carlos=0.5;
      Gerd Müller=0.3; Michel Platini/Platini=0.3; Marco van Basten/Van Basten=0.3; Lothar Matthäus/Matthäus=0.3;
      Oliver Kahn/Kahn=0.3; Edinson Cavani/Cavani=0.3; N'Golo Kanté/Kante=0.3; Frank Lampard/Lampard=0.3;
      Steven Gerrard/Gerrard=0.3; Eric Cantona/Cantona=0.3; Andrij Ševčenko/Ševčenko/Shevchenko=0.3;
      Luís Figo/Figo=0.3; Raúl/Raul=0.3; Fernando Torres/Torres=0.3; Arjen Robben/Robben=0.3;
      Franck Ribéry/Ribery=0.3; Virgil van Dijk/Van Dijk=0.3; Son Heung-min/Son=0.3; Miralem Pjanić/Pjanić=0.3;
      Dušan Vlahović/Vlahović=0.3; Romário/Romario=0.3; Rivaldo=0.3; Ferenc Puskás/Puskas=0.3;
      Ruud Gullit/Gullit=0.2; Eusébio/Eusebio=0.2; George Best/Best=0.2; Bobby Charlton/Charlton=0.2;
      Ryan Giggs/Giggs=0.2; Siniša Mihajlović/Mihajlović=0.2; Cafu=0.2; Marcelo=0.2; Hristo Stoičkov/Stoičkov=0.2;
      Gheorghe Hagi/Hagi=0.2; Paul Scholes/Scholes=0.1; David Villa=0.1; Wesley Sneijder/Sneijder=0.1;
      Robin van Persie/Van Persie=0.1; Dejan Stanković=0.1; Dragan Stojković/Piksi=0.1; Lav Jašin/Jašin=0.1;
      Alfredo Di Stéfano/Di Stefano=0.1; Bukayo Saka/Saka=0.2; Pedri=0.2; Gavi=0.1`,
  },
  {
    slug: "gmaz",
    group: "opce",
    title: "Gmaz ili vodozemac",
    strip: [],
    answers: `Zmija=15; Gušter=10; Kornjača=10; Krokodil=10; Žaba=8; Aligator=3; Kameleon=3; Daždevnjak/Salamandra=3;
      Poskok=3; Kobra=2; Piton=2; Anakonda=2; Šarka=1.5; Iguana=1.5; Čovječja ribica=1.5; Boa=1; Gekon=1;
      Komodski varan/Varan=1; Krastača=1; Zvečarka=1; Triton/Vodenjak=0.5; Sljepić=0.5; Bjelouška=0.5;
      Zelembać=0.5; Mamba/Crna mamba=0.5; Gatalinka=0.3; Smukulja=0.2; Kajman=0.2; Kravosas=0.2; Gavijal=0.1;
      Tuatara=0.1; Agama=0.1`,
  },
  {
    slug: "dragi-kamen",
    group: "opce",
    title: "Dragi kamen, metal ili mineral",
    strip: [],
    answers: `Dijamant=22; Zlato=8; Rubin=9; Smaragd=9; Safir=7; Srebro=4; Biser=3; Ametist=3; Topaz=2; Platina=2;
      Opal=1.5; Jantar/Ćilibar=1.5; Tirkiz=1.5; Kvarc=1.5; Akvamarin=1; Granat=1; Žad=1; Bakar=1; Željezo=1;
      Oniks=0.5; Ahat=0.5; Kristal=0.5; Koralj=0.5; Bronca=0.5; Titan=0.5; Malahit=0.3; Lapis lazuli=0.3;
      Turmalin=0.3; Cirkon=0.3; Mjesečev kamen=0.3; Granit=0.3; Mramor=0.3; Ružičasti kvarc/Rozenkvarc=0.3;
      Gorski kristal=0.2; Hematit=0.2; Pirit=0.2; Citrin=0.2; Kalcit=0.1; Grafit=0.1; Tanzanit=0.1;
      Peridot/Olivin=0.1; Aleksandrit=0.1; Spinel=0.1; Obsidijan=0.2; Boksit=0.2; Ugljen=0.2`,
  },
];
