// listen to service worker install event
self.addEventListener("install", event => {
  console.log("service worker installed", event);
});

// activate service worker
self.addEventListener("activate", event => {
  console.log("service worker has been activated");
});

// fetch event
self.addEventListener("fetch", event => {
  console.log("fetch event", event);
});
