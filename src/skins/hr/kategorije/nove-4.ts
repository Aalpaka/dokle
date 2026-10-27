// Četvrti val novih pitanja (2026-10-25): zatvoreni popisi i otvorena pitanja suzena godinom, slovom ili popisom.
// Odgovori su poredani od najčešćih prema rjeđima; udio se računa iz mjesta u popisu (rang), osim gdje piše "=udio".
import type { SeedCategory } from "../categories";

export type Nova = Omit<SeedCategory, "answers" | "strip"> & { strip?: string[]; answers: string };

/** Popis "A/alias; B; C=2" u seed format: bez udjela dobiva C/(i+3), zbroj oko 130. */
export function rang(c: Nova): SeedCategory {
  const items = c.answers
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean);
  const raw = items.map((_, i) => 1 / (i + 3));
  const k = 130 / raw.reduce((s, x) => s + x, 0);
  const answers = items
    .map((it, i) => (it.includes("=") ? it : `${it}=${+(raw[i] * k).toPrecision(2)}`))
    .join("; ");
  return { strip: [], ...c, answers };
}

const gradovi: Nova[] = [
  {
    slug: "grad-skandinavija",
    group: "opce",
    title: "Grad u Skandinaviji, Finskoj ili na Islandu",
    hint: "Norveška, Švedska, Danska, Finska ili Island; vrijede i Farski otoci i Grenland",
    answers: `Stockholm/Stokholm; Kopenhagen/København/Kobenhavn/Copenhagen; Oslo; Helsinki; Reykjavik/Reykjavík/Rejkjavik;
      Göteborg/Goteborg/Geteborg/Gothenburg; Malmö/Malmo/Malme; Bergen; Aarhus/Århus/Arhus; Trondheim; Uppsala/Upsala; Tromsø/Tromso;
      Stavanger; Tampere; Odense; Turku; Rovaniemi; Espoo; Oulu; Akureyri; Aalborg/Ålborg/Alborg; Lillehammer; Lund; Kiruna;
      Helsingborg; Linköping/Linkoping; Esbjerg; Umeå/Umea; Kuopio; Jönköping/Jonkoping; Ålesund/Alesund; Kristiansand; Visby;
      Västerås/Vasteras; Örebro/Orebro; Jyväskylä/Jyvaskyla; Kalmar; Nuuk/Godthåb; Helsingør/Helsingor/Elsinore; Norrköping/Norrkoping;
      Drammen; Vaasa; Roskilde; Vantaa; Luleå/Lulea; Herning; Lahti; Ystad; Hammerfest; Tórshavn/Torshavn; Gävle/Gavle; Ribe; Nokia;
      Vejle; Horsens; Östersund/Ostersund; Karlstad; Bodø/Bodo; Sundsvall; Halmstad; Falun; Skagen; Fredrikstad; Södertälje/Sodertalje;
      Växjö/Vaxjo; Borås/Boras; Mariehamn/Maarianhamina; Karlskrona; Moss; Porvoo; Longyearbyen; Pori; Eskilstuna; Fredericia;
      Lappeenranta; Joensuu; Vestmannaeyjar; Kolding; Silkeborg; Mikkeli; Hamar; Kotka; Randers; Kópavogur/Kopavogur; Tønsberg/Tonsberg;
      Hillerød/Hillerod; Frederikshavn; Salo; Hafnarfjörður/Hafnarfjordur; Hämeenlinna/Hameenlinna; Kouvola; Sønderborg/Sonderborg;
      Arendal; Ísafjörður/Isafjordur; Tornio; Haugesund; Molde; Kirkenes; Rauma; Keflavík/Keflavik/Reykjanesbær; Kemi; Narvik; Solna;
      Húsavík/Husavik; Grindavík/Grindavik; Seinäjoki/Seinajoki; Kristianstad; Kajaani; Skien; Slagelse; Rønne/Ronne; Svendborg;
      Køge/Koge; Garðabær/Gardabaer; Kuusamo; Kokkola; Haderslev; Seyðisfjörður/Seydisfjordur; Sigtuna; Savonlinna; Imatra; Trelleborg;
      Sarpsborg; Akranes; Sandnes; Næstved/Naestved; Egilsstaðir/Egilsstadir; Haparanda; Kongsberg; Höfn/Hofn; Trollhättan/Trollhattan;
      Motala; Hjørring/Hjorring; Geiranger; Naantali; Honningsvåg/Honningsvag; Skellefteå/Skelleftea; Holstebro;
      Mosfellsbær/Mosfellsbaer; Halden; Örnsköldsvik/Ornskoldsvik; Sodankylä/Sodankyla; Borgarnes; Siglufjörður/Siglufjordur; Billund;
      Sandefjord; Viborg; Svolvær/Svolvaer; Skövde/Skovde; Mo i Rana; Larvik; Flåm/Flam; Inari; Stykkishólmur/Stykkisholmur;
      Frederiksberg; Hanko; Uddevalla; Lillestrøm/Lillestrom; Alta; Hveragerði/Hveragerdi; Varberg; Borlänge/Borlange; Landskrona;
      Horten; Middelfart; Kristiansund; Ängelholm/Angelholm; Nyköping/Nykoping; Dalvík/Dalvik; Grimstad; Asker; Selfoss; Vík/Vik;
      Porsgrunn; Mandal; Piteå/Pitea; Klaksvík/Klaksvik; Harstad; Egersund; Katrineholm; Aabenraa/Åbenrå; Steinkjer; Røros/Roros; Nacka;
      Gjøvik/Gjovik; Florø/Floro; Härnösand/Harnosand; Lohja; Vadsø/Vadso; Vardø/Vardo; Elverum; Strömstad/Stromstad;
      Järvenpää/Jarvenpaa; Jokkmokk; Tønder/Tonder; Lidköping/Lidkoping; Vänersborg/Vanersborg; Thisted; Norrtälje/Norrtalje;
      Kungsbacka; Hyvinkää/Hyvinkaa; Mora; Kerava; Nykøbing Falster/Nykobing; Enköping/Enkoping; Varkaus; Alingsås/Alingsas; Iisalmi;
      Nyborg; Holbæk/Holbaek; Ringsted; Åre/Are; Ebeltoft; Raahe; Huddinge; Skive; Struer`,
  },
  {
    slug: "grad-benelux",
    group: "opce",
    title: "Grad u Nizozemskoj, Belgiji ili Luksemburgu",
    answers: `Amsterdam; Bruxelles/Brisel/Brussels/Brussel; Luksemburg/Luxembourg; Den Haag/Haag/Hag/'s-Gravenhage/The Hague; Utrecht;
      Rotterdam; Antwerpen/Antwerp/Anvers; Brugge/Bruges; Gent/Ghent/Gand; Eindhoven; Liège/Liege/Lijež/Luik; Maastricht;
      Leuven/Louvain; Leiden/Lejden; Charleroi; Mons/Bergen; Groningen; Delft; Nijmegen; Haarlem; Arnhem; Breda; Namur; Zwolle; Tilburg;
      Mechelen/Malines; 's-Hertogenbosch/Den Bosch; Bastogne; Ostende/Oostende/Ostend; Almere; Alkmaar; Enschede; Leeuwarden; Hilversum;
      Waterloo; Dordrecht; Amersfoort; Hoorn; Assen; Zaandam; Deventer; Amstelveen; Apeldoorn; Volendam; Venlo; Heerenveen; Vlissingen;
      Noordwijk; Scheveningen; Zandvoort; Lelystad; Roermond; Hengelo; Zoetermeer; Giethoorn; Kinderdijk; Schiedam; Ieper/Ypres/Yprès;
      Den Helder; Hasselt; Heerlen; Kerkrade; Bergen op Zoom; Genk; Alphen aan den Rijn; Sittard; Kortrijk/Courtrai; Wageningen;
      Hoofddorp; IJmuiden; Almelo; Haarlemmermeer; Zutphen; Purmerend; Gorinchem; Doetinchem; Gouda; Helmond; Katwijk; Terneuzen;
      Tournai/Doornik; Harderwijk; Dendermonde; Roosendaal; Edam; Rijswijk; Spijkenisse; Dinant; Seraing; Schaerbeek; Middelburg;
      Vlaardingen; Waalwijk; Zeebrugge; Uccle/Ukkel; Lisse; Sint-Truiden; Goes; Spa; Ixelles/Elsene; Sint-Niklaas; Knokke/Knokke-Heist;
      Sneek; Geel; Eupen; Anderlecht; Culemborg; Emmen; Veenendaal; Capelle aan den IJssel; Hoogeveen; Oudenaarde; Arlon; Nieuwegein;
      La Louvière/La Louviere; Turnhout; Meppel; Tongeren; Roeselare; Velsen; Dokkum; Beverwijk; Tiel; Vilvoorde; Wavre; Verviers;
      Esch-sur-Alzette/Esch; Brunssum; Malmedy; Louvain-la-Neuve; Nivelles; Blankenberge; Mouscron/Moeskroen; Lommel; Hoek van Holland;
      Maassluis; Weert; Franeker; Kampen; Zaventem; Drachten; Mondorf-les-Bains; Laeken; Oss; Diksmuide; Ede; Durbuy; De Panne; Tienen;
      Waregem; Herentals; Aarschot; Lier; Harlingen; Valkenburg; Bree; Halle; Diekirch; Aalst/Alost; Echternach; Differdange; Beringen;
      Binche; Nieuwpoort; Vianden; Clervaux; Dudelange; Mol; Spa-Francorchamps/Francorchamps; Bouillon; Ettelbruck; Zulte; Molenbeek;
      Wiltz; Ottignies; Schengen; Remich; Huy; Ath; Grevenmacher; Mersch`,
  },
  {
    slug: "grad-istok",
    group: "opce",
    title: "Grad u Rusiji, Ukrajini ili Bjelorusiji",
    answers: `Moskva/Moscow; Sankt Peterburg/Petrograd/Lenjingrad/Petersburg/Sankt-Peterburg/Saint Petersburg; Kijev/Kyiv/Kiev/Kijiv; Minsk;
      Volgograd/Staljingrad/Stalingrad; Odesa/Odessa; Vladivostok; Kalinjingrad/Kaliningrad/Königsberg/Konigsberg;
      Jekaterinburg/Ekaterinburg/Yekaterinburg/Sverdlovsk; Novosibirsk; Lavov/Lviv/Laviv/Lwów/Lemberg; Kazanj/Kazan;
      Harkiv/Harkov/Kharkiv/Kharkov; Pripjat/Pripyat; Sevastopolj/Sevastopol; Černobil/Chernobyl/Čornobil; Soči/Sochi; Murmansk;
      Doneck/Donjeck/Donetsk; Nižnji Novgorod/Nizhny Novgorod/Gorki; Mariupolj/Mariupol; Dnjipro/Dnjepar/Dnjepropetrovsk/Dnipro;
      Krasnojarsk/Krasnoyarsk; Omsk; Zaporižja/Zaporožje/Zaporizhzhia; Jakutsk/Yakutsk; Samara/Kujbišev; Krasnodar; Irkutsk;
      Čeljabinsk/Chelyabinsk; Norilsk; Habarovsk/Khabarovsk; Saratov; Herson/Kherson; Voronjež/Voronezh; Groznji/Grozny;
      Lugansk/Luhansk; Smolensk; Arhangeljsk/Arkhangelsk; Kursk; Jalta/Yalta; Mahačkala/Makhachkala; Magadan; Astrahan/Astrakhan;
      Simferopolj/Simferopol; Pskov; Grodno/Hrodna; Jaroslavlj/Yaroslavl; Tver/Kalinjin; Tomsk; Viborg/Vyborg; Kronštat/Kronstadt;
      Gomel/Homel; Tjumenj/Tyumen; Poltava; Novgorod/Veliki Novgorod; Vitebsk/Viciebsk; Barnaul; Orenburg; Vorkuta; Iževsk/Izhevsk;
      Magnitogorsk; Mogiljov/Mahiljov/Mogilev; Belgorod; Ulan-Ude; Novorosijsk/Novorossiysk; Rjazanj/Ryazan; Brest/Brest-Litovsk;
      Birobidžan/Birobidzhan; Vladikavkaz; Vladimir; Penza; Kurgan; Južno-Sahalinsk/Yuzhno-Sakhalinsk; Stavropolj/Stavropol; Saransk;
      Taganrog; Novokuznjeck/Novokuznetsk; Petrozavodsk; Tobolsk; Uljanovsk/Simbirsk; Čeboksari/Cheboksary; Brjansk/Bryansk;
      Orel/Orjol/Oryol; Suzdalj/Suzdal; Krivi Rih/Krivoj Rog/Kryvyi Rih; Blagoveščensk/Blagoveshchensk;
      Rostov na Donu/Rostov-na-Donu/Rostov; Černivci/Černovci/Chernivtsi/Czernowitz; Kemerovo; Kizil/Kyzyl;
      Mikolajiv/Nikolajev/Mykolaiv; Luck/Lutsk; Toljati/Togliatti; Kaluga; Perm; Surgut; Nalčik/Nalchik; Majkop/Maykop; Tambov; Bratsk;
      Anapa; Elista; Vologda; Bahmut/Artemivsk/Bakhmut; Ivanovo; Tula; Lipeck/Lipetsk; Podoljsk/Podolsk; Kostroma; Siktivkar/Syktyvkar;
      Kramatorsk; Vinica/Vinnycja/Vinnytsia; Naberežnije Čelni/Naberezhnye Chelny; Kislovodsk; Ivano-Frankivsk; Pjatigorsk/Pyatigorsk;
      Užgorod/Uzhhorod; Žitomir/Zhytomyr; Ternopilj/Ternopil; Ufa; Gelendžik/Gelendzhik; Obninsk; Černihiv/Černigov/Chernihiv;
      Nižnji Tagil/Nizhny Tagil; Ussurijsk/Ussuriysk; Salehard/Salekhard; Kerč/Kerch; Joškar-Ola/Yoshkar-Ola; Nahodka/Nakhodka; Arzamas;
      Peterhof/Petrodvorec; Abakan; Hanti-Mansijsk/Khanty-Mansiysk; Sumi/Sumy; Melitopolj/Melitopol; Kirov/Vjatka;
      Slovjansk/Slavjansk/Sloviansk; Čerkasi/Cherkasy; Puškin/Carsko Selo; Rivne/Rovno; Kamjanec-Podiljski/Kamianets-Podilskyi;
      Polock/Polack/Polotsk; Čita/Chita; Kropivnicki/Kirovograd/Kropyvnytskyi; Rybinsk/Ribinsk; Himki/Khimki; Pinsk;
      Novi Urengoj/Novy Urengoy; Orsk; Zelenograd; Uman; Kolomna; Zlatoust; Angarsk; Dubna; Hmeljnicki/Khmelnytskyi;
      Sergijev Posad/Sergiyev Posad/Zagorsk; Jevpatorija/Evpatorija/Yevpatoria; Bila Cerkva/Bila Tserkva; Balašiha/Balashikha;
      Mukačevo/Mukachevo; Serpuhov/Serpukhov; Mitišči/Mytishchi; Komsomolsk na Amuru/Komsomolsk; Elektrostal; Avdijivka/Avdiivka; Miass;
      Sterlitamak; Engels; Uglič/Uglich; Buča/Bucha; Izjum/Izium; Petropavlovsk-Kamčatski/Petropavlovsk; Severodonjeck/Sievierodonetsk;
      Kremenčuk/Kremenchuk; Irpinj/Irpin; Feodosija/Feodosiya; Dzeržinsk/Dzerzhinsk; Hostomelj/Hostomel; Volžski/Volzhsky;
      Rostov Veliki; Drohobič/Drohobych; Kovel; Makijivka/Makijevka; Berdjansk/Berdyansk; Lisičansk/Lysychansk; Konotop; Lida;
      Brovari/Brovary; Enerhodar; Nikopolj/Nikopol; Orša/Orsha; Mozir/Mazyr; Sluck/Slutsk; Soligorsk/Salihorsk;
      Baranoviči/Baranavičy/Baranovichi; Slonim; Bobrujsk/Babrujsk/Bobruisk; Žlobin/Zhlobin; Kamjanske/Dniprodzeržinsk;
      Nova Kahovka/Kahovka; Kobrin/Kobryn; Rečica/Rechytsa; Nesviž/Nyasvizh; Borisov/Barisau; Molodečno/Maladzečna;
      Bilhorod-Dnistrovski/Akerman; Novopolock/Navapolatsk; Svetlogorsk/Svetlahorsk; Mir`,
  },
  {
    slug: "grad-balkan-istok",
    group: "opce",
    title: "Grad u Rumunjskoj, Bugarskoj, Albaniji ili Sjevernoj Makedoniji",
    answers: `Bukurešt/Bucuresti/Bucharest; Sofija/Sofia; Tirana; Skopje/Skoplje; Drač/Durrës/Durres; Ohrid; Plovdiv; Cluj-Napoca/Cluj/Kluž;
      Burgas; Brașov/Brasov/Brašov; Temišvar/Timisoara/Timişoara; Constanța/Constanta/Konstanca; Bitola; Iași/Iasi/Jaši;
      Skadar/Shkodër/Shkoder/Shkodra; Sibiu; Valona/Vlorë/Vlora; Varna; Gjirokastër/Gjirokaster/Đirokastra; Sighișoara/Sighisoara;
      Berat; Veliko Tarnovo/Tarnovo; Tetovo; Kumanovo; Sarandë/Saranda; Prilep; Strumica; Craiova/Krajova; Oradea; Gostivar;
      Galați/Galati; Struga; Slatina; Alexandria; Štip/Stip; Târgoviște/Targoviste/Targovište/Targovishte; Kičevo/Kicevo;
      Ploiești/Ploiesti/Ploješti; Târgu Mureș/Targu Mures; Debar; Gevgelija; Suceava; Alba Iulia; Brăila/Braila; Satu Mare; Bran;
      Pitești/Pitesti; Baia Mare; Kočani/Kocani; Montana; Bacău/Bacau; Drobeta-Turnu Severin/Turnu Severin; Roman; Kruševo/Krusevo;
      Kavadarci; Turda; Ruse; Vinica; Bistrița/Bistrita; Kriva Palanka; Mangalia; Stara Zagora; Botoșani/Botosani; Sinaia; Pernik;
      Piatra Neamț/Piatra Neamt; Tulcea; Hunedoara; Razgrad; Vidin; Pleven; Silistra; Blagoevgrad; Buzău/Buzau;
      Râmnicu Vâlcea/Ramnicu Valcea; Giurgiu; Negotino; Reșița/Resita; Târgu Jiu/Targu Jiu; Sveti Nikole; Elbasan; Radoviš/Radovis;
      Focșani/Focsani; Sfântu Gheorghe/Sfantu Gheorghe; Sighetu Marmației/Sighet; Pazardžik/Pazardzhik; Dobrič/Dobrich/Dobriči; Lugoj;
      Korča/Korçë/Korce; Deva; Nesebar/Nesebăr; Berovo; Haskovo; Delčevo/Delcevo; Kratovo; Karlovo; Sliven; Veles; Šumen/Shumen;
      Smoljan/Smolyan; Mediaș/Medias; Resen; Sulina; Făgăraș/Fagaras; Kardžali/Kardzhali; Vaslui; Demir Hisar; Arad; Călărași/Calarasi;
      Dimitrovgrad; Zalău/Zalau; Sunčev breg/Sunny Beach/Slančev brjag; Ksamil; Jambol/Yambol; Bansko; Himarë/Himara; Orșova/Orsova;
      Sozopol; Kazanlak/Kazanlăk; Mamaia; Krujë/Kruje/Kroja; Caransebeș/Caransebes; Gabrovo; Kjustendil/Kyustendil; Lezhë/Lezhe/Lješ;
      Fier; Vraca/Vratsa; Samokov; Onești/Onesti; Petroșani/Petrosani; Pogradec; Lovech/Loveč; Predeal; Asenovgrad;
      Zlatni pijesci/Zlatni pjasaci/Golden Sands; Vatra Dornei; Câmpina/Campina; Balčik/Balchik; Sandanski; Năvodari/Navodari; Pomorie;
      Eforie; Kukës/Kukes; Petrič/Petrich; Dupnica/Dupnitsa; Lushnjë/Lushnje; Gorna Orjahovica/Gorna Oryahovitsa; Borovec/Borovets;
      Pamporovo; Kavajë/Kavaje; Koprivštica/Koprivshtitsa; Svištov/Svishtov; Peshkopi; Përmet/Permet; Tutrakan; Tepelenë/Tepelene;
      Shëngjin/Shengjin; Kozloduj/Kozloduy; Nikopol; Melnik; Lom; Velipojë/Velipoja; Burrel`,
  },
  {
    slug: "grad-kanada-australija",
    group: "opce",
    title: "Grad u Kanadi, Australiji ili na Novom Zelandu",
    answers: `Toronto; Sydney/Sidnej; Vancouver/Vankuver; Melbourne/Melburn; Montreal/Montréal/Montreal; Canberra/Kanbera; Ottawa/Otava;
      Brisbane; Québec/Quebec/Kvebek/Quebec City; Auckland/Okland; Perth; Calgary/Kalgari; Adelaide; Wellington; Edmonton;
      Winnipeg/Vinipeg; Christchurch; Hobart; Alice Springs; Cairns; Dunedin; London; Wollongong; Townsville; Geelong; Iqaluit;
      Saskatoon; Yellowknife; Whitehorse; Hastings; Tauranga; Niagara Falls; Mississauga; Invercargill; Moncton; Charlottetown;
      Brampton; Fredericton; Rotorua; Thunder Bay; Surrey; Palmerston North; Victoria; Kelowna; Guelph; Kamloops; New Plymouth;
      Gatineau; Halifax; Hamilton; Whanganui; Darwin; Jasper; Gold Coast; Oshawa; Barrie; Newcastle; Timaru;
      St. Catharines/Saint Catharines; Nanaimo; Burnaby; Taupo/Taupō; Medicine Hat; Peterborough; Nelson; Sherbrooke; Queenstown;
      Trois-Rivières/Trois Rivieres; Dawson City; Greymouth; Saint John; Waterloo; Timmins; Fort McMurray; Te Anau; Lethbridge;
      Ballarat; Napier; Kingston; Toowoomba; Longueuil; Wagga Wagga; Regina; Moose Jaw; Coober Pedy; Blenheim; Ipswich; Windsor;
      Bendigo; Kenora; Broken Hill; Rockhampton; Launceston; St. John's/St Johns; Fremantle; Kalgoorlie; Lévis/Levis; Whangarei;
      Burlington; Albury; Bundaberg; Kitchener; Dubbo; Gisborne; Sudbury; Markham; Coffs Harbour; Orange; Byron Bay; Mildura; Wanaka;
      Port Macquarie; Kaikoura; Richmond; Shepparton; Geraldton; Laval; Katherine; Whistler; Mount Gambier; Oakville; Prince George;
      Banff; Churchill; Brandon; Prince Albert; Mount Isa; Port Augusta; Sault Ste. Marie/Sault Sainte Marie; Parramatta; Whyalla;
      Mandurah; Tennant Creek; Saguenay; Burnie; Gosford; Warrnambool; Albany; Hervey Bay; Abbotsford; Mackay; Wodonga; Red Deer;
      Bathurst; Belleville; North Bay; Port Hedland; Karratha; Gladstone; Tamworth; Broome; Bunbury; Esperance; Devonport;
      Sunshine Coast; Noosa; Maitland`,
  },
  {
    slug: "grad-latinska-amerika",
    group: "opce",
    title: "Grad u Latinskoj Americi",
    hint: "Meksiko, Srednja i Južna Amerika, Karibi",
    answers: `Ciudad de México/Mexico City/Meksiko/Meksiko City/México; Rio de Janeiro/Rio; Buenos Aires; São Paulo/Sao Paulo/Sao Paolo;
      Bogotá/Bogota; Lima; Caracas/Karakas; Santiago/Santiago de Chile; Brasília/Brasilia; Havana/La Habana; Montevideo;
      Panama/Panamá/Ciudad de Panamá; Cancún/Cancun/Kankun; Guadalajara/Gvadalahara; Quito/Kito; Medellín/Medellin; Monterrey; La Paz;
      Cuzco/Cusco/Kusko; Acapulco/Akapulko; Tijuana; Asunción/Asuncion; Manaus; Rosario; Ushuaia; Valencia; Belo Horizonte; Cali;
      Recife; Curitiba; Porto Alegre; Fortaleza; Puerto Vallarta; Florianópolis/Florianopolis; Punta Arenas; Barranquilla; Belém/Belem;
      Guayaquil/Gvajakil; Oaxaca; Salvador; Guatemala/Ciudad de Guatemala/Gvatemala; Valparaíso/Valparaiso;
      Ciudad Juárez/Ciudad Juarez/Juarez; Los Cabos/Cabo San Lucas; Veracruz; Tulum; Granada; Santa Cruz/Santa Cruz de la Sierra; Sucre;
      Puebla; Antigua/Antigua Guatemala; Potosí/Potosi; Santo Domingo; Antofagasta; Mar del Plata; Arequipa; Iquitos; Culiacán/Culiacan;
      Punta Cana; Cochabamba; Guanajuato; Durango; Port-au-Prince/Port au Prince; Maracaibo; San Salvador; Mazatlán/Mazatlan;
      Querétaro/Queretaro; Tegucigalpa; Toluca; Zacatecas; Playa del Carmen; Trinidad; Mexicali; Santa Marta; Willemstad; Morelia;
      Campeche; Viña del Mar/Vina del Mar; Hermosillo; Port of Spain; Managua; Aguascalientes; San Luis Potosí; Belize City; Santos;
      Bridgetown; Cuernavaca; Paramaribo; Torreón/Torreon; Ensenada; Santiago de Cuba; Saltillo; Cayenne; Tampico; Armenia;
      Chihuahua/Čivava; Belmopan; Montego Bay; Tuxtla Gutiérrez/Tuxtla Gutierrez; Bariloche/San Carlos de Bariloche;
      Santiago de los Caballeros; Cap-Haïtien/Cap Haitien; Pachuca; San Pedro Sula; La Plata; San Cristóbal de las Casas;
      Fort-de-France; Castries; Cartagena; San José/San Jose; Córdoba/Cordoba; Xalapa/Jalapa; Basseterre;
      Colonia del Sacramento/Colonia; Nassau; Natal; Oranjestad; Mendoza; Bahía Blanca/Bahia Blanca; El Alto; León/Leon; Roseau; Salta;
      Iquique; Comodoro Rivadavia; Villahermosa; Pointe-à-Pitre/Pointe a Pitre; Kingstown; Trujillo; Mérida/Merida; Punta del Este;
      Taxco; Georgetown; Valdivia; Camagüey/Camaguey; Guantánamo/Guantanamo; Cuenca; Goiânia/Goiania;
      Tucumán/San Miguel de Tucumán/Tucuman; Varadero; Cienfuegos; Neuquén/Neuquen; Kourou; Puerto Montt; El Calafate; Kingston; Arica;
      Matanzas; Holguín/Holguin; Ciudad del Este; Callao; Cúcuta/Cucuta; Bucaramanga; Pinar del Río/Pinar del Rio; Puerto Madryn;
      San Juan; Campinas; Ponce; San Pedro de Atacama; Chiclayo; Temuco; Puno; Corrientes; Aracaju; Nazca; Petrópolis/Petropolis;
      Ayacucho; Londrina; Uyuni; Manizales; Maceió/Maceio; Rancagua; Barquisimeto; Piura; Campo Grande; Santa Fe; Saint John's; Tarija;
      Puerto Iguazú/Puerto Iguazu; Maracay; Joinville; Cuiabá/Cuiaba; Río Gallegos/Rio Gallegos; Talca; Paysandú/Paysandu;
      Macapá/Macapa; Huancayo; Ciudad Guayana; Saint George's; Concepción/Concepcion; Oruro; Foz do Iguaçu/Foz do Iguacu;
      Niterói/Niteroi; Guarulhos; Blumenau; Tacna; Ibagué/Ibague; Ouro Preto; Popayán/Popayan; Paraty; Villavicencio; Salto;
      Ciudad Bolívar/Ciudad Bolivar; Cumaná/Cumana; Posadas; Porto Velho; Uberlândia/Uberlandia; Manta; La Serena;
      Ribeirão Preto/Ribeirao Preto; Teresina; Ambato; Calama; Maturín/Maturin; Gramado; Leticia; Encarnación/Encarnacion; Loja;
      Puerto La Cruz; Esmeraldas; Caxias do Sul; Pasto; Sorocaba; Pereira; São Luís/Sao Luis; Juiz de Fora; Pelotas; Vitória/Vitoria;
      San Cristóbal; Boa Vista; Rio Branco; João Pessoa/Joao Pessoa; Santarém/Santarem; Palmas; Búzios/Buzios`,
  },
  {
    slug: "grad-istocna-azija",
    group: "opce",
    title: "Grad u Kini, Japanu ili Koreji",
    hint: "Kina (s Hong Kongom, Makaom i Tajvanom), Japan, Južna ili Sjeverna Koreja",
    answers: `Tokio/Tokyo; Hong Kong/Hongkong; Peking/Beijing/Bejing; Šangaj/Shanghai/Sangaj; Seul/Seoul; Makao/Macau/Macao; Kjoto/Kyoto; Osaka;
      Hirošima/Hiroshima; Taipei/Tajpej; Pjongjang/Pyongyang; Chongqing/Čongking; Guangzhou/Kanton/Guangdžou; Shenzhen/Šenžen;
      Busan/Pusan; Nagasaki; Jokohama/Yokohama; Sapporo; Chengdu/Čengdu; Wuhan/Vuhan; Nagoja/Nagoya; Nanjing/Nanking; Xi'an/Xian/Sian;
      Kobe; Hangzhou/Hangdžou; Tianjin/Tjenjin; Harbin; Qingdao/Tsingtao/Čingdao; Lhasa; Suzhou/Sudžou; Kunming; Shenyang/Mukden;
      Dalian; Xiamen/Amoy; Changsha; Fuzhou; Kashgar/Kašgar; Zhengzhou; Lanzhou; Luoyang; Hefei; Jinan; Ningbo; Inčheon/Incheon; Guilin;
      Dongguan; Kaifeng; Hohhot; Changchun; Daegu/Taegu; Shijiazhuang; Haikou; Taiyuan; Zhangjiajie; Gwangju/Kwangju; Nanchang; Foshan;
      Nanning; Daejeon/Taejon; Wuxi; Xining; Sanya; Wenzhou; Ulsan; Guiyang; Fukuoka; Toyota; Zhuhai; Gyeongju/Kjongđu;
      Kaohsiung/Gaoxiong; Kaesong/Kesong; Lijiang; Suwon; Sendai; Nara; Yinchuan; Fukušima/Fukushima; Kochi; Datong; Yan'an/Yanan;
      Kamakura; Jeonju; Taichung/Taizhong; Goyang; Tainan; Naha; Seongnam; Sokcho; Kumamoto; Pingyao; Kanazawa; Qufu; Urumqi/Urumči;
      Kagošima/Kagoshima; Okayama; Changwon; Chuncheon; Cheongju; Pohang; Hsinchu; Hamhung; Chongjin/Čongđin; Wonsan; Hamamatsu;
      Kitakyushu; Gangneung; Keelung/Jilong; Dali; Pyeongchang/Pjongčang; Yongin; Andong; Hakone; Aomori; Yangshuo; Jeju/Čedžu; Sinuiju;
      Mokpo; Kawasaki; Nampho/Nampo; Yeosu; Saitama; Hakodate; Gimhae; Sakai; Matsuyama; Okinawa/Okinava; Morioka; Gifu; Himeji;
      Utsunomiya; Takamatsu; Asahikawa; Shimonoseki; Chiba; Niigata; Nagano; Otaru; Akita; Takayama; Miyazaki; Kurashiki; Kushiro;
      Atami; Tokushima; Nikko; Beppu; Sasebo; Matsumoto; Otsu; Shizuoka; Maebashi; Yamagata; Oita; Karuizawa; Wakayama; Fukui; Toyama;
      Nagaoka; Mito; Kofu; Ise; Ito`,
  },
  {
    slug: "grad-milijun",
    group: "kviz",
    title: "Grad s više od milijun stanovnika",
    hint: "Bilo gdje u svijetu; računa se i šire gradsko područje",
    answers: `London; Pariz/Paris; Tokio/Tokyo; Berlin; Los Angeles; Istanbul/Carigrad; Chicago/Čikago; Mumbai/Bombaj; Barcelona;
      Meksiko/Mexico City/Ciudad de México; Šangaj/Shanghai; Peking/Beijing; Moskva/Moscow; Zagreb; Beč/Wien/Vienna; Madrid;
      Singapur/Singapore; Hong Kong; Toronto; Prag/Praha/Prague; Dubai; Milano/Milan; Budimpešta/Budapest; Amsterdam; Rio de Janeiro;
      Sydney; Buenos Aires; Delhi/New Delhi; Montreal; Melbourne; Džakarta/Jakarta; Sao Paulo/São Paulo; Hamburg;
      Philadelphia/Filadelfija; München/Munchen/Minhen/Munich; Atena/Athens; Bangkok; Boston; San Francisco; Seattle/Sijetl; Atlanta;
      Teheran/Tehran; Varšava/Warszawa/Warsaw; Kopenhagen/Copenhagen; Stockholm/Stokholm; Kairo/Cairo; Lyon/Lion; Seul/Seoul;
      Miami/Majami; Houston; Hyderabad; Lisabon/Lisboa/Lisbon; Birmingham; Bangalore/Bengaluru; Kolkata/Kalkuta/Calcutta;
      Napulj/Napoli/Naples; Karachi/Karači; Manchester/Mančester; Dallas; Beograd/Belgrade; Rijad/Riyadh; Detroit; Kijev/Kyiv;
      Chennai/Madras; Cape Town/Kapstadt/Kaapstad; Dublin; Kinshasa; Manila; Lagos; Bruxelles/Brisel/Brussels; Glasgow; Johannesburg;
      Casablanca/Kazablanka; San Diego; Dhaka/Daka; Bukurešt/Bucharest; Bagdad/Baghdad; Caracas; Mekka/Meka/Mecca;
      Köln/Koln/Kelen/Cologne; Sofija/Sofia; Lahore; Marseille/Marselj; Tel Aviv; Valencia; Oslo; Abu Dhabi; Addis Abeba/Addis Ababa;
      Bogotá/Bogota; Sevilla/Seville; Bejrut/Beirut; Frankfurt; Chongqing; Ho Chi Minh/Saigon/Sajgon; Nairobi; Helsinki; Stuttgart;
      Lima; Torino/Turin; Santiago; Damask/Damascus; Guangzhou/Kanton; Tbilisi; Baku; Düsseldorf/Dusseldorf; Tunis; Kuala Lumpur;
      Alžir/Algiers; Havana; Porto; Minsk; Volgograd; Ankara; Almati/Almaty; Vancouver; Taškent/Tashkent; Rotterdam; Toulouse/Tuluz;
      Kabul; Panama; Islamabad; Doha; Shenzhen; Novosibirsk; Guatemala/Gvatemala; Taipei; Medina; Varanasi/Benares; Hanoi; Lille/Lil;
      Ahmedabad; Kathmandu/Katmandu; Jeddah/Džeda; New York/Njujork; Muscat/Maskat; Brisbane; Chengdu; Antalya/Antalija; Amman; Osaka;
      Pune; Calgary; Perth; Kjoto/Kyoto; Ottawa; Nanjing/Nanking; Jaipur/Džajpur; Isfahan; Colombo/Kolombo; Lucknow; Rim/Roma; Bursa;
      Mašhad/Mashhad; Washington/Vašington; Aleppo/Halab; Xi'an/Xian; Sana/Sanaa; Auckland; Adelaide; Las Vegas; Minneapolis;
      Pjongjang/Pyongyang; Ulan Bator/Ulaanbaatar; Edmonton; Harbin; Peshawar; Sankt Peterburg/Petrograd/Lenjingrad; Hangzhou;
      Hirošima/Hiroshima; Phnom Penh/Pnom Pen; Omsk; Agra; Guadalajara; Mosul; Yangon/Rangun; Tianjin; Krasnodar; New Orleans;
      Baltimore; Samara; Visakhapatnam; Tabriz; Denver; St. Louis; Quezon City; Phoenix; Kuvajt/Kuwait City; Wuhan; Kochi/Cochin;
      Sapporo; Rawalpindi; Aleksandrija/Alexandria; Pittsburgh; Busan; Liverpool; Nagpur; Basra; Indore; Monterrey; Qingdao;
      Jokohama/Yokohama; Shiraz; Coimbatore; Nagoja/Nagoya; Amritsar; Milwaukee; Bhopal; Cebu; Salt Lake City; Kampala; Kanpur;
      Brasília/Brasilia; Patna; Chittagong; Surat; Jeruzalem=0.1; Shenyang; Medellín/Medellin; Montevideo; Fukuoka; San Antonio;
      Surabaya; Suzhou; Cleveland; Dalian; Multan; Faisalabad; Harkiv/Harkov; Santo Domingo; Cincinnati; Kazanj; Madurai; Indianapolis;
      Quito; Kaohsiung; Kunming; Izmir; Xiamen; Kobe; Erevan/Jerevan; Inčheon/Incheon; Mogadiš/Mogadishu; Tijuana; Pretoria; La Paz;
      Rosario; Nižnji Novgorod; Leeds; Krasnojarsk; Jekaterinburg; Rostov na Donu; Čeljabinsk; Voronjež; Mandalay; Changsha;
      Marakeš/Marrakesh; Ciudad Juárez; Perm; Bandung; Rabat; Solun/Thessaloniki; Akra/Accra; Palermo; Asunción; Fuzhou; Port-au-Prince;
      Dakar; Ufa; Krakov/Kraków/Krakow; Harare; Dar es Salaam; Barranquilla; Daegu; Abuja; Abidjan; Wrocław/Wroclaw; Bordeaux/Bordo;
      Zhengzhou; Lanzhou; Medan; Zürich/Zurich/Cirih; Tanger/Tangier; Ningbo; Manaus; Durban; Taichung; Sheffield;
      Gdanjsk/Gdańsk/Gdansk; Kartum/Khartoum; Dongguan; Gwangju; Guayaquil; Palembang; Makassar; Belo Horizonte; Luanda; Jinan;
      Changchun; Sendai; Semarang; San Salvador; Daejeon; Hefei; Recife; Leipzig/Lajpcig; Curitiba; Antwerpen/Antwerp; Tegucigalpa;
      Antananarivo; Foshan; Davao; Bari; Nanning; Ouagadougou; Wuxi; Porto Alegre; Kigali; Göteborg/Gothenburg; Shijiazhuang; Taiyuan;
      Puebla; Monrovia; Cali; Nanchang; Guiyang; Bamako; Fortaleza; Gizeh/Giza; Managua; Kitakyushu; Belém; Kawasaki; Brazzaville;
      Urumqi; Saitama; Ibadan; Katowice; El Alto; Freetown; Yaoundé/Jaunde; Dortmund; Salvador; Lusaka; Łódź/Lodz; Poznań/Poznan;
      Goiânia/Goiania; Douala; Maputo; Maracaibo; Chiba; Conakry; Kumasi; N'Djamena; Campinas; Essen; Niamey; León; Córdoba/Cordoba;
      Cotonou; Barquisimeto; San Juan; Santa Cruz; Tripoli; Adana; Lubumbashi; Kano; Gaziantep; Mendoza; Lomé/Lome; Konya; Duisburg;
      Nürnberg/Nirnberg; Austin; Portland; Tampa; Sacramento; Nashville; Fes/Fez; Mersin; Orlando; Kansas City; Charlotte; Hannover;
      Kayseri; Columbus; Raleigh; Jacksonville; Newcastle; San Jose; Riverside; Den Haag/Haag; Diyarbakir`,
  },
];

