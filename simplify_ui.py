import re

html_file = r'c:\Users\limee\OneDrive\Desktop\AWS Curr builder mockup\plan-direction.html'
with open(html_file, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove the `<details class="ctx-applied-panel">...</details>` block
content = re.sub(r'<details class="ctx-applied-panel">.*?</details>\s*<section class="workspace"', '<section class="workspace"', content, flags=re.DOTALL)

# 2. Modify `renderWelcomeThread` to remove noise
# We want to remove the `ai-signals-block` completely
content = re.sub(r'// AI Design Signals block.*?threadCanvas\.appendChild\(signalsBlock\);', '', content, flags=re.DOTALL)

# Remove `next-step-card` (loadCard)
content = re.sub(r'const loadCard = document\.createElement\("div"\);.*?threadCanvas\.appendChild\(loadCard\);', '', content, flags=re.DOTALL)

# Remove `ai-rec-move` (recMove)
content = re.sub(r'const recMove = document\.createElement\("div"\);.*?threadCanvas\.appendChild\(recMove\);', '', content, flags=re.DOTALL)

# Remove choiceCard
content = re.sub(r'const choiceCard = document\.createElement\("div"\);.*?threadCanvas\.appendChild\(choiceCard\);', '', content, flags=re.DOTALL)

# Remove progressCard
content = re.sub(r'// Proactive: point to learning outcomes as next step.*?threadCanvas\.appendChild\(progressCard\);', '', content, flags=re.DOTALL)

# Simplify CSS? We can leave CSS, but it won't be used.

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(content)
