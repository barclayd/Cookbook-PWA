importScripts('https://www.gstatic.com/firebasejs/7.1.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.1.0/firebase-messaging.js');

const firebaseConfig = {
  apiKey: 'AIzaSyBqznrHjn-JP1sSX91K53GOiIUpiKAxy-Y',
  authDomain: 'clear-emitter-234416.firebaseapp.com',
  databaseURL: 'https://clear-emitter-234416.firebaseio.com',
  projectId: 'clear-emitter-234416',
  storageBucket: 'clear-emitter-234416.appspot.com',
  messagingSenderId: '455719057190',
  appId: '1:455719057190:web:1974877d4cbe9253',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((notification) => {
  const notificationTitle = notification.data.title;
  const notificationOptions = {
    body: notification.data.body,
    icon: '/public/img/dish.png'
  };
  return self.registration.showNotification(notificationTitle, notificationOptions);
});

const staticCacheName = 'site-static-v3';
const dynamicCacheName = 'site-dynamic-v3';

const assets = [
  '/public',
  '/public/js/app.js',
  '/public/js/ui.js',
  '/public/js/materialize.min.js',
  '/public/css/materialize.min.css',
  '/public/css/style.css',
  '/public/img/dish.png',
  '/public/index.html',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
  '/public/pages/fallback.html',
];

// cache size limiter
const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

// listen to service worker install event
self.addEventListener('install', event => {
  // cache shell of pwa
  event.waitUntil(
    caches.open(staticCacheName).then(cache => {
      cache.addAll(assets);
    }),
  );
});

// activate service worker
self.addEventListener('activate', async event => {
  console.log('service worker has been activated');
  // delete old caches
  let keys;
  event.waitUntil(
    (keys = await caches.keys()),
    await keys
      .filter(key => key !== staticCacheName && key !== dynamicCacheName)
      .map(key => caches.delete(key)),
  );
});

// fetch event
self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.url.indexOf('firestore.googleappis.com') === -1) {
    event.respondWith(
      caches
        .match(request)
        .then(cacheRes => {
          return (
            cacheRes ||
            fetch(request).then(async fetchRes => {
              const cache = await caches.open(dynamicCacheName);
              cache.put(request.url, fetchRes.clone());
              // check cached items size
              limitCacheSize(dynamicCacheName, 10);
              return fetchRes;
            })
          );
        })
        .catch(() => {
          if (request.url.indexOf('.html' > -1)) {
            return caches.match('/pages/fallback.html');
          }
        }),
    );
  }
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(self.clients.openWindow(event.notification.data));
});