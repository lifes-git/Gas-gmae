from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[3]
BACKGROUND_DIR = ROOT / "webgame-prototype/assets/runtime/backgrounds"

FILES = [
    "bg-room-layered-unsafe-hd-v3.png",
    "bg-room-layered-solved-hd-v3.png",
    "bg-valve-wall-handleless-v3.png",
    "bg-valve-wall-closeup-v3.png",
    "bg-towel-counter-clean-v3.png",
    "bg-towel-counter-closeup-v3.png",
    "bg-butane-floor-clean-v3.png",
    "bg-butane-floor-closeup-v3.png",
]

for name in FILES:
    source = BACKGROUND_DIR / name
    if not source.exists():
        continue
    image = Image.open(source).convert("RGB")
    image.save(source.with_suffix(".webp"), "WEBP", quality=88, method=6)
