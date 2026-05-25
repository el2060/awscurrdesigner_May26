const fs = require('fs');
let data = fs.readFileSync('plan-teaching.html', 'utf8');

// 1. Grid layout update
data = data.replace(
  'grid-template-columns: minmax(0, 1fr) 260px;', 
  'grid-template-columns: 260px minmax(0, 1fr);'
);

const newCss = `
    /* TA Table Structure */
    .ta-table {
      width: 100%;
      border-collapse: collapse;
      background: #fff;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 1px 2px rgba(0,0,0,0.05);
    }
    .ta-table th {
      background: #f9fafb;
      font-size: 11px;
      font-weight: 600;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 12px 16px;
      text-align: left;
      border-bottom: 1px solid #e5e7eb;
    }
    .ta-table td {
      padding: 16px;
      border-bottom: 1px solid #f3f4f6;
      vertical-align: top;
      font-size: 13px;
      color: #4b5563;
      line-height: 1.5;
    }
    .ta-table tr:last-child td {
      border-bottom: none;
    }
    .ta-week-cell {
      font-weight: 600;
      color: #111827;
      text-align: center;
      width: 60px;
    }
    
    .skel-bar {
      height: 12px;
      background: #e5e7eb;
      border-radius: 4px;
      margin-bottom: 8px;
    }
    
    .ta-editable {
      position: relative;
      padding: 6px 8px;
      border-radius: 6px;
      transition: background-color 0.2s, box-shadow 0.2s;
      cursor: pointer;
    }
    .ta-editable:hover {
      background: #f8fbff;
      box-shadow: inset 0 0 0 1px #d6e3f0;
    }
    .ta-editable:hover .ta-inline-actions {
      opacity: 1;
      visibility: visible;
    }

    .ta-inline-actions {
      position: absolute;
      top: -12px;
      right: 4px;
      background: #fff;
      border: 1px solid #d1d5db;
      border-radius: 4px;
      padding: 2px 6px;
      font-size: 10px;
      font-weight: 500;
      display: flex;
      gap: 6px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.15s, visibility 0.15s;
      white-space: nowrap;
      z-index: 10;
    }
    .ta-inline-actions span { color: #6b7280; }
    .ta-inline-actions span:hover { color: #111827; }
    .ta-inline-actions .ai { color: var(--brand); font-weight: 600; }
    .ta-inline-actions .ai:hover { color: var(--brand-dark); }
    .ta-inline-actions .divider { color: #d1d5db; }

    .ambient-intervention {
      margin-top: 8px;
      padding-left: 8px;
      border-left: 2px solid var(--brand);
    }
    .ambient-text {
      font-size: 11px;
      color: var(--brand);
      font-weight: 500;
      cursor: pointer;
    }
    .ambient-text:hover { text-decoration: underline; }

    .ta-special-row td {
      background: #f3f4f6;
      padding: 12px 16px;
    }
    .ta-special-content {
      font-size: 12px;
      font-weight: 600;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }`;
data = data.replace('</style>', newCss + '\n  </style>');

