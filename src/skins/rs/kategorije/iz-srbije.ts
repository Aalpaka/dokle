// Odgovori iz hrvatskih domaćih kategorija (addFrom) koji su iz Srbije, pa ne vrijede u "van Srbije" pitanjima.
// Odabrano po člancima hrvatske Wikipedije (kategorije, uvod, mjesta rođenja, djelovanja i smrti).
export const izSrbije: Record<string, string[]> = {
  // bački Hrvati i političari iz Vojvodine (Žigmanov, Rajić), raški župan Beloš
  "politicar-svijet": [
    "Beloš Vukanović", "Blaško Rajić", "Tomislav Žigmanov", "Lazar Mamužić", "Živko Bertić", "Aleksa Ivić", "Grgo Vuković",
    "Ivan Evetović", "Vranje Sudarević", "Slavko Aranicki", "Stipan Vojnić Tunić", "Martin Matić", "Miško Prćić", "Josip Sarić",
    "Beno Sudarević", "Baltazar Josić",
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
  ],
  // igrali za Srbiju ili su srpski košarkaši
  "kosarkas-svijet": [
    "Dunja Prćić", "Zoran Maroević",
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
  ],
};
