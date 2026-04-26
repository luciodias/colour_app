import os

async def test_index(client):
    res = await client.get("/")
    assert res.status_code == 200
    assert b"Modern PWA Template" in res.body

async def test_favicon(client):
    res = await client.get("/favicon.ico")
    assert res.status_code == 200
    
async def test_save_config(client,monkeypatch):
    res = await client.get("/")
    monkeypatch.setattr(os.path, 'exists', lambda path: False)  # Simulate file not exists
    res = await client.get("/data")
    assert res.status_code == 200

async def test_static_ok(client):
    res = await client.get("/static/styles.css")
    assert res.status_code == 200


async def test_static_nok(client):
    res = await client.get("/static/..")
    assert res.status_code == 404


async def test_dashboard(client):
    res = await client.get("/dashboard")
    assert res.status_code == 200
    assert b"Dashboard IoT" in res.body


async def test_data_endpoint(client):
    res = await client.get("/data")
    assert res.status_code == 200

    data = res.json
    assert "temperature" in data
    assert "humidity" in data
    assert "alerts" in data


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