const opce: Nova[] = [
  {
    slug: "nacionalni-park-svijet",
    group: "opce",
    strip: ["nacionalni park", "national park", "np", "park"],
    title: "Nacionalni park u svijetu",
    hint: "Bilo gdje, i hrvatski; vrijede i poznati rezervati poput Masai Mare",
    answers: `Grand Canyon/Veliki kanjon; Serengeti; Mljet; Brijuni/Brioni; Death Valley/Dolina smrti; Uluru-Kata Tjuta/Uluru; Zion;
      Kruger/Krugerov park/Kruger National Park; Cinque Terre; Jasper; Masai Mara/Maasai Mara; Everglades; Krka/NP Krka; Sierra Nevada;
      Teide; Kornati; Lake District; Kopaonik; Risnjak; Durmitor; Snowdonia/Eryri; Tara; Skadarsko jezero; Kilimandžaro/Kilimanjaro;
      Peak District; Berchtesgaden; Grand Teton; Triglavski nacionalni park/Triglav/Triglavski park; Dartmoor; Lovćen/Lovcen; Kozara;
      Fruška gora/Fruska gora; Vezuv/Vesuvio/Vesuvius; Loch Lomond; Picos de Europa; Samarija/Samaria; Sutjeska; Yellowstone; Abruzzo;
      Cairngorms; Þingvellir/Thingvellir; Yosemite/Josemiti; Northumberland; Vatnajökull/Vatnajokull; Galápagos/Galapagos;
      Gran Paradiso; Paklenica; Plitvička jezera/Plitvice/NP Plitvice; Göreme/Goreme; Olimp/Olympus/Olimpos; Harz; Sarek; New Forest;
      Tatranski nacionalni park/Tatre/TANAP/Tatrzański; Pyrénées/Pireneji; Snæfellsjökull/Snaefellsjokull; Rila; Eifel; Killarney;
      Prokletije; Banff; Yorkshire Dales; Mount Rainier; Jotunheimen; Denali; Connemara; Hardangervidda; Abisko; Gargano; Sila; Acadia;
      Bjelovješka šuma/Białowieża/Bialowieza; Schwarzwald/Crna šuma; Sjeverni Velebit; Ngorongoro; North York Moors; Drina/NP Drina;
      Arches; Great Smoky Mountains; Torres del Paine; Urho Kekkonen; Crater Lake; Đerdap/Djerdap; South Downs;
      Brecon Beacons/Bannau Brycheiniog; Komodo; Pirin; Exmoor; Saguaro; Arcipelago di La Maddalena/La Maddalena; Channel Islands;
      Theodore Roosevelt; Cévennes/Cevennes; Badlands; Gateway Arch; Iguazú/Iguazu/Iguaçu/Iguacu; Wicklow Mountains; Krkonoše/Krkonose;
      Hortobágy/Hortobagy; Cilento; Butrint; Galičica/Galicica; Hohe Tauern; Bavarska šuma/Bayerischer Wald; Kakadu;
      Haleakalā/Haleakala; Great Basin; Glacier; Saska Švicarska/Sächsische Schweiz/Saska Svicarska; Müritz/Muritz; Doñana/Donana;
      Aspromonte; Asinara; Wattenmeer/Vadensko more; Isle Royale; Tierra del Fuego/Ognjena zemlja; Bükk/Bukk; Glenveagh; Theth;
      Port-Cros; Monfragüe/Monfrague; Dovrefjell; Thousand Islands; Aggtelek; Pollino; Gran Sasso; Tikal; Voyageurs;
      Victoria Falls/Viktorijini slapovi; Parnas/Parnassos; Pacific Rim; Šar planina/Sar planina;
      Neusiedler See-Seewinkel/Neusiedlersee; Mammoth Cave; Sequoia/Sekvoja; Kiskunság/Kiskunsag; Guadarrama; Garajonay; Cotopaxi;
      Prespa; Redwood; Dajti; Pieniny; Jasmund; Nemrut Dağı/Nemrut; Valbona/Valbonë; Malá Fatra/Mala Fatra; Dry Tortugas; Olympic;
      Shenandoah; North Cascades; Huascarán/Huascaran; Table Mountain/Stolna planina; Niske Tatre/Nízke Tatry/Nizke Tatry;
      Mount Kenya/Planina Kenija; Guadalupe Mountains; Jim Corbett/Corbett; Periyar; Corcovado; Bruce Peninsula; Skeleton Coast;
      Mesa Verde; Great Barrier Reef/Veliki koralni greben; Sundarbans; Carlsbad Caverns; Toubkal; Prince Albert; Zhangjiajie;
      Queen Elizabeth; Lake Nakuru/Nakuru; Murchison Falls; Chapada Diamantina; Jiuzhaigou; Biogradska gora; Cape Breton Highlands;
      Rapa Nui; Tassili n'Ajjer/Tassili; Una/NP Una; Manu; Aberdare; Abel Tasman; Tsavo; Bryce Canyon; Etosha; K'gari/Fraser Island;
      Chobe; Los Glaciares; Puerto Princesa; Yakushima; Tijuca; Wadi Rum; Sangay; Hot Springs; Hallasan; Congaree; Doi Inthanon;
      Itatiaia; Šumava/Sumava; Wood Buffalo; Češka Švicarska/České Švýcarsko/Ceske Svycarsko; Bale Mountains;
      Švicarski nacionalni park/Schweizerischer Nationalpark; Vanoise; Écrins/Ecrins; Hwange; Lake Manyara/Manyara; Mercantour;
      Calanques; Taman Negara; Hluhluwe-iMfolozi/Hluhluwe; Rocky Mountain; Kootenay; Volcanoes; Mavrovo; Pelister; Seoraksan;
      Darién/Darien; Pilanesberg; Centralni Balkan; Retezat; Los Katíos/Los Katios; Fertő-Hanság/Ferto-Hansag; Cradle Mountain;
      Duna-Dráva/Duna-Drava; Kafue; Jirisan; Egmont/Taranaki; Fiordland; Gesäuse/Gesause; Kalkalpen; Thayatal; Bukhansan; Donau-Auen;
      Serra da Capivara; Hainich; Mana Pools; Stelvio; Selous/Nyerere; Dolomiti Bellunesi; Virunga; Bwindi; Circeo; Majella;
      Wilsons Promontory; Arcipelago Toscano; Royal National Park; Ruaha; Ordesa/Ordesa y Monte Perdido; Timanfaya;
      Caldera de Taburiente; Aigüestortes/Aiguestortes; Cabañeros/Cabaneros; Islas Atlánticas/Islas Atlanticas; Port Campbell;
      Arthur's Pass; Tablas de Daimiel; Banc d'Arguin; Peneda-Gerês/Peneda-Geres; Chitwan; Lorentz; Kinabalu; Pembrokeshire Coast;
      Broads; Burren; Hoge Veluwe; Biesbosch; Weerribben; Hoge Kempen; Niokolo-Koba; Kahuzi-Biega; Bieszczady; Gunung Mulu/Mulu;
      Karkonosze; Słowiński/Slowinski; Ojców/Ojcow; Garamba; Biebrza; Namib-Naukluft; Podyjí/Podyji; Slovenský raj/Slovenski raj;
      Salonga; Rondane; Nuuksio; Oulanka; Pallas-Yllästunturi; Loango; Koli; Sjeveroistočni Grenland/Northeast Greenland; Sagarmatha;
      Shiretoko; Vikos-Aoos; Aoraki/Mount Cook; Kaçkar/Kackar; Olympos-Beydağları; Köprülü Kanyon/Koprulu; Llogara; Divjaka-Karavasta;
      Tubbataha; Piatra Craiului; Cheile Bicazului; Kaziranga; Ceahlău/Ceahlau; Blue Mountains/Plave planine; Karpatski nacionalni park;
      Losiny Ostrov; Paparoa; Kings Canyon; Joshua Tree; Yala; Hawaii Volcanoes; Canyonlands; Capitol Reef; Petrified Forest;
      Mount Aspiring; Big Bend; Wind Cave; White Sands; Glacier Bay; Katmai; Kenai Fjords; Wrangell-St. Elias/Wrangell;
      Gates of the Arctic; Indiana Dunes; Cuyahoga Valley; Biscayne; Pinnacles; Lassen Volcanic; Great Sand Dunes;
      Black Canyon of the Gunnison; New River Gorge; Yoho; Waterton Lakes; Gros Morne; Fundy; Kluane; Nahanni; Riding Mountain;
      La Mauricie; Forillon; Auyuittuq; Elk Island; Mount Revelstoke; Point Pelee; Nahuel Huapi; Lauca; Canaima; Tayrona;
      Manuel Antonio; Arenal; Tortuguero; Madidi; Lençóis Maranhenses/Lencois Maranhenses; Pantanal Matogrossense; Jaú/Jau;
      Vicente Pérez Rosales; Conguillío/Conguillio; Talampaya; Yasuní/Yasuni; Kaieteur; Pico Bonito; Amboseli; South Luangwa; Gorongosa;
      Tarangire; Hell's Gate/Hells Gate; Simien; Addo Elephant/Addo; Kgalagadi; Ranomafana; Andasibe-Mantadia/Andasibe; Pendjari;
      Odzala; Ichkeul; Moremi; Bromo Tengger Semeru/Bromo; Gunung Leuser; Ujung Kulon; Khao Sok; Khao Yai; Phong Nha-Ke Bang/Phong Nha;
      Cuc Phuong; Ranthambore; Gir; Bandhavgarh; Kanha; Fuji-Hakone-Izu; Nikko; Daisetsuzan; Daintree; Litchfield; Nitmiluk; Grampians;
      Freycinet; Purnululu; Karijini; Kosciuszko; Tongariro; Westland; Nelson Lakes`,
  },
  {
    slug: "poluotok-rt",
    group: "opce",
    strip: ["poluotok", "rt", "cape", "peninsula", "cabo", "cap"],
    title: "Poluotok ili rt",
    hint: "Bilo gdje u svijetu, i hrvatski",
    answers: `Istra; Pelješac/Peljesac; Balkanski poluotok/Balkan; Apeninski poluotok/Apenini; Pirenejski poluotok/Iberski poluotok/Pireneji;
      Skandinavski poluotok/Skandinavija; Arapski poluotok/Arabija; Krim; Rt dobre nade/Cape of Good Hope; Rt Horn/Cape Horn;
      Kamčatka/Kamchatka; Peloponez/Peloponnese; Jukatan/Yucatan/Yucatán; Florida; Korejski poluotok/Koreja; Sinaj/Sinajski poluotok;
      Mala Azija/Anatolija; Jutland/Jylland; Bretanja/Bretagne; Halkidiki/Halkidika; Kamenjak/Rt Kamenjak/Premantura; Prevlaka;
      Indokina; Malajski poluotok/Malaka; Aljaska; Labrador; Kalifornijski poluotok/Baja California; Hindustan/Indijski poluotok;
      Somalijski poluotok/Rog Afrike; Kola/Kolski poluotok; Tajmir/Taimyr; Čukotka/Chukotka; Jamal/Yamal; Cape York;
      Antarktički poluotok; Salento; Gargano; Sorrento/Sorentski poluotok; Atos/Athos/Sveta Gora; Kasandra/Kassandra; Sitonija/Sithonia;
      Galipolje/Gallipoli; Kerčki poluotok/Kerč; Tamanski poluotok/Taman; Apšeron/Absheron; Mangišlak/Mangyshlak; Hel; Cotentin;
      Gaspé/Gaspe; Nova Škotska/Nova Scotia; Delmarva; Cape Cod; Olympic Peninsula; Gornji poluotok/Upper Peninsula; Kenai; Seward;
      Valdés/Valdes; Paraguaná/Paraguana; Guajira; Osa; Nicoya; Azuero; Shandong; Liaodong; Leizhou; Kowloon; Boso; Izu; Noto; Kii;
      Musandam; Katar/Qatar; Fav/Al-Faw; Kintyre; Wirral; Cornwall/Kornvol; Gower; Dingle; Mani; Luštica/Lustica; Marjan; Lapad;
      Savudrija; Lun; Oštro/Rt Oštro; Ploča/Rt Ploča/Punta Planka; Cabo da Roca; Finisterre/Fisterra/Cabo Finisterre;
      Land's End/Lands End; Nordkapp/Sjeverni rt/North Cape; Cape Canaveral/Kanaveral/Rt Kennedy; Rt Agulhas/Rt Igala/Cape Agulhas;
      Cap Corse; Cap d'Antibes/Antibes; Cabo de Gata; Rt Sveti Vincent/Cabo de São Vicente/Sao Vicente; Cape Hatteras/Hatteras;
      Arkona/Kap Arkona; Grenen; Tenar/Matapan; Sunion/Sounion; Cape Spear; Rt Dežnjev/Dežnjev/Dezhnev;
      Rt Čeljuskin/Čeljuskin/Chelyuskin; Kanyakumari/Rt Komorin/Comorin; Cap Bon; Zeleni rt/Cap-Vert/Cape Verde; Rt Reinga/Cape Reinga;
      Cape Byron; Cape Farewell/Rt Farvel; Cape Leeuwin; Cabo San Lucas; Tarifa/Punta de Tarifa; Cap Gris-Nez/Gris Nez;
      Formentor/Cap de Formentor; Gibraltar; Monte Argentario/Argentario; Punta Križa/Križa; Kalabrija/Calabria; Rt Kolka/Kolka;
      Darss/Fischland-Darss; Banks Peninsula; Coromandel; Otago Peninsula; Mornington; Eyre Peninsula/Eyre; Yorke Peninsula;
      Arnhem Land; Dampier; Kathiawar; Kanin; Sambija/Sambia; Avalon; Burin; Ungava; Melville; Boothia; Brunswick/Brunswick Peninsula;
      Taitao; Llŷn/Lleyn; Ards; Inishowen; Beara; Iveragh/Ring of Kerry; Mizen Head; Malin Head; Lizard/Lizard Point; Dungeness;
      Beachy Head; Flamborough Head; Mull of Kintyre; Duncansby Head; Dunnet Head; Cap de la Hague/La Hague; Pointe du Raz; Quiberon;
      Crozon; Giens; Cap Ferret; Cap Ferrat/Saint-Jean-Cap-Ferrat; Cap de Creus; Cabo de Palos; Cabo de la Nao; Trafalgar/Rt Trafalgar;
      Cabo Ortegal; Peniche; Tróia/Troia; Cabo Espichel; Sagres/Ponta de Sagres; Capo Passero; Capo Spartivento; Capo Testa;
      Capo Miseno; Capo Peloro; Circeo/Monte Circeo; Conero; Portofino; Sirmione; Piranski poluotok/Piran; Zlatni rat; Sustipan; Klek;
      Bodrum; Datça/Datca; Çeşme/Cesme; Karaburun; Biga; Kocaeli; Pelion/Pilion; Methana; Argolida/Argolis; Atika/Attika;
      Gidanski poluotok/Gydan; Bataan; Zamboanga; Bicol; Macau/Makao=0.1; Rtski poluotok/Cape Peninsula; Cape Point;
      Ras Nouadhibou/Cap Blanc; Punta Gallinas; Cabo San Antonio; Cape Flattery; Point Barrow/Rt Barrow; Cape Prince of Wales; Cape May;
      Cape Ann; Montauk; Point Reyes; Cape Mendocino; Cape Fear; Cape Sable; Monterey; Palos Verdes; Donji poluotok/Lower Peninsula;
      Door Peninsula; Keweenaw; Niagarski poluotok/Niagara Peninsula; Bruce Peninsula; Samaná/Samana; Paria; Araya; Fleurieu; Mahia;
      Cape Tribulation; Cape Otway; Tasmanov poluotok/Tasman Peninsula; Freycinet Peninsula; Cape Naturaliste; Peron`,
  },
  {
    slug: "blagdan",
    group: "opce",
    title: "Blagdan ili praznik",
    hint: "Vjerski ili državni, bilo gdje u svijetu",
    answers: `Božić/Bozic; Uskrs; Nova godina; Valentinovo/Dan zaljubljenih/Sveti Valentin; Noć vještica/Halloween/Noc vjestica;
      Badnjak/Badnja večer; Sveta tri kralja/Tri kralja/Bogojavljenje/Vodokršće; Svi sveti/Dan svih svetih;
      Velika Gospa/Uznesenje Marijino/Gospa; Majčin dan/Majcin dan; Praznik rada/Prvi maj/Prvi svibnja/Dan rada; Tijelovo;
      Duhovi/Pedesetnica; Dan državnosti; Dušni dan/Dan mrtvih/Dusni dan; Stjepanje/Sveti Stjepan; Cvjetnica/Nedjelja Cvjetnica;
      Veliki petak; Pepelnica/Čista srijeda; Sveti Nikola/Nikolinje/Nikoljdan; Dan neovisnosti; Dan zahvalnosti/Thanksgiving;
      Očev dan/Dan očeva/Ocev dan; Bajram/Ramazanski bajram/Eid; Kurban-bajram/Kurban bajram;
      Dan pobjede i domovinske zahvalnosti/Dan pobjede/Oluja; Dan antifašističke borbe; Dan sjećanja na Vukovar/Dan sjećanja;
      Ramazan/Ramadan; Hanuka/Hanukkah/Chanukah; Pasha/Pesah/Pesach; Diwali/Divali; Kineska Nova godina/Proljetni festival;
      Dan žena/Međunarodni dan žena/Osmi mart; Martinje/Sveti Martin; Sveta Lucija/Lucija; Karneval/Fašnik/Poklade/Maškare;
      Veliki četvrtak/Veliki cetvrtak; Velika subota; Uskrsni ponedjeljak/Uskršnji ponedjeljak; Uzašašće/Spasovo/Uzasasce;
      Sveti Josip/Josipovo; Ivanje/Sveti Ivan/Ivandan/Ivanjdan/Midsommar; Sveti Vlaho/Festa svetog Vlaha; Sveti Duje/Sudamja;
      Petrovo/Sveti Petar/Petrovdan; Antunovo/Sveti Antun; Jurjevo/Đurđevdan/Djurdjevdan/Sveti Juraj; Vidovdan; Krsna slava/Slava;
      Savindan/Sveti Sava; Mitrovdan; Ilindan/Sveti Ilija; Pravoslavni Božić; Pravoslavna Nova godina/Srpska Nova godina; Mevlud/Mawlid;
      Lejletul-kadr/Lejletul kadr; Jom kipur/Yom Kippur; Roš hašana/Rosh Hashanah; Purim; Šavuot/Shavuot; Sukot/Sukkot; Holi; Vesak;
      Dan nezavisnosti SAD/Četvrti srpnja/Fourth of July/Independence Day; Dan Bastilje/Quatorze Juillet;
      Dan svetog Patrika/St. Patrick's Day/Patrikovo; Guy Fawkes/Noć krijesova/Bonfire Night; Día de los Muertos/Dia de los Muertos;
      Maslenica; Sretenje/Svijećnica/Svijecnica; Dan nezavisnosti BiH; Dan državnosti BiH; Dan pobjede nad fašizmom; Dan Europe;
      Dan Republike; Dan mladosti/Štafeta mladosti; Dan borca; Dan ustanka; Novruz/Nowruz/Navruz; Dan planeta Zemlje/Dan Zemlje;
      Boxing Day; Dan djeteta/Dan djece; Dan učitelja; Dan kruha; Blagovijest/Navještenje; Bezgrešno začeće/Bezgrješno začeće;
      Mala Gospa/Rođenje Marijino; Krštenje Gospodinovo; Bijela nedjelja; Silvestrovo/Stara godina; Kraljev dan/Koningsdag;
      Dan Australije/Australia Day; Dan Kanade/Canada Day; Cinco de Mayo; Juneteenth; Memorial Day; Labor Day;
      Dan Martina Luthera Kinga/MLK Day; Dan predsjednika/Presidents' Day; Kolumbov dan/Columbus Day; Dan veterana/Veterans Day;
      Anzac Day/Anzac; Waitangi Day; Dan njemačkog jedinstva/Tag der Deutschen Einheit; Obon; Chuseok; Songkran; Tet; Navratri;
      Durga puja; Ganesh Chaturthi; Raksha Bandhan; Ašura/Ashura; Vaisakhi/Baisakhi; Hanami; Festival lampiona/Lantern Festival;
      Festival zmajevih čamaca/Dragon Boat; Dan nezavisnosti Indije; Dan Republike Indije; Dan Ujedinjenih naroda/Dan UN-a;
      Dan ljudskih prava; Dan Hrvatskog sabora; Uskrs pravoslavni/Pravoslavni Uskrs; Dan grada Zagreba; Dan oslobođenja;
      Sveti Blaž/Blaževo; Sveti Roko/Rokovo; Sveti Vid/Vidovo; Sveti Mihovil/Miholje; Sveta Ana; Sveta Kata/Katarinje;
      Sveti Luka/Lukovo; Sveti Šimun; Sveti Florijan/Florijanovo; Sveti Andrija; Advent/Došašće=0.3; Korizma=0.3;
      Prvi april/Dan šale/Prvoaprilska šala; Krist Kralj; Presveto Srce Isusovo/Srce Isusovo; Presveto Trojstvo/Trojstvo;
      Preobraženje/Preobrazenje; Uzvišenje Svetog Križa/Krstovdan/Križevo; Gospa Lurdska; Sveti Jakov/Jakovlje;
      Sveti Lovro/Lovrinac/Lovrijenac; Sveti Marko/Markovo; Sveti Klement; Vincekovo/Sveti Vinko/Vinkovo; Sveti Grgur;
      Sveti Franjo/Franjevo; Sveti Kvirin; Sveta Eufemija/Fumija; Tripundan/Sveti Tripun; Sveta Stošija; Sveti Krševan; Sveti Jeronim;
      Sveti Ćiril i Metod/Ćirilo i Metodije; Lazareva subota/Vrbica; Aranđelovdan/Arandjelovdan/Sveti Mihael;
      Vasiljevdan/Sveti Vasilije; Materice; Oci; Detinjci; Zadušnice/Zadusnice; Pokrov; Vavedenje; Uspenje;
      Hidžretska Nova godina/Islamska Nova godina; Lejletul-miradž/Miradž/Lejletul miradz; Lejletul-berat/Berat;
      Ederlezi/Hidrellez/Hidrelez; Tu bišvat/Tu bishvat; Simhat Tora; Lag baomer; Tiša be'av/Tisha bav; Ivan Kupala;
      Valpurgina noć/Walpurgisnacht/Valpurgijska noć; Beltane; Samhain; Imbolc; Yule/Jul; Hogmanay; Burns Night;
      Dan svetog Davida/St David's Day; Pokladni utorak/Mardi Gras/Debeli utorak; Inti Raymi; Dan nezavisnosti Meksika;
      Nacionalni dan Kine/Zlatni tjedan; Dan djece u Japanu/Kodomo no hi; Tanabata; Shichi-Go-San; Setsubun; Seollal; Pongal; Onam;
      Mahashivratri/Maha Shivaratri; Janmashtami; Ram Navami; Dussehra/Dasara; Thaipusam; Loi Krathong; Nyepi; Losar; Naadam;
      Dan Rusije; Švicarski nacionalni dan/Dan Švicarske; Dan norveškog ustava/Syttende mai; Dan Švedske; Dan grčke neovisnosti;
      Dan Ohi/Ohi; Dan Portugala; Dan hispanidada/Día de la Hispanidad/Hispanidad; Festa della Repubblica/Dan Talijanske Republike;
      Dan oslobođenja Italije/Festa della Liberazione; Dan nezavisnosti Poljske; Dan ujedinjenja Rumunjske; Dan državnosti Slovenije;
      Prešernov dan/Presernov dan; Dan reformacije; Dan primirja/Armistice Day`,
  },
  {
    slug: "religija",
    group: "opce",
    strip: ["crkva"],
    title: "Religija, vjera ili vjerska zajednica",
    hint: "Vrijede i ogranci, crkve i sekte",
    answers: `Kršćanstvo/Krscanstvo; Islam; Katoličanstvo/Katolicizam/Katolička crkva/Rimokatolici; Pravoslavlje/Pravoslavna crkva; Budizam;
      Judaizam/Židovstvo/Zidovstvo; Hinduizam; Protestantizam/Protestanti; Jehovini svjedoci/Jehovini; Sikhizam/Siki;
      Šintoizam/Sintoizam/Shinto; Taoizam/Daoizam; Konfucijanizam; Mormoni/Crkva Isusa Krista svetaca posljednjih dana;
      Adventisti/Adventistička crkva; Luteranstvo/Luterani/Evangelička crkva; Kalvinizam/Kalvinisti/Reformirana crkva;
      Anglikanstvo/Anglikanska crkva/Crkva Engleske; Scijentologija/Scientologija; Sunizam/Suniti; Šiizam/Šiiti/Siiti; Baptisti;
      Metodisti; Pentekostalci/Pentekostalna crkva; Evangelici; Džainizam/Jainizam/Dzainizam; Zoroastrizam/Zaratustrizam;
      Bahaizam/Bahai; Hare Krišna/Hare Krishna/ISKCON; Rastafarijanstvo/Rastafari; Vudu/Voodoo/Vodou; Bogumili; Katari/Albigenzi;
      Arijanstvo/Arijanci; Kvekeri; Amiši/Amisi; Menoniti; Husiti; Valdenzi; Prezbiterijanci; Sufizam/Sufije; Druzi; Jazidi/Jezidi;
      Alaviti/Aleviti; Vehabizam/Vahabizam/Selefije; Ahmadije/Ahmadija; Koptska crkva/Kopti; Etiopska pravoslavna crkva;
      Armenska apostolska crkva; Grkokatolici/Unijati; Starokatolici; Nestorijanci; Hasidizam/Hasidi; Ortodoksni judaizam;
      Reformni judaizam; Karaiti; Samaritanci; Theravada; Mahayana/Mahajana; Zen budizam/Zen; Tibetanski budizam/Vajrayana/Lamaizam;
      Vaišnavizam/Vaisnavizam; Šaivizam/Saivizam; Santería/Santeria; Candomblé/Candomble; Wicca; Neopoganstvo/Novopoganstvo;
      Rodnovjerje/Slavenska vjera; Šamanizam/Samanizam; Animizam; Mitraizam; Gnosticizam; Maniheizam; Kaodaizam/Cao Dai; Tenrikyo;
      Falun Gong; Unitarijanci; Kristadelfijanci; Vojska spasa; Nazareni; Maroniti; Kaldejci; Sirijska pravoslavna crkva;
      Asirska crkva Istoka; Tengrizam; Bon; Srpska pravoslavna crkva; Ruska pravoslavna crkva; Grčka pravoslavna crkva;
      Makedonska pravoslavna crkva; Bugarska pravoslavna crkva; Rumunjska pravoslavna crkva; Islamska zajednica;
      Hrvatska starokatolička crkva=0.05; Dukhobori/Duhobori; Starovjerci/Staroobredci; Ibaditi; Ismailiti; Deizam=0.1; Panteizam=0.1;
      Satanizam; Raelijanci/Raelizam; Shugendo; Yoruba religija/Yoruba; Vedizam; Moravska braća/Hernhuti; Molokani; Subbotnici=0.02;
      Novoapostolska crkva; Kristova zajednica/Christian Science/Kršćanska znanost`,
  },
];

