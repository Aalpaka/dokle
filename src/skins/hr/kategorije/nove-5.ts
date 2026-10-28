// Peti val novih pitanja (2026-10-28): samo zatvoreni popisi koji se mogu provjeriti do kraja, s novim vrstama pitanja:
// prag (veće od, manje od), dvostruki uvjet (glavni grad na isto slovo) i brojevi. Popisi su provjereni na hr.wikipediji
// (članci o državama, Eurovizija po godinama, Oscar za režiju, likovi Alana Forda). Poredak je od najčešćih prema rjeđima.
import type { SeedCategory } from "../categories";
import { rang, type Nova } from "./nove-4";

const zaigrano: Nova[] = [
  {
    slug: "eurovizija-grad",
    group: "zaigrano",
    title: "Grad domaćin Eurovizije",
    hint: "Bilo koja godina od 1956. do 2026.",
    strip: ["grad"],
    answers: `Zagreb; London; Dublin; Stockholm/Stokholm; Malmö/Malmo/Malme; Beč/Wien/Vienna; Basel/Bazel/Basilej/Bâle; Liverpool;
      Torino/Turin; Kopenhagen/København/Kobenhavn/Copenhagen; Kijev/Kyiv/Kiev/Kijiv; Beograd/Belgrade; Oslo/Bærum/Barum; Rotterdam;
      Lisabon/Lisboa/Lisbon; Tel Aviv; Baku; Moskva/Moscow; Helsinki; Atena/Atene/Athens; Istanbul/Carigrad; Riga; Tallinn/Talin;
      Düsseldorf/Dusseldorf/Diseldorf; Pariz/Paris; Rim/Roma/Rome; Amsterdam; Madrid; Bruxelles/Brisel/Brussels/Brussel;
      Luksemburg/Luxembourg/Luxemburg; Jeruzalem/Jerusalem; Den Haag/Haag/Hag/The Hague/'s-Gravenhage; Birmingham;
      München/Munchen/Minhen/Munich; Göteborg/Goteborg/Geteborg/Gothenburg; Bergen; Edinburgh/Edinburg; Brighton;
      Napulj/Napoli/Naples; Cannes/Kan; Frankfurt/Frankfurt na Majni; Lugano; Lausanne/Lozana; Hilversum; Harrogate; Millstreet`,
  },
  {
    slug: "eurovizija-drzava",
    group: "zaigrano",
    title: "Država koja je nastupila na Euroviziji",
    hint: "Bilo koja godina od 1956. do 2026.; vrijede i Jugoslavija i Srbija i Crna Gora",
    answers: `Hrvatska; Švedska; Italija; Francuska; Njemačka/Zapadna Njemačka/SR Njemačka/Germany/Deutschland;
      Ujedinjeno Kraljevstvo/Velika Britanija/Britanija/UK/Ujedinjena Kraljevina/Engleska; Irska; Španjolska; Srbija;
      Bosna i Hercegovina/BiH/Bosna; Slovenija; Norveška; Ukrajina; Izrael; Grčka; Finska; Danska; Nizozemska/Holandija/Holland;
      Austrija; Švicarska; Portugal; Rusija; Jugoslavija/SFRJ/SFR Jugoslavija/SR Jugoslavija/FNRJ/Juga; Crna Gora;
      Sjeverna Makedonija/Makedonija/BJR Makedonija; Albanija; Belgija; Turska/Turkiye; Cipar; Malta; Australija; Island; Poljska;
      Mađarska; Rumunjska; Bugarska; Estonija; Latvija; Litva; Azerbajdžan/Azerbaijan; Armenija; Gruzija; Moldavija/Moldova;
      Bjelorusija/Belarus; Češka/Češka Republika/Czechia; Slovačka; Luksemburg; Monako/Monaco; San Marino; Andora/Andorra;
      Srbija i Crna Gora/SCG; Maroko/Morocco`,
  },
  {
    slug: "alan-ford",
    group: "zaigrano",
    title: "Lik iz stripa Alan Ford",
    hint: "Član Grupe TNT, ljubimac, sporedni lik ili negativac",
    answers: `Alan Ford/Alan; Bob Rock/Bob/Robert Rock; Broj 1/Broj jedan/Br. 1; Superhik/Ezekijel Bluff; Sir Oliver/Oliver/Sir Oliver Oliver;
      Grunf/Otto von Grunf/Otto von Grunt; Jeremija/Jeremija Lešina; Debeli šef/Šef/Gervasius; Klodovik; Gumiflex/Gumifleks;
      Minuette Macon/Minuette/Minuet; Margot; Nosonja; Skviki; Beppa Joseph/Beppa/Morgana; Veliki Cezar/Cezar/Romeo Burton;
      Inspektor Brok/Brok; General War/General James War/James War; Profesor Kreutzer/Kreutzer; Arsen Lupiga/Lupiga; Konspirator;
      Tim, Tom i Tumb/Tim/Tom/Tumb/Braća Rock; Xerex; Prudy; Pelicijus; Hipnos; Samoubojica; Maharadža Blic/Blic; Grbavac;
      Trio Fantastikus; Hillarus Tromb/Tromb; Baby Kate; Barun Vurdalak/Vurdalak; Ljeponoga Betty; Supersirko; Anten-man/Vipera;
      Brenda; Bing; Bert; Sigmund Listić/Listić; Pizistrat Nelson; Lamp; Melisa/Joe Pullover; Kronos; Katodik; Malajac; Srčana;
      Broccoli; Komesar Spillone/Spillone; Tobia Quantrill/Tobija Quantrill/Quantrill; Profesor X-Kappa/X-Kappa; Susjed;
      Gradski vijećnici/Svinjske njuške/Tri prasca; George Duls/Centurion; Profesor Krupp; Andy Sullivan; Johnny Dugi; Cvjetko Smith;
      Agent Fantom; Pochita; Pochito; Poručnik Roland; Shirley; Berto i Berta; Ulricius Hope; Diamond Fitzgerald; Witchcraft;
      Alonisius Alonisiis; Divna Mačkolović`,
  },
];

