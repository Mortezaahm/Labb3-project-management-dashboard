import { NextRequest, NextResponse } from 'next/server'


export function proxy(req: NextRequest) {
  const session = req.cookies.get('better-auth.session_token')
  if (!session) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
