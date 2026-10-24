// Treći val novih pitanja (2026-10-24): zatvoreni popisi u stilu Pointlessa i Potjere, i otvorena pitanja s 200+ odgovora.
import type { SeedCategory } from "../categories";

const RIMSKI = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX", "XXI", "XXII", "XXIII"];

/** Papinsko ime s varijantama s rednim brojem ("Pio/Pio I/.../Pio XII"); dodatne varijante iza. */
function papa(ime: string, n: number, udio: number, ...extra: string[]) {
  const redni = n > 1 ? RIMSKI.slice(0, n).map((r) => `${ime} ${r}`) : [];
  return [ime, ...redni, ...extra].join("/") + `=${udio}`;
}

export const nove3: SeedCategory[] = [
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
    strip: [],
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
    strip: [],
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
    title: "Hrvatsko dobro na UNESCO-ovom popisu",
    hint: "Svjetska baština ili nematerijalna kulturna baština",
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
];
