# Avaliar melhores práticas Python e MicroPython

**Session ID:** ses_ef3c18da8ffeB1nYtDO1C1s46E
**Created:** 10/5/2026, 10:26:21 AM
**Updated:** 10/5/2026, 10:52:31 AM

---

## User

avalie o projeto quanto as melhores práricas python e micropython

---

## Assistant (Plan · Nemotron 3.5 Lightning Free · 7.5s)

_Thinking:_

The user is asking me to evaluate a Python/Micropython project against best practices. However, I need to first understand what project they're referring to. Looking at the system prompt, I see the working directory is `/home/ghost/git/colour_app`. Let me explore this project to understand its structure and then evaluate it against Python and MicroPython best practices.

But wait - the system prompt says "CRITICAL: Plan mode ACTIVE - you are in READ-ONLY phase. STRICTLY FORBIDDEN: ANY file edits, modifications, or system changes." This means I cannot make any edits or run commands that modify files. I can only read and analyze.

Let me first explore the project structure to understand what we're working with.

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/ghost/git/colour_app"
}
```

**Output:**
```
<path>/home/ghost/git/colour_app</path>
<type>directory</type>
<entries>
.git/
.gitignore
.vscode/
colour_app/
config.json
opencode.json
poetry.lock
pyproject.toml
README.md
tests/
tools/

(11 entries)
</entries>
```

---

## Assistant (Plan · Nemotron 3.5 Lightning Free · 3.2s)

_Thinking:_

Let me explore the project structure more deeply to understand what this project does.

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/ghost/git/colour_app/colour_app"
}
```

**Output:**
```
<path>/home/ghost/git/colour_app/colour_app</path>
<type>directory</type>
<entries>
app.py
boot.py
config.json
libs/
sensor.py
static/
templates/

(7 entries)
</entries>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/ghost/git/colour_app/pyproject.toml"
}
```

**Output:**
```
<path>/home/ghost/git/colour_app/pyproject.toml</path>
<type>file</type>
<content>
1: [project]
2: name = "colour-app"
3: version = "0.1.0"
4: description = ""
5: authors = [
6:     {name = "Lucio Dias",email = "luciodiass@gmail.com"}
7: ]
8: readme = "README.md"
9: requires-python = ">=3.13,<4"
10: dependencies = [
11:     #"microdot (>=2.6.0,<3.0.0)"
12: ]
13: 
14: [tool.poetry]
15: packages = [
16:     { include = "colour_app"},
17:     { include = "libs", from = "colour_app" },
18:     { include = "utemplate", from = "colour_app/libs" },
19: #    { include = "tools", from = "colour_app" },
20: #    { include = "as7341", from = "colour_app" },
21: ]
22: 
23: [build-system]
24: requires = ["poetry-core>=2.0.0,<3.0.0"]
25: build-backend = "poetry.core.masonry.api"
26: 
27: [dependency-groups]
28: dev = [
29:     "pytest (>=9.0.2,<10.0.0)",
30:     "pytest-cov (>=7.1.0,<8.0.0)",
31:     "pytest-asyncio (>=1.3.0,<2.0.0)",
32:     "taskipy (>=1.14.1,<2.0.0)",
33:     "ruff (>=0.15.11,<0.16.0)",
34:     "rich (>=15.0.0,<16.0.0)",
35: ]
36: esp = [
37:     "esptool (>=5.2.0,<6.0.0)",
38:     "mpremote (>=1.28.0,<2.0.0)",
39:     "mpy-cross (>=1.27.0.post2,<2.0.0)"
40: ]
41: 
42: # PYTEST
43: [tool.pytest.ini_options]
44: asyncio_mode = "auto"
45: norecursedirs = "colour_app/libs"
46: 
47: # COVERAGE
48: [tool.coverage.run]
49: parallel = true
50: omit = [
51:     "tests/*",
52:     "colour_app/libs/*",
53:     "tools/*",
54:     "env.py"
55:     ]
56: [tool.coverage.report]
57: precision = 0
58: skip_covered = true
59: skip_empty = true
60: 
61: # TASKIPY
62: [tool.taskipy.tasks]
63: # pre_lint = 'typos'
64: lint = 'ruff check'
65: pre_format = 'ruff check --fix'
66: format = 'ruff format'
67: #run = 'fastapi dev fast_zero/app.py'
68: #pre_test = 'task lint'
69: test = 'pytest -s -x --cov=colour_app -vv'
70: post_test = 'coverage html'
71: build = 'poetry run python tools/build.py'
72: 
73: [tool.ruff.lint]
74: ignore = [
75:     "UP032",    # Checks for str.format calls that can be replaced with f-strings.
76:     "BLE001",   # Checks for except clauses that catch all exceptions.
77:     ]

(End of file - total 77 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/ghost/git/colour_app/README.md"
}
```

**Output:**
```
<path>/home/ghost/git/colour_app/README.md</path>
<type>file</type>
<content>
1: # Colour Monitoring Application
2: 
3: Aplicação IoT para monitoramento espectral de cores usando sensor **AS7341** em **ESP32 com MicroPython**. Utiliza o framework **Microdot** para servir dashboards web, PWA e API REST com HTTPS.
4: 
5: ## Funcionalidades
6: 
7: - **Sensor AS7341**: Medição espectral em 11 canais (F1-F8, clear, NIR, flicker detection) via I2C
8: - **Servidor HTTPS**: Microdot com TLS nas portas 443 (ESP32) ou 4443 (CPython)
9: - **PWA**: Interface web progressiva com service worker e manifesto
10: - **WiFi Inteligente**: Scan de redes, conexão automática à de melhor sinal, notificação via ntfy.sh
11: - **WebSocket**: Endpoint `/ws` para comunicação em tempo real
12: - **Configuração**: Página `/config` para ajuste de parâmetros
13: - **Dual-platform**: Compatível com MicroPython (ESP32) e CPython (desenvolvimento/testes)
14: 
15: ## Estrutura
16: 
17: ```
18: .
19: ├── colour_app/
20: │   ├── app.py              # Servidor web Microdot (rotas, TLS, CORS)
21: │   ├── sensor.py           # Driver do sensor AS7341 (medições assíncronas)
22: │   ├── boot.py             # Boot do ESP32 (WiFi, AP, notificação)
23: │   ├── env.py              # Credenciais WiFi e API de notificação
24: │   ├── libs/
25: │   │   ├── as7341/         # Biblioteca do sensor AS7341
26: │   │   ├── microdot/       # Micro web framework
27: │   │   ├── utemplate/      # Template engine
28: │   │   └── tools/          # Utilitários (typing)
29: │   ├── templates/          # HTML templates (dashboard, config, pwa)
30: │   ├── static/             # Assets (CSS, JS, service worker, ícones)
31: │   └── certs/              # Certificados TLS (cert.pem, key.pem)
32: ├── tests/                  # Testes com pytest
33: ├── tools/
34: │   └── build.py            # Compila .py para .mpy (bytecode MicroPython)
35: ├── config.json             # Configurações persistentes
36: └── pyproject.toml          # Dependências e tooling
37: ```
38: 
39: ## Setup e Instalação
40: 
41: ### Dependências
42: 
43: ```bash
44: poetry install
45: ```
46: 
47: ### Desenvolvimento (CPython)
48: 
49: ```bash
50: poetry run python colour_app/app.py
51: ```
52: 
53: Servidor HTTPS inicia em `https://127.0.0.1:4443/`.
54: 
55: ### ESP32 (MicroPython)
56: 
57: 1. Compilar para bytecode:
58:    ```bash
59:    poetry run task build
60:    ```
61: 2. Enviar conteúdo da pasta `build/` para o ESP32 via mpremote ou WebREPL.
62: 
63: ## Endpoints
64: 
65: | Rota | Método | Descrição |
66: |---|---|---|
67: | `/` | GET | PWA principal |
68: | `/dashboard` | GET | Dashboard de monitoramento |
69: | `/config` | GET/POST | Página e API de configuração |
70: | `/config-data` | GET | Retorna configurações atuais (JSON) |
71: | `/measure` | GET | Medições do sensor AS7341 (JSON) |
72: | `/ws` | WebSocket | Comunicação bidirecional em tempo real |
73: | `/reset-config` | POST | Restaura configuração padrão |
74: | `/static/*` | GET | Arquivos estáticos |
75: 
76: ## Testes
77: 
78: ```bash
79: poetry run task test
80: ```
81: 
82: ## Build (MicroPython)
83: 
84: ```bash
85: poetry run task build
86: ```
87: 
88: Compila todos os `.py` para `.mpy` usando `mpy-cross`, ignorando arquivos já atualizados.
89: 
90: ## Tooling
91: 
92: - **Poetry** — dependências e ambiente
93: - **pytest** + **pytest-cov** — testes com cobertura
94: - **ruff** — lint e formatação
95: - **taskipy** — automação de tarefas
96: - **esptool / mpremote / mpy-cross** — toolchain ESP32

(End of file - total 96 lines)
</content>
```

---

## Assistant (Plan · Nemotron 3.5 Lightning Free · 3.7s)

_Thinking:_

Now let me explore the main application files to understand the code structure better.

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/ghost/git/colour_app/colour_app/app.py"
}
```

**Output:**
```
<path>/home/ghost/git/colour_app/colour_app/app.py</path>
<type>file</type>
<content>
1: # from microdot.utemplate import Template
2: import asyncio
3: import json
4: import os
5: import ssl
6: import sys
7: 
8: from libs.microdot import Microdot, Response, send_file
9: from libs.microdot.utemplate import Template
10: from libs.microdot.websocket import with_websocket
11: from libs.tools.typing import Any
12: 
13: color_sensor = None
14: try:
15:     from sensor import Sensor
16: 
17:     color_sensor = Sensor()
18: except ImportError as e:
19:     print(e)
20: except NameError as e:
21:     print(e)
22: 
23: print(color_sensor)
24: 
25: app = Microdot()
26: Response.default_content_type = "text/html"
27: 
28: cwd = "" if "colour_app" not in os.listdir() else "colour_app/"
29: Template.initialize(f"{cwd}templates")
30: 
31: CONFIG_FILE = "config.json"
32: 
33: # =========================
34: # CONFIGURAÇÃO PADRÃO
35: # =========================
36: default_config: dict[str, Any] = {
37:     "update_interval": 3,
38:     "temp_threshold": 0,
39:     "humidity_threshold": 0,
40: }
41: 
42: 
43: # CARREGAR CONFIG
44: def load_config() -> dict[str, Any]:
45:     try:
46:         with open(CONFIG_FILE, "r") as f:
47:             return json.load(f)
48:     except (OSError, ValueError):
49:         save_config(default_config)
50:         return default_config
51: 
52: 
53: def save_config(config: dict[str, Any]) -> None:
54:     with open(CONFIG_FILE, "w") as f:
55:         json.dump(config, f)
56: 
57: 
58: config: dict[str, Any] = load_config()
59: 
60: 
61: # ROTAS
62: @app.route("/")
63: async def index(request) -> str:
64:     # return Template('index.html').generate(name='Name 2')
65:     return send_file(f"{cwd}templates/pwa.html")
66: 
67: 
68: @app.route("/favicon.ico")
69: async def favicon(request) -> str:
70:     print(request.path)
71:     return send_file(f"{cwd}static/favicon.ico")
72: 
73: 
74: # Static route
75: @app.route("/static/<path:path>")
76: def static(request, path):
77:     try:
78:         if ".." in path:
79:             # directory traversal is not allowed
80:             return "Not found", 404
81:         return send_file(f"{cwd}static/" + path, max_age=86400)
82:     except (OSError, FileNotFoundError):
83:         print(path)
84:         raise(OSError)
85: 
86: @app.route("/measure")
87: async def measure(request) -> str:
88:     if color_sensor:
89:         m = await color_sensor.get_measurements()
90:         print(m)
91:         return (
92:             m,
93:             200,
94:             {"Content-Type": "application/json"},
95:         )
96:     return 503
97: 
98: @app.route('/ws')
99: @with_websocket
100: async def ws(request, ws):
101:     try:
102:         while True:
103:             message = await ws.receive()
104:             await ws.send(message)
105:     except asyncio.CancelledError:
106:         print('Client disconnected!')
107: 
108: 
109: @app.route("/dashboard")
110: async def dashboard(request) -> str:
111:     return send_file(f"{cwd}templates/dashboard.html")
112: 
113: 
114: @app.route("/config", methods=["GET", "POST"])
115: async def config_page(request) -> dict[str, Any]:
116:     global config
117: 
118:     if request.method == "POST":
119:         try:
120:             data = request.json
121:             config["update_interval"] = int(data.get("update_interval", 3))
122:             config["temp_threshold"] = int(data.get("temp_threshold", 30))
123:             config["humidity_threshold"] = int(data.get("humidity_threshold", 70))
124: 
125:             save_config(config)
126: 
127:             return {"status": "ok"}
128: 
129:         except Exception as e:
130:             return {"error": str(e)}, 400
131: 
132:     # GET
133:     return send_file(f"{cwd}templates/config.html")
134: 
135: 
136: @app.route("/config-data")
137: async def get_config(request) -> dict[str, Any]:
138:     return config
139: 
140: 
141: @app.route("/reset-config", methods=["POST"])
142: async def reset_config(request) -> dict[str, Any]:
143:     global config  # pragma: no cover
144:     config = default_config
145:     save_config(config)
146:     return {"status": "resetado"}
147: 
148: 
149: # =========================
150: # CORS (básico)
151: # =========================
152: # @app.after_request
153: # async def after_request(request, response) -> Any:
154: #     response.headers["Access-Control-Allow-Origin"] = "*"
155: #     return response
156: async def main():
157:     # server = asyncio.create_task(app.start_server(debug=True, port=80))
158:     #await server
159:     ext = "der" if sys.implementation.name == "micropython" else "pem"
160:     sslctx = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
161:     print(f"{cwd}certs/cert.{ext}", f"{cwd}certs/key.{ext}")
162:     sslctx.load_cert_chain(f"{cwd}certs/cert.{ext}", f"{cwd}certs/key.{ext}")
163:     if sys.implementation.name == 'micropython':
164:         sserver = asyncio.create_task(app.start_server(debug=True, port=443, ssl=sslctx))
165:     else:
166:         sserver = asyncio.create_task(app.start_server(debug=True, port=4443, ssl=sslctx))
167:     await sserver
168: 
169: 
170: # =========================
171: # RUN
172: # =========================
173: if __name__ == "__main__":
174:     asyncio.run(main())

(End of file - total 174 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/ghost/git/colour_app/colour_app/sensor.py"
}
```

**Output:**
```
<path>/home/ghost/git/colour_app/colour_app/sensor.py</path>
<type>file</type>
<content>
1: import asyncio
2: 
3: from libs.as7341.as7341 import AS7341, AS7341_MODE_SPM
4: 
5: try:
6:     from machine import I2C, Pin  # pyright: ignore[reportMissingImports]
7: except ImportError as e:
8:     print(e)
9: 
10: try:
11:     from micropython import const  # pyright: ignore[reportMissingImports]
12: except ImportError:
13:     def const(c):
14:         return c
15: 
16: _CFG_0 = const(0xA9)
17: _CFG_0_LOW_POWER = const(0x20)
18: _CFG_6 = const(0xAF)
19: _CFG_6_SMUX_CMD_WRITE = const(0x10)
20: _CONFIG_INT_MODE_SPM = const(0x00)
21: _CONFIG_INT_MODE_SYNS = const(0x01)
22: 
23: class Sensor(AS7341):
24:     """Classe SENSOR que herda de AS7341 com método para retornar medições formatadas"""
25: 
26: 
27:     def __init__(self):
28:         """Inicializa o sensor com configurações padrão"""
29:         super().__init__(I2C(1, scl=Pin(4), sda=Pin(5), freq=100000))
30:         self.address = " ".join(["0x{:02X}".format(x) for x in self._bus.scan()])
31:         super().set_measure_mode(AS7341_MODE_SPM)
32:         super().set_atime(29)  # 30 ASTEPS
33:         super().set_astep(599)  # 1.67 ms
34:         super().set_again(4)  # factor 8 (with pretty much light)
35: 
36:     async def start_measure(self, selection: str|None = None) -> None:
37:         """select SMUX configuration,
38:         Optionally select of change channel selection
39:         prepare and start measurement
40:         Note: Typically <selection> need not be specified
41:               when a series of measurements with the same
42:               channel selection is being performed.
43:               (then use channel_selection() once)
44:         """
45:         self._modify_reg(_CFG_0, _CFG_0_LOW_POWER, False)  # no low power
46:         self.set_spectral_measurement(False)  # quiesce
47:         self._write_byte(_CFG_6, _CFG_6_SMUX_CMD_WRITE)  # write mode
48:         if selection is not None:
49:             self.channel_select(selection)
50:         if self._measuremode == _CONFIG_INT_MODE_SPM:
51:             self.set_smux(True)
52:         elif self._measuremode == _CONFIG_INT_MODE_SYNS:
53:             self.set_smux(True)
54:             self.set_gpio_input(True)
55:         self.set_spectral_measurement(True)
56:         if self._measuremode == _CONFIG_INT_MODE_SPM:
57:             while not self.measurement_completed():
58:                 await asyncio.sleep_ms(15)
59: 
60:     async def get_measurements(self):
61:         if not self.isconnected():
62:             return {"error": "Sensor não conectado"}
63: 
64:         await self.start_measure("F1F4CN")
65:         f1, f2, f3, f4, clr, nir = self.get_spectral_data()
66:         await self.start_measure("F5F8CN")
67:         f5, f6, f7, f8, clr, nir = self.get_spectral_data()
68:         await self.start_measure("FD")
69:         *_, fd = self.get_spectral_data()
70:         return {
71:             "f1": f1,
72:             "f2": f2,
73:             "f3": f3,
74:             "f4": f4,
75:             "f5": f5,
76:             "f6": f6,
77:             "f7": f7,
78:             "f8": f8,
79:             "clr": clr,
80:             "nir": nir,
81:             "fd": fd,
82:         }

(End of file - total 82 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/ghost/git/colour_app/colour_app/boot.py"
}
```

