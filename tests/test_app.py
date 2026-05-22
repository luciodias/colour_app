import asyncio
import os
import ssl
import sys
from unittest.mock import AsyncMock, MagicMock, patch

from colour_app import app
from colour_app.app import main


async def test_index(client):
    res = await client.get("/")
    assert res.status_code == 200
    assert b"Modern PWA Template" in res.body


async def test_favicon(client):
    res = await client.get("/favicon.ico")
    assert res.status_code == 200


async def test_save_config(client, monkeypatch):
    res = await client.get("/")
    monkeypatch.setattr(
        os.path, "exists", lambda path: False
    )  # Simulate file not exists
    assert res.status_code == 200


async def test_static_ok(client):
    res = await client.get("/static/styles.css")
    assert res.status_code == 200


async def test_static_nok(client):
    res = await client.get("/static/..")
    assert res.status_code == 404

async def test_static_missing(client):
    res = await client.get("/static/missing")
    assert res.status_code == 500

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
        "f1": 100, "f2": 200, "f3": 300, "f4": 400,
        "f5": 500, "f6": 600, "f7": 700, "f8": 800,
        "clr": 900, "nir": 1000, "fd": 1,
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
