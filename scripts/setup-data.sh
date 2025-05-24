#!/bin/bash

# VedaVid Data Setup Script
# This script helps set up the data directory for development

set -e

echo "🕉️  VedaVid Data Setup"
echo "===================="

# Default data path (can be overridden)
DATA_PATH="${1:-../data}"
PUBLIC_DIR="./public"
DATA_LINK="$PUBLIC_DIR/data"

# Check if data directory exists
if [ ! -d "$DATA_PATH" ]; then
    echo "❌ Data directory not found at: $DATA_PATH"
    echo ""
    echo "Options:"
    echo "1. Clone the data repository:"
    echo "   git clone <data-repo-url> ../data"
    echo ""
    echo "2. Specify a different path:"
    echo "   ./scripts/setup-data.sh /path/to/your/data"
    echo ""
    exit 1
fi

# Create public directory if it doesn't exist
mkdir -p "$PUBLIC_DIR"

# Remove existing symlink if it exists
if [ -L "$DATA_LINK" ]; then
    echo "🔄 Removing existing data symlink..."
    rm "$DATA_LINK"
fi

# Create symlink
echo "🔗 Creating symlink to data directory..."
ln -sf "$(realpath "$DATA_PATH")" "$DATA_LINK"

# Verify the setup
if [ -f "$DATA_LINK/taittiriya/web_complete/taittiriya_complete_corpus.json" ]; then
    echo "✅ Data setup successful!"
    echo "📊 Found Taittiriya corpus data"
    
    # Show some statistics
    if command -v jq &> /dev/null; then
        echo ""
        echo "📈 Corpus Statistics:"
        jq -r '.metadata.totals | "Total texts: \(.total_texts) | Files processed: \(.total_files_processed)"' "$DATA_LINK/taittiriya/web_complete/taittiriya_complete_corpus.json"
    fi
else
    echo "⚠️  Warning: Expected corpus file not found"
    echo "   Expected: $DATA_LINK/taittiriya/web_complete/taittiriya_complete_corpus.json"
    echo "   Please verify your data directory structure"
fi

echo ""
echo "📝 Optional: Generate transliterations for all scripts:"
echo "   pnpm run generate-transliterations"
echo ""
echo "🚀 You can now run: pnpm run dev"