// Sadržaj za BiH: domaće kategorije (parovi hrvatske grupe), "izvan BiH" verzije i zamjene ostalih hrvatskih kategorija.
import type { Country } from "../../regional";
import { svijetSport } from "../../regional";
import { baDomace1 } from "./domace1";
import { baDomace2 } from "./domace2";
import { baDomace3 } from "./domace3";
import { baDomace4 } from "./domace4";
import { baDomace5 } from "./domace5";
import { baDomace6 } from "./domace6";
import { baDomace7 } from "./domace7";
import { baZamjene } from "./zamjene";
import { dodaci } from "./dodaci";
import { withDodaci } from "../../regional";

export const baContent: Country = {
  lang: "bosanski",
  domestic: withDodaci([...baDomace1, ...baDomace2, ...baDomace3, ...baDomace4, ...baDomace5, ...baDomace6, ...baDomace7], dodaci),
  replace: withDodaci(baZamjene, dodaci),
  abroad: {
    "svjetska-planina": {
      title: "Planina ili vrh izvan BiH",
      addFrom: "planina",
      remove: ["Jahorina", "Bjelašnica", "Igman", "Vlašić", "Maglić", "Romanija", "Velež", "Čvrsnica", "Trebević", "Kozara",
        "Treskavica", "Prenj", "Grmeč", "Vranica", "Zelengora", "Ozren", "Majevica", "Cincar"],
    },
    "strani-klub": {
      title: "Nogometni klub izvan BiH",
      addFrom: "klub",
      remove: ["Zrinjski", "Željezničar", "Sarajevo", "Velež", "Borac Banja Luka", "Široki Brijeg", "Sloboda", "Čelik", "Posušje"],
    },
    "otok-svijet": { title: "Otok", hint: "Bilo koji otok na svijetu, i hrvatski", addFrom: "otok" },
    nogometas: {
      title: "Nogometaš izvan BiH",
      hint: "Bilo koji nogometaš koji nije iz BiH, nekad ili danas",
      addFrom: "reprezentativac",
      remove: ["Edin Džeko", "Miralem Pjanić", "Hasan Salihamidžić", "Sergej Barbarez", "Vedad Ibišević", "Safet Sušić",
        "Mehmed Baždarević", "Faruk Hadžibegić", "Elvir Bolić", "Asmir Begović", "Sead Kolašinac", "Ermedin Demirović"],
    },
    "svjetsko-jelo": {
      title: "Jelo koje nije iz bosanske kuhinje",
      hint: "Jelo, prilog ili desert iz bilo koje kuhinje osim bosanske",
      addFrom: "jelo",
      remove: ["Ćevapi", "Burek", "Bosanski lonac", "Begova čorba", "Tufahija", "Pljeskavica"],
    },
    "svjetska-znamenitost": {
      title: "Znamenitost ili građevina izvan BiH",
      hint: "Izvan BiH: građevina, spomenik ili poznata prirodna atrakcija",
      addFrom: "znamenitost",
      remove: ["Stari most"],
    },
    "jezero-svijet": {
      title: "Jezero izvan BiH",
      hint: "Prirodno ili umjetno jezero bilo gdje osim u BiH",
      addFrom: "jezero",
      remove: ["Buško jezero", "Jablaničko jezero", "Boračko jezero", "Ramsko jezero", "Plivsko jezero"],
    },
    "kosarkas-svijet": {
      title: "Košarkaš izvan BiH",
      hint: "Košarkaš ili košarkašica koji nije iz BiH, bilo koja generacija",
      addFrom: "kosarkas",
      remove: ["Mirza Delibašić", "Jusuf Nurkić", "Mirza Teletović", "Razija Mujanović"],
    },
    "sportas-svijet": {
      title: "Sportaš ili sportašica izvan BiH, bez nogometa i tenisa",
      hint: "Nije iz BiH; bilo koji sport osim nogometa i tenisa, i šah",
      add: svijetSport,
    },
    "politicar-svijet": {
      title: "Političar ili državnik izvan BiH",
      hint: "Političar, vladar ili državnik koji nije iz BiH, danas ili kroz povijest",
      addFrom: "politicar",
      remove: ["Milorad Dodik", "Alija Izetbegović", "Bakir Izetbegović", "Dragan Čović", "Željko Komšić", "Radovan Karadžić"],
    },
    "strani-pisac": {
      title: "Pisac ili pjesnik izvan BiH",
      hint: "Pisac ili pjesnik koji nije iz BiH, bilo kojeg doba",
      addFrom: "pisac",
      remove: ["Ivo Andrić", "Meša Selimović", "Branko Ćopić", "Aleksa Šantić", "Mak Dizdar", "Abdulah Sidran", "Skender Kulenović"],
    },
    "strani-znanstvenik": {
      title: "Znanstvenik ili izumitelj izvan BiH",
      hint: "Nije rođen u BiH; bilo koje doba",
      addFrom: "znanstvenik",
    },
    "exyu-izvodjac": {
      title: "Pjevač ili bend iz susjedstva",
      hint: "Iz Hrvatske, Srbije, Crne Gore, Slovenije ili Sjeverne Makedonije",
      addFrom: "glazba",
      remove: ["Bijelo dugme", "Dino Merlin", "Halid Bešlić", "Zabranjeno pušenje", "Plavi orkestar", "Hari Mata Hari", "Crvena jabuka",
        "Goran Bregović", "Kemal Monteno", "Indexi", "Dubioza kolektiv", "Edo Maajka", "Hanka Paldum", "Haris Džinović",
        "Šemsa Suljaković", "Silvana Armenulić", "Jala Brat", "Buba Corelli", "Selma Bajrami", "Halid Muslimović", "Šerif Konjević",
        "Maya Berović", "Amira Medunjanin", "Safet Isović", "Zaim Imamović", "Himzo Polovina", "Mostar Sevdah Reunion",
        "Davorin Popović", "Elvis J. Kurtović", "Nele Karajlić", "Alen Islamović", "Mladen Vojičić Tifa", "Kemal Malovčić",
        "Hari Varešanović", "Nedžad Salković", "Asim Brkan", "Beba Selimović", "Meho Puzić", "Zehra Deović", "Saša Lošić",
        "Amila Glamočak", "Deen", "Elvir Laković Laka", "Letu štuke", "Frenkie", "Regina", "Vatreni poljubac", "Pro arte",
        "Teška industrija", "Ambasadori", "Bombaj štampa", "Jadranka Stojaković", "Divlje jagode", "Maya Sar"],
    },
    "strani-film": {
      title: "Strani film",
      hint: "Bilo koji igrani ili animirani film koji nije iz BiH",
      remove: ["Ničija zemlja", "Grbavica", "Sjećaš li se Dolly Bell", "Otac na službenom putu"],
    },
    "jadran-grad": {
      title: "Grad ili mjesto na Jadranu izvan BiH",
      hint: "Hrvatska, Italija, Slovenija, Crna Gora ili Albanija; mora biti na moru",
      addFrom: "obala",
      remove: ["Neum"],
    },
  },
};
