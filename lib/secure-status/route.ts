import { NextResponse } from 'next/server';
import { claudeMaster } from '@/lib/claude-master';

export async function GET(request: Request) {
  // Check authorization
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.API_ENCRYPTION_KEY}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const status = {
    orchestrator: 'Claude Master Active',
    apis: claudeMaster.getActiveAPIs(),
    dailyLimit: `₹${process.env.DAILY_LIMIT_INR}`,
    security: 'All keys masked',
    mode: process.env.NODE_ENV
  };
  
  return NextResponse.json(status);
}