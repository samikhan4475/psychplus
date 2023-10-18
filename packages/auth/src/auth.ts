import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const AUTH_TOKEN_COOKIE_NAME = 'authtoken'

// getAuthToken retrieves an auth token from the request cookies.
const getAuthToken = () =>
  cookies().get(AUTH_TOKEN_COOKIE_NAME ?? '')?.value ?? undefined

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

export { getAuthToken, setAuthTokenCookie }
