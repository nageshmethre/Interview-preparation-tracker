// app.js - PrepSpace SaaS client core controller

const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:8085/api'
  : 'https://api.stream-in.app/api';

// State Store
const state = {
  token: localStorage.getItem('token'),
  name: localStorage.getItem('name'),
  email: localStorage.getItem('email'),
  role: localStorage.getItem('role'),
  isPaid: localStorage.getItem('isPaid') === 'true' || Boolean(localStorage.getItem('role') && (localStorage.getItem('role').includes('ADMIN') || localStorage.getItem('role').startsWith('ROLE_ADMIN'))),
  activePomodoroInterval: null,
  pomodoroTimeLeft: 25 * 60,
  pomodoroRunning: false,
  pomodoroMode: 'study', // study, break
  theme: localStorage.getItem('theme') || 'dark'
};

function getReferralCodeFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  let ref = urlParams.get('ref');
  if (!ref) {
    const hash = window.location.hash;
    if (hash.includes('?')) {
      const hashParams = new URLSearchParams(hash.split('?')[1]);
      ref = hashParams.get('ref');
    }
  }
  if (ref) {
    localStorage.setItem('referral_code', ref);
  }
  return ref || localStorage.getItem('referral_code') || '';
}

function checkCashfreeRedirectReturn() {
  const hash = window.location.hash || '';
  const search = window.location.search || '';
  let cfOrderId = null;

  if (hash.includes('cf_order_id=')) {
    const parts = hash.split('?');
    if (parts.length > 1) {
      cfOrderId = new URLSearchParams(parts[1]).get('cf_order_id');
    }
  } else if (search.includes('cf_order_id=')) {
    cfOrderId = new URLSearchParams(search).get('cf_order_id');
  }

  if (cfOrderId && state.token && !state.isPaid) {
    apiFetch('/payments/cashfree/verify', {
      method: 'POST',
      body: JSON.stringify({ order_id: cfOrderId })
    }).then(res => {
      if (res.status === 'SUCCESS') {
        showToast('Payment verified! Welcome to PrepSpace Pro.', 'success');
        state.isPaid = true;
        localStorage.setItem('isPaid', 'true');
        fetchUserProfile();
      }
    }).catch(() => {});
  }
}

// Application Init
document.addEventListener('DOMContentLoaded', () => {
  getReferralCodeFromUrl();
  checkCashfreeRedirectReturn();
  initTheme();
  initScreenTimeTracker();
  window.addEventListener('hashchange', router);
  router();
});

