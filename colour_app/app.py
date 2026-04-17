# from microdot.utemplate import Template
import json
import os
import random
import threading
import time
from typing import Any, Dict, Optional

from microdot import Microdot, redirect, send_file

app = Microdot()

CONFIG_FILE = "config.json"

# =========================
# CONFIGURAÇÃO PADRÃO
# =========================
default_config: Dict[str, Any] = {"update_interval": 3, "temp_threshold": 30, "humidity_threshold": 70}


# =========================
# CARREGAR CONFIG
# =========================
def load_config() -> Dict[str, Any]:
    if not os.path.exists(CONFIG_FILE):
        save_config(default_config)
    with open(CONFIG_FILE, "r") as f:
        return json.load(f)


def save_config(config: Dict[str, Any]) -> None:
    with open(CONFIG_FILE, "w") as f:
        json.dump(config, f)


config: Dict[str, Any] = load_config()

# =========================
# DADOS SIMULADOS
# =========================
sensor_data: Dict[str, Any] = {"temperature": 25, "humidity": 50, "alerts": 0}


def simulate_data() -> None:
    """Thread simulando chegada de dados IoT"""
    global sensor_data
    while True:
        sensor_data["temperature"] = round(random.uniform(20, 40), 2)
        sensor_data["humidity"] = round(random.uniform(30, 90), 2)

        # Verifica alertas
        sensor_data["alerts"] = 0
        if sensor_data["temperature"] > config["temp_threshold"]:
            sensor_data["alerts"] += 1
        if sensor_data["humidity"] > config["humidity_threshold"]:
            sensor_data["alerts"] += 1

        time.sleep(config["update_interval"])


# Inicia thread
threading.Thread(target=simulate_data, daemon=True).start()

# =========================
# ROTAS
# =========================


@app.route("/")
def index(request) -> str:
    return send_file("colour_app/templates/index.html")


@app.route("/dashboard")
def dashboard(request) -> str:
    return send_file("colour_app/templates/dashboard.html")


@app.route("/config", methods=["GET", "POST"])
def config_page(request) -> Dict[str, Any]:
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
    return send_file("colour_app/templates/config.html")


@app.route("/data")
def data(request) -> Dict[str, Any]:
    """Endpoint consumido pelo frontend (polling)"""
    return sensor_data


@app.route("/config-data")
def get_config(request) -> Dict[str, Any]:
    return config


@app.route("/reset-config", methods=["POST"])
def reset_config(request) -> Dict[str, Any]:
    global config
    config = default_config
    save_config(config)
    return {"status": "resetado"}


# =========================
# CORS (básico)
# =========================
@app.after_request
def after_request(request, response) -> Any:
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response


# =========================
# RUN
# =========================
if __name__ == "__main__":
    app.run(debug=True, port=5000)
