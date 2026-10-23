const SVG_NS = 'http://www.w3.org/2000/svg';

function clearDrawing(svg) {
    svg.querySelectorAll('[data-drawing]').forEach((node) => node.remove());
}

function element(name, attributes = {}) {
    const node = document.createElementNS(SVG_NS, name);
    for (const [key, value] of Object.entries(attributes)) {
        node.setAttribute(key, String(value));
    }
    return node;
}

function text(svg, x, y, content, attributes = {}) {
    const node = element('text', { x, y, ...attributes });
    node.textContent = content;
    svg.appendChild(node);
    return node;
}

function emptyMessage(svg, message) {
    text(svg, 310, 130, message, {
        'text-anchor': 'middle',
        'data-drawing': 'empty',
    }).setAttribute('data-drawing', 'empty');
}

export function renderSpectrum(svg, channels) {
    if (!svg) {
        return;
    }
    clearDrawing(svg);

    const labels = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'Clear', 'NIR'];
    const values = labels.map((label) => {
        const channel = channels?.[label];
        return Number.isFinite(Number(channel)) ? Math.max(0, Number(channel)) : 0;
    });

    if (values.every((value) => value === 0)) {
        emptyMessage(svg, 'Sem leituras');
        return;
    }

    const width = 620;
    const height = 260;
    const margin = { top: 20, right: 14, bottom: 46, left: 46 };
    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;
    const max = Math.max(...values, 1);
    const barGap = 8;
    const barWidth = (plotWidth - barGap * (values.length - 1)) / values.length;
    const baseY = margin.top + plotHeight;

    for (let i = 0; i <= 4; i += 1) {
        const y = margin.top + (plotHeight * i) / 4;
        const line = element('line', {
            x1: margin.left,
            x2: margin.left + plotWidth,
            y1: y,
            y2: y,
            class: 'grid',
            'data-drawing': 'grid',
        });
        svg.appendChild(line);
        text(svg, margin.left - 8, y + 4, Math.round(max - (max * i) / 4), {
            'text-anchor': 'end',
            'data-drawing': 'grid-label',
        });
    }

    values.forEach((value, index) => {
        const barHeight = (value / max) * plotHeight;
        const x = margin.left + index * (barWidth + barGap);
        const label = labels[index];
        const bar = element('rect', {
            x,
            y: baseY - barHeight,
            width: barWidth,
            height: Math.max(1, barHeight),
            rx: 4,
            class: label === 'Clear' ? 'bar clear' : label === 'NIR' ? 'bar nir' : 'bar',
            'data-drawing': 'bar',
        });
        svg.appendChild(bar);
        text(svg, x + barWidth / 2, height - 22, label, {
            'text-anchor': 'middle',
            'data-drawing': 'label',
        });
    });
}

export function renderFlicker(svg, samples) {
    if (!svg) {
        return;
    }
    clearDrawing(svg);

    if (!samples || samples.length === 0) {
        emptyMessage(svg, 'Sem amostras');
        return;
    }

    const width = 620;
    const height = 260;
    const margin = { top: 20, right: 16, bottom: 38, left: 50 };
    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;
    const now = Date.now();
    const windowMs = 60000;
    const maxValue = Math.max(1, ...samples.map((sample) => sample.value));

    for (let i = 0; i <= 4; i += 1) {
        const y = margin.top + (plotHeight * i) / 4;
        svg.appendChild(
            element('line', {
                x1: margin.left,
                x2: margin.left + plotWidth,
                y1: y,
                y2: y,
                class: 'grid',
                'data-drawing': 'grid',
            }),
        );
        text(svg, margin.left - 8, y + 4, Math.round(maxValue - (maxValue * i) / 4), {
            'text-anchor': 'end',
            'data-drawing': 'grid-label',
        });
    }

    const points = samples.map((sample) => {
        const age = Math.max(0, now - sample.timestamp);
        const x = margin.left + plotWidth * (1 - age / windowMs);
        const y = margin.top + plotHeight * (1 - sample.value / maxValue);
        return { x, y };
    });

    const path = points
        .map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x.toFixed(1)},${point.y.toFixed(1)}`)
        .join(' ');

    svg.appendChild(
        element('path', {
            d: path,
            class: 'series',
            'data-drawing': 'series',
        }),
    );

    const latest = points[points.length - 1];
    if (latest) {
        svg.appendChild(
            element('circle', {
                cx: latest.x,
                cy: latest.y,
                r: 4,
                class: 'series-point',
                'data-drawing': 'point',
            }),
        );
    }

    text(svg, margin.left + plotWidth, height - 12, 'agora', {
        'text-anchor': 'end',
        'data-drawing': 'label',
    });
    text(svg, margin.left, height - 12, '−60s', {
        'text-anchor': 'start',
        'data-drawing': 'label',
    });
}
