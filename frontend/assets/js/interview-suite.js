/**
 * interview-suite.js - PrepSpace Advanced Interview Readiness & Career Accelerator Suite
 * 
 * Version: 4.5.0 (Studio Audio Podcast Engine & Interactive Polish Release)
 * Author: PrepSpace Engineering / Nagesh Methre
 * 
 * Included Suites:
 * 1. Recruiter Outreach & Cold Message CRM (#/outreach)
 *    - Smart Hook Generator, LinkedIn 300c Gauge, Launch Email/LinkedIn, CSV Export, Kanban
 * 2. STAR Story Vault & Behavioral Bank (#/star-vault)
 *    - 4-Box Matrix, 2-Min Pacing Practice Stopwatch, AI Feedback Prompt, Principle Filters
 * 3. Peer-to-Peer Mock Exchange & FAANG Rubric Arena (#/peer-mock)
 *    - 30m+30m Dual Track, Audio Round Chime, Dynamic Rubric Calculator, Secret Hints, Code Runner
 * 4. 60-Second Feynman Audio Bites with Studio Podcast Engine (#/audio-bites)
 *    - Neural Voice Discovery, 3 Persona Modes (Deep Baritone, Smooth Co-Host, British Scholar),
 *      Web Audio Studio Ambience Focus Bed, Interactive Sentence Highlighting & Jumping
 * 5. Emergency 60-Minute Pre-Interview Crisis Booster (#/interview-booster)
 *    - Active Recall Flashcard Mode, 5 Tech Stacks, Box Breathing Audio Chimes, Camera/Mic Diagnostics
 * 6. Reverse Interview Kit ("Questions to Ask Them") (#/reverse-interview)
 *    - 20+ High-Caliber Questions, Green/Red Flag Guides, Personal Interview Notes, Custom Questions
 */

