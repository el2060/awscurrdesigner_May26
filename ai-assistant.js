/* ============================================================
   NP AI Curriculum Designer — AI Assistant Module
   Mock AI interactions, suggestion cards, validators, chat
   ============================================================ */

// ─── Mock Data ────────────────────────────────────────────────
const MOCK_DATA = {
  synopsis: {
    ICT1234: `This module is designed for Year 2 Diploma in Information Technology students who have completed foundational programming modules. Students will explore fundamental data structures including arrays, linked lists, stacks, queues, trees, and graphs, and implement classical algorithms for searching, sorting, and graph traversal. Through hands-on lab sessions and project work, students will develop the ability to select and apply appropriate data structures to solve computational problems efficiently, analysing the time and space complexity of their solutions. The module also introduces students to the application of data structures in real-world software development contexts.`,
    default: `This module is designed for Year [X] Diploma in [Program] students with prior knowledge of [prerequisites]. Students will develop competencies in [domain area] through a combination of lectures, tutorials, and practical sessions. Upon completion, students will be equipped with the skills and knowledge to [core outcomes] in professional settings.`
  },
  outcomes: {
    ICT1234: [
      { id: 'MO1', text: 'Explain and compare the properties, operations, and use cases of fundamental data structures including arrays, linked lists, stacks, queues, trees, and graphs.', cos: ['CO1'], npgc: [1, 2] },
      { id: 'MO2', text: 'Implement data structures and algorithms using Python, demonstrating correct logic, code organisation, and adherence to coding standards.', cos: ['CO1', 'CO2'], npgc: [1, 3] },
      { id: 'MO3', text: 'Apply searching and sorting algorithms to structured datasets, justifying the choice of algorithm based on efficiency and context.', cos: ['CO2'], npgc: [1, 2] },
      { id: 'MO4', text: 'Analyse the time and space complexity of algorithms using Big-O notation and evaluate algorithmic trade-offs.', cos: ['CO2'], npgc: [2] },
      { id: 'MO5', text: 'Design and implement solutions to computational problems by selecting and applying appropriate data structures and algorithms.', cos: ['CO3'], npgc: [1, 2, 3] },
      { id: 'MO6', text: 'Demonstrate effective collaboration and communication skills by working in teams to design, implement, and present software solutions.', cos: ['CO3'], npgc: [4, 5] },
      { id: 'MO7', text: 'Evaluate and critique code implementations for correctness, efficiency, and maintainability, applying peer review practices.', cos: ['CO3'], npgc: [2, 3] },
    ]
  },
  schedule: [
    { week: 1, topic: 'Module Introduction & Review of Python Fundamentals', subtopics: 'Module overview, assessment briefing, revision of Python basics, IDE setup' },
    { week: 2, topic: 'Arrays and Dynamic Arrays', subtopics: 'Array operations, time complexity, Python lists, amortised analysis' },
    { week: 3, topic: 'Linked Lists', subtopics: 'Singly & doubly linked lists, insertion, deletion, traversal, comparison with arrays' },
    { week: 4, topic: 'Stacks and Queues', subtopics: 'Stack/queue ADTs, implementations, applications (e.g., expression parsing, BFS)' },
    { week: 5, topic: 'Recursion and Recursive Algorithms', subtopics: 'Recursion principles, base cases, recursive vs iterative solutions, call stack' },
    { week: 6, topic: 'Sorting Algorithms I', subtopics: 'Bubble sort, selection sort, insertion sort — implementations and analysis' },
    { week: 7, topic: 'Sorting Algorithms II + Assignment 1 Submission', subtopics: 'Merge sort, quicksort, comparison of sorting algorithms, Assignment 1 due' },
    { week: 8, topic: 'Common Test Week', subtopics: '— In-class test covering Weeks 1–7 —', isBreak: true },
    { week: 9, topic: 'Recess Week', subtopics: '—', isBreak: true },
    { week: 10, topic: 'Recess Week', subtopics: '—', isBreak: true },
    { week: 11, topic: 'Binary Trees and BST', subtopics: 'Tree terminology, binary tree traversals (in-order, pre-order, post-order), BST operations' },
    { week: 12, topic: 'Balanced Trees & Heaps', subtopics: 'AVL trees overview, heaps, priority queues, heap sort' },
    { week: 13, topic: 'Hash Tables', subtopics: 'Hashing concepts, collision resolution, Python dictionaries internals' },
    { week: 14, topic: 'Graph Representations & Traversals', subtopics: 'Adjacency matrix/list, BFS, DFS, applications' },
    { week: 15, topic: 'Shortest Path Algorithms', subtopics: "Dijkstra's algorithm, Bellman-Ford overview, practical applications" },
    { week: 16, topic: 'Project Presentations + Revision', subtopics: 'Assignment 2 presentations, module recap, exam preparation Q&A' },
    { week: 17, topic: 'Exam Week', subtopics: '—', isBreak: true },
  ],
  chatResponses: {
    synopsis: "For a strong module synopsis, describe: (1) the target learners and their prior knowledge, (2) the core topics covered, (3) the learning approach (lectures, labs, projects), and (4) what students will be able to do professionally after the module. Keep it to 100–150 words.",
    outcomes: "Module Outcomes (MOs) should be written using Bloom's Taxonomy action verbs. For a technical module, aim for a mix of lower-order (explain, identify) and higher-order (design, evaluate, analyse) outcomes. Typically 5–8 MOs is ideal. Each MO should be clearly measurable and directly assessable.",
    assessment: "A balanced assessment strategy for a technical module might include: (1) a continuous assessment component (labs/quizzes, ~30%) to check ongoing learning, (2) a project or assignment (~40%) for applied skills, and (3) a test or exam (~30%) for conceptual knowledge. Ensure all MOs are covered by at least one assessment.",
    npgc: "The 5 NPGCs are: (1) Domain Competencies — technical knowledge, (2) Critical Thinking — analysis and problem-solving, (3) Communication — writing and presenting, (4) Collaboration — teamwork, and (5) Lifelong Learning — self-directed growth. Most modules should address at least NPGC1 and NPGC2. Communication and collaboration MOs are also encouraged.",
    schedule: "For a 17-week semester, a typical structure is: Weeks 1–7 (content + Assignment 1), Week 8 (Common Test), Weeks 9–10 (Recess), Weeks 11–15 (advanced content + Assignment 2), Week 16 (revision/presentations), Week 17 (exam). Aim for logical progression from foundational to complex topics.",
    tls: "Common pedagogies for technical modules include Direct Instruction (DI) for concepts, Problem-based Learning (PBL) for application, and Lab-based Learning (LL) for practical skills. If flipped learning is used, allocate OAL hours for pre-class content consumption and IPL hours for in-class application and discussion.",
    default: "I'm here to help you design your module. You can ask me about writing learning outcomes, structuring your assessment strategy, choosing teaching strategies, or aligning your module to NPGCs. What would you like help with?"
  }
};

