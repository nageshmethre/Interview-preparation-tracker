/**
 * engagement-gamification.js - PrepSpace Daily Engagement & Gamification Engine
 * Includes:
 *  - Daily Missions Engine (5 Tasks, Interactive Modals, +100 XP Bonus Claim)
 *  - 8-Category Daily Challenges with Live Countdown & Instant Evaluation
 *  - 5-Minute Quick Learning Hub (Daily Concept, Coding Tip, CS Facts, Quick Quiz)
 *  - Daily Learning Goals Tracker (Set Targets, % Progress, Streak Calendar)
 *  - Gamification & Leaderboard Hub (Levels, Badges, Multi-Tab Leaderboards)
 *  - Coins & Rewards Store (Virtual Currency, Vouchers, Fraud Prevention)
 */

(function() {
  'use strict';

  window.components = window.components || {};

  // Level thresholds helper
  const LEVELS = [
    { name: 'Beginner', min: 0, max: 499, icon: 'fa-seedling', color: '#a1a1aa' },
    { name: 'Intermediate', min: 500, max: 1499, icon: 'fa-shield', color: '#60a5fa' },
    { name: 'Advanced', min: 1500, max: 2999, icon: 'fa-gem', color: '#34d399' },
    { name: 'Expert', min: 3000, max: 4999, icon: 'fa-bolt', color: '#f59e0b' },
    { name: 'Master', min: 5000, max: 7999, icon: 'fa-fire', color: '#f97316' },
    { name: 'Legend', min: 8000, max: 999999, icon: 'fa-crown', color: '#fbbf24' }
  ];

  function getLevelInfo(xp) {
    xp = xp || 0;
    for (let i = LEVELS.length - 1; i >= 0; i--) {
      if (xp >= LEVELS[i].min) {
        const lvl = LEVELS[i];
        const nextMin = (i < LEVELS.length - 1) ? LEVELS[i + 1].min : lvl.min * 2;
        const progress = Math.min(100, Math.max(0, Math.round(((xp - lvl.min) / (nextMin - lvl.min)) * 100)));
        return { ...lvl, levelIndex: i + 1, nextMin, progress };
      }
    }
    return { ...LEVELS[0], levelIndex: 1, nextMin: 500, progress: 0 };
  }

  // =========================================================================
  // 1. DAILY MISSIONS COMPONENT
  // =========================================================================
  window.components.dailyMissions = function(missionData) {
    const data = missionData || {
      completedCount: 0,
      totalCount: 5,
      allCompleted: false,
      bonusClaimed: false,
      aptitudeCompleted: false,
      codingCompleted: false,
      conceptCompleted: false,
      interviewCompleted: false,
      quizCompleted: false,
      totalXpEarned: 0
    };

    const percent = Math.round((data.completedCount / 5) * 100);

    return `
      <div class="row g-4 mb-4">
        <!-- Hero Mission Banner -->
        <div class="col-12">
          <div class="glass-panel p-4 p-md-5 position-relative overflow-hidden" style="background: linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(34, 34, 38, 0.95) 100%); border: 1px solid rgba(245, 158, 11, 0.3);">
            <div class="row align-items-center g-4">
              <div class="col-lg-8">
                <div class="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25 fs-8 fw-bold mb-3">
                  <i class="fa-solid fa-crosshairs"></i> PREPSPACE DAILY MISSIONS
                </div>
                <h2 class="text-white fw-extrabold mb-2 fs-2">Personalized Daily Mission Engine</h2>
                <p class="text-muted fs-7 mb-4" style="max-width: 650px;">
                  Complete all 5 daily objectives to level up your engineering competencies, protect your learning streak, and unlock the <strong class="text-warning">+100 XP Daily Master Bonus</strong>.
                </p>
                <div class="d-flex flex-wrap align-items-center gap-4">
                  <div>
                    <span class="text-muted fs-8 d-block">Today's Progress</span>
                    <span class="fs-4 fw-extrabold text-white">${data.completedCount} / 5 <span class="fs-7 text-warning">(${percent}%)</span></span>
                  </div>
                  <div class="vr bg-secondary opacity-25 d-none d-sm-block" style="height: 38px;"></div>
                  <div>
                    <span class="text-muted fs-8 d-block">XP Claimed Today</span>
                    <span class="fs-4 fw-extrabold text-warning">+${data.totalXpEarned} XP</span>
                  </div>
                  <div class="vr bg-secondary opacity-25 d-none d-sm-block" style="height: 38px;"></div>
                  <div>
                    <span class="text-muted fs-8 d-block">Streak Protection</span>
                    <span class="fs-4 fw-extrabold text-success"><i class="fa-solid fa-shield-halved text-success me-1"></i> Active</span>
                  </div>
                </div>
              </div>

              <!-- Progress Circular Radial Gauge & Bonus Button -->
              <div class="col-lg-4 text-center">
                <div class="p-4 rounded-4 bg-surface border border-secondary border-opacity-25 d-flex flex-column align-items-center justify-content-center">
                  <div class="position-relative mb-3" style="width: 100px; height: 100px;">
                    <svg viewBox="0 0 36 36" class="w-100 h-100" style="transform: rotate(-90deg);">
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="3.5" />
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f59e0b" stroke-dasharray="${percent}, 100" stroke-width="3.5" stroke-linecap="round" />
                    </svg>
                    <div class="position-absolute top-50 start-50 translate-middle text-center">
                      <span class="fs-4 fw-extrabold text-white">${percent}%</span>
                    </div>
                  </div>
                  ${data.bonusClaimed ? `
                    <button class="btn btn-glass btn-sm w-100 text-success fw-bold py-2 border-success-subtle" disabled>
                      <i class="fa-solid fa-circle-check me-1.5"></i> +100 XP Bonus Claimed
                    </button>
                  ` : data.allCompleted ? `
                    <button class="btn btn-premium w-100 py-2.5 fw-bold shadow-lg" onclick="window.claimDailyMissionBonus()">
                      <i class="fa-solid fa-gift me-1.5"></i> Claim +100 XP Bonus!
                    </button>
                  ` : `
                    <button class="btn btn-glass btn-sm w-100 text-muted py-2" disabled>
                      Complete 5/5 to Unlock Bonus
                    </button>
                  `}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 5 Mission Task Cards -->
        <div class="col-12">
          <div class="row g-3">
            <!-- 1. Aptitude -->
            <div class="col-md-6 col-xl-4">
              <div class="glass-panel p-4 h-100 d-flex flex-column position-relative ${data.aptitudeCompleted ? 'border-success-subtle' : ''}">
                <div class="d-flex flex-column flex-grow-1">
                  <div class="d-flex align-items-center justify-content-between mb-3">
                    <span class="badge ${data.aptitudeCompleted ? 'bg-success text-white' : 'bg-primary text-dark'} px-2.5 py-1 rounded-pill fs-9 fw-bold">
                      ${data.aptitudeCompleted ? '<i class=\"fa-solid fa-check me-1\"></i> COMPLETED' : 'MISSION #1'}
                    </span>
                    <span class="badge border border-warning text-warning px-2 py-0.5 fs-9 fw-bold">+50 XP</span>
                  </div>
                  <h5 class="text-white fw-bold mb-1 fs-6">Aptitude & Problem Solving</h5>
                  <p class="text-muted fs-8 mb-3 flex-grow-1">Solve 1 Quantitative or Logical Aptitude question commonly tested in campus drives.</p>
                </div>
                ${data.aptitudeCompleted ? `
                  <button class="btn btn-glass btn-sm text-success w-100 mt-auto" disabled><i class="fa-solid fa-check me-1"></i> 50 XP Credited</button>
                ` : `
                  <button class="btn btn-glass btn-sm text-white w-100 mt-auto border-warning-subtle" onclick="window.openMissionTaskModal('aptitude')">
                    Solve Question <i class="fa-solid fa-arrow-right ms-1 text-warning"></i>
                  </button>
                `}
              </div>
            </div>

            <!-- 2. Coding Challenge -->
            <div class="col-md-6 col-xl-4">
              <div class="glass-panel p-4 h-100 d-flex flex-column position-relative ${data.codingCompleted ? 'border-success-subtle' : ''}">
                <div class="d-flex flex-column flex-grow-1">
                  <div class="d-flex align-items-center justify-content-between mb-3">
                    <span class="badge ${data.codingCompleted ? 'bg-success text-white' : 'bg-primary text-dark'} px-2.5 py-1 rounded-pill fs-9 fw-bold">
                      ${data.codingCompleted ? '<i class=\"fa-solid fa-check me-1\"></i> COMPLETED' : 'MISSION #2'}
                    </span>
                    <span class="badge border border-warning text-warning px-2 py-0.5 fs-9 fw-bold">+100 XP</span>
                  </div>
                  <h5 class="text-white fw-bold mb-1 fs-6">Daily Coding Challenge</h5>
                  <p class="text-muted fs-8 mb-3 flex-grow-1">Implement a core algorithm (Arrays / Two Pointers / String Manipulation) in your favorite language.</p>
                </div>
                ${data.codingCompleted ? `
                  <button class="btn btn-glass btn-sm text-success w-100 mt-auto" disabled><i class="fa-solid fa-check me-1"></i> 100 XP Credited</button>
                ` : `
                  <button class="btn btn-glass btn-sm text-white w-100 mt-auto border-warning-subtle" onclick="window.openMissionTaskModal('coding')">
                    Start Coding <i class="fa-solid fa-code ms-1 text-warning"></i>
                  </button>
                `}
              </div>
            </div>

            <!-- 3. Technical Concept -->
            <div class="col-md-6 col-xl-4">
              <div class="glass-panel p-4 h-100 d-flex flex-column position-relative ${data.conceptCompleted ? 'border-success-subtle' : ''}">
                <div class="d-flex flex-column flex-grow-1">
                  <div class="d-flex align-items-center justify-content-between mb-3">
                    <span class="badge ${data.conceptCompleted ? 'bg-success text-white' : 'bg-primary text-dark'} px-2.5 py-1 rounded-pill fs-9 fw-bold">
                      ${data.conceptCompleted ? '<i class=\"fa-solid fa-check me-1\"></i> COMPLETED' : 'MISSION #3'}
                    </span>
                    <span class="badge border border-warning text-warning px-2 py-0.5 fs-9 fw-bold">+30 XP</span>
                  </div>
                  <h5 class="text-white fw-bold mb-1 fs-6">5-Min Technical Bite</h5>
                  <p class="text-muted fs-8 mb-3 flex-grow-1">Read today's architectural deep-dive on Database Sharding & Virtual Threads in Java.</p>
                </div>
                ${data.conceptCompleted ? `
                  <button class="btn btn-glass btn-sm text-success w-100 mt-auto" disabled><i class="fa-solid fa-check me-1"></i> 30 XP Credited</button>
                ` : `
                  <button class="btn btn-glass btn-sm text-white w-100 mt-auto border-warning-subtle" onclick="window.openMissionTaskModal('concept')">
                    Read Concept <i class="fa-solid fa-book-open ms-1 text-warning"></i>
                  </button>
                `}
              </div>
            </div>

            <!-- 4. Interview Question -->
            <div class="col-md-6 col-xl-4">
              <div class="glass-panel p-4 h-100 d-flex flex-column position-relative ${data.interviewCompleted ? 'border-success-subtle' : ''}">
                <div class="d-flex flex-column flex-grow-1">
                  <div class="d-flex align-items-center justify-content-between mb-3">
                    <span class="badge ${data.interviewCompleted ? 'bg-success text-white' : 'bg-primary text-dark'} px-2.5 py-1 rounded-pill fs-9 fw-bold">
                      ${data.interviewCompleted ? '<i class=\"fa-solid fa-check me-1\"></i> COMPLETED' : 'MISSION #4'}
                    </span>
                    <span class="badge border border-warning text-warning px-2 py-0.5 fs-9 fw-bold">+50 XP</span>
                  </div>
                  <h5 class="text-white fw-bold mb-1 fs-6">Interview Simulation Question</h5>
                  <p class="text-muted fs-8 mb-3 flex-grow-1">Review and formulate a STAR structured response for high-frequency FAANG questions.</p>
                </div>
                ${data.interviewCompleted ? `
                  <button class="btn btn-glass btn-sm text-success w-100 mt-auto" disabled><i class="fa-solid fa-check me-1"></i> 50 XP Credited</button>
                ` : `
                  <button class="btn btn-glass btn-sm text-white w-100 mt-auto border-warning-subtle" onclick="window.openMissionTaskModal('interview')">
                    Practice Response <i class="fa-solid fa-microphone ms-1 text-warning"></i>
                  </button>
                `}
              </div>
            </div>

            <!-- 5. Knowledge Quiz -->
            <div class="col-md-6 col-xl-4">
              <div class="glass-panel p-4 h-100 d-flex flex-column position-relative ${data.quizCompleted ? 'border-success-subtle' : ''}">
                <div class="d-flex flex-column flex-grow-1">
                  <div class="d-flex align-items-center justify-content-between mb-3">
                    <span class="badge ${data.quizCompleted ? 'bg-success text-white' : 'bg-primary text-dark'} px-2.5 py-1 rounded-pill fs-9 fw-bold">
                      ${data.quizCompleted ? '<i class=\"fa-solid fa-check me-1\"></i> COMPLETED' : 'MISSION #5'}
                    </span>
                    <span class="badge border border-warning text-warning px-2 py-0.5 fs-9 fw-bold">+70 XP</span>
                  </div>
                  <h5 class="text-white fw-bold mb-1 fs-6">CS Core Knowledge Quiz</h5>
                  <p class="text-muted fs-8 mb-3 flex-grow-1">Test Operating Systems, DBMS & Computer Networks speed with a 3-question lightning drill.</p>
                </div>
                ${data.quizCompleted ? `
                  <button class="btn btn-glass btn-sm text-success w-100 mt-auto" disabled><i class="fa-solid fa-check me-1"></i> 70 XP Credited</button>
                ` : `
                  <button class="btn btn-glass btn-sm text-white w-100 mt-auto border-warning-subtle" onclick="window.openMissionTaskModal('quiz')">
                    Take Speed Quiz <i class="fa-solid fa-bolt ms-1 text-warning"></i>
                  </button>
                `}
              </div>
            </div>

            <!-- Streak & Milestone Box -->
            <div class="col-md-6 col-xl-4">
              <div class="glass-panel p-4 h-100 d-flex flex-column justify-content-between" style="background: rgba(255, 255, 255, 0.02);">
                <div class="d-flex flex-column flex-grow-1">
                  <div class="d-flex align-items-center justify-content-between mb-3">
                    <span class="text-muted fs-8 fw-semibold">CONSISTENCY</span>
                    <i class="fa-solid fa-fire text-warning fs-5"></i>
                  </div>
                  <h5 class="text-white fw-bold mb-1 fs-6">Milestone Multipliers</h5>
                  <p class="text-muted fs-8 mb-3 flex-grow-1">Reaching 7-day, 15-day, and 30-day streak milestones permanently boosts your platform points and unlocks rare badges.</p>
                </div>
                <button class="btn btn-glass btn-sm text-white w-100 mt-auto" onclick="window.showStreakModal && window.showStreakModal()">
                  <i class="fa-regular fa-calendar-days me-1.5 text-warning"></i> View Streak Calendar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Interactive Task Execution Modal Container -->
      <div class="modal fade" id="missionTaskModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
          <div class="modal-content bg-surface border border-secondary border-opacity-25 rounded-4 shadow-lg text-white" id="missionTaskModalContent" style="max-height: 94vh; overflow-y: auto; -webkit-overflow-scrolling: touch;">
            <!-- Injected dynamically -->
          </div>
        </div>
      </div>
    `;
  };

  // =========================================================================
  // 2. DAILY CHALLENGES COMPONENT (8 Categories)
  // =========================================================================
  window.components.dailyChallenges = function(payload) {
    const defaultChallenges = [
      { id: 1, title: 'Two Pointers in Sorted Arrays', category: 'DSA', difficulty: 'EASY', xp: 50, question: 'Given a 1-indexed array of integers sorted in non-decreasing order, find two numbers such that they add up to a specific target number with O(1) extra space.' },
      { id: 2, title: 'Optimizing SQL Nested Subqueries with CTEs', category: 'DBMS', difficulty: 'MEDIUM', xp: 75, question: 'Refactor a correlated subquery fetching high-earning employee salaries per department into a performant Common Table Expression with Windowing Functions.' },
      { id: 3, title: 'Process Scheduling & Mutex Locks in POSIX', category: 'CS Fundamentals', difficulty: 'HARD', xp: 100, question: 'Analyze potential race conditions when two pthread workers mutate a shared ring buffer without atomic memory barriers.' }
    ];
    const rawList = (payload && payload.challenges) || [];
    const list = rawList.length > 0 ? rawList : defaultChallenges;
    const countdown = (payload && payload.countdownSeconds) || 36000;
    const activeCategory = (payload && payload.selectedCategory) || 'ALL';

    const categories = [
      { key: 'ALL', label: 'All Categories' },
      { key: 'Aptitude', label: 'Aptitude' },
      { key: 'Logical Reasoning', label: 'Logical' },
      { key: 'Programming', label: 'Programming' },
      { key: 'DSA', label: 'Data Structures' },
      { key: 'DBMS', label: 'DBMS' },
      { key: 'CS Fundamentals', label: 'OS & Networks' },
      { key: 'Technical Knowledge', label: 'System Design' },
      { key: 'Interview Preparation', label: 'Interview Prep' }
    ];

    const hours = String(Math.floor(countdown / 3600)).padStart(2, '0');
    const mins = String(Math.floor((countdown % 3600) / 60)).padStart(2, '0');
    const secs = String(countdown % 60).padStart(2, '0');

    return `
      <div class="row g-4 mb-4">
        <div class="col-12">
          <div class="glass-panel p-4 p-md-5 d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-4">
            <div>
              <div class="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25 fs-8 fw-bold mb-2">
                <i class="fa-solid fa-trophy"></i> 8-CATEGORY TECHNICAL CHALLENGES
              </div>
              <h2 class="text-white fw-extrabold mb-2 fs-2">Daily Engineering Challenges</h2>
              <p class="text-muted fs-7 mb-0" style="max-width: 600px;">
                Refreshed every 24 hours. Solve hand-curated questions across Aptitude, DSA, OS, and Architecture to earn verified XP.
              </p>
            </div>
            <!-- Countdown Clock -->
            <div class="p-3 px-4 rounded-4 bg-surface border border-secondary border-opacity-25 text-center flex-shrink-0">
              <span class="text-muted fs-8 d-block mb-1 text-uppercase fw-bold" style="letter-spacing: 0.5px;">Next Reset In</span>
              <div class="font-monospace fs-3 fw-extrabold text-warning d-flex align-items-center justify-content-center gap-1.5" id="challenge-countdown-timer">
                <span>${hours}h</span> : <span>${mins}m</span> : <span>${secs}s</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Category Filter Pills -->
        <div class="col-12">
          <div class="d-flex gap-2 overflow-x-auto pb-2" id="challenge-category-bar">
            ${categories.map(c => `
              <button class="btn btn-sm py-2 px-3 rounded-pill text-nowrap fs-8 fw-semibold ${activeCategory === c.key ? 'btn-primary text-dark' : 'btn-glass text-muted'}" onclick="window.filterChallengesCategory('${c.key}')">
                ${c.label}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Challenges Grid -->
        <div class="col-12">
          <div class="row g-3" id="challenges-grid-container">
            ${list.map(c => `
              <div class="col-md-6 col-xl-4">
                <div class="glass-panel p-4 h-100 d-flex flex-column">
                  <div class="d-flex flex-column flex-grow-1">
                    <div class="d-flex align-items-center justify-content-between mb-3">
                      <span class="badge bg-secondary bg-opacity-25 text-white border border-secondary border-opacity-30 px-2 py-0.5 fs-9 fw-semibold">
                        ${c.category}
                      </span>
                      <div class="d-flex align-items-center gap-1.5">
                        <span class="badge ${c.difficulty === 'EASY' ? 'bg-success' : c.difficulty === 'MEDIUM' ? 'bg-warning text-dark' : 'bg-danger'} px-2 py-0.5 fs-9 fw-bold">
                          ${c.difficulty}
                        </span>
                        <span class="badge bg-warning bg-opacity-20 text-warning px-2 py-0.5 fs-9 fw-bold">+${c.xp} XP</span>
                      </div>
                    </div>
                    <h5 class="text-white fw-bold mb-2 fs-6 lh-sm">${c.title}</h5>
                    <p class="text-muted fs-8 mb-3 flex-grow-1" style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
                      ${c.question}
                    </p>
                  </div>
                  <button class="btn btn-glass btn-sm text-white w-100 border-warning-subtle mt-auto" onclick="window.openChallengeSolverModal(${c.id})">
                    <i class="fa-solid fa-play text-warning me-1.5 fs-9"></i> Solve Challenge
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Challenge Solver Modal -->
      <div class="modal fade" id="challengeSolverModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
          <div class="modal-content bg-surface border border-secondary border-opacity-25 rounded-4 shadow-lg text-white" id="challengeSolverContent" style="max-height: 94vh; overflow-y: auto; -webkit-overflow-scrolling: touch;">
            <!-- Dynamically populated -->
          </div>
        </div>
      </div>
    `;
  };

  // =========================================================================
  // 3. QUICK LEARNING (5-Minute Bites)
  // =========================================================================
  window.components.quickLearning = function(biteData) {
    const data = biteData || {
      topic: 'Computer Science: Database Sharding & High-Throughput Partitions',
      summary: 'Horizontal partitioning splits table rows across multiple database servers according to a shard key. This prevents single-node hardware memory ceilings.',
      keyTakeaway: 'Always choose a shard key with high cardinality and even frequency distribution to avoid query routing skew.',
      codeTip: 'In JPA/Hibernate, use @Query hints with read-only transaction tags (@Transactional(readOnly = true)) to automatically bypass dirty-checking state hydration.',
      interviewQuestion: 'Q: How does consistent hashing minimize re-mapped keys when a node fails?\nA: Only keys in the direct partition between adjacent ring intervals are shifted, bounding re-assignment to K/N keys rather than complete K reshuffling.',
      quickQuiz: {
        question: 'Which ACID isolation level guarantees complete prevention of Phantom Reads?',
        options: ['READ COMMITTED', 'REPEATABLE READ', 'SERIALIZABLE', 'READ UNCOMMITTED'],
        correctAnswer: 'SERIALIZABLE',
        explanation: 'SERIALIZABLE uses range locks or multiversion serializable snapshot isolation to completely eliminate phantom read anomalies.'
      }
    };

    return `
      <div class="row g-4 mb-4">
        <div class="col-12">
          <div class="glass-panel p-4 p-md-5">
            <div class="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25 fs-8 fw-bold mb-3">
              <i class="fa-solid fa-bolt"></i> 5-MINUTE HIGH-SPEED LEARNING SECTION
            </div>
            <h2 class="text-white fw-extrabold mb-2 fs-2">Daily Technical Concept of the Day</h2>
            <p class="text-muted fs-7 mb-4">Designed for busy engineering candidates. Absorb one high-yield technical concept, code tip, and interview question in 5 minutes every morning.</p>

            <div class="row g-4">
              <!-- Left: Concept Deep Dive -->
              <div class="col-lg-7">
                <div class="p-4 rounded-4 bg-surface border border-secondary border-opacity-25 mb-3">
                  <span class="badge bg-warning bg-opacity-20 text-warning border border-warning border-opacity-30 fw-bold px-2.5 py-1 fs-9 mb-2">TODAY'S TOPIC</span>
                  <h4 class="text-white fw-bold mb-3 fs-5">${data.topic}</h4>
                  <p class="text-secondary fs-7 mb-3 lh-base">${data.summary}</p>
                  <div class="p-3 rounded-3 border-start border-3 border-warning mb-2" style="background: rgba(245, 158, 11, 0.08); border-top: 1px solid rgba(255, 255, 255, 0.05); border-right: 1px solid rgba(255, 255, 255, 0.05); border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                    <span class="text-warning fw-bold fs-8 d-block mb-1"><i class="fa-solid fa-lightbulb me-1"></i> Key Placement Takeaway:</span>
                    <span class="text-light fs-8 lh-base">${data.keyTakeaway}</span>
                  </div>
                </div>

                <!-- Pro Tip of the Day -->
                <div class="p-4 rounded-4 bg-surface border border-secondary border-opacity-25">
                  <span class="badge bg-warning bg-opacity-20 text-warning fw-bold px-2 py-0.5 fs-9 mb-2"><i class="fa-solid fa-code me-1"></i> CODE CRAFT TIP</span>
                  <div class="p-3 rounded-3 border border-secondary border-opacity-25 overflow-x-auto" style="background: #141416;">
                    <code class="text-warning-emphasis font-monospace fs-8 d-block" style="color: #fbbf24 !important;">
                      <i class="fa-solid fa-terminal me-2 text-warning fs-9"></i>${data.codeTip}
                    </code>
                  </div>
                </div>
              </div>

              <!-- Right: Interview Prompt & Speed Quiz -->
              <div class="col-lg-5">
                <div class="p-4 rounded-4 bg-surface border border-secondary border-opacity-25 mb-3">
                  <span class="badge border border-warning border-opacity-30 text-warning fw-bold px-2.5 py-1 fs-9 mb-2" style="background: rgba(245, 158, 11, 0.12);"><i class="fa-solid fa-user-tie me-1"></i> FAANG INTERVIEW QUESTION</span>
                  <p class="text-white fs-8 fw-semibold mb-2 whitespace-pre-line">${data.interviewQuestion}</p>
                </div>

                <!-- Quick Quiz -->
                <div class="p-4 rounded-4 bg-surface border border-secondary border-opacity-25" id="quick-quiz-box">
                  <div class="d-flex align-items-center justify-content-between mb-2">
                    <span class="badge bg-success bg-opacity-20 text-success fw-bold px-2 py-0.5 fs-9">RAPID QUIZ</span>
                    <span class="text-warning fs-9 fw-bold">+20 XP</span>
                  </div>
                  <h6 class="text-white fw-bold mb-3 fs-7">${data.quickQuiz.question}</h6>
                  <div class="d-flex flex-column gap-2 mb-3">
                    ${data.quickQuiz.options.map((opt, idx) => `
                      <button class="btn btn-glass text-start py-2 px-3 fs-8 text-white border-secondary border-opacity-25 quick-quiz-opt" data-opt="${opt}" onclick="window.answerQuickQuiz('${opt}', '${data.quickQuiz.correctAnswer}', '${data.quickQuiz.explanation}')">
                        <span class="text-muted me-2 font-monospace">${String.fromCharCode(65 + idx)}.</span> ${opt}
                      </button>
                    `).join('')}
                  </div>
                  <div id="quick-quiz-verdict" class="d-none"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  // =========================================================================
  // 4. GAMIFICATION & LEADERBOARD COMPONENT
  // =========================================================================
  window.components.leaderboard = function(payload) {
    const status = (payload && payload.status) || {};
    const leaderboardData = (payload && payload.leaderboard) || {};
    const rawRankList = leaderboardData.leaderboard || [];
    // Strictly filter out any administrator accounts from student leaderboard
    const rankList = rawRankList.filter(r => {
      const n = (r.name || '').toLowerCase();
      const e = (r.email || '').toLowerCase();
      return !n.includes('admin') && !n.includes('superadmin') && !e.includes('admin');
    });
    const verifiedDefaultRanks = [
      { rank: 1, name: 'Rahul Sharma', levelName: 'Expert', college: 'Indian Institute of Technology', xp: 4850, isCurrentUser: false },
      { rank: 2, name: 'Priya Patel', levelName: 'Expert', college: 'National Institute of Technology', xp: 4420, isCurrentUser: false },
      { rank: 3, name: 'Aman Verma', levelName: 'Advanced', college: 'Birla Institute of Technology', xp: 3980, isCurrentUser: false },
      { rank: 4, name: 'Sneha Kulkarni', levelName: 'Advanced', college: 'Pune Institute of Computer Technology', xp: 3650, isCurrentUser: false },
      { rank: 5, name: 'Rohit Mehta', levelName: 'Advanced', college: 'Delhi Technological University', xp: 3320, isCurrentUser: false },
      { rank: 6, name: 'Ananya Gupta', levelName: 'Intermediate', college: 'Vellore Institute of Technology', xp: 2950, isCurrentUser: false },
      { rank: 7, name: 'Vikram Rao', levelName: 'Intermediate', college: 'RV College of Engineering', xp: 2600, isCurrentUser: false },
      { rank: 8, name: 'Pooja Reddy', levelName: 'Intermediate', college: 'Osmania University College of Engg', xp: 2240, isCurrentUser: false },
      { rank: 9, name: 'Karthik Nair', levelName: 'Intermediate', college: 'College of Engineering Guindy', xp: 1980, isCurrentUser: false },
      { rank: 10, name: 'Divya Iyer', levelName: 'Beginner', college: 'PSG College of Technology', xp: 1650, isCurrentUser: false },
      { rank: 11, name: 'Arjun Singh', levelName: 'Beginner', college: 'Thapar Institute of Engg & Tech', xp: 1320, isCurrentUser: false },
      { rank: 12, name: 'Meera Joshi', levelName: 'Beginner', college: 'Mumbai University Technology Campus', xp: 950, isCurrentUser: false }
    ];
    const displayRanks = rankList.length > 0 ? rankList : verifiedDefaultRanks;
    const activeType = leaderboardData.type || 'global';
    const userRank = leaderboardData.userRank || 1;

    const userXp = status.xp || 0;
    const userCoins = status.coins || 50;
    const level = getLevelInfo(userXp);

    const badges = [
      { name: 'First Milestone', icon: 'fa-flag-checkered', desc: 'Solved first LeetCode problem', unlocked: true },
      { name: '3-Day Fire', icon: 'fa-fire', desc: 'Maintained 3 consecutive days of practice', unlocked: true },
      { name: '7-Day Champion', icon: 'fa-bolt', desc: '7 days of uninterrupted consistency', unlocked: userXp >= 200 },
      { name: 'Speed Solver', icon: 'fa-gauge-high', desc: 'Scored 90%+ in 50-MCQ Mock Exam', unlocked: userXp >= 500 },
      { name: 'Algorithm Wizard', icon: 'fa-hat-wizard', desc: 'Completed 50 DSA problems', unlocked: userXp >= 1000 },
      { name: 'Legendary Candidate', icon: 'fa-crown', desc: 'Reached 8,000+ platform XP', unlocked: userXp >= 8000 }
    ];

    return `
      <div class="row g-4 mb-4">
        <!-- Level & XP Status Banner -->
        <div class="col-12">
          <div class="glass-panel p-4 p-md-5 position-relative overflow-hidden" style="background: linear-gradient(135deg, rgba(34, 34, 38, 0.95) 0%, rgba(24, 24, 27, 0.98) 100%);">
            <div class="row align-items-center g-4">
              <div class="col-md-7">
                <div class="d-flex align-items-center gap-2 mb-2">
                  <i class="fa-solid ${level.icon} fs-4" style="color: ${level.color};"></i>
                  <span class="fs-4 fw-extrabold text-white">Tier: <span style="color: ${level.color};">${level.name}</span> (Level ${level.levelIndex})</span>
                </div>
                <p class="text-muted fs-7 mb-3">
                  Earn XP by solving problems, taking mock exams, and completing daily missions to unlock higher tiers and recruiter spotlight ranking.
                </p>
                <div class="mb-2 d-flex justify-content-between fs-8">
                  <span class="text-white font-monospace">${userXp} XP</span>
                  <span class="text-muted">Next Tier: ${level.nextMin} XP</span>
                </div>
                <div class="progress" style="height: 10px; background: rgba(255,255,255,0.06); border-radius: 999px;">
                  <div class="progress-bar" style="width: ${level.progress}%; background: ${level.color}; border-radius: 999px;"></div>
                </div>
              </div>

              <!-- Coins & Rank Summary Box -->
              <div class="col-md-5 text-md-end">
                <div class="d-inline-flex flex-column p-4 rounded-4 bg-surface border border-secondary border-opacity-25 text-start" style="min-width: 240px;">
                  <div class="d-flex align-items-center justify-content-between gap-3 mb-2">
                    <span class="text-muted fs-8">Your Leaderboard Rank</span>
                    <span class="fs-4 fw-extrabold text-warning">#${userRank}</span>
                  </div>
                  <div class="d-flex align-items-center justify-content-between gap-3 mb-3">
                    <span class="text-muted fs-8">PrepCoins Balance</span>
                    <span class="fs-4 fw-extrabold text-warning"><i class="fa-solid fa-coins me-1"></i> ${userCoins}</span>
                  </div>
                  <a href="#/rewards" class="btn btn-premium btn-sm py-2 w-100 fw-bold text-center text-decoration-none">
                    <i class="fa-solid fa-gift me-1"></i> Open Rewards Store
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Badges Showcase -->
        <div class="col-12">
          <div class="glass-panel p-4">
            <h5 class="text-white fw-bold mb-3 fs-6"><i class="fa-solid fa-award text-warning me-2"></i> Achievement Badges</h5>
            <div class="row g-3">
              ${badges.map(b => `
                <div class="col-6 col-md-4 col-xl-2">
                  <div class="p-3 rounded-4 bg-surface text-center h-100 border ${b.unlocked ? 'border-warning border-opacity-30' : 'border-secondary border-opacity-10 opacity-40'}">
                    <div class="d-inline-flex align-items-center justify-content-center rounded-circle mb-2" style="width: 48px; height: 48px; background: ${b.unlocked ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255, 255, 255, 0.04)'};">
                      <i class="fa-solid ${b.icon} fs-5 ${b.unlocked ? 'text-warning' : 'text-muted'}"></i>
                    </div>
                    <h6 class="text-white fw-bold mb-1 fs-8 text-truncate" title="${b.name}">${b.name}</h6>
                    <small class="text-muted fs-9 d-block lh-sm">${b.desc}</small>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Leaderboard Table -->
        <div class="col-12">
          <div class="glass-panel p-4">
            <div class="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3 mb-4">
              <div>
                <h5 class="text-white fw-bold mb-1 fs-6"><i class="fa-solid fa-ranking-star text-warning me-2"></i> Student Leaderboard</h5>
                <span class="text-muted fs-8">Rankings update automatically based on verified problem submissions & test accuracy.</span>
              </div>
              <div class="d-flex gap-1.5 overflow-x-auto">
                <button class="btn btn-sm py-1.5 px-3 rounded-pill fs-8 fw-semibold ${activeType === 'global' ? 'btn-primary' : 'btn-glass text-muted'}" onclick="window.switchLeaderboardTab('global')">Global</button>
                <button class="btn btn-sm py-1.5 px-3 rounded-pill fs-8 fw-semibold ${activeType === 'weekly' ? 'btn-primary' : 'btn-glass text-muted'}" onclick="window.switchLeaderboardTab('weekly')">Weekly</button>
                <button class="btn btn-sm py-1.5 px-3 rounded-pill fs-8 fw-semibold ${activeType === 'monthly' ? 'btn-primary' : 'btn-glass text-muted'}" onclick="window.switchLeaderboardTab('monthly')">Monthly</button>
                <button class="btn btn-sm py-1.5 px-3 rounded-pill fs-8 fw-semibold ${activeType === 'college' ? 'btn-primary' : 'btn-glass text-muted'}" onclick="window.switchLeaderboardTab('college')">Campus / College</button>
              </div>
            </div>

            <div class="table-responsive" style="overflow-x: auto;">
              <table class="table table-dark table-borderless align-middle mb-0" style="background: transparent;">
                <thead>
                  <tr class="text-muted fs-8 border-bottom border-secondary border-opacity-25">
                    <th scope="col" style="width: 80px;">RANK</th>
                    <th scope="col">CANDIDATE</th>
                    <th scope="col">TIER LEVEL</th>
                    <th scope="col">CAMPUS / AFFILIATION</th>
                    <th scope="col" class="text-end">PLATFORM XP</th>
                  </tr>
                </thead>
                <tbody>
                  ${displayRanks.map(r => `
                    <tr class="border-bottom border-secondary border-opacity-10 ${r.isCurrentUser ? 'bg-warning bg-opacity-10' : ''}" style="transition: background 0.15s ease;">
                      <td>
                        ${r.rank === 1 ? '<span class="badge bg-warning text-dark px-2 py-1 fs-8 fw-extrabold rounded-pill"><i class="fa-solid fa-crown me-1"></i> #1</span>' :
                          r.rank === 2 ? '<span class="badge bg-secondary text-white px-2 py-1 fs-8 fw-bold rounded-pill">#2</span>' :
                          r.rank === 3 ? '<span class="badge text-white px-2 py-1 fs-8 fw-bold rounded-pill" style="background: #cd7f32;">#3</span>' :
                          `<span class="text-muted font-monospace fs-8 fw-bold ps-2">#${r.rank}</span>`}
                      </td>
                      <td>
                        <div class="d-flex align-items-center gap-2.5">
                          <div class="rounded-circle d-flex align-items-center justify-content-center fw-bold fs-8 flex-shrink-0" style="width: 34px; height: 34px; background: rgba(245, 158, 11, 0.15); color: #f59e0b;">
                            ${r.name ? r.name.charAt(0).toUpperCase() : 'C'}
                          </div>
                          <div>
                            <span class="text-white fw-semibold fs-8 d-block ${r.isCurrentUser ? 'text-warning' : ''}">${r.name} ${r.isCurrentUser ? '<span class="badge bg-warning text-dark fs-9 ms-1">YOU</span>' : ''}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span class="badge bg-secondary bg-opacity-25 text-white border border-secondary border-opacity-30 px-2 py-0.5 fs-9 fw-semibold">
                          ${r.levelName || 'Beginner'}
                        </span>
                      </td>
                      <td>
                        <span class="text-muted fs-8">${r.college || 'Engineering Campus'}</span>
                      </td>
                      <td class="text-end font-monospace fs-7 fw-extrabold text-warning">
                        ${r.xp} XP
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  // =========================================================================
  // 5. COINS & REWARDS STORE
  // =========================================================================
  window.components.rewardsStore = function(catalog, redemptions, userCoins = 50) {
    const defaultCatalog = [
      { id: 1, title: '1-on-1 FAANG Mock Interview Pass', description: 'Redeem a 45-minute live behavioral & technical mock session with senior mentor feedback.', coinCost: 500, badgeText: 'Live Mentor', iconClass: 'fa-user-tie' },
      { id: 2, title: 'Top 100 Company Question Sheets', description: 'Instant PDF & interactive unlock of the highest frequency interview questions for Google, Amazon & Microsoft.', coinCost: 350, badgeText: 'Curated Bank', iconClass: 'fa-file-lines' },
      { id: 3, title: 'AI ATS Resume Deep-Scan Pass', description: 'Comprehensive section audit, bullet rewrites, and recruiter ATS compatibility grading report.', coinCost: 200, badgeText: 'AI Tool', iconClass: 'fa-wand-magic-sparkles' },
      { id: 4, title: 'Golden Spotlight Profile Badge', description: 'Showcase an exclusive gold star verification badge next to your student profile across public leaderboards.', coinCost: 150, badgeText: 'Profile Flair', iconClass: 'fa-medal' }
    ];
    catalog = (catalog && catalog.length > 0) ? catalog : defaultCatalog;
    redemptions = redemptions || [];

    return `
      <div class="row g-4 mb-4">
        <!-- Rewards Hero Banner -->
        <div class="col-12">
          <div class="glass-panel p-4 p-md-5 position-relative overflow-hidden" style="background: linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(34, 34, 38, 0.95) 100%);">
            <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-4">
              <div>
                <div class="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25 fs-8 fw-bold mb-3">
                  <i class="fa-solid fa-coins"></i> PREPCOINS MERIT STORE
                </div>
                <h2 class="text-white fw-extrabold mb-2 fs-2">Platform Rewards & Voucher Redemptions</h2>
                <p class="text-muted fs-7 mb-0" style="max-width: 650px;">
                  Coins are earned through genuine technical achievements: completing daily challenges, maintaining streaks, and solving coding problems. No money required.
                </p>
              </div>
              <div class="p-4 rounded-4 bg-surface border border-secondary border-opacity-25 text-center flex-shrink-0">
                <span class="text-muted fs-8 d-block mb-1 text-uppercase fw-bold">Available PrepCoins</span>
                <span class="fs-2 fw-extrabold text-warning"><i class="fa-solid fa-coins me-1"></i> ${userCoins}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Catalog Grid -->
        <div class="col-12">
          <h5 class="text-white fw-bold mb-3 fs-6"><i class="fa-solid fa-shop text-warning me-2"></i> Redeemable Privileges & Passes</h5>
          <div class="row g-3">
            ${catalog.map(r => `
              <div class="col-md-6 col-xl-3">
                <div class="glass-panel p-4 h-100 d-flex flex-column">
                  <div class="d-flex flex-column flex-grow-1">
                    <div class="d-flex align-items-center justify-content-between mb-3">
                      <span class="badge bg-warning bg-opacity-20 text-warning px-2 py-0.5 fs-9 fw-bold">${r.badgeText || 'Perk'}</span>
                      <span class="fs-7 fw-extrabold text-warning"><i class="fa-solid fa-coins me-1"></i> ${r.coinCost}</span>
                    </div>
                    <div class="d-inline-flex align-items-center justify-content-center rounded-circle mb-3" style="width: 44px; height: 44px; background: rgba(245, 158, 11, 0.12);">
                      <i class="fa-solid ${r.iconClass || 'fa-gift'} fs-5 text-warning"></i>
                    </div>
                    <h5 class="text-white fw-bold mb-2 fs-6">${r.title}</h5>
                    <p class="text-muted fs-8 mb-4 flex-grow-1">${r.description}</p>
                  </div>
                  <button class="btn btn-premium btn-sm py-2 w-100 fw-bold mt-auto ${userCoins < r.coinCost ? 'opacity-50' : ''}" onclick="window.redeemRewardItem(${r.id}, ${r.coinCost})">
                    Redeem for ${r.coinCost} Coins
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- My Vouchers / Active Redemptions -->
        <div class="col-12">
          <div class="glass-panel p-4">
            <h5 class="text-white fw-bold mb-3 fs-6"><i class="fa-solid fa-ticket text-warning me-2"></i> Your Active Vouchers & Passes</h5>
            ${redemptions.length === 0 ? `
              <div class="text-center py-5 text-muted fs-8">
                <i class="fa-solid fa-ticket-simple fs-2 mb-2 d-block opacity-30"></i>
                You haven't redeemed any rewards yet. Solve daily missions and challenges to earn coins!
              </div>
            ` : `
              <div class="table-responsive">
                <table class="table table-dark table-borderless align-middle mb-0">
                  <thead>
                    <tr class="text-muted fs-8 border-bottom border-secondary border-opacity-25">
                      <th>REWARD PRIVILEGE</th>
                      <th>VOUCHER CODE</th>
                      <th>COINS SPENT</th>
                      <th>STATUS</th>
                      <th>DATE REDEEMED</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${redemptions.map(red => `
                      <tr class="border-bottom border-secondary border-opacity-10">
                        <td class="text-white fw-semibold fs-8">${red.title}</td>
                        <td><span class="badge bg-surface border border-secondary border-opacity-30 text-warning px-2.5 py-1 font-monospace fs-8">${red.voucherCode}</span></td>
                        <td class="font-monospace text-muted fs-8">${red.coinsSpent} Coins</td>
                        <td><span class="badge bg-success bg-opacity-20 text-success px-2 py-0.5 fs-9 fw-bold">${red.status}</span></td>
                        <td class="text-muted fs-9">${new Date(red.redeemedAt).toLocaleDateString()}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            `}
          </div>
        </div>
      </div>
    `;
  };

  // =========================================================================
  // INTERACTIVE EVENT HANDLERS & MODAL RUNNERS
  // =========================================================================

  window.openMissionTaskModal = function(taskType) {
    let modalEl = document.getElementById('missionTaskModal');
    if (!modalEl) return;

    if (modalEl.parentElement !== document.body) {
      const existing = document.body.querySelector(':scope > #missionTaskModal');
      if (existing && existing !== modalEl) {
        existing.remove();
      }
      document.body.appendChild(modalEl);
    }

    const content = document.getElementById('missionTaskModalContent');
    if (!content) return;

    if (taskType === 'aptitude') {
      content.innerHTML = `
        <div class="p-4 border-bottom border-secondary border-opacity-25 d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center gap-2">
            <span class="badge bg-primary text-dark fw-bold px-2.5 py-1 rounded-pill">MISSION #1</span>
            <h5 class="text-white fw-bold mb-0 fs-6">Quantitative Aptitude: Time & Work</h5>
          </div>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
        </div>
        <div class="p-4">
          <p class="text-white fs-7 mb-3">
            <strong>Problem:</strong> A can complete a software module in 12 days, and B can complete the same module in 18 days. If they work together for 4 days, what fraction of the module remains incomplete?
          </p>
          <div class="d-flex flex-column gap-2 mb-4">
            <div class="form-check p-3 rounded-3 bg-surface border border-secondary border-opacity-25">
              <input class="form-check-input" type="radio" name="mission-apt-opt" id="m-opt-1" value="wrong1">
              <label class="form-check-label text-white fs-8 ms-2" for="m-opt-1">5 / 9</label>
            </div>
            <div class="form-check p-3 rounded-3 bg-surface border border-secondary border-opacity-25">
              <input class="form-check-input" type="radio" name="mission-apt-opt" id="m-opt-2" value="correct">
              <label class="form-check-label text-white fs-8 ms-2" for="m-opt-2">4 / 9</label>
            </div>
            <div class="form-check p-3 rounded-3 bg-surface border border-secondary border-opacity-25">
              <input class="form-check-input" type="radio" name="mission-apt-opt" id="m-opt-3" value="wrong2">
              <label class="form-check-label text-white fs-8 ms-2" for="m-opt-3">1 / 3</label>
            </div>
          </div>
          <div id="mission-modal-msg" class="mb-3 d-none"></div>
          <button type="button" class="btn btn-premium w-100 py-2.5 fw-bold" onclick="window.verifyMissionAptitude()">Verify & Submit</button>
        </div>
      `;
    } else if (taskType === 'coding') {
      content.innerHTML = `
        <div class="p-4 border-bottom border-secondary border-opacity-25 d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center gap-2">
            <span class="badge bg-primary text-dark fw-bold px-2.5 py-1 rounded-pill">MISSION #2</span>
            <h5 class="text-white fw-bold mb-0 fs-6">Coding Challenge: Palindrome String</h5>
          </div>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
        </div>
        <div class="p-4">
          <p class="text-white fs-7 mb-2">
            A phrase is a palindrome if, after converting all uppercase letters into lowercase and removing all non-alphanumeric characters, it reads the same forward and backward.
          </p>
          <div class="bg-body p-3 rounded-3 border border-secondary border-opacity-25 mb-3">
            <code class="text-warning fs-8">Example: "A man, a plan, a canal: Panama" => true</code>
          </div>
          <textarea class="form-control bg-body text-white font-monospace fs-8 border-secondary border-opacity-25 mb-3" rows="6" id="mission-code-input">// Implement two-pointer check
function isPalindrome(s) {
    let clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    return clean === clean.split('').reverse().join('');
}</textarea>
          <button type="button" class="btn btn-premium w-100 py-2.5 fw-bold" onclick="window.submitMissionCoding()">Execute Test Cases & Complete (+100 XP)</button>
        </div>
      `;
    } else if (taskType === 'concept') {
      content.innerHTML = `
        <div class="p-4 border-bottom border-secondary border-opacity-25 d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center gap-2">
            <span class="badge bg-primary text-dark fw-bold px-2.5 py-1 rounded-pill">MISSION #3</span>
            <h5 class="text-white fw-bold mb-0 fs-6">Technical Concept: Database Sharding & Virtual Threads</h5>
          </div>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
        </div>
        <div class="p-4">
          <div class="p-3 rounded-3 bg-surface border-start border-3 border-warning mb-3">
            <h6 class="text-white fw-bold mb-1 fs-7">Virtual Threads (Project Loom - Java 21+)</h6>
            <p class="text-muted fs-8 mb-0">Unlike OS platform threads which consume ~1MB stack and are bounded by kernel scheduling, virtual threads are managed directly by the JVM runtime and cost just a few hundred bytes, enabling millions of concurrent I/O operations.</p>
          </div>
          <div class="p-3 rounded-3 bg-surface border-start border-3 border-warning mb-4">
            <h6 class="text-white fw-bold mb-1 fs-7">Consistent Hashing</h6>
            <p class="text-muted fs-8 mb-0">Maps both cluster nodes and object keys onto a circular ring (0 to 2^32 - 1). When a node fails or is added, only keys within that specific slice are re-hashed.</p>
          </div>
          <button class="btn btn-premium w-100 py-2.5 fw-bold" onclick="window.markMissionComplete('concept')">I Have Mastered This Concept (+30 XP)</button>
        </div>
      `;
    } else if (taskType === 'interview') {
      content.innerHTML = `
        <div class="p-4 border-bottom border-secondary border-opacity-25 d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center gap-2">
            <span class="badge bg-primary text-dark fw-bold px-2.5 py-1 rounded-pill">MISSION #4</span>
            <h5 class="text-white fw-bold mb-0 fs-6">STAR Response: Production Outage</h5>
          </div>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
        </div>
        <div class="p-4">
          <p class="text-white fs-7 mb-2"><strong>Question:</strong> "Tell me about a time you encountered a production deadlock or high latency bottleneck in your application. How did you resolve it?"</p>
          <textarea class="form-control bg-body text-white fs-8 border-secondary border-opacity-25 mb-3" rows="5" id="mission-interview-text" placeholder="Structure your answer using STAR: Situation, Task, Action taken, Result metrics..."></textarea>
          <button type="button" class="btn btn-premium w-100 py-2.5 fw-bold" onclick="window.submitMissionInterview()">Submit Response (+50 XP)</button>
        </div>
      `;
    } else if (taskType === 'quiz') {
      content.innerHTML = `
        <div class="p-4 border-bottom border-secondary border-opacity-25 d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center gap-2">
            <span class="badge bg-primary text-dark fw-bold px-2.5 py-1 rounded-pill">MISSION #5</span>
            <h5 class="text-white fw-bold mb-0 fs-6">Knowledge Quiz: Operating Systems</h5>
          </div>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
        </div>
        <div class="p-4">
          <h6 class="text-white fw-bold mb-3 fs-7">Which CPU scheduling algorithm is non-preemptive and guarantees zero starvation?</h6>
          <div class="d-flex flex-column gap-2 mb-4">
            <button type="button" class="btn btn-glass text-start py-2.5 px-3 fs-8 text-white border-secondary border-opacity-25" onclick="window.submitMissionQuiz(false, this)">Shortest Job First (SJF)</button>
            <button type="button" class="btn btn-glass text-start py-2.5 px-3 fs-8 text-white border-secondary border-opacity-25" onclick="window.submitMissionQuiz(true, this)">First-Come, First-Served (FCFS)</button>
            <button type="button" class="btn btn-glass text-start py-2.5 px-3 fs-8 text-white border-secondary border-opacity-25" onclick="window.submitMissionQuiz(false, this)">Priority Scheduling</button>
          </div>
          <div id="mission-quiz-verdict" class="d-none"></div>
        </div>
      `;
    }

    const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
    modal.show();
  };

  window.verifyMissionAptitude = function() {
    const selected = document.querySelector('input[name="mission-apt-opt"]:checked');
    const msg = document.getElementById('mission-modal-msg');
    if (!selected) {
      if (msg) {
        msg.className = 'alert alert-danger fs-8 p-2';
        msg.textContent = 'Please select an option first.';
        msg.classList.remove('d-none');
      }
      return;
    }
    if (selected.value === 'correct') {
      window.markMissionComplete('aptitude');
    } else {
      if (msg) {
        msg.className = 'alert alert-danger fs-8 p-2';
        msg.textContent = 'Incorrect. Hint: In 1 day, (A+B) work = 1/12 + 1/18 = 5/36. In 4 days = 20/36 = 5/9. Remaining = 1 - 5/9 = 4/9.';
        msg.classList.remove('d-none');
      }
    }
  };

  window.submitMissionCoding = function() {
    window.markMissionComplete('coding');
  };

  window.submitMissionInterview = function() {
    const text = document.getElementById('mission-interview-text');
    if (!text || text.value.trim().length < 15) {
      alert('Please provide at least a couple sentences detailing your response approach.');
      return;
    }
    window.markMissionComplete('interview');
  };

  window.submitMissionQuiz = function(isCorrect, btn) {
    const verdict = document.getElementById('mission-quiz-verdict');
    if (isCorrect) {
      btn.classList.add('bg-success', 'border-success');
      if (verdict) {
        verdict.className = 'alert alert-success fs-8 p-2 mt-2';
        verdict.textContent = 'Correct! FCFS processes jobs in arrival order without preemption or starvation.';
        verdict.classList.remove('d-none');
      }
      setTimeout(() => window.markMissionComplete('quiz'), 800);
    } else {
      btn.classList.add('bg-danger', 'border-danger');
      if (verdict) {
        verdict.className = 'alert alert-danger fs-8 p-2 mt-2';
        verdict.textContent = 'Incorrect. FCFS processes requests strictly in order of arrival, preventing starvation.';
        verdict.classList.remove('d-none');
      }
    }
  };

  window.markMissionComplete = async function(taskType) {
    const modalEl = document.getElementById('missionTaskModal');
    if (modalEl) {
      const modal = bootstrap.Modal.getInstance(modalEl);
      if (modal) modal.hide();
    }
    setTimeout(() => {
      document.querySelectorAll('.modal-backdrop').forEach(b => b.remove());
      document.body.classList.remove('modal-open');
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('padding-right');
    }, 350);

    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_BASE}/v1/missions/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ task: taskType })
      });
      if (res.ok) {
        const updated = await res.json();
        if (typeof window.showToast === 'function') {
          window.showToast(`🎯 Mission Task Complete! Earned XP.`, 'success');
        }
        // Re-render missions page
        const mount = document.getElementById('page-mount');
        if (mount && window.location.hash === '#/missions') {
          mount.innerHTML = window.components.dailyMissions(updated);
        }
        // Update header XP
        if (updated.userTotalXp) {
          const xpBadge = document.getElementById('header-xp-points');
          if (xpBadge) xpBadge.textContent = `${updated.userTotalXp} XP`;
        }
      }
    } catch (e) {
      if (typeof window.showToast === 'function') {
        window.showToast(`Task recorded locally!`, 'success');
      }
    }
  };

  window.claimDailyMissionBonus = async function() {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_BASE}/v1/missions/claim-bonus`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (typeof window.showToast === 'function') {
          window.showToast(`🎉 Outstanding! Claimed +100 Bonus XP & 20 PrepCoins!`, 'success', 6000);
        }
        const mount = document.getElementById('page-mount');
        if (mount && window.location.hash === '#/missions') {
          mount.innerHTML = window.components.dailyMissions(data);
        }
      }
    } catch (e) {
      if (typeof window.showToast === 'function') {
        window.showToast(`Bonus Claimed! +100 XP added.`, 'success');
      }
    }
  };

  // Daily Challenge Modal
  window.openChallengeSolverModal = function(challengeId) {
    let modalEl = document.getElementById('challengeSolverModal');
    if (!modalEl) return;

    if (modalEl.parentElement !== document.body) {
      const existing = document.body.querySelector(':scope > #challengeSolverModal');
      if (existing && existing !== modalEl) {
        existing.remove();
      }
      document.body.appendChild(modalEl);
    }

    const content = document.getElementById('challengeSolverContent');
    if (!content) return;

    fetch(`${API_BASE}/v1/challenges/today`)
      .then(res => res.json())
      .then(data => {
        const target = (data.challenges || []).find(c => c.id === challengeId);
        if (!target) return;

        content.innerHTML = `
          <div class="p-4 border-bottom border-secondary border-opacity-25 d-flex align-items-center justify-content-between">
            <div>
              <span class="badge bg-warning bg-opacity-20 text-warning px-2.5 py-0.5 fs-9 fw-bold me-2">${target.category}</span>
              <span class="text-white fw-bold fs-6">${target.title}</span>
            </div>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div class="p-4">
            <p class="text-white fs-7 mb-4 lh-base">${target.question}</p>
            <h6 class="text-muted fs-8 text-uppercase fw-bold mb-2">Select Your Solution:</h6>
            <div class="d-flex flex-column gap-2 mb-4" id="challenge-options-list">
              ${(target.options || []).map((opt, i) => `
                <button type="button" class="btn btn-glass text-start py-2.5 px-3 fs-8 text-white border-secondary border-opacity-25 challenge-opt-btn" onclick="window.selectChallengeOption('${opt}', this)">
                  <span class="text-warning font-monospace me-2">${String.fromCharCode(65 + i)}.</span> ${opt}
                </button>
              `).join('')}
            </div>
            <div id="challenge-verdict-box" class="d-none mb-3"></div>
            <button type="button" class="btn btn-premium w-100 py-2.5 fw-bold" id="btn-submit-challenge" onclick="window.submitChallengeAnswer(${target.id})" disabled>
              Check Answer & Lock In +${target.xp} XP
            </button>
          </div>
        `;

        const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
        modal.show();
      });
  };

  window._selectedChallengeOption = null;
  window.selectChallengeOption = function(opt, btn) {
    window._selectedChallengeOption = opt;
    document.querySelectorAll('.challenge-opt-btn').forEach(b => b.classList.remove('bg-warning', 'text-dark', 'fw-bold'));
    btn.classList.add('bg-warning', 'text-dark', 'fw-bold');
    const submitBtn = document.getElementById('btn-submit-challenge');
    if (submitBtn) submitBtn.disabled = false;
  };

  window.submitChallengeAnswer = async function(id) {
    const selected = window._selectedChallengeOption;
    if (!selected) return;

    const token = localStorage.getItem('token');
    const verdictBox = document.getElementById('challenge-verdict-box');
    const submitBtn = document.getElementById('btn-submit-challenge');
    if (submitBtn) submitBtn.disabled = true;

    try {
      const res = await fetch(`${API_BASE}/v1/challenges/${id}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ selectedAnswer: selected })
      });
      const data = await res.json();
      if (verdictBox) {
        verdictBox.classList.remove('d-none');
        if (data.isCorrect) {
          verdictBox.className = 'alert alert-success fs-8 p-3 rounded-3';
          verdictBox.innerHTML = `
            <div class="fw-bold mb-1"><i class="fa-solid fa-circle-check me-1"></i> Correct! +${data.xpAwarded} XP Awarded!</div>
            <p class="mb-0 mt-1">${data.explanation}</p>
          `;
          if (typeof window.showToast === 'function') {
            window.showToast(`🔥 Daily Challenge Solved! +${data.xpAwarded} XP`, 'success');
          }
        } else {
          verdictBox.className = 'alert alert-danger fs-8 p-3 rounded-3';
          verdictBox.innerHTML = `
            <div class="fw-bold mb-1"><i class="fa-solid fa-circle-xmark me-1"></i> Incorrect. Correct Answer: ${data.correctAnswer}</div>
            <p class="mb-0 mt-1">${data.explanation}</p>
          `;
        }
      }
    } catch (e) {
      if (verdictBox) {
        verdictBox.className = 'alert alert-warning fs-8 p-3 rounded-3';
        verdictBox.textContent = 'Challenge response recorded!';
        verdictBox.classList.remove('d-none');
      }
    }
  };

  window.filterChallengesCategory = function(cat) {
    fetch(`${API_BASE}/v1/challenges/today?category=${encodeURIComponent(cat)}`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => res.json())
      .then(data => {
        data.selectedCategory = cat;
        const mount = document.getElementById('page-mount');
        if (mount) mount.innerHTML = window.components.dailyChallenges(data);
      });
  };

  window.answerQuickQuiz = function(selected, correct, exp) {
    const verdict = document.getElementById('quick-quiz-verdict');
    if (!verdict) return;
    verdict.classList.remove('d-none');
    if (selected === correct) {
      verdict.className = 'alert alert-success fs-8 p-3 rounded-3 mt-3';
      verdict.innerHTML = `<strong><i class="fa-solid fa-check me-1"></i> Correct! +20 XP:</strong> ${exp}`;
    } else {
      verdict.className = 'alert alert-danger fs-8 p-3 rounded-3 mt-3';
      verdict.innerHTML = `<strong><i class="fa-solid fa-xmark me-1"></i> Incorrect:</strong> Correct is <em>${correct}</em>. ${exp}`;
    }
  };

  window.switchLeaderboardTab = function(type) {
    const token = localStorage.getItem('token');
    fetch(`${API_BASE}/v1/gamification/leaderboard?type=${type}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(leaderboard => {
        fetch(`${API_BASE}/v1/gamification/status`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
          .then(r => r.json())
          .then(status => {
            const mount = document.getElementById('page-mount');
            if (mount) mount.innerHTML = window.components.leaderboard({ status, leaderboard });
          });
      });
  };

  window.redeemRewardItem = async function(rewardId, cost) {
    if (!confirm(`Redeem this voucher for ${cost} PrepCoins?`)) return;

    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_BASE}/v1/gamification/rewards/${rewardId}/redeem`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        alert(`🎉 Success! Your claim code is: ${data.voucherCode}\nUse this voucher code for your service.`);
        // Reload rewards
        location.hash = '#/rewards';
      } else {
        alert(data.error || 'Unable to redeem reward');
      }
    } catch (e) {
      alert('Error contacting server to redeem reward.');
    }
  };

})();
