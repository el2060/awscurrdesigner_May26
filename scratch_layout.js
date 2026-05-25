const fs = require('fs');

let data = fs.readFileSync('plan-teaching.html', 'utf8');

// 1. Add --max to :root
if (!data.includes('--max: 1200px')) {
  data = data.replace(
    /--brand:\s*#004689;/,
    '--brand:        #004689;\n      --max: 1200px;'
  );
}

// 2. Update .topbar-inner
data = data.replace(
  'max-width: 1200px;',
  'max-width: var(--max);'
);

// 3. Update .page css
const oldPageCss = `.page {
      max-width: 1100px; margin: 0 auto; padding: 44px 40px 96px;
    }`;
const newPageCss = `.page {
      max-width: var(--max);
      margin: 0 auto;
      padding: 44px 40px;
      display: grid;
      gap: 18px;
    }`;
data = data.split(oldPageCss.replace(/\n/g, '\r\n')).join(newPageCss);
data = data.split(oldPageCss).join(newPageCss);

// 4. Wrap header in <section>
const oldHeader = `  <div class="page-eyebrow">Teaching & Assessment Planning</div>
  <h1 class="page-title">Plan Weekly Teaching & Assessment</h1>
  <p class="page-sub">Organise weekly learning activities, OAL/IPL delivery, assessment timing, and student learning progression.</p>`;

const newHeader = `  <section>
    <div class="page-eyebrow">Teaching & Assessment Planning</div>
    <h1 class="page-title">Plan Weekly Teaching & Assessment</h1>
    <p class="page-sub">Organise weekly learning activities, OAL/IPL delivery, assessment timing, and student learning progression.</p>
  </section>`;

data = data.split(oldHeader.replace(/\n/g, '\r\n')).join(newHeader);
data = data.split(oldHeader).join(newHeader);

fs.writeFileSync('plan-teaching.html', data);