// ─── Toast Notification ────────────────────────────────────────
function showToast(message) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2600);
}

// ─── Shimmer → Populate Pattern ────────────────────────────────
function showShimmer(container) {
  container.innerHTML = `
    <div class="skeleton skeleton-text" style="width:90%"></div>
    <div class="skeleton skeleton-text" style="width:100%"></div>
    <div class="skeleton skeleton-text" style="width:85%"></div>
    <div class="skeleton skeleton-text" style="width:95%"></div>
    <div class="skeleton skeleton-text"></div>
  `;
}

function simulateAIGenerate(targetEl, content, delay = 1400, onDone = null) {
  showShimmer(targetEl);
  setTimeout(() => {
    targetEl.innerHTML = '';
    if (onDone) onDone(content);
    else targetEl.textContent = content;
  }, delay);
}

// ─── AI Suggestion Card ─────────────────────────────────────────
function showSuggestion(container, { label = '✦ AI Suggestion', body, onAccept, onEdit, variant = 'blue' }) {
  const card = document.createElement('div');
  card.className = `ai-suggestion-card ${variant === 'purple' ? 'ai-purple' : ''}`;
  card.innerHTML = `
    <div class="ai-suggestion-header">
      <span class="sparkle">✦</span>
      <span class="ai-suggestion-label">${label}</span>
    </div>
    <div class="ai-suggestion-body">${body}</div>
    <div class="ai-suggestion-actions">
      <button class="btn btn-primary btn-sm accept-btn">Accept</button>
      ${onEdit ? `<button class="btn btn-secondary btn-sm edit-btn">Edit first</button>` : ''}
      <span class="ai-suggestion-dismiss">Dismiss ×</span>
    </div>
  `;
  card.querySelector('.accept-btn').addEventListener('click', () => {
    if (onAccept) onAccept();
    card.remove();
    showToast('✓ Suggestion accepted');
  });
  if (onEdit) {
    card.querySelector('.edit-btn').addEventListener('click', () => {
      const bodyEl = card.querySelector('.ai-suggestion-body');
      bodyEl.contentEditable = 'true';
      bodyEl.style.border = '1px solid var(--color-accent)';
      bodyEl.style.borderRadius = '4px';
      bodyEl.style.padding = '6px';
      bodyEl.focus();
      card.querySelector('.edit-btn').textContent = 'Accept edited';
      card.querySelector('.edit-btn').addEventListener('click', () => {
        if (onAccept) onAccept(bodyEl.textContent);
        card.remove();
        showToast('✓ Edited suggestion accepted');
      }, { once: true });
    }, { once: true });
  }
  card.querySelector('.ai-suggestion-dismiss').addEventListener('click', () => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(-4px)';
    card.style.transition = 'all 150ms ease';
    setTimeout(() => card.remove(), 160);
  });
  container.appendChild(card);
  return card;
}

