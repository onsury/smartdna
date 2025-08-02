
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check, Star, HelpCircle } from 'lucide-react';

// Use environment variable or fallback to direct URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://smart-deep-neural-assessment-dna.onrender.com';

export default function AssessmentSelection() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    founderName: '',
    companyName: '',
    email: '',
    phone: ''
  });
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Store form data in sessionStorage
    sessionStorage.setItem('assessmentData', JSON.stringify(formData));
    
    // Redirect to assessment tool with query params
    const params = new URLSearchParams({
      name: formData.founderName,
      company: formData.companyName,
      email: formData.email,
      phone: formData.phone
    });
    
    // Redirect to the backend assessment tool
    window.location.href = `${API_URL}?${params.toString()}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const faqs = [
    {
      question: "What is CorePersonaDNA™ assessment?",
      answer: "CorePersonaDNA™ is an AI-powered deep neural assessment that analyzes your leadership patterns, decision-making style, and organizational alignment through a 30-minute voice interview."
    },
    {
      question: "How long does the assessment take?",
      answer: "The assessment takes 30 minutes for the interview. You'll receive a preliminary report within 24 hours."
    },
    {
      question: "Can I take the assessment in my regional language?",
      answer: "Yes! While voice recording is currently in English, you can type your responses in Hindi, Tamil, Telugu, Bengali, Gujarati, Kannada, Malayalam, Marathi, Punjabi, or any Indian language."
    },
    {
      question: "What's included in the Deep Assessment?",
      answer: "The Deep Assessment includes 5 rounds of analysis, complete organizational blueprint, 6 specialized hub recommendations, team composition analysis, and 90-day implementation roadmap."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we use enterprise-grade encryption and your data is processed through secure AI models. We never share your information with third parties."
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
            CorePersonaDNA™ Assessment Options
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Form Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 border-t-4 border-gradient-to-r from-blue-500 via-purple-500 to-green-500">
          <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Start Your Assessment Journey
          </h2>
          <p className="text-gray-600 mb-6">Fill in your details to begin the transformative assessment</p>
          
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Founder Name / संस्थापक का नाम
              </label>
              <input
                type="text"
                name="founderName"
                required
                value={formData.founderName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name / कंपनी का नाम
              </label>
              <input
                type="text"
                name="companyName"
                required
                value={formData.companyName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email / ईमेल
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone / फ़ोन
              </label>
              <input
                type="tel"
                name="phone"
                required
                pattern="[0-9]{10}"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="md:col-span-2">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">🌟 Language Support:</span> Voice recording in English | Text input in Hindi, Tamil, Telugu, Bengali, Gujarati, Kannada, Malayalam, Marathi, Punjabi, or any Indian language!
                </p>
              </div>
              
              {/* Loading Message for Render Free Tier */}
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-4">
                <p className="text-sm text-yellow-800">
                  <span className="font-semibold">⏳ Note:</span> The assessment tool may take 30-60 seconds to load on first access. Please be patient.
                </p>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-shadow"
              >
                Start Your Assessment Journey →
              </button>
            </div>
          </form>
        </div>

        {/* Pricing Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Choose Your Assessment Depth</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Express Assessment */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-8">
              <h3 className="text-xl font-bold mb-4">Express Assessment</h3>
              <div className="text-3xl font-bold mb-4 text-blue-600">₹35,000</div>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>30-minute voice/text assessment</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>Basic personality insights</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>Leadership style analysis</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>Key recommendations</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>24-hour delivery</span>
                </div>
              </div>
              
              <button className="w-full py-3 px-6 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Select Express
              </button>
            </div>

            {/* Deep Assessment */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-8 relative">
              <div className="absolute -top-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                <Star className="w-4 h-4 mr-1" />
                Popular
              </div>
              
              <h3 className="text-xl font-bold mb-4">Deep Assessment</h3>
              <div className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">₹75,000</div>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>Everything in Express, plus:</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>5-round deep analysis</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>Complete organizational blueprint</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>6 Hub recommendations</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>Team composition analysis</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>90-day implementation roadmap</span>
                </div>
              </div>
              
              <button className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow">
                Select Deep Assessment
              </button>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-semibold mb-2">Take Assessment</h3>
              <p className="text-gray-600">30-minute voice interview in English or type in any Indian language</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="font-semibold mb-2">AI Analysis</h3>
              <p className="text-gray-600">Our 6 AI models analyze your responses for deep insights</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="font-semibold mb-2">Get Report</h3>
              <p className="text-gray-600">Receive comprehensive report with actionable recommendations</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          
          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <span className="font-medium">{faq.question}</span>
                  <HelpCircle className={`w-5 h-5 text-gray-400 transform transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {expandedFaq === index && (
                  <div className="px-6 py-4 border-t border-gray-200">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}