const kviz: Nova[] = [
  {
    slug: "neovisnost-1945",
    group: "kviz",
    title: "Članica UN-a koja je postala neovisna 1945. ili kasnije",
    hint: "Vrijede i države koje su nastale raspadom Jugoslavije, SSSR-a i Čehoslovačke",
    answers: `Hrvatska; Slovenija; Bosna i Hercegovina/BiH; Indija; Ukrajina; Srbija; Crna Gora; Sjeverna Makedonija/Makedonija; Izrael;
      Pakistan; Češka; Slovačka; Litva; Latvija; Estonija; Bjelorusija; Alžir; Kazahstan; Gruzija; Armenija; Azerbajdžan;
      Moldavija/Moldova; Uzbekistan; Kirgistan/Kirgizija; Tadžikistan; Turkmenistan; Bangladeš/Banglades; Indonezija; Vijetnam;
      Južna Koreja; Sjeverna Koreja; Filipini; Singapur; Malezija; Cipar; Malta; Jamajka; Kenija; Nigerija; Gana; Maroko; Tunis; Libija;
      Sudan; Južni Sudan; Eritreja; Namibija; Zimbabve; Angola; Mozambik; DR Kongo/Demokratska Republika Kongo/Zair;
      Kongo/Republika Kongo; Kamerun; Senegal; Mali; Obala Bjelokosti/Côte d'Ivoire; Madagaskar; Somalija; Tanzanija; Uganda; Ruanda;
      Burundi; Zambija; Malavi; Šri Lanka/Sri Lanka/Cejlon; Mjanmar/Burma; Sirija; Jordan; Laos; Kambodža/Kambodza; Kuvajt; Katar;
      Bahrein; Ujedinjeni Arapski Emirati/UAE/Emirati; Jemen; Maldivi; Brunej; Istočni Timor/Timor-Leste; Gvineja; Togo; Benin; Niger;
      Burkina Faso/Gornja Volta; Čad/Cad; Srednjoafrička Republika; Gabon; Mauritanija; Sijera Leone; Gambija; Bocvana; Lesoto;
      Mauricijus; Esvatini/Svazi; Ekvatorska Gvineja; Gvineja Bisau; Zelenortska Republika/Zelenortski Otoci; Komori;
      Sveti Toma i Princip; Sejšeli/Sejseli; Džibuti/Dzibuti; Trinidad i Tobago; Barbados; Gvajana; Bahami; Grenada; Surinam; Dominika;
      Sveta Lucija; Sveti Vincent i Grenadini; Belize; Antigva i Barbuda; Sveti Kristofor i Nevis; Samoa; Nauru; Fidži/Fidzi; Tonga;
      Papua Nova Gvineja; Tuvalu; Solomonski Otoci; Kiribati; Vanuatu; Maršalovi Otoci/Marshallovi Otoci; Mikronezija; Palau`,
  },
  {
    slug: "zastava-crvena",
    group: "kviz",
    strip: ["republika"],
    title: "Država s crvenom bojom na zastavi",
    hint: "Crvena kao jedna od boja zastave; sitni detalji grba se ne računaju",
    answers: `Hrvatska; Japan; Kanada; Švicarska; SAD/Amerika; Turska; Kina; Danska; Austrija; Njemačka; Francuska; Italija; Španjolska;
      Ujedinjeno Kraljevstvo/UK/Velika Britanija/Engleska; Srbija; Crna Gora; Poljska; Albanija; Rusija; Indonezija; Monako; Slovenija;
      Češka; Slovačka; Nizozemska; Belgija; Luksemburg; Norveška; Island; Portugal; Mađarska/Madjarska; Rumunjska; Bugarska;
      Sjeverna Makedonija/Makedonija; Latvija; Litva; Bjelorusija; Moldavija/Moldova; Gruzija; Armenija; Azerbajdžan; Uzbekistan;
      Kirgistan/Kirgizija; Tadžikistan; Turkmenistan; Iran; Irak; Sirija; Jordan; Libanon; Egipat; Libija; Tunis; Maroko; Alžir; Sudan;
      Južni Sudan; Etiopija; Eritreja; Kenija; Uganda; Mozambik; Zimbabve; Zambija; Malavi; Angola; Namibija;
      Južnoafrička Republika/JAR/Južna Afrika; Esvatini/Svazi; Madagaskar; Mauricijus; Sejšeli; Komori; Burundi;
      DR Kongo/Demokratska Republika Kongo; Kongo/Republika Kongo; Srednjoafrička Republika; Kamerun; Čad; Benin; Togo; Gana;
      Burkina Faso; Mali; Senegal; Gvineja; Gvineja Bisau; Gambija; Zelenortska Republika/Zelenortski Otoci; Liberija; Mauritanija;
      Ekvatorska Gvineja; Sveti Toma i Princip; Džibuti/Dzibuti; Nepal; Bangladeš/Banglades; Šri Lanka; Mjanmar/Burma; Tajland; Laos;
      Kambodža; Vijetnam; Malezija; Singapur; Filipini; Istočni Timor; Južna Koreja; Sjeverna Koreja; Mongolija; Tajvan; Bahrein; Katar;
      Kuvajt; Oman; Jemen; Ujedinjeni Arapski Emirati/UAE/Emirati; Australija; Novi Zeland; Papua Nova Gvineja; Samoa; Tonga; Kiribati;
      Vanuatu; Tuvalu; Fidži/Fidzi; Meksiko; Kuba; Kostarika; Panama; Čile; Peru; Kolumbija; Venezuela; Ekvador; Bolivija; Paragvaj;
      Haiti; Dominikanska Republika; Trinidad i Tobago; Gvajana; Surinam; Grenada; Dominika; Belize; Antigva i Barbuda;
      Sveti Kristofor i Nevis; Malta; Maldivi; Lihtenštajn; Andora`,
  },
  {
    slug: "metro-grad",
    group: "kviz",
    title: "Grad s podzemnom željeznicom (metroom)",
    hint: "Metro ili sličan brzi gradski sustav koji danas vozi",
    answers: `London; Pariz/Paris; Berlin; Tokio/Tokyo; Istanbul; Barcelona; Chicago/Čikago; Beč/Wien/Vienna; Los Angeles; Prag/Praha/Prague;
      Moskva/Moscow; Milano/Milan; Budimpešta/Budapest; Amsterdam; Toronto; Boston; Madrid; San Francisco; Lyon/Lion; Montreal;
      München/Munchen/Minhen/Munich; Atena/Athens; Hamburg; Kopenhagen/Copenhagen; Stockholm/Stokholm; Varšava/Warsaw/Warszawa;
      Lisabon/Lisbon; Glasgow; Dubai; Bruxelles/Brisel/Brussels; Napulj/Napoli/Naples; Marseille/Marselj; Oslo; Mumbai/Bombaj;
      Kijev/Kyiv; Singapur/Singapore; Bukurešt/Bucharest; Hong Kong; Valencia; Teheran/Tehran; Helsinki; Sofija/Sofia; Meka/Mekka/Mecca;
      Džakarta/Jakarta; Torino/Turin; Genova/Genoa; Delhi/New Delhi; Solun/Thessaloniki; Málaga/Malaga; Lagos; Bilbao; Hyderabad;
      Bangkok; Kolkata/Kalkuta; Bangalore/Bengaluru; Ho Chi Minh/Saigon; Kairo/Cairo; Rijad/Riyadh; Tbilisi; Chennai/Madras;
      Toulouse/Tuluz; Baku; Rotterdam; Ankara; Porto; Chongqing; Šangaj/Shanghai; Kuala Lumpur; Peking/Beijing; Lille/Lil;
      Almati/Almaty; Minsk; Seul/Seoul; Taškent/Tashkent; Guangzhou/Kanton; Lahore; Manila; New York/Njujork; Doha; Dhaka/Daka;
      Novosibirsk; Washington/Vašington; Catania; Taipei; Philadelphia/Filadelfija; Lausanne/Lozana; Rennes; Brescia; Osaka; Atlanta;
      Meksiko/Mexico City/Ciudad de México; Bursa; Kazanj/Kazan; Ahmedabad; Hanoi; Alžir/Algiers; Kjoto/Kyoto; Shenzhen;
      Vancouver/Vankuver; Rim/Roma; Isfahan; Miami/Majami; Mašhad/Mashhad; Pune; Adana; Panama/Panamá; Jaipur; Lucknow;
      Pjongjang/Pyongyang; Nürnberg/Nurnberg/Nirnberg; Sevilla; Baltimore; Sankt Peterburg/Petrograd/Lenjingrad; Dnjipro/Dnipro;
      Chengdu; Rio de Janeiro/Rio; Tabriz; Sydney/Sidnej; Busan; Kochi; Nanjing/Nanking; Sao Paulo/São Paulo; Samara; Buenos Aires;
      Sapporo; Shiraz; Nagpur; Jokohama/Yokohama; Newcastle; Nagoja/Nagoya; Xi'an/Xian; Hangzhou; Kanpur; Cleveland; Izmir; Harbin;
      Inčheon/Incheon; Honolulu; Fukuoka; Palma; Harkiv/Harkov; Kobe; Tianjin; Wuhan; Erevan/Jerevan; Kaohsiung; Caracas; Jekaterinburg;
      Nižnji Novgorod; Daegu; Guadalajara; Karadž/Karaj; Suzhou; Qingdao; Gwangju; Shenyang; Brasília/Brasilia; Sendai; Monterrey;
      Daejeon; Kunming; Dalian; Taichung; Lima; Santiago/Santiago de Chile; Xiamen; Changsha; Medellín/Medellin; Zhengzhou; Fuzhou;
      Ningbo; Luoyang; Belo Horizonte; Santo Domingo; Quito; Lanzhou; Hefei; Recife; Changchun; Wuxi; Jinan; Dongguan; Porto Alegre;
      Nanning; Hohhot; Nanchang; Shijiazhuang; Guiyang; Foshan; Taiyuan; Fortaleza; Wenzhou; Changzhou; Xuzhou; Charleroi; Shaoxing;
      Valparaíso/Valparaiso; Urumqi; Salvador; Nantong; Maracaibo; San Juan`,
  },
];

