# Karta Hrvatske (reljef i granice)

Jednokratne skripte kojima su napravljeni `public/map/hr-reljef.jpg` i `src/skins/hr/mapGeo.ts`.
Nisu dio builda; ponovno se pokreću samo ako se mijenja izgled ili obuhvat karte.

Projekcija: Web Mercator na zoomu 9. Koordinate karte su pikseli te projekcije pomaknuti i skalirani
tako da je raspon dužine 13,15°–19,75° širok 1600 px (vidi `src/lib/route.ts`). Slika pokriva
x od -375,76 do 1976,24 i y od 0 do 1563.

Redoslijed (pokreće se iz ove mape):

1. `python3 fetch_tiles.py` skida visinske pločice (AWS Terrain Tiles, terrarium) u `tiles/`.
2. `npm i --no-save world-atlas@2.0.2 d3-geo@3.1.1 topojson-client@3.1.0`, pa u `rivers_sel.json`
   spremi rijeke iz Natural Earth `ne_10m_rivers_lake_centerlines` koje sijeku obuhvat karte.
3. `node vec.mjs` daje `vec.json` (granica, rijeke) i `hr_rings.json` (maska Hrvatske).
4. `python3 relief.py` (numpy, Pillow) iscrtava sjenčani reljef u `public/map/hr-reljef.jpg`.
5. Granicu i rijeke iz `vec.json` prepisati u `src/skins/hr/mapGeo.ts`.

Izvori i licence: AWS Terrain Tiles (SRTM, GMTED2010, ETOPO1 i drugi otvoreni izvori, uz navođenje),
Natural Earth (javno vlasništvo). Navod je u podnožju igre.
