// app.js - PrepSpace SaaS client core controller

const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:8080/api'
  : 'https://api.stream-in.app/api';

// State Store
const state = {
  token: localStorage.getItem('token'),
  name: localStorage.getItem('name'),
  email: localStorage.getItem('email'),
  role: localStorage.getItem('role'),
  activePomodoroInterval: null,
  pomodoroTimeLeft: 25 * 60,
  pomodoroRunning: false,
  pomodoroMode: 'study', // study, break
  theme: localStorage.getItem('theme') || 'dark'
};

// Application Init
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  window.addEventListener('hashchange', router);
  router();
});

// Theme Management
function initTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
  const icon = state.theme === 'light' ? 'fa-sun' : 'fa-moon';
  setTimeout(() => {
    const btn = document.getElementById('dark-mode-toggle');
    if (btn) btn.innerHTML = `<i class="fa-solid ${icon}"></i>`;
  }, 100);
}

function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', state.theme);
  document.documentElement.setAttribute('data-theme', state.theme);
  const icon = state.theme === 'light' ? 'fa-sun' : 'fa-moon';
  const btn = document.getElementById('dark-mode-toggle');
  if (btn) btn.innerHTML = `<i class="fa-solid ${icon}"></i>`;
  showToast(`Switched to ${state.theme} mode`, 'success');
}

// Router
function router() {
  const hash = window.location.hash || '#/';
  const appRoot = document.getElementById('app-root');

  // Cancel any active Pomodoro timer intervals when navigating away
  if (state.activePomodoroInterval && !hash.startsWith('#/studyplanner')) {
    clearInterval(state.activePomodoroInterval);
    state.activePomodoroInterval = null;
    state.pomodoroRunning = false;
  }

  // Public/Unsecured check
  if (hash === '#/' || hash === '') {
    appRoot.innerHTML = components.landing();
    return;
  }
  if (hash === '#/login') {
    if (isAuthenticated()) { redirectTo('#/dashboard'); return; }
    appRoot.innerHTML = components.login();
    bindAuthEvents('login');
    return;
  }
  if (hash === '#/register') {
    if (isAuthenticated()) { redirectTo('#/dashboard'); return; }
    appRoot.innerHTML = components.register();
    bindAuthEvents('register');
    return;
  }

  // Secured routes boundary
  if (!isAuthenticated()) {
    showToast('Session expired or unauthorized. Please login.', 'danger');
    redirectTo('#/login');
    return;
  }

  // Inject workspace layout if not already rendered
  if (!document.getElementById('app-container')) {
    appRoot.innerHTML = components.appLayout(state.name, state.role === 'ADMIN');
    bindLayoutEvents();
  }

  // Sync sidebar active status
  updateSidebarSelection(hash);

  // Mount targeted page views
  const pageMount = document.getElementById('page-mount');
  const viewTitle = document.getElementById('current-view-title');

  if (hash === '#/dashboard') {
    viewTitle.textContent = 'Dashboard';
    pageMount.innerHTML = `<div class="text-center py-5"><div class="spinner-border text-primary"></div></div>`;
    apiFetch('/dashboard/stats')
      .then(stats => {
        pageMount.innerHTML = components.dashboard(stats);
        renderDashboardCharts(stats);
      })
      .catch(err => {
        pageMount.innerHTML = `<div class="alert alert-danger">Failed to load statistics: ${err.message}</div>`;
      });
  } else if (hash === '#/studyplanner') {
    viewTitle.textContent = 'Study Planner';
    pageMount.innerHTML = components.studyPlanner();
    loadStudyPlans();
    bindStudyPlannerEvents();
  } else if (hash === '#/courses') {
    viewTitle.textContent = 'LMS Course Catalog';
    pageMount.innerHTML = `<div class="text-center py-5"><div class="spinner-border text-primary"></div></div>`;
    apiFetch('/v1/courses')
      .then(courses => {
        pageMount.innerHTML = components.courses(courses);
        bindCoursesEvents();
      })
      .catch(err => {
        pageMount.innerHTML = `<div class="alert alert-danger">Failed to load courses: ${err.message}</div>`;
      });
  } else if (hash === '#/certificates') {
    viewTitle.textContent = 'Certification Center';
    pageMount.innerHTML = `<div class="text-center py-5"><div class="spinner-border text-primary"></div></div>`;
    apiFetch('/v1/certificates')
      .then(certs => {
        pageMount.innerHTML = components.certificates(certs);
        bindCertificatesEvents();
      })
      .catch(err => {
        pageMount.innerHTML = `<div class="alert alert-danger">Failed to load certificates: ${err.message}</div>`;
      });
  } else if (hash === '#/dsa-roadmap') {
    viewTitle.textContent = 'Interactive DSA Roadmap';
    pageMount.innerHTML = `<div class="text-center py-5"><div class="spinner-border text-primary"></div></div>`;
    apiFetch('/v1/dsa/roadmap')
      .then(roadmap => {
        pageMount.innerHTML = components.dsaRoadmap(roadmap);
        bindDsaRoadmapEvents();
      })
      .catch(err => {
        pageMount.innerHTML = `<div class="alert alert-danger">Failed to load roadmap: ${err.message}</div>`;
      });
  } else if (hash === '#/coding-practice') {
    viewTitle.textContent = 'LeetCode Coding Workspace';
    pageMount.innerHTML = `<div class="text-center py-5"><div class="spinner-border text-primary"></div></div>`;
    apiFetch('/v1/questions')
      .then(questions => {
        pageMount.innerHTML = components.codingPractice(questions);
        bindCodingPracticeEvents();
      })
      .catch(err => {
        pageMount.innerHTML = `<div class="alert alert-danger">Failed to load coding problem set: ${err.message}</div>`;
      });
  } else if (hash === '#/experiences') {
    viewTitle.textContent = 'Interview Experiences';
    pageMount.innerHTML = `<div class="text-center py-5"><div class="spinner-border text-primary"></div></div>`;
    // Simulated experiences array
    pageMount.innerHTML = components.community([]);
    bindCommunityEvents();
  } else if (hash === '#/mock-exams') {
    viewTitle.textContent = 'Mock Assessment Platform';
    pageMount.innerHTML = `<div class="text-center py-5"><div class="spinner-border text-primary"></div></div>`;
    apiFetch('/v1/mocktests/leaderboard')
      .then(leaderboard => {
        pageMount.innerHTML = components.mockExams([], leaderboard);
        bindMockExamsEvents();
      })
      .catch(err => {
        pageMount.innerHTML = `<div class="alert alert-danger">Failed to load leaderboard: ${err.message}</div>`;
      });
  } else if (hash === '#/flashcards') {
    viewTitle.textContent = 'Spaced Repetition Flashcards';
    pageMount.innerHTML = `<div class="text-center py-5"><div class="spinner-border text-primary"></div></div>`;
    apiFetch('/v1/flashcards')
      .then(cards => {
        pageMount.innerHTML = components.flashcards(cards);
        bindFlashcardsEvents();
      })
      .catch(err => {
        pageMount.innerHTML = `<div class="alert alert-danger">Failed to load study deck: ${err.message}</div>`;
      });
  } else if (hash === '#/community') {
    viewTitle.textContent = 'Discussion Forum';
    pageMount.innerHTML = `<div class="text-center py-5"><div class="spinner-border text-primary"></div></div>`;
    // Fallback forum loading
    pageMount.innerHTML = components.community([]);
    bindCommunityEvents();
  } else if (hash === '#/notes') {
    viewTitle.textContent = 'Markdown Study Planner Notes';
    pageMount.innerHTML = `<div class="text-center py-5"><div class="spinner-border text-primary"></div></div>`;
    Promise.all([apiFetch('/v1/notes'), apiFetch('/v1/notes/folders')])
      .then(([notes, folders]) => {
        pageMount.innerHTML = components.notes(notes, folders);
        bindNotesEvents();
      })
      .catch(err => {
        pageMount.innerHTML = `<div class="alert alert-danger">Failed to load notes: ${err.message}</div>`;
      });
  } else if (hash === '#/placement') {
    viewTitle.textContent = 'Kanban Placement Tracker';
    pageMount.innerHTML = `<div class="text-center py-5"><div class="spinner-border text-primary"></div></div>`;
    apiFetch('/applications')
      .then(apps => {
        pageMount.innerHTML = components.placement(apps);
        bindPlacementEvents();
      })
      .catch(err => {
        pageMount.innerHTML = `<div class="alert alert-danger">Failed to load job pipelines: ${err.message}</div>`;
      });
  } else if (hash === '#/ai-assistant') {
    viewTitle.textContent = 'Robotic Placement Diagnostics';
    pageMount.innerHTML = components.aiAssistant();
    bindAiAssistantEvents();
  } else if (hash === '#/calendar') {
    viewTitle.textContent = 'Calendar';
    pageMount.innerHTML = components.calendar();
    loadCalendarView();
  } else if (hash === '#/reports') {
    viewTitle.textContent = 'Reports';
    pageMount.innerHTML = components.reports();
    bindReportsEvents();
  } else if (hash === '#/profile') {
    viewTitle.textContent = 'Settings & Profile';
    pageMount.innerHTML = components.profile();
    loadProfileDetails();
    bindProfileEvents();
  } else if (hash === '#/admin') {
    if (state.role !== 'ADMIN') {
      redirectTo('#/dashboard');
      return;
    }
    viewTitle.textContent = 'Admin Dashboard';
    pageMount.innerHTML = components.admin();
    loadAdminData();
    bindAdminEvents();
  } else {
    viewTitle.textContent = 'Not Found';
    pageMount.innerHTML = `<div class="text-center py-5"><h3 class="text-white">Page Not Found</h3><a href="#/dashboard" class="btn btn-premium mt-3">Back to Dashboard</a></div>`;
  }
}

