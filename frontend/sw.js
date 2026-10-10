// PrepSpace Service Worker - PWA Offline Caching Engine
// Version: 5.8.33 (Mobile Fluid Scrolling & Zero Scroll Trap Architecture)

const CACHE_NAME = 'prepspace-static-v5.8.33';
const RUNTIME_CACHE = 'prepspace-runtime-v5.8.33';

const PRECACHE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './assets/css/index.css?v=5.8.33',
  './assets/js/dsa-notes-data.js?v=5.8.33',
  './assets/js/app.js?v=5.8.33',
  './assets/js/components.js?v=5.8.33',
  './assets/js/interview-suite.js?v=5.8.33',
  './assets/js/technical-library-data.js?v=5.8.33',
  './assets/js/questions-data.js?v=5.8.33',
  './assets/js/aptitude-curriculum.js?v=5.8.33',
  './assets/js/production-pages.js?v=5.8.33',
  './assets/favicon.ico',
  './assets/favicon.png',
  './assets/prepspace_icon.png',
  './assets/prepspace_logo.png'
];

// 1. Install Event - Precache App Shell and Skip Waiting Immediately
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('Precache partial warning:', err);
      });
    })
  );
});

// 2. Activate Event - Clean old caches and claim clients immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME && name !== RUNTIME_CACHE)
          .map((name) => {
            console.log('Purging legacy cache:', name);
            return caches.delete(name);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// Allow immediate activation on skipWaiting message
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// 3. Fetch Event - Network-First for HTML/JS/CSS for instantaneous updates, with offline cache fallback
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip Chrome extension requests or non-http protocols
  if (!requestUrl.protocol.startsWith('http')) return;

  // API Requests: Network-First with runtime cache fallback
  if (requestUrl.pathname.startsWith('/api') || requestUrl.hostname.includes('api.stream-in.app')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => cache.put(event.request, responseClone));
          }
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // App Shell & Static Assets: Network-First with Cache Fallback
  // Ensures fresh deployments are served immediately without stale-cache locks
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html') || caches.match('./');
          }
          return null;
        });
      })
  );
});
