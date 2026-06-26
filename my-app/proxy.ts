import { NextRequest, NextResponse } from 'next/server'

export function proxy(req: NextRequest) {
  // session cookie and current url
  const session = req.cookies.get('better-auth.session_token')
  const pathname = req.nextUrl.pathname

  // here we check if the user has a session cookie and if they are in either the login or register page, and if they are we redirect them to the dashboard
  if (session && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }
  // if the user tries to visit the dashboard without a session cookie, we redirect them to the login page
  if (!session && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
  return NextResponse.next()
}

// this is the config for the proxy, it is responsible for when the proxy is triggered
export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
}
