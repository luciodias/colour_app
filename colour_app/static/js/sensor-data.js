export const CHANNELS = [
    { key: 'f1', label: 'F1', calibration: 'F1' },
    { key: 'f2', label: 'F2', calibration: 'F2' },
    { key: 'f3', label: 'F3', calibration: 'F3' },
    { key: 'f4', label: 'F4', calibration: 'F4' },
    { key: 'f5', label: 'F5', calibration: 'F5' },
    { key: 'f6', label: 'F6', calibration: 'F6' },
    { key: 'f7', label: 'F7', calibration: 'F7' },
    { key: 'f8', label: 'F8', calibration: 'F8' },
    { key: 'clr', label: 'Clear', calibration: 'Clear' },
    { key: 'nir', label: 'NIR', calibration: 'NIR' },
];

export function channelValue(data, key) {
    if (!data || typeof data !== 'object') {
        return null;
    }
    const lower = key.toLowerCase();
    const upper = key.toUpperCase();
    const value = data[lower] ?? data[upper];
    if (value === undefined || value === null || value === '') {
        return null;
    }
    const number = Number(value);
    return Number.isFinite(number) ? number : null;
}

export function normalizeChannels(data) {
    const normalized = {};
    for (const channel of CHANNELS) {
        normalized[channel.calibration] = channelValue(data, channel.key) ?? 0;
    }
    return normalized;
}

export function formatNumber(value, digits = 0) {
    if (value === null || value === undefined || !Number.isFinite(Number(value))) {
        return '—';
    }
    return Number(value).toLocaleString('pt-PT', {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
    });
}

export function formatAge(timestamp, now = Date.now()) {
    if (!timestamp) {
        return '—';
    }
    const seconds = Math.max(0, Math.round((now - timestamp) / 1000));
    if (seconds < 1) {
        return 'agora';
    }
    if (seconds < 60) {
        return `há ${seconds}s`;
    }
    const minutes = Math.floor(seconds / 60);
    return `há ${minutes}min`;
}

export function flickerStatus(value) {
    if (value === null || value === undefined || !Number.isFinite(Number(value))) {
        return { label: 'Sem dados', state: 'unavailable' };
    }
    const fd = Number(value);
    if (fd <= 0) {
        return { label: 'Sem flicker detetado', state: 'quiet' };
    }
    if (fd < 100) {
        return { label: 'Flicker fraco', state: 'detected' };
    }
    return { label: 'Flicker forte', state: 'strong' };
}