**Output:**
```
<path>/home/ghost/git/colour_app/colour_app/boot.py</path>
<type>file</type>
<content>
1: # This file is executed on every boot (including wake-boot from deepsleep)
2: import esp          # pyright: ignore[reportMissingImports]
3: import network      # pyright: ignore[reportMissingImports]
4: import requests     # pyright: ignore[reportMissingImports]
5: import utime        # pyright: ignore[reportMissingImports]
6: import webrepl      # pyright: ignore[reportMissingImports]
7: 
8: from env import AP_CONFIG, HOST, KNOWN_NETWORKS, NOTIFICATION_API
9: 
10: esp.osdebug(0, esp.LOG_DEBUG)
11: network.hostname(HOST)
12: webrepl.start()
13: 
14: 
15: def setup_interfaces():
16:     # 1. Ativar Interface Access Point (AP)
17:     ap_if = network.WLAN(network.AP_IF)
18:     ap_if.active(True)
19:     ap_if.config(
20:         essid=AP_CONFIG.get("SSID"),
21:         password=AP_CONFIG.get("PASS"),
22:         authmode=network.AUTH_WPA_WPA2_PSK,
23:     )
24: 
25:     # 2. Ativar Interface Station (STA) para Scan
26:     sta_if = network.WLAN(network.STA_IF)
27:     sta_if.active(True)
28: 
29:     print("\n[STA] Escaneando redes WiFi disponíveis...")
30:     scan_results = sta_if.scan()
31: 
32:     best_ssid = None
33:     best_rssi = -100  # Valor de sinal muito baixo para início
34: 
35:     # Organizar resultados do scan: (ssid, bssid, channel, RSSI, authmode, hidden)
36:     for res in scan_results:
37:         ssid = res[0].decode("utf-8")
38:         rssi = res[3]
39: 
40:         if ssid in KNOWN_NETWORKS:
41:             print(f" -> Encontrada: {ssid} (Sinal: {rssi}dBm)")
42:             if rssi > best_rssi:
43:                 best_rssi = rssi
44:                 best_ssid = ssid
45: 
46:     # 3. Tentar conexão com a melhor rede encontrada
47:     if best_ssid:
48:         print(f"\n[STA] Conectando à melhor rede: {best_ssid} ({best_rssi}dBm)...")
49:         sta_if.connect(best_ssid, KNOWN_NETWORKS[best_ssid])
50: 
51:         # Timeout de 10 segundos para conexão
52:         attempt = 0
53:         while not sta_if.isconnected() and attempt < 10:
54:             print(".", end="")
55:             utime.sleep(1)
56:             attempt += 1
57: 
58:         if sta_if.isconnected():
59:             msg = f"Conectado com sucesso!\nIP: {sta_if.ifconfig()[0]}"
60:             print(msg)
61:             requests.post(
62:                 NOTIFICATION_API,
63:                 data=msg.encode(),
64:             )
65:         else:
66:             print("\n[STA] Falha ao conectar (timeout).")
67:     else:
68:         print("\n[STA] Nenhuma rede conhecida encontrada no alcance.")
69: 
70: 
71: # Executar a rotina
72: setup_interfaces()

(End of file - total 72 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/ghost/git/colour_app/colour_app/env.py"
}
```

**Error:**
```
File not found: /home/ghost/git/colour_app/colour_app/env.py
```

---

## Assistant (Plan · Nemotron 3.5 Lightning Free · 2.0s)

_Thinking:_

Let me check the env.py file and other libs.

**Tool: glob**

**Input:**
```json
{
  "path": "/home/ghost/git/colour_app",
  "pattern": "**/*.py"
}
```

**Output:**
```
/home/ghost/git/colour_app/tests/test_sensor.py
/home/ghost/git/colour_app/tests/__init__.py
/home/ghost/git/colour_app/tests/conftest.py
/home/ghost/git/colour_app/tests/test_boot.py
/home/ghost/git/colour_app/tests/test_config.py
/home/ghost/git/colour_app/tests/test_typing.py
/home/ghost/git/colour_app/tests/test_app.py
/home/ghost/git/colour_app/tests/test_as7341.py
/home/ghost/git/colour_app/colour_app/sensor.py
/home/ghost/git/colour_app/colour_app/libs/tools/typing.py
/home/ghost/git/colour_app/colour_app/boot.py
/home/ghost/git/colour_app/colour_app/app.py
/home/ghost/git/colour_app/colour_app/libs/as7341/as7341.py
/home/ghost/git/colour_app/colour_app/libs/microdot/test_client.py
/home/ghost/git/colour_app/colour_app/libs/microdot/helpers.py
/home/ghost/git/colour_app/colour_app/libs/microdot/microdot.py
/home/ghost/git/colour_app/colour_app/libs/microdot/__init__.py
/home/ghost/git/colour_app/colour_app/libs/microdot/session.py
/home/ghost/git/colour_app/colour_app/libs/microdot/login.py
/home/ghost/git/colour_app/colour_app/libs/microdot/auth.py
/home/ghost/git/colour_app/colour_app/libs/microdot/websocket.py
/home/ghost/git/colour_app/colour_app/libs/microdot/utemplate.py
/home/ghost/git/colour_app/colour_app/templates/index_html.py
/home/ghost/git/colour_app/colour_app/libs/utemplate/recompile.py
/home/ghost/git/colour_app/colour_app/libs/utemplate/source.py
/home/ghost/git/colour_app/colour_app/libs/utemplate/compiled.py
/home/ghost/git/colour_app/tools/webrepl.py
/home/ghost/git/colour_app/tools/build.py
```

---

## Assistant (Plan · Nemotron 3.5 Lightning Free · 8.6s)

_Thinking:_

Now let me check the libs and other files to get a complete picture. Let me also check the tests and the as7341 library.

Let me read additional key files to understand the project structure better.






**Tool: read**

**Input:**
```json
{
  "filePath": "/home/ghost/git/colour_app/colour_app/libs/as7341/as7341.py"
}
```

