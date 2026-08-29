// components.js - View Templates for PrepSpace SaaS Application

const components = {
  // Public SaaS Landing Page
  landing: () => `
    <header>
      <nav class="navbar navbar-expand-lg navbar-dark bg-transparent py-4">
        <div class="container">
          <a class="navbar-brand d-flex align-items-center gap-2 text-decoration-none" href="#/">
            <img src="assets/prepspace_logo.svg" alt="PrepSpace Logo" class="brand-logo-img" style="width: 42px; height: 42px; object-fit: contain;">
            <div class="d-flex flex-column text-start">
              <span class="fw-extrabold fs-4 text-white lh-1">PrepSpace</span>
              <span class="text-primary fw-bold" style="font-size: 0.68rem; letter-spacing: 0.8px; margin-top: 2px;">(stream-in)</span>
            </div>
          </a>
          <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navMenu">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center gap-1">
              <li class="nav-item"><a class="nav-link px-3" href="#features">Features</a></li>
              <li class="nav-item"><a class="nav-link px-3" href="#pricing">Pricing</a></li>
              <li class="nav-item"><a class="nav-link px-3" href="/about">About</a></li>
              <li class="nav-item"><a class="nav-link px-3" href="/privacy">Privacy</a></li>
              <li class="nav-item"><a class="nav-link px-3" href="/terms">Terms</a></li>
              <li class="nav-item ms-lg-3">
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
    </header>

    <main>
      <!-- Features Section -->
      <section id="features" class="container py-5">
        <div class="text-center mb-5">
          <h2 class="display-5 fw-bold text-white mb-3">Engineered for High-Performance Candidates</h2>
          <p class="text-muted fs-5">Everything you need to level up and land your dream offer.</p>
        </div>
        <div class="row g-4 mt-2">
          <div class="col-md-4">
            <div class="glass-panel p-4 h-100">
              <div class="feature-icon mb-3"><i class="fa-solid fa-chart-line fs-2 text-primary"></i></div>
              <h3 class="text-white h5">Unified Dashboard Analytics</h3>
              <p class="text-muted">Interactive charts mapping study hours, problem difficulties, streak data, and target completion counts.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="glass-panel p-4 h-100">
              <div class="feature-icon mb-3"><i class="fa-solid fa-brain fs-2 text-secondary"></i></div>
              <h3 class="text-white h5">AI Feedback Engine</h3>
              <p class="text-muted">Simulated evaluation feedback and readiness metrics outlining your technical gaps and soft skill adjustments.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="glass-panel p-4 h-100">
              <div class="feature-icon mb-3"><i class="fa-solid fa-kanban fs-2 text-success"></i></div>
              <h3 class="text-white h5">Kanban Job Tracker</h3>
              <p class="text-muted">Organize job pipelines, record scheduling dates, and trace outcomes on an interactive board layout.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Pricing Section -->
      <section id="pricing" class="container py-5">
        <div class="text-center mb-5">
          <h2 class="display-5 fw-bold text-white mb-3">Flexible Plans for Every Developer</h2>
          <p class="text-muted fs-5">Choose the pace that matches your target timelines.</p>
        </div>
        <div class="row g-4 justify-content-center mt-2">
          <div class="col-md-5 col-lg-4">
            <div class="glass-panel p-4 h-100 text-center">
              <h3 class="text-white h4">PrepFree</h3>
              <p class="text-muted">Perfect for getting started</p>
              <div class="my-4"><span class="display-4 fw-bold text-white">₹0</span><span class="text-muted">/free</span></div>
              <ul class="list-unstyled text-start mb-5 text-muted">
                <li class="mb-2"><i class="fa-solid fa-check text-success me-2"></i> Access to Core Question Bank</li>
                <li class="mb-2"><i class="fa-solid fa-check text-success me-2"></i> Log Solved Coding Problems</li>
                <li class="mb-2"><i class="fa-solid fa-check text-success me-2"></i> Standard Kanban Tracker</li>
              </ul>
              <a href="#/register" class="btn btn-glass w-100 py-3">Register Free Account</a>
            </div>
          </div>
          <div class="col-md-5 col-lg-4">
            <div class="glass-panel p-4 h-100 text-center border-primary" style="box-shadow: 0 0 25px var(--accent-glow);">
              <div class="badge bg-primary bg-opacity-25 text-primary border border-primary-subtle px-3 py-1 mb-2">MOST POPULAR</div>
              <h3 class="text-white h4">PrepPro</h3>
              <p class="text-indigo">Recommended for Active Jobseekers</p>
              <div class="my-4"><span class="display-4 fw-bold text-white">₹99</span><span class="text-muted">/one-time lifetime</span></div>
              <ul class="list-unstyled text-start mb-5 text-muted">
                <li class="mb-2"><i class="fa-solid fa-check text-success me-2"></i> <strong>AI Career Assistant</strong> (ATS Audit, Planner)</li>
                <li class="mb-2"><i class="fa-solid fa-check text-success me-2"></i> <strong>Unlimited Mock Assessments & 50-MCQs</strong></li>
                <li class="mb-2"><i class="fa-solid fa-check text-success me-2"></i> <strong>Company Interview Guides & Prompts</strong></li>
                <li class="mb-2"><i class="fa-solid fa-check text-success me-2"></i> <strong>Export Excel/PDF Progress Reports</strong></li>
                <li class="mb-2"><i class="fa-solid fa-check text-success me-2"></i> Priority Community & Leaderboard Ranks</li>
              </ul>
              <a href="#/register" class="btn btn-premium w-100 py-3 fw-bold"><i class="fa-solid fa-gem me-1"></i> Get PrepPro Access</a>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Google AdSense Multiplex Ad Unit -->
    <div class="container my-5">
      <div class="glass-panel p-4">
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-format="autorelaxed"
             data-ad-client="ca-pub-4662205173096609"
             data-ad-slot="3928140249"></ins>
      </div>
    </div>    <!-- Footer -->
    <footer class="py-5 text-center border-top border-secondary-subtle border-opacity-10 mt-5">
      <div class="container">
        <div class="d-flex justify-content-center align-items-center gap-2 mb-2">
          <img src="assets/prepspace_logo.svg" alt="PrepSpace Logo" style="width: 32px; height: 32px; object-fit: contain;">
          <div class="d-flex flex-column text-start">
            <span class="text-white fw-bold fs-6 lh-1">PrepSpace</span>
            <span class="text-primary fw-semibold" style="font-size: 0.65rem; letter-spacing: 0.5px;">(stream-in)</span>
          </div>
        </div>
        <p class="text-muted small mb-3">&copy; 2026 PrepSpace (stream-in). Developed by Nagesh Methre. All rights reserved.</p>
        <div class="d-flex justify-content-center gap-3 text-muted small">
          <a href="/about" class="text-muted text-decoration-none">About</a>
          <span>•</span>
          <a href="/privacy" class="text-muted text-decoration-none">Privacy Policy</a>
          <span>•</span>
          <a href="/terms" class="text-muted text-decoration-none">Terms of Service</a>
        </div>
      </div>
    </footer>
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

            <div class="my-3 d-flex align-items-center">
              <hr class="flex-grow-1 border-secondary-subtle">
              <span class="px-2 text-muted small">OR</span>
              <hr class="flex-grow-1 border-secondary-subtle">
            </div>
            <div id="google-login-btn" class="w-100 d-flex justify-content-center mb-3"></div>
            
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
                <label class="form-label text-muted fs-7">PASSWORD (Min. 6 chars, A-Z, a-z, 0-9)</label>
                <input type="password" id="register-password" class="form-control glass-input" placeholder="••••••••" minlength="6" required>
                <div class="form-text text-muted" style="font-size:0.7rem;">Must include uppercase, lowercase, and a number</div>
              </div>
              <button type="submit" class="btn btn-premium w-100 py-2 fs-6 mb-3">Create Account</button>
            </form>

            <div class="my-3 d-flex align-items-center">
              <hr class="flex-grow-1 border-secondary-subtle">
              <span class="px-2 text-muted small">OR</span>
              <hr class="flex-grow-1 border-secondary-subtle">
            </div>
            <div id="google-login-btn" class="w-100 d-flex justify-content-center mb-3"></div>
            
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
        <div class="p-4 border-bottom border-secondary-subtle d-flex align-items-center justify-content-between">
          <a class="navbar-brand d-flex align-items-center brand-text text-decoration-none" href="#/dashboard">
            <img src="assets/prepspace_logo.svg" alt="PrepSpace Logo" class="me-2" style="width: 38px; height: 38px; object-fit: contain;">
            <div class="d-flex flex-column text-start brand-name">
              <span class="fw-extrabold fs-5 text-white lh-1">PrepSpace</span>
              <span class="text-primary fw-bold" style="font-size: 0.65rem; letter-spacing: 0.8px; margin-top: 2px;">(stream-in)</span>
            </div>
          </a>
          <button id="sidebar-collapse-btn" class="btn btn-glass btn-sm border-0 rounded-circle text-white d-none d-lg-flex align-items-center justify-content-center" style="width: 26px; height: 26px; padding: 0;">
            <i class="fa-solid fa-chevron-left" id="collapse-icon" style="font-size: 0.8rem;"></i>
          </button>
          <button id="sidebar-close-btn" class="btn btn-glass btn-sm border-0 rounded-circle text-white d-flex d-lg-none align-items-center justify-content-center" style="width: 26px; height: 26px; padding: 0;">
            <i class="fa-solid fa-xmark" style="font-size: 0.9rem;"></i>
          </button>
        </div>
        
        <div class="flex-grow-1 py-4 overflow-y-auto">
          <a href="#/dashboard" class="sidebar-link active"><i class="fa-solid fa-chart-line"></i> <span>Dashboard</span></a>
          <a href="#/studyplanner" class="sidebar-link"><i class="fa-solid fa-calendar-check"></i> <span>Study Planner</span></a>
          <a href="#/courses" class="sidebar-link"><i class="fa-solid fa-graduation-cap text-info"></i> <span>LMS Courses</span></a>
          <a href="#/certificates" class="sidebar-link"><i class="fa-solid fa-award text-warning"></i> <span>Certificates</span></a>
          <a href="#/dsa-roadmap" class="sidebar-link"><i class="fa-solid fa-route text-success"></i> <span>DSA Roadmap</span></a>
          <a href="#/coding-practice" class="sidebar-link"><i class="fa-solid fa-code text-indigo"></i> <span>Coding Practice</span></a>
          <a href="#/experiences" class="sidebar-link"><i class="fa-solid fa-user-tie text-secondary"></i> <span>Experiences</span></a>
          <a href="#/mock-exams" class="sidebar-link"><i class="fa-solid fa-stopwatch text-danger"></i> <span>Mock Exams</span></a>
          <a href="#/flashcards" class="sidebar-link"><i class="fa-solid fa-clone text-primary"></i> <span>Flashcards</span></a>
          <a href="#/community" class="sidebar-link"><i class="fa-solid fa-comments text-info"></i> <span>Community</span></a>
          <a href="#/notes" class="sidebar-link"><i class="fa-solid fa-note-sticky text-warning"></i> <span>Study Notes</span></a>
          <a href="#/placement" class="sidebar-link"><i class="fa-solid fa-briefcase text-success"></i> <span>Placements</span></a>
          <a href="#/ai-assistant" class="sidebar-link"><i class="fa-solid fa-robot text-primary"></i> <span>AI Assistant</span></a>
          <a href="#/calendar" class="sidebar-link"><i class="fa-solid fa-calendar-days text-muted"></i> <span>Calendar</span></a>
          <a href="#/reports" class="sidebar-link"><i class="fa-solid fa-file-invoice text-muted"></i> <span>Reports</span></a>
          <a href="#/profile" class="sidebar-link"><i class="fa-solid fa-user-gear"></i> <span>Settings</span></a>
          <a href="#/billing" class="sidebar-link"><i class="fa-solid fa-credit-card text-success"></i> <span>Billing</span></a>
          <a href="#/desktop-client" class="sidebar-link"><i class="fa-solid fa-desktop text-indigo"></i> <span>Desktop Client</span></a>
          ${isAdmin ? `<a href="#/admin" class="sidebar-link text-warning-emphasis"><i class="fa-solid fa-shield-halved text-warning"></i> <span>Admin Panel</span></a>` : ''}
        </div>
        
        <div class="p-3 border-top border-secondary-subtle mt-auto">
          <button id="logout-btn" class="btn btn-glass w-100 py-2 mb-2"><i class="fa-solid fa-right-from-bracket me-2 text-danger"></i> <span>Logout</span></button>
          <div class="d-flex justify-content-center gap-2 text-center" style="font-size: 0.7rem; opacity: 0.6;">
            <a href="/about" target="_blank" class="text-muted text-decoration-none">About</a>
            <span>•</span>
            <a href="/privacy" target="_blank" class="text-muted text-decoration-none">Privacy</a>
            <span>•</span>
            <a href="/terms" target="_blank" class="text-muted text-decoration-none">Terms</a>
          </div>
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

    <!-- AdSense Dashboard Multiplex Ad Unit -->
    <div class="row g-4 mt-4">
      <div class="col-12">
        <div class="glass-panel p-4">
          <ins class="adsbygoogle"
               style="display:block"
               data-ad-format="autorelaxed"
               data-ad-client="ca-pub-4662205173096609"
               data-ad-slot="3928140249"></ins>
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
          <div class="list-group list-group-flush" id="settings-tabs-list" style="max-height: 550px; overflow-y: auto;">
            <button class="list-group-item list-group-item-action bg-transparent text-white border-secondary fs-7 py-2 btn-settings-tab active" data-tab="profile">
              <i class="fa-solid fa-circle-user me-2 text-indigo"></i> Profile Settings
            </button>
            <button class="list-group-item list-group-item-action bg-transparent text-white border-secondary fs-7 py-2 btn-settings-tab" data-tab="security">
              <i class="fa-solid fa-key me-2 text-success"></i> Security Settings
            </button>
            <button class="list-group-item list-group-item-action bg-transparent text-white border-secondary fs-7 py-2 btn-settings-tab" data-tab="appearance">
              <i class="fa-solid fa-palette me-2 text-warning"></i> Appearance Theme
            </button>
            <button class="list-group-item list-group-item-action bg-transparent text-white border-secondary fs-7 py-2 btn-settings-tab" data-tab="notifications">
              <i class="fa-solid fa-bell me-2 text-danger"></i> Notification Settings
            </button>
            <button class="list-group-item list-group-item-action bg-transparent text-white border-secondary fs-7 py-2 btn-settings-tab" data-tab="language">
              <i class="fa-solid fa-globe me-2 text-info"></i> Language & Region
            </button>
            <button class="list-group-item list-group-item-action bg-transparent text-white border-secondary fs-7 py-2 btn-settings-tab" data-tab="learning">
              <i class="fa-solid fa-book-open me-2 text-primary"></i> Learning Preferences
            </button>
            <button class="list-group-item list-group-item-action bg-transparent text-white border-secondary fs-7 py-2 btn-settings-tab" data-tab="career">
              <i class="fa-solid fa-briefcase me-2 text-success"></i> Career Preferences
            </button>
            <button class="list-group-item list-group-item-action bg-transparent text-white border-secondary fs-7 py-2 btn-settings-tab" data-tab="dashboard">
              <i class="fa-solid fa-chart-line me-2 text-indigo"></i> Dashboard Widgets
            </button>
            <button class="list-group-item list-group-item-action bg-transparent text-white border-secondary fs-7 py-2 btn-settings-tab" data-tab="connected">
              <i class="fa-solid fa-link me-2 text-primary"></i> Connected Accounts
            </button>
            <button class="list-group-item list-group-item-action bg-transparent text-white border-secondary fs-7 py-2 btn-settings-tab" data-tab="privacy">
              <i class="fa-solid fa-shield-halved me-2 text-danger"></i> Data & Privacy
            </button>
            <button class="list-group-item list-group-item-action bg-transparent text-white border-secondary fs-7 py-2 btn-settings-tab" data-tab="devices">
              <i class="fa-solid fa-desktop me-2 text-info"></i> Devices & Sessions
            </button>
            <button class="list-group-item list-group-item-action bg-transparent text-white border-secondary fs-7 py-2 btn-settings-tab" data-tab="importexport">
              <i class="fa-solid fa-file-export me-2 text-muted"></i> Import / Export
            </button>
            <button class="list-group-item list-group-item-action bg-transparent text-white border-secondary fs-7 py-2 btn-settings-tab" data-tab="developer">
              <i class="fa-solid fa-code me-2 text-muted"></i> Developer Options
            </button>
            <button class="list-group-item list-group-item-action bg-transparent text-white border-secondary fs-7 py-2 btn-settings-tab" data-tab="about">
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
    <h5 class="text-white fw-bold mb-3">👤 Profile Information</h5>
    <div class="mb-4 text-center position-relative rounded overflow-hidden" style="height: 120px; background: linear-gradient(135deg, var(--primary-color, #6366f1), #818cf8); border: 1px solid rgba(255,255,255,0.1);">
      ${s.coverImageUrl ? `<img src="${s.coverImageUrl}" class="w-100 h-100 object-fit-cover">` : ''}
      <div class="position-absolute bottom-0 start-0 p-3 text-start d-flex align-items-center gap-3 w-100 bg-dark bg-opacity-50">
        <div class="rounded-circle border border-2 border-white overflow-hidden bg-secondary d-flex align-items-center justify-content-center" style="width: 50px; height: 50px;">
          <i class="fa-solid fa-user text-white fs-4"></i>
        </div>
        <div>
          <h6 class="text-white fw-bold m-0">${user.name}</h6>
          <small class="text-white-50 fs-8">@${user.email.split('@')[0]}</small>
        </div>
      </div>
    </div>
    
    <form id="settings-profile-form">
      <div class="row g-3 mb-3">
        <div class="col-md-6">
          <label class="form-label text-muted fs-7">FULL NAME</label>
          <input type="text" id="set-name" class="form-control glass-input" value="${user.name}" required>
        </div>
        <div class="col-md-6">
          <label class="form-label text-muted fs-7">USERNAME / HANDLE</label>
          <input type="text" id="set-username" class="form-control glass-input" value="${user.email.split('@')[0]}" disabled>
        </div>
      </div>
      <div class="row g-3 mb-3">
        <div class="col-md-6">
          <label class="form-label text-muted fs-7">EMAIL ADDRESS</label>
          <input type="email" id="set-email" class="form-control glass-input" value="${user.email}" disabled>
        </div>
        <div class="col-md-6">
          <label class="form-label text-muted fs-7">BIOGRAPHY / MOTTO</label>
          <input type="text" id="set-bio" class="form-control glass-input" value="${s.bio || ''}" placeholder="Short bio...">
        </div>
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
      <div class="row g-3 mb-3">
        <div class="col-md-6">
          <label class="form-label text-muted fs-7">LOCATION</label>
          <input type="text" id="set-location" class="form-control glass-input" value="${s.location || ''}" placeholder="e.g. San Francisco, CA">
        </div>
        <div class="col-md-6">
          <label class="form-label text-muted fs-7">TIMEZONE</label>
          <input type="text" id="set-timezone" class="form-control glass-input" value="${s.timezone || 'UTC+5:30'}">
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

  settingsSecurity: (s) => `
    <h5 class="text-white fw-bold mb-4">🔐 Access & Security Controls</h5>
    <form id="settings-security-form" class="mb-4">
      <div class="mb-3">
        <label class="form-label text-muted fs-7">NEW ACCOUNT PASSWORD</label>
        <input type="password" id="set-newpassword" class="form-control glass-input" placeholder="Min. 6 chars (Upper/Lower/Num)">
      </div>
      <div class="mb-3">
        <label class="form-label text-muted fs-7">CONFIRM NEW PASSWORD</label>
        <input type="password" id="set-confirmpassword" class="form-control glass-input" placeholder="••••••••">
      </div>
      <div class="mb-3">
        <label class="form-label text-muted fs-7">ACCOUNT RECOVERY EMAIL</label>
        <input type="email" id="set-recoveryemail" class="form-control glass-input" value="${s.recoveryEmail || ''}" placeholder="backup@recovery.com">
      </div>
      <div class="form-check form-switch mb-4">
        <input class="form-check-input" type="checkbox" id="set-enable2fa" ${s.enable2fa ? 'checked' : ''}>
        <label class="form-check-label text-muted fs-7" for="set-enable2fa">Enable 2FA Authentication (Forces Email Security OTP check on every login)</label>
      </div>
      <button type="submit" class="btn btn-premium w-100 py-2">Update Security Settings</button>
    </form>

    <div class="glass-panel p-3 border-danger-subtle">
      <h6 class="text-white fw-bold mb-2 fs-7 text-danger"><i class="fa-solid fa-triangle-exclamation me-1"></i>Security Guard Monitor</h6>
      <p class="text-muted fs-8 mb-2">Failed Login Attempts: <span class="badge bg-danger">0</span></p>
      <p class="text-muted fs-8 mb-0">Status: <span class="text-success">Active Secure Session</span></p>
    </div>
  `,

  settingsAppearance: (s) => `
    <h5 class="text-white fw-bold mb-4">🎨 Appearance & Styling Layouts</h5>
    <form id="settings-appearance-form">
      <div class="mb-3">
        <label class="form-label text-muted fs-7">THEME SELECTOR</label>
        <select id="set-theme" class="form-select glass-input">
          <option value="dark" ${s.theme === 'dark' ? 'selected' : ''}>Dark Space Theme (Recommended)</option>
          <option value="light" ${s.theme === 'light' ? 'selected' : ''}>Light Desktop Theme</option>
          <option value="reading" ${s.theme === 'reading' ? 'selected' : ''}>Reading Mode (Sepia)</option>
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
      <div class="form-check form-switch mb-2">
        <input class="form-check-input" type="checkbox" id="set-compact" ${s.compactMode ? 'checked' : ''}>
        <label class="form-check-label text-muted fs-7" for="set-compact">Enable Compact layout spaces (Minimizes margins)</label>
      </div>
      <div class="form-check form-switch mb-2">
        <input class="form-check-input" type="checkbox" id="set-dyslexia" ${s.accessibilityDyslexia ? 'checked' : ''}>
        <label class="form-check-label text-muted fs-7" for="set-dyslexia">Enable Dyslexia-Friendly Font (Accessibility)</label>
      </div>
      <div class="form-check form-switch mb-4">
        <input class="form-check-input" type="checkbox" id="set-reducemotion" ${s.accessibilityReduceMotion ? 'checked' : ''}>
        <label class="form-check-label text-muted fs-7" for="set-reducemotion">Reduce UI Animations & Motion (Accessibility)</label>
      </div>
      <button type="submit" class="btn btn-premium w-100 py-2">Apply Styling Metrics</button>
    </form>
  `,

  settingsNotifications: (s) => `
    <h5 class="text-white fw-bold mb-4">🔔 Notification Channels</h5>
    <form id="settings-notifications-form">
      <h6 class="text-white fw-bold mb-3 fs-7">EMAIL CHANNELS</h6>
      <div class="form-check mb-2">
        <input class="form-check-input" type="checkbox" id="set-emailreminder" ${s.emailStudyReminder ? 'checked' : ''}>
        <label class="form-check-label text-muted fs-7" for="set-emailreminder">Daily Study Reminder notifications</label>
      </div>
      <div class="form-check mb-4">
        <input class="form-check-input" type="checkbox" id="set-emailreport" ${s.emailWeeklyReport ? 'checked' : ''}>
        <label class="form-check-label text-muted fs-7" for="set-emailreport">Weekly preparation overview metrics email</label>
      </div>

      <h6 class="text-white fw-bold mb-3 fs-7">PLATFORM WEB CHANNELS</h6>
      <div class="form-check mb-2">
        <input class="form-check-input" type="checkbox" id="set-toast" ${s.toastNotifications ? 'checked' : ''}>
        <label class="form-check-label text-muted fs-7" for="set-toast">Show on-screen Toast alerts</label>
      </div>
      <div class="form-check mb-4">
        <input class="form-check-input" type="checkbox" id="set-achieve" ${s.achievementNotifications ? 'checked' : ''}>
        <label class="form-check-label text-muted fs-7" for="set-achieve">Notify when badges or XP milestones are unlocked</label>
      </div>
      <button type="submit" class="btn btn-premium w-100 py-2">Save Mappings</button>
    </form>
  `,

  settingsLanguage: (s) => `
    <h5 class="text-white fw-bold mb-4">🌐 Language & Regional Settings</h5>
    <form id="settings-language-form">
      <div class="row g-3 mb-3">
        <div class="col-md-6">
          <label class="form-label text-muted fs-7">SYSTEM LANGUAGE</label>
          <select id="set-syslanguage" class="form-select glass-input">
            <option value="en" ${s.language === 'en' ? 'selected' : ''}>English (United States)</option>
            <option value="es" ${s.language === 'es' ? 'selected' : ''}>Español (España)</option>
            <option value="fr" ${s.language === 'fr' ? 'selected' : ''}>Français (France)</option>
          </select>
        </div>
        <div class="col-md-6">
          <label class="form-label text-muted fs-7">COUNTRY / REGION</label>
          <select id="set-country" class="form-select glass-input">
            <option value="US" ${s.country === 'US' ? 'selected' : ''}>United States</option>
            <option value="IN" ${s.country === 'IN' ? 'selected' : ''}>India</option>
            <option value="GB" ${s.country === 'GB' ? 'selected' : ''}>United Kingdom</option>
          </select>
        </div>
      </div>
      <div class="row g-3 mb-3">
        <div class="col-md-6">
          <label class="form-label text-muted fs-7">DATE FORMAT</label>
          <select id="set-dateformat" class="form-select glass-input">
            <option value="YYYY-MM-DD" ${s.dateFormat === 'YYYY-MM-DD' ? 'selected' : ''}>YYYY-MM-DD (Standard)</option>
            <option value="DD/MM/YYYY" ${s.dateFormat === 'DD/MM/YYYY' ? 'selected' : ''}>DD/MM/YYYY</option>
            <option value="MM/DD/YYYY" ${s.dateFormat === 'MM/DD/YYYY' ? 'selected' : ''}>MM/DD/YYYY</option>
          </select>
        </div>
        <div class="col-md-6">
          <label class="form-label text-muted fs-7">TIME FORMAT</label>
          <select id="set-timeformat" class="form-select glass-input">
            <option value="24h" ${s.timeFormat === '24h' ? 'selected' : ''}>24-Hour clock (e.g. 14:00)</option>
            <option value="12h" ${s.timeFormat === '12h' ? 'selected' : ''}>12-Hour clock (e.g. 2:00 PM)</option>
          </select>
        </div>
      </div>
      <div class="mb-4">
        <label class="form-label text-muted fs-7">FIRST DAY OF THE WEEK</label>
        <select id="set-firstday" class="form-select glass-input">
          <option value="Monday" ${s.firstDayOfWeek === 'Monday' ? 'selected' : ''}>Monday</option>
          <option value="Sunday" ${s.firstDayOfWeek === 'Sunday' ? 'selected' : ''}>Sunday</option>
        </select>
      </div>
      <button type="submit" class="btn btn-premium w-100 py-2">Save Language Options</button>
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
      <div class="row g-3 mb-3">
        <div class="col-md-6">
          <label class="form-label text-muted fs-7">DAILY QUESTIONS TARGET</label>
          <input type="number" id="set-dailygoal" class="form-control glass-input" value="${s.dailyQuestionsGoal || 5}" min="1" max="25">
        </div>
        <div class="col-md-6">
          <label class="form-label text-muted fs-7">PREFERRED PROBLEM DIFFICULTY</label>
          <select id="set-diff" class="form-select glass-input">
            <option value="Easy" ${s.preferredDifficulty === 'Easy' ? 'selected' : ''}>Easy Only</option>
            <option value="Medium" ${s.preferredDifficulty === 'Medium' ? 'selected' : ''}>Medium Only</option>
            <option value="Hard" ${s.preferredDifficulty === 'Hard' ? 'selected' : ''}>Hard Only</option>
            <option value="Mixed" ${s.preferredDifficulty === 'Mixed' ? 'selected' : ''}>Mixed (Standard)</option>
          </select>
        </div>
      </div>
      <div class="mb-4">
        <label class="form-label text-muted fs-7">TARGET COMPANIES (Comma separated)</label>
        <input type="text" id="set-companies" class="form-control glass-input" value="${s.targetCompanies || ''}" placeholder="e.g. Google, Microsoft, Meta">
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
          <input type="text" id="set-role" class="form-control glass-input" value="${s.targetRole || ''}" placeholder="e.g. Senior Backend Engineer">
        </div>
        <div class="col-md-6">
          <label class="form-label text-muted fs-7">EXPECTED ANNUAL SALARY ($)</label>
          <input type="text" id="set-salary" class="form-control glass-input" value="${s.expectedSalary || ''}" placeholder="e.g. 120,000">
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

  settingsDashboard: (s) => {
    const w = s.dashboardWidgets || '';
    return `
      <h5 class="text-white fw-bold mb-4">📊 Dashboard & Widget Preferences</h5>
      <form id="settings-dashboard-form">
        <h6 class="text-white fw-bold mb-3 fs-7">VISIBLE DASHBOARD WIDGETS</h6>
        <div class="row g-2 mb-4 text-start">
          <div class="col-6 form-check">
            <input class="form-check-input chk-widget" type="checkbox" value="Progress Chart" id="chk-progress" ${w.includes('Progress Chart') ? 'checked' : ''}>
            <label class="form-check-label text-muted fs-8" for="chk-progress">✓ Progress Chart</label>
          </div>
          <div class="col-6 form-check">
            <input class="form-check-input chk-widget" type="checkbox" value="Heatmap" id="chk-heatmap" ${w.includes('Heatmap') ? 'checked' : ''}>
            <label class="form-check-label text-muted fs-8" for="chk-heatmap">✓ GitHub Activity Heatmap</label>
          </div>
          <div class="col-6 form-check">
            <input class="form-check-input chk-widget" type="checkbox" value="Daily Goals" id="chk-goals" ${w.includes('Daily Goals') ? 'checked' : ''}>
            <label class="form-check-label text-muted fs-8" for="chk-goals">✓ Daily Goals Solver</label>
          </div>
          <div class="col-6 form-check">
            <input class="form-check-input chk-widget" type="checkbox" value="Calendar" id="chk-calendar" ${w.includes('Calendar') ? 'checked' : ''}>
            <label class="form-check-label text-muted fs-8" for="chk-calendar">✓ Interview Calendar</label>
          </div>
          <div class="col-6 form-check">
            <input class="form-check-input chk-widget" type="checkbox" value="DSA Progress" id="chk-dsa" ${w.includes('DSA Progress') ? 'checked' : ''}>
            <label class="form-check-label text-muted fs-8" for="chk-dsa">✓ DSA Topics Roadmap</label>
          </div>
          <div class="col-6 form-check">
            <input class="form-check-input chk-widget" type="checkbox" value="Course Progress" id="chk-courses" ${w.includes('Course Progress') ? 'checked' : ''}>
            <label class="form-check-label text-muted fs-8" for="chk-courses">✓ Learning Courses Track</label>
          </div>
        </div>
        <button type="submit" class="btn btn-premium w-100 py-2">Apply Widget Mappings</button>
      </form>
    `;
  },

  settingsConnected: (s) => {
    const provs = s.connectedProviders || '';
    return `
      <h5 class="text-white fw-bold mb-4">🔗 Connected Third-Party Accounts</h5>
      <div class="d-flex flex-column gap-3">
        <div class="glass-panel p-3 d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center gap-3">
            <i class="fa-brands fa-google fs-4 text-white"></i>
            <div>
              <h6 class="text-white fw-bold m-0 fs-7">Google Cloud API</h6>
              <small class="text-muted fs-8">Authentication and study alerts sync</small>
            </div>
          </div>
          <span class="badge ${provs.includes('Google') ? 'bg-success text-white' : 'bg-secondary text-white-50'} py-2 px-3">
            ${provs.includes('Google') ? 'Connected' : 'Disconnected'}
          </span>
        </div>

        <div class="glass-panel p-3 d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center gap-3">
            <i class="fa-brands fa-github fs-4 text-white"></i>
            <div>
              <h6 class="text-white fw-bold m-0 fs-7">GitHub Developer</h6>
              <small class="text-muted fs-8">Direct codes synchronization and commits track</small>
            </div>
          </div>
          <span class="badge ${provs.includes('GitHub') ? 'bg-success text-white' : 'bg-secondary text-white-50'} py-2 px-3">
            ${provs.includes('GitHub') ? 'Connected' : 'Disconnected'}
          </span>
        </div>

        <div class="glass-panel p-3 d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center gap-3">
            <i class="fa-brands fa-linkedin fs-4 text-white"></i>
            <div>
              <h6 class="text-white fw-bold m-0 fs-7">LinkedIn Careers</h6>
              <small class="text-muted fs-8">Profile data & placements synchronization</small>
            </div>
          </div>
          <span class="badge ${provs.includes('LinkedIn') ? 'bg-success text-white' : 'bg-secondary text-white-50'} py-2 px-3">
            ${provs.includes('LinkedIn') ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>
    `;
  },

  settingsPrivacy: (s) => `
    <h5 class="text-white fw-bold mb-4">🔒 Data & Privacy Preferences</h5>
    <form id="settings-privacy-form">
      <div class="form-check form-switch mb-3">
        <input class="form-check-input" type="checkbox" id="set-privateprofile" ${s.privateProfile ? 'checked' : ''}>
        <label class="form-check-label text-white fw-bold fs-7" for="set-privateprofile">Make Profile Private</label>
        <div class="form-text text-muted fs-8">Prevents other users from browsing your solved coding logs or career achievements list.</div>
      </div>
      <div class="form-check form-switch mb-3">
        <input class="form-check-input" type="checkbox" id="set-hideprogress" ${s.hideProgress ? 'checked' : ''}>
        <label class="form-check-label text-white fw-bold fs-7" for="set-hideprogress">Hide Progress Analytics</label>
        <div class="form-text text-muted fs-8">Removes solve charts from dashboard view overlays.</div>
      </div>
      <div class="form-check form-switch mb-3">
        <input class="form-check-input" type="checkbox" id="set-hideemail" ${s.hideEmail ? 'checked' : ''}>
        <label class="form-check-label text-white fw-bold fs-7" for="set-hideemail">Hide Email Address publicly</label>
      </div>
      <div class="form-check form-switch mb-4">
        <input class="form-check-input" type="checkbox" id="set-hidephone" ${s.hidePhone ? 'checked' : ''}>
        <label class="form-check-label text-white fw-bold fs-7" for="set-hidephone">Hide Contact details publicly</label>
      </div>
      <button type="submit" class="btn btn-premium w-100 py-2">Apply Privacy Shields</button>
    </form>
  `,

  settingsDevices: (sessions) => `
    <h5 class="text-white fw-bold mb-3"><i class="fa-solid fa-laptop-code text-indigo me-2"></i>Active Device Sessions</h5>
    <p class="text-muted fs-8 mb-4">Audit log lists active browsers authorized to request changes under your token credentials.</p>
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
              <td class="text-white fw-bold">${sess.userAgent.substring(0, 30)}...</td>
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

  settingsImportExport: () => `
    <h5 class="text-white fw-bold mb-4">📥 Import & Export Tools</h5>
    <div class="d-flex flex-column gap-4">
      <div>
        <h6 class="text-white fw-bold mb-2 fs-7">Export Personal Workspaces</h6>
        <p class="text-muted fs-8">Download local copy of coding solutions, courses enrollments details and calendar logs.</p>
        <div class="d-flex gap-2">
          <button class="btn btn-glass btn-sm fs-7 py-2 flex-grow-1" id="btn-exp-csv"><i class="fa-solid fa-file-csv me-1 text-success"></i> Backup CSV</button>
          <button class="btn btn-glass btn-sm fs-7 py-2 flex-grow-1" id="btn-exp-excel"><i class="fa-solid fa-file-excel me-1 text-success"></i> Backup Excel</button>
          <button class="btn btn-glass btn-sm fs-7 py-2 flex-grow-1" id="btn-exp-pdf"><i class="fa-solid fa-file-pdf me-1 text-danger"></i> Export PDF Report</button>
        </div>
      </div>
      <hr class="border-secondary m-0">
      <div>
        <h6 class="text-white fw-bold mb-2 fs-7">Restore Backup / Resume</h6>
        <p class="text-muted fs-8">Upload backup file or import external resume file reference to parse skills metrics.</p>
        <div class="mb-3">
          <input class="form-control glass-input fs-7" type="file" id="file-resume-import">
        </div>
        <button class="btn btn-premium w-100 py-2 fs-7" id="btn-submit-resume-upload">Process Resume Upload</button>
      </div>
    </div>
  `,

  settingsDeveloper: (s) => `
    <h5 class="text-white fw-bold mb-4">🛠 Developer Credentials & AI Models</h5>
    <form id="settings-developer-form" class="mb-4">
      <div class="mb-3">
        <label class="form-label text-muted fs-7">AI MODEL ENGINE</label>
        <select id="set-aimodel" class="form-select glass-input">
          <option value="Gemini-Pro" ${s.aiModel === 'Gemini-Pro' ? 'selected' : ''}>Gemini 1.5 Pro</option>
          <option value="Gemini-Flash" ${s.aiModel === 'Gemini-Flash' ? 'selected' : ''}>Gemini 1.5 Flash</option>
          <option value="Gemini-Ultra" ${s.aiModel === 'Gemini-Ultra' ? 'selected' : ''}>Gemini 1.0 Ultra</option>
        </select>
      </div>
      <div class="row g-3 mb-3">
        <div class="col-md-6">
          <label class="form-label text-muted fs-7">AI RESPONSE DEPTH</label>
          <select id="set-airesponselength" class="form-select glass-input">
            <option value="Short" ${s.responseLength === 'Short' ? 'selected' : ''}>Short Concise Suggestions</option>
            <option value="Medium" ${s.responseLength === 'Medium' ? 'selected' : ''}>Medium standard responses</option>
            <option value="Long" ${s.responseLength === 'Long' ? 'selected' : ''}>Long Detailed Step-by-Step guides</option>
          </select>
        </div>
        <div class="col-md-6">
          <label class="form-label text-muted fs-7">AI DIFFICULTY TUNING</label>
          <select id="set-aidifficulty" class="form-select glass-input">
            <option value="Basic" ${s.aiDifficultyLevel === 'Basic' ? 'selected' : ''}>Basic Level Hints</option>
            <option value="Adaptive" ${s.aiDifficultyLevel === 'Adaptive' ? 'selected' : ''}>Adaptive (Matches User Strength)</option>
            <option value="Extreme" ${s.aiDifficultyLevel === 'Extreme' ? 'selected' : ''}>Extreme Grilling Mode</option>
          </select>
        </div>
      </div>
      <div class="form-check form-switch mb-3">
        <input class="form-check-input" type="checkbox" id="set-suggestions" ${s.autoSuggestions ? 'checked' : ''}>
        <label class="form-check-label text-muted fs-7" for="set-suggestions">Enable AI Auto-suggestions on coding screens</label>
      </div>
      <div class="form-check form-switch mb-4">
        <input class="form-check-input" type="checkbox" id="set-devmode" ${s.developerMode ? 'checked' : ''}>
        <label class="form-check-label text-muted fs-7" for="set-devmode">Enable Developer Options API Playgrounds</label>
      </div>
      <button type="submit" class="btn btn-premium w-100 py-2">Apply Engine Customizations</button>
    </form>

    <div class="p-4 rounded border border-secondary bg-dark-subtle ${s.developerMode ? '' : 'd-none'}" id="dev-api-keys-box">
      <h6 class="text-white fw-bold mb-3 fs-7">Developer API Authentication Keys</h6>
      <div class="bg-dark p-3 rounded mb-3 text-start border border-secondary d-flex align-items-center justify-content-between">
        <span class="font-monospace text-indigo fs-7">${s.apiKey || 'No key generated.'}</span>
        <button class="btn btn-glass btn-sm py-1" id="btn-rotate-apikey"><i class="fa-solid fa-arrows-rotate"></i> Rotate</button>
      </div>
      <small class="text-muted fs-8">Use this API key inside requests header: <code>Authorization: Bearer [key]</code> to automate solutions uploads externally.</small>
    </div>
  `,

  settingsAbout: () => `
    <div class="text-center py-4">
      <img src="assets/prepspace_logo.svg" alt="PrepSpace Logo" class="mb-3" style="width: 54px; height: 54px; object-fit: contain;">
      <h4 class="text-white fw-bold mb-1">PrepSpace Enterprise</h4>
      <p class="text-muted fs-7 mb-4">Version 2.1.5 (Stateless Zero-Trust Edition)</p>
      <p class="text-muted fs-8">Designed by Nagesh Methre. All rights reserved.</p>
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

        <div class="glass-panel p-4 mt-4">
          <h5 class="text-white fw-bold mb-4"><i class="fa-solid fa-graduation-cap text-indigo me-2"></i>Add Course by Link</h5>
          <form id="admin-course-form">
            <div class="mb-3">
              <label class="form-label text-muted fs-7">COURSE TITLE</label>
              <input type="text" id="admin-c-title" class="form-control glass-input" placeholder="e.g. Master System Design" required>
            </div>
            <div class="mb-3">
              <label class="form-label text-muted fs-7">COURSE / PLAYLIST LINK</label>
              <input type="url" id="admin-c-link" class="form-control glass-input" placeholder="https://youtube.com/... or playlist URL" required>
            </div>
            <div class="row mb-3">
              <div class="col-6">
                <label class="form-label text-muted fs-7">INSTRUCTOR</label>
                <input type="text" id="admin-c-instructor" class="form-control glass-input" placeholder="e.g. John Doe" required>
              </div>
              <div class="col-6">
                <label class="form-label text-muted fs-7">DURATION</label>
                <input type="text" id="admin-c-duration" class="form-control glass-input" placeholder="e.g. 5h 45m" required>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-6">
                <label class="form-label text-muted fs-7">DIFFICULTY</label>
                <select id="admin-c-difficulty" class="form-select glass-input">
                  <option value="BEGINNER">BEGINNER</option>
                  <option value="INTERMEDIATE">INTERMEDIATE</option>
                  <option value="ADVANCED">ADVANCED</option>
                </select>
              </div>
              <div class="col-6">
                <label class="form-label text-muted fs-7">THUMBNAIL URL (OPTIONAL)</label>
                <input type="text" id="admin-c-thumbnail" class="form-control glass-input" placeholder="https://...">
              </div>
            </div>
            <div class="mb-4">
              <label class="form-label text-muted fs-7">DESCRIPTION</label>
              <textarea id="admin-c-desc" class="form-control glass-input" rows="3" placeholder="Briefly describe the course content..." required></textarea>
            </div>
            <button type="submit" class="btn btn-premium w-100">Publish Course</button>
          </form>
        </div>
      </div>
    </div>
  `,

  // 1. Learning Platform (LMS)
  courses: (list) => {
    return `
      <!-- Hero section -->
      <div class="glass-panel p-5 mb-5 text-center relative overflow-hidden" style="background: linear-gradient(135deg, rgba(99,102,241,0.06) 0%, rgba(168,85,247,0.06) 100%);">
        <h1 class="display-4 fw-extrabold text-white mb-3">Learn. Build. Master.</h1>
        <p class="text-muted fs-6 max-w-2xl mx-auto mb-4" style="max-width: 650px;">
          Master programming, AI, web development, computer science and the skills you need to build real-world projects and crack technical interviews.
        </p>
        <button id="btn-explore-scroll" class="btn btn-premium px-5 py-3 fs-6"><i class="fa-solid fa-compass me-2"></i> Explore Courses →</button>
      </div>

      <!-- Filters & Search Toolbar -->
      <div class="glass-panel p-4 mb-4" id="courses-toolbar-pane">
        <div class="row g-3 align-items-center">
          <div class="col-md-5">
            <div class="input-group">
              <span class="input-group-text bg-dark border-secondary text-muted"><i class="fa-solid fa-magnifying-glass"></i></span>
              <input type="text" id="courses-search-bar" class="form-control glass-input" placeholder="Search courses, topics, or instructors...">
            </div>
          </div>
          <div class="col-md-4">
            <select id="courses-difficulty-filter" class="form-select glass-input">
              <option value="ALL">All Difficulties</option>
              <option value="BEGINNER">Beginner</option>
              <option value="INTERMEDIATE">Intermediate</option>
              <option value="ADVANCED">Advanced</option>
            </select>
          </div>
          <div class="col-md-3">
            <select id="courses-category-filter" class="form-select glass-input">
              <option value="ALL">All Categories</option>
              <option value="PROGRAMMING">Programming Languages</option>
              <option value="AI">Artificial Intelligence</option>
              <option value="WEB">Web Development</option>
              <option value="DATABASE">Databases</option>
              <option value="DSA">Data Structures & Algorithms</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Main Course Grid -->
      <div class="row g-4" id="courses-grid-mount">
        ${list.length === 0 ? `
          <div class="col-12 text-center py-5 text-muted">
            <i class="fa-solid fa-folder-open display-4 mb-3"></i>
            <h5>No matching courses found.</h5>
          </div>
        ` : list.map(c => {
          // Determine lesson count
          const lessonsCount = c.lessons ? c.lessons.length : 15;
          const ratingStars = Array(5).fill(0).map((_, i) => `<i class="fa-star ${i < Math.floor(c.rating || 5) ? 'fa-solid text-warning' : 'fa-regular text-muted'}"></i>`).join('');
          
          return `
            <div class="col-md-6 col-lg-4 course-card-wrapper" data-title="${c.title.toLowerCase()}" data-desc="${c.description.toLowerCase()}" data-instructor="${c.instructor.toLowerCase()}" data-difficulty="${c.difficulty}" data-category="${c.title.includes('Java') ? 'PROGRAMMING' : c.title.includes('Machine') ? 'AI' : c.title.includes('Data') ? 'DSA' : 'WEB'}">
              <div class="glass-panel h-100 d-flex flex-column rounded-3 border-secondary-subtle">
                <div class="position-relative">
                  <img src="${c.thumbnailUrl || 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7'}" class="img-fluid rounded-top w-100 object-fit-cover" style="height: 180px;" alt="${c.title}">
                  <span class="course-badge position-absolute top-0 start-0 m-3 badge bg-dark bg-opacity-75 text-white border border-secondary-subtle py-2 px-3 rounded-pill">${c.difficulty}</span>
                </div>
                
                <div class="p-4 flex-grow-1 d-flex flex-column">
                  <h5 class="text-white fw-bold mb-2">${c.title}</h5>
                  <p class="text-muted fs-7 flex-grow-1 mb-3">${c.description.length > 100 ? c.description.substring(0, 100) + '...' : c.description}</p>
                  
                  <div class="d-flex align-items-center justify-content-between text-muted fs-8 mb-3">
                    <span><i class="fa-solid fa-user-tie me-1"></i>${c.instructor}</span>
                    <span><i class="fa-solid fa-clock me-1"></i>${c.duration}</span>
                  </div>

                  <div class="d-flex align-items-center justify-content-between mb-4 border-top border-secondary border-opacity-10 pt-3">
                    <div class="text-warning fs-8">
                      ${ratingStars} <span class="text-white ms-1">${c.rating || 5.0}</span>
                    </div>
                    <span class="fs-8 text-muted">${lessonsCount} Lessons • ${(lessonsCount / 3).toFixed(0)} Projects</span>
                  </div>

                  <button class="btn btn-premium w-100 py-3 btn-enroll-course" data-course-id="${c.id}">Start Learning <i class="fa-solid fa-chevron-right ms-1 fs-9"></i></button>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  courseDetail: (course, enrollment) => `
    <!-- Top Action Bar with Back Button -->
    <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4 pb-3 border-bottom border-secondary">
      <div class="d-flex align-items-center gap-3">
        <button id="btn-back-to-courses-top" class="btn btn-glass py-2 px-3 fs-7 text-white d-flex align-items-center gap-2" style="border: 1px solid rgba(255,255,255,0.25); background: rgba(99, 102, 241, 0.15); border-radius: 8px;">
          <i class="fa-solid fa-arrow-left text-primary"></i> <span class="fw-bold">Back to Courses Catalog</span>
        </button>
        <div>
          <h4 class="text-white fw-bold mb-0">${course.title}</h4>
          <span class="text-muted fs-8">Instructor: ${course.instructor || 'Senior Architect'}</span>
        </div>
      </div>
      <div class="d-flex align-items-center gap-2">
        <span class="badge bg-primary-subtle text-primary border border-primary-subtle fs-7 px-3 py-2">${course.difficulty || 'All Levels'}</span>
        <span class="badge bg-dark text-white-50 border border-secondary fs-7 px-3 py-2"><i class="fa-regular fa-clock me-1 text-primary"></i> ${course.duration || 'Self-Paced'}</span>
      </div>
    </div>

    <div class="row g-4">
      <!-- Lesson Navigation Drawer -->
      <div class="col-lg-4">
        <div class="glass-panel p-4">
          <!-- Back to Courses button -->
          <div class="mb-4">
            <button id="btn-back-to-courses" class="btn btn-glass btn-sm w-100 text-start py-2 fs-7 text-white d-flex align-items-center gap-2" style="border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.06); border-radius: 6px;">
              <i class="fa-solid fa-arrow-left text-primary"></i> <span class="fw-semibold">Back to Courses Catalog</span>
            </button>
          </div>
          <div class="d-flex justify-content-between align-items-center mb-2">
            <h5 class="text-white fw-bold mb-0">Course Curriculum</h5>
            <span class="badge bg-primary-subtle text-primary border border-primary-subtle fs-8">${course.difficulty || 'All Levels'}</span>
          </div>
          <div class="text-muted fs-8 mb-3">${course.title}</div>
          <div class="progress mb-2 bg-dark" style="height: 8px;">
            <div class="progress-bar bg-indigo" role="progressbar" style="width: ${enrollment ? enrollment.progressPercentage : 0}%"></div>
          </div>
          <p class="text-muted fs-7 mb-4">${enrollment ? Math.round(enrollment.progressPercentage) : 0}% Completed</p>
          <div class="list-group list-group-flush" id="curriculum-drawer">
            ${course.lessons && course.lessons.length > 0 ? course.lessons.map(l => `
              <button class="list-group-item list-group-item-action bg-transparent text-white border-secondary fs-7 py-3 d-flex align-items-center justify-content-between btn-select-lesson" data-lesson-id="${l.id}" data-video="${l.videoUrl || ''}" data-quiz='${l.quizQuestions || '[]'}' data-seq="${l.sequenceNumber}">
                <span><i class="fa-regular fa-circle-play me-2 text-indigo"></i>${l.sequenceNumber}. ${l.title}</span>
                <i class="fa-solid fa-circle-check text-muted lesson-check-status"></i>
              </button>
            `).join('') : '<p class="text-muted fs-7">No lessons uploaded yet for this course.</p>'}
          </div>
        </div>
      </div>
      <!-- Video Player and Workspace -->
      <div class="col-lg-8">
        <div class="glass-panel p-4 mb-4">
          <div class="ratio ratio-16x9 bg-dark mb-4 rounded overflow-hidden" id="video-frame-container" style="box-shadow: 0 8px 32px rgba(0,0,0,0.5);">
            <iframe id="video-frame" class="w-100 h-100 border-0" src="${course.lessons && course.lessons.length > 0 ? course.lessons[0].videoUrl : 'https://www.youtube.com/embed/grEKMHGYyns'}" title="Lesson Player" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
          </div>
          <h4 class="text-white fw-bold" id="active-lesson-title">${course.lessons && course.lessons.length > 0 ? course.lessons[0].sequenceNumber + '. ' + course.lessons[0].title : 'Select a Lesson to Begin'}</h4>
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
          <div class="d-flex align-items-center gap-2 mb-3">
            <i class="fa-solid fa-brain text-primary fs-4"></i>
            <h5 class="text-white fw-bold mb-0">Start Mock Assessment</h5>
          </div>
          <p class="text-muted fs-8 mb-4">System-graded timed examinations with instant score calculation, MCQ verification, and profile XP rewards.</p>
          <form id="mock-exam-form">
            <div class="mb-3">
              <label class="form-label text-muted fs-7 fw-semibold">TOPIC CATEGORY</label>
              <select id="mock-category" class="form-select glass-input">
                <option value="DSA">DSA & Data Structures (Trees, Graphs, DP)</option>
                <option value="Java">Java 21, JVM & Spring Boot</option>
                <option value="SQL">SQL & Database Systems (ACID, Normalization)</option>
                <option value="OS">Operating Systems (Memory, Threads, Deadlocks)</option>
                <option value="CN">Computer Networks (TCP/IP, DNS, OSI)</option>
                <option value="Python">Python Core & Object Scripting</option>
                <option value="ALL">Comprehensive Full-Stack Assessment</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label text-muted fs-7 fw-semibold">EXAM DURATION</label>
              <select id="mock-duration" class="form-select glass-input">
                <option value="15">15 Minutes (Quick Test)</option>
                <option value="30" selected>30 Minutes (Standard)</option>
                <option value="45">45 Minutes (Extended)</option>
                <option value="60">60 Minutes (Full Length)</option>
              </select>
            </div>
            <div class="mb-4">
              <label class="form-label text-muted fs-7 fw-semibold">QUESTION COUNT</label>
              <select id="mock-qcount" class="form-select glass-input">
                <option value="10">10 Questions</option>
                <option value="20">20 Questions</option>
                <option value="30">30 Questions</option>
                <option value="50" selected>50 Questions (Comprehensive)</option>
              </select>
            </div>
            <button type="submit" class="btn btn-premium w-100 py-3 fw-bold fs-6"><i class="fa-solid fa-stopwatch me-2"></i>Start Automated Assessment</button>
          </form>
        </div>
      </div>
      <!-- Leaderboard & Past attempts -->
      <div class="col-lg-8">
        <div class="glass-panel p-4 mb-4">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="text-white fw-bold mb-0"><i class="fa-solid fa-trophy text-warning me-2"></i>Global Assessment Leaderboard</h5>
            <span class="badge bg-primary-subtle text-primary border border-primary-subtle fs-8">Live Ranks</span>
          </div>
          <div class="table-responsive">
            <table class="table table-dark table-hover align-middle m-0">
              <thead>
                <tr class="text-muted border-secondary-subtle fs-8">
                  <th scope="col">Rank</th>
                  <th scope="col">Candidate</th>
                  <th scope="col">Topic</th>
                  <th scope="col" class="text-end">Score</th>
                </tr>
              </thead>
              <tbody>
                ${leaderboard && leaderboard.length > 0 ? leaderboard.map((l, idx) => `
                  <tr class="border-secondary-subtle fs-7">
                    <td><span class="badge ${idx === 0 ? 'bg-warning text-dark' : idx === 1 ? 'bg-light text-dark' : idx === 2 ? 'bg-bronze text-white' : 'bg-secondary'} rounded-circle px-2 py-1">${idx + 1}</span></td>
                    <td class="fw-semibold text-white">${l.user ? l.user.name : 'Anonymous Candidate'}</td>
                    <td><span class="badge bg-dark border border-secondary text-primary-subtle">${l.category}</span></td>
                    <td class="text-end fw-bold text-success">${l.score} pts</td>
                  </tr>
                `).join('') : `
                  <tr><td colspan="4" class="text-center text-muted py-4">No examination scores logged yet. Be the first to take the test!</td></tr>
                `}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,

  mockExamActive: (testId, category, duration, questionCount) => `
    <div class="row g-4">
      <!-- Left Info & Question Palette Drawer -->
      <div class="col-lg-4">
        <div class="glass-panel p-4 mb-4">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <span class="badge bg-primary-subtle text-primary border border-primary-subtle fs-7 px-3 py-2">${category}</span>
            <div class="text-danger fw-bold fs-5 font-monospace d-flex align-items-center gap-2" id="mock-timer-box">
              <i class="fa-solid fa-stopwatch fa-spin-pulse"></i>
              <span id="mock-timer-display">${duration}:00</span>
            </div>
          </div>
          
          <div class="border-top border-secondary border-opacity-25 pt-3 mb-4">
            <div class="d-flex justify-content-between text-muted fs-8 mb-2">
              <span id="mock-progress-text">Progress: 1 of ${questionCount}</span>
              <span id="mock-answered-count" class="text-success fw-bold">Answered: 0/${questionCount}</span>
            </div>
            <div class="progress bg-dark bg-opacity-75" style="height: 8px; border-radius: 4px;">
              <div id="mock-progress-bar" class="progress-bar bg-primary" role="progressbar" style="width: ${(1 / questionCount) * 100}%"></div>
            </div>
          </div>

          <!-- 50-Question Quick Jump Palette -->
          <div class="mb-4">
            <label class="form-label text-muted fs-8 fw-semibold uppercase mb-2">Question Navigation Grid</label>
            <div class="d-flex flex-wrap gap-2 overflow-y-auto p-2 rounded bg-dark bg-opacity-50 border border-secondary" id="mock-question-palette" style="max-height: 220px;">
              ${Array.from({ length: questionCount }, (_, i) => `
                <button type="button" class="btn btn-sm btn-glass btn-jump-q py-1 px-2 fs-8 text-white ${i === 0 ? 'border-primary bg-primary bg-opacity-25' : ''}" data-q-index="${i}" id="palette-btn-${i}" style="min-width: 34px;">
                  ${i + 1}
                </button>
              `).join('')}
            </div>
          </div>
          
          <button class="btn btn-premium w-100 py-3 fw-bold fs-6" id="btn-submit-mock-exam" data-test-id="${testId}">
            <i class="fa-solid fa-paper-plane me-2"></i> Submit & Grade Exam
          </button>
        </div>
      </div>

      <!-- Right Active Question Card -->
      <div class="col-lg-8">
        <div class="glass-panel p-4 h-100 d-flex flex-column justify-content-between" id="mock-question-card-workspace" style="min-height: 480px;">
          <div class="text-center py-5">
            <div class="spinner-border text-primary" role="status"></div>
            <p class="text-muted mt-3">Loading dynamic assessment questions...</p>
          </div>
        </div>
      </div>
    </div>
  `,

  mockExamResult: (stats, questions, userAnswers) => `
    <div class="glass-panel p-4 p-md-5 mb-4 text-center position-relative overflow-hidden">
      <div class="mb-3">
        <span class="badge ${stats.percentage >= 80 ? 'bg-success' : stats.percentage >= 50 ? 'bg-warning text-dark' : 'bg-danger'} fs-6 px-4 py-2 text-uppercase">
          ${stats.percentage >= 80 ? '🌟 Assessment Passed with Distinction' : stats.percentage >= 50 ? '👍 Assessment Cleared' : '📚 Needs Further Study'}
        </span>
      </div>
      <h2 class="text-white fw-extrabold mb-2 display-6">Scorecard: ${stats.score} / ${stats.total}</h2>
      <p class="text-muted fs-6 mb-4">Accuracy: <strong class="text-primary">${stats.percentage}%</strong> • Time Taken: <strong class="text-white">${stats.timeSpent}</strong></p>

      <!-- Earned XP Points Alert -->
      <div class="d-inline-flex align-items-center gap-3 bg-indigo bg-opacity-25 border border-primary px-4 py-3 rounded-pill mb-4">
        <i class="fa-solid fa-bolt text-warning fs-4"></i>
        <span class="text-white fw-bold fs-6">+${stats.earnedXp} XP Points Added to Profile Streak!</span>
      </div>

      <div class="row g-3 justify-content-center max-w-700 mx-auto mb-4">
        <div class="col-4">
          <div class="p-3 bg-dark bg-opacity-50 rounded border border-success">
            <div class="text-success fw-bold display-7">${stats.correctCount}</div>
            <div class="text-muted fs-8">CORRECT</div>
          </div>
        </div>
        <div class="col-4">
          <div class="p-3 bg-dark bg-opacity-50 rounded border border-danger">
            <div class="text-danger fw-bold display-7">${stats.incorrectCount}</div>
            <div class="text-muted fs-8">INCORRECT</div>
          </div>
        </div>
        <div class="col-4">
          <div class="p-3 bg-dark bg-opacity-50 rounded border border-secondary">
            <div class="text-white fw-bold display-7">${stats.unansweredCount}</div>
            <div class="text-muted fs-8">SKIPPED</div>
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-center gap-3">
        <button id="btn-retake-mock" class="btn btn-premium px-4 py-2"><i class="fa-solid fa-rotate-right me-1"></i> Start New Assessment</button>
        <button id="btn-back-to-exams-catalog" class="btn btn-glass px-4 py-2"><i class="fa-solid fa-list me-1"></i> Leaderboard & Tests</button>
      </div>
    </div>

    <!-- Detailed Question-by-Question Review -->
    <div class="glass-panel p-4">
      <h4 class="text-white fw-bold mb-4"><i class="fa-solid fa-magnifying-glass-chart text-primary me-2"></i>Detailed Question Review & Explanations</h4>
      <div class="d-flex flex-column gap-4">
        ${questions.map((q, idx) => {
          const userChoice = userAnswers[q.id];
          const isCorrect = userChoice === q.answer;
          const isAnswered = userChoice !== undefined && userChoice !== null;
          return `
            <div class="p-4 rounded border ${!isAnswered ? 'border-secondary bg-dark bg-opacity-25' : isCorrect ? 'border-success bg-success bg-opacity-10' : 'border-danger bg-danger bg-opacity-10'}">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="fw-bold text-white fs-6">Question ${idx + 1}</span>
                <span class="badge ${!isAnswered ? 'bg-secondary' : isCorrect ? 'bg-success' : 'bg-danger'}">
                  ${!isAnswered ? 'Skipped' : isCorrect ? '✓ Correct (+10 XP)' : '✗ Incorrect (0 XP)'}
                </span>
              </div>
              <p class="text-white fs-7 mb-3 fw-semibold">${q.question}</p>
              
              <div class="row g-2 mb-3">
                ${q.options.map((opt, optIdx) => {
                  let optStyle = 'border-secondary text-muted bg-dark bg-opacity-50';
                  if (optIdx === q.answer) {
                    optStyle = 'border-success text-success bg-success bg-opacity-20 fw-bold';
                  } else if (userChoice === optIdx && !isCorrect) {
                    optStyle = 'border-danger text-danger bg-danger bg-opacity-20 fw-bold';
                  }
                  return `
                    <div class="col-md-6">
                      <div class="p-2 rounded border ${optStyle} fs-8 d-flex align-items-center gap-2">
                        <span class="badge ${optIdx === q.answer ? 'bg-success' : userChoice === optIdx ? 'bg-danger' : 'bg-dark'}">${String.fromCharCode(65 + optIdx)}</span>
                        <span>${opt}</span>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>

              <div class="p-3 rounded bg-dark bg-opacity-75 border border-secondary fs-8">
                <strong class="text-primary"><i class="fa-solid fa-lightbulb me-1"></i> System Explanation:</strong>
                <span class="text-white-50 ms-1">${q.explanation || 'The correct option satisfies the fundamental architectural and algorithmic properties.'}</span>
              </div>
            </div>
          `;
        }).join('')}
      </div>
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
  `,

  desktopClient: () => `
    <div class="glass-panel p-5 text-center">
      <i class="fa-solid fa-desktop display-4 text-indigo mb-4"></i>
      <h3 class="text-white fw-bold mb-2">Java Swing Desktop Client</h3>
      <p class="text-muted fs-7 max-w-md mx-auto mb-4" style="max-width: 450px;">
        PrepSpace provides a complete, high-performance Java Swing desktop application that integrates directly with the MySQL database via JDBC for ultra-fast, local placement tracking.
      </p>
      
      <div class="card bg-dark bg-opacity-25 border-secondary text-start mx-auto p-4 mb-4 text-muted fs-7" style="max-width: 550px;">
        <h6 class="text-white fw-bold mb-3"><i class="fa-solid fa-terminal text-indigo me-2"></i> How to Compile and Run Locally</h6>
        <p class="mb-2">1. Open your terminal and navigate to the project desktop folder:</p>
        <pre class="bg-black text-success p-2 rounded mb-3">cd desktop-app</pre>
        <p class="mb-2">2. Clean, compile and start the Swing application GUI:</p>
        <pre class="bg-black text-success p-2 rounded mb-0">mvn clean compile exec:java</pre>
      </div>

      <div class="alert alert-indigo-subtle border-indigo text-start d-inline-block px-4 py-3 fs-7 text-muted" style="max-width: 550px;">
        <i class="fa-solid fa-circle-info text-indigo me-2"></i> 
        <strong>Author Note:</strong> Build requirements include Java SDK 17+ and Maven. Direct database configs can be adjusted under the app settings panel.
      </div>
    </div>
  `,

  billing: (isPaid) => `
    <div class="container-fluid py-4">
      <div class="row justify-content-center text-center mb-5">
        <div class="col-lg-6">
          <h2 class="text-white fw-bold mb-2">Upgrade Space Metrics</h2>
          <p class="text-muted">Level up your placement preparation and unlock premium tools</p>
        </div>
      </div>

      <div class="row g-4 justify-content-center">
        <div class="col-md-5 col-lg-4">
          <div class="glass-panel p-4 h-100 text-center">
            <h3 class="text-white h4">PrepFree</h3>
            <p class="text-muted">Perfect for getting started</p>
            <div class="my-4"><span class="display-4 fw-bold text-white">₹0</span></div>
            <ul class="list-unstyled text-start mb-5 text-muted">
              <li class="mb-2"><i class="fa-solid fa-check text-success me-2"></i> Access to Question Bank</li>
              <li class="mb-2"><i class="fa-solid fa-check text-success me-2"></i> Log Solved Problems</li>
              <li class="mb-2"><i class="fa-solid fa-check text-success me-2"></i> Standard Kanban Placements</li>
            </ul>
            <button class="btn btn-glass w-100 py-3 disabled">${!isPaid ? 'Current Active Plan' : 'Basic Tier'}</button>
          </div>
        </div>
        
        <div class="col-md-5 col-lg-4">
          <div class="glass-panel p-4 h-100 text-center border-primary" style="box-shadow: 0 0 25px var(--accent-glow);">
            <h3 class="text-white h4">PrepPro</h3>
            <p class="text-indigo">Recommended for Active Jobseekers</p>
            <div class="my-4"><span class="display-4 fw-bold text-white">₹99</span><span class="text-muted">/one-time</span></div>
            <ul class="list-unstyled text-start mb-5 text-muted">
              <li class="mb-2"><i class="fa-solid fa-check text-success me-2"></i> <strong>AI Career Assistant</strong> (ATS Audit, Planner)</li>
              <li class="mb-2"><i class="fa-solid fa-check text-success me-2"></i> <strong>AI Custom Study Planners</strong></li>
              <li class="mb-2"><i class="fa-solid fa-check text-success me-2"></i> <strong>Company Interview Guides</strong> (Prompts)</li>
              <li class="mb-2"><i class="fa-solid fa-check text-success me-2"></i> <strong>Export Excel/PDF Progress reports</strong></li>
              <li class="mb-2"><i class="fa-solid fa-check text-success me-2"></i> Mock AI Feedback Logs & Leaderboard</li>
            </ul>
            <button id="btn-upgrade-pro" class="btn btn-premium w-100 py-3" ${isPaid ? 'disabled' : ''}>
              ${isPaid ? 'Active Premium Access' : 'Buy PrepPro Access'}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,

  referral: (stats) => `
    <div class="container-fluid py-4">
      <div class="glass-panel p-5 mb-5 bg-gradient-to-r" style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(168, 85, 247, 0.05));">
        <div class="row align-items-center">
          <div class="col-md-8">
            <span class="badge bg-indigo-subtle text-primary border border-primary-subtle px-3 py-2 rounded-pill mb-3">AFFILIATE PROGRAM</span>
            <h2 class="text-white fw-bold mb-2">Share PrepSpace, Earn Cash Payouts!</h2>
            <p class="text-muted mb-0">Invite your classmates and friends. You earn <strong class="text-primary">₹49</strong> on every user who upgrades their tracker space to premium (₹99)!</p>
          </div>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="row g-4 mb-5">
        <div class="col-sm-6 col-lg-3">
          <div class="glass-panel p-4">
            <div class="text-muted fs-8 uppercase tracking-wider mb-2">Total Referrals</div>
            <div class="d-flex justify-content-between align-items-center">
              <h3 class="text-white fw-bold mb-0">${stats.totalReferrals}</h3>
              <i class="fa-solid fa-users text-primary fs-4"></i>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-lg-3">
          <div class="glass-panel p-4">
            <div class="text-muted fs-8 uppercase tracking-wider mb-2">Total Earnings</div>
            <div class="d-flex justify-content-between align-items-center">
        </div>
      </div>

      <div class="row g-4">
        <!-- Payout Request and Links -->
        <div class="col-lg-4">
          <div class="glass-panel p-4 mb-4">
            <h5 class="text-white fw-bold mb-3">Copy Referral link</h5>
            <div class="d-flex gap-2">
              <input type="text" readonly id="ref-link-val" class="form-control glass-input fs-7 font-mono" value="https://stream-in.app/#/register?ref=${stats.referralCode}">
              <button id="btn-copy-ref-link" class="btn btn-glass px-3"><i class="fa-regular fa-copy"></i></button>
            </div>
          </div>

          <div class="glass-panel p-4">
            <h5 class="text-white fw-bold mb-3">Request Withdrawal</h5>
            <form id="ref-withdraw-form">
              <div class="mb-3">
                <label class="form-label text-muted fs-7">AMOUNT (INR)</label>
                <input type="number" id="withdraw-amount" class="form-control glass-input" placeholder="Min. ₹${stats.minWithdrawal}" required>
              </div>
              <div class="mb-4">
                <label class="form-label text-muted fs-7">UPI ID FOR INSTANT PAYOUT</label>
                <input type="text" id="withdraw-upi" class="form-control glass-input" placeholder="username@okaxis" required>
              </div>
              <button type="submit" id="btn-submit-withdraw" class="btn btn-premium w-100 py-2" ${stats.availableBalance < stats.minWithdrawal ? 'disabled' : ''}>
                File Payout Claim
              </button>
            </form>
          </div>
        </div>

        <!-- History Tables -->
        <div class="col-lg-8">
          <div class="glass-panel p-4 mb-4">
            <h5 class="text-white fw-bold mb-3"><i class="fa-solid fa-list-check text-primary me-2"></i>Referral Audit Trail</h5>
            <div class="table-responsive">
              <table class="table table-dark table-hover fs-7 align-middle mb-0">
                <thead>
                  <tr class="text-muted border-secondary">
                    <th>Referred Email</th>
                    <th>Date Registered</th>
                    <th>Upgrade status</th>
                    <th class="text-end">My Commission</th>
                  </tr>
                </thead>
                <tbody id="referral-history-rows">
                  <tr>
                    <td colspan="4" class="text-center py-4 text-muted">Loading audit trails...</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="glass-panel p-4">
            <h5 class="text-white fw-bold mb-3"><i class="fa-solid fa-arrow-right-arrow-left text-success me-2"></i>Withdrawal Claims</h5>
            <div class="table-responsive">
              <table class="table table-dark table-hover fs-7 align-middle mb-0">
                <thead>
                  <tr class="text-muted border-secondary">
                    <th>Claim Amount</th>
                    <th>UPI ID</th>
                    <th>Date Filed</th>
                    <th class="text-end">Claim Status</th>
                  </tr>
                </thead>
                <tbody id="withdrawal-history-rows">
                  <tr>
                    <td colspan="4" class="text-center py-4 text-muted">Loading withdrawal claims...</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,

  adminClaimsList: (claims) => {
    if (!claims || claims.length === 0) {
      return `<div class="text-center py-5 text-muted"><i class="fa-solid fa-hourglass-empty fa-2x mb-3"></i><p>No withdrawal claims found in the queue.</p></div>`;
    }
    return `
      <div class="table-responsive">
        <table class="table table-dark table-hover fs-7 align-middle mb-0">
          <thead>
            <tr class="text-muted border-secondary">
              <th>ID</th>
              <th>User Email</th>
              <th>UPI ID (Payout Details)</th>
              <th>Request Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th class="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${claims.map(c => `
              <tr class="border-secondary">
                <td class="text-white">${c.id}</td>
                <td>${c.userEmail}</td>
                <td class="text-info">${c.payoutDetails}</td>
                <td>${new Date(c.createdAt).toLocaleString()}</td>
                <td class="text-success fw-bold">₹${c.amount}</td>
                <td>
                  <span class="badge ${c.status === 'PAID' ? 'bg-success-subtle text-success' : c.status === 'REJECTED' ? 'bg-danger-subtle text-danger' : c.status === 'PROCESSING' ? 'bg-warning-subtle text-warning' : 'bg-secondary-subtle text-muted'}">
                    ${c.status}
                  </span>
                </td>
                <td class="text-end">
                  ${c.status === 'PENDING' || c.status === 'PROCESSING' ? `
                    <button class="btn btn-sm btn-success btn-claim-action px-2 py-1 me-1" data-id="${c.id}" data-action="PAID"><i class="fa-solid fa-check"></i> Approve & Paid</button>
                    <button class="btn btn-sm btn-danger btn-claim-action px-2 py-1" data-id="${c.id}" data-action="REJECTED"><i class="fa-solid fa-times"></i> Reject</button>
                  ` : '<span class="text-muted fs-8">No actions</span>'}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  adminPaymentsList: (payments) => {
    if (!payments || payments.length === 0) {
      return `<div class="text-center py-5 text-muted"><i class="fa-solid fa-circle-exclamation fa-2x mb-3"></i><p>No payment logs found.</p></div>`;
    }
    return `
      <div class="d-flex justify-content-between align-items-center mb-3">
        <div class="text-muted fs-8">Total Transactions: ${payments.length}</div>
        <a href="/api/admin/reports/payments" class="btn btn-outline-info btn-sm"><i class="fa-solid fa-download me-1"></i> Export CSV Report</a>
      </div>
      <div class="table-responsive">
        <table class="table table-dark table-hover fs-7 align-middle mb-0">
          <thead>
            <tr class="text-muted border-secondary">
              <th>ID</th>
              <th>User</th>
              <th>Razorpay Order ID</th>
              <th>Razorpay Payment ID</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            ${payments.map(p => `
              <tr class="border-secondary">
                <td>${p.id}</td>
                <td class="text-white">${p.userEmail}</td>
                <td>${p.orderId}</td>
                <td>${p.paymentId || '<span class="text-muted">N/A</span>'}</td>
                <td class="text-success fw-bold">₹${p.amount}</td>
                <td>
                  <span class="badge ${p.status === 'SUCCESS' ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'}">
                    ${p.status}
                  </span>
                </td>
                <td>${new Date(p.createdAt).toLocaleString()}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  adminUsersList: (users) => {
    if (!users || users.length === 0) {
      return `<div class="text-center py-5 text-muted"><i class="fa-solid fa-users-slash fa-2x mb-3"></i><p>No users registered.</p></div>`;
    }
    return `
      <div class="d-flex justify-content-between align-items-center mb-3">
        <div class="text-muted fs-8">Registered Users: ${users.length}</div>
        <a href="/api/admin/reports/users" class="btn btn-outline-info btn-sm"><i class="fa-solid fa-download me-1"></i> Export Users CSV</a>
      </div>
      <div class="table-responsive">
        <table class="table table-dark table-hover fs-7 align-middle mb-0">
          <thead>
            <tr class="text-muted border-secondary">
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Access Status</th>
              <th>Referral Code</th>
              <th>Earnings</th>
              <th>Joined</th>
              <th class="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${users.map(u => `
              <tr class="border-secondary">
                <td>${u.id}</td>
                <td class="text-white fw-bold">${u.name}</td>
                <td>${u.email}</td>
                <td><span class="badge bg-secondary">${u.role}</span></td>
                <td>
                  <span class="badge ${u.isPaid ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'}">
                    ${u.isPaid ? 'PAID / PREMIUM' : 'FREE'}
                  </span>
                  ${u.isSuspended ? '<span class="badge bg-danger-subtle text-danger ms-1">SUSPENDED</span>' : ''}
                </td>
                <td><code>${u.referralCode || 'N/A'}</code></td>
                <td class="text-success">₹${u.referralEarnings || 0}</td>
                <td>${new Date(u.createdAt).toLocaleDateString()}</td>
                <td class="text-end">
                  ${u.isSuspended ? `
                    <button class="btn btn-sm btn-outline-success btn-user-action px-2 py-1" data-id="${u.id}" data-action="unsuspend"><i class="fa-solid fa-user-check"></i> Unsuspend</button>
                  ` : `
                    <button class="btn btn-sm btn-outline-danger btn-user-action px-2 py-1" data-id="${u.id}" data-action="suspend"><i class="fa-solid fa-user-slash"></i> Suspend</button>
                  `}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  adminRiskList: (risks) => {
    if (!risks || risks.length === 0) {
      return `<div class="text-center py-5 text-success"><i class="fa-solid fa-circle-check fa-2x mb-3"></i><p>No suspicious referral activities detected. Risk level clear.</p></div>`;
    }
    return `
      <div class="table-responsive">
        <table class="table table-dark table-hover fs-7 align-middle mb-0">
          <thead>
            <tr class="text-muted border-secondary">
              <th>Referrer User</th>
              <th>Referred User</th>
              <th>Referral Bounty</th>
              <th>Bounty Status</th>
              <th>Risk Score</th>
              <th>Risk Level</th>
              <th>Risk Reason</th>
            </tr>
          </thead>
          <tbody>
            ${risks.map(r => `
              <tr class="border-secondary">
                <td class="text-white">${r.referrerEmail}</td>
                <td class="text-white">${r.referredEmail}</td>
                <td class="text-success">₹${r.amount}</td>
                <td>
                  <span class="badge ${r.status === 'APPROVED' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}">
                    ${r.status}
                  </span>
                </td>
                <td class="fw-bold">${r.riskScore}%</td>
                <td>
                  <span class="badge ${r.riskLevel === 'HIGH' ? 'bg-danger text-white' : r.riskLevel === 'MEDIUM' ? 'bg-warning text-dark' : 'bg-info text-dark'}">
                     ${r.riskLevel}
                  </span>
                </td>
                <td class="text-danger-emphasis">${r.reasons.join(', ')}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  adminSettingsForm: (settings) => {
    return `
      <div class="row g-4">
        <div class="col-md-6">
          <div class="glass-panel p-4">
            <h5 class="text-white fw-bold mb-4"><i class="fa-solid fa-gears text-primary me-2"></i>Financial Configurations</h5>
            
            <div class="mb-3">
              <label class="form-label text-muted fs-8 uppercase">Product Premium Access Price (INR)</label>
              <div class="input-group">
                <span class="input-group-text bg-secondary border-0 text-white">₹</span>
                <input type="number" id="setting-PRODUCT_PRICE_INR" class="form-control glass-input" value="${settings.PRODUCT_PRICE_INR || 99}">
                <button class="btn btn-primary btn-save-setting" data-key="PRODUCT_PRICE_INR">Update</button>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="glass-panel p-4">
            <h5 class="text-white fw-bold mb-4"><i class="fa-solid fa-rectangle-ad text-warning me-2"></i>Advertising & SEO Meta Settings</h5>
            
            <div class="mb-3">
              <label class="form-label text-muted fs-8 uppercase">Google AdSense Publisher ID</label>
              <div class="input-group">
                <input type="text" id="setting-ADSENSE_PUBLISHER_ID" class="form-control glass-input" value="${settings.ADSENSE_PUBLISHER_ID || 'ca-pub-4662205173096609'}">
                <button class="btn btn-primary btn-save-setting" data-key="ADSENSE_PUBLISHER_ID">Update</button>
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label text-muted fs-8 uppercase">SEO Portal Global Meta Title</label>
              <div class="input-group">
                <input type="text" id="setting-SEO_META_TITLE" class="form-control glass-input" value="${settings.SEO_META_TITLE || 'PrepSpace - Premium Interview Preparation Tracker SaaS'}">
                <button class="btn btn-primary btn-save-setting" data-key="SEO_META_TITLE">Update</button>
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label text-muted fs-8 uppercase">SEO Portal Global Meta Description</label>
              <div class="input-group">
                <input type="text" id="setting-SEO_META_DESCRIPTION" class="form-control glass-input" value="${settings.SEO_META_DESCRIPTION || ''}">
                <button class="btn btn-primary btn-save-setting" data-key="SEO_META_DESCRIPTION">Update</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  adminAuditList: (logs) => {
    if (!logs || logs.length === 0) {
      return `<div class="text-center py-5 text-muted"><i class="fa-solid fa-clipboard-list fa-2x mb-3"></i><p>No administrative audits logged.</p></div>`;
    }
    return `
      <div class="table-responsive">
        <table class="table table-dark table-hover fs-7 align-middle mb-0">
          <thead>
            <tr class="text-muted border-secondary">
              <th>Timestamp</th>
              <th>Admin Email</th>
              <th>Action Taken</th>
              <th>Settings Key</th>
              <th>Before Value</th>
              <th>After Value</th>
              <th>IP Address</th>
            </tr>
          </thead>
          <tbody>
            ${logs.map(l => `
              <tr class="border-secondary">
                <td>${new Date(l.createdAt).toLocaleString()}</td>
                <td class="text-warning">${l.adminEmail}</td>
                <td class="text-white">${l.action}</td>
                <td><code>${l.targetKey || 'N/A'}</code></td>
                <td class="text-muted">${l.beforeValue || 'N/A'}</td>
                <td class="text-info">${l.afterValue || 'N/A'}</td>
                <td><code>${l.ipAddress || 'N/A'}</code></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  adminHealthReport: (health, webhooks) => {
    return `
      <div class="row g-4 mb-4">
        <div class="col-md-3">
          <div class="glass-panel p-4 text-center">
            <div class="text-muted fs-8 uppercase mb-2">Application Server</div>
            <h4 class="fw-bold ${health.appStatus === 'UP' ? 'text-success' : 'text-danger'} mb-0">
              <i class="fa-solid fa-circle-check me-2"></i>${health.appStatus}
            </h4>
          </div>
        </div>
        <div class="col-md-3">
          <div class="glass-panel p-4 text-center">
            <div class="text-muted fs-8 uppercase mb-2">PostgreSQL Database</div>
            <h4 class="fw-bold ${health.databaseStatus === 'UP' ? 'text-success' : 'text-danger'} mb-0">
               <i class="fa-solid fa-database me-2"></i>${health.databaseStatus}
            </h4>
          </div>
        </div>
        <div class="col-md-3">
          <div class="glass-panel p-4 text-center">
            <div class="text-muted fs-8 uppercase mb-2">Razorpay Gateway API</div>
            <h4 class="fw-bold ${health.paymentGatewayStatus === 'UP' ? 'text-success' : 'text-danger'} mb-0">
              <i class="fa-solid fa-credit-card me-2"></i>${health.paymentGatewayStatus}
            </h4>
          </div>
        </div>
        <div class="col-md-3">
          <div class="glass-panel p-4 text-center">
            <div class="text-muted fs-8 uppercase mb-2">System Uptime</div>
            <h4 class="text-white fw-bold mb-0">
              <i class="fa-solid fa-clock me-2"></i>${Math.floor(health.uptimeSeconds / 3600)}h ${Math.floor((health.uptimeSeconds % 3600) / 60)}m
            </h4>
          </div>
        </div>
      </div>

      <div class="glass-panel p-4">
        <h5 class="text-white fw-bold mb-3"><i class="fa-solid fa-network-wired text-info me-2"></i>Webhook Inbound Log Audit (Idempotent Webhooks)</h5>
        <div class="table-responsive">
          <table class="table table-dark table-hover fs-7 align-middle mb-0">
            <thead>
              <tr class="text-muted border-secondary">
                <th>Received At</th>
                <th>Event ID</th>
                <th>Event Type</th>
                <th>Status</th>
                <th>Error Details</th>
              </tr>
            </thead>
            <tbody>
              ${webhooks.length === 0 ? '<tr><td colspan="5" class="text-center text-muted">No webhook receipts recorded.</td></tr>' : 
                webhooks.map(w => `
                  <tr class="border-secondary">
                    <td>${new Date(w.receivedAt).toLocaleString()}</td>
                    <td class="text-info">${w.eventId}</td>
                    <td><code>${w.eventType}</code></td>
                    <td>
                      <span class="badge ${w.status === 'SUCCESS' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}">
                        ${w.status}
                      </span>
                    </td>
                    <td class="text-danger-emphasis">${w.errorTrace || '<span class="text-muted">None</span>'}</td>
                  </tr>
                `).join('')
              }
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  admin: (stats) => `
    <div class="container-fluid py-4">
      <div class="border-bottom border-secondary border-opacity-10 pb-4 mb-4 d-flex justify-content-between align-items-center">
        <div>
          <span class="badge bg-danger-subtle text-danger border border-danger-subtle px-3 py-2 rounded-pill mb-2">ADMIN PANEL</span>
          <h2 class="text-white fw-bold mb-0">Global Operations Panel</h2>
        </div>
        <button id="btn-admin-refresh" class="btn btn-glass btn-sm px-3"><i class="fa-solid fa-rotate me-1"></i> Sync</button>
      </div>

      <!-- Stats Grid -->
      <div class="row g-4 mb-5">
        <div class="col-md-4">
          <div class="glass-panel p-4">
            <div class="text-muted fs-8 uppercase tracking-wider mb-2">Total Users</div>
            <h3 class="text-white fw-bold mb-0">${stats.totalUsers}</h3>
            <div class="text-muted fs-9 mt-2">Registered student/admin profiles</div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="glass-panel p-4">
            <div class="text-muted fs-8 uppercase tracking-wider mb-2">Premium Subscribers</div>
            <h3 class="text-white fw-bold mb-0">${stats.paidUsers}</h3>
            <div class="text-muted fs-9 mt-2">Active Pro plan accounts</div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="glass-panel p-4">
            <div class="text-muted fs-8 uppercase tracking-wider mb-2">Gross Revenue</div>
            <h3 class="text-white fw-bold mb-0">₹${stats.totalRevenue}</h3>
            <div class="text-muted fs-9 mt-2">Lifetime ₹99 checkout sales</div>
          </div>
        </div>
      </div>

      <!-- Tabs Header -->
      <ul class="nav nav-tabs border-secondary border-opacity-25 mb-4">
        <li class="nav-item">
          <button class="nav-link active text-white bg-transparent border-0 border-bottom border-primary border-2 px-4 py-2" id="tab-users">Users</button>
        </li>
        <li class="nav-item">
          <button class="nav-link text-muted bg-transparent border-0 px-4 py-2" id="tab-payments">Payment Logs</button>
        </li>
        <li class="nav-item">
          <button class="nav-link text-muted bg-transparent border-0 px-4 py-2" id="tab-rules">Business Rules</button>
        </li>
        <li class="nav-item">
          <button class="nav-link text-muted bg-transparent border-0 px-4 py-2" id="tab-audit-logs">Audit Logs</button>
        </li>
        <li class="nav-item">
          <button class="nav-link text-muted bg-transparent border-0 px-4 py-2" id="tab-health">System Health</button>
        </li>
      </ul>

      <!-- Tab Content Area -->
      <div id="admin-tab-content">
        <!-- Injected Dynamically by app.js admin view builders -->
    </div>
  `,

  premiumLock: (featureName) => `
    <div class="row justify-content-center align-items-center py-5">
      <div class="col-md-8 col-lg-6 text-center">
        <div class="glass-panel p-5">
          <div class="text-warning mb-4"><i class="fa-solid fa-lock display-3"></i></div>
          <h4 class="text-white fw-bold mb-2">PrepPro Premium Feature</h4>
          <p class="text-muted mb-4">The <strong>${featureName}</strong> tool is exclusive to PrepPro members. Upgrade today to unlock full AI diagnostics, unlimited mock exams, and personalized guides.</p>
          
          <div class="bg-dark bg-opacity-25 p-3 rounded mb-4 text-start border border-secondary fs-8 text-muted">
            <h6 class="text-white fw-bold fs-7 mb-2"><i class="fa-solid fa-gem text-primary me-2"></i>What you get with PrepPro (₹99 one-time):</h6>
            <ul class="list-unstyled m-0">
              <li class="mb-1"><i class="fa-solid fa-check text-success me-1"></i> Unlimited AI ATS Resume Compliance Audits</li>
              <li class="mb-1"><i class="fa-solid fa-check text-success me-1"></i> Custom AI Study Planner & Weak Topic Diagnostic</li>
              <li class="mb-1"><i class="fa-solid fa-check text-success me-1"></i> Company-Specific AI Interview Guide Generator</li>
              <li class="mb-1"><i class="fa-solid fa-check text-success me-1"></i> Export candidate progress logs as PDF / Excel</li>
            </ul>
          </div>

          <a href="#/billing" class="btn btn-premium w-100 py-3 fs-6"><i class="fa-solid fa-circle-arrow-up me-1"></i> Upgrade to PrepPro Now</a>
        </div>
      </div>
    </div>
  `
};

// PrepSpace Automated Technical Assessment MCQ Bank & Dynamic Generator
const RAW_MCQ_DATA = {
  DSA: [
    { q: "What is the worst-case time complexity of QuickSort algorithm?", opts: ["O(N log N)", "O(N)", "O(N^2)", "O(log N)"], ans: 2, exp: "QuickSort degrades to O(N^2) when the pivot selected is always the minimum or maximum element." },
    { q: "Which data structure is best suited for Breadth-First Search (BFS)?", opts: ["Stack", "Queue", "Binary Search Tree", "Priority Queue"], ans: 1, exp: "BFS explores nodes level-by-level in FIFO order, which requires a Queue." },
    { q: "What is the average time complexity of searching in a well-distributed Hash Table?", opts: ["O(1)", "O(log N)", "O(N)", "O(N log N)"], ans: 0, exp: "Average hash table lookups occur in O(1) constant time with low load factor." },
    { q: "In a min-heap with N elements, what is the time complexity to extract the minimum element?", opts: ["O(1)", "O(log N)", "O(N)", "O(N log N)"], ans: 1, exp: "Extracting the min removes the root and restores heap property in O(log N) time." },
    { q: "Which algorithm finds single-source shortest paths in non-negative weighted graphs?", opts: ["Prim's Algorithm", "Kruskal's Algorithm", "Dijkstra's Algorithm", "Floyd-Warshall"], ans: 2, exp: "Dijkstra's Algorithm computes single-source shortest paths in O((V + E) log V)." },
    { q: "What is the time complexity of Floyd's Cycle-Finding Algorithm for linked lists?", opts: ["O(1)", "O(N) time and O(1) space", "O(N^2)", "O(log N)"], ans: 1, exp: "Uses slow and fast pointers to detect cycles in O(N) time with O(1) auxiliary space." },
    { q: "Which tree traversal visits the root node between the left and right subtrees?", opts: ["Pre-order", "In-order", "Post-order", "Level-order"], ans: 1, exp: "In-order traversal visits: Left -> Root -> Right. For BST, in-order produces sorted order." },
    { q: "What is the height of a balanced Binary Search Tree containing N nodes?", opts: ["O(N)", "O(log N)", "O(N log N)", "O(sqrt(N))"], ans: 1, exp: "Balanced BSTs (AVL, Red-Black) maintain height of O(log N)." },
    { q: "Which sorting algorithm is NOT stable by default?", opts: ["Merge Sort", "Insertion Sort", "Quick Sort", "Bubble Sort"], ans: 2, exp: "Standard QuickSort swaps non-adjacent identical elements across the pivot." },
    { q: "What is the time complexity of Kadane's algorithm for the Maximum Subarray problem?", opts: ["O(N^2)", "O(N log N)", "O(N)", "O(2^N)"], ans: 2, exp: "Kadane's algorithm finds the maximum subarray sum in a single linear pass O(N)." },
    { q: "What data structure is used to convert an Infix expression to Postfix format?", opts: ["Queue", "Stack", "Binary Tree", "Deque"], ans: 1, exp: "Dijkstra's Shunting-yard algorithm uses a Stack for operator precedence." },
    { q: "What is the maximum number of edges in an undirected simple graph with V vertices?", opts: ["V * (V - 1)", "V * (V - 1) / 2", "V^2", "2 * V"], ans: 1, exp: "Each vertex connects to V-1 vertices divided by 2 for undirected edges: V(V-1)/2." },
    { q: "What is the worst-case time complexity of Binary Search on a sorted array?", opts: ["O(1)", "O(N)", "O(log N)", "O(N log N)"], ans: 2, exp: "Binary Search halves the search space at each iteration, yielding O(log N) time." },
    { q: "Which algorithm finds the Minimum Spanning Tree using a Disjoint Set Union (DSU)?", opts: ["Kruskal's Algorithm", "Prim's Algorithm", "Bellman-Ford", "Floyd-Warshall"], ans: 0, exp: "Kruskal's sorts edges by weight and uses DSU to prevent cycle formation." },
    { q: "What is the amortized insertion time complexity for a dynamic array (like ArrayList)?", opts: ["O(N)", "O(log N)", "O(1)", "O(N^2)"], ans: 2, exp: "Resizing occurs geometrically, making the amortized cost per insertion O(1)." }
  ],
  Java: [
    { q: "In Java memory management, where are object instances allocated at runtime?", opts: ["Stack Memory", "Heap Memory", "Metaspace", "Program Counter Register"], ans: 1, exp: "All Java object instances and arrays are allocated on the Heap memory." },
    { q: "Which Java 8 feature allows passing behavior (functional interfaces) as method arguments?", opts: ["Lambda Expressions", "Generics", "Reflection", "Annotations"], ans: 0, exp: "Lambda expressions represent single-method Functional Interfaces concisely." },
    { q: "What happens if you declare a method as 'final' in a Java class?", opts: ["It cannot be overloaded", "It cannot be overridden by subclasses", "It must be static", "It cannot accept parameters"], ans: 1, exp: "A final method cannot be overridden by any child subclass." },
    { q: "Which collection class in Java is synchronized and thread-safe by default?", opts: ["ArrayList", "HashMap", "Vector", "HashSet"], ans: 2, exp: "Vector methods are synchronized, making it thread-safe." },
    { q: "What is the difference between '==' and '.equals()' for Java String objects?", opts: ["'==' checks memory address, '.equals()' checks character value", "Both check value", "'==' checks character values", "No difference"], ans: 0, exp: "'==' compares memory addresses, while .equals() compares character content." },
    { q: "What is the purpose of the 'volatile' keyword in Java multithreading?", opts: ["Locks the object monitor", "Ensures variable reads and writes are visible across threads without CPU caching", "Makes variable immutable", "Serializes object"], ans: 1, exp: "Volatile guarantees that changes are immediately visible in main memory across threads." },
    { q: "Which interface must a class implement to be used in a Java try-with-resources statement?", opts: ["Serializable", "Cloneable", "AutoCloseable", "Runnable"], ans: 2, exp: "try-with-resources requires classes implementing AutoCloseable or Closeable." },
    { q: "What is the default initial capacity and load factor of a Java HashMap?", opts: ["Capacity 10, Load Factor 0.5", "Capacity 16, Load Factor 0.75", "Capacity 32, Load Factor 0.8", "Capacity 8, Load Factor 1.0"], ans: 1, exp: "HashMap defaults to an initial capacity of 16 and a load factor of 0.75." },
    { q: "What is the parent class of all exceptions and errors in Java?", opts: ["java.lang.Exception", "java.lang.Error", "java.lang.Throwable", "java.lang.RuntimeException"], ans: 2, exp: "java.lang.Throwable is the root superclass of both Exception and Error." },
    { q: "In Spring Boot, which annotation is used to auto-wire dependencies by type?", opts: ["@Component", "@Autowired", "@Service", "@Repository"], ans: 1, exp: "@Autowired injects matching bean dependencies automatically." }
  ],
  SQL: [
    { q: "Which SQL clause is used to filter group records after an aggregate function is applied?", opts: ["WHERE", "HAVING", "GROUP BY", "ORDER BY"], ans: 1, exp: "HAVING filters aggregated groups, whereas WHERE filters individual rows before grouping." },
    { q: "What is the primary benefit of a Database Index (e.g., B-Tree Index)?", opts: ["Accelerates SELECT queries from O(N) to O(log N)", "Speeds up INSERTs", "Reduces disk storage", "Eliminates row locks"], ans: 0, exp: "Indexes speed up data retrieval queries from full table scans to logarithmic lookups." },
    { q: "What does the 'A' in ACID transaction properties stand for?", opts: ["Authentication", "Atomicity", "Availability", "Authorization"], ans: 1, exp: "Atomicity ensures all-or-nothing execution for database transaction operations." },
    { q: "Which SQL JOIN returns all rows from the left table and matching rows from the right table?", opts: ["INNER JOIN", "LEFT OUTER JOIN", "RIGHT OUTER JOIN", "CROSS JOIN"], ans: 1, exp: "LEFT JOIN retains all left-table rows, populating right-table columns with NULL if unmatched." },
    { q: "What is the highest normal form where every non-key attribute is non-transitively dependent on the primary key?", opts: ["1NF", "2NF", "3NF", "BCNF"], ans: 2, exp: "Third Normal Form (3NF) eliminates transitive functional dependencies on the primary key." },
    { q: "Which SQL constraint ensures that all values in a column are unique and not null?", opts: ["UNIQUE", "PRIMARY KEY", "FOREIGN KEY", "CHECK"], ans: 1, exp: "PRIMARY KEY enforces both UNIQUE and NOT NULL constraints on identity columns." },
    { q: "Which database isolation level prevents Dirty Reads, Non-Repeatable Reads, and Phantom Reads?", opts: ["READ COMMITTED", "READ UNCOMMITTED", "REPEATABLE READ", "SERIALIZABLE"], ans: 3, exp: "SERIALIZABLE is the strictest ANSI SQL isolation level, executing transactions sequentially." },
    { q: "What is the difference between TRUNCATE and DELETE in SQL?", opts: ["DELETE is DDL", "TRUNCATE is DDL that resets pages and cannot use WHERE", "TRUNCATE fires row triggers", "No difference"], ans: 1, exp: "TRUNCATE is a DDL command that rapidly deallocates data pages without row-level logging." },
    { q: "What type of NoSQL database is MongoDB?", opts: ["Key-Value store", "Document-Oriented (BSON)", "Column-Family store", "Graph database"], ans: 1, exp: "MongoDB stores semi-structured data as flexible BSON documents." }
  ],
  OS: [
    { q: "What is the difference between a Process and a Thread?", opts: ["A process has its own address space; threads within a process share memory", "Threads have private address space", "Processes cannot run concurrently", "There is no difference"], ans: 0, exp: "Processes are memory-isolated; threads share address space and heap memory within a process." },
    { q: "Which CPU scheduling algorithm gives the lowest average waiting time for a set of processes?", opts: ["FCFS", "Shortest Job First (SJF)", "Round Robin", "Priority Scheduling"], ans: 1, exp: "Shortest Job First (SJF) is mathematically optimal for minimizing average waiting time." },
    { q: "Which of the following is NOT one of Coffman's four necessary conditions for Deadlock?", opts: ["Mutual Exclusion", "Hold and Wait", "Preemption Allowed", "Circular Wait"], ans: 2, exp: "The condition is NO Preemption. Allowing preemption breaks deadlock immediately." },
    { q: "What is Thrashing in an Operating System?", opts: ["High CPU utilization", "OS spending more time swapping pages in/out of disk than executing instructions", "Disk defragmentation", "Buffer overflow"], ans: 1, exp: "Thrashing occurs when active memory exceeds physical RAM, causing constant page faults." },
    { q: "What is the role of the TLB (Translation Lookaside Buffer)?", opts: ["Instruction cache", "Hardware cache of recent virtual-to-physical address translations", "Disk scheduler", "Frame buffer"], ans: 1, exp: "The TLB is a fast hardware cache that accelerates virtual-to-physical page lookups." },
    { q: "Which system call in Unix creates a new duplicate child process?", opts: ["exec()", "fork()", "spawn()", "clone()"], ans: 1, exp: "fork() creates a child process with a copy-on-write duplicate of parent memory space." }
  ],
  CN: [
    { q: "At which layer of the OSI model do IP addressing and packet routing operate?", opts: ["Data Link (Layer 2)", "Network (Layer 3)", "Transport (Layer 4)", "Application (Layer 7)"], ans: 1, exp: "The Network Layer (Layer 3) handles IP addressing, routing, and packet forwarding." },
    { q: "What are the three packets exchanged in a TCP Three-Way Handshake?", opts: ["SYN, SYN-ACK, ACK", "ACK, SYN, FIN", "PING, PONG, ACK", "HELO, SYN, DATA"], ans: 0, exp: "TCP establishes connections via Client SYN -> Server SYN-ACK -> Client ACK." },
    { q: "What is the default port number for secure HTTPS communication?", opts: ["80", "8080", "443", "22"], ans: 2, exp: "Port 443 is the standard port for TLS/SSL encrypted HTTPS traffic." },
    { q: "What is the purpose of the Domain Name System (DNS)?", opts: ["Encrypts web traffic", "Translates human-readable domain names into machine IP addresses", "Filters spam", "Assigns MAC addresses"], ans: 1, exp: "DNS maps domain names (like stream-in.app) to machine-routable IP addresses." },
    { q: "Which HTTP status code signifies that a requested resource was Not Found?", opts: ["200 OK", "401 Unauthorized", "403 Forbidden", "404 Not Found"], ans: 3, exp: "404 indicates the requested URI path was not found on the server." },
    { q: "What protocol is used by the 'ping' utility to check network connectivity?", opts: ["TCP", "UDP", "ICMP", "ARP"], ans: 2, exp: "Ping uses ICMP Echo Request and Echo Reply packets to verify connectivity." }
  ],
  Python: [
    { q: "What is the Global Interpreter Lock (GIL) in CPython?", opts: ["A database lock", "A mutex that prevents multiple native threads from executing bytecodes simultaneously in CPython", "A code encryption tool", "A compiler optimizer"], ans: 1, exp: "CPython's GIL ensures thread safety by permitting only one thread to execute bytecode at once." },
    { q: "What is the primary difference between a Python List and a Tuple?", opts: ["Lists are mutable; Tuples are immutable", "Tuples are slower than lists", "Lists cannot hold strings", "Tuples cannot be indexed"], ans: 0, exp: "Lists are mutable, whereas Tuples are immutable and hashable." },
    { q: "Which keyword is used to create a Generator function in Python?", opts: ["return", "yield", "generate", "async"], ans: 1, exp: "yield pauses execution and yields intermediate values for iteration." },
    { q: "What is the output of bool([]) and bool([0]) in Python?", opts: ["False, False", "False, True", "True, True", "True, False"], ans: 1, exp: "An empty list [] is falsy (False); a non-empty list [0] is truthy (True)." }
  ]
};

function getMcqQuestions(category, count) {
  const requestedCount = count || 15;
  let pool = [];
  
  if (category && category !== 'ALL' && RAW_MCQ_DATA[category]) {
    pool = RAW_MCQ_DATA[category].map(item => ({ question: item.q, options: [...item.opts], answer: item.ans, explanation: item.exp }));
  } else {
    Object.keys(RAW_MCQ_DATA).forEach(cat => {
      RAW_MCQ_DATA[cat].forEach(item => {
        pool.push({ question: item.q, options: [...item.opts], answer: item.ans, explanation: item.exp, topic: cat });
      });
    });
  }

  // Fisher-Yates Shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  const result = [];
  for (let k = 0; k < requestedCount; k++) {
    const base = pool[k % pool.length];
    result.push({
      id: k + 1,
      category: base.topic || category || 'Technical Assessment',
      question: base.question,
      options: [...base.options],
      answer: base.answer,
      explanation: base.explanation
    });
  }

  return result;
}

if (typeof window !== 'undefined') {
  window.RAW_MCQ_DATA = RAW_MCQ_DATA;
  window.getMcqQuestions = getMcqQuestions;
}


