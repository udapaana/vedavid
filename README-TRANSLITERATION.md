# VedaVid Transliteration System

## Overview

VedaVid uses a sophisticated transliteration system powered by Vidyut-lipi, providing high-quality Sanskrit script conversion between 13+ writing systems.

## Architecture

### Local FastAPI Server
- **Technology**: FastAPI + Vidyut-lipi
- **Port**: 5001
- **Endpoint**: `http://localhost:5001/transliterate`
- **Benefits**: Fast, offline-capable, consistent results

### Supported Scripts
- **Devanagari** (देवनागरी) - Primary display script
- **IAST** - International standard romanization
- **Harvard-Kyoto** - Academic transliteration
- **Baraha** - Source script for most texts
- **ITRANS** - Popular input method
- **Regional Scripts**: Tamil, Telugu, Kannada, Malayalam, Gujarati
- **Technical**: SLP1, Velthuis, WX

## Quick Start

### 1. Setup Data & Environment
```bash
pnpm run setup                    # Setup data symlinks
pnpm run generate-transliterations  # Optional: pre-generate static files
```

### 2. Start Transliteration Server
```bash
pnpm run transliteration-server  # Starts FastAPI server on port 5001
```

### 3. Start Frontend
```bash
pnpm run dev                      # Starts Vite dev server
```

## Usage

### Web Interface
1. Select any script from the dropdown in the top navigation
2. Text automatically transliterates using the local server
3. First request may have slight delay, subsequent requests are cached

### API Usage
```bash
curl -X POST "http://localhost:5001/transliterate" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "namaste",
    "source": "baraha", 
    "target": "devanagari"
  }'
```

Response:
```json
{"result": "नमस्तॆ"}
```

## Development

### Server Management
```bash
# Start server
pnpm run transliteration-server

# Health check
curl http://localhost:5001/health

# List supported scripts
curl http://localhost:5001/scripts

# View API docs
open http://localhost:5001/docs
```

### Frontend Integration
The transliteration service automatically:
- Falls back to original text if server unavailable
- Caches results for performance
- Updates components reactively when transliterations complete

### Adding New Scripts
1. Add to `SCRIPT_MAPPING` in `server/transliteration-server.py`
2. Add to `SUPPORTED_SCRIPTS` in `src/services/transliterationService.ts`
3. Restart server

## File Structure

```
vedavid/
├── server/
│   └── transliteration-server.py     # FastAPI server with Vidyut
├── scripts/
│   ├── start-transliteration-server.sh  # Server startup script
│   └── generate-transliterations.sh     # Static generation
├── src/services/
│   └── transliterationService.ts        # Frontend service
└── public/data/taittiriya/
    └── transliteration-env/             # Python virtual environment
```

## Technical Details

### Virtual Environment
- **Location**: `public/data/taittiriya/transliteration-env/`
- **Python**: 3.11+
- **Dependencies**: vidyut, fastapi, uvicorn

### Performance
- **First transliteration**: ~50-100ms (API call)
- **Cached results**: Instant
- **Server startup**: ~2-3 seconds
- **Memory usage**: ~50MB (including Python runtime)

### Error Handling
- **Server offline**: Falls back to original text
- **Unsupported script**: Returns error message
- **Network issues**: Graceful degradation with caching

## Troubleshooting

### Server Won't Start
```bash
# Check virtual environment
ls public/data/taittiriya/transliteration-env/

# Recreate if missing
rm -rf public/data/taittiriya/transliteration-env/
pnpm run generate-transliterations
```

### Port Already in Use
```bash
# Find and kill process using port 5001
lsof -ti:5001 | xargs kill
```

### Dependencies Missing
```bash
cd public/data/taittiriya
source transliteration-env/bin/activate
pip install vidyut fastapi uvicorn
```

## Future Enhancements

- [ ] WebSocket for real-time transliteration
- [ ] Batch transliteration endpoint
- [ ] Docker containerization
- [ ] Additional Indic scripts
- [ ] Custom scheme support
- [ ] Performance metrics endpoint