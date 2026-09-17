const CACHE_NAME = 'study-kit-v1';

// Add all the relative paths you want available offline
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './registeredquestions.js',
  './questions/psy1002_chapter1.js',
  './questions/psy1002_chapter2.js',
  './questions/psy1002_chapter3.js',
  './questions/psy1002_chapter4.js',
  './questions/psy1002_chapter5.js',
  './questions/psy1002_chapter6.js',
  './questions/psy1002_chapter7.js',
  './questions/psy1002_chapter8.js',
  './questions/psy1002_chapter9.js',
  './questions/psy1002_chapter10.js',
  './questions/psy1002_chapter11.js',
  './questions/psy1002_chapter12.js'
];

// 1. Install & Cache Files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[PWA] Caching all study kit assets');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// 2. Activate & Clean Up Old Caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
  self.clients.claim();
});

// 3. Serve from Cache First, Fallback to Network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
