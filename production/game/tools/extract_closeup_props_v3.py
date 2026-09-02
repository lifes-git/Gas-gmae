from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter


ROOT = Path(__file__).resolve().parents[3]
MASTERS = ROOT / "webgame-prototype/assets/masters"
RUNTIME = ROOT / "webgame-prototype/assets/runtime/props"


def polygon_cut(source_name, box, polygon, output_name):
    image = Image.open(MASTERS / source_name).convert("RGBA").crop(box)
    mask = Image.new("L", image.size, 0)
    ImageDraw.Draw(mask).polygon(polygon, fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(1.4))
    image.putalpha(mask)
    image.save(RUNTIME / output_name, optimize=True)


def valve_handle_cut():
    image = Image.open(MASTERS / "bg-valve-wall-closeup-v3.png").convert("RGBA")
    image = image.crop((1170, 430, 1270, 700))
    pixels = image.load()
    mask = Image.new("L", image.size, 0)
    alpha = mask.load()
    for y in range(image.height):
        for x in range(image.width):
            r, g, b, _ = pixels[x, y]
            if r > 145 and g > 72 and b < 105 and r > g * 1.18:
                alpha[x, y] = 255
    mask = mask.filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.GaussianBlur(1.2))
    image.putalpha(mask)
    image.save(RUNTIME / "prop-valve-handle-scene-v3.png", optimize=True)


polygon_cut(
    "bg-butane-floor-closeup-v3.png",
    (610, 430, 1040, 690),
    [(20, 105), (75, 58), (345, 18), (410, 58), (405, 135), (95, 245), (25, 195)],
    "prop-butane-scene-v3.png",
)
polygon_cut(
    "bg-towel-counter-closeup-v3.png",
    (470, 420, 1140, 780),
    [(25, 120), (320, 20), (645, 135), (638, 235), (355, 345), (35, 250)],
    "prop-towel-scene-v3.png",
)
valve_handle_cut()
