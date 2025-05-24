export interface TransliterationOption {
  name: string;
  label: string;
  script: string;
}

export const SUPPORTED_SCRIPTS: TransliterationOption[] = [
  { name: 'devanagari', label: 'देवनागरी', script: 'devanagari' },
  { name: 'iast', label: 'IAST', script: 'iast' },
  { name: 'harvard-kyoto', label: 'Harvard-Kyoto', script: 'harvard-kyoto' },
  { name: 'baraha', label: 'Baraha', script: 'baraha' },
  { name: 'itrans', label: 'ITRANS', script: 'itrans' },
  { name: 'tamil', label: 'தமிழ்', script: 'tamil' },
  { name: 'telugu', label: 'తెలుగు', script: 'telugu' },
  { name: 'kannada', label: 'ಕನ್ನಡ', script: 'kannada' },
  { name: 'malayalam', label: 'മലയാളം', script: 'malayalam' },
  { name: 'gujarati', label: 'ગુજરાતી', script: 'gujarati' },
  { name: 'slp1', label: 'SLP1', script: 'slp1' },
  { name: 'velthuis', label: 'Velthuis', script: 'velthuis' },
  { name: 'wx', label: 'WX', script: 'wx' },
];

export class TransliterationService {
  private static instance: TransliterationService;
  private currentScript: string = 'devanagari';
  private transliterationCache = new Map<string, string>();
  private scriptChangeListeners: (() => void)[] = [];
  
  static getInstance(): TransliterationService {
    if (!TransliterationService.instance) {
      TransliterationService.instance = new TransliterationService();
    }
    return TransliterationService.instance;
  }
  
  getCurrentScript(): string {
    return this.currentScript;
  }
  
  setCurrentScript(script: string): void {
    this.currentScript = script;
    this.notifyScriptChange();
  }
  
  /**
   * Get static transliteration from pre-generated data.
   * Falls back to original text if transliteration not available.
   */
  getStaticTransliteration(transliterations: Record<string, string> | undefined, targetScript?: string): string {
    if (!transliterations) {
      return '';
    }
    
    const script = targetScript || this.currentScript;
    return transliterations[script] || transliterations['baraha'] || '';
  }
  
  /**
   * Transliterate text using Aksharamukha API.
   * Returns original text immediately, then updates cache with transliteration.
   */
  transliterate(text: string, fromScript: string = 'baraha', toScript?: string): string {
    if (!text) return '';
    
    const targetScript = toScript || this.currentScript;
    
    // If source and target are the same, return as-is
    if (fromScript === targetScript) {
      return text;
    }
    
    // Check cache first
    const cacheKey = `${fromScript}-${targetScript}-${text}`;
    const cached = this.transliterationCache.get(cacheKey);
    if (cached) {
      return cached;
    }
    
    // Start async transliteration and cache result
    this.transliterateAsync(text, fromScript, targetScript).then(result => {
      this.transliterationCache.set(cacheKey, result);
      // Force reactive update
      this.notifyScriptChange();
    });
    
    // Return original text immediately
    return text;
  }

  /**
   * Async transliteration using local Vidyut FastAPI server
   */
  private async transliterateAsync(text: string, fromScript: string, toScript: string): Promise<string> {
    try {
      // Call local FastAPI server
      const response = await fetch('http://localhost:5001/transliterate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          source: fromScript,
          target: toScript
        })
      });
      
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      
      const data = await response.json();
      return data.result || text;
      
    } catch (error) {
      console.warn('Local transliteration failed, using original text:', error);
      return text;
    }
  }

  /**
   * Notify listeners of script changes (for reactive updates)
   */
  private notifyScriptChange(): void {
    this.scriptChangeListeners.forEach(listener => listener());
  }

  /**
   * Add a listener for script changes
   */
  addScriptChangeListener(listener: () => void): void {
    this.scriptChangeListeners.push(listener);
  }

  /**
   * Remove a script change listener
   */
  removeScriptChangeListener(listener: () => void): void {
    const index = this.scriptChangeListeners.indexOf(listener);
    if (index > -1) {
      this.scriptChangeListeners.splice(index, 1);
    }
  }
  
  /**
   * Get all available transliterations from static data.
   */
  getAllStaticTransliterations(transliterations: Record<string, string> | undefined): Record<string, string> {
    return transliterations || {};
  }
  
  detectScript(text: string): string {
    // Simple script detection based on character ranges
    if (/[\u0900-\u097F]/.test(text)) return 'devanagari';
    if (/[\u0B80-\u0BFF]/.test(text)) return 'tamil';
    if (/[\u0C00-\u0C7F]/.test(text)) return 'telugu';
    if (/[\u0C80-\u0CFF]/.test(text)) return 'kannada';
    if (/[\u0D00-\u0D7F]/.test(text)) return 'malayalam';
    if (/[\u0A80-\u0AFF]/.test(text)) return 'gujarati';
    
    // Default to baraha if no specific script detected
    return 'baraha';
  }
  
  getScriptLabel(scriptName: string): string {
    const script = SUPPORTED_SCRIPTS.find(s => s.name === scriptName || s.script === scriptName);
    return script?.label || scriptName;
  }
}

export const transliterationService = TransliterationService.getInstance();