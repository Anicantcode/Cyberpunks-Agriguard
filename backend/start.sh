#!/bin/sh
set -e

echo "📦 Installing dependencies..."
pip install -r requirements.txt

echo "🚀 Starting Uvicorn..."
uvicorn backend.main:app --host 0.0.0.0 --port ${PORT:-8000}

