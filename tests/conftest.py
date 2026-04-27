import pytest
from colour_app.libs.microdot.test_client import TestClient

from colour_app import app


@pytest.fixture
def client():
    """Cliente de teste do Microdot"""
    client = TestClient(app.app)
    return client
