"""Mask enclosed title silhouettes, preserving generated RGB; no repainting."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageOps
root = Path(__file__).resolve().parents[3]
assets = root / 'webgame-prototype/assets/masters'
for name in ['start', 'result']:
    im = Image.open(assets / f'title-{name}-source-v1.png').convert('RGBA')
    if name == 'start':
        barrier = [255 if max(r,g,b) < 130 else 0 for r,g,b,a in im.getdata()]
    else:
        barrier = [255 if min(r,g,b) > 190 else 0 for r,g,b,a in im.getdata()]
    mask = Image.new('L', im.size); mask.putdata(barrier)
    mask = mask.filter(ImageFilter.MaxFilter(3))
    ImageDraw.floodfill(mask, (0,0), 128)
    for x in range(im.width):
        for y in (0, im.height-1):
            if mask.getpixel((x,y)) == 0: ImageDraw.floodfill(mask, (x,y), 128)
    for y in range(im.height):
        for x in (0, im.width-1):
            if mask.getpixel((x,y)) == 0: ImageDraw.floodfill(mask, (x,y), 128)
    mask = mask.point(lambda p: 0 if p == 128 else 255)
    if name == 'start':
        mask = mask.filter(ImageFilter.MaxFilter(9))
    mask = mask.filter(ImageFilter.GaussianBlur(.45))
    im.putalpha(mask)
    im = im.crop(mask.getbbox())
    im = ImageOps.expand(im, border=12, fill=(0,0,0,0))
    im.save(assets / f'title-{name}-alpha-v1.png')
    print(name, im.size)
