import { NextRequest, NextResponse } from 'next/server'


export async function middleware(request: NextRequest) {
  if(request.cookies.has('access_token')) {
    console.log('has cookies')
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: [
    '/login/:path*',
    '/signup/:path*',
    '/landing/:path*',
  ],
}
