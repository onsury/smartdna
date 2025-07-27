'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AssessmentSelection() {
  const router = useRouter();

  const assessmentOptions = [
    {
      type: 'express',
      name: 'Express Assessment',
      duration: '45-50 minutes',
      sessions: 'Single Session',
      price: '₹35,000',
      features: [
        '5 topics covered in one session',
        '10 minutes per topic',
        'Immediate results',
        'Best for busy executives',
        'Basic DNA profile'
      ],
      color: 'from-blue-500 to-cyan-500',
      popular: false
    },
    {
      type: 'standard',
      name: 'Standard Assessment',
      duration: '75 minutes total',
      sessions: '5 days × 15 minutes',
      price: '₹50,000',
      features: [
        'One topic per day',
        '15 minutes daily commitment',
        'Better consistency analysis',
        'Work-life balance friendly',
        'Enhanced DNA profile'
      ],
      color: 'from-purple-500 to-pink-500',
      popular: true
    },
    {
      type: 'premium',
      name: 'Premium Assessment',
      duration: '2.5 hours total',
      sessions: '5 days × 30 minutes',
      price: '₹75,000',
      features: [
        'Deep dive into each topic',
        '30 minutes of focused discussion',
        'Most accurate DNA profiling',
        'Comprehensive analysis',
        'Premium insights & recommendations'
      ],
      color: 'from-green-500 to-emerald-500',
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">
              <span className="text-blue-600">Core</span>
              <span className="text-orange-500">Persona</span>
              <span className="text-green-500">DNA</span>
              <span className="text-gray-400 text-xl align-super">™</span>
              <span className="ml-2">Assessment Options</span>
            </h1>
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Introduction */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Choose Your Assessment Journey</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select the assessment type that best fits your schedule and requirements. 
            All assessments use the same advanced AI analysis to create your unique CorePersonaDNA profile.
          </p>
        </div>

        {/* Assessment Options */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {assessmentOptions.map((option) => (
            <div
              key={option.type}
              className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 ${
                option.popular ? 'ring-4 ring-purple-500 ring-opacity-50' : ''
              }`}
            >
              {option.popular && (
                <div className="absolute top-0 right-0 bg-purple-500 text-white px-4 py-1 rounded-bl-lg text-sm font-semibold">
                  Most Popular
                </div>
              )}
              
              <div className={`h-2 bg-gradient-to-r ${option.color}`} />
              
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">{option.name}</h3>
                <div className="text-3xl font-bold mb-4 text-gray-900">{option.price}</div>
                
                <div className="space-y-2 mb-6 text-gray-600">
                  <p className="flex items-center">
                    <span className="mr-2">⏱️</span>
                    {option.duration}
                  </p>
                  <p className="flex items-center">
                    <span className="mr-2">📅</span>
                    {option.sessions}
                  </p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {option.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => router.push(`/video-assessment?type=${option.type}`)}
                  className={`w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r ${option.color} hover:shadow-lg transform hover:-translate-y-0.5 transition`}
                >
                  Start {option.name}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-6">Detailed Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Feature</th>
                    <th className="text-center py-3 px-4">Express</th>
                    <th className="text-center py-3 px-4">Standard</th>
                    <th className="text-center py-3 px-4">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4">Total Time Investment</td>
                    <td className="text-center py-3 px-4">45-50 min</td>
                    <td className="text-center py-3 px-4">75 min</td>
                    <td className="text-center py-3 px-4">150 min</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="py-3 px-4">Number of Sessions</td>
                    <td className="text-center py-3 px-4">1</td>
                    <td className="text-center py-3 px-4">5</td>
                    <td className="text-center py-3 px-4">5</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">DNA Profile Accuracy</td>
                    <td className="text-center py-3 px-4">85%</td>
                    <td className="text-center py-3 px-4">92%</td>
                    <td className="text-center py-3 px-4">98%</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="py-3 px-4">Consistency Analysis</td>
                    <td className="text-center py-3 px-4">Basic</td>
                    <td className="text-center py-3 px-4">Enhanced</td>
                    <td className="text-center py-3 px-4">Comprehensive</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Leadership Insights</td>
                    <td className="text-center py-3 px-4">Core</td>
                    <td className="text-center py-3 px-4">Detailed</td>
                    <td className="text-center py-3 px-4">Executive-level</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="py-3 px-4">Best For</td>
                    <td className="text-center py-3 px-4">Quick Start</td>
                    <td className="text-center py-3 px-4">Balanced Approach</td>
                    <td className="text-center py-3 px-4">Maximum Accuracy</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6">
              <h4 className="font-semibold mb-2">Can I upgrade my assessment later?</h4>
              <p className="text-gray-600">Yes, you can upgrade from Express to Standard or Premium within 30 days by paying the difference.</p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <h4 className="font-semibold mb-2">What if I miss a day in multi-day assessments?</h4>
              <p className="text-gray-600">No problem! You have up to 10 days to complete all sessions at your convenience.</p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <h4 className="font-semibold mb-2">Is my data secure?</h4>
              <p className="text-gray-600">Absolutely. All video assessments are encrypted and processed securely. We never share your data.</p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <h4 className="font-semibold mb-2">When do I get my results?</h4>
              <p className="text-gray-600">Your CorePersonaDNA profile is generated within 24 hours of completing your assessment.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}