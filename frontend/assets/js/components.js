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
          <a href="#/courses" class="sidebar-link"><i class="fa-solid fa-graduation-cap text-info"></i> LMS Courses</a>
          <a href="#/certificates" class="sidebar-link"><i class="fa-solid fa-award text-warning"></i> Certificates</a>
          <a href="#/dsa-roadmap" class="sidebar-link"><i class="fa-solid fa-route text-success"></i> DSA Roadmap</a>
          <a href="#/coding-practice" class="sidebar-link"><i class="fa-solid fa-code text-indigo"></i> Coding Practice</a>
          <a href="#/experiences" class="sidebar-link"><i class="fa-solid fa-user-tie text-secondary"></i> Experiences</a>
          <a href="#/mock-exams" class="sidebar-link"><i class="fa-solid fa-stopwatch text-danger"></i> Mock Exams</a>
          <a href="#/flashcards" class="sidebar-link"><i class="fa-solid fa-clone text-primary"></i> Flashcards</a>
          <a href="#/community" class="sidebar-link"><i class="fa-solid fa-comments text-info"></i> Community</a>
          <a href="#/notes" class="sidebar-link"><i class="fa-solid fa-note-sticky text-warning"></i> Study Notes</a>
          <a href="#/placement" class="sidebar-link"><i class="fa-solid fa-briefcase text-success"></i> Placements</a>
          <a href="#/ai-assistant" class="sidebar-link"><i class="fa-solid fa-robot text-primary"></i> AI Assistant</a>
          <a href="#/calendar" class="sidebar-link"><i class="fa-solid fa-calendar-days text-muted"></i> Calendar</a>
          <a href="#/reports" class="sidebar-link"><i class="fa-solid fa-file-invoice text-muted"></i> Reports</a>
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
      <!-- Settings Tabs Navigation -->
      <div class="col-md-4 col-lg-3">
        <div class="glass-panel p-3">
          <div class="list-group list-group-flush" id="settings-tabs-list">
            <button class="list-group-item list-group-item-action bg-transparent text-white border-secondary fs-7 py-3 btn-settings-tab active" data-tab="profile">
              <i class="fa-solid fa-circle-user me-2 text-indigo"></i> Profile Settings
            </button>
            <button class="list-group-item list-group-item-action bg-transparent text-white border-secondary fs-7 py-3 btn-settings-tab" data-tab="security">
              <i class="fa-solid fa-shield-halved me-2 text-success"></i> Security & Sessions
            </button>
            <button class="list-group-item list-group-item-action bg-transparent text-white border-secondary fs-7 py-3 btn-settings-tab" data-tab="appearance">
              <i class="fa-solid fa-palette me-2 text-warning"></i> Appearance Theme
            </button>
            <button class="list-group-item list-group-item-action bg-transparent text-white border-secondary fs-7 py-3 btn-settings-tab" data-tab="notifications">
              <i class="fa-solid fa-bell me-2 text-danger"></i> Notification Settings
            </button>
            <button class="list-group-item list-group-item-action bg-transparent text-white border-secondary fs-7 py-3 btn-settings-tab" data-tab="learning">
              <i class="fa-solid fa-book-open me-2 text-primary"></i> Learning Preferences
            </button>
            <button class="list-group-item list-group-item-action bg-transparent text-white border-secondary fs-7 py-3 btn-settings-tab" data-tab="career">
              <i class="fa-solid fa-briefcase me-2 text-success"></i> Career Preferences
            </button>
            <button class="list-group-item list-group-item-action bg-transparent text-white border-secondary fs-7 py-3 btn-settings-tab" data-tab="developer">
              <i class="fa-solid fa-code me-2 text-muted"></i> Developer Keys
            </button>
            <button class="list-group-item list-group-item-action bg-transparent text-white border-secondary fs-7 py-3 btn-settings-tab" data-tab="subscription">
              <i class="fa-solid fa-credit-card me-2 text-indigo"></i> PrepPro Plan
            </button>
            <button class="list-group-item list-group-item-action bg-transparent text-white border-secondary fs-7 py-3 btn-settings-tab" data-tab="about">
              <i class="fa-solid fa-circle-info me-2 text-muted"></i> About Platform
            </button>
          </div>
        </div>
      </div>
      <!-- Form Workspace Mount -->
      <div class="col-md-8 col-lg-9">
        <div class="glass-panel p-4" id="settings-workspace-mount" style="min-height: 450px;">
          <!-- Loaded dynamically via js -->
          <div class="text-center py-5"><div class="spinner-border text-primary"></div></div>
        </div>
      </div>
    </div>
  `,

  settingsProfile: (s, user) => `
    <h5 class="text-white fw-bold mb-4">👤 Profile Information</h5>
    <form id="settings-profile-form">
      <div class="row g-3 mb-3">
        <div class="col-md-6">
          <label class="form-label text-muted fs-7">FULL NAME</label>
          <input type="text" id="set-name" class="form-control glass-input" value="${user.name}" required>
        </div>
        <div class="col-md-6">
          <label class="form-label text-muted fs-7">EMAIL ADDRESS</label>
          <input type="email" id="set-email" class="form-control glass-input" value="${user.email}" disabled>
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label text-muted fs-7">BIOGRAPHY / MOTTO</label>
        <textarea id="set-bio" class="form-control glass-input fs-7" rows="2" placeholder="Tell us about your preparation objectives...">${s.bio || ''}</textarea>
      </div>
      <div class="row g-3 mb-3">
        <div class="col-md-6">
          <label class="form-label text-muted fs-7">COLLEGE / ACADEMY</label>
          <input type="text" id="set-college" class="form-control glass-input" value="${s.college || ''}">
        </div>
        <div class="col-md-6">
          <label class="form-label text-muted fs-7">DEGREE</label>
          <input type="text" id="set-degree" class="form-control glass-input" value="${s.degree || ''}">
        </div>
      </div>
      <div class="row g-3 mb-3">
        <div class="col-md-6">
          <label class="form-label text-muted fs-7">BRANCH / SPECIALIZATION</label>
          <input type="text" id="set-branch" class="form-control glass-input" value="${s.branch || ''}">
        </div>
        <div class="col-md-6">
          <label class="form-label text-muted fs-7">GRADUATION YEAR</label>
          <input type="number" id="set-gradyear" class="form-control glass-input" value="${s.graduationYear || 2026}">
        </div>
      </div>
      <div class="row g-3 mb-4">
        <div class="col-md-4">
          <label class="form-label text-muted fs-7">GITHUB LINK</label>
          <input type="text" id="set-github" class="form-control glass-input fs-7" value="${s.githubUrl || ''}">
        </div>
        <div class="col-md-4">
          <label class="form-label text-muted fs-7">LINKEDIN LINK</label>
          <input type="text" id="set-linkedin" class="form-control glass-input fs-7" value="${s.linkedinUrl || ''}">
        </div>
        <div class="col-md-4">
          <label class="form-label text-muted fs-7">PORTFOLIO URL</label>
          <input type="text" id="set-portfolio" class="form-control glass-input fs-7" value="${s.portfolioUrl || ''}">
        </div>
      </div>
      <button type="submit" class="btn btn-premium w-100 py-2 fs-6">Update Profile Metrics</button>
    </form>
  `,

  settingsSecurity: (s, sessions) => `
    <h5 class="text-white fw-bold mb-4">🔐 Access & Security Controls</h5>
    <form id="settings-security-form" class="mb-5">
      <div class="mb-3">
        <label class="form-label text-muted fs-7">NEW ACCOUNT PASSWORD</label>
        <input type="password" id="set-newpassword" class="form-control glass-input" placeholder="Min. 12 chars (Upper/Lower/Num/Special)">
      </div>
      <div class="mb-3">
        <label class="form-label text-muted fs-7">CONFIRM NEW PASSWORD</label>
        <input type="password" id="set-confirmpassword" class="form-control glass-input" placeholder="••••••••">
      </div>
      <div class="form-check form-switch mb-4">
        <input class="form-check-input" type="checkbox" id="set-enable2fa" ${s.enable2fa ? 'checked' : ''}>
        <label class="form-check-label text-muted fs-7" for="set-enable2fa">Enable 2FA Authentication (Forces Email Security OTP check on every login)</label>
      </div>
      <button type="submit" class="btn btn-premium w-100 py-2">Update Security Settings</button>
    </form>

    <h5 class="text-white fw-bold mb-3"><i class="fa-solid fa-laptop-code text-indigo me-2"></i>Active Device Sessions</h5>
    <div class="table-responsive mb-3">
      <table class="table table-dark table-hover align-middle m-0 fs-7">
        <thead>
          <tr class="text-muted border-secondary-subtle">
            <th scope="col">Device Browser</th>
            <th scope="col">IP Address</th>
            <th scope="col">Last Access</th>
            <th scope="col" class="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          ${sessions.map(sess => `
            <tr class="border-secondary-subtle">
              <td class="text-white fw-bold">${sess.userAgent.substring(0, 25)}...</td>
              <td>${sess.ipAddress}</td>
              <td>${sess.lastActive.substring(11, 19)}</td>
              <td class="text-center">
                <button class="btn btn-glass btn-sm text-danger btn-revoke-session" data-session-id="${sess.id}"><i class="fa-solid fa-ban"></i> Terminate</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    <button class="btn btn-glass text-danger w-100 py-2 fs-7" id="btn-revoke-all-sessions"><i class="fa-solid fa-right-from-bracket me-1"></i> Terminate All Other Sessions</button>
  `,

  settingsAppearance: (s) => `
    <h5 class="text-white fw-bold mb-4">🎨 Appearance & Styling Layouts</h5>
    <form id="settings-appearance-form">
      <div class="mb-3">
        <label class="form-label text-muted fs-7">THEME SELECTOR</label>
        <select id="set-theme" class="form-select glass-input">
          <option value="dark" ${s.theme === 'dark' ? 'selected' : ''}>Dark Space Theme (Recommended)</option>
          <option value="light" ${s.theme === 'light' ? 'selected' : ''}>Light Desktop Theme</option>
        </select>
      </div>
      <div class="mb-3">
        <label class="form-label text-muted fs-7">ACCENT SHADE (HEX COLOR)</label>
        <div class="d-flex gap-2">
          <input type="color" id="set-accentcolor" class="form-control form-control-color bg-transparent border-0" value="${s.accentColor || '#6366f1'}" style="width: 50px; height: 40px;">
          <input type="text" id="set-accenthex" class="form-control glass-input fs-7" value="${s.accentColor || '#6366f1'}">
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label text-muted fs-7">FONT SIZE SCALER</label>
        <select id="set-fontsize" class="form-select glass-input">
          <option value="small" ${s.fontSize === 'small' ? 'selected' : ''}>Small Reader Font</option>
          <option value="medium" ${s.fontSize === 'medium' ? 'selected' : ''}>Medium Standard Font</option>
          <option value="large" ${s.fontSize === 'large' ? 'selected' : ''}>Large Accessible Font</option>
        </select>
      </div>
      <div class="form-check form-switch mb-4">
        <input class="form-check-input" type="checkbox" id="set-compact" ${s.compactMode ? 'checked' : ''}>
        <label class="form-check-label text-muted fs-7" for="set-compact">Enable Compact layout spaces (Minimizes cards margins)</label>
      </div>
      <button type="submit" class="btn btn-premium w-100 py-2">Apply Styling Metrics</button>
    </form>
  `,

  settingsNotifications: (s) => `
    <h5 class="text-white fw-bold mb-4">🔔 Notification Mappings</h5>
    <form id="settings-notifications-form">
      <h6 class="text-white fw-bold mb-3 fs-7">EMAIL CHANNELS</h6>
      <div class="form-check mb-2">
        <input class="form-check-input" type="checkbox" id="set-emailreminder" ${s.emailStudyReminder ? 'checked' : ''}>
        <label class="form-check-label text-muted fs-7" for="set-emailreminder">Daily Study Reminder alerts</label>
      </div>
      <div class="form-check mb-4">
        <input class="form-check-input" type="checkbox" id="set-emailreport" ${s.emailWeeklyReport ? 'checked' : ''}>
        <label class="form-check-label text-muted fs-7" for="set-emailreport">Weekly preparation overview analytics report</label>
      </div>

      <h6 class="text-white fw-bold mb-3 fs-7">PLATFORM WEB CHANNELS</h6>
      <div class="form-check mb-2">
        <input class="form-check-input" type="checkbox" id="set-toast" ${s.toastNotifications ? 'checked' : ''}>
        <label class="form-check-label text-muted fs-7" for="set-toast">Show on-screen Toast alerts</label>
      </div>
      <div class="form-check mb-4">
        <input class="form-check-input" type="checkbox" id="set-achieve" ${s.achievementNotifications ? 'checked' : ''}>
        <label class="form-check-label text-muted fs-7" for="set-achieve">Notify when badges or XP goals are unlocked</label>
      </div>
      <button type="submit" class="btn btn-premium w-100 py-2">Save Mappings</button>
    </form>
  `,

  settingsLearning: (s) => `
    <h5 class="text-white fw-bold mb-4">📚 Learning Preferences</h5>
    <form id="settings-learning-form">
      <div class="mb-3">
        <label class="form-label text-muted fs-7">PREFERRED PROGRAMMING LANGUAGE</label>
        <select id="set-language" class="form-select glass-input">
          <option value="Java" ${s.preferredLanguage === 'Java' ? 'selected' : ''}>Java 21</option>
          <option value="Python" ${s.preferredLanguage === 'Python' ? 'selected' : ''}>Python 3</option>
          <option value="C++" ${s.preferredLanguage === 'C++' ? 'selected' : ''}>C++ 17</option>
          <option value="JavaScript" ${s.preferredLanguage === 'JavaScript' ? 'selected' : ''}>JavaScript (Node.js)</option>
        </select>
      </div>
      <div class="mb-3">
        <label class="form-label text-muted fs-7">DAILY QUESTIONS SOLVE TARGET</label>
        <input type="number" id="set-dailygoal" class="form-control glass-input" value="${s.dailyQuestionsGoal || 5}" min="1" max="25">
      </div>
      <div class="mb-3">
        <label class="form-label text-muted fs-7">PREFERRED PROBLEM DIFFICULTY</label>
        <select id="set-diff" class="form-select glass-input">
          <option value="Easy" ${s.preferredDifficulty === 'Easy' ? 'selected' : ''}>Easy Only</option>
          <option value="Medium" ${s.preferredDifficulty === 'Medium' ? 'selected' : ''}>Medium Only</option>
          <option value="Hard" ${s.preferredDifficulty === 'Hard' ? 'selected' : ''}>Hard Only</option>
          <option value="Mixed" ${s.preferredDifficulty === 'Mixed' ? 'selected' : ''}>Mixed (Standard)</option>
        </select>
      </div>
      <div class="mb-4">
        <label class="form-label text-muted fs-7">TARGET COMPANIES (Comma separated)</label>
        <input type="text" id="set-companies" class="form-control glass-input" value="${s.targetCompanies || ''}">
      </div>
      <button type="submit" class="btn btn-premium w-100 py-2">Save Preferences</button>
    </form>
  `,

  settingsCareer: (s) => `
    <h5 class="text-white fw-bold mb-4">💼 Career Preferences</h5>
    <form id="settings-career-form">
      <div class="row g-3 mb-3">
        <div class="col-md-6">
          <label class="form-label text-muted fs-7">TARGET PLACEMENT ROLE</label>
          <input type="text" id="set-role" class="form-control glass-input" value="${s.targetRole || ''}">
        </div>
        <div class="col-md-6">
          <label class="form-label text-muted fs-7">EXPECTED ANNUAL SALARY ($)</label>
          <input type="text" id="set-salary" class="form-control glass-input" value="${s.expectedSalary || ''}">
        </div>
      </div>
      <div class="mb-4">
        <label class="form-label text-muted fs-7">WORK ENVIRONMENT MODE</label>
        <select id="set-workmode" class="form-select glass-input">
          <option value="Remote" ${s.workMode === 'Remote' ? 'selected' : ''}>Remote First</option>
          <option value="Hybrid" ${s.workMode === 'Hybrid' ? 'selected' : ''}>Hybrid Workspace</option>
          <option value="Office" ${s.workMode === 'Office' ? 'selected' : ''}>Office Centered</option>
        </select>
      </div>
      <button type="submit" class="btn btn-premium w-100 py-2">Save Career Paths</button>
    </form>
  `,

  settingsDeveloper: (s) => `
    <h5 class="text-white fw-bold mb-4">🛠 Developer Credentials</h5>
    <form id="settings-developer-form" class="mb-4">
      <div class="form-check form-switch mb-4">
        <input class="form-check-input" type="checkbox" id="set-devmode" ${s.developerMode ? 'checked' : ''}>
        <label class="form-check-label text-muted fs-7" for="set-devmode">Enable Developer Options API Playgrounds</label>
      </div>
      <button type="submit" class="btn btn-premium w-100 py-2 mb-4">Save Developer Status</button>
    </form>

    <div class="p-4 rounded border border-secondary bg-dark-subtle ${s.developerMode ? '' : 'd-none'}" id="dev-api-keys-box">
      <h6 class="text-white fw-bold mb-3 fs-7">Developer API Authentication Keys</h6>
      <div class="bg-dark p-3 rounded mb-3 text-start border border-secondary d-flex align-items-center justify-content-between">
        <span class="font-monospace text-indigo fs-7">${s.apiKey || 'No key generated.'}</span>
        <button class="btn btn-glass btn-sm py-1" id="btn-rotate-apikey"><i class="fa-solid fa-arrows-rotate"></i> Rotate</button>
      </div>
      <small class="text-muted">Use this API key inside requests header: <code>Authorization: Bearer [key]</code> to automate solutions uploads externally.</small>
    </div>
  `,

  settingsSubscription: () => `
    <h5 class="text-white fw-bold mb-4">💳 Subscription Details</h5>
    <div class="glass-panel p-4 border-indigo text-center mb-4">
      <div class="badge bg-indigo-subtle text-primary mb-3 py-2 px-3 fs-7">ACTIVE PLAN: PREPPRO (FREE ACCREDITED)</div>
      <h3 class="text-white fw-bold mb-2">PrepPro Premium Edition</h3>
      <p class="text-muted fs-7 mb-4">Recommended for Active Jobseekers • Lifetime Zero-Cost Developer Access</p>
      
      <div class="row g-3 justify-content-center text-start max-w-sm mx-auto mb-4 fs-7 text-muted" style="max-width: 320px;">
        <div class="col-12"><i class="fa-solid fa-circle-check text-success me-2"></i> Custom Target Study Plans</div>
        <div class="col-12"><i class="fa-solid fa-circle-check text-success me-2"></i> Mock AI Feedback Logs</div>
        <div class="col-12"><i class="fa-solid fa-circle-check text-success me-2"></i> Export Excel/PDF Reports</div>
        <div class="col-12"><i class="fa-solid fa-circle-check text-success me-2"></i> Advanced Platform Syncs</div>
      </div>
      
      <div class="alert alert-success fs-7 d-inline-block px-4 py-2 border-success-subtle mb-0">
        <i class="fa-solid fa-circle-info me-1"></i> Subscription constraints have been removed. Enjoy full developer access at $0.00/month.
      </div>
    </div>
  `,

  settingsAbout: () => `
    <div class="text-center py-5">
      <i class="fa-solid fa-graduation-cap display-3 text-indigo mb-4"></i>
      <h4 class="text-white fw-bold mb-1">PrepSpace Enterprise</h4>
      <p class="text-muted fs-7 mb-4">Version 2.0.1 (Stateless Zero-Trust Edition)</p>
      <div class="bg-dark p-3 rounded border border-secondary max-w-sm mx-auto mb-4 text-start text-muted fs-7">
        <p class="mb-2"><i class="fa-solid fa-circle-nodes me-2 text-indigo"></i> <strong>Engine</strong>: Spring Boot 3.3 + Hibernate</p>
        <p class="mb-2"><i class="fa-solid fa-user-lock me-2 text-success"></i> <strong>Security</strong>: JWT HTTP-only stateless filters</p>
        <p class="mb-0"><i class="fa-solid fa-database me-2 text-warning"></i> <strong>Database</strong>: H2 / MySQL Driver Dialects</p>
      </div>
      <p class="text-muted fs-8">Designed by the Google Deepmind Team. All rights reserved.</p>
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
  `,

  // 1. Learning Platform (LMS)
  courses: (list) => `
    <div class="row g-4">
      ${list.map(c => `
        <div class="col-md-4">
          <div class="glass-panel h-100 d-flex flex-column">
            <div class="position-relative">
              <div class="course-badge">${c.difficulty}</div>
              <div class="ratio ratio-16x9 bg-dark rounded-top d-flex align-items-center justify-content-center text-muted">
                <i class="fa-solid fa-play-circle fs-1 text-indigo"></i>
              </div>
            </div>
            <div class="p-4 flex-grow-1 d-flex flex-column">
              <h5 class="text-white fw-bold mb-2">${c.title}</h5>
              <p class="text-muted fs-7 flex-grow-1">${c.description}</p>
              <div class="d-flex align-items-center justify-content-between text-muted fs-7 mb-3">
                <span><i class="fa-solid fa-user-tie me-1"></i>${c.instructor}</span>
                <span><i class="fa-solid fa-clock me-1"></i>${c.duration}</span>
              </div>
              <div class="d-flex align-items-center justify-content-between mb-4">
                <div class="text-warning fs-7">
                  <i class="fa-solid fa-star"></i> ${c.rating} <span class="text-muted">(${c.enrollmentCount} enrolled)</span>
                </div>
              </div>
              <button class="btn btn-premium w-100 btn-enroll-course" data-course-id="${c.id}">Initialize Course</button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `,

  courseDetail: (course, enrollment) => `
    <div class="row g-4">
      <!-- Lesson Navigation Drawer -->
      <div class="col-lg-4">
        <div class="glass-panel p-4">
          <h5 class="text-white fw-bold mb-3">Course Curriculum</h5>
          <div class="progress mb-4 bg-dark" style="height: 8px;">
            <div class="progress-bar bg-indigo" role="progressbar" style="width: ${enrollment ? enrollment.progressPercentage : 0}%"></div>
          </div>
          <p class="text-muted fs-7 mb-4">${enrollment ? Math.round(enrollment.progressPercentage) : 0}% Completed</p>
          <div class="list-group list-group-flush" id="curriculum-drawer">
            ${course.lessons.map(l => `
              <button class="list-group-item list-group-item-action bg-transparent text-white border-secondary fs-7 py-3 d-flex align-items-center justify-content-between btn-select-lesson" data-lesson-id="${l.id}" data-video="${l.videoUrl}" data-quiz='${l.quizQuestions || '[]'}' data-seq="${l.sequenceNumber}">
                <span><i class="fa-regular fa-circle-play me-2 text-indigo"></i>${l.sequenceNumber}. ${l.title}</span>
                <i class="fa-solid fa-circle-check text-muted lesson-check-status"></i>
              </button>
            `).join('')}
          </div>
        </div>
      </div>
      <!-- Video Player and Workspace -->
      <div class="col-lg-8">
        <div class="glass-panel p-4 mb-4">
          <div class="ratio ratio-16x9 bg-dark mb-4 rounded">
            <iframe id="video-frame" src="https://www.youtube.com/embed/5a8b79f" title="Lesson Player" allowfullscreen></iframe>
          </div>
          <h4 class="text-white fw-bold" id="active-lesson-title">Select a Lesson to Begin</h4>
        </div>
        <!-- Quizzes & Notes Tab -->
        <div class="glass-panel p-4">
          <h5 class="text-white fw-bold mb-3">Diagnostic Assessment Quiz</h5>
          <div id="lesson-quiz-container">
            <p class="text-muted fs-7">Choose a lesson to load the diagnostic test questions.</p>
          </div>
          <button class="btn btn-premium mt-3 d-none" id="btn-submit-lesson-quiz">Verify Quiz Answers</button>
        </div>
      </div>
    </div>
  `,

  // 2. Certification Center
  certificates: (certs) => `
    <div class="row g-4">
      ${certs.length === 0 ? `
        <div class="col-12 text-center py-5">
          <i class="fa-solid fa-award display-3 text-muted mb-4"></i>
          <h4 class="text-white fw-bold">No Certificates Unlocked Yet</h4>
          <p class="text-muted">Complete any LMS course to 100% progress to automatically generate verified certificates.</p>
        </div>
      ` : certs.map(c => `
        <div class="col-md-6 col-lg-4">
          <div class="glass-panel p-4 text-center">
            <div class="mb-4 text-indigo"><i class="fa-solid fa-certificate display-4"></i></div>
            <h5 class="text-white fw-bold mb-1">${c.courseName}</h5>
            <p class="text-muted fs-7 mb-3">Issued: ${c.completionDate.substring(0, 10)}</p>
            <div class="bg-dark p-3 rounded mb-4 text-start border border-secondary">
              <div class="text-muted fs-8 mb-1">CERTIFICATE ID</div>
              <div class="font-monospace text-white fs-7">${c.certificateId}</div>
            </div>
            <div class="d-flex gap-2">
              <a href="${c.verificationUrl}" target="_blank" class="btn btn-glass w-50 py-2 fs-7"><i class="fa-solid fa-arrow-up-right-from-square me-1"></i> Verify</a>
              <button class="btn btn-premium w-50 py-2 fs-7 btn-print-cert" data-cert-id="${c.certificateId}" data-student="${c.studentName}" data-course="${c.courseName}" data-date="${c.completionDate.substring(0, 10)}" data-sig="${c.instructorSignature}"><i class="fa-solid fa-print me-1"></i> Print PDF</button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `,

  // 3. DSA Roadmap (Striver style)
  dsaRoadmap: (topics) => `
    <div class="glass-panel p-4 mb-4">
      <h4 class="text-white fw-bold mb-2">Interactive Study Tree Roadmap</h4>
      <p class="text-muted">Progress topic-by-topic from Arrays to Dynamic Programming with visualizations, theory modules, and optimized complexity guides.</p>
    </div>
    <div class="row g-4">
      <!-- Roadmap Tree Nodes -->
      <div class="col-md-5">
        <div class="glass-panel p-4">
          <h5 class="text-white fw-bold mb-4">Roadmap Nodes</h5>
          <div class="d-flex flex-column gap-3" id="roadmap-tree-nodes">
            ${topics.map((t, idx) => `
              <div class="roadmap-node-card p-3 rounded border border-secondary" style="cursor: pointer;" data-topic-id="${t.id}">
                <div class="d-flex align-items-center justify-content-between">
                  <span class="fw-bold text-white fs-6"><i class="fa-solid fa-circle-dot me-2 text-indigo"></i>Topic ${idx + 1}: ${t.name}</span>
                  <span class="badge bg-indigo-subtle text-primary border border-primary-subtle fs-8">${t.subtopics.length} Modules</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
      <!-- Detailed Topic Node View -->
      <div class="col-md-7">
        <div class="glass-panel p-4" id="dsa-detail-panel">
          <div class="text-center py-5 text-muted">
            <i class="fa-solid fa-route display-5 mb-3"></i>
            <p>Select a roadmap node on the left to load its curriculum, visual trees, and interview suggestions.</p>
          </div>
        </div>
      </div>
    </div>
  `,

  dsaTopicDetail: (topic) => `
    <h4 class="text-white fw-bold mb-3">${topic.name} Detail Modules</h4>
    <div class="accordion accordion-flush" id="subtopic-accordion">
      ${topic.subtopics.map((s, idx) => `
        <div class="accordion-item bg-transparent text-white border-secondary">
          <h2 class="accordion-header bg-transparent">
            <button class="accordion-button bg-transparent text-white collapsed fs-6 fw-bold py-3" type="button" data-bs-toggle="collapse" data-bs-target="#sub-collapse-${s.id}">
              ${idx + 1}. ${s.name}
            </button>
          </h2>
          <div id="sub-collapse-${s.id}" class="accordion-collapse collapse" data-bs-parent="#subtopic-accordion">
            <div class="accordion-body text-muted fs-7">
              <h6 class="text-white fw-bold mt-2">Theory & Concept:</h6>
              <p>${s.theory}</p>
              <h6 class="text-white fw-bold mt-3">Complexity Analysis:</h6>
              <p class="font-monospace text-indigo">${s.complexityAnalysis}</p>
              <h6 class="text-white fw-bold mt-3">Interview Tips:</h6>
              <p>${s.interviewTips}</p>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `,

  // 4. LeetCode Coding Workspace
  codingPractice: (questions) => `
    <div class="row g-4">
      <!-- Coding Questions Table -->
      <div class="col-md-4">
        <div class="glass-panel p-4 h-100 d-flex flex-column" style="max-height: 80vh;">
          <h5 class="text-white fw-bold mb-3">Coding Problem Set</h5>
          <div class="mb-3">
            <input type="text" id="practice-search-input" class="form-control glass-input" placeholder="Search title or company...">
          </div>
          <div class="flex-grow-1 overflow-y-auto" id="practice-problems-list">
            ${questions.map(q => `
              <div class="p-3 rounded border border-secondary mb-2 btn-select-question" style="cursor: pointer;" data-question-id="${q.id}" data-title="${q.title}" data-desc="${q.question}" data-constraints="${q.constraintsText}" data-hints="${q.hints}" data-solution="${q.referenceSolution}">
                <div class="d-flex align-items-center justify-content-between mb-1">
                  <span class="fw-bold text-white fs-7">${q.title}</span>
                  <span class="badge bg-${q.difficulty === 'EASY' ? 'success' : q.difficulty === 'MEDIUM' ? 'warning' : 'danger'}-subtle text-${q.difficulty === 'EASY' ? 'success' : q.difficulty === 'MEDIUM' ? 'warning' : 'danger'} fs-9">${q.difficulty}</span>
                </div>
                <div class="text-muted fs-8">${q.category} • ${q.companies}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
      <!-- Interactive Code Workspace Split Pane -->
      <div class="col-md-8">
        <div class="row g-3 h-100">
          <!-- Problem specs -->
          <div class="col-12 col-xl-6">
            <div class="glass-panel p-4 h-100 overflow-y-auto" style="max-height: 80vh;">
              <h4 class="text-white fw-bold mb-2" id="active-q-title">Select a Problem</h4>
              <span class="badge bg-indigo-subtle text-primary mb-4" id="active-q-category">Topic</span>
              
              <h6 class="text-white fw-bold mb-2">Problem Description:</h6>
              <p class="text-muted fs-7" id="active-q-desc">Click any problem card from the left panel to load its syntax and workspace.</p>
              
              <h6 class="text-white fw-bold mb-2">Constraints:</h6>
              <pre class="font-monospace text-muted fs-8 p-2 bg-dark rounded border border-secondary" id="active-q-constraints"></pre>
              
              <h6 class="text-white fw-bold mb-2">Hints:</h6>
              <p class="text-muted fs-7" id="active-q-hints"></p>
            </div>
          </div>
          <!-- Code editor -->
          <div class="col-12 col-xl-6">
            <div class="glass-panel p-4 h-100 d-flex flex-column" style="max-height: 80vh;">
              <h5 class="text-white fw-bold mb-3"><i class="fa-solid fa-code me-2"></i>Java Compiler IDE</h5>
              <div class="flex-grow-1 mb-3">
                <textarea id="code-editor-textarea" class="form-control font-monospace text-white bg-dark border-secondary p-3 h-100 fs-7" style="resize:none;" placeholder="public int solve(...) {\n    // Type code here...\n}"></textarea>
              </div>
              <div class="d-flex gap-2">
                <button class="btn btn-glass w-50 py-2 fs-7" id="btn-practice-hints"><i class="fa-solid fa-lightbulb text-warning me-1"></i> Show Hint</button>
                <button class="btn btn-premium w-50 py-2 fs-7" id="btn-practice-submit"><i class="fa-solid fa-play-circle text-success me-1"></i> Submit Solution</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,

  // 5. Mock Exams Platform
  mockExams: (tests, leaderboard) => `
    <div class="row g-4">
      <!-- Create Exam form -->
      <div class="col-lg-4">
        <div class="glass-panel p-4 h-100">
          <h5 class="text-white fw-bold mb-4">Start Timed Assessment</h5>
          <form id="mock-exam-form">
            <div class="mb-3">
              <label class="form-label text-muted fs-7">TOPIC CATEGORY</label>
              <select id="mock-category" class="form-select glass-input">
                <option value="DSA">DSA & Data Structures</option>
                <option value="Java">Java 21 & OOP</option>
                <option value="SQL">SQL & Database Schema</option>
                <option value="OS">Operating Systems</option>
                <option value="CN">Computer Networks</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label text-muted fs-7">EXAM DURATION</label>
              <select id="mock-duration" class="form-select glass-input">
                <option value="30">30 Minutes</option>
                <option value="60">60 Minutes</option>
                <option value="90">90 Minutes</option>
              </select>
            </div>
            <div class="mb-4">
              <label class="form-label text-muted fs-7">QUESTION COUNT</label>
              <select id="mock-qcount" class="form-select glass-input">
                <option value="15">15 Questions</option>
                <option value="30">30 Questions</option>
                <option value="50">50 Questions</option>
              </select>
            </div>
            <button type="submit" class="btn btn-premium w-100 py-3"><i class="fa-solid fa-stopwatch me-1"></i> Initialize Exam</button>
          </form>
        </div>
      </div>
      <!-- Leaderboard & Past attempts -->
      <div class="col-lg-8">
        <div class="glass-panel p-4 mb-4">
          <h5 class="text-white fw-bold mb-4"><i class="fa-solid fa-trophy text-warning me-2"></i>Global Leaderboard</h5>
          <div class="table-responsive">
            <table class="table table-dark table-hover align-middle m-0">
              <thead>
                <tr class="text-muted border-secondary-subtle">
                  <th scope="col">Rank</th>
                  <th scope="col">Candidate Name</th>
                  <th scope="col">Topic</th>
                  <th scope="col" class="text-end">Assessment Score</th>
                </tr>
              </thead>
              <tbody>
                ${leaderboard.map((l, idx) => `
                  <tr class="border-secondary-subtle fs-7">
                    <td><span class="badge ${idx === 0 ? 'bg-warning' : idx === 1 ? 'bg-light text-dark' : 'bg-secondary'} rounded-circle">${idx + 1}</span></td>
                    <td>${l.user.name}</td>
                    <td>${l.category}</td>
                    <td class="text-end fw-bold text-white">${l.score} pts</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,

  mockExamActive: (testId, category, duration, questionCount) => `
    <div class="glass-panel p-5 text-center">
      <div class="text-danger mb-4"><i class="fa-solid fa-hourglass-half display-3"></i></div>
      <h3 class="text-white fw-bold mb-2">Timed Assessment In Progress</h3>
      <p class="text-indigo fs-6">Category: ${category} • Questions: ${questionCount}</p>
      
      <div class="my-5 display-4 fw-extrabold text-white" id="mock-timer-display">
        ${duration}:00
      </div>

      <div class="bg-dark p-4 rounded max-w-sm mx-auto mb-4 border border-secondary">
        <p class="text-muted fs-7 mb-0">Closing or reloading this window will submit the assessment automatically.</p>
      </div>

      <button class="btn btn-premium px-5 py-3 fs-6" id="btn-submit-mock-exam" data-test-id="${testId}">Submit Assessment Paper</button>
    </div>
  `,

  // 6. Spaced Repetition (Flashcards)
  flashcards: (allCards) => `
    <div class="row g-4">
      <div class="col-lg-4">
        <div class="glass-panel p-4">
          <h5 class="text-white fw-bold mb-4">Add Study Flashcard</h5>
          <form id="flashcard-create-form">
            <div class="mb-3">
              <label class="form-label text-muted fs-7">QUESTION / KEYWORD</label>
              <textarea id="fc-question" class="form-control glass-input" rows="3" placeholder="e.g. What is polymorphism?" required></textarea>
            </div>
            <div class="mb-4">
              <label class="form-label text-muted fs-7">DETAILED ANSWER</label>
              <textarea id="fc-answer" class="form-control glass-input" rows="3" placeholder="e.g. Ability of object to take multiple forms..." required></textarea>
            </div>
            <button type="submit" class="btn btn-premium w-100 py-3">Add to Active Deck</button>
          </form>
        </div>
      </div>
      <!-- Flashcard Swiper Deck View -->
      <div class="col-lg-8">
        <div class="glass-panel p-5 text-center d-flex flex-column align-items-center justify-content-center min-vh-50" id="flashcard-deck-workspace">
          ${allCards.length === 0 ? `
            <i class="fa-solid fa-clone display-4 text-muted mb-3"></i>
            <h5 class="text-white fw-bold">Active Study Deck is Empty</h5>
            <p class="text-muted fs-7">Create flashcards on the left panel to begin spaced-repetition schedules.</p>
          ` : `
            <div class="flashcard-card-inner glass-panel p-5 mb-4 border-indigo position-relative" style="cursor:pointer; width:100%; max-width:500px; min-height: 250px;" id="active-flashcard-box">
              <div class="text-muted fs-8 mb-2">CLICK CARD TO REVEAL ANSWER</div>
              <h4 class="text-white fw-bold" id="flashcard-text-display">${allCards[0].question}</h4>
            </div>
            <div class="d-none justify-content-center gap-2 mb-4 w-100" id="fc-rating-buttons" style="max-width:500px;">
              <button class="btn btn-danger btn-sm w-20 py-2 fs-8 btn-rate-fc" data-id="${allCards[0].id}" data-rating="1">Forgot (1)</button>
              <button class="btn btn-warning btn-sm w-20 py-2 fs-8 btn-rate-fc" data-id="${allCards[0].id}" data-rating="3">Hard (3)</button>
              <button class="btn btn-indigo btn-sm w-20 py-2 fs-8 btn-rate-fc" data-id="${allCards[0].id}" data-rating="4">Good (4)</button>
              <button class="btn btn-success btn-sm w-20 py-2 fs-8 btn-rate-fc" data-id="${allCards[0].id}" data-rating="5">Easy (5)</button>
            </div>
          `}
        </div>
      </div>
    </div>
  `,

  // 7. Community Discussion Forum
  community: (posts) => `
    <div class="row g-4">
      <div class="col-lg-4">
        <div class="glass-panel p-4">
          <h5 class="text-white fw-bold mb-4">Start Discussion Thread</h5>
          <form id="forum-post-form">
            <div class="mb-3">
              <label class="form-label text-muted fs-7">TOPIC TITLE</label>
              <input type="text" id="forum-title" class="form-control glass-input" placeholder="e.g. My Meta E5 Interview Experience" required>
            </div>
            <div class="mb-3">
              <label class="form-label text-muted fs-7">FORUM CATEGORY</label>
              <select id="forum-category" class="form-select glass-input">
                <option value="GENERAL">General Discussions</option>
                <option value="INTERVIEWS">Interview Experiences</option>
                <option value="CODING">Coding Questions</option>
                <option value="COURSES">LMS & Tutorials</option>
              </select>
            </div>
            <div class="mb-4">
              <label class="form-label text-muted fs-7">CONTENT BODY</label>
              <textarea id="forum-content" class="form-control glass-input" rows="4" placeholder="Write discussion details..." required></textarea>
            </div>
            <button type="submit" class="btn btn-premium w-100 py-3">Publish Thread</button>
          </form>
        </div>
      </div>
      <!-- Threads List -->
      <div class="col-lg-8">
        <div class="glass-panel p-4 d-flex flex-column gap-3 overflow-y-auto" style="max-height: 80vh;" id="forum-posts-container">
          ${posts.map(p => `
            <div class="p-4 rounded border border-secondary">
              <div class="d-flex align-items-center justify-content-between mb-2">
                <span class="badge bg-indigo-subtle text-primary fs-8">${p.category}</span>
                <span class="text-muted fs-8">${p.createdAt.substring(0, 10)}</span>
              </div>
              <h5 class="text-white fw-bold mb-2">${p.title}</h5>
              <p class="text-muted fs-7 mb-3">${p.content}</p>
              <div class="d-flex align-items-center gap-3 text-muted fs-8">
                <span><i class="fa-regular fa-thumbs-up me-1"></i>${p.likesCount} Likes</span>
                <span><i class="fa-regular fa-comment me-1"></i>${p.comments ? p.comments.length : 0} Replies</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `,

  // 8. Study Notes Folders & Markdown
  notes: (noteList, folders) => `
    <div class="row g-4">
      <!-- Folder Directories list -->
      <div class="col-md-3">
        <div class="glass-panel p-4 h-100">
          <h5 class="text-white fw-bold mb-4">Note Folders</h5>
          <div class="mb-3">
            <button class="btn btn-premium w-100 btn-sm" id="btn-create-folder"><i class="fa-solid fa-plus-circle me-1"></i> New Folder</button>
          </div>
          <div class="list-group list-group-flush" id="folders-mount-list">
            <button class="list-group-item list-group-item-action bg-transparent text-white border-secondary fs-7 py-3 btn-select-folder active" data-folder-id="">
              <i class="fa-solid fa-folder-open text-indigo me-2"></i> All Notes
            </button>
            ${folders.map(f => `
              <button class="list-group-item list-group-item-action bg-transparent text-white border-secondary fs-7 py-3 btn-select-folder" data-folder-id="${f.id}">
                <i class="fa-solid fa-folder text-indigo me-2"></i> ${f.name}
              </button>
            `).join('')}
          </div>
        </div>
      </div>
      <!-- Notes list and Editor -->
      <div class="col-md-9">
        <div class="row g-3">
          <div class="col-lg-4">
            <div class="glass-panel p-4 overflow-y-auto" style="max-height: 70vh;" id="notes-cards-container">
              <button class="btn btn-glass w-100 mb-3 py-2 btn-sm" id="btn-new-note"><i class="fa-solid fa-file-signature me-1 text-indigo"></i> Compose Note</button>
              <div class="d-flex flex-column gap-2" id="notes-cards-list">
                ${noteList.map(n => `
                  <div class="p-3 rounded border border-secondary note-preview-card" style="cursor:pointer;" data-id="${n.id}" data-title="${n.title}" data-content="${n.content}" data-tags="${n.tags || ''}">
                    <h6 class="text-white fw-bold mb-1">${n.title}</h6>
                    <div class="text-muted fs-8">${n.updatedAt ? n.updatedAt.substring(0,10) : 'Just now'}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
          <div class="col-lg-8">
            <div class="glass-panel p-4 d-flex flex-column" style="min-height: 500px;">
              <div class="mb-3">
                <input type="text" id="note-editor-title" class="form-control glass-input fw-bold fs-5 text-white" placeholder="Document Title...">
              </div>
              <div class="flex-grow-1 mb-3">
                <textarea id="note-editor-content" class="form-control font-monospace text-white bg-dark border-secondary p-3 h-100 fs-7" style="resize:none; min-height: 350px;" placeholder="# Document Content..."></textarea>
              </div>
              <div class="row align-items-center">
                <div class="col-8">
                  <input type="text" id="note-editor-tags" class="form-control glass-input fs-8" placeholder="Tags (comma separated)">
                </div>
                <div class="col-4 text-end">
                  <button class="btn btn-premium w-100 py-2 fs-7" id="btn-save-note">Save Document</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,

  // 9. Placement Tracker Kanban Pipeline
  placement: (apps) => {
    const stages = ["APPLIED", "PHONE_SCREEN", "INTERVIEWING", "OFFER", "REJECTED"];
    return `
      <div class="row g-3 overflow-x-auto pb-4 flex-row flex-nowrap" style="min-height: 60vh;">
        ${stages.map(stage => {
          const stageApps = apps.filter(a => a.status === stage);
          return `
            <div class="col-12 col-md-4 col-lg-3" style="min-width: 280px;">
              <div class="glass-panel p-3 h-100 d-flex flex-column">
                <div class="d-flex align-items-center justify-content-between mb-3 border-bottom border-secondary pb-2">
                  <span class="fw-bold text-white fs-7"><i class="fa-solid fa-circle-dot me-2 text-indigo"></i>${stage.replace('_', ' ')}</span>
                  <span class="badge bg-indigo-subtle text-primary fs-8">${stageApps.length}</span>
                </div>
                <div class="flex-grow-1 d-flex flex-column gap-2 overflow-y-auto" style="max-height: 50vh;">
                  ${stageApps.map(a => `
                    <div class="p-3 rounded border border-secondary bg-dark-subtle" style="cursor:grab;">
                      <h6 class="text-white fw-bold mb-1">${a.company}</h6>
                      <div class="text-muted fs-8 mb-2">${a.role}</div>
                      <div class="d-flex align-items-center justify-content-between fs-9 text-muted">
                        <span><i class="fa-solid fa-clock me-1"></i>${a.appliedDate}</span>
                        <div class="dropdown">
                          <button class="btn btn-link text-muted p-0 dropdown-toggle fs-9" type="button" data-bs-toggle="dropdown">Move</button>
                          <ul class="dropdown-menu dropdown-menu-end glass-panel fs-8">
                            ${stages.filter(s => s !== stage).map(s => `
                              <li><button class="dropdown-item text-white btn-move-app" data-id="${a.id}" data-stage="${s}">${s.replace('_', ' ')}</button></li>
                            `).join('')}
                          </ul>
                        </div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  // 10. AI Career Assistant Hub
  aiAssistant: () => `
    <div class="glass-panel p-4 mb-4">
      <h4 class="text-white fw-bold mb-2">Robotic Placement Diagnostics</h4>
      <p class="text-muted">Analyze resume ATS compliance, track weak topic dependencies, generate study schedules, and compile company-specific interview prompts.</p>
    </div>
    <div class="row g-4">
      <!-- AI Options Tabs -->
      <div class="col-md-4 col-lg-3">
        <div class="glass-panel p-3">
          <div class="list-group list-group-flush" id="ai-tabs-list">
            <button class="list-group-item list-group-item-action bg-transparent text-white border-secondary fs-7 py-3 btn-ai-tab active" data-tab="weak">
              <i class="fa-solid fa-brain text-danger me-2"></i> Weak Topic Detector
            </button>
            <button class="list-group-item list-group-item-action bg-transparent text-white border-secondary fs-7 py-3 btn-ai-tab" data-tab="study">
              <i class="fa-solid fa-calendar-alt text-warning me-2"></i> Custom Study Planner
            </button>
            <button class="list-group-item list-group-item-action bg-transparent text-white border-secondary fs-7 py-3 btn-ai-tab" data-tab="resume">
              <i class="fa-solid fa-file-shield text-info me-2"></i> ATS Resume Audit
            </button>
            <button class="list-group-item list-group-item-action bg-transparent text-white border-secondary fs-7 py-3 btn-ai-tab" data-tab="interview">
              <i class="fa-solid fa-briefcase text-success me-2"></i> Interview Guide Generator
            </button>
          </div>
        </div>
      </div>
      <!-- Display Panel -->
      <div class="col-md-8 col-lg-9">
        <div class="glass-panel p-4" id="ai-workspace-mount" style="min-height: 350px;">
          <!-- Weak Topic Detector mounted by default -->
          <div class="text-center py-5"><div class="spinner-border text-primary"></div></div>
        </div>
      </div>
    </div>
  `
};

