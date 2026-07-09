// components.js - View Templates for PrepSpace SaaS Application

const components = {
  // Public SaaS Landing Page
  landing: () => `
    <nav class="navbar navbar-expand-lg navbar-dark bg-transparent py-4">
      <div class="container">
        <a class="navbar-brand fw-extrabold fs-3 text-white" href="#"><i class="fa-solid fa-graduation-cap text-primary me-2"></i>PrepSpace</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navMenu">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            <li class="nav-item"><a class="nav-link px-3" href="#features">Features</a></li>
            <li class="nav-item"><a class="nav-link px-3" href="#pricing">Pricing</a></li>
            <li class="nav-item"><a class="nav-link px-3" href="#contact">Contact</a></li>
            <li class="nav-item ms-3">
              <a class="btn btn-glass px-4 me-2" href="#/login">Login</a>
              <a class="btn btn-premium px-4" href="#/register">Get Started</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container text-center py-5">
      <div class="row justify-content-center py-5">
        <div class="col-lg-10 col-xl-8">
          <span class="badge bg-indigo-subtle text-primary border border-primary-subtle px-3 py-2 rounded-pill mb-3">AI-POWERED PREPARATION SYSTEM</span>
          <h1 class="display-3 fw-extrabold text-white mb-4">Cracking Tech Interviews is now <span class="hero-gradient">Predictable</span></h1>
          <p class="lead text-muted mb-5 fs-4">An enterprise-level SaaS platform to manage study plans, track coding platform statistics, run mock interview feedback loops, and track job applications in a single unified dashboard.</p>
          <div class="d-flex justify-content-center gap-3">
            <a href="#/register" class="btn btn-premium btn-lg px-5 py-3 fs-5">Initialize Space</a>
            <a href="#features" class="btn btn-glass btn-lg px-5 py-3 fs-5">View Core Features</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div id="features" class="container py-5">
      <div class="text-center mb-5">
        <h2 class="display-5 fw-bold text-white mb-3">Engineered for High-Performance Candidates</h2>
        <p class="text-muted fs-5">Everything you need to level up and land your dream offer.</p>
      </div>
      <div class="row g-4 mt-2">
        <div class="col-md-4">
          <div class="glass-panel p-4 h-100">
            <div class="feature-icon mb-3"><i class="fa-solid fa-chart-line fs-2 text-primary"></i></div>
            <h4 class="text-white">Unified Dashboard Analytics</h4>
            <p class="text-muted">Interactive charts mapping study hours, problem difficulties, streak data, and target completion counts.</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="glass-panel p-4 h-100">
            <div class="feature-icon mb-3"><i class="fa-solid fa-brain fs-2 text-secondary"></i></div>
            <h4 class="text-white">AI Feedback Engine</h4>
            <p class="text-muted">Simulated evaluation feedback and readiness metrics outlining your technical gaps and soft skill adjustments.</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="glass-panel p-4 h-100">
            <div class="feature-icon mb-3"><i class="fa-solid fa-kanban fs-2 text-success"></i></div>
            <h4 class="text-white">Kanban Job Tracker</h4>
            <p class="text-muted">Organize job pipelines, record scheduling dates, and trace outcomes on an interactive board layout.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Pricing Section -->
    <div id="pricing" class="container py-5">
      <div class="text-center mb-5">
        <h2 class="display-5 fw-bold text-white mb-3">Flexible Plans for Every Developer</h2>
        <p class="text-muted fs-5">Choose the pace that matches your target timelines.</p>
      </div>
      <div class="row g-4 justify-content-center mt-2">
        <div class="col-md-5 col-lg-4">
          <div class="glass-panel p-4 h-100 text-center">
            <h3 class="text-white">PrepFree</h3>
            <p class="text-muted">Perfect for getting started</p>
            <div class="my-4"><span class="display-4 fw-bold text-white">$0</span><span class="text-muted">/month</span></div>
            <ul class="list-unstyled text-start mb-5 text-muted">
              <li class="mb-2"><i class="fa-solid fa-check text-success me-2"></i> Access to Question Bank</li>
              <li class="mb-2"><i class="fa-solid fa-check text-success me-2"></i> Log Solved Problems</li>
              <li class="mb-2"><i class="fa-solid fa-check text-success me-2"></i> Standard Kanban Tracker</li>
            </ul>
            <a href="#/register" class="btn btn-glass w-100 py-3">Register Account</a>
          </div>
        </div>
        <div class="col-md-5 col-lg-4">
          <div class="glass-panel p-4 h-100 text-center border-primary" style="box-shadow: 0 0 25px var(--accent-glow);">
            <h3 class="text-white">PrepPro</h3>
            <p class="text-indigo">Recommended for Active Jobseekers</p>
            <div class="my-4"><span class="display-4 fw-bold text-white">$29</span><span class="text-muted">/month</span></div>
            <ul class="list-unstyled text-start mb-5 text-muted">
              <li class="mb-2"><i class="fa-solid fa-check text-success me-2"></i> Custom Target Study Plans</li>
              <li class="mb-2"><i class="fa-solid fa-check text-success me-2"></i> Mock AI Feedback Logs</li>
              <li class="mb-2"><i class="fa-solid fa-check text-success me-2"></i> Export Excel/PDF Reports</li>
              <li class="mb-2"><i class="fa-solid fa-check text-success me-2"></i> Advanced Platform Syncs</li>
            </ul>
            <a href="#/register" class="btn btn-premium w-100 py-3">Unlock Premium Access</a>
          </div>
        </div>
      </div>
    </div>
  `,

  // Authentication: Login Page
  login: () => `
    <div class="container">
      <div class="row justify-content-center align-items-center min-vh-100">
        <div class="col-md-6 col-lg-5 col-xl-4">
          <div class="glass-panel p-5 text-center">
            <h2 class="text-white fw-bold mb-2">Welcome Back</h2>
            <p class="text-muted mb-4">Enter credentials to initialize space</p>
            
            <form id="login-form">
              <div class="mb-3 text-start">
                <label class="form-label text-muted fs-7">EMAIL ADDRESS</label>
                <input type="email" id="login-email" class="form-control glass-input" placeholder="name@tracker.com" required>
              </div>
              <div class="mb-4 text-start">
                <label class="form-label text-muted fs-7">PASSWORD</label>
                <input type="password" id="login-password" class="form-control glass-input" placeholder="••••••••" required>
              </div>
              <button type="submit" class="btn btn-premium w-100 py-2 fs-6 mb-3">Authenticate</button>
            </form>
            
            <p class="text-muted fs-7">Don't have an account? <a href="#/register" class="text-indigo text-decoration-none">Register here</a></p>
          </div>
        </div>
      </div>
    </div>
  `,

  // Authentication: Register Page
  register: () => `
    <div class="container">
      <div class="row justify-content-center align-items-center min-vh-100">
        <div class="col-md-6 col-lg-5 col-xl-4">
          <div class="glass-panel p-5 text-center">
            <h2 class="text-white fw-bold mb-2">Create Space</h2>
            <p class="text-muted mb-4">Start your preparation tracking lifecycle</p>
            
            <form id="register-form">
              <div class="mb-3 text-start">
                <label class="form-label text-muted fs-7">FULL NAME</label>
                <input type="text" id="register-name" class="form-control glass-input" placeholder="Nagesh Methre" required>
              </div>
              <div class="mb-3 text-start">
                <label class="form-label text-muted fs-7">EMAIL ADDRESS</label>
                <input type="email" id="register-email" class="form-control glass-input" placeholder="nagesh@tracker.com" required>
              </div>
              <div class="mb-4 text-start">
                <label class="form-label text-muted fs-7">PASSWORD (Min. 6 chars)</label>
                <input type="password" id="register-password" class="form-control glass-input" placeholder="••••••••" required>
              </div>
              <button type="submit" class="btn btn-premium w-100 py-2 fs-6 mb-3">Create Account</button>
            </form>
            
            <p class="text-muted fs-7">Already registered? <a href="#/login" class="text-indigo text-decoration-none">Login here</a></p>
          </div>
        </div>
      </div>
    </div>
  `,

  // Application Layout Wrapper (Sidebar + Top Bar + View Mounting Port)
  appLayout: (userName, isAdmin) => `
    <div id="app-container" class="d-flex w-100">
      <!-- Sidebar -->
      <div class="sidebar glass-panel border-top-0 border-bottom-0 border-start-0 rounded-0">
        <div class="p-4 border-bottom border-secondary-subtle">
          <a class="navbar-brand fw-extrabold fs-4 text-white d-flex align-items-center" href="#/dashboard">
            <i class="fa-solid fa-graduation-cap text-primary me-2"></i>PrepSpace
          </a>
        </div>
        
        <div class="flex-grow-1 py-4 overflow-y-auto">
          <a href="#/dashboard" class="sidebar-link active"><i class="fa-solid fa-chart-line"></i> Dashboard</a>
          <a href="#/studyplanner" class="sidebar-link"><i class="fa-solid fa-calendar-check"></i> Study Planner</a>
          <a href="#/questions" class="sidebar-link"><i class="fa-solid fa-circle-question"></i> Questions</a>
          <a href="#/coding" class="sidebar-link"><i class="fa-solid fa-code"></i> Coding Tracker</a>
          <a href="#/mock" class="sidebar-link"><i class="fa-solid fa-microphone"></i> Mock Interviews</a>
          <a href="#/applications" class="sidebar-link"><i class="fa-solid fa-briefcase"></i> Job Applications</a>
          <a href="#/calendar" class="sidebar-link"><i class="fa-solid fa-calendar-days"></i> Calendar</a>
          <a href="#/reports" class="sidebar-link"><i class="fa-solid fa-file-invoice"></i> Reports</a>
          <a href="#/profile" class="sidebar-link"><i class="fa-solid fa-user-gear"></i> Settings</a>
          ${isAdmin ? `<a href="#/admin" class="sidebar-link text-warning-emphasis"><i class="fa-solid fa-shield-halved text-warning"></i> Admin Panel</a>` : ''}
        </div>
        
        <div class="p-3 border-top border-secondary-subtle mt-auto">
          <button id="logout-btn" class="btn btn-glass w-100 py-2"><i class="fa-solid fa-right-from-bracket me-2 text-danger"></i> Logout</button>
        </div>
      </div>

      <!-- Content Area -->
      <div class="main-content d-flex flex-column">
        <!-- Top Nav Header -->
        <header class="d-flex align-items-center justify-content-between pb-4 border-bottom border-secondary-subtle mb-4">
          <div class="d-flex align-items-center gap-3">
            <button class="btn btn-glass d-lg-none" id="sidebar-toggle-btn"><i class="fa-solid fa-bars"></i></button>
            <h2 class="text-white fw-bold m-0" id="current-view-title">Dashboard</h2>
          </div>
          
          <div class="d-flex align-items-center gap-3">
            <button id="dark-mode-toggle" class="btn btn-glass rounded-circle p-2" style="width: 40px; height: 40px;"><i class="fa-solid fa-moon"></i></button>
            <div class="dropdown">
              <button class="btn btn-glass dropdown-toggle d-flex align-items-center gap-2" type="button" id="userDropdown" data-bs-toggle="dropdown">
                <i class="fa-solid fa-circle-user fs-5 text-indigo"></i>
                <span class="d-none d-md-inline" id="user-display-name">${userName}</span>
              </button>
              <ul class="dropdown-menu dropdown-menu-end glass-panel" aria-labelledby="userDropdown">
                <li><a class="dropdown-item text-white" href="#/profile">Settings</a></li>
                <li><hr class="dropdown-divider border-secondary"></li>
                <li><button class="dropdown-item text-danger" id="dropdown-logout">Logout</button></li>
              </ul>
            </div>
          </div>
        </header>

        <!-- Dynamic Sub-view Mounting Port -->
        <div id="page-mount" class="flex-grow-1"></div>
      </div>
    </div>
  `,

  // Dashboard Page Sub-view
  dashboard: (stats) => `
    <div class="row g-4 mb-4">
      <div class="col-md-3">
        <div class="glass-panel p-4 text-center">
          <h6 class="text-muted mb-2">TOTAL STUDY HOURS</h6>
          <div class="display-5 fw-extrabold text-white">${stats.totalStudyHours}h</div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="glass-panel p-4 text-center">
          <h6 class="text-muted mb-2">COMPLETED TOPICS</h6>
          <div class="display-5 fw-extrabold text-white">${stats.completedTopics}</div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="glass-panel p-4 text-center">
          <h6 class="text-muted mb-2">UPCOMING INTERVIEWS</h6>
          <div class="display-5 fw-extrabold text-white">${stats.upcomingInterviewsCount}</div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="glass-panel p-4 text-center">
          <h6 class="text-muted mb-2">ACTIVE APPLICATIONS</h6>
          <div class="display-5 fw-extrabold text-white">${stats.applicationsCount}</div>
        </div>
      </div>
    </div>

    <div class="row g-4">
      <!-- Chart column -->
      <div class="col-lg-8">
        <div class="glass-panel p-4 mb-4">
          <h5 class="text-white fw-bold mb-4">Weekly Time Logs</h5>
          <canvas id="weeklyHoursChart" height="200"></canvas>
        </div>
        
        <div class="row g-4">
          <div class="col-md-6">
            <div class="glass-panel p-4">
              <h5 class="text-white fw-bold mb-3">Topic Streaks & Gamification</h5>
              <div class="d-flex align-items-center justify-content-around py-3">
                <div class="text-center">
                  <div class="streak-badge fs-5 mb-2"><i class="fa-solid fa-fire me-1"></i> ${stats.streak} Days</div>
                  <span class="text-muted">Daily Streak</span>
                </div>
                <div class="text-center">
                  <div class="xp-badge fs-5 mb-2"><i class="fa-solid fa-trophy me-1"></i> ${stats.xpPoints} XP</div>
                  <span class="text-muted">Total Points</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="glass-panel p-4">
              <h5 class="text-white fw-bold mb-3">Coding Platform Solves</h5>
              <ul class="list-group list-group-flush bg-transparent">
                <li class="list-group-item bg-transparent text-white border-secondary-subtle d-flex justify-content-between align-items-center">
                  <span><i class="fa-solid fa-circle-nodes text-warning me-2"></i>LeetCode</span>
                  <span class="badge bg-secondary rounded-pill">${stats.codingPlatformsSolved.LeetCode || 0} Solved</span>
                </li>
                <li class="list-group-item bg-transparent text-white border-secondary-subtle d-flex justify-content-between align-items-center">
                  <span><i class="fa-solid fa-code text-primary me-2"></i>CodeChef</span>
                  <span class="badge bg-secondary rounded-pill">${stats.codingPlatformsSolved.CodeChef || 0} Solved</span>
                </li>
                <li class="list-group-item bg-transparent text-white border-0 d-flex justify-content-between align-items-center">
                  <span><i class="fa-solid fa-terminal text-info me-2"></i>Codeforces</span>
                  <span class="badge bg-secondary rounded-pill">${stats.codingPlatformsSolved.Codeforces || 0} Solved</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar widgets -->
      <div class="col-lg-4">
        <div class="glass-panel p-4 text-center mb-4">
          <h5 class="text-white fw-bold mb-3">Interview Readiness Score</h5>
          <div class="readiness-ring mb-3">
            <div class="readiness-value">${stats.readinessScore}%</div>
            <!-- Canvas or SVG backing -->
            <svg class="w-100 h-100" viewBox="0 0 36 36">
              <path class="circle-bg" stroke="rgba(255,255,255,0.05)" stroke-width="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path class="circle" stroke="#a855f7" stroke-width="3" stroke-dasharray="${stats.readinessScore}, 100" stroke-linecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
          </div>
          <p class="text-muted">Calculated based on your topics completed and latest mock interview feedback.</p>
        </div>

        <div class="glass-panel p-4">
          <h5 class="text-white fw-bold mb-3">Application Pipeline</h5>
          <canvas id="pipelineStatusChart" height="220"></canvas>
        </div>
      </div>
    </div>
  `,

  // Study Planner Page Sub-view (milestones tracker + Pomodoro timer widget)
  studyPlanner: () => `
    <div class="row g-4">
      <div class="col-lg-8">
        <div class="glass-panel p-4 mb-4">
          <div class="d-flex align-items-center justify-content-between mb-4">
            <h5 class="text-white fw-bold m-0">My Milestones</h5>
            <button class="btn btn-premium btn-sm" id="create-plan-btn"><i class="fa-solid fa-plus me-1"></i> Add Goal</button>
          </div>
          <div id="plans-list-container" class="row g-3">
            <!-- Filled dynamically by API -->
            <div class="col-12 text-center py-5"><div class="spinner-border text-primary"></div></div>
          </div>
        </div>
      </div>

      <div class="col-lg-4">
        <!-- Pomodoro Study Timer -->
        <div class="glass-panel p-4 text-center">
          <h5 class="text-white fw-bold mb-3"><i class="fa-regular fa-clock text-indigo me-2"></i>Pomodoro Study Block</h5>
          <div class="timer-display my-4" id="pomodoro-time">25:00</div>
          
          <div class="d-flex justify-content-center gap-2 mb-3">
            <button class="btn btn-glass px-4" id="timer-mode-pomodoro">Study</button>
            <button class="btn btn-glass px-4" id="timer-mode-break">Break</button>
          </div>
          
          <div class="d-flex justify-content-center gap-3">
            <button class="btn btn-premium px-4 py-2" id="timer-start"><i class="fa-solid fa-play"></i> Start</button>
            <button class="btn btn-glass px-4 py-2" id="timer-pause"><i class="fa-solid fa-pause"></i> Pause</button>
            <button class="btn btn-glass p-2" id="timer-reset" style="width: 40px;"><i class="fa-solid fa-rotate-left"></i></button>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Plan Modal Template -->
    <div class="modal fade" id="planModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content glass-panel border-secondary-subtle">
          <div class="modal-header border-secondary-subtle">
            <h5 class="modal-title text-white fw-bold" id="planModalTitle">Log Study Plan</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form id="plan-form">
            <div class="modal-body text-start">
              <input type="hidden" id="plan-id">
              <div class="mb-3">
                <label class="form-label text-muted fs-7">TITLE</label>
                <input type="text" id="plan-title" class="form-control glass-input" placeholder="e.g. Dynamic Programming basics" required>
              </div>
              <div class="mb-3">
                <label class="form-label text-muted fs-7">TARGET COMPANY</label>
                <input type="text" id="plan-company" class="form-control glass-input" placeholder="e.g. Google">
              </div>
              <div class="row mb-3">
                <div class="col-md-6">
                  <label class="form-label text-muted fs-7">START DATE</label>
                  <input type="date" id="plan-start" class="form-control glass-input" required>
                </div>
                <div class="col-md-6">
                  <label class="form-label text-muted fs-7">END DATE</label>
                  <input type="date" id="plan-end" class="form-control glass-input" required>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label text-muted fs-7">STATUS</label>
                <select id="plan-status" class="form-select glass-input">
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="ABANDONED">ABANDONED</option>
                </select>
              </div>
            </div>
            <div class="modal-footer border-secondary-subtle">
              <button type="button" class="btn btn-glass" data-bs-dismiss="modal">Cancel</button>
              <button type="submit" class="btn btn-premium">Save Goal</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,

  // Interview Questions Page Sub-view
  questions: () => `
    <div class="glass-panel p-4 mb-4">
      <div class="row g-3 align-items-center">
        <div class="col-md-4">
          <div class="input-group">
            <span class="input-group-text bg-transparent border-end-0 border-secondary-subtle text-muted"><i class="fa-solid fa-magnifying-glass"></i></span>
            <input type="text" id="search-questions-input" class="form-control glass-input border-start-0" placeholder="Search keywords...">
          </div>
        </div>
        <div class="col-md-3">
          <select id="filter-company" class="form-select glass-input">
            <option value="">All Companies</option>
          </select>
        </div>
        <div class="col-md-3">
          <select id="filter-category" class="form-select glass-input">
            <option value="">All Topics</option>
          </select>
        </div>
        <div class="col-md-2">
          <select id="filter-difficulty" class="form-select glass-input">
            <option value="">All Difficulties</option>
            <option value="EASY">EASY</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HARD">HARD</option>
          </select>
        </div>
      </div>
    </div>

    <div class="glass-panel p-4">
      <div class="table-responsive">
        <table class="table table-dark table-hover align-middle m-0" id="questions-table">
          <thead>
            <tr class="text-muted border-secondary-subtle">
              <th scope="col">Title</th>
              <th scope="col">Company</th>
              <th scope="col">Topic</th>
              <th scope="col">Difficulty</th>
              <th scope="col" class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody id="questions-list-container">
            <tr><td colspan="5" class="text-center py-5"><div class="spinner-border text-primary"></div></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Question Details Modal -->
    <div class="modal fade" id="questionDetailsModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content glass-panel border-secondary-subtle">
          <div class="modal-header border-secondary-subtle">
            <h5 class="modal-title text-white fw-bold" id="qDetailsTitle"></h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body text-start">
            <div class="mb-3 d-flex gap-2" id="qDetailsBadges"></div>
            <div class="glass-panel p-3 mb-4 bg-black bg-opacity-25">
              <h6 class="text-indigo fw-bold mb-2">QUESTION:</h6>
              <p class="text-white m-0" id="qDetailsQuestion" style="white-space: pre-line;"></p>
            </div>
            
            <div class="glass-panel p-3 mb-4 bg-black bg-opacity-25">
              <h6 class="text-success fw-bold mb-2">ANSWER HINT & STRUCTURE:</h6>
              <p class="text-white m-0" id="qDetailsAnswer" style="white-space: pre-line;"></p>
            </div>

            <div class="mb-3">
              <label class="form-label text-muted fs-7">MY PRIVATE STUDY NOTE</label>
              <textarea id="qDetailsNote" class="form-control glass-input" rows="3" placeholder="Save notes, code snippets, or space/time analysis here..."></textarea>
            </div>
          </div>
          <div class="modal-footer border-secondary-subtle">
            <button type="button" class="btn btn-premium btn-sm" id="qDetailsSaveNoteBtn"><i class="fa-solid fa-floppy-disk me-1"></i> Save Note</button>
            <button type="button" class="btn btn-glass btn-sm" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  `,

  // Coding Tracker Page Sub-view
  codingTracker: () => `
    <div class="row g-4">
      <div class="col-lg-8">
        <div class="glass-panel p-4 mb-4">
          <div class="d-flex align-items-center justify-content-between mb-4">
            <h5 class="text-white fw-bold m-0"><i class="fa-solid fa-code text-primary me-2"></i>Problem-Solving Log</h5>
            <button class="btn btn-premium btn-sm" id="log-solving-btn"><i class="fa-solid fa-plus me-1"></i> Log Problem</button>
          </div>
          <div class="table-responsive">
            <table class="table table-dark table-hover align-middle m-0">
              <thead>
                <tr class="text-muted border-secondary-subtle">
                  <th scope="col">Topic</th>
                  <th scope="col">Difficulty</th>
                  <th scope="col">Completed</th>
                  <th scope="col">Time Spent</th>
                  <th scope="col">Date</th>
                  <th scope="col" class="text-center">Action</th>
                </tr>
              </thead>
              <tbody id="solving-list-container">
                <!-- Log entries inserted here -->
              </tbody>
            </table>
          </div>
        </div>

        <div class="glass-panel p-4">
          <h5 class="text-white fw-bold mb-3"><i class="fa-brands fa-github text-white me-2"></i>GitHub Contribution Heatmap</h5>
          <div class="d-flex flex-wrap gap-1 justify-content-center p-3" id="mock-git-contribs">
            <!-- Generating blocks simulating github activity -->
          </div>
          <p class="text-muted text-center fs-7 mt-3">Reflecting system activity logged days. Green squares simulate study logs dates consistency.</p>
        </div>
      </div>

      <div class="col-lg-4">
        <!-- Skill Tree Achievements -->
        <div class="glass-panel p-4 mb-4">
          <h5 class="text-white fw-bold mb-4"><i class="fa-solid fa-sitemap text-secondary me-2"></i>Skill Tree Tree (XP path)</h5>
          
          <div class="d-flex flex-column gap-3">
            <div class="d-flex align-items-center gap-3 p-2 rounded bg-white bg-opacity-5">
              <i class="fa-solid fa-circle-check text-success fs-3"></i>
              <div>
                <h6 class="text-white m-0">Array Novice</h6>
                <p class="text-muted fs-7 m-0">Solve 2 Easy Array questions (Earned)</p>
              </div>
            </div>
            <div class="d-flex align-items-center gap-3 p-2 rounded bg-white bg-opacity-5">
              <i class="fa-solid fa-circle-check text-success fs-3"></i>
              <div>
                <h6 class="text-white m-0">System Starter</h6>
                <p class="text-muted fs-7 m-0">Log 1 System Design task (Earned)</p>
              </div>
            </div>
            <div class="d-flex align-items-center gap-3 p-2 rounded bg-white bg-opacity-5" style="filter: grayscale(1);">
              <i class="fa-solid fa-lock text-muted fs-3"></i>
              <div>
                <h6 class="text-white m-0">Hard Crusher</h6>
                <p class="text-muted fs-7 m-0">Solve 3 Hard coding tasks (Locked)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Log Solving Modal -->
    <div class="modal fade" id="solvingModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content glass-panel border-secondary-subtle">
          <div class="modal-header border-secondary-subtle">
            <h5 class="modal-title text-white fw-bold">Log Coding Task</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <form id="solving-form">
            <div class="modal-body text-start">
              <div class="mb-3">
                <label class="form-label text-muted fs-7">TOPIC / PROBLEM TITLE</label>
                <input type="text" id="solve-topic" class="form-control glass-input" placeholder="e.g. Reverse Linked List" required>
              </div>
              <div class="mb-3">
                <label class="form-label text-muted fs-7">DIFFICULTY</label>
                <select id="solve-difficulty" class="form-select glass-input">
                  <option value="EASY">EASY</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HARD">HARD</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label text-muted fs-7">TIME SPENT (Minutes)</label>
                <input type="number" id="solve-time" class="form-control glass-input" min="5" value="30" required>
              </div>
              <div class="mb-3">
                <label class="form-label text-muted fs-7">DATE PERFORMED</label>
                <input type="date" id="solve-date" class="form-control glass-input" required>
              </div>
              <div class="mb-3">
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" id="solve-completed" checked>
                  <label class="form-check-label text-white" for="solve-completed">Topic Completed & Passed</label>
                </div>
              </div>
            </div>
            <div class="modal-footer border-secondary-subtle">
              <button type="button" class="btn btn-glass" data-bs-dismiss="modal">Cancel</button>
              <button type="submit" class="btn btn-premium">Log Activity</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,

  // Mock Interviews Page Sub-view
  mockInterview: () => `
    <div class="row g-4">
      <div class="col-lg-8">
        <div class="glass-panel p-4 mb-4">
          <div class="d-flex align-items-center justify-content-between mb-4">
            <h5 class="text-white fw-bold m-0"><i class="fa-solid fa-microphone text-primary me-2"></i>My Simulated Interviews</h5>
            <button class="btn btn-premium btn-sm" id="schedule-mock-btn"><i class="fa-solid fa-calendar me-1"></i> Schedule Session</button>
          </div>
          <div class="row g-3" id="mock-list-container">
            <!-- Simulated list items loaded here -->
          </div>
        </div>
      </div>

      <div class="col-lg-4">
        <!-- Interactive Session Simulator Panel -->
        <div class="glass-panel p-4 text-center">
          <h5 class="text-white fw-bold mb-3"><i class="fa-solid fa-clock-rotate-left text-indigo me-2"></i>Self-Guided simulator</h5>
          <p class="text-muted fs-7">Launch a timer with random questions and write down key takeaways.</p>
          <div class="timer-display my-4 text-warning" id="sim-timer-display">45:00</div>
          
          <div class="d-flex justify-content-center gap-2">
            <button class="btn btn-premium btn-sm" id="sim-timer-start">Start Sim</button>
            <button class="btn btn-glass btn-sm" id="sim-timer-reset">Reset</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Schedule Mock Modal -->
    <div class="modal fade" id="mockModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content glass-panel border-secondary-subtle">
          <div class="modal-header border-secondary-subtle">
            <h5 class="modal-title text-white fw-bold">Schedule / Log Mock Session</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <form id="mock-form">
            <div class="modal-body text-start">
              <div class="mb-3">
                <label class="form-label text-muted fs-7">SCHEDULE DATE & TIME</label>
                <input type="datetime-local" id="mock-date" class="form-control glass-input" required>
              </div>
              <div class="mb-3">
                <label class="form-label text-muted fs-7">DURATION (Minutes)</label>
                <select id="mock-duration" class="form-select glass-input">
                  <option value="30">30 min (Speedrun)</option>
                  <option value="45" selected>45 min (Standard Algorithmic)</option>
                  <option value="60">60 min (Standard System Design)</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label text-muted fs-7">SESSION SCORE (If self-assessed out of 100)</label>
                <input type="number" id="mock-score" class="form-control glass-input" min="0" max="100" placeholder="e.g. 75">
              </div>
              <div class="mb-3">
                <label class="form-label text-muted fs-7">FEEDBACK COMMENTS (Optional)</label>
                <textarea id="mock-feedback" class="form-control glass-input" rows="3" placeholder="Leave empty to let the AI evaluator generate performance reviews."></textarea>
              </div>
            </div>
            <div class="modal-footer border-secondary-subtle">
              <button type="button" class="btn btn-glass" data-bs-dismiss="modal">Cancel</button>
              <button type="submit" class="btn btn-premium">Log Session</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- AI Feedback View Modal -->
    <div class="modal fade" id="mockDetailsModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content glass-panel border-secondary-subtle">
          <div class="modal-header border-secondary-subtle">
            <h5 class="modal-title text-white fw-bold">Mock Performance Evaluation</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body text-start">
            <div class="mb-3"><span class="badge bg-secondary p-2 fs-6" id="mockDetailsScore"></span></div>
            <h6 class="text-indigo fw-bold mb-3">AI EVALUATOR FEEDBACK SUMMARY:</h6>
            <div class="glass-panel p-4 bg-black bg-opacity-20 text-white" id="mockDetailsFeedback" style="white-space: pre-line;"></div>
          </div>
          <div class="modal-footer border-secondary-subtle">
            <button type="button" class="btn btn-glass" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  `,

  // Job Applications Page Sub-view (Kanban board layout)
  applications: () => `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h5 class="text-white fw-bold m-0"><i class="fa-solid fa-briefcase text-primary me-2"></i>My Job Pipeline</h5>
      <button class="btn btn-premium btn-sm" id="add-app-btn"><i class="fa-solid fa-plus me-1"></i> Add Job</button>
    </div>

    <!-- Kanban Grid layout -->
    <div class="row g-3">
      <!-- Applied Column -->
      <div class="col-xl-2 col-md-4">
        <div class="text-center py-2 bg-indigo bg-opacity-10 border border-secondary-subtle rounded-top mb-1">
          <span class="text-white fw-bold">APPLIED</span>
        </div>
        <div class="kanban-col" id="col-applied" data-status="APPLIED"></div>
      </div>

      <!-- Phone Screen Column -->
      <div class="col-xl-2 col-md-4">
        <div class="text-center py-2 bg-warning bg-opacity-10 border border-secondary-subtle rounded-top mb-1">
          <span class="text-white fw-bold">PHONE SCREEN</span>
        </div>
        <div class="kanban-col" id="col-phone_screen" data-status="PHONE_SCREEN"></div>
      </div>

      <!-- Interview Scheduled Column -->
      <div class="col-xl-3 col-md-4">
        <div class="text-center py-2 bg-primary bg-opacity-10 border border-secondary-subtle rounded-top mb-1">
          <span class="text-white fw-bold">INTERVIEWS</span>
        </div>
        <div class="kanban-col" id="col-interview_scheduled" data-status="INTERVIEW_SCHEDULED"></div>
      </div>

      <!-- Offer Column -->
      <div class="col-xl-2 col-md-6">
        <div class="text-center py-2 bg-success bg-opacity-10 border border-secondary-subtle rounded-top mb-1">
          <span class="text-white fw-bold">OFFERS</span>
        </div>
        <div class="kanban-col" id="col-offer" data-status="OFFER"></div>
      </div>

      <!-- Rejected Column -->
      <div class="col-xl-3 col-md-6">
        <div class="text-center py-2 bg-danger bg-opacity-10 border border-secondary-subtle rounded-top mb-1">
          <span class="text-white fw-bold">REJECTED</span>
        </div>
        <div class="kanban-col" id="col-rejected" data-status="REJECTED"></div>
      </div>
    </div>

    <!-- Add Application Modal -->
    <div class="modal fade" id="appModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content glass-panel border-secondary-subtle">
          <div class="modal-header border-secondary-subtle">
            <h5 class="modal-title text-white fw-bold">Add Job Application</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <form id="app-form">
            <div class="modal-body text-start">
              <div class="mb-3">
                <label class="form-label text-muted fs-7">COMPANY NAME</label>
                <input type="text" id="app-company" class="form-control glass-input" placeholder="e.g. Google" required>
              </div>
              <div class="mb-3">
                <label class="form-label text-muted fs-7">TARGET ROLE</label>
                <input type="text" id="app-role" class="form-control glass-input" placeholder="e.g. Senior Software Architect" required>
              </div>
              <div class="mb-3">
                <label class="form-label text-muted fs-7">APPLIED DATE</label>
                <input type="date" id="app-date" class="form-control glass-input" required>
              </div>
              <div class="mb-3">
                <label class="form-label text-muted fs-7">INITIAL PIPELINE STATE</label>
                <select id="app-status" class="form-select glass-input">
                  <option value="APPLIED">APPLIED</option>
                  <option value="PHONE_SCREEN">PHONE SCREEN</option>
                  <option value="INTERVIEW_SCHEDULED">INTERVIEW SCHEDULED</option>
                  <option value="OFFER">OFFER</option>
                  <option value="REJECTED">REJECTED</option>
                </select>
              </div>
            </div>
            <div class="modal-footer border-secondary-subtle">
              <button type="button" class="btn btn-glass" data-bs-dismiss="modal">Cancel</button>
              <button type="submit" class="btn btn-premium">Log Application</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,

  // Calendar View
  calendar: () => `
    <div class="glass-panel p-4 mb-4">
      <div class="d-flex align-items-center justify-content-between mb-4">
        <h5 class="text-white fw-bold m-0"><i class="fa-solid fa-calendar-days text-primary me-2"></i>Preparation Calendar</h5>
        <div class="d-flex gap-2">
          <span class="badge text-white" style="background-color: #6366f1;">Study Plans</span>
          <span class="badge text-white" style="background-color: #10b981;">Interviews</span>
          <span class="badge text-white" style="background-color: #a855f7;">Job Apps</span>
        </div>
      </div>
      
      <!-- Calendar Grid Layout -->
      <div id="calendar-view-container">
        <!-- Rendered dynamically by javascript -->
        <div class="text-center py-5"><div class="spinner-border text-primary"></div></div>
      </div>
    </div>
  `,

  // Reports View
  reports: () => `
    <div class="row g-4 justify-content-center">
      <div class="col-md-8 col-lg-6">
        <div class="glass-panel p-5 text-center">
          <i class="fa-solid fa-file-invoice-dollar fs-1 text-primary mb-4"></i>
          <h4 class="text-white fw-bold mb-3">Download Preparation Reports</h4>
          <p class="text-muted mb-5">Export compiled study activity logs, solved topic statistics, mock interview feedback lists, and application pipelines into standard formats for print or review.</p>
          
          <div class="d-flex flex-column gap-3">
            <button class="btn btn-premium py-3 fs-6" id="btn-export-pdf"><i class="fa-solid fa-file-pdf me-2"></i> Export Candidate Progress (PDF)</button>
            <button class="btn btn-glass py-3 fs-6" id="btn-export-excel"><i class="fa-solid fa-file-excel me-2 text-success"></i> Export Applications Spreadsheet (Excel)</button>
          </div>
        </div>
      </div>
    </div>
  `,

  // Settings / Profile View
  profile: () => `
    <div class="row g-4">
      <div class="col-lg-6">
        <div class="glass-panel p-4">
          <h5 class="text-white fw-bold mb-4">Edit Profile</h5>
          <form id="profile-edit-form">
            <div class="mb-3">
              <label class="form-label text-muted fs-7">FULL NAME</label>
              <input type="text" id="profile-name" class="form-control glass-input" required>
            </div>
            <div class="mb-4">
              <label class="form-label text-muted fs-7">EMAIL ADDRESS (Cannot be modified)</label>
              <input type="email" id="profile-email" class="form-control glass-input" disabled>
            </div>
            <button type="submit" class="btn btn-premium w-100">Update Profile</button>
          </form>
        </div>
      </div>

      <div class="col-lg-6">
        <div class="glass-panel p-4">
          <h5 class="text-white fw-bold mb-4">Modify Credentials</h5>
          <form id="change-pass-form">
            <div class="mb-3">
              <label class="form-label text-muted fs-7">CURRENT PASSWORD</label>
              <input type="password" id="pass-old" class="form-control glass-input" required>
            </div>
            <div class="mb-3">
              <label class="form-label text-muted fs-7">NEW PASSWORD</label>
              <input type="password" id="pass-new" class="form-control glass-input" required>
            </div>
            <div class="mb-4">
              <label class="form-label text-muted fs-7">CONFIRM NEW PASSWORD</label>
              <input type="password" id="pass-confirm" class="form-control glass-input" required>
            </div>
            <button type="submit" class="btn btn-premium w-100">Update Password</button>
          </form>
        </div>
      </div>
    </div>
  `,

  // Admin Dashboard View
  admin: () => `
    <div class="row g-4">
      <!-- Users list -->
      <div class="col-lg-7">
        <div class="glass-panel p-4">
          <h5 class="text-white fw-bold mb-4"><i class="fa-solid fa-users text-primary me-2"></i>Users Database</h5>
          <div class="table-responsive">
            <table class="table table-dark table-hover align-middle m-0">
              <thead>
                <tr class="text-muted border-secondary-subtle">
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Role</th>
                  <th scope="col" class="text-center">Action</th>
                </tr>
              </thead>
              <tbody id="admin-users-container">
                <!-- User rows injected dynamically -->
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Add Questions -->
      <div class="col-lg-5">
        <div class="glass-panel p-4">
          <h5 class="text-white fw-bold mb-4"><i class="fa-solid fa-plus text-success me-2"></i>Add Official Question</h5>
          <form id="admin-question-form">
            <div class="mb-3">
              <label class="form-label text-muted fs-7">QUESTION TITLE</label>
              <input type="text" id="admin-q-title" class="form-control glass-input" placeholder="e.g. Reverse a String" required>
            </div>
            <div class="row mb-3">
              <div class="col-6">
                <label class="form-label text-muted fs-7">COMPANY</label>
                <input type="text" id="admin-q-company" class="form-control glass-input" placeholder="e.g. Netflix" required>
              </div>
              <div class="col-6">
                <label class="form-label text-muted fs-7">TOPIC CATEGORY</label>
                <input type="text" id="admin-q-category" class="form-control glass-input" placeholder="e.g. Recursion" required>
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label text-muted fs-7">DIFFICULTY</label>
              <select id="admin-q-difficulty" class="form-select glass-input">
                <option value="EASY">EASY</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HARD">HARD</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label text-muted fs-7">QUESTION DESCRIPTION</label>
              <textarea id="admin-q-desc" class="form-control glass-input" rows="3" placeholder="Write question details..." required></textarea>
            </div>
            <div class="mb-3">
              <label class="form-label text-muted fs-7">ANSWER GUIDELINES / OPTIMAL SOLUTION</label>
              <textarea id="admin-q-answer" class="form-control glass-input" rows="3" placeholder="Write answers or pseudocodes..." required></textarea>
            </div>
            <div class="mb-4">
              <label class="form-label text-muted fs-7">TAGS (Comma separated)</label>
              <input type="text" id="admin-q-tags" class="form-control glass-input" placeholder="String,Algorithms">
            </div>
            <button type="submit" class="btn btn-premium w-100">Publish Question</button>
          </form>
        </div>
      </div>
    </div>
  `
};
