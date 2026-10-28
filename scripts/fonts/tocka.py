"""Overpass ima znakove kao · ´ ¨ ˇ označene kao dijakritike (GDEF klasa 3), pa ih preglednik iscrta
širine 0: "Big Brother · Pješice" izgleda kao "Big Brother ·Pješice". Ovo skine samo te znakove iz Overpassa
(Google Fonts, varijabilna težina) i makne GDEF, pa imaju svoju normalnu širinu. U globals.css taj font stoji
ispred Overpassa i vrijedi samo za te znakove (unicode-range).

Pokretanje iz korijena repoa: python3 scripts/fonts/tocka.py (treba: pip install fonttools brotli)
"""
import io
import re
import urllib.parse
import urllib.request

from fontTools.ttLib import TTFont

CHARS = "`¨¯´·¸ˆˇˉ˚˜˝"
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"


def get(url: str) -> bytes:
    return urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA})).read()


css = get("https://fonts.googleapis.com/css2?family=Overpass:wght@100..900&text=" + urllib.parse.quote(CHARS)).decode()
font = TTFont(io.BytesIO(get(re.search(r"url\((https://[^)]+)\)", css).group(1))))
for tag in ("GDEF", "GPOS", "GSUB"):
    if tag in font:
        del font[tag]
# drugo ime obitelji, da se ne miješa s pravim Overpassom (licenca OFL ostaje u name tablici)
for rec in font["name"].names:
    if rec.nameID in (1, 4, 16):
        rec.string = "Dokle Tocka"
    elif rec.nameID == 6:
        rec.string = "DokleTocka"
font.flavor = "woff2"
font.save("public/fonts/tocka.woff2")
print("public/fonts/tocka.woff2:", sorted(hex(c) for c in font.getBestCmap()))
