import re
for f in ['gather-context.html', 'plan-direction.html', 'plan-teaching.html', 'generate-materials.html', 'refresh-align.html']:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
        mqs = re.finditer(r'@media\s*\([^)]+\)\s*\{([^}]+)\}', content)
        print(f'== {f} ==')
        for mq in mqs:
            mq_text = mq.group(1)
            if '.topbar' in mq_text or '.page' in mq_text:
                print(mq.group(0))
