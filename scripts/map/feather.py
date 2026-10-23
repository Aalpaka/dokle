"""Reljefna karta s već upečenim mekim rubom (alfa kanal), da preglednik ne mora svaki okvir
računati SVG masku s Gaussovim zamućenjem; to je na mobitelima rušilo broj okvira.

Rub odgovara staroj maski u MapStage: pravokutnik uvučen 40 px, zamućen sa stdDeviation 18.
Pokretanje iz korijena repoa: python3 scripts/map/feather.py
"""
from PIL import Image, ImageDraw, ImageFilter

for skin in ("hr", "ba", "rs"):
    im = Image.open(f"public/map/{skin}-reljef.jpg").convert("RGB")
    w, h = im.size
    a = Image.new("L", (w, h), 0)
    ImageDraw.Draw(a).rectangle([40, 40, w - 41, h - 41], fill=255)
    a = a.filter(ImageFilter.GaussianBlur(18))
    im.putalpha(a)
    im.save(f"public/map/{skin}-reljef.webp", "WEBP", quality=80, method=6)
