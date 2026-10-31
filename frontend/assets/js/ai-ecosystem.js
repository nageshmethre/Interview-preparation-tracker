/**
 * ai-ecosystem.js - PrepSpace Intelligent AI Learning Ecosystem
 * Includes:
 *  - AI Personal Mentor (Goals, Weak-Topic Diagnostics, 7-Day Action Plan)
 *  - AI Doubt Solver (Text/Code/Image queries, Step-by-Step Breakdown, Related Practice)
 *  - AI Interviewer (Voice-Enabled FAANG & HR Simulator, 4-Axis Rubric Scorecard)
 *  - AI Career Roadmap (8 High-Demand Career Tracks with Interactive Milestones)
 *  - AI Coding Assistant (Explanations, Bug Hunting, Complexity & Progressive Hints)
 */

(function() {
  'use strict';

  window.components = window.components || {};

  // =========================================================================
  // 1. AI PERSONAL MENTOR COMPONENT
  // =========================================================================
  window.components.aiMentor = function(diagnostics, studyPlan, careerGoal) {
    careerGoal = careerGoal || { targetTrack: 'Software Developer', currentLevel: 'Beginner' };

    return `
      <div class="row g-4 mb-4">
        <!-- Mentor Header -->
        <div class="col-12">
          <div class="glass-panel p-4 p-md-5 position-relative overflow-hidden" style="background: linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(34, 34, 38, 0.95) 100%);">
            <div class="row align-items-center g-4">
              <div class="col-lg-8">
                <div class="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25 fs-8 fw-bold mb-3">
                  <i class="fa-solid fa-brain"></i> PREPSPACE AI MENTOR DESK
                </div>
                <h2 class="text-white fw-extrabold mb-2 fs-2">AI Personal Career & Engineering Mentor</h2>
                <p class="text-muted fs-7 mb-4" style="max-width: 650px;">
                  Your 24/7 dedicated mentor monitors your problem submission logs, flags conceptual weak spots, and compiles daily study schedules aligned with top hiring rubrics.
                </p>
                <div class="d-flex flex-wrap gap-2">
                  <button class="btn btn-premium btn-sm py-2 px-3 fw-bold" onclick="window.refreshMentorDiagnostic()">
                    <i class="fa-solid fa-arrows-rotate me-1"></i> Re-Scan Learning Performance
                  </button>
                  <a href="#/career-roadmaps" class="btn btn-glass btn-sm py-2 px-3 text-white">
                    <i class="fa-solid fa-map-location-dot me-1 text-warning"></i> View Track Roadmaps
                  </a>
                </div>
              </div>

              <!-- Mentor Avatar Card -->
              <div class="col-lg-4 text-center">
                <div class="p-4 rounded-4 bg-surface border border-secondary border-opacity-25">
                  <div class="d-inline-flex align-items-center justify-content-center rounded-circle mb-3" style="width: 64px; height: 64px; background: rgba(245, 158, 11, 0.15);">
                    <i class="fa-solid fa-robot fs-2 text-warning"></i>
                  </div>
                  <h5 class="text-white fw-bold mb-1 fs-6">Mentor Status: Active</h5>
                  <p class="text-muted fs-8 mb-2">Target: <strong class="text-warning">${careerGoal.targetTrack}</strong></p>
                  <span class="badge bg-success bg-opacity-20 text-success px-2.5 py-1 rounded-pill fs-9 fw-semibold">
                    <i class="fa-solid fa-circle-dot me-1"></i> Real-time Telemetry Synced
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Diagnostic Radar & Weak Area Box -->
        <div class="col-lg-6">
          <div class="glass-panel p-4 h-100">
            <div class="d-flex align-items-center justify-content-between mb-3">
              <h5 class="text-white fw-bold mb-0 fs-6"><i class="fa-solid fa-triangle-exclamation text-warning me-2"></i> Weak Subject Diagnostics</h5>
              <span class="badge bg-secondary bg-opacity-25 text-white fs-9">Automated Scan</span>
            </div>
            <div class="p-3 rounded-3 bg-surface border border-secondary border-opacity-25 text-white fs-8 mb-4 lh-base" id="mentor-diagnostic-container" style="min-height: 280px;">
              ${diagnostics ? formatMarkdown(diagnostics) : `
                <div class="mb-3">
                  <span class="badge bg-danger bg-opacity-20 text-danger border border-danger border-opacity-25 px-2 py-0.5 fs-9 fw-bold mb-2">CRITICAL GAP DETECTED</span>
                  <h6 class="text-white fw-bold fs-7 mb-1">Dynamic Programming & Tree Traversals</h6>
                  <p class="text-muted fs-8 mb-2">Recent practice telemetry indicates a 42% accuracy on 0/1 Knapsack variants and Lowest Common Ancestor queries compared to 85% on Arrays and HashMaps.</p>
                </div>
                <div class="mb-0">
                  <span class="badge bg-warning bg-opacity-20 text-warning border border-warning border-opacity-25 px-2 py-0.5 fs-9 fw-bold mb-2">RECOMMENDED REVISION</span>
                  <h6 class="text-white fw-bold fs-7 mb-1">Database Indexing & ACID Isolation Levels</h6>
                  <p class="text-muted fs-8 mb-0">High-frequency interview topic for Tier-1 engineering rounds. Prioritize B+ Tree structural lookups and Write-Ahead Logging mechanisms.</p>
                </div>
              `}
            </div>
          </div>
        </div>

        <!-- 7-Day Study Plan Generator -->
        <div class="col-lg-6">
          <div class="glass-panel p-4 h-100">
            <div class="d-flex align-items-center justify-content-between mb-3">
              <h5 class="text-white fw-bold mb-0 fs-6"><i class="fa-solid fa-calendar-check text-warning me-2"></i> Tailored 8-Week Action Plan</h5>
              <button class="btn btn-glass btn-sm fs-9 text-white" onclick="window.fetchAiStudyPlan()">
                <i class="fa-solid fa-rotate me-1 text-warning"></i> Regenerate
              </button>
            </div>
            <div class="p-3 rounded-3 bg-surface border border-secondary border-opacity-25 text-white fs-8 lh-base overflow-x-auto" id="mentor-studyplan-container" style="min-height: 280px;">
              ${studyPlan ? formatMarkdown(studyPlan) : `
                <div class="mb-3">
                  <span class="badge bg-warning bg-opacity-20 text-warning px-2 py-0.5 fs-9 fw-bold mb-2">WEEKS 1 - 2</span>
                  <h6 class="text-white fw-bold fs-7 mb-1">Data Structures Mastery: Arrays, Two-Pointers & Binary Search</h6>
                  <p class="text-muted fs-8 mb-0">Target: 30 curated LeetCode Mediums + Time & Space Complexity formal proofs.</p>
                </div>
                <div class="mb-3">
                  <span class="badge bg-secondary bg-opacity-25 text-white px-2 py-0.5 fs-9 fw-bold mb-2">WEEKS 3 - 4</span>
                  <h6 class="text-white fw-bold fs-7 mb-1">Non-Linear Structures: Trees, Graphs & BFS/DFS Traversal</h6>
                  <p class="text-muted fs-8 mb-0">Target: Topological sort, cycle detection, Dijkstra, and Union-Find algorithms.</p>
                </div>
                <div class="mb-0">
                  <span class="badge bg-success bg-opacity-20 text-success px-2 py-0.5 fs-9 fw-bold mb-2">WEEKS 5 - 8</span>
                  <h6 class="text-white fw-bold fs-7 mb-1">System Design, Database Indexing & Live Mock Sprints</h6>
                  <p class="text-muted fs-8 mb-0">Target: Low-latency caching, load balancers, rate limiters, and FAANG simulation rounds.</p>
                </div>
              `}
            </div>
          </div>
        </div>
      </div>
    `;
  };

  // =========================================================================
  // 2. AI DOUBT SOLVER COMPONENT
  // =========================================================================
  window.components.aiDoubtSolver = function() {
    return `
      <div class="row g-4 mb-4">
        <div class="col-12">
          <div class="glass-panel p-4 p-md-5">
            <div class="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25 fs-8 fw-bold mb-3">
              <i class="fa-solid fa-comments-question-check"></i> INSTANT RESOLUTION ENGINE
            </div>
            <h2 class="text-white fw-extrabold mb-2 fs-2">AI Technical Doubt Solver</h2>
            <p class="text-muted fs-7 mb-4">
              Stuck on an algorithm, mathematical proof, database deadlock, or compiler bug? Paste your question and code below for step-by-step resolution.
            </p>

            <div class="row g-4">
              <!-- Input Pane -->
              <div class="col-lg-6">
                <div class="p-4 rounded-4 bg-surface border border-secondary border-opacity-25">
                  <div class="mb-3">
                    <label class="form-label text-muted fs-8 fw-bold text-uppercase">Question Category</label>
                    <select class="form-select bg-body text-white border-secondary border-opacity-25 fs-8" id="doubt-category-select">
                      <option value="DSA">Data Structures & Algorithms</option>
                      <option value="DBMS">Database Management (SQL/Indexes)</option>
                      <option value="OS">Operating Systems & Concurrency</option>
                      <option value="Java">Java / Spring Boot Framework</option>
                      <option value="Math">Quantitative Aptitude & Logic</option>
                      <option value="SystemDesign">System Architecture & Scaling</option>
                    </select>
                  </div>

                  <div class="mb-3">
                    <label class="form-label text-muted fs-8 fw-bold text-uppercase">Describe Your Doubt</label>
                    <textarea class="form-control bg-body text-white fs-8 border-secondary border-opacity-25" id="doubt-question-input" rows="4" placeholder="e.g. Why does my recursive DFS on binary trees produce a StackOverflowError on skewed inputs? How do I optimize it to O(1) space?"></textarea>
                  </div>

                  <div class="mb-3">
                    <label class="form-label text-muted fs-8 fw-bold text-uppercase">Code Snippet (Optional)</label>
                    <textarea class="form-control bg-body text-white font-monospace fs-8 border-secondary border-opacity-25" id="doubt-code-input" rows="5" placeholder="// Paste your snippet here for error debugging..."></textarea>
                  </div>

                  <button class="btn btn-premium w-100 py-2.5 fw-bold" id="btn-submit-doubt" onclick="window.resolveStudentDoubt()">
                    <i class="fa-solid fa-wand-magic-sparkles me-1.5"></i> Resolve Doubt Step-by-Step
                  </button>
                </div>
              </div>

              <!-- Output Breakdown Pane -->
              <div class="col-lg-6">
                <div class="p-4 rounded-4 bg-surface border border-secondary border-opacity-25 h-100 d-flex flex-column">
                  <h6 class="text-white fw-bold mb-3 fs-7"><i class="fa-solid fa-graduation-cap text-warning me-2"></i> Structured Explanation</h6>
                  <div class="flex-grow-1 overflow-y-auto text-white fs-8 lh-base" id="doubt-solution-output">
                    <div class="text-center py-5 text-muted">
                      <i class="fa-regular fa-comment-dots fs-1 mb-2 d-block opacity-30"></i>
                      Ask a question on the left to receive an instant, step-by-step breakdown with computational complexity bounds.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  // =========================================================================
  // 3. AI INTERVIEWER SIMULATOR COMPONENT
  // =========================================================================
  window.components.aiInterviewer = function() {
    return `
      <div class="row g-4 mb-4">
        <div class="col-12">
          <div class="glass-panel p-4 p-md-5">
            <div class="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25 fs-8 fw-bold mb-3">
              <i class="fa-solid fa-microphone-lines"></i> FAANG & CAMPUS SIMULATOR
            </div>
            <h2 class="text-white fw-extrabold mb-2 fs-2">AI Voice & Technical Interview Simulator</h2>
            <p class="text-muted fs-7 mb-4">
              Simulate high-pressure technical and behavioral rounds. The AI reads questions aloud, records your verbal or typed response, and grades you against standard FAANG rubrics.
            </p>

            <!-- Configuration Bar -->
            <div class="p-3 rounded-4 bg-surface border border-secondary border-opacity-25 mb-4">
              <div class="row g-3 align-items-end">
                <div class="col-md-3">
                  <label class="form-label text-muted fs-9 text-uppercase fw-bold mb-1">Interview Round</label>
                  <select class="form-select bg-body text-white border-secondary border-opacity-25 fs-8" id="ai-interview-type">
                    <option value="TECHNICAL">Technical Deep-Dive</option>
                    <option value="HR">HR Behavioral (STAR)</option>
                    <option value="CODING">Live Coding Approach</option>
                    <option value="DBMS">Database & SQL Design</option>
                    <option value="CS">Core OS & Networks</option>
                  </select>
                </div>
                <div class="col-md-3">
                  <label class="form-label text-muted fs-9 text-uppercase fw-bold mb-1">Company Persona</label>
                  <select class="form-select bg-body text-white border-secondary border-opacity-25 fs-8" id="ai-interview-company">
                    <option value="Google">Google (L4/L5 Rubric)</option>
                    <option value="Amazon">Amazon (Leadership Principles)</option>
                    <option value="Microsoft">Microsoft (Architecture)</option>
                    <option value="TCS">TCS Digital / Prime</option>
                    <option value="General">General Tier-1 Product</option>
                  </select>
                </div>
                <div class="col-md-3">
                  <label class="form-label text-muted fs-9 text-uppercase fw-bold mb-1">Target Role</label>
                  <input type="text" class="form-control bg-body text-white border-secondary border-opacity-25 fs-8" id="ai-interview-role" value="Software Development Engineer">
                </div>
                <div class="col-md-3">
                  <button class="btn btn-premium w-100 py-2 fs-8 fw-bold" onclick="window.generateNextInterviewQuestion()">
                    <i class="fa-solid fa-play me-1"></i> Start Round Question
                  </button>
                </div>
              </div>
            </div>

            <!-- Active Interview Stage Area -->
            <div class="row g-4" id="ai-interview-active-stage">
              <!-- Left: Interviewer Prompt -->
              <div class="col-lg-6">
                <div class="p-4 rounded-4 bg-surface border border-secondary border-opacity-25 h-100 d-flex flex-column justify-content-between" style="min-height: 480px;">
                  <div>
                    <div class="d-flex align-items-center justify-content-between mb-3">
                      <span class="badge bg-warning bg-opacity-20 text-warning px-2.5 py-1 fs-9 fw-bold">INTERVIEWER</span>
                      <button class="btn btn-glass btn-sm text-warning" id="btn-speak-question" onclick="window.speakInterviewPrompt()" title="Listen to interviewer voice">
                        <i class="fa-solid fa-volume-high me-1"></i> Listen Aloud
                      </button>
                    </div>
                    <h5 class="text-white fw-bold mb-3 fs-6" id="interview-question-title">
                      "Explain the difference between optimistic locking and pessimistic locking in relational databases. In what high-concurrency scenario would you choose one over the other?"
                    </h5>
                    <p class="text-muted fs-8 mb-4">
                      <strong>Interviewer Guidance:</strong> Structure your answer clearly. Address how database locks interact with transactions, write contention rates, and recovery rollback overhead.
                    </p>
                  </div>

                  <!-- Candidate Answer Box -->
                  <div>
                    <div class="d-flex align-items-center justify-content-between mb-2">
                      <label class="form-label text-muted fs-8 text-uppercase fw-bold mb-0">Your Answer</label>
                      <button class="btn btn-glass btn-sm text-warning py-0.5 px-2 fs-9" id="btn-toggle-speech-rec" onclick="window.toggleSpeechRecording()">
                        <i class="fa-solid fa-microphone me-1"></i> <span id="speech-rec-label">Speech-to-Text</span>
                      </button>
                    </div>
                    <textarea class="form-control bg-body text-white fs-8 border-secondary border-opacity-25 mb-3" rows="6" id="ai-candidate-answer" placeholder="Speak aloud using the microphone or type your structured response..."></textarea>
                    <button class="btn btn-premium w-100 py-2.5 fw-bold" id="btn-evaluate-interview" onclick="window.evaluateInterviewAnswer()">
                      <i class="fa-solid fa-gavel me-1.5"></i> Submit Answer for FAANG Rubric Evaluation
                    </button>
                  </div>
                </div>
              </div>

              <!-- Right: Detailed Evaluation Scorecard -->
              <div class="col-lg-6">
                <div class="p-4 rounded-4 bg-surface border border-secondary border-opacity-25 h-100 d-flex flex-column justify-content-center" id="interview-scorecard-pane" style="min-height: 480px;">
                  <div class="text-center py-5 text-muted">
                    <i class="fa-solid fa-award fs-1 mb-2 d-block opacity-30"></i>
                    Submit your response to generate an instant 4-axis performance scorecard (Accuracy, Technical Depth, Answer Structure, and Communication Clarity).
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  // =========================================================================
  // 4. AI CAREER ROADMAP COMPONENT (8 Tracks)
  // =========================================================================
  window.components.careerRoadmaps = function(roadmapsList, currentGoal) {
    const defaultTracks = [
      { track: 'Software Developer', estimatedWeeks: 12, description: 'Core Data Structures, Algorithms, Object-Oriented Design, and System Architecture.', milestones: ['DSA Problem Solving (150+ Medium)', 'High-Level & Low-Level Design', 'Multi-Threading & Concurrency'] },
      { track: 'Full Stack Developer', estimatedWeeks: 14, description: 'End-to-end web engineering covering modern frontends, robust REST/GraphQL APIs, and databases.', milestones: ['React 18 & State Architecture', 'Spring Boot / Node Microservices', 'PostgreSQL & Redis Caching'] },
      { track: 'Data Scientist', estimatedWeeks: 16, description: 'Statistical modeling, Exploratory Data Analysis, machine learning algorithms, and pipelines.', milestones: ['Advanced Python & Pandas', 'Feature Engineering & Regressors', 'Model Evaluation & Deployment'] },
      { track: 'AI/ML Engineer', estimatedWeeks: 16, description: 'Deep Learning, transformer architectures, LLM fine-tuning, embeddings, and vector databases.', milestones: ['PyTorch / TensorFlow Pipelines', 'RAG & Vector Embeddings', 'Model Serving with vLLM / ONNX'] },
      { track: 'Cybersecurity Analyst', estimatedWeeks: 10, description: 'Network security, penetration testing, threat detection, and secure coding practices.', milestones: ['OWASP Top 10 Vulnerabilities', 'Network Packet Analysis & WireShark', 'Identity & Access Management'] },
      { track: 'Cloud Engineer', estimatedWeeks: 12, description: 'Containerization, Kubernetes orchestration, cloud infrastructure as code, and CI/CD.', milestones: ['Docker Containerization', 'Kubernetes Cluster Deployment', 'Terraform Infrastructure as Code'] },
      { track: 'Java Developer', estimatedWeeks: 10, description: 'Enterprise Java, Spring Boot 3, Hibernate JPA, microservices, and message brokers.', milestones: ['Modern Java 21 Virtual Threads', 'Spring Cloud & Security', 'Kafka Event-Driven Architecture'] },
      { track: 'Python Developer', estimatedWeeks: 10, description: 'Asynchronous Python, FastAPI, distributed task queues, and automated test suites.', milestones: ['AsyncIO & Event Loops', 'FastAPI & Pydantic Validation', 'Celery & Redis Worker Queues'] }
    ];
    roadmapsList = (roadmapsList && roadmapsList.length > 0) ? roadmapsList : defaultTracks;
    currentGoal = currentGoal || { targetTrack: 'Software Developer' };

    return `
      <div class="row g-4 mb-4">
        <div class="col-12">
          <div class="glass-panel p-4 p-md-5">
            <div class="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25 fs-8 fw-bold mb-3">
              <i class="fa-solid fa-signs-post"></i> 8 TARGET ROLES
            </div>
            <h2 class="text-white fw-extrabold mb-2 fs-2">AI Interactive Career Roadmaps</h2>
            <p class="text-muted fs-7 mb-4">
              Select your dream career trajectory. Track completed milestones, view curated skill prerequisites, and accelerate your placement readiness score.
            </p>

            <div class="row g-3">
              ${roadmapsList.map(r => `
                <div class="col-md-6 col-xl-3">
                  <div class="glass-panel p-4 h-100 d-flex flex-column ${r.track === currentGoal.targetTrack ? 'border-warning' : ''}" style="background: ${r.track === currentGoal.targetTrack ? 'rgba(245, 158, 11, 0.04)' : ''};">
                    <div class="d-flex flex-column flex-grow-1">
                      <div class="d-flex align-items-center justify-content-between mb-3">
                        <span class="badge ${r.track === currentGoal.targetTrack ? 'bg-warning text-dark' : 'bg-secondary bg-opacity-25 text-white'} px-2.5 py-1 rounded-pill fs-9 fw-bold">
                          ${r.track === currentGoal.targetTrack ? '<i class=\"fa-solid fa-check me-1\"></i> ACTIVE TARGET' : 'CAREER TRACK'}
                        </span>
                        <span class="text-muted fs-9 font-monospace">${r.estimatedWeeks} Weeks</span>
                      </div>
                      <h5 class="text-white fw-bold mb-2 fs-6">${r.track}</h5>
                      <p class="text-muted fs-8 mb-3">${r.description}</p>
                      
                      <h6 class="text-muted fs-9 text-uppercase fw-bold mb-2">Key Milestones:</h6>
                      <ul class="text-white fs-8 ps-3 mb-4 flex-grow-1">
                        ${(r.milestones || []).slice(0, 3).map(m => `<li class="mb-1 text-truncate" title="${m}">${m}</li>`).join('')}
                      </ul>
                    </div>

                    ${r.track === currentGoal.targetTrack ? `
                      <button class="btn btn-glass btn-sm text-warning w-100 fw-bold border-warning-subtle mt-auto" disabled>
                        <i class="fa-solid fa-circle-check me-1"></i> Current Focus Track
                      </button>
                    ` : `
                      <button class="btn btn-glass btn-sm text-white w-100 mt-auto" onclick="window.selectCareerTrackGoal('${r.track}')">
                        Set as Active Target <i class="fa-solid fa-arrow-right ms-1 text-warning"></i>
                      </button>
                    `}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  };

  // =========================================================================
  // 5. AI CODING ASSISTANT MODAL / POPUP
  // =========================================================================
  window.components.aiCodingAssistantModal = function(problemTitle) {
    return `
      <div class="p-4 border-bottom border-secondary border-opacity-25 d-flex align-items-center justify-content-between">
        <div class="d-flex align-items-center gap-2">
          <i class="fa-solid fa-robot text-warning fs-5"></i>
          <h5 class="text-white fw-bold mb-0 fs-6">AI Coding Assistant: ${problemTitle || 'Active Problem'}</h5>
        </div>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
      </div>
      <div class="p-4">
        <div class="d-flex gap-2 overflow-x-auto mb-3">
          <button class="btn btn-sm btn-primary text-dark py-1.5 px-3 rounded-pill fs-8 fw-bold" onclick="window.runCodingAssistantAction('hint')">
            <i class="fa-solid fa-lightbulb me-1"></i> Progressive Hint
          </button>
          <button class="btn btn-sm btn-glass text-white py-1.5 px-3 rounded-pill fs-8" onclick="window.runCodingAssistantAction('explain')">
            <i class="fa-solid fa-book-open me-1 text-warning"></i> Explain Approach
          </button>
          <button class="btn btn-sm btn-glass text-white py-1.5 px-3 rounded-pill fs-8" onclick="window.runCodingAssistantAction('debug')">
            <i class="fa-solid fa-bug me-1 text-danger"></i> Find Edge Cases
          </button>
          <button class="btn btn-sm btn-glass text-white py-1.5 px-3 rounded-pill fs-8" onclick="window.runCodingAssistantAction('complexity')">
            <i class="fa-solid fa-bolt me-1 text-warning"></i> Big-O Complexity
          </button>
        </div>
        <div class="p-3 rounded-3 bg-surface border border-secondary border-opacity-25 text-white fs-8 lh-base min-h-200" id="coding-assistant-result">
          Click an action above to receive contextual assistance without spoiling the direct solution.
        </div>
      </div>
    `;
  };

  // =========================================================================
  // RUNNERS & EVENT HANDLERS
  // =========================================================================

  window.resolveStudentDoubt = async function() {
    const category = document.getElementById('doubt-category-select').value;
    const question = document.getElementById('doubt-question-input').value;
    const code = document.getElementById('doubt-code-input').value;
    const output = document.getElementById('doubt-solution-output');
    const btn = document.getElementById('btn-submit-doubt');

    if (!question || question.trim().length < 5) {
      alert('Please describe your doubt in detail first.');
      return;
    }

    if (btn) btn.disabled = true;
    if (output) output.innerHTML = `<div class="text-center py-5 text-warning"><i class="fa-solid fa-spinner fa-spin fs-2 mb-2 d-block"></i> Analyzing problem invariants & computing solution...</div>`;

    try {
      const res = await fetch(`${API_BASE}/v1/ai/doubt-solve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ category, question, code })
      });
      const data = await res.json();
      if (output) {
        output.innerHTML = `
          <div>
            ${formatMarkdown(data.explanation || '')}
            <div class="mt-4 pt-3 border-top border-secondary border-opacity-25">
              <span class="text-warning fw-bold fs-9 text-uppercase d-block mb-2">Recommended Practice Problems:</span>
              <div class="d-flex flex-wrap gap-1.5">
                ${(data.recommendedProblems || []).map(p => `<a href="#/coding-practice" class="badge bg-secondary bg-opacity-25 text-white text-decoration-none border border-secondary border-opacity-30 px-2 py-1 fs-9">${p}</a>`).join('')}
              </div>
            </div>
          </div>
        `;
      }
    } catch (e) {
      if (output) output.innerHTML = `<div class="alert alert-danger fs-8">Unable to resolve doubt. Please check network connection.</div>`;
    } finally {
      if (btn) btn.disabled = false;
    }
  };

  window.speakInterviewPrompt = function() {
    const titleEl = document.getElementById('interview-question-title');
    if (!titleEl || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(titleEl.textContent);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  window._speechRec = null;
  window.toggleSpeechRecording = function() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. You can type your answer directly into the response box.');
      return;
    }

    const label = document.getElementById('speech-rec-label');
    const answerBox = document.getElementById('ai-candidate-answer');

    if (window._speechRec) {
      window._speechRec.stop();
      window._speechRec = null;
      if (label) label.textContent = 'Speech-to-Text';
      return;
    }

    window._speechRec = new SpeechRecognition();
    window._speechRec.continuous = true;
    window._speechRec.interimResults = true;

    window._speechRec.onresult = function(event) {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        transcript += event.results[i][0].transcript;
      }
      if (answerBox) {
        answerBox.value = (answerBox.value + ' ' + transcript).trim();
      }
    };

    window._speechRec.onerror = function() {
      if (label) label.textContent = 'Speech-to-Text';
      window._speechRec = null;
    };

    window._speechRec.onend = function() {
      if (label) label.textContent = 'Speech-to-Text';
      window._speechRec = null;
    };

    window._speechRec.start();
    if (label) label.textContent = 'Listening... (Speak now)';
  };

  window.evaluateInterviewAnswer = async function() {
    const role = document.getElementById('ai-interview-role').value;
    const company = document.getElementById('ai-interview-company').value;
    const question = document.getElementById('interview-question-title').textContent;
    const candidateAnswer = document.getElementById('ai-candidate-answer').value;
    const scorecardPane = document.getElementById('interview-scorecard-pane');
    const btn = document.getElementById('btn-evaluate-interview');

    if (!candidateAnswer || candidateAnswer.trim().length < 15) {
      alert('Please provide a complete verbal or written response (at least 2-3 sentences) to evaluate.');
      return;
    }

    if (btn) btn.disabled = true;
    if (scorecardPane) {
      scorecardPane.innerHTML = `<div class="text-center py-5 text-warning"><i class="fa-solid fa-spinner fa-spin fs-2 mb-2 d-block"></i> Evaluating accuracy, technical depth & communication clarity...</div>`;
    }

    try {
      const res = await fetch(`${API_BASE}/v1/ai/interview-eval`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ role, company, question, candidateAnswer })
      });
      const data = await res.json();

      if (scorecardPane) {
        scorecardPane.innerHTML = `
          <div>
            <div class="d-flex align-items-center justify-content-between mb-3">
              <span class="badge bg-warning bg-opacity-20 text-warning px-2.5 py-1 fs-9 fw-bold">INTERVIEW SCORECARD</span>
              <div class="fs-4 fw-extrabold text-warning">${data.totalScore} / 100</div>
            </div>

            <!-- 4-Axis Rubric Breakdown -->
            <div class="row g-2 mb-3">
              <div class="col-6">
                <div class="p-2.5 rounded-3 bg-body border border-secondary border-opacity-25">
                  <small class="text-muted fs-9 d-block">Accuracy</small>
                  <span class="fw-bold fs-7 text-white">${data.accuracyScore}%</span>
                </div>
              </div>
              <div class="col-6">
                <div class="p-2.5 rounded-3 bg-body border border-secondary border-opacity-25">
                  <small class="text-muted fs-9 d-block">Technical Depth</small>
                  <span class="fw-bold fs-7 text-white">${data.technicalScore}%</span>
                </div>
              </div>
              <div class="col-6">
                <div class="p-2.5 rounded-3 bg-body border border-secondary border-opacity-25">
                  <small class="text-muted fs-9 d-block">Answer Structure</small>
                  <span class="fw-bold fs-7 text-white">${data.structureScore}%</span>
                </div>
              </div>
              <div class="col-6">
                <div class="p-2.5 rounded-3 bg-body border border-secondary border-opacity-25">
                  <small class="text-muted fs-9 d-block">Communication</small>
                  <span class="fw-bold fs-7 text-white">${data.communicationScore}%</span>
                </div>
              </div>
            </div>

            <!-- Strengths -->
            <div class="mb-3">
              <span class="text-success fw-bold fs-8 d-block mb-1"><i class="fa-solid fa-circle-check me-1"></i> Key Strengths:</span>
              <ul class="text-white fs-8 ps-3 mb-0">
                ${(data.strengths || []).map(s => `<li>${s}</li>`).join('')}
              </ul>
            </div>

            <!-- Improvement Areas -->
            <div class="mb-3">
              <span class="text-warning fw-bold fs-8 d-block mb-1"><i class="fa-solid fa-lightbulb me-1"></i> Areas to Enhance:</span>
              <ul class="text-muted fs-8 ps-3 mb-0">
                ${(data.improvements || []).map(imp => `<li>${imp}</li>`).join('')}
              </ul>
            </div>

            <!-- Model Answer -->
            <div class="p-3 rounded-3 bg-body border-start border-3 border-warning">
              <span class="text-warning fw-bold fs-9 text-uppercase d-block mb-1">FAANG Model Approach:</span>
              <p class="text-white fs-9 mb-0">${data.modelAnswer || ''}</p>
            </div>
          </div>
        `;
      }
    } catch (e) {
      if (scorecardPane) scorecardPane.innerHTML = `<div class="alert alert-danger fs-8">Evaluation failed. Please retry.</div>`;
    } finally {
      if (btn) btn.disabled = false;
    }
  };

  window.generateNextInterviewQuestion = function() {
    const type = document.getElementById('ai-interview-type').value;
    const company = document.getElementById('ai-interview-company').value;
    const titleEl = document.getElementById('interview-question-title');
    const answerBox = document.getElementById('ai-candidate-answer');
    if (answerBox) answerBox.value = '';

    const QUESTIONS_BANK = {
      'TECHNICAL': [
        'How does a B-Tree index work under the hood in PostgreSQL? Why are B-Trees preferred over Hash indexes for range queries?',
        'Describe the internal mechanism of Java Garbage Collection. What is the difference between ZGC and G1GC in low-latency systems?',
        'How would you design a distributed rate limiter that handles 100,000 requests/sec with Redis Token Bucket?'
      ],
      'HR': [
        'Tell me about a project where requirements changed dramatically midway through development. How did you realign the deliverable?',
        'Describe a time you had a technical disagreement with a team lead or peer. How was the final consensus reached?',
        'Why do you want to join our engineering organization, and what unique technical strengths do you bring?'
      ],
      'CODING': [
        'How would you find the median of two sorted arrays of different sizes in O(log(min(n, m))) time?',
        'Explain how to detect and find the start node of a cycle in a singly linked list using Floyd\'s Tortoise and Hare algorithm.',
        'Walk through your approach to implement an LRU Cache with O(1) get and put operations.'
      ],
      'DBMS': [
        'What are the trade-offs between database normalization (up to 3NF) and denormalization in high-volume read analytics?',
        'Explain write-ahead logging (WAL) and how it guarantees durability during sudden power failures.',
        'What is an index scan vs an index-only scan, and how do covering indexes eliminate heap lookups?'
      ],
      'CS': [
        'Explain the difference between a process and a thread. What resources are shared, and what resources are isolated?',
        'Walk through the 3-way TCP handshake and describe what occurs during a SYN flood attack.',
        'What causes thrashing in virtual memory systems, and how does the operating system mitigate it using the working set model?'
      ]
    };

    const list = QUESTIONS_BANK[type] || QUESTIONS_BANK['TECHNICAL'];
    const randomQ = list[Math.floor(Math.random() * list.length)];
    if (titleEl) titleEl.textContent = `"${randomQ}"`;
  };

  window.selectCareerTrackGoal = async function(track) {
    const token = localStorage.getItem('token');
    try {
      await fetch(`${API_BASE}/v1/career/goal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ targetTrack: track })
      });
      if (typeof window.showToast === 'function') {
        window.showToast(`🎯 Career Target Updated: ${track}`, 'success');
      }
      location.hash = '#/career-roadmaps';
    } catch (e) {}
  };

  window.runCodingAssistantAction = async function(action) {
    const resultBox = document.getElementById('coding-assistant-result');
    if (resultBox) resultBox.innerHTML = `<div class="text-center py-4 text-warning"><i class="fa-solid fa-spinner fa-spin me-2"></i> Generating ${action}...</div>`;

    try {
      const res = await fetch(`${API_BASE}/v1/ai/code-assistant`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          action: action,
          code: '',
          language: 'java',
          problemContext: 'Active Problem'
        })
      });
      const data = await res.json();
      if (resultBox) {
        resultBox.innerHTML = `
          <div>
            <h6 class="text-warning fw-bold mb-2 fs-7">${data.title}</h6>
            <div class="whitespace-pre-line text-white">${formatMarkdown(data.content || '')}</div>
          </div>
        `;
      }
    } catch (e) {
      if (resultBox) resultBox.textContent = 'Assistant response timed out.';
    }
  };

  // Helper markdown formatter for quick clean output
  function formatMarkdown(md) {
    if (!md) return '';
    return md
      .replace(/### (.*)/g, '<h5 class="text-white fw-bold mb-2 fs-6">$1</h5>')
      .replace(/#### (.*)/g, '<h6 class="text-warning fw-bold mb-1 fs-7">$1</h6>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="text-white-50">$1</em>')
      .replace(/> \[!(.*?)\]/g, '<div class="alert alert-warning fs-8 p-2 my-2">')
      .replace(/> (.*)/g, '<span class="text-muted fs-8 d-block ps-2 border-start border-2 border-warning">$1</span>')
      .replace(/\n\n/g, '<br/>');
  }

})();