// ─── AI Chat Sidebar ────────────────────────────────────────────
function initAIChat() {
  const sidebar = document.getElementById('ai-sidebar');
  const fab = document.getElementById('ai-fab');
  const closeBtn = document.getElementById('ai-sidebar-close');
  const sendBtn = document.getElementById('ai-send');
  const input = document.getElementById('ai-input');
  const messages = document.getElementById('ai-messages');

  function openSidebar() {
    if (sidebar) {
      sidebar.classList.remove('hidden');
      sidebar.style.display = 'flex';
    }
    if (fab) fab.style.display = 'none';
  }
  function closeSidebar() {
    if (sidebar) {
      sidebar.style.display = 'none';
    }
    if (fab) fab.style.display = 'flex';
  }

  if (fab) fab.addEventListener('click', openSidebar);
  if (closeBtn) closeBtn.addEventListener('click', closeSidebar);

  function getAIResponse(userMsg) {
    const lower = userMsg.toLowerCase();
    if (lower.includes('synopsis') || lower.includes('description')) return MOCK_DATA.chatResponses.synopsis;
    if (lower.includes('outcome') || lower.includes('mo') || lower.includes('learning')) return MOCK_DATA.chatResponses.outcomes;
    if (lower.includes('assessment') || lower.includes('quiz') || lower.includes('exam') || lower.includes('weight')) return MOCK_DATA.chatResponses.assessment;
    if (lower.includes('npgc') || lower.includes('graduate') || lower.includes('competenc')) return MOCK_DATA.chatResponses.npgc;
    if (lower.includes('schedule') || lower.includes('week') || lower.includes('topic')) return MOCK_DATA.chatResponses.schedule;
    if (lower.includes('pedagog') || lower.includes('teaching') || lower.includes('strategy') || lower.includes('tls') || lower.includes('flip')) return MOCK_DATA.chatResponses.tls;
    return MOCK_DATA.chatResponses.default;
  }

  function sendMessage() {
    if (!input || !messages) return;
    const text = input.value.trim();
    if (!text) return;

    // User bubble
    const userBubble = document.createElement('div');
    userBubble.className = 'ai-chat-bubble user';
    userBubble.textContent = text;
    messages.appendChild(userBubble);
    input.value = '';
    messages.scrollTop = messages.scrollHeight;

    // Typing indicator
    const typingEl = document.createElement('div');
    typingEl.className = 'ai-typing-dots';
    typingEl.innerHTML = `<div class="ai-typing-dot"></div><div class="ai-typing-dot"></div><div class="ai-typing-dot"></div>`;
    messages.appendChild(typingEl);
    messages.scrollTop = messages.scrollHeight;

    setTimeout(() => {
      typingEl.remove();
      const aiBubble = document.createElement('div');
      aiBubble.className = 'ai-chat-bubble assistant fade-in';
      aiBubble.textContent = getAIResponse(text);
      messages.appendChild(aiBubble);
      messages.scrollTop = messages.scrollHeight;
    }, 900 + Math.random() * 500);
  }

  if (sendBtn) sendBtn.addEventListener('click', sendMessage);
  if (input) input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  });
}