const kviz2: Nova[] = [
  {
    slug: "real-barca",
    group: "kviz",
    title: "Nogometaš Real Madrida ili Barcelone",
    hint: "Bilo kad, za prvu momčad",
    answers: `Lionel Messi/Messi/Leo Messi; Cristiano Ronaldo/Ronaldo/CR7/Kristijano Ronaldo; Neymar; Luka Modrić/Modrić/Modric;
      Zinedine Zidane/Zidane/Zidan; Ronaldinho; Diego Maradona/Maradona; David Beckham/Beckham; Kylian Mbappé/Mbappe;
      Jude Bellingham/Bellingham; Lamine Yamal/Yamal; Sergio Ramos/Ramos; Karim Benzema/Benzema; Luis Suárez/Suarez;
      Vinícius Júnior/Vinicius/Vini Jr; Robert Lewandowski/Lewandowski; Zlatan Ibrahimović/Ibrahimović/Zlatan; Gerard Piqué/Pique;
      Johan Cruyff/Cruyff/Krojf; Thierry Henry/Henry; Gareth Bale/Bale; Roberto Carlos; Andrés Iniesta/Iniesta; Casemiro;
      Iker Casillas/Casillas; Pedri; Xabi Alonso; Mateo Kovačić/Kovačić/Kovacic; Toni Kroos/Kroos; Kaká/Kaka; Samuel Eto'o/Eto'o/Etoo;
      Romário/Romario; Rivaldo; Ángel Di María/Di Maria; Thibaut Courtois/Courtois; Michael Owen/Owen; Mesut Özil/Ozil;
      Davor Šuker/Šuker/Suker; Ivan Rakitić/Rakitić/Rakitic; Achraf Hakimi/Hakimi; Brahim Díaz/Brahim; Carles Puyol/Puyol;
      Sergio Busquets/Busquets; Ferenc Puskás/Puskas/Puškaš; Fabio Cannavaro/Cannavaro; Eden Hazard/Hazard; Martin Ødegaard/Odegaard;
      Federico Valverde/Fede Valverde; Ronald Koeman/Koeman; Alfredo Di Stéfano/Di Stefano; Clarence Seedorf/Seedorf;
      Dani Alves/Daniel Alves; David Alaba/Alaba; Jordi Alba; Arjen Robben/Robben; Ruud van Nistelrooy/van Nistelrooy;
      Raúl/Raul/Raúl González; Robert Prosinečki/Prosinečki/Prosinecki; Rodrygo; Arda Güler/Arda Guler; Álvaro Morata/Morata;
      Trent Alexander-Arnold/Alexander-Arnold; Gonzalo Higuaín/Higuain; Dani Carvajal/Carvajal; Antonio Rüdiger/Rudiger;
      Álvaro Arbeloa/Arbeloa; Aurélien Tchouaméni/Tchouameni; Nicolas Anelka/Anelka; Dean Huijsen/Huijsen; Eduardo Camavinga/Camavinga;
      Raphaël Varane/Varane; Hugo Sánchez/Hugo Sanchez; Gheorghe Hagi/Hagi; Wesley Sneijder/Sneijder;
      Ronaldo Nazário/Ronaldo Fenomeno/R9; Ousmane Dembélé/Dembele; Luis Enrique; Michael Laudrup/Laudrup; Marco Asensio/Asensio;
      Antoine Griezmann/Griezmann; Kepa Arrizabalaga/Kepa; Franco Mastantuono/Mastantuono; Robinho; Álvaro Carreras/Carreras;
      Pep Guardiola/Guardiola; Isco; Fernando Hierro/Hierro; Keylor Navas/Navas; Rafael van der Vaart/van der Vaart;
      Éder Militão/Militao; Steve McManaman/McManaman; Alexis Sánchez/Alexis Sanchez; Endrick; Ferland Mendy;
      Predrag Mijatović/Mijatović; Dani Ceballos/Ceballos; Luka Jović/Jović/Jovic; Gabriel Heinze/Heinze; Klaas-Jan Huntelaar/Huntelaar;
      Claude Makélélé/Makelele; Philippe Coutinho/Coutinho; Lucas Vázquez/Lucas Vazquez; Emmanuel Adebayor/Adebayor;
      Fernando Redondo/Redondo; Raymond Kopa/Kopa; Emilio Butragueño/Butragueño; Ferran Torres; Henrik Larsson/Larsson;
      Gary Lineker/Lineker; Joselu; Xavi/Xavi Hernández; Sami Khedira/Khedira; Yaya Touré/Yaya Toure; Jonathan Woodgate/Woodgate;
      Raphinha; Cesc Fàbregas/Fabregas; Andriy Lunin/Lunin; Francisco Gento/Paco Gento/Gento; Julen Lopetegui/Lopetegui;
      Vicente del Bosque/Del Bosque; Guti; Ricardo Carvalho; Esteban Cambiasso/Cambiasso; Lassana Diarra; Edgar Davids/Davids;
      Ronald Araújo/Araujo; David Villa/Villa; Christian Karembeu/Karembeu; Marc-André ter Stegen/ter Stegen; Lilian Thuram/Thuram;
      Thomas Gravesen/Gravesen; Jerzy Dudek/Dudek; Marcus Rashford/Rashford; Dani Olmo/Olmo; Walter Samuel; Deco; Arturo Vidal/Vidal;
      Santiago Solari/Solari; Antonio Cassano/Cassano; Memphis Depay/Memphis; Pierre-Emerick Aubameyang/Aubameyang; Arda Turan/Arda;
      João Cancelo/Cancelo; Mariano Díaz/Mariano; Giovanni van Bronckhorst/van Bronckhorst; Patrick Kluivert/Kluivert;
      João Félix/Joao Felix; Pau Cubarsí/Cubarsi; Luis Figo/Figo; Míchel Salgado/Salgado; Sergio Agüero/Aguero; Lucas Digne/Digne;
      Mark Hughes; Hristo Stoičkov/Stoičkov/Stoichkov; Mark van Bommel/van Bommel; Thiago Alcântara/Thiago; Iván Zamorano/Zamorano;
      Frenkie de Jong/de Jong; Gavi; Ansu Fati/Ansu; Christian Panucci/Panucci; Javier Mascherano/Mascherano; Nuri Şahin/Nuri Sahin;
      Jules Koundé/Kounde; Raúl Albiol/Albiol; Frank de Boer; Bojan Krkić/Bojan; Javier Saviola/Saviola; Marcelo;
      Júlio Baptista/Julio Baptista; Royston Drenthe/Drenthe; Pepe; Fábio Coentrão/Coentrao; Sergiño Dest/Dest; Iván Helguera/Helguera;
      Eric Abidal/Abidal; Marc Overmars/Overmars; Gianluca Zambrotta/Zambrotta; Kevin-Prince Boateng/Boateng; Jari Litmanen/Litmanen;
      Christoph Metzelder/Metzelder; Jesús Vallejo/Vallejo; Mahamadou Diarra; Paul Breitner/Breitner; Víctor Valdés/Victor Valdes;
      Nacho/Nacho Fernández; Hamit Altıntop/Altintop; Bernd Schuster/Schuster; İlkay Gündoğan/Gundogan; Laurie Cunningham/Cunningham;
      José Santamaría/Santamaria; Wojciech Szczęsny/Szczesny; Fermín López/Fermin; Miralem Pjanić/Pjanić/Pjanic; Sándor Kocsis/Kocsis;
      Borja Mayoral; Esteban Granero/Granero; Bodo Illgner/Illgner; Franck Kessié/Kessie; Ronald de Boer; Ludovic Giuly/Giuly;
      Héctor Bellerín/Bellerin; Phillip Cocu/Cocu; Samuel Umtiti/Umtiti; Andoni Zubizarreta/Zubizarreta; Seydou Keita/Keita;
      Sergi Roberto; Nélson Semedo/Semedo; Pirri; Günter Netzer/Netzer; Riqui Puig; Manolo Sanchís/Sanchis;
      José Antonio Camacho/Camacho; Fran García; Diego López; Boudewijn Zenden/Zenden; Francisco Trincão/Trincão; Alejandro Balde/Balde;
      Marc Bartra/Bartra; Theo Hernández/Theo Hernandez; Ricardo Zamora/Zamora; Emerson; Andreas Christensen/Christensen;
      Gerard Deulofeu/Deulofeu; Albert Celades/Celades; Uli Stielike/Stielike; Michael Reiziger/Reiziger;
      Rafael Martín Vázquez/Martín Vázquez; Miguel Ángel Nadal/Nadal; Txiki Begiristain/Begiristain; Rafael Márquez/Rafa Marquez;
      Clément Lenglet/Lenglet; Joan García; Johan Neeskens/Neeskens; Alfonso Pérez/Alfonso; Allan Simonsen/Simonsen; Vitor Roque;
      Juan Román Riquelme/Riquelme; Josep Samitier/Samitier; Rafael Gordillo/Gordillo; Oriol Romeu; Marc Casadó/Casado;
      Steve Archibald/Archibald; Martin Braithwaite/Braithwaite; Míchel; Gheorghe Popescu/Popescu; Juanito; Luuk de Jong;
      Robert Enke/Enke; Santillana; Thomas Vermaelen/Vermaelen; Munir El Haddadi/Munir; László Kubala/Kubala/Ladislao Kubala;
      Albert Ferrer/Ferrer; Jean-Clair Todibo/Todibo; Thiago Motta/Motta; Emmanuel Petit/Petit; Laurent Blanc/Blanc;
      Luis Molowny/Molowny; André Gomes; Cristian Tello/Tello; Hans Krankl/Krankl; Amancio; José Mari Bakero/Bakero; Emerson Royal;
      Julio Salinas/Salinas; Ilaix Moriba; Ruud Hesp/Hesp; Jérémy Mathieu/Mathieu; Maxi López; Guillermo Amor/Amor;
      Carles Rexach/Rexach; Paulinho; Claudio Bravo; Paco Alcácer/Alcacer; Zoltán Czibor/Czibor; Dani García; Eusebio Sacristán/Eusebio;
      Iñaki Peña/Inaki Pena; Quini; Juliano Belletti/Belletti; Hugo Sotil/Sotil; Martín Montoya/Montoya; Pedro/Pedro Rodríguez;
      Sylvinho; Lobo Carrasco/Carrasco; Carles Aleñá/Alena; Migueli; Gaizka Mendieta/Mendieta; Antoni Ramallets/Ramallets;
      César Rodríguez/César; Jasper Cillessen/Cillessen; Rüştü Reçber/Rustu; Sergi Barjuan/Sergi; Abelardo; Rafinha/Rafinha Alcântara;
      Edmílson/Edmilson; Evaristo; José Manuel Pinto/Pinto; Simão Sabrosa/Simao; Adama Traoré; Meho Kodro/Kodro; Sonny Anderson;
      Vítor Baía/Vitor Baia; Juan Antonio Pizzi/Pizzi; Eric García; Malcom; Iván de la Peña/De la Peña; Patrik Andersson; Geovanni;
      Roberto Bonano/Bonano; Philippe Christanval/Christanval; Íñigo Martínez/Inigo Martinez; José Ramón Alexanko/Alexanko;
      Marcos Alonso; Jon Andoni Goikoetxea/Goikoetxea; Víctor Muñoz/Victor Munoz; Neto; Giovanni; Roger García;
      Javier Urruticoechea/Urruti; Oleguer; Óscar García`,
  },
  {
    slug: "izam",
    group: "kviz",
    title: "Pojam koji završava na -izam",
    hint: "Npr. komunizam, turizam, impresionizam",
    answers: `Komunizam; Socijalizam; Kapitalizam; Fašizam; Nacizam/Nacionalsocijalizam; Turizam; Feminizam; Nacionalizam; Rasizam; Alkoholizam;
      Liberalizam; Impresionizam; Realizam; Kubizam; Ekspresionizam; Nadrealizam; Romantizam; Optimizam; Pesimizam; Terorizam;
      Anarhizam; Konzervativizam; Budizam; Hinduizam; Ateizam; Patriotizam; Egoizam; Altruizam; Autizam; Daltonizam; Reumatizam;
      Magnetizam; Organizam; Mehanizam; Metabolizam; Marksizam; Lenjinizam; Staljinizam; Titoizam; Maoizam; Trockizam; Imperijalizam;
      Kolonijalizam; Totalitarizam; Populizam; Ekstremizam; Fundamentalizam; Radikalizam; Pacifizam; Militarizam; Humanizam; Modernizam;
      Postmodernizam; Klasicizam; Simbolizam; Futurizam; Dadaizam; Minimalizam; Naturalizam; Idealizam; Materijalizam;
      Egzistencijalizam; Empirizam; Racionalizam; Pozitivizam; Utilitarizam; Pragmatizam; Stoicizam; Epikureizam; Cinizam; Skepticizam;
      Teizam; Deizam; Panteizam; Monoteizam; Politeizam; Agnosticizam; Judaizam; Islamizam; Katolicizam; Protestantizam; Kalvinizam;
      Luteranizam; Sikhizam; Taoizam; Šintoizam/Sintoizam; Konfucijanizam; Sufizam; Hasidizam; Zoroastrizam; Misticizam; Okultizam;
      Spiritizam; Satanizam; Sekularizam; Klerikalizam; Autoritarizam; Despotizam; Apsolutizam; Feudalizam; Neokolonijalizam;
      Globalizam; Regionalizam; Federalizam; Unitarizam; Centralizam; Separatizam; Iredentizam; Šovinizam/Sovinizam; Antisemitizam;
      Cionizam; Panslavizam; Ilirizam; Jugoslavizam; Peronizam; Tačerizam/Thatcherizam; Makartizam; Bonapartizam; Makijavelizam;
      Darvinizam; Socijalni darvinizam; Lamarkizam; Kreacionizam; Evolucionizam; Determinizam; Fatalizam; Nihilizam; Hedonizam;
      Asketizam; Narcizam; Sadizam; Mazohizam; Fetišizam/Fetisizam; Voajerizam; Egzibicionizam/Ekshibicionizam; Astigmatizam; Botulizam;
      Kretenizam; Gigantizam; Albinizam; Vandalizam; Huliganizam; Elektromagnetizam; Mikroorganizam; Katabolizam; Anabolizam; Dualizam;
      Monizam; Pluralizam; Relativizam; Univerzalizam; Individualizam; Kolektivizam; Konformizam; Nonkonformizam; Perfekcionizam;
      Profesionalizam; Amaterizam; Aktivizam; Ekoturizam; Alpinizam; Biciklizam; Motociklizam; Automobilizam; Žurnalizam;
      Senzacionalizam; Birokratizam; Nepotizam; Klijentelizam; Oportunizam; Karijerizam; Kozmopolitizam; Lokalpatriotizam;
      Provincijalizam; Eufemizam; Anakronizam; Aforizam; Barbarizam; Arhaizam; Neologizam; Anglizam; Germanizam; Turcizam; Galicizam;
      Talijanizam; Latinizam; Grecizam; Rusizam; Srbizam; Kroatizam; Bohemizam; Hungarizam; Lokalizam; Dijalektizam; Paralelizam;
      Ekumenizam; Prozelitizam; Merkantilizam; Monetarizam; Kejnzijanizam/Keynesijanizam; Protekcionizam; Neoliberalizam;
      Korporativizam; Sindikalizam; Anarhosindikalizam; Abolicionizam; Vegetarijanizam; Veganizam; Nudizam; Naturizam; Kanibalizam;
      Šamanizam/Samanizam; Animizam; Totemizam; Spiritualizam; Mesijanizam; Milenarizam; Puritanizam; Jansenizam; Pijetizam; Metodizam;
      Anglikanizam; Jozefinizam; Brutalizam; Konstruktivizam; Suprematizam; Fovizam; Orfizam; Tašizam/Tasizam; Purizam; Poentilizam;
      Divizionizam; Akademizam; Manirizam; Verizam; Neorealizam; Kubofuturizam; Hiperrealizam; Fotorealizam; Primitivizam; Eklekticizam;
      Historicizam; Funkcionalizam; Strukturalizam; Poststrukturalizam; Formalizam; Imažizam; Akmeizam; Apstrakcionizam;
      Neoekspresionizam; Heliocentrizam; Geocentrizam; Antropocentrizam; Etnocentrizam; Eurocentrizam; Vulkanizam; Endemizam;
      Parazitizam; Mutualizam; Komensalizam; Polimorfizam; Dimorfizam; Izomorfizam; Metamorfizam; Ekspanzionizam; Izolacionizam;
      Intervencionizam; Unilateralizam; Multilateralizam; Atlantizam; Golizam/Gaullizam; Egalitarizam; Elitizam; Seksizam;
      Mačizam/Macizam; Paternalizam; Ruralizam=0.05; Urbanizam; Dinamizam; Socrealizam; Infantilizam; Erotizam; Ritualizam=0.05;
      Tradicionalizam; Konzumerizam; Hipnotizam; Mesmerizam; Atavizam; Hermafroditizam; Bruksizam; Bilingvizam; Dogmatizam; Fanatizam`,
  },
  {
    slug: "logija",
    group: "kviz",
    title: "Znanost ili pojam koji završava na -logija",
    hint: "Npr. biologija, psihologija, ali i trilogija",
    answers: `Biologija; Psihologija; Geologija; Sociologija; Astrologija; Arheologija; Ekologija; Teologija; Mitologija; Tehnologija;
      Meteorologija; Filologija; Ideologija; Kardiologija; Neurologija; Dermatologija; Ginekologija; Urologija; Onkologija; Radiologija;
      Patologija; Farmakologija; Toksikologija; Imunologija; Virologija; Bakteriologija; Mikrobiologija; Zoologija; Ornitologija;
      Entomologija; Ihtiologija; Herpetologija; Mikologija; Paleontologija; Antropologija; Etnologija; Kriminologija; Politologija;
      Egiptologija; Sinologija; Japanologija; Indologija; Turkologija; Kroatologija; Fonologija; Morfologija; Etimologija;
      Terminologija; Leksikologija; Frazeologija; Dijalektologija; Gerontologija; Pedologija; Hidrologija; Seizmologija; Vulkanologija;
      Glaciologija; Oceanologija; Speleologija; Mineralogija; Petrologija; Kozmologija; Astrobiologija; Endokrinologija;
      Gastroenterologija; Hematologija; Nefrologija; Pulmologija; Reumatologija; Oftalmologija; Otorinolaringologija; Anesteziologija;
      Traumatologija; Stomatologija; Odontologija; Neonatologija; Epidemiologija; Infektologija; Alergologija; Angiologija; Flebologija;
      Hepatologija; Venerologija; Seksologija; Andrologija; Kineziologija; Defektologija; Tanatologija; Demonologija; Angelologija;
      Eshatologija; Kristologija; Mariologija; Numerologija; Grafologija; Frenologija; Ufologija; Kriptozoologija; Parapsihologija;
      Fenomenologija; Ontologija; Deontologija; Epistemologija; Teleologija; Metodologija; Tipologija; Topologija; Kronologija;
      Genealogija; Muzikologija; Etnomuzikologija; Teatrologija; Filmologija; Kulturologija; Futurologija; Metrologija; Tribologija;
      Biotehnologija; Nanotehnologija; Histologija; Citologija; Embriologija; Fiziologija; Enologija; Primatologija; Malakologija;
      Briologija; Lihenologija; Palinologija; Dendrologija; Limnologija; Klimatologija; Geomorfologija; Hidrogeologija; Sedimentologija;
      Ekotoksikologija; Psihopatologija; Neurobiologija; Analogija; Antologija; Apologija; Trilogija; Tetralogija; Tautologija;
      Homologija; Pentalogija; Penologija; Viktimologija; Sofrologija=0.05; Refleksologija; Iridologija; Kraniologija; Osteologija;
      Miologija; Artrologija; Neuropsihologija; Psihofiziologija; Biometeorologija; Selenologija; Planetologija; Speleobiologija;
      Somatologija; Papirologija; Asiriologija; Hetitologija; Bizantologija; Slavenologija; Albanologija; Hungarologija; Semiologija;
      Simbologija; Hagiologija; Ekleziologija; Soteriologija; Pneumatologija; Patrologija; Misiologija; Etologija; Sinekologija;
      Autekologija; Fitopatologija; Parazitologija; Helmintologija; Protozoologija; Akarologija; Arahnologija; Mirmekologija;
      Apiologija; Lepidopterologija; Koleopterologija; Mamologija; Kinologija; Hipologija; Felinologija; Cetologija; Arheozoologija;
      Paleoklimatologija; Geokronologija; Dendrokronologija; Agrologija; Pomologija; Ampelologija; Fitocenologija`,
  },
];

