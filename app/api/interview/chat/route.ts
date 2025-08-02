export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Chat API received:', body);
    
    return Response.json({
      success: true,
      response: "I hear you! Thank you for sharing your vision for StartHub MediaAI. Your focus on capturing authentic leadership DNA is fascinating. Can you tell me more about what specific leadership traits you believe are most important to embed in organizational content?"
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return Response.json(
      { success: false, error: 'Chat API error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return Response.json({ message: 'Chat API ready' });
}
