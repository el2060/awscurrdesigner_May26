import re

with open('plan-teaching.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update the first setup-card ID and its button
html = html.replace(
    '<section class="setup-card" style="padding: 20px 24px; border: 1px solid var(--brand-border, #b8d0e6); background: #fdfdfe;">',
    '<section class="setup-card" id="start-step-1" style="padding: 20px 24px; border: 1px solid var(--brand-border, #b8d0e6); background: #fdfdfe;">'
)
html = html.replace(
    '''<button class="analysis-primary" type="button" onclick="this.closest('.setup-card').style.display='none'">Start Teaching Plan →</button>''',
    '''<button class="analysis-primary" type="button" onclick="document.getElementById('start-step-1').style.display='none'; document.getElementById('start-step-2').style.display='block'">Start Teaching Plan →</button>'''
)

# 2. Define the new Poly-Native Configuration Card (Step 2)
new_config_card = '''
  <section class="setup-card" id="start-step-2" style="display: none; padding: 24px; border: 1px solid #dce8f5; background: #fff; margin-bottom: 24px;">
    <h3 style="font-size: 14px; font-weight: 700; color: #1a2e40; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 0.05em; color: #4a6580; font-size: 11px;">Configuration</h3>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 24px;">
      <div>
        <div style="font-size: 12px; font-weight: 600; color: #344b61; margin-bottom: 8px;">Module Duration</div>
        <select style="width: 100%; border: 1px solid #c8daec; border-radius: 6px; padding: 8px 12px; font-size: 13px; color: #1a2e40; background: #f8fbff; appearance: none; outline: none;">
          <option>15 Weeks (13 Teaching + 2 Exam)</option>
          <option>13 Weeks (No Exam)</option>
        </select>
      </div>
      <div>
        <div style="font-size: 12px; font-weight: 600; color: #344b61; margin-bottom: 8px;">Contact Hours</div>
        <select style="width: 100%; border: 1px solid #c8daec; border-radius: 6px; padding: 8px 12px; font-size: 13px; color: #1a2e40; background: #f8fbff; appearance: none; outline: none;">
          <option>4 Contact Hours / Week</option>
          <option>3 Contact Hours / Week</option>
        </select>
      </div>
      <div>
        <div style="font-size: 12px; font-weight: 600; color: #344b61; margin-bottom: 8px;">Delivery Mode</div>
        <select style="width: 100%; border: 1px solid #c8daec; border-radius: 6px; padding: 8px 12px; font-size: 13px; color: #1a2e40; background: #f8fbff; appearance: none; outline: none;">
          <option>Blended (IPL + OAL)</option>
          <option>Fully In-Person (IPL)</option>
        </select>
      </div>
    </div>

    <div style="margin-bottom: 24px;">
      <div style="font-size: 12px; font-weight: 600; color: #344b61; margin-bottom: 8px;">Key Assessment Milestones (Optional)</div>
      <div style="font-size: 12px; color: #64748b; margin-bottom: 12px;">Let AI structure the teaching plan around your major assessments.</div>
      
      <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 8px;">
        <div style="font-size: 13px; color: #64748b;">↳</div>
        <select style="border: 1px solid #c8daec; border-radius: 6px; padding: 6px 12px; font-size: 13px; color: #1a2e40; background: #fff;"><option>Mid-Semester Test (MST)</option></select>
        <span style="font-size: 13px; color: #64748b;">in</span>
        <select style="border: 1px solid #c8daec; border-radius: 6px; padding: 6px 12px; font-size: 13px; color: #1a2e40; background: #fff;"><option>Week 8</option></select>
        <button style="border: none; background: none; color: #ef4444; font-size: 12px; cursor: pointer;">✕ Remove</button>
      </div>
      
      <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 12px;">
        <div style="font-size: 13px; color: #64748b;">↳</div>
        <select style="border: 1px solid #c8daec; border-radius: 6px; padding: 6px 12px; font-size: 13px; color: #1a2e40; background: #fff;"><option>Final Project Submission</option></select>
        <span style="font-size: 13px; color: #64748b;">in</span>
        <select style="border: 1px solid #c8daec; border-radius: 6px; padding: 6px 12px; font-size: 13px; color: #1a2e40; background: #fff;"><option>Week 14</option></select>
        <button style="border: none; background: none; color: #ef4444; font-size: 12px; cursor: pointer;">✕ Remove</button>
      </div>
      
      <button style="border: 1px dashed #b8d0e6; background: #f8fbff; border-radius: 6px; padding: 6px 12px; font-size: 12px; font-weight: 600; color: #4a6580; cursor: pointer;">+ Add Milestone</button>
    </div>

    <div style="background: #f8fbff; border: 1px solid #dce8f5; border-radius: 8px; padding: 16px;">
      <div style="font-size: 12px; font-weight: 600; color: #344b61; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
        <span style="color: var(--brand);">✦</span> Additional Instructions &amp; Pedagogical Focus
      </div>
      <textarea placeholder="e.g. Emphasize Problem-Based Learning (PBL) in tutorials. Front-load theory into asynchronous OAL to save class time for practicals. Ensure workload is balanced around the Week 8 MST." style="width: 100%; height: 60px; border: 1px solid #c8daec; border-radius: 6px; padding: 10px 12px; font-size: 13px; color: var(--text); font-family: var(--font-sans, system-ui); resize: none; background: #fff; outline: none;"></textarea>
    </div>

    <div style="margin-top: 24px; display: flex; justify-content: flex-end;">
      <button class="analysis-primary" type="button" onclick="document.getElementById('start-step-2').style.display='none'; document.getElementById('main-workspace-container').style.display='block'">Generate Draft →</button>
    </div>
  </section>
'''

html = html.replace('  </section>\n\n  <!-- WORKSPACE TOOLBAR', '  </section>\n\n' + new_config_card + '\n\n  <div id="main-workspace-container" style="display: none;">\n  <!-- WORKSPACE TOOLBAR')

# 3. Remove the old config strip from the main workspace
# We only want to remove <div class="config-strip">...</div> inside the main workspace
start_idx = html.find('<!-- TEACHING PLAN CONFIGURATION -->')
end_idx = html.find('<!-- AI REFINE CHAT -->')

if start_idx != -1 and end_idx != -1:
    html = html[:start_idx] + html[end_idx:]

# 4. Close the main-workspace-container div before </body>
html = html.replace('</body>', '  </div>\n</body>')

with open('plan-teaching.html', 'w', encoding='utf-8') as f:
    f.write(html)

print('Success')