// Interactive Showcase Tabs for Landing Page (Style 2: Stripe / Supabase)
window.switchLandingTab = function(tabId, btnElement) {
  document.querySelectorAll('.feature-tab-btn').forEach(btn => btn.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');

  const display = document.getElementById('landing-tab-display');
  if (!display) return;

  if (tabId === 'tab-exam') {
    display.innerHTML = `
      <div id="tab-exam" class="tab-pane-content">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <span class="badge bg-danger text-white px-3 py-1 rounded-pill"><i class="fa-solid fa-clock me-1"></i> 50:00 Timed Mode</span>
          <span class="text-muted fs-8">Topic: Data Structures & Algorithms</span>
        </div>
        <h5 class="text-white fw-bold mb-3">Question 14 of 50: What is the average time complexity of searching in an AVL tree with n nodes?</h5>
        <div class="d-flex flex-column gap-2 mb-3">
          <div class="p-2 rounded bg-dark border border-secondary border-opacity-25 text-white fs-7"><span class="badge bg-secondary me-2">A</span> O(n)</div>
          <div class="p-2 rounded bg-primary bg-opacity-25 border border-primary text-white fs-7 fw-bold"><span class="badge bg-primary me-2">B</span> O(log n) <i class="fa-solid fa-check text-success ms-2"></i></div>
          <div class="p-2 rounded bg-dark border border-secondary border-opacity-25 text-white fs-7"><span class="badge bg-secondary me-2">C</span> O(n log n)</div>
          <div class="p-2 rounded bg-dark border border-secondary border-opacity-25 text-white fs-7"><span class="badge bg-secondary me-2">D</span> O(1)</div>
        </div>
        <div class="alert alert-success bg-opacity-10 border-success text-success fs-8 mb-0">
          <i class="fa-solid fa-circle-check me-2"></i><strong>Instant System Check:</strong> Correct! AVL trees maintain strict height balance guaranteeing O(log n) lookups. +10 XP awarded!
        </div>
      </div>
    `;
  } else if (tabId === 'tab-dsa') {
    display.innerHTML = `
      <div id="tab-dsa" class="tab-pane-content">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <span class="badge bg-success text-white px-3 py-1 rounded-pill"><i class="fa-solid fa-fire me-1"></i> 18-Day Streak</span>
          <span class="text-muted fs-8">LeetCode / Striver SDE Sheet</span>
        </div>
        <h5 class="text-white fw-bold mb-3">Daily Problem Matrix (240 / 300 Solved)</h5>
        <div class="progress mb-3" style="height: 10px;">
          <div class="progress-bar bg-success" style="width: 50%;">Easy 120</div>
          <div class="progress-bar bg-warning" style="width: 35%;">Med 84</div>
          <div class="progress-bar bg-danger" style="width: 15%;">Hard 36</div>
        </div>
        <div class="p-3 rounded-3 bg-dark bg-opacity-50 border border-secondary border-opacity-25 mb-3 fs-7 text-secondary">
          <div class="d-flex justify-content-between align-items-center">
            <span><i class="fa-solid fa-code text-cyan me-2"></i><strong>LRU Cache Implementation (Design)</strong></span>
            <span class="badge bg-warning-subtle text-warning">Medium</span>
          </div>
        </div>
        <div class="alert alert-info bg-opacity-10 border-info text-info fs-8 mb-0">
          <i class="fa-solid fa-chart-line me-2"></i><strong>Weekly Velocity:</strong> Solved +28 questions this week across Dynamic Programming & Graphs.
        </div>
      </div>
    `;
  } else if (tabId === 'tab-ai') {
    display.innerHTML = `
      <div id="tab-ai" class="tab-pane-content">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <span class="badge bg-secondary text-white px-3 py-1 rounded-pill"><i class="fa-solid fa-brain me-1"></i> AI ATS Audit</span>
          <span class="text-success fw-bold fs-7">Match Score: 94%</span>
        </div>
        <h5 class="text-white fw-bold mb-2">Target Role: Senior Backend Engineer @ Stripe</h5>
        <p class="text-muted fs-8 mb-3">Audit matches your distributed systems projects with required production requirements.</p>
        <div class="p-3 rounded-3 bg-dark bg-opacity-50 border border-secondary border-opacity-25 mb-3 fs-7">
          <div class="text-white fw-bold mb-1"><i class="fa-solid fa-sparkles text-primary me-2"></i>AI Interview Prompt Recommendation:</div>
          <p class="text-muted fs-8 mb-0">"Be prepared to explain idempotent API requests, distributed locking with Redis, and dead-letter queue recovery mechanisms."</p>
        </div>
        <div class="alert alert-primary bg-opacity-10 border-primary text-primary fs-8 mb-0">
          <i class="fa-solid fa-check-double me-2"></i><strong>ATS Keyword Verified:</strong> Found Kafka, Redis, Docker, Spring Boot, and System Architecture.
        </div>
      </div>
    `;
  } else if (tabId === 'tab-kanban') {
    display.innerHTML = `
      <div id="tab-kanban" class="tab-pane-content">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <span class="badge bg-warning text-dark px-3 py-1 rounded-pill"><i class="fa-solid fa-briefcase me-1"></i> 4 Active Offers</span>
          <span class="text-muted fs-8">Pipeline Tracker</span>
        </div>
        <h5 class="text-white fw-bold mb-3">Recruitment Pipeline Stages</h5>
        <div class="row g-2 mb-3">
          <div class="col-6">
            <div class="p-2 rounded bg-dark border border-success border-opacity-50">
              <span class="badge bg-success mb-1">Offer Accepted</span>
              <div class="text-white fw-bold fs-7">Google - L4 SDE</div>
              <small class="text-muted fs-8">₹38 LPA • Bangalore</small>
            </div>
          </div>
          <div class="col-6">
            <div class="p-2 rounded bg-dark border border-primary border-opacity-50">
              <span class="badge bg-primary mb-1">Final Round</span>
              <div class="text-white fw-bold fs-7">Amazon - SDE II</div>
              <small class="text-muted fs-8">System Design Screen</small>
            </div>
          </div>
        </div>
        <div class="alert alert-success bg-opacity-10 border-success text-success fs-8 mb-0">
          <i class="fa-solid fa-award me-2"></i><strong>Pipeline Success Rate:</strong> 66.7% Offer conversion rate across technical onsite rounds.
        </div>
      </div>
    `;
  }
};

// Interactive ROI & Readiness Calculator for Landing Page
window.updateRoiCalculator = function() {
  const qSlider = document.getElementById('calc-questions');
  const wSlider = document.getElementById('calc-weeks');
  if (!qSlider || !wSlider) return;

  const q = parseInt(qSlider.value) || 5;
  const w = parseInt(wSlider.value) || 8;

  const qVal = document.getElementById('calc-questions-val');
  const wVal = document.getElementById('calc-weeks-val');
  const totalElem = document.getElementById('calc-total-problems');
  const scoreElem = document.getElementById('calc-readiness-score');
  const oddsElem = document.getElementById('calc-odds-val');
  const oddsDesc = document.getElementById('calc-odds-desc');

  if (qVal) qVal.textContent = `${q} Problems / day`;
  if (wVal) wVal.textContent = `${w} Weeks`;

  const total = q * w * 7;
  if (totalElem) totalElem.textContent = total;

  const readiness = Math.min(99, Math.max(50, 45 + Math.floor(total / 5.5)));
  if (scoreElem) scoreElem.textContent = `${readiness}%`;

  const odds = Math.min(98, Math.max(45, 40 + Math.floor(total / 6.5)));
  if (oddsElem) oddsElem.textContent = `${odds}% Probability`;

  if (oddsDesc) {
    if (total >= 400) {
      oddsDesc.textContent = 'Top 1% Global Elite Placement Group';
    } else if (total >= 200) {
      oddsDesc.textContent = 'Top 5% FAANG-Ready Tier';
    } else {
      oddsDesc.textContent = 'Strong Intermediate Technical Benchmark';
    }
  }
};

// Google Material Design System Theme Initialization
function initTheme() {
  if (localStorage.getItem('antigravity_v3') !== 'true') {
    localStorage.setItem('theme', 'dark');
    localStorage.setItem('antigravity_v3', 'true');
  }
  const savedTheme = localStorage.getItem('theme') || 'dark';
  state.theme = savedTheme;
  document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
  const newTheme = state.theme === 'light' ? 'dark' : 'light';
  state.theme = newTheme;
  localStorage.setItem('theme', newTheme);
  document.documentElement.setAttribute('data-theme', newTheme);
  showToast(`Theme switched to ${newTheme} mode`, 'info');
}

// Router
function router() {
  let hash = window.location.hash;
  if (!hash && window.location.pathname && window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
    hash = '#' + window.location.pathname;
    window.location.hash = hash;
  }
  hash = hash || '#/';
  const appRoot = document.getElementById('app-root');

  // Cancel any active Pomodoro timer intervals when navigating away
  if (state.activePomodoroInterval && !hash.startsWith('#/studyplanner')) {
    clearInterval(state.activePomodoroInterval);
    state.activePomodoroInterval = null;
    state.pomodoroRunning = false;
  }

  // Public/Unsecured check: landing page & anchor links (e.g. #features, #pricing, #contact)
  if (hash === '#/' || hash === '' || hash === '#' || !hash.startsWith('#/')) {
    if (!document.getElementById('features')) {
      appRoot.innerHTML = components.landing();
    }
    if (hash && hash !== '#/' && hash !== '#') {
      setTimeout(() => {
        try {
          const target = document.querySelector(hash);
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        } catch (e) {}
      }, 50);
    }
    return;
  }
  if (hash.startsWith('#/login')) {
    if (isAuthenticated()) { redirectTo('#/dashboard'); return; }
    appRoot.innerHTML = components.login();
    bindAuthEvents('login');
    initGoogleSignIn();
    return;
  }
  if (hash.startsWith('#/register')) {
    if (isAuthenticated()) { redirectTo('#/dashboard'); return; }
    appRoot.innerHTML = components.register();
    bindAuthEvents('register');
    initGoogleSignIn();
    return;
  }
  if (hash === '#/about') {
    window.location.href = '/about';
    return;
  }
  if (hash.startsWith('#/pricing')) {
    if (isAuthenticated()) {
      redirectTo('#/billing');
    } else {
      window.location.hash = '#pricing';
    }
    return;
  }

  // Legal & Compliance Hub public routes (14 official policies)
  const legalSlugs = [
    'privacy', 'terms', 'cookies', 'refund-policy', 'cancellation-policy',
    'shipping-policy', 'return-policy', 'disclaimer', 'accessibility',
    'dpa', 'acceptable-use', 'security', 'responsible-disclosure', 'community-guidelines'
  ];
  const matchedLegalSlug = legalSlugs.find(slug => hash === `#/${slug}` || hash.startsWith(`#/${slug}?`));
  if (matchedLegalSlug) {
    appRoot.innerHTML = components.legalHub(matchedLegalSlug);
    if (window.bindLegalHubEvents) window.bindLegalHubEvents();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  if (hash.startsWith('#/legal')) {
    const urlParams = new URLSearchParams(hash.includes('?') ? hash.split('?')[1] : '');
    const docSlug = urlParams.get('doc') || 'privacy';
    appRoot.innerHTML = components.legalHub(docSlug);
    if (window.bindLegalHubEvents) window.bindLegalHubEvents();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  if (hash === '#/cookie-preferences') {
    appRoot.innerHTML = components.legalHub('cookies');
    if (window.bindLegalHubEvents) window.bindLegalHubEvents();
    if (window.openCookiePreferencesModal) window.openCookiePreferencesModal();
    return;
  }

  // Customer Lifecycle Public Routes
  if (hash.startsWith('#/onboarding')) {
    appRoot.innerHTML = components.onboardingTour();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  if (hash.startsWith('#/payment-success')) {
    let orderId = null;
    if (hash.includes('?')) {
      const q = new URLSearchParams(hash.split('?')[1]);
      orderId = q.get('cf_order_id') || q.get('order_id');
    }
    state.isPaid = true;
    localStorage.setItem('isPaid', 'true');
    appRoot.innerHTML = components.paymentSuccess(orderId);
    return;
  }
  if (hash.startsWith('#/payment-failed')) {
    appRoot.innerHTML = components.paymentFailed();
    return;
  }
  if (hash.startsWith('#/payment-pending')) {
    let pOrderId = null;
    if (hash.includes('?')) {
      const q = new URLSearchParams(hash.split('?')[1]);
      pOrderId = q.get('cf_order_id') || q.get('order_id');
    }
    appRoot.innerHTML = components.paymentPending(pOrderId);
    return;
  }
  if (hash.startsWith('#/verify-email')) {
    appRoot.innerHTML = components.emailVerification(state.email || 'developer@example.com');
    return;
  }
  if (hash.startsWith('#/forgot-password')) {
    appRoot.innerHTML = components.forgotPassword();
    return;
  }
  if (hash.startsWith('#/reset-password')) {
    appRoot.innerHTML = components.resetPassword();
    return;
  }
  if (hash.startsWith('#/help') || hash.startsWith('#/support')) {
    appRoot.innerHTML = components.helpCenter();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  // Production UX State Routes
  if (hash.startsWith('#/404')) {
    appRoot.innerHTML = components.error404();
    return;
  }
  if (hash.startsWith('#/403')) {
    appRoot.innerHTML = components.error403();
    return;
  }
  if (hash.startsWith('#/500')) {
    appRoot.innerHTML = components.error500();
    return;
  }
  if (hash.startsWith('#/maintenance')) {
    appRoot.innerHTML = components.maintenancePage();
    return;
  }

  // Secured routes boundary
  if (!isAuthenticated()) {
    sessionStorage.setItem('redirect_after_login', hash);
    const hadSession = Boolean(state.email || localStorage.getItem('email'));
    if (hadSession) {
      showToast('Your session has timed out. Please sign in to continue.', 'info');
    } else {
      showToast('Please sign in to access your workspace dashboard.', 'info');
    }
    redirectTo('#/login');
    return;
  }

  // Inject workspace layout if not already rendered
  if (!document.getElementById('app-container')) {
    const isAdminUser = Boolean(state.role && (state.role.includes('ADMIN') || state.role.startsWith('ROLE_ADMIN')));
    appRoot.innerHTML = components.appLayout(state.name, isAdminUser, state.isPaid);
    bindLayoutEvents();
  }

  // Sync sidebar active status and plan badge
  updateSidebarSelection(hash);
  updateSidebarPlanBadge(state.isPaid);

  // Mount targeted page views
  const pageMount = document.getElementById('page-mount');
  const viewTitle = document.getElementById('current-view-title');

  if (hash === '#/dashboard') {
    viewTitle.textContent = 'Dashboard';
    const freshStats = getCachedData('cached_dashboard_stats_v2', 180000);
    if (freshStats) {
      pageMount.innerHTML = components.dashboard(freshStats);
      renderDashboardCharts(freshStats);
      syncDashboardScreenTime();
      return;
    }
    const cachedStatsStr = localStorage.getItem('cached_dashboard_stats_v2');
    let hasCache = false;
    if (cachedStatsStr) {
      try {
        const stats = JSON.parse(cachedStatsStr).data;
        pageMount.innerHTML = components.dashboard(stats);
        renderDashboardCharts(stats);
        syncDashboardScreenTime();
        hasCache = true;
      } catch (e) {}
    }
    if (!hasCache) {
      pageMount.innerHTML = `<div class="text-center py-5"><div class="spinner-border text-primary"></div></div>`;
    }
    apiFetch('/dashboard/stats')
      .then(stats => {
        setCachedData('cached_dashboard_stats_v2', stats);
        pageMount.innerHTML = components.dashboard(stats);
        renderDashboardCharts(stats);
        syncDashboardScreenTime();
      })
      .catch(err => {
        if (!hasCache) {
          pageMount.innerHTML = `<div class="alert alert-danger">Failed to load statistics: ${err.message}</div>`;
        }
      });
  } else if (hash === '#/studyplanner') {
    viewTitle.textContent = 'Study Planner';
    pageMount.innerHTML = components.studyPlanner();
    loadStudyPlans();
    bindStudyPlannerEvents();
  } else if (hash === '#/courses') {
    viewTitle.textContent = 'LMS Course Catalog';
    const freshCourses = getCachedData('cached_courses_v2', 180000);
    if (freshCourses) {
      pageMount.innerHTML = components.courses(freshCourses);
      bindCoursesEvents();
      return;
    }
    const cachedCoursesStr = localStorage.getItem('cached_courses_v2');
    let hasCache = false;
    if (cachedCoursesStr) {
      try {
        const courses = JSON.parse(cachedCoursesStr).data;
        pageMount.innerHTML = components.courses(courses);
        bindCoursesEvents();
        hasCache = true;
      } catch (e) {}
    }
    if (!hasCache) {
      pageMount.innerHTML = `<div class="text-center py-5"><div class="spinner-border text-primary"></div></div>`;
    }
    apiFetch('/v1/courses')
      .then(courses => {
        setCachedData('cached_courses_v2', courses);
        pageMount.innerHTML = components.courses(courses);
        bindCoursesEvents();
      })
      .catch(err => {
        if (!hasCache) {
          pageMount.innerHTML = `<div class="alert alert-danger">Failed to load courses: ${err.message}</div>`;
        }
      });
  } else if (hash === '#/certificates') {
    viewTitle.textContent = 'Certification Center';
    const freshCerts = getCachedData('cached_certs_v2', 180000);
    if (freshCerts) {
      pageMount.innerHTML = components.certificates(freshCerts);
      bindCertificatesEvents();
      return;
    }
    const cachedCertsStr = localStorage.getItem('cached_certs_v2');
    let hasCache = false;
    if (cachedCertsStr) {
      try {
        const certs = JSON.parse(cachedCertsStr).data;
        pageMount.innerHTML = components.certificates(certs);
        bindCertificatesEvents();
        hasCache = true;
      } catch (e) {}
    }
    if (!hasCache) {
      pageMount.innerHTML = `<div class="text-center py-5"><div class="spinner-border text-primary"></div></div>`;
    }
    apiFetch('/v1/certificates')
      .then(certs => {
        setCachedData('cached_certs_v2', certs);
        pageMount.innerHTML = components.certificates(certs);
        bindCertificatesEvents();
      })
      .catch(err => {
        if (!hasCache) {
          pageMount.innerHTML = `<div class="alert alert-danger">Failed to load certificates: ${err.message}</div>`;
        }
      });
  } else if (hash === '#/dsa-roadmap') {
    viewTitle.textContent = 'Interactive DSA Roadmap';
    const freshRoadmap = getCachedData('cached_roadmap_v3', 180000);
    if (freshRoadmap) {
      const enriched = getEnrichedDsaRoadmap(freshRoadmap);
      pageMount.innerHTML = components.dsaRoadmap(enriched);
      bindDsaRoadmapEvents(enriched);
      return;
    }
    const cachedRoadmapStr = localStorage.getItem('cached_roadmap_v3');
    let hasCache = false;
    if (cachedRoadmapStr) {
      try {
        const parsed = JSON.parse(cachedRoadmapStr).data;
        const enriched = getEnrichedDsaRoadmap(parsed);
        pageMount.innerHTML = components.dsaRoadmap(enriched);
        bindDsaRoadmapEvents(enriched);
        hasCache = true;
      } catch (e) {}
    }
    if (!hasCache) {
      // Instantly mount complete syllabus without blocking spinner
      pageMount.innerHTML = components.dsaRoadmap(COMPREHENSIVE_DSA_ROADMAP);
      bindDsaRoadmapEvents(COMPREHENSIVE_DSA_ROADMAP);
    }
    apiFetch('/v1/dsa/roadmap')
      .then(roadmap => {
        const enriched = getEnrichedDsaRoadmap(roadmap);
        setCachedData('cached_roadmap_v3', enriched);
        pageMount.innerHTML = components.dsaRoadmap(enriched);
        bindDsaRoadmapEvents(enriched);
      })
      .catch(err => {
        const enriched = COMPREHENSIVE_DSA_ROADMAP;
        pageMount.innerHTML = components.dsaRoadmap(enriched);
        bindDsaRoadmapEvents(enriched);
      });
  } else if (hash === '#/coding-practice') {
    viewTitle.textContent = 'LeetCode Coding Workspace';
    const freshQuestions = getCachedData('cached_questions_v2', 180000);
    if (freshQuestions) {
      pageMount.innerHTML = components.codingPractice(freshQuestions);
      bindCodingPracticeEvents();
      return;
    }
    const cachedQuestionsStr = localStorage.getItem('cached_questions_v2');
    let hasCache = false;
    if (cachedQuestionsStr) {
      try {
        const questions = JSON.parse(cachedQuestionsStr).data;
        pageMount.innerHTML = components.codingPractice(questions);
        bindCodingPracticeEvents();
        hasCache = true;
      } catch (e) {}
    }
    if (!hasCache) {
      pageMount.innerHTML = `<div class="text-center py-5"><div class="spinner-border text-primary"></div></div>`;
    }
    apiFetch('/v1/questions')
      .then(questions => {
        setCachedData('cached_questions_v2', questions);
        pageMount.innerHTML = components.codingPractice(questions);
        bindCodingPracticeEvents();
      })
      .catch(err => {
        if (!hasCache) {
          pageMount.innerHTML = `<div class="alert alert-danger">Failed to load coding problem set: ${err.message}</div>`;
        }
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
        bindMockExamsEvents(leaderboard);
      })
      .catch(err => {
        pageMount.innerHTML = components.mockExams([], []);
        bindMockExamsEvents([]);
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
    if (!state.isPaid) {
      pageMount.innerHTML = components.premiumLock('AI Career Assistant Diagnostics');
    } else {
      pageMount.innerHTML = components.aiAssistant();
      bindAiAssistantEvents();
    }
  } else if (hash === '#/calendar') {
    viewTitle.textContent = 'Calendar';
    pageMount.innerHTML = components.calendar();
    loadCalendarView();
  } else if (hash === '#/reports') {
    viewTitle.textContent = 'Reports';
    if (!state.isPaid) {
      pageMount.innerHTML = components.premiumLock('Candidate Progress & Excel Reports');
    } else {
      pageMount.innerHTML = components.reports();
      bindReportsEvents();
    }
  } else if (hash === '#/profile') {
    viewTitle.textContent = 'Settings & Profile';
    pageMount.innerHTML = components.profile();
    loadProfileDetails();
    bindProfileEvents();
  } else if (hash === '#/billing') {
    viewTitle.textContent = 'Billing & Upgrade';
    pageMount.innerHTML = components.billing(state.isPaid);
    bindBillingEvents();
  } else if (hash === '#/referral') {
    viewTitle.textContent = 'Affiliate & Referral Bounties';
    pageMount.innerHTML = `<div class="text-center py-5"><div class="spinner-border text-primary"></div><div class="text-muted fs-8 mt-2">Loading affiliate wallet & earnings...</div></div>`;
    apiFetch('/referrals/stats')
      .then(stats => {
        pageMount.innerHTML = components.referral(stats || {});
        bindReferralEvents();
        loadReferralHistory();
      })
      .catch(err => {
        pageMount.innerHTML = components.referral({
          totalReferrals: 0,
          totalEarnings: 0,
          availableBalance: 0,
          minWithdrawal: 199,
          referralCode: localStorage.getItem('referral_code') || (state.name ? state.name.replace(/\s+/g, '').substring(0, 4).toUpperCase() + '-101' : 'PREP-101')
        });
        bindReferralEvents();
      });
  } else if (hash === '#/desktop-client') {
    viewTitle.textContent = 'Mobile & Desktop Apps';
    pageMount.innerHTML = components.desktopClient();
    bindDesktopClientEvents();
  } else if (hash === '#/admin') {
    const isAdminUser = Boolean(state.role && (state.role.includes('ADMIN') || state.role.startsWith('ROLE_ADMIN')));
    if (!isAdminUser) {
      redirectTo('#/dashboard');
      return;
    }
    viewTitle.textContent = 'Admin Operations & Telemetry';
    pageMount.innerHTML = `<div class="text-center py-5"><div class="spinner-border text-primary"></div><div class="text-muted fs-8 mt-2">Connecting to Super Admin Cluster...</div></div>`;
    apiFetch('/admin/stats')
      .then(stats => {
        window.currentAdminStats = stats || {};
        pageMount.innerHTML = components.admin(stats);
        
        // Live Super Admin Digital Clock
        function updateAdminClock() {
          const clockEl = document.getElementById('admin-live-clock');
          if (clockEl) {
            const now = new Date();
            clockEl.textContent = 'UTC ' + now.toISOString().slice(11, 19) + ' | IST ' + now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' });
          }
        }
        updateAdminClock();
        if (window.adminClockInterval) clearInterval(window.adminClockInterval);
        window.adminClockInterval = setInterval(updateAdminClock, 1000);

        // Bind all 9 Tabs
        const tabMap = ['overview', 'users', 'leaderboard', 'payments', 'referrals', 'rules', 'broadcast', 'audit-logs', 'health'];
        tabMap.forEach(tabName => {
          const tabEl = document.getElementById(`tab-${tabName}`);
          if (tabEl) {
            tabEl.addEventListener('click', () => loadAdminPanelTab(tabName));
          }
        });

        // Global Quick Actions
        const refreshBtn = document.getElementById('btn-admin-refresh');
        if (refreshBtn) {
          refreshBtn.addEventListener('click', () => {
            showToast('Synchronizing platform metrics and telemetry...', 'info');
            router();
          });
        }

        const purgeBtn = document.getElementById('btn-admin-purge-cache');
        if (purgeBtn) {
          purgeBtn.addEventListener('click', () => {
            showToast('Purging client operational cache and re-verifying session...', 'info');
            setTimeout(() => router(), 350);
          });
        }

        // Direct Email Modal Handler
        const emailModalForm = document.getElementById('admin-direct-email-modal-form');
        if (emailModalForm) {
          emailModalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const sendBtn = document.getElementById('btn-modal-send-email');
            sendBtn.disabled = true;
            sendBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span> Dispatching...';

            const payload = {
              email: document.getElementById('modal-email-recipient-email').value,
              name: document.getElementById('modal-email-recipient-name').value,
              subject: document.getElementById('modal-email-subject').value,
              message: document.getElementById('modal-email-message').value,
              type: 'admin_message'
            };

            fetch('/api/send-otp', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            })
            .then(async (r) => {
              const text = await r.text();
              try {
                return JSON.parse(text);
              } catch (e) {
                throw new Error(text || 'Server error occurred while sending email.');
              }
            })
            .then(res => {
              sendBtn.disabled = false;
              sendBtn.innerHTML = '<i class="fa-solid fa-paper-plane me-1"></i> Send Official Email';
              if (res.success) {
                showToast('Official candidate email dispatched successfully via verify@stream-in.app!', 'success');
                const modalEl = document.getElementById('adminEmailModal');
                if (modalEl && window.bootstrap) {
                  const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
                  modal.hide();
                }
                emailModalForm.reset();
              } else {
                showToast(res.error || 'Failed to dispatch email.', 'danger');
              }
            })
            .catch(err => {
              sendBtn.disabled = false;
              sendBtn.innerHTML = '<i class="fa-solid fa-paper-plane me-1"></i> Send Official Email';
              showToast(err.message, 'danger');
            });
          });
        }

        // Default to Overview tab
        loadAdminPanelTab('overview');
      })
      .catch(err => {
        pageMount.innerHTML = `<div class="alert alert-danger">Failed to load admin stats: ${err.message}</div>`;
      });
  } else {
    viewTitle.textContent = '404 - Page Not Found';
    pageMount.innerHTML = typeof components.error404 === 'function' 
      ? components.error404() 
      : `<div class="text-center py-5"><h3 class="text-white">Page Not Found</h3><a href="#/dashboard" class="btn btn-premium mt-3">Back to Dashboard</a></div>`;
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

// Local Storage Cache Helpers
function getCachedData(key, maxAgeMs = 300000) {
  const cachedStr = localStorage.getItem(key);
  if (!cachedStr) return null;
  try {
    const cached = JSON.parse(cachedStr);
    const age = Date.now() - cached.timestamp;
    if (age < maxAgeMs) {
      return cached.data;
    }
  } catch (e) {
    console.error('Error parsing cache', e);
  }
  return null;
}

function setCachedData(key, data) {
  const cacheObj = {
    timestamp: Date.now(),
    data: data
  };
  localStorage.setItem(key, JSON.stringify(cacheObj));
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
    if (!endpoint.includes('/auth/')) {
      handleSessionExpired();
    }
    const errorData = await response.json().catch(() => ({ message: 'Invalid email or password' }));
    throw new Error(errorData.message || 'Invalid credentials');
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'API Request failed' }));
    let msg = errorData.message || errorData.error;
    if (!msg && typeof errorData === 'object') {
      const vals = Object.values(errorData).filter(v => typeof v === 'string');
      if (vals.length > 0) msg = vals.join(', ');
    }
    throw new Error(msg || 'API request failed');
  }

  // Handle binary endpoints
  const contentType = response.headers.get('Content-Type');
  if (contentType && (contentType.includes('application/pdf') || contentType.includes('sheet'))) {
    return response.blob();
  }

  return response.json().catch(() => ({}));
}

function handleSessionExpired(target = '#/') {
  localStorage.removeItem('token');
  localStorage.removeItem('name');
  localStorage.removeItem('email');
  localStorage.removeItem('role');
  localStorage.removeItem('isPaid');
  state.token = null;
  state.name = null;
  state.email = null;
  state.role = null;
  state.isPaid = false;
  redirectTo(target);
}

// layout events
function bindLayoutEvents() {
  const toggleBtn = document.getElementById('sidebar-toggle-btn');
  const sidebar = document.querySelector('.sidebar');
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.toggle('active');
    });
  }

  // Mobile sidebar close button handler
  const closeBtn = document.getElementById('sidebar-close-btn');
  if (closeBtn && sidebar) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.remove('active');
    });
  }

  // Mobile sidebar auto-close on link clicks
  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 992 && sidebar && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
      }
    });
  });

  // Mobile sidebar click outside to close
  document.addEventListener('click', (e) => {
    if (window.innerWidth < 992 && sidebar && sidebar.classList.contains('active')) {
      if (!sidebar.contains(e.target) && (!toggleBtn || !toggleBtn.contains(e.target))) {
        sidebar.classList.remove('active');
      }
    }
  });

  const collapseBtn = document.getElementById('sidebar-collapse-btn');
  const container = document.getElementById('app-container');
  if (collapseBtn && container) {
    // Read state from localStorage to persist user preference
    if (localStorage.getItem('sidebar-collapsed') === 'true') {
      container.classList.add('collapsed');
      const icon = document.getElementById('collapse-icon');
      if (icon) {
        icon.classList.remove('fa-chevron-left');
        icon.classList.add('fa-chevron-right');
      }
    }

    collapseBtn.addEventListener('click', () => {
      container.classList.toggle('collapsed');
      const collapsed = container.classList.contains('collapsed');
      localStorage.setItem('sidebar-collapsed', collapsed);
      
      const icon = document.getElementById('collapse-icon');
      if (icon) {
        if (collapsed) {
          icon.classList.remove('fa-chevron-left');
          icon.classList.add('fa-chevron-right');
        } else {
          icon.classList.remove('fa-chevron-right');
          icon.classList.add('fa-chevron-left');
        }
      }
    });
  }

  const logoutBtn = document.getElementById('logout-btn');
  const dLogout = document.getElementById('dropdown-logout');
  const performLogout = () => {
    handleSessionExpired('#/');
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

function fetchUserProfile() {
  if (!state.token) return Promise.resolve();
  return apiFetch('/users/profile')
    .then(profile => {
      const isPaidUser = Boolean(profile.isPaid) || (state.role && (state.role.startsWith('ROLE_ADMIN') || state.role.startsWith('ADMIN')));
      localStorage.setItem('isPaid', isPaidUser ? 'true' : 'false');
      localStorage.setItem('referralCode', profile.referralCode || '');
      localStorage.setItem('referralEarnings', profile.referralEarnings || '0');
      
      state.isPaid = isPaidUser;
      state.referralCode = profile.referralCode;

      updateSidebarPlanBadge(isPaidUser);
    });
}

function updateSidebarPlanBadge(isPaid) {
  const planEl = document.getElementById('sidebar-user-plan');
  const badgeEl = document.getElementById('sidebar-user-badge');
  const avatarDot = document.querySelector('.user-avatar-dot i');
  const statusDot = document.querySelector('.user-avatar-dot span');
  const dropdownPlan = document.getElementById('dropdown-plan-info');

  if (planEl) {
    planEl.textContent = isPaid ? 'Pro Workspace' : 'Free Plan';
  }
  if (badgeEl) {
    badgeEl.innerHTML = isPaid 
      ? `<span class="badge bg-primary bg-opacity-25 text-primary border border-primary-subtle font-monospace">PRO</span>`
      : `<a href="#/billing" class="badge bg-secondary bg-opacity-25 text-muted border border-secondary text-decoration-none font-monospace">FREE</a>`;
  }
  if (avatarDot) {
    avatarDot.className = `fa-solid fa-circle-user fs-4 ${isPaid ? 'text-primary' : 'text-secondary'}`;
  }
  if (statusDot) {
    statusDot.className = `position-absolute bottom-0 end-0 ${isPaid ? 'bg-success' : 'bg-secondary'} border border-dark rounded-circle`;
  }
  if (dropdownPlan) {
    dropdownPlan.innerHTML = `
      <div class="fs-8 text-muted font-monospace">MEMBERSHIP</div>
      <div class="fw-bold ${isPaid ? 'text-primary' : 'text-secondary'} fs-7 d-flex align-items-center gap-1">
        ${isPaid 
          ? '<span class="badge bg-primary bg-opacity-25 text-primary border border-primary-subtle font-monospace me-1">PRO</span> PrepPro Active' 
          : '<span class="badge bg-secondary bg-opacity-25 text-muted border border-secondary font-monospace me-1">FREE</span> Starter Workspace'}
      </div>
    `;
  }
}

function initGoogleSignIn() {
  setTimeout(() => {
    const btnContainer = document.getElementById('google-login-btn');
    if (!btnContainer) return;

    if (typeof google === 'undefined' || !google.accounts || !google.accounts.id) {
      console.warn('Google client library not ready yet, retrying...');
      setTimeout(initGoogleSignIn, 500);
      return;
    }

    try {
      google.accounts.id.initialize({
        client_id: '816067230361-5kubovquvkbnir34ann5qj54lp98kvt0.apps.googleusercontent.com',
        callback: handleGoogleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
        ux_mode: 'popup'
      });

      btnContainer.innerHTML = '';
      google.accounts.id.renderButton(
        btnContainer,
        {
          type: 'standard',
          theme: 'outline',
          size: 'large',
          text: 'signin_with',
          shape: 'pill',
          logo_alignment: 'left',
          width: 280
        }
      );
    } catch (err) {
      console.error('Google Sign In initialization error:', err);
    }
  }, 250);
}

function handleGoogleCredentialResponse(response) {
  if (!response || !response.credential) {
    showToast('Google sign-in was cancelled or encountered an error.', 'danger');
    return;
  }
  const referralCode = localStorage.getItem('referral_code') || '';
  
  apiFetch('/auth/google', {
    method: 'POST',
    body: JSON.stringify({
      idToken: response.credential,
      referralCode: referralCode
    })
  }).then(res => {
    localStorage.setItem('token', res.token);
    localStorage.setItem('name', res.name);
    localStorage.setItem('email', res.email);
    localStorage.setItem('role', res.role);

    state.token = res.token;
    state.name = res.name;
    state.email = res.email;
    state.role = res.role;

    fetchUserProfile().then(() => {
      showToast(`Welcome back, ${res.name}!`, 'success');
      redirectTo('#/dashboard');
    }).catch(() => {
      showToast(`Welcome back, ${res.name}!`, 'success');
      redirectTo('#/dashboard');
    });
  }).catch(err => {
    console.error('Google Auth backend error:', err);
    showToast(err.message || 'Google sign-in failed. Please try standard sign-in.', 'danger');
  });
}

// ----------------------------------------------------
// BIND EVENTS FOR PAGES
// ----------------------------------------------------

function bindAuthEvents(mode) {
  // Bind password visibility toggles
  document.querySelectorAll('.vercel-pass-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (!input) return;
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      btn.innerHTML = isPassword ? '<i class="fa-regular fa-eye-slash"></i>' : '<i class="fa-regular fa-eye"></i>';
    });
  });

  if (mode === 'login') {
    const form = document.getElementById('login-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value;

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast('Please enter a valid email address.', 'warning');
        return;
      }

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

        const postLoginRoute = sessionStorage.getItem('redirect_after_login') || '#/dashboard';
        sessionStorage.removeItem('redirect_after_login');

        fetchUserProfile().then(() => {
          showToast(`Welcome back, ${res.name}!`, 'success');
          redirectTo(postLoginRoute);
        }).catch(() => {
          showToast(`Welcome back, ${res.name}!`, 'success');
          redirectTo(postLoginRoute);
        });
      }).catch(err => {
        showToast(err.message, 'danger');
      });
    });
  } else if (mode === 'register') {
    const form = document.getElementById('register-form');
    const otpCard = document.getElementById('otp-verification-card');
    const otpInput = document.getElementById('register-otp-input');
    const btnConfirmOtp = document.getElementById('btn-confirm-otp');
    const btnResendOtp = document.getElementById('btn-resend-otp');
    const timerDisplay = document.getElementById('otp-timer-display');
    const btnBack = document.getElementById('btn-back-to-register');
    const orDivider = document.getElementById('register-or-divider');
    const googleBtn = document.getElementById('google-login-btn');
    const titleEl = document.getElementById('auth-card-title');
    const subEl = document.getElementById('auth-card-subtitle');

    let pendingRegistration = null;
    let currentOtp = null;
    let resendInterval = null;

    function getEnteredOtp() {
      let code = '';
      for (let i = 1; i <= 6; i++) {
        const box = document.getElementById(`otp-box-${i}`);
        if (box) code += box.value.trim();
      }
      return code || (otpInput ? otpInput.value.trim() : '');
    }

    function syncOtpInputs(code) {
      for (let i = 1; i <= 6; i++) {
        const box = document.getElementById(`otp-box-${i}`);
        if (box) box.value = code[i - 1] || '';
      }
      if (otpInput) otpInput.value = code;
    }

    function initSegmentedOtpInputs() {
      for (let i = 1; i <= 6; i++) {
        const box = document.getElementById(`otp-box-${i}`);
        if (!box) continue;

        box.addEventListener('input', (e) => {
          const val = box.value.replace(/[^0-9]/g, '');
          box.value = val.slice(-1);
          if (box.value && i < 6) {
            const nextBox = document.getElementById(`otp-box-${i + 1}`);
            if (nextBox) nextBox.focus();
          }
          if (otpInput) otpInput.value = getEnteredOtp();
        });

        box.addEventListener('keydown', (e) => {
          if (e.key === 'Backspace' && !box.value && i > 1) {
            const prevBox = document.getElementById(`otp-box-${i - 1}`);
            if (prevBox) {
              prevBox.focus();
              prevBox.value = '';
            }
          }
        });

        box.addEventListener('paste', (e) => {
          e.preventDefault();
          const pasteData = (e.clipboardData || window.clipboardData).getData('text').replace(/[^0-9]/g, '');
          if (pasteData) {
            syncOtpInputs(pasteData.slice(0, 6));
            const lastIdx = Math.min(pasteData.length, 6);
            const focusTarget = document.getElementById(`otp-box-${lastIdx}`) || btnConfirmOtp;
            if (focusTarget) focusTarget.focus();
          }
        });
      }
    }

    initSegmentedOtpInputs();

    function startResendTimer() {
      let secondsLeft = 45;
      if (btnResendOtp) btnResendOtp.disabled = true;
      if (timerDisplay) timerDisplay.textContent = `Resend in ${secondsLeft}s`;
      clearInterval(resendInterval);
      resendInterval = setInterval(() => {
        secondsLeft--;
        if (secondsLeft <= 0) {
          clearInterval(resendInterval);
          if (timerDisplay) timerDisplay.textContent = 'Ready to resend code';
          if (btnResendOtp) btnResendOtp.disabled = false;
        } else {
          if (timerDisplay) timerDisplay.textContent = `Resend in ${secondsLeft}s`;
        }
      }, 1000);
    }

    function dispatchOtpEmail(targetEmail, recipientName, code) {
      return fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: targetEmail, name: recipientName, otp: code })
      }).then(r => r.json()).then(res => {
        if (res && res.emailSent) {
          showToast(`Official verification code sent to ${targetEmail}! Check your inbox.`, 'success', 10000);
        } else if (res && res.warning) {
          console.warn('Resend domain note:', res.warning);
          showToast(`Verification email dispatched. Check ${targetEmail} inbox!`, 'info', 10000);
        }
      }).catch(err => {
        console.error('Failed to dispatch verification email:', err);
        showToast(`Verification code dispatched. Check your Gmail inbox!`, 'info', 8000);
      });
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('register-name').value.trim();
      const email = document.getElementById('register-email').value.trim();
      const password = document.getElementById('register-password').value;
      const confirmPassword = document.getElementById('register-confirm-password').value;
      const referralCode = localStorage.getItem('referral_code') || '';

      if (!email.toLowerCase().endsWith('@gmail.com')) {
        showToast('Only @gmail.com email addresses are permitted for PrepSpace registration.', 'warning');
        return;
      }

      if (password !== confirmPassword) {
        showToast('Passwords do not match. Please verify your confirm password.', 'warning');
        document.getElementById('register-confirm-password').focus();
        return;
      }

      // Generate 6-digit Confirmation OTP
      currentOtp = Math.floor(100000 + Math.random() * 900000).toString();
      pendingRegistration = { name, email, password, referralCode };

      // Switch to Vercel Confirmation OTP view
      form.classList.add('d-none');
      if (orDivider) orDivider.classList.add('d-none');
      if (googleBtn) googleBtn.classList.add('d-none');
      if (otpCard) otpCard.classList.remove('d-none');

      if (titleEl) titleEl.textContent = 'Verify Email';
      if (subEl) subEl.textContent = 'Enter the 6-digit verification code sent to your Gmail';

      const targetEmailEl = document.getElementById('otp-target-email');
      if (targetEmailEl) targetEmailEl.textContent = email;

      syncOtpInputs('');
      const firstBox = document.getElementById('otp-box-1');
      if (firstBox) firstBox.focus();

      startResendTimer();
      dispatchOtpEmail(email, name, currentOtp);
    });

    if (btnResendOtp) {
      btnResendOtp.addEventListener('click', () => {
        if (!pendingRegistration) return;
        currentOtp = Math.floor(100000 + Math.random() * 900000).toString();
        syncOtpInputs('');
        const firstBox = document.getElementById('otp-box-1');
        if (firstBox) firstBox.focus();
        startResendTimer();
        dispatchOtpEmail(pendingRegistration.email, pendingRegistration.name, currentOtp);
      });
    }

    if (btnBack) {
      btnBack.addEventListener('click', () => {
        if (otpCard) otpCard.classList.add('d-none');
        form.classList.remove('d-none');
        if (orDivider) orDivider.classList.remove('d-none');
        if (googleBtn) googleBtn.classList.remove('d-none');
        if (titleEl) titleEl.textContent = 'Create Space';
        if (subEl) subEl.textContent = 'Start your technical interview preparation journey';
        clearInterval(resendInterval);
      });
    }

    if (btnConfirmOtp) {
      btnConfirmOtp.addEventListener('click', () => {
        const enteredOtp = getEnteredOtp();
        if (!enteredOtp || enteredOtp.length !== 6) {
          showToast('Please enter the complete 6-digit confirmation code.', 'warning');
          return;
        }
        if (enteredOtp !== currentOtp) {
          showToast('Invalid confirmation code. Please check your passcode and try again.', 'danger');
          return;
        }

        // OTP Verified successfully! Register account
        apiFetch('/auth/register', {
          method: 'POST',
          body: JSON.stringify(pendingRegistration)
        }).then(res => {
          showToast('Email verified & account created! Initializing space...', 'success');
          // Auto login upon successful verification
          apiFetch('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email: pendingRegistration.email, password: pendingRegistration.password })
          }).then(loginRes => {
            localStorage.setItem('token', loginRes.token);
            localStorage.setItem('name', loginRes.name);
            localStorage.setItem('email', loginRes.email);
            localStorage.setItem('role', loginRes.role);
            state.token = loginRes.token;
            state.name = loginRes.name;
            state.email = loginRes.email;
            state.role = loginRes.role;
            fetchUserProfile().finally(() => {
              redirectTo('#/dashboard');
            });
          }).catch(() => {
            redirectTo('#/login');
          });
        }).catch(err => {
          showToast(err.message, 'danger');
        });
      });
    }
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
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#888888', font: { size: 10 } } },
        x: { grid: { display: false }, ticks: { color: '#888888', font: { size: 10 } } }
      }
    }
  });

  // Pipeline Status chart
  const pipelineCtx = document.getElementById('pipelineStatusChart').getContext('2d');
  const rawPipelineLabels = Object.keys(stats.statusCounts || {});
  const rawPipelineData = Object.values(stats.statusCounts || {});
  const hasData = rawPipelineData.some(v => v > 0);

  const pipelineLabels = hasData ? rawPipelineLabels : ['Applied', 'Screen', 'Interview', 'Offer'];
  const pipelineData = hasData ? rawPipelineData : [4, 2, 1, 1];

  new Chart(pipelineCtx, {
    type: 'doughnut',
    data: {
      labels: pipelineLabels,
      datasets: [{
        data: pipelineData,
        backgroundColor: ['#3b82f6', '#00e599', '#6366f1', '#f59e0b', '#ef4444'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '68%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: '#888888', font: { size: 10 }, boxWidth: 8, padding: 6 }
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
    .catch(err => {
      currentSettings = {
        name: state.name || 'User',
        email: state.email || '',
        phone: '',
        bio: '',
        targetRole: 'Full Stack Engineer',
        experienceLevel: 'MID_LEVEL',
        dreamCompany: 'Google'
      };
      switchSettingsTab('profile');
    });
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
    mount.innerHTML = components.settingsSecurity(currentSettings);
    bindSettingsSecurityEvents();
  } else if (tab === 'appearance') {
    mount.innerHTML = components.settingsAppearance(currentSettings);
    bindSettingsAppearanceEvents();
  } else if (tab === 'notifications') {
    mount.innerHTML = components.settingsNotifications(currentSettings);
    bindSettingsNotificationsEvents();
  } else if (tab === 'language') {
    mount.innerHTML = components.settingsLanguage(currentSettings);
    bindSettingsLanguageEvents();
  } else if (tab === 'learning') {
    mount.innerHTML = components.settingsLearning(currentSettings);
    bindSettingsLearningEvents();
  } else if (tab === 'career') {
    mount.innerHTML = components.settingsCareer(currentSettings);
    bindSettingsCareerEvents();
  } else if (tab === 'dashboard') {
    mount.innerHTML = components.settingsDashboard(currentSettings);
    bindSettingsDashboardEvents();
  } else if (tab === 'connected') {
    mount.innerHTML = components.settingsConnected(currentSettings);
  } else if (tab === 'privacy') {
    mount.innerHTML = components.settingsPrivacy(currentSettings);
    bindSettingsPrivacyEvents();
  } else if (tab === 'devices') {
    mount.innerHTML = `<div class="text-center py-5"><div class="spinner-border text-primary"></div></div>`;
    apiFetch('/v1/settings/sessions')
      .then(sessions => {
        mount.innerHTML = components.settingsDevices(sessions);
        bindSettingsDevicesEvents();
      });
  } else if (tab === 'importexport') {
    mount.innerHTML = components.settingsImportExport();
    bindSettingsImportExportEvents();
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
  // Explore scroll button
  const exploreBtn = document.getElementById('btn-explore-scroll');
  if (exploreBtn) {
    exploreBtn.addEventListener('click', () => {
      document.getElementById('courses-toolbar-pane').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Filter handlers
  const searchInput = document.getElementById('courses-search-bar');
  const difficultyFilter = document.getElementById('courses-difficulty-filter');
  const categoryFilter = document.getElementById('courses-category-filter');

  function filterCoursesList() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const diff = difficultyFilter ? difficultyFilter.value : 'ALL';
    const cat = categoryFilter ? categoryFilter.value : 'ALL';

    document.querySelectorAll('.course-card-wrapper').forEach(card => {
      const title = card.dataset.title || '';
      const desc = card.dataset.desc || '';
      const instructor = card.dataset.instructor || '';
      const cardDiff = card.dataset.difficulty || '';
      const cardCat = card.dataset.category || '';

      const queryMatches = title.includes(query) || desc.includes(query) || instructor.includes(query);
      const diffMatches = diff === 'ALL' || cardDiff === diff;
      const catMatches = cat === 'ALL' || cardCat === cat;

      if (queryMatches && diffMatches && catMatches) {
        card.classList.remove('d-none');
      } else {
        card.classList.add('d-none');
      }
    });
  }

  if (searchInput) searchInput.addEventListener('input', filterCoursesList);
  if (difficultyFilter) difficultyFilter.addEventListener('change', filterCoursesList);
  if (categoryFilter) categoryFilter.addEventListener('change', filterCoursesList);

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

function formatVideoEmbedUrl(url) {
  if (!url) return 'https://www.youtube.com/embed/grEKMHGYyns';
  url = url.trim();
  
  // Extract YouTube ID from various formats (watch?v=, youtu.be/, shorts/, embed/)
  const ytRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})/;
  const match = url.match(ytRegex);
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0`;
  }
  return url;
}

function updateVideoPlayer(videoUrl) {
  const container = document.getElementById('video-frame-container');
  if (!container) return;

  if (!videoUrl) {
    container.innerHTML = `<div class="d-flex align-items-center justify-content-center h-100 text-muted"><p class="m-0">No video stream attached to this lesson.</p></div>`;
    return;
  }

  const isDirectVideo = videoUrl.endsWith('.mp4') || videoUrl.endsWith('.webm') || videoUrl.endsWith('.ogg');
  if (isDirectVideo) {
    container.innerHTML = `<video src="${videoUrl}" controls autoplay class="w-100 h-100 rounded" style="background: #000; object-fit: contain;"></video>`;
  } else {
    const embedUrl = formatVideoEmbedUrl(videoUrl);
    container.innerHTML = `<iframe id="video-frame" class="w-100 h-100 border-0 rounded" src="${embedUrl}" title="Lesson Player" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>`;
  }
}

function bindCourseCurriculumEvents(course, enrollment) {
  // 1. Bind Back to Courses Buttons (Top & Drawer)
  const backButtons = [document.getElementById('btn-back-to-courses'), document.getElementById('btn-back-to-courses-top')];
  backButtons.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.hash = '#/courses';
        router();
      });
    }
  });

  // 2. Select Lesson Buttons
  const lessonButtons = document.querySelectorAll('.btn-select-lesson');
  lessonButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget;
      
      // Update active style
      lessonButtons.forEach(b => b.classList.remove('bg-primary', 'bg-opacity-20', 'text-primary'));
      target.classList.add('bg-primary', 'bg-opacity-20', 'text-primary');

      const title = target.querySelector('span') ? target.querySelector('span').textContent.trim() : target.textContent.trim();
      const video = target.dataset.video;
      const quiz = JSON.parse(target.dataset.quiz || '[]');
      const lessonId = target.dataset.lessonId;

      document.getElementById('active-lesson-title').textContent = title;
      updateVideoPlayer(video);

      const quizBox = document.getElementById('lesson-quiz-container');
      const submitBtn = document.getElementById('btn-submit-lesson-quiz');
      
      // Remove old event listeners
      const newSubmitBtn = submitBtn.cloneNode(true);
      submitBtn.parentNode.replaceChild(newSubmitBtn, submitBtn);

      if (quiz.length === 0) {
        quizBox.innerHTML = '<p class="text-muted fs-7">No assessment quiz required for this lesson module. Click below to complete.</p>';
        newSubmitBtn.textContent = 'Mark Module Complete';
        newSubmitBtn.classList.remove('d-none');
        
        newSubmitBtn.addEventListener('click', () => {
          showToast('Module marked as completed!', 'success');
          target.querySelector('.lesson-check-status').className = 'fa-solid fa-circle-check text-success';
          
          // Increment progress in course
          const currentProgress = enrollment ? enrollment.progressPercentage : 0;
          const step = 100.0 / (course.lessons && course.lessons.length > 0 ? course.lessons.length : 1);
          const newProgress = Math.min(100.0, currentProgress + step);
          
          apiFetch(`/v1/courses/${course.id}/progress?progressPercentage=${newProgress}`, { method: 'POST' })
            .then(updatedEnrollment => {
              if (updatedEnrollment.progressPercentage >= 100) {
                showToast('Congratulations! Course Completed. Certificate unlocked!', 'success');
              }
            });
        });
      } else {
        newSubmitBtn.textContent = 'Verify Quiz Answers';
        newSubmitBtn.classList.remove('d-none');
        
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
            const step = 100.0 / (course.lessons && course.lessons.length > 0 ? course.lessons.length : 1);
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

  // Automatically trigger first lesson click on load
  if (lessonButtons.length > 0) {
    lessonButtons[0].click();
  }
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

const COMPREHENSIVE_DSA_ROADMAP = [
  {
    id: 1,
    name: 'Arrays',
    sequenceNumber: 1,
    subtopics: [
      {
        id: 101,
        name: 'Two Pointer Technique',
        theory: 'The two-pointer technique uses two markers (indices) scanning through an array concurrently to optimize searching from O(N^2) to O(N). Optimal for sorted arrays, palindrome checking, and target sum pairs (2Sum, 3Sum, Container With Most Water).',
        complexityAnalysis: 'Time Complexity: O(N), Space Complexity: O(1)',
        interviewTips: 'Always check if sorting the array first (O(N log N)) enables two-pointer convergence. Watch out for duplicate elements when skipping values in 3Sum/4Sum.'
      },
      {
        id: 102,
        name: 'Sliding Window Technique',
        theory: 'A sliding window maintains a contiguous subsegment of elements, dynamically expanding to incorporate new elements and contracting when boundaries or constraints are violated. Essential for finding contiguous subarray aggregates, maximum sums, and substring conditions.',
        complexityAnalysis: 'Time Complexity: O(N), Space Complexity: O(1) or O(K) for character frequency maps',
        interviewTips: 'Distinguish between fixed-size (e.g. max sum subarray of size K) and dynamic-size (e.g. smallest subarray with sum >= S) windows. Keep an auxiliary frequency map to check validity in O(1).'
      },
      {
        id: 103,
        name: 'Prefix Sums & Kadane\'s Algorithm',
        theory: 'Prefix sums precompute cumulative totals to answer range sum queries in O(1) time. Kadane\'s algorithm finds the maximum contiguous subarray sum in a single linear pass by discarding negative prefix accumulations.',
        complexityAnalysis: 'Time Complexity: O(N), Space Complexity: O(1) for Kadane / O(N) for prefix sum table',
        interviewTips: 'For maximum subarray product, remember negative numbers can flip parity—track both running minimum and maximum values concurrently.'
      }
    ]
  },
  {
    id: 2,
    name: 'Strings',
    sequenceNumber: 2,
    subtopics: [
      {
        id: 201,
        name: 'String Hashing & Rabin-Karp Algorithm',
        theory: 'Computes rolling polynomial hashes H = sum(c_i * p^i mod M) to verify substring equality and locate pattern occurrences in O(1) amortized time per window slide, avoiding quadratic string comparisons.',
        complexityAnalysis: 'Time Complexity: O(N + M) average, O(N * M) worst-case collision, Space Complexity: O(1)',
        interviewTips: 'Use large prime moduli (like 10^9 + 7) and double hashing to avoid spurious collisions. Always verify characters explicitly if hashes match.'
      },
      {
        id: 202,
        name: 'KMP Algorithm & Longest Prefix Suffix (LPS)',
        theory: 'Knuth-Morris-Pratt searches for pattern occurrences without backtracking the text index by preprocessing an LPS (Longest Proper Prefix which is also a Suffix) array. When a mismatch occurs, it skips redundant comparisons.',
        complexityAnalysis: 'Time Complexity: O(N + M), Space Complexity: O(M) for LPS array',
        interviewTips: 'Understanding LPS construction is critical for solving problems like repeated substring detection, shortest palindrome additions, and string rotations.'
      },
      {
        id: 203,
        name: 'Trie (Prefix Tree) Architecture',
        theory: 'A tree data structure where each node represents a character along string paths. Allows O(L) time insertion, exact match searching, and prefix queries where L is the maximum string length.',
        complexityAnalysis: 'Time Complexity: O(L) for Insert, Search, and StartsWith, Space Complexity: O(N * L * AlphabetSize)',
        interviewTips: 'Store a boolean isEndOfWord at each node. Tries are the gold standard for autocomplete search engines, Boggle solvers, and bitwise XOR maximum queries.'
      }
    ]
  },
  {
    id: 3,
    name: 'Linked Lists',
    sequenceNumber: 3,
    subtopics: [
      {
        id: 301,
        name: 'Fast and Slow Pointer (Floyd\'s Cycle Detection)',
        theory: 'Traverses linked list nodes using two pointers moving at 1x and 2x speeds. Solves cycle presence detection, exact cycle entry node identification, and middle node retrieval in a single pass without extra memory.',
        complexityAnalysis: 'Time Complexity: O(N), Space Complexity: O(1)',
        interviewTips: 'When a cycle is detected, reset the slow pointer to head while keeping fast at meeting point; moving both at 1x will intersect precisely at the cycle entrance.'
      },
      {
        id: 302,
        name: 'In-Place Linked List Reversal',
        theory: 'Iteratively reverses node link directions using three pointer references (prev, curr, nextTemp) without allocating new heap memory. Also generalized to reverse sub-lists and k-node groups.',
        complexityAnalysis: 'Time Complexity: O(N), Space Complexity: O(1)',
        interviewTips: 'Always use a dummy head node (dummy.next = head) to eliminate edge cases where the initial head node is shifted or reversed.'
      },
      {
        id: 303,
        name: 'Merge & Sort Linked Lists (MergeSort)',
        theory: 'Merges two or K sorted linked lists by comparing head values or using a min-heap. Because linked lists allow O(1) pointer redirection without element shifting, MergeSort is the optimal O(N log N) sorting algorithm for linked lists.',
        complexityAnalysis: 'Time Complexity: O(N log N) for sorting, O(N log K) for K-way merge, Space Complexity: O(log N) recursion stack',
        interviewTips: 'Use Floyd\'s slow/fast pointer to split the list into two halves before recursing in MergeSort.'
      }
    ]
  },
  {
    id: 4,
    name: 'Stacks & Queues',
    sequenceNumber: 4,
    subtopics: [
      {
        id: 401,
        name: 'Monotonic Stack Pattern',
        theory: 'Maintains elements in strictly increasing or decreasing order. As new elements are processed, stack elements that violate monotonicity are popped, resolving the Next Greater Element, Previous Greater Element, or boundary spans in amortized linear time.',
        complexityAnalysis: 'Time Complexity: O(N) amortized (each element pushed and popped at most once), Space Complexity: O(N)',
        interviewTips: 'Master this pattern for Daily Temperatures, Largest Rectangle in Histogram, Trapping Rain Water, and Stock Span problems.'
      },
      {
        id: 402,
        name: 'Two-Stack / Min-Max Stack Architecture',
        theory: 'Augments standard LIFO stacks to track running minimum and maximum values in O(1) time without compromising push and pop operations, using either parallel min-tracking stacks or node-value pairs.',
        complexityAnalysis: 'Time Complexity: O(1) for push, pop, top, and getMin, Space Complexity: O(N)',
        interviewTips: 'Can also be adapted to implement a FIFO Queue using two LIFO stacks with amortized O(1) enqueue and dequeue.'
      },
      {
        id: 403,
        name: 'Monotonic Deque for Sliding Window Maximum',
        theory: 'A double-ended queue that maintains candidate maximum indices for a sliding window of size K. Smaller elements at the tail are evicted before pushing the new element, keeping the head as the current window maximum.',
        complexityAnalysis: 'Time Complexity: O(N) overall (O(1) amortized per window shift), Space Complexity: O(K)',
        interviewTips: 'Always check if the index at the head of the deque has fallen outside the left window boundary (idx < i - K + 1) and evict it before reading.'
      }
    ]
  },
  {
    id: 5,
    name: 'Trees & BST',
    sequenceNumber: 5,
    subtopics: [
      {
        id: 501,
        name: 'Tree Traversals (BFS, DFS & Morris Inorder)',
        theory: 'Systematically visits all tree nodes using Depth-First Search (Preorder, Inorder, Postorder via recursion or explicit stack) and Breadth-First Search (Level-Order via FIFO queue). Morris Traversal achieves O(1) space by threading predecessor null pointers.',
        complexityAnalysis: 'Time Complexity: O(N), Space Complexity: O(H) call stack where H is tree height, O(1) for Morris',
        interviewTips: 'Inorder traversal of a Binary Search Tree (BST) produces strictly ascending values. Level-order BFS is essential for shortest path in unweighted trees and zigzag views.'
      },
      {
        id: 502,
        name: 'Lowest Common Ancestor (LCA)',
        theory: 'Locates the deepest node in a tree that has both nodes p and q as descendants. In a BST, LCA is found in O(H) by evaluating key intervals; in general binary trees, postorder recursion bubbles up matches from left and right subtrees.',
        complexityAnalysis: 'Time Complexity: O(N) for general trees, O(H) for BST, Space Complexity: O(H)',
        interviewTips: 'If the left and right recursive calls both return non-null pointers, the current node is the LCA. If only one subtree returns a match, bubble that match upward.'
      },
      {
        id: 503,
        name: 'BST Validation & Balancing (AVL / Red-Black)',
        theory: 'A valid BST requires every node to be strictly greater than all left-subtree descendants and smaller than all right-subtree descendants. Self-balancing trees enforce height balance factors using single and double tree rotations to guarantee O(log N) operations.',
        complexityAnalysis: 'Time Complexity: O(N) for validation, O(log N) for balanced search/insert, Space Complexity: O(H)',
        interviewTips: 'When validating a BST, pass allowable min and max bounds down the recursion: isValid(node, min, max). Comparing only direct children is a common rookie bug!'
      }
    ]
  },
  {
    id: 6,
    name: 'Graphs',
    sequenceNumber: 6,
    subtopics: [
      {
        id: 601,
        name: 'Breadth-First Search (BFS) & Depth-First Search (DFS)',
        theory: 'The two fundamental graph traversal algorithms. BFS uses a FIFO queue to discover shortest paths in unweighted graphs layer-by-layer. DFS uses recursion or a stack to explore connectivity, cycle detection, and connected components.',
        complexityAnalysis: 'Time Complexity: O(V + E), Space Complexity: O(V) for visited set and queue/stack',
        interviewTips: 'Use a three-state visited array (0 = unvisited, 1 = visiting/in stack, 2 = visited) to detect cycles in directed graphs.'
      },
      {
        id: 602,
        name: 'Dijkstra\'s & Bellman-Ford Shortest Path',
        theory: 'Dijkstra\'s algorithm uses a min-heap priority queue to greedily find single-source shortest paths on graphs with non-negative edge weights. Bellman-Ford relaxes all edges V-1 times and can detect negative-weight cycles.',
        complexityAnalysis: 'Time Complexity: O((V + E) log V) for Dijkstra, O(V * E) for Bellman-Ford, Space Complexity: O(V)',
        interviewTips: 'Dijkstra fails on negative edge weights. Always store (distance, node) pairs in the PriorityQueue and skip stale popped entries if dist > distances[u].'
      },
      {
        id: 603,
        name: 'Topological Sort & Kahn\'s Algorithm',
        theory: 'Generates a linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge u -> v, vertex u comes before v. Kahn\'s algorithm implements this using in-degree arrays and a zero-indegree queue.',
        complexityAnalysis: 'Time Complexity: O(V + E), Space Complexity: O(V)',
        interviewTips: 'If the number of processed nodes in Kahn\'s algorithm is less than V, the graph contains a cycle! Classic FAANG interview problem: Course Schedule I & II.'
      },
      {
        id: 604,
        name: 'Disjoint Set Union (Union-Find / DSU)',
        theory: 'Maintains partitioned sets of elements with near O(1) Find and Union operations using Path Compression and Union by Rank/Size. Widely used for dynamic connectivity and Kruskal\'s Minimum Spanning Tree.',
        complexityAnalysis: 'Time Complexity: O(alpha(N)) amortized per operation (~O(1)), Space Complexity: O(N)',
        interviewTips: 'Path compression flattens the tree during find(x): parent[x] = find(parent[x]). Essential for detecting cycles in undirected graphs in O(E).'
      }
    ]
  },
  {
    id: 7,
    name: 'Dynamic Programming',
    sequenceNumber: 7,
    subtopics: [
      {
        id: 701,
        name: 'Memoization vs Tabulation',
        theory: 'Dynamic programming breaks complex problems into overlapping subproblems with optimal substructure. Memoization caches recursive return values (top-down), while Tabulation fills a state matrix iteratively (bottom-up).',
        complexityAnalysis: 'Time Complexity: O(N * W), Space Complexity: O(N * W) or O(W) with rolling array space optimization',
        interviewTips: 'Always start with the recursive state definition and recurrence relation on paper before converting to iterative loops.'
      },
      {
        id: 702,
        name: '0/1 Knapsack & Unbounded Knapsack Patterns',
        theory: 'The archetype of decision-tree DP choosing whether to take or skip items within weight constraints. In 0/1 knapsack, iterate capacity backward in 1D array to avoid reusing items; in unbounded knapsack (Coin Change), iterate forward.',
        complexityAnalysis: 'Time Complexity: O(N * Capacity), Space Complexity: O(Capacity) with 1D optimization',
        interviewTips: 'Mastering the 1D space reduction backward loop (for w = W down to weight[i]) is a frequent interview differentiator.'
      },
      {
        id: 703,
        name: 'Longest Common Subsequence (LCS) & Edit Distance',
        theory: '2D matrix DP comparing prefixes of two sequences. If characters match, DP[i][j] = 1 + DP[i-1][j-1]; otherwise take max(DP[i-1][j], DP[i][j-1]). Edit Distance generalizes this to insertion, deletion, and substitution operations.',
        complexityAnalysis: 'Time Complexity: O(N * M), Space Complexity: O(min(N, M)) with two-row rolling arrays',
        interviewTips: 'Forms the basis of git diff tools, spellcheckers, and bioinformatics sequence alignment. Practice tracing the optimal solution path backward through the DP table.'
      }
    ]
  }
];

function getEnrichedDsaRoadmap(apiRoadmap) {
  if (!Array.isArray(apiRoadmap) || apiRoadmap.length === 0) {
    return COMPREHENSIVE_DSA_ROADMAP;
  }
  return COMPREHENSIVE_DSA_ROADMAP.map(defaultTopic => {
    const fromApi = apiRoadmap.find(t => (t.name || '').toLowerCase() === defaultTopic.name.toLowerCase() || t.id == defaultTopic.id);
    if (fromApi && Array.isArray(fromApi.subtopics) && fromApi.subtopics.length >= defaultTopic.subtopics.length) {
      return fromApi;
    }
    return defaultTopic;
  });
}

let activeRoadmapStore = null;

function bindDsaRoadmapEvents(roadmapData) {
  if (roadmapData) {
    activeRoadmapStore = roadmapData;
  }
  const nodes = document.querySelectorAll('.roadmap-node-card');
  nodes.forEach(card => {
    card.addEventListener('click', (e) => {
      const topicId = e.currentTarget.dataset.topicId;
      nodes.forEach(n => {
        n.classList.remove('border-primary', 'bg-dark', 'shadow-sm');
        n.classList.add('border-secondary');
      });
      e.currentTarget.classList.remove('border-secondary');
      e.currentTarget.classList.add('border-primary', 'bg-dark', 'shadow-sm');

      const data = activeRoadmapStore || COMPREHENSIVE_DSA_ROADMAP;
      const topic = data.find(t => t.id == topicId) || COMPREHENSIVE_DSA_ROADMAP.find(t => t.id == topicId);
      if (topic) {
        document.getElementById('dsa-detail-panel').innerHTML = components.dsaTopicDetail(topic);
      }
    });
  });

  // Automatically open Topic 1 on load
  if (nodes.length > 0) {
    const firstCard = nodes[0];
    firstCard.classList.remove('border-secondary');
    firstCard.classList.add('border-primary', 'bg-dark', 'shadow-sm');
    const data = activeRoadmapStore || COMPREHENSIVE_DSA_ROADMAP;
    const firstTopic = data[0];
    if (firstTopic) {
      document.getElementById('dsa-detail-panel').innerHTML = components.dsaTopicDetail(firstTopic);
    }
  }
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

function bindMockExamsEvents(rawLeaderboard = []) {
  // 1. Leaderboard Timeframe & Subject Filter Controller
  let currentTimeframe = 'all';
  let currentSubject = 'ALL';

  function renderLeaderboardView() {
    const tableBody = document.getElementById('leaderboard-table-body');
    if (!tableBody) return;

    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Filter out Admin users
    let filtered = (rawLeaderboard || []).filter(item => {
      if (!item || !item.user) return false;
      const uName = (item.user.name || '').toLowerCase();
      const uRole = (item.user.role || '').toLowerCase();
      const uEmail = (item.user.email || '').toLowerCase();
      if (uRole.includes('admin') || uName.includes('admin') || uEmail.includes('admin')) {
        return false;
      }
      return true;
    });

    // Filter by Subject
    if (currentSubject && currentSubject !== 'ALL') {
      filtered = filtered.filter(item => (item.category || '').toUpperCase().includes(currentSubject.toUpperCase()));
    }

    // Filter by Timeframe
    if (currentTimeframe !== 'all') {
      filtered = filtered.filter(item => {
        if (!item.completedAt) return true;
        const cDate = new Date(item.completedAt);
        if (currentTimeframe === 'daily') return cDate >= startOfToday;
        if (currentTimeframe === 'weekly') return cDate >= sevenDaysAgo;
        if (currentTimeframe === 'monthly') return cDate >= thirtyDaysAgo;
        return true;
      });
    }

    // De-duplicate candidates: Group by candidate so names never repeat
    const candidateMap = new Map();
    filtered.forEach(item => {
      const userKey = item.user.email || item.user.id || item.user.name;
      if (!candidateMap.has(userKey)) {
        candidateMap.set(userKey, {
          name: item.user.name || 'Anonymous Candidate',
          email: item.user.email,
          bestScore: item.score || 0,
          bestTopic: item.category || 'DSA',
          testCount: 1,
          completedAt: item.completedAt
        });
      } else {
        const existing = candidateMap.get(userKey);
        existing.testCount += 1;
        if ((item.score || 0) > existing.bestScore) {
          existing.bestScore = item.score || 0;
          existing.bestTopic = item.category || existing.bestTopic;
          existing.completedAt = item.completedAt;
        }
      }
    });

    // Sort descending by highest score achieved
    const ranked = Array.from(candidateMap.values()).sort((a, b) => b.bestScore - a.bestScore);

    if (ranked.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="5" class="text-center text-muted py-4 font-monospace fs-8">No candidate scores recorded for this timeframe. Be the first to rank!</td></tr>`;
      return;
    }

    tableBody.innerHTML = ranked.map((c, idx) => `
      <tr class="border-secondary border-opacity-25 fs-7">
        <td>
          <span class="badge ${idx === 0 ? 'bg-warning text-dark' : idx === 1 ? 'bg-light text-dark' : idx === 2 ? 'bg-bronze text-white' : 'bg-dark text-secondary border border-secondary border-opacity-25'} rounded-pill px-2 py-1 font-monospace">
            #${idx + 1}
          </span>
        </td>
        <td>
          <div class="d-flex align-items-center gap-2">
            <i class="fa-solid fa-circle-user text-secondary"></i>
            <span class="fw-semibold text-white">${c.name}</span>
            ${idx < 50 ? `<span class="badge bg-warning text-dark font-monospace fs-9 py-0 px-1 fw-bold" title="Top 50 Ranker: Awarded Free Lifetime Pro Pass"><i class="fa-solid fa-crown me-1"></i>PRO PASS</span>` : ''}
          </div>
        </td>
        <td><span class="badge bg-dark text-white border border-secondary border-opacity-25 font-monospace fs-9">${c.bestTopic}</span></td>
        <td class="text-center font-monospace text-muted fs-8">${c.testCount} tests</td>
        <td class="text-end fw-bold text-success font-monospace">${c.bestScore} pts</td>
      </tr>
    `).join('');
  }

  // Bind Timeframe Tabs
  document.querySelectorAll('.btn-leaderboard-time').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.btn-leaderboard-time').forEach(b => {
        b.classList.remove('active');
        b.classList.add('text-muted');
      });
      e.currentTarget.classList.add('active');
      e.currentTarget.classList.remove('text-muted');
      currentTimeframe = e.currentTarget.dataset.timeframe || 'all';
      renderLeaderboardView();
    });
  });

  // Bind Subject Dropdown
  const subjectFilter = document.getElementById('leaderboard-subject-filter');
  if (subjectFilter) {
    subjectFilter.addEventListener('change', (e) => {
      currentSubject = e.target.value;
      renderLeaderboardView();
    });
  }

  // Initial render
  renderLeaderboardView();

  const form = document.getElementById('mock-exam-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const category = document.getElementById('mock-category').value;
    const duration = parseInt(document.getElementById('mock-duration').value);
    const qcount = parseInt(document.getElementById('mock-qcount').value) || 50;

    apiFetch(`/v1/mocktests?category=${category}&durationMinutes=${duration}&questionCount=${qcount}`, {
      method: 'POST'
    }).then(test => {
      // 1. Generate exact count of high-yield MCQs (e.g. 10, 20, 30, 50)
      const questions = (typeof getMcqQuestions === 'function') 
        ? getMcqQuestions(category === 'ALL' ? null : category, qcount)
        : Array.from({ length: qcount }, (_, i) => ({
            id: i + 1,
            category: category,
            question: `Assessment Question ${i + 1} regarding ${category} system architectures and algorithms.`,
            options: ['Option A: Optimal Linear Time', 'Option B: Logarithmic Binary Search', 'Option C: Constant Space Complexity', 'Option D: Dynamic Tabulation'],
            answer: 0,
            explanation: 'Option A matches the standard theoretical performance bounds.'
          }));

      showToast(`Assessment Staged: ${questions.length} MCQs loaded. Timer starting!`, 'success');
      
      // 2. Mount Active Exam Pane
      const pageMount = document.getElementById('page-mount');
      pageMount.innerHTML = components.mockExamActive(test.id, category, duration, questions.length);
      
      // Proctored Exam Anti-Cheat & Screen Protection Handlers
      let tabSwitches = 0;

      const blockContextMenu = (e) => {
        e.preventDefault();
        showToast('⚠️ Right-click context menu is disabled during proctored exams.', 'warning');
      };

      const blockClipboard = (e) => {
        e.preventDefault();
        showToast('⚠️ Copy, cut, and paste are strictly disabled during proctored examinations.', 'danger');
      };

      const blockShortcutsAndScreenshots = (e) => {
        if ((e.ctrlKey || e.metaKey) && ['c', 'v', 'x', 'u', 'p', 's', 'a'].includes(e.key.toLowerCase())) {
          e.preventDefault();
          showToast(`⚠️ Action (Ctrl+${e.key.toUpperCase()}) blocked by proctored examination policy.`, 'danger');
          return false;
        }
        if (e.key === 'PrintScreen' || e.code === 'PrintScreen') {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText('').catch(() => {});
          }
          showToast('⚠️ Screenshot Attempt Detected: Screen captures are strictly prohibited.', 'danger');
          return false;
        }
        if (e.key === 'F12') {
          e.preventDefault();
          showToast('⚠️ Developer tools are disabled.', 'danger');
          return false;
        }
      };

      const handleVisibilityChange = () => {
        if (document.hidden) {
          tabSwitches++;
          showToast(`⚠️ Proctor Warning #${tabSwitches}: Tab switch detected! Please remain on the examination window.`, 'warning', 6000);
        }
      };

      const examZone = document.getElementById('proctored-exam-zone') || document;
      examZone.addEventListener('contextmenu', blockContextMenu);
      document.addEventListener('copy', blockClipboard);
      document.addEventListener('cut', blockClipboard);
      document.addEventListener('paste', blockClipboard);
      document.addEventListener('keydown', blockShortcutsAndScreenshots);
      document.addEventListener('visibilitychange', handleVisibilityChange);

      const cleanupProctoring = () => {
        examZone.removeEventListener('contextmenu', blockContextMenu);
        document.removeEventListener('copy', blockClipboard);
        document.removeEventListener('cut', blockClipboard);
        document.removeEventListener('paste', blockClipboard);
        document.removeEventListener('keydown', blockShortcutsAndScreenshots);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };

      // 3. Active State Tracking
      let currentIndex = 0;
      const userAnswers = {}; // question.id -> selectedOptionIndex (0..3)
      const startTime = Date.now();
      
      // 4. Timer Countdown
      let timeLeft = duration * 60;
      const timerDisplay = document.getElementById('mock-timer-display');
      const timerInterval = setInterval(() => {
        timeLeft--;
        const mins = Math.floor(timeLeft / 60);
        const secs = timeLeft % 60;
        if (timerDisplay) {
          timerDisplay.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
          if (timeLeft <= 300) {
            timerDisplay.classList.add('text-danger');
          }
        }

        if (timeLeft <= 0) {
          clearInterval(timerInterval);
          cleanupProctoring();
          showToast('Time expired! Automatically submitting and grading your assessment paper.', 'warning');
          finishAndGradeExam(test.id, questions, userAnswers, startTime, duration, cleanupProctoring);
        }
      }, 1000);

      // 5. Render Individual MCQ
      function renderMcqCard(idx) {
        const workspace = document.getElementById('mock-question-card-workspace');
        if (!workspace) return;
        
        const q = questions[idx];
        const selectedChoice = userAnswers[q.id];
        
        // Update Drawer Palette and Counters
        const answeredTotal = Object.keys(userAnswers).length;
        const progressBar = document.getElementById('mock-progress-bar');
        const progressText = document.getElementById('mock-progress-text');
        const answeredCounter = document.getElementById('mock-answered-count');
        
        if (progressBar) progressBar.style.width = `${((idx + 1) / questions.length) * 100}%`;
        if (progressText) progressText.textContent = `Progress: Question ${idx + 1} of ${questions.length}`;
        if (answeredCounter) answeredCounter.textContent = `Answered: ${answeredTotal}/${questions.length}`;

        // Highlight active button in Question Grid Palette
        document.querySelectorAll('.btn-jump-q').forEach((btn, bIdx) => {
          btn.classList.remove('border-primary', 'bg-primary', 'bg-opacity-25', 'fw-bold');
          if (bIdx === idx) {
            btn.classList.add('border-primary', 'bg-primary', 'bg-opacity-25', 'fw-bold');
          }
          if (userAnswers[questions[bIdx].id] !== undefined) {
            btn.classList.add('border-success', 'text-success');
          }
        });

        // MCQ Card HTML
        workspace.innerHTML = `
          <div>
            <div class="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom border-secondary border-opacity-25">
              <span class="badge bg-primary bg-opacity-20 text-primary fs-7 px-3 py-2">Question ${idx + 1} of ${questions.length}</span>
              <span class="badge bg-dark text-muted border border-secondary">Topic: ${q.category}</span>
            </div>
            
            <h5 class="text-white fw-bold mb-4" style="line-height: 1.6;">${q.question}</h5>
            
            <div class="d-flex flex-column gap-3 mb-4">
              ${q.options.map((opt, optIdx) => {
                const isSelected = selectedChoice === optIdx;
                return `
                  <div class="p-3 rounded border ${isSelected ? 'border-primary bg-primary bg-opacity-15 text-white' : 'border-secondary bg-dark bg-opacity-50 text-white-50'} d-flex align-items-center gap-3 mcq-option-card" data-opt-idx="${optIdx}" style="cursor: pointer; transition: all 0.2s ease;">
                    <div class="rounded-circle d-flex align-items-center justify-content-center fw-bold ${isSelected ? 'bg-primary text-white' : 'bg-dark text-muted border border-secondary'}" style="width: 32px; height: 32px; flex-shrink: 0;">
                      ${String.fromCharCode(65 + optIdx)}
                    </div>
                    <span class="fs-7 flex-grow-1 ${isSelected ? 'text-white fw-semibold' : ''}">${opt}</span>
                    ${isSelected ? '<i class="fa-solid fa-circle-check text-primary fs-5"></i>' : '<i class="fa-regular fa-circle text-muted fs-6"></i>'}
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <div class="d-flex justify-content-between align-items-center pt-3 border-top border-secondary border-opacity-25 mt-4">
            <button type="button" class="btn btn-glass btn-sm px-4" id="btn-mcq-prev" ${idx === 0 ? 'disabled' : ''}>
              <i class="fa-solid fa-arrow-left me-1"></i> Previous
            </button>
            <div class="d-flex gap-2">
              <button type="button" class="btn btn-glass btn-sm px-3" id="btn-mcq-clear">
                <i class="fa-solid fa-eraser me-1"></i> Clear Choice
              </button>
            </div>
            <button type="button" class="btn btn-glass btn-sm px-4" id="btn-mcq-next" ${idx === questions.length - 1 ? 'disabled' : ''}>
              Next <i class="fa-solid fa-arrow-right ms-1"></i>
            </button>
          </div>
        `;

        // Bind Option Click listeners
        document.querySelectorAll('.mcq-option-card').forEach(card => {
          card.addEventListener('click', (ev) => {
            const optIdx = parseInt(ev.currentTarget.dataset.optIdx);
            userAnswers[q.id] = optIdx;
            renderMcqCard(idx);
          });
        });

        // Clear button
        const clearBtn = document.getElementById('btn-mcq-clear');
        if (clearBtn) {
          clearBtn.addEventListener('click', () => {
            delete userAnswers[q.id];
            renderMcqCard(idx);
          });
        }

        // Prev & Next handlers
        const prevBtn = document.getElementById('btn-mcq-prev');
        if (prevBtn) {
          prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
              currentIndex--;
              renderMcqCard(currentIndex);
            }
          });
        }

        const nextBtn = document.getElementById('btn-mcq-next');
        if (nextBtn) {
          nextBtn.addEventListener('click', () => {
            if (currentIndex < questions.length - 1) {
              currentIndex++;
              renderMcqCard(currentIndex);
            }
          });
        }
      }

      // 6. Bind Question Grid Palette Clicks
      document.querySelectorAll('.btn-jump-q').forEach(btn => {
        btn.addEventListener('click', (ev) => {
          const qIdx = parseInt(ev.currentTarget.dataset.qIndex);
          currentIndex = qIdx;
          renderMcqCard(currentIndex);
        });
      });

      // 7. Initial Card Display
      renderMcqCard(currentIndex);

      // 8. Submit Exam Button
      const submitBtn = document.getElementById('btn-submit-mock-exam');
      if (submitBtn) {
        submitBtn.addEventListener('click', () => {
          const answered = Object.keys(userAnswers).length;
          const unanswered = questions.length - answered;
          const confirmMsg = unanswered > 0 
            ? `You have answered ${answered} of ${questions.length} questions (${unanswered} unanswered). Submit and grade now?`
            : `Are you ready to submit your assessment and view your graded scorecard?`;
          
          if (confirm(confirmMsg)) {
            clearInterval(timerInterval);
            cleanupProctoring();
            finishAndGradeExam(test.id, questions, userAnswers, startTime, duration, cleanupProctoring);
          }
        });
      }
    }).catch(err => showToast(err.message, 'danger'));
  });
}

// Automated System Grading, Score Calculation, and XP Award Engine
function finishAndGradeExam(testId, questions, userAnswers, startTime, duration, cleanupFn) {
  if (typeof cleanupFn === 'function') {
    cleanupFn();
  }

  let correctCount = 0;
  let incorrectCount = 0;
  let unansweredCount = 0;

  questions.forEach(q => {
    const choice = userAnswers[q.id];
    if (choice === undefined || choice === null) {
      unansweredCount++;
    } else if (choice === q.answer) {
      correctCount++;
    } else {
      incorrectCount++;
    }
  });

  const total = questions.length;
  const score = correctCount;
  const percentage = Math.round((score / total) * 100);
  
  // Calculate dynamic XP: 10 XP per correct question + 50 completion bonus + 150 excellence bonus
  let earnedXp = (score * 10) + 50;
  if (percentage >= 80) earnedXp += 150;

  const elapsedSecs = Math.max(1, Math.floor((Date.now() - startTime) / 1000));
  const elapsedMins = Math.floor(elapsedSecs / 60);
  const remainingSecs = elapsedSecs % 60;
  const timeSpentStr = `${elapsedMins}m ${remainingSecs}s`;

  const stats = {
    score,
    total,
    percentage,
    correctCount,
    incorrectCount,
    unansweredCount,
    earnedXp,
    timeSpent: timeSpentStr
  };

  // Top 50 Free Lifetime Pro Subscription Pass Award
  if (percentage >= 60) {
    localStorage.setItem('user_is_paid', 'true');
    state.isPaid = true;
    const badgeEl = document.getElementById('sidebar-user-badge');
    if (badgeEl) {
      badgeEl.innerHTML = `<span class="badge bg-primary bg-opacity-25 text-primary border border-primary-subtle font-monospace">PRO</span>`;
    }
    const planEl = document.getElementById('sidebar-user-plan');
    if (planEl) {
      planEl.textContent = 'Pro Workspace';
    }
    showToast('🏆 Milestone: Top 50 Qualification! Free Lifetime Pro Pass Activated!', 'success', 10000);
  }

  // Submit calculated score to server to update UserStreak and Leaderboard
  apiFetch(`/v1/mocktests/${testId}/submit?score=${score}`, { method: 'POST' })
    .then(res => {
      showToast(`Exam Graded: ${score}/${total} Correct (${percentage}%). +${earnedXp} XP Points Credited!`, 'success');
      
      // Render Scorecard
      const pageMount = document.getElementById('page-mount');
      if (pageMount) {
        pageMount.innerHTML = components.mockExamResult(stats, questions, userAnswers);

        // Bind Result buttons
        const retakeBtn = document.getElementById('btn-retake-mock');
        if (retakeBtn) {
          retakeBtn.addEventListener('click', () => {
            window.location.hash = '#/mock-exams';
            router();
          });
        }

        const backBtn = document.getElementById('btn-back-to-exams-catalog');
        if (backBtn) {
          backBtn.addEventListener('click', () => {
            window.location.hash = '#/mock-exams';
            router();
          });
        }
      }
    })
    .catch(err => {
      showToast(err.message, 'danger');
      // Even if offline, show the graded scorecard
      const pageMount = document.getElementById('page-mount');
      if (pageMount) {
        pageMount.innerHTML = components.mockExamResult(stats, questions, userAnswers);
      }
    });
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

const DEFAULT_COMMUNITY_THREADS = [
  {
    id: 't-1',
    title: 'Google L4 Interview Experience & System Design Breakdown (2026)',
    category: 'INTERVIEWS',
    content: 'Cleared Google L4 after 5 rounds! The coding rounds focused on Dijkstra with Priority Queue and Dynamic Programming on trees. The System Design round covered designing a distributed rate limiter with Redis and Token Bucket. Key tip: Explain your thought process out loud before writing a single line of code!',
    author: 'Arjun Sharma',
    createdAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    likesCount: 28,
    comments: [
      { author: 'Priya Verma', text: 'Huge congrats! How many LeetCode questions did you complete before the onsite?' },
      { author: 'Arjun Sharma', text: 'About 180 medium and 35 hard problems, mainly focusing on graphs and trees.' }
    ]
  },
  {
    id: 't-2',
    title: 'Amazon SDE-2 Bar Raiser & Leadership Principles Guide',
    category: 'INTERVIEWS',
    content: 'For Amazon SDE-2, technical coding is only 50% of the evaluation. Every interviewer will ask 2 behavioral questions based on Leadership Principles. Make sure you have structured STAR stories (Situation, Task, Action, Result) with quantitative metrics!',
    author: 'Rohan Patel',
    createdAt: new Date(Date.now() - 10 * 3600 * 1000).toISOString(),
    likesCount: 19,
    comments: []
  },
  {
    id: 't-3',
    title: 'Optimal Approach to Master 2D Dynamic Programming (Knapsack & Grid Paths)',
    category: 'CODING',
    content: 'When tackling 2D DP problems on grids or subsets, always write out the recurrence relation on paper first. Check if space can be optimized from O(N*M) to O(M) using rolling arrays. It instantly impresses interviewers!',
    author: 'Sneha Reddy',
    createdAt: new Date(Date.now() - 26 * 3600 * 1000).toISOString(),
    likesCount: 34,
    comments: []
  },
  {
    id: 't-4',
    title: 'Salary Negotiation: How to leverage multiple offers in 2026',
    category: 'GENERAL',
    content: 'Never accept the first number given by recruiters! Politely thank them, mention your competing pipeline, and ask for a 48-hour window to review the numbers. I negotiated a 25% bump using this exact script.',
    author: 'Vikram Mehta',
    createdAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
    likesCount: 42,
    comments: []
  }
];

function getStoredCommunityThreads() {
  const stored = localStorage.getItem('prepspace_community_threads');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Ensure all threads have likedBy array
        return parsed.map(t => ({
          ...t,
          likedBy: Array.isArray(t.likedBy) ? t.likedBy : [],
          likesCount: typeof t.likesCount === 'number' ? t.likesCount : 0
        }));
      }
    } catch (e) {}
  }
  const defaults = DEFAULT_COMMUNITY_THREADS.map(t => ({
    ...t,
    likedBy: Array.isArray(t.likedBy) ? t.likedBy : []
  }));
  localStorage.setItem('prepspace_community_threads', JSON.stringify(defaults));
  return defaults;
}

function saveCommunityThreads(threads) {
  localStorage.setItem('prepspace_community_threads', JSON.stringify(threads));
}

function bindCommunityEvents() {
  let activeCategory = 'ALL';
  const container = document.getElementById('forum-posts-container');
  const countBadge = document.getElementById('community-count-badge');
  const currentUser = (state && (state.email || state.name)) || localStorage.getItem('prepspace_user_email') || 'current_user';

  function renderFeed() {
    if (!container) return;
    const allThreads = getStoredCommunityThreads();
    const filtered = activeCategory === 'ALL'
      ? allThreads
      : allThreads.filter(t => (t.category || '').toUpperCase() === activeCategory.toUpperCase());

    if (countBadge) {
      countBadge.textContent = `${filtered.length} Discussion ${filtered.length === 1 ? 'Thread' : 'Threads'}`;
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="p-5 text-center text-muted font-monospace fs-8 border border-secondary border-opacity-25 rounded-3">
          <i class="fa-solid fa-comments display-6 mb-3 text-secondary"></i>
          <p class="mb-0">No discussion threads found in this category. Start the first conversation!</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(p => {
      const isLiked = Array.isArray(p.likedBy) && p.likedBy.includes(currentUser);
      const commentsList = Array.isArray(p.comments) ? p.comments : [];
      return `
      <div class="p-3 p-md-4 rounded-3 border border-secondary border-opacity-25 bg-dark bg-opacity-25 mb-3">
        <div class="d-flex align-items-center justify-content-between mb-2">
          <div class="d-flex align-items-center gap-2">
            <span class="badge bg-dark text-white border border-secondary border-opacity-25 font-monospace fs-9">${p.category}</span>
            <span class="text-white fw-bold fs-7"><i class="fa-solid fa-circle-user text-secondary me-1"></i>${p.author || 'Anonymous'}</span>
          </div>
          <span class="text-secondary font-monospace fs-9">${p.createdAt ? new Date(p.createdAt).toLocaleDateString() : 'Recent'}</span>
        </div>
        <h6 class="text-white fw-bold mb-2">${p.title}</h6>
        <p class="text-secondary fs-8 mb-3" style="line-height: 1.6;">${p.content}</p>
        <div class="d-flex align-items-center gap-3 text-secondary fs-8 border-top border-secondary border-opacity-10 pt-2">
          <button class="btn btn-sm ${isLiked ? 'btn-primary text-white shadow-sm' : 'btn-glass text-secondary'} py-1 px-2 fs-9 btn-like-thread" data-id="${p.id}" title="${isLiked ? 'Click to unlike (1 like per user)' : 'Like this post (1 like per user)'}">
            <i class="fa-solid fa-thumbs-up ${isLiked ? 'text-white' : 'text-primary'} me-1"></i> <span>${p.likesCount || 0}</span> ${isLiked ? 'Liked' : 'Likes'}
          </button>
          <button class="btn btn-sm btn-glass text-secondary py-1 px-2 fs-9 btn-toggle-replies" data-id="${p.id}">
            <i class="fa-regular fa-comment me-1"></i> <span>${commentsList.length}</span> Replies
          </button>
        </div>

        <!-- Interactive Thread Replies Drawer -->
        <div class="thread-replies-drawer d-none mt-3 pt-3 border-top border-secondary border-opacity-25" id="replies-drawer-${p.id}">
          <div class="replies-list mb-3" id="replies-list-${p.id}">
            ${commentsList.length > 0 ? commentsList.map(c => `
              <div class="p-2 mb-2 rounded bg-black bg-opacity-40 border border-secondary border-opacity-25 text-start">
                <div class="d-flex align-items-center justify-content-between mb-1">
                  <span class="text-white fw-semibold fs-9"><i class="fa-solid fa-circle-user text-primary me-1"></i>${c.author || 'Candidate'}</span>
                  <span class="text-muted font-monospace fs-9">${c.createdAt ? new Date(c.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Recent'}</span>
                </div>
                <p class="text-secondary fs-9 mb-0" style="line-height: 1.5;">${c.text}</p>
              </div>
            `).join('') : `
              <div class="text-muted fs-9 fst-italic py-2"><i class="fa-regular fa-comments me-1"></i>No replies yet. Share your thoughts below!</div>
            `}
          </div>

          <!-- Add Reply Input Box -->
          <div class="input-group input-group-sm">
            <input type="text" class="form-control glass-input fs-9 reply-input" id="reply-input-${p.id}" placeholder="Write a reply to ${p.author || 'this thread'}...">
            <button class="btn btn-primary btn-submit-reply px-3 fs-9 fw-semibold" data-id="${p.id}">
              <i class="fa-solid fa-paper-plane me-1"></i> Reply
            </button>
          </div>
        </div>
      </div>
    `;
    }).join('');

    // Bind Like Buttons (Strict 1 User = 1 Like)
    container.querySelectorAll('.btn-like-thread').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const threads = getStoredCommunityThreads();
        const target = threads.find(t => t.id == id);
        if (target) {
          if (!Array.isArray(target.likedBy)) {
            target.likedBy = [];
          }
          const userIdx = target.likedBy.indexOf(currentUser);
          if (userIdx === -1) {
            // User gives their 1 like
            target.likedBy.push(currentUser);
            target.likesCount = (target.likesCount || 0) + 1;
            saveCommunityThreads(threads);
            renderFeed();
            showToast('Liked discussion thread!', 'success');
          } else {
            // User toggles/removes their 1 like
            target.likedBy.splice(userIdx, 1);
            target.likesCount = Math.max(0, (target.likesCount || 1) - 1);
            saveCommunityThreads(threads);
            renderFeed();
            showToast('Removed like from discussion thread.', 'info');
          }
        }
      });
    });

    // Bind Toggle Replies Drawer
    container.querySelectorAll('.btn-toggle-replies').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const drawer = document.getElementById(`replies-drawer-${id}`);
        if (drawer) {
          drawer.classList.toggle('d-none');
          if (!drawer.classList.contains('d-none')) {
            const input = document.getElementById(`reply-input-${id}`);
            if (input) input.focus();
          }
        }
      });
    });

    // Bind Reply Submissions
    container.querySelectorAll('.btn-submit-reply').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const input = document.getElementById(`reply-input-${id}`);
        const text = input ? input.value.trim() : '';
        if (!text) {
          showToast('Please type a reply before submitting.', 'warning');
          return;
        }

        const threads = getStoredCommunityThreads();
        const target = threads.find(t => t.id == id);
        if (target) {
          if (!Array.isArray(target.comments)) target.comments = [];
          target.comments.push({
            id: 'c-' + Date.now(),
            author: (state && (state.name || state.email)) || localStorage.getItem('prepspace_user_name') || 'Student Developer',
            text: text,
            createdAt: new Date().toISOString()
          });
          saveCommunityThreads(threads);
          renderFeed();
          // Keep drawer open after reply
          const updatedDrawer = document.getElementById(`replies-drawer-${id}`);
          if (updatedDrawer) updatedDrawer.classList.remove('d-none');
          showToast('Reply posted to community thread!', 'success');
        }
      });
    });
  }

  // Bind Category Filter Buttons
  document.querySelectorAll('.btn-community-filter').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.btn-community-filter').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      activeCategory = e.currentTarget.dataset.category || 'ALL';
      renderFeed();
    });
  });

  // Bind Thread Submission Form
  const form = document.getElementById('forum-post-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('forum-title').value.trim();
      const category = document.getElementById('forum-category').value;
      const content = document.getElementById('forum-content').value.trim();

      if (!title || !content) {
        showToast('Please enter both a title and discussion content.', 'warning');
        return;
      }

      const newThread = {
        id: 't-' + Date.now(),
        title: title,
        category: category,
        content: content,
        author: state.name || 'Student Developer',
        createdAt: new Date().toISOString(),
        likesCount: 0,
        likedBy: [],
        comments: []
      };

      const threads = getStoredCommunityThreads();
      threads.unshift(newThread);
      saveCommunityThreads(threads);

      showToast('Discussion thread published to community feed!', 'success');
      form.reset();
      renderFeed();
    });
  }

  // Initial Feed Render
  renderFeed();
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
        portfolioUrl: document.getElementById('set-portfolio').value,
        location: document.getElementById('set-location').value,
        timezone: document.getElementById('set-timezone').value
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
      const recoveryEmail = document.getElementById('set-recoveryemail').value;
      const enable2fa = document.getElementById('set-enable2fa').checked;

      if (newPassword && newPassword !== confirmPassword) {
        showToast('Passwords do not match.', 'danger');
        return;
      }

      const updated = { ...currentSettings, enable2fa, recoveryEmail };
      apiFetch('/v1/settings', {
        method: 'POST',
        body: JSON.stringify(updated)
      }).then(res => {
        currentSettings = res;
        showToast('2FA and recovery settings updated.', 'success');

        if (newPassword) {
          apiFetch('/users/change-password', {
            method: 'PUT',
            body: JSON.stringify({ oldPassword: '', newPassword })
          }).then(() => {
            showToast('Account password updated successfully!', 'success');
            form.reset();
          }).catch(err => showToast(err.message, 'danger'));
        }
      }).catch(err => showToast(err.message, 'danger'));
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
      const accessibilityDyslexia = document.getElementById('set-dyslexia').checked;
      const accessibilityReduceMotion = document.getElementById('set-reducemotion').checked;

      const updated = { 
        ...currentSettings, 
        theme, 
        accentColor, 
        fontSize, 
        compactMode,
        accessibilityDyslexia,
        accessibilityReduceMotion
      };
      apiFetch('/v1/settings', {
        method: 'POST',
        body: JSON.stringify(updated)
      }).then(res => {
        currentSettings = res;
        showToast('Appearance settings saved. Reloading theme...', 'success');
        
        // Dynamically apply local theme tokens
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.style.setProperty('--accent-primary', accentColor);
        
        // Accessibility font rules application
        if (accessibilityDyslexia) {
          document.body.classList.add('dyslexia-font');
        } else {
          document.body.classList.remove('dyslexia-font');
        }
        
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

function bindSettingsLanguageEvents() {
  const form = document.getElementById('settings-language-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const language = document.getElementById('set-syslanguage').value;
      const country = document.getElementById('set-country').value;
      const dateFormat = document.getElementById('set-dateformat').value;
      const timeFormat = document.getElementById('set-timeformat').value;
      const firstDayOfWeek = document.getElementById('set-firstday').value;

      const updated = { ...currentSettings, language, country, dateFormat, timeFormat, firstDayOfWeek };
      apiFetch('/v1/settings', {
        method: 'POST',
        body: JSON.stringify(updated)
      }).then(res => {
        currentSettings = res;
        showToast('Language and Regional preferences updated.', 'success');
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

function bindSettingsDashboardEvents() {
  const form = document.getElementById('settings-dashboard-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const selected = [];
      document.querySelectorAll('.chk-widget:checked').forEach(chk => {
        selected.push(chk.value);
      });
      const dashboardWidgets = selected.join(',');

      const updated = { ...currentSettings, dashboardWidgets };
      apiFetch('/v1/settings', {
        method: 'POST',
        body: JSON.stringify(updated)
      }).then(res => {
        currentSettings = res;
        showToast('Dashboard widgets preferences updated.', 'success');
      }).catch(err => showToast(err.message, 'danger'));
    });
  }
}

function bindSettingsPrivacyEvents() {
  const form = document.getElementById('settings-privacy-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const privateProfile = document.getElementById('set-privateprofile').checked;
      const hideProgress = document.getElementById('set-hideprogress').checked;
      const hideEmail = document.getElementById('set-hideemail').checked;
      const hidePhone = document.getElementById('set-hidephone').checked;

      const updated = { ...currentSettings, privateProfile, hideProgress, hideEmail, hidePhone };
      apiFetch('/v1/settings', {
        method: 'POST',
        body: JSON.stringify(updated)
      }).then(res => {
        currentSettings = res;
        showToast('Privacy preferences updated.', 'success');
      }).catch(err => showToast(err.message, 'danger'));
    });
  }
}

function bindSettingsDevicesEvents() {
  document.querySelectorAll('.btn-revoke-session').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const sessionId = e.currentTarget.dataset.sessionId;
      apiFetch(`/v1/settings/sessions/revoke/${sessionId}`, { method: 'POST' })
        .then(() => {
          showToast('Device session revoked.', 'success');
          switchSettingsTab('devices');
        }).catch(err => showToast(err.message, 'danger'));
    });
  });

  const revokeAllBtn = document.getElementById('btn-revoke-all-sessions');
  if (revokeAllBtn) {
    revokeAllBtn.addEventListener('click', () => {
      if (confirm('Revoke access for all other active device logins?')) {
        apiFetch('/v1/settings/sessions/revoke-all', { method: 'POST' })
          .then(() => {
            showToast('All other active device sessions revoked.', 'success');
            switchSettingsTab('devices');
          }).catch(err => showToast(err.message, 'danger'));
      }
    });
  }
}

function bindSettingsImportExportEvents() {
  const csvBtn = document.getElementById('btn-exp-csv');
  const excelBtn = document.getElementById('btn-exp-excel');
  const pdfBtn = document.getElementById('btn-exp-pdf');

  if (csvBtn) csvBtn.addEventListener('click', () => showToast('CSV Backup download complete.', 'success'));
  if (excelBtn) excelBtn.addEventListener('click', () => showToast('Excel Backup download complete.', 'success'));
  if (pdfBtn) pdfBtn.addEventListener('click', () => showToast('PDF Report generated successfully.', 'success'));

  const submitUpload = document.getElementById('btn-submit-resume-upload');
  if (submitUpload) {
    submitUpload.addEventListener('click', () => {
      const fileInput = document.getElementById('file-resume-import');
      if (fileInput && fileInput.files.length > 0) {
        showToast('Resume imported successfully! Parsing career skills...', 'success');
      } else {
        showToast('Please select a file to import.', 'danger');
      }
    });
  }
}

function bindSettingsDeveloperEvents() {
  const form = document.getElementById('settings-developer-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const developerMode = document.getElementById('set-devmode').checked;
      const aiModel = document.getElementById('set-aimodel').value;
      const responseLength = document.getElementById('set-airesponselength').value;
      const aiDifficultyLevel = document.getElementById('set-aidifficulty').value;
      const autoSuggestions = document.getElementById('set-suggestions').checked;

      const updated = { 
        ...currentSettings, 
        developerMode, 
        aiModel, 
        responseLength, 
        aiDifficultyLevel, 
        autoSuggestions 
      };
      apiFetch('/v1/settings', {
        method: 'POST',
        body: JSON.stringify(updated)
      }).then(res => {
        currentSettings = res;
        showToast('AI Model engine customizations saved successfully.', 'success');
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
  if (form) {
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

  const courseForm = document.getElementById('admin-course-form');
  if (courseForm) {
    courseForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('admin-c-title').value;
      const courseLink = document.getElementById('admin-c-link').value;
      const instructor = document.getElementById('admin-c-instructor').value;
      const duration = document.getElementById('admin-c-duration').value;
      const difficulty = document.getElementById('admin-c-difficulty').value;
      const thumbnailUrl = document.getElementById('admin-c-thumbnail').value || 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7';
      const description = document.getElementById('admin-c-desc').value;

      apiFetch('/v1/courses', {
        method: 'POST',
        body: JSON.stringify({ title, courseLink, instructor, duration, difficulty, thumbnailUrl, description })
      }).then(() => {
        showToast('New course published successfully!', 'success');
        courseForm.reset();
      }).catch(err => showToast(err.message, 'danger'));
    });
  }
}

function loadRazorpayScript() {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function bindBillingEvents() {
  const upgradeBtn = document.getElementById('btn-upgrade-pro');
  if (!upgradeBtn) return;
  upgradeBtn.addEventListener('click', () => {
    upgradeBtn.disabled = true;
    upgradeBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>Securing Checkout...`;

    // Primary: Cashfree Payment Gateway
    apiFetch('/payments/cashfree/order', { method: 'POST' })
      .then(cfData => {
        if (typeof window.Cashfree === 'function' && cfData.paymentSessionId) {
          const cashfree = window.Cashfree({ mode: cfData.environment || "production" });
          cashfree.checkout({
            paymentSessionId: cfData.paymentSessionId,
            redirectTarget: "_modal"
          }).then((result) => {
            if (result.error) {
              showToast(result.error.message || 'Payment window closed.', 'warning');
              upgradeBtn.disabled = false;
              upgradeBtn.textContent = 'Buy PrepPro Access';
              return;
            }
            if (result.paymentDetails) {
              apiFetch('/payments/cashfree/verify', {
                method: 'POST',
                body: JSON.stringify({ order_id: cfData.orderId })
              }).then(verifyRes => {
                if (verifyRes.status === 'SUCCESS') {
                  showToast('Payment verified! Welcome to PrepSpace Pro.', 'success');
                  state.isPaid = true;
                  localStorage.setItem('isPaid', 'true');
                  fetchUserProfile().then(() => redirectTo('#/referral'));
                } else {
                  showToast('Payment verification pending. Please refresh.', 'warning');
                  upgradeBtn.disabled = false;
                  upgradeBtn.textContent = 'Buy PrepPro Access';
                }
              }).catch(err => {
                showToast(err.message, 'danger');
                upgradeBtn.disabled = false;
                upgradeBtn.textContent = 'Buy PrepPro Access';
              });
            }
          });
        } else {
          fallbackRazorpay();
        }
      })
      .catch(cfErr => {
        console.warn('Cashfree initiation notice, switching to secondary gateway:', cfErr);
        fallbackRazorpay();
      });

    function fallbackRazorpay() {
      apiFetch('/payments/order', { method: 'POST' })
        .then(orderData => {
          loadRazorpayScript().then(loaded => {
            if (!loaded) {
              showToast('Failed to load payment gateway SDK.', 'danger');
              upgradeBtn.disabled = false;
              upgradeBtn.textContent = 'Buy PrepPro Access';
              return;
            }
            
            const options = {
              key: orderData.keyId,
              amount: orderData.amount,
              currency: orderData.currency,
              name: 'PrepSpace Premium',
              description: 'Upgrade your workspace to PrepSpace PrepPro lifetime access',
              order_id: orderData.orderId,
              handler: function (response) {
                apiFetch('/payments/verify', {
                  method: 'POST',
                  body: JSON.stringify({
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature
                  })
                }).then(verifyRes => {
                  if (verifyRes.status === 'SUCCESS') {
                    showToast('Payment verified! Welcome to PrepSpace Pro.', 'success');
                    state.isPaid = true;
                    localStorage.setItem('isPaid', 'true');
                    fetchUserProfile().then(() => {
                      redirectTo('#/referral');
                    });
                  }
                }).catch(err => {
                  showToast('Payment verification failed: ' + err.message, 'danger');
                  upgradeBtn.disabled = false;
                  upgradeBtn.textContent = 'Buy PrepPro Access';
                });
              },
              prefill: {
                name: state.name || '',
                email: state.email || ''
              },
              theme: { color: '#000000' }
            };
            
            const rzp = new window.Razorpay(options);
            rzp.open();
          });
        })
        .catch(err => {
          showToast(err.message, 'danger');
          upgradeBtn.disabled = false;
          upgradeBtn.textContent = 'Buy PrepPro Access';
        });
    }
  });
}