// ─── Weight Validator ───────────────────────────────────────────
function initWeightValidator(tableId, displayId) {
  const table = document.getElementById(tableId);
  const display = document.getElementById(displayId);
  if (!table || !display) return;

  function updateTotal() {
    const inputs = table.querySelectorAll('.weight-input');
    let total = 0;
    inputs.forEach(inp => { total += parseInt(inp.value) || 0; });
    display.textContent = `Total: ${total}%`;
    display.className = 'weight-total';
    if (total === 100) {
      display.classList.add('valid');
      display.textContent = `Total: ${total}% ✓`;
    } else if (total > 100) {
      display.classList.add('invalid');
      display.textContent = `Total: ${total}% — exceeds 100% ✗`;
    } else {
      display.classList.add('partial');
      display.textContent = `Total: ${total}% — must equal 100%`;
    }
  }

  table.addEventListener('input', (e) => {
    if (e.target.classList.contains('weight-input')) updateTotal();
  });
  updateTotal();
}

// ─── NPGC Coverage Warnings ─────────────────────────────────────
function initNPGCWarnings(matrixId, warningContainerId) {
  const matrix = document.getElementById(matrixId);
  const warningContainer = document.getElementById(warningContainerId);
  if (!matrix || !warningContainer) return;

  const npgcNames = ['Domain Competencies', 'Critical Thinking', 'Communication', 'Collaboration', 'Lifelong Learning'];

  function checkCoverage() {
    const coverage = [0, 0, 0, 0, 0];
    matrix.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      if (cb.checked) {
        const npgcIdx = parseInt(cb.dataset.npgc) - 1;
        if (npgcIdx >= 0 && npgcIdx < 5) coverage[npgcIdx]++;
      }
    });

    warningContainer.innerHTML = '';
    coverage.forEach((count, i) => {
      if (count === 0) {
        const warn = document.createElement('div');
        warn.className = 'alert-card warning mt-2';
        warn.innerHTML = `
          <span class="alert-icon">⚠</span>
          <div class="alert-content">
            <div class="alert-title">NPGC${i+1} not covered</div>
            <div class="alert-desc">${npgcNames[i]} — no module outcome maps to this competency.</div>
          </div>`;
        warningContainer.appendChild(warn);
      }
    });
  }

  matrix.addEventListener('change', checkCoverage);
  checkCoverage();
}

// ─── Toggle handler helper ──────────────────────────────────────
function initToggleReveal(toggleId, targetId, activeClass = 'open') {
  const toggle = document.getElementById(toggleId);
  const target = document.getElementById(targetId);
  if (!toggle || !target) return;
  toggle.addEventListener('change', () => {
    if (toggle.checked) {
      target.style.maxHeight = target.scrollHeight + 'px';
      target.style.opacity = '1';
      target.classList.add(activeClass);
    } else {
      target.style.maxHeight = '0';
      target.style.opacity = '0';
      target.classList.remove(activeClass);
    }
  });
  if (!toggle.checked) {
    target.style.maxHeight = '0';
    target.style.opacity = '0';
    target.style.overflow = 'hidden';
    target.style.transition = 'max-height 0.35s ease, opacity 0.25s ease';
  }
}

// ─── Phase accordion ────────────────────────────────────────────
function initPhaseAccordion() {
  document.querySelectorAll('.sl-phase-header').forEach(header => {
    header.addEventListener('click', () => {
      const body = header.nextElementSibling;
      const isOpen = body.classList.contains('open');
      body.classList.toggle('open', !isOpen);
      const chevron = header.querySelector('.phase-chevron');
      if (chevron) chevron.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
    });
  });
}

// ─── Chip multi-select ──────────────────────────────────────────
function initChipSelect(groupId) {
  const group = document.getElementById(groupId);
  if (!group) return;
  group.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('selected');
    });
  });
}

