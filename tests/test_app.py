import asyncio
import json
import os
import ssl
from unittest.mock import AsyncMock, MagicMock, patch

from colour_app import app
from colour_app.app import main


async def test_index(client):
    res = await client.get("/")
    assert res.status_code == 200
    assert b"Colour App" in res.body
    assert b"/static/js/main.js" in res.body


async def test_favicon(client):
    res = await client.get("/favicon.ico")
    assert res.status_code == 200


async def test_save_config(client, monkeypatch):
    res = await client.get("/")
    monkeypatch.setattr(os.path, "exists", lambda path: False)  # Simulate file not exists
    assert res.status_code == 200


async def test_static_ok(client):
    res = await client.get("/static/css/styles.css")
    assert res.status_code == 200


async def test_static_nok(client):
    res = await client.get("/static/..")
    assert res.status_code == 404


async def test_static_missing(client):
    res = await client.get("/static/missing")
    assert res.status_code == 404


async def test_measure(client):
    res = await client.get("/measure")
    assert res.status_code == 503


async def test_dashboard(client):
    res = await client.get("/dashboard")
    assert res.status_code == 200
    assert b"Dashboard IoT" in res.body


async def test_config_data_get(client):
    res = await client.get("/config-data")
    assert res.status_code == 200

    data = res.json
    assert "update_interval" in data


async def test_config_get(client):
    res = await client.get("/config")
    assert res.status_code == 200
    assert "Configurações".encode() in res.body


async def test_config_post(client):
    payload = {"update_interval": 2, "temp_threshold": 35, "humidity_threshold": 80}

    res = await client.post("/config", body=payload)
    assert res.status_code == 200
    assert res.json["status"] == "ok"


async def test_config_post_exception(client):
    res = await client.post("/config")
    assert res.status_code == 400


async def test_reset_config(client):
    res = await client.post("/reset-config")
    assert res.status_code == 200
    assert res.json["status"] == "resetado"


async def test_measure_with_mock_sensor(client):
    mock_sensor = AsyncMock()
    mock_sensor.get_measurements.return_value = {
        "f1": 100,
        "f2": 200,
        "f3": 300,
        "f4": 400,
        "f5": 500,
        "f6": 600,
        "f7": 700,
        "f8": 800,
        "clr": 900,
        "nir": 1000,
        "fd": 1,
    }
    with patch.object(app, "color_sensor", mock_sensor):
        res = await client.get("/measure")
    assert res.status_code == 200
    assert res.json["f1"] == 100
    assert res.json["fd"] == 1


async def test_main_server_start_micropython():
    sslctx_mock = MagicMock()
    sslctx_mock.load_cert_chain = MagicMock()
    done = asyncio.Event()
    done.set()

    with (
        patch("colour_app.app.sys") as mock_sys,
        patch("colour_app.app.ssl.SSLContext", return_value=sslctx_mock) as mock_ssl,
        patch("colour_app.app.asyncio.create_task", return_value=done.wait()) as mock_create_task,
    ):
        mock_sys.implementation.name = "micropython"
        await main()

    mock_ssl.assert_called_once_with(ssl.PROTOCOL_TLS_SERVER)
    sslctx_mock.load_cert_chain.assert_called_once()
    mock_create_task.assert_called_once()


async def test_main_server_start_cpython():
    sslctx_mock = MagicMock()
    sslctx_mock.load_cert_chain = MagicMock()
    done = asyncio.Event()
    done.set()

    with (
        patch("colour_app.app.sys") as mock_sys,
        patch("colour_app.app.ssl.SSLContext", return_value=sslctx_mock) as mock_ssl,
        patch("colour_app.app.asyncio.create_task", return_value=done.wait()) as mock_create_task,
    ):
        mock_sys.implementation.name = "cpython"
        await main()

    mock_ssl.assert_called_once_with(ssl.PROTOCOL_TLS_SERVER)
    sslctx_mock.load_cert_chain.assert_called_once()
    mock_create_task.assert_called_once()


async def test_websocket_upgrade_required(client):
    res = await client.get("/ws")
    assert res.status_code == 400


async def _ws_exchange(client, messages, timeout=2):
    replies = []

    async def gen():
        for message in messages:
            reply = yield message
            replies.append(reply)

    await asyncio.wait_for(client.websocket("/ws", gen), timeout)
    return replies


async def test_ws_echo(client):
    replies = await _ws_exchange(client, ["hello"])
    assert replies == ["hello"]


async def test_ws_invalid_json_is_echoed(client):
    replies = await _ws_exchange(client, ["not-json"])
    assert replies == ["not-json"]


async def test_ws_measure_without_sensor(client):
    with patch.object(app, "color_sensor", None):
        replies = await _ws_exchange(client, [json.dumps({"cmd": "measure"})])

    assert json.loads(replies[0]) == {"type": "error", "error": "sensor unavailable"}


async def test_ws_measure_with_mock_sensor(client):
    mock_sensor = AsyncMock()
    mock_sensor.get_measurements.return_value = {"f1": 100, "fd": 1}

    with patch.object(app, "color_sensor", mock_sensor):
        replies = await _ws_exchange(client, [json.dumps({"cmd": "measure"})])

    payload = json.loads(replies[0])
    assert payload["type"] == "measurement"
    assert payload["data"] == {"f1": 100, "fd": 1}
    mock_sensor.get_measurements.assert_awaited_once()


async def test_ws_measure_sensor_error(client):
    mock_sensor = AsyncMock()
    mock_sensor.get_measurements.return_value = {"error": "Sensor não conectado"}

    with patch.object(app, "color_sensor", mock_sensor):
        replies = await _ws_exchange(client, [json.dumps({"cmd": "measure"})])

    assert json.loads(replies[0]) == {"type": "error", "error": "Sensor não conectado"}


async def test_ws_measure_sensor_exception(client):
    mock_sensor = AsyncMock()
    mock_sensor.get_measurements.side_effect = RuntimeError("i2c failure")

    with patch.object(app, "color_sensor", mock_sensor):
        replies = await _ws_exchange(client, [json.dumps({"cmd": "measure"})])

    assert json.loads(replies[0]) == {"type": "error", "error": "i2c failure"}


async def test_pwa_sw_root(client):
    res = await client.get("/pwa_sw.js")
    assert res.status_code == 200
    assert res.headers["Content-Type"] == "application/javascript"
    assert res.headers["Cache-Control"] == "no-cache"
    assert res.headers["Service-Worker-Allowed"] == "/"
    assert b"colour-app-v2" in res.body


async def test_pwa_sw_still_available_under_static(client):
    res = await client.get("/static/js/pwa_sw.js")
    assert res.status_code == 200


async def test_manifest(client):
    res = await client.get("/static/manifest.json")
    assert res.status_code == 200
    assert res.json["start_url"] == "/dashboard"
    assert res.json["scope"] == "/"
    assert len(res.json["icons"]) == 3


async def test_cie_diagram_asset(client):
    res = await client.get("/static/img/cie1931xy.svg")
    assert res.status_code == 200
    assert res.headers["Content-Type"].startswith("image/svg+xml")
