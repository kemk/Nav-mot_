/* Moto Solo Lite — service worker
 * Réseau d'abord (les mises à jour arrivent tout de suite), cache en secours.
 * Les tuiles de carte, la recherche d'adresse et les itinéraires ne sont jamais mis en cache. */
const V = 'msl-v7';
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png'];
const LIBS = ['cdnjs.cloudflare.com', 'fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== V).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
async function netFirst(req) {
  const cache = await caches.open(V);
  try {
    const res = await Promise.race([fetch(req), new Promise((_, rej) => setTimeout(rej, 4000))]);
    if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone());
    return res;
  } catch (err) {
    return (await cache.match(req)) || (req.mode === 'navigate' && (await cache.match('./'))) || Response.error();
  }
}
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const u = new URL(req.url);
  if (u.origin === location.origin || LIBS.includes(u.hostname)) e.respondWith(netFirst(req));
});
