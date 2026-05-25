import re

html_file = r'c:\Users\limee\OneDrive\Desktop\AWS Curr builder mockup\plan-direction.html'
with open(html_file, 'r', encoding='utf-8') as f:
    content = f.read()

pattern = re.compile(r'[ \t]*<div class="mdd-inline-actions">.*?</div>', re.DOTALL)
matches = pattern.findall(content)
print(f'Found {len(matches)} matches')

replacement = '''                <div class="mdd-hybrid-footer">
                  <div class="mdd-hf-status">✦ AI-assisted draft</div>
                  <div class="mdd-hf-actions">
                    <button class="mdd-hf-btn" type="button">Refine with AI</button>
                    <button class="mdd-hf-btn mdd-hf-btn-edit" type="button">✎ Edit section</button>
                  </div>
                </div>'''

new_content = pattern.sub(replacement, content)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(new_content)
