// Pitanja za Noć vještica (2026-10-30): horor filmovi, likovi iz horora i sve što ljudi povezuju s Halloweenom.
// Popisi su složeni od najpoznatijih prema rjeđima; hrvatski naslovi uz izvorne, nastavci serijala vrijede pod istim odgovorom.
import type { SeedCategory } from "../categories";
import { rang, type Nova } from "./nove-4";

const zaigrano: Nova[] = [
  {
    slug: "horor-film",
    group: "zaigrano",
    title: "Horor film",
    hint: "Bilo koji horor, strani ili domaći; vrijede i hrvatski i izvorni naslovi, nastavci idu pod isti film",
    strip: ["film", "the"],
    answers: `Isijavanje/The Shining/Shining; Egzorcist/The Exorcist/Istjerivač đavola; To/It/Ono; Vrisak/Scream/Krik; Noć vještica/Halloween;
      Psiho/Psycho; Slagalica strave/Saw/Pila; Prizivanje zla/The Conjuring/Conjuring;
      Strava u Ulici brijestova/Noćna mora u Ulici brijestova/A Nightmare on Elm Street/Nightmare on Elm Street/Elm Street;
      Petak 13./Petak trinaesti/Friday the 13th; Krug/The Ring/Ring/Ringu; Annabelle; Paranormalna aktivnost/Paranormal Activity;
      Osmi putnik/Alien; Dječja igra/Child's Play/Chucky/Čaki;
      Teksaški masakr motornom pilom/Teksaški masakr/The Texas Chain Saw Massacre/Texas Chainsaw Massacre;
      Kad jaganjci utihnu/Šutnja janjaca/The Silence of the Lambs/Silence of the Lambs; Omen/The Omen;
      Vještica iz Blaira/Projekt Vještica iz Blaira/The Blair Witch Project/Blair Witch; Insidious/Uljez;
      Drakula/Dracula/Bram Stoker's Dracula; Ralje/Jaws; Frankenstein; Nosferatu; Bježi!/Get Out;
      Rosemaryna beba/Rosemaryno dijete/Rosemary's Baby; Carrie; Nasljeđe/Hereditary; Tiho mjesto/A Quiet Place/Quiet Place;
      Final Destination/Konačno odredište; The Nun/Časna sestra/Nun;
      Pet Sematary/Groblje kućnih ljubimaca/Groblje ljubimaca/Pet Cemetery; Šesto čulo/The Sixth Sense;
      Zli mrtvaci/The Evil Dead/Evil Dead/Evil Dead Rise; The Grudge/Kletva/Grudge/Ju-on; Midsommar; Smile/Osmijeh/Nasmiješi se;
      Resident Evil; Silent Hill; 28 dana kasnije/28 Days Later; Noć živih mrtvaca/Night of the Living Dead; Svjetski rat Z/World War Z;
      Vlak za Busan/Train to Busan; Stvor/The Thing/Thing; Ptice/The Birds; Drugi/The Others; Hellraiser; Candyman; Misery;
      Siroče/Orphan; Mi/Us; Sinister/Zlokobno; Babadook/The Babadook; Gremlini/Gremlins; Poltergeist;
      Amityville/Užas u Amityvilleu/The Amityville Horror; Mumija/The Mummy; Hostel; The Purge/Noć pročišćenja/Čistka/Purge;
      Sedam/Se7en/Seven; It Follows/Ono slijedi; Muha/The Fly; Magla/The Fog/The Mist/Mist; Zora živih mrtvaca/Dawn of the Dead;
      Terrifier; Pet noći kod Freddyja/Five Nights at Freddy's/FNAF; Ouija; M3GAN/Megan; Talk to Me/Razgovaraj sa mnom; Nope;
      Barbarian/Barbar; Suspiria; Vještica/The Witch/The VVitch; The Substance/Supstanca/Substance; Nevidljivi čovjek/The Invisible Man;
      Bubimir/Beetlejuice; Legenda o Sleepy Hollowu/Sleepy Hollow/Pospana dolina; Ja sam legenda/I Am Legend;
      Znam što ste radili prošlog ljeta/I Know What You Did Last Summer; Wrong Turn/Krivo skretanje; The Hills Have Eyes/Brda imaju oči;
      The Cabin in the Woods/Koliba u šumi/Kabina u šumi/Cabin in the Woods; The Descent/Silazak; Jeepers Creepers;
      Kuća voštanih figura/House of Wax; The Black Phone/Crni telefon/Black Phone; Kletva La Llorone/The Curse of La Llorona/La Llorona;
      Mama; Krampus; Don't Breathe/Ne diši; Lights Out/Kad se svjetla ugase; Dead Silence/Mrtva tišina; Američki psiho/American Psycho;
      Hannibal; Crveni zmaj/Red Dragon; Intervju s vampirom/Interview with the Vampire; Sumrak/Twilight;
      Od sumraka do zore/From Dusk till Dawn; Izgubljeni dečki/The Lost Boys/Lost Boys; Blade; Van Helsing; Underworld/Podzemlje;
      Pusti me unutra/Pusti pravoga unutra/Let the Right One In/Låt den rätte komma in; 30 dana noći/30 Days of Night;
      Noć straha/Fright Night; Shaun of the Dead/Shaun živih mrtvaca; Zemlja zombija/Zombieland; 28 tjedana kasnije/28 Weeks Later;
      28 godina kasnije/28 Years Later; Američki vukodlak u Londonu/An American Werewolf in London; Zavijanje/The Howling;
      Čovjek vuk/The Wolfman/The Wolf Man/Wolfman; Frankensteinova nevjesta/Bride of Frankenstein;
      Kabinet doktora Caligarija/Das Cabinet des Dr. Caligari/The Cabinet of Dr. Caligari/Caligari;
      Fantom iz opere/Fantom opere/The Phantom of the Opera/Phantom of the Opera; Freaks/Nakaze;
      Dr. Jekyll i Mr. Hyde/Dr. Jekyll and Mr. Hyde/Jekyll i Hyde; Faunov labirint/Pan's Labyrinth/El laberinto del fauno;
      El orfanato/Sirotište/The Orphanage; REC; Crimson Peak/Grimizni vrh; Majka!/Mother!; Svjetionik/The Lighthouse/Lighthouse; Pearl;
      Malignant/Maligno; Sretan dan smrti/Happy Death Day; Ready or Not/Spremni ili ne; Smiješne igre/Funny Games; The Strangers/Stranci;
      You're Next/Ti si sljedeći; Gerald's Game/Geraldova igra; Doctor Sleep/Doktor Spavač; 1408; Dreamcatcher/Lovac na snove;
      Djeca kukuruza/Children of the Corn; Cat's Eye/Mačje oko; Silver Bullet/Srebrni metak; Cujo/Kujo; Christine; Salem's Lot/Salemovo;
      Bird Box/Ne gledaj; Kocka/Cube; Jacob's Ladder/Jakovljeve ljestve; The Wicker Man/Pleteni čovjek/Wicker Man;
      Don't Look Now/Ne okreći se sada/Ne gledaj sad; The Innocents/Nevini; Village of the Damned/Selo prokletih; Repulsion/Odvratnost;
      Invasion of the Body Snatchers/Invazija tjelokradica/Body Snatchers; The Blob/Mrlja/Blob; Videodrome; Scanners/Skeneri;
      The Brood/Leglo; Re-Animator/Reanimator; Tremors/Podrhtavanje; Arachnophobia/Arahnofobija; Anaconda/Anakonda;
      Deep Blue Sea/Duboko plavetnilo; Piranha/Pirana; Meg/The Meg; Lake Placid; Sharknado; Pumpkinhead; Critters; Leprikon/Leprechaun;
      Puppet Master/Lutkar; Phantasm/Fantazam; The Boy/Lutka; The Skeleton Key/Kostur ključ/Skeleton Key; Brod duhova/Ghost Ship;
      House on Haunted Hill/Kuća na Ukletom brdu; 13 duhova/Thir13en Ghosts/Thirteen Ghosts;
      Kuća na ukletom brežuljku/The Haunting/The Haunting of Hill House/Haunting of Hill House;
      House of 1000 Corpses/Kuća od 1000 leševa; The Devil's Rejects/Đavolji odbačenici; Urban Legend/Urbane legende;
      Black Christmas/Crni Božić; Trick 'r Treat; Event Horizon/Horizont događaja; Cloverfield; Darkness Falls/Kad padne mrak;
      The Boogeyman/Bauk/Boogeyman; Slender Man/Slenderman; Istina ili izazov/Truth or Dare; Unfriended; Host;
      The Exorcism of Emily Rose/Egzorcizam Emily Rose; The Last Exorcism/Posljednji egzorcizam; The Rite/Obred;
      The Pope's Exorcist/Papin egzorcist; Deliver Us from Evil/Izbavi nas od zla; The Possession/Opsjednuta; Constantine;
      Henry: Portrait of a Serial Killer/Henry: Portret serijskog ubojice; Sweeney Todd; Jennifer's Body/Jenniferino tijelo;
      Fear Street/Ulica straha; The Visit/Posjet; Signs/Znakovi; The Village/Selo; The Ritual/Ritual; Hush/Tišina;
      Hansel & Gretel: Witch Hunters/Ivica i Marica: Lovci na vještice; Gretel & Hansel/Gretel i Hansel; Brightburn; Spiral;
      Antlers/Rogovi; The Human Centipede/Ljudska stonoga/Human Centipede; Martyrs/Mučenice; Raw/Sirovo/Grave; Titane;
      The Platform/Platforma/El hoyo; Heretic/Heretik; Late Night with the Devil/Kasno navečer s vragom; Abigail; Immaculate/Bezgrešna;
      The First Omen/Prvi omen; Speak No Evil/Ne govori zlo; Longlegs; Sinners/Grešnici; Weapons/Oružja; Alien: Romulus;
      Alien vs. Predator/Alien protiv Predatora/AVP; Freddy vs. Jason/Freddy protiv Jasona; Dark Water/Mračna voda; Shutter/Okidač;
      A Tale of Two Sisters/Priča o dvije sestre; The Wailing/Jauk/Goksung; Audition/Audicija; Pulse/Puls/Kairo;
      One Missed Call/Jedan propušteni poziv; Onibaba; Kwaidan; Leptirica; Sveto mesto/Sveto mjesto; Variola vera;
      Davitelj protiv davitelja; Lokalni vampir; Srpski film/A Serbian Film; Žena u crnom/The Woman in Black/Woman in Black;
      Annihilation; Mandy; Color Out of Space/Boja iz svemira; Prey for the Devil; Deadstream; Skinamarink;
      Zombi/Zombi 2/Zombie Flesh Eaters; Demoni/Demons; Profondo rosso/Duboko crvenilo/Deep Red; Inferno;
      The Fall of the House of Usher/Pad kuće Usher/House of Usher; The Masque of the Red Death/Maska crvene smrti;
      The Pit and the Pendulum/Jama i njihalo; The Tomb of Ligeia/Grob Ligeje; Horror of Dracula/Užas Drakule/Drakula (1958);
      The Curse of Frankenstein/Prokletstvo Frankensteina; Creature from the Black Lagoon/Stvorenje iz Crne lagune;
      The House by the Cemetery/Kuća kod groblja; Cat People/Ljudi mačke; Peeping Tom/Voajer; Rascjep/Split;
      The Lazarus Effect/Lazarus efekt; Flatliners/Granica smrti; Insidious: The Red Door/Insidious: Crvena vrata;
      Annabelle: Creation/Annabelle: Stvaranje zla; The Possession of Hannah Grace; Kandisha;
      Planet Terror/Planet strave; Grindhouse; Death Proof; Mrtva nevjesta/Corpse Bride/Tim Burtonova mrtva nevjesta;
      Noćna mora prije Božića/The Nightmare Before Christmas/Nightmare Before Christmas; Coraline/Coraline i tajna vrata; Frankenweenie;
      ParaNorman; Monster House/Kuća čudovište; Hotel Transilvanija/Hotel Transylvania; Hokus pokus/Hocus Pocus;
      Obitelj Addams/The Addams Family/Addams Family; Istjerivači duhova/Ghostbusters; Vještice/The Witches; Evil Dead II/Zli mrtvaci 2;
      Vojska tame/Army of Darkness; Prometheus; Life/Život; Pandorum; Splice; Hollow Man/Šuplji čovjek; Teeth/Zubi; Tusk; Vampir/Vampyr;
      Haxan; Eden Lake/Jezero smrti; The Eye/Oko; Drag Me to Hell/Odvuci me u pakao; Hatchet/Sjekira; Turistas; The Ruins/Ruševine;
      Saint Maud; His House/Njegova kuća; Men/Muškarci; Infinity Pool; Bones and All/Kosti i sve ostalo; MaXXXine; Possessor;
      Lamb/Janje; Relic/Relikvija; The Lodge/Koliba; Hagazussa; Goodnight Mommy/Laku noć, mama; Veronica;
      The Autopsy of Jane Doe/Obdukcija Jane Doe; Oculus/Ogledalo; Ogledala/Mirrors; Krvava Mary/Bloody Mary; Dolls/Lutke`,
  },
  {
    slug: "noc-vjestica",
    group: "zaigrano",
    title: "Nešto što povezuješ s Noći vještica",
    hint: "Predmet, biće, kostim, hrana, običaj ili film koji ti padne na pamet uz Halloween",
    answers: `Bundeva/Buča/Tikva/Bundeve/Pumpkin; Kostim/Kostimi/Maskiranje/Prerušavanje/Kostimiranje; Slatkiši/Slatkiš/Bomboni/Bombon/Candy;
      Vještica/Vještice/Coprnica/Witch; Duh/Duhovi/Ghost; Šišmiš/Šišmiši; Kostur/Kosti/Kostur od plastike/Skeleton; Maska/Maske;
      Paučina/Paukova mreža/Mreža; Pauk/Pauci; Vampir/Vampiri; Zombi/Zombiji/Zombie; Metla/Vještičja metla; Crna mačka/Crni mačak/Mačka;
      Lubanja/Lubanje; Svijeća/Svijeće; Lampion od bundeve/Jack-o'-lantern/Izrezana bundeva/Svjetiljka od bundeve/Lampa od bundeve;
      Trick or treat/Šala ili slatkiš/Slatkiš ili psina/Slatko ili ljuto/Trik ili poslastica/Ili slatkiš ili smicalica/Psina ili slatkiš;
      Groblje; Mumija; Vukodlak; Lijes; Krv/Lažna krv/Umjetna krv; Ukleta kuća/Kuća strave/Kuća duhova; Drakula/Grof Drakula;
      Frankenstein/Frankensteinovo čudovište; Kotao/Kazan/Vještičji kotao/Kotlić; Šešir vještice/Vještičji šešir/Šiljati šešir;
      Pun mjesec/Mjesec; Gavran/Vrana/Gavrani; Sova; Mrak/Tama/Noć; Strah/Jeza/Groza/Užas; Horor/Horor filmovi/Horor film;
      Zabava/Party/Tulum/Halloween party; Amerika/SAD/Američki običaj; Irska; Samhain/Kelti/Keltski običaj; Svi sveti/Sisvete; Dušni dan;
      31. listopada/31.10./Listopad/Oktobar; Jesen; Narančasta/Narančasta boja; Crna/Crna boja; Ljubičasta; Zelena; Lišće/Opalo lišće;
      Čokolada; Lizalica/Lizalice; Gumeni bomboni/Žele bomboni/Gumi bomboni; Kukuruzni bomboni/Candy corn;
      Karamelizirana jabuka/Karamel jabuka/Jabuka u karamelu/Ušećerena jabuka; Jabuke/Hvatanje jabuka/Lov na jabuke;
      Pita od bundeve/Pumpkin pie; Juha od bundeve/Krem juha od bundeve; Bučine koštice/Koštice/Bundevine sjemenke;
      Rezbarenje bundeve/Izrezivanje bundeve/Dubljenje bundeve; Nož; Motorna pila; Sjekira; Klaun/Klaun ubojica/Zli klaun; Michael Myers;
      Freddy Krueger; Jason Voorhees/Jason; Ghostface/Maska iz Vriska/Vrisak; Pennywise; Chucky; Plahta/Duh od plahte/Plahta s rupama;
      Toaletni papir/WC papir; Jaja/Gađanje jajima; Kucanje na vrata/Kucanje/Vrata; Zvono/Zvono na vratima; Djeca/Klinci;
      Košarica/Vrećica za slatkiše/Košara/Kanta za slatkiše; Šminka/Šminkanje/Oslikavanje lica; Perika; Očnjaci/Vampirski zubi/Zubi;
      Ogrtač/Plašt/Pelerina; Rogovi/Đavolji rogovi; Vrag/Đavao/Đavo/Sotona/Lucifer; Demon/Demoni; Čarobni štapić/Štapić;
      Čarolija/Magija/Vradžbine/Čarobnjaštvo; Kristalna kugla; Napitak/Čarobni napitak/Vještičji napitak;
      Ouija ploča/Ouija/Duhovi na ploči; Tarot/Tarot karte; Gatara/Vračara/Proročica; Pentagram; Kletva/Prokletstvo;
      Egzorcizam/Egzorcist; Opsjednutost/Opsjednut; Strašilo; Kukuruzno polje/Labirint u kukuruzu/Kukuruz; Sijeno/Bale sijena;
      Priče o duhovima/Strašne priče/Jezive priče; Vatra/Logorska vatra/Lomača; Vrištanje/Krik; Jeziva glazba; Thriller/Michael Jackson;
      Monster Mash; Istjerivači duhova/Ghostbusters; Obitelj Addams/Addams Family/Addamsovi; Wednesday/Srijeda Addams;
      Hokus pokus/Hocus Pocus; Noć vještica (film)/Halloween (film)/John Carpenter/Noć vještica; Tim Burton;
      Noćna mora prije Božića/Jack Skellington; Mrtva nevjesta/Corpse Bride; Edgar Allan Poe/Poe/Gavran (pjesma); Stephen King;
      Bram Stoker; Transilvanija/Rumunjska/Dvorac Bran; Dvorac/Ukleti dvorac; Kripta/Grobnica; Podrum; Tavan; Štakor/Štakori; Miš/Miševi;
      Žaba; Zmija/Zmije; Crv/Crvi; Kukci/Bubašvabe/Žohari; Oko/Očne jabučice/Oči; Odsječena ruka/Ruka; Vještičji prsti/Prsti; Mozak;
      Lanci/Lanac; Škripanje vrata/Škripa/Škripava vrata; Grmljavina/Oluja/Munje; Ponoć; Sablast/Utvara/Prikaza/Fantom; Poltergeist;
      Banshee; Goblin/Gobolin; Trol; Vila/Vile; Princeza; Superjunak/Superheroj; Batman; Spider-Man/Spiderman; Gusar/Pirat; Ninja;
      Kauboj; Anđeo; Đavolica; Medicinska sestra; Mačka (kostim)/Mačkica; Elsa; Harry Potter; Joker; Harley Quinn;
      Squid Game/Igra lignje; Ukrasi/Dekoracije/Halloween ukrasi; Lampice/Svjetleće lampice; Baterijska lampa/Baterija/Svjetiljka;
      Hladnoća/Hladno; Bu!/Buu/Bubu; Jumpscare/Prepadanje/Plašenje/Strašenje; Maskenbal/Maškare/Karneval/Fašnik; Pakao; Sveci/Svetci;
      Lampaši/Grobne svijeće/Lampaši na grobu; Krizanteme/Krizantema; Cvijeće/Vijenac; Mirogoj; Baba Roga/Babaroga; Bauk; Holywins;
      Poganski običaj/Poganstvo/Poganski blagdan; Amerikanizacija; Komercijalizacija/Potrošnja/Trgovine; Kič;
      Kesteni/Pečeni kesteni/Kesten; Kuhano vino; Kokice; Karamela; Čips; Pumpkin spice latte/Bundevin latte/Pumpkin spice; Haribo;
      Snickers; Kit Kat; M&M's/M&M; Skittles; Reese's; Mars; Kinder; Milka; Napolitanke/Napolitanka; Keksi/Kolačići/Kolači;
      Muffini/Cupcakes; Torta; Gumene gliste/Gliste od gumija; Mumija od hrenovke/Hrenovke u tijestu; Punč/Krvavi punč; Crveno vino;
      Pivo od bundeve; Koktel; Žele; Puding; Sladoled; Grožđe (oči)/Grožđe; Češnjak/Bijeli luk; Kolac/Drveni kolac; Križ/Raspelo;
      Sveta voda/Blagoslovljena voda; Srebrni metak; Mjesečina; Zavijanje/Vuk zavija/Vuk; Crne mačke; Crni ogrtač;
      Smrt/Kosac/Smrt s kosom/Grim Reaper; Kosa (oruđe)/Kosa; Nadgrobni spomenik/Grob/Grobovi/Nadgrobna ploča; Križevi;
      Mrtvaci/Mrtvi/Leševi; Zombi apokalipsa/Apokalipsa; Krvopija; Ugriz/Ugriz vampira; Vampirski ogrtač; Mumijski zavoji/Zavoji;
      Plastični pauci; Lažna paučina; Napuhana bundeva; Dimni stroj/Dim/Magla; Suhi led; Lutka/Ukleta lutka/Lutke; Annabelle;
      Klaun maska; Maska vampira; Gumena maska; Maska lubanje; Día de los Muertos/Dan mrtvih; Calavera/Šećerna lubanja;
      Salem/Vještice iz Salema/Lov na vještice; Inkvizicija; Spaljivanje vještica/Lomača za vještice; Vještičji sabat/Sabat; Crna magija;
      Vudu/Voodoo/Vudu lutka; Gljive; Otrov/Otrovna jabuka; Ivica i Marica; Crvenkapica; Kuća od medenjaka/Kućica od medenjaka;
      Baba Jaga; Morana; Sabrina/Sabrina, mala vještica; Charmed/Čarobnice; Vještice iz Eastwicka;
      Čarobnjak iz Oza/Zla vještica sa Zapada; Maleficent/Zloba/Grdana; Ursula; Hotel Transilvanija; Casper/Duh Casper; Scooby-Doo;
      Charlie Brown/Velika bundeva/Linus; Snoopy; Simpsoni/Kućica strave/Treehouse of Horror; Stranger Things;
      Walking Dead/Živi mrtvaci/The Walking Dead; Supernatural; Buffy/Buffy ubojica vampira; Sumrak saga/Twilight;
      Vampirski dnevnici/Vampire Diaries; Dexter; American Horror Story; Goosebumps/Jeziva ulica/Ježurci; Fear Street/Ulica straha;
      Five Nights at Freddy's/FNAF; Resident Evil; Silent Hill; Pac-Man duhovi/Pac-Man; Luigi's Mansion; Koliba u šumi; Kamp/Kampiranje;
      Šuma/Mračna šuma; Magla u šumi; Kuća na kraju ulice; Susjedi/Susjedstvo; Ulica/Hodanje po ulici/Obilazak kuća;
      Roditelji/Pratnja roditelja; Natjecanje u kostimima/Najbolji kostim; Fotografije/Instagram/Selfie; TikTok;
      Horor maraton/Maraton horor filmova; Netflix; Kino; Deka/Pokrivač; Spavanje sa svjetlom/Svjetlo upaljeno; Noćne more/Noćna mora;
      Pod krevetom/Čudovište pod krevetom/Ispod kreveta; Ormar/Čudovište u ormaru; Čudovište/Čudovišta/Monster;
      Vanzemaljac/Vanzemaljci/Alien; NLO; Paket slatkiša; Zubar/Karijes/Pokvareni zubi; Šećer/Previše šećera; Bol u trbuhu; Zvončari;
      Krampus; Martinje; Sveti Martin; Mlado vino; Berba/Žetva; Kukuruzovina/Komušanje; Strašna glazba/Orgulje/Toccata i fuga;
      Smijeh vještice/Zli smijeh/Hehehe; Vriskovi; Lanci koji zveckaju; Koraci/Koraci u mraku; Šapat/Šaputanje; Sjena/Sjene;
      Pauk na zidu; Rasčupana kosa; Bijela haljina/Žena u bijelom; Djevojčica iz Kruga/Samara; Blizanke/Blizanke iz Isijavanja; Redrum;
      Here's Johnny; Crveni balon/Balon; Lutka koja govori; Ventrilokvist/Trbuhozborac; Klaunovi; Cirkus;
      Lunapark/Zabavni park/Kuća strave u lunaparku; Vlakić strave; Labirint/Labirint ogledala; Ogledalo/Ogledala;
      Krvava Mary/Bloody Mary; Prizivanje duhova/Seansa/Spiritizam; Svijeća u mraku; Petak 13./Petak trinaesti; Broj 13/Trinaest; 666;
      Kratki dani; Pomicanje sata/Promjena vremena/Zimsko računanje vremena; Uranjanje jabuka; Bobbing for apples; Plišani šišmiš;
      Šišmiš ukras; Narančaste lampice; Vještica na metli; Let na metli; Vještičja kuća; Vještičja kapa; Prugaste čarape/Čarape;
      Crne čizme/Čizme; Crni lak za nokte/Lak za nokte; Crni ruž/Ruž; Lažne trepavice; Leće/Kontaktne leće/Strašne leće;
      Tetovaže/Lažne tetovaže; Krvavi zavoji; Lažne rane/Rane; Ožiljci; Frankenstein vijci/Vijci; Zelena koža;
      Zeleni nos/Nos vještice/Bradavica`,
  },
];

