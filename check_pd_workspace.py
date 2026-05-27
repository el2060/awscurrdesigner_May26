with open('plan-direction.html', 'r', encoding='utf-8') as f:
    text = f.read()
import re
match = re.search(r'<section class="workspace"[^>]*>', text)
print(match.group(0) if match else 'Not found')
