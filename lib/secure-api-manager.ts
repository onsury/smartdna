class SecureAPIManager {
  private static instance: SecureAPIManager;
  private keys: Map<string, string> = new Map();
  
  private constructor() {
    this.loadKeys();
  }
  
  static getInstance(): SecureAPIManager {
    if (!SecureAPIManager.instance) {
      SecureAPIManager.instance = new SecureAPIManager();
    }
    return SecureAPIManager.instance;
  }
  
  private loadKeys() {
    const apiKeys = {
      ANTHROPIC: process.env.ANTHROPIC_API_KEY,
      GEMINI: process.env.GEMINI_API_KEY,
      PERPLEXITY: process.env.PERPLEXITY_API_KEY,
      GROQ: process.env.GROQ_API_KEY,
      VAPI: process.env.VAPI_API_KEY
    };
    
    Object.entries(apiKeys).forEach(([key, value]) => {
      if (value) {
        this.keys.set(key, value);
      }
    });
  }
  
  getMaskedKey(provider: string): string {
    const key = this.keys.get(provider);
    if (!key) return 'not-configured';
    
    if (provider === 'ANTHROPIC' && key.startsWith('sk-ant-')) {
      return `sk-ant-...${key.slice(-4)}`;
    } else if (provider === 'GEMINI' && key.startsWith('AIza')) {
      return `AIza...${key.slice(-4)}`;
    } else if (provider === 'PERPLEXITY' && key.startsWith('pplx-')) {
      return `pplx-...${key.slice(-4)}`;
    } else if (provider === 'GROQ' && key.startsWith('gsk_')) {
      return `gsk_...${key.slice(-4)}`;
    } else {
      return `...${key.slice(-4)}`;
    }
  }
  
  getSecureKey(provider: string): string | null {
    return this.keys.get(provider) || null;
  }
}

export const apiManager = SecureAPIManager.getInstance();