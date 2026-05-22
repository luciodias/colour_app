# Colour Monitoring Application

Aplicação IoT para monitoramento espectral de cores usando sensor **AS7341** em **ESP32 com MicroPython**. Utiliza o framework **Microdot** para servir dashboards web, PWA e API REST com HTTPS.

## Funcionalidades

- **Sensor AS7341**: Medição espectral em 11 canais (F1-F8, clear, NIR, flicker detection) via I2C
- **Servidor HTTPS**: Microdot com TLS nas portas 443 (ESP32) ou 4443 (CPython)
- **PWA**: Interface web progressiva com service worker e manifesto
- **WiFi Inteligente**: Scan de redes, conexão automática à de melhor sinal, notificação via ntfy.sh
- **WebSocket**: Endpoint `/ws` para comunicação em tempo real
- **Configuração**: Página `/config` para ajuste de parâmetros
- **Dual-platform**: Compatível com MicroPython (ESP32) e CPython (desenvolvimento/testes)

## Estrutura

```
.
├── colour_app/
│   ├── app.py              # Servidor web Microdot (rotas, TLS, CORS)
│   ├── sensor.py           # Driver do sensor AS7341 (medições assíncronas)
│   ├── boot.py             # Boot do ESP32 (WiFi, AP, notificação)
│   ├── env.py              # Credenciais WiFi e API de notificação
│   ├── libs/
│   │   ├── as7341/         # Biblioteca do sensor AS7341
│   │   ├── microdot/       # Micro web framework
│   │   ├── utemplate/      # Template engine
│   │   └── tools/          # Utilitários (typing)
│   ├── templates/          # HTML templates (dashboard, config, pwa)
│   ├── static/             # Assets (CSS, JS, service worker, ícones)
│   └── certs/              # Certificados TLS (cert.pem, key.pem)
├── tests/                  # Testes com pytest
├── tools/
│   └── build.py            # Compila .py para .mpy (bytecode MicroPython)
├── config.json             # Configurações persistentes
└── pyproject.toml          # Dependências e tooling
```

## Setup e Instalação

### Dependências

```bash
poetry install
```

### Desenvolvimento (CPython)

```bash
poetry run python colour_app/app.py
```

Servidor HTTPS inicia em `https://127.0.0.1:4443/`.

### ESP32 (MicroPython)

1. Compilar para bytecode:
   ```bash
   poetry run task build
   ```
2. Enviar conteúdo da pasta `build/` para o ESP32 via mpremote ou WebREPL.

## Endpoints

| Rota | Método | Descrição |
|---|---|---|
| `/` | GET | PWA principal |
| `/dashboard` | GET | Dashboard de monitoramento |
| `/config` | GET/POST | Página e API de configuração |
| `/config-data` | GET | Retorna configurações atuais (JSON) |
| `/measure` | GET | Medições do sensor AS7341 (JSON) |
| `/ws` | WebSocket | Comunicação bidirecional em tempo real |
| `/reset-config` | POST | Restaura configuração padrão |
| `/static/*` | GET | Arquivos estáticos |

## Testes

```bash
poetry run task test
```

## Build (MicroPython)

```bash
poetry run task build
```

Compila todos os `.py` para `.mpy` usando `mpy-cross`, ignorando arquivos já atualizados.

## Tooling

- **Poetry** — dependências e ambiente
- **pytest** + **pytest-cov** — testes com cobertura
- **ruff** — lint e formatação
- **taskipy** — automação de tarefas
- **esptool / mpremote / mpy-cross** — toolchain ESP32
