with open('plan-direction.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()
for i in range(3165, 3215):
    if '<section' in lines[i] or '</section>' in lines[i] or 'class="workspace"' in lines[i]:
        print(i, lines[i].strip())
