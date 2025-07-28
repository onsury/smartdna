'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Check, Star, MessageSquare, FileText, Sparkles } from 'lucide-react';

export default function AssessmentSelection() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const assessmentPlans = [
    {
      id: 'express',
      name: 'Express Assessment',
      price: '₹35,000',
      duration: '45 minutes',
      description: 'Quick leadership DNA snapshot',
      features: [
        'Single conversational interview',
        'Voice + Text interaction',
        'Core leadership style analysis',
        '20-page insight report',
        'Basic DNA profile',
        '24-hour delivery'
      ],
      icon: <MessageSquare className="w-8 h-8" />,
      popular: false
    },
    {
      id: 'deep',
      name: 'Deep Assessment',
      price: '₹75,000',
      duration: '5 days (30 min/day)',
      description: 'Comprehensive organizational DNA mapping',
      features: [
        'Five focused interview sessions',
        'Voice + Text deep conversations',
        'Complete leadership analysis',
        '40-50 page detailed report',
        'Industry insights & projections',
        'FunctionPersonaDNA mapping',
        'Strategic recommendations'
      ],
      icon: <Sparkles className="w-8 h-8" />,
      popular: true
    }
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    // Navigate to interview chat
    router.push('/interview-chat');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Choose Your <span className="text-blue-600">CorePersonaDNA™</span> Assessment
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover your leadership DNA through AI-powered conversational interviews.
            Our intelligent system adapts to your responses for deep insights.
          </p>
        </div>

        {/* Assessment Plans */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {assessmentPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-xl p-8 ${
                plan.popular ? 'ring-4 ring-blue-500 ring-opacity-50' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                    <Star className="w-4 h-4 mr-1" /> Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  {plan.icon}
                </div>
                <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="text-4xl font-bold text-blue-600 mb-2">{plan.price}</div>
                <p className="text-gray-500">{plan.duration}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSelectPlan(plan.id)}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition ${
                  plan.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Start Assessment
              </button>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-6">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-semibold mb-2">1. Conversational Interview</h4>
              <p className="text-gray-600">
                Engage in natural voice or text conversations with our AI interviewer
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-semibold mb-2">2. AI Analysis</h4>
              <p className="text-gray-600">
                Our multi-LLM system analyzes your responses for deep insights
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-semibold mb-2">3. DNA Report</h4>
              <p className="text-gray-600">
                Receive comprehensive insights about your leadership DNA
              </p>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-12 text-center">
          <Link
            href="/platform"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Platform
          </Link>
        </div>
      </div>
    </div>
  );
}