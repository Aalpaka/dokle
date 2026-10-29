// Odgovori iz hrvatskih domaćih kategorija (addFrom) koji su iz BiH, pa ne vrijede u "izvan BiH" pitanjima.
// Odabrano po člancima hrvatske Wikipedije (kategorije, uvod, mjesta rođenja, djelovanja i smrti).
export const izBiH: Record<string, string[]> = {
  // djelovali u BiH (Predsjedništvo, Federacija, HDZ BiH, Herceg-Bosna, JMO, Zemaljski sabor) ili su po članku "iz BiH";
  // hrvatski političari koji su samo rođeni u BiH (Šušak, Bandić, Grlić Radman) ostaju
  "politicar-svijet": [
    "Krešimir Zubak", "Borjana Krišto", "Ante Jelavić", "Mario Kordić", "Davor Perinović", "Marinko Čavara", "Bariša Čolak",
    "Zdenko Ćosić", "Ljubo Bešlić", "Hrvoje Ištuk", "Atif Hadžikadić", "Ismet Gavrankapetanović", "Ivan Bagarić",
    "Perica Jelečević", "Zvonimir Banović", "Krunoslav Kordić", "Jakov Grgurić", "Ivo Elegović", "Meho Mehičić",
    "Ante Kamenjašević", "Hakija Hadžić", "Zdenko Lučić", "Mesud Kulenović", "Željko Raguž", "Nikola Precca", "Uroš Doder",
    "Željana Zovko", "Slobodan Praljak", "Ante Raspudić", "Ivica Lučić", "Viktor Gutić", "Božidar Bralo", "Nikola Mandić",
    "Džafer Kulenović", "Osman Kulenović", "Hilmija Bešlagić", "Marko Dragić", "Vuk Vukčić Hrvatinić", "Petar Rogulja",
    "Nino Raspudić", "Zdravko Sančević", "Alija Šiljak", "Ragib Čapljić",
    // iz BiH, dodani u pitanju "izvan Hrvatske" (2026-10-29)
    "Adil Zulfikarpašić", "Adnan Terzić", "Ahmet Hadžipašić", "Aleksandar Džombić", "Benjamina Karić", "Bogić Bogićević",
    "Borislav Paravac", "Dario Kordić", "Denis Zvizdić", "Dragan Đokanović", "Ejup Ganić", "Fahrudin Radončić", "Igor Crnadak",
    "Igor Radojičić", "Ivo Miro Jović", "Mate Boban", "Mehmed-beg Kapetanović Ljubušak", "Mirko Šarović", "Nijaz Duraković",
    "Nikola Koljević", "Nikola Poplašen", "Nikola Špirić", "Raif Dizdarević", "Sven Alkalaj", "Vjekoslav Bevanda",
    "Džemal Bijedić", "Rodoljub Čolaković",
  ],
  // bosanskohercegovački i bošnjački pisci, franjevci Bosne Srebrene i Hercegovine, i oni rođeni u BiH koji su ondje
  // živjeli ili umrli; hrvatski pisci koji su samo rođeni u BiH (A. B. Šimić, Kušan, Šop) ostaju
  "strani-pisac": [
    "Miljenko Jergović", "Fadil Hadžić", "Josip Mlakić", "Musa Ćazim Ćatić", "Bekim Sejranović", "Safvet-beg Bašagić",
    "Ivan Franjo Jukić", "Predrag Matvejević", "Ivan Lovrenović", "Enver Čolaković", "Željko Ivanković",
    "Abdurezak Hivzi Bjelevac", "Tomislav Dretar", "Ahmed Muradbegović", "Osman Nuri Hadžić", "Novak Simić", "Enes Čengić",
    "Igor Štiks", "Anđelko Vuletić", "Jovan Sundečić", "Đuro Zrakić", "Sanja Babić Đulvat", "Lovro Šitović", "Veselko Koroman",
    "Petar Miloš", "Zlata Artuković", "Petar Milić", "Miljenko Stojić", "Jurislav Korenić", "Ivan Vukoja", "Mato Džaja",
    "Ivan Milićević", "Ivan Alilović", "Žarko Milenić", "Bazilije Pandžić", "Šimun Šito Ćorić", "Igor Divković",
    "Marko Skejo Vukić", "Matija Divković", "Grgo Martić", "Alija Nametak", "Darko Juka", "Jeronim Vladić", "Fran Kušan",
    "Sead Mahmutefendić", "Mato Blažević", "Vladimir Čerkez", "Stojan Vrljić", "Jakov Bubalo", "Vesna Zovko", "Nikola Vidaković",
    "Marko Martinović", "Vjekoslav Boban", "Ljuba Đikić", "Oton Knezović", "Andrija Vučemil", "Boris Ćorić", "Iva Nuić",
    "Ante Jukić", "Sanijela Matković", "Augustin Vlastelinović", "Marija Ancila Bubalo", "Šimo Ešić", "Hasan Kikić",
    "Ivica Vanja Rorić", "Slavko Grubišić", "Vinko Grubišić", "Magdalena Blažević", "Mile Stojić", "Martin Nedić", "Mile Pešorda",
    "Zvonimir Remeta", "Anto Zirdum", "Ante Matić", "Andrija Nikić", "Tugomir Alaupović", "Malkica Dugeč", "Pero Pavlović",
    "Ruža Zubac-Ištuk", "Feliks Niedzielski", "Mirko Vidović", "Pejo Šimić", "Stanislav Šimić", "Zdenko Antunović",
    "Vitomir Lukić", "Ivan Softa", "Jozo Džambo", "Štefa Jurkić", "Stjepan Džalto", "Ivan Kordić", "Jakša Kušan",
    "Ivo Mijo Andrić", "Marko Lukenda", "Anita Martinac", "Anto Marinčić", "Munir Ekremov Šahinović", "Jakov Jurišić",
    "Slavica Buljan", "Mate Sušac", "Anka Topić", "Ljerka Mikić", "Ivan Bandulavić", "Josip Milić", "Nikola Martić", "Mijo Tokić",
    "Ivo Totić", "Luka Marković", "Željko Kocaj", "Mustafa Hadžigrabčanović", "Nikola Kordić", "Frano Vukoja", "Stjepan Margitić",
    "Nikola Buconjić", "Jozefina Dautbegović Krajnović", "Milka Tica", "Jakov Rafael Romić", "Ivo Zeko", "Luka Pavlović",
    "Ferid Karihman", "Mladen Lucić", "Franjo Marić", "Fikret Cacan", "Saša Skenderija", "Mesud Kulenović", "Mario Suško",
    "Dragan Šimović", "Fabijan Lovrić", "Vendelin Karačić", "Anto Šarić", "Mijo Jurić", "Lidija Pavlović-Grgić", "Vlado Puljić",
    "Jozo Mašić", "Mila Vlašić Gvozdić", "Janja Mikulić", "Husnija Čengić", "Ljubomir Pavlović", "Nada Kesterčanek Vujica",
    "Ismet Žunić", "Božidar Kaćunko", "Josip Kurevija", "Stanislava Čarapina Ćulanić", "Hrvoje Ostojić", "Marinko Banović",
    "Antonije Sunarić", "Ljubica Benović", "Dragan Čuturić", "Jelica Selak", "Ružica Soldo", "Ivo Tvrtković", "Agata Truhelka",
    "Janja Milić Zobunđija", "Nenad Valentin Borozan", "Ante Mate Ivandić", "Franjo Džakula", "Augustin Čengić", "Anto Knežević",
    "Tihomir Nakić", "Marina Trumić", "Ivo Raguž", "Tomica Penavić", "Franjo Jezidžić", "Gojko Sušac", "Antun Mladen Vranješ",
    "Mila Markov Španović", "Stipe Ivo Sučić", "Miro Sirovina", "Rasim Filipović", "Božena Volić", "Marija Perić-Bilobrk",
    "Tunjo Marković", "Ivica Strikan Budulica", "Drago Bosiljevac", "Šima Majić", "Jozo Jakiša", "Mira Šubašić", "Marinko Soldo",
    "Kristijana Zoraja Drušković", "Nada Plejić", "Ljerka Anić", "Ivo Sivrić", "Franjo Brkić", "Aneta Benac", "Jandre Drmić",
    "Leona Sabolek", "Slavica Stojak", "Eleonora Pavišić-Filipović", "Ante Delmin Matić", "Miroslav Neretljak",
    "Šekelja, Marko Brišničanin", "Emilijan Treml", "Franjo A. Zlović", "Ignacije Strukić", "Ivo Sarajlija", "Ferdo Vrbančić",
    "Pavao Senjić Tvrtković", "Stjepan Zelenika", "Berislav Kalfić", "Zdenko Bošković", "Dragan Marijanović", "Moric Danon-Žika",
    "Vera Arapović", "Nevenka Budimir", "Augustin Kristić", "Ilija Blažanović", "Ivica Šarić", "Luka Blažanović",
    "Slavo Antin Bago", "Pavao Papić", "Tomislava Kata Ćavar", "Ljuboje Dlustuš", "Mila Bernardina Crnogorac", "Mira Beljan",
    "Bono Perišić", "Đuro Bujher", "Ivo Vlahović", "Marko Roko Vincetić", "Vesna Berezovska", "Ivan Stražemanac Kopijarević",
    "Edhem Mulabdić",
    // iz BiH, dodani u pitanju "izvan Hrvatske" (2026-10-29)
    "Ahmet Hromadžić", "Alija Isaković", "Bisera Alikadić", "Duško Trifunović", "Dževad Karahasan", "Faruk Šehić",
    "Hamza Humo", "Irfan Horozović", "Izet Sarajlić", "Nasiha Kapidžić-Hadžić", "Nedžad Ibrišimović", "Svetozar Ćorović",
    "Velibor Čolić", "Zija Dizdarević", "Zlata Filipović", "Đorđo Sladoje", "Umihana Čuvidina", "Hadžem Hajdarević",
    "Midhat Ajanović", "Selim Arnaut", "Nihad Hasanović", "Sadudin Musabegović", "Nura Bazdulj-Hubijar", "Aleksandar Hemon",
  ],
  // rođeni u BiH (uputa "Nije rođen u BiH"): Prelog, Rimac, Primorac…
  "strani-znanstvenik": [
    "Vladimir Prelog", "Mate Rimac", "Dragan Primorac", "Zlata Bartl", "Asim Kurjak", "Drago Prgomet", "Asaf Duraković",
    "Darko Tipurić", "Božo Skoko", "Marko Dragić", "Osman Muftić", "Mladen Bušić", "Ana Marušić", "Zijad Duraković",
    "Jure Burić", "Ružica Ćavar", "Željko Ivezić", "Stipe Kutleša", "Radmila Matejčić", "Drago Perović",
    "Tatjana Jukić Gregurić", "Dražen Pehar", "Anica Nazor", "Marko Vego", "Luka Marjanović", "Pavao Anđelić",
    "Dragutin Dumančić", "Mustafa Ćatović", "Nedjeljko Nedić", "Alojz Benac", "Boris Havel", "Juraj Njavro", "Mirjana Kasapović",
    "Zdenko Kordić", "Vedran Deletis", "Hadži-Jusuf Livnjak", "Dražan Kozak", "Hrvoje Babić", "Filip Ćorlukić", "Ivica Picek",
    "Mihovil Sučić", "Zvonimir Jakobović", "Fran Kušan", "Drago Ikić", "Zrinka Šimić-Kanaet", "Daniel Rukavina", "Stanko Krnjić",
    "Snježana Vasilj", "Mijo Bobetić", "Smiljan Gluščević", "Slavko Matić", "Milojko Ćišić", "Vladimir Naglić",
    "Ibrahim Aganović", "Miroslav Gojo", "Tado Jurić", "Stjepan Krasić", "Esad Ćimić", "Marcel Kornfeld", "Tvrtko Dujmušić",
    "Stanko Dujmušić", "Jozo Budak", "Ladislav Vlašić", "Ivan Crnolatac", "Bogdan Babić", "Eugen Topolnik", "Zdenko Žeravica",
    "Ivić Pašalić", "Predrag Finci", "Jure Zovko", "Sead Alić", "Senadin Duraković", "Vlasta Jakovlić", "Mihovil Mandić",
    "Jure Krišto", "Frano Čale", "Ivan Focht", "Filip Lastrić", "Mato Džaja", "Mladen Ančić", "Vinko Brešić", "Ivan Alilović",
    "Bazilije Pandžić", "Stjepan Antoljak", "Tina Laco", "Enver Ljubović", "Vladimir Bayer", "Krešimir Mićanović",
    "Natko Katičić", "Tvrtko Čubelić", "Pavo Živković", "Srećko Šimić", "Križo Katinić", "Milan Mihaljević", "Dejan Kružić",
    "Ivan Bradvica", "Boris Ćorić", "Stanko Vujica", "Slavko Pavešić", "Luka Vukojević", "Vjenceslav Topalović",
    "Iva Nazalević Čučević", "Seid Mustafa Traljić", "Nikola Ivanišin", "Ljubica Tomić Kovač", "Anđelko Zelenika",
    "Niko Majdandžić", "Radoslav Dodig", "Slobodan Kuvalja", "Petar Bakula", "Ljerka Ostojić", "Mirko Zelić", "Ljubo Jurčić",
    "Davor Marijan", "Đuro Basler", "Branko Galeb", "Davor Perinović", "Ante Škegro", "Velimir Bugarin", "Pavao Knezović",
  ],
  // bosanskohercegovački ili "iz BiH" po članku; hrvatski reprezentativci rođeni u BiH (Bogdanović, Zubac) ostaju
  "kosarkas-svijet": [
    "Andrija Stipanović", "Vedran Princ", "Darko Bajo", "Mato Perajica", "Mladen Drijenčić", "Zvonimir Buntić", "Kornelija Kvesić",
    // iz BiH, dodani u pitanju "izvan Hrvatske" (2026-10-29)
    "Edin Bavčić", "Elmedin Kikanović", "Mujo Tuljković", "Nihad Đedović", "Sabahudin Bilalović", "Seid Hajrić",
    "Ratko Radovanović", "Džanan Musa",
    // iz BiH, dodani u pitanju "Hrvatski košarkaš" (2026-10-29)
    "Boris Barać", "Pero Dujmović", "Arnel Dedić", "Marko Baković", "Zvonimir Ivišić",
  ],
  // igrali i za BiH ili su po članku bosanskohercegovački; Lovren, Ćorluka i Budimir ostaju (igrali za Hrvatsku)
  nogometas: [
    "Ivan Šunjić", "Mato Jajalo", "Sejad Halilović", "Nikola Katić", "Josip Bulat",
    // iz BiH, dodani u pitanju "izvan Hrvatske" (2026-10-29)
    "Adi Adilović", "Admir Adžem", "Admir Vladavić", "Adnan Gušo", "Almir Aganspahić", "Amar Dedić", "Anel Ahmedhodžić",
    "Bakir Beširević", "Damir Vrabac", "Dinko Vrabac", "Damir Vrančić", "Dženan Hošić", "Elvir Rahimić", "Ermin Zec",
    "Esmir Bajraktarević", "Haris Alihodžić", "Haris Hajradinović", "Ibrahim Zukanović", "Ivica Grlić", "Ivica Osim",
    "Kemal Alispahić", "Kerim Alajbegović", "Mersudin Ahmetović", "Muhamed Konjić", "Nail Omerović", "Nedim Halilović",
    "Sejad Salihović", "Sulejman Smajić", "Ševko Okić", "Tomislav Piplica", "Toni Šunjić", "Zajko Zeba", "Zijad Švrakić",
    "Zlatan Bajramović", "Zvjezdan Misimović", "Želimir Terkeš", "Franjo Vladić", "Darko Maletić", "Mladen Žižović",
    "Nemanja Bilbija", "Nemanja Supić", "Saša Papac",
  ],
  // bosanskohercegovački pjevači i oni "iz BiH" (Bebek, Mate Bulić, Feminnem, Neda Ukraden)
  "exyu-izvodjac": [
    "Željko Bebek", "Mate Bulić", "Zrinko Tutić", "Zele Lipovača", "Senna M", "Pamela Ramljak", "Jozo Kristić", "Mario Zovko",
    "Ljiljana Molnar-Talajić", "Zoran Begić", "Vinko Ćemeraš", "Marko Bošnjak", "Ivana Marić", "Neda Ukraden",
    // iz BiH, dodani u pitanju "iz susjedstva" (2026-10-29)
    "Admir Kulović", "Zlatan Fazlić-Fazla", "Marija Šestić", "Donna Ares", "DJ Krmak", "Sanela Sijerčić",
    "Ismet Alajbegović Šerbo", "Rešad Bešlagić", "Sabahudin Kurt", "Jasmin Bašić", "Dražen Ričl", "Zdravko Čurić", "Al' Dino",
    "Seid Memić Vajta", "Arif Ahmetašević", "Muhamed Mujkanović", "Bahrija Nuri Hadžić", "Esad Plavi", "Jasmin Muharemović",
    "Amir Kazić Leo", "Muhamed Fazlagić-Fazla", "Alma Čardžić", "Dada Mešaljić", "Fadil Toskić", "Vinko Brnada", "Ado Gegaj",
    "Madita", "Adnan Nezirov", "Nermin Puškar", "Cunami Flo", "Adi Lukovac", "Zora Dubljević", "Faris Pinjo", "Adi Šoše",
    "Davor Sučić", "Siledžije", "Macao Band", "Nervozni poštar", "Maja Milinković", "Ćana", "Marin Gradac",
    "Ljubiša Racić", "Zlatko Arslanagić", "Fazlija", "Nihad Kantić – Šike", "Eldin Huseinbegović", "Dzeny", "Zuzi Zu", "Rialda",
    "Dalal Midhat-Talakić", "Osman Hadžić", "Nino Rešić", "Šeki Bihorac", "Adnan Babajić", "Slađa Guduraš", "Elvira Rahić",
    "Selma Muhedinović", "Enes Begović", "Nihad Alibegović", "Refik Kolić", "Amar Jašarspahić", "Semir Cerić Koke",
    "Disciplinska komisija", "DZihan & Kamien", "Bezbeli Apstraklije", "Zona Isključenja", "Nemoguće Vruće",
  ],
  // jela koja su i bosanska (sarma, grah, japrak, pite, sudžuk, lepinja)
  "svjetsko-jelo": [
    "Sarma", "Punjene paprike", "Grah", "Japrak", "Ćufte", "Krumpiruša", "Pita od sira", "Pita od zelja", "Sudžuk", "Lepinja",
    "Uštipci", "Ražnjići", "Đuveč", "Čorbast grah", "Grah s kobasicom",
  ],
};