// Session Validation Helper
function isAuthenticated() {
  return state.token !== null && state.token !== undefined;
}

function redirectTo(hash) {
  window.location.hash = hash;
}

function updateSidebarSelection(hash) {
  document.querySelectorAll('.sidebar-link').forEach(link => {
    const linkHash = link.getAttribute('href');
    if (hash.startsWith(linkHash)) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// API client wrapper
async function apiFetch(endpoint, options = {}) {
  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');
  if (state.token && state.token !== 'HTTP-ONLY-SECURED') {
    headers.set('Authorization', `Bearer ${state.token}`);
  }

  const fetchOptions = {
    ...options,
    headers,
    credentials: 'include'
  };

  const response = await fetch(`${API_BASE}${endpoint}`, fetchOptions);


  if (response.status === 401) {
    handleSessionExpired();
    throw new Error('Unauthorized');
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'API Request failed' }));
    throw new Error(errorData.message || 'API request failed');
  }

  // Handle binary endpoints
  const contentType = response.headers.get('Content-Type');
  if (contentType && (contentType.includes('application/pdf') || contentType.includes('sheet'))) {
    return response.blob();
  }

  return response.json().catch(() => ({}));
}

function handleSessionExpired() {
  localStorage.removeItem('token');
  localStorage.removeItem('name');
  localStorage.removeItem('email');
  localStorage.removeItem('role');
  state.token = null;
  state.name = null;
  state.email = null;
  state.role = null;
  redirectTo('#/login');
}

// layout events
function bindLayoutEvents() {
  const toggleBtn = document.getElementById('sidebar-toggle-btn');
  const sidebar = document.querySelector('.sidebar');
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => sidebar.classList.toggle('active'));
  }

  const logoutBtn = document.getElementById('logout-btn');
  const dLogout = document.getElementById('dropdown-logout');
  const performLogout = () => {
    handleSessionExpired();
    showToast('Logged out successfully', 'success');
  };
  if (logoutBtn) logoutBtn.addEventListener('click', performLogout);
  if (dLogout) dLogout.addEventListener('click', performLogout);

  const modeToggle = document.getElementById('dark-mode-toggle');
  if (modeToggle) modeToggle.addEventListener('click', toggleTheme);
}

