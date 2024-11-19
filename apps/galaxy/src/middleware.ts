import { NextResponse, type NextRequest } from 'next/server'
import { clearAuthCookiesResponse, setAuthCookiesResponse } from '@/utils/auth'
import { createHeaders } from './api'
import { apiGetSession } from './api/session'
import { API_URL } from './constants'

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

  if (request.nextUrl.pathname.startsWith('/api')) {
    const headers = createHeaders(request.headers)

    return fetch(
      new URL(`${request.nextUrl.pathname}${request.nextUrl.search}`, API_URL),
      {
        body: request.body,
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
        },
      },
    ).catch((e) => {
      console.log(`${request.nextUrl.pathname} ==> ${JSON.stringify(e)}`)
    })
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
