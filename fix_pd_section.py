with open('plan-direction.html', 'r', encoding='utf-8') as f:
    text = f.read()

target = '<p class="page-sub" style="margin-bottom: 20px;">Use connected inputs, upload your own documents, or start from scratch.</p>'
replacement = target + '\n  </section>'

if target in text:
    text = text.replace(target, replacement)
    
    # We also need to remove the </section> that I added previously at line 3782
    # Because now the setup cards are direct children of main.page!
    text = text.replace('  </section> <!-- I ADDED THIS -->\n', '')
    
    with open('plan-direction.html', 'w', encoding='utf-8') as f:
        f.write(text)
    print("Fixed plan-direction.html section structure")
else:
    print("Target not found")
