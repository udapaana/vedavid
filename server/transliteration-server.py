#!/usr/bin/env python3
"""
FastAPI server for Sanskrit transliteration using Vidyut-lipi.
Provides a REST API for the VedaVid frontend to transliterate text.
"""

import os
import sys
from typing import Dict, List
from pydantic import BaseModel
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# Add the data directory to path for the virtual environment
data_dir = os.path.join(os.path.dirname(__file__), '..', 'public', 'data', 'taittiriya')
venv_path = os.path.join(data_dir, 'transliteration-env', 'lib', 'python3.11', 'site-packages')
sys.path.insert(0, venv_path)

try:
    from vidyut.lipi import transliterate, Scheme
    VIDYUT_AVAILABLE = True
except ImportError as e:
    print(f"Error importing Vidyut: {e}")
    print("Please ensure Vidyut is installed in the virtual environment")
    VIDYUT_AVAILABLE = False

app = FastAPI(
    title="VedaVid Transliteration API",
    description="Sanskrit transliteration service using Vidyut-lipi",
    version="1.0.0"
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mapping from script names to Vidyut Scheme enums
SCRIPT_MAPPING = {
    'devanagari': Scheme.Devanagari,
    'iast': Scheme.Iast,
    'harvard-kyoto': Scheme.HarvardKyoto,
    'baraha': Scheme.BarahaSouth,
    'itrans': Scheme.Itrans,
    'tamil': Scheme.Tamil,
    'telugu': Scheme.Telugu,
    'kannada': Scheme.Kannada,
    'malayalam': Scheme.Malayalam,
    'gujarati': Scheme.Gujarati,
    'slp1': Scheme.Slp1,
    'velthuis': Scheme.Velthuis,
    'wx': Scheme.Wx
}

# Pydantic models
class TransliterationRequest(BaseModel):
    text: str
    source: str = "baraha"
    target: str = "devanagari"

class TransliterationResponse(BaseModel):
    result: str

class HealthResponse(BaseModel):
    status: str
    vidyut_available: bool
    supported_scripts: List[str]

class ScriptsResponse(BaseModel):
    scripts: List[str]
    count: int

@app.get("/health", response_model=HealthResponse)
async def health():
    """Health check endpoint."""
    return HealthResponse(
        status="ok",
        vidyut_available=VIDYUT_AVAILABLE,
        supported_scripts=list(SCRIPT_MAPPING.keys())
    )

@app.post("/transliterate", response_model=TransliterationResponse)
async def transliterate_text(request: TransliterationRequest):
    """
    Transliterate text between scripts using Vidyut-lipi.
    """
    if not VIDYUT_AVAILABLE:
        raise HTTPException(status_code=500, detail="Vidyut library not available")
    
    try:
        text = request.text.strip()
        source_script = request.source.lower()
        target_script = request.target.lower()
        
        if not text:
            return TransliterationResponse(result="")
        
        # Map script names to Vidyut schemes
        source_scheme = SCRIPT_MAPPING.get(source_script)
        target_scheme = SCRIPT_MAPPING.get(target_script)
        
        if not source_scheme:
            raise HTTPException(
                status_code=400, 
                detail=f"Unsupported source script: {source_script}"
            )
        
        if not target_scheme:
            raise HTTPException(
                status_code=400, 
                detail=f"Unsupported target script: {target_script}"
            )
        
        # If source and target are the same, return original text
        if source_scheme == target_scheme:
            return TransliterationResponse(result=text)
        
        # Perform transliteration
        result = transliterate(text, source_scheme, target_scheme)
        
        return TransliterationResponse(result=result)
        
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Transliteration failed: {str(e)}"
        )

@app.get("/scripts", response_model=ScriptsResponse)
async def get_supported_scripts():
    """Get list of supported scripts."""
    return ScriptsResponse(
        scripts=list(SCRIPT_MAPPING.keys()),
        count=len(SCRIPT_MAPPING)
    )

if __name__ == "__main__":
    if not VIDYUT_AVAILABLE:
        print("ERROR: Vidyut library not available!")
        print("Please install it in the virtual environment:")
        print("  cd public/data/taittiriya")
        print("  source transliteration-env/bin/activate")
        print("  pip install vidyut fastapi uvicorn")
        sys.exit(1)
    
    print("🕉️  VedaVid Transliteration Server (FastAPI)")
    print("=========================================")
    print(f"Vidyut available: {VIDYUT_AVAILABLE}")
    print(f"Supported scripts: {len(SCRIPT_MAPPING)}")
    print("")
    print("Starting server on http://localhost:5001")
    print("API docs: http://localhost:5001/docs")
    print("")
    print("Endpoints:")
    print("  GET  /health       - Health check")
    print("  GET  /scripts      - List supported scripts")
    print("  POST /transliterate - Transliterate text")
    print("")
    
    uvicorn.run(
        "transliteration-server:app",
        host="0.0.0.0",
        port=5001,
        reload=True
    )