const kviz3: Nova[] = [
  {
    slug: "fobija",
    group: "kviz",
    title: "Fobija",
    hint: "Stručni naziv straha, npr. klaustrofobija",
    answers: `Klaustrofobija; Arahnofobija; Agorafobija; Akrofobija; Ksenofobija; Homofobija; Aerofobija/Aviofobija; Hidrofobija/Akvafobija;
      Socijalna fobija/Sociofobija; Nomofobija; Glosofobija; Kinofobija/Cinofobija; Hemofobija/Hematofobija; Tripanofobija;
      Ofidiofobija; Entomofobija; Tanatofobija; Niktofobija/Nictofobija/Ahluofobija; Misofobija/Germofobija; Kulrofobija/Koulrofobija;
      Triskaidekafobija; Emetofobija; Ailurofobija/Felinofobija; Apifobija/Melisofobija; Ornitofobija; Musofobija/Murofobija;
      Astrafobija/Brontofobija/Keraunofobija; Dentofobija/Odontofobija; Nozofobija; Tripofobija; Islamofobija; Fobofobija; Talasofobija;
      Batofobija; Pirofobija; Autofobija/Monofobija; Atihifobija; Nekrofobija; Gerontofobija; Geraskofobija; Pedofobija; Ginofobija;
      Androfobija; Gamofobija; Filofobija; Erotofobija; Tokofobija; Potamofobija; Ombrofobija; Kionofobija; Heliofobija; Fotofobija;
      Mehanofobija; Tehnofobija; Amaksofobija; Siderodromofobija; Ergofobija; Eremofobija; Heksakosioiheksekontaheksafobija;
      Paraskavedekatriafobija; Hipopotomonstroseskvipedaliofobija; Arahibutirofobija; Panfobija/Panofobija/Pantofobija;
      Aritmofobija/Numerofobija; Bibliofobija; Logofobija; Sitofobija/Cibofobija; Dismorfofobija; Kromofobija/Hromofobija; Eritrofobija;
      Dendrofobija; Botanofobija; Antofobija; Lahanofobija; Mikofobija; Alektorofobija; Hipofobija; Ranidafobija; Herpetofobija;
      Ihtiofobija; Galeofobija/Selahofobija; Zoofobija; Bakteriofobija; Verminofobija; Parazitofobija; Akarofobija; Ablutofobija;
      Pogonofobija; Trihofobija; Podofobija; Hafefobija; Anemofobija; Lilapsofobija; Astrofobija; Selenofobija; Meteorofobija;
      Spektrofobija; Fazmofobija/Fasmofobija; Demonofobija; Teofobija; Hijerofobija/Hierofobija; Stavrofobija; Ekleziofobija;
      Judeofobija; Rusofobija; Anglofobija; Frankofobija; Germanofobija; Srbofobija; Kroatofobija; Transfobija; Bifobija; Lezbofobija;
      Kaliginefobija/Venustrafobija; Peladofobija/Falakrofobija; Obezofobija; Kakofobija; Atelofobija; Plutofobija; Peniafobija;
      Krometofobija/Hrematofobija; Kronofobija; Kronometrofobija; Deipnofobija; Somnifobija/Hipnofobija; Kleptofobija; Hamartofobija;
      Dikefobija; Hoplofobija; Apeirofobija; Onomatofobija/Nomatofobija; Metrofobija; Melofobija; Fonofobija; Ligirofobija;
      Akustikofobija; Telefonofobija; Frigofobija; Termofobija; Kumpunofobija; Globofobija; Ksilofobija; Siderofobija;
      Hijalofobija/Nelofobija; Katoptrofobija/Eisoptrofobija; Jatrofobija/Iatrofobija; Nozokomefobija; Farmakofobija; Tomofobija;
      Traumatofobija; Vakcinofobija; Algofobija; Kardiofobija; Karcinofobija/Kancerofobija; Fagofobija; Anginofobija; Pnigofobija;
      Dorafobija; Sfeksofobija/Spheksofobija; Vespertiliofobija/Kiropterofobija; Arktofobija`,
  },
  {
    slug: "anglizam",
    group: "kviz",
    title: "Riječ engleskog podrijetla u našem jeziku",
    hint: "Udomaćene riječi iz engleskog, npr. vikend, parking, kompjuter",
    answers: `Vikend/Weekend; Kompjuter/Computer; Internet; Parking; Laptop; Mejl/Email/E-mail/Imejl; Šoping/Shopping/Soping; Menadžer/Manager;
      Biznis/Business; Sendvič/Sandwich/Sendvic; Hamburger; Hot dog/Hotdog; Kečap/Ketchup; Čips/Chips; Gol/Goal; Ofsajd/Offside;
      Korner/Corner; Penal/Penalty; Aut/Out; Faul/Foul; Fudbal/Futbol=0.3; Tenis; Golf; Ragbi/Rugby; Boks/Boxing; Bejzbol/Baseball;
      Hokej/Hockey; Kriket/Cricket; Sprint; Start; Finiš/Finish; Rekord/Record; Trening/Training; Trener/Trainer; Šut/Shoot; Dribling;
      Bek/Back; Bekhend/Backhand; Forhend/Forehand; Ping-pong/Ping pong; Skejtbord/Skateboard/Skejt; Surf/Surfanje; Džoging/Jogging;
      Fitnes/Fitness; Bodibilding/Bodybuilding; Snoubord/Snowboard; Rafting; Klub/Club; Lider/Leader; Miting/Meeting;
      Intervju/Interview; Bestseler/Bestseller; Hit; Rok/Rock; Džez/Jazz; Bluz/Blues; Pop; Rep/Rap; Didžej/DJ/Disk džokej; Spot;
      Šou/Show; Talk show/Tok šou; Rijaliti/Reality; Sitkom/Sitcom; Trejler/Trailer; Film; Strip; Kauboj/Cowboy; Gangster; Detektiv;
      Lift; Tramvaj; Tunel; Buldožer/Bulldozer; Džip/Jeep; Skuter/Scooter; Trolejbus; Kontejner/Container; Džemper/Jumper;
      Pulover/Pullover; Šorc/Šorts/Shorts; Džins/Jeans; Smoking; Kornfleks/Cornflakes; Puding/Pudding; Keks; Biftek/Beefsteak;
      Rozbif/Rostbif/Roastbeef; Viski/Whisky/Whiskey; Džin/Gin; Koktel/Cocktail; Tost/Toast; Milkšejk/Milkshake/Šejk; Smuti/Smoothie;
      Branč/Brunch; Katering/Catering; Fast food/Fastfud; Čizburger/Cheeseburger; Tonik/Tonic; Softver/Software; Hardver/Hardware;
      Printer; Skener/Scanner; Haker/Hacker; Blog; Bloger/Blogger; Influenser/Influencer; Podkast/Podcast; Striming/Streaming;
      Sajt/Site; Link; Klik/Click; Daunloud/Download; Apdejt/Update; Bag/Bug; Pasvord/Password; Smartfon/Smartphone; Tablet;
      Gejming/Gaming; Gejmer/Gamer; Level/Lvl; Lajk/Like; Šer/Share; Selfi/Selfie; Hešteg/Hashtag; Spam; Startap/Startup; Lajv/Live;
      Oflajn/Offline; Onlajn/Online; Vajfaj/Wi-Fi/Wifi; Hard disk; Fleš/Flash/Fleška; Čip/Chip; Menadžment/Management; Lizing/Leasing;
      Holding; Bum/Boom; Trend; Brend/Brand; Imidž/Image; Piar/PR; Lobi/Lobby; Keš/Cash; Broker; Diler/Dealer; Autsorsing/Outsourcing;
      Timbilding/Teambuilding; Dedlajn/Deadline; Fidbek/Feedback; Brifing/Briefing; Brejnstorming/Brainstorming; Kopirajt/Copyright;
      Mol/Mall; Supermarket; Market; Autlet/Outlet; Dizajn/Design; Dizajner/Designer; Mejkap/Make-up/Makeup; Pirsing/Piercing;
      OK/Okej/Okay; Kul/Cool; Fer/Fair; Hepiend/Happy end; Hepening/Happening; Parti/Party; Fan; Džoker/Joker; Tim/Team; Bos/Boss;
      Džentlmen/Gentleman; Ledi/Lady; Mister; Bebisiterica/Bebisiter/Babysitter; Tinejdžer/Teenager; Hobi/Hobby; Hipi/Hippie; Pank/Punk;
      Rokenrol/Rock and roll/Rock'n'roll; Vestern/Western; Triler/Thriller; Horor/Horror; Spiker/Speaker; Reporter;
      Stjuardesa/Stewardess; Kokpit/Cockpit; Čarter/Charter; Džet/Jet; Džetleg/Jetlag; Šatl/Shuttle; Motel; Hostel;
      Barbikju/Barbecue/BBQ; Gag; Skeč/Sketch; Stendap/Stand-up/Standup; Flert/Flirt; Gej/Gay; Singl/Single; Bejbi/Baby; Sori/Sorry;
      Ful/Full; Frend/Friend; Lajf/Life; Tajming/Timing; Revolver; Kolt/Colt; Snajper/Sniper; Tenk/Tank; Radar; Laser; Pazl/Puzzle;
      Kviz/Quiz; Bingo; Poker; Džekpot/Jackpot; Fliper/Flipper; Sprej/Spray; Lanč/Lunch; Rum; Punč/Punch; Bar; Pab/Pub; Rejv/Rave;
      Tvit/Tweet; Čet/Chat; Kemping/Camping; Klaun/Clown; Kidnaper/Kidnapper; Grejpfrut/Grapefruit; Folk; Soul; Hevi metal/Heavy metal;
      Grunge/Grandž; Trans/Trance; Haus/House; Tehno/Techno; Bend/Band; Fanklub/Fan club; Bekstejdž/Backstage; Rimejk/Remake;
      Sikvel/Sequel; Prikvel/Prequel; Spojler/Spoiler; Kasting/Casting`,
  },
  {
    slug: "galicizam",
    group: "kviz",
    title: "Riječ francuskog podrijetla u našem jeziku",
    hint: "Udomaćene riječi iz francuskog, npr. šofer, plafon, trotoar",
    answers: `Šofer/Sofer; Plafon; Trotoar; Garderoba; Bife; Šarm/Sarm; Kroasan/Kroason; Omlet; Majoneza; Bešamel/Besamel; Pire; File; Ragu;
      Sufle; Fondi/Fondue; Buket; Parfem; Toaleta/Toalet; Kompot; Kotlet; Garaža/Garaza; Žaluzine/Zaluzine; Abažur/Abazur; Lavabo;
      Bide/Bidet; Komoda; Fotelja; Kanape; Parket; Salon; Buduar; Mansarda; Atelje/Atelijer; Foaje; Loža/Loza; Parter; Ansambl;
      Repertoar; Premijera; Debi/Debut; Turneja; Revija; Kabare/Kabaret; Varijete/Variete; Šansona/Sansona; Balet; Menuet; Kadrila;
      Bulevar; Avenija; Aleja; Pasaž; Kej; Kupe; Limuzina; Kabriolet; Šasija/Sasija; Karoserija; Volan; Kontrola; Režija/Rezija;
      Režiser/Reziser; Ruž/Ruz; Puder; Manikura/Manikir; Pedikura/Pedikir; Bižuterija/Bizuterija; Broš/Bros; Medaljon; Kravata;
      Žaket/Zaket; Bluza; Kombinezon; Korzet; Pelerina; Beretka/Beretka kapa; Šal/Sal; Dekolte; Butik; Šik/Sik; Mizanscena/Mizanscen;
      Enterijer; Eksterijer; Dekor; Vitraž/Vitraz; Kolaž/Kolaz; Gobelin; Ambijent; Milje; Ekipa; Egal; Avantura; Afera;
      Aranžman/Aranzman; Ambasada; Ataše/Atase; Buržuj/Burzuj/Buržoazija; Šampion/Sampion; Šampanjac/Sampanjac; Konjak; Liker; Aperitiv;
      Digestiv; Bistro; Restoran; Meni; Alakart/A la carte; Sos; Marinada; Glazura; Kroket; Ekler; Mus; Krem/Krema; Karamel/Karamela;
      Nugat; Bombon; Desert; Baget/Bageta; Brioš/Brios; Tartar; Šef/Sef; Garsonijera/Garsonjera; Kurir; Biro; Dosje; Birokracija;
      Komunike; Plasman; Manevar; Sabotaža/Sabotaza; Žandar/Zandar; Ofenziva; Garnizon; Bataljon; Eskadrila; Avangarda; Mitraljez;
      Bajuneta/Bajonet; Barikada; Defile; Parada; Kliše/Klišej/Klise; Repriza; Tiraž/Tiraz; Feljton; Žurnalist/Zurnalist;
      Reportaža/Reportaza; Retuš/Retus; Afiš/Afiša; Ekran; Montaža/Montaza; Siže/Sizej; Bonton/Bon-ton; Etiketa; Randevu/Rendez-vous;
      Kompliment; Amater; Šansa/Sansa; Debakl; Rulet/Ruleta; Krupije; Žeton/Zeton; Ambalaža/Ambalaza; Luster; Garnitura; Sekreter;
      Vitrina; Plato; Paravan; Rezervoar; Trikotaža/Trikotaza; Dezen; Nijansa; Penzion/Pansion; Suvenir; Žele/Zele; Ekspoze;
      Komitet=0.05; Kupon; Marš/Mars; Etapa; Pantalone; Kostim`,
  },
  {
    slug: "umjetnicki-stil",
    group: "kviz",
    title: "Umjetnički ili arhitektonski stil ili pravac",
    hint: "Npr. gotika, barok, impresionizam",
    answers: `Gotika; Barok; Renesansa; Romanika; Rokoko; Impresionizam; Klasicizam; Neoklasicizam; Romantizam; Realizam; Kubizam;
      Nadrealizam/Surrealizam; Ekspresionizam; Secesija/Art nouveau/Jugendstil; Art deco/Art déco; Futurizam; Dadaizam/Dada; Pop art;
      Postimpresionizam; Modernizam; Postmodernizam; Minimalizam; Bauhaus; Fovizam; Simbolizam; Naturalizam; Manirizam;
      Apstraktni ekspresionizam; Op art; Predromanika; Bizantska umjetnost/Bizantski stil; Starokršćanska umjetnost; Helenizam;
      Mudéjar/Mudejar; Plateresko; Manuelino; Churrigueresco; Perpendikularni stil; Tudorski stil; Georgijanski stil;
      Viktorijanski stil; Edvardijanski stil; Ampir/Empire; Bidermajer/Biedermeier; Historicizam; Neogotika; Neorenesansa; Neobarok;
      Eklekticizam; Brutalizam; Konstruktivizam; Suprematizam; De Stijl/Neoplasticizam; Internacionalni stil; Funkcionalizam;
      Organska arhitektura; Dekonstruktivizam; High-tech arhitektura/High-tech; Racionalizam; Orfizam; Poentilizam/Pointilizam;
      Divizionizam; Tašizam/Tachisme; Enformel/Informel; Akcijsko slikarstvo/Action painting; Color field/Slikarstvo obojenog polja;
      Hiperrealizam; Fotorealizam; Land art; Konceptualna umjetnost/Konceptualizam; Body art; Performans/Performance; Fluxus;
      Arte povera; Street art/Ulična umjetnost/Grafiti; Naivna umjetnost/Naiva/Hlebinska škola; Art brut; Prerafaeliti/Prerafaelitizam;
      Nazarenci/Nazareni; Barbizonska škola; Vorticizam; Rajonizam; Kubofuturizam; Socijalistički realizam/Socrealizam;
      Nova stvarnost/Neue Sachlichkeit; Magični realizam; Metafizičko slikarstvo; Die Brücke/Most; Plavi jahač/Der Blaue Reiter;
      Bečka secesija; EXAT 51/Exat; Gorgona; Nove tendencije; Grupa Zemlja/Zemlja; Ukiyo-e; Maurski stil; Kolonijalni stil;
      Čikaška škola/Chicago school; Beaux-Arts/Boz-ar; Primitivizam; Akademizam; Verizam; Kinetička umjetnost;
      Video umjetnost/Video art; Neoekspresionizam; Transavangarda; Superflat; Konkretna umjetnost; Lirska apstrakcija;
      Geometrijska apstrakcija; Apstraktna umjetnost/Apstrakcija; Neoimpresionizam; Sintetizam; Kloazonizam; Nabis/Nabisti;
      Precizionizam; Regionalizam; Ashcan school/Ashcan; Hudson River School/Hudsonska škola; Luminizam; Tonalizam; Purizam; Japonizam;
      Orijentalizam`,
  },
];

