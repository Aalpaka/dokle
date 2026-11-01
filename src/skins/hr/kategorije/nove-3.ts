// Treći val novih pitanja (2026-10-24): zatvoreni popisi u stilu Pointlessa i Potjere, i otvorena pitanja s 200+ odgovora.
import { parseSeedAnswers } from "../../../lib/matcher";
import type { SeedCategory } from "../categories";

const RIMSKI = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX", "XXI", "XXII", "XXIII"];

/** Papinsko ime s varijantama s rednim brojem ("Pio/Pio I/.../Pio XII"); dodatne varijante iza. */
function papa(ime: string, n: number, udio: number, ...extra: string[]) {
  const redni = n > 1 ? RIMSKI.slice(0, n).map((r) => `${ime} ${r}`) : [];
  return [ime, ...redni, ...extra].join("/") + `=${udio}`;
}

const sve: SeedCategory[] = ([
  {
    slug: "commonwealth",
    group: "kviz",
    title: "Članica Commonwealtha",
    hint: "Država članica Zajednice naroda danas",
    strip: [],
    answers: `Ujedinjeno Kraljevstvo/UK/Velika Britanija/Engleska=15; Kanada=12; Australija=12; Indija=10; Novi Zeland=8;
      Južnoafrička Republika/JAR/Južna Afrika=6; Jamajka=5; Malta=4; Cipar=3; Pakistan=3; Nigerija=3; Kenija=2.5;
      Singapur=2; Malezija=2; Bangladeš=1.5; Šri Lanka=1.5; Gana=1.5; Bahami=1.5; Barbados=1; Trinidad i Tobago=1;
      Uganda=1; Tanzanija=1; Fidži=1; Maldivi=1; Mauricijus=0.8; Kamerun=0.8; Zambija=0.6; Ruanda=0.6; Mozambik=0.6;
      Papua Nova Gvineja=0.5; Namibija=0.5; Bocvana=0.5; Sejšeli=0.5; Belize=0.4; Gvajana=0.4; Malavi=0.4;
      Sijera Leone=0.4; Gambija=0.3; Brunej=0.3; Samoa=0.3; Tonga=0.3; Grenada=0.3; Lesoto=0.3; Esvatini/Svazi=0.3;
      Sveta Lucija=0.2; Antigva i Barbuda=0.2; Dominika=0.2; Vanuatu=0.2; Solomonski Otoci=0.2; Togo=0.2; Gabon=0.2;
      Sveti Kristofor i Nevis=0.1; Sveti Vincent i Grenadini=0.1; Kiribati=0.1; Tuvalu=0.1; Nauru=0.1`,
  },
  {
    slug: "romanski-jezik-drzava",
    group: "kviz",
    title: "Država u kojoj je službeni jezik španjolski, portugalski ili francuski",
    hint: "Vrijede i bivše francuske kolonije gdje je francuski i dalje glavni jezik države",
    strip: ["republika"],
    answers: `Španjolska=14; Francuska=13; Portugal=11; Brazil=10; Meksiko=8; Argentina=7; Belgija=5; Švicarska=4; Kanada=4;
      Kolumbija=3; Čile=3; Peru=3; Kuba=3; Venezuela=2.5; Urugvaj=2; Luksemburg=2; Monako=2; Bolivija=1.5; Ekvador=1.5;
      Paragvaj=1.5; Angola=1.5; Mozambik=1.2; Senegal=1.2; Haiti=1.2; Kostarika=1; Panama=1; Dominikanska Republika=1;
      Gvatemala=0.8; Honduras=0.8; Nikaragva=0.8; Salvador/El Salvador=0.8; Obala Bjelokosti=0.8; Kamerun=0.8;
      Madagaskar=0.6; Zelenortska Republika/Zelenortski Otoci=0.6; Mali=0.6; DR Kongo/Demokratska Republika Kongo=0.6;
      Kongo=0.5; Gabon=0.4; Niger=0.4; Burkina Faso=0.4; Gvineja=0.4; Čad=0.4; Ruanda=0.3; Burundi=0.3; Benin=0.3;
      Togo=0.3; Ekvatorska Gvineja=0.3; Gvineja Bisau=0.3; Istočni Timor=0.3; Džibuti=0.2; Srednjoafrička Republika=0.2;
      Sejšeli=0.2; Komori=0.1; Vanuatu=0.1; Sveti Toma i Princip=0.1`,
  },
  {
    slug: "lijeva-strana",
    group: "kviz",
    title: "Država u kojoj se vozi lijevom stranom ceste",
    strip: [],
    answers: `Ujedinjeno Kraljevstvo/UK/Velika Britanija/Engleska=20; Japan=12; Australija=12; Indija=8; Irska=7; Malta=6;
      Cipar=6; Novi Zeland=5; Južnoafrička Republika/JAR/Južna Afrika=4; Tajland=3; Indonezija=2.5; Jamajka=2;
      Singapur=2; Malezija=2; Pakistan=1.5; Kenija=1.5; Šri Lanka=1.2; Bangladeš=1; Nepal=1; Bahami=1; Barbados=0.8;
      Maldivi=0.8; Mauricijus=0.8; Tanzanija=0.8; Zimbabve=0.8; Zambija=0.6; Uganda=0.6; Mozambik=0.6; Namibija=0.6;
      Bocvana=0.6; Fidži=0.6; Trinidad i Tobago=0.6; Butan=0.5; Brunej=0.5; Papua Nova Gvineja=0.4; Malavi=0.4;
      Sejšeli=0.4; Gvajana=0.4; Surinam=0.3; Lesoto=0.3; Esvatini/Svazi=0.3; Istočni Timor=0.3; Samoa=0.3; Tonga=0.3;
      Grenada=0.2; Sveta Lucija=0.2; Antigva i Barbuda=0.2; Dominika=0.2; Solomonski Otoci=0.2; Kiribati=0.1;
      Tuvalu=0.1; Nauru=0.1; Sveti Kristofor i Nevis=0.1; Sveti Vincent i Grenadini=0.1`,
  },
  {
    slug: "granica-kina-rusija",
    group: "kviz",
    title: "Država koja graniči s Kinom ili Rusijom",
    hint: "Vrijede i Kina i Rusija same, jer graniče jedna s drugom",
    strip: [],
    answers: `Mongolija=15; Kazahstan=12; Ukrajina=12; Indija=10; Kina=8; Rusija=8; Finska=8; Bjelorusija=8;
      Sjeverna Koreja=7; Poljska=5; Norveška=5; Estonija=4; Latvija=4; Litva=4; Gruzija=4; Pakistan=3; Nepal=3;
      Vijetnam=3; Azerbajdžan=2; Afganistan=2; Kirgistan=1.5; Tadžikistan=1.5; Laos=1; Mjanmar/Burma=1; Butan=0.5`,
  },
  {
    slug: "domacin-prvenstva",
    group: "kviz",
    title: "Država domaćin Svjetskog ili Europskog prvenstva u nogometu",
    hint: "Svako SP i EP od 1930. do 2034., i suorganizatori",
    strip: [],
    answers: `Njemačka/Zapadna Njemačka=12; Francuska=11; Italija=10; Brazil=9; Rusija=8; Katar=8; Španjolska=7;
      Engleska=6; Portugal=6; SAD/Amerika=5; Meksiko=4; Južna Afrika/JAR/Južnoafrička Republika=4; Argentina=3.5;
      Urugvaj=3; Japan=3; Južna Koreja=3; Švicarska=3; Austrija=3; Poljska=3; Ukrajina=3; Belgija=2.5; Nizozemska=2.5;
      Švedska=2; Kanada=2; Čile=1.5; Saudijska Arabija=1.5; Maroko=1.5; Jugoslavija=1; Mađarska=0.8; Škotska=0.8;
      Danska=0.8; Turska=0.8; Irska=0.6; Wales=0.5; Rumunjska=0.4; Azerbajdžan=0.4; Paragvaj=0.3`,
  },
  {
    slug: "prvak-liga",
    group: "kviz",
    title: "Klub koji je bio prvak Engleske, Italije ili Španjolske",
    hint: "Bilo koja sezona prvenstva, ne kupovi",
    strip: ["fc", "afc", "cf", "ac", "ssc", "as", "uc"],
    answers: `Real Madrid/Real=14; Barcelona/Barca/Barça=13; Juventus/Juve=11; Manchester United/Man United/United=10;
      Liverpool=9; Milan/AC Milan=8; Inter/Internazionale=7; Manchester City/Man City/City=7; Arsenal=6; Chelsea=6;
      Atlético Madrid/Atletico Madrid/Atlético/Atletico=5; Napoli=4; Roma=3; Lazio=2.5; Valencia=2.5;
      Tottenham Hotspur/Tottenham/Spurs=2; Leicester City/Leicester=2; Fiorentina=1.5; Everton=1.5; Sevilla=1.5;
      Athletic Bilbao/Athletic/Bilbao=1.5; Aston Villa=1.2; Deportivo La Coruña/Deportivo=1.2; Real Sociedad=1;
      Newcastle United/Newcastle=1; Leeds United/Leeds=1; Sampdoria=1; Blackburn Rovers/Blackburn=0.8; Torino=0.8;
      Nottingham Forest/Nottingham=0.8; Cagliari=0.6; Verona/Hellas Verona=0.6; Genoa=0.6; Bologna=0.6;
      Real Betis/Betis=0.6; Derby County/Derby=0.5; Wolverhampton/Wolves=0.5; Ipswich Town/Ipswich=0.4;
      Sunderland=0.4; Burnley=0.4; West Bromwich Albion/West Brom=0.3; Sheffield Wednesday=0.3; Portsmouth=0.3;
      Sheffield United=0.2; Preston North End/Preston=0.2; Huddersfield Town/Huddersfield=0.2; Pro Vercelli=0.2;
      Casale=0.1; Novese=0.1; Spezia=0.1`,
  },
  {
    slug: "britanski-premijer",
    group: "kviz",
    title: "Britanski premijer",
    hint: "Bilo koji, od Walpolea do danas",
    strip: ["sir", "lord"],
    answers: `Winston Churchill/Churchill=20; Margaret Thatcher/Thatcher=15; Tony Blair/Blair=12; Boris Johnson=8;
      Theresa May=5; David Cameron/Cameron=5; Keir Starmer/Starmer=4; Rishi Sunak/Sunak=3; Gordon Brown=2.5;
      Liz Truss/Truss=2.5; John Major=2; Neville Chamberlain/Chamberlain=1.5; Clement Attlee/Attlee=0.8;
      Harold Wilson=0.6; Benjamin Disraeli/Disraeli=0.6; William Gladstone/Gladstone=0.6;
      William Pitt mlađi/Pitt mlađi/Pitt=0.5; David Lloyd George/Lloyd George=0.5; Robert Walpole/Walpole=0.4;
      Anthony Eden/Eden=0.4; Harold Macmillan/Macmillan=0.4; Edward Heath/Heath=0.3; James Callaghan/Callaghan=0.3;
      Robert Peel/Peel=0.3; Vojvoda od Wellingtona/Wellington=0.3; Stanley Baldwin/Baldwin=0.2;
      Ramsay MacDonald/MacDonald=0.2; Herbert Asquith/Asquith=0.2; Lord Palmerston/Palmerston=0.2;
      Lord Salisbury/Salisbury=0.2; Arthur Balfour/Balfour=0.2; Alec Douglas-Home/Douglas-Home=0.15;
      William Pitt stariji/Pitt stariji/Chatham=0.15; Lord North/North=0.15; Lord Melbourne/Melbourne=0.15;
      Earl Grey/Grey=0.15; Bonar Law=0.1; Henry Campbell-Bannerman/Campbell-Bannerman=0.1; Lord Rosebery/Rosebery=0.1;
      Lord Aberdeen/Aberdeen=0.1; John Russell/Lord John Russell=0.1; Lord Derby/Derby=0.1; Lord Liverpool/Liverpool=0.1;
      George Canning/Canning=0.1; Spencer Perceval/Perceval=0.1; Henry Addington/Addington=0.05;
      William Grenville/Lord Grenville=0.05; George Grenville=0.05; Lord Bute/Bute=0.05; Lord Rockingham/Rockingham=0.05;
      Vojvoda od Grafton/Grafton=0.05; Lord Shelburne/Shelburne=0.05; Vojvoda od Portlanda/Portland=0.05;
      Vojvoda od Newcastlea/Newcastle=0.05; Henry Pelham/Pelham=0.05; Lord Wilmington/Wilmington=0.05;
      Vojvoda od Devonshirea/Devonshire=0.03; Lord Goderich/Goderich=0.03`,
  },
  {
    slug: "papa",
    group: "kviz",
    title: "Papinsko ime",
    hint: "Ime koje je uzeo neki papa, npr. Pio ili Ivan Pavao; vrijedi i s rednim brojem",
    strip: ["papa", "pape"],
    answers: [
      papa("Ivan Pavao", 2, 22, "Wojtyla", "Karol Wojtyla", "Luciani"), papa("Franjo", 1, 18, "Bergoglio"), papa("Benedikt", 16, 14, "Ratzinger"),
      papa("Lav", 14, 8, "Leon", "Prevost"), papa("Pio", 12, 6, "Pije"), papa("Ivan", 23, 5), papa("Petar", 1, 5, "Sveti Petar"),
      papa("Pavao", 6, 3), papa("Grgur", 16, 3, "Grgur Veliki"), papa("Inocent", 13, 1.5), papa("Klement", 14, 1.5),
      papa("Aleksandar", 8, 1.2, "Borgia"), papa("Urban", 8, 1), papa("Bonifacije", 9, 1), papa("Julije", 3, 0.8),
      papa("Siksto", 5, 0.6), papa("Stjepan", 9, 0.5), papa("Celestin", 5, 0.4), papa("Adrijan", 6, 0.4, "Hadrijan"),
      papa("Martin", 5, 0.4), papa("Nikola", 5, 0.4), papa("Silvestar", 3, 0.3), papa("Eugen", 4, 0.3),
      papa("Honorije", 4, 0.2), papa("Kalist", 3, 0.2), papa("Feliks", 4, 0.2), papa("Marcel", 2, 0.2),
      papa("Sergije", 4, 0.15), papa("Anastazije", 4, 0.1), papa("Pelagije", 2, 0.1), papa("Viktor", 3, 0.1),
      papa("Paskal", 2, 0.1), papa("Gelazije", 2, 0.1), papa("Lucije", 3, 0.1), papa("Teodor", 2, 0.1),
      papa("Agapit", 2, 0.05), papa("Damaz", 2, 0.05), papa("Marko", 1, 0.05), papa("Lino", 1, 0.05), papa("Klet", 1, 0.05, "Anaklet"),
      papa("Evarist", 1, 0.05), papa("Higin", 1, 0.05), papa("Anicet", 1, 0.05), papa("Soter", 1, 0.05),
      papa("Eleuterije", 1, 0.05), papa("Zefirin", 1, 0.05), papa("Poncijan", 1, 0.05), papa("Fabijan", 1, 0.05),
      papa("Kornelije", 1, 0.05), papa("Dionizije", 1, 0.05), papa("Euzebije", 1, 0.05), papa("Miltijad", 1, 0.05),
      papa("Liberije", 1, 0.05), papa("Siricije", 1, 0.05), papa("Zosim", 1, 0.05), papa("Hilarije", 1, 0.05),
      papa("Simplicije", 1, 0.05), papa("Simah", 1, 0.05), papa("Hormizda", 1, 0.05), papa("Vigilije", 1, 0.05),
      papa("Sabinijan", 1, 0.05), papa("Severin", 1, 0.05), papa("Vitalijan", 1, 0.05), papa("Agaton", 1, 0.05),
      papa("Konon", 1, 0.05), papa("Zaharija", 1, 0.05), papa("Valentin", 1, 0.05), papa("Formoz", 1, 0.05),
      papa("Lando", 1, 0.05), papa("Konstantin", 1, 0.05), papa("Marcelin", 1, 0.03),
      papa("Kajo", 1, 0.03), papa("Eutihijan", 1, 0.03), papa("Anter", 1, 0.03), papa("Sisinije", 1, 0.03),
    ].join("; "),
  },
  {
    slug: "sahovski-prvak",
    group: "kviz",
    title: "Svjetski prvak ili prvakinja u šahu",
    hint: "Muški ili ženski svjetski prvak, i FIDE prvaci 1993. do 2006.",
    strip: [],
    answers: `Garri Kasparov/Kasparov/Gari Kasparov=20; Magnus Carlsen/Carlsen=18; Bobby Fischer/Fischer/Fišer=15;
      Anatolij Karpov/Karpov=10; Mihail Talj/Talj/Mikhail Tal=4; Boris Spaski/Spaski/Spassky=3;
      Viswanathan Anand/Anand=3; Vladimir Kramnik/Kramnik=3; José Raúl Capablanca/Capablanca/Kapablanka=2.5;
      Aleksandar Aljehin/Aljehin/Alekhine=2; Gukesh Dommaraju/Gukesh=2; Ding Liren=1.5; Mihail Botvinik/Botvinik/Botvinnik=1.5;
      Tigran Petrosjan/Petrosjan=1; Emanuel Lasker/Lasker=1; Wilhelm Steinitz/Steinitz=0.8; Vasilij Smislov/Smislov=0.8;
      Max Euwe/Euwe=0.5; Veselin Topalov/Topalov=0.5; Susan Polgar/Zsuzsa Polgár/Zsuzsa Polgar=0.5;
      Hou Yifan=0.4; Nona Gaprindašvili/Gaprindašvili=0.3; Maja Čiburdanidze/Čiburdanidze=0.2;
      Ruslan Ponomarjov/Ponomarjov/Ponomariov=0.2; Aleksandra Kostenjuk/Kostenjuk/Kosteniuk=0.2;
      Ju Wenjun=0.2; Vera Menčik/Menčik=0.15; Aleksandr Halifman/Halifman/Khalifman=0.1;
      Rustam Kasimdžanov/Kasimdžanov=0.1; Xie Jun=0.1; Marija Muzičuk/Muzičuk/Mariya Muzychuk=0.1;
      Ana Ušenina/Ušenina=0.1; Antoaneta Stefanova/Stefanova=0.1; Tan Zhongyi=0.1; Zhu Chen=0.1; Xu Yuhua=0.1;
      Ljudmila Rudenko/Rudenko=0.05; Jelizaveta Bikova/Bikova=0.05; Olga Rubcova/Rubcova=0.05`,
  },
  {
    slug: "prijestolnica-kulture",
    group: "kviz",
    title: "Grad koji je bio Europska prijestolnica kulture",
    hint: "Od Atene 1985. do 2026.",
    strip: [],
    answers: `Rijeka=20; Pariz=8; Atena=6; Amsterdam=5; Berlin=5; Madrid=4; Liverpool=4; Firenca=4; Lisabon=4; Istanbul=4;
      Prag=3; Kopenhagen=3; Stockholm/Stokholm=3; Dublin=3; Maribor=3; Novi Sad=3; Glasgow=2.5; Krakov/Kraków=2.5;
      Bruxelles/Brisel=2; Helsinki=2; Porto=2; Marseille/Marselj=2; Graz=2; Bologna=1.5; Luksemburg=1.5;
      Solun=1.5; Valletta=1.5; Riga=1.5; Tallinn=1.5; Vilnius=1.5; Antwerpen=1.2; Weimar=1; Rotterdam=1;
      Reykjavik=1; Bergen=1; Genova=1; Lille=1; Salamanca=0.8; Santiago de Compostela=0.8; Avignon=0.8;
      Bruges/Brugge=0.8; Linz=0.8; Pečuh/Pécs=0.8; Matera=0.8; Plovdiv=0.8; San Sebastián/Donostia=0.6;
      Wrocław/Vroclav=0.6; Košice=0.6; Plzeň/Plzen=0.6; Aarhus=0.6; Kaunas=0.6; Galway=0.5; Cork=0.5; Turku=0.5;
      Essen=0.5; Sibiu=0.5; Temišvar/Timișoara/Timisoara=0.5; Tartu=0.5; Nova Gorica/Gorica/Gorizia=0.5;
      Chemnitz=0.4; Guimarães=0.4; Patras=0.4; Pafos=0.4; Veszprém=0.4; Mons=0.4; Stavanger=0.3; Umeå=0.3;
      Leeuwarden=0.3; Elefsina=0.3; Esch-sur-Alzette/Esch=0.2; Bad Ischl=0.2; Bodø=0.2; Oulu=0.2; Trenčín=0.2`,
  },
  {
    slug: "americki-sport-klub",
    group: "kviz",
    title: "Klub iz NFL-a, NHL-a ili MLB-a",
    hint: "Američki nogomet, hokej na ledu ili bejzbol; grad ili nadimak kluba",
    strip: [],
    answers: `New York Yankees/Yankees=10; Boston Red Sox/Red Sox=5; Los Angeles Dodgers/Dodgers=5;
      New England Patriots/Patriots=5; Dallas Cowboys/Cowboys=5; Chicago Cubs/Cubs=3; Pittsburgh Steelers/Steelers=3;
      Green Bay Packers/Packers=3; Kansas City Chiefs/Chiefs=3; San Francisco 49ers/49ers=3; Chicago Bears/Bears=2.5;
      Miami Dolphins/Dolphins=2.5; Montreal Canadiens/Canadiens=2.5; Toronto Maple Leafs/Maple Leafs=2.5;
      Chicago Blackhawks/Blackhawks=2; Detroit Red Wings/Red Wings=2; Boston Bruins/Bruins=2;
      New York Rangers=2; Philadelphia Eagles/Eagles=2; Las Vegas Raiders/Raiders/Oakland Raiders=2;
      New York Giants=1.5; San Francisco Giants=1.5; Pittsburgh Penguins/Penguins=1.5; Edmonton Oilers/Oilers=1.5;
      Seattle Seahawks/Seahawks=1.5; Denver Broncos/Broncos=1.5; Buffalo Bills/Bills=1.2; New York Jets=1.2;
      Baltimore Ravens/Ravens=1.2; New Orleans Saints/Saints=1.2; New York Mets/Mets=1.2; St. Louis Cardinals=1.2;
      Atlanta Braves/Braves=1; Houston Astros/Astros=1; Philadelphia Phillies/Phillies=1; Chicago White Sox/White Sox=1;
      Detroit Tigers/Tigers=1; Seattle Mariners/Mariners=1; Tampa Bay Buccaneers/Buccaneers=1; Detroit Lions/Lions=1;
      Minnesota Vikings/Vikings=1; Los Angeles Rams/Rams=1; Los Angeles Kings=1; Washington Capitals/Capitals=1;
      Philadelphia Flyers/Flyers=1; Vegas Golden Knights/Golden Knights=1; Colorado Avalanche/Avalanche=1;
      Tampa Bay Lightning/Lightning=0.8; New York Islanders/Islanders=0.8; Vancouver Canucks/Canucks=0.8;
      Calgary Flames/Flames=0.8; Ottawa Senators/Senators=0.8; Anaheim Ducks/Ducks=0.8; San Jose Sharks/Sharks=0.8;
      Florida Panthers=0.6; Carolina Panthers=0.6; Winnipeg Jets=0.6; Dallas Stars/Stars=0.6; St. Louis Blues/Blues=0.6;
      Nashville Predators/Predators=0.6; Minnesota Wild/Wild=0.5; Carolina Hurricanes/Hurricanes=0.5;
      New Jersey Devils/Devils=0.5; Buffalo Sabres/Sabres=0.5; Columbus Blue Jackets/Blue Jackets=0.4;
      Seattle Kraken/Kraken=0.4; Utah Mammoth/Utah Hockey Club=0.2; Indianapolis Colts/Colts=0.8;
      Cleveland Browns/Browns=0.8; Cincinnati Bengals/Bengals=0.6; Houston Texans/Texans=0.6;
      Jacksonville Jaguars/Jaguars=0.6; Tennessee Titans/Titans=0.6; Los Angeles Chargers/Chargers=0.6;
      Arizona Cardinals=0.5; Atlanta Falcons/Falcons=0.6; Washington Commanders/Commanders/Washington Redskins=0.6;
      Texas Rangers=0.8; Toronto Blue Jays/Blue Jays=0.8; San Diego Padres/Padres=0.6; Milwaukee Brewers/Brewers=0.5;
      Cincinnati Reds/Reds=0.5; Cleveland Guardians/Guardians/Cleveland Indians=0.5; Baltimore Orioles/Orioles=0.5;
      Minnesota Twins/Twins=0.5; Kansas City Royals/Royals=0.5; Los Angeles Angels/Angels=0.5;
      Athletics/Oakland Athletics/Oakland A's=0.4; Pittsburgh Pirates/Pirates=0.4; Arizona Diamondbacks/Diamondbacks=0.4;
      Colorado Rockies/Rockies=0.3; Miami Marlins/Marlins=0.3; Tampa Bay Rays/Rays=0.3; Washington Nationals/Nationals=0.3`,
  },
  {
    slug: "misic",
    group: "kviz",
    title: "Mišić u ljudskom tijelu",
    hint: "Naš ili latinski naziv; vrijede i skupine mišića",
    strip: ["mišić", "mišići", "misic", "musculus", "m."],
    answers: `Biceps/Dvoglavi mišić nadlaktice=20; Triceps/Troglavi mišić nadlaktice=12; Srce/Srčani mišić/Miokard=8;
      Trbušnjaci/Trbušni mišići/Ravni trbušni mišić/Rectus abdominis/Pločice=8; Prsni mišić/Veliki prsni mišić/Pektoralis/Prsa=7;
      Kvadriceps/Četveroglavi mišić natkoljenice/Quadriceps=6; Deltoidni mišić/Deltoid/Ramena=5; Lisni mišić/List/Gastrocnemius/Listovi=5;
      Gluteus/Gluteus maximus/Veliki sjedni mišić/Stražnjica=5; Ošit/Dijafragma=4; Trapezni mišić/Trapez/Trapezius=4;
      Latissimus/Široki leđni mišić/Latissimus dorsi=3; Jezik=3; Leđni mišići/Leđa=2.5; Stražnja loža/Hamstring/Hamstrings=2;
      Kosi trbušni mišić/Kosi trbušnjaci=1.5; Žvačni mišić/Maseter/Masseter=1.5; Dvoglavi mišić natkoljenice/Biceps femoris=1;
      Soleus/Plosnati mišić=0.8; Aduktori/Primicači=0.8; Romboidni mišić/Romboid=0.6; Mali prsni mišić=0.5;
      Poprečni trbušni mišić/Transversus abdominis=0.5; Srednji sjedni mišić/Gluteus medius=0.5; Mali sjedni mišić/Gluteus minimus=0.3;
      Uspravljač kralježnice/Erector spinae=0.5; Rotatorna manšeta=0.5; Prednji nazubljeni mišić/Serratus anterior/Serratus=0.4;
      Sternokleidomastoidni mišić/Sternokleidomastoideus=0.4; Iliopsoas/Bočno-slabinski mišić=0.4; Psoas/Veliki slabinski mišić=0.4;
      Krojački mišić/Sartorius=0.4; Prednji goljenični mišić/Tibialis anterior=0.3; Međurebreni mišići=0.3;
      Mišići dna zdjelice/Zdjelično dno/Kegelovi mišići=0.3; Brachialis/Nadlaktični mišić=0.3; Brahioradijalis/Brachioradialis=0.3;
      Pregibači podlaktice=0.2; Ispružači podlaktice=0.2; Supraspinatus/Nadgrebeni mišić=0.2; Infraspinatus/Podgrebeni mišić=0.2;
      Teres major/Veliki obli mišić=0.2; Teres minor/Mali obli mišić=0.2; Subskapularis/Podlopatični mišić=0.2;
      Ravni mišić natkoljenice/Rectus femoris=0.2; Vastus lateralis/Lateralni široki mišić=0.2; Vastus medialis/Medijalni široki mišić=0.2;
      Vastus intermedius=0.1; Polutetivni mišić/Semitendinosus=0.1; Poluopnasti mišić/Semimembranosus=0.1; Vitki mišić/Gracilis=0.1;
      Dugi primicač/Adductor longus=0.1; Veliki primicač/Adductor magnus=0.1; Češljasti mišić/Pectineus=0.1; Kruškoliki mišić/Piriformis=0.2;
      Zatezač široke fascije/Tensor fasciae latae=0.1; Zakoljeni mišić/Popliteus=0.05; Plantaris/Tabanski mišić=0.05;
      Peronealni mišići/Lisni mišići fibule=0.1; Kvadratni slabinski mišić/Quadratus lumborum=0.1; Skalenski mišići/Skaleni=0.1;
      Podizač lopatice/Levator scapulae=0.1; Platizma/Platysma=0.1; Sljepoočni mišić/Temporalis=0.2; Čeoni mišić/Frontalis=0.2;
      Kružni mišić oka/Orbicularis oculi=0.2; Kružni mišić usta/Orbicularis oris=0.2; Jagodični mišić/Zigomatični mišić/Zygomaticus=0.1;
      Obrazni mišić/Bukcinator/Buccinator=0.1; Mišić smijeha/Risorius=0.1; Podizač gornje vjeđe/Levator palpebrae=0.05;
      Mimični mišići/Mišići lica=0.3; Stapedius/Stremenski mišić=0.1; Dvotrbušni mišić/Digastricus=0.05; Milohioidni mišić/Mylohyoideus=0.03;
      Korakobrahijalis/Coracobrachialis=0.05; Pronator=0.05; Supinator=0.05; Anconeus/Lakatni mišić=0.03; Lumbrikalni mišići=0.03;
      Međukoštani mišići/Interosseji=0.03; Mišić palca/Tenar=0.1; Odmicač palca/Abductor pollicis=0.05; Kremaster/Cremaster=0.05;
      Sfinkter/Mišić zatvarač=0.2; Zatvarač čmara/Analni sfinkter=0.1; Zatvarački mišić/Obturator=0.03; Mišić jezika/Genioglosus=0.03;
      Glatki mišići=0.2; Poprečno-prugasti mišići/Skeletni mišići=0.1; Mišić podizač dlake/Arrector pili=0.03`,
  },
  {
    slug: "kemijski-spoj",
    group: "kviz",
    title: "Kemijski spoj ili tvar",
    hint: "Spoj, smjesa ili tvar, npr. voda, ozon, kofein; ne čisti elementi",
    strip: ["kiselina"],
    answers: `Voda/H2O=20; Sol/Kuhinjska sol/Natrijev klorid/NaCl=10; Ugljikov dioksid/CO2/Ugljični dioksid=8; Alkohol/Etanol=5;
      Šećer/Saharoza=4; Ugljikov monoksid/CO=3; Metan=3; Amonijak=3; Sumporna kiselina=3; Klorovodična kiselina/Solna kiselina=2.5;
      Ocat/Octena kiselina=2.5; Kofein=2.5; Glukoza=2.5; Ozon=2; Soda bikarbona/Natrijev hidrogenkarbonat=2;
      Vodikov peroksid/Hidrogen=2; Nikotin=1.5; Benzin=1.5; Nafta=1.5; Propan=1.5; Butan=1.5; Aceton=1.2; Dušična kiselina=1.2;
      Limunska kiselina=1.2; Natrijev hidroksid/Natrijeva lužina/Kaustična soda=1.2; Varikina/Natrijev hipoklorit=1;
      Metanol=1; Kalcijev karbonat/Vapnenac/Kreda=1; Vapno/Živo vapno/Kreč/Kalcijev oksid=1; Gašeno vapno/Kalcijev hidroksid=0.5;
      Fruktoza=0.8; Laktoza=0.8; Škrob=0.8; Celuloza=0.8; Benzen=0.8; Kloroform=0.8; Eter=0.6; Formaldehid=0.6;
      Glicerin/Glicerol=0.6; Urea/Mokraćevina=0.6; Aspirin/Acetilsalicilna kiselina=0.8; Paracetamol=0.6; Morfij/Morfin=0.5;
      Kokain=0.5; Heroin=0.4; DNK/DNA/Deoksiribonukleinska kiselina=1; RNK/RNA=0.5; ATP/Adenozin trifosfat=0.4;
      Hemoglobin=0.6; Kolesterol=0.6; Inzulin=0.5; Adrenalin/Epinefrin=0.6; Dopamin=0.5; Serotonin=0.5; Melatonin=0.3; Testosteron=0.4;
      Estrogen=0.3; Kortizol=0.3; Vitamin C/Askorbinska kiselina=0.5; Keratin=0.3; Kolagen=0.3; Klorofil=0.5; Kinin=0.2;
      Kapsaicin=0.2; Cijanid/Kalijev cijanid=0.6; Cijanovodik/Cijanovodična kiselina=0.2; Arsenik/Arsenov trioksid=0.3;
      Dizel=0.6; Parafin=0.3; Vosak=0.2; Kerozin=0.2; Asfalt/Bitumen=0.2; PVC/Polivinilklorid=0.4; Polietilen=0.3;
      Stiropor/Polistiren=0.3; Najlon=0.3; Teflon=0.3; Silikon=0.4; Kevlar=0.2; Bakelit=0.1; Kaučuk/Guma=0.3; Plastika=0.4;
      Staklo=0.4; Cement=0.3; Beton=0.3; Gips/Kalcijev sulfat=0.3; Mramor=0.2; Kvarc/Silicijev dioksid=0.3;
      Hrđa/Željezov oksid=0.5; Modra galica/Bakrov sulfat=0.5; Kalijev permanganat/Hipermangan=0.3; Salitra/Kalijev nitrat=0.3;
      Amonijev nitrat=0.3; Natrijev nitrit=0.1; Sumporovodik=0.3; Sumporov dioksid=0.3; Dušikov dioksid=0.2;
      Rajski plin/Didušikov oksid=0.3; Freon=0.3; TNT/Trinitrotoluen=0.4; Nitroglicerin=0.3; Dinamit=0.3; Barut=0.3;
      Napalm=0.2; Sarin=0.1; Iperit=0.1; LSD=0.2; MDMA/Ekstazi=0.2; THC=0.2; Penicilin=0.2; Natrijev glutamat/MSG=0.2;
      Aspartam=0.2; Fluorid=0.2; Fosforna kiselina=0.1; Borna kiselina=0.1; Boraks=0.1; Mravlja kiselina=0.2; Mliječna kiselina=0.2;
      Oksalna kiselina=0.1; Maslačna kiselina=0.05; Salicilna kiselina=0.1; Fenol/Karbolna kiselina=0.1; Salmijak/Amonijev klorid=0.1;
      Kalijev jodid=0.1; Srebrov nitrat=0.1; Etilen/Eten=0.2; Acetilen/Etin=0.2; Etan=0.2; Pentan=0.05; Heksan=0.1; Oktan=0.2;
      Toluen=0.1; Naftalen=0.1; Antifriz/Etilen glikol=0.2; Glikogen=0.1; Maltoza=0.1; Galaktoza=0.05; Melamin=0.05;
      Bisfenol A/BPA=0.05; Dioksin=0.1; DDT=0.1; Glifosat=0.1; Cinkov oksid=0.1; Titanov dioksid=0.1; Natrijev benzoat=0.05;
      Kalijev klorid=0.05; Gorka sol/Magnezijev sulfat=0.1; Kalcijev klorid=0.05; Litijev karbonat=0.03; Natrijev karbonat/Soda=0.2;
      Kalijev hidroksid/Kalijeva lužina=0.1; Suhi led=0.2; Teška voda=0.2; Kalcijev fosfat=0.05; Hidroksiapatit=0.03; Kreatin=0.1; Laktat=0.05; Glutamin=0.05; Glicin=0.05; Alanin=0.03;
      Bjelančevine/Proteini=0.2; Masti/Lipidi=0.1; Aminokiseline=0.1; Enzimi=0.1; Pepsin=0.05; Amilaza=0.05; Lecitin=0.05;
      Želatina=0.1; Agar=0.03; Pektin=0.05; Vanilin=0.1; Mentol=0.1; Kamfor=0.05; Eterična ulja=0.05; Smola=0.05;
      Terpentin=0.1; Razrjeđivač/Nitro razrjeđivač=0.1; Vodeno staklo=0.03; Ftalati=0.03; Bromovodik=0.03; Fluorovodična kiselina=0.05;
      Klorovodik=0.05; Kortizon=0.05; Histamin=0.05; Endorfin=0.2;
      Oksitocin=0.2; Acetilkolin=0.05; Noradrenalin=0.05; Tiroksin=0.05; Bilirubin=0.05`,
  },
  {
    slug: "unesco-hr",
    group: "hr",
    title: "Hrvatska svjetska ili nematerijalna baština UNESCO-a",
    hint: "Lokaliteti svjetske baštine i nematerijalna baština; geoparkovi, rezervati biosfere i privremeni popis ne vrijede",
    strip: [],
    answers: `Dubrovnik/Stari grad Dubrovnik/Dubrovačke zidine=15; Plitvička jezera/Plitvice=14; Dioklecijanova palača/Split=12;
      Eufrazijeva bazilika/Poreč=6; Trogir=6; Šibenska katedrala/Katedrala svetog Jakova=6; Sinjska alka/Alka=6;
      Klapsko pjevanje/Klapa=5; Licitarsko srce/Licitar/Licitari=5; Starogradsko polje/Stari Grad=3; Stećci=3;
      Tvrđava svetog Nikole/Venecijanski obrambeni sustav/Zadarske zidine=3; Festa svetog Vlaha=3; Bećarac=3;
      Čipkarstvo/Paška čipka/Lepoglavska čipka/Hvarska čipka=3; Zvončari=2.5; Nijemo kolo=2; Ojkanje=2;
      Mediteranska prehrana=2; Procesija Za Križen=2; Međimurska popevka=1.5; Lipicanci/Uzgoj lipicanaca=1.5;
      Sokolarstvo=1; Suhozid/Suhozidna gradnja=1.5; Drvene dječje igračke/Zagorske drvene igračke=1;
      Kraljice/Ljelje/Ophod kraljica iz Gorjana=0.8; Istarska ljestvica/Dvoglasje tijesnih intervala=0.8;
      Bukove šume/Bukove prašume=0.6; Sjeverni Velebit=0.4; Paklenica=0.4`,
  },
  {
    slug: "predsjednik-hr",
    group: "hr",
    title: "Predsjednik države, Vlade ili Sabora od 1990.",
    hint: "Predsjednici Hrvatske, premijeri i predsjednici Sabora, i oni koji su to bili kratko",
    strip: ["predsjednik", "premijer"],
    answers: `Franjo Tuđman/Tuđman=20; Andrej Plenković/Plenković=15; Zoran Milanović/Milanović=14;
      Kolinda Grabar-Kitarović/Kolinda/Grabar-Kitarović=12; Stjepan Mesić/Mesić/Stipe Mesić=10; Ivo Josipović/Josipović=8;
      Ivo Sanader/Sanader=8; Ivica Račan/Račan=6; Jadranka Kosor/Kosor=5; Tihomir Orešković/Orešković=3;
      Gordan Jandroković/Jandroković=3; Vladimir Šeks/Šeks=2; Zlatko Mateša/Mateša=1.5; Nikica Valentić/Valentić=1;
      Božo Petrov/Petrov=1; Luka Bebić/Bebić=0.8; Josip Manolić/Manolić=0.8; Franjo Gregurić/Gregurić=0.6;
      Hrvoje Šarinić/Šarinić=0.5; Zlatko Tomčić/Tomčić=0.5; Josip Leko/Leko=0.4; Željko Reiner/Reiner=0.4;
      Vlatko Pavletić/Pavletić=0.4; Boris Šprem/Šprem=0.3; Žarko Domljan/Domljan=0.3; Nedjeljko Mihanović/Mihanović=0.2`,
  },
  {
    slug: "zagrebacka-karlovacka",
    group: "hr",
    title: "Mjesto u Zagrebačkoj ili Karlovačkoj županiji",
    hint: "Grad, općina ili selo; Zagreb ne vrijedi",
    strip: [],
    answers: `Velika Gorica=15; Samobor=14; Karlovac=14; Zaprešić=10; Dugo Selo=6; Jastrebarsko/Jaska=6; Ogulin=6; Duga Resa=5;
      Vrbovec=5; Sveti Ivan Zelina/Zelina=5; Ivanić-Grad/Ivanić Grad=4; Slunj=4; Ozalj=4; Sveta Nedelja=3; Rastoke=2;
      Rakovica=2; Brdovec=1.5; Bistra=1.5; Kloštar Klinča Sela=1.5; Krašić=1.5; Pisarovina=1.2; Plešivica=1.2;
      Bregana=1.2; Žumberak=1.2; Josipdol=1.2; Vojnić=1.2; Plaški=1; Cetingrad=1; Lasinja=0.8; Draganić=0.8; Netretić=0.8;
      Barilović=0.8; Bosiljevo=0.8; Generalski Stol=0.8; Tounj=0.8; Kamanje=0.6; Krnjak=0.6; Ribnik=0.6; Saborsko=0.6;
      Žakanje=0.6; Lupoglav=0.6; Božjakovina=0.6; Brckovljani=0.6; Rugvica=0.6; Križ=0.6; Dubrava=0.6; Gradec=0.5;
      Farkaševac=0.5; Preseka=0.5; Rakovec=0.5; Bedenica=0.5; Jakovlje=0.5; Luka=0.5; Marija Gorica=0.5; Dubravica=0.5;
      Pušća=0.5; Stupnik=0.5; Orle=0.5; Kravarsko=0.5; Pokupsko=0.5; Mraclin=0.5; Pleso=0.6; Kerestinec=0.5; Rakitje=0.4;
      Bestovje=0.3; Rude=0.4; Galgovo=0.3; Sveti Martin pod Okićem=0.3; Kupljenovo=0.3; Laduč=0.3; Harmica=0.3;
      Šenkovec=0.3; Savski Marof=0.3; Donja Bistra=0.3; Gornja Bistra=0.3; Poljanica Bistranska=0.2; Oborovo=0.3;
      Hruščica=0.2; Prozorje=0.2; Ivanić=0.1; Šumećani=0.2; Lijevi Dubrovčak=0.2; Posavski Bregi=0.2; Deanovec=0.2;
      Biškupec Zelinski=0.2; Komin=0.2; Lonjica=0.2; Haganj=0.2; Buševec=0.3; Kurilovec=0.2;
      Vukovina=0.3; Lukavec=0.2; Velika Mlaka=0.3; Kuče=0.2; Gradići=0.2; Šćitarjevo=0.3; Donja Lomnica=0.2;
      Gornja Lomnica=0.2; Novo Čiče=0.2; Staro Čiče=0.1; Okuje=0.1; Pribić=0.2; Sošice=0.2; Kostanjevac=0.1;
      Budinjak=0.1; Stojdraga=0.1; Grdanjci=0.1; Sveta Jana=0.2; Domagović=0.1; Vranov Dol=0.1;
      Strmec Samoborski/Strmec=0.2; Lug Samoborski=0.1; Mala Gorica=0.2; Rakov Potok=0.2; Gradna=0.1; Pojatno=0.1; Šibice=0.1; Zdenci Brdovečki=0.1; Prigorje Brdovečko=0.1; Vivodina=0.2; Trg=0.1; Svetice=0.2; Lešće=0.3; Belaj=0.2; Bubnjarci=0.1; Mahično=0.2; Rečica=0.2;
      Turanj=0.3; Švarča=0.2; Dubovac=0.4; Mostanje=0.2; Zorkovac=0.1; Sveti Petar Mrežnički=0.1; Drežnik Grad=0.4;
      Grabovac=0.3; Selište Drežničko=0.2; Oštarije=0.2; Modruš=0.3; Skradnik=0.1;
      Jasenak=0.2; Drežnica=0.2; Bjelsko=0.1; Primišlje=0.2; Cvitović=0.1; Veljun=0.2; Tržić Tounjski=0.05; Gornji Zvečaj=0.1; Hrnetić=0.1; Banija=0.1; Mekušje=0.1; Logorište=0.1`,
  },
  {
    slug: "horoskop",
    group: "zaigrano",
    title: "Znak zodijaka ili kineskog horoskopa",
    strip: ["znak", "godina"],
    answers: `Lav=10; Škorpion=9; Ovan=8; Bik=8; Blizanci=8; Rak=7; Djevica=7; Vaga=7; Strijelac=6; Jarac=6; Vodenjak=6;
      Ribe=6; Zmaj=4; Tigar=3; Zmija=2.5; Majmun=2; Konj=2; Štakor/Miš=2; Zec=2; Pas=1.5; Pijetao/Kokot=1.5;
      Svinja/Vepar=1.5; Bivol/Vol=1.5; Koza/Ovca=1; Zmijonosac=0.3`,
  },
  {
    slug: "friends",
    group: "zaigrano",
    title: "Lik iz serije Prijatelji (Friends)",
    strip: [],
    answers: `Joey/Joey Tribbiani=15; Chandler/Chandler Bing=15; Ross/Ross Geller=14; Rachel/Rachel Green=14; Monica/Monica Geller=13;
      Phoebe/Phoebe Buffay=13; Gunther=4; Janice=4; Mike/Mike Hannigan=2; Richard/Richard Burke=1.5; Emily=1.5; Ursula=1.2;
      Carol/Carol Willick=1.2; Ben=1; Emma=1; Marcel=1; Susan/Susan Bunch=0.8; Jack Geller=0.8; Judy Geller=0.8; Frank/Frank Buffay=0.6;
      Tag=0.6; Paolo=0.6; Julie=0.5; Kathy=0.5; Charlie/Charlie Wheeler=0.5; Mona=0.4; Elizabeth=0.4; Paul Stevens=0.3;
      Estelle=0.4; Heckles/Mr. Heckles=0.4; Ružni goli tip/Ugly Naked Guy=0.4; Pile i patka/Pile/Patka=0.4; Hugsy=0.3;
      Barry=0.3; Mindy=0.3; Amy/Amy Green=0.3; Jill/Jill Green=0.3; Gavin=0.2; Pete/Pete Becker=0.2; Joshua=0.2; Eddie=0.2;
      Alice=0.2; David=0.2; Fun Bobby=0.2; Nora Bing=0.2; Helena Handbasket/Charles Bing=0.1; Erica=0.1; Gary=0.1; Duncan=0.1;
      Sandra Green=0.1; Leonard Green=0.05; Drake Ramoray/Dr. Drake Ramoray=0.3; Regina Phalange=0.2; Ken Adams=0.1`,
  },
  {
    slug: "abba",
    group: "zaigrano",
    title: "Pjesma ABBA-e",
    strip: [],
    answers: `Dancing Queen=18; Mamma Mia=16; Waterloo=12; Gimme! Gimme! Gimme!/Gimme Gimme Gimme=8; Money Money Money/Money, Money, Money=7;
      The Winner Takes It All/Winner Takes It All=6; Fernando=5; SOS=5; Super Trouper=4; Chiquitita=3; Take a Chance on Me=3;
      Knowing Me, Knowing You/Knowing Me Knowing You=3; Voulez-Vous=2; Thank You for the Music=2; I Have a Dream=2;
      Lay All Your Love on Me=1.5; Does Your Mother Know=1.2; Honey Honey/Honey, Honey=1; Ring Ring=1; The Name of the Game=1;
      Summer Night City=0.8; One of Us=0.8; Slipping Through My Fingers=0.8; I Do, I Do, I Do, I Do, I Do/I Do I Do I Do=0.6;
      Angeleyes=0.6; Head over Heels=0.5; Hasta Mañana=0.5; Eagle=0.4; When All Is Said and Done=0.4; The Day Before You Came=0.4;
      Our Last Summer=0.4; Happy New Year=0.6; Andante, Andante/Andante Andante=0.3; I Still Have Faith in You=0.3;
      Don't Shut Me Down=0.3; Under Attack=0.2; So Long=0.2; Bang-A-Boomerang=0.2; Rock Me=0.2; Tiger=0.1; Arrival=0.1;
      My Love, My Life=0.1; Why Did It Have to Be Me=0.1; Two for the Price of One=0.1; Cassandra=0.1; Kisses of Fire=0.1;
      The Visitors=0.1; Soldiers=0.1; Lovelight=0.1; People Need Love=0.1; He Is Your Brother=0.1; Nina, Pretty Ballerina=0.05;
      Hole in Your Soul=0.05; Dum Dum Diddle=0.05; Move On=0.05; I've Been Waiting for You=0.05; Lovers (Live a Little Longer)=0.05;
      Like an Angel Passing Through My Room=0.05; Me and I=0.05; The Piper=0.05; Should I Laugh or Cry=0.05; Little Things=0.1;
      Just a Notion=0.1; Bumblebee=0.05; No Doubt About It=0.05; Keep an Eye on Dan=0.05; I Can Be That Woman=0.05;
      When You Danced with Me=0.05; Ode to Freedom=0.03`,
  },
  {
    slug: "muppet-sezam",
    group: "zaigrano",
    title: "Lik iz Muppet Showa ili Ulice Sezam",
    strip: [],
    answers: `Kermit/Žabac Kermit=20; Miss Piggy/Gospođica Piggy/Piggy=12; Elmo=10; Keksožder/Cookie Monster/Čudovište od kolačića=8;
      Big Bird/Velika ptica=5; Bert=5; Ernie=5; Fozzie=4; Gonzo=4; Animal=4; Oscar/Oscar the Grouch=3; Švedski kuhar/Swedish Chef=3;
      Statler=2.5; Waldorf=2.5; Grover=2.5; Grof/Count von Count=2; Beaker=1.5; Dr. Bunsen Honeydew/Bunsen=1.5; Rowlf=1;
      Scooter=1; Sam Eagle/Sam orao=0.8; Rizzo=0.8; Pepe=0.6; Camilla=0.5; Sweetums=0.4; Dr. Teeth=0.4; Floyd Pepper/Floyd=0.3;
      Janice=0.3; Zoot=0.3; Robin=0.3; Walter=0.3; Crazy Harry=0.2; Lew Zealand=0.2; Link Hogthrob=0.2; Uncle Deadly=0.1;
      Bobo=0.1; Mahna Mahna=0.5; Abby Cadabby=0.3; Zoe=0.3; Telly=0.2; Snuffleupagus/Snuffy=0.3; Rosita=0.2; Prairie Dawn=0.1;
      Herry Monster=0.1; Baby Bear=0.1; Guy Smiley=0.1; Dvoglavo čudovište/Two-Headed Monster=0.05; Mr. Hooper=0.05`,
  },
  {
    slug: "star-trek",
    group: "zaigrano",
    title: "Lik ili vrsta iz Zvjezdanih staza (Star Trek)",
    strip: ["kapetan", "captain"],
    answers: `Spock=20; Kirk/James T. Kirk=16; Picard/Jean-Luc Picard=10; Data=5; McCoy/Bones=4; Scotty=4; Uhura=3; Worf=3;
      Sulu=2.5; Chekov=2; Riker=2; Klingonci/Klingonac=3; Vulkanci/Vulkanac=2; Borg/Borgovi=3; Seven of Nine/Sedma od Devet=1.5;
      Janeway=1.5; Q=1; Geordi La Forge/La Forge/Geordi=1; Deanna Troi/Troi=1; Beverly Crusher=0.8; Wesley Crusher=0.6;
      Khan=1.5; Romulanci=0.8; Ferengi=0.8; Sisko=0.8; Quark=0.6; Odo=0.6; Kira Nerys/Kira=0.4; Jadzia Dax/Dax=0.4;
      Bashir=0.3; O'Brien=0.3; Garak=0.3; Dukat=0.3; Chakotay=0.4; Tuvok=0.4; Neelix=0.3; Kes=0.2; Tom Paris=0.2;
      B'Elanna Torres=0.2; Harry Kim=0.2; Doktor/The Doctor=0.3; Archer=0.3; T'Pol=0.3; Trip Tucker=0.2; Guinan=0.3;
      Kraljica Borga/Borg Queen=0.3; Locutus=0.2; Sarek=0.2; Pike/Christopher Pike=0.3; Michael Burnham/Burnham=0.3;
      Saru=0.1; Tilly=0.1; Lore=0.1; Nero=0.1; Shran=0.05; Lwaxana Troi=0.05; Barclay=0.05; Tribble/Tribblesi=0.2; Gorn=0.1`,
  },
  {
    slug: "james-bond",
    group: "zaigrano",
    title: "Nešto iz serijala o Jamesu Bondu",
    hint: "Film, glumac, lik ili predmet",
    strip: [],
    answers: `Sean Connery/Connery=12; Daniel Craig/Craig=12; Roger Moore=8; Pierce Brosnan/Brosnan=8; Skyfall=6; Casino Royale=6;
      Goldfinger=5; Aston Martin/Aston Martin DB5=4; M=3; Q=3; Moneypenny/Miss Moneypenny=3; Martini/Protresen ne promiješan=3;
      Zlatno oko/GoldenEye=3; Dr. No=3; Spectre=2.5; Nije vrijeme za umiranje/No Time to Die=2.5; Timothy Dalton/Dalton=2;
      Iz Rusije s ljubavlju/From Russia with Love=2; Zubonja/Jaws=2; 007/Agent 007=2; Walther PPK/Walther=1.5; MI6=1.5;
      Blofeld/Ernst Stavro Blofeld=1.5; George Lazenby/Lazenby=1.2; Ian Fleming/Fleming=1.2; Zrno utjehe/Quantum of Solace=1.2;
      Živi i pusti umrijeti/Live and Let Die=1.2; Sutra nikad ne umire/Tomorrow Never Dies=1; Umri drugi dan/Die Another Day=1;
      Svijet nije dovoljan/The World Is Not Enough=1; Operacija Grom/Thunderball=1; Moonraker=1; Octopussy=1;
      Samo dvaput se živi/You Only Live Twice=0.8; Špijun koji me volio/The Spy Who Loved Me=0.8; Dijamanti su vječni/Diamonds Are Forever=0.8;
      Čovjek sa zlatnim pištoljem/The Man with the Golden Gun=0.8; Samo za tvoje oči/For Your Eyes Only=0.6;
      Pogled na ubojstvo/A View to a Kill=0.6; Dozvola za ubojstvo/Licence to Kill=0.6; Dah smrti/The Living Daylights=0.5;
      U službi Njezina Veličanstva/On Her Majesty's Secret Service=0.5; Nikad ne reci nikad/Never Say Never Again=0.3;
      Oddjob=0.8; Le Chiffre=0.6; Vesper Lynd/Vesper=0.6; Felix Leiter=0.5; Raoul Silva/Silva=0.4; Scaramanga=0.4; Pussy Galore=0.4;
      Honey Ryder=0.4; Xenia Onatopp=0.3; Alec Trevelyan/Trevelyan=0.3; Rosa Klebb=0.2; Madeleine Swann=0.2; Max Zorin/Zorin=0.2;
      Elektra King=0.2; Christmas Jones=0.1; Wai Lin=0.1; Elliot Carver=0.1; Gustav Graves=0.1; Jinx=0.1; Mr. White=0.1;
      Dominic Greene=0.1; Safin=0.1; Tee Hee=0.05; Nick Nack=0.05; Mr. Big/Kananga=0.1; May Day=0.05; Tracy di Vicenzo/Tracy=0.1;
      David Niven=0.05; Smoking=0.3; Bond djevojka/Bond girl=0.8; Ana de Armas=0.2; Halle Berry=0.2; Eva Green=0.2;
      Ursula Andress=0.2; Judi Dench=0.3; Ben Whishaw=0.1; Desmond Llewelyn=0.05; Javier Bardem=0.2; Mads Mikkelsen=0.2;
      Christopher Walken=0.1; Christopher Lee=0.1; Gert Fröbe=0.05; Rami Malek=0.1; Adele=0.3; Shirley Bassey=0.2; Billie Eilish=0.2`,
  },
  {
    slug: "model-auta",
    group: "opce",
    title: "Model automobila",
    hint: "Model, ne marka: npr. Golf, Clio ili Punto",
    strip: ["vw", "volkswagen", "opel", "renault", "fiat", "peugeot", "ford", "bmw", "mercedes", "audi", "toyota", "škoda", "skoda", "citroen", "citroën", "seat", "honda", "mazda", "nissan", "hyundai", "kia", "dacia", "tesla", "volvo", "suzuki", "zastava", "lada", "jeep", "porsche", "ferrari", "lamborghini", "mitsubishi", "chevrolet", "dodge", "mini", "lancia", "subaru", "rimac", "jaguar", "cupra", "toyotin", "model",
      "buick", "cadillac", "chrysler", "pontiac", "oldsmobile", "lincoln", "plymouth", "saab", "rover", "lexus", "infiniti", "acura", "maserati", "bentley", "bugatti", "mclaren", "lotus", "daihatsu", "isuzu", "daewoo", "vauxhall", "austin", "morris", "abarth", "polestar", "byd", "ssangyong", "simca", "trabant", "wartburg", "datsun", "holden", "proton", "mahindra", "geely", "chery", "studebaker", "packard", "hummer", "gmc", "koenigsegg", "pagani", "talbot", "hillman", "sunbeam", "wolseley", "delorean", "moskvič"],
    answers: `Golf/VW Golf=14; Punto/Fiat Punto=6; Clio/Renault Clio=5; Polo/VW Polo=5; Passat=5; Corsa/Opel Corsa=4; Astra/Opel Astra=4;
      Octavia/Škoda Octavia=4; Fićo/Fiat 600/Fića=4; Stojadin/Yugo 45/Zastava 101=4; Megane/Mégane=3; Mustang/Ford Mustang=3;
      Buba/VW Buba/Beetle/Käfer=3; Fiesta/Ford Fiesta=3; Focus/Ford Focus=3; Kadett/Opel Kadett=2.5; Yaris=2.5; Corolla=2.5;
      Model S=2; Model 3=2; Model Y=1.5; Model X=1; Cybertruck=1.5; Panda/Fiat Panda=2; Fiat 500/Cinquecento/Fiat 500e=2;
      Tipo/Fiat Tipo=1.5; Uno/Fiat Uno=1.5; Stilo=0.6; Bravo=0.6; Multipla=0.6; Doblo=0.5; Ducato=0.5; Seicento=0.5; Palio=0.3;
      Twingo=1.5; Laguna=1; Scenic/Scénic=1; Kangoo=1; Captur=1; Kadjar=0.6; Espace=0.5; Renault 4/R4/Katrca=1.5; Renault 5/R5=1;
      Peugeot 206/206=1.5; Peugeot 207/207=1; Peugeot 208/208=1; Peugeot 307/307=1; Peugeot 308/308=1; Peugeot 3008/3008=0.8;
      Peugeot 2008/2008=0.6; Peugeot 405/405=0.4; Peugeot 406/406=0.6; Peugeot 407/407=0.4; Peugeot 508/508=0.4; Peugeot 106/106=0.4;
      C3/Citroën C3=0.8; C4/Citroën C4=0.6; C5/Citroën C5=0.4; Picasso/Xsara Picasso=0.6; Xsara=0.4; Saxo=0.4; Berlingo=0.6;
      Spaček/Citroën 2CV/2CV=1.5; DS=0.4; Ami=0.2; Tiguan=1.5; Touran=0.8; Touareg=0.8; Sharan=0.5; Caddy=0.8; Transporter/Kombi=1;
      Jetta=0.8; Scirocco=0.6; Arteon=0.3; Up/VW Up=0.6; T-Roc=0.6; ID.3=0.3; ID.4=0.3; ID. Buzz=0.3; Fabia=1.5; Superb=1;
      Kodiaq=0.6; Karoq=0.5; Rapid=0.4; Felicia=0.6; Favorit=0.4; Yeti=0.4; Kamiq=0.3; Enyaq=0.3; Ibiza=1.5; Leon/Seat Leon=1.2;
      Toledo=0.6; Arona=0.4; Ateca=0.4; Alhambra=0.3; Marbella=0.3; Formentor=0.3; Insignia=1; Vectra=1; Zafira=0.8; Meriva=0.6;
      Omega=0.6; Mokka=0.6; Agila=0.3; Tigra=0.3; Calibra=0.4; Manta=0.4; Rekord=0.4; Ascona=0.4; Frontera=0.2; Kuga=0.6;
      Mondeo=1; Escort=1; Sierra=0.6; Ka/Ford Ka=0.8; Puma=0.5; Transit=0.8; Ranger=0.4; F-150=0.4; Model T=0.6; GT40=0.2; Capri=0.4;
      Galaxy=0.3; S-Max=0.3; C-Max=0.3; Bronco=0.3; Explorer=0.3; Aygo=0.6; Auris=0.6; Avensis=0.6; RAV4=1; Land Cruiser=1;
      Prius=1; Hilux=0.8; Supra=0.8; Celica=0.6; C-HR=0.4; Camry=0.4; GT86=0.2; Civic=1.5; Accord=0.6; Jazz=0.6; CR-V=0.6; NSX=0.2;
      Micra=0.8; Qashqai=1.2; Juke=0.6; X-Trail=0.6; Leaf=0.4; Navara=0.4; Patrol=0.4; GT-R=0.6; Skyline=0.6; Almera=0.3; Primera=0.3;
      Mazda 3=0.6; Mazda 6=0.4; MX-5/Miata=0.6; RX-7=0.3; CX-5=0.4; Lancer=0.6; Pajero=0.8; Colt=0.4; Outlander=0.4; Space Star=0.3;
      Swift=0.8; Vitara/Grand Vitara=0.6; Jimny=0.6; Ignis=0.3; SX4=0.3; Baleno=0.2; Alto=0.2; Impreza=0.6; Forester=0.4; Outback=0.3;
      i10=0.4; i20=0.6; i30=0.8; Tucson=0.8; Santa Fe=0.4; Kona=0.4; Ioniq=0.3; Getz=0.4; Accent=0.3; Elantra=0.2; Sportage=0.8;
      Ceed/Cee'd=0.6; Picanto=0.4; Rio=0.4; Sorento=0.3; Stonic=0.2; Niro=0.2; Sandero=1; Logan=0.8; Duster=1; Spring=0.3; Jogger=0.3;
      Serija 3/BMW serije 3/Trojka=1.5; Serija 5/Petica=1; Serija 7=0.6; Serija 1=0.4; X5=1; X3=0.6; X6=0.4; X1=0.4; M3=0.8; M5=0.6;
      i3=0.3; i8=0.3; Z4=0.3; E36=0.3; E46=0.3; Klasa A/A klasa=0.6; Klasa C/C klasa=0.8; Klasa E/E klasa=0.8; Klasa S/S klasa=0.8;
      Klasa G/G klasa/Puch/Geländewagen=0.8; Sprinter=0.6; Vito=0.4; SLK=0.3; CLK=0.3; ML=0.3; AMG GT=0.2; Mercedes 190/Baby Benz=0.4;
      A3=1; A4=1; A6=0.8; A8=0.5; A1=0.4; A5=0.4; Q5=0.6; Q7=0.6; Q3=0.4; Q8=0.3; TT=0.6; R8=0.6; e-tron=0.3; Quattro=0.3; RS6=0.3;
      911/Porsche 911=1.5; Cayenne=1; Panamera=0.6; Macan=0.5; Boxster=0.4; Cayman=0.4; Taycan=0.4; F40=0.4; Testarossa=0.5;
      Enzo=0.3; LaFerrari=0.2; 458=0.2; Roma=0.1; Countach=0.6; Diablo=0.5; Murciélago=0.4; Gallardo=0.4; Aventador=0.6; Huracán=0.6;
      Urus=0.5; Miura=0.2; Veyron=0.8; Chiron=0.6; Nevera/Rimac Nevera=1.5; Concept One/Rimac Concept One=0.6; Giulia=0.6;
      Giulietta=0.6; Alfa 147/147=0.6; Alfa 156/156=0.4; Alfa 159/159=0.3; Stelvio=0.3; Ypsilon=0.4; Delta=0.4;
      Stratos=0.2; Thema=0.1; Musa=0.1; Wrangler=0.8; Cherokee/Grand Cherokee=0.8; Renegade=0.4; Compass=0.3; Defender=0.8;
      Discovery=0.4; Evoque=0.6; Range Rover Sport=0.3; XC90=0.6; XC60=0.6; XC40=0.3; V40=0.3; V70=0.3; S60=0.3; Amazon=0.1;
      Mini Cooper/Cooper=1.2; Smart Fortwo/Fortwo=0.6; Camaro=0.6; Corvette=0.8; Impala=0.4; Spark=0.3; Aveo=0.3; Cruze=0.3;
      Captiva=0.2; Challenger=0.5; Charger=0.5; Viper=0.4; Ram=0.3; Escalade=0.4; Hummer/H2=0.5; Thunderbird=0.2; Cadillac DeVille=0.1;
      DeLorean/DMC-12=0.6; Trabant 601/Trabant=0.6; Lada Niva/Niva=1; Lada Samara/Samara=0.4; Žiguli/Lada 2101=0.5; Moskvič=0.3;
      Wartburg 353=0.1; Zastava 750/Fićo 750=0.2; Zastava 128=0.4; Florida/Yugo Florida=0.6; Yugo Koral/Koral=0.4; Zastava 10=0.2;
      Lada Riva=0.2; Dacia 1300=0.3; Škoda 100=0.2; Škoda 120=0.2; Tatra 603=0.05; Golf GTI/GTI=0.6; Golf 2/Golf dvojka=0.6;
      Fiat 125=0.2; Fiat 126/Peglica=0.6; Fiat 127=0.2; Fiat 128=0.2; Fiat 131=0.1; Fiat Croma/Croma=0.1; Lancia Prisma=0.05;
      Renault 12=0.1; Renault 18=0.05; Renault 19=0.2; Renault 21=0.05; Citroën GS/GS=0.1;
      Citroën CX/CX=0.1; Citroën BX/BX=0.1; Citroën AX/AX=0.1; Citroën ZX/ZX=0.05; Opel Senator=0.05;
      VW Bora/Bora=0.3; VW Vento/Vento=0.2; VW Lupo/Lupo=0.3; VW Fox/Fox=0.1; VW Corrado/Corrado=0.1; VW Phaeton/Phaeton=0.1;
      Audi 80=0.3; Audi 100=0.2; BMW E30/E30=0.3; Volvo 240=0.05; Saab 900=0.05; Mercedes W123/W123=0.1; Peugeot 504=0.1;
      Toyota Starlet=0.05; Nissan Sunny=0.1; Honda Prelude=0.05; Mazda 323=0.1; Lada Vesta=0.03; Lada Granta=0.03; BYD Atto 3=0.05;
      Polestar 2=0.03`,
  },
  {
    slug: "lijek",
    group: "opce",
    title: "Lijek",
    hint: "Naziv lijeka, djelatne tvari ili vrste lijeka",
    strip: ["tablete", "tableta", "sirup", "kapi", "mast", "krema", "sprej"],
    answers: `Aspirin=12; Andol=10; Lupocet=8; Paracetamol=8; Ibuprofen=7; Neofen=6; Brufen=5; Antibiotik/Antibiotici=5; Voltaren=4;
      Nurofen=4; Penicilin=3; Plivadon=3; Analgin/Metamizol=2.5; Normabel/Diazepam=2.5; Xanax/Alprazolam=2; Kafetin=2; Caffetin=1;
      Coldrex=1.5; Fervex=1.5; Strepsils=1.5; Septolete=1.5; Linex=1.5; Persen=1; Prozac/Fluoksetin=1.5; Viagra/Sildenafil=2;
      Inzulin=2; Ventolin/Salbutamol=1.2; Panadol=1; Tylenol=0.5; Advil=0.5; Ketonal/Ketoprofen=1; Naproksen/Naprosyn=0.6;
      Diklofenak=1; Sumamed/Azitromicin=1.5; Amoksicilin=1.2; Klavocin/Amoksiklav=1; Augmentin=0.6; Ciprofloksacin/Cipro=0.6;
      Doksiciklin=0.4; Kortizon/Kortikosteroidi=0.8; Prednizon/Prednizolon=0.5; Deksametazon=0.4; Hidrokortizon=0.3;
      Kodein=0.5; Morfij/Morfin=0.8; Tramadol/Tramal=0.6; Fentanil=0.4; Metadon=0.4; Oksikodon=0.3; Heparin=0.4; Varfarin/Martefarin=0.4;
      Kardiopirin=0.4; Concor/Bisoprolol=0.5; Beta blokatori=0.3; Lekadol=0.6; Ranitidin/Ranital=0.5; Controloc/Pantoprazol=0.6;
      Omeprazol=0.6; Nolpaza=0.4; Rennie=0.6; Maalox=0.3; Gaviscon=0.3; Talcid=0.2; Probiotik=0.6; Smecta=0.3;
      Loperamid/Imodium=0.5; Dulcolax=0.3; Lactulose/Laktuloza=0.2; Espumisan=0.3; Buscopan=0.4; No-Spa/Drotaverin=0.3;
      Metformin=0.5; Glucophage=0.2; Ozempic/Semaglutid=0.8; Statini=0.3; Atorvastatin=0.3; Rosuvastatin=0.2; Simvastatin=0.2;
      Enap/Enalapril=0.3; Ramipril=0.3; Lizinopril=0.2; Amlodipin=0.3; Furosemid/Lasix=0.3; Hidroklorotiazid=0.1; Euthyrox/Levotiroksin=0.4;
      Letrox=0.2; Klometiazol/Heminevrin=0.1; Apaurin=0.6; Praxiten/Oksazepam=0.3; Helex=0.3; Lorazepam=0.2; Rivotril/Klonazepam=0.3;
      Sertralin/Zoloft=0.4; Escitalopram/Cipralex=0.3; Citalopram=0.2; Paroksetin/Seroxat=0.2; Venlafaksin=0.1; Litij=0.2;
      Ritalin/Metilfenidat=0.4; Adderall=0.3; Melatonin=0.5; Zolpidem/Sanval=0.2; Antihistaminik=0.3; Claritine/Loratadin=0.4;
      Zyrtec/Cetirizin=0.3; Aerius/Desloratadin=0.2; Fenistil=0.3; Bepanthen=0.6; Panthenol=0.4; Betadine/Povidon jodid=0.4;
      Hidrogen=0.3; Kreon=0.1; Neosporin=0.1; Fucidin=0.2; Baneocin=0.2; Pevaryl=0.1; Canesten/Klotrimazol=0.3; Aciklovir/Zovirax=0.4;
      Tamiflu=0.3; Remdesivir=0.1; Paxlovid=0.1; Cjepivo=0.5; Vitamin C=0.6; Vitamin D=0.4; Magnezij=0.4; Željezo=0.2; Sinecod=0.2; Bronhi=0.1; Prospan=0.4; Fluimukocil/Acetilcistein=0.4; Bisolex/Bromheksin=0.3; Herbion=0.2; Mucosolvan/Ambroksol=0.2;
      Nazalni sprej/Kapi za nos=0.3; Ksilometazolin/Olynth=0.3; Nasonex=0.1; Otrivin=0.2; Kapi za oči=0.2; Kapi za uši=0.1;
      Kontracepcijske pilule/Pilula=0.6; Pilula za dan poslije/Escapelle=0.2; Clexane=0.2; Plavix/Klopidogrel=0.2; Eliquis/Apiksaban=0.1;
      Xarelto/Rivaroksaban=0.1; Digoksin=0.1; Nitroglicerin=0.3; Adrenalin/EpiPen=0.3; Atropin=0.1; Lidokain=0.3; Novokain/Prokain=0.1;
      Ketamin=0.2; Propofol=0.1; Botoks/Botox=0.3; Metotreksat=0.1; Tamoksifen=0.1; Kemoterapija=0.2; Interferon=0.05;
      Hidroksiklorokin=0.1; Kinin=0.1; Ivermektin=0.1; Albendazol=0.05; Metronidazol=0.1; Nistatin=0.05; Flukonazol=0.1;
      Valproat=0.05; Karbamazepin/Tegretol=0.1; Lamotrigin=0.05; Gabapentin=0.1; Pregabalin/Lyrica=0.1; Levodopa=0.1; Haloperidol=0.1;
      Olanzapin=0.05; Kvetiapin/Seroquel=0.1; Risperidon=0.05; Naloksan=0.05; Akrihin=0.02; Gingko/Ginko=0.1; Valerijana/Odoljen=0.2`,
  },
  {
    slug: "grad-grcka-turska",
    group: "opce",
    title: "Grad ili mjesto u Grčkoj, Turskoj ili na Cipru",
    hint: "Uključujući otoke",
    strip: ["grad"],
    answers: `Atena=15; Istanbul/Carigrad=15; Solun/Thessaloniki=8; Ankara=6; Antalya/Antalija=5; Izmir/Smirna=4; Nikozija=3; Limassol=3;
      Larnaka=3; Pafos=2.5; Kavala=2; Patras=2; Heraklion/Iraklion=2; Rodos=2.5; Krf=2; Mikonos=2; Santorini/Thira=2; Bodrum=2.5;
      Alanya=2; Göreme=0.5; Pirej=1.5; Volos=1; Larisa=1; Ioannina/Janina=1; Kalamata=1; Korint=1; Sparta=1; Olimpija=1;
      Delfi=1; Mikena=0.6; Nafplio=0.8; Kalambaka=0.5; Chania/Hanja=1; Rethimno=0.8; Agios Nikolaos=0.5; Lindos=0.5;
      Kos=1; Zakintos/Zante=1.2; Argostoli=0.3; Lefkada=0.8; Paros=0.6; Naxos=0.6; Hidra=0.4; Egina=0.4; Spetses=0.3;
      Skiathos=0.6; Skopelos=0.3; Thasos=0.8; Paralia=0.6; Katerini=0.5; Leptokarija=0.6; Platamonas=0.4; Nea Moudania=0.2;
      Polihrono=0.2; Hanioti=0.2; Pefkohori=0.2; Neos Marmaras=0.3; Sarti=0.2; Ouranoupoli=0.2; Asprovalta=0.4; Stavros=0.2;
      Nea Vrasna=0.1; Keramoti=0.2; Aleksandrupolis/Aleksandroupoli=0.4; Komotini=0.3; Ksanti/Xanthi=0.3; Drama=0.3;
      Seres/Serres=0.3; Edesa=0.2; Veria=0.2; Kozani=0.2; Kastoria=0.3; Florina=0.2; Lamija=0.2; Trikala=0.3; Karditsa=0.1;
      Preveza=0.3; Parga=0.6; Sivota=0.2; Igumenica=0.4; Arta=0.2; Agrinio=0.1; Mesolongi=0.2; Halkida=0.2; Eretrija=0.1;
      Tripoli=0.2; Argos=0.3; Pilos=0.2; Monemvasija=0.3; Githio=0.1; Maraton=0.4; Glifada=0.2; Vouliagmeni=0.1; Sounion=0.3;
      Elefsina/Eleusis=0.2; Tebe/Tiva=0.3; Lavrio=0.1; Rafina=0.2; Hersonisos=0.4; Malija=0.3; Elounda=0.2; Ierapetra=0.2;
      Sitia=0.1; Knosos=0.5; Fira=0.2; Oia=0.4; Kamari=0.2; Mitilena=0.3; Hios=0.3; Samos=0.4; Ikarija=0.2; Patmos=0.3;
      Karpatos=0.2; Simi=0.2; Kalimnos=0.1; Leros=0.1; Milos=0.3; Ios=0.3; Sifnos=0.1; Siros=0.2; Tinos=0.2; Andros=0.2;
      Kitira=0.1; Itaka=0.4; Paksos=0.2; Lemnos=0.2; Samotraka=0.2; Sveta Gora/Atos=0.4; Lezbos=0.3; Kefalonija=0.6; Kreta=0.8;
      Bursa=1; Konya=0.8; Adana=0.6; Gaziantep=0.5; Mersin=0.4; Kayseri=0.4; Trabzon=0.8; Samsun=0.4; Eskişehir=0.4; Diyarbakır=0.4;
      Şanlıurfa/Urfa=0.3; Van=0.3; Erzurum=0.3; Malatya=0.2; Denizli=0.3; Pamukkale=0.8; Efez/Efes=0.8; Kuşadası/Kusadasi=0.8;
      Marmaris=1; Fethiye=0.8; Kemer=0.8; Side=1; Belek=0.6; Kaş=0.4; Kalkan=0.3; Dalaman=0.4; Didim=0.4; Çeşme=0.5; Ölüdeniz=0.4;
      Göcek=0.2; Datça=0.2; Manavgat=0.4; Edirne/Jedrene=0.6; Çanakkale=0.6; Troja/Truva=0.6; Galipolje/Gelibolu=0.4;
      Tekirdağ=0.2; Izmit/Kocaeli=0.3; Bolu=0.1; Zonguldak=0.1; Sinop=0.2; Rize=0.2; Kars=0.2; Antakija/Antakya=0.4;
      İskenderun/Aleksandreta=0.2; Tarsus=0.3; Kahramanmaraş=0.2; Mardin=0.3; Batman=0.3; Nevşehir=0.2; Ürgüp=0.2; Afyon=0.2;
      Kütahya=0.1; Isparta=0.1; Burdur=0.1; Muğla=0.2; Aydın=0.2; Manisa=0.2; Balıkesir=0.2; Ayvalık=0.2; Pergam/Bergama=0.3;
      Iznik/Nikeja=0.3; Famagusta/Gazimağusa=0.6; Kirenija/Girne=0.6; Ayia Napa/Aja Napa=1.2; Protaras=0.5; Paralimni=0.2;
      Polis=0.1; Lefka=0.05; Morfu/Güzelyurt=0.1; Kakopetria=0.05; Omodos=0.05; Lefkara=0.1`,
  },
  {
    slug: "grad-srednja-europa",
    group: "opce",
    title: "Grad ili mjesto u Mađarskoj, Češkoj, Slovačkoj ili Poljskoj",
    strip: ["grad"],
    answers: `Budimpešta=15; Prag=15; Varšava=10; Krakov/Kraków=7; Bratislava=7; Brno=3; Debrecin/Debrecen=2; Pečuh/Pécs=3; Segedin/Szeged=2;
      Balaton=1.5; Siófok=1.5; Gdanjsk/Gdańsk=3; Wrocław/Vroclav=2.5; Poznań/Poznanj=2; Łódź/Lodz=1.5; Katowice=1.5; Szczecin/Ščećin=1;
      Lublin=0.8; Bydgoszcz=0.5; Toruń/Torun=0.6; Gdynia=0.6; Sopot=0.8; Zakopane=1.5; Częstochowa/Čenstohova=1; Białystok=0.5;
      Rzeszów=0.4; Kielce=0.3; Olsztyn=0.3; Opole=0.3; Gliwice=0.4; Zabrze=0.2; Bytom=0.2; Sosnowiec=0.2; Radom=0.2; Płock=0.2;
      Elbląg=0.1; Tarnów=0.2; Nowy Sącz=0.1; Przemyśl=0.2; Zamość=0.2; Malbork=0.4; Wieliczka=0.6; Oświęcim/Auschwitz=1;
      Wadowice=0.4; Legnica=0.1; Wałbrzych=0.1; Jelenia Góra=0.2; Karpacz=0.2; Szklarska Poręba=0.1; Świnoujście=0.3; Kołobrzeg=0.3;
      Międzyzdroje=0.1; Hel=0.2; Zielona Góra=0.2; Gorzów Wielkopolski=0.1; Koszalin=0.1; Słupsk=0.1; Kalisz=0.1; Gniezno=0.2;
      Ostrava=1.2; Plzeň/Plzen=1.5; Olomouc=0.8; Liberec=0.8; České Budějovice/Budweis=1; Hradec Králové=0.5; Pardubice=0.5;
      Karlovy Vary/Karlsbad=1.5; Mariánské Lázně/Marienbad=0.4; Český Krumlov=1; Kutná Hora=0.6; Ústí nad Labem=0.3; Jihlava=0.3;
      Zlín=0.4; Teplice=0.2; Most=0.1; Kladno=0.2; Mladá Boleslav=0.4; Opava=0.2; Frýdek-Místek=0.1; Karviná=0.1; Třebíč=0.1;
      Znojmo=0.2; Mikulov=0.2; Kroměříž=0.2; Telč=0.2; Tábor=0.2; Cheb=0.1; Děčín=0.1; Jablonec nad Nisou=0.1; Trutnov=0.1;
      Špindlerův Mlýn=0.2; Harrachov=0.1; Litomyšl=0.1; Prostějov=0.1; Přerov=0.1; Vsetín=0.05; Kunovice=0.02;
      Košice=2; Žilina=1; Banská Bystrica=0.8; Nitra=0.8; Prešov=0.6; Trnava=0.8; Trenčín=0.6; Poprad=0.6; Martin=0.3; Piešťany=0.4;
      Komárno=0.4; Banská Štiavnica=0.3; Levoča=0.2; Bardejov=0.2; Zvolen=0.2; Ružomberok=0.2; Liptovský Mikuláš=0.2;
      Štrbské Pleso=0.2; Senec=0.1; Dunajská Streda=0.2; Lučenec=0.1; Spišská Nová Ves=0.1; Michalovce=0.1; Humenné=0.1;
      Topoľčany=0.05; Skalica=0.1; Bojnice=0.2; Kežmarok=0.1; Rožňava=0.05; Štúrovo=0.1; Jasná=0.1;
      Đur/Győr=1; Miskolc=0.8; Sopron/Šopron=0.8; Szombathely/Sombathelj=0.4; Székesfehérvár/Stolni Biograd=0.6; Kecskemét=0.5;
      Nyíregyháza=0.3; Eger=0.6; Veszprém=0.4; Esztergom/Ostrogon=0.5; Szentendre=0.4; Visegrád=0.4; Hévíz=0.5; Keszthely=0.5;
      Tihany=0.3; Balatonfüred=0.3; Nagykanizsa/Kaniža=0.4; Zalaegerszeg=0.3; Kaposvár=0.3; Mohač/Mohács=0.6; Baja=0.3;
      Szolnok=0.2; Tokaj=0.4; Gödöllő=0.2; Dunaújváros=0.1; Tata=0.1; Mosonmagyaróvár=0.2; Hajdúszoboszló=0.2; Szekszárd=0.2;
      Harkány=0.3; Siklós=0.2; Villány=0.2; Bük=0.1; Sárvár=0.1; Zalakaros=0.1; Gyula=0.1; Békéscsaba=0.1; Vác=0.1; Kőszeg=0.1;
      Hollókő=0.05; Pannonhalma=0.05`,
  },
  {
    slug: "svjetska-knjizevnost",
    group: "opce",
    title: "Djelo strane književnosti",
    hint: "Roman, ep, drama ili zbirka strane književnosti; naš ili izvorni naslov",
    strip: [],
    answers: `Rat i mir=8; Zločin i kazna=7; Mali princ=7; Don Quijote/Don Kihot=6; Hamlet=5; Romeo i Julija=5; Ana Karenjina=5; Harry Potter=5; 1984=5; Gospodar prstenova=5; Stranac=3; Proces=3; Preobrazba=2.5; Braća Karamazovi=3; Idiot=2; Majstor i Margarita=3; Sto godina samoće=3; Lolita=1.5; Veliki Gatsby/Gatsby=2; Lovac u žitu=2; Ubiti pticu rugalicu/Ubiti pticu ruganicu=1.5; Ponos i predrasude=3; Jane Eyre=1.2; Orkanski visovi=1.5; Madame Bovary/Gospođa Bovary=1.5; Jadnici=2.5; Zvonar crkve Notre-Dame=1.5; Grof Monte Cristo=2.5; Tri mušketira=2; Kapetan Nemo/Dvadeset tisuća milja pod morem=1; Put oko svijeta u 80 dana=1.5; Robinson Crusoe=1.5; Guliverova putovanja=1.2; Oliver Twist=1.5; Božićna priča=0.8; David Copperfield=0.8; Velika očekivanja=0.6; Alisa u Zemlji čudesa=2; Pinokio=1.2; Petar Pan=0.8; Čarobnjak iz Oza=0.8; Moby Dick=1.5; Starac i more=2.5; Kome zvono zvoni=1.2; Zbogom oružje=0.8; Doživljaji Toma Sawyera/Tom Sawyer=1.5; Huckleberry Finn=0.8; Ilijada=2; Odiseja=2.5; Eneida=0.8; Božanstvena komedija=2.5; Dekameron=1; Faust=1.5; Patnje mladog Werthera=0.6; Kralj Lear=1; Macbeth=1.2; Otelo=1; Oluja=0.5; San ivanjske noći=0.8; Mletački trgovac=0.5; Životinjska farma=2.5; Vrli novi svijet=1; Fahrenheit 451=0.8; Hobit=1.5; Kronike iz Narnije/Narnija=1; Dina=0.8; Igra prijestolja=1; Da Vincijev kod=1.5; Alkemičar=1.5; Kradljivica knjiga=0.6; Dnevnik Ane Frank=1.5; Male žene=0.6; Frankenstein=1; Drakula=1.2; Slika Doriana Graya=1; Doktor Jekyll i gospodin Hyde=0.6; Sherlock Holmes=1; Baskervilleski pas=0.6; Ubojstvo u Orient Expressu=0.6; Deset malih crnaca/I onda nije bilo nikoga=0.4; Ime ruže=1; Parfem=1; Mrtve duše=0.5; Oblomov=0.3; Očevi i djeca=0.4; Revizor=0.4; Kabanica=0.4; Na Drini ćuprija=1.5; Prokleta avlija=0.5; Derviš i smrt=0.6; Tvrđava=0.2; Gospođica=0.2; Na zapadu ništa novo=1.2; Kvaka 22=0.6; Klaonica 5=0.4; Let iznad kukavičjeg gnijezda=0.8; Plodovi gnjeva=0.6; O miševima i ljudima=0.8; Istočno od raja=0.3; Ljubav u doba kolere=1; Kronika najavljene smrti=0.4; Lijepi i prokleti=0.1; Uliks=0.8; Portret umjetnika u mladosti=0.2; Gospođa Dalloway=0.3; Prema svjetioniku=0.2; U potrazi za izgubljenim vremenom=0.5; Kandid=0.4; Crveno i crno=0.6; Parmski kartuzijanac=0.2; Otac Goriot=0.4; Germinal=0.3; Nana=0.3; Mučnina=0.4; Kuga=1; Pad=0.2; Čarobni brijeg=0.6; Buddenbrookovi=0.3; Smrt u Veneciji=0.4; Stepski vuk=0.4; Siddhartha=0.6; Demian=0.2; Limeni bubanj=0.3; Dobri vojak Švejk/Švejk=1; Nepodnošljiva lakoća postojanja=0.8; Zov divljine=0.6; Bijeli očnjak=0.6; Ivanhoe=0.5; Otok s blagom=1; Kim=0.2; Knjiga o džungli=1; Tri čovjeka u čamcu=0.3; Vinnetou=1; Posljednji Mohikanac=0.6; Čiča Tomina koliba=0.6; Prohujalo s vihorom=1.5; Rebecca=0.3; Sjaj=0.6; It/Ono=0.6; Misery=0.3; Carrie=0.3; Zeleni kilometar=0.5; Kum=1; Pedeset nijansi sive=0.6; Sumrak=0.6; Igre gladi=0.8; Stopar kroz galaksiju/Vodič kroz galaksiju za autostopere=0.4; Zaklada/Fondacija=0.3; Ja, robot=0.3; Rat svjetova=0.4; Vremeplov=0.4; Nevidljivi čovjek=0.2; Sotonski stihovi=0.3; Ponoćna djeca=0.2; Lovac na zmajeve=0.6; Tisuću čudesnih sunaca=0.3; Moja genijalna prijateljica=0.4; Norveška šuma=0.4; Kafka na žalu=0.2; Gospodar muha=0.8; Sat jedne narančaste/Paklena naranča=0.6; Ljudska komedija=0.1; Gargantua i Pantagruel=0.3; Utopija=0.3; Država=0.4; Vladar=0.6; Umijeće ratovanja=0.6; Tisuću i jedna noć=1; Gilgameš/Ep o Gilgamešu=0.6; Biblija=0.8; Kuran=0.3; Mahabharata=0.2; Beowulf=0.3; Pjesma o Nibelunzima=0.2; Pjesma o Rolandu=0.2; Canterburyjske priče=0.3; Izgubljeni raj=0.3; Tom Jones=0.1; Emma=0.4; Razum i osjećaji=0.6; Mansfield Park=0.1; Middlemarch=0.1; Dvije godine ferija=0.2; Pipi Duga Čarapa=0.6; Emil i detektivi=0.6; Bambi=0.2; Heidi=0.4; Momo=0.3; Beskrajna priča=0.4; Čarlijeva tvornica čokolade/Charlie i tvornica čokolade=0.6; Matilda=0.4; Hladnokrvno=0.2; Na cesti=0.3; Pustinja Tatara=0.1; Leopard/Gepard=0.2; Šum i bijes=0.1`,
  },
  {
    slug: "macka-konj",
    group: "opce",
    title: "Pasmina mačke ili konja",
    strip: ["mačka", "macka", "konj", "pasmina"],
    answers: `Perzijska mačka/Perzijanac/Perzijska=12; Sijamska mačka/Sijamska/Sijamac=10; Lipicanac/Lipicaner=10; Arapski konj/Arapski/Arapac=8; Maine Coon/Mejn kun=6; Sfinga/Sfinks/Sphynx=5; Britanska kratkodlaka/Britanska=5; Mustang=4; Ragdoll=3; Bengalska mačka/Bengalska=3; Ruska plava=2.5; Škotska klempava/Scottish Fold=2.5; Norveška šumska=2; Abesinska=1.5; Burmanska=1.2; Birmanska/Sveta birmanska=1; Turska angora/Angora=1.5; Turski van/Van mačka=0.8; Egipatska mau=0.6; Devon rex=0.6; Cornish rex=0.4; Manx=0.4; Somalijska=0.3; Himalajska=0.4; Egzotična kratkodlaka=0.4; Orijentalna=0.3; Savannah=0.4; Chartreux/Kartuzijanska=0.3; Sibirska=0.8; Nebelung=0.1; Ocicat=0.1; Balinezijska=0.2; Japanski bobtail=0.2; Američka kratkodlaka=0.3; Selkirk rex=0.1; LaPerm=0.05; Munchkin=0.3; Tonkineska=0.1; Havana=0.1; Korat=0.1; Singapura=0.1; Bombay/Bombajska=0.2; Toyger=0.05; Pixie-bob=0.05; Snowshoe=0.05; Ragamuffin=0.05; Domaća mačka/Europska kratkodlaka=1.5; Kućna mačka=0.3; Haflinger=1.5; Fríz/Frizijski konj=1.5; Andaluzijski/Andaluzijanac=1; Shetlandski poni/Šetlandski poni=2; Poni=1.5; Hrvatski posavac/Posavac=2; Hrvatski hladnokrvnjak/Hladnokrvnjak=1; Međimurski konj=0.6; Engleski punokrvnjak/Punokrvnjak/Thoroughbred=2; Quarter horse=0.8; Appaloosa=0.8; Paint horse=0.3; Clydesdale=0.6; Shire=0.4; Percheron=0.4; Belgijski konj/Brabant=0.3; Noriker=0.3; Hanoverski konj/Hanoveranac=0.4; Holštajnski konj=0.2; Trakehner=0.2; Oldenburški konj=0.1; Akhal-Teke/Ahaltekinac=0.6; Islandski konj=0.6; Fjordski konj=0.3; Konik=0.1; Przewalskijev konj/Przewalski=0.6; Tarpan=0.2; Lusitano=0.3; Kladrubski konj=0.1; Nonius=0.2; Gidran=0.1; Bosanski brdski konj=0.4; Hucul=0.1; Exmoor poni=0.05; Connemara=0.1; Welsh poni=0.1; Falabella=0.2; Kasač/Američki kasač=0.4; Orlovski kasač=0.2; Paso fino=0.05; Tennessee walker=0.05; Morgan=0.1; Criollo=0.05; Marwari=0.05; Kabardinski konj=0.02; Don konj=0.02; Budjonovski konj=0.02`,
  },
  {
    slug: "kruh-tjestenina",
    group: "opce",
    title: "Tjestenina, kruh ili pecivo",
    strip: ["kruh"],
    answers: `Špageti=12; Kroasan/Kroason=8; Kifla/Kiflica=8; Bijeli kruh=6; Crni kruh/Raženi kruh=5; Baguette/Bageta/Francuski kruh=5; Pecivo/Peciva=4; Lazanje/Lasagne=4; Penne/Pere=4; Burek=4; Perec/Pereci=3; Makaroni=3; Fusilli/Svrdla=3; Pužići=2; Njoki=3; Tortellini/Tortelini=3; Ravioli=3; Pita=3; Lepinja=3; Somun=2; Pogača=3; Kajzerica=3; Žemlja/Žemička=2; Pletenica=1.5; Integralni kruh/Integralni=2; Kukuruzni kruh/Kukuruznjak=2; Kukuruza=0.4; Proja=1; Polubijeli kruh=1.5; Graham=1.5; Tost=2.5; Ciabatta/Čabata=2; Focaccia/Fokača=2; Pizza=1.5; Pizza tijesto=0.2; Tortilja=1.5; Pita kruh=1; Naan=1; Bagel=1; Brioš/Brioche=1; Krafna/Krafne=1.5; Buhtla/Buhtle=1; Mlinci=1.5; Rezanci=2; Široki rezanci=0.5; Tagliatelle/Taljatele=1.5; Fettuccine=1; Pappardelle=0.4; Linguine=0.6; Bucatini=0.3; Farfalle/Leptirići=1.5; Rigatoni=1; Tortiglioni=0.3; Conchiglie/Školjkice=0.8; Orecchiette=0.3; Cannelloni/Kaneloni=1; Fuži=1.5; Pljukanci=1; Šurlice=0.6; Makaruni=0.6; Hrvatski žganci/Žganci=0.3; Trganci=0.3; Krpice/Krpice sa zeljem=0.6; Valjušci=0.3; Knedle=0.8; Kus-kus/Kuskus=0.6; Orzo/Rižoni=0.3; Vermicelli/Vermičeli=0.3; Noodles/Rezanci za wok=0.6; Ramen=0.8; Udon=0.4; Soba=0.2; Rižini rezanci=0.4; Pierogi=0.3; Pelmeni=0.3; Spätzle/Špecle=0.4; Tjestenina za juhu/Zvjezdice=0.6; Abeceda tjestenina/Slova=0.2; Ditalini=0.1; Kruh s maslinama=0.2; Kruh sa sjemenkama=0.4; Kruh od heljde/Heljdin kruh=0.3; Kruh od spelte/Pirov kruh=0.4; Pšenični kruh=0.5; Bezglutenski kruh=0.2; Kiselo tijesto/Kruh od kiselog tijesta/Sourdough=0.6; Domaći kruh=1; Kruh ispod peke=0.6; Pogačice=0.6; Slanci/Slani štapići=0.8; Grisini=0.8; Dvopek=1; Prepečeni kruh=0.3; Krekeri=0.6; Knackebrot/Hrskavi kruh=0.3; Hot dog pecivo=0.3; Pecivo za hamburger/Hamburger pecivo=0.4; Bun=0.1; Muffin=0.4; Štrudla=0.6; Savijača=0.4; Gibanica=0.6; Zeljanica=0.4; Sirnica=0.6; Krompiruša=0.4; Pita od jabuka=0.3; Pain au chocolat=0.3; Danish/Danski kolač=0.1; Pretzel=0.3; Đevrek/Simit=0.4; Langoš/Lángos=0.6; Uštipci=0.6; Priganice=0.4; Fritule=0.3; Pogača s čvarcima/Čvarkuše=0.4; Kiflice sa sirom=0.3; Pužić s grožđicama/Puž=0.4; Pecivo s makom=0.2; Makovnjača=0.3; Orahnjača=0.3; Božićni kruh/Česnica=0.2; Pinca=0.4; Panettone=0.4; Pandoro=0.1; Kuglof=0.3; Stollen=0.1; Challah/Hala=0.1; Lavaš=0.2; Chapati=0.1; Arepa=0.05; Injera=0.05; Pumpernickel=0.1; Kornspitz=0.3; Mekike=0.3`,
  },
  {
    slug: "izum",
    group: "opce",
    title: "Izum",
    hint: "Stvar ili otkriće koje je netko izumio",
    strip: [],
    answers: `Kotač=12; Žarulja=10; Telefon=8; Internet=6; Računalo/Kompjuter=6; Avion/Zrakoplov=5; Tiskarski stroj/Tisak=5; Kravata=5; Penkala/Nalivpero/Mehanička olovka=5; Automobil/Auto=4; Radio=4; Televizija/Televizor=4; Parni stroj=4; Mobitel/Mobilni telefon=4; Penicilin=3; Barut=3; Kompas=3; Papir=3; Vatra=2; Pismo=2; Padobran=3; Elektromotor/Izmjenična struja=3; Dinamit=2; Fotoaparat=2; Film/Kinematograf=1.5; Gramofon=1.5; Fonograf=1; Telegraf=1.5; Morseov kod/Morseova abeceda=1.5; Pametni telefon/Smartphone=1.5; Mikroskop=2; Teleskop/Dalekozor=2; Termometar/Toplomjer=1.5; Barometar=0.6; Sat=1.5; Naočale=1.5; Lift/Dizalo=1.5; Hladnjak/Frižider=2; Perilica rublja/Veš mašina=1.5; Perilica posuđa=0.6; Usisavač=1; Mikrovalna pećnica/Mikrovalna=1.5; Klima uređaj=1; Ventilator=0.6; Bicikl=2; Motocikl=0.8; Vlak/Lokomotiva=1.5; Brod=0.6; Podmornica=1; Helikopter=1; Raketa=1; Satelit=1; Balon na vrući zrak=0.6; Cepelin=0.4; Torpedo=0.8; Pištolj/Revolver=0.6; Mitraljez=0.4; Atomska bomba=1; Laser=1; Radar=1; GPS=1; Wi-Fi/WiFi=1; Bluetooth=0.6; Tranzistor=0.6; Mikročip/Čip=0.6; Baterija=1.5; Generator=0.6; Transformator=0.4; Indukcijski motor=0.4; Teslin transformator=0.5; Rendgen/Rendgenski aparat=1; Cjepivo=1.5; Stetoskop=0.6; Inzulin=0.6; Aspirin=0.6; Pacemaker/Elektrostimulator srca=0.4; Anestezija=0.4; Antibiotik=0.6; Kontracepcijska pilula=0.4; Daktiloskopija/Otisak prsta=0.8; Kemijska olovka=2.5; Olovka=1; Gumica=0.4; Spajalica=1; Patentni zatvarač/Rajsferšlus/Zip=1.5; Čičak/Velcro=0.6; Sigurnosna igla/Zihernadla=0.4; Šibice=1; Upaljač=0.6; Kišobran=0.6; Konzerva=0.6; Otvarač za konzerve=0.3; Pisaći stroj=1; Kalkulator=1; Abakus=0.6; Novac=0.4; Kreditna kartica=0.4; Bankomat=0.4; Barkod/Bar kod=0.4; QR kod=0.3; World Wide Web/WWW=0.8; E-mail/Elektronička pošta=0.6; Društvene mreže=0.2; Tražilica/Google=0.2; Videoigra=0.4; Igraća konzola=0.2; Rubikova kocka=1; Lego kocke/Lego=0.8; Jo-jo=0.2; Frizbi=0.2; Skateboard=0.2; Role=0.2; Klizaljke=0.2; Kontaktne leće=0.4; Slušni aparat=0.3; Proteza=0.2; Pegla/Glačalo=0.6; Šivaći stroj=0.8; Tkalački stan=0.6; Plug=0.8; Vjetrenjača=0.4; Vodenica/Mlin=0.4; Akvadukt=0.3; Arhimedov vijak=0.3; Poluga=0.4; Kolotur=0.4; Beton=0.4; Cigla=0.4; Staklo=0.6; Ogledalo=0.4; Plastika=0.6; Najlon=0.4; Guma/Vulkanizirana guma=0.4; Teflon=0.3; Kevlar=0.2; Stiropor=0.1; Čelik/Bessemerov postupak=0.3; Bakelit=0.1; Kovanica=0.2; Telefonska sekretarica=0.1; Faks=0.4; Fotokopirni stroj/Fotokopirka=0.4; Pisač/Printer=0.4; 3D printer/3D pisač=0.5; Skener=0.2; Miš (računalni)/Računalni miš=0.6; Tipkovnica=0.2; Monitor=0.1; Laptop=0.4; Tablet=0.3; USB/USB stick=0.4; CD=0.4; DVD=0.2; Disketa=0.3; Kazeta=0.3; Walkman=0.3; MP3=0.3; iPod=0.2; iPhone=0.3; Daljinski upravljač=0.6; Semafor=0.6; Pješački prijelaz/Zebra=0.2; Sigurnosni pojas=0.4; Zračni jastuk/Airbag=0.4; ABS=0.2; Brisači=0.4; Pokretna traka=0.4; Pokretne stepenice=0.3; Robot=0.6; Dron=0.4; Umjetna inteligencija/AI=0.6; ChatGPT=0.2; Nuklearna elektrana/Nuklearni reaktor=0.4; Solarna ćelija/Solarni panel=0.6; Vjetroelektrana=0.2; Hidroelektrana=0.4; Električni automobil=0.6; Električni romobil=0.2; Abeceda/Alfabet=0.6; Kalendar=0.4; Sapun=0.4; Pasta za zube=0.4; Četkica za zube=0.8; Toaletni papir=0.6; WC školjka/Zahod na ispiranje=0.6; Tuš=0.2; Fen/Sušilo za kosu=0.4; Brijač=0.4; Električni brijač=0.2; Dezodorans=0.2; Pelene=0.2; Tampon=0.1; Toster=0.6; Aparat za kavu/Espresso aparat=0.6; Mikser=0.4; Ekspres lonac=0.4; Termos=0.4; Zamrzivač=0.2; Pasterizacija=0.6; Instant kava=0.2; Žvakaća guma=0.4; Coca-Cola=0.4; Sladoled=0.2; Hamburger=0.2; Pizza=0.1; Čokolada=0.2; Sendvič=0.4; Pahuljice/Corn flakes=0.2; Margarin=0.1; Gume za auto/Pneumatik=0.4; Bodljikava žica=0.2; Brava/Ključ=0.2; Sef=0.1; Kamera=0.4; Video kamera=0.2; Digitalni fotoaparat=0.3; Polaroid=0.3; Mikrofon=0.6; Zvučnik=0.4; Slušalice=0.4; Električna gitara=0.4; Sintesajzer=0.2; Klavir=0.3; Metronom=0.1; Električna stolica=0.1; Gilotina=0.4; Detektor laži/Poligraf=0.4; Lisice=0.1; Taser=0.1; Ronilačko odijelo/Akvalung=0.4; Svemirska postaja=0.2; Svemirski brod=0.2; Hubble=0.1; LED/LED dioda=0.6; Neonsko svjetlo=0.2; Fluorescentna cijev=0.1; Gromobran=1; Leydenska boca=0.2; Voltin stup=0.4; Diesel motor/Dizelski motor=0.6; Motor s unutarnjim izgaranjem/Benzinski motor=0.6; Turbina=0.3; Mlazni motor=0.4; Jedrilica=0.2; Leteći stroj=0.2; Fotografija=0.6; Kloniranje=0.2; Genetski inženjering=0.1`,
  },
  {
    slug: "strani-hit",
    group: "zaigrano",
    title: "Strani hit",
    hint: "Naslov strane pjesme, bilo koje desetljeće",
    strip: [],
    answers: `Bohemian Rhapsody=10; Billie Jean=6; Thriller=5; Imagine=5; Hotel California=5; Despacito=5; Macarena=4; Gangnam Style=4; Smells Like Teen Spirit=4; Yesterday=3; Hey Jude=3; Let It Be=3; Dancing Queen=3; Mamma Mia=2; Waterloo=1.5; Wonderwall=3; Shape of You=3; Blinding Lights=3; Rolling in the Deep=2; Hello=2; Someone Like You=2; Bad Romance=2; Poker Face=2; Like a Prayer=2; Like a Virgin=1.5; Material Girl=1; Baby One More Time/...Baby One More Time=2; Toxic=1.5; Oops!... I Did It Again/Oops I Did It Again=1; Umbrella=2; Diamonds=1; Halo=1; Single Ladies=1; Crazy in Love=1; We Will Rock You=3; We Are the Champions=3; Another One Bites the Dust=1.5; Don't Stop Me Now=1.5; Show Must Go On/The Show Must Go On=1.5; I Want to Break Free=1.5; Under Pressure=1; Radio Ga Ga=0.6; Stairway to Heaven=2; Highway to Hell=2; Back in Black=1; Thunderstruck=1; Smoke on the Water=2; Paranoid=1; Sweet Child o' Mine=2; November Rain=1; Welcome to the Jungle=1; Knockin' on Heaven's Door=1.5; Livin' on a Prayer=1.5; It's My Life=1.5; Always=0.6; Nothing Else Matters=2; Enter Sandman=1.5; Master of Puppets=0.6; Satisfaction/(I Can't Get No) Satisfaction=1.5; Paint It Black=1; Angie=1; Sympathy for the Devil=0.6; Start Me Up=0.4; Born in the USA/Born in the U.S.A.=1; Dancing in the Dark=0.6; Purple Rain=1; Kiss=0.4; With or Without You=1.5; One=0.6; Sunday Bloody Sunday=1; Beautiful Day=0.6; Every Breath You Take=1.5; Roxanne=1; Message in a Bottle=0.6; Sultans of Swing=1; Brothers in Arms=0.4; Money for Nothing=0.6; Africa=1.5; Take On Me=1.5; Eye of the Tiger=1.5; Final Countdown/The Final Countdown=1.5; Wind of Change=1.5; Still Loving You=1; Rock You Like a Hurricane=0.4; Losing My Religion=1.5; Everybody Hurts=0.6; Zombie=1.5; Linger=0.6; Creep=1.5; Karma Police=0.4; Don't Look Back in Anger=1; Champagne Supernova=0.4; Live Forever=0.3; Song 2=0.8; Parklife=0.3; Bitter Sweet Symphony=1; Mr. Brightside=1; Seven Nation Army=1.5; Californication=1; Under the Bridge=1; Otherside=0.6; Scar Tissue=0.4; Numb=1; In the End=1.5; Boulevard of Broken Dreams=1; American Idiot=0.6; Basket Case=0.4; Wake Me Up When September Ends=0.6; Somebody That I Used to Know=0.8; Viva la Vida=1; Yellow=1; Fix You=1; Clocks=0.6; The Scientist=0.6; Paradise=0.4; Sky Full of Stars/A Sky Full of Stars=0.4; Radioactive=0.8; Believer=0.8; Demons=0.4; Thunder=0.4; Counting Stars=0.6; Uptown Funk=1; Happy=1; Get Lucky=1; Moves Like Jagger=0.6; Sugar=0.4; Girls Like You=0.3; Thinking Out Loud=0.8; Perfect=0.8; Photograph=0.3; Castle on the Hill=0.2; Bad Guy=0.8; Ocean Eyes=0.2; Shake It Off=1; Love Story=0.6; Blank Space=0.6; Anti-Hero=0.4; Cruel Summer=0.3; Flowers=0.8; Wrecking Ball=0.6; Party in the U.S.A./Party in the USA=0.3; Levitating=0.4; New Rules=0.4; Don't Start Now=0.4; Houdini=0.1; Espresso=0.4; Dance the Night=0.1; Bad Habits=0.3; Stay=0.3; Watermelon Sugar=0.3; As It Was=0.4; Sign of the Times=0.2; Drivers License=0.3; Peaches=0.1; Baby=0.6; Sorry=0.4; Love Yourself=0.3; Lose Yourself=1.5; Without Me=0.8; The Real Slim Shady=0.6; Stan=0.6; Mockingbird=0.3; Love the Way You Lie=0.6; In da Club=0.6; Candy Shop=0.3; California Love=0.6; Changes=0.4; Gangsta's Paradise=1; Still D.R.E.=0.4; Hotline Bling=0.4; God's Plan=0.4; Sicko Mode=0.2; Old Town Road=0.4; Hey Ya!/Hey Ya=0.4; Crazy=0.4; Where Is the Love?/Where Is the Love=0.4; I Gotta Feeling=0.6; Pump It=0.3; My Humps=0.1; Hips Don't Lie=1; Whenever, Wherever/Whenever Wherever=0.6; Waka Waka=1; Livin' la Vida Loca=0.8; Bailando=0.6; La Bamba=0.6; La Isla Bonita=0.4; Bamboleo=0.6; Volare=0.6; Ti amo=0.4; L'italiano=0.4; Felicità=0.4; Gloria=0.4; Sarà perché ti amo=0.2; Non succederà più=0.1; Bella ciao=0.8; Ne me quitte pas=0.4; La vie en rose=0.8; Non, je ne regrette rien=0.6; Alors on danse=0.6; Papaoutai=0.4; Dragostea din tei=0.8; Ein Bett im Kornfeld=0.1; 99 Luftballons=0.8; Du hast=0.6; Sonne=0.3; Ich will=0.2; Barbie Girl=1; Blue (Da Ba Dee)/Blue=1; Freed from Desire=0.8; What Is Love=1; Rhythm of the Night/The Rhythm of the Night=0.8; Mr. Vain=0.3; No Limit=0.4; Rhythm Is a Dancer=0.6; Be My Lover=0.3; Coco Jamboo=0.4; Cotton Eye Joe=0.6; Mambo No. 5/Mambo No 5=0.8; Ice Ice Baby=0.6; U Can't Touch This=0.6; Gonna Make You Sweat=0.2; I Will Survive=1; Stayin' Alive=1.5; Night Fever=0.4; How Deep Is Your Love=0.4; Y.M.C.A./YMCA=1.5; Daddy Cool=0.6; Rasputin=0.8; Sunny=0.4; Ma Baker=0.3; Rivers of Babylon=0.6; Hot Stuff=0.4; Funkytown=0.4; Le Freak=0.3; September=0.6; Celebration=0.3; I Feel Love=0.3; Lady in Red/The Lady in Red=0.4; Careless Whisper=1; Last Christmas=1; Wake Me Up Before You Go-Go=0.4; Faith=0.3; Freedom! '90/Freedom 90=0.3; Tainted Love=0.4; Don't You Want Me=0.3; Sweet Dreams=0.8; Girls Just Want to Have Fun=0.8; Time After Time=0.4; Never Gonna Give You Up=0.8; Total Eclipse of the Heart=0.6; Holding Out for a Hero=0.3; Footloose=0.3; Flashdance... What a Feeling/What a Feeling=0.3; Take My Breath Away=0.4; Don't Worry, Be Happy/Don't Worry Be Happy=0.6; I Just Called to Say I Love You=0.6; Superstition=0.3; What a Wonderful World=1; My Way=1; Fly Me to the Moon=0.6; Strangers in the Night=0.4; New York, New York/New York New York=0.6; Jailhouse Rock=0.6; Love Me Tender=0.6; Can't Help Falling in Love=0.6; Suspicious Minds=0.3; Hound Dog=0.3; Blue Suede Shoes=0.3; Johnny B. Goode=0.6; Rock Around the Clock=0.6; Tutti Frutti=0.3; Great Balls of Fire=0.3; Respect=0.6; Stand by Me=0.8; What's Going On=0.2; My Girl=0.4; I Heard It Through the Grapevine=0.2; Sexual Healing=0.2; No Woman, No Cry/No Woman No Cry=1; One Love=0.4; Buffalo Soldier=0.4; Is This Love=0.3; Could You Be Loved=0.3; Get Up, Stand Up/Get Up Stand Up=0.2; Red Red Wine=0.4; Sound of Silence/The Sound of Silence=0.8; Mrs. Robinson=0.4; Bridge over Troubled Water=0.4; Blowin' in the Wind=0.6; Like a Rolling Stone=0.6; Hallelujah=1; Suzanne=0.2; Light My Fire=0.4; Riders on the Storm=0.4; Break On Through=0.2; Purple Haze=0.4; Hey Joe=0.6; House of the Rising Sun/The House of the Rising Sun=1; Wish You Were Here=1; Another Brick in the Wall=1.5; Comfortably Numb=0.6; Money=0.3; Child in Time=0.4; Black Night=0.2; Whole Lotta Love=0.4; Iron Man=0.4; Ace of Spades=0.4; Born to Be Wild=0.6; Free Bird=0.4; Sweet Home Alabama=0.6; Highway Star=0.1; Walk This Way=0.3; Dream On=0.4; I Don't Want to Miss a Thing=0.8; Bed of Roses=0.2; Poison=0.3; Here I Go Again=0.3; Jump=0.6; Pour Some Sugar on Me=0.2; Summer of '69=0.8; (Everything I Do) I Do It for You/Everything I Do=0.6; My Heart Will Go On=1.5; I Will Always Love You=1.5; Because You Loved Me=0.2; Hero=0.3; All I Want for Christmas Is You=1; Unbreak My Heart/Un-Break My Heart=0.6; Wannabe=1; Spice Up Your Life=0.3; I Want It That Way=0.8; Everybody (Backstreet's Back)/Everybody=0.6; Bye Bye Bye=0.4; Tearin' Up My Heart=0.1; Genie in a Bottle=0.3; Ironic=0.4; You Oughta Know=0.2; Torn=0.4; Kiss Me=0.3; Truly Madly Deeply=0.3; Angels=0.8; Feel=0.4; Rock DJ=0.3; Smooth=0.4; Maria Maria=0.3; No Scrubs=0.2; Waterfalls=0.2; Fernando=0.3; Sweet Caroline=0.4; Country Roads/Take Me Home, Country Roads=0.8; Jolene=0.6; 9 to 5=0.2; Ring of Fire=0.3; Hurt=0.3; Folsom Prison Blues=0.1; Man! I Feel Like a Woman!/Man I Feel Like a Woman=0.2; Achy Breaky Heart=0.3; Lambada=0.8; Asereje/The Ketchup Song=0.6; Gasolina=0.4; Danza Kuduro=0.4; Mi Gente=0.2; Tusa=0.1; Euphoria=0.6; Fairytale=0.3; Arcade=0.2; Tattoo=0.3; Hard Rock Hallelujah=0.4; Toy=0.2; Heroes=0.3; Puppet on a String=0.1; Rim Tim Tagi Dim=0.1; Rise Like a Phoenix=0.3; Zitti e buoni=0.4; Shum=0.1; Stefania=0.1; The Code=0.1; Wasted Love=0.05`,
  },
] satisfies SeedCategory[]).map(najvise150);

export const nove3 = sve.filter((c) => c.group !== "hr");
/** Hrvatska pitanja iz ovog vala čekaju parove za BiH i Srbiju (svaka hr kategorija mora imati par s istim slugom). */
export const nove3Hr = sve.filter((c) => c.group === "hr");

/** Dugi popisi: udjeli se razmjerno smanje da zbroj ne prijeđe 150 (poredak ostaje isti). */
function najvise150(c: SeedCategory): SeedCategory {
  const list = parseSeedAnswers(c.answers);
  const k = 150 / list.reduce((s, a) => s + a.share, 0);
  if (k >= 1) return c;
  const answers = list.map((a) => `${[a.canonical, ...a.variants].join("/")}=${+(a.share * k).toPrecision(2)}${a.rare ? "!" : ""}`).join("; ");
  return { ...c, answers };
}
