//Basic asset-caching
var CACHE='mintxt-cache';

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll([
        '/mintxt/',
        '/mintxt/index.html',
        '/mintxt/script.js',
        '/mintxt/style.css',
        '/mintxt/app.webmanifest',
        '/mintxt/icons/',
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
  e.respondWith(fromCache(e.request));
});

function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}