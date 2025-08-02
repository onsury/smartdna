'use client';

import { useState } from 'react';

export default function APIConfig() {
  const [showKeys, setShowKeys] = useState(false);
  const [keys, setKeys] = useState({
    ANTHROPIC_API_KEY: '',
    OPENAI_API_KEY: '',
    GEMINI_API_KEY: '',
    PERPLEXITY_API_KEY: '',
    VAPI_API_KEY: ''
  });
  
  const handleSave = async () => {
    // Save to secure backend
    const response = await fetch('/api/admin/save-keys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${prompt('Enter admin key:')}`
      },
      body: JSON.stringify(keys)
    });
    
    if (response.ok) {
      alert('Keys saved securely!');
      // Clear form
      setKeys({
        ANTHROPIC_API_KEY: '',
        OPENAI_API_KEY: '',
        GEMINI_API_KEY: '',
        PERPLEXITY_API_KEY: '',
        VAPI_API_KEY: ''
      });
    }
  };
  
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Secure API Configuration</h1>
      
      <div className="bg-yellow-50 p-4 rounded-lg mb-6">
        <p className="text-yellow-800">
          🔒 Keys are encrypted and never exposed in code or logs
        </p>
      </div>
      
      <div className="space-y-4">
        {Object.keys(keys).map((key) => (
          <div key={key}>
            <label className="block text-sm font-medium mb-1">
              {key.replace('_', ' ')}
            </label>
            <input
              type={showKeys ? 'text' : 'password'}
              // Change this:

// To this:
value={keys[key as keyof typeof keys]}
              onChange={(e) => setKeys({...keys, [key]: e.target.value})}
              className="w-full p-2 border rounded"
              placeholder="sk-..."
            />
          </div>
        ))}
      </div>
      
      <div className="mt-6 flex gap-4">
        <button
          onClick={() => setShowKeys(!showKeys)}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          {showKeys ? 'Hide' : 'Show'} Keys
        </button>
        
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save Securely
        </button>
      </div>
    </div>
  );
}