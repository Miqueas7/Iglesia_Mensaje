const CACHE_NAME = "esperanzahoy-v1";
const OFFLINE_URL = "/index.html";
const ASSETS = [
  "/",
  "/index.html",
  "/styles.css",
  "/app.js",
  "/manifest.json",
  "/assets/icon-192.png",
  "/assets/icon-512.png",
  "/assets/logo.png",
  "/assets/audio-esperanza.wav",
];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
        )
      )
  );
  self.clients.claim();
});
self.addEventListener("fetch", (e) => {
  const r = e.request;
  if (
    r.mode === "navigate" ||
    (r.headers.get("accept") || "").includes("text/html")
  ) {
    e.respondWith(
      fetch(r)
        .then((res) => {
          caches.open(CACHE_NAME).then((c) => c.put(OFFLINE_URL, res.clone()));
          return res;
        })
        .catch(() => caches.match(OFFLINE_URL))
    );
    return;
  }
  e.respondWith(caches.match(r).then((c) => c || fetch(r)));
});
