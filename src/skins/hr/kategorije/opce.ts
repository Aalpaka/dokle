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
  {
    slug: "gljiva",
    group: "opce",
    title: "Gljiva",
    hint: "Jestiva, otrovna ili bilo koja druga (i kvasci i plijesni)",
    strip: ["gljiva"],
    answers: `Vrganj/Vrganji=20; Šampinjon/Šampinjoni/Pečurka/Portobello=12; Lisičarka/Lisičarke/Lisičica=10;
      Muhara/Crvena muhara/Muhomorka=8; Zelena pupavka/Pupavka=5; Bukovača/Bukovače=5; Tartuf/Tartufi/Gomoljača=5;
      Sunčanica/Sunčanice=4; Smrčak/Smrčci=3; Puhara/Puhare=2; Rujnica/Rujnice=2; Šiitake/Shiitake=2;
      Medenjača/Medenjače=2; Mliječnica=1; Krasnica/Golubača=1; Blagva/Kraljevska gljiva=1; Turčin/Turčini=1;
      Ludara/Vražji vrganj=1; Kvasac=1; Plijesan=1; Gologlavka/Čarobne gljive=1; Panterovka=0.5; Trubača=0.5;
      Ježevica=0.5; Gnojištarka/Tintnjača=0.5; Kozja brada=0.5; Kandida/Candida=0.5; Čaga=0.5; Reishi=0.5;
      Bijela pupavka=0.5; Biserka=0.5; Sumporača=0.5; Trud=0.5; Zelenka=0.5; Đurđevača=0.5; Penicillium=0.3;
      Glavnica=0.3; Pepelnica=0.3; Cordyceps=0.3; Enoki=0.3; Jetrenjača=0.1; Smrdljivi stršak=0.1; Crni vrganj=0.5;
      Ljetni vrganj=0.3; Borov vrganj=0.3; Lijevak=0.3; Ljuskavica=0.3; Zvjezdača=0.3; Ciganka=0.3; Aspergillus=0.3;
      Botrytis/Plemenita plijesan=0.3; Hrđa=0.3; Snijet=0.3; Matsutake=0.3; Maitake=0.3; Eryngii=0.3;
      Lavlja griva=0.3; Judino uho=0.3; Kraljevska muhara=0.3; Siva muhara=0.3`,
  },
  {
    slug: "bih-mjesto",
    group: "opce",
    title: "Grad ili mjesto u Bosni i Hercegovini",
    hint: "Grad, mjesto ili selo",
    strip: ["grad", "selo", "mjesto"],
    answers: `Sarajevo=13; Mostar=8; Banja Luka/Banjaluka=6.5; Tuzla=4; Zenica=3.5; Bihać=2.5; Međugorje=2.5; Neum=2.5;
      Jajce=2; Široki Brijeg/Lištica=2; Livno=2; Travnik=2; Trebinje=2; Brčko=2; Bijeljina=2; Doboj=1.5; Prijedor=1.5;
      Konjic=1.5; Čapljina=1.5; Ljubuški=1.5; Posušje=1.5; Tomislavgrad/Duvno=1.5; Kupres=1; Grude=1; Stolac=1;
      Počitelj=1; Višegrad=1; Srebrenica=1; Goražde=1; Visoko=1; Foča=0.7; Kiseljak=0.7; Vitez=0.7; Busovača=0.7;
      Novi Travnik=0.7; Bugojno=0.7; Gornji Vakuf/Uskoplje=0.7; Prozor/Prozor-Rama/Rama=0.7; Jablanica=0.7; Kreševo=0.7;
      Fojnica=0.7; Kakanj=0.7; Vareš=0.7; Zavidovići=0.7; Žepče=0.7; Maglaj=0.7; Tešanj=0.7; Gradačac=0.7; Orašje=0.7; Derventa=0.7;
      Gradiška/Bosanska Gradiška=0.7; Sanski Most=0.7; Cazin=0.7; Velika Kladuša=0.7; Drvar=0.7; Zvornik=0.7; Pale=0.7; Ilidža=0.7;
      Jahorina=0.7; Blagaj=0.7; Čitluk=0.7; Odžak=0.3; Modriča=0.3; Brod/Bosanski Brod=0.3; Šamac/Bosanski Šamac=0.3;
      Kozarska Dubica/Bosanska Dubica=0.3; Novi Grad/Bosanski Novi=0.3; Ključ=0.3; Bosanska Krupa=0.3;
      Bosanski Petrovac=0.3; Glamoč=0.3; Bosansko Grahovo/Grahovo=0.3; Mrkonjić Grad/Varcar Vakuf=0.3;
      Kotor Varoš=0.3; Teslić=0.3; Prnjavor=0.3; Laktaši=0.3; Lukavac=0.3; Živinice=0.3; Gračanica=0.3; Srebrenik=0.3;
      Banovići=0.3; Bratunac=0.3; Vogošća=0.3; Hadžići=0.3; Ilijaš=0.3; Bjelašnica=0.3; Gacko=0.3; Bileća=0.3;
      Nevesinje=0.3; Bosanska Kostajnica/Kostajnica=0.2; Bužim=0.2; Šipovo=0.2; Čelinac=0.2; Srbac=0.2; Kalesija=0.2;
      Kladanj=0.2; Olovo=0.2; Vlasenica=0.2; Milići=0.2; Han Pijesak=0.2; Sokolac=0.2; Trnovo=0.2; Rogatica=0.2;
      Rudo=0.2; Čajniče=0.2; Ljubinje=0.2; Ravno=0.2; Drinovci=0.2; Rakitno=0.2; Martin Brod=0.2; Kulen Vakuf=0.2;
      Kozarac=0.2; Omarska=0.2; Ljubija=0.2; Breza=0.2; Vranduk=0.2; Usora=0.2; Ugljevik=0.2; Lopare=0.2;
      Bosanska Otoka=0.2; Šuica=0.1; Domaljevac=0.1`,
  },
  {
    slug: "srbija-cg",
    group: "opce",
    title: "Grad u Srbiji ili Crnoj Gori",
    hint: "Grad, mjesto ili poznato ljetovalište",
    strip: ["grad"],
    answers: `Beograd=12; Novi Sad=7; Niš=5; Podgorica/Titograd=5; Budva=3.5; Kotor=3.5; Kragujevac=3; Subotica=3;
      Herceg Novi=2.5; Bar=2.5; Zrenjanin=2; Pančevo=2; Čačak=2; Kraljevo=2; Novi Pazar=2; Ulcinj=2; Nikšić=2; Cetinje=2;
      Smederevo=1; Leskovac=1; Valjevo=1; Kruševac=1; Vranje=1; Šabac=1; Užice=1; Sombor=1; Požarevac=1; Tivat=1;
      Pirot=0.9; Zaječar=0.9; Kikinda=0.9; Sremska Mitrovica=0.9; Jagodina=0.9; Vršac=0.9; Bor=0.9; Zlatibor=0.9;
      Bijelo Polje=0.9; Pljevlja=0.9; Žabljak=0.9; Sveti Stefan=0.9; Perast=0.9; Prokuplje=0.6; Loznica=0.6; Ćuprija=0.6;
      Paraćin=0.6; Aranđelovac=0.6; Gornji Milanovac=0.6; Kopaonik=0.6; Vrnjačka Banja/Vrnjci=0.6; Sokobanja=0.6; Guča=0.6;
      Sremski Karlovci=0.6; Obrenovac=0.6; Zemun=0.6; Berane=0.6; Kolašin=0.6; Petrovac na Moru/Petrovac=0.6;
      Smederevska Palanka=0.3; Ivanjica=0.3; Arilje=0.3; Prijepolje=0.3; Priboj=0.3; Nova Varoš=0.3; Niška Banja=0.3;
      Inđija=0.3; Ruma=0.3; Stara Pazova=0.3; Šid=0.3; Bačka Palanka=0.3; Bačka Topola=0.3; Vrbas=0.3; Kula=0.3;
      Apatin=0.3; Bečej=0.3; Senta=0.3; Kanjiža=0.3; Bela Crkva=0.3; Mladenovac=0.3; Lazarevac=0.3; Negotin=0.3;
      Kladovo=0.3; Knjaževac=0.3; Aleksinac=0.3; Sjenica=0.3; Bajina Bašta=0.3; Topola=0.3; Mokra Gora=0.3;
      Rožaje=0.3; Danilovgrad=0.3; Plav=0.3; Mojkovac=0.3; Risan=0.3; Igalo=0.3; Bečići=0.3; Sutomore=0.3;
      Novi Bečej=0.2; Kovin=0.2; Kovačica=0.2; Grocka=0.2; Majdanpek=0.2; Donji Milanovac=0.2; Golubac=0.2;
      Vlasotince=0.2; Lebane=0.2; Bujanovac=0.2; Preševo=0.2; Surdulica=0.2; Vladičin Han=0.2; Dimitrovgrad=0.2;
      Bela Palanka=0.2; Kuršumlija=0.2; Trstenik=0.2; Raška=0.2; Tutin=0.2; Kosjerić=0.2; Ljubovija=0.2;
      Mali Zvornik=0.2; Ub=0.2; Despotovac=0.2; Svilajnac=0.2; Velika Plana=0.2; Petrovac na Mlavi=0.2;
      Veliko Gradište=0.2; Požega=0.2; Čajetina=0.2; Gusinje=0.2; Andrijevica=0.2; Šavnik=0.2; Plužine=0.2; Tuzi=0.2;
      Svrljig=0.1; Virpazar=0.1`,
  },
  {
    slug: "slovenija",
    group: "opce",
    title: "Grad ili mjesto u Sloveniji",
    hint: "Grad, mjesto, selo ili ljetovalište",
    strip: ["grad", "selo", "mjesto"],
    answers: `Ljubljana=25; Maribor=10; Bled=6; Koper=5; Piran=5; Portorož=4; Celje=4; Kranj=3; Novo Mesto=3; Ptuj=3;
      Nova Gorica=2; Izola=2; Velenje=2; Murska Sobota=2; Postojna=2; Kranjska Gora=2; Bohinj=1.5; Krško=1.5;
      Škofja Loka=1; Kamnik=1; Domžale=1; Jesenice=1; Trbovlje=1; Brežice=1; Slovenj Gradec=1; Idrija=1; Bovec=1;
      Sežana=1; Lipica=1; Kočevje=1; Rogaška Slatina=1; Laško=1; Planica=1; Ravne na Koroškem=0.5; Ajdovščina=0.5;
      Tolmin=0.5; Kobarid=0.5; Ilirska Bistrica=0.5; Ribnica=0.5; Črnomelj=0.5; Metlika=0.5; Vrhnika=0.5;
      Cerknica=0.5; Slovenska Bistrica=0.5; Ormož=0.5; Ljutomer=0.5; Lendava=0.5; Gornja Radgona=0.5; Radenci=0.5;
      Radovljica=0.5; Čatež=0.5; Divača=0.3; Trebnje=0.3; Grosuplje=0.3; Logatec=0.3; Žalec=0.3; Šentjur=0.3;
      Slovenske Konjice=0.3; Moravske Toplice=0.3; Dravograd=0.3; Tržič=0.3; Medvode=0.3; Litija=0.3;
      Zagorje ob Savi=0.3; Hrastnik=0.3; Sevnica=0.3; Rogla=0.3; Vipava=0.3; Ankaran=0.3; Strunjan=0.3;
      Podčetrtek=0.3; Dolenjske Toplice=0.3; Žiri=0.1; Kostanjevica na Krki=0.1`,
  },
  {
    slug: "grad-francuska",
    group: "opce",
    title: "Grad u Francuskoj",
    hint: "Grad ili poznato mjesto, i na Korzici",
    strip: ["grad"],
    answers: `Pariz/Paris=25; Marseille/Marselj=10; Lyon=8; Nica/Nice=6; Bordeaux/Bordo=5; Toulouse=4; Cannes=4;
      Lille=3; Strasbourg/Strasburg=3; Nantes=3; Montpellier=2; Avignon=2; Versailles=2; Saint-Tropez=2; Lourdes=2;
      Rennes=1.5; Reims=1.5; Grenoble=1.5; Le Havre=1; Dijon=1; Calais=1; Dunkerque/Dunkirk=1; Saint-Étienne=1;
      Le Mans=1; Orléans=1; Tours=1; Metz=1; Nancy=1; Rouen=1; Biarritz=1; Aix-en-Provence=1; Toulon=1; Ajaccio=1;
      Chamonix=1; Annecy=1; Amiens=0.5; Caen=0.5; Brest=0.5; Bayonne=0.5; Pau=0.5; Perpignan=0.5; Nîmes=0.5;
      Arles=0.5; Antibes=0.5; Menton=0.5; Bastia=0.5; Clermont-Ferrand=0.5; Limoges=0.5; Poitiers=0.5;
      La Rochelle=0.5; Carcassonne=0.5; Cognac=0.5; Chartres=0.5; Auxerre=0.5; Lens=0.5; Colmar=0.5; Saint-Malo=0.5;
      Mont-Saint-Michel=0.5; Saint-Denis=0.5; Lorient=0.3; Angers=0.3; Mulhouse=0.3; Besançon=0.3; Troyes=0.3;
      Valence=0.3; Évian=0.3; Vichy=0.3; Cherbourg=0.3; Deauville=0.3; Sète=0.3; Béziers=0.3; Narbonne=0.3;
      Roubaix=0.3; Boulogne=0.3; Courchevel=0.3; Val d'Isère=0.3; Giverny=0.3; Épernay=0.1; Albi=0.1`,
  },
  {
    slug: "grad-spanjolska",
    group: "opce",
    title: "Grad u Španjolskoj ili Portugalu",
    hint: "Grad ili poznato mjesto, i na otocima",
    strip: ["grad"],
    answers: `Madrid=16; Barcelona=14.5; Lisabon/Lisboa=8; Porto=6.5; Sevilla/Seville=5; Valencia=5; Málaga=3; Bilbao=2.5;
      Granada=2.5; Ibiza=2.5; Zaragoza=1.5; Palma/Palma de Mallorca=1.5; San Sebastián/Donostia=1.5; Pamplona=1.5; Alicante=1.5;
      Faro=1.5; Salamanca=1; Toledo=1; Córdoba/Kordoba=1; Santiago de Compostela/Santiago=1; Marbella=1;
      Benidorm=1; Coimbra=1; Braga=1; Cádiz=0.8; Murcia=0.8; Valladolid=0.8; Vigo=0.8; A Coruña/La Coruña/Coruña=0.8;
      Oviedo=0.8; Santander=0.8; Tarragona=0.8; Girona=0.8; Lloret de Mar=0.8; Las Palmas=0.8; Funchal=0.8; Sintra=0.8; Cascais=0.8;
      Albufeira=0.8; Fátima=0.8; Gijón=0.4; Figueres=0.4; Sitges=0.4; Cartagena=0.4; Almería=0.4;
      Jerez/Jerez de la Frontera=0.4; Ronda=0.4; Segovia=0.4; Burgos=0.4; Vitoria/Vitoria-Gasteiz=0.4; Getafe=0.4;
      Villarreal=0.4; Santa Cruz de Tenerife=0.4; Torremolinos=0.4; Lagos=0.4; Évora=0.4; Guimarães=0.4; Aveiro=0.4;
      Setúbal=0.4; Nazaré=0.4; Estoril=0.4; Portimão=0.4; Huelva=0.2; Ávila=0.2; León=0.2; Logroño=0.2; Badajoz=0.2;
      Cáceres=0.2; Mérida=0.2; Albacete=0.2; Elche=0.2; Leganés=0.2; Lleida=0.2; Huesca=0.2; Castellón=0.2;
      Fuengirola=0.2; Estepona=0.2; Nerja=0.2; Cuenca=0.2; Viseu=0.2; Leiria=0.2; Tavira=0.2; Vila Nova de Gaia=0.2;
      Ponta Delgada=0.2; Teruel=0.1; Óbidos=0.1`,
  },
  {
    slug: "grad-britanija",
    group: "opce",
    title: "Grad u Velikoj Britaniji ili Irskoj",
    hint: "Engleska, Škotska, Wales, Sjeverna Irska ili Irska",
    strip: ["grad"],
    answers: `London=25; Manchester=10; Liverpool=8; Dublin=8; Edinburgh=5; Birmingham=4; Glasgow=4; Oxford=4;
      Cambridge=3; Belfast=3; Leeds=2; Bristol=2; Newcastle=2; Sheffield=2; Brighton=2; Cardiff=2; Cork=1.5;
      Nottingham=1.5; Leicester=1.5; Southampton=1.5; York=1.5; Bath=1; Aberdeen=1; Plymouth=1; Portsmouth=1;
      Norwich=1; Coventry=1; Sunderland=1; Swansea=1; Galway=1; Middlesbrough=0.5; Reading=0.5; Derby=0.5;
      Stoke/Stoke-on-Trent=0.5; Wolverhampton=0.5; Bournemouth=0.5; Blackpool=0.5; Blackburn=0.5; Bolton=0.5;
      Burnley=0.5; Watford=0.5; Luton=0.5; Ipswich=0.5; Hull=0.5; Canterbury=0.5; Dover=0.5; Windsor=0.5;
      Stratford-upon-Avon/Stratford=0.5; Inverness=0.5; Limerick=0.5; Wrexham=0.5; Huddersfield=0.3; Bradford=0.3;
      Salisbury=0.3; Exeter=0.3; Dundee=0.3; Stirling=0.3; St Andrews=0.3; Waterford=0.3; Kilkenny=0.3;
      Derry/Londonderry=0.3; Killarney=0.3; Wigan=0.3; Peterborough=0.3; Milton Keynes=0.3; Cheltenham=0.3;
      Gloucester=0.3; Worcester=0.3; Chester=0.3; Lincoln=0.3; Durham=0.3; Swindon=0.3; Lancaster=0.2; Carlisle=0.2;
      Newport=0.2; Bangor=0.2; Perth=0.2; Sligo=0.2; Kilmarnock=0.1; Drogheda=0.1`,
  },
  {
    slug: "austrija-svicarska",
    group: "opce",
    title: "Grad ili mjesto u Austriji ili Švicarskoj",
    hint: "Grad, mjesto ili skijalište",
    strip: ["grad"],
    answers: `Beč/Wien=20; Zürich/Zurich/Cirih=8; Ženeva/Geneva/Genf=6; Salzburg=6; Graz=6; Innsbruck=4; Bern=4;
      Basel=3; Linz=3; Lausanne=2; Klagenfurt/Celovec=2; Lugano=2; Luzern/Lucerne=2; Villach/Beljak=2; Zermatt=1.5;
      St. Moritz/Sankt Moritz=1.5; Davos=1.5; Kitzbühel=1.5; Hallstatt=1.5; Interlaken=1; Montreux=1; Ischgl=1;
      Sölden=1; Bregenz=1; Zell am See=1; Grindelwald=0.5; Bad Gastein=0.5; Wels=0.5; St. Pölten/Sankt Pölten=0.5;
      Wiener Neustadt=0.5; Steyr=0.5; Schladming=0.5; Mayrhofen=0.5; St. Anton/Sankt Anton=0.5; Saalbach=0.5;
      Eisenstadt=0.5; Winterthur=0.5; St. Gallen/Sankt Gallen=0.5; Locarno=0.5; Kaprun=0.5; Velden=0.5;
      Lauterbrunnen=0.3; Leoben=0.3; Krems=0.3; Dornbirn=0.3; Feldkirch=0.3; Lech=0.3; Obertauern=0.3; Bad Ischl=0.3;
      Spielfeld/Špilje=0.3; Neusiedl am See/Neusiedl=0.3; Baden=0.3; Melk=0.3; Schaffhausen=0.3; Fribourg=0.3;
      Neuchâtel=0.3; Sion=0.3; Thun=0.3; Chur=0.3; Bellinzona=0.3; Crans-Montana=0.3; Verbier=0.3; Gstaad=0.3;
      Saas-Fee=0.3; Engelberg=0.3; Biel/Bienne=0.3; Zug=0.3; Bad Kleinkirchheim=0.3; Seefeld=0.3; Kufstein=0.3;
      Lienz=0.3; Braunau=0.3; Mauthausen=0.3; Schwechat=0.3; Mödling=0.2; Ascona=0.2; Andermatt=0.2; Arosa=0.2;
      Laax=0.2; Wörgl=0.2; Gmunden=0.2; Semmering=0.2; Wolfsberg=0.1; Aarau=0.1`,
  },
  {
    slug: "europska-drzava",
    group: "opce",
    title: "Europska država",
    hint: "Bilo koja država u Europi, i ako je samo dijelom u Europi",
    strip: [],
    answers: `Hrvatska=13; Njemačka=10; Francuska=8.5; Italija=8.5; Španjolska=5; Austrija=4.5;
      Velika Britanija/Ujedinjeno Kraljevstvo/UK/Britanija/Engleska/Škotska/Wales/Sjeverna Irska=4.5; Slovenija=3.5;
      Bosna i Hercegovina/BiH=3.5; Srbija=3.5; Grčka=3.5; Mađarska=2.5; Švicarska=2.5; Portugal=2.5; Nizozemska/Holandija=2.5;
      Belgija=1.5; Poljska=1.5; Češka/Češka Republika=1.5; Slovačka=1.5; Švedska=1.5; Norveška=1.5; Danska=1.5; Rusija=1.5;
      Ukrajina=1.5; Crna Gora=1.5; Finska=1.5; Irska=1.5; Rumunjska=1.5; Bugarska=1.5; Sjeverna Makedonija/Makedonija=1.5;
      Albanija=1.5; Island=0.9; Bjelorusija=0.9; Kosovo=0.9; Luksemburg=0.9; Monako=0.9; Vatikan=0.9; Malta=0.9; Turska=0.9;
      Moldavija/Moldova=0.4; Litva=0.4; Latvija=0.4; Estonija=0.4; Lihtenštajn=0.4; Andora=0.4; San Marino=0.4;
      Cipar=0.4; Gruzija=0.3; Armenija=0.3; Azerbajdžan=0.3; Kazahstan=0.1`,
  },
  {
    slug: "svjetsko-jelo",
    group: "opce",
    title: "Jelo iz svjetske kuhinje",
    hint: "Jelo, prilog ili desert iz bilo koje kuhinje osim hrvatske",
    strip: [],
    answers: `Pizza/Pica=10; Sushi=5; Lazanje/Lasagne=4; Hamburger/Burger=4; Špageti/Špageti bolonjez/Bolonjez=3.5;
      Carbonara=2.5; Paella/Paelja=2.5; Kebab/Döner=2.5; Bečki odrezak/Wiener Schnitzel/Šnicl=2.5; Tacos/Taco=2;
      Gyros/Giros=2; Musaka=2; Gulaš=2; Rižoto/Risotto=2; Ramen=2; Curry/Kari=2; Hot dog=2; Pad thai=1.5; Burrito=1.5;
      Chili con carne/Čili=1.5; Fish and chips=1.5; Njoki/Gnocchi=1.5; Ćevapi/Ćevapčići=1.5; Burek=1.5; Baklava=1.5; Falafel=1.5;
      Humus/Hummus=1.5; Fondue=1; Ravioli=1; Nachos=1; Šaverma/Shawarma=1; Tikka masala=1; Pekinška patka=1;
      Proljetne rolice=1; Souvlaki=0.7; Tortellini=0.7; Bruschetta=0.7; Minestrone=0.7; Carpaccio=0.7; Ratatouille=0.7;
      Gazpacho=0.7; Tortilla=0.7; Tapas=0.7; Churros=0.7; Quesadilla=0.7; Enchilada=0.7; Guacamole=0.7; Fajitas=0.7; Pirogi/Pierogi=0.7;
      Boršč=0.7; Stroganov/Stroganoff=0.7; Pljeskavica=0.7; Kuskus/Couscous=0.7; Dim sum=0.7; Pho=0.7; Kimchi=0.7; Tempura=0.7;
      Sashimi=0.7; Tiramisu=0.7; Bratwurst=0.7; Currywurst=0.7; Šopska salata=0.7; Tzatziki=0.3; Raclette=0.3; Rösti=0.3;
      Quiche=0.3; Bouillabaisse=0.3; Coq au vin=0.3; Escargots/Puževi=0.3; Foie gras=0.3; Crème brûlée=0.3;
      Kroasan/Croissant=0.3; Caprese=0.3; Ossobuco=0.3; Calzone=0.3; Focaccia=0.3; Arancini=0.3; Ceviche=0.3;
      Feijoada=0.3; Empanada=0.3; Pelmeni=0.3; Blini=0.3; Köfte=0.3; Lahmacun=0.3; Tabule/Tabbouleh=0.3; Tagine=0.3;
      Biryani=0.3; Samosa=0.3; Naan=0.3; Tandoori=0.3; Kung pao=0.3; Bibimbap=0.3; Teriyaki=0.3; Udon=0.3;
      Miso juha/Miso=0.3; Gyoza=0.3; Poke=0.3; Nasi goreng=0.3; Tom yum=0.3; Haggis=0.3;
      Engleski doručak/Full English=0.3; Rostbif/Roast beef=0.3; Bagel=0.3; Mac and cheese=0.3;
      Pileća krilca/Buffalo wings=0.3; Cheesecake=0.3; Köttbullar=0.3; Perec/Pretzel=0.3;
      Sacher torta/Sachertorte=0.3; Lángos=0.3; Karađorđeva šnicla=0.3; Bosanski lonac=0.3; Polenta=0.2;
      Vitello tonnato=0.2; Saltimbocca=0.2; Asado=0.2; Pide=0.2; Dal=0.2; Wonton=0.2; Chow mein=0.2; Bánh mì=0.2;
      Bulgogi=0.2; Onigiri=0.2; Satay=0.2; Yorkshire pudding=0.2; Shepherd's pie=0.2; Irish stew=0.2;
      Clam chowder=0.2; Poutine=0.2; Jambalaya=0.2; Surströmming=0.2; Pastel de nata=0.2; Kaiserschmarrn=0.2;
      Lečo=0.2; Perkelt/Pörkölt=0.2; Spanakopita=0.2; Tavče gravče=0.2; Begova čorba=0.2; Tufahija=0.2;
      Smørrebrød=0.1; Laksa=0.1; Gumbo=0.1`,
  },
  {
    slug: "sir",
    group: "opce",
    title: "Sir",
    hint: "Vrsta ili ime sira, domaćeg ili stranog",
    strip: ["sir"],
    answers: `Gauda/Gouda=10; Mozzarella/Mocarela=8; Parmezan/Parmigiano/Parmigiano Reggiano=8; Feta=6; Paški sir=6;
      Edamer/Edam=5; Ementaler/Emmental=4; Cheddar/Čedar=4; Svježi sir/Cottage=4; Brie=3; Camembert=3; Gorgonzola=3;
      Trapist=2; Mascarpone=2; Ricotta/Rikota=2; Kozji sir=2; Pecorino=2; Grana Padano=1.5; Roquefort=1.5; Zdenka=1;
      Kravlji sir=1; Ovčji sir=1; Gruyère=1; Tilsiter=1; Halloumi=1; Škripavac=1; Livanjski sir=1; Kajmak=1;
      Dimljeni sir=1; Topljeni sir=1; Burrata=1; Kačkavalj=1; Manchego=0.5; Travnički sir=0.5;
      Sir iz mišine/Sir iz mijeha=0.5; Krčki sir=0.5; Prgica=0.5; Provolone=0.5; Stilton=0.5; Leerdammer=0.5;
      Raclette=0.5; Paneer=0.5; Sjenički sir=0.5; Vlašićki sir=0.5; Turoš=0.3; Basa=0.3; Taleggio=0.3; Fontina=0.3;
      Asiago=0.3; Scamorza=0.3; Maasdam=0.3; Appenzeller=0.3; Comté=0.3; Reblochon=0.3; Munster=0.3; Brunost=0.3;
      Jarlsberg=0.3; Havarti=0.3; Pljevaljski sir=0.3; Njeguški sir=0.3; Zlatarski sir=0.3; Sir iz ulja=0.3;
      Tounjski sir=0.3; Wensleydale=0.2; Tête de Moine=0.2; Labneh=0.2; Oscypek=0.2; Tolminc=0.2; Mimolette=0.1;
      Danablu=0.1`,
  },
  {
    slug: "boja",
    group: "opce",
    title: "Boja ili nijansa",
    hint: "Boja ili nijansa, i složena (tamnoplava, boja breskve…)",
    strip: ["boja", "boje"],
    answers: `Crvena=15; Plava=14; Zelena=10; Žuta=8; Crna=7; Bijela=6; Narančasta=5; Ljubičasta=5; Roza/Ružičasta=5;
      Smeđa=4; Siva=4; Tirkizna/Tirkiz=3; Bordo=2; Bež=2; Zlatna=2; Srebrna=2; Teget=1.5; Indigo=1; Magenta=1;
      Cijan=1; Lila=1; Maslinasta=1; Mint/Mentol=1; Koraljna/Koralj=1; Krem=1; Kaki=1; Azurna=1; Svijetloplava=1;
      Tamnoplava=1; Grimizna=1; Purpurna=1; Bakrena=0.5; Brončana=0.5; Oker=0.5; Smaragdna/Smaragd=0.5; Lavanda=0.5;
      Breskva=0.5; Čokoladna=0.5; Kestenjasta=0.5; Vinsko crvena=0.5; Fuksija=0.5; Antracit=0.5; Slonovača=0.5;
      Nebeskoplava=0.5; Kraljevsko plava=0.5; Petrolej=0.5; Ciklama=0.5; Karamel=0.3; Šljiva=0.3; Lososova/Losos=0.3;
      Senf=0.3; Pepeljasta=0.3; Biserna=0.3; Marelica=0.3; Pistacija=0.3; Mahagonij=0.3; Terakota=0.3; Sepija=0.3;
      Akvamarin=0.3; Kobaltna/Kobalt=0.3; Ultramarin=0.3; Tamnocrvena=0.3; Svijetlozelena=0.3; Tamnozelena=0.3;
      Ciglasta=0.3; Cinober=0.2; Šafran=0.2; Grafitna=0.2; Umbra=0.1; Šampanjac=0.1`,
  },
  {
    slug: "odjeca",
    group: "opce",
    title: "Odjevni predmet ili obuća",
    hint: "Komad odjeće, obuće ili nešto što se nosi na glavi",
    strip: [],
    answers: `Majica=9.5; Hlače=8; Jakna=5; Tenisice/Patike/Superge=5; Cipele=5; Čarape=4; Haljina=4; Košulja=4;
      Suknja=3; Džemper=3; Traperice/Farmerice/Jeans=3; Kaput=2.5; Gaće/Gaćice/Donje rublje=2.5; Kapa=2.5; Čizme=2.5;
      Papuče/Šlape=2.5; Grudnjak=1.5; Šal=1.5; Rukavice=1.5; Šešir=1.5; Japanke=1.5; Sandale=1.5; Kravata=1.5; Kupaći kostim/Kupaći=1.5;
      Trenirka=1.5; Kratke hlače/Šorc=1.5; Odijelo=1.5; Dukserica/Hudica/Hoodie=1.5; Bokserice=1; Tajice/Helanke=1;
      Pidžama=1; Sako=1; Bluza=1; Štikle/Potpetice=1; Prsluk=0.8; Kardigan=0.8; Vesta=0.8; Pulover=0.8; Remen/Pojas=0.8;
      Hulahopke=0.8; Kućni ogrtač/Ogrtač/Bade mantil=0.8; Kačket/Šilterica=0.8; Kopačke=0.8; Kombinezon=0.4; Kabanica=0.4;
      Mantil=0.4; Bunda=0.4; Parka=0.4; Vjetrovka=0.4; Trenčkot=0.4; Smoking=0.4; Frak=0.4;
      Leptir mašna/Leptirica=0.4; Najlonke=0.4; Korzet/Steznik=0.4; Spavaćica=0.4; Marama=0.4; Mokasinke=0.4;
      Espadrile=0.4; Balerinke=0.4; Gležnjače=0.4; Klompe=0.4; Natikače=0.4; Krokse/Crocs=0.4; Opanci=0.4;
      Topić/Top=0.4; Potkošulja=0.4; Polo majica=0.4; Rolka/Dolčevita=0.4; Bermude=0.4; Pregača/Kecelja=0.4;
      Naramenice=0.2; Bandana=0.2; Beretka=0.2; Šubara=0.2; Gumene čizme=0.2; Martensice=0.2; Bodi=0.2; Tunika=0.2;
      Kimono=0.2; Kilt=0.2; Pončo=0.2; Uniforma=0.2; Turban=0.2; Sari=0.2; Toga=0.2; Cokule=0.1; Baloner=0.1`,
  },
  {
    slug: "aparat",
    group: "opce",
    title: "Kućanski aparat ili uređaj",
    hint: "Električni ili drugi uređaj koji se koristi u kući",
    strip: ["aparat"],
    answers: `Hladnjak/Frižider=12; Perilica rublja/Veš mašina/Mašina za veš=10; Perilica posuđa/Mašina za suđe=6;
      Mikrovalna/Mikrovalna pećnica=6; Usisavač=6; Štednjak=5; Toster=4; Glačalo/Pegla=4; Sušilo za kosu/Fen=4;
      Televizor/TV=4; Pećnica=3; Kuhalo za vodu/Kuhalo=3; Aparat za kavu/Kavomat=3; Klima/Klima uređaj=3; Mikser=3;
      Blender=2; Sušilica/Sušilica rublja=2; Zamrzivač/Ledenica=2; Bojler=2; Friteza/Air fryer=2; Ventilator=2;
      Napa=1.5; Sokovnik=1.5; Grijalica/Radijator=1.5; Ploča za kuhanje/Indukcijska ploča=1;
      Multipraktik/Robot za kuhinju=1; Robot usisavač=1; Šivaća mašina/Šivaći stroj=1; Brijač/Aparat za brijanje=1;
      Radio=1; Računalo/Kompjuter=1; Mobitel=1; Sendvičar/Aparat za sendviče=0.5; Pekač kruha=0.5; Mlin za kavu=0.5;
      Električni roštilj=0.5; Ekspres lonac=0.5; Thermomix=0.5; Ovlaživač zraka=0.5; Pročišćivač zraka=0.5;
      Uvijač za kosu/Figaro=0.5; Pegla za kosu/Peglica=0.5; Električna četkica=0.5; Vaga=0.5; Laptop=0.5;
      Pisač/Printer=0.5; Telefon=0.5; Peć=0.5; Štapni mikser=0.5; Rezalica=0.5; Mlin za meso=0.5; Kalorifer=0.5;
      Vafl aparat=0.3; Kuhalo za rižu=0.3; Multicooker=0.3; Odvlaživač=0.3; Paročistač=0.3; Termostat=0.3; Kamin=0.3;
      Toplinska pumpa=0.3; Aparat za kokice=0.3; Električna deka=0.3; Budilica=0.3; Zvučnik=0.3; Kuhalo za jaja=0.1;
      Vinski hladnjak=0.1`,
  },
  {
    slug: "ples",
    group: "opce",
    title: "Ples",
    hint: "Društveni, narodni, scenski ili bilo koji drugi ples",
    strip: ["ples"],
    answers: `Valcer/Bečki valcer=10; Tango=8; Salsa=7; Kolo=6; Balet=5; Cha-cha-cha/Ča-ča-ča/Cha cha=4; Samba=4;
      Flamenko/Flamenco=4; Hip hop=4; Rumba=3; Breakdance=3; Twist=2; Rock and roll/Rock'n'roll=2; Fokstrot/Foxtrot=2;
      Bachata=2; Polka=2; Lambada=2; Macarena=2; Trbušni ples=2; Zumba=1.5; Disco=1; Jive=1; Quickstep=1;
      Paso doble=1; Kizomba=1; Moreška=1; Linđo=1; Charleston=1; Swing=1; Step/Tap=1; Irski ples/Riverdance=1;
      Kankan/Can-can=1; Hula=1; Haka=1; Sirtaki=1; Suvremeni ples=1; Čačak=0.5; Drmeš=0.5; Lindy hop=0.5; Kazačok=0.5;
      Mazurka=0.5; Poloneza=0.5; Menuet=0.5; Tarantela=0.5; Čardaš=0.5; Twerk=0.5; Moonwalk=0.5; Mambo=0.5;
      Merengue=0.5; Capoeira=0.5; Jazz dance=0.5; Moderni ples=0.5; Pole dance=0.5; Limbo=0.5; Pačji ples=0.5;
      Vogue=0.3; Shuffle=0.3; Boogie-woogie/Boogie=0.3; Reggaeton=0.3; Bolero=0.3; Fandango=0.3; Line dance=0.3;
      Konga/Conga=0.3; Hopak=0.3; Krump=0.2; Kathak=0.2; Sevillana=0.2; Jota=0.2; Square dance=0.2; Tektonik=0.2;
      Shimmy=0.2; Kuduro=0.2; Sardana=0.2; Šotiš=0.1; Dabke=0.1`,
  },
  {
    slug: "svjetska-znamenitost",
    group: "opce",
    title: "Svjetska znamenitost ili građevina",
    hint: "Izvan Hrvatske: građevina, spomenik ili poznata prirodna atrakcija",
    strip: [],
    answers: `Eiffelov toranj/Eiffel=9.5; Kip slobode=5; Koloseum/Kolosej=5; Kineski zid=5;
      Piramide/Keopsova piramida/Velika piramida=5; Taj Mahal=3.5; Krivi toranj u Pisi/Toranj u Pisi/Kosi toranj=3;
      Big Ben=3; Sagrada Familia=2.5; Akropola/Partenon=2.5; Machu Picchu=2; Krist Otkupitelj/Kip Krista Otkupitelja=2;
      Stonehenge=2; Sfinga=2; Burj Khalifa=2; Slavoluk pobjede=2; Louvre=2; Notre-Dame=2; Petra=1; Chichen Itza=1;
      Brandenburška vrata=1; Bazilika svetog Petra=1; Sikstinska kapela=1; Fontana di Trevi=1; Kremlj=1;
      Opera u Sydneyju=1; Golden Gate=1; Empire State Building=1; Bijela kuća=1; Nijagarini slapovi/Niagara=1;
      Neuschwanstein=1; Hagia Sophia/Aja Sofija=1; Stari most=1; Berlinski zid=1; Crveni trg=0.9; Tower Bridge=0.9;
      Buckinghamska palača=0.9; London Eye=0.9; Versajska palača/Versailles=0.9; Pompeji=0.9; Angkor Wat=0.9;
      Vasilije Blaženi=0.6; Times Square=0.6; Hollywood=0.6; Mount Rushmore=0.6; Grand Canyon=0.6; Westminster=0.6; Atomium=0.6;
      Manneken Pis=0.6; Alhambra=0.6; Mont-Saint-Michel=0.6; Panteon=0.6; Trg svetog Marka=0.6; Milanska katedrala/Duomo=0.6;
      Plava džamija=0.6; Karlov most=0.6; Praški dvorac=0.6; Mađarski parlament=0.6; Schönbrunn=0.6; Zid plača=0.6; Kaaba=0.6;
      Zabranjeni grad=0.6; Terakotna vojska=0.6; Petronas=0.6; Burj al Arab=0.6; Moai=0.6; Alcatraz=0.6; Kapitol=0.6; Pentagon=0.6;
      Central Park=0.6; Brooklynski most=0.6; Disneyland=0.6; Kölnska katedrala=0.6; Mala sirena=0.6; Park Güell=0.3;
      Duždeva palača=0.3; Most uzdisaja=0.3; Rialto=0.3; Kapadokija=0.3; Efez=0.3; Meteora=0.3; Kupola na stijeni=0.3;
      Marina Bay Sands=0.3; CN Tower=0.3; Lincolnov memorijal=0.3; Hooverova brana=0.3; Reichstag=0.3;
      Checkpoint Charlie=0.3; Uluru=0.3; Viktorijini slapovi=0.3; David=0.3; Ponte Vecchio=0.3; Auschwitz=0.3;
      Delfi=0.2; Knosos=0.2; Hofburg=0.2; Ribarska utvrda=0.2; Crkva Svetoga groba=0.2; Šeik Zayed=0.2;
      Teotihuacán=0.2; Tikal=0.2; Iguazú=0.2; Nazca=0.2; Space Needle=0.2; Gateway Arch=0.2; Torre de Belém=0.2;
      La Rambla=0.2; Uffizi=0.2; Brana Tri klanca=0.2; Borobudur=0.2; Potala=0.2; Shwedagon=0.1;
      Kinkaku-ji/Zlatni paviljon=0.1`,
  },
  {
    slug: "more-ocean",
    group: "opce",
    title: "More, ocean, zaljev ili tjesnac",
    hint: "Bilo gdje na svijetu, i kanali između otoka",
    strip: [],
    answers: `Jadransko more/Jadran=15; Tihi ocean/Pacifik=10; Atlantski ocean/Atlantik=10; Indijski ocean=6;
      Sredozemno more/Mediteran=6; Crno more=5; Crveno more=4; Mrtvo more=4; Sjeverno more=3; Baltičko more/Baltik=3;
      Karipsko more/Karibi=3; Arktički ocean/Sjeverni ledeni ocean=3; Kaspijsko jezero/Kaspijsko more=2;
      Egejsko more=2; Jonsko more=2; Meksički zaljev/Američki zaljev=2; Perzijski zaljev=2; Kvarner=2; Bosfor=2;
      Gibraltarski tjesnac/Gibraltar=2; La Manche=2; Južni ocean/Antarktički ocean=1.5; Dardaneli=1.5;
      Tirensko more=1; Mramorno more=1; Biskajski zaljev=1; Tršćanski zaljev=1; Kotorski zaljev/Boka kotorska=1;
      Beringov tjesnac=1; Magellanov tjesnac=1; Hormuški tjesnac=1; Limski kanal=1; Ligursko more=0.5;
      Azovsko more=0.5; Barentsovo more=0.5; Arapsko more=0.5; Južnokinesko more=0.5; Žuto more=0.5;
      Japansko more=0.5; Beringovo more=0.5; Koraljno more=0.5; Sargaško more=0.5; Aralsko jezero=0.5;
      Bengalski zaljev=0.5; Hudsonov zaljev=0.5; Adenski zaljev=0.5; Napuljski zaljev=0.5; Doverski tjesnac=0.5;
      Otrantska vrata=0.5; Mesinski tjesnac=0.5; Drakeov prolaz=0.5; Velebitski kanal=0.5; Kaštelanski zaljev=0.5;
      Bijelo more=0.3; Norveško more=0.3; Irsko more=0.3; Istočnokinesko more=0.3; Tasmansko more=0.3;
      Galilejsko more=0.3; Botnički zaljev=0.3; Finski zaljev=0.3; Omanski zaljev=0.3; Lionski zaljev=0.3;
      Đenovski zaljev=0.3; Korintski zaljev=0.3; Kalifornijski zaljev=0.3; Gvinejski zaljev=0.3;
      Tajlandski zaljev=0.3; Bab el Mandeb=0.3; Malački tjesnac=0.3; Tajvanski tjesnac=0.3; Kerčki tjesnac=0.3;
      Skagerrak=0.3; Kattegat=0.3; Öresund=0.3; Splitska vrata=0.3; Brački kanal=0.3; Malostonski zaljev=0.3;
      Bakarski zaljev=0.3; Keltsko more=0.2; Ohotsko more=0.2; Weddellovo more=0.2; Rossovo more=0.2;
      Andamansko more=0.2; Filipinsko more=0.2; Grenlandsko more=0.2; Riški zaljev=0.2; Aljaški zaljev=0.2;
      Akapski zaljev=0.2; Sueski zaljev=0.2; Korejski tjesnac=0.2; Bassov tjesnac=0.2; Bonifacijev tjesnac=0.2;
      Zadarski kanal=0.2; Hvarski kanal=0.2; Neretvanski kanal=0.2; Raški zaljev=0.2; Vela vrata=0.1;
      Tarantski zaljev=0.1`,
  },
  {
    slug: "jezero-svijet",
    group: "opce",
    title: "Jezero izvan Hrvatske",
    hint: "Prirodno ili umjetno jezero bilo gdje osim u Hrvatskoj",
    strip: ["jezero"],
    answers: `Bajkalsko jezero/Bajkal=8; Gardsko jezero/Garda=8; Blatno jezero/Balaton=8; Bledsko jezero/Bled=8;
      Ohridsko jezero/Ohrid=5; Kaspijsko jezero=5; Ženevsko jezero=4; Viktorijino jezero=4; Komsko jezero/Como=4;
      Loch Ness=4; Bodensko jezero/Bodensee=3; Titicaca=3; Skadarsko jezero=3; Michigan=2; Gornje jezero/Superior=2;
      Tanganjika=2; Mrtvo more=2; Bohinjsko jezero/Bohinj=2; Lago Maggiore/Maggiore=2; Vrbsko jezero/Wörthersee=2;
      Huron=1.5; Erie=1.5; Ontario=1.5; Malavi=1; Prespansko jezero=1; Luganersko jezero/Lugano=1;
      Hallstattsko jezero=1; Neusiedlersko jezero=1; Luzernsko jezero=1; Ciriško jezero=1; Ladoga=1; Aralsko jezero=1;
      Galilejsko jezero/Tiberijadsko jezero=1; Veliko slano jezero=1; Tahoe=1; Buško jezero=1; Wolfgangsee=0.5;
      Attersee=0.5; Annecy=0.5; Onega=0.5; Čad=0.5; Srebrno jezero=0.5; Palić=0.5; Crno jezero=0.5;
      Jablaničko jezero=0.5; Iseo=0.3; Trasimeno=0.3; Mondsee=0.3; Zeller See=0.3; Thunsko jezero=0.3;
      Briensko jezero=0.3; Neuchâtelsko jezero=0.3; Balhaš=0.3; Issyk-Kul=0.3; Van=0.3; Sevan=0.3; Toba=0.3;
      Crater Lake=0.3; Lake Louise=0.3; Winnipeg=0.3; Nikaragvansko jezero=0.3; Maracaibo=0.3; Turkana=0.3; Volta=0.3;
      Kariba=0.3; Naserovo jezero=0.3; Vänern=0.3; Čudsko jezero/Peipsi=0.3; Biogradsko jezero=0.3;
      Boračko jezero=0.3; Ramsko jezero=0.3; Plivsko jezero=0.3; Königssee=0.3; Chiemsee=0.3; Dojransko jezero=0.3;
      Bolsena=0.2; Tonle Sap=0.2; Inle=0.2; Eyre=0.2; Taupo=0.2; Vättern=0.2; Saimaa=0.2; Zlatarsko jezero=0.2;
      Plavsko jezero=0.2; Müritz=0.2; Tegernsee=0.2; Vlasinsko jezero=0.1; Mälaren=0.1`,
  },
];
