import re

html_file = r'c:\Users\limee\OneDrive\Desktop\AWS Curr builder mockup\plan-direction.html'
with open(html_file, 'r', encoding='utf-8') as f:
    content = f.read()

def replace_td(match):
    td_tag = match.group(0)
    if 'contenteditable' not in td_tag:
        # replace the first '<td' with '<td contenteditable="true"'
        return td_tag.replace('<td', '<td contenteditable="true"', 1)
    return td_tag

new_content = re.sub(r'<td[^>]*>', replace_td, content)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(new_content)
