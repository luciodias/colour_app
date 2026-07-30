import sys
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).parent.parent / "colour_app"))

from colour_app.libs.microdot.test_client import TestClient
from colour_app import app


@pytest.fixture
def client():
    """Cliente de teste do Microdot"""
    client = TestClient(app.app)
    return client
