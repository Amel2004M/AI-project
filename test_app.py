"""Tests for the AI Text Summarizer Flask application."""

import json
from unittest.mock import MagicMock, patch

import pytest

import app as summarizer_app


@pytest.fixture()
def client():
    """Create a Flask test client with a mocked summarizer."""
    summarizer_app.app.config["TESTING"] = True
    mock_pipeline = MagicMock(
        return_value=[{"summary_text": "Mocked AI summary of the input text."}]
    )
    with patch.object(summarizer_app, "_summarizer", mock_pipeline):
        yield summarizer_app.app.test_client()


def _post(client, payload):
    return client.post(
        "/summarize",
        data=json.dumps(payload),
        content_type="application/json",
    )


# ── Index page ──────────────────────────────────────────────────────────────

def test_index_returns_200(client):
    resp = client.get("/")
    assert resp.status_code == 200
    assert b"AI Text Summarizer" in resp.data


# ── Valid summarization ──────────────────────────────────────────────────────

def test_summarize_returns_summary(client):
    text = " ".join(["word"] * 50)
    resp = _post(client, {"text": text})
    assert resp.status_code == 200
    data = json.loads(resp.data)
    assert "summary" in data
    assert len(data["summary"]) > 0


# ── Input validation ─────────────────────────────────────────────────────────

def test_missing_text_field_returns_400(client):
    resp = _post(client, {})
    assert resp.status_code == 400
    assert "error" in json.loads(resp.data)


def test_empty_text_returns_400(client):
    resp = _post(client, {"text": "   "})
    assert resp.status_code == 400
    assert "error" in json.loads(resp.data)


def test_too_short_text_returns_400(client):
    resp = _post(client, {"text": "Too short"})
    assert resp.status_code == 400
    data = json.loads(resp.data)
    assert "error" in data
    assert "30 words" in data["error"]


def test_no_json_body_returns_400(client):
    resp = client.post("/summarize", data="not json", content_type="text/plain")
    assert resp.status_code == 400


# ── Long input truncation ────────────────────────────────────────────────────

def test_long_text_is_accepted(client):
    """Texts exceeding 1000 words should be silently truncated and still succeed."""
    text = " ".join(["word"] * 1500)
    resp = _post(client, {"text": text})
    assert resp.status_code == 200
    assert "summary" in json.loads(resp.data)