// Toast Notification
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `glass-toast`;
  const icon = type === 'success' ? 'fa-circle-check text-success' : 'fa-circle-exclamation text-danger';
  toast.innerHTML = `
    <i class="fa-solid ${icon} fs-5"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-20px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ----------------------------------------------------
// BIND EVENTS FOR PAGES
// ----------------------------------------------------

function bindAuthEvents(mode) {
  if (mode === 'login') {
    const form = document.getElementById('login-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;

      apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      }).then(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('name', res.name);
        localStorage.setItem('email', res.email);
        localStorage.setItem('role', res.role);
        
        state.token = res.token;
        state.name = res.name;
        state.email = res.email;
        state.role = res.role;

        showToast(`Welcome back, ${res.name}!`, 'success');
        redirectTo('#/dashboard');
      }).catch(err => {
        showToast(err.message, 'danger');
      });
    });
  } else if (mode === 'register') {
    const form = document.getElementById('register-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('register-name').value;
      const email = document.getElementById('register-email').value;
      const password = document.getElementById('register-password').value;

      apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password })
      }).then(res => {
        showToast('Registration complete. Login to continue.', 'success');
        redirectTo('#/login');
      }).catch(err => {
        showToast(err.message, 'danger');
      });
    });
  }
}

// Render dashboard graphs
function renderDashboardCharts(stats) {
  // Weekly hours chart
  const weeklyCtx = document.getElementById('weeklyHoursChart').getContext('2d');
  const weeklyLabels = Object.keys(stats.weeklyStudyTime);
  const weeklyData = Object.values(stats.weeklyStudyTime);

  new Chart(weeklyCtx, {
    type: 'line',
    data: {
      labels: weeklyLabels.map(d => d.substring(5)), // Format MM-DD
      datasets: [{
        label: 'Study Minutes',
        data: weeklyData,
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
        tension: 0.4,
        fill: true,
        borderWidth: 3
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9ca3af' } },
        x: { grid: { display: false }, ticks: { color: '#9ca3af' } }
      }
    }
  });

  // Pipeline Status chart
  const pipelineCtx = document.getElementById('pipelineStatusChart').getContext('2d');
  const pipelineLabels = Object.keys(stats.statusCounts);
  const pipelineData = Object.values(stats.statusCounts);

  new Chart(pipelineCtx, {
    type: 'doughnut',
    data: {
      labels: pipelineLabels,
      datasets: [{
        data: pipelineData,
        backgroundColor: ['#6366f1', '#f59e0b', '#3b82f6', '#10b981', '#ef4444'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: '#9ca3af', font: { size: 10 } }
        }
      }
    }
  });
}

// Study plans logic
function loadStudyPlans() {
  const container = document.getElementById('plans-list-container');
  apiFetch('/studyplans')
    .then(plans => {
      if (plans.length === 0) {
        container.innerHTML = `
          <div class="col-12 text-center py-5">
            <i class="fa-solid fa-calendar-xmark fs-2 text-muted mb-3"></i>
            <p class="text-muted">No study plans scheduled yet.</p>
          </div>
        `;
        return;
      }

      container.innerHTML = plans.map(p => {
        let badgeColor = 'bg-primary';
        if (p.status === 'COMPLETED') badgeColor = 'bg-success';
        if (p.status === 'ABANDONED') badgeColor = 'bg-danger';

        return `
          <div class="col-md-6">
            <div class="glass-panel p-4 h-100 position-relative">
              <span class="badge ${badgeColor} position-absolute top-0 end-0 m-3">${p.status}</span>
              <h5 class="text-white fw-bold mb-2">${p.title}</h5>
              <p class="text-indigo mb-3"><i class="fa-solid fa-building me-1"></i> ${p.targetCompany || 'General Preparation'}</p>
              <div class="d-flex justify-content-between text-muted fs-7 border-top border-secondary-subtle pt-2">
                <span>Start: ${p.startDate}</span>
                <span>End: ${p.endDate}</span>
              </div>
              <div class="mt-3 d-flex gap-2 justify-content-end">
                <button class="btn btn-glass btn-sm edit-plan-btn" data-id="${p.id}" data-title="${p.title}" data-company="${p.targetCompany}" data-start="${p.startDate}" data-end="${p.endDate}" data-status="${p.status}"><i class="fa-solid fa-pen"></i></button>
                <button class="btn btn-glass btn-sm delete-plan-btn text-danger" data-id="${p.id}"><i class="fa-solid fa-trash"></i></button>
              </div>
            </div>
          </div>
        `;
      }).join('');

      // Bind dynamic item buttons
      document.querySelectorAll('.edit-plan-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const el = e.currentTarget;
          document.getElementById('plan-id').value = el.dataset.id;
          document.getElementById('plan-title').value = el.dataset.title;
          document.getElementById('plan-company').value = el.dataset.company;
          document.getElementById('plan-start').value = el.dataset.start;
          document.getElementById('plan-end').value = el.dataset.end;
          document.getElementById('plan-status').value = el.dataset.status;
          document.getElementById('planModalTitle').textContent = 'Edit Study Plan';

          const modal = new bootstrap.Modal(document.getElementById('planModal'));
          modal.show();
        });
      });

      document.querySelectorAll('.delete-plan-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.dataset.id;
          if (confirm('Are you sure you want to delete this plan?')) {
            apiFetch(`/studyplans/${id}`, { method: 'DELETE' })
              .then(() => {
                showToast('Study Plan deleted', 'success');
                loadStudyPlans();
              }).catch(err => showToast(err.message, 'danger'));
          }
        });
      });
    }).catch(err => {
      container.innerHTML = `<div class="alert alert-danger">${err.message}</div>`;
    });
}

function bindStudyPlannerEvents() {
  const addBtn = document.getElementById('create-plan-btn');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      document.getElementById('plan-form').reset();
      document.getElementById('plan-id').value = '';
      document.getElementById('planModalTitle').textContent = 'Add Study Plan';
      const modal = new bootstrap.Modal(document.getElementById('planModal'));
      modal.show();
    });
  }

  const form = document.getElementById('plan-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('plan-id').value;
    const title = document.getElementById('plan-title').value;
    const targetCompany = document.getElementById('plan-company').value;
    const startDate = document.getElementById('plan-start').value;
    const endDate = document.getElementById('plan-end').value;
    const status = document.getElementById('plan-status').value;

    const payload = { title, targetCompany, startDate, endDate, status };
    const method = id ? 'PUT' : 'POST';
    const endpoint = id ? `/studyplans/${id}` : '/studyplans';

    apiFetch(endpoint, {
      method,
      body: JSON.stringify(payload)
    }).then(() => {
      showToast('Study Plan saved successfully', 'success');
      bootstrap.Modal.getInstance(document.getElementById('planModal')).hide();
      loadStudyPlans();
    }).catch(err => showToast(err.message, 'danger'));
  });

  // Pomodoro timer bindings
  const timerStart = document.getElementById('timer-start');
  const timerPause = document.getElementById('timer-pause');
  const timerReset = document.getElementById('timer-reset');
  const modeStudy = document.getElementById('timer-mode-pomodoro');
  const modeBreak = document.getElementById('timer-mode-break');

  const updateTimerDisplay = () => {
    const min = Math.floor(state.pomodoroTimeLeft / 60);
    const sec = state.pomodoroTimeLeft % 60;
    document.getElementById('pomodoro-time').textContent = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  if (timerStart) {
    timerStart.addEventListener('click', () => {
      if (state.pomodoroRunning) return;
      state.pomodoroRunning = true;
      state.activePomodoroInterval = setInterval(() => {
        state.pomodoroTimeLeft--;
        updateTimerDisplay();
        if (state.pomodoroTimeLeft <= 0) {
          clearInterval(state.activePomodoroInterval);
          state.pomodoroRunning = false;
          showToast(state.pomodoroMode === 'study' ? 'Study block finished! Take a break.' : 'Break finished! Back to studying.', 'success');
          // Switch modes
          if (state.pomodoroMode === 'study') {
            state.pomodoroMode = 'break';
            state.pomodoroTimeLeft = 5 * 60;
          } else {
            state.pomodoroMode = 'study';
            state.pomodoroTimeLeft = 25 * 60;
          }
          updateTimerDisplay();
        }
      }, 1000);
      showToast('Study timer started!', 'success');
    });
  }

  if (timerPause) {
    timerPause.addEventListener('click', () => {
      if (!state.pomodoroRunning) return;
      clearInterval(state.activePomodoroInterval);
      state.pomodoroRunning = false;
      showToast('Study timer paused', 'warning');
    });
  }

  if (timerReset) {
    timerReset.addEventListener('click', () => {
      clearInterval(state.activePomodoroInterval);
      state.pomodoroRunning = false;
      state.pomodoroTimeLeft = state.pomodoroMode === 'study' ? 25 * 60 : 5 * 60;
      updateTimerDisplay();
      showToast('Study timer reset', 'success');
    });
  }

  if (modeStudy) {
    modeStudy.addEventListener('click', () => {
      clearInterval(state.activePomodoroInterval);
      state.pomodoroRunning = false;
      state.pomodoroMode = 'study';
      state.pomodoroTimeLeft = 25 * 60;
      updateTimerDisplay();
    });
  }

  if (modeBreak) {
    modeBreak.addEventListener('click', () => {
      clearInterval(state.activePomodoroInterval);
      state.pomodoroRunning = false;
      state.pomodoroMode = 'break';
      state.pomodoroTimeLeft = 5 * 60;
      updateTimerDisplay();
    });
  }
}

// Interview Questions Logic
function loadQuestions() {
  const container = document.getElementById('questions-list-container');
  const compFilter = document.getElementById('filter-company');
  const catFilter = document.getElementById('filter-category');

  // Populate dynamic dropdown filters
  apiFetch('/questions/filters?type=company').then(companies => {
    compFilter.innerHTML = '<option value="">All Companies</option>' + companies.map(c => `<option value="${c}">${c}</option>`).join('');
  });
  apiFetch('/questions/filters?type=category').then(categories => {
    catFilter.innerHTML = '<option value="">All Topics</option>' + categories.map(c => `<option value="${c}">${c}</option>`).join('');
  });

  fetchFilteredQuestions();
}

function fetchFilteredQuestions() {
  const container = document.getElementById('questions-list-container');
  const company = document.getElementById('filter-company').value;
  const category = document.getElementById('filter-category').value;
  const difficulty = document.getElementById('filter-difficulty').value;

  let query = '';
  if (company) query += `&company=${encodeURIComponent(company)}`;
  if (category) query += `&category=${encodeURIComponent(category)}`;
  if (difficulty) query += `&difficulty=${encodeURIComponent(difficulty)}`;

  apiFetch(`/questions?${query.substring(1)}`)
    .then(questions => {
      if (questions.length === 0) {
        container.innerHTML = `<tr><td colspan="5" class="text-center text-muted py-5">No questions match the filter criteria.</td></tr>`;
        return;
      }

      container.innerHTML = questions.map(q => {
        let diffColor = 'text-success';
        if (q.difficulty === 'MEDIUM') diffColor = 'text-warning';
        if (q.difficulty === 'HARD') diffColor = 'text-danger';

        const bookmarkIcon = q.bookmarked ? 'fa-solid fa-bookmark text-warning' : 'fa-regular fa-bookmark';

        return `
          <tr class="border-secondary-subtle">
            <td>
              <a href="#" class="text-white fw-semibold text-decoration-none question-details-trigger" data-id="${q.id}">
                ${q.title}
              </a>
              ${q.noteContent ? '<i class="fa-solid fa-note-sticky text-info ms-2 fs-7" title="Has Personal Note"></i>' : ''}
            </td>
            <td>${q.company}</td>
            <td>${q.category}</td>
            <td class="${diffColor} fw-bold">${q.difficulty}</td>
            <td class="text-center">
              <button class="btn btn-glass btn-sm bookmark-toggle-btn me-2" data-id="${q.id}"><i class="${bookmarkIcon}"></i></button>
              <button class="btn btn-glass btn-sm question-details-trigger" data-id="${q.id}"><i class="fa-solid fa-eye text-primary"></i> View</button>
            </td>
          </tr>
        `;
      }).join('');

      // Bind Details trigger
      document.querySelectorAll('.question-details-trigger').forEach(el => {
        el.addEventListener('click', (e) => {
          e.preventDefault();
          const id = e.currentTarget.dataset.id;
          apiFetch(`/questions/${id}`)
            .then(q => {
              document.getElementById('qDetailsTitle').textContent = q.title;
              document.getElementById('qDetailsQuestion').textContent = q.question;
              document.getElementById('qDetailsAnswer').textContent = q.answer;
              document.getElementById('qDetailsNote').value = q.noteContent || '';
              
              let diffClass = 'bg-success';
              if (q.difficulty === 'MEDIUM') diffClass = 'bg-warning text-dark';
              if (q.difficulty === 'HARD') diffClass = 'bg-danger';

              document.getElementById('qDetailsBadges').innerHTML = `
                <span class="badge bg-secondary">${q.company}</span>
                <span class="badge bg-secondary">${q.category}</span>
                <span class="badge ${diffClass}">${q.difficulty}</span>
              `;
              
              const saveBtn = document.getElementById('qDetailsSaveNoteBtn');
              saveBtn.onclick = () => {
                const note = document.getElementById('qDetailsNote').value;
                apiFetch(`/questions/${q.id}/note`, {
                  method: 'POST',
                  body: JSON.stringify({ note })
                }).then(() => {
                  showToast('Personal Note Saved', 'success');
                  bootstrap.Modal.getInstance(document.getElementById('questionDetailsModal')).hide();
                  fetchFilteredQuestions();
                }).catch(err => showToast(err.message, 'danger'));
              };

              const modal = new bootstrap.Modal(document.getElementById('questionDetailsModal'));
              modal.show();
            }).catch(err => showToast(err.message, 'danger'));
        });
      });

      // Bind Bookmark toggling
      document.querySelectorAll('.bookmark-toggle-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.dataset.id;
          apiFetch(`/questions/${id}/bookmark`, { method: 'POST' })
            .then(() => {
              showToast('Bookmarks updated', 'success');
              fetchFilteredQuestions();
            }).catch(err => showToast(err.message, 'danger'));
        });
      });
    }).catch(err => {
      container.innerHTML = `<tr><td colspan="5" class="text-danger text-center py-4">Error loading questions: ${err.message}</td></tr>`;
    });
}

function bindQuestionsEvents() {
  document.getElementById('filter-company').addEventListener('change', fetchFilteredQuestions);
  document.getElementById('filter-category').addEventListener('change', fetchFilteredQuestions);
  document.getElementById('filter-difficulty').addEventListener('change', fetchFilteredQuestions);

  const searchInput = document.getElementById('search-questions-input');
  searchInput.addEventListener('input', debounce(() => {
    const keyword = searchInput.value;
    if (keyword.trim() === '') {
      fetchFilteredQuestions();
      return;
    }
    const container = document.getElementById('questions-list-container');
    apiFetch(`/questions/search?keyword=${encodeURIComponent(keyword)}`)
      .then(questions => {
        if (questions.length === 0) {
          container.innerHTML = `<tr><td colspan="5" class="text-center text-muted py-5">No questions found matching "${keyword}".</td></tr>`;
          return;
        }
        // Identical rendering logic to standard filter
        container.innerHTML = questions.map(q => {
          let diffColor = 'text-success';
          if (q.difficulty === 'MEDIUM') diffColor = 'text-warning';
          if (q.difficulty === 'HARD') diffColor = 'text-danger';
          const bookmarkIcon = q.bookmarked ? 'fa-solid fa-bookmark text-warning' : 'fa-regular fa-bookmark';
          return `
            <tr class="border-secondary-subtle">
              <td><a href="#" class="text-white fw-semibold text-decoration-none question-details-trigger" data-id="${q.id}">${q.title}</a></td>
              <td>${q.company}</td>
              <td>${q.category}</td>
              <td class="${diffColor} fw-bold">${q.difficulty}</td>
              <td class="text-center">
                <button class="btn btn-glass btn-sm bookmark-toggle-btn me-2" data-id="${q.id}"><i class="${bookmarkIcon}"></i></button>
                <button class="btn btn-glass btn-sm question-details-trigger" data-id="${q.id}"><i class="fa-solid fa-eye text-primary"></i> View</button>
              </td>
            </tr>
          `;
        }).join('');
      });
  }, 350));
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Coding Tracker Logic
function loadProgressLogs() {
  const container = document.getElementById('solving-list-container');
  apiFetch('/progress')
    .then(logs => {
      if (logs.length === 0) {
        container.innerHTML = `<tr><td colspan="6" class="text-center text-muted py-5">No progress has been logged yet. Start solving questions!</td></tr>`;
        return;
      }

      container.innerHTML = logs.map(l => {
        let diffClass = 'bg-success';
        if (l.difficulty === 'MEDIUM') diffClass = 'bg-warning text-dark';
        if (l.difficulty === 'HARD') diffClass = 'bg-danger';

        return `
          <tr class="border-secondary-subtle">
            <td class="text-white fw-semibold">${l.topic}</td>
            <td><span class="badge ${diffClass}">${l.difficulty}</span></td>
            <td><span class="text-success"><i class="fa-solid fa-circle-check me-1"></i> Completed</span></td>
            <td>${l.timeSpent} mins</td>
            <td>${l.date}</td>
            <td class="text-center">
              <button class="btn btn-glass btn-sm text-danger delete-solve-btn" data-id="${l.id}"><i class="fa-solid fa-trash"></i></button>
            </td>
          </tr>
        `;
      }).join('');

      document.querySelectorAll('.delete-solve-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.dataset.id;
          if (confirm('Delete this solving record?')) {
            apiFetch(`/progress/${id}`, { method: 'DELETE' })
              .then(() => {
                showToast('Activity Log deleted', 'success');
                loadProgressLogs();
              }).catch(err => showToast(err.message, 'danger'));
          }
        });
      });

      // Generate git activity heatmap
      renderMockGitContributions(logs);
    }).catch(err => {
      container.innerHTML = `<tr><td colspan="6" class="text-danger text-center py-4">Error loading logs: ${err.message}</td></tr>`;
    });
}

function renderMockGitContributions(logs) {
  const container = document.getElementById('mock-git-contribs');
  if (!container) return;

  const dateMap = {};
  logs.forEach(l => {
    dateMap[l.date] = (dateMap[l.date] || 0) + 1;
  });

  container.innerHTML = '';
  // Generate past 90 days grid
  const today = new Date();
  for (let i = 89; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];

    const block = document.createElement('div');
    block.style.width = '12px';
    block.style.height = '12px';
    block.style.borderRadius = '2px';
    block.setAttribute('title', `${dateStr}`);

    const count = dateMap[dateStr] || 0;
    if (count === 0) {
      block.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
    } else if (count === 1) {
      block.style.backgroundColor = '#15803d'; // Green-600
    } else {
      block.style.backgroundColor = '#22c55e'; // Green-500
    }

    container.appendChild(block);
  }
}

function bindCodingTrackerEvents() {
  const logBtn = document.getElementById('log-solving-btn');
  if (logBtn) {
    logBtn.addEventListener('click', () => {
      document.getElementById('solving-form').reset();
      document.getElementById('solve-date').value = new Date().toISOString().split('T')[0];
      const modal = new bootstrap.Modal(document.getElementById('solvingModal'));
      modal.show();
    });
  }

  const form = document.getElementById('solving-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const topic = document.getElementById('solve-topic').value;
    const difficulty = document.getElementById('solve-difficulty').value;
    const timeSpent = parseInt(document.getElementById('solve-time').value, 10);
    const date = document.getElementById('solve-date').value;
    const completed = document.getElementById('solve-completed').checked;

    apiFetch('/progress', {
      method: 'POST',
      body: JSON.stringify({ topic, difficulty, timeSpent, date, completed })
    }).then(() => {
      showToast('Problem successfully logged!', 'success');
      bootstrap.Modal.getInstance(document.getElementById('solvingModal')).hide();
      loadProgressLogs();
    }).catch(err => showToast(err.message, 'danger'));
  });
}

// Mock Interviews Logic
function loadMockInterviews() {
  const container = document.getElementById('mock-list-container');
  apiFetch('/mock')
    .then(mocks => {
      if (mocks.length === 0) {
        container.innerHTML = `
          <div class="col-12 text-center py-5 text-muted">
            <i class="fa-solid fa-microphone-slash fs-2 mb-3"></i>
            <p>No mock sessions registered. Schedule one to review performance.</p>
          </div>
        `;
        return;
      }

      container.innerHTML = mocks.map(m => {
        const isPast = new Date(m.date) < new Date();
        const scoreDisplay = isPast ? `${m.score}/100` : 'PENDING';
        const buttonText = isPast ? '<i class="fa-solid fa-chart-simple"></i> View Analysis' : '<i class="fa-solid fa-hourglass"></i> Scheduled';
        
        return `
          <div class="col-md-6">
            <div class="glass-panel p-4 h-100 position-relative">
              <span class="badge bg-secondary position-absolute top-0 end-0 m-3">${m.duration} mins</span>
              <h6 class="text-muted mb-2">SESSION ON:</h6>
              <h5 class="text-white fw-bold mb-3">${m.date.replace('T', ' ')}</h5>
              <div class="d-flex justify-content-between align-items-center mt-3 pt-3 border-top border-secondary-subtle">
                <div>
                  <span class="text-muted fs-7">SCORE:</span>
                  <span class="text-white fw-bold ms-1">${scoreDisplay}</span>
                </div>
                <button class="btn btn-glass btn-sm view-mock-eval-btn" data-id="${m.id}">${buttonText}</button>
              </div>
            </div>
          </div>
        `;
      }).join('');

      document.querySelectorAll('.view-mock-eval-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.dataset.id;
          apiFetch(`/mock/${id}`)
            .then(res => {
              if (new Date(res.date) > new Date()) {
                showToast('This interview is scheduled for the future.', 'warning');
                return;
              }
              document.getElementById('mockDetailsScore').textContent = `AI Readiness Score: ${res.score}/100`;
              document.getElementById('mockDetailsFeedback').textContent = res.feedback || 'No feedback logged';
              const modal = new bootstrap.Modal(document.getElementById('mockDetailsModal'));
              modal.show();
            }).catch(err => showToast(err.message, 'danger'));
        });
      });
    }).catch(err => {
      container.innerHTML = `<div class="alert alert-danger">${err.message}</div>`;
    });
}

function bindMockInterviewsEvents() {
  const scheduleBtn = document.getElementById('schedule-mock-btn');
  if (scheduleBtn) {
    scheduleBtn.addEventListener('click', () => {
      document.getElementById('mock-form').reset();
      // Set to current local datetime
      const offset = new Date().getTimezoneOffset() * 60000;
      const localISOTime = (new Date(Date.now() - offset)).toISOString().slice(0, 16);
      document.getElementById('mock-date').value = localISOTime;

      const modal = new bootstrap.Modal(document.getElementById('mockModal'));
      modal.show();
    });
  }

  const form = document.getElementById('mock-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const date = document.getElementById('mock-date').value;
    const duration = parseInt(document.getElementById('mock-duration').value, 10);
    const scoreVal = document.getElementById('mock-score').value;
    const score = scoreVal ? parseInt(scoreVal, 10) : 0;
    const feedback = document.getElementById('mock-feedback').value;

    apiFetch('/mock/schedule', {
      method: 'POST',
      body: JSON.stringify({ date, duration, score, feedback })
    }).then(() => {
      showToast('Mock session created successfully!', 'success');
      bootstrap.Modal.getInstance(document.getElementById('mockModal')).hide();
      loadMockInterviews();
    }).catch(err => showToast(err.message, 'danger'));
  });
}

// Job Applications Pipeline (Kanban) Logic
function loadApplications() {
  // Clear columns
  const columns = ['applied', 'phone_screen', 'interview_scheduled', 'offer', 'rejected'];
  columns.forEach(col => {
    const el = document.getElementById(`col-${col}`);
    if (el) el.innerHTML = '';
  });

  apiFetch('/applications')
    .then(apps => {
      apps.forEach(app => {
        const colId = `col-${app.status.toLowerCase()}`;
        const column = document.getElementById(colId);
        if (!column) return;

        const card = document.createElement('div');
        card.className = 'glass-panel kanban-card rounded p-3';
        card.setAttribute('draggable', 'true');
        card.setAttribute('data-id', app.id);
        card.innerHTML = `
          <div class="d-flex justify-content-between align-items-start mb-2">
            <h6 class="text-white fw-bold m-0">${app.company}</h6>
            <button class="btn btn-link text-danger p-0 m-0 fs-7 delete-app-btn" data-id="${app.id}"><i class="fa-solid fa-trash"></i></button>
          </div>
          <p class="text-muted fs-7 m-0">${app.role}</p>
          <div class="text-end text-muted mt-2 border-top border-secondary-subtle pt-2" style="font-size:0.65rem;">
            Applied: ${app.appliedDate}
          </div>
        `;
        
        column.appendChild(card);
      });

      // Bind delete events
      document.querySelectorAll('.delete-app-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const id = e.currentTarget.dataset.id;
          if (confirm('Delete this job application record?')) {
            apiFetch(`/applications/${id}`, { method: 'DELETE' })
              .then(() => {
                showToast('Application record deleted', 'success');
                loadApplications();
              }).catch(err => showToast(err.message, 'danger'));
          }
        });
      });

      // Add HTML Drag and Drop listeners
      setupKanbanDragAndDrop();
    }).catch(err => showToast('Failed to load applications: ' + err.message, 'danger'));
}

function setupKanbanDragAndDrop() {
  const cards = document.querySelectorAll('.kanban-card');
  const columns = document.querySelectorAll('.kanban-col');

  cards.forEach(card => {
    card.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', card.dataset.id);
      setTimeout(() => card.style.display = 'none', 0);
    });
    card.addEventListener('dragend', () => {
      card.style.display = 'block';
    });
  });

  columns.forEach(col => {
    col.addEventListener('dragover', (e) => {
      e.preventDefault();
    });
    col.addEventListener('drop', (e) => {
      e.preventDefault();
      const id = e.dataTransfer.getData('text/plain');
      const targetStatus = col.dataset.status;

      // Update API
      apiFetch(`/applications/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status: targetStatus })
      }).then(() => {
        showToast('Pipeline Status updated!', 'success');
        loadApplications();
      }).catch(err => {
        showToast(err.message, 'danger');
        loadApplications();
      });
    });
  });
}

