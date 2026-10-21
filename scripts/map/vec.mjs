import fs from 'fs';
import { geoMercator, geoPath } from 'd3-geo';
import * as topo from 'topojson-client';
const Z=9, N=256*2**Z, L=70323.7688888889, T=46234.61268614327, R=72726.75555555556, B=48582.58297430309;
const W=1600, s=W/(R-L), H=Math.round((B-T)*s);
const proj=geoMercator().scale(N*s/(2*Math.PI)).translate([N*s/2-L*s, N*s/2-T*s]).clipExtent([[-380,-5],[1980,H+5]]).precision(0.3);
const path=geoPath(proj).digits(1);
const t=JSON.parse(fs.readFileSync('node_modules/world-atlas/countries-10m.json'));
const all=topo.feature(t,t.objects.countries).features;
const out={W,H,countries:{}};
for (const f of all) { const d=path(f); if (d && d.length>20) out.countries[f.properties.name]=d; }
const hr=all.find(f=>f.properties.name==='Croatia');
out.hrBorder=path(topo.mesh(t,t.objects.countries,(a,b)=>a!==b && (a.properties.name==='Croatia'||b.properties.name==='Croatia')));
const rv=JSON.parse(fs.readFileSync('rivers_sel.json'));
out.rivers=rv.features.map(f=>({n:f.properties.name,d:path(f)})).filter(r=>r.d);
const pts={Vukovar:[19.0,45.35],Osijek:[18.69,45.55],'Đakovo':[18.41,45.31],'Slavonski Brod':[18.01,45.16],Zagreb:[15.98,45.81],Karlovac:[15.55,45.49],Rijeka:[14.44,45.33],Pula:[13.85,44.87],'Gospić':[15.37,44.55],Zadar:[15.23,44.12],'Šibenik':[15.89,43.73],Split:[16.44,43.51],Makarska:[17.02,43.3],Ston:[17.7,42.84],Dubrovnik:[18.09,42.65]};
out.stations=Object.fromEntries(Object.entries(pts).map(([k,v])=>[k,proj(v).map(x=>+x.toFixed(1))]));
// HR polygon for raster mask (projected rings)
const rings=[]; const g=hr.geometry; (g.type==='MultiPolygon'?g.coordinates:[g.coordinates]).forEach(p=>p.forEach(r=>rings.push(r.map(c=>proj(c)))));
fs.writeFileSync('hr_rings.json',JSON.stringify(rings));
fs.writeFileSync('vec.json',JSON.stringify(out));
console.log(W,H,Object.keys(out.countries).length, out.stations, (JSON.stringify(out).length/1024|0)+'KB');
