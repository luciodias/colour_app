const CACHE_NAME = 'site-v1';
const ASSETS = [
    '/',
 // '/index.html',
    'static/img/favicon.ico',
    '/static/css/styles.css',
    '/static/css/pwa.css',
    '/static/css/svg.css',
    '/static/js/pwa.js',
    '/static/manifest.json',
    '/static/img/prisma.svg',
    '/static/chart.html',
    '/static/arco_iris.html',
];

// Instalação: Cacheia arquivos estáticos
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ASSETS);
        })
    );
});

// Estratégia Stale-While-Revalidate: Serve do cache e atualiza em segundo plano
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            const fetchPromise = fetch(event.request).then(networkResponse => {
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, networkResponse.clone());
                });
                return networkResponse;
            });
            return response || fetchPromise;
        })
    );
});