import os
for f in ['gather-context.html', 'plan-direction.html', 'plan-teaching.html', 'generate-materials.html', 'refresh-align.html']:
    with open(f, 'r', encoding='utf-8') as file:
        lines = file.readlines()
        for i, line in enumerate(lines):
            if '.page {' in line or '.page' in line and '{' in line:
                print(f'{f}: {line.strip()}')
                break
