// Dodatni odgovori za početne kategorije. Seed ih dodaje postojećim kategorijama (stari odgovori ostaju kakvi jesu).
export const prosirenja: Record<string, string> = {
  otok: `Pakleni otoci/Pakleni=0.5; Elafiti/Elafitski otoci=0.3; Košljun=0.3; Šćedro=0.2; Visovac=0.2; Ošljak=0.1;
    Rivanj=0.1; Jakljan=0.1; Daksa=0.1; Sveti Nikola=0.1; Vrnik=0.1; Proizd=0.1; Brusnik=0.1; Svetac=0.1; Ravnik=0.1;
    Tijat=0.1; Maun=0.1; Crveni otok=0.1; Babac=0.05; Zečevo=0.05; Mrkan=0.05; Olipa=0.05; Ruda=0.05; Budikovac=0.05;
    Majsan=0.05; Kakan=0.05; Skrda=0.05; Trstenik=0.05; Logorun=0.05; Zmajan=0.05; Katarina=0.05; Mrduja=0.2;
    Vanga=0.1; Mali Brijun=0.1; Dolin=0.1; Lavdara=0.1; Žut=0.1; Sit=0.1; Levrnaka=0.1; Piškera=0.1; Mana=0.1;
    Katina=0.1; Lavsa=0.1; Kurba Vela=0.1; Galevac=0.1; Škarda=0.1; Orjule=0.1; Vele Srakane=0.1; Sveti Marko=0.1;
    Bobara=0.1; Glavat=0.1; Marinkovac=0.1; Jerolim=0.1; Drvenik Mali=0.1; Kopište=0.1; Lastovnjaci=0.1`,
  rijeka: `Spačva=0.2; Bregana=0.2; Dragonja=0.2; Odra=0.1; Kamačnik=0.1; Krčić=0.1; Butišnica=0.1; Plitvica=0.1;
    Kupica=0.1; Čabranka=0.1; Petrinjčica=0.1; Sunja=0.1; Londža=0.1; Biđ=0.1; Tounjčica=0.1; Pazinčica=0.1;
    Norin=0.1; Vrljika=0.1; Kosovčica=0.05; Dretulja=0.05; Lička Jesenica=0.05; Novčica=0.05; Otuča=0.05; Jadova=0.05;
    Ričica=0.05; Maja=0.05; Voćinka=0.05; Studva=0.05; Boljunčica=0.05; Dubračina=0.1; Krupa=0.1; Utinja=0.1;
    Radonja=0.1; Glogovnica=0.1; Bračana=0.1`,
  jelo: `Janjetina/Janjac=1.5; Gulaš=1; Odojak/Pečeni odojak=1; Žganci=1; Pljeskavica=1; Ražnjići=1;
    Pašta fažol/Pasta fažol=0.8; Blitva s krumpirom/Blitva=0.8; Bečki odrezak/Pohani odrezak=0.8; Sataraš=0.5;
    Pečenka=0.5; Palenta/Polenta=0.5; Krpice sa zeljem=0.5; Kiseli kupus=0.5; Ričet=0.5; Tripice/Fileki=0.5;
    Čušpajz/Ćušpajz=0.5; Paprikaš=0.5; Skradinski rižot=0.5; Fritaja=0.5; Krumpiruša=0.5; Ćufte=0.5;
    Govedska juha=0.5; Salata od hobotnice=0.5; Riba na gradele=0.5; Šurlice=0.3; Šaran na rašljama=0.3;
    Pileća juha=0.3; Pogača=0.3; Ombolo=0.2; Lignje=0.2; Girice=0.2; Srdele=0.2; Dagnje/Mušule=0.2; Rižot=0.2;
    Jota=0.2; Međimurska gibanica/Gibanica=0.2; Perkelt=0.2; Lički lonac=0.2; Štrudla/Savijača=0.2; Palačinke=0.2;
    Breskvice=0.2; Čupavci=0.2; Pohana piletina/Pohano=0.2; Kamenice/Ostrige=0.1; Inćuni=0.1; Vitalac=0.1;
    Kaštradina=0.1; Šporki makaruli=0.1; Paradižot=0.1; Smokvenjak=0.1; Makarana=0.1; Uštipci=0.1;
    Istarska supa/Supa=0.1; Krafi=0.1; Pinca=0.1; Prge=0.1; Proja=0.1; Mahune=0.1; Škripavac=0.1; Kuglof=0.1;
    Šnenokle=0.1; Rapska torta=0.1; Varaždinski klipić=0.1; Medenjaci=0.1; Salenjaci=0.1; Vanilin kiflice=0.1;
    Pita od jabuka=0.1; Buhtle=0.1; Puslice=0.1; Mesne okruglice=0.1; Faširanci=0.1; Restani krumpir=0.1;
    Francuska salata=0.1; Krumpir salata=0.1; Žablji kraci=0.1; Švargl=0.1; Kulenova seka=0.1`,
  glazba: `Dražen Zečić=0.5; Željko Bebek=0.5; Jasmin Stavros=0.3; Mladen Grdović=0.3; Giuliano=0.3; Jole=0.3;
    Darko Rundek=0.3; Urban & 4/Urban=0.3; Nina Kraljić=0.3; Ivan Zak=0.3; Antonija Šola=0.3; Vanna=0.3;
    Boris Novković=0.3; Danijela Martinović/Danijela=0.3; Brkovi=0.3; Zdenka Kovačiček=0.2; Radojka Šverko=0.2;
    Đani Maršan=0.2; Ibrica Jusić=0.2; Hari Rončević=0.2; Zorica Kondža=0.2; Meri Cetinić=0.2; Tedi Spalato=0.2;
    Alen Vitasović=0.2; Duško Lokin=0.2; Tomislav Ivčić=0.2; Ivana Kindl=0.2; Mate Bulić=0.2; Matko Jelavić=0.2;
    Natali Dizdar=0.2; Vesna Pisarović=0.2; Ivo Amulić=0.1; Sassja=0.1; Krankšvester=0.1; Darko Domijan=0.1;
    Ivica Šerfezi=0.1; Nenad Bach=0.1; Šime Jovanovac=0.1; Klapa Rišpet/Rišpet=0.1; Klapa Kampanel/Kampanel=0.1`,
  klub: `Varteks=0.5; Karlovac/NK Karlovac=0.3; GOŠK/GOŠK Dubrovnik=0.2; Lučko=0.1; Dubrava=0.1; Imotski=0.1;
    Slavonija Požega=0.1; BSK Bijelo Brdo/BSK=0.1; Mosor=0.1; Kamen Ingrad=0.1; Rudar Labin=0.05; Kurilovec=0.05;
    Vinogradar=0.05; Pazinka=0.05; Novigrad=0.05; Graničar Županja=0.05; Oriolik=0.05; Građanski/HŠK Građanski=1;
    Concordia/HŠK Concordia=0.3; Samobor/NK Samobor=0.3; Zelina/NK Zelina=0.3; Čakovec/NK Čakovec=0.3;
    Đakovo/Đakovo Croatia=0.3; Borovo/NK Borovo=0.3; Trogir/HNK Trogir=0.3; Zmaj Makarska/Zmaj=0.3;
    Bistra/NK Bistra=0.2; Vrapče/NK Vrapče=0.2; Trnje/NK Trnje=0.2; Podravina Ludbreg/Podravina=0.2;
    Polet Sveti Martin/Polet=0.2; Nedelišće/NK Nedelišće=0.2; Olimpija Osijek/Olimpija=0.2;
    Crikvenica/NK Crikvenica=0.2; Grobničan/NK Grobničan=0.2; Krk/NK Krk=0.2; Rovinj/NK Rovinj=0.2; Umag/NK Umag=0.2;
    Buje/NK Buje=0.2; Vodice/NK Vodice=0.2; Omiš/NK Omiš=0.2; Hrvace/NK Hrvace=0.2; Neretvanac Opuzen/Neretvanac=0.2;
    Dinara Knin/Dinara=0.2; Dugo Selo/NK Dugo Selo=0.2; Darda/NK Darda=0.1; Bedem Ivankovo/Bedem=0.1;
    Jadran Ploče=0.1; Tehničar Cvetkovec/Tehničar=0.1; Graničar Đurđevac=0.1; Kvarner/NK Kvarner=0.1;
    Vrbovec/NK Vrbovec=0.1; Halubjan/NK Halubjan=0.1; Novalja/NK Novalja=0.1; Zagora Unešić/Zagora=0.1`,
  obala: `Baška=0.5; Selce=0.3; Njivice=0.3; Vrbnik=0.3; Vela Luka=0.3; Omišalj=0.2; Volosko=0.2; Bibinje=0.2;
    Zaton=0.2; Marina=0.2; Trpanj=0.2; Lumbarda=0.2; Kupari=0.2; Milna=0.2; Savudrija=0.2; Premantura=0.2;
    Mošćenice=0.1; Plomin=0.1; Brseč=0.1; Klenovica=0.1; Seline=0.1; Ražanac=0.1; Privlaka=0.1; Turanj=0.1;
    Sveti Filip i Jakov=0.1; Jezera=0.1; Betina=0.1; Srima=0.1; Brodarica=0.1; Okrug=0.1; Slatine=0.1;
    Kaštel Stari=0.1; Duće=0.1; Promajna=0.1; Igrane=0.1; Živogošće=0.1; Blato=0.1; Mlini=0.1; Srebreno=0.1;
    Trsteno=0.1; Sutivan=0.1; Postira=0.1; Pučišća=0.1; Sućuraj=0.1; Vrboska=0.1; Funtana=0.1; Banjole=0.1;
    Sveti Juraj=0.05; Drage=0.05; Grebaštica=0.05; Mimice=0.05; Krvavica=0.05; Drašnice=0.05; Brist=0.05;
    Podaca=0.05; Plat=0.05; Sumartin=0.05; Maslinica=0.05; Rogač=0.05; Stomorska=0.05; Peroj=0.05; Pomer=0.05`,
  riba: `Morski konjic=0.3; Sabljarka=0.3; Jegulja=0.3; Amur=0.2; Vongole/Kućice=0.2; Lokarda=0.1; Pic=0.1;
    Šarag=0.1; Ugotica=0.1; Orhan=0.1; Šarun=0.1; Gavun/Gavuni=0.1; Glavoč=0.1; Babica=0.1; Iverak=0.1;
    Tolstolobik=0.1; Karas=0.1; Grgeč=0.1; Lignjun=0.1; Totan=0.1; Ovčica=0.05; Lica=0.05; Strijelka=0.05;
    Lumbrak=0.05; Kantar=0.05; Kanjac=0.05; Mrena=0.05; Mladica=0.05; Lipljen=0.05; Muzgavac=0.05; Tabinja=0.05`,
  voce: `Nektarina=0.3; Datulja=0.3; Klementina=0.2; Matovilac=0.2; Murva/Dud=0.2; Marakuja=0.1; Pitaja/Zmajevo voće=0.1;
    Aronija=0.1; Đumbir=0.1; Hren=0.1; Rotkva=0.1; Kineski kupus=0.1; Feferon=0.1; Slanutak/Leblebija=0.1; Soja=0.1;
    Kikiriki=0.1; Drijen/Drenjina=0.1; Pomelo=0.05; Kumkvat=0.05; Karambola=0.05; Guava=0.05; Goji=0.05;
    Ljutika=0.05; Bamija=0.05; Endivija=0.05; Kres salata=0.05; Divlja jagoda/Šumska jagoda=0.05; Oskoruša=0.05`,
  auto: `DeLorean=0.1; Maybach=0.1; MG=0.1; Abarth=0.1; Hummer=0.1; Iveco=0.1; Ssangyong=0.05; DS=0.05; GMC=0.05;
    Lincoln=0.05; Acura=0.05; Geely=0.05; Alpine=0.05; Pontiac=0.05; Genesis=0.02; Proton=0.02; Tata=0.02;
    Mahindra=0.02; Nio=0.02; Lucid=0.02; Rivian=0.02; Morgan=0.02; Spyker=0.02; Oldsmobile=0.02; Plymouth=0.02;
    Simca=0.02; NSU=0.02; DKW=0.02`,
  zivotinja: `Pijetao/Pivac=0.5; Gušter=0.2; Divlja mačka=0.2; Roda=0.2; Pile=0.2; Kunić=0.2; Los=0.1; Šakal=0.1;
    Daždevnjak=0.1; Poskok=0.1; Šojka=0.1; Kos=0.1; Sokol=0.1; Gavran=0.1; Vrana=0.1; Svraka=0.1; Labud=0.1;
    Pčela=0.1; Mrav=0.1; Jarac=0.1; Ovan=0.1; Ždrijebe=0.1; Kobila=0.1; Paun=0.1; Sob=0.05; Kozorog=0.05;
    Hermelin=0.05; Rovka=0.05; Voluharica=0.05; Čaplja=0.05; Krmača=0.05; Lama=0.05; Alpaka=0.05; Noj=0.05;
    Biserka=0.05`,
  instrument: `Frula=0.5; Električna gitara=0.2; Balalajka=0.1; Gong=0.1; Zvono/Zvona=0.1; Udaraljke=0.1; Pianino=0.1;
    Akustična gitara=0.1; Lira=0.1; Kalimba=0.05; Darbuka/Tarabuka=0.05; Šargija=0.05; Buzuki/Bouzouki=0.05;
    Zvončići=0.05; Horna=0.05; Kornet=0.05; Brač=0.05; Roženice=0.05; Cimbal/Cimbalom=0.05; Zvečka=0.05; Def=0.05;
    Tapan=0.05; Tabla=0.02; Saz=0.02; Hang=0.02; Teremin=0.02; Harmonij=0.02; Akordeon=0.2; Džembe/Djembe=0.2;
    Marake/Marakas=0.2; Zviždaljka=0.2; Kontrafagot=0.1; Engleski rog=0.1; Eufonij=0.1; Sousafon=0.1; Krilnica=0.1;
    Viola da gamba=0.1; Mandola=0.1; Ud/Oud=0.1; Koto=0.1; Šamisen=0.1; Pipa=0.1; Erhu=0.1; Kantele=0.1; Psaltir=0.1;
    Bandura=0.1; Samica=0.1; Dangubica=0.1; Svirala=0.1; Šurle=0.1; Panova frula=0.1; Kaval=0.1; Duduk=0.1; Zurla=0.1;
    Šofar=0.1; Alpski rog=0.1; Bandoneon=0.1; Kazoo=0.1; Doboš=0.1; Konge=0.1; Kravlje zvono=0.1; Steelpan=0.1;
    Metalofon=0.1; Žlice=0.1; Pjevajuća pila=0.1; Električni klavir=0.1; Klavikord=0.1; Ritam mašina=0.1`,
  plaza: `Bikini=0.3; Voće=0.3; Reketi=0.3; Novčanik/Novac=0.3; Ključevi=0.2; Punjač/Powerbank=0.2;
    Naočale za plivanje=0.2; Vino=0.2; Sok=0.2; Pas=0.2; Kava=0.1; Rakija=0.1; Kruh=0.1; Kupaća kapa=0.1; Led=0.1;
    Kukuruz=0.1; Krafne=0.1; Daska za surfanje=0.1; SUP daska/SUP=0.1; Marama=0.1; Majica=0.1; Upaljač=0.1;
    Šminka=0.05; Kišobran=0.05; Kajak=0.05; Ribarski štap=0.05; Haljina=0.05; Burek=0.2; Pohano/Pohana piletina=0.2;
    Keksi=0.2; Križaljke/Križaljka=0.2; Gitara=0.2; Radio=0.2; Stolica/Sklopiva stolica=0.2;
    Vlažne maramice/Maramice=0.2; Kratke hlače/Šorc=0.2; Sandale=0.2; Igračke=0.2; Tenda/Šator=0.1; Lepeza=0.1;
    Šah=0.1; Balzam za usne=0.1; Šampon=0.1; Češalj=0.1; Gumica za kosu=0.1; Sprej protiv komaraca=0.1; Vrećica=0.1;
    Čaše=0.1; Otvarač=0.1; Nož=0.1; Smokve=0.1; Napolitanke=0.1; Pizza=0.1; Kuhana jaja=0.1; Žvakaće/Žvaka=0.1;
    Ledeni čaj=0.1; Coca-Cola/Cola=0.1; Gemišt/Bevanda=0.1; Limunada=0.1; Ronilačko odijelo/Neopren=0.1;
    Podvodna puška=0.1; GoPro=0.1; Dron=0.1; Laptop=0.1; Tablet=0.1; Časopis=0.1; Olovka=0.1; Bodyboard=0.1;
    Čepići za uši=0.1; Mrežica=0.1; Kalupi za pijesak=0.1; Punica=0.1; Baka=0.1; E-cigareta/Vape=0.1;
    Prsluk za spašavanje=0.1; Krokodil na napuhavanje=0.1; Flamingo na napuhavanje=0.1; Osobna iskaznica/Osobna=0.1;
    Kartica=0.1; Sitniš/Kovanice=0.1; Tenisice=0.1; Flasteri=0.1; Pinceta=0.1`,
  frizider: `Parizer=0.3; Džem/Pekmez=0.3; Mortadela=0.2; Pizza=0.2; Kolač=0.2; Slatko vrhnje/Vrhnje za kuhanje=0.2;
    Šlag=0.2; Mljeveno meso=0.2; Paprika=0.2; Jagode=0.2; Lubenica=0.2; Krem sir=0.1; Feta=0.1; Losos=0.1; Kupus=0.1;
    Naranče=0.1; Grožđe=0.1; Nutella=0.1; Tartar umak=0.1; Hren=0.1; Šampanjac/Prosecco=0.1; Rakija=0.1;
    Red Bull/Energetsko piće=0.1; Inzulin=0.1; Kozmetika=0.1; Celer=0.05; Med=0.05; Ljuti umak/Tabasco=0.05;
    Baterije=0.05; Hrana za psa=0.05; Kiselo mlijeko=0.2; Čajna kobasica=0.2; Tuna=0.2; Ledeni čaj=0.2; Votka=0.2;
    Čokoladno mlijeko=0.1; Zobeno mlijeko=0.1; Skyr=0.1; Mascarpone=0.1; Gouda=0.1; Parmezan=0.1; Brie=0.1;
    Sirni namaz=0.1; Sardine=0.1; Kozice=0.1; Ćevapi=0.1; Gulaš=0.1; Lazanje=0.1; Kremšnita=0.1; Tiramisu=0.1;
    Krastavac=0.1; Tikvice=0.1; Patlidžan=0.1; Brokula=0.1; Cvjetača=0.1; Špinat=0.1; Rotkvice=0.1; Mladi luk=0.1;
    Gljive=0.1; Avokado=0.1; Kivi=0.1; Breskve=0.1; Borovnice=0.1; Maline=0.1; Trešnje=0.1; Dinja=0.1; Peršin=0.1;
    Rikola=0.1; Limunada=0.1; Jägermeister=0.1; Smoothie=0.1; Ledena kava=0.1; Pesto=0.1; Umak za roštilj=0.1;
    Sojin umak=0.1; Tzatziki=0.1; Kiseli kupus=0.1; Turšija=0.1; Feferoni=0.1; Cikla=0.1; Grašak=0.1; Pomfrit=0.1;
    Riblji štapići=0.1`,
  psovka: `Sto mu gromova=0.5; Pobogu=0.5; Zaboga=0.3; Bože dragi=0.3; Majko Božja=0.3; Joj=0.3; Mamicu mu=0.3;
    Majke mi=0.3; Ajme majko=0.3; Mamma mia/Mama mia=0.3; Grom i pakao=0.2; Tisuću mu gromova=0.2; Bože sačuvaj=0.2;
    Isuse Kriste=0.2; Sunce ti kalajisano=0.2; Pas mu mater=0.2; Ma koji vrag/Koji vrag=0.2; Bogme=0.2;
    Bem ti miša=0.2; Prokleto=0.2; Jao meni=0.2; Kriste Bože=0.1; Tako mi svega=0.1; Bezveze=0.1; Ma briga me=0.1;
    Ma kakvi=0.1; Bog te mazo/Bog te mazao=0.3; Kuku lele/Kuku/Lele=0.3; Grom te ubio=0.2; Boga mi=0.2; Majku ti=0.2;
    Vrag odnio šalu=0.2; Jezuš Marija/Jezuš=0.2; Au/Aua=0.2; Ma bježi=0.2; Mrš/Marš=0.2; Svašta=0.1; Šipak=0.1;
    Bljak=0.1; Ma pusti=0.1; Kuga te odnijela/Kuga te odnila=0.1; Tako mi Boga=0.1; OMG=0.1`,
  dijalekt: `Ća/Ca=1; Spiza=0.5; Butiga=0.5; Pjaca=0.5; Kapula=0.3; Đardin=0.3; Bukara=0.3; Šporet=0.3; Fažol=0.3;
    Kumpir=0.3; Škatula=0.3; Škura=0.3; Lipo=0.3; Kaić=0.2; Kogoma=0.2; Sić=0.2; Mudante=0.2; Komin=0.2;
    Mižerija=0.2; Šnita=0.2; Krigla=0.2; Ringišpil=0.2; Grincajg=0.2; Pinez=0.2; Grunt=0.2; Kuruza=0.2; Gajba=0.2;
    Tepsija=0.1; Lajbek=0.1; Šempre=0.1`,
  glavni: `Astana=0.1`,
};
