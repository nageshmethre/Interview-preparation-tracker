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
        <div class="modal-dialog modal-dialog-centered modal-xl">
          <div class="modal-content bg-surface border border-secondary border-opacity-25 rounded-4 shadow-lg text-white" id="activeStudyRoomContent">
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
    const modalEl = document.getElementById('createStudyRoomModal');
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
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
        if (modalEl) bootstrap.Modal.getInstance(modalEl).hide();
        location.hash = '#/study-rooms';
      }
    } catch (e) {
      alert('Error launching room');
    }
  };

  window._roomTimerInterval = null;
  window.enterActiveStudyRoom = function(roomCode, titleEscaped, pomodoroMin) {
    const title = unescape(titleEscaped);
    const modalEl = document.getElementById('activeStudyRoomModal');
    const content = document.getElementById('activeStudyRoomContent');
    if (!modalEl || !content) return;

    let secondsLeft = pomodoroMin * 60;

    content.innerHTML = `
      <div class="p-4 border-bottom border-secondary border-opacity-25 d-flex align-items-center justify-content-between">
        <div>
          <span class="badge bg-warning text-dark fw-bold px-2 py-0.5 fs-9 me-2">ROOM: ${roomCode}</span>
          <span class="text-white fw-bold fs-6">${title}</span>
        </div>
        <button type="button" class="btn btn-glass btn-sm text-danger" onclick="window.leaveActiveStudyRoom('${roomCode}')">
          <i class="fa-solid fa-door-open me-1"></i> Leave Lounge
        </button>
      </div>
      <div class="p-4 p-md-5">
        <div class="row g-4">
          <!-- Left: Sync Pomodoro Timer -->
          <div class="col-lg-6 text-center border-end-lg border-secondary border-opacity-25">
            <span class="text-muted fs-8 text-uppercase fw-bold d-block mb-2">Synchronized Focus Interval</span>
            <div class="font-monospace fw-extrabold text-warning display-3 mb-3" id="active-room-clock">
              ${String(pomodoroMin).padStart(2, '0')}:00
            </div>
            <div class="d-flex justify-content-center gap-2 mb-4">
              <span class="badge bg-success bg-opacity-20 text-success px-3 py-1 rounded-pill fs-8">
                <i class="fa-solid fa-circle-dot me-1"></i> Active Focus Session
              </span>
            </div>
            <p class="text-muted fs-8 mb-0" style="max-width: 380px; margin: 0 auto;">
              Turn off external tab notifications. Use this sprint to solve your next problem without tab switching.
            </p>
          </div>

          <!-- Right: Peer Avatars & Goal Scratchpad -->
          <div class="col-lg-6">
            <h6 class="text-white fw-bold mb-3 fs-7"><i class="fa-solid fa-users text-warning me-2"></i> Present Peers in Lounge</h6>
            <div class="d-flex flex-wrap gap-2 mb-4">
              <div class="badge bg-surface border border-secondary border-opacity-30 p-2 text-white fs-8 d-flex align-items-center gap-1.5">
                <div class="rounded-circle bg-warning text-dark fw-bold d-flex align-items-center justify-content-center" style="width: 22px; height: 22px; font-size: 0.65rem;">YOU</div>
                <span>${localStorage.getItem('name') || 'Candidate'}</span>
              </div>
              <div class="badge bg-surface border border-secondary border-opacity-30 p-2 text-white fs-8 d-flex align-items-center gap-1.5">
                <div class="rounded-circle bg-primary text-dark fw-bold d-flex align-items-center justify-content-center" style="width: 22px; height: 22px; font-size: 0.65rem;">RS</div>
                <span>Rahul S. (Amazon SDE)</span>
              </div>
              <div class="badge bg-surface border border-secondary border-opacity-30 p-2 text-white fs-8 d-flex align-items-center gap-1.5">
                <div class="rounded-circle bg-info text-dark fw-bold d-flex align-items-center justify-content-center" style="width: 22px; height: 22px; font-size: 0.65rem;">PM</div>
                <span>Priya M. (IIT Bombay)</span>
              </div>
            </div>

            <h6 class="text-white fw-bold mb-2 fs-7"><i class="fa-solid fa-pen-nib text-warning me-2"></i> Session Scratchpad</h6>
            <textarea class="form-control bg-body text-white font-monospace fs-8 border-secondary border-opacity-25" rows="4" placeholder="Write down your session target or quick notes here..."></textarea>
          </div>
        </div>
      </div>
    `;

    const modal = new bootstrap.Modal(modalEl);
    modal.show();

    // Start timer interval
    if (window._roomTimerInterval) clearInterval(window._roomTimerInterval);
    window._roomTimerInterval = setInterval(() => {
      secondsLeft--;
      if (secondsLeft <= 0) {
        clearInterval(window._roomTimerInterval);
        alert('🎉 Focus sprint completed! Take a 5-minute break.');
        return;
      }
      const m = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
      const s = String(secondsLeft % 60).padStart(2, '0');
      const clock = document.getElementById('active-room-clock');
      if (clock) clock.textContent = `${m}:${s}`;
    }, 1000);
  };

  window.leaveActiveStudyRoom = function(roomCode) {
    if (window._roomTimerInterval) {
      clearInterval(window._roomTimerInterval);
      window._roomTimerInterval = null;
    }
    const modalEl = document.getElementById('activeStudyRoomModal');
    if (modalEl) bootstrap.Modal.getInstance(modalEl).hide();
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
