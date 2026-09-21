"""Check internal page links, assets and fragment targets before publishing."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote

root = Path(__file__).resolve().parents[1] / 'dist'

class Page(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.path, self.refs, self.ids = path, [], set()
        self.h1s = 0
        self.feed(path.read_text())
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.add(attrs['id'])
        self.h1s += tag == 'h1'
        for key in ['href', 'src']:
            if key in attrs:
                self.refs.append(attrs[key])
        if tag == 'img':
            assert 'alt' in attrs, f'{self.path}: image without alt text'

pages = {p: Page(p) for p in root.glob('*.html')}
count = 0
for path, page in pages.items():
    assert page.h1s == 1, f'{path}: expected one main heading'
    for ref in page.refs:
        parsed = urlsplit(ref)
        if parsed.scheme or parsed.netloc:
            continue
        target = root / unquote(parsed.path).lstrip('/') if parsed.path else path
        if target.is_dir():
            target = target / 'index.html'
        assert target.is_file(), f'{path.name}: missing {ref}'
        if parsed.fragment:
            assert target in pages and parsed.fragment in pages[target].ids, f'{path.name}: missing anchor {ref}'
        count += 1
print(f'PASS: {len(pages)} pages; {count} local links, assets and anchors checked.')
