// Domaće kategorije Srbije, nastavak: krajevi i mesta po slovu (parovi hrvatskih regija i "mjesto na slovo").
import type { SeedCategory } from "../../hr/categories";

const mesto = ["grad", "selo", "mesto", "mjesto"];

export const rsDomace4: SeedCategory[] = [
  {
    slug: "slavonija",
    group: "rs",
    title: "Mesto u Vojvodini",
    hint: "Grad, mesto ili selo u Bačkoj, Banatu ili Sremu",
    strip: mesto,
    answers: `Novi Sad=15; Subotica=10; Zrenjanin=8; Pančevo=6; Sombor=6; Vršac=5; Kikinda=4; Sremska Mitrovica=4; Bečej=3; Vrbas=3;
      Inđija=3; Ruma=3; Stara Pazova=3; Bačka Palanka=3; Bačka Topola=3; Sremski Karlovci=3; Šid=2; Kula=2; Apatin=2; Senta=2;
      Kanjiža=2; Bela Crkva=2; Petrovaradin=2; Palić=2; Ada=1; Novi Bečej=1; Kovin=1; Alibunar=1; Kovačica=1; Futog=1; Temerin=1;
      Žabalj=1; Titel=1; Srbobran=1; Odžaci=1; Bač=1; Irig=1; Vrdnik=1; Opovo=0.5; Beočin=0.5; Pećinci=0.5; Sečanj=0.5; Žitište=0.5;
      Nova Crnja=0.5; Novi Kneževac=0.5; Čoka=0.5; Mali Iđoš=0.5; Plandište=0.5; Bački Petrovac=0.5; Ečka=0.5; Melenci=0.5;
      Mokrin=0.5; Deliblato=0.5; Turija=0.5; Kulpin=0.5; Sremska Kamenica=0.5; Veternik=0.5; Bezdan=0.5; Kisač=0.3; Feketić=0.3;
      Čelarevo=0.3; Kać=0.3; Kovilj=0.3; Padina=0.3; Banatski Karlovac=0.3; Jaša Tomić=0.3; Bačko Gradište=0.3; Begeč=0.3; Čenej=0.3;
      Rumenka=0.3; Bajmok=0.3; Čantavir=0.3; Horgoš=0.3; Kelebija=0.3; Kačarevo=0.3; Stajićevo=0.2; Knićanin=0.2;
      Banatsko Novo Selo=0.2; Jarkovac=0.15!; Mošorin=0.15!`,
  },
  {
    slug: "istra",
    group: "rs",
    title: "Mesto u Šumadiji ili Pomoravlju",
    hint: "Grad, mesto ili selo",
    strip: mesto,
    answers: `Kragujevac=15; Jagodina=6; Aranđelovac=6; Topola=5; Ćuprija=4; Paraćin=4; Gornji Milanovac=4; Smederevska Palanka=3;
      Svilajnac=3; Despotovac=3; Velika Plana=2; Oplenac=2; Orašac=2; Rača=1; Batočina=1; Lapovo=1; Knić=1; Takovo=1; Rudnik=1;
      Mladenovac=1; Rekovac=0.5; Sopot=0.5; Varvarin=0.5; Ćićevac=0.5; Bagrdan=0.5; Bukovička Banja=0.5; Ražanj=0.3; Resavica=0.3;
      Lipovac=0.3; Stragari=0.2!; Senjski Rudnik=0.2!`,
  },
  {
    slug: "zagorje",
    group: "rs",
    title: "Mesto u istočnoj Srbiji",
    hint: "Grad, mesto ili selo",
    strip: mesto,
    answers: `Zaječar=10; Bor=8; Negotin=6; Kladovo=6; Sokobanja=6; Knjaževac=5; Majdanpek=4; Donji Milanovac=4; Pirot=4; Požarevac=4;
      Golubac=3; Dimitrovgrad=2; Boljevac=2; Kučevo=2; Žagubica=2; Veliko Gradište=2; Petrovac na Mlavi=2; Gamzigrad=2;
      Lepenski vir=1.5; Svrljig=1; Bela Palanka=1; Kostolac=1; Babušnica=0.5; Rajac=0.5; Rogljevo=0.5; Brestovac=0.5; Tekija=0.5;
      Zlot=0.5; Brza Palanka=0.3; Prahovo=0.3; Rgotina=0.3; Vratna=0.2!; Krivi Vir=0.2!`,
  },
  {
    slug: "dalmatinska-zagora",
    group: "rs",
    title: "Mesto u zapadnoj Srbiji",
    hint: "Grad, mesto ili selo",
    strip: mesto,
    answers: `Užice=10; Čačak=8; Valjevo=8; Šabac=6; Zlatibor=6; Loznica=5; Bajina Bašta=4; Kraljevo=4; Požega=3; Arilje=3; Ivanjica=3;
      Guča=3; Kosjerić=2; Lučani=2; Ljubovija=2; Priboj=2; Prijepolje=2; Nova Varoš=2; Čajetina=2; Mokra gora=2; Mali Zvornik=1;
      Krupanj=1; Osečina=1; Ub=1; Lajkovac=1; Ljig=1; Mionica=1; Gornji Milanovac=1; Drvengrad=1; Divčibare=1; Tršić=1;
      Banja Koviljača=1; Sirogojno=1; Bogatić=1; Sevojno=0.5; Kremna=0.5; Zaovine=0.5; Perućac=0.5; Vladimirci=0.5; Koceljeva=0.5;
      Brankovina=0.5; Ovčar Banja=0.5; Rogačica=0.2!; Pecka=0.2!`,
  },
  {
    slug: "lika-gorski",
    group: "rs",
    title: "Mesto u južnoj Srbiji",
    hint: "Grad, mesto ili selo",
    strip: mesto,
    answers: `Niš=15; Leskovac=10; Vranje=10; Prokuplje=4; Pirot=3; Aleksinac=3; Kuršumlija=2; Vlasotince=2; Lebane=2; Bujanovac=2;
      Preševo=2; Surdulica=2; Vladičin Han=1.5; Bosilegrad=1; Medveđa=1; Blace=1; Niška Banja=1; Trgovište=0.5; Žitorađa=0.5;
      Doljevac=0.5; Merošina=0.5; Gadžin Han=0.5; Crna Trava=0.5; Grdelica=0.5; Sijarinska Banja=0.5; Prolom Banja=0.5;
      Vranjska Banja=0.5; Vlasina=0.5; Sićevo=0.5; Bojnik=0.5; Predejane=0.2!; Džep=0.2!`,
  },
  {
    slug: "banovina",
    group: "rs",
    title: "Mesto u Raškoj ili Sandžaku",
    hint: "Grad, mesto ili selo na jugozapadu Srbije",
    strip: mesto,
    answers: `Novi Pazar=12; Kraljevo=6; Raška=5; Sjenica=4; Tutin=4; Prijepolje=4; Priboj=3; Nova Varoš=3; Kopaonik=3; Studenica=3;
      Jošanička Banja=2; Sopoćani=1; Stari Ras=1; Ušće=1; Mataruška Banja=1; Đurđevi Stupovi=0.5; Baljevac=0.5; Zlatar=0.5;
      Brodarevo=0.5; Pribojska Banja=0.5; Bogutovac=0.3; Rudno=0.3; Karajukića Bunari=0.3; Kokin Brod=0.2!; Duga Poljana=0.2!`,
  },
  {
    slug: "otok-mjesto",
    group: "rs",
    title: "Mesto u okolini Beograda",
    hint: "Grad, mesto ili selo na teritoriji Beograda, van užeg centra",
    strip: mesto,
    answers: `Zemun=8; Obrenovac=6; Lazarevac=5; Mladenovac=5; Grocka=4; Surčin=4; Sopot=3; Barajevo=3; Batajnica=3; Borča=3; Ripanj=2;
      Kaluđerica=2; Vinča=1.5; Ralja=1; Umka=1; Leštane=1; Ovča=1; Padinska Skela=1; Ugrinovci=1; Dobanovci=1; Jakovo=1; Vrčin=1;
      Bečmen=0.5; Boljevci=0.5; Progar=0.5; Kupinovo=0.5; Ritopek=0.5; Zuce=0.5; Pinosava=0.5; Beli Potok=0.5; Ostružnica=0.5;
      Rušanj=0.5; Velika Moštanica=0.3; Barič=0.3; Stepojevac=0.3; Veliki Crljeni=0.3; Baroševac=0.2!; Zvečka=0.2!`,
  },
  {
    slug: "mjesto-k",
    group: "rs",
    title: "Mesto u Srbiji na slovo K",
    hint: "Grad, mesto ili selo kojem ime počinje na K",
    strip: mesto,
    answers: `Kragujevac=12; Kraljevo=8; Kruševac=8; Kikinda=5; Kladovo=4; Knjaževac=3; Kovin=2; Kula=2; Kanjiža=2; Kopaonik=2; Kostolac=1;
      Kosjerić=1; Kuršumlija=1; Kučevo=1; Kovačica=1; Koceljeva=0.5; Krupanj=0.5; Knić=0.5; Kremna=0.5; Kaluđerica=0.5; Kać=0.3;
      Kisač=0.3; Kovilj=0.3; Kelebija=0.3; Kulpin=0.3; Kačarevo=0.3; Kupinovo=0.3; Krivi Vir=0.2; Karajukića Bunari=0.2!;
      Kokin Brod=0.2!`,
  },
  {
    slug: "mjesto-s",
    group: "rs",
    title: "Mesto u Srbiji na slovo S",
    hint: "Grad, mesto ili selo kojem ime počinje na S (ne na Š)",
    strip: mesto,
    answers: `Subotica=10; Sombor=8; Smederevo=8; Sremska Mitrovica=5; Sokobanja=5; Senta=3; Sremski Karlovci=3; Svilajnac=2; Sjenica=2;
      Surdulica=2; Smederevska Palanka=2; Stara Pazova=2; Srbobran=1; Svrljig=1; Sopot=1; Surčin=1; Sirogojno=1; Studenica=1;
      Sečanj=0.5; Sevojno=0.5; Sremska Kamenica=0.5; Sopoćani=0.5; Slankamen=0.5; Stragari=0.3; Senjski Rudnik=0.3; Sićevo=0.3;
      Sviloš=0.2; Stepojevac=0.2!; Stajićevo=0.2!`,
  },
  {
    slug: "mjesto-p",
    group: "rs",
    title: "Mesto u Srbiji na slovo P",
    hint: "Grad, mesto ili selo kojem ime počinje na P",
    strip: mesto,
    answers: `Pančevo=8; Požarevac=6; Pirot=6; Prokuplje=4; Paraćin=4; Priboj=2; Prijepolje=2; Požega=2; Petrovaradin=2; Palić=2;
      Preševo=1.5; Petrovac na Mlavi=1; Pećinci=0.5; Plandište=0.5; Padinska Skela=0.5; Perućac=0.5; Prolom Banja=0.5; Padina=0.3;
      Pinosava=0.3; Progar=0.3; Prahovo=0.3; Predejane=0.3; Pribojska Banja=0.3; Pecka=0.2!; Pukovac=0.2!`,
  },
  {
    slug: "mjesto-b",
    group: "rs",
    title: "Mesto u Srbiji na slovo B",
    hint: "Grad, mesto ili selo kojem ime počinje na B",
    strip: mesto,
    answers: `Beograd=15; Bor=5; Bečej=3; Bela Crkva=3; Bajina Bašta=3; Bačka Palanka=3; Bačka Topola=3; Bujanovac=2; Blace=1; Boljevac=1;
      Bogatić=1; Bač=1; Bosilegrad=1; Bela Palanka=1; Barajevo=1; Batajnica=1; Borča=1; Babušnica=0.5; Batočina=0.5; Beočin=0.5;
      Bezdan=0.5; Bajmok=0.3; Bački Petrovac=0.3; Bačko Gradište=0.3; Banatski Karlovac=0.3; Begeč=0.3; Bagrdan=0.3; Baljevac=0.3;
      Brestovac=0.3; Brza Palanka=0.3; Brodarevo=0.3; Bukovička Banja=0.3; Boljevci=0.2; Bečmen=0.2; Baroševac=0.15!;
      Banatsko Novo Selo=0.15!`,
  },
  {
    slug: "mjesto-v",
    group: "rs",
    title: "Mesto u Srbiji na slovo V",
    hint: "Grad, mesto ili selo kojem ime počinje na V",
    strip: mesto,
    answers: `Vranje=8; Valjevo=8; Vršac=6; Vrnjačka Banja=5; Vrbas=3; Veliko Gradište=2; Vlasotince=2; Vladičin Han=1; Velika Plana=1;
      Vinča=1; Vrdnik=1; Vladimirci=0.5; Varvarin=0.5; Vlasina=0.5; Veternik=0.5; Vrčin=0.5; Vranjska Banja=0.5; Vrujci=0.3;
      Vratna=0.2; Veliki Crljeni=0.2; Velika Moštanica=0.2; Vučje=0.2!; Vlajkovac=0.2!`,
  },
  {
    slug: "mjesto-pridjev",
    group: "rs",
    title: "Mesto koje počinje rečju Novi, Stari, Veliki, Mali, Donji, Gornji, Sremski, Bački ili Banatski",
    hint: "Važi i ženski i srednji rod: Nova, Staro, Velika, Malo, Donja, Gornje, Sremska…",
    strip: mesto,
    answers: `Novi Sad=12; Novi Pazar=8; Gornji Milanovac=4; Stara Pazova=4; Novi Bečej=3; Veliko Gradište=3; Velika Plana=3;
      Donji Milanovac=3; Sremska Mitrovica=3; Sremski Karlovci=3; Bačka Palanka=3; Bačka Topola=3; Mali Zvornik=2; Novi Kneževac=1;
      Mali Iđoš=1; Sremska Kamenica=1; Bački Petrovac=1; Novi Banovci=0.5; Novi Slankamen=0.5; Stari Banovci=0.5; Stari Ras=0.5;
      Bačko Gradište=0.5; Banatski Karlovac=0.5; Stari Slankamen=0.3; Veliki Crljeni=0.3; Velika Moštanica=0.3;
      Banatsko Novo Selo=0.3; Mali Požarevac=0.2!; Gornja Trepča=0.2!`,
  },
];
