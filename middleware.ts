import { NextRequest, NextResponse } from 'next/server'


export async function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;


  if (url.startsWith('/my_info_edit')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (url === "/") {
    return NextResponse.redirect(new URL('/matching', request.url));
  }

  if (url.startsWith('/login') || url.startsWith('/signup')) {
    if (request.cookies.has('access_token')) {
      return NextResponse.redirect(new URL('/', request.url));
    } else {
      return;
    }
  }

  if (url.startsWith('/agreement') || url.startsWith('/application') || url.startsWith('/etc') || url.startsWith('/leave') || url.startsWith('/matching') || url.startsWith('/my_info') || url.startsWith('/promotion')) {
    if (request.cookies.has('access_token')) {
      return;
    } else {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
}
