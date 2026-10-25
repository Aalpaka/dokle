// Četvrti val, hrvatska pitanja (2026-10-25). Mjesta su sva naselja iz popisa 2021. s hr.wikipedije, poredana po
// pregledima članaka; gradovi i općine su službeni popisi. Čekaju parove za BiH i Srbiju, pa još nisu u igri.
import type { SeedCategory } from "../categories";
import { rang, type Nova } from "./nove-4";

const mjesta: Nova[] = [
  {
    slug: "mjesto-g",
    group: "hr",
    title: "Mjesto u Hrvatskoj na slovo G",
    answers: `Gospić; Gračac; Glina; Garešnica; Gradac; Grubišno Polje; Gornji Karin; Grožnjan; Gunja; Gornja Stubica; Generalski Stol; Garčin;
      Gornja Trebinja; Gvozdansko; Gradina; Glavina Donja; Gradište; Gorjani; Grebaštica; Grobnik; Goričan; Gradec; Gornji Kneginec;
      Galovac; Grabovac; Gomirje; Gundinci; Golubić; Gola; Grohote; Gata; Galižana; Grižane-Belgrad; Glavice; Gornji Dolac; Gruda;
      Gračišće; Gerovo; Gornja Vrba; Gudovac; Gornja Rijeka; Grab; Gornji Stupnik; Gajac; Gornji Bitelić; Gornji Bogićevci; Gašinci;
      Gornje Biljane; Gornje Raštane; Gornje Sitno; Gaćelezi; Gornji Vinjani; Gaboš; Gdinj; Glušci; Gradići; Gala; Gljev;
      Gorica Svetojanska; Gudci; Grabrovnica; Gorica; Gornja Ploča; Goveđari; Gornji Mihaljevec; Gornja Bistra; Gornji Kosinj; Galgovo;
      Gornji Humac; Gornja Voća; Gornje Selo; Gat; Gornje Jesenje; Gornji Čehi; Glibodol; Gornje Dubrave; Gornje Ogorje; Gornji Klasnić;
      Gornja Gračenica; Golinja; Grubine; Graberje Ivanićko; Gora; Glavničica; Gornja Brela; Gornji Viduševac; Gačice; Gornji Varoš;
      Gizdavac; Gornja Jagodnja; Gornji Brgat; Gornji Miholjac; Grabovo; Gustirna; Gornji Kuršanec; Globočec; Grbe; Grabarje;
      Gornje Planjane; Glavnica Donja; Gazije; Gajić; Greda; Gornji Muć; Glogovo; Gornja Zdenčina; Gotalovo; Gornji Laduč; Glogovac;
      Gornji Dragonožec; Gornje Komarevo; Gornje Prekrižje; Gornji Desinec; Gornja Lomnica; Grimalda; Gornje Podotočje; Gornja Jelenska;
      Godinjak; Gardun; Goriš; Garjak; Gromača; Gornja Bebrina; Gušće; Granice; Glogovica; Gornje Vinovo; Gornje Ceranje;
      Gornji Hrašćan; Gardinovec; Gabonjin; Gubaševo; Garica; Gorice; Gornje Vratno; Gejkovac; Gračec; Gornja Suvaja; Gornji Sjeničak;
      Gornji Vaganac; Gajana; Grdun; Glavica; Gornji Kraljevec; Grabovac Banski; Gređani; Gaj; Gojanec; Gornja Reka; Gromačnik;
      Goli Vrh; Gunjavci; Gornja Pačetina; Gornja Močila; Gornja Pušća; Gornji Lapac; Gornji Kućan; Grabovnica; Gornji Andrijevci;
      Gornje Utore; Gornje Bazje; Gornje Predrijevo; Gornji Furjan; Garešnički Brestovac; Gornji Žirovac; Gologorica; Goranec;
      Gornja Kovačica; Golinci; Gornji Draganec; Grgurice; Gojlo; Gornji Hruševec; Grabovci; Gornje Postinje; Gornje Stative; Gabrili;
      Gornji Vrhovci; Guci Draganički; Gornje Ladanje; Glavina Gornja; Gornje Mrzlo Polje Mrežničko; Gaćište; Gornja Bačuga;
      Gornji Zvečaj; Grgurevići; Grbavac; Gornje Plavnice; Grdanjci; Gornji Babin Potok; Gornja Bučica; Goveđe Polje; Gornje Psarjevo;
      Gornje Vrhovine; Goričica; Gornji Čemehovec; Gošić; Gornja Drenova; Gornji Oštrc; Gornji Proložac; Gornje Primišlje; Graberje;
      Gornja Motičina; Golaš; Grabušić; Gornja Dubrava; Golobrdci; Gornja Podstrana; Gradečki Pavlovec; Gromin Dolac; Glavnica Gornja;
      Gornja Glogovnica; Gornja Greda; Gornji Marinkovac; Grginac; Gostinjac; Glavace; Gračanica Šišinečka; Gornji Trpuci;
      Gornja Višnjica; Gabajeva Greda; Golo Brdo; Gradna; Gornja Vrućica; Gotalovec; Gregurovec; Gornja Šumetlica; Gornji Miklouš;
      Grižići; Grdoselo; Gubavčevo Polje; Gornje Bukovlje; Grgetići; Gornji Hrastovac; Gradac Našički; Gradski Vrhovci; Gustelnica;
      Glinska Poljana; Goršeti; Gornje Igrane; Grudnjak; Gregurić Breg; Gajec; Gornji Sređani; Gornja Šemnica; Gornji Zagon; Goli Breg;
      Gornje Obuljeno; Gornji Macelj; Globočec Ludbreški; Gora Veternička; Gorići; Giletinci; Greda Sunjska; Grabrovnik; Gornje Kusonje;
      Gornji Grahovljani; Gornji Rogolji; Grančari; Gornji Crnogovci; Gorica Valpovačka; Gornja Obreška; Gornji Lađevac; Gornja Kupčina;
      Guščerovec; Gornji Borki; Gologorički Dol; Gornji Lipovac; Gornji Martijanec; Gladovec Pokupski; Gusakovec; Grič; Grabarak;
      Gnojnice; Gornja Velika; Gornji Meljani; Gornje Orešje; Gredice; Gornji Vinkovec; Griče; Gornji Tkalec; Gornji Vukšinac;
      Gorjakovo; Gornji Daruvar; Gambetići; Gradinje; Gornja Obrijež; Galović Selo; Gornji Prnjarovec; Gradina Korenička; Glavat;
      Gedići; Gornje Taborište; Grdenci; Gornja Mlinoga; Gornje Jame; Gornji Gučani; Gornje Rovišće; Gonjeva; Gornje Pokupje;
      Graboštani; Gornje Cjepidlake; Grana; Golubinjak; Gradiščak; Gora Glušići; Gornja Čemernica; Gorica Jamnička; Gradec Pokupski;
      Gornji Slatinik; Gornji Bjelovac; Gornja Pištana; Grtovec; Gornja Batina; Gornji Vukojevac; Gornji Poloj; Gornja Vas; Goričanec;
      Grmov; Gornji Fodrovec; Gornja Trstenica; Gornji Štrbci; Gržini; Gornja Plemenšćina; Gorička; Gornja Podgora; Gornja Garešnica;
      Grabić; Golobrdac; Gerovski Kraj; Goljak; Grkaveščak; Glavani; Gornje Zdelice; Golenić; Goričko; Galin; Gornja Rašenica;
      Gornja Vlahinićka; Gornja Stranica; Gajine; Greda Breška; Golovik; Gezinci; Gornji Mosti; Garbina; Gračina; Gornje Makojišće;
      Gornji Poličnik; Grandići; Grabrov Potok; Gornje Mokrice; Gornji Emovci; Golubovac Divuški; Gornji Uljanik; Grabrk;
      Gornje Zagorje; Gornja Purgarija; Gradusa Posavska; Gornja Dobra; Gornja Šušnjara; Granje; Gornja Pastuša; Gabrilovac;
      Gornji Nikšić; Gornja Poljana; Gornja Glina; Gornji Kuti; Grabovica; Goljak Klanječki; Grkine; Gostović; Gornje Selište;
      Gornji Javoranj; Gornja Letina; Gornji Dubovec; Gornja Petrička; Gornji Kremen; Guče Selo; Gornja Topličica; Gamboci;
      Gornji Žagari; Gornji Čaglić; Golubići; Grbaševec; Gornja Vrijeska; Gornje Prilišće; Gornji Tomaš; Glinsko Vrelo; Gečkovec;
      Gornje Brezno; Gornji Skrad; Gradišće; Gusti Laz; Gornji Dobretin; Gornja Velešnja; Goršćaki; Grešćevina; Gornjaki;
      Gornji Selkovac; Gornji Koncovčak; Gornji Šajn; Grabe; Gaber; Gorenci; Gornja Lamana Draga; Grmušani; Grbajel; Gornja Oraovica;
      Gornji Budački; Gračac Slavetićki; Gondolići; Grandić Breg; Gornje Tihovo; Gačeša Selo; Gornji Turni; Glavičani; Gorači;
      Gornji Vukšići; Grabovac Krnjački; Gornji Kukuruzari; Gage; Gvozdanska; Gornja Selnica; Golik; Gornja Konjščina; Gornji Vučkovići;
      Gornja Stupnica; Gornja Brckovčina; Gornje Dvorišće; Grabovac Vojnićki; Goruševnjak; Gudalji; Graberanec; Grdak; Gramalj;
      Gornja Meminska; Grabarska; Gornji Velemerić; Gladovec Kravarski; Gornje Gnojnice; Graberšćak; Grabrova; Gorjani Sutinski;
      Gašparci; Galovec Začretski; Glinice; Gornji Popovac; Gerovo Tounjsko; Gojkovac; Glogovec Zagorski; Goričanovec; Gornja Ploščica;
      Gora Košnička; Goleši Žumberački; Gorica Miholečka; Gornji Dragičevci; Graberec; Gorani; Gornji Bukovac Žakanjski;
      Gorica Lipnička; Grabričina; Gorinci; Gaćeško Selo; Galovec; Grabik; Gršćaki; Gornji Maslarac; Gornji Zebanec; Gornje Viljevo;
      Gornji Lović; Gornji Škrnik; Gornji Okrug; Gornji Lipovčani; Grganjica; Goli Vrh Netretićki; Galezova Draga;
      Gornji Oštri Vrh Ozaljski; Gabrovec; Gornja Visočka; Gornji Cerovac; Gornja Krašićevica; Grubići; Gornja Trnovitica;
      Gorniki Vivodinski; Gornja Brusovača; Gorkovec; Gornji Ložac; Gornja Žrvnica; Goričice Dobranske; Grletinec; Gornji Šehovac;
      Gorica Skradska; Glušinja; Gostenje; Goliki; Grabrić; Gredenec; Goli Vrh Ozaljski; Goršćaki Ozaljski; Gornji Jalšovec;
      Gornji Zbilj; Gornji Goli Vrh Lipnički; Grohot`,
  },
  {
    slug: "mjesto-d",
    group: "hr",
    title: "Mjesto u Hrvatskoj na slovo D",
    answers: `Dubrovnik; Drniš; Dalj; Daruvar; Dugo Selo; Delnice; Donji Lapac; Donji Miholjac; Duga Resa; Dvor; Dugopolje; Davor; Donji Karin;
      Drežnik Grad; Darda; Drage; Donje Biljane; Donja Stubica; Drenovci; Dugi Rat; Drvenik; Donji Andrijevci; Dramalj; Dubrava;
      Drežnica; Draž; Donja Dubrava; Donja Voća; Donji Kraljevec; Donji Dragonožec; Duće; Desinić; Draganić; Donja Lomnica;
      Donje Ceranje; Donji Vinjani; Dobrinj; Donji Kašić; Donji Dolac; Divoševci; Danilo; Debeljak; Donje Pazarište; Donji Stupnik;
      Drenje; Divoselo; Dabar; Drašnice; Donja Motičina; Donji Kukuruzari; Dražice; Dubravica; Donja Bistra; Dežanovac; Divulje;
      Duboševica; Desno Trebarjevo; Donja Zdenčina; Dugobabe; Dragalić; Dubranec; Donja Suvaja; Donji Vidovec; Donje Ogorje; Drnje;
      Drače; Drivenik; Domašinec; Draguć; Dubravice; Dekanovec; Donje Raštane; Donji Proložac; Dubrava kod Šibenika; Duboka; Dol;
      Donji Laduč; Donji Bitelić; Dobranje; Drinovci; Donji Kosinj; Demerje; Došen Dabar; Danilo Biranj; Donja Zelina; Dopsin;
      Donja Višnjica; Desne; Draga Bašćanska; Drežnik; Donje Sitno; Donja Jagodnja; Donji Desinec; Duboki Dol; Dumovec; Donje Primišlje;
      Doljani; Donja Kupčina; Donji Trpuci; Dobropoljci; Donji Humac; Dusina; Donja Pušća; Drum; Duba Pelješka; Divojevići; Dobra Voda;
      Dubravka; Doli; Donje Obuljeno; Donji Muć; Donje Dubrave; Donje Novo Selo; Dragotin; Dajla; Djedina Rijeka; Dane; Dinjiška;
      Dračevica; Donje Selo; Donji Macelj; Drvenik Veliki; Duba; Divoš; Dunjkovec; Dobropoljana; Deringaj; Dubci; Donji Zagon;
      Draškovec; Donja Bačuga; Dračevac Ninski; Drenov Klanac; Donje Ladanje; Donja Vrba; Dubočac; Donja Šemnica; Duzluk; Duge Njive;
      Dolovo; Dugi Dol; Debelo Brdo; Danilo Kraljice; Donja Bebrina; Dobrodol; Donji Zvečaj; Donji Mihaljevec; Deanovec; Donja Banda;
      Donji Babin Potok; Dolića Draga; Dobreć; Donja Gračenica; Drvenik Mali; Dragove; Dunave; Dragozetići; Dervišaga; Donje Polje;
      Domagović; Domaslovec; Dvornica; Drenovac Osredački; Delići; Donja Kovačica; Dračevac; Dišnik; Duba Konavoska; Desni Štefanki;
      Donji Kneginec; Donji Kućan; Dobrinče; Donji Vaganac; Dubrovčan; Dubrava kod Tisna; Donji Hrašćan; Donji Vukojevac;
      Drenje Brdovečko; Divuša; Dragljane; Donja Drenova; Dubrava Pušćanska; Donji Mosti; Donji Štrbci; Dereza; Donji Čehi;
      Donje Postinje; Donji Bogićevci; Donje Vinovo; Duba Stonska; Dubrava Zabočka; Daruvarski Brestovac; Donja Batina; Donji Lađevac;
      Dobroselo; Dolenja Vas; Dobrovac; Dragović; Donja Obrijež; Drenov Bok; Detkovac; Dragovci; Drenovec; Donja Pištana; Duga Luka;
      Donje Prilišće; Donja Vrućica; Dolina; Donja Budičina; Dubrava Križovljanska; Donji Meljani; Duga Međa; Dubovac; Desni Dubrovčak;
      Dužica; Donja Dobra; Doljan; Donja Petrička; Donji Hruševec; Dograde; Donje Podotočje; Donji Čaglić; Donji Koncovčak;
      Donje Predrijevo; Dolci; Dioš; Desmerice; Donji Varoš; Donje Selište; Donje Orešje; Draganovec; Dubovik; Dragotina;
      Donji Pustakovec; Donji Žirovac; Dabašnica; Dugo Selo Lukačko; Donje Mrzlo Polje Mrežničko; Duga Rijeka; Divšići; Drašković;
      Donji Nikšić; Donja Pačetina; Donja Čemernica; Dodoši; Dazlina; Donje Planjane; Darkovac; Draga; Donje Bazije; Donji Rogolji;
      Debelo Brdo I; Dugo Selo Lasinjsko; Dragošička; Drnek; Dragoslavec; Donje Jesenje; Držimurec; Donje Mekušje; Druškovec; Doliće;
      Drežnik Brezovički; Daranovci; Donji Grahovljani; Dinjevac; Donji Klasnić; Dobrogošće; Donji Velemerić; Donja Velešnja;
      Donja Vlahinička; Dnopolje; Drežnik Podokićki; Donje Cjepidlake; Dedin; Desni Degoj; Donji Hrastovac; Donji Brgat; Drljanovac;
      Donji Slatinik; Draževitići; Donja Rašenica; Donje Makojišće; Dautan; Dubovica; Donji Lipovac; Donji Selkovac; Donja Reka;
      Donje Zagorje; Desprim; Drljača; Donja Trebinja; Donje Utore; Dapci; Duhovi; Donji Sređani; Dumače; Drenovac Radučki; Dubovec;
      Dokmanovići; Dragonoš; Dijaneš; Družbinec; Donji Fodrovec; Donja Purgarija; Donji Budački; Doljanci; Dražica; Donja Poljana;
      Donji Dobretin; Donji Daruvar; Dančanje; Draganlug; Donji Miklouš; Debelo Brdo II; Donji Borki; Divjake; Donje Vratno;
      Donji Emovci; Damalj; Dol Klanječki; Doljanovci; Drenčec; Derežani; Donji Skrad; Desno Sredičko; Draganje Selo; Dragotinci;
      Donji Viduševac; Dapčevački Brđani; Drškovci; Donje Komarevo; Donje Kusonje; Desno Željezno; Delovi; Donja Podgora;
      Donja Glogovnica; Donje Taborište; Dobra Kuća; Dubravec; Donje Dvorišće; Donji Furjan; Donji Mekinjar; Draga Svetojanska;
      Donje Psarjevo; Donja Mlinoga; Donji Gučani; Drenovac Banski; Donji Sjeničak; Deanovići; Dubrava Samoborska; Dabrina;
      Donji Crnogovci; Domankuš; Dubac-Varsan; Dijakovac; Draše; Daruvarski Vinogradi; Dobrović; Donja Obreška; Donja Jelenska;
      Drenje Šćitarjevsko; Duga Gora; Drakulić Rijeka; Doljani Žumberački; Doluš; Dragoslavec Selo; Donja Brusovača; Dvoranci;
      Donja Greda; Dubravci; Družilovec; Donje Stative; Dolac; Dubrave; Dragoslavec Breg; Donja Pastuša; Donji Javoranj; Donja Šušnjara;
      Donjara; Draguzeti; Donji Kremen; Domitrovec; Donji Zbilj; Donji Oštrc; Donje Zdjelice; Donja Bučica; Dujmić Selo; Dvorišće;
      Deževci; Drašći Vrh; Donja Trstenica; Donje Mokrice; Donji Ložac; Donja Letina; Domahovo; Dobrić; Domaji; Donja Plemenšćina;
      Dragovanščak; Domovec; Drinak; Dedina; Dubravski Markovac; Dvori; Donja Vrijeska; Dančulovići; Donja Bukovica; Dračevo Polje;
      Dropkovec; Donja Velika; Donja Rijeka; Donji Bjelovac; Donja Lamana Draga; Donja Šumetlica; Donji Tkalec; Dulepska; Donje Jame;
      Donja Stupnica; Dobri Zdenci; Dukovec; Dučići; Dijankovec; Donja Selnica; Dobrenići; Dvorjanci; Delači; Deklevi; Donja Perjasica;
      Donja Glina; Donja Oraovica; Donji Vukšinac; Debeljuhi; Donji Zebanec; Dragovići; Donji Poloj; Druškovec Humski; Draškovac;
      Donji Vučkovići; Drastin; Dolnjaki; Donje Prekrižje; Donje Bukovlje; Dunjak; Dropčevec; Džaperovac; Donja Brckovčina; Daskatica;
      Donji Čemehovec; Dojutrovica; Dolanjski Jarak; Dragoševci; Donji Maslarac; Donji Draganec; Donji Marinkovac; Donji Jalšovec;
      Dugače; Dominkovica; Donja Konjščina; Danci; Dvorska; Donji Prnjarovec; Deklešanec; Donje Gnojnice; Donji Cerovac; Donji Vukšići;
      Durlinci; Donji Škrnik; Dvorište; Donji Okrug; Donji Lipovčani; Donji Šajn; Domijanići; Donja Krašićevica; Donji Markovac;
      Donje Vino; Dubravčani; Donja Visočka; Draga Lukovdolska; Donji Žagari; Diklići; Donji Lović; Donji Dragičevci; Donje Tihovo;
      Donji Dubovec; Delkovec; Drlež; Donji Turni; Dvorišće Ozaljsko; Doljanec; Desinić Gora; Dugnjevec; Donja Topličica;
      Donji Oštri Vrh Ozaljski; Dani; Donji Bukovac Žakanjski; Donje Brezno; Dolec Podokićki; Druškovec Gora; Dekovići; Donji Popovac;
      Donji Šehovac; Delić Poljana; Deklići; Dvorište Vivodinsko; Donja Žrvnica; Drenovica Lipnička; Dubravica Desinićka;
      Dubovec Bisaški; Donja Stranica; Dolenci`,
  },
  {
    slug: "mjesto-m",
    group: "hr",
    title: "Mjesto u Hrvatskoj na slovo M",
    answers: `Makarska; Metković; Mali Lošinj; Motovun; Marija Bistrica; Medulin; Mošćenička Draga; Marina; Mrkopalj; Moravice; Mursko Središće;
      Mirkovci; Malinska; Milna; Matulji; Medviđa; Mokošica; Mala Subotica; Marija Gorica; Mravince; Marčana; Maslenica; Molve;
      Markušica; Modruš; Mače; Medov Dolac; Mošćenice; Molunat; Mlini; Metajna; Maruševec; Mihovljan; Mimice; Maljevac; Martinska Ves;
      Maslinica; Murvica; Mandre; Medak; Muškovci; Marijanci; Mraclin; Mikleuš; Maovice; Mošćenica; Murter; Mohovo; Marinci;
      Mokro Polje; Majur; Markovo Polje; Mirlović Polje; Macinec; Mali Iž; Medveja; Mikluševci; Mirca; Magadenovac; Mali Bukovec;
      Mičevec; Malo Grablje; Mazin; Mogorić; Martinšćica; Majske Poljane; Martijanec; Mahićno; Mirlović Zagora; Mrzla Vodica; Moravče;
      Mali Mihaljevec; Mlinište; Mastrinka; Mundanije; Mrežnica; Mali Ston; Mijaca; Molat; Marušići; Momjan; Mušaluk; Miočić; Morpolača;
      Mokrice; Mece; Miranje; Miljevci; Merag; Maljkovo; Mjesto Primišlje; Markovac Našički; Medari; Marinići; Mala Mlaka; Mačkovec;
      Muntić; Molvice; Marjančaci; Mala Gorica; Madžarevo; Mrzović; Mitlo; Majške Međe; Marčelji; Milanovac; Majkovi;
      Markuševec Turopoljski; Mačkovac; Margečan; Magić Mala; Međurić; Martin; Mareda; Mlaka; Malino; Močići; Mustafina Klada;
      Matijevići; Močile; Mandićevac; Mihalj; Marino Selo; Miškovići; Mravnica; Mavrinci; Mala Erpenja; Mutilić; Mirkovac; Mihaljevci;
      Metohija; Mučići; Mrzlo Polje; Mratovo; Mečenčani; Mala Gradusa; Miholjački Poreč; Mlaka Antinska; Majar; Mikleuška; Mali Gradac;
      Marčan; Mitrovac; Milanlug; Marija Trošt; Mrljane; Martinovo Selo; Mala Buna; Moseć; Modrino Selo; Melnice; Momići; Mašić;
      Medinci; Možđenec; Mutvoran; Madžari; Merolino Sikirevačko; Mikulići; Manjadvorci; Moštanica; Mandaljena; Maranovići; Milohnići;
      Mala Učka; Majkovec; Maja; Mravinjac; Mihanići; Melinovac; Mali Zdenci; Mrčevo; Mrzlo Polje Žumberačko; Miholašćica; Musić;
      Mali Prolog; Majerje; Merenje; Marinje Zemlje; Malinovac; Marof; Mali Lug; Matase; Mušalež; Murine; Mrzli Dol; Mala Kopanica;
      Materada; Maglenča; Miklavec; Mali Dol; Murvica Gornja; Marindvor; Medsave; Maletići; Mrzljaki; Mali Grđevac; Makoše; Mašvina;
      Macute; Markovac; Mahovo; Miholec; Mihotići; Malunje; Mrkoplje; Marija Magdalena; Mala Rakovica; Miholjanec; Maružini; Male Mune;
      Migalovci; Mugeba; Mrežnički Brig; Marjanski Ivanovci; Matković Mala; Mala Ludina; Molve Grede; Međurača; Muntrilj; Male Srakane;
      Mišljenovac; Međare; Mala Dapčevica; Munjava; Mlakva; Martinšćina; Mihaljevac; Mala Črešnjevica; Martinci Miholjački; Mali Obljaj;
      Mala Jazbina; Mala Vranovina; Makloševac; Miljanovac; Medvidovića Draga; Međurače; Mrgani; Miljana; Mala Ostrna; Mačkovo Selo;
      Marasi; Mužilovčica; Merhatovec; Martinovići; Milinac; Mala Rasinjica; Mali Poganac; Marinbrod; Martinuševec; Mala Pisanica; Međa;
      Mali Lipovec; Mijači; Mali Brgud; Mostari; Mirkovec; Medven Draga; Mičetinac; Mali Otok; Marići; Muraj; Moravička Sela;
      Maslenjača; Milčetići; Mala Barna; Malo Selo; Martina; Mala Peratovica; Miličani; Mali Podol; Martinkovec; Mrežnički Varoš;
      Mala Solina; Miljevac; Mihaljekov Jarek; Moslavačka Slatina; Most-Raša; Martinišće; Musulini; Mali Bilač; Markovo; Martinac;
      Malo Polje; Mračin; Majdan; Marčani; Majurec; Madaraševec; Malo Korenovo; Malo Trojstvo; Miočinovići; Mala Plana; Mladenići;
      Mihaljevići; Mali Bastaji; Mrežnički Novaki; Mihatovići; Mislina; Milivojevci; Mirkopolje; Mokreš; Mala Lešnica; Marčenegla;
      Mali Erjavec; Mala Milešina; Međeđak; Mokrice Miholečke; Matenci; Martinec Orehovički; Marceljani; Mihalić Selo; Merišće; Maretić;
      Mali Botinovac; Makov Hrib; Monterol; Magadinovac; Marković Selo; Mateško Selo; Mišinci; Mali Raven; Milovčići; Milaši; Mračaj;
      Milotski Breg; Milekovo Selo; Mlakovac; Majski Trtnik; Meljan; Manja Vas; Malička; Majer; Milaševac; Matohanci; Malik;
      Mala Trapinska; Mali Pašijan; Mekiši kod Vižinade; Miholjsko; Modrovec; Malo Vukovje; Melnica; Male Drage; Modrušani; Munije;
      Mala Kosnica; Mala Mučna; Munjava Modruška; Montižana; Mandić Selo; Markušbrijeg; Mali Rastovac; Marlovac; Medaki; Martinić;
      Mali Grabičani; Mihanovićev Dol; Mala Bršljanica; Mali Banovac; Mala Babina Gora; Medveje; Manjerovići; Mala Paukova; Marinovec;
      Markovići; Malinci; Maljevačko Selište; Mrežnički Brest; Mali Budići; Mali Jadrč; Mali Vareški; Mali Potočec; Mali Mlun;
      Mala Ciglena; Milanezi; Martinčići; Mala Jasenovača; Majkusi; Mala Gora; Mali Vuković; Mihelići; Maršići; Mandli; Most;
      Mirkovec Breznički; Montovani; Mišinka; Mihajlije; Mala Trnovitica; Mandalenčići; Momčilovića Kosa; Mičijevac; Mala Hrastilnica;
      Mezinovac; Mali Miletinac; Makovci; Markovac Križevački; Mali Golji; Mala Mlinska; Mlinari; Malo Selce; Mala Crkvina; Mužini;
      Mali Gorenec; Mali Turini; Muričevec; Mački; Mala Rijeka; Mala Branjska; Mali Carevdar; Male Sesvete; Mali Modruš Potok;
      Medvidići; Mošanci; Matulini; Mali Tabor; Malešević Selo; Mičetići; Marindolsko Brdo; Martinski Vrh; Matići; Mateše; Miladini;
      Mala Klisa; Mala Paka; Mrežničke Poljice; Međedi; Malo Gradišće; Mali Lovrečan; Međeđak Utinjski; Markoci; Maturovec; Marigutić;
      Mokrica Tomaševečka; Mracelj; Movrač; Maklen; Maretići; Mali Kozinac; Maurovići; Marenić; Mala Dobra; Martiša Ves; Mali Komor;
      Mrežničko Dvorište; Mala Kosa; Milani; Mikovec; Malo Krčevo; Mekiši kod Kaštelira; Mastelići; Mala Pačetina; Mali Vrh Kamanjski;
      Mali Brezovec; Markušići; Matijaši; Miloševac; Mališi; Mlinski Vinogradi; Mračaj Krstinjski; Marinovec Zelinski`,
  },
  {
    slug: "mjesto-l",
    group: "hr",
    title: "Mjesto u Hrvatskoj na slovo L",
    answers: `Ludbreg; Labin; Lepoglava; Lipik; Lovran; Legrad; Lasinja; Lokva Rogoznica; Lovinac; Lumbarda; Lički Osik; Lobor;
      Lišane Ostrovičke; Laslovo; Lovreć; Lanišće; Lopar; Ladimirevci; Lučko; Lekenik; Lećevica; Lovas; Ližnjan; Lič; Lipovljani; Lokve;
      Lubenice; Lupoglav; Lipovac; Lun; Ličko Petrovo Selo; Luka; Lukovdol; Luč; Ličko Lešće; Ljubešćica; Lokvičići; Lovište; Lastovo;
      Levanjska Varoš; Lužani; Ljubač; Ložišća; Lukoran; Letovanić; Lopud; Lepavina; Lukač; Lukovo Šugarje; Lipa; Lukavec; Lozovac;
      Lukovo; Lička Jesenica; Lišane Tinjske; Ledenice; Ludvinci; Lopatinec; Lug; Lukar; Lisičić; Lazina Čička; Ljubitovica; Lađevci;
      Loborika; Lipovača; Lišnjak; Lužan; Lički Novi; Lužnica; Lepuri; Lila; Lučane; Lipice; Lijevi Dubrovčak; Lug Gradinski; Lonjica;
      Livade; Livana; Lug Subotički; Letinac; Lukarišće; Ljubostinje; Lički Ribnik; Lović Prekriški; Lozica; Lijevo Sredičko; Ljupina;
      Lički Čitluk; Laz Bistrički; Lapovci; Ledenik; Ličko Novo Selo; Laze; Lukinić Brdo; Lučelnica; Lijevi Štefanki; Liganj; Lađevac;
      Linardići; Lisac; Lovrečica; Lacići; Lipovo Polje; Levinovac; Lovrečan; Lovčić; Lindar; Lipnica; Londžica; Lađanska;
      Lug Samoborski; Ličko Cerje; Leskovec Toplički; Lokvica; Ladvenjak; Labinci; Ladislav; Ljuta; Ljubošina; Lonja; Luščani;
      Lovranska Draga; Lisičine; Lučice; Lepenica; Lekneno; Loznati; Ljubotić; Lovorno; Laktac; Ljeskovac; Latinovac; Lasovac; Lozan;
      Liska; Lepa Ves; Lakmartin; Lončarica; Ljut; Lužan Biškupečki; Lepajci; Lesišćina; Leprovica; Lukavac; Lovska; Lopača; Leskovec;
      Laktec; Lovrečka Varoš; Ludbreški Ivanac; Lokošin Dol; Lunjkovec; Lučinci; Laminac; Luka Krmpotska; Ljudevit Selo; Lug Zabočki;
      Leštakovec; Ladislavec; Lapat; Lučica; Laze Prnjavor; Lipovlje; Leskovac Barilovićki; Luka Pokupska; Ljubelj Kalnički; Lipnik;
      Lovorje; Ladislav Sokolovački; Ljubina; Lupinjak; Lovča; Lukeži; Lovrin; Lapšina; Lipovec Lonjski; Lipovo Brdo; Lotine; Letaj;
      Letičani; Ložnice; Ljubelj; Lipje; Lipine; Liješće; Lišnica; Lipovac Hrastinski; Ledenik Cesarički; Lipovec; Lijeva Luka;
      Lug Poznanovečki; Liplje; Lještani; Lubarska; Lemeš; Lapovac; Ledinec; Lubena; Ljubljeva; Levkušje; Lipovac Majur;
      Lučelnica Tomaševečka; Lakušija; Lukovec; Letovanci; Laz Stubički; Livađani; Lančić; Lipovnik; Lovrentovec; Ladići;
      Lukavec Posavski; Ladinec; Latin; Lepšić; Ljutići; Lenišće; Lumbardenik; Lipovčani; Leskova Draga; Lautari; Lemeš Križevački;
      Lijevi Degoj; Lužani Zagorski; Lovrečka Velika; Lesci; Lazi Turopoljski; Luka Ludbreška; Loskunja; Lijevo Trebarjevo; Lozari;
      Lalići; Ledina; Ladrovići; Lijevo Željezno; Ledinec Gornji; Ljubljanica; Lug Orehovički; Lukavec Klanječki; Lučina; Ladešići;
      Ludinica; Lovreća Sela; Lazi Krapinski; Lazarići; Ladina; Letovčan Novodvorski; Letovčan Tomaševečki; Laginji; Leska; Lepoglavec;
      Lazi; Lađevačko Selište; Luke; Lasovac Brdo; Lisine; Ledine Klanječke; Lisičina Gorica; Lazac Lokvarski; Lukačevec Toplički;
      Lonjgari; Lukačevec; Lukunić Draga; Lipnica Zagorska; Lastine; Lukavec Sutlanski; Lugarski Breg; Lakovići; Lašići; Legovići;
      Lukovčak; Luke Poljanske; Letajac; Lipov Pesak; Lukšići Ozaljski; Laslavići; Lipovac Krstinjski; Lipošćaki; Lončar Brdo`,
  },
  {
    slug: "mjesto-r",
    group: "hr",
    title: "Mjesto u Hrvatskoj na slovo R",
    answers: `Rijeka; Rovinj; Rogoznica; Ravna Gora; Rastoke; Rabac; Rab; Rakovica; Raša; Rugvica; Rovanjska; Ražanac; Ružić; Rakitje;
      Račinovci; Radučić; Radoboj; Rasinja; Rovišće; Rešetari; Ražanj; Raštević; Roč; Raslina; Rakalj; Ričice; Rakov Potok; Ribnik;
      Radošić; Rakovec; Rtina; Runović; Rude; Rogotin; Rašćane; Radašinovci; Rupe; Rajevo Selo; Raduč; Rokovci; Ramljani; Račišće;
      Rodaljice; Retkovci; Rovinjsko Selo; Rajić; Ruščica; Ruda; Rastušje; Rogač; Radovin; Rukavac; Rupa; Razvođe; Rastovac; Radonić;
      Rakitovec; Ramljane; Ribnica; Repušnica; Rogoža; Rečica; Rašćane Gornje; Remetinec; Rakitovica; Reka; Ravča; Ruševo; Rudopolje;
      Ročko Polje; Rumin; Račja Vas; Rizvanuša; Radovan; Risika; Rudopolje Bruvanjsko; Rašpor; Radikovci; Rože; Rim; Rožat; Rudina;
      Repaš; Rujevac; Rakovičko Selište; Rezovac; Radakovo; Ravni Dabar; Radovanci; Raba; Ribnjak; Radovčići; Režanci; Rupalj;
      Rešetarevo; Rasopasno; Radatovići; Rava; Radovanje; Razloge; Rudanovac; Ravni; Razbojište; Rečica Kriška; Resnik; Roždanik;
      Rajsavac; Ratkov Dol; Ratkovica; Rastovača; Roženica; Ropa; Rastoka; Riđane; Rapain Klanac; Rosulje; Rudine; Repišće; Ribnjaci;
      Račice; Rušani; Rajčići; Ribnjačka; Risvica; Radetići; Rakotule; Rakitnica; Radljevac; Ruča; Rastoki; Rešetar; Ruševac;
      Ribić Breg; Radočaj; Ribarići; Rezovačke Krčevine; Radoišće; Robadje; Ravan; Repinec; Rošini; Rastičevo; Reštovo Žumberačko;
      Rašćani; Ramanovci; Radunić; Ripenda Verbanci; Rakovci; Ratkovac; Radosavci; Rebići; Ruškovica; Rijeka Koprivnička; Rogovac;
      Rozmajerovac; Radeljevo Selo; Rijeka Voćanska; Rogulje; Ružići; Radnovac; Rebić; Ripenda Kras; Rasna; Razljev; Rude Pribićke;
      Ruškovac; Radmani; Razdrto; Rozga; Radini; Ravno Rašće; Rogovići; Radovani; Razvor; Rit; Reštovo; Ruševica; Rojnići; Rađenovci;
      Rogačić; Raponji; Radovec; Radigojna; Ratkovec; Rinkovec; Radoševići; Ravnice; Rausovac; Rodin Potok; Roviška; Rogi; Radonja;
      Repovec; Radešić; Radoši kod Žbandaja; Ripenda Kosi; Rebrovići; Rijenci; Rakovec Tomaševečki; Ravneš; Rajakovići; Rapavel;
      Rukljevina; Rosopajnik; Rivalno; Rajino Polje; Rovno; Repno; Rendulići; Rabinja; Rivanj; Ruševo Krmpotsko; Rusnica;
      Račički Brijeg; Račak; Rajki; Radići; Ravninsko; Rudani; Radonja Luka; Radovec Polje; Ravno Brezje; Ribari; Ratulje; Rasohe;
      Ravnice Desinićke; Radoši kod Višnjana; Removac; Rovištanci; Razdrto Tuheljsko; Rogočana; Rovci; Raskrižje; Rastovac Budački;
      Rafaeli; Redovje; Reškovci; Rudeži; Resnik Bosiljevski; Rujevo; Rtić; Radočaji; Retkovec Svibovečki; Radočaj Brodski;
      Razloški Okrug; Rupeni; Radulec; Raskrižje Tihovo; Radinovo Brdo; Rajić Brdo; Radina Vas; Roškići; Radmanovac; Radina Gorica;
      Repićevo Selo; Rojci; Resnatac; Ravnica`,
  },
  {
    slug: "mjesto-t-z",
    group: "hr",
    title: "Mjesto u Hrvatskoj na slovo T ili Z",
    answers: `Zagreb; Zadar; Trogir; Zaprešić; Trilj; Topusko; Zabok; Zmijavci; Trpanj; Tučepi; Tenja; Tribunj; Zagvozd; Trpinja; Tinjan;
      Tovarnik; Tisno; Zlatar; Zrin; Tordinci; Zaostrog; Turanj; Tuheljske Toplice; Tkon; Zaton; Zadvarje; Tounj; Zemunik Donji; Tugare;
      Zelovo; Tar; Zrmanja Vrelo; Zmajevac; Tompojevci; Zlatar Bistrica; Tuhelj; Tijarica; Zaton Obrovački; Zdenci; Tribalj;
      Zastražišće; Trnava; Zaglav; Tinj; Trstenik; Zelengrad; Turopolje; Trnovec; Trsteno; Zvekovica; Zavala; Zlarin; Zavojane; Zlobin;
      Završje; Topolovac; Tribanj; Zemunik Gornji; Zrinski Topolovac; Trnbusi; Zagorska Sela; Tršće; Zalužnica; Topolje; Zambratija;
      Trenkovo; Turjaci; Tušilović; Toplice Sveti Martin; Trnovac; Trakošćan; Turčin; Tikveš; Zapuntel; Tvrđavica; Zečevo Rogozničko;
      Zubovići; Zagrad; Zakučac; Zajezda; Tužno; Tomica; Tiškovac Lički; Trnjani; Trolokve; Trbounje; Zvečanje; Tepljuh; Zaklopatica;
      Trošmarija; Torjanci; Tomašanci; Zasadbreg; Zvečaj; Zbjeg; Trget; Zasiok; Zapužane; Zrmanja; Trojstveni Markovac; Zlatna Greda;
      Tuk; Terezino Polje; Zelčin; Zvonimirovac; Zadobarje; Zoljan; Tomaš; Topolo; Zagrađe; Zdenci Brdovečki; Zapolje; Torčec;
      Zadubravlje; Trški Vrh; Trstenik Nartski; Tomašnica; Zagorje; Zvoneća; Zdihovo; Zbelava; Zadvorsko; Zvjerinac; Trnjanski Kuti;
      Trnovica; Zaton Doli; Zrinska; Trojeglava; Tisovac; Tržić; Zbjegovača; Turčišće; Trviž; Turnašica; Trepča; Tomingaj; Zrenj;
      Trebovec; Zorkovac; Taborište; Totovec; Zečevo; Zaraće; Turanovac; Završje Podbelsko; Tihočaj; Tičan; Tomašica; Tupljak;
      Tiborjanci; Tolić; Topoline; Tuk Vojni; Trebež; Triban; Tržić Primišljanski; Trnova; Tuhovec; Trema; Turjanski;
      Trnovitički Popovac; Turke; Zokov Gaj; Točak; Zamask; Trapari; Trn; Treštanovci; Toranj; Završje Netretićko; Turčević Polje;
      Zeleno Polje; Zarilac; Tuk Mrkopaljski; Tekić; Tanac; Zalesina; Tišina Erdedska; Tržić Tounjski; Zvonimirovo; Turnić; Zoljani;
      Zebanec Selo; Zelendvor; Zabrđe; Zastolje; Topolovica; Točionik; Zvijerci; Turkovići Ogulinski; Topličica; Zut; Zamlača; Zatoglav;
      Tučenik; Topolovec; Trnakovac; Zabrežani; Trgovišće; Zagore; Trg; Zamaslina; Zlogonje; Zamlaka; Zadrkovec; Tomislavovac; Tupkovec;
      Tomaševec Biškupečki; Tomići; Zrinj Lukački; Zverinac; Tugonica; Trnavac; Zelin Mrzlovodički; Zbičina; Tuškani; Teodorovac;
      Zaklopac; Tominovac; Zvekovac; Zaluki; Tuliševica; Zablatje; Zaistovec; Zavrelje; Tišina Kaptolska; Zagradci; Timarci; Tkalci;
      Zečev Varoš; Toplice; Trnovac Glinski; Zastenice; Tulnik; Zrinšćina; Zakorenje; Trojvrh; Zarečje; Tomaševec; Tribulje; Zdenčac;
      Zaveščak; Zaklopača; Zbišina; Zamost; Zrinski Brđani; Zadravec; Zidarići; Tisanić Jarek; Trnava Cabunska; Zorkovac na Kupi;
      Zakopa; Trgovi; Zamaski Dol; Turkovčina; Zamršje; Zavođe; Tatar Varoš; Zablatje Posavsko; Zabukovac; Tuk Bjelopoljski; Trnje;
      Zoretići; Zalužje; Tići; Temovec; Tuštevac; Treglava; Tedrovec; Turčić; Zetkan; Zdenac; Zvonik; Zajačko Selo; Tisovac Žumberački;
      Zelina Breška; Zagolik; Zaloj; Trešćerovac; Zajci; Zapolje Brodsko; Zapeć; Trupinjak; Zagora; Završje Loborsko; Zaluka; Tomaševci;
      Turnišće; Trgetari; Zgurić Brdo; Zaklepica; Završje Začretsko; Tadini; Tarno; Tvrda Reka; Tkalec; Tremušnjak; Topid; Zdenčec;
      Tociljevac; Zaumol; Zoričići; Trnovi; Zelin Crnoluški; Zgališće; Zaluka Lipnička; Topolovec Pisarovinski; Zorkovac Vivodinski;
      Tupčina; Zavrh; Trtnik Glinski; Trnovac Sokolovački; Trnovec Desinićki; Zrinska Draga; Znož; Zimić; Zahrt; Zamost Brodski; Zagraj;
      Zapoljak; Tomašići; Zgrabljići; Završje Belečko; Zatka Čepić; Zamladinec; Trnovo; Tomišići; Tropeti; Zeci; Tusti Vrh; Zankovci;
      Zleć; Zakrajc Brodski; Turčenica; Zakrajc Turkovski; Zalug; Tripari; Zaborsko Selo; Tončići; Turnišće Desinićko; Trški Lazi;
      Točak Perjasički; Turnišće Klanječko; Trombal; Zinajevac; Turnovo`,
  },
  {
    slug: "mjesto-c-s-z",
    group: "hr",
    title: "Mjesto u Hrvatskoj na slovo Č, Ć, Š ili Ž",
    answers: `Šibenik; Čakovec; Čavoglave; Škabrnja; Županja; Čepin; Čabar; Čazma; Štrigova; Žminj; Žrnovnica; Šarengrad; Željava; Živogošće;
      Čađavica; Šestanovac; Čavle; Ćunski; Čačinci; Špišić Bukovica; Štitar; Čaglin; Šodolovci; Žumberak; Čingi-Lingi; Ćelije; Ždralovi;
      Žman; Široka Kula; Žaborić; Žuljana; Čeminac; Švica; Štikada; Španovica; Šilo; Šćitarjevo; Čanak; Šećerana; Čilipi; Žrnovo;
      Čista Velika; Žakanje; Šimuni; Čigoč; Šapjane; Čista Mala; Žuta Lokva; Škrip; Šenkovec; Šiškovci; Špičkovina; Ždrelac; Škrljevo;
      Štefanje; Šopot; Čara; Žeževica; Žejane; Šmrika; Široko Polje; Žabnik; Šandrovac; Čakovci; Šaptinovci; Čaporice; Červar-Porat;
      Šišan; Čižići; Čibača; Ćeralije; Žagrović; Žitnić; Čepikuće; Štakorovec; Štikovo; Črnkovci; Žedno; Šipanska Luka; Župa; Šumeće;
      Šašinovec; Čajkovci; Ždala; Žerjavinec; Čvrljevo; Čitluk; Žena Glava; Šiljakovina; Čepinski Martinci; Žbandaj; Šljivoševci;
      Čabrunići; Čelina; Žirje; Čisla; Šušnjevica; Škare; Šumanovci; Žerava; Čovići; Šag; Železna Gora; Čokadinci; Čatrnja; Švajcarnica;
      Čačvina; Žažvić; Žažina; Štrmac; Šumber; Štivica; Črečan; Čabdin; Živaja; Širitovci; Četekovac; Šimunčevec; Štefanec; Šišljavić;
      Šumetlica; Šemovci; Šagovina Cernička; Šumet; Čelopeci; Čuntić; Ždrilo; Škrinjari; Čukovec; Šagovina Mašićka; Črnkovec; Čenkovo;
      Čepić; Škarićevo; Šeovica; Šušnjevci; Širine; Čepelovac; Štokovci; Šemovec; Čehovec; Šnjegavić; Šajini; Šumarina; Črešnjevo;
      Čamagajevci; Žiškovec; Žabno; Čukur; Šegotići; Šumećani; Črnec Biškupečki; Šiptari; Škalnica; Šegestin; Žarovnica; Šibice;
      Škrabutnik; Čemernica; Široke; Šarić Struga; Ždrapanj; Škropeti; Živike; Šaš; Šandorovec; Žitomir; Čista Mlaka; Županje; Širinci;
      Šiljkovača; Čret; Žitarka; Šušnjari; Ženodraga; Šterna; Ćosine Laze; Čovac; Čanjevo; Žlebina; Žejinci; Čabraji; Čeglje; Šišinec;
      Červar; Žgaljići; Čelikovići; Šćepanje; Čajkovići; Širinec; Čalinec; Štaglinec; Čajkovica; Županići; Žabica; Štrukovec; Šibovac;
      Šalamunić; Čečavac; Žigrovec; Češljakovci; Čaprginci; Čečavački Vučjak; Čađavički Lug; Čičkovina; Žabnica; Črešnjevec;
      Čret Posavski; Štrucljevo; Škriljevec; Četvrtkovac; Ćurlovac; Čujića Krčevina; Šlivnjak; Čaire; Žabjak; Česvinica; Želiski;
      Črnilovec; Čremušnica; Žužići; Štedrica; Šuplja Lipa; Španat; Čojluk; Šartovac; Črnica; Šumeđe; Žuberkovac; Široka Rijeka; Šćulac;
      Žigerovci; Židovinjak; Žestilac; Široko Selo; Štitnjak; Šilješki; Špiranec; Šatornja; Šeovci; Čemernica Lonjska; Šušelj Brijeg;
      Čađavac; Črnec Dugoselski; Čedanj; Čojlug; Žutnica; Željeznica; Šarići; Šaša; Šebreki; Ćore; Čurilovec; Župić; Šestak Brdo;
      Župa Srednja; Žamarija; Štuparje; Žunci; Živković Kosa; Šćulci; Čepljani; Šipački Breg; Šelovec; Šinkovica Šaška; Švaljkovec;
      Žgombići; Žitkovčica; Šimraki; Šopron; Šimatovo; Žonti; Šagudovec; Štifanići; Štrped; Červari; Žabnjak; Šeganovac; Žukovec;
      Žlebec Gorički; Žubrica; Ćosinac; Čambarelići; Šije; Škarnik; Žirčica; Žakule; Šaševo; Črnec Rugvički; Žreme; Čamerovac; Čapljani;
      Čiritež; Šorići; Šimljanica; Čunkova Draga; Županec; Žikovići; Šćapovec; Čuki; Šijanec; Škaljevica; Čestijanec; Šulinec;
      Žibrinovec; Žabnjača; Črnile; Šaševa; Špigelski Breg; Žrnovac; Žabljak; Žlebec Pušćanski; Šimljanik; Ćuić Brdo;
      Željezno Žumberačko; Šakanlije; Čakanec; Šimljana; Žiroslavlje; Šiljki; Čavlovica; Šibine; Žagrići; Šinkovica Bednjanska;
      Šalamunovec; Žubrinci; Šeketino Brdo; Škopljak; Štefanci; Šivati; Ševalj; Čuši/Ćusi; Čučak; Štakorovica; Šljivovac; Šalovec;
      Špehari; Šipki; Šćrbinec; Žnjidarići; Šemovec Breški; Šurdovec; Čehići; Šušnjići; Škodinovac; Čučići; Škuljari; Žuntići; Štuti;
      Švrakarica; Šimunci; Čret Bisaški; Šorgi; Žudetići; Črnčevec; Škalić Zagorski; Štrigovec; Šepci Podstenski; Šeraje; Štirkovac`,
  },
  {
    slug: "mjesto-n-o-j",
    group: "hr",
    title: "Mjesto u Hrvatskoj na slovo N, O ili J",
    answers: `Osijek; Omiš; Ogulin; Opatija; Nova Gradiška; Jastrebarsko; Našice; Otočac; Obrovac; Nin; Novska; Ozalj; Novi Vinodolski; Novalja;
      Orebić; Osor; Otok; Novigrad/Novi Grad; Jasenovac; Oroslavje; Opuzen; Novi Marof; Okučani; Nuštar; Oprtalj; Jelsa; Omišalj;
      Negoslavci; Jagodnjak; Nedelišće; Nijemci; Orolik; Josipdol; Njivice; Jadranovo; Oriovac; Oklaj; Jakovlje; Okrug Gornji; Jarmina;
      Jablanac; Odra; Nadin; Jasenice; Janjina; Josipovac; Nova Kapela; Orehovica; Ošljak; Nova Rača; Novigrad Podravski; Otavice;
      Jelenje; Nerežišća; Jalžabet; Nerezine; Jakšić; Oborovo; Orle; Jesenice; Ostrovica; Netretić; Oštarije; Neorić; Novigrad na Dobri;
      Jezera; Oprisavci; Jasenak; Ježdovec; Jurandvor; Otišić; Novo Čiče; Otrić-Seoci; Orašac; Odranski Obrež; Ostrovo; Novi Golubovec;
      Nos Kalik; Nemetin; Jablanovec; Opatovac; Novaki; Nedešćina; Nečujam; Novoselec; Nakovanj; Nova Bukovica; Jošani; Jelisavac;
      Jaškovo; Jezerane; Jadrtovac; Orubica; Nunić; Neviđane; Novo Virje; Otrić; Jabukovac; Nova Vas; Obrovac Sinjski; Osojnik;
      Okrug Donji; Ježenj; Novo Selo Rok; Nova Mokošica; Okoli; Orešje; Nard; Jakišnica; Nebljusi; Novo Zvečevo; Olib; Omanovac;
      Nova Sela; Narta; Normanci; Josipovac Punitovački; Niza; Oćestovo; Novi Mikanovci; Jovići; Jaruge; Janja Gora; Ninski Stanovi;
      Ošlje; Ježevo; Osekovo; Naklice; Novi Dvori Klanječki; Ježević; Novi Bezdan; Juršići; Nisko; Jurdani; Novi Jankovci; Opanci;
      Novi Varoš; Orlec; Novakovec; Jagnjedovec; Jugovo Polje; Jurjevac Punitovački; Ostrvica; Jalkovec; Osobjava; Okrugljača; Jabuka;
      Osredci; Oskorušno; Orljavac; Negovec; Oporovec; Noskovci; Nevest; Orlić; Ovčara; Novo Selo; Oton; Novaki Bistranski;
      Osijek Vojakovački; Jagodno; Nedeljanec; Jelovice; Novo Nevesinje; Jalševec Nartski; Novi Perkovci; Okuklje; Nova Ljeskovica;
      Ovrlja; Jurovski Brod; Okešinec; Otok Oštarijski; Japaga; Novo Selo na Dravi; Novoseljani; Novi Farkašić; Noršić Selo; Ogulinec;
      Jasenaš; Jamarica; Orah; Otok Svibovski; Jušići; Jošavica; Obedišće; Jagnjić Dol; Novi Čeminac; Jadreški; Otrovanec;
      Jamnica Pisarovinska; Janja Lipa; Nebojan; Jazavica; Okuje; Obrezina; Nova Ves Petrijanečka; Otruševec; Orbanići; Javorje;
      Jezerce; Ondić; Ostrožin; Oprič; Okunšćak; Odra Sisačka; Novi Senkovac; Ježevik; Jakšinec; Jakačina Mala; Nova Subocka; Nenadići;
      Nespeš; Jesenovec; Jarče Polje; Novo Selo Palanječko; Oplaznik; Novo Selo Okićko; Jagodna; Orlovac; Okrugli Vrh; Obrh; Joševica;
      Neteka; Jertovec; Jablan; Novo Selo Glinsko; Oriovčić; Oteš; Novaki Bizovački; Ostrogašica; Novo Topolje; Obrovnica;
      Nova Ploščica; Ordanja; Oborovo Bistransko; Oštrice; Jagma; Nart Savski; Ostrošinci; Josipovo; Orovac; Jabučeta; Jakopovec;
      Ovčare; Oključna; Nadvrelo; Nadvoda; Otok Virje; Orihi; Jurovec; Orehovec; Opršinac; Novaki Motovunski; Oljasi; Orešac;
      Novo Mjesto; Oravac; Orešje Okićko; Osoje; Novi Pavljani; Nova Kršlja; Jasensko; Okić; Jalšovec; Obradovci; Javorovac; Oraovac;
      Novaki Oborovski; Jazbina; Juricani; Novo Pračno; Jerovec; Jarek Habekov; Javornik; Nevinac; Novi Bolman; Nurkovac; Jezerine;
      Nova Šarovka; Jazvenik; Novo Selo Žumberačko; Jeminovac; Ožegovci; Oštarski Stanovi; Jezero; Jural; Naudovac; Novi Grabovac;
      Novaki Petrovinski; Našičko Novo Selo; Nova Diklenica; Jelov Klanac; Najevi; Jerebić; Jales Breznički; Orlovac Zdenački;
      Jurketinec; Jakšići; Novačka; Oštri Vrh; Novi Gradac; Jakov Polje; Novo Selište; Jezero Klanječko; Novi Bošnjani;
      Obrež Vivodinski; Jalševec Svibovečki; Jurovo; Nugla; Jurkovac; Jurkovo Selo; Nova Jošava; Jarušje; Oštri Zid; Novoselci;
      Novi Mihaljevci; Oglavci; Novo Petrovo Polje; Ozdakovci; Oblakovac; Oskoruš; Ježovec; Nježić; Jaguplije; Jasik; Ornice;
      Novo Selo Koreničko; Nova Drenčina; Otočka; Novaki Pazinski; Jarebinjak; Nikšići; Otok na Dobri; Novo Selo Podravsko; Jurjevec;
      Javor; Jankovac; Omsica; Naselje Stjepana Radića; Jazbina Cvetlinska; Obrež Kalnički; Očura; Omamno; Natkrižovljan;
      Novo Selo Lasinjsko; Novi Skucani; Otok Nartski; Johovec; Jezero Posavsko; Jalšje; Jakovici; Obed; Novaki Šćitarjevski; Johi;
      Opatinec; Nebojse; Javnica; Okrivje; Jurići; Noskovačka Dubrava; Jakuševec Zabočki; Jakopovac; Jurovčak; Jamno; Osunja; Jezernice;
      Jesenovik; Jarek Bisaški; Jazvine; Obedišće Ježevsko; Jehnići; Jeduševac; Obrš; Novaki Ravenski; Novoselo Trnovačko;
      Novi Antunovac; Novi Glog; Novi Đurđic; Novoselo Bilajsko; Jugovac; Orič; Okreti; Juranšćina; Jagodnje; Nova Lipovica; Osečka;
      Jelenščak; Jovac; Novaki Nartski; Nova Pisanica; Naglići; Oštrobradić; Orljakovo; Novi Majur; Jadruhi; Oslići; Nadvučnik;
      Jakačići; Novi Štitnjak; Jakići Dolinji; Novo Selo Garešničko; Jakovci; Novi Bešinci; Obrež Zelinski; Nova Krivaja; Jarki;
      Novo Brdo; Novo Kusonje; Jame; Novi Zdenkovac; Juradi; Jasenovica; Javorek; Obrankovec; Jasenovac Zagorski; Jasenovčani;
      Orehovec Radobojski; Jarki Horvatićevi; Jakomići; Jasikovac; Općevac; Ostojići; Jankovo Selište; Jakovci Netretićki; Otkopi;
      Oratje; Nova Lipa; Jasenik; Jurićev Kal; Jazbina Višnjička; Osonjak; Orišje; Novi Lazi; Jurjevčani; Jurazini; Novi Dol;
      Osredek Žumberački; Novaki Ozaljski; Jarčani; Negnar; Nove Hiže; Novaki Lipnički; Johovo; Jelenjak; Jelovec; Orbani;
      Novo Brdo Mrežničko; Jamarje; Jagrovac; Jurcani; Jadrići; Novakovec Bisaški; Opasanjek; Nardući; Novo Selo Bosiljevsko; Otrčkovec;
      Jezerišće; Novo Selo Perjasičko; Ohnići; Orešje Humsko; Jurga; Jasnić Brdo; Jelovec Voćanski; Jarnevići; Jančani; Nemčevec;
      Orijevac; Orehova Gorica; Osredek Desinićki; Jakići Gorinji`,
  },
  {
    slug: "mjesto-c-h-i",
    group: "hr",
    title: "Mjesto u Hrvatskoj na slovo C, H ili I",
    answers: `Imotski; Crikvenica; Ilok; Hum; Cavtat; Ivanić-Grad; Hrvatska Kostajnica; Hvar; Cetingrad; Hrvace; Ivankovo; Ivanec; Cres; Cerna;
      Hrvatska Dubica; Civljane; Cista Provo; Islam Grčki; Islam Latinski; Crni Lug; Cista Velika; Hum na Sutli; Hreljin;
      Hrvatski Leskovac; Cernik; Hercegovac; Igrane; Cerić; Ivanja Reka; Hlebine; Ičići; Ilača; Cestica; Cetina; Horvati; Harmica;
      Ivan Dolac; Crnac; Cerovlje; Hrašće Turopoljsko; Hrašćina; Ivanovac; Crna Mlaka; Cesarica; Ivanska; Crno; Hodošan; Ivanovo Selo;
      Ivanbegovina; Ivoševci; Hrvatsko Selo; Hrastovica; Crivac; Ciglena; Crni Potok; Humac; Cirkovljan; Hrastovac; Ika; Cerje;
      Ivanovci; Ivanovec; Harkanovci; Crkveni Bok; Caska; Cabuna; Hudi Bitek; Habjanovci; Cerovski Vrh; Carevdar; Hrvatsko Polje;
      Haganj; Imotica; Hrašćica; Cerovac Vukmanićki; Igrišće; Cirkvena; Hrvatsko; Hodilje; Ivanovo; Cugovec; Ilovik; Husain;
      Hruševec Kupljenski; Hrastin; Ivanec Bistranski; Ilova; Cret Bizovački; Cvetlin; Hrženica; Hrebinec; Hižakovec;
      Hrkanovci Đakovački; Imrijevci; Cvetkovec; Cvetković; Hrušćica; Cvitović; Ićevo; Ivanovci Đakovački; Imbriovec; Imsovac; Herešin;
      Hrvatski Čuntić; Hreljin Ogulinski; Cera; Hlevci; Cerovac; Crni Dabar; Crveni Vrh; Cerje Tužno; Hlapičina; Cret Viljevski; Heki;
      Cerovnik; Cicvare; Carevo Polje; Cerje Nebojse; Caginec; Cere; Cage; Hrastelnica; Cerje Jesenjsko; Ceremošnjak; Habjanovac; Ist;
      Havidić Selo; Cerje Samoborsko; Crni Kal; Hromec; Ciglenik; Celine; Hrastina; Hršćevani; Hrib; Cvijanović Brdo; Homer;
      Ivanečka Željeznica; Hotnja; Ciglenica; Hampovica; Cerje Letovanićko; Crljenik; Humljani; Cunj; Hrastina Samoborska; Hrastovsko;
      Cvetković Brdo; Hruševec; Crna Draga; Hrastje; Hum Košnički; Hrnjanec; Cikote; Crevarska Strana; Cvetišće; Hemuševec; Ilmin Dvor;
      Cubinec; Ilovac; Hrboki; Ivanje; Cukrići; Imbriovec Jalžabetski; Cokuni; Horvatsko; Celine Goričke; Cargovec; Irinovac; Cepeliš;
      Celine Samoborske; Cremušina; Hrvatsko Žarište; Hlapa; Heraki; Homoljac; Hum Varoš; Hrnjevac; Cigrovec; Ciglenica Zagorska;
      Crkvari; Cerje Pokupsko; Ilovski Klokočevac; Ivanovo Polje; Hrebine; Ilovačak; Izimje; Ivanbrijeg; Hreljići; Hrastovljan; Colnari;
      Cepidlak; Ivandol; Crkveni Vrhovci; Ivanjski Bok; Hrastovec Toplički; Hudovljani; Hum Zabočki; Hum Stubički; Ivančići;
      Cerovac Barilovićki; Hartje; Cancini; Ivanečko Naselje; Crljenci; Hajdine; Hrastje Plešivičko; Cerina; Crna Klada; Hršak Breg;
      Hum Bistrički; Hambarište; Carevići; Crni Lazi; Ivanec Križevački; Crkovec; Hrsovo; Cerovljani; Hruškovica; Hrtić;
      Ivanečki Vrhovec; Ivančani; Husje; Cvetnić Brdo; Carevo Selo; Iševnica; Hutin; Crno Vrelo; Ipši; Hudovo; Hižanovec; Cvitani;
      Husinec; Hlevnica; Cerik; Hađer; Hrženik; Cetinski Varoš; Hruševec Pušćanski; Hribac; Hrašća; Ivanković Selo; Ivanić Desinićki;
      Ivančec; Hajtić; Crklada; Cerovica; Cerovački Galovići; Hrastovica Vivodinska; Harina Žlaka; Hrsina; Cerion; Istočni Trojvrh;
      Ivošević Selo; Hruškovec; Crni; Crno Kamanje; Ivići; Ivanić Miljanski; Cetinovec; Curkovec; Cebovec; Cesarska Ves;
      Cerje Vivodinsko; Culibrki; Hosnik; Cerjani; Careva Draga; Hodinci; Hrgovec; Ivančići Pokupski; Ivanić Košnički`,
  },
  {
    slug: "grad-hr",
    group: "hr",
    title: "Grad u Hrvatskoj",
    hint: "Svih 128 mjesta sa službenim statusom grada",
    answers: `Zagreb; Split; Rijeka; Osijek; Zadar; Vukovar; Varaždin; Dubrovnik; Šibenik; Pula; Slavonski Brod; Karlovac; Knin; Vinkovci;
      Bjelovar; Gospić; Sisak; Rovinj; Imotski; Omiš; Trogir; Sinj; Velika Gorica; Koprivnica; Samobor; Drniš; Ogulin; Opatija; Požega;
      Virovitica; Makarska; Čakovec; Poreč; Đakovo; Kaštela; Metković; Nova Gradiška; Križevci; Biograd na Moru; Benkovac; Pakrac;
      Mali Lošinj; Beli Manastir; Solin; Ploče; Vodice; Jastrebarsko; Našice; Zaprešić; Daruvar; Crikvenica; Ilok; Otočac; Dugo Selo;
      Obrovac; Slatina; Nin; Petrinja; Novska; Skradin; Umag; Delnice; Senj; Kutina; Slunj; Ludbreg; Ozalj; Labin; Pazin; Trilj; Glina;
      Vodnjan; Supetar; Županja; Krapina; Vrlika; Novi Vinodolski; Stari Grad; Đurđevac; Vrgorac; Zabok; Sveta Nedelja; Orahovica;
      Vrbovec; Komiža; Ivanić-Grad; Garešnica; Novalja; Hrvatska Kostajnica; Sveti Ivan Zelina; Valpovo; Krk; Lepoglava; Otok; Bakar;
      Buzet; Donji Miholjac; Kraljevica; Novigrad; Lipik; Pleternica; Hvar; Prelog; Čabar; Kastav; Duga Resa; Korčula; Grubišno Polje;
      Vrbovsko; Belišće; Pag; Oroslavje; Opuzen; Buje; Popovača; Ivanec; Čazma; Novi Marof; Rab; Vis; Cres; Mursko Središće; Kutjevo;
      Zlatar; Varaždinske Toplice; Pregrada; Donja Stubica; Klanjec`,
  },
  {
    slug: "opcina-hr",
    group: "hr",
    title: "Općina u Hrvatskoj",
    hint: "Ime jedne od općina (gradovi ne vrijede)",
    answers: `Gračac; Škabrnja; Motovun; Borovo; Topusko; Vela Luka; Primošten; Orebić; Gradac; Kistanje; Udbina; Čepin; Marija Bistrica;
      Donji Lapac; Ston; Karlobag; Pakoštane; Baška Voda; Plaški; Cetingrad; Gvozd; Rogoznica; Konavle; Zmijavci; Jasenovac; Brela;
      Ravna Gora; Klis; Medulin; Erdut; Dvor; Mošćenička Draga; Vrsar; Vir; Trpanj; Tučepi; Hrvace; Ivankovo; Vojnić; Brinje; Kumrovec;
      Dugopolje; Starigrad; Voćin; Pitomača; Svetvinčenat; Saborsko; Fužine; Blato; Grožnjan; Baška; Sukošan; Marina; Podgora; Tribunj;
      Krašić; Sveti Filip i Jakov; Okučani; Bibinje; Nuštar; Plitvička Jezera; Davor; Mrkopalj; Zagvozd; Lovran; Babina Greda; Pirovac;
      Velika; Kijevo; Legrad; Kanfanar; Perušić; Privlaka; Oprtalj; Jelsa; Gunja; Štrigova; Trpinja; Bol; Tinjan; Sveti Martin na Muri;
      Lasinja; Tovarnik; Tisno; Omišalj; Žminj; Darda; Veliko Trgovišće; Fažana; Sunja; Rakovica; Posedarje; Bale; Raša; Rugvica;
      Negoslavci; Stara Gradiška; Lovinac; Milna; Vrpolje; Jagodnjak; Vrbnik; Tordinci; Bedekovčina; Nedelišće; Bošnjaci; Bogdanovci;
      Ervenik; Bilje; Nijemci; Promina; Stubičke Toplice; Đulovac; Kneževi Vinogradi; Bednja; Đurđenovac; Krapinske Toplice; Punat;
      Preko; Matulji; Pučišća; Pašman; Kloštar Ivanić; Brdovec; Drenovci; Dugi Rat; Viškovo; Polača; Josipdol; Stankovci; Brckovljani;
      Postira; Pisarovina; Križ; Sopje; Župa dubrovačka; Stari Mikanovci; Unešić; Sveti Petar u Šumi; Bilice; Cerna; Hrvatska Dubica;
      Antunovac; Suhopolje; Ražanac; Lumbarda; Sali; Sutivan; Tkon; Civljane; Bosiljevo; Sveti Križ Začretje; Barban; Vrbanja; Kostrena;
      Lobor; Vrhovine; Sućuraj; Lišane Ostrovičke; Donji Andrijevci; Kotoriba; Sibinj; Strizivojna; Oriovac; Lovreć; Čađavica;
      Cista Provo; Veliki Grđevac; Lanišće; Lopar; Bistra; Sveti Lovreč; Dubrava; Povljana; Šestanovac; Poličnik; Zadvarje; Kali; Čavle;
      Jakovlje; Primorski Dolac; Klinča Sela; Lekenik; Feričanci; Proložac; Gornja Stubica; Brod Moravice; Jarmina; Generalski Stol;
      Virje; Mala Subotica; Garčin; Sikirevci; Tounj; Vrsi; Andrijaševci; Lećevica; Bizovac; Veliki Bukovec; Lovas; Gradina; Draž;
      Čačinci; Skrad; Donja Dubrava; Marija Gorica; Zemunik Donji; Ližnjan; Višnjan; Krnjak; Donja Voća; Klana; Sveti Ivan Žabno;
      Gradište; Donji Kraljevec; Staro Petrovo Selo; Kukljica; Jasenice; Sokolovac; Stari Jankovci; Ernestinovo; Lipovljani; Janjina;
      Špišić Bukovica; Selca; Ružić; Hum na Sutli; Marčana; Gorjani; Molve; Velika Kopanica; Lokve; Končanica; Sračinec; Koška; Sirač;
      Desinić; Markušica; Nova Kapela; Vođinci; Štitar; Draganić; Cernik; Hercegovac; Brestovac; Goričan; Brtonigla; Bedenica; Gradec;
      Prgomet; Petrijevci; Čaglin; Gornji Kneginec; Konjščina; Orehovica; Velika Pisanica; Šodolovci; Funtana; Nova Rača; Stupnik; Mače;
      Galovac; Vinica; Dobrinj; Vinodolska općina; Radoboj; Farkaševac; Žumberak; Rasinja; Rovišće; Kaptol; Slivno; Velika Ludina;
      Novigrad Podravski; Lupoglav; Gundinci; Kula Norinska; Klenovnik; Vižinada; Rešetari; Kravarsko; Pokupsko; Slavonski Šamac; Luka;
      Jelenje; Biskupija; Bukovlje; Nerežišća; Jalžabet; Hlebine; Semeljci; Smokvica; Jakšić; Podgorač; Maruševec; Viljevo; Gola; Orle;
      Veliko Trojstvo; Čeminac; Vuka; Kršan; Pićan; Mihovljan; Ljubešćica; Tompojevci; Ferdinandovac; Barilović; Popovac; Kalinovac;
      Netretić; Belica; Zlatar Bistrica; Đurmanec; Drenje; Kaštelir-Labinci; Martinska Ves; Tuhelj; Vladislavci; Pribislavec; Pušća;
      Đelekovec; Lokvičići; Cestica; Petlovac; Kalnik; Brodski Stupnik; Žakanje; Zdenci; Lastovo; Ribnik; Marijanci; Kloštar Podravski;
      Levanjska Varoš; Donja Motičina; Trnava; Mljet; Dubrovačko primorje; Oprisavci; Kolan; Gračišće; Sveti Juraj na Bregu; Rakovec;
      Mikleuš; Donji Kukuruzari; Gornja Vrba; Bebrina; Dubravica; Sveta Marija; Sveti Ilija; Kapela; Vidovec; Budinščina;
      Velika Trnovitica; Dežanovac; Podcrkavlje; Petrijanec; Crnac; Sveti Petar Orehovec; Cerovlje; Trnovec Bartolovečki; Viškovci;
      Šenkovec; Gornja Rijeka; Sveti Đurđ; Berek; Satnica Đakovačka; Tar-Vabriga; Majur; Strahoninec; Gornji Bogićevci; Preseka;
      Štefanje; Punitovci; Hrašćina; Selnica; Podturen; Severin; Novi Golubovec; Dragalić; Podravska Moslavina; Karojba; Šolta;
      Breznički Hum; Podravske Sesvete; Ivanska; Kamanje; Lukač; Donji Vidovec; Visoko; Magadenovac; Drnje; Mali Bukovec; Nova Bukovica;
      Zažablje; Šandrovac; Domašinec; Okrug; Petrovsko; Peteranec; Kraljevec na Sutli; Zrinski Topolovac; Dekanovec; Koprivnički Ivanec;
      Breznica; Zagorska Sela; Vrbje; Klakar; Beretinec; Novo Virje; Murter-Kornati; Martijanec; Pojezerje; Koprivnički Bregi;
      Vratišinec; Gornji Mihaljevec; Jesenje; Malinska-Dubašnica/Malinska/Dubašnica`,
  },
];

/** Hrvatska pitanja iz ovog vala čekaju parove za BiH i Srbiju (svaka hr kategorija mora imati par s istim slugom). */
export const nove4Hr: SeedCategory[] = mjesta.map(rang);
