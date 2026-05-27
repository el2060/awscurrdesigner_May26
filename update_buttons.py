import re

# 1. Update gather-context.html
with open('gather-context.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = html.replace('Continue to Module Direction →', 'Continue to Module Design →')

with open('gather-context.html', 'w', encoding='utf-8') as f:
    f.write(html)

# 2. Update plan-direction.html
with open('plan-direction.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = html.replace('Continue to TA Planning', 'Continue to Teaching Plan')
html = html.replace('Start Designing →', 'Start Module Design →')

with open('plan-direction.html', 'w', encoding='utf-8') as f:
    f.write(html)

# 3. Update plan-teaching.html
with open('plan-teaching.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = html.replace('Continue to Material Generation', 'Continue to Generate Materials')
html = html.replace('Start Planning →', 'Start Teaching Plan →')

with open('plan-teaching.html', 'w', encoding='utf-8') as f:
    f.write(html)

# 4. Update generate-materials.html
with open('generate-materials.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = html.replace('Start Generating →', 'Generate Materials →')

with open('generate-materials.html', 'w', encoding='utf-8') as f:
    f.write(html)

print('Success')
