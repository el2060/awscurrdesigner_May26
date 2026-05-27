with open('plan-teaching.html', 'r', encoding='utf-8') as f:
    text = f.read()
import re
match = re.search(r'<meta name="viewport"[^>]*>', text)
print('pt:', match.group(0) if match else 'not found')

with open('plan-direction.html', 'r', encoding='utf-8') as f:
    text = f.read()
match = re.search(r'<meta name="viewport"[^>]*>', text)
print('pd:', match.group(0) if match else 'not found')
