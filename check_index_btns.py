with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = re.finditer(r'<a[^>]*class="[^"]*btn[^"]*"[^>]*>([\s\S]*?)</a>', text)
for m in matches:
    print(m.group(0).encode('ascii', 'ignore').decode('ascii'))
