'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DeepNeuralAssessmentPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">
              Deep Neural Assessment (DNA)
            </h1>
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">
            Understanding Deep Neural Assessment
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            A revolutionary AI-powered system that decodes leadership communication patterns 
            to create authentic organizational content
          </p>
        </div>

        {/* Important Clarification */}
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mb-12 max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold mb-3 text-yellow-800 flex items-center">
            <span className="text-2xl mr-2">⚠️</span>
            Important Clarification
          </h3>
          <p className="text-gray-700">
            <strong>Deep Neural Assessment (DNA)</strong> is an AI-powered organizational assessment technology. 
            It has <strong>NO connection</strong> to:
          </p>
          <ul className="mt-3 space-y-1 ml-6">
            <li>❌ Biological or genetic DNA</li>
            <li>❌ Healthcare or medical testing</li>
            <li>❌ Genetic analysis or sequencing</li>
            <li>❌ Any form of biological assessment</li>
          </ul>
          <p className="mt-3 text-gray-700">
            We use "DNA" as an acronym for "Deep Neural Assessment" - a purely AI-based 
            analysis of communication, behaviour and leadership patterns of organisational founders only.
          </p>
        </div>

        {/* What is DNA Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h3 className="text-2xl font-bold mb-6">The Science Behind Deep Neural Assessment</h3>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <h4 className="text-xl font-semibold mb-3 text-blue-800">DEEP</h4>
              <p className="text-gray-700">
                Multi-layered analysis that goes beyond surface-level personality traits to understand 
                core behavioral patterns and decision-making frameworks
              </p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <h4 className="text-xl font-semibold mb-3 text-purple-800">NEURAL</h4>
              <p className="text-gray-700">
                Advanced AI neural networks process Voice / Text interviews to identify patterns in 
                communication style, emotional expression, and leadership approach
              </p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <h4 className="text-xl font-semibold mb-3 text-green-800">ASSESSMENT</h4>
              <p className="text-gray-700">
                Comprehensive evaluation across multiple dimensions including leadership style, 
                communication preferences, and organizational values
              </p>
            </div>
          </div>

          <p className="text-lg text-gray-700">
            By combining these three elements, we create a unique "organizational DNA" - a profile 
            that captures how a leader thinks, communicates, and makes decisions. This profile then 
            guides all AI-generated content to ensure it authentically represents the leader's voice.
          </p>
        </div>

        {/* How It Works */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-8 text-center">The Deep Neural Assessment Process</h3>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Video-Based Behavioral Capture</h4>
                <p className="text-gray-700">
                  Through structured Voice / Text interviews, we capture natural communication patterns, 
                  leadership expressions, and decision-making approaches. No questionnaires or 
                  self-reporting - just authentic conversation.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Neural Network Analysis</h4>
                <p className="text-gray-700">
                  Our AI analyzes multiple data points: speech patterns, word choice, emotional tone, 
                  pacing, emphasis, and hundreds of other linguistic and behavioral markers to build 
                  a comprehensive profile.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">DNA Profile Creation</h4>
                <p className="text-gray-700">
                  The result is a unique Deep Neural Assessment profile that captures leadership style, 
                  communication preferences, core values, and decision-making patterns - your 
                  organizational DNA.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Content Generation</h4>
                <p className="text-gray-700">
                  Every piece of content is then generated using this DNA profile, ensuring it sounds 
                  exactly like the leader would read / write / speak it - maintaining authentic voice across all 
                  organizational communication.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Organizational Benefits */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 mb-12">
          <h3 className="text-2xl font-bold mb-6">Organizational Benefits of Deep Neural Assessment</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold mb-3">For Leadership</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Scale authentic communication without losing personal touch</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Maintain consistent voice across all channels</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Save 15+ hours weekly on content creation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Ensure values alignment in all communications</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-3">For Organizations</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Create unified brand voice across departments</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Reduce content creation costs by 90%</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Eliminate revision cycles and rewrites</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Build stronger stakeholder connections</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h3>
          
          <div className="space-y-4 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 shadow">
              <h4 className="font-semibold mb-2">Is this related to genetic or intrusive biological DNA testing?</h4>
              <p className="text-gray-700">
                No, absolutely not. Deep Neural Assessment (DNA) is purely an AI-based analysis of 
                communication patterns. It has no connection to any intrusive biological DNA, genetics, or healthcare.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow">
              <h4 className="font-semibold mb-2">How is this different from personality tests?</h4>
              <p className="text-gray-700">
                Unlike traditional personality tests that rely on self-reporting, DNA uses AI to 
                analyze actual behavior through Voice / Text interviews, capturing authentic patterns rather 
                than perceived traits.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow">
              <h4 className="font-semibold mb-2">Is my data secure?</h4>
              <p className="text-gray-700">
                Yes, all Voice / Text assessments are encrypted and processed securely. We never share your 
                DNA profile or assessment data with third parties. We share the final CorePersonaDNA report only to the founders of the organisation.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow">
              <h4 className="font-semibold mb-2">Can my DNA profile change over time?</h4>
              <p className="text-gray-700">
                While core patterns remain stable, your DNA profile can evolve as your leadership 
                style develops. We recommend periodic reassessments to capture growth and changes.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-6">Ready to Discover Your Organizational DNA?</h3>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => router.push('/assessment-tool')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transform hover:-translate-y-1 transition"
            >
              Start Your Assessment
            </button>
            <button
              onClick={() => router.push('/corepersonadna')}
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition"
            >
              Learn About CorePersonaDNA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}