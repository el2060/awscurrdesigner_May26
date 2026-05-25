import os, re
files = ['gather-context.html', 'plan-direction.html', 'plan-teaching.html', 'generate-materials.html', 'refresh-align.html']
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    print(f'\n--- {f} ---')
    matches = re.findall(r'<div class="next-step-card".*?</div>\s*</div>', content, re.DOTALL)
    if matches:
        print(matches[0][:500])
