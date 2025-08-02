'use client';

import { useState } from 'react';

export default function TestInterview() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>('');
  
  const testAPI = async () => {
    setLoading(true);
    setError('');
    setResult(null);
    
    try {
      const response = await fetch('/api/interview/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'suryanarayanan@starthubbusiness.com',
          company: 'StartHub MediaAI Pvt. Ltd.',
          name: 'Suryanarayanan',
          type: 'express',
          industry: 'AI/SaaS',
          employee_count: 5,
          phone: '+91-9876543210'
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'API request failed');
      }
      
      setResult(data);
    } catch (err: any) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Test Interview API</h1>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <button
            onClick={testAPI}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Testing API...' : 'Test Interview Start API'}
          </button>
          
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
              <p className="text-red-600 font-medium">Error:</p>
              <p className="text-red-600">{error}</p>
            </div>
          )}
          
          {result && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
              <p className="text-green-600 font-medium">Success!</p>
              <pre className="text-sm mt-2 overflow-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </div>
        
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Direct API Test</h2>
          <p className="text-gray-600 mb-4">Test the GET endpoint directly:</p>
          <a 
            href="/api/interview/start" 
            target="_blank"
            className="text-blue-600 hover:underline"
          >
            /api/interview/start (GET)
          </a>
        </div>
      </div>
    </div>
  );
}
