import re

# 1. Update index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

start_marker = '<div style="display: grid; gap: 16px; margin-top: 24px;">'
end_marker = '</main>'
start_idx = html.find(start_marker)
end_idx = html.find(end_marker)

if start_idx != -1 and end_idx != -1:
    new_grid = '''  <div style="display: grid; gap: 16px; margin-top: 24px;">
    
    <!-- 1. Gather Module Context -->
    <a class="wf-card wf-primary" href="gather-context.html">
      <div class="wf-card-title">Gather Module Context</div>
      <p class="wf-card-desc">Upload references, existing modules, benchmarking inputs, or supporting documents.</p>
      <span class="wf-card-cta">Gather Context →</span>
    </a>

    <!-- 2. Design Module -->
    <a class="wf-card wf-continuation" href="plan-direction.html">
      <div class="wf-card-title">Design Module</div>
      <p class="wf-card-desc">Develop the module direction, outcomes, assessment approach, and learning design.</p>
      <span class="wf-card-cta">Start Designing →</span>
    </a>

    <!-- 3. Plan Teaching & Assessment -->
    <a class="wf-card wf-continuation" href="plan-teaching.html">
      <div class="wf-card-title">Plan Teaching &amp; Assessment</div>
      <p class="wf-card-desc">Plan weekly teaching activities, assessments, OAL/IPL delivery, and learning flow.</p>
      <span class="wf-card-cta">Start Planning →</span>
    </a>

    <!-- 4. Generate Teaching Materials -->
    <a class="wf-card wf-continuation" href="generate-materials.html">
      <div class="wf-card-title">Generate Teaching Materials</div>
      <p class="wf-card-desc">Generate aligned slides, learning activities, quizzes, worksheets, and facilitator resources.</p>
      <span class="wf-card-cta">Generate Materials →</span>
    </a>

    <div class="or-sep" style="display: flex; align-items: center; margin: 16px 0;">
      <div style="flex: 1; height: 1px; background: #e2e8f0;"></div>
      <div style="padding: 0 16px; color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase;">OR</div>
      <div style="flex: 1; height: 1px; background: #e2e8f0;"></div>
    </div>

    <!-- OR Refresh -->
    <a class="wf-card wf-review" href="refresh-align.html">
      <div class="wf-card-title">Refresh Existing Module</div>
      <p class="wf-card-desc">Review and refine an existing module, teaching plan, and materials with AI support.</p>
      <span class="wf-card-cta">Refresh Module →</span>
    </a>

  </div>'''
    html = html[:start_idx] + new_grid + '\n\n  ' + html[end_idx:]
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)

# 2. Update plan-direction.html
with open('plan-direction.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Change page title
html = re.sub(
    r'<h1 class="page-title">.*?</h1>',
    '<h1 class="page-title">Design Module</h1>',
    html,
    count=1
)

html = html.replace('Curriculum Intent', 'Module Direction')
html = html.replace('Design Direction', 'Learning Approach')

with open('plan-direction.html', 'w', encoding='utf-8') as f:
    f.write(html)

print('Success')
