// Jako otvorena pitanja: odgovor može biti skoro bilo što ("Nešto crveno", "Riječ engleskog podrijetla"), pa popis nikad
// nije potpun i igrači češće promaše. Dnevni izbor uzima najviše jedno takvo (vidi pickCategories). Oznaka se u bazu
// upisuje migracijom 0012 i seedom za nove kategorije, a poslije se mijenja u adminu (Sadržaj).
export const OTVORENA = new Set([
  // zaigrano
  "plaza", "frizider", "psovka", "dijalekt", "zuto", "crveno", "okruglo", "rupe", "na-glavi", "ladica", "kotaci",
  "skupljaju", "novcanik", "kupaonica", "rima-kava", "plavo", "zeleno", "bijelo", "krila", "ostro", "kofer", "skola",
  "auto-unutra", "bozic", "svadba", "drvo", "strah", "ime-ljubimca", "poznata-zivotinja", "zlikovac",
  "noc-vjestica",
  // kviz
  "izam", "logija", "fobija", "anglizam", "turcizam", "germanizam", "galicizam", "kemijski-spoj",
  // općenito
  "zanimanje", "bolest", "izum",
]);
