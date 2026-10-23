import sys
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).parent.parent / "colour_app"))
sys.path.insert(0, str(Path(__file__).parent.parent / "colour_app" / "libs"))

from colour_app import app
from colour_app.libs.microdot.test_client import TestClient


@pytest.fixture
def client():
    """Cliente de teste do Microdot"""
    client = TestClient(app.app)
    return client
