import re

files = ['gather-context.html', 'plan-direction.html', 'plan-teaching.html', 'generate-materials.html', 'refresh-align.html']
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    print(f'=== {f} ===')
    max_var = re.search(r'--max:\s*([^;]+);', content)
    print(f'--max: {max_var.group(1) if max_var else "none"}')
    page_css = re.search(r'\.page\s*\{([^}]+)\}', content)
    print(f'.page: {page_css.group(1).strip() if page_css else "none"}')
    layout_css = re.search(r'\.layout\s*\{([^}]+)\}', content)
    workspace_css = re.search(r'\.workspace\s*\{([^}]+)\}', content)
    if layout_css: print(f'.layout: {layout_css.group(1).strip()}')
    if workspace_css: print(f'.workspace: {workspace_css.group(1).strip()}')
    pad_var = re.search(r'--pad:\s*([^;]+);', content)
    print(f'--pad: {pad_var.group(1) if pad_var else "none"}')
