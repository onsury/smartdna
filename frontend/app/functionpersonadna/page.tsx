// app/functionpersonadna/page.tsx
'use client';  // This MUST be the first line

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FunctionPersonaDNAPage() {
  // ... rest of the code
  const router = useRouter();
  const [selectedHub, setSelectedHub] = useState('hrhub');

  const hubs = [
    {
      id: 'hrhub',
      name: 'HRHub',
      icon: '👥',
      color: '#6366F1',
      description: 'People-First Communication',
      dnaAdaptation: 'Translates leadership style into empathetic team communication',
      benefits: [
        'Job descriptions that attract culture-fit candidates',
        'Performance reviews aligned with company values',
        'Onboarding materials reflecting leadership vision',
        'Policy documents with authentic organizational voice'
      ],
      comparison: {
        traditional: 'Generic HR templates',
        functionDNA: 'Leadership-aligned people strategies'
      }
    },
    {
      id: 'finhub',
      name: 'FinHub',
      icon: '💰',
      color: '#F59E0B',
      description: 'Vision-Driven Financial Communication',
      dnaAdaptation: 'Converts founder\'s risk profile into financial narratives',
      benefits: [
        'Budget proposals reflecting growth ambitions',
        'Investor reports with authentic vision',
        'Financial dashboards aligned with priorities',
        'Risk assessments matching leadership style'
      ],
      comparison: {
        traditional: 'Standard financial reports',
        functionDNA: 'Vision-integrated financial storytelling'
      }
    },
    {
      id: 'techhub',
      name: 'TechHub',
      icon: '⚙️',
      color: '#10B981',
      description: 'Innovation-Led Technical Documentation',
      dnaAdaptation: 'Infuses innovation quotient into technical content',
      benefits: [
        'Technical docs reflecting company innovation',
        'SOPs aligned with efficiency values',
        'Product specs with visionary elements',
        'API documentation with user empathy'
      ],
      comparison: {
        traditional: 'Dry technical documentation',
        functionDNA: 'Innovation-infused technical content'
      }
    },
    {
      id: 'saleshub',
      name: 'SalesHub',
      icon: '📈',
      color: '#EC4899',
      description: 'Authentic Relationship Building',
      dnaAdaptation: 'Channels communication style into sales messaging',
      benefits: [
        'Sales pitches with founder\'s conviction',
        'Proposals reflecting company values',
        'Follow-ups maintaining authentic voice',
        'Negotiations aligned with principles'
      ],
      comparison: {
        traditional: 'Aggressive sales tactics',
        functionDNA: 'Value-based relationship building'
      }
    },
    {
      id: 'marketinghub',
      name: 'MarketingHub',
      icon: '🎯',
      color: '#3B82F6',
      description: 'Value-Driven Brand Messaging',
      dnaAdaptation: 'Transforms core values into compelling narratives',
      benefits: [
        'Campaigns reflecting authentic mission',
        'Social media with consistent voice',
        'Content strategy aligned with vision',
        'Brand stories that resonate deeply'
      ],
      comparison: {
        traditional: 'Trend-following marketing',
        functionDNA: 'Values-anchored brand building'
      }
    },
    {
      id: 'omnihub',
      name: 'OmniHub',
      icon: '🔄',
      color: '#8B5CF6',
      description: 'Unified Cross-Functional Voice',
      dnaAdaptation: 'Integrates all DNA aspects for holistic communication',
      benefits: [
        'Company announcements with unified voice',
        'Strategic plans reflecting full DNA',
        'Cross-department consistency',
        'Stakeholder communications aligned'
      ],
      comparison: {
        traditional: 'Departmental silos',
        functionDNA: 'DNA-unified organization'
      }
    }
  ];

  const selectedHubData = hubs.find(h => h.id === selectedHub);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold">
            <span className="text-purple-600">Function</span>
            <span className="text-pink-500">Persona</span>
            <span className="text-orange-500">DNA</span>
          </h1>
          <p className="text-gray-600 mt-2">Translating Leadership DNA into Functional Excellence</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Overview Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6">What is FunctionPersonaDNA?</h2>
          <p className="text-lg text-gray-700 mb-6">
            FunctionPersonaDNA is the revolutionary system that translates your CorePersonaDNA 
            into function-specific content strategies. It ensures that every department in your 
            organization communicates with the founder's authentic voice while addressing the 
            unique needs of each functional area.
          </p>
          
          {/* Visual Representation */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-center">The Translation Process</h3>
            <div className="flex items-center justify-center space-x-4">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-4xl">🧬</span>
                </div>
                <p className="mt-2 font-semibold">CorePersonaDNA</p>
              </div>
              <div className="text-4xl">→</div>
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-4xl">🔄</span>
                </div>
                <p className="mt-2 font-semibold">AI Translation</p>
              </div>
              <div className="text-4xl">→</div>
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-pink-500 to-orange-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-4xl">🎯</span>
                </div>
                <p className="mt-2 font-semibold">6 Function DNAs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hub Selection */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold mb-6">Explore Each FunctionPersonaDNA</h3>
          <div className="grid md:grid-cols-6 gap-4 mb-8">
            {hubs.map((hub) => (
              <button
                key={hub.id}
                onClick={() => setSelectedHub(hub.id)}
                className={`p-4 rounded-lg transition transform hover:scale-105 ${
                  selectedHub === hub.id
                    ? 'bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <div className="text-3xl mb-2">{hub.icon}</div>
                <div className="font-semibold">{hub.name}</div>
              </button>
            ))}
          </div>

          {/* Selected Hub Details */}
          {selectedHubData && (
            <div className="space-y-6">
              <div className="border-l-4 pl-6" style={{ borderColor: selectedHubData.color }}>
                <h4 className="text-2xl font-bold mb-2" style={{ color: selectedHubData.color }}>
                  {selectedHubData.name}: {selectedHubData.description}
                </h4>
                <p className="text-gray-700 text-lg">
                  {selectedHubData.dnaAdaptation}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h5 className="font-bold text-lg mb-4">Key Benefits</h5>
                  <ul className="space-y-2">
                    {selectedHubData.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h5 className="font-bold text-lg mb-4">Traditional vs FunctionDNA</h5>
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold text-red-600">Traditional Approach:</p>
                      <p className="text-gray-600">{selectedHubData.comparison.traditional}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-green-600">FunctionDNA Approach:</p>
                      <p className="text-gray-600">{selectedHubData.comparison.functionDNA}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Impact Metrics */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold mb-6">Measurable Impact of FunctionPersonaDNA</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-600 mb-2">94%</div>
              <p className="text-gray-600">Average DNA alignment score across all content</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-pink-600 mb-2">87%</div>
              <p className="text-gray-600">Reduction in content revision cycles</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-orange-600 mb-2">3.2x</div>
              <p className="text-gray-600">Increase in content production speed</p>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold mb-6">Real-World Applications</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-6">
              <h4 className="font-bold text-lg mb-3">Scenario 1: New Product Launch</h4>
              <p className="text-gray-600 mb-4">
                A tech startup needs to create launch materials across all departments.
              </p>
              <div className="space-y-2 text-sm">
                <p><strong>HRHub:</strong> Hiring announcements for new team</p>
                <p><strong>TechHub:</strong> Technical documentation</p>
                <p><strong>SalesHub:</strong> Sales enablement materials</p>
                <p><strong>MarketingHub:</strong> Launch campaign content</p>
              </div>
              <p className="mt-4 text-green-600 font-semibold">
                Result: All content reflects founder's vision consistently
              </p>
            </div>

            <div className="border rounded-lg p-6">
              <h4 className="font-bold text-lg mb-3">Scenario 2: Crisis Communication</h4>
              <p className="text-gray-600 mb-4">
                A company needs to address a significant challenge transparently.
              </p>
              <div className="space-y-2 text-sm">
                <p><strong>OmniHub:</strong> Company-wide announcement</p>
                <p><strong>HRHub:</strong> Internal team communication</p>
                <p><strong>FinHub:</strong> Investor update</p>
                <p><strong>MarketingHub:</strong> Public statement</p>
              </div>
              <p className="mt-4 text-green-600 font-semibold">
                Result: Unified voice maintains trust and credibility
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-700 text-white py-16 mt-12">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Transform Every Function with Your DNA</h2>
          <p className="text-xl mb-8">Experience the power of unified organizational communication</p>
          <div className="space-x-4">
            <button
              onClick={() => router.push('/video-assessment')}
              className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition"
            >
              Start Assessment
            </button>
            <button
              onClick={() => router.push('/platform')}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-purple-600 transition"
            >
              See Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}