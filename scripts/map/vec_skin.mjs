// node vec2.mjs <key> <lon0> <lat0> <lon1> <lat1> <Country[,Country]> [riverNames]
import fs from 'fs';
import { geoMercator, geoPath } from 'd3-geo';
import * as topo from 'topojson-client';
const [key, lon0, lat0, lon1, lat1, cs, rv, dash] = process.argv.slice(2);
const dashed=new Set((dash||'').split(',').filter(Boolean));
const Z=9, N=256*2**Z, L=70323.7688888889, T=46234.61268614327, R=72726.75555555556;
const s=1600/(R-L);
const base=geoMercator().scale(N*s/(2*Math.PI)).translate([N*s/2-L*s, N*s/2-T*s]);
const [x0,y0]=base([+lon0,+lat0]), [x1,y1]=base([+lon1,+lat1]);
const proj=base.clipExtent([[x0-5,y0-5],[x1+5,y1+5]]).precision(0.3);
const path=geoPath(proj).digits(1);
const t=JSON.parse(fs.readFileSync('node_modules/world-atlas/countries-10m.json'));
const feats=topo.feature(t,t.objects.countries).features;
const mine=new Set(cs.split(','));
const out={key, image:{x:+x0.toFixed(2), y:+y0.toFixed(2), width:Math.round(x1-x0), height:Math.round(y1-y0)}};
const n=(f)=>f.properties.name;
out.border=path(topo.mesh(t,t.objects.countries,(a,b)=>a!==b && mine.has(n(a))!==mine.has(n(b)) && !dashed.has(n(a)) && !dashed.has(n(b))));
// isprekidana granica (sporni teritorij), bez natpisa
out.dashed=dashed.size?path(topo.mesh(t,t.objects.countries,(a,b)=>a!==b && mine.has(n(a))!==mine.has(n(b)) && (dashed.has(n(a))||dashed.has(n(b))))):null;
const rivers=JSON.parse(fs.readFileSync('rivers.geojson'));
const want=new Map((rv||'').split(',').filter(Boolean).map(p=>p.split(':')));
out.rivers=rivers.features.filter(f=>want.has(f.properties.name)).map(f=>({name:want.get(f.properties.name),d:path(f)})).filter(r=>r.d);
// spoji iste rijeke
const m=new Map(); for(const r of out.rivers) m.set(r.name,(m.get(r.name)||'')+r.d); out.rivers=[...m].map(([name,d])=>({name,d}));
const rings=[]; for(const f of feats.filter(f=>mine.has(f.properties.name))){const g=f.geometry;(g.type==='MultiPolygon'?g.coordinates:[g.coordinates]).forEach(p=>p.forEach(r=>rings.push(r.map(c=>base(c)))));}
fs.writeFileSync(`rings_${key}.json`,JSON.stringify(rings));
fs.writeFileSync(`vec_${key}.json`,JSON.stringify(out));
console.log(key,out.image,(JSON.stringify(out).length/1024|0)+'KB', out.rivers.map(r=>r.name));
