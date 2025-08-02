import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    return NextResponse.json({
      message: 'Generate API is being rebuilt',
      received: data,
      status: 'mock'
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Generate API error' },
      { status: 500 }
    );
  }
}
