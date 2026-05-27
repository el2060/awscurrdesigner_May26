import glob
import re

new_css = """
    /* --- Premium UI/UX Aesthetic Override --- */
    :root {
      /* Rich, modern brand palette */
      --brand: #0f172a !important;
      --brand-hover: #1e293b !important;
      --brand-light: #f8fafc !important;
      --accent: #2563eb !important;
      --accent-hover: #1d4ed8 !important;
      --accent-light: #eff6ff !important;
      
      /* Typography */
      --font-sans: 'Outfit', 'Inter', system-ui, -apple-system, sans-serif !important;
      
      /* Colors */
      --text-main: #0f172a !important;
      --text-muted: #475569 !important;
      --border-soft: rgba(15, 23, 42, 0.08) !important;
      --border-strong: rgba(15, 23, 42, 0.15) !important;
      
      /* Shadows */
      --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.03) !important;
      --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.04), 0 2px 4px -2px rgba(0, 0, 0, 0.04) !important;
      --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.04), 0 4px 6px -4px rgba(0, 0, 0, 0.04) !important;
      --shadow-hover: 0 14px 28px -4px rgba(15, 23, 42, 0.08), 0 4px 12px -2px rgba(15, 23, 42, 0.04) !important;
      
      /* Transitions */
      --trans-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
      --trans-fast: all 0.15s ease-out !important;
    }

    body {
      font-family: var(--font-sans);
      color: var(--text-main);
      background-color: #fcfcfd !important;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    /* Typography Polish */
    h1, h2, h3, h4, .page-title, .dashboard-title {
      color: var(--text-main) !important;
      letter-spacing: -0.025em !important;
    }

    .page-eyebrow {
      letter-spacing: 0.12em !important;
      font-weight: 700 !important;
      color: var(--brand) !important;
    }
    
    .page-sub {
      color: var(--text-muted) !important;
    }

    /* Cards Polish */
    .setup-card, .upload-zone, .opt-card, .analysis-inline, .workspace-sidebar, .pane-card {
      background: #ffffff !important;
      border: 1px solid var(--border-soft) !important;
      border-radius: 12px !important;
      box-shadow: var(--shadow-sm) !important;
      transition: var(--trans-smooth);
    }

    .setup-card:hover, .upload-zone:hover, .opt-card:hover, .pane-card:hover {
      border-color: rgba(15, 23, 42, 0.12) !important;
      box-shadow: var(--shadow-hover) !important;
      transform: translateY(-2px);
    }

    /* Sub-options cards */
    .so-card {
      border: 1px solid var(--border-soft) !important;
      box-shadow: none !important;
      transition: var(--trans-smooth);
      border-radius: 10px !important;
      background: #fff !important;
    }

    .so-card:hover {
      border-color: rgba(15, 23, 42, 0.2) !important;
      box-shadow: var(--shadow-md) !important;
      background: #fdfdfd !important;
    }

    .start-radio:checked + .so-card {
      border: 2px solid var(--accent) !important;
      background: var(--accent-light) !important;
      box-shadow: var(--shadow-md) !important;
    }

    /* Interactive Elements (Buttons) */
    button, .btn-primary, .analysis-primary, .upload-zone-btn, .chat-send, .btn-ghost {
      transition: var(--trans-fast);
      border-radius: 8px !important;
    }

    /* Primary buttons */
    .btn-primary, .analysis-primary, .chat-send {
      background: var(--brand) !important;
      color: #fff !important;
      border: 1px solid var(--brand) !important;
      box-shadow: 0 1px 3px rgba(15,23,42,0.1) !important;
      font-weight: 600 !important;
    }

    .btn-primary:hover, .analysis-primary:hover, .chat-send:hover {
      background: var(--brand-hover) !important;
      border-color: var(--brand-hover) !important;
      transform: translateY(-1px);
      box-shadow: 0 4px 6px -1px rgba(15,23,42,0.15), 0 2px 4px -2px rgba(15,23,42,0.1) !important;
    }

    .btn-primary:active, .analysis-primary:active {
      transform: translateY(0);
      box-shadow: 0 1px 2px rgba(15,23,42,0.1) !important;
    }

    /* Ghost / Outline buttons */
    .btn-ghost, .topbar-link {
      font-weight: 500 !important;
      transition: var(--trans-fast);
    }

    .btn-ghost:hover {
      color: var(--text-main) !important;
      background-color: var(--brand-light) !important;
      border-color: var(--border-strong) !important;
    }

    /* Topbar */
    .topbar {
      box-shadow: var(--shadow-sm) !important;
      border-bottom: 1px solid var(--border-soft) !important;
      background: rgba(255, 255, 255, 0.9) !important;
      backdrop-filter: blur(8px) !important;
    }

    /* Focus Accessibility */
    *:focus-visible {
      outline: 2px solid var(--accent) !important;
      outline-offset: 2px !important;
    }

    /* Inputs */
    input[type=\"text\"], input[type=\"email\"], select, textarea {
      transition: var(--trans-fast);
      border: 1px solid var(--border-strong) !important;
      border-radius: 8px !important;
    }
    
    input:focus, select:focus, textarea:focus {
      border-color: var(--accent) !important;
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1) !important;
      outline: none !important;
    }

    /* Badges & Tags */
    .brand-tag, .uz-badge, .ai-time, .signals-chip, .ref-badge, .ref-progress {
      font-family: var(--font-sans) !important;
      font-weight: 600 !important;
    }
"""

for file in glob.glob('*.html'):
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the closing </style> tag and see if there's already an override block
    if '/* --- Global Aesthetic Override --- */' in content:
        # Replace everything from the old override block to the end of style
        pattern = r'/\* --- Global Aesthetic Override --- \*/.*?(?=</style>)'
        content = re.sub(pattern, new_css, content, flags=re.DOTALL)
    elif '/* --- Premium UI/UX Aesthetic Override --- */' in content:
        pattern = r'/\* --- Premium UI/UX Aesthetic Override --- \*/.*?(?=</style>)'
        content = re.sub(pattern, new_css, content, flags=re.DOTALL)
    else:
        # Inject just before </style>
        content = content.replace('</style>', new_css + '\n</style>')

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print('Applied premium UI/UX override across all HTML files.')
