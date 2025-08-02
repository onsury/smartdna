const { apiManager } = require('./lib/secure-api-manager');

console.log('🔒 API Key Masking Test:\n');
console.log('Claude:', apiManager.getMaskedKey('ANTHROPIC'));
console.log('Gemini:', apiManager.getMaskedKey('GEMINI'));
console.log('Groq:', apiManager.getMaskedKey('GROQ'));
console.log('Perplexity:', apiManager.getMaskedKey('PERPLEXITY'));
console.log('Vapi:', apiManager.getMaskedKey('VAPI'));
console.log('OpenAI:', apiManager.getMaskedKey('OPENAI'));
console.log('\n✅ Status:', apiManager.getAPIStatus());