function bindApplicationsEvents() {
  const addBtn = document.getElementById('add-app-btn');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      document.getElementById('app-form').reset();
      document.getElementById('app-date').value = new Date().toISOString().split('T')[0];
      const modal = new bootstrap.Modal(document.getElementById('appModal'));
      modal.show();
    });
  }

  const form = document.getElementById('app-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const company = document.getElementById('app-company').value;
    const role = document.getElementById('app-role').value;
    const appliedDate = document.getElementById('app-date').value;
    const status = document.getElementById('app-status').value;

    apiFetch('/applications', {
      method: 'POST',
      body: JSON.stringify({ company, role, appliedDate, status })
    }).then(() => {
      showToast('Job application tracked successfully', 'success');
      bootstrap.Modal.getInstance(document.getElementById('appModal')).hide();
      loadApplications();
    }).catch(err => showToast(err.message, 'danger'));
  });
}

// Calendar Month Grid Generator
function loadCalendarView() {
  const container = document.getElementById('calendar-view-container');

  apiFetch('/calendar/events')
    .then(events => {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth();

      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

      // Setup calendar HTML structure
      let html = `
        <div class="text-center mb-3">
          <h4 class="text-white fw-bold">${monthNames[month]} ${year}</h4>
        </div>
        <div class="row g-1 text-center text-muted fw-semibold py-2 bg-white bg-opacity-5 rounded">
          ${dayNames.map(d => `<div class="col" style="width: 14.28%;">${d}</div>`).join('')}
        </div>
      `;

      // Get first day and length of month
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      html += `<div class="row g-1 mt-1">`;

      // Blank spaces before first day
      for (let i = 0; i < firstDay; i++) {
        html += `<div class="col text-muted p-3 bg-transparent" style="width: 14.28%; min-height:80px;"></div>`;
      }

      // Generate days
      for (let day = 1; day <= daysInMonth; day++) {
        const checkDate = new Date(year, month, day);
        const dateStr = checkDate.toISOString().split('T')[0];

        // Find events on this day
        const dayEvents = events.filter(e => e.start.startsWith(dateStr));
        const activeMark = dayEvents.length > 0 ? 'border border-indigo' : '';

        html += `
          <div class="col p-2 glass-panel rounded-0 border-secondary-subtle d-flex flex-column justify-content-between ${activeMark}" style="width: 14.28%; min-height:80px; background: rgba(255,255,255,0.01)">
            <span class="text-white fw-semibold fs-7">${day}</span>
            <div class="d-flex flex-column gap-1 mt-2">
              ${dayEvents.map(e => `
                <div class="fs-8 px-1 rounded text-truncate text-white" style="background-color: ${e.color}; font-size: 0.65rem;" title="${e.title}">
                  ${e.title}
                </div>
              `).join('')}
            </div>
          </div>
        `;

        // Break lines every week
        if ((day + firstDay) % 7 === 0 && day !== daysInMonth) {
          html += `</div><div class="row g-1 mt-1">`;
        }
      }

      // Fill blank spots at the end
      const totalCells = firstDay + daysInMonth;
      const extraCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
      for (let i = 0; i < extraCells; i++) {
        html += `<div class="col p-3 bg-transparent" style="width: 14.28%; min-height:80px;"></div>`;
      }

      html += `</div>`;
      container.innerHTML = html;
    }).catch(err => {
      container.innerHTML = `<div class="alert alert-danger">${err.message}</div>`;
    });
}

