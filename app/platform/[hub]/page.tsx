'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

const hubDetails = {
  hrhub: {
    name: 'HRHub',
    icon: '👥',
    color: '#6366F1',
    description: 'Human Resources & Talent Management',
    templates: [
      { id: 'job_description', name: 'Job Description', icon: '📋' },
      { id: 'interview_questions', name: 'Interview Questions', icon: '🎤' },
      { id: 'onboarding_plan', name: 'Onboarding Plan', icon: '🚀' },
      { id: 'performance_review', name: 'Performance Review', icon: '📊' }
    ]
  },
  finhub: {
    name: 'FinHub',
    icon: '💰',
    color: '#F59E0B',
    description: 'Finance & Business Operations',
    templates: [
      { id: 'financial_report', name: 'Financial Report', icon: '📈' },
      { id: 'budget_proposal', name: 'Budget Proposal', icon: '💼' },
      { id: 'invoice_template', name: 'Invoice', icon: '🧾' },
      { id: 'expense_report', name: 'Expense Report', icon: '💳' }
    ]
  },
  techhub: {
    name: 'TechHub',
    icon: '⚙️',
    color: '#10B981',
    description: 'Engineering & Technical Documentation',
    templates: [
      { id: 'technical_doc', name: 'Technical Documentation', icon: '📚' },
      { id: 'sop_document', name: 'Standard Operating Procedure', icon: '📑' },
      { id: 'product_spec', name: 'Product Specification', icon: '🔧' },
      { id: 'test_report', name: 'Test Report', icon: '🧪' }
    ]
  },
  saleshub: {
    name: 'SalesHub',
    icon: '📈',
    color: '#EC4899',
    description: 'Sales Strategy & Revenue Growth',
    templates: [
      { id: 'sales_pitch', name: 'Sales Pitch', icon: '🎯' },
      { id: 'proposal_template', name: 'Business Proposal', icon: '📄' },
      { id: 'cold_email', name: 'Cold Email', icon: '✉️' },
      { id: 'follow_up', name: 'Follow-up Sequence', icon: '📬' }
    ]
  },
  marketinghub: {
    name: 'MarketingHub',
    icon: '🎯',
    color: '#3B82F6',
    description: 'Marketing & Brand Development',
    templates: [
      { id: 'social_media', name: 'Social Media Posts', icon: '📱' },
      { id: 'blog_article', name: 'Blog Article', icon: '✍️' },
      { id: 'email_campaign', name: 'Email Campaign', icon: '📧' },
      { id: 'press_release', name: 'Press Release', icon: '📰' }
    ]
  },
  omnihub: {
    name: 'OmniHub',
    icon: '🔄',
    color: '#8B5CF6',
    description: 'Cross-functional Operations',
    templates: [
      { id: 'company_announcement', name: 'Company Announcement', icon: '📢' },
      { id: 'meeting_agenda', name: 'Meeting Agenda', icon: '📅' },
      { id: 'project_brief', name: 'Project Brief', icon: '📋' },
      { id: 'executive_summary', name: 'Executive Summary', icon: '📊' }
    ]
  }
};

export default function HubPage() {
  const router = useRouter();
  const params = useParams();
  const hub = params.hub as string;
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const currentHub = hubDetails[hub as keyof typeof hubDetails];

  useEffect(() => {
    if (!currentHub) {
      router.push('/platform');
    }
  }, [currentHub, router]);

  if (!currentHub) {
    return null;
  }

  const handleGenerateContent = async () => {
    if (!selectedTemplate && !customPrompt) {
      alert('Please select a template or enter a custom prompt');
      return;
    }

    setIsGenerating(true);
    setGeneratedContent('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hub: hub,
          template: selectedTemplate,
          custom_prompt: customPrompt,
          user_dna: {
            leadership_style: "Visionary Innovator",
            communication_tone: "Inspiring and Forward-thinking",
            core_values: ["Innovation", "Excellence", "Collaboration", "Growth"]
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setGeneratedContent(data.content);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error generating content:', error);
      alert('Failed to generate content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyContent = () => {
    navigator.clipboard.writeText(generatedContent);
    alert('Content copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={() => router.push('/platform')}
              className="mr-4 text-gray-600 hover:text-gray-900"
            >
              ← Back
            </button>
            <h1 className="text-2xl font-bold flex items-center">
              <span className="text-3xl mr-2">{currentHub.icon}</span>
              <span style={{ color: currentHub.color }}>{currentHub.name}</span>
            </h1>
          </div>
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            Home
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Hub Description */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <p className="text-gray-700">{currentHub.description}</p>
        </div>

        {/* Template Selection */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Select a Template</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {currentHub.templates.map((template) => (
              <button
                key={template.id}
                onClick={() => {
                  setSelectedTemplate(template.id);
                  setCustomPrompt('');
                }}
                className={`p-4 rounded-lg border-2 transition ${
                  selectedTemplate === template.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{template.icon}</span>
                  <span className="font-medium">{template.name}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="border-t pt-4">
            <h3 className="font-medium mb-2">Or enter a custom prompt:</h3>
            <textarea
              value={customPrompt}
              onChange={(e) => {
                setCustomPrompt(e.target.value);
                setSelectedTemplate('');
              }}
              placeholder="Describe what content you need..."
              className="w-full p-3 border rounded-lg resize-none"
              rows={3}
            />
          </div>
        </div>

        {/* Generate Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={handleGenerateContent}
            disabled={isGenerating || (!selectedTemplate && !customPrompt)}
            className={`px-8 py-3 rounded-lg font-semibold transition ${
              isGenerating || (!selectedTemplate && !customPrompt)
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-teal-500 text-white hover:shadow-lg transform hover:-translate-y-0.5'
            }`}
          >
            {isGenerating ? (
              <span className="flex items-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Generating...
              </span>
            ) : (
              'Generate Content'
            )}
          </button>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-center">
            ✅ Content generated successfully!
          </div>
        )}

        {/* Generated Content */}
        {generatedContent && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Generated Content</h3>
              <button
                onClick={handleCopyContent}
                className="text-blue-600 hover:text-blue-700 flex items-center"
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </button>
            </div>
            
            <div className="prose max-w-none">
              <div 
                className="whitespace-pre-wrap text-gray-700"
                dangerouslySetInnerHTML={{ __html: generatedContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
              />
            </div>

            {/* Generation Details - No LLM info */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Generation Details:</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500">Generated at:</span>
                  <span className="ml-2 font-medium">{new Date().toLocaleTimeString()}</span>
                </div>
                <div>
                  <span className="text-gray-500">DNA Alignment:</span>
                  <span className="ml-2 font-medium text-green-600">94%</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}