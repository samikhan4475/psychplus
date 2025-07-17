import { NextResponse, type NextRequest } from 'next/server'
import { clearAuthCookiesResponse, setAuthCookiesResponse } from '@/utils/auth'
import { createHeaders } from './api'
import { apiGetSession } from './api/session'
import { API_URL } from './constants'
import { retryOnTimeoutFetch } from './utils'

const LOGIN_PATH = '/login'
const PUBLIC_ROUTES = [
  /^\/login$/,
  /^\/forgot-password$/,
  /^\/change-password\/[^/]+$/,
  /^\/lock\/[^/]+$/,
]

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

  if (request.nextUrl.pathname.startsWith('/api')) {
    const headers = createHeaders(request.headers)
    const buffer = await request.arrayBuffer()
    return retryOnTimeoutFetch(() =>
      fetch(
        new URL(
          `${request.nextUrl.pathname}${request.nextUrl.search}`,
          API_URL,
        ),
        {
          body: ['GET', 'HEAD'].includes(request.method) ? undefined : buffer,
          method: request.method,
          headers: {
            Authorization: headers.get('Authorization') ?? '',
            'Content-Type': headers.get('Content-Type') ?? 'application/json',
            'Psychplus-Application':
              headers.get('Psychplus-Application') ?? 'react-ui',
            'Psychplus-AppVersion':
              headers.get('Psychplus-AppVersion') ?? '1.0.0',
            'Psychplus-RunEnvironment':
              headers.get('Psychplus-RunEnvironment') ?? 'development',
            'PsychPlus-SessionPracticeId':
              headers.get('PsychPlus-SessionPracticeId') ?? '',
            'PsychPlus-SessionId': headers.get('PsychPlus-SessionId') ?? '',
          },
        },
      ),
    )
  }

  const [ok, refresh] = await apiGetSession()

  const isPublicRoute = PUBLIC_ROUTES.some((pattern) =>
    pattern.test(request.nextUrl.pathname),
  )

  if (ok && isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (!ok && isPublicRoute) {
    return clearAuthCookiesResponse(NextResponse.next())
  }

  if (!ok) {
    const requestPath = request.nextUrl.pathname + request.nextUrl.search
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