const zaigrano: Nova[] = [
  {
    slug: "videoigra-90e",
    group: "zaigrano",
    title: "Videoigra izašla prije 2000.",
    hint: "Prva verzija izašla 1999. ili ranije",
    answers: `The Legend of Zelda/Zelda; Mortal Kombat; Super Mario Bros./Super Mario/Mario; Tetris; Sonic the Hedgehog/Sonic; Tomb Raider;
      Pac-Man/Pacman; GoldenEye 007/GoldenEye; Grand Theft Auto/GTA; Final Fantasy VII/Final Fantasy 7; Resident Evil;
      FIFA/FIFA International Soccer; Silent Hill; Prince of Persia/Princ od Perzije; Donkey Kong; Crash Bandicoot/Crash;
      Super Mario 64; Need for Speed; Pong; Space Invaders; Street Fighter II/Street Fighter 2; Spyro the Dragon/Spyro;
      Wolfenstein 3D/Wolfenstein; Command & Conquer/Command and Conquer; StarCraft; Age of Empires; Warcraft; GTA 2/Grand Theft Auto 2;
      Baldur's Gate; Civilization/Civilizacija; SimCity; Age of Empires II/Age of Empires 2; Centipede; Myst;
      Heroes of Might and Magic/Heroes; Castlevania; Unreal Tournament; Fallout 2; Final Fantasy; Metroid; Duke Nukem 3D/Duke Nukem;
      Star Fox; Teenage Mutant Ninja Turtles/Kornjače nindže; Planescape: Torment/Planescape Torment; Street Fighter; Mega Man;
      Dragon Quest; Tekken 3; Super Smash Bros.; Chrono Trigger; Heroes of Might and Magic III/Heroes 3;
      The Secret of Monkey Island/Monkey Island; Super Mario Kart/Mario Kart; Tony Hawk's Pro Skater/Tony Hawk;
      The Lion King/Kralj lavova; System Shock; Tekken; RollerCoaster Tycoon; EarthBound; Grim Fandango;
      Pokémon Red i Blue/Pokemon Red/Pokemon Blue/Pokemon; Quake II; Quake III Arena; Donkey Kong Country; Discworld; Aladdin/Aladin;
      Frogger; Tron; Galaga; Q*bert/Qbert; Mortal Kombat II; Soulcalibur/Soul Calibur; Super Metroid; Secret of Mana; Rayman;
      Twisted Metal; The Oregon Trail/Oregon Trail; Banjo-Kazooie; Kirby's Dream Land/Kirby; Day of the Tentacle; Duck Hunt; Doom;
      Virtua Fighter; Civilization II; Dig Dug; F-Zero; Leisure Suit Larry; Bomberman; Elite; Pitfall!/Pitfall; Worms Armageddon;
      Golden Axe; Commander Keen; Snake/Zmija; Transport Tycoon; Dungeon Keeper; Mario Kart 64; Killer Instinct; Arkanoid;
      Pasijans/Solitaire; Lode Runner; Medal of Honor; Zork; The Settlers/Settlers; Diablo; Metal Gear Solid; Double Dragon; Fallout;
      Alone in the Dark; 3D Pinball/Space Cadet/Pinball; Bubble Bobble; Ms. Pac-Man; Worms; Out Run/OutRun; Theme Hospital;
      Streets of Rage; Resident Evil 2; Minolovac/Minesweeper; Commando; Crash Team Racing/CTR; Ocarina of Time/Zelda Ocarina of Time;
      Carmageddon; Dune II/Dune 2; Half-Life; Quake; Red Alert; Gran Turismo; Missile Command; Spacewar!/Spacewar; Road Rash; Pharaoh;
      Earthworm Jim; Super Mario World; Excitebike; Mario Party; King's Quest; Thief; Unreal; Broken Sword; Super Mario Bros. 3/Mario 3;
      Warcraft II/Warcraft 2; Dragon's Lair; Micro Machines; Football Manager; Blood; Final Fight; Tennis for Two; Crazy Taxi; Lemmings;
      Yoshi's Island; Sonic the Hedgehog 2/Sonic 2; Shenmue; Contra; Indiana Jones and the Fate of Atlantis; Jazz Jackrabbit; Asteroids;
      Sam & Max Hit the Road/Sam and Max; Ghosts 'n Goblins; Ridge Racer; Defender; Breakout; Pole Position; Full Throttle;
      Ecco the Dolphin; Destruction Derby; Theme Park; NBA Live; Mortal Kombat 3; Space Quest; Oddworld: Abe's Oddysee/Oddworld;
      NBA Jam; Wing Commander; MediEvil; Pokémon Stadium/Pokemon Stadium; 1942; Spy Hunter; Marble Madness; R-Type; Doom II/Doom 2;
      Wipeout; Little Big Adventure; Pang; Dino Crisis; Tomb Raider II; Ape Escape; Wizardry; Gradius; ToeJam & Earl; Dr. Mario;
      Daytona USA; Colin McRae Rally; Flashback; Syphon Filter; Championship Manager; SimCity 2000; Paperboy;
      Star Wars: Dark Forces/Dark Forces; Jet Set Willy; TIE Fighter; Sensible Soccer; Pokémon Yellow/Pokemon Yellow; Manic Miner;
      A Link to the Past; Ultima; Gauntlet; Impossible Mission; Pokémon Snap/Pokemon Snap; Link's Awakening;
      ISS Pro/International Superstar Soccer; Karateka; Bomb Jack; Rampage; Tekken 2; Tomb Raider III; Star Wars: X-Wing/X-Wing;
      Street Fighter Alpha; Hang-On; Total Annihilation; Sega Rally; Another World; Homeworld; Battletoads; Boulder Dash;
      John Madden Football/Madden; SimCity 3000; StarCraft: Brood War/Brood War; Shadow of the Beast; Railroad Tycoon; Test Drive;
      Caesar III; Driver; Rise of the Triad; Xenon 2; Kick Off; Shadow Warrior; Grand Prix 2; Pokémon Gold i Silver/Pokemon Gold;
      Track & Field; Heretic; Commandos; Croc; Harvest Moon; Populous; Descent; Rogue Squadron; Hexen; Stunts; Lemmings 2=0.05;
      Jedi Knight; Pod Racer/Star Wars Episode I Racer`,
  },
  {
    slug: "mjuzikl",
    group: "zaigrano",
    title: "Mjuzikl",
    hint: "Scenski ili filmski; naš ili izvorni naslov",
    answers: `Jadnici/Les Misérables/Les Miserables; Chicago; Kralj lavova/The Lion King; La La Land;
      Isus Krist Superstar/Jesus Christ Superstar; Priča sa zapadne strane/West Side Story; Najveći šoumen/The Greatest Showman;
      Moulin Rouge!/Moulin Rouge; Oklahoma!/Oklahoma; The Rocky Horror Show/Rocky Horror Picture Show/Rocky Horror; Company;
      Moje pjesme, moji snovi/The Sound of Music; Guslač na krovu/Fiddler on the Roof; Čarobnjak iz Oza/The Wizard of Oz;
      Dear Evan Hansen; Kosa/Hair; The Book of Mormon/Book of Mormon; Miss Saigon; Chitty Chitty Bang Bang; Cabaret/Kabare; Hadestown;
      Pjevajmo na kiši/Singin' in the Rain; Into the Woods; Moja draga Lady/My Fair Lady;
      Fantom iz opere/The Phantom of the Opera/Fantom u operi; Avenue Q; Shrek the Musical/Shrek; Anything Goes;
      Kralj i ja/The King and I; Sweeney Todd; Mačke/Cats; Billy Elliot; Legally Blonde/Plavuša s Harvarda; Tarzan;
      Charlie i tvornica čokolade/Charlie and the Chocolate Factory; Aladdin/Aladin; Guys and Dolls; Oliver!/Oliver;
      Mala sirena/The Little Mermaid; Mean Girls/Zločeste cure; Ljepotica i zvijer/Beauty and the Beast; Beetlejuice;
      Joseph and the Amazing Technicolor Dreamcoat/Joseph; Mamma Mia!/Mamma Mia; Wicked/Zla; Hamilton; Dirty Dancing; Grease/Briljantin;
      American Idiot; Show Boat/Showboat; Next to Normal; Heathers; Groznica subotnje večeri/Saturday Night Fever;
      Notre-Dame de Paris/Zvonar crkve Notre Dame; A Little Night Music; School of Rock; Titanic; Mary Poppins;
      Kiss Me, Kate/Kiss Me Kate; Godspell; Evita; Follies; Starlight Express; A Chorus Line; Spamalot; Annie; The Wiz;
      Amerikanac u Parizu/An American in Paris; In the Heights; Footloose; Južni Pacifik/South Pacific; Rent; Dreamgirls; Newsies;
      Pink Floyd: The Wall/The Wall; Sunset Boulevard; We Will Rock You; Snježno kraljevstvo/Frozen; Matilda; Gigi;
      Hairspray/Lak za kosu; Jersey Boys; Encanto; Ghost/Duh; Aspects of Love; High School Musical; Emilia Pérez/Emilia Perez; Camelot;
      Hello, Dolly!/Hello Dolly; Pitch Perfect; Sister Act/Zakon sestara; The Blues Brothers/Blues Brothers; Fun Home; Pippin;
      The Producers/Producenti; Mala trgovina strave/Little Shop of Horrors; Čovjek iz La Manche/Man of La Mancha;
      Mary Poppins se vraća/Mary Poppins Returns; Brigadoon; Aida; Burlesque; Memphis; Bye Bye Birdie; Ragtime; Tommy;
      Romeo i Julija/Roméo et Juliette; Carousel/Vrtuljak; Waitress; Sweet Charity; Come From Away; Once; Fame/Slava;
      Across the Universe; Gypsy; Spring Awakening/Buđenje proljeća; Poljubac žene pauka/Kiss of the Spider Woman; Six; Kinky Boots;
      Jalta, Jalta; Mozart!; Rock of Ages; Gubec-beg; Mame; Ples vampira/Tanz der Vampire; Priscilla, kraljica pustinje/Priscilla;
      Elisabeth; Zvijezda je rođena/A Star Is Born; The Bodyguard/Tjelohranitelj; Kišobrani iz Cherbourga/Les Parapluies de Cherbourg;
      Funny Girl; Hedwig and the Angry Inch/Hedwig; Paint Your Wagon; 42nd Street; Nine; Love Never Dies; Yentl; Rocketman`,
  },
  {
    slug: "zlikovac",
    group: "zaigrano",
    title: "Zlikovac iz filma, crtića, stripa ili knjige",
    answers: `Hannibal Lecter/Hannibal; Darth Vader/Vader; Sauron; Voldemort/Lord Voldemort; Loki; Pennywise; Thanos; Jason Voorhees/Jason;
      Freddy Krueger/Freddy; Norman Bates; Lex Luthor; Blofeld/Ernst Stavro Blofeld; Palpatine/Darth Sidious/Imperator; Pingvin/Penguin;
      Cruella de Vil/Cruella; Doktor Doom/Doctor Doom; Bowser; Darth Maul; T-1000; HAL 9000/HAL; Had/Hades; Kylo Ren; Harley Quinn;
      Galactus; Catwoman/Žena mačka; Kapetan Kuka/Captain Hook/Kuka; Gargamel; Dvolični/Two-Face; Ra's al Ghul; Grdana/Maleficent;
      Jabba/Jabba the Hutt; Zeleni goblin/Green Goblin; Darkseid; Boba Fett; Scar; Zagonetač/Riddler; Dr. Evil/Doktor Zlo; Ultron;
      Grof Dooku/Count Dooku; Agent Smith; Ganondorf/Ganon; Hans Gruber; Red Skull/Crvena lubanja; Joker/Džoker;
      Drakula/Dracula/Grof Drakula; Skeletor; General Grievous; Mr. Freeze; Grinch; Venom; General Zod; Amon Göth; Terminator/T-800;
      Anton Chigurh; Gollum/Smeagol/Sméagol; Buffalo Bill; Magneto; Scarecrow; John Doe; Dr. No/Doktor No; Shere Khan/Šir Kan;
      Patrick Bateman; Leatherface; Stromboli; Megatron; Goldfinger; Homelander; Brainiac; Plankton; Alien/Ksenomorf/Xenomorph; Ursula;
      Lady Tremaine/Maćeha iz Pepeljuge; Dolores Umbridge/Umbridge; Sideshow Bob; Keyser Söze/Keyser Soze; Hans Landa; Chucky;
      Michael Myers; Syndrome; Doomsday; Bellatrix Lestrange/Bellatrix; Sestra Ratched/Nurse Ratched; Morgoth; Gus Fring/Gustavo Fring;
      Vecna; Gospodin Burns/Mr. Burns/Burns; Grindelwald/Gellert Grindelwald; Kingpin; Annie Wilkes; Bane; Poison Ivy;
      Lord Farquaad/Farquaad; Starscream; Vector; Cersei Lannister/Cersei; Rasputin; Krang; Jago/Iago; Cobra Commander; Lady Macbeth;
      Balrog; Demogorgon; Bellwether; Joffrey Baratheon/Joffrey; Jack Torrance; Negan; Mystique; Hopper; Albert Wesker/Wesker;
      Princ Hans/Hans; Yokai/Profesor Callaghan; Jafar/Džafar; Gaston; Samara; Nemesis; Chernabog; M. Bison; Edgar;
      Ramsay Bolton/Ramsay; Zla kraljica/Maćeha iz Snjeguljice; Yzma; Smaug; Shelob/Sheloba; Morgana/Morgan le Fay; Shan Yu; Shao Kahn;
      Grand Moff Tarkin/Tarkin; Doktor Robotnik/Dr. Robotnik/Eggman; Baba Jaga; Hela; Lucius Malfoy; Lord Shen; Chick Hicks;
      Light Yagami; Littlefinger/Petyr Baelish; Pyramid Head; Kralj Bombon/King Candy/Turbo; Lotso; Shang Tsung; Clayton;
      Grof Olaf/Count Olaf; Randall; Wario; Doktor Octopus/Doc Ock; Long John Silver; Mordred; Tai Lung; Predator;
      Noćni kralj/Night King; Madam Mim; Majin Buu; Peter Pettigrew/Pettigrew/Crvorep; Frieza/Freezer; Bill; Mumm-Ra;
      Profesor Moriarty/Moriarty; Madara Uchiha/Madara; GLaDOS; Killmonger; Jigsaw; Zla vještica sa Zapada/Wicked Witch; Ralje/Jaws;
      Fagin; Frollo; Majka Gothel/Gothel; Mojo Jojo; Mr. Hyde/Hyde; Snoke; Dr. Kandža/Dr. Claw; King K. Rool; Sid Phillips; Ratcliffe;
      Pinhead; Damien; Doktor Facilier/Facilier; Princ Šarmantni; Javert; Kuma vila/Fairy Godmother; Liquid Snake; Ghostface;
      Profesor Ratigan/Ratigan; Princ John; Cell; Šerif od Nottinghama; Madame Medusa; Kerrigan/Sarah Kerrigan;
      Rogati kralj/Horned King; Walter White/Heisenberg; Bill Sikes; Milady de Winter/Milady; Te Kā/Te Ka; Azog;
      Dick Dastardly/Prljavi Dick; Tamatoa; Mother Brain; Handsome Jack; Orochimaru; Ernesto de la Cruz; Charles Muntz; Shredder/Šreder;
      Guverner/The Governor; Skynet; Kane; Gospođa Danvers/Mrs. Danvers; Diablo; Veliki Brat/Big Brother; Uriah Heep; Ridley; Dr. Wily;
      Mumija/The Mummy=0.05; Sephiroth; Calvin Candie; Kralj vještaca/Witch-king/Nazgul; Gríma Crvjezik/Wormtongue/Gríma;
      Thénardier/Thenardier; Frankensteinovo čudovište; Thrawn; Snježna kraljica; Kardinal Richelieu/Richelieu; Baba Roga; Vaas;
      Arthas/Lich King/Kralj Liča; Kefka; Kralj miševa; Mačak Lucifer; Bijela vještica/Jadis; Rochefort`,
  },
  {
    slug: "poznata-zivotinja",
    group: "zaigrano",
    title: "Poznata životinja iz filma, crtića, knjige ili stvarnosti",
    hint: "Lik ili stvarna životinja s imenom, npr. Lassie, Laika, Dumbo",
    answers: `Miki Maus/Mickey Mouse/Miki; Scooby-Doo/Scooby; Laika; Pluton/Pluto; Snoopy; Garfield; Pikachu; Bambi;
      Paško Patak/Donald Duck/Paja Patak; Dumbo; Zekoslav Mrkva/Bugs Bunny/Duško Dugouško; Šiljo/Goofy; Lassie; Simba; Po/Kung Fu Panda;
      Magarac/Donkey; Hello Kitty; Peppa Pig/Peppa; Marlin; Patak Dača/Daffy Duck; Mačak u čizmama/Puss in Boots; Čiko/Tweety;
      Speedy Gonzales; Doraemon; Shere Khan/Šir Kan; Paddington; Bagheera; Woodstock; Baloo/Balu; Scrat; Mufasa; Porky Pig/Prase Porky;
      Lav Alex/Alex; Nemo; Nala; Diego; Medo Yogi/Yogi; Jerry/Miš Jerry; Droopy; Winnie the Pooh/Medo Winnie/Winnie/Pooh; Harambe;
      Pink Panter/Pink Panther; Gloria; Kojot/Wile E. Coyote; Brian Griffin/Brian; Stuart Little; Dory; Totoro; Togo; Skipper;
      Pčelica Maja/Maja; Hrabri pas Kukavica/Courage; Rin Tin Tin; Muttley; Mačak Silvestar/Sylvester; Scrappy-Doo; Hachiko;
      Skitnica/Tramp; Bijeli Očnjak/White Fang; Djedičin mali pomoćnik/Santa's Little Helper; Balto; Crni ljepotan/Black Beauty;
      Seabiscuit; Kermit/Žabac Kermit; Punxsutawney Phil; Pumbaa; Grumpy Cat; Greyfriars Bobby; Marty; Rantanplan; Rafiki;
      Idefiks/Idefix/Dogmatix; Mačak Feliks/Felix; Lady; Silver; Timon; Nagini; Cher Ami; Bukefal/Bucephalus;
      Medvjed Smokey/Smokey Bear; Zazu; Odie; Manny; Ovca Shaun/Shaun; Benji; Jolly Jumper; Snowball; Archimedes; Aslan;
      Usamljeni George/Lonesome George; Kralj Louie/King Louie; Old Yeller; Rocket Raccoon/Rocket; Beethoven; Bolt; Cvijetko/Flower;
      Sjenovit/Shadowfax; Pepe Le Pew/Pepe Tvor; Mačak Tom/Tom; Jumbo; Bijeli zec/White Rabbit; Flounder/Iverak; Hedviga/Hedwig; Astro;
      Willy; Toto; Hobotnica Paul/Paul; Taz/Tasmanijski vrag; Incitatus; Martha; Kljunoslav/Buckbeak; Spike; Babe; Ovca Dolly/Dolly;
      Iyo/Eeyore/Ija; Vili; Fluffy; Aragog; Pongo; Clifford; Fawkes; Zec Petar/Peter Rabbit; Kralj Julien/Julien; Dino; Melman; Hobbes;
      Hooch; Kevin; Sid; Knut; Moby Dick; Barry; Flipper; Slinky; Kabosu/Doge; Krtek/Mali Krtek/Krtica Krtek;
      Ptica trkačica/Road Runner; Uggie; Tigrić/Tigger; Pascal; Boo Boo; Gromit; Remy; Kleo/Cleo; Krivonogi/Crookshanks; Koko; Scabbers;
      Hamm; Žabac Žabić/Mr. Toad; Secretariat; Figaro; Sven; Milou/Snowy; Keiko; Maximus; Sebastijan/Sebastian; Marengo; Trigger; Nana;
      Perdita; Rajah; Bullseye; Skippy; Stitch; Marley; Komesar Rex/Rex; Kaa; Belka; Strelka; Ham; Prasić/Piglet; Tilikum; Boo; Bobi;
      Medo Brundo/Brundo; Cheshire mačak/Cerigradski mačak; Kanga; Black Bess=0.02; Abu; Papiga Iago; Meeko; Heihei; Pua; Dug; Jaq; Gus;
      Thumper/Lupko; Roo`,
  },
  {
    slug: "zivotinja-k",
    group: "zaigrano",
    title: "Životinja na slovo K",
    answers: `Krava; Konj; Koza; Kokoš/Kokoška; Krokodil; Kit; Kengur/Klokan; Koala; Kobra; Kornjača/Kornjaca; Kamila/Deva; Komarac; Kos;
      Kukavica; Kozorog; Kuna; Kojot; Kondor; Kolibrić/Kolibri; Kameleon; Kapibara; Kakadu; Kunić; Krtica; Kanarinac; Kivi;
      Kit ubojica/Orka; Kobila; Krmača; Kopun; Kokot/Pijetao Kokot; Kozlić; Kuja/Kujica; Kobac; Kraljić; Kreja; Kormoran; Kosac; Kulik;
      Kukuvija; Kokošar; Kazuar; Kapucin; Kolobus; Kudu; Karibu; Kuna zlatica; Kuna bjelica; Kakapo; Kea; Kukabura/Kookaburra;
      Kraljevski pingvin; Kajman; Komodski varan/Komodo zmaj; Krastača; Kalamar/Lignja kalamar; Kozica; Kamenica; Kapica; Koralj; Kril;
      Karet; Kantar; Kirnja; Kečiga; Klen; Karas; Komarča; Kovač; Kornjaš; Krijesnica; Krpelj; Kukuruzna zlatica; Kućna muha;
      Konjska muha; Karakal; Kinkaju; Koati; Kraljevska kobra; Kitoglavac; Kunjka; Kvaga; Kljunaš; Kljunorožac; Kraljevski orao;
      Kit grbavac/Grbavi kit; Krmak; Karakurt; Kamenjarka; Kulan; Kalifornijski kondor=0.05; Kraljevski piton=0.1;
      Kajmanska kornjača=0.05; Koraljna zmija=0.1; Kongoni=0.05; Kuskus=0.05; Kardinal; Krivokljun; Kurjak; Koljuška; Kanjac; Kostelj;
      Kraljevski lešinar; Kanadska guska`,
  },
  {
    slug: "knjizevni-lik",
    group: "zaigrano",
    title: "Lik iz romana ili pripovijetke",
    hint: "Bilo koja književnost; drame i stripovi ne vrijede",
    answers: `Harry Potter; Sherlock Holmes/Holmes; Don Quijote/Don Kihot/Don Quixote; Drakula/Dracula; Ana Karenjina/Anna Karenina;
      Hercule Poirot/Poirot; Robinson Crusoe/Robinson; Gandalf; Frankenstein/Victor Frankenstein; Oliver Twist; Pinokio/Pinocchio;
      James Bond; Albus Dumbledore/Dumbledore; Jane Eyre; Jean Valjean/Valjean; Tarzan; Frodo/Frodo Baggins; Petar Pan/Peter Pan;
      Quasimodo/Kvazimodo; Madame Bovary/Emma Bovary; Bilbo Baggins/Bilbo; Gollum; Aragorn; Lolita; Huckleberry Finn/Huck Finn;
      David Copperfield; Holden Caulfield; Ebenezer Scrooge/Scrooge; Mali princ; Ron Weasley; Tom Sawyer; Katniss Everdeen/Katniss;
      Heidi; Grof Monte Cristo/Edmond Dantès/Edmond Dantes; Mowgli; Scarlett O'Hara; Candide/Kandid; Willy Wonka; Javert;
      Mr. Darcy/Darcy; Winnetou/Vinetu; Jay Gatsby/Gatsby; Cosette; Edward Cullen; Lisbeth Salander; Bella Swan; Atticus Finch; Aramis;
      Elizabeth Bennet; Ivanhoe; Gavroche; Robert Langdon; Kapetan Ahab/Ahab; Long John Silver; Atos/Athos; Margarita; Forrest Gump;
      Phileas Fogg; Hannibal Lecter; Portos/Porthos; Alisa/Alica/Alice; Miss Havisham; Old Shatterhand; Rhett Butler;
      Gulliver/Lemuel Gulliver; D'Artagnan/Dartanjan; Starac Santiago/Santiago; Patrick Bateman; Pipi Duga Čarapa/Pippi/Pipi;
      Dorian Gray; Kapetan Nemo/Nemo; Sauron; Daenerys Targaryen/Daenerys; Šegrt Hlapić/Hlapić; Anne Shirley/Anne od Zelenih zabata;
      Bridget Jones; Gospođa Dalloway/Mrs Dalloway; Hermiona Granger/Hermiona; Geppetto; Esmeralda; Paul Atreides; Christian Grey;
      Jack Reacher; Robert Jordan; Clarice Starling; Eragon; Heathcliff; Natasha Rostova/Nataša Rostova; Saruman; Oblomov;
      Percy Jackson; Tyrion Lannister/Tyrion; Arya Stark; Miss Marple; Mary Poppins; Fantine; Charlie Bucket; Aslan; Matilda; Meursault;
      Arsène Lupin/Arsen Lupin; Legolas; Artemis Fowl; Jo March; Jason Bourne; Momo; Harry Hole; Humbert Humbert; Jeeves; Winston Smith;
      Napoleon; Dr. Watson/Watson; Gregor Samsa; Severus Snape/Snape; Voland/Woland; Raskoljnikov/Rodion Raskoljnikov; Dorothy;
      Randle McMurphy/McMurphy; Philip Marlowe; Bastian; Doktor Živago/Jurij Živago; Werther/Mladi Werther; Tom Ripley/Ripley;
      Draco Malfoy/Draco; Dobri vojnik Švejk/Švejk/Svejk; Yossarian; Emil iz Lönneberge/Emil; Ishmael; Otac Goriot/Goriot;
      Bertie Wooster; Lucy Pevensie; Atreju; Effi Briest; Leopold Bloom; Siddhartha; Sam Spade; Dr. Jekyll/Jekyll; Stephen Dedalus;
      Strašilo; Bellatrix Lestrange; Molly Bloom; Jim Hawkins; Majstor; Zaphod Beeblebrox; Hari Seldon; Jevgenij Onjegin/Onjegin;
      Kapetan Kuka/Captain Hook; Alex DeLarge/Alex; Knez Miškin/Miškin; Arthur Dent; Marius; Holly Golightly; Guy Montag/Montag;
      Sam Gamgee/Samwise; Zvončica/Tinker Bell; Ender Wiggin/Ender; Voldemort; Kurt Wallander/Wallander; Pip; Gimli; Jon Snow; Regoč;
      Okonkwo; Josef K.; Sancho Panza; Daisy Buchanan; Karlsson s krova/Karlsson; Wendy/Wendy Darling; Ronja; Petko/Friday/Petak;
      Moriarty/Profesor Moriarty; Limeni drvosječa; Maigret/Komesar Maigret; Pierre Bezuhov; Jack Ryan; Andrej Bolkonski; Hagrid;
      Pečorin; Čičikov; Akakij Akakijevič; Behemot; Koko; Moby Dick; Bazarov; Aljoša Karamazov; Svarožić; Ivan Karamazov;
      Dmitrij Karamazov; Boo Radley; Sonja Marmeladova/Sonja; Zorba/Aleksis Zorba; Harry Haller; Hans Castorp; Oskar Matzerath;
      Jean-Baptiste Grenouille/Grenouille; Stribor; Mali Nicolas/Nikolica; Rastignac; Prosjak Luka; Sestra Ratched; Sal Paradise;
      Dean Moriarty; Mr. Hyde/Hyde; Lady Chatterley; Dora Krupić/Dora Krupićeva; Scout Finch/Scout; Grga Čokolin; Dulcineja/Dulcinea;
      Mali Radojica; Bijela vještica; Melkior Tresić/Melkior; Bijeli zec; Geralt od Rivije/Geralt; Mark Watney; Veliki Brat;
      Komesar Montalbano/Montalbano; Fantomas; Gita; Majstor Mrkonja; Pero Kvržica; Kosjenka; Potjeh; Malik Tintilinić; Bratac Jaglenac;
      Sestrica Rutvica; Ribar Palunko; Pavao Gregorijanec; Filip Latinovicz; Đuka Begović; Ahmed Nurudin; Pop Ćira; Pop Spira;
      Frankensteinovo čudovište=0.1; Ludi Klobučar/Šeširdžija; Cheshire mačak; Kraljica srca; Phoebe Caulfield=0.05`,
  },
];

export const nove4: SeedCategory[] = [...gradovi, ...opce, ...kviz, ...kviz2, ...kviz3, ...zaigrano].map(rang);
