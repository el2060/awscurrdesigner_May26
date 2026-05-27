import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Gather Context
html = html.replace(
    '<div class="opt-card-desc">Upload references, existing modules, benchmarking inputs, or supporting materials.</div>',
    '<div class="opt-card-desc">Upload references, existing modules, benchmarking inputs, or supporting documents.</div>'
)
html = html.replace(
    '<a class="opt-card-cta" href="gather-context.html">Start Gathering Context →</a>',
    '<a class="opt-card-cta" href="gather-context.html">Gather Context →</a>'
)

# 2. Design Module
html = html.replace(
    '<div class="wf-card-title">Design Module Structure &amp; Outcomes</div>',
    '<div class="wf-card-title">Design Module</div>'
)
html = html.replace(
    '<p class="wf-card-desc">Create or refine module outcomes, assessment structure, graduate skills mapping, and teaching strategies.</p>',
    '<p class="wf-card-desc">Develop the module direction, outcomes, assessment approach, and learning design.</p>'
)
html = html.replace(
    '<span class="wf-card-cta">Start Module Design →</span>',
    '<span class="wf-card-cta">Start Designing →</span>'
)

# 3. Plan Teaching
html = html.replace(
    '<div class="wf-card-title">Plan Teaching Schedule</div>',
    '<div class="wf-card-title">Plan Teaching &amp; Assessment</div>'
)
html = html.replace(
    '<p class="wf-card-desc">Plan weekly teaching activities, assessments, OAL/IPL delivery, and learning strategies.</p>',
    '<p class="wf-card-desc">Plan weekly teaching activities, assessments, OAL/IPL delivery, and learning flow.</p>'
)
html = html.replace(
    '<span class="wf-card-cta">Start Teaching Plan →</span>',
    '<span class="wf-card-cta">Start Planning →</span>'
)

# 4. Generate Materials
# Title is already Generate Teaching Materials
html = html.replace(
    '<p class="wf-card-desc">Generate aligned OAL materials, IPL activities, quizzes, and facilitator resources.</p>',
    '<p class="wf-card-desc">Generate aligned slides, learning activities, quizzes, worksheets, and facilitator resources.</p>'
)
# CTA is already Generate Materials ->

# 5. Refresh
html = html.replace(
    '<div class="wf-card-title">Refresh an Existing Module</div>',
    '<div class="wf-card-title">Refresh Existing Module</div>'
)
html = html.replace(
    '<p class="wf-card-desc">Review and refine an existing module design, assessment, and teaching plan with AI support.</p>',
    '<p class="wf-card-desc">Review and refine an existing module, teaching plan, and materials with AI support.</p>'
)
html = html.replace(
    '<span class="wf-card-cta">Start Module Refresh →</span>',
    '<span class="wf-card-cta">Refresh Module →</span>'
)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print('Success')
