/**
 * notifications.js - PrepSpace Centralized In-App Notification Center
 * Handles real-time notification polling, header bell badge, dropdown rendering,
 * and mark-as-read synchronization with backend API.
 */

(function() {
  'use strict';

  window.PrepSpaceNotifications = {
    notifications: [],
    activeFilter: 'ALL',

    init() {
      this.fetchNotifications();
      // Poll every 60 seconds
      setInterval(() => this.fetchNotifications(), 60000);
    },

    async fetchNotifications() {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await fetch(`${API_BASE}/v1/notifications`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          this.notifications = await res.json();
          this.updateHeaderBadge();
          this.renderDropdown();
        }
      } catch (e) {
        // Fallback local notifications if offline
        if (!this.notifications.length) {
          this.notifications = [
            {
              id: 1,
              title: 'Daily Streak Protected',
              message: 'Your streak flame is active for today! Keep coding to earn XP.',
              type: 'STREAK',
              targetUrl: '#/dashboard',
              isRead: false,
              createdAt: new Date().toISOString()
            },
            {
              id: 2,
              title: 'Daily Missions Live',
              message: '5 new missions available today. Complete all to unlock +100 XP bonus!',
              type: 'MISSION',
              targetUrl: '#/missions',
              isRead: false,
              createdAt: new Date().toISOString()
            }
          ];
          this.updateHeaderBadge();
          this.renderDropdown();
        }
      }
    },

    updateHeaderBadge() {
      const dot = document.getElementById('header-notification-dot');
      if (!dot) return;
      const unreadCount = this.notifications.filter(n => !n.isRead).length;
      if (unreadCount > 0) {
        dot.classList.remove('d-none');
        dot.title = `${unreadCount} new notifications`;
      } else {
        dot.classList.add('d-none');
      }
    },

    setFilter(filter) {
      this.activeFilter = filter;
      this.renderDropdown();
    },

    async markRead(id, e) {
      if (e) e.stopPropagation();
      const token = localStorage.getItem('token');
      const item = this.notifications.find(n => n.id === id);
      if (item) item.isRead = true;
      this.updateHeaderBadge();
      this.renderDropdown();

      if (token) {
        try {
          await fetch(`${API_BASE}/v1/notifications/${id}/read`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token}` }
          });
        } catch (err) {}
      }
    },

    async markAllRead() {
      this.notifications.forEach(n => n.isRead = true);
      this.updateHeaderBadge();
      this.renderDropdown();

      const token = localStorage.getItem('token');
      if (token) {
        try {
          await fetch(`${API_BASE}/v1/notifications/mark-all-read`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token}` }
          });
        } catch (err) {}
      }
      if (typeof window.showToast === 'function') {
        window.showToast('All notifications marked as read', 'success');
      }
    },

    renderDropdown() {
      const panel = document.getElementById('notification-menu-panel');
      if (!panel) return;

      const unreadCount = this.notifications.filter(n => !n.isRead).length;
      let filtered = this.notifications;
      if (this.activeFilter !== 'ALL') {
        filtered = this.notifications.filter(n => n.type === this.activeFilter);
      }

      panel.innerHTML = `
        <div class="p-3 border-bottom border-secondary border-opacity-25 d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center gap-2">
            <h6 class="fw-bold text-white mb-0 fs-7"><i class="fa-solid fa-bell text-warning me-1"></i> Notifications</h6>
            ${unreadCount > 0 ? `<span class="badge bg-warning text-dark px-1.5 py-0.5 fs-9 fw-bolder rounded-pill">${unreadCount} New</span>` : ''}
          </div>
          ${unreadCount > 0 ? `<button class="btn btn-link text-muted p-0 fs-9 text-decoration-none hover-white" onclick="window.PrepSpaceNotifications.markAllRead()">Mark all as read</button>` : ''}
        </div>

        <div class="px-3 py-2 border-bottom border-secondary border-opacity-15 d-flex gap-1 overflow-x-auto">
          <button class="btn btn-sm py-0.5 px-2 fs-9 rounded-pill ${this.activeFilter === 'ALL' ? 'btn-primary' : 'btn-glass text-muted'}" onclick="window.PrepSpaceNotifications.setFilter('ALL')">All</button>
          <button class="btn btn-sm py-0.5 px-2 fs-9 rounded-pill ${this.activeFilter === 'MISSION' ? 'btn-primary' : 'btn-glass text-muted'}" onclick="window.PrepSpaceNotifications.setFilter('MISSION')">Missions</button>
          <button class="btn btn-sm py-0.5 px-2 fs-9 rounded-pill ${this.activeFilter === 'STREAK' ? 'btn-primary' : 'btn-glass text-muted'}" onclick="window.PrepSpaceNotifications.setFilter('STREAK')">Streaks</button>
          <button class="btn btn-sm py-0.5 px-2 fs-9 rounded-pill ${this.activeFilter === 'COMMUNITY' ? 'btn-primary' : 'btn-glass text-muted'}" onclick="window.PrepSpaceNotifications.setFilter('COMMUNITY')">Community</button>
        </div>

        <div class="notification-list p-2" style="max-height: 340px; overflow-y: auto;">
          ${filtered.length === 0 ? `
            <div class="text-center py-4 text-muted fs-8">
              <i class="fa-regular fa-bell-slash fs-4 mb-2 d-block opacity-40"></i>
              No notifications in this category.
            </div>
          ` : filtered.map(n => `
            <div class="notification-item p-2.5 rounded-3 mb-1.5 transition-smooth ${n.isRead ? 'opacity-75' : 'bg-surface-hover border-start border-3 border-warning'}" style="cursor: pointer; background: rgba(255, 255, 255, ${n.isRead ? '0.02' : '0.06'});" onclick="location.hash='${n.targetUrl || '#/dashboard'}'; window.PrepSpaceNotifications.markRead(${n.id});">
              <div class="d-flex align-items-start justify-content-between gap-2">
                <span class="fw-bold text-white fs-8 lh-sm">${n.title}</span>
                ${!n.isRead ? `<button class="btn btn-link text-muted p-0 fs-9" onclick="window.PrepSpaceNotifications.markRead(${n.id}, event)" title="Mark as read"><i class="fa-solid fa-check"></i></button>` : ''}
              </div>
              <p class="text-muted fs-8 mb-1 lh-sm mt-1">${n.message}</p>
              <div class="d-flex align-items-center justify-content-between text-muted fs-9">
                <span class="badge border border-secondary border-opacity-30 text-white-50 px-1 py-0 fs-9">${n.type}</span>
                <span>${timeAgo(n.createdAt)}</span>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }
  };

  function timeAgo(dateStr) {
    if (!dateStr) return 'Just now';
    const d = new Date(dateStr);
    const sec = Math.floor((Date.now() - d.getTime()) / 1000);
    if (sec < 60) return 'Just now';
    if (sec < 3600) return `${Math.floor(sec / 60)}m ago`;
    if (sec < 86400) return `${Math.floor(sec / 3600)}h ago`;
    return `${Math.floor(sec / 86400)}d ago`;
  }

  // Auto initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.PrepSpaceNotifications.init());
  } else {
    window.PrepSpaceNotifications.init();
  }
})();
