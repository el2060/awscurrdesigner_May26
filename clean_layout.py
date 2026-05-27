import glob

for file in glob.glob('*.html'):
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove any rogue max-width or margin from .setup-card { ... }
    # Look for .setup-card { max-width: 960px;
    content = content.replace('.setup-card { max-width: 960px;', '.setup-card {')
    content = content.replace('.setup-card { max-width: 960px;\n', '.setup-card {\n')
    content = content.replace('.setup-card { max-width: 800px;', '.setup-card {')
    content = content.replace('.setup-card { max-width: 900px; margin: 0 auto;', '.setup-card {')
    
    if file == 'index.html':
        content = content.replace('max-width: 900px;', 'max-width: 800px;')
        content = content.replace('<div style="margin-bottom: 40px;">', '<div style="text-align: center; margin-bottom: 40px;">')

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print('Cleaned up all setup-card constraints and restored index.html to 800px centered.')
