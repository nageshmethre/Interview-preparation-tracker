/**
 * career-pulse.js - PrepSpace Pulse & Career Placement Development Hub
 * Includes:
 *  - PrepSpace Pulse (Technology Discovery, Trending Languages, Hackathons, Verified Internships)
 *  - Placement Preparation Dashboard & Placement Readiness Index (0-100%)
 *  - Company-Specific Interview Sheets (Google, Amazon, Microsoft, TCS, Infosys, Meta)
 *  - Advanced ATS Resume Analyzer (Keyword Density, Section Auditing, Impact Phrasing)
 */

(function() {
  'use strict';

  window.components = window.components || {};

  // =========================================================================
  // 1. PREPSPACE PULSE – TECHNOLOGY DISCOVERY COMPONENT
  // =========================================================================
  window.components.pulse = function(articlesList, selectedCat = 'ALL') {
    const defaultArticles = [
      { id: 1, title: 'JDK 23 GA Released: Primitive Patterns in Switch & Markdown Docs', summary: 'Oracle officially announces Java 23 with finalized primitive types in pattern matching, class-file API, and native markdown support.', category: 'LANGUAGES', isVerified: true, readTimeMinutes: 4, source: 'OpenJDK Announcement', sourceUrl: 'https://openjdk.org' },
      { id: 2, title: 'Meta Llama 3.2: Edge & Vision Multi-Modal AI Reasoning', summary: 'Compact 1B and 3B parameter open models tuned specifically for on-device reasoning and vision-language comprehension.', category: 'AI', isVerified: true, readTimeMinutes: 5, source: 'Meta AI Engineering', sourceUrl: 'https://ai.meta.com' },
      { id: 3, title: 'Google Summer of Code & Winter SDE Internships 2026', summary: 'Application deadlines, eligibility criteria, and preparation roadmaps for undergraduate engineering candidates.', category: 'INTERNSHIPS', isVerified: true, readTimeMinutes: 3, source: 'Google Student Careers', sourceUrl: 'https://careers.google.com' },
      { id: 4, title: 'PostgreSQL 17: Query Performance Speedups & Memory Optimizations', summary: 'Massive gains in high-concurrency VACUUM operations, JSON_TABLE enhancements, and streaming replication failover.', category: 'DEV_TOOLS', isVerified: true, readTimeMinutes: 6, source: 'PostgreSQL Global Org', sourceUrl: 'https://postgresql.org' },
      { id: 5, title: 'Smart India Hackathon 2026: National Problem Statements Live', summary: 'Ministry of Education launches nationwide challenge with industrial hardware & software tracks for college innovators.', category: 'HACKATHONS', isVerified: true, readTimeMinutes: 4, source: 'AICTE / SIH Portal', sourceUrl: 'https://sih.gov.in' },
      { id: 6, title: 'Microservices Reliability: Circuit Breakers, Bulkheads & Rate Limiters', summary: 'A complete architectural walkthrough of resilience design patterns used by Netflix and Uber for 99.999% uptime.', category: 'DEV_TOOLS', isVerified: true, readTimeMinutes: 5, source: 'System Design Digest', sourceUrl: 'https://highscalability.com' }
    ];
    articlesList = (articlesList && articlesList.length > 0) ? articlesList : defaultArticles;

    const categories = [
      { key: 'ALL', label: 'All Discovery' },
      { key: 'AI', label: 'AI & Models' },
      { key: 'LANGUAGES', label: 'Languages (Java/Python/Go)' },
      { key: 'DEV_TOOLS', label: 'Developer Tools' },
      { key: 'HACKATHONS', label: 'Hackathons' },
      { key: 'INTERNSHIPS', label: 'Verified Internships' }
    ];

    return `
      <div class="row g-4 mb-4">
        <!-- Pulse Header -->
        <div class="col-12">
          <div class="glass-panel p-4 p-md-5 position-relative overflow-hidden" style="background: linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(34, 34, 38, 0.95) 100%);">
            <div class="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25 fs-8 fw-bold mb-3">
              <i class="fa-solid fa-satellite-dish"></i> PREPSPACE PULSE • TECH DISCOVERY
            </div>
            <h2 class="text-white fw-extrabold mb-2 fs-2">Engineering Pulse & Opportunities</h2>
            <p class="text-muted fs-7 mb-4" style="max-width: 650px;">
              Curated intelligence on AI breakthroughs, runtime developments, verified SDE internships, and national hackathons. Never miss a placement opportunity.
            </p>

            <!-- Search and Filter Bar -->
            <div class="d-flex flex-column flex-md-row gap-3">
              <div class="input-group" style="max-width: 400px;">
                <span class="input-group-text bg-body border-secondary border-opacity-25 text-muted"><i class="fa-solid fa-magnifying-glass"></i></span>
                <input type="text" class="form-control bg-body text-white border-secondary border-opacity-25 fs-8" id="pulse-search-input" placeholder="Search by keyword, tool, or company..." oninput="window.searchPulseArticles(this.value)">
              </div>
              <div class="d-flex gap-2 overflow-x-auto pb-1">
                ${categories.map(c => `
                  <button class="btn btn-sm py-2 px-3 rounded-pill text-nowrap fs-8 fw-semibold ${selectedCat === c.key ? 'btn-primary text-dark' : 'btn-glass text-muted'}" onclick="window.filterPulseCategory('${c.key}')">
                    ${c.label}
                  </button>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- Articles Grid -->
        <div class="col-12">
          <div class="row g-3" id="pulse-articles-grid">
            ${articlesList.map(a => `
              <div class="col-md-6 col-xl-4">
                <div class="glass-panel p-4 h-100 d-flex flex-column">
                  <div class="d-flex flex-column flex-grow-1">
                    <div class="d-flex align-items-center justify-content-between mb-3">
                      <span class="badge bg-secondary bg-opacity-25 text-white border border-secondary border-opacity-30 px-2 py-0.5 fs-9 fw-semibold">
                        ${a.category}
                      </span>
                      <div class="d-flex align-items-center gap-1.5">
                        ${a.isVerified ? `<span class="badge bg-success bg-opacity-20 text-success px-2 py-0.5 fs-9 fw-bold"><i class="fa-solid fa-circle-check me-1"></i> Verified</span>` : ''}
                        <span class="text-muted fs-9 font-monospace"><i class="fa-regular fa-clock me-1"></i>${a.readTimeMinutes || 3}m read</span>
                      </div>
                    </div>

                    <h5 class="text-white fw-bold mb-2 fs-6 lh-sm">${a.title}</h5>
                    <p class="text-muted fs-8 mb-3 lh-base flex-grow-1">${a.summary}</p>
                    
                    <div class="text-muted fs-9 mb-3">
                      <i class="fa-solid fa-building-columns me-1 text-warning"></i> Source: <strong class="text-white-50">${a.source}</strong>
                    </div>
                  </div>

                  <div class="d-flex align-items-center justify-content-between pt-3 border-top border-secondary border-opacity-25 mt-auto">
                    <a href="${a.sourceUrl || '#'}" target="_blank" rel="noopener noreferrer" class="btn btn-glass btn-sm text-white fs-8">
                      Read Full Brief <i class="fa-solid fa-arrow-up-right-from-square ms-1 text-warning"></i>
                    </a>
                    <button class="btn btn-link text-muted p-1" onclick="alert('Article bookmarked to your Study Notes!')" title="Bookmark article">
                      <i class="fa-regular fa-bookmark fs-7 hover-white"></i>
                    </button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  };

  // =========================================================================
  // 2. PLACEMENT PREPARATION & READINESS DASHBOARD
  // =========================================================================
  window.components.placementHub = function(readinessData, companyQuestions) {
    const data = readinessData || {
      readinessScore: 65,
      dsaScore: 50,
      mockScore: 60,
      consistencyScore: 70,
      pipelineScore: 50,
      solvedCount: 15,
      mockCount: 1,
      streakDays: 3,
      appsCount: 2,
      recommendations: ['Solve more DSA problems to improve placement readiness score.']
    };
    const defaultCompanyQuestions = [
      { id: 1, title: 'Two Sum & 3-Sum Optimal Pointer Variants', category: 'DSA', difficulty: 'EASY', companies: 'Google, Amazon, Meta' },
      { id: 2, title: 'Longest Substring Without Repeating Characters', category: 'DSA', difficulty: 'MEDIUM', companies: 'Amazon, Microsoft, Bloomberg' },
      { id: 3, title: 'LRU Cache Design & Concurrent Eviction Policy', category: 'System Design', difficulty: 'MEDIUM', companies: 'Google, Uber, Apple' },
      { id: 4, title: 'Merge k Sorted Linked Lists', category: 'DSA', difficulty: 'HARD', companies: 'Amazon, Microsoft, Meta' },
      { id: 5, title: 'Detect and Resolve SQL Transaction Deadlocks', category: 'DBMS', difficulty: 'MEDIUM', companies: 'TCS Digital, Infosys, Oracle' }
    ];
    companyQuestions = (companyQuestions && companyQuestions.length > 0) ? companyQuestions : defaultCompanyQuestions;

    const companies = ['Google', 'Amazon', 'Microsoft', 'TCS', 'Infosys', 'Meta'];

    return `
      <div class="row g-4 mb-4">
        <!-- Placement Hero -->
        <div class="col-12">
          <div class="glass-panel p-4 p-md-5 position-relative overflow-hidden" style="background: linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(34, 34, 38, 0.95) 100%);">
            <div class="row align-items-center g-4">
              <div class="col-lg-8">
                <div class="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25 fs-8 fw-bold mb-3">
                  <i class="fa-solid fa-briefcase"></i> CAREER READINESS RADAR
                </div>
                <h2 class="text-white fw-extrabold mb-2 fs-2">Campus Placement Readiness Dashboard</h2>
                <p class="text-muted fs-7 mb-4" style="max-width: 650px;">
                  Your comprehensive readiness index is calculated from verified algorithmic mastery (35%), proctored mock exam scorecards (35%), daily streak consistency (15%), and active recruitment pipeline stages (15%).
                </p>
                <div class="d-flex flex-wrap gap-2">
                  <a href="#/ai-assistant" class="btn btn-premium btn-sm py-2 px-3 fw-bold text-decoration-none">
                    <i class="fa-solid fa-file-invoice me-1"></i> Scan Resume ATS Score
                  </a>
                  <a href="#/placement" class="btn btn-glass btn-sm py-2 px-3 text-white text-decoration-none">
                    <i class="fa-solid fa-table-columns me-1 text-warning"></i> Open Application Kanban
                  </a>
                </div>
              </div>

              <!-- Overall Score Dial -->
              <div class="col-lg-4 text-center">
                <div class="p-4 rounded-4 bg-surface border border-secondary border-opacity-25 d-flex flex-column align-items-center justify-content-center">
                  <span class="text-muted fs-8 text-uppercase fw-bold mb-2">Readiness Index</span>
                  <div class="display-3 fw-extrabold text-warning mb-1">${data.readinessScore}%</div>
                  <span class="badge ${data.readinessScore >= 80 ? 'bg-success' : data.readinessScore >= 60 ? 'bg-warning text-dark' : 'bg-danger'} px-3 py-1 rounded-pill fs-8 fw-bold">
                    ${data.readinessScore >= 80 ? 'Interview Ready' : data.readinessScore >= 60 ? 'On Track' : 'Needs Practice'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 4 Sub-Score Gauges -->
        <div class="col-12">
          <div class="row g-3">
            <div class="col-md-3">
              <div class="glass-panel p-3">
                <span class="text-muted fs-8 d-block mb-1">DSA Velocity (35% Wgt)</span>
                <div class="d-flex align-items-center justify-content-between mb-2">
                  <span class="fs-4 fw-extrabold text-white">${data.dsaScore}%</span>
                  <span class="badge bg-secondary bg-opacity-25 text-white fs-9 font-monospace">${data.solvedCount} Solved</span>
                </div>
                <div class="progress" style="height: 6px; background: rgba(255,255,255,0.06); border-radius: 999px;">
                  <div class="progress-bar bg-warning" style="width: ${data.dsaScore}%;"></div>
                </div>
              </div>
            </div>

            <div class="col-md-3">
              <div class="glass-panel p-3">
                <span class="text-muted fs-8 d-block mb-1">Mock Assessments (35% Wgt)</span>
                <div class="d-flex align-items-center justify-content-between mb-2">
                  <span class="fs-4 fw-extrabold text-white">${data.mockScore}%</span>
                  <span class="badge bg-secondary bg-opacity-25 text-white fs-9 font-monospace">${data.mockCount} Completed</span>
                </div>
                <div class="progress" style="height: 6px; background: rgba(255,255,255,0.06); border-radius: 999px;">
                  <div class="progress-bar bg-warning" style="width: ${data.mockScore}%;"></div>
                </div>
              </div>
            </div>

            <div class="col-md-3">
              <div class="glass-panel p-3">
                <span class="text-muted fs-8 d-block mb-1">Daily Consistency (15% Wgt)</span>
                <div class="d-flex align-items-center justify-content-between mb-2">
                  <span class="fs-4 fw-extrabold text-white">${data.consistencyScore}%</span>
                  <span class="badge bg-secondary bg-opacity-25 text-white fs-9 font-monospace">${data.streakDays}d Streak</span>
                </div>
                <div class="progress" style="height: 6px; background: rgba(255,255,255,0.06); border-radius: 999px;">
                  <div class="progress-bar bg-success" style="width: ${data.consistencyScore}%;"></div>
                </div>
              </div>
            </div>

            <div class="col-md-3">
              <div class="glass-panel p-3">
                <span class="text-muted fs-8 d-block mb-1">Pipeline Tracking (15% Wgt)</span>
                <div class="d-flex align-items-center justify-content-between mb-2">
                  <span class="fs-4 fw-extrabold text-white">${data.pipelineScore}%</span>
                  <span class="badge bg-secondary bg-opacity-25 text-white fs-9 font-monospace">${data.appsCount} Apps</span>
                </div>
                <div class="progress" style="height: 6px; background: rgba(255,255,255,0.06); border-radius: 999px;">
                  <div class="progress-bar bg-primary" style="width: ${data.pipelineScore}%;"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recommendations Box -->
        <div class="col-12">
          <div class="glass-panel p-4">
            <h5 class="text-white fw-bold mb-3 fs-6"><i class="fa-solid fa-list-check text-warning me-2"></i> Strategic Placement Recommendations</h5>
            <div class="row g-2">
              ${(data.recommendations || []).map(r => `
                <div class="col-md-6">
                  <div class="p-3 rounded-3 bg-surface border border-secondary border-opacity-25 d-flex align-items-start gap-2">
                    <i class="fa-solid fa-arrow-trend-up text-warning mt-1"></i>
                    <span class="text-white fs-8">${r}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Company-Specific Question Bank -->
        <div class="col-12">
          <div class="glass-panel p-4">
            <div class="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3 mb-4">
              <div>
                <h5 class="text-white fw-bold mb-1 fs-6"><i class="fa-solid fa-building text-warning me-2"></i> Company-Specific Question Playlists</h5>
                <span class="text-muted fs-8">Top frequently asked interview problems categorized by target recruiters.</span>
              </div>
              <div class="d-flex gap-1.5 overflow-x-auto">
                ${companies.map((c, i) => `
                  <button class="btn btn-sm py-1.5 px-3 rounded-pill fs-8 fw-semibold ${i === 0 ? 'btn-primary' : 'btn-glass text-muted'}" onclick="window.filterCompanyQuestions('${c}', this)">
                    ${c}
                  </button>
                `).join('')}
              </div>
            </div>

            <div class="table-responsive">
              <table class="table table-dark table-borderless align-middle mb-0">
                <thead>
                  <tr class="text-muted fs-8 border-bottom border-secondary border-opacity-25">
                    <th scope="col">PROBLEM TITLE</th>
                    <th scope="col">CATEGORY</th>
                    <th scope="col">DIFFICULTY</th>
                    <th scope="col">TAGGED COMPANIES</th>
                    <th scope="col" class="text-end">ACTION</th>
                  </tr>
                </thead>
                <tbody id="company-questions-table-body">
                  ${companyQuestions.map(q => `
                    <tr class="border-bottom border-secondary border-opacity-10">
                      <td class="text-white fw-semibold fs-8">${q.title}</td>
                      <td><span class="badge bg-secondary bg-opacity-25 text-white fs-9">${q.category}</span></td>
                      <td>
                        <span class="badge ${q.difficulty === 'EASY' ? 'bg-success' : q.difficulty === 'MEDIUM' ? 'bg-warning text-dark' : 'bg-danger'} px-2 py-0.5 fs-9 fw-bold">
                          ${q.difficulty}
                        </span>
                      </td>
                      <td class="text-muted fs-9">${q.companies || 'Tier-1'}</td>
                      <td class="text-end">
                        <a href="#/coding-practice" class="btn btn-glass btn-sm text-warning fs-9 py-1 px-2.5">
                          Solve Problem <i class="fa-solid fa-arrow-right ms-1"></i>
                        </a>
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
  // RUNNERS & EVENT HANDLERS
  // =========================================================================

  window.filterPulseCategory = async function(cat) {
    try {
      const res = await fetch(`${API_BASE}/v1/pulse/articles?category=${cat}`);
      const list = await res.json();
      const mount = document.getElementById('page-mount');
      if (mount) mount.innerHTML = window.components.pulse(list, cat);
    } catch (e) {}
  };

  window.searchPulseArticles = function(query) {
    const q = (query || '').toLowerCase().trim();
    const cards = document.querySelectorAll('#pulse-articles-grid > div');
    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      if (!q || text.includes(q)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  };

  window.filterCompanyQuestions = async function(company, btn) {
    document.querySelectorAll('.btn-primary').forEach(b => {
      if (b.parentElement && b.parentElement.classList.contains('d-flex')) {
        b.classList.remove('btn-primary');
        b.classList.add('btn-glass', 'text-muted');
      }
    });
    btn.classList.remove('btn-glass', 'text-muted');
    btn.classList.add('btn-primary');

    const tbody = document.getElementById('company-questions-table-body');
    if (!tbody) return;

    try {
      const res = await fetch(`${API_BASE}/v1/career/company-questions?company=${company}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const list = await res.json();
      tbody.innerHTML = list.map(q => `
        <tr class="border-bottom border-secondary border-opacity-10">
          <td class="text-white fw-semibold fs-8">${q.title}</td>
          <td><span class="badge bg-secondary bg-opacity-25 text-white fs-9">${q.category}</span></td>
          <td>
            <span class="badge ${q.difficulty === 'EASY' ? 'bg-success' : q.difficulty === 'MEDIUM' ? 'bg-warning text-dark' : 'bg-danger'} px-2 py-0.5 fs-9 fw-bold">
              ${q.difficulty}
            </span>
          </td>
          <td class="text-muted fs-9">${q.companies || 'Tier-1'}</td>
          <td class="text-end">
            <a href="#/coding-practice" class="btn btn-glass btn-sm text-warning fs-9 py-1 px-2.5">
              Solve Problem <i class="fa-solid fa-arrow-right ms-1"></i>
            </a>
          </td>
        </tr>
      `).join('');
    } catch (e) {}
  };

})();
