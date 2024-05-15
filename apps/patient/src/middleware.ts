import { NextResponse, type NextRequest } from 'next/server'
import {
  clearAuthCookiesResponse,
  getAuthCookies,
  getSession,
  setAuthCookiesResponse,
} from '@psychplus-v2/auth'
import { API_URL } from '@psychplus-v2/env'
import { createHeaders } from '@psychplus-v2/headers'

export const config = {
  matcher: '/((?!.*\\.).*)',
}

const REQUIRES_ANON = ['/login', '/forgot-password', '/signup']

export const middleware = async (request: NextRequest) => {
  if (request.nextUrl.pathname.startsWith('/foo')) {
    return new NextResponse('foo')
  }
  if (request.nextUrl.pathname.startsWith('/widgets')) {
    // Skip middleware for widget requests.
    return NextResponse.next()
  }
  if (request.headers.get('next-action') !== null) {
    // Skip middleware if request is part of a Next server action.
    return NextResponse.next()
  }

  const auth = getAuthCookies()
  const isAnon = REQUIRES_ANON.includes(request.nextUrl.pathname)

  if (isAnon && !auth) {
    return clearAuthCookiesResponse(NextResponse.next())
  }

  if (isAnon && auth) {
    return redirectToPath(request, '/')
  }

  const [ok, refresh] = await getSession()

  if (!ok) {
    const requestPath = request.nextUrl.pathname
    const redirectUrl = request.nextUrl.clone()

    redirectUrl.pathname = '/login'

    if (requestPath !== '/') {
      redirectUrl.searchParams.set('next', requestPath)
    }

    // Request not authenticated; Clear cookies and redirect to login.
    return clearAuthCookiesResponse(NextResponse.redirect(redirectUrl))
  }

  if (request.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.rewrite(
      new URL(`${request.nextUrl.pathname}`, API_URL),
      {
        headers: createHeaders(request.headers),
      },
    )
  }

  const response = NextResponse.next()

  if (refresh) {
    setAuthCookiesResponse(response, refresh)
  }

  return response
}

const redirectToPath = (request: NextRequest, redirectPath: string) => {
  const redirectUrl = request.nextUrl.clone()
  redirectUrl.pathname = redirectPath
  return NextResponse.redirect(redirectUrl)
}