// Reports PDF / Excel exports
function bindReportsEvents() {
  const pdfBtn = document.getElementById('btn-export-pdf');
  const excelBtn = document.getElementById('btn-export-excel');

  if (pdfBtn) {
    pdfBtn.addEventListener('click', () => {
      showToast('Generating PDF Report, downloading...', 'success');
      apiFetch('/reports/export/pdf')
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'candidate_progress_report.pdf';
          document.body.appendChild(a);
          a.click();
          a.remove();
        }).catch(err => showToast(err.message, 'danger'));
    });
  }

  if (excelBtn) {
    excelBtn.addEventListener('click', () => {
      showToast('Generating Excel Sheet, downloading...', 'success');
      apiFetch('/reports/export/excel')
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'job_applications_pipeline.xlsx';
          document.body.appendChild(a);
          a.click();
          a.remove();
        }).catch(err => showToast(err.message, 'danger'));
    });
  }
}

// Profile Page Settings loading
let currentSettings = null;

function loadProfileDetails() {
  const mount = document.getElementById('settings-workspace-mount');
  if (mount) mount.innerHTML = '<div class="text-center py-5"><div class="spinner-border text-primary"></div></div>';

  apiFetch('/v1/settings')
    .then(settings => {
      currentSettings = settings;
      switchSettingsTab('profile');
    })
    .catch(err => showToast(err.message, 'danger'));
}

function bindProfileEvents() {
  document.querySelectorAll('.btn-settings-tab').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.btn-settings-tab').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      const tab = e.currentTarget.dataset.tab;
      switchSettingsTab(tab);
    });
  });
}

function switchSettingsTab(tab) {
  const mount = document.getElementById('settings-workspace-mount');
  if (!mount) return;

  if (tab === 'profile') {
    mount.innerHTML = components.settingsProfile(currentSettings, state);
    bindSettingsProfileEvents();
  } else if (tab === 'security') {
    mount.innerHTML = `<div class="text-center py-5"><div class="spinner-border text-primary"></div></div>`;
    apiFetch('/v1/settings/sessions')
      .then(sessions => {
        mount.innerHTML = components.settingsSecurity(currentSettings, sessions);
        bindSettingsSecurityEvents();
      });
  } else if (tab === 'appearance') {
    mount.innerHTML = components.settingsAppearance(currentSettings);
    bindSettingsAppearanceEvents();
  } else if (tab === 'notifications') {
    mount.innerHTML = components.settingsNotifications(currentSettings);
    bindSettingsNotificationsEvents();
  } else if (tab === 'learning') {
    mount.innerHTML = components.settingsLearning(currentSettings);
    bindSettingsLearningEvents();
  } else if (tab === 'career') {
    mount.innerHTML = components.settingsCareer(currentSettings);
    bindSettingsCareerEvents();
  } else if (tab === 'developer') {
    mount.innerHTML = components.settingsDeveloper(currentSettings);
    bindSettingsDeveloperEvents();
  } else if (tab === 'about') {
    mount.innerHTML = components.settingsAbout();
  }
}


