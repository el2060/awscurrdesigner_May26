const fs = require('fs');
let data = fs.readFileSync('generate-materials.html', 'utf8');

const oldCss = `    /* ── Connected context strip ── */
    .ctx-strip {
      border: 1px solid #c8daec;
      border-radius: var(--radius);
      background: linear-gradient(180deg, #f7fbff 0%, #ffffff 70%);
      padding: 16px 18px;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 18px;
      flex-wrap: wrap;
    }
    .ctx-left { display: grid; gap: 6px; }
    .ctx-kicker { font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--brand); }
    .ctx-module { font-size: 16px; font-weight: 700; color: #1d3148; letter-spacing: -0.01em; }
    .ctx-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px; }
    .ctx-tag {
      font-size: 11px; font-weight: 600; color: #2f7a52;
      background: #f0faf5; border: 1px solid #a7f3d0;
      border-radius: 999px; padding: 3px 9px;
      display: inline-flex; align-items: center; gap: 4px;
    }
    .ctx-tag::before { content: "✓"; font-size: 10px; }
    .ctx-right { display: flex; align-items: center; gap: 10px; flex-shrink: 0; flex-wrap: wrap; }
    .ctx-meta { font-size: 12px; color: #6b7f92; font-weight: 600; }
    .btn-ghost {
      border: 1px solid #c8daec; border-radius: 999px; background: #fff;
      color: #3d5a78; font-size: 11px; font-weight: 700;
      padding: 6px 13px; cursor: pointer; text-decoration: none; white-space: nowrap;
    }
    .btn-ghost:hover { border-color: var(--brand); color: var(--brand); background: var(--brand-soft); }`;

const newCss = `    /* ── Top Connector ── */
    .setup-card {
      border: 1px solid #c8daec;
      border-radius: 12px;
      background: #fff;
      padding: 18px;
      display: grid;
      gap: 16px;
    }
    .setup-kicker { color: var(--brand); font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 4px; }
    .setup-title { color: #111827; font-size: 17px; font-weight: 700; }
    .setup-note { color: #4b5563; font-size: 12px; line-height: 1.5; max-width: none; }
    .analysis-setup { padding: 0; overflow: hidden; border-color: #d7e3ef; background: #fcfeff; }
    .analysis-accordion > summary { list-style: none; cursor: pointer; padding: 14px 16px; display: grid; gap: 6px; }
    .analysis-accordion > summary::-webkit-details-marker { display: none; }
    .analysis-accordion > summary::after { content: "Review handoff"; justify-self: start; margin-top: 2px; font-size: 11px; font-weight: 700; color: #5f748a; border: 1px solid #d8e4ef; border-radius: 999px; padding: 4px 10px; background: #fff; }
    .analysis-accordion[open] > summary { border-bottom: 1px solid #e3ecf4; background: #fff; }
    .analysis-accordion[open] > summary::after { content: "Hide handoff"; }
    .analysis-runs { padding: 10px 12px 14px; display: grid; gap: 8px; background: #f9fcff; }
    
    .connected-strip { border: 1px solid #d8e5f2; border-radius: 12px; background: linear-gradient(180deg, #f8fbff 0%, #f5f9fe 100%); padding: 14px 16px; display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
    .ctx-downstream-chips { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
    .ctx-downstream-chip { font-size: 11px; font-weight: 600; color: #365872; background: #fff; border: 1px solid #d6e2ef; border-radius: 999px; padding: 4px 10px; }
    .ctx-more-chip { font-size: 11px; font-weight: 500; color: #6b7280; padding: 4px 6px; }`;

data = data.split(oldCss.replace(/\n/g, '\r\n')).join(newCss);
data = data.split(oldCss).join(newCss);

const oldHtml = `    <!-- ─── Step 1: Connected curriculum context ─── -->
    <div class="ctx-strip" role="region" aria-label="Connected curriculum context">
      <div class="ctx-left">
        <div class="ctx-kicker">Using Curriculum Draft</div>
        <div class="ctx-module">Advanced Critical Care Nursing Science II</div>
        <div class="ctx-tags">
          <span class="ctx-tag">Learning outcomes</span>
          <span class="ctx-tag">Weekly structure</span>
          <span class="ctx-tag">Teaching strategy</span>
          <span class="ctx-tag">Assessment approach</span>
          <span class="ctx-tag">AI &amp; integrity guidance</span>
        </div>
      </div>
      <div class="ctx-right">
        <span class="ctx-meta">ICU Nursing Draft v2 · Completed 2 hrs ago</span>
        <button class="btn-ghost" type="button">Change Draft</button>
      </div>
    </div>`;

const newHtml = `    <!-- ─── Step 1: Connected curriculum context ─── -->
    <section class="setup-card analysis-setup" aria-label="Connected curriculum context">
      <details class="analysis-accordion">
        <summary>
          <div class="setup-kicker">Continue From Teaching & Assessment Planning</div>
          <div class="setup-title">Review approved curriculum & teaching plan</div>
          <div class="setup-note">Module curriculum and weekly teaching flow carried into this workspace.</div>
        </summary>
        <div class="analysis-runs">
          <div class="connected-strip">
            <div class="ctx-downstream-chips">
              <div class="ctx-downstream-chip">Learning outcomes</div>
              <div class="ctx-downstream-chip">Weekly structure</div>
              <div class="ctx-downstream-chip">Teaching strategy</div>
              <div class="ctx-downstream-chip">Assessment approach</div>
              <div class="ctx-more-chip">+2 connected inputs</div>
            </div>
          </div>
        </div>
      </details>
    </section>`;

data = data.split(oldHtml.replace(/\n/g, '\r\n')).join(newHtml);
data = data.split(oldHtml).join(newHtml);

fs.writeFileSync('generate-materials.html', data);
