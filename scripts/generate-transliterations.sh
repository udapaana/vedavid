#!/bin/bash

# VedaVid Transliteration Generation Script
# Generates static transliterations using Vidyut in a virtual environment

set -e

echo "🕉️  VedaVid Transliteration Generator"
echo "=================================="

# Navigate to data directory
DATA_DIR="/Users/skmnktl/Projects/udapaana/data/taittiriya"
cd "$DATA_DIR"

# Check if virtual environment exists
if [ ! -d "transliteration-env" ]; then
    echo "📦 Creating Python virtual environment..."
    python3 -m venv transliteration-env
    
    echo "📥 Installing Vidyut..."
    source transliteration-env/bin/activate
    pip install --upgrade pip
    pip install vidyut
    deactivate
fi

# Activate virtual environment
echo "🔄 Activating virtual environment..."
source transliteration-env/bin/activate

# Check if Vidyut is working
echo "🔍 Testing Vidyut installation..."
python3 -c "from vidyut.lipi import transliterate, Scheme; print('✅ Vidyut is working!')"

# Run transliteration generation
echo "⚡ Generating transliterations..."
python3 add_static_transliterations.py

# Deactivate virtual environment
deactivate

echo ""
echo "✅ Transliteration generation complete!"
echo "📊 Generated static transliterations for all supported scripts using Vidyut"
echo "🔗 Web app will now use pre-generated transliterations (offline-capable)"
echo ""
echo "📝 Scripts supported:"
echo "   • Devanagari (देवनागरी)"
echo "   • IAST (International Alphabet)"
echo "   • Harvard-Kyoto, Baraha, ITRANS"
echo "   • Regional: Tamil, Telugu, Kannada, Malayalam, Gujarati"
echo "   • Technical: SLP1, Velthuis, WX"
echo ""
echo "🔄 To regenerate transliterations in the future, run:"
echo "   pnpm run generate-transliterations"
echo "   # or directly: ./scripts/generate-transliterations.sh"