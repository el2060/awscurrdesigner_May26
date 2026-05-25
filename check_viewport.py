import re
for f in ['gather-context.html', 'plan-direction.html', 'plan-teaching.html', 'generate-materials.html', 'refresh-align.html']:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
        viewport = re.search(r'<meta name="viewport"[^>]*>', content)
        if viewport:
            print(f'{f}: {viewport.group(0)}')
        else:
            print(f'{f}: NO VIEWPORT META TAG')
