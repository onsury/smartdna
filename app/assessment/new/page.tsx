'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewAssessment() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const startAssessment = async () => {
    setLoading(true);
    
    const response = await fetch('/api/interview/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'suryanarayanan@starthubbusiness.com',
        company: 'StartHub MediaAI Pvt. Ltd.',
        name: 'Suryanarayanan',
        type: 'express',
        industry: 'AI/SaaS',
        employee_count: 5
      })
    });
    
    const data = await response.json();
    if (data.success) {
      // Redirect to interview
      router.push(`/interview-chat?session=${data.sessionId}`);
    }
  };
  
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">StartHub MediaAI Assessment</h1>
        
        <div className="bg-white p-8 rounded-lg shadow">
          <h2 className="text-xl mb-4">Company Details</h2>
          <ul className="space-y-2 mb-6">
            <li><strong>Company:</strong> StartHub MediaAI Pvt. Ltd.</li>
            <li><strong>Founder:</strong> Suryanarayanan</li>
            <li><strong>Industry:</strong> AI/SaaS</li>
            <li><strong>Type:</strong> Express Assessment (20 pages)</li>
          </ul>
          
          <button
            onClick={startAssessment}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Starting...' : 'Start CorePersonaDNA Assessment'}
          </button>
        </div>
      </div>
    </div>
  );
}
