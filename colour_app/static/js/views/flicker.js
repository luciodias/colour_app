import { channelValue, flickerStatus, formatNumber } from '../sensor-data.js';
import { renderFlicker } from '../charts.js';

const WINDOW_MS = 60000;

export function initFlicker() {
    const fdEl = document.getElementById('flicker-fd');
    const statusEl = document.getElementById('flicker-status');
    const countEl = document.getElementById('flicker-count');
    const chart = document.getElementById('flicker-chart');
    const samples = [];

    function update(data) {
        const fd = channelValue(data, 'fd');
        const now = Date.now();

        if (fd !== null) {
            samples.push({ timestamp: now, value: fd });
        }

        const cutoff = now - WINDOW_MS;
        while (samples.length > 0 && samples[0].timestamp < cutoff) {
            samples.shift();
        }

        const status = flickerStatus(fd);
        if (fdEl) {
            fdEl.textContent = formatNumber(fd, 0);
        }
        if (statusEl) {
            statusEl.textContent = status.label;
            statusEl.dataset.state = status.state;
        }
        if (countEl) {
            countEl.textContent = String(samples.length);
        }

        renderFlicker(chart, samples);
    }

    return { update };
}
