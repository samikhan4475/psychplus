import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'
import {
  APP_ENV,
  APP_PATH,
  AUTH_TOKEN_COOKIE_NAME,
  LOGIN_ENDPOINT,
} from '@psychplus/utils/constants'

interface MiddlewareConfig {
  index: string
  requireAuth: string[]
  requireAnon: string[]
}

const DEFAULT_CONFIG: MiddlewareConfig = {
  index: '/',
  requireAuth: [],
  requireAnon: [],
}

const createConfig = (
  config: Partial<MiddlewareConfig> = DEFAULT_CONFIG,
): MiddlewareConfig => ({
  index: config.index ?? DEFAULT_CONFIG.index,
  requireAuth: config.requireAuth ?? DEFAULT_CONFIG.requireAuth,
  requireAnon: config.requireAnon ?? DEFAULT_CONFIG.requireAnon,
})

// middleware runs in between a request being made and when it completes.
// It can be used for cross-cutting concerns like setting headers and cookies,
// as well as request redirects and rewrites (proxying).
const createMiddleware = (config?: Partial<MiddlewareConfig>) => {
  const newConfig = createConfig(config)

  return (request: NextRequest) => {
    if (request.nextUrl.pathname === '/api/login') {
      return handleLoginApiRequest(request)
    }
    return handlePageRequest(request, newConfig)
  }
}

// handlePageRequest handles requests for Next pages.
const handlePageRequest = (request: NextRequest, config: MiddlewareConfig) => {
  // Extract auth token from cookies.
  const authToken = cookies().get(AUTH_TOKEN_COOKIE_NAME)?.value ?? undefined

  // If index requires auth and auth token is not present, redirect user to the login page.
  if (
    request.nextUrl.pathname === '/' &&
    config.requireAuth.includes('/') &&
    !authToken
  ) {
    const loginUrl =
      APP_ENV !== 'development' ? `/${APP_PATH ?? ''}/login` : '/login'

    return NextResponse.redirect(new URL(loginUrl, request.url))
  }

  // If user must be authenticated and an auth token is not present,
  // redirect user to the login page.
  if (
    config.requireAuth.some(
      (route) => route !== '/' && request.nextUrl.pathname.startsWith(route),
    ) &&
    !authToken
  ) {
    return NextResponse.redirect(
      new URL(
        `/login?next=${request.nextUrl.pathname}${request.nextUrl.search}`,
        request.url,
      ),
    )
  }

  // If user must be anonymous and an auth token is present,
  // redirect user to the index page.
  if (
    config.requireAnon.some(
      (route) => route !== '/' && request.nextUrl.pathname.startsWith(route),
    ) &&
    authToken
  ) {
    return NextResponse.redirect(new URL(config.index, request.url))
  }

  // Continue routing as-is.
  return NextResponse.next()
}

// handleLoginApiRequest handles requests to /api/login.
// The login response is expected to contain and auth token,
// which will be used to set a secure HttpOnly cookie in the browser.
const handleLoginApiRequest = async (request: NextRequest) => {
  // Make request to external login endpoint to retrieve auth token.
  const loginResponse = await fetch(`${LOGIN_ENDPOINT}`, {
    method: 'POST',
    body: request.body,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data = (await loginResponse.json()) as { token: string }

  // Create a new response with an empty response body. The
  // returned auth token is set as a cookie by the server, it
  // is unnecessary to send it to the client in the response body.
  const nextResponse = new NextResponse(null, {
    status: 204,
  })

  setAuthTokenCookie(nextResponse, data.token)

  return nextResponse
}

// Set the auth token cookie with the httpOnly attribute
// making in inaccessible to client-side JavaScript and
// mitigating XSS attacks.
const setAuthTokenCookie = (response: NextResponse, token: string) => {
  response.cookies.set({
    name: `${AUTH_TOKEN_COOKIE_NAME}`,
    value: token,
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
  })
}

export { createMiddleware }
