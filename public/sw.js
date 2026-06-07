self.addEventListener("install", (event) => {
  event.waitUntil(caches.open("ray-cake-pos-v1").then((cache) => cache.addAll(["/", "/pos"])));
});

self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
