import json, numpy as np
from PIL import Image, ImageDraw, ImageFilter
L,T,R,B=69759.4311111111,46234.61268614327,73291.09333333334,48582.58297430309
S0=1600/(72726.75555555556-70323.7688888889)
tx0,ty0=int(L//256),180; tx1,ty1=int(R//256),int(B//256)
mos=np.zeros(((ty1-ty0+1)*256,(tx1-tx0+1)*256,3),np.float64)
for x in range(tx0,tx1+1):
  for y in range(ty0,ty1+1):
    mos[(y-ty0)*256:(y-ty0+1)*256,(x-tx0)*256:(x-tx0+1)*256]=np.asarray(Image.open(f"tiles/{x}_{y}.png").convert('RGB'),np.float64)
el=mos[...,0]*256+mos[...,1]+mos[...,2]/256-32768
ox,oy=L-tx0*256,T-ty0*256
el=el[int(oy):int(oy)+int(B-T),int(ox):int(ox)+int(R-L)]
W=round((R-L)*S0); H=1563
# resize elevation
eimg=Image.fromarray(el.astype(np.float32),'F').resize((W,H),Image.BILINEAR)
e=np.asarray(eimg,np.float64)
cell=156543.03*np.cos(np.radians(44.5))/512/S0
gy,gx=np.gradient(e,cell)
z=1.8
slope=np.arctan(z*np.hypot(gx,gy)); aspect=np.arctan2(-gx,gy)
az,alt=np.radians(315),np.radians(42)
hs=np.sin(alt)*np.cos(slope)+np.cos(alt)*np.sin(slope)*np.cos(az-aspect+np.pi/2)
hs=np.clip(hs,0,1)
OFF=(70323.7688888889-L)*S0
print('OFF',OFF)
# HR mask
rings=json.load(open('hr_rings.json'))
m=Image.new('L',(W,H),0); d=ImageDraw.Draw(m)
# even-odd via xor drawing
import functools
for r in rings:
  t=Image.new('L',(W,H),0); ImageDraw.Draw(t).polygon([(p[0]+OFF,p[1]) for p in r],fill=255)
  m=Image.fromarray(np.bitwise_xor(np.asarray(m),np.asarray(t)))
hr=np.asarray(m.filter(ImageFilter.GaussianBlur(1.2)),np.float64)/255
def ramp(v,stops):
  xs=[s[0] for s in stops]; out=np.zeros(v.shape+(3,))
  for i in range(3): out[...,i]=np.interp(v,xs,[s[1][i] for s in stops])
  return out
hx=lambda h:tuple(int(h[i:i+2],16) for i in (1,3,5))
land=ramp(e,[(0,hx('#b4cf8e')),(120,hx('#c3d69a')),(300,hx('#d9dba6')),(600,hx('#e3d3a3')),(1000,hx('#cdb28e')),(1500,hx('#b8a690')),(1900,hx('#ece8e2'))])
issea=(e<=0.5)
lm=Image.fromarray(((~issea)*255).astype(np.uint8))
near=np.maximum(np.asarray(lm.filter(ImageFilter.GaussianBlur(6)),np.float64),np.asarray(lm.filter(ImageFilter.GaussianBlur(40)),np.float64)*2.2)/255
near=np.clip(near,0,1)
deep=np.array(hx('#5f9fc8'),np.float64); shallow=np.array(hx('#a6d6e4'),np.float64)
sea=deep*(1-near[...,None])+shallow*near[...,None]
shade=(0.55+0.62*hs)[...,None]
landc=np.clip(land*shade,0,255)
gray=landc.mean(axis=2,keepdims=True)
nb=np.clip((gray*0.28+landc*0.12+np.array(hx('#efece4'))*0.6),0,255)
nb=np.clip(nb*(0.93+0.1*hs[...,None]),0,255)
col=landc*hr[...,None]+nb*(1-hr[...,None])
col=np.where(issea[...,None],sea,col)
img=Image.fromarray(col.astype(np.uint8),'RGB')
img.save('../../public/map/hr-reljef.jpg',quality=80,optimize=True,progressive=True)
print(W,H)
