"""Preserve approved handle pixels; manual silhouette alpha, no regeneration."""
from pathlib import Path
import json
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[3]
ASSETS = ROOT / 'webgame-prototype/assets/masters'
source = Image.open(ASSETS / 'stove-front-props-preview-v1.png').convert('RGBA')
crop = source.crop((1408, 302, 1460, 414))
# Coordinates traced on a 6x nearest-source inspection. Excludes fixed silver body.
outline = [(160,48),(188,51),(217,66),(239,88),(251,117),(254,147),
           (249,174),(237,197),(221,215),(217,240),(215,303),(213,380),
           (210,477),(208,562),(203,588),(191,609),(173,623),(156,625),
           (139,618),(125,603),(117,583),(113,544),(110,449),(108,351),
           (106,268),(105,228),(98,212),(83,194),(73,171),(69,146),
           (72,120),(82,96),(99,75),(122,58),(143,51)]
mask = Image.new('L', (312,672))
ImageDraw.Draw(mask).polygon(outline, fill=255)
crop.putalpha(mask.resize(crop.size, Image.Resampling.LANCZOS))
# Square transparent canvas: exact centered pivot makes quarter-turn rotation stable.
sprite = Image.new('RGBA', (224,224))
sprite.alpha_composite(crop, (85,88))
sprite.save(ASSETS / 'prop-valve-handle-alpha-v2.png')
scene = Image.open(ROOT / 'production/game/qa/stove-towel-placement-preview-v1.png').convert('RGBA')
for name, angle in [('vertical',0),('horizontal',-90)]:
    placed = scene.copy()
    placed.alpha_composite(sprite.rotate(angle), (1435-112,326-112))
    placed.convert('RGB').save(ROOT / f'production/game/qa/stove-valve-{name}-preview-v2.png')
    placed.crop((1360,270,1540,450)).resize((720,720),Image.Resampling.NEAREST).save(ROOT / f'production/game/qa/valve-{name}-detail-v2.png')
print(json.dumps({'canvas':[224,224],'pivot':[112,112],'scene_pivot':[1435,326],
                  'method':'source pixels + hand-traced alpha','runtime_changed':False}))
