import { NextResponse, type NextRequest } from 'next/server'
import { clearAuthCookiesResponse, setAuthCookiesResponse } from '@/utils/auth'
import { apiGetSession } from './api/session'

const LOGIN_PATH = '/login'

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)', { source: '/' }],
}

export const middleware = async (request: NextRequest) => {
  const headers = new Headers(request.headers)
  headers.set('x-current-path', request.nextUrl.pathname)

  if (request.headers.get('next-action') !== null) {
    // Skip middleware if request is part of a Next server action.
    return NextResponse.next()
  }

  const [ok, refresh] = await apiGetSession()

  const isLogin = request.nextUrl.pathname === LOGIN_PATH

  if (ok && isLogin) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (!ok && isLogin) {
    return clearAuthCookiesResponse(NextResponse.next())
  }

  if (!ok) {
    const requestPath = request.nextUrl.pathname

    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = LOGIN_PATH

    if (requestPath !== '/') {
      redirectUrl.searchParams.set('next', requestPath)
    }

    // Request not authenticated; Clear cookies and redirect to login.
    return clearAuthCookiesResponse(NextResponse.redirect(redirectUrl))
  }

  const response = NextResponse.next({ headers })

  if (refresh) {
    setAuthCookiesResponse(response, refresh)
  }

  return response
}
