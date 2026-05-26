import glob, re

files = glob.glob('*.html')

BRAND_TAG_CSS = """
    .brand-tag {
      display: inline-block;
      font-size: 10px;
      font-weight: 500;
      font-style: italic;
      color: #5c430c;
      background: #fefce8;
      border: 1px solid #d9bc3c;
      border-radius: 3px;
      padding: 5px 10px;
      letter-spacing: 0;
      line-height: 1.4;
      text-transform: none;
      box-shadow: 0 2px 7px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.06);
      max-width: 220px;
      white-space: normal;
      vertical-align: middle;
    }"""

BRAND_TAG_HTML = """      <span class="brand-tag">NP-refined workflow and UX direction following 15 May discussion with AWS.</span>"""

for f in files:
    if 'backup' in f: continue
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # 1. Replace or insert CSS
    if '.brand-tag {' in content:
        # replace existing
        content = re.sub(r'\s*\.brand-tag\s*\{[^}]+\}(?:\s*\.brand-tag::after\s*\{[^}]+\})?', BRAND_TAG_CSS, content)
    else:
        # insert after .brand-name if possible, else just before </style>
        if '.brand-name {' in content:
            content = re.sub(r'(\.brand-name\s*\{[^}]+\})', r'\1' + BRAND_TAG_CSS, content)
        else:
            content = content.replace('</style>', BRAND_TAG_CSS + '\n  </style>')
    
    # 2. Replace or insert HTML
    # We look for <span class="brand-name">...</span>
    # and either replace the next <span class="brand-tag">...</span> or insert it.
    if '<span class="brand-tag">' in content:
        content = re.sub(r'\s*<span class="brand-tag">.*?</span>', '\n' + BRAND_TAG_HTML, content, flags=re.DOTALL)
    else:
        content = re.sub(r'(<span class="brand-name">.*?</span>)', r'\1\n' + BRAND_TAG_HTML, content)
        
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
