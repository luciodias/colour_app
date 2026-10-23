export function wsUrl(path = '/ws') {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    return `${protocol}//${window.location.host}${path}`;
}

export class SensorSocket {
    constructor({ url = wsUrl(), interval = 2000, onMeasurement, onError, onStatus } = {}) {
        this.url = url;
        this.interval = interval;
        this.onMeasurement = onMeasurement || (() => {});
        this.onError = onError || (() => {});
        this.onStatus = onStatus || (() => {});
        this.socket = null;
        this.pollTimer = null;
        this.reconnectTimer = null;
        this.attempt = 0;
        this.stopped = false;
    }

    connect() {
        if (this.stopped || this.socket) {
            return;
        }

        this.onStatus('connecting');
        let socket;
        try {
            socket = new WebSocket(this.url);
        } catch (error) {
            this.onStatus('offline');
            this.onError(error);
            this.scheduleReconnect();
            return;
        }
        this.socket = socket;

        socket.addEventListener('open', () => {
            this.attempt = 0;
            this.onStatus('connected');
            this.request();
            this.startPolling();
        });

        socket.addEventListener('message', (event) => {
            this.handleMessage(event.data);
        });

        socket.addEventListener('error', () => {
            this.onStatus('offline');
        });

        socket.addEventListener('close', () => {
            this.stopPolling();
            this.socket = null;
            if (this.stopped) {
                return;
            }
            this.onStatus('offline');
            this.scheduleReconnect();
        });
    }

    handleMessage(raw) {
        let message;
        try {
            message = JSON.parse(raw);
        } catch {
            return;
        }

        if (message && message.type === 'measurement') {
            this.onMeasurement(message.data || {});
            return;
        }

        if (message && message.type === 'error') {
            this.onError(message.error || 'Erro desconhecido');
        }
    }

    request() {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify({ cmd: 'measure' }));
        }
    }

    startPolling() {
        this.stopPolling();
        this.pollTimer = window.setInterval(() => this.request(), this.interval);
    }

    stopPolling() {
        if (this.pollTimer !== null) {
            window.clearInterval(this.pollTimer);
            this.pollTimer = null;
        }
    }

    scheduleReconnect() {
        if (this.stopped || this.reconnectTimer !== null) {
            return;
        }
        const delay = Math.min(30000, 1000 * 2 ** this.attempt);
        this.attempt += 1;
        this.reconnectTimer = window.setTimeout(() => {
            this.reconnectTimer = null;
            this.connect();
        }, delay);
    }

    stop() {
        this.stopped = true;
        this.stopPolling();
        if (this.reconnectTimer !== null) {
            window.clearTimeout(this.reconnectTimer);
            this.reconnectTimer = null;
        }
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
    }
}
