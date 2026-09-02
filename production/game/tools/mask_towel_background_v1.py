"""User-approved deterministic background masking; no image regeneration."""
from pathlib import Path
import hashlib
import json
from PIL import Image, ImageFilter, ImageDraw

root = Path(__file__).resolve().parents[3]
source = root / 'webgame-prototype/assets/masters/towel-extraction-rejected-v1.png'
target = root / 'webgame-prototype/assets/masters/prop-towel-draped-alpha-v1.png'
rgb = Image.open(source).convert('RGB')
# Only bright neutral checkerboard connected to the outside is removed.
candidate = Image.new('L', rgb.size)
candidate.putdata([255 if min(p) >= 170 and max(p)-min(p) <= 24 else 0 for p in rgb.getdata()])
ImageDraw.floodfill(candidate, (0, 0), 128, thresh=0)
alpha = candidate.point(lambda p: 0 if p == 128 else 255)
alpha = alpha.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(.35))
rgba = rgb.copy().convert('RGBA')
rgba.putalpha(alpha)
rgba.save(target)
# Preview only: the deliverable remains transparent and uncropped.
preview = Image.new('RGB', rgb.size, '#344654')
preview.paste(rgba, mask=alpha)
preview.save(root / 'production/game/qa/towel-alpha-dark-preview-v1.png')
print(json.dumps({'path': str(target), 'size': rgba.size, 'alpha_extrema': alpha.getextrema(), 'bytes': target.stat().st_size, 'sha256': hashlib.sha256(target.read_bytes()).hexdigest(), 'rgb_preserved': rgba.convert('RGB').tobytes() == rgb.tobytes()}))
