import os

from colour_app.app import (
    default_config, load_config, save_config,
)
CONFIG_FILE = "config.json"

# def test_simulate_data():
#     aux_data = sensor_data
#     simulate_data()
#     assert aux_data != sensor_data.__repr__

def test_save_and_load_config():
    test_config = {
        "update_interval": 10,
        "temp_threshold": 99,
        "humidity_threshold": 10,
    }
    save_config(test_config)
    loaded = load_config()
    assert loaded == test_config


def test_default_config_creation():
    # Remove config se existir
    if os.path.exists(CONFIG_FILE):
        os.remove(CONFIG_FILE)
    config = load_config()
    assert config == default_config
