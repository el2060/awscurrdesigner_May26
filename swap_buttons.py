import glob

files = glob.glob('c:/Users/limee/OneDrive/Desktop/AWS Curr builder mockup/*.html')
old_str = '''<button class="mdd-hf-btn" type="button">Refine with AI</button>
                    <button class="mdd-hf-btn mdd-hf-btn-edit" type="button">✎ Edit section</button>'''

new_str = '''<button class="mdd-hf-btn mdd-hf-btn-edit" type="button">✎ Edit</button>
                    <button class="mdd-hf-btn" type="button">✦ Refine with AI</button>'''

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    if old_str in content:
        content = content.replace(old_str, new_str)
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f"Updated {f}")
