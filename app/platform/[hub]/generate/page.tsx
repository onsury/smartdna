'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getRelevantContent } from '@/lib/industry-content-mapping';

export default function ContentGenerator() {
  const params = useParams();
  const hub = params.hub as string;
  
  const [contentTypes, setContentTypes] = useState([]);
  const [filteredContentTypes, setFilteredContentTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [parameters, setParameters] = useState({});
  const [generating, setGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [clientProfile, setClientProfile] = useState(null);
  
  useEffect(() => {
    loadClientProfile();
    loadContentTypes();
  }, [hub]);
  
  useEffect(() => {
    if (clientProfile && contentTypes.length > 0) {
      filterContentForClient();
    }
  }, [clientProfile, contentTypes]);
  
  const loadClientProfile = async () => {
    // Load client profile to get industry and type
    const response = await fetch('/api/client/profile');
    const profile = await response.json();
    setClientProfile(profile);
  };
  
  const loadContentTypes = async () => {
    const response = await fetch(`/api/hubs/${hub}/content-types`);
    const types = await response.json();
    setContentTypes(types);
  };
  
  const filterContentForClient = () => {
    if (!clientProfile) return;
    
    // Get relevant content types for this client
    const relevantContentIds = getRelevantContent(
      hub,
      clientProfile.industry,
      clientProfile.businessType
    );
    
    // Filter content types
    const filtered = contentTypes.filter(type => 
      relevantContentIds.includes(type.id)
    );
    
    setFilteredContentTypes(filtered);
  };
  
  const generateContent = async () => {
    setGenerating(true);
    
    const response = await fetch('/api/generate-content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        hub,
        contentType: selectedType,
        parameters,
        clientContext: {
          industry: clientProfile.industry,
          businessType: clientProfile.businessType,
          companySize: clientProfile.companySize
        }
      })
    });
    
    const result = await response.json();
    setGeneratedContent(result);
    setGenerating(false);
  };
  
  const hubInfo = {
    HRHub: { color: 'blue', icon: '👥', title: 'Human Resources Hub' },
    FinHub: { color: 'green', icon: '💰', title: 'Finance Hub' },
    TechHub: { color: 'purple', icon: '💻', title: 'Technology Hub' },
    SalesHub: { color: 'orange', icon: '💼', title: 'Sales Hub' },
    MarketingHub: { color: 'pink', icon: '📢', title: 'Marketing Hub' },
    OmniHub: { color: 'indigo', icon: '🌐', title: 'Omni-Channel Hub' }
  };
  
  const info = hubInfo[hub] || hubInfo.OmniHub;
  
  // Show industry-specific messaging
  const getIndustryMessage = () => {
    if (!clientProfile) return '';
    
    const messages = {
      'manufacturing': 'Technical documentation tailored for manufacturing',
      'automotive': 'Automotive-compliant technical content',
      'pharmaceutical': 'GMP-compliant documentation for pharma',
      'retail': 'Omnichannel content for retail excellence',
      'e-commerce': 'Digital-first content strategies',
      'services': 'Service-oriented content solutions'
    };
    
    return messages[clientProfile.industry] || 'Content tailored for your industry';
  };
  
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`bg-${info.color}-600 text-white p-8 rounded-t-lg`}>
          <h1 className="text-3xl font-bold flex items-center">
            <span className="text-4xl mr-4">{info.icon}</span>
            {info.title}
          </h1>
          <p className="mt-2 opacity-90">
            {getIndustryMessage()}
          </p>
        </div>
        
        {/* Industry Context Badge */}
        {clientProfile && (
          <div className="bg-white px-4 py-2 inline-flex items-center rounded-full shadow-md -mt-4 ml-8 relative z-10">
            <span className="text-sm text-gray-600">Industry:</span>
            <span className="ml-2 font-semibold text-gray-900">
              {clientProfile.industryDisplay}
            </span>
          </div>
        )}
        
        {/* Content Type Selection */}
        <div className="bg-white p-8 shadow-lg">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              Available Content Types for Your Industry
            </h2>
            <p className="text-gray-600">
              Showing {filteredContentTypes.length} relevant content types 
              from {contentTypes.length} total options
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredContentTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`p-4 border rounded-lg text-left transition relative ${
                  selectedType === type.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {/* Relevance indicator */}
                {type.highlyRelevant && (
                  <span className="absolute top-2 right-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                    Recommended
                  </span>
                )}
                
                <h3 className="font-semibold">{type.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                
                {/* Industry-specific note */}
                {type.industryNote && (
                  <p className="text-xs text-blue-600 mt-2">
                    {type.industryNote}
                  </p>
                )}
              </button>
            ))}
          </div>
          
          {/* Show option to view all content types */}
          {filteredContentTypes.length < contentTypes.length && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setFilteredContentTypes(contentTypes)}
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                Show all content types ({contentTypes.length - filteredContentTypes.length} more)
              </button>
            </div>
          )}
        </div>
        
        {/* Rest of the component remains the same... */}
      </div>
    </div>
  );
}