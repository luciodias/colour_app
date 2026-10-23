const PLOT = {
    left: 7,
    top: 3,
    width: 90,
    height: 90,
    maxX: 0.8,
    maxY: 0.9,
};

function statusLabel(status) {
    if (status === 'CCT inside') {
        return 'Dentro do intervalo';
    }
    if (status === 'CCT outside range') {
        return 'Fora do intervalo';
    }
    return '—';
}

export function initCie() {
    const marker = document.getElementById('cie-marker');
    const xEl = document.getElementById('cie-x');
    const yEl = document.getElementById('cie-y');
    const cctEl = document.getElementById('cie-cct');
    const statusEl = document.getElementById('cie-cct-status');
    const luxEl = document.getElementById('cie-lux');
    const readout = document.getElementById('cie-readout');

    function update(analysis) {
        const valid =
            analysis &&
            Number.isFinite(analysis.x) &&
            Number.isFinite(analysis.y) &&
            analysis.x > 0 &&
            analysis.y > 0 &&
            analysis.x < 1 &&
            analysis.y < 1;

        if (!valid) {
            if (marker) {
                marker.hidden = true;
            }
            if (xEl) xEl.textContent = '—';
            if (yEl) yEl.textContent = '—';
            if (cctEl) cctEl.textContent = '—';
            if (statusEl) statusEl.textContent = '—';
            if (luxEl) luxEl.textContent = '—';
            if (readout) readout.textContent = 'Sem leitura cromática';
            return;
        }

        if (marker) {
            marker.hidden = false;
            marker.style.left = `${PLOT.left + (analysis.x / PLOT.maxX) * PLOT.width}%`;
            marker.style.top = `${PLOT.top + (1 - analysis.y / PLOT.maxY) * PLOT.height}%`;
        }

        if (xEl) xEl.textContent = analysis.x.toFixed(4);
        if (yEl) yEl.textContent = analysis.y.toFixed(4);
        if (cctEl) cctEl.textContent = `${Math.round(analysis.CCT)} K`;
        if (statusEl) statusEl.textContent = statusLabel(analysis.CCT_Status);
        if (luxEl) luxEl.textContent = `${Math.round(analysis.Lux)} lx`;
        if (readout) {
            readout.textContent = `x = ${analysis.x.toFixed(4)}, y = ${analysis.y.toFixed(4)}, CCT = ${Math.round(analysis.CCT)} K`;
        }
    }

    return { update };
}
