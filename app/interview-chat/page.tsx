'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function InterviewChat() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Welcome! Tell me about your vision for StartHub MediaAI. What inspired you to create this platform?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  
  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    
    const userMessage = input;
    setInput('');
    const updatedMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(updatedMessages);
    setLoading(true);
    
    try {
      const response = await fetch('/api/interview/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          message: userMessage,
          messages: updatedMessages
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setMessages([...updatedMessages, { 
          role: 'assistant', 
          content: data.response 
        }]);
      } else {
        console.error('Chat error:', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4">CorePersonaDNA Interview</h1>
        <p className="text-sm text-gray-600 mb-4">Session: {sessionId}</p>
        
        <div className="h-96 overflow-y-auto mb-4 p-4 border rounded">
          {messages.map((msg, i) => (
            <div key={i} className={`mb-4 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block p-3 rounded-lg max-w-2xl ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                <strong>{msg.role}:</strong> {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="text-center text-gray-500">
              <div>Claude is thinking...</div>
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1 p-2 border rounded"
            placeholder="Type your response..."
            disabled={loading}
          />
          <button 
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}