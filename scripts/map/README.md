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

## BiH i Srbija (`ba-reljef.jpg`, `rs-reljef.jpg`)

Ista projekcija i iste koordinate karte kao Hrvatska, samo drugi obuhvat slike i druga maska zemlje.
Skripte su parametrizirane (pokreću se iz mape s pločicama i `node_modules` kao gore, plus
`rivers.geojson` = Natural Earth `ne_10m_rivers_lake_centerlines`):

1. `python3 fetch_tiles_skin.py` (pločice za cijelu regiju, lon 12,9–25,9).
2. `node vec_skin.mjs ba 13.3 45.75 21.6 42.2 "Bosnia and Herz." "Sava:Sava,Drina:Drina,Danube:Dunav,Drau:Drava"`
   i `node vec_skin.mjs rs 16.2 46.5 25.6 41.6 "Serbia" "Sava:Sava,Drina:Drina,Danube:Dunav,Tisa:Tisa,Morava:Morava" "Kosovo"`
   (zadnji argument: granica koja se crta isprekidano). Daje `vec_<skin>.json` (obuhvat slike, granica, rijeke) i `rings_<skin>.json`.
3. `python3 relief_skin.py ba ba-reljef.jpg`; za Srbiju se Kosovo boja djelomično:
   `node vec_skin.mjs ks 16.2 46.5 25.6 41.6 "Kosovo" ""` pa `python3 relief_skin.py rs rs-reljef.jpg rings_ks.json 0.6`.
4. Granicu i rijeke prepisati u `src/skins/<skin>/mapGeo.ts`, a obuhvat slike u `image` u `src/skins/<skin>/map.ts`.

## Okolica (`*-okolica.jpg`)
Šira karta manje rezolucije ispod glavne (`backdrop` u `map.ts`), da se kod "cijele rute" ne vide prazni rubovi.
Pločice za lon 8,5–30 i lat 39,8–48,6, pa npr. `node vec_skin.mjs baw 11.5 47.6 23.5 40.3 "Bosnia and Herz." ""` i
`SCALE=0.4 python3 relief_skin.py baw ba-okolica.jpg` (Srbija s `"Kosovo"` kao gore, Hrvatska `hrw 8.6 48.5 25 40.0 "Croatia"`).

