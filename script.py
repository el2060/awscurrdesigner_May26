import re

# 1. Update index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace everything from <hr class="wf-rule"> to </main>
start_marker = '<hr class="wf-rule">'
end_marker = '</main>'
start_idx = html.find(start_marker)
end_idx = html.find(end_marker)

if start_idx != -1 and end_idx != -1:
    new_cards = '''
  <div style="display: grid; gap: 16px; margin-top: 24px;">
    
    <!-- Pillar 1 -->
    <a class="wf-card wf-primary" href="plan-direction.html">
      <div class="wf-card-title">Design Module Structure</div>
      <p class="wf-card-desc">Create a new module from scratch, define learning outcomes, and structure assessments.</p>
      <span class="wf-card-cta">Start Module Design →</span>
    </a>

    <!-- Pillar 2 -->
    <a class="wf-card wf-continuation" href="plan-teaching.html">
      <div class="wf-card-title">Plan Teaching Schedule</div>
      <p class="wf-card-desc">Draft or update your weekly teaching activities and delivery format.</p>
      <span class="wf-card-cta">Plan Teaching →</span>
    </a>

    <!-- Pillar 3 -->
    <a class="wf-card wf-continuation" href="generate-materials.html">
      <div class="wf-card-title">Generate Teaching Materials</div>
      <p class="wf-card-desc">Create new slides and quizzes, or upload existing materials to refresh them for the new semester.</p>
      <span class="wf-card-cta">Generate Materials →</span>
    </a>

    <!-- Pillar 4 -->
    <a class="wf-card wf-review" href="refresh-align.html">
      <div class="wf-card-title">Module Health Check &amp; Alignment</div>
      <p class="wf-card-desc">Deep review of an existing syllabus for workload balance and curriculum alignment.</p>
      <span class="wf-card-cta">Start Health Check →</span>
    </a>

  </div>
'''
    html = html[:start_idx] + new_cards + '\n  ' + html[end_idx:]
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)

# 2. Update plan-teaching.html
with open('plan-teaching.html', 'r', encoding='utf-8') as f:
    html = f.read()

options = '''
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px;">
      <label style="position: relative;">
        <input type="radio" name="start_mode" class="start-radio" value="opt0" checked>
        <div class="so-card">
          <div class="so-title">Import Approved MDD</div>
          <div class="so-desc">Upload your existing Module Design Document to auto-generate a schedule</div>
        </div>
      </label>
      <label style="position: relative;">
        <input type="radio" name="start_mode" class="start-radio" value="opt1" >
        <div class="so-card">
          <div class="so-title">Continue from Module Design</div>
          <div class="so-desc">Auto-import the outcomes and structure we just created</div>
        </div>
      </label>
      <label style="position: relative;">
        <input type="radio" name="start_mode" class="start-radio" value="opt2" >
        <div class="so-card">
          <div class="so-title">Start from Scratch</div>
          <div class="so-desc">Draft a weekly teaching plan manually or with AI</div>
        </div>
      </label>
    </div>
'''

html = re.sub(
    r'<div style="display: grid; grid-template-columns: repeat\(auto-fit, minmax\(240px, 1fr\)\); gap: 16px;">.*?</label>\s*</div>',
    options.strip(),
    html,
    flags=re.DOTALL
)
with open('plan-teaching.html', 'w', encoding='utf-8') as f:
    f.write(html)


# 3. Update generate-materials.html
with open('generate-materials.html', 'r', encoding='utf-8') as f:
    html = f.read()

options_gen = '''
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px;">
      <label style="position: relative;">
        <input type="radio" name="start_mode" class="start-radio" value="opt0" checked onchange="updateStartMode()">
        <div class="so-card">
          <div class="so-title">Continue from Teaching Plan</div>
          <div class="so-desc">Generate materials aligned directly to your approved weekly plan</div>
        </div>
      </label>
      <label style="position: relative;">
        <input type="radio" name="start_mode" class="start-radio" value="opt1" onchange="updateStartMode()">
        <div class="so-card">
          <div class="so-title">Refresh Existing Materials</div>
          <div class="so-desc">Upload last semester\\'s slides or notes to modernize and update content</div>
        </div>
      </label>
      <label style="position: relative;">
        <input type="radio" name="start_mode" class="start-radio" value="opt2" onchange="updateStartMode()">
        <div class="so-card">
          <div class="so-title">From External Documents</div>
          <div class="so-desc">Upload an offline teaching schedule or brief to generate aligned materials</div>
        </div>
      </label>
      <label style="position: relative;">
        <input type="radio" name="start_mode" class="start-radio" value="opt3" onchange="updateStartMode()">
        <div class="so-card">
          <div class="so-title">Create Standalone Material</div>
          <div class="so-desc">Quickly generate a one-off quiz or activity from a simple prompt</div>
        </div>
      </label>
    </div>
'''

html = re.sub(
    r'<div style="display: grid; grid-template-columns: repeat\(auto-fit, minmax\(240px, 1fr\)\); gap: 16px;">.*?</label>\s*</div>',
    options_gen.strip(),
    html,
    flags=re.DOTALL
)
with open('generate-materials.html', 'w', encoding='utf-8') as f:
    f.write(html)

# 4. Update refresh-align.html
with open('refresh-align.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = html.replace('Module Review &amp; Refresh', 'Module Health Check &amp; Alignment')
html = html.replace('Module Review & Refresh', 'Module Health Check & Alignment')
html = html.replace('PATH B — Module Review and Refresh', 'PATH B — Module Health Check')
html = html.replace('<div class="page-eyebrow">Module Review</div>', '<div class="page-eyebrow">Module Audit</div>')
html = html.replace('<h1 class="page-title">Review &amp; Refresh</h1>', '<h1 class="page-title">Health Check &amp; Alignment</h1>')
html = html.replace('<h1 class="page-title">Review & Refresh</h1>', '<h1 class="page-title">Health Check & Alignment</h1>')
with open('refresh-align.html', 'w', encoding='utf-8') as f:
    f.write(html)

print('Success')
