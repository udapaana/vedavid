import Sanscript from '@indic-transliteration/sanscript';

export interface TransliterationOption {
  name: string;
  label: string;
  script: string;
}

export const SUPPORTED_SCRIPTS: TransliterationOption[] = [
  { name: 'devanagari', label: 'देवनागरी', script: 'devanagari' },
  { name: 'iast', label: 'IAST', script: 'iast' },
  { name: 'harvard-kyoto', label: 'Harvard-Kyoto', script: 'hk' },
  { name: 'baraha', label: 'Baraha', script: 'baraha' },
  { name: 'itrans', label: 'ITRANS', script: 'itrans' },
  { name: 'tamil', label: 'தமிழ்', script: 'tamil' },
  { name: 'telugu', label: 'తెలుగు', script: 'telugu' },
  { name: 'kannada', label: 'ಕನ್ನಡ', script: 'kannada' },
  { name: 'malayalam', label: 'മലയാളം', script: 'malayalam' },
  { name: 'gujarati', label: 'ગુજરાતી', script: 'gujarati' },
];

export class TransliterationService {
  private static instance: TransliterationService;
  private currentScript: string = 'devanagari';
  
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
  }
  
  transliterate(text: string, fromScript: string = 'baraha', toScript?: string): string {
    if (!text) return '';
    
    const targetScript = toScript || this.currentScript;
    
    // If source and target are the same, return as-is
    if (fromScript === targetScript) {
      return text;
    }
    
    try {
      // Transliterate from source script to target script
      return Sanscript.t(text, fromScript, targetScript);
    } catch (error) {
      console.warn('Transliteration failed:', error);
      return text; // Return original text if transliteration fails
    }
  }
  
  transliterateToAll(text: string, fromScript: string = 'baraha'): Record<string, string> {
    const results: Record<string, string> = {};
    
    SUPPORTED_SCRIPTS.forEach(script => {
      results[script.name] = this.transliterate(text, fromScript, script.script);
    });
    
    return results;
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