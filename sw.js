const staticAssets = [
    './',
    './assets/css/bootswatch.css',
    './assets/css/styles.css',
    './app.js'
];
self.addEventListener('install', async e => {
    const cache = await caches.open('news-static');
    cache.addAll(staticAssets);
});

self.addEventListener('fetch', e => {
    console.log('Fetching');
    const req = e.request;
    e.respondWith(cacheFirst(req));
});

async function cacheFirst(req) {
    const cachedResponse = await caches.match(req);
    return cachedResponse || fetch(req);
}