'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase, authHelpers } from '@/lib/supabase';

export default function PlatformDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const currentUser = await authHelpers.getCurrentUser();
    if (!currentUser) {
      // For now, use mock user
      setUser({
        email: 'test@example.com',
        full_name: 'Test User',
        dna_completed: true,
        hub_scores: {
          hrhub: 92,
          finhub: 85,
          techhub: 78,
          saleshub: 88,
          marketinghub: 91,
          omnihub: 86
        }
      });
    } else {
      setUser(currentUser);
    }
    setLoading(false);
  };

  const hubs = [
    {
      id: 'hrhub',
      name: 'HRHub',
      icon: '👥',
      color: '#6366F1',
      description: 'Human Resources & Talent Management',
      templates: 7,
      score: 92
    },
    {
      id: 'finhub',
      name: 'FinHub',
      icon: '💰',
      color: '#F59E0B',
      description: 'Finance & Business Operations',
      templates: 8,
      score: 85
    },
    {
      id: 'techhub',
      name: 'TechHub',
      icon: '⚙️',
      color: '#10B981',
      description: 'Engineering, Manufacturing, Pharma, Heavy Industries',
      templates: 9,
      score: 78
    },
    {
      id: 'saleshub',
      name: 'SalesHub',
      icon: '📈',
      color: '#EC4899',
      description: 'Sales Strategy & Revenue Growth',
      templates: 7,
      score: 88
    },
    {
      id: 'marketinghub',
      name: 'MarketingHub',
      icon: '🎯',
      color: '#3B82F6',
      description: 'Marketing & Brand Development',
      templates: 8,
      score: 91
    },
    {
      id: 'omnihub',
      name: 'OmniHub',
      icon: '🔄',
      color: '#8B5CF6',
      description: 'Cross-functional Operations',
      templates: 6,
      score: 86
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold mr-8">
              <span className="text-blue-600">Smart</span>
              <span className="text-orange-500">DNA</span>
            </Link>
            <h1 className="text-xl font-semibold text-gray-800">Content Platform</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, {user?.full_name || 'User'}</span>
            <button 
              onClick={() => router.push('/auth/login')}
              className="text-gray-500 hover:text-gray-700"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* DNA Info Section - NEW */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8 shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Your DNA-Powered Content Platform</h3>
          <p className="text-gray-700 mb-4">
            Every piece of content generated here is aligned with your unique CorePersonaDNA™ profile. 
            Your leadership style, communication patterns, and core values are embedded in every output.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/corepersonadna" 
              className="text-blue-600 hover:underline font-medium"
            >
              Learn about your DNA Profile →
            </Link>
            <Link 
              href="/functionpersonadna" 
              className="text-purple-600 hover:underline font-medium"
            >
              See how it powers each hub →
            </Link>
            <Link 
              href="/video-assessment" 
              className="text-green-600 hover:underline font-medium"
            >
              Update your assessment →
            </Link>
          </div>
        </div>

        {/* DNA Status Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Your CorePersonaDNA Status</h2>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
              Active
            </span>
          </div>
          
          {user?.dna_completed ? (
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-600">Leadership Style</p>
                <p className="text-lg font-semibold">Visionary Innovator</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Communication Tone</p>
                <p className="text-lg font-semibold">Inspiring & Forward-thinking</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Core Values</p>
                <p className="text-lg font-semibold">Innovation, Excellence, Growth</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">Complete your CorePersonaDNA assessment to unlock personalized content</p>
              <button 
                onClick={() => router.push('/video-assessment')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Start Assessment
              </button>
            </div>
          )}
        </div>

        {/* Content Hubs Grid */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Your Content Hubs</h2>
            <Link 
              href="/functionpersonadna" 
              className="text-sm text-purple-600 hover:underline"
            >
              How FunctionPersonaDNA works →
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hubs.map((hub) => (
              <div key={hub.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <span className="text-4xl mr-3">{hub.icon}</span>
                      <div>
                        <h3 className="text-xl font-bold" style={{ color: hub.color }}>{hub.name}</h3>
                        <p className="text-sm text-gray-600">{hub.templates} templates</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">DNA Alignment</p>
                      <p className="text-2xl font-bold" style={{ color: hub.color }}>{hub.score}%</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 text-sm">{hub.description}</p>
                  
                  <button
                    onClick={() => router.push(`/platform/${hub.id}`)}
                    className="w-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 py-2 rounded-lg hover:from-gray-200 hover:to-gray-300 transition"
                  >
                    Generate {hub.name.replace('Hub', '')} Content
                  </button>
                  
                  <Link 
                    href={`/functionpersonadna#${hub.id}`}
                    className="text-blue-600 text-sm mt-2 block text-center hover:underline"
                  >
                    Learn how your DNA powers this hub →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">Your Content Analytics</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">156</p>
              <p className="text-sm text-gray-600">Contents Generated</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">94%</p>
              <p className="text-sm text-gray-600">Avg DNA Alignment</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">₹4,280</p>
              <p className="text-sm text-gray-600">Saved This Month</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-600">2.3s</p>
              <p className="text-sm text-gray-600">Avg Generation Time</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}