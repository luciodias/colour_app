# from microdot.utemplate import Template
import asyncio
import json
import os
import ssl
import sys

from libs.microdot import Microdot, Response, send_file
from libs.microdot.utemplate import Template
from libs.tools.typing import Any

color_sensor = None
try:
    from sensor import Sensor

    color_sensor = Sensor()
except ImportError as e:
    print(e)
except NameError as e:
    print(e)

print(color_sensor)

app = Microdot()
Response.default_content_type = "text/html"

cwd = "" if "colour_app" not in os.listdir() else "colour_app/"
Template.initialize(f"{cwd}templates")

CONFIG_FILE = "config.json"

# =========================
# CONFIGURAÇÃO PADRÃO
# =========================
default_config: dict[str, Any] = {
    "update_interval": 3,
    "temp_threshold": 0,
    "humidity_threshold": 0,
}


# CARREGAR CONFIG
def load_config() -> dict[str, Any]:
    try:
        with open(CONFIG_FILE, "r") as f:
            return json.load(f)
    except (OSError, ValueError):
        save_config(default_config)
        return default_config


def save_config(config: dict[str, Any]) -> None:
    with open(CONFIG_FILE, "w") as f:
        json.dump(config, f)


config: dict[str, Any] = load_config()


# DADOS SIMULADOS
sensor_data: dict[str, Any] = {"temperature": 10, "humidity": 20, "alerts": 0}


# Inicia thread
# _thread.start_new_thread(target=simulate_data, daemon=True).start()

# ROTAS


@app.route("/")
async def index(request) -> str:
    # return Template('index.html').generate(name='Name 2')
    return send_file(f"{cwd}templates/pwa.html")


@app.route("/favicon.ico")
async def favicon(request) -> str:
    print(request.path)
    return send_file(f"{cwd}static/favicon.ico")


# Static route
@app.route("/static/<path:path>")
def static(request, path):
    if ".." in path:
        # directory traversal is not allowed
        return "Not found", 404
    return send_file(f"{cwd}static/" + path, max_age=86400)


@app.route("/measure")
async def measure(request) -> str:
    async def get_measure():
        yield color_sensor.get_measurements()

    if color_sensor:
        return (
            color_sensor.get_measurements(),
            200,
            {"Content-Type": "application/json"},
        )
    return 503


@app.route("/dashboard")
async def dashboard(request) -> str:
    return send_file(f"{cwd}templates/dashboard.html")


@app.route("/config", methods=["GET", "POST"])
async def config_page(request) -> dict[str, Any]:
    global config

    if request.method == "POST":
        try:
            data = request.json
            config["update_interval"] = int(data.get("update_interval", 3))
            config["temp_threshold"] = int(data.get("temp_threshold", 30))
            config["humidity_threshold"] = int(data.get("humidity_threshold", 70))

            save_config(config)

            return {"status": "ok"}

        except Exception as e:
            return {"error": str(e)}, 400

    # GET
    return send_file(f"{cwd}templates/config.html")


@app.route("/data")
async def data(request) -> dict[str, Any]:
    """Endpoint consumido pelo frontend (polling)"""
    return sensor_data


@app.route("/config-data")
async def get_config(request) -> dict[str, Any]:
    return config


@app.route("/reset-config", methods=["POST"])
async def reset_config(request) -> dict[str, Any]:
    global config  # pragma: no cover
    config = default_config
    save_config(config)
    return {"status": "resetado"}


# =========================
# CORS (básico)
# =========================
# @app.after_request
# async def after_request(request, response) -> Any:
#     response.headers["Access-Control-Allow-Origin"] = "*"
#     return response
async def main():
    server = asyncio.create_task(app.start_server(debug=True, port=80))
    await server
    ext = 'der' if sys.implementation.name == 'micropython' else 'pem'
    sslctx = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    sslctx.load_cert_chain(f"{cwd}certs/cert.{ext}", f"{cwd}certs/key.{ext}")
    sserver = asyncio.create_task(app.start_server(debug=True, port=443, ssl=sslctx))
    await sserver

# =========================
# RUN
# =========================
if __name__ == "__main__":
    asyncio.run(main())