"""Sinh icon + splash cho ban Android tu dau hieu thuong hieu dang chay that tren forely.vn.

Chay trong CI: python3 tools/gen-android-assets.py /tmp/icon-src.png
Ket qua: resources/icon.png (1024) + resources/splash.png, splash-dark.png (2732)
-> npx @capacitor/assets generate --android doc dung ba tep nay.

VI SAO KHONG LUU ANH SAN TRONG KHO MA: dau hieu thuong hieu doi theo Brand Center;
lay thang tu production thi app khong bao gio lech mot phien ban so voi web.
"""
from PIL import Image
import pathlib
import sys

# Forest — mau neo cua bo nhan dien "Signal Rings" (forely.vn/thuong-hieu).
# KHONG dung #134E39 hay navy/lime cu: da nghi huu.
FOREST = (0x0F, 0x3A, 0x36, 255)

SRC = sys.argv[1] if len(sys.argv) > 1 else '/tmp/icon-src.png'
OUT = pathlib.Path('resources')
OUT.mkdir(exist_ok=True)

src = Image.open(SRC).convert('RGBA')
if min(src.size) < 512:
    raise SystemExit('Anh nguon qua nho de phong len 1024: %s' % (src.size,))

# @capacitor/assets doi icon toi thieu 1024x1024.
src.resize((1024, 1024), Image.LANCZOS).save(OUT / 'icon.png')

# Splash 2732x2732 (vuong): Android cat theo canh NGAN nhat cua man hinh, nen
# dau hieu phai nam gon giua. 26% la ty le an toan cho ca may cao lan may rong.
for name in ('splash.png', 'splash-dark.png'):
    canvas = Image.new('RGBA', (2732, 2732), FOREST)
    k = int(2732 * 0.26)
    mark = src.resize((k, k), Image.LANCZOS)
    canvas.paste(mark, ((2732 - k) // 2, (2732 - k) // 2), mark)
    canvas.convert('RGB').save(OUT / name)

print('OK: icon.png 1024 + splash 2732 tren nen #0F3A36')
