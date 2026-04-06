from PIL import Image
from pathlib import Path
import sys

src = Path('SIMOCASINOphoto/splitNOBG')
frames = []
for path in sorted(src.glob('split1-*.png')):
    im = Image.open(path).convert('RGBA')
    frames.append(im)

if not frames:
    print('NO_FRAMES')
    sys.exit(1)

out_dir = Path('public/images')
out_dir.mkdir(parents=True, exist_ok=True)
out_path = out_dir / 'trust-info-bg.gif'
frames[0].save(
    out_path,
    save_all=True,
    append_images=frames[1:],
    optimize=False,
    duration=300,
    loop=0,
    disposal=2,
)
print('CREATED', out_path)
