import { cookies } from 'next/headers'
import { type NextResponse } from 'next/server'
import {
  ACCESS_TOKEN_COOKIE,
  ACCESS_TOKEN_EXPIRY_COOKIE,
  REFRESH_TOKEN_COOKIE,
  ROOT_DOMAIN,
  SCRIPTSURE_SESSION_COOKIE,
  SCRIPTSURE_SESSION_CREATED_AT_COOKIE,
  USER_COOKIE,
} from '@psychplus-v2/env'
import { type Optional } from 'utility-types'
import type { AuthSession } from './types'

const getAuthCookies = (): AuthSession | undefined => {
  const accessToken = cookies().get(ACCESS_TOKEN_COOKIE)?.value
  const refreshToken = cookies().get(REFRESH_TOKEN_COOKIE)?.value
  const accessTokenExpiry = cookies().get(ACCESS_TOKEN_EXPIRY_COOKIE)?.value
  const userJson = cookies().get(USER_COOKIE)?.value

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
    }
  } catch {
    return undefined
  }
}

const setAuthCookies = (value: AuthSession) => {
  const domain = undefined
  const secure = true
  const httpOnly = true
  const sameSite = 'none'

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
  const domain = undefined
  const secure = true
  const httpOnly = true
  const sameSite = 'none'

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
  const domain = undefined

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
}

const clearAuthCookiesResponse = (response: NextResponse<unknown>) => {
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

  return response
}

export {
  getAuthCookies,
  setAuthCookies,
  clearAuthCookies,
  setAuthCookiesResponse,
  clearAuthCookiesResponse,
}
