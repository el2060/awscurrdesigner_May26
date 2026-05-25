for f in ['plan-direction.html', 'plan-teaching.html', 'generate-materials.html', 'refresh-align.html']:
    with open(f, 'r', encoding='utf-8') as file:
        print(f'== {f} ==')
        for line in file:
            if 'max-width' in line and '.page' not in line:
                print(line.strip())
