import { initNav } from './nav.js';

initNav();

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/static/js/pwa_sw.js')
            .then((reg) => console.log('SW registrado!', reg))
            .catch((err) => console.log('Falha ao registrar SW', err));
    });
}
