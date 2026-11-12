"""Render the approved social card from an existing credited portfolio photograph.
Requires Pillow, fonttools and brotli. No synthetic imagery or photo retouching.
"""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from PIL import Image, ImageOps, ImageDraw, ImageFont
import tempfile
ROOT = Path(__file__).resolve().parents[1]
font = TTFont(ROOT / 'node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2')
font.flavor = None
font = instantiateVariableFont(font, {'wght': 650})
with tempfile.TemporaryDirectory() as tmp:
    font_path = Path(tmp) / 'manrope.ttf'
    font.save(font_path)
    image = ImageOps.fit(Image.open(ROOT / 'public/media/elewana-suite.webp').convert('RGB'), (1200, 630), centering=(.5, .48))
    draw = ImageDraw.Draw(image)
    face = ImageFont.truetype(str(font_path), 100)
    # Match the site's existing lowercase wordmark and optical spacing.
    label, tracking = 'unmissabl', -4
    width = draw.textlength(label, font=face) + tracking * (len(label) - 1)
    x = (1200 - width) / 2
    for i, char in enumerate(label):
        draw.text((x, 550), char, font=face, fill='white', anchor='ls')
        x += draw.textlength(label[i:i+2], font=face) - draw.textlength(label[i+1:i+2], font=face) + tracking
    target = ROOT / 'public/social/unmissabl-cinematic-v1.jpg'
    target.parent.mkdir(exist_ok=True)
    image.save(target, quality=92, optimize=True, progressive=True)
    print(f'{target}: 1200 × 630, {target.stat().st_size} bytes')
