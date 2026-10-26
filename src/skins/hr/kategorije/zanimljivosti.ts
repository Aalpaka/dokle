// Zanimljivosti uz helikopter odgovore: igrač ih vidi nakon runde u kojoj je pogodio taj odgovor i u popisu svih odgovora.
// Ključ je slug kategorije pa kanonski naziv odgovora. Seed ih upisuje samo gdje ih još nema (admin ih može mijenjati).
const stp = "Druga najmanja afrička država, nakon Sejšela. Ekvator prolazi preko otočića Rolas na jugu otoka São Tomé.";

export const zanimljivosti: Record<string, Record<string, string>> = {
  // Zastave
  "zastava-zvijezda": {
    "Sveti Toma i Princip": "Dvije crne zvijezde na žutoj pruzi predstavljaju dva glavna otoka, São Tomé i Príncipe.",
    "Grenada": "Grenada ima čak sedam zvijezda, za svih sedam upravnih jedinica, a uz jarbol je nacrtan muškatni oraščić, najpoznatiji proizvod otoka.",
  },
  "zastava-crvena": {
    "Sveti Toma i Princip": "Crveni trokut uz jarbol podsjeća na krv prolivenu u borbi za neovisnost od Portugala.",
    "Komori": "Zastava ima četiri vodoravne pruge, po jednu za svaki otok. Crvena je otok Anjouan.",
  },
  "zastava-crna": {
    "Sveti Toma i Princip": "Crne su samo dvije zvijezde na žutoj pruzi, po jedna za otoke São Tomé i Príncipe.",
  },
  "zastava-zelena": {
    "Komori": "Zeleni trokut uz jarbol s bijelim polumjesecom znak je islama, a četiri zvijezde su četiri otoka.",
    "Ekvatorska Gvineja": "Gornja pruga je zelena i predstavlja prašume i prirodno bogatstvo. U sredini je grb sa stablom ceibe.",
  },
  "zastava-plava": {
    "Esvatini": "Plave pruge na vrhu i dnu zastave znače mir. U sredini je ratnički štit naroda Svazi s dva koplja.",
    "Ekvatorska Gvineja": "Plavi trokut uz jarbol predstavlja more koje spaja kopneni dio države s otokom Bioko, gdje je glavni grad.",
  },
  "zastava-zuta": {
    "Eritreja": "Žuta je samo maslinova grančica s vijencem u crvenom trokutu, preuzeta sa stare svijetloplave zastave iz 1950-ih.",
    "Esvatini": "Tanke žute pruge odvajaju plava polja od crvenog i predstavljaju rudna bogatstva zemlje.",
  },
  "zastava-bijela": {
    "Burundi": "Bijeli kosi križ dijeli zastavu na četiri polja, a u bijelom krugu su tri zvijezde za tri naroda: Hutu, Tutsi i Twa.",
    "Ekvatorska Gvineja": "Srednja pruga je bijela i znači mir. Na grbu je šest zvijezda, za kopno i pet otoka.",
  },
  "zastava-pruge": {
    "Bocvana": "Svjetloplava, crna i svjetloplava; tanke bijele crte između se ne broje. Plava je kiša, a 'pula' (kiša) je i ime valute.",
    "Lesoto": "Plava, bijela i zelena pruga, a na bijeloj je crni mokorotlo, tradicionalni basotski šešir od slame.",
  },
  "zastava-sunce-mjesec": {
    "Antigva i Barbuda": "Zlatno sunce izlazi iznad plavog mora i bijelog pijeska i znači početak nove ere s neovisnošću 1981.",
  },
  "zastava-kriz": {
    "Moldavija": "Križ je skriven u grbu: orao u kljunu drži zlatni pravoslavni križ.",
    "Brazil": "Na plavom nebu je zviježđe Južni križ, kakvo je bilo iznad Rio de Janeira ujutro 15. studenog 1889., na dan proglašenja republike.",
    "Slovačka": "Križ je u grbu: bijeli dvostruki križ na tri plava brda, koja predstavljaju Tatre, Matru i Fatru.",
    "Srbija": "Križ je u grbu, na štitu na prsima dvoglavog orla, s četiri ocila oko njega.",
    "Jamajka": "Žuti kosi križ dijeli zastavu na četiri trokuta. Jamajka je jedina zastava na svijetu bez crvene, bijele i plave boje.",
    "Malta": "U gornjem kutu je Jurjev križ, britansko odlikovanje koje je cijeli otok dobio 1942. za hrabrost u ratu.",
    "Dominika": "Križ od žute, crne i bijele pruge predstavlja Sveto Trojstvo, a u sredini je papiga sisserou.",
  },
  "zastava-zivotinja": {
    "Paragvaj": "Paragvajska zastava nije ista s obje strane: sprijeda je državni grb, a straga pečat riznice s lavom koji čuva kapu slobode.",
    "Hrvatska": "U kruni grba su i životinje: tri glave leoparda na dalmatinskom grbu i kuna na slavonskom.",
    "Butan": "Na zastavi je bijeli zmaj Druk, a sam Butan na svom jeziku zove se Druk Yul, zemlja grmljavinskog zmaja.",
    "Uganda": "Na zastavi je sivi krunasti ždral, nacionalna ptica, koji stoji na jednoj nozi kao znak da zemlja ide naprijed.",
    "Dominika": "U sredini je papiga sisserou, koja živi samo na Dominici.",
    "Kiribati": "Iznad sunca leti ptica fregata, znak snage i slobode na moru.",
    "Andora": "U grbu su dvije krave, preuzete iz grba francuske pokrajine Béarn.",
    "Gvatemala": "Na zastavi je kvecal, ptica po kojoj se zove i gvatemalska valuta.",
    "Meksiko": "Orao na kaktusu jede zmiju, prema legendi o znaku po kojem su Asteci trebali osnovati Tenochtitlan.",
  },
  "zastava-dvije-boje": {
    "Palau": "Samo plava i žuta: žuti krug je pun mjesec, malo pomaknut prema jarbolu.",
    "Kazahstan": "Samo svjetloplava i zlatna, ali na njoj su sunce, stepski orao i ukrasni uzorak uz jarbol, sve u zlatnoj.",
  },

  // Države
  "afrika": { "Sveti Toma i Princip": stp },
  "drzava-s": { "Sveti Toma i Princip": stp },
  "romanski-jezik-drzava": { "Sveti Toma i Princip": "Službeni jezik je portugalski, a Sveti Toma i Princip druga je najmanja država u Africi, nakon Sejšela." },
  "azija": { "Brunej": "Sultan Bruneja ima jednu od najvećih zbirki automobila na svijetu i palaču s više od 1 700 soba." },
  "amerika": { "Sveti Vincent i Grenadini": "Na ovim otocima snimani su dijelovi filmova Pirati s Kariba." },
  "europska-drzava": { "Kazahstan": "Mali dio Kazahstana, zapadno od rijeke Ural, nalazi se u Europi, pa Kazahstan igra i u europskom nogometu." },
  "drzava-samoglasnik": { "Esvatini": "Do 2018. zvao se Svazi, a kralj je promijenio ime za 50. obljetnicu neovisnosti." },
  "bez-mora": { "Esvatini": "Esvatini je jedna od posljednjih apsolutnih monarhija na svijetu." },
  "drzava-b-m": { "Marshallovi Otoci": "Na atolu Bikini SAD je od 1946. do 1958. testirao nuklearne bombe, a po njemu je ime dobio i bikini." },
  "eu": { "Latvija": "Riga je najveći grad baltičkih država, poznat po zgradama u stilu secesije." },
  "nato": { "Estonija": "Estonija nema svoje borbene avione, pa njezino nebo čuvaju saveznički avioni iz NATO-a." },
  "monarhija": { "Sveti Kristofor i Nevis": "Kralj države je britanski kralj Charles III." },
  "commonwealth": { "Nauru": "Nauru je najmanja republika na svijetu, s otprilike 21 km², a obogatio se iskapanjem fosfata." },
  "lijeva-strana": { "Nauru": "Nauru službeno nema glavni grad, a cijeli otok može se obići autom za pola sata." },
  "granica-kina-rusija": { "Butan": "Butan uz BDP mjeri i 'bruto nacionalnu sreću' svojih građana." },
  "domacin-prvenstva": { "Paragvaj": "Paragvaj je jedan od suorganizatora Svjetskog prvenstva 2030., uz jednu utakmicu za stotu obljetnicu prvog prvenstva." },
  "neovisnost-1945": { "Palau": "Palau je postao neovisan tek 1994. i jedna je od posljednjih država koje su ušle u UN." },
  "glavni": { "Vaduz": "Vaduz ima tek oko 5 i pol tisuća stanovnika, a Lihtenštajn nema vlastitu zračnu luku." },
  "glavni-svijet": {
    "Ngerulmud": "Glavni grad Palaua ima tek nekoliko stotina stanovnika i najmanji je glavni grad na svijetu po broju stanovnika.",
    "Funafuti": "Pista zračne luke na Funafutiju služi i kao igralište i mjesto za druženje kad nema letova.",
  },
  "sad-drzava": { "Delaware": "Delaware je prvi ratificirao Ustav SAD-a 1787., pa ga zovu 'Prva država'." },
  "sad-glavni": { "Pierre": "Glavni grad Južne Dakote ima tek oko 14 tisuća stanovnika." },
  "valuta": {
    "Ngultrum": "Butanska valuta vezana je uz indijsku rupiju u omjeru 1:1.",
    "Pula": "Valuta Bocvane. Na jeziku setsvana 'pula' znači kiša, koja je u zemlji uz Kalahari dragocjena.",
  },

  // Hrvatska
  "otok": { "Galiola": "Sićušan otočić sa svjetionikom na ulazu u Kvarner, između rta Kamenjak i Unija." },
  "rijeka": { "Kamačnik": "Kamačnik kod Vrbovskog dug je samo oko 3 km, a teče kroz zaštićeni kanjon." },
  "jelo": {
    "Žgvacet": "Ime dolazi od talijanskog sguazzetto. To je primorski gulaš od piletine, teletine ili divljači, najčešće uz njoke ili fuže.",
    "Zelena menestra": "Jedno od najstarijih dubrovačkih jela, kuha se od raštike, kupusa i suhog mesa.",
  },
  "glazba": {
    "Dubrovački trubaduri": "Predstavljali su Jugoslaviju na Euroviziji 1968. s pjesmom 'Jedan dan', u srednjovjekovnim kostimima.",
    "Drago Mlinarec": "Bio je pjevač Grupe 220, jednog od prvih hrvatskih rock bendova, a zatim je snimao kantautorske albume.",
  },
  "zivotinja": {
    "Rovka": "Rovka izgleda kao miš, ali nije glodavac: srodnik je ježa i krtice.",
    "Čagalj": "Zlatni šakal se zadnjih desetljeća jako proširio Hrvatskom, a čuje se po noćnom zavijanju.",
  },
  "instrument": {
    "Šargija": "Dugovrati žičani instrument srodan tamburi, najpoznatiji iz Bosne.",
    "Teremin": "Teremin se svira bez dodira: glazbenik pomiče ruke u zraku između dviju antena.",
  },
  "frizider": { "Inzulin": "Neotvoreni inzulin čuva se u hladnjaku na 2 do 8 °C, a smrzavanje ga uništava." },
  "dijalekt": {
    "Gušterna": "Dalmatinska riječ za cisternu za kišnicu, od talijanskog cisterna.",
    "Popevka": "Kajkavski izraz za pjesmu, poznat po Festivalu kajkavskih popevki u Krapini.",
  },
  "grad-kopno": {
    "Klanjec": "Jedan od najmanjih hrvatskih gradova i rodno mjesto kipara Antuna Augustinčića, koji tu ima galeriju.",
    "Hrvatska Kostajnica": "Leži na Uni, na samoj granici, a preko rijeke je Bosanska Kostajnica.",
  },
  "grad-hr": { "Klanjec": "Jedan od najmanjih hrvatskih gradova i rodno mjesto kipara Antuna Augustinčića, koji tu ima galeriju." },
  "planina": { "Strahinjčica": "Gora u Hrvatskom zagorju koja se diže iznad Krapine." },
  "park": {
    "Krapje Đol": "Prvi ornitološki rezervat u Hrvatskoj, zaštićen 1963. zbog kolonije žličarki u Lonjskom polju.",
    "Hušnjakovo": "Brdo u Krapini gdje je Dragutin Gorjanović-Kramberger 1899. pronašao ostatke krapinskog pračovjeka.",
  },
  "sportas": {
    "Matija Ljubek": "Kanuist, olimpijski pobjednik u Montrealu 1976. u kanadskom jednosjedu na 1000 metara.",
    "Đurđica Bjedov": "Plivačica, olimpijska pobjednica na 100 m prsno na Igrama u Meksiku 1968.",
  },
  "serija": { "Rondo": "Film Zvonimira Berkovića iz 1966. o ljubavnom trokutu koji se odvija uz nedjeljne partije šaha." },
  "pisac": {
    "Faust Vrančić": "Poznatiji je kao izumitelj: opisao je padobran (Homo volans) i napisao rječnik pet europskih jezika.",
    "Ivan Kozarac": "Slavonac iz Vinkovaca, autor romana 'Đuka Begović'. Umro je mlad, 1910.",
  },
  "kolac": {
    "Lumblija": "Korčulanski kolač s grožđicama, orasima i začinima koji se tradicionalno peče za Dušni dan.",
    "Kotonjata": "Dalmatinski slatki kolač od kuhanih dunja, koje se u Dalmaciji zovu kotonje.",
  },
  "pice": {
    "Bermet": "Aromatizirano desertno vino iz Sremskih Karlovaca za koje se priča da se služilo i na Titaniku.",
    "Pisco": "Rakija od grožđa oko koje se Peru i Čile već stoljećima spore tko ju je izmislio.",
  },
  "zupanija": { "Liburnija": "Ime je dobila po ilirskom plemenu Liburna, a danas se tako zove opatijsko primorje." },
  "utvrda": { "Tržan": "Stari grad Frankopana iznad Modruša, nekad središte Modruške knežije." },
  "eurovizija": { "75 Cents": "Nastupio je 2008. s pjesmom 'Romanca'. Ladislav Demeterffy imao je tada 75 godina i bio najstariji izvođač u povijesti Eurovizije." },
  "musko-ime": {
    "Kvirin": "Sveti Kvirin bio je biskup Siscije, današnjeg Siska, pogubljen 309. godine. Zaštitnik je Siska.",
    "Bartul": "Dalmatinski oblik imena Bartol, od Bartolomej.",
  },
  "politicar": {
    "Josip Šokčević": "Bio je hrvatski ban od 1860. do 1867.",
    "Ladislav Pejačević": "Hrvatski ban od 1880. do 1883., iz plemićke obitelji koja je sagradila dvorac u Našicama.",
  },
  "prezime": {
    "Kukuljević": "Ivan Kukuljević Sakcinski 1843. prvi je održao govor na hrvatskom jeziku u Saboru.",
    "Pupačić": "Josip Pupačić, pjesnik iz okolice Omiša, autor pjesme 'More'.",
  },
  "tv-lice": { "Milan Sijerković": "Legendarni meteorolog koji je desetljećima objašnjavao vremensku prognozu na televiziji." },
  "tv-emisija": { "Latinica": "Debatna emisija Denisa Latina, godinama jedna od najgledanijih na HRT-u." },
  "znamenitost": {
    "Glagoljska aleja": "Niz od 11 spomenika glagoljici uz cestu između Roča i Huma u Istri.",
    "Vodnjanske mumije": "U crkvi sv. Blaža u Vodnjanu čuvaju se neraspadnuta tijela svetaca, a nitko ih nije balzamirao.",
  },
  "festival": { "Trka na prstenac": "Viteška igra u Barbanu, srodna Sinjskoj alci, održava se od 1696." },
  "medij": {
    "Arkzin": "Antiratni fanzin i časopis iz 1990-ih, koji je izdavala Antiratna kampanja Hrvatske.",
    "Kerempuh": "Satirički list nazvan po Petrici Kerempuhu, liku iz pučke predaje kojeg je proslavio Krleža.",
  },
  "spilja-slap": {
    "Patkov gušt": "Jama na Velebitu s okomitim skokom od 553 metra, jednom od najdubljih vertikala na svijetu.",
    "Šandalja": "U špilji Šandalja kod Pule nađeni su tragovi ljudi iz starijeg kamenog doba.",
  },
  "obicaj": {
    "Polaženik": "Prvi gost koji na Božić uđe u kuću; vjeruje se da donosi sreću ili nesreću za cijelu godinu.",
    "Zeleni Juraj": "Proljetni običaj na Jurjevo, kad se mladić obavije zelenim granama i s pjesmom obilazi selo.",
  },
  "knjizevno-djelo": {
    "Cvit razgovora": "Djelo fra Filipa Grabovca iz 1747. zbog kojeg su ga Mlečani zatvorili, a u zatvoru je i umro.",
    "Vila Slovinka": "Spjev Juraja Barakovića iz 1614., velikim dijelom posvećen Zadru.",
  },
  "unesco-hr": { "Paklenica": "Na UNESCO-ovu popisu je zbog bukovih prašuma, kao dio europskih starih bukovih šuma." },
  "predsjednik-hr": { "Nedjeljko Mihanović": "Bio je predsjednik Hrvatskog sabora sredinom 1990-ih." },
  "hr-vladar": {
    "Svetoslav Suronja": "Hrvatski kralj s kraja 10. stoljeća, svrgnut u sukobu s braćom Krešimirom i Gojslavom.",
    "Ivan Paližna": "Vranski prior koji je s braćom Horvat 1386. zarobio kraljice Mariju i Elizabetu.",
  },
  "hr-olimpijac": {
    "Vlado Lisjak": "Hrvač, olimpijski pobjednik u grčko-rimskom stilu u Los Angelesu 1984.",
    "Franjo Mihalić": "Maratonac, osvojio je srebro na Olimpijskim igrama u Melbourneu 1956.",
  },
  "bajka": {
    "Jaglenac": "Bratac Jaglenac lik je iz 'Priča iz davnine' Ivane Brlić-Mažuranić, uz sestricu Rutvicu.",
    "Jagor": "Jagor je dječak iz istoimene priče iz 'Priča iz davnine' Ivane Brlić-Mažuranić.",
  },
  "brend-odjece": { "Varteks": "Varaždinska tekstilna tvrtka po kojoj se godinama zvao i nogometni klub iz Varaždina." },
  "turcizam": {
    "Kuluk": "Besplatni prisilni rad za državu ili gospodara.",
    "Aršin": "Stara mjera za duljinu od oko 70 cm, otuda izraz 'mjeriti svojim aršinom'.",
  },
  "germanizam": {
    "Štemajzl": "Od njemačkog Stemmeisen, dlijeto.",
    "Cvancika": "Kovanica od 20 krajcara, od njemačkog Zwanziger.",
  },
  "filozof": { "Pavao Skalić": "Zagrepčanin koji je 1559. prvi upotrijebio riječ 'enciklopedija' u naslovu knjige." },
  "dinastija": { "Kurjakovići": "Krbavski knezovi; Ivan Karlović iz ove obitelji bio je hrvatski ban." },
  "anticki-grad": { "Varvaria": "Antički grad na Bribirskoj glavici kod Skradina, kasnije sjedište knezova Šubića Bribirskih." },
  "dinosaur": { "Histriasaurus": "Dinosaur pronađen u moru kod Bala u Istri, nazvan po Istri." },
  "knjizevni-lik": {
    "Melkior Tresić": "Glavni lik Marinkovićeva romana 'Kiklop'.",
    "Phoebe Caulfield": "Holdenova mlađa sestra iz romana 'Lovac u žitu'.",
  },

  // Svijet i priroda
  "svjetska-planina": {
    "Ojos del Salado": "Najviši vulkan na svijetu, 6 893 m, na granici Čilea i Argentine.",
    "Puncak Jaya": "Najviši vrh Oceanije, 4 884 m, na Novoj Gvineji, s ledenjacima blizu ekvatora.",
  },
  "svjetska-rijeka": {
    "Okavango": "Okavango ne utječe u more nego nestaje u delti usred pustinje Kalahari.",
    "Salween": "Izvire na Tibetu i teče kroz Kinu i Mjanmar do Andamanskog mora.",
  },
  "pas": {
    "Posavski gonič": "Hrvatska autohtona pasmina, uz dalmatinera, istarske goniče i tornjaka.",
    "Basenji": "Afrički pas koji ne laje, nego ispušta zvuk nalik jodlanju.",
  },
  "ptica": {
    "Pupavac": "Ima perjanicu na glavi, a gnijezdo mu jako smrdi kako bi otjerao grabežljivce.",
    "Vodomar": "Oblik njegova kljuna, kojim bez prskanja ulazi u vodu, inspirirao je nos japanskog brzog vlaka Shinkansen.",
  },
  "kukac": {
    "Rilaš": "Rilaši su jedna od najvećih porodica životinja na svijetu, s desecima tisuća vrsta.",
    "Vodencvijet": "Odrasli vodencvjetovi žive samo dan ili dva i nemaju usta kojima bi jeli.",
  },
  "africka-zivotinja": {
    "Adaks": "Pustinjska antilopa sa spiralnim rogovima, kritično ugrožena; u divljini ih je ostalo jako malo.",
    "Dikdik": "Jedna od najmanjih antilopa, visoka tek oko 35 cm. Ime je dobila po zvuku koji ispušta kad je u opasnosti.",
  },
  "morska-zivotinja": {
    "Morski krin": "Unatoč imenu, morski krin je životinja, srodnik zvjezdača i ježinaca.",
    "Nautilus": "'Živi fosil', srodnik hobotnica koji gore-dolje pluta podešavanjem plina u komorama ljušture.",
  },
  "cvijet": {
    "Mrazovac": "Mrazovac cvate u jesen, a listovi mu izrastu tek u proljeće. Jako je otrovan.",
    "Kaćun": "Kaćuni su divlje orhideje, a kod nas su strogo zaštićeni.",
  },
  "stablo": {
    "Molika": "Bor koji raste samo na planinama Balkana, u Sjevernoj Makedoniji, Bugarskoj, Albaniji i Crnoj Gori.",
    "Koprivić": "Ima slatke jestive bobice, a u Dalmaciji ga zovu i ladonja ili koštela.",
  },
  "zacin": { "Ljupčac": "Zovu ga i 'maggi trava' jer miriše kao jušni začin." },
  "sport": {
    "Sepak takraw": "Odbojka nogama s lopticom od pletenog ratana, popularna u jugoistočnoj Aziji.",
    "Kabaddi": "Indijski sport u kojem napadač na protivničkoj strani mora na jedan dah ponavljati 'kabaddi'.",
  },
  "strani-klub": {
    "Sheriff Tiraspol": "Klub iz Pridnjestrovlja koji je 2021. pobijedio Real Madrid na Bernabéuu u Ligi prvaka.",
    "Ludogorec": "Klub iz Razgrada, grada od tridesetak tisuća stanovnika, osvojio je više od deset bugarskih prvenstava zaredom.",
  },
  "jezik": {
    "Retoromanski": "Četvrti službeni jezik Švicarske, govori ga tek šezdesetak tisuća ljudi.",
    "Tagalog": "Na tagalogu se temelji filipinski, službeni jezik Filipina.",
  },
  "bolest": { "Borelioza": "Lajmska bolest, prenose je krpelji, a ime je dobila po gradiću Lyme u SAD-u." },
  "dio-tijela": {
    "Trtica": "Trtica je ostatak repa: nekoliko sraslih kralježaka na dnu kralježnice.",
    "Bubnjić": "Opna u uhu debela tek oko desetinke milimetra.",
  },
  "grad-njemacka": {
    "Passau": "Grad triju rijeka: tu se u Dunav ulijevaju Inn i Ilz.",
    "Görlitz": "Najistočniji grad Njemačke, toliko očuvan da se tu snimao 'Grand Budapest Hotel'.",
  },
  "grad-italija": {
    "Matera": "Poznata po Sassima, kućama uklesanim u stijenu. Bila je Europska prijestolnica kulture 2019.",
    "Urbino": "Renesansni grad i rodno mjesto slikara Rafaela.",
  },
  "grad-sad": {
    "Lubbock": "Rodni grad rock and roll pjevača Buddyja Hollyja.",
    "Tulsa": "U Tulsi se 1921. dogodio jedan od najgorih rasnih masakra u povijesti SAD-a.",
  },
  "otok-svijet": {
    "Sveta Helena": "Ovdje je Napoleon proveo zadnje progonstvo i umro 1821.",
    "Tristan da Cunha": "Najudaljeniji naseljeni otok na svijetu, s oko 250 stanovnika i bez zračne luke.",
  },
  "tenis": {
    "Thomas Muster": "Austrijanac koji je osvojio Roland Garros 1995. i kratko bio prvi na svijetu.",
    "Gustavo Kuerten": "Guga je tri puta osvojio Roland Garros, a 2001. je nacrtao veliko srce na zemljanom terenu.",
  },
  "nogometas": {
    "Jari Litmanen": "Finac koji je s Ajaxom osvojio Ligu prvaka 1995.",
    "Hidetoshi Nakata": "Japanac koji je igrao za Perugiju i Romu, a karijeru je završio sa samo 29 godina.",
  },
  "gmaz": {
    "Cecilija": "Beznogi vodozemac koji izgleda kao glista ili zmija.",
    "Aksolotl": "Meksički daždevnjak koji cijeli život ostaje u obliku ličinke i može obnoviti izgubljene udove.",
  },
  "dragi-kamen": {
    "Rutenij": "Element nazvan po Rusiji, na latinskom Ruthenia.",
    "Kunzit": "Ružičasti mineral nazvan po gemologu Georgeu Kunzu iz Tiffanyja.",
  },
  "gljiva": {
    "Smrdljivi stršak": "Smrdi na strvinu kako bi privukao muhe koje mu raznose spore.",
    "Jetrenjača": "Raste na hrastu i izgleda kao komad sirovog mesa, a čak i 'krvari' crvenim sokom.",
  },
  "srbija-cg": { "Virpazar": "Mjesto na Skadarskom jezeru, polazište za izlete brodom po jezeru." },
  "slovenija": {
    "Kostanjevica na Krki": "Najmanji slovenski grad, smješten na otočiću na rijeci Krki.",
    "Žiri": "Gradić poznat po izradi cipela, ovdje je tvornica Alpina.",
  },
  "grad-francuska": {
    "Épernay": "Prijestolnica šampanjca, ispod grada su kilometri podruma, među njima i Moët & Chandona.",
    "Albi": "Rodni grad slikara Toulouse-Lautreca, koji tu ima muzej.",
  },
  "grad-spanjolska": {
    "Teruel": "Poznat po legendi o ljubavnicima iz Teruela i po pokretu 'Teruel existe' (Teruel postoji).",
    "Óbidos": "Portugalski srednjovjekovni gradić unutar zidina, nekad tradicionalni svadbeni dar kraljeva kraljicama.",
  },
  "grad-britanija": {
    "Kilmarnock": "U Kilmarnocku je nastao viski Johnnie Walker.",
    "Drogheda": "Grad koji je Oliver Cromwell 1649. opsjeo i krvavo osvojio.",
  },
  "grad-srednja-europa": { "Hollókő": "Mađarsko selo pod zaštitom UNESCO-a; ime znači 'gavranov kamen'." },
  "grad-skandinavija": { "Klaksvík": "Drugi najveći grad Farskih otoka." },
  "grad-kanada-australija": { "Port Hedland": "Iz ove australske luke izvozi se najviše željezne rude na svijetu." },
  "svjetsko-jelo": {
    "Laksa": "Ljuta juha s rezancima i kokosovim mlijekom iz Malezije i Singapura.",
    "Gumbo": "Gusta juha iz Louisiane, a ime joj dolazi od afričke riječi za bamiju.",
  },
  "sir": {
    "Mimolette": "Francuski narančasti sir na čijoj kori namjerno žive sitne grinje koje mu daju okus.",
    "Danablu": "Danski plavi sir, napravljen početkom 20. stoljeća kao zamjena za Roquefort.",
  },
  "ples": {
    "Šotiš": "Ime dolazi od njemačkog schottisch, 'škotski', iako je ples srednjoeuropski.",
    "Dabke": "Arapski narodni ples u liniji s udaranjem nogom o pod, popularan u Libanonu i Palestini.",
  },
  "svjetska-znamenitost": {
    "Shwedagon": "Zlatna pagoda u Yangonu, prekrivena zlatnim pločama, s tisućama dijamanata na vrhu.",
    "Kinkaku-ji": "Zlatni paviljon u Kyotu, prekriven zlatnim listićima. Zapalio ga je redovnik 1950., pa je obnovljen.",
  },
  "more-ocean": {
    "Vela vrata": "Prolaz između Istre i Cresa kojim se ulazi u Riječki zaljev.",
    "Tarantski zaljev": "Zaljev između 'pete' i 'prstiju' talijanske čizme.",
  },
  "jezero-svijet": {
    "Vlasinsko jezero": "Umjetno jezero u Srbiji poznato po plutajućim tresetnim otocima.",
    "Mälaren": "Treće najveće jezero Švedske, a na njegovu ušću u more leži Stockholm.",
  },
  "vulkan": {
    "Laacher See": "Jezero u Njemačkoj u krateru vulkana koji je snažno eruptirao prije oko 13 000 godina.",
    "Nisiros": "Grčki otok koji je zapravo vulkan, s kraterom u koji se može sići.",
  },
  "planinski-lanac": { "Verhojansko gorje": "Uz njega je Verhojansk, jedno od najhladnijih naseljenih mjesta na svijetu." },
  "nepostojeca-drzava": {
    "Urartu": "Kraljevstvo oko jezera Van, a ime mu se sačuvalo u imenu planine Ararat.",
    "Songaj": "Afričko carstvo sa središtem u Gaou i Timbuktuu, jedno od najvećih u povijesti Afrike.",
  },
  "bitka": {
    "Jarmuk": "Arapi su 636. pobijedili Bizant i preuzeli Siriju.",
    "Rocroi": "Francuzi su 1643. pobijedili dotad gotovo nepobjedivu španjolsku pješadiju.",
  },
  "svemir": {
    "Haumea": "Patuljasti planet u obliku jajeta koji se okrene oko sebe za manje od četiri sata.",
    "Gonggong": "Patuljasti planet nazvan po kineskom bogu vode.",
  },
  "element": {
    "Oganeson": "Najteži poznati element (118), nazvan po fizičaru Juriju Oganesjanu dok je još bio živ.",
    "Prazeodimij": "Ime znači 'zeleni blizanac' jer je odvojen od neodimija.",
  },
  "zvijezda": { "Alkor": "Mala zvijezda uz Mizar u Velikom medvjedu; nekad se po njoj provjeravao vid." },
  "astronaut": {
    "Lunohod": "Prvi daljinski upravljani rover na drugom nebeskom tijelu, na Mjesecu 1970.",
    "Vanguard": "Vanguard 1 iz 1958. najstariji je umjetni satelit koji je još u orbiti.",
  },
  "horoskop": { "Zmijonosac": "Sunce prolazi i kroz zviježđe Zmijonosca, ali ono nije u klasičnom zodijaku." },
  "grcko-slovo": { "Digama": "Izumrlo grčko slovo iz kojeg je nastalo latinsko F." },
  "geometrija": { "Reuleauxov trokut": "Lik stalne širine koji se kotrlja poput kruga; po njemu su napravljena svrdla za kvadratne rupe." },
  "mjerna-jedinica": {
    "Erg": "Stara jedinica za energiju: deset milijuna erga čini jedan džul.",
    "Hvat": "Stara mjera od oko 1,9 m, otprilike raspon ruku.",
  },
  "kost": {
    "Raonik": "Kost u nosu koja dijeli nosnu šupljinu, nazvana po raoniku pluga.",
    "Šavna kost": "Male dodatne kosti u šavovima lubanje, koje nema svaki čovjek.",
  },
  "misic": { "Mišić podizač dlake": "Zbog njega se ježimo i dobivamo 'guščju kožu'." },
  "kemijski-spoj": {
    "Litijev karbonat": "Koristi se kao lijek za bipolarni poremećaj.",
    "Hidroksiapatit": "Glavni mineral kostiju i zubne cakline.",
  },
  "lijek": { "Naloksan": "Protuotrov koji u nekoliko minuta poništava predoziranje opioidima." },
  "religija": { "Molokani": "Ruska vjerska zajednica koja je ime dobila jer su pili mlijeko (moloko) za vrijeme posta." },
  "blagdan": { "Prešernov dan": "Slovenski dan kulture, 8. veljače, na godišnjicu smrti pjesnika Franca Prešerna." },
  "fobija": {
    "Arktofobija": "Strah od medvjeda.",
    "Pnigofobija": "Strah od gušenja.",
  },
  "logija": { "Ampelologija": "Znanost o vinovoj lozi." },
  "izam": { "Bruksizam": "Škrgutanje zubima, najčešće u snu." },
  "umjetnicki-stil": { "Kloazonizam": "Stil s debelim tamnim obrisima, nazvan po tehnici emajla cloisonné; koristio ga je Gauguin." },

  // Ljudi
  "politicar-svijet": {
    "Kwame Nkrumah": "Prvi predsjednik Gane, koja je 1957. prva od podsaharskih kolonija dobila neovisnost.",
    "Thomas Sankara": "Predsjednik koji je Gornju Voltu preimenovao u Burkina Faso, 'zemlju poštenih ljudi'.",
  },
  "strani-pisac": {
    "Srećko Kosovel": "Slovenski pjesnik s Krasa, umro je sa samo 22 godine.",
    "Skender Kulenović": "Autor poeme 'Stojanka majka Knežopoljka'.",
  },
  "strani-znanstvenik": {
    "Josef Ressel": "Izumitelj brodskog vijka koji je radio kao šumar u Istri, a vijak je isprobao u Trstu.",
    "Eratosten": "Izračunao je opseg Zemlje mjereći sjene u dva egipatska grada.",
  },
  "kosarkas-svijet": {
    "Moses Malone": "Bio je prvi koji je 1974. iz srednje škole otišao ravno u profesionalnu košarku.",
    "Rimas Kurtinaitis": "Litavac koji je sa SSSR-om osvojio olimpijsko zlato u Seulu 1988.",
  },
  "sportas-svijet": {
    "Larisa Latynina": "Sovjetska gimnastičarka s 18 olimpijskih medalja, rekord koji je držala skoro 50 godina, do Phelpsa.",
    "Edwin Moses": "Na 400 m prepone nije izgubio 122 utrke zaredom, gotovo deset godina.",
  },
  "glumac": {
    "Buster Keaton": "Zvali su ga 'Veliko kameno lice' jer se u filmovima nikad nije smijao.",
    "Gene Hackman": "Dvostruki dobitnik Oscara, za 'Francusku vezu' i 'Nepomirljive'.",
  },
  "strani-izvodjac": {
    "Kraftwerk": "Njemački pioniri elektroničke glazbe iz Düsseldorfa.",
    "Björk": "Islanđanka koja je na dodjelu Oscara 2001. došla u haljini u obliku labuda.",
  },
  "nobel": {
    "Selma Lagerlöf": "Prva žena koja je dobila Nobelovu nagradu za književnost, 1909.",
    "Hendrik Lorentz": "Njegove Lorentzove transformacije temelj su Einsteinove teorije relativnosti.",
  },
  "oscar-film": {
    "The Broadway Melody": "Prvi zvučni film koji je osvojio Oscara za najbolji film.",
    "Cavalcade": "Dobitnik Oscara za najbolji film, snimljen po drami Noëla Cowarda.",
  },
  "oscar-gluma": {
    "Emil Jannings": "Prvi dobitnik Oscara za glavnu mušku ulogu, 1929.",
    "Luise Rainer": "Prva je osvojila dva Oscara za glumu zaredom, 1937. i 1938., a doživjela je 104 godine.",
  },
  "zlatna-lopta": { "Luis Suárez Miramontes": "Zlatnu loptu osvojio je 1960. i bio jedini u Španjolskoj rođeni dobitnik sve do Rodrija 2024." },
  "f1-prvak": { "Phil Hill": "Prvi Amerikanac koji je postao prvak Formule 1, 1961. s Ferrarijem." },
  "predsjednik-sad": { "Millard Fillmore": "Posljednji predsjednik iz stranke vigovaca (Whig)." },
  "britanski-premijer": { "Lord Goderich": "Bio je premijer manje od pet mjeseci i nijednom se kao premijer nije pojavio pred Parlamentom." },
  "sahovski-prvak": { "Olga Rubcova": "Svjetska prvakinja u šahu 1956." },
  "skladatelj": {
    "Blagoje Bersa": "Autor opere 'Oganj' i jedan od najvažnijih hrvatskih skladatelja s početka 20. stoljeća.",
    "Hildegarda iz Bingena": "Srednjovjekovna opatica, skladateljica i mistikinja, proglašena crkvenom naučiteljicom 2012.",
  },
  "rimski-car": {
    "Jovijan": "Vladao je samo osam mjeseci; umro je, kaže se, od isparenja žeravice u šatoru.",
    "Numerijan": "Putovao je u zatvorenoj nosiljci, pa se za njegovu smrt doznalo tek po smradu. Nakon toga carem je postao Dioklecijan.",
  },
  "vladar": {
    "Ranavalona": "Ranavalona I. bila je kraljica Madagaskara u 19. stoljeću, poznata po progonu kršćana i strogoj vladavini.",
    "Pačakuti": "Inka koji je Cusco pretvorio u carstvo; vjerojatno je dao sagraditi Machu Picchu.",
  },
  "biblija": { "Metuzalem": "Najdugovječniji čovjek u Bibliji, živio je 969 godina." },
  "redatelj": { "Obrad Gluščević": "Režirao je dječje filmove 'Vuk samotnjak' i 'Kapelski kresovi'." },

  // Mitologija, književnost i film
  "bogovi": {
    "Ananke": "Božica nužnosti; prema mitu, čak se ni bogovi nisu mogli oduprijeti njezinoj volji.",
    "Priap": "Bog plodnosti s golemim falusom, po njemu je ime dobio priapizam.",
  },
  "bog-ostali": {
    "Pangu": "U kineskoj mitologiji Pangu je razdvojio nebo i zemlju, a od njegova tijela nastao je svijet.",
    "Ukko": "Finski vrhovni bog neba i groma.",
  },
  "grcki-junak": { "Graje": "Tri sestre koje su dijelile jedno oko i jedan zub; Perzej im je ukrao oko." },
  "mitolosko-bice": {
    "Zduhač": "U slavenskom vjerovanju čovjek čija duša u snu napušta tijelo i bori se protiv nevremena.",
    "Tengu": "Japanski duh s dugim nosom ili ptičjim kljunom, koji živi u planinama.",
  },
  "lotr": {
    "Gwaihir": "Gospodar vjetrova, orao koji je spasio Gandalfa s vrha Orthanca.",
    "Celebrimbor": "Vilenjački kovač koji je iskovao tri vilenjačka prstena.",
  },
  "got": { "Jojen Reed": "Ima zelene snove i vodi Brana preko Zida." },
  "harry-potter": {
    "Grawp": "Hagridov polubrat, div kojeg je Hagrid doveo u Zabranjenu šumu.",
    "Bathilda Bagshot": "Autorica 'Povijesti magije' i susjeda Dumbledoreove obitelji u Godrikovu Dolu.",
  },
  "star-wars": {
    "Darth Plagueis": "Palpatine je Anakinu u 'Osveti Sitha' ispričao 'tragediju Dartha Plagueisa Mudrog'.",
    "Tarkin": "Glumac Peter Cushing umro je 1994., a u 'Rogue One' ga je digitalno 'oživio'.",
  },
  "simpsoni": {
    "Disco Stu": "Na jakni je htio napisati 'Disco Stud', ali mu je ponestalo mjesta za zadnje slovo.",
    "Sanjay": "Apuov brat i suvlasnik trgovine Kwik-E-Mart.",
  },
  "superheroj": {
    "Martian Manhunter": "J'onn J'onzz s Marsa, jedan od osnivača Lige pravde.",
    "Squirrel Girl": "Marvelova junakinja koja je u stripovima pobijedila i Thanosa i Doktora Dooma.",
  },
  "disney": {
    "Tri kabalera": "Film iz 1944. u kojem Paško Patak putuje Latinskom Amerikom.",
    "Crni kotao": "Film iz 1985. bio je takav neuspjeh da je Disney umalo zatvorio odjel animacije.",
  },
  "tv-serija": {
    "Kojak": "Telly Savalas kao ćelavi detektiv koji siše lizalice.",
    "Melrose Place": "Nastala je kao izdanak serije 'Beverly Hills, 90210'.",
  },
  "videoigra": {
    "Lemmings": "Igra iz 1991. nastala u Dundeeju u Škotskoj: spašavaš leminge koji slijepo hodaju u propast.",
    "Myst": "Dugo je bila najprodavanija igra za PC, sve do The Simsa.",
  },
  "drustvena-igra": { "Halma": "Halma je preteča igre kineski dame (Chinese checkers)." },
  "lik-videoigre": { "Isaac Clarke": "Junak igre Dead Space, nazvan po piscima Isaacu Asimovu i Arthuru C. Clarkeu." },
  "lik-stripa": { "Valentina": "Junakinja stripova Guida Crepaxa, nacrtana po uzoru na glumicu Louise Brooks." },
  "strani-film": {
    "Metropolis": "Film Fritza Langa iz 1927., prvi film upisan u UNESCO-ov registar Pamćenje svijeta.",
    "Sjećaš li se Dolly Bell": "Prvi film Emira Kusturice (1981.), osvojio je Zlatnog lava za prvijenac u Veneciji.",
  },
  "beatles": {
    "Golden Slumbers": "Paul je tekst preuzeo iz uspavanke iz 1603., na čije je note naišao kod oca.",
    "Hey Bulldog": "Snimljena je dok su snimali spot za 'Lady Madonnu', a završila je na albumu 'Yellow Submarine'.",
  },
  "shakespeare": { "Perikle": "Shakespeare je vjerojatno napisao samo dio drame, a ostatak George Wilkins." },
  "shakespeare-lik": {
    "Enobarb": "Antonijev vjerni vojnik iz 'Antonija i Kleopatre'.",
    "Imogena": "Kći kralja Cymbelina iz istoimene drame.",
  },
  "svjetska-knjizevnost": { "Middlemarch": "Napisala ga je Mary Ann Evans pod muškim pseudonimom George Eliot." },
  "opera-balet": { "Kameni cvijet": "Posljednji balet Sergeja Prokofjeva, po uralskoj bajci." },
  "mjuzikl": { "Brigadoon": "Mjuzikl o škotskom selu koje se pojavljuje samo jedan dan svakih sto godina." },
  "zlikovac": { "Uriah Heep": "Ljigavi zlikovac iz Dickensova 'Davida Copperfielda', po kojem se zove i rock bend." },
  "poznata-zivotinja": {
    "Cher Ami": "Golub pismonoša koji je 1918., ranjen, donio poruku koja je spasila skoro 200 američkih vojnika.",
    "Martha": "Posljednja putnička golubica, uginula 1914. u zoološkom vrtu u Cincinnatiju.",
  },
  "ime-ljubimca": {
    "Rin Tin Tin": "Njemački ovčar spašen s bojišta u Prvom svjetskom ratu postao je holivudska zvijezda 1920-ih.",
    "Krypto": "Supermanov pas, također s Kryptona.",
  },
  "plavo": { "Doraemon": "Japanski mačak-robot iz budućnosti; bio je žut, ali je poplavio od tuge kad mu je miš odgrizao uši." },
  "james-bond": {
    "Nick Nack": "Mali pomoćnik zlikovca Scaramange iz 'Čovjeka sa zlatnim pištoljem'.",
    "Gert Fröbe": "Glumio je Goldfingera; slabo je govorio engleski, pa je u filmu sinkroniziran.",
  },
  "muppet-sezam": { "Mr. Hooper": "Glumac Will Lee umro je 1982., a Ulica Sezam je kroz njegov lik djeci objasnila smrt." },
  "star-trek": { "Shran": "Andorijanac plave kože s antenama iz serije 'Enterprise'." },
  "friends": { "Leonard Green": "Rachelin otac, glumio ga je Ron Leibman." },
  "pokemon": { "Spinda": "Svaka Spinda ima drukčiji raspored pjega, a mogućih kombinacija ima više od četiri milijarde." },

  // Sport
  "nba": {
    "Seattle SuperSonics": "Preselili su se 2008. u Oklahomu i postali Oklahoma City Thunder.",
    "Sheboygan Red Skins": "U NBA-u su igrali samo jednu sezonu, 1949./50.",
  },
  "olimpijske": { "Squaw Valley": "Domaćin Zimskih olimpijskih igara 1960.; odmaralište je 2021. preimenovano u Palisades Tahoe." },
  "liga-prvaka-klub": { "Duisburg": "Riječ je o ženskom klubu FCR 2001 Duisburg, koji je 2009. osvojio ženski Kup UEFA; muški MSV Duisburg nikad nije osvojio europski kup." },
  "prvak-liga": { "Novese": "Klub iz gradića Novi Ligure bio je prvak Italije 1922., u sezoni kad su postojala dva prvenstva." },
  "americki-sport-klub": {
    "Utah Mammoth": "NHL klub osnovan 2024., a ime Mammoth dobio je 2025.",
    "Colorado Rockies": "Igraju u Denveru na 1 600 m visine, gdje loptica leti dalje, pa loptice čuvaju u ovlaživaču.",
  },

  // Svakodnevica
  "zuto": {
    "Šafran": "Najskuplji začin na svijetu: za kilogram treba oko 150 000 cvjetova.",
    "Forsicija": "Cvate žuto u rano proljeće, prije nego što dobije listove.",
  },
  "crveno": { "Crvena krvna zrnca": "Crvena su zbog hemoglobina, a u tijelu ih ima oko 25 bilijuna." },
  "rupe": { "Bušena kartica": "Bušene kartice nekad su bile glavni način unosa podataka u računala." },
  "na-glavi": { "Lička kapa": "Prema predaji crveno dno simbolizira prolivenu krv, a crne rese suze." },
  "kotaci": {
    "Kolovrat": "Naprava za predenje vune s velikim kotačem koji se pokreće nogom.",
    "Rikša": "Riječ dolazi od japanskog jinrikisha, 'vozilo na ljudski pogon'.",
  },
  "ljubimac": {
    "Šećerni jedriličar": "Mali tobolčar iz Australije koji jedri između stabala pomoću kožne opne.",
    "Štapićar": "Kukac koji izgleda kao grančica; ženke se mogu razmnožavati i bez mužjaka.",
  },
  "zeleno": { "Patina": "Zelena patina nastaje oksidacijom bakra; zbog nje je Kip slobode zelen." },
  "bijelo": {
    "Bijeli dim": "Bijeli dim iz Sikstinske kapele znači da je izabran novi papa.",
    "Kala": "Bijeli 'cvijet' kale zapravo je list koji obavija pravi cvat.",
  },
  "krila": {
    "Gargojl": "Gargojli na katedralama zapravo su odvodi za kišnicu.",
    "Harpija": "Harpija je i jedan od najvećih orlova na svijetu, iz prašuma Južne Amerike.",
  },
  "ostro": { "Bajuneta": "Ime dolazi od francuskog grada Bayonnea." },
  "auto-unutra": { "Tahograf": "Uređaj u kamionima i autobusima koji bilježi brzinu i vrijeme vožnje." },
  "strah": { "Rupe": "Strah ili gađenje od nakupina rupica zove se tripofobija." },
  "pivo": {
    "Westmalle": "Trapistička pivovara u Belgiji koja je osmislila stil tripel.",
    "Lambic": "Belgijsko pivo koje fermentira spontano, divljim kvascima iz zraka.",
  },
  "koktel": {
    "Aviation": "Svijetloljubičastu boju daje mu liker od ljubičice.",
    "Rob Roy": "Manhattan sa škotskim viskijem, nazvan po škotskom odmetniku i junaku.",
  },
  "sok": { "Kvas": "Blago gazirano piće od fermentiranog kruha, popularno u Rusiji i Ukrajini." },
  "pizza": { "Stracciatella": "Uz sladoled, stracciatella je i kremasti sir iz Apulije koji je nadjev burrate." },
  "kruh-tjestenina": {
    "Injera": "Etiopski kiseli kruh od tefa koji služi i kao tanjur i kao pribor za jelo.",
    "Arepa": "Kukuruzna pogača iz Venezuele i Kolumbije.",
  },
  "izum": {
    "Bakelit": "Prva potpuno sintetička plastika, iz 1907.",
    "Leydenska boca": "Prvi kondenzator, iz 18. stoljeća, u kojem se skupljao statički elektricitet.",
  },
  "prijevoz": {
    "Cepelin": "Nakon katastrofe Hindenburga 1937. cepelini su prestali prevoziti putnike.",
    "Maglev": "Vlak koji lebdi na magnetima; šangajski maglev vozi do zračne luke brzinom do 300 km/h.",
  },
  "alat": {
    "Nakovanj": "Nakovanj je i ime sitne koščice u uhu.",
    "Lisičji rep": "Lisičji rep je ručna pila za drvo.",
  },
  "fast-food": { "Nando's": "Lanac piletine s ljutim peri-peri umakom, nastao u Južnoj Africi 1987." },
  "svjetski-brend": {
    "Staedtler": "Njemački proizvođač olovaka iz Nürnberga, osnovan 1835.",
    "Monsanto": "Američki agrokemijski div koji je 2018. kupio Bayer.",
  },
  "avioprijevoznik": { "SunExpress": "Zajednička tvrtka Turkish Airlinesa i Lufthanse." },
  "metro-grad": { "Charleroi": "Charleroi ima laki metro s dijelovima tunela i stanicama koje nikad nisu otvorene." },
  "prijestolnica-kulture": {
    "Elefsina": "Grčki grad kod Atene bio je Europska prijestolnica kulture 2023.",
    "Bad Ischl": "Austrijski gradić bio je Europska prijestolnica kulture 2024. zajedno s regijom Salzkammergut.",
  },
  "strani-hit": {
    "Highway Star": "Pjesma Deep Purplea s albuma 'Machine Head' iz 1972.",
    "Shum": "Pjesma ukrajinskog benda Go_A s Eurovizije 2021.",
  },
  "eurovizija-pobjednik": {
    "Teddy Scholten": "Pobijedila je 1959., pa je Nizozemska postala prva država s dvije pobjede.",
    "Corry Brokken": "Donijela je Nizozemskoj prvu pobjedu na Euroviziji, 1957.",
  },
  "programski-jezik": { "Simula": "Prvi objektno orijentirani programski jezik, nastao u Norveškoj 1960-ih." },
};
