const staticCacheName = "site-static-v3";
const dynamicCacheName = "site-dynamic-v3";

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

// listen to service worker install event
self.addEventListener("install", async event => {
  // cache shell of pwa
  event.waitUntil(
    (cache = await caches.open(staticCacheName)),
    console.log("caching shell assets"),
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
  event.respondWith(
    caches
      .match(request)
      .then(cacheRes => {
        return (
          cacheRes ||
          fetch(request).then(async fetchRes => {
            const cache = await caches.open(dynamicCacheName);
            cache.put(request.url, fetchRes.clone());
            return fetchRes;
          })
        );
      })
      .catch(() => {
        if (request.url.indexOf(".html") > -1) {
          return caches.match("/pages/fallback.html");
        }
      })
  );
});
