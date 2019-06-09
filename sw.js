const staticCacheName = "site-static-v2";
const dynamicCacheName = "site-dynamic-v2";

const assets = [
  "/",
  "/js/app.js",
  "/js/ui.js",
  "/js/materialize.min.js",
  "/css/materialize.min.css",
  "/css/style.css",
  "/img/dish.png",
  "/index.html",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
  "/pages/fallback.html"
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
self.addEventListener("install", async event => {
  // cache shell of pwa
  let cache;
  event.waitUntil(
    (cache = await caches.open(staticCacheName)),
    cache.addAll(assets)
  );
});

// activate service worker
self.addEventListener("activate", async event => {
  console.log("service worker has been activated");
  // delete old caches
  event.waitUntil(
    (keys = await caches.keys()),
    await keys
      .filter(key => key !== staticCacheName && key !== dynamicCacheName)
      .map(key => caches.delete(key))
  );
});

// fetch event
self.addEventListener("fetch", event => {
  const { request } = event;
  if (request.url.indexOf("firestore.googleappis.com") === -1) {
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
          if (request.url.indexOf(".html" > -1)) {
            return caches.match("/pages/fallback.html");
          }
        })
    );
  }
});
