import re

# 1. Update plan-direction.html
with open('plan-direction.html', 'r', encoding='utf-8') as f:
    html = f.read()

options_pd = '''
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px;">
      <label style="position: relative;">
        <input type="radio" name="start_mode" class="start-radio" value="opt0" checked>
        <div class="so-card">
          <div class="so-title">Continue from Context Analysis</div>
          <div class="so-desc">Auto-import the insights and benchmarks we just gathered.</div>
        </div>
      </label>
      <label style="position: relative;">
        <input type="radio" name="start_mode" class="start-radio" value="opt1" >
        <div class="so-card">
          <div class="so-title">Upload a Syllabus or Brief</div>
          <div class="so-desc">Upload an existing syllabus or management brief to extract and refine outcomes.</div>
        </div>
      </label>
      <label style="position: relative;">
        <input type="radio" name="start_mode" class="start-radio" value="opt2" >
        <div class="so-card">
          <div class="so-title">Draft from Scratch</div>
          <div class="so-desc">Start with a blank canvas and let AI guide you through drafting new outcomes.</div>
        </div>
      </label>
    </div>
'''

html = re.sub(
    r'<div style="display: grid; grid-template-columns: repeat\(auto-fit, minmax\(240px, 1fr\)\); gap: 16px;">.*?</label>\s*</div>',
    options_pd.strip(),
    html,
    flags=re.DOTALL
)
with open('plan-direction.html', 'w', encoding='utf-8') as f:
    f.write(html)

# 2. Update plan-teaching.html
with open('plan-teaching.html', 'r', encoding='utf-8') as f:
    html = f.read()

options_pt = '''
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px;">
      <label style="position: relative;">
        <input type="radio" name="start_mode" class="start-radio" value="opt0" checked>
        <div class="so-card">
          <div class="so-title">Continue from Module Structure</div>
          <div class="so-desc">Auto-import the learning outcomes and assessments we just designed.</div>
        </div>
      </label>
      <label style="position: relative;">
        <input type="radio" name="start_mode" class="start-radio" value="opt1" >
        <div class="so-card">
          <div class="so-title">Upload an Existing MDD</div>
          <div class="so-desc">Upload an approved, offline Module Design Document to generate a weekly schedule.</div>
        </div>
      </label>
      <label style="position: relative;">
        <input type="radio" name="start_mode" class="start-radio" value="opt2" >
        <div class="so-card">
          <div class="so-title">Draft from Scratch</div>
          <div class="so-desc">Start with a blank 15-week template and build your schedule manually or with AI.</div>
        </div>
      </label>
    </div>
'''

html = re.sub(
    r'<div style="display: grid; grid-template-columns: repeat\(auto-fit, minmax\(240px, 1fr\)\); gap: 16px;">.*?</label>\s*</div>',
    options_pt.strip(),
    html,
    flags=re.DOTALL
)
with open('plan-teaching.html', 'w', encoding='utf-8') as f:
    f.write(html)


# 3. Update generate-materials.html
with open('generate-materials.html', 'r', encoding='utf-8') as f:
    html = f.read()

options_gm = '''
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px;">
      <label style="position: relative;">
        <input type="radio" name="start_mode" class="start-radio" value="opt0" checked onchange="updateStartMode()">
        <div class="so-card">
          <div class="so-title">Continue from Teaching Schedule</div>
          <div class="so-desc">Generate materials aligned directly to the weekly plan we just created.</div>
        </div>
      </label>
      <label style="position: relative;">
        <input type="radio" name="start_mode" class="start-radio" value="opt1" onchange="updateStartMode()">
        <div class="so-card">
          <div class="so-title">Refresh Last Semester's Materials</div>
          <div class="so-desc">Upload old slides, notes, or an offline syllabus to modernize and update them.</div>
        </div>
      </label>
      <label style="position: relative;">
        <input type="radio" name="start_mode" class="start-radio" value="opt2" onchange="updateStartMode()">
        <div class="so-card">
          <div class="so-title">Create Standalone Material</div>
          <div class="so-desc">Quickly generate a one-off quiz or activity from a simple text prompt.</div>
        </div>
      </label>
    </div>
'''

html = re.sub(
    r'<div style="display: grid; grid-template-columns: repeat\(auto-fit, minmax\(240px, 1fr\)\); gap: 16px;">.*?</label>\s*</div>',
    options_gm.strip(),
    html,
    flags=re.DOTALL
)
with open('generate-materials.html', 'w', encoding='utf-8') as f:
    f.write(html)

print('Success')