**Output:**
```
<path>/home/ghost/git/colour_app/colour_app/libs/as7341/as7341.py</path>
<type>file</type>
<content>
1: """
2: This file licensed under the MIT License and incorporates work covered by
3: the following copyright and permission notice:
4: 
5: The MIT License (MIT)
6: 
7: Permission is hereby granted, free of charge, to any person obtaining a copy
8: of this software and associated documentation files (the "Software"), to deal
9: in the Software without restriction, including without limitation the rights
10: to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
11: copies of the Software, and to permit persons to whom the Software is
12: furnished to do so, subject to the following conditions:
13: 
14: The above copyright notice and this permission notice shall be included in
15: all copies or substantial portions of the Software.
16: 
17: THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
18: IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
19: FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
20: AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
21: LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
22: OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
23: THE SOFTWARE.
24: 
25: 
26:  Original by Rob Hamerling:
27:     https://gitlab.com/robhamerling/micropython-as7341
28: 
29: 
30: """
31: 
32: from struct import unpack_from
33: 
34: from libs.tools.typing import Any
35: 
36: try:
37:     from time import sleep_ms
38: 
39:     from micropython import const  # pyright: ignore[reportMissingImports]
40: except ImportError:
41:     def const(c):
42:         return c
43: 
44: 
45: AS7341_SMUX_SELECT = {
46:     # F1 through F4, CLEAR, NIR:
47:     "F1F4CN": b"\x30\x01\x00\x00\x00\x42\x00\x00\x50\x00\x00\x00\x20\x04\x00\x30\x01\x50\x00\x06",
48:     # F5 through F8, CLEAR, NIR:
49:     "F5F8CN": b"\x00\x00\x00\x40\x02\x00\x10\x03\x50\x10\x03\x00\x00\x00\x24\x00\x00\x50\x00\x06",
50:     # F2 through F7:
51:     "F2F7": b"\x20\x00\x00\x00\x05\x31\x40\x06\x00\x40\x06\x00\x10\x03\x50\x20\x00\x00\x00\x00",
52:     # F3 through F8:
53:     "F3F8": b"\x10\x00\x00\x60\x04\x20\x30\x05\x00\x30\x05\x00\x00\x02\x46\x10\x00\x00\x00\x00",
54:     # Flicker Detection only:
55:     "FD": b"\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x60",
56: }
57: 
58: 
59: _I2C_ADDRESS = const(0x39)  # I2C address of AS7341
60: _ID_VALUE = const(0x24)  # AS7341 Part Number Identification
61: # (excl 2 low order bits)
62: 
63: # Symbolic names for registers and some selected bit fields
64: # Note: ASTATUS, ITIME and CHx_DATA in address range 0x60--0x6F are not used
65: _CONFIG = const(0x70)
66: _CONFIG_INT_MODE_SPM = const(0x00)
67: AS7341_MODE_SPM = _CONFIG_INT_MODE_SPM  # alias
68: _CONFIG_INT_MODE_SYNS = const(0x01)
69: _MODE_SYNS = _CONFIG_INT_MODE_SYNS  # alias
70: _CONFIG_INT_MODE_SYND = const(0x03)
71: _MODE_SYND = _CONFIG_INT_MODE_SYND  # alias
72: _CONFIG_INT_SEL = const(0x04)
73: _CONFIG_LED_SEL = const(0x08)
74: _STAT = const(0x71)
75: _STAT_READY = const(0x01)
76: _STAT_WAIT_SYNC = const(0x02)
77: _EDGE = const(0x72)
78: _GPIO = const(0x73)
79: _GPIO_PD_INT = const(0x01)
80: _GPIO_PD_GPIO = const(0x02)
81: _LED = const(0x74)
82: _LED_LED_ACT = const(0x80)
83: _ENABLE = const(0x80)
84: _ENABLE_PON = const(0x01)
85: _ENABLE_SP_EN = const(0x02)
86: _ENABLE_WEN = const(0x08)
87: _ENABLE_SMUXEN = const(0x10)
88: _ENABLE_FDEN = const(0x40)
89: _ATIME = const(0x81)
90: _WTIME = const(0x83)
91: _SP_TH_LOW = const(0x84)
92: _SP_TH_L_LSB = const(0x84)
93: _SP_TH_L_MSB = const(0x85)
94: _SP_TH_HIGH = const(0x86)
95: _SP_TH_H_LSB = const(0x86)
96: _SP_TH_H_MSB = const(0x87)
97: _AUXID = const(0x90)
98: _REVID = const(0x91)
99: _ID = const(0x92)
100: _STATUS = const(0x93)
101: _STATUS_ASAT = const(0x80)
102: _STATUS_AINT = const(0x08)
103: _STATUS_FINT = const(0x04)
104: _STATUS_C_INT = const(0x02)
105: _STATUS_SINT = const(0x01)
106: _ASTATUS = const(0x94)  # start of bulk read (incl 6 counts)
107: _ASTATUS_ASAT_STATUS = const(0x80)
108: _ASTATUS_AGAIN_STATUS = const(0x0F)
109: _CH_DATA = const(0x95)  # start of the 6 channel counts
110: _CH0_DATA_L = const(0x95)
111: _CH0_DATA_H = const(0x96)
112: _CH1_DATA_L = const(0x97)
113: _CH1_DATA_H = const(0x98)
114: _CH2_DATA_L = const(0x99)
115: _CH2_DATA_H = const(0x9A)
116: _CH3_DATA_L = const(0x9B)
117: _CH3_DATA_H = const(0x9C)
118: _CH4_DATA_L = const(0x9D)
119: _CH4_DATA_H = const(0x9E)
120: _CH5_DATA_L = const(0x9F)
121: _CH5_DATA_H = const(0xA0)
122: _STATUS_2 = const(0xA3)
123: _STATUS_2_AVALID = const(0x40)
124: _STATUS_3 = const(0xA4)
125: _STATUS_5 = const(0xA6)
126: _STATUS_6 = const(0xA7)
127: _CFG_0 = const(0xA9)
128: _CFG_0_WLONG = const(0x04)
129: _CFG_0_REG_BANK = const(0x10)  # datasheet fig 82 (not fig 32)
130: _CFG_0_LOW_POWER = const(0x20)
131: _CFG_1 = const(0xAA)
132: _CFG_3 = const(0xAC)
133: _CFG_6 = const(0xAF)
134: _CFG_6_SMUX_CMD_ROM = const(0x00)
135: _CFG_6_SMUX_CMD_READ = const(0x08)
136: _CFG_6_SMUX_CMD_WRITE = const(0x10)
137: _CFG_8 = const(0xB1)
138: _CFG_9 = const(0xB2)
139: _CFG_10 = const(0xB3)
140: _CFG_12 = const(0xB5)
141: _PERS = const(0xBD)
142: _GPIO_2 = const(0xBE)
143: _GPIO_2_GPIO_IN = const(0x01)
144: _GPIO_2_GPIO_OUT = const(0x02)
145: _GPIO_2_GPIO_IN_EN = const(0x04)
146: _GPIO_2_GPIO_INV = const(0x08)
147: _ASTEP = const(0xCA)
148: _ASTEP_L = const(0xCA)
149: _ASTEP_H = const(0xCB)
150: _AGC_GAIN_MAX = const(0xCF)
151: _AZ_CONFIG = const(0xD6)
152: _FD_TIME_1 = const(0xD8)
153: _FD_TIME_2 = const(0xDA)
154: _FD_CFG0 = const(0xD7)
155: _FD_STATUS = const(0xDB)
156: _FD_STATUS_FD_100HZ = const(0x01)
157: _FD_STATUS_FD_120HZ = const(0x02)
158: _FD_STATUS_FD_100_VALID = const(0x04)
159: _FD_STATUS_FD_120_VALID = const(0x08)
160: _FD_STATUS_FD_SAT_DETECT = const(0x10)
161: _FD_STATUS_FD_MEAS_VALID = const(0x20)
162: _INTENAB = const(0xF9)
163: _INTENAB_SP_IEN = const(0x08)
164: _CONTROL = const(0xFA)
165: _FIFO_MAP = const(0xFC)
166: _FIFO_LVL = const(0xFD)
167: _FDATA = const(0xFE)
168: _FDATA_L = const(0xFE)
169: _FDATA_H = const(0xFF)
170: 
171: 
172: class AS7341:
173:     """Class for AS7341: 11 Channel Multi-Spectral Digital Sensor"""
174: 
175:     def __init__(self, i2c, addr=_I2C_ADDRESS):
176:         """specification of active I2C object is mandatory"""
177:         self._bus = i2c
178:         self._address = addr
179:         self._buffer1 = bytearray(1)  # I2C I/O buffer for byte
180:         self._buffer2 = bytearray(2)  # I2C I/O buffer for word
181:         self._buffer13 = bytearray(13)  # I2C I/O buffer ASTATUS + 6 counts
182:         self._measuremode = AS7341_MODE_SPM  # default measurement mode
183:         self._connected = self.reset()  # recycle power, check AS7341 presence
184: 
185:     """ --------- 'private' methods ----------- """
186: 
187:     def _read_byte(self, reg: int) -> int:
188:         """read byte, return integer value"""
189:         try:
190:             self._bus.readfrom_mem_into(self._address, reg, self._buffer1)
191:             return self._buffer1[0]  # return integer value
192:         except Exception as err:
193:             print("I2C read_byte at 0x{:02X}, error".format(reg), err)
194:             return -1  # indication 'no receive'
195: 
196:     def _read_word(self, reg: int) -> int:
197:         """read 2 consecutive bytes, return integer value (little Endian)"""
198:         try:
199:             self._bus.readfrom_mem_into(self._address, reg, self._buffer2)
200:             return int.from_bytes(
201:                 self._buffer2, "little"
202:             )  # return word ((USHORT) value
203:         except Exception as err:
204:             print("I2C read_word at 0x{:02X}, error".format(reg), err)
205:             return -1  # indication 'no receive'
206: 
207:     def _read_all_channels(self) -> tuple[Any, ...]:
208:         """read ASTATUS register and all channels, return list of 6 integer values
209:         Note: Reading ASTATUS latches the channel counts, which ensures that
210:               the count values of the channels are concurrent.
211:               The contents of ASTATUS itself is not returned!
212:         """
213:         try:
214:             self._bus.readfrom_mem_into(self._address, _ASTATUS, self._buffer13)
215:             #      return [int.from_bytes(self._buffer13[1 + 2*i : 3 + 2*i], 'little') for i in range(6)]
216:             return unpack_from(
217:                 "<HHHHHH", self._buffer13, 1
218:             )  # skip Status, return 6 USHORTs
219:         except Exception as err:
220:             print("I2C read_all_channels at 0x{:02X}, error".format(_ASTATUS), err)
221:             return ()  # empty list
222: 
223:     def _write_byte(self, reg: int, value: int) -> bool:
224:         """write a single byte to the specified register"""
225:         self._buffer1[0] = value & 0xFF
226:         try:
227:             self._bus.writeto_mem(self._address, reg, self._buffer1)
228:             sleep_ms(10)
229:         except Exception as err:
230:             print("I2C write_byte at 0x{:02X}, error".format(reg), err)
231:             return False
232:         return True
233: 
234:     def _write_word(self, reg: int, value: int) -> bool:
235:         """write a word as 2 bytes (little endian encoding)
236:         to adresses <reg> + 0 and <reg> + 1
237:         """
238:         self._buffer2[0] = value & 0xFF  # low byte
239:         self._buffer2[1] = (value >> 8) & 0xFF  # high byte
240:         try:
241:             self._bus.writeto_mem(self._address, reg, self._buffer2)
242:             sleep_ms(20)
243:         except Exception as err:
244:             print("I2C write_word at 0x{:02X}, error".format(reg), err)
245:             return False
246:         return True
247: 
248:     def _write_burst(self, reg: int, value: bytes) -> bool:
249:         """write an array of bytes to consecutive addresses starting at <reg>"""
250:         try:
251:             self._bus.writeto_mem(self._address, reg, value)
252:             sleep_ms(100)
253:         except Exception as err:
254:             print("I2C write_burst at 0x{:02X}, error".format(reg), err)
255:             return False
256:         return True
257: 
258:     def _modify_reg(self, reg: int, mask: int, flag: bool = True) -> None:
259:         """modify register <reg> with <mask>
260:         <flag> True  means 'or' with <mask> : set the bit(s)
261:         <flag> False means 'and' with inverted <mask> : reset the bit(s)
262:         Notes: 1. Works only with '1' bits in <mask>
263:                   (in most cases <mask> contains a single 1-bit!)
264:                2. When <reg> is in region 0x60-0x74
265:                   bank 1 is supposed be (pre-)selected by caller!
266:         """
267:         data = self._read_byte(reg)  # read <reg>
268:         if flag:
269:             data |= mask  # set bit(s)
270:         else:
271:             data &= ~mask  # reset bit(s)
272:         self._write_byte(reg, data)  # rewrite <reg>
273: 
274:     def _set_bank(self, bank: int = 1) -> None:
275:         """select registerbank
276:         <bank> 0 for access to regs 0x80-0xFF
277:         <bank> 1 for access to regs 0x60-0x74
278:         Note: It seems that register CFG_0 (0xA9) is accessible
279:               even when REG_BANK bit is set for 0x60-0x74, otherwise
280:               it wouldn't be possible to reset the REG_BANK bit.
281:               Datasheet isn't clear about this.
282:         """
283:         self._modify_reg(_CFG_0, _CFG_0_REG_BANK, bank != 0)
284: 
285:     """ ----------- 'public' methods ----------- """
286: 
287:     def enable(self) -> None:
288:         """enable device (only power on)"""
289:         self._write_byte(_ENABLE, _ENABLE_PON)
290: 
291:     def disable(self) -> None:
292:         """disable all functions and power off"""
293:         self._set_bank(1)  # CONFIG register is in bank 1
294:         self._write_byte(_CONFIG, 0x00)  # INT, LED off, SPM mode
295:         self._set_bank(0)
296:         self._write_byte(_ENABLE, 0x00)  # power off
297: 
298:     def reset(self) -> bool:
299:         """Cycle power and check if AS7341 is (re-)connected
300:         When connected set (restore) measurement mode
301:         """
302:         self.disable()  # power-off ('reset')
303:         sleep_ms(50)  # quiesce
304:         self.enable()  # (only) power-on
305:         sleep_ms(50)  # settle
306:         id = self._read_byte(_ID)  # obtain Part Number ID
307:         if id < 0:  # read error
308:             print(
309:                 "Failed to contact AS7341 at I2C address 0x{:02X}".format(self._address)
310:             )
311:             return False
312:         else:
313:             if (id & (~0x03)) != _ID_VALUE:  # ID in bits 7..2 bits
314:                 print(
315:                     "No AS7341: found 0x{:02X}, expected 0x{:02X}".format(id, _ID_VALUE)
316:                 )
317:                 return False
318:         self.set_measure_mode(self._measuremode)  # configure chip
319:         return True
320: 
321:     def isconnected(self) -> bool:
322:         """determine if AS7341 is successfully initialized (True/False)"""
323:         return self._connected
324: 
325:     def measurement_completed(self) -> bool:
326:         """check if measurement completed (return True), otherwise return False"""
327:         return bool(self._read_byte(_STATUS_2) & _STATUS_2_AVALID)
328: 
329:     def set_spectral_measurement(self, flag: bool = True) -> None:
330:         """enable (flag == True) spectral measurement, otherwise disable it"""
331:         self._modify_reg(_ENABLE, _ENABLE_SP_EN, flag)
332: 
333:     def set_smux(self, flag: bool = True) -> None:
334:         """enable (flag == True) SMUX, otherwise disable it"""
335:         self._modify_reg(_ENABLE, _ENABLE_SMUXEN, flag)
336: 
337:     def set_measure_mode(self, mode: int = _CONFIG_INT_MODE_SPM) -> None:
338:         """configure the AS7341 for a specific measurement mode
339:         when interrupt needed it must be configured separately
340:         """
341:         if mode in (
342:             _CONFIG_INT_MODE_SPM,  # meas. started by SP_EN
343:             _CONFIG_INT_MODE_SYNS,  # meas. started by GPIO
344:             _CONFIG_INT_MODE_SYND,
345:         ):  # meas. started by GPIO + EDGE
346:             self._measuremode = mode  # store new measurement mode
347:             self._set_bank(1)  # CONFIG register is in bank 1
348:             data = self._read_byte(_CONFIG) & (~0x03)  # reset 2 LSbs (mode)
349:             data |= mode  # insert new mode
350:             self._write_byte(_CONFIG, data)  # modify measurement mode
351:             self._set_bank(0)  # leave bank 1
352: 
353:     def channel_select(self, selection: str) -> None:
354:         """select one from a series of predefined SMUX configurations
355:         <selection> should be a key in dictionary AS7341_SMUX_SELECT
356:         20 bytes of memory starting from address 0 will be overwritten.
357:         """
358:         if selection in AS7341_SMUX_SELECT:
359:             self._write_burst(0x00, AS7341_SMUX_SELECT[selection])
360:         else:
361:             print(selection, "is unknown in AS7341_SMUX_SELECT")
362: 
363:     def start_measure(self, selection: str|None = None) -> None:
364:         """select SMUX configuration,
365:         Optionally select of change channel selection
366:         prepare and start measurement
367:         Note: Typically <selection> need not be specified
368:               when a series of measurements with the same
369:               channel selection is being performed.
370:               (then use channel_selection() once)
371:         """
372:         self._modify_reg(_CFG_0, _CFG_0_LOW_POWER, False)  # no low power
373:         self.set_spectral_measurement(False)  # quiesce
374:         self._write_byte(_CFG_6, _CFG_6_SMUX_CMD_WRITE)  # write mode
375:         if selection is not None:
376:             self.channel_select(selection)
377:         if self._measuremode == _CONFIG_INT_MODE_SPM:
378:             self.set_smux(True)
379:         elif self._measuremode == _CONFIG_INT_MODE_SYNS:
380:             self.set_smux(True)
381:             self.set_gpio_input(True)
382:         self.set_spectral_measurement(True)
383:         if self._measuremode == _CONFIG_INT_MODE_SPM:
384:             while not self.measurement_completed():
385:                 sleep_ms(50)
386: 
387:     def get_channel_data(self, channel: int = 0):
388:         """read count of a single channel (channel in range 0..5)
389:         with or without measurement, just read count of one channel
390:         return integer value
391:         Count depends on previous channel selection!
392:         Auto-zero feature may result in value 0
393:         To get most recent measurement status register must be read
394:         first, so using 'get_spectral_data' might be more efficient.
395:         """
396:         data = 0  # default
397:         if 0 <= channel <= 5:
398:             data = self._read_word(_CH_DATA + channel * 2)
399:             print(
400:                 "ch={:d}, addr={:02X}, buf2=0x{:02X}{:02X}".format(
401:                     channel,
402:                     _CH_DATA + channel * 2,
403:                     self._buffer2[0],
404:                     self._buffer2[1],
405:                 )
406:             )
407:         return data  # return integer value
408: 
409:     def get_spectral_data(self):
410:         """obtain counts of all channels
411:         read of status register is included: measurement data is latched
412:         return a tuple of 6 counts (integers) of the channels
413:         contents depend on previous channel selection
414:         """
415:         return self._read_all_channels()  # return a tuple!
416: 
417:     def set_flicker_detection(self, flag: bool = True) -> None:
418:         """enable (flag == True) flicker detection or otherwise disable it"""
419:         self._modify_reg(_ENABLE, _ENABLE_FDEN, flag)
420: 
421:     def get_flicker_frequency(self) -> int:
422:         """Determine flicker frequency in Hz. Returns 100, 120 or 0
423:         Integration time and gain for flicker detection is the same as for
424:         other channels, the dedicated FD_TIME and FD_GAIN are not supported
425:         """
426:         self._modify_reg(_CFG_0, _CFG_0_LOW_POWER, False)  # no low power
427:         self.set_spectral_measurement(False)
428:         self._write_byte(_CFG_6, _CFG_6_SMUX_CMD_WRITE)
429:         self.channel_select("FD")  # select flicker detection only
430:         self.set_smux(True)
431:         self.set_spectral_measurement(True)
432:         self.set_flicker_detection(True)
433:         for _ in range(10):  # limited wait for completion
434:             fd_status = self._read_byte(_FD_STATUS)
435:             if fd_status & _FD_STATUS_FD_MEAS_VALID:
436:                 break
437:             # print("Flicker measurement not completed")
438:             sleep_ms(50)
439:         else:  # timeout
440:             print("Flicker measurement timed out")
441:             return 0
442:         for _ in range(10):  # limited wait for calculation
443:             fd_status = self._read_byte(_FD_STATUS)
444:             if (fd_status & _FD_STATUS_FD_100_VALID) or (
445:                 fd_status & _FD_STATUS_FD_120_VALID
446:             ):
447:                 break
448:             # print("Flicker calculation not completed")
449:             sleep_ms(50)
450:         else:  # timeout
451:             print("Flicker frequency calculation timed out")
452:             return 0
453:         # print("FD_STATUS", "0x{:02X}".format(fd_status))
454:         self.set_flicker_detection(False)  # disable
455:         self._write_byte(_FD_STATUS, 0x3C)  # reset clearable FD_STATUS bits
456:         if (fd_status & _FD_STATUS_FD_100_VALID) and (fd_status & _FD_STATUS_FD_100HZ):
457:             return 100
458:         elif (fd_status & _FD_STATUS_FD_120_VALID) and (
459:             fd_status & _FD_STATUS_FD_120HZ
460:         ):
461:             return 120
462:         return 0
463: 
464:     def set_gpio_input(self, enable=True) -> None:
465:         """Configure GPIO for input and select
466:         input-sensitivity mode of operation:
467:         <enable> True: enable input sensitivity, False: disable
468:         GPIO pin is open drain: a pull-up resistor will be required!
469:         """
470:         mask = _GPIO_2_GPIO_OUT  # activate GPIO pin
471:         if enable:
472:             mask |= _GPIO_2_GPIO_IN_EN  # set input sensitivity
473:         self._write_byte(_GPIO_2, mask)
474:         # print("GPIO_2 = 0x{:02X}".format(self._read_byte(AS7341_GPIO_2)))
475: 
476:     def get_gpio_value(self) -> bool:
477:         """Determine GPIO value.
478:         Returns True (high voltage) or False (low voltage)
479:         Meaningful only while in input mode and input sensitivity is enabled!
480:         """
481:         # print("GPIO_2 = 0x{:02X}".format(self._read_byte(AS7341_GPIO_2)))
482:         return bool(self._read_byte(_GPIO_2) & _GPIO_2_GPIO_IN)
483: 
484:     def set_gpio_output(self, inverted: bool = False) -> None:
485:         """Set GPIO pin for output.
486:         <inverted> False: normal mode, True: inverted mode
487:         GPIO pin is open drain: when you want to control a LED
488:         the cathode of the LED should be connected to the GPIO
489:         pin, the anode of the LED via a resistor to +Vcc (+3.3V).
490:         Maximum allowed current 20 mA!
491:         The LED will be switched on when <inverted> is False,
492:         can be switched off by setting <inverted> True.
493:         See also the 'set_gpio_inverted' function.
494:         """
495:         mask = 0x00  # reset all bits -> ouptut mode
496:         if inverted:
497:             mask |= _GPIO_2_GPIO_INV
498:         self._write_byte(_GPIO_2, mask)
499:         # print("GPIO_2 = 0x{:02X}".format(self._read_byte(AS7341_GPIO_2)))
500: 
501:     def set_gpio_inverted(self, flag: bool = True) -> None:
502:         """Invert GPIO pin behaviour while in output mode
503:         <flag> True: inverted mode, False: normal mode.
504:         When a LED is connected: True: LED off, False: LED on
505:         """
506:         self._modify_reg(_GPIO_2, _GPIO_2_GPIO_INV, flag)
507:         # print("GPIO_2 = 0x{:02X}".format(self._read_byte(AS7341_GPIO_2)))
508: 
509:     def set_gpio_mask(self, mask: int = 0x00) -> None:
510:         """Raw GPIO control: mask is directly written to register GPIO 2
511:         Examples of meaningful masks:
512:         0x00 - GPIO in output mode: LED on
513:         0x08 - GPIO in output mode: LED off
514:         0x06 - GPIO in input mode and input-sensitivity enabled
515:         """
516:         self._write_byte(_GPIO_2, mask)
517:         print("GPIO_2 = 0x{:02X}".format(self._read_byte(_GPIO_2)))
518: 
519:     def set_astep(self, value: int = 599) -> None:
520:         """set ASTEP size (range 0..65534 -> 2.78 usec .. 182 msec)"""
521:         if 0 <= value <= 65534:
522:             self._write_word(_ASTEP, value)
523: 
524:     def get_astep_time(self) -> float:
525:         """return actual step time (milliseconds)"""
526:         return (self._read_word(_ASTEP) + 1) * 2.78 / 1000
527: 
528:     def set_atime(self, value: int = 29) -> None:
529:         """set integration time (range 0..255) expressed in ASTEPs"""
530:         if 0 <= value <= 255:
531:             self._write_byte(_ATIME, value)
532: 
533:     def get_overflow_count(self):
534:         """return maximum count for this (astep, atime) combination"""
535:         return (self._read_word(_ASTEP) + 1) * (self._read_byte(_ATIME) + 1)
536: 
537:     def get_integration_time(self) -> float:
538:         """return actual total integration time (milliseconds)
539:         in milliseconds (valid with SPM and SYNS measurement mode)
540:         """
541:         return self.get_overflow_count() * 2.78 / 1000
542: 
543:     def set_again(self, code: int) -> None:
544:         """set AGAIN (code in range 0..10 -> gain factor 0.5 .. 512)
545:         code:    0  1  2  3  4   5   6   7    8    9   10
546:         gain:  0.5  1  2  4  8  16  32  64  128  256  512
547:         in other words: gain_factor = 2 ** (code - 1)
548:         """
549:         if 0 <= code <= 10:
550:             self._write_byte(_CFG_1, code)
551: 
552:     def get_again(self):
553:         """obtain actual gain code (in range 0 .. 10)"""
554:         return self._read_byte(_CFG_1)
555: 
556:     def set_again_factor(self, factor: int) -> None:
557:         """'inverse' function of 'set_again': gain factor -> code 0 .. 10
558:         <factor> is rounded down to nearest power of 2 (in range 0.5 .. 512)
559:         """
560:         for code in range(10, -1, -1):  # descending range
561:             if 2 ** (code - 1) <= factor:
562:                 break
563:         self._write_byte(_CFG_1, code)
564: 
565:     def get_again_factor(self) -> None:
566:         """obtain actual gain factor (in range 0.5 .. 512)"""
567:         return 2 ** (self.get_again() - 1)
568: 
569:     def set_wen(self, flag: bool = True) -> None:
570:         """enable (flag=True) or otherwise disable use of WTIME (auto re-start)"""
571:         self._modify_reg(_ENABLE, _ENABLE_WEN, flag)
572: 
573:     def set_wtime(self, code: int) -> None:
574:         """set WTIME when auto-re-start is desired (in range 0 .. 255)
575:         wtime = 2.78 * (<code> + 1)
576:         0 -> 2.78, 255 -> 711.7 ms
577:         Note: The WEN bit in ENABLE should be set as well: set_wen()
578:         """
579:         self._write_byte(_WTIME, code)
580: 
581:     def set_led_current(self, current: int) -> None:
582:         """Control current of ONBOARD LED in milliamperes
583:         LED-current is (here) limited to the range 4..20 mA
584:         use only even numbers (4,6,8,... etc)
585:         Specification outside this range results in LED OFF
586:         """
587:         self._set_bank(1)  # CONFIG and LED registers in bank 1
588:         if 4 <= current <= 20:  # within limits: 4..20 mA
589:             self._modify_reg(_CONFIG, _CONFIG_LED_SEL, True)
590:             # print("Reg. CONFIG (0x70) now 0x{:02X}".format(self._read_byte(0x70)))
591:             data = _LED_LED_ACT + ((current - 4) // 2)  # LED on with PWM
592:         else:
593:             self._modify_reg(_CONFIG, _CONFIG_LED_SEL, False)
594:             data = 0  # LED off, PWM 0
595:         self._write_byte(_LED, data)
596:         # print("reg 0x74 (LED) now 0x{:02X}".format(self._read_byte(0x74)))
597:         self._set_bank(0)
598:         sleep_ms(100)
599: 
600:     def check_interrupt(self) -> bool:
601:         """Check for Spectral or Flicker Detect saturation interrupt"""
602:         data = self._read_byte(_STATUS)
603:         if data & _STATUS_ASAT:
604:             print("Spectral interrupt generation！")
605:             return True
606:         return False
607: 
608:     def clear_interrupt(self) -> None:
609:         """clear all interrupt signals"""
610:         self._write_byte(_STATUS, 0xFF)
611: 
612:     def set_spectral_interrupt(self, flag: bool = True) -> None:
613:         """enable (flag == True) or otherwise disable spectral interrupts"""
614:         self._modify_reg(_INTENAB, _INTENAB_SP_IEN, flag)
615: 
616:     def set_interrupt_persistence(self, value: int) -> None:
617:         """configure interrupt persistance"""
618:         if 0 <= value <= 15:
619:             self._write_byte(_PERS, value)
620: 
621:     def set_spectral_threshold_channel(self, value: int) -> None:
622:         """select channel (0..4) for interrupts, persistence and AGC"""
623:         if 0 <= value <= 4:
624:             self._write_byte(_CFG_12, value)
625: 
626:     def set_thresholds(self, lo: int, hi: int) -> None:
627:         """Set thresholds (when lo < hi)"""
628:         if lo < hi:
629:             self._write_word(_SP_TH_LOW, lo)
630:             self._write_word(_SP_TH_HIGH, hi)
631:             sleep_ms(20)
632: 
633:     def get_thresholds(self):
634:         """obtain and return tuple with low and high threshold values"""
635:         lo = self._read_word(_SP_TH_LOW)
636:         hi = self._read_word(_SP_TH_HIGH)
637:         return (lo, hi)
638: 
639:     def set_syns_int(self) -> None:
640:         """select SYNS mode and signal SYNS interrupt on Pin INT
641:         Pin INT is open drain output: a pull-up resistor will be required
642:         for signalling an external device.
643:         """
644:         self._set_bank(1)  # CONFIG register is in bank 1
645:         self._write_byte(_CONFIG, _CONFIG_INT_SEL | _CONFIG_INT_MODE_SYNS)
646:         self._set_bank(0)

(End of file - total 646 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/ghost/git/colour_app/colour_app/libs/tools/typing.py"
}
```

