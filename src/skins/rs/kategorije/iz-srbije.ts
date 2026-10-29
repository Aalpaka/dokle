// Odgovori iz hrvatskih domaćih kategorija (addFrom) koji su iz Srbije, pa ne vrijede u "van Srbije" pitanjima.
// Odabrano po člancima hrvatske Wikipedije (kategorije, uvod, mjesta rođenja, djelovanja i smrti).
export const izSrbije: Record<string, string[]> = {
  // bački Hrvati i političari iz Vojvodine (Žigmanov, Rajić), raški župan Beloš
  "politicar-svijet": [
    "Beloš Vukanović", "Blaško Rajić", "Tomislav Žigmanov", "Lazar Mamužić", "Živko Bertić", "Aleksa Ivić", "Grgo Vuković",
    "Ivan Evetović", "Vranje Sudarević", "Slavko Aranicki", "Stipan Vojnić Tunić", "Martin Matić", "Miško Prćić", "Josip Sarić",
    "Beno Sudarević", "Baltazar Josić",
    // iz Srbije, dodani u pitanju "izvan Hrvatske" (2026-10-29)
    "Aleksandar Vulin", "Aleksandar Šapić", "Bojan Pajtić", "Dimitrije Ljotić", "Dragan Todorović", "Dragan Šutanovac",
    "Ivan Stambolić", "Nataša Mićić", "Nenad Bogdanović", "Nikola Šainović", "Oliver Ivanović", "Slavica Đukić-Dejanović",
    "Velimir Ilić", "Vuk Jeremić",
  ],
  // pisci iz Vojvodine i Srbije (bački i srijemski Hrvati, Velikić); rođeni u Srbiji koji su djelovali u Hrvatskoj
  // (Šoljan, Vrkljan, Radaković) ostaju
  "strani-pisac": [
    "Neven Ušumović", "Ivan Poljaković", "Ilija Okrugić", "Hrvoje Prćić", "Stanislav Preprek", "Miloš Bandić", "Ivan Pančić",
    "Franjo Štefanović", "Tomislav Ketig", "Ilija Žarković", "Nikola Kujundžić", "August Đarmati", "Pavao Bačić", "Ruža Silađev",
    "Milivoj Prćić", "Tomislav Žigmanov", "Dragan Velikić", "Marko Kljajić", "Balint Vujkov", "Marko Čović", "Aleksa Kokić",
    "Ante Jakšić", "Ivan Balenović", "Lazar Merković", "Ambrozije Šarčević", "Petko Vojnić Purčar", "Mara Đorđević Malagurski",
    "Vojislav Sekelj", "Milovan Miković", "Živko Bertić", "Zvonko Sarić", "Naco Zelić", "Marko Peić",
    "Ljudevit Vujković Lamić – Moco", "Matija Poljaković", "Mara Čović", "Lazar Francišković", "Tihomir Šeremešić", "Josip Pašić",
    "Tone Kujundžić", "Pavao Rakoš", "Fides Vidaković", "Ago Mamužić", "Blaško Vojnić Hajduk", "Mila Markov Španović",
    "Jakov Kopilović", "Marga Stipić", "Ive Prćić stariji", "Anita Đipanov", "Lajčo Perušić", "Josip Šokčić", "Blaženka Rudić",
    "Grgo Bačlija", "Marija Lovrić", "Josip Temunović", "Kata Ivanković", "Ivan Prćić Gospodar", "Ivo Prćić mlađi",
    "Stipan Bešlin", "Mirko Kopunović", "Marica Vujković", "Vedran Horvacki", "Đula Milodanović", "Marija Maja Dulić",
    "Ivan Andrašić", "Marija Šimoković", "Josip Dumendžić Meštar", "Branka Dulić", "Stipan Radoš", "Snježana Kulešević-Souček",
    "Tomislav Vojnić", "Petar Vukov", "Željko Šeremešić", "Ivan Malagurski Tanar", "Ilija Džinić", "Marko Vukov", "Mladen Šimić",
    "Branko Jegić", "Bona Mihaljević", "Ante Zolnaić", "Franjo Bašić", "Katarina Miloš", "Vladislav Kopunović",
    "Jelisaveta Buljovčić Vučetić", "Pavao Bašić-Palković", "Ante Vukov", "Viktorija Aladžić", "Pavka Domić", "Nedeljka Šarčević",
    "Luka Stantić", "Jakov Orčić", "Pero Peić Tukuljac", "Pava Jurković Katanov", "Dominika Ćakić", "Ivan Nepomuk Ambrozović",
    "Ivan Jesse Kujundžić", "Stjepan Beato Bukinac", "Lazar Stipić", "Geza Kikić", "Stjepan Bartoš", "Ružica Miković Žigmanov",
    "Staniša Neorčić", "Ivan Tikvicki Pudar", "Zvjezdana Asić Šarić", "Matija Išpanović", "Josip Klarski", "Mirko Pavić",
    "Ivan Vujić", "Josip Jukić Manić", "Bariša Matković", "Antun Pejić", "Katarina Firanj",
    // iz Srbije, dodani u pitanju "izvan Hrvatske" (2026-10-29)
    "Draginja Adamović", "Dušan Radović", "Filip David", "Ljiljana Habjanović Đurović", "Ljubivoje Ršumović", "Marko Ristić",
    "Milorad Mitrović", "Novica Tadić", "Svetislav Basara", "Uglješa Šajtinac", "Vladislav Pandurović", "Zoran Spasojević",
    "Biljana Srbljanović", "Goran Skrobonja", "Jovan Radulović",
  ],
  // rođeni u Srbiji (uputa "Nije rođen u Srbiji")
  "strani-znanstvenik": [
    "Vesna Bosanac", "Nikica Kalogjera", "Miroslav Tuđman", "Vuk Vrhovac", "Jelena Krmpotić-Nemanić", "Zdenko Škrabalo",
    "Silvija Szabo", "Paško Rakić", "Gaja Alaga", "Branko Hebrang", "Aljoša Mimica", "Krešimir Glavina", "Olga Carević",
    "Tomislav Ladan", "Andrija Fuderer", "Ivica Picek", "Ivan Damjanov", "Tibor Tóth", "Vilim Keilbach", "Mirko Vidaković",
    "Ivan Fattorini", "Mercedes Wrischer", "Angelina Borić", "Marin Šemudvarac", "Mato Brčić Kostić", "Krešimir Sakač",
    "Branko Čelustka", "Teodor Wikerhauser", "Vjekoslav Dulić", "Vladimir Anić", "Jasna Melvinger", "Petar Šimunić",
    "Jadranka Damjanov", "Jozsef Mikuska", "Josip Buljovčić", "Stjepan Musulin", "Adalbert Adam Barić", "Zvonimir Doroghy",
    "Ana Gabrijela Šabić", "Oton Frangeš", "Jure Prpić", "Stjepan Bartolović", "Miroslav Sić",
    // iz Srbije, dodani u pitanju "izvan Hrvatske" (2026-10-29)
    "Milutin Milanković", "Mileva Marić",
  ],
  // igrali za Srbiju ili su srpski košarkaši
  "kosarkas-svijet": [
    "Dunja Prćić", "Zoran Maroević",
    // iz Srbije, dodani u pitanju "izvan Hrvatske" (2026-10-29)
    "Aleksandar Rašić", "Dejan Borovnjak", "Dejan Tomašević", "Dragan Labović", "Dragan Tarlać", "Dušan Kecman",
    "Duško Savanović", "Haris Brkić", "Ivan Paunić", "Marko Kešelj", "Milan Mačvan", "Milan Mlađan", "Milenko Tepić",
    "Milovan Raković", "Novica Veličković", "Sonja Vasić", "Stefan Živanović", "Svetislav Pešić", "Tadija Dragićević",
    "Uroš Tripković", "Vule Avdalović", "Zoran Savić", "Zoran Sretenović", "Zufer Avdija", "Čedomir Vitkovac",
    "Želimir Obradović", "Saša Čađo", "Slađana Golić", "Božidar Maljković",
  ],
  // srbijanski pjevači i pjevači iz Vojvodine
  "exyu-izvodjac": [
    "Neda Ukraden", "Biserka Cvejić", "Slobodan Cvetičanin", "Kraljice Bodroga", "Jelka Asić",
  ],
  // jela koja su i srpska (sarma, ajvar, proja, kulen, sataraš, ćufte); "Gibanica" je srpska, a Međimurska gibanica ostaje
  "svjetsko-jelo": [
    "Sarma", "Punjene paprike", "Grah", "Čorbast grah", "Grah s kobasicom", "Ražnjići", "Đuveč", "Ajvar", "Proja", "Uštipci",
    "Lepinja", "Sataraš", "Kulen", "Kulenova seka", "Hladetina", "Tripice", "Gibanica", "Pita od sira",
    "Pita od zelja", "Krumpiruša", "Pinđur", "Ćufte",
    "Halva", "Kataifi", "Tres leches", "Tulumba",
  ],
  nogometas: [
    // iz Srbije, dodani u pitanju "izvan Hrvatske" (2026-10-29)
    "Aleksandar Trišović", "Andrija Pavlović", "Dragan Ćirić", "Dragoslav Jevrić", "Dragoslav Šekularac", "Dušan Basta",
    "Dušan Kerkez", "Ivan Ergić", "Ivan Tomić", "Ivica Dragutinović", "Marko Pantelić", "Marjan Marković", "Marko Lomić",
    "Milan Dudić", "Milan Jovanović", "Mladen Krstajić", "Nemanja Rnić", "Nenad Mirosavljević", "Nenad Đorđević",
    "Nikola Žigić", "Radomir Antić", "Saša Ilić", "Slaviša Jokanović", "Slavoljub Muslin", "Zvonimir Vukić", "Zoran Mirković",
    "Ilija Petković", "Dejan Kekezović", "Darko Brašanac", "Mario Maslać",
  ],
  // nova "izvan" mjesta i objekti iz Srbije (dodaci 19)
  "jezero-svijet": [
    "Akumulacijsko jezero Fierza", "Lićenat", "Sjeničko jezero", "Akumulacijsko jezero Gazivode", "Robovac", "Prilepnica", "Mali Lićenat", "Žuti kamen",
    "Konjuško jezero", "Štrbačko jezero", "Donje defsko jezero", "Gornje defsko jezero", "Donji Vir", "Malo jažinačko jezero", "Zvorničko jezero", "Ludaško jezero",
    "Kelebijsko jezero", "Krvavo jezero", "Tresetište", "Skenderevo", "Čonopljansko jezero", "Zaovinsko jezero", "Mitrovačko jezero", "Batlavsko jezero",
    "Gračaničko jezero", "Livočko jezero", "Đeravičko jezero", "Šutmansko jezero", "Veliko jažinačko jezero", "Gornje blateštičko jezero", "Donje blateštičko jezero",
  ],
  // nova "izvan" mjesta i objekti iz Srbije (dodaci 19)
  "svjetska-planina": [
    "Vršačke planine", "Jagodnja", "Sokolska planina", "Jablanik", "Valjevske planine", "Juhor", "Suvobor", "Rajac",
    "Gradina", "Kamena Gora", "Hum", "Lićenat", "Skopska Crna gora", "Koritnik", "Paštrik", "Marijaš",
    "Maja e Ropës", "Žuti kamen", "Juničke planine", "Bogićaj",
  ],
  // nova "izvan" mjesta i objekti iz Srbije (dodaci 19)
  "svjetska-znamenitost": [
    "Kalemegdan", "Đavolja varoš", "Sopoćani", "Gamzigrad", "Đurđevi stupovi", "Lepenski vir", "Sinagoga u Subotici", "Katedrala sv. Terezije Avilske u Subotici",
    "Manastir Lipovac", "Manastir Ravanica", "Manastir Gračanica", "Manastir Pećka patrijarhija", "Crkva Gospe Ljeviške", "Vrdnička kula", "Tvrđava Vrdnik", "Trajanov most",
    "Ćele-kula", "Bačka tvrđava", "Spomenik zahvalnosti Francuskoj", "Spomenik Neznanom junaku", "Spomenik Risaru", "Zoološki vrt Palić", "Hagenov most", "Pavlinski samostan u Đurđinu",
    "Franjevački samostan u Baču", "Crkva sv. Klementa u Hrtkovcima", "Crkva sv. Petra u Inđiji", "Crkva Uznesenja Blažene Djevice Marije u Bikovu", "Crkva sv. Josipa Radnika u Đurđinu", "Crkva sv. Marka Evanđelista u Žedniku", "Manastir Bođani", "Muzej vojvođanskih Slovaka",
    "Muzej grada Novog Sada", "Muzej Srijema", "Narodni muzej Zrenjanin", "Narodni muzej Kraljevo", "Narodni muzej Šumadije u Kragujevcu", "Smederevska utvrda", "Petrovaradinska tvrđava", "Zvornička tvrđava",
    "Kuća cvijeća", "Televizijski toranj Avala", "Katedrala sv. Dimitrija u Srijemskoj Mitrovici", "Sinagoga u Srijemskoj Mitrovici", "Crkva sv. Grgura Prosvjetitelja u Novom Sadu", "Crkva Imena Marijina u Novom Sadu", "Hasan-begova džamija", "Islam-agina džamija u Nišu",
    "Bali-begova džamija u Nišu", "Hasan-agina džamija u Priboju", "Altun-alem džamija", "Manastir Mileševa", "Manastir Žiča", "Karađorđev park", "Brankov most", "Most Obrenovac – Surčin",
    "Cestovni Ostružnički most u Beogradu", "Stari most u Zvorniku", "Hram Svetog Save", "Manastir Studenica",
  ],
};