const opce: Nova[] = [
  {
    slug: "drzava-velika",
    group: "opce",
    title: "Država veća od milijun km²",
    hint: "Ukupna površina države; Grenland se ne računa Danskoj",
    answers: `Rusija/Ruska Federacija; Kanada; Kina/NR Kina; SAD/Sjedinjene Američke Države/Sjedinjene Države/Amerika/USA; Brazil; Australija;
      Indija; Argentina; Kazahstan; Alžir; Meksiko; Saudijska Arabija/Saudijska/Saudi Arabija; Indonezija; Egipat/Egipt; Libija; Iran;
      Mongolija; Demokratska Republika Kongo/DR Kongo/DRK/Kongo-Kinshasa/Zair; Sudan;
      Južnoafrička Republika/JAR/Južna Afrika/Južnoafrička; Peru; Kolumbija; Etiopija; Bolivija; Čad/Chad; Angola; Mali; Niger;
      Mauritanija`,
  },
  {
    slug: "drzava-mala",
    group: "opce",
    title: "Država manja od 1.000 km²",
    hint: "Članica UN-a ili Vatikan",
    answers: `Vatikan/Sveta Stolica/Vatican; Monako/Monaco; San Marino; Lihtenštajn/Liechtenstein; Malta; Andora/Andorra; Singapur/Singapore;
      Maldivi/Maldives/Maldivski otoci; Sejšeli/Seychelles/Sejšelski Otoci; Bahrein/Bahrain; Barbados; Grenada; Tonga; Nauru; Tuvalu;
      Palau; Maršalovi Otoci/Marshallovi Otoci/Maršalovo Otočje/Marshall Islands; Sveta Lucija/Sv. Lucija/Saint Lucia; Dominika/Dominica;
      Antigva i Barbuda/Antigua i Barbuda/Antigva/Antigua; Sveti Kristofor i Nevis/Sv. Kristofor i Nevis/Saint Kitts i Nevis/Saint Kitts;
      Sveti Vincent i Grenadini/Sv. Vincent i Grenadini/Saint Vincent i Grenadini/Saint Vincent; Mikronezija/Micronesia; Kiribati;
      Sveti Toma i Princip/Sv. Toma i Princip/São Tomé i Príncipe/Sao Tome`,
  },
];