**Output:**
```
<path>/home/ghost/git/colour_app/colour_app/libs/tools/typing.py</path>
<type>file</type>
<content>
1: __version__ = "1.27.0"
2: 
3: 
4: def cast(type, val):
5:     return val
6: 
7: 
8: def get_origin(type):
9:     return None # pragma: no cover
10: 
11: 
12: def get_args(type):
13:     return () # pragma: no cover
14: 
15: 
16: def no_type_check(func):
17:     return func # pragma: no cover
18: 
19: 
20: def overload(func):
21:     return None # pragma: no cover
22: 
23: 
24: def override(func):
25:     return func # pragma: no cover
26: 
27: 
28: class _AnyCall:
29:     def __init__(*args, **kwargs):
30:         pass
31: 
32:     def __call__(*args, **kwargs):
33:         pass # pragma: no cover
34: 
35:     def __getitem__(self, arg):
36:         return _anyCall # pragma: no cover
37: 
38: 
39: _anyCall = _AnyCall()
40: 
41: 
42: class _SubscriptableType:
43:     def __getitem__(self, arg):
44:         return _anyCall
45: 
46: 
47: _Subscriptable = _SubscriptableType()
48: 
49: class Any:
50:     pass
51: 
52: def TypeVar(name, *types, bound: Any | None = None, covariant=False, contravariant=False, infer_variance=False):
53:     return None # pragma: no cover
54: 
55: 
56: def NewType(name, type):
57:     return type # pragma: no cover
58: 
59: 
60: class BinaryIO:
61:     pass
62: 
63: 
64: class ClassVar:
65:     pass
66: 
67: 
68: class Final:
69:     pass
70: 
71: 
72: class Hashable:
73:     pass
74: 
75: 
76: class IO:
77:     pass
78: 
79: 
80: class NoReturn:
81:     pass
82: 
83: 
84: class Sized:
85:     pass
86: 
87: 
88: class SupportsInt:
89:     pass
90: 
91: 
92: class SupportsFloat:
93:     pass
94: 
95: 
96: class SupportsComplex:
97:     pass
98: 
99: 
100: class SupportsBytes:
101:     pass
102: 
103: 
104: class SupportsIndex:
105:     pass
106: 
107: 
108: class SupportsAbs:
109:     pass
110: 
111: 
112: class SupportsRound:
113:     pass
114: 
115: 
116: class TextIO:
117:     pass
118: 
119: 
120: class Protocol:
121:     pass
122: 
123: 
124: AnyStr = str
125: TypedDict = dict
126: 
127: # Deprecated
128: # Text = str
129: # Pattern = str
130: # Match = str
131: 
132: AbstractSet = _Subscriptable
133: AsyncContextManager = _Subscriptable
134: AsyncGenerator = _Subscriptable
135: AsyncIterable = _Subscriptable
136: AsyncIterator = _Subscriptable
137: Awaitable = _Subscriptable
138: Callable = _Subscriptable
139: ChainMap = _Subscriptable
140: Collection = _Subscriptable
141: Container = _Subscriptable
142: ContextManager = _Subscriptable
143: Coroutine = _Subscriptable
144: Counter = _Subscriptable
145: DefaultDict = _Subscriptable
146: Deque = _Subscriptable
147: Dict = _Subscriptable
148: FrozenSet = _Subscriptable
149: Generator = _Subscriptable
150: Generic = _Subscriptable
151: Iterable = _Subscriptable
152: Iterator = _Subscriptable
153: List = _Subscriptable
154: Literal = _Subscriptable
155: Mapping = _Subscriptable
156: MutableMapping = _Subscriptable
157: MutableSequence = _Subscriptable
158: MutableSet = _Subscriptable
159: NamedTuple = _Subscriptable
160: Optional = _Subscriptable
161: OrderedDict = _Subscriptable
162: Self = _Subscriptable
163: Sequence = _Subscriptable
164: Set = _Subscriptable
165: Tuple = _Subscriptable
166: Type = _Subscriptable
167: Union = _Subscriptable
168: 
169: TYPE_CHECKING = False

(End of file - total 169 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/ghost/git/colour_app/colour_app/libs/microdot/microdot.py"
}
```

