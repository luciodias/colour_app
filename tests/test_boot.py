import sys
from unittest.mock import MagicMock, patch

import pytest

esp = MagicMock()
network = MagicMock()
requests_mod = MagicMock()
utime = MagicMock()
webrepl = MagicMock()

network.AP_IF = 1
network.STA_IF = 2
network.AUTH_WPA_WPA2_PSK = 3

MODULES = {
    "esp": esp,
    "network": network,
    "requests": requests_mod,
    "utime": utime,
    "webrepl": webrepl,
}

with patch.dict(sys.modules, MODULES):
    import importlib
    from colour_app import env
    from colour_app import boot
    importlib.reload(boot)
    from colour_app.boot import setup_interfaces

assert esp.osdebug.call_count >= 1
network.hostname.assert_any_call(env.HOST)
assert webrepl.start.call_count >= 1


@pytest.fixture(autouse=True)
def reset_mocks():
    esp.reset_mock()
    network.reset_mock()
    requests_mod.reset_mock()
    utime.reset_mock()
    webrepl.reset_mock()
    network.hostname.reset_mock()
    webrepl.start.reset_mock()
    yield


def _make_scan_results(ssids):
    results = []
    for ssid in ssids:
        name = list(ssid.keys())[0]
        rssi = ssid[name]
        results.append((name.encode(), b"", 1, rssi, 0, 0))
    return results


def _setup_mocks(scan_results, ap_if=None, sta_if=None):
    if ap_if is None:
        ap_if = MagicMock()
    if sta_if is None:
        sta_if = MagicMock()
    sta_if.scan.return_value = scan_results
    network.WLAN.side_effect = [ap_if, sta_if]
    return ap_if, sta_if


def test_no_known_networks():
    ap_if, sta_if = _setup_mocks([])
    setup_interfaces()

    ap_if.active.assert_called_once_with(True)
    ap_if.config.assert_called_once()
    sta_if.active.assert_called_once_with(True)
    sta_if.scan.assert_called_once()
    sta_if.connect.assert_not_called()


def test_connects_to_best_network():
    results = _make_scan_results([
        {"VIVOFIBRA-WIFI6-B151": -50},
        {"OtherNet": -60},
    ])
    ap_if, sta_if = _setup_mocks(results)
    sta_if.isconnected.return_value = True

    setup_interfaces()

    sta_if.connect.assert_called_once_with(
        "VIVOFIBRA-WIFI6-B151",
        env.KNOWN_NETWORKS["VIVOFIBRA-WIFI6-B151"],
    )
    requests_mod.post.assert_called_once()


def test_connection_timeout():
    results = _make_scan_results([
        {"VIVOFIBRA-WIFI6-B151": -50},
    ])
    ap_if, sta_if = _setup_mocks(results)
    sta_if.isconnected.return_value = False

    setup_interfaces()

    sta_if.connect.assert_called_once()
    assert sta_if.isconnected.call_count > 1
    requests_mod.post.assert_not_called()


def test_chooses_strongest_signal():
    results = _make_scan_results([
        {"VIVOFIBRA-WIFI6-B151": -80},
        {"FATECRL": -40},
        {"Seletric02": -70},
    ])
    ap_if, sta_if = _setup_mocks(results)
    sta_if.isconnected.return_value = True

    setup_interfaces()

    sta_if.connect.assert_called_once_with("FATECRL", "")
    requests_mod.post.assert_called_once()
