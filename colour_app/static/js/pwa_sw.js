const CACHE_NAME = 'colour-app-v2';
const ASSETS = [
    '/',
    '/dashboard',
    '/config',
    '/static/css/styles.css',
    '/static/css/dashboard.css',
    '/static/js/main.js',
    '/static/js/pwa.js',
    '/static/js/nav.js',
    '/static/js/dashboard.js',
    '/static/js/config.js',
    '/static/js/ws.js',
    '/static/js/sensor-data.js',
    '/static/js/charts.js',
    '/static/js/calibration.js',
    '/static/js/views/overview.js',
    '/static/js/views/cie.js',
    '/static/js/views/flicker.js',
    '/static/manifest.json',
    '/static/img/favicon.ico',
    '/static/img/icon-192.png',
    '/static/img/icon-512.png',
    '/static/img/icon-maskable-512.png',
];

const NETWORK_ONLY = ['/ws', '/measure', '/config-data'];

self.addEventListener('install', (event) => {
    event.waitUntil(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            await cache.addAll(ASSETS);
            await self.skipWaiting?.();
        })(),
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        (async () => {
            const keys = await caches.keys();
            await Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)));
            await self.clients?.claim?.();
        })(),
    );
});

async function networkFirst(request) {
    try {
        const response = await fetch(request);
        if (response && response.ok) {
            const cache = await caches.open(CACHE_NAME);
            await cache.put(request, response.clone());
        }
        return response;
    } catch {
        const cached = await caches.match(request);
        return cached || caches.match('/');
    }
}

async function staleWhileRevalidate(request) {
    const cached = await caches.match(request);
    const network = fetch(request)
        .then(async (response) => {
            if (response && response.ok) {
                const cache = await caches.open(CACHE_NAME);
                await cache.put(request, response.clone());
            }
            return response;
        })
        .catch(() => null);
    return cached || network;
}

self.addEventListener('fetch', (event) => {
    const request = event.request;
    if (!request || request.method !== 'GET') {
        return;
    }

    const url = new URL(request.url);
    if (url.origin !== self.location.origin) {
        return;
    }
    if (NETWORK_ONLY.includes(url.pathname)) {
        return;
    }

    if (request.mode === 'navigate') {
        event.respondWith(networkFirst(request));
        return;
    }

    if (url.pathname.startsWith('/static/')) {
        event.respondWith(staleWhileRevalidate(request));
    }
});
