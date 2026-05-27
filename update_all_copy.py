import re

# ==========================================
# 1. Update index.html
# ==========================================
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Card 1
html = html.replace(
    '<div class="opt-card-label">Gather Module Context</div>',
    '<div class="opt-card-label">Gather References &amp; Inputs</div>'
)
html = html.replace(
    '<div class="opt-card-desc">Upload references, existing modules, benchmarking inputs, or supporting documents.</div>',
    '<div class="opt-card-desc">Upload module documents, benchmarking inputs, or supporting materials.</div>'
)

# Card 2
html = html.replace(
    '<div class="wf-card-title">Design Module</div>',
    '<div class="wf-card-title">Design &amp; Review Module</div>'
)
html = html.replace(
    '<p class="wf-card-desc">Develop the module direction, outcomes, assessment approach, and learning design.</p>',
    '<p class="wf-card-desc">Develop or refine module outcomes, assessments, teaching approach, and learning design.</p>'
)
html = html.replace(
    '<span class="wf-card-cta">Start Designing →</span>',
    '<span class="wf-card-cta">Open Module Design →</span>'
)

# Card 3
# Title is already Plan Teaching & Assessment
html = html.replace(
    '<span class="wf-card-cta">Start Planning →</span>',
    '<span class="wf-card-cta">Open Teaching Plan →</span>'
)

# Card 4
# Title is already Generate Teaching Materials
html = html.replace(
    '<p class="wf-card-desc">Generate aligned slides, learning activities, quizzes, worksheets, and facilitator resources.</p>',
    '<p class="wf-card-desc">Generate e-lecture slides, quizzes, worksheets, learning activities, and supporting resources.</p>'
)

# Card 5
# Title is already Refresh Existing Module
html = html.replace(
    '<p class="wf-card-desc">Review and refine an existing module, teaching plan, and materials with AI support.</p>',
    '<p class="wf-card-desc">Review and update an existing module, teaching plan, or teaching materials with AI support.</p>'
)

# Flow Connectors
html = html.replace(
    '<span class="flow-label">Builds on approved curriculum direction and reviewed context</span>',
    '<span class="flow-label">Reuse connected module inputs</span>'
)
html = html.replace(
    '<span class="flow-label">Uses approved teaching schedule and assessment structure</span>',
    '<span class="flow-label">Uses connected teaching and assessment context</span>'
)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)


# ==========================================
# Reusable function for the 3 subpages
# ==========================================
def update_subpage(filename, eyebrow, title, options):
    with open(filename, 'r', encoding='utf-8') as f:
        html = f.read()

    # Title & Eyebrow
    html = re.sub(
        r'<div class="page-eyebrow">.*?</div>',
        f'<div class="page-eyebrow">{eyebrow}</div>',
        html,
        count=1
    )
    html = re.sub(
        r'<h1 class="page-title">.*?</h1>',
        f'<h1 class="page-title">{title}</h1>',
        html,
        count=1
    )

    # Re-generate the options grid
    options_html = '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px;">\n'
    for i, opt in enumerate(options):
        checked = ' checked' if i == 0 else ''
        onchange = ' onchange="updateStartMode()"' if filename == 'generate-materials.html' else ''
        options_html += f'''      <label style="position: relative;">
        <input type="radio" name="start_mode" class="start-radio" value="opt{i}"{checked}{onchange}>
        <div class="so-card">
          <div class="so-title">{opt['title']}</div>
          <div class="so-desc">{opt['desc']}</div>
        </div>
      </label>\n'''
    options_html += '    </div>'

    html = re.sub(
        r'<div style="display: grid; grid-template-columns: repeat\(auto-fit, minmax\(240px, 1fr\)\); gap: 16px;">.*?</label>\s*</div>',
        options_html.strip(),
        html,
        flags=re.DOTALL
    )

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(html)


# ==========================================
# 2. plan-direction.html
# ==========================================
update_subpage(
    'plan-direction.html',
    'Module Design',
    'Design &amp; Review Module',
    [
        {'title': 'Continue from Context Review', 'desc': 'Continue with the insights, benchmarking inputs, and recommendations gathered earlier.'},
        {'title': 'Upload Existing Module Documents', 'desc': 'Upload a syllabus, module descriptor, course brief, or planning documents to guide the draft.'},
        {'title': 'Start a New Draft', 'desc': 'Start from a blank workspace and build the module progressively.'}
    ]
)

# ==========================================
# 3. plan-teaching.html
# ==========================================
update_subpage(
    'plan-teaching.html',
    'Teaching Plan',
    'Plan Teaching &amp; Assessment',
    [
        {'title': 'Continue from Module Design', 'desc': 'Use the module outcomes, assessment approach, and learning design already developed.'},
        {'title': 'Upload Existing Teaching &amp; Assessment Documents', 'desc': 'Upload teaching plans, assessment briefs, schedules, or related planning documents to guide the process.'},
        {'title': 'Start a New Plan', 'desc': 'Start from a blank workspace and develop the teaching and assessment plan progressively.'}
    ]
)

# ==========================================
# 4. generate-materials.html
# ==========================================
update_subpage(
    'generate-materials.html',
    'Material Generation',
    'Generate Teaching Materials',
    [
        {'title': 'Continue from Teaching Plan', 'desc': 'Generate materials aligned to the weekly teaching and assessment plan.'},
        {'title': 'Refresh Existing Materials', 'desc': 'Upload slides, notes, worksheets, or previous semester materials to refresh and update them.'},
        {'title': 'Create New Materials', 'desc': 'Quickly generate e-lecture slides, quizzes, worksheets, learning activities, and supporting teaching resources.'}
    ]
)

print('Success')
