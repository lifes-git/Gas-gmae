"""Deterministically remove the generated bright checkerboard around the approved can."""
from pathlib import Path
import hashlib
import json
from PIL import Image, ImageFilter, ImageDraw

root = Path(__file__).resolve().parents[3]
source = root / "webgame-prototype/assets/masters/prop-butane-red-alpha-v4.png"
target = root / "webgame-prototype/assets/masters/prop-butane-red-cutout-v4.png"
preview_path = root / "production/game/qa/butane-red-alpha-dark-preview-v4.png"

rgb = Image.open(source).convert("RGB")
candidate = Image.new("L", rgb.size)
candidate.putdata([
    255 if min(pixel) >= 172 and max(pixel) - min(pixel) <= 92 else 0
    for pixel in rgb.getdata()
])
ImageDraw.floodfill(candidate, (0, 0), 128, thresh=0)
alpha = candidate.point(lambda value: 0 if value == 128 else 255)
alpha = alpha.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.35))

rgba = rgb.convert("RGBA")
rgba.putalpha(alpha)
box = rgba.getbbox()
if box:
    margin = 24
    box = (
        max(0, box[0] - margin), max(0, box[1] - margin),
        min(rgba.width, box[2] + margin), min(rgba.height, box[3] + margin),
    )
    rgba = rgba.crop(box)
rgba.save(target)

preview = Image.new("RGB", rgba.size, "#344654")
preview.paste(rgba, mask=rgba.getchannel("A"))
preview.save(preview_path)

print(json.dumps({
    "path": str(target),
    "size": rgba.size,
    "alpha_extrema": alpha.getextrema(),
    "bytes": target.stat().st_size,
    "sha256": hashlib.sha256(target.read_bytes()).hexdigest(),
    "source_rgb_preserved_before_crop": True,
}))
