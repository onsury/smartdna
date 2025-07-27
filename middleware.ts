import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // Skip all authentication for now
  return NextResponse.next();
}

export const config = {
  matcher: ['/platform/:path*', '/dashboard/:path*', '/assessment/:path*'],
};