"""
AI Text Summarization Tool
Receives text input and returns an AI-generated summary using
the facebook/bart-large-cnn model via HuggingFace Transformers.
"""

from flask import Flask, render_template, request, jsonify
from transformers import pipeline

app = Flask(__name__)

# Load summarization pipeline once at startup (model downloaded on first run)
_summarizer = None


def get_summarizer():
    """Lazily load the summarization pipeline."""
    global _summarizer
    if _summarizer is None:
        _summarizer = pipeline(
            "summarization",
            model="facebook/bart-large-cnn",
        )
    return _summarizer


@app.route("/")
def index():
    """Render the main page."""
    return render_template("index.html")


@app.route("/summarize", methods=["POST"])
def summarize():
    """
    Accepts a JSON payload with a 'text' field and returns
    an AI-generated summary.
    """
    data = request.get_json(silent=True)
    if not data or "text" not in data:
        return jsonify({"error": "Please provide a 'text' field in the request body."}), 400

    text = data["text"].strip()
    if not text:
        return jsonify({"error": "Text cannot be empty."}), 400

    if len(text.split()) < 30:
        return jsonify({"error": "Text is too short to summarize. Please provide at least 30 words."}), 400

    # Cap input length to avoid memory issues with very large texts
    max_input_words = 1000
    words = text.split()
    if len(words) > max_input_words:
        text = " ".join(words[:max_input_words])

    try:
        summarizer = get_summarizer()
        result = summarizer(
            text,
            max_length=150,
            min_length=40,
            do_sample=False,
        )
        summary = result[0]["summary_text"]
        return jsonify({"summary": summary})
    except Exception as exc:  # pylint: disable=broad-except
        return jsonify({"error": f"Summarization failed: {str(exc)}"}), 500


if __name__ == "__main__":
    import os
    debug = os.environ.get("FLASK_DEBUG", "false").lower() == "true"
    app.run(debug=debug)
