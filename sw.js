const staticAssets = [
    './',
    './assets/css/bootswatch.css',
    './assets/css/styles.css',
    './app.js',
    './assets/images/noimage.jpg'
];
self.addEventListener('install', async e => {
    const cache = await caches.open('news-static');
    cache.addAll(staticAssets);
});

self.addEventListener('fetch', e => {
    const req = e.request;
    e.respondWith(cacheFirst(req));
});

async function cacheFirst(req) {
    const cachedResponse = await caches.match(req);
    return cachedResponse || fetch(req);
}