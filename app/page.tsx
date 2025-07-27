'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="text-2xl font-bold">
          <span className="text-blue-600">Start</span>
          <span className="text-gray-700">Hub</span>
          <span className="ml-2 text-orange-500">Media</span>
          <span className="ml-2 text-green-500">AI</span>
        </div>
        <div className="space-x-6">
          <button className="text-gray-700 hover:text-gray-900 transition">Features</button>
          <button className="text-gray-700 hover:text-gray-900 transition">Pricing</button>
          <button 
            onClick={() => router.push('/auth/login')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section - UPDATED */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-6xl font-bold mb-6">
          <span className="text-blue-600">Core</span>
          <span className="text-orange-500">Persona</span>
          <span className="text-green-500">DNA</span>
          <span className="text-gray-400 text-3xl align-super">™</span>
        </h1>
        
        <h2 className="text-2xl font-medium text-gray-700 mb-4">
          Deep Neural Assessment for Organizational Excellence
        </h2>
        
        <h3 className="text-4xl font-semibold text-gray-800 mb-8">
          The Inside-Out Content Revolution
        </h3>
        
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
          Transform your organization's content with AI that understands your founder's DNA 
          (Deep Neural Assessment) - a comprehensive leadership profiling system that captures 
          communication patterns, decision-making styles, and core values.
        </p>

        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-12 italic">
          Note: This is an AI-powered organizational assessment tool. 
          It has no connection to biological/healthcare DNA or genetic testing.
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => router.push('/assessment-selection')}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Start Your Deep Neural Assessment
          </button>
          
          <button
            onClick={() => router.push('/platform')}
            className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition"
          >
            Watch Demo
          </button>
        </div>

        {/* New Links Section */}
        <div className="mt-8 flex justify-center space-x-6">
          <Link 
            href="/deep-neural-assessment" 
            className="text-purple-600 hover:underline font-medium"
          >
            What is Deep Neural Assessment? →
          </Link>
          <Link 
            href="/corepersonadna" 
            className="text-blue-600 hover:underline font-medium"
          >
            Learn about CorePersonaDNA™ →
          </Link>
          <Link 
            href="/functionpersonadna" 
            className="text-purple-600 hover:underline font-medium"
          >
            Explore FunctionPersonaDNA →
          </Link>
        </div>
      </section>

      {/* New Section: Deep Neural Assessment Explanation */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            What is DNA (Deep Neural Assessment)?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-blue-600">
                Deep Neural Assessment Explained
              </h3>
              <p className="text-lg text-gray-700 mb-4">
                Our proprietary Deep Neural Assessment (DNA) technology uses advanced AI to analyze 
                leadership communication patterns through video interviews. Unlike simple personality 
                tests, DNA creates a multi-dimensional profile of how leaders think, communicate, 
                and make decisions.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 text-xl">✓</span>
                  <span><strong>Deep:</strong> Goes beyond surface-level traits to understand core patterns</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 text-xl">✓</span>
                  <span><strong>Neural:</strong> Uses AI neural networks to analyze communication</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 text-xl">✓</span>
                  <span><strong>Assessment:</strong> Comprehensive evaluation across multiple dimensions</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8">
              <h4 className="text-xl font-semibold mb-4 text-purple-800">
                Why "DNA" for Organizations?
              </h4>
              <p className="text-gray-700 mb-4">
                Just as biological DNA contains the blueprint for physical traits, organizational 
                DNA (Deep Neural Assessment) contains the blueprint for leadership communication:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Unique:</strong> Every leader has a distinct profile</li>
                <li>• <strong>Consistent:</strong> Core patterns remain stable over time</li>
                <li>• <strong>Foundational:</strong> Influences all organizational communication</li>
                <li>• <strong>Hereditary:</strong> Can be passed to teams and content</li>
              </ul>
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  <strong>Important:</strong> This is an organizational assessment tool using AI technology. 
                  It does not involve any biological testing, genetic analysis, or healthcare applications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Updated */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">How Deep Neural Assessment Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎥</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Video Assessment</h3>
              <p className="text-gray-600">Complete AI-guided interviews that capture your natural communication style</p>
              <Link href="/corepersonadna" className="text-blue-600 text-sm hover:underline mt-2 inline-block">
                Learn more about assessment →
              </Link>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🧠</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Neural Analysis</h3>
              <p className="text-gray-600">AI neural networks analyze patterns in speech, tone, and decision-making</p>
              <Link href="/deep-neural-assessment" className="text-orange-600 text-sm hover:underline mt-2 inline-block">
                Explore the science →
              </Link>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">3. DNA-Aligned Content</h3>
              <p className="text-gray-600">Generate content that matches your unique leadership DNA profile</p>
              <Link href="/functionpersonadna" className="text-green-600 text-sm hover:underline mt-2 inline-block">
                See how it works →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid - Keep existing but update language */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Revolutionary Features</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
              <div className="text-2xl mb-3">🧠</div>
              <h3 className="text-lg font-semibold mb-2">Neural AI Technology</h3>
              <p className="text-gray-600">Advanced neural networks analyze your leadership patterns</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
              <div className="text-2xl mb-3">🔒</div>
              <h3 className="text-lg font-semibold mb-2">DNA-Locked Content</h3>
              <p className="text-gray-600">Content strictly aligned with your Deep Neural Assessment profile</p>
              <Link href="/corepersonadna#comparison" className="text-blue-600 text-sm hover:underline mt-2 inline-block">
                Compare with others →
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
              <div className="text-2xl mb-3">🎯</div>
              <h3 className="text-lg font-semibold mb-2">6 Functional Hubs</h3>
              <p className="text-gray-600">HR, Finance, Tech, Sales, Marketing, and Omni-channel content</p>
              <Link href="/functionpersonadna" className="text-purple-600 text-sm hover:underline mt-2 inline-block">
                Explore all hubs →
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
              <div className="text-2xl mb-3">💰</div>
              <h3 className="text-lg font-semibold mb-2">90% Cost Savings</h3>
              <p className="text-gray-600">Dramatic cost reduction compared to traditional agencies</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
              <div className="text-2xl mb-3">🚀</div>
              <h3 className="text-lg font-semibold mb-2">Instant Generation</h3>
              <p className="text-gray-600">Get professional content in seconds, not days</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
              <div className="text-2xl mb-3">📊</div>
              <h3 className="text-lg font-semibold mb-2">Behavioral Analysis</h3>
              <p className="text-gray-600">Multi-session assessment captures authentic leadership patterns</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-4">Ready to Discover Your Organizational DNA?</h2>
          <p className="text-xl mb-8">Join the revolution of Deep Neural Assessment-based organizational communication</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => router.push('/assessment-selection')}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transform hover:-translate-y-1 transition"
            >
              Start Deep Neural Assessment
            </button>
            <button
              onClick={() => router.push('/deep-neural-assessment')}
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="mb-4">© 2025 StartHub Media AI Pvt. Ltd. All rights reserved.</p>
          <p className="text-gray-400">Revolutionizing organizational content with Deep Neural Assessment (DNA)™</p>
        </div>
      </footer>
    </main>
  );
}