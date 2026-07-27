import sys
from unittest.mock import MagicMock, patch

import pytest

machine = MagicMock()
machine.I2C = MagicMock(return_value=MagicMock())
machine.Pin = MagicMock(return_value=MagicMock())

with patch.dict(sys.modules, {"machine": machine}):
    import importlib
    from colour_app import sensor
    importlib.reload(sensor)

    from colour_app.sensor import Sensor


@pytest.fixture(autouse=True)
def mock_as7341():
    patches = [
        patch.object(sensor.AS7341, "reset", return_value=True),
        patch.object(sensor.AS7341, "set_measure_mode"),
        patch.object(sensor.AS7341, "set_atime"),
        patch.object(sensor.AS7341, "set_astep"),
        patch.object(sensor.AS7341, "set_again"),
        patch.object(sensor.AS7341, "isconnected", return_value=True),
        patch.object(sensor.AS7341, "get_spectral_data", return_value=(1, 2, 3, 4, 5, 6)),
        patch.object(sensor.AS7341, "start_measure"),
        patch.object(sensor.AS7341, "measurement_completed", return_value=True),
        patch.object(sensor.AS7341, "_modify_reg"),
        patch.object(sensor.AS7341, "_write_byte"),
        patch.object(sensor.AS7341, "set_spectral_measurement"),
        patch.object(sensor.AS7341, "set_smux"),
        patch.object(sensor.AS7341, "channel_select"),
    ]
    for p in patches:
        p.start()
    yield
    for p in patches:
        p.stop()


def _make_sensor():
    machine.I2C.reset_mock()
    return Sensor()


def test_sensor_init():
    sensor_inst = _make_sensor()
    assert sensor_inst is not None
    assert sensor_inst._connected is True


def test_sensor_isconnected():
    sensor_inst = _make_sensor()
    assert sensor_inst.isconnected() is True


def test_const_fallback():
    assert callable(sensor.const)
    assert sensor.const(42) == 42


@pytest.mark.asyncio
async def test_get_measurements():
    sensor_inst = _make_sensor()
    result = await sensor_inst.get_measurements()

    assert isinstance(result, dict)
    assert result["f1"] == 1
    assert result["f2"] == 2
    assert result["f3"] == 3
    assert result["f4"] == 4
    assert result["f5"] == 1
    assert result["f6"] == 2
    assert result["f7"] == 3
    assert result["f8"] == 4
    assert result["clr"] == 5
    assert result["nir"] == 6
    assert result["fd"] == 6


@pytest.mark.asyncio
async def test_get_measurements_not_connected():
    with patch.object(sensor.AS7341, "isconnected", return_value=False):
        sensor_inst = _make_sensor()
        result = await sensor_inst.get_measurements()
    assert result == {"error": "Sensor não conectado"}


@pytest.mark.asyncio
async def test_start_measure_smux_string():
    sensor_inst = _make_sensor()
    await sensor_inst.start_measure("F1F4CN")
    sensor.AS7341.channel_select.assert_called_once_with("F1F4CN")
