import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { createClient } = require('@supabase/supabase-js');
    const body = await request.json();
    
    // Create Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    
    // Create client record
    const { data: client, error: clientError } = await supabase
      .from('clients')
      .upsert({
        email: body.email,
        company_name: body.company,
        founder_name: body.name,
        phone: body.phone || null,
        industry: body.industry || 'Technology',
        employee_count: body.employee_count || null
      }, { 
        onConflict: 'email' 
      })
      .select()
      .single();
    
    if (clientError) throw clientError;
    
    // Create assessment
    const { data: assessment, error: assessmentError } = await supabase
      .from('assessments')
      .insert({
        client_id: client.id,
        type: body.type || 'express',
        language: body.language || 'english'
      })
      .select()
      .single();
    
    if (assessmentError) throw assessmentError;
    
    // Create session
    const { data: session, error: sessionError } = await supabase
      .from('interview_sessions')
      .insert({
        assessment_id: assessment.id,
        session_number: 1,
        messages: []
      })
      .select()
      .single();
    
    if (sessionError) throw sessionError;
    
    return NextResponse.json({
      success: true,
      message: 'Interview session created!',
      data: {
        clientId: client.id,
        assessmentId: assessment.id,
        sessionId: session.id
      }
    });
    
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ 
    success: true, 
    message: 'Interview API - Use POST to create a session' 
  });
}