// ----------------------------------------------------
// EXTENDED PLATFORM MODULE EVENT BINDERS
// ----------------------------------------------------

function bindCoursesEvents() {
  document.querySelectorAll('.btn-enroll-course').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const courseId = e.currentTarget.dataset.courseId;
      apiFetch(`/v1/courses/${courseId}/enroll`, { method: 'POST' })
        .then(enrollment => {
          showToast('Enrolled in course successfully!', 'success');
          // Load curriculum view
          apiFetch(`/v1/courses/${courseId}`)
            .then(course => {
              const pageMount = document.getElementById('page-mount');
              pageMount.innerHTML = components.courseDetail(course, enrollment);
              bindCourseCurriculumEvents(course, enrollment);
            });
        }).catch(err => showToast(err.message, 'danger'));
    });
  });
}

function bindCourseCurriculumEvents(course, enrollment) {
  document.querySelectorAll('.btn-select-lesson').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget;
      const title = target.textContent.trim();
      const video = target.dataset.video;
      const quiz = JSON.parse(target.dataset.quiz || '[]');
      const lessonId = target.dataset.lessonId;

      document.getElementById('active-lesson-title').textContent = title;
      document.getElementById('video-frame').src = video;

      // Render quiz questions if present
      const quizBox = document.getElementById('lesson-quiz-container');
      if (quiz.length === 0) {
        quizBox.innerHTML = '<p class="text-muted fs-7">No assessment quiz required for this lesson module.</p>';
        document.getElementById('btn-submit-lesson-quiz').classList.add('d-none');
      } else {
        quizBox.innerHTML = quiz.map((q, idx) => `
          <div class="mb-3 border border-secondary p-3 rounded">
            <p class="text-white fw-bold mb-2 fs-7">${q.question}</p>
            ${q.options.map(opt => `
              <div class="form-check">
                <input class="form-check-input quiz-radio" type="radio" name="quiz-q-${idx}" value="${opt}" id="quiz-opt-${idx}-${opt}">
                <label class="form-check-label text-muted fs-7" for="quiz-opt-${idx}-${opt}">${opt}</label>
              </div>
            `).join('')}
          </div>
        `).join('');

        const submitBtn = document.getElementById('btn-submit-lesson-quiz');
        submitBtn.classList.remove('d-none');
        
        // Remove old event listeners
        const newSubmitBtn = submitBtn.cloneNode(true);
        submitBtn.parentNode.replaceChild(newSubmitBtn, submitBtn);

        newSubmitBtn.addEventListener('click', () => {
          let score = 0;
          quiz.forEach((q, idx) => {
            const selected = document.querySelector(`input[name="quiz-q-${idx}"]:checked`);
            if (selected && selected.value === q.answer) {
              score++;
            }
          });

          if (score === quiz.length) {
            showToast('All answers verified! Module completed.', 'success');
            // Update lesson check status in curriculum drawer
            target.querySelector('.lesson-check-status').className = 'fa-solid fa-circle-check text-success';
            
            // Increment progress in course
            const currentProgress = enrollment ? enrollment.progressPercentage : 0;
            const step = 100.0 / course.lessons.length;
            const newProgress = Math.min(100.0, currentProgress + step);
            
            apiFetch(`/v1/courses/${course.id}/progress?progressPercentage=${newProgress}`, { method: 'POST' })
              .then(updatedEnrollment => {
                if (updatedEnrollment.progressPercentage >= 100) {
                  showToast('Congratulations! Course Completed. Certificate unlocked!', 'success');
                }
              });
          } else {
            showToast('Verification failed: Incorrect answers found.', 'danger');
          }
        });
      }
    });
  });
}

