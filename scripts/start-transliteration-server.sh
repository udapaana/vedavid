#!/bin/bash

# VedaVid Transliteration Server Startup Script
# Starts the FastAPI server with Vidyut-lipi transliteration service

set -e

echo "🕉️  VedaVid Transliteration Server"
echo "================================"

# Navigate to project root
cd "$(dirname "$0")/.."

# Check if virtual environment exists
DATA_DIR="./public/data/taittiriya"
if [ ! -d "$DATA_DIR/transliteration-env" ]; then
    echo "❌ Virtual environment not found!"
    echo "Please run: pnpm run generate-transliterations"
    exit 1
fi

# Activate virtual environment
echo "🔄 Activating virtual environment..."
source "$DATA_DIR/transliteration-env/bin/activate"

# Check if required packages are installed
echo "🔍 Checking dependencies..."
python3 -c "import vidyut, fastapi, uvicorn; print('✅ All dependencies available')" || {
    echo "❌ Missing dependencies!"
    echo "Installing required packages..."
    pip install vidyut fastapi uvicorn
}

# Start the server
echo "🚀 Starting FastAPI transliteration server..."
echo "Server will be available at: http://localhost:5001"
echo "API documentation: http://localhost:5001/docs"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

cd server
python3 transliteration-server.py