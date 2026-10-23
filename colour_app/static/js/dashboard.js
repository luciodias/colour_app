import { processarAS7341 } from './calibration.js';
import { CHANNELS, channelValue, formatAge, normalizeChannels } from './sensor-data.js';
import { SensorSocket } from './ws.js';
import { initOverview } from './views/overview.js';
import { initCie } from './views/cie.js';
import { initFlicker } from './views/flicker.js';

const VIEWS = ['overview', 'cie', 'flicker'];

function analyze(data) {
    const normalized = normalizeChannels(data);
    const hasSignal = CHANNELS.some((channel) => (normalized[channel.calibration] || 0) > 0);
    if (!hasSignal) {
        return null;
    }
    try {
        return processarAS7341(normalized);
    } catch (error) {
        console.warn('Falha ao calcular cromaticidade', error);
        return null;
    }
}

function setupViews() {
    const tabs = Array.from(document.querySelectorAll('[data-view]'));

    function activate(name) {
        const view = VIEWS.includes(name) ? name : 'overview';
        for (const panel of document.querySelectorAll('.view-panel')) {
            panel.hidden = panel.id !== `view-${view}`;
        }
        for (const tab of tabs) {
            tab.setAttribute('aria-selected', String(tab.dataset.view === view));
        }
        document.body.dataset.view = view;
    }

    tabs.forEach((tab) => {
        tab.addEventListener('click', (event) => {
            event.preventDefault();
            const name = tab.dataset.view;
            if (window.location.hash !== `#${name}`) {
                window.history.replaceState(null, '', `#${name}`);
            }
            activate(name);
        });
    });

    window.addEventListener('hashchange', () => {
        activate(window.location.hash.replace('#', ''));
    });

    activate(window.location.hash.replace('#', ''));
}

async function loadInterval() {
    try {
        const response = await fetch('/config-data');
        if (!response.ok) {
            return 2000;
        }
        const config = await response.json();
        const seconds = Number(config.update_interval);
        if (!Number.isFinite(seconds)) {
            return 2000;
        }
        return Math.min(60000, Math.max(1000, seconds * 1000));
    } catch {
        return 2000;
    }
}

export async function initDashboard() {
    setupViews();

    const overview = initOverview();
    const cie = initCie();
    const flicker = initFlicker();
    const badge = document.getElementById('connection-status');
    let lastMeasurementAt = null;

    const setStatus = (state, label) => {
        if (!badge) {
            return;
        }
        badge.dataset.state = state;
        badge.textContent = label;
    };

    const updateAges = () => {
        const now = Date.now();
        const age = formatAge(lastMeasurementAt, now);
        const metricAge = document.getElementById('metric-age');
        const flickerAge = document.getElementById('flicker-age');
        if (metricAge) {
            metricAge.textContent = age;
        }
        if (flickerAge) {
            flickerAge.textContent = age;
        }
    };

    const interval = await loadInterval();
    const socket = new SensorSocket({
        interval,
        onStatus(state) {
            if (state === 'connected') {
                setStatus('connected', 'Ligado');
            } else if (state === 'connecting') {
                setStatus('connecting', 'A ligar…');
            } else {
                setStatus('offline', 'Sem ligação');
            }
        },
        onMeasurement(data) {
            lastMeasurementAt = Date.now();
            const analysis = analyze(data);
            overview.update(data, analysis);
            cie.update(analysis);
            flicker.update(data);
            updateAges();
            setStatus('connected', 'Ligado');
        },
        onError(error) {
            console.warn('Erro de medição', error);
            setStatus('error', typeof error === 'string' ? error : 'Erro de leitura');
        },
    });

    socket.connect();
    window.setInterval(updateAges, 1000);
    window.addEventListener('beforeunload', () => socket.stop());
}
