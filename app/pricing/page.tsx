'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check, Star, HelpCircle, ArrowRight } from 'lucide-react';

export default function PricingPage() {
  const router = useRouter();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<'express' | 'deep' | null>(null);

  const handleSelectPlan = (plan: 'express' | 'deep') => {
    setSelectedPlan(plan);
    // Store selected plan in sessionStorage
    sessionStorage.setItem('selectedPlan', plan);
    // Redirect to assessment tool
    router.push('/assessment-tool');
  };

  const faqs = [
    {
      question: "What is CorePersonaDNA™ assessment?",
      answer: "CorePersonaDNA™ is an AI-powered deep neural assessment that analyzes your leadership patterns, decision-making style, and organizational alignment through voice or text input in multiple Indian languages."
    },
    {
      question: "How long does the assessment take?",
      answer: "The assessment takes approximately 5-10 minutes for the initial voice/text input. You'll receive a comprehensive AI-generated report immediately after completion."
    },
    {
      question: "Can I take the assessment in my regional language?",
      answer: "Yes! You can take the assessment in English, Hindi, Tamil, Telugu, Bengali, Gujarati, Kannada, Malayalam, Marathi, Punjabi, or any Indian language. Both voice and text inputs are supported."
    },
    {
      question: "What's included in the Deep Assessment?",
      answer: "The Deep Assessment includes 5 rounds of analysis, complete organizational blueprint, 6 specialized hub recommendations, team composition analysis, and 90-day implementation roadmap."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we use enterprise-grade encryption and your data is processed through secure AI models. We never share your information with third parties."
    },
    {
      question: "How is this different from traditional assessments?",
      answer: "Our AI-powered assessment uses advanced language models to provide deeper insights, cultural context understanding, and personalized recommendations that traditional assessments miss."
    },
    {
      question: "Can I get a sample report?",
      answer: "Yes! Contact our team at support@starthubmedia.ai for a sample report or schedule a demo session."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit/debit cards, net banking, UPI, and international payments. Enterprise clients can request invoice-based billing."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold mt-4 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
            Pricing & Plans
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Choose Your Assessment Journey</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unlock deep insights into your organizational DNA with our AI-powered assessment platform
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {/* Express Assessment */}
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-8 relative">
            <h3 className="text-2xl font-bold mb-4">Express Assessment</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-blue-600">₹25,000</span>
              <span className="text-gray-600 ml-2">one-time</span>
            </div>
            
            <div className="space-y-3 mb-8">
              <div className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>5-minute voice/text assessment in any Indian language</span>
              </div>
              <div className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>AI-powered personality insights</span>
              </div>
              <div className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>Leadership style analysis</span>
              </div>
              <div className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>Core strengths & improvement areas</span>
              </div>
              <div className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>Instant report generation</span>
              </div>
            </div>
            
            <button 
              onClick={() => handleSelectPlan('express')}
              className="w-full py-3 px-6 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center"
            >
              Select Express
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>

          {/* Deep Assessment */}
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-8 relative border-2 border-purple-200">
            <div className="absolute -top-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center">
              <Star className="w-4 h-4 mr-1" />
              Most Popular
            </div>
            
            <h3 className="text-2xl font-bold mb-4">Deep Assessment</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">₹50,000</span>
              <span className="text-gray-600 ml-2">one-time</span>
            </div>
            
            <div className="space-y-3 mb-8">
              <div className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="font-semibold">Everything in Express, plus:</span>
              </div>
              <div className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>Multi-dimensional personality analysis</span>
              </div>
              <div className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>Complete organizational DNA blueprint</span>
              </div>
              <div className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>6 Hub recommendations for growth</span>
              </div>
              <div className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>Team composition & hiring insights</span>
              </div>
              <div className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>90-day implementation roadmap</span>
              </div>
              <div className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>Priority support & consultation</span>
              </div>
            </div>
            
            <button 
              onClick={() => handleSelectPlan('deep')}
              className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow flex items-center justify-center"
            >
              Select Deep Assessment
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>

        {/* Try Now CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-12 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Your Assessment?</h3>
          <p className="text-lg mb-6 opacity-90">
            Experience the power of AI-driven organizational insights
          </p>
          <Link 
            href="/assessment-tool"
            className="inline-flex items-center bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow"
          >
            Try Assessment Now
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-semibold mb-2">Choose Plan</h3>
              <p className="text-gray-600 text-sm">Select the assessment depth that fits your needs</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="font-semibold mb-2">Take Assessment</h3>
              <p className="text-gray-600 text-sm">5-10 minute voice or text input in any language</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="font-semibold mb-2">AI Analysis</h3>
              <p className="text-gray-600 text-sm">Our multi-LLM system analyzes your responses</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="font-semibold mb-2">Get Insights</h3>
              <p className="text-gray-600 text-sm">Receive comprehensive report instantly</p>
            </div>
          </div>
        </div>

        {/* Language Support Banner */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-12 border border-blue-200">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-3">🌟 Multi-Language Support</h3>
            <p className="text-gray-700 mb-4">
              Take the assessment in your preferred language
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {['English', 'हिंदी', 'தமிழ்', 'తెలుగు', 'বাংলা', 'ગુજરાતી', 'ಕನ್ನಡ', 'മലയാളം', 'मराठी', 'ਪੰਜਾਬੀ'].map((lang) => (
                <span key={lang} className="px-3 py-1 bg-white rounded-full text-sm font-medium shadow-sm">
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          
          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <span className="font-medium pr-4">{faq.question}</span>
                  <HelpCircle className={`w-5 h-5 text-gray-400 transform transition-transform flex-shrink-0 ${expandedFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {expandedFaq === index && (
                  <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Have more questions? Need enterprise pricing?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:support@starthubmedia.ai" 
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Email: support@starthubmedia.ai
            </a>
            <a 
              href="tel:+919876543210" 
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Call: +91 98765 43210
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}