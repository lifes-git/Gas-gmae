"""Composite approved artwork without regeneration; preview only."""
from pathlib import Path
import json
from PIL import Image, ImageFilter

root = Path(__file__).resolve().parents[3]
assets = root / 'webgame-prototype/assets/masters'
scene = Image.open(assets / 'bg-stove-front-interaction-v1.png').convert('RGBA')
towel = Image.open(assets / 'prop-towel-draped-alpha-v1.png').convert('RGBA')
bounds = towel.getchannel('A').getbbox()
sprite = towel.crop(bounds)
# Match the approved composite's left burner drape; never distort the sprite.
width = 300
height = round(sprite.height * width / sprite.width)
sprite = sprite.resize((width, height), Image.Resampling.LANCZOS)
x, y = 618, 470
# Separate subtle contact shadow, removed together with towel upon pickup.
shadow = Image.new('RGBA', scene.size)
shadow_alpha = Image.new('L', scene.size)
shadow_alpha.paste(sprite.getchannel('A').point(lambda a: round(a * .20)), (x + 1, y + 3))
shadow.putalpha(shadow_alpha.filter(ImageFilter.GaussianBlur(1.2)))
scene = Image.alpha_composite(scene, shadow)
scene.alpha_composite(sprite, (x, y))
output = root / 'production/game/qa/stove-towel-placement-preview-v1.png'
scene.convert('RGB').save(output)
print(json.dumps({'preview': str(output), 'source_crop': bounds, 'scene_size': scene.size, 'placement': {'x': x, 'y': y, 'width': width, 'height': height}, 'runtime_changed': False}))
