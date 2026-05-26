const fs = require('fs');
const file = 'index.html';
let content = fs.readFileSync(file, 'utf8');

const cssOverride = 
    /* --- Global Aesthetic Override --- */
    :root {
      --brand: #0f172a !important;
      --font-sans: 'Outfit', system-ui, sans-serif !important;
    }
    body {
      font-family: var(--font-sans);
    }
    .setup-card {
      border: 1px solid rgba(15, 23, 42, 0.08) !important;
      background: #ffffff !important;
      box-shadow: 0 2px 8px -2px rgba(15, 23, 42, 0.05), 0 4px 12px -4px rgba(15, 23, 42, 0.02) !important;
      border-radius: 12px !important;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }
    .so-card {
      border: 1px solid rgba(15, 23, 42, 0.1) !important;
      box-shadow: 0 2px 4px -1px rgba(15, 23, 42, 0.02) !important;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }
    .so-card:hover {
      border-color: rgba(15, 23, 42, 0.2) !important;
      box-shadow: 0 4px 12px -2px rgba(15, 23, 42, 0.05) !important;
      transform: translateY(-1px);
    }
    .start-radio:checked + .so-card {
      border: 2px solid var(--brand) !important;
      background: #f8fafc !important;
      box-shadow: 0 4px 16px rgba(15, 23, 42, 0.08) !important;
      transform: translateY(-1px);
    }
    .analysis-primary {
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
      box-shadow: 0 2px 6px rgba(15, 23, 42, 0.15) !important;
    }
    .analysis-primary:hover {
      box-shadow: 0 4px 12px rgba(15, 23, 42, 0.25) !important;
      transform: translateY(-1px);
    }
</style>
;

// Inject global override
if (!content.includes('/* --- Global Aesthetic Override --- */')) {
    content = content.replace(/<\/style>/, cssOverride);
}

// Fix opt-card styling
const newOptCardCss =     .opt-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      border: 1px solid rgba(15, 23, 42, 0.1);
      background: #f8fafc;
      border-radius: 10px;
      padding: 14px 16px;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .opt-card:hover {
      border-color: rgba(15, 23, 42, 0.2);
      box-shadow: 0 4px 12px rgba(15, 23, 42, 0.05);
    }
    .opt-card-label {
      font-size: 11px; font-weight: 700; letter-spacing: 0.08em;
      text-transform: uppercase; color: var(--brand);
      margin-bottom: 4px;
    }
    .opt-card-desc {
      font-size: 13px; color: #475569; line-height: 1.45;
    }
    .opt-card-cta {
      text-decoration: none;
      font-size: 12px; font-weight: 700;
      color: var(--brand);
      border: 1px solid rgba(15, 23, 42, 0.15);
      background: #fff;
      border-radius: 6px;
      padding: 8px 13px;
      white-space: nowrap;
      flex-shrink: 0;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 1px 2px rgba(15, 23, 42, 0.05);
    }
    .opt-card-cta:hover {
      background: var(--brand); color: #fff;
      border-color: var(--brand); text-decoration: none;
      box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
      transform: translateY(-1px);
    };

// Replace the old opt-card block
content = content.replace(/\.opt-card \{[\s\S]*?\.opt-card-cta:hover \{[\s\S]*?\}/, newOptCardCss);

fs.writeFileSync(file, content);
console.log('Successfully updated index.html');