const kviz: Nova[] = [
  {
    slug: "prosti-broj",
    group: "kviz",
    title: "Prost broj manji od 200",
    hint: "Djeljiv samo s 1 i sa samim sobom; 1 nije prost broj",
    answers: `7/Sedam; 13/Trinaest; 3/Tri; 5/Pet; 11/Jedanaest; 17/Sedamnaest; 2/Dva; 19/Devetnaest; 23; 31; 37; 29; 97; 41; 43; 47; 53;
      59; 61; 67; 71; 73; 79; 83; 89; 101; 199; 103; 107; 109; 113; 127; 131; 137; 139; 149; 151; 157; 163; 173; 179; 181; 191; 193;
      197; 167`,
  },
  {
    slug: "glavni-isto-slovo",
    group: "kviz",
    title: "Država kojoj glavni grad počinje istim slovom",
    hint: "Po hrvatskim nazivima, i kad se grad zove isto kao država; Š i S nisu isto slovo",
    answers: `Kuvajt/Kuwait; Panama; Luksemburg/Luxembourg; Monako/Monaco; San Marino; Singapur/Singapore; Vatikan/Vatican; Tunis;
      Meksiko/Mexico; Alžir; Brazil; Belgija; Andora/Andorra; Gvatemala/Guatemala; Džibuti/Djibouti; Sjeverna Makedonija; Salvador;
      Maldivi/Maldives; Tajvan/Taiwan; Mozambik; Niger; Barbados; Belize; Gvajana/Guyana; Brunej/Brunei; Južni Sudan;
      Papua Nova Gvineja/Papua/PNG; Sveti Toma i Princip/Sv. Toma i Princip/São Tomé i Príncipe/Sao Tome; Maršalovi Otoci/Marshallovi Otoci`,
  },
  {
    slug: "oscar-redatelj",
    group: "kviz",
    title: "Dobitnik ili dobitnica Oscara za režiju",
    hint: "Oscar za najboljeg redatelja, od 1929. do 2026.",
    answers: `Steven Spielberg/Spielberg; Martin Scorsese/Scorsese/Skorseze; Christopher Nolan/Nolan; James Cameron/Cameron; Clint Eastwood/Eastwood;
      Francis Ford Coppola/Coppola; Peter Jackson/Jackson; Mel Gibson/Gibson; Kevin Costner/Costner; Roman Polanski/Polanski/Roman Polański;
      Miloš Forman/Forman; Oliver Stone/Stone; Robert Zemeckis/Zemeckis;
      Alejandro González Iñárritu/Alejandro G. Iñárritu/Alejandro Iñárritu/Iñárritu; Alfonso Cuarón/Cuarón;
      Guillermo del Toro/Del Toro; Bong Joon-ho/Bong; Woody Allen/Allen; Ron Howard/Howard; Sam Mendes/Mendes; Ang Lee; Danny Boyle/Boyle;
      Kathryn Bigelow/Bigelow; Damien Chazelle/Chazelle; Braća Coen/Coen/Joel Coen/Ethan Coen/Joel i Ethan Coen;
      Paul Thomas Anderson/PTA/P. T. Anderson; Sean Baker; Daniels/Daniel Kwan/Daniel Scheinert/Kwan/Scheinert; Jane Campion/Campion;
      Chloé Zhao/Zhao; Billy Wilder/Wilder; Frank Capra/Capra; John Ford; Elia Kazan/Kazan; Bernardo Bertolucci/Bertolucci; David Lean;
      Steven Soderbergh/Soderbergh; Robert Redford/Redford; Warren Beatty/Beatty; Richard Attenborough/Attenborough;
      Mike Nichols/Nichols; William Wyler/Wyler; John Huston/Huston; Michael Curtiz/Curtiz/Mihály Kertész; Victor Fleming/Fleming;
      Bob Fosse/Fosse; William Friedkin/Friedkin; Tom Hooper/Hooper; Michel Hazanavicius/Hazanavicius; Anthony Minghella/Minghella;
      Jonathan Demme/Demme; Barry Levinson/Levinson; Sydney Pollack/Pollack; Michael Cimino/Cimino; George Cukor/Cukor; Robert Wise;
      Jerome Robbins/Robbins; Fred Zinnemann/Zinnemann; Joseph L. Mankiewicz/Joseph Mankiewicz/Mankiewicz;
      Vincente Minnelli/Minnelli; Carol Reed; John Schlesinger/Schlesinger; John G. Avildsen/John Avildsen/Avildsen; George Roy Hill;
      Franklin J. Schaffner/Franklin Schaffner/Schaffner; Robert Benton/Benton; James L. Brooks/James Brooks;
      Tony Richardson/Richardson; George Stevens/Stevens; Leo McCarey/McCarey; Lewis Milestone/Milestone; Frank Borzage/Borzage;
      Frank Lloyd; Norman Taurog/Taurog; Delbert Mann`,
  },
];

export const nove5: SeedCategory[] = [...zaigrano, ...opce, ...kviz].map(rang);