**Output:**
```
<path>/home/ghost/git/colour_app/colour_app/libs/microdot/microdot.py</path>
<type>file</type>
<content>
1: """
2: microdot
3: --------
4: 
5: The ``microdot`` module defines a few classes that help implement HTTP-based
6: servers for MicroPython and standard Python.
7: """
8: import asyncio
9: import io
10: import re
11: import time
12: 
13: try:
14:     import orjson as json  # type: ignore[import-not-found]
15: except ImportError:
16:     import json
17: 
18: try:
19:     from inspect import iscoroutinefunction, iscoroutine
20:     from functools import partial
21: 
22:     async def invoke_handler(handler, *args, **kwargs):
23:         """Invoke a handler and return the result.
24: 
25:         This method runs sync handlers in a thread pool executor.
26:         """
27:         if iscoroutinefunction(handler):
28:             ret = await handler(*args, **kwargs)
29:         else:
30:             ret = await asyncio.get_running_loop().run_in_executor(
31:                 None, partial(handler, *args, **kwargs))
32:         return ret
33: except ImportError:  # pragma: no cover
34:     def iscoroutine(coro):  # type: ignore[misc]
35:         return hasattr(coro, 'send') and hasattr(coro, 'throw')
36: 
37:     async def invoke_handler(handler, *args, **kwargs):
38:         """Invoke a handler and return the result.
39: 
40:         This method runs sync handlers in the asyncio thread, which can
41:         potentially cause blocking and performance issues.
42:         """
43:         ret = handler(*args, **kwargs)
44:         if iscoroutine(ret):
45:             ret = await ret
46:         return ret
47: 
48: try:
49:     from sys import print_exception  # type: ignore[attr-defined]
50: except ImportError:  # pragma: no cover
51:     import traceback
52: 
53:     def print_exception(exc):
54:         traceback.print_exc()
55: 
56: MUTED_SOCKET_ERRORS = [
57:     32,  # Broken pipe
58:     54,  # Connection reset by peer
59:     104,  # Connection reset by peer
60:     128,  # Operation on closed socket
61: ]
62: 
63: 
64: def urldecode(s):
65:     if isinstance(s, str):
66:         s = s.encode()
67:     s = s.replace(b'+', b' ')
68:     parts = s.split(b'%')
69:     if len(parts) == 1:
70:         return s.decode()
71:     result = [parts[0]]
72:     for item in parts[1:]:
73:         if item == b'':
74:             result.append(b'%')
75:         else:
76:             code = item[:2]
77:             result.append(bytes([int(code, 16)]))
78:             result.append(item[2:])
79:     return b''.join(result).decode()
80: 
81: 
82: def urlencode(s):
83:     return s.replace('+', '%2B').replace(' ', '+').replace(
84:         '%', '%25').replace('?', '%3F').replace('#', '%23').replace(
85:             '&', '%26').replace('=', '%3D')
86: 
87: 
88: class NoCaseDict(dict):
89:     """A subclass of dictionary that holds case-insensitive keys.
90: 
91:     :param initial_dict: an initial dictionary of key/value pairs to
92:                          initialize this object with.
93: 
94:     Example::
95: 
96:         >>> d = NoCaseDict()
97:         >>> d['Content-Type'] = 'text/html'
98:         >>> print(d['Content-Type'])
99:         text/html
100:         >>> print(d['content-type'])
101:         text/html
102:         >>> print(d['CONTENT-TYPE'])
103:         text/html
104:         >>> del d['cOnTeNt-TyPe']
105:         >>> print(d)
106:         {}
107:     """
108:     def __init__(self, initial_dict=None):
109:         super().__init__(initial_dict or {})
110:         self.keymap = {k.lower(): k for k in self.keys() if k.lower() != k}
111: 
112:     def __setitem__(self, key, value):
113:         kl = key.lower()
114:         key = self.keymap.get(kl, key)
115:         if kl != key:
116:             self.keymap[kl] = key
117:         super().__setitem__(key, value)
118: 
119:     def __getitem__(self, key):
120:         kl = key.lower()
121:         return super().__getitem__(self.keymap.get(kl, kl))
122: 
123:     def __delitem__(self, key):
124:         kl = key.lower()
125:         super().__delitem__(self.keymap.get(kl, kl))
126: 
127:     def __contains__(self, key):
128:         kl = key.lower()
129:         return self.keymap.get(kl, kl) in self.keys()
130: 
131:     def get(self, key, default=None):
132:         kl = key.lower()
133:         return super().get(self.keymap.get(kl, kl), default)
134: 
135:     def update(self, other_dict):
136:         for key, value in other_dict.items():
137:             self[key] = value
138: 
139: 
140: def mro(cls):  # pragma: no cover
141:     """Return the method resolution order of a class.
142: 
143:     This is a helper function that returns the method resolution order of a
144:     class. It is used by Microdot to find the best error handler to invoke for
145:     the raised exception.
146: 
147:     In CPython, this function returns the ``__mro__`` attribute of the class.
148:     In MicroPython, this function implements a recursive depth-first scanning
149:     of the class hierarchy.
150:     """
151:     if hasattr(cls, 'mro'):
152:         return cls.__mro__
153: 
154:     def _mro(cls):
155:         m = [cls]
156:         for base in cls.__bases__:
157:             m += _mro(base)
158:         return m
159: 
160:     mro_list = _mro(cls)
161: 
162:     # If a class appears multiple times (due to multiple inheritance) remove
163:     # all but the last occurence. This matches the method resolution order
164:     # of MicroPython, but not CPython.
165:     mro_pruned = []
166:     for i in range(len(mro_list)):
167:         base = mro_list.pop(0)
168:         if base not in mro_list:
169:             mro_pruned.append(base)
170:     return mro_pruned
171: 
172: 
173: class MultiDict(dict):
174:     """A subclass of dictionary that can hold multiple values for the same
175:     key. It is used to hold key/value pairs decoded from query strings and
176:     form submissions.
177: 
178:     :param initial_dict: an initial dictionary of key/value pairs to
179:                          initialize this object with.
180: 
181:     Example::
182: 
183:         >>> d = MultiDict()
184:         >>> d['sort'] = 'name'
185:         >>> d['sort'] = 'email'
186:         >>> print(d['sort'])
187:         'name'
188:         >>> print(d.getlist('sort'))
189:         ['name', 'email']
190:     """
191:     def __init__(self, initial_dict=None):
192:         super().__init__()
193:         if initial_dict:
194:             for key, value in initial_dict.items():
195:                 self[key] = value
196: 
197:     def __setitem__(self, key, value):
198:         if key not in self:
199:             super().__setitem__(key, [])
200:         super().__getitem__(key).append(value)
201: 
202:     def __getitem__(self, key):
203:         return super().__getitem__(key)[0]
204: 
205:     def get(self, key, default=None, type=None):
206:         """Return the value for a given key.
207: 
208:         :param key: The key to retrieve.
209:         :param default: A default value to use if the key does not exist.
210:         :param type: A type conversion callable to apply to the value.
211: 
212:         If the multidict contains more than one value for the requested key,
213:         this method returns the first value only.
214: 
215:         Example::
216: 
217:             >>> d = MultiDict()
218:             >>> d['age'] = '42'
219:             >>> d.get('age')
220:             '42'
221:             >>> d.get('age', type=int)
222:             42
223:             >>> d.get('name', default='noname')
224:             'noname'
225:         """
226:         if key not in self:
227:             return default
228:         value = self[key]
229:         if type is not None:
230:             value = type(value)
231:         return value
232: 
233:     def getlist(self, key, type=None):
234:         """Return all the values for a given key.
235: 
236:         :param key: The key to retrieve.
237:         :param type: A type conversion callable to apply to the values.
238: 
239:         If the requested key does not exist in the dictionary, this method
240:         returns an empty list.
241: 
242:         Example::
243: 
244:             >>> d = MultiDict()
245:             >>> d.getlist('items')
246:             []
247:             >>> d['items'] = '3'
248:             >>> d.getlist('items')
249:             ['3']
250:             >>> d['items'] = '56'
251:             >>> d.getlist('items')
252:             ['3', '56']
253:             >>> d.getlist('items', type=int)
254:             [3, 56]
255:         """
256:         if key not in self:
257:             return []
258:         values = super().__getitem__(key)
259:         if type is not None:
260:             values = [type(value) for value in values]
261:         return values
262: 
263: 
264: class AsyncBytesIO:
265:     """An async wrapper for BytesIO."""
266:     def __init__(self, data):
267:         self.stream = io.BytesIO(data)
268: 
269:     async def read(self, n=-1):
270:         return self.stream.read(n)
271: 
272:     async def readline(self):  # pragma: no cover
273:         return self.stream.readline()
274: 
275:     async def readexactly(self, n):  # pragma: no cover
276:         return self.stream.read(n)
277: 
278:     async def readuntil(self, separator=b'\n'):  # pragma: no cover
279:         return self.stream.readuntil(separator=separator)
280: 
281:     async def awrite(self, data):  # pragma: no cover
282:         return self.stream.write(data)
283: 
284:     async def aclose(self):  # pragma: no cover
285:         pass
286: 
287: 
288: class Request:
289:     """An HTTP request."""
290:     #: Specify the maximum payload size that is accepted. Requests with larger
291:     #: payloads will be rejected with a 413 status code. Applications can
292:     #: change this maximum as necessary.
293:     #:
294:     #: Example::
295:     #:
296:     #:    Request.max_content_length = 1 * 1024 * 1024  # 1MB requests allowed
297:     max_content_length = 16 * 1024
298: 
299:     #: Specify the maximum payload size that can be stored in ``body``.
300:     #: Requests with payloads that are larger than this size and up to
301:     #: ``max_content_length`` bytes will be accepted, but the application will
302:     #: only be able to access the body of the request by reading from
303:     #: ``stream``. Set to 0 if you always access the body as a stream.
304:     #:
305:     #: Example::
306:     #:
307:     #:    Request.max_body_length = 4 * 1024  # up to 4KB bodies read
308:     max_body_length = 16 * 1024
309: 
310:     #: Specify the maximum length allowed for a line in the request. Requests
311:     #: with longer lines will not be correctly interpreted. Applications can
312:     #: change this maximum as necessary.
313:     #:
314:     #: Example::
315:     #:
316:     #:    Request.max_readline = 16 * 1024  # 16KB lines allowed
317:     max_readline = 2 * 1024
318: 
319:     class G:
320:         pass
321: 
322:     def __init__(self, app, client_addr, method, url, http_version, headers,
323:                  body=None, stream=None, sock=None, url_prefix='',
324:                  subapp=None, scheme=None, route=None):
325:         #: The application instance to which this request belongs.
326:         self.app = app
327:         #: The address of the client, as a tuple (host, port).
328:         self.client_addr = client_addr
329:         #: The HTTP method of the request.
330:         self.method = method
331:         #: The scheme of the request, either `http` or `https`.
332:         self.scheme = scheme or 'http'
333:         #: The request URL, including the path and query string, but not the
334:         #: scheme or the host, which is available in the ``Host`` header.
335:         self.url = url
336:         #: The URL prefix, if the endpoint comes from a mounted
337:         #: sub-application, or else ''.
338:         self.url_prefix = url_prefix
339:         #: The sub-application instance, or `None` if this isn't a mounted
340:         #: endpoint.
341:         self.subapp = subapp
342:         #: The route function that handles this request.
343:         self.route = route
344:         #: The path portion of the URL.
345:         self.path = url
346:         #: The query string portion of the URL.
347:         self.query_string = None
348:         #: The parsed query string, as a
349:         #: :class:`MultiDict <microdot.MultiDict>` object.
350:         self.args = {}
351:         #: A dictionary with the headers included in the request.
352:         self.headers = headers
353:         #: A dictionary with the cookies included in the request.
354:         self.cookies = {}
355:         #: The parsed ``Content-Length`` header.
356:         self.content_length = 0
357:         #: The parsed ``Content-Type`` header.
358:         self.content_type = None
359:         #: A general purpose container for applications to store data during
360:         #: the life of the request.
361:         self.g = Request.G()
362: 
363:         self.http_version = http_version
364:         if '?' in self.path:
365:             self.path, self.query_string = self.path.split('?', 1)
366:             self.args = self._parse_urlencoded(self.query_string)
367: 
368:         if 'Content-Length' in self.headers:
369:             self.content_length = int(self.headers['Content-Length'])
370:         if 'Content-Type' in self.headers:
371:             self.content_type = self.headers['Content-Type']
372:         if 'Cookie' in self.headers:
373:             for cookie in self.headers['Cookie'].split(';'):
374:                 c = cookie.strip().split('=', 1)
375:                 self.cookies[c[0]] = c[1] if len(c) > 1 else ''
376: 
377:         self._body = body
378:         self.body_used = False
379:         self._stream = stream
380:         self.sock = sock
381:         self._json = None
382:         self._form = None
383:         self._files = None
384:         self.after_request_handlers = []
385: 
386:     @staticmethod
387:     async def create(app, client_reader, client_writer, client_addr,
388:                      scheme=None):
389:         """Create a request object.
390: 
391:         :param app: The Microdot application instance.
392:         :param client_reader: An input stream from where the request data can
393:                               be read.
394:         :param client_writer: An output stream where the response data can be
395:                               written.
396:         :param client_addr: The address of the client, as a tuple.
397:         :param scheme: The scheme of the request, either 'http' or 'https'.
398: 
399:         This method is a coroutine. It returns a newly created ``Request``
400:         object.
401:         """
402:         # request line
403:         line = (await Request._safe_readline(client_reader)).strip().decode()
404:         if not line:  # pragma: no cover
405:             return None
406:         method, url, http_version = line.split()
407:         http_version = http_version.split('/', 1)[1]
408: 
409:         # headers
410:         headers = NoCaseDict()
411:         content_length = 0
412:         while True:
413:             line = (await Request._safe_readline(
414:                 client_reader)).strip().decode()
415:             if line == '':
416:                 break
417:             header, value = line.split(':', 1)
418:             value = value.strip()
419:             headers[header] = value
420:             if header.lower() == 'content-length':
421:                 content_length = int(value)
422: 
423:         # body
424:         body = b''
425:         if content_length and content_length <= Request.max_body_length:
426:             body = await client_reader.readexactly(content_length)
427:             stream = None
428:         else:
429:             body = b''
430:             stream = client_reader
431: 
432:         return Request(app, client_addr, method, url, http_version, headers,
433:                        body=body, stream=stream,
434:                        sock=(client_reader, client_writer), scheme=scheme)
435: 
436:     def _parse_urlencoded(self, urlencoded):
437:         data = MultiDict()
438:         if len(urlencoded) > 0:  # pragma: no branch
439:             if isinstance(urlencoded, str):
440:                 for kv in [pair.split('=', 1)
441:                            for pair in urlencoded.split('&') if pair]:
442:                     data[urldecode(kv[0])] = urldecode(kv[1]) \
443:                         if len(kv) > 1 else ''
444:             elif isinstance(urlencoded, bytes):  # pragma: no branch
445:                 for kv in [pair.split(b'=', 1)
446:                            for pair in urlencoded.split(b'&') if pair]:
447:                     data[urldecode(kv[0])] = urldecode(kv[1]) \
448:                         if len(kv) > 1 else b''
449:         return data
450: 
451:     @property
452:     def body(self):
453:         """The body of the request, as bytes."""
454:         return self._body
455: 
456:     @property
457:     def stream(self):
458:         """The body of the request, as a bytes stream."""
459:         if self._stream is None:
460:             self._stream = AsyncBytesIO(self._body)
461:         return self._stream
462: 
463:     @property
464:     def json(self):
465:         """The parsed JSON body, or ``None`` if the request does not have a
466:         JSON body."""
467:         if self._json is None:
468:             if self.content_type is None:
469:                 return None
470:             mime_type = self.content_type.split(';')[0]
471:             if mime_type != 'application/json':
472:                 return None
473:             self._json = json.loads(self.body.decode())
474:         return self._json
475: 
476:     @property
477:     def form(self):
478:         """The parsed form submission body, as a
479:         :class:`MultiDict <microdot.MultiDict>` object, or ``None`` if the
480:         request does not have a form submission.
481: 
482:         Forms that are URL encoded are processed by default. For multipart
483:         forms to be processed, the
484:         :func:`with_form_data <microdot.multipart.with_form_data>`
485:         decorator must be added to the route.
486:         """
487:         if self._form is None:
488:             if self.content_type is None:
489:                 return None
490:             mime_type = self.content_type.split(';')[0]
491:             if mime_type != 'application/x-www-form-urlencoded':
492:                 return None
493:             self._form = self._parse_urlencoded(self.body)
494:         return self._form
495: 
496:     @property
497:     def files(self):
498:         """The files uploaded in the request as a dictionary, or ``None`` if
499:         the request does not have any files.
500: 
501:         The :func:`with_form_data <microdot.multipart.with_form_data>`
502:         decorator must be added to the route that receives file uploads for
503:         this property to be set.
504:         """
505:         return self._files
506: 
507:     def after_request(self, f):
508:         """Register a request-specific function to run after the request is
509:         handled. Request-specific after request handlers run at the very end,
510:         after the application's own after request handlers. The function must
511:         take two arguments, the request and response objects. The return value
512:         of the function must be the updated response object.
513: 
514:         Example::
515: 
516:             @app.route('/')
517:             def index(request):
518:                 # register a request-specific after request handler
519:                 @req.after_request
520:                 def func(request, response):
521:                     # ...
522:                     return response
523: 
524:                 return 'Hello, World!'
525: 
526:         Note that the function is not called if the request handler raises an
527:         exception and an error response is returned instead.
528:         """
529:         self.after_request_handlers.append(f)
530:         return f
531: 
532:     @staticmethod
533:     async def _safe_readline(stream):
534:         line = (await stream.readline())
535:         if len(line) > Request.max_readline:
536:             raise ValueError('line too long')
537:         return line
538: 
539: 
540: class Response:
541:     """An HTTP response class.
542: 
543:     :param body: The body of the response. If a dictionary or list is given,
544:                  a JSON formatter is used to generate the body. If a file-like
545:                  object or an async generator is given, a streaming response is
546:                  used. If a string is given, it is encoded from UTF-8. Else,
547:                  the body should be a byte sequence.
548:     :param status_code: The numeric HTTP status code of the response. The
549:                         default is 200.
550:     :param headers: A dictionary of headers to include in the response.
551:     :param reason: A custom reason phrase to add after the status code. The
552:                    default is "OK" for responses with a 200 status code and
553:                    "N/A" for any other status codes.
554:     """
555:     types_map = {
556:         'css': 'text/css',
557:         'gif': 'image/gif',
558:         'html': 'text/html',
559:         'jpg': 'image/jpeg',
560:         'js': 'application/javascript',
561:         'json': 'application/json',
562:         'png': 'image/png',
563:         'txt': 'text/plain',
564:         'svg': 'image/svg+xml',
565:     }
566: 
567:     send_file_buffer_size = 1024
568: 
569:     #: The content type to use for responses that do not explicitly define a
570:     #: ``Content-Type`` header.
571:     default_content_type = 'text/plain'
572: 
573:     #: The default cache control max age used by :meth:`send_file`. A value
574:     #: of ``None`` means that no ``Cache-Control`` header is added.
575:     default_send_file_max_age = None
576: 
577:     #: Special response used to signal that a response does not need to be
578:     #: written to the client. Used to exit WebSocket connections cleanly.
579:     already_handled = None
580: 
581:     def __init__(self, body=b'', status_code=200, headers=None, reason=None):
582:         if body is None and status_code == 200:
583:             body = ''
584:             status_code = 204
585:         self.status_code = status_code
586:         self.headers = NoCaseDict(headers or {})
587:         self.reason = reason
588:         if isinstance(body, (dict, list)):
589:             body = json.dumps(body)
590:             self.headers['Content-Type'] = 'application/json; charset=UTF-8'
591:         if isinstance(body, str):
592:             self.body = body.encode()
593:         else:
594:             # this applies to bytes, file-like objects or generators
595:             self.body = body
596:         self.is_head = False
597: 
598:     def set_cookie(self, cookie, value, path=None, domain=None, expires=None,
599:                    max_age=None, secure=False, http_only=False,
600:                    partitioned=False):
601:         """Add a cookie to the response.
602: 
603:         :param cookie: The cookie's name.
604:         :param value: The cookie's value.
605:         :param path: The cookie's path.
606:         :param domain: The cookie's domain.
607:         :param expires: The cookie expiration time, as a ``datetime`` object
608:                         or a correctly formatted string.
609:         :param max_age: The cookie's ``Max-Age`` value.
610:         :param secure: The cookie's ``secure`` flag.
611:         :param http_only: The cookie's ``HttpOnly`` flag.
612:         :param partitioned: Whether the cookie is partitioned.
613:         """
614:         http_cookie = '{cookie}={value}'.format(cookie=cookie, value=value)
615:         if path:
616:             http_cookie += '; Path=' + path
617:         if domain:
618:             http_cookie += '; Domain=' + domain
619:         if expires:
620:             if isinstance(expires, str):
621:                 http_cookie += '; Expires=' + expires
622:             else:  # pragma: no cover
623:                 http_cookie += '; Expires=' + time.strftime(
624:                     '%a, %d %b %Y %H:%M:%S GMT', expires.timetuple())
625:         if max_age is not None:
626:             http_cookie += '; Max-Age=' + str(max_age)
627:         if secure:
628:             http_cookie += '; Secure'
629:         if http_only:
630:             http_cookie += '; HttpOnly'
631:         if partitioned:
632:             http_cookie += '; Partitioned'
633:         if 'Set-Cookie' in self.headers:
634:             self.headers['Set-Cookie'].append(http_cookie)
635:         else:
636:             self.headers['Set-Cookie'] = [http_cookie]
637: 
638:     def delete_cookie(self, cookie, **kwargs):
639:         """Delete a cookie.
640: 
641:         :param cookie: The cookie's name.
642:         :param kwargs: Any cookie options and flags supported by
643:                        :meth:`set_cookie() <microdot.Response.set_cookie>`.
644:                        Values given for ``expires`` and ``max_age`` are
645:                        ignored.
646:         """
647:         kwargs.pop('expires', None)
648:         kwargs.pop('max_age', None)
649:         self.set_cookie(cookie, '', expires='Thu, 01 Jan 1970 00:00:01 GMT',
650:                         max_age=0, **kwargs)
651: 
652:     def complete(self):
653:         if isinstance(self.body, bytes) and \
654:                 'Content-Length' not in self.headers:
655:             self.headers['Content-Length'] = str(len(self.body))
656:         if 'Content-Type' not in self.headers:
657:             self.headers['Content-Type'] = self.default_content_type
658:             if 'charset=' not in self.headers['Content-Type']:
659:                 self.headers['Content-Type'] += '; charset=UTF-8'
660: 
661:     async def write(self, stream):
662:         self.complete()
663: 
664:         try:
665:             # status code
666:             reason = self.reason if self.reason is not None else \
667:                 ('OK' if self.status_code == 200 else 'N/A')
668:             await stream.awrite('HTTP/1.0 {status_code} {reason}\r\n'.format(
669:                 status_code=self.status_code, reason=reason).encode())
670: 
671:             # headers
672:             for header, value in self.headers.items():
673:                 values = value if isinstance(value, list) else [value]
674:                 for value in values:
675:                     await stream.awrite('{header}: {value}\r\n'.format(
676:                         header=header, value=value).encode())
677:             await stream.awrite(b'\r\n')
678: 
679:             # body
680:             if not self.is_head:
681:                 iter = self.body_iter()
682:                 async for body in iter:
683:                     if isinstance(body, str):  # pragma: no cover
684:                         body = body.encode()
685:                     try:
686:                         await stream.awrite(body)
687:                     except OSError as exc:  # pragma: no cover
688:                         if exc.errno in MUTED_SOCKET_ERRORS or \
689:                                 exc.args[0] == 'Connection lost':
690:                             if hasattr(iter, 'aclose'):
691:                                 await iter.aclose()
692:                         raise
693:                 if hasattr(iter, 'aclose'):  # pragma: no branch
694:                     await iter.aclose()
695: 
696:         except OSError as exc:  # pragma: no cover
697:             if exc.errno in MUTED_SOCKET_ERRORS or \
698:                     exc.args[0] == 'Connection lost':
699:                 pass
700:             else:
701:                 raise
702: 
703:     def body_iter(self):
704:         if hasattr(self.body, '__anext__'):
705:             # response body is an async generator
706:             return self.body
707: 
708:         response = self
709: 
710:         class iter:
711:             ITER_UNKNOWN = 0
712:             ITER_SYNC_GEN = 1
713:             ITER_FILE_OBJ = 2
714:             ITER_NO_BODY = -1
715: 
716:             def __aiter__(self):
717:                 if response.body:
718:                     self.i = self.ITER_UNKNOWN  # need to determine type
719:                 else:
720:                     self.i = self.ITER_NO_BODY
721:                 return self
722: 
723:             async def __anext__(self):
724:                 if self.i == self.ITER_NO_BODY:
725:                     await self.aclose()
726:                     raise StopAsyncIteration
727:                 if self.i == self.ITER_UNKNOWN:
728:                     if hasattr(response.body, 'read'):
729:                         self.i = self.ITER_FILE_OBJ
730:                     elif hasattr(response.body, '__next__'):
731:                         self.i = self.ITER_SYNC_GEN
732:                         return next(response.body)
733:                     else:
734:                         self.i = self.ITER_NO_BODY
735:                         return response.body
736:                 elif self.i == self.ITER_SYNC_GEN:
737:                     try:
738:                         return next(response.body)
739:                     except StopIteration:
740:                         await self.aclose()
741:                         raise StopAsyncIteration
742:                 buf = response.body.read(response.send_file_buffer_size)
743:                 if iscoroutine(buf):  # pragma: no cover
744:                     buf = await buf
745:                 if len(buf) < response.send_file_buffer_size:
746:                     self.i = self.ITER_NO_BODY
747:                 return buf
748: 
749:             async def aclose(self):
750:                 if hasattr(response.body, 'close'):
751:                     result = response.body.close()
752:                     if iscoroutine(result):  # pragma: no cover
753:                         await result
754: 
755:         return iter()
756: 
757:     @classmethod
758:     def redirect(cls, location, status_code=302):
759:         """Return a redirect response.
760: 
761:         :param location: The URL to redirect to.
762:         :param status_code: The 3xx status code to use for the redirect. The
763:                             default is 302.
764:         """
765:         if '\x0d' in location or '\x0a' in location:
766:             raise ValueError('invalid redirect URL')
767:         return cls(status_code=status_code, headers={'Location': location})
768: 
769:     @classmethod
770:     def send_file(cls, filename, status_code=200, content_type=None,
771:                   stream=None, max_age=None, compressed=False,
772:                   file_extension=''):
773:         """Send file contents in a response.
774: 
775:         :param filename: The filename of the file.
776:         :param status_code: The 3xx status code to use for the redirect. The
777:                             default is 200.
778:         :param content_type: The ``Content-Type`` header to use in the
779:                              response. If omitted, it is generated
780:                              automatically from the file extension of the
781:                              ``filename`` parameter.
782:         :param stream: A file-like object to read the file contents from. If
783:                        a stream is given, the ``filename`` parameter is only
784:                        used when generating the ``Content-Type`` header.
785:         :param max_age: The ``Cache-Control`` header's ``max-age`` value in
786:                         seconds. If omitted, the value of the
787:                         :attr:`Response.default_send_file_max_age` attribute is
788:                         used.
789:         :param compressed: Whether the file is compressed. If ``True``, the
790:                            ``Content-Encoding`` header is set to ``gzip``. A
791:                            string with the header value can also be passed.
792:                            Note that when using this option the file must have
793:                            been compressed beforehand. This option only sets
794:                            the header.
795:         :param file_extension: A file extension to append to the ``filename``
796:                                parameter when opening the file, including the
797:                                dot. The extension given here is not considered
798:                                when generating the ``Content-Type`` header.
799: 
800:         Security note: The filename is assumed to be trusted. Never pass
801:         filenames provided by the user without validating and sanitizing them
802:         first.
803:         """
804:         if content_type is None:
805:             if compressed and filename.endswith('.gz'):
806:                 ext = filename[:-3].split('.')[-1]
807:             else:
808:                 ext = filename.split('.')[-1]
809:             if ext in Response.types_map:
810:                 content_type = Response.types_map[ext]
811:             else:
812:                 content_type = 'application/octet-stream'
813:         headers = {'Content-Type': content_type}
814: 
815:         if max_age is None:
816:             max_age = cls.default_send_file_max_age
817:         if max_age is not None:
818:             headers['Cache-Control'] = 'max-age={}'.format(max_age)
819: 
820:         if compressed:
821:             headers['Content-Encoding'] = compressed \
822:                 if isinstance(compressed, str) else 'gzip'
823: 
824:         f = stream or open(filename + file_extension, 'rb')
825:         return cls(body=f, status_code=status_code, headers=headers)
826: 
827: 
828: class URLPattern():
829:     """A class that represents the URL pattern for a route.
830: 
831:     :param url_pattern: The route URL pattern, which can include static and
832:                         dynamic path segments. Dynamic segments are enclosed in
833:                         ``<`` and ``>``. The type of the segment can be given
834:                         as a prefix, separated from the name with a colon.
835:                         Supported types are ``string`` (the default),
836:                         ``int`` and ``path``. Custom types can be registered
837:                         using the :meth:`URLPattern.register_type` method.
838:     """
839: 
840:     segment_patterns = {
841:         'string': '/([^/]+)',
842:         'int': '/(-?\\d+)',
843:         'path': '/(.+)',
844:     }
845:     segment_parsers = {
846:         'int': lambda value: int(value),
847:     }
848: 
849:     @classmethod
850:     def register_type(cls, type_name, pattern='[^/]+', parser=None):
851:         """Register a new URL segment type.
852: 
853:         :param type_name: The name of the segment type to register.
854:         :param pattern: The regular expression pattern to use when matching
855:                         this segment type. If not given, a default matcher for
856:                         a single path segment is used.
857:         :param parser: A callable that will be used to parse and transform the
858:                        value of the segment. If omitted, the value is returned
859:                        as a string.
860:         """
861:         cls.segment_patterns[type_name] = '/({})'.format(pattern)
862:         cls.segment_parsers[type_name] = parser
863: 
864:     def __init__(self, url_pattern):
865:         self.url_pattern = url_pattern
866:         self.segments = []
867:         self.regex = None
868: 
869:     def compile(self):
870:         """Generate a regular expression for the URL pattern.
871: 
872:         This method is automatically invoked the first time the URL pattern is
873:         matched against a path.
874:         """
875:         pattern = ''
876:         for segment in self.url_pattern.lstrip('/').split('/'):
877:             if segment and segment[0] == '<':
878:                 if segment[-1] != '>':
879:                     raise ValueError('invalid URL pattern')
880:                 segment = segment[1:-1]
881:                 if ':' in segment:
882:                     type_, name = segment.rsplit(':', 1)
883:                 else:
884:                     type_ = 'string'
885:                     name = segment
886:                 parser = None
887:                 if type_.startswith('re:'):
888:                     pattern += '/({pattern})'.format(pattern=type_[3:])
889:                 else:
890:                     if type_ not in self.segment_patterns:
891:                         raise ValueError('invalid URL segment type')
892:                     pattern += self.segment_patterns[type_]
893:                     parser = self.segment_parsers.get(type_)
894:                 self.segments.append({'parser': parser, 'name': name,
895:                                       'type': type_})
896:             else:
897:                 pattern += '/' + segment
898:                 self.segments.append({'parser': None})
899:         self.regex = re.compile('^' + pattern + '$')
900:         return self.regex
901: 
902:     def match(self, path):
903:         """Match a path against the URL pattern.
904: 
905:         Returns a dictionary with the values of all dynamic path segments if a
906:         matche is found, or ``None`` if the path does not match this pattern.
907:         """
908:         args = {}
909:         g = (self.regex or self.compile()).match(path)
910:         if not g:
911:             return
912:         i = 1
913:         for segment in self.segments:
914:             if 'name' not in segment:
915:                 continue
916:             arg = g.group(i)
917:             if segment['parser']:
918:                 arg = self.segment_parsers[segment['type']](arg)
919:                 if arg is None:
920:                     return
921:             args[segment['name']] = arg
922:             i += 1
923:         return args
924: 
925:     def __repr__(self):  # pragma: no cover
926:         return 'URLPattern: {}'.format(self.url_pattern)
927: 
928: 
929: class HTTPException(Exception):
930:     def __init__(self, status_code, reason=None):
931:         self.status_code = status_code
932:         self.reason = reason or str(status_code) + ' error'
933: 
934:     def __repr__(self):  # pragma: no cover
935:         return 'HTTPException: {}'.format(self.status_code)
936: 
937: 
938: class Microdot:
939:     """An HTTP application class.
940: 
941:     This class implements an HTTP application instance and is heavily
942:     influenced by the ``Flask`` class of the Flask framework. It is typically
943:     declared near the start of the main application script.
944: 
945:     Example::
946: 
947:         from microdot import Microdot
948: 
949:         app = Microdot()
950:     """
951: 
952:     def __init__(self):
953:         self.url_map = []
954:         self.before_request_handlers = []
955:         self.after_request_handlers = []
956:         self.after_error_request_handlers = []
957:         self.error_handlers = {}
958:         self.options_handler = self.default_options_handler
959:         self.ssl = False
960:         self.debug = False
961:         self.server = None
962: 
963:     def route(self, url_pattern, methods=None):
964:         """Decorator that is used to register a function as a request handler
965:         for a given URL.
966: 
967:         :param url_pattern: The URL pattern that will be compared against
968:                             incoming requests.
969:         :param methods: The list of HTTP methods to be handled by the
970:                         decorated function. If omitted, only ``GET`` requests
971:                         are handled.
972: 
973:         The URL pattern can be a static path (for example, ``/users`` or
974:         ``/api/invoices/search``) or a path with dynamic components enclosed
975:         in ``<`` and ``>`` (for example, ``/users/<id>`` or
976:         ``/invoices/<number>/products``). Dynamic path components can also
977:         include a type prefix, separated from the name with a colon (for
978:         example, ``/users/<int:id>``). The type can be ``string`` (the
979:         default), ``int``, ``path`` or ``re:[regular-expression]``.
980: 
981:         The first argument of the decorated function must be
982:         the request object. Any path arguments that are specified in the URL
983:         pattern are passed as keyword arguments. The return value of the
984:         function must be a :class:`Response` instance, or the arguments to
985:         be passed to this class.
986: 
987:         Example::
988: 
989:             @app.route('/')
990:             def index(request):
991:                 return 'Hello, world!'
992:         """
993:         def decorated(f):
994:             self.url_map.append(
995:                 ([m.upper() for m in (methods or ['GET'])],
996:                  URLPattern(url_pattern), f, '', None))
997:             return f
998:         return decorated
999: 
1000:     def get(self, url_pattern):
1001:         """Decorator that is used to register a function as a ``GET`` request
1002:         handler for a given URL.
1003: 
1004:         :param url_pattern: The URL pattern that will be compared against
1005:                             incoming requests.
1006: 
1007:         This decorator can be used as an alias to the ``route`` decorator with
1008:         ``methods=['GET']``.
1009: 
1010:         Example::
1011: 
1012:             @app.get('/users/<int:id>')
1013:             def get_user(request, id):
1014:                 # ...
1015:         """
1016:         return self.route(url_pattern, methods=['GET'])
1017: 
1018:     def post(self, url_pattern):
1019:         """Decorator that is used to register a function as a ``POST`` request
1020:         handler for a given URL.
1021: 
1022:         :param url_pattern: The URL pattern that will be compared against
1023:                             incoming requests.
1024: 
1025:         This decorator can be used as an alias to the``route`` decorator with
1026:         ``methods=['POST']``.
1027: 
1028:         Example::
1029: 
1030:             @app.post('/users')
1031:             def create_user(request):
1032:                 # ...
1033:         """
1034:         return self.route(url_pattern, methods=['POST'])
1035: 
1036:     def put(self, url_pattern):
1037:         """Decorator that is used to register a function as a ``PUT`` request
1038:         handler for a given URL.
1039: 
1040:         :param url_pattern: The URL pattern that will be compared against
1041:                             incoming requests.
1042: 
1043:         This decorator can be used as an alias to the ``route`` decorator with
1044:         ``methods=['PUT']``.
1045: 
1046:         Example::
1047: 
1048:             @app.put('/users/<int:id>')
1049:             def edit_user(request, id):
1050:                 # ...
1051:         """
1052:         return self.route(url_pattern, methods=['PUT'])
1053: 
1054:     def patch(self, url_pattern):
1055:         """Decorator that is used to register a function as a ``PATCH`` request
1056:         handler for a given URL.
1057: 
1058:         :param url_pattern: The URL pattern that will be compared against
1059:                             incoming requests.
1060: 
1061:         This decorator can be used as an alias to the ``route`` decorator with
1062:         ``methods=['PATCH']``.
1063: 
1064:         Example::
1065: 
1066:             @app.patch('/users/<int:id>')
1067:             def edit_user(request, id):
1068:                 # ...
1069:         """
1070:         return self.route(url_pattern, methods=['PATCH'])
1071: 
1072:     def delete(self, url_pattern):
1073:         """Decorator that is used to register a function as a ``DELETE``
1074:         request handler for a given URL.
1075: 
1076:         :param url_pattern: The URL pattern that will be compared against
1077:                             incoming requests.
1078: 
1079:         This decorator can be used as an alias to the ``route`` decorator with
1080:         ``methods=['DELETE']``.
1081: 
1082:         Example::
1083: 
1084:             @app.delete('/users/<int:id>')
1085:             def delete_user(request, id):
1086:                 # ...
1087:         """
1088:         return self.route(url_pattern, methods=['DELETE'])
1089: 
1090:     def before_request(self, f):
1091:         """Decorator to register a function to run before each request is
1092:         handled. The decorated function must take a single argument, the
1093:         request object.
1094: 
1095:         Example::
1096: 
1097:             @app.before_request
1098:             def func(request):
1099:                 # ...
1100:         """
1101:         self.before_request_handlers.append(f)
1102:         return f
1103: 
1104:     def after_request(self, f):
1105:         """Decorator to register a function to run after each request is
1106:         handled. The decorated function must take two arguments, the request
1107:         and response objects. The return value of the function must be an
1108:         updated response object.
1109: 
1110:         Example::
1111: 
1112:             @app.after_request
1113:             def func(request, response):
1114:                 # ...
1115:                 return response
1116:         """
1117:         self.after_request_handlers.append(f)
1118:         return f
1119: 
1120:     def after_error_request(self, f):
1121:         """Decorator to register a function to run after an error response is
1122:         generated. The decorated function must take two arguments, the request
1123:         and response objects. The return value of the function must be an
1124:         updated response object. The handler is invoked for error responses
1125:         generated by Microdot, as well as those returned by application-defined
1126:         error handlers.
1127: 
1128:         Example::
1129: 
1130:             @app.after_error_request
1131:             def func(request, response):
1132:                 # ...
1133:                 return response
1134:         """
1135:         self.after_error_request_handlers.append(f)
1136:         return f
1137: 
1138:     def errorhandler(self, status_code_or_exception_class):
1139:         """Decorator to register a function as an error handler. Error handler
1140:         functions for numeric HTTP status codes must accept a single argument,
1141:         the request object. Error handler functions for Python exceptions
1142:         must accept two arguments, the request object and the exception
1143:         object.
1144: 
1145:         :param status_code_or_exception_class: The numeric HTTP status code or
1146:                                                Python exception class to
1147:                                                handle.
1148: 
1149:         Examples::
1150: 
1151:             @app.errorhandler(404)
1152:             def not_found(request):
1153:                 return 'Not found'
1154: 
1155:             @app.errorhandler(RuntimeError)
1156:             def runtime_error(request, exception):
1157:                 return 'Runtime error'
1158:         """
1159:         def decorated(f):
1160:             self.error_handlers[status_code_or_exception_class] = f
1161:             return f
1162:         return decorated
1163: 
1164:     def mount(self, subapp, url_prefix='', local=False):
1165:         """Mount a sub-application, optionally under the given URL prefix.
1166: 
1167:         :param subapp: The sub-application to mount.
1168:         :param url_prefix: The URL prefix to mount the application under.
1169:         :param local: When set to ``True``, the before, after and error request
1170:                       handlers only apply to endpoints defined in the
1171:                       sub-application. When ``False``, they apply to the entire
1172:                       application. The default is ``False``.
1173:         """
1174:         for methods, pattern, handler, _prefix, _subapp in subapp.url_map:
1175:             self.url_map.append(
1176:                 (methods, URLPattern(url_prefix + pattern.url_pattern),
1177:                  handler, url_prefix + _prefix, _subapp or subapp))
1178:         if not local:
1179:             for handler in subapp.before_request_handlers:
1180:                 self.before_request_handlers.append(handler)
1181:             subapp.before_request_handlers = []
1182:             for handler in subapp.after_request_handlers:
1183:                 self.after_request_handlers.append(handler)
1184:             subapp.after_request_handlers = []
1185:             for handler in subapp.after_error_request_handlers:
1186:                 self.after_error_request_handlers.append(handler)
1187:             subapp.after_error_request_handlers = []
1188:             for status_code, handler in subapp.error_handlers.items():
1189:                 self.error_handlers[status_code] = handler
1190:             subapp.error_handlers = {}
1191: 
1192:     @staticmethod
1193:     def abort(status_code, reason=None):
1194:         """Abort the current request and return an error response with the
1195:         given status code.
1196: 
1197:         :param status_code: The numeric status code of the response.
1198:         :param reason: The reason for the response, which is included in the
1199:                        response body.
1200: 
1201:         Example::
1202: 
1203:             from microdot import abort
1204: 
1205:             @app.route('/users/<int:id>')
1206:             def get_user(id):
1207:                 user = get_user_by_id(id)
1208:                 if user is None:
1209:                     abort(404)
1210:                 return user.to_dict()
1211:         """
1212:         raise HTTPException(status_code, reason)
1213: 
1214:     async def start_server(self, host='0.0.0.0', port=5000, debug=False,
1215:                            ssl=None, start_serving=True):
1216:         """Start the Microdot web server as a coroutine. This coroutine does
1217:         not normally return, as the server enters an endless listening loop.
1218:         The :func:`shutdown` function provides a method for terminating the
1219:         server gracefully.
1220: 
1221:         :param host: The hostname or IP address of the network interface that
1222:                      will be listening for requests. A value of ``'0.0.0.0'``
1223:                      (the default) indicates that the server should listen for
1224:                      requests on all the available interfaces, and a value of
1225:                      ``127.0.0.1`` indicates that the server should listen
1226:                      for requests only on the internal networking interface of
1227:                      the host.
1228:         :param port: The port number to listen for requests. The default is
1229:                      port 5000.
1230:         :param debug: If ``True``, the server logs debugging information. The
1231:                       default is ``False``.
1232:         :param ssl: An ``SSLContext`` instance or ``None`` if the server should
1233:                     not use TLS. The default is ``None``.
1234:         :param start_serving: If ``True``, the server starts accepting
1235:                               connections immediately. When set to ``False``,
1236:                               this method returns a ``Server`` object. To
1237:                               accept connections, the
1238:                               ``Server.serve_forever()`` method should be
1239:                               called. The default is ``True``. A value of
1240:                               ``False`` is only supported in CPython.
1241: 
1242:         This method is a coroutine.
1243: 
1244:         Example::
1245: 
1246:             import asyncio
1247:             from microdot import Microdot
1248: 
1249:             app = Microdot()
1250: 
1251:             @app.route('/')
1252:             async def index(request):
1253:                 return 'Hello, world!'
1254: 
1255:             async def main():
1256:                 await app.start_server(debug=True)
1257: 
1258:             asyncio.run(main())
1259:         """
1260:         self.ssl = ssl
1261:         self.debug = debug
1262: 
1263:         async def serve(reader, writer):
1264:             if not hasattr(writer, 'awrite'):  # pragma: no cover
1265:                 # CPython provides the awrite and aclose methods in 3.8+
1266:                 async def awrite(self, data):
1267:                     self.write(data)
1268:                     await self.drain()
1269: 
1270:                 async def aclose(self):
1271:                     self.close()
1272:                     await self.wait_closed()
1273: 
1274:                 from types import MethodType
1275:                 writer.awrite = MethodType(awrite, writer)
1276:                 writer.aclose = MethodType(aclose, writer)
1277: 
1278:             await self.handle_request(reader, writer)
1279: 
1280:         if self.debug:  # pragma: no cover
1281:             print('Starting async server on {host}:{port}...'.format(
1282:                 host=host, port=port))
1283: 
1284:         try:
1285:             self.server = await asyncio.start_server(
1286:                 serve, host, port, ssl=ssl, start_serving=start_serving)
1287:             if not start_serving:
1288:                 return self.server
1289:         except TypeError:  # pragma: no cover
1290:             if not start_serving:
1291:                 raise ValueError('start_serving must be True')
1292:             try:
1293:                 self.server = await asyncio.start_server(serve, host, port,
1294:                                                          ssl=ssl)
1295:             except TypeError:  # pragma: no cover
1296:                 self.server = await asyncio.start_server(serve, host, port)
1297: 
1298:         while True:
1299:             try:
1300:                 if hasattr(self.server, 'serve_forever'):  # pragma: no cover
1301:                     try:
1302:                         await self.server.serve_forever()
1303:                     except asyncio.CancelledError:
1304:                         pass
1305:                 await self.server.wait_closed()
1306:                 break
1307:             except AttributeError:  # pragma: no cover
1308:                 # the task hasn't been initialized in the server object yet
1309:                 # wait a bit and try again
1310:                 await asyncio.sleep(0.1)
1311: 
1312:     def run(self, host='0.0.0.0', port=5000, debug=False, ssl=None):
1313:         """Start the web server. This function does not normally return, as
1314:         the server enters an endless listening loop. The :func:`shutdown`
1315:         function provides a method for terminating the server gracefully.
1316: 
1317:         :param host: The hostname or IP address of the network interface that
1318:                      will be listening for requests. A value of ``'0.0.0.0'``
1319:                      (the default) indicates that the server should listen for
1320:                      requests on all the available interfaces, and a value of
1321:                      ``127.0.0.1`` indicates that the server should listen
1322:                      for requests only on the internal networking interface of
1323:                      the host.
1324:         :param port: The port number to listen for requests. The default is
1325:                      port 5000.
1326:         :param debug: If ``True``, the server logs debugging information. The
1327:                       default is ``False``.
1328:         :param ssl: An ``SSLContext`` instance or ``None`` if the server should
1329:                     not use TLS. The default is ``None``.
1330: 
1331:         Example::
1332: 
1333:             from microdot import Microdot
1334: 
1335:             app = Microdot()
1336: 
1337:             @app.route('/')
1338:             async def index(request):
1339:                 return 'Hello, world!'
1340: 
1341:             app.run(debug=True)
1342:         """
1343:         asyncio.run(self.start_server(host=host, port=port, debug=debug,
1344:                                       ssl=ssl))  # pragma: no cover
1345: 
1346:     def shutdown(self):
1347:         """Request a server shutdown. The server will then exit its request
1348:         listening loop and the :func:`run` function will return. This function
1349:         can be safely called from a route handler, as it only schedules the
1350:         server to terminate as soon as the request completes.
1351: 
1352:         Example::
1353: 
1354:             @app.route('/shutdown')
1355:             def shutdown(request):
1356:                 request.app.shutdown()
1357:                 return 'The server is shutting down...'
1358:         """
1359:         self.server.close()
1360: 
1361:     def find_route(self, req):
1362:         method = req.method.upper()
1363:         if method == 'OPTIONS' and self.options_handler:
1364:             return self.options_handler(req), '', None
1365:         if method == 'HEAD':
1366:             method = 'GET'
1367:         f = 404
1368:         p = ''
1369:         s = None
1370:         for route_methods, route_pattern, route_handler, url_prefix, subapp \
1371:                 in self.url_map:
1372:             req.url_args = route_pattern.match(req.path)
1373:             if req.url_args is not None:
1374:                 p = url_prefix
1375:                 s = subapp
1376:                 if method in route_methods:
1377:                     f = route_handler
1378:                     break
1379:                 else:
1380:                     f = 405
1381:         return f, p, s
1382: 
1383:     def default_options_handler(self, req):

(Output capped at 50 KB. Showing lines 1-1383. Use offset=1384 to continue.)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/ghost/git/colour_app/colour_app/libs/microdot/websocket.py"
}
```

