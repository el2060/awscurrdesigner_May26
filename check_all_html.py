import glob
from html.parser import HTMLParser

class MyHTMLParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack = []
        self.errors = []
    def handle_starttag(self, tag, attrs):
        if tag not in ['meta', 'link', 'img', 'br', 'hr', 'input']:
            self.stack.append((tag, self.getpos()))
    def handle_endtag(self, tag):
        if tag not in ['meta', 'link', 'img', 'br', 'hr', 'input']:
            if not self.stack:
                self.errors.append(f'Extra closing </{tag}> at {self.getpos()}')
                return
            last_tag, pos = self.stack.pop()
            if last_tag != tag:
                self.errors.append(f'Mismatched </{tag}> at {self.getpos()}. Expected </{last_tag}> from {pos}')

for file in glob.glob('*.html'):
    if 'backup' in file: continue # Skip backups
    p = MyHTMLParser()
    with open(file, 'r', encoding='utf-8') as f:
        p.feed(f.read())
    
    if p.errors or p.stack:
        print(f'\\n[!] Errors in {file}:')
        for e in p.errors:
            print('  - ' + str(e))
        if p.stack:
            print('  - Unclosed tags: ' + str(p.stack))
    else:
        print(f'[+] {file} is clean.')
