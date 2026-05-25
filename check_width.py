import os, re
files = ['gather-context.html', 'plan-direction.html', 'plan-teaching.html', 'generate-materials.html', 'refresh-align.html']
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    print(f'--- {f} ---')
    max_val = re.search(r'--max:\s*([^;]+);', content)
    print(f'max: {max_val.group(1) if max_val else "None"}')
    
    page = re.search(r'\.page\s*\{([^}]+)\}', content)
    print(f'.page: {page.group(1).strip() if page else "None"}')
    
    topbar_inner = re.search(r'\.topbar-inner\s*\{([^}]+)\}', content)
    print(f'.topbar-inner: {topbar_inner.group(1).strip() if topbar_inner else "None"}')
