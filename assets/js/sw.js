const staticAssets = [
    '/',
    '/assets/css/bootswatch.css',
    '/assets/css/styles.css',
    '/assets/js/app.js'
];
self.addEventListener('install', async e => {
    const cache = await caches.open('news-static');
    cache.addAll(staticAssets);
});

self.addEventListener('fetch', e => {
    console.log('fetch');
});