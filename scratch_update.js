const fs = require('fs');

let data = fs.readFileSync('plan-direction.html', 'utf8');

// 1. Update Navigation texts
data = data.replace(
  '<button class="thread-link" data-thread="mapping" type="button"><span class="tl-num">4b.</span><span class="tl-name">MLO Mapping to Course Outcomes</span></button>',
  '<button class="thread-link" data-thread="mapping" type="button"><span class="tl-num">4b.</span><span class="tl-name">Module Learning Outcomes Mapping to Course Outcomes</span></button>'
);
data = data.replace(
  '<button class="thread-link" data-thread="gradskills" type="button"><span class="tl-num">5.</span><span class="tl-name">MLO Mapping to NP Graduate Skills &amp; Competencies</span></button>',
  '<button class="thread-link" data-thread="gradskills" type="button"><span class="tl-num">5.</span><span class="tl-name">Mapping Module Learning Outcome to NP Graduate Skills &amp; Competencies</span></button>'
);

data = data.replace(
  '<button data-section="mapping" type="button">4b. MLO Mapping to Course Outcomes</button>',
  '<button data-section="mapping" type="button">4b. Module Learning Outcomes Mapping to Course Outcomes</button>'
);
data = data.replace(
  '<button data-section="gradskills" type="button">5. MLO Mapping to NP Graduate Skills &amp; Competencies</button>',
  '<button data-section="gradskills" type="button">5. Mapping Module Learning Outcome to NP Graduate Skills &amp; Competencies</button>'
);

// 2. Right Pane Skeletonization
// Synopsis
data = data.replace(
  '<p class="np-body-italic">This module prepares students to manage critically ill patients across major body systems, integrating pathophysiology, clinical reasoning, and advanced nursing practice in the critical care setting.</p>',
  '<p class="np-body-italic">████████████████████████████████████████████████████████████████████████</p>'
);

// MLOs
data = data.replace(
  '<td contenteditable="true">Identify and escalate early warning signs using structured clinical reasoning frameworks.</td>',
  '<td contenteditable="true">████████████████████████████████████████████████████</td>'
);
data = data.replace(
  '<td contenteditable="true">Apply critical care communication protocols under high-acuity time pressure.</td>',
  '<td contenteditable="true">████████████████████████████████████████████████</td>'
);
data = data.replace(
  '<td contenteditable="true">Demonstrate safe handover practice with traceable escalation rationale.</td>',
  '<td contenteditable="true">████████████████████████████████████████████</td>'
);

// Course Outcomes
data = data.replace(
  '<td contenteditable="true">Demonstrate clinical decision-making in critical care contexts.</td>',
  '<td contenteditable="true">████████████████████████████████████████</td>'
);
data = data.replace(
  '<td contenteditable="true">Apply escalation protocols using structured clinical communication.</td>',
  '<td contenteditable="true">████████████████████████████████████████████████</td>'
);
data = data.replace(
  '<td contenteditable="true">Evaluate patient data to justify interdisciplinary escalation decisions.</td>',
  '<td contenteditable="true">████████████████████████████████████████████</td>'
);

// Content
data = data.replace(
  '<td contenteditable="true">Foundations — Pathophysiology, Monitoring &amp; Normal Ranges</td>',
  '<td contenteditable="true">████████████████████████████████████████</td>'
);
data = data.replace(
  '<td contenteditable="true">Diagnostics Cycle 1 + Guided Asynchronous Review</td>',
  '<td contenteditable="true">████████████████████████████████████████████████</td>'
);
data = data.replace(
  '<td contenteditable="true">Simulation Series — Low-acuity to High-acuity Progressive</td>',
  '<td contenteditable="true">████████████████████████████████████████████</td>'
);

// Assessment
data = data.replace(
  '<td contenteditable="true">Live Simulation Stations</td>',
  '<td contenteditable="true">████████████████████████████████</td>'
);
data = data.replace(
  '<td contenteditable="true">Written Reasoning Memo</td>',
  '<td contenteditable="true">████████████████████████████</td>'
);

// 3. Section Titles
data = data.replace(
  '<h3 class="section-title">4b. MLO MAPPING TO COURSE OUTCOMES</h3>',
  '<h3 class="section-title">4b. MODULE LEARNING OUTCOMES MAPPING TO COURSE OUTCOMES</h3>'
);
data = data.replace(
  '<h3 class="section-title">5. MLO MAPPING TO NP GRADUATE SKILLS &amp; COMPETENCIES</h3>',
  '<h3 class="section-title">5. MAPPING MODULE LEARNING OUTCOME TO NP GRADUATE SKILLS &amp; COMPETENCIES</h3>'
);

// 4. JS railLabels
data = data.replace(
  'mapping:      "MLO Mapping to Course Outcomes",\n      gradskills:   "Graduate Skills Mapping",\n      content:      "Topics & Teaching Schedule",',
  'mapping:      "Module Learning Outcomes Mapping to Course Outcomes",\n      gradskills:   "Mapping Module Learning Outcome to NP Graduate Skills & Competencies",\n      content:      "Module Topics & Teaching Schedule",'
);
data = data.replace(
  'mapping:      "MLO Mapping to Course Outcomes",\r\n      gradskills:   "Graduate Skills Mapping",\r\n      content:      "Topics & Teaching Schedule",',
  'mapping:      "Module Learning Outcomes Mapping to Course Outcomes",\r\n      gradskills:   "Mapping Module Learning Outcome to NP Graduate Skills & Competencies",\r\n      content:      "Module Topics & Teaching Schedule",'
);


