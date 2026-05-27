with open('plan-teaching.html', 'r', encoding='utf-8') as f:
    text = f.read()
import re
match = re.search(r'<section[^>]*id="start-step-2"[^>]*>([\s\S]*?)</section>', text)
if match:
    print(match.group(0)[:1500])
