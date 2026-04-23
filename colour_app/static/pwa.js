// Toggle Menu Mobile
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Registro do Service Worker para PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('static/pwa_sw.js')
            .then(reg => console.log('SW registrado!', reg))
            .catch(err => console.log('Falha ao registrar SW', err));
    });
}