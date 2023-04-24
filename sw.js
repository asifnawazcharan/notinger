// Respond to fetch requests
self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  });
  
  // Cache extension files
  self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('myCache').then(function(cache) {
        return cache.addAll([
          'popup.html',
          'popup.js'
        ]);
      })
    );
  });
  
  
  
  
  
  
  