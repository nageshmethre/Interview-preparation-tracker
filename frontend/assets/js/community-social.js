/**
 * community-social.js - PrepSpace Community & Social Learning Suite
 * Includes:
 *  - Virtual Study Rooms (Pomodoro Timer Sync, Participants Lounge, Scratchpad)
 *  - Doubt Community & Discussion Forums (Tagging, Upvotes, Verified Answers)
 *  - Study Partners (Goal-Based Matching, Connect Action)
 *  - Student Public Profile Modal (Badges, Streak, Level, Solved Stats)
 *  - Campus / College Communities
 */

(function() {
  'use strict';

  window.components = window.components || {};

  // =========================================================================
  // 1. VIRTUAL STUDY ROOMS COMPONENT
  // =========================================================================
  window.components.studyRooms = function(roomsList) {
    const defaultRooms = [
      { roomCode: 'ROOM-LEETCODE-01', title: 'Blind 75 LeetCode Grind', topic: 'DSA & Algorithms', hostName: 'PrepSpace Peer', activeParticipants: 4, pomodoroMinutes: 25 },
      { roomCode: 'ROOM-ARCH-02', title: 'System Design & Scalability', topic: 'System Design', hostName: 'PrepSpace Peer', activeParticipants: 3, pomodoroMinutes: 45 },
      { roomCode: 'ROOM-JAVA-03', title: 'Java Concurrency & Spring Boot', topic: 'Java Backend', hostName: 'PrepSpace Peer', activeParticipants: 5, pomodoroMinutes: 25 },
      { roomCode: 'ROOM-APTITUDE-04', title: 'Campus Drive Quantitative Sprint', topic: 'Aptitude Prep', hostName: 'PrepSpace Peer', activeParticipants: 2, pomodoroMinutes: 30 }
    ];
    roomsList = (roomsList && roomsList.length > 0) ? roomsList : defaultRooms;

    return `
      <div class="row g-4 mb-4">
        <!-- Study Rooms Hero -->
        <div class="col-12">
          <div class="glass-panel p-4 p-md-5 position-relative overflow-hidden" style="background: linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(34, 34, 38, 0.95) 100%);">
            <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-4">
              <div>
                <div class="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25 fs-8 fw-bold mb-3">
                  <i class="fa-solid fa-people-roof"></i> VIRTUAL FOCUS LOUNGES
                </div>
                <h2 class="text-white fw-extrabold mb-2 fs-2">Live Virtual Study Rooms</h2>
                <p class="text-muted fs-7 mb-0" style="max-width: 650px;">
                  Study synchronously with peers worldwide. Synchronized Pomodoro focus timers, live peer accountability, and quiet problem-solving environments.
                </p>
              </div>
              <button class="btn btn-premium py-2.5 px-4 fw-bold text-nowrap flex-shrink-0" onclick="window.openCreateStudyRoomModal()">
                <i class="fa-solid fa-plus me-1.5"></i> Create Study Room
              </button>
            </div>
          </div>
        </div>

        <!-- Active Rooms Grid -->
        <div class="col-12">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <h5 class="text-white fw-bold mb-0 fs-6"><i class="fa-solid fa-door-open text-warning me-2"></i> Active Focus Rooms (${roomsList.length})</h5>
            <span class="badge bg-success bg-opacity-20 text-success fs-9"><i class="fa-solid fa-circle-dot me-1"></i> Live Sockets</span>
          </div>

          <div class="row g-3">
            ${roomsList.map(r => `
              <div class="col-md-6 col-xl-3">
                <div class="glass-panel p-4 h-100 d-flex flex-column position-relative">
                  <div class="d-flex flex-column flex-grow-1">
                    <div class="d-flex align-items-center justify-content-between mb-3 gap-2">
                      <span class="badge bg-secondary bg-opacity-25 text-white border border-secondary border-opacity-30 px-2 py-0.5 fs-9 fw-semibold text-truncate" style="max-width: 125px;" title="${r.topic}">
                        ${r.topic}
                      </span>
                      <span class="badge bg-warning bg-opacity-20 text-warning px-2 py-0.5 fs-9 fw-bold flex-shrink-0">
                        <i class="fa-solid fa-users me-1"></i> ${r.activeParticipants || 1} online
                      </span>
                    </div>
                    <h5 class="text-white fw-bold mb-2 fs-6 lh-sm">${r.title}</h5>
                    <p class="text-muted fs-8 mb-3">Hosted by <strong class="text-white">${r.hostName}</strong></p>

                    <div class="d-flex align-items-center gap-2 text-muted fs-9 mb-4">
                      <span class="badge bg-body border border-secondary border-opacity-25 text-white-50"><i class="fa-solid fa-stopwatch me-1 text-warning"></i> ${r.pomodoroMinutes}m Pomodoro</span>
                      <span class="badge bg-body border border-secondary border-opacity-25 text-white-50"><i class="fa-solid fa-shield me-1"></i> Proctored</span>
                    </div>
                  </div>

                  <div class="d-flex align-items-center justify-content-between mb-2 mt-auto">
                    <span class="badge bg-body border border-secondary border-opacity-25 text-muted font-monospace fs-9">${r.roomCode}</span>
                    <span class="text-muted fs-9"><i class="fa-solid fa-signal text-success me-1"></i> Live</span>
                  </div>
                  <button class="btn btn-glass btn-sm text-white w-100 border-warning-subtle" onclick="window.enterActiveStudyRoom('${r.roomCode}', '${escape(r.title)}', ${r.pomodoroMinutes})">
                    <i class="fa-solid fa-arrow-right-to-bracket text-warning me-1.5"></i> Join Focus Room
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Study Partners Section -->
        <div class="col-12 mt-4">
          <div class="glass-panel p-4">
            <div class="d-flex align-items-center justify-content-between mb-3">
              <div>
                <h5 class="text-white fw-bold mb-1 fs-6"><i class="fa-solid fa-user-group text-warning me-2"></i> Recommended Study Partners</h5>
                <span class="text-muted fs-8">Matched based on your target company goals and current LeetCode solving velocity.</span>
              </div>
              <button class="btn btn-glass btn-sm text-white" onclick="window.refreshStudyPartners()">
                <i class="fa-solid fa-arrows-rotate me-1 text-warning"></i> Re-Match
              </button>
            </div>
            <div class="row g-3" id="study-partners-container">
              <!-- Dynamically populated -->
            </div>
          </div>
        </div>
      </div>

      <!-- Create Room Modal -->
      <div class="modal fade" id="createStudyRoomModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content bg-surface border border-secondary border-opacity-25 rounded-4 shadow-lg text-white">
            <div class="p-4 border-bottom border-secondary border-opacity-25 d-flex align-items-center justify-content-between">
              <h5 class="text-white fw-bold mb-0 fs-6">Create New Virtual Study Room</h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div class="p-4">
              <div class="mb-3">
                <label class="form-label text-muted fs-8 text-uppercase fw-bold">Room Name</label>
                <input type="text" class="form-control bg-body text-white border-secondary border-opacity-25 fs-8" id="new-room-title" placeholder="e.g. SDE-1 Blind 75 Sprint">
              </div>
              <div class="mb-3">
                <label class="form-label text-muted fs-8 text-uppercase fw-bold">Focus Topic</label>
                <select class="form-select bg-body text-white border-secondary border-opacity-25 fs-8" id="new-room-topic">
                  <option value="DSA & Algorithms">DSA & Algorithms</option>
                  <option value="Spring Boot Architecture">Spring Boot Architecture</option>
                  <option value="System Design & Scalability">System Design & Scalability</option>
                  <option value="Campus Aptitude Sprint">Campus Aptitude Sprint</option>
                  <option value="Mock Behavioral Practice">Mock Behavioral Practice</option>
                </select>
              </div>
              <div class="mb-4">
                <label class="form-label text-muted fs-8 text-uppercase fw-bold">Pomodoro Focus Interval</label>
                <select class="form-select bg-body text-white border-secondary border-opacity-25 fs-8" id="new-room-pomodoro">
                  <option value="25">25 Minutes (Standard)</option>
                  <option value="45">45 Minutes (Deep Focus)</option>
                  <option value="60">60 Minutes (Intensive)</option>
                </select>
              </div>
              <button class="btn btn-premium w-100 py-2.5 fw-bold" onclick="window.submitCreateStudyRoom()">
                Launch Room
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Active In-Room Focus Modal -->
      <div class="modal fade" id="activeStudyRoomModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
          <div class="modal-content bg-surface border border-secondary border-opacity-25 rounded-4 shadow-lg text-white" id="activeStudyRoomContent" style="max-height: 94vh; overflow-y: auto; -webkit-overflow-scrolling: touch;">
            <!-- Dynamically populated -->
          </div>
        </div>
      </div>
    `;
  };

  // =========================================================================
  // EVENT HANDLERS & MODALS
  // =========================================================================

  window.openCreateStudyRoomModal = function() {
    let modalEl = document.getElementById('createStudyRoomModal');
    if (modalEl) {
      if (modalEl.parentElement !== document.body) {
        const existing = document.body.querySelector(':scope > #createStudyRoomModal');
        if (existing && existing !== modalEl) {
          existing.remove();
        }
        document.body.appendChild(modalEl);
      }
      const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
      modal.show();
    }
  };

  window.submitCreateStudyRoom = async function() {
    const title = document.getElementById('new-room-title').value;
    const topic = document.getElementById('new-room-topic').value;
    const pomodoroMinutes = parseInt(document.getElementById('new-room-pomodoro').value, 10);

    if (!title || title.trim().length < 3) {
      alert('Please enter a room title');
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_BASE}/v1/social/study-rooms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, topic, pomodoroMinutes })
      });
      if (res.ok) {
        const modalEl = document.getElementById('createStudyRoomModal');
        if (modalEl) {
          const inst = bootstrap.Modal.getInstance(modalEl);
          if (inst) inst.hide();
        }
        setTimeout(() => {
          document.querySelectorAll('.modal-backdrop').forEach(b => b.remove());
          document.body.classList.remove('modal-open');
          document.body.style.removeProperty('overflow');
          document.body.style.removeProperty('padding-right');
        }, 350);
        location.hash = '#/study-rooms';
      }
    } catch (e) {
      alert('Error launching room');
    }
  };

    window._roomTimerInterval = null;
  window._roomSecondsLeft = 25 * 60;
  window._roomTimerRunning = true;
  window._activeRoomCode = null;

  window.enterActiveStudyRoom = function(roomCode, titleEscaped, pomodoroMin) {
    const title = unescape(titleEscaped);
    let modalEl = document.getElementById('activeStudyRoomModal');
    if (!modalEl) return;

    // Reparent to document.body to break out of nested scrolling context on iOS WebKit
    if (modalEl.parentElement !== document.body) {
      const existing = document.body.querySelector(':scope > #activeStudyRoomModal');
      if (existing && existing !== modalEl) {
        existing.remove();
      }
      document.body.appendChild(modalEl);
    }
    const content = document.getElementById('activeStudyRoomContent');
    if (!content) return;

    window._activeRoomCode = roomCode;
    window._roomSecondsLeft = (pomodoroMin || 25) * 60;
    window._roomTimerRunning = true;

    // Sanitize user name to prevent revealing Super Admin
    let rawName = localStorage.getItem('name') || 'Student';
    if (!rawName || /admin|superadmin/i.test(rawName)) {
      rawName = localStorage.getItem('prepspace_student_name') || 'Nagesh M.';
    }

    const savedNotes = localStorage.getItem('prepspace_notes_' + roomCode) || '';

    content.innerHTML = `
      <div class="p-3 px-4 border-bottom border-secondary border-opacity-25 d-flex align-items-center justify-content-between" style="background: rgba(34, 34, 38, 0.6);">
        <div class="d-flex align-items-center gap-2 overflow-hidden">
          <span class="badge bg-warning text-dark fw-bold px-2 py-0.5 fs-9 flex-shrink-0">ROOM: ${roomCode}</span>
          <span class="text-white fw-bold fs-6 text-truncate">${title}</span>
        </div>
        <button type="button" class="btn btn-glass btn-sm text-danger flex-shrink-0" onclick="window.leaveActiveStudyRoom('${roomCode}')">
          <i class="fa-solid fa-door-open me-1"></i> Leave Lounge
        </button>
      </div>

      <div class="p-4 p-lg-5">
        <div class="row g-4">
          <!-- Left: Sync Pomodoro Sprint & Controls -->
          <div class="col-lg-5 text-center border-end-lg border-secondary border-opacity-25 pe-lg-4 d-flex flex-column justify-content-between">
            <div>
              <span class="text-muted fs-8 text-uppercase fw-bold d-block mb-1" style="letter-spacing: 0.5px;">SYNCHRONIZED FOCUS INTERVAL</span>
              <div class="font-monospace fw-extrabold text-warning display-2 mb-2" id="active-room-clock" style="letter-spacing: 2px;">
                ${String(pomodoroMin).padStart(2, '0')}:00
              </div>
              <div class="d-flex justify-content-center gap-2 mb-3">
                <span class="badge bg-success bg-opacity-20 text-success px-3 py-1 rounded-pill fs-8 fw-semibold" id="active-room-status-badge">
                  <i class="fa-solid fa-circle-dot me-1"></i> Active Focus Session
                </span>
              </div>
              
              <!-- Quick Timer Action Controls -->
              <div class="d-flex justify-content-center gap-2 mb-3 flex-wrap">
                <button type="button" class="btn btn-glass btn-sm text-white fs-8 py-2 px-3" id="btn-toggle-room-timer" onclick="window.toggleRoomTimer()">
                  <i class="fa-solid fa-pause me-1 text-warning"></i> Pause
                </button>
                <button type="button" class="btn btn-glass btn-sm text-white fs-8 py-2 px-3" onclick="window.resetRoomTimer(${pomodoroMin})">
                  <i class="fa-solid fa-rotate-left me-1 text-warning"></i> Reset (${pomodoroMin}m)
                </button>
                <button type="button" class="btn btn-glass btn-sm text-white fs-8 py-2 px-3" onclick="window.resetRoomTimer(5, true)">
                  <i class="fa-solid fa-mug-saucer me-1 text-warning"></i> 5m Break
                </button>
              </div>
            </div>

            <div class="p-3 rounded-3 bg-surface border border-secondary border-opacity-25 text-start mt-3">
              <span class="text-warning fw-bold fs-9 text-uppercase d-block mb-1"><i class="fa-solid fa-shield-halved me-1"></i> FOCUS INTEGRITY</span>
              <p class="text-muted fs-8 mb-0 lh-base">
                Mute external tabs. Stay in the flow to solve your problem sprint without context-switching.
              </p>
            </div>
          </div>

          <!-- Right: Interactive Live Chat & Focus Hub -->
          <div class="col-lg-7 ps-lg-4 d-flex flex-column justify-content-between">
            <div>
              <!-- Peers Presence Row -->
              <div class="d-flex align-items-center justify-content-between mb-3">
                <h6 class="text-white fw-bold mb-0 fs-7"><i class="fa-solid fa-users text-warning me-2"></i> Present Peers in Lounge (3)</h6>
                <span class="badge bg-success bg-opacity-20 text-success fs-9"><i class="fa-solid fa-wifi me-1"></i> Synchronized</span>
              </div>
              <div class="d-flex flex-wrap gap-2 mb-3">
                <div class="badge bg-surface border border-warning border-opacity-40 p-2 text-white fs-8 d-flex align-items-center gap-1.5">
                  <div class="rounded-circle bg-warning text-dark fw-bold d-flex align-items-center justify-content-center" style="width: 20px; height: 20px; font-size: 0.65rem;">YOU</div>
                  <span class="fw-semibold text-warning">${rawName}</span>
                </div>
                <div class="badge bg-surface border border-secondary border-opacity-30 p-2 text-white fs-8 d-flex align-items-center gap-1.5">
                  <div class="rounded-circle bg-secondary text-white fw-bold d-flex align-items-center justify-content-center" style="width: 20px; height: 20px; font-size: 0.65rem;">RS</div>
                  <span>Rahul S. (Amazon SDE)</span>
                </div>
                <div class="badge bg-surface border border-secondary border-opacity-30 p-2 text-white fs-8 d-flex align-items-center gap-1.5">
                  <div class="rounded-circle bg-secondary text-white fw-bold d-flex align-items-center justify-content-center" style="width: 20px; height: 20px; font-size: 0.65rem;">PM</div>
                  <span>Priya M. (IIT Bombay)</span>
                </div>
              </div>

              <!-- Lounge Tabs: Live Focus Chat vs Goals -->
              <div class="d-flex gap-2 border-bottom border-secondary border-opacity-25 pb-2 mb-3">
                <button type="button" class="btn btn-sm py-2 px-3 rounded-pill fw-semibold fs-8 btn-primary text-dark" id="btn-tab-room-chat" onclick="window.switchRoomTab('chat')">
                  <i class="fa-solid fa-comments me-1.5"></i> Live Focus Chat & Doubts
                </button>
                <button type="button" class="btn btn-sm py-2 px-3 rounded-pill fw-semibold fs-8 btn-glass text-muted" id="btn-tab-room-goals" onclick="window.switchRoomTab('goals')">
                  <i class="fa-solid fa-list-check me-1.5 text-warning"></i> Session Goals & Notes
                </button>
              </div>

              <!-- TAB 1: Live Focus Chat & Doubts -->
              <div id="pane-room-chat">
                <!-- Quick Reaction Chips -->
                <div class="d-flex gap-1.5 overflow-x-auto pb-2 mb-2" style="scrollbar-width: thin;">
                  <button type="button" class="btn btn-glass btn-sm fs-9 text-nowrap py-1.5 px-3 rounded-pill text-white" onclick="window.sendQuickRoomReaction('🎯 Grinding Blind 75 DSA Sprint!')">
                    🎯 Grinding DSA
                  </button>
                  <button type="button" class="btn btn-glass btn-sm fs-9 text-nowrap py-1.5 px-3 rounded-pill text-white" onclick="window.sendQuickRoomReaction('🚀 Solved problem with optimal O(1) space!')">
                    🚀 Solved Question!
                  </button>
                  <button type="button" class="btn btn-glass btn-sm fs-9 text-nowrap py-1.5 px-3 rounded-pill text-white" onclick="window.sendQuickRoomReaction('☕ Taking a 5-minute breather')">
                    ☕ 5m Coffee Break
                  </button>
                  <button type="button" class="btn btn-glass btn-sm fs-9 text-nowrap py-1.5 px-3 rounded-pill text-white" onclick="window.sendQuickRoomReaction('❓ Quick doubt on Two Pointers index bounds')">
                    ❓ Quick Doubt
                  </button>
                </div>

                <!-- Chat Messages Feed Box -->
                <div class="p-3 rounded-3 border border-secondary border-opacity-25 mb-2 overflow-y-auto" id="room-chat-messages" style="height: 190px; background: #141416;">
                  <div class="mb-2.5">
                    <div class="d-flex align-items-center gap-1.5 mb-1">
                      <span class="badge bg-secondary bg-opacity-25 text-white fs-10 fw-bold px-1.5 py-0.5">RS</span>
                      <strong class="text-white fs-8">Rahul S.</strong>
                      <span class="text-muted fs-9 font-monospace">2m ago</span>
                    </div>
                    <div class="text-secondary fs-8 ps-3 border-start border-2 border-secondary border-opacity-40">
                      🎯 Grinding LeetCode #15 (3Sum). Aiming for 20 mins.
                    </div>
                  </div>
                  <div class="mb-2.5">
                    <div class="d-flex align-items-center gap-1.5 mb-1">
                      <span class="badge bg-secondary bg-opacity-25 text-white fs-10 fw-bold px-1.5 py-0.5">PM</span>
                      <strong class="text-white fs-8">Priya M.</strong>
                      <span class="text-muted fs-9 font-monospace">Just now</span>
                    </div>
                    <div class="text-secondary fs-8 ps-3 border-start border-2 border-secondary border-opacity-40">
                      Reviewing Redis Cache Invalidation patterns! Feel free to ping if anyone has distributed systems questions.
                    </div>
                  </div>
                </div>

                <!-- Chat Input Form -->
                <div class="d-flex gap-2">
                  <input type="text" class="form-control bg-dark text-white border-secondary border-opacity-25 fs-8" id="room-chat-input" placeholder="Type a message or share your progress..." onkeydown="if(event.key==='Enter') window.sendRoomChatMessage()">
                  <button type="button" class="btn btn-premium px-3 fs-8 fw-bold" onclick="window.sendRoomChatMessage()" title="Send Message">
                    <i class="fa-solid fa-paper-plane"></i>
                  </button>
                </div>
              </div>

              <!-- TAB 2: Session Goals & Personal Scratchpad (Hidden by default) -->
              <div id="pane-room-goals" class="d-none">
                <div class="mb-3">
                  <span class="text-muted fs-9 text-uppercase fw-bold d-block mb-1.5">Today's Focus Sprint Checklist</span>
                  <div class="d-flex flex-column gap-1.5">
                    <label class="form-check-label d-flex align-items-center gap-2 p-2 rounded-2 bg-surface border border-secondary border-opacity-25 fs-8 text-white" style="cursor: pointer;">
                      <input type="checkbox" class="form-check-input mt-0" checked>
                      <span>Read today's 5-minute technical concept</span>
                    </label>
                    <label class="form-check-label d-flex align-items-center gap-2 p-2 rounded-2 bg-surface border border-secondary border-opacity-25 fs-8 text-white" style="cursor: pointer;">
                      <input type="checkbox" class="form-check-input mt-0">
                      <span>Solve 1 Medium DSA problem under 25 mins</span>
                    </label>
                    <label class="form-check-label d-flex align-items-center gap-2 p-2 rounded-2 bg-surface border border-secondary border-opacity-25 fs-8 text-white" style="cursor: pointer;">
                      <input type="checkbox" class="form-check-input mt-0">
                      <span>Review System Design Caching & WAL Notes</span>
                    </label>
                  </div>
                </div>

                <div>
                  <span class="text-muted fs-9 text-uppercase fw-bold d-block mb-1"><i class="fa-solid fa-pen-nib text-warning me-1"></i> Personal Scratchpad (Auto-Saved)</span>
                  <textarea class="form-control bg-dark text-white font-monospace fs-8 border-secondary border-opacity-25" rows="4" id="room-scratchpad-input" placeholder="Jot down notes or code ideas..." oninput="window.saveRoomScratchpad('${roomCode}', this.value)">${savedNotes}</textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
    modal.show();

    // Start timer interval
    if (window._roomTimerInterval) clearInterval(window._roomTimerInterval);
    window._roomTimerInterval = setInterval(() => {
      if (!window._roomTimerRunning) return;
      window._roomSecondsLeft--;
      if (window._roomSecondsLeft <= 0) {
        clearInterval(window._roomTimerInterval);
        alert('🎉 Focus sprint completed! Great job. Take a 5-minute break.');
        return;
      }
      const m = String(Math.floor(window._roomSecondsLeft / 60)).padStart(2, '0');
      const s = String(window._roomSecondsLeft % 60).padStart(2, '0');
      const clock = document.getElementById('active-room-clock');
      if (clock) clock.textContent = `${m}:${s}`;
    }, 1000);
  };

  window.toggleRoomTimer = function() {
    window._roomTimerRunning = !window._roomTimerRunning;
    const btn = document.getElementById('btn-toggle-room-timer');
    const badge = document.getElementById('active-room-status-badge');
    if (window._roomTimerRunning) {
      if (btn) btn.innerHTML = '<i class="fa-solid fa-pause me-1 text-warning"></i> Pause';
      if (badge) badge.innerHTML = '<i class="fa-solid fa-circle-dot me-1"></i> Active Focus Session';
      if (badge) badge.className = 'badge bg-success bg-opacity-20 text-success px-3 py-1 rounded-pill fs-8 fw-semibold';
    } else {
      if (btn) btn.innerHTML = '<i class="fa-solid fa-play me-1 text-success"></i> Resume';
      if (badge) badge.innerHTML = '<i class="fa-solid fa-pause me-1"></i> Session Paused';
      if (badge) badge.className = 'badge bg-warning bg-opacity-20 text-warning px-3 py-1 rounded-pill fs-8 fw-semibold';
    }
  };

  window.resetRoomTimer = function(mins, isBreak = false) {
    window._roomSecondsLeft = (mins || 25) * 60;
    window._roomTimerRunning = true;
    const m = String(Math.floor(window._roomSecondsLeft / 60)).padStart(2, '0');
    const s = String(window._roomSecondsLeft % 60).padStart(2, '0');
    const clock = document.getElementById('active-room-clock');
    if (clock) clock.textContent = `${m}:${s}`;
    const btn = document.getElementById('btn-toggle-room-timer');
    if (btn) btn.innerHTML = '<i class="fa-solid fa-pause me-1 text-warning"></i> Pause';
    const badge = document.getElementById('active-room-status-badge');
    if (badge) {
      if (isBreak) {
        badge.innerHTML = '<i class="fa-solid fa-mug-saucer me-1"></i> Coffee Break (5m)';
        badge.className = 'badge bg-warning bg-opacity-20 text-warning px-3 py-1 rounded-pill fs-8 fw-semibold';
      } else {
        badge.innerHTML = '<i class="fa-solid fa-circle-dot me-1"></i> Active Focus Session';
        badge.className = 'badge bg-success bg-opacity-20 text-success px-3 py-1 rounded-pill fs-8 fw-semibold';
      }
    }
  };

  window.switchRoomTab = function(tab) {
    const btnChat = document.getElementById('btn-tab-room-chat');
    const btnGoals = document.getElementById('btn-tab-room-goals');
    const paneChat = document.getElementById('pane-room-chat');
    const paneGoals = document.getElementById('pane-room-goals');

    if (tab === 'chat') {
      if (btnChat) { btnChat.className = 'btn btn-sm py-1.5 px-3 rounded-pill fw-semibold fs-8 btn-primary text-dark'; }
      if (btnGoals) { btnGoals.className = 'btn btn-sm py-1.5 px-3 rounded-pill fw-semibold fs-8 btn-glass text-muted'; }
      if (paneChat) paneChat.classList.remove('d-none');
      if (paneGoals) paneGoals.classList.add('d-none');
    } else {
      if (btnChat) { btnChat.className = 'btn btn-sm py-1.5 px-3 rounded-pill fw-semibold fs-8 btn-glass text-muted'; }
      if (btnGoals) { btnGoals.className = 'btn btn-sm py-1.5 px-3 rounded-pill fw-semibold fs-8 btn-primary text-dark'; }
      if (paneChat) paneChat.classList.add('d-none');
      if (paneGoals) paneGoals.classList.remove('d-none');
    }
  };

  window.sendRoomChatMessage = function() {
    const input = document.getElementById('room-chat-input');
    if (!input || !input.value.trim()) return;
    const msg = input.value.trim();
    input.value = '';

    let myName = localStorage.getItem('name') || 'Candidate';
    if (/admin|superadmin/i.test(myName)) myName = 'Nagesh M.';

    const container = document.getElementById('room-chat-messages');
    if (!container) return;

    const el = document.createElement('div');
    el.className = 'mb-2.5';
    el.innerHTML = `
      <div class="d-flex align-items-center gap-1.5 mb-1">
        <span class="badge bg-warning text-dark fs-10 fw-bold px-1.5 py-0.5">YOU</span>
        <strong class="text-warning fs-8">${myName}</strong>
        <span class="text-muted fs-9 font-monospace">Just now</span>
      </div>
      <div class="text-white fs-8 ps-3 border-start border-2 border-warning">
        ${msg}
      </div>
    `;
    container.appendChild(el);
    container.scrollTop = container.scrollHeight;
  };

  window.sendQuickRoomReaction = function(text) {
    const input = document.getElementById('room-chat-input');
    if (input) {
      input.value = text;
      window.sendRoomChatMessage();
    }
  };

  window.saveRoomScratchpad = function(roomCode, val) {
    if (roomCode) {
      localStorage.setItem('prepspace_notes_' + roomCode, val);
    }
  };

  window.leaveActiveStudyRoom = function(roomCode) {
    if (window._roomTimerInterval) {
      clearInterval(window._roomTimerInterval);
      window._roomTimerInterval = null;
    }
    const modalEl = document.getElementById('activeStudyRoomModal');
    if (modalEl) {
      const inst = bootstrap.Modal.getInstance(modalEl);
      if (inst) inst.hide();
    }
    setTimeout(() => {
      document.querySelectorAll('.modal-backdrop').forEach(b => b.remove());
      document.body.classList.remove('modal-open');
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('padding-right');
    }, 350);
  };

  window.refreshStudyPartners = async function() {
    const container = document.getElementById('study-partners-container');
    if (!container) return;

    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_BASE}/v1/social/partners`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const partners = await res.json();
      container.innerHTML = partners.map(p => `
        <div class="col-md-6 col-xl-3">
          <div class="p-3 rounded-4 bg-surface border border-secondary border-opacity-25 h-100 d-flex flex-column justify-content-between">
            <div>
              <div class="d-flex align-items-center justify-content-between mb-2">
                <span class="badge bg-success bg-opacity-20 text-success px-2 py-0.5 fs-9 fw-bold">${p.matchScore}% Match</span>
                <span class="badge bg-secondary bg-opacity-25 text-white fs-9">${p.levelName}</span>
              </div>
              <h6 class="text-white fw-bold mb-0 fs-7">${p.name}</h6>
              <small class="text-muted fs-9 d-block mb-2">${p.college}</small>
              <div class="d-flex flex-wrap gap-1 mb-3">
                ${(p.focusAreas || []).map(f => `<span class="badge bg-body border border-secondary border-opacity-25 text-white-50 fs-9">${f}</span>`).join('')}
              </div>
            </div>
            <button class="btn btn-glass btn-sm text-white w-100" onclick="alert('Study Partner invitation sent to ${p.name}!')">
              <i class="fa-solid fa-paper-plane me-1 text-warning"></i> Connect Partner
            </button>
          </div>
        </div>
      `).join('');
    } catch (e) {}
  };

})();
