/**
 * interview-suite.js - PrepSpace Advanced Interview Readiness & Career Accelerator Suite
 * 
 * Features Included:
 * 1. Recruiter Outreach & Cold Email / LinkedIn CRM (#/outreach)
 * 2. STAR Story Vault - Amazon & Google Behavioral Experience Bank (#/star-vault)
 * 3. Peer Mock Exchange Arena with Rubrics & Karma Points (#/peer-mock)
 * 4. 60-Second Feynman Audio Bites with Speech Player (#/audio-bites)
 * 5. Emergency 60-Minute Pre-Interview Booster & Box Breathing Guide (#/interview-booster)
 * 6. Reverse Interview Kit - High-Impact Questions for Interviewers (#/reverse-interview)
 * 
 * Author: PrepSpace Engineering / Nagesh Methre
 * Version: 4.4.0
 */

(function() {
  'use strict';

  window.components = window.components || {};

  // =========================================================================
  // 1. RECRUITER OUTREACH & COLD EMAIL / LINKEDIN CRM (#/outreach)
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
            <p class="text-muted fs-8 mb-0 mt-1">Craft high-converting LinkedIn connection notes, cold InMails, and track your referral pipeline.</p>
          </div>
          <div class="d-flex gap-2">
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
              <small class="text-muted fs-9">Tracked prospects</small>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="bento-card p-3">
              <span class="stat-label">Response Rate</span>
              <div class="stat-num text-success">${stats.total ? Math.round(((stats.connected + stats.calls + stats.referrals) / stats.total) * 100) : 0}%</div>
              <small class="text-success fs-9"><i class="fa-solid fa-arrow-trend-up me-1"></i>Industry avg: 18%</small>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="bento-card p-3">
              <span class="stat-label">Screening Calls</span>
              <div class="stat-num text-info">${stats.calls}</div>
              <small class="text-info fs-9">Scheduled interviews</small>
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
                <span class="badge bg-dark text-muted border border-secondary border-opacity-30 fs-9">Rule: &lt; 300 chars</span>
              </div>

              <div class="mb-2">
                <label class="form-label text-secondary fs-8 fw-semibold mb-1">Target Company & Role</label>
                <div class="row g-2">
                  <div class="col-6">
                    <input type="text" id="gen-company" class="form-control form-control-sm bg-black text-white border-secondary border-opacity-50" placeholder="e.g. Google, Atlassian" value="Uber">
                  </div>
                  <div class="col-6">
                    <input type="text" id="gen-role" class="form-control form-control-sm bg-black text-white border-secondary border-opacity-50" placeholder="e.g. Backend SDE-1" value="Software Engineer">
                  </div>
                </div>
              </div>

              <div class="mb-2">
                <label class="form-label text-secondary fs-8 fw-semibold mb-1">Prospect Name & Target Type</label>
                <div class="row g-2">
                  <div class="col-6">
                    <input type="text" id="gen-name" class="form-control form-control-sm bg-black text-white border-secondary border-opacity-50" placeholder="e.g. Alex Rivera" value="Alex">
                  </div>
                  <div class="col-6">
                    <select id="gen-type" class="form-select form-select-sm bg-black text-white border-secondary border-opacity-50">
                      <option value="recruiter">Technical Recruiter</option>
                      <option value="manager" selected>Engineering Manager</option>
                      <option value="alumni">College / Work Alumni</option>
                      <option value="peer">Senior Peer Engineer</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="mb-2">
                <label class="form-label text-secondary fs-8 fw-semibold mb-1">Key Tech Stack or Project Hook</label>
                <input type="text" id="gen-hook" class="form-control form-control-sm bg-black text-white border-secondary border-opacity-50" placeholder="e.g. Kafka stream processing, Spring Boot 3" value="high-throughput microservices in Java & Redis">
              </div>

              <div class="mb-3">
                <label class="form-label text-secondary fs-8 fw-semibold mb-1">Template Format</label>
                <div class="btn-group w-100" role="group" id="outreach-format-group">
                  <input type="radio" class="btn-check" name="outreach-fmt" id="fmt-linkedin" value="linkedin" checked>
                  <label class="btn btn-sm btn-outline-secondary fs-9" for="fmt-linkedin">LinkedIn Note (290c)</label>

                  <input type="radio" class="btn-check" name="outreach-fmt" id="fmt-email" value="email">
                  <label class="btn btn-sm btn-outline-secondary fs-9" for="fmt-email">Cold InMail / Email</label>

                  <input type="radio" class="btn-check" name="outreach-fmt" id="fmt-followup" value="followup">
                  <label class="btn btn-sm btn-outline-secondary fs-9" for="fmt-followup">Day-3 Followup</label>
                </div>
              </div>

              <!-- Output Box -->
              <div class="position-relative mb-3">
                <textarea id="gen-output" class="form-control bg-black text-white border-secondary border-opacity-50 p-2.5 fs-8 font-monospace" rows="5" readonly></textarea>
                <div class="d-flex justify-content-between align-items-center mt-1">
                  <span class="fs-9 text-muted font-monospace" id="gen-char-count">0 / 300 characters</span>
                  <button class="btn btn-sm btn-primary py-1 px-2 fs-9" id="btn-copy-outreach"><i class="fa-solid fa-copy me-1"></i> Copy Note</button>
                </div>
              </div>

              <div class="d-flex gap-2">
                <button class="btn btn-outline-info btn-sm flex-grow-1" id="btn-regenerate-outreach"><i class="fa-solid fa-arrows-rotate me-1"></i> Regenerate Variant</button>
                <button class="btn btn-outline-light btn-sm" id="btn-save-as-contact"><i class="fa-solid fa-floppy-disk me-1"></i> Log as Prospect</button>
              </div>
            </div>
          </div>

          <!-- Right: Pipeline Table -->
          <div class="col-12 col-xl-7">
            <div class="card bg-dark bg-opacity-60 border-secondary border-opacity-25 rounded-3 p-3 p-md-4 shadow-sm h-100">
              <div class="d-flex align-items-center justify-content-between mb-3">
                <h6 class="text-white fw-bold m-0 fs-7"><i class="fa-solid fa-address-book text-primary me-2"></i>Active Outreach Pipeline</h6>
                <div class="d-flex align-items-center gap-2">
                  <input type="text" id="filter-outreach" class="form-control form-control-sm bg-black text-white border-secondary border-opacity-50" placeholder="Filter company..." style="width: 150px;">
                </div>
              </div>

              <div class="table-responsive">
                <table class="table table-dark table-hover align-middle border-secondary border-opacity-25 fs-8 mb-0" id="outreach-table">
                  <thead>
                    <tr class="text-secondary border-bottom border-secondary border-opacity-25">
                      <th>Contact & Company</th>
                      <th>Role & Type</th>
                      <th>Status</th>
                      <th>Contacted</th>
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
                            <option value="rejected" ${item.status === 'rejected' ? 'selected' : ''}>❌ No Response</option>
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
              <h5 class="modal-title fs-6"><i class="fa-solid fa-user-plus text-primary me-2"></i>Log Outreach Prospect</h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <div class="mb-2">
                <label class="form-label fs-8 text-secondary">Contact Name</label>
                <input type="text" id="modal-c-name" class="form-control form-control-sm bg-black text-white border-secondary border-opacity-50" required>
              </div>
              <div class="mb-2">
                <label class="form-label fs-8 text-secondary">Target Company</label>
                <input type="text" id="modal-c-company" class="form-control form-control-sm bg-black text-white border-secondary border-opacity-50" required>
              </div>
              <div class="mb-2">
                <label class="form-label fs-8 text-secondary">Target Job Role</label>
                <input type="text" id="modal-c-role" class="form-control form-control-sm bg-black text-white border-secondary border-opacity-50" required>
              </div>
              <div class="mb-2">
                <label class="form-label fs-8 text-secondary">Contact Category</label>
                <select id="modal-c-type" class="form-select form-select-sm bg-black text-white border-secondary border-opacity-50">
                  <option value="Technical Recruiter">Technical Recruiter</option>
                  <option value="Engineering Manager">Engineering Manager</option>
                  <option value="Senior Peer (Referral)">Senior Peer (Referral)</option>
                  <option value="Alumni Connection">Alumni Connection</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label fs-8 text-secondary">Initial Pitch Message (Optional)</label>
                <textarea id="modal-c-message" class="form-control bg-black text-white border-secondary border-opacity-50 fs-8" rows="3"></textarea>
              </div>
            </div>
            <div class="modal-footer border-secondary border-opacity-25">
              <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-primary btn-sm" id="btn-save-modal-contact">Save Prospect</button>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  window.bindOutreachCrmEvents = () => {
    const compInput = document.getElementById('gen-company');
    const roleInput = document.getElementById('gen-role');
    const nameInput = document.getElementById('gen-name');
    const typeSelect = document.getElementById('gen-type');
    const hookInput = document.getElementById('gen-hook');
    const outputArea = document.getElementById('gen-output');
    const charCountEl = document.getElementById('gen-char-count');
    const copyBtn = document.getElementById('btn-copy-outreach');
    const regenBtn = document.getElementById('btn-regenerate-outreach');
    const saveContactBtn = document.getElementById('btn-save-as-contact');
    const filterInput = document.getElementById('filter-outreach');

    function generatePitch() {
      const company = (compInput?.value || 'the company').trim();
      const role = (roleInput?.value || 'Software Engineer').trim();
      const name = (nameInput?.value || 'there').trim();
      const type = typeSelect?.value || 'manager';
      const hook = (hookInput?.value || 'high-performance systems').trim();
      const fmt = document.querySelector('input[name="outreach-fmt"]:checked')?.value || 'linkedin';

      let text = '';
      if (fmt === 'linkedin') {
        if (type === 'recruiter') {
          text = `Hi ${name}, saw you hire tech talent at ${company}. With proven experience in ${hook}, I'd love to connect regarding ${role} opportunities. Sharing my portfolio: stream-in.app/#/profile`;
        } else if (type === 'manager') {
          text = `Hi ${name}, really admire ${company}'s engineering work. Built production services using ${hook} & would love to connect to follow your team's work as you scale ${role} roles.`;
        } else if (type === 'alumni') {
          text = `Hey ${name}, great to connect with a fellow alumni at ${company}! I'm an engineer specializing in ${hook}. Would love to connect and follow your journey in tech.`;
        } else {
          text = `Hi ${name}, loved your recent insights on ${company}'s architecture. Specializing in ${hook} myself—would be glad to connect and stay in touch with your engineering team.`;
        }
      } else if (fmt === 'email') {
        text = `Subject: ${role} Inquiry - ${hook}\n\nHi ${name},\n\nI’ve been following ${company}'s engineering milestones, particularly around your tech stack.\n\nOver the past 2+ years, I’ve specialized in ${hook}, reducing latency and delivering production reliability. I noticed your team is expanding and would love to explore if my technical background aligns with upcoming ${role} openings.\n\nOpen to a brief 10-minute chat this week?\n\nBest,\nCandidate | stream-in.app`;
      } else {
        text = `Hi ${name},\n\nHope your week is going great! Just floating this to the top of your inbox in case it got buried. Still very interested in contributing to ${company}'s engineering initiatives around ${hook}.\n\nLooking forward to hearing from you,\nCandidate`;
      }

      if (outputArea) outputArea.value = text;
      if (charCountEl) {
        charCountEl.textContent = `${text.length} / 300 characters`;
        charCountEl.className = text.length <= 300 ? 'fs-9 text-success font-monospace' : 'fs-9 text-danger font-monospace fw-bold';
      }
    }

    [compInput, roleInput, nameInput, typeSelect, hookInput].forEach(el => {
      if (el) el.addEventListener('input', generatePitch);
    });
    document.querySelectorAll('input[name="outreach-fmt"]').forEach(r => {
      r.addEventListener('change', generatePitch);
    });

    if (regenBtn) regenBtn.addEventListener('click', generatePitch);
    generatePitch();

    if (copyBtn && outputArea) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(outputArea.value).then(() => {
          showToast('Message copied to clipboard!', 'success');
        });
      });
    }

    function saveProspect(contactObj) {
      let items = [];
      try {
        items = JSON.parse(localStorage.getItem('prepspace_outreach_crm')) || DEFAULT_OUTREACH_ITEMS;
      } catch(e) {
        items = DEFAULT_OUTREACH_ITEMS;
      }
      items.unshift(contactObj);
      localStorage.setItem('prepspace_outreach_crm', JSON.stringify(items));
      showToast(`Prospect ${contactObj.name} logged into pipeline!`, 'success');
      const pageMount = document.getElementById('page-mount');
      if (pageMount) pageMount.innerHTML = components.outreachCrm();
      bindOutreachCrmEvents();
    }

    if (saveContactBtn) {
      saveContactBtn.addEventListener('click', () => {
        const contactObj = {
          id: 'outreach-' + Date.now(),
          name: nameInput?.value.trim() || 'New Contact',
          company: compInput?.value.trim() || 'Tech Company',
          role: roleInput?.value.trim() || 'Software Engineer',
          type: typeSelect?.options[typeSelect.selectedIndex]?.text || 'Recruiter',
          status: 'note_sent',
          date: new Date().toISOString().split('T')[0],
          notes: 'Generated via PrepSpace Pitch Assistant.',
          lastMessage: outputArea?.value || ''
        };
        saveProspect(contactObj);
      });
    }

    const saveModalBtn = document.getElementById('btn-save-modal-contact');
    if (saveModalBtn) {
      saveModalBtn.addEventListener('click', () => {
        const mName = document.getElementById('modal-c-name')?.value.trim();
        const mComp = document.getElementById('modal-c-company')?.value.trim();
        const mRole = document.getElementById('modal-c-role')?.value.trim();
        const mType = document.getElementById('modal-c-type')?.value;
        const mMsg = document.getElementById('modal-c-message')?.value.trim();

        if (!mName || !mComp) {
          showToast('Please enter both name and company', 'warning');
          return;
        }

        const contactObj = {
          id: 'outreach-' + Date.now(),
          name: mName,
          company: mComp,
          role: mRole || 'Software Engineer',
          type: mType,
          status: 'note_sent',
          date: new Date().toISOString().split('T')[0],
          notes: 'Manually logged prospect.',
          lastMessage: mMsg
        };

        const modalEl = document.getElementById('addContactModal');
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();
        saveProspect(contactObj);
      });
    }

    document.querySelectorAll('.outreach-status-select').forEach(sel => {
      sel.addEventListener('change', (e) => {
        const id = e.target.getAttribute('data-id');
        const newStatus = e.target.value;
        let items = JSON.parse(localStorage.getItem('prepspace_outreach_crm')) || DEFAULT_OUTREACH_ITEMS;
        const found = items.find(i => i.id === id);
        if (found) {
          found.status = newStatus;
          localStorage.setItem('prepspace_outreach_crm', JSON.stringify(items));
          showToast('Status updated to ' + newStatus.replace('_', ' '), 'info');
        }
      });
    });

    document.querySelectorAll('.delete-outreach-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        if (confirm('Remove this prospect from your pipeline?')) {
          let items = JSON.parse(localStorage.getItem('prepspace_outreach_crm')) || DEFAULT_OUTREACH_ITEMS;
          items = items.filter(i => i.id !== id);
          localStorage.setItem('prepspace_outreach_crm', JSON.stringify(items));
          showToast('Prospect removed', 'info');
          const row = btn.closest('tr');
          if (row) row.remove();
        }
      });
    });

    document.querySelectorAll('.view-outreach-note').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        let items = JSON.parse(localStorage.getItem('prepspace_outreach_crm')) || DEFAULT_OUTREACH_ITEMS;
        const found = items.find(i => i.id === id);
        if (found && found.lastMessage) {
          alert(`Message Sent to ${found.name} (${found.company}):\n\n` + found.lastMessage);
        } else {
          showToast('No saved message snippet for this contact', 'info');
        }
      });
    });

    if (filterInput) {
      filterInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        document.querySelectorAll('#outreach-table-body tr').forEach(row => {
          row.style.display = row.textContent.toLowerCase().includes(query) ? '' : 'none';
        });
      });
    }
  };

  // =========================================================================
  // 2. STAR STORY VAULT - BEHAVIORAL EXPERIENCE BANK (#/star-vault)
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
              <div class="card bg-dark bg-opacity-70 border-secondary border-opacity-30 rounded-3 p-3 p-md-4 h-100 shadow-sm">
                <div class="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <span class="badge bg-secondary bg-opacity-25 text-info border border-secondary border-opacity-30 font-monospace fs-9 me-1">STORY #${idx + 1}</span>
                    <span class="text-muted fs-9 font-monospace">&bull; ${story.company || 'Tech Project'}</span>
                    <h5 class="text-white fw-bold fs-6 mt-1 mb-2">${story.title}</h5>
                  </div>
                  <div class="dropdown">
                    <button class="btn btn-glass btn-sm p-1 px-2 text-muted" data-bs-toggle="dropdown"><i class="fa-solid fa-ellipsis-vertical"></i></button>
                    <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end shadow">
                      <li><button class="dropdown-item fs-8 text-danger delete-star-story" data-id="${story.id}"><i class="fa-solid fa-trash me-2"></i>Delete Story</button></li>
                    </ul>
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

                ${story.metrics ? `
                  <div class="mt-auto pt-2 border-top border-secondary border-opacity-20 d-flex justify-content-between align-items-center">
                    <small class="text-muted fs-9 font-monospace"><i class="fa-solid fa-chart-line text-success me-1"></i>Impact Metric:</small>
                    <span class="text-success fw-bold font-monospace fs-9">${story.metrics}</span>
                  </div>
                ` : ''}
              </div>
            </div>
          `).join('')}
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

    const saveStoryBtn = document.getElementById('btn-save-star-story');
    if (saveStoryBtn) {
      saveStoryBtn.addEventListener('click', () => {
        const title = document.getElementById('modal-s-title')?.value.trim();
        const company = document.getElementById('modal-s-company')?.value.trim() || 'Tech Experience';
        const principlesStr = document.getElementById('modal-s-principles')?.value.trim() || 'Ownership';
        const situation = document.getElementById('modal-s-situation')?.value.trim();
        const task = document.getElementById('modal-s-task')?.value.trim();
        const action = document.getElementById('modal-s-action')?.value.trim();
        const result = document.getElementById('modal-s-result')?.value.trim();
        const metrics = document.getElementById('modal-s-metrics')?.value.trim();

        if (!title || !situation || !action) {
          showToast('Please fill out at least Title, Situation, and Action.', 'warning');
          return;
        }

        const newStory = {
          id: 'star-' + Date.now(),
          title,
          company,
          principles: principlesStr.split(',').map(s => s.trim()).filter(Boolean),
          situation,
          task,
          action,
          result,
          metrics
        };

        let stories = [];
        try {
          stories = JSON.parse(localStorage.getItem('prepspace_star_vault')) || DEFAULT_STAR_STORIES;
        } catch(e) {
          stories = DEFAULT_STAR_STORIES;
        }
        stories.unshift(newStory);
        localStorage.setItem('prepspace_star_vault', JSON.stringify(stories));

        const modalEl = document.getElementById('newStoryModal');
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();

        showToast('Story added to STAR Vault!', 'success');
        const pageMount = document.getElementById('page-mount');
        if (pageMount) pageMount.innerHTML = components.starVault();
        bindStarVaultEvents();
      });
    }

    document.querySelectorAll('.delete-star-story').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        if (confirm('Delete this story from your vault?')) {
          let stories = JSON.parse(localStorage.getItem('prepspace_star_vault')) || DEFAULT_STAR_STORIES;
          stories = stories.filter(s => s.id !== id);
          localStorage.setItem('prepspace_star_vault', JSON.stringify(stories));
          showToast('Story deleted', 'info');
          const pageMount = document.getElementById('page-mount');
          if (pageMount) pageMount.innerHTML = components.starVault();
          bindStarVaultEvents();
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
        { name: 'React Component Architecture', weight: 20 }
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
                <span><i class="fa-solid fa-shield-halved text-success me-1"></i>All rubrics stored locally in your telemetry profile.</span>
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
              <div class="d-flex align-items-center gap-3">
                <div class="font-monospace fs-5 fw-extrabold text-warning bg-black px-3 py-1 rounded border border-warning border-opacity-50" id="arena-timer">30:00</div>
                <button class="btn btn-outline-danger btn-sm" id="btn-end-mock-session"><i class="fa-solid fa-stop me-1"></i> Finish Round</button>
              </div>
            </div>
          </div>

          <div class="row g-3">
            <div class="col-12 col-lg-6">
              <div class="card bg-dark bg-opacity-70 border-secondary border-opacity-30 rounded-3 p-3 p-md-4 h-100">
                <h6 class="text-info fw-bold mb-2 fs-7"><i class="fa-solid fa-file-lines me-2"></i>Problem Specification</h6>
                <p class="fs-8 text-light mb-3" id="arena-description">Loading...</p>

                <div class="mb-3">
                  <div class="text-warning fs-8 fw-bold mb-1"><i class="fa-solid fa-lightbulb me-1"></i>Interviewer Hints to Guide Candidate:</div>
                  <div class="p-2 bg-black rounded border border-secondary border-opacity-30 fs-8 text-secondary" id="arena-hints"></div>
                </div>

                <div class="mt-4 pt-3 border-top border-secondary border-opacity-25">
                  <h6 class="text-white fw-bold mb-2 fs-7"><i class="fa-solid fa-square-check text-success me-2"></i>Interviewer Official Scoring Rubric</h6>
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

                  <button class="btn btn-success btn-sm w-100 py-2" id="btn-submit-rubric">
                    <i class="fa-solid fa-check-double me-1"></i> Submit Scorecard & Claim +50 Karma
                  </button>
                </div>
              </div>
            </div>

            <div class="col-12 col-lg-6">
              <div class="card bg-dark bg-opacity-70 border-secondary border-opacity-30 rounded-3 p-3 p-md-4 h-100 d-flex flex-column">
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <span class="fs-8 text-white fw-semibold"><i class="fa-solid fa-code text-primary me-2"></i>Candidate Code & Architecture Scratchpad</span>
                  <span class="badge bg-secondary font-monospace fs-9">Monaco Plain / Raw Mode</span>
                </div>
                <textarea id="arena-code-editor" class="form-control bg-black text-white font-monospace fs-8 p-3 flex-grow-1 border-secondary border-opacity-40" rows="18" placeholder="// Candidate types code, architectural schemas, and trade-offs here live..."></textarea>
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

    const startBtn = document.getElementById('btn-start-mock-session');
    const endBtn = document.getElementById('btn-end-mock-session');
    const submitRubricBtn = document.getElementById('btn-submit-rubric');
    const qSelect = document.getElementById('mock-select-question');

    if (startBtn) {
      startBtn.addEventListener('click', () => {
        const qId = qSelect ? qSelect.value : 'mock-q-1';
        const question = MOCK_QUESTIONS.find(q => q.id === qId) || MOCK_QUESTIONS[0];

        document.getElementById('mock-setup-container').style.display = 'none';
        document.getElementById('mock-arena-active').style.display = 'block';

        document.getElementById('arena-title').textContent = `${question.domain}: ${question.title}`;
        document.getElementById('arena-description').textContent = question.description;
        document.getElementById('arena-hints').innerHTML = question.hints.map(h => `<div class="mb-1">&bull; ${h}</div>`).join('');

        const rubricContainer = document.getElementById('arena-rubric-items');
        if (rubricContainer) {
          rubricContainer.innerHTML = question.rubricItems.map((r, i) => `
            <div class="d-flex justify-content-between align-items-center p-2 rounded bg-black bg-opacity-40 border border-secondary border-opacity-25 fs-8">
              <span class="text-light">${r.name} (${r.weight}%)</span>
              <div class="btn-group btn-group-sm" role="group">
                <input type="radio" class="btn-check" name="rubric-score-${i}" id="sc-${i}-1" value="1">
                <label class="btn btn-outline-secondary fs-9" for="sc-${i}-1">1</label>
                <input type="radio" class="btn-check" name="rubric-score-${i}" id="sc-${i}-2" value="2">
                <label class="btn btn-outline-secondary fs-9" for="sc-${i}-2">2</label>
                <input type="radio" class="btn-check" name="rubric-score-${i}" id="sc-${i}-3" value="3" checked>
                <label class="btn btn-outline-secondary fs-9" for="sc-${i}-3">3</label>
                <input type="radio" class="btn-check" name="rubric-score-${i}" id="sc-${i}-4" value="4">
                <label class="btn btn-outline-secondary fs-9" for="sc-${i}-4">4</label>
                <input type="radio" class="btn-check" name="rubric-score-${i}" id="sc-${i}-5" value="5">
                <label class="btn btn-outline-secondary fs-9" for="sc-${i}-5">5</label>
              </div>
            </div>
          `).join('');
        }

        secondsLeft = 1800;
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
          secondsLeft--;
          if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            showToast('Time is up for this 30-minute round!', 'warning');
          }
          const m = Math.floor(secondsLeft / 60).toString().padStart(2, '0');
          const s = (secondsLeft % 60).toString().padStart(2, '0');
          const timerEl = document.getElementById('arena-timer');
          if (timerEl) timerEl.textContent = `${m}:${s}`;
        }, 1000);
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
        showToast(`Scorecard submitted! Recommendation: ${rec}. Awarded +50 Karma!`, 'success');

        const karmaDisp = document.getElementById('peer-karma-display');
        if (karmaDisp) karmaDisp.textContent = karma + ' pts';

        exitArena();
      });
    }
  };

  // =========================================================================
  // 4. 60-SECOND FEYNMAN AUDIO BITES (#/audio-bites)
  // =========================================================================

  const AUDIO_BITES_DATA = [
    {
      id: 'bite-1',
      title: 'CAP Theorem in 60 Seconds: The Bank Teller Analogy',
      category: 'Distributed Systems',
      duration: '60s',
      analogy: 'Imagine two bank branches in different cities that lose their phone line connection.',
      script: 'The CAP theorem states that in any distributed data store, when a network partition happens—meaning nodes cannot communicate—you must choose between Consistency and Availability. Imagine two bank branches in New York and London. Suddenly, the transatlantic cable is severed. A customer walks into New York and deposits 500 dollars. Now, another customer walks into London and asks for the total balance. If London refuses to answer until the cable is fixed, that is Consistency over Availability. If London gives the old balance anyway to stay responsive, that is Availability over Consistency. You cannot have both in a partitioned world.'
    },
    {
      id: 'bite-2',
      title: 'B-Tree vs LSM Tree: The Phonebook vs The Receipt Spike',
      category: 'Database Engines',
      duration: '75s',
      analogy: 'A carefully indexed physical phonebook versus a spike where receipts are impaled.',
      script: 'Why do traditional databases like Postgres use B-Trees, while high-write databases like Cassandra, RocksDB, and Kafka use Log-Structured Merge Trees? A B-Tree is like a printed phonebook. Reading anyones number is fast because pages are in sorted order, but inserting a new name requires erasing and re-shifting entries on disk, which causes slow random disk I/O. An LSM Tree is like a receipt spike at a diner. When an order happens, you just impale the receipt on top with zero hesitation—that is an append-only sequential write, which is blazingly fast. Later, in the background, a worker sorts and merges those receipts into structured files. B-Trees optimize for reads; LSM trees optimize for furious write throughput.'
    },
    {
      id: 'bite-3',
      title: 'TCP 3-Way Handshake: The Walkie-Talkie Protocol',
      category: 'Networking',
      duration: '50s',
      analogy: 'SYN, SYN-ACK, ACK explained like pilots communicating over radio.',
      script: 'Before a browser can send a single byte of HTTP data over TCP, it performs the 3-way handshake. Think of two pilots over radio. Pilot A says: Tower, can you hear me? SYN. The tower replies: Loud and clear Pilot A, can you hear me? SYN-ACK. Pilot A responds: Copy that Tower, connection established, sending flight plan: ACK. Only after this confirmation can full-duplex reliable byte transmission begin. This is why TCP has an initial 1-Round-Trip-Time latency penalty before data flows.'
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
    }
  ];

  components.feynmanAudio = () => {
    return `
      <div class="container-fluid px-3 px-md-4 py-3">
        <!-- Header -->
        <div class="d-flex flex-wrap justify-content-between align-items-center mb-4 pb-2 border-bottom border-secondary border-opacity-15 gap-2">
          <div>
            <div class="d-flex align-items-center gap-2">
              <span class="badge bg-info bg-opacity-25 text-info border border-info border-opacity-50 font-monospace fs-9">COMMUTE & AUDIO LEARNING</span>
              <h4 class="text-white fw-bold m-0 fs-5">60-Second Feynman Audio Bites</h4>
            </div>
            <p class="text-muted fs-8 mb-0 mt-1">Master complex distributed systems, database internals, and OS concepts in 60 seconds using intuitive analogies.</p>
          </div>
          <div class="d-flex align-items-center gap-2">
            <span class="badge bg-dark border border-secondary border-opacity-30 text-white font-monospace"><i class="fa-solid fa-bolt text-warning me-1"></i>Zero Latency Native Speech</span>
          </div>
        </div>

        <div class="card bg-dark border-primary border-opacity-40 rounded-3 p-3 mb-4 shadow" id="master-audio-player">
          <div class="d-flex flex-wrap align-items-center justify-content-between gap-3">
            <div class="d-flex align-items-center gap-3">
              <button class="btn btn-primary rounded-circle d-flex align-items-center justify-content-center" id="btn-audio-play-pause" style="width: 48px; height: 48px;">
                <i class="fa-solid fa-play fs-6" id="icon-play-state"></i>
              </button>
              <div>
                <span class="badge bg-primary bg-opacity-20 text-info font-monospace fs-9" id="player-category">SELECT A LESSON</span>
                <h5 class="text-white fw-bold fs-7 m-0 mt-0.5" id="player-title">Click any concept card below to begin audio playback</h5>
              </div>
            </div>

            <div class="d-flex align-items-center gap-1 audio-waveform-container" id="audio-waveform-bars">
              <span class="audio-bar"></span>
              <span class="audio-bar"></span>
              <span class="audio-bar"></span>
              <span class="audio-bar"></span>
              <span class="audio-bar"></span>
              <span class="audio-bar"></span>
              <span class="audio-bar"></span>
            </div>

            <div class="d-flex align-items-center gap-2">
              <button class="btn btn-sm btn-glass text-secondary" id="btn-audio-rewind" title="Rewind 10s"><i class="fa-solid fa-rotate-left"></i> 10s</button>
              <div class="dropdown">
                <button class="btn btn-sm btn-glass text-white font-monospace dropdown-toggle" data-bs-toggle="dropdown" id="btn-audio-speed">1.0x</button>
                <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end shadow fs-9">
                  <li><button class="dropdown-item speed-opt" data-speed="1.0">1.0x Normal</button></li>
                  <li><button class="dropdown-item speed-opt" data-speed="1.25">1.25x Recommended</button></li>
                  <li><button class="dropdown-item speed-opt" data-speed="1.5">1.5x Brisk</button></li>
                  <li><button class="dropdown-item speed-opt" data-speed="1.75">1.75x Rapid</button></li>
                </ul>
              </div>
            </div>
          </div>

          <div class="mt-3 pt-2 border-top border-secondary border-opacity-20">
            <p class="fs-8 text-light mb-0 font-monospace" id="player-transcript" style="line-height: 1.7; opacity: 0.85;">
              Transcript will display here in real-time as the lesson is narrated.
            </p>
          </div>
        </div>

        <div class="row g-3">
          ${AUDIO_BITES_DATA.map((bite, i) => `
            <div class="col-12 col-md-6 col-xl-4">
              <div class="card bg-dark bg-opacity-70 border-secondary border-opacity-30 rounded-3 p-3 h-100 shadow-sm feynman-card" data-id="${bite.id}">
                <div class="d-flex justify-content-between align-items-start mb-2">
                  <span class="badge bg-secondary bg-opacity-25 text-info border border-secondary border-opacity-20 font-monospace fs-9">${bite.category}</span>
                  <span class="text-muted font-monospace fs-9"><i class="fa-regular fa-clock me-1"></i>${bite.duration}</span>
                </div>
                <h6 class="text-white fw-bold fs-7 mb-2">${bite.title}</h6>
                <div class="p-2 bg-black bg-opacity-40 rounded border-start border-2 border-warning mb-3">
                  <span class="fs-9 text-warning font-monospace d-block">Analogy:</span>
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

    const playPauseBtn = document.getElementById('btn-audio-play-pause');
    const playIcon = document.getElementById('icon-play-state');
    const titleEl = document.getElementById('player-title');
    const catEl = document.getElementById('player-category');
    const transcriptEl = document.getElementById('player-transcript');
    const waveformEl = document.getElementById('audio-waveform-bars');

    function stopPlayback() {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      isPlaying = false;
      if (playIcon) playIcon.className = 'fa-solid fa-play fs-6';
      if (waveformEl) waveformEl.classList.remove('active');
    }

    function startPlayback(bite) {
      stopPlayback();
      currentBite = bite;

      if (titleEl) titleEl.textContent = bite.title;
      if (catEl) catEl.textContent = bite.category;
      if (transcriptEl) transcriptEl.textContent = `"${bite.script}"`;

      if (!window.speechSynthesis) {
        showToast('Speech synthesis not supported on this browser', 'warning');
        return;
      }

      currentUtterance = new SpeechSynthesisUtterance(bite.script);
      currentUtterance.rate = currentSpeed;
      currentUtterance.pitch = 1.0;

      currentUtterance.onstart = () => {
        isPlaying = true;
        if (playIcon) playIcon.className = 'fa-solid fa-pause fs-6';
        if (waveformEl) waveformEl.classList.add('active');
      };

      currentUtterance.onend = () => {
        stopPlayback();
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

    document.querySelectorAll('.copy-bite-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const bite = AUDIO_BITES_DATA.find(b => b.id === id);
        if (bite) {
          navigator.clipboard.writeText(`${bite.title}\n\nAnalogy: ${bite.analogy}\n\n${bite.script}`).then(() => {
            showToast('Feynman summary copied to clipboard!', 'info');
          });
        }
      });
    });

    document.querySelectorAll('.speed-opt').forEach(opt => {
      opt.addEventListener('click', () => {
        const spd = parseFloat(opt.getAttribute('data-speed'));
        currentSpeed = spd;
        const speedBtn = document.getElementById('btn-audio-speed');
        if (speedBtn) speedBtn.textContent = spd + 'x';
        if (isPlaying && currentBite) {
          startPlayback(currentBite);
        }
      });
    });
  };

  // =========================================================================
  // 5. EMERGENCY 60-MINUTE PRE-INTERVIEW BOOSTER (#/interview-booster)
  // =========================================================================

  const BOOSTER_DATA = {
    'java': {
      name: 'Java & Spring Boot Core',
      traps: [
        { q: 'Why does overriding equals() require overriding hashCode()?', a: 'Because hash-based collections (HashMap, HashSet) compute the bucket index via hashCode(). If two objects are equal by equals() but have different hashCodes, the collection will store duplicates or fail to find the key.' },
        { q: 'What is the difference between @Transactional(readOnly = true) and standard?', a: 'It hints to the persistence provider (Hibernate) to turn off dirty checking, sets JDBC connection to read-only, and prevents accidental flushes, boosting query throughput by up to 30%.' },
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
        { q: 'What is the difference between Idempotency and Deduplication?', a: 'Idempotency means f(f(x)) = f(x); executing a payment request with idempotency-key 5 times produces the exact same balance as executing it once.' }
      ],
      slips: [
        'Single point of failure (SPOF): Always identify if your Load Balancer or Master DB has a standby replica.',
        'Cache invalidation: "There are only two hard things in Computer Science: cache invalidation and naming things."',
        'Always estimate read-to-write ratio (e.g. Twitter is 100:1 read-heavy; IoT is write-heavy).'
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
            <p class="text-muted fs-8 mb-0 mt-1">High-yield trick questions, mental calming box-breathing, and pre-flight checklist for the last 60 minutes.</p>
          </div>
          <div class="d-flex gap-2">
            <button class="btn btn-outline-light btn-sm" onclick="window.print()"><i class="fa-solid fa-print me-1"></i> Quick Print Sheet</button>
          </div>
        </div>

        <div class="row g-3">
          <div class="col-12 col-xl-7">
            <div class="d-flex gap-2 mb-3">
              <button class="btn btn-sm btn-outline-primary active booster-tab-btn" data-stack="java">Java & Spring Boot</button>
              <button class="btn btn-sm btn-outline-primary booster-tab-btn" data-stack="frontend">React & Frontend</button>
              <button class="btn btn-sm btn-outline-primary booster-tab-btn" data-stack="system_design">System Design</button>
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
            <div class="card bg-dark bg-opacity-70 border-info border-opacity-30 rounded-3 p-3 p-md-4 mb-3 text-center shadow-sm">
              <span class="badge bg-info bg-opacity-20 text-info font-monospace fs-9 mb-2">NEUROSCIENCE PROTOCOL</span>
              <h6 class="text-white fw-bold mb-1 fs-7">2-Minute Box Breathing Widget</h6>
              <p class="text-muted fs-9 mb-3">Lowers cortisol & heart rate before joining the interview call.</p>

              <div class="breathing-circle-wrapper my-3 d-flex align-items-center justify-content-center">
                <div class="breathing-circle d-flex align-items-center justify-content-center" id="breathing-visual">
                  <span class="fs-7 fw-bold text-white font-monospace" id="breathing-text">INHALE (4s)</span>
                </div>
              </div>

              <div class="d-flex justify-content-center gap-2 mt-2">
                <button class="btn btn-sm btn-outline-info px-3" id="btn-toggle-breathing"><i class="fa-solid fa-play me-1"></i> Start 2m Timer</button>
              </div>
            </div>

            <div class="card bg-dark bg-opacity-70 border-secondary border-opacity-30 rounded-3 p-3 p-md-4 shadow-sm">
              <h6 class="text-white fw-bold mb-3 fs-7"><i class="fa-solid fa-clipboard-check text-success me-2"></i>Pre-Flight Checklist (10m Before Call)</h6>
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
                  <input type="checkbox" class="form-check-input mt-0">
                  <span>Reviewed 2 reverse interview questions to ask</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  window.bindInterviewBoosterEvents = () => {
    let currentStack = 'java';

    function renderStack(stackKey) {
      const data = BOOSTER_DATA[stackKey] || BOOSTER_DATA['java'];
      const titleEl = document.getElementById('booster-stack-title');
      const trapsContainer = document.getElementById('booster-traps-container');
      const slipsContainer = document.getElementById('booster-slips-container');

      if (titleEl) titleEl.innerHTML = `<i class="fa-solid fa-triangle-exclamation text-warning me-2"></i>Top Gotchas: ${data.name}`;

      if (trapsContainer) {
        trapsContainer.innerHTML = data.traps.map((t, idx) => `
          <div class="p-2.5 bg-black bg-opacity-50 rounded border border-secondary border-opacity-25">
            <div class="text-info fw-bold fs-8 mb-1">Q: ${t.q}</div>
            <div class="text-light fs-8" style="line-height: 1.6;"><strong>A:</strong> ${t.a}</div>
          </div>
        `).join('');
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

    renderStack(currentStack);

    let breathingInterval = null;
    let step = 0;
    const steps = ['INHALE (4s)', 'HOLD (4s)', 'EXHALE (4s)', 'HOLD (4s)'];
    const breathText = document.getElementById('breathing-text');
    const breathCircle = document.getElementById('breathing-visual');
    const toggleBreathBtn = document.getElementById('btn-toggle-breathing');

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
          if (breathText) breathText.textContent = steps[step];
          breathingInterval = setInterval(() => {
            step = (step + 1) % steps.length;
            if (breathText) breathText.textContent = steps[step];
          }, 4000);
        }
      });
    }
  };

  // =========================================================================
  // 6. REVERSE INTERVIEW KIT ("QUESTIONS TO ASK THE INTERVIEWER") (#/reverse-interview)
  // =========================================================================

  const REVERSE_QUESTIONS = [
    {
      id: 'rev-1',
      category: 'Engineering Culture & Incidents',
      role: 'Manager & Lead',
      badgeColor: 'danger',
      question: 'When a production severity-1 incident happens at 2 AM, what does the blameless post-mortem process look like here?',
      whyItWorks: 'Shows you value psychological safety, system reliability, and post-incident learning rather than toxic finger-pointing.'
    },
    {
      id: 'rev-2',
      category: 'Technical Debt & Architecture',
      role: 'Peer Engineer',
      badgeColor: 'warning',
      question: 'What percentage of sprint capacity does the team realistically allocate to technical debt and refactoring versus new feature requests?',
      whyItWorks: 'Reveals if you will be stuck firefighting legacy spaghetti code or if engineering leadership respects architectural hygiene.'
    },
    {
      id: 'rev-3',
      category: 'Product & Business Growth',
      role: 'Engineering Manager',
      badgeColor: 'primary',
      question: 'What is the single biggest technical bottleneck your team must solve in the next two quarters to meet its roadmap milestones?',
      whyItWorks: 'Immediately frames you as a strategic problem-solver looking to add immediate business value.'
    },
    {
      id: 'rev-4',
      category: 'Excellence & Team Dynamics',
      role: 'Director / VP',
      badgeColor: 'success',
      question: 'Looking at engineers who have joined this team in the past year, what separated those who were merely good from those who were truly exceptional?',
      whyItWorks: 'One of the most memorable questions an executive can be asked. Highlights high ambition and desire for measurable excellence.'
    },
    {
      id: 'rev-5',
      category: 'Mentorship & Career Progression',
      role: 'Peer & Manager',
      badgeColor: 'info',
      question: 'How do architectural proposals and RFCs (Request for Comments) get reviewed between junior developers and staff architects?',
      whyItWorks: 'Shows you care about collaborative design, transparent engineering standards, and career growth.'
    }
  ];

  components.reverseInterview = () => {
    let savedDeck = [];
    try {
      savedDeck = JSON.parse(localStorage.getItem('prepspace_reverse_deck') || '[]');
    } catch(e) {}

    return `
      <div class="container-fluid px-3 px-md-4 py-3">
        <!-- Header -->
        <div class="d-flex flex-wrap justify-content-between align-items-center mb-4 pb-2 border-bottom border-secondary border-opacity-15 gap-2">
          <div>
            <div class="d-flex align-items-center gap-2">
              <span class="badge bg-success bg-opacity-25 text-success border border-success border-opacity-50 font-monospace fs-9">INTERVIEW CLOSING KIT</span>
              <h4 class="text-white fw-bold m-0 fs-5">Reverse Interview Kit ("Questions to Ask Them")</h4>
            </div>
            <p class="text-muted fs-8 mb-0 mt-1">High-caliber questions to ask when the interviewer says: "Do you have any questions for me?"</p>
          </div>
          <div class="d-flex align-items-center gap-2">
            <span class="badge bg-dark border border-secondary border-opacity-30 text-white fs-8">
              <i class="fa-solid fa-bookmark text-warning me-1"></i> Pocket Deck: <strong id="pocket-deck-count" class="text-warning">${savedDeck.length}</strong> Saved
            </span>
          </div>
        </div>

        <div class="row g-3">
          <div class="col-12 col-xl-8">
            <div class="d-flex flex-column gap-3" id="reverse-catalog-container">
              ${REVERSE_QUESTIONS.map(q => {
                const isSaved = savedDeck.includes(q.id);
                return `
                  <div class="card bg-dark bg-opacity-70 border-secondary border-opacity-30 rounded-3 p-3 p-md-4 shadow-sm" data-id="${q.id}">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                      <div class="d-flex align-items-center gap-2">
                        <span class="badge bg-${q.badgeColor} bg-opacity-20 text-${q.badgeColor} border border-${q.badgeColor} border-opacity-30 font-monospace fs-9">${q.category}</span>
                        <span class="text-muted fs-9 font-monospace">&bull; Ask: ${q.role}</span>
                      </div>
                      <button class="btn btn-sm btn-glass text-warning toggle-deck-btn ${isSaved ? 'active' : ''}" data-id="${q.id}">
                        <i class="${isSaved ? 'fa-solid fa-star text-warning' : 'fa-regular fa-star text-muted'}"></i>
                      </button>
                    </div>
                    <h5 class="text-white fw-bold fs-6 mb-2">"${q.question}"</h5>
                    <div class="p-2.5 rounded bg-black bg-opacity-40 border-start border-2 border-${q.badgeColor}">
                      <span class="text-${q.badgeColor} fs-9 font-monospace fw-bold d-block mb-1">Why This Question Wins Offers:</span>
                      <p class="text-secondary fs-8 mb-0" style="line-height: 1.6;">${q.whyItWorks}</p>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <div class="col-12 col-xl-4">
            <div class="card bg-dark bg-opacity-70 border-secondary border-opacity-30 rounded-3 p-3 p-md-4 sticky-top shadow-sm" style="top: 20px;">
              <h6 class="text-white fw-bold mb-2 fs-7"><i class="fa-solid fa-box-archive text-warning me-2"></i>My Interview Pocket Deck</h6>
              <p class="text-muted fs-9 mb-3">Star 2–3 questions to keep on your screen or notepad during the interview.</p>
              
              <div id="saved-deck-container" class="d-flex flex-column gap-2 mb-3">
                ${savedDeck.length === 0 ? `
                  <div class="text-center py-4 text-muted fs-8 font-monospace">No questions starred yet.<br>Click the star icon on any question to add it to your pocket deck.</div>
                ` : savedDeck.map(id => {
                  const item = REVERSE_QUESTIONS.find(q => q.id === id);
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
                <i class="fa-solid fa-copy me-1"></i> Copy Pocket Deck
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  window.bindReverseInterviewEvents = () => {
    document.querySelectorAll('.toggle-deck-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        let deck = JSON.parse(localStorage.getItem('prepspace_reverse_deck') || '[]');
        if (deck.includes(id)) {
          deck = deck.filter(item => item !== id);
          showToast('Removed from Pocket Deck', 'info');
        } else {
          deck.push(id);
          showToast('Saved to Pocket Deck!', 'success');
        }
        localStorage.setItem('prepspace_reverse_deck', JSON.stringify(deck));
        const pageMount = document.getElementById('page-mount');
        if (pageMount) pageMount.innerHTML = components.reverseInterview();
        bindReverseInterviewEvents();
      });
    });

    document.querySelectorAll('.remove-from-deck-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        let deck = JSON.parse(localStorage.getItem('prepspace_reverse_deck') || '[]');
        deck = deck.filter(item => item !== id);
        localStorage.setItem('prepspace_reverse_deck', JSON.stringify(deck));
        const pageMount = document.getElementById('page-mount');
        if (pageMount) pageMount.innerHTML = components.reverseInterview();
        bindReverseInterviewEvents();
      });
    });

    const copyDeckBtn = document.getElementById('btn-copy-pocket-deck');
    if (copyDeckBtn) {
      copyDeckBtn.addEventListener('click', () => {
        let deck = JSON.parse(localStorage.getItem('prepspace_reverse_deck') || '[]');
        if (deck.length === 0) {
          showToast('Star at least one question first!', 'warning');
          return;
        }
        const text = deck.map((id, idx) => {
          const item = REVERSE_QUESTIONS.find(q => q.id === id);
          return item ? `${idx + 1}. "${item.question}" (${item.category})` : '';
        }).filter(Boolean).join('\n\n');

        navigator.clipboard.writeText(text).then(() => {
          showToast('Pocket deck copied to clipboard!', 'success');
        });
      });
    }
  };

})();