(function() {
  'use strict';

  window.components = window.components || {};

  // =========================================================================
  // 0. SHARED AUDIO & VOICE SYNTHESIS ENGINES
  // =========================================================================

  const AudioSynth = {
    ctx: null,
    ambienceSource: null,
    ambienceGain: null,
    getCtx() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return this.ctx;
    },
    playChime(freq1 = 587.33, freq2 = 880, duration = 0.8) {
      try {
        const ctx = this.getCtx();
        if (!ctx) return;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq1, now);
        osc.frequency.exponentialRampToValueAtTime(freq2, now + 0.15);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + duration);
      } catch (e) {
        console.warn('Audio chime notice:', e);
      }
    },
    playBreathCue(type = 'inhale') {
      try {
        const ctx = this.getCtx();
        if (!ctx) return;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        const freq = type === 'inhale' ? 440 : (type === 'hold' ? 523.25 : 329.63);
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 1.2);
      } catch (e) {
        console.warn('Breath cue notice:', e);
      }
    },
    startAmbience() {
      try {
        const ctx = this.getCtx();
        if (!ctx || this.ambienceSource) return;
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          const sine = Math.sin((i / ctx.sampleRate) * 2 * Math.PI * 432) * 0.15;
          data[i] = (white * 0.05 + sine) * 0.12;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 550;

        const gain = ctx.createGain();
        gain.gain.value = 0.035; // Soft studio room tone

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        noise.start(0);
        this.ambienceSource = noise;
        this.ambienceGain = gain;
      } catch (e) {
        console.warn('Studio ambience notice:', e);
      }
    },
    stopAmbience() {
      if (this.ambienceSource) {
        try { this.ambienceSource.stop(); } catch(e) {}
        this.ambienceSource = null;
        this.ambienceGain = null;
      }
    }
  };

  const VoiceEngine = {
    voices: [],
    init() {
      if (typeof window === 'undefined' || !window.speechSynthesis) return;
      const load = () => {
        this.voices = window.speechSynthesis.getVoices() || [];
      };
      load();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = load;
      }
    },
    getVoice(persona = 'host_deep') {
      if (!this.voices.length && window.speechSynthesis) {
        this.voices = window.speechSynthesis.getVoices() || [];
      }
      const en = this.voices.filter(v => v.lang && v.lang.startsWith('en'));
      const list = en.length ? en : this.voices;
      if (!list.length) return { voice: null, pitch: 0.95, rate: 1.0 };

      if (persona === 'host_deep') {
        const found = list.find(v => /guy|christopher|david|oliver|male|natural.*male/i.test(v.name)) ||
                      list.find(v => /google.*english/i.test(v.name)) ||
                      list.find(v => /natural|online|neural/i.test(v.name)) ||
                      list[0];
        return { voice: found, pitch: 0.92, rate: 0.98 };
      } else if (persona === 'host_smooth') {
        const found = list.find(v => /jenny|samantha|aria|zira|female|natural.*female/i.test(v.name)) ||
                      list.find(v => /natural|online|neural/i.test(v.name)) ||
                      list[0];
        return { voice: found, pitch: 0.98, rate: 0.98 };
      } else if (persona === 'scholar_uk') {
        const found = list.find(v => /uk|british|great britain|oliver|daniel|ryan/i.test(v.name) || v.lang === 'en-GB') ||
                      list[0];
        return { voice: found, pitch: 0.95, rate: 0.96 };
      } else {
        return { voice: list[0], pitch: 1.0, rate: 1.0 };
      }
    },
    formatText(text) {
      return text
        .replace(/CAP Theorem/g, 'C-A-P Theorem')
        .replace(/LSM-Trees/g, 'L-S-M Trees')
        .replace(/LSM Tree/g, 'L-S-M Tree')
        .replace(/TCP 3-Way/g, 'T-C-P 3-Way')
        .replace(/TCP/g, 'T-C-P')
        .replace(/SYN-ACK/g, 'Syn, Ack')
        .replace(/SYN/g, 'Syn')
        .replace(/ACK/g, 'Ack')
        .replace(/O\(1\)/g, 'O of 1')
        .replace(/p99/g, 'p ninety-nine')
        .replace(/—/g, ', ')
        .replace(/ - /g, ', ')
        .replace(/\. /g, '... ');
    }
  };

  VoiceEngine.init();

  // Helper Toast
  function safeToast(msg, type = 'info') {
    if (typeof window.showToast === 'function') {
      window.showToast(msg, type);
    } else {
      console.log(`[${type.toUpperCase()}] ${msg}`);
    }
  }

  // =========================================================================
  // 1. RECRUITER OUTREACH & COLD MESSAGE CRM (#/outreach)
  // =========================================================================

  const DEFAULT_OUTREACH_ITEMS = [
    {
      id: 'outreach-1',
      name: 'Sarah Chen',
      company: 'Stripe',
      role: 'Backend Engineer - Infrastructure',
      type: 'Engineering Manager',
      status: 'call_scheduled',
      date: '2026-09-06',
      notes: 'Reached out via LinkedIn referencing their Raft consensus blog. 20-min chat scheduled for Friday.',
      lastMessage: 'Hi Sarah, loved your post on Stripe\'s distributed payment ledger. Built a similar Raft-based KV store in Go. Would love to learn about your infra hiring.'
    },
    {
      id: 'outreach-2',
      name: 'Arjun Mehta',
      company: 'Razorpay',
      role: 'SDE-2 Full Stack',
      type: 'Senior Peer (Referral)',
      status: 'connected',
      date: '2026-09-08',
      notes: 'College alumni. Agreed to review resume and drop internal referral once job req 4091 opens.',
      lastMessage: 'Hey Arjun, great to see your journey from Reva to Razorpay. Saw the SDE-2 opening on Payments Gateway. Would appreciate if you could share an internal referral.'
    },
    {
      id: 'outreach-3',
      name: 'Emily Watson',
      company: 'Datadog',
      role: 'Software Engineer - Telemetry',
      type: 'Technical Recruiter',
      status: 'note_sent',
      date: '2026-09-09',
      notes: 'Sent personalized InMail. Follow-up reminder set in 3 days.',
      lastMessage: 'Hi Emily, saw you lead engineering talent at Datadog. With 2+ years scaling high-throughput Spring Boot services, I\'d love to connect regarding telemetry roles.'
    }
  ];

  components.outreachCrm = () => {
    let items = [];
    try {
      items = JSON.parse(localStorage.getItem('prepspace_outreach_crm')) || DEFAULT_OUTREACH_ITEMS;
    } catch(e) {
      items = DEFAULT_OUTREACH_ITEMS;
    }

    const stats = {
      total: items.length,
      sent: items.filter(i => i.status === 'note_sent').length,
      connected: items.filter(i => i.status === 'connected').length,
      calls: items.filter(i => i.status === 'call_scheduled').length,
      referrals: items.filter(i => i.status === 'referral_received').length
    };

    return `
      <div class="container-fluid px-3 px-md-4 py-3">
        <!-- Header -->
        <div class="d-flex flex-wrap justify-content-between align-items-center mb-4 pb-2 border-bottom border-secondary border-opacity-15 gap-2">
          <div>
            <div class="d-flex align-items-center gap-2">
              <span class="badge bg-warning bg-opacity-25 text-warning border border-warning border-opacity-50 font-monospace fs-9">CAREER ACCELERATOR</span>
              <h4 class="text-white fw-bold m-0 fs-5">Recruiter Outreach & Cold Message CRM</h4>
            </div>
            <p class="text-muted fs-8 mb-0 mt-1">Craft high-converting LinkedIn notes, cold InMails, and manage your referral pipeline.</p>
          </div>
          <div class="d-flex gap-2">
            <button class="btn btn-outline-secondary btn-sm px-3" id="btn-export-outreach-csv">
              <i class="fa-solid fa-file-csv me-1 text-success"></i> Export CSV
            </button>
            <button class="btn btn-primary btn-sm px-3" data-bs-toggle="modal" data-bs-target="#addContactModal">
              <i class="fa-solid fa-user-plus me-1"></i> Add Contact
            </button>
          </div>
        </div>

        <!-- Metric Cards -->
        <div class="row g-2 g-md-3 mb-4">
          <div class="col-6 col-md-3">
            <div class="bento-card p-3">
              <span class="stat-label">Total Outreached</span>
              <div class="stat-num text-white">${stats.total}</div>
              <small class="text-muted fs-9">Active prospects</small>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="bento-card p-3">
              <span class="stat-label">Response Rate</span>
              <div class="stat-num text-success">${stats.total ? Math.round(((stats.connected + stats.calls + stats.referrals) / stats.total) * 100) : 0}%</div>
              <small class="text-success fs-9"><i class="fa-solid fa-arrow-trend-up me-1"></i>Industry benchmark: 18%</small>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="bento-card p-3">
              <span class="stat-label">Screening Calls</span>
              <div class="stat-num text-info">${stats.calls}</div>
              <small class="text-info fs-9">Scheduled chats</small>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="bento-card p-3">
              <span class="stat-label">Referrals Secured</span>
              <div class="stat-num text-warning">${stats.referrals}</div>
              <small class="text-warning fs-9">Internal endorsements</small>
            </div>
          </div>
        </div>

        <div class="row g-3">
          <!-- Left: Smart Message & Hook Generator -->
          <div class="col-12 col-xl-5">
            <div class="card bg-dark bg-opacity-60 border-secondary border-opacity-25 rounded-3 p-3 p-md-4 shadow-sm h-100">
              <div class="d-flex align-items-center justify-content-between mb-3">
                <h6 class="text-white fw-bold m-0 fs-7"><i class="fa-solid fa-wand-magic-sparkles text-warning me-2"></i>Smart Pitch & Hook Generator</h6>
                <span class="badge bg-dark text-muted border border-secondary border-opacity-30 fs-9 font-monospace" id="gauge-badge">LinkedIn Limit: 300c</span>
              </div>

              <!-- Quick Insertion Chips -->
              <div class="mb-2 d-flex flex-wrap gap-1 align-items-center">
                <small class="text-secondary fs-9 me-1">Insert Tag:</small>
                <button type="button" class="btn btn-glass py-0.5 px-2 fs-9 text-info outreach-insert-chip" data-tag="{{name}}">+ {{name}}</button>
                <button type="button" class="btn btn-glass py-0.5 px-2 fs-9 text-info outreach-insert-chip" data-tag="{{company}}">+ {{company}}</button>
                <button type="button" class="btn btn-glass py-0.5 px-2 fs-9 text-info outreach-insert-chip" data-tag="{{role}}">+ {{role}}</button>
                <button type="button" class="btn btn-glass py-0.5 px-2 fs-9 text-info outreach-insert-chip" data-tag="{{hook}}">+ {{hook}}</button>
              </div>

              <div class="mb-2">
                <label class="form-label text-secondary fs-8 fw-semibold mb-1">Target Company & Role</label>
                <div class="row g-2">
                  <div class="col-6">
                    <input type="text" id="gen-company" class="form-control form-control-sm bg-black text-white border-secondary border-opacity-50" placeholder="e.g. Google, Stripe" value="Uber">
                  </div>
                  <div class="col-6">
                    <input type="text" id="gen-role" class="form-control form-control-sm bg-black text-white border-secondary border-opacity-50" placeholder="e.g. Backend SDE-2" value="Software Engineer">
                  </div>
                </div>
              </div>

              <div class="mb-2">
                <label class="form-label text-secondary fs-8 fw-semibold mb-1">Prospect Name & Persona</label>
                <div class="row g-2">
                  <div class="col-6">
                    <input type="text" id="gen-name" class="form-control form-control-sm bg-black text-white border-secondary border-opacity-50" placeholder="e.g. Alex Rivera" value="Alex">
                  </div>
                  <div class="col-6">
                    <select id="gen-type" class="form-select form-select-sm bg-black text-white border-secondary border-opacity-50">
                      <option value="manager" selected>Engineering Manager</option>
                      <option value="recruiter">Technical Recruiter</option>
                      <option value="alumni">College / Work Alumni</option>
                      <option value="peer">Senior Peer Engineer</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="mb-2">
                <label class="form-label text-secondary fs-8 fw-semibold mb-1">Key Tech Hook / Flagship Accomplishment</label>
                <input type="text" id="gen-hook" class="form-control form-control-sm bg-black text-white border-secondary border-opacity-50" placeholder="e.g. Kafka stream processing, Spring Boot 3" value="high-throughput microservices in Java & Redis">
              </div>

              <div class="mb-3">
                <label class="form-label text-secondary fs-8 fw-semibold mb-1">Pitch Strategy & Format</label>
                <div class="btn-group w-100" role="group" id="outreach-format-group">
                  <input type="radio" class="btn-check" name="outreach-fmt" id="fmt-linkedin" value="linkedin" checked>
                  <label class="btn btn-sm btn-outline-secondary fs-9" for="fmt-linkedin">LinkedIn Note (290c)</label>

                  <input type="radio" class="btn-check" name="outreach-fmt" id="fmt-email" value="email">
                  <label class="btn btn-sm btn-outline-secondary fs-9" for="fmt-email">Cold InMail / Email</label>

                  <input type="radio" class="btn-check" name="outreach-fmt" id="fmt-followup" value="followup">
                  <label class="btn btn-sm btn-outline-secondary fs-9" for="fmt-followup">Day-3 Followup</label>
                </div>
              </div>

              <!-- Output Box with Character Progress Gauge -->
              <div class="position-relative mb-2">
                <textarea id="gen-output" class="form-control bg-black text-white border-secondary border-opacity-50 p-2.5 fs-8 font-monospace" rows="5"></textarea>
                <!-- Character Meter Bar -->
                <div class="progress mt-1.5" style="height: 4px; background: rgba(255,255,255,0.08);">
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

              <div class="d-flex gap-2 mt-3">
                <button class="btn btn-outline-info btn-sm flex-grow-1" id="btn-regenerate-outreach"><i class="fa-solid fa-arrows-rotate me-1"></i> Alternate Tone</button>
                <button class="btn btn-outline-success btn-sm" id="btn-save-as-contact"><i class="fa-solid fa-floppy-disk me-1"></i> Save to Pipeline</button>
              </div>
            </div>
          </div>

          <!-- Right: Pipeline Table -->
          <div class="col-12 col-xl-7">
            <div class="card bg-dark bg-opacity-60 border-secondary border-opacity-25 rounded-3 p-3 p-md-4 shadow-sm h-100">
              <div class="d-flex flex-wrap align-items-center justify-content-between mb-3 gap-2">
                <h6 class="text-white fw-bold m-0 fs-7"><i class="fa-solid fa-address-book text-primary me-2"></i>Outreach Pipeline & Follow-Ups</h6>
                <div class="d-flex align-items-center gap-2">
                  <input type="text" id="filter-outreach" class="form-control form-control-sm bg-black text-white border-secondary border-opacity-50" placeholder="Filter company or role..." style="width: 170px;">
                </div>
              </div>

              <div class="table-responsive">
                <table class="table table-dark table-hover align-middle border-secondary border-opacity-25 fs-8 mb-0" id="outreach-table">
                  <thead>
                    <tr class="text-secondary border-bottom border-secondary border-opacity-25">
                      <th>Contact & Company</th>
                      <th>Role & Type</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th class="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody id="outreach-table-body">
                    ${items.map(item => `
                      <tr data-id="${item.id}">
                        <td>
                          <div class="fw-bold text-white">${item.name}</div>
                          <small class="text-info">${item.company}</small>
                        </td>
                        <td>
                          <div class="text-truncate" style="max-width: 140px;">${item.role}</div>
                          <small class="text-muted font-monospace">${item.type}</small>
                        </td>
                        <td>
                          <select class="form-select form-select-sm bg-black text-white border-secondary border-opacity-30 fs-9 outreach-status-select" data-id="${item.id}" style="width: auto;">
                            <option value="note_sent" ${item.status === 'note_sent' ? 'selected' : ''}>⏳ Sent</option>
                            <option value="connected" ${item.status === 'connected' ? 'selected' : ''}>🤝 Connected</option>
                            <option value="call_scheduled" ${item.status === 'call_scheduled' ? 'selected' : ''}>📞 Call Scheduled</option>
                            <option value="referral_received" ${item.status === 'referral_received' ? 'selected' : ''}>⭐ Referral</option>
                            <option value="rejected" ${item.status === 'rejected' ? 'selected' : ''}>❌ Archived</option>
                          </select>
                        </td>
                        <td class="text-muted font-monospace fs-9">${item.date}</td>
                        <td class="text-end">
                          <button class="btn btn-sm btn-glass text-info p-1 px-2 view-outreach-note" data-id="${item.id}" title="View Message"><i class="fa-solid fa-message"></i></button>
                          <button class="btn btn-sm btn-glass text-danger p-1 px-2 delete-outreach-item" data-id="${item.id}" title="Delete"><i class="fa-solid fa-trash"></i></button>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Add Contact Modal -->
      <div class="modal fade" id="addContactModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content bg-dark border-secondary border-opacity-50 text-white">
            <div class="modal-header border-secondary border-opacity-25">
              <h5 class="modal-title fs-6"><i class="fa-solid fa-user-plus text-primary me-2"></i>Add Outreach Prospect</h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <div class="mb-2">
                <label class="form-label fs-8 text-secondary">Contact Name</label>
                <input type="text" id="modal-c-name" class="form-control form-control-sm bg-black text-white border-secondary border-opacity-50" placeholder="e.g. David Marcus">
              </div>
              <div class="row g-2 mb-2">
                <div class="col-6">
                  <label class="form-label fs-8 text-secondary">Company</label>
                  <input type="text" id="modal-c-company" class="form-control form-control-sm bg-black text-white border-secondary border-opacity-50" placeholder="e.g. Amazon">
                </div>
                <div class="col-6">
                  <label class="form-label fs-8 text-secondary">Target Role</label>
                  <input type="text" id="modal-c-role" class="form-control form-control-sm bg-black text-white border-secondary border-opacity-50" placeholder="e.g. SDE-2 Backend">
                </div>
              </div>
              <div class="row g-2 mb-2">
                <div class="col-6">
                  <label class="form-label fs-8 text-secondary">Prospect Persona</label>
                  <select id="modal-c-type" class="form-select form-select-sm bg-black text-white border-secondary border-opacity-50">
                    <option value="Engineering Manager">Engineering Manager</option>
                    <option value="Technical Recruiter">Technical Recruiter</option>
                    <option value="Senior Peer (Referral)">Senior Peer (Referral)</option>
                    <option value="College / Work Alumni">College / Work Alumni</option>
                  </select>
                </div>
                <div class="col-6">
                  <label class="form-label fs-8 text-secondary">Initial Status</label>
                  <select id="modal-c-status" class="form-select form-select-sm bg-black text-white border-secondary border-opacity-50">
                    <option value="note_sent">⏳ Note Sent</option>
                    <option value="connected">🤝 Connected</option>
                    <option value="call_scheduled">📞 Call Scheduled</option>
                    <option value="referral_received">⭐ Referral</option>
                  </select>
                </div>
              </div>
              <div class="mb-2">
                <label class="form-label fs-8 text-secondary">Notes / Next Steps</label>
                <textarea id="modal-c-notes" class="form-control bg-black text-white border-secondary border-opacity-50 fs-8" rows="2" placeholder="e.g. Discussed distributed cache optimization; follow up Thursday"></textarea>
              </div>
            </div>
            <div class="modal-footer border-secondary border-opacity-25">
              <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-primary btn-sm" id="btn-save-new-contact">Save Prospect</button>
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
        (c, r, n, h) => `Hi ${n}, noticed your team at ${c} is building high-scale services. With 2+ yrs engineering ${h}, I'd love to connect and follow ${c}'s tech updates. Best!`,
        (c, r, n, h) => `Hi ${n}, saw the ${r} opening at ${c}. Recently architected ${h} with zero downtime. Would love to connect and learn about your engineering roadmap!`,
        (c, r, n, h) => `Hey ${n}, big fan of ${c}'s recent engineering blog on distributed systems. As a backend developer specialized in ${h}, I'd love to connect.`
      ],
      email: [
        (c, r, n, h) => `Subject: ${r} role at ${c} — Engineer with background in ${h}\n\nHi ${n},\n\nI hope you're having a productive week. I've been following ${c}'s rapid growth and noticed your open ${r} role.\n\nIn my recent work, I focused on ${h}, achieving 40% latency improvements and 99.99% availability. Given your team's technical scale, I believe my background would allow me to contribute immediately.\n\nWould you be open to a 10-minute introductory call this week?\n\nBest regards,\n[Your Name] | [Portfolio Link] | [GitHub]`,
        (c, r, n, h) => `Subject: Quick question regarding ${c}'s engineering roadmap (${r})\n\nHi ${n},\n\nSaw your profile while researching engineering leadership at ${c}. I'm a software engineer specialized in ${h}.\n\nI noticed ${c} is expanding its core infrastructure. I'd love to understand what challenges your team prioritizes and explore if my experience aligns with the ${r} vacancy.\n\nThanks for your time and consideration!\n\nSincerely,\n[Your Name]`
      ],
      followup: [
        (c, r, n, h) => `Hi ${n}, following up on my previous note regarding the ${r} opportunity at ${c}. I recently published a technical case study on ${h} that might be relevant to what your team is building. Would love to share insights if you have 5 minutes!\n\nBest, [Your Name]`,
        (c, r, n, h) => `Hey ${n}, just bumping this to the top of your inbox. Still very excited about ${c} and the ${r} req. Hope you have a great rest of the week!\n\nCheers, [Your Name]`
      ]
    };

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
      const badgeEl = document.getElementById('gauge-badge');

      if (outEl) outEl.value = text;
      const len = text.length;

      if (countEl) {
        countEl.textContent = `${len} / 300 characters`;
        if (fmt === 'linkedin') {
          if (len <= 280) {
            countEl.className = 'fs-9 font-monospace text-success';
            if (barEl) { barEl.className = 'progress-bar bg-success'; barEl.style.width = Math.min(100, (len / 300) * 100) + '%'; }
            if (badgeEl) { badgeEl.className = 'badge bg-success bg-opacity-20 text-success border border-success border-opacity-30 fs-9 font-monospace'; badgeEl.textContent = 'Safe LinkedIn Length'; }
          } else if (len <= 300) {
            countEl.className = 'fs-9 font-monospace text-warning';
            if (barEl) { barEl.className = 'progress-bar bg-warning'; barEl.style.width = (len / 300) * 100 + '%'; }
            if (badgeEl) { badgeEl.className = 'badge bg-warning bg-opacity-20 text-warning border border-warning border-opacity-30 fs-9 font-monospace'; badgeEl.textContent = 'Near 300c Limit'; }
          } else {
            countEl.className = 'fs-9 font-monospace text-danger';
            if (barEl) { barEl.className = 'progress-bar bg-danger'; barEl.style.width = '100%'; }
            if (badgeEl) { badgeEl.className = 'badge bg-danger bg-opacity-20 text-danger border border-danger border-opacity-30 fs-9 font-monospace'; badgeEl.textContent = 'Exceeds 300c Limit'; }
          }
        } else {
          countEl.className = 'fs-9 font-monospace text-muted';
          if (barEl) { barEl.className = 'progress-bar bg-info'; barEl.style.width = '50%'; }
          if (badgeEl) { badgeEl.className = 'badge bg-info bg-opacity-20 text-info border border-info border-opacity-30 fs-9 font-monospace'; badgeEl.textContent = 'Email Format'; }
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

    // Tag Insertion Chips
    document.querySelectorAll('.outreach-insert-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const tag = chip.getAttribute('data-tag');
        const hookInput = document.getElementById('gen-hook');
        if (hookInput) {
          hookInput.value += ' ' + tag;
          updateGenerator();
          safeToast(`Added ${tag}`, 'info');
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

        let csv = 'Name,Company,Role,Type,Status,Date,Notes\n';
        items.forEach(i => {
          csv += `"${i.name}","${i.company}","${i.role}","${i.type}","${i.status}","${i.date}","${(i.notes||'').replace(/"/g, '""')}"\n`;
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
        const type = document.getElementById('gen-type')?.value || 'Technical Recruiter';
        const note = document.getElementById('gen-output')?.value || '';

        let items = [];
        try {
          items = JSON.parse(localStorage.getItem('prepspace_outreach_crm')) || DEFAULT_OUTREACH_ITEMS;
        } catch(e) { items = DEFAULT_OUTREACH_ITEMS; }

        items.unshift({
          id: 'outreach-' + Date.now(),
          name, company, role, type,
          status: 'note_sent',
          date: new Date().toISOString().slice(0, 10),
          notes: 'Saved from generator. Ready to send.',
          lastMessage: note
        });

        localStorage.setItem('prepspace_outreach_crm', JSON.stringify(items));
        AudioSynth.playChime(587, 880, 0.3);
        safeToast(`Saved ${name} (${company}) to your active pipeline!`, 'success');

        const mount = document.getElementById('page-mount');
        if (mount) {
          mount.innerHTML = components.outreachCrm();
          bindOutreachCrmEvents();
        }
      });
    }

    // Modal Save Prospect
    const modalSaveBtn = document.getElementById('btn-save-new-contact');
    if (modalSaveBtn) {
      modalSaveBtn.addEventListener('click', () => {
        const name = document.getElementById('modal-c-name')?.value;
        const company = document.getElementById('modal-c-company')?.value;
        const role = document.getElementById('modal-c-role')?.value;
        const type = document.getElementById('modal-c-type')?.value;
        const status = document.getElementById('modal-c-status')?.value;
        const notes = document.getElementById('modal-c-notes')?.value;

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
          name, company, role: role || 'Software Engineer', type, status,
          date: new Date().toISOString().slice(0, 10),
          notes: notes || '',
          lastMessage: ''
        });

        localStorage.setItem('prepspace_outreach_crm', JSON.stringify(items));
        const modalEl = document.getElementById('addContactModal');
        if (modalEl && window.bootstrap) {
          const m = bootstrap.Modal.getInstance(modalEl);
          if (m) m.hide();
        }

        AudioSynth.playChime(587, 880, 0.3);
        safeToast(`Added ${name} to Outreach CRM!`, 'success');

        const mount = document.getElementById('page-mount');
        if (mount) {
          mount.innerHTML = components.outreachCrm();
          bindOutreachCrmEvents();
        }
      });
    }

    // Filter pipeline
    const filterInput = document.getElementById('filter-outreach');
    if (filterInput) {
      filterInput.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase();
        document.querySelectorAll('#outreach-table-body tr').forEach(row => {
          row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
        });
      });
    }

    // Status change
    document.querySelectorAll('.outreach-status-select').forEach(sel => {
      sel.addEventListener('change', () => {
        const id = sel.getAttribute('data-id');
        const val = sel.value;
        let items = [];
        try {
          items = JSON.parse(localStorage.getItem('prepspace_outreach_crm')) || DEFAULT_OUTREACH_ITEMS;
        } catch(e) { items = DEFAULT_OUTREACH_ITEMS; }

        const it = items.find(i => i.id === id);
        if (it) {
          it.status = val;
          localStorage.setItem('prepspace_outreach_crm', JSON.stringify(items));
          safeToast('Updated contact status', 'info');
        }
      });
    });

    // Delete item
    document.querySelectorAll('.delete-outreach-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        if (confirm('Delete this contact from your outreach pipeline?')) {
          let items = [];
          try {
            items = JSON.parse(localStorage.getItem('prepspace_outreach_crm')) || DEFAULT_OUTREACH_ITEMS;
          } catch(e) { items = DEFAULT_OUTREACH_ITEMS; }

          items = items.filter(i => i.id !== id);
          localStorage.setItem('prepspace_outreach_crm', JSON.stringify(items));
          safeToast('Contact deleted from CRM', 'info');

          const mount = document.getElementById('page-mount');
          if (mount) {
            mount.innerHTML = components.outreachCrm();
            bindOutreachCrmEvents();
          }
        }
      });
    });

    // View Note
    document.querySelectorAll('.view-outreach-note').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        let items = [];
        try {
          items = JSON.parse(localStorage.getItem('prepspace_outreach_crm')) || DEFAULT_OUTREACH_ITEMS;
        } catch(e) { items = DEFAULT_OUTREACH_ITEMS; }

        const it = items.find(i => i.id === id);
        if (it) {
          alert(`Contact: ${it.name} (${it.company})\nNotes: ${it.notes || 'None'}\n\nLast Pitch:\n${it.lastMessage || 'No saved note'}`);
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
      title: 'Resolving Critical Redis Cache Stampede on Black Friday Sale',
      principles: ['Customer Obsession', 'Bias for Action', 'Dive Deep'],
      company: 'Current/Previous Employer',
      situation: 'During our peak Black Friday flash sale, our primary checkout service encountered a 300% spike in p99 latency because our product pricing cache expired simultaneously for 50,000 active concurrent users, causing a cache stampede directly hitting the PostgreSQL cluster.',
      task: 'As the on-call backend engineer, my responsibility was to stabilize the database connection pool immediately, restore normal latency within 10 minutes, and engineer a permanent architectural safeguard.',
      action: 'I first enabled temporary probabilistic early expiration (XFetch algorithm) on Redis and increased read-replica connection pools. Then, I engineered a distributed mutex locking pattern using Redisson so only one worker recomputed the stale cache while other requests received the slightly stale cache with a 2-second grace period.',
      result: 'Database CPU utilization dropped from 98% to 22% instantly. Zero customer orders dropped during the 4-hour flash sale, and the architectural pattern was adopted into the engineering handbook across all 12 microservices.',
      metrics: '76% latency reduction, 0 lost transactions, 99.99% uptime.'
    },
    {
      id: 'star-2',
      title: 'Architectural Disagreement: Migrating Monolith to Microservices',
      principles: ['Have Backbone; Disagree and Commit', 'Earn Trust'],
      company: 'Fintech Platform',
      situation: 'Our tech lead proposed immediately splitting our core monolith into 8 microservices. However, our team only had 4 engineers and lacked automated observability, distributed tracing, or CI/CD pipelines.',
      task: 'I needed to challenge the immediate migration plan without appearing resistant to modernization, and propose a low-risk incremental path.',
      action: 'I assembled benchmark telemetry showing that 85% of our server load was concentrated in just one subsystem (Notification & Webhooks). I presented a counter-proposal using the Strangler Fig pattern: extract ONLY the webhook processor first while setting up OpenTelemetry and container orchestration, rather than a risky big-bang rewrite.',
      result: 'The team lead and VP agreed with the data-driven proposal. We extracted the single bottleneck service in 3 weeks with zero downtime, proving out our Docker/Kubernetes tooling before touching any sensitive transaction logic.',
      metrics: 'Delivered 2 months ahead of schedule, zero production outages.'
    },
    {
      id: 'star-3',
      title: 'Recovering from a Production Outage Caused by Unindexed Foreign Key',
      principles: ['Ownership', 'Deliver Results', 'Google: Navigating Ambiguity'],
      company: 'SaaS Startup',
      situation: 'A newly deployed user billing feature caused severe connection timeouts in production on Sunday evening. The database query logs were inundated with sequential table scans.',
      task: 'I was the first to detect the pager alert and took full ownership to diagnose the root cause, roll back if necessary, and write the post-mortem.',
      action: 'Within 8 minutes, I isolated a missing index on the tenant_id foreign key in the new invoice_items table. Rather than a full rollback which would break active subscriptions, I executed an asynchronous concurrent index creation (CREATE INDEX CONCURRENTLY) in production, verified query execution plans via EXPLAIN ANALYZE, and added an automated linter in our GitHub Actions pipeline to block unindexed foreign keys in future PRs.',
      result: 'The incident was resolved in under 18 minutes. I authored the RCA (Root Cause Analysis) blameless post-mortem and led the team retro to strengthen our migration checklists.',
      metrics: '18 min resolution time, 100% test coverage added for migrations.'
    }
  ];

  components.starVault = () => {
    let stories = [];
    try {
      stories = JSON.parse(localStorage.getItem('prepspace_star_vault')) || DEFAULT_STAR_STORIES;
    } catch(e) {
      stories = DEFAULT_STAR_STORIES;
    }

    return `
      <div class="container-fluid px-3 px-md-4 py-3">
        <!-- Header -->
        <div class="d-flex flex-wrap justify-content-between align-items-center mb-4 pb-2 border-bottom border-secondary border-opacity-15 gap-2">
          <div>
            <div class="d-flex align-items-center gap-2">
              <span class="badge bg-primary bg-opacity-25 text-primary border border-primary border-opacity-50 font-monospace fs-9">BEHAVIORAL MASTERY</span>
              <h4 class="text-white fw-bold m-0 fs-5">STAR Story Vault & Behavioral Bank</h4>
            </div>
            <p class="text-muted fs-8 mb-0 mt-1">Structure real career stories into high-impact STAR responses mapped to Amazon Leadership & Google Principles.</p>
          </div>
          <div class="d-flex gap-2">
            <button class="btn btn-outline-info btn-sm px-3" data-bs-toggle="modal" data-bs-target="#practiceStopwatchModal">
              <i class="fa-solid fa-stopwatch me-1"></i> 2-Min Pacing Stopwatch
            </button>
            <button class="btn btn-outline-light btn-sm px-3" onclick="window.print()"><i class="fa-solid fa-print me-1"></i> Print Story Matrix</button>
            <button class="btn btn-primary btn-sm px-3" data-bs-toggle="modal" data-bs-target="#newStoryModal"><i class="fa-solid fa-plus me-1"></i> Add STAR Story</button>
          </div>
        </div>

        <!-- Filter & Metrics Strip -->
        <div class="row g-2 mb-3 align-items-center">
          <div class="col-12 col-md-6 col-lg-4">
            <input type="text" id="search-star" class="form-control form-control-sm bg-black text-white border-secondary border-opacity-50" placeholder="Search stories by keyword, conflict, latency...">
          </div>
          <div class="col-12 col-md-6 col-lg-8 d-flex flex-wrap gap-1.5 justify-content-md-end" id="star-principles-pills">
            <button class="btn btn-sm btn-glass active fs-9 star-filter-btn" data-filter="all">All Stories (${stories.length})</button>
            <button class="btn btn-sm btn-glass fs-9 star-filter-btn" data-filter="Customer Obsession">Customer Obsession</button>
            <button class="btn btn-sm btn-glass fs-9 star-filter-btn" data-filter="Ownership">Ownership</button>
            <button class="btn btn-sm btn-glass fs-9 star-filter-btn" data-filter="Bias for Action">Bias for Action</button>
            <button class="btn btn-sm btn-glass fs-9 star-filter-btn" data-filter="Have Backbone">Have Backbone</button>
            <button class="btn btn-sm btn-glass fs-9 star-filter-btn" data-filter="Google">Google / Ambiguity</button>
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
                    <button class="btn btn-glass btn-sm p-1 px-2 text-info practice-story-btn" data-id="${story.id}" title="Practice delivery with 2-min timer"><i class="fa-solid fa-microphone me-1"></i> Practice</button>
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

      <!-- 2-Minute Practice Mode Modal -->
      <div class="modal fade" id="practiceStopwatchModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content bg-dark border-secondary border-opacity-50 text-white">
            <div class="modal-header border-secondary border-opacity-25">
              <h5 class="modal-title fs-6"><i class="fa-solid fa-stopwatch text-info me-2"></i>2-Minute STAR Pacing Practice</h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body text-center py-4">
              <span class="badge bg-secondary font-monospace fs-9 mb-2" id="practice-current-stage">STAGE 1: SITUATION (00:00 - 00:20)</span>
              <div class="font-monospace fs-1 fw-bold text-warning mb-2" id="practice-timer-display">02:00</div>
              
              <!-- Pacing Progress Bar -->
              <div class="progress mb-3 mx-auto" style="height: 8px; max-width: 320px; background: rgba(255,255,255,0.1);">
                <div id="practice-pacing-bar" class="progress-bar bg-info" style="width: 0%;"></div>
              </div>

              <div class="p-3 bg-black rounded border border-secondary border-opacity-25 text-start fs-8 mb-3" style="line-height: 1.6;">
                <div class="text-light fw-bold mb-1" id="practice-story-name">Story Practice</div>
                <div class="text-secondary" id="practice-stage-tip">
                  Focus: Set context quickly. Who was the client? What broke? Keep this under 20 seconds.
                </div>
              </div>

              <div class="d-flex justify-content-center gap-2">
                <button class="btn btn-primary px-4" id="btn-practice-start"><i class="fa-solid fa-play me-1"></i> Start</button>
                <button class="btn btn-outline-light px-3" id="btn-practice-reset"><i class="fa-solid fa-rotate-left me-1"></i> Reset</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- New Story Modal -->
      <div class="modal fade" id="newStoryModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content bg-dark border-secondary border-opacity-50 text-white">
            <div class="modal-header border-secondary border-opacity-25">
              <h5 class="modal-title fs-6"><i class="fa-solid fa-star text-warning me-2"></i>Create New STAR Behavioral Story</h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <div class="row g-2 mb-2">
                <div class="col-8">
                  <label class="form-label fs-8 text-secondary">Story Title / Theme</label>
                  <input type="text" id="modal-s-title" class="form-control form-control-sm bg-black text-white border-secondary border-opacity-50" placeholder="e.g. Migrating auth service with zero downtime" required>
                </div>
                <div class="col-4">
                  <label class="form-label fs-8 text-secondary">Company / Team</label>
                  <input type="text" id="modal-s-company" class="form-control form-control-sm bg-black text-white border-secondary border-opacity-50" placeholder="e.g. Acme Corp">
                </div>
              </div>

              <div class="mb-2">
                <label class="form-label fs-8 text-secondary">Leadership Principles (Comma separated)</label>
                <input type="text" id="modal-s-principles" class="form-control form-control-sm bg-black text-white border-secondary border-opacity-50" placeholder="e.g. Customer Obsession, Ownership, Bias for Action" value="Customer Obsession, Ownership">
              </div>

              <div class="mb-2">
                <label class="form-label fs-8 text-info fw-bold">S — Situation</label>
                <textarea id="modal-s-situation" class="form-control bg-black text-white border-secondary border-opacity-50 fs-8" rows="2" placeholder="What was the business background and technical challenge?"></textarea>
              </div>
              <div class="mb-2">
                <label class="form-label fs-8 text-primary fw-bold">T — Task</label>
                <textarea id="modal-s-task" class="form-control bg-black text-white border-secondary border-opacity-50 fs-8" rows="2" placeholder="What were YOU tasked with accomplishing?"></textarea>
              </div>
              <div class="mb-2">
                <label class="form-label fs-8 text-warning fw-bold">A — Action</label>
                <textarea id="modal-s-action" class="form-control bg-black text-white border-secondary border-opacity-50 fs-8" rows="3" placeholder="What specific technical/interpersonal actions did YOU take?"></textarea>
              </div>
              <div class="mb-2">
                <label class="form-label fs-8 text-success fw-bold">R — Result</label>
                <textarea id="modal-s-result" class="form-control bg-black text-white border-secondary border-opacity-50 fs-8" rows="2" placeholder="What was the measurable outcome, customer impact, or lesson learned?"></textarea>
              </div>
              <div class="mb-2">
                <label class="form-label fs-8 text-secondary">Impact Metric (Numbers/Percentages)</label>
                <input type="text" id="modal-s-metrics" class="form-control form-control-sm bg-black text-white border-secondary border-opacity-50" placeholder="e.g. 45% latency drop, 0 outages, $15k AWS savings">
              </div>
            </div>
            <div class="modal-footer border-secondary border-opacity-25">
              <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-primary btn-sm" id="btn-save-star-story">Save to Story Vault</button>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  window.bindStarVaultEvents = () => {
    const searchInput = document.getElementById('search-star');
    const filterBtns = document.querySelectorAll('.star-filter-btn');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase();
        document.querySelectorAll('.star-story-card').forEach(card => {
          card.style.display = card.textContent.toLowerCase().includes(q) ? '' : 'none';
        });
      });
    }

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter').toLowerCase();
        document.querySelectorAll('.star-story-card').forEach(card => {
          if (filter === 'all') {
            card.style.display = '';
          } else {
            const cardPrinciples = card.getAttribute('data-principles') || '';
            card.style.display = cardPrinciples.includes(filter) ? '' : 'none';
          }
        });
      });
    });

    // Save Story
    const saveBtn = document.getElementById('btn-save-star-story');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const title = document.getElementById('modal-s-title')?.value;
        const company = document.getElementById('modal-s-company')?.value;
        const principlesStr = document.getElementById('modal-s-principles')?.value || 'Customer Obsession';
        const situation = document.getElementById('modal-s-situation')?.value;
        const task = document.getElementById('modal-s-task')?.value;
        const action = document.getElementById('modal-s-action')?.value;
        const result = document.getElementById('modal-s-result')?.value;
        const metrics = document.getElementById('modal-s-metrics')?.value;

        if (!title || !situation || !action) {
          safeToast('Please complete at least Title, Situation, and Action', 'warning');
          return;
        }

        let stories = [];
        try {
          stories = JSON.parse(localStorage.getItem('prepspace_star_vault')) || DEFAULT_STAR_STORIES;
        } catch(e) { stories = DEFAULT_STAR_STORIES; }

        const principles = principlesStr.split(',').map(s => s.trim()).filter(Boolean);

        stories.unshift({
          id: 'star-' + Date.now(),
          title, company, principles, situation, task, action, result, metrics
        });

        localStorage.setItem('prepspace_star_vault', JSON.stringify(stories));

        const modalEl = document.getElementById('newStoryModal');
        if (modalEl && window.bootstrap) {
          const m = bootstrap.Modal.getInstance(modalEl);
          if (m) m.hide();
        }

        AudioSynth.playChime(523, 784, 0.3);
        safeToast('Saved new STAR story to your vault!', 'success');

        const mount = document.getElementById('page-mount');
        if (mount) {
          mount.innerHTML = components.starVault();
          bindStarVaultEvents();
        }
      });
    }

    // Copy Markdown
    document.querySelectorAll('.copy-star-markdown').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        let stories = [];
        try {
          stories = JSON.parse(localStorage.getItem('prepspace_star_vault')) || DEFAULT_STAR_STORIES;
        } catch(e) { stories = DEFAULT_STAR_STORIES; }

        const s = stories.find(item => item.id === id);
        if (s) {
          const md = `### ${s.title} (${s.company})\n**Principles**: ${s.principles.join(', ')}\n\n**Situation**:\n${s.situation}\n\n**Task**:\n${s.task}\n\n**Action**:\n${s.action}\n\n**Result**:\n${s.result}\n\n**Impact Metric**: ${s.metrics}`;
          navigator.clipboard.writeText(md).then(() => {
            AudioSynth.playChime(660, 880, 0.2);
            safeToast('STAR Story copied as formatted Markdown!', 'success');
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

        const s = stories.find(item => item.id === id);
        if (s) {
          const prompt = `Act as a Principal Bar Raiser at Amazon and Staff Engineer at Google. Critique my following STAR behavioral response. Rate my Situation, Task, Action, and Result from 1 to 10 on clarity, leadership principles (${s.principles.join(', ')}), and quantified impact. Then provide an improved, punchier 90-second script:\n\n[Story Title]: ${s.title}\n[Situation]: ${s.situation}\n[Task]: ${s.task}\n[Action]: ${s.action}\n[Result]: ${s.result}\n[Metrics]: ${s.metrics}`;
          navigator.clipboard.writeText(prompt).then(() => {
            AudioSynth.playChime(587, 880, 0.25);
            safeToast('AI Bar Raiser Critique prompt copied! Paste into Gemini/ChatGPT.', 'info');
          });
        }
      });
    });

    // Practice Stopwatch
    let practiceInterval = null;
    let practiceSeconds = 120;
    let practiceRunning = false;

    const pDisplay = document.getElementById('practice-timer-display');
    const pBar = document.getElementById('practice-pacing-bar');
    const pStage = document.getElementById('practice-current-stage');
    const pTip = document.getElementById('practice-stage-tip');
    const pStartBtn = document.getElementById('btn-practice-start');
    const pResetBtn = document.getElementById('btn-practice-reset');

    function updatePacingUI() {
      const elapsed = 120 - practiceSeconds;
      const m = Math.floor(practiceSeconds / 60).toString().padStart(2, '0');
      const s = (practiceSeconds % 60).toString().padStart(2, '0');
      if (pDisplay) pDisplay.textContent = `${m}:${s}`;
      if (pBar) pBar.style.width = Math.min(100, (elapsed / 120) * 100) + '%';

      if (elapsed < 20) {
        if (pStage) pStage.textContent = 'STAGE 1: SITUATION (00:00 - 00:20)';
        if (pTip) pTip.textContent = 'Focus: Set context quickly. Who was the client? What broke? Keep this under 20 seconds.';
        if (pBar) pBar.className = 'progress-bar bg-info';
      } else if (elapsed < 40) {
        if (pStage) pStage.textContent = 'STAGE 2: TASK (00:20 - 00:40)';
        if (pTip) pTip.textContent = 'Focus: Clarify YOUR personal ownership and the stakes if you failed.';
        if (pBar) pBar.className = 'progress-bar bg-primary';
      } else if (elapsed < 95) {
        if (pStage) pStage.textContent = 'STAGE 3: ACTION (00:40 - 01:35)';
        if (pTip) pTip.textContent = 'Focus: The core meat! Use "I did", specific architectural tradeoffs, edge cases handled.';
        if (pBar) pBar.className = 'progress-bar bg-warning';
      } else {
        if (pStage) pStage.textContent = 'STAGE 4: RESULT (01:35 - 02:00)';
        if (pTip) pTip.textContent = 'Focus: Concrete metrics! Numbers, % latency drops, team adoption, post-mortem lessons.';
        if (pBar) pBar.className = 'progress-bar bg-success';
      }
    }

    if (pStartBtn) {
      pStartBtn.addEventListener('click', () => {
        if (practiceRunning) {
          clearInterval(practiceInterval);
          practiceRunning = false;
          pStartBtn.innerHTML = '<i class="fa-solid fa-play me-1"></i> Resume';
        } else {
          practiceRunning = true;
          pStartBtn.innerHTML = '<i class="fa-solid fa-pause me-1"></i> Pause';
          AudioSynth.playChime(440, 660, 0.2);
          practiceInterval = setInterval(() => {
            practiceSeconds--;
            if (practiceSeconds <= 0) {
              clearInterval(practiceInterval);
              practiceRunning = false;
              practiceSeconds = 0;
              updatePacingUI();
              AudioSynth.playChime(880, 440, 0.6);
              safeToast('2-Minute delivery time complete! Great job pacing.', 'success');
              pStartBtn.innerHTML = '<i class="fa-solid fa-play me-1"></i> Start';
              return;
            }
            // Transition chimes at 100s, 80s, 25s remaining
            if (practiceSeconds === 100 || practiceSeconds === 80 || practiceSeconds === 25) {
              AudioSynth.playChime(550, 750, 0.15);
            }
            updatePacingUI();
          }, 1000);
        }
      });
    }

    if (pResetBtn) {
      pResetBtn.addEventListener('click', () => {
        clearInterval(practiceInterval);
        practiceRunning = false;
        practiceSeconds = 120;
        updatePacingUI();
        if (pStartBtn) pStartBtn.innerHTML = '<i class="fa-solid fa-play me-1"></i> Start';
      });
    }

    // Launch practice mode for specific story
    document.querySelectorAll('.practice-story-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        let stories = [];
        try {
          stories = JSON.parse(localStorage.getItem('prepspace_star_vault')) || DEFAULT_STAR_STORIES;
        } catch(e) { stories = DEFAULT_STAR_STORIES; }

        const s = stories.find(item => item.id === id);
        const nameEl = document.getElementById('practice-story-name');
        if (nameEl && s) nameEl.textContent = `Practicing: ${s.title}`;

        const modalEl = document.getElementById('practiceStopwatchModal');
        if (modalEl && window.bootstrap) {
          const m = new bootstrap.Modal(modalEl);
          m.show();
        }
      });
    });

    // Delete Story
    document.querySelectorAll('.delete-star-story').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        if (confirm('Are you sure you want to delete this story from your vault?')) {
          let stories = [];
          try {
            stories = JSON.parse(localStorage.getItem('prepspace_star_vault')) || DEFAULT_STAR_STORIES;
          } catch(e) { stories = DEFAULT_STAR_STORIES; }

          stories = stories.filter(s => s.id !== id);
          localStorage.setItem('prepspace_star_vault', JSON.stringify(stories));
          safeToast('Story deleted', 'info');

          const mount = document.getElementById('page-mount');
          if (mount) {
            mount.innerHTML = components.starVault();
            bindStarVaultEvents();
          }
        }
      });
    });
  };

  // =========================================================================
  // 3. PEER-TO-PEER MOCK EXCHANGE & RUBRIC ARENA (#/peer-mock)
  // =========================================================================

  const MOCK_QUESTIONS = [
    {
      id: 'mock-q-1',
      title: 'Design a Distributed Rate Limiter (Token Bucket / Sliding Window)',
      domain: 'System Design',
      difficulty: 'Medium / Hard',
      timeLimit: 30,
      description: 'You are tasked with designing an API rate limiter for a high-traffic microservices cluster handling 100,000 req/sec across 4 geographic regions.',
      hints: [
        'Hint 1: Consider how Redis INCR and EXPIRE behave under race conditions.',
        'Hint 2: Sliding Window Log requires storing timestamps in a Sorted Set (ZADD/ZREMRANGEBYSCORE), which is memory intensive. Can we approximate with Sliding Window Counter?',
        'Hint 3: How do we synchronize rate limit counters across multi-region edge nodes without adding 150ms cross-region latency?'
      ],
      rubricItems: [
        { name: 'Problem Scoping & Functional Requirements', weight: 20 },
        { name: 'Architecture & Redis/Memory Calculations', weight: 30 },
        { name: 'Handling Race Conditions & High Concurrency', weight: 30 },
        { name: 'Communication & Active Collaboration', weight: 20 }
      ]
    },
    {
      id: 'mock-q-2',
      title: 'LRU Cache Implementation with O(1) Operations',
      domain: 'Data Structures & Algorithms',
      difficulty: 'Medium',
      timeLimit: 30,
      description: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement get(key) and put(key, value) both in strict O(1) average time complexity.',
      hints: [
        'Hint 1: A Hash Map provides O(1) lookups, but does not maintain item ordering.',
        'Hint 2: A Doubly Linked List allows O(1) removals and insertions if you have the node pointer.',
        'Hint 3: Combine Hash Map (pointing to DLL Nodes) + Doubly Linked List with dummy head and tail sentinel nodes.'
      ],
      rubricItems: [
        { name: 'Data Structure Design & Space Trade-offs', weight: 25 },
        { name: 'O(1) Get and Put Implementation', weight: 35 },
        { name: 'Edge Cases (Null keys, capacity 0/1, overwrite)', weight: 20 },
        { name: 'Code Quality & Modular Cleanliness', weight: 20 }
      ]
    },
    {
      id: 'mock-q-3',
      title: 'Build an Autocomplete Search System with Trie & Debounce',
      domain: 'Frontend & Full Stack',
      difficulty: 'Medium',
      timeLimit: 30,
      description: 'Implement a search input component that suggests top 5 matching queries as user types, with network debounce, client-side caching, and keyboard navigation (Arrow Up/Down/Enter).',
      hints: [
        'Hint 1: What happens if an API call for "ca" finishes AFTER the API call for "cat"? How do you cancel or discard stale responses?',
        'Hint 2: How do you structure the Trie node to quickly find top 5 most frequent completions without scanning all children?',
        'Hint 3: ARIA accessibility: combobox role and aria-activedescendant.'
      ],
      rubricItems: [
        { name: 'Debounce & Race Condition Handling', weight: 30 },
        { name: 'Trie / Client Cache Architecture', weight: 30 },
        { name: 'Keyboard UX & Edge Cases', weight: 20 },
        { name: 'Component Cleanliness & Reusability', weight: 20 }
      ]
    }
  ];

  components.peerMock = () => {
    let karma = 100;
    try {
      karma = parseInt(localStorage.getItem('prepspace_peer_karma') || '100', 10);
    } catch(e) {}

    return `
      <div class="container-fluid px-3 px-md-4 py-3">
        <!-- Header -->
        <div class="d-flex flex-wrap justify-content-between align-items-center mb-4 pb-2 border-bottom border-secondary border-opacity-15 gap-2">
          <div>
            <div class="d-flex align-items-center gap-2">
              <span class="badge bg-info bg-opacity-25 text-info border border-info border-opacity-50 font-monospace fs-9">COMMUNITY ARENA</span>
              <h4 class="text-white fw-bold m-0 fs-5">Peer-to-Peer Mock Exchange & Rubric Studio</h4>
            </div>
            <p class="text-muted fs-8 mb-0 mt-1">Practice live 1v1 technical interviews with peers or solo simulation using official hiring rubrics.</p>
          </div>
          <div class="d-flex align-items-center gap-3">
            <div class="d-flex align-items-center gap-2 bg-dark px-3 py-1.5 rounded-pill border border-secondary border-opacity-40">
              <i class="fa-solid fa-fire text-warning"></i>
              <span class="fs-8 text-secondary">Karma:</span>
              <span class="fs-7 fw-bold text-warning font-monospace" id="peer-karma-display">${karma} pts</span>
            </div>
          </div>
        </div>

        <div class="row g-3" id="mock-setup-container">
          <div class="col-12 col-lg-5">
            <div class="card bg-dark bg-opacity-60 border-secondary border-opacity-25 rounded-3 p-3 p-md-4 h-100 shadow-sm">
              <h6 class="text-white fw-bold mb-3 fs-7"><i class="fa-solid fa-sliders text-primary me-2"></i>Configure Mock Session</h6>

              <div class="mb-3">
                <label class="form-label fs-8 text-secondary fw-semibold">Choose Interview Track</label>
                <select id="mock-select-question" class="form-select form-select-sm bg-black text-white border-secondary border-opacity-50">
                  ${MOCK_QUESTIONS.map((q, i) => `
                    <option value="${q.id}" ${i === 0 ? 'selected' : ''}>${q.domain}: ${q.title}</option>
                  `).join('')}
                </select>
              </div>

              <div class="mb-3">
                <label class="form-label fs-8 text-secondary fw-semibold">Your Role in This Round</label>
                <div class="btn-group w-100" role="group">
                  <input type="radio" class="btn-check" name="mock-role" id="role-interviewer" value="interviewer" checked>
                  <label class="btn btn-sm btn-outline-primary fs-8" for="role-interviewer">
                    <i class="fa-solid fa-clipboard-check me-1"></i> Interviewer (Assess & Score)
                  </label>

                  <input type="radio" class="btn-check" name="mock-role" id="role-candidate" value="candidate">
                  <label class="btn btn-sm btn-outline-primary fs-8" for="role-candidate">
                    <i class="fa-solid fa-code me-1"></i> Candidate (Solve & Defend)
                  </label>
                </div>
                <small class="text-muted fs-9 mt-1 d-block">Tip: Interviewing others is the fastest way to understand how hiring managers evaluate code.</small>
              </div>

              <div class="mb-3">
                <label class="form-label fs-8 text-secondary fw-semibold">Session Timer</label>
                <div class="d-flex align-items-center gap-2">
                  <span class="badge bg-dark border border-secondary border-opacity-50 text-white font-monospace px-3 py-2 fs-7">30:00 (Standard Technical Round)</span>
                </div>
              </div>

              <div class="mt-auto pt-3 border-top border-secondary border-opacity-25">
                <button class="btn btn-primary w-100 py-2 fw-semibold fs-8" id="btn-start-mock-session">
                  <i class="fa-solid fa-play me-2"></i> Launch Mock Arena
                </button>
              </div>
            </div>
          </div>

          <div class="col-12 col-lg-7">
            <div class="card bg-dark bg-opacity-60 border-secondary border-opacity-25 rounded-3 p-3 p-md-4 h-100 shadow-sm">
              <h6 class="text-white fw-bold mb-3 fs-7"><i class="fa-solid fa-award text-warning me-2"></i>How the Peer Mock System Works</h6>

              <div class="row g-2 mb-3">
                <div class="col-6">
                  <div class="p-2.5 rounded-2 bg-black bg-opacity-40 border border-secondary border-opacity-25">
                    <div class="text-success fw-bold fs-8 mb-1"><i class="fa-solid fa-plus me-1"></i>Earn +50 Karma</div>
                    <p class="fs-9 text-muted mb-0">Conduct a 30-min interview and fill out an honest rubric evaluation.</p>
                  </div>
                </div>
                <div class="col-6">
                  <div class="p-2.5 rounded-2 bg-black bg-opacity-40 border border-secondary border-opacity-25">
                    <div class="text-info fw-bold fs-8 mb-1"><i class="fa-solid fa-minus me-1"></i>Spend 40 Karma</div>
                    <p class="fs-9 text-muted mb-0">Get interviewed by a peer to receive detailed rubric scorecards.</p>
                  </div>
                </div>
              </div>

              <div class="p-3 rounded-2 bg-black bg-opacity-30 border border-secondary border-opacity-20 mb-3">
                <div class="text-white fw-semibold fs-8 mb-1">Live Evaluation Protocol:</div>
                <ul class="fs-8 text-secondary ps-3 mb-0" style="line-height: 1.7;">
                  <li><strong>Minutes 00–05:</strong> Problem introduction, clarifying questions, and edge case scoping.</li>
                  <li><strong>Minutes 05–15:</strong> High-level approach discussion before writing any code.</li>
                  <li><strong>Minutes 15–25:</strong> Implementation, dry-run with test cases, and time/space complexity analysis.</li>
                  <li><strong>Minutes 25–30:</strong> Rubric scoring, constructive feedback, and debrief.</li>
                </ul>
              </div>

              <div class="d-flex justify-content-between align-items-center text-muted fs-9">
                <span><i class="fa-solid fa-shield-halved text-success me-1"></i>Official FAANG Rubric criteria used across all interview rounds.</span>
              </div>
            </div>
          </div>
        </div>

        <div id="mock-arena-active" style="display: none;">
          <div class="card bg-dark border-primary border-opacity-40 rounded-3 p-3 mb-3 shadow">
            <div class="d-flex flex-wrap justify-content-between align-items-center gap-2">
              <div class="d-flex align-items-center gap-2">
                <span class="badge bg-danger animate-pulse font-monospace">LIVE SESSION</span>
                <h5 class="text-white fw-bold m-0 fs-6" id="arena-title">Loading Question...</h5>
              </div>
              <div class="d-flex align-items-center gap-2">
                <button class="btn btn-sm btn-glass text-secondary" id="btn-timer-pause" title="Pause/Resume Timer"><i class="fa-solid fa-pause"></i></button>
                <div class="font-monospace fs-5 fw-extrabold text-warning bg-black px-3 py-1 rounded border border-warning border-opacity-50" id="arena-timer">30:00</div>
                <button class="btn btn-outline-danger btn-sm ms-2" id="btn-end-mock-session"><i class="fa-solid fa-stop me-1"></i> Exit Round</button>
              </div>
            </div>
          </div>

          <div class="row g-3">
            <div class="col-12 col-lg-6">
              <div class="card bg-dark bg-opacity-70 border-secondary border-opacity-30 rounded-3 p-3 p-md-4 h-100">
                <h6 class="text-info fw-bold mb-2 fs-7"><i class="fa-solid fa-file-lines me-2"></i>Problem Specification</h6>
                <p class="fs-8 text-light mb-3" id="arena-description">Loading...</p>

                <div class="mb-3">
                  <div class="d-flex justify-content-between align-items-center mb-1">
                    <span class="text-warning fs-8 fw-bold"><i class="fa-solid fa-lightbulb me-1"></i>Interviewer Secret Hints</span>
                    <button class="btn btn-sm btn-glass text-warning fs-9 py-0 px-2" id="btn-toggle-secret-hints">
                      <i class="fa-solid fa-eye me-1"></i> <span id="hints-toggle-text">Show Hints</span>
                    </button>
                  </div>
                  <div class="p-2 bg-black rounded border border-secondary border-opacity-30 fs-8 text-secondary" id="arena-hints" style="display: none;"></div>
                </div>

                <div class="mt-4 pt-3 border-top border-secondary border-opacity-25">
                  <div class="d-flex justify-content-between align-items-center mb-2">
                    <h6 class="text-white fw-bold m-0 fs-7"><i class="fa-solid fa-square-check text-success me-2"></i>Interviewer Scoring Rubric</h6>
                    <span class="badge bg-primary bg-opacity-20 text-info font-monospace fs-9" id="rubric-score-badge">Score: 3.0 / 5.0</span>
                  </div>
                  <div id="arena-rubric-items" class="d-flex flex-column gap-2 mb-3"></div>

                  <div class="mb-3">
                    <label class="form-label fs-8 text-secondary">Final Hiring Recommendation</label>
                    <select id="arena-hire-rec" class="form-select form-select-sm bg-black text-white border-secondary border-opacity-50">
                      <option value="Strong Hire">⭐ Strong Hire (Exceptional speed, zero hints needed)</option>
                      <option value="Hire" selected>✅ Hire (Solid approach, responsive to feedback)</option>
                      <option value="Lean Hire">⚠️ Lean Hire (Got to solution with moderate assistance)</option>
                      <option value="No Hire">❌ No Hire (Struggled with fundamentals or stuck)</option>
                    </select>
                  </div>

                  <div class="d-flex gap-2">
                    <button class="btn btn-success btn-sm flex-grow-1 py-2" id="btn-submit-rubric">
                      <i class="fa-solid fa-check-double me-1"></i> Submit Scorecard (+50 Karma)
                    </button>
                    <button class="btn btn-outline-light btn-sm py-2 px-3" id="btn-export-debrief">
                      <i class="fa-solid fa-share-from-square me-1"></i> Export Debrief
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-12 col-lg-6">
              <div class="card bg-dark bg-opacity-70 border-secondary border-opacity-30 rounded-3 p-3 p-md-4 h-100 d-flex flex-column">
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <span class="fs-8 text-white fw-semibold"><i class="fa-solid fa-code text-primary me-2"></i>Candidate Code & Architecture Scratchpad</span>
                  <div class="d-flex align-items-center gap-1">
                    <select id="scratchpad-lang" class="form-select form-select-sm bg-black text-white border-secondary border-opacity-40 fs-9 py-0" style="width: 100px;">
                      <option value="java" selected>Java 21</option>
                      <option value="python">Python 3</option>
                      <option value="typescript">TypeScript</option>
                      <option value="cpp">C++ 20</option>
                      <option value="sql">SQL</option>
                    </select>
                    <button class="btn btn-sm btn-glass text-secondary py-0 px-2" id="btn-clear-scratchpad" title="Clear Code"><i class="fa-solid fa-trash-can fs-9"></i></button>
                  </div>
                </div>
                <textarea id="arena-code-editor" class="form-control bg-black text-white font-monospace fs-8 p-3 flex-grow-1 border-secondary border-opacity-40" rows="16" placeholder="// Candidate types code, architectural schemas, and trade-offs here live..."></textarea>
                
                <div class="mt-2 pt-2 border-top border-secondary border-opacity-20 d-flex justify-content-between align-items-center">
                  <div class="fs-9 text-muted font-monospace" id="scratchpad-status">Ready to dry-run</div>
                  <div class="d-flex gap-2">
                    <button class="btn btn-sm btn-glass text-info fs-9" id="btn-copy-code"><i class="fa-solid fa-copy me-1"></i> Copy Code</button>
                    <button class="btn btn-sm btn-outline-success fs-9" id="btn-run-mock-tests"><i class="fa-solid fa-play me-1"></i> Run Sample Tests</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  window.bindPeerMockEvents = () => {
    let timerInterval = null;
    let secondsLeft = 1800;
    let timerPaused = false;

    const startBtn = document.getElementById('btn-start-mock-session');
    const endBtn = document.getElementById('btn-end-mock-session');
    const pauseBtn = document.getElementById('btn-timer-pause');
    const submitRubricBtn = document.getElementById('btn-submit-rubric');
    const qSelect = document.getElementById('mock-select-question');
    const hintsToggleBtn = document.getElementById('btn-toggle-secret-hints');
    const hintsContainer = document.getElementById('arena-hints');
    const exportDebriefBtn = document.getElementById('btn-export-debrief');
    const runTestsBtn = document.getElementById('btn-run-mock-tests');
    const copyCodeBtn = document.getElementById('btn-copy-code');
    const clearCodeBtn = document.getElementById('btn-clear-scratchpad');

    if (startBtn) {
      startBtn.addEventListener('click', () => {
        const qId = qSelect ? qSelect.value : 'mock-q-1';
        const question = MOCK_QUESTIONS.find(q => q.id === qId) || MOCK_QUESTIONS[0];

        document.getElementById('mock-setup-container').style.display = 'none';
        document.getElementById('mock-arena-active').style.display = 'block';

        document.getElementById('arena-title').textContent = `${question.domain}: ${question.title}`;
        document.getElementById('arena-description').textContent = question.description;
        if (hintsContainer) {
          hintsContainer.innerHTML = question.hints.map(h => `<div class="mb-1">&bull; ${h}</div>`).join('');
          hintsContainer.style.display = 'none';
        }
        const toggleText = document.getElementById('hints-toggle-text');
        if (toggleText) toggleText.textContent = 'Show Hints';

        const rubricContainer = document.getElementById('arena-rubric-items');
        if (rubricContainer) {
          rubricContainer.innerHTML = question.rubricItems.map((r, i) => `
            <div class="d-flex justify-content-between align-items-center p-2 rounded bg-black bg-opacity-40 border border-secondary border-opacity-25 fs-8">
              <span class="text-light">${r.name} (${r.weight}%)</span>
              <div class="btn-group btn-group-sm" role="group">
                <input type="radio" class="btn-check rubric-radio" name="rubric-score-${i}" id="sc-${i}-1" value="1" data-weight="${r.weight}">
                <label class="btn btn-outline-secondary fs-9" for="sc-${i}-1">1</label>
                <input type="radio" class="btn-check rubric-radio" name="rubric-score-${i}" id="sc-${i}-2" value="2" data-weight="${r.weight}">
                <label class="btn btn-outline-secondary fs-9" for="sc-${i}-2">2</label>
                <input type="radio" class="btn-check rubric-radio" name="rubric-score-${i}" id="sc-${i}-3" value="3" checked data-weight="${r.weight}">
                <label class="btn btn-outline-secondary fs-9" for="sc-${i}-3">3</label>
                <input type="radio" class="btn-check rubric-radio" name="rubric-score-${i}" id="sc-${i}-4" value="4" data-weight="${r.weight}">
                <label class="btn btn-outline-secondary fs-9" for="sc-${i}-4">4</label>
                <input type="radio" class="btn-check rubric-radio" name="rubric-score-${i}" id="sc-${i}-5" value="5" data-weight="${r.weight}">
                <label class="btn btn-outline-secondary fs-9" for="sc-${i}-5">5</label>
              </div>
            </div>
          `).join('');

          // Bind recalculation
          document.querySelectorAll('.rubric-radio').forEach(r => {
            r.addEventListener('change', calculateRubricScore);
          });
        }

        AudioSynth.playChime(440, 880, 0.4);

        secondsLeft = 1800;
        timerPaused = false;
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
          if (!timerPaused) {
            secondsLeft--;
            if (secondsLeft <= 0) {
              clearInterval(timerInterval);
              AudioSynth.playChime(880, 440, 1.2);
              safeToast('Time is up for this 30-minute round!', 'warning');
            }
            const m = Math.floor(secondsLeft / 60).toString().padStart(2, '0');
            const s = (secondsLeft % 60).toString().padStart(2, '0');
            const timerEl = document.getElementById('arena-timer');
            if (timerEl) timerEl.textContent = `${m}:${s}`;
          }
        }, 1000);
      });
    }

    function calculateRubricScore() {
      let total = 0;
      let count = 0;
      document.querySelectorAll('.rubric-radio:checked').forEach(radio => {
        total += parseFloat(radio.value);
        count++;
      });
      const avg = count ? (total / count).toFixed(1) : '3.0';
      const badge = document.getElementById('rubric-score-badge');
      if (badge) {
        badge.textContent = `Score: ${avg} / 5.0`;
        if (avg >= 4.0) badge.className = 'badge bg-success bg-opacity-25 text-success border border-success border-opacity-40 font-monospace fs-9';
        else if (avg >= 3.0) badge.className = 'badge bg-primary bg-opacity-25 text-info border border-primary border-opacity-40 font-monospace fs-9';
        else badge.className = 'badge bg-warning bg-opacity-25 text-warning border border-warning border-opacity-40 font-monospace fs-9';
      }
    }

    if (hintsToggleBtn) {
      hintsToggleBtn.addEventListener('click', () => {
        if (!hintsContainer) return;
        const isHidden = hintsContainer.style.display === 'none';
        hintsContainer.style.display = isHidden ? 'block' : 'none';
        const toggleText = document.getElementById('hints-toggle-text');
        if (toggleText) toggleText.textContent = isHidden ? 'Hide Hints' : 'Show Hints';
        AudioSynth.playChime(550, 700, 0.15);
      });
    }

    if (pauseBtn) {
      pauseBtn.addEventListener('click', () => {
        timerPaused = !timerPaused;
        pauseBtn.innerHTML = timerPaused ? '<i class="fa-solid fa-play text-success"></i>' : '<i class="fa-solid fa-pause"></i>';
        safeToast(timerPaused ? 'Timer paused' : 'Timer resumed', 'info');
      });
    }

    if (runTestsBtn) {
      runTestsBtn.addEventListener('click', () => {
        const code = document.getElementById('arena-code-editor')?.value || '';
        const statusEl = document.getElementById('scratchpad-status');
        if (!code.trim()) {
          safeToast('Write some code first before running sample tests', 'warning');
          return;
        }
        if (statusEl) statusEl.innerHTML = '<i class="fa-solid fa-spinner fa-spin text-warning me-1"></i> Running tests...';
        setTimeout(() => {
          AudioSynth.playChime(660, 880, 0.3);
          if (statusEl) statusEl.innerHTML = '<span class="text-success"><i class="fa-solid fa-circle-check me-1"></i> 3/3 Sample Test Cases Passed (21ms)</span>';
          safeToast('Mock dry-run completed successfully!', 'success');
        }, 800);
      });
    }

    if (copyCodeBtn) {
      copyCodeBtn.addEventListener('click', () => {
        const code = document.getElementById('arena-code-editor')?.value;
        if (code) {
          navigator.clipboard.writeText(code).then(() => {
            AudioSynth.playChime(523, 659, 0.2);
            safeToast('Candidate code copied to clipboard!', 'success');
          });
        }
      });
    }

    if (clearCodeBtn) {
      clearCodeBtn.addEventListener('click', () => {
        const ed = document.getElementById('arena-code-editor');
        if (ed && confirm('Clear the code scratchpad?')) {
          ed.value = '';
          safeToast('Scratchpad cleared', 'info');
        }
      });
    }

    if (exportDebriefBtn) {
      exportDebriefBtn.addEventListener('click', () => {
        const title = document.getElementById('arena-title')?.textContent || 'Mock Technical Round';
        const rec = document.getElementById('arena-hire-rec')?.value || 'Hire';
        const code = document.getElementById('arena-code-editor')?.value || '// No code written';
        const debrief = `# PrepSpace Interview Debrief\n\n**Problem**: ${title}\n**Date**: ${new Date().toLocaleDateString()}\n**Verdict**: ${rec}\n\n## Candidate Solution\n\`\`\`\n${code}\n\`\`\`\n\n*Debrief compiled via PrepSpace Peer Mock Arena.*`;
        navigator.clipboard.writeText(debrief).then(() => {
          AudioSynth.playChime(587, 880, 0.3);
          safeToast('Complete interview debrief copied to clipboard!', 'success');
        });
      });
    }

    function exitArena() {
      clearInterval(timerInterval);
      document.getElementById('mock-setup-container').style.display = 'flex';
      document.getElementById('mock-arena-active').style.display = 'none';
    }

    if (endBtn) endBtn.addEventListener('click', exitArena);

    if (submitRubricBtn) {
      submitRubricBtn.addEventListener('click', () => {
        let karma = parseInt(localStorage.getItem('prepspace_peer_karma') || '100', 10);
        karma += 50;
        localStorage.setItem('prepspace_peer_karma', karma.toString());

        const rec = document.getElementById('arena-hire-rec')?.value || 'Hire';
        AudioSynth.playChime(523, 784, 0.5);
        safeToast(`Scorecard submitted! Recommendation: ${rec}. Awarded +50 Karma!`, 'success');

        const karmaDisp = document.getElementById('peer-karma-display');
        if (karmaDisp) karmaDisp.textContent = karma + ' pts';

        exitArena();
      });
    }
  };

  // =========================================================================
  // 4. 60-SECOND FEYNMAN AUDIO BITES WITH STUDIO PODCAST ENGINE (#/audio-bites)
  // =========================================================================

  const AUDIO_BITES_DATA = [
    {
      id: 'bite-1',
      title: 'The CAP Theorem & PACELC Trade-offs',
      category: 'Distributed Systems',
      duration: '60s',
      analogy: 'A three-legged stool where network cables can get cut by a backhoe.',
      script: 'In any distributed data store, you can only pick two of three guarantees: Consistency, Availability, and Partition Tolerance. But in the real world, network partitions are inevitable. Therefore, you are really choosing between CP or AP. If the network splits, do you reject writes to preserve exact consistency like MongoDB or Spanner? Or do you accept writes and resolve conflicts later like Cassandra or DynamoDB? PACELC expands this: Else, when the network is normal, do you trade latency or consistency? Remember: real world architecture is always about picking which pain you prefer.'
    },
    {
      id: 'bite-2',
      title: 'B-Trees vs LSM-Trees: Storage Engine Internals',
      category: 'Database Engines',
      duration: '65s',
      analogy: 'A printed phonebook versus a fast receipt spike at a diner counter.',
      script: 'Why do traditional databases like Postgres use B-Trees, while high-write databases like Cassandra, RocksDB, and Kafka use Log-Structured Merge Trees? A B-Tree is like a printed phonebook. Reading any ones number is fast because pages are sorted, but inserting a new name requires erasing and re-shifting entries on disk, which causes slow random disk I/O. An LSM Tree is like a receipt spike at a diner. When an order happens, you just impale the receipt on top—that is an append-only sequential write, which is blazingly fast. Later, in the background, a worker merges those receipts into structured files. B-Trees optimize for reads; LSM trees optimize for furious write throughput.'
    },
    {
      id: 'bite-3',
      title: 'TCP 3-Way Handshake: The Walkie-Talkie Protocol',
      category: 'Networking',
      duration: '50s',
      analogy: 'SYN, SYN-ACK, ACK explained like pilots communicating over radio.',
      script: 'Before a browser can send a single byte of HTTP data over TCP, it performs the 3-way handshake. Think of two pilots over radio. Pilot A says: Tower, can you hear me? Syn. The tower replies: Loud and clear Pilot A, can you hear me? Syn, Ack. Pilot A responds: Copy that Tower, connection established, sending flight plan: Ack. Only after this confirmation can full-duplex reliable byte transmission begin. This is why TCP has an initial 1-Round-Trip-Time latency penalty before any data flows.'
    },
    {
      id: 'bite-4',
      title: 'Consistent Hashing: The Circular Roulette Wheel',
      category: 'System Design',
      duration: '70s',
      analogy: 'A circular roulette ring where both servers and keys are placed as angle degrees.',
      script: 'When you have 10 cache servers and calculate server equals hash of key mod 10, what happens if server 5 crashes? Now you must mod 9, which relocates 90 percent of your cached keys and causes a catastrophic database stampede. Consistent Hashing solves this by placing both servers and keys onto a 360-degree virtual ring. When a key looks for its cache server, it simply travels clockwise along the ring until it hits the first server. If one server dies, only the keys directly preceding it shift to the next neighbor—the remaining 90 percent of keys stay exactly where they were.'
    },
    {
      id: 'bite-5',
      title: 'Mutex vs Semaphore: The Coffee Shop Bathroom Key',
      category: 'Operating Systems & Concurrency',
      duration: '55s',
      analogy: 'A single bathroom key held by one customer versus 4 bowling lane passes.',
      script: 'What is the difference between a Mutex and a Counting Semaphore? A Mutex is a mutual exclusion lock: think of a single coffee shop bathroom key. Only one customer can hold the key. While they are inside, everyone else waits in line. Crucially, only the person who took the key is allowed to unlock and return it. A Semaphore is like a bowling alley with 4 lanes. It has a counter initialized to 4. As customers arrive, the counter decrements. When it hits zero, newcomers wait. When any bowler finishes, the counter increments. A mutex allows 1 owner; a semaphore controls access to a pool of finite resources.'
    },
    {
      id: 'bite-6',
      title: 'Zero-Copy Architecture: Kafka & Linux sendfile()',
      category: 'Operating Systems & Messaging',
      duration: '60s',
      analogy: 'Directly transferring an envelope across desks instead of copying it 4 times.',
      script: 'How does Apache Kafka stream gigabytes per second without melting the CPU? Traditional I/O reads data from disk into OS kernel cache, copies it to JVM user space, then copies it back to the kernel socket buffer, and finally to the network card. That is four memory copies and four expensive context switches! Zero-copy uses the Linux sendfile system call: data is read from disk straight into kernel memory and transferred directly to the network interface card via DMA. The CPU never touches the payload. That is how Kafka achieves raw network wire speed.'
    },
    {
      id: 'bite-7',
      title: 'Database Isolation Levels: Dirty Reads to Serializable',
      category: 'Database Internals',
      duration: '65s',
      analogy: 'Drafting Google Docs with or without seeing uncommitted colleague edits.',
      script: 'Database transactions need isolation, but high isolation kills throughput. The standard ANSI SQL levels are four: Read Uncommitted lets you see uncommitted drafts, causing dirty reads. Read Committed guarantees you only read finalized transactions, but a query running twice might see different values, which is a non-repeatable read. Repeatable Read locks the snapshot of rows you inspected, preventing updates, but phantom rows can still sneak in. Finally, Serializable orders all transactions as if run one after another, eliminating all anomalies at the cost of high concurrency lock contention. Most production systems default to Read Committed for optimal balance.'
    }
  ];

  components.feynmanAudio = () => {
    return `
      <div class="container-fluid px-3 px-md-4 py-3">
        <!-- Header -->
        <div class="d-flex flex-wrap justify-content-between align-items-center mb-4 pb-2 border-bottom border-secondary border-opacity-15 gap-2">
          <div>
            <div class="d-flex align-items-center gap-2">
              <span class="badge bg-info bg-opacity-25 text-info border border-info border-opacity-50 font-monospace fs-9">STUDIO AUDIO PODCAST</span>
              <h4 class="text-white fw-bold m-0 fs-5">60-Second Feynman Audio Bites</h4>
            </div>
            <p class="text-muted fs-8 mb-0 mt-1">Master distributed systems, database internals, and OS concurrency with high-definition podcast narration.</p>
          </div>
          <div class="d-flex align-items-center gap-2">
            <!-- Studio Focus Bed Toggle -->
            <button class="btn btn-sm btn-glass text-warning border border-warning border-opacity-30 fs-9" id="btn-toggle-ambience">
              <i class="fa-solid fa-headphones me-1"></i> <span id="ambience-status-text">Studio Ambience: OFF</span>
            </button>
            <span class="badge bg-dark border border-secondary border-opacity-30 text-white font-monospace fs-9">
              <i class="fa-solid fa-microphone text-info me-1"></i>HD Speech Engine
            </span>
          </div>
        </div>

        <!-- Master Studio Audio Player -->
        <div class="card bg-dark border-primary border-opacity-40 rounded-3 p-3 mb-4 shadow" id="master-audio-player">
          <div class="d-flex flex-wrap align-items-center justify-content-between gap-3">
            <div class="d-flex align-items-center gap-3">
              <button class="btn btn-primary rounded-circle d-flex align-items-center justify-content-center shadow-lg" id="btn-audio-play-pause" style="width: 52px; height: 52px; min-width: 52px;">
                <i class="fa-solid fa-play fs-5" id="icon-play-state"></i>
              </button>
              <div>
                <span class="badge bg-primary bg-opacity-20 text-info font-monospace fs-9" id="player-category">SELECT A LESSON</span>
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
          <div class="mt-3">
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
            <div class="fs-8 text-light font-monospace p-2.5 rounded bg-black bg-opacity-40 border border-secondary border-opacity-25" id="player-transcript" style="line-height: 1.8;">
              Select any concept card below to begin narration.
            </div>
          </div>
        </div>

        <!-- Concepts Catalog -->
        <div class="row g-3">
          ${AUDIO_BITES_DATA.map((bite, i) => `
            <div class="col-12 col-md-6 col-xl-4">
              <div class="card bg-dark bg-opacity-70 border-secondary border-opacity-30 rounded-3 p-3 h-100 shadow-sm feynman-card" data-id="${bite.id}">
                <div class="d-flex justify-content-between align-items-start mb-2">
                  <span class="badge bg-secondary bg-opacity-25 text-info border border-secondary border-opacity-20 font-monospace fs-9">${bite.category}</span>
                  <span class="text-muted font-monospace fs-9"><i class="fa-regular fa-clock me-1"></i>${bite.duration}</span>
                </div>
                <h6 class="text-white fw-bold fs-7 mb-2">${bite.title}</h6>
                <div class="p-2.5 bg-black bg-opacity-40 rounded border-start border-2 border-warning mb-3">
                  <span class="fs-9 text-warning font-monospace d-block">Intuitive Analogy:</span>
                  <small class="fs-8 text-secondary">${bite.analogy}</small>
                </div>
                <div class="mt-auto pt-2 border-top border-secondary border-opacity-15 d-flex justify-content-between align-items-center">
                  <button class="btn btn-sm btn-primary py-1 px-3 fs-9 play-bite-btn" data-id="${bite.id}">
                    <i class="fa-solid fa-play me-1"></i> Listen (${bite.duration})
                  </button>
                  <button class="btn btn-sm btn-glass text-muted fs-9 copy-bite-btn" data-id="${bite.id}"><i class="fa-solid fa-copy me-1"></i> Copy</button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  };

  window.bindFeynmanAudioEvents = () => {
    let currentUtterance = null;
    let isPlaying = false;
    let currentBite = AUDIO_BITES_DATA[0];
    let currentSpeed = 1.0;
    let currentPersona = 'host_deep';
    let ambienceActive = false;
    let progressTimer = null;
    let elapsedSeconds = 0;
    let sentenceList = [];
    let activeSentenceIndex = 0;

    const playPauseBtn = document.getElementById('btn-audio-play-pause');
    const playIcon = document.getElementById('icon-play-state');
    const titleEl = document.getElementById('player-title');
    const catEl = document.getElementById('player-category');
    const transcriptEl = document.getElementById('player-transcript');
    const waveformEl = document.getElementById('audio-waveform-bars');
    const progressBar = document.getElementById('audio-progress-bar');
    const timeElapsedEl = document.getElementById('audio-time-elapsed');
    const timeTotalEl = document.getElementById('audio-time-total');
    const ambienceBtn = document.getElementById('btn-toggle-ambience');
    const ambienceText = document.getElementById('ambience-status-text');

    // Ambience focus bed toggle
    if (ambienceBtn) {
      ambienceBtn.addEventListener('click', () => {
        ambienceActive = !ambienceActive;
        if (ambienceActive) {
          AudioSynth.startAmbience();
          if (ambienceText) ambienceText.textContent = 'Studio Ambience: ON';
          ambienceBtn.className = 'btn btn-sm btn-warning text-dark border border-warning fs-9';
          safeToast('Studio room ambience bed activated', 'info');
        } else {
          AudioSynth.stopAmbience();
          if (ambienceText) ambienceText.textContent = 'Studio Ambience: OFF';
          ambienceBtn.className = 'btn btn-sm btn-glass text-warning border border-warning border-opacity-30 fs-9';
          safeToast('Studio ambience paused', 'info');
        }
      });
    }

    function stopPlayback() {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      isPlaying = false;
      clearInterval(progressTimer);
      if (playIcon) playIcon.className = 'fa-solid fa-play fs-5';
      if (waveformEl) waveformEl.classList.remove('active');
    }

    function renderClickableTranscript(scriptText) {
      // Split into sentences
      sentenceList = scriptText.match(/[^.!?]+[.!?]+/g) || [scriptText];
      if (transcriptEl) {
        transcriptEl.innerHTML = sentenceList.map((sen, idx) => `
          <span class="transcript-sentence ${idx === activeSentenceIndex ? 'active' : ''}" data-idx="${idx}" style="cursor: pointer; transition: all 0.2s ease;">
            ${sen.trim()} 
          </span>
        `).join('');

        transcriptEl.querySelectorAll('.transcript-sentence').forEach(span => {
          span.addEventListener('click', () => {
            const idx = parseInt(span.getAttribute('data-idx'), 10);
            activeSentenceIndex = idx;
            // Seek and start speaking from this sentence
            const remainingScript = sentenceList.slice(idx).join(' ');
            startPlayback(currentBite, remainingScript, idx);
          });
        });
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

    function startPlayback(bite, customScript = null, startSentenceIdx = 0) {
      stopPlayback();
      currentBite = bite;

      if (titleEl) titleEl.textContent = bite.title;
      if (catEl) catEl.textContent = bite.category;

      const scriptToSpeak = customScript || bite.script;
      renderClickableTranscript(bite.script);
      highlightSentence(startSentenceIdx);

      if (!window.speechSynthesis) {
        safeToast('Speech synthesis not supported on this browser', 'warning');
        return;
      }

      const voiceConfig = VoiceEngine.getVoice(currentPersona);
      const formatted = VoiceEngine.formatText(scriptToSpeak);

      currentUtterance = new SpeechSynthesisUtterance(formatted);
      if (voiceConfig.voice) currentUtterance.voice = voiceConfig.voice;
      currentUtterance.pitch = voiceConfig.pitch;
      currentUtterance.rate = currentSpeed * voiceConfig.rate;

      // Estimate duration (words / ~2.5 words per sec adjusted for rate)
      const words = scriptToSpeak.split(/\s+/).length;
      const totalSec = Math.max(15, Math.round((words / (2.5 * currentSpeed))));
      if (timeTotalEl) timeTotalEl.textContent = `0:${totalSec.toString().padStart(2, '0')}`;

      elapsedSeconds = 0;
      if (progressBar) progressBar.style.width = '0%';
      if (timeElapsedEl) timeElapsedEl.textContent = '0:00';

      currentUtterance.onstart = () => {
        isPlaying = true;
        if (playIcon) playIcon.className = 'fa-solid fa-pause fs-5';
        if (waveformEl) waveformEl.classList.add('active');

        // Play subtle studio focus bed if enabled
        if (ambienceActive) AudioSynth.startAmbience();

        clearInterval(progressTimer);
        progressTimer = setInterval(() => {
          elapsedSeconds++;
          const pct = Math.min(100, (elapsedSeconds / totalSec) * 100);
          if (progressBar) progressBar.style.width = `${pct}%`;
          if (timeElapsedEl) {
            const m = Math.floor(elapsedSeconds / 60);
            const s = (elapsedSeconds % 60).toString().padStart(2, '0');
            timeElapsedEl.textContent = `${m}:${s}`;
          }

          // Advance sentence highlight approx
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
      };

      currentUtterance.onerror = () => {
        stopPlayback();
      };

      window.speechSynthesis.speak(currentUtterance);
    }

    if (playPauseBtn) {
      playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
          stopPlayback();
        } else {
          startPlayback(currentBite);
        }
      });
    }

    // Voice Persona Selection
    document.querySelectorAll('.voice-persona-opt').forEach(opt => {
      opt.addEventListener('click', () => {
        document.querySelectorAll('.voice-persona-opt').forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
        currentPersona = opt.getAttribute('data-persona');
        const labelEl = document.getElementById('persona-label');
        if (labelEl) {
          if (currentPersona === 'host_deep') labelEl.textContent = 'Deep Studio Host';
          else if (currentPersona === 'host_smooth') labelEl.textContent = 'Smooth Co-Host';
          else if (currentPersona === 'scholar_uk') labelEl.textContent = 'British Scholar';
        }
        AudioSynth.playChime(660, 880, 0.2);
        safeToast(`Voice persona: ${labelEl?.textContent || currentPersona}`, 'info');
        if (isPlaying && currentBite) {
          startPlayback(currentBite);
        }
      });
    });

    // Speed Selection
    document.querySelectorAll('.speed-opt').forEach(opt => {
      opt.addEventListener('click', () => {
        document.querySelectorAll('.speed-opt').forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
        const spd = parseFloat(opt.getAttribute('data-speed'));
        currentSpeed = spd;
        const speedBtn = document.getElementById('btn-audio-speed');
        if (speedBtn) speedBtn.textContent = spd + 'x';
        if (isPlaying && currentBite) {
          startPlayback(currentBite);
        }
      });
    });

    // Rewind 10s
    const rewindBtn = document.getElementById('btn-audio-rewind');
    if (rewindBtn) {
      rewindBtn.addEventListener('click', () => {
        if (currentBite) {
          AudioSynth.playChime(550, 440, 0.2);
          startPlayback(currentBite);
          safeToast('Rewound to start of lesson', 'info');
        }
      });
    }

    // Concept Cards Listen Buttons
    document.querySelectorAll('.play-bite-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const bite = AUDIO_BITES_DATA.find(b => b.id === id);
        if (bite) {
          startPlayback(bite);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    });

    // Concept Cards Copy Buttons
    document.querySelectorAll('.copy-bite-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const bite = AUDIO_BITES_DATA.find(b => b.id === id);
        if (bite) {
          navigator.clipboard.writeText(`${bite.title}\n\nAnalogy: ${bite.analogy}\n\n${bite.script}`).then(() => {
            AudioSynth.playChime(523, 659, 0.2);
            safeToast('Feynman summary copied to clipboard!', 'info');
          });
        }
      });
    });

    renderClickableTranscript(currentBite.script);
  };

  // =========================================================================
  // 5. EMERGENCY 60-MINUTE PRE-INTERVIEW CRISIS BOOSTER (#/interview-booster)
  // =========================================================================

  const BOOSTER_DATA = {
    'java': {
      name: 'Java & Spring Boot Core',
      traps: [
        { q: 'Why does overriding equals() require overriding hashCode()?', a: 'Because hash collections (HashMap, HashSet) compute the bucket index via hashCode(). If two objects are equal by equals() but have different hashCodes, the collection will store duplicates or fail to find the key.' },
        { q: 'What is the difference between @Transactional(readOnly = true) and standard?', a: 'It hints to Hibernate to turn off dirty checking, sets JDBC connection to read-only, and prevents accidental flushes, boosting query throughput by up to 30%.' },
        { q: 'How does ConcurrentHashMap achieve high concurrency in Java 8+?', a: 'It discarded the old ReentrantLock Segment array. It now uses CAS (Compare-And-Swap) for empty bucket insertion and synchronized locking strictly on the head node of a bucket collision chain.' },
        { q: 'Difference between Thread Pool submit() vs execute()?', a: 'execute() accepts Runnable and returns void (uncaught exceptions print to stderr). submit() accepts Callable or Runnable and returns a Future, swallowing exceptions until Future.get() is called.' }
      ],
      slips: [
        'String immutability: str.concat("x") does not modify str in-place.',
        'Autoboxing pitfalls: Integer a = 128; Integer b = 128; a == b is FALSE (cache is -128 to 127).',
        'Optional.get() without isPresent() is an anti-pattern; use orElse() or orElseThrow().'
      ]
    },
    'frontend': {
      name: 'React & Frontend Architecture',
      traps: [
        { q: 'Why shouldn\'t you mutate React state directly (e.g. state.items.push(x))?', a: 'React relies on shallow reference comparison (Object.is) to trigger reconciliations. Mutating in-place keeps the memory reference identical, so React ignores re-rendering.' },
        { q: 'Difference between useMemo and useCallback?', a: 'useMemo caches the evaluated RESULT of a computation. useCallback caches the FUNCTION REFERENCE itself to prevent child re-renders with React.memo.' },
        { q: 'What is the Event Loop order between microtasks and macrotasks?', a: 'Call Stack executes -> All Microtasks run (Promises, queueMicrotask) until queue is empty -> Render/Paint occurs -> Single Macrotask runs (setTimeout, setInterval, I/O).' }
      ],
      slips: [
        'Missing dependency array in useEffect causes continuous infinite re-renders.',
        'Keys in lists must be unique stable IDs, never array index if items can be re-ordered.',
        'CSS specificity: inline > #id > .class/attribute > element.'
      ]
    },
    'system_design': {
      name: 'Distributed Systems & Architecture',
      traps: [
        { q: 'How do you handle database write bottlenecks without losing data?', a: 'Place an asynchronous message broker (Kafka or RabbitMQ) in front of the database to decouple ingestion rate from persistent disk writes (backpressure buffering).' },
        { q: 'What is the difference between Idempotency and Deduplication?', a: 'Idempotency means f(f(x)) = f(x); executing a payment request with idempotency-key 5 times produces the exact same balance as executing it once.' },
        { q: 'How do you prevent cache stampedes when hot keys expire?', a: 'Use probabilistic early expiration (XFetch algorithm) or acquire a distributed mutex (e.g. Redis Redlock) so only 1 worker computes the new cache while others serve the stale grace period.' }
      ],
      slips: [
        'Single point of failure (SPOF): Always identify if your Load Balancer or Master DB has a standby replica.',
        'Always estimate read-to-write ratio (e.g. Twitter is 100:1 read-heavy; IoT telemetry is write-heavy).',
        'Clock skew: Never rely on server system clocks across distributed nodes for ordering; use Lamport timestamps or Raft log index.'
      ]
    },
    'database': {
      name: 'SQL & Database Concurrency',
      traps: [
        { q: 'Difference between clustered and non-clustered index?', a: 'A clustered index dictates the physical on-disk sorted order of table data (1 per table, usually Primary Key). A non-clustered index is a separate B-Tree storing index keys with pointers (row IDs) to the clustered rows.' },
        { q: 'What is a Deadlock and how does the engine resolve it?', a: 'A circular wait where Tx1 holds Lock A and waits for Lock B, while Tx2 holds Lock B and waits for Lock A. The database engine detects cycles in the wait-for graph and rolls back the transaction with lower cost (victim).' }
      ],
      slips: [
        'SELECT * in production disables index-only covering scans and causes extra disk I/O.',
        'Adding a non-concurrent index in Postgres locks writes; always use CREATE INDEX CONCURRENTLY.'
      ]
    }
  };

  components.interviewBooster = () => {
    return `
      <div class="container-fluid px-3 px-md-4 py-3">
        <!-- Header -->
        <div class="d-flex flex-wrap justify-content-between align-items-center mb-4 pb-2 border-bottom border-secondary border-opacity-15 gap-2">
          <div>
            <div class="d-flex align-items-center gap-2">
              <span class="badge bg-danger bg-opacity-25 text-danger border border-danger border-opacity-50 font-monospace fs-9 animate-pulse">EMERGENCY PREP</span>
              <h4 class="text-white fw-bold m-0 fs-5">60-Minute Pre-Interview Crisis Booster</h4>
            </div>
            <p class="text-muted fs-8 mb-0 mt-1">Active-recall trick questions, mental calming box-breathing with audio cues, and hardware check.</p>
          </div>
          <div class="d-flex gap-2">
            <button class="btn btn-outline-light btn-sm" onclick="window.print()"><i class="fa-solid fa-print me-1"></i> Quick Print Sheet</button>
          </div>
        </div>

        <div class="row g-3">
          <div class="col-12 col-xl-7">
            <!-- Tech Stack Tabs & Active Recall Toggle -->
            <div class="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
              <div class="d-flex flex-wrap gap-1.5" id="booster-stack-tabs">
                <button class="btn btn-sm btn-outline-primary active booster-tab-btn fs-9" data-stack="java">Java & Spring</button>
                <button class="btn btn-sm btn-outline-primary booster-tab-btn fs-9" data-stack="frontend">React & Frontend</button>
                <button class="btn btn-sm btn-outline-primary booster-tab-btn fs-9" data-stack="system_design">System Design</button>
                <button class="btn btn-sm btn-outline-primary booster-tab-btn fs-9" data-stack="database">SQL & Databases</button>
              </div>
              <button class="btn btn-sm btn-glass text-warning border border-warning border-opacity-30 fs-9" id="btn-toggle-quiz-mode">
                <i class="fa-solid fa-eye-slash me-1"></i> <span id="quiz-mode-label">Hide Answers (Quiz Mode)</span>
              </button>
            </div>

            <div class="card bg-dark bg-opacity-70 border-secondary border-opacity-30 rounded-3 p-3 p-md-4 mb-3 shadow-sm">
              <h6 class="text-warning fw-bold mb-3 fs-7" id="booster-stack-title"><i class="fa-solid fa-triangle-exclamation text-warning me-2"></i>Top Last-Minute Interview Gotchas & Traps</h6>
              <div class="d-flex flex-column gap-2" id="booster-traps-container"></div>
            </div>

            <div class="card bg-dark bg-opacity-70 border-secondary border-opacity-30 rounded-3 p-3 p-md-4 shadow-sm">
              <h6 class="text-danger fw-bold mb-2 fs-7"><i class="fa-solid fa-skull-crossbones text-danger me-2"></i>Costly Memory Slips to Avoid</h6>
              <ul class="fs-8 text-secondary mb-0 ps-3" id="booster-slips-container" style="line-height: 1.7;"></ul>
            </div>
          </div>

          <div class="col-12 col-xl-5">
            <!-- Box Breathing Widget -->
            <div class="card bg-dark bg-opacity-70 border-info border-opacity-30 rounded-3 p-3 p-md-4 mb-3 text-center shadow-sm">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="badge bg-info bg-opacity-20 text-info font-monospace fs-9">NEUROSCIENCE PROTOCOL</span>
                <span class="fs-9 text-muted font-monospace" id="breath-cycle-count">Cycle: 0 / 8</span>
              </div>
              <h6 class="text-white fw-bold mb-1 fs-7">2-Minute Box Breathing Guide</h6>
              <p class="text-muted fs-9 mb-3">Activates the parasympathetic vagal nerve to lower heart rate and cortisol.</p>

              <div class="breathing-circle-wrapper my-3 d-flex align-items-center justify-content-center">
                <div class="breathing-circle d-flex align-items-center justify-content-center" id="breathing-visual">
                  <span class="fs-7 fw-bold text-white font-monospace text-center px-2" id="breathing-text">INHALE (4s)</span>
                </div>
              </div>

              <div class="d-flex justify-content-center gap-2 mt-2">
                <button class="btn btn-sm btn-outline-info px-3" id="btn-toggle-breathing"><i class="fa-solid fa-play me-1"></i> Start 2m Timer</button>
                <button class="btn btn-sm btn-glass text-secondary" id="btn-toggle-breath-audio" title="Mute/Unmute Breath Chime"><i class="fa-solid fa-volume-high"></i></button>
              </div>
            </div>

            <!-- Pre-Flight Checklist & Camera Test -->
            <div class="card bg-dark bg-opacity-70 border-secondary border-opacity-30 rounded-3 p-3 p-md-4 shadow-sm">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h6 class="text-white fw-bold m-0 fs-7"><i class="fa-solid fa-clipboard-check text-success me-2"></i>Pre-Flight Checklist (10m Out)</h6>
                <button class="btn btn-sm btn-glass text-info fs-9 py-0 px-2" id="btn-test-camera"><i class="fa-solid fa-video me-1"></i> Check Cam</button>
              </div>
              <div class="d-flex flex-column gap-2 fs-8 text-light">
                <label class="d-flex align-items-center gap-2 cursor-pointer">
                  <input type="checkbox" class="form-check-input mt-0" checked>
                  <span>Camera & mic tested on Google Meet / Zoom</span>
                </label>
                <label class="d-flex align-items-center gap-2 cursor-pointer">
                  <input type="checkbox" class="form-check-input mt-0" checked>
                  <span>Closed unnecessary browser tabs & silenced phone</span>
                </label>
                <label class="d-flex align-items-center gap-2 cursor-pointer">
                  <input type="checkbox" class="form-check-input mt-0" checked>
                  <span>Glass of water & scratchpad + pen ready</span>
                </label>
                <label class="d-flex align-items-center gap-2 cursor-pointer">
                  <input type="checkbox" class="form-check-input mt-0" checked>
                  <span>Reviewed 2 reverse interview questions to ask</span>
                </label>
              </div>

              <!-- Camera Preview Drawer -->
              <div id="camera-preview-box" class="mt-3 p-2 bg-black rounded border border-secondary border-opacity-40 text-center" style="display: none;">
                <video id="webcam-video-el" autoplay playsinline style="width: 100%; max-height: 140px; object-fit: cover; border-radius: 4px;"></video>
                <button class="btn btn-sm btn-glass text-danger mt-1 fs-9" id="btn-close-cam"><i class="fa-solid fa-xmark me-1"></i> Close Camera</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  window.bindInterviewBoosterEvents = () => {
    let currentStack = 'java';
    let quizMode = false;
    let breathChimeMuted = false;

    function renderStack(stackKey) {
      const data = BOOSTER_DATA[stackKey] || BOOSTER_DATA['java'];
      const titleEl = document.getElementById('booster-stack-title');
      const trapsContainer = document.getElementById('booster-traps-container');
      const slipsContainer = document.getElementById('booster-slips-container');

      if (titleEl) titleEl.innerHTML = `<i class="fa-solid fa-triangle-exclamation text-warning me-2"></i>Gotchas: ${data.name}`;

      if (trapsContainer) {
        trapsContainer.innerHTML = data.traps.map((t, idx) => `
          <div class="p-2.5 bg-black bg-opacity-50 rounded border border-secondary border-opacity-25 booster-trap-card">
            <div class="text-info fw-bold fs-8 mb-1">Q${idx + 1}: ${t.q}</div>
            <div class="trap-answer text-light fs-8 ${quizMode ? 'd-none' : ''}" style="line-height: 1.6;">
              <strong>A:</strong> ${t.a}
            </div>
            ${quizMode ? `
              <button class="btn btn-sm btn-glass text-warning fs-9 py-0 px-2 mt-1 reveal-answer-btn">
                <i class="fa-solid fa-eye me-1"></i> Reveal Answer
              </button>
            ` : ''}
          </div>
        `).join('');

        trapsContainer.querySelectorAll('.reveal-answer-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const ans = btn.previousElementSibling;
            if (ans) {
              ans.classList.remove('d-none');
              btn.remove();
              AudioSynth.playChime(660, 880, 0.2);
            }
          });
        });
      }

      if (slipsContainer) {
        slipsContainer.innerHTML = data.slips.map(s => `<li>${s}</li>`).join('');
      }
    }

    document.querySelectorAll('.booster-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.booster-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentStack = btn.getAttribute('data-stack');
        renderStack(currentStack);
      });
    });

    // Quiz Mode Toggle
    const quizToggleBtn = document.getElementById('btn-toggle-quiz-mode');
    if (quizToggleBtn) {
      quizToggleBtn.addEventListener('click', () => {
        quizMode = !quizMode;
        const label = document.getElementById('quiz-mode-label');
        if (label) label.textContent = quizMode ? 'Show All Answers' : 'Hide Answers (Quiz Mode)';
        renderStack(currentStack);
        AudioSynth.playChime(550, 700, 0.15);
      });
    }

    renderStack(currentStack);

    // Box Breathing
    let breathingInterval = null;
    let step = 0;
    let cycleCount = 0;
    const steps = ['INHALE (4s)', 'HOLD (4s)', 'EXHALE (4s)', 'HOLD (4s)'];
    const stepTypes = ['inhale', 'hold', 'exhale', 'hold'];
    const breathText = document.getElementById('breathing-text');
    const breathCircle = document.getElementById('breathing-visual');
    const toggleBreathBtn = document.getElementById('btn-toggle-breathing');
    const cycleCounter = document.getElementById('breath-cycle-count');
    const breathAudioBtn = document.getElementById('btn-toggle-breath-audio');

    if (breathAudioBtn) {
      breathAudioBtn.addEventListener('click', () => {
        breathChimeMuted = !breathChimeMuted;
        breathAudioBtn.innerHTML = breathChimeMuted ? '<i class="fa-solid fa-volume-xmark text-danger"></i>' : '<i class="fa-solid fa-volume-high"></i>';
        safeToast(breathChimeMuted ? 'Breath audio chime muted' : 'Breath audio chime enabled', 'info');
      });
    }

    if (toggleBreathBtn) {
      toggleBreathBtn.addEventListener('click', () => {
        if (breathingInterval) {
          clearInterval(breathingInterval);
          breathingInterval = null;
          toggleBreathBtn.innerHTML = '<i class="fa-solid fa-play me-1"></i> Start 2m Timer';
          if (breathCircle) breathCircle.classList.remove('active');
        } else {
          if (breathCircle) breathCircle.classList.add('active');
          toggleBreathBtn.innerHTML = '<i class="fa-solid fa-pause me-1"></i> Pause';
          step = 0;
          cycleCount = 0;
          if (breathText) breathText.textContent = steps[step];
          if (!breathChimeMuted) AudioSynth.playBreathCue('inhale');

          breathingInterval = setInterval(() => {
            step = (step + 1) % steps.length;
            if (step === 0) {
              cycleCount++;
              if (cycleCounter) cycleCounter.textContent = `Cycle: ${cycleCount} / 8`;
            }
            if (breathText) breathText.textContent = steps[step];
            if (!breathChimeMuted) AudioSynth.playBreathCue(stepTypes[step]);
          }, 4000);
        }
      });
    }

    // Camera Diagnostics Test
    const testCamBtn = document.getElementById('btn-test-camera');
    const camBox = document.getElementById('camera-preview-box');
    const camVideo = document.getElementById('webcam-video-el');
    const closeCamBtn = document.getElementById('btn-close-cam');
    let mediaStream = null;

    if (testCamBtn) {
      testCamBtn.addEventListener('click', async () => {
        try {
          if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            if (camVideo) camVideo.srcObject = mediaStream;
            if (camBox) camBox.style.display = 'block';
            safeToast('Camera test active — looking sharp!', 'success');
          } else {
            safeToast('Camera diagnostics not supported in this browser context', 'warning');
          }
        } catch(err) {
          safeToast('Camera permission denied or camera not found', 'warning');
        }
      });
    }

    if (closeCamBtn) {
      closeCamBtn.addEventListener('click', () => {
        if (mediaStream) {
          mediaStream.getTracks().forEach(t => t.stop());
          mediaStream = null;
        }
        if (camBox) camBox.style.display = 'none';
      });
    }
  };

  // =========================================================================
  // 6. REVERSE INTERVIEW KIT ("QUESTIONS TO ASK THEM") (#/reverse-interview)
  // =========================================================================

  const REVERSE_QUESTIONS = [
    {
      id: 'rev-1',
      category: 'Engineering Culture & Incidents',
      role: 'Manager & Lead',
      badgeColor: 'danger',
      question: 'When a production severity-1 incident happens at 2 AM, what does the blameless post-mortem process look like here?',
      whyItWorks: 'Shows you value psychological safety, system reliability, and post-incident learning rather than toxic finger-pointing.',
      greenFlag: 'Team writes blameless RCAs, actions items are prioritized in sprint, no public shaming.',
      redFlag: '"We never have outages" or leaders assigning personal blame to developers.'
    },
    {
      id: 'rev-2',
      category: 'Technical Debt & Architecture',
      role: 'Peer Engineer',
      badgeColor: 'warning',
      question: 'What percentage of sprint capacity does the team realistically allocate to technical debt and refactoring versus new feature requests?',
      whyItWorks: 'Reveals if you will be stuck firefighting legacy spaghetti code or if engineering leadership respects architectural hygiene.',
      greenFlag: '15–25% dedicated sprint buffer or dedicated quarterly cleanup weeks.',
      redFlag: '"We fix debt when we get free time" (which means never).'
    },
    {
      id: 'rev-3',
      category: 'Product & Business Growth',
      role: 'Engineering Manager',
      badgeColor: 'primary',
      question: 'What is the single biggest technical bottleneck your team must solve in the next two quarters to meet its roadmap milestones?',
      whyItWorks: 'Immediately frames you as a strategic problem-solver looking to add immediate business value.',
      greenFlag: 'Manager has crystal-clear clarity on bottlenecks (e.g. database migration, latency, observability).',
      redFlag: 'Vague answers or disconnected from the product roadmap.'
    },
    {
      id: 'rev-4',
      category: 'Excellence & Team Dynamics',
      role: 'Director / VP',
      badgeColor: 'success',
      question: 'Looking at engineers who have joined this team in the past year, what separated those who were merely good from those who were truly exceptional?',
      whyItWorks: 'One of the most memorable questions an executive can be asked. Highlights high ambition and desire for measurable excellence.',
      greenFlag: 'Specific traits mentioned: proactive communication, unblocking others, driving ownership in ambiguity.',
      redFlag: '"Working 70 hours a week" or strictly grinding tickets.'
    },
    {
      id: 'rev-5',
      category: 'Mentorship & Career Progression',
      role: 'Peer & Manager',
      badgeColor: 'info',
      question: 'How do architectural proposals and RFCs (Request for Comments) get reviewed between junior developers and staff architects?',
      whyItWorks: 'Shows you care about collaborative design, transparent engineering standards, and career growth.',
      greenFlag: 'Open RFC Google Docs, weekly design reviews where anyone can ask questions.',
      redFlag: 'Ivory tower architects handing down decrees without team input.'
    },
    {
      id: 'rev-6',
      category: 'Velocity & Tooling',
      role: 'Peer Engineer',
      badgeColor: 'primary',
      question: 'From merging a pull request on main to running in production, how long does the CI/CD pipeline take, and how often do you deploy?',
      whyItWorks: 'Gauges automated test maturity, build speeds, and developer velocity.',
      greenFlag: 'Deploys multiple times a day with canary rollouts and under 15-minute pipeline runs.',
      redFlag: 'Manual testing releases once a month on Thursday nights.'
    },
    {
      id: 'rev-7',
      category: 'Business Runway & Strategy',
      role: 'Director / VP',
      badgeColor: 'warning',
      question: 'What is the company\'s revenue runway or profitability path, and how does this team contribute to top-line business metrics?',
      whyItWorks: 'Protects you against layoffs and shows strategic commercial acumen.',
      greenFlag: 'Transparent runway (>24 months or profitable), clear metrics tied to business revenue.',
      redFlag: 'Evading the question or defensive responses about burn rate.'
    },
    {
      id: 'rev-8',
      category: 'On-Call & Work-Life Balance',
      role: 'Peer Engineer',
      badgeColor: 'danger',
      question: 'What does the on-call rotation look like, how many pages occur outside working hours, and do you get compensatory time off?',
      whyItWorks: 'Vital self-care question to avoid burnout hellscapes.',
      greenFlag: '<2 pages a week, comp time for overnight incidents, active investment in auto-healing.',
      redFlag: 'Engineers laughing nervously or mentioning regular weekend emergency pages.'
    }
  ];

  components.reverseInterview = () => {
    let savedDeck = [];
    let customQuestions = [];
    try {
      savedDeck = JSON.parse(localStorage.getItem('prepspace_reverse_deck') || '[]');
      customQuestions = JSON.parse(localStorage.getItem('prepspace_reverse_custom') || '[]');
    } catch(e) {}

    const allQuestions = [...REVERSE_QUESTIONS, ...customQuestions];

    return `
      <div class="container-fluid px-3 px-md-4 py-3">
        <!-- Header -->
        <div class="d-flex flex-wrap justify-content-between align-items-center mb-4 pb-2 border-bottom border-secondary border-opacity-15 gap-2">
          <div>
            <div class="d-flex align-items-center gap-2">
              <span class="badge bg-success bg-opacity-25 text-success border border-success border-opacity-50 font-monospace fs-9">INTERVIEW CLOSING KIT</span>
              <h4 class="text-white fw-bold m-0 fs-5">Reverse Interview Kit ("Questions to Ask Them")</h4>
            </div>
            <p class="text-muted fs-8 mb-0 mt-1">Flip the table: assess culture, architecture, on-call health, and strategic vision before signing an offer.</p>
          </div>
          <div class="d-flex align-items-center gap-2">
            <button class="btn btn-outline-light btn-sm" data-bs-toggle="modal" data-bs-target="#addCustomQuestionModal">
              <i class="fa-solid fa-plus me-1"></i> Add Custom Question
            </button>
            <span class="badge bg-dark border border-secondary border-opacity-30 text-white fs-8">
              <i class="fa-solid fa-bookmark text-warning me-1"></i> Pocket Deck: <strong id="pocket-deck-count" class="text-warning">${savedDeck.length}</strong> Saved
            </span>
          </div>
        </div>

        <!-- Role Filter Pills -->
        <div class="d-flex flex-wrap gap-1.5 mb-3 align-items-center" id="reverse-filter-pills">
          <button class="btn btn-sm btn-glass active fs-9 rev-filter-btn" data-filter="all">All Questions (${allQuestions.length})</button>
          <button class="btn btn-sm btn-glass fs-9 rev-filter-btn" data-filter="Peer">Peer / Senior IC</button>
          <button class="btn btn-sm btn-glass fs-9 rev-filter-btn" data-filter="Manager">Engineering Manager</button>
          <button class="btn btn-sm btn-glass fs-9 rev-filter-btn" data-filter="Director">VP & Director</button>
        </div>

        <div class="row g-3">
          <div class="col-12 col-xl-8">
            <div class="d-flex flex-column gap-3" id="reverse-catalog-container">
              ${allQuestions.map(q => {
                const isSaved = savedDeck.includes(q.id);
                return `
                  <div class="card bg-dark bg-opacity-70 border-secondary border-opacity-30 rounded-3 p-3 p-md-4 shadow-sm reverse-question-card" data-id="${q.id}" data-role="${q.role.toLowerCase()}">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                      <div class="d-flex align-items-center gap-2">
                        <span class="badge bg-${q.badgeColor || 'primary'} bg-opacity-20 text-${q.badgeColor || 'primary'} border border-${q.badgeColor || 'primary'} border-opacity-30 font-monospace fs-9">${q.category}</span>
                        <span class="text-muted fs-9 font-monospace">&bull; Ask: ${q.role}</span>
                      </div>
                      <button class="btn btn-sm btn-glass text-warning toggle-deck-btn ${isSaved ? 'active' : ''}" data-id="${q.id}">
                        <i class="${isSaved ? 'fa-solid fa-star text-warning' : 'fa-regular fa-star text-muted'}"></i>
                      </button>
                    </div>
                    <h5 class="text-white fw-bold fs-6 mb-2">"${q.question}"</h5>
                    
                    <div class="p-2.5 rounded bg-black bg-opacity-40 border-start border-2 border-${q.badgeColor || 'primary'} mb-2">
                      <span class="text-${q.badgeColor || 'primary'} fs-9 font-monospace fw-bold d-block mb-1">Why This Wins Offers:</span>
                      <p class="text-secondary fs-8 mb-0" style="line-height: 1.6;">${q.whyItWorks}</p>
                    </div>

                    ${q.greenFlag ? `
                      <div class="row g-2 mt-1">
                        <div class="col-12 col-md-6">
                          <div class="p-2 rounded bg-black bg-opacity-30 border-start border-2 border-success fs-9">
                            <span class="text-success fw-bold d-block">🟢 Green Flag:</span>
                            <span class="text-muted">${q.greenFlag}</span>
                          </div>
                        </div>
                        <div class="col-12 col-md-6">
                          <div class="p-2 rounded bg-black bg-opacity-30 border-start border-2 border-danger fs-9">
                            <span class="text-danger fw-bold d-block">🔴 Red Flag:</span>
                            <span class="text-muted">${q.redFlag}</span>
                          </div>
                        </div>
                      </div>
                    ` : ''}
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <div class="col-12 col-xl-4">
            <div class="card bg-dark bg-opacity-70 border-secondary border-opacity-30 rounded-3 p-3 p-md-4 sticky-top shadow-sm" style="top: 20px;">
              <h6 class="text-white fw-bold mb-2 fs-7"><i class="fa-solid fa-box-archive text-warning me-2"></i>My Active Pocket Deck</h6>
              <p class="text-muted fs-9 mb-3">Star 2–4 high-impact questions to keep directly on your second screen or notepad.</p>
              
              <div id="saved-deck-container" class="d-flex flex-column gap-2 mb-3">
                ${savedDeck.length === 0 ? `
                  <div class="text-center py-4 text-muted fs-8 font-monospace">No questions starred yet.<br>Click the star on any card to add it to your pocket deck.</div>
                ` : savedDeck.map(id => {
                  const item = allQuestions.find(q => q.id === id);
                  if (!item) return '';
                  return `
                    <div class="p-2 bg-black rounded border border-secondary border-opacity-30 fs-8 text-light d-flex justify-content-between align-items-center">
                      <span class="text-truncate me-2">"${item.question}"</span>
                      <button class="btn btn-sm btn-glass text-danger p-0 px-1 remove-from-deck-btn" data-id="${item.id}"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                  `;
                }).join('')}
              </div>

              <button class="btn btn-primary btn-sm w-100 py-2" id="btn-copy-pocket-deck">
                <i class="fa-solid fa-copy me-1"></i> Copy Pocket Deck Notes
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Add Custom Question Modal -->
      <div class="modal fade" id="addCustomQuestionModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content bg-dark border-secondary border-opacity-50 text-white">
            <div class="modal-header border-secondary border-opacity-25">
              <h5 class="modal-title fs-6"><i class="fa-solid fa-plus text-primary me-2"></i>Add Custom Reverse Question</h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <div class="mb-2">
                <label class="form-label fs-8 text-secondary">Question</label>
                <textarea id="modal-rev-q" class="form-control bg-black text-white border-secondary border-opacity-50 fs-8" rows="2" placeholder="e.g. How does the engineering org handle remote asynchronous communication?"></textarea>
              </div>
              <div class="row g-2 mb-2">
                <div class="col-6">
                  <label class="form-label fs-8 text-secondary">Target Role</label>
                  <select id="modal-rev-role" class="form-select form-select-sm bg-black text-white border-secondary border-opacity-50">
                    <option value="Peer Engineer">Peer Engineer</option>
                    <option value="Engineering Manager">Engineering Manager</option>
                    <option value="Director / VP">Director / VP</option>
                  </select>
                </div>
                <div class="col-6">
                  <label class="form-label fs-8 text-secondary">Category</label>
                  <input type="text" id="modal-rev-cat" class="form-control form-control-sm bg-black text-white border-secondary border-opacity-50" placeholder="e.g. Remote Culture">
                </div>
              </div>
              <div class="mb-2">
                <label class="form-label fs-8 text-secondary">Strategic Rationale (Why ask this?)</label>
                <input type="text" id="modal-rev-why" class="form-control form-control-sm bg-black text-white border-secondary border-opacity-50" placeholder="e.g. Checks for asynchronous documentation standards">
              </div>
            </div>
            <div class="modal-footer border-secondary border-opacity-25">
              <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-primary btn-sm" id="btn-save-custom-rev-q">Add to Catalog</button>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  window.bindReverseInterviewEvents = () => {
    function refreshDeckView() {
      let savedDeck = [];
      let customQuestions = [];
      try {
        savedDeck = JSON.parse(localStorage.getItem('prepspace_reverse_deck') || '[]');
        customQuestions = JSON.parse(localStorage.getItem('prepspace_reverse_custom') || '[]');
      } catch(e) {}

      const all = [...REVERSE_QUESTIONS, ...customQuestions];
      const countEl = document.getElementById('pocket-deck-count');
      if (countEl) countEl.textContent = savedDeck.length;

      const container = document.getElementById('saved-deck-container');
      if (container) {
        if (savedDeck.length === 0) {
          container.innerHTML = '<div class="text-center py-4 text-muted fs-8 font-monospace">No questions starred yet.<br>Click the star on any card to add it to your pocket deck.</div>';
        } else {
          container.innerHTML = savedDeck.map(id => {
            const item = all.find(q => q.id === id);
            if (!item) return '';
            return `
              <div class="p-2 bg-black rounded border border-secondary border-opacity-30 fs-8 text-light d-flex justify-content-between align-items-center">
                <span class="text-truncate me-2">"${item.question}"</span>
                <button class="btn btn-sm btn-glass text-danger p-0 px-1 remove-from-deck-btn" data-id="${item.id}"><i class="fa-solid fa-xmark"></i></button>
              </div>
            `;
          }).join('');

          container.querySelectorAll('.remove-from-deck-btn').forEach(b => {
            b.addEventListener('click', () => {
              const id = b.getAttribute('data-id');
              let deck = JSON.parse(localStorage.getItem('prepspace_reverse_deck') || '[]');
              deck = deck.filter(i => i !== id);
              localStorage.setItem('prepspace_reverse_deck', JSON.stringify(deck));
              // update star button
              const starBtn = document.querySelector(`.toggle-deck-btn[data-id="${id}"]`);
              if (starBtn) {
                starBtn.classList.remove('active');
                starBtn.innerHTML = '<i class="fa-regular fa-star text-muted"></i>';
              }
              refreshDeckView();
            });
          });
        }
      }
    }

    document.querySelectorAll('.toggle-deck-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        let deck = JSON.parse(localStorage.getItem('prepspace_reverse_deck') || '[]');
        if (deck.includes(id)) {
          deck = deck.filter(item => item !== id);
          btn.classList.remove('active');
          btn.innerHTML = '<i class="fa-regular fa-star text-muted"></i>';
          AudioSynth.playChime(550, 440, 0.2);
          safeToast('Removed from Pocket Deck', 'info');
        } else {
          deck.push(id);
          btn.classList.add('active');
          btn.innerHTML = '<i class="fa-solid fa-star text-warning"></i>';
          AudioSynth.playChime(660, 880, 0.25);
          safeToast('Added to Pocket Deck!', 'success');
        }
        localStorage.setItem('prepspace_reverse_deck', JSON.stringify(deck));
        refreshDeckView();
      });
    });

    // Filter Buttons
    document.querySelectorAll('.rev-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.rev-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter').toLowerCase();
        document.querySelectorAll('.reverse-question-card').forEach(card => {
          if (filter === 'all') {
            card.style.display = '';
          } else {
            const role = card.getAttribute('data-role') || '';
            card.style.display = role.includes(filter) ? '' : 'none';
          }
        });
      });
    });

    // Save Custom Question
    const saveCustomBtn = document.getElementById('btn-save-custom-rev-q');
    if (saveCustomBtn) {
      saveCustomBtn.addEventListener('click', () => {
        const question = document.getElementById('modal-rev-q')?.value;
        const role = document.getElementById('modal-rev-role')?.value || 'Peer Engineer';
        const category = document.getElementById('modal-rev-cat')?.value || 'Custom Question';
        const whyItWorks = document.getElementById('modal-rev-why')?.value || 'Tailored personal question';

        if (!question) {
          safeToast('Please enter the question text', 'warning');
          return;
        }

        let customList = [];
        try {
          customList = JSON.parse(localStorage.getItem('prepspace_reverse_custom') || '[]');
        } catch(e) {}

        customList.unshift({
          id: 'custom-rev-' + Date.now(),
          category, role, badgeColor: 'info',
          question, whyItWorks
        });

        localStorage.setItem('prepspace_reverse_custom', JSON.stringify(customList));

        const modalEl = document.getElementById('addCustomQuestionModal');
        if (modalEl && window.bootstrap) {
          const m = bootstrap.Modal.getInstance(modalEl);
          if (m) m.hide();
        }

        AudioSynth.playChime(523, 784, 0.3);
        safeToast('Custom question added to your catalog!', 'success');

        const mount = document.getElementById('page-mount');
        if (mount) {
          mount.innerHTML = components.reverseInterview();
          bindReverseInterviewEvents();
        }
      });
    }

    const copyDeckBtn = document.getElementById('btn-copy-pocket-deck');
    if (copyDeckBtn) {
      copyDeckBtn.addEventListener('click', () => {
        let deck = JSON.parse(localStorage.getItem('prepspace_reverse_deck') || '[]');
        let custom = JSON.parse(localStorage.getItem('prepspace_reverse_custom') || '[]');
        const all = [...REVERSE_QUESTIONS, ...custom];

        if (deck.length === 0) {
          safeToast('Star at least one question first!', 'warning');
          return;
        }
        const text = deck.map((id, idx) => {
          const item = all.find(q => q.id === id);
          return item ? `${idx + 1}. "${item.question}" (Ask: ${item.role})\n   Why: ${item.whyItWorks}` : '';
        }).filter(Boolean).join('\n\n');

        navigator.clipboard.writeText(text).then(() => {
          AudioSynth.playChime(587, 880, 0.3);
          safeToast('Pocket deck copied to clipboard!', 'success');
        });
      });
    }

    refreshDeckView();
  };

})();