const newMainContent = `
  <div class="page-eyebrow">Teaching & Assessment Planning</div>
  <h1 class="page-title">Plan Weekly Teaching & Assessment</h1>
  <p class="page-sub">Organise weekly learning activities, OAL/IPL delivery, assessment timing, and student learning progression.</p>

  <!-- 1. TOP CONNECTOR -->
  <section class="setup-card analysis-setup" aria-label="Connected module design context">
    <details class="analysis-accordion">
      <summary>
        <div class="setup-kicker">Continue From Module Design</div>
        <div class="setup-title">Review approved module context</div>
        <div class="setup-note">Approved module context carried into this workspace.</div>
      </summary>
      <div class="analysis-runs">
        <div class="connected-strip">
          <div class="ctx-downstream-chips">
            <div class="ctx-downstream-chip">MLOs</div>
            <div class="ctx-downstream-chip">Assessment Structure</div>
            <div class="ctx-downstream-chip">Graduate Skills</div>
            <div class="ctx-downstream-chip">Skills Priorities</div>
            <div class="ctx-more-chip">+3 connected inputs</div>
          </div>
        </div>
      </div>
    </details>
  </section>

  <div class="workspace">
    <!-- 4. SMART PEDAGOGY ASSIST LAYER (SIDEBAR) NOW ON THE LEFT -->
    <div class="workspace-side">
      <div class="ai-sidebar">
        
        <div class="rail-section">
          <div class="rail-title">AI Planning Assistant</div>
          <div class="rail-suggest-list">
            <div class="rail-suggest-item">
              <div class="rail-suggest-label">Suggest retrieval activity</div>
              <button class="rail-apply-btn">Apply</button>
            </div>
            <div class="rail-suggest-item warn">
              <div class="rail-suggest-label">Assessment load heavy in Week 7</div>
              <button class="rail-apply-btn warn-action">Resolve</button>
            </div>
            <div class="rail-suggest-item warn">
              <div class="rail-suggest-label">Add formative checkpoint?</div>
              <button class="rail-apply-btn warn-action">Insert</button>
            </div>
          </div>
        </div>

        <div class="rail-section">
          <div class="rail-title">Accelerators</div>
          <div class="rail-action-list">
            <button class="rail-action-btn">Generate 15-week draft</button>
            <button class="rail-action-btn">Insert assessment milestones</button>
            <button class="rail-action-btn">Suggest OAL activities</button>
            <button class="rail-action-btn">Review workload balance</button>
          </div>
        </div>

      </div>
    </div>

    <!-- 3. CORE WORKSPACE NOW ON THE RIGHT -->
    <div class="workspace-main">
      
      <div class="workspace-toolbar" style="margin-bottom: 24px; display: flex; justify-content: space-between; align-items: flex-end;">
        <div style="display: flex; flex-direction: column; gap: 4px;">
          <div class="workspace-toolbar-title" style="font-size: 18px;">Teaching & Assessment Schedule</div>
          <div style="font-size: 13px; color: #6b7280;">AI suggestions available throughout the schedule.<br>Manually edit or refine any section.</div>
        </div>
        <div class="save-state">
          <span class="save-indicator"></span> Draft auto-saved just now
        </div>
      </div>

      <table class="ta-table">
        <thead>
          <tr>
            <th style="width: 50px; text-align: center;">Week</th>
            <th style="width: 30%;">OAL / Pre-Class</th>
            <th style="width: 40%;">In-Class Activities</th>
            <th style="width: 30%;">Assessment / Notes</th>
          </tr>
        </thead>
        <tbody>
          <!-- Week 1 -->
          <tr>
            <td class="ta-week-cell">1</td>
            <td>
              <div class="ta-editable">
                <div class="skel-bar" style="width: 85%;"></div>
                <div class="skel-bar" style="width: 60%;"></div>
                <div class="ta-inline-actions"><span>Edit</span><span class="divider">|</span><span class="ai">✦ AI Suggest</span></div>
              </div>
            </td>
            <td>
              <div class="ta-editable">
                <div class="skel-bar" style="width: 100%;"></div>
                <div class="skel-bar" style="width: 70%;"></div>
                <div class="ta-inline-actions"><span>Edit</span><span class="divider">|</span><span class="ai">✦ AI Suggest</span></div>
              </div>
            </td>
            <td>
              <div class="ta-editable">
                <div>Formative checkpoint</div>
                <div class="ta-inline-actions"><span>Edit</span><span class="divider">|</span><span class="ai">✦ AI Suggest</span></div>
              </div>
            </td>
          </tr>
          
          <!-- Week 2 -->
          <tr>
            <td class="ta-week-cell">2</td>
            <td>
              <div class="ta-editable">
                <div>Interactive simulation intro</div>
                <div class="ta-inline-actions"><span>Edit</span><span class="divider">|</span><span class="ai">✦ AI Suggest</span></div>
              </div>
            </td>
            <td>
              <div class="ta-editable">
                <div>Diagnostic practice</div>
                <div class="skel-bar" style="width: 50%;"></div>
                <div class="ta-inline-actions"><span>Edit</span><span class="divider">|</span><span class="ai">✦ AI Suggest</span></div>
                
                <div class="ambient-intervention">
                  <div class="ambient-text">✦ Suggest retrieval activity</div>
                </div>
              </div>
            </td>
            <td>
              <div class="ta-editable">
                <div class="skel-bar" style="width: 80%;"></div>
                <div class="ta-inline-actions"><span>Edit</span><span class="divider">|</span><span class="ai">✦ AI Suggest</span></div>
              </div>
            </td>
          </tr>

          <!-- Week 3 -->
          <tr>
            <td class="ta-week-cell">3</td>
            <td>
              <div class="ta-editable">
                <div class="skel-bar" style="width: 90%;"></div>
                <div class="ta-inline-actions"><span>Edit</span><span class="divider">|</span><span class="ai">✦ AI Suggest</span></div>
              </div>
            </td>
            <td>
              <div class="ta-editable">
                <div class="skel-bar" style="width: 75%;"></div>
                <div class="skel-bar" style="width: 60%;"></div>
                <div class="ta-inline-actions"><span>Edit</span><span class="divider">|</span><span class="ai">✦ AI Suggest</span></div>
              </div>
            </td>
            <td>
              <div class="ta-editable">
                <div>Short Quiz 1</div>
                <div class="ta-inline-actions"><span>Edit</span><span class="divider">|</span><span class="ai">✦ AI Suggest</span></div>
              </div>
            </td>
          </tr>

          <!-- Special Week -->
          <tr class="ta-special-row">
            <td class="ta-week-cell">8</td>
            <td colspan="3">
              <div class="ta-special-content">
                Common Test Week — White Space / Revision
              </div>
            </td>
          </tr>

          <!-- Week 9 -->
          <tr>
            <td class="ta-week-cell">9</td>
            <td>
              <div class="ta-editable">
                <div class="skel-bar" style="width: 90%;"></div>
                <div class="ta-inline-actions"><span>Edit</span><span class="divider">|</span><span class="ai">✦ AI Suggest</span></div>
              </div>
            </td>
            <td>
              <div class="ta-editable">
                <div class="skel-bar" style="width: 75%;"></div>
                <div class="skel-bar" style="width: 40%;"></div>
                <div class="ta-inline-actions"><span>Edit</span><span class="divider">|</span><span class="ai">✦ AI Suggest</span></div>
              </div>
            </td>
            <td>
              <div class="ta-editable">
                <div style="font-weight: 600; color: #111827;">CA2 Submission</div>
                <div class="ta-inline-actions"><span>Edit</span><span class="divider">|</span><span class="ai">✦ AI Suggest</span></div>
              </div>
              <div class="ambient-intervention">
                <div class="ambient-text">✦ Assessment load heavy in Week 9</div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- 7. BOTTOM CONNECTOR -->
      <div class="next-step-card" style="margin-top: 48px; border-top: 1px solid #e5e7eb; padding-top: 32px;">
        <div class="next-step-label">Next Step</div>
        <div class="next-step-title">Generate Learning Materials</div>
        <div class="next-step-sub">Teaching flow and assessment plans will carry into material generation.</div>
        
        <a class="next-step-btn" href="generate-materials.html">Continue</a>
      </div>

    </div>
  </div>
`;

data = data.replace(/<main class="page">[\s\S]*<\/main>/, '<main class="page">\n' + newMainContent + '\n</main>');
fs.writeFileSync('plan-teaching.html', data);