// ─── MO Coverage matrix cell toggle ────────────────────────────
function initMOMatrix(tableId) {
  const table = document.getElementById(tableId);
  if (!table) return;
  table.querySelectorAll('.mo-cell').forEach(cell => {
    cell.addEventListener('click', () => {
      const isYes = cell.querySelector('.mo-yes');
      if (isYes) {
        cell.innerHTML = '<span class="mo-no">·</span>';
      } else {
        cell.innerHTML = '<span class="mo-yes">Y</span>';
      }
    });
  });
}

// ─── Stepper ────────────────────────────────────────────────────
function initSteppers() {
  document.querySelectorAll('.stepper-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.parentElement.querySelector('.stepper-input');
      if (!input) return;
      let val = parseInt(input.value) || 0;
      if (btn.textContent === '+') val++;
      else val = Math.max(0, val - 1);
      input.value = val;
      input.dispatchEvent(new Event('change'));
    });
  });
}

// ─── Inline module title editing ───────────────────────────────
function initInlineTitleEdit() {
  const titleEl = document.getElementById('module-title-edit');
  if (!titleEl) return;
  titleEl.addEventListener('click', () => {
    titleEl.contentEditable = 'true';
    titleEl.classList.add('editing');
    titleEl.focus();
  });
  titleEl.addEventListener('blur', () => {
    titleEl.contentEditable = 'false';
    titleEl.classList.remove('editing');
    showToast('Module title updated');
  });
  titleEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); titleEl.blur(); }
  });
}

// ─── Wizard modal ───────────────────────────────────────────────
function initWizard(modalId, openBtnId) {
  const modal = document.getElementById(modalId);
  const openBtn = document.getElementById(openBtnId);
  if (!modal || !openBtn) return;

  let currentStep = 1;
  const totalSteps = 4;

  function goToStep(n) {
    currentStep = Math.max(1, Math.min(totalSteps, n));
    modal.querySelectorAll('.wizard-pane').forEach((pane, i) => {
      pane.classList.toggle('active', i + 1 === currentStep);
    });
    modal.querySelectorAll('.wizard-step').forEach((step, i) => {
      const num = i + 1;
      step.classList.remove('done', 'active');
      if (num < currentStep) step.classList.add('done');
      else if (num === currentStep) step.classList.add('active');
    });
    modal.querySelectorAll('.wizard-connector').forEach((c, i) => {
      c.classList.toggle('done', i + 1 < currentStep);
    });
    // Update buttons
    const prevBtn = modal.querySelector('.wizard-prev');
    const nextBtn = modal.querySelector('.wizard-next');
    if (prevBtn) prevBtn.style.visibility = currentStep === 1 ? 'hidden' : 'visible';
    if (nextBtn) {
      if (currentStep === totalSteps) {
        nextBtn.textContent = 'Open in Editor →';
        nextBtn.className = 'btn btn-primary btn-lg';
        nextBtn.onclick = () => { window.location.href = 'mdd-editor.html'; };
      } else {
        nextBtn.textContent = 'Next →';
        nextBtn.className = 'btn btn-primary';
      }
    }
  }

  openBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
    goToStep(1);
  });
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
  });
  modal.querySelector('.wizard-prev')?.addEventListener('click', () => goToStep(currentStep - 1));
  modal.querySelector('.wizard-next')?.addEventListener('click', () => goToStep(currentStep + 1));
  modal.querySelector('.modal-close')?.addEventListener('click', () => modal.classList.add('hidden'));
  goToStep(1);
}

// ─── AI Check panel (sidebar) ───────────────────────────────────
function initAICheckPanel(btnId, panelId) {
  const btn = document.getElementById(btnId);
  const panel = document.getElementById(panelId);
  if (!btn || !panel) return;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    panel.classList.toggle('hidden');
  });
  document.addEventListener('click', () => panel.classList.add('hidden'));
  panel.addEventListener('click', (e) => e.stopPropagation());
}

// ─── Export on review page ─────────────────────────────────────
function initExportButtons() {
  document.querySelectorAll('.export-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const original = this.innerHTML;
      this.innerHTML = '<span class="btn-text">Exporting</span>';
      this.disabled = true;
      setTimeout(() => {
        this.innerHTML = '✓ Downloaded';
        this.classList.add('btn-secondary');
        this.classList.remove('btn-primary', 'btn-ai');
        setTimeout(() => {
          this.innerHTML = original;
          this.disabled = false;
          this.classList.remove('btn-secondary');
        }, 3000);
      }, 1800);
    });
  });
}

