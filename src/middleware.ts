import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  
  const sessionId = request.cookies.get('sessionId')?.value;
  const userRole = request.cookies.get('userRole')?.value;

 
  const publicRoutes = ['/login', '/api/auth/login', '/register'];

  
  if (!sessionId && !publicRoutes.includes(pathname)) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

 
  if (sessionId && pathname === '/login') {
    const homeUrl = new URL('/', request.url);
    return NextResponse.redirect(homeUrl);
  }

  // Puedes restringir rutas según roles si quieres (opcional)
  // if (pathname.startsWith('/admin') && userRole !== 'admin') {
  //   return NextResponse.redirect(new URL('/', request.url));
  // }

  return NextResponse.next();
}

export const config = {

  matcher: ['/((?!_next|static|favicon.ico|api).*)'],
};
