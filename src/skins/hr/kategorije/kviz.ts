// Nove kategorije grupe "Kviz": zatvoreni popisi i teža pitanja u stilu Pointlessa.
import type { SeedCategory } from "../categories";

export const kvizKategorije: SeedCategory[] = [
  {
    slug: "drzava-samoglasnik",
    group: "kviz",
    title: "Država koja počinje samoglasnikom",
    hint: "A, E, I, O ili U, hrvatski naziv",
    strip: [],
    answers: `Italija=12; Austrija=10; Australija=8; Argentina=6; Irska=5; Indija=5; Egipat=5; Ukrajina=5; Island=4;
      Albanija=4; Izrael=3; Iran=3; Irak=3; Estonija=2; Afganistan=2; Etiopija=1.5; Ekvador=1.5; Alžir=1.5;
      Andora=1.5; Indonezija=1.5; Urugvaj=1.5; Angola=1; Armenija=1; Azerbajdžan=1; Uganda=1;
      Ujedinjeni Arapski Emirati/UAE=1; Ujedinjeno Kraljevstvo/UK=1; Uzbekistan=0.8; Oman=0.8; Eritreja=0.3;
      Ekvatorska Gvineja=0.3; Istočni Timor=0.3; Obala Bjelokosti=0.3; El Salvador=0.3; Esvatini=0.2;
      Antigva i Barbuda=0.2`,
  },
  {
    slug: "drzava-b-m",
    group: "kviz",
    title: "Država koja počinje na B ili M",
    hint: "Hrvatski naziv",
    strip: [],
    answers: `Brazil=12; Belgija=9; Bugarska=8; Bosna i Hercegovina/BiH/Bosna=8; Mađarska=8; Meksiko=6; Malta=5;
      Maroko=4; Bjelorusija=4; Monako=3; Bolivija=2.5; Madagaskar=2.5; Moldavija=2; Mongolija=2; Malezija=1.5;
      Bangladeš=1.5; Maldivi=1.5; Makedonija=1; Bahami=1; Mali=1; Mozambik=1; Bahrein=0.8; Mauricijus=0.8;
      Mjanmar=0.5; Barbados=0.5; Butan=0.5; Bocvana=0.5; Burkina Faso=0.5; Malavi=0.5; Mauritanija=0.5; Belize=0.3;
      Benin=0.3; Brunej=0.3; Burundi=0.3; Mikronezija=0.1; Marshallovi Otoci=0.1`,
  },
  {
    slug: "drzava-s",
    group: "kviz",
    title: "Država koja počinje na S ili Š",
    hint: "Hrvatski naziv",
    strip: [],
    answers: `Srbija=15; Slovenija=15; Švedska=8; Švicarska=8; Španjolska=8; Slovačka=8; SAD/Sjedinjene Američke Države=5;
      Sirija=2; Saudijska Arabija=2; Sjeverna Koreja=2; Sjeverna Makedonija=2; San Marino=2; Senegal=1.5;
      Singapur=1.5; Šri Lanka=1.5; Sudan=1; Somalija=1; Sejšeli=0.5; Sijera Leone=0.5; Surinam=0.5; Salvador=0.3;
      Samoa=0.3; Srednjoafrička Republika=0.3; Solomonski Otoci=0.2; Sveta Lucija=0.2; Sveti Kristofor i Nevis=0.1;
      Sveti Toma i Princip=0.1; Sveti Vincent i Grenadini=0.1`,
  },
  {
    slug: "bez-mora",
    group: "kviz",
    title: "Država bez izlaza na more",
    strip: [],
    answers: `Austrija=12; Švicarska=12; Mađarska=10; Češka=8; Slovačka=6; Srbija=6; Sjeverna Makedonija/Makedonija=4;
      Luksemburg=3; Kosovo=2; Lihtenštajn=2; Andora=2; San Marino=2; Vatikan=2; Bjelorusija=2; Mongolija=2;
      Moldavija=1.5; Afganistan=1.5; Nepal=1.5; Kazahstan=1; Bolivija=1; Paragvaj=1; Butan=0.5; Laos=0.5;
      Uzbekistan=0.5; Armenija=0.5; Mali=0.5; Čad=0.5; Etiopija=0.5; Kirgistan=0.3; Tadžikistan=0.3;
      Turkmenistan=0.3; Azerbajdžan=0.3; Niger=0.3; Burkina Faso=0.3; Uganda=0.3; Ruanda=0.3; Zambija=0.3;
      Zimbabve=0.3; Bocvana=0.3; Lesoto=0.3; Južni Sudan=0.2; Burundi=0.2; Malavi=0.2;
      Srednjoafrička Republika=0.2; Esvatini/Svazi=0.1`,
  },
  {
    slug: "eu",
    group: "kviz",
    title: "Članica Europske unije",
    strip: [],
    answers: `Njemačka=10; Francuska=8; Italija=8; Hrvatska=8; Austrija=6; Španjolska=5; Slovenija=5; Mađarska=4;
      Nizozemska=3; Belgija=3; Poljska=3; Češka=3; Grčka=3; Portugal=3; Švedska=2; Irska=2; Danska=2; Slovačka=2;
      Finska=1.5; Rumunjska=1.5; Bugarska=1.5; Luksemburg=1; Malta=1; Cipar=1; Estonija=1; Latvija=0.8; Litva=0.8`,
  },
  {
    slug: "nato",
    group: "kviz",
    title: "Članica NATO-a",
    strip: [],
    answers: `SAD/Amerika=12; Hrvatska=6; Velika Britanija/UK/Ujedinjeno Kraljevstvo=6; Njemačka=6; Francuska=5; Italija=4;
      Kanada=3; Turska=3; Poljska=3; Španjolska=2; Nizozemska=2; Belgija=2; Norveška=2; Slovenija=2; Danska=1.5;
      Portugal=1.5; Grčka=1.5; Češka=1.5; Mađarska=1.5; Finska=1.5; Švedska=1.5; Island=1; Luksemburg=1;
      Slovačka=1; Rumunjska=1; Bugarska=1; Albanija=1; Crna Gora=1; Sjeverna Makedonija/Makedonija=1;
      Estonija=0.8; Latvija=0.8; Litva=0.8`,
  },
  {
    slug: "zastava-zvijezda",
    group: "kviz",
    title: "Država sa zvijezdom na zastavi",
    strip: [],
    answers: `SAD/Amerika=20; Kina=10; Turska=6; Izrael=5; Bosna i Hercegovina/BiH=5; Australija=4; Brazil=3; Kuba=3;
      Vijetnam=3; Novi Zeland=2; Sjeverna Koreja=2; Čile=2; Kosovo=2; Maroko=1.5; Pakistan=1.5; Slovenija=1.5;
      Venezuela=1; Gana=1; Alžir=1; Tunis=1; Somalija=0.8; Libija=0.5; Senegal=0.5; Kamerun=0.5; Etiopija=0.5;
      Liberija=0.5; Sirija=0.5; Malezija=0.5; Singapur=0.5; Togo=0.3; Burkina Faso=0.3; Mozambik=0.3; Angola=0.3;
      Demokratska Republika Kongo/DR Kongo=0.3; Zimbabve=0.3; Jordan=0.3; Azerbajdžan=0.3; Panama=0.3;
      Filipini=0.3; Gvineja Bisau=0.2; Džibuti=0.2; Srednjoafrička Republika=0.2; Zelenortska Republika=0.2;
      Burundi=0.2; Mjanmar=0.2; Uzbekistan=0.2; Turkmenistan=0.2; Honduras=0.2; Surinam=0.2;
      Papua Nova Gvineja=0.2; Sveti Toma i Princip=0.1; Komori=0.1; Tadžikistan=0.1; Mauritanija=0.1;
      Grenada=0.1; Dominika=0.1; Sveti Kristofor i Nevis=0.1; Samoa=0.1; Solomonski Otoci=0.1; Tuvalu=0.1;
      Nauru=0.1; Marshallovi Otoci=0.1; Mikronezija=0.1; Južni Sudan=0.1; Paragvaj=0.1`,
  },
  {
    slug: "glavni-svijet",
    group: "kviz",
    title: "Glavni grad izvan Europe",
    strip: ["grad"],
    answers: `Tokio=12; Washington/Vašington=8; Peking/Beijing=8; Kairo=6; Buenos Aires=4; Canberra=3; Ottawa=3;
      Brazilija/Brasilia=3; Ciudad de Mexico/Mexico City/Meksiko=3; New Delhi/Delhi/Nju Delhi=3; Seul=3; Bangkok=3;
      Teheran=1.5; Bagdad=1.5; Kabul=1.5; Ankara=1.5; Havana=1.5; Jeruzalem=1; Rijad=1; Abu Dhabi=1; Doha=1; Damask=1;
      Hanoi=1; Manila=1; Jakarta=1; Kuala Lumpur=1; Nairobi=1; Lima=1; Santiago=1; Bejrut=0.8; Islamabad=0.8;
      Katmandu/Kathmandu=0.8; Pjongjang=0.8; Ulan Bator=0.8; Bogota=0.8; Karakas/Caracas=0.8; Montevideo=0.8;
      Wellington=0.8; Aman=0.5; Singapur=0.5; Tajpej/Taipei=0.5; Astana=0.5; Taškent=0.5; Baku=0.5; Tbilisi=0.5;
      Erevan/Jerevan=0.5; Adis Abeba=0.5; Dakar=0.5; Rabat=0.5; Tunis=0.5; Tripoli=0.5; Pretorija=0.5; Kito/Quito=0.5;
      La Paz=0.5; Kuvajt=0.3; Daka/Dhaka=0.3; Kolombo=0.3; Phnom Penh/Pnom Pen=0.3; Abuja=0.3; Akra=0.3; Alžir=0.3;
      Kartum=0.3; Kinšasa=0.3; Cape Town/Kapstad=0.3; Asunción/Asuncion=0.3; Kingston=0.3; Panama=0.3; Manama=0.2;
      Maskat=0.2; Sana=0.2; Vientiane=0.2; Biškek=0.2; Dušanbe=0.2; Ašgabat=0.2; Luanda=0.2; Harare=0.2; Lusaka=0.2;
      Kampala=0.2; Mogadišu=0.2; San José=0.2; Santo Domingo=0.2; Naypyidaw=0.1; Dodoma=0.1; Kigali=0.1;
      Antananarivo=0.1; Port Moresby=0.1; Suva=0.1; Bamako=0.1; Niamey=0.1; N'Djamena=0.1; Nouakchott=0.1;
      Ouagadougou/Uagadugu=0.1; Yamoussoukro=0.1; Lomé=0.1; Porto-Novo=0.1; Freetown=0.1; Monrovia=0.1;
      Conakry/Konakri=0.1; Bissau=0.1; Banjul=0.1; Praia=0.1; Yaoundé/Jaunde=0.1; Malabo=0.1; Libreville=0.1;
      Brazzaville=0.1; Bangui=0.1; Juba/Džuba=0.1; Asmara=0.1; Džibuti=0.1; Gitega=0.1; Lilongwe=0.1; Maputo=0.1;
      Gaborone=0.1; Windhoek=0.1; Mbabane=0.1; Maseru=0.1; Port Louis=0.1; Victoria=0.1; Moroni=0.1;
      São Tomé/Sao Tome=0.1; Bloemfontein=0.1; Bandar Seri Begawan=0.1; Dili=0.1; Thimphu=0.1; Male=0.1;
      Putrajaya=0.1; Sri Jayawardenepura Kotte/Kotte=0.1; Sucre=0.1; Guatemala/Gvatemala=0.1; Tegucigalpa=0.1;
      San Salvador=0.1; Managua=0.1; Belmopan=0.1; Port-au-Prince=0.1; Nassau=0.1; Bridgetown=0.1; Port of Spain=0.1;
      Georgetown=0.1; Paramaribo=0.1; Honiara=0.1; Port Vila=0.1; Apia=0.1; Nuku'alofa=0.1; Tarawa=0.1; Majuro=0.1;
      Palikir=0.1`,
  },
  {
    slug: "sad-drzava",
    group: "kviz",
    title: "Savezna država SAD-a",
    strip: [],
    answers: `Kalifornija/California=12; Teksas/Texas=12; Florida=10; New York/Njujork=8; Aljaska/Alaska=4; Havaji/Hawaii=4;
      Nevada=3; Washington=2; Arizona=2; Kolorado/Colorado=2; Ohio=2; Michigan/Mičigen=1.5; Illinois=1.5;
      Georgia/Džordžija=1.5; Pennsylvania/Pensilvanija=1.5; Massachusetts=1; Virginia/Virdžinija=1;
      Sjeverna Karolina/North Carolina=1; Louisiana/Luizijana=1; Kentucky/Kentaki=1; Tennessee=1; Utah/Juta=1;
      Oregon=1; Montana=1; Novi Meksiko/New Mexico=0.8; Oklahoma=0.8; Kansas=0.8; Minnesota=0.8; Alabama=0.8;
      New Jersey=0.8; Južna Karolina/South Carolina=0.5; Wyoming=0.5; Idaho=0.5; Nebraska=0.5; Iowa/Ajova=0.5;
      Wisconsin=0.5; Missouri=0.5; Arkansas=0.5; Mississippi/Misisipi=0.5; Indiana=0.5; Connecticut=0.3;
      Maryland=0.3; Zapadna Virginija/West Virginia=0.3; Vermont=0.3; Maine=0.3; Sjeverna Dakota/North Dakota=0.3;
      Južna Dakota/South Dakota=0.3; Rhode Island=0.2; Delaware=0.2; New Hampshire=0.2`,
  },
  {
    slug: "predsjednik-sad",
    group: "kviz",
    title: "Predsjednik SAD-a",
    strip: [],
    answers: `Donald Trump/Trump=15; Barack Obama/Obama=12; Joe Biden/Biden=8; Abraham Lincoln/Lincoln=7;
      George Washington/Washington=6; John F. Kennedy/Kennedy/JFK=6; George W. Bush/Bush=5; Bill Clinton/Clinton=5;
      Ronald Reagan/Reagan=3; Richard Nixon/Nixon=3; Thomas Jefferson/Jefferson=2;
      Franklin D. Roosevelt/Roosevelt/FDR=2; George H. W. Bush/Bush stariji=1.5; Jimmy Carter/Carter=1.5;
      Theodore Roosevelt/Teddy Roosevelt=1; Dwight D. Eisenhower/Eisenhower=1; Harry Truman/Truman=1;
      Gerald Ford/Ford=0.5; Lyndon B. Johnson/Lyndon Johnson=0.5; Woodrow Wilson/Wilson=0.5; Herbert Hoover/Hoover=0.3;
      Ulysses Grant/Grant=0.3; Andrew Jackson/Jackson=0.3; James Madison/Madison=0.3; James Monroe/Monroe=0.3;
      John Adams=0.3; Calvin Coolidge/Coolidge=0.2; William McKinley/McKinley=0.2; Andrew Johnson=0.1;
      Warren Harding/Harding=0.1; William Taft/Taft=0.1; Grover Cleveland/Cleveland=0.1; Benjamin Harrison=0.1;
      William Henry Harrison=0.1; Chester Arthur=0.1; James Garfield/Garfield=0.1; Rutherford Hayes/Hayes=0.1;
      John Quincy Adams=0.1; Martin Van Buren/Van Buren=0.1; John Tyler/Tyler=0.05; James Polk/Polk=0.05;
      Zachary Taylor/Taylor=0.05; Millard Fillmore/Fillmore=0.05; Franklin Pierce/Pierce=0.05;
      James Buchanan/Buchanan=0.05`,
  },
  {
    slug: "element",
    group: "kviz",
    title: "Kemijski element",
    strip: [],
    answers: `Kisik/Oksigen=12; Vodik/Hidrogen=10; Ugljik/Ugljenik=6; Zlato=6; Željezo/Gvožđe=5; Dušik/Azot=4; Srebro=4;
      Helij=3; Bakar=3; Natrij=2; Kalij=2; Kalcij=2; Aluminij=2; Uran=2; Magnezij=1.5; Klor=1.5; Sumpor=1.5; Olovo=1.5;
      Živa=1.5; Plutonij=1; Fluor=1; Fosfor=1; Cink=1; Platina=1; Litij=1; Silicij=0.8; Neon=0.8; Jod=0.8; Argon=0.5;
      Nikal=0.5; Kobalt=0.5; Krom=0.5; Titan=0.5; Kositar/Kalaj=0.5; Kripton=0.3; Ksenon=0.3; Radon=0.3; Brom=0.3;
      Berilij=0.3; Bor=0.3; Mangan=0.3; Volfram=0.3; Radij=0.3; Arsen=0.3; Polonij=0.2; Selen=0.2; Barij=0.2;
      Stroncij=0.2; Cezij=0.2; Rubidij=0.1; Germanij=0.1; Galij=0.1; Bizmut=0.1; Antimon=0.1; Kadmij=0.1;
      Paladij=0.1; Iridij=0.1; Cirkonij=0.1; Vanadij=0.1; Molibden=0.1; Francij=0.05; Indij=0.05; Talij=0.05;
      Telur=0.05; Rodij=0.05; Rutenij=0.05; Osmij=0.05; Renij=0.05; Tantal=0.05; Hafnij=0.05; Itrij=0.05;
      Skandij=0.05; Niobij=0.05; Tehnecij=0.05; Lantan=0.05; Cerij=0.05; Neodimij=0.05; Europij=0.05;
      Gadolinij=0.05; Torij=0.05; Aktinij=0.05; Americij=0.05; Einsteinij=0.05; Kalifornij=0.05; Nobelij=0.05;
      Mendelevij=0.05; Kirij=0.05; Fermij=0.05; Oganeson=0.05`,
  },
  {
    slug: "svemir",
    group: "kviz",
    title: "Planet, mjesec, zvijezda ili drugo nebesko tijelo",
    strip: ["planet", "planeta", "zvijezda"],
    answers: `Mars=12; Jupiter=8; Saturn=7; Venera/Danica/Zornica/Večernjača=6; Zemlja=5; Sunce=5; Merkur=4; Mjesec=4;
      Neptun=3; Uran=3; Pluton=3; Sjevernjača/Polaris=2; Sirius=1; Titan=1; Mliječna staza/Mliječni put=1; Europa=0.8;
      Betelgeuse=0.5; Alfa Kentaura/Alpha Centauri=0.5; Io=0.5; Ganimed=0.5; Fobos=0.5; Halleyev komet=0.5;
      Andromeda=0.5; Proxima Centauri=0.3; Vega=0.3; Kalisto=0.3; Deimos=0.3; Ceres=0.3; Rigel=0.2; Aldebaran=0.2;
      Antares=0.2; Enkelad=0.2; Triton=0.2; Haron=0.2; Eris=0.2; Arktur=0.1; Deneb=0.1; Altair=0.1; Mimas=0.1;
      Spika=0.05; Rea=0.05; Japet=0.05; Dione=0.05; Titanija=0.05; Oberon=0.05; Miranda=0.05; Haumea=0.05;
      Makemake=0.05; Sedna=0.05; Kuiperov pojas=0.05; Asteroidni pojas=0.5;
      Veliki Magellanov oblak/Magellanovi oblaci=0.5; Crna rupa=0.5; Plejade/Vlašići=0.5; Vesta=0.3; Oortov oblak=0.3;
      Oumuamua=0.3; Hale-Bopp=0.3; Komet=0.3; Sagittarius A*/Strijelac A=0.3; Supernova=0.3; Maglica=0.3;
      Orionova maglica=0.3; Pallas/Palada=0.2; Apofis/Apophis=0.2; Bennu=0.2; Shoemaker-Levy 9=0.2; Kvazar=0.2;
      Pulsar=0.2; Neutronska zvijezda=0.2; Bijeli patuljak=0.2; Crveni div=0.2; Rakova maglica=0.2; Kapela=0.2;
      Poluks=0.2; Kastor=0.2; Regul=0.2; Procion=0.2; Kanopus=0.2; UY Scuti=0.2; Deveti planet/Planet Nine=0.2;
      Feba/Phoebe=0.1; Hiperion=0.1; Pandora=0.1; Prometej=0.1; Ariel=0.1; Umbriel=0.1; Nereida=0.1; Proteus=0.1;
      Amalteja=0.1; Nix=0.1; Hidra=0.1; Kvaoar/Quaoar=0.1; Orkus=0.1; Juno=0.1; Eros=0.1; Ryugu=0.1;
      Čurjumov-Gerasimenko=0.1; Hyakutake=0.1; NEOWISE=0.1; Galaksija Trokut=0.1; Sombrero galaksija=0.1;
      Galaksija Vrtlog=0.1; M87=0.1; Stupovi stvaranja=0.1; Hijade=0.1; Fomalhaut=0.1; Mira=0.1; Algol=0.1; Mizar=0.1;
      Bellatrix=0.1; Barnardova zvijezda=0.1; VY Canis Majoris=0.1; Tau Ceti=0.1; TRAPPIST-1=0.1; Kepler-452b=0.1;
      Proxima b=0.1; Gonggong=0.1`,
  },
  {
    slug: "bogovi",
    group: "kviz",
    title: "Grčki ili rimski bog ili božica",
    strip: ["bog", "bozica"],
    answers: `Zeus=15; Posejdon/Poseidon=8; Had/Hades=6; Atena/Athena=5; Afrodita=5; Jupiter=4; Apolon=4; Ares=4;
      Hermes=4; Neptun=3; Hera=3; Venera=2; Mars=2; Artemida=2; Dioniz/Dionis=2; Pluton=1.5; Merkur=1.5; Hefest=1.5;
      Kupid/Amor=1.5; Minerva=1; Junona=1; Dijana=1; Bakho/Bacchus=1; Vulkan=1; Demetra=1; Kron/Kronos=1; Eros=1;
      Nike=1; Saturn=0.5; Gea/Geja=0.5; Hestija=0.5; Pan=0.5; Persefona=0.5; Helije/Helios=0.5; Janus=0.5;
      Prometej=0.5; Cerera=0.3; Uran=0.3; Vesta=0.3; Morfej=0.3; Fortuna/Tiha=0.3; Atlas=0.3; Selena=0.2; Luna=0.2;
      Aurora=0.2; Hipnos=0.2; Tanatos=0.2; Nemeza=0.2; Asklepije/Eskulap=0.2; Prozerpina=0.1; Sol=0.1; Eos=0.1;
      Iris=0.1; Hebe=0.1; Herkul/Heraklo/Herakle=0.5; Hekata=0.3; Rea/Reja=0.3; Temida=0.3; Muze=0.3; Eol=0.3;
      Kaos=0.3; Eris=0.3; Faun=0.3; Flora=0.3; Okean=0.2; Mnemozina=0.2; Moire=0.2; Erinije/Furije=0.2; Boreja=0.2;
      Zefir=0.2; Kratos=0.2; Higija/Higieja=0.2; Nikta/Niks=0.2; Tifon=0.2; Epimetej=0.2; Leta=0.2; Ganimed=0.2;
      Harmonija=0.2; Fobos=0.2; Hronos=0.2; Amfitrita=0.2; Triton=0.2; Pomona=0.2; Lari i penati/Lari=0.2;
      Bellona=0.2; Viktorija=0.2; Tellus/Terra=0.2; Mitra=0.2; Dioskuri/Kastor i Poluks=0.2; Kaliopa=0.1; Klio=0.1;
      Terpsihora=0.1; Melpomena=0.1; Talija=0.1; Harite/Gracije=0.1; Tetida=0.1; Protej=0.1; Nereus=0.1; Bija=0.1;
      Zelos=0.1; Plutos=0.1; Panakeja=0.1; Erebo=0.1; Hiperion=0.1; Teja=0.1; Japet=0.1; Maja=0.1; Dejmos=0.1;
      Enio=0.1; Ate=0.1; Kairos=0.1; Hermafrodit=0.1; Silvan=0.1; Vertumno=0.1; Kvirin=0.1; Orko=0.1; Dis Pater=0.1;
      Liber=0.1; Terminus=0.1; Juventa=0.1; Konkordija=0.1; Pax=0.1; Ops=0.1; Ananke=0.1`,
  },
  {
    slug: "olimpijske",
    group: "kviz",
    title: "Grad domaćin Olimpijskih igara",
    hint: "Ljetnih ili zimskih",
    strip: ["grad"],
    answers: `Sarajevo=10; Atena=8; London=8; Pariz=7; Peking/Beijing=6; Tokio=6; Los Angeles/LA=5; Barcelona=5; Moskva=4;
      Sydney=4; Rio de Janeiro/Rio=4; Rim=3; Atlanta=3; München/Minhen=3; Seul=2; Berlin=2; Soči=2; Montreal=1.5;
      Vancouver=1.5; Ciudad de Mexico/Mexico City=1; Amsterdam=1; Torino=1; Innsbruck=1; Milano=1; Helsinki=0.8;
      Stockholm=0.8; Salt Lake City=0.8; Lillehammer=0.8; Cortina d'Ampezzo/Cortina=0.8; Pjongčang/PyeongChang=0.8;
      Melbourne=0.5; Nagano=0.5; Calgary=0.5; Grenoble=0.5; Lake Placid=0.5; St. Moritz/Sankt Moritz=0.5; Oslo=0.5;
      Antwerpen=0.3; Brisbane=0.3; Albertville=0.3; Sapporo=0.3; Chamonix=0.3; Garmisch-Partenkirchen/Garmisch=0.3;
      St. Louis=0.2; Squaw Valley=0.1`,
  },
  {
    slug: "zlatna-lopta",
    group: "kviz",
    title: "Dobitnik Zlatne lopte",
    hint: "Nagrada Ballon d'Or za najboljeg nogometaša",
    strip: [],
    answers: `Lionel Messi/Messi=25; Cristiano Ronaldo/Ronaldo/CR7=18; Luka Modrić/Modrić=15; Zinedine Zidane/Zidane=4;
      Ronaldinho=3; Kaká/Kaka=2; Ronaldo Nazário/R9=2; Rodri=2; Karim Benzema/Benzema=2; Andrij Ševčenko/Ševčenko=1;
      Fabio Cannavaro/Cannavaro=1; Luís Figo/Figo=1; Michel Platini/Platini=1; Ousmane Dembélé/Dembele=1;
      Pavel Nedvěd/Nedved=0.8; Michael Owen/Owen=0.8; Rivaldo=0.8; Roberto Baggio/Baggio=0.8;
      Marco van Basten/Van Basten=0.8; Franz Beckenbauer/Beckenbauer=0.8; Johan Cruyff/Cruyff=0.8;
      Hristo Stoičkov/Stoičkov=0.5; George Weah/Weah=0.5; Lothar Matthäus/Matthäus=0.5; Ruud Gullit/Gullit=0.5;
      Matthias Sammer/Sammer=0.3; Jean-Pierre Papin/Papin=0.3; Paolo Rossi=0.3; Karl-Heinz Rummenigge/Rummenigge=0.3;
      Gerd Müller=0.3; George Best=0.3; Eusébio/Eusebio=0.3; Bobby Charlton=0.3; Lav Jašin/Jašin=0.3;
      Alfredo Di Stéfano/Di Stefano=0.3; Kevin Keegan/Keegan=0.2; Igor Belanov=0.1; Allan Simonsen=0.1;
      Oleg Blohin=0.1; Gianni Rivera=0.1; Florian Albert=0.1; Denis Law=0.1; Josef Masopust=0.1; Omar Sívori/Sivori=0.1;
      Raymond Kopa/Kopa=0.1; Stanley Matthews=0.1; Luis Suárez Miramontes=0.05`,
  },
  {
    slug: "nba",
    group: "kviz",
    title: "NBA klub",
    strip: [],
    answers: `Chicago Bulls/Bulls=15; Los Angeles Lakers/Lakers=15; Boston Celtics/Celtics=6;
      Golden State Warriors/Warriors=5; Miami Heat/Heat=4; New York Knicks/Knicks=3; Houston Rockets/Rockets=2;
      San Antonio Spurs/Spurs=2; Brooklyn Nets/Nets/New Jersey Nets=2; Dallas Mavericks/Mavericks/Mavs=2;
      Philadelphia 76ers/76ers/Sixers=1.5; Detroit Pistons/Pistons=1.5; Phoenix Suns/Suns=1.5;
      Denver Nuggets/Nuggets=1.5; Cleveland Cavaliers/Cavaliers/Cavs=1.5; Utah Jazz/Jazz=1.5; Orlando Magic/Magic=1;
      Los Angeles Clippers/Clippers=1; Toronto Raptors/Raptors=1; Milwaukee Bucks/Bucks=1; Sacramento Kings/Kings=0.8;
      Portland Trail Blazers/Trail Blazers/Blazers=0.8; Atlanta Hawks/Hawks=0.8;
      Oklahoma City Thunder/Thunder/OKC=0.8; Minnesota Timberwolves/Timberwolves=0.5; Indiana Pacers/Pacers=0.5;
      Memphis Grizzlies/Grizzlies=0.5; Charlotte Hornets/Hornets=0.5; Washington Wizards/Wizards=0.5;
      New Orleans Pelicans/Pelicans=0.3; Minneapolis Lakers=0.3; Vancouver Grizzlies=0.3;
      Washington Bullets/Bullets=0.3; Charlotte Bobcats/Bobcats=0.2; New Orleans Hornets=0.2; Baltimore Bullets=0.1;
      Buffalo Braves=0.1; San Diego Clippers=0.1; Kansas City Kings=0.1; Cincinnati Royals=0.1; Rochester Royals=0.1;
      Philadelphia Warriors=0.1; San Francisco Warriors=0.1; Syracuse Nationals=0.1; Fort Wayne Pistons=0.1;
      St. Louis Hawks=0.1; Milwaukee Hawks=0.1; Tri-Cities Blackhawks=0.1; Chicago Zephyrs=0.1; New Orleans Jazz=0.1;
      San Diego Rockets=0.1; Anderson Packers=0.1; Waterloo Hawks=0.1; Indianapolis Olympians=0.1;
      Washington Capitols=0.1; Chicago Stags=0.1; Providence Steamrollers=0.1; Toronto Huskies=0.1;
      St. Louis Bombers=0.1; Cleveland Rebels=0.1; Detroit Falcons=0.1; Pittsburgh Ironmen=0.1;
      Sheboygan Red Skins=0.1`,
  },
  {
    slug: "shakespeare",
    group: "kviz",
    title: "Shakespeareovo djelo",
    strip: [],
    answers: `Romeo i Julija=25; Hamlet=20; Macbeth/Magbet=8; Othello/Otelo=6; Kralj Lear=5; San ivanjske noći=5;
      Ukroćena goropadnica=3; Mletački trgovac=3; Julije Cezar=3; Bura=2; Mnogo vike ni za što=2;
      Na tri kralja/Bogojavljenska noć=1; Rikard III/Richard III=1; Antonije i Kleopatra=1; Kako vam drago=0.8;
      Henrik V=0.5; Soneti=0.5; Henrik IV=0.3; Tit Andronik=0.3; Zimska priča=0.3; Komedija zabune=0.3;
      Vesele žene windsorske=0.3; Sve je dobro što se dobro svrši=0.3; Henrik VIII=0.2; Rikard II/Richard II=0.2;
      Koriolan=0.2; Dva veronska plemića=0.2; Uzaludni ljubavni trud=0.2; Mjera za mjeru=0.2; Henrik VI=0.1;
      Kralj Ivan=0.1; Timon Atenjanin=0.1; Troilo i Kresida=0.1; Cimbelin=0.1; Perikle=0.1; Venera i Adonis=0.1;
      Otmica Lukrecije/Lukrecija=0.3; Feniks i grlica=0.1; Ljubavnikova tužaljka=0.1; Strastveni hodočasnik=0.1;
      Edvard III/Edward III=0.1; Sir Thomas More=0.1; Dva plemenita rođaka=0.1; Cardenio=0.1`,
  },
  {
    slug: "skladatelj",
    group: "kviz",
    title: "Skladatelj klasične ili filmske glazbe",
    strip: [],
    answers: `Wolfgang Amadeus Mozart/Mozart=20; Ludwig van Beethoven/Beethoven=18; Johann Sebastian Bach/Bach=10;
      Antonio Vivaldi/Vivaldi=6; Čajkovski/Tchaikovsky=5; Frédéric Chopin/Chopin=5; Giuseppe Verdi/Verdi=3;
      Franz Schubert/Schubert=2; Johann Strauss/Strauss=2; Richard Wagner/Wagner=2; Joseph Haydn/Haydn=2;
      Händel/Handel=1.5; Giacomo Puccini/Puccini=1.5; Johannes Brahms/Brahms=1.5; Ivan Zajc/Zajc=1.5;
      Vatroslav Lisinski/Lisinski=1.5; Gioachino Rossini/Rossini=1; Franz Liszt/Liszt/List=1;
      Claude Debussy/Debussy=1; Hans Zimmer/Zimmer=1; Ennio Morricone/Morricone=1; Maurice Ravel/Ravel=0.8;
      Edvard Grieg/Grieg=0.8; Antonín Dvořák/Dvorak=0.8; Gustav Mahler/Mahler=0.5; Felix Mendelssohn/Mendelssohn=0.5;
      Robert Schumann/Schumann=0.5; Igor Stravinski/Stravinski/Stravinsky=0.5; Sergej Rahmanjinov/Rahmanjinov=0.5;
      Georges Bizet/Bizet=0.5; Niccolò Paganini/Paganini=0.5; John Williams=0.5; Jakov Gotovac/Gotovac=0.5;
      Sergej Prokofjev/Prokofjev=0.3; Dmitrij Šostakovič/Šostakovič=0.3; Modest Musorgski/Musorgski=0.3;
      Rimski-Korsakov=0.3; George Gershwin/Gershwin=0.3; Bedřich Smetana/Smetana=0.3; Dora Pejačević/Pejačević=0.3;
      Antonio Salieri/Salieri=0.3; Ludovico Einaudi/Einaudi=0.3; Leonard Bernstein/Bernstein=0.2;
      Erik Satie/Satie=0.2; Jean Sibelius/Sibelius=0.2; Béla Bartók/Bartok=0.2; Edward Elgar/Elgar=0.2;
      Boris Papandopulo/Papandopulo=0.2; Blagoje Bersa/Bersa=0.2; Ivo Tijardović/Tijardović=0.2;
      Claudio Monteverdi/Monteverdi=0.1; Henry Purcell/Purcell=0.1; Georg Philipp Telemann/Telemann=0.1;
      Luka Sorkočević/Sorkočević=0.1; Christoph Willibald Gluck/Gluck=0.1; Jacques Offenbach/Offenbach=0.1;
      Camille Saint-Saëns/Saint-Saens=0.1; Philip Glass=0.1; Julije Bajamonti/Bajamonti=0.05; Pachelbel=0.5;
      James Horner/Horner=0.5; Vangelis=0.5; Goran Bregović/Bregović=0.5; Andrew Lloyd Webber/Lloyd Webber=0.5;
      Josip Hatze/Hatze=0.3; Fran Lhotka/Lhotka=0.3; Krešimir Baranović/Baranović=0.3; Alfi Kabiljo/Kabiljo=0.3;
      Franz von Suppé/Suppé=0.3; Tomaso Albinoni/Albinoni=0.3; Domenico Scarlatti/Scarlatti=0.3;
      Vincenzo Bellini/Bellini=0.3; Gaetano Donizetti/Donizetti=0.3; Hector Berlioz/Berlioz=0.3;
      Anton Bruckner/Bruckner=0.3; Richard Strauss=0.3; Franz Lehár/Lehár=0.3; Aram Hačaturjan/Hačaturjan=0.3;
      Gustav Holst/Holst=0.3; Carl Orff/Orff=0.3; Arnold Schönberg/Schönberg=0.3; John Cage=0.3;
      Astor Piazzolla/Piazzolla=0.3; Yann Tiersen/Tiersen=0.3; Howard Shore=0.3; Danny Elfman/Elfman=0.3;
      Ramin Djawadi/Djawadi=0.3; Joe Hisaishi/Hisaishi=0.3; Nino Rota=0.3; Ivan Lukačić=0.2; Stjepan Šulek/Šulek=0.2;
      Milko Kelemen=0.2; Igor Kuljerić=0.2; Ferdo Livadić/Livadić=0.2; Josip Slavenski/Slavenski=0.2; Đelo Jusić=0.2;
      Arcangelo Corelli/Corelli=0.2; Jean-Philippe Rameau/Rameau=0.2; Jean-Baptiste Lully/Lully=0.2; Palestrina=0.2;
      Carl Czerny/Czerny=0.2; Carl Maria von Weber=0.2; Pietro Mascagni/Mascagni=0.2;
      Ruggero Leoncavallo/Leoncavallo=0.2; Charles Gounod/Gounod=0.2; Gabriel Fauré/Fauré=0.2;
      Emmerich Kálmán/Kálmán=0.2; Aleksandr Borodin/Borodin=0.2; Mihail Glinka/Glinka=0.2;
      Aleksandr Skrjabin/Skrjabin=0.2; Leoš Janáček/Janáček=0.2; György Ligeti/Ligeti=0.2;
      Benjamin Britten/Britten=0.2; Arvo Pärt=0.2; Aaron Copland/Copland=0.2; Scott Joplin=0.2;
      Michael Nyman/Nyman=0.2; Alan Silvestri=0.2; Jerry Goldsmith=0.2; John Barry=0.2; Ludwig Göransson=0.2;
      Alexandre Desplat=0.2; Henry Mancini=0.2; Bernard Herrmann=0.2; Michael Giacchino=0.2; Justin Hurwitz=0.2;
      Krsto Odak=0.1; Antun Dobronić=0.1; Milo Cipra=0.1; Ivo Lhotka-Kalinski=0.1; Natko Devčić=0.1; Ruben Radica=0.1;
      Ivo Malec=0.1; Frano Parać=0.1; Anđelko Klobučar=0.1; Ivan Padovec=0.1; Rudolf Matz=0.1; Božidar Kunc=0.1;
      Pergolesi=0.1; François Couperin=0.1; Dietrich Buxtehude=0.1; C. P. E. Bach=0.1; Luigi Boccherini=0.1;
      Muzio Clementi=0.1; Johann Nepomuk Hummel=0.1; Jules Massenet=0.1; Léo Delibes=0.1; César Franck=0.1;
      Zoltán Kodály=0.1; Krzysztof Penderecki=0.1; Henryk Górecki=0.1; Witold Lutosławski=0.1;
      Ralph Vaughan Williams=0.1; Paul Hindemith=0.1; Alban Berg=0.1; Anton Webern=0.1; Karlheinz Stockhausen=0.1;
      Steve Reich=0.1; Samuel Barber=0.1; Heitor Villa-Lobos=0.1; Manuel de Falla=0.1; Joaquín Rodrigo=0.1;
      Francis Poulenc=0.1; Olivier Messiaen=0.1; Pierre Boulez=0.1; Max Richter=0.1; Hildur Guðnadóttir=0.1;
      Clint Mansell=0.1; Zbigniew Preisner=0.1; Koji Kondo=0.1; Hildegarda iz Bingena=0.1`,
  },
  {
    slug: "slikar",
    group: "kviz",
    title: "Slikar ili kipar",
    strip: [],
    answers: `Leonardo da Vinci/Da Vinci/Leonardo=15; Pablo Picasso/Picasso=15; Vincent van Gogh/Van Gogh=12;
      Michelangelo=6; Salvador Dalí/Dali=5; Claude Monet/Monet=4; Rembrandt=3; Rafael/Raffaello=2;
      Frida Kahlo/Frida=2; Edvard Munch/Munch=1.5; Gustav Klimt/Klimt=1.5; Andy Warhol/Warhol=1.5;
      Vlaho Bukovac/Bukovac=1.5; Ivan Meštrović/Meštrović=1.5; Botticelli=1; Caravaggio=1; Renoir=1; Banksy=1;
      Ivan Generalić/Generalić=1; Paul Cézanne/Cezanne=0.8; Edgar Degas/Degas=0.8; Edo Murtić/Murtić=0.8; Tizian=0.5;
      Édouard Manet/Manet=0.5; Paul Gauguin/Gauguin=0.5; Henri Matisse/Matisse=0.5;
      Vasilij Kandinski/Kandinski/Kandinsky=0.5; Rubens=0.5; Francisco Goya/Goya=0.5; Vermeer=0.5;
      Jackson Pollock/Pollock=0.5; Auguste Rodin/Rodin=0.5; Piet Mondrian/Mondrian=0.3; René Magritte/Magritte=0.3;
      Diego Velázquez/Velazquez=0.3; El Greco=0.3; Albrecht Dürer/Dürer=0.3; Hieronymus Bosch/Bosch=0.3;
      Toulouse-Lautrec=0.3; Marc Chagall/Chagall=0.3; Ivan Rabuzin/Rabuzin=0.3; Antun Augustinčić/Augustinčić=0.3;
      Donatello=0.3; Pieter Bruegel/Bruegel=0.2; William Turner/Turner=0.2; Joan Miró/Miro=0.2;
      Egon Schiele/Schiele=0.2; Giotto=0.2; Miroslav Kraljević=0.2; Josip Račić/Račić=0.2; Oton Iveković/Iveković=0.2;
      Julije Klović/Juraj Klović/Klović=0.2; Bernini=0.2; Hokusai=0.1; Tintoretto=0.1; Celestin Medović/Medović=0.1;
      Mirko Virius/Virius=0.1; Ignjat Job=0.1; Andrija Medulić/Medulić=0.1; Menci Clement Crnčić/Crnčić=0.1;
      Ljubo Babić=0.1; Ivo Dulčić/Dulčić=0.1; Amedeo Modigliani/Modigliani=0.3; Juraj Dalmatinac=0.3; Bob Ross=0.2;
      Paul Klee/Klee=0.2; Georges Seurat/Seurat=0.2; Eugène Delacroix/Delacroix=0.2; Edward Hopper/Hopper=0.2;
      Mark Rothko/Rothko=0.2; Jean-Michel Basquiat/Basquiat=0.2; Kazimir Maljevič/Maljevič/Malevich=0.2;
      Alfons Mucha/Mucha=0.2; Fernando Botero/Botero=0.2; Majstor Radovan/Radovan=0.2; Slava Raškaj/Raškaj=0.2;
      Oton Gliha/Gliha=0.2; Ivan Kožarić/Kožarić=0.2; Ivan Lacković Croata/Lacković=0.2;
      Krsto Hegedušić/Hegedušić=0.2; Vjekoslav Karas/Karas=0.2; Camille Pissarro/Pissarro=0.1; Henri Rousseau=0.1;
      Jan van Eyck/Van Eyck=0.1; Anthony van Dyck/Van Dyck=0.1; Fra Angelico=0.1; Piero della Francesca=0.1;
      Masaccio=0.1; Andrea Mantegna/Mantegna=0.1; Giovanni Bellini/Bellini=0.1; Giorgione=0.1;
      Paolo Veronese/Veronese=0.1; Canaletto=0.1; Tiepolo=0.1; Nicolas Poussin/Poussin=0.1; Jacques-Louis David=0.1;
      Jean-Auguste-Dominique Ingres/Ingres=0.1; Gustave Courbet/Courbet=0.1; Jean-François Millet/Millet=0.1;
      Caspar David Friedrich=0.1; John Constable/Constable=0.1; Thomas Gainsborough/Gainsborough=0.1;
      William Blake=0.1; Dante Gabriel Rossetti/Rossetti=0.1; James Whistler/Whistler=0.1; Georgia O’Keeffe=0.1;
      Roy Lichtenstein/Lichtenstein=0.1; Keith Haring/Haring=0.1; David Hockney/Hockney=0.1; Francis Bacon=0.1;
      Lucian Freud=0.1; Damien Hirst/Hirst=0.1; Jeff Koons/Koons=0.1; Ai Weiwei=0.1; Marcel Duchamp/Duchamp=0.1;
      Max Ernst=0.1; Giorgio de Chirico/De Chirico=0.1; Umberto Boccioni/Boccioni=0.1; Ilja Rjepin/Rjepin=0.1;
      Ivan Ajvazovski/Ajvazovski=0.1; Oskar Kokoschka/Kokoschka=0.1; Franz Marc=0.1; Frans Hals=0.1;
      Bartolomé Esteban Murillo/Murillo=0.1; Joaquín Sorolla/Sorolla=0.1; Diego Rivera=0.1;
      Constantin Brâncuși/Brancusi=0.1; Alberto Giacometti/Giacometti=0.1; Henry Moore=0.1; Antonio Canova/Canova=0.1;
      Camille Claudel=0.1; Fidija/Phidias=0.1; Praksitel/Praxiteles=0.1; Lorenzo Ghiberti/Ghiberti=0.1;
      Benvenuto Cellini/Cellini=0.1; Artemisia Gentileschi/Gentileschi=0.1; Tamara de Lempicka/Lempicka=0.1;
      Yayoi Kusama/Kusama=0.1; Norman Rockwell/Rockwell=0.1; Utagawa Hiroshige/Hiroshige=0.1; Nikola Firentinac=0.1;
      Andrija Aleši/Aleši=0.1; Federiko Benković/Benković=0.1; Frano Kršinić/Kršinić=0.1; Vanja Radauš/Radauš=0.1;
      Kosta Angeli Radovani=0.1; Dušan Džamonja/Džamonja=0.1; Vojin Bakić/Bakić=0.1; Marija Ujević-Galetović=0.1;
      Nasta Rojc/Rojc=0.1; Emanuel Vidović/Vidović=0.1; Nikola Mašić/Mašić=0.1; Đuro Seder/Seder=0.1;
      Julije Knifer/Knifer=0.1; Josip Generalić=0.1; Ivan Večenaj/Večenaj=0.1; Dragan Gaži/Gaži=0.1; Mijo Kovačić=0.1;
      Marino Tartaglia/Tartaglia=0.1; Ljubo Ivančić=0.1; Gabrijel Jurkić/Jurkić=0.1; Bela Čikoš Sesija/Čikoš=0.1;
      Jerolim Miše/Miše=0.1; Zlatko Prica/Prica=0.1; Edo Kovačević=0.1; Antun Motika/Motika=0.1;
      Blaž Jurjev Trogiranin=0.1; Nikola Božidarević/Božidarević=0.1; Lovro Dobričević=0.1;
      Robert Frangeš-Mihanović/Frangeš=0.1; Rudolf Valdec/Valdec=0.1; Toma Rosandić/Rosandić=0.1;
      Branislav Dešković/Dešković=0.1`,
  },
  {
    slug: "pokemon",
    group: "kviz",
    title: "Pokémon",
    strip: [],
    answers: `Pikachu/Pikaču=30; Charizard=8; Charmander=6; Bulbasaur=5; Squirtle=5; Jigglypuff=3; Mewtwo=3; Mew=2;
      Psyduck=2; Meowth=2; Eevee=2; Snorlax=2; Gengar=1.5; Magikarp=1.5; Lucario=1; Gyarados=1; Dragonite=1; Onix=1;
      Togepi=1; Raichu=1; Blastoise=0.8; Ditto=0.8; Geodude=0.5; Venusaur=0.5; Pichu=0.5; Vulpix=0.5; Butterfree=0.5;
      Pidgey=0.5; Rattata=0.5; Zubat=0.5; Lapras=0.5; Ivysaur=0.3; Wartortle=0.3; Charmeleon=0.3; Caterpie=0.3;
      Ekans=0.3; Machamp=0.3; Abra=0.3; Alakazam=0.3; Slowpoke=0.3; Vaporeon=0.3; Articuno=0.3; Zapdos=0.3;
      Moltres=0.3; Lugia=0.3; Rayquaza=0.3; Greninja=0.3; Ninetales=0.2; Weedle=0.2; Arbok=0.2; Kadabra=0.2;
      Jolteon=0.2; Flareon=0.2; Chikorita=0.2; Cyndaquil=0.2; Totodile=0.2; Ho-Oh=0.2; Mudkip=0.2; Sylveon=0.2;
      Umbreon=0.2; Marill=0.2; Wobbuffet=0.2; Chansey=0.2; Clefairy=0.2; Cubone=0.2; Celebi=0.1; Treecko=0.1;
      Torchic=0.1; Groudon=0.1; Kyogre=0.1; Piplup=0.1; Espeon=0.1; Gardevoir=0.1; Garchomp=0.1; Diglett=0.3;
      Pidgeot=0.2; Sandshrew=0.2; Growlithe=0.2; Arcanine=0.2; Machop=0.2; Ponyta=0.2; Magnemite=0.2; Gastly=0.2;
      Haunter=0.2; Voltorb=0.2; Koffing=0.2; Staryu=0.2; Mr. Mime=0.2; Scyther=0.2; Dratini=0.2; Metapod=0.2;
      Rowlet=0.2; Mimikyu=0.2; Arceus=0.2; Blaziken=0.2; Pidgeotto=0.1; Raticate=0.1; Spearow=0.1; Fearow=0.1;
      Sandslash=0.1; Nidoran=0.1; Nidoking=0.1; Nidoqueen=0.1; Clefable=0.1; Wigglytuff=0.1; Golbat=0.1; Oddish=0.1;
      Gloom=0.1; Vileplume=0.1; Paras=0.1; Venonat=0.1; Dugtrio=0.1; Persian=0.1; Golduck=0.1; Mankey=0.1;
      Primeape=0.1; Poliwag=0.1; Poliwhirl=0.1; Poliwrath=0.1; Machoke=0.1; Bellsprout=0.1; Tentacool=0.1;
      Tentacruel=0.1; Graveler=0.1; Golem=0.1; Rapidash=0.1; Slowbro=0.1; Magneton=0.1; Farfetch'd=0.1; Doduo=0.1;
      Seel=0.1; Dewgong=0.1; Grimer=0.1; Muk=0.1; Shellder=0.1; Cloyster=0.1; Drowzee=0.1; Hypno=0.1; Krabby=0.1;
      Kingler=0.1; Electrode=0.1; Exeggcute=0.1; Exeggutor=0.1; Marowak=0.1; Hitmonlee=0.1; Hitmonchan=0.1;
      Lickitung=0.1; Weezing=0.1; Rhyhorn=0.1; Rhydon=0.1; Tangela=0.1; Kangaskhan=0.1; Horsea=0.1; Seadra=0.1;
      Goldeen=0.1; Seaking=0.1; Starmie=0.1; Jynx=0.1; Electabuzz=0.1; Magmar=0.1; Pinsir=0.1; Tauros=0.1;
      Porygon=0.1; Omanyte=0.1; Omastar=0.1; Kabuto=0.1; Kabutops=0.1; Aerodactyl=0.1; Dragonair=0.1; Kakuna=0.1;
      Beedrill=0.1; Togekiss=0.1; Riolu=0.1; Bidoof=0.1; Pachirisu=0.1; Snivy=0.1; Tepig=0.1; Oshawott=0.1;
      Chespin=0.1; Fennekin=0.1; Froakie=0.1; Litten=0.1; Popplio=0.1; Grookey=0.1; Scorbunny=0.1; Sobble=0.1;
      Sprigatito=0.1; Fuecoco=0.1; Quaxly=0.1; Zekrom=0.1; Reshiram=0.1; Dialga=0.1; Palkia=0.1; Giratina=0.1;
      Darkrai=0.1; Deoxys=0.1; Jirachi=0.1; Latias=0.1; Latios=0.1; Suicune=0.1; Entei=0.1; Raikou=0.1; Tyranitar=0.1;
      Scizor=0.1; Steelix=0.1; Wooper=0.1; Sudowoodo=0.1; Heracross=0.1; Ampharos=0.1; Mareep=0.1; Sceptile=0.1;
      Swampert=0.1; Absol=0.1; Salamence=0.1; Metagross=0.1; Infernape=0.1; Lopunny=0.1; Zoroark=0.1; Zorua=0.1;
      Decidueye=0.1; Incineroar=0.1; Zacian=0.1; Wailord=0.1; Corsola=0.1; Munchlax=0.1; Ralts=0.1; Gallade=0.1;
      Turtwig=0.1; Torterra=0.1; Chimchar=0.1; Shinx=0.1; Luxray=0.1; Gible=0.1; Leafeon=0.1; Glaceon=0.1`,
  },
  {
    slug: "beatles",
    group: "kviz",
    title: "Pjesma Beatlesa",
    strip: [],
    answers: `Yesterday=15; Let It Be=12; Hey Jude=12; Yellow Submarine=8; Help=5; Come Together=4;
      Here Comes the Sun=4; All You Need Is Love=3; Twist and Shout=3; Love Me Do=3; She Loves You=2;
      I Want to Hold Your Hand=2; Strawberry Fields Forever/Strawberry Fields=2; Penny Lane=1.5; Michelle=1.5;
      A Hard Day's Night=1.5; Eleanor Rigby=1.5; Lucy in the Sky with Diamonds/Lucy in the Sky=1.5;
      Ob-La-Di, Ob-La-Da/Obladi Oblada=1.5; Something=1; Can't Buy Me Love=1; Get Back=1; Blackbird=1;
      Hello, Goodbye/Hello Goodbye=1; While My Guitar Gently Weeps=0.8; Norwegian Wood=0.5; All My Loving=0.5;
      Drive My Car=0.5; Eight Days a Week=0.5; Ticket to Ride=0.5; Revolution=0.5; In My Life=0.5;
      With a Little Help from My Friends=0.5; Sgt. Pepper's Lonely Hearts Club Band/Sgt. Pepper=0.5;
      The Long and Winding Road=0.5; Day Tripper=0.3; Paperback Writer=0.3; Nowhere Man=0.3; A Day in the Life=0.3;
      Helter Skelter=0.3; I Am the Walrus=0.3; Across the Universe=0.3; Don't Let Me Down=0.3; Octopus's Garden=0.3;
      And I Love Her=0.3; Girl=0.3; Please Please Me=0.3; Back in the USSR=0.3; Taxman=0.2;
      Here, There and Everywhere=0.2; From Me to You=0.2; I Saw Her Standing There=0.2; Golden Slumbers=0.1;
      Rocky Raccoon=0.1; Maxwell's Silver Hammer=0.1; Dear Prudence=0.1; Julia=0.1; The Ballad of John and Yoko=0.1;
      Hey Bulldog=0.1; Got to Get You into My Life=0.1; Tomorrow Never Knows=0.1; I Feel Fine=0.5;
      We Can Work It Out=0.5; Lady Madonna=0.5; Magical Mystery Tour=0.3; The Fool on the Hill/Fool on the Hill=0.3;
      When I'm Sixty-Four/When I'm 64=0.3; Now and Then=0.3; Oh! Darling=0.3; Rain=0.2; Birthday=0.2;
      Getting Better=0.2; She's Leaving Home=0.2; Lovely Rita=0.2; Good Day Sunshine=0.2; All Together Now=0.2;
      Free as a Bird=0.2; Rock and Roll Music=0.2; Roll Over Beethoven=0.2; P.S. I Love You=0.2;
      I've Got a Feeling=0.2; I Should Have Known Better=0.2; You've Got to Hide Your Love Away=0.2; Because=0.1;
      Sun King=0.1; Mean Mr. Mustard=0.1; Polythene Pam=0.1; Carry That Weight=0.1; Her Majesty=0.1; Two of Us=0.1;
      Dig a Pony=0.1; One After 909=0.1; I Me Mine=0.1; Fixing a Hole=0.1; Flying=0.1; Blue Jay Way=0.1;
      Your Mother Should Know=0.1; Glass Onion=0.1; Happiness Is a Warm Gun=0.1; Martha My Dear=0.1; Sexy Sadie=0.1;
      Honey Pie=0.1; Yer Blues=0.1; Good Night=0.1; Cry Baby Cry=0.1; Savoy Truffle=0.1; Mother Nature's Son=0.1;
      I Will=0.1; Doctor Robert=0.1; And Your Bird Can Sing=0.1; For No One=0.1; She Said She Said=0.1;
      I'm Only Sleeping=0.1; Think for Yourself=0.1; I'm Looking Through You=0.1; If I Needed Someone=0.1;
      Run for Your Life=0.1; You Won't See Me=0.1; I've Just Seen a Face=0.1; I'm Down=0.1; The Night Before=0.1;
      No Reply=0.1; I'm a Loser=0.1; Baby's in Black=0.1; She's a Woman=0.1; I'll Follow the Sun=0.1;
      Things We Said Today=0.1; Tell Me Why=0.1; Till There Was You=0.1; Please Mister Postman/Please Mr. Postman=0.1;
      It Won't Be Long=0.1; Misery=0.1; Do You Want to Know a Secret=0.1; This Boy=0.1; Long Tall Sally=0.1;
      Old Brown Shoe=0.1; Real Love=0.1; Dizzy Miss Lizzy=0.1; Act Naturally=0.1;
      The Continuing Story of Bungalow Bill/Bungalow Bill=0.1; If I Fell=0.1; Within You Without You=0.1;
      Good Morning Good Morning=0.1; Being for the Benefit of Mr. Kite/Mr. Kite=0.1`,
  },
  {
    slug: "f1-prvak",
    group: "kviz",
    title: "Svjetski prvak Formule 1",
    strip: [],
    answers: `Michael Schumacher/Schumacher=20; Lewis Hamilton/Hamilton=18; Max Verstappen/Verstappen=12;
      Ayrton Senna/Senna=8; Sebastian Vettel/Vettel=6; Fernando Alonso/Alonso=5; Niki Lauda/Lauda=4;
      Alain Prost/Prost=3; Kimi Räikkönen/Raikkonen=3; Mika Häkkinen/Hakkinen=2; Nico Rosberg/Rosberg=1.5;
      Jenson Button/Button=1.5; Lando Norris/Norris=1.5; Damon Hill=1; Nigel Mansell/Mansell=1;
      Juan Manuel Fangio/Fangio=1; Nelson Piquet/Piquet=0.8; James Hunt/Hunt=0.8; Jacques Villeneuve/Villeneuve=0.5;
      Jackie Stewart/Stewart=0.5; Emerson Fittipaldi/Fittipaldi=0.5; Graham Hill=0.3; Jim Clark=0.3;
      Mario Andretti/Andretti=0.3; Jack Brabham/Brabham=0.3; Keke Rosberg=0.2; Jody Scheckter/Scheckter=0.1;
      Alan Jones=0.1; Jochen Rindt/Rindt=0.1; John Surtees/Surtees=0.1; Alberto Ascari/Ascari=0.1;
      Giuseppe Farina/Nino Farina=0.1; Denny Hulme/Hulme=0.05; Phil Hill=0.05; Mike Hawthorn/Hawthorn=0.05`,
  },
  {
    slug: "biblija",
    group: "kviz",
    title: "Lik iz Biblije",
    strip: ["sveti"],
    answers: `Isus/Isus Krist/Krist=15; Marija/Djevica Marija/Bogorodica=8; Mojsije=6; Adam=6; Eva=5; Noa=5; Josip=3;
      Abraham=3; David=3; Golijat=3; Petar/Sveti Petar=3; Juda=3; Kajin=3; Salomon=2; Pavao/Sveti Pavao=2;
      Ivan Krstitelj/Ivan=2; Abel=2; Samson=2; Lazar=1.5; Marija Magdalena=1.5; Poncije Pilat/Pilat=1.5;
      Sotona/Lucifer/Đavao=1.5; Dalila=1; Toma/Nevjerni Toma=1; Matej=1; Marko=1; Luka=1; Jakov=1; Izak=1; Jona=1;
      Job=1; Herod=1; Arkanđeo Gabrijel/Gabrijel=1; Ilija=0.5; Daniel=0.5; Saul=0.5; Arkanđeo Mihael/Mihael=0.5;
      Tri kralja=0.5; Ruta=0.3; Ester=0.3; Sara=0.3; Izaija=0.3; Jošua/Jozue=0.3; Andrija=0.3; Lot=0.3; Metuzalem=0.3;
      Baraba=0.3; Rafael=0.2; Rebeka=0.2; Rahela=0.2; Jeremija=0.2; Ezekiel=0.2; Gideon=0.2; Stjepan=0.2; Filip=0.2;
      Šimun=0.2; Elizabeta=0.2; Zaharija=0.2; Lea=0.1; Elizej=0.1; Barnaba=0.1; Bartolomej=0.1; Tadej=0.1; Matija=0.1;
      Nikodem=0.1; Zakej=0.1; Set=0.1; Absalom=0.1; Batšeba=0.1; Jezabela=0.1; Bog/Jahve/Bog Otac=0.5; Aron=0.3;
      Faraon=0.3; Duh Sveti=0.2; Zmija=0.2; Ezav=0.2; Benjamin=0.2; Samuel=0.2; Kraljica od Sabe=0.2;
      Nabukodonozor=0.2; Judita=0.2; Marta=0.2; Salome=0.2; Kajfa=0.2; Belzebub=0.2; Šem=0.1; Ham=0.1; Jafet=0.1;
      Hagara=0.1; Jišmael=0.1; Laban=0.1; Ruben=0.1; Levi=0.1; Mirjam=0.1; Kaleb=0.1; Rahaba=0.1; Debora=0.1; Ana=0.1;
      Jonatan=0.1; Natan=0.1; Urija=0.1; Ahab=0.1; Baltazar=0.1; Gašpar=0.1; Melkior=0.1; Holoferno=0.1; Tobija=0.1;
      Mardohej=0.1; Nehemija=0.1; Ezra=0.1; Amos=0.1; Hošea=0.1; Joel=0.1; Mihej=0.1; Malahija=0.1; Nahum=0.1;
      Hagaj=0.1; Josip iz Arimateje=0.1; Herodijada=0.1; Šimun Cirenac=0.1; Timotej=0.1; Tit=0.1; Ananija=0.1;
      Kornelije=0.1; Zebedej=0.1; Simeon=0.1; Filemon=0.1; Levijatan=0.1; Behemot=0.1; Nimrod=0.1; Henok=0.1;
      Lamek=0.1; Melkisedek=0.1; Lotova žena=0.1; Potifar=0.1; Bileam=0.1; Jišaj=0.1; Boaz=0.1; Noemi=0.1; Jiftah=0.1;
      Joab=0.1; Ezekija=0.1`,
  },
  {
    slug: "dinosaur",
    group: "kviz",
    title: "Dinosaur ili pretpovijesni gmaz",
    strip: [],
    answers: `Tiranosaurus/T-rex/Tyrannosaurus/Tiranosaurus rex=25; Triceratops=10; Velociraptor/Raptor=8;
      Brontosaurus=6; Stegosaurus=6; Diplodokus/Diplodocus=4; Pterodaktil/Pterodactylus=4;
      Brahiosaurus/Brachiosaurus=3; Spinosaurus=2; Ankilosaurus/Ankylosaurus=2; Alosaurus/Allosaurus=1;
      Parasaurolophus=0.5; Iguanodon=0.5; Apatosaurus=0.5; Karnotaurus/Carnotaurus=0.5; Giganotosaurus=0.5;
      Mosasaurus=0.5; Pleziosaurus/Plesiosaurus=0.5; Pteranodon=0.5; Dilofosaurus/Dilophosaurus=0.3;
      Pahicefalosaurus/Pachycephalosaurus=0.3; Argentinosaurus=0.2; Ihtiosaurus/Ichthyosaurus=0.2; Oviraptor=0.2;
      Arheopteriks/Archaeopteryx=0.2; Kompsognatus/Compsognathus=0.1; Gallimimus=0.1;
      Terizinosaurus/Therizinosaurus=0.1; Edmontosaurus=0.1; Barionyx/Baryonyx=0.1; Deinonychus=0.1; Megalosaurus=0.3;
      Dimetrodon=0.3; Kvecalkoatl/Quetzalcoatlus=0.3; Hadrosaurus=0.2; Protoceratops=0.2;
      Stirakosaurus/Styracosaurus=0.2; Mikroraptor/Microraptor=0.2; Utahraptor=0.2; Troodon=0.2; Albertosaurus=0.2;
      Karharodontosaurus/Carcharodontosaurus=0.2; Ceratosaurus=0.2; Plateosaurus=0.2; Titanosaurus=0.2;
      Elasmosaurus=0.2; Liopleurodon=0.2; Majasaura/Maiasaura=0.1; Koritosaurus/Corythosaurus=0.1; Lambeosaurus=0.1;
      Centrosaurus=0.1; Pahirinosaurus/Pachyrhinosaurus=0.1; Kasmosaurus/Chasmosaurus=0.1; Torosaurus=0.1;
      Kentrosaurus=0.1; Euoplocephalus=0.1; Nodosaurus=0.1; Gorgosaurus=0.1; Tarbosaurus=0.1; Daspletosaurus=0.1;
      Suchomimus=0.1; Celofizis/Coelophysis=0.1; Herrerasaurus=0.1; Eoraptor=0.1; Mamenchisaurus=0.1;
      Kamarasaurus/Camarasaurus=0.1; Patagotitan=0.1; Dreadnoughtus=0.1; Saltasaurus=0.1; Nigersaurus=0.1;
      Kronosaurus=0.1; Notosaurus/Nothosaurus=0.1; Sarkosuhus/Sarcosuchus=0.1; Deinosuchus=0.1;
      Ramforinhus/Rhamphorhynchus=0.1; Hatzegopteryx=0.1; Psitakosaurus/Psittacosaurus=0.1; Gigantoraptor=0.1;
      Majungasaurus=0.1; Tanystropheus=0.1; Edafosaurus/Edaphosaurus=0.1; Listrosaurus/Lystrosaurus=0.1;
      Histriasaurus=0.1`,
  },
  {
    slug: "rimski-car",
    group: "kviz",
    title: "Rimski car",
    hint: "Zapadni ili istočni (bizantski) car; Julije Cezar nije bio car",
    strip: ["car"],
    answers: `August/Oktavijan=12; Neron=12; Dioklecijan=10; Kaligula=8; Marko Aurelije=6;
      Konstantin/Konstantin Veliki=6; Tiberije=4; Hadrijan=4; Trajan=4; Klaudije=3; Vespazijan=3; Komod=3;
      Justinijan=3; Tit=2; Domicijan=2; Karakala=2; Septimije Sever=1.5; Nerva=1; Antonin Pio=1;
      Elagabal/Heliogabal=1; Julijan/Julijan Apostata=1; Teodozije/Teodozije Veliki=1; Romul Augustul=1; Galba=0.5;
      Oton=0.5; Vitelije=0.5; Lucije Ver=0.5; Geta=0.5; Aleksandar Sever=0.5; Filip Arapin=0.5; Decije=0.5;
      Valerijan=0.5; Aurelijan=0.5; Prob=0.5; Maksimijan=0.5; Galerije=0.5; Maksencije=0.5; Valentinijan=0.5;
      Valens=0.5; Honorije=0.5; Julije Nepot=0.5; Heraklije=0.5; Konstantin XI=0.5; Bazilije II=0.5; Teodora=0.5;
      Pertinaks=0.3; Didije Julijan=0.3; Makrin=0.3; Maksimin Tračanin=0.3; Gordijan=0.3; Galijen=0.3;
      Klaudije Gotski=0.3; Konstancije Klor=0.3; Licinije=0.3; Konstancije II=0.3; Gracijan=0.3; Arkadije=0.3;
      Aleksije Komnen=0.3; Justin=0.3; Kar=0.2; Karin=0.2; Konstans=0.2; Irena=0.2; Lav III=0.2; Mihael Paleolog=0.2;
      Manuel Komnen=0.2; Numerijan=0.1; Jovijan=0.1`,
  },
  {
    slug: "bog-ostali",
    group: "kviz",
    title: "Bog iz nordijske, egipatske, slavenske ili druge negrčke mitologije",
    hint: "Bilo koja mitologija osim grčke i rimske",
    strip: ["bog", "bozica"],
    answers: `Thor/Tor=12; Odin=10; Loki=8; Ra=6; Perun=6; Anubis=5; Oziris=4; Izida=4; Horus=4; Freya/Freja=3;
      Veles=3; Šiva/Shiva=3; Višnu/Vishnu=2.5; Set=2; Svarog=2; Dažbog=2; Brahma=2; Ganeša/Ganesha=2; Quetzalcoatl=2;
      Baldur=1.5; Heimdall=1.5; Mokoš=1.5; Morana=1.5; Tot/Thoth=1.5; Amon/Amon Ra=1.5; Bastet=1.5; Krišna=1.5;
      Kali=1.5; Frigg=1; Tyr=1; Hel=1; Stribog=1; Jarilo=1; Lada=1; Svetovid=1; Triglav=1; Hator=1; Aton=1; Lakšmi=1;
      Amaterasu=1; Marduk=1; Ištar=1; Baal=1; Njord=0.5; Freyr=0.5; Vesna=0.5; Ptah=0.5; Sekhmet=0.5; Sobek=0.5;
      Maat=0.5; Hanuman=0.5; Indra=0.5; Rama=0.5; Huitzilopochtli=0.5; Tlaloc=0.5; Inti=0.5; Pachamama=0.5; Moloh=0.5;
      Ahura Mazda=0.5; Mitra=0.5; Maui=0.5; Bragi=0.3; Idunn=0.3; Radegast=0.3; Živa=0.3; Hapi=0.3; Nut=0.3; Geb=0.3;
      Durga=0.3; Agni=0.3; Susanoo=0.3; Izanagi=0.3; Raijin=0.3; Kukulkan=0.3; Viracocha=0.3; Enlil=0.3; Enki=0.3;
      Inana=0.3; Tiamat=0.3; Dagda=0.3; Lugh=0.3; Morrigan=0.3; Cernunnos=0.3; Tengri=0.3; Kibela=0.3; Pele=0.3;
      Anansi=0.3; Brigid=0.2; Nüwa=0.2; Žadni car=0.2; Olorun=0.2; Shango=0.2; Pangu=0.1; Ukko=0.1`,
  },
  {
    slug: "grcki-junak",
    group: "kviz",
    title: "Junak ili čudovište iz grčke mitologije",
    hint: "Junak, smrtnik, titan ili čudovište, ali ne bogovi s Olimpa",
    strip: [],
    answers: `Heraklo/Herkul=11.5; Ahilej=8; Odisej=6; Perzej=4; Minotaur=4; Tezej=3; Meduza=3; Kiklop/Polifem=3;
      Jazon=2.5; Orfej=2.5; Hektor=2.5; Helena/Lijepa Helena=2.5; Ikar=2.5; Prometej=2.5; Hidra/Lernejska hidra=2.5;
      Kerber/Cerber=2.5; Agamemnon=1.5; Paris=1.5; Edip=1.5; Narcis=1.5; Dedal=1.5; Atlas=1.5; Sizif=1.5; Pandora=1.5; Midas=1.5; Pegaz=1.5;
      Sirene=1.5; Kentaur/Kentauri=1.5; Menelaj=1; Eneja=1; Penelopa=1; Sfinga=1; Tantal=0.8; Bellerofont=0.8;
      Adonis=0.8; Patroklo=0.8; Ajant=0.8; Priam=0.8; Kasandra=0.8; Kirka=0.8; Kalipso=0.8; Medeja=0.8; Arijadna=0.8; Antigona=0.8;
      Elektra=0.8; Andromeda=0.8; Kimera=0.8; Harpije=0.8; Scila=0.8; Haribda=0.8; Gorgone=0.8; Hiron=0.8; Nemejski lav=0.8; Kron=0.8;
      Amazonke=0.8; Argonauti=0.8; Ganimed=0.4; Telemah=0.4; Orest=0.4; Ifigenija=0.4; Klitemnestra=0.4; Jokasta=0.4;
      Atalanta=0.4; Psiha=0.4; Euridika=0.4; Leda=0.4; Europa=0.4; Danaja=0.4; Tifon=0.4; Satir=0.4; Piton=0.4;
      Argus=0.4; Hipolita=0.4; Laokoont=0.4; Diomed=0.4; Nestor=0.4; Pigmalion=0.4; Arahna=0.4; Asklepije=0.4;
      Feton=0.4; Endimion=0.2; Andromaha=0.2; Kasiopeja=0.2; Ehidna=0.2; Talos=0.2; Erimantski vepar=0.2;
      Stimfalidske ptice=0.2; Lamija=0.2; Rea=0.2; Pentezileja=0.2; Filoktet=0.2; Kadmo=0.2; Galateja=0.2; Niobe=0.2;
      Tetida=0.2; Ladon=0.2; Okean=0.2; Hiperion=0.2; Mirmidonci=0.2; Pelej=0.2; Graje=0.1; Empusa=0.1`,
  },
  {
    slug: "hr-vladar",
    group: "kviz",
    title: "Hrvatski vladar, ban ili velikaš",
    hint: "Kralj, knez, ban, velikaš ili šef hrvatske države, bilo kad",
    strip: ["kralj", "ban", "knez"],
    answers: `Tomislav/Kralj Tomislav=15; Josip Jelačić/Jelačić/Ban Jelačić=10; Franjo Tuđman/Tuđman=5;
      Petar Krešimir IV/Krešimir=5; Zvonimir/Dmitar Zvonimir=5; Nikola Šubić Zrinski=5; Petar Zrinski=4;
      Fran Krsto Frankopan=4; Trpimir=3; Branimir=3; Zoran Milanović=2; Višeslav=1.5; Borna=1.5;
      Ljudevit Posavski=1.5; Petar Svačić/Petar Snačić=1.5; Stjepan Mesić=1.5; Kolinda Grabar-Kitarović=1.5;
      Josip Broz Tito/Tito=1.5; Domagoj=1; Mislav=1; Koloman=1; Matija Korvin=1; Marija Terezija=1;
      Hrvoje Vukčić Hrvatinić=1; Pavao Šubić Bribirski=1; Ivan Mažuranić=1; Khuen-Héderváry/Khuen=1;
      Katarina Zrinska=1; Ivo Josipović=1; Ante Pavelić=1; Muncimir=0.5; Zdeslav=0.5; Mutimir=0.5;
      Stjepan Držislav=0.5; Porin=0.5; Bela IV=0.5; Ludovik I=0.5; Žigmund=0.5; Franjo Josip=0.5; Ivan Karlović=0.5;
      Petar Berislavić=0.5; Toma Bakač Erdedi=0.5; Krsto Frankopan=0.5; Nikola Jurišić=0.5; Nikola Iločki=0.5;
      Mihajlo Krešimir II=0.3; Stjepan I=0.3; Krešimir III=0.3; Stjepan II=0.3; Mladen Šubić=0.3; Ferdinand=0.3;
      Bernardin Frankopan=0.3; Juraj Drašković=0.3; Ivan Drašković=0.3; Ladislav Pejačević=0.3; Petar Keglević=0.3;
      Ivaniš Korvin=0.3; Barbara Celjska=0.3; Vladimir Bakarić=0.3; Juraj Zrinski=0.2; Herman Celjski=0.2;
      Svetoslav Suronja=0.1; Ivan Paližna=0.1`,
  },
  {
    slug: "hr-olimpijac",
    group: "kviz",
    title: "Hrvatski osvajač olimpijske medalje",
    hint: "Sportaš ili sportašica; vrijede i medalje Hrvata za Jugoslaviju",
    strip: [],
    answers: `Janica Kostelić/Janica=11.5; Blanka Vlašić/Vlašić=7.5; Sandra Perković/Perković=6; Ivica Kostelić=5.5;
      Dražen Petrović/Dražen=4.5; Goran Ivanišević/Ivanišević/Goran=4.5; Ivano Balić/Balić=4; Toni Kukoč/Kukoč=3;
      Sara Kolak/Kolak=2.5; Dino Rađa/Rađa=2.5; Martin Sinković=2.5; Valent Sinković=2.5; Matea Jelić=2.5; Mate Pavić=2;
      Nikola Mektić/Mektić=2; Marin Čilić/Čilić=2; Donna Vekić/Vekić=2; Igor Vori/Vori=2;
      Domagoj Duvnjak/Duvnjak=2; Ivan Čupić/Čupić=1.5; Ivan Dodig/Dodig=1.5; Mario Ančić/Ančić=1;
      Ivan Ljubičić/Ljubičić=1; Duje Draganja/Draganja=1; Filip Hrgović/Hrgović=1; Tin Srbić/Srbić=1;
      Barbara Matić=1; Damir Martin=1; Mirza Džomba/Džomba=1; Blaženko Lacković/Lacković=1;
      Mate Parlov/Parlov=1; Krešimir Ćosić/Ćosić=1; Josip Pavić=0.9; Giovanni Cernogoraz/Cernogoraz=0.8;
      Josip Glasnović/Glasnović=0.8; Tonći Stipanović/Stipanović=0.8; Šime Fantela/Fantela=0.8; Igor Marenić/Marenić=0.8;
      Petar Metličić/Metličić=0.8; Slavko Goluža/Goluža=0.8; Venio Losert/Losert=0.8; Manuel Štrlek/Štrlek=0.8;
      Mirko Alilović/Alilović=0.8; Zlatko Saračević/Saračević=0.8; Iztok Puc/Puc=0.6; Irfan Smajlagić/Smajlagić=0.6;
      Patrik Ćavar/Ćavar=0.6; Valter Matošević/Matošević=0.6; Goran Perkovac/Perkovac=0.6;
      Lucija Zaninović/Zaninović=0.6; Toni Kanaet/Kanaet=0.6; Matija Ljubek/Ljubek=0.6; Đurđa Bjedov/Bjedov=0.6;
      Perica Bukić=0.6; Maro Joković/Joković=0.6; Sandro Sukno/Sukno=0.6; Sandra Šarić=0.4; Martina Zubčić/Zubčić=0.4;
      Filip Ude/Ude=0.4; Snježana Pejčić/Pejčić=0.4; Dubravko Šimenc/Šimenc=0.4; Samir Barać/Barać=0.4;
      Andro Bušlje/Bušlje=0.4; Petar Muslim/Muslim=0.4; Miho Bošković/Bošković=0.4; Nikša Dobud/Dobud=0.4;
      Igor Hinić/Hinić=0.4; Xavier García/Xavi García/García=0.4; Marko Bijač/Bijač=0.4; Arijan Komazec/Komazec=0.4;
      Stojko Vranković/Vranković=0.4; Žan Tabak/Tabak=0.4; Velimir Perasović/Perasović=0.4;
      Zoran Primorac/Primorac=0.4; Ivan Buljubašić/Buljubašić=0.2; Paulo Obradović/Obradović=0.2;
      Frano Vićan/Vićan=0.2; Damir Burić=0.2; Luka Lončar/Lončar=0.2; Anđelo Šetka/Šetka=0.2; Ivan Krapić/Krapić=0.2;
      Luka Bukić=0.2; Antonio Petković=0.2; Danko Cvjetićanin/Cvjetićanin=0.2; Vladan Alanović/Alanović=0.2;
      Aramis Naglić/Naglić=0.2; Alan Gregov/Gregov=0.2; Franjo Arapović/Arapović=0.2; Mihovil Nakić/Nakić=0.2;
      Željko Jerkov/Jerkov=0.2; Nikša Kaleb/Kaleb=0.2; Davor Dominiković/Dominiković=0.2; Goran Šprem/Šprem=0.2;
      Vedran Zrnić/Zrnić=0.2; Renato Sulić/Sulić=0.2; Denis Špoljarić/Špoljarić=0.2; Drago Vuković=0.2;
      Marko Kopljar/Kopljar=0.2; Denis Buntić/Buntić=0.2; Jakov Gojun/Gojun=0.2; Željko Musa/Musa=0.2;
      Zlatko Horvat=0.2; Hrvoje Horvat=0.2; Anton Josipović=0.2; Nikša Skelin=0.2; Siniša Skelin=0.2;
      Goran Prpić/Prpić=0.2; Stjepan Bobek/Bobek=0.2; Bernard Vukas/Vukas=0.2; Andro Knego/Knego=0.2;
      Tonči Valčić/Valčić=0.2; Bruno Gudelj/Gudelj=0.2; Božidar Jović=0.2; Nenad Kljaić/Kljaić=0.2;
      Alvaro Načinović/Načinović=0.2; Zdravko Miljak/Miljak=0.2; Mirko Bašić/Bašić=0.2; Mirko Nišović/Nišović=0.2;
      David Šain/Šain=0.2; Tomislav Smoljanović/Smoljanović=0.2; Igor Boraska/Boraska=0.2; Vlado Lisjak/Lisjak=0.1;
      Franjo Mihalić/Mihalić=0.1`,
  },
  {
    slug: "nobel",
    group: "kviz",
    title: "Dobitnik Nobelove nagrade",
    hint: "Osoba ili organizacija, u bilo kojoj kategoriji",
    strip: [],
    answers: `Albert Einstein/Einstein=12.5; Marie Curie/Marija Curie/Curie/Marie Skłodowska-Curie=7;
      Ivo Andrić/Andrić=6; Lavoslav Ružička/Leopold Ružička/Ružička=4.5; Vladimir Prelog/Prelog=3.5;
      Majka Tereza/Majka Terezija=3.5; Martin Luther King/MLK=2.5; Nelson Mandela/Mandela=2.5; Barack Obama/Obama=2.5;
      Malala Yousafzai/Malala=2; Ernest Hemingway/Hemingway=2; Dalaj Lama/Dalai Lama=2; Bob Dylan/Dylan=2;
      Niels Bohr/Bohr=2; Max Planck/Planck=1.5; Richard Feynman/Feynman=1.5; Werner Heisenberg/Heisenberg=1.5;
      Erwin Schrödinger/Schrödinger=1.5; Alexander Fleming/Fleming=1.5; Ivan Pavlov/Pavlov=1.5;
      Gabriel García Márquez/Márquez=1.5; Albert Camus/Camus=1.5; Peter Handke/Handke=1.5;
      Mihail Gorbačov/Gorbačov/Gorbačev=1.5; Winston Churchill/Churchill=1.5; Jean-Paul Sartre/Sartre=0.9;
      Thomas Mann/Mann=0.9; Hermann Hesse/Hesse=0.9; Orhan Pamuk/Pamuk=0.9; Jaser Arafat/Arafat=0.9;
      Henry Kissinger/Kissinger=0.9; Lech Wałęsa/Walesa=0.9; Aleksandr Solženjicin/Solženjicin=0.9;
      Crveni križ/Međunarodni odbor Crvenog križa=0.9; Europska unija/EU=0.9; Ernest Rutherford/Rutherford=0.9;
      Pierre Curie=0.9; Jimmy Carter/Carter=0.7; Al Gore/Gore=0.7; Kofi Annan/Annan=0.7; Boris Pasternak/Pasternak=0.7;
      George Bernard Shaw/Shaw=0.7; Rudyard Kipling/Kipling=0.7; John Steinbeck/Steinbeck=0.7;
      Wilhelm Röntgen/Röntgen=0.7; Enrico Fermi/Fermi=0.7; Guglielmo Marconi/Marconi=0.7; Peter Higgs/Higgs=0.7;
      Ujedinjeni narodi/UN=0.7; Theodore Roosevelt=0.4; Woodrow Wilson/Wilson=0.4; Andrej Saharov/Saharov=0.4;
      Mihail Šolohov/Šolohov=0.4; Rabindranath Tagore/Tagore=0.4; William Butler Yeats/Yeats=0.4;
      T. S. Eliot/Eliot=0.4; Samuel Beckett/Beckett=0.4; William Faulkner/Faulkner=0.4; Toni Morrison=0.4;
      Kazuo Ishiguro/Ishiguro=0.4; Pablo Neruda/Neruda=0.4; Mario Vargas Llosa/Vargas Llosa=0.4;
      José Saramago/Saramago=0.4; Paul Dirac/Dirac=0.4; Linus Pauling/Pauling=0.4; Robert Koch/Koch=0.4;
      James Watson/Watson=0.4; Francis Crick/Crick=0.4; John Nash/Nash=0.4; Albert Schweitzer/Schweitzer=0.4;
      Willy Brandt/Brandt=0.4; Jicak Rabin/Rabin=0.4; Desmond Tutu/Tutu=0.4; Aung San Suu Kyi=0.4;
      Henri Dunant/Dunant=0.4; UNICEF=0.4; Liječnici bez granica=0.4; Wolfgang Pauli/Pauli=0.3; Max Born=0.3;
      Louis de Broglie/de Broglie=0.3; James Chadwick/Chadwick=0.3; Roger Penrose/Penrose=0.3; Fritz Haber/Haber=0.3;
      Otto Hahn=0.3; Irène Joliot-Curie=0.3; Santiago Ramón y Cajal/Cajal=0.3; Camillo Golgi/Golgi=0.3;
      Frederick Banting/Banting=0.3; Katalin Karikó/Karikó=0.3; Milton Friedman/Friedman=0.3;
      Paul Krugman/Krugman=0.3; Friedrich Hayek/Hayek=0.3; Daniel Kahneman/Kahneman=0.3; Joseph Stiglitz/Stiglitz=0.3;
      Ivan Bunjin/Bunjin=0.3; Olga Tokarczuk/Tokarczuk=0.3; Wisława Szymborska/Szymborska=0.3;
      Czesław Miłosz/Miłosz=0.3; Henryk Sienkiewicz/Sienkiewicz=0.3; Gabriela Mistral=0.3; Octavio Paz=0.3;
      Dario Fo=0.3; Luigi Pirandello/Pirandello=0.3; Knut Hamsun/Hamsun=0.3; Jon Fosse/Fosse=0.3;
      Doris Lessing/Lessing=0.3; Harold Pinter/Pinter=0.3; Alice Munro/Munro=0.3; Han Kang=0.3;
      Annie Ernaux/Ernaux=0.3; Günter Grass=0.3; Heinrich Böll/Böll=0.3; Anwar Sadat/Sadat=0.3; Menachem Begin=0.3;
      Šimon Peres/Peres=0.3; Frederik de Klerk/de Klerk=0.3; Elie Wiesel/Wiesel=0.3; Martti Ahtisaari/Ahtisaari=0.3;
      Bertha von Suttner/Suttner=0.3; Fridtjof Nansen/Nansen=0.3; Amnesty International=0.3; Imre Kertész/Kertész=0.2;
      Elfriede Jelinek/Jelinek=0.2; Herta Müller=0.2; Svetlana Aleksijevič/Aleksijevič=0.2; Pieter Zeeman/Zeeman=0.2;
      Andre Geim/Geim=0.2; Murray Gell-Mann/Gell-Mann=0.2; Steven Weinberg=0.2; Abdus Salam=0.2;
      Albert Michelson/Michelson=0.2; Kip Thorne=0.2; Frederick Sanger/Sanger=0.2; Dorothy Hodgkin=0.2;
      Jennifer Doudna/Doudna=0.2; Emmanuelle Charpentier/Charpentier=0.2; Svante Arrhenius/Arrhenius=0.2;
      Karl Landsteiner/Landsteiner=0.2; Tu Youyou=0.2; Ferid Murad=0.2; Amartya Sen=0.2; Paul Samuelson/Samuelson=0.2;
      Muhammad Yunus/Yunus=0.2; Wangari Maathai/Maathai=0.2; Abiy Ahmed=0.2; Maria Ressa=0.2;
      Dmitrij Muratov/Muratov=0.2; Narges Mohammadi=0.2; Liu Xiaobo=0.2; Lester Pearson=0.2;
      Svjetski program za hranu=0.2; Selma Lagerlöf/Lagerlöf=0.1; Hendrik Lorentz/Lorentz=0.1`,
  },
  {
    slug: "oscar-film",
    group: "kviz",
    title: "Film koji je osvojio Oscara za najbolji film",
    hint: "Bilo koja godina, od Krila (1929.) do Anore (2025.); hrvatski ili izvorni naslov",
    strip: ["film"],
    answers: `Titanic=10.5; Kum/The Godfather=9; Forrest Gump=7; Gladijator/Gladiator=6;
      Gospodar prstenova: Povratak kralja/Povratak kralja/Gospodar prstenova/The Return of the King/Lord of the Rings=5.5;
      Oppenheimer=4.5; Schindlerova lista/Schindler's List=3.5;
      Let iznad kukavičjeg gnijezda/One Flew Over the Cuckoo's Nest=3.5; Parazit/Parasite=3; Casablanca/Kazablanka=2.5;
      Kad jaganjci utihnu/The Silence of the Lambs=2.5; Prohujalo s vihorom/Gone with the Wind=2.5;
      Hrabro srce/Braveheart=2.5; Ben-Hur=2.5; Rocky=2; Kum 2/Kum II/The Godfather Part II=2; Amadeus=2;
      Kišni čovjek/Rain Man=2; Ples s vukovima/Dances with Wolves=2; Vrtlog života/American Beauty=1.5;
      Pokojni/The Departed=1.5; Milijunaš s ulice/Slumdog Millionaire=1.5; Kraljev govor/The King's Speech=1.5;
      Moje pjesme, moji snovi/The Sound of Music=1.5; Lawrence od Arabije/Lawrence of Arabia=1.5;
      Nema zemlje za starce/No Country for Old Men=1.5; Engleski pacijent/The English Patient=0.9;
      Genijalni um/A Beautiful Mind=0.9; Chicago=0.9; Djevojka od milijun dolara/Million Dollar Baby=0.9; Argo=0.9;
      12 godina ropstva/12 Years a Slave=0.9; Birdman=0.9; Oblik vode/The Shape of Water=0.9; Zelena knjiga/Green Book=0.9;
      Sve u isto vrijeme/Everything Everywhere All at Once=0.9; Vod smrti/Platoon=0.9; Lovac na jelene/The Deer Hunter=0.9;
      Most na rijeci Kwai/The Bridge on the River Kwai=0.9; West Side Story=0.9; My Fair Lady=0.9; Gandhi=0.9;
      Ponoćni kauboj/Midnight Cowboy=0.7; Moonlight=0.7; Anora=0.7; Zemlja nomada/Nomadland=0.7;
      Umjetnik/The Artist=0.7; Katanac za bol/The Hurt Locker=0.7; Spotlight=0.7;
      Zaljubljeni Shakespeare/Shakespeare in Love=0.7; Nepomirljivi/Unforgiven=0.7;
      Posljednji kineski car/The Last Emperor=0.7; Žalac/The Sting=0.7; Francuska veza/The French Connection=0.7;
      Na zapadu ništa novo/All Quiet on the Western Front=0.7; Kramer protiv Kramera/Kramer vs. Kramer=0.7;
      Annie Hall=0.4; Moja Afrika/Out of Africa=0.4; CODA=0.4; Fatalna nesreća/Crash=0.4;
      Vozeći gospođicu Daisy/Driving Miss Daisy=0.4; Vatrene kočije/Chariots of Fire=0.4;
      Riječi nježnosti/Terms of Endearment=0.3; Obični ljudi/Ordinary People=0.3;
      U vrelini noći/In the Heat of the Night=0.3; Patton=0.3; Oliver=0.3; Apartman/The Apartment=0.3; Gigi=0.3;
      Put oko svijeta u 80 dana/Around the World in 80 Days=0.3; Odavde do vječnosti/From Here to Eternity=0.3;
      Na dokovima New Yorka/On the Waterfront=0.3; Sve o Evi/All About Eve=0.3;
      Amerikanac u Parizu/An American in Paris=0.3; Hamlet=0.3; Rebecca=0.3;
      Pobuna na brodu Bounty/Mutiny on the Bounty=0.3; Svi kraljevi ljudi/All the King's Men=0.2; Marty=0.2;
      Tom Jones=0.2; Čovjek za sva vremena/A Man for All Seasons=0.2;
      Najbolje godine naših života/The Best Years of Our Lives=0.2; Izgubljeni vikend/The Lost Weekend=0.2;
      Kako je bila zelena moja dolina/How Green Was My Valley=0.2; Gospođa Miniver/Mrs. Miniver=0.2;
      Najveća predstava na svijetu/The Greatest Show on Earth=0.2; Dogodilo se jedne noći/It Happened One Night=0.2;
      Krila/Wings=0.2; Grand Hotel=0.2; Veliki Ziegfeld/The Great Ziegfeld=0.1;
      Život Emila Zole/The Life of Emile Zola=0.1; You Can't Take It with You=0.1; Going My Way=0.1;
      Gentleman's Agreement=0.1; Cimarron=0.1; Cavalcade=0.1; The Broadway Melody=0.1`,
  },
  {
    slug: "oscar-gluma",
    group: "kviz",
    title: "Dobitnik ili dobitnica Oscara za glumu",
    hint: "Glavna ili sporedna uloga, do 2025.",
    strip: [],
    answers: `Leonardo DiCaprio/DiCaprio=7; Tom Hanks/Hanks=4; Meryl Streep/Streep=4; Jack Nicholson/Nicholson=3;
      Anthony Hopkins/Hopkins=3; Marlon Brando/Brando=3; Al Pacino/Pacino=2.5; Robert De Niro/De Niro=2.5;
      Denzel Washington/Denzel=2.5; Joaquin Phoenix/Phoenix=1.5; Russell Crowe/Crowe=1.5; Julia Roberts=1.5;
      Nicole Kidman/Kidman=1.5; Daniel Day-Lewis/Day-Lewis=1.5; Brad Pitt/Pitt=1.5; Katharine Hepburn=1.5;
      Audrey Hepburn=1.5; Natalie Portman/Portman=1.5; Will Smith=1.5; Heath Ledger/Ledger=1.5;
      Morgan Freeman/Freeman=1; Charlize Theron/Theron=1; Kate Winslet/Winslet=1; Halle Berry=1; Jennifer Lawrence=1;
      Emma Stone=1; Cillian Murphy/Murphy=1; Matthew McConaughey/McConaughey=1; Dustin Hoffman=1;
      Sandra Bullock/Bullock=1; Robin Williams=1; Angelina Jolie/Jolie=1; Anne Hathaway/Hathaway=1;
      Cate Blanchett/Blanchett=0.9; Kevin Spacey/Spacey=0.9; Sean Penn=0.9; Nicolas Cage/Cage=0.9;
      Christoph Waltz/Waltz=0.9; Rami Malek/Malek=0.9; George Clooney/Clooney=0.9; Michael Caine/Caine=0.9;
      Gary Oldman/Oldman=0.9; Javier Bardem/Bardem=0.9; Penélope Cruz=0.9; Elizabeth Taylor=0.9;
      Ingrid Bergman/Bergman=0.9; Sophia Loren/Loren=0.9; Grace Kelly=0.6; Vivien Leigh=0.6; Clark Gable/Gable=0.6;
      Humphrey Bogart/Bogart=0.6; James Stewart=0.6; Gregory Peck=0.6; John Wayne=0.6; Paul Newman/Newman=0.6;
      Sidney Poitier/Poitier=0.6; Charlton Heston/Heston=0.6; Robert Downey Jr./Robert Downey=0.6; Brendan Fraser/Fraser=0.6;
      Adrien Brody/Brody=0.6; Jamie Foxx/Foxx=0.6; Colin Firth/Firth=0.6; Eddie Redmayne/Redmayne=0.6;
      Roberto Benigni/Benigni=0.6; Julie Andrews=0.6; Jodie Foster=0.6; Frances McDormand/McDormand=0.6; Hilary Swank/Swank=0.6;
      Gwyneth Paltrow/Paltrow=0.6; Reese Witherspoon/Witherspoon=0.6; Helen Mirren/Mirren=0.6; Renée Zellweger/Zellweger=0.6;
      Michelle Yeoh/Yeoh=0.6; Marion Cotillard/Cotillard=0.6; Cher=0.6; Whoopi Goldberg/Goldberg=0.6; Christian Bale/Bale=0.6;
      Jamie Lee Curtis=0.5; Jared Leto/Leto=0.5; Philip Seymour Hoffman=0.5; Ben Kingsley/Kingsley=0.5;
      Gene Hackman/Hackman=0.5; Tommy Lee Jones=0.5; Joe Pesci/Pesci=0.5; Sean Connery/Connery=0.5; Anthony Quinn=0.5;
      Forest Whitaker/Whitaker=0.3; Jeremy Irons/Irons=0.3; Geoffrey Rush=0.3; Jack Lemmon/Lemmon=0.3;
      Henry Fonda=0.3; Jane Fonda=0.3; Bette Davis=0.3; Diane Keaton/Keaton=0.3; Liza Minnelli/Minnelli=0.3;
      Barbra Streisand/Streisand=0.3; Sally Field=0.3; Faye Dunaway/Dunaway=0.3; Susan Sarandon/Sarandon=0.3;
      Kathy Bates=0.3; Emma Thompson=0.3; Holly Hunter=0.3; Jessica Lange/Lange=0.3; Julianne Moore=0.3;
      Brie Larson/Larson=0.3; Olivia Colman/Colman=0.3; Catherine Zeta-Jones/Zeta-Jones=0.3;
      Kim Basinger/Basinger=0.3; Juliette Binoche/Binoche=0.3; Judi Dench/Dench=0.3; Viola Davis=0.3;
      Frank Sinatra/Sinatra=0.3; Maggie Smith=0.3; Laurence Olivier/Olivier=0.3; Gary Cooper=0.3; Michael Douglas=0.3;
      Jessica Chastain/Chastain=0.2; Mikey Madison=0.2; Rachel Weisz/Weisz=0.2; Jennifer Connelly/Connelly=0.2;
      Jennifer Hudson=0.2; Tilda Swinton/Swinton=0.2; Lupita Nyong'o/Nyong'o=0.2; Octavia Spencer=0.2;
      Alicia Vikander/Vikander=0.2; Laura Dern/Dern=0.2; Regina King=0.2; Zoe Saldaña/Saldaña=0.2; Mahershala Ali=0.2;
      J. K. Simmons/Simmons=0.2; Sam Rockwell/Rockwell=0.2; Mark Rylance/Rylance=0.2; Kieran Culkin=0.2;
      Ke Huy Quan=0.2; Daniel Kaluuya/Kaluuya=0.2; Casey Affleck=0.2; Jean Dujardin/Dujardin=0.2;
      Cuba Gooding Jr./Cuba Gooding=0.2; Kevin Kline/Kline=0.2; Martin Landau/Landau=0.2;
      Benicio del Toro/Del Toro=0.2; Tim Robbins/Robbins=0.2; Alan Arkin/Arkin=0.2; Christopher Plummer/Plummer=0.2;
      Peter Ustinov/Ustinov=0.2; Walter Matthau/Matthau=0.2; Rita Moreno=0.2; Goldie Hawn/Hawn=0.2;
      Vanessa Redgrave/Redgrave=0.2; Anjelica Huston/Huston=0.2; Hattie McDaniel/McDaniel=0.2; Spencer Tracy=0.2;
      Yul Brynner/Brynner=0.2; Alec Guinness/Guinness=0.2; William Holden=0.2; Burt Lancaster/Lancaster=0.2;
      Lee Marvin=0.2; George C. Scott=0.2; Richard Dreyfuss/Dreyfuss=0.2; Jon Voight/Voight=0.2;
      Robert Duvall/Duvall=0.2; Shirley MacLaine/MacLaine=0.2; Troy Kotsur=0.1; Jim Broadbent/Broadbent=0.1;
      Chris Cooper=0.1; Rod Steiger/Steiger=0.1; F. Murray Abraham=0.1; William Hurt=0.1;
      Ernest Borgnine/Borgnine=0.1; Maximilian Schell=0.1; Rex Harrison=0.1; Ray Milland=0.1; Jessica Tandy/Tandy=0.1;
      Marlee Matlin/Matlin=0.1; Louise Fletcher=0.1; Ellen Burstyn/Burstyn=0.1; Glenda Jackson=0.1;
      Julie Christie=0.1; Anne Bancroft/Bancroft=0.1; Joan Fontaine=0.1; Olivia de Havilland/de Havilland=0.1;
      Joan Crawford=0.1; Ginger Rogers=0.1; Jason Robards/Robards=0.1; Mira Sorvino/Sorvino=0.1;
      Dianne Wiest/Wiest=0.1; Patricia Arquette/Arquette=0.1; Allison Janney/Janney=0.1; Ariana DeBose/DeBose=0.1;
      Da'Vine Joy Randolph=0.1; Walter Brennan=0.1; Greer Garson=0.1; Anna Magnani/Magnani=0.1;
      Simone Signoret/Signoret=0.1; Louis Gossett Jr.=0.1; Haing S. Ngor=0.1; Marcia Gay Harden=0.1; Melissa Leo=0.1;
      Youn Yuh-jung=0.1; Emil Jannings/Jannings=0.1; Luise Rainer=0.1`,
  },
  {
    slug: "turcizam",
    group: "kviz",
    title: "Riječ turskog podrijetla",
    hint: "Turcizam u hrvatskom, i ako je u turski došao iz arapskog ili perzijskog",
    strip: [],
    answers: `Čarapa=4; Jastuk=3.5; Šećer=3.5; Kava/Kahva=3.5; Ćevap/Ćevapčići=2.5; Burek=2.5; Boja=2.5; Džep=2.5; Sat=2;
      Kutija=2; Papuča=2; Čekić=1.5; Tava=1.5; Majmun=1.5; Budala=1.5; Komšija=1.5; Sarma=1.5; Baklava=1.5; Rakija=1.5;
      Jogurt=1.5; Duhan=1.5; Čizma=1.5; Dugme=1.5; Jorgan=1.5; Badava=1.5; Taman=1.5; Baš=1.5; Inat=1.5; Merak=1.5; Dućan=1.5; Kajsija=1;
      Badem=1; Patlidžan=1; Kukuruz=1; Avlija=1; Čardak=1; Kapija=1; Sokak=1; Čaršija=1; Džamija=1;
      Čelik=1; Sevdah=1; Kafana/Kavana=1; Top=0.7; Kat=0.7; Pamuk=0.7; Ćilim=0.7; Ćorav=0.7; Ćošak=0.7; Ćup=0.7; Ćuprija=0.7;
      Ćef/Ćeif=0.7; Đubre=0.7; Halva/Alva=0.7; Lokum/Ratluk=0.7; Kajmak=0.7; Pekmez=0.7; Šerbet=0.7; Čorba=0.7; Pirinač=0.7; Biber=0.7;
      Džezva=0.7; Tepsija=0.7; Sanduk=0.7; Ćebe=0.7; Peškir=0.7; Marama=0.7; Hajde=0.7; Pilav=0.3; Sirće=0.3; Zejtin=0.3;
      Fildžan/Filjan=0.3; Ibrik=0.3; Kazan=0.3; Dolap=0.3; Raf=0.3; Minder=0.3; Jelek=0.3; Dimije=0.3; Šalvare=0.3;
      Fes=0.3; Čakšire=0.3; Kadifa=0.3; Lula=0.3; Đerdan=0.3; Đul=0.3; Karanfil=0.3; Bubreg=0.3; Ćelav=0.3; Belaj=0.3;
      Rahat=0.3; Kismet=0.3; Halal=0.3; Aferim=0.3; Jok=0.3; Mušterija=0.3; Pare=0.3; Bakšiš=0.3; Aga=0.3; Beg=0.3;
      Paša=0.3; Sultan=0.3; Vezir=0.3; Harem=0.3; Barut=0.3; Tavan=0.3; Kula=0.3; Bunar=0.3; Kaldrma=0.3; Česma=0.3;
      Mahala=0.3; Zanat=0.3; Alat=0.3; Bakar=0.3; Čobanin/Čoban=0.3; Torba=0.3; Čoha=0.2; Čibuk=0.2; Zumbul=0.2;
      Lala=0.2; Šimšir=0.2; Đogat=0.2; Dorat=0.2; Hajvan=0.2; Bekrija=0.2; Dembel=0.2; Haber=0.2; Adet=0.2;
      Kadija=0.2; Spahija=0.2; Janjičar=0.2; Hodža=0.2; Derviš=0.2; Hadžija=0.2; Harač=0.2; Handžar=0.2; Jatagan=0.2;
      Buzdovan=0.2; Barjak/Bajrak=0.2; Čador=0.2; Odaja=0.2; Sofra=0.2; Hamam=0.2; Burgija=0.2; Turpija=0.2;
      Merdevine=0.2; Kantar=0.2; Kalaj=0.2; Kujundžija=0.2; Terzija=0.2; Berberin=0.2; Kiosk=0.2; Divan=0.2;
      Đuveč=0.2; Japrak=0.2; Dolma=0.2; Sudžuk=0.2; Tufahija=0.2; Hurmašica=0.2; Tulumba=0.2; Bamija=0.2; Dud=0.2;
      Bostan=0.2; Pendžer=0.2; Kuluk=0.1; Aršin=0.1`,
  },
  {
    slug: "germanizam",
    group: "kviz",
    title: "Riječ njemačkog podrijetla",
    hint: "Germanizam u hrvatskom, i u svakodnevnom govoru",
    strip: [],
    answers: `Šnicla/Šnicl=3.5; Cimer=3; Šaraf/Šraf=2.5; Šarafciger/Šrafciger=2.5; Fajn=2.5; Ziher=2.5; Krumpir=2; Šlag=2;
      Štrudla/Štrudl=2; Flaša=2; Pegla=2; Šporet/Šparet=2; Viršla/Hrenovka=2; Fleka=2; Vic=2; Farba=2; Frajer=2;
      Gemišt=2; Špricer=1.5; Šunka=1.5; Špek=1.5; Puter=1.5; Šminka=1.5; Frizer=1.5; Ruksak=1.5; Kofer/Kufer=1.5;
      Fertik=1; Ganc=1; Feler=1; Plac=1; Cajt=1; Ura=1; Štikla=1; Šlic=1; Šank=1; Kelner=1; Frajla=1; Majstor=1;
      Cigla=1; Auspuh=1; Hauba=1; Šajba=1; Šoferšajbna=1; Rikverc=1; Gepek=0.9; Kuplung=0.9; Felga=0.9; Ler=0.9;
      Štos=0.9; Štreber=0.9; Luft=0.9; Špajza=0.9; Firanga=0.9; Šlafrok=0.9; Šlapa/Šlape=0.9; Krafna=0.9;
      Knedla/Knedle=0.9; Kifla=0.9; Paradajz=0.9; Krigla=0.9; Birtija=0.9; Cug=0.9; Štrom=0.9; Šteker=0.9;
      Bormašina=0.9; Vešmašina=0.9; Fen=0.9; Fruštuk=0.6; Gablec=0.6; Šnaps=0.6; Ajnfoh=0.6; Švindl=0.6; Šverc=0.6; Tapete=0.6;
      Malter=0.6; Ringla=0.6; Rerna=0.6; Lajsna=0.6; Šlauf=0.6; Ofinger=0.6; Fajercajg=0.6; Cvikeri=0.6; Šnajder=0.6; Šuster=0.6;
      Tišljar=0.6; Vaga=0.6; Kremšnita=0.6; Šlosar=0.3; Bauštela=0.3; Drot=0.3; Štanga=0.3; Šina=0.3; Štof=0.3; Šaht=0.3;
      Štih=0.3; Štimung=0.3; Kunšt=0.3; Dizna=0.3; Špigl=0.3; Šlager=0.3; Pleh=0.3; Puslica=0.3; Kugluf=0.3;
      Šnenokle=0.3; Nokle/Njoki=0.3; Šufnudle=0.3; Fašnik=0.3; Vekerica=0.3; Cifra=0.3; Grof=0.3; Kelj=0.3; Griz=0.3;
      Cušpajz=0.3; Šnita=0.3; Rajsferšlus=0.3; Fušer=0.3; Šlampav=0.3; Štand=0.3; Ceh=0.3; Herceg=0.2; Pinkl=0.2;
      Ceker/Ceger=0.2; Šmek=0.2; Kšeft=0.2; Šlep=0.2; Štimati=0.2; Ajngemahtes=0.2; Lojtra=0.2; Štenge=0.2;
      Špalir=0.2; Šoder=0.2; Cvancika=0.1; Štemajzl=0.1`,
  },
  {
    slug: "kost",
    group: "kviz",
    title: "Kost u ljudskom tijelu",
    hint: "Hrvatski ili latinski naziv; vrijede i skupine kostiju (npr. kosti zapešća)",
    strip: ["kost"],
    answers: `Bedrena kost/Femur/Bedrenica=10; Lubanja/Cranium=8; Rebro/Costa=7; Kralježak/Kralježnica/Vertebra=6;
      Ključna kost/Klavikula/Clavicula=6; Zdjelična kost/Zdjelica/Kost kuka/Os coxae/Pelvis=5;
      Goljenična kost/Goljenica/Tibia=5; Lopatica/Scapula=4; Čašica/Patella/Iver=4; Prsna kost/Sternum=4;
      Nadlaktična kost/Humerus=4; Donja čeljust/Mandibula=4; Palčana kost/Radius=3; Lakatna kost/Ulna=3;
      Lisna kost/Fibula=3; Trtica/Kokciks/Coccyx=3; Stremen/Stapes=3; Čekić/Malleus=2; Nakovanj/Incus=2;
      Petna kost/Calcaneus=2; Gornja čeljust/Maxilla=2; Križna kost/Sacrum=2; Čeona kost/Os frontale=2;
      Članak prsta/Falanga/Phalanx=2; Tjemena kost/Os parietale=1.5; Zatiljna kost/Os occipitale=1.5;
      Sljepoočna kost/Os temporale=1.5; Nosna kost/Os nasale=1.5; Jagodična kost/Os zygomaticum=1.5; Atlas=1.5;
      Gležanjska kost/Skočna kost/Talus=1.5; Aksis/Axis=1; Kosti zapešća/Karpalne kosti=1;
      Kosti pešća/Metakarpalne kosti=1; Kosti nožja/Tarzalne kosti=0.5; Kosti donožja/Metatarzalne kosti=1;
      Bočna kost/Ilium=1; Sjedna kost/Ischium=1; Preponska kost/Stidna kost/Pubis=1; Podjezična kost/Os hyoideum=1;
      Vratni kralježak=0.5; Prsni kralježak=0.3; Slabinski kralježak=0.3; Klinasta kost/Os sphenoidale=0.5;
      Rešetnica/Os ethmoidale=0.5; Suzna kost/Os lacrimale=0.5; Nepčana kost/Os palatinum=0.5;
      Čunasta kost/Os scaphoideum/Os naviculare=0.5; Polumjesečasta kost/Os lunatum=0.3;
      Trokutasta kost/Os triquetrum=0.3; Graškasta kost/Os pisiforme=0.3; Trapezna kost/Os trapezium=0.3;
      Kockasta kost/Os cuboideum=0.3; Klinaste kosti stopala/Ossa cuneiformia=0.3; Donja nosna školjka=0.3;
      Trapezoidna kost/Os trapezoideum=0.2; Glavičasta kost/Os capitatum=0.2; Kukasta kost/Os hamatum=0.2;
      Sezamska kost=0.2; Raonik/Vomer=0.1; Šavna kost/Wormova kost=0.1`,
  },
  {
    slug: "mjerna-jedinica",
    group: "kviz",
    title: "Mjerna jedinica",
    hint: "Za bilo koju veličinu: duljinu, masu, vrijeme, struju, energiju, podatke...",
    strip: [],
    answers: `Metar=8.5; Kilogram/kg=6.5; Sekunda=5; Litra=5; Kilometar/km=4; Gram=3.5; Centimetar/cm=3.5; Milimetar/mm=2.5;
      Sat=2.5; Minuta=2.5; Tona=2.5; Volt=2.5; Amper=2.5; Vat/Watt=2.5; Kelvin=2.5; Celzijev stupanj/Celzij/Stupanj Celzija=2.5;
      Džul/Joule=2; Njutn/Newton=2; Om/Ohm=1.5; Herc/Hertz/Hz=1.5; Paskal/Pascal=1.5; Kalorija=1.5; Inč/Palac=1.5; Milja=1.5;
      Kilovat-sat/kWh=1; Kilovat/kW=1; Stopa=1; Funta=1; Mol=1; Kandela=1; Hektar=1;
      Svjetlosna godina=1; Kvadratni metar/Kvadrat=1; Jard=0.8; Unca=0.8; Galon=0.8; Bar=0.8; Atmosfera=0.8; Lumen=0.8;
      Kulon/Coulomb=0.8; Farad=0.8; Tesla=0.8; Decilitar/dl=0.8; Mililitar/ml=0.8; Decimetar=0.8; Čvor=0.8; Konjska snaga/KS=0.8;
      Bajt=0.8; Decibel=0.8; Karat=0.8; Fahrenheitov stupanj/Fahrenheit=0.8; Kubni metar/Kubik=0.8; Luks/Lux=0.4;
      Bekerel/Becquerel=0.4; Sivert/Sievert=0.4; Henri/Henry=0.4; Veber/Weber=0.4; Simens/Siemens=0.4; Radijan=0.4;
      Ar=0.4; Jutro=0.4; Hektolitar=0.4; Mikrometar=0.4; Nanometar=0.4; Parsek=0.4; Astronomska jedinica=0.4;
      Nautička milja=0.4; Bit=0.4; Kilobajt=0.4; Megabajt=0.4; Gigabajt=0.4; Dioptrija=0.4; Kutni stupanj=0.4;
      Dan=0.4; Tjedan=0.4; Godina=0.4; Milisekunda=0.4; Kilokalorija=0.4; Pinta=0.4; Barel=0.4; Mah/Mach=0.4;
      Promil=0.4; Postotak=0.4; Grej/Gray=0.2; Steradijan=0.2; Angstrem/Ångström=0.2; Mjesec=0.2; Stoljeće=0.2;
      Nanosekunda=0.2; Torr=0.2; Milibar=0.2; PSI=0.2; Elektronvolt=0.2; Lakat=0.2; Pedalj=0.2; Gaus/Gauss=0.2;
      Rendgen/Röntgen=0.2; Kiri/Curie=0.2; Kilometar na sat/kmh=0.2; Terabajt=0.2; Dina=0.1; Bušel=0.1; Erg=0.1;
      Hvat=0.1`,
  },
  {
    slug: "filozof",
    group: "kviz",
    title: "Filozof ili filozofkinja",
    hint: "Bilo koje doba i zemlja, i hrvatski filozofi",
    strip: [],
    answers: `Sokrat=9.5; Platon=8; Aristotel=8; Friedrich Nietzsche/Nietzsche/Niče=5; Immanuel Kant/Kant=4;
      René Descartes/Descartes/Dekart=3; Konfucije=2.5; Karl Marx/Marx=2.5; Hegel=2.5; Jean-Paul Sartre/Sartre=2;
      Diogen=2; Pitagora=1.5; Seneka=1.5; Marko Aurelije=1.5; Baruch Spinoza/Spinoza=1.5; Jean-Jacques Rousseau/Rousseau=1.5;
      Voltaire=1.5; Arthur Schopenhauer/Schopenhauer=1.5; Søren Kierkegaard/Kierkegaard=1.5; Heraklit=1.5; Demokrit=1.5;
      Epikur=1.5; Tales=1.5; John Locke/Locke=1; Thomas Hobbes/Hobbes=1; David Hume/Hume=1;
      Niccolò Machiavelli/Machiavelli=1; Toma Akvinski=1; Sveti Augustin/Augustin=1;
      Ludwig Wittgenstein/Wittgenstein=1; Martin Heidegger/Heidegger=1; Albert Camus/Camus=1; Lao Ce/Laozi=1;
      Gottfried Leibniz/Leibniz=1; Bertrand Russell/Russell=1; Slavoj Žižek/Žižek=1; Buda=0.8; Zenon=0.8;
      Parmenid=0.8; Ciceron=0.8; Erazmo Roterdamski=0.8; Francis Bacon/Bacon=0.8; Blaise Pascal/Pascal=0.8; Montesquieu=0.8;
      John Stuart Mill/Mill=0.8; Friedrich Engels/Engels=0.8; Karl Popper/Popper=0.8; Simone de Beauvoir/Beauvoir=0.8;
      Hannah Arendt/Arendt=0.8; Michel Foucault/Foucault=0.8; Frane Petrić/Franciscus Patricius=0.8; Ruđer Bošković=0.8;
      Anaksagora=0.4; Anaksimandar=0.4; Anaksimen=0.4; Empedoklo=0.4; Protagora=0.4; Plotin=0.4; Epiktet=0.4;
      Lukrecije=0.4; Vilim Ockham/Ockham=0.4; Thomas More/Toma More=0.4; George Berkeley/Berkeley=0.4;
      Denis Diderot/Diderot=0.4; Fichte=0.4; Schelling=0.4; Auguste Comte/Comte=0.4; Ludwig Feuerbach/Feuerbach=0.4;
      Edmund Husserl/Husserl=0.4; Henri Bergson/Bergson=0.4; Jacques Derrida/Derrida=0.4;
      Jürgen Habermas/Habermas=0.4; Theodor Adorno/Adorno=0.4; Herbert Marcuse/Marcuse=0.4; Noam Chomsky/Chomsky=0.4;
      Ayn Rand=0.4; Avicena/Ibn Sina=0.4; Averroes/Ibn Rušd=0.4; Hipatija=0.4; Michel de Montaigne/Montaigne=0.4;
      Giordano Bruno=0.4; Herman Dalmatin=0.4; Marko Marulić=0.4; Matija Vlačić Ilirik/Flacius=0.4; Gajo Petrović=0.4;
      Milan Kangrga/Kangrga=0.4; Gorgija=0.2; Boetije=0.2; Anselmo Canterburyjski=0.2; Petar Abelard/Abelard=0.2;
      Duns Scot=0.2; Thomas Kuhn=0.2; John Rawls/Rawls=0.2; Peter Singer=0.2; Mencije=0.2; Zhuangzi/Džuang Ce=0.2;
      Al-Farabi=0.2; Maimonides=0.2; William James=0.2; John Dewey/Dewey=0.2; Herbert Spencer=0.2;
      Pico della Mirandola=0.2; Marko Antun de Dominis/De Dominis=0.2; Vladimir Filipović=0.2; Danko Grlić/Grlić=0.2;
      Charles Sanders Peirce/Peirce=0.2; Hugo Grotius/Grotius=0.2; Marsilio Ficino/Ficino=0.2; Branko Bošnjak=0.2;
      Pavao Vuk-Pavlović=0.2; Albert Bazala/Bazala=0.2; Stjepan Zimmermann=0.2; Juraj Dragišić=0.1; Pavao Skalić=0.1`,
  },
  {
    slug: "vladar",
    group: "kviz",
    title: "Kralj, kraljica, car ili faraon",
    hint: "Povijesni vladar ili vladarica bilo koje zemlje; i kraljice supruge",
    strip: ["kralj","kraljica","car","carica","faraon"],
    answers: `Ramzes II/Ramzes=4.5; Tutankamon=4.5; Kleopatra=4.5; Napoleon/Napoleon Bonaparte=4.5;
      Luj XIV/Luj Četrnaesti/Kralj Sunce=4; Henrik VIII=4; Elizabeta II/Kraljica Elizabeta=4; Karlo Veliki=3;
      Aleksandar Veliki/Aleksandar Makedonski=3; Petar Veliki=2.5; Katarina Velika=2.5; Marija Terezija=2.5; Franjo Josip=2.5;
      Kraljica Viktorija/Viktorija=2.5; Džingis-kan/Džingis Kan=2; Sulejman Veličanstveni/Sulejman=2;
      Elizabeta I=2; Karlo III/Charles III=2; Luj XVI=1.5; Marija Antoaneta=1.5; Nikola II=1.5; Ivan Grozni=1.5;
      Richard Lavljeg Srca/Rikard Lavljeg Srca=1.5; Mehmed II/Mehmed Osvajač=1; Atila=1; Hamurabi=1;
      Nabukodonosor=1; Keops=1; Ehnaton=1; Nefertiti=1; Kralj Salomon/Salomon=1; Kralj David=1;
      Vilim Osvajač=1; Sisi/Elizabeta Bavarska=1; Kralj Tomislav/Tomislav=1; Qin Shi Huang/Šihuangdi=1;
      Hatšepsut=0.8; Kserkso=0.8; Darije=0.8; Kir Veliki=0.8; Leonida=0.8; Herod=0.8; Kublaj-kan=0.8; Izabela Kastiljska=0.8;
      Filip II=0.8; Karlo V=0.8; Fridrik Barbarossa=0.8; Fridrik Veliki=0.8; Vilim II/Wilhelm II=0.8; Matija Korvin=0.8;
      Stefan Dušan=0.8; Tvrtko I/Tvrtko=0.8; Aleksandar Karađorđević=0.8; Juan Carlos=0.8; Hirohito=0.8; Pu Yi/Puyi=0.8;
      Šah Džahan=0.8; Moctezuma/Montezuma=0.8; Haile Selassie=0.8; Mansa Musa=0.8; Ana Boleyn=0.8; Marija Stuart=0.8; August=0.8;
      Neron=0.8; Dioklecijan=0.8; Konstantin Veliki=0.8; Justinijan=0.8; Kefren=0.4; Tutmozis III=0.4; Džoser=0.4; Saul=0.4;
      Alfred Veliki=0.4; Edvard VIII=0.4; Juraj VI/George VI=0.4; Ferdinand Aragonski=0.4; Rudolf II=0.4;
      Maksimilijan=0.4; Ludwig II Bavarski=0.4; Ludovik Veliki/Ludovik I=0.4; Petar I Karađorđević=0.4;
      Nikola I Petrović=0.4; Simeon Veliki=0.4; Kazimir Veliki=0.4; Jan Sobieski=0.4; Gustav II Adolf=0.4;
      Felipe VI=0.4; Willem-Alexander=0.4; Akihito=0.4; Naruhito=0.4; Car Meiji/Meiji=0.4; Ašoka=0.4; Akbar=0.4;
      Atahualpa=0.4; Šaka Zulu=0.4; Mohammad Reza Pahlavi/Pahlavi=0.4; Aleksandar II=0.4; Marija I/Krvava Marija=0.4;
      Eleonora Akvitanska=0.4; Josephine/Joséphine/Žozefina=0.4; Katarina Medici=0.4; Teodora=0.4;
      Petar Krešimir IV=0.4; Dmitar Zvonimir/Zvonimir=0.4; Mikerin=0.2; Amenhotep III=0.2; Knut Veliki=0.2;
      Beatrix=0.2; Carl XVI Gustaf=0.2; Kangxi=0.2; Wu Zetian=0.2; Kamehameha=0.2; Salman=0.2; Faruk=0.2;
      Husein od Jordana=0.2; Ivan III=0.2; Bhumibol=0.2; Ranavalona=0.1; Pačakuti/Pachacuti=0.1`,
  },
  {
    slug: "dinastija",
    group: "kviz",
    title: "Vladarska dinastija ili plemićka obitelj",
    hint: "Bilo koja zemlja, i hrvatske plemićke obitelji",
    strip: ["dinastija","obitelj","kuca"],
    answers: `Habsburgovci/Habsburg/Habsburzi=10; Zrinski=8; Frankopani/Frankopan=8; Romanovi/Romanov=6;
      Tudori/Tudor=5; Bourbon/Burbonci=4; Windsor/Windsori=4; Medici=4; Trpimirovići/Trpimirović=4;
      Karađorđevići/Karađorđević=3; Osmanlije/Osmanska dinastija=3; Anžuvinci/Anžuvinska dinastija=3;
      Arpadovići/Arpadović=3; Obrenovići/Obrenović=2; Kotromanići/Kotromanić=2; Nemanjići/Nemanjić=2; Hohenzollern=2;
      Bonaparte=2; Ming=2; Borgia=1.5; Šubići/Šubić Bribirski=1.5; Petrović-Njegoš/Petrovići=1.5;
      Plantageneti/Plantagenet=1.5; Stuarti/Stuart=1.5; Kapetovići/Kapetovci=1.5; Karolinzi=1.5; Merovinzi=1.5;
      Qing=1.5; Ptolemejevići/Ptolemejevci=1.5; Kuća York/York=1; Kuća Lancaster/Lancaster=1; Valois=1; Han=1; Tang=1;
      Mogulska dinastija/Moguli=1; Jagelovići/Jagelovci=1; Grimaldi=1; Rothschild=1; Draškovići/Drašković=1;
      Erdődy/Erdedi=1; Pejačevići/Pejačević=1; Jelačić=1; Song=0.5; Yuan=0.5; Julijevci-Klaudijevci/Julijevci=0.5;
      Flavijevci=0.5; Komneni=0.5; Paleolozi=0.5; Piastovići=0.5; Luksemburgovci=0.5; Wittelsbach=0.5;
      Hannoverska dinastija/Hannover=0.5; Oranje-Nassau/Oranje=0.5; Savojska dinastija/Savojci=0.5; Sforza=0.5;
      Keglevići/Keglević=0.5; Eltz=0.5; Oršići/Oršić=0.5; Gučetići/Gučetić=0.5; Gundulići/Gundulić=0.5;
      Kačići/Kačić=0.5; Nelipići/Nelipić=0.5; Babonići/Babonić=0.5; Celjski=0.5; Esterházy=0.5; Hunjadi/Korvin=0.5;
      Brankovići/Branković=0.5; Kosače/Kosača=0.5; Zhou=0.3; Shang=0.3; Severi=0.3; Braganza=0.3; Este=0.3;
      Gonzaga=0.3; Visconti=0.3; Sachsen-Coburg-Gotha/Saxe-Coburg=0.3; Sorkočevići/Sorkočević=0.3; Bunići/Bunić=0.3;
      Ratkaj=0.3; Rauch=0.3; Batthyány=0.3; Rákóczi=0.3; Hrvatinići/Hrvatinić=0.3; Berislavići/Berislavić=0.3;
      Patačići/Patačić=0.3; Trastámara=0.2; Kulmer=0.2; Kurjakovići/Kurjaković=0.1; Talovci/Talovac=0.1`,
  },
  {
    slug: "programski-jezik",
    group: "kviz",
    title: "Programski jezik",
    hint: "I jezici za upite, označavanje i skripte (SQL, HTML...); C, C++ i C# su jedan odgovor",
    strip: ["jezik"],
    answers: `Python/Pajton=12; C, C++ ili C#/C/C++/C#/Cpp/C plus plus/C sharp/Csharp=10; Java=10; JavaScript/JS=8;
      HTML=4; SQL=3; PHP=3; CSS=2; TypeScript/TS=2; Pascal/Paskal=2; Basic/QBasic=2; Ruby=1.5; Swift=1.5; Kotlin=1.5;
      Go/Golang=1.5; Rust=1.5; Scratch=1.5; Asembler/Assembler/Assembly=1.5; Logo=1; Fortran=1; Cobol=1; Perl=1; R=1;
      MATLAB=1; Bash/Shell=1; Visual Basic/VB=1; Lua=0.5; PowerShell=0.5; Lisp=0.5; Haskell=0.5; Prolog=0.5;
      Scala=0.5; Dart=0.5; Objective-C=0.5; Delphi=0.5; XML=0.5; Ada=0.3; Erlang=0.3; Elixir=0.3; Julia=0.3; VBA=0.3;
      LaTeX=0.3; Clojure=0.2; F sharp/F#/Fsharp=0.2; Groovy=0.2; Smalltalk=0.2; Algol=0.2; Scheme=0.2; OCaml=0.2;
      Solidity=0.2; Brainfuck=0.2; APL=0.1; Zig=0.1; Racket=0.1; ABAP=0.1; Elm=0.1; WebAssembly=0.1; Modula-2=0.1;
      Oberon=0.1; Tcl=0.1; Awk=0.1; Simula=0.1; Forth=0.1`,
  },
  {
    slug: "zvijezda",
    group: "kviz",
    title: "Zviježđe ili zvijezda",
    hint: "Hrvatski ili latinski naziv; planeti ne vrijede",
    strip: ["zvijezda","zvijezde","zvijezdje"],
    answers: `Sunce=10; Sjevernjača/Polaris/Polarna zvijezda=8; Veliki medvjed/Ursa Major/Velika kola=8;
      Mali medvjed/Ursa Minor/Mala kola=5; Orion=6; Kasiopeja=4; Sirius=4; Betelgeuse/Betelgez=3;
      Proxima Centauri/Proksima Kentaura=2.5; Vega=2; Alfa Kentaura/Alpha Centauri=2; Ovan/Aries=2; Bik/Taurus=2;
      Blizanci/Gemini=2; Rak/Cancer=2; Lav/Leo=2; Djevica/Virgo=2; Vaga/Libra=2; Škorpion/Scorpius=2;
      Strijelac/Sagittarius=2; Jarac/Capricornus=2; Vodenjak/Aquarius=2; Ribe/Pisces=2; Rigel=1.5; Andromeda=1.5;
      Labud/Cygnus=1; Pegaz/Pegasus=1; Južni križ/Crux=1; Aldebaran=1; Antares=1; Arktur/Arcturus=1; Deneb=1;
      Altair=1; Plejade/Vlašići=1; Lira/Lyra=0.5; Orao/Aquila=0.5; Perzej/Perseus=0.5; Zmaj/Draco=0.5;
      Herkul/Hercules=0.5; Kentaur/Centaurus=0.5; Veliki pas/Canis Major=0.5; Zmijonosac/Ofiuh/Ophiuchus=0.5;
      Spika/Spica=0.5; Kapela/Capella=0.5; Poluks/Pollux=0.5; Kastor/Castor=0.5; Regul/Regulus=0.5;
      Procion/Procyon=0.5; Kanopus/Canopus=0.5; Algol=0.5; Bellatrix=0.5; Kefej/Cepheus=0.3; Volar/Bootes=0.3;
      Sjeverna kruna=0.3; Mali pas/Canis Minor=0.3; Hidra/Vodena zmija=0.3; Feniks/Phoenix=0.3; Kočijaš/Auriga=0.3;
      Dupin/Delphinus=0.3; Kit/Cetus=0.3; Fomalhaut=0.3; Mizar=0.3; UY Scuti=0.3; Zec/Lepus=0.2;
      Jednorog/Monoceros=0.2; Gavran/Corvus=0.2; Vuk/Lupus=0.2; Zmija/Serpens=0.2; Eridan/Eridanus=0.2; Brod Argo=0.2;
      Achernar=0.2; Mira=0.2; Dubhe=0.2; Mintaka=0.2; Alnilam=0.2; Alnitak=0.2; Barnardova zvijezda=0.2;
      VY Canis Majoris=0.2; Tau Ceti=0.2; TRAPPIST-1=0.2; Golubica/Columba=0.1; Strijela/Sagitta=0.1;
      Lisica/Vulpecula=0.1; Žirafa/Camelopardalis=0.1; Ris/Lynx=0.1; Čaša/Crater=0.1; Paun/Pavo=0.1; Tukan/Tucana=0.1;
      Ždral/Grus=0.1; Štit/Scutum=0.1; Kobilica/Carina=0.1; Merak=0.1; Eta Carinae=0.1; Epsilon Eridani=0.1;
      Saiph=0.1; Alkor/Alcor=0.1`,
  },
  {
    slug: "astronaut",
    group: "kviz",
    title: "Astronaut ili svemirska misija",
    hint: "Astronaut, kozmonaut, letjelica, sonda, teleskop ili svemirski program",
    strip: [],
    answers: `Neil Armstrong/Armstrong=12; Jurij Gagarin/Gagarin=10; Apollo 11=6; Buzz Aldrin/Aldrin=5;
      ISS/Međunarodna svemirska postaja=4; Sputnik=4; Apollo 13=3; Apollo/Program Apollo=3;
      Valentina Tereškova/Tereškova=3; Space Shuttle/Spejs šatl/Svemirski šatl=3; Lajka=2.5;
      Voyager/Voyager 1/Voyager 2=2.5; Sojuz=2; Mir=2; Challenger=2; Hubble=2; James Webb/Teleskop James Webb=2;
      Curiosity=2; Artemis=2; Michael Collins/Collins=1.5; John Glenn/Glenn=1.5; Vostok 1/Vostok=1.5; Columbia=1.5;
      Perseverance=1.5; Alan Shepard/Shepard=1; Aleksej Leonov/Leonov=1; Sally Ride=1; Chris Hadfield/Hadfield=1;
      Mercury/Projekt Mercury=1; Gemini=1; Discovery=1; Atlantis=1; Endeavour=1; Skylab=1; Pioneer=1; New Horizons=1;
      Cassini=1; Opportunity=1; Crew Dragon/Dragon=1; Starship=1; Saturn V/Saturn 5=1; German Titov/Titov=0.5;
      Samantha Cristoforetti/Cristoforetti=0.5; Scott Kelly=0.5; Christa McAuliffe=0.5; Gene Cernan/Cernan=0.5;
      Jim Lovell/Lovell=0.5; Buran=0.5; Saljut=0.5; Tiangong=0.5; Juno=0.5; Galileo=0.5; Rosetta=0.5; Spirit=0.5;
      Viking=0.5; Ingenuity=0.5; Luna=0.5; Falcon 9=0.5; Kepler=0.5; Ariane=0.5; Tim Peake=0.3; Thomas Pesquet=0.3;
      Alexander Gerst=0.3; Mark Kelly=0.3; Peggy Whitson=0.3; Pete Conrad=0.3; Alan Bean=0.3; Gus Grissom/Grissom=0.3;
      Ed White=0.3; Yang Liwei=0.3; Kalpana Chawla=0.3; Vladimir Komarov/Komarov=0.3; Dennis Tito=0.3;
      Apollo-Sojuz=0.3; Philae=0.3; Sojourner=0.3; Pathfinder=0.3; Mariner=0.3; Venera=0.3; Chang'e=0.3;
      Chandrayaan=0.3; Orion=0.3; Explorer 1=0.3; Parker Solar Probe/Parker=0.3; Edgar Mitchell=0.2; David Scott=0.2;
      Harrison Schmitt=0.2; John Young=0.2; Charlie Duke=0.2; James Irwin=0.2; Roger Chaffee=0.2; Ilan Ramon=0.2;
      Sigmund Jähn=0.2; Gaia=0.2; Hayabusa=0.2; DART=0.2; Rakesh Sharma=0.1; Jean-Loup Chrétien=0.1; OSIRIS-REx=0.1;
      BepiColombo=0.1; Mars Express=0.1; ExoMars=0.1; JUICE=0.1; Vanguard=0.1; Lunohod=0.1`,
  },
  {
    slug: "dunav-grad",
    group: "kviz",
    title: "Grad ili mjesto na Dunavu",
    hint: "Bilo koja država, od izvora u Njemačkoj do ušća u Crno more",
    strip: [],
    answers: `Beč=12; Budimpešta=12; Vukovar=10; Bratislava=8; Beograd=8; Novi Sad=6; Linz=4; Ilok=4; Ulm=2;
      Regensburg=2; Ingolstadt=1.5; Passau=1.5; Melk=1; Krems=1; Esztergom=1; Mohács/Mohač=1; Batina=1; Aljmaš=1;
      Apatin=1; Smederevo=1; Zemun=1; Sremski Karlovci=1; Vidin=1; Ruse=1; Donaueschingen=1; Mauthausen=0.5;
      Tulln=0.5; Komárno=0.5; Visegrád=0.5; Vác=0.5; Szentendre=0.5; Dunaújváros=0.5; Paks=0.5; Baja=0.5; Dalj=0.5;
      Erdut=0.5; Šarengrad=0.5; Bačka Palanka=0.5; Petrovaradin=0.5; Golubac=0.5; Kladovo=0.5;
      Drobeta-Turnu Severin=0.5; Giurgiu=0.5; Brăila/Braila=0.5; Galați/Galaţi/Galati=0.5; Tulcea=0.5; Silistra=0.5;
      Neu-Ulm=0.3; Donauwörth=0.3; Straubing=0.3; Deggendorf=0.3; Dürnstein=0.3; Štúrovo=0.3; Komárom=0.3; Sotin=0.3;
      Donji Milanovac=0.3; Veliko Gradište=0.3; Orșova/Oršova=0.3; Calafat=0.3; Călărași/Calarasi=0.3;
      Cernavodă/Cernavoda=0.3; Sulina=0.3; Lom=0.3; Svištov=0.3; Izmail=0.3; Tuttlingen=0.2; Sigmaringen=0.2;
      Neuburg=0.2; Kelheim=0.2; Hainburg=0.2; Opatovac=0.2; Bezdan=0.2; Oltenița=0.2; Nikopol=0.2; Kozloduj=0.2;
      Günzburg=0.1; Dillingen=0.1; Vilshofen=0.1; Grein=0.1; Ybbs=0.1; Prahovo=0.1; Bogojevo=0.1; Corabia=0.1;
      Turnu Măgurele=0.1; Zimnicea=0.1; Kilija=0.1; Vilkove=0.1; Giurgiulești=0.1; Tutrakan=0.1; Reni=0.1`,
  },
  {
    slug: "jadran-grad",
    group: "kviz",
    title: "Grad ili mjesto na Jadranu izvan Hrvatske",
    hint: "Italija, Slovenija, BiH, Crna Gora ili Albanija; mora biti na moru",
    strip: [],
    answers: `Venecija/Venezia=10; Trst/Trieste=8; Budva=6; Neum=6; Bari=5; Rimini=5; Piran=5; Koper=5; Kotor=5;
      Ancona/Ankona=4; Portorož=4; Herceg Novi=4; Bar=4; Ulcinj=4; Pescara=3; Izola=3; Tivat=3; Drač/Durrës=3;
      Brindisi=2; Ravenna=2; Lignano=2; Sveti Stefan=2; Valona/Vlorë=2; Otranto=1.5; Jesolo=1.5; Bibione=1.5;
      Riccione=1.5; Petrovac=1.5; Perast=1.5; Chioggia=1; Grado=1; Caorle=1; Pesaro=1; Ankaran=1; Igalo=1; Sutomore=1;
      Bečići=1; Monfalcone=0.5; Cesenatico=0.5; Cervia=0.5; Cattolica=0.5; Fano=0.5; Senigallia=0.5;
      San Benedetto del Tronto=0.5; Termoli=0.5; Vieste=0.5; Manfredonia=0.5; Barletta=0.5; Trani=0.5; Monopoli=0.5;
      Polignano a Mare/Polignano=0.5; Risan=0.5; Ada Bojana=0.5; Shëngjin/Šengjin=0.5; Duino=0.3; Muggia=0.3;
      Molfetta=0.3; Ortona=0.3; Strunjan=0.3; Rafailovići=0.3; Bijela=0.3; Dobrota=0.3; Velipojë=0.3; Giulianova=0.2;
      Vasto=0.2; Comacchio=0.2; Bellaria=0.2; Civitanova Marche=0.2; Pržno=0.2; Prčanj=0.2; Đenovići=0.2; Golem=0.2;
      Orikum=0.2; Porto Recanati=0.1; Bisceglie=0.1; Gabicce Mare=0.1; Rodi Garganico=0.1; Kumbor=0.1`,
  },
  {
    slug: "opera-balet",
    group: "kviz",
    title: "Opera, opereta ili balet",
    hint: "Naslov djela, i hrvatska djela; hrvatski ili izvorni naslov",
    strip: ["opera","balet","opereta"],
    answers: `Carmen=6.5; Labuđe jezero=6.5; Orašar=5; Traviata/La Traviata=5; Aida=5; Čarobna frulja/Die Zauberflöte=4;
      Figarov pir/Le nozze di Figaro=3; Madama Butterfly/Madame Butterfly=3; Tosca=3; La Bohème/Boheme=3; Rigoletto=3;
      Seviljski brijač/Il barbiere di Siviglia=3; Nikola Šubić Zrinjski/Zrinjski=3; Ero s onoga svijeta/Ero=3;
      Nabucco=2.5; Don Giovanni=2.5; Turandot=2.5; Trnoružica/Uspavana ljepotica=2.5; Otello=1.5; Trubadur/Il trovatore=1.5;
      Pajaci/I Pagliacci=1.5; Cavalleria rusticana=1.5; Šišmiš/Die Fledermaus=1.5; Vesela udovica=1.5; Giselle/Žizela=1.5;
      Porin=1; Bolero=1; Posvećenje proljeća/Le Sacre du printemps=1; Žar-ptica=1; Romeo i Julija=1;
      Licitarsko srce=1; Falstaff=0.8; Tannhäuser=0.8; Lohengrin=0.8; Tristan i Izolda=0.8; Prsten Nibelunga=0.8;
      Valkira/Die Walküre=0.8; Fidelio=0.8; Evgenij Onjegin/Jevgenij Onjegin=0.8; Norma=0.8; Vilim Tell/Guillaume Tell=0.8;
      Faust=0.8; Porgy i Bess=0.8; Così fan tutte=0.8; Pepeljuga=0.8; Splitski akvarel=0.8; Mala Floramye=0.8;
      Kneginja čardaša/Čardaška kneginja=0.8; Barun Trenk=0.8; Orfej u podzemlju=0.8; Ciganski barun=0.8;
      Don Quijote/Don Kihot=0.8; Spartak=0.8; Đavo u selu=0.8; Ljubav i zloba=0.4; Mila Gojsalića=0.4;
      Krabuljni ples/Un ballo in maschera=0.4; Moć sudbine/La forza del destino=0.4; Don Carlos=0.4; Parsifal=0.4;
      Leteći Holandez=0.4; Pikova dama=0.4; Boris Godunov=0.4; Prodana nevjesta=0.4; Rusalka=0.4; Salome=0.4;
      Lucia di Lammermoor=0.4; Ljubavni napitak/L'elisir d'amore=0.4; Hoffmannove priče=0.4; Orfej i Euridika=0.4;
      Otmica iz saraja=0.4; Gianni Schicchi=0.4; Grof Luksemburg=0.4; Grofica Marica=0.4; Petruška=0.4;
      Coppélia/Copelija=0.4; Bajadera=0.4; Macbeth=0.2; Rajnino zlato=0.2; Sumrak bogova=0.2; Knez Igor=0.2;
      Elektra=0.2; Kavalir s ružom/Der Rosenkavalier=0.2; Mjesečarka/La sonnambula=0.2; Lakmé=0.2;
      Samson i Dalila=0.2; Manon=0.2; Dido i Eneja=0.2; Manon Lescaut=0.2; Ljubav za tri naranče=0.2;
      Lijepa Helena=0.2; Zemlja smiješka=0.2; Mikado=0.2; Silfida/La Sylphide=0.2; Gajane=0.2; Ohridska legenda=0.2;
      Popodne jednog fauna=0.2; Siegfried=0.2; Wozzeck=0.2; Werther=0.2; Idomeneo=0.2; Andrea Chénier=0.2;
      Gioconda=0.2; Ernani=0.2; Simon Boccanegra=0.2; Peter Grimes=0.2; Lady Macbeth Mcenskog okruga=0.2;
      Gusari iz Penzancea=0.2; Noć u Veneciji=0.2; Gusar/Le Corsaire=0.2; Daphnis i Chloé=0.2; Pulcinella=0.2;
      Adriana Lecouvreur=0.1; Mefistofele=0.1; Raymonda=0.1; Kameni cvijet=0.1`,
  },
  {
    slug: "anticki-grad",
    group: "kviz",
    title: "Antički grad",
    hint: "Grad iz antike; vrijedi antički ili današnji naziv grada koji je tada postojao",
    strip: ["grad"],
    answers: `Rim=8.5; Atena=7; Sparta=5; Troja=5; Kartaga=4.5; Pompeji=4.5; Salona/Solin=4.5; Aleksandrija=3.5; Babilon=3.5;
      Bizant/Konstantinopol/Carigrad=3.5; Jeruzalem=1.5; Teba/Luksor=1.5; Korint=1.5; Olimpija=1.5; Delfi=1.5; Mikena=1.5; Efez=1.5;
      Petra=1.5; Pula/Pola=1.5; Siscia/Sisak=1.5; Knosos=1.5; Persepolis=1.5; Herkulanej=1.5; Zadar/Iader/Jader=1.5;
      Epidaurum/Cavtat=1.5; Narona=1.5; Mursa/Osijek=1.5; Andautonija=1.5; Issa/Vis=1.5; Pharos/Stari Grad=1.5;
      Palmira=1.5; Milet=0.9; Pergam=0.9; Antiohija=0.9; Damask=0.9; Tir=0.9; Jerihon=0.9; Ur=0.9; Ninive/Niniva=0.9; Memfis=0.9;
      Ostija=0.9; Akvileja/Aquileia=0.9; Cibalae/Vinkovci=0.9; Tragurion/Trogir=0.9; Sirmium=0.9; Singidunum=0.9; Sirakuza=0.9;
      Londinium=0.9; Halikarnas=0.9; Rodos=0.9; Mohendžo-daro=0.9; Sidon=0.4; Biblos=0.4; Uruk=0.4; Suza=0.4; Ravena=0.4;
      Epetion/Stobreč=0.4; Burnum=0.4; Asseria=0.4; Aenona/Nin=0.4; Senia/Senj=0.4; Tarsatica=0.4;
      Parentium/Poreč=0.4; Nezakcij/Nesactium=0.4; Naissus=0.4; Emona=0.4; Dyrrachium/Drač=0.4; Leptis Magna=0.4;
      Agrigent=0.4; Paestum=0.4; Massalia=0.4; Baalbek=0.4; Hatuša=0.4; Harappa=0.4; Pela=0.4; Argos=0.4; Epidaur=0.4;
      Scardona/Skradin=0.3; Aquae Iasae=0.3; Marsonia=0.3; Poetovio=0.3; Doclea/Duklja=0.3; Butrint=0.3;
      Apolonija=0.3; Utika=0.3; Neapolis=0.3; Tarent=0.3; Sibaris=0.3; Lugdunum=0.3; Jerash/Gerasa=0.3; Masada=0.3;
      Gaza=0.3; Smirna=0.3; Sard=0.3; Gordij=0.3; Akad=0.3; Amarna=0.3; Kirena=0.3; Aksum=0.3; Stagira=0.3;
      Tirint=0.3; Megara=0.3; Eleusina/Eleusis=0.3; Alba Longa=0.3; Kapua=0.3; Celeia=0.2; Krotone=0.2; Eboracum=0.2;
      Tarraco=0.2; Kafarnaum=0.2; Lagaš=0.2; Mari=0.2; Ebla=0.2; Ugarit=0.2; Abydos=0.2; Heliopol=0.2; Meroe=0.2;
      Ktezifont=0.2; Seleukija=0.2; Samarkand/Marakanda=0.2; Aige/Vergina=0.2; Olint=0.2; Pil=0.2; Dodona=0.2;
      Veji=0.2; Tarkvinija=0.2; Brundizij=0.2; Kuma=0.2; Emerita Augusta=0.1; Naukratis=0.1; Varvaria=0.1`,
  },
  {
    slug: "grcko-slovo",
    group: "kviz",
    title: "Slovo grčkog alfabeta",
    hint: "Naziv slova; vrijede i stara slova koja se više ne koriste",
    strip: ["slovo"],
    answers: `Alfa=15; Beta=12; Gama/Gamma=10; Delta=10; Omega=10; Pi=8; Sigma=6; Lambda/Lamda=5; Epsilon=5;
      Theta/Teta=4; Mi/Mu=4; Fi/Phi=3; Psi=3; Tau=3; Ro/Rho=2.5; Zeta=2.5; Eta=2; Kapa/Kappa=2; Jota/Iota=2;
      Ni/Nu=1.5; Ksi/Xi=1.5; Hi/Chi=1.5; Ipsilon/Upsilon/Ypsilon=1.5; Omikron/Omicron=1.5; Kopa/Koppa=0.2; Sampi=0.2;
      Stigma=0.1; San=0.1; Heta=0.1; Digama/Digamma=0.1`,
  },
  {
    slug: "eurovizija-pobjednik",
    group: "kviz",
    title: "Pobjednik Eurovizije: izvođač ili pjesma",
    hint: "Bilo koja godina od 1956. do 2025.",
    strip: [],
    answers: `ABBA/Waterloo=15; Riva/Rock Me=12; Måneskin/Zitti e buoni=8;
      Conchita Wurst/Conchita/Rise Like a Phoenix=6; Loreen/Euphoria/Tattoo=6; Marija Šerifović/Molitva=5;
      Lordi/Hard Rock Hallelujah=4; Alexander Rybak/Rybak/Fairytale=4;
      Céline Dion/Celine Dion/Ne partez pas sans moi=4; Nemo/The Code=3; Ruslana/Wild Dances=3; Netta/Toy=3;
      Duncan Laurence/Arcade=2; Kalush Orchestra/Kalush/Stefania=2; Måns Zelmerlöw/Heroes=2; Lena/Satellite=2;
      Jamala/1944=1.5; Dima Bilan/Believe=1.5; Helena Paparizou/My Number One=1.5; JJ/Wasted Love=1.5;
      Dana International/Diva=1.5; Salvador Sobral/Amar pelos dois=1; Johnny Logan/What's Another Year/Hold Me Now=1;
      Toto Cutugno/Insieme/Insieme 1992=1; Brotherhood of Man/Save Your Kisses for Me=0.5;
      Bucks Fizz/Making Your Mind Up=0.5; Sandie Shaw/Puppet on a String=0.5; Lulu/Boom Bang-a-Bang=0.5;
      Nicole/Ein bißchen Frieden/Ein bisschen Frieden=0.5; Emmelie de Forest/Only Teardrops=0.5;
      Ell & Nikki/Running Scared=0.5; Sertab Erener/Everyway That I Can=0.5; Secret Garden/Nocturne=0.5;
      Olsen Brothers/Fly on the Wings of Love=0.5; Katrina and the Waves/Love Shine a Light=0.5;
      France Gall/Poupée de cire, poupée de son=0.5; Udo Jürgens/Merci, Chérie=0.5;
      Gigliola Cinquetti/Non ho l'età=0.5; Dana/All Kinds of Everything=0.3; Vicky Leandros/Après toi=0.3;
      Massiel/La, la, la=0.3; Milk and Honey/Hallelujah=0.3; Carola/Fångad av en stormvind=0.3;
      Herreys/Diggi-Loo Diggi-Ley=0.3; Bobbysocks/La det swinge=0.3; Sandra Kim/J'aime la vie=0.3;
      Lys Assia/Refrain=0.3; Izhar Cohen/A-Ba-Ni-Bi=0.2; Linda Martin/Why Me=0.2; Niamh Kavanagh/In Your Eyes=0.2;
      Paul Harrington i Charlie McGettigan/Rock 'n' Roll Kids=0.2; Eimear Quinn/The Voice=0.2;
      Charlotte Nilsson/Take Me to Your Heaven=0.2; Tanel Padar/Dave Benton/Everybody=0.2; Marie N/I Wanna=0.2;
      André Claveau/Dors, mon amour=0.1; Jacqueline Boyer/Tom Pillibi=0.1; Jean-Claude Pascal/Nous les amoureux=0.1;
      Isabelle Aubret/Un premier amour=0.1; Grethe i Jørgen Ingmann/Dansevise=0.1; Salomé/Vivo cantando=0.1;
      Lenny Kuhr/De troubadour=0.1; Frida Boccara/Un jour, un enfant=0.1; Séverine/Un banc, un arbre, une rue=0.1;
      Anne-Marie David/Tu te reconnaîtras=0.1; Teach-In/Ding-a-dong=0.1; Marie Myriam/L'oiseau et l'enfant=0.1;
      Corinne Hermès/Si la vie est cadeau=0.1; Corry Brokken/Net als toen=0.1; Teddy Scholten/Een beetje=0.1`,
  },
  {
    slug: "geometrija",
    group: "kviz",
    title: "Geometrijski lik ili tijelo",
    hint: "Lik u ravnini ili tijelo u prostoru",
    strip: [],
    answers: `Trokut=10; Kvadrat=10; Krug=10; Pravokutnik=8; Kocka/Heksaedar=6; Kugla/Sfera=5; Valjak/Cilindar=5;
      Stožac/Konus=5; Piramida=5; Romb=4; Trapez=4; Kvadar=4; Paralelogram=3; Peterokut/Pentagon=3;
      Šesterokut/Heksagon=3; Elipsa=3; Prizma=3; Deltoid=2; Osmerokut/Oktogon=2; Mnogokut/Poligon=1.5; Četverokut=1.5;
      Tetraedar=1.5; Sedmerokut=1; Deseterokut=1; Oktaedar=1; Dodekaedar=1; Ikozaedar=1; Polukrug=1; Kružnica=1;
      Deveterokut=0.5; Dvanaesterokut=0.5; Kružni isječak=0.5; Jednakostraničan trokut=0.5; Pravokutni trokut=0.5;
      Torus=0.5; Elipsoid=0.5; Polukugla=0.5; Pentagram/Zvijezda petokraka=0.5; Kružni odsječak=0.3;
      Kružni vijenac/Kružni prsten=0.3; Jednakokračan trokut=0.3; Krnja piramida=0.3; Krnji stožac=0.3;
      Paralelepiped=0.3; Romboid=0.3; Möbiusova vrpca=0.3; Teserakt/Hiperkocka=0.3; Raznostraničan trokut=0.2;
      Paraboloid=0.2; Hiperboloid=0.2; Heksagram=0.2; Romboedar=0.2; Trapezoid=0.2; Antiprizma=0.1; Kuboktaedar=0.1`,
  },
  {
    slug: "redatelj",
    group: "kviz",
    title: "Filmski redatelj ili redateljica",
    hint: "Bilo koja zemlja, i hrvatski i jugoslavenski redatelji",
    strip: [],
    answers: `Steven Spielberg/Spielberg=6.5; Quentin Tarantino/Tarantino=5.5; Christopher Nolan/Nolan=4.5;
      Martin Scorsese/Scorsese=4; Alfred Hitchcock/Hitchcock=4; Stanley Kubrick/Kubrick=3.5;
      Francis Ford Coppola/Coppola=2.5; James Cameron/Cameron=2.5; Tim Burton/Burton=2.5; Emir Kusturica/Kusturica=2.5;
      Woody Allen/Allen=2; Ridley Scott=2; George Lucas/Lucas=2; Peter Jackson/Jackson=2; David Fincher/Fincher=2;
      Wes Anderson=1.5; Federico Fellini/Fellini=1.5; Sergio Leone/Leone=1.5; Guy Ritchie/Ritchie=1.5;
      Clint Eastwood/Eastwood=1.5; Denis Villeneuve/Villeneuve=1.5; Ingmar Bergman/Bergman=1.5; Akira Kurosawa/Kurosawa=1.5;
      Charlie Chaplin/Chaplin=1.5; Pedro Almodóvar/Almodóvar=1.5; David Lynch/Lynch=1.5; Vinko Brešan/Brešan=1.5;
      Lars von Trier/Von Trier=1; Roman Polanski/Polanski=1; Oliver Stone=1; Mel Gibson/Gibson=1;
      Robert Zemeckis/Zemeckis=1; Michael Bay=1; Guillermo del Toro/Del Toro=1; Hayao Miyazaki/Miyazaki=1;
      Braća Coen/Coen/Joel Coen/Ethan Coen=1; Dalibor Matanić/Matanić=1; Danis Tanović/Tanović=1; Ron Howard=0.7;
      Alfonso Cuarón/Cuarón=0.7; Alejandro González Iñárritu/Iñárritu=0.7; Bong Joon-ho=0.7; Jean-Luc Godard/Godard=0.7;
      François Truffaut/Truffaut=0.7; Luc Besson/Besson=0.7; Andrej Tarkovski/Tarkovski=0.7; Sergej Ejzenštejn/Ejzenštejn=0.7;
      Orson Welles/Welles=0.7; Billy Wilder/Wilder=0.7; John Ford=0.7; Miloš Forman/Forman=0.7; Greta Gerwig/Gerwig=0.7;
      Spike Lee=0.7; Veljko Bulajić/Bulajić=0.7; Branko Bauer=0.7; Krsto Papić/Papić=0.7; Vatroslav Mimica/Mimica=0.7;
      Rajko Grlić/Grlić=0.7; Arsen Anton Ostojić/Ostojić=0.7; Antun Vrdoljak/Vrdoljak=0.7; Jasmila Žbanić/Žbanić=0.7;
      Srđan Dragojević/Dragojević=0.7; Slobodan Šijan/Šijan=0.7; Tony Scott=0.3; Zack Snyder/Snyder=0.3;
      J. J. Abrams/Abrams=0.3; Sam Raimi/Raimi=0.3; Frank Capra/Capra=0.3; Fritz Lang=0.3;
      Michelangelo Antonioni/Antonioni=0.3; Vittorio De Sica/De Sica=0.3; Pier Paolo Pasolini/Pasolini=0.3;
      Bernardo Bertolucci/Bertolucci=0.3; Paolo Sorrentino/Sorrentino=0.3; Roberto Benigni/Benigni=0.3;
      Werner Herzog/Herzog=0.3; Wim Wenders/Wenders=0.3; Michael Haneke/Haneke=0.3;
      Krzysztof Kieślowski/Kieślowski=0.3; Jim Jarmusch/Jarmusch=0.3; Sofia Coppola=0.3; Kathryn Bigelow/Bigelow=0.3;
      Darren Aronofsky/Aronofsky=0.3; Paul Thomas Anderson=0.3; Danny Boyle/Boyle=0.3;
      Steven Soderbergh/Soderbergh=0.3; John Carpenter/Carpenter=0.3; Wes Craven/Craven=0.3;
      Brian De Palma/De Palma=0.3; David Lean=0.3; Taika Waititi/Waititi=0.3; Jordan Peele/Peele=0.3;
      Yorgos Lanthimos/Lanthimos=0.3; Ang Lee=0.3; Luis Buñuel/Buñuel=0.3; Dušan Makavejev/Makavejev=0.3;
      Fadil Hadžić=0.3; Zoran Tadić=0.3; Lordan Zafranović/Zafranović=0.3; Zrinko Ogresta/Ogresta=0.3;
      Hrvoje Hribar/Hribar=0.3; Antonio Nuić/Nuić=0.3; Branko Schmidt=0.3; Jakov Sedlar/Sedlar=0.3;
      Goran Marković=0.3; Dušan Vukotić/Vukotić=0.3; Lukas Nola=0.3; Luchino Visconti=0.2;
      Roberto Rossellini/Rossellini=0.2; Giuseppe Tornatore/Tornatore=0.2; Rainer Werner Fassbinder/Fassbinder=0.2;
      Andrzej Wajda/Wajda=0.2; Jane Campion/Campion=0.2; Terrence Malick/Malick=0.2; Ken Loach/Loach=0.2;
      Sidney Lumet/Lumet=0.2; Elia Kazan/Kazan=0.2; Ari Aster=0.2; Park Chan-wook=0.2; Wong Kar-wai=0.2;
      Zhang Yimou=0.2; John Woo=0.2; Nikita Mihalkov/Mihalkov=0.2; Ognjen Sviličić=0.2; Bogdan Žižić=0.2;
      Nikola Tanhofer=0.2; Ante Babaja=0.2; Aida Begić=0.2; Goran Paskaljević=0.2; Želimir Žilnik=0.2;
      Živojin Pavlović=0.2; Aleksandar Petrović=0.2; Nevio Marasović=0.2; Snježana Tribuson=0.2; Kristijan Milić=0.2;
      Mike Leigh=0.1; Ruben Östlund=0.1; Xavier Dolan=0.1; Satyajit Ray=0.1; Abbas Kiarostami=0.1; Asghar Farhadi=0.1;
      Carlos Saura=0.1; Costa-Gavras=0.1; Theo Angelopoulos=0.1; Jacques Tati=0.1; Jean Renoir=0.1; Agnès Varda=0.1;
      Puriša Đorđević=0.1; Tomislav Radić=0.1; Ivan Salaj=0.1; Juraj Lerotić=0.1; Bobo Jelčić=0.1; Igor Mirković=0.1;
      Goran Rušinović=0.1; Ivona Juka=0.1; Hana Jušić=0.1; Andrej Zvjagincev=0.1; Ines Tanović=0.1;
      Obrad Gluščević=0.1; Robert Bresson=0.1`,
  },
  {
    slug: "svetac",
    group: "kviz",
    title: "Svetac, svetica ili blaženik",
    hint: "Bilo koje Crkve; i biblijski sveci i apostoli",
    strip: ["sveti","sveta","sv","svetac","svetica","blazeni","blazena"],
    answers: `Sveti Nikola/Nikola=6.5; Sveti Petar/Petar=6.5; Djevica Marija/Sveta Marija/Bogorodica/Gospa=5;
      Sveti Pavao/Pavao=4; Sveti Josip/Josip=4; Sveti Antun/Antun Padovanski/Antun=4; Sveti Franjo/Franjo Asiški=4;
      Sveti Vlaho/Vlaho/Blaž=4; Sveti Ivan Krstitelj/Ivan Krstitelj/Sveti Ivan=3; Sveti Juraj/Juraj=3;
      Sveti Duje/Duje/Dujam=3; Sveti Martin/Martin=2.5; Sveta Lucija/Lucija=2.5; Alojzije Stepinac/Stepinac=2.5;
      Sveti Vid/Vid=1.5; Sveti Mihovil/Mihovil/Mihael=1.5; Sveti Jeronim/Jeronim=1.5; Sveti Stjepan/Stjepan prvomučenik=1.5;
      Sveti Luka/Luka=1.5; Sveti Marko/Marko=1.5; Sveti Matej/Matej=1.5; Sveti Andrija/Andrija=1.5; Sveta Ana/Ana=1.5;
      Marija Magdalena=1.5; Sveta Barbara/Barbara=1.5; Majka Tereza/Majka Terezija=1.5; Sveti Rok/Rok=1.5;
      Sveti Valentin/Valentin=1.5; Sveti Patrik/Patrik=1.5; Ivan Pavao II=1.5; Leopold Mandić/Sveti Leopold=1.5;
      Nikola Tavelić/Sveti Nikola Tavelić=1.5; Sveti Toma/Toma apostol=1; Toma Akvinski=1; Sveti Jakov/Jakov=1;
      Sveta Katarina/Katarina=1; Ivana Orleanska=1; Sveti Lovro/Lovro=1; Ćiril i Metod/Ćiril/Metod=1;
      Sveti Sava/Sava=1; Padre Pio/Sveti Pio=1; Ivan Evanđelist/Ivan apostol=0.8; Sveta Klara/Klara=0.8;
      Terezija Avilska=0.8; Sveta Eufemija/Eufemija/Fuma=0.8; Sveta Stošija/Stošija/Anastazija=0.8;
      Sveti Šime/Šimun Bogoprimac=0.8; Sveti Florijan/Florijan=0.8; Sveti Sebastijan/Sebastijan=0.8;
      Sveti Benedikt/Benedikt=0.8; Sveti Dominik/Dominik=0.8; Ignacije Loyola=0.8; Sveti Augustin/Augustin=0.8;
      Sveti Kristofor/Kristofor=0.8; Marko Križevčanin=0.8; Sveti Filip/Filip=0.4; Sveti Bartolomej/Bartul=0.4;
      Juda Tadej=0.4; Sveta Margareta=0.4; Sveta Agata=0.4; Sveta Cecilija=0.4;
      Mala Terezija/Terezija od Djeteta Isusa=0.4; Sveta Rita=0.4; Sveta Helena=0.4; Sveti Krševan/Krševan=0.4;
      Sveti Kvirin/Kvirin=0.4; Sveti Tripun/Tripun=0.4; Franjo Ksaverski=0.4; Sveti Ambrozije=0.4; Grgur Veliki=0.4;
      Vasilije Ostroški=0.4; Ivan Merz=0.4; Sveti Silvestar/Silvestar=0.4; Ivan Nepomuk=0.4; Vinko Paulski=0.4;
      Don Bosco/Ivan Bosco=0.4; Sveti Lazar/Lazar=0.4; Arkanđeo Gabrijel/Gabrijel=0.4; Sveti Ilija/Ilija=0.4;
      Matija apostol=0.2; Sveti Joakim/Joakim=0.2; Sveta Agneza=0.2; Miroslav Bulešić=0.2; Marija Petković=0.2;
      Augustin Kažotić=0.2; Alojzije Gonzaga=0.2; Arkanđeo Rafael=0.2; Ivan Zlatousti=0.2; Antun Pustinjak=0.2;
      Sveti Vjenceslav=0.2; Stjepan Ugarski=0.2; Sveti Ladislav=0.2; Ivan Kapistran=0.2; Kuzma i Damjan=0.2;
      Sveti Bernard=0.2; Atanazije=0.2; Sveti Kliment=0.2; Sveti Mavro=0.1; Sveti Spiridon=0.1`,
  },
  {
    slug: "nepostojeca-drzava",
    group: "kviz",
    title: "Država ili carstvo koje više ne postoji",
    hint: "Bilo koje doba; i države kojih je Hrvatska bila dio",
    strip: [],
    answers: `Jugoslavija/SFRJ/SFR Jugoslavija/FNRJ=10; SSSR/Sovjetski Savez=8.5; Austro-Ugarska/Austrougarska=7;
      Rimsko Carstvo/Zapadno Rimsko Carstvo/Rim=7; Osmansko Carstvo/Otomansko Carstvo=5;
      NDH/Nezavisna Država Hrvatska=4.5; Čehoslovačka=4.5; Dubrovačka Republika=4.5;
      Istočna Njemačka/DDR/Njemačka Demokratska Republika=3.5; Bizant/Bizantsko Carstvo/Istočno Rimsko Carstvo=3.5;
      Mletačka Republika/Venecija=2.5; Prusija=2.5; Sveto Rimsko Carstvo=2.5; Kraljevina SHS=2.5;
      Zapadna Njemačka/SR Njemačka=1.5; Austrijsko Carstvo/Habsburška Monarhija=1.5; Kraljevina Jugoslavija=1.5;
      Mongolsko Carstvo=1.5; Perzijsko Carstvo/Perzija=1.5; Kartaga=1.5; Carstvo Inka/Inke=1.5;
      Treći Reich/Nacistička Njemačka=1.5; Babilon=1.5; Srbija i Crna Gora=1.5; Stari Egipat=1.5;
      Astečko Carstvo/Asteci=1.5; Britansko Carstvo=1.5; Rusko Carstvo=1.5; SRJ/Savezna Republika Jugoslavija=0.9;
      Republika Srpska Krajina/Krajina=0.9; Herceg-Bosna=0.9; Asirija=0.9; Sumer=0.9; Makedonsko Carstvo=0.9; Sparta=0.9; Maje=0.9;
      Franačka/Franačko Carstvo=0.9; Kraljevina Hrvatska=0.9; Ilirske provincije=0.9;
      Bosansko Kraljevstvo/Kraljevina Bosna=0.9; Ilirija=0.9; Rodezija=0.9; Zair=0.9; Atena=0.4; Weimarska Republika=0.4;
      Trojedna Kraljevina=0.4; Država SHS=0.4; Duklja/Zeta=0.4; Srpsko Carstvo=0.4; Papinska Država=0.4; Burma=0.4;
      Siam=0.4; Cejlon=0.4; Abesinija=0.4; Južni Vijetnam=0.4; Poljsko-Litavska Unija=0.4; Kijevska Rus=0.4;
      Hunsko Carstvo/Huni=0.4; Mogulsko Carstvo=0.4; Kraljevina Havaji=0.4;
      Konfederacija/Konfederativne Američke Države=0.4; Hetitsko Carstvo/Hetiti=0.4; Slobodni Teritorij Trst=0.4;
      Slobodna Država Rijeka=0.4; Raška=0.3; Bugarsko Carstvo=0.3; Kraljevina Srbija=0.3; Kraljevina Crna Gora=0.3;
      Kraljevina Italija=0.3; Kraljevina Sardinija=0.3; Kraljevina Dviju Sicilija=0.3; Firentinska Republika=0.3;
      Genovska Republika=0.3; Tibet=0.3; Gornja Volta=0.3; Tanganjika=0.3; Zanzibar=0.3; Biafra=0.3;
      Ujedinjena Arapska Republika=0.3; Avarski Kaganat=0.3; Ostrogotsko Kraljevstvo/Ostrogoti=0.3; Etrurija=0.3;
      Kmersko Carstvo=0.3; Teksaška Republika=0.3; Akadsko Carstvo=0.3; Bavarska=0.2; Dahomej=0.2; Sjeverni Jemen=0.2;
      Južni Jemen=0.2; Novgorodska Republika=0.2; Vlaška=0.2; Hazarski Kaganat=0.2; Vizigoti=0.2; Numidija=0.2;
      Partsko Carstvo=0.2; Seleukidsko Carstvo=0.2; Carstvo Mali=0.2; Zulu Kraljevstvo=0.2; Lidija=0.2; Saska=0.1;
      Frigija=0.1; Urartu=0.1; Songaj/Songhaj=0.1`,
  },
  {
    slug: "vulkan",
    group: "kviz",
    title: "Vulkan",
    hint: "Aktivan ili ugasli, i izvan Zemlje",
    strip: ["vulkan"],
    answers: `Vezuv=12; Etna=12; Stromboli=5; Krakatau/Krakatoa=5; Fuji/Fudži=5; Kilimandžaro=4; Eyjafjallajökull=3;
      St. Helens/Mount St. Helens/Sveta Helena=3; Mauna Loa=2; Kilauea=2; Pinatubo=2; Tambora=2; Teide=2;
      Santorini/Tera=2; Yellowstone=2; Mauna Kea=1.5; Vulcano=1.5; Popocatépetl/Popokatepetl=1.5; Elbrus=1.5;
      Ararat=1.5; Hekla=1; Cotopaxi=1; Chimborazo=1; Erebus=1; Mont Pelée=1; Nyiragongo=1; Merapi=1; Olympus Mons=1;
      Agung=0.5; Bromo=0.5; Sakurajima=0.5; Ključevska Sopka=0.5; Rainier=0.5; Paricutín=0.5; Nevado del Ruiz=0.5;
      Campi Flegrei/Flegrejska polja=0.5; Mayon=0.5; Hunga Tonga=0.5; Kamerun=0.3; Rinjani=0.3; Shasta=0.3; Hood=0.3;
      Colima=0.3; Orizaba=0.3; Villarrica=0.3; Ojos del Salado=0.3; Grímsvötn=0.3; Katla=0.3; Laki=0.3; Surtsey=0.3;
      Fagradalsfjall=0.3; Piton de la Fournaise=0.3; Kenija/Mount Kenya=0.3; Erta Ale=0.3; Taal=0.3; Ruapehu=0.3;
      Tongariro/Ngauruhoe=0.3; Puy de Dôme=0.3; Unzen=0.2; Ontake=0.2; Avačinska Sopka=0.2; Lassen=0.2;
      Llullaillaco=0.2; Chaitén=0.2; Osorno=0.2; Askja=0.2; Nyamuragira=0.2; Ol Doinyo Lengai=0.2; Taranaki=0.2;
      Haleakalā=0.2; Ischia=0.2; Pantelleria=0.1; Vulture=0.1; Laacher See=0.1; Nisiros/Nisyros=0.1`,
  },
  {
    slug: "monarhija",
    group: "kviz",
    title: "Država koja je danas monarhija",
    hint: "Kraljevina, kneževina, emirat, sultanat...; i države s britanskim kraljem na čelu",
    strip: ["kraljevina"],
    answers: `Ujedinjeno Kraljevstvo/Velika Britanija/Britanija/UK/Engleska=12; Španjolska=8; Švedska=6; Norveška=6;
      Danska=6; Nizozemska/Holandija=6; Belgija=6; Japan=5; Saudijska Arabija=5; Monako=4; Luksemburg=3;
      Lihtenštajn=3; Maroko=3; Tajland=3; Jordan=2; Kanada=2; Australija=2; Ujedinjeni Arapski Emirati/UAE/Emirati=2;
      Katar=2; Vatikan=2; Kuvajt=1.5; Brunej=1.5; Andora=1; Bahrein=1; Oman=1; Butan=1; Novi Zeland=1; Malezija=1;
      Kambodža=1; Jamajka=0.5; Bahami=0.5; Esvatini/Eswatini/Svazi=0.5; Lesoto=0.5; Tonga=0.5; Papua Nova Gvineja=0.3;
      Salomonovi Otoci=0.2; Tuvalu=0.2; Belize=0.2; Antigva i Barbuda=0.2; Sveta Lucija=0.2;
      Sveti Vincent i Grenadini=0.2; Grenada=0.2; Sveti Kristofor i Nevis=0.1`,
  },
  {
    slug: "shakespeare-lik",
    group: "kviz",
    title: "Lik iz Shakespeareova djela",
    hint: "Iz bilo koje drame; i stvarne osobe kako ih on prikazuje",
    strip: [],
    answers: `Hamlet=10; Romeo=8; Julija/Juliet=8; Macbeth=5; Otelo/Othello=4; Lady Macbeth=3.5; Kralj Lear/Lear=3.5;
      Ofelija/Ophelia=3.5; Desdemona=2.5; Jago/Iago=2.5; Julije Cezar/Cezar=2.5; Shylock/Šajlok=1.5; Puk/Puck=1.5; Prospero=1.5;
      Falstaff=1.5; Brut/Brutus=1.5; Marko Antonije/Antonije=1.5; Kleopatra=1.5; Rikard III=1.5; Merkucijo/Mercutio=1.5;
      Klaudije/Claudius=1.5; Gertruda/Gertrude=1.5; Polonije/Polonius=1.5; Ariel=1; Kaliban/Caliban=1;
      Henrik V/Princ Hal=1; Tibalt/Tybalt=1; Laert/Laertes=1; Horacije/Horatio=1; Yorick/Jorik=1;
      Kordelija/Cordelia=1; Petruchio/Petručo=1; Katarina=1; Oberon=1; Titanija/Titania=1; Miranda=0.8;
      Benvolio=0.8; Fra Lorenzo/Lorenzo=0.8; Dojilja=0.8; Montague=0.8; Capulet/Kapulet=0.8; Rosencrantz=0.8; Guildenstern=0.8;
      Banquo/Banko=0.8; Macduff/Makduf=0.8; Duncan/Dunkan=0.8; Tri vještice/Vještice=0.8; Goneril=0.8; Regan=0.8;
      Porcija/Portia=0.8; Viola=0.8; Malvolio=0.8; Kasije/Cassius=0.4; Henrik IV=0.4; Henrik VIII=0.4; Rikard II=0.4;
      Paris=0.4; Fortinbras=0.4; Duh Hamletova oca/Duh=0.4; Edmund=0.4; Edgar=0.4; Gloucester=0.4; Emilija/Emilia=0.4;
      Kasio/Cassio=0.4; Bianca=0.4; Antonio=0.4; Bassanio=0.4; Lisandar/Lysander=0.4; Demetrije/Demetrius=0.4;
      Hermija/Hermia=0.4; Helena=0.4; Bottom=0.4; Beatrice=0.4; Benedikt/Benedick=0.4; Orsino=0.4; Olivija/Olivia=0.4;
      Rozalinda/Rosalind=0.4; Orlando=0.4; Tit Andronik=0.4; Kralj Ivan=0.2; Henrik VI=0.2; Malcolm=0.2; Kent=0.2;
      Rodrigo/Roderigo=0.2; Jessica=0.2; Tezej/Theseus=0.2; Hipolita=0.2; Timon Atenjanin/Timon=0.2; Koriolan=0.2;
      Troil=0.2; Kresida=0.2; Perikle=0.2; Oktavije=0.2; Hotspur=0.2; Tamna dama=0.2; Brabancio=0.2;
      Sir Toby Belch=0.2; Feste=0.2; Jaques=0.2; Leontes=0.2; Hermiona=0.2; Perdita=0.2; Bolingbroke=0.2; Enobarb=0.1;
      Imogena=0.1`,
  },
  {
    slug: "liga-prvaka-klub",
    group: "kviz",
    title: "Klub koji je osvojio Ligu prvaka ili Kup prvaka",
    hint: "Nogomet, muški ili ženski, do 2025.",
    strip: ["fc","fk","ac","sc"],
    answers: `Real Madrid/Real=14; Barcelona/Barca/Barça=12; Bayern/Bayern München/Bayern Munchen=10;
      Milan/AC Milan=9; Liverpool=9; Manchester United/Man Utd/United=8; Juventus/Juve=7; Inter/Internazionale=7;
      Chelsea=6; Ajax/Ajax Amsterdam=5; Crvena zvezda/Crvena Zvezda/Zvezda/Red Star=5; Porto/FC Porto=4;
      PSG/Paris Saint-Germain/Paris=4; Manchester City/Man City/City=4; Borussia Dortmund/Dortmund/BVB=3.5;
      Marseille/Olympique Marseille=3; Benfica=3; Celtic=2; Steaua/Steaua Bukurešt/FCSB=2; PSV/PSV Eindhoven=1.5;
      Hamburg/Hamburger SV/HSV=1.5; Nottingham Forest/Forest=1.5; Feyenoord=1.5; Arsenal=1.5; Aston Villa/Villa=1;
      Lyon/Olympique Lyon=1; Wolfsburg=0.5; Frankfurt/1. FFC Frankfurt/Eintracht Frankfurt=0.3;
      Turbine Potsdam/Potsdam=0.2; Umeå/Umea=0.1; Duisburg=0.1`,
  },
  {
    slug: "bitka",
    group: "kviz",
    title: "Poznata bitka",
    hint: "Bilo koje doba, i hrvatske bitke i operacije; dovoljno je mjesto bitke",
    strip: ["bitka","opsada","operacija","boj"],
    answers: `Waterloo/Bitka kod Waterlooa=7.5; Vukovar/Bitka za Vukovar=7.5; Staljingrad/Bitka za Staljingrad=6;
      Normandija/Iskrcavanje u Normandiji/Dan D=4.5; Kosovska bitka/Kosovo/Kosovo polje=4;
      Krbavska bitka/Krbava/Krbavsko polje/Udbina=4; Sigetska bitka/Siget/Szigetvár=4; Termopile/Termopilski klanac=4;
      Mohačka bitka/Mohač=3; Bitka kod Siska/Sisak=3; Neretva/Bitka na Neretvi=3; Oluja/Operacija Oluja=3; Maraton=2.5;
      Sutjeska/Bitka na Sutjesci=2.5; Troja/Opsada Troje=1.5; Gvozd/Bitka na Gvozdu/Petrova gora=1.5;
      Dubrovnik/Opsada Dubrovnika=1.5; Sinj/Opsada Sinja/Sinjska bitka=1.5; Austerlitz/Slavkov=1.5; Trafalgar=1.5; Hastings=1.5;
      Gettysburg=1.5; Verdun=1.5; Pearl Harbor=1.5; Beč/Bečka bitka/Opsada Beča=1.5; Bljesak/Operacija Bljesak=1;
      Lepanto=1; Somme=1; Galipolje/Gallipoli=1; Kursk=1; Midway=1; Bitka za Britaniju=1;
      Berlin/Bitka za Berlin=1; Dunkirk/Dunkerque=1; Kana/Kane/Cannae=1; Vis/Viška bitka=1; Alamo=1;
      Maslenica=0.8; Marna=0.8; El Alamein=0.8; Lenjingrad/Opsada Lenjingrada=0.8; Moskva/Bitka za Moskvu=0.8; Iwo Jima=0.8;
      Zama=0.8; Gaugamela=0.8; Salamina=0.8; Teutoburška šuma=0.8; Agincourt=0.8; Borodino=0.8; Little Bighorn=0.8;
      Soča/Soška bojišnica/Isonzo=0.8; Dien Bien Phu=0.8; Svinjski zaljev=0.8; Kadeš=0.8; Kupres=0.4;
      Ardeni/Bitka u Ardenima=0.4; Monte Cassino=0.4; Okinawa=0.4; Is/Isos=0.4; Akcij/Actium=0.4; Alezija=0.4;
      Katalaunska polja=0.4; Poitiers=0.4; Crécy=0.4; Grunwald=0.4; Poltava=0.4; Lipsko/Bitka naroda=0.4; Marengo=0.4;
      Solferino=0.4; Sedan=0.4; Yorktown=0.4; Tsushima=0.4; Ypres=0.4; Kobarid/Caporetto=0.4; Tannenberg=0.4;
      Jutland=0.4; Tet ofenziva=0.4; Hattin=0.4; Manzikert=0.4; Megido=0.4; Bannockburn=0.4; Cer/Cerska bitka=0.4;
      Kolubara/Kolubarska bitka=0.4; Plateja=0.2; Hadrijanopol=0.2; Roncesvalles=0.2; Kulikovo polje=0.2;
      Nikopolj=0.2; Varna=0.2; Slankamen=0.2; Senta=0.2; Petrovaradin=0.2; Narva=0.2; Jena=0.2; Wagram=0.2;
      Sadova/Königgrätz=0.2; Bunker Hill=0.2; Lexington=0.2; Saratoga=0.2; Antietam=0.2; Bull Run=0.2; Piava=0.2;
      Inchon=0.2; Culloden=0.2; Stamford Bridge=0.2; Bosworth=0.2; Bijela gora=0.2; Naseby=0.2; Lützen=0.2;
      Blenheim=0.2; Rocroi=0.1; Jarmuk=0.1`,
  },
  {
    slug: "planinski-lanac",
    group: "kviz",
    title: "Planinski lanac ili gorje",
    hint: "Bilo gdje u svijetu, i hrvatska gorja i planine",
    strip: ["gorje","planina","planine"],
    answers: `Alpe=10; Himalaja=8.5; Dinaridi/Dinarsko gorje/Dinara=7; Velebit=7; Andi=5; Pireneji=5; Karpati=4.5;
      Stjenovite planine/Rocky Mountains/Stjenjak=4.5; Ural=3.5; Kavkaz=3.5; Apenini=3.5; Biokovo=2.5; Medvednica/Sljeme=2.5;
      Učka=1.5; Mosor=1.5; Papuk=1.5; Atlas=1.5; Apalači=1.5; Tatre=1.5; Dolomiti=1.5; Velika Kapela/Kapela=1.5; Risnjak=1.5;
      Sijera Nevada/Sierra Nevada=1.5; Kordiljeri=1.5; Hindukuš=1.5; Karakorum=1.5; Kozjak=0.9; Psunj=0.9; Kalnik=0.9;
      Ivanščica=0.9; Žumberak/Žumberačko gorje/Samoborsko gorje=0.9; Balkan/Stara planina=0.9; Rodopi=0.9;
      Švarcvald/Schwarzwald=0.9; Skandinavsko gorje=0.9; Julijske Alpe=0.9; Pamir=0.9; Tian Shan/Tjenšan=0.9; Altaj=0.9;
      Prokletije=0.9; Durmitor=0.9; Mala Kapela=0.4; Krndija=0.4; Dilj=0.4; Požeška gora=0.4; Moslavačka gora=0.4;
      Plješivica=0.4; Svilaja=0.4; Kamešnica=0.4; Ćićarija=0.4; Snježnik=0.4; Petrova gora=0.4; Bilogora=0.4;
      Pind=0.4; Sudeti=0.4; Harz=0.4; Vogezi=0.4; Jura=0.4; Ardeni=0.4; Karavanke=0.4; Zagros=0.4;
      Velika razvodna gora=0.4; Drakensberg=0.4; Sierra Madre=0.4; Šar planina=0.4; Kopaonik=0.4; Bjelašnica=0.4;
      Jahorina=0.4; Lovćen=0.4; Pohorje=0.4; Zrinska gora=0.3; Macelj=0.3; Kaskadno gorje=0.3; Penini=0.3; Taurus=0.3;
      Elburz=0.3; Južne Alpe=0.3; Ruwenzori=0.3; Etiopsko visočje=0.3; Libanon=0.3; Transilvanske Alpe=0.3;
      Čvrsnica=0.3; Prenj=0.3; Velež=0.3; Romanija=0.3; Orjen=0.3; Strahinjčica=0.2; Kamničke Alpe=0.2; Sajani=0.2;
      Brazilsko visočje=0.2; Vranica=0.2; Transantarktičko gorje=0.2; Verhojansko gorje=0.1; Antilibanon=0.1`,
  },
  {
    slug: "sad-glavni",
    group: "kviz",
    title: "Glavni grad savezne države SAD-a",
    hint: "Glavni grad neke od 50 država, nije nužno i najveći grad; Washington ne vrijedi",
    strip: [],
    answers: `Boston=8; Atlanta=6; Austin=6; Sacramento=5; Denver=5; Phoenix=5; Honolulu=5; Nashville=4;
      Salt Lake City/Salt Lake=4; Indianapolis=3; Columbus=3; Albany=3; Santa Fe=2; Oklahoma City=2; Richmond=2;
      Springfield=2; Providence=1.5; Madison=1.5; Little Rock=1.5; Baton Rouge=1.5; Tallahassee=1; Carson City=1;
      Juneau=1; Lincoln=1; Saint Paul/St. Paul=1; Raleigh=1; Montgomery=1; Columbia=1; Charleston=1; Jackson=1;
      Hartford=1; Trenton=0.5; Dover=0.5; Annapolis=0.5; Harrisburg=0.5; Olympia=0.5; Salem=0.5; Boise=0.5;
      Des Moines=0.5; Topeka=0.5; Frankfort=0.5; Augusta=0.5; Lansing=0.5; Jefferson City=0.3; Helena=0.3;
      Concord=0.3; Bismarck=0.3; Cheyenne=0.3; Montpelier=0.2; Pierre=0.1`,
  },
  {
    slug: "indijanci",
    group: "kviz",
    title: "Indijansko pleme ili narod Amerike",
    hint: "Starosjedilački narod Sjeverne ili Južne Amerike, i Inuiti",
    strip: ["pleme","indijanci"],
    answers: `Apači/Apache=10; Sijuksi/Siouxi/Sioux=8; Čerokiji/Cherokee=6; Komanči/Comanche=5; Navaho/Navajo=5;
      Mohikanci/Mohikanac/Mohican=5; Irokezi=4; Čejeni/Cheyenne=4; Inke=4; Asteci=4; Maje=4; Inuiti/Eskimi=4;
      Lakota=2; Šošoni/Shoshone=2; Hopi=2; Crne noge/Blackfoot=2; Dakota=1.5; Pueblo=1.5; Huroni=1.5;
      Mohawk/Mohoki=1.5; Vrane/Crow=1; Delaveri/Delaware/Lenape=1; Šoni/Shawnee=1; Kiowa=1; Arapaho=1; Pawnee/Pauni=1;
      Seminoli=1; Nez Perce=1; Odžibve/Ojibwe/Chippewa=1; Algonkini/Algonquin=1; Olmeci=1; Tolteci=1; Kečua/Quechua=1;
      Mapuče/Mapuche/Araukanci=1; Guarani=1; Karibi=1; Zuni=0.5; Seneka=0.5; Osage=0.5; Omaha=0.5;
      Čikaso/Chickasaw=0.5; Čokto/Choctaw=0.5; Kriki/Creek/Muskogee=0.5; Ute=0.5; Paiute=0.5; Kri/Cree=0.5;
      Zapoteci=0.5; Ajmara/Aymara=0.5; Tupi=0.5; Aravaci/Arawak=0.5; Taíno/Taino=0.5; Yanomami=0.5; Powhatan=0.5;
      Anasazi=0.5; Onondaga=0.3; Oneida=0.3; Kajuga/Cayuga=0.3; Natchez=0.3; Modoc=0.3; Tlingit=0.3; Haida=0.3;
      Aleuti=0.3; Mikmak/Mi'kmaq=0.3; Mandan=0.3; Miami=0.3; Yaqui=0.3; Mixteci=0.3; Jivaro/Shuar=0.3;
      Patagonci/Tehuelche=0.3; Pequot=0.3; Wampanoag=0.3; Mescalero=0.3; Moche=0.3; Nazca=0.3; Tuskarora=0.2;
      Ponca=0.2; Pomo=0.2; Chumash=0.2; Kwakiutl=0.2; Nootka=0.2; Hidatsa=0.2; Arikara=0.2; Winnebago=0.2; Sauk=0.2;
      Potawatomi=0.2; Kickapoo=0.2; Wichita=0.2; Caddo=0.2; Tarahumara=0.2; Purépecha/Tarasci=0.2; Kayapo=0.2;
      Selk'nam/Ona=0.2; Kuna=0.2; Miskito=0.2; Narragansett=0.2; Chimú=0.2; Muisca=0.2; Menominee=0.1; Tonkawa=0.1;
      Otomí=0.1; Erie=0.1; Kalusa/Calusa=0.1; Hohokam=0.1; Timucua=0.1; Susquehannock=0.1`,
  },
];
