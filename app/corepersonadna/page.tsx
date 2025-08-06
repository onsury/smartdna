// app/corepersonadna/page.tsx
'use client';

'use client';  // This MUST be the first line

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CorePersonaDNAPage() {
  // ... rest of the code
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold">
            <span className="text-blue-600">Core</span>
            <span className="text-orange-500">Persona</span>
            <span className="text-green-500">DNA</span>
            <span className="text-gray-400 text-2xl align-super">™</span>
          </h1>
          <p className="text-gray-600 mt-2">The Science Behind Authentic Organizational Content</p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="flex space-x-4 border-b">
          {['overview', 'process', 'dimensions', 'benefits', 'comparison'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 capitalize ${
                activeTab === tab
                  ? 'border-b-2 border-blue-600 text-blue-600 font-semibold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6">What is CorePersonaDNA?</h2>
              <p className="text-lg text-gray-700 mb-6">
                CorePersonaDNA is a revolutionary AI-powered system that captures the authentic 
                leadership essence of founders through 2.5 hours of structured voice and text interviews 
                spread across 5 days. Unlike traditional personality assessments, our system 
                observes actual behavior patterns, communication styles, and decision-making 
                processes to create a comprehensive leadership profile.
              </p>
              
              {/* Visual Framework */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mt-6">
                <h3 className="text-xl font-semibold mb-4">The CorePersonaDNA Framework</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-4xl text-white">💬</span>
                    </div>
                    <h4 className="font-semibold">5 Voice & Text Interview Sessions</h4>
                    <p className="text-sm text-gray-600 mt-2">30 minutes each, spread over 5 days</p>
                  </div>
                  <div className="text-center">
                    <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-4xl text-white">🧠</span>
                    </div>
                    <h4 className="font-semibold">AI Analysis</h4>
                    <p className="text-sm text-gray-600 mt-2">Multi-LLM processing for deep insights</p>
                  </div>
                  <div className="text-center">
                    <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-4xl text-white">🧬</span>
                    </div>
                    <h4 className="font-semibold">DNA Profile</h4>
                    <p className="text-sm text-gray-600 mt-2">Unique leadership fingerprint</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Differentiators */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6">Why CorePersonaDNA is Revolutionary</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-lg mb-2">Multi-Day Consistency</h4>
                  <p className="text-gray-600">
                    Our 5-day process captures authentic personality by observing patterns 
                    across different days, moods, and energy levels.
                  </p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-semibold text-lg mb-2">Behavioral Observation</h4>
                  <p className="text-gray-600">
                    AI observes actual behaviors, not self-reported traits, leading to 
                    more accurate and actionable insights.
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-lg mb-2">Dynamic Profiling</h4>
                  <p className="text-gray-600">
                    Your DNA profile evolves with additional assessments, capturing 
                    growth and changes in leadership style.
                  </p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-lg mb-2">Content Integration</h4>
                  <p className="text-gray-600">
                    Direct integration with content generation ensures every output 
                    reflects your authentic voice and values.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'dimensions' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6">CorePersonaDNA Dimensions</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-4 text-left">Dimension</th>
                    <th className="border p-4 text-left">What We Analyze</th>
                    <th className="border p-4 text-left">Business Impact</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-4 font-semibold">Leadership Style</td>
                    <td className="border p-4">Decision patterns, team references, vision articulation</td>
                    <td className="border p-4">Shapes organizational culture and strategic direction</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border p-4 font-semibold">Communication Tone</td>
                    <td className="border p-4">Language complexity, emotional markers, persuasion style</td>
                    <td className="border p-4">Defines brand voice and customer engagement approach</td>
                  </tr>
                  <tr>
                    <td className="border p-4 font-semibold">Core Values</td>
                    <td className="border p-4">Repeated themes, emphasis points, ethical considerations</td>
                    <td className="border p-4">Drives hiring decisions and partnership choices</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border p-4 font-semibold">Decision Framework</td>
                    <td className="border p-4">Risk tolerance, speed preference, data reliance</td>
                    <td className="border p-4">Influences product strategy and market expansion</td>
                  </tr>
                  <tr>
                    <td className="border p-4 font-semibold">Innovation Quotient</td>
                    <td className="border p-4">Openness to change, future orientation, creativity markers</td>
                    <td className="border p-4">Determines R&D investment and competitive positioning</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'process' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6">The 5-Day Assessment Journey</h2>
              <div className="space-y-6">
                {[
                  { day: 1, title: "Vision & Mission", focus: "Understanding your why and where you're going", questions: ["What problem does your company solve?", "Where do you see the company in 5 years?", "What makes your solution unique?"] },
                  { day: 2, title: "Leadership Style", focus: "How you lead and inspire others", questions: ["Describe your leadership philosophy", "How do you handle team conflicts?", "What's your approach to delegation?"] },
                  { day: 3, title: "Decision Making", focus: "Your approach to choices and challenges", questions: ["Walk through a difficult decision you made", "How do you evaluate risks?", "What's your process for strategic planning?"] },
                  { day: 4, title: "Communication", focus: "How you connect and convey ideas", questions: ["How do you communicate vision to your team?", "Describe your customer communication style", "How do you handle difficult conversations?"] },
                  { day: 5, title: "Innovation & Growth", focus: "Your approach to change and scaling", questions: ["How do you foster innovation?", "What's your growth strategy?", "How do you adapt to market changes?"] }
                ].map((round) => (
                  <div key={round.day} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {round.day}
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-semibold mb-2">Day {round.day}: {round.title}</h3>
                      <p className="text-gray-600 mb-3">{round.focus}</p>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm font-semibold mb-2">Sample Questions:</p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {round.questions.map((q, i) => (
                            <li key={i}>• {q}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'benefits' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6">For Founders</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  <div>
                    <strong>Authentic Voice Preservation:</strong> Every piece of content sounds like you wrote it
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  <div>
                    <strong>Time Savings:</strong> 100+ hours/month saved on content creation and reviews
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  <div>
                    <strong>Consistent Messaging:</strong> Your vision communicated consistently across all channels
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  <div>
                    <strong>Strategic Insights:</strong> Understand your own leadership patterns better
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6">For Organizations</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">✓</span>
                  <div>
                    <strong>Cultural Alignment:</strong> All content reflects organizational values
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">✓</span>
                  <div>
                    <strong>Brand Consistency:</strong> Unified voice across all departments
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">✓</span>
                  <div>
                    <strong>Cost Efficiency:</strong> 90% reduction in content creation costs
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">✓</span>
                  <div>
                    <strong>Scalability:</strong> Unlimited content without losing authenticity
                  </div>
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'comparison' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6">How We Compare</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-4 text-left">Feature</th>
                    <th className="p-4 text-center">Traditional Tools</th>
                    <th className="p-4 text-center bg-blue-50">CorePersonaDNA</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-4 font-semibold">Assessment Method</td>
                    <td className="p-4 text-center">One-time questionnaire</td>
                    <td className="p-4 text-center bg-blue-50">5-day video interviews</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-4 font-semibold">Data Collection</td>
                    <td className="p-4 text-center">Self-reported</td>
                    <td className="p-4 text-center bg-blue-50">AI-observed behaviors</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Profile Type</td>
                    <td className="p-4 text-center">Generic categories</td>
                    <td className="p-4 text-center bg-blue-50">Custom DNA profile</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-4 font-semibold">Content Integration</td>
                    <td className="p-4 text-center">None</td>
                    <td className="p-4 text-center bg-blue-50">Direct AI generation</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Organizational Impact</td>
                    <td className="p-4 text-center">Individual insights</td>
                    <td className="p-4 text-center bg-blue-50">Company-wide alignment</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-4 font-semibold">Evolution</td>
                    <td className="p-4 text-center">Static results</td>
                    <td className="p-4 text-center bg-blue-50">Dynamic, growing profile</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 mt-12">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Discover Your CorePersonaDNA?</h2>
          <p className="text-xl mb-8">Join forward-thinking founders who are revolutionizing their organizational content</p>
          <button
            onClick={() => router.push('/assessment-tool')}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition"
          >
            Start Your Assessment
          </button>
        </div>
      </div>
    </div>
  );
}