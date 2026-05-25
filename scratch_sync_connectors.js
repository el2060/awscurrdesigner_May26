const fs = require('fs');

// ==== 1. Update plan-teaching.html ====
let dataTeaching = fs.readFileSync('plan-teaching.html', 'utf8');

const oldCss = `    /* Top Connector - Minimal */
    .setup-kicker {
      color: var(--brand); font-size: 10px; font-weight: 700;
      letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 4px;
    }
    .setup-note { color: #4d5d70; font-size: 13px; line-height: 1.5; margin-bottom: 16px; }

    /* Connected Strip - Simplified */
    .connected-strip {
      display: flex; align-items: center; gap: 16px; margin-bottom: 40px;
      flex-wrap: wrap;
    }
    
    .ctx-downstream-chips { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
    .ctx-downstream-chip {
      font-size: 11px; font-weight: 500; color: #374151;
      background: #f3f4f6; border: 1px solid #e5e7eb;
      border-radius: 6px; padding: 4px 10px;
    }
    .ctx-more-chip {
      font-size: 11px; font-weight: 500; color: #6b7280;
      padding: 4px 6px;
    }`;

const newCss = `    /* Top Connector - Consistent with plan-direction */
    .setup-card {
      border: 1px solid #c8daec;
      border-radius: 12px;
      background: #fff;
      padding: 18px;
      display: grid;
      gap: 16px;
      margin-bottom: 40px;
    }

    .setup-kicker {
      color: var(--brand);
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-bottom: 4px;
    }

    .setup-title {
      color: #111827;
      font-size: 17px;
      font-weight: 700;
    }

    .setup-note {
      color: #4b5563;
      font-size: 12px;
      line-height: 1.5;
      max-width: none;
    }

    .analysis-setup {
      padding: 0;
      overflow: hidden;
      border-color: #d7e3ef;
      background: #fcfeff;
    }

    .analysis-accordion > summary {
      list-style: none;
      cursor: pointer;
      padding: 14px 16px;
      display: grid;
      gap: 6px;
    }

    .analysis-accordion > summary::-webkit-details-marker {
      display: none;
    }

    .analysis-accordion > summary::after {
      content: "Review handoff";
      justify-self: start;
      margin-top: 2px;
      font-size: 11px;
      font-weight: 700;
      color: #5f748a;
      border: 1px solid #d8e4ef;
      border-radius: 999px;
      padding: 4px 10px;
      background: #fff;
    }

    .analysis-accordion[open] > summary {
      border-bottom: 1px solid #e3ecf4;
      background: #fff;
    }

    .analysis-accordion[open] > summary::after {
      content: "Hide handoff";
    }

    .analysis-runs {
      padding: 10px 12px 14px;
      display: grid;
      gap: 8px;
      background: #f9fcff;
    }
    
    .connected-strip {
      border: 1px solid #d8e5f2;
      border-radius: 12px;
      background: linear-gradient(180deg, #f8fbff 0%, #f5f9fe 100%);
      padding: 14px 16px;
      display: flex;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
    }
    
    .ctx-downstream-chips { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
    .ctx-downstream-chip {
      font-size: 11px; font-weight: 600; color: #365872;
      background: #fff; border: 1px solid #d6e2ef;
      border-radius: 999px; padding: 4px 10px;
    }
    .ctx-more-chip {
      font-size: 11px; font-weight: 500; color: #6b7280;
      padding: 4px 6px;
    }`;

dataTeaching = dataTeaching.split(oldCss.replace(/\n/g, '\r\n')).join(newCss);
dataTeaching = dataTeaching.split(oldCss).join(newCss);

const oldHtml = `  <!-- 1. TOP CONNECTOR -->
  <div class="setup-kicker">Continue From Module Design</div>
  <div class="setup-note">Approved module context carried into this workspace.</div>

  <div class="connected-strip">
    <div class="ctx-downstream-chips">
      <div class="ctx-downstream-chip">MLOs</div>
      <div class="ctx-downstream-chip">Assessment Structure</div>
      <div class="ctx-downstream-chip">Graduate Skills</div>
      <div class="ctx-downstream-chip">Skills Priorities</div>
      <div class="ctx-more-chip">+3 connected inputs</div>
    </div>
  </div>`;

const newHtml = `  <!-- 1. TOP CONNECTOR -->
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
  </section>`;

dataTeaching = dataTeaching.split(oldHtml.replace(/\n/g, '\r\n')).join(newHtml);
dataTeaching = dataTeaching.split(oldHtml).join(newHtml);

fs.writeFileSync('plan-teaching.html', dataTeaching);
