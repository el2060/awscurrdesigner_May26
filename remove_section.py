with open(r'c:\Users\limee\OneDrive\Desktop\AWS Curr builder mockup\plan-direction.html', 'r', encoding='utf-8') as f:
    content = f.read()

start_tag = '<section class="setup-card analysis-setup" aria-label="Connected context layer">'
end_tag = '</details>\n    </section>'

start_idx = content.find(start_tag)
if start_idx != -1:
    end_idx = content.find(end_tag, start_idx)
    if end_idx != -1:
        new_content = content[:start_idx] + content[end_idx + len(end_tag):]
        with open(r'c:\Users\limee\OneDrive\Desktop\AWS Curr builder mockup\plan-direction.html', 'w', encoding='utf-8') as f:
            f.write(new_content)
        print('Successfully removed the section')
    else:
        print('End tag not found')
else:
    print('Start tag not found')
