import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { type Optional } from 'utility-types'
import {
  ACCESS_TOKEN_COOKIE,
  ACCESS_TOKEN_EXPIRY_COOKIE,
  APP_ENV,
  PRACTICE_ID_COOKIE,
  REFRESH_TOKEN_COOKIE,
  ROOT_DOMAIN,
  SCRIPTSURE_SESSION_COOKIE,
  SCRIPTSURE_SESSION_CREATED_AT_COOKIE,
  SESSION_ID_COOKIE,
  USER_COOKIE,
} from '@/constants'
import type { AuthSession, AuthSessionIds } from '@/types'

const getAuthCookies = (): AuthSession | undefined => {
  const accessToken = cookies().get(ACCESS_TOKEN_COOKIE)?.value
  const refreshToken = cookies().get(REFRESH_TOKEN_COOKIE)?.value
  const accessTokenExpiry = cookies().get(ACCESS_TOKEN_EXPIRY_COOKIE)?.value
  const userJson = cookies().get(USER_COOKIE)?.value
  const sessionId = cookies().get(SESSION_ID_COOKIE)?.value
  const practiceId = cookies().get(PRACTICE_ID_COOKIE)?.value

  if (!accessToken || !refreshToken || !accessTokenExpiry || !userJson) {
    return undefined
  }

  try {
    const user = JSON.parse(userJson)

    return {
      user,
      accessToken,
      refreshToken,
      accessTokenExpiry,
      sessionId,
      practiceId,
    }
  } catch {
    return undefined
  }
}

const setAuthCookies = (value: AuthSession) => {
  const domain = ROOT_DOMAIN ? ROOT_DOMAIN : undefined
  const secure = APP_ENV === 'production'
  const sameSite = 'lax'
  const httpOnly = true

  cookies().set(ACCESS_TOKEN_COOKIE, value.accessToken, {
    secure,
    httpOnly,
    sameSite,
    domain,
  })

  cookies().set(REFRESH_TOKEN_COOKIE, value.refreshToken, {
    secure,
    httpOnly,
    sameSite,
    domain,
  })

  cookies().set(ACCESS_TOKEN_EXPIRY_COOKIE, value.accessTokenExpiry, {
    secure,
    httpOnly,
    sameSite,
    domain,
  })

  cookies().set(USER_COOKIE, JSON.stringify(value.user), {
    secure,
    httpOnly,
    sameSite,
    domain,
  })
}

const setAuthCookiesResponse = (
  response: NextResponse,
  value: Optional<AuthSession, 'user'>,
) => {
  const domain = ROOT_DOMAIN ? ROOT_DOMAIN : undefined
  const secure = APP_ENV === 'production'
  const sameSite = 'lax'
  const httpOnly = true

  response.cookies.set(ACCESS_TOKEN_COOKIE, value.accessToken, {
    secure,
    httpOnly,
    sameSite,
    domain,
  })

  response.cookies.set(REFRESH_TOKEN_COOKIE, value.refreshToken, {
    secure,
    httpOnly,
    sameSite,
    domain,
  })

  response.cookies.set(ACCESS_TOKEN_EXPIRY_COOKIE, value.accessTokenExpiry, {
    secure,
    httpOnly,
    sameSite,
    domain,
  })

  if (value.user) {
    response.cookies.set(USER_COOKIE, JSON.stringify(value.user), {
      secure,
      httpOnly,
      sameSite,
      domain,
    })
  }
}

const clearAuthCookies = () => {
  const domain = ROOT_DOMAIN ? ROOT_DOMAIN : undefined

  cookies().delete({
    name: ACCESS_TOKEN_COOKIE,
    domain,
  })

  cookies().delete({
    name: REFRESH_TOKEN_COOKIE,
    domain,
  })

  cookies().delete({
    name: ACCESS_TOKEN_EXPIRY_COOKIE,
    domain,
  })

  cookies().delete({
    name: USER_COOKIE,
    domain,
  })

  cookies().delete({
    name: SCRIPTSURE_SESSION_COOKIE,
    domain,
  })

  cookies().delete({
    name: SCRIPTSURE_SESSION_CREATED_AT_COOKIE,
    domain,
  })
  cookies().delete({
    name: SESSION_ID_COOKIE,
    domain,
  })
  cookies().delete({
    name: PRACTICE_ID_COOKIE,
    domain,
  })
}

const clearAuthCookiesResponse = (response: NextResponse) => {
  response.cookies.delete({
    name: ACCESS_TOKEN_COOKIE,
    domain: ROOT_DOMAIN,
  })

  response.cookies.delete({
    name: REFRESH_TOKEN_COOKIE,
    domain: ROOT_DOMAIN,
  })

  response.cookies.delete({
    name: ACCESS_TOKEN_EXPIRY_COOKIE,
    domain: ROOT_DOMAIN,
  })

  response.cookies.delete({
    name: USER_COOKIE,
    domain: ROOT_DOMAIN,
  })

  response.cookies.delete({
    name: SCRIPTSURE_SESSION_COOKIE,
    domain: ROOT_DOMAIN,
  })

  response.cookies.delete({
    name: SCRIPTSURE_SESSION_CREATED_AT_COOKIE,
    domain: ROOT_DOMAIN,
  })

  response.cookies.delete({
    name: SESSION_ID_COOKIE,
    domain: ROOT_DOMAIN,
  })

  response.cookies.delete({
    name: PRACTICE_ID_COOKIE,
    domain: ROOT_DOMAIN,
  })

  return response
}

const setSessionIdsCookies = (value: AuthSessionIds) => {
  const domain = ROOT_DOMAIN ? ROOT_DOMAIN : undefined
  const secure = APP_ENV === 'production'
  const sameSite = 'lax'
  const httpOnly = true

  if (value.sessionId) {
    cookies().set(SESSION_ID_COOKIE, value.sessionId, {
      secure,
      httpOnly,
      sameSite,
      domain,
    })
  }

  if (value.sessionPracticeId) {
    cookies().set(PRACTICE_ID_COOKIE, value.sessionPracticeId, {
      secure,
      httpOnly,
      sameSite,
      domain,
    })
  }
}

export {
  getAuthCookies,
  setAuthCookies,
  clearAuthCookies,
  setAuthCookiesResponse,
  clearAuthCookiesResponse,
  setSessionIdsCookies,
}
