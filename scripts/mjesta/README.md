# Najbliže mjesto na ruti

Na kraju igre (i u povijesti, usporedbi i ligama) piše najbliže stvarno mjesto točki na kojoj je igrač stao,
ne samo zadnja postaja rute. Za svaki km rute je to unaprijed izračunato u `src/skins/<skin>/mjesta.ts`.

Izvor su naselja s koordinatama s Wikipedije (SQL dumpovi s https://dumps.wikimedia.org). Uzimaju se samo
poznatija mjesta, da većina igrača ima šansu čuti za njih:

| skin | wiki | kategorija | poznatost | mjesta |
|---|---|---|---|---|
| hr | hrwiki | Naselje / Općina i naselje / Grad i naselje u popisu 2021. | svi gradovi + 8000+ pregleda godišnje | ~150 |
| ba | bswiki | Naselja u Bosni i Hercegovini | članak na 15+ jezika | ~160 |
| rs | srwiki | Википројект географија/Насеља у Србији (bez Kosova, u latinici) | članak na 20+ jezika | ~180 |

Pregledi za hr su iz `dokle/wiki/skripta/podaci/pv12-hr.tsv.gz` u projektnim datotekama. Poznatija mjesta se i među
ostalima blago preferiraju, pa manje mjesto pobijedi veće samo kad je osjetno bliže.

Ponovno generirati treba kad se promijene postaje ili `via` rute:

```sh
python3 scripts/mjesta/kandidati.py hrwiki "Naselje u popisu 2021.,Općina i naselje u popisu 2021.,Grad i naselje u popisu 2021." \
  "Grad i naselje u popisu 2021." dump/hr kandidati-hr.json 8000 pv12-hr.tsv.gz
npx tsx scripts/mjesta/gen.ts hr kandidati-hr.json hr.wikipedije
```

Naredbe za ba i rs su na vrhu `kandidati.py`. Imena se čiste od zagrada ("Brdo (Zadar)" → "Brdo"); postaje rute su uvijek mjesta na svojim koordinatama.
