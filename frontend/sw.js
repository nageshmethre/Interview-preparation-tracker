// PrepSpace Service Worker - PWA Offline Caching Engine
// Version: 3.8.0

const CACHE_NAME = 'prepspace-static-v3.8.0';
const RUNTIME_CACHE = 'prepspace-runtime-v3.8.0';

const PRECACHE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './assets/css/index.css',
  './assets/js/app.js?v=3.7.0',
  './assets/js/components.js?v=3.7.0',
  './assets/js/technical-library-data.js?v=3.7.0',
  './assets/js/questions-data.js?v=3.7.0',
  './assets/js/aptitude-curriculum.js?v=3.7.0',
  './assets/js/production-pages.js?v=3.7.0',
  './assets/favicon.ico',
  './assets/favicon.png',
  './assets/prepspace_icon.png',
  './assets/prepspace_logo.png'
];

// 1. Install Event - Precache App Shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('Precache partial warning:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// 2. Activate Event - Clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME && name !== RUNTIME_CACHE)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Fetch Event - Stale-While-Revalidate for App Assets, Network-First for API
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip Chrome extension requests or analytics
  if (!requestUrl.protocol.startsWith('http')) return;

  // API Requests: Network-First with cache fallback
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
        .catch(() => {
          return caches.match(event.request);
        })
    );
    return;
  }

  // Static Assets: Cache-First with background revalidation
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});
