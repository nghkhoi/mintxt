//Basic asset-caching
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('video-store').then(function(cache) {
      return cache.addAll([
        '/mintxt/index.html',
        '/mintxt/script.js',
        '/mintxt/style.css',
        '/mintxt/app.webmanifest',
        '/mintxt/icons/android-chrome-192x192.png',
        '/mintxt/icons/android-chrome-512x512.png',
        '/mintxt/icons/apple-touch-icon.png',
        '/mintxt/icons/favicon-16x16.png',
        '/mintxt/icons/favicon-32x32.png',
        '/mintxt/icons/favicon.ico'
      ]);
    })
  );
 });
 
 self.addEventListener('fetch', function(e) {
   e.respondWith(
     caches.match(e.request).then(function(response) {
       return response || fetch(e.request);
     })
   );
 });