import { NextResponse, type NextRequest } from 'next/server'
import {
  clearAuthCookiesResponse,
  getAuthCookies,
  getSession,
  setAuthCookiesResponse,
} from '@psychplus-v2/auth'
import { API_URL } from '@psychplus-v2/env'
import { createHeaders } from '@psychplus-v2/headers'
import { HEADER_PSYCHPLUS_APPLICATION } from '@psychplus/utils/constants'

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)', { source: '/' }],
}

const SKIP_MIDDLEWARE = [
  '/schedule-appointment/personal-details',
  '/schedule-appointment/insurance-payment',
  '/call',
]
const REQUIRES_ANON = ['/login', '/forgot-password', '/signup']

export const middleware = async (request: NextRequest) => {
  if (SKIP_MIDDLEWARE.includes(request.nextUrl.pathname)) {
    return NextResponse.next()
  }

  if (request.nextUrl.pathname.startsWith('/pre-checkin-assessment')) {
    const url = request.nextUrl.clone()
    url.pathname = '/404'
    if (process.env.API_URL === 'https://api.psychplus.io') {
      return NextResponse.redirect(url)
    }
  }

  if (request.nextUrl.pathname.startsWith('/widgets')) {
    const headers = createHeaders(request.headers)
    headers.set(HEADER_PSYCHPLUS_APPLICATION, 'p+website-ui')
    // Skip middleware for widget requests.
    return NextResponse.next()
  }
  if (request.nextUrl.pathname.startsWith('/events')) {
    // Skip middleware for notifications requests.
    return NextResponse.next()
  }
  if (request.headers.get('next-action') !== null) {
    // Skip middleware if request is part of a Next server action.
    return NextResponse.next()
  }
  if (request.nextUrl.pathname.startsWith('/api')) {
    const headers = createHeaders(request.headers)

    const url = new URL(
      `${request.nextUrl.pathname}${request.nextUrl.search}`,
      API_URL,
    )

    return fetch(url.toString(), {
      body: request.body,
      method: request.method,
      headers: {
        Authorization: headers.get('Authorization') ?? '',
        'Content-Type': headers.get('Content-Type') ?? 'application/json',
        'Psychplus-Application':
          headers.get('Psychplus-Application') ?? 'react-ui',
        'Psychplus-AppVersion': headers.get('Psychplus-AppVersion') ?? '1.0.0',
        'Psychplus-RunEnvironment':
          headers.get('Psychplus-RunEnvironment') ?? 'development',
      },
    }).catch((e) => {
      console.log(e)
    })
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
