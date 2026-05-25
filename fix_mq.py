import os, re

files = ['gather-context.html', 'plan-direction.html', 'plan-teaching.html', 'generate-materials.html', 'refresh-align.html']
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Let's fix .topbar-inner padding in media queries
    # First, let's remove any empty .topbar {} blocks
    content = re.sub(r'\.topbar\s*\{\s*\}', '', content)
    
    # 1280px media query
    def mq_1280(m):
        block = m.group(1)
        if '.topbar-inner' not in block:
            block += '\n      .topbar-inner { padding: 0 28px !important; }'
        if '.page {' not in block:
            block += '\n      .page { padding: 40px 28px !important; }'
        return f'@media (max-width: 1280px) {{{block}}}'
    
    content = re.sub(r'@media\s*\(max-width:\s*1280px\)\s*\{([^}]+)\}', mq_1280, content)
    
    # 1080px media query (gather-context, generate-materials, refresh-align have this)
    def mq_1080(m):
        block = m.group(1)
        return f'@media (max-width: 1080px) {{{block}}}'
    content = re.sub(r'@media\s*\(max-width:\s*1080px\)\s*\{([^}]+)\}', mq_1080, content)
    
    # 900px media query
    def mq_900(m):
        block = m.group(1)
        if '.topbar-inner' not in block:
            block += '\n      .topbar-inner { padding: 0 18px !important; }'
        if '.page {' not in block:
            block += '\n      .page { padding: 32px 18px !important; }'
        return f'@media (max-width: 900px) {{{block}}}'
        
    content = re.sub(r'@media\s*\(max-width:\s*900px\)\s*\{([^}]+)\}', mq_900, content)
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
