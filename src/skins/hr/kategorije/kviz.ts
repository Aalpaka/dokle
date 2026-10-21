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
      Teheran=1.5; Bagdad=1.5; Kabul=1.5; Ankara=1.5; Havana=1.5; Jeruzalem=1; Rijad=1; Abu Dhabi=1; Doha=1;
      Damask=1; Hanoi=1; Manila=1; Jakarta=1; Kuala Lumpur=1; Nairobi=1; Lima=1; Santiago=1; Bejrut=0.8;
      Islamabad=0.8; Katmandu/Kathmandu=0.8; Pjongjang=0.8; Ulan Bator=0.8; Bogota=0.8; Karakas/Caracas=0.8;
      Montevideo=0.8; Wellington=0.8; Aman=0.5; Singapur=0.5; Tajpej/Taipei=0.5; Astana=0.5; Taškent=0.5; Baku=0.5;
      Tbilisi=0.5; Erevan/Jerevan=0.5; Adis Abeba=0.5; Dakar=0.5; Rabat=0.5; Tunis=0.5; Tripoli=0.5; Pretorija=0.5;
      Kito/Quito=0.5; La Paz=0.5; Kuvajt=0.3; Daka/Dhaka=0.3; Kolombo=0.3; Phnom Penh/Pnom Pen=0.3; Abuja=0.3;
      Akra=0.3; Alžir=0.3; Kartum=0.3; Kinšasa=0.3; Cape Town/Kapstad=0.3; Asunción/Asuncion=0.3; Kingston=0.3;
      Panama=0.3; Manama=0.2; Maskat=0.2; Sana=0.2; Vientiane=0.2; Biškek=0.2; Dušanbe=0.2; Ašgabat=0.2;
      Luanda=0.2; Harare=0.2; Lusaka=0.2; Kampala=0.2; Mogadišu=0.2; San José=0.2; Santo Domingo=0.2;
      Naypyidaw=0.1; Dodoma=0.1; Kigali=0.1; Antananarivo=0.1; Port Moresby=0.1; Suva=0.1`,
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
      Neptun=3; Uran=3; Pluton=3; Sjevernjača/Polaris=2; Sirius=1; Titan=1; Mliječna staza/Mliječni put=1;
      Europa=0.8; Betelgeuse=0.5; Alfa Kentaura/Alpha Centauri=0.5; Io=0.5; Ganimed=0.5; Fobos=0.5;
      Halleyev komet=0.5; Andromeda=0.5; Proxima Centauri=0.3; Vega=0.3; Kalisto=0.3; Deimos=0.3; Ceres=0.3;
      Rigel=0.2; Aldebaran=0.2; Antares=0.2; Enkelad=0.2; Triton=0.2; Haron=0.2; Eris=0.2; Arktur=0.1; Deneb=0.1;
      Altair=0.1; Mimas=0.1; Spika=0.05; Rea=0.05; Japet=0.05; Dione=0.05; Titanija=0.05; Oberon=0.05;
      Miranda=0.05; Haumea=0.05; Makemake=0.05; Sedna=0.05; Kuiperov pojas=0.05`,
  },
  {
    slug: "bogovi",
    group: "kviz",
    title: "Grčki ili rimski bog ili božica",
    strip: ["bog", "bozica"],
    answers: `Zeus=15; Posejdon/Poseidon=8; Had/Hades=6; Atena/Athena=5; Afrodita=5; Jupiter=4; Apolon=4; Ares=4; Hermes=4;
      Neptun=3; Hera=3; Venera=2; Mars=2; Artemida=2; Dioniz/Dionis=2; Pluton=1.5; Merkur=1.5; Hefest=1.5;
      Kupid/Amor=1.5; Minerva=1; Junona=1; Dijana=1; Bakho/Bacchus=1; Vulkan=1; Demetra=1; Kron/Kronos=1; Eros=1;
      Nike=1; Saturn=0.5; Gea/Geja=0.5; Hestija=0.5; Pan=0.5; Persefona=0.5; Helije/Helios=0.5; Janus=0.5;
      Prometej=0.5; Cerera=0.3; Uran=0.3; Vesta=0.3; Morfej=0.3; Fortuna/Tiha=0.3; Atlas=0.3; Selena=0.2;
      Luna=0.2; Aurora=0.2; Hipnos=0.2; Tanatos=0.2; Nemeza=0.2; Asklepije/Eskulap=0.2; Prozerpina=0.1; Sol=0.1;
      Eos=0.1; Iris=0.1; Hebe=0.1`,
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
    answers: `Chicago Bulls/Bulls=15; Los Angeles Lakers/Lakers=15; Boston Celtics/Celtics=6; Golden State Warriors/Warriors=5;
      Miami Heat/Heat=4; New York Knicks/Knicks=3; Houston Rockets/Rockets=2; San Antonio Spurs/Spurs=2;
      Brooklyn Nets/Nets/New Jersey Nets=2; Dallas Mavericks/Mavericks/Mavs=2; Philadelphia 76ers/76ers/Sixers=1.5;
      Detroit Pistons/Pistons=1.5; Phoenix Suns/Suns=1.5; Denver Nuggets/Nuggets=1.5;
      Cleveland Cavaliers/Cavaliers/Cavs=1.5; Utah Jazz/Jazz=1.5; Orlando Magic/Magic=1;
      Los Angeles Clippers/Clippers=1; Toronto Raptors/Raptors=1; Milwaukee Bucks/Bucks=1;
      Sacramento Kings/Kings=0.8; Portland Trail Blazers/Trail Blazers/Blazers=0.8; Atlanta Hawks/Hawks=0.8;
      Oklahoma City Thunder/Thunder/OKC=0.8; Minnesota Timberwolves/Timberwolves=0.5; Indiana Pacers/Pacers=0.5;
      Memphis Grizzlies/Grizzlies=0.5; Charlotte Hornets/Hornets=0.5; Washington Wizards/Wizards=0.5;
      New Orleans Pelicans/Pelicans=0.3`,
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
      Kralj Ivan=0.1; Timon Atenjanin=0.1; Troilo i Kresida=0.1; Cimbelin=0.1; Perikle=0.1; Venera i Adonis=0.1`,
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
      Vatroslav Lisinski/Lisinski=1.5; Gioachino Rossini/Rossini=1; Franz Liszt/Liszt/List=1; Claude Debussy/Debussy=1;
      Hans Zimmer/Zimmer=1; Ennio Morricone/Morricone=1; Maurice Ravel/Ravel=0.8; Edvard Grieg/Grieg=0.8;
      Antonín Dvořák/Dvorak=0.8; Gustav Mahler/Mahler=0.5; Felix Mendelssohn/Mendelssohn=0.5;
      Robert Schumann/Schumann=0.5; Igor Stravinski/Stravinski/Stravinsky=0.5; Sergej Rahmanjinov/Rahmanjinov=0.5;
      Georges Bizet/Bizet=0.5; Niccolò Paganini/Paganini=0.5; John Williams=0.5; Jakov Gotovac/Gotovac=0.5;
      Sergej Prokofjev/Prokofjev=0.3; Dmitrij Šostakovič/Šostakovič=0.3; Modest Musorgski/Musorgski=0.3;
      Rimski-Korsakov=0.3; George Gershwin/Gershwin=0.3; Bedřich Smetana/Smetana=0.3; Dora Pejačević/Pejačević=0.3;
      Antonio Salieri/Salieri=0.3; Ludovico Einaudi/Einaudi=0.3; Leonard Bernstein/Bernstein=0.2; Erik Satie/Satie=0.2;
      Jean Sibelius/Sibelius=0.2; Béla Bartók/Bartok=0.2; Edward Elgar/Elgar=0.2; Boris Papandopulo/Papandopulo=0.2;
      Blagoje Bersa/Bersa=0.2; Ivo Tijardović/Tijardović=0.2; Claudio Monteverdi/Monteverdi=0.1;
      Henry Purcell/Purcell=0.1; Georg Philipp Telemann/Telemann=0.1; Luka Sorkočević/Sorkočević=0.1;
      Christoph Willibald Gluck/Gluck=0.1; Jacques Offenbach/Offenbach=0.1; Camille Saint-Saëns/Saint-Saens=0.1;
      Philip Glass=0.1; Julije Bajamonti/Bajamonti=0.05`,
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
      Ivan Generalić/Generalić=1; Paul Cézanne/Cezanne=0.8; Edgar Degas/Degas=0.8; Edo Murtić/Murtić=0.8;
      Tizian=0.5; Édouard Manet/Manet=0.5; Paul Gauguin/Gauguin=0.5; Henri Matisse/Matisse=0.5;
      Vasilij Kandinski/Kandinski/Kandinsky=0.5; Rubens=0.5; Francisco Goya/Goya=0.5; Vermeer=0.5;
      Jackson Pollock/Pollock=0.5; Auguste Rodin/Rodin=0.5; Piet Mondrian/Mondrian=0.3; René Magritte/Magritte=0.3;
      Diego Velázquez/Velazquez=0.3; El Greco=0.3; Albrecht Dürer/Dürer=0.3; Hieronymus Bosch/Bosch=0.3;
      Toulouse-Lautrec=0.3; Marc Chagall/Chagall=0.3; Ivan Rabuzin/Rabuzin=0.3; Antun Augustinčić/Augustinčić=0.3;
      Donatello=0.3; Pieter Bruegel/Bruegel=0.2; William Turner/Turner=0.2; Joan Miró/Miro=0.2;
      Egon Schiele/Schiele=0.2; Giotto=0.2; Miroslav Kraljević=0.2; Josip Račić/Račić=0.2;
      Oton Iveković/Iveković=0.2; Julije Klović/Juraj Klović/Klović=0.2; Bernini=0.2; Hokusai=0.1; Tintoretto=0.1;
      Celestin Medović/Medović=0.1; Mirko Virius/Virius=0.1; Ignjat Job=0.1; Andrija Medulić/Medulić=0.1;
      Menci Clement Crnčić/Crnčić=0.1; Ljubo Babić=0.1; Ivo Dulčić/Dulčić=0.1`,
  },
  {
    slug: "pokemon",
    group: "kviz",
    title: "Pokémon",
    strip: [],
    answers: `Pikachu/Pikaču=30; Charizard=8; Charmander=6; Bulbasaur=5; Squirtle=5; Jigglypuff=3; Mewtwo=3; Mew=2;
      Psyduck=2; Meowth=2; Eevee=2; Snorlax=2; Gengar=1.5; Magikarp=1.5; Lucario=1; Gyarados=1; Dragonite=1;
      Onix=1; Togepi=1; Raichu=1; Blastoise=0.8; Ditto=0.8; Geodude=0.5; Venusaur=0.5; Pichu=0.5; Vulpix=0.5;
      Butterfree=0.5; Pidgey=0.5; Rattata=0.5; Zubat=0.5; Lapras=0.5; Ivysaur=0.3; Wartortle=0.3; Charmeleon=0.3;
      Caterpie=0.3; Ekans=0.3; Machamp=0.3; Abra=0.3; Alakazam=0.3; Slowpoke=0.3; Vaporeon=0.3; Articuno=0.3;
      Zapdos=0.3; Moltres=0.3; Lugia=0.3; Rayquaza=0.3; Greninja=0.3; Ninetales=0.2; Weedle=0.2; Arbok=0.2;
      Kadabra=0.2; Jolteon=0.2; Flareon=0.2; Chikorita=0.2; Cyndaquil=0.2; Totodile=0.2; Ho-Oh=0.2; Mudkip=0.2;
      Sylveon=0.2; Umbreon=0.2; Marill=0.2; Wobbuffet=0.2; Chansey=0.2; Clefairy=0.2; Cubone=0.2; Celebi=0.1;
      Treecko=0.1; Torchic=0.1; Groudon=0.1; Kyogre=0.1; Piplup=0.1; Espeon=0.1; Gardevoir=0.1; Garchomp=0.1`,
  },
  {
    slug: "beatles",
    group: "kviz",
    title: "Pjesma Beatlesa",
    strip: [],
    answers: `Yesterday=15; Let It Be=12; Hey Jude=12; Yellow Submarine=8; Help=5; Come Together=4; Here Comes the Sun=4;
      All You Need Is Love=3; Twist and Shout=3; Love Me Do=3; She Loves You=2; I Want to Hold Your Hand=2;
      Strawberry Fields Forever/Strawberry Fields=2; Penny Lane=1.5; Michelle=1.5; A Hard Day's Night=1.5;
      Eleanor Rigby=1.5; Lucy in the Sky with Diamonds/Lucy in the Sky=1.5; Ob-La-Di, Ob-La-Da/Obladi Oblada=1.5;
      Something=1; Can't Buy Me Love=1; Get Back=1; Blackbird=1; Hello, Goodbye/Hello Goodbye=1;
      While My Guitar Gently Weeps=0.8; Norwegian Wood=0.5; All My Loving=0.5; Drive My Car=0.5;
      Eight Days a Week=0.5; Ticket to Ride=0.5; Revolution=0.5; In My Life=0.5;
      With a Little Help from My Friends=0.5; Sgt. Pepper's Lonely Hearts Club Band/Sgt. Pepper=0.5;
      The Long and Winding Road=0.5; Day Tripper=0.3; Paperback Writer=0.3; Nowhere Man=0.3; A Day in the Life=0.3;
      Helter Skelter=0.3; I Am the Walrus=0.3; Across the Universe=0.3; Don't Let Me Down=0.3; Octopus's Garden=0.3;
      And I Love Her=0.3; Girl=0.3; Please Please Me=0.3; Back in the USSR=0.3; Taxman=0.2;
      Here, There and Everywhere=0.2; From Me to You=0.2; I Saw Her Standing There=0.2; Golden Slumbers=0.1;
      Rocky Raccoon=0.1; Maxwell's Silver Hammer=0.1; Dear Prudence=0.1; Julia=0.1;
      The Ballad of John and Yoko=0.1; Hey Bulldog=0.1; Got to Get You into My Life=0.1; Tomorrow Never Knows=0.1`,
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
      Tri kralja=0.5; Ruta=0.3; Ester=0.3; Sara=0.3; Izaija=0.3; Jošua/Jozue=0.3; Andrija=0.3; Lot=0.3;
      Metuzalem=0.3; Baraba=0.3; Rafael=0.2; Rebeka=0.2; Rahela=0.2; Jeremija=0.2; Ezekiel=0.2; Gideon=0.2;
      Stjepan=0.2; Filip=0.2; Šimun=0.2; Elizabeta=0.2; Zaharija=0.2; Lea=0.1; Elizej=0.1; Barnaba=0.1;
      Bartolomej=0.1; Tadej=0.1; Matija=0.1; Nikodem=0.1; Zakej=0.1; Set=0.1; Absalom=0.1; Batšeba=0.1;
      Jezabela=0.1`,
  },
  {
    slug: "dinosaur",
    group: "kviz",
    title: "Dinosaur ili pretpovijesni gmaz",
    strip: [],
    answers: `Tiranosaurus/T-rex/Tyrannosaurus/Tiranosaurus rex=25; Triceratops=10; Velociraptor/Raptor=8; Brontosaurus=6;
      Stegosaurus=6; Diplodokus/Diplodocus=4; Pterodaktil/Pterodactylus=4; Brahiosaurus/Brachiosaurus=3;
      Spinosaurus=2; Ankilosaurus/Ankylosaurus=2; Alosaurus/Allosaurus=1; Parasaurolophus=0.5; Iguanodon=0.5;
      Apatosaurus=0.5; Karnotaurus/Carnotaurus=0.5; Giganotosaurus=0.5; Mosasaurus=0.5;
      Pleziosaurus/Plesiosaurus=0.5; Pteranodon=0.5; Dilofosaurus/Dilophosaurus=0.3;
      Pahicefalosaurus/Pachycephalosaurus=0.3; Argentinosaurus=0.2; Ihtiosaurus/Ichthyosaurus=0.2; Oviraptor=0.2;
      Arheopteriks/Archaeopteryx=0.2; Kompsognatus/Compsognathus=0.1; Gallimimus=0.1;
      Terizinosaurus/Therizinosaurus=0.1; Edmontosaurus=0.1; Barionyx/Baryonyx=0.1; Deinonychus=0.1`,
  },
];
