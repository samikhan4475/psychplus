import { NextResponse, type NextRequest } from 'next/server'
import { handleRequest } from '@psychplus/utils/api'
import {
  API_URL,
  APP_CODE,
  APP_ENV,
  APP_VERSION,
  AUTH_TOKEN_COOKIE_NAME,
  BEARER_AUTHENTICATION,
  CONTENT_TYPE_APPLICATION_JSON,
  HEADER_AUTHORIZATION,
  HEADER_CONTENT_TYPE,
  HEADER_PSYCHPLUS_APP_VERSION,
  HEADER_PSYCHPLUS_APPLICATION,
  HEADER_PSYCHPLUS_DEVICE,
  HEADER_PSYCHPLUS_RUN_ENVIRONMENT,
  HEADER_USER_AGENT,
  HEADER_X_URL,
  LOGIN_ENDPOINT,
  MOCK_API_URL,
  QUERY_TOKEN,
  QUERY_USER_AGENT,
} from '@psychplus/utils/constants'
import { getAuthToken } from '@psychplus/utils/cookies'
import { createSearchParams, wrapPath } from '@psychplus/utils/url'
import { type LoginResponse } from './types'

const INDEX_PATH = wrapPath('/')
const LOGIN_PATH = wrapPath('/login')

interface MiddlewareConfig {
  index: string
  requireAuth: string[]
  requireAnon: string[]
}

const DEFAULT_CONFIG: MiddlewareConfig = {
  index: wrapPath('/'),
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

// Middleware runs in between a request being made and when it completes.
// It can be used for cross-cutting concerns like setting headers and cookies,
// as well as request redirects and rewrites (proxying).
const createMiddleware = (config?: Partial<MiddlewareConfig>) => {
  const newConfig = createConfig(config)

  return (request: NextRequest) => {
    if (request.nextUrl.pathname === '/api/login') {
      return handleLoginApiRequest(request)
    }
    if (request.nextUrl.pathname.startsWith('/api/')) {
      return handleApiRequest(request)
    }
    return handlePageRequest(request, newConfig)
  }
}

// handlePageRequest handles requests for Next pages.
const handlePageRequest = (request: NextRequest, config: MiddlewareConfig) => {
  // Extract auth token from cookies.
  const authToken = getAuthToken()

  // If index requires auth and auth token is not present, redirect user to the login page.
  if (
    request.nextUrl.pathname === INDEX_PATH &&
    config.requireAuth.includes(INDEX_PATH) &&
    !authToken
  ) {
    return redirectToLogin(request)
  }

  // If user must be authenticated and an auth token is not present,
  // redirect user to the login page.
  if (
    config.requireAuth.some(
      (route) =>
        route !== INDEX_PATH && request.nextUrl.pathname.startsWith(route),
    ) &&
    !authToken
  ) {
    return redirectToLogin(request)
  }

  // If user must be anonymous and an auth token is present,
  // redirect user to the index page.
  if (
    config.requireAnon.some(
      (route) =>
        route !== INDEX_PATH && request.nextUrl.pathname.startsWith(route),
    ) &&
    authToken
  ) {
    return NextResponse.redirect(new URL(config.index, request.url))
  }

  const headers = new Headers(request.headers)
  headers.set(HEADER_X_URL, request.url)

  // Continue routing as-is.
  return NextResponse.next({
    headers,
  })
}

// handleApiRequest acts as a proxy middleware between the client and the end API server.
// It handles common cross-cutting concerns such as setting Authorization headers and
// other common headers.
const handleApiRequest = async (request: NextRequest) => {
  const headers = createHeaders(request)

  request.nextUrl.searchParams.delete(QUERY_TOKEN)
  request.nextUrl.searchParams.delete(QUERY_USER_AGENT)

  const baseUrl =
    request.nextUrl.searchParams.get('mock') === 'true' ? MOCK_API_URL : API_URL
  const searchParams = request.nextUrl.searchParams.toString()

  let endpoint = `${baseUrl}${request.nextUrl.pathname}`
  if (searchParams) {
    endpoint += `?${searchParams}`
  }

  return NextResponse.rewrite(endpoint, { headers })
}

// handleLoginApiRequest handles requests to /api/login.
// The login response is expected to contain and auth token,
// which will be used to set a secure HttpOnly cookie in the browser.
const handleLoginApiRequest = async (request: NextRequest) => {
  // Make request to external login endpoint to retrieve auth token.
  const headers = {
    [HEADER_CONTENT_TYPE]: CONTENT_TYPE_APPLICATION_JSON,
  }

  try {
    const response = await handleRequest<LoginResponse>(
      fetch(`${LOGIN_ENDPOINT}`, {
        method: 'POST',
        body: request.body,
        headers,
      }),
    )

    // Create a new response with an empty response body. The
    // returned auth token is set as a cookie by the server, it
    // is unnecessary to send it to the client in the response body.
    const nextResponse = new NextResponse(null, {
      status: 204,
    })

    // Set the auth token cookie with the httpOnly attribute
    // making in inaccessible to client-side JavaScript and
    // mitigating XSS attacks.
    nextResponse.cookies.set({
      name: AUTH_TOKEN_COOKIE_NAME,
      value: response.accessToken,
      secure: true,
      httpOnly: true,
      sameSite: 'lax',
    })

    return nextResponse
  } catch (error) {
    return new NextResponse(JSON.stringify(error), {
      status: 401,
      headers,
    })
  }
}

// Redirect user to login page. The previously requested page is added as a query param
// to allow navigation to continue after a successful login attempt.
const redirectToLogin = (request: NextRequest) => {
  const next = `${request.nextUrl.pathname}${request.nextUrl.search}`
  const nextParams = createSearchParams({
    next: next === '/' ? null : next,
  })

  return NextResponse.redirect(
    new URL(`${LOGIN_PATH}?${nextParams.toString()}`, request.url),
  )
}

// Add common headers to API requests.
const createHeaders = (request: NextRequest) => {
  const headers = new Headers(request.headers)

  // Set Content-Type header.
  headers.set(HEADER_CONTENT_TYPE, CONTENT_TYPE_APPLICATION_JSON)

  const token = request.nextUrl.searchParams.get(QUERY_TOKEN) ?? getAuthToken()

  // Set Authorization header with token if provided.
  if (token) {
    headers.set(HEADER_AUTHORIZATION, `${BEARER_AUTHENTICATION} ${token}`)
  }

  const userAgent =
    request.nextUrl.searchParams.get(QUERY_USER_AGENT) ??
    headers.get(HEADER_USER_AGENT)

  // Set required PsychPlus headers.
  headers.set(HEADER_PSYCHPLUS_APPLICATION, `${APP_CODE ?? ''}`)
  headers.set(HEADER_PSYCHPLUS_APP_VERSION, `${APP_VERSION ?? ''}`)
  headers.set(HEADER_PSYCHPLUS_RUN_ENVIRONMENT, `${APP_ENV ?? ''}`)
  headers.set(HEADER_PSYCHPLUS_DEVICE, `${userAgent ?? ''}`)

  return headers
}

export { createMiddleware }