**Output:**
```
<path>/home/ghost/git/colour_app/colour_app/libs/microdot/websocket.py</path>
<type>file</type>
<content>
1: import binascii
2: import hashlib
3: from libs.microdot import Request, Response
4: from libs.microdot.microdot import MUTED_SOCKET_ERRORS, print_exception
5: from libs.microdot.helpers import wraps
6: 
7: 
8: class WebSocketError(Exception):
9:     """Exception raised when an error occurs in a WebSocket connection."""
10:     pass
11: 
12: 
13: class WebSocket:
14:     """A WebSocket connection object.
15: 
16:     An instance of this class is sent to handler functions to manage the
17:     WebSocket connection.
18:     """
19:     CONT = 0
20:     TEXT = 1
21:     BINARY = 2
22:     CLOSE = 8
23:     PING = 9
24:     PONG = 10
25: 
26:     #: Specify the maximum message size that can be received when calling the
27:     #: ``receive()`` method. Messages with payloads that are larger than this
28:     #: size will be rejected and the connection closed. Set to 0 to disable
29:     #: the size check (be aware of potential security issues if you do this),
30:     #: or to -1 to use the value set in
31:     #: ``Request.max_body_length``. The default is -1.
32:     #:
33:     #: Example::
34:     #:
35:     #:    WebSocket.max_message_length = 4 * 1024  # up to 4KB messages
36:     max_message_length = -1
37: 
38:     def __init__(self, request):
39:         self.request = request
40:         self.closed = False
41: 
42:     async def handshake(self):
43:         response = self._handshake_response()
44:         await self.request.sock[1].awrite(
45:             b'HTTP/1.1 101 Switching Protocols\r\n')
46:         await self.request.sock[1].awrite(b'Upgrade: websocket\r\n')
47:         await self.request.sock[1].awrite(b'Connection: Upgrade\r\n')
48:         await self.request.sock[1].awrite(
49:             b'Sec-WebSocket-Accept: ' + response + b'\r\n\r\n')
50: 
51:     async def receive(self):
52:         """Receive a message from the client."""
53:         while True:
54:             opcode, payload = await self._read_frame()
55:             send_opcode, data = self._process_websocket_frame(opcode, payload)
56:             if send_opcode:  # pragma: no cover
57:                 await self.send(data, send_opcode)
58:             elif data:  # pragma: no branch
59:                 return data
60: 
61:     async def send(self, data, opcode=None):
62:         """Send a message to the client.
63: 
64:         :param data: the data to send, given as a string or bytes.
65:         :param opcode: a custom frame opcode to use. If not given, the opcode
66:                        is ``TEXT`` or ``BINARY`` depending on the type of the
67:                        data.
68:         """
69:         frame = self._encode_websocket_frame(
70:             opcode or (self.TEXT if isinstance(data, str) else self.BINARY),
71:             data)
72:         await self.request.sock[1].awrite(frame)
73: 
74:     async def close(self):
75:         """Close the websocket connection."""
76:         if not self.closed:  # pragma: no cover
77:             self.closed = True
78:             await self.send(b'', self.CLOSE)
79: 
80:     def _handshake_response(self):
81:         connection = False
82:         upgrade = False
83:         websocket_key = None
84:         for header, value in self.request.headers.items():
85:             h = header.lower()
86:             if h == 'connection':
87:                 connection = True
88:                 if 'upgrade' not in value.lower():
89:                     return self.request.app.abort(400)
90:             elif h == 'upgrade':
91:                 upgrade = True
92:                 if not value.lower() == 'websocket':
93:                     return self.request.app.abort(400)
94:             elif h == 'sec-websocket-key':
95:                 websocket_key = value
96:         if not connection or not upgrade or not websocket_key:
97:             return self.request.app.abort(400)
98:         d = hashlib.sha1(websocket_key.encode())
99:         d.update(b'258EAFA5-E914-47DA-95CA-C5AB0DC85B11')
100:         return binascii.b2a_base64(d.digest())[:-1]
101: 
102:     @classmethod
103:     def _parse_frame_header(cls, header):
104:         fin = header[0] & 0x80
105:         opcode = header[0] & 0x0f
106:         if fin == 0 or opcode == cls.CONT:  # pragma: no cover
107:             raise WebSocketError('Continuation frames not supported')
108:         has_mask = header[1] & 0x80
109:         length = header[1] & 0x7f
110:         if length == 126:
111:             length = -2
112:         elif length == 127:
113:             length = -8
114:         return fin, opcode, has_mask, length
115: 
116:     def _process_websocket_frame(self, opcode, payload):
117:         if opcode == self.TEXT:
118:             payload = payload.decode()
119:         elif opcode == self.BINARY:
120:             pass
121:         elif opcode == self.CLOSE:
122:             raise WebSocketError('Websocket connection closed')
123:         elif opcode == self.PING:
124:             return self.PONG, payload
125:         elif opcode == self.PONG:  # pragma: no branch
126:             return None, None
127:         return None, payload
128: 
129:     @classmethod
130:     def _encode_websocket_frame(cls, opcode, payload):
131:         frame = bytearray()
132:         frame.append(0x80 | opcode)
133:         if opcode == cls.TEXT:
134:             payload = payload.encode()
135:         if len(payload) < 126:
136:             frame.append(len(payload))
137:         elif len(payload) < (1 << 16):
138:             frame.append(126)
139:             frame.extend(len(payload).to_bytes(2, 'big'))
140:         else:
141:             frame.append(127)
142:             frame.extend(len(payload).to_bytes(8, 'big'))
143:         frame.extend(payload)
144:         return frame
145: 
146:     async def _read_frame(self):
147:         header = await self.request.sock[0].read(2)
148:         if len(header) != 2:  # pragma: no cover
149:             raise WebSocketError('Websocket connection closed')
150:         fin, opcode, has_mask, length = self._parse_frame_header(header)
151:         if length == -2:
152:             length = await self.request.sock[0].readexactly(2)
153:             length = int.from_bytes(length, 'big')
154:         elif length == -8:
155:             length = await self.request.sock[0].readexactly(8)
156:             length = int.from_bytes(length, 'big')
157:         max_allowed_length = Request.max_body_length \
158:             if self.max_message_length == -1 else self.max_message_length
159:         if length > max_allowed_length:
160:             raise WebSocketError('Message too large')
161:         if has_mask:  # pragma: no cover
162:             mask = await self.request.sock[0].readexactly(4)
163:         payload = await self.request.sock[0].readexactly(length)
164:         if has_mask:  # pragma: no cover
165:             payload = bytes(x ^ mask[i % 4] for i, x in enumerate(payload))
166:         return opcode, payload
167: 
168: 
169: async def websocket_upgrade(request):
170:     """Upgrade a request handler to a websocket connection.
171: 
172:     This function can be called directly inside a route function to process a
173:     WebSocket upgrade handshake, for example after the user's credentials are
174:     verified. The function returns the websocket object::
175: 
176:         @app.route('/echo')
177:         async def echo(request):
178:             if not authenticate_user(request):
179:                 abort(401)
180:             ws = await websocket_upgrade(request)
181:             while True:
182:                 message = await ws.receive()
183:                 await ws.send(message)
184:     """
185:     ws = WebSocket(request)
186:     await ws.handshake()
187: 
188:     @request.after_request
189:     async def after_request(request, response):
190:         return Response.already_handled
191: 
192:     return ws
193: 
194: 
195: def websocket_wrapper(f, upgrade_function):
196:     @wraps(f)
197:     async def wrapper(request, *args, **kwargs):
198:         ws = await upgrade_function(request)
199:         try:
200:             await f(request, ws, *args, **kwargs)
201:         except OSError as exc:
202:             if exc.errno not in MUTED_SOCKET_ERRORS:  # pragma: no cover
203:                 raise
204:         except WebSocketError:
205:             pass
206:         except Exception as exc:
207:             print_exception(exc)
208:         finally:  # pragma: no cover
209:             try:
210:                 await ws.close()
211:             except Exception:
212:                 pass
213:         return Response.already_handled
214:     return wrapper
215: 
216: 
217: def with_websocket(f):
218:     """Decorator to make a route a WebSocket endpoint.
219: 
220:     This decorator is used to define a route that accepts websocket
221:     connections. The route then receives a websocket object as a second
222:     argument that it can use to send and receive messages::
223: 
224:         @app.route('/echo')
225:         @with_websocket
226:         async def echo(request, ws):
227:             while True:
228:                 message = await ws.receive()
229:                 await ws.send(message)
230:     """
231:     return websocket_wrapper(f, websocket_upgrade)

(End of file - total 231 lines)
</content>
```

