import re
import os

files = ['plan-direction.html', 'plan-teaching.html', 'generate-materials.html']

def update_file(filename, eyebrow, title, sub, question, options):
    with open(filename, 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Replace eyebrow, title, sub
    # In some files they might be wrapped in <section>, others just direct in <main>
    # We can just target the individual tags
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
    # The subtitle might have a style attribute
    html = re.sub(
        r'<p class="page-sub"([^>]*)>.*?</p>',
        f'<p class="page-sub"\\1>{sub}</p>',
        html,
        count=1
    )
    # If page-sub doesn't match above because it lacks attributes or format is slightly different
    html = re.sub(
        r'<p class="page-sub">.*?</p>',
        f'<p class="page-sub">{sub}</p>',
        html,
        count=1
    )

    # 2. Replace the question
    html = re.sub(
        r'<h2([^>]*)>How do you want to start\?</h2>',
        f'<h2\\1>{question}</h2>',
        html
    )

    # 3. Replace the options grid
    options_html = '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px;">\n'
    for i, opt in enumerate(options):
        # Determine value (opt0, opt1, opt2) and checked state
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

# DATA
data = {
    'plan-direction.html': {
        'eyebrow': 'Module Design',
        'title': 'Design Module Direction &amp; Outcomes',
        'sub': 'Use connected inputs, upload your own documents, or start from scratch.',
        'question': 'How would you like to begin?',
        'options': [
            {'title': 'Continue from Context Review', 'desc': 'Continue with the insights, benchmarking inputs, and recommendations gathered earlier.'},
            {'title': 'Upload Existing Module Materials', 'desc': 'Upload a syllabus, module descriptor, course brief, or planning documents to guide the draft.'},
            {'title': 'Start a New Draft', 'desc': 'Start from a blank workspace and develop the module progressively with AI support.'}
        ]
    },
    'plan-teaching.html': {
        'eyebrow': 'Teaching Plan',
        'title': 'Plan Teaching &amp; Assessment',
        'sub': 'Use connected inputs, upload your own documents, or start from scratch.',
        'question': 'How would you like to begin?',
        'options': [
            {'title': 'Continue from Module Design', 'desc': 'Use the module outcomes, learning direction, and curriculum decisions already developed.'},
            {'title': 'Upload Existing Teaching Materials', 'desc': 'Upload teaching plans, assessment briefs, schedules, or related documents to guide the planning process.'},
            {'title': 'Start a New Plan', 'desc': 'Start from a blank workspace and develop the teaching and assessment plan progressively.'}
        ]
    },
    'generate-materials.html': {
        'eyebrow': 'Material Generation',
        'title': 'Generate Teaching Materials',
        'sub': 'Use connected inputs, upload your own documents, or start from scratch.',
        'question': 'How would you like to begin?',
        'options': [
            {'title': 'Continue from Teaching Plan', 'desc': 'Generate materials aligned to the weekly teaching and assessment plan.'},
            {'title': 'Refresh Existing Materials', 'desc': 'Upload slides, notes, worksheets, or previous semester materials to refresh and update them.'},
            {'title': 'Create Standalone Material', 'desc': 'Quickly generate a quiz, activity, worksheet, or teaching resource from a simple prompt.'}
        ]
    }
}

for fname, d in data.items():
    update_file(fname, d['eyebrow'], d['title'], d['sub'], d['question'], d['options'])

print("Done updating text.")
