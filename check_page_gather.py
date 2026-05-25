import re
with open('gather-context.html', 'r', encoding='utf-8') as f:
    text = f.read()
    match = re.search(r'\.page\s*\{[^}]*\}', text)
    if match:
        print(match.group(0))
