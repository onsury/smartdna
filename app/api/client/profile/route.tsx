import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { supabase } from '@/lib/supabase';

export async function GET() {
  const session = await getServerSession();
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Get client profile with industry details
  const { data: profile } = await supabase
    .from('client_profiles')
    .select('*')
    .eq('user_id', session.user.id)
    .single();
  
  // Map industry codes to display names
  const industryDisplayNames = {
    'manufacturing': 'Manufacturing',
    'automotive': 'Automotive',
    'pharmaceutical': 'Pharmaceutical & Healthcare',
    'aerospace': 'Aerospace & Defense',
    'construction': 'Construction & Infrastructure',
    'energy': 'Energy & Utilities',
    'medical-devices': 'Medical Devices',
    'electronics': 'Electronics & Semiconductors',
    'software': 'Software & Technology',
    'retail': 'Retail',
    'e-commerce': 'E-commerce',
    'services': 'Professional Services',
    'b2b': 'B2B Enterprise',
    'regulated': 'Regulated Industries',
    'startup': 'Startup',
    'enterprise': 'Enterprise'
  };
  
  return NextResponse.json({
    ...profile,
    industryDisplay: industryDisplayNames[profile.industry] || profile.industry,
    relevantHubs: getRelevantHubs(profile.industry, profile.businessType)
  });
}

function getRelevantHubs(industry: string, businessType: string) {
  // Determine which hubs are most relevant
  const hubRelevance = {
    'manufacturing': ['TechHub', 'OmniHub', 'HRHub'],
    'retail': ['OmniHub', 'MarketingHub', 'SalesHub'],
    'software': ['TechHub', 'MarketingHub', 'SalesHub'],
    'services': ['OmniHub', 'SalesHub', 'HRHub']
  };
  
  return hubRelevance[industry] || ['OmniHub', 'TechHub', 'MarketingHub'];
}