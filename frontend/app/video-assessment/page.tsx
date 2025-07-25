'use client'
import { useState } from 'react'

export default function VideoAssessment() {
  const [currentRound, setCurrentRound] = useState(1)
  const [language, setLanguage] = useState('english')
  const [isRecording, setIsRecording] = useState(false)
  
  const rounds = [
    "Tell us about your entrepreneurial journey and vision",
    "Describe your leadership style and team management approach",
    "Share your vision for technology in your business",
    "Explain your customer acquisition and retention strategy",
    "Walk us through your financial planning and growth projections"
  ]
  
  const languages = [
    { code: 'english', name: 'English' },
    { code: 'hindi', name: 'हिन्दी' },
    { code: 'tamil', name: 'தமிழ்' },
    { code: 'telugu', name: 'తెలుగు' },
    { code: 'kannada', name: 'ಕನ್ನಡ' },
    { code: 'malayalam', name: 'മലയാളം' }
  ]
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-2">
            <span className="text-orange-500">Core</span>
            <span className="text-blue-600">Persona</span>
            <span className="text-gray-700">DNA</span>
          </h1>
          <p className="text-xl text-gray-600">5-Round Video Interview with Founders</p>
          <p className="text-lg text-gray-500 mt-2">StartHub Media AI Assessment</p>
        </div>
        
        {/* Language Selector */}
        <div className="flex justify-center mb-8 space-x-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`px-4 py-2 rounded-lg transition ${
                language === lang.code 
                  ? 'bg-gradient-to-r from-orange-500 to-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
        
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-semibold text-gray-600">Round {currentRound} of 5</span>
            <span className="text-sm font-semibold text-gray-600">{currentRound * 20}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-orange-500 to-blue-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${currentRound * 20}%` }}
            />
          </div>
        </div>
        
        {/* Video Recording Area */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-4">Round {currentRound}: {rounds[currentRound - 1]}</h2>
          
          <div className="bg-gray-900 rounded-lg h-96 mb-6 flex items-center justify-center relative overflow-hidden">
            {isRecording ? (
              <div className="text-center">
                <div className="w-32 h-32 bg-red-600 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
                  <div className="w-24 h-24 bg-red-500 rounded-full"></div>
                </div>
                <p className="text-white text-xl">Recording in progress...</p>
                <p className="text-gray-400 mt-2">Speak in {languages.find(l => l.code === language)?.name}</p>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-white text-xl">Ready to record</p>
                <p className="text-gray-400 mt-2">Click Start Recording when ready</p>
              </div>
            )}
          </div>
          
          <div className="flex justify-between items-center">
            <button 
              onClick={() => currentRound > 1 && setCurrentRound(currentRound - 1)}
              className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition disabled:opacity-50"
              disabled={currentRound === 1}
            >
              Previous Round
            </button>
            
            <button 
              onClick={() => setIsRecording(!isRecording)}
              className={`px-8 py-3 rounded-lg font-bold transition ${
                isRecording 
                  ? 'bg-red-600 text-white hover:bg-red-700' 
                  : 'bg-gradient-to-r from-orange-500 to-blue-600 text-white hover:shadow-lg'
              }`}
            >
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>
            
            <button 
              onClick={() => {
                if (currentRound < 5) {
                  setCurrentRound(currentRound + 1)
                  setIsRecording(false)
                } else {
                  alert('Assessment Complete! Redirecting to results...')
                  window.location.href = '/results'
                }
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {currentRound === 5 ? 'Complete Assessment' : 'Next Round'}
            </button>
          </div>
        </div>
        
        <div className="mt-8 bg-blue-50 rounded-xl p-6">
          <h3 className="font-bold text-lg mb-3">Interview Tips:</h3>
          <ul className="space-y-2 text-gray-700">
            <li>✅ Each response should be 2-3 minutes</li>
            <li>✅ Speak naturally in your preferred language</li>
            <li>✅ Share specific examples and experiences</li>
            <li>✅ Be authentic and genuine</li>
          </ul>
        </div>
      </div>
    </main>
  )
}