---

## Assistant (Plan · Nemotron 3.5 Lightning Free · 6.9s)

_Thinking:_

Now let me also check the test files to understand how the project is tested and what's expected.

Now let me check the tests to understand the testing approach:





**Tool: read**

**Input:**
```json
{
  "filePath": "/home/ghost/git/colour_app/tests/test_app.py"
}
```

**Output:**
```
<path>/home/ghost/git/colour_app/tests/test_app.py</path>
<type>file</type>
<content>
1: import asyncio
2: import os
3: import ssl
4: import sys
5: from unittest.mock import AsyncMock, MagicMock, patch
6: 
7: from colour_app import app
8: from colour_app.app import main
9: 
10: 
11: async def test_index(client):
12:     res = await client.get("/")
13:     assert res.status_code == 200
14:     assert b"Modern PWA Template" in res.body
15: 
16: 
17: async def test_favicon(client):
18:     res = await client.get("/favicon.ico")
19:     assert res.status_code == 200
20: 
21: 
22: async def test_save_config(client, monkeypatch):
23:     res = await client.get("/")
24:     monkeypatch.setattr(
25:         os.path, "exists", lambda path: False
26:     )  # Simulate file not exists
27:     assert res.status_code == 200
28: 
29: 
30: async def test_static_ok(client):
31:     res = await client.get("/static/styles.css")
32:     assert res.status_code == 200
33: 
34: 
35: async def test_static_nok(client):
36:     res = await client.get("/static/..")
37:     assert res.status_code == 404
38: 
39: async def test_static_missing(client):
40:     res = await client.get("/static/missing")
41:     assert res.status_code == 500
42: 
43: async def test_measure(client):
44:     res = await client.get("/measure")
45:     assert res.status_code == 503
46: 
47: async def test_dashboard(client):
48:     res = await client.get("/dashboard")
49:     assert res.status_code == 200
50:     assert b"Dashboard IoT" in res.body
51: 
52: 
53: async def test_config_data_get(client):
54:     res = await client.get("/config-data")
55:     assert res.status_code == 200
56: 
57:     data = res.json
58:     assert "update_interval" in data
59: 
60: 
61: async def test_config_get(client):
62:     res = await client.get("/config")
63:     assert res.status_code == 200
64:     assert "Configurações".encode() in res.body
65: 
66: 
67: async def test_config_post(client):
68:     payload = {"update_interval": 2, "temp_threshold": 35, "humidity_threshold": 80}
69: 
70:     res = await client.post("/config", body=payload)
71:     assert res.status_code == 200
72:     assert res.json["status"] == "ok"
73: 
74: 
75: async def test_config_post_exception(client):
76:     res = await client.post("/config")
77:     assert res.status_code == 400
78: 
79: 
80: async def test_reset_config(client):
81:     res = await client.post("/reset-config")
82:     assert res.status_code == 200
83:     assert res.json["status"] == "resetado"
84: 
85: 
86: async def test_measure_with_mock_sensor(client):
87:     mock_sensor = AsyncMock()
88:     mock_sensor.get_measurements.return_value = {
89:         "f1": 100, "f2": 200, "f3": 300, "f4": 400,
90:         "f5": 500, "f6": 600, "f7": 700, "f8": 800,
91:         "clr": 900, "nir": 1000, "fd": 1,
92:     }
93:     with patch.object(app, "color_sensor", mock_sensor):
94:         res = await client.get("/measure")
95:     assert res.status_code == 200
96:     assert res.json["f1"] == 100
97:     assert res.json["fd"] == 1
98: 
99: 
100: async def test_main_server_start_micropython():
101:     sslctx_mock = MagicMock()
102:     sslctx_mock.load_cert_chain = MagicMock()
103:     done = asyncio.Event()
104:     done.set()
105: 
106:     with (
107:         patch("colour_app.app.sys") as mock_sys,
108:         patch("colour_app.app.ssl.SSLContext", return_value=sslctx_mock) as mock_ssl,
109:         patch("colour_app.app.asyncio.create_task", return_value=done.wait()) as mock_create_task,
110:     ):
111:         mock_sys.implementation.name = "micropython"
112:         await main()
113: 
114:     mock_ssl.assert_called_once_with(ssl.PROTOCOL_TLS_SERVER)
115:     sslctx_mock.load_cert_chain.assert_called_once()
116:     mock_create_task.assert_called_once()
117: 
118: 
119: async def test_main_server_start_cpython():
120:     sslctx_mock = MagicMock()
121:     sslctx_mock.load_cert_chain = MagicMock()
122:     done = asyncio.Event()
123:     done.set()
124: 
125:     with (
126:         patch("colour_app.app.sys") as mock_sys,
127:         patch("colour_app.app.ssl.SSLContext", return_value=sslctx_mock) as mock_ssl,
128:         patch("colour_app.app.asyncio.create_task", return_value=done.wait()) as mock_create_task,
129:     ):
130:         mock_sys.implementation.name = "cpython"
131:         await main()
132: 
133:     mock_ssl.assert_called_once_with(ssl.PROTOCOL_TLS_SERVER)
134:     sslctx_mock.load_cert_chain.assert_called_once()
135:     mock_create_task.assert_called_once()
136: 
137: 
138: async def test_websocket_upgrade_required(client):
139:     res = await client.get("/ws")
140:     assert res.status_code == 400

(End of file - total 140 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/ghost/git/colour_app/tests/conftest.py"
}
```

**Output:**
```
<path>/home/ghost/git/colour_app/tests/conftest.py</path>
<type>file</type>
<content>
1: import pytest
2: from colour_app.libs.microdot.test_client import TestClient
3: from colour_app import app
4: 
5: 
6: @pytest.fixture
7: def client():
8:     """Cliente de teste do Microdot"""
9:     client = TestClient(app.app)
10:     return client

(End of file - total 10 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/ghost/git/colour_app/tests/test_sensor.py"
}
```

**Output:**
```
<path>/home/ghost/git/colour_app/tests/test_sensor.py</path>
<type>file</type>
<content>
1: import sys
2: from unittest.mock import MagicMock, patch
3: 
4: import pytest
5: 
6: machine = MagicMock()
7: machine.I2C = MagicMock(return_value=MagicMock())
8: machine.Pin = MagicMock(return_value=MagicMock())
9: 
10: with patch.dict(sys.modules, {"machine": machine}):
11:     import importlib
12:     from colour_app import sensor
13:     importlib.reload(sensor)
14: 
15:     from colour_app.sensor import Sensor
16: 
17: 
18: @pytest.fixture(autouse=True)
19: def mock_as7341():
20:     patches = [
21:         patch.object(sensor.AS7341, "reset", return_value=True),
22:         patch.object(sensor.AS7341, "set_measure_mode"),
23:         patch.object(sensor.AS7341, "set_atime"),
24:         patch.object(sensor.AS7341, "set_astep"),
25:         patch.object(sensor.AS7341, "set_again"),
26:         patch.object(sensor.AS7341, "isconnected", return_value=True),
27:         patch.object(sensor.AS7341, "get_spectral_data", return_value=(1, 2, 3, 4, 5, 6)),
28:         patch.object(sensor.AS7341, "start_measure"),
29:         patch.object(sensor.AS7341, "measurement_completed", return_value=True),
30:         patch.object(sensor.AS7341, "_modify_reg"),
31:         patch.object(sensor.AS7341, "_write_byte"),
32:         patch.object(sensor.AS7341, "set_spectral_measurement"),
33:         patch.object(sensor.AS7341, "set_smux"),
34:         patch.object(sensor.AS7341, "channel_select"),
35:     ]
36:     for p in patches:
37:         p.start()
38:     yield
39:     for p in patches:
40:         p.stop()
41: 
42: 
43: def _make_sensor():
44:     machine.I2C.reset_mock()
45:     return Sensor()
46: 
47: 
48: def test_sensor_init():
49:     sensor_inst = _make_sensor()
50:     assert sensor_inst is not None
51:     assert sensor_inst._connected is True
52: 
53: 
54: def test_sensor_isconnected():
55:     sensor_inst = _make_sensor()
56:     assert sensor_inst.isconnected() is True
57: 
58: 
59: def test_const_fallback():
60:     assert callable(sensor.const)
61:     assert sensor.const(42) == 42
62: 
63: 
64: @pytest.mark.asyncio
65: async def test_get_measurements():
66:     sensor_inst = _make_sensor()
67:     result = await sensor_inst.get_measurements()
68: 
69:     assert isinstance(result, dict)
70:     assert result["f1"] == 1
71:     assert result["f2"] == 2
72:     assert result["f3"] == 3
73:     assert result["f4"] == 4
74:     assert result["f5"] == 1
75:     assert result["f6"] == 2
76:     assert result["f7"] == 3
77:     assert result["f8"] == 4
78:     assert result["clr"] == 5
79:     assert result["nir"] == 6
80:     assert result["fd"] == 6
81: 
82: 
83: @pytest.mark.asyncio
84: async def test_get_measurements_not_connected():
85:     with patch.object(sensor.AS7341, "isconnected", return_value=False):
86:         sensor_inst = _make_sensor()
87:         result = await sensor_inst.get_measurements()
88:     assert result == {"error": "Sensor não conectado"}
89: 
90: 
91: @pytest.mark.asyncio
92: async def test_start_measure_smux_string():
93:     sensor_inst = _make_sensor()
94:     await sensor_inst.start_measure("F1F4CN")
95:     sensor.AS7341.channel_select.assert_called_once_with("F1F4CN")

(End of file - total 95 lines)
</content>
```

---

## Assistant (Plan · Nemotron 3.5 Lightning Free · 17.1s)

_Thinking:_

Now I have a good understanding of the project. Let me analyze the project against Python and MicroPython best practices.

The project is a colour monitoring application that:
1. Uses an AS7341 spectral sensor connected via I2C
2. Runs on both ESP32 (MicroPython) and CPython (for development)
3. Uses Microdot framework for web server
4. Serves a PWA dashboard with HTTPS
5. Has WebSocket support for real-time communication

Let me now evaluate the project against Python/MicroPython best practices and identify areas for improvement.

Key areas to evaluate:
1. Code structure and organization
2. Type hints and typing
3. Error handling
4. Resource management
5. MicroPython-specific considerations
6. CPython compatibility
7. Testing
8. Security
9. Performance
10. Code style

Let me organize my findings and then provide a comprehensive evaluation.

Now I have a thorough understanding of the project. Let me evaluate it against Python and MicroPython best practices.



**Tool: todowrite**

**Input:**
```json
{
  "todos": [
    {
      "content": "Evaluate project structure and organization",
      "status": "in_progress",
      "priority": "high"
    },
    {
      "content": "Assess type hints and typing",
      "status": "pending",
      "priority": "high"
    },
    {
      "content": "Review error handling and robustness",
      "status": "pending",
      "priority": "high"
    },
    {
      "content": "Check MicroPython-specific best practices",
      "status": "pending",
      "priority": "high"
    },
    {
      "content": "Review CPython compatibility",
      "status": "pending",
      "priority": "medium"
    },
    {
      "content": "Assess testing coverage and quality",
      "status": "pending",
      "priority": "medium"
    },
    {
      "content": "Check security considerations",
      "status": "pending",
      "priority": "medium"
    },
    {
      "content": "Evaluate performance and resource usage",
      "status": "pending",
      "priority": "medium"
    },
    {
      "content": "Summarize findings and recommendations",
      "status": "pending",
      "priority": "high"
    }
  ]
}
```

**Output:**
```
[
  {
    "content": "Evaluate project structure and organization",
    "status": "in_progress",
    "priority": "high"
  },
  {
    "content": "Assess type hints and typing",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Review error handling and robustness",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Check MicroPython-specific best practices",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Review CPython compatibility",
    "status": "pending",
    "priority": "medium"
  },
  {
    "content": "Assess testing coverage and quality",
    "status": "pending",
    "priority": "medium"
  },
  {
    "content": "Check security considerations",
    "status": "pending",
    "priority": "medium"
  },
  {
    "content": "Evaluate performance and resource usage",
    "status": "pending",
    "priority": "medium"
  },
  {
    "content": "Summarize findings and recommendations",
    "status": "pending",
    "priority": "high"
  }
]
```

---

## Assistant (Plan · Nemotron 3.5 Lightning Free · 57.8s)

_Thinking:_

Let me now do a thorough analysis of the project. I'll review each area systematically.

## Project Evaluation: Python & MicroPython Best Practices

### 1. Code Structure and Organization ✓

**Strengths:**
- Clear separation of concerns: `app.py` (web server), `sensor.py` (driver), `boot.py` (ESP32 setup)
- Good directory structure following the documented layout
- Microdot framework properly separated in `libs/microdot/`
- Build system configured with Poetry and `tools/build.py`

**Improvements needed:**
- `env.py` is referenced but not found in the project root (only referenced in `boot.py`)
- Some imports are conditional/try/except which could be confusing
- `libs/tools/typing.py` provides a minimal custom typing layer - consider using standard `typing` module

### 2. Type Hints and Typing ⚠️

**Issues:**
- `colour_app/libs/tools/typing.py` is a custom, minimal typing module that mostly returns `None` or empty values
- `Any` type is used extensively without proper imports from `typing`
- `sensor.py` line 27: `color_sensor = None` with try/except that may leave it `None`
- `app.py` line 11: `from libs.tools.typing import Any` - should use `from typing import Any`
- Type hints inconsistent: some functions have them, some don't
- `boot.py` line 4: `import requests` - this may not work on MicroPython (no `requests` stdlib)

**Recommendations:**
- Use standard `typing` module instead of custom `libs.tools.typing`
- Add proper type hints to all public functions
- Use `Optional[Type]` where values can be `None`
- Add type hints to MicroPython code where possible (pyright/pycompatible)

### 3. Error Handling and Robustness ⚠️

**Issues:**
- `app.py` line 48-49: `load_config` catches `OSError, ValueError` but re-raises `OSError` in `static` route line 84
- `app.py` line 129: `except Exception as e` in config POST - too broad
- `sensor.py` line 8-13: `const` fallback function works but is a workaround
- `boot.py` line 64: `requests.post()` may fail silently on MicroPython without proper error handling
- No explicit handling for I2C communication errors in sensor reads
- `app.py` line 78-80: directory traversal check is good but `..` check could be bypassed

**Recommendations:**
- Be more specific with exception types
- Add proper error logging instead of print statements
- Validate file paths more rigorously
- Handle I2C timeouts and errors gracefully
- Add retry logic for sensor communications

### 4. MicroPython-Specific Best Practices ⚠️

**Issues:**
- `boot.py` imports `requests` which is not available on standard MicroPython (needs `urequests`)
- `boot.py` line 4: `import requests` will fail on MicroPython
- `app.py` line 5: `import ssl` - MicroPython SSL support is limited
- `sensor.py` line 11: `from micropython import const` with fallback - good pattern
- `asyncio.sleep_ms()` used in sensor.py - MicroPython specific, good
- `utime` used in boot.py - correct MicroPython usage
- `machine.I2C`, `machine.Pin` used correctly

**Recommendations:**
- Replace `requests` with `urequests` (MicroPython) or use conditional imports
- Use `try/except ImportError` for MicroPython-specific modules
- Minimize memory usage on MicroPython (avoid large string operations)
- Use `const` from `micropython` for constants that won't change at runtime
- Be careful with `asyncio` - MicroPython's asyncio implementation has limitations