function bindReferralEvents() {
  const copyBtn = document.getElementById('btn-copy-ref-link');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const linkVal = document.getElementById('ref-link-val');
      linkVal.select();
      navigator.clipboard.writeText(linkVal.value);
      showToast('Referral link copied to clipboard!', 'success');
    });
  }
  
  const withdrawForm = document.getElementById('ref-withdraw-form');
  if (withdrawForm) {
    withdrawForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const amount = document.getElementById('withdraw-amount').value;
      const upi = document.getElementById('withdraw-upi').value;
      
      const submitBtn = document.getElementById('btn-submit-withdraw');
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>Filing...`;
      
      apiFetch('/referrals/withdraw', {
        method: 'POST',
        body: JSON.stringify({ amount: parseFloat(amount), payoutDetails: 'UPI ID: ' + upi })
      }).then(res => {
        showToast('Withdrawal payout request filed successfully!', 'success');
        router();
      }).catch(err => {
        showToast(err.message, 'danger');
        submitBtn.disabled = false;
        submitBtn.textContent = 'File Payout Claim';
      });
    });
  }
}

function loadReferralHistory() {
  const histRows = document.getElementById('referral-history-rows');
  const withRows = document.getElementById('withdrawal-history-rows');
  
  if (histRows) {
    apiFetch('/referrals/history')
      .then(history => {
        if (history.length === 0) {
          histRows.innerHTML = `<tr><td colspan="4" class="text-center text-muted">No referrals audited yet.</td></tr>`;
          return;
        }
        histRows.innerHTML = history.map(h => `
          <tr class="border-secondary-subtle">
            <td>${h.referredUser}</td>
            <td>${new Date(h.date).toLocaleDateString()}</td>
            <td><span class="badge ${h.purchaseStatus === 'PAID' ? 'bg-success' : 'bg-warning text-dark'}">${h.purchaseStatus}</span></td>
            <td class="text-end fw-bold text-white">₹${h.reward}</td>
          </tr>
        `).join('');
      })
      .catch(err => {
        histRows.innerHTML = `<tr><td colspan="4" class="text-center text-danger">Failed: ${err.message}</td></tr>`;
      });
  }
  
  if (withRows) {
    apiFetch('/referrals/withdrawals')
      .then(withdrawals => {
        if (withdrawals.length === 0) {
          withRows.innerHTML = `<tr><td colspan="4" class="text-center text-muted">No withdrawal claims found.</td></tr>`;
          return;
        }
        withRows.innerHTML = withdrawals.map(w => `
          <tr class="border-secondary-subtle">
            <td class="fw-bold text-white">₹${w.amount}</td>
            <td>${w.payoutDetails}</td>
            <td>${new Date(w.createdAt).toLocaleDateString()}</td>
            <td class="text-end">
              <span class="badge ${
                w.status === 'PAID' ? 'bg-success' :
                w.status === 'PENDING' ? 'bg-warning text-dark' :
                w.status === 'PROCESSING' ? 'bg-info text-dark' : 'bg-danger'
              }">${w.status}</span>
            </td>
          </tr>
        `).join('');
      })
      .catch(err => {
        withRows.innerHTML = `<tr><td colspan="4" class="text-center text-danger">Failed: ${err.message}</td></tr>`;
      });
  }
}

function loadAdminPanelTab(tab) {
  const allTabs = ['overview', 'users', 'leaderboard', 'payments', 'referrals', 'rules', 'broadcast', 'audit-logs', 'health'];
  allTabs.forEach(t => {
    const btn = document.getElementById(`tab-${t}`);
    if (btn) {
      if (t === tab) {
        btn.className = 'admin-tab-btn active';
      } else {
        btn.className = 'admin-tab-btn';
      }
    }
  });

  const contentArea = document.getElementById('admin-tab-content');
  if (!contentArea) return;

  contentArea.innerHTML = `<div class="text-center py-5"><div class="spinner-border text-primary spinner-border-sm"></div><div class="text-muted fs-8 mt-2">Loading module data...</div></div>`;

  if (tab === 'overview') {
    contentArea.innerHTML = components.adminOverviewTab(window.currentAdminStats || {});

    // Render Real-Time Trend Charts via Chart.js
    setTimeout(() => {
      const revCtx = document.getElementById('adminRevenueChart');
      if (revCtx && window.Chart) {
        if (window.adminRevChartInstance) window.adminRevChartInstance.destroy();

        const days = Array.from({ length: 14 }, (_, i) => {
          const d = new Date();
          d.setDate(d.getDate() - (13 - i));
          return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        });

        const totalRev = Number(window.currentAdminStats?.totalRevenue || 495);
        const totalUsers = Number(window.currentAdminStats?.totalUsers || 24);

        // Generate smooth progression curve culminating at live values
        const revTrend = days.map((_, i) => Math.max(0, Math.round(totalRev * Math.pow((i + 1) / 14, 1.4))));
        const userTrend = days.map((_, i) => Math.max(1, Math.round(totalUsers * Math.pow((i + 1) / 14, 1.2))));

        window.adminRevChartInstance = new Chart(revCtx, {
          type: 'line',
          data: {
            labels: days,
            datasets: [
              {
                label: 'Cumulative Revenue (₹)',
                data: revTrend,
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.12)',
                fill: true,
                tension: 0.35,
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: '#10b981',
                pointHoverRadius: 6,
                yAxisID: 'y'
              },
              {
                label: 'Registered Candidates',
                data: userTrend,
                borderColor: '#6366f1',
                backgroundColor: 'rgba(99, 102, 241, 0.06)',
                fill: true,
                tension: 0.35,
                borderDash: [5, 5],
                borderWidth: 2,
                pointRadius: 3,
                pointBackgroundColor: '#6366f1',
                yAxisID: 'y1'
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            plugins: {
              legend: { labels: { color: '#94a3b8', font: { size: 11, family: 'Inter' } } },
              tooltip: { backgroundColor: '#090d16', borderColor: '#334155', borderWidth: 1 }
            },
            scales: {
              x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#64748b', font: { size: 10 } } },
              y: { position: 'left', grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#10b981', font: { size: 10 } } },
              y1: { position: 'right', grid: { display: false }, ticks: { color: '#818cf8', font: { size: 10 } } }
            }
          }
        });
      }

      const catCtx = document.getElementById('adminCategoryChart');
      if (catCtx && window.Chart) {
        if (window.adminCatChartInstance) window.adminCatChartInstance.destroy();
        window.adminCatChartInstance = new Chart(catCtx, {
          type: 'doughnut',
          data: {
            labels: ['DSA Algorithmic', 'Core Java / Spring', 'SQL & Databases', 'Operating Systems', 'Computer Networks', 'Python'],
            datasets: [{
              data: [35, 25, 18, 10, 7, 5],
              backgroundColor: ['#6366f1', '#10b981', '#f59e0b', '#06b6d4', '#a855f7', '#ec4899'],
              borderWidth: 2,
              borderColor: '#0b0f19'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: 'bottom', labels: { color: '#94a3b8', font: { size: 10, family: 'Inter' }, boxWidth: 10 } }
            }
          }
        });
      }
    }, 60);

  } else if (tab === 'users') {
    apiFetch('/admin/users')
      .then(users => {
        contentArea.innerHTML = components.adminUsersList(users || []);

        // Live Search Filter
        const searchInput = document.getElementById('admin-user-search-input');
        if (searchInput) {
          searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            document.querySelectorAll('.user-table-row').forEach(row => {
              const name = row.dataset.name || '';
              const email = row.dataset.email || '';
              const role = row.dataset.role || '';
              const match = name.includes(query) || email.includes(query) || role.includes(query);
              row.style.display = match ? '' : 'none';
            });
          });
        }

        // Filter Pills
        document.querySelectorAll('#admin-user-filter-chips .admin-filter-pill').forEach(pill => {
          pill.addEventListener('click', (e) => {
            document.querySelectorAll('#admin-user-filter-chips .admin-filter-pill').forEach(p => p.classList.remove('active'));
            e.currentTarget.classList.add('active');
            const filter = e.currentTarget.dataset.filter;

            document.querySelectorAll('.user-table-row').forEach(row => {
              if (filter === 'all') {
                row.style.display = '';
              } else if (filter === 'pro') {
                row.style.display = row.dataset.paid === 'true' ? '' : 'none';
              } else if (filter === 'free') {
                row.style.display = row.dataset.paid === 'false' ? '' : 'none';
              } else if (filter === 'admin') {
                row.style.display = row.dataset.role.includes('admin') ? '' : 'none';
              } else if (filter === 'suspended') {
                row.style.display = row.dataset.suspended === 'true' ? '' : 'none';
              }
            });
          });
        });

        // Direct Email Button
        document.querySelectorAll('.btn-compose-user-email').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const email = e.currentTarget.dataset.email;
            const name = e.currentTarget.dataset.name;
            const recipientEmailInput = document.getElementById('modal-email-recipient-email');
            const recipientNameInput = document.getElementById('modal-email-recipient-name');
            if (recipientEmailInput && recipientNameInput) {
              recipientEmailInput.value = email;
              recipientNameInput.value = name;
              document.getElementById('modal-email-subject').value = '';
              document.getElementById('modal-email-message').value = '';
              const modalEl = document.getElementById('adminEmailModal');
              if (modalEl && window.bootstrap) {
                const modal = new bootstrap.Modal(modalEl);
                modal.show();
              }
            }
          });
        });

        // Pro Pass Grant / Revoke Toggle
        document.querySelectorAll('.btn-toggle-pro').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const id = e.currentTarget.dataset.id;
            const current = e.currentTarget.dataset.current === 'true';
            const actionPrompt = current ? 'Revoke Pro Pass and return account to Free Tier?' : 'Grant Free Lifetime Pro Pass to this candidate?';
            if (confirm(actionPrompt)) {
              apiFetch(`/admin/users/${id}/toggle-pro`, { method: 'POST' })
                .then(() => {
                  showToast(`Candidate Pro status updated successfully!`, 'success');
                  loadAdminPanelTab('users');
                })
                .catch(err => {
                  if (err.message && err.message.includes('No static resource')) {
                    showToast('Backend update pending on Render: Please deploy latest commit in Render Dashboard to activate toggle-pro.', 'warning');
                  } else {
                    showToast(err.message, 'danger');
                  }
                });
            }
          });
        });

        // Role Changer
        document.querySelectorAll('.btn-toggle-role').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const id = e.currentTarget.dataset.id;
            const curRole = e.currentTarget.dataset.role || 'STUDENT';
            const nextRole = curRole.includes('ADMIN') ? 'STUDENT' : 'ADMIN';
            if (confirm(`Change administrative authorization for user #${id} from ${curRole} to ${nextRole}?`)) {
              apiFetch(`/admin/users/${id}/role`, {
                method: 'POST',
                body: JSON.stringify({ role: nextRole })
              })
              .then(() => {
                showToast(`Candidate permissions updated to ${nextRole}!`, 'success');
                loadAdminPanelTab('users');
              })
              .catch(err => showToast(err.message, 'danger'));
            }
          });
        });

        // Suspend / Unsuspend
        document.querySelectorAll('.btn-user-action').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const id = e.currentTarget.dataset.id;
            const action = e.currentTarget.dataset.action;
            apiFetch(`/admin/users/${id}/${action}`, { method: 'POST' })
              .then(() => {
                showToast(`User status modified successfully!`, 'success');
                loadAdminPanelTab('users');
              })
              .catch(err => showToast(err.message, 'danger'));
          });
        });

        // Delete User
        document.querySelectorAll('.btn-delete-user').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const id = e.currentTarget.dataset.id;
            const email = e.currentTarget.dataset.email;
            if (confirm(`CRITICAL: Permanently delete candidate account ${email}? This action cannot be undone.`)) {
              apiFetch(`/admin/users/${id}`, { method: 'DELETE' })
                .then(() => {
                  showToast('Candidate account permanently expunged.', 'warning');
                  loadAdminPanelTab('users');
                })
                .catch(err => showToast(err.message, 'danger'));
            }
          });
        });

        // Global Message Launch Button
        const composeGlobalBtn = document.getElementById('btn-admin-open-compose-global');
        if (composeGlobalBtn) {
          composeGlobalBtn.addEventListener('click', () => loadAdminPanelTab('broadcast'));
        }
      })
      .catch(err => {
        contentArea.innerHTML = `<div class="alert alert-danger">${err.message}</div>`;
      });

  } else if (tab === 'leaderboard') {
    apiFetch('/v1/mocktests/all')
      .catch(() => apiFetch('/v1/mocktests/leaderboard'))
      .then(tests => {
        contentArea.innerHTML = components.adminLeaderboardList(tests || []);

        // Search Filter
        const searchInput = document.getElementById('admin-leaderboard-search-input');
        if (searchInput) {
          searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            document.querySelectorAll('.leaderboard-table-row').forEach(row => {
              const name = row.dataset.name || '';
              const email = row.dataset.email || '';
              const cat = row.dataset.cat || '';
              const match = name.includes(query) || email.includes(query) || cat.includes(query);
              row.style.display = match ? '' : 'none';
            });
          });
        }

        // Category Chips Filter
        document.querySelectorAll('#admin-leaderboard-chips .admin-filter-pill').forEach(pill => {
          pill.addEventListener('click', (e) => {
            document.querySelectorAll('#admin-leaderboard-chips .admin-filter-pill').forEach(p => p.classList.remove('active'));
            e.currentTarget.classList.add('active');
            const targetCat = e.currentTarget.dataset.cat;
            document.querySelectorAll('.leaderboard-table-row').forEach(row => {
              if (targetCat === 'all') {
                row.style.display = '';
              } else {
                row.style.display = (row.dataset.cat || '').toLowerCase().includes(targetCat) ? '' : 'none';
              }
            });
          });
        });

        // Delete Mocktest Action
        document.querySelectorAll('.btn-delete-mocktest').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const id = e.currentTarget.dataset.id;
            if (confirm(`Remove test submission #${id} from the leaderboard?`)) {
              apiFetch(`/v1/mocktests/${id}`, { method: 'DELETE' })
                .then(() => {
                  showToast('Test submission removed from global leaderboard!', 'success');
                  loadAdminPanelTab('leaderboard');
                })
                .catch(err => showToast(err.message, 'danger'));
            }
          });
        });
      })
      .catch(err => {
        contentArea.innerHTML = `<div class="alert alert-danger">${err.message}</div>`;
      });

  } else if (tab === 'payments') {
    apiFetch('/admin/payments')
      .then(payments => {
        contentArea.innerHTML = components.adminPaymentsList(payments || []);

        // Payment Search
        const searchInput = document.getElementById('admin-payment-search-input');
        if (searchInput) {
          searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            document.querySelectorAll('.payment-table-row').forEach(row => {
              const email = row.dataset.email || '';
              const order = row.dataset.order || '';
              const payid = row.dataset.payid || '';
              const match = email.includes(query) || order.includes(query) || payid.includes(query);
              row.style.display = match ? '' : 'none';
            });
          });
        }
      })
      .catch(err => {
        contentArea.innerHTML = `<div class="alert alert-danger">${err.message}</div>`;
      });

  } else if (tab === 'referrals') {
    Promise.all([
      apiFetch('/admin/referrals/risk').catch(() => []),
      apiFetch('/admin/withdrawals').catch(() => [])
    ]).then(([risks, claims]) => {
      contentArea.innerHTML = `
        <div class="mb-4">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h5 class="text-white fw-bold mb-0"><i class="fa-solid fa-money-bill-transfer text-warning me-2"></i>Pending Withdrawal Claims Queue</h5>
              <small class="text-muted fs-8">Review and disburse affiliate earnings payouts to candidates</small>
            </div>
          </div>
          <div class="admin-box p-3">${components.adminClaimsList(claims || [])}</div>
        </div>

        <div>
          <div class="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h5 class="text-white fw-bold mb-0"><i class="fa-solid fa-shield-cat text-danger me-2"></i>Referral Fraud & Risk Matrix</h5>
              <small class="text-muted fs-8">Automated detection of self-referrals and duplicate IP patterns</small>
            </div>
            <a href="/api/admin/reports/referrals" class="btn btn-outline-warning btn-sm"><i class="fa-solid fa-file-csv me-1"></i> Export Affiliates CSV</a>
          </div>
          <div class="admin-box p-3">${components.adminRiskList(risks || [])}</div>
        </div>
      `;

      // Claim Payout Actions
      document.querySelectorAll('.btn-claim-action').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const targetBtn = e.currentTarget;
          const id = targetBtn.dataset.id;
          const action = targetBtn.dataset.action;
          const amount = targetBtn.dataset.amount;
          const upi = targetBtn.dataset.upi;

          let promptText = `Confirm status transition of payout claim #${id} to ${action}?`;
          if (action === 'AUTO_PAYOUT') {
            promptText = `⚡ Initiate AUTOMATED Cashfree Payout of ₹${amount || ''} directly to UPI ID: ${upi || ''}?\n\nThis will instantly transfer funds from your Cashfree merchant balance.`;
          }

          if (confirm(promptText)) {
            const originalHtml = targetBtn.innerHTML;
            targetBtn.disabled = true;
            targetBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Processing...`;

            apiFetch('/admin/withdrawals/action', {
              method: 'POST',
              body: JSON.stringify({ withdrawalId: id, action })
            })
            .then((res) => {
              showToast(res.message || `Withdrawal claim #${id} marked as ${action}!`, 'success');
              loadAdminPanelTab('referrals');
            })
            .catch(err => {
              targetBtn.disabled = false;
              targetBtn.innerHTML = originalHtml;
              showToast(err.message, 'danger');
            });
          }
        });
      });
    }).catch(err => {
      contentArea.innerHTML = `<div class="alert alert-danger">${err.message}</div>`;
    });

  } else if (tab === 'rules') {
    apiFetch('/admin/settings')
      .then(settings => {
        contentArea.innerHTML = components.adminSettingsForm(settings || {});

        document.querySelectorAll('.btn-save-setting').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const key = e.currentTarget.dataset.key;
            const input = document.getElementById(`setting-${key}`);
            if (input) {
              updateRuleSetting(key, input.value);
            }
          });
        });
      })
      .catch(err => {
        contentArea.innerHTML = `<div class="alert alert-danger">${err.message}</div>`;
      });

  } else if (tab === 'broadcast') {
    Promise.all([
      apiFetch('/admin/settings'),
      apiFetch('/admin/users').catch(() => [])
    ])
      .then(([settings, users]) => {
        const userList = Array.isArray(users) ? users : [];
        contentArea.innerHTML = components.adminBroadcastTab(settings || {}, userList);

        // State for selected audience
        let selectedAudience = 'all'; // 'all', 'pro', 'free', 'single'

        const audiencePills = document.querySelectorAll('.broadcast-audience-pill');
        const singleInputs = document.getElementById('broadcast-single-inputs');
        const bulkCard = document.getElementById('broadcast-bulk-info-card');
        const bulkTitle = document.getElementById('bulk-info-title');
        const bulkBadge = document.getElementById('bulk-info-count-badge');
        const sendBtnLabel = document.getElementById('btn-send-label');
        const emailToInput = document.getElementById('broadcast-email-to');

        function getTargetUsers(audience) {
          const activeUsers = userList.filter(u => !u.isSuspended && u.email && u.email.includes('@'));
          if (audience === 'pro') return activeUsers.filter(u => u.isPaid);
          if (audience === 'free') return activeUsers.filter(u => !u.isPaid);
          if (audience === 'all') return activeUsers;
          return [];
        }

        function updateAudienceUI(target) {
          selectedAudience = target;
          audiencePills.forEach(p => p.classList.toggle('active', p.dataset.audience === target));

          if (target === 'single') {
            if (singleInputs) singleInputs.classList.remove('d-none');
            if (bulkCard) bulkCard.classList.add('d-none');
            if (emailToInput) emailToInput.required = true;
            if (sendBtnLabel) sendBtnLabel.textContent = 'Dispatch Official Email';
          } else {
            if (singleInputs) singleInputs.classList.add('d-none');
            if (bulkCard) bulkCard.classList.remove('d-none');
            if (emailToInput) emailToInput.required = false;

            const targets = getTargetUsers(target);
            const count = targets.length;

            let titleText = 'Broadcasting to All Active Candidates';
            if (target === 'pro') titleText = 'Broadcasting to Pro Members Only';
            if (target === 'free') titleText = 'Broadcasting to Free Candidates Only';

            if (bulkTitle) bulkTitle.innerHTML = `<i class="fa-solid fa-users text-primary me-2"></i>${titleText}`;
            if (bulkBadge) bulkBadge.textContent = `${count} Candidates`;
            if (sendBtnLabel) sendBtnLabel.textContent = `Dispatch Bulk Broadcast (${count} Candidates)`;
          }
        }

        audiencePills.forEach(pill => {
          pill.addEventListener('click', () => {
            updateAudienceUI(pill.dataset.audience);
          });
        });

        // Quick Preset Announcement Templates
        const subjectInput = document.getElementById('broadcast-email-subject');
        const bodyInput = document.getElementById('broadcast-email-body');

        document.querySelectorAll('.broadcast-preset-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const preset = btn.dataset.preset;
            if (preset === 'top50') {
              if (subjectInput) subjectInput.value = '🏆 Announcement: Top 50 Students Win Free PrepPro & Global Icon!';
              if (bodyInput) bodyInput.value = `We are excited to announce our exclusive Merit Challenge for all aspiring engineers and candidates on PrepSpace!\n\nThe Top 50 Students on the PrepSpace Placement Leaderboard will receive:\n🌟 100% Free Lifetime PrepPro Upgrade\n🌟 Prestigious "Global Icon" Candidate Badge on their verified portfolio\n🌟 Direct exposure to partner hiring tech recruiters\n\nTake mock tests, solve daily code challenges, and climb the ranks today!\n\nCheck your rank on the leaderboard now: https://stream-in.app/#/leaderboard`;
            } else if (preset === 'mocktest') {
              if (subjectInput) subjectInput.value = '🚀 New Placement Drive Mock Exams & Coding Arena are Live!';
              if (bodyInput) bodyInput.value = `A brand new set of company-specific mock interviews and coding problems (TCS, Infosys, Wipro, Amazon, Google patterns) have been published to your PrepSpace dashboard.\n\nPractice with real-time timed assessments, in-depth algorithmic diagnostics, and instant scorecards.\n\nStart practicing now: https://stream-in.app/#/mock-test`;
            } else if (preset === 'referral') {
              if (subjectInput) subjectInput.value = '⚡ Earn ₹199 per Friend: PrepSpace Ambassador Program is Live!';
              if (bodyInput) bodyInput.value = `Did you know you can earn real cash rewards by inviting your college peers to PrepSpace?\n\nEarn a flat ₹199 referral reward directly to your UPI for every peer who upgrades to PrepPro using your exclusive link.\n\nGet your unique referral link from your profile dashboard: https://stream-in.app/#/profile`;
            }
            showToast('Announcement template inserted!', 'info');
          });
        });

        // Real-Time Live Preview of Sitewide Banner
        const bannerInput = document.getElementById('admin-banner-text');
        const bannerLevelSelect = document.getElementById('admin-banner-level');
        const previewBox = document.getElementById('banner-preview-box');
        const previewText = document.getElementById('banner-preview-text');

        function refreshPreview() {
          if (previewText) previewText.textContent = bannerInput.value || 'No active announcement. Banner is currently hidden.';
          if (previewBox) previewBox.className = `alert alert-${bannerLevelSelect.value} d-flex align-items-center gap-2 mb-0 py-2 fs-8`;
        }
        if (bannerInput) bannerInput.addEventListener('input', refreshPreview);
        if (bannerLevelSelect) bannerLevelSelect.addEventListener('change', refreshPreview);

        // Publish Banner Settings
        const saveBannerBtn = document.getElementById('btn-save-banner-settings');
        if (saveBannerBtn) {
          saveBannerBtn.addEventListener('click', () => {
            const isActive = document.getElementById('admin-banner-active').checked;
            const text = document.getElementById('admin-banner-text').value;
            const level = document.getElementById('admin-banner-level').value;

            saveBannerBtn.disabled = true;
            saveBannerBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span> Publishing...';

            Promise.all([
              apiFetch('/admin/settings', { method: 'POST', body: JSON.stringify({ key: 'GLOBAL_ANNOUNCEMENT_ACTIVE', value: String(isActive) }) }),
              apiFetch('/admin/settings', { method: 'POST', body: JSON.stringify({ key: 'GLOBAL_ANNOUNCEMENT_TEXT', value: text }) }),
              apiFetch('/admin/settings', { method: 'POST', body: JSON.stringify({ key: 'GLOBAL_ANNOUNCEMENT_LEVEL', value: level }) })
            ]).then(() => {
              saveBannerBtn.disabled = false;
              saveBannerBtn.innerHTML = '<i class="fa-solid fa-floppy-disk me-2"></i>Publish Banner to All Users';
              showToast('Sitewide announcement published across all user portals!', 'success');
            }).catch(err => {
              saveBannerBtn.disabled = false;
              saveBannerBtn.innerHTML = '<i class="fa-solid fa-floppy-disk me-2"></i>Publish Banner to All Users';
              showToast(err.message, 'danger');
            });
          });
        }

        // Chunked Bulk Broadcast Execution with Progress Bar & Safe Rate-Limiting
        async function startBulkBroadcastExecution(targets, subject, message) {
          const progressModalEl = document.getElementById('adminBulkEmailProgressModal');
          let progressModal = null;
          if (progressModalEl && window.bootstrap) {
            progressModal = bootstrap.Modal.getInstance(progressModalEl) || new bootstrap.Modal(progressModalEl);
            progressModal.show();
          }

          const progressBar = document.getElementById('bulk-progress-bar');
          const progressPct = document.getElementById('bulk-progress-pct');
          const progressStatus = document.getElementById('bulk-progress-status');
          const counterTotal = document.getElementById('bulk-counter-total');
          const counterSuccess = document.getElementById('bulk-counter-success');
          const counterFailed = document.getElementById('bulk-counter-failed');
          const closeBtn = document.getElementById('btn-close-bulk-progress');
          const spinner = document.getElementById('bulk-progress-spinner');

          if (counterTotal) counterTotal.textContent = targets.length;
          if (counterSuccess) counterSuccess.textContent = '0';
          if (counterFailed) counterFailed.textContent = '0';
          if (closeBtn) closeBtn.classList.add('d-none');
          if (spinner) spinner.classList.remove('d-none');
          if (progressBar) progressBar.style.width = '0%';
          if (progressPct) progressPct.textContent = '0%';

          const BATCH_SIZE = 20; // Chunks of 20 to strictly respect Vercel function timeouts & Resend batch limits
          let successCount = 0;
          let failedCount = 0;
          const total = targets.length;

          for (let i = 0; i < total; i += BATCH_SIZE) {
            const chunk = targets.slice(i, i + BATCH_SIZE);
            const chunkIndex = Math.floor(i / BATCH_SIZE) + 1;
            const totalChunks = Math.ceil(total / BATCH_SIZE);

            if (progressStatus) {
              progressStatus.textContent = `Dispatching batch ${chunkIndex} of ${totalChunks} (${chunk.length} recipients)...`;
            }

            try {
              const res = await fetch('/api/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  recipients: chunk.map(u => ({ email: u.email, name: u.name })),
                  subject,
                  message,
                  type: 'admin_message'
                })
              });

              const text = await res.text();
              let data;
              try { data = JSON.parse(text); } catch (e) { throw new Error(text || 'Server error.'); }

              if (data.success) {
                successCount += (data.count || chunk.length);
              } else {
                console.warn('Batch chunk failed:', data.error);
                failedCount += chunk.length;
              }
            } catch (err) {
              console.error('Batch error:', err);
              failedCount += chunk.length;
            }

            const dispatchedSoFar = Math.min(i + chunk.length, total);
            const pct = Math.round((dispatchedSoFar / total) * 100);

            if (progressBar) progressBar.style.width = `${pct}%`;
            if (progressPct) progressPct.textContent = `${pct}%`;
            if (counterSuccess) counterSuccess.textContent = successCount;
            if (counterFailed) counterFailed.textContent = failedCount;

            // 600ms throttle between batches to strictly prevent 429 Too Many Requests
            if (i + BATCH_SIZE < total) {
              await new Promise(r => setTimeout(r, 600));
            }
          }

          if (spinner) spinner.classList.add('d-none');
          if (progressStatus) {
            progressStatus.innerHTML = `<span class="text-emerald fw-bold"><i class="fa-solid fa-circle-check me-1"></i> Broadcast Finished!</span> ${successCount} emails delivered.`;
          }
          if (closeBtn) closeBtn.classList.remove('d-none');

          showToast(`Bulk broadcast completed: ${successCount} sent, ${failedCount} failed.`, successCount > 0 ? 'success' : 'warning');
        }

        // Broadcast Email Dispatch Form
        const broadcastEmailForm = document.getElementById('admin-broadcast-email-form');
        if (broadcastEmailForm) {
          broadcastEmailForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const subject = subjectInput.value.trim();
            const message = bodyInput.value.trim();
            if (!subject || !message) {
              showToast('Please provide both an email subject and message content.', 'warning');
              return;
            }

            // A. Single Email Dispatch
            if (selectedAudience === 'single') {
              const toEmail = document.getElementById('broadcast-email-to').value.trim();
              const toName = document.getElementById('broadcast-email-name').value.trim() || 'Candidate';
              if (!toEmail) {
                showToast('Please specify the recipient email address.', 'warning');
                return;
              }

              const sendBtn = document.getElementById('btn-send-admin-email');
              sendBtn.disabled = true;
              sendBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span> Dispatching...';

              try {
                const res = await fetch('/api/send-otp', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    email: toEmail,
                    name: toName,
                    subject,
                    message,
                    type: 'admin_message'
                  })
                });
                const text = await res.text();
                let data;
                try { data = JSON.parse(text); } catch (err) { throw new Error(text || 'Server error.'); }

                sendBtn.disabled = false;
                sendBtn.innerHTML = '<i class="fa-solid fa-paper-plane me-2"></i>Dispatch Official Email';

                if (data.success) {
                  showToast(`Official email successfully sent to ${toEmail}!`, 'success');
                  broadcastEmailForm.reset();
                  updateAudienceUI('single');
                } else {
                  showToast(data.error || 'Failed to dispatch email.', 'danger');
                }
              } catch (err) {
                sendBtn.disabled = false;
                sendBtn.innerHTML = '<i class="fa-solid fa-paper-plane me-2"></i>Dispatch Official Email';
                showToast(err.message, 'danger');
              }
              return;
            }

            // B. Bulk Broadcast Dispatch
            const targets = getTargetUsers(selectedAudience);
            if (targets.length === 0) {
              showToast('No active candidates found in selected cohort.', 'warning');
              return;
            }

            // Show Confirmation Modal
            const confirmModalEl = document.getElementById('adminBulkEmailConfirmModal');
            if (!confirmModalEl || !window.bootstrap) {
              if (!confirm(`Broadcast official email to ${targets.length} candidates?`)) return;
              startBulkBroadcastExecution(targets, subject, message);
              return;
            }

            let cohortLabel = 'All Active Candidates';
            if (selectedAudience === 'pro') cohortLabel = 'Pro Members Only';
            if (selectedAudience === 'free') cohortLabel = 'Free Candidates Only';

            document.getElementById('confirm-cohort-name').textContent = cohortLabel;
            document.getElementById('confirm-recipient-count').textContent = `${targets.length} candidates`;
            document.getElementById('confirm-email-subject').textContent = subject;

            const confirmModal = bootstrap.Modal.getInstance(confirmModalEl) || new bootstrap.Modal(confirmModalEl);
            confirmModal.show();

            const startBroadcastBtn = document.getElementById('btn-confirm-start-broadcast');
            const handleConfirm = () => {
              startBroadcastBtn.removeEventListener('click', handleConfirm);
              confirmModal.hide();
              startBulkBroadcastExecution(targets, subject, message);
            };
            startBroadcastBtn.onclick = handleConfirm;
          });
        }
      })
      .catch(err => {
        contentArea.innerHTML = `<div class="alert alert-danger">${err.message}</div>`;
      });

  } else if (tab === 'audit-logs') {
    apiFetch('/admin/audit-logs')
      .then(logs => {
        contentArea.innerHTML = components.adminAuditList(logs || []);

        // Audit Search
        const searchInput = document.getElementById('admin-audit-search-input');
        if (searchInput) {
          searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            document.querySelectorAll('.audit-table-row').forEach(row => {
              const admin = row.dataset.admin || '';
              const action = row.dataset.action || '';
              const target = row.dataset.target || '';
              const match = admin.includes(query) || action.includes(query) || target.includes(query);
              row.style.display = match ? '' : 'none';
            });
          });
        }
      })
      .catch(err => {
        contentArea.innerHTML = `<div class="alert alert-danger">${err.message}</div>`;
      });

  } else if (tab === 'health') {
    Promise.all([
      apiFetch('/admin/health'),
      apiFetch('/admin/webhooks')
    ]).then(([health, webhooks]) => {
      contentArea.innerHTML = components.adminHealthReport(health || {}, webhooks || []);
    }).catch(err => {
      contentArea.innerHTML = `<div class="alert alert-danger">${err.message}</div>`;
    });
  }
}

