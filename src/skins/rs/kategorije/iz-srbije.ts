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
    // iz Srbije, dodani u pitanju "iz susjedstva" (2026-10-29)
    "Verica Šerifović", "Baja Mali Knindža", "Dušan Jakšić", "Vukašin Brajić",
    "Ksenija Pajčin", "Marinko Rokvić", "Leo Martin", "Nina Radojčić", "Nestor Gabrić", "Branko Radaković", "Dušan Kojić",
    "Sandra Afrika", "Milić Vukašinović", "Boba Stefanović", "Marinko Madžgalj", "Zoran Kostić", "Borislav Drljača",
    "Anabela Bukva", "Milica Todorović", "Predrag Gojković", "Nedeljko Bilkić", "Branislav Mojićević", "Sofka Nikolić",
    "Jelena Gavrilović", "Nikola Rokvić", "Peđa Jovanović", "Igor Mišković Eegor", "Nenad Radulović",
    "Srđan Gojković", "Gorica Popović", "Rokeri s Moravu", "Oružjem protivu otmičara", "Garavi sokak", "Rani mraz",
    "Igra staklenih perli", "Kraljevski apartman", "Marija Jaramazović", "Tamara Štricki Seg", "Flamingosi",
    "Poslednja igra leptira", "Južni vetar", "Zona B", "Sedmorica mladih", "Miloš Bojanić",
    "Vera Matović", "Suzana Perović", "Branka Sovrlić", "Novica Urošević", "Staniša Stošić", "Jordan Nikolić", "Milena Plavšić",
    "Snežana Babić", "Katarina Živković", "Roki Vulović", "Savo Radusinović", "Tina Ivanović", "Slađa Delibašić",
    "Zvonko Pantović", "Nataša Đorđević", "Đole Đogani", "Romana Panić", "Ana Rich", "Darko Radovanović", "Katarina Grujić",
    "Dženan Lončarević", "Ana Kokić", "Kija Kockar", "Milena Ćeranić", "Marina Tadić", "Bora Spužić Kvaka",
    "Teodora Džehverović", "Ana Popović", "Mile Lojpur", "Raša Đelmaš", "Peđa D'Boy", "Nebojša Krstić", "Nenad Milosavljević",
    "Vicko Milatović", "Goran Šepa", "Nemanja Kojić", "Kokan Popović", "Srđan Šaper", "Ivana Peters", "Tatjana Đorđević",
    "Toni Montano", "Nikola Čuturilo", "Suzana Petričević", "Andrej Aćin", "Nikola Pejaković", "Dragi Jelić", "Nenad Pagonis",
    "Saška Janković", "Dušan Prelević", "Srđan Marjanović", "Zlatko Manojlović", "Madame Piano", "Žika Jelić",
    "Dražen Janković", "Robert Nemeček", "Tanja Jovićević", "Milan Delčić", "Perica Stojančić", "Marko Bulat",
    "Goca Božinovska", "Zlata Petrović", "Maja Marijana", "Zoran Vanev", "Đani", "Darko Filipović", "Marta Savić",
    "Mirče Radulović", "Nela Vidaković", "Stevan Anđelković", "Electra Elite", "Rođa Raičević", "Jelena Marjanović",
    "Katarina Pejak", "Vasilija Radojčić", "Zoran Leković", "Thea Soti", "Lena Kovačević", "Mika K.", "Cveta Majtanović",
    "Aleksandra Kovač", "Magdi Rúzsa", "Lejla Hot", "Kristina Kovač", "Sanja Bogosavljević", "Sonja Bakić",
    "Milica Majstorović", "Marija Ugrica", "Dunja Ilić", "Sonja Škorić", "Maja Nikolić", "Maja Odžaklievska", "Mirna Radulović",
    "Bojana Vunturišević", "Radmila Karaklajić", "Zera", "Zorja", "Zejna", "Luke Black", "Nikola Sarić", "Đorđe Gogov",
    "Nikola Paunović", "Dr Iggy", "Damir Čičić", "Filip Mitrović", "Aleksa Jelić", "Saša Báša", "Filip Baloš", "Boris Subotić",
    "KBO!", "Radnička Kontrola", "Urbana Gerila", "Defektno Efektni", "TV Moroni", "Direktori", "Ništa Ali Logopedi",
    "Čovek Bez Sluha", "Džukele", "Kazna Za Uši", "Trula Koalicija", "Novembar", "Petar i Zli Vuci", "Dža ili Bu",
    "Muzika Poludelih", "Klopka Za Pionira", "Zvoncekova Bilježnica", "Lira Vega", "Petar Pan", "Etiopia", "Sick Mother Fakers",
    "Svarog", "Dead Ideas", "Urgh!", "Orthodox Celts", "Prljavi Inspektor Blaža i Kljunovi", "Alfapop",
    "Irish Stew of Sindidun", "Deca Loših Muzičara", "Rubber Soul Project", "Vampiri", "Cactus Jack", "Jugosloveni",
    "Porodična Manufaktura Crnog Hleba", "Kontraritam", "Suncokret", "Pasta ZZ", "Profili Profili", "Crni Biseri",
    "Oktobar 1864", "OT", "Daltoni", "VIS Simboli", "Samonikli", "S Vremena Na Vreme", "Kozmetika", "Džentlmeni", "Bele Višnje",
    "The Kuguars", "Tomi Sovilj i Njegove Siluete", "DAG", "Du Du A", "Sanjalice", "Zlatni Prsti", "S.T.R.A.H.", "Heroina",
    "Lutajuća Srca", "Plamenih 5", "Roze Poze", "Hazari", "Vranjski Biseri", "Odjila", "DreDDup", "La Strada", "Plug'n'play",
    "Supernaut", "Repetitor", "Braća Left", "Veliki Prezir", "Doktor Spira i Ljudska Bića",
    "Neočekivana Sila Koja Se Iznenada Pojavljuje i Rešava Stvar", "E-Play", "Goribor", "Angel's Breath", "Nežni Dalibor",
    "Damjan od Resnika", "Morbidi i mnoći", "The Cyclist Conspiracy", "Popečitelji", "Griva", "Osvajači", "GeroMetal",
    "Fernando Colunga Ultimate Experience", "NadimaČ", "Bombarder", "U škripcu", "Dobri Isak", "Gjurmët", "VIA Talas",
    "Bezobrazno Zeleno", "Čista Proza", "Grupa I", "Slomljena Stakla", "Del Arno Band", "FC Apatride UTD", "Kasandrin Glas",
    "Dogovor iz 1804.", "Funky G", "Apsolutno Romantično", "Beauty Queens", "Tap 011", "Elitni Odredi", "Balkanika",
    "Harem Girls", "Dʼ Boys", "Betty Boop", "Dobrovoljno Pevačko Društvo", "Vlada i Bajka", "Ruž", "Divlji Anđeli",
    "The Dibidus", "Super s Karamelom", "Đogani", "Miligram", "Mud Factory", "Wikluh Sky", "Baka Prase", "Pljugica",
  ],
  // jela koja su i srpska (sarma, ajvar, proja, kulen, sataraš, ćufte); "Gibanica" je srpska, a Međimurska gibanica ostaje
  "svjetsko-jelo": [
    "Sarma", "Punjene paprike", "Grah", "Čorbast grah", "Grah s kobasicom", "Ražnjići", "Đuveč", "Ajvar", "Proja", "Uštipci",
    "Lepinja", "Sataraš", "Kulen", "Kulenova seka", "Hladetina", "Tripice", "Gibanica", "Pita od sira",
    "Pita od zelja", "Krumpiruša", "Pinđur", "Ćufte",
  ],
  nogometas: [
    // iz Srbije, dodani u pitanju "izvan Hrvatske" (2026-10-29)
    "Aleksandar Trišović", "Andrija Pavlović", "Dragan Ćirić", "Dragoslav Jevrić", "Dragoslav Šekularac", "Dušan Basta",
    "Dušan Kerkez", "Ivan Ergić", "Ivan Tomić", "Ivica Dragutinović", "Marko Pantelić", "Marjan Marković", "Marko Lomić",
    "Milan Dudić", "Milan Jovanović", "Mladen Krstajić", "Nemanja Rnić", "Nenad Mirosavljević", "Nenad Đorđević",
    "Nikola Žigić", "Radomir Antić", "Saša Ilić", "Slaviša Jokanović", "Slavoljub Muslin", "Zvonimir Vukić", "Zoran Mirković",
    "Ilija Petković", "Dejan Kekezović", "Darko Brašanac", "Mario Maslać",
  ],
};
