"""Poznatija naselja s koordinatama iz SQL dumpova Wikipedije -> JSON [[naslov, lon, lat, poznatost], ...] za gen.ts.

python3 scripts/mjesta/kandidati.py <wiki> <kategorije> <sjedišta> <dump-mapa> <izlaz.json> <prag> [pregledi.tsv.gz]
Poznatost je godišnji broj pregleda članka (ako je dana datoteka pregleda), inače broj jezika na kojima članak
postoji (langlinks). Ostaju naselja s poznatošću >= prag i sva iz kategorija sjedišta (gradovi i općine).
  hr: hrwiki "Naselje u popisu 2021.,Općina i naselje u popisu 2021.,Grad i naselje u popisu 2021." \
      "Općina i naselje u popisu 2021.,Grad i naselje u popisu 2021." dump/hr kandidati-hr.json 3000 pv12-hr.tsv.gz
  ba: bswiki "Naselja u Bosni i Hercegovini" "" dump/bs kandidati-ba.json 12
  rs: srwiki "Википројект географија/Насеља у Србији" "" dump/sr kandidati-rs.json 16
      (ćirilica se prebacuje u latinicu, Kosovo izostavljeno)
Dumpovi (https://dumps.wikimedia.org/<wiki>/latest/): geo_tags, page, categorylinks, linktarget, langlinks.
"""
import gzip, json, re, sys

wiki, cats, seats, D, out, minimum = sys.argv[1:7]
want, seat = set(cats.split(",")), set(filter(None, seats.split(",")))
TOK = re.compile(rb"\(|\)|,|'((?:[^'\\]|\\.)*)'|(NULL)|(-?[0-9.eE+-]+)")

def rows(name):
    with gzip.open(f"{D}/{wiki}-latest-{name}.sql.gz") as f:
        for line in f:
            if line.startswith(b"INSERT INTO"): i = line.index(b" VALUES") + 7
            elif line.startswith(b"("): i = 0
            else: continue
            row = None
            for m in TOK.finditer(line, i):
                s = m.group(0)
                if s == b"(": row = []
                elif s == b")":
                    if row is not None: yield row
                    row = None
                elif s == b",": pass
                elif row is not None:
                    if m.group(1) is not None: row.append(re.sub(rb"\\(.)", rb"\1", m.group(1)).decode("utf-8", "replace"))
                    elif m.group(2): row.append(None)
                    else: row.append(s.decode())

geo = {int(r[1]): (float(r[4]), float(r[5])) for r in rows("geo_tags") if r[2] == "earth" and r[3] == "1"}
pages = {int(r[0]): r[2].replace("_", " ") for r in rows("page") if r[1] == "0" and r[3] == "0" and int(r[0]) in geo}
lt = {int(r[0]): r[2].replace("_", " ") for r in rows("linktarget") if r[1] == "14"}
pc = {}
for r in rows("categorylinks"):
    p = int(r[0])
    if p in pages: pc.setdefault(p, []).append(lt.get(int(r[6]), ""))

fame = {}
if len(sys.argv) > 7:
    with gzip.open(sys.argv[7], "rt") as f:
        views = {}
        for l in f:
            t, _, v = l.rstrip("\n").rpartition("\t")
            views[t.replace("_", " ")] = int(v)
    fame = {p: views.get(t, 0) for p, t in pages.items()}
else:
    langs = re.compile(rb"\((\d+),'")
    with gzip.open(f"{D}/{wiki}-latest-langlinks.sql.gz") as f:
        for line in f:
            for m in langs.finditer(line):
                p = int(m.group(1))
                if p in pages: fame[p] = fame.get(p, 0) + 1

CYR = dict(zip("абвгдђежзијклљмнњопрстћуфхцчџшАБВГДЂЕЖЗИЈКЛЉМНЊОПРСТЋУФХЦЧЏШ",
  "a b v g d đ e ž z i j k l lj m n nj o p r s t ć u f h c č dž š A B V G D Đ E Ž Z I J K L Lj M N Nj O P R S T Ć U F H C Č Dž Š".split()))
res = []
for p, title in pages.items():
    cs = pc.get(p, [])
    if not want.intersection(cs) or any("Косов" in c for c in cs): continue
    if fame.get(p, 0) < int(minimum) and not seat.intersection(cs): continue
    lat, lon = geo[p]
    res.append(["".join(CYR.get(ch, ch) for ch in title), round(lon, 4), round(lat, 4), fame.get(p, 0)])
json.dump(res, open(out, "w"), ensure_ascii=False)
print(len(res), "naselja")
