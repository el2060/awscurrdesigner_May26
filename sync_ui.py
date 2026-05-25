import os, re

files = ['gather-context.html', 'plan-direction.html', 'plan-teaching.html', 'generate-materials.html', 'refresh-align.html']
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # standardize widths
    content = re.sub(r'288px', '280px', content)
    
    # standardize gap inside .layout and .workspace
    def gap_repl(m):
        block = m.group(1)
        block = re.sub(r'gap:\s*24px;', 'gap: 32px;', block)
        return block
    
    content = re.sub(r'(\.layout\s*\{[^}]+\})', gap_repl, content)
    content = re.sub(r'(\.workspace\s*\{[^}]+\})', gap_repl, content)
    
    # gather-context terminology
    if f == 'gather-context.html':
        content = content.replace('Continue to Module Design', 'Continue to Module Direction')
    
    # plan-teaching terminologies
    if f == 'plan-teaching.html':
        content = content.replace('Continue From Module Design Direction', 'Continue From Module Direction')
        
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
