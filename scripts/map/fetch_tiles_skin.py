import math, os, urllib.request, concurrent.futures as cf
Z=9; N=256*2**Z
def px(lon,lat):
    x=(lon+180)/360*N
    s=math.sin(math.radians(lat)); y=(0.5-math.log((1+s)/(1-s))/(4*math.pi))*N
    return x,y
L,T=px(12.9,47.0); R,B=px(25.9,41.4)
tx0,tx1=int(L//256),int(R//256); ty0,ty1=int(T//256),int(B//256)
jobs=[(x,y) for x in range(tx0,tx1+1) for y in range(ty0,ty1+1)]
def get(j):
    x,y=j; p=f"tiles/{x}_{y}.png"
    if not os.path.exists(p): urllib.request.urlretrieve(f"https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{Z}/{x}/{y}.png",p)
with cf.ThreadPoolExecutor(8) as ex: list(ex.map(get,jobs))
print(len(jobs),tx0,tx1,ty0,ty1)