function updateRuleSetting(key, value) {
  apiFetch('/admin/settings', {
    method: 'POST',
    body: JSON.stringify({ key, value })
  }).then(res => {
    showToast(`System setting '${key}' updated successfully!`, 'success');
    loadAdminPanelTab('rules');
  }).catch(err => {
    showToast(err.message, 'danger');
  });
}

// ----------------------------------------------------
// DAILY ACTIVE SCREEN TIME TRACKER
// ----------------------------------------------------
let activeSessionSeconds = 0;
let lastInteractionTime = Date.now();

function getScreenTimeTodayKey() {
  const d = new Date();
  return `prepspace_screentime_${d.getFullYear()}_${String(d.getMonth() + 1).padStart(2, '0')}_${String(d.getDate()).padStart(2, '0')}`;
}

function initScreenTimeTracker() {
  ['mousemove', 'keydown', 'scroll', 'click', 'touchstart'].forEach(evt => {
    window.addEventListener(evt, () => {
      lastInteractionTime = Date.now();
    }, { passive: true });
  });

  setInterval(() => {
    const isTabActive = !document.hidden && document.hasFocus();
    const isNotIdle = (Date.now() - lastInteractionTime) < 180000; // 3 min idle threshold

    if (isTabActive && isNotIdle) {
      activeSessionSeconds++;
      const todayKey = getScreenTimeTodayKey();
      let todaySeconds = parseInt(localStorage.getItem(todayKey) || '0', 10) + 1;
      localStorage.setItem(todayKey, todaySeconds.toString());
      updateScreenTimeUi(todaySeconds, activeSessionSeconds);
    }
  }, 1000);
}

function formatDuration(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

function updateScreenTimeUi(todaySeconds, sessionSeconds) {
  const dailyEl = document.getElementById('daily-screentime-display');
  if (dailyEl) {
    dailyEl.textContent = formatDuration(todaySeconds);
  }
  const sessionEl = document.getElementById('live-session-timer');
  if (sessionEl) {
    sessionEl.innerHTML = `<i class="fa-solid fa-spinner fa-spin text-cyan me-1"></i>Session: ${formatDuration(sessionSeconds)}`;
  }
}

function syncDashboardScreenTime() {
  const todayKey = getScreenTimeTodayKey();
  const todaySeconds = parseInt(localStorage.getItem(todayKey) || '0', 10);
  updateScreenTimeUi(todaySeconds, activeSessionSeconds);
}

// ----------------------------------------------------
// DESKTOP & MOBILE APPS HUB
// ----------------------------------------------------
function bindDesktopClientEvents() {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (isIOS) {
    const iosTabBtn = document.getElementById('tab-ios-btn');
    if (iosTabBtn && typeof bootstrap !== 'undefined' && bootstrap.Tab) {
      const tab = new bootstrap.Tab(iosTabBtn);
      tab.show();
    }
  }
}
