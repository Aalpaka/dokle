# python3 relief_skin.py <key> <out.jpg> [rings_extra.json udio]  — sjenčani reljef za obuhvat iz vec_<key>.json, maska iz rings_<key>.json;
# dodatna maska se oboji djelomično (npr. Kosovo na karti Srbije, udio 0.6)
import json, sys, numpy as np
from PIL import Image, ImageDraw, ImageFilter
key,outp=sys.argv[1],sys.argv[2]
import os
SC=float(os.environ.get('SCALE','1'))
Lh=70323.7688888889; Th=46234.61268614327; S0=1600/(72726.75555555556-Lh)
v=json.load(open(f'vec_{key}.json'))['image']
L=Lh+v['x']/S0; T=Th+v['y']/S0; R=L+v['width']/S0; B=T+v['height']/S0
tx0,ty0=int(L//256),int(T//256); tx1,ty1=int(R//256),int(B//256)
mos=np.zeros(((ty1-ty0+1)*256,(tx1-tx0+1)*256,3),np.float64)
for x in range(tx0,tx1+1):
  for y in range(ty0,ty1+1):
    mos[(y-ty0)*256:(y-ty0+1)*256,(x-tx0)*256:(x-tx0+1)*256]=np.asarray(Image.open(f"tiles/{x}_{y}.png").convert('RGB'),np.float64)
el=mos[...,0]*256+mos[...,1]+mos[...,2]/256-32768
ox,oy=L-tx0*256,T-ty0*256
el=el[int(oy):int(oy)+int(B-T),int(ox):int(ox)+int(R-L)]
W,H=round(v['width']*SC),round(v['height']*SC)
e=np.asarray(Image.fromarray(el.astype(np.float32),'F').resize((W,H),Image.BILINEAR),np.float64)
cell=156543.03*np.cos(np.radians(44.5))/512/S0/SC
gy,gx=np.gradient(e,cell)
slope=np.arctan(1.8*np.hypot(gx,gy)); aspect=np.arctan2(-gx,gy)
az,alt=np.radians(315),np.radians(42)
hs=np.clip(np.sin(alt)*np.cos(slope)+np.cos(alt)*np.sin(slope)*np.cos(az-aspect+np.pi/2),0,1)
def mask(rings):
  m=Image.new('L',(W,H),0)
  for r in rings:
    t=Image.new('L',(W,H),0); ImageDraw.Draw(t).polygon([((p[0]-v['x'])*SC,(p[1]-v['y'])*SC) for p in r],fill=255)
    m=Image.fromarray(np.bitwise_xor(np.asarray(m),np.asarray(t)))
  return np.asarray(m.filter(ImageFilter.GaussianBlur(max(0.6,1.2*SC))),np.float64)/255
hr=mask(json.load(open(f'rings_{key}.json')))
if len(sys.argv)>4: hr=np.maximum(hr,mask(json.load(open(sys.argv[3])))*float(sys.argv[4]))
def ramp(v,stops):
  xs=[s[0] for s in stops]; out=np.zeros(v.shape+(3,))
  for i in range(3): out[...,i]=np.interp(v,xs,[s[1][i] for s in stops])
  return out
hx=lambda h:tuple(int(h[i:i+2],16) for i in (1,3,5))
land=ramp(e,[(0,hx('#b4cf8e')),(120,hx('#c3d69a')),(300,hx('#d9dba6')),(600,hx('#e3d3a3')),(1000,hx('#cdb28e')),(1500,hx('#b8a690')),(1900,hx('#ece8e2'))])
issea=(e<=0.5)
lm=Image.fromarray(((~issea)*255).astype(np.uint8))
near=np.clip(np.maximum(np.asarray(lm.filter(ImageFilter.GaussianBlur(6*SC)),np.float64),np.asarray(lm.filter(ImageFilter.GaussianBlur(40*SC)),np.float64)*2.2)/255,0,1)
deep=np.array(hx('#5f9fc8'),np.float64); shallow=np.array(hx('#a6d6e4'),np.float64)
sea=deep*(1-near[...,None])+shallow*near[...,None]
landc=np.clip(land*(0.55+0.62*hs)[...,None],0,255)
gray=landc.mean(axis=2,keepdims=True)
nb=np.clip((gray*0.28+landc*0.12+np.array(hx('#efece4'))*0.6),0,255)
nb=np.clip(nb*(0.93+0.1*hs[...,None]),0,255)
col=landc*hr[...,None]+nb*(1-hr[...,None])
col=np.where(issea[...,None],sea,col)
Image.fromarray(col.astype(np.uint8),'RGB').save(outp,quality=80,optimize=True,progressive=True)
print(W,H)
