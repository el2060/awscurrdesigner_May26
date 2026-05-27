with open('plan-direction.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
match = re.search(r'<main class="page">([\s\S]*?)</main>', text)
if match:
    main_content = match.group(1)
    depth = 0
    import html.parser
    class P(html.parser.HTMLParser):
        def handle_starttag(self, tag, attrs):
            global depth
            if tag in ['section', 'div'] and depth < 3:
                attr_str = ' '.join([f'{k}="{v}"' for k,v in attrs if k=='class'])
                print('  ' * depth + f'<{tag} {attr_str}>')
            if tag not in ['img', 'br', 'hr', 'input', 'meta', 'link']:
                depth += 1
        def handle_endtag(self, tag):
            global depth
            if tag not in ['img', 'br', 'hr', 'input', 'meta', 'link']:
                depth -= 1
    P().feed(main_content)
