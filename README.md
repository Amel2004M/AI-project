# AI Text Summarizer

A web-based AI tool that receives any text and returns a concise summary, powered by [facebook/bart-large-cnn](https://huggingface.co/facebook/bart-large-cnn) via HuggingFace Transformers.

## Features

- 🤖 AI-powered abstractive summarization (BART model)
- 🌐 Clean, responsive web interface
- ⚡ REST API endpoint (`POST /summarize`)
- 📋 One-click copy of the generated summary

## Requirements

- Python 3.8+
- ~2 GB disk space for the BART model (downloaded automatically on first run)

## Installation

```bash
pip install -r requirements.txt
```

## Running the App

```bash
python app.py
```

Then open your browser at **http://localhost:5000**.

## API Usage

```bash
curl -X POST http://localhost:5000/summarize \
     -H "Content-Type: application/json" \
     -d '{"text": "Your long text goes here..."}'
```

**Response:**
```json
{
  "summary": "A concise AI-generated summary of your text."
}
```

## Project Structure

```
AI-project/
├── app.py               # Flask application & summarization logic
├── requirements.txt     # Python dependencies
├── templates/
│   └── index.html       # Web UI
└── static/
    └── style.css        # Styles
```