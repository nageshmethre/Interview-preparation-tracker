// components.js - View Templates for PrepSpace SaaS Application

const components = {
  // Moving Announcement Ticker (Top Banner) - Configurable dynamically from Admin Panel
  renderTopPromoTicker: (customConfig) => {
    let config = customConfig;
    if (!config) {
      try {
        const raw = localStorage.getItem('admin_announcement_ticker');
        if (raw) config = JSON.parse(raw);
      } catch (e) {}
    }
    const isActive = config ? config.active !== 'false' : true;
    if (!isActive) return '';

    const badge1 = (config && config.badge1) || 'TOP 50 PERK';
    const text1 = (config && config.text1) || 'Rank in the <strong class=\"text-white\">Top 50</strong> of any Mock Exam (Java, Python, C++, React, DSA) & win a <strong style=\"color: #fbbf24;\">100% Free Lifetime Pro Subscription!</strong>';
    const btn1 = (config && config.btn1) || 'Take Mock Exam →';
    const link1 = (config && config.link1) || '#/mock-exams';

    const badge2 = (config && config.badge2) || 'LEADERBOARD CHALLENGE';
    const text2 = (config && config.text2) || 'Compete with 2,400+ developers globally in real-time timed technical evaluations';
    const btn2 = (config && config.btn2) || 'Join Leaderboard →';
    const link2 = (config && config.link2) || '#/mock-exams';

    return `
      <div id="top-promo-banner" class="promo-ticker-wrapper" title="Hover to pause ticker">
        <div class="promo-ticker-track">
          <!-- Slide 1 -->
          <a href="${link1}" class="promo-ticker-item">
            <span class="badge rounded-pill font-monospace fw-bold" style="background: rgba(245, 158, 11, 0.18); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.35); font-size: 0.72rem;">
              <i class="fa-solid fa-trophy me-1"></i> ${badge1}
            </span>
            <span>${text1}</span>
            <span class="badge rounded-pill fw-bold text-dark px-2.5 py-1" style="background: #f59e0b; font-size: 0.75rem;">${btn1}</span>
          </a>

          <!-- Slide 2 -->
          <a href="${link2}" class="promo-ticker-item">
            <span class="badge rounded-pill font-monospace fw-bold" style="background: rgba(16, 185, 129, 0.18); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.35); font-size: 0.72rem;">
              <i class="fa-solid fa-fire me-1"></i> ${badge2}
            </span>
            <span>${text2}</span>
            <span class="badge rounded-pill fw-bold text-dark px-2.5 py-1" style="background: #10b981; font-size: 0.75rem;">${btn2}</span>
          </a>

          <!-- Slide 3 (Seamless Repeat) -->
          <a href="${link1}" class="promo-ticker-item">
            <span class="badge rounded-pill font-monospace fw-bold" style="background: rgba(245, 158, 11, 0.18); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.35); font-size: 0.72rem;">
              <i class="fa-solid fa-trophy me-1"></i> ${badge1}
            </span>
            <span>${text1}</span>
            <span class="badge rounded-pill fw-bold text-dark px-2.5 py-1" style="background: #f59e0b; font-size: 0.75rem;">${btn1}</span>
          </a>

          <!-- Slide 4 (Seamless Repeat) -->
          <a href="${link2}" class="promo-ticker-item">
            <span class="badge rounded-pill font-monospace fw-bold" style="background: rgba(16, 185, 129, 0.18); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.35); font-size: 0.72rem;">
              <i class="fa-solid fa-fire me-1"></i> ${badge2}
            </span>
            <span>${text2}</span>
            <span class="badge rounded-pill fw-bold text-dark px-2.5 py-1" style="background: #10b981; font-size: 0.75rem;">${btn2}</span>
          </a>
        </div>
      </div>
    `;
  },

  // Public SaaS Landing Page - Full Developer Grid Mesh Layout
  landing: () => `
    <div class="landing-page-mesh">
      <!-- Animated Moving Announcement Ticker (Side by Side) -->
      ${components.renderTopPromoTicker()}

      <!-- Vercel Minimalist Glass Navigation -->
      <nav class="navbar navbar-expand-lg navbar-dark py-3 sticky-top border-bottom border-secondary border-opacity-20" style="background: rgba(24, 24, 27, 0.88); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);">
        <div class="container-xl">
          <a class="navbar-brand d-flex align-items-center gap-2 text-decoration-none" href="#/">
            <img src="assets/prepspace_icon.png?v=5.8.8" alt="PrepSpace Logo" class="brand-logo-img" style="width: 36px; height: 36px; object-fit: contain;">
            <div class="d-flex flex-column text-start">
              <span class="fw-bold fs-5 text-white lh-1">PrepSpace</span>
              <span class="text-secondary" style="font-size: 0.65rem; letter-spacing: 0.8px; margin-top: 2px; font-family: 'Geist Mono', monospace;">(stream-in)</span>
            </div>
          </a>
          <div class="d-flex align-items-center gap-2 d-lg-none">
            <button class="btn btn-glass px-2.5 py-1.5 fs-7 d-inline-flex align-items-center gap-1.5 text-warning border-warning-subtle" onclick="window.UI.openDrawer('platform-drawer')" aria-label="Open Quick Navigation Drawer">
              <i class="fa-solid fa-sliders"></i>
            </button>
            <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
          </div>
          <div class="collapse navbar-collapse" id="navMenu">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center gap-1">
              <li class="nav-item"><a class="nav-link px-3 fs-7 text-secondary hover-white" href="#showcase">Platform</a></li>
              <li class="nav-item"><a class="nav-link px-3 fs-7 text-secondary hover-white" href="#features">Capabilities</a></li>
              <li class="nav-item"><a class="nav-link px-3 fs-7 text-secondary hover-white" href="#calculator">ROI Calculator</a></li>
              <li class="nav-item"><a class="nav-link px-3 fs-7 text-secondary hover-white" href="#pricing">Pricing</a></li>
              <li class="nav-item"><a class="nav-link px-3 fs-7 text-secondary hover-white" href="/about">About</a></li>
              <li class="nav-item ms-lg-3 d-flex align-items-center gap-2">
                <button class="btn btn-glass px-2.5 py-1.5 fs-7 d-none d-lg-inline-flex align-items-center gap-1.5 text-warning border-warning-subtle" onclick="window.UI.openDrawer('platform-drawer')" aria-label="Open Quick Navigation Drawer" title="Open Quick Navigation Drawer">
                  <i class="fa-solid fa-sliders"></i> <span class="d-none d-xl-inline">Quick View</span>
                </button>
                <a class="btn btn-glass px-3 py-1 fs-7 text-success border-success-subtle d-inline-flex align-items-center gap-1" href="https://stream-in.app/downloads/PrepSpace.apk" download="PrepSpace.apk" title="Direct Android APK Download">
                  <i class="fa-brands fa-android text-success"></i> <span class="d-none d-sm-inline">App</span>
                </a>
                ${(typeof state !== 'undefined' && state && state.token)
                  ? `<a class="btn btn-premium px-3 py-1 fs-7 fw-bold" href="#/dashboard">Dashboard <i class="fa-solid fa-arrow-right ms-1"></i></a>`
                  : `<a class="btn btn-glass px-3 py-1 fs-7" href="#/login">Log In</a>
                     <a class="btn btn-premium px-3 py-1 fs-7 fw-bold" href="#/register">Sign Up Free</a>`}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <!-- Master Hero Section -->
      <header class="ui-hero">
        <div class="ui-hero-bg" aria-hidden="true">
          <div class="ui-hero-glow"></div>
          <div class="ui-hero-grid"></div>
        </div>

        <div class="container-xl ui-hero-content">
          <a href="#features" class="ui-hero-pill">
            <span class="ui-hero-pill-badge">NEW</span>
            <span class="ui-hero-pill-text">50-MCQ Timed Exam Engine & AI ATS Audit is Live</span>
            <i class="fa-solid fa-arrow-right ui-hero-pill-arrow"></i>
          </a>

          <h1 class="ui-hero-title">
            The Career Engine for <br class="d-none d-md-block"/>
            <span class="ui-text-gradient">Elite Tech Placements</span>
          </h1>

          <p class="ui-hero-desc">
            Master Data Structures & Algorithms, test your knowledge with 50-MCQ timed technical screens, audit your resume against AI ATS systems, and manage your entire placement pipeline in one unified platform.
          </p>

          <div class="ui-hero-actions">
            <a href="#/register" class="ui-btn-primary">
              <i class="fa-solid fa-rocket"></i>
              <span>Initialize Space Free</span>
            </a>
            <a href="#showcase" class="ui-btn-secondary">
              <i class="fa-solid fa-layer-group text-warning"></i>
              <span>Explore Live Platform</span>
            </a>
          </div>

          <!-- Master Marquee: Social Proof Strip with Seamless Loop -->
          <div class="pt-4 border-top border-secondary border-opacity-10 mt-2">
            <p class="text-muted small text-uppercase tracking-wider mb-3 fs-8 font-monospace">
              Preparing Candidates for Engineering Roles at
            </p>
            <div class="ui-marquee" aria-label="Top Tech Employers Placement Marquee">
              <div class="ui-marquee-track">
                <!-- Group 1 -->
                <div class="ui-marquee-group">
                  <span class="ui-marquee-item"><i class="fa-brands fa-google text-danger"></i> Google</span>
                  <span class="ui-marquee-item"><i class="fa-brands fa-microsoft text-primary"></i> Microsoft</span>
                  <span class="ui-marquee-item"><i class="fa-brands fa-amazon text-warning"></i> Amazon</span>
                  <span class="ui-marquee-item"><i class="fa-brands fa-meta text-info"></i> Meta</span>
                  <span class="ui-marquee-item"><i class="fa-brands fa-uber text-white"></i> Uber</span>
                  <span class="ui-marquee-item"><i class="fa-brands fa-stripe text-indigo"></i> Stripe</span>
                  <span class="ui-marquee-item"><i class="fa-brands fa-atlassian text-primary"></i> Atlassian</span>
                  <span class="ui-marquee-item"><i class="fa-brands fa-apple text-white"></i> Apple</span>
                  <span class="ui-marquee-item"><i class="fa-solid fa-n text-danger"></i> Netflix</span>
                </div>
                <!-- Group 2 (Duplicated for Seamless Infinite Loop) -->
                <div class="ui-marquee-group" aria-hidden="true">
                  <span class="ui-marquee-item"><i class="fa-brands fa-google text-danger"></i> Google</span>
                  <span class="ui-marquee-item"><i class="fa-brands fa-microsoft text-primary"></i> Microsoft</span>
                  <span class="ui-marquee-item"><i class="fa-brands fa-amazon text-warning"></i> Amazon</span>
                  <span class="ui-marquee-item"><i class="fa-brands fa-meta text-info"></i> Meta</span>
                  <span class="ui-marquee-item"><i class="fa-brands fa-uber text-white"></i> Uber</span>
                  <span class="ui-marquee-item"><i class="fa-brands fa-stripe text-indigo"></i> Stripe</span>
                  <span class="ui-marquee-item"><i class="fa-brands fa-atlassian text-primary"></i> Atlassian</span>
                  <span class="ui-marquee-item"><i class="fa-brands fa-apple text-white"></i> Apple</span>
                  <span class="ui-marquee-item"><i class="fa-solid fa-n text-danger"></i> Netflix</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

    <main>
      <!-- 3D Interactive Floating Dashboard Showcase (Stripe-Style) -->
      <section id="showcase" class="container py-5">
        <div class="text-center mb-5">
          <span class="badge bg-indigo-subtle text-primary border border-primary-subtle px-3 py-1 rounded-pill mb-2">INTERACTIVE WORKSPACE</span>
          <h2 class="display-5 fw-extrabold text-white mb-2">Built for Relentless Focus & Speed</h2>
          <p class="text-muted fs-5">A real-time control room for your technical preparation journey.</p>
        </div>

        <div class="dashboard-mockup-wrapper">
          <div class="mockup-window">
            <div class="mockup-header">
              <div class="window-dots">
                <span class="window-dot red"></span>
                <span class="window-dot yellow"></span>
                <span class="window-dot green"></span>
              </div>
              <div class="mockup-url-bar">https://stream-in.app/#/dashboard</div>
              <div class="text-muted fs-8"><i class="fa-solid fa-shield-halved text-success me-1"></i> TLS 1.3 Verified</div>
            </div>

            <!-- Inside Mockup Viewport -->
            <div class="p-4 p-md-5" style="background: #222226;">
              <!-- Live Metrics Strip -->
              <div class="row g-3 mb-4">
                <div class="col-6 col-md-3">
                  <div class="p-3 rounded-3 border border-secondary border-opacity-20" style="background: #1c1c20; border-color: #323238; text-start">
                    <span class="text-muted fs-8 uppercase">Readiness Score</span>
                    <h3 class="text-white fw-bold mt-1 mb-0 gradient-text-stripe">96.8%</h3>
                    <small class="text-success fs-8"><i class="fa-solid fa-arrow-trend-up me-1"></i>+12% this week</small>
                  </div>
                </div>
                <div class="col-6 col-md-3">
                  <div class="p-3 rounded-3 border border-secondary border-opacity-20" style="background: #1c1c20; border-color: #323238; text-start">
                    <span class="text-muted fs-8 uppercase">DSA Streaks</span>
                    <h3 class="text-warning fw-bold mt-1 mb-0"><i class="fa-solid fa-fire me-1"></i>18 Days</h3>
                    <small class="text-muted fs-8">240 Problems Solved</small>
                  </div>
                </div>
                <div class="col-6 col-md-3">
                  <div class="p-3 rounded-3 border border-secondary border-opacity-20" style="background: #1c1c20; border-color: #323238; text-start">
                    <span class="text-muted fs-8 uppercase">50-MCQ Exam Grade</span>
                    <h3 class="text-info fw-bold mt-1 mb-0">50 / 50</h3>
                    <small class="text-success fs-8">100% Top Percentile</small>
                  </div>
                </div>
                <div class="col-6 col-md-3">
                  <div class="p-3 rounded-3 border border-secondary border-opacity-20" style="background: #1c1c20; border-color: #323238; text-start">
                    <span class="text-muted fs-8 uppercase">Active Pipeline</span>
                    <h3 class="text-success fw-bold mt-1 mb-0">4 Offers</h3>
                    <small class="text-muted fs-8">8 Companies In Review</small>
                  </div>
                </div>
              </div>

              <!-- Interactive Tabs & Preview Deck (Supabase-Style) -->
              <div class="row g-4 text-start">
                <div class="col-lg-4 d-flex flex-column gap-2">
                  <button class="feature-tab-btn active" onclick="window.switchLandingTab('tab-exam', this)">
                    <i class="fa-solid fa-stopwatch-20 text-primary fs-5"></i>
                    <div>
                      <div class="text-white fw-bold">50-MCQ Exam Engine</div>
                      <small class="text-muted fs-8">Full-length timed technical testing</small>
                    </div>
                  </button>

                  <button class="feature-tab-btn" onclick="window.switchLandingTab('tab-dsa', this)">
                    <i class="fa-solid fa-code-branch text-success fs-5"></i>
                    <div>
                      <div class="text-white fw-bold">DSA Problem Matrix</div>
                      <small class="text-muted fs-8">Track LeetCode, Striver & NeetCode</small>
                    </div>
                  </button>

                  <button class="feature-tab-btn" onclick="window.switchLandingTab('tab-ai', this)">
                    <i class="fa-solid fa-brain text-secondary fs-5"></i>
                    <div>
                      <div class="text-white fw-bold">AI Career & ATS Audit</div>
                      <small class="text-muted fs-8">Tailored company prompt guides</small>
                    </div>
                  </button>

                  <button class="feature-tab-btn" onclick="window.switchLandingTab('tab-kanban', this)">
                    <i class="fa-solid fa-table-columns text-warning fs-5"></i>
                    <div>
                      <div class="text-white fw-bold">Placement Kanban Pipeline</div>
                      <small class="text-muted fs-8">End-to-end recruitment tracking</small>
                    </div>
                  </button>
                </div>

                <!-- Tab Preview Canvas -->
                <div class="col-lg-8">
                  <div class="glass-panel p-4 h-100 border-primary border-opacity-25" id="landing-tab-display">
                    <!-- Default Tab: Exam Engine -->
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
                        <i class="fa-solid fa-circle-check me-2"></i><strong>Instant System Check:</strong> Correct! AVL trees maintain strict height balance guaranteeing O(log n) lookups. +10 Points awarded!
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Bento Grid Features Section -->
      <section id="features" class="container py-5">
        <div class="text-center mb-5">
          <span class="badge bg-indigo-subtle text-primary border border-primary-subtle px-3 py-1 rounded-pill mb-2">COMPLETE ECOSYSTEM</span>
          <h2 class="display-5 fw-extrabold text-white mb-3">Engineered for Technical Mastery</h2>
          <p class="text-muted fs-5">Every single feature designed to give you the competitive edge in interviews.</p>
        </div>

        <div class="row g-4">
          <div class="col-md-6 col-lg-4">
            <div class="bento-card">
              <div class="feature-icon mb-3 text-primary fs-2"><i class="fa-solid fa-stopwatch-20"></i></div>
              <h3 class="text-white h5 fw-bold mb-2">50-MCQ Timed Exam Engine</h3>
              <p class="text-muted fs-7 mb-0">Experience realistic, timed screening exams across DSA, Java, SQL, and System Design with automatic scoring and detailed review logs.</p>
            </div>
          </div>

          <div class="col-md-6 col-lg-4">
            <div class="bento-card">
              <div class="feature-icon mb-3 text-cyan fs-2"><i class="fa-solid fa-chart-line"></i></div>
              <h3 class="text-white h5 fw-bold mb-2">DSA Matrix & Heatmaps</h3>
              <p class="text-muted fs-7 mb-0">Log problems by topic, track difficulty ratios (Easy/Medium/Hard), and maintain daily streak momentum with interactive visual heatmaps.</p>
            </div>
          </div>

          <div class="col-md-6 col-lg-4">
            <div class="bento-card">
              <div class="feature-icon mb-3 text-secondary fs-2"><i class="fa-solid fa-brain"></i></div>
              <h3 class="text-white h5 fw-bold mb-2">AI Career & ATS Audit</h3>
              <p class="text-muted fs-7 mb-0">Generate personalized 30-to-90-day study roadmaps, company-specific prompt guides, and ATS resume audits tailored for top tech employers.</p>
            </div>
          </div>

          <div class="col-md-6 col-lg-4">
            <div class="bento-card">
              <div class="feature-icon mb-3 text-success fs-2"><i class="fa-solid fa-kanban"></i></div>
              <h3 class="text-white h5 fw-bold mb-2">Placement Kanban Board</h3>
              <p class="text-muted fs-7 mb-0">Move applications seamlessly through Wishlist, Applied, Interviewing, and Offered stages with compensation tracking and interview dates.</p>
            </div>
          </div>

          <div class="col-md-6 col-lg-4">
            <div class="bento-card">
              <div class="feature-icon mb-3 text-warning fs-2"><i class="fa-solid fa-medal"></i></div>
              <h3 class="text-white h5 fw-bold mb-2">Verified Academy Credentials</h3>
              <p class="text-muted fs-7 mb-0">Earn verifiable certificates upon curriculum mastery and share your authenticated credentials directly on LinkedIn and your resume.</p>
            </div>
          </div>

          <div class="col-md-6 col-lg-4">
            <div class="bento-card">
              <div class="feature-icon mb-3 text-danger fs-2"><i class="fa-solid fa-desktop"></i></div>
              <h3 class="text-white h5 fw-bold mb-2">Desktop Client & Cloud Sync</h3>
              <p class="text-muted fs-7 mb-0">Native Java Swing desktop client paired with real-time cloud synchronization for zero latency and offline coding sessions.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Interactive Preparation ROI Calculator -->
      <section id="calculator" class="container py-5">
        <div class="p-4 p-md-5 rounded-4 border border-secondary border-opacity-20" style="background: #222226; border-color: #323238;">
          <div class="row align-items-center g-4">
            <div class="col-lg-6 text-start">
              <span class="badge bg-primary bg-opacity-25 text-primary border border-primary-subtle px-3 py-1 rounded-pill mb-3">READINESS SIMULATOR</span>
              <h2 class="display-6 fw-extrabold text-white mb-3">Calculate Your Interview Readiness</h2>
              <p class="text-muted fs-7 mb-4">Adjust your daily study pace and preparation timeframe to simulate your total solved problem forecast and target readiness score.</p>
              
              <div class="mb-4">
                <div class="d-flex justify-content-between text-white fs-7 mb-1">
                  <span>Questions Practiced Per Day</span>
                  <strong id="calc-questions-val" class="text-primary">5 Problems / day</strong>
                </div>
                <input type="range" class="calc-slider" id="calc-questions" min="1" max="20" value="5" oninput="window.updateRoiCalculator()">
              </div>

              <div class="mb-2">
                <div class="d-flex justify-content-between text-white fs-7 mb-1">
                  <span>Preparation Timeframe</span>
                  <strong id="calc-weeks-val" class="text-cyan">8 Weeks</strong>
                </div>
                <input type="range" class="calc-slider" id="calc-weeks" min="2" max="24" value="8" oninput="window.updateRoiCalculator()">
              </div>
            </div>

            <div class="col-lg-6">
              <div class="row g-3 text-center">
                <div class="col-sm-6">
                  <div class="p-4 rounded-3 glass-panel border-primary">
                    <span class="text-muted fs-8 uppercase">Projected Solved</span>
                    <h2 class="display-5 fw-extrabold text-white mt-2 mb-0" id="calc-total-problems">280</h2>
                    <small class="text-success fs-8"><i class="fa-solid fa-code me-1"></i>Mastery Milestone</small>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="p-4 rounded-3 glass-panel border-success">
                    <span class="text-muted fs-8 uppercase">Readiness Level</span>
                    <h2 class="display-5 fw-extrabold text-success mt-2 mb-0" id="calc-readiness-score">92%</h2>
                    <small class="text-muted fs-8">FAANG-Ready Tier</small>
                  </div>
                </div>
                <div class="col-12">
                  <div class="p-3 rounded-3 border border-secondary border-opacity-20" style="background: #1c1c20; border-color: #323238; text-start d-flex align-items-center justify-content-between">
                    <div>
                      <span class="text-white fw-bold fs-7">Estimated Offer Probability</span>
                      <p class="text-muted fs-8 mb-0" id="calc-odds-desc">Top 5% Placement Performance Group</p>
                    </div>
                    <span class="badge bg-success px-3 py-2 fs-6 fw-bold" id="calc-odds-val">94% Probability</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Pricing Section (Stripe-Style Cards) -->
      <section id="pricing" class="container py-5">
        <div class="text-center mb-5">
          <span class="badge bg-indigo-subtle text-primary border border-primary-subtle px-3 py-1 rounded-pill mb-2">SIMPLE & TRANSPARENT</span>
          <h2 class="display-5 fw-extrabold text-white mb-3">Straightforward Pricing</h2>
          <p class="text-muted fs-5">Invest in your career with a single one-time payment. No hidden monthly subscriptions.</p>
        </div>

        <div class="row g-4 justify-content-center">
          <!-- Free Tier -->
          <div class="col-md-6 col-lg-5 col-xl-4">
            <div class="glass-panel p-4 h-100 d-flex flex-column text-start">
              <div>
                <h3 class="text-white h5 fw-bold mb-1">PrepFree</h3>
                <p class="text-muted fs-8 mb-3">Essential tools to start tracking your daily prep</p>
                <div class="my-3"><span class="display-6 fw-extrabold text-white">₹0</span><span class="text-muted fs-8"> / lifetime</span></div>
                <ul class="list-unstyled text-start mb-4 text-muted fs-8 d-flex flex-column gap-2">
                  <li><i class="fa-solid fa-check text-success me-2"></i> Access to Core Question Bank</li>
                  <li><i class="fa-solid fa-check text-success me-2"></i> Log Solved Problems & Streaks</li>
                  <li><i class="fa-solid fa-check text-success me-2"></i> Standard Placement Kanban</li>
                  <li><i class="fa-solid fa-check text-success me-2"></i> Basic Progress Graphs</li>
                </ul>
              </div>
              <a href="#/register" class="btn btn-glass w-100 py-2 fs-7 fw-bold mt-auto">Get Started Free</a>
            </div>
          </div>

          <!-- Pro Tier -->
          <div class="col-md-6 col-lg-5 col-xl-4">
            <div class="glass-panel p-4 h-100 d-flex flex-column text-start border-primary position-relative" style="box-shadow: 0 0 35px var(--accent-glow);">
              <div class="badge bg-primary text-white border border-primary-subtle px-3 py-1 rounded-pill position-absolute top-0 start-50 translate-middle fw-bold fs-9">
                MOST POPULAR
              </div>
              <div>
                <h3 class="text-white h5 fw-bold mb-1 mt-1">PrepPro</h3>
                <p class="text-indigo fs-8 mb-3">Recommended for Active Jobseekers & Students</p>
                <div class="my-3"><span class="display-6 fw-extrabold text-white">₹399</span><span class="text-muted fs-8"> / one-time lifetime</span></div>
                <ul class="list-unstyled text-start mb-4 text-muted fs-8 d-flex flex-column gap-2">
                  <li><i class="fa-solid fa-check text-success me-2"></i> <strong>Unlimited 50-MCQ Timed Exams</strong></li>
                  <li><i class="fa-solid fa-check text-success me-2"></i> <strong>AI ATS Resume & Keyword Audit</strong></li>
                  <li><i class="fa-solid fa-check text-success me-2"></i> <strong>AI Custom Study Planners</strong></li>
                  <li><i class="fa-solid fa-check text-success me-2"></i> <strong>Company Interview Guides & Prompts</strong></li>
                  <li><i class="fa-solid fa-check text-success me-2"></i> <strong>Export Excel / PDF Progress Reports</strong></li>
                  <li><i class="fa-solid fa-check text-success me-2"></i> Verified Completion Certificates</li>
                </ul>
              </div>
              <a href="#/register" class="btn btn-premium w-100 py-2 fs-7 fw-bold mt-auto"><i class="fa-solid fa-gem me-2"></i>Upgrade to PrepPro Access</a>
            </div>
          </div>
        </div>
      </section>

      <!-- Master Accordion: Frequently Asked Questions -->
      <section class="ui-section">
        <div class="container-md text-center mb-5">
          <span class="badge bg-warning bg-opacity-15 text-warning border border-warning-subtle px-3 py-1 rounded-pill mb-2 font-monospace fs-8">KNOWLEDGE BASE</span>
          <h2 class="display-6 fw-bold text-white mb-2">Frequently Asked Questions</h2>
          <p class="text-muted fs-6">Everything you need to know about PrepSpace features, exams, and platform lifetime access.</p>
        </div>
        <div class="container-md">
          <div class="ui-accordion" id="landingFaq" role="region" aria-label="Frequently Asked Questions">
            <!-- Item 1 (Active by default) -->
            <div class="ui-accordion-item active" id="faq-item-1">
              <h3 class="ui-accordion-header">
                <button class="ui-accordion-button" type="button" aria-expanded="true" aria-controls="faq-body-1" id="faq-btn-1" onclick="window.UI.toggleAccordion(this)">
                  <span class="d-flex align-items-center gap-2.5">
                    <i class="fa-solid fa-circle-question text-warning fs-6"></i>
                    <span>How do the 50-MCQ Mock Exams work?</span>
                  </span>
                  <span class="ui-accordion-icon"><i class="fa-solid fa-chevron-down"></i></span>
                </button>
              </h3>
              <div id="faq-body-1" class="ui-accordion-collapse" role="region" aria-labelledby="faq-btn-1">
                <div class="ui-accordion-body">
                  <div class="ui-accordion-content">
                    PrepSpace generates a balanced 50-question examination covering Data Structures, Algorithms, Core Java, OOP, and Database concepts. The system auto-grades your submission instantly, calculates exact percentile marks, and records your evaluation score in your permanent profile dashboard.
                  </div>
                </div>
              </div>
            </div>

            <!-- Item 2 -->
            <div class="ui-accordion-item" id="faq-item-2">
              <h3 class="ui-accordion-header">
                <button class="ui-accordion-button" type="button" aria-expanded="false" aria-controls="faq-body-2" id="faq-btn-2" onclick="window.UI.toggleAccordion(this)">
                  <span class="d-flex align-items-center gap-2.5">
                    <i class="fa-solid fa-circle-question text-warning fs-6"></i>
                    <span>Is the ₹399 PrepPro payment a recurring subscription?</span>
                  </span>
                  <span class="ui-accordion-icon"><i class="fa-solid fa-chevron-down"></i></span>
                </button>
              </h3>
              <div id="faq-body-2" class="ui-accordion-collapse" role="region" aria-labelledby="faq-btn-2">
                <div class="ui-accordion-body">
                  <div class="ui-accordion-content">
                    No. PrepPro is a single one-time payment of ₹399 with lifetime access. You get unlimited 50-MCQ timed exams, AI ATS resume audits, verified certificates, and all future updates without ever being billed again.
                  </div>
                </div>
              </div>
            </div>

            <!-- Item 3 -->
            <div class="ui-accordion-item" id="faq-item-3">
              <h3 class="ui-accordion-header">
                <button class="ui-accordion-button" type="button" aria-expanded="false" aria-controls="faq-body-3" id="faq-btn-3" onclick="window.UI.toggleAccordion(this)">
                  <span class="d-flex align-items-center gap-2.5">
                    <i class="fa-solid fa-circle-question text-warning fs-6"></i>
                    <span>Can I use PrepSpace offline or on desktop?</span>
                  </span>
                  <span class="ui-accordion-icon"><i class="fa-solid fa-chevron-down"></i></span>
                </button>
              </h3>
              <div id="faq-body-3" class="ui-accordion-collapse" role="region" aria-labelledby="faq-btn-3">
                <div class="ui-accordion-body">
                  <div class="ui-accordion-content">
                    Yes. We provide a complete Java Swing desktop client that connects directly to the tracker database for lightning-fast, offline placement management and offline coding practice with automated cloud synchronization.
                  </div>
                </div>
              </div>
            </div>

            <!-- Item 4 -->
            <div class="ui-accordion-item" id="faq-item-4">
              <h3 class="ui-accordion-header">
                <button class="ui-accordion-button" type="button" aria-expanded="false" aria-controls="faq-body-4" id="faq-btn-4" onclick="window.UI.toggleAccordion(this)">
                  <span class="d-flex align-items-center gap-2.5">
                    <i class="fa-solid fa-circle-question text-warning fs-6"></i>
                    <span>How does the AI Resume & ATS Audit score my profile?</span>
                  </span>
                  <span class="ui-accordion-icon"><i class="fa-solid fa-chevron-down"></i></span>
                </button>
              </h3>
              <div id="faq-body-4" class="ui-accordion-collapse" role="region" aria-labelledby="faq-btn-4">
                <div class="ui-accordion-body">
                  <div class="ui-accordion-content">
                    Our AI ATS engine analyzes your resume keywords against live software engineering job descriptions from Tier-1 tech employers. It flags missing skills, quantifies impact metrics using the Google XYZ formula, and gives you actionable recommendations to pass automated ATS filters.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Call to Action Banner -->
      <section class="container py-5">
        <div class="cta-banner-stripe text-center">
          <h2 class="display-5 fw-extrabold text-white mb-3">Accelerate Your Placement Preparation Today</h2>
          <p class="text-secondary fs-5 mb-4 mx-auto" style="max-width: 600px;">Join thousands of engineers organizing their daily coding routines and landing top software engineering offers.</p>
          <a href="#/register" class="btn btn-premium btn-lg px-5 py-3 fs-5 fw-bold shadow-lg">
            <i class="fa-solid fa-rocket me-2"></i>Get Started with PrepSpace Free
          </a>
        </div>
      </section>

      <!-- Google AdSense Multiplex Ad Unit -->
      <div class="container my-4">
        <div class="glass-panel p-3">
          <ins class="adsbygoogle"
               style="display:block"
               data-ad-format="autorelaxed"
               data-ad-client="ca-pub-4662205173096609"
               data-ad-slot="3928140249"></ins>
        </div>
      </div>
    </main>

    <!-- Google-Inspired Production Enterprise Footer -->
    <footer class="py-5 border-top border-secondary-subtle border-opacity-10 mt-5 position-relative">
      <div class="position-absolute top-0 start-0 end-0" style="height: 1px; background: #323238;"></div>
      <div class="container pt-3">
        <div class="row g-4 justify-content-between mb-5">
          <!-- Brand & Mission Column -->
          <div class="col-lg-3 text-start">
            <div class="d-flex align-items-center gap-2 mb-3">
              <img src="assets/prepspace_icon.png?v=5.8.8" alt="PrepSpace Logo" style="width: 38px; height: 38px; object-fit: contain;">
              <div class="d-flex flex-column text-start">
                <span class="text-white fw-bold fs-5 lh-1">PrepSpace</span>
                <span class="text-primary fw-semibold" style="font-size: 0.65rem; letter-spacing: 0.5px;">(stream-in.app)</span>
              </div>
            </div>
            <p class="text-muted fs-7 mb-3" style="max-width: 300px;">The unified career intelligence, technical interview preparation & AI mock assessment SaaS for developers worldwide.</p>
            <div class="google-dots d-flex gap-1 mb-2">
              <span style="width: 8px; height: 8px; border-radius: 50%; background: #4285F4;"></span>
              <span style="width: 8px; height: 8px; border-radius: 50%; background: #EA4335;"></span>
              <span style="width: 8px; height: 8px; border-radius: 50%; background: #FBBC05;"></span>
              <span style="width: 8px; height: 8px; border-radius: 50%; background: #34A853;"></span>
            </div>
            <div class="d-flex align-items-center gap-2 text-success fs-8">
              <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:#10b981;"></span>
              <span>All Systems Operational (Zero-Trust)</span>
            </div>
          </div>

          <!-- Column 2: Platform & Learning -->
          <div class="col-6 col-md-3 col-lg-2 text-start">
            <h6 class="text-white fw-bold mb-3 fs-7 uppercase" style="letter-spacing: 0.6px;"><i class="fa-solid fa-layer-group text-primary me-1.5"></i> Platform</h6>
            <ul class="list-unstyled fs-7 d-flex flex-column gap-2 text-muted">
              <li><a href="#showcase" class="text-muted text-decoration-none hover-white">Mock Exams</a></li>
              <li><a href="#features" class="text-muted text-decoration-none hover-white">DSA Matrix</a></li>
              <li><a href="#features" class="text-muted text-decoration-none hover-white">ATS Resume AI</a></li>
              <li><a href="#pricing" class="text-muted text-decoration-none hover-white">Pro Pricing</a></li>
              <li><a href="#/courses" class="text-muted text-decoration-none hover-white">LMS Courses</a></li>
              <li><a href="#/onboarding" class="text-muted text-decoration-none hover-white">Onboarding Tour</a></li>
            </ul>
          </div>

          <!-- Column 3: Legal & Governance -->
          <div class="col-6 col-md-3 col-lg-2 text-start">
            <h6 class="text-white fw-bold mb-3 fs-7 uppercase" style="letter-spacing: 0.6px;"><i class="fa-solid fa-scale-balanced text-primary me-1.5"></i> Legal</h6>
            <ul class="list-unstyled fs-7 d-flex flex-column gap-2 text-muted">
              <li><a href="#/privacy" class="text-muted text-decoration-none hover-white">Privacy Policy</a></li>
              <li><a href="#/terms" class="text-muted text-decoration-none hover-white">Terms of Service</a></li>
              <li><a href="#/cookies" class="text-muted text-decoration-none hover-white">Cookie Policy</a></li>
              <li><a href="javascript:void(0)" onclick="openCookiePreferencesModal()" class="text-muted text-decoration-none hover-white">Cookie Preferences</a></li>
              <li><a href="#/dpa" class="text-muted text-decoration-none hover-white">Data Processing (DPA)</a></li>
              <li><a href="#/disclaimer" class="text-muted text-decoration-none hover-white">Legal Disclaimer</a></li>
              <li><a href="#/accessibility" class="text-muted text-decoration-none hover-white">Accessibility</a></li>
            </ul>
          </div>

          <!-- Column 4: Billing & Consumer Rights -->
          <div class="col-6 col-md-3 col-lg-2 text-start">
            <h6 class="text-white fw-bold mb-3 fs-7 uppercase" style="letter-spacing: 0.6px;"><i class="fa-solid fa-credit-card text-success me-1.5"></i> Billing & Rights</h6>
            <ul class="list-unstyled fs-7 d-flex flex-column gap-2 text-muted">
              <li><a href="#/refund-policy" class="text-muted text-decoration-none hover-white">7-Day Refund Policy</a></li>
              <li><a href="#/cancellation-policy" class="text-muted text-decoration-none hover-white">Cancellation Policy</a></li>
              <li><a href="#/shipping-policy" class="text-muted text-decoration-none hover-white">Digital Delivery</a></li>
              <li><a href="#/return-policy" class="text-muted text-decoration-none hover-white">Return & Exchange</a></li>
              <li><a href="javascript:void(0)" onclick="openCancelSubscriptionModal()" class="text-muted text-decoration-none hover-white">Cancel Subscription</a></li>
            </ul>
          </div>

          <!-- Column 5: Trust, Security & Support -->
          <div class="col-6 col-md-3 col-lg-3 text-start">
            <h6 class="text-white fw-bold mb-3 fs-7 uppercase" style="letter-spacing: 0.6px;"><i class="fa-solid fa-shield-halved text-warning me-1.5"></i> Trust & Security</h6>
            <ul class="list-unstyled fs-7 d-flex flex-column gap-2 text-muted mb-3">
              <li><a href="#/security" class="text-muted text-decoration-none hover-white">Security Architecture</a></li>
              <li><a href="#/acceptable-use" class="text-muted text-decoration-none hover-white">Acceptable Use Policy</a></li>
              <li><a href="#/responsible-disclosure" class="text-muted text-decoration-none hover-white">Responsible Disclosure</a></li>
              <li><a href="#/community-guidelines" class="text-muted text-decoration-none hover-white">Community Guidelines</a></li>
              <li><a href="#/help" class="text-muted text-decoration-none hover-white">Help Center & FAQs</a></li>
              <li><a href="#/support" class="text-muted text-decoration-none hover-white">Priority Support</a></li>
            </ul>
            <div class="pt-1 d-flex flex-column gap-2 text-muted fs-8">
              <div class="d-flex align-items-center gap-2">
                <i class="fa-solid fa-lock text-primary"></i>
                <span class="text-secondary">256-Bit TLS 1.3 Encryption</span>
              </div>
              <div class="d-flex align-items-center gap-2">
                <i class="fa-solid fa-shield-check text-success"></i>
                <span class="text-secondary">Cashfree PCI-DSS Compliant</span>
              </div>
            </div>
          </div>
        </div>

        <div class="border-top border-secondary border-opacity-10 pt-4 d-flex flex-wrap justify-content-between align-items-center gap-2 text-muted fs-8">
          <p class="mb-0">&copy; 2026 PrepSpace (stream-in.app). Developed with excellence by Nagesh Methre. All rights reserved.</p>
          <div class="d-flex flex-wrap align-items-center gap-2.5">
            <span class="google-badge-pill google-badge-blue">
              <i class="fa-solid fa-universal-access me-1.5"></i> WCAG 2.1 AA Compliant
            </span>
            <span class="google-badge-pill google-badge-green">
              <i class="fa-solid fa-shield-halved me-1.5"></i> GDPR / DPA Certified
            </span>
            <span class="google-badge-pill google-badge-yellow">
              <i class="fa-solid fa-certificate me-1.5"></i> Zero-Trust SLA
            </span>
          </div>
        </div>
      </div>
    </footer>

    <!-- Master Responsive Drawer: Platform Overview -->
    <div id="platform-drawer" class="ui-drawer" role="dialog" aria-modal="true" aria-labelledby="platform-drawer-title">
      <div class="ui-drawer-backdrop" onclick="window.UI.closeDrawer('platform-drawer')"></div>
      <div class="ui-drawer-panel">
        <div class="ui-drawer-header">
          <h3 class="ui-drawer-title" id="platform-drawer-title">
            <i class="fa-solid fa-layer-group text-warning"></i>
            <span>Platform Quick View</span>
          </h3>
          <button class="ui-drawer-close" onclick="window.UI.closeDrawer('platform-drawer')" aria-label="Close drawer">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div class="ui-drawer-body">
          <div class="d-flex flex-column gap-3">
            <div class="p-3 rounded-3" style="background: #222226; border: 1px solid #323238;">
              <div class="d-flex align-items-center justify-content-between mb-2">
                <span class="text-white fw-bold fs-7">System Status</span>
                <span class="badge bg-success bg-opacity-20 text-success border border-success-subtle font-monospace">ONLINE</span>
              </div>
              <p class="text-muted fs-8 mb-0">All 19 interview domains, 50-MCQ Exam Engine, and AI ATS Audit are operational.</p>
            </div>

            <div class="d-flex flex-column gap-1.5">
              <span class="text-muted fs-8 text-uppercase tracking-wider font-monospace px-1">Navigation</span>
              <a href="#showcase" class="ui-drawer-link p-2.5 rounded-2 d-flex align-items-center gap-2.5 text-decoration-none text-light hover-bg-dark" onclick="window.UI.closeDrawer('platform-drawer')">
                <i class="fa-solid fa-desktop text-warning"></i>
                <span>Live Platform Preview</span>
              </a>
              <a href="#features" class="ui-drawer-link p-2.5 rounded-2 d-flex align-items-center gap-2.5 text-decoration-none text-light hover-bg-dark" onclick="window.UI.closeDrawer('platform-drawer')">
                <i class="fa-solid fa-cubes text-warning"></i>
                <span>Core Capabilities</span>
              </a>
              <a href="#calculator" class="ui-drawer-link p-2.5 rounded-2 d-flex align-items-center gap-2.5 text-decoration-none text-light hover-bg-dark" onclick="window.UI.closeDrawer('platform-drawer')">
                <i class="fa-solid fa-calculator text-warning"></i>
                <span>Readiness Simulator</span>
              </a>
              <a href="#pricing" class="ui-drawer-link p-2.5 rounded-2 d-flex align-items-center gap-2.5 text-decoration-none text-light hover-bg-dark" onclick="window.UI.closeDrawer('platform-drawer')">
                <i class="fa-solid fa-tags text-warning"></i>
                <span>Transparent Pricing</span>
              </a>
              <a href="#landingFaq" class="ui-drawer-link p-2.5 rounded-2 d-flex align-items-center gap-2.5 text-decoration-none text-light hover-bg-dark" onclick="window.UI.closeDrawer('platform-drawer')">
                <i class="fa-solid fa-circle-question text-warning"></i>
                <span>FAQ & Knowledge Base</span>
              </a>
            </div>

            <div class="p-3 rounded-3 mt-2" style="background: rgba(245, 158, 11, 0.08); border: 1px solid rgba(245, 158, 11, 0.25);">
              <div class="d-flex align-items-center gap-2 text-warning fw-bold fs-7 mb-1">
                <i class="fa-solid fa-gem"></i>
                <span>PrepPro Lifetime Access</span>
              </div>
              <p class="text-muted fs-8 mb-2">₹399 one-time payment. Unlimited exams, AI ATS audit, and verified certificates.</p>
              <a href="#/register" class="btn btn-warning btn-sm w-100 fw-bold text-dark" onclick="window.UI.closeDrawer('platform-drawer')">Claim PrepPro →</a>
            </div>
          </div>
        </div>
        <div class="ui-drawer-footer">
          <a href="#/register" class="ui-btn-primary w-100" onclick="window.UI.closeDrawer('platform-drawer')">
            <i class="fa-solid fa-rocket"></i>
            <span>Get Started Free</span>
          </a>
        </div>
      </div>
    </div>
  </div>
  `,

  // Authentication: Login Page (Vercel UI/UX)
  login: () => `
    <div class="vercel-auth-wrapper">
      <div class="vercel-auth-card text-center">
        <a href="#/" class="d-inline-block mb-3 text-decoration-none">
          <img src="assets/prepspace_icon.png?v=5.8.8" alt="PrepSpace" style="width: 44px; height: 44px; object-fit: contain;">
        </a>
        <h1 class="vercel-auth-title">Welcome Back</h1>
        <p class="vercel-auth-sub">Enter your credentials to access your workspace</p>
        
        <form id="login-form">
          <div class="mb-3 text-start">
            <label class="vercel-input-label" for="login-email">EMAIL ADDRESS</label>
            <input type="email" id="login-email" class="vercel-input" placeholder="name@gmail.com" required autocomplete="email">
          </div>
          <div class="mb-4 text-start">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <label class="vercel-input-label mb-0" for="login-password">PASSWORD</label>
              <a href="#/forgot-password" class="text-muted text-decoration-none" style="font-size: 0.72rem;">Forgot?</a>
            </div>
            <div class="position-relative">
              <input type="password" id="login-password" class="vercel-input pe-5" placeholder="••••••••" required autocomplete="current-password">
              <button type="button" class="vercel-pass-toggle" data-target="login-password" aria-label="Toggle password visibility">
                <i class="fa-regular fa-eye"></i>
              </button>
            </div>
          </div>
          <button type="submit" id="btn-login-submit" class="vercel-btn-primary mb-3">Sign In</button>
        </form>

        <div class="my-3 d-flex align-items-center">
          <hr class="flex-grow-1 border-secondary border-opacity-25 my-0">
          <span class="px-3 text-muted" style="font-size: 0.72rem; letter-spacing: 0.06em;">OR</span>
          <hr class="flex-grow-1 border-secondary border-opacity-25 my-0">
        </div>
        
        <div id="google-login-btn" class="w-100 d-flex justify-content-center mb-3"></div>
        
        <p class="text-muted mb-0" style="font-size: 0.8125rem;">
          Don't have an account? <a href="#/register" class="text-white text-decoration-underline fw-medium">Create Space</a>
        </p>
      </div>
    </div>
  `,

  // Authentication: Register Page (Vercel UI/UX)
  register: () => `
    <div class="vercel-auth-wrapper">
      <div class="vercel-auth-card text-center">
        <a href="#/" class="d-inline-block mb-3 text-decoration-none">
          <img src="assets/prepspace_icon.png?v=5.8.8" alt="PrepSpace" style="width: 44px; height: 44px; object-fit: contain;">
        </a>
        <h1 class="vercel-auth-title" id="auth-card-title">Create Space</h1>
        <p class="vercel-auth-sub" id="auth-card-subtitle">Start your technical interview preparation journey</p>
        
        <!-- Registration Step 1: Account Details Form -->
        <form id="register-form">
          <div class="mb-3 text-start">
            <label class="vercel-input-label" for="register-name">FULL NAME</label>
            <input type="text" id="register-name" class="vercel-input" placeholder="Full Name" required autocomplete="name">
          </div>

          <div class="mb-3 text-start">
            <label class="vercel-input-label" for="register-email">GMAIL ADDRESS</label>
            <input type="email" id="register-email" class="vercel-input" placeholder="yourname@gmail.com" pattern=".+@gmail\\.com$" title="Only @gmail.com addresses are allowed" required autocomplete="email">
          </div>

          <div class="mb-3 text-start">
            <label class="vercel-input-label" for="register-password">PASSWORD</label>
            <div class="position-relative">
              <input type="password" id="register-password" class="vercel-input pe-5" placeholder="Create password" minlength="6" required autocomplete="new-password">
              <button type="button" class="vercel-pass-toggle" data-target="register-password" aria-label="Toggle password visibility">
                <i class="fa-regular fa-eye"></i>
              </button>
            </div>
          </div>

          <div class="mb-4 text-start">
            <label class="vercel-input-label" for="register-confirm-password">CONFIRM PASSWORD</label>
            <div class="position-relative">
              <input type="password" id="register-confirm-password" class="vercel-input pe-5" placeholder="Confirm password" minlength="6" required autocomplete="new-password">
              <button type="button" class="vercel-pass-toggle" data-target="register-confirm-password" aria-label="Toggle confirm password visibility">
                <i class="fa-regular fa-eye"></i>
              </button>
            </div>
          </div>

          <button type="submit" id="btn-register-submit" class="vercel-btn-primary mb-3">Continue to Verification</button>
        </form>

        <!-- Registration Step 2: Vercel Segmented 6-Digit OTP Verification Card -->
        <div id="otp-verification-card" class="d-none text-start">
          <div class="mb-4 p-3 rounded-3 text-start" style="background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.1);">
            <div class="d-flex align-items-center gap-2 mb-2 text-white fw-semibold" style="font-size: 0.85rem;">
              <i class="fa-solid fa-envelope-circle-check text-success"></i>
              <span>Verification Email Dispatched</span>
            </div>
            <p class="text-secondary mb-2" style="font-size: 0.8rem; line-height: 1.5;">
              We sent an official 6-digit verification code to <span id="otp-target-email" class="text-white font-monospace fw-semibold"></span>. Please check your Gmail inbox and enter the code below.
            </p>
            <div class="d-flex align-items-center gap-2 text-muted" style="font-size: 0.76rem;">
              <i class="fa-solid fa-circle-info text-warning"></i>
              <span>Can't find it in Primary? Check your <strong>Spam</strong> or <strong>Promotions</strong> folder.</span>
            </div>
            <div id="otp-fallback-container" class="mt-2.5"></div>
          </div>

          <div class="mb-4 text-center">
            <label class="vercel-input-label text-start mb-2">ENTER 6-DIGIT VERIFICATION CODE</label>
            <div class="d-flex justify-content-between gap-2" id="otp-inputs-container">
              <input type="text" maxlength="1" inputmode="numeric" class="vercel-otp-box" id="otp-box-1" autocomplete="one-time-code" autofocus>
              <input type="text" maxlength="1" inputmode="numeric" class="vercel-otp-box" id="otp-box-2">
              <input type="text" maxlength="1" inputmode="numeric" class="vercel-otp-box" id="otp-box-3">
              <input type="text" maxlength="1" inputmode="numeric" class="vercel-otp-box" id="otp-box-4">
              <input type="text" maxlength="1" inputmode="numeric" class="vercel-otp-box" id="otp-box-5">
              <input type="text" maxlength="1" inputmode="numeric" class="vercel-otp-box" id="otp-box-6">
            </div>
            <input type="hidden" id="register-otp-input" value="">
          </div>

          <button type="button" id="btn-confirm-otp" class="vercel-btn-primary mb-3">Verify & Create Space</button>

          <div class="d-flex justify-content-between align-items-center text-muted fs-8 font-monospace mt-2">
            <span id="otp-timer-display">Resend in 45s</span>
            <button type="button" id="btn-resend-otp" class="btn btn-link text-white p-0 fs-8 text-decoration-none" disabled>Resend Code</button>
          </div>

          <div class="text-center mt-3 pt-2 border-top border-secondary border-opacity-25">
            <button type="button" id="btn-back-to-register" class="btn btn-link text-muted p-0 fs-8 text-decoration-none">← Change Email or Details</button>
          </div>
        </div>

        <div class="my-3 d-flex align-items-center" id="register-or-divider">
          <hr class="flex-grow-1 border-secondary border-opacity-25 my-0">
          <span class="px-3 text-muted" style="font-size: 0.72rem; letter-spacing: 0.06em;">OR</span>
          <hr class="flex-grow-1 border-secondary border-opacity-25 my-0">
        </div>
        
        <div id="google-login-btn" class="w-100 d-flex justify-content-center mb-3"></div>
        
        <p class="text-muted mb-0" style="font-size: 0.8125rem;">
          Already have an account? <a href="#/login" class="text-white text-decoration-underline fw-medium">Sign In</a>
        </p>
      </div>
    </div>
  `,

  // Application Layout Wrapper - Style 2: Stripe / Supabase Enterprise Gradient Workspace
  appLayout: (userName, isAdmin, isPaid = false) => `
    <div id="app-container" class="d-flex w-100 position-relative">
      <!-- Sidebar -->
      <div id="sidebar" class="sidebar glass-panel border-top-0 border-bottom-0 border-start-0 rounded-0 d-flex flex-column">
        <!-- Brand Header -->
        <div class="p-3 border-bottom border-secondary-subtle d-flex align-items-center justify-content-between brand-header-box flex-shrink-0">
          <a class="navbar-brand d-flex align-items-center brand-text text-decoration-none" href="#/dashboard">
            <img src="assets/prepspace_icon.png?v=5.8.8" alt="PrepSpace Logo" class="me-2 brand-logo-img" style="width: 36px; height: 36px; object-fit: contain;">
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
        
        <!-- Categorized Nav Links -->
        <nav class="flex-grow-1 py-2 overflow-y-auto sidebar-scroll-content" id="sidebar-nav-container" aria-label="Platform Workspace Navigation">
          <details class="sidebar-group" open>
            <summary class="sidebar-section-title px-4 mb-1">
              <span>Core Tracker</span>
              <i class="fa-solid fa-chevron-down sidebar-group-chevron"></i>
            </summary>
            <div class="sidebar-group-items">
              <a href="#/dashboard" class="sidebar-link active"><i class="fa-solid fa-chart-line"></i> <span>Dashboard</span></a>
              <a href="#/coding-practice" class="sidebar-link"><i class="fa-solid fa-code"></i> <span>Coding Practice</span></a>
              <a href="#/aptitude" class="sidebar-link"><i class="fa-solid fa-book-open-reader"></i> <span>Aptitude & Book</span></a>
              <a href="#/mock-exams" class="sidebar-link"><i class="fa-solid fa-stopwatch"></i> <span>50-MCQ Mock Exams</span></a>
              <a href="#/dsa-roadmap" class="sidebar-link"><i class="fa-solid fa-route"></i> <span>DSA Roadmap</span></a>
              <a href="#/studyplanner" class="sidebar-link"><i class="fa-solid fa-calendar-check"></i> <span>Study Planner</span></a>
            </div>
          </details>

          <details class="sidebar-group" open>
            <summary class="sidebar-section-title px-4 mt-2 mb-1">
              <span>Academy & Prep</span>
              <i class="fa-solid fa-chevron-down sidebar-group-chevron"></i>
            </summary>
            <div class="sidebar-group-items">
              <a href="#/library" class="sidebar-link"><i class="fa-solid fa-book-bookmark text-primary"></i> <span>Technical Library</span></a>
              <a href="#/courses" class="sidebar-link"><i class="fa-solid fa-graduation-cap"></i> <span>LMS Courses</span></a>
              <a href="#/certificates" class="sidebar-link"><i class="fa-solid fa-award"></i> <span>Certificates</span></a>
              <a href="#/flashcards" class="sidebar-link"><i class="fa-solid fa-clone"></i> <span>Flashcards</span></a>
              <a href="#/notes" class="sidebar-link"><i class="fa-solid fa-note-sticky"></i> <span>Study Notes</span></a>
              <a href="#/experiences" class="sidebar-link"><i class="fa-solid fa-user-tie"></i> <span>Experiences</span></a>
              <a href="#/community" class="sidebar-link"><i class="fa-solid fa-comments"></i> <span>Community</span></a>
            </div>
          </details>

          <details class="sidebar-group">
            <summary class="sidebar-section-title px-4 mt-2 mb-1">
              <span>Career & Tools</span>
              <i class="fa-solid fa-chevron-down sidebar-group-chevron"></i>
            </summary>
            <div class="sidebar-group-items">
              <a href="#/placement" class="sidebar-link"><i class="fa-solid fa-briefcase"></i> <span>Placement Kanban</span></a>
              <a href="#/ai-assistant" class="sidebar-link"><i class="fa-solid fa-robot"></i> <span>AI ATS Assistant</span></a>
              <a href="#/calendar" class="sidebar-link"><i class="fa-solid fa-calendar-days"></i> <span>Interview Calendar</span></a>
              <a href="#/reports" class="sidebar-link"><i class="fa-solid fa-file-invoice"></i> <span>Progress Reports</span></a>
              <a href="#/desktop-client" class="sidebar-link"><i class="fa-solid fa-mobile-screen"></i> <span>Download App</span></a>
            </div>
          </details>

          <details class="sidebar-group">
            <summary class="sidebar-section-title px-4 mt-2 mb-1">
              <span>Account</span>
              <i class="fa-solid fa-chevron-down sidebar-group-chevron"></i>
            </summary>
            <div class="sidebar-group-items">
              <a href="#/profile" class="sidebar-link"><i class="fa-solid fa-sliders"></i> <span>Settings</span></a>
              <a href="#/billing" class="sidebar-link"><i class="fa-solid fa-credit-card"></i> <span>Upgrade Space</span></a>
              <a href="#/referral" class="sidebar-link"><i class="fa-solid fa-gift"></i> <span>Referral & Earn</span></a>
              ${isAdmin ? `<a href="#/admin" class="sidebar-link"><i class="fa-solid fa-shield-halved"></i> <span>Admin Panel</span></a>` : ''}
            </div>
          </details>
        </nav>
        
        <!-- Sidebar Bottom Actions -->
        <div class="p-3 border-top border-secondary-subtle mt-auto flex-shrink-0 sidebar-footer-box">
          <button id="logout-btn" class="btn btn-glass w-100 py-2 mb-2"><i class="fa-solid fa-right-from-bracket me-2 text-danger"></i> <span>Logout</span></button>
          <div class="sidebar-footer-links d-flex justify-content-center gap-2 text-center" style="font-size: 0.7rem; opacity: 0.6;">
            <a href="/about" target="_blank" class="text-muted text-decoration-none">About</a>
            <span>•</span>
            <a href="/privacy" target="_blank" class="text-muted text-decoration-none">Privacy</a>
            <span>•</span>
            <a href="/terms" target="_blank" class="text-muted text-decoration-none">Terms</a>
          </div>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="main-content d-flex flex-column flex-grow-1 overflow-hidden" style="height: 100vh;">
        <!-- Top Nav Header (Compact Modern SaaS Header) -->
        <header class="workspace-top-header d-flex align-items-center justify-content-between py-2 border-bottom border-secondary border-opacity-20 mb-2 flex-shrink-0 px-3 px-md-4" style="min-height: 46px;">
          <div class="d-flex align-items-center gap-2 overflow-hidden flex-grow-1 me-2" style="min-width: 0;">
            <button class="btn btn-glass btn-sm d-lg-none me-1 flex-shrink-0 px-2 py-1" id="sidebar-toggle-btn" aria-label="Toggle Navigation"><i class="fa-solid fa-bars fs-8"></i></button>
            <div class="d-flex align-items-center gap-2 overflow-hidden" style="min-width: 0;">
              <h1 class="text-white fw-semibold m-0 fs-7 fs-md-6 text-truncate" id="current-view-title" style="max-width: clamp(160px, 50vw, 450px);">Dashboard</h1>
            </div>
          </div>
          
          <div class="d-flex align-items-center gap-2 flex-shrink-0">
            <!-- User Dropdown -->
            <div class="dropdown">
              <button class="btn btn-glass btn-sm dropdown-toggle d-flex align-items-center gap-2 py-1 px-2.5" type="button" id="userDropdown" data-bs-toggle="dropdown">
                <i class="fa-solid fa-circle-user fs-7 text-secondary"></i>
                <span class="d-none d-md-inline fs-8 fw-medium" id="user-display-name">${userName}</span>
              </button>
              <ul class="dropdown-menu dropdown-menu-end glass-panel shadow-lg" aria-labelledby="userDropdown">
                <li class="px-3 py-1.5 border-bottom border-secondary border-opacity-20 mb-1" id="dropdown-plan-info">
                  <div class="fs-9 text-muted font-monospace">PLAN</div>
                  <div class="fw-semibold ${isPaid ? 'text-primary' : 'text-secondary'} fs-8 d-flex align-items-center gap-1 mt-0.5">
                    ${isPaid 
                      ? '<span class="badge bg-primary bg-opacity-20 text-primary border border-primary-subtle font-monospace me-1 fs-10">PRO</span> PrepPro Active' 
                      : '<span class="badge bg-secondary bg-opacity-25 text-muted border border-secondary font-monospace me-1 fs-10">FREE</span> Free Plan'}
                  </div>
                </li>
                <li><a class="dropdown-item text-white fs-8 py-1.5" href="#/profile"><i class="fa-solid fa-gear me-2 text-secondary"></i>Settings</a></li>
                ${!isPaid ? `<li><a class="dropdown-item text-primary fw-semibold fs-8 py-1.5" href="#/billing"><i class="fa-solid fa-gem me-2"></i>Upgrade to Pro</a></li>` : ''}
                <li><hr class="dropdown-divider border-secondary border-opacity-20 my-1"></li>
                <li><button class="dropdown-item text-danger fs-8 py-1.5" id="dropdown-logout"><i class="fa-solid fa-right-from-bracket me-2 text-danger"></i>Logout</button></li>
              </ul>
            </div>
          </div>
        </header>

        <!-- Dynamic Sitewide Admin Broadcast Container -->
        <div id="admin-broadcast-portal-container" class="mb-3" style="display: none;"></div>

        <!-- Dynamic Sub-view Mounting Port -->
        <div id="page-mount" class="flex-grow-1 overflow-y-auto"></div>
      </div>
    </div>
  `,

  // Dashboard Page Sub-view - Professional Engineering Workspace
  dashboard: (stats = {}) => {
    const totalSolved = parseInt(stats.totalSolved ?? 0, 10);
    const easySolved = parseInt(stats.easySolved ?? 0, 10);
    const mediumSolved = parseInt(stats.mediumSolved ?? 0, 10);
    const hardSolved = parseInt(stats.hardSolved ?? 0, 10);
    const totalQuestions = parseInt(stats.totalQuestions ?? 325, 10);
    const mockExamsCompleted = parseInt(stats.mockExamsCompleted ?? 0, 10);
    const averageMockScore = stats.averageMockScore ? `${Math.round(stats.averageMockScore)}%` : 'No attempts';
    const applicationsCount = parseInt(stats.applicationsCount ?? 0, 10);
    const upcomingInterviewsCount = parseInt(stats.upcomingInterviewsCount ?? 0, 10);

    const userName = (typeof state !== 'undefined' && state && state.name) ? state.name : 'Candidate';

    return `
    <div class="ps-professional-dashboard container-fluid px-0">
      <!-- 1. Top Executive Control Bar -->
      <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3 pb-2.5 border-bottom border-secondary border-opacity-20">
        <div>
          <div class="d-flex align-items-center gap-2 mb-0.5">
            <h2 class="text-white fw-semibold m-0 fs-6">${userName}'s Dashboard</h2>
            <span class="ps-status-pill ps-status-active">Active</span>
          </div>
          <p class="text-muted fs-8 mb-0">Track preparation velocity, solve coding challenges, and manage recruitment pipeline.</p>
        </div>
        <div class="d-flex flex-wrap align-items-center gap-2">
          <a href="#/coding-practice" class="btn btn-sm btn-primary px-3 py-1.5 fs-8 fw-semibold d-inline-flex align-items-center gap-1.5 shadow-sm">
            <span>Coding Practice IDE</span>
            <i class="fa-solid fa-arrow-right fs-9"></i>
          </a>
          <a href="#/mock-exams" class="btn btn-sm btn-glass px-3 py-1.5 fs-8 text-white d-inline-flex align-items-center gap-1.5">
            <span>50-MCQ Mock Exam</span>
          </a>
          <a href="#/studyplanner" class="btn btn-sm btn-glass px-3 py-1.5 fs-8 text-white d-inline-flex align-items-center gap-1.5">
            <span>Study Planner</span>
          </a>
        </div>
      </div>

      <!-- 2. Four Clean KPI Cards -->
      <div class="row g-3 mb-4">
        <!-- Daily Focus Time -->
        <div class="col-12 col-sm-6 col-xl-3">
          <div class="ps-stat-box p-3 h-100 text-start">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="ps-stat-title">Daily Focus Time</span>
              <span class="text-muted fs-8 font-monospace" id="live-session-timer">Active</span>
            </div>
            <div class="ps-stat-value mb-1" id="daily-screentime-display">0m</div>
            <div class="text-muted fs-8">Screen time logged today</div>
          </div>
        </div>

        <!-- Problems Solved -->
        <div class="col-12 col-sm-6 col-xl-3">
          <div class="ps-stat-box p-3 h-100 text-start">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="ps-stat-title">Problems Practiced</span>
              <a href="#/coding-practice" class="ps-card-link fs-8 text-decoration-none">Practice &rarr;</a>
            </div>
            <div class="ps-stat-value mb-1">${totalSolved} <span class="fs-7 text-muted fw-normal">/ ${totalQuestions}</span></div>
            <div class="text-muted fs-8 font-monospace">
              <span class="text-success fw-medium">E: ${easySolved}</span> &bull; 
              <span class="text-warning fw-medium">M: ${mediumSolved}</span> &bull; 
              <span class="text-danger fw-medium">H: ${hardSolved}</span>
            </div>
          </div>
        </div>

        <!-- Mock Evaluations -->
        <div class="col-12 col-sm-6 col-xl-3">
          <div class="ps-stat-box p-3 h-100 text-start">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="ps-stat-title">Mock Evaluations</span>
              <a href="#/mock-exams" class="ps-card-link fs-8 text-decoration-none">Take Test &rarr;</a>
            </div>
            <div class="ps-stat-value mb-1">${mockExamsCompleted} <span class="fs-7 text-muted fw-normal">Completed</span></div>
            <div class="text-muted fs-8">Average Score: <span class="text-white font-monospace fw-medium">${averageMockScore}</span></div>
          </div>
        </div>

        <!-- Active Pipeline -->
        <div class="col-12 col-sm-6 col-xl-3">
          <div class="ps-stat-box p-3 h-100 text-start">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="ps-stat-title">Placement Pipeline</span>
              <a href="#/placement" class="ps-card-link fs-8 text-decoration-none">Kanban &rarr;</a>
            </div>
            <div class="ps-stat-value mb-1">${applicationsCount} <span class="fs-7 text-muted fw-normal">Applications</span></div>
            <div class="text-muted fs-8">Upcoming Interviews: <span class="text-white font-monospace fw-medium">${upcomingInterviewsCount}</span></div>
          </div>
        </div>
      </div>

      <!-- 3. Main Workspace Grid (8-col / 4-col) -->
      <div class="row g-3">
        <!-- LEFT 8-COLUMN MAIN ANALYTICS & TOOLS -->
        <div class="col-lg-8">
          <!-- Chart: Focus Velocity -->
          <div class="ps-panel-box p-3 mb-3">
            <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
              <div>
                <h3 class="text-white fw-bold m-0 fs-6">Study Velocity (Minutes)</h3>
                <p class="text-muted fs-8 mb-0">Daily active focus time recorded over the last 7 days</p>
              </div>
            </div>
            <div style="position: relative; height: 190px;">
              <canvas id="weeklyHoursChart"></canvas>
            </div>
          </div>

          <!-- 4 Workspace Cards: Coding IDE, 50-MCQ Mock, Tech Library, DSA Roadmap -->
          <div class="row g-3">
            <div class="col-md-6">
              <div class="ps-workspace-card p-3 h-100 d-flex flex-column justify-content-between">
                <div>
                  <div class="d-flex justify-content-between align-items-center mb-1">
                    <h4 class="text-white fw-bold fs-6 m-0">Coding Practice IDE</h4>
                    <span class="badge bg-secondary bg-opacity-25 text-white border border-secondary border-opacity-30 fs-9 font-monospace">300+ Problems</span>
                  </div>
                  <p class="text-muted fs-8 mb-3">In-browser code editor with multi-language execution (Java, Python, C++, JS), testcase validation, and LeetCode-standard challenges.</p>
                </div>
                <a href="#/coding-practice" class="ps-card-link fs-8 fw-semibold text-decoration-none">
                  Open Coding IDE <i class="fa-solid fa-arrow-right ms-1 fs-9"></i>
                </a>
              </div>
            </div>

            <div class="col-md-6">
              <div class="ps-workspace-card p-3 h-100 d-flex flex-column justify-content-between">
                <div>
                  <div class="d-flex justify-content-between align-items-center mb-1">
                    <h4 class="text-white fw-bold fs-6 m-0">50-MCQ Timed Mock Exam</h4>
                    <span class="badge bg-secondary bg-opacity-25 text-white border border-secondary border-opacity-30 fs-9 font-monospace">50 Questions</span>
                  </div>
                  <p class="text-muted fs-8 mb-3">Full-length timed screening engine testing Core Java, DSA, DBMS, OOP, and System Design with automated score calculation.</p>
                </div>
                <a href="#/mock-exams" class="ps-card-link fs-8 fw-semibold text-decoration-none">
                  Start Mock Exam <i class="fa-solid fa-arrow-right ms-1 fs-9"></i>
                </a>
              </div>
            </div>

            <div class="col-md-6">
              <div class="ps-workspace-card p-3 h-100 d-flex flex-column justify-content-between">
                <div>
                  <div class="d-flex justify-content-between align-items-center mb-1">
                    <h4 class="text-white fw-bold fs-6 m-0">Technical Library & Guides</h4>
                    <span class="badge bg-secondary bg-opacity-25 text-white border border-secondary border-opacity-30 fs-9 font-monospace">E-Books & Articles</span>
                  </div>
                  <p class="text-muted fs-8 mb-3">Curated engineering textbooks, interview guides, and high-yield cheat sheets formatted for deep, distraction-free reading.</p>
                </div>
                <a href="#/library" class="ps-card-link fs-8 fw-semibold text-decoration-none">
                  Browse Library <i class="fa-solid fa-arrow-right ms-1 fs-9"></i>
                </a>
              </div>
            </div>

            <div class="col-md-6">
              <div class="ps-workspace-card p-3 h-100 d-flex flex-column justify-content-between">
                <div>
                  <div class="d-flex justify-content-between align-items-center mb-1">
                    <h4 class="text-white fw-bold fs-6 m-0">Interactive DSA Syllabus</h4>
                    <span class="badge bg-secondary bg-opacity-25 text-white border border-secondary border-opacity-30 fs-9 font-monospace">16 Domains</span>
                  </div>
                  <p class="text-muted fs-8 mb-3">Structured curriculum covering Arrays, Linked Lists, Binary Trees, Dynamic Programming, Graphs, and System Design.</p>
                </div>
                <a href="#/dsa-roadmap" class="ps-card-link fs-8 fw-semibold text-decoration-none">
                  View Syllabus <i class="fa-solid fa-arrow-right ms-1 fs-9"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT 4-COLUMN SIDEBAR -->
        <div class="col-lg-4">
          <!-- Placement Pipeline Breakdown -->
          <div class="ps-panel-box p-3 mb-3">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h3 class="text-white fw-bold m-0 fs-6">Recruitment Pipeline</h3>
              <a href="#/placement" class="ps-card-link fs-8 text-decoration-none">Open Board &rarr;</a>
            </div>
            <div style="position: relative; height: 140px;" class="mb-3">
              <canvas id="pipelineStatusChart"></canvas>
            </div>
            <div class="d-flex justify-content-between align-items-center pt-2 border-top border-secondary border-opacity-20 fs-8">
              <span class="text-muted">Total tracked opportunities</span>
              <span class="text-white fw-semibold font-monospace">${applicationsCount}</span>
            </div>
          </div>

          <!-- Curriculum Progress -->
          <div class="ps-panel-box p-3 mb-3">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h3 class="text-white fw-bold m-0 fs-6">Core Curriculum Matrix</h3>
              <a href="#/dsa-roadmap" class="ps-card-link fs-8 text-decoration-none">All Topics &rarr;</a>
            </div>
            
            <div class="ps-prep-area-item">
              <div>
                <div class="text-white fs-8 fw-medium">Arrays, Strings & Two Pointers</div>
                <div class="text-muted fs-9 font-monospace">Core linear data structures</div>
              </div>
              <span class="badge bg-secondary bg-opacity-25 text-white border border-secondary border-opacity-30 fs-9 font-monospace">Active</span>
            </div>

            <div class="ps-prep-area-item">
              <div>
                <div class="text-white fs-8 fw-medium">Trees & Binary Search Trees</div>
                <div class="text-muted fs-9 font-monospace">DFS, BFS, traversals & LCA</div>
              </div>
              <span class="badge bg-secondary bg-opacity-25 text-white border border-secondary border-opacity-30 fs-9 font-monospace">Active</span>
            </div>

            <div class="ps-prep-area-item">
              <div>
                <div class="text-white fs-8 fw-medium">Dynamic Programming & Recursion</div>
                <div class="text-muted fs-9 font-monospace">Memoization & tabulation patterns</div>
              </div>
              <span class="badge bg-secondary bg-opacity-25 text-white border border-secondary border-opacity-30 fs-9 font-monospace">Active</span>
            </div>

            <div class="ps-prep-area-item" style="border-bottom: none;">
              <div>
                <div class="text-white fs-8 fw-medium">System Design & Databases</div>
                <div class="text-muted fs-9 font-monospace">Scalability, caching & SQL schema</div>
              </div>
              <span class="badge bg-secondary bg-opacity-25 text-white border border-secondary border-opacity-30 fs-9 font-monospace">Active</span>
            </div>
          </div>

          <!-- Essential Tools Direct Links -->
          <div class="ps-panel-box p-3">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <h3 class="text-white fw-bold m-0 fs-6">Candidate Utilities</h3>
            </div>
            <div class="d-flex flex-column gap-1.5 mt-2">
              <a href="#/ai-assistant" class="p-2 rounded d-flex justify-content-between align-items-center text-decoration-none text-light" style="background: rgba(255,255,255,0.03); border: 1px solid #27272a;">
                <span class="fs-8">AI ATS Resume & Keyword Audit</span>
                <i class="fa-solid fa-chevron-right text-muted fs-9"></i>
              </a>
              <a href="#/star-vault" class="p-2 rounded d-flex justify-content-between align-items-center text-decoration-none text-light" style="background: rgba(255,255,255,0.03); border: 1px solid #27272a;">
                <span class="fs-8">STAR Method Story Vault</span>
                <i class="fa-solid fa-chevron-right text-muted fs-9"></i>
              </a>
              <a href="#/studyplanner" class="p-2 rounded d-flex justify-content-between align-items-center text-decoration-none text-light" style="background: rgba(255,255,255,0.03); border: 1px solid #27272a;">
                <span class="fs-8">Preparation Milestones Planner</span>
                <i class="fa-solid fa-chevron-right text-muted fs-9"></i>
              </a>
              <a href="#/desktop-client" class="p-2 rounded d-flex justify-content-between align-items-center text-decoration-none text-light" style="background: rgba(255,255,255,0.03); border: 1px solid #27272a;">
                <span class="fs-8">Download Desktop & Mobile App</span>
                <i class="fa-solid fa-chevron-right text-muted fs-9"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  },

  // Study Planner Page Sub-view (milestones tracker + Pomodoro timer widget)
  studyPlanner: () => `
    <div class="row g-4">
      <div class="col-lg-8">
        <div class="glass-panel p-4 mb-4">
          <div class="d-flex align-items-center justify-content-between mb-4">
            <div>
              <h5 class="text-white fw-bold m-0"><i class="fa-solid fa-bullseye text-primary me-2"></i>Preparation Milestones</h5>
              <div class="text-muted fs-8 mt-1">Track target milestones, deadlines, and company goals</div>
            </div>
            <button class="btn btn-premium btn-sm px-3" id="create-plan-btn"><i class="fa-solid fa-plus me-1"></i> Add Goal</button>
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
          <div class="d-flex align-items-center justify-content-between mb-3">
            <h5 class="text-white fw-bold mb-0 fs-6"><i class="fa-regular fa-clock text-cyan me-2"></i>Focus Timer</h5>
            <span class="badge border border-secondary border-opacity-30 text-white font-mono fs-9">POMODORO</span>
          </div>
          <div class="timer-display my-4 font-mono fw-bold text-white fs-1" id="pomodoro-time" style="letter-spacing: 2px;">25:00</div>
          
          <div class="d-flex justify-content-center gap-2 mb-4">
            <button class="btn btn-glass px-3 py-1 fs-8 active" id="timer-mode-pomodoro">Deep Study (25m)</button>
            <button class="btn btn-glass px-3 py-1 fs-8" id="timer-mode-break">Break (5m)</button>
          </div>
          
          <div class="d-flex justify-content-center gap-2">
            <button class="btn btn-premium px-4 py-2" id="timer-start"><i class="fa-solid fa-play me-1"></i> Start</button>
            <button class="btn btn-glass px-3 py-2" id="timer-pause"><i class="fa-solid fa-pause me-1"></i> Pause</button>
            <button class="btn btn-glass p-2" id="timer-reset" style="width: 40px;" title="Reset"><i class="fa-solid fa-rotate-left"></i></button>
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
              <button type="submit" class="btn btn-premium px-4">Save Goal</button>
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
        <!-- Topic Mastery Milestones -->
        <div class="glass-panel p-4 mb-4">
          <h5 class="text-white fw-bold mb-4"><i class="fa-solid fa-list-check text-cyan me-2"></i>Topic Mastery Milestones</h5>
          
          <div class="d-flex flex-column gap-3">
            <div class="d-flex align-items-center gap-3 p-2 rounded bg-white bg-opacity-5">
              <i class="fa-solid fa-circle-check text-success fs-3"></i>
              <div>
                <h6 class="text-white m-0">Array Foundations</h6>
                <p class="text-muted fs-7 m-0">Solve 2 Easy Array questions (Completed)</p>
              </div>
            </div>
            <div class="d-flex align-items-center gap-3 p-2 rounded bg-white bg-opacity-5">
              <i class="fa-solid fa-circle-check text-success fs-3"></i>
              <div>
                <h6 class="text-white m-0">System Architecture</h6>
                <p class="text-muted fs-7 m-0">Log 1 System Design task (Completed)</p>
              </div>
            </div>
            <div class="d-flex align-items-center gap-3 p-2 rounded bg-white bg-opacity-5" style="filter: grayscale(1);">
              <i class="fa-solid fa-lock text-muted fs-3"></i>
              <div>
                <h6 class="text-white m-0">Advanced Algorithms</h6>
                <p class="text-muted fs-7 m-0">Solve 3 Hard coding tasks (In Progress)</p>
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
    <div class="settings-container h-100">
      <!-- Mobile Settings Category Horizontal Pill Rail (< 992px) -->
      <div class="d-flex d-lg-none align-items-center gap-1.5 overflow-x-auto pb-2 mb-2 w-100 flex-shrink-0" id="mobile-settings-pills" style="scrollbar-width: none; -webkit-overflow-scrolling: touch;">
        <button type="button" class="btn btn-sm btn-glass text-nowrap py-1.5 px-3 fs-9 active btn-settings-tab" data-tab="profile">
          <i class="fa-solid fa-circle-user text-indigo me-1"></i> Profile
        </button>
        <button type="button" class="btn btn-sm btn-glass text-nowrap py-1.5 px-3 fs-9 btn-settings-tab" data-tab="security">
          <i class="fa-solid fa-shield-halved text-success me-1"></i> Security
        </button>
        <button type="button" class="btn btn-sm btn-glass text-nowrap py-1.5 px-3 fs-9 btn-settings-tab" data-tab="appearance">
          <i class="fa-solid fa-palette text-warning me-1"></i> Appearance
        </button>
        <button type="button" class="btn btn-sm btn-glass text-nowrap py-1.5 px-3 fs-9 btn-settings-tab" data-tab="notifications">
          <i class="fa-solid fa-bell text-danger me-1"></i> Alerts
        </button>
        <button type="button" class="btn btn-sm btn-glass text-nowrap py-1.5 px-3 fs-9 btn-settings-tab" data-tab="learning">
          <i class="fa-solid fa-book-open text-primary me-1"></i> Goals
        </button>
        <button type="button" class="btn btn-sm btn-glass text-nowrap py-1.5 px-3 fs-9 btn-settings-tab" data-tab="career">
          <i class="fa-solid fa-briefcase text-success me-1"></i> Career
        </button>
        <button type="button" class="btn btn-sm btn-glass text-nowrap py-1.5 px-3 fs-9 btn-settings-tab" data-tab="dashboard">
          <i class="fa-solid fa-chart-line text-indigo me-1"></i> Widgets
        </button>
        <button type="button" class="btn btn-sm btn-glass text-nowrap py-1.5 px-3 fs-9 btn-settings-tab" data-tab="privacy">
          <i class="fa-solid fa-user-shield text-danger me-1"></i> Privacy
        </button>
        <button type="button" class="btn btn-sm btn-glass text-nowrap py-1.5 px-3 fs-9 btn-settings-tab" data-tab="devices">
          <i class="fa-solid fa-desktop text-info me-1"></i> Devices
        </button>
        <button type="button" class="btn btn-sm btn-glass text-nowrap py-1.5 px-3 fs-9 btn-settings-tab" data-tab="importexport">
          <i class="fa-solid fa-file-export text-muted me-1"></i> Export
        </button>
        <button type="button" class="btn btn-sm btn-glass text-nowrap py-1.5 px-3 fs-9 btn-settings-tab" data-tab="developer">
          <i class="fa-solid fa-code text-muted me-1"></i> API
        </button>
        <button type="button" class="btn btn-sm btn-glass text-nowrap py-1.5 px-3 fs-9 btn-settings-tab" data-tab="about">
          <i class="fa-solid fa-circle-info text-muted me-1"></i> About
        </button>
      </div>

      <!-- Settings Tabs Sidebar (Desktop Only: Fixed Navigator with dedicated subtle scroll) -->
      <div class="settings-sidebar-wrapper d-none d-lg-block">
        <div class="glass-panel p-3 h-100 overflow-y-auto" style="scrollbar-width: thin; scrollbar-color: #3f3f46 #1c1c20;">
          <div class="settings-nav-group">
            <div class="settings-nav-header">Account</div>
            <button class="settings-nav-btn btn-settings-tab active" data-tab="profile">
              <i class="fa-solid fa-circle-user text-indigo"></i> <span>Profile Settings</span>
            </button>
            <button class="settings-nav-btn btn-settings-tab" data-tab="security">
              <i class="fa-solid fa-shield-halved text-success"></i> <span>Security & Access</span>
            </button>
          </div>

          <div class="settings-nav-group">
            <div class="settings-nav-header">Preferences</div>
            <button class="settings-nav-btn btn-settings-tab" data-tab="appearance">
              <i class="fa-solid fa-palette text-warning"></i> <span>Appearance & Theme</span>
            </button>
            <button class="settings-nav-btn btn-settings-tab" data-tab="notifications">
              <i class="fa-solid fa-bell text-danger"></i> <span>Notifications</span>
            </button>
            <button class="settings-nav-btn btn-settings-tab" data-tab="language">
              <i class="fa-solid fa-globe text-info"></i> <span>Language & Region</span>
            </button>
            <button class="settings-nav-btn btn-settings-tab" data-tab="learning">
              <i class="fa-solid fa-book-open text-primary"></i> <span>Learning Goals</span>
            </button>
            <button class="settings-nav-btn btn-settings-tab" data-tab="career">
              <i class="fa-solid fa-briefcase text-success"></i> <span>Career Focus</span>
            </button>
          </div>

          <div class="settings-nav-group mb-0">
            <div class="settings-nav-header">Workspace & Privacy</div>
            <button class="settings-nav-btn btn-settings-tab" data-tab="dashboard">
              <i class="fa-solid fa-chart-line text-indigo"></i> <span>Dashboard Widgets</span>
            </button>
            <button class="settings-nav-btn btn-settings-tab" data-tab="connected">
              <i class="fa-solid fa-link text-primary"></i> <span>Connected Accounts</span>
            </button>
            <button class="settings-nav-btn btn-settings-tab" data-tab="privacy">
              <i class="fa-solid fa-user-shield text-danger"></i> <span>Data & Privacy</span>
            </button>
            <button class="settings-nav-btn btn-settings-tab" data-tab="devices">
              <i class="fa-solid fa-desktop text-info"></i> <span>Devices & Sessions</span>
            </button>
            <button class="settings-nav-btn btn-settings-tab" data-tab="importexport">
              <i class="fa-solid fa-file-export text-muted"></i> <span>Data Export</span>
            </button>
            <button class="settings-nav-btn btn-settings-tab" data-tab="developer">
              <i class="fa-solid fa-code text-muted"></i> <span>Developer API</span>
            </button>
            <button class="settings-nav-btn btn-settings-tab" data-tab="about">
              <i class="fa-solid fa-circle-info text-muted"></i> <span>About Platform</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Settings Content Workspace: Only this page moves with its own grey slider -->
      <div class="settings-content-wrapper h-100 flex-grow-1 min-w-0">
        <div class="glass-panel p-4 h-100 overflow-y-auto legal-doc-viewer" id="settings-workspace-mount">
          <!-- Loaded dynamically via js -->
          <div class="text-center py-5"><div class="spinner-border text-primary"></div></div>
        </div>
      </div>
    </div>
  `,

  settingsProfile: (s, user) => {
    user = user || {};
    const userName = user.name || s.name || 'Candidate';
    const userEmail = user.email || s.email || '';
    const initials = userName.split(' ').filter(Boolean).map(n => n[0]).slice(0, 2).join('').toUpperCase() || 'US';
    const username = userEmail ? userEmail.split('@')[0] : 'user';
    const isPro = Boolean(user.isPaid || s.isPaid);

    return `
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div>
        <h5 class="text-white fw-bold mb-0"><i class="fa-solid fa-user-pen text-indigo me-2"></i>Profile Information</h5>
        <small class="text-muted fs-8">Personal details, academic credentials, and developer profiles</small>
      </div>
      <span class="badge ${isPro ? 'bg-primary-subtle text-primary border border-primary-subtle' : 'bg-secondary-subtle text-muted'} font-monospace fs-9 px-2 py-1">
        <i class="fa-solid ${isPro ? 'fa-crown' : 'fa-user'} me-1"></i>${isPro ? 'PRO TIER' : 'STARTER'}
      </span>
    </div>

    <!-- Modern Dark Profile Hero Card -->
    <div class="profile-hero-card">
      <div class="d-flex flex-wrap align-items-center justify-content-between gap-3">
        <div class="d-flex align-items-center gap-3">
          <div class="profile-avatar-circle">
            ${s.avatarUrl ? `<img src="${s.avatarUrl}" class="w-100 h-100 rounded-circle object-fit-cover">` : initials}
          </div>
          <div>
            <div class="d-flex align-items-center gap-2">
              <h5 class="text-white fw-bold mb-0">${userName}</h5>
              <span class="badge bg-success-subtle text-success border border-success-subtle fs-9 py-0 px-1 font-monospace">VERIFIED</span>
            </div>
            <div class="d-flex align-items-center gap-2 text-muted fs-8 mt-1">
              <span>@${username}</span>
              ${userEmail ? `<span>•</span><span class="text-truncate" style="max-width: 200px;">${userEmail}</span>` : ''}
            </div>
          </div>
        </div>

        <div class="d-flex align-items-center gap-2">
          ${s.location ? `<span class="badge bg-dark text-muted border border-secondary border-opacity-25 fs-8"><i class="fa-solid fa-location-dot me-1 text-danger"></i>${s.location}</span>` : ''}
          ${s.college ? `<span class="badge bg-dark text-muted border border-secondary border-opacity-25 fs-8"><i class="fa-solid fa-building-columns me-1 text-info"></i>${s.college}</span>` : ''}
        </div>
      </div>
    </div>
    
    <form id="settings-profile-form">
      <div class="row g-3 mb-3">
        <div class="col-md-6">
          <label class="form-label text-muted fs-8 fw-semibold uppercase tracking-wider">FULL NAME</label>
          <input type="text" id="set-name" class="form-control glass-input" value="${userName}" required>
        </div>
        <div class="col-md-6">
          <label class="form-label text-muted fs-8 fw-semibold uppercase tracking-wider">USERNAME / HANDLE</label>
          <div class="input-group">
            <span class="input-group-text bg-light border-secondary border-opacity-20 text-muted">@</span>
            <input type="text" id="set-username" class="form-control glass-input" value="${username}" disabled>
          </div>
        </div>
      </div>
      <div class="row g-3 mb-3">
        <div class="col-md-6">
          <label class="form-label text-muted fs-8 fw-semibold uppercase tracking-wider">EMAIL ADDRESS</label>
          <input type="email" id="set-email" class="form-control glass-input" value="${userEmail}" disabled>
        </div>
        <div class="col-md-6">
          <label class="form-label text-muted fs-8 fw-semibold uppercase tracking-wider">BIOGRAPHY / MOTTO</label>
          <input type="text" id="set-bio" class="form-control glass-input" value="${s.bio || ''}" placeholder="Short bio...">
        </div>
      </div>
      <div class="row g-3 mb-3">
        <div class="col-md-6">
          <label class="form-label text-muted fs-8 fw-semibold uppercase tracking-wider">COLLEGE / ACADEMY</label>
          <input type="text" id="set-college" class="form-control glass-input" value="${s.college || ''}">
        </div>
        <div class="col-md-6">
          <label class="form-label text-muted fs-8 fw-semibold uppercase tracking-wider">DEGREE</label>
          <input type="text" id="set-degree" class="form-control glass-input" value="${s.degree || ''}">
        </div>
      </div>
      <div class="row g-3 mb-3">
        <div class="col-md-6">
          <label class="form-label text-muted fs-8 fw-semibold uppercase tracking-wider">BRANCH / SPECIALIZATION</label>
          <input type="text" id="set-branch" class="form-control glass-input" value="${s.branch || ''}">
        </div>
        <div class="col-md-6">
          <label class="form-label text-muted fs-8 fw-semibold uppercase tracking-wider">GRADUATION YEAR</label>
          <input type="number" id="set-gradyear" class="form-control glass-input" value="${s.graduationYear || 2026}">
        </div>
      </div>
      <div class="row g-3 mb-3">
        <div class="col-md-6">
          <label class="form-label text-muted fs-8 fw-semibold uppercase tracking-wider">LOCATION</label>
          <input type="text" id="set-location" class="form-control glass-input" value="${s.location || ''}" placeholder="e.g. Bengaluru, India">
        </div>
        <div class="col-md-6">
          <label class="form-label text-muted fs-8 fw-semibold uppercase tracking-wider">TIMEZONE</label>
          <input type="text" id="set-timezone" class="form-control glass-input" value="${s.timezone || 'UTC+5:30'}">
        </div>
      </div>
      <div class="row g-3 mb-4">
        <div class="col-md-4">
          <label class="form-label text-muted fs-8 fw-semibold uppercase tracking-wider">GITHUB PROFILE</label>
          <div class="input-group input-group-sm">
            <span class="input-group-text bg-light border-secondary border-opacity-20 text-muted"><i class="fa-brands fa-github"></i></span>
            <input type="text" id="set-github" class="form-control glass-input fs-7" value="${s.githubUrl || ''}" placeholder="https://github.com/...">
          </div>
        </div>
        <div class="col-md-4">
          <label class="form-label text-muted fs-8 fw-semibold uppercase tracking-wider">LINKEDIN PROFILE</label>
          <div class="input-group input-group-sm">
            <span class="input-group-text bg-light border-secondary border-opacity-20 text-muted"><i class="fa-brands fa-linkedin"></i></span>
            <input type="text" id="set-linkedin" class="form-control glass-input fs-7" value="${s.linkedinUrl || ''}" placeholder="https://linkedin.com/in/...">
          </div>
        </div>
        <div class="col-md-4">
          <label class="form-label text-muted fs-8 fw-semibold uppercase tracking-wider">PORTFOLIO URL</label>
          <div class="input-group input-group-sm">
            <span class="input-group-text bg-light border-secondary border-opacity-20 text-muted"><i class="fa-solid fa-globe"></i></span>
            <input type="text" id="set-portfolio" class="form-control glass-input fs-7" value="${s.portfolioUrl || ''}" placeholder="https://yourportfolio.dev">
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end">
        <button type="submit" class="btn btn-premium px-4 py-2 fs-7 fw-semibold"><i class="fa-solid fa-floppy-disk me-2"></i>Save Changes</button>
      </div>
    </form>
    `;
  },

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
        <label class="form-check-label text-muted fs-7" for="set-achieve">Notify when study milestones and goals are completed</label>
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
    <h5 class="text-white fw-bold mb-4">🤖 AI Model Engine & Interview Tuning</h5>
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
      <div class="form-check form-switch mb-4">
        <input class="form-check-input" type="checkbox" id="set-suggestions" ${s.autoSuggestions ? 'checked' : ''}>
        <label class="form-check-label text-muted fs-7" for="set-suggestions">Enable AI Auto-suggestions on coding screens</label>
      </div>
      <button type="submit" class="btn btn-premium w-100 py-2.5 rounded-3">Apply Engine Customizations</button>
    </form>
  `,

  settingsAbout: () => `
    <div class="text-center py-4">
      <img src="assets/prepspace_icon.png?v=5.8.8" alt="PrepSpace Logo" class="mb-3" style="width: 64px; height: 64px; object-fit: contain;">
      <h4 class="text-white fw-bold mb-1">PrepSpace Enterprise</h4>
      <p class="text-muted fs-7 mb-2">Version 2.6.7 (Production SaaS Edition)</p>
      
      <div class="google-dots d-inline-flex gap-1 mb-4">
        <span style="width: 8px; height: 8px; border-radius: 50%; background: #4285F4;"></span>
        <span style="width: 8px; height: 8px; border-radius: 50%; background: #EA4335;"></span>
        <span style="width: 8px; height: 8px; border-radius: 50%; background: #FBBC05;"></span>
        <span style="width: 8px; height: 8px; border-radius: 50%; background: #34A853;"></span>
      </div>

      <div class="row g-2 justify-content-center mb-4" style="max-width: 540px; margin: 0 auto;">
        <div class="col-6">
          <a href="#/privacy" class="btn btn-glass w-100 py-2 fs-8 text-start d-flex align-items-center justify-content-between">
            <span><i class="fa-solid fa-scale-balanced text-primary me-2"></i>Legal Policies</span>
            <i class="fa-solid fa-arrow-up-right-from-square text-muted fs-9"></i>
          </a>
        </div>
        <div class="col-6">
          <button class="btn btn-glass w-100 py-2 fs-8 text-start d-flex align-items-center justify-content-between" onclick="openCookiePreferencesModal()">
            <span><i class="fa-solid fa-sliders text-warning me-2"></i>Cookie Prefs</span>
            <i class="fa-solid fa-gear text-muted fs-9"></i>
          </button>
        </div>
        <div class="col-6">
          <a href="#/help" class="btn btn-glass w-100 py-2 fs-8 text-start d-flex align-items-center justify-content-between">
            <span><i class="fa-solid fa-headset text-info me-2"></i>Help & Support</span>
            <i class="fa-solid fa-arrow-up-right-from-square text-muted fs-9"></i>
          </a>
        </div>
        <div class="col-6">
          <button class="btn btn-glass w-100 py-2 fs-8 text-start d-flex align-items-center justify-content-between text-danger" onclick="openCancelSubscriptionModal()">
            <span><i class="fa-solid fa-ban text-danger me-2"></i>Cancel Pro Plan</span>
            <i class="fa-solid fa-chevron-right text-muted fs-9"></i>
          </button>
        </div>
      </div>

      <p class="text-muted fs-8 mb-0">&copy; 2026 PrepSpace (stream-in.app). Developed with excellence by Nagesh Methre. All rights reserved.</p>
    </div>
  `,

  // 1. Learning Platform (LMS)
  courses: (list) => {
    return `
      <!-- Compact Header (Replaces Huge Hero Area) -->
      <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3 pb-2 border-bottom border-secondary border-opacity-15">
        <div>
          <h5 class="fw-bold text-white mb-0">Learn. Build. Master.</h5>
          <small class="text-muted fs-8">Master programming, AI, web development, and computer science skills.</small>
        </div>
        <span class="badge border border-secondary border-opacity-30 text-white font-monospace fs-9 px-2.5 py-1">COURSE CATALOG</span>
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
          const cTitle = c.title || 'Course';
          const cDesc = c.description || '';
          const cInstructor = c.instructor || 'Staff Instructor';
          const cDifficulty = c.difficulty || 'Intermediate';
          
          return `
            <div class="col-md-6 col-lg-4 course-card-wrapper" data-title="${cTitle.toLowerCase()}" data-desc="${cDesc.toLowerCase()}" data-instructor="${cInstructor.toLowerCase()}" data-difficulty="${cDifficulty}" data-category="${cTitle.includes('Java') ? 'PROGRAMMING' : cTitle.includes('Machine') ? 'AI' : cTitle.includes('Data') ? 'DSA' : 'WEB'}">
              <div class="glass-panel h-100 d-flex flex-column rounded-3 border-secondary-subtle">
                <div class="position-relative">
                  <img src="${c.thumbnailUrl || 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7'}" class="img-fluid rounded-top w-100 object-fit-cover" style="height: 180px;" alt="${cTitle}">
                  <span class="course-badge position-absolute top-0 start-0 m-3 badge bg-dark bg-opacity-75 text-white border border-secondary-subtle py-2 px-3 rounded-pill">${cDifficulty}</span>
                </div>
                
                <div class="p-4 flex-grow-1 d-flex flex-column">
                  <h5 class="text-white fw-bold mb-2">${cTitle}</h5>
                  <p class="text-muted fs-7 flex-grow-1 mb-3">${cDesc.length > 100 ? cDesc.substring(0, 100) + '...' : cDesc}</p>
                  
                  <div class="d-flex align-items-center justify-content-between text-muted fs-8 mb-3">
                    <span><i class="fa-solid fa-user-tie me-1"></i>${cInstructor}</span>
                    <span><i class="fa-solid fa-clock me-1"></i>${c.duration || 'Self-paced'}</span>
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
          <div class="progress mb-2 bg-secondary bg-opacity-15" style="height: 8px;">
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

  // 3. DSA Roadmap (16 Curated Modules with Interactive Practice Challenges)
  dsaRoadmap: (topics) => {
    const list = Array.isArray(topics) ? topics : (topics && Array.isArray(topics.topics) ? topics.topics : (topics && Array.isArray(topics.categories) ? topics.categories : []));
    return `
    <!-- Mobile Segmented Switcher (< 992px) -->
    <div class="d-flex d-lg-none align-items-center bg-dark bg-opacity-75 border border-secondary border-opacity-25 rounded-3 p-1 mb-2.5 flex-shrink-0" id="roadmap-mobile-switcher">
      <button type="button" class="btn btn-sm flex-fill py-1.5 px-2 active btn-primary font-monospace fw-semibold" id="btn-show-roadmap-topics" style="font-size: 0.78rem;">
        <i class="fa-solid fa-list me-1.5"></i>Modules (${list.length})
      </button>
      <button type="button" class="btn btn-sm flex-fill py-1.5 px-2 text-muted font-monospace fw-semibold" id="btn-show-roadmap-reader" style="font-size: 0.78rem;">
        <i class="fa-solid fa-file-lines me-1.5"></i>Specification
      </button>
    </div>

    <div class="row g-3 dsa-roadmap-container" id="dsa-roadmap-main-row" style="height: calc(100vh - 75px); overflow: hidden;">
      <!-- Left: Fixed Topic Navigation Rail -->
      <div class="col-12 col-lg-4 col-xl-3 h-100 d-flex flex-column" id="roadmap-rail-col" style="position: sticky; top: 0;">
        <div class="p-3 d-flex flex-column h-100 border border-secondary border-opacity-20 rounded-3" style="background: #18181b;">
          <!-- Rail Header -->
          <div class="d-flex align-items-center justify-content-between pb-2 mb-2 border-bottom border-secondary border-opacity-20 flex-shrink-0">
            <div>
              <h5 class="text-white fw-bold m-0 fs-7">Curriculum Modules</h5>
              <div class="text-muted fs-9 font-monospace">${list.length} Topics</div>
            </div>
          </div>

          <!-- Quick Topic Search Filter -->
          <div class="mb-2 flex-shrink-0">
            <input type="text" id="roadmap-topic-search" class="form-control form-control-sm bg-black bg-opacity-40 text-white border-secondary border-opacity-30 fs-8" placeholder="Filter topics...">
          </div>

          <!-- Topic Nodes List -->
          <div class="d-flex flex-column gap-1 flex-grow-1 overflow-y-auto pe-1" id="roadmap-tree-nodes" style="scrollbar-width: thin; scrollbar-color: #3f3f46 transparent;">
            ${list.map((t, idx) => `
              <div class="roadmap-node-card py-2 px-2.5 rounded-2 border border-secondary border-opacity-20 d-flex align-items-center justify-content-between ${idx === 0 ? 'active-topic' : ''}" style="cursor: pointer;" data-topic-id="${t.id || (idx + 1)}" data-topic-name="${(t.name || t.title || '').toLowerCase()}">
                <div class="d-flex align-items-center gap-2 overflow-hidden" style="min-width: 0;">
                  <span class="font-monospace fs-9 text-muted flex-shrink-0 opacity-75">${String(idx + 1).padStart(2, '0')}</span>
                  <span class="text-white fw-medium fs-8 text-truncate" title="${t.name || t.title || 'Module'}">${t.name || t.title || 'Module'}</span>
                </div>
                <i class="fa-solid fa-chevron-right text-secondary fs-10 opacity-40 flex-shrink-0 ms-1.5"></i>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Right: Scrollable Document Reader -->
      <div class="col-12 col-lg-8 col-xl-9 h-100 overflow-y-auto pe-1 d-none d-lg-block" id="dsa-detail-wrapper" style="scrollbar-width: thin; scrollbar-color: #3f3f46 transparent;">
        <!-- Mobile Back Button (< 992px) -->
        <div class="d-block d-lg-none mb-2.5">
          <button type="button" class="btn btn-sm btn-outline-primary py-1.5 px-3 fs-8 fw-semibold d-inline-flex align-items-center gap-2" id="btn-roadmap-back-to-topics">
            <i class="fa-solid fa-arrow-left"></i> Back to Modules List
          </button>
        </div>
        <div class="p-3.5 p-md-4 rounded-3 border border-secondary border-opacity-20" id="dsa-detail-panel" style="min-height: 100%; background: #18181b;">
          <div class="text-center py-5 text-muted">
            <i class="fa-solid fa-folder-open display-6 mb-3 opacity-50"></i>
            <p class="fs-8">Select a topic from the curriculum rail to inspect specifications and challenges.</p>
          </div>
        </div>
      </div>
    </div>
  `;
  },

  dsaTopicDetail: (topic) => `
    <div class="dsa-document-sheet p-3 p-md-4">
      <!-- 1. Header Strip -->
      <div class="d-flex align-items-center justify-content-between pb-3 mb-3 border-bottom border-secondary border-opacity-20 flex-wrap gap-3">
        <div>
          <div class="d-flex align-items-center gap-2 mb-1">
            <span class="badge bg-primary bg-opacity-15 text-primary border border-primary border-opacity-25 fs-9 font-monospace">${String(topic.sequenceNumber || topic.id || 1).padStart(2, '0')}</span>
            <span class="badge bg-secondary bg-opacity-20 text-muted border border-secondary border-opacity-20 fs-9 font-monospace">CURRICULUM</span>
          </div>
          <h2 class="text-white fw-bold m-0 fs-5">${topic.name}</h2>
          <p class="text-muted fs-8 m-0 mt-1">${topic.description || 'Algorithmic invariants, time-space asymptotic proofs, and curated workshop benchmarks.'}</p>
        </div>

        <!-- Action Toolbar -->
        <div class="d-flex align-items-center gap-2 flex-wrap">
          <a href="#/coding-practice?topic=${encodeURIComponent(topic.name)}" class="btn btn-sm btn-primary py-1.5 px-3 fs-8 fw-semibold text-nowrap shadow-sm d-inline-flex align-items-center gap-1.5">
            <i class="fa-solid fa-laptop-code"></i>
            <span>Open Code Workshop</span>
          </a>
          <button type="button" class="btn btn-sm btn-glass py-1.5 px-2.5 fs-8 text-light d-inline-flex align-items-center gap-1" onclick="window.print()" title="Print or Save as PDF" aria-label="Print specification as PDF">
            <i class="fa-solid fa-file-pdf text-danger"></i>
            <span>PDF</span>
          </button>
          <button type="button" class="btn btn-sm btn-glass py-1.5 px-2.5 fs-8 text-muted" onclick="(document.getElementById('dsa-detail-wrapper') || window).scrollTo({top: 0, behavior: 'smooth'})" title="Scroll to top" aria-label="Scroll to top">
            <i class="fa-solid fa-arrow-up"></i>
          </button>
        </div>
      </div>

      <!-- 2. Technical Metrics Rail -->
      <div class="dsa-spec-rail mb-3">
        <div class="ps-spec-item">
          <span class="text-muted me-1.5 font-monospace fs-9">MODULES:</span>
          <span class="text-white fw-semibold">${(topic.subtopics || []).length} Sections</span>
        </div>
        <div class="ps-spec-item">
          <span class="text-muted me-1.5 font-monospace fs-9">STUDY TIME:</span>
          <span class="text-white fw-semibold">15 - 20 Min</span>
        </div>
        <div class="ps-spec-item">
          <span class="text-muted me-1.5 font-monospace fs-9">FREQUENCY:</span>
          <span class="text-warning fw-semibold"><i class="fa-solid fa-star me-1"></i>High Frequency</span>
        </div>
        <div class="ps-spec-item">
          <span class="text-muted me-1.5 font-monospace fs-9">SUITE:</span>
          <span class="text-success fw-semibold"><i class="fa-solid fa-terminal me-1"></i>Standard Benchmarks</span>
        </div>
      </div>

      <!-- 3. Continuous Sections -->
      <div class="d-flex flex-column gap-3">
        ${(topic.subtopics || []).map((s, idx) => `
          <article class="dsa-document-section p-3.5 p-md-4 rounded-3 border border-secondary border-opacity-20 position-relative">
            <!-- Section Header -->
            <div class="d-flex align-items-center justify-content-between mb-3 border-bottom border-secondary border-opacity-15 pb-2 flex-wrap gap-2">
              <div class="d-flex align-items-center gap-2">
                <span class="badge bg-secondary bg-opacity-30 text-warning border border-secondary border-opacity-25 fs-10 font-monospace">${String(idx + 1).padStart(2, '0')}</span>
                <h3 class="text-white fw-bold m-0 fs-6">${s.name}</h3>
              </div>
              <a href="#/coding-practice?q=${(s.challenges && s.challenges[0] && s.challenges[0].qId) || (idx * 5 + 1)}" class="btn btn-sm btn-outline-primary py-1 px-3 fs-8 fw-semibold text-nowrap d-inline-flex align-items-center gap-1">
                <span>Practice in Workshop</span>
                <i class="fa-solid fa-arrow-right fs-9"></i>
              </a>
            </div>

            <!-- Theory & Core Invariants -->
            <div class="mb-3">
              <h6 class="text-white fw-bold fs-8 mb-1.5"><i class="fa-solid fa-book-open text-primary me-2"></i>1. Theory & Algorithmic Invariants</h6>
              <p class="text-secondary fs-8 mb-0" style="line-height: 1.7;">${s.theory}</p>
            </div>

            <!-- Complexity Matrix -->
            <div class="mb-3">
              <h6 class="text-white fw-bold fs-8 mb-1.5"><i class="fa-solid fa-calculator text-primary me-2"></i>2. Time & Space Complexity Breakdown</h6>
              <div class="p-2.5 rounded bg-black bg-opacity-50 border border-secondary border-opacity-20 font-monospace fs-8 text-warning d-flex align-items-center gap-2">
                <i class="fa-solid fa-gauge-high text-muted"></i>
                <span>${s.complexityAnalysis}</span>
              </div>
            </div>

            <!-- Interview Pitfalls & Edge Cases -->
            <div class="mb-3">
              <h6 class="text-white fw-bold fs-8 mb-1.5"><i class="fa-solid fa-triangle-exclamation text-warning me-2"></i>3. Critical Interview Insights & Traps</h6>
              <div class="p-3 rounded border border-warning border-opacity-20 text-light fs-8" style="background: rgba(245, 158, 11, 0.07); line-height: 1.65;">
                <i class="fa-solid fa-lightbulb text-warning me-1.5"></i>
                ${s.interviewTips}
              </div>
            </div>

            <!-- Curated Challenges -->
            ${s.challenges && s.challenges.length > 0 ? `
              <div class="mt-3 pt-2.5 border-top border-secondary border-opacity-15">
                <h6 class="text-white fw-bold fs-8 mb-2"><i class="fa-solid fa-code text-success me-2"></i>4. Curated Coding Challenges</h6>
                <div class="row g-2">
                  ${s.challenges.map(ch => {
                    const diff = (ch.difficulty || 'MEDIUM').toUpperCase();
                    const diffBadgeClass = diff === 'EASY' ? 'bg-success bg-opacity-15 text-success border border-success border-opacity-25' : diff === 'HARD' ? 'bg-danger bg-opacity-15 text-danger border border-danger border-opacity-25' : 'bg-warning bg-opacity-15 text-warning border border-warning border-opacity-25';
                    return `
                      <div class="col-12 col-md-6">
                        <div class="dsa-challenge-row">
                          <div class="d-flex align-items-center overflow-hidden me-2" style="min-width: 0;">
                            <span class="badge ${diffBadgeClass} font-monospace fs-9 me-2 flex-shrink-0">${diff}</span>
                            <span class="fw-semibold text-white fs-8 text-truncate" title="${ch.name}">${ch.name}</span>
                          </div>
                          <a href="#/coding-practice?q=${ch.qId || 1}" class="btn btn-sm btn-primary py-0.5 px-2.5 fs-8 text-nowrap fw-semibold">
                            Solve <i class="fa-solid fa-arrow-right fs-9 ms-1"></i>
                          </a>
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            ` : ''}
          </article>
        `).join('')}
      </div>

      <!-- 4. Footer Summary -->
      <div class="d-flex align-items-center justify-content-between pt-3 mt-4 border-top border-secondary border-opacity-20 flex-wrap gap-3">
        <div class="text-muted fs-8 font-monospace">
          <i class="fa-solid fa-check-double text-success me-1"></i> Module complete &bull; Ready to write code in workshop
        </div>
        <div class="d-flex align-items-center gap-2">
          <button type="button" class="btn btn-sm btn-glass text-muted fs-8 py-1.5 px-3" onclick="(document.getElementById('dsa-detail-wrapper') || window).scrollTo({top: 0, behavior: 'smooth'})">
            <i class="fa-solid fa-arrow-up me-1"></i> Top
          </button>
          <a href="#/coding-practice" class="btn btn-sm btn-primary fs-8 fw-semibold py-1.5 px-3">
            <span>Next: Coding Workshop</span>
            <i class="fa-solid fa-arrow-right ms-1 fs-9"></i>
          </a>
        </div>
      </div>
    </div>
  `,

  // 4. Modern LeetCode Split-Pane Coding Workspace
  codingPractice: (questions) => {
    let list = (questions && Array.isArray(questions) && questions.length > 0)
      ? questions
      : ((typeof window !== 'undefined' && window.DSA_QUESTIONS_BANK && window.DSA_QUESTIONS_BANK.length > 0)
          ? window.DSA_QUESTIONS_BANK
          : []);

    if (!list || list.length === 0) {
      list = [
        {
          id: 1,
          title: "Two Sum",
          category: "Arrays",
          topic: "Arrays",
          companies: "Google, Amazon, Meta, Microsoft, Apple",
          difficulty: "EASY",
          desc: "Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.<br><br>You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice. You can return the answer in any order.",
          examples: [
            { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
            { input: "nums = [3,2,4], target = 6", output: "[1,2]", explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]." },
            { input: "nums = [3,3], target = 6", output: "[0,1]", explanation: "Because nums[0] + nums[3] == 6, we return [0, 1]." }
          ],
          constraints: "• 2 <= nums.length <= 10^4\n• -10^9 <= nums[i] <= 10^9\n• -10^9 <= target <= 10^9\n• Only one valid answer exists.",
          hints: "1. A brute force search takes O(N^2) time by comparing every pair.\n2. Can we use extra space? A Hash Table can store each number's value and index.\n3. For each element x, look up (target - x) in O(1) average time.",
          solution: "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (map.containsKey(complement)) {\n                return new int[] { map.get(complement), i };\n            }\n            map.put(nums[i], i);\n        }\n        return new int[0];\n    }\n}"
        }
      ];
    }

    const rawHash = (typeof window !== 'undefined' && window.location && window.location.hash) ? window.location.hash : '';
    const urlQId = rawHash.includes('?q=') ? new URLSearchParams(rawHash.split('?')[1]).get('q') : null;
    const activeQ = (urlQId && list.find(q => String(q.id) === String(urlQId))) || list[0];
    const activeIdx = list.findIndex(q => String(q.id) === String(activeQ.id));
    const prevQ = activeIdx > 0 ? list[activeIdx - 1] : list[list.length - 1];
    const nextQ = activeIdx < list.length - 1 ? list[activeIdx + 1] : list[0];

    const diff = (activeQ.difficulty || 'MEDIUM').toUpperCase();
    const diffBadgeClass = diff === 'EASY' ? 'lc-diff-easy' : diff === 'HARD' ? 'lc-diff-hard' : 'lc-diff-medium';

    let examplesArr = [];
    if (activeQ.examples) {
      examplesArr = Array.isArray(activeQ.examples) ? activeQ.examples : (typeof activeQ.examples === 'string' ? (JSON.parse(activeQ.examples || '[]')) : []);
    }
    if (!examplesArr || examplesArr.length === 0) {
      examplesArr = [{ input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." }];
    }

    return `
      <div class="lc-workspace-root d-flex flex-column h-100" id="agy-coding-workspace">
        <!-- 1. LeetCode Modern Top Navigation Bar -->
        <header class="lc-top-bar d-flex align-items-center justify-content-between px-2 px-md-3 py-1.5 flex-shrink-0">
          <!-- Left: Back Navigation, Sidebar Toggle, Problem List Dropdown & Fast Navigation -->
          <div class="d-flex align-items-center gap-1 gap-md-2 flex-shrink-0">
            <button class="btn btn-sm lc-icon-btn d-lg-none px-2" id="lc-sidebar-toggle-btn" title="Toggle Sidebar Navigation">
              <i class="fa-solid fa-bars"></i>
            </button>
            <a href="#/dsa-roadmap" class="btn btn-sm lc-btn-nav d-flex align-items-center gap-1 text-decoration-none px-2" title="Return to DSA Roadmap">
              <i class="fa-solid fa-chevron-left fs-9 text-muted"></i>
              <span class="d-none d-md-inline fs-9 text-muted">Roadmap</span>
            </a>
            <div class="dropdown">
              <button class="btn btn-sm lc-btn-nav d-flex align-items-center gap-1.5 px-2 px-md-2.5" type="button" id="lcProblemListBtn" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fa-solid fa-list-ul text-warning"></i>
                <span class="fw-semibold text-white d-none d-sm-inline">Problem List</span>
                <span class="fw-semibold text-white d-sm-none fs-8">Problems</span>
                <i class="fa-solid fa-chevron-down fs-9 text-muted ms-1"></i>
              </button>
              <div class="dropdown-menu dropdown-menu-dark lc-dropdown-menu shadow-lg p-2" aria-labelledby="lcProblemListBtn" style="width: min(320px, 92vw); max-height: 480px; overflow-y: auto;">
                <div class="p-1 mb-2">
                  <input type="text" id="practice-search-input" class="form-control form-control-sm bg-dark text-white border-secondary border-opacity-40" placeholder="Filter problems by title or tag..." autocomplete="off">
                </div>
                <div class="d-flex gap-1 mb-2 px-1" id="difficulty-filter-pills">
                  <button type="button" class="btn btn-xs btn-outline-secondary py-0.5 px-2 active-diff-filter" data-diff="ALL">All</button>
                  <button type="button" class="btn btn-xs btn-outline-success py-0.5 px-2" data-diff="EASY">Easy</button>
                  <button type="button" class="btn btn-xs btn-outline-warning py-0.5 px-2" data-diff="MEDIUM">Med</button>
                  <button type="button" class="btn btn-xs btn-outline-danger py-0.5 px-2" data-diff="HARD">Hard</button>
                </div>
                <div id="practice-problems-list" class="lc-problems-scroller">
                  ${list.map((q, idx) => {
                    const qDiff = (q.difficulty || 'MEDIUM').toUpperCase();
                    const qBadgeClass = qDiff === 'EASY' ? 'text-success bg-success' : qDiff === 'HARD' ? 'text-danger bg-danger' : 'text-warning bg-warning';
                    const isCur = String(q.id || (idx + 1)) === String(activeQ.id || 1);
                    return `
                      <div class="lc-problem-row btn-select-question ${isCur ? 'active' : ''}"
                           data-question-id="${q.id || (idx + 1)}"
                           data-title="${(q.title || '').replace(/"/g, '&quot;')}"
                           data-desc="${(q.desc || q.description || q.question || '').replace(/"/g, '&quot;')}"
                           data-constraints="${(q.constraints || q.constraintsText || '').replace(/"/g, '&quot;')}"
                           data-hints="${(q.hints || '').replace(/"/g, '&quot;')}"
                           data-solution="${(q.solution || q.referenceSolution || '').replace(/"/g, '&quot;')}"
                           data-category="${q.category || q.topic || 'Algorithms'}"
                           data-companies="${q.companies || q.company || 'Top Tech'}"
                           data-difficulty="${qDiff}">
                        <span class="text-truncate me-2 fs-8">${idx + 1}. ${q.title}</span>
                        <span class="badge ${qBadgeClass} bg-opacity-20 font-monospace fs-9">${qDiff}</span>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            </div>

            <!-- Problem Forward / Backward Arrows & Shuffle -->
            <div class="d-flex align-items-center gap-0.5">
              <button class="btn btn-sm lc-icon-btn text-light px-1.5" id="btn-prev-problem" title="Previous Problem"><i class="fa-solid fa-chevron-left"></i></button>
              <button class="btn btn-sm lc-icon-btn text-light px-1.5" id="btn-next-problem" title="Next Problem"><i class="fa-solid fa-chevron-right"></i></button>
              <button class="btn btn-sm lc-icon-btn text-light px-1.5 d-none d-sm-inline-block" id="btn-random-problem" title="Pick Random Problem"><i class="fa-solid fa-shuffle"></i></button>
            </div>
          </div>

          <!-- Right: Run, Submit, AI Assistant & Settings -->
          <div class="d-flex align-items-center gap-1.5 gap-md-2 flex-shrink-0">
            <button class="btn btn-sm lc-btn-run d-flex align-items-center gap-1 px-2.5 py-1" id="btn-practice-run" title="Run Sample Testcases">
              <i class="fa-solid fa-play text-light fs-9"></i>
              <span class="fw-semibold fs-8">Run</span>
            </button>
            <button class="btn btn-sm lc-btn-submit d-flex align-items-center gap-1 px-2.5 px-md-3 py-1" id="btn-practice-submit" title="Submit Solution to Judge">
              <i class="fa-solid fa-cloud-arrow-up text-success fs-8"></i>
              <span class="fw-bold text-success fs-8">Submit</span>
            </button>
            <button class="btn btn-sm lc-icon-btn text-secondary d-none d-lg-inline-block px-2" id="btn-toggle-layout" title="Toggle Split Orientation"><i class="fa-solid fa-table-columns"></i></button>
            <button class="btn btn-sm lc-icon-btn text-warning px-1.5" id="btn-practice-ai" title="AI Code Assistant & Hints"><i class="fa-solid fa-wand-magic-sparkles"></i></button>
            <div class="d-none d-md-flex align-items-center gap-1 text-muted fs-8 font-monospace ms-1" id="lc-timer-display" title="Session Timer">
              <i class="fa-regular fa-clock text-secondary"></i>
              <span id="lc-stopwatch">00:00</span>
            </div>
            <button class="btn btn-sm lc-icon-btn text-secondary px-1.5 d-none d-sm-inline-block" id="btn-editor-settings" title="Editor Preferences"><i class="fa-solid fa-gear"></i></button>
            <span class="badge bg-primary bg-opacity-20 text-primary border border-primary border-opacity-30 font-monospace py-1 px-2 d-none d-md-inline-block">PRO</span>
            <a href="#/profile" class="btn btn-sm lc-icon-btn text-secondary px-1.5 d-none d-sm-inline-block" title="Profile Settings"><i class="fa-solid fa-circle-user fs-6"></i></a>
          </div>
        </header>

        <!-- Mobile Segmented View Mode Switcher (Description / Code / Console) -->
        <div class="lc-mobile-tab-bar d-flex d-lg-none align-items-center justify-content-center px-2 py-1.5 border-bottom border-secondary border-opacity-20 flex-shrink-0" id="lc-mobile-mode-switcher">
          <div class="btn-group w-100 p-0.5 rounded-2" role="group" style="background: rgba(255,255,255,0.06); max-width: 440px;">
            <button type="button" class="btn btn-sm py-1 px-2 text-white fw-semibold rounded-2 lc-mobile-pane-toggle active" id="btn-mobile-pane-desc" data-pane="desc">
              <i class="fa-regular fa-file-lines me-1 text-primary"></i> <span>Problem</span>
            </button>
            <button type="button" class="btn btn-sm py-1 px-2 text-secondary fw-semibold rounded-2 lc-mobile-pane-toggle" id="btn-mobile-pane-code" data-pane="code">
              <i class="fa-solid fa-code me-1 text-success"></i> <span>Code</span>
            </button>
            <button type="button" class="btn btn-sm py-1 px-2 text-secondary fw-semibold rounded-2 lc-mobile-pane-toggle" id="btn-mobile-pane-console" data-pane="console">
              <i class="fa-solid fa-terminal me-1 text-warning"></i> <span>Console</span>
            </button>
          </div>
        </div>

        <!-- 2. Dual-Pane LeetCode Body (Left: Problem Tabs | Right: Editor + Console) -->
        <div class="lc-main-split flex-grow-1 d-flex overflow-hidden" id="agy-main-split" data-mobile-pane="desc">
          
          <!-- LEFT PANE: LeetCode Multi-Tab Problem Explorer -->
          <div class="lc-pane lc-pane-left d-flex flex-column border-end border-secondary border-opacity-20" id="vscode-left-pane">
            <!-- Tabs Navigation -->
            <ul class="nav lc-tabs border-bottom border-secondary border-opacity-20 px-2 pt-1 flex-shrink-0 flex-nowrap" role="tablist">
              <li class="nav-item">
                <button class="nav-link active d-flex align-items-center gap-1.5" id="tab-desc-btn" data-bs-toggle="tab" data-bs-target="#tab-lc-desc" type="button" role="tab">
                  <i class="fa-regular fa-file-lines text-primary"></i> <span>Description</span>
                </button>
              </li>
              <li class="nav-item">
                <button class="nav-link d-flex align-items-center gap-1.5" id="tab-editorial-btn" data-bs-toggle="tab" data-bs-target="#tab-lc-editorial" type="button" role="tab">
                  <i class="fa-solid fa-book-open text-warning"></i> <span>Editorial</span>
                </button>
              </li>
              <li class="nav-item">
                <button class="nav-link d-flex align-items-center gap-1.5" id="tab-solutions-btn" data-bs-toggle="tab" data-bs-target="#tab-lc-solutions" type="button" role="tab">
                  <i class="fa-regular fa-lightbulb text-info"></i> <span>Solutions</span>
                </button>
              </li>
              <li class="nav-item">
                <button class="nav-link d-flex align-items-center gap-1.5" id="tab-submissions-btn" data-bs-toggle="tab" data-bs-target="#tab-lc-submissions" type="button" role="tab">
                  <i class="fa-regular fa-clock text-secondary"></i> <span>Submissions</span>
                </button>
              </li>
            </ul>

            <!-- Left Tab Panes Body -->
            <div class="tab-content flex-grow-1 overflow-y-auto lc-scrollable-content p-4" id="problem-tab-content">
              
              <!-- Tab 1: Description -->
              <div class="tab-pane fade show active" id="tab-lc-desc" role="tabpanel">
                <!-- Title & Index -->
                <h2 class="text-white fw-bold fs-4 mb-3" id="active-q-title">${activeIdx + 1}. ${activeQ.title}</h2>
                
                <!-- Pills Row: Difficulty, Topics, Companies, Hint -->
                <div class="d-flex flex-wrap align-items-center gap-2 mb-3.5">
                  <span class="lc-pill ${diffBadgeClass}" id="active-q-diff-badge">${diff}</span>
                  <button type="button" class="lc-pill lc-pill-btn" id="btn-toggle-topics"><i class="fa-solid fa-tags me-1 text-muted"></i> <span id="active-q-category">${activeQ.category || activeQ.topic || 'Algorithms'}</span></button>
                  <button type="button" class="lc-pill lc-pill-btn" id="btn-toggle-companies"><i class="fa-solid fa-building me-1 text-muted"></i> <span id="companies-text">${activeQ.companies || 'Top Tech'}</span></button>
                  <button type="button" class="lc-pill lc-pill-btn" id="btn-toggle-hint"><i class="fa-regular fa-lightbulb me-1 text-warning"></i> Hint</button>
                </div>

                <!-- Problem Description Body -->
                <div class="lc-problem-body text-light-gray fs-7 mb-4" id="active-q-desc" style="line-height: 1.7;">
                  ${activeQ.desc || activeQ.description || activeQ.question || ''}
                </div>

                <!-- Examples Section -->
                <div class="lc-examples mb-4">
                  <div id="active-q-examples">
                    ${examplesArr.map((ex, i) => `
                      <div class="mb-3">
                        <div class="text-white fw-bold fs-8 font-monospace mb-1.5">Example ${i + 1}:</div>
                        <div class="lc-code-box p-3 rounded-3">
                          <div class="text-light-gray font-monospace fs-8"><strong>Input:</strong> ${ex.input}</div>
                          <div class="text-light-gray font-monospace fs-8 mt-1"><strong>Output:</strong> ${ex.output}</div>
                          ${ex.explanation ? `<div class="text-muted font-monospace fs-9 mt-1"><strong>Explanation:</strong> ${ex.explanation}</div>` : ''}
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </div>

                <!-- Constraints Section -->
                <div class="lc-constraints mb-4">
                  <div class="text-white fw-bold fs-8 font-monospace mb-2">Constraints:</div>
                  <div class="lc-constraints-body font-monospace fs-8 text-secondary p-2.5 rounded-3 bg-dark bg-opacity-40 border border-secondary border-opacity-20" id="active-q-constraints" style="white-space: pre-wrap;">${activeQ.constraints || activeQ.constraintsText || '• Standard interview constraints apply.'}</div>
                </div>

                <!-- Collapsible Hints Container -->
                <div id="active-q-hints-container" class="${activeQ.hints ? '' : 'd-none'} mb-4">
                  <div class="text-white fw-bold fs-8 font-monospace mb-1.5"><i class="fa-solid fa-lightbulb text-warning me-1"></i>Hints & Invariants:</div>
                  <div class="p-3 rounded-3 bg-warning bg-opacity-10 border border-warning border-opacity-20 fs-8 text-secondary font-monospace" id="active-q-hints">
                    ${activeQ.hints || ''}
                  </div>
                </div>
              </div>

              <!-- Tab 2: Editorial -->
              <div class="tab-pane fade" id="tab-lc-editorial" role="tabpanel">
                <h5 class="text-white fw-bold mb-3"><i class="fa-solid fa-book-open text-warning me-2"></i>Official Algorithmic Editorial</h5>
                <div class="p-3 rounded-3 bg-dark bg-opacity-50 border border-secondary border-opacity-20 text-light-gray fs-8 lh-lg">
                  <h6 class="text-white fw-bold">Approach 1: One-Pass Hash Table</h6>
                  <p>While iterating and inserting elements into the table, we look back to check if the current element's complement already exists in the table. If it exists, we have found a solution and immediately return the corresponding pair of indices.</p>
                  <div class="lc-code-box p-2.5 rounded-2 font-monospace fs-9 text-muted my-2">
                    Complexity: Time O(N) single-pass &bull; Space O(N) Hash Table storage.
                  </div>
                </div>
              </div>

              <!-- Tab 3: Solutions -->
              <div class="tab-pane fade" id="tab-lc-solutions" role="tabpanel">
                <h5 class="text-white fw-bold mb-3"><i class="fa-regular fa-lightbulb text-info me-2"></i>Community Solutions & Polyglot Patterns</h5>
                <div class="lc-code-box p-3 rounded-3 font-monospace fs-8 text-light-gray" style="white-space: pre-wrap;" id="active-q-community-sol">${activeQ.solution || '// Reference solution template\n'}</div>
              </div>

              <!-- Tab 4: Submissions -->
              <div class="tab-pane fade" id="tab-lc-submissions" role="tabpanel">
                <div id="lc-submissions-history">
                  <div class="d-flex align-items-center justify-content-between mb-3">
                    <div class="d-flex align-items-center gap-2">
                      <span class="text-success fw-bold fs-5"><i class="fa-solid fa-circle-check me-1.5"></i>Accepted</span>
                      <span class="text-muted fs-8 font-monospace">86 / 86 testcases passed</span>
                    </div>
                    <div class="d-flex align-items-center gap-2">
                      <button type="button" class="btn btn-xs btn-primary bg-opacity-25 text-primary border border-primary-subtle px-2.5 py-1" id="btn-sub-analysis"><i class="fa-solid fa-wand-magic-sparkles me-1"></i>Analysis</button>
                      <button type="button" class="btn btn-xs btn-success bg-opacity-25 text-success border border-success-subtle px-2.5 py-1" id="btn-sub-solution"><i class="fa-solid fa-code me-1"></i>Solution</button>
                    </div>
                  </div>

                  <!-- Performance Stats Cards -->
                  <div class="row g-2 mb-3">
                    <div class="col-6">
                      <div class="p-3 rounded-3 bg-dark bg-opacity-40 border border-secondary border-opacity-20">
                        <div class="text-muted fs-9 font-monospace mb-1"><i class="fa-regular fa-clock me-1"></i>Runtime</div>
                        <div class="d-flex align-items-baseline gap-2">
                          <span class="text-white fw-bold fs-5" id="lc-sub-runtime-val">1 ms</span>
                          <span class="text-success fs-8 fw-semibold font-monospace" id="lc-sub-runtime-beats">Beats 99.1% <i class="fa-solid fa-bolt fs-9"></i></span>
                        </div>
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="p-3 rounded-3 bg-dark bg-opacity-40 border border-secondary border-opacity-20">
                        <div class="text-muted fs-9 font-monospace mb-1"><i class="fa-solid fa-microchip me-1"></i>Memory</div>
                        <div class="d-flex align-items-baseline gap-2">
                          <span class="text-white fw-bold fs-5" id="lc-sub-mem-val">41.5 MB</span>
                          <span class="text-muted fs-8 fw-semibold font-monospace" id="lc-sub-mem-beats">Beats 95.2%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Distribution Histogram Chart -->
                  <div class="p-3 rounded-3 bg-dark bg-opacity-40 border border-secondary border-opacity-20 mb-3">
                    <div class="d-flex align-items-center justify-content-between text-muted fs-9 mb-2">
                      <span>Runtime Distribution (ms)</span>
                      <span class="text-info font-monospace"><i class="fa-solid fa-circle-user me-1"></i>You are here (1ms)</span>
                    </div>
                    <div class="d-flex align-items-end justify-content-around pt-3 pb-1" style="height: 110px;">
                      <div class="d-flex flex-column align-items-center" style="width: 18%;">
                        <div class="w-100 rounded-top bg-primary bg-opacity-40" style="height: 40px;"></div>
                        <span class="text-muted fs-9 mt-1 font-monospace">&lt;1ms</span>
                      </div>
                      <div class="d-flex flex-column align-items-center position-relative" style="width: 22%;">
                        <span class="badge bg-primary text-white position-absolute" style="top: -24px; font-size: 9px;"><i class="fa-solid fa-user"></i> You</span>
                        <div class="w-100 rounded-top bg-primary" style="height: 75px; box-shadow: 0 0 12px rgba(59, 130, 246, 0.5);"></div>
                        <span class="text-white fw-bold fs-9 mt-1 font-monospace">1ms</span>
                      </div>
                      <div class="d-flex flex-column align-items-center" style="width: 18%;">
                        <div class="w-100 rounded-top bg-primary bg-opacity-30" style="height: 25px;"></div>
                        <span class="text-muted fs-9 mt-1 font-monospace">2ms</span>
                      </div>
                      <div class="d-flex flex-column align-items-center" style="width: 18%;">
                        <div class="w-100 rounded-top bg-primary bg-opacity-20" style="height: 15px;"></div>
                        <span class="text-muted fs-9 mt-1 font-monospace">4ms</span>
                      </div>
                      <div class="d-flex flex-column align-items-center" style="width: 18%;">
                        <div class="w-100 rounded-top bg-primary bg-opacity-10" style="height: 8px;"></div>
                        <span class="text-muted fs-9 mt-1 font-monospace">7ms+</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <!-- Left Pane Footer: Likes, Dislikes, Comments, Favorite, Share -->
            <div class="lc-pane-footer d-flex align-items-center justify-content-between px-3 py-2 border-top border-secondary border-opacity-20 flex-shrink-0">
              <div class="d-flex align-items-center gap-2">
                <button type="button" class="btn btn-sm lc-reaction-btn text-muted" id="btn-lc-like"><i class="fa-regular fa-thumbs-up me-1"></i> <span id="lc-like-count">2.4K</span></button>
                <button type="button" class="btn btn-sm lc-reaction-btn text-muted" id="btn-lc-dislike"><i class="fa-regular fa-thumbs-down"></i></button>
                <button type="button" class="btn btn-sm lc-reaction-btn text-muted" id="btn-lc-comments"><i class="fa-regular fa-comment me-1"></i> 161</button>
              </div>
              <div class="d-flex align-items-center gap-1.5">
                <button type="button" class="btn btn-sm lc-icon-btn text-muted" id="btn-lc-star" title="Add to Favorites"><i class="fa-regular fa-star"></i></button>
                <button type="button" class="btn btn-sm lc-icon-btn text-muted" id="btn-lc-share" title="Share Problem"><i class="fa-solid fa-arrow-up-right-from-square"></i></button>
              </div>
            </div>
          </div>

          <!-- Vertical Moving Resizer / Splitter Handle -->
          <div class="lc-resizer lc-resizer-vertical d-none d-lg-flex" id="lc-vertical-resizer" title="Drag left/right to resize panes">
            <div class="lc-resizer-line"></div>
          </div>

          <!-- RIGHT PANE: Code Editor (Top) + Testcase/Test Result Console (Bottom) -->
          <div class="lc-pane lc-pane-right d-flex flex-column" id="vscode-right-pane">
            
            <!-- Code Editor Top Bar -->
            <div class="lc-editor-header d-flex align-items-center justify-content-between px-3 py-1.5 border-bottom border-secondary border-opacity-20 flex-shrink-0">
              <div class="d-flex align-items-center gap-2">
                <span class="fs-8 fw-bold text-white d-flex align-items-center gap-1.5"><i class="fa-solid fa-code text-success"></i> Code</span>
                <select id="coding-language-select" class="form-select form-select-sm lc-lang-select">
                  <option value="java" selected>Java 21</option>
                  <option value="python">Python 3.12</option>
                  <option value="cpp">C++ 20</option>
                  <option value="javascript">JavaScript</option>
                  <option value="typescript">TypeScript</option>
                  <option value="csharp">C# .NET 8</option>
                  <option value="go">Go 1.22</option>
                  <option value="rust">Rust 1.76</option>
                </select>
                <span class="badge bg-dark text-muted border border-secondary border-opacity-30 fs-9 d-none d-sm-inline-block"><i class="fa-solid fa-lock me-1"></i> Auto</span>
              </div>

              <!-- Tools: Format, Reset, Copy, Font Size, Maximize -->
              <div class="d-flex align-items-center gap-1">
                <button type="button" class="btn btn-sm lc-icon-btn text-muted" id="btn-editor-reset" title="Reset Code Template"><i class="fa-solid fa-rotate-left"></i></button>
                <button type="button" class="btn btn-sm lc-icon-btn text-muted" id="btn-editor-copy" title="Copy Code"><i class="fa-solid fa-copy"></i></button>
                <button type="button" class="btn btn-sm lc-icon-btn text-muted" id="btn-editor-font-dec" title="Decrease Font" style="font-family: monospace; font-weight: bold;">A-</button>
                <button type="button" class="btn btn-sm lc-icon-btn text-muted" id="btn-editor-font-inc" title="Increase Font" style="font-family: monospace; font-weight: bold;">A+</button>
                <button type="button" class="btn btn-sm lc-icon-btn text-muted d-none d-lg-inline-block" id="btn-ide-maximize" title="Maximize Code Editor"><i class="fa-solid fa-expand" id="icon-ide-maximize"></i></button>
              </div>
            </div>

            <!-- Main Code Editor Area with Line Gutter -->
            <div class="lc-editor-wrapper flex-grow-1 position-relative d-flex overflow-hidden" id="agy-editor-wrapper">
              <div class="lc-gutter d-flex flex-column text-end user-select-none" id="lc-line-gutter">
                <span>1</span>
              </div>
              <textarea id="code-editor-textarea" 
                        class="form-control lc-code-input flex-grow-1 border-0 shadow-none" 
                        spellcheck="false" 
                        wrap="off"
                        placeholder="// Enter your solution here...">${activeQ.solution || ''}</textarea>
            </div>

            <!-- Horizontal Moving Resizer / Splitter Handle for Console -->
            <div class="lc-resizer lc-resizer-horizontal" id="lc-horizontal-resizer" title="Drag up/down to resize console">
              <div class="lc-resizer-line-h"></div>
            </div>

            <!-- Editor Status & Console Toggle Footer -->
            <div class="lc-editor-subfooter d-flex align-items-center justify-content-between px-3 py-1.5 border-top border-secondary border-opacity-15 fs-9 font-monospace flex-shrink-0">
              <div class="d-flex align-items-center gap-2">
                <button type="button" class="btn btn-xs lc-btn-console py-0.5 px-2.5 d-flex align-items-center gap-1.5" id="btn-toggle-console" title="Toggle Testcase Console Panel">
                  <i class="fa-solid fa-terminal fs-9 text-secondary"></i>
                  <span>Console</span>
                  <i class="fa-solid fa-chevron-up fs-9" id="icon-console-toggle"></i>
                </button>
                <span id="lc-editor-status" class="text-muted"><i class="fa-solid fa-check text-success me-1"></i>Saved</span>
              </div>
              <span id="lc-cursor-pos" class="text-muted">ln 1, Col 1</span>
            </div>

            <!-- Bottom LeetCode Testcase / Test Result Console Tray (Collapsed by default while typing) -->
            <div class="lc-console-panel border-top border-secondary border-opacity-20 d-flex flex-column flex-shrink-0 collapsed" id="vscode-terminal-panel">
              <!-- Console Tabs Bar -->
              <div class="lc-console-tabs d-flex align-items-center justify-content-between px-2 pt-1 border-bottom border-secondary border-opacity-20 flex-shrink-0">
                <ul class="nav lc-console-nav gap-1" role="tablist">
                  <li class="nav-item">
                    <button class="nav-link py-1 px-2.5 fs-8 active" id="console-tab-testcase-btn" data-bs-toggle="tab" data-bs-target="#console-tab-testcase" type="button" role="tab">
                      <i class="fa-regular fa-square-check text-success me-1"></i> Testcase
                    </button>
                  </li>
                  <li class="nav-item">
                    <button class="nav-link py-1 px-2.5 fs-8" id="console-tab-result-btn" data-bs-toggle="tab" data-bs-target="#console-tab-result" type="button" role="tab">
                      <i class="fa-solid fa-terminal text-primary me-1"></i> Test Result
                    </button>
                  </li>
                </ul>
                <div class="d-flex align-items-center gap-1.5 pb-1">
                  <span class="badge bg-success bg-opacity-25 text-success fs-9 font-monospace" id="console-status-badge">Ready</span>
                  <button type="button" class="btn btn-sm lc-icon-btn py-0 px-1 text-muted" id="btn-close-console" title="Collapse Console Panel"><i class="fa-solid fa-chevron-down fs-9"></i></button>
                </div>
              </div>

              <!-- Console Panes Body -->
              <div class="tab-content flex-grow-1 p-3 overflow-y-auto" style="min-height: 140px; max-height: 240px; background: #141416;">
                
                <!-- Tab 1: Testcase Input Display -->
                <div class="tab-pane fade show active" id="console-tab-testcase" role="tabpanel">
                  <div class="d-flex align-items-center gap-2 mb-2" id="lc-case-pills-row">
                    <button type="button" class="btn btn-xs lc-case-btn active" data-case-index="0" id="btn-case-1"><i class="fa-solid fa-circle-check text-success me-1"></i>Case 1</button>
                    <button type="button" class="btn btn-xs lc-case-btn" data-case-index="1" id="btn-case-2"><i class="fa-solid fa-circle-check text-success me-1"></i>Case 2</button>
                    <button type="button" class="btn btn-xs lc-case-btn" data-case-index="2" id="btn-case-3"><i class="fa-solid fa-circle-check text-success me-1"></i>Case 3</button>
                  </div>
                  <div class="lc-testcase-card p-2.5 rounded-3 font-monospace fs-8 text-light-gray" id="lc-testcase-content">
                    <div class="text-muted fs-9 mb-1">Input =</div>
                    <div class="p-1.5 rounded bg-black bg-opacity-50 border border-secondary border-opacity-20 mb-2 font-monospace" id="lc-case-input-display">nums = [2,7,11,15], target = 9</div>
                    <div class="text-muted fs-9 mb-1">Expected Output =</div>
                    <div class="p-1.5 rounded bg-black bg-opacity-50 border border-secondary border-opacity-20 text-emerald font-monospace" id="lc-case-expected-display">[0, 1]</div>
                  </div>
                </div>

                <!-- Tab 2: Test Result Execution Status -->
                <div class="tab-pane fade" id="console-tab-result" role="tabpanel">
                  <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-2">
                    <div class="d-flex align-items-center gap-3">
                      <span class="text-success fw-bold fs-5" id="lc-result-verdict">Accepted</span>
                      <span class="text-muted fs-8 font-monospace" id="lc-result-runtime">Runtime: 0 ms</span>
                    </div>
                    <span class="badge bg-dark border border-secondary border-opacity-30 text-muted fs-9 font-monospace" id="lc-result-summary-badge">Sample cases passed</span>
                  </div>
                  <div class="d-flex align-items-center gap-2 mb-2" id="lc-result-cases-row">
                    <button type="button" class="btn btn-xs lc-case-btn active" data-res-case-index="0" id="res-case-btn-1"><i class="fa-solid fa-circle-check text-success me-1"></i>Case 1</button>
                    <button type="button" class="btn btn-xs lc-case-btn" data-res-case-index="1" id="res-case-btn-2"><i class="fa-solid fa-circle-check text-success me-1"></i>Case 2</button>
                    <button type="button" class="btn btn-xs lc-case-btn" data-res-case-index="2" id="res-case-btn-3"><i class="fa-solid fa-circle-check text-success me-1"></i>Case 3</button>
                  </div>
                  <div class="lc-testcase-card p-2.5 rounded-3 font-monospace fs-8 text-light-gray mb-2" id="lc-result-diff-box">
                    <div class="text-muted fs-9 mb-1">Input:</div>
                    <div class="p-1.5 rounded bg-black bg-opacity-50 border border-secondary border-opacity-20 mb-2 font-monospace" id="lc-result-input">nums = [2,7,11,15], target = 9</div>
                    <div class="text-muted fs-9 mb-1">Your Output:</div>
                    <div class="p-1.5 rounded bg-black bg-opacity-50 border border-secondary border-opacity-20 text-success mb-2 font-monospace" id="lc-result-output">[0, 1]</div>
                    <div class="text-muted fs-9 mb-1">Expected:</div>
                    <div class="p-1.5 rounded bg-black bg-opacity-50 border border-secondary border-opacity-20 text-light font-monospace" id="lc-result-expected">[0, 1]</div>
                  </div>
                  <div class="font-monospace fs-9 p-2 rounded bg-black bg-opacity-40 border border-secondary border-opacity-15" id="console-output-text" style="color: #22c55e; white-space: pre-wrap;">
// Execution finished with 0 errors. All sample test cases passed.
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    `;
  },

  // 4b. Comprehensive Aptitude & Technical Reasoning Hub (Curriculum from The Aptitude Triad - 42 Modules)
  aptitudeHub: (topics = [], questions = []) => {
    const chaptersList = (topics && topics.length > 0)
      ? topics
      : ((typeof window !== 'undefined' && window.APTITUDE_TRIAD_CURRICULUM && window.APTITUDE_TRIAD_CURRICULUM.length > 0)
          ? window.APTITUDE_TRIAD_CURRICULUM
          : []);

    // Fallback if not loaded
    const safeChapters = (chaptersList.length > 0) ? chaptersList : [
      {
        id: 1,
        chapterNumber: "01",
        section: "Section A: Quantitative",
        title: "Number Systems & Divisibility Hacks",
        category: "Quantitative Aptitude",
        readTime: "7 min read",
        formulas: [
          "Natural Numbers = {1, 2, 3, 4, ...}",
          "Sum of first N natural numbers = N × (N + 1) / 2"
        ],
        concepts: "Number systems are the foundation of all technical assessments.",
        examples: [
          {
            question: "Find remainder when (17^200) is divided by 18.",
            stepByStep: "By Euler/Binomial theorem: (18 - 1)^200 mod 18 = (-1)^200 = 1.",
            answer: "1"
          }
        ],
        practiceQuestions: []
      }
    ];

    // Extract all practice questions from curriculum
    let allPracticeQuestions = (questions && questions.length > 0) ? questions : [];
    if (allPracticeQuestions.length === 0) {
      safeChapters.forEach(chap => {
        if (Array.isArray(chap.practiceQuestions)) {
          chap.practiceQuestions.forEach(pq => {
            allPracticeQuestions.push({
              ...pq,
              category: chap.category || (chap.section.includes('Quantitative') ? 'Quantitative Aptitude' : chap.section.includes('Logical') ? 'Logical Reasoning' : 'Verbal Ability'),
              topic: chap.title
            });
          });
        }
      });
    }

    const quantChapters = safeChapters.filter(c => (c.section || '').includes('Quantitative') || (c.category || '').includes('Quantitative'));
    const logicalChapters = safeChapters.filter(c => (c.section || '').includes('Logical') || (c.category || '').includes('Logical'));
    const verbalChapters = safeChapters.filter(c => (c.section || '').includes('Verbal') || (c.category || '').includes('Verbal'));

    const firstChap = safeChapters[0];

    return `
      <div class="aptitude-hub-container">
        <!-- Top Switcher Header -->
        <div class="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-3">
          <div>
            <h4 class="text-white fw-bold mb-1"><i class="fa-solid fa-book-open-reader text-primary me-2"></i>Aptitude & Technical Reasoning Hub</h4>
            <p class="text-muted fs-8 mb-0">Master Quantitative Aptitude, Logical Reasoning & Verbal Ability across ${safeChapters.length} comprehensive book modules and practice quizzes.</p>
          </div>
          <div class="aptitude-view-toggle">
            <button class="aptitude-view-btn active" id="btn-view-book" data-mode="book">
              <i class="fa-solid fa-book me-1"></i> Book / Reading View
            </button>
            <button class="aptitude-view-btn" id="btn-view-practice" data-mode="practice">
              <i class="fa-solid fa-circle-check me-1"></i> Practice Quiz (${allPracticeQuestions.length})
            </button>
          </div>
        </div>

        <!-- MODE 1: BOOK / READING VIEW -->
        <div id="aptitude-book-view" class="book-outer-wrapper">
          <!-- Reader Top Controls Bar -->
          <div class="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2 p-2 rounded bg-dark border border-secondary border-opacity-25">
            <!-- Chapter Selector Trigger & Searchable Modal -->
            <div class="d-flex align-items-center gap-2 flex-wrap min-w-0">
              <span class="text-muted fs-8 fw-semibold d-none d-sm-inline">Chapter:</span>
              <button type="button" class="btn btn-sm btn-outline-secondary d-flex align-items-center justify-content-between gap-2 text-start px-2.5 py-1.5 rounded-3" id="btn-open-chapter-selector" style="min-width: 220px; max-width: 360px; background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.15);">
                <span class="text-truncate fw-semibold text-white fs-8" id="current-chapter-btn-label">Ch ${firstChap.chapterNumber}: ${firstChap.title}</span>
                <i class="fa-solid fa-chevron-down text-muted fs-9 flex-shrink-0 ms-2"></i>
              </button>
              <select id="book-chapter-select" class="d-none" aria-hidden="true">
                <optgroup label="Section A: Quantitative Aptitude (${quantChapters.length} Modules)">
                  ${quantChapters.map(chap => `<option value="${chap.id}">Ch ${chap.chapterNumber}: ${chap.title}</option>`).join('')}
                </optgroup>
                <optgroup label="Section B: Logical Reasoning (${logicalChapters.length} Modules)">
                  ${logicalChapters.map(chap => `<option value="${chap.id}">Ch ${chap.chapterNumber}: ${chap.title}</option>`).join('')}
                </optgroup>
                <optgroup label="Section C: Verbal Ability (${verbalChapters.length} Modules)">
                  ${verbalChapters.map(chap => `<option value="${chap.id}">Ch ${chap.chapterNumber}: ${chap.title}</option>`).join('')}
                </optgroup>
              </select>
            </div>

            <!-- Reader Customization Controls -->
            <div class="d-flex align-items-center gap-2">
              <!-- Theme Picker -->
              <div class="btn-group btn-group-sm">
                <button class="btn btn-dark border-secondary text-white fs-9 active" id="btn-theme-dark" title="Dark Study Room Theme">🌙 Dark</button>
                <button class="btn btn-dark border-secondary text-warning fs-9" id="btn-theme-sepia" title="Warm Sepia Parchment">📜 Sepia</button>
                <button class="btn btn-dark border-secondary text-light fs-9" id="btn-theme-paper" title="Clean Paper White">📄 Paper</button>
              </div>

              <!-- Font Sizing -->
              <button class="btn btn-sm btn-glass py-0 px-2 fs-9 text-muted" id="btn-book-font-dec" title="Decrease Font">A-</button>
              <button class="btn btn-sm btn-glass py-0 px-2 fs-9 text-muted" id="btn-book-font-inc" title="Increase Font">A+</button>
              
              <!-- Bookmark -->
              <button class="btn btn-sm btn-glass py-0 px-2 fs-9 text-info" id="btn-book-bookmark" title="Bookmark This Page">
                <i class="fa-regular fa-bookmark"></i>
              </button>
            </div>
          </div>

          <!-- The Realistic Book Page Card -->
          <div class="book-reader-card book-theme-dark" id="book-page-card">
            <div class="book-spine-line"></div>
            
            <div class="book-page-content" id="book-content-container">
              <!-- Header Meta -->
              <div class="d-flex align-items-center justify-content-between mb-3 border-bottom border-secondary border-opacity-25 pb-2">
                <span class="text-primary fw-bold fs-8 text-uppercase tracking-wider" id="book-chap-category">
                  ${firstChap.section || firstChap.category}
                </span>
                <span class="text-muted fs-8 book-meta-text" id="book-chap-readtime">
                  <i class="fa-regular fa-clock me-1"></i> ${firstChap.readTime}
                </span>
              </div>

              <!-- Chapter Title -->
              <h2 class="book-chapter-title mb-3 fs-4" id="book-chap-title">
                Chapter ${firstChap.chapterNumber}: ${firstChap.title}
              </h2>

              <!-- Theory / Concept in Plain English -->
              <div class="mb-4">
                <p class="fs-7" id="book-chap-concepts" style="line-height: 1.8;">
                  ${firstChap.concepts}
                </p>
              </div>

              <!-- Formula Box Callout -->
              <div class="book-formula-card mb-4" id="book-formulas-container">
                <div class="d-flex align-items-center gap-2 mb-2">
                  <i class="fa-solid fa-square-root-variable text-warning fs-6"></i>
                  <strong class="fs-7 text-uppercase tracking-wide">Key Formulas & Shortcuts</strong>
                </div>
                <ul class="mb-0 ps-3 fs-8" id="book-formulas-list">
                  ${(firstChap.formulas || []).map(f => `<li class="mb-1"><code>${f}</code></li>`).join('')}
                </ul>
              </div>

              <!-- Solved Examples Breakdown -->
              <div class="mt-4 mb-4">
                <h6 class="fw-bold fs-7 text-uppercase mb-2" style="letter-spacing: 0.05em;">
                  <i class="fa-solid fa-pen-to-square text-info me-1"></i> Solved Exemplar Problem
                </h6>
                <div class="book-example-card" id="book-example-container">
                  <div class="fw-bold mb-2 fs-7" id="book-example-q">${firstChap.examples && firstChap.examples[0] ? firstChap.examples[0].question : ''}</div>
                  <pre class="font-monospace fs-8 p-2 rounded bg-black bg-opacity-25 border border-secondary border-opacity-25 mb-2" id="book-example-steps" style="white-space: pre-wrap;">${firstChap.examples && firstChap.examples[0] ? firstChap.examples[0].stepByStep : ''}</pre>
                  <div class="text-success fw-bold fs-8">Correct Answer: <span id="book-example-ans" class="badge bg-success-subtle text-success">${firstChap.examples && firstChap.examples[0] ? firstChap.examples[0].answer : ''}</span></div>
                </div>
              </div>

              <!-- Chapter Practice Challenges & Solutions -->
              <div class="mt-4" id="book-practice-mcqs-container">
                <h6 class="fw-bold fs-7 text-uppercase mb-2" style="letter-spacing: 0.05em;">
                  <i class="fa-solid fa-list-check text-warning me-1"></i> Chapter Practice Challenges & Solutions
                </h6>
                <div id="book-chapter-mcqs-list" class="d-flex flex-column gap-3">
                  <!-- Injected dynamically in app.js -->
                </div>
              </div>
            </div>

            <!-- Book Footer & Pagination -->
            <div class="p-3 border-top border-secondary border-opacity-25 d-flex align-items-center justify-content-between flex-wrap gap-2">
              <button class="btn btn-sm btn-glass text-muted py-1.5 px-3 fs-8" id="btn-book-prev" disabled>
                <i class="fa-solid fa-arrow-left me-1"></i> Previous Chapter
              </button>

              <div class="text-muted fs-8 font-monospace book-meta-text" id="book-page-indicator">
                Chapter 1 of ${safeChapters.length}
              </div>

              <div class="d-flex gap-2">
                <button class="btn btn-sm btn-outline-primary fs-8 py-1.5 px-3" id="btn-switch-to-quiz-for-chap">
                  <i class="fa-solid fa-pen-nib me-1"></i> Practice Topic MCQs
                </button>
                <button class="btn btn-sm btn-primary text-white fw-bold py-1.5 px-3 fs-8" id="btn-book-next">
                  Next Chapter <i class="fa-solid fa-arrow-right ms-1"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- MODE 2: INTERACTIVE PRACTICE QUIZ -->
        <div id="aptitude-practice-view" class="d-none">
          <!-- Filter Tabs & Stats -->
          <div class="row g-3 mb-4">
            <div class="col-md-8 col-12">
              <div class="d-flex gap-1 overflow-x-auto pb-1" id="aptitude-category-filters">
                <button class="btn btn-sm btn-glass active-apt-filter" data-cat="ALL">All Topics</button>
                <button class="btn btn-sm btn-glass text-info" data-cat="Quantitative Aptitude">Quantitative</button>
                <button class="btn btn-sm btn-glass text-warning" data-cat="Logical Reasoning">Logical Reasoning</button>
                <button class="btn btn-sm btn-glass text-success" data-cat="Verbal Ability">Verbal Ability</button>
              </div>
            </div>
            <div class="col-md-4 col-12 text-md-end">
              <span class="badge bg-primary bg-opacity-20 text-primary border border-primary-subtle p-2 fs-8" id="aptitude-score-badge">
                <i class="fa-solid fa-award me-1"></i> Solved: <span id="apt-solved-count">0</span> / ${allPracticeQuestions.length}
              </span>
            </div>
          </div>

          <!-- Questions Cards List -->
          <div class="d-flex flex-column gap-3" id="aptitude-questions-list">
            ${allPracticeQuestions.map((q, idx) => `
              <div class="glass-panel p-4 aptitude-quiz-card" data-qid="${q.id || (idx + 1)}" data-cat="${q.category}" data-correct="${q.correctIndex}">
                <div class="d-flex align-items-center justify-content-between mb-2 flex-wrap gap-2">
                  <div class="d-flex align-items-center gap-2">
                    <span class="badge bg-secondary bg-opacity-30 text-white font-monospace">Q${idx + 1}</span>
                    <span class="badge bg-info-subtle text-info fs-9">${q.category}</span>
                    <span class="text-muted fs-8 d-none d-sm-inline">• ${q.topic}</span>
                  </div>
                  <div>
                    <span class="badge bg-warning-subtle text-warning fs-9"><i class="fa-regular fa-clock me-1"></i>Timed MCQ</span>
                  </div>
                </div>

                <h6 class="text-white fw-bold mb-3 fs-7" style="line-height: 1.6;">${q.question}</h6>

                <div class="row g-2 mb-3">
                  ${(q.options || []).map((opt, optIdx) => `
                    <div class="col-md-6 col-12">
                      <div class="p-2 px-3 rounded border border-secondary border-opacity-25 aptitude-option-card"
                           style="cursor: pointer; background: rgba(24, 24, 27, 0.5);"
                           data-opt-index="${optIdx}">
                        <div class="d-flex align-items-center gap-2">
                          <span class="badge bg-dark border border-secondary border-opacity-50 text-muted font-monospace fs-9">${String.fromCharCode(65 + optIdx)}</span>
                          <span class="text-light fs-8 opt-text">${opt}</span>
                        </div>
                      </div>
                    </div>
                  `).join('')}
                </div>

                <!-- Explanation Box (Initially Hidden) -->
                <div class="aptitude-explanation-box d-none p-3 rounded bg-black bg-opacity-40 border border-secondary border-opacity-25">
                  <div class="d-flex align-items-center justify-content-between mb-2">
                    <strong class="text-success fs-8"><i class="fa-solid fa-check-circle me-1"></i> Explanation</strong>
                    <span class="text-muted fs-9 font-monospace">Shortcut Available</span>
                  </div>
                  <p class="text-secondary fs-8 mb-2" style="line-height: 1.6;">${q.explanation || 'Refer to fundamental principles and formulas.'}</p>
                  ${q.shortcut ? `
                    <div class="p-2 rounded bg-warning bg-opacity-10 border border-warning border-opacity-25 text-warning fs-8 font-monospace">
                      <i class="fa-solid fa-bolt me-1"></i> <strong>Exam Hack:</strong> ${q.shortcut}
                    </div>
                  ` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Searchable Chapters Modal -->
        <div class="modal fade" id="aptitudeChaptersModal" tabindex="-1" aria-labelledby="aptitudeChaptersModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
            <div class="modal-content bg-dark border border-secondary border-opacity-30 text-white shadow-lg" style="background: #141418 !important;">
              <div class="modal-header border-bottom border-secondary border-opacity-20 pb-3">
                <div class="d-flex align-items-center gap-2">
                  <i class="fa-solid fa-book-open-reader text-primary fs-5"></i>
                  <h5 class="modal-title fw-bold fs-6 m-0" id="aptitudeChaptersModalLabel">Select Curriculum Module</h5>
                  <span class="badge bg-indigo-subtle text-primary border border-primary-subtle fs-9">${safeChapters.length} Chapters</span>
                </div>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body p-3">
                <!-- Search and Section Tabs -->
                <div class="mb-3">
                  <div class="input-group input-group-sm mb-2.5">
                    <span class="input-group-text bg-black bg-opacity-40 border-secondary text-muted"><i class="fa-solid fa-magnifying-glass"></i></span>
                    <input type="text" id="modal-chapter-search" class="form-control bg-black bg-opacity-40 text-white border-secondary fs-8" placeholder="Search chapters by title or keywords...">
                  </div>
                  <div class="d-flex flex-nowrap gap-1.5 overflow-x-auto pb-1" id="modal-chapter-tabs" style="scrollbar-width: none;">
                    <button type="button" class="btn btn-sm btn-glass text-nowrap active btn-primary py-1 px-2.5 fs-9 filter-chap-tab" data-section="all">All (${safeChapters.length})</button>
                    <button type="button" class="btn btn-sm btn-glass text-nowrap py-1 px-2.5 fs-9 filter-chap-tab" data-section="quant">Quantitative (${quantChapters.length})</button>
                    <button type="button" class="btn btn-sm btn-glass text-nowrap py-1 px-2.5 fs-9 filter-chap-tab" data-section="logical">Logical (${logicalChapters.length})</button>
                    <button type="button" class="btn btn-sm btn-glass text-nowrap py-1 px-2.5 fs-9 filter-chap-tab" data-section="verbal">Verbal (${verbalChapters.length})</button>
                  </div>
                </div>

                <!-- Chapters List -->
                <div class="d-flex flex-column gap-1.5" id="modal-chapters-list" style="max-height: 55vh; overflow-y: auto; scrollbar-width: thin; scrollbar-color: #3f3f46 transparent;">
                  ${safeChapters.map((chap, cIdx) => {
                    const sec = (chap.section || chap.category || '').toLowerCase();
                    const secTag = sec.includes('quant') ? 'quant' : sec.includes('logic') ? 'logical' : 'verbal';
                    const secBadge = secTag === 'quant' ? 'primary' : secTag === 'logical' ? 'info' : 'warning';
                    return `
                      <div class="chapter-modal-item p-2.5 rounded border border-secondary border-opacity-20 d-flex align-items-center justify-content-between gap-2" 
                           style="cursor: pointer; transition: all 0.15s ease; background: rgba(255,255,255,0.02);"
                           data-chap-id="${chap.id}"
                           data-chap-idx="${cIdx}"
                           data-sec="${secTag}"
                           data-title="${(chap.title || '').toLowerCase()}">
                        <div class="d-flex align-items-center gap-2.5 min-w-0">
                          <span class="badge bg-${secBadge}-subtle text-${secBadge} border border-${secBadge}-subtle fs-9 font-monospace flex-shrink-0">Ch ${chap.chapterNumber}</span>
                          <span class="text-light fw-medium fs-8 text-truncate">${chap.title}</span>
                        </div>
                        <div class="d-flex align-items-center gap-2 flex-shrink-0">
                          <span class="text-muted fs-9 d-none d-sm-inline"><i class="fa-regular fa-clock me-1"></i>${chap.readTime || '8 min'}</span>
                          <i class="fa-solid fa-chevron-right text-muted fs-9"></i>
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },


  // 5. Mock Exams Lobby & Leaderboard
  mockExams: (tests = [], leaderboard = []) => `
    <div class="row g-4">
      <!-- Create Exam form -->
      <div class="col-lg-4">
        <div class="glass-panel p-4 h-100">
          <h5 class="text-white fw-bold mb-4"><i class="fa-solid fa-stopwatch text-indigo me-2"></i>Start Timed Assessment</h5>
          <form id="mock-exam-form">
            <div class="mb-3">
              <label class="form-label text-muted fs-7">TOPIC CATEGORY</label>
              <select id="mock-category" class="form-select glass-input">
                <option value="DSA">DSA & Data Structures</option>
                <option value="Java">Java 21 & OOP</option>
                <option value="SQL">SQL & Database Schema</option>
                <option value="OS">Operating Systems</option>
                <option value="CN">Computer Networks</option>
                <option value="Quant">Quantitative Aptitude</option>
                <option value="Logical">Logical Reasoning</option>
                <option value="Verbal">Verbal Ability</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label text-muted fs-7">EXAM DURATION</label>
              <select id="mock-duration" class="form-select glass-input">
                <option value="30">30 Minutes</option>
                <option value="45" selected>45 Minutes</option>
                <option value="60">60 Minutes</option>
                <option value="90">90 Minutes</option>
              </select>
            </div>
            <div class="mb-4">
              <label class="form-label text-muted fs-7">QUESTION COUNT</label>
              <select id="mock-qcount" class="form-select glass-input">
                <option value="15">15 Questions</option>
                <option value="30">30 Questions</option>
                <option value="50" selected>50 Questions (Standard Dialpad)</option>
              </select>
            </div>
            <button type="submit" class="btn btn-premium w-100 py-3"><i class="fa-solid fa-play me-1"></i> Initialize Exam</button>
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
                ${(leaderboard && leaderboard.length > 0) ? leaderboard.map((l, idx) => `
                  <tr class="border-secondary-subtle fs-7">
                    <td><span class="badge ${idx === 0 ? 'bg-warning' : idx === 1 ? 'bg-light text-dark' : 'bg-secondary'} rounded-circle">${idx + 1}</span></td>
                    <td>${l.user ? l.user.name : (l.userName || 'Candidate')}</td>
                    <td>${l.category}</td>
                    <td class="text-end fw-bold text-white">${l.score} pts</td>
                  </tr>
                `).join('') : `
                  <tr>
                    <td colspan="4" class="text-center py-4 text-muted fs-8">
                      <i class="fa-solid fa-award display-6 mb-2"></i><br>
                      Be the first to complete a 50-MCQ assessment and claim #1 on the Global Leaderboard!
                    </td>
                  </tr>
                `}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,

  mockExamActive: (testId, category, duration, questionCount) => `
    <div class="proctored-exam-container position-relative" id="proctored-exam-zone" style="user-select: none;">
      <!-- Compact Security & Proctoring Strip -->
      <div class="d-flex align-items-center justify-content-between mb-3 p-2 px-3 rounded-3 bg-dark border border-secondary border-opacity-25 flex-wrap gap-2">
        <div class="d-flex align-items-center gap-2">
          <span class="badge bg-primary-subtle text-primary border border-primary-subtle fs-8 px-3 py-1">${category}</span>
          <span class="badge bg-danger bg-opacity-20 text-danger border border-danger-subtle fs-9">
            <i class="fa-solid fa-shield-halved me-1"></i> Anti-Cheat Protected
          </span>
        </div>
        <div class="d-flex align-items-center gap-3">
          <button type="button" class="btn btn-sm btn-glass text-muted py-1 px-3 fs-9" id="btn-toggle-exam-layout" title="Toggle Layout (Question on Top vs Side-by-Side)">
            <i class="fa-solid fa-arrows-up-down me-1"></i> Flip View
          </button>
          <button type="button" class="btn btn-sm btn-glass text-info py-1 px-3 fs-9" id="btn-toggle-fullscreen" title="Toggle Fullscreen Mode">
            <i class="fa-solid fa-expand me-1" id="fullscreen-icon"></i> <span id="fullscreen-text">Fullscreen</span>
          </button>
          <div class="text-danger fw-bold fs-5 font-monospace d-flex align-items-center gap-2" id="mock-timer-box">
            <i class="fa-solid fa-stopwatch fa-spin-pulse"></i>
            <span id="mock-timer-display">${duration}:00</span>
          </div>
        </div>
      </div>

      <div class="row g-4" id="mock-exam-main-grid">
        <!-- 1. Question Dialing Pad Panel -->
        <div class="col-lg-4 col-12 order-lg-1 order-2" id="mock-dialpad-col">
          <div class="glass-panel p-3 p-md-4 mb-4">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <h6 class="text-white fw-bold m-0 fs-7"><i class="fa-solid fa-grip me-1 text-primary"></i> Question Dialing Pad</h6>
              <span id="mock-answered-count" class="badge bg-success-subtle text-success fs-8">0/${questionCount} Answered</span>
            </div>
            
            <div class="progress mb-3 bg-secondary bg-opacity-25" style="height: 6px; border-radius: 3px;">
              <div id="mock-progress-bar" class="progress-bar bg-primary" role="progressbar" style="width: ${(1 / questionCount) * 100}%"></div>
            </div>

            <!-- Enlarged Dialing Pad Grid (Prominent Touch Buttons) -->
            <div class="dialpad-grid overflow-y-auto mb-3 p-2 rounded bg-black bg-opacity-40 border border-secondary border-opacity-25" id="mock-question-palette" style="max-height: 280px;">
              ${Array.from({ length: questionCount }, (_, i) => `
                <button type="button" class="dialpad-btn btn-jump-q ${i === 0 ? 'status-current' : 'status-unvisited'}" data-q-index="${i}" id="palette-btn-${i}">
                  ${i + 1}
                </button>
              `).join('')}
            </div>

            <!-- Legend Status -->
            <div class="d-flex justify-content-between text-muted fs-9 mb-3 flex-wrap gap-1">
              <span><span class="badge bg-success p-1 me-1">●</span> Answered</span>
              <span><span class="badge p-1 me-1" style="background:#7e22ce;">●</span> Marked</span>
              <span><span class="badge bg-dark border border-secondary p-1 me-1">●</span> Unvisited</span>
            </div>
            
            <button class="btn btn-premium w-100 py-2 fw-bold fs-7" id="btn-submit-mock-exam" data-test-id="${testId}">
              <i class="fa-solid fa-paper-plane me-1"></i> Submit & Finish Test
            </button>
          </div>
        </div>

        <!-- 2. Active Question Card Workspace -->
        <div class="col-lg-8 col-12 order-lg-2 order-1" id="mock-question-col">
          <div class="glass-panel p-4 h-100 d-flex flex-column justify-content-between" id="mock-question-card-workspace" style="min-height: 480px;">
            <div class="text-center py-5">
              <div class="spinner-border text-primary" role="status"></div>
              <p class="text-muted mt-3">Loading dynamic assessment questions...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,

  mockExamResult: (stats, questions, userAnswers) => `
    <div class="glass-panel p-4 p-md-5 mb-4 text-center position-relative overflow-hidden ${stats.percentage >= 50 ? '' : ''}">
      <div class="mb-3">
        <span class="badge ${stats.percentage >= 80 ? 'bg-success' : stats.percentage >= 50 ? 'bg-warning text-dark' : 'bg-danger'} fs-6 px-4 py-2 text-uppercase">
          ${stats.percentage >= 80 ? '🌟 Assessment Passed with Distinction' : stats.percentage >= 50 ? '👍 Assessment Cleared' : '📚 Needs Further Study'}
        </span>
      </div>
      <h2 class="text-white fw-extrabold mb-2 display-6">Scorecard: ${stats.score} / ${stats.total}</h2>
      <p class="text-muted fs-6 mb-4">Accuracy: <strong class="text-primary">${stats.percentage}%</strong> • Time Taken: <strong class="text-white">${stats.timeSpent}</strong></p>

      <!-- Earned Performance Score Alert -->
      <div class="d-inline-flex align-items-center gap-3 bg-indigo bg-opacity-25 border border-primary px-4 py-3 rounded-pill mb-4">
        <i class="fa-solid fa-chart-line text-cyan fs-4"></i>
        <span class="text-white fw-bold fs-6">+${stats.earnedXp} Points Credited to Candidate Assessment Profile!</span>
      </div>

      <!-- Top 50 Free Lifetime Pro Pass Award Banner -->
      ${stats.percentage >= 60 ? `
        <div class="alert alert-dark border-warning border-opacity-50 p-3 mb-4 rounded-3 text-start d-flex align-items-center gap-3" style="background: linear-gradient(90deg, rgba(30, 27, 75, 0.9) 0%, rgba(120, 53, 15, 0.5) 100%);">
          <div class="display-6 text-warning"><i class="fa-solid fa-crown"></i></div>
          <div>
            <span class="badge bg-warning text-dark font-monospace fw-bold mb-1"><i class="fa-solid fa-trophy me-1"></i> TOP 50 RANK REWARD UNLOCKED</span>
            <h5 class="text-white fw-bold mb-1">Free Lifetime Pro Subscription Activated!</h5>
            <p class="text-secondary fs-8 mb-0">Congratulations! With an accuracy of <strong>${stats.percentage}%</strong>, you've qualified for the PrepSpace Top 50 Leaderboard League. You have been granted lifetime Pro access with zero fees!</p>
          </div>
        </div>
      ` : ''}

      <div class="row g-3 justify-content-center max-w-700 mx-auto mb-4">
        <div class="col-4">
          <div class="stat-card p-3 text-center">
            <div class="stat-num text-success">${stats.correctCount}</div>
            <div class="stat-label text-muted">CORRECT</div>
          </div>
        </div>
        <div class="col-4">
          <div class="stat-card p-3 text-center">
            <div class="stat-num text-danger">${stats.incorrectCount}</div>
            <div class="stat-label text-muted">INCORRECT</div>
          </div>
        </div>
        <div class="col-4">
          <div class="stat-card p-3 text-center">
            <div class="stat-num text-white">${stats.unansweredCount}</div>
            <div class="stat-label text-muted">SKIPPED</div>
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
                  ${!isAnswered ? 'Skipped' : isCorrect ? '✓ Correct (+10 Pts)' : '✗ Incorrect (0 Pts)'}
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

  // 7A. Real Candidate Interview Experiences & Debriefs Hub
  experiences: (experiencesList) => {
    return `
      <div class="interview-experiences-hub d-flex flex-column gap-2 w-100">
        <!-- Sleek High-Density Toolbar (Edge-to-Edge Compact Layout) -->
        <div class="exp-card p-2.5 p-md-3 mb-1">
          <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-2 pb-2 border-bottom border-secondary border-opacity-15">
            <div class="d-flex align-items-center gap-2">
              <div class="exp-company-badge text-warning" style="width: 34px; height: 34px; font-size: 1rem;">
                <i class="fa-solid fa-user-tie"></i>
              </div>
              <div>
                <h6 class="text-white fw-bold m-0 fs-7">Interview Experiences Hub</h6>
                <span class="text-muted fs-9 d-none d-md-inline">Verified technical debriefs, rounds, and compensation from real engineers.</span>
              </div>
            </div>
            <button class="btn btn-premium btn-sm px-3 py-1 fs-8 fw-semibold" id="btn-open-share-exp-modal">
              <i class="fa-solid fa-plus me-1"></i> Share Experience
            </button>
          </div>

          <!-- Controls: Filters & Search in One Compact Line -->
          <div class="row g-2 align-items-center">
            <div class="col-12 col-md-5 col-xl-6">
              <div class="input-group input-group-sm">
                <span class="input-group-text bg-dark border-secondary text-secondary py-1"><i class="fa-solid fa-magnifying-glass fs-9"></i></span>
                <input type="text" id="exp-search-input" class="form-control glass-input fs-8 py-1" placeholder="Search company, role, DSA question...">
              </div>
            </div>
            <div class="col-6 col-md-3 col-xl-2">
              <select id="exp-company-filter" class="form-select form-select-sm glass-input fs-8 py-1 text-white">
                <option value="ALL">All Companies</option>
                <option value="Google">Google</option>
                <option value="Amazon">Amazon</option>
                <option value="Microsoft">Microsoft</option>
                <option value="Meta">Meta</option>
                <option value="TCS">TCS (Digital / Prime)</option>
                <option value="Infosys">Infosys (SP / DSE)</option>
                <option value="Atlassian">Atlassian</option>
                <option value="Adobe">Adobe</option>
                <option value="Uber">Uber</option>
                <option value="Oracle">Oracle</option>
                <option value="Flipkart">Flipkart</option>
                <option value="Walmart">Walmart</option>
              </select>
            </div>
            <div class="col-6 col-md-2 col-xl-2">
              <select id="exp-verdict-filter" class="form-select form-select-sm glass-input fs-8 py-1 text-white">
                <option value="ALL">All Verdicts</option>
                <option value="OFFER">Offer Received</option>
                <option value="REJECTED">Rejected</option>
                <option value="IN_PROGRESS">In Progress</option>
              </select>
            </div>
            <div class="col-12 col-md-2 col-xl-2 text-md-end">
              <span class="badge bg-dark text-warning border border-secondary border-opacity-30 fs-9 px-2 py-1 font-monospace" id="exp-count-badge">Showing Debriefs</span>
            </div>
          </div>
        </div>

        <!-- Experiences List Container (Edge to Edge) -->
        <div class="d-flex flex-column gap-2.5 w-100" id="experiences-cards-container">
          <!-- Rendered dynamically by app.js -->
        </div>

        <!-- Share Experience Modal -->
        <div class="modal fade" id="shareExperienceModal" tabindex="-1" aria-labelledby="shareExperienceModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content bg-dark border-secondary text-light">
              <div class="modal-header border-secondary">
                <h5 class="modal-title text-white fw-bold" id="shareExperienceModalLabel"><i class="fa-solid fa-pen-to-square me-2 text-primary"></i>Share Your Interview Experience</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form id="form-share-experience">
                  <div class="row g-3 mb-3">
                    <div class="col-md-6">
                      <label class="form-label fs-8 text-muted fw-semibold">COMPANY NAME *</label>
                      <input type="text" id="modal-exp-company" class="form-control glass-input fs-8" placeholder="e.g. Amazon, Google, TCS" required>
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fs-8 text-muted fw-semibold">TARGET ROLE *</label>
                      <input type="text" id="modal-exp-role" class="form-control glass-input fs-8" placeholder="e.g. SDE-1, Full Stack Engineer" required>
                    </div>
                  </div>
                  <div class="row g-3 mb-3">
                    <div class="col-md-4">
                      <label class="form-label fs-8 text-muted fw-semibold">EXPERIENCE LEVEL</label>
                      <select id="modal-exp-level" class="form-select glass-input fs-8 text-white">
                        <option value="College / Fresher">College / Fresher</option>
                        <option value="1 - 3 YOE">1 - 3 YOE</option>
                        <option value="3 - 6 YOE">3 - 6 YOE</option>
                        <option value="Senior / Staff">Senior / Staff</option>
                      </select>
                    </div>
                    <div class="col-md-4">
                      <label class="form-label fs-8 text-muted fw-semibold">INTERVIEW VERDICT *</label>
                      <select id="modal-exp-verdict" class="form-select glass-input fs-8 text-white">
                        <option value="OFFER">Offer Received / Selected</option>
                        <option value="REJECTED">Rejected</option>
                        <option value="IN_PROGRESS">Waiting for Result</option>
                      </select>
                    </div>
                    <div class="col-md-4">
                      <label class="form-label fs-8 text-muted fw-semibold">COMPENSATION / PACKAGE</label>
                      <input type="text" id="modal-exp-ctc" class="form-control glass-input fs-8" placeholder="e.g. ₹28 LPA or Undisclosed">
                    </div>
                  </div>
                  <div class="mb-3">
                    <label class="form-label fs-8 text-muted fw-semibold">ROUND-BY-ROUND BREAKDOWN & QUESTIONS *</label>
                    <textarea id="modal-exp-rounds" class="form-control glass-input fs-8" rows="6" placeholder="Detail each round:&#10;Round 1 (OA): 2 LeetCode Mediums on Graphs & DP...&#10;Round 2 (Tech 1): LRU Cache, Binary Tree traversal...&#10;Round 3 (System Design / LLD): Design Rate Limiter...&#10;Round 4 (HR/Managerial): Conflict with team member..." required></textarea>
                  </div>
                  <div class="mb-3">
                    <label class="form-label fs-8 text-muted fw-semibold">KEY PREPARATION TIPS & TRAPS</label>
                    <textarea id="modal-exp-tips" class="form-control glass-input fs-8" rows="2" placeholder="Advice for peers preparing for this company..."></textarea>
                  </div>
                  <div class="d-flex justify-content-end gap-2">
                    <button type="button" class="btn btn-glass btn-sm" data-bs-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn btn-premium btn-sm px-4 fw-semibold"><i class="fa-solid fa-paper-plane me-1.5"></i>Publish Experience</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // 7B. Community Discussion Forum
  community: (posts) => `
    <div class="row g-4">
      <div class="col-lg-4">
        <div class="glass-panel p-4">
          <div class="d-flex align-items-center gap-2 mb-3">
            <i class="fa-solid fa-comments text-primary fs-4"></i>
            <h5 class="text-white fw-bold mb-0">Start Discussion Thread</h5>
          </div>
          <p class="text-muted fs-8 mb-4">Share interview experiences, ask technical questions, and discuss compensation with peers.</p>
          <form id="forum-post-form">
            <div class="mb-3">
              <label class="form-label text-muted fs-7 fw-semibold">TOPIC TITLE</label>
              <input type="text" id="forum-title" class="form-control glass-input" placeholder="e.g. My Meta E5 Interview Experience" required>
            </div>
            <div class="mb-3">
              <label class="form-label text-muted fs-7 fw-semibold">FORUM CATEGORY</label>
              <select id="forum-category" class="form-select glass-input">
                <option value="GENERAL">General Discussions</option>
                <option value="INTERVIEWS">Interview Experiences</option>
                <option value="CODING">Coding Questions</option>
                <option value="COURSES">LMS & Tutorials</option>
              </select>
            </div>
            <div class="mb-4">
              <label class="form-label text-muted fs-7 fw-semibold">CONTENT BODY</label>
              <textarea id="forum-content" class="form-control glass-input" rows="4" placeholder="Write discussion details..." required></textarea>
            </div>
            <button type="submit" class="btn btn-premium w-100 py-3 fw-bold"><i class="fa-solid fa-paper-plane me-2"></i>Publish Thread</button>
          </form>
        </div>
      </div>
      <!-- Threads List -->
      <div class="col-lg-8">
        <div class="glass-panel p-4 d-flex flex-column gap-3">
          <!-- Feed Controls -->
          <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 pb-3 border-bottom border-secondary border-opacity-25">
            <div class="d-flex align-items-center gap-2">
              <button class="btn btn-sm btn-glass btn-community-filter active" data-category="ALL">All Topics</button>
              <button class="btn btn-sm btn-glass btn-community-filter" data-category="INTERVIEWS">Interviews</button>
              <button class="btn btn-sm btn-glass btn-community-filter" data-category="CODING">Coding</button>
              <button class="btn btn-sm btn-glass btn-community-filter" data-category="GENERAL">General</button>
            </div>
            <span class="text-muted fs-8" id="community-count-badge">Live Community Feed</span>
          </div>

          <!-- Dynamic Threads Container -->
          <div class="d-flex flex-column gap-3 overflow-y-auto" style="max-height: 70vh;" id="forum-posts-container">
            <!-- Rendered by app.js -->
          </div>
        </div>
      </div>
    </div>
  `,

  // 8. Study Notes Folders, Markdown & Curated DSA Master Notes (21 Topics)
  notes: (noteList, folders) => {
    const dsaData = (typeof window !== 'undefined' && window.PREPSPACE_DSA_NOTES) ? window.PREPSPACE_DSA_NOTES : { topics: [], categories: [] };
    const topics = dsaData.topics || [];
    const categories = dsaData.categories || [];
    const firstTopic = topics[0] || {
      id: 1,
      title: "Data Structure Introduction & Fundamentals",
      subtitle: "Definition, Abstract Data Types (ADT), Characteristics & Real-World Use Cases",
      categoryName: "Core Foundations & Complexity",
      readTime: "12 min read",
      tags: ["Foundations", "Memory", "ADT", "Basics"],
      summary: "Explore data structure definitions and ADT abstractions.",
      contentHtml: "<p class='text-muted'>Select a topic from the left sidebar to view comprehensive notes.</p>"
    };

    return `
    <div class="d-flex flex-column gap-3">
      <!-- Top Mode Switcher Banner -->
      <div class="glass-panel p-3 d-flex flex-wrap align-items-center justify-content-between gap-2">
        <div class="d-flex align-items-center gap-2">
          <div class="ps-icon-square bg-warning-subtle text-warning"><i class="fa-solid fa-graduation-cap"></i></div>
          <div>
            <h5 class="text-white fw-bold m-0">DSA Master Notes & Study Hub</h5>
            <p class="text-muted fs-8 m-0">21 Handcrafted DSA Domains, Master Formulas, Code Blueprints & Personal Study Notes</p>
          </div>
        </div>
        <div class="btn-group p-1 bg-dark rounded border border-secondary" role="group">
          <button type="button" class="btn btn-sm btn-premium active" id="btn-tab-curated-dsa">
            <i class="fa-solid fa-book-bookmark me-1.5"></i> 📚 Curated DSA Notes (21 Topics)
          </button>
          <button type="button" class="btn btn-sm btn-glass text-white" id="btn-tab-personal-notes">
            <i class="fa-solid fa-feather me-1.5 text-info"></i> 📝 My Personal Notes (${noteList ? noteList.length : 0})
          </button>
        </div>
      </div>

      <!-- VIEW 1: Curated DSA Master Notes (Default Active) -->
      <div id="pane-curated-dsa" class="d-block">
        <div class="row g-3">
          <!-- Left Topic Navigation Sidebar -->
          <div class="col-lg-4 col-xl-3">
            <div class="glass-panel p-3 d-flex flex-column h-100" style="max-height: 80vh;">
              <div class="mb-3">
                <div class="input-group input-group-sm">
                  <span class="input-group-text bg-dark border-secondary text-secondary"><i class="fa-solid fa-search"></i></span>
                  <input type="text" id="dsa-notes-search" class="form-control glass-input fs-8" placeholder="Filter 21 DSA Topics...">
                </div>
              </div>

              <!-- Categories Filter Dropdown / Pills -->
              <div class="mb-2">
                <select id="dsa-category-filter" class="form-select form-select-sm glass-input fs-8 text-white">
                  <option value="all">All 6 Domains (21 Topics)</option>
                  ${categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
                </select>
              </div>

              <!-- Topics List -->
              <div class="flex-grow-1 overflow-y-auto d-flex flex-column gap-1.5 pe-1" id="dsa-topics-list">
                ${topics.map((t, idx) => `
                  <div class="dsa-topic-card ${idx === 0 ? 'active-dsa-topic' : ''}" 
                       data-topic-id="${t.id}">
                    <h6 class="dsa-topic-title text-truncate mb-1">${t.title}</h6>
                    <div class="dsa-topic-sub text-truncate">${t.subtitle}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Right Content Viewer Pane -->
          <div class="col-lg-8 col-xl-9">
            <div class="glass-panel p-4 overflow-y-auto" style="max-height: 80vh;" id="dsa-topic-content-mount">
              <!-- Active Topic Header -->
              <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 pb-3 mb-4 border-bottom border-secondary">
                <div>
                  <div class="d-flex align-items-center gap-2 mb-1.5">
                    <span class="badge bg-dark border border-secondary text-info fs-8" id="active-topic-category">${firstTopic.categoryName}</span>
                  </div>
                  <h3 class="text-white fw-bold m-0" id="active-topic-title">${firstTopic.title}</h3>
                  <p class="text-secondary fs-7 m-0 mt-1" id="active-topic-subtitle">${firstTopic.subtitle}</p>
                </div>
                <div class="d-flex align-items-center gap-2">
                  <button class="btn btn-sm btn-outline-light" id="btn-copy-dsa-note" title="Copy Markdown to Clipboard">
                    <i class="fa-solid fa-copy me-1"></i> Copy
                  </button>
                  <button class="btn btn-sm btn-premium" id="btn-clone-to-personal" title="Clone this topic to your personal notes">
                    <i class="fa-solid fa-clone me-1"></i> Clone to My Notes
                  </button>
                </div>
              </div>

              <!-- Content Body -->
              <div class="text-light fs-7 dsa-rendered-content" id="active-topic-body" style="line-height: 1.75;">
                ${firstTopic.contentHtml}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- VIEW 2: Personal Markdown Notes (Hidden by default, toggled via tab) -->
      <div id="pane-personal-notes" class="d-none">
        <div class="row g-3">
          <!-- Folder Directories list -->
          <div class="col-md-3">
            <div class="glass-panel p-3 h-100">
              <div class="d-flex align-items-center justify-content-between mb-3">
                <h6 class="text-white fw-bold m-0">Note Folders</h6>
                <button class="btn btn-outline-warning btn-xs" id="btn-create-folder"><i class="fa-solid fa-plus"></i></button>
              </div>
              <div class="list-group list-group-flush" id="folders-mount-list">
                <button class="list-group-item list-group-item-action bg-transparent text-white border-secondary fs-8 py-2.5 btn-select-folder active" data-folder-id="">
                  <i class="fa-solid fa-folder-open text-warning me-2"></i> All Notes
                </button>
                ${(folders || []).map(f => `
                  <button class="list-group-item list-group-item-action bg-transparent text-white border-secondary fs-8 py-2.5 btn-select-folder" data-folder-id="${f.id}">
                    <i class="fa-solid fa-folder text-warning me-2"></i> ${f.name}
                  </button>
                `).join('')}
              </div>
            </div>
          </div>
          <!-- Notes list and Editor -->
          <div class="col-md-9">
            <div class="row g-3">
              <div class="col-lg-4">
                <div class="glass-panel p-3 overflow-y-auto" style="max-height: 70vh;" id="notes-cards-container">
                  <button class="btn btn-premium w-100 mb-3 py-2 btn-sm" id="btn-new-note">
                    <i class="fa-solid fa-plus-circle me-1"></i> Compose New Note
                  </button>
                  <div class="d-flex flex-column gap-2" id="notes-cards-list">
                    ${(noteList || []).map(n => `
                      <div class="p-2.5 rounded border border-secondary note-preview-card" style="cursor:pointer;" data-id="${n.id}" data-title="${n.title}" data-content="${n.content || ''}" data-tags="${n.tags || ''}">
                        <h6 class="text-white fw-bold mb-1 fs-8 text-truncate">${n.title}</h6>
                        <div class="text-muted fs-9">${n.updatedAt ? n.updatedAt.substring(0,10) : 'Just now'}</div>
                      </div>
                    `).join('')}
                    ${(!noteList || noteList.length === 0) ? `<div class="text-center py-4 text-muted fs-8">No personal notes yet. Compose one or clone from Curated DSA Notes!</div>` : ''}
                  </div>
                </div>
              </div>
              <div class="col-lg-8">
                <div class="glass-panel p-4 d-flex flex-column" style="min-height: 520px;">
                  <div class="mb-3">
                    <input type="text" id="note-editor-title" class="form-control glass-input fw-bold fs-6 text-white" placeholder="Note Title...">
                  </div>
                  <div class="flex-grow-1 mb-3">
                    <textarea id="note-editor-content" class="form-control font-monospace text-white bg-dark border-secondary p-3 h-100 fs-8" style="resize:none; min-height: 320px;" placeholder="# Write in Markdown..."></textarea>
                  </div>
                  <div class="row align-items-center g-2">
                    <div class="col-8">
                      <input type="text" id="note-editor-tags" class="form-control glass-input fs-8" placeholder="Tags (e.g. Trees, BFS, Hard)">
                    </div>
                    <div class="col-4 text-end">
                      <button class="btn btn-premium w-100 py-2 fs-8 fw-semibold" id="btn-save-note">
                        <i class="fa-solid fa-floppy-disk me-1"></i> Save Note
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
  },

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
    <div class="container-fluid py-2">
      <!-- Platform Navigation Tabs (Mobile Horizontally Scrollable & Desktop Centered) -->
      <div class="d-flex justify-content-center mb-4">
        <ul class="nav nav-pills p-1 bg-dark bg-opacity-75 rounded-pill border border-secondary border-opacity-25 flex-nowrap overflow-x-auto w-auto max-w-100" id="app-platform-tabs" role="tablist" style="scrollbar-width: none; -webkit-overflow-scrolling: touch;">
          <li class="nav-item" role="presentation">
            <button class="nav-link active rounded-pill px-3 px-md-4 py-2 fs-8 fs-sm-7 fw-bold text-nowrap" id="tab-android-btn" data-bs-toggle="pill" data-bs-target="#tab-android-pane" type="button" role="tab">
              <i class="fa-brands fa-android text-success me-1"></i> Android APK
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link rounded-pill px-3 px-md-4 py-2 fs-8 fs-sm-7 fw-bold text-nowrap" id="tab-ios-btn" data-bs-toggle="pill" data-bs-target="#tab-ios-pane" type="button" role="tab">
              <i class="fa-brands fa-apple text-white me-1"></i> Apple iOS (iPhone)
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link rounded-pill px-3 px-md-4 py-2 fs-8 fs-sm-7 fw-bold text-nowrap" id="tab-desktop-btn" data-bs-toggle="pill" data-bs-target="#tab-desktop-pane" type="button" role="tab">
              <i class="fa-solid fa-desktop text-indigo me-1"></i> Desktop Client
            </button>
          </li>
        </ul>
      </div>

      <div class="tab-content" id="app-platform-tabs-content">
        <!-- 1. ANDROID APK TAB -->
        <div class="tab-pane fade show active" id="tab-android-pane" role="tabpanel">
          <!-- Android App Hero Download Card -->
          <div class="glass-panel p-3 p-sm-4 p-md-5 text-center mb-4 border-success border-opacity-25" style="box-shadow: 0 0 35px rgba(16, 185, 129, 0.08);">
            <div class="mb-3">
              <span class="badge bg-success bg-opacity-25 text-success border border-success-subtle px-3 py-2 rounded-pill font-monospace fs-7">
                <i class="fa-brands fa-android me-1"></i> OFFICIAL ANDROID APK RELEASE (v1.0.0)
              </span>
            </div>
            <h2 class="text-white fw-extrabold mb-2 display-6">Download PrepSpace for Android</h2>
            <p class="text-muted fs-6 max-w-md mx-auto mb-4" style="max-width: 540px;">
              Experience fast, native mobile performance. Practice DSA questions, complete timed 50-MCQ mock exams, track your placement applications, and access study notes directly on your phone.
            </p>

            <!-- Responsive, Modern Download Button (Mobile-Safe & Zero Overflow) -->
            <div class="d-flex justify-content-center mb-4">
              <a href="https://stream-in.app/downloads/PrepSpace.apk" download="PrepSpace.apk" class="btn btn-success p-2.5 p-sm-3 fw-bold d-flex align-items-center justify-content-between gap-2.5 gap-sm-3 shadow-lg rounded-3 hover-lift w-100 text-decoration-none" style="max-width: 460px; min-height: 68px;" id="direct-apk-download-btn">
                <div class="d-flex align-items-center gap-2.5 gap-sm-3 text-start flex-grow-1 min-w-0" style="min-width: 0;">
                  <div class="bg-white bg-opacity-20 rounded-circle p-2 d-flex align-items-center justify-content-center flex-shrink-0" style="width: 44px; height: 44px;">
                    <i class="fa-brands fa-android fs-2 text-white"></i>
                  </div>
                  <div class="min-w-0 flex-grow-1" style="min-width: 0;">
                    <div class="fs-9 text-uppercase text-white-50 fw-semibold font-monospace text-truncate">DIRECT BROWSER DOWNLOAD</div>
                    <div class="fs-6 fs-sm-5 text-white fw-bold lh-sm text-truncate">Download Android APK</div>
                    <div class="fs-9 text-white-50 font-monospace text-truncate">v1.0.0 • 6.3 MB • Android 7.0+</div>
                  </div>
                </div>
                <div class="text-white fs-3 pe-1 flex-shrink-0">
                  <i class="fa-solid fa-cloud-arrow-down"></i>
                </div>
              </a>
            </div>

            <div class="d-flex flex-wrap justify-content-center gap-2 gap-sm-4 text-muted fs-8 font-monospace">
              <div><i class="fa-solid fa-shield-halved text-success me-1"></i> 100% Virus-Free & Verified</div>
              <div><i class="fa-solid fa-mobile-screen text-info me-1"></i> Android 7.0 to 15+ Compatible</div>
              <div><i class="fa-solid fa-bolt text-warning me-1"></i> Instant Direct Download</div>
            </div>
          </div>

          <!-- Quick Android Installation Guide -->
          <div class="row g-3 g-md-4 mb-4">
            <div class="col-md-4">
              <div class="glass-panel p-3 p-sm-4 h-100 text-start">
                <div class="fs-4 text-success fw-bold font-monospace mb-2">01</div>
                <h5 class="text-white fw-bold mb-2">Download APK</h5>
                <p class="text-muted fs-7 mb-0">Click the green button above to download <code class="text-success">PrepSpace.apk</code> (6.3 MB) directly in your mobile browser.</p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="glass-panel p-3 p-sm-4 h-100 text-start">
                <div class="fs-4 text-primary fw-bold font-monospace mb-2">02</div>
                <h5 class="text-white fw-bold mb-2">Allow Unknown Apps</h5>
                <p class="text-muted fs-7 mb-0">When opening the downloaded package, tap <strong>Settings</strong> and toggle <em>"Allow from this source"</em> if prompted by Android.</p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="glass-panel p-3 p-sm-4 h-100 text-start">
                <div class="fs-4 text-warning fw-bold font-monospace mb-2">03</div>
                <h5 class="text-white fw-bold mb-2">Install & Practice</h5>
                <p class="text-muted fs-7 mb-0">Tap <strong>Install</strong> to complete setup. Launch PrepSpace from your app drawer and start practicing DSA immediately!</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. APPLE iOS (IPHONE / IPAD) TAB -->
        <div class="tab-pane fade" id="tab-ios-pane" role="tabpanel">
          <!-- iOS App Hero Card -->
          <div class="glass-panel p-3 p-sm-4 p-md-5 text-center mb-4 border-primary border-opacity-25" style="box-shadow: 0 0 35px rgba(99, 102, 241, 0.08);">
            <div class="mb-3">
              <span class="badge bg-primary bg-opacity-25 text-primary border border-primary-subtle px-3 py-2 rounded-pill font-monospace fs-7">
                <i class="fa-brands fa-apple me-1"></i> APPLE iOS (SAFARI PWA)
              </span>
            </div>
            <h2 class="text-white fw-extrabold mb-2 display-6">Install PrepSpace on iPhone & iPad</h2>
            <p class="text-muted fs-6 max-w-md mx-auto mb-4" style="max-width: 540px;">
              Run PrepSpace as a high-speed Safari Web App directly on your iPhone. Full screen, offline caching, instant home-screen launch, and zero App Store friction.
            </p>

            <!-- Safari Add to Home Screen Action -->
            <div class="d-flex justify-content-center mb-4">
              <div class="p-2.5 p-sm-3 fw-bold d-flex align-items-center justify-content-between gap-2.5 gap-sm-3 shadow-lg rounded-3 w-100 border border-primary border-opacity-50" style="max-width: 460px; min-height: 68px; background: linear-gradient(135deg, rgba(30, 27, 75, 0.9) 0%, rgba(67, 56, 202, 0.8) 100%);">
                <div class="d-flex align-items-center gap-2.5 gap-sm-3 text-start flex-grow-1 min-w-0" style="min-width: 0;">
                  <div class="bg-white bg-opacity-20 rounded-circle p-2 d-flex align-items-center justify-content-center flex-shrink-0" style="width: 44px; height: 44px;">
                    <i class="fa-brands fa-apple fs-1 text-white"></i>
                  </div>
                  <div class="min-w-0 flex-grow-1" style="min-width: 0;">
                    <div class="fs-9 text-uppercase text-white-50 fw-semibold font-monospace text-truncate">SAFARI PWA (WEB APP)</div>
                    <div class="fs-6 fs-sm-5 text-white fw-bold lh-sm text-truncate">Install on iPhone / iPad</div>
                    <div class="fs-9 text-white-50 font-monospace text-truncate">Safari ➔ Share ➔ Add to Home Screen</div>
                  </div>
                </div>
                <div class="text-white fs-3 pe-1 flex-shrink-0">
                  <i class="fa-solid fa-arrow-up-from-bracket text-primary"></i>
                </div>
              </div>
            </div>

            <div class="d-flex flex-wrap justify-content-center gap-2 gap-sm-4 text-muted fs-8 font-monospace">
              <div><i class="fa-solid fa-bolt text-warning me-1"></i> Zero App Store Delays</div>
              <div><i class="fa-solid fa-expand text-info me-1"></i> Full-Screen Web App</div>
              <div><i class="fa-solid fa-shield-halved text-success me-1"></i> iOS 14.0 to 18+ Compatible</div>
            </div>
          </div>

          <!-- 3-Step iPhone Visual Installation Guide -->
          <div class="row g-3 g-md-4 mb-4">
            <div class="col-md-4">
              <div class="glass-panel p-3 p-sm-4 h-100 text-start border border-secondary border-opacity-25">
                <div class="d-flex align-items-center gap-2 mb-2">
                  <span class="badge bg-primary rounded-circle p-2 font-monospace">01</span>
                  <h5 class="text-white fw-bold mb-0 fs-6">Tap Share in Safari</h5>
                </div>
                <p class="text-muted fs-7 mb-0">Open <code class="text-info">stream-in.app</code> in Apple Safari. Tap the <strong>Share</strong> button (<i class="fa-solid fa-arrow-up-from-bracket text-primary"></i>) located in the bottom navigation toolbar.</p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="glass-panel p-3 p-sm-4 h-100 text-start border border-secondary border-opacity-25">
                <div class="d-flex align-items-center gap-2 mb-2">
                  <span class="badge bg-primary rounded-circle p-2 font-monospace">02</span>
                  <h5 class="text-white fw-bold mb-0 fs-6">Tap "Add to Home Screen"</h5>
                </div>
                <p class="text-muted fs-7 mb-0">Scroll down through the iOS share sheet actions and tap <strong>"Add to Home Screen"</strong> (<i class="fa-regular fa-square-plus text-success"></i>).</p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="glass-panel p-3 p-sm-4 h-100 text-start border border-secondary border-opacity-25">
                <div class="d-flex align-items-center gap-2 mb-2">
                  <span class="badge bg-primary rounded-circle p-2 font-monospace">03</span>
                  <h5 class="text-white fw-bold mb-0 fs-6">Launch PrepSpace</h5>
                </div>
                <p class="text-muted fs-7 mb-0">Tap <strong>Add</strong> in the top-right corner. PrepSpace is now installed on your iPhone home screen with the official app icon and full-screen experience!</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. DESKTOP CLIENT (JAVA SWING) TAB -->
        <div class="tab-pane fade" id="tab-desktop-pane" role="tabpanel">
          <div class="glass-panel p-4 text-center">
            <div class="d-flex align-items-center justify-content-center gap-2 mb-2">
              <i class="fa-solid fa-desktop text-indigo fs-5"></i>
              <h5 class="text-white fw-bold mb-0">Java Swing Desktop Client</h5>
            </div>
            <p class="text-muted fs-7 max-w-md mx-auto mb-3" style="max-width: 500px;">
              For offline desktop tracking, PrepSpace also includes a native Java Swing application that connects directly to MySQL via JDBC.
            </p>
            <div class="card bg-dark bg-opacity-25 border-secondary text-start mx-auto p-3 mb-2 text-muted fs-7" style="max-width: 520px;">
              <h6 class="text-white fw-bold mb-2"><i class="fa-solid fa-terminal text-indigo me-2"></i> Run Locally via Terminal</h6>
              <pre class="bg-black text-success p-2 rounded mb-1 font-monospace">cd desktop-app && mvn clean compile exec:java</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,

  billing: (isPaid) => `
    <div class="container-fluid py-4">
      <div class="row justify-content-center text-center mb-5">
        <div class="col-lg-7">
          <span class="badge bg-primary bg-opacity-25 text-primary border border-primary-subtle px-3 py-1 mb-2 font-mono fs-8">TRANSPARENT & FAIR</span>
          <h2 class="text-white fw-bold mb-2">Upgrade Space Metrics</h2>
          <p class="text-muted">Accelerate your technical preparation journey with unlimited AI diagnostics and premium tools.</p>
        </div>
      </div>

      <div class="row g-4 justify-content-center align-items-stretch">
        <div class="col-md-6 col-lg-4">
          <div class="glass-panel p-4 p-md-5 h-100 text-center d-flex flex-column justify-content-between">
            <div>
              <span class="badge border border-secondary border-opacity-30 text-white px-3 py-1 mb-3 font-mono fs-8">FOUNDATION TIER</span>
              <h3 class="text-white h4 mb-1">PrepFree</h3>
              <p class="text-muted fs-8 mb-4">Core tracker tools for personal preparation</p>
              <div class="my-4">
                <span class="display-5 fw-bold text-white">₹0</span>
                <span class="text-muted fs-8 ms-1">/ free forever</span>
              </div>
              <ul class="list-unstyled text-start mb-4 text-muted fs-8">
                <li class="mb-2"><i class="fa-solid fa-check text-success me-2"></i> Access to Core Question Bank</li>
                <li class="mb-2"><i class="fa-solid fa-check text-success me-2"></i> Log Solved Algorithmic Problems</li>
                <li class="mb-2"><i class="fa-solid fa-check text-success me-2"></i> Standard Placement Application Kanban</li>
                <li class="mb-2"><i class="fa-solid fa-check text-success me-2"></i> Public Peer Community & Discussions</li>
                <li class="mb-2 text-muted opacity-50"><i class="fa-solid fa-xmark text-secondary me-2"></i> AI ATS Resume Compliance Audits</li>
                <li class="mb-2 text-muted opacity-50"><i class="fa-solid fa-xmark text-secondary me-2"></i> Custom AI Study Planners & Diagnostics</li>
              </ul>
            </div>
            <div>
              <button class="btn btn-glass w-100 py-3 disabled fs-8">${!isPaid ? 'Current Active Plan' : 'Basic Tier'}</button>
            </div>
          </div>
        </div>
        
        <div class="col-md-6 col-lg-4">
          <div class="glass-panel p-4 p-md-5 h-100 text-center d-flex flex-column justify-content-between" style="box-shadow: 0 10px 30px rgba(99, 102, 241, 0.15);">
            <div>
              <span class="badge bg-primary bg-opacity-25 text-primary border border-primary-subtle px-3 py-1 mb-3 font-mono fs-8">RECOMMENDED • LIFETIME ACCESS</span>
              <h3 class="text-white h4 mb-1">PrepPro</h3>
              <p class="text-indigo fs-8 mb-4">Complete AI career suite for active jobseekers</p>
              <div class="my-4">
                <span class="display-5 fw-bold text-white">₹399</span>
                <span class="text-muted fs-8 ms-1">/ one-time payment</span>
              </div>
              <ul class="list-unstyled text-start mb-4 text-muted fs-8">
                <li class="mb-2"><i class="fa-solid fa-check text-success me-2"></i> <strong>AI Career Assistant</strong> (ATS Audit, Planner)</li>
                <li class="mb-2"><i class="fa-solid fa-check text-success me-2"></i> <strong>AI Custom Study Planners</strong> & Weakness Diagnostics</li>
                <li class="mb-2"><i class="fa-solid fa-check text-success me-2"></i> <strong>Company Interview Guides</strong> & Prompts</li>
                <li class="mb-2"><i class="fa-solid fa-check text-success me-2"></i> <strong>Export Excel & PDF Progress reports</strong></li>
                <li class="mb-2"><i class="fa-solid fa-check text-success me-2"></i> <strong>Full 50-MCQ Timed Mock Exams</strong> & Candidate Leaderboard</li>
                <li class="mb-2"><i class="fa-solid fa-check text-success me-2"></i> Top 50 Global Leaderboard Ranking Eligibility</li>
              </ul>
            </div>
            <div>
              <button id="btn-upgrade-pro" class="btn btn-premium w-100 py-3 fw-bold fs-7" ${isPaid ? 'disabled' : ''}>
                ${isPaid ? '✓ Active Premium Access' : '<i class="fa-solid fa-gem me-1"></i> Unlock PrepPro Access (₹399)'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Trust Bar -->
      <div class="row justify-content-center mt-5">
        <div class="col-lg-8">
          <div class="d-flex flex-wrap justify-content-center gap-4 text-muted fs-8 text-center border-top border-secondary border-opacity-10 pt-4">
            <div><i class="fa-solid fa-bolt text-primary me-1"></i> Instant Activation</div>
            <div><i class="fa-solid fa-shield-halved text-success me-1"></i> 256-bit Secure Cashfree & UPI</div>
            <div><i class="fa-solid fa-infinity text-info me-1"></i> Lifetime Validity (Zero Recurring Fees)</div>
          </div>
        </div>
      </div>
    </div>
  `,

  referral: (stats) => `
    <div class="container-fluid py-4">
      <!-- Program Hero Banner -->
      <div class="glass-panel p-4 p-md-5 mb-4 position-relative overflow-hidden">
        <div class="row align-items-center">
          <div class="col-md-9">
            <span class="badge bg-warning bg-opacity-15 text-warning border border-warning border-opacity-30 px-3 py-1 rounded-pill mb-3 font-mono fs-8">AFFILIATE PARTNER BOUNTY</span>
            <h2 class="text-white fw-bold mb-2">Share PrepSpace, Earn Cash Payouts!</h2>
            <p class="text-muted mb-0">Invite classmates, friends, and peers. You earn <strong class="text-warning">₹199 direct cash bounty</strong> on every user who upgrades their tracker space to PrepPro (₹399). Withdrawable instantly to your UPI ID!</p>
          </div>
          <div class="col-md-3 text-md-end mt-3 mt-md-0 d-none d-md-block">
            <div class="stat-num text-warning display-6 mb-0">₹199</div>
            <div class="stat-label text-muted">CASH PER UPGRADE</div>
          </div>
        </div>
      </div>

      <!-- 4-Metric Bento Grid -->
      <div class="row g-3 mb-4">
        <div class="col-6 col-lg-3">
          <div class="stat-card p-3">
            <div class="stat-label">TOTAL REFERRALS</div>
            <div class="stat-num text-white">${stats.totalReferrals || 0}</div>
            <div class="stat-caption text-muted"><i class="fa-solid fa-users text-muted me-1"></i>Peers registered</div>
          </div>
        </div>
        <div class="col-6 col-lg-3">
          <div class="stat-card p-3">
            <div class="stat-label">TOTAL COMMISSIONS</div>
            <div class="stat-num text-white">₹${stats.totalEarnings || 0}</div>
            <div class="stat-caption text-muted"><i class="fa-solid fa-coins text-muted me-1"></i>Lifetime earned</div>
          </div>
        </div>
        <div class="col-6 col-lg-3">
          <div class="stat-card p-3">
            <div class="stat-label">AVAILABLE BALANCE</div>
            <div class="stat-num text-white">₹${stats.availableBalance || 0}</div>
            <div class="stat-caption text-muted"><i class="fa-solid fa-wallet text-muted me-1"></i>Ready for claim</div>
          </div>
        </div>
        <div class="col-6 col-lg-3">
          <div class="stat-card p-3">
            <div class="stat-label">MINIMUM PAYOUT</div>
            <div class="stat-num text-white">₹${stats.minWithdrawal || 99}</div>
            <div class="stat-caption text-muted"><i class="fa-solid fa-bolt text-muted me-1"></i>Instant UPI claim</div>
          </div>
        </div>
      </div>

      <div class="row g-4">
        <!-- Payout Request and Links -->
        <div class="col-lg-4">
          <div class="glass-panel p-4 mb-4">
            <div class="d-flex align-items-center justify-content-between mb-3">
              <h5 class="text-white fw-bold m-0 fs-6"><i class="fa-solid fa-link text-warning me-2"></i>Your Referral Link</h5>
              <span class="badge border border-secondary border-opacity-30 text-white font-mono fs-9" style="background: #27272a;">SHARE</span>
            </div>
            <p class="text-muted fs-8 mb-3">Share your personalized link with your college cohorts, Discord groups, and friends.</p>
            <div class="d-flex gap-2 mb-2">
              <input type="text" readonly id="ref-link-val" class="form-control glass-input fs-8 font-mono text-truncate" value="https://stream-in.app/#/register?ref=${stats.referralCode || ''}">
              <button id="btn-copy-ref-link" class="btn btn-premium px-3 flex-shrink-0" title="Copy to Clipboard"><i class="fa-regular fa-copy"></i></button>
            </div>
            <div class="text-muted fs-9">Your unique referral code is: <strong class="text-white font-mono">${stats.referralCode || 'N/A'}</strong></div>
          </div>

          <div class="glass-panel p-4">
            <div class="d-flex align-items-center justify-content-between mb-3">
              <h5 class="text-white fw-bold m-0 fs-6"><i class="fa-solid fa-hand-holding-dollar text-warning me-2"></i>Request Withdrawal</h5>
              <span class="badge ${stats.availableBalance >= (stats.minWithdrawal || 99) ? 'bg-success' : 'border border-secondary text-muted'} font-mono fs-9" style="${stats.availableBalance >= (stats.minWithdrawal || 99) ? '' : 'background: #27272a;'}">
                ${stats.availableBalance >= (stats.minWithdrawal || 99) ? 'ELIGIBLE' : 'MIN ₹' + (stats.minWithdrawal || 99)}
              </span>
            </div>
            <form id="ref-withdraw-form">
              <div class="mb-3">
                <label class="form-label text-muted fs-8 uppercase tracking-wider mb-1">CLAIM AMOUNT (INR)</label>
                <input type="number" id="withdraw-amount" class="form-control glass-input" placeholder="Min. ₹${stats.minWithdrawal || 99}" min="${stats.minWithdrawal || 99}" max="${stats.availableBalance || 0}" required>
                <div class="form-text text-muted fs-9">Available: ₹${stats.availableBalance || 0}</div>
              </div>
              <div class="mb-4">
                <label class="form-label text-muted fs-8 uppercase tracking-wider mb-1">UPI ID FOR INSTANT PAYOUT</label>
                <input type="text" id="withdraw-upi" class="form-control glass-input font-mono" placeholder="username@upi" required>
                <div class="form-text text-muted fs-9">Supports GPay, PhonePe, Paytm, BHIM</div>
              </div>
              <button type="submit" id="btn-submit-withdraw" class="btn btn-premium w-100 py-3 fw-bold fs-7" ${(stats.availableBalance || 0) < (stats.minWithdrawal || 99) ? 'disabled' : ''}>
                <i class="fa-solid fa-paper-plane me-1"></i> File Payout Claim
              </button>
            </form>
          </div>
        </div>

        <!-- History Tables -->
        <div class="col-lg-8">
          <div class="glass-panel p-4 mb-4">
            <div class="d-flex align-items-center justify-content-between mb-3">
              <h5 class="text-white fw-bold m-0 fs-6"><i class="fa-solid fa-list-check text-warning me-2"></i>Referral Audit Trail</h5>
              <span class="badge border border-secondary border-opacity-30 text-white font-mono fs-9" style="background: #27272a;">ACTIVITY</span>
            </div>
            <div class="table-responsive">
              <table class="table table-dark table-hover align-middle mb-0">
                <thead>
                  <tr class="text-muted border-secondary">
                    <th>Referred Email</th>
                    <th>Date Registered</th>
                    <th>Upgrade Status</th>
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
            <div class="d-flex align-items-center justify-content-between mb-3">
              <h5 class="text-white fw-bold m-0 fs-6"><i class="fa-solid fa-arrow-right-arrow-left text-warning me-2"></i>Withdrawal Claims</h5>
              <span class="badge border border-secondary border-opacity-30 text-white font-mono fs-9" style="background: #27272a;">PAYOUTS</span>
            </div>
            <div class="table-responsive">
              <table class="table table-dark table-hover align-middle mb-0">
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
      <div class="table-responsive" style="overflow-x: auto;">
        <table class="admin-table">
          <thead>
            <tr>
              <th style="width: 40px;">ID</th>
              <th>User Email</th>
              <th>UPI ID (Payout Details)</th>
              <th>Request Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th class="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${claims.map(c => {
              const rawUpi = (c.payoutDetails || '').replace(/^UPI ID:\s*/i, '').trim();
              return `
              <tr>
                <td class="text-white">#${c.id}</td>
                <td><div class="text-truncate" style="max-width: 180px;" title="${c.userEmail}">${c.userEmail}</div></td>
                <td class="text-info font-monospace fs-8">
                  <div class="d-flex align-items-center gap-2">
                    <span class="text-truncate" style="max-width: 180px;">${c.payoutDetails}</span>
                    ${rawUpi ? `
                      <button type="button" class="btn btn-sm btn-glass py-0 px-2 fs-9 text-muted hover-white" title="Copy UPI ID" onclick="navigator.clipboard.writeText('${rawUpi}'); showToast('UPI ID copied: ${rawUpi}', 'success');">
                        <i class="fa-regular fa-copy"></i>
                      </button>
                      <a href="upi://pay?pa=${encodeURIComponent(rawUpi)}&pn=Candidate&am=${c.amount}&cu=INR&tn=PrepSpace+Affiliate+Reward" class="btn btn-sm btn-glass py-0 px-2 fs-9 text-success" title="Open in UPI App (PhonePe/GPay/Paytm)">
                        <i class="fa-solid fa-bolt"></i> Pay
                      </a>
                    ` : ''}
                  </div>
                </td>
                <td class="text-muted fs-8">${new Date(c.createdAt).toLocaleString()}</td>
                <td class="text-success fw-bold font-monospace">₹${c.amount}</td>
                <td>
                  <span class="badge ${c.status === 'PAID' ? 'bg-success-subtle text-success' : c.status === 'REJECTED' ? 'bg-danger-subtle text-danger' : c.status === 'PROCESSING' ? 'bg-warning-subtle text-warning' : 'bg-secondary-subtle text-muted'}">
                    ${c.status}
                  </span>
                </td>
                <td class="text-end">
                  ${c.status === 'PENDING' || c.status === 'PROCESSING' ? `
                    <button class="btn btn-sm btn-outline-warning btn-claim-action px-2 py-1 me-1" data-id="${c.id}" data-action="AUTO_PAYOUT" data-amount="${c.amount}" data-upi="${rawUpi}" title="Automated Instant UPI Transfer via Cashfree API"><i class="fa-solid fa-robot"></i> Auto Pay</button>
                    <button class="btn btn-sm btn-success btn-claim-action px-2 py-1 me-1" data-id="${c.id}" data-action="PAID" title="Mark as Paid"><i class="fa-solid fa-check"></i> Paid</button>
                    <button class="btn btn-sm btn-danger btn-claim-action px-2 py-1" data-id="${c.id}" data-action="REJECTED" title="Reject Claim"><i class="fa-solid fa-times"></i> Reject</button>
                  ` : '<span class="text-muted fs-8">Completed</span>'}
                </td>
              </tr>
            `;}).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  adminPaymentsList: (payments) => {
    if (!payments || payments.length === 0) {
      return `<div class="text-center py-5 text-muted"><i class="fa-solid fa-circle-exclamation fa-2x mb-3"></i><p>No payment logs found.</p></div>`;
    }
    const successPayments = payments.filter(p => p.status === 'SUCCESS');
    const totalGross = successPayments.reduce((acc, p) => acc + (Number(p.amount) || 0), 0);
    const successRate = payments.length ? Math.round((successPayments.length / payments.length) * 100) : 0;

    return `
      <div class="admin-box p-3 mb-4">
        <!-- Summary Cards -->
        <div class="row g-3 mb-3">
          <div class="col-md-4">
            <div class="admin-box p-3">
              <span class="admin-kpi-label">Audited Volume</span>
              <h4 class="text-success fw-bold mb-0 mt-1 font-monospace">₹${totalGross}</h4>
              <small class="text-muted fs-9">Processed via Cashfree Gateway</small>
            </div>
          </div>
          <div class="col-md-4">
            <div class="admin-box p-3">
              <span class="admin-kpi-label">Successful Charges</span>
              <h4 class="text-white fw-bold mb-0 mt-1 font-monospace">${successPayments.length} <span class="text-muted fs-7">/ ${payments.length}</span></h4>
              <small class="text-emerald fs-9"><i class="fa-solid fa-circle-check me-1"></i>${successRate}% Settlement Rate</small>
            </div>
          </div>
          <div class="col-md-4">
            <div class="admin-box p-3">
              <span class="admin-kpi-label">Gateway Verification</span>
              <h4 class="text-info fw-bold mb-0 mt-1">Cashfree PG</h4>
              <small class="text-muted fs-9">Webhook signature validated</small>
            </div>
          </div>
        </div>

        <!-- Controls -->
        <div class="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
          <div class="flex-grow-1" style="max-width: 400px;">
            <div class="input-group input-group-sm">
              <span class="input-group-text bg-light border-secondary border-opacity-20 text-muted"><i class="fa-solid fa-magnifying-glass"></i></span>
              <input type="text" id="admin-payment-search-input" class="form-control admin-input" placeholder="Search by email, order ID, or payment ID...">
            </div>
          </div>
          <a href="/api/admin/reports/payments" class="btn btn-outline-success btn-sm"><i class="fa-solid fa-file-csv me-1"></i> Export Transactions CSV</a>
        </div>

        <!-- Table -->
        <div class="table-responsive" style="overflow-x: auto;">
          <table class="admin-table" id="admin-payments-table">
            <thead>
              <tr>
                <th style="width: 40px;">#</th>
                <th>Candidate Email</th>
                <th>Order Reference</th>
                <th>Gateway Txn ID</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody id="admin-payments-table-body">
              ${payments.map(p => `
                <tr class="payment-table-row" data-email="${(p.userEmail || '').toLowerCase()}" data-order="${(p.orderId || '').toLowerCase()}" data-payid="${(p.paymentId || '').toLowerCase()}">
                  <td class="text-muted font-monospace fs-8">#${p.id}</td>
                  <td class="text-white fw-semibold">
                    <div class="text-truncate" style="max-width: 180px;" title="${p.userEmail}">${p.userEmail}</div>
                  </td>
                  <td class="font-monospace fs-8 text-secondary">
                    <div class="text-truncate" style="max-width: 140px;" title="${p.orderId}">${p.orderId}</div>
                  </td>
                  <td class="font-monospace fs-8">
                    ${p.paymentId ? `<div class="text-info text-truncate" style="max-width: 140px;" title="${p.paymentId}">${p.paymentId}</div>` : '<span class="text-muted">N/A</span>'}
                  </td>
                  <td class="text-success fw-bold font-monospace">₹${p.amount}</td>
                  <td>
                    <span class="badge ${p.status === 'SUCCESS' ? 'bg-success-subtle text-success border border-success-subtle' : 'bg-warning-subtle text-warning border border-warning-subtle'}">
                      ${p.status}
                    </span>
                  </td>
                  <td class="text-muted fs-8">${p.createdAt ? new Date(p.createdAt).toLocaleString() : 'N/A'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  adminUsersList: (users) => {
    if (!users || users.length === 0) {
      return `<div class="text-center py-5 text-muted"><i class="fa-solid fa-users-slash fa-2x mb-3"></i><p>No users registered.</p></div>`;
    }
    const paidCount = users.filter(u => u.isPaid).length;
    const adminCount = users.filter(u => u.role && u.role.includes('ADMIN')).length;
    const suspendedCount = users.filter(u => u.isSuspended).length;

    return `
      <div class="admin-box p-3 mb-4">
        <!-- Directory Header & Controls -->
        <div class="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
          <div>
            <h5 class="text-white fw-bold mb-1"><i class="fa-solid fa-users text-primary me-2"></i>Candidate & Account Directory</h5>
            <small class="text-muted fs-8">Total: <strong class="text-white">${users.length}</strong> | Pro: <strong class="text-emerald">${paidCount}</strong> | Admins: <strong class="text-warning">${adminCount}</strong></small>
          </div>
          <div class="d-flex gap-2 align-items-center flex-wrap">
            <div class="dropdown">
              <button class="btn btn-sm btn-admin-header-indigo dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="btn-bulk-dropdown-menu">
                <i class="fa-solid fa-list-check me-1.5 text-indigo-400"></i> Bulk Select
              </button>
              <ul class="dropdown-menu dropdown-menu-dark shadow-lg fs-8 border-secondary border-opacity-25" style="background: #0f172a; backdrop-filter: blur(12px);">
                <li><button class="dropdown-item py-1.5" type="button" id="btn-select-all-visible"><i class="fa-solid fa-check-double me-2 text-primary"></i>Select All Visible</button></li>
                <li><button class="dropdown-item py-1.5" type="button" id="btn-select-all-free"><i class="fa-solid fa-user me-2 text-info"></i>Select All Free Candidates</button></li>
                <li><button class="dropdown-item py-1.5" type="button" id="btn-select-all-pro"><i class="fa-solid fa-crown me-2 text-warning"></i>Select All Pro Members</button></li>
                <li><hr class="dropdown-divider border-secondary border-opacity-25 my-1"></li>
                <li><button class="dropdown-item py-1.5 text-muted hover-text-white" type="button" id="btn-deselect-all-quick"><i class="fa-solid fa-xmark me-2"></i>Clear Selection</button></li>
              </ul>
            </div>
            <a href="/api/admin/reports/users" class="btn btn-sm btn-admin-header-emerald"><i class="fa-solid fa-file-csv me-1.5"></i> Export CSV</a>
            <button class="btn btn-sm btn-admin-header-cyan" id="btn-admin-open-compose-global"><i class="fa-solid fa-paper-plane me-1.5"></i> Message Candidates</button>
          </div>
        </div>

        <!-- Sleek Enterprise Bulk Actions Command Bar -->
        <div id="admin-bulk-actions-bar" class="admin-bulk-command-bar d-none align-items-center justify-content-between flex-wrap gap-2.5 mb-3">
          <div class="d-flex align-items-center gap-2">
            <span class="bulk-counter-pill"><span class="bulk-pulse-dot"></span><span id="bulk-selected-count">0</span> Candidates Selected</span>
            <span class="text-muted fs-8 d-none d-lg-inline-block">Quick operations:</span>
          </div>
          <div class="d-flex align-items-center gap-2 flex-wrap">
            <button class="btn-bulk-op btn-bulk-grant" id="btn-bulk-grant-pro" title="Grant Free Lifetime Pro Pass to selected candidates">
              <i class="fa-solid fa-crown fs-9"></i> Grant Pro Pass
            </button>
            <button class="btn-bulk-op btn-bulk-revoke" id="btn-bulk-revoke-pro" title="Revoke Pro Pass and return selected to Free Tier">
              <i class="fa-solid fa-arrow-rotate-left fs-9"></i> Revoke Pro
            </button>
            <button class="btn-bulk-op btn-bulk-danger" id="btn-bulk-delete-users" title="Permanently delete all selected candidates">
              <i class="fa-solid fa-trash-can fs-9"></i> Delete Selected
            </button>
            <div class="vr bg-secondary bg-opacity-30 mx-1 d-none d-sm-block" style="height: 20px;"></div>
            <button class="btn-bulk-op btn-bulk-cancel" id="btn-bulk-clear-selection" title="Clear selection">
              <i class="fa-solid fa-xmark fs-9"></i> Deselect
            </button>
          </div>
        </div>

        <!-- Search Bar & Filter Chips -->
        <div class="row g-2 align-items-center mb-3">
          <div class="col-12 col-md-6">
            <div class="input-group input-group-sm">
              <span class="input-group-text bg-light border-secondary border-opacity-20 text-muted"><i class="fa-solid fa-magnifying-glass"></i></span>
              <input type="text" id="admin-user-search-input" class="form-control admin-input" placeholder="Search by name, email, role, or referral code...">
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="d-flex flex-nowrap gap-1.5 overflow-x-auto pb-1 justify-content-start justify-content-md-end" id="admin-user-filter-chips" style="scrollbar-width: none; -webkit-overflow-scrolling: touch;">
              <span class="admin-filter-pill active text-nowrap" data-filter="all">All (${users.length})</span>
              <span class="admin-filter-pill text-nowrap" data-filter="pro">Pro (${paidCount})</span>
              <span class="admin-filter-pill text-nowrap" data-filter="free">Free (${users.length - paidCount})</span>
              <span class="admin-filter-pill text-nowrap" data-filter="admin">Admins (${adminCount})</span>
              ${suspendedCount > 0 ? `<span class="admin-filter-pill text-nowrap" data-filter="suspended">Suspended (${suspendedCount})</span>` : ''}
            </div>
          </div>
        </div>

        <!-- 1. Desktop Candidate Table (>= 992px) -->
        <div class="table-responsive d-none d-lg-block" style="overflow-x: auto;">
          <table class="admin-table" id="admin-users-table">
            <thead>
              <tr>
                <th style="width: 36px;" class="text-center">
                  <input class="form-check-input bulk-candidate-master-checkbox" type="checkbox" id="bulk-candidate-master-checkbox" title="Select / Deselect all visible" style="cursor: pointer;">
                </th>
                <th style="width: 40px;">#</th>
                <th>Candidate & Contact <i class="fa-solid fa-arrow-down-a-z ms-1 text-muted fs-9"></i></th>
                <th>Access & Role</th>
                <th>Affiliate</th>
                <th>Joined</th>
                <th class="text-end" style="min-width: 150px;">Actions & Inspector</th>
              </tr>
            </thead>
            <tbody id="admin-users-table-body">
              ${users.map(u => {
                const isAdmin = u.role && u.role.includes('ADMIN');
                const isSuper = u.role === 'ADMIN_SUPER';
                const userJson = encodeURIComponent(JSON.stringify(u));
                return `
                <tr class="user-table-row" data-id="${u.id}" data-user="${userJson}" data-name="${(u.name || '').toLowerCase()}" data-email="${(u.email || '').toLowerCase()}" data-role="${(u.role || '').toLowerCase()}" data-paid="${u.isPaid ? 'true' : 'false'}" data-suspended="${u.isSuspended ? 'true' : 'false'}">
                  <td class="text-center" onclick="event.stopPropagation()">
                    ${!isSuper ? `
                      <input class="form-check-input candidate-select-checkbox" type="checkbox" data-id="${u.id}" data-email="${u.email}" data-name="${u.name || 'Candidate'}" data-role="${u.role || 'STUDENT'}" data-paid="${u.isPaid ? 'true' : 'false'}" style="cursor: pointer;">
                    ` : ''}
                  </td>
                  <td class="text-muted font-monospace fs-8">#${u.id}</td>
                  <td>
                    <div class="d-flex align-items-center gap-2">
                      <div class="avatar-circle flex-shrink-0" style="width: 28px; height: 28px; border-radius: 50%; background: ${isSuper ? '#f59e0b' : isAdmin ? '#6366f1' : '#1e293b'}; color: white; display: flex; align-items: center; justify-content: center; font-size: 0.72rem; font-weight: bold;">
                        ${(u.name || 'U').charAt(0).toUpperCase()}
                      </div>
                      <div style="min-width: 0;">
                        <div class="text-white fw-semibold text-truncate" style="max-width: 200px;">${u.name || 'Anonymous Candidate'}</div>
                        <div class="text-muted fs-9 font-monospace text-truncate" style="max-width: 220px;">
                          ${u.email}
                          ${u.googleId ? '<span class="text-info ms-1"><i class="fa-brands fa-google"></i></span>' : ''}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="d-flex flex-wrap align-items-center gap-1">
                      ${isSuper ? '<span class="badge badge-super-admin px-2 py-0.5 fs-9"><i class="fa-solid fa-crown me-1"></i>SUPER ADMIN</span>' :
                        isAdmin ? '<span class="badge bg-primary px-2 py-0.5 fs-9"><i class="fa-solid fa-shield me-1"></i>ADMIN</span>' :
                        '<span class="badge bg-secondary bg-opacity-50 text-light px-2 py-0.5 fs-9">STUDENT</span>'}
                      ${u.isPaid ? '<span class="badge badge-pro-lifetime px-2 py-0.5 fs-9"><i class="fa-solid fa-gem me-1"></i>PRO</span>' : '<span class="badge bg-dark text-muted border border-secondary border-opacity-25 px-2 py-0.5 fs-9">FREE</span>'}
                      ${u.isSuspended ? '<span class="badge bg-danger text-white px-2 py-0.5 fs-9">SUSPENDED</span>' : ''}
                    </div>
                  </td>
                  <td>
                    <div class="text-success font-monospace fw-bold fs-8">₹${u.referralEarnings || 0}</div>
                    <div class="text-muted fs-9 font-monospace">${u.referralCode ? 'Ref: ' + u.referralCode : 'Direct'}</div>
                  </td>
                  <td class="text-muted fs-8">${u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}</td>
                  <td class="text-end" onclick="event.stopPropagation()">
                    <div class="d-inline-flex align-items-center gap-1">
                      <!-- Inspect Drawer Trigger -->
                      <button class="btn btn-admin-action btn-glass btn-inspect-user" data-id="${u.id}" data-user="${userJson}" title="Inspect candidate telemetry & activity">
                        <i class="fa-solid fa-magnifying-glass-chart text-cyan"></i>
                      </button>

                      <!-- Pro Pass Toggle -->
                      <button class="btn btn-admin-action btn-glass btn-toggle-pro" data-id="${u.id}" data-email="${u.email}" data-current="${u.isPaid ? 'true' : 'false'}" title="${u.isPaid ? 'Revoke Pro Pass' : 'Grant Lifetime Pro Pass'}">
                        <i class="fa-solid fa-gem ${u.isPaid ? 'text-warning' : 'text-muted'}"></i>
                      </button>

                      <!-- Role Changer -->
                      ${!isSuper ? `
                        <button class="btn btn-admin-action btn-glass btn-toggle-role" data-id="${u.id}" data-email="${u.email}" data-role="${u.role}" title="${isAdmin ? 'Demote to Student' : 'Promote to Admin'}">
                          <i class="fa-solid fa-user-shield ${isAdmin ? 'text-primary' : 'text-muted'}"></i>
                        </button>
                      ` : ''}

                      <!-- Direct Email -->
                      <button class="btn btn-admin-action btn-glass btn-compose-user-email" data-email="${u.email}" data-name="${u.name || 'Candidate'}" title="Send direct email to candidate">
                        <i class="fa-solid fa-envelope text-info"></i>
                      </button>

                      <!-- Suspend / Unsuspend -->
                      ${!isSuper ? (u.isSuspended ? `
                        <button class="btn btn-admin-action btn-outline-success btn-user-action" data-id="${u.id}" data-email="${u.email}" data-action="unsuspend" title="Unsuspend account"><i class="fa-solid fa-user-check"></i></button>
                      ` : `
                        <button class="btn btn-admin-action btn-outline-warning btn-user-action" data-id="${u.id}" data-email="${u.email}" data-action="suspend" title="Suspend account"><i class="fa-solid fa-user-slash"></i></button>
                      `) : ''}

                      <!-- Delete Account -->
                      ${!isSuper ? `
                        <button class="btn btn-admin-action btn-outline-danger btn-delete-user" data-id="${u.id}" data-email="${u.email}" title="Delete account"><i class="fa-solid fa-trash"></i></button>
                      ` : ''}
                    </div>
                  </td>
                </tr>
              `}).join('')}
            </tbody>
          </table>
        </div>

        <!-- 2. Mobile Candidate Cards Stream (< 992px) -->
        <div class="d-flex d-lg-none flex-column gap-2.5" id="admin-users-cards-mobile">
          ${users.map(u => {
            const isAdmin = u.role && u.role.includes('ADMIN');
            const isSuper = u.role === 'ADMIN_SUPER';
            return `
            <div class="user-card-item p-3 rounded-3 border border-secondary border-opacity-25" style="background: rgba(18, 18, 22, 0.85);"
                 data-id="${u.id}" 
                 data-name="${(u.name || '').toLowerCase()}" 
                 data-email="${(u.email || '').toLowerCase()}" 
                 data-role="${(u.role || '').toLowerCase()}" 
                 data-paid="${u.isPaid ? 'true' : 'false'}" 
                 data-suspended="${u.isSuspended ? 'true' : 'false'}">
              <!-- Top Row: Avatar, Identity, Badges -->
              <div class="d-flex align-items-start justify-content-between gap-2 mb-2">
                <div class="d-flex align-items-center gap-2 min-w-0" style="min-width: 0;">
                  ${!isSuper ? `
                    <div class="form-check mb-0 flex-shrink-0" onclick="event.stopPropagation()">
                      <input class="form-check-input candidate-select-checkbox" type="checkbox" data-id="${u.id}" data-email="${u.email}" data-name="${u.name || 'Candidate'}" data-role="${u.role || 'STUDENT'}" data-paid="${u.isPaid ? 'true' : 'false'}" style="cursor: pointer;">
                    </div>
                  ` : ''}
                  <div class="avatar-circle flex-shrink-0" style="width: 36px; height: 36px; border-radius: 50%; background: ${isSuper ? '#f59e0b' : isAdmin ? '#6366f1' : '#1e293b'}; color: white; display: flex; align-items: center; justify-content: center; font-size: 0.82rem; font-weight: bold;">
                    ${(u.name || 'U').charAt(0).toUpperCase()}
                  </div>
                  <div class="min-w-0 flex-grow-1" style="min-width: 0;">
                    <div class="text-white fw-bold fs-7 text-truncate">${u.name || 'Anonymous Candidate'}</div>
                    <div class="text-muted fs-9 font-monospace text-truncate">
                      ${u.email}
                      ${u.googleId ? '<span class="text-info ms-1"><i class="fa-brands fa-google"></i></span>' : ''}
                    </div>
                  </div>
                </div>
                <div class="d-flex flex-wrap gap-1 justify-content-end flex-shrink-0">
                  ${isSuper ? '<span class="badge badge-super-admin px-2 py-0.5 fs-9"><i class="fa-solid fa-crown me-1"></i>SUPER</span>' :
                    isAdmin ? '<span class="badge bg-primary px-2 py-0.5 fs-9">ADMIN</span>' :
                    '<span class="badge bg-secondary bg-opacity-50 text-light px-2 py-0.5 fs-9">STUDENT</span>'}
                  ${u.isPaid ? '<span class="badge badge-pro-lifetime px-2 py-0.5 fs-9"><i class="fa-solid fa-gem me-1"></i>PRO</span>' : '<span class="badge bg-dark text-muted border border-secondary border-opacity-25 px-2 py-0.5 fs-9">FREE</span>'}
                  ${u.isSuspended ? '<span class="badge bg-danger text-white px-2 py-0.5 fs-9">SUSPENDED</span>' : ''}
                </div>
              </div>

              <!-- Metadata Row: Joined Date & Referral Status -->
              <div class="d-flex align-items-center justify-content-between py-1.5 px-2.5 rounded bg-black bg-opacity-40 fs-9 text-muted font-monospace mb-2.5">
                <div><i class="fa-regular fa-calendar me-1"></i>Joined: <span class="text-light">${u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}</span></div>
                <div><i class="fa-solid fa-sack-dollar text-success me-1"></i>Ref: <span class="text-success fw-bold">₹${u.referralEarnings || 0}</span> (${u.referralCode || 'Direct'})</div>
              </div>

              <!-- Action Toolbar: Primary + More Menu -->
              <div class="d-flex align-items-center justify-content-between pt-1 border-top border-secondary border-opacity-15">
                <span class="text-muted font-monospace fs-9">#${u.id}</span>
                <div class="d-flex align-items-center gap-1.5">
                  <!-- Pro Pass Toggle -->
                  <button class="btn btn-sm btn-glass btn-toggle-pro py-1 px-2.5 fs-8 fw-semibold" data-id="${u.id}" data-email="${u.email}" data-current="${u.isPaid ? 'true' : 'false'}" title="${u.isPaid ? 'Revoke Pro Pass' : 'Grant Lifetime Pro Pass'}">
                    <i class="fa-solid fa-gem ${u.isPaid ? 'text-warning' : 'text-muted'} me-1"></i> ${u.isPaid ? 'Pro Pass' : 'Grant Pro'}
                  </button>

                  <!-- Direct Email -->
                  <button class="btn btn-sm btn-glass btn-compose-user-email py-1 px-2.5 fs-8" data-email="${u.email}" data-name="${u.name || 'Candidate'}" title="Send direct email">
                    <i class="fa-solid fa-envelope text-info"></i>
                  </button>

                  <!-- 3-Dots More Options Dropdown -->
                  <div class="dropdown d-inline-block">
                    <button class="btn btn-sm btn-glass py-1 px-2 fs-8 text-secondary" data-bs-toggle="dropdown" aria-expanded="false" title="More Actions">
                      <i class="fa-solid fa-ellipsis-vertical"></i>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end agy-dropdown-menu">
                      ${!isSuper ? `
                        <li><button class="agy-dropdown-item btn-toggle-role" data-id="${u.id}" data-email="${u.email}" data-role="${u.role}">
                          <i class="fa-solid fa-user-shield text-primary"></i> ${isAdmin ? 'Demote to Student' : 'Promote to Admin'}
                        </button></li>
                      ` : ''}
                      ${!isSuper ? (u.isSuspended ? `
                        <li><button class="agy-dropdown-item text-success btn-user-action" data-id="${u.id}" data-email="${u.email}" data-action="unsuspend">
                          <i class="fa-solid fa-user-check"></i> Unsuspend Candidate
                        </button></li>
                      ` : `
                        <li><button class="agy-dropdown-item text-warning btn-user-action" data-id="${u.id}" data-email="${u.email}" data-action="suspend">
                          <i class="fa-solid fa-user-slash"></i> Suspend Candidate
                        </button></li>
                      `) : ''}
                      ${!isSuper ? `
                        <li><hr class="dropdown-divider border-secondary border-opacity-25 my-1"></li>
                        <li><button class="agy-dropdown-item text-danger btn-delete-user" data-id="${u.id}" data-email="${u.email}">
                          <i class="fa-solid fa-trash"></i> Delete Account
                        </button></li>
                      ` : ''}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            `;
          }).join('')}
        </div>
      </div>
      </div>
    `;
  },

  adminRiskList: (risks) => {
    if (!risks || risks.length === 0) {
      return `<div class="text-center py-5 text-success"><i class="fa-solid fa-circle-check fa-2x mb-3"></i><p>No suspicious referral activities detected. Risk level clear.</p></div>`;
    }
    return `
      <div class="table-responsive" style="overflow-x: auto;">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Referrer Candidate</th>
              <th>Referred Candidate</th>
              <th>Referral Bounty</th>
              <th>Bounty Status</th>
              <th>Risk Score</th>
              <th>Risk Level</th>
              <th>Risk Reason</th>
            </tr>
          </thead>
          <tbody>
            ${risks.map(r => `
              <tr>
                <td><div class="text-truncate text-white" style="max-width: 180px;" title="${r.referrerEmail}">${r.referrerEmail}</div></td>
                <td><div class="text-truncate text-white" style="max-width: 180px;" title="${r.referredEmail}">${r.referredEmail}</div></td>
                <td class="text-success font-monospace fw-bold">₹${r.amount}</td>
                <td>
                  <span class="badge ${r.status === 'APPROVED' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}">
                    ${r.status}
                  </span>
                </td>
                <td class="fw-bold font-monospace">${r.riskScore}%</td>
                <td>
                  <span class="badge ${r.riskLevel === 'HIGH' ? 'bg-danger text-white' : r.riskLevel === 'MEDIUM' ? 'bg-warning text-dark' : 'bg-info text-dark'}">
                     ${r.riskLevel}
                  </span>
                </td>
                <td class="text-danger-emphasis fs-8">${r.reasons.join(', ')}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  adminAuditList: (logs) => {
    if (!logs || logs.length === 0) {
      return `<div class="admin-box p-5 text-center text-muted"><i class="fa-solid fa-clipboard-list fa-3x mb-3 text-secondary"></i><h5 class="text-white">Audit Trail Empty</h5><p class="fs-8">No administrative audits or configuration modifications have been logged yet.</p></div>`;
    }
    return `
      <div class="admin-box p-3">
        <div class="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
          <div>
            <h5 class="text-white fw-bold mb-1"><i class="fa-solid fa-shield-halved text-info me-2"></i>Administrative Security Audit Trail</h5>
            <small class="text-muted fs-8">Cryptographic record of admin logins, setting adjustments, and account moderation</small>
          </div>
          <span class="badge bg-dark text-info border border-secondary border-opacity-25 px-3 py-1 font-monospace">${logs.length} Total Audit Records</span>
        </div>

        <div class="mb-3" style="max-width: 380px;">
          <div class="input-group input-group-sm">
            <span class="input-group-text bg-light border-secondary border-opacity-20 text-muted"><i class="fa-solid fa-magnifying-glass"></i></span>
            <input type="text" id="admin-audit-search-input" class="form-control admin-input" placeholder="Search by admin email, action, or key...">
          </div>
        </div>

        <div class="table-responsive" style="overflow-x: auto;">
          <table class="admin-table" id="admin-audit-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Administrator</th>
                <th>Action Executed</th>
                <th>Target Setting / User</th>
                <th>Before</th>
                <th>After</th>
                <th>IP Address</th>
              </tr>
            </thead>
            <tbody id="admin-audit-table-body">
              ${logs.map(l => `
                <tr class="audit-table-row" data-admin="${(l.adminEmail || '').toLowerCase()}" data-action="${(l.action || '').toLowerCase()}" data-target="${(l.targetKey || '').toLowerCase()}">
                  <td class="text-muted fs-8 font-monospace">${new Date(l.createdAt).toLocaleString()}</td>
                  <td class="text-warning fw-semibold font-monospace fs-8">${l.adminEmail}</td>
                  <td class="text-white">${l.action}</td>
                  <td><code>${l.targetKey || 'N/A'}</code></td>
                  <td class="text-muted fs-8">${l.beforeValue || 'N/A'}</td>
                  <td class="text-emerald fs-8 fw-semibold">${l.afterValue || 'N/A'}</td>
                  <td><code class="text-secondary fs-8">${l.ipAddress || '127.0.0.1'}</code></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  adminHealthReport: (health, webhooks = []) => {
    const isAppUp = health.appStatus === 'UP';
    const isDbUp = health.databaseStatus === 'UP';
    const isGwUp = health.paymentGatewayStatus === 'UP';
    const uptimeHours = Math.floor((health.uptimeSeconds || 0) / 3600);
    const uptimeMins = Math.floor(((health.uptimeSeconds || 0) % 3600) / 60);

    return `
      <div class="row g-3 mb-4">
        <!-- Application Server -->
        <div class="col-md-3">
          <div class="admin-box ${isAppUp ? '' : ''} p-3 text-center">
            <div class="admin-kpi-label mb-2">Backend Application</div>
            <h5 class="fw-bold ${isAppUp ? 'text-success' : 'text-danger'} mb-0">
              <i class="fa-solid fa-circle-check me-2"></i>${isAppUp ? 'OPERATIONAL' : 'DEGRADED'}
            </h5>
            <small class="text-muted fs-9 mt-1 d-block">Render Linux Container</small>
          </div>
        </div>

        <!-- PostgreSQL Database -->
        <div class="col-md-3">
          <div class="admin-box ${isDbUp ? '' : ''} p-3 text-center">
            <div class="admin-kpi-label mb-2">PostgreSQL Database</div>
            <h5 class="fw-bold ${isDbUp ? 'text-success' : 'text-danger'} mb-0">
               <i class="fa-solid fa-database me-2"></i>${isDbUp ? 'CONNECTED' : 'DISCONNECTED'}
            </h5>
            <small class="text-muted fs-9 mt-1 d-block">Neon Serverless Cluster</small>
          </div>
        </div>

        <!-- Cashfree Gateway -->
        <div class="col-md-3">
          <div class="admin-box ${isGwUp ? '' : ''} p-3 text-center">
            <div class="admin-kpi-label mb-2">Payment Gateway</div>
            <h5 class="fw-bold ${isGwUp ? 'text-success' : 'text-danger'} mb-0">
              <i class="fa-solid fa-credit-card me-2"></i>${isGwUp ? 'ONLINE' : 'ERROR'}
            </h5>
            <small class="text-muted fs-9 mt-1 d-block">Cashfree v2023 PG</small>
          </div>
        </div>

        <!-- System Uptime -->
        <div class="col-md-3">
          <div class="admin-box p-3 text-center">
            <div class="admin-kpi-label mb-2">Runtime Uptime</div>
            <h5 class="text-white fw-bold mb-0 font-monospace">
              <i class="fa-solid fa-clock text-info me-2"></i>${uptimeHours}h ${uptimeMins}m
            </h5>
            <small class="text-muted fs-9 mt-1 d-block">Zero crash restarts</small>
          </div>
        </div>
      </div>

      <!-- Inbound Webhook Event Stream -->
      <div class="admin-box p-3">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5 class="text-white fw-bold mb-1"><i class="fa-solid fa-network-wired text-info me-2"></i>Webhook Inbound Stream Audit</h5>
            <small class="text-muted fs-8">Idempotent signature validation for gateway and external notifications</small>
          </div>
          <span class="badge border border-secondary border-opacity-30 text-white px-3 py-1 font-monospace">${webhooks.length} Webhook Events</span>
        </div>

        <div class="table-responsive" style="overflow-x: auto;">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Received At</th>
                <th>Event Reference ID</th>
                <th>Event Type</th>
                <th>Ingestion Status</th>
                <th>Trace Details</th>
              </tr>
            </thead>
            <tbody>
              ${webhooks.length === 0 ? '<tr><td colspan="5" class="text-center text-muted py-4">No webhook receipts recorded in this window.</td></tr>' : 
                webhooks.map(w => `
                  <tr>
                    <td class="text-muted fs-8 font-monospace">${new Date(w.receivedAt).toLocaleString()}</td>
                    <td class="text-info font-monospace fs-8">${w.eventId}</td>
                    <td><code>${w.eventType}</code></td>
                    <td>
                      <span class="badge ${w.status === 'SUCCESS' ? 'bg-success-subtle text-success border border-success-subtle' : 'bg-danger-subtle text-danger border border-danger-subtle'}">
                        ${w.status}
                      </span>
                    </td>
                    <td class="text-danger-emphasis fs-8">${w.errorTrace || '<span class="text-muted font-monospace fs-9">Processed cleanly</span>'}</td>
                  </tr>
                `).join('')
              }
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  adminLeaderboardList: (tests = []) => {
    return `
      <div class="admin-box p-3">
        <div class="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
          <div>
            <h5 class="text-white fw-bold mb-1"><i class="fa-solid fa-trophy text-warning me-2"></i>Placement League & Assessment Moderation</h5>
            <small class="text-muted fs-8">Anti-cheat scoring oversight, test submission logs, and leaderboard integrity</small>
          </div>
          <span class="badge border border-secondary border-opacity-30 text-white px-3 py-1 font-monospace">${tests.length} Total Attempts</span>
        </div>

        <!-- Filter and Search -->
        <div class="row g-2 align-items-center mb-3">
          <div class="col-md-6">
            <div class="input-group input-group-sm">
              <span class="input-group-text bg-light border-secondary border-opacity-20 text-muted"><i class="fa-solid fa-magnifying-glass"></i></span>
              <input type="text" id="admin-leaderboard-search-input" class="form-control admin-input" placeholder="Search candidate name, email, or category...">
            </div>
          </div>
          <div class="col-md-6">
            <div class="d-flex flex-wrap gap-1 justify-content-md-end" id="admin-leaderboard-chips">
              <span class="admin-filter-pill active" data-cat="all">All Topics</span>
              <span class="admin-filter-pill" data-cat="dsa">DSA</span>
              <span class="admin-filter-pill" data-cat="java">Java</span>
              <span class="admin-filter-pill" data-cat="sql">SQL</span>
              <span class="admin-filter-pill" data-cat="os">OS</span>
              <span class="admin-filter-pill" data-cat="cn">CN</span>
              <span class="admin-filter-pill" data-cat="python">Python</span>
            </div>
          </div>
        </div>

        <div class="table-responsive" style="overflow-x: auto;">
          <table class="admin-table" id="admin-leaderboard-table">
            <thead>
              <tr>
                <th style="width: 40px;">#</th>
                <th>Candidate</th>
                <th>Category</th>
                <th>Score</th>
                <th>Proctoring</th>
                <th>Completed At</th>
                <th class="text-end">Actions</th>
              </tr>
            </thead>
            <tbody id="admin-leaderboard-table-body">
              ${tests.length === 0 ? '<tr><td colspan="7" class="text-center text-muted py-4 font-monospace">No assessment test records found.</td></tr>' : 
                tests.map(t => {
                  const candidateName = t.user ? t.user.name : 'Anonymous Candidate';
                  const candidateEmail = t.user ? t.user.email : 'N/A';
                  const cat = (t.category || 'DSA').toLowerCase();
                  return `
                  <tr class="leaderboard-table-row" data-name="${candidateName.toLowerCase()}" data-email="${candidateEmail.toLowerCase()}" data-cat="${cat}">
                    <td class="font-monospace text-muted fs-8">#${t.id}</td>
                    <td>
                      <div class="text-white fw-semibold text-truncate" style="max-width: 180px;">${candidateName}</div>
                      <div class="text-secondary font-monospace fs-9 text-truncate" style="max-width: 180px;">${candidateEmail}</div>
                    </td>
                    <td><span class="badge border border-secondary border-opacity-30 text-white font-monospace px-2 py-0.5 fs-9">${t.category}</span></td>
                    <td class="fw-bold text-success font-monospace">${t.score} pts</td>
                    <td>
                      ${t.score >= 90 ? '<span class="badge bg-success-subtle text-success border border-success-subtle px-2 py-0.5 fs-9"><i class="fa-solid fa-shield-check me-1"></i> High Rank</span>' : '<span class="badge bg-secondary-subtle text-muted px-2 py-0.5 fs-9">Standard</span>'}
                    </td>
                    <td class="text-muted fs-8">${t.completedAt ? new Date(t.completedAt).toLocaleDateString() : 'N/A'}</td>
                    <td class="text-end">
                      <button class="btn btn-admin-action btn-outline-danger btn-delete-mocktest" data-id="${t.id}" title="Remove entry from leaderboard">
                        <i class="fa-solid fa-trash-can"></i>
                      </button>
                    </td>
                  </tr>
                `}).join('')
              }
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  adminOverviewTab: (stats) => {
    return `
      <!-- Charts & Visual Analytics Grid -->
      <div class="row g-3 mb-4">
        <!-- Revenue & Registration Trend -->
        <div class="col-lg-8">
          <div class="admin-box p-3 h-100">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h6 class="text-white fw-bold mb-0"><i class="fa-solid fa-chart-line text-emerald me-2"></i>Platform Revenue & Candidate Growth (30D)</h6>
                <small class="text-muted fs-8">Visual telemetry of subscriber conversions and platform traffic</small>
              </div>
              <span class="badge bg-emerald-subtle text-emerald border border-emerald-subtle px-2 py-0.5 fs-9">Real-Time</span>
            </div>
            <div style="height: 250px; position: relative;">
              <canvas id="adminRevenueChart"></canvas>
            </div>
          </div>
        </div>

        <!-- Assessment Category Distribution -->
        <div class="col-lg-4">
          <div class="admin-box p-3 h-100">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h6 class="text-white fw-bold mb-0"><i class="fa-solid fa-chart-pie text-cyan me-2"></i>Exam Submissions</h6>
                <small class="text-muted fs-8">Candidate topic volume</small>
              </div>
            </div>
            <div style="height: 250px; position: relative;" class="d-flex align-items-center justify-content-center">
              <canvas id="adminCategoryChart"></canvas>
            </div>
          </div>
        </div>
      </div>

      <!-- Tactical Telemetry & Quick Action Cards -->
      <div class="row g-3 mb-4">
        <div class="col-md-4">
          <div class="admin-box p-3">
            <div class="d-flex align-items-center justify-content-between">
              <div>
                <div class="admin-kpi-label">Pro Conversion Rate</div>
                <h4 class="text-white fw-bold mb-0 mt-1">${stats.totalUsers ? Math.round(((stats.paidUsers || 0) / stats.totalUsers) * 100) : 0}%</h4>
                <small class="text-info fs-8"><i class="fa-solid fa-arrow-trend-up me-1"></i>${stats.paidUsers || 0} of ${stats.totalUsers || 0} candidates</small>
              </div>
              <div class="p-2 bg-primary bg-opacity-10 rounded-circle text-primary fs-5"><i class="fa-solid fa-crown"></i></div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="admin-box p-3">
            <div class="d-flex align-items-center justify-content-between">
              <div>
                <div class="admin-kpi-label">Affiliate Bounties Paid</div>
                <h4 class="text-success fw-bold mb-0 mt-1">₹${stats.totalReferralPayouts || 0}</h4>
                <small class="text-muted fs-8">Disbursed via automated UPI payouts</small>
              </div>
              <div class="p-2 bg-success bg-opacity-10 rounded-circle text-success fs-5"><i class="fa-solid fa-hand-holding-dollar"></i></div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="admin-box p-3">
            <div class="d-flex align-items-center justify-content-between">
              <div>
                <div class="admin-kpi-label">Pending Claims</div>
                <h4 class="text-warning fw-bold mb-0 mt-1">₹${stats.totalPendingWithdrawalAmount || 0}</h4>
                <small class="text-muted fs-8">Awaiting super admin disbursement</small>
              </div>
              <div class="p-2 bg-warning bg-opacity-10 rounded-circle text-warning fs-5"><i class="fa-solid fa-clock-rotate-left"></i></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Platform Operations Links -->
      <div class="admin-box p-3">
        <h6 class="text-white fw-bold mb-3"><i class="fa-solid fa-bolt text-warning me-2"></i>Executive Operational Short-Cuts</h6>
        <div class="row g-3">
          <div class="col-md-3">
            <button class="btn btn-glass w-100 text-start p-3 h-100" onclick="loadAdminPanelTab('users')">
              <div class="fw-bold text-white mb-1"><i class="fa-solid fa-user-gear text-primary me-2"></i>Manage Candidates</div>
              <small class="text-muted fs-8">Grant Pro, change roles, suspend or delete users</small>
            </button>
          </div>
          <div class="col-md-3">
            <button class="btn btn-glass w-100 text-start p-3 h-100" onclick="loadAdminPanelTab('broadcast')">
              <div class="fw-bold text-white mb-1"><i class="fa-solid fa-bullhorn text-danger me-2"></i>Candidate Communicator</div>
              <small class="text-muted fs-8">Dispatch official emails or publish live banners</small>
            </button>
          </div>
          <div class="col-md-3">
            <button class="btn btn-glass w-100 text-start p-3 h-100" onclick="loadAdminPanelTab('rules')">
              <div class="fw-bold text-white mb-1"><i class="fa-solid fa-sliders text-warning me-2"></i>Tune Platform Flags</div>
              <small class="text-muted fs-8">Pricing, referral bounties, passing cutoffs</small>
            </button>
          </div>
          <div class="col-md-3">
            <button class="btn btn-glass w-100 text-start p-3 h-100" onclick="loadAdminPanelTab('health')">
              <div class="fw-bold text-white mb-1"><i class="fa-solid fa-server text-success me-2"></i>Infrastructure Dials</div>
              <small class="text-muted fs-8">Server uptime, PostgreSQL status, webhooks</small>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  adminBroadcastTab: (settings = {}, users = []) => {
    const isBannerActive = settings.GLOBAL_ANNOUNCEMENT_ACTIVE === 'true';
    const bannerText = settings.GLOBAL_ANNOUNCEMENT_TEXT || '';
    const bannerLevel = settings.GLOBAL_ANNOUNCEMENT_LEVEL || 'info';

    // Ticker settings from backend or local fallback
    let localTicker = null;
    try {
      const raw = localStorage.getItem('admin_announcement_ticker');
      if (raw) localTicker = JSON.parse(raw);
    } catch (e) {}

    const tickerActive = settings.TICKER_ACTIVE !== undefined ? settings.TICKER_ACTIVE === 'true' : (localTicker ? localTicker.active !== 'false' : true);
    const tickerBadge1 = settings.TICKER_BADGE_1 || (localTicker && localTicker.badge1) || 'TOP 50 PERK';
    const tickerText1 = settings.TICKER_TEXT_1 || (localTicker && localTicker.text1) || 'Rank in the Top 50 of any Mock Exam (Java, Python, C++, React, DSA) & win a 100% Free Lifetime Pro Subscription!';
    const tickerBtn1 = settings.TICKER_BTN_1 || (localTicker && localTicker.btn1) || 'Take Mock Exam →';
    const tickerLink1 = settings.TICKER_LINK_1 || (localTicker && localTicker.link1) || '#/mock-exams';

    const tickerBadge2 = settings.TICKER_BADGE_2 || (localTicker && localTicker.badge2) || 'LEADERBOARD CHALLENGE';
    const tickerText2 = settings.TICKER_TEXT_2 || (localTicker && localTicker.text2) || 'Compete with 2,400+ developers globally in real-time timed technical evaluations';
    const tickerBtn2 = settings.TICKER_BTN_2 || (localTicker && localTicker.btn2) || 'Join Leaderboard →';
    const tickerLink2 = settings.TICKER_LINK_2 || (localTicker && localTicker.link2) || '#/mock-exams';

    const allCount = users ? users.filter(u => !u.isSuspended).length : 0;
    const proCount = users ? users.filter(u => u.isPaid && !u.isSuspended).length : 0;
    const freeCount = users ? users.filter(u => !u.isPaid && !u.isSuspended).length : 0;

    return `
      <div class="row g-3">
        <!-- Official Email & Bulk Broadcast Dispatcher -->
        <div class="col-lg-7">
          <div class="admin-box p-3 h-100">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h6 class="text-white fw-bold mb-1"><i class="fa-solid fa-envelope-open-text text-info me-2"></i>Official Communicator & Bulk Broadcast</h6>
                <small class="text-muted fs-8">Verified dispatch via <code class="text-emerald">verify@stream-in.app</code> &bull; Resend Engine</small>
              </div>
              <span class="badge bg-purple text-white px-2 py-0.5 fs-9"><i class="fa-solid fa-bolt me-1"></i> 1-Click Broadcast</span>
            </div>

            <!-- Audience Selector Pills -->
            <div class="mb-3">
              <label class="form-label text-muted fs-8 uppercase fw-bold mb-2">Target Audience</label>
              <div class="d-flex flex-wrap gap-1" id="broadcast-audience-pills">
                <button type="button" class="btn btn-xs btn-glass broadcast-audience-pill active" data-audience="all">
                  <i class="fa-solid fa-users me-1 text-primary"></i> All Candidates (<span id="pill-count-all">${allCount}</span>)
                </button>
                <button type="button" class="btn btn-xs btn-glass broadcast-audience-pill" data-audience="pro">
                  <i class="fa-solid fa-crown me-1 text-warning"></i> Pro Members (<span id="pill-count-pro">${proCount}</span>)
                </button>
                <button type="button" class="btn btn-xs btn-glass broadcast-audience-pill" data-audience="free">
                  <i class="fa-solid fa-graduation-cap me-1 text-emerald"></i> Free Users (<span id="pill-count-free">${freeCount}</span>)
                </button>
                <button type="button" class="btn btn-xs btn-glass broadcast-audience-pill" data-audience="single">
                  <i class="fa-solid fa-user me-1 text-info"></i> Single Candidate
                </button>
              </div>
            </div>

            <!-- Single Candidate Recipient Inputs (Visible only when audience is 'single') -->
            <div id="broadcast-single-inputs" class="d-none">
              <div class="mb-3">
                <label class="form-label text-muted fs-8 uppercase">Candidate Recipient Email</label>
                <div class="input-group input-group-sm">
                  <span class="input-group-text bg-light border-secondary border-opacity-20 text-muted"><i class="fa-solid fa-at"></i></span>
                  <input type="email" id="broadcast-email-to" class="form-control admin-input" placeholder="e.g. candidate@gmail.com">
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label text-muted fs-8 uppercase">Recipient Name</label>
                <input type="text" id="broadcast-email-name" class="form-control form-control-sm admin-input" placeholder="e.g. Rahul Sharma" value="Candidate">
              </div>
            </div>

            <!-- Bulk Audience Summary Card (Visible when audience is 'all', 'pro', or 'free') -->
            <div id="broadcast-bulk-info-card" class="mb-3 p-2.5 rounded bg-dark bg-opacity-50 border border-secondary border-opacity-25">
              <div class="d-flex justify-content-between align-items-center mb-1">
                <span class="text-white fw-bold fs-8" id="bulk-info-title"><i class="fa-solid fa-users text-primary me-2"></i>Broadcasting to All Active Candidates</span>
                <span class="badge bg-primary text-white fs-9" id="bulk-info-count-badge">${allCount} Candidates</span>
              </div>
              <p class="text-muted fs-9 mb-1" id="bulk-info-desc">
                Dispatched individually with personalized greetings (<code>Hello {Name}</code>) and authenticated with SPF/DKIM from <code>verify@stream-in.app</code>.
              </p>
              <div class="text-emerald fs-9"><i class="fa-solid fa-shield-halved me-1"></i> Privacy guaranteed: No recipient can see any other candidate's email address.</div>
            </div>

            <!-- Quick Template Presets -->
            <div class="mb-3">
              <div class="d-flex justify-content-between align-items-center mb-1">
                <label class="form-label text-muted fs-9 uppercase mb-0">Quick Announcement Presets</label>
                <span class="text-muted fs-9">Click to insert template</span>
              </div>
              <div class="d-flex flex-wrap gap-1">
                <button type="button" class="btn btn-xs btn-glass text-warning broadcast-preset-btn" data-preset="top50">
                  <i class="fa-solid fa-trophy me-1"></i> Top 50 Perk Free Pro
                </button>
                <button type="button" class="btn btn-xs btn-glass text-cyan broadcast-preset-btn" data-preset="exam">
                  <i class="fa-solid fa-stopwatch me-1"></i> 50-MCQ Timed Exam
                </button>
                <button type="button" class="btn btn-xs btn-glass text-emerald broadcast-preset-btn" data-preset="interview">
                  <i class="fa-solid fa-brain me-1"></i> AI Interview Drill
                </button>
                <button type="button" class="btn btn-xs btn-glass text-info broadcast-preset-btn" data-preset="maintenance">
                  <i class="fa-solid fa-wrench me-1"></i> Platform Maintenance
                </button>
              </div>
            </div>

            <!-- Email Dispatch Form -->
            <form id="admin-broadcast-email-form">
              <div class="mb-3">
                <label class="form-label text-muted fs-8 uppercase">Broadcast Subject</label>
                <input type="text" id="broadcast-email-subject" class="form-control admin-input" placeholder="e.g. Special Opportunity: Claim Free Lifetime PrepPro Pass" required>
              </div>

              <div class="mb-3">
                <label class="form-label text-muted fs-8 uppercase">Broadcast Content (Markdown / Text)</label>
                <textarea id="broadcast-email-body" class="form-control admin-input" rows="8" placeholder="Type your broadcast message here. Use {Name} for personal name tag." required></textarea>
              </div>

              <!-- Dispatch Progress Bar (Active only during execution) -->
              <div id="broadcast-progress-panel" class="mb-3 p-3 rounded bg-dark bg-opacity-75 border border-primary border-opacity-25 d-none">
                <div class="d-flex justify-content-between align-items-center mb-1">
                  <span class="text-white fs-8 fw-bold" id="broadcast-progress-status"><i class="fa-solid fa-spinner fa-spin me-1 text-primary"></i> Dispatching emails...</span>
                  <span class="badge bg-primary text-white fs-9" id="broadcast-progress-counter">0 / 0</span>
                </div>
                <div class="progress progress-xs bg-dark">
                  <div id="broadcast-progress-bar" class="progress-bar progress-bar-striped progress-bar-animated bg-primary" style="width: 0%;"></div>
                </div>
              </div>

              <div class="d-flex justify-content-between align-items-center pt-2">
                <span class="text-muted fs-8"><i class="fa-solid fa-shield-halved text-success me-1"></i> SPF / DKIM Inboxed</span>
                <button type="submit" class="btn btn-premium px-4" id="btn-send-admin-email">
                  <i class="fa-solid fa-paper-plane me-2"></i><span id="btn-send-label">Dispatch Bulk Broadcast (${allCount} Candidates)</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Announcement & Ticker Controls Column -->
        <div class="col-lg-5 d-flex flex-column gap-3">
          <!-- Card 1: Top Moving Announcement Ticker (Public Home Page Marquee) -->
          <div class="admin-box p-3">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <h6 class="text-white fw-bold mb-0">
                <i class="fa-solid fa-bullhorn text-warning me-2"></i>Top Moving Announcement Ticker
              </h6>
              <span class="badge bg-warning text-dark px-2 py-0.5 fs-9 fw-bold">Live on Home Page</span>
            </div>
            <small class="text-muted fs-8">Modify moving side-by-side alert advertisements, perks & buttons</small>

            <div class="mt-3 mb-2 p-2 bg-dark bg-opacity-50 rounded border border-secondary border-opacity-25">
              <label class="form-label text-muted fs-9 uppercase mb-1">Live Moving Ticker Preview:</label>
              <div id="admin-ticker-preview-container" class="overflow-hidden rounded border border-secondary border-opacity-20" style="background: #18181b;">
                ${components.renderTopPromoTicker({
                  active: tickerActive ? 'true' : 'false',
                  badge1: tickerBadge1, text1: tickerText1, btn1: tickerBtn1, link1: tickerLink1,
                  badge2: tickerBadge2, text2: tickerText2, btn2: tickerBtn2, link2: tickerLink2
                })}
              </div>
            </div>

            <div class="mb-3">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="admin-ticker-active" ${tickerActive ? 'checked' : ''}>
                <label class="form-check-label text-white fs-8 fw-bold" for="admin-ticker-active">Enable Top Moving Announcement Ticker</label>
              </div>
            </div>

            <!-- Slide 1 Configuration -->
            <div class="p-2.5 rounded bg-dark bg-opacity-40 border border-secondary border-opacity-20 mb-3">
              <span class="text-warning fw-bold fs-8 d-block mb-2"><i class="fa-solid fa-circle-1 me-1"></i> Announcement Slide 1 (Primary Perk)</span>
              <div class="row g-2 mb-2">
                <div class="col-6">
                  <label class="form-label text-muted fs-9 uppercase mb-1">Badge Tag</label>
                  <input type="text" id="admin-ticker-badge-1" class="form-control form-control-sm admin-input" value="${tickerBadge1}" placeholder="e.g. TOP 50 PERK">
                </div>
                <div class="col-6">
                  <label class="form-label text-muted fs-9 uppercase mb-1">Button Text</label>
                  <input type="text" id="admin-ticker-btn-1" class="form-control form-control-sm admin-input" value="${tickerBtn1}" placeholder="e.g. Take Mock Exam →">
                </div>
              </div>
              <div class="mb-2">
                <label class="form-label text-muted fs-9 uppercase mb-1">Slide 1 Message</label>
                <textarea id="admin-ticker-text-1" class="form-control form-control-sm admin-input" rows="2" placeholder="Headline text...">${tickerText1}</textarea>
              </div>
              <div>
                <label class="form-label text-muted fs-9 uppercase mb-1">Button Target Link</label>
                <input type="text" id="admin-ticker-link-1" class="form-control form-control-sm admin-input font-monospace" value="${tickerLink1}" placeholder="#/mock-exams">
              </div>
            </div>

            <!-- Slide 2 Configuration -->
            <div class="p-2.5 rounded bg-dark bg-opacity-40 border border-secondary border-opacity-20 mb-3">
              <span class="text-emerald fw-bold fs-8 d-block mb-2"><i class="fa-solid fa-circle-2 me-1"></i> Announcement Slide 2 (Feature / Challenge)</span>
              <div class="row g-2 mb-2">
                <div class="col-6">
                  <label class="form-label text-muted fs-9 uppercase mb-1">Badge Tag</label>
                  <input type="text" id="admin-ticker-badge-2" class="form-control form-control-sm admin-input" value="${tickerBadge2}" placeholder="e.g. LEADERBOARD CHALLENGE">
                </div>
                <div class="col-6">
                  <label class="form-label text-muted fs-9 uppercase mb-1">Button Text</label>
                  <input type="text" id="admin-ticker-btn-2" class="form-control form-control-sm admin-input" value="${tickerBtn2}" placeholder="e.g. Join Leaderboard →">
                </div>
              </div>
              <div class="mb-2">
                <label class="form-label text-muted fs-9 uppercase mb-1">Slide 2 Message</label>
                <textarea id="admin-ticker-text-2" class="form-control form-control-sm admin-input" rows="2" placeholder="Secondary headline text...">${tickerText2}</textarea>
              </div>
              <div>
                <label class="form-label text-muted fs-9 uppercase mb-1">Button Target Link</label>
                <input type="text" id="admin-ticker-link-2" class="form-control form-control-sm admin-input font-monospace" value="${tickerLink2}" placeholder="#/mock-exams">
              </div>
            </div>

            <button class="btn btn-warning w-100 fw-bold text-dark" id="btn-save-ticker-settings">
              <i class="fa-solid fa-floppy-disk me-2"></i>Save & Publish Moving Ticker
            </button>
          </div>

          <!-- Card 2: Global Platform Banner (Dashboard In-App Alert) -->
          <div class="admin-box p-3">
            <h6 class="text-white fw-bold mb-1"><i class="fa-solid fa-shield-halved text-info me-2"></i>Portal Alert Banner</h6>
            <small class="text-muted fs-8">Broadcasts an alert box across logged-in user dashboards</small>

            <div class="my-3 p-3 bg-dark bg-opacity-50 rounded border border-secondary border-opacity-25">
              <label class="form-label text-muted fs-9 uppercase mb-1">Live In-Portal Banner Preview:</label>
              <div id="banner-preview-box" class="alert alert-${bannerLevel} d-flex align-items-center gap-2 mb-0 py-2 fs-8">
                <i class="fa-solid fa-circle-info"></i>
                <span id="banner-preview-text">${bannerText || 'No active announcement. Banner is currently hidden.'}</span>
              </div>
            </div>

            <div class="mb-3">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="admin-banner-active" ${isBannerActive ? 'checked' : ''}>
                <label class="form-check-label text-white fs-8 fw-bold" for="admin-banner-active">Enable Dashboard Alert Banner</label>
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label text-muted fs-8 uppercase">Banner Severity Level</label>
              <select id="admin-banner-level" class="form-select form-select-sm admin-input">
                <option value="info" ${bannerLevel === 'info' ? 'selected' : ''}>Info (Cyan / Informative)</option>
                <option value="warning" ${bannerLevel === 'warning' ? 'selected' : ''}>Warning (Amber / Action Needed)</option>
                <option value="danger" ${bannerLevel === 'danger' ? 'selected' : ''}>Critical (Red / Urgent Alert)</option>
                <option value="success" ${bannerLevel === 'success' ? 'selected' : ''}>Success (Emerald / Celebration)</option>
              </select>
            </div>

            <div class="mb-3">
              <label class="form-label text-muted fs-8 uppercase">Announcement Text</label>
              <textarea id="admin-banner-text" class="form-control admin-input" rows="2" placeholder="e.g. Maintenance scheduled for 2:00 AM IST or 50% discount on Pro Pass!">${bannerText}</textarea>
            </div>

            <button class="btn btn-premium w-100 fw-semibold" id="btn-save-banner-settings"><i class="fa-solid fa-floppy-disk me-2"></i>Publish Alert to All Users</button>
          </div>
        </div>
      </div>
    `;
  },

  adminSettingsForm: (settings) => {
    return `
      <div class="row g-3">
        <!-- Financial Configurations -->
        <div class="col-md-6">
          <div class="admin-box p-3 h-100">
            <h6 class="text-white fw-bold mb-3"><i class="fa-solid fa-coins text-warning me-2"></i>Monetization & Bounties</h6>
            
            <div class="mb-3">
              <label class="form-label text-muted fs-8 uppercase">Product Premium Access Price (INR)</label>
              <div class="input-group input-group-sm">
                <span class="input-group-text bg-secondary border-0 text-white font-monospace">₹</span>
                <input type="number" id="setting-PRODUCT_PRICE_INR" class="form-control admin-input" value="${settings.PRODUCT_PRICE_INR || 399}">
                <button class="btn btn-primary btn-save-setting" data-key="PRODUCT_PRICE_INR">Update</button>
              </div>
              <small class="text-muted fs-9">Current live charge on Cashfree gateway.</small>
            </div>

            <div class="mb-3">
              <label class="form-label text-muted fs-8 uppercase">Referral Reward Bounty (INR per Invite)</label>
              <div class="input-group input-group-sm">
                <span class="input-group-text bg-secondary border-0 text-white font-monospace">₹</span>
                <input type="number" id="setting-REFERRAL_REWARD_INR" class="form-control admin-input" value="${settings.REFERRAL_REWARD_INR || 199}">
                <button class="btn btn-primary btn-save-setting" data-key="REFERRAL_REWARD_INR">Update</button>
              </div>
              <small class="text-muted fs-9">Credited to referrer upon successful candidate upgrade.</small>
            </div>

            <div class="mb-3">
              <label class="form-label text-muted fs-8 uppercase">Minimum Withdrawal Threshold (INR)</label>
              <div class="input-group input-group-sm">
                <span class="input-group-text bg-secondary border-0 text-white font-monospace">₹</span>
                <input type="number" id="setting-MIN_WITHDRAWAL_INR" class="form-control admin-input" value="${settings.MIN_WITHDRAWAL_INR || 100}">
                <button class="btn btn-primary btn-save-setting" data-key="MIN_WITHDRAWAL_INR">Update</button>
              </div>
              <small class="text-muted fs-9">Minimum wallet balance required to request UPI cashout.</small>
            </div>
          </div>
        </div>

        <!-- Assessment Rules & Proctoring Thresholds -->
        <div class="col-md-6">
          <div class="admin-box p-3 h-100">
            <h6 class="text-white fw-bold mb-3"><i class="fa-solid fa-graduation-cap text-cyan me-2"></i>Assessment & Proctoring Rules</h6>
            
            <div class="mb-3">
              <label class="form-label text-muted fs-8 uppercase">Technical Assessment Passing Cutoff (%)</label>
              <div class="input-group input-group-sm">
                <input type="number" id="setting-MOCKTEST_PASSING_PERCENT" class="form-control admin-input" value="${settings.MOCKTEST_PASSING_PERCENT || 70}" min="40" max="100">
                <span class="input-group-text bg-secondary border-0 text-white font-monospace">%</span>
                <button class="btn btn-primary btn-save-setting" data-key="MOCKTEST_PASSING_PERCENT">Update</button>
              </div>
              <small class="text-muted fs-9">Candidates scoring above this threshold earn the Pro Certificate badge.</small>
            </div>

            <div class="mb-3">
              <label class="form-label text-muted fs-8 uppercase">Exam Anti-Cheat Max Tab Switches Allowed</label>
              <div class="input-group input-group-sm">
                <input type="number" id="setting-PROCTORING_MAX_TAB_SWITCHES" class="form-control admin-input" value="${settings.PROCTORING_MAX_TAB_SWITCHES || 3}" min="1" max="10">
                <button class="btn btn-primary btn-save-setting" data-key="PROCTORING_MAX_TAB_SWITCHES">Update</button>
              </div>
              <small class="text-muted fs-9">Exceeding this auto-disqualifies the mock test attempt.</small>
            </div>

            <div class="mb-3">
              <label class="form-label text-muted fs-8 uppercase">Google AdSense Publisher ID</label>
              <div class="input-group input-group-sm">
                <input type="text" id="setting-ADSENSE_PUBLISHER_ID" class="form-control admin-input" value="${settings.ADSENSE_PUBLISHER_ID || 'ca-pub-4662205173096609'}">
                <button class="btn btn-primary btn-save-setting" data-key="ADSENSE_PUBLISHER_ID">Update</button>
              </div>
            </div>
          </div>
        </div>

        <!-- SEO & Platform Branding -->
        <div class="col-12">
          <div class="admin-box p-3">
            <h6 class="text-white fw-bold mb-3"><i class="fa-solid fa-globe text-primary me-2"></i>SEO & Portal Metadata</h6>
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label text-muted fs-8 uppercase">SEO Portal Global Meta Title</label>
                <div class="input-group input-group-sm">
                  <input type="text" id="setting-SEO_META_TITLE" class="form-control admin-input" value="${settings.SEO_META_TITLE || 'PrepSpace - Premium Interview Preparation Tracker SaaS'}">
                  <button class="btn btn-primary btn-save-setting" data-key="SEO_META_TITLE">Update</button>
                </div>
              </div>
              <div class="col-md-6">
                <label class="form-label text-muted fs-8 uppercase">SEO Portal Global Meta Description</label>
                <div class="input-group input-group-sm">
                  <input type="text" id="setting-SEO_META_DESCRIPTION" class="form-control admin-input" value="${settings.SEO_META_DESCRIPTION || 'Master technical interviews with full-fidelity simulation, AI ATS analysis, and placement leagues.'}">
                  <button class="btn btn-primary btn-save-setting" data-key="SEO_META_DESCRIPTION">Update</button>
                </div>
              </div>
            </div>
      </div>
    `;
  },

  admin: (stats) => `
    <div class="container-fluid px-0 py-1">
      <!-- Executive Telemetry & Global Actions Header -->
      <div class="border-bottom border-secondary border-opacity-10 pb-3 mb-3">
        <div class="d-flex flex-wrap justify-content-between align-items-center gap-3">
          <div>
            <div class="d-flex align-items-center gap-2 mb-1">
              <span class="badge badge-super-admin px-2.5 py-1 fs-9"><i class="fa-solid fa-crown me-1 text-warning"></i> SUPER ADMIN COMMAND CENTER</span>
              <span class="badge bg-dark text-muted border border-secondary border-opacity-25 px-2 py-1 fs-9 font-monospace"><i class="fa-solid fa-shield-halved text-info me-1"></i> ENTERPRISE SUITE</span>
            </div>
            <h4 class="text-white fw-bold mb-0">Global Operations & Enterprise Control</h4>
          </div>

          <!-- Dual Clocks, Telemetry & Global Controls -->
          <div class="d-flex flex-wrap align-items-center gap-2">
            <!-- Dual Clocks (UTC & IST) -->
            <div class="admin-dual-clock d-flex align-items-center gap-3 px-3 py-1 font-monospace fs-8">
              <div>
                <span class="text-muted fs-9 uppercase d-block" style="line-height: 1;">UTC</span>
                <span id="admin-clock-utc" class="text-white fw-bold">--:--:--</span>
              </div>
              <div class="border-start border-secondary border-opacity-25 ps-3">
                <span class="text-muted fs-9 uppercase d-block" style="line-height: 1;">IST</span>
                <span id="admin-clock-ist" class="text-emerald fw-bold">--:--:--</span>
              </div>
            </div>

            <!-- Telemetry Indicator Badges -->
            <div class="d-none d-xl-flex align-items-center gap-1.5 ms-1">
              <span class="admin-pill-status"><span class="admin-pulse-dot emerald"></span> API 200</span>
              <span class="admin-pill-status"><span class="admin-pulse-dot cyan"></span> Neon PG</span>
              <span class="admin-pill-status"><span class="admin-pulse-dot amber"></span> WAF Defense</span>
              <span class="admin-pill-status"><span class="admin-pulse-dot purple"></span> Resend Active</span>
            </div>

            <!-- Export Dropdown -->
            <div class="dropdown">
              <button class="btn btn-glass btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown">
                <i class="fa-solid fa-download me-1 text-success"></i> Reports
              </button>
              <ul class="dropdown-menu dropdown-menu-dark shadow-lg">
                <li><a class="dropdown-item fs-8" href="/api/admin/reports/users"><i class="fa-solid fa-users me-2 text-primary"></i>Candidates CSV</a></li>
                <li><a class="dropdown-item fs-8" href="/api/admin/reports/payments"><i class="fa-solid fa-receipt me-2 text-success"></i>Transactions CSV</a></li>
                <li><a class="dropdown-item fs-8" href="/api/admin/reports/referrals"><i class="fa-solid fa-network-wired me-2 text-warning"></i>Affiliates CSV</a></li>
                <li><hr class="dropdown-divider border-secondary border-opacity-20"></li>
                <li><button class="dropdown-item fs-8" id="btn-admin-print-report" onclick="window.print()"><i class="fa-solid fa-file-pdf me-2 text-danger"></i>Export Executive PDF</button></li>
              </ul>
            </div>

            <!-- Purge Cache -->
            <button id="btn-admin-purge-cache" class="btn btn-glass btn-sm" title="Clear client cached credentials and reload">
              <i class="fa-solid fa-broom me-1 text-warning"></i> Flush Cache
            </button>

            <!-- Sync Telemetry -->
            <button id="btn-admin-refresh" class="btn btn-premium btn-sm px-3">
              <i class="fa-solid fa-rotate me-1"></i> Sync Telemetry
            </button>
          </div>
        </div>
      </div>

      <!-- High-Density Executive KPI Metrics Row with Sparklines -->
      <div class="row g-2 g-md-3 mb-3">
        <!-- Total Registered Candidates -->
        <div class="col-6 col-md-4 col-xl-2">
          <div class="admin-box admin-kpi-tile p-3">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <div class="admin-kpi-label">Total Candidates</div>
              <i class="fa-solid fa-users text-primary fs-8"></i>
            </div>
            <div class="admin-kpi-num" id="admin-kpi-total-candidates">${stats.totalUsers || 0}</div>
            <div class="admin-kpi-caption mt-1 text-muted"><i class="fa-solid fa-user-check text-primary me-1"></i>Registered profiles</div>
          </div>
        </div>

        <!-- Pro Subscribers & Conversion Rate -->
        <div class="col-6 col-md-4 col-xl-2">
          <div class="admin-box admin-kpi-tile p-3">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <div class="admin-kpi-label">Pro Pass Rate</div>
              <i class="fa-solid fa-crown text-warning fs-8"></i>
            </div>
            <div class="admin-kpi-num text-emerald" id="admin-kpi-pro-rate">${stats.totalUsers ? Math.round(((stats.paidUsers || 0) / stats.totalUsers) * 100) : 0}%</div>
            <div class="admin-kpi-caption text-emerald mt-1" id="admin-kpi-pro-caption"><i class="fa-solid fa-arrow-trend-up me-1"></i>${stats.paidUsers || 0} pro subscribers</div>
          </div>
        </div>

        <!-- Gross Platform Sales & Dynamic Sparkline -->
        <div class="col-6 col-md-4 col-xl-2">
          <div class="admin-box admin-kpi-tile p-3 position-relative">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <div class="admin-kpi-label">Gross Revenue</div>
              <i class="fa-solid fa-arrow-trend-up text-success fs-8"></i>
            </div>
            <div class="admin-kpi-num text-success" id="admin-kpi-revenue">₹${stats.totalRevenue || 0}</div>
            <svg class="admin-kpi-sparkline mt-1" viewBox="0 0 100 25" preserveAspectRatio="none">
              <path d="M0,22 Q20,18 40,14 T70,8 T100,2" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round"/>
              <path d="M0,22 Q20,18 40,14 T70,8 T100,2 L100,25 L0,25 Z" fill="rgba(16, 185, 129, 0.12)"/>
            </svg>
          </div>
        </div>

        <!-- Referral Bounties Ledger -->
        <div class="col-6 col-md-4 col-xl-2">
          <div class="admin-box admin-kpi-tile p-3">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <div class="admin-kpi-label">Referral Bounties</div>
              <i class="fa-solid fa-hand-holding-dollar text-warning fs-8"></i>
            </div>
            <div class="admin-kpi-num text-warning" id="admin-kpi-bounties">₹${stats.totalReferralPayouts || 0}</div>
            <div class="admin-kpi-caption mt-1 text-muted">₹199 per invite</div>
          </div>
        </div>

        <!-- Cloudflare Edge & Anti-Cheat -->
        <div class="col-6 col-md-4 col-xl-2">
          <div class="admin-box admin-kpi-tile p-3">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <div class="admin-kpi-label">Threat Defense</div>
              <i class="fa-solid fa-shield-virus text-info fs-8"></i>
            </div>
            <div class="admin-kpi-num text-info">ACTIVE</div>
            <div class="admin-kpi-caption mt-1 text-muted">Cloudflare WAF / Anti-Cheat</div>
          </div>
        </div>

        <!-- System Uptime / Cluster Health -->
        <div class="col-6 col-md-4 col-xl-2">
          <div class="admin-box admin-kpi-tile p-3">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <div class="admin-kpi-label">Cluster Uptime</div>
              <i class="fa-solid fa-server text-purple fs-8"></i>
            </div>
            <div class="admin-kpi-num text-purple">99.99%</div>
            <div class="admin-kpi-caption mt-1 text-muted">Zero Outages</div>
          </div>
        </div>
      </div>

      <!-- Categorized Domain Navigation Tabs -->
      <div class="admin-tab-bar mb-3" id="admin-tabs-nav">
        <!-- Domain 1: Analytics & Finance -->
        <div class="admin-domain-group">
          <span class="admin-domain-title"><i class="fa-solid fa-chart-pie me-1"></i>Analytics</span>
          <button class="admin-tab-btn active" id="tab-overview" onclick="loadAdminPanelTab('overview')">
            <i class="fa-solid fa-chart-line text-info me-1"></i> Overview
          </button>
          <button class="admin-tab-btn" id="tab-payments" onclick="loadAdminPanelTab('payments')">
            <i class="fa-solid fa-receipt text-emerald me-1"></i> Transactions
          </button>
          <button class="admin-tab-btn" id="tab-referrals" onclick="loadAdminPanelTab('referrals')">
            <i class="fa-solid fa-network-wired text-purple me-1"></i> Affiliates & Risk
          </button>
        </div>

        <!-- Domain 2: Candidates & Talent -->
        <div class="admin-domain-group">
          <span class="admin-domain-title"><i class="fa-solid fa-users me-1"></i>Talent</span>
          <button class="admin-tab-btn" id="tab-users" onclick="loadAdminPanelTab('users')">
            <i class="fa-solid fa-user-gear text-primary me-1"></i> Candidates
          </button>
          <button class="admin-tab-btn" id="tab-leaderboard" onclick="loadAdminPanelTab('leaderboard')">
            <i class="fa-solid fa-trophy text-warning me-1"></i> Leaderboard
          </button>
        </div>

        <!-- Domain 3: Curriculum & Content -->
        <div class="admin-domain-group">
          <span class="admin-domain-title"><i class="fa-solid fa-book-bookmark me-1"></i>Content</span>
          <button class="admin-tab-btn" id="tab-library" onclick="loadAdminPanelTab('library')">
            <i class="fa-solid fa-book-open text-primary me-1"></i> Library
          </button>
        </div>

        <!-- Domain 4: Operations & Security -->
        <div class="admin-domain-group">
          <span class="admin-domain-title"><i class="fa-solid fa-sliders me-1"></i>Operations</span>
          <button class="admin-tab-btn" id="tab-rules" onclick="loadAdminPanelTab('rules')">
            <i class="fa-solid fa-sliders text-warning me-1"></i> Rules & Flags
          </button>
          <button class="admin-tab-btn" id="tab-broadcast" onclick="loadAdminPanelTab('broadcast')">
            <i class="fa-solid fa-bullhorn text-danger me-1"></i> Communicator
          </button>
          <button class="admin-tab-btn" id="tab-audit-logs" onclick="loadAdminPanelTab('audit-logs')">
            <i class="fa-solid fa-shield-halved text-info me-1"></i> Audit Trail
          </button>
          <button class="admin-tab-btn" id="tab-health" onclick="loadAdminPanelTab('health')">
            <i class="fa-solid fa-server text-success me-1"></i> Infrastructure
          </button>
        </div>
      </div>

      <!-- Tab Content Area -->
      <div id="admin-tab-content">
        <!-- Injected Dynamically by loadAdminPanelTab -->
      </div>
    </div>

    <!-- Candidate Slide-Over Inspector Drawer & Backdrop -->
    <div id="admin-inspector-backdrop" class="admin-inspector-backdrop" onclick="closeAdminCandidateInspector()"></div>
    <div id="admin-candidate-inspector-drawer" class="admin-inspector-drawer">
      <div class="admin-inspector-header d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center gap-2">
          <span class="badge bg-primary px-2.5 py-1 fs-9"><i class="fa-solid fa-magnifying-glass-chart me-1"></i> Candidate Inspector</span>
          <span id="inspector-user-id" class="text-muted font-monospace fs-9">#--</span>
        </div>
        <button type="button" class="btn btn-sm btn-glass px-2 py-0.5 text-muted hover-text-white" onclick="closeAdminCandidateInspector()">
          <i class="fa-solid fa-xmark fs-7"></i>
        </button>
      </div>
      <div class="admin-inspector-body" id="admin-inspector-body-content">
        <!-- Injected Dynamically by openAdminCandidateInspector -->
      </div>
    </div>

    <!-- Admin Direct Email Compose Modal -->
    <div class="modal fade" id="adminEmailModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content admin-box">
          <div class="modal-header border-secondary border-opacity-25">
            <h6 class="modal-title text-white fw-bold"><i class="fa-solid fa-paper-plane text-primary me-2"></i>Send Direct Message to Candidate</h6>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <form id="admin-direct-email-modal-form">
            <div class="modal-body text-start">
              <div class="mb-3">
                <label class="form-label text-muted fs-8 uppercase">Recipient Candidate</label>
                <input type="text" id="modal-email-recipient-name" class="form-control admin-input mb-1" readonly>
                <input type="email" id="modal-email-recipient-email" class="form-control admin-input font-monospace fs-8" readonly>
              </div>
              <div class="mb-3">
                <label class="form-label text-muted fs-8 uppercase">Subject Line</label>
                <input type="text" id="modal-email-subject" class="form-control admin-input" placeholder="e.g. Action Required: Verification of Placement Credentials" required>
              </div>
              <div class="mb-3">
                <label class="form-label text-muted fs-8 uppercase">Official Message Content</label>
                <textarea id="modal-email-message" class="form-control admin-input" rows="4" placeholder="Type your personal message to this candidate..." required></textarea>
                <small class="text-muted fs-9">Dispatched with official PrepSpace signature from verify@stream-in.app</small>
              </div>
            </div>
            <div class="modal-footer border-secondary border-opacity-25">
              <button type="button" class="btn btn-glass" data-bs-dismiss="modal">Cancel</button>
              <button type="submit" class="btn btn-premium px-4" id="btn-modal-send-email"><i class="fa-solid fa-paper-plane me-1"></i> Send Official Email</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Admin Bulk Email Confirm Modal -->
    <div class="modal fade" id="adminBulkEmailConfirmModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content admin-box border border-warning border-opacity-50">
          <div class="modal-header border-secondary border-opacity-25">
            <h6 class="modal-title text-white fw-bold">
              <i class="fa-solid fa-triangle-exclamation text-warning me-2"></i>Confirm Bulk Email Broadcast
            </h6>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body text-start">
            <p class="text-white fs-8 mb-3">
              You are about to dispatch an official email broadcast to:
            </p>
            <div class="p-3 bg-dark bg-opacity-75 rounded border border-secondary border-opacity-25 mb-3">
              <div class="d-flex justify-content-between mb-1">
                <span class="text-muted fs-8">Target Audience:</span>
                <strong class="text-info fs-8" id="confirm-cohort-name">All Active Candidates</strong>
              </div>
              <div class="d-flex justify-content-between mb-1">
                <span class="text-muted fs-8">Total Recipients:</span>
                <strong class="text-emerald fs-8" id="confirm-recipient-count">0 candidates</strong>
              </div>
              <div class="d-flex justify-content-between mb-0">
                <span class="text-muted fs-8">Subject:</span>
                <span class="text-white fs-8 text-truncate ms-2 text-end" style="max-width: 240px;" id="confirm-email-subject">Subject</span>
              </div>
            </div>
            <div class="alert alert-warning py-2 fs-9 mb-0">
              <i class="fa-solid fa-circle-info me-1"></i>
              Emails are sent individually via <code>verify@stream-in.app</code> with personalized recipient greetings. This action cannot be undone.
            </div>
          </div>
          <div class="modal-footer border-secondary border-opacity-25">
            <button type="button" class="btn btn-glass btn-sm" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-premium btn-sm px-4" id="btn-confirm-start-broadcast">
              <i class="fa-solid fa-paper-plane me-1"></i> Confirm & Send Broadcast
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Admin Bulk Email Progress Modal -->
    <div class="modal fade" id="adminBulkEmailProgressModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content admin-box border border-primary border-opacity-25">
          <div class="modal-header border-0 pb-0">
            <h6 class="modal-title text-white fw-bold">
              <i class="fa-solid fa-paper-plane text-primary me-2"></i>Official Broadcast In Progress
            </h6>
          </div>
          <div class="modal-body py-4 text-center">
            <div class="mb-3">
              <div class="spinner-border text-primary mb-3" id="bulk-progress-spinner" role="status"></div>
              <div class="display-6 fw-bold text-white mb-1" id="bulk-progress-pct">0%</div>
              <div class="text-muted fs-8" id="bulk-progress-status">Preparing recipient queue...</div>
            </div>

            <!-- Progress bar -->
            <div class="progress mb-3 bg-secondary bg-opacity-15" style="height: 8px; border-radius: 9999px;">
              <div class="progress-bar progress-bar-striped progress-bar-animated" id="bulk-progress-bar" role="progressbar" style="width: 0%; background: linear-gradient(90deg, #6366f1, #8b5cf6);"></div>
            </div>

            <!-- Counters -->
            <div class="row g-2 text-center fs-8 pt-2 border-top border-secondary border-opacity-25">
              <div class="col-4">
                <span class="text-muted d-block fs-9 uppercase">Target Queue</span>
                <strong class="text-white fs-7" id="bulk-counter-total">0</strong>
              </div>
              <div class="col-4">
                <span class="text-muted d-block fs-9 uppercase">Dispatched</span>
                <strong class="text-emerald fs-7" id="bulk-counter-success">0</strong>
              </div>
              <div class="col-4">
                <span class="text-muted d-block fs-9 uppercase">Failed</span>
                <strong class="text-danger fs-7" id="bulk-counter-failed">0</strong>
              </div>
            </div>
          </div>
          <div class="modal-footer border-0 pt-0 justify-content-center">
            <button type="button" class="btn btn-sm btn-glass px-4 d-none" id="btn-close-bulk-progress" data-bs-dismiss="modal">
              Done & Close
            </button>
          </div>
        </div>
      </div>
    </div>
  `,

  premiumLock: (featureName) => `
    <div class="row justify-content-center align-items-center py-5">
      <div class="col-md-8 col-lg-6 text-center">
        <div class="glass-panel p-5">
          <div class="text-warning mb-3"><i class="fa-solid fa-lock display-4"></i></div>
          <span class="badge bg-warning bg-opacity-25 text-warning border border-warning-subtle px-3 py-1 rounded-pill mb-3 font-mono fs-8">PREPPRO EXCLUSIVE</span>
          <h4 class="text-white fw-bold mb-2">Unlock ${featureName}</h4>
          <p class="text-muted mb-4 fs-8">The <strong>${featureName}</strong> suite is exclusive to PrepPro members. Upgrade today to unlock full AI diagnostics, unlimited mock exams, and personalized guides.</p>
          
          <div class="bg-dark bg-opacity-50 p-3 rounded mb-4 text-start border border-secondary border-opacity-25 fs-8 text-muted">
            <h6 class="text-white fw-bold fs-8 mb-2"><i class="fa-solid fa-gem text-primary me-2"></i>Included with PrepPro (₹399 one-time):</h6>
            <ul class="list-unstyled m-0">
              <li class="mb-1"><i class="fa-solid fa-check text-success me-2"></i> Unlimited AI ATS Resume Compliance Audits</li>
              <li class="mb-1"><i class="fa-solid fa-check text-success me-2"></i> Custom AI Study Planner & Weak Topic Diagnostic</li>
              <li class="mb-1"><i class="fa-solid fa-check text-success me-2"></i> Company-Specific AI Interview Guide Generator</li>
              <li class="mb-1"><i class="fa-solid fa-check text-success me-2"></i> Export candidate progress logs as PDF / Excel</li>
              <li class="mb-1"><i class="fa-solid fa-check text-success me-2"></i> 50-MCQ Timed Proctored Assessment Suite</li>
            </ul>
          </div>

          <a href="#/billing" class="btn btn-premium w-100 py-3 fs-7 fw-bold"><i class="fa-solid fa-bolt me-1"></i> Upgrade to PrepPro for ₹399</a>
        </div>
      </div>
    </div>
  `,

  // PrepSpace Technical Library - 3D Bookshelf & Engineering Hub
  libraryHub: (catalog, progressMap, activeCategory, searchQuery, activeDifficulty, isProUser) => {
    const books = catalog || (window.PREPSPACE_LIBRARY ? window.PREPSPACE_LIBRARY.books : []);
    const categories = window.PREPSPACE_LIBRARY ? window.PREPSPACE_LIBRARY.categories : [];
    const pMap = progressMap || {};

    const getBookCoverTheme = (book) => {
      const cat = (book.category || '').toLowerCase();
      const title = (book.title || '').toLowerCase();
      
      if (cat.includes('advanced data') || cat.includes('advanced dsa') || title.includes('advanced data')) {
        return {
          bgGradient: 'linear-gradient(150deg, #064e3b 0%, #022c22 60%, #011812 100%)',
          accentColor: '#34d399',
          spineColor: '#04382a',
          badge: 'ADVANCED ALGORITHMS',
          icon: 'fa-solid fa-network-wired'
        };
      }
      if (cat.includes('data structures') || cat.includes('algorithm') || title.includes('data structures')) {
        return {
          bgGradient: 'linear-gradient(150deg, #1e1b4b 0%, #0f172a 60%, #090d16 100%)',
          accentColor: '#38bdf8',
          spineColor: '#16133a',
          badge: 'CORE FOUNDATIONS',
          icon: 'fa-solid fa-cubes-stacked'
        };
      }
      if (cat.includes('java') || title.includes('java')) {
        return {
          bgGradient: 'linear-gradient(150deg, #4c0519 0%, #2b030e 60%, #140106 100%)',
          accentColor: '#f43f5e',
          spineColor: '#3b0413',
          badge: 'ENTERPRISE JAVA',
          icon: 'fa-brands fa-java'
        };
      }
      if (cat.includes('python') || title.includes('python')) {
        return {
          bgGradient: 'linear-gradient(150deg, #3b0764 0%, #200438 60%, #0e021a 100%)',
          accentColor: '#c084fc',
          spineColor: '#2b054a',
          badge: 'PYTHON MASTERY',
          icon: 'fa-brands fa-python'
        };
      }
      if (cat.includes('c++') || cat.includes('modern c') || title.includes('c++')) {
        return {
          bgGradient: 'linear-gradient(150deg, #0f2744 0%, #081729 60%, #030a13 100%)',
          accentColor: '#60a5fa',
          spineColor: '#0a1d33',
          badge: 'SYSTEMS & C++',
          icon: 'fa-solid fa-microchip'
        };
      }
      if (cat.includes('javascript') || cat.includes('typescript') || title.includes('typescript') || title.includes('javascript')) {
        return {
          bgGradient: 'linear-gradient(150deg, #451a03 0%, #260e02 60%, #120601 100%)',
          accentColor: '#fbbf24',
          spineColor: '#331302',
          badge: 'JS & TYPESCRIPT',
          icon: 'fa-brands fa-js'
        };
      }
      if (cat.includes('react') || title.includes('react') || cat.includes('frontend') || title.includes('frontend')) {
        return {
          bgGradient: 'linear-gradient(150deg, #0e7490 0%, #064050 60%, #021e27 100%)',
          accentColor: '#22d3ee',
          spineColor: '#0a566b',
          badge: 'FRONTEND ARCHITECTURE',
          icon: 'fa-brands fa-react'
        };
      }
      if (cat.includes('backend') || cat.includes('api') || title.includes('backend')) {
        return {
          bgGradient: 'linear-gradient(150deg, #134e4a 0%, #092c2a 60%, #031615 100%)',
          accentColor: '#2dd4bf',
          spineColor: '#0d3835',
          badge: 'BACKEND & APIS',
          icon: 'fa-solid fa-server'
        };
      }
      if (cat.includes('database') || cat.includes('sql') || title.includes('database') || title.includes('sql')) {
        return {
          bgGradient: 'linear-gradient(150deg, #78350f 0%, #451d07 60%, #200d02 100%)',
          accentColor: '#fb923c',
          spineColor: '#59260a',
          badge: 'RDBMS & INDEXING',
          icon: 'fa-solid fa-database'
        };
      }
      if (cat.includes('operating') || cat.includes('os') || title.includes('operating')) {
        return {
          bgGradient: 'linear-gradient(150deg, #1e293b 0%, #0f172a 60%, #070a10 100%)',
          accentColor: '#94a3b8',
          spineColor: '#151e2c',
          badge: 'SYSTEM INTERNALS',
          icon: 'fa-solid fa-gears'
        };
      }
      if (cat.includes('network') || title.includes('network')) {
        return {
          bgGradient: 'linear-gradient(150deg, #1e3a8a 0%, #102257 60%, #070e26 100%)',
          accentColor: '#60a5fa',
          spineColor: '#152963',
          badge: 'NETWORKING & PROTOCOLS',
          icon: 'fa-solid fa-diagram-project'
        };
      }
      if (cat.includes('object-oriented') || cat.includes('design patterns') || cat.includes('oop') || title.includes('design pattern')) {
        return {
          bgGradient: 'linear-gradient(150deg, #2e1065 0%, #190838 60%, #0a0317 100%)',
          accentColor: '#c084fc',
          spineColor: '#200a47',
          badge: 'DESIGN PATTERNS',
          icon: 'fa-solid fa-sitemap'
        };
      }
      if (cat.includes('penetration') || cat.includes('ethical hacking') || title.includes('playbook') || title.includes('exploitation') || title.includes('ctf')) {
        return {
          bgGradient: 'linear-gradient(150deg, #831843 0%, #4c0519 60%, #140106 100%)',
          accentColor: '#f43f5e',
          spineColor: '#500724',
          badge: 'OFFENSIVE SECURITY & CTF',
          icon: 'fa-solid fa-user-secret'
        };
      }
      if (cat.includes('mobile security') || title.includes('android')) {
        return {
          bgGradient: 'linear-gradient(150deg, #064e3b 0%, #022c22 60%, #011812 100%)',
          accentColor: '#10b981',
          spineColor: '#032e22',
          badge: 'MOBILE & REVERSE ENG',
          icon: 'fa-brands fa-android'
        };
      }
      if (cat.includes('wireless') || cat.includes('wifi') || title.includes('wifi')) {
        return {
          bgGradient: 'linear-gradient(150deg, #0c4a6e 0%, #082f49 60%, #02131f 100%)',
          accentColor: '#38bdf8',
          spineColor: '#063652',
          badge: 'WIRELESS & RF DEFENSE',
          icon: 'fa-solid fa-wifi'
        };
      }
      if (cat.includes('cyber defense') || cat.includes('cyber security projects') || title.includes('projects')) {
        return {
          bgGradient: 'linear-gradient(150deg, #701a75 0%, #4a044e 60%, #1c021e 100%)',
          accentColor: '#ec4899',
          spineColor: '#530d57',
          badge: 'DEFENSE PROJECTS',
          icon: 'fa-solid fa-shield-halved'
        };
      }
      if (cat.includes('intelligence') || cat.includes('tradecraft') || title.includes('intelligence') || title.includes('guerrilla')) {
        return {
          bgGradient: 'linear-gradient(150deg, #1e1e24 0%, #0f172a 60%, #020617 100%)',
          accentColor: '#94a3b8',
          spineColor: '#141724',
          badge: 'THREAT INTEL & STRATEGY',
          icon: 'fa-solid fa-crosshairs'
        };
      }
      if (cat.includes('linux security') || title.includes('linux')) {
        return {
          bgGradient: 'linear-gradient(150deg, #3b0764 0%, #1e1b4b 60%, #08071a 100%)',
          accentColor: '#a855f7',
          spineColor: '#280545',
          badge: 'LINUX HARDENING',
          icon: 'fa-brands fa-linux'
        };
      }
      if (cat.includes('aptitude') || cat.includes('quantitative') || cat.includes('logical') || cat.includes('verbal') || title.includes('aptitude') || title.includes('reasoning')) {
        return {
          bgGradient: 'linear-gradient(150deg, #1f2937 0%, #111827 60%, #090d14 100%)',
          accentColor: '#38bdf8',
          spineColor: '#161e29',
          badge: 'PLACEMENT APTITUDE',
          icon: 'fa-solid fa-brain'
        };
      }
      return {
        bgGradient: 'linear-gradient(150deg, #27272a 0%, #18181b 60%, #09090b 100%)',
        accentColor: '#fbbf24',
        spineColor: '#1c1c1f',
        badge: 'MASTER HANDBOOK',
        icon: 'fa-solid fa-book-bookmark'
      };
    };

    // Filter books
    let filtered = books.filter(b => {
      if (activeCategory && activeCategory !== 'ALL') {
        if (activeCategory === 'FREE') {
          if (b.isPro) return false;
        } else if (activeCategory === 'PRO') {
          if (!b.isPro) return false;
        } else if (b.category !== activeCategory) {
          return false;
        }
      }
      if (activeDifficulty && activeDifficulty !== 'ALL' && b.difficulty !== activeDifficulty) return false;
      if (searchQuery && searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = b.title.toLowerCase().includes(q);
        const matchesDesc = b.description && b.description.toLowerCase().includes(q);
        const matchesAuthor = b.author && b.author.toLowerCase().includes(q);
        const matchesCat = b.category && b.category.toLowerCase().includes(q);
        const matchesTags = b.tags && b.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDesc && !matchesAuthor && !matchesCat && !matchesTags) return false;
      }
      return true;
    });

    // Check for any active reading progress to show Resume banner
    let activeProgressBook = null;
    let activeProgressVal = null;
    for (const b of books) {
      if (pMap[b.id] && pMap[b.id].progressPercentage > 0 && pMap[b.id].progressPercentage < 100) {
        activeProgressBook = b;
        activeProgressVal = pMap[b.id];
        break;
      }
    }

    return `
      <div class="technical-library-container container-fluid px-0">
        <!-- 1. Compact Library Control Deck -->
        <div class="d-flex flex-wrap align-items-center justify-content-between gap-2.5 mb-2.5 pb-2.5 border-bottom border-secondary border-opacity-20">
          <!-- Search & Filters -->
          <div class="d-flex flex-wrap align-items-center gap-2 flex-grow-1" style="max-width: 680px;">
            <div class="input-group input-group-sm flex-grow-1" style="min-width: 200px; max-width: 340px;">
              <span class="input-group-text bg-black bg-opacity-40 border-secondary border-opacity-25 text-muted px-2.5"><i class="fa-solid fa-magnifying-glass fs-9"></i></span>
              <input type="text" id="library-search-input" class="form-control bg-black bg-opacity-40 text-white border-secondary border-opacity-25 fs-8 py-1" placeholder="Search handbooks, topics..." value="${searchQuery || ''}">
              ${searchQuery ? '<button id="btn-clear-library-search" class="btn btn-sm btn-outline-secondary border-opacity-25 text-muted px-2" type="button"><i class="fa-solid fa-xmark fs-9"></i></button>' : ''}
            </div>
            <select id="library-difficulty-select" class="form-select form-select-sm bg-black bg-opacity-40 text-white border-secondary border-opacity-25 fs-8 py-1" style="width: auto; min-width: 130px;">
              <option value="ALL" ${!activeDifficulty || activeDifficulty === 'ALL' ? 'selected' : ''}>All Levels</option>
              <option value="BEGINNER" ${activeDifficulty === 'BEGINNER' ? 'selected' : ''}>Beginner</option>
              <option value="INTERMEDIATE" ${activeDifficulty === 'INTERMEDIATE' ? 'selected' : ''}>Intermediate</option>
              <option value="ADVANCED" ${activeDifficulty === 'ADVANCED' ? 'selected' : ''}>Advanced</option>
            </select>
            <div class="btn-group btn-group-sm" role="group">
              <button type="button" class="btn btn-sm ${!activeCategory || activeCategory === 'ALL' ? 'btn-primary' : 'btn-glass'} px-2.5 py-1 fs-9 fw-medium" id="btn-filter-all-cat">All</button>
              <button type="button" class="btn btn-sm ${activeCategory === 'FREE' ? 'btn-primary' : 'btn-glass'} px-2.5 py-1 fs-9 fw-medium" id="btn-filter-free">Free</button>
              <button type="button" class="btn btn-sm ${activeCategory === 'PRO' ? 'btn-primary' : 'btn-glass'} px-2.5 py-1 fs-9 fw-medium" id="btn-filter-pro">Pro</button>
            </div>
          </div>

          <div class="d-flex align-items-center gap-2 flex-shrink-0">
            <span class="text-muted fs-8 font-monospace">${filtered.length} Handbooks</span>
            ${isProUser 
              ? '<span class="badge bg-primary bg-opacity-15 text-primary border border-primary border-opacity-20 px-2 py-1 fs-9 font-monospace"><i class="fa-solid fa-crown me-1"></i>PRO PASS</span>' 
              : '<a href="#/billing" class="btn btn-xs btn-primary px-2.5 py-1 fs-9 fw-semibold"><i class="fa-solid fa-gem me-1"></i>Get Pro</a>'}
          </div>
        </div>

        ${activeProgressBook ? `
          <!-- Jump Back In / Resume Banner -->
          <div class="ps-panel-box p-2.5 mb-2.5 d-flex flex-wrap justify-content-between align-items-center gap-2" style="border-left: 3px solid #f59e0b !important;">
            <div class="d-flex align-items-center gap-2.5">
              <div class="rounded-2 p-2 d-flex align-items-center justify-content-center text-white" style="background: #27272a; width: 36px; height: 36px; border: 1px solid #3f3f46;">
                <i class="fa-solid fa-book-open text-primary fs-7"></i>
              </div>
              <div>
                <div class="text-muted fs-10 text-uppercase font-monospace">Resume Reading</div>
                <h3 class="text-white fw-semibold mb-0 fs-7">${activeProgressBook.title}</h3>
              </div>
            </div>
            <div class="d-flex align-items-center gap-2.5">
              <div class="d-none d-sm-block text-end" style="min-width: 90px;">
                <div class="progress bg-secondary bg-opacity-25" style="height: 4px;">
                  <div class="progress-bar bg-primary" style="width: ${activeProgressVal.progressPercentage || 0}%;"></div>
                </div>
              </div>
              <a href="#/library/read?id=${activeProgressBook.id}&ch=${activeProgressVal.lastChapterNumber || 1}" class="btn btn-primary btn-xs px-2.5 py-1 fs-9 fw-semibold d-inline-flex align-items-center gap-1">
                <span>Continue</span>
                <i class="fa-solid fa-arrow-right fs-10"></i>
              </a>
            </div>
          </div>
        ` : ''}

        <!-- 2. Category Filter Pills -->
        <div class="library-categories-wrapper position-relative d-flex align-items-center mb-3">
          <button id="btn-scroll-cats-left" class="btn btn-xs btn-glass px-1.5 me-1" type="button" title="Previous Categories" aria-label="Previous Categories" style="height: 26px; width: 26px; padding: 0;">
            <i class="fa-solid fa-chevron-left fs-10"></i>
          </button>
          <div id="library-categories-scroller" class="library-categories-scroller d-flex gap-1 overflow-x-auto flex-grow-1 py-0.5" style="scrollbar-width: none; -ms-overflow-style: none;">
            <button class="btn btn-xs ${!activeCategory || activeCategory === 'ALL' ? 'btn-primary' : 'btn-glass'} text-nowrap rounded-2 px-2.5 py-1 fs-9 library-cat-pill" data-category="ALL">
              All Books
            </button>
            ${categories.map(cat => `
              <button class="btn btn-xs ${activeCategory === cat.name ? 'btn-primary' : 'btn-glass'} text-nowrap rounded-2 px-2.5 py-1 fs-9 library-cat-pill" data-category="${cat.name}">
                ${cat.name}
              </button>
            `).join('')}
          </div>
          <button id="btn-scroll-cats-right" class="btn btn-xs btn-glass px-1.5 ms-1" type="button" title="Next Categories" aria-label="Next Categories" style="height: 26px; width: 26px; padding: 0;">
            <i class="fa-solid fa-chevron-right fs-10"></i>
          </button>
        </div>

        <!-- 4. 3D Digital Bookshelf Grid -->
        <div class="ps-bookshelf-container">
          ${filtered.length === 0 ? `
            <div class="text-center py-5">
              <div class="ps-panel-box p-5">
                <i class="fa-solid fa-book-open text-muted fs-1 mb-3"></i>
                <h3 class="text-white fw-bold fs-6">No handbooks found matching your criteria</h3>
                <p class="text-muted fs-8 mb-3">Try adjusting your search keywords or resetting category filters.</p>
                <button id="btn-reset-library-filters" class="btn btn-primary btn-sm px-4">Reset All Filters</button>
              </div>
            </div>
          ` : `
            <div class="ps-bookshelf-row-wrapper">
              <div class="ps-bookshelf-grid">
                ${filtered.map(book => {
                  const userProg = pMap[book.id];
                  const percent = userProg ? userProg.progressPercentage : 0;
                  const isCompleted = userProg && userProg.isCompleted;
                  const theme = getBookCoverTheme(book);
                  const lastCh = userProg && userProg.lastChapterNumber ? userProg.lastChapterNumber : 1;

                  return `
                    <div class="ps-book-item-3d" data-book-id="${book.id}">
                      <div class="ps-book-3d-card" onclick="window.location.hash='#/library/read?id=${book.id}&ch=${lastCh}'" role="button" tabindex="0" title="Click to Open ${book.title}" aria-label="Open Book: ${book.title}">
                        <!-- Silk Bookmark Ribbon -->
                        <div class="ps-book-ribbon" style="background: ${theme.accentColor};"></div>
                        
                        <!-- Spine Crease Lighting Effect -->
                        <div class="ps-book-spine-crease"></div>

                        <!-- Background Subject Emblem -->
                        <div class="ps-book-emblem"><i class="${theme.icon}"></i></div>

                        <!-- Hardcover Face -->
                        <div class="ps-book-cover-inner" style="background: ${theme.bgGradient}; border-left-color: ${theme.spineColor};">
                          <!-- Header Badge -->
                          <div>
                            <div class="ps-book-header-badge">
                              <span style="color: ${theme.accentColor};"><i class="${theme.icon} me-1"></i> ${theme.badge}</span>
                              ${book.isPro 
                                ? '<span class="badge bg-warning bg-opacity-25 text-warning border border-warning border-opacity-30 fs-9 px-1.5 py-0.5">PRO</span>' 
                                : '<span class="badge bg-success bg-opacity-25 text-success border border-success border-opacity-30 fs-9 px-1.5 py-0.5">FREE</span>'}
                            </div>

                            <!-- Book Title & Subtitle -->
                            <h3 class="ps-book-title">${book.title}</h3>
                            <p class="ps-book-subtitle">${book.subtitle || book.description}</p>
                          </div>

                          <!-- Footer Info -->
                          <div class="ps-book-footer-info">
                            <div class="d-flex justify-content-between align-items-center mb-1">
                              <div class="ps-book-author">PrepSpace Master Series</div>
                              <div class="text-white fs-9 font-monospace"><i class="fa-solid fa-star text-warning me-1"></i>${book.rating || '4.95'}</div>
                            </div>
                            <div class="ps-book-meta-row">
                              <span>${book.chapters ? book.chapters.length : 8} Chapters &bull; ${book.pageCount || 310} pgs</span>
                              <span><i class="fa-regular fa-clock me-1"></i>${(book.estimatedReadingTime || '6h').replace(/ Hours?/i, 'h')}</span>
                            </div>

                            ${percent > 0 ? `
                              <div class="ps-book-progress-wrap">
                                <div class="ps-book-progress-fill ${isCompleted ? 'bg-success' : 'bg-primary'}" style="width: ${percent}%;"></div>
                              </div>
                              <div class="d-flex justify-content-between align-items-center text-muted fs-9 font-monospace mt-1">
                                <span>Progress</span>
                                <span class="text-white">${percent}%</span>
                              </div>
                            ` : ''}
                          </div>
                        </div>

                        <!-- Hover Action Overlay -->
                        <div class="ps-book-hover-action">
                          <button class="btn btn-primary btn-sm w-100 py-2 fs-8 fw-semibold d-flex align-items-center justify-content-center gap-1.5 shadow" onclick="event.stopPropagation(); window.location.hash='#/library/read?id=${book.id}&ch=${lastCh}';">
                            <i class="fa-solid fa-book-open"></i>
                            <span>${percent > 0 ? 'Continue Reading' : 'Open & Read Book'}</span>
                          </button>
                          <button class="btn btn-glass btn-sm w-100 py-1.5 fs-8 text-white d-flex align-items-center justify-content-center gap-1.5" onclick="event.stopPropagation(); window.location.hash='#/library/book?id=${book.id}';">
                            <i class="fa-solid fa-list-ul text-warning"></i>
                            <span>Table of Contents</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
              <div class="ps-bookshelf-ledge"></div>
            </div>
          `}
        </div>
      </div>
    `;
  },

  // PrepSpace Technical Library - Book Details & Syllabus View
  bookDetails: (book, progress, isProUser) => {
    if (!book) {
      return `
        <div class="container-fluid py-5 text-center">
          <div class="alert alert-danger d-inline-block">Book not found. <a href="#/library" class="text-white fw-bold">Return to Library</a></div>
        </div>
      `;
    }

    const chapters = book.chapters || [];
    const percent = progress ? progress.progressPercentage : 0;
    const canAccessAll = isProUser || !book.isPro;

    const cat = (book.category || '').toLowerCase();
    const title = (book.title || '').toLowerCase();
    let theme = {
      bgGradient: 'linear-gradient(150deg, #1e1b4b 0%, #0f172a 60%, #090d16 100%)',
      accentColor: '#38bdf8',
      spineColor: '#16133a',
      badge: 'PREPSPACE MASTER SERIES',
      icon: 'fa-solid fa-book-bookmark'
    };
    if (cat.includes('advanced data') || cat.includes('advanced dsa')) {
      theme = { bgGradient: 'linear-gradient(150deg, #064e3b 0%, #022c22 60%, #011812 100%)', accentColor: '#34d399', spineColor: '#04382a', badge: 'ADVANCED ALGORITHMS', icon: 'fa-solid fa-network-wired' };
    } else if (cat.includes('java')) {
      theme = { bgGradient: 'linear-gradient(150deg, #4c0519 0%, #2b030e 60%, #140106 100%)', accentColor: '#f43f5e', spineColor: '#3b0413', badge: 'ENTERPRISE JAVA', icon: 'fa-brands fa-java' };
    } else if (cat.includes('python')) {
      theme = { bgGradient: 'linear-gradient(150deg, #3b0764 0%, #200438 60%, #0e021a 100%)', accentColor: '#c084fc', spineColor: '#2b054a', badge: 'PYTHON MASTERY', icon: 'fa-brands fa-python' };
    } else if (cat.includes('database') || cat.includes('sql')) {
      theme = { bgGradient: 'linear-gradient(150deg, #78350f 0%, #451d07 60%, #200d02 100%)', accentColor: '#fb923c', spineColor: '#59260a', badge: 'RDBMS & INDEXING', icon: 'fa-solid fa-database' };
    } else if (cat.includes('react') || cat.includes('frontend')) {
      theme = { bgGradient: 'linear-gradient(150deg, #0e7490 0%, #064050 60%, #021e27 100%)', accentColor: '#22d3ee', spineColor: '#0a566b', badge: 'FRONTEND ARCHITECTURE', icon: 'fa-brands fa-react' };
    } else if (cat.includes('penetration') || cat.includes('ethical hacking') || title.includes('playbook') || title.includes('exploitation') || title.includes('ctf')) {
      theme = { bgGradient: 'linear-gradient(150deg, #831843 0%, #4c0519 60%, #140106 100%)', accentColor: '#f43f5e', spineColor: '#500724', badge: 'OFFENSIVE SECURITY & CTF', icon: 'fa-solid fa-user-secret' };
    } else if (cat.includes('mobile security') || title.includes('android')) {
      theme = { bgGradient: 'linear-gradient(150deg, #064e3b 0%, #022c22 60%, #011812 100%)', accentColor: '#10b981', spineColor: '#032e22', badge: 'MOBILE & REVERSE ENG', icon: 'fa-brands fa-android' };
    } else if (cat.includes('wireless') || cat.includes('wifi') || title.includes('wifi')) {
      theme = { bgGradient: 'linear-gradient(150deg, #0c4a6e 0%, #082f49 60%, #02131f 100%)', accentColor: '#38bdf8', spineColor: '#063652', badge: 'WIRELESS & RF DEFENSE', icon: 'fa-solid fa-wifi' };
    } else if (cat.includes('cyber defense') || cat.includes('cyber security projects') || title.includes('projects')) {
      theme = { bgGradient: 'linear-gradient(150deg, #701a75 0%, #4a044e 60%, #1c021e 100%)', accentColor: '#ec4899', spineColor: '#530d57', badge: 'DEFENSE PROJECTS', icon: 'fa-solid fa-shield-halved' };
    } else if (cat.includes('intelligence') || cat.includes('tradecraft') || title.includes('intelligence') || title.includes('guerrilla')) {
      theme = { bgGradient: 'linear-gradient(150deg, #1e1e24 0%, #0f172a 60%, #020617 100%)', accentColor: '#94a3b8', spineColor: '#141724', badge: 'THREAT INTEL & STRATEGY', icon: 'fa-solid fa-crosshairs' };
    } else if (cat.includes('linux security') || title.includes('linux')) {
      theme = { bgGradient: 'linear-gradient(150deg, #3b0764 0%, #1e1b4b 60%, #08071a 100%)', accentColor: '#a855f7', spineColor: '#280545', badge: 'LINUX HARDENING', icon: 'fa-brands fa-linux' };
    }

    return `
      <div class="technical-library-book-details container-fluid px-0">
        <!-- Breadcrumbs -->
        <nav aria-label="breadcrumb" class="mb-3">
          <ol class="breadcrumb fs-8 mb-0">
            <li class="breadcrumb-item"><a href="#/library" class="text-muted text-decoration-none"><i class="fa-solid fa-arrow-left me-1"></i> Technical Library</a></li>
            <li class="breadcrumb-item text-muted">${book.category}</li>
            <li class="breadcrumb-item active text-white" aria-current="page">${book.title}</li>
          </ol>
        </nav>

        <!-- Book Header Banner -->
        <div class="ps-panel-box p-4 p-md-5 mb-4">
          <div class="row g-4 align-items-center">
            <!-- 3D Realistic Book Cover Tile -->
            <div class="col-12 col-md-4 col-lg-3 text-center">
              <div class="ps-book-item-3d">
                <div class="ps-book-3d-detail position-relative" style="cursor: pointer;" onclick="window.location.hash='#/library/read?id=${book.id}&ch=${progress ? (progress.lastChapterNumber || 1) : 1}'" title="Click to Open ${book.title}">
                  <!-- Silk Ribbon Bookmark -->
                  <div class="ps-book-ribbon" style="background: ${theme.accentColor};"></div>
                  <!-- Spine Crease -->
                  <div class="ps-book-spine-crease"></div>
                  <!-- Background Emblem -->
                  <div class="ps-book-emblem"><i class="${theme.icon}"></i></div>
                  
                  <!-- Hardcover Face -->
                  <div class="ps-book-cover-inner" style="background: ${theme.bgGradient}; border-left-color: ${theme.spineColor};">
                    <div>
                      <div class="ps-book-header-badge">
                        <span style="color: ${theme.accentColor};"><i class="${theme.icon} me-1"></i> ${theme.badge}</span>
                        ${book.isPro 
                          ? '<span class="badge bg-warning bg-opacity-25 text-warning border border-warning border-opacity-30 fs-9 px-1.5 py-0.5">PRO</span>' 
                          : '<span class="badge bg-success bg-opacity-25 text-success border border-success border-opacity-30 fs-9 px-1.5 py-0.5">FREE</span>'}
                      </div>
                      <h4 class="ps-book-title fs-6">${book.title}</h4>
                      <p class="ps-book-subtitle">${book.subtitle || book.description}</p>
                    </div>
                    <div class="ps-book-footer-info">
                      <div class="ps-book-author text-truncate" title="${book.author || 'PrepSpace Master Series'}">${book.author || 'PrepSpace Master Series'}</div>
                      <div class="ps-book-meta-row">
                        <span>${chapters.length} Chapters &bull; ${book.pageCount || 120} pgs</span>
                        <span>★ ${book.rating || 4.95}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Book Metadata & Description -->
            <div class="col-12 col-md-8 col-lg-9">
              <div class="d-flex flex-wrap align-items-center gap-2 mb-2">
                <span class="badge bg-secondary bg-opacity-25 text-white border border-secondary border-opacity-30 fs-9">${book.difficulty}</span>
                <span class="badge bg-dark border border-secondary border-opacity-30 text-warning fs-9"><i class="fa-solid fa-star me-1"></i> ${book.rating || 4.9} Rating</span>
                <span class="badge bg-dark border border-secondary border-opacity-30 text-muted fs-9"><i class="fa-regular fa-clock me-1"></i> ${book.estimatedReadingTime || '6 Hours'}</span>
                <span class="badge bg-dark border border-secondary border-opacity-30 text-muted fs-9"><i class="fa-regular fa-file-lines me-1"></i> ${book.pageCount || 120} Pages</span>
                <span class="badge bg-dark border border-secondary border-opacity-30 text-muted fs-9"><i class="fa-solid fa-certificate me-1 text-success"></i> ${book.licenseType || 'ORIGINAL'} LICENSE</span>
              </div>

              <h2 class="text-white fw-bold mb-2 fs-4">${book.title}</h2>
              <p class="text-secondary fs-7 mb-2">${book.subtitle || ''}</p>
              <p class="text-muted fs-8 mb-3" style="line-height: 1.6;">${book.description}</p>

              <div class="d-flex flex-wrap gap-1 mb-4">
                ${(book.tags || []).map(tag => `
                  <span class="badge bg-secondary bg-opacity-20 text-secondary border border-secondary border-opacity-25 fs-9 px-2 py-1">${tag}</span>
                `).join('')}
              </div>

              <!-- Primary CTA Row -->
              <div class="d-flex flex-wrap align-items-center gap-3">
                <a href="#/library/read?id=${book.id}&ch=${progress ? (progress.lastChapterNumber || 1) : 1}" class="btn btn-primary px-4 py-2 fs-7 fw-semibold">
                  <i class="fa-solid fa-play me-2"></i> ${percent > 0 ? `Resume at Chapter ${progress.lastChapterNumber || 1}` : 'Start Reading Online'}
                </a>
                ${book.downloadUrl ? `
                  <a href="${book.downloadUrl}" download="${book.downloadUrl.split('/').pop()}" class="btn btn-outline-info px-4 py-2 fs-7 fw-semibold d-inline-flex align-items-center gap-2" target="_blank" rel="noopener noreferrer">
                    <i class="fa-solid fa-file-pdf text-danger fs-6"></i>
                    <span>Download PDF (${book.fileSize || 'PDF'})</span>
                  </a>
                ` : ''}
                ${!canAccessAll ? `
                  <a href="#/billing" class="btn btn-glass text-warning border-warning border-opacity-30 px-4 py-2 fs-7 fw-semibold">
                    <i class="fa-solid fa-gem me-2"></i> Unlock All Chapters with Pro
                  </a>
                ` : ''}
              </div>

              <div class="mt-3 text-muted fs-9">
                ${book.copyrightNotice || '© 2026 PrepSpace (stream-in.app). All rights reserved.'}
              </div>
            </div>
          </div>
        </div>

        <!-- Table of Contents Section -->
        <div class="ps-panel-box p-4 mb-4">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h3 class="text-white fw-bold mb-0 fs-6">Complete Curriculum & Chapters</h3>
              <div class="text-muted fs-8">Step-by-step textbook chapters covering all core concepts</div>
            </div>
            <span class="badge bg-secondary bg-opacity-25 text-white fs-8">${chapters.length} Chapters</span>
          </div>

          <div class="list-group list-group-flush border-top border-secondary border-opacity-20">
            ${chapters.map((ch, idx) => {
              const isLocked = !canAccessAll && !ch.isFreePreview;

              return `
                <div class="list-group-item bg-transparent border-secondary border-opacity-15 px-0 py-3 d-flex flex-wrap justify-content-between align-items-center gap-3">
                  <div class="d-flex align-items-start gap-3 col-12 col-md-8">
                    <div class="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold fs-8 flex-shrink-0" style="width: 32px; height: 32px; background: #27272a; border: 1px solid #3f3f46;">
                      ${ch.chapterNumber || (idx + 1)}
                    </div>
                    <div>
                      <div class="d-flex align-items-center gap-2 mb-0.5">
                        <h4 class="text-white fw-bold mb-0 fs-7">${ch.title}</h4>
                        ${ch.isFreePreview ? '<span class="badge bg-success bg-opacity-20 text-success border border-success border-opacity-30 fs-9 py-0.5">FREE PREVIEW</span>' : (isLocked ? '<span class="badge bg-warning bg-opacity-20 text-warning border border-warning border-opacity-30 fs-9 py-0.5"><i class="fa-solid fa-lock me-1"></i> PRO</span>' : '<span class="badge bg-secondary bg-opacity-25 text-light fs-9 py-0.5">UNLOCKED</span>')}
                      </div>
                      <p class="text-muted fs-8 mb-1">${ch.subtitle || ch.summary}</p>
                      <div class="text-muted fs-9"><i class="fa-regular fa-clock me-1"></i> ${ch.readingTimeMinutes || 20} mins reading time</div>
                    </div>
                  </div>

                  <div class="d-flex align-items-center gap-2 ms-auto ms-md-0">
                    ${isLocked ? `
                      <a href="#/billing" class="btn btn-glass btn-sm text-warning border-warning border-opacity-30 fs-8">
                        <i class="fa-solid fa-lock me-1"></i> Unlock with Pro
                      </a>
                    ` : `
                      <a href="#/library/read?id=${book.id}&ch=${ch.chapterNumber || (idx + 1)}" class="btn btn-outline-primary btn-sm fs-8 px-3">
                        <i class="fa-solid fa-book-open me-1"></i> Read Chapter
                      </a>
                    `}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  },

  // PrepSpace Technical Library - Interactive Digital Reader
  bookReader: (book, chapter, allChapters, progress, bookmarks, isProUser) => {
    if (!book || !chapter) {
      return `
        <div class="container-fluid py-5 text-center">
          <div class="alert alert-danger d-inline-block">Chapter not found. <a href="#/library" class="text-white fw-bold">Return to Library</a></div>
        </div>
      `;
    }

    const chapters = allChapters || book.chapters || [];
    const chIndex = chapters.findIndex(c => c.id === chapter.id || c.chapterNumber === chapter.chapterNumber);
    const prevChapter = chIndex > 0 ? chapters[chIndex - 1] : null;
    const nextChapter = chIndex < chapters.length - 1 ? chapters[chIndex + 1] : null;
    const isLocked = book.isPro && !chapter.isFreePreview && !isProUser;

    return `
      <div class="technical-reader-wrapper d-flex flex-column min-vh-100" id="reader-container">
        <!-- Top Reading Progress Bar -->
        <div class="reader-scroll-progress-bar" id="reader-scroll-bar" style="width: 0%;"></div>

        <!-- Sticky Reader Control Navbar (Single-Line Unified Layout) -->
        <header class="reader-navbar px-3 py-2 border-bottom border-secondary border-opacity-25 d-flex justify-content-between align-items-center sticky-top flex-nowrap gap-2" style="min-height: 52px;">
          <!-- Left: Compact Navigation & Drawer Toggle (Symbolic Buttons) -->
          <div class="d-flex align-items-center gap-2 flex-shrink-0" style="max-width: 320px;">
            <a href="#/library" class="reader-tool-btn flex-shrink-0" title="Back to Technical Library">
              <i class="fa-solid fa-arrow-left"></i>
            </a>
            <button id="btn-toggle-toc-drawer" class="reader-tool-btn flex-shrink-0" title="Toggle Table of Contents">
              <i class="fa-solid fa-bars-staggered"></i>
            </button>
            <div class="vr d-none d-sm-block my-1 bg-secondary opacity-50 flex-shrink-0" style="height: 20px;"></div>
            <div class="d-none d-lg-block text-truncate" style="max-width: 200px;">
              <span class="text-white fw-semibold fs-8 text-truncate d-block" title="${book.title}">${book.title}</span>
            </div>
          </div>

          <!-- Center: Real Chapter & Page Pagination Metrics (Never wraps) -->
          <div class="reader-page-counter font-monospace text-white px-3 py-1 rounded-pill bg-dark border border-secondary border-opacity-50 d-none d-md-flex align-items-center gap-2 text-nowrap flex-shrink-0" style="white-space: nowrap; height: 32px; font-size: 0.78rem;">
            <i class="fa-solid fa-book-open text-warning fs-9 flex-shrink-0"></i>
            <span class="text-nowrap">Ch ${chapter.chapterNumber} of ${chapters.length}</span>
            <span class="text-secondary opacity-50">&bull;</span>
            <span class="text-info text-nowrap">Pages ${((chapter.chapterNumber - 1) * Math.round(book.pageCount / chapters.length)) + 1}–${Math.min(book.pageCount, chapter.chapterNumber * Math.round(book.pageCount / chapters.length))} of ${book.pageCount}</span>
          </div>

          <!-- Right: Reader Display Controls & Integrated User Account Menu -->
          <div class="d-flex align-items-center gap-1.5 flex-shrink-0">
            <!-- Zen Focus Mode -->
            <button id="btn-reader-focus" class="reader-tool-btn flex-shrink-0" title="Zen Focus Mode (Collapse Sidebar)">
              <i class="fa-solid fa-expand text-info"></i>
            </button>

            <!-- Bookmark Button -->
            <button id="btn-add-bookmark" class="reader-tool-btn flex-shrink-0" title="${(bookmarks || []).some(b => b.chapterNumber === chapter.chapterNumber) ? 'Remove Bookmark' : 'Save Bookmark'}" data-bookmarked="${(bookmarks || []).some(b => b.chapterNumber === chapter.chapterNumber) ? 'true' : 'false'}">
              <i class="${(bookmarks || []).some(b => b.chapterNumber === chapter.chapterNumber) ? 'fa-solid fa-bookmark text-warning' : 'fa-regular fa-bookmark text-muted'}"></i>
            </button>

            <!-- Font Size Adjusters (Unified 36px Buttons) -->
            <button id="btn-font-decrease" class="reader-tool-btn font-btn flex-shrink-0" title="Decrease Font Size">A-</button>
            <button id="btn-font-increase" class="reader-tool-btn font-btn flex-shrink-0" title="Increase Font Size">A+</button>

            <!-- Book Typography Style (Serif / Sans) -->
            <button id="btn-toggle-font-family" class="reader-tool-btn flex-shrink-0" title="Toggle Book Serif Typography">
              <i class="fa-solid fa-font"></i>
            </button>

            <!-- Print / PDF Export -->
            <button id="btn-reader-print" class="reader-tool-btn flex-shrink-0 d-none d-sm-inline-flex" title="Print Chapter / Save as PDF">
              <i class="fa-solid fa-print"></i>
            </button>

            ${book.downloadUrl ? `
              <!-- Download Original PDF -->
              <a href="${book.downloadUrl}" download="${book.downloadUrl.split('/').pop()}" class="reader-tool-btn flex-shrink-0 text-info d-inline-flex align-items-center justify-content-center" title="Download Full PDF Edition (${book.fileSize || 'PDF'})" target="_blank" rel="noopener noreferrer">
                <i class="fa-solid fa-download"></i>
              </a>
            ` : ''}

            <!-- Reader Theme Selector -->
            <div class="dropdown d-inline-block flex-shrink-0">
              <button class="reader-tool-btn dropdown-toggle no-caret" type="button" data-bs-toggle="dropdown" title="Reader Color Themes">
                <i class="fa-solid fa-palette text-warning"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end shadow">
                <li><button class="dropdown-item fs-8 active" data-reader-theme="theme-dark"><i class="fa-solid fa-moon me-2 text-primary"></i> Dark (Default)</button></li>
                <li><button class="dropdown-item fs-8" data-reader-theme="theme-sepia"><i class="fa-solid fa-book me-2 text-warning"></i> Sepia Paper</button></li>
                <li><button class="dropdown-item fs-8" data-reader-theme="theme-paper"><i class="fa-solid fa-sun me-2 text-light"></i> Clean Paper</button></li>
                <li><button class="dropdown-item fs-8" data-reader-theme="theme-night"><i class="fa-solid fa-terminal me-2 text-success"></i> Deep Night</button></li>
              </ul>
            </div>

            <!-- Integrated Account Menu (Prevents overlapping outer topbar) -->
            <div class="vr d-none d-sm-block my-1 bg-secondary opacity-25 flex-shrink-0" style="height: 20px;"></div>
            <div class="dropdown d-inline-block flex-shrink-0">
              <button class="reader-tool-btn dropdown-toggle no-caret" type="button" id="readerUserDropdown" data-bs-toggle="dropdown" title="Account Menu">
                <i class="fa-solid fa-circle-user text-secondary"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end shadow glass-panel" aria-labelledby="readerUserDropdown">
                <li class="px-3 py-1.5 border-bottom border-secondary border-opacity-25 mb-1">
                  <div class="fs-9 text-muted font-monospace">SIGNED IN AS</div>
                  <div class="fw-bold text-white fs-8 text-truncate" style="max-width: 170px;">${(typeof state !== 'undefined' && state.name) ? state.name : 'Candidate'}</div>
                </li>
                <li><a class="dropdown-item fs-8 text-white" href="#/profile"><i class="fa-solid fa-gear me-2 text-secondary"></i>Settings</a></li>
                <li><a class="dropdown-item fs-8 text-warning" href="#/billing"><i class="fa-solid fa-gem me-2"></i>Membership</a></li>
                <li><hr class="dropdown-divider border-secondary border-opacity-25 my-1"></li>
                <li><button class="dropdown-item fs-8 text-danger" onclick="if(window.logout) window.logout(); else { localStorage.clear(); window.location.hash = '#/login'; }"><i class="fa-solid fa-right-from-bracket me-2"></i>Logout</button></li>
              </ul>
            </div>
          </div>
        </header>

        <!-- Reader Workspace Body -->
        <div class="reader-layout d-flex flex-grow-1 position-relative">
          <!-- Collapsible Table of Contents Drawer (The ONE Static Sidebar) -->
          <aside class="reader-toc-drawer border-end border-secondary border-opacity-25" id="reader-toc-drawer">
            <div class="p-3 border-bottom border-secondary border-opacity-25 d-flex justify-content-between align-items-center flex-shrink-0" style="min-height: 52px;">
              <h6 class="text-white fw-bold mb-0 fs-8"><i class="fa-solid fa-list-ul me-2 text-primary"></i> Table of Contents</h6>
              <button id="btn-close-toc-drawer" class="reader-tool-btn" style="width: 28px !important; height: 28px !important; min-width: 28px !important;" title="Close Table of Contents"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div class="p-2 overflow-y-auto flex-grow-1">
              <div class="list-group list-group-flush">
                ${chapters.map(c => `
                  <a href="#/library/read?id=${book.id}&ch=${c.chapterNumber}" class="list-group-item list-group-item-action bg-transparent border-0 text-white rounded-2 px-2 py-2 mb-1 fs-8 ${c.chapterNumber === chapter.chapterNumber ? 'active bg-primary text-white' : 'text-muted'}">
                    <div class="d-flex justify-content-between align-items-center">
                      <span class="text-truncate">${c.chapterNumber}. ${c.title}</span>
                      ${!isProUser && book.isPro && !c.isFreePreview ? '<i class="fa-solid fa-lock text-warning fs-9 ms-1"></i>' : ''}
                    </div>
                  </a>
                `).join('')}
              </div>
            </div>
          </aside>

          <!-- Main Reader Reading Canvas (Static Centered Layout with Dedicated Single Scrollbar) -->
          <main class="reader-content-pane" id="reader-content-pane">
            <div class="reader-content-pane-inner mx-auto">
              <!-- Chapter Metadata Heading -->
              <div class="mb-4 pb-3 border-bottom border-secondary border-opacity-25">
                <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-2">
                  <div class="d-flex align-items-center gap-2">
                    <span class="badge bg-primary text-white font-monospace fs-9">CHAPTER ${chapter.chapterNumber}</span>
                    <span class="badge bg-dark text-info border border-info border-opacity-25 font-monospace fs-9"><i class="fa-solid fa-file-lines me-1"></i> Pages ${((chapter.chapterNumber - 1) * Math.round(book.pageCount / chapters.length)) + 1}–${Math.min(book.pageCount, chapter.chapterNumber * Math.round(book.pageCount / chapters.length))} of ${book.pageCount}</span>
                  </div>
                  <span class="text-muted fs-9"><i class="fa-regular fa-clock me-1"></i> ${chapter.readingTimeMinutes || 25} min read &bull; ${book.category}</span>
                </div>
                <h2 class="text-white fw-extrabold display-6 mb-2 reader-heading-title">${chapter.title}</h2>
                <p class="text-info fs-7 mb-0">${chapter.subtitle || ''}</p>
              </div>

              ${isLocked ? `
                <!-- Locked Pro Content Gatekeeper Card -->
                <div class="card bg-dark border-warning border-opacity-50 rounded-4 p-4 p-md-5 my-4 text-center shadow-lg">
                  <div class="rounded-circle bg-warning bg-opacity-10 p-3 d-inline-flex align-items-center justify-content-center mb-3" style="width: 70px; height: 70px;">
                    <i class="fa-solid fa-lock text-warning display-6"></i>
                  </div>
                  <h4 class="text-white fw-bold mb-2">PrepSpace Pro Subscription Required</h4>
                  <p class="text-muted fs-7 col-md-9 mx-auto mb-4" style="line-height: 1.6;">
                    This chapter is an exclusive part of the <strong>${book.title}</strong> master curriculum. Upgrade to PrepSpace Pro to unlock complete chapters across all 19 technical domains, interactive code playgrounds, PDF exports, and unlimited mock assessments.
                  </p>

                  <!-- Chapter Abstract / Teaser -->
                  <div class="card bg-dark bg-opacity-50 border-secondary border-opacity-25 text-start p-3 mb-4 rounded-3">
                    <div class="text-warning fs-9 fw-bold font-monospace uppercase mb-1">What You Will Master in this Chapter:</div>
                    <p class="text-light fs-8 mb-0">${chapter.summary || 'Advanced architectural deep-dives, algorithmic implementations, and interview traps.'}</p>
                  </div>

                  <div class="d-flex flex-wrap justify-content-center gap-3">
                    <a href="#/billing" class="btn btn-premium btn-lg px-4 py-2.5 fs-7 fw-bold shadow">
                      <i class="fa-solid fa-bolt me-2"></i> Unlock All 19 Domains for ₹399
                    </a>
                    <a href="#/library/read?id=${book.id}&ch=1" class="btn btn-glass btn-lg px-4 py-2.5 fs-7">
                      <i class="fa-solid fa-book-open me-2"></i> Read Free Sample Chapter
                    </a>
                  </div>
                </div>
              ` : `
                <!-- Authenticated Full Chapter Content -->
                <article class="reader-prose-content fs-7 text-light" id="reader-article" style="line-height: 1.8;">
                  ${chapter.contentHtml || '<p>Chapter content is being generated...</p>'}
                </article>

                <!-- Chapter Bottom Navigation Footer -->
                <div class="reader-footer-nav mt-5 pt-4 border-top border-secondary border-opacity-25 d-flex flex-wrap justify-content-between align-items-center gap-3">
                  ${prevChapter ? `
                    <a href="#/library/read?id=${book.id}&ch=${prevChapter.chapterNumber}" class="btn btn-glass btn-sm px-3 py-2">
                      <i class="fa-solid fa-chevron-left me-1"></i> Prev: Ch ${prevChapter.chapterNumber}
                    </a>
                  ` : '<div></div>'}

                  <button id="btn-mark-chapter-complete" class="btn btn-outline-success btn-sm px-3 py-2" data-book-id="${book.id}" data-chapter-id="${chapter.id}">
                    <i class="fa-solid fa-circle-check me-1"></i> Mark Chapter Complete
                  </button>

                  ${nextChapter ? `
                    <a href="#/library/read?id=${book.id}&ch=${nextChapter.chapterNumber}" class="btn btn-primary btn-sm px-3 py-2 fw-semibold">
                      Next: Ch ${nextChapter.chapterNumber} <i class="fa-solid fa-chevron-right ms-1"></i>
                    </a>
                  ` : `
                    <a href="#/library/book?id=${book.id}" class="btn btn-success btn-sm px-3 py-2 fw-semibold">
                      Finish Book <i class="fa-solid fa-check ms-1"></i>
                    </a>
                  `}
                </div>
              `}
            </div>
          </main>
        </div>
      </div>
    `;
  },

  // PrepSpace Technical Library - Admin Tab
  adminLibraryTab: (books) => {
    const bookList = books || (window.PREPSPACE_LIBRARY ? window.PREPSPACE_LIBRARY.books : []);
    const totalChapters = bookList.reduce((acc, b) => acc + (b.chapters ? b.chapters.length : 0), 0);
    const proBooksCount = bookList.filter(b => b.isPro).length;

    return `
      <div class="admin-tab-pane py-3">
        <!-- Telemetry Metrics Bar -->
        <div class="row g-3 mb-4">
          <div class="col-6 col-md-3">
            <div class="admin-box p-3">
              <div class="admin-kpi-label">Total Handbooks</div>
              <div class="admin-kpi-num">${bookList.length}</div>
              <div class="admin-kpi-caption text-primary"><i class="fa-solid fa-book me-1"></i>19 Core Domains</div>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="admin-box p-3">
              <div class="admin-kpi-label">Published Chapters</div>
              <div class="admin-kpi-num text-emerald">${totalChapters}</div>
              <div class="admin-kpi-caption text-emerald"><i class="fa-solid fa-file-lines me-1"></i>Original Textbooks</div>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="admin-box p-3">
              <div class="admin-kpi-label">Pro Gated Books</div>
              <div class="admin-kpi-num text-warning">${proBooksCount}</div>
              <div class="admin-kpi-caption text-warning"><i class="fa-solid fa-crown me-1"></i>Monetized Tracks</div>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="admin-box p-3">
              <div class="admin-kpi-label">Free Preview Books</div>
              <div class="admin-kpi-num text-info">${bookList.length - proBooksCount}</div>
              <div class="admin-kpi-caption text-info"><i class="fa-solid fa-lock-open me-1"></i>Open Onboarding</div>
            </div>
          </div>
        </div>

        <!-- Book Operations Table -->
        <div class="admin-box p-3 rounded-3">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h6 class="text-white fw-bold mb-0"><i class="fa-solid fa-book-bookmark text-primary me-2"></i>Curriculum Inventory & Pro Gates</h6>
            <button id="btn-admin-add-book" class="btn btn-primary btn-sm"><i class="fa-solid fa-plus me-1"></i> Add New Book</button>
          </div>

          <div class="table-responsive">
            <table class="table table-dark admin-table table-hover align-middle fs-8 mb-0">
              <thead>
                <tr class="text-muted text-uppercase fs-9">
                  <th>Domain & Title</th>
                  <th>Category</th>
                  <th>Difficulty</th>
                  <th>Pages</th>
                  <th>Access Tier</th>
                  <th>Status</th>
                  <th class="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                ${bookList.map(b => `
                  <tr>
                    <td data-label="Domain & Title">
                      <div class="d-flex align-items-center gap-2">
                        <div class="rounded-2 p-1.5 d-flex align-items-center justify-content-center flex-shrink-0" style="background: ${b.gradient}; width: 32px; height: 32px;">
                          <i class="${b.icon} text-white fs-6"></i>
                        </div>
                        <div style="min-width: 0;">
                          <div class="text-white fw-semibold text-truncate" style="max-width: 220px;">${b.title}</div>
                          <div class="text-muted fs-9">${b.author}</div>
                        </div>
                      </div>
                    </td>
                    <td data-label="Category"><span class="text-muted">${b.category}</span></td>
                    <td data-label="Difficulty"><span class="badge bg-secondary bg-opacity-25 text-light fs-9">${b.difficulty}</span></td>
                    <td data-label="Pages"><span class="font-monospace">${b.pageCount || 100}</span></td>
                    <td data-label="Access Tier">
                      ${b.isPro ? '<span class="badge bg-warning text-dark fs-9"><i class="fa-solid fa-crown me-1"></i>PRO</span>' : '<span class="badge bg-emerald text-white fs-9"><i class="fa-solid fa-check me-1"></i>FREE</span>'}
                    </td>
                    <td data-label="Status">
                      <span class="badge bg-success bg-opacity-25 text-emerald fs-9">Published</span>
                    </td>
                    <td data-label="Actions" class="text-end">
                      <a href="#/library/book?id=${b.id}" class="btn btn-glass btn-sm me-1" title="View Public Syllabus"><i class="fa-solid fa-eye text-info"></i></a>
                      <button class="btn btn-glass btn-sm me-1" data-action="toggle-pro" data-book-id="${b.id}" title="Toggle Pro Status"><i class="fa-solid fa-crown ${b.isPro ? 'text-warning' : 'text-muted'}"></i></button>
                      <button class="btn btn-glass btn-sm" data-action="edit-book" data-book-id="${b.id}" title="Edit Metadata"><i class="fa-solid fa-pen-to-square text-muted"></i></button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }
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
  window.components = components;
  window.RAW_MCQ_DATA = RAW_MCQ_DATA;
  window.getMcqQuestions = getMcqQuestions;
}


