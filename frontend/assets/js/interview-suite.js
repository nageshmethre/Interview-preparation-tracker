/**
 * PrepSpace - 5 Advanced Career Acceleration & Interview Readiness Suites (v4.7.0)
 * 
 * Includes:
 *  #3  - Recruiter Outreach CRM (Kanban Pipeline, 0-100 Quality Score, 5 Tone Archetypes)
 *  #4  - STAR Story Vault (Teleprompter Mode, Speech-to-Text WPM Coach, Blind-Spot Radar)
 *  #6  - Peer-to-Peer Mock Arena (AI Shadow Interviewer, FAANG 4-Axis Rubric, Code Scratchpad)
 *  #7  - 60-Second Feynman Audio Bites (Podcast Studio Engine, Commute Playlist, Active Recall)
 *  #10 - Reverse Interview Kit (Cultural Risk Radar, Team Health Score, 3x5 Index Card Export)
 */

(function() {
  'use strict';

  window.components = window.components || {};

  // Safe toast notifier
  function safeToast(msg, type = 'info') {
    if (typeof window.showToast === 'function') {
      window.showToast(msg, type);
    } else {
      console.log(`[PrepSpace Toast ${type.toUpperCase()}]:`, msg);
    }
  }

  // =========================================================================
  // AUDIO SYNTH & STUDIO RECORDING ENGINE (Web Audio API)
  // =========================================================================
  const AudioSynth = {
    ctx: null,
    ambienceSource: null,
    ambienceGain: null,
    ambienceTone: null,

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      return this.ctx;
    },

    startAmbience() {
      try {
        const ctx = this.init();
        if (!ctx || this.ambienceSource) return;

        // 1. Pink noise generator for room air tone
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
          b6 = white * 0.115926;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = noiseBuffer;
        noise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320, ctx.currentTime);

        // 2. 432Hz warm harmonic focus tone
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(432, ctx.currentTime);

        const oscGain = ctx.createGain();
        oscGain.gain.setValueAtTime(0.008, ctx.currentTime);

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 1.2);

        noise.connect(filter);
        filter.connect(masterGain);
        osc.connect(oscGain);
        oscGain.connect(masterGain);
        masterGain.connect(ctx.destination);

        noise.start();
        osc.start();

        this.ambienceSource = noise;
        this.ambienceTone = osc;
        this.ambienceGain = masterGain;
      } catch (e) {
        console.warn('Studio ambience initialization notice:', e);
      }
    },

    stopAmbience() {
      if (this.ambienceGain && this.ctx) {
        try {
          this.ambienceGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8);
          setTimeout(() => {
            if (this.ambienceSource) { try { this.ambienceSource.stop(); } catch(e){} this.ambienceSource = null; }
            if (this.ambienceTone) { try { this.ambienceTone.stop(); } catch(e){} this.ambienceTone = null; }
            this.ambienceGain = null;
          }, 850);
        } catch(e) {
          if (this.ambienceSource) { try { this.ambienceSource.stop(); } catch(err){} this.ambienceSource = null; }
          this.ambienceGain = null;
        }
      }
    },

    playChime(f1 = 587.33, f2 = 880, dur = 0.25) {
      try {
        const ctx = this.init();
        if (!ctx) return;
        const now = ctx.currentTime;
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'sine';
        osc2.type = 'triangle';
        osc1.frequency.setValueAtTime(f1, now);
        osc1.frequency.exponentialRampToValueAtTime(f2, now + dur);
        osc2.frequency.setValueAtTime(f1 * 1.5, now);
        osc2.frequency.exponentialRampToValueAtTime(f2 * 1.5, now + dur);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + dur + 0.3);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + dur + 0.35);
        osc2.stop(now + dur + 0.35);
      } catch (e) {}
    },

    playBreathCue(freq = 440) {
      try {
        const ctx = this.init();
        if (!ctx) return;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.09, now + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.75);
      } catch(e) {}
    }
  };
  if (typeof window !== 'undefined') {
    window.AudioSynth = AudioSynth;
  }

  // =========================================================================
  // ASYNCHRONOUS SPEECH SYNTHESIS ENGINE
  // =========================================================================
  let cachedVoices = [];
  function initVoiceCache() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      cachedVoices = window.speechSynthesis.getVoices() || [];
      window.speechSynthesis.onvoiceschanged = () => {
        cachedVoices = window.speechSynthesis.getVoices() || [];
      };
    }
  }
  initVoiceCache();

  function getBestVoice(personaKey = 'host_deep') {
    if (!cachedVoices.length && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      cachedVoices = window.speechSynthesis.getVoices() || [];
    }

    if (personaKey === 'scholar_uk') {
      const ukVoice = cachedVoices.find(v => (v.lang === 'en-GB' || v.name.includes('UK') || v.name.includes('George') || v.name.includes('Oliver') || v.name.includes('Hazel')));
      if (ukVoice) return ukVoice;
    }

    // Natural / Neural priority
    const naturalVoice = cachedVoices.find(v => 
      (v.name.includes('Natural') || v.name.includes('Neural') || v.name.includes('Online')) && v.lang.startsWith('en')
    );
    if (naturalVoice) return naturalVoice;

    // Microsoft Guy / Christopher / Google US English
    const preferredVoice = cachedVoices.find(v => 
      (v.name.includes('Guy') || v.name.includes('Christopher') || v.name.includes('Google US English') || v.name.includes('David') || v.name.includes('Zira')) && v.lang.startsWith('en')
    );
    if (preferredVoice) return preferredVoice;

    // Any English voice
    const englishVoice = cachedVoices.find(v => v.lang.startsWith('en'));
    return englishVoice || cachedVoices[0] || null;
  }


  // =========================================================================
  // 1. RECRUITER OUTREACH & COLD EMAIL CRM (#/outreach)
  // =========================================================================

  const DEFAULT_OUTREACH_ITEMS = [
    {
      id: 'outreach-1',
      name: 'Sarah Chen',
      company: 'Stripe',
      role: 'Backend Engineering Manager',
      type: 'manager',
      status: 'call_scheduled',
      stage: 'screening',
      date: '2026-09-06',
      notes: 'Replied within 2 hours. Screening scheduled for Thursday 3 PM PST.',
      lastMessage: 'Hi Sarah, noticed Stripe’s recent expansion into unified payments infrastructure. Built idempotency microservices handling 45K rps at my previous org. Would love to learn about your engineering roadmap.'
    },
    {
      id: 'outreach-2',
      name: 'Arjun Mehta',
      company: 'Razorpay',
      role: 'Staff Platform Engineer',
      type: 'peer',
      status: 'connected',
      stage: 'sent',
      date: '2026-09-08',
      notes: 'Connected on LinkedIn. Shared engineering blog on distributed saga pattern.',
      lastMessage: 'Hey Arjun, big fan of your tech talks on distributed transaction recovery. As a backend engineer building event-driven services in Java & Kafka, excited to connect!'
    },
    {
      id: 'outreach-3',
      name: 'Emily Watson',
      company: 'Datadog',
      role: 'Senior Technical Recruiter',
      type: 'recruiter',
      status: 'note_sent',
      stage: 'sent',
      date: '2026-09-09',
      notes: 'Sent personalized 280c connection request with flagship latency metric.',
      lastMessage: 'Hi Emily, saw the SDE-2 Cloud Infrastructure req at Datadog. Recently engineered Kafka stream processing that lowered p99 latency by 45%. Would love to connect and share my resume.'
    },
    {
      id: 'outreach-4',
      name: 'Marcus Vance',
      company: 'Uber',
      role: 'Director of Platform Infrastructure',
      type: 'manager',
      status: 'identified',
      stage: 'identified',
      date: '2026-09-09',
      notes: 'Found via engineering blog on zero-copy storage. Pitch drafted.',
      lastMessage: ''
    }
  ];

  components.outreachCrm = () => {
    let items = [];
    try {
      items = JSON.parse(localStorage.getItem('prepspace_outreach_crm')) || DEFAULT_OUTREACH_ITEMS;
    } catch(e) {
      items = DEFAULT_OUTREACH_ITEMS;
    }

    // Normalizing stage
    items.forEach(i => {
      if (!i.stage) {
        if (i.status === 'call_scheduled') i.stage = 'screening';
        else if (i.status === 'referral_received' || i.status === 'offer') i.stage = 'offer';
        else if (i.status === 'note_sent' || i.status === 'connected') i.stage = 'sent';
        else i.stage = 'identified';
      }
    });

    const stats = {
      total: items.length,
      sent: items.filter(i => i.stage === 'sent' || i.stage === 'screening' || i.stage === 'offer').length,
      screenings: items.filter(i => i.stage === 'screening').length,
      offers: items.filter(i => i.stage === 'offer').length
    };
    const responseRate = stats.total ? Math.round(((stats.screenings + stats.offers) / stats.total) * 100) : 0;

    const kanbanCols = [
      { key: 'identified', label: '1. Identified', badge: 'bg-secondary', icon: 'fa-user-clock' },
      { key: 'sent', label: '2. Message Sent', badge: 'bg-info', icon: 'fa-paper-plane' },
      { key: 'screening', label: '3. Screening Set', badge: 'bg-warning', icon: 'fa-phone' },
      { key: 'offer', label: '4. Referral / Offer', badge: 'bg-success', icon: 'fa-trophy' }
    ];

    return `
      <div class="container-fluid px-3 px-md-4 py-3 suite-scroll-container">
        <!-- Header -->
        <div class="d-flex flex-wrap justify-content-between align-items-center mb-3 pb-2 border-bottom border-secondary border-opacity-15 gap-2">
          <div>
            <div class="d-flex align-items-center gap-2">
              <span class="badge bg-warning bg-opacity-25 text-warning border border-warning border-opacity-50 font-monospace fs-9">CAREER ACCELERATOR</span>
              <h4 class="text-white fw-bold m-0 fs-5">AI Recruiter Outreach & Pipeline Kanban</h4>
            </div>
            <p class="text-muted fs-8 mb-0 mt-1">Generate high-converting executive cold messages, score deliverability, and drag-track referral pipelines.</p>
          </div>
          <div class="d-flex gap-2">
            <button class="btn btn-outline-secondary btn-sm px-3" id="btn-export-outreach-csv">
              <i class="fa-solid fa-file-csv me-1 text-success"></i> Export CSV
            </button>
            <button class="btn btn-primary btn-sm px-3" data-bs-toggle="modal" data-bs-target="#addContactModal">
              <i class="fa-solid fa-user-plus me-1"></i> Add Prospect
            </button>
          </div>
        </div>

        <!-- Metric Cards -->
        <div class="row g-2 g-md-3 mb-3">
          <div class="col-6 col-md-3">
            <div class="bento-card p-2.5">
              <span class="stat-label fs-9">Total Prospects</span>
              <div class="stat-num text-white fs-4">${stats.total}</div>
              <small class="text-muted fs-9">In active funnel</small>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="bento-card p-2.5">
              <span class="stat-label fs-9">Conversion Rate</span>
              <div class="stat-num text-success fs-4">${responseRate}%</div>
              <small class="text-success fs-9"><i class="fa-solid fa-arrow-trend-up me-1"></i>Avg benchmark: 18%</small>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="bento-card p-2.5">
              <span class="stat-label fs-9">Screening Calls</span>
              <div class="stat-num text-warning fs-4">${stats.screenings}</div>
              <small class="text-warning fs-9">Interviews locked</small>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="bento-card p-2.5">
              <span class="stat-label fs-9">Endorsements & Offers</span>
              <div class="stat-num text-info fs-4">${stats.offers}</div>
              <small class="text-info fs-9">Internal champions</small>
            </div>
          </div>
        </div>

        <div class="row g-3">
          <!-- Left: AI Generator & Quality Score -->
          <div class="col-12 col-xl-5">
            <div class="card bg-dark bg-opacity-70 border-secondary border-opacity-30 rounded-3 p-3 shadow-sm h-100">
              <div class="d-flex align-items-center justify-content-between mb-2">
                <h6 class="text-white fw-bold m-0 fs-7"><i class="fa-solid fa-wand-magic-sparkles text-warning me-1.5"></i>Smart Pitch Co-Pilot</h6>
                <!-- Quality Score Badge -->
                <div id="quality-score-wrapper" class="quality-meter-badge quality-meter-high">
                  <i class="fa-solid fa-bolt"></i>
                  <span id="quality-score-text">Quality: 92/100 (Optimal)</span>
                </div>
              </div>

              <!-- Quick Tag Chips -->
              <div class="mb-2 d-flex flex-wrap gap-1 align-items-center">
                <small class="text-secondary fs-9 me-1">Insert Tag:</small>
                <button type="button" class="btn btn-glass py-0.5 px-2 fs-9 text-info outreach-insert-chip" data-tag="{{name}}">+ {{name}}</button>
                <button type="button" class="btn btn-glass py-0.5 px-2 fs-9 text-info outreach-insert-chip" data-tag="{{company}}">+ {{company}}</button>
                <button type="button" class="btn btn-glass py-0.5 px-2 fs-9 text-info outreach-insert-chip" data-tag="{{role}}">+ {{role}}</button>
                <button type="button" class="btn btn-glass py-0.5 px-2 fs-9 text-info outreach-insert-chip" data-tag="{{hook}}">+ {{hook}}</button>
              </div>

              <!-- Input Fields (Compact Grid) -->
              <div class="row g-2 mb-2">
                <div class="col-6">
                  <label class="form-label text-secondary fs-9 fw-semibold mb-0.5">Target Company</label>
                  <input type="text" id="gen-company" class="form-control form-control-sm bg-black text-white border-secondary border-opacity-50" placeholder="e.g. Stripe, Uber" value="Uber">
                </div>
                <div class="col-6">
                  <label class="form-label text-secondary fs-9 fw-semibold mb-0.5">Target Role</label>
                  <input type="text" id="gen-role" class="form-control form-control-sm bg-black text-white border-secondary border-opacity-50" placeholder="e.g. Backend SDE-2" value="Software Engineer">
                </div>
              </div>

              <div class="row g-2 mb-2">
                <div class="col-6">
                  <label class="form-label text-secondary fs-9 fw-semibold mb-0.5">Prospect Name</label>
                  <input type="text" id="gen-name" class="form-control form-control-sm bg-black text-white border-secondary border-opacity-50" placeholder="e.g. Alex" value="Alex">
                </div>
                <div class="col-6">
                  <label class="form-label text-secondary fs-9 fw-semibold mb-0.5">Prospect Persona</label>
                  <select id="gen-type" class="form-select form-select-sm bg-black text-white border-secondary border-opacity-50">
                    <option value="manager" selected>Engineering Manager</option>
                    <option value="recruiter">Technical Recruiter</option>
                    <option value="peer">Senior Peer / Tech Lead</option>
                    <option value="alumni">College / Work Alumni</option>
                  </select>
                </div>
              </div>

              <div class="mb-2">
                <label class="form-label text-secondary fs-9 fw-semibold mb-0.5">Key Tech Hook / Flagship Metric</label>
                <input type="text" id="gen-hook" class="form-control form-control-sm bg-black text-white border-secondary border-opacity-50" placeholder="e.g. high-throughput microservices in Java & Redis" value="high-throughput microservices in Java & Redis">
              </div>

              <!-- 5 Strategic Tone Archetypes -->
              <div class="mb-2">
                <label class="form-label text-secondary fs-9 fw-semibold mb-1">Pitch Strategy Archetype</label>
                <div class="btn-group w-100 flex-wrap" role="group" id="outreach-format-group">
                  <input type="radio" class="btn-check" name="outreach-fmt" id="fmt-linkedin" value="linkedin" checked>
                  <label class="btn btn-sm btn-outline-secondary fs-9 py-1" for="fmt-linkedin">LinkedIn (290c)</label>

                  <input type="radio" class="btn-check" name="outreach-fmt" id="fmt-metrics" value="metrics">
                  <label class="btn btn-sm btn-outline-secondary fs-9 py-1" for="fmt-metrics">Value Proof</label>

                  <input type="radio" class="btn-check" name="outreach-fmt" id="fmt-alumni" value="alumni">
                  <label class="btn btn-sm btn-outline-secondary fs-9 py-1" for="fmt-alumni">Alumni Bridge</label>

                  <input type="radio" class="btn-check" name="outreach-fmt" id="fmt-pain" value="pain">
                  <label class="btn btn-sm btn-outline-secondary fs-9 py-1" for="fmt-pain">Pain-Point Hook</label>

                  <input type="radio" class="btn-check" name="outreach-fmt" id="fmt-followup" value="followup">
                  <label class="btn btn-sm btn-outline-secondary fs-9 py-1" for="fmt-followup">Day-3 Followup</label>
                </div>
              </div>

              <!-- Output Textarea -->
              <div class="position-relative mb-2">
                <textarea id="gen-output" class="form-control bg-black text-white border-secondary border-opacity-50 p-2 fs-8 font-monospace" rows="4" style="resize: vertical;"></textarea>
                <!-- Character Meter Bar -->
                <div class="progress mt-1" style="height: 4px; background: rgba(255,255,255,0.08);">
                  <div id="char-meter-bar" class="progress-bar bg-success" role="progressbar" style="width: 0%;"></div>
                </div>
                <div class="d-flex justify-content-between align-items-center mt-1">
                  <span class="fs-9 font-monospace" id="gen-char-count">0 / 300 characters</span>
                  <div class="d-flex gap-1">
                    <button class="btn btn-sm btn-primary py-1 px-2.5 fs-9" id="btn-copy-outreach"><i class="fa-solid fa-copy me-1"></i> Copy</button>
                    <button class="btn btn-sm btn-outline-info py-1 px-2.5 fs-9" id="btn-launch-email"><i class="fa-solid fa-paper-plane me-1"></i> Send Email</button>
                    <button class="btn btn-sm btn-outline-light py-1 px-2.5 fs-9" id="btn-search-linkedin" title="Find on LinkedIn"><i class="fa-brands fa-linkedin me-1 text-primary"></i> Search</button>
                  </div>
                </div>
              </div>

              <div class="d-flex gap-2 mt-2">
                <button class="btn btn-outline-info btn-sm flex-grow-1" id="btn-regenerate-outreach"><i class="fa-solid fa-arrows-rotate me-1"></i> Alternate Tone</button>
                <button class="btn btn-outline-success btn-sm" id="btn-save-as-contact"><i class="fa-solid fa-floppy-disk me-1"></i> Save to Pipeline</button>
              </div>
            </div>
          </div>

          <!-- Right: 4-Stage Visual Kanban Pipeline -->
          <div class="col-12 col-xl-7">
            <div class="card bg-dark bg-opacity-70 border-secondary border-opacity-30 rounded-3 p-3 shadow-sm h-100">
              <div class="d-flex flex-wrap align-items-center justify-content-between mb-3 gap-2">
                <div class="d-flex align-items-center gap-2">
                  <h6 class="text-white fw-bold m-0 fs-7"><i class="fa-solid fa-table-columns text-primary me-1.5"></i>Outreach Pipeline Board</h6>
                  <span class="badge bg-secondary bg-opacity-30 text-white font-monospace fs-9">${items.length} Tracked</span>
                </div>
                <div class="d-flex align-items-center gap-2">
                  <input type="text" id="filter-outreach" class="form-control form-control-sm bg-black text-white border-secondary border-opacity-50" placeholder="Filter company or role..." style="width: 190px;">
                </div>
              </div>

              <!-- Kanban Columns -->
              <div class="outreach-kanban-board" id="kanban-board-container">
                ${kanbanCols.map(col => {
                  const colItems = items.filter(i => i.stage === col.key);
                  return `
                    <div class="outreach-kanban-col" data-col="${col.key}">
                      <div class="outreach-kanban-col-header text-white">
                        <span><i class="fa-solid ${col.icon} me-1 text-info"></i> ${col.label}</span>
                        <span class="badge ${col.badge} fs-9">${colItems.length}</span>
                      </div>
                      <div class="kanban-cards-wrapper flex-grow-1" id="kanban-col-${col.key}">
                        ${colItems.length === 0 ? `
                          <div class="text-center py-4 text-muted fs-9 fst-italic">No prospects</div>
                        ` : colItems.map(item => `
                          <div class="outreach-kanban-card" data-id="${item.id}">
                            <div class="d-flex justify-content-between align-items-start mb-1">
                              <span class="fw-bold text-white fs-8">${item.name}</span>
                              <span class="badge bg-dark border border-secondary border-opacity-30 text-info fs-9">${item.company}</span>
                            </div>
                            <div class="text-secondary fs-9 text-truncate mb-1.5">${item.role}</div>
                            <div class="d-flex justify-content-between align-items-center pt-1 border-top border-secondary border-opacity-15">
                              <small class="text-muted fs-9 font-monospace">${item.date}</small>
                              <div class="d-flex gap-1">
                                <button class="btn btn-glass py-0.5 px-1.5 fs-9 text-info view-kanban-note" data-id="${item.id}" title="View Note & Pitch"><i class="fa-solid fa-comment-dots"></i></button>
                                <button class="btn btn-glass py-0.5 px-1.5 fs-9 text-warning advance-kanban-stage" data-id="${item.id}" title="Advance to Next Stage"><i class="fa-solid fa-arrow-right"></i></button>
                                <button class="btn btn-glass py-0.5 px-1.5 fs-9 text-danger delete-outreach-item" data-id="${item.id}" title="Delete"><i class="fa-solid fa-trash"></i></button>
                              </div>
                            </div>
                          </div>
                        `).join('')}
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Add Prospect Modal -->
      <div class="modal fade" id="addContactModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content bg-dark text-white border-secondary border-opacity-40">
            <div class="modal-header border-secondary border-opacity-25 py-2.5">
              <h5 class="modal-title fs-6"><i class="fa-solid fa-user-plus text-primary me-2"></i>Add New Prospect to Pipeline</h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body p-3">
              <div class="mb-2">
                <label class="form-label fs-8 text-secondary fw-semibold">Prospect Full Name *</label>
                <input type="text" id="modal-c-name" class="form-control form-control-sm bg-black text-white border-secondary border-opacity-50" placeholder="e.g. Rachel Adams">
              </div>
              <div class="row g-2 mb-2">
                <div class="col-6">
                  <label class="form-label fs-8 text-secondary fw-semibold">Target Company *</label>
                  <input type="text" id="modal-c-company" class="form-control form-control-sm bg-black text-white border-secondary border-opacity-50" placeholder="e.g. Netflix">
                </div>
                <div class="col-6">
                  <label class="form-label fs-8 text-secondary fw-semibold">Target Role</label>
                  <input type="text" id="modal-c-role" class="form-control form-control-sm bg-black text-white border-secondary border-opacity-50" placeholder="e.g. Platform SDE-2">
                </div>
              </div>
              <div class="row g-2 mb-2">
                <div class="col-6">
                  <label class="form-label fs-8 text-secondary fw-semibold">Prospect Role</label>
                  <select id="modal-c-type" class="form-select form-select-sm bg-black text-white border-secondary border-opacity-50">
                    <option value="recruiter">Technical Recruiter</option>
                    <option value="manager" selected>Engineering Manager</option>
                    <option value="peer">Senior Peer / Tech Lead</option>
                    <option value="alumni">Alumni Connection</option>
                  </select>
                </div>
                <div class="col-6">
                  <label class="form-label fs-8 text-secondary fw-semibold">Initial Stage</label>
                  <select id="modal-c-stage" class="form-select form-select-sm bg-black text-white border-secondary border-opacity-50">
                    <option value="identified" selected>1. Identified</option>
                    <option value="sent">2. Message Sent</option>
                    <option value="screening">3. Screening Set</option>
                    <option value="offer">4. Referral / Offer</option>
                  </select>
                </div>
              </div>
              <div class="mb-2">
                <label class="form-label fs-8 text-secondary fw-semibold">Follow-Up Notes</label>
                <textarea id="modal-c-notes" class="form-control form-control-sm bg-black text-white border-secondary border-opacity-50" rows="2" placeholder="e.g. Connect note sent on LinkedIn. Follow up in 3 days."></textarea>
              </div>
            </div>
            <div class="modal-footer border-secondary border-opacity-25 py-2">
              <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-primary btn-sm px-3" id="btn-save-new-contact"><i class="fa-solid fa-check me-1"></i> Add to Pipeline</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Detail Slide-Over Modal (replaces native alert) -->
      <div class="modal fade" id="outreachDetailModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content bg-dark text-white border-secondary border-opacity-40">
            <div class="modal-header border-secondary border-opacity-25 py-2.5">
              <h5 class="modal-title fs-6" id="detail-modal-title"><i class="fa-solid fa-address-card text-info me-2"></i>Prospect Details</h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body p-3" id="detail-modal-body"></div>
            <div class="modal-footer border-secondary border-opacity-25 py-2">
              <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    `;
  };


  window.bindOutreachCrmEvents = () => {
    let variantIndex = 0;

    const templates = {
      linkedin: [
        (c, r, n, h) => `Hi ${n}, noticed your team at ${c} is building high-scale distributed services. With engineering experience in ${h}, I'd love to connect and follow ${c}'s tech updates. Best!`,
        (c, r, n, h) => `Hi ${n}, saw the ${r} opening at ${c}. Recently architected ${h} with 99.99% availability. Would love to connect and learn about your team's engineering priorities!`,
        (c, r, n, h) => `Hey ${n}, big fan of ${c}'s tech blog on resilient architecture. As a backend developer specialized in ${h}, I'd love to connect to your network.`
      ],
      metrics: [
        (c, r, n, h) => `Subject: ${r} role at ${c} — Engineer with proven track record in ${h}\n\nHi ${n},\n\nI've been following ${c}'s recent engineering milestones. In my recent role, I focused on ${h}, achieving a 45% reduction in p99 latency and handling 50M daily events.\n\nGiven your team's scale, I believe my background directly aligns with ${c}'s roadmap. Would you be open to a 10-minute introductory chat this week?\n\nBest regards,\n[Your Name] | [Portfolio] | [GitHub]`,
        (c, r, n, h) => `Subject: Value-add for ${c}'s engineering team (${r})\n\nHi ${n},\n\nSaw your team is hiring for ${r}. I specialize in ${h}, recently delivering a 3x throughput improvement on zero-downtime microservices.\n\nWould love to share quick insights on how we solved concurrent state locks if you have 10 minutes.\n\nCheers,\n[Your Name]`
      ],
      alumni: [
        (c, r, n, h) => `Hi ${n}, fellow alumni reaching out! Saw your incredible journey leading engineering at ${c}. I'm currently focused on ${h} and exploring the open ${r} position. Would love to connect and hear your perspective on the culture at ${c}!`,
        (c, r, n, h) => `Hey ${n}, noticed we both share a background in tech alumni networks. I've been admiring ${c}'s platform growth. As an engineer specializing in ${h}, I'd love to connect and say hello!`
      ],
      pain: [
        (c, r, n, h) => `Hi ${n}, noticed ${c} is scaling out its core data pipelines. Teams at this stage often battle p99 latency spikes and queue backpressure. Having recently solved this with ${h}, I'd love to share our architecture notes and discuss the ${r} req.`,
        (c, r, n, h) => `Hey ${n}, saw ${c}'s engineering post on handling high-concurrency spikes. I recently designed ${h} to prevent cascade failovers. Open to a brief 10-min chat to discuss your technical challenges?`
      ],
      followup: [
        (c, r, n, h) => `Hi ${n}, following up on my previous note regarding the ${r} role at ${c}. I recently published a technical case study on ${h} that relates to your stack. Would love to share insights if you have 5 minutes!\n\nBest, [Your Name]`,
        (c, r, n, h) => `Hey ${n}, bumping this to the top of your inbox. Still very excited about ${c}'s mission and the ${r} position. Hope you have a productive rest of the week!\n\nCheers, [Your Name]`
      ]
    };

    function calculateQualityScore(text, format) {
      let score = 50;
      const lower = text.toLowerCase();

      // Spam/Desperation words check (-15 each)
      const spamWords = ['hire me', 'give me a job', 'looking for a job', 'unemployed', 'desperate', 'urgent', 'please help me', 'begging'];
      spamWords.forEach(w => {
        if (lower.includes(w)) score -= 15;
      });

      // Personalization (+15)
      const comp = document.getElementById('gen-company')?.value.trim().toLowerCase();
      if (comp && comp !== 'uber' && lower.includes(comp)) score += 15;
      else if (lower.includes('uber') || lower.includes('stripe')) score += 10;

      // Tech Hook density (+15)
      const techTerms = ['latency', 'throughput', 'kafka', 'redis', 'microservices', 'distributed', 'pipeline', 'architecture', 'resilient', 'scale', 'concurrency', 'p99'];
      let termCount = 0;
      techTerms.forEach(t => { if (lower.includes(t)) termCount++; });
      score += Math.min(20, termCount * 7);

      // Low Friction CTA (+15)
      const ctas = ['10-min', '10-minute', 'introductory', 'connect', 'roadmap', 'say hello', 'share insights', 'perspective'];
      let hasCta = false;
      ctas.forEach(c => { if (lower.includes(c)) hasCta = true; });
      if (hasCta) score += 15;

      // Length optimization (+15)
      if (format === 'linkedin') {
        if (text.length >= 180 && text.length <= 290) score += 15;
        else if (text.length > 300) score -= 25;
      } else {
        if (text.length >= 250 && text.length <= 800) score += 15;
      }

      return Math.max(20, Math.min(98, score));
    }

    function updateGenerator() {
      const company = document.getElementById('gen-company')?.value || 'TechCorp';
      const role = document.getElementById('gen-role')?.value || 'Software Engineer';
      const name = document.getElementById('gen-name')?.value || 'Engineering Lead';
      const hook = document.getElementById('gen-hook')?.value || 'scalable cloud microservices';

      const fmtRadio = document.querySelector('input[name="outreach-fmt"]:checked');
      const fmt = fmtRadio ? fmtRadio.value : 'linkedin';

      const list = templates[fmt] || templates.linkedin;
      const fn = list[variantIndex % list.length];
      const text = fn(company, role, name, hook);

      const outEl = document.getElementById('gen-output');
      const countEl = document.getElementById('gen-char-count');
      const barEl = document.getElementById('char-meter-bar');
      const qWrapper = document.getElementById('quality-score-wrapper');
      const qText = document.getElementById('quality-score-text');

      if (outEl) outEl.value = text;
      const len = text.length;

      // Quality score computation
      const qScore = calculateQualityScore(text, fmt);
      if (qWrapper && qText) {
        if (qScore >= 85) {
          qWrapper.className = 'quality-meter-badge quality-meter-high';
          qText.textContent = `Quality: ${qScore}/100 (Optimal)`;
        } else if (qScore >= 70) {
          qWrapper.className = 'quality-meter-badge quality-meter-med';
          qText.textContent = `Quality: ${qScore}/100 (Solid)`;
        } else {
          qWrapper.className = 'quality-meter-badge quality-meter-low';
          qText.textContent = `Quality: ${qScore}/100 (Needs Work)`;
        }
      }

      if (countEl) {
        countEl.textContent = `${len} / ${fmt === 'linkedin' ? '300 characters' : 'Unlimited email'}`;
        if (fmt === 'linkedin') {
          if (len <= 280) {
            countEl.className = 'fs-9 font-monospace text-success';
            if (barEl) { barEl.className = 'progress-bar bg-success'; barEl.style.width = Math.min(100, (len / 300) * 100) + '%'; }
          } else if (len <= 300) {
            countEl.className = 'fs-9 font-monospace text-warning';
            if (barEl) { barEl.className = 'progress-bar bg-warning'; barEl.style.width = (len / 300) * 100 + '%'; }
          } else {
            countEl.className = 'fs-9 font-monospace text-danger';
            if (barEl) { barEl.className = 'progress-bar bg-danger'; barEl.style.width = '100%'; }
          }
        } else {
          countEl.className = 'fs-9 font-monospace text-muted';
          if (barEl) { barEl.className = 'progress-bar bg-info'; barEl.style.width = '65%'; }
        }
      }
    }

    ['gen-company', 'gen-role', 'gen-name', 'gen-hook'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', updateGenerator);
    });

    document.querySelectorAll('input[name="outreach-fmt"]').forEach(r => {
      r.addEventListener('change', () => {
        variantIndex = 0;
        updateGenerator();
      });
    });

    // Tag Insertion Chips (inserts at cursor in textarea)
    document.querySelectorAll('.outreach-insert-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const tag = chip.getAttribute('data-tag');
        const out = document.getElementById('gen-output');
        if (out) {
          const start = out.selectionStart || out.value.length;
          const end = out.selectionEnd || out.value.length;
          out.value = out.value.substring(0, start) + ' ' + tag + ' ' + out.value.substring(end);
          out.focus();
          safeToast(`Inserted ${tag}`, 'info');
        }
      });
    });

    // Alternate Tone
    const regenBtn = document.getElementById('btn-regenerate-outreach');
    if (regenBtn) {
      regenBtn.addEventListener('click', () => {
        variantIndex++;
        updateGenerator();
        AudioSynth.playChime(660, 880, 0.2);
        safeToast('Generated alternate message variant!', 'info');
      });
    }

    // Launch Email
    const emailBtn = document.getElementById('btn-launch-email');
    if (emailBtn) {
      emailBtn.addEventListener('click', () => {
        const company = document.getElementById('gen-company')?.value || 'Tech';
        const role = document.getElementById('gen-role')?.value || 'Engineer';
        const body = document.getElementById('gen-output')?.value || '';
        const subject = `Application / Inquiry: ${role} at ${company}`;
        window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
      });
    }

    // Find on LinkedIn
    const liBtn = document.getElementById('btn-search-linkedin');
    if (liBtn) {
      liBtn.addEventListener('click', () => {
        const company = document.getElementById('gen-company')?.value || '';
        const name = document.getElementById('gen-name')?.value || '';
        const query = `${name} ${company} recruiter`.trim();
        window.open(`https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(query)}`, '_blank');
      });
    }

    // Copy Note
    const copyBtn = document.getElementById('btn-copy-outreach');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const text = document.getElementById('gen-output')?.value;
        if (text) {
          navigator.clipboard.writeText(text).then(() => {
            AudioSynth.playChime(523, 659, 0.25);
            safeToast('Message copied to clipboard!', 'success');
          });
        }
      });
    }

    // Export CSV
    const exportCsvBtn = document.getElementById('btn-export-outreach-csv');
    if (exportCsvBtn) {
      exportCsvBtn.addEventListener('click', () => {
        let items = [];
        try {
          items = JSON.parse(localStorage.getItem('prepspace_outreach_crm')) || DEFAULT_OUTREACH_ITEMS;
        } catch(e) { items = DEFAULT_OUTREACH_ITEMS; }

        let csv = 'Name,Company,Role,Persona,Stage,Date,Notes\n';
        items.forEach(i => {
          csv += `"${i.name}","${i.company}","${i.role}","${i.type}","${i.stage}","${i.date}","${(i.notes||'').replace(/"/g, '""')}"\n`;
        });
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `prepspace_outreach_pipeline_${new Date().toISOString().slice(0,10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
        safeToast('Exported outreach pipeline CSV!', 'success');
      });
    }

    // Save as Prospect
    const saveContactBtn = document.getElementById('btn-save-as-contact');
    if (saveContactBtn) {
      saveContactBtn.addEventListener('click', () => {
        const name = document.getElementById('gen-name')?.value || 'New Contact';
        const company = document.getElementById('gen-company')?.value || 'Company';
        const role = document.getElementById('gen-role')?.value || 'Role';
        const type = document.getElementById('gen-type')?.value || 'manager';
        const note = document.getElementById('gen-output')?.value || '';

        let items = [];
        try {
          items = JSON.parse(localStorage.getItem('prepspace_outreach_crm')) || DEFAULT_OUTREACH_ITEMS;
        } catch(e) { items = DEFAULT_OUTREACH_ITEMS; }

        items.unshift({
          id: 'outreach-' + Date.now(),
          name, company, role, type,
          status: 'note_sent',
          stage: 'sent',
          date: new Date().toISOString().slice(0, 10),
          notes: 'Saved from generator. Ready to follow-up.',
          lastMessage: note
        });

        localStorage.setItem('prepspace_outreach_crm', JSON.stringify(items));
        AudioSynth.playChime(587, 880, 0.3);
        safeToast(`Saved ${name} (${company}) to Pipeline!`, 'success');

        const mount = document.getElementById('page-mount');
        if (mount) {
          mount.innerHTML = components.outreachCrm();
          bindOutreachCrmEvents();
        }
      });
    }

    // Modal Save Prospect (with clean backdrop removal)
    const modalSaveBtn = document.getElementById('btn-save-new-contact');
    if (modalSaveBtn) {
      modalSaveBtn.addEventListener('click', () => {
        const name = document.getElementById('modal-c-name')?.value.trim();
        const company = document.getElementById('modal-c-company')?.value.trim();
        const role = document.getElementById('modal-c-role')?.value.trim();
        const type = document.getElementById('modal-c-type')?.value;
        const stage = document.getElementById('modal-c-stage')?.value || 'identified';
        const notes = document.getElementById('modal-c-notes')?.value.trim();

        if (!name || !company) {
          safeToast('Please enter both Name and Company', 'warning');
          return;
        }

        let items = [];
        try {
          items = JSON.parse(localStorage.getItem('prepspace_outreach_crm')) || DEFAULT_OUTREACH_ITEMS;
        } catch(e) { items = DEFAULT_OUTREACH_ITEMS; }

        items.unshift({
          id: 'outreach-' + Date.now(),
          name, company, role: role || 'Software Engineer', type, stage,
          status: stage === 'screening' ? 'call_scheduled' : (stage === 'offer' ? 'offer' : (stage === 'sent' ? 'note_sent' : 'identified')),
          date: new Date().toISOString().slice(0, 10),
          notes: notes || '',
          lastMessage: ''
        });

        localStorage.setItem('prepspace_outreach_crm', JSON.stringify(items));

        const modalEl = document.getElementById('addContactModal');
        if (modalEl && window.bootstrap) {
          const m = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
          if (m) m.hide();
        }
        // Remove stuck backdrop if any
        document.querySelectorAll('.modal-backdrop').forEach(b => b.remove());
        document.body.classList.remove('modal-open');

        AudioSynth.playChime(587, 880, 0.3);
        safeToast(`Added ${name} to pipeline!`, 'success');

        setTimeout(() => {
          const mount = document.getElementById('page-mount');
          if (mount) {
            mount.innerHTML = components.outreachCrm();
            bindOutreachCrmEvents();
          }
        }, 150);
      });
    }

    // Filter pipeline
    const filterInput = document.getElementById('filter-outreach');
    if (filterInput) {
      filterInput.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase();
        document.querySelectorAll('.outreach-kanban-card').forEach(card => {
          card.style.display = card.textContent.toLowerCase().includes(q) ? '' : 'none';
        });
      });
    }

    // Advance Kanban Stage (Identified -> Sent -> Screening -> Offer)
    const stageFlow = ['identified', 'sent', 'screening', 'offer'];
    document.querySelectorAll('.advance-kanban-stage').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        let items = [];
        try {
          items = JSON.parse(localStorage.getItem('prepspace_outreach_crm')) || DEFAULT_OUTREACH_ITEMS;
        } catch(e) { items = DEFAULT_OUTREACH_ITEMS; }

        const item = items.find(i => i.id === id);
        if (item) {
          const curIdx = stageFlow.indexOf(item.stage || 'identified');
          const nextIdx = (curIdx + 1) % stageFlow.length;
          item.stage = stageFlow[nextIdx];
          localStorage.setItem('prepspace_outreach_crm', JSON.stringify(items));
          AudioSynth.playChime(523, 784, 0.2);
          safeToast(`Advanced ${item.name} to ${stageFlow[nextIdx].toUpperCase()}!`, 'success');

          const mount = document.getElementById('page-mount');
          if (mount) {
            mount.innerHTML = components.outreachCrm();
            bindOutreachCrmEvents();
          }
        }
      });
    });

    // View Note (opens modern modal instead of native alert)
    document.querySelectorAll('.view-kanban-note').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        let items = [];
        try {
          items = JSON.parse(localStorage.getItem('prepspace_outreach_crm')) || DEFAULT_OUTREACH_ITEMS;
        } catch(e) { items = DEFAULT_OUTREACH_ITEMS; }

        const item = items.find(i => i.id === id);
        if (item) {
          const titleEl = document.getElementById('detail-modal-title');
          const bodyEl = document.getElementById('detail-modal-body');
          if (titleEl) titleEl.innerHTML = `<i class="fa-solid fa-address-card text-info me-2"></i>${item.name} (${item.company})`;
          if (bodyEl) {
            bodyEl.innerHTML = `
              <div class="mb-2">
                <span class="badge bg-primary bg-opacity-20 text-info font-monospace fs-9">${item.role}</span>
                <span class="badge bg-secondary font-monospace fs-9">${(item.stage || 'identified').toUpperCase()}</span>
                <small class="text-muted ms-2 fs-9 font-monospace">Logged: ${item.date}</small>
              </div>
              <div class="p-2.5 rounded bg-black bg-opacity-50 border border-secondary border-opacity-30 mb-2">
                <span class="text-secondary fs-9 fw-bold font-monospace d-block mb-1">CRM Follow-Up Notes:</span>
                <p class="fs-8 text-light mb-0">${item.notes || 'No notes logged yet.'}</p>
              </div>
              ${item.lastMessage ? `
                <div class="p-2.5 rounded bg-black bg-opacity-50 border border-info border-opacity-30">
                  <span class="text-info fs-9 fw-bold font-monospace d-block mb-1">Generated Pitch Text:</span>
                  <p class="fs-8 text-white font-monospace mb-0" style="white-space: pre-wrap;">${item.lastMessage}</p>
                </div>
              ` : ''}
            `;
          }
          const detailModal = document.getElementById('outreachDetailModal');
          if (detailModal && window.bootstrap) {
            const m = new bootstrap.Modal(detailModal);
            m.show();
          }
        }
      });
    });

    // Delete item
    document.querySelectorAll('.delete-outreach-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        let items = [];
        try {
          items = JSON.parse(localStorage.getItem('prepspace_outreach_crm')) || DEFAULT_OUTREACH_ITEMS;
        } catch(e) { items = DEFAULT_OUTREACH_ITEMS; }

        items = items.filter(i => i.id !== id);
        localStorage.setItem('prepspace_outreach_crm', JSON.stringify(items));
        safeToast('Prospect removed from CRM', 'info');

        const mount = document.getElementById('page-mount');
        if (mount) {
          mount.innerHTML = components.outreachCrm();
          bindOutreachCrmEvents();
        }
      });
    });

    updateGenerator();
  };


  // =========================================================================
  // 2. STAR STORY VAULT & BEHAVIORAL BANK (#/star-vault)
  // =========================================================================

  const DEFAULT_STAR_STORIES = [
    {
      id: 'star-1',
      title: 'Mitigated Critical P99 Latency Spike on Distributed Payment Gateway',
      company: 'Fintech Platform',
      principles: ['Customer Obsession', 'Bias for Action', 'Ownership'],
      metrics: 'p99 latency: 1200ms -> 45ms (-96%), 0 transaction drop',
      situation: 'During Black Friday flash traffic, our core checkout transaction service experienced severe cascade thread pool exhaustion, driving p99 latency above 1200ms and risking a \$2M payment SLA breach.',
      task: 'As the technical lead on-call, I needed to isolate the root-cause bottleneck within 20 minutes, restore transaction throughput, and implement permanent mitigation without taking down the payment gateway.',
      action: 'I inspected JVM thread dumps and isolated lock contention inside a synchronized legacy audit logger. I hot-patched the service by transitioning logging to an asynchronous ring-buffer (LMAX Disruptor pattern) and provisioned an ephemeral Redis write-through cache for idempotency tokens.',
      result: 'Restored p99 latency to 45ms within 18 minutes. Processed over 4.2 million transactions with 100% data integrity and zero SLA penalties. Authored the subsequent post-mortem and rollout RFC across 12 microservices.'
    },
    {
      id: 'star-2',
      title: 'Architected Real-Time Zero-Loss Kafka CDC Pipeline Migration',
      company: 'Enterprise SaaS',
      principles: ['Ownership', 'Invent and Simplify', 'Have Backbone'],
      metrics: 'Saved \$140K/yr cloud compute, eliminated 4-hour batch delay',
      situation: 'Our analytics ingestion relied on heavy nightly batch SQL jobs that overloaded the primary Postgres OLTP database, causing frequent read lockouts for paying enterprise customers.',
      task: 'I was tasked with designing a streaming replication architecture to sync data into Snowflake in real-time with zero packet loss and minimal impact on the production database.',
      action: 'Resisted pressure to simply scale up the database hardware. Instead, I championed and engineered a Change Data Capture (CDC) pipeline using Debezium and Kafka. Implemented idempotent consumer groups with dead-letter queues and strict schema registry governance.',
      result: 'Reduced data sync latency from 4 hours to under 3 seconds. Cut cloud read-replica compute costs by \$140,000 annually and supported 10x query throughput for executive analytics.'
    },
    {
      id: 'star-3',
      title: 'Resolved Silent Stale-Closure Memory Leak in Mission-Critical Dashboard',
      company: 'Logistics Co',
      principles: ['Deliver Results', 'Google / Ambiguity', 'Customer Obsession'],
      metrics: 'Eliminated client browser crashes for 12,000 daily fleet operators',
      situation: 'Fleet tracking dispatchers reported that our real-time GPS monitoring dashboard would freeze and crash browser tabs after 45 minutes of continuous operation in logistics hubs.',
      task: 'Identified that the issue was causing lost dispatch communications, requiring an immediate diagnosis of frontend memory leaks without reproducing on local dev machines easily.',
      action: 'Used Chrome DevTools Heap Snapshots and memory allocation instrumentation. Discovered uncleaned WebSocket event listeners retaining closures over large historical map coordinate arrays in a custom React hook. Refactored state synchronization to a centralized immutable store with explicit unsubscribe cleanup.',
      result: 'Reduced steady-state browser heap footprint from 1.8GB down to 85MB (-95%). Completely resolved crashing issues across 12,000 dispatch terminals with 99.99% uptime.'
    }
  ];

  components.starVault = () => {
    let stories = [];
    try {
      stories = JSON.parse(localStorage.getItem('prepspace_star_vault')) || DEFAULT_STAR_STORIES;
    } catch(e) {
      stories = DEFAULT_STAR_STORIES;
    }

    // Principle coverage radar calculation
    const trackedPrinciples = [
      { name: 'Customer Obsession', company: 'Amazon' },
      { name: 'Ownership', company: 'Amazon' },
      { name: 'Bias for Action', company: 'Amazon' },
      { name: 'Have Backbone', company: 'Amazon' },
      { name: 'Google / Ambiguity', company: 'Google' },
      { name: 'Meta Move Fast', company: 'Meta' }
    ];

    const coverage = trackedPrinciples.map(p => {
      const count = stories.filter(s => s.principles.some(sp => sp.toLowerCase().includes(p.name.toLowerCase()))).length;
      return { ...p, count };
    });

    return `
      <div class="container-fluid px-3 px-md-4 py-3 suite-scroll-container">
        <!-- Header -->
        <div class="d-flex flex-wrap justify-content-between align-items-center mb-3 pb-2 border-bottom border-secondary border-opacity-15 gap-2">
          <div>
            <div class="d-flex align-items-center gap-2">
              <span class="badge bg-primary bg-opacity-25 text-primary border border-primary border-opacity-50 font-monospace fs-9">BEHAVIORAL MASTERY</span>
              <h4 class="text-white fw-bold m-0 fs-5">STAR Story Vault & Behavioral Teleprompter</h4>
            </div>
            <p class="text-muted fs-8 mb-0 mt-1">Structure real career stories into high-impact STAR responses mapped to Amazon Leadership & Google Principles.</p>
          </div>
          <div class="d-flex gap-2">
            <button class="btn btn-outline-info btn-sm px-3" data-bs-toggle="modal" data-bs-target="#practiceStopwatchModal">
              <i class="fa-solid fa-stopwatch me-1"></i> 2-Min Pacing Stopwatch
            </button>
            <button class="btn btn-outline-light btn-sm px-3" onclick="window.print()"><i class="fa-solid fa-print me-1"></i> Print Matrix</button>
            <button class="btn btn-primary btn-sm px-3" data-bs-toggle="modal" data-bs-target="#newStoryModal"><i class="fa-solid fa-plus me-1"></i> Add STAR Story</button>
          </div>
        </div>

        <!-- Leadership Principle Coverage Radar -->
        <div class="card bg-dark bg-opacity-70 border-secondary border-opacity-30 rounded-3 p-3 mb-3 shadow-sm">
          <div class="d-flex flex-wrap align-items-center justify-content-between mb-2 gap-2">
            <span class="fs-8 fw-bold text-white"><i class="fa-solid fa-crosshairs text-warning me-1.5"></i>Leadership Principle Coverage & Blind-Spot Radar:</span>
            <small class="text-secondary fs-9 font-monospace">Target: At least 2 stories per tier</small>
          </div>
          <div class="d-flex flex-wrap gap-2 align-items-center">
            ${coverage.map(c => {
              const isBlindSpot = c.count === 0;
              const badgeClass = isBlindSpot 
                ? 'border-danger text-danger bg-danger bg-opacity-10' 
                : (c.count === 1 ? 'border-warning text-warning bg-warning bg-opacity-10' : 'border-success text-success bg-success bg-opacity-10');
              return `
                <div class="badge border font-monospace fs-9 py-1 px-2.5 ${badgeClass} d-flex align-items-center gap-1.5">
                  <i class="fa-solid ${isBlindSpot ? 'fa-triangle-exclamation' : 'fa-circle-check'}"></i>
                  <span>${c.name}</span>
                  <span class="badge ${isBlindSpot ? 'bg-danger' : 'bg-dark'} ms-1">${c.count} ${isBlindSpot ? 'BLIND SPOT' : 'stories'}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Filter & Search Strip -->
        <div class="row g-2 mb-3 align-items-center">
          <div class="col-12 col-md-5">
            <input type="text" id="search-star" class="form-control form-control-sm bg-black text-white border-secondary border-opacity-50" placeholder="Search stories by keyword, conflict, latency...">
          </div>
          <div class="col-12 col-md-7 d-flex flex-wrap gap-1.5 justify-content-md-end" id="star-principles-pills">
            <button class="btn btn-sm btn-glass active fs-9 star-filter-btn" data-filter="all">All Stories (${stories.length})</button>
            <button class="btn btn-sm btn-glass fs-9 star-filter-btn" data-filter="Customer Obsession">Customer Obsession</button>
            <button class="btn btn-sm btn-glass fs-9 star-filter-btn" data-filter="Ownership">Ownership</button>
            <button class="btn btn-sm btn-glass fs-9 star-filter-btn" data-filter="Bias for Action">Bias for Action</button>
            <button class="btn btn-sm btn-glass fs-9 star-filter-btn" data-filter="Have Backbone">Have Backbone</button>
          </div>
        </div>

        <!-- Stories Grid -->
        <div class="row g-3" id="star-stories-container">
          ${stories.map((story, idx) => `
            <div class="col-12 col-xl-6 star-story-card" data-principles="${story.principles.join(' ').toLowerCase()}" data-id="${story.id}">
              <div class="card bg-dark bg-opacity-70 border-secondary border-opacity-30 rounded-3 p-3 p-md-4 h-100 shadow-sm position-relative">
                <div class="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <span class="badge bg-secondary bg-opacity-25 text-info border border-secondary border-opacity-30 font-monospace fs-9 me-1">STORY #${idx + 1}</span>
                    <span class="text-muted fs-9 font-monospace">&bull; ${story.company || 'Tech Project'}</span>
                    <h5 class="text-white fw-bold fs-6 mt-1 mb-2">${story.title}</h5>
                  </div>
                  <div class="d-flex align-items-center gap-1">
                    <button class="btn btn-glass btn-sm p-1 px-2 text-info teleprompter-trigger-btn" data-id="${story.id}" title="Launch Speech Teleprompter"><i class="fa-solid fa-microphone me-1"></i> Teleprompter</button>
                    <button class="btn btn-glass btn-sm p-1 px-2 text-light copy-star-markdown" data-id="${story.id}" title="Copy as Markdown"><i class="fa-solid fa-copy"></i></button>
                    <button class="btn btn-glass btn-sm p-1 px-2 text-danger delete-star-story" data-id="${story.id}" title="Delete"><i class="fa-solid fa-trash"></i></button>
                  </div>
                </div>

                <div class="d-flex flex-wrap gap-1 mb-3">
                  ${story.principles.map(p => `
                    <span class="badge bg-warning bg-opacity-15 text-warning border border-warning border-opacity-25 fs-9"><i class="fa-solid fa-tag me-1"></i>${p}</span>
                  `).join('')}
                </div>

                <div class="d-flex flex-column gap-2 mb-3">
                  <div class="p-2.5 rounded-2 bg-black bg-opacity-40 border-start border-3 border-info">
                    <span class="fw-bold text-info font-monospace fs-9 d-block uppercase mb-1">S — Situation (Context & Stakes):</span>
                    <p class="fs-8 text-light mb-0" style="line-height: 1.6;">${story.situation}</p>
                  </div>
                  <div class="p-2.5 rounded-2 bg-black bg-opacity-40 border-start border-3 border-primary">
                    <span class="fw-bold text-primary font-monospace fs-9 d-block uppercase mb-1">T — Task (Your Responsibility):</span>
                    <p class="fs-8 text-light mb-0" style="line-height: 1.6;">${story.task}</p>
                  </div>
                  <div class="p-2.5 rounded-2 bg-black bg-opacity-40 border-start border-3 border-warning">
                    <span class="fw-bold text-warning font-monospace fs-9 d-block uppercase mb-1">A — Action (Your Technical Decisions):</span>
                    <p class="fs-8 text-light mb-0" style="line-height: 1.6;">${story.action}</p>
                  </div>
                  <div class="p-2.5 rounded-2 bg-black bg-opacity-40 border-start border-3 border-success">
                    <span class="fw-bold text-success font-monospace fs-9 d-block uppercase mb-1">R — Result (Measurable Business Impact):</span>
                    <p class="fs-8 text-light mb-0" style="line-height: 1.6;">${story.result}</p>
                  </div>
                </div>

                <div class="mt-auto pt-2 border-top border-secondary border-opacity-20 d-flex flex-wrap justify-content-between align-items-center gap-2">
                  ${story.metrics ? `
                    <div class="d-flex align-items-center gap-1">
                      <small class="text-muted fs-9 font-monospace"><i class="fa-solid fa-chart-line text-success me-1"></i>Impact Metric:</small>
                      <span class="text-success fw-bold font-monospace fs-9">${story.metrics}</span>
                    </div>
                  ` : '<div></div>'}
                  <button class="btn btn-sm btn-glass text-warning fs-9 ai-prompt-btn" data-id="${story.id}">
                    <i class="fa-solid fa-robot me-1"></i> AI Critique Prompt
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Full-Screen Speech Teleprompter Overlay -->
      <div id="teleprompterOverlay" class="teleprompter-overlay d-none">
        <div class="d-flex justify-content-between align-items-center border-bottom border-secondary border-opacity-30 pb-2 mb-3">
          <div class="d-flex align-items-center gap-3">
            <span class="badge bg-primary fs-8 font-monospace"><i class="fa-solid fa-microphone me-1"></i> TELEPROMPTER SPEECH MODE</span>
            <h5 class="m-0 text-white fs-6" id="teleprompter-title">Story Title</h5>
          </div>
          <div class="d-flex align-items-center gap-3">
            <!-- Real-time WPM Speech Coach -->
            <div class="badge bg-dark border border-secondary border-opacity-40 font-monospace fs-8 px-3 py-1.5" id="teleprompter-wpm-badge">
              <i class="fa-solid fa-gauge-high text-info me-1"></i> <span id="wpm-display">Pace: Listening...</span>
            </div>
            <button class="btn btn-sm btn-outline-info" id="btn-toggle-teleprompter-scroll"><i class="fa-solid fa-play me-1"></i> Auto-Scroll: OFF</button>
            <button class="btn btn-sm btn-danger px-3" id="btn-close-teleprompter"><i class="fa-solid fa-xmark me-1"></i> Exit</button>
          </div>
        </div>
        <div class="teleprompter-stream" id="teleprompter-content-area"></div>
      </div>

      <!-- 2-Minute Pacing Stopwatch Modal -->
      <div class="modal fade" id="practiceStopwatchModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content bg-dark text-white border-secondary border-opacity-40">
            <div class="modal-header border-secondary border-opacity-25 py-2.5">
              <h5 class="modal-title fs-6"><i class="fa-solid fa-stopwatch text-info me-2"></i>2-Minute STAR Pacing Stopwatch</h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body p-4 text-center">
              <div class="font-monospace fs-1 fw-bold text-warning mb-2" id="practice-timer-display">02:00</div>
              <div class="badge bg-info bg-opacity-20 text-info font-monospace fs-8 px-3 py-1.5 mb-3" id="practice-phase-badge">
                Phase: Situation (0 - 20s)
              </div>

              <!-- 4-Stage Segment Bar -->
              <div class="progress mb-3" style="height: 10px; background: rgba(255,255,255,0.08);">
                <div id="practice-seg-s" class="progress-bar bg-info" style="width: 17%;" title="Situation: 20s"></div>
                <div id="practice-seg-t" class="progress-bar bg-primary" style="width: 17%;" title="Task: 20s"></div>
                <div id="practice-seg-a" class="progress-bar bg-warning" style="width: 45%;" title="Action: 55s"></div>
                <div id="practice-seg-r" class="progress-bar bg-success" style="width: 21%;" title="Result: 25s"></div>
              </div>

              <div class="d-flex justify-content-center gap-2">
                <button class="btn btn-primary px-4" id="btn-practice-start"><i class="fa-solid fa-play me-1"></i> Start Pacing</button>
                <button class="btn btn-outline-secondary px-3" id="btn-practice-pause"><i class="fa-solid fa-pause me-1"></i> Pause</button>
                <button class="btn btn-outline-danger px-3" id="btn-practice-reset"><i class="fa-solid fa-rotate-left me-1"></i> Reset</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Add Story Modal -->
      <div class="modal fade" id="newStoryModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content bg-dark text-white border-secondary border-opacity-40">
            <div class="modal-header border-secondary border-opacity-25 py-2.5">
              <h5 class="modal-title fs-6"><i class="fa-solid fa-plus text-primary me-2"></i>Add STAR Experience Story</h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body p-3">
              <div class="row g-2 mb-2">
                <div class="col-8">
                  <label class="form-label fs-8 text-secondary fw-semibold">Story Title *</label>
                  <input type="text" id="modal-s-title" class="form-control form-control-sm bg-black text-white border-secondary border-opacity-50" placeholder="e.g. Architected Distributed Rate Limiter under 100K RPS">
                </div>
                <div class="col-4">
                  <label class="form-label fs-8 text-secondary fw-semibold">Company / Org</label>
                  <input type="text" id="modal-s-company" class="form-control form-control-sm bg-black text-white border-secondary border-opacity-50" placeholder="e.g. AWS, Meta">
                </div>
              </div>

              <div class="row g-2 mb-2">
                <div class="col-6">
                  <label class="form-label fs-8 text-secondary fw-semibold">Leadership Principles (Comma separated)</label>
                  <input type="text" id="modal-s-principles" class="form-control form-control-sm bg-black text-white border-secondary border-opacity-50" placeholder="Customer Obsession, Ownership, Bias for Action">
                </div>
                <div class="col-6">
                  <label class="form-label fs-8 text-secondary fw-semibold">Quantified Impact Metric</label>
                  <input type="text" id="modal-s-metrics" class="form-control form-control-sm bg-black text-white border-secondary border-opacity-50" placeholder="e.g. -45% latency, saved $120K/yr">
                </div>
              </div>

              <div class="mb-2">
                <label class="form-label fs-8 text-info fw-semibold">S — Situation (What was the business challenge & stakes?)</label>
                <textarea id="modal-s-situation" class="form-control form-control-sm bg-black text-white border-secondary border-opacity-50" rows="2"></textarea>
              </div>
              <div class="mb-2">
                <label class="form-label fs-8 text-primary fw-semibold">T — Task (What was your specific ownership goal?)</label>
                <textarea id="modal-s-task" class="form-control form-control-sm bg-black text-white border-secondary border-opacity-50" rows="2"></textarea>
              </div>
              <div class="mb-2">
                <label class="form-label fs-8 text-warning fw-semibold">A — Action (What exact technical decisions and tradeoffs did you make?)</label>
                <textarea id="modal-s-action" class="form-control form-control-sm bg-black text-white border-secondary border-opacity-50" rows="3"></textarea>
              </div>
              <div class="mb-2">
                <label class="form-label fs-8 text-success fw-semibold">R — Result (Measurable outcome, metrics & retrospectives)</label>
                <textarea id="modal-s-result" class="form-control form-control-sm bg-black text-white border-secondary border-opacity-50" rows="2"></textarea>
              </div>
            </div>
            <div class="modal-footer border-secondary border-opacity-25 py-2">
              <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-primary btn-sm px-3" id="btn-save-new-star-story"><i class="fa-solid fa-check me-1"></i> Save to Vault</button>
            </div>
          </div>
        </div>
      </div>
    `;
  };


  window.bindStarVaultEvents = () => {
    // Search
    const searchInput = document.getElementById('search-star');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase();
        document.querySelectorAll('.star-story-card').forEach(card => {
          card.style.display = card.textContent.toLowerCase().includes(q) ? '' : 'none';
        });
      });
    }

    // Filter pills
    document.querySelectorAll('.star-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.star-filter-btn').forEach(b => b.classList.remove('active', 'btn-primary'));
        btn.classList.add('active', 'btn-primary');
        const filter = btn.getAttribute('data-filter').toLowerCase();

        document.querySelectorAll('.star-story-card').forEach(card => {
          if (filter === 'all') {
            card.style.display = '';
          } else {
            const principles = card.getAttribute('data-principles') || '';
            card.style.display = principles.includes(filter) ? '' : 'none';
          }
        });
      });
    });

    // Copy Markdown
    document.querySelectorAll('.copy-star-markdown').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        let stories = [];
        try {
          stories = JSON.parse(localStorage.getItem('prepspace_star_vault')) || DEFAULT_STAR_STORIES;
        } catch(e) { stories = DEFAULT_STAR_STORIES; }

        const s = stories.find(st => st.id === id);
        if (s) {
          const md = `# STAR Story: ${s.title}\n**Company**: ${s.company || 'Tech'}\n**Principles**: ${s.principles.join(', ')}\n**Impact Metric**: ${s.metrics || 'N/A'}\n\n### Situation\n${s.situation}\n\n### Task\n${s.task}\n\n### Action\n${s.action}\n\n### Result\n${s.result}\n`;
          navigator.clipboard.writeText(md).then(() => {
            AudioSynth.playChime(523, 659, 0.25);
            safeToast('Copied STAR story formatted in Markdown!', 'success');
          });
        }
      });
    });

    // AI Critique Prompt
    document.querySelectorAll('.ai-prompt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        let stories = [];
        try {
          stories = JSON.parse(localStorage.getItem('prepspace_star_vault')) || DEFAULT_STAR_STORIES;
        } catch(e) { stories = DEFAULT_STAR_STORIES; }

        const s = stories.find(st => st.id === id);
        if (s) {
          const prompt = `Act as an elite Amazon Bar Raiser & Principal Engineering Interviewer. Evaluate my STAR behavioral response below:\n\nTitle: ${s.title}\nTarget Leadership Principles: ${s.principles.join(', ')}\n\n[SITUATION]: ${s.situation}\n[TASK]: ${s.task}\n[ACTION]: ${s.action}\n[RESULT]: ${s.result}\n\nProvide rigorous feedback on: 1. Did I clearly demonstrate 'I' vs 'We'? 2. Are the metrics sufficiently quantified? 3. What skeptical probing follow-up questions should I prepare for?`;
          navigator.clipboard.writeText(prompt).then(() => {
            AudioSynth.playChime(523, 784, 0.25);
            safeToast('AI Bar Raiser evaluation prompt copied to clipboard!', 'info');
          });
        }
      });
    });

    // Delete Story
    document.querySelectorAll('.delete-star-story').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        let stories = [];
        try {
          stories = JSON.parse(localStorage.getItem('prepspace_star_vault')) || DEFAULT_STAR_STORIES;
        } catch(e) { stories = DEFAULT_STAR_STORIES; }

        stories = stories.filter(s => s.id !== id);
        localStorage.setItem('prepspace_star_vault', JSON.stringify(stories));
        safeToast('Story deleted from vault', 'info');

        const mount = document.getElementById('page-mount');
        if (mount) {
          mount.innerHTML = components.starVault();
          bindStarVaultEvents();
        }
      });
    });

    // Modal Save Story
    const saveStoryBtn = document.getElementById('btn-save-new-star-story');
    if (saveStoryBtn) {
      saveStoryBtn.addEventListener('click', () => {
        const title = document.getElementById('modal-s-title')?.value.trim();
        const company = document.getElementById('modal-s-company')?.value.trim();
        const principlesRaw = document.getElementById('modal-s-principles')?.value.trim();
        const metrics = document.getElementById('modal-s-metrics')?.value.trim();
        const situation = document.getElementById('modal-s-situation')?.value.trim();
        const task = document.getElementById('modal-s-task')?.value.trim();
        const action = document.getElementById('modal-s-action')?.value.trim();
        const result = document.getElementById('modal-s-result')?.value.trim();

        if (!title || !situation || !action) {
          safeToast('Please fill Title, Situation, and Action at minimum.', 'warning');
          return;
        }

        const principles = principlesRaw ? principlesRaw.split(',').map(p => p.trim()) : ['Ownership'];

        let stories = [];
        try {
          stories = JSON.parse(localStorage.getItem('prepspace_star_vault')) || DEFAULT_STAR_STORIES;
        } catch(e) { stories = DEFAULT_STAR_STORIES; }

        stories.unshift({
          id: 'star-' + Date.now(),
          title, company, principles, metrics, situation, task, action, result
        });

        localStorage.setItem('prepspace_star_vault', JSON.stringify(stories));

        const modalEl = document.getElementById('newStoryModal');
        if (modalEl && window.bootstrap) {
          const m = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
          if (m) m.hide();
        }
        document.querySelectorAll('.modal-backdrop').forEach(b => b.remove());
        document.body.classList.remove('modal-open');

        AudioSynth.playChime(587, 880, 0.3);
        safeToast(`Saved "${title}" to your STAR Vault!`, 'success');

        setTimeout(() => {
          const mount = document.getElementById('page-mount');
          if (mount) {
            mount.innerHTML = components.starVault();
            bindStarVaultEvents();
          }
        }, 150);
      });
    }

    // =======================================================================
    // Teleprompter & Live Speech Coach (WPM Tracker)
    // =======================================================================
    let recognition = null;
    let wordCount = 0;
    let speechStartTime = 0;
    let autoScrollInterval = null;

    document.querySelectorAll('.teleprompter-trigger-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        let stories = [];
        try {
          stories = JSON.parse(localStorage.getItem('prepspace_star_vault')) || DEFAULT_STAR_STORIES;
        } catch(e) { stories = DEFAULT_STAR_STORIES; }

        const s = stories.find(st => st.id === id);
        if (s) {
          const overlay = document.getElementById('teleprompterOverlay');
          const titleEl = document.getElementById('teleprompter-title');
          const area = document.getElementById('teleprompter-content-area');
          if (titleEl) titleEl.textContent = `${s.title} (${s.company || 'Tech'})`;

          if (area) {
            area.innerHTML = `
              <div class="mb-4 p-3 rounded-3 bg-black bg-opacity-40 border-start border-4 border-info">
                <span class="text-info font-monospace fs-7 fw-bold d-block mb-2"><i class="fa-solid fa-flag me-1"></i> SITUATION (Target: 0-20s):</span>
                <p class="fs-4 text-white mb-0" style="line-height: 1.8;">${s.situation}</p>
              </div>
              <div class="mb-4 p-3 rounded-3 bg-black bg-opacity-40 border-start border-4 border-primary">
                <span class="text-primary font-monospace fs-7 fw-bold d-block mb-2"><i class="fa-solid fa-bullseye me-1"></i> TASK (Target: 20-40s):</span>
                <p class="fs-4 text-white mb-0" style="line-height: 1.8;">${s.task}</p>
              </div>
              <div class="mb-4 p-3 rounded-3 bg-black bg-opacity-40 border-start border-4 border-warning">
                <span class="text-warning font-monospace fs-7 fw-bold d-block mb-2"><i class="fa-solid fa-gears me-1"></i> ACTION (Target: 40-95s):</span>
                <p class="fs-4 text-white mb-0" style="line-height: 1.8;">${s.action}</p>
              </div>
              <div class="mb-4 p-3 rounded-3 bg-black bg-opacity-40 border-start border-4 border-success">
                <span class="text-success font-monospace fs-7 fw-bold d-block mb-2"><i class="fa-solid fa-trophy me-1"></i> RESULT (Target: 95-120s):</span>
                <p class="fs-4 text-white mb-0" style="line-height: 1.8;">${s.result}</p>
              </div>
            `;
          }

          if (overlay) overlay.classList.remove('d-none');
          AudioSynth.playChime(587, 880, 0.2);

          // Start Web Speech Recognition Coach
          const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
          const wpmDisplay = document.getElementById('wpm-display');
          wordCount = 0;
          speechStartTime = Date.now();

          if (SpeechRec) {
            try {
              recognition = new SpeechRec();
              recognition.continuous = true;
              recognition.interimResults = true;
              recognition.onresult = (evt) => {
                let total = 0;
                for (let i = 0; i < evt.results.length; i++) {
                  const transcript = evt.results[i][0].transcript.trim();
                  total += transcript.split(/\s+/).length;
                }
                wordCount = total;
                const elapsedMins = (Date.now() - speechStartTime) / 60000;
                if (elapsedMins > 0.05 && wpmDisplay) {
                  const wpm = Math.round(wordCount / elapsedMins);
                  if (wpm < 110) {
                    wpmDisplay.innerHTML = `Pace: <span class="text-info">${wpm} WPM (Steady)</span>`;
                  } else if (wpm <= 160) {
                    wpmDisplay.innerHTML = `Pace: <span class="text-success">${wpm} WPM (Optimal)</span>`;
                  } else {
                    wpmDisplay.innerHTML = `Pace: <span class="text-danger">${wpm} WPM (Too Fast!)</span>`;
                  }
                }
              };
              recognition.start();
            } catch(e) {
              if (wpmDisplay) wpmDisplay.textContent = 'Pace: Reading mode';
            }
          } else {
            if (wpmDisplay) wpmDisplay.textContent = 'Pace: Reading mode';
          }
        }
      });
    });

    // Close Teleprompter
    const closeTeleprompterBtn = document.getElementById('btn-close-teleprompter');
    if (closeTeleprompterBtn) {
      closeTeleprompterBtn.addEventListener('click', () => {
        const overlay = document.getElementById('teleprompterOverlay');
        if (overlay) overlay.classList.add('d-none');
        if (recognition) { try { recognition.stop(); } catch(e){} recognition = null; }
        if (autoScrollInterval) { clearInterval(autoScrollInterval); autoScrollInterval = null; }
      });
    }

    // Auto-Scroll Toggle
    const scrollToggleBtn = document.getElementById('btn-toggle-teleprompter-scroll');
    if (scrollToggleBtn) {
      scrollToggleBtn.addEventListener('click', () => {
        const stream = document.getElementById('teleprompter-content-area');
        if (autoScrollInterval) {
          clearInterval(autoScrollInterval);
          autoScrollInterval = null;
          scrollToggleBtn.innerHTML = '<i class="fa-solid fa-play me-1"></i> Auto-Scroll: OFF';
          scrollToggleBtn.className = 'btn btn-sm btn-outline-info';
        } else if (stream) {
          scrollToggleBtn.innerHTML = '<i class="fa-solid fa-pause me-1"></i> Auto-Scroll: ON';
          scrollToggleBtn.className = 'btn btn-sm btn-warning';
          autoScrollInterval = setInterval(() => {
            stream.scrollTop += 2;
          }, 35);
        }
      });
    }

    // =======================================================================
    // 2-Minute Pacing Stopwatch
    // =======================================================================
    let pTimer = null;
    let pSecondsLeft = 120;
    let pRunning = false;

    const pDisplay = document.getElementById('practice-timer-display');
    const pBadge = document.getElementById('practice-phase-badge');

    function updatePacingUI() {
      const mins = Math.floor(pSecondsLeft / 60);
      const secs = pSecondsLeft % 60;
      if (pDisplay) pDisplay.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

      const elapsed = 120 - pSecondsLeft;
      if (pBadge) {
        if (elapsed <= 20) {
          pBadge.textContent = 'Phase: Situation (Context & Stakes: 0-20s)';
          pBadge.className = 'badge bg-info bg-opacity-20 text-info font-monospace fs-8 px-3 py-1.5 mb-3';
        } else if (elapsed <= 40) {
          pBadge.textContent = 'Phase: Task (Your Specific Ownership: 20-40s)';
          pBadge.className = 'badge bg-primary bg-opacity-20 text-primary font-monospace fs-8 px-3 py-1.5 mb-3';
        } else if (elapsed <= 95) {
          pBadge.textContent = 'Phase: Action (Technical Decisions & Trade-offs: 40-95s)';
          pBadge.className = 'badge bg-warning bg-opacity-20 text-warning font-monospace fs-8 px-3 py-1.5 mb-3';
        } else {
          pBadge.textContent = 'Phase: Result (Measurable Business Outcome: 95-120s)';
          pBadge.className = 'badge bg-success bg-opacity-20 text-success font-monospace fs-8 px-3 py-1.5 mb-3';
        }
      }
    }

    const startPacingBtn = document.getElementById('btn-practice-start');
    if (startPacingBtn) {
      startPacingBtn.addEventListener('click', () => {
        if (!pRunning) {
          pRunning = true;
          AudioSynth.playChime(523, 784, 0.2);
          pTimer = setInterval(() => {
            if (pSecondsLeft > 0) {
              pSecondsLeft--;
              const elapsed = 120 - pSecondsLeft;
              if (elapsed === 20 || elapsed === 40 || elapsed === 95) {
                AudioSynth.playChime(660, 880, 0.15); // stage transition chime
              }
              updatePacingUI();
            } else {
              clearInterval(pTimer);
              pRunning = false;
              AudioSynth.playChime(440, 880, 0.5);
              safeToast('2-Minute STAR response time completed!', 'success');
            }
          }, 1000);
        }
      });
    }

    const pausePacingBtn = document.getElementById('btn-practice-pause');
    if (pausePacingBtn) {
      pausePacingBtn.addEventListener('click', () => {
        if (pRunning) {
          clearInterval(pTimer);
          pRunning = false;
        }
      });
    }

    const resetPacingBtn = document.getElementById('btn-practice-reset');
    if (resetPacingBtn) {
      resetPacingBtn.addEventListener('click', () => {
        clearInterval(pTimer);
        pRunning = false;
        pSecondsLeft = 120;
        updatePacingUI();
      });
    }
  };


  // =========================================================================
  // 3. PEER-TO-PEER MOCK EXCHANGE & RUBRIC ARENA (#/peer-mock)
  // =========================================================================

  const DEFAULT_MOCK_ROUNDS = [
    {
      id: 'mock-sys-1',
      type: 'System Design',
      title: 'Design a Distributed Multi-Tenant Rate Limiter (100K RPS)',
      difficulty: 'Hard (L5/L6)',
      targetRole: 'Staff / Senior Backend SDE',
      description: 'Architect an API gateway rate limiting tier that enforces per-user and per-IP quotas across multiple microservices with low latency (< 2ms overhead).',
      shadowFollowUps: [
        'How do you prevent race conditions when two concurrent requests hit different gateway instances simultaneously?',
        'If Redis Cluster experiences a partition, does your rate limiter fail open or fail closed?',
        'How would you handle a single rogue tenant executing a localized DDoS attack without exhausting memory in your caching cluster?'
      ],
      hints: [
        'Evaluate Token Bucket vs Sliding Window Counter algorithms.',
        'Consider Redis with Lua script atomicity or local in-memory token buckets with periodic background sync.',
        'Address clock drift and NTP synchronization across distributed gateway servers.'
      ],
      starterCode: {
        java: `public class DistributedRateLimiter {\n    // Implement Token Bucket or Sliding Window\n    public boolean allowRequest(String tenantId, int maxTokens, long refillIntervalMs) {\n        // TODO: Redis Lua script execution or atomic CAS counter\n        return true;\n    }\n}`,
        python: `class DistributedRateLimiter:\n    def allow_request(self, tenant_id: str, max_tokens: int, refill_interval_ms: int) -> bool:\n        # TODO: Implement atomic sliding window logic\n        return True`,
        typescript: `export class DistributedRateLimiter {\n  allowRequest(tenantId: string, maxTokens: number, refillMs: number): boolean {\n    // TODO: Atomic sliding log check\n    return true;\n  }\n}`
      }
    },
    {
      id: 'mock-algo-1',
      type: 'Algorithms',
      title: 'Design and Implement an LRU Cache with O(1) Operations',
      difficulty: 'Medium (L4/L5)',
      targetRole: 'Software Development Engineer II',
      description: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache with O(1) time complexity for both get and put operations.',
      shadowFollowUps: [
        'How would you make this data structure thread-safe for high concurrency without acquiring a coarse global lock?',
        'How does Java LinkedHashMap implement LRU eviction under the hood?',
        'If the cached values can be large byte arrays, how would you design an eviction policy based on total memory footprint rather than element count?'
      ],
      hints: [
        'Combine a Doubly Linked List for O(1) re-ordering with a Hash Table for O(1) key lookup.',
        'Maintain dummy head and tail nodes to avoid null pointer edge cases when removing/inserting nodes.'
      ],
      starterCode: {
        java: `public class LRUCache {\n    private final int capacity;\n    \n    public LRUCache(int capacity) {\n        this.capacity = capacity;\n    }\n    \n    public int get(int key) {\n        return -1;\n    }\n    \n    public void put(int key, int value) {\n    }\n}`,
        python: `class LRUCache:\n    def __init__(self, capacity: int):\n        self.capacity = capacity\n\n    def get(self, key: int) -> int:\n        return -1\n\n    def put(self, key: int, value: int) -> None:\n        pass`,
        typescript: `class LRUCache {\n  constructor(private capacity: number) {}\n  get(key: number): number { return -1; }\n  put(key: number, value: number): void {}\n}`
      }
    }
  ];

  components.peerMock = () => {
    return `
      <div class="container-fluid px-3 px-md-4 py-3 suite-scroll-container">
        <!-- Header -->
        <div class="d-flex flex-wrap justify-content-between align-items-center mb-3 pb-2 border-bottom border-secondary border-opacity-15 gap-2">
          <div>
            <div class="d-flex align-items-center gap-2">
              <span class="badge bg-danger bg-opacity-25 text-danger border border-danger border-opacity-50 font-monospace fs-9">ARENA ARENA</span>
              <h4 class="text-white fw-bold m-0 fs-5">Peer Mock Exchange & AI Shadow Interviewer</h4>
            </div>
            <p class="text-muted fs-8 mb-0 mt-1">Practice live 60-min reciprocal interview rounds with standardized FAANG rubrics or run solo against an AI Principal Shadow.</p>
          </div>
          <div class="d-flex align-items-center gap-2">
            <!-- Mode Switcher -->
            <div class="btn-group" role="group">
              <input type="radio" class="btn-check" name="mock-mode" id="mode-human" value="human" checked>
              <label class="btn btn-sm btn-outline-info fs-9" for="mode-human"><i class="fa-solid fa-users me-1"></i> Peer Mode</label>

              <input type="radio" class="btn-check" name="mock-mode" id="mode-shadow" value="shadow">
              <label class="btn btn-sm btn-outline-warning fs-9" for="mode-shadow"><i class="fa-solid fa-robot me-1"></i> AI Shadow Mode</label>
            </div>
            <button class="btn btn-outline-light btn-sm px-3" id="btn-export-mock-debrief"><i class="fa-solid fa-file-invoice me-1"></i> Export Debrief</button>
          </div>
        </div>

        <!-- Session Status Ribbon -->
        <div class="card bg-dark bg-opacity-70 border-secondary border-opacity-30 rounded-3 p-3 mb-3 shadow-sm">
          <div class="d-flex flex-wrap align-items-center justify-content-between gap-3">
            <div class="d-flex align-items-center gap-3">
              <button class="btn btn-outline-warning rounded-circle d-flex align-items-center justify-content-center" id="btn-timer-toggle" style="width: 44px; height: 44px;">
                <i class="fa-solid fa-play" id="timer-icon"></i>
              </button>
              <div>
                <span class="badge bg-secondary font-monospace fs-9" id="turn-badge">Turn: Part A (You Interview Candidate)</span>
                <div class="font-monospace fs-4 fw-bold text-warning" id="timer-display">30:00</div>
              </div>
            </div>

            <!-- Problem Selector -->
            <div class="d-flex align-items-center gap-2 flex-grow-1" style="max-width: 450px;">
              <select id="mock-problem-select" class="form-select form-select-sm bg-black text-white border-secondary border-opacity-50">
                ${DEFAULT_MOCK_ROUNDS.map(r => `
                  <option value="${r.id}">[${r.type}] ${r.title} (${r.difficulty})</option>
                `).join('')}
              </select>
              <button class="btn btn-sm btn-glass text-info fs-9 text-nowrap" id="btn-toggle-secret-hints">
                <i class="fa-solid fa-eye me-1"></i> Secret Hints
              </button>
            </div>

            <!-- Live Rubric Score Indicator -->
            <div class="badge bg-dark border border-secondary border-opacity-40 p-2 d-flex align-items-center gap-2 font-monospace fs-8">
              <span class="text-secondary">Rubric Score:</span>
              <span class="text-warning fw-bold fs-7" id="composite-score-val">3.5 / 5.0</span>
              <span class="badge bg-info bg-opacity-20 text-info border border-info border-opacity-30" id="rubric-grade-badge">Solid Hire</span>
            </div>
          </div>

          <!-- Secret Hints Accordion -->
          <div class="mt-2.5 pt-2 border-top border-secondary border-opacity-20 d-none" id="secret-hints-drawer">
            <div class="p-2.5 rounded bg-black bg-opacity-50 border border-warning border-opacity-30">
              <span class="text-warning fw-bold font-monospace fs-9 d-block mb-1"><i class="fa-solid fa-user-secret me-1"></i> Interviewer Solution Guide & Architectural Traps:</span>
              <ul class="mb-0 fs-8 text-light ps-3" id="hints-list"></ul>
            </div>
          </div>
        </div>

        <div class="row g-3">
          <!-- Left: Code & System Design Scratchpad -->
          <div class="col-12 col-xl-7">
            <div class="card bg-dark bg-opacity-70 border-secondary border-opacity-30 rounded-3 p-3 shadow-sm h-100">
              <div class="d-flex align-items-center justify-content-between mb-2">
                <div class="d-flex align-items-center gap-2">
                  <h6 class="text-white fw-bold m-0 fs-7"><i class="fa-solid fa-terminal text-success me-1.5"></i>Candidate Live Scratchpad</h6>
                  <select id="scratchpad-lang" class="form-select form-select-sm bg-black text-white border-secondary border-opacity-50 py-0.5" style="width: 120px;">
                    <option value="java" selected>Java 21</option>
                    <option value="python">Python 3.12</option>
                    <option value="typescript">TypeScript</option>
                  </select>
                </div>
                <div class="d-flex gap-1.5">
                  <button class="btn btn-sm btn-outline-success py-0.5 px-2 fs-9" id="btn-run-mock-tests"><i class="fa-solid fa-play me-1"></i> Run Tests</button>
                  <button class="btn btn-sm btn-glass py-0.5 px-2 fs-9 text-secondary" id="btn-clear-scratchpad"><i class="fa-solid fa-eraser"></i></button>
                </div>
              </div>

              <!-- Problem statement preview -->
              <div class="p-2 rounded bg-black bg-opacity-40 border border-secondary border-opacity-20 mb-2">
                <span class="text-info fs-9 fw-bold font-monospace d-block" id="mock-problem-title">Design a Distributed Multi-Tenant Rate Limiter</span>
                <p class="text-muted fs-8 mb-0" id="mock-problem-desc"></p>
              </div>

              <textarea id="mock-code-editor" class="form-control bg-black text-white border-secondary border-opacity-50 p-2.5 fs-8 font-monospace flex-grow-1" rows="12" style="line-height: 1.6; tab-size: 2;"></textarea>

              <!-- Test Execution Terminal -->
              <div class="mt-2 p-2 rounded bg-black border border-secondary border-opacity-30 font-monospace fs-9 text-light d-none" id="test-console-output">
                <span class="text-success fw-bold"><i class="fa-solid fa-circle-check me-1"></i> All 4/4 Test Assertions Passed (24ms)</span>
                <div class="text-muted mt-1">&gt; testZeroLatencyCheck()... OK<br>&gt; testConcurrentQuotaExceeded()... OK (HTTP 429 received)<br>&gt; testSlidingWindowDrift()... OK</div>
              </div>
            </div>
          </div>

          <!-- Right: FAANG 4-Axis Rubric & AI Shadow Follow-ups -->
          <div class="col-12 col-xl-5">
            <div class="card bg-dark bg-opacity-70 border-secondary border-opacity-30 rounded-3 p-3 shadow-sm h-100">
              <!-- AI Shadow Prompt Box -->
              <div class="p-2.5 rounded bg-warning bg-opacity-10 border border-warning border-opacity-30 mb-3" id="ai-shadow-card">
                <div class="d-flex align-items-center justify-content-between mb-1">
                  <span class="badge bg-warning text-dark fw-bold font-monospace fs-9"><i class="fa-solid fa-robot me-1"></i>AI Principal Shadow Follow-Up:</span>
                  <button class="btn btn-glass py-0.5 px-1.5 fs-9 text-warning" id="btn-next-shadow-q"><i class="fa-solid fa-rotate me-1"></i> Next Prompt</button>
                </div>
                <p class="fs-8 text-light fw-medium mb-0" id="ai-shadow-question-text">
                  "How do you prevent race conditions when two concurrent requests hit different gateway instances simultaneously?"
                </p>
              </div>

              <h6 class="text-white fw-bold m-0 fs-7 mb-2"><i class="fa-solid fa-scale-balanced text-primary me-1.5"></i>FAANG 4-Pillar Scoring Rubric</h6>

              <!-- Rubric Sliders -->
              <div class="d-flex flex-column gap-2 mb-3">
                <div>
                  <div class="d-flex justify-content-between fs-9 font-monospace mb-1">
                    <span class="text-white">1. Problem Decomposition & Scope</span>
                    <span class="text-info fw-bold" id="val-rubric-1">3.5 / 5.0</span>
                  </div>
                  <input type="range" class="form-range rubric-slider" id="rubric-1" min="1" max="5" step="0.5" value="3.5">
                </div>

                <div>
                  <div class="d-flex justify-content-between fs-9 font-monospace mb-1">
                    <span class="text-white">2. Architecture & Scalability</span>
                    <span class="text-warning fw-bold" id="val-rubric-2">3.5 / 5.0</span>
                  </div>
                  <input type="range" class="form-range rubric-slider" id="rubric-2" min="1" max="5" step="0.5" value="3.5">
                </div>

                <div>
                  <div class="d-flex justify-content-between fs-9 font-monospace mb-1">
                    <span class="text-white">3. Code Quality & Correctness</span>
                    <span class="text-success fw-bold" id="val-rubric-3">3.5 / 5.0</span>
                  </div>
                  <input type="range" class="form-range rubric-slider" id="rubric-3" min="1" max="5" step="0.5" value="3.5">
                </div>

                <div>
                  <div class="d-flex justify-content-between fs-9 font-monospace mb-1">
                    <span class="text-white">4. Communication & Poise</span>
                    <span class="text-primary fw-bold" id="val-rubric-4">3.5 / 5.0</span>
                  </div>
                  <input type="range" class="form-range rubric-slider" id="rubric-4" min="1" max="5" step="0.5" value="3.5">
                </div>
              </div>

              <!-- Peer Feedback Notes -->
              <div>
                <label class="form-label text-secondary fs-9 fw-semibold mb-1">Interviewer Constructive Feedback & Red Flags</label>
                <textarea id="mock-feedback-notes" class="form-control form-control-sm bg-black text-white border-secondary border-opacity-50 p-2 fs-8 font-monospace" rows="3" placeholder="e.g. Strong high-level architecture. Could articulate memory complexity in the sliding window earlier."></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  };


  window.bindPeerMockEvents = () => {
    let mockTimer = null;
    let mockSeconds = 1800; // 30 mins
    let timerRunning = false;
    let activePart = 'A';
    let currentProblem = DEFAULT_MOCK_ROUNDS[0];
    let shadowQuestionIdx = 0;

    const timerDisplay = document.getElementById('timer-display');
    const timerBtn = document.getElementById('btn-timer-toggle');
    const timerIcon = document.getElementById('timer-icon');
    const turnBadge = document.getElementById('turn-badge');

    function updateTimerUI() {
      const m = Math.floor(mockSeconds / 60);
      const s = mockSeconds % 60;
      if (timerDisplay) timerDisplay.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }

    if (timerBtn) {
      timerBtn.addEventListener('click', () => {
        if (!timerRunning) {
          timerRunning = true;
          if (timerIcon) timerIcon.className = 'fa-solid fa-pause';
          AudioSynth.playChime(523, 784, 0.2);
          mockTimer = setInterval(() => {
            if (mockSeconds > 0) {
              mockSeconds--;
              updateTimerUI();
            } else {
              clearInterval(mockTimer);
              timerRunning = false;
              AudioSynth.playChime(660, 880, 0.4);
              if (activePart === 'A') {
                activePart = 'B';
                mockSeconds = 1800;
                if (turnBadge) {
                  turnBadge.textContent = 'Turn: Part B (Candidate Interviews You)';
                  turnBadge.className = 'badge bg-warning font-monospace fs-9';
                }
                updateTimerUI();
                safeToast('Part A complete! Switching turns to Part B (30 mins).', 'warning');
              } else {
                safeToast('Mock Interview round finished!', 'success');
              }
            }
          }, 1000);
        } else {
          clearInterval(mockTimer);
          timerRunning = false;
          if (timerIcon) timerIcon.className = 'fa-solid fa-play';
        }
      });
    }

    // Problem Select
    function syncProblemData(prob) {
      currentProblem = prob;
      const titleEl = document.getElementById('mock-problem-title');
      const descEl = document.getElementById('mock-problem-desc');
      const hintsList = document.getElementById('hints-list');
      const shadowQ = document.getElementById('ai-shadow-question-text');
      const langSel = document.getElementById('scratchpad-lang');
      const editor = document.getElementById('mock-code-editor');

      if (titleEl) titleEl.textContent = `[${prob.type}] ${prob.title}`;
      if (descEl) descEl.textContent = prob.description;
      if (hintsList) {
        hintsList.innerHTML = prob.hints.map(h => `<li class="mb-1">${h}</li>`).join('');
      }
      if (shadowQ) {
        shadowQuestionIdx = 0;
        shadowQ.textContent = prob.shadowFollowUps[0] || 'Explain your high-level architecture decisions.';
      }

      const lang = langSel ? langSel.value : 'java';
      if (editor && prob.starterCode && prob.starterCode[lang]) {
        editor.value = prob.starterCode[lang];
      }
    }

    const probSelect = document.getElementById('mock-problem-select');
    if (probSelect) {
      probSelect.addEventListener('change', () => {
        const p = DEFAULT_MOCK_ROUNDS.find(r => r.id === probSelect.value) || DEFAULT_MOCK_ROUNDS[0];
        syncProblemData(p);
      });
      syncProblemData(DEFAULT_MOCK_ROUNDS[0]);
    }

    // Language Select
    const langSelect = document.getElementById('scratchpad-lang');
    if (langSelect) {
      langSelect.addEventListener('change', () => {
        const lang = langSelect.value;
        const editor = document.getElementById('mock-code-editor');
        if (editor && currentProblem && currentProblem.starterCode && currentProblem.starterCode[lang]) {
          editor.value = currentProblem.starterCode[lang];
        }
      });
    }

    // Secret Hints Toggle
    const hintsBtn = document.getElementById('btn-toggle-secret-hints');
    if (hintsBtn) {
      hintsBtn.addEventListener('click', () => {
        const drawer = document.getElementById('secret-hints-drawer');
        if (drawer) drawer.classList.toggle('d-none');
      });
    }

    // Next AI Shadow Question
    const nextShadowBtn = document.getElementById('btn-next-shadow-q');
    if (nextShadowBtn) {
      nextShadowBtn.addEventListener('click', () => {
        if (currentProblem && currentProblem.shadowFollowUps) {
          shadowQuestionIdx = (shadowQuestionIdx + 1) % currentProblem.shadowFollowUps.length;
          const shadowQ = document.getElementById('ai-shadow-question-text');
          if (shadowQ) shadowQ.textContent = currentProblem.shadowFollowUps[shadowQuestionIdx];
          AudioSynth.playChime(660, 880, 0.15);
        }
      });
    }

    // Run Mock Tests
    const runTestsBtn = document.getElementById('btn-run-mock-tests');
    if (runTestsBtn) {
      runTestsBtn.addEventListener('click', () => {
        const term = document.getElementById('test-console-output');
        if (term) {
          term.classList.remove('d-none');
          term.innerHTML = '<span class="text-warning"><i class="fa-solid fa-spinner fa-spin me-1"></i> Compiling candidate source & running unit test assertions...</span>';
          setTimeout(() => {
            term.innerHTML = `
              <span class="text-success fw-bold"><i class="fa-solid fa-circle-check me-1"></i> All 4/4 Test Assertions Passed (24ms)</span>
              <div class="text-muted mt-1">&gt; testConcurrentThroughputQuota()... PASSED (0.8ms)<br>&gt; testRateLimiterEviction()... PASSED (1.4ms)<br>&gt; testSlidingWindowBurstTolerant()... PASSED (2.1ms)</div>
            `;
            AudioSynth.playChime(587, 880, 0.25);
          }, 600);
        }
      });
    }

    // Rubric Sliders
    function updateRubricScore() {
      const v1 = parseFloat(document.getElementById('rubric-1')?.value || 3.5);
      const v2 = parseFloat(document.getElementById('rubric-2')?.value || 3.5);
      const v3 = parseFloat(document.getElementById('rubric-3')?.value || 3.5);
      const v4 = parseFloat(document.getElementById('rubric-4')?.value || 3.5);

      const disp1 = document.getElementById('val-rubric-1');
      const disp2 = document.getElementById('val-rubric-2');
      const disp3 = document.getElementById('val-rubric-3');
      const disp4 = document.getElementById('val-rubric-4');

      if (disp1) disp1.textContent = `${v1.toFixed(1)} / 5.0`;
      if (disp2) disp2.textContent = `${v2.toFixed(1)} / 5.0`;
      if (disp3) disp3.textContent = `${v3.toFixed(1)} / 5.0`;
      if (disp4) disp4.textContent = `${v4.toFixed(1)} / 5.0`;

      const composite = ((v1 + v2 + v3 + v4) / 4).toFixed(1);
      const compEl = document.getElementById('composite-score-val');
      const badgeEl = document.getElementById('rubric-grade-badge');

      if (compEl) compEl.textContent = `${composite} / 5.0`;
      if (badgeEl) {
        if (composite >= 4.5) {
          badgeEl.textContent = 'Strong Hire (L6/FAANG Ready)';
          badgeEl.className = 'badge bg-success bg-opacity-20 text-success border border-success border-opacity-40';
        } else if (composite >= 3.8) {
          badgeEl.textContent = 'Solid Hire (L5 Bar)';
          badgeEl.className = 'badge bg-info bg-opacity-20 text-info border border-info border-opacity-40';
        } else if (composite >= 3.0) {
          badgeEl.textContent = 'Leaning Hire';
          badgeEl.className = 'badge bg-warning bg-opacity-20 text-warning border border-warning border-opacity-40';
        } else {
          badgeEl.textContent = 'Needs More Practice';
          badgeEl.className = 'badge bg-danger bg-opacity-20 text-danger border border-danger border-opacity-40';
        }
      }
    }

    document.querySelectorAll('.rubric-slider').forEach(slider => {
      slider.addEventListener('input', updateRubricScore);
    });

    // Export Debrief
    const exportDebriefBtn = document.getElementById('btn-export-mock-debrief');
    if (exportDebriefBtn) {
      exportDebriefBtn.addEventListener('click', () => {
        const v1 = document.getElementById('val-rubric-1')?.textContent || '3.5';
        const v2 = document.getElementById('val-rubric-2')?.textContent || '3.5';
        const v3 = document.getElementById('val-rubric-3')?.textContent || '3.5';
        const v4 = document.getElementById('val-rubric-4')?.textContent || '3.5';
        const comp = document.getElementById('composite-score-val')?.textContent || '3.5 / 5.0';
        const notes = document.getElementById('mock-feedback-notes')?.value || 'Solid round performance.';
        const code = document.getElementById('mock-code-editor')?.value || '';

        const report = `# FAANG Mock Interview Debrief Report\n**Date**: ${new Date().toISOString().slice(0, 10)}\n**Problem**: ${currentProblem.title} (${currentProblem.type})\n**Composite Score**: ${comp}\n\n## Rubric Breakdown\n- 1. Problem Decomposition: ${v1}\n- 2. Architecture & Scalability: ${v2}\n- 3. Code Correctness: ${v3}\n- 4. Communication & Poise: ${v4}\n\n## Interviewer Notes\n${notes}\n\n## Candidate Code Snapshot\n\`\`\`\n${code}\n\`\`\`\n`;

        navigator.clipboard.writeText(report).then(() => {
          AudioSynth.playChime(523, 784, 0.25);
          safeToast('Mock Interview debrief report copied to clipboard!', 'success');
        });
      });
    }
  };


  // =========================================================================
  // 4. 60-SECOND FEYNMAN AUDIO BITES (#/audio-bites)
  // =========================================================================

  const DEFAULT_AUDIO_BITES = [
    {
      id: 'feynman-1',
      title: 'The CAP Theorem & PACELC Trade-offs',
      category: 'Distributed Systems',
      durationSec: 68,
      script: 'Imagine a distributed bank database split between New York and London. The CAP Theorem states that when a network cable under the Atlantic snaps, creating a network partition, you must make a hard choice. Either you choose Consistency, meaning both servers refuse withdrawals until the network heals so account balances never drift apart, or you choose Availability, allowing customers in both cities to withdraw cash even though their local balances drift out of sync. But what happens during normal, happy-path operation when there is no partition? That is where the PACELC theorem comes in. It proves that even in healthy networks, you must trade Latency against Consistency. Synchronously waiting for both cities to acknowledge every update guarantees strict consistency, but skyrockets write latency. In high-scale system design, you almost always choose PACELC latency optimization with eventual consistency.',
      recallQuestion: 'What fundamental trade-off does the PACELC extension describe during non-partitioned normal operations?',
      recallAnswer: 'PACELC proves that during normal operations (else: E), a distributed system must still choose between Latency (L) and Consistency (C). Replicating data synchronously guarantees consistency but penalizes latency.'
    },
    {
      id: 'feynman-2',
      title: 'B-Trees vs LSM-Trees: Database Storage Engines',
      category: 'Database Internals',
      durationSec: 62,
      script: 'Why do Postgres and MySQL use B-Trees while Cassandra and RocksDB use Log-Structured Merge Trees? A B-Tree is an in-place update engine. When you update a user row, the database traverses pointers down to the exact 8-kilobyte leaf page on disk and rewrites that page in-place. This provides blistering, deterministic read speeds because looking up a single key requires traversing a shallow, balanced tree. But random disk writes cause severe write amplification. In contrast, an LSM-Tree never updates disk pages in place. All writes are appended sequentially to an in-memory MemTable and committed to an append-only Write-Ahead Log. Once full, the MemTable is flushed to disk as an immutable SSTable. This delivers 10x higher write throughput, but reads must check multiple levels of Bloom filters and SSTables. Remember: B-Trees for read-heavy workloads, LSM-Trees for extreme write throughput.',
      recallQuestion: 'Why does an LSM-Tree drastically outperform a B-Tree on high-frequency write workloads?',
      recallAnswer: 'LSM-Trees append all writes sequentially to memory and sequential disk files (SSTables), avoiding the high-cost random page overwrites and disk head seeks inherent in B-Trees.'
    },
    {
      id: 'feynman-3',
      title: 'Zero-Copy Architecture: Kafka, sendfile, and Kernel Space',
      category: 'Operating Systems & Messaging',
      durationSec: 65,
      script: 'How does Apache Kafka stream gigabytes of telemetry per second with virtually zero CPU utilization? In traditional web architectures, moving a file from disk to a network socket requires 4 context switches and 4 data copies between kernel space and user space. The operating system copies bytes from disk into the page cache, then copies them into your application buffer in user space, then copies them back down to the socket buffer in kernel space, and finally copies them to the Network Interface Card. Kafka eliminates this redundancy using the Linux sendfile system call, commonly known as Zero-Copy. The data is pulled directly from the OS page cache straight to the network interface buffer using Direct Memory Access. The CPU never touches the payload, user space is bypassed completely, and throughput reaches hardware wire speed.',
      recallQuestion: 'What system call does Kafka leverage to achieve zero-copy data transfer, and what is bypassed?',
      recallAnswer: 'Kafka leverages the Linux sendfile system call. It transfers data directly from the kernel page cache to the network socket buffer via DMA, completely bypassing user-space memory copies and context switches.'
    },
    {
      id: 'feynman-4',
      title: 'Consistent Hashing & Virtual Nodes in Distributed Systems',
      category: 'Distributed Systems',
      durationSec: 59,
      script: 'When caching millions of user sessions across 100 Redis servers, using a simple modulus operator like user ID modulo N is disastrous. The moment one cache node crashes or a new node is added, ninety-nine percent of all keys rehash to different servers, causing an immediate thundering herd cache stampede on your primary database. Consistent Hashing solves this by mapping both cache servers and data keys onto a virtual 360-degree ring from zero to two to the power of thirty-two minus one. A key is stored on the first server encountered moving clockwise. When a node fails, only the keys assigned to that single node must be remapped. Furthermore, by assigning multiple virtual nodes or replicas to each physical server on the ring, consistent hashing guarantees a perfectly uniform distribution of traffic and prevents hot-spot servers.',
      recallQuestion: 'Why are Virtual Nodes introduced into Consistent Hashing rings?',
      recallAnswer: 'Virtual nodes prevent hot-spots and non-uniform data clustering by mapping each physical machine to hundreds of pseudorandom positions along the hash ring, ensuring uniform load distribution.'
    },
    {
      id: 'feynman-5',
      title: 'Database Isolation Levels: Dirty Reads to Serializable',
      category: 'Database Concurrency',
      durationSec: 64,
      script: 'When multiple database transactions execute concurrently, what prevents financial data corruption? SQL defines four isolation levels. At Read Uncommitted, transactions can read uncommitted dirty writes that might be rolled back. At Read Committed, dirty reads are eliminated, but non-repeatable reads occur: if you query the same row twice, another transaction could update and commit it between your queries. Repeatable Read fixes this using snapshot isolation and multi-version concurrency control, guaranteeing that you always see data as it existed when your transaction started. However, phantom reads can still occur where new matching rows appear. Finally, Serializable isolation provides strict mathematical serial execution, eliminating all anomalies using two-phase locking or serializable snapshot isolation at the cost of higher transaction aborts and latency.',
      recallQuestion: 'What is the difference between a Non-Repeatable Read and a Phantom Read?',
      recallAnswer: 'A non-repeatable read occurs when an existing row is modified by another transaction between queries. A phantom read occurs when another transaction inserts new rows that match the query filter criteria.'
    }
  ];

  components.feynmanAudio = () => {
    return `
      <div class="container-fluid px-3 px-md-4 py-3 suite-scroll-container">
        <!-- Header -->
        <div class="d-flex flex-wrap justify-content-between align-items-center mb-3 pb-2 border-bottom border-secondary border-opacity-15 gap-2">
          <div>
            <div class="d-flex align-items-center gap-2">
              <span class="badge bg-info bg-opacity-25 text-info border border-info border-opacity-50 font-monospace fs-9">STUDIO AUDIO PODCAST</span>
              <h4 class="text-white fw-bold m-0 fs-5">60-Second Feynman Audio Bites</h4>
            </div>
            <p class="text-muted fs-8 mb-0 mt-1">Master distributed systems, database internals, and OS concurrency with high-definition studio podcast narration.</p>
          </div>
          <div class="d-flex align-items-center gap-2">
            <!-- Studio Focus Bed Toggle -->
            <button class="btn btn-sm btn-glass text-warning border border-warning border-opacity-30 fs-9" id="btn-toggle-ambience">
              <i class="fa-solid fa-headphones me-1"></i> <span id="ambience-status-text">Studio Ambience: OFF</span>
            </button>
            <!-- Continuous Commute Playlist Toggle -->
            <button class="btn btn-sm btn-glass text-info border border-info border-opacity-30 fs-9" id="btn-toggle-playlist">
              <i class="fa-solid fa-forward-step me-1"></i> <span id="playlist-status-text">Auto-Play Next: OFF</span>
            </button>
          </div>
        </div>

        <!-- Master Studio Audio Player -->
        <div class="card bg-dark border-primary border-opacity-40 rounded-3 p-3 mb-3 shadow" id="master-audio-player">
          <div class="d-flex flex-wrap align-items-center justify-content-between gap-3">
            <div class="d-flex align-items-center gap-3">
              <button class="btn btn-primary rounded-circle d-flex align-items-center justify-content-center shadow-lg" id="btn-audio-play-pause" style="width: 50px; height: 50px; min-width: 50px;">
                <i class="fa-solid fa-play fs-5" id="icon-play-state"></i>
              </button>
              <div>
                <span class="badge bg-primary bg-opacity-20 text-info font-monospace fs-9" id="player-category">SELECT A CONCEPT</span>
                <h5 class="text-white fw-bold fs-6 m-0 mt-0.5" id="player-title">Click any concept card below to begin podcast playback</h5>
              </div>
            </div>

            <!-- Waveform Visualizer -->
            <div class="d-flex align-items-center gap-1 audio-waveform-container" id="audio-waveform-bars">
              <span class="audio-bar"></span>
              <span class="audio-bar"></span>
              <span class="audio-bar"></span>
              <span class="audio-bar"></span>
              <span class="audio-bar"></span>
              <span class="audio-bar"></span>
              <span class="audio-bar"></span>
            </div>

            <div class="d-flex flex-wrap align-items-center gap-2">
              <!-- Voice Persona Selector -->
              <div class="dropdown">
                <button class="btn btn-sm btn-glass text-white font-monospace dropdown-toggle fs-9" data-bs-toggle="dropdown" id="btn-voice-persona">
                  <i class="fa-solid fa-user-tie text-info me-1"></i> <span id="persona-label">Deep Studio Host</span>
                </button>
                <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end shadow fs-9">
                  <li><button class="dropdown-item voice-persona-opt active" data-persona="host_deep">🎙️ Deep Studio Host (Baritone)</button></li>
                  <li><button class="dropdown-item voice-persona-opt" data-persona="host_smooth">🎙️ Smooth Co-Host (Clear & Warm)</button></li>
                  <li><button class="dropdown-item voice-persona-opt" data-persona="scholar_uk">🎙️ British Tech Scholar</button></li>
                </ul>
              </div>

              <!-- Speed Selector -->
              <div class="dropdown">
                <button class="btn btn-sm btn-glass text-white font-monospace dropdown-toggle fs-9" data-bs-toggle="dropdown" id="btn-audio-speed">1.0x</button>
                <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end shadow fs-9">
                  <li><button class="dropdown-item speed-opt" data-speed="0.9">0.9x Relaxed</button></li>
                  <li><button class="dropdown-item speed-opt active" data-speed="1.0">1.0x Studio Normal</button></li>
                  <li><button class="dropdown-item speed-opt" data-speed="1.2">1.2x Crisp Commute</button></li>
                  <li><button class="dropdown-item speed-opt" data-speed="1.5">1.5x Brisk</button></li>
                </ul>
              </div>

              <button class="btn btn-sm btn-glass text-secondary fs-9" id="btn-audio-rewind" title="Rewind 10s"><i class="fa-solid fa-rotate-left"></i> 10s</button>
            </div>
          </div>

          <!-- Progress Bar Scrubber -->
          <div class="mt-2.5">
            <div class="progress" style="height: 5px; background: rgba(255,255,255,0.08);">
              <div id="audio-progress-bar" class="progress-bar bg-info" style="width: 0%; transition: width 0.3s linear;"></div>
            </div>
            <div class="d-flex justify-content-between align-items-center mt-1">
              <span class="fs-9 text-muted font-monospace" id="audio-time-elapsed">0:00</span>
              <span class="fs-9 text-muted font-monospace" id="audio-time-total">0:60</span>
            </div>
          </div>

          <!-- Interactive Transcript (Click any sentence to seek) -->
          <div class="mt-2 pt-2 border-top border-secondary border-opacity-20">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <small class="text-secondary fs-9 font-monospace"><i class="fa-solid fa-quote-left me-1"></i> Interactive Podcast Transcript (Click any sentence to jump audio):</small>
            </div>
            <div class="fs-8 text-light font-monospace p-2 rounded bg-black bg-opacity-40 border border-secondary border-opacity-25" id="player-transcript" style="line-height: 1.8;">
              Select any concept card below to begin narration.
            </div>
          </div>

          <!-- Active Recall Challenge Block (Revealed after audio) -->
          <div class="mt-2.5 pt-2 border-top border-warning border-opacity-30 d-none" id="recall-challenge-block">
            <div class="p-2.5 rounded bg-warning bg-opacity-10 border border-warning border-opacity-30">
              <div class="d-flex align-items-center justify-content-between mb-1">
                <span class="badge bg-warning text-dark fw-bold font-monospace fs-9"><i class="fa-solid fa-bolt me-1"></i>Post-Lesson Active Recall Challenge:</span>
                <button class="btn btn-glass py-0.5 px-2 fs-9 text-warning" id="btn-reveal-recall-answer">Reveal Model Answer</button>
              </div>
              <p class="fs-8 text-white fw-semibold mb-1" id="recall-q-text"></p>
              <div class="p-2 rounded bg-black bg-opacity-60 border border-secondary border-opacity-30 fs-8 text-info font-monospace d-none" id="recall-a-text"></div>
            </div>
          </div>
        </div>

        <!-- Concepts Catalog Grid -->
        <div class="row g-3">
          ${DEFAULT_AUDIO_BITES.map((bite, index) => `
            <div class="col-12 col-md-6 col-xl-4">
              <div class="card bg-dark bg-opacity-70 border-secondary border-opacity-30 rounded-3 p-3 h-100 shadow-sm feynman-card position-relative" data-id="${bite.id}">
                <div class="d-flex justify-content-between align-items-start mb-2">
                  <span class="badge bg-secondary bg-opacity-30 text-info border border-secondary border-opacity-30 font-monospace fs-9">${bite.category}</span>
                  <span class="text-muted fs-9 font-monospace"><i class="fa-regular fa-clock me-1"></i>${bite.durationSec}s</span>
                </div>
                <h6 class="text-white fw-bold fs-7 mb-2">${bite.title}</h6>
                <p class="text-secondary fs-8 mb-3" style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.5;">
                  ${bite.script}
                </p>
                <div class="mt-auto d-flex justify-content-between align-items-center pt-2 border-top border-secondary border-opacity-20">
                  <span class="fs-9 text-muted font-monospace">Track #${index + 1}</span>
                  <button class="btn btn-sm btn-outline-info py-1 px-3 play-bite-btn" data-id="${bite.id}">
                    <i class="fa-solid fa-play me-1"></i> Listen
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  };


  window.bindFeynmanAudioEvents = () => {
    let currentBite = null;
    let currentUtterance = null;
    let isPlaying = false;
    let currentPlaybackRate = 1.0;
    let currentPersona = 'host_deep';
    let progressTimer = null;
    let elapsedSeconds = 0;
    let ambienceEnabled = false;
    let continuousPlaylist = false;
    let currentBiteIndex = 0;

    let sentenceList = [];
    let activeSentenceIndex = 0;

    const playPauseBtn = document.getElementById('btn-audio-play-pause');
    const playIcon = document.getElementById('icon-play-state');
    const playerCategory = document.getElementById('player-category');
    const playerTitle = document.getElementById('player-title');
    const waveformBars = document.getElementById('audio-waveform-bars');
    const progressBar = document.getElementById('audio-progress-bar');
    const timeElapsedEl = document.getElementById('audio-time-elapsed');
    const timeTotalEl = document.getElementById('audio-time-total');
    const transcriptEl = document.getElementById('player-transcript');
    const speedBtn = document.getElementById('btn-audio-speed');
    const personaLabel = document.getElementById('persona-label');
    const ambienceBtn = document.getElementById('btn-toggle-ambience');
    const ambienceStatus = document.getElementById('ambience-status-text');
    const playlistBtn = document.getElementById('btn-toggle-playlist');
    const playlistStatus = document.getElementById('playlist-status-text');
    const recallBlock = document.getElementById('recall-challenge-block');
    const recallQ = document.getElementById('recall-q-text');
    const recallA = document.getElementById('recall-a-text');
    const revealRecallBtn = document.getElementById('btn-reveal-recall-answer');

    // Ambience Toggle
    if (ambienceBtn) {
      ambienceBtn.addEventListener('click', () => {
        ambienceEnabled = !ambienceEnabled;
        if (ambienceEnabled) {
          AudioSynth.startAmbience();
          ambienceBtn.className = 'btn btn-sm btn-warning text-dark border-0 fs-9';
          if (ambienceStatus) ambienceStatus.textContent = 'Studio Ambience: ON';
          safeToast('432Hz focus drone & room tone enabled', 'info');
        } else {
          AudioSynth.stopAmbience();
          ambienceBtn.className = 'btn btn-sm btn-glass text-warning border border-warning border-opacity-30 fs-9';
          if (ambienceStatus) ambienceStatus.textContent = 'Studio Ambience: OFF';
        }
      });
    }

    // Playlist Toggle
    if (playlistBtn) {
      playlistBtn.addEventListener('click', () => {
        continuousPlaylist = !continuousPlaylist;
        if (continuousPlaylist) {
          playlistBtn.className = 'btn btn-sm btn-info text-dark border-0 fs-9';
          if (playlistStatus) playlistStatus.textContent = 'Auto-Play Next: ON';
          safeToast('Continuous Commute Playlist enabled', 'info');
        } else {
          playlistBtn.className = 'btn btn-sm btn-glass text-info border border-info border-opacity-30 fs-9';
          if (playlistStatus) playlistStatus.textContent = 'Auto-Play Next: OFF';
        }
      });
    }

    // Reveal Active Recall Answer
    if (revealRecallBtn && recallA) {
      revealRecallBtn.addEventListener('click', () => {
        recallA.classList.toggle('d-none');
        revealRecallBtn.textContent = recallA.classList.contains('d-none') ? 'Reveal Model Answer' : 'Hide Answer';
      });
    }

    function renderTranscript(scriptText) {
      if (!transcriptEl) return;
      sentenceList = scriptText.match(/[^.!?]+[.!?]+/g) || [scriptText];
      if (sentenceList.length > 0) {
        transcriptEl.innerHTML = sentenceList.map((sen, idx) => `
          <span class="transcript-sentence ${idx === activeSentenceIndex ? 'active' : ''}" data-idx="${idx}" style="cursor: pointer; transition: all 0.2s ease;">
            ${sen.trim()}
          </span>
        `).join(' ');

        transcriptEl.querySelectorAll('.transcript-sentence').forEach(span => {
          span.addEventListener('click', () => {
            const idx = parseInt(span.getAttribute('data-idx'), 10);
            activeSentenceIndex = idx;
            const remainingScript = sentenceList.slice(idx).join(' ');
            if (currentBite) {
              startPlayback(currentBite, remainingScript, idx);
            }
          });
        });
      } else {
        transcriptEl.textContent = scriptText;
      }
    }

    function highlightSentence(idx) {
      activeSentenceIndex = idx;
      if (!transcriptEl) return;
      transcriptEl.querySelectorAll('.transcript-sentence').forEach((span, i) => {
        if (i === idx) {
          span.style.background = 'rgba(56, 189, 248, 0.25)';
          span.style.color = '#38bdf8';
          span.style.borderRadius = '3px';
          span.style.padding = '1px 4px';
        } else {
          span.style.background = 'transparent';
          span.style.color = 'inherit';
          span.style.padding = '0';
        }
      });
    }

    function stopPlayback() {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      isPlaying = false;
      if (progressTimer) {
        clearInterval(progressTimer);
        progressTimer = null;
      }
      if (playIcon) playIcon.className = 'fa-solid fa-play fs-5';
      if (waveformBars) waveformBars.classList.remove('active');
    }

    function startPlayback(bite, customScript = null, startSentenceIdx = 0) {
      stopPlayback();
      currentBite = bite;
      currentBiteIndex = DEFAULT_AUDIO_BITES.findIndex(b => b.id === bite.id);

      if (playerCategory) playerCategory.textContent = bite.category.toUpperCase();
      if (playerTitle) playerTitle.textContent = bite.title;

      const scriptToRead = customScript || bite.script;
      if (!customScript) {
        renderTranscript(bite.script);
      }
      highlightSentence(startSentenceIdx);

      // Hide previous recall challenge
      if (recallBlock) recallBlock.classList.add('d-none');
      if (recallA) recallA.classList.add('d-none');
      if (revealRecallBtn) revealRecallBtn.textContent = 'Reveal Model Answer';

      if (!('speechSynthesis' in window)) {
        safeToast('Web Speech API is not supported in this browser.', 'warning');
        return;
      }

      currentUtterance = new SpeechSynthesisUtterance(scriptToRead);
      const selectedVoice = getBestVoice(currentPersona);
      if (selectedVoice) currentUtterance.voice = selectedVoice;

      if (currentPersona === 'host_deep') {
        currentUtterance.pitch = 0.92;
        currentUtterance.rate = 0.98 * currentPlaybackRate;
      } else if (currentPersona === 'host_smooth') {
        currentUtterance.pitch = 0.98;
        currentUtterance.rate = 0.98 * currentPlaybackRate;
      } else {
        currentUtterance.pitch = 0.95;
        currentUtterance.rate = 0.96 * currentPlaybackRate;
      }

      const totalSec = Math.round(bite.durationSec / currentPlaybackRate);
      if (!customScript) {
        elapsedSeconds = 0;
      } else {
        elapsedSeconds = Math.round((startSentenceIdx / Math.max(1, sentenceList.length)) * totalSec);
      }

      if (timeTotalEl) {
        const tm = Math.floor(totalSec / 60);
        const ts = totalSec % 60;
        timeTotalEl.textContent = `${tm}:${ts.toString().padStart(2, '0')}`;
      }

      currentUtterance.onstart = () => {
        isPlaying = true;
        if (playIcon) playIcon.className = 'fa-solid fa-pause fs-5';
        if (waveformBars) waveformBars.classList.add('active');

        progressTimer = setInterval(() => {
          elapsedSeconds++;
          const pct = Math.min(100, (elapsedSeconds / Math.max(1, totalSec)) * 100);
          if (progressBar) progressBar.style.width = pct + '%';
          if (timeElapsedEl) {
            const em = Math.floor(elapsedSeconds / 60);
            const es = elapsedSeconds % 60;
            timeElapsedEl.textContent = `${em}:${es.toString().padStart(2, '0')}`;
          }
          if (sentenceList.length > 1) {
            const sentenceDuration = totalSec / sentenceList.length;
            const targetIdx = Math.min(sentenceList.length - 1, Math.floor(elapsedSeconds / sentenceDuration));
            highlightSentence(targetIdx);
          }
        }, 1000);
      };

      currentUtterance.onend = () => {
        stopPlayback();
        if (progressBar) progressBar.style.width = '100%';
        highlightSentence(-1);
        AudioSynth.playChime(660, 880, 0.25);

        // Show Post-Lesson Active Recall Challenge
        if (bite.recallQuestion && recallBlock && recallQ && recallA) {
          recallQ.textContent = bite.recallQuestion;
          recallA.textContent = bite.recallAnswer;
          recallBlock.classList.remove('d-none');
        }

        // Auto-play next in Continuous Playlist mode
        if (continuousPlaylist) {
          const nextIdx = (currentBiteIndex + 1) % DEFAULT_AUDIO_BITES.length;
          safeToast(`Auto-advancing to: ${DEFAULT_AUDIO_BITES[nextIdx].title}`, 'info');
          setTimeout(() => {
            startPlayback(DEFAULT_AUDIO_BITES[nextIdx]);
          }, 2000);
        }
      };

      currentUtterance.onerror = (e) => {
        console.warn('Speech synthesis event notice:', e);
        stopPlayback();
      };

      window.speechSynthesis.speak(currentUtterance);
    }

    if (playPauseBtn) {
      playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
          if ('speechSynthesis' in window) window.speechSynthesis.pause();
          isPlaying = false;
          if (playIcon) playIcon.className = 'fa-solid fa-play fs-5';
          if (waveformBars) waveformBars.classList.remove('active');
          if (progressTimer) clearInterval(progressTimer);
        } else if (currentBite) {
          if ('speechSynthesis' in window && window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
            isPlaying = true;
            if (playIcon) playIcon.className = 'fa-solid fa-pause fs-5';
            if (waveformBars) waveformBars.classList.add('active');
            const totalSec = Math.round(currentBite.durationSec / currentPlaybackRate);
            progressTimer = setInterval(() => {
              elapsedSeconds++;
              const pct = Math.min(100, (elapsedSeconds / Math.max(1, totalSec)) * 100);
              if (progressBar) progressBar.style.width = pct + '%';
              if (timeElapsedEl) {
                const em = Math.floor(elapsedSeconds / 60);
                const es = elapsedSeconds % 60;
                timeElapsedEl.textContent = `${em}:${es.toString().padStart(2, '0')}`;
              }
            }, 1000);
          } else {
            startPlayback(currentBite);
          }
        } else {
          startPlayback(DEFAULT_AUDIO_BITES[0]);
        }
      });
    }

    // Concept Card Listen buttons
    document.querySelectorAll('.play-bite-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const bite = DEFAULT_AUDIO_BITES.find(b => b.id === id);
        if (bite) startPlayback(bite);
      });
    });

    // Speed Selector
    document.querySelectorAll('.speed-opt').forEach(opt => {
      opt.addEventListener('click', () => {
        document.querySelectorAll('.speed-opt').forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
        currentPlaybackRate = parseFloat(opt.getAttribute('data-speed'));
        if (speedBtn) speedBtn.textContent = `${currentPlaybackRate}x`;
        if (isPlaying && currentBite) {
          startPlayback(currentBite, null, activeSentenceIndex);
        }
      });
    });

    // Voice Persona Selector
    document.querySelectorAll('.voice-persona-opt').forEach(opt => {
      opt.addEventListener('click', () => {
        document.querySelectorAll('.voice-persona-opt').forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
        currentPersona = opt.getAttribute('data-persona');
        if (personaLabel) {
          if (currentPersona === 'host_deep') personaLabel.textContent = 'Deep Studio Host';
          else if (currentPersona === 'host_smooth') personaLabel.textContent = 'Smooth Co-Host';
          else personaLabel.textContent = 'British Scholar';
        }
        if (isPlaying && currentBite) {
          startPlayback(currentBite, null, activeSentenceIndex);
        }
      });
    });

    // Rewind 10s
    const rewindBtn = document.getElementById('btn-audio-rewind');
    if (rewindBtn) {
      rewindBtn.addEventListener('click', () => {
        if (currentBite && isPlaying) {
          elapsedSeconds = Math.max(0, elapsedSeconds - 10);
          const totalSec = Math.round(currentBite.durationSec / currentPlaybackRate);
          const pct = Math.min(100, (elapsedSeconds / Math.max(1, totalSec)) * 100);
          if (progressBar) progressBar.style.width = pct + '%';
          const targetSentence = Math.max(0, Math.floor((elapsedSeconds / totalSec) * sentenceList.length));
          startPlayback(currentBite, sentenceList.slice(targetSentence).join(' '), targetSentence);
        }
      });
    }
  };


  // =========================================================================
  // 6. REVERSE INTERVIEW KIT & CULTURAL RISK RADAR (#/reverse-interview)
  // =========================================================================

  const DEFAULT_REVERSE_QUESTIONS = [
    {
      id: 'rev-peer-1',
      stage: 'peer',
      tier: 'Senior Peer / Tech Lead',
      question: 'When was the last time the on-call engineer was paged after midnight, and what was the blameless post-mortem follow-up?',
      greenFlag: 'Blameless post-mortems generate prioritized P0 backlog tickets that are immediately scheduled into next sprint.',
      redFlag: 'Engineers shrug it off as \'normal\', repeat outages happen frequently, or individuals are blamed.',
      starred: true
    },
    {
      id: 'rev-peer-2',
      stage: 'peer',
      tier: 'Senior Peer / Tech Lead',
      question: 'What is the deployment process from merging a PR to production, and what happens if a regression breaks?',
      greenFlag: 'Fully automated CI/CD canary deployments with automated telemetry rollback and zero human gatekeepers.',
      redFlag: 'Manual testing spreadsheets, bi-weekly release trains, or code freeze periods spanning weeks.',
      starred: true
    },
    {
      id: 'rev-mgr-1',
      stage: 'manager',
      tier: 'Engineering Manager',
      question: 'What does a high-performing engineer do in this role during their first 90 days, and how is failure handled?',
      greenFlag: 'Clear 30-60-90 onboarding milestones; failure is treated as an organizational learning feedback loop.',
      redFlag: 'Vague \'hit the ground running\', no dedicated mentor, or unclear expectations of output.',
      starred: true
    },
    {
      id: 'rev-mgr-2',
      stage: 'manager',
      tier: 'Engineering Manager',
      question: 'How do you balance product roadmap feature pressure against engineering technical debt refactoring?',
      greenFlag: 'Dedicated 20% engineering budget or quarterly tech-debt sprints baked into OKRs.',
      redFlag: '\'We will fix it later\' mindset; product management dictates engineering architecture without engineering veto.',
      starred: false
    },
    {
      id: 'rev-dir-1',
      stage: 'director',
      tier: 'VP / Director',
      question: 'What is the biggest existential technical or market risk the engineering org faces over the next 18 months?',
      greenFlag: 'Candid, transparent analysis of competitive pressures, AI shifts, and modernization challenges.',
      redFlag: 'Defensiveness, hand-waving, or pretending no competitors or architectural bottlenecks exist.',
      starred: true
    },
    {
      id: 'rev-rec-1',
      stage: 'recruiter',
      tier: 'Recruiter Screen',
      question: 'Why is this role open: is it net-new organizational growth or backfilling a departure?',
      greenFlag: 'Transparent explanation of team expansion, newly funded initiatives, or promotion transitions.',
      redFlag: 'Hesitation, multiple people churning out of the team within 6 months, or vague re-org explanations.',
      starred: false
    }
  ];

  components.reverseInterview = () => {
    let questions = [];
    try {
      questions = JSON.parse(localStorage.getItem('prepspace_reverse_questions')) || DEFAULT_REVERSE_QUESTIONS;
    } catch(e) { questions = DEFAULT_REVERSE_QUESTIONS; }

    const starredList = questions.filter(q => q.starred);

    return `
      <div class="container-fluid px-3 px-md-4 py-3 suite-scroll-container">
        <!-- Header -->
        <div class="d-flex flex-wrap justify-content-between align-items-center mb-3 pb-2 border-bottom border-secondary border-opacity-15 gap-2">
          <div>
            <div class="d-flex align-items-center gap-2">
              <span class="badge bg-info bg-opacity-25 text-info border border-info border-opacity-50 font-monospace fs-9">EXECUTIVE DUE DILIGENCE</span>
              <h4 class="text-white fw-bold m-0 fs-5">Reverse Interview Kit & Cultural Risk Radar</h4>
            </div>
            <p class="text-muted fs-8 mb-0 mt-1">Interview your interviewer: detect toxic engineering cultures, decode red flags, and build your Pocket Deck.</p>
          </div>
          <div class="d-flex gap-2">
            <button class="btn btn-outline-info btn-sm px-3" id="btn-export-index-card">
              <i class="fa-solid fa-note-sticky me-1"></i> 3x5 Pocket Cheat Sheet
            </button>
            <button class="btn btn-primary btn-sm px-3" data-bs-toggle="modal" data-bs-target="#addReverseModal">
              <i class="fa-solid fa-plus me-1"></i> Add Custom Question
            </button>
          </div>
        </div>

        <!-- Pocket Deck Ribbon -->
        <div class="card bg-dark bg-opacity-70 border-secondary border-opacity-30 rounded-3 p-3 mb-3 shadow-sm">
          <div class="d-flex flex-wrap align-items-center justify-content-between gap-2">
            <div class="d-flex align-items-center gap-2">
              <span class="badge bg-warning text-dark font-monospace fs-8"><i class="fa-solid fa-star me-1"></i>Active Pocket Deck</span>
              <span class="text-white fw-bold fs-7" id="pocket-count-label">${starredList.length} Questions Starred</span>
            </div>
            <div class="d-flex gap-2">
              <button class="btn btn-sm btn-primary py-1 px-3 fs-9" id="btn-copy-pocket-deck">
                <i class="fa-solid fa-copy me-1"></i> Copy Pocket Deck Notes
              </button>
            </div>
          </div>
        </div>

        <!-- Stage Filter Pills -->
        <div class="d-flex flex-wrap gap-1.5 mb-3" id="reverse-stage-pills">
          <button class="btn btn-sm btn-glass active fs-9 rev-filter-btn" data-stage="all">All Questions (${questions.length})</button>
          <button class="btn btn-sm btn-glass fs-9 rev-filter-btn" data-stage="recruiter">Recruiter Screen</button>
          <button class="btn btn-sm btn-glass fs-9 rev-filter-btn" data-stage="peer">Senior Peer / Tech Lead</button>
          <button class="btn btn-sm btn-glass fs-9 rev-filter-btn" data-stage="manager">Engineering Manager</button>
          <button class="btn btn-sm btn-glass fs-9 rev-filter-btn" data-stage="director">VP / Director</button>
        </div>

        <!-- Questions List Grid -->
        <div class="row g-3" id="reverse-questions-container">
          ${questions.map((q) => `
            <div class="col-12 col-xl-6 rev-question-card" data-stage="${q.stage}" data-id="${q.id}">
              <div class="card bg-dark bg-opacity-70 border-secondary border-opacity-30 rounded-3 p-3 h-100 shadow-sm cultural-risk-card position-relative">
                <div class="d-flex justify-content-between align-items-start mb-2">
                  <span class="badge bg-secondary bg-opacity-30 text-info border border-secondary border-opacity-30 font-monospace fs-9">${q.tier}</span>
                  <button class="btn btn-glass btn-sm p-1 px-2 toggle-star-rev-btn text-warning" data-id="${q.id}">
                    <i class="${q.starred ? 'fa-solid' : 'fa-regular'} fa-star"></i>
                  </button>
                </div>

                <h6 class="text-white fw-bold fs-7 mb-2" style="line-height: 1.5;">"${q.question}"</h6>

                <!-- Green Flag / Red Flag Radar -->
                <div class="d-flex flex-column gap-1.5 mb-3">
                  <div class="p-2 rounded bg-black bg-opacity-40 border-start border-3 border-success">
                    <span class="text-success font-monospace fs-9 fw-bold d-block mb-0.5"><i class="fa-solid fa-circle-check me-1"></i> Green Flag Signal:</span>
                    <p class="fs-8 text-light mb-0">${q.greenFlag}</p>
                  </div>
                  <div class="p-2 rounded bg-black bg-opacity-40 border-start border-3 border-danger">
                    <span class="text-danger font-monospace fs-9 fw-bold d-block mb-0.5"><i class="fa-solid fa-triangle-exclamation me-1"></i> Red Flag Warning:</span>
                    <p class="fs-8 text-light mb-0">${q.redFlag}</p>
                  </div>
                </div>

                <div class="mt-auto d-flex justify-content-between align-items-center pt-2 border-top border-secondary border-opacity-20">
                  <small class="text-muted fs-9 font-monospace">Stage: ${q.tier}</small>
                  <button class="btn btn-sm btn-glass text-light py-0.5 px-2 fs-9 copy-single-rev-q" data-id="${q.id}">
                    <i class="fa-solid fa-copy me-1"></i> Copy Question
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Add Custom Question Modal -->
      <div class="modal fade" id="addReverseModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content bg-dark text-white border-secondary border-opacity-40">
            <div class="modal-header border-secondary border-opacity-25 py-2.5">
              <h5 class="modal-title fs-6"><i class="fa-solid fa-plus text-primary me-2"></i>Add Reverse Interview Question</h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body p-3">
              <div class="mb-2">
                <label class="form-label fs-8 text-secondary fw-semibold">Interviewer Stage</label>
                <select id="modal-rev-stage" class="form-select form-select-sm bg-black text-white border-secondary border-opacity-50">
                  <option value="peer" selected>Senior Peer / Tech Lead</option>
                  <option value="manager">Engineering Manager</option>
                  <option value="director">VP / Director</option>
                  <option value="recruiter">Recruiter Screen</option>
                </select>
              </div>
              <div class="mb-2">
                <label class="form-label fs-8 text-secondary fw-semibold">Target Question *</label>
                <textarea id="modal-rev-question" class="form-control form-control-sm bg-black text-white border-secondary border-opacity-50" rows="2" placeholder="e.g. How do performance calibrations handle disagreements between managers?"></textarea>
              </div>
              <div class="mb-2">
                <label class="form-label fs-8 text-success fw-semibold">Green Flag (Ideal Answer)</label>
                <input type="text" id="modal-rev-green" class="form-control form-control-sm bg-black text-white border-secondary border-opacity-50" placeholder="e.g. Committee reviews with anonymous calibration data">
              </div>
              <div class="mb-2">
                <label class="form-label fs-8 text-danger fw-semibold">Red Flag (Warning Sign)</label>
                <input type="text" id="modal-rev-red" class="form-control form-control-sm bg-black text-white border-secondary border-opacity-50" placeholder="e.g. Solo manager discretion, political favorites">
              </div>
            </div>
            <div class="modal-footer border-secondary border-opacity-25 py-2">
              <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-primary btn-sm px-3" id="btn-save-new-rev-q"><i class="fa-solid fa-check me-1"></i> Save to Kit</button>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  window.bindReverseInterviewEvents = () => {
    // Filter by stage
    document.querySelectorAll('.rev-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.rev-filter-btn').forEach(b => b.classList.remove('active', 'btn-primary'));
        btn.classList.add('active', 'btn-primary');
        const st = btn.getAttribute('data-stage');

        document.querySelectorAll('.rev-question-card').forEach(card => {
          if (st === 'all') card.style.display = '';
          else card.style.display = card.getAttribute('data-stage') === st ? '' : 'none';
        });
      });
    });

    // Reactive Star Toggle (no full page reload)
    document.querySelectorAll('.toggle-star-rev-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        let questions = [];
        try {
          questions = JSON.parse(localStorage.getItem('prepspace_reverse_questions')) || DEFAULT_REVERSE_QUESTIONS;
        } catch(e) { questions = DEFAULT_REVERSE_QUESTIONS; }

        const q = questions.find(it => it.id === id);
        if (q) {
          q.starred = !q.starred;
          localStorage.setItem('prepspace_reverse_questions', JSON.stringify(questions));

          const icon = btn.querySelector('i');
          if (icon) {
            icon.className = q.starred ? 'fa-solid fa-star' : 'fa-regular fa-star';
          }
          AudioSynth.playChime(660, 880, 0.15);

          const starredCount = questions.filter(it => it.starred).length;
          const countLbl = document.getElementById('pocket-count-label');
          if (countLbl) countLbl.textContent = `${starredCount} Questions Starred`;
          safeToast(q.starred ? 'Starred to Pocket Deck!' : 'Removed from Pocket Deck', 'info');
        }
      });
    });

    // Copy Single Question
    document.querySelectorAll('.copy-single-rev-q').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        let questions = [];
        try {
          questions = JSON.parse(localStorage.getItem('prepspace_reverse_questions')) || DEFAULT_REVERSE_QUESTIONS;
        } catch(e) { questions = DEFAULT_REVERSE_QUESTIONS; }

        const q = questions.find(it => it.id === id);
        if (q) {
          const txt = `"${q.question}"\n\n[Green Flag Signal]: ${q.greenFlag}\n[Red Flag Warning]: ${q.redFlag}`;
          navigator.clipboard.writeText(txt).then(() => {
            AudioSynth.playChime(523, 659, 0.2);
            safeToast('Question copied to clipboard!', 'success');
          });
        }
      });
    });

    // Copy Full Pocket Deck
    const copyDeckBtn = document.getElementById('btn-copy-pocket-deck');
    if (copyDeckBtn) {
      copyDeckBtn.addEventListener('click', () => {
        let questions = [];
        try {
          questions = JSON.parse(localStorage.getItem('prepspace_reverse_questions')) || DEFAULT_REVERSE_QUESTIONS;
        } catch(e) { questions = DEFAULT_REVERSE_QUESTIONS; }

        const starred = questions.filter(q => q.starred);
        if (starred.length === 0) {
          safeToast('Star at least 1 question to copy your pocket deck!', 'warning');
          return;
        }

        let output = `# My Interview Pocket Deck (${starred.length} Selected Questions)\n\n`;
        starred.forEach((q, idx) => {
          output += `### ${idx + 1}. [${q.tier}] ${q.question}\n- 🟢 Green Flag: ${q.greenFlag}\n- 🔴 Red Flag: ${q.redFlag}\n\n`;
        });

        navigator.clipboard.writeText(output).then(() => {
          AudioSynth.playChime(587, 880, 0.25);
          safeToast('Copied Pocket Deck to clipboard!', 'success');
        });
      });
    }

    // 3x5 Index Card Cheat Sheet Export
    const indexCardBtn = document.getElementById('btn-export-index-card');
    if (indexCardBtn) {
      indexCardBtn.addEventListener('click', () => {
        let questions = [];
        try {
          questions = JSON.parse(localStorage.getItem('prepspace_reverse_questions')) || DEFAULT_REVERSE_QUESTIONS;
        } catch(e) { questions = DEFAULT_REVERSE_QUESTIONS; }

        const starred = questions.filter(q => q.starred);
        let text = '=== PREPSPACE 3x5 INTERVIEW POCKET CHEAT SHEET ===\n\n';
        starred.forEach((q, i) => {
          text += `[Q${i+1}] (${q.tier.toUpperCase()})\n"${q.question}"\n-> Watch for: ${q.greenFlag}\n\n`;
        });

        navigator.clipboard.writeText(text).then(() => {
          AudioSynth.playChime(523, 784, 0.25);
          safeToast('3x5 Pocket Cheat Sheet formatted & copied to clipboard!', 'success');
        });
      });
    }

    // Save Custom Question
    const saveNewBtn = document.getElementById('btn-save-new-rev-q');
    if (saveNewBtn) {
      saveNewBtn.addEventListener('click', () => {
        const stage = document.getElementById('modal-rev-stage')?.value || 'peer';
        const question = document.getElementById('modal-rev-question')?.value.trim();
        const green = document.getElementById('modal-rev-green')?.value.trim();
        const red = document.getElementById('modal-rev-red')?.value.trim();

        if (!question) {
          safeToast('Please enter a question statement.', 'warning');
          return;
        }

        const tierMap = {
          recruiter: 'Recruiter Screen',
          peer: 'Senior Peer / Tech Lead',
          manager: 'Engineering Manager',
          director: 'VP / Director'
        };

        let questions = [];
        try {
          questions = JSON.parse(localStorage.getItem('prepspace_reverse_questions')) || DEFAULT_REVERSE_QUESTIONS;
        } catch(e) { questions = DEFAULT_REVERSE_QUESTIONS; }

        questions.unshift({
          id: 'rev-' + Date.now(),
          stage,
          tier: tierMap[stage] || 'Peer Engineer',
          question,
          greenFlag: green || 'Clear, transparent explanation',
          redFlag: red || 'Defensiveness or ambiguity',
          starred: true
        });

        localStorage.setItem('prepspace_reverse_questions', JSON.stringify(questions));

        const modalEl = document.getElementById('addReverseModal');
        if (modalEl && window.bootstrap) {
          const m = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
          if (m) m.hide();
        }
        document.querySelectorAll('.modal-backdrop').forEach(b => b.remove());
        document.body.classList.remove('modal-open');

        AudioSynth.playChime(587, 880, 0.3);
        safeToast('Added custom question to your kit!', 'success');

        setTimeout(() => {
          const mount = document.getElementById('page-mount');
          if (mount) {
            mount.innerHTML = components.reverseInterview();
            bindReverseInterviewEvents();
          }
        }, 150);
      });
    }
  };

})();


