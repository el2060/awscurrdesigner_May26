import os, re

files = ['gather-context.html', 'plan-direction.html', 'plan-teaching.html', 'generate-materials.html', 'refresh-align.html']
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # standardize .page padding
    content = re.sub(r'padding:\s*44px\s+var\(--pad\)\s+56px;', 'padding: 44px 40px 56px;', content)
    content = re.sub(r'padding:\s*44px\s+40px\s+56px;', 'padding: 44px 40px 56px;', content)
    
    # remove padding from .topbar
    content = re.sub(r'(\.topbar\s*\{[^}]*)padding:\s*0\s*(?:var\(--pad\)|40px|28px|18px);', r'\1', content)
    
    # add padding to .topbar-inner
    # Find .topbar-inner { ... } and ensure padding: 0 40px;
    def inner_repl(m):
        inner_content = m.group(1)
        # remove existing padding
        inner_content = re.sub(r'padding:\s*0\s*(?:var\(--pad\)|40px|28px|18px);', '', inner_content)
        # add padding
        inner_content += ' padding: 0 40px;'
        return f'.topbar-inner {{{inner_content}}}'
        
    content = re.sub(r'\.topbar-inner\s*\{([^}]+)\}', inner_repl, content)
    
    # Also standardize width: 100% on .page
    def page_repl(m):
        page_content = m.group(1)
        if 'width: 100%;' not in page_content:
            page_content = ' width: 100%;' + page_content
        return f'.page {{{page_content}}}'
        
    content = re.sub(r'\.page\s*\{([^}]+)\}', page_repl, content)
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
