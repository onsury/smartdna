'use client'
'use client';  // Add this at the very top

import React from 'react';  // Remove the destructuring
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

// Remove this line - you don't need useEffect from react import
// import React, { useState, useEffect, useRef } from 'react';

export default function Assessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  
  const questions = [
    {
      id: 1,
      text: "How effectively do you manage team dynamics and resolve conflicts?",
      hub: "HRHub"
    },
    {
      id: 2,
      text: "How comfortable are you with financial planning and budget management?",
      hub: "FinHub"
    },
    {
      id: 3,
      text: "How quickly do you adapt to new technologies and digital tools?",
      hub: "TechHub"
    },
    {
      id: 4,
      text: "How skilled are you at closing deals and building client relationships?",
      hub: "SalesHub"
    },
    {
      id: 5,
      text: "How effective are you at creating and executing marketing strategies?",
      hub: "MarketingHub"
    },
 {
  id: 6,
  text: "How well do you integrate online, retail, and cross-functional business operations?",
  hub: "OmniHub"
}
  ]
  
  const handleAnswer = (score: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = score
    setAnswers(newAnswers)
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }
  
  const progress = ((currentQuestion + 1) / questions.length) * 100
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">FunctionPersonaDNA Assessment</h1>
        
        <div className="w-full bg-gray-200 rounded-full h-3 mb-8">
          <div 
            className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-xl font-semibold mb-2 text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </h2>
          
          <p className="text-2xl font-medium mb-8">
            {questions[currentQuestion].text}
          </p>
          
          <div className="space-y-3">
            {[
              { value: 5, label: "Strongly Agree" },
              { value: 4, label: "Agree" },
              { value: 3, label: "Neutral" },
              { value: 2, label: "Disagree" },
              { value: 1, label: "Strongly Disagree" }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={`w-full p-4 text-left rounded-lg border-2 hover:border-purple-500 hover:bg-purple-50 transition ${
                  answers[currentQuestion] === option.value ? 'border-purple-500 bg-purple-50' : ''
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          
          {currentQuestion === questions.length - 1 && answers.length === questions.length && (
            <button 
              onClick={() => {
                const dnaScores = {
                  HRHub: answers[0] * 20,
                  FinHub: answers[1] * 20,
                  TechHub: answers[2] * 20,
                  SalesHub: answers[3] * 20,
                  MarketingHub: answers[4] * 20,
                  OmniHub: answers[5] * 20,
                }
                
                localStorage.setItem('dna_results', JSON.stringify({
                  dna_scores: dnaScores,
                  answers: answers
                }))
                
                window.location.href = '/results'
              }}
              className="w-full mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 rounded-lg"
            >
              View Your Results
            </button>
          )}
        </div>
      </div>
    </main>
  )
}