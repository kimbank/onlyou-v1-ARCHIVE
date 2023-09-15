import { NextRequest, NextResponse } from 'next/server'


export async function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;


  if (url === "/") {
    return NextResponse.redirect(new URL('/matching', request.url));
  }

  // 로그아웃 컨트롤
  if (url.startsWith('/logout')) {
    // 회원토큰이 없다면 로그인&회원가입 페이지로 이동
    if (!request.cookies.has('access_token')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // 회원토큰이 있다면 로그아웃 처리
    const response = NextResponse.next();
    response.cookies.delete('access_token');

    return response;
  }

  // 로그인&회원가입 컨트롤
  if (url.startsWith('/login') || url.startsWith('/signup')) {
    // 회원토큰이 있다면 메인페이지로 이동
    if (request.cookies.has('access_token')) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    // 회원토큰이 없다면 로그인&회원가입 페이지로 이동
    else {
      return;
    }
  }

  // 회원 전용 페이지 컨트롤
  if (url.startsWith('/agreement') || url.startsWith('/application') || url.startsWith('/etc') || url.startsWith('/leave') || url.startsWith('/matching') || url.startsWith('/my_info') || url.startsWith('/promotion')) {
    // 회원 토큰이 정상적이라면 통과
    if (request.cookies.has('access_token')) {
      return;
    }
    // 회원 토큰이 없다면 로그인&회원가입 페이지로 이동
    else {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
}
