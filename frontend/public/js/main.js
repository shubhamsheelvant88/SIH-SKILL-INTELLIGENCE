document.addEventListener("DOMContentLoaded", () => {
  // 1. Highlight active navigation links based on current path
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link, .navbar-nav .dropdown-item");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPath) {
      link.classList.add("active");
      const parentDropdown = link.closest(".dropdown");
      if (parentDropdown) {
        const toggle = parentDropdown.querySelector(".dropdown-toggle");
        if (toggle) toggle.classList.add("active");
      }
    }
  });

  // 2. Enable Bootstrap tooltips if any
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.forEach((el) => {
    if (window.bootstrap && window.bootstrap.Tooltip) {
      new window.bootstrap.Tooltip(el);
    }
  });

  // 3. Interactive Job Role Assessment Logic
  initAssessment();
});

function initAssessment() {
  const assessmentDataElement = document.getElementById("assessment-data");
  if (!assessmentDataElement) return;

  let roles = {};
  try {
    roles = JSON.parse(assessmentDataElement.textContent);
  } catch (e) {
    console.error("Failed to parse assessment data", e);
    return;
  }

  const roleKeys = Object.keys(roles);
  if (roleKeys.length === 0) return;

  let currentRoleId = roleKeys[0];
  let userAnswers = {}; // { q1: 'yes', q2: 'no', ... }

  // DOM Elements
  const questionsContainer = document.getElementById("questions-container");
  const answeredCounter = document.getElementById("answered-counter");
  const summaryTextEl = document.getElementById("assessment-summary-text");
  const analyzeBtnEl = document.getElementById("btn-analyze-skill-gap");
  const roleButtons = document.querySelectorAll(".role-select-btn");
  const activeRoleNameEl = document.getElementById("active-role-name");
  const activeRoleSectorEl = document.getElementById("active-role-sector");
  const activeRoleDescEl = document.getElementById("active-role-desc");

  // Switch Active Role
  function switchRole(roleId) {
    currentRoleId = roleId;
    userAnswers = {};
    const role = roles[roleId];
    if (!role) return;

    // Update active button styles
    roleButtons.forEach((btn) => {
      if (btn.dataset.roleId === roleId) {
        btn.classList.remove("btn-light", "text-dark");
        btn.classList.add("btn-primary", "text-white", "active");
      } else {
        btn.classList.remove("btn-primary", "text-white", "active");
        btn.classList.add("btn-light", "text-dark");
      }
    });

    // Update Role Info Header
    if (activeRoleNameEl) activeRoleNameEl.textContent = role.name;
    if (activeRoleSectorEl) activeRoleSectorEl.textContent = role.sector;
    if (activeRoleDescEl) activeRoleDescEl.textContent = role.description;

    renderQuestions();
    updateAssessmentStatus();
  }

  // Render 6 YES/NO Questions
  function renderQuestions() {
    const role = roles[currentRoleId];
    if (!role || !questionsContainer) return;

    questionsContainer.innerHTML = "";

    role.questions.forEach((q, index) => {
      const card = document.createElement("div");
      card.className = "card question-card border p-3 shadow-sm";
      card.dataset.questionId = q.id;

      const currentAnswer = userAnswers[q.id];

      card.innerHTML = `
        <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
          <div class="d-flex align-items-center gap-2">
            <span class="badge bg-secondary">Q${index + 1}</span>
            <span class="badge bg-light text-dark border">${escapeHtml(q.skill)}</span>
          </div>
          <span class="badge ${q.priority === "High" ? "bg-danger" : q.priority === "Medium" ? "bg-warning text-dark" : "bg-secondary"}">
            ${q.priority} Demand (${q.demand}%)
          </span>
        </div>
        <p class="mb-3 text-dark fw-medium fs-6">${escapeHtml(q.question)}</p>
        <div class="d-flex gap-2">
          <button
            type="button"
            class="btn flex-fill py-2 btn-ans-yes ${currentAnswer === 'yes' ? 'btn-success text-white shadow' : 'btn-outline-success'}"
            data-qid="${q.id}"
            data-value="yes"
          >
            ✓ YES, I Have This Skill
          </button>
          <button
            type="button"
            class="btn flex-fill py-2 btn-ans-no ${currentAnswer === 'no' ? 'btn-danger text-white shadow' : 'btn-outline-danger'}"
            data-qid="${q.id}"
            data-value="no"
          >
            ✗ NO, Skill Gap
          </button>
        </div>
      `;

      questionsContainer.appendChild(card);
    });

    // Attach click listeners to YES/NO buttons
    questionsContainer.querySelectorAll("button[data-value]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const qid = e.currentTarget.dataset.qid;
        const val = e.currentTarget.dataset.value;
        userAnswers[qid] = val;
        renderQuestions();
        updateAssessmentStatus();
        syncWithBackend(currentRoleId, userAnswers);
      });
    });
  }

  // Update Status and Action Button
  function updateAssessmentStatus() {
    const role = roles[currentRoleId];
    if (!role) return;

    const totalQuestions = role.questions.length;
    const answeredKeys = Object.keys(userAnswers);
    const answeredCount = answeredKeys.length;

    if (answeredCounter) {
      answeredCounter.textContent = `${answeredCount} of ${totalQuestions} answered`;
    }

    let yesCount = 0;
    let noCount = 0;
    answeredKeys.forEach((k) => {
      if (userAnswers[k] === "yes") yesCount++;
      if (userAnswers[k] === "no") noCount++;
    });

    if (summaryTextEl) {
      if (answeredCount === 0) {
        summaryTextEl.textContent = "Mark your answers above to customize your Skill Gap Analysis, then click below.";
      } else if (answeredCount < totalQuestions) {
        summaryTextEl.innerHTML = `<strong>${answeredCount} of ${totalQuestions}</strong> marked (${yesCount} acquired, ${noCount} gaps). You can finish answering or click below to analyze now.`;
      } else {
        summaryTextEl.innerHTML = `🎉 <strong>All ${totalQuestions} questions marked!</strong> Verified ${yesCount} skills with ${noCount} detected skill gaps. Click below to inspect your analysis.`;
      }
    }

    if (analyzeBtnEl) {
      analyzeBtnEl.href = `/skill-gap?role=${encodeURIComponent(currentRoleId)}`;
    }
  }

  // Quick action buttons
  const btnQuickYes = document.getElementById("btn-quick-yes");
  const btnQuickNo = document.getElementById("btn-quick-no");
  const btnReset = document.getElementById("btn-reset-answers");

  if (btnQuickYes) {
    btnQuickYes.addEventListener("click", () => {
      const role = roles[currentRoleId];
      if (!role) return;
      role.questions.forEach((q) => {
        userAnswers[q.id] = "yes";
      });
      renderQuestions();
      updateAssessmentStatus();
      syncWithBackend(currentRoleId, userAnswers);
    });
  }

  if (btnQuickNo) {
    btnQuickNo.addEventListener("click", () => {
      const role = roles[currentRoleId];
      if (!role) return;
      role.questions.forEach((q) => {
        userAnswers[q.id] = "no";
      });
      renderQuestions();
      updateAssessmentStatus();
      syncWithBackend(currentRoleId, userAnswers);
    });
  }

  if (btnReset) {
    btnReset.addEventListener("click", () => {
      userAnswers = {};
      renderQuestions();
      updateAssessmentStatus();
      syncWithBackend(currentRoleId, userAnswers);
    });
  }

  // Bind Role Select Buttons
  roleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const roleId = btn.dataset.roleId;
      if (roleId && roleId !== currentRoleId) {
        switchRole(roleId);
      }
    });
  });

  // Background sync with backend evaluation API
  async function syncWithBackend(roleId, answers) {
    try {
      await fetch("/api/assessment/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roleId, answers })
      });
    } catch (err) {
      console.warn("Backend evaluation sync notice:", err.message);
    }
  }

  // Initial render
  switchRole(currentRoleId);
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
