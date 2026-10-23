function setStatus(element, message, state) {
    if (!element) {
        return;
    }
    element.textContent = message;
    element.dataset.state = state;
}

export function initConfig() {
    const form = document.getElementById('configForm');
    if (!form) {
        return;
    }

    const interval = document.getElementById('interval');
    const temp = document.getElementById('temp');
    const hum = document.getElementById('hum');
    const reset = document.getElementById('resetConfig');
    const status = document.getElementById('config-status');

    async function load() {
        try {
            const response = await fetch('/config-data');
            if (!response.ok) {
                throw new Error('Não foi possível carregar a configuração');
            }
            const config = await response.json();
            if (interval) interval.value = config.update_interval ?? 3;
            if (temp) temp.value = config.temp_threshold ?? 0;
            if (hum) hum.value = config.humidity_threshold ?? 0;
        } catch (error) {
            setStatus(status, error.message, 'error');
        }
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        setStatus(status, 'A guardar…', '');

        const payload = {
            update_interval: Number.parseInt(interval?.value ?? '3', 10),
            temp_threshold: Number.parseInt(temp?.value ?? '0', 10),
            humidity_threshold: Number.parseInt(hum?.value ?? '0', 10),
        };

        try {
            const response = await fetch('/config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                throw new Error('Falha ao guardar a configuração');
            }
            setStatus(status, 'Configuração guardada.', 'ok');
        } catch (error) {
            setStatus(status, error.message, 'error');
        }
    });

    reset?.addEventListener('click', async () => {
        setStatus(status, 'A repor…', '');
        try {
            const response = await fetch('/reset-config', { method: 'POST' });
            if (!response.ok) {
                throw new Error('Falha ao repor a configuração');
            }
            await load();
            setStatus(status, 'Configuração reposta.', 'ok');
        } catch (error) {
            setStatus(status, error.message, 'error');
        }
    });

    load();
}