// ─── Completion Ring (SVG) ─────────────────────────────────────
function initCompletionRing(ringId, percent) {
  const ring = document.getElementById(ringId);
  if (!ring) return;
  const r = 40;
  const circumference = 2 * Math.PI * r;
  const fill = ring.querySelector('.completion-ring-fill');
  if (!fill) return;
  fill.style.strokeDasharray = circumference;
  fill.style.strokeDashoffset = circumference;
  if (percent >= 100) fill.classList.add('complete');
  setTimeout(() => {
    const offset = circumference - (percent / 100) * circumference;
    fill.style.strokeDashoffset = offset;
  }, 300);
}

// ─── Chat Onboarding (chat-first MDD generator) ────────────────
// Wires up the chat-onboarding.html page:
//  · quick-reply chip toggle
//  · composer auto-grow + faux send (echoes a user bubble + scripted AI reply)
//  · auto-scroll to bottom on load (so the "Draft Ready" card is visible)
function initChatOnboarding() {
  // Quick-reply chips: simple multi-select toggle
  document.querySelectorAll('.quickreply-chip').forEach(chip => {
    chip.addEventListener('click', () => chip.classList.toggle('selected'));
  });

  // Composer
  const input = document.getElementById('chat-input');
  const send = document.getElementById('chat-send');
  const transcript = document.getElementById('chat-transcript');

  function appendUserMsg(text) {
    if (!transcript) return;
    const msg = document.createElement('div');
    msg.className = 'chat-msg user';
    msg.innerHTML = `
      <div class="chat-avatar user">ML</div>
      <div class="chat-bubble user">${text}</div>`;
    transcript.appendChild(msg);
    transcript.scrollTop = transcript.scrollHeight;
  }

  function appendAssistantMsg(text) {
    if (!transcript) return;
    const msg = document.createElement('div');
    msg.className = 'chat-msg';
    msg.innerHTML = `
      <div class="chat-avatar assistant">✦</div>
      <div class="chat-bubble assistant">${text}</div>`;
    transcript.appendChild(msg);
    transcript.scrollTop = transcript.scrollHeight;
  }

  function fauxSend() {
    if (!input || !input.value.trim()) return;
    const userText = input.value.trim();
    appendUserMsg(userText);
    input.value = '';
    input.style.height = 'auto';
    // Mock scripted AI reply after a beat
    setTimeout(() => {
      appendAssistantMsg(`Noted — I'll fold that into your MDD draft. Anything else, or shall I generate the starter document?`);
    }, 700);
  }

  send?.addEventListener('click', fauxSend);
  input?.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); fauxSend(); }
  });

  // Auto-grow composer
  input?.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 160) + 'px';
  });

  // Scroll transcript to bottom on load
  if (transcript) transcript.scrollTop = transcript.scrollHeight;
}

// ─── Prompt chip → pre-fill chat input ────────────────────────
// Shared helper for the smarter section sidebars.
function initPromptChips(inputId = 'ai-input') {
  document.querySelectorAll('.prompt-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const input = document.getElementById(inputId);
      if (input) { input.value = chip.textContent.trim(); input.focus(); }
    });
  });
}

// ─── Save Draft simulation ──────────────────────────────────────
function initSaveDraft(btnId) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  btn.addEventListener('click', () => {
    const orig = btn.textContent;
    btn.textContent = 'Saving...';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = '✓ Saved';
      setTimeout(() => { btn.textContent = orig; btn.disabled = false; }, 1500);
    }, 800);
  });
}

export {
  MOCK_DATA,
  showToast,
  showShimmer,
  simulateAIGenerate,
  showSuggestion,
  initAIChat,
  initWeightValidator,
  initNPGCWarnings,
  initToggleReveal,
  initPhaseAccordion,
  initChipSelect,
  initMOMatrix,
  initSteppers,
  initInlineTitleEdit,
  initWizard,
  initAICheckPanel,
  initExportButtons,
  initCompletionRing,
  initSaveDraft,
  initChatOnboarding,
  initPromptChips
};