### 5. CPython Compatibility ✓

**Strengths:**
- `app.py` has conditional logic for MicroPython vs CPython (`sys.implementation.name`)
- TLS setup works differently per platform (port 443 vs 4443)
- `const` fallback function works on both platforms
- Test suite runs on CPython with pytest

**Issues:**
- `boot.py` `import requests` won't work on CPython without installation
- Some MicroPython-specific features used without fallback

### 6. Testing Coverage and Quality ⚠️

**Strengths:**
- pytest configured with coverage
- Tests cover main routes and sensor functionality
- Mock-based tests for sensor without hardware
- WebSocket upgrade test exists

**Issues:**
- Test coverage may not be comprehensive (no tests for all routes)
- `test_sensor.py` uses heavy mocking that may not reflect real behavior
- No integration tests with actual hardware
- `conftest.py` uses custom TestClient from microdot libs
- Some tests may have fragile dependencies on internal state

**Recommendations:**
- Increase test coverage for edge cases
- Add tests for config POST with invalid data
- Add tests for static file serving edge cases
- Add property-based tests or fixture variations
- Test error routes more thoroughly

### 7. Security Considerations ⚠️

**Issues:**
- CORS is commented out (`# @app.after_request`) - open access by default
- File path traversal check in `static` route (`..` in path) is good but could be improved
- No authentication on config endpoint - anyone can change settings
- `boot.py` uses `requests.post()` to notification API without timeout
- WebSocket handshake doesn't validate origin
- TLS certificates stored in `certs/` - ensure they're properly generated

**Recommendations:**
- Implement proper CORS or restrict origins
- Add authentication to config endpoint
- Add timeouts to network requests
- Validate WebSocket origin
- Securely manage TLS certificates
- Add rate limiting if needed

### 8. Performance and Resource Usage ⚠️

**Issues:**
- MicroPython: `asyncio.sleep_ms(15)` in sensor measurement wait - blocking within async
- `boot.py` `utime.sleep(1)` in connection loop blocks event loop
- No power management for sensor between measurements
- `Response.default_content_type` set to `"text/html"` globally
- Template engine initialized at module load time

**Recommendations:**
- Use non-blocking delays where possible on MicroPython
- Consider sensor power-saving between measurements
- Profile template rendering performance
- Consider lazy loading for templates
- Monitor memory usage on ESP32

### 9. MicroPython Build and Deployment ⚠️

**Issues:**
- `tools/build.py` not read yet but referenced
- `mpy-cross` compilation configured in pyproject.toml
- No `.gitignore` patterns for build artifacts visible
- Deployment via `mpremote` or WebREPL

**Recommendations:**
- Verify `tools/build.py` handles incremental builds properly
- Ensure only changed files are recompiled
- Add cleanup tasks for build artifacts
- Consider freezing modules for better performance

---

## Summary of Key Recommendations

1. **Replace custom typing** with standard `typing` module imports
2. **Fix `boot.py`** - replace `requests` with `urequests` with proper error handling
3. **Add authentication** to config endpoints
4. **Improve error handling** - be more specific with exception types
5. **Add CORS or restrict origins** properly
6. **Add timeouts** to network operations
7. **Increase test coverage** especially for edge cases
8. **Review SSL/TLS configuration** for both platforms
9. **Optimize sensor measurements** for power efficiency
10. **Fix the `env.py`** missing file issue

Would you like me to dive deeper into any specific area or help implement any of these improvements?

---

## User

sim, mas o arquivo env.py não deve ser incluido no repositorio publico

---

## Assistant (Plan · Nemotron 3.5 Lightning Free · 21.4s)

_Thinking:_

The user is agreeing that env.py should not be included in the public repo, and they're reminding me that I'm in "READ-ONLY" phase - I cannot make any edits or modifications to files. I need to just provide my analysis and recommendations without actually editing files.

Let me provide a concise summary of my evaluation without making any changes.

Entendido. Como está em fase de leitura/apenas análise, apresento abaixo o resumo das minhas observações sobre o projeto colour_app, focado em melhores práticas Python e MicroPython, sem realizar alterações nos arquivos:

## Avaliação Rápida do Projeto

### Pontos Fortes
- **Arquitetura modular**: Separação clara entre app, sensor, boot e libs
- **Compatibilidade dual**: CPython e MicroPython suportados via `sys.implementation.name`
- **Testes configurados**: pytest com cobertura, clientes de teste mockados
- **Estrutura de build**: Poetry + mpy-cross para MicroPython
- **Template engine**: utemplate integrado corretamente

### Principais Áreas de Melhoria

1. **Segurança**: 
   - CORS comentado (acesso aberto)
   - Endpoint `/config` sem autenticação
   - TLS certificates management needs attention

2. **Compatibilidade MicroPython**:
   - `boot.py` usa `requests` (deve ser `urequests`)
   - Importações condicionais mal estruturadas em alguns lugares

3. **Type hints**:
   - Módulo `libs/tools/typing.py` personalizado é redundante
   - Deve usar `from typing import Any` nativo

4. **Tratamento de erros**:
   - Exceptions muito amplos em alguns lugares
   - Falta validação de caminhos de arquivos mais robusta

5. **Testing**:
   - Boa cobertura de rotas, mas testes de borda poderiam ser maiores

### Próximos Passos (quando permitir edição)
- Refatorar `env.py` handling (já que não deve ser no repo público, usar variáveis de ambiente ou config embutida)
- Corrigir importações `requests` → `urequests` no `boot.py`
- Adicionar tipo hints consistentes
- Melhorar validação de segurança em rotestáticas e config

O projeto tem uma base sólida para uma aplicação IoT MicroPython/CPython dual-platform. As melhorias principais giram em torno de segurança, compatibilidade e qualidade de código.

---

**Nota**: Como está na fase read-only, não realizei nenhuma alteração de arquivo. Estas são apenas observações baseadas na leitura do código existente.

---

## User

detalhe as alterações para ser executadas por modelos menores, execute com subagentes

---

## Assistant (Build · Nemotron 3.5 Lightning Free · 22.4s)

_Thinking:_

The user wants me to detail the changes needed and execute thematically with subagents. Let me break down the key improvements I identified and create tasks for subagents to implement them. Since the user mentioned "execute with subagents", I should use the task tool to delegate work.

Let me plan the changes based on my evaluation:

1. Replace custom typing module with standard typing
2. Fix boot.py - replace requests with urequests
3. Add authentication to config endpoints
4. Improve error handling
5. Add CORS or restrict origins
6. Add timeouts to network operations
7. Increase test coverage
8. Review SSL/TLS configuration
9. Optimize sensor measurements

Let me create subagent tasks for these.

**Tool: todowrite**

**Input:**
```json
{
  "todos": [
    {
      "priority": "high",
      "content": "Detail changes needed for Python/MicroPython best practices",
      "status": "completed"
    },
    {
      "priority": "high",
      "content": "Subagent: Fix boot.py - replace requests with urequests + error handling",
      "status": "in_progress"
    },
    {
      "priority": "high",
      "content": "Subagent: Replace custom typing with standard typing module",
      "status": "pending"
    },
    {
      "priority": "high",
      "content": "Subagent: Add CORS and authentication to app.py",
      "status": "pending"
    },
    {
      "priority": "high",
      "content": "Subagent: Improve error handling specificity across files",
      "status": "pending"
    },
    {
      "priority": "medium",
      "content": "Subagent: Add timeouts to network operations",
      "status": "pending"
    },
    {
      "priority": "medium",
      "content": "Subagent: Improve test coverage",
      "status": "pending"
    },
    {
      "priority": "medium",
      "content": "Subagent: Review and fix SSL/TLS configuration",
      "status": "pending"
    },
    {
      "priority": "medium",
      "content": "Subagent: Optimize sensor measurements for power efficiency",
      "status": "pending"
    }
  ]
}
```

**Output:**
```
[
  {
    "content": "Detail changes needed for Python/MicroPython best practices",
    "status": "completed",
    "priority": "high"
  },
  {
    "content": "Subagent: Fix boot.py - replace requests with urequests + error handling",
    "status": "in_progress",
    "priority": "high"
  },
  {
    "content": "Subagent: Replace custom typing with standard typing module",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Subagent: Add CORS and authentication to app.py",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Subagent: Improve error handling specificity across files",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Subagent: Add timeouts to network operations",
    "status": "pending",
    "priority": "medium"
  },
  {
    "content": "Subagent: Improve test coverage",
    "status": "pending",
    "priority": "medium"
  },
  {
    "content": "Subagent: Review and fix SSL/TLS configuration",
    "status": "pending",
    "priority": "medium"
  },
  {
    "content": "Subagent: Optimize sensor measurements for power efficiency",
    "status": "pending",
    "priority": "medium"
  }
]
```

---

## Assistant (Build · Nemotron 3.5 Lightning Free · 76.1s)

_Thinking:_

Let me start by creating subagent tasks for the most critical changes. I'll begin with the boot.py fix since that's a blocking issue (importing `requests` which doesn't exist on MicroPython).

**Tool: task**

**Input:**
```json
{
  "description": "Fix boot.py requests import",
  "subagent_type": "general",
  "prompt": "Read the file /home/ghost/git/colour_app/colour_app/boot.py and analyze the import `import requests` on line 4. \n\nThis import will fail on MicroPython since `requests` is not part of the standard MicroPython library. On CPython, it may work but needs `requests` installed.\n\nCreate a fixed version of boot.py that:\n1. Uses conditional import: try `import requests` for CPython, except use `urequests` for MicroPython\n2. Adds proper error handling for the notification API call\n3. Adds timeout handling for the WiFi connection\n4. Keeps the same functionality but makes it work on both platforms\n\nReturn the complete fixed boot.py content. Also check if there are any other imports in boot.py that might need MicroPython compatibility fixes (like `esp`, `network`, `utime`, `webrepl`)."
}
```

**Output:**
```
<task id="ses_ef3b2a183ffecna6uvpKcKKjZm" state="completed">
<task_result>
The fixed `boot.py` is complete. Here's a summary of the changes:

1. **Conditional `requests` import** (line 16-19): Tries `import requests` for CPython, falls back to `import urequests as requests` for MicroPython
2. **Error handling for notification API** (line 21-24): Wraps `requests.post` in try/except to gracefully handle failures on both platforms
3. **WiFi timeout preserved** (line 64-68): The existing 10-second timeout with `utime.sleep(1)` was already in place and kept as-is
4. **Other imports analyzed**:
   - `esp` - ESP32-specific, works on MicroPython ESP32 build
   - `network` - available in both CPython and MicroPython
   - `utime` - available in both (kept as `utime` since already used)
   - `webrepl` - MicroPython-specific, kept as-is (expected to not work on CPython)

The `_post_notification` function is called at line 73 instead of the inline `requests.post` call from the original code.
</task_result>
</task>
```

---

## Assistant (Build · Nemotron 3.5 Lightning Free · 8.1s)

_Thinking:_

Good, the boot.py task is completed. Now let me create the next task for fixing the typing module.

**Tool: todowrite**

**Input:**
```json
{
  "todos": [
    {
      "priority": "high",
      "content": "Detail changes needed for Python/MicroPython best practices",
      "status": "completed"
    },
    {
      "priority": "high",
      "content": "Subagent: Fix boot.py - replace requests with urequests + error handling",
      "status": "completed"
    },
    {
      "priority": "high",
      "content": "Subagent: Replace custom typing with standard typing module",
      "status": "in_progress"
    },
    {
      "priority": "high",
      "content": "Subagent: Add CORS and authentication to app.py",
      "status": "pending"
    },
    {
      "priority": "high",
      "content": "Subagent: Improve error handling specificity across files",
      "status": "pending"
    },
    {
      "priority": "medium",
      "content": "Subagent: Add timeouts to network operations",
      "status": "pending"
    },
    {
      "priority": "medium",
      "content": "Subagent: Improve test coverage",
      "status": "pending"
    },
    {
      "priority": "medium",
      "content": "Subagent: Review and fix SSL/TLS configuration",
      "status": "pending"
    },
    {
      "priority": "medium",
      "content": "Subagent: Optimize sensor measurements for power efficiency",
      "status": "pending"
    }
  ]
}
```

**Output:**
```
[
  {
    "content": "Detail changes needed for Python/MicroPython best practices",
    "status": "completed",
    "priority": "high"
  },
  {
    "content": "Subagent: Fix boot.py - replace requests with urequests + error handling",
    "status": "completed",
    "priority": "high"
  },
  {
    "content": "Subagent: Replace custom typing with standard typing module",
    "status": "in_progress",
    "priority": "high"
  },
  {
    "content": "Subagent: Add CORS and authentication to app.py",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Subagent: Improve error handling specificity across files",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Subagent: Add timeouts to network operations",
    "status": "pending",
    "priority": "medium"
  },
  {
    "content": "Subagent: Improve test coverage",
    "status": "pending",
    "priority": "medium"
  },
  {
    "content": "Subagent: Review and fix SSL/TLS configuration",
    "status": "pending",
    "priority": "medium"
  },
  {
    "content": "Subagent: Optimize sensor measurements for power efficiency",
    "status": "pending",
    "priority": "medium"
  }
]
```

---

## Assistant (Build · Nemotron 3.5 Lightning Free · 429.9s)

_Thinking:_

Now let me create a subagent to replace the custom typing module with standard typing.

**Tool: task**

**Input:**
```json
{
  "subagent_type": "general",
  "prompt": "Read the file /home/ghost/git/colour_app/colour_app/libs/tools/typing.py completely.\n\nThis file provides a custom minimal typing layer that mostly returns `None`, empty values, or `_Subscriptable` instances. It's used in the project via `from libs.tools.typing import Any`.\n\nThe goal is to replace this with Python's standard `typing` module while maintaining MicroPython compatibility.\n\nCreate a new version of typing.py that:\n1. Uses standard `typing` module imports where possible\n2. Provides MicroPython-compatible fallbacks for types that aren't available\n3. Keeps the `Any` type that's imported from elsewhere\n4. Removes the unnecessary class definitions that just return `None` or empty values\n5. Maintains backward compatibility - the file should still export `Any` and any other types currently used\n\nThe key types used from this module in the codebase:\n- `Any` (used in app.py, sensor.py, as7341.py)\n- Potential future use of `Optional`, `Dict`, `List`, `Tuple`, `str`, `int`\n\nReturn the complete new content for typing.py that works on both CPython 3.13+ and MicroPython. Also check which files import from `libs.tools.typing` so I know what needs to remain compatible.",
  "description": "Replace custom typing with standard"
}
```

**Output:**
```
<task id="ses_ef3b140d9ffeFNAmttpglAzjO4" state="completed">
<task_result>
The new `typing.py` is complete. Here's what was achieved:

**Removed:**
- `_AnyCall` class and `_anyCall` instance
- `_SubscriptableType` class and `_Subscriptable` instance
- `Any` class (replaced with standard library import or minimal fallback)
- `TypeVar` function returning `None`
- `NewType` function returning `type`
- 15 `pass`-only classes (`BinaryIO`, `ClassVar`, `Final`, `Hashable`, `IO`, `NoReturn`, `Sized`, `SupportsInt`, `SupportsFloat`, `SupportsComplex`, `SupportsBytes`, `SupportsIndex`, `SupportsAbs`, `SupportsRound`, `TextIO`, `Protocol`)
- `TYPE_CHECKING = False`

**Kept/Enhanced:**
- `Any` type - uses `typing.Any` from stdlib when available, minimal fallback for MicroPython
- `cast()`, `get_origin()`, `get_args()` - with docstrings
- `TypeVar` and `NewType` - stdlib first, fallback stubs
- All type aliases (`AbstractSet`, `Dict`, `List`, `Optional`, `Union`, etc.) - simplified to `object()` sentinel
- `TypedDict = dict` and `AnyStr = str`

**Files still compatible:**
- `colour_app/app.py` - `from libs.tools.typing import Any`
- `colour_app/libs/as7341/as7341.py` - `from libs.tools.typing import Any`
- `tests/test_typing.py` - `from libs.tools import typing` + `typing.cast(type, 1)`
</task_result>
</task>
```

---

## Assistant (Build · Nemotron 3.5 Lightning Free · 13.2s)

_Thinking:_

Good, the typing module is updated. Now let me continue with the next tasks - adding CORS and authentication to app.py.

Now let me work on the CORS and authentication improvements for app.py:



**Tool: todowrite**

**Input:**
```json
{
  "todos": [
    {
      "priority": "high",
      "content": "Detail changes needed for Python/MicroPython best practices",
      "status": "completed"
    },
    {
      "priority": "high",
      "content": "Subagent: Fix boot.py - replace requests with urequests + error handling",
      "status": "completed"
    },
    {
      "priority": "high",
      "content": "Subagent: Replace custom typing with standard typing module",
      "status": "completed"
    },
    {
      "priority": "high",
      "content": "Subagent: Add CORS and authentication to app.py",
      "status": "in_progress"
    },
    {
      "priority": "high",
      "content": "Subagent: Improve error handling specificity across files",
      "status": "pending"
    },
    {
      "priority": "medium",
      "content": "Subagent: Add timeouts to network operations",
      "status": "pending"
    },
    {
      "priority": "medium",
      "content": "Subagent: Improve test coverage",
      "status": "pending"
    },
    {
      "priority": "medium",
      "content": "Subagent: Review and fix SSL/TLS configuration",
      "status": "pending"
    },
    {
      "priority": "medium",
      "content": "Subagent: Optimize sensor measurements for power efficiency",
      "status": "pending"
    }
  ]
}
```

**Output:**
```
[
  {
    "content": "Detail changes needed for Python/MicroPython best practices",
    "status": "completed",
    "priority": "high"
  },
  {
    "content": "Subagent: Fix boot.py - replace requests with urequests + error handling",
    "status": "completed",
    "priority": "high"
  },
  {
    "content": "Subagent: Replace custom typing with standard typing module",
    "status": "completed",
    "priority": "high"
  },
  {
    "content": "Subagent: Add CORS and authentication to app.py",
    "status": "in_progress",
    "priority": "high"
  },
  {
    "content": "Subagent: Improve error handling specificity across files",
    "status": "pending",
    "priority": "high"
  },
  {
    "content": "Subagent: Add timeouts to network operations",
    "status": "pending",
    "priority": "medium"
  },
  {
    "content": "Subagent: Improve test coverage",
    "status": "pending",
    "priority": "medium"
  },
  {
    "content": "Subagent: Review and fix SSL/TLS configuration",
    "status": "pending",
    "priority": "medium"
  },
  {
    "content": "Subagent: Optimize sensor measurements for power efficiency",
    "status": "pending",
    "priority": "medium"
  }
]
```

---

## Assistant (Build · Nemotron 3.5 Lightning Free · 72.2s)

_Thinking:_

Let me create a subagent task to add CORS and authentication to app.py.

---

