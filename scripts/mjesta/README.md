# Najbliže mjesto na ruti

Na kraju igre (i u povijesti, usporedbi i ligama) piše najbliže stvarno mjesto točki na kojoj je igrač stao,
ne samo zadnja postaja rute. Za svaki km rute je to unaprijed izračunato u `src/skins/<skin>/mjesta.ts`.

Izvor su naselja s koordinatama s Wikipedije (SQL dumpovi s https://dumps.wikimedia.org):

| skin | wiki | kategorija | naselja |
|---|---|---|---|
| hr | hrwiki | Naselje / Općina i naselje / Grad i naselje u popisu 2021. | ~6200 |
| ba | bswiki | Naselja u Bosni i Hercegovini | ~6200 |
| rs | srwiki | Википројект географија/Насеља у Србији (bez Kosova, u latinici) | ~4900 |

Za hr se mjesta s više pregleda na Wikipediji blago preferiraju (godišnji pregledi iz `dokle/wiki/skripta/podaci/pv12-hr.tsv.gz`
u projektnim datotekama), pa zaselak pobijedi grad samo kad je osjetno bliže. Za ba i rs nema pregleda, pa je to čisto najbliže.

Ponovno generirati treba kad se promijene postaje ili `via` rute:

```sh
python3 scripts/mjesta/kandidati.py hrwiki "Naselje u popisu 2021.,Općina i naselje u popisu 2021.,Grad i naselje u popisu 2021." dump/hr kandidati-hr.json pv12-hr.tsv.gz
npx tsx scripts/mjesta/gen.ts hr kandidati-hr.json hr.wikipedije
```

Imena se čiste od zagrada ("Brdo (Zadar)" → "Brdo"); postaje rute su uvijek mjesta na svojim koordinatama.
