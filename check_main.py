import re

with open('plan-teaching.html', 'r', encoding='utf-8') as f:
    pt = f.read()

with open('plan-direction.html', 'r', encoding='utf-8') as f:
    pd = f.read()

def get_main(html):
    match = re.search(r'<main class="page">([\s\S]{0,1000})', html)
    return match.group(1) if match else "NOT FOUND"

print('plan-teaching.html main start:')
print(get_main(pt)[:500])
print('\n===================\n')
print('plan-direction.html main start:')
print(get_main(pd)[:500])
