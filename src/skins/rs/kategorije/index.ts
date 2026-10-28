// Sadržaj za Srbiju: domaće kategorije (parovi hrvatske grupe), "van Srbije" verzije i zamene ostalih hrvatskih kategorija.
import type { Country } from "../../regional";
import { svijetSport } from "../../regional";
import { rsDomace1 } from "./domace1";
import { rsDomace2 } from "./domace2";
import { rsDomace3 } from "./domace3";
import { rsDomace4 } from "./domace4";
import { rsDomace5 } from "./domace5";
import { rsDomace6 } from "./domace6";
import { rsZamjene } from "./zamjene";
import { dodaci } from "./dodaci";
import { withDodaci, withRemoved } from "../../regional";
import { izSrbije } from "./iz-srbije";

export const rsContent: Country = {
  lang: "srpski",
  domestic: withDodaci([...rsDomace1, ...rsDomace2, ...rsDomace3, ...rsDomace4, ...rsDomace5, ...rsDomace6], dodaci),
  replace: withDodaci(rsZamjene, dodaci),
  abroad: withRemoved({
    "svjetska-planina": {
      title: "Planina ili vrh van Srbije",
      addFrom: "planina",
      remove: ["Kopaonik", "Zlatibor", "Rtanj", "Fruška gora", "Tara", "Stara planina", "Midžor", "Suva planina", "Besna kobila",
        "Jadovnik", "Rudnik", "Avala", "Kosmaj", "Bukulja", "Golija", "Goč", "Kučaj", "Homolje", "Deli Jovan", "Miroč",
        "Jastrebac", "Cer", "Povlen", "Maljen", "Bobija", "Medvednik", "Zlatar", "Ovčar", "Kablar", "Javor", "Mučanj"],
    },
    "strani-klub": {
      title: "Fudbalski klub van Srbije",
      addFrom: "klub",
      remove: ["Crvena zvezda", "Partizan", "Vojvodina", "Radnički Niš", "OFK Beograd", "Javor", "Rad", "Spartak Subotica",
        "Napredak", "Čukarički", "Mladost Lučani", "TSC Bačka Topola", "Radnički Kragujevac", "Novi Pazar"],
    },
    "otok-svijet": { title: "Ostrvo", hint: "Bilo koje ostrvo na svetu, i hrvatska", addFrom: "otok" },
    nogometas: {
      title: "Fudbaler van Srbije",
      hint: "Bilo koji fudbaler koji nije iz Srbije, nekad ili danas",
      addFrom: "reprezentativac",
      remove: ["Dušan Vlahović", "Siniša Mihajlović", "Dejan Stanković", "Dragan Stojković", "Dragan Džajić", "Nemanja Vidić",
        "Aleksandar Mitrović", "Sergej Milinković-Savić", "Dušan Tadić", "Mateja Kežman", "Savo Milošević", "Darko Kovačević",
        "Branislav Ivanović", "Nemanja Matić", "Filip Kostić"],
    },
    "svjetsko-jelo": {
      title: "Jelo koje nije iz srpske kuhinje",
      hint: "Jelo, prilog ili desert iz bilo koje kuhinje osim srpske",
      addFrom: "jelo",
      remove: ["Ćevapi", "Pljeskavica", "Karađorđeva šnicla", "Burek"],
    },
    "svjetska-znamenitost": {
      title: "Znamenitost ili građevina van Srbije",
      hint: "Van Srbije: građevina, spomenik ili poznata prirodna atrakcija",
      addFrom: "znamenitost",
    },
    "jezero-svijet": {
      title: "Jezero van Srbije",
      hint: "Prirodno ili veštačko jezero bilo gde osim u Srbiji",
      addFrom: "jezero",
      remove: ["Srebrno jezero", "Palić", "Zlatarsko jezero", "Vlasinsko jezero", "Đerdapsko jezero", "Gružansko jezero",
        "Perućačko jezero", "Uvačko jezero", "Ćelije", "Bovansko jezero"],
    },
    "kosarkas-svijet": {
      title: "Košarkaš van Srbije",
      hint: "Košarkaš ili košarkašica koji nije iz Srbije, bilo koja generacija",
      addFrom: "kosarkas",
      remove: ["Nikola Jokić", "Vlade Divac", "Peja Stojaković", "Dejan Bodiroga", "Saša Đorđević", "Miloš Teodosić",
        "Predrag Danilović", "Radivoj Korać", "Dragan Kićanović", "Bogdan Bogdanović", "Boban Marjanović", "Zoran Slavnić",
        "Nemanja Bjelica", "Vasilije Micić", "Dražen Dalipagić", "Darko Miličić", "Nenad Krstić", "Željko Rebrača",
        "Igor Rakočević"],
    },
    "sportas-svijet": {
      title: "Sportista ili sportistkinja van Srbije, bez fudbala i tenisa",
      hint: "Nije iz Srbije; bilo koji sport osim fudbala i tenisa, i šah",
      add: svijetSport,
    },
    "politicar-svijet": {
      title: "Političar ili državnik van Srbije",
      hint: "Političar, vladar ili državnik koji nije iz Srbije, danas ili kroz istoriju",
      addFrom: "politicar",
      remove: ["Aleksandar Vučić", "Slobodan Milošević", "Zoran Đinđić", "Boris Tadić", "Ivica Dačić", "Ana Brnabić",
        "Vojislav Koštunica", "Kralj Aleksandar Karađorđević", "Kralj Petar II.", "Nikola Pašić", "Aleksandar Ranković",
        "Draža Mihailović", "Vojislav Šešelj", "Tomislav Nikolić", "Zoran Lilić", "Vuk Drašković", "Čedomir Jovanović",
        "Miloš Vučević", "Dragan Đilas"],
    },
    "strani-pisac": {
      title: "Pisac ili pesnik van Srbije",
      hint: "Pisac ili pesnik koji nije iz Srbije, bilo kog doba",
      addFrom: "pisac",
      remove: ["Danilo Kiš", "Branislav Nušić", "Desanka Maksimović", "Miloš Crnjanski", "Borislav Pekić", "Dobrica Ćosić",
        "Dušan Kovačević", "Vasko Popa", "Momo Kapor", "Ivo Andrić"],
    },
    "strani-znanstvenik": {
      title: "Naučnik ili pronalazač van Srbije",
      hint: "Nije rođen u Srbiji; bilo koje doba",
      addFrom: "znanstvenik",
      remove: ["Mihajlo Pupin"],
    },
    "exyu-izvodjac": {
      title: "Pevač ili bend iz susedstva",
      hint: "Iz Hrvatske, BiH, Crne Gore, Slovenije ili Severne Makedonije",
      addFrom: "glazba",
      remove: ["Lepa Brena", "Ceca", "Riblja čorba", "Đorđe Balašević", "Bajaga", "Električni orgazam", "Željko Joksimović",
        "Šaban Šaulić", "Dragana Mirković", "Jelena Karleuša", "Aca Lukas", "Miroslav Ilić", "Ekatarina Velika",
        "Marija Šerifović", "Vesna Zmijanac", "Saša Matić", "Idoli", "Van Gogh", "Lepa Lukić", "Džej Ramadanovski", "Mile Kitić",
        "Sinan Sakić", "Breskvica", "Konstrakta", "Seka Aleksić", "Indira Radić", "Yu grupa", "Galija", "Đorđe Marjanović",
        "Partibrejkers", "Saša Kovačević", "Smak", "Zana", "Ana Bekuta", "Korni grupa", "Pekinška patka", "Šarlo akrobata",
        "Disciplina kičme", "Bebi Dol", "Oliver Mandić", "Nataša Bekvalac", "Toma Zdravković", "Aleksandra Prijović", "Teya Dora",
        "Aleksandra Radović", "Vlado Georgiev", "Aco Pejović", "Cune Gojković", "Predrag Živković Tozovac", "Snežana Đurišić",
        "Zorica Brunclik", "Stoja", "Ana Nikolić", "Darko Lazić", "Željko Šašić", "Kerber", "Generacija 5",
        "Kanda, Kodža i Nebojša", "Neverne bebe", "Piloti", "Snežana Mišković Viktorija", "Šaban Bajramović", "Boban Marković",
        "Jelena Tomašević", "Zvonko Bogdan", "Nedeljko Bajić Baja", "Mitar Mirić", "Dragan Kojić Keba", "Beogradski sindikat",
        "Bora Đorđević", "Momčilo Bajagić", "Bisera Veletanlić", "Laboratorija zvuka", "Bulevar", "S.A.R.S.", "Slađana Milošević",
        "Emina Jahović", "Nikolija", "Milica Pavlović", "Željko Samardžić", "Lola Novaković", "Olivera Katarina", "Miki Jevremović",
        "Ljiljana Petrović", "Sara Jovanović", "Bojana Stamenov", "Relja Popović", "Coby", "Devito", "Voyage", "Desingerica",
        "Lexington", "Ivana Selakov", "Tanja Savić", "Mira Škorić", "Goca Tržan", "Viki Miljković", "Tea Tairović",
        "Mia Borisavljević", "Juice", "Gru", "Marčelo", "Nevena Božović", "Sloba Radanović", "Zdravko Čolić", "Nada Topčagić",
        "Bjesovi", "Bad Copy", "Moje 3", "Tropico Band"],
    },
    "strani-film": {
      title: "Strani film",
      hint: "Bilo koji igrani ili animirani film koji nije iz Srbije",
      remove: ["Ko to tamo peva", "Maratonci trče počasni krug", "Underground", "Lepa sela lepo gore", "Mi nismo anđeli",
        "Crna mačka, beli mačor", "Bal na vodi", "Varljivo leto '68", "Rane"],
    },
    "jadran-grad": {
      title: "Grad ili mesto na Jadranu",
      hint: "Hrvatska, Crna Gora, Italija, Slovenija, BiH ili Albanija; mora biti na moru",
      addFrom: "obala",
    },
  }, izSrbije),
};
