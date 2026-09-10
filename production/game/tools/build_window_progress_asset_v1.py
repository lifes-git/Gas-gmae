from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[3]
PROPS = ROOT / "webgame-prototype/assets/common/props"
SOURCE = PROPS / "prop-window-casement-wall-perspective-open-v4.png"
OUTPUT = PROPS / "progress-window-open-v1.png"


window = Image.open(SOURCE).convert("RGBA")
window.thumbnail((190, 216), Image.Resampling.LANCZOS)
progress = Image.new("RGBA", (256, 256), (0, 0, 0, 0))
progress.alpha_composite(window, ((256 - window.width) // 2, (256 - window.height) // 2))
progress.save(OUTPUT, optimize=True)
print(f"saved {OUTPUT} ({progress.width}x{progress.height})")