const kviz: Nova[] = [
  {
    slug: "horor-lik",
    group: "kviz",
    title: "Lik iz horor filma, serije ili knjige",
    hint: "Čudovište, ubojica, duh, žrtva ili junak iz bilo kojeg horora; vrijede i opći tipovi kao vampir ili zombi",
    strip: ["the"],
    answers: `Drakula/Grof Drakula/Dracula/Count Dracula/Drakul; Freddy Krueger/Freddy/Fredi Kruger/Freddie Krueger;
      Frankensteinovo čudovište/Frankenstein/Frankensteinov stvor/Čudovište/Frankenstein's monster; Chucky/Čaki/Charles Lee Ray;
      Pennywise/Klaun Pennywise/Penivajz/Pennywise klaun/Robert Gray; Michael Myers/Majkl Majers/Michael; Jason Voorhees/Jason/Džejson;
      Hannibal Lecter/Hannibal/Hanibal Lektor/Hannibal Lektor; Ghostface/Ghost Face/Maska iz Vriska; Annabelle;
      Samara/Samara Morgan/Sadako/Sadako Yamamura; Norman Bates/Norman; Jigsaw/John Kramer/Slagalica;
      Leatherface/Kožnato lice/Bubba Sawyer; Valak/Časna sestra/Demonska časna sestra; Regan/Regan MacNeil/Opsjednuta djevojčica;
      Carrie/Carrie White; Jack Torrance/Jack Nicholson (Isijavanje); Pinhead; Candyman/Daniel Robitaille; Damien/Damien Thorn;
      Vampir/Vampiri; Zombi/Zombiji/Zombie; Vukodlak/Čovjek vuk/Wolfman/Werewolf; Mumija/Imhotep; Duh/Duhovi; Vještica/Vještice;
      Nosferatu/Grof Orlok/Orlok; Pazuzu; Osmi putnik/Ksenomorf/Xenomorph/Alien; Babadook; Annie Wilkes; Esther/Leena Klammer;
      Blizanke Grady/Grady blizanke/Blizanke iz Isijavanja/Blizanke; Kayako/Kayako Saeki; Toshio; Art the Clown/Klaun Art/Art;
      M3GAN/Megan; Billy/Lutka Billy/Billy the Puppet; Tiffany/Tiffany Valentine/Chuckyjeva nevjesta; Frankensteinova nevjesta/Nevjesta;
      Victor Frankenstein/Dr. Frankenstein/Doktor Frankenstein; Van Helsing/Abraham Van Helsing; Mina Harker/Mina Murray/Mina;
      Jonathan Harker; Renfield; Lucy Westenra/Lucy; Dr. Jekyll/Jekyll/Henry Jekyll; Mr. Hyde/Hyde/Edward Hyde; Dorian Gray; Igor;
      Fantom iz opere/Fantom/Erik; Bezglavi konjanik/Headless Horseman/Konjanik bez glave; Ichabod Crane; Edward Cullen/Edward;
      Bella Swan/Bella; Jacob Black/Jacob; Lestat/Lestat de Lioncourt; Louis de Pointe du Lac/Louis; Claudia; Blade; Selene; Carmilla;
      Elvira; Bubimir/Beetlejuice/Betelgeuse; Lydia Deetz/Lydia; Wednesday Addams/Srijeda Addams/Wednesday/Srijeda;
      Morticia Addams/Morticia; Gomez Addams/Gomez; Ujak Fester/Fester/Uncle Fester; Lurch; Stvar/Thing (Addams); Rođak Itt/Cousin Itt;
      Pugsley; Demogorgon; Vecna/Henry Creel/Jedan/001; Jedanaest/Eleven/El/Eleven (Stranger Things); Mind Flayer/Gospodar uma;
      Will Byers; Mike Wheeler; Dustin Henderson/Dustin; Lucas Sinclair; Max Mayfield/Max; Steve Harrington; Jim Hopper/Hopper;
      Joyce Byers; Eddie Munson; Rick Grimes; Daryl Dixon; Negan; Michonne; Glenn Rhee/Glenn; Carl Grimes; Carol Peletier;
      Sam Winchester; Dean Winchester; Castiel; Buffy/Buffy Summers; Spike; Angel; Willow Rosenberg/Willow; Damon Salvatore;
      Stefan Salvatore; Elena Gilbert; Klaus Mikaelson/Klaus; Dexter Morgan/Dexter; Laura Palmer; BOB/Killer BOB;
      Dale Cooper/Agent Cooper; Twisty/Klaun Twisty; Sabrina Spellman/Sabrina; Vanessa Ives; Ktulu/Cthulhu/Kthulhu; Nyarlathotep; Dagon;
      Azathoth; Herbert West; Gavran/The Raven; Roderick Usher; Madeline Usher; Montresor; Fortunato; Dr. Moreau/Doktor Moreau;
      Nevidljivi čovjek/Griffin/Invisible Man; Duh iz Cantervillea/Kentervilski duh/Canterville Ghost/Sir Simon; Vij; Lord Ruthven;
      Žena u crnom/Woman in Black; Stvorenje iz Crne lagune/Gill-man; Mrlja/Blob; Stvor/The Thing; Seth Brundle/Brundlefly/Muha;
      Gremlin/Gremlini/Gizmo/Stripe; Pumpkinhead; Leprikon/Leprechaun; Tall Man/Visoki čovjek; The Creeper/Creeper;
      Tri prsta/Three Finger; Pluto (Brda imaju oči)/Pluto; Laurie Strode; Dr. Loomis/Doktor Loomis/Sam Loomis; Sidney Prescott/Sidney;
      Gale Weathers; Dewey Riley/Dewey; Billy Loomis; Stu Macher; Nancy Thompson; Pamela Voorhees; Tommy Jarvis; Ash Williams/Ash;
      Deadites; Paul Sheldon; Wendy Torrance; Danny Torrance/Danny; Dick Hallorann; Žena iz sobe 237/Soba 237; Georgie Denbrough/Georgie;
      Bill Denbrough; Beverly Marsh; Richie Tozier; Eddie Kaspbrak; Ben Hanscom; Mike Hanlon; Stanley Uris; Henry Bowers;
      Klub luzera/Losers Club; Clarice Starling/Clarice; Buffalo Bill/Jame Gumb; Will Graham;
      Francis Dolarhyde/Crveni zmaj/Zubić vila (Crveni zmaj); Marion Crane; Lila Crane; Norma Bates; Ellen Ripley/Ripley; Facehugger;
      Chestburster; Kraljica osmih putnika/Alien Queen; MacReady/R. J. MacReady; Ed Warren; Lorraine Warren; Otac Merrin/Merrin;
      Otac Karras/Karras; Chris MacNeil; Rosemary Woodhouse/Rosemary; Gospođa Baylock; Margaret White; Cujo/Kujo;
      Christine (auto)/Christine; Gage Creed/Gage; Louis Creed; Church (mačak)/Church; Randall Flagg; Kurt Barlow; Andy Barclay;
      Glen (Chucky)/Glen/Glenda; Robert lutka/Lutka Robert; Brahms; Slappy; Cenobiti/Pinhead i Cenobiti/Cenobites; Chatterer;
      Frank Cotton; Kirsty Cotton; Amanda Young; Mark Hoffman/Hoffman; Prasac/Svinjska maska; Krivi čovjek/Crooked Man;
      La Llorona/Uplakana žena/Plačljiva žena; Bathsheba; Paimon; Annie Graham; Charlie Graham; Dani Ardor/Dani;
      Red (Mi)/Red/Adelaide Wilson; Chris Washington; Rose Armitage; Jean Jacket; Bughuul/Mr. Boogie;
      Demon crvenog lica/Lipstick-Face Demon/Demon s crvenim licem; Mama (duh)/Mama; Pearl; Maxine Minx/Maxine; Sam (Trick 'r Treat)/Sam;
      Krampus; Jack Skellington/Jack Kostur/Jack; Sally; Oogie Boogie; Zero (pas)/Zero; Druga mama/Beldam/Other Mother; Coraline;
      Emily/Mrtva nevjesta/Corpse Bride; Victor Van Dort; Sparky; Adam i Barbara Maitland/Maitlandovi; Sweeney Todd;
      Gospođa Lovett/Mrs. Lovett; Katrina Van Tassel; Mavis; Freddy Fazbear; Bonnie (FNAF)/Bonnie; Chica; Foxy; Springtrap;
      Piramidalna glava/Pyramid Head; Nemesis; Alice (Resident Evil)/Alice; Jill Valentine; Leon Kennedy; Albert Wesker;
      Slender Man/Slenderman; Wendigo; Krvava Mary/Bloody Mary; Smrt/Kosac/Grim Reaper; Vrag/Đavao/Sotona/Lucifer; Demon/Demoni; Kostur;
      Poltergeist; Banshee; Klaun ubojica/Zli klaun; Ubojica s motornom pilom; Lutka (horor)/Ukleta lutka/Lutka; Patrick Bateman;
      John Doe (Sedam)/John Doe; Kevin (Rascjep)/Zvijer/The Beast/Kevin; Mothman/Čovjek moljac; Chupacabra; Godzilla; King Kong;
      Ralje/Bruce (morski pas)/Morski pas iz Ralja; Quint; Šerif Brody/Martin Brody; Matt Hooper; Blijedi čovjek/Pale Man; Faun/Pan;
      Ofelia; Lady Lucille Sharpe; Edith Cushing; Kuchisake-onna; Smile entitet/Osmijeh; Djeca kukuruza/Isaac/Malachai;
      Onaj Koji Hoda Iza Redova/He Who Walks Behind the Rows; Tommy Ross; Chris Hargensen; Sue Snell; Arnie Cunningham; Johnny Smith;
      Danny Glick; Thomas Hewitt; Sally Hardesty; Grandpa Sawyer; Drayton Sawyer; Captain Spaulding/Kapetan Spaulding; Otis Driftwood;
      Baby Firefly; Victor Crowley; Lutkar/Puppet Master; Ardeth Bay; Rick O'Connell; Evelyn Carnahan; Lawrence Talbot/Larry Talbot;
      Aro/Volturi; Alice Cullen; Carlisle Cullen; Rosalie Hale; Jasper Hale; Emmett Cullen; Esme Cullen; Victoria (Sumrak)/Victoria;
      James (Sumrak)/James; Sookie Stackhouse; Bill Compton; Eric Northman; Vampir Armand/Armand; Akasha; Marius; Ellen Hutter;
      Thomas Hutter; Gospodin Babadook/Mister Babadook; Amelia Vanek; Crawford Tillinghast; Eleanor Vance/Nell; Luke Crain; Steven Crain;
      Shirley Crain; Theo Crain; Olivia Crain; Žena savijenog vrata/Bent-Neck Lady; Hugh Crain; Dr. Seward/John Seward; Quincey Morris;
      Arthur Holmwood; Elizabeth Lavenza; Henry Clerval; Robert Walton; Gabriel Utterson; Basil Hallward; Lord Henry Wotton; Sibyl Vane;
      Christine Daaé; Dr. Caligari/Caligari`,
  },
];

export const halloween: SeedCategory[] = [...zaigrano, ...kviz].map(rang);
