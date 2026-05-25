with open('plan-direction.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()
    for i, line in enumerate(lines):
        if 'var(--max) !important' in line:
            for j in range(max(0, i-5), min(len(lines), i+6)):
                print(f'{j+1}: {lines[j].strip()}')
            break
