with open('gather-context.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('class="analysis-inline hidden"', 'class="analysis-inline"')

with open('gather-context.html', 'w', encoding='utf-8') as f:
    f.write(content)
print('Removed hidden class from gather-context.html analysis-inline section')
