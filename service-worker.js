const CACHE_NAME = "bubble-game-v1";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./src/main.js",
  "./src/scenes/BootScene.js",
  "./src/scenes/PreloaderScene.js",
  "./src/scenes/GameScene.js",
  "./src/game/Bubble.js",
  "./src/game/PlayerBubble.js",
  "./src/game/EnemyBubble.js",
  "./src/game/ShrinkBubble.js",
  "./src/ui/HUD.js",
  "./assets/audio/pop.wav",
  "./assets/audio/explosion.wav",
  "./assets/audio/fanfare.wav",
  "./assets/audio/shrink.wav",
  "./assets/images/logo.svg",
  "./assets/images/icon-192.svg",
  "./assets/images/icon-512.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key)),
      ),
    ),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        return cached;
      }
      return fetch(event.request);
    }),
  );
});