// 5. JS createTurn replacement
const oldCreateTurn = `function createTurn(role, copy) {
      const turn = document.createElement("div");
      turn.className = "chat-turn " + (role === "You" ? "you" : "ai");

      const label = document.createElement("div");
      label.className = "chat-role";
      label.textContent = role;

      const bubble = document.createElement("div");
      bubble.className = "chat-bubble";
      bubble.textContent = copy;

      turn.appendChild(label);
      turn.appendChild(bubble);
      return turn;
    }`;

const newCreateTurn = `function createTurn(role, copy, threadKey) {
      const entry = document.createElement("div");
      entry.className = "decision-log-entry " + (role === "You" ? "user" : "ai");

      const label = document.createElement("div");
      label.className = "decision-log-label";

      if (role === "You") {
        label.textContent = "Decision Applied";
      } else {
        const labels = {
          welcome: "Recommended Curriculum Direction",
          synopsis: "Synopsis Guidance",
          skills: "Proposed Skills Alignment",
          outcomes: "Suggested Outcome Scaffolding",
          co_outcomes: "Course Alignment Insight",
          mapping: "Mapping Rationale",
          gradskills: "Graduate Skills Coverage",
          content: "Teaching Schedule Implications",
          hours: "Workload Analysis",
          teaching: "Teaching Strategy Implications",
          assessment: "Suggested Assessment Pattern",
          integrity: "AI Policy Guidance",
          references: "Recommended Resources"
        };
        label.textContent = labels[threadKey] || "Design Recommendation";
      }

      const bubble = document.createElement("div");
      bubble.className = "decision-log-copy";
      bubble.textContent = copy;

      entry.appendChild(label);
      entry.appendChild(bubble);
      return entry;
    }`;
data = data.split(oldCreateTurn.replace(/\n/g, '\r\n')).join(newCreateTurn);
data = data.split(oldCreateTurn).join(newCreateTurn);


// 6. Fix createTurn calls
data = data.split('return createTurn("AI", copy);').join('return createTurn("AI", copy, activeThreadKey);');
data = data.split('threadCanvas.appendChild(createTurn("You", state.choice));').join('threadCanvas.appendChild(createTurn("You", state.choice, "welcome"));');
data = data.split('threadCanvas.appendChild(createTurn("AI", state.aiReply));').join('threadCanvas.appendChild(createTurn("AI", state.aiReply, "welcome"));');
data = data.split('threadCanvas.appendChild(createTurn("You", state.questionChoice));').join('threadCanvas.appendChild(createTurn("You", state.questionChoice, "welcome"));');
data = data.split('threadCanvas.appendChild(createTurn("AI", state.questionReply));').join('threadCanvas.appendChild(createTurn("AI", state.questionReply, "welcome"));');


// 7. triggerDraftUpdate enhancement
const oldTrigger = `function triggerDraftUpdate(threadKey, note) {
      if (threadThinking) {
        threadThinking.textContent = note || "Draft updated.";
        threadThinking.classList.add("show");
        window.setTimeout(() => {
          threadThinking.classList.remove("show");
        }, 1200);
      }
    }`;
const newTrigger = `function triggerDraftUpdate(threadKey, note) {
      if (threadThinking) {
        threadThinking.textContent = note || "Draft updated.";
        threadThinking.classList.add("show");
        window.setTimeout(() => {
          threadThinking.classList.remove("show");
        }, 1200);
      }
      
      const secId = sectionIdForThread(threadKey);
      const section = document.getElementById(secId);
      if (section) {
        section.classList.add("syncing");
        
        let updateLabel = section.querySelector(".inline-sync-label");
        if (!updateLabel) {
           updateLabel = document.createElement("div");
           updateLabel.className = "inline-sync-label";
           section.insertBefore(updateLabel, section.firstChild);
        }
        updateLabel.textContent = "Updating " + (sectionData[secId] ? sectionData[secId].title : "Section") + "...";
        updateLabel.style.display = "block";
        
        window.setTimeout(() => {
          section.classList.remove("syncing");
          if (updateLabel) updateLabel.style.display = "none";
        }, 1500);
      }
    }`;
data = data.split(oldTrigger.replace(/\n/g, '\r\n')).join(newTrigger);
data = data.split(oldTrigger).join(newTrigger);

// 8. Sync styles injection
const syncStyles = `
    .mdd-ctx-body {
      padding: 2px 10px 8px;
    }
    .inline-sync-label {
      position: absolute;
      top: 10px;
      right: 10px;
      background: #fffbeb;
      border: 1px solid #f0d899;
      color: #8f5615;
      font-size: 10.5px;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 999px;
      display: none;
      z-index: 10;
    }
    @keyframes flashHighlight {
      0% { background-color: transparent; }
      20% { background-color: #fff9e6; outline: 2px solid #f0d899; }
      100% { background-color: transparent; outline: 2px solid transparent; }
    }
    .module-section.syncing {
      animation: flashHighlight 1.5s ease-out;
    }
    [contenteditable="true"] {
      cursor: text;
      transition: background-color 0.2s, box-shadow 0.2s;
    }
    [contenteditable="true"]:hover {
      background-color: #f8fbff;
      box-shadow: inset 0 0 0 1px #d6e3f0;
      border-radius: 4px;
    }
    [contenteditable="true"]:focus {
      outline: none;
      background-color: #fff;
      box-shadow: inset 0 0 0 1.5px var(--brand);
      border-radius: 4px;
    }
`;

data = data.replace('.mdd-ctx-body {\n      padding: 2px 10px 8px;\n    }', syncStyles);
data = data.replace('.mdd-ctx-body {\r\n      padding: 2px 10px 8px;\r\n    }', syncStyles);


fs.writeFileSync('plan-direction.html', data);