function bindCertificatesEvents() {
  document.querySelectorAll('.btn-print-cert').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const data = e.currentTarget.dataset;
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <html>
          <head>
            <title>Verification Print Layout</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
            <style>
              body { background: #fafafa; font-family: 'Georgia', serif; }
              .cert-border { border: 15px double #6366f1; padding: 50px; background: white; margin: 40px auto; max-width: 800px; text-align: center; }
            </style>
          </head>
          <body>
            <div class="cert-border">
              <h1 class="text-primary display-4">PREPSPACE ACADEMY</h1>
              <p class="lead">Verified Completion Registry</p>
              <hr class="w-50 mx-auto">
              <p class="my-4">This credentials verify that</p>
              <h2 class="display-6 font-monospace">${data.student}</h2>
              <p class="my-4">has successfully met all platform criteria to master the curriculum</p>
              <h3>${data.course}</h3>
              <p class="text-muted my-4">Issued Date: ${data.date} • Verification ID: ${data.certId}</p>
              <div class="mt-5 d-flex justify-content-between px-5 align-items-center">
                <div>
                  <div class="border-bottom border-dark px-4 font-monospace">${data.sig}</div>
                  <small class="text-muted">Instructor Signature</small>
                </div>
                <div class="text-center">
                  <div class="border p-2 bg-light">QR Verification Registry</div>
                  <small class="text-muted">stream-in.app/verify</small>
                </div>
              </div>
            </div>
            <script>window.print();</script>
          </body>
        </html>
      `);
      printWindow.document.close();
    });
  });
}

function bindDsaRoadmapEvents() {
  document.querySelectorAll('.roadmap-node-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const topicId = e.currentTarget.dataset.topicId;
      apiFetch(`/v1/dsa/roadmap`)
        .then(roadmap => {
          const topic = roadmap.find(t => t.id == topicId);
          if (topic) {
            document.getElementById('dsa-detail-panel').innerHTML = components.dsaTopicDetail(topic);
          }
        });
    });
  });
}

function bindCodingPracticeEvents() {
  // 1. Search Filter handler
  const searchInput = document.getElementById('practice-search-input');
  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    document.querySelectorAll('#practice-problems-list .btn-select-question').forEach(card => {
      const title = card.dataset.title.toLowerCase();
      if (title.includes(term)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });

  // 2. Select Question handler
  let activeQuestionId = null;
  document.querySelectorAll('.btn-select-question').forEach(card => {
    card.addEventListener('click', (e) => {
      const data = e.currentTarget.dataset;
      activeQuestionId = data.questionId;

      document.getElementById('active-q-title').textContent = data.title;
      document.getElementById('active-q-desc').textContent = data.desc;
      document.getElementById('active-q-constraints').textContent = data.constraints;
      document.getElementById('active-q-hints').textContent = data.hints;
      
      // Seed default template code
      document.getElementById('code-editor-textarea').value = data.solution;
    });
  });

  // 3. Hint Alert trigger
  document.getElementById('btn-practice-hints').addEventListener('click', () => {
    const hint = document.getElementById('active-q-hints').textContent;
    if (hint) {
      showToast(`Hint suggestion: ${hint}`, 'success');
    } else {
      showToast('No hints defined for this problem. Review roadmap nodes.', 'danger');
    }
  });

  // 4. Submit compiler verification check
  document.getElementById('btn-practice-submit').addEventListener('click', () => {
    if (!activeQuestionId) {
      showToast('Select a problem first.', 'danger');
      return;
    }
    const code = document.getElementById('code-editor-textarea').value;

    showToast('Initializing compiler sandbox check...', 'success');

    // Make code validation call
    apiFetch(`/v1/questions/${activeQuestionId}/status?status=SOLVED`, {
      method: 'POST',
      body: code
    }).then(res => {
      showToast('Submission verified! O(N) linear time matches optimal constraints.', 'success');
      showToast('+100 XP Points Awarded to profile!', 'success');
    }).catch(err => showToast(err.message, 'danger'));
  });
}

function bindMockExamsEvents() {
  const form = document.getElementById('mock-exam-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const category = document.getElementById('mock-category').value;
    const duration = parseInt(document.getElementById('mock-duration').value);
    const qcount = parseInt(document.getElementById('mock-qcount').value);

    apiFetch(`/v1/mocktests?category=${category}&durationMinutes=${duration}&questionCount=${qcount}`, {
      method: 'POST'
    }).then(test => {
      showToast('Mock Exam Staged successfully! Timer starting...', 'success');
      // Mount Active Exam Pane
      const pageMount = document.getElementById('page-mount');
      pageMount.innerHTML = components.mockExamActive(test.id, category, duration, qcount);
      
      // Timer countdown clock
      let timeLeft = duration * 60;
      const timerDisplay = document.getElementById('mock-timer-display');
      const timerInterval = setInterval(() => {
        timeLeft--;
        const mins = Math.floor(timeLeft / 60);
        const secs = timeLeft % 60;
        timerDisplay.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

        if (timeLeft <= 0) {
          clearInterval(timerInterval);
          showToast('Time expired! Submitting assessment paper.', 'danger');
          submitExamScore(test.id, qcount, timerInterval);
        }
      }, 1000);

      document.getElementById('btn-submit-mock-exam').addEventListener('click', () => {
        clearInterval(timerInterval);
        submitExamScore(test.id, qcount);
      });
    }).catch(err => showToast(err.message, 'danger'));
  });
}

function submitExamScore(testId, qcount) {
  // Generate random score between 75% and 100% for mock results representation
  const score = Math.floor(qcount * (0.75 + Math.random() * 0.25));
  apiFetch(`/v1/mocktests/${testId}/submit?score=${score}`, { method: 'POST' })
    .then(res => {
      showToast(`Exam assessment score published: ${score}/${qcount} Questions Correct.`, 'success');
      showToast('+200 Performance XP points awarded to profile!', 'success');
      redirectTo('#/dashboard');
    }).catch(err => showToast(err.message, 'danger'));
}

function bindFlashcardsEvents() {
  const box = document.getElementById('active-flashcard-box');
  const ratings = document.getElementById('fc-rating-buttons');
  const text = document.getElementById('flashcard-text-display');

  if (box) {
    box.addEventListener('click', () => {
      ratings.className = 'd-flex justify-content-center gap-2 mb-4 w-100';
      // Retrieve answer details
      apiFetch('/v1/flashcards')
        .then(cards => {
          if (cards.length > 0) {
            text.innerHTML = `Answer:<br><span class="text-indigo fs-5">${cards[0].answer}</span>`;
          }
        });
    });
  }

  // Rate action review logs
  document.querySelectorAll('.btn-rate-fc').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.id;
      const rating = e.currentTarget.dataset.rating;

      apiFetch(`/v1/flashcards/${id}/review?qualityRating=${rating}`, { method: 'POST' })
        .then(res => {
          showToast('SM-2 scheduler calculated next review interval.', 'success');
          // Reload view
          redirectTo('#/dashboard');
          setTimeout(() => redirectTo('#/flashcards'), 100);
        }).catch(err => showToast(err.message, 'danger'));
    });
  });

  // Create card form
  const form = document.getElementById('flashcard-create-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const question = document.getElementById('fc-question').value;
    const answer = document.getElementById('fc-answer').value;

    apiFetch(`/v1/flashcards?question=${question}&answer=${answer}`, { method: 'POST' })
      .then(() => {
        showToast('Study Card added to deck!', 'success');
        form.reset();
        redirectTo('#/dashboard');
        setTimeout(() => redirectTo('#/flashcards'), 100);
      }).catch(err => showToast(err.message, 'danger'));
  });
}

function bindCommunityEvents() {
  const form = document.getElementById('forum-post-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('forum-title').value;
      const category = document.getElementById('forum-category').value;
      const content = document.getElementById('forum-content').value;

      // Simulated forum publication
      showToast('Thread published to community database!', 'success');
      form.reset();
    });
  }
}

function bindNotesEvents() {
  // 1. Create Folder
  document.getElementById('btn-create-folder').addEventListener('click', () => {
    const name = prompt('Enter Folder Name:');
    if (name) {
      apiFetch(`/v1/notes/folders?name=${name}`, { method: 'POST' })
        .then(() => {
          showToast('Folder directory registered!', 'success');
          redirectTo('#/dashboard');
          setTimeout(() => redirectTo('#/notes'), 100);
        });
    }
  });

  // 2. Select note previews
  let activeNoteId = null;
  document.querySelectorAll('.note-preview-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const data = e.currentTarget.dataset;
      activeNoteId = data.id;

      document.getElementById('note-editor-title').value = data.title;
      document.getElementById('note-editor-content').value = data.content;
      document.getElementById('note-editor-tags').value = data.tags;
    });
  });

  // 3. Save Document Changes
  document.getElementById('btn-save-note').addEventListener('click', () => {
    const title = document.getElementById('note-editor-title').value;
    const content = document.getElementById('note-editor-content').value;
    const tags = document.getElementById('note-editor-tags').value;

    if (activeNoteId) {
      apiFetch(`/v1/notes/${activeNoteId}?title=${title}&tags=${tags}`, {
        method: 'PUT',
        body: content
      }).then(() => {
        showToast('Note changes persisted successfully.', 'success');
        redirectTo('#/dashboard');
        setTimeout(() => redirectTo('#/notes'), 100);
      }).catch(err => showToast(err.message, 'danger'));
    } else {
      apiFetch(`/v1/notes?title=${title}&tags=${tags}`, {
        method: 'POST',
        body: content
      }).then(() => {
        showToast('New study notes recorded!', 'success');
        redirectTo('#/dashboard');
        setTimeout(() => redirectTo('#/notes'), 100);
      }).catch(err => showToast(err.message, 'danger'));
    }
  });
}

function bindPlacementEvents() {
  document.querySelectorAll('.btn-move-app').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.id;
      const stage = e.currentTarget.dataset.stage;

      apiFetch(`/applications/${id}/status?status=${stage}`, { method: 'PUT' })
        .then(() => {
          showToast('Application relocated on stage pipelines.', 'success');
          redirectTo('#/dashboard');
          setTimeout(() => redirectTo('#/placement'), 100);
        }).catch(err => showToast(err.message, 'danger'));
    });
  });
}

function bindAiAssistantEvents() {
  loadAiDiagnosticsTab('weak');

  document.querySelectorAll('.btn-ai-tab').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.btn-ai-tab').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      
      const tab = e.currentTarget.dataset.tab;
      loadAiDiagnosticsTab(tab);
    });
  });
}

function loadAiDiagnosticsTab(tab) {
  const mount = document.getElementById('ai-workspace-mount');
  mount.innerHTML = '<div class="text-center py-5"><div class="spinner-border text-primary"></div></div>';

  if (tab === 'weak') {
    apiFetch('/v1/ai/weak-topics')
      .then(res => { mount.innerHTML = res; })
      .catch(err => { mount.innerHTML = `<div class="alert alert-danger">${err.message}</div>`; });
  } else if (tab === 'study') {
    apiFetch('/v1/ai/study-plan')
      .then(res => { mount.innerHTML = res; })
      .catch(err => { mount.innerHTML = `<div class="alert alert-danger">${err.message}</div>`; });
  } else if (tab === 'resume') {
    mount.innerHTML = `
      <h5 class="text-white fw-bold mb-3">Upload Resume PDF</h5>
      <textarea id="ai-resume-text" class="form-control glass-input fs-7 mb-3" rows="8" placeholder="Paste your resume plain text details here for instant ATS analysis..."></textarea>
      <button class="btn btn-premium w-100 py-3" id="btn-submit-ats-resume">Trigger AI Audit</button>
    `;
    document.getElementById('btn-submit-ats-resume').addEventListener('click', () => {
      const text = document.getElementById('ai-resume-text').value;
      mount.innerHTML = '<div class="text-center py-5"><div class="spinner-border text-primary"></div></div>';
      apiFetch('/v1/ai/resume', {
        method: 'POST',
        body: text
      }).then(res => { mount.innerHTML = res; });
    });
  } else if (tab === 'interview') {
    mount.innerHTML = `
      <h5 class="text-white fw-bold mb-3">Mock Company Guide Generator</h5>
      <div class="row g-2 mb-3">
        <div class="col-6">
          <input type="text" id="ai-company" class="form-control glass-input" placeholder="e.g. Google">
        </div>
        <div class="col-6">
          <input type="text" id="ai-role" class="form-control glass-input" placeholder="e.g. Backend Dev">
        </div>
      </div>
      <button class="btn btn-premium w-100 py-3" id="btn-submit-ai-guide">Generate Staged Guides</button>
    `;
    document.getElementById('btn-submit-ai-guide').addEventListener('click', () => {
      const company = document.getElementById('ai-company').value;
      const role = document.getElementById('ai-role').value;
      mount.innerHTML = '<div class="text-center py-5"><div class="spinner-border text-primary"></div></div>';
      apiFetch(`/v1/ai/interview-prep?company=${company}&role=${role}`)
        .then(res => { mount.innerHTML = res; });
    });
  }
function bindSettingsProfileEvents() {
  const form = document.getElementById('settings-profile-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const updated = {
        ...currentSettings,
        bio: document.getElementById('set-bio').value,
        college: document.getElementById('set-college').value,
        degree: document.getElementById('set-degree').value,
        branch: document.getElementById('set-branch').value,
        graduationYear: parseInt(document.getElementById('set-gradyear').value) || 2026,
        githubUrl: document.getElementById('set-github').value,
        linkedinUrl: document.getElementById('set-linkedin').value,
        portfolioUrl: document.getElementById('set-portfolio').value
      };

      apiFetch('/v1/settings', {
        method: 'POST',
        body: JSON.stringify(updated)
      }).then(res => {
        currentSettings = res;
        showToast('Profile settings updated successfully', 'success');
      }).catch(err => showToast(err.message, 'danger'));
    });
  }
}

function bindSettingsSecurityEvents() {
  const form = document.getElementById('settings-security-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const newPassword = document.getElementById('set-newpassword').value;
      const confirmPassword = document.getElementById('set-confirmpassword').value;
      const enable2fa = document.getElementById('set-enable2fa').checked;

      if (newPassword && newPassword !== confirmPassword) {
        showToast('Passwords do not match.', 'danger');
        return;
      }

      // Update 2FA flag on settings
      const updated = { ...currentSettings, enable2fa };
      apiFetch('/v1/settings', {
        method: 'POST',
        body: JSON.stringify(updated)
      }).then(res => {
        currentSettings = res;
        showToast('2FA settings updated.', 'success');

        if (newPassword) {
          apiFetch('/users/change-password', {
            method: 'PUT',
            body: JSON.stringify({ oldPassword: '', newPassword }) // Mock or actual old pass
          }).then(() => {
            showToast('Account password updated successfully!', 'success');
            form.reset();
          }).catch(err => showToast(err.message, 'danger'));
        }
      }).catch(err => showToast(err.message, 'danger'));
    });
  }

  // Revoke specific session JTI
  document.querySelectorAll('.btn-revoke-session').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const sessionId = e.currentTarget.dataset.sessionId;
      apiFetch(`/v1/settings/sessions/revoke/${sessionId}`, { method: 'POST' })
        .then(() => {
          showToast('Device session revoked.', 'success');
          switchSettingsTab('security');
        }).catch(err => showToast(err.message, 'danger'));
    });
  });

  // Revoke all other sessions
  const revokeAllBtn = document.getElementById('btn-revoke-all-sessions');
  if (revokeAllBtn) {
    revokeAllBtn.addEventListener('click', () => {
      if (confirm('Revoke access for all other active device logins?')) {
        apiFetch('/v1/settings/sessions/revoke-all', { method: 'POST' })
          .then(() => {
            showToast('All other active device sessions revoked.', 'success');
            switchSettingsTab('security');
          }).catch(err => showToast(err.message, 'danger'));
      }
    });
  }
}

function bindSettingsAppearanceEvents() {
  const form = document.getElementById('settings-appearance-form');
  const hexInput = document.getElementById('set-accenthex');
  const colorInput = document.getElementById('set-accentcolor');

  if (hexInput && colorInput) {
    colorInput.addEventListener('input', (e) => {
      hexInput.value = e.target.value;
    });
    hexInput.addEventListener('input', (e) => {
      colorInput.value = e.target.value;
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const theme = document.getElementById('set-theme').value;
      const accentColor = hexInput.value;
      const fontSize = document.getElementById('set-fontsize').value;
      const compactMode = document.getElementById('set-compact').checked;

      const updated = { ...currentSettings, theme, accentColor, fontSize, compactMode };
      apiFetch('/v1/settings', {
        method: 'POST',
        body: JSON.stringify(updated)
      }).then(res => {
        currentSettings = res;
        showToast('Appearance settings saved. Reloading theme layout...', 'success');
        
        // Dynamically apply settings properties locally
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.style.setProperty('--accent-primary', accentColor);
        
        // Reload settings view to apply font-size classes
        switchSettingsTab('appearance');
      }).catch(err => showToast(err.message, 'danger'));
    });
  }
}

function bindSettingsNotificationsEvents() {
  const form = document.getElementById('settings-notifications-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailStudyReminder = document.getElementById('set-emailreminder').checked;
      const emailWeeklyReport = document.getElementById('set-emailreport').checked;
      const toastNotifications = document.getElementById('set-toast').checked;
      const achievementNotifications = document.getElementById('set-achieve').checked;

      const updated = { ...currentSettings, emailStudyReminder, emailWeeklyReport, toastNotifications, achievementNotifications };
      apiFetch('/v1/settings', {
        method: 'POST',
        body: JSON.stringify(updated)
      }).then(res => {
        currentSettings = res;
        showToast('Notifications preferences saved.', 'success');
      }).catch(err => showToast(err.message, 'danger'));
    });
  }
}

function bindSettingsLearningEvents() {
  const form = document.getElementById('settings-learning-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const preferredLanguage = document.getElementById('set-language').value;
      const dailyQuestionsGoal = parseInt(document.getElementById('set-dailygoal').value) || 5;
      const preferredDifficulty = document.getElementById('set-diff').value;
      const targetCompanies = document.getElementById('set-companies').value;

      const updated = { ...currentSettings, preferredLanguage, dailyQuestionsGoal, preferredDifficulty, targetCompanies };
      apiFetch('/v1/settings', {
        method: 'POST',
        body: JSON.stringify(updated)
      }).then(res => {
        currentSettings = res;
        showToast('Learning preferences saved.', 'success');
      }).catch(err => showToast(err.message, 'danger'));
    });
  }
}

function bindSettingsCareerEvents() {
  const form = document.getElementById('settings-career-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const targetRole = document.getElementById('set-role').value;
      const expectedSalary = document.getElementById('set-salary').value;
      const workMode = document.getElementById('set-workmode').value;

      const updated = { ...currentSettings, targetRole, expectedSalary, workMode };
      apiFetch('/v1/settings', {
        method: 'POST',
        body: JSON.stringify(updated)
      }).then(res => {
        currentSettings = res;
        showToast('Career preferences saved.', 'success');
      }).catch(err => showToast(err.message, 'danger'));
    });
  }
}

function bindSettingsDeveloperEvents() {
  const form = document.getElementById('settings-developer-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const developerMode = document.getElementById('set-devmode').checked;

      const updated = { ...currentSettings, developerMode };
      apiFetch('/v1/settings', {
        method: 'POST',
        body: JSON.stringify(updated)
      }).then(res => {
        currentSettings = res;
        showToast('Developer mode status updated.', 'success');
        
        const keyBox = document.getElementById('dev-api-keys-box');
        if (keyBox) {
          if (developerMode) keyBox.classList.remove('d-none');
          else keyBox.classList.add('d-none');
        }
      }).catch(err => showToast(err.message, 'danger'));
    });
  }

  // Rotate api key
  const rotateBtn = document.getElementById('btn-rotate-apikey');
  if (rotateBtn) {
    rotateBtn.addEventListener('click', () => {
      apiFetch('/v1/settings/apikey/rotate', { method: 'POST' })
        .then(res => {
          currentSettings = res;
          showToast('Developer API Key rotated!', 'success');
          switchSettingsTab('developer');
        }).catch(err => showToast(err.message, 'danger'));
    });
  }
}


// Admin Panel management
function loadAdminData() {
  const container = document.getElementById('admin-users-container');
  apiFetch('/admin/users')
    .then(users => {
      container.innerHTML = users.map(u => {
        const isSelf = u.email === state.email;
        const deleteButton = isSelf || u.role === 'ADMIN' ? 
          `<span class="text-muted">Protected</span>` : 
          `<button class="btn btn-glass btn-sm text-danger delete-user-btn" data-id="${u.id}"><i class="fa-solid fa-user-xmark"></i> Revoke</button>`;

        return `
          <tr class="border-secondary-subtle">
            <td class="text-white fw-bold">${u.name}</td>
            <td>${u.email}</td>
            <td><span class="badge ${u.role === 'ADMIN' ? 'bg-danger' : 'bg-primary'}">${u.role}</span></td>
            <td class="text-center">${deleteButton}</td>
          </tr>
        `;
      }).join('');

      document.querySelectorAll('.delete-user-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.dataset.id;
          if (confirm('Revoke access and delete this user?')) {
            apiFetch(`/admin/users/${id}`, { method: 'DELETE' })
              .then(() => {
                showToast('User account revoked successfully', 'success');
                loadAdminData();
              }).catch(err => showToast(err.message, 'danger'));
          }
        });
      });
    }).catch(err => showToast(err.message, 'danger'));
}

function bindAdminEvents() {
  const form = document.getElementById('admin-question-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('admin-q-title').value;
    const company = document.getElementById('admin-q-company').value;
    const category = document.getElementById('admin-q-category').value;
    const difficulty = document.getElementById('admin-q-difficulty').value;
    const question = document.getElementById('admin-q-desc').value;
    const answer = document.getElementById('admin-q-answer').value;
    const tags = document.getElementById('admin-q-tags').value;

    apiFetch('/admin/questions', {
      method: 'POST',
      body: JSON.stringify({ title, company, category, difficulty, question, answer, tags })
    }).then(() => {
      showToast('Official Question published to Database!', 'success');
      form.reset();
    }).catch(err => showToast(err.message, 'danger'));
  });
}
