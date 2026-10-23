import { CHANNELS, channelValue, formatNumber } from '../sensor-data.js';
import { renderSpectrum } from '../charts.js';

export function initOverview() {
    const lux = document.getElementById('metric-lux');
    const total = document.getElementById('metric-total');
    const fd = document.getElementById('metric-fd');
    const chart = document.getElementById('spectrum-chart');

    function update(data, analysis) {
        const normalized = {};
        for (const channel of CHANNELS) {
            const value = channelValue(data, channel.key);
            normalized[channel.calibration] = value;
        }

        if (lux) {
            lux.textContent = analysis ? formatNumber(analysis.Lux, 0) : '—';
        }
        if (total) {
            const sum = Object.values(normalized).reduce(
                (accumulator, value) => accumulator + (Number.isFinite(value) ? value : 0),
                0,
            );
            total.textContent = formatNumber(sum, 0);
        }
        if (fd) {
            fd.textContent = formatNumber(channelValue(data, 'fd'), 0);
        }

        document.querySelectorAll('[data-channel]').forEach((cell) => {
            const key = cell.getAttribute('data-channel');
            cell.textContent = formatNumber(channelValue(data, key), 0);
        });

        renderSpectrum(chart, normalized);
    }

    return { update };
}
