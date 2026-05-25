import os
for f in ['gather-context.html', 'plan-direction.html', 'plan-teaching.html', 'generate-materials.html', 'refresh-align.html']:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
        import re
        mq = re.search(r'@media\s*\(max-width:\s*1280px\)\s*\{([^}]+)\}', content)
        if mq:
            print(f'{f}: {mq.group(1).strip()}')
