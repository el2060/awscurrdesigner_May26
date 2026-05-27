import glob

# 1. Restore index.html to be centered but with a reasonable width like 900px
with open('index.html', 'r', encoding='utf-8') as f:
    idx = f.read()

idx = idx.replace('max-width: 1200px;', 'max-width: 900px;')
idx = idx.replace('<div style="margin-bottom: 40px;">', '<div style="text-align: center; margin-bottom: 40px;">')
# Re-center the cards by making sure they have margin: 0 auto if they have a max-width
idx = idx.replace('.setup-card { max-width: 800px;', '.setup-card {')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(idx)

# 2. Restore .setup-card in all other files to 100% width (remove max-width: 800px)
for file in glob.glob('*.html'):
    if file == 'index.html': continue
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if '.setup-card { max-width: 800px;' in content:
        content = content.replace('.setup-card { max-width: 800px;', '.setup-card {')
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
