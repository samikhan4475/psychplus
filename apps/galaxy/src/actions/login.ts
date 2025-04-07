'use server'

import { redirect } from 'next/navigation'
import { jwtDecode } from 'jwt-decode'
import * as api from '@/api'
import type {
  AuthRequest,
  AuthResponse,
  AuthSessionIds,
  StaffResource,
} from '@/types'
import { setAuthCookies, setSessionIdsCookies } from '@/utils/auth'

const STAFF_ROLE = 'Staff'

interface LoginRequest extends AuthRequest {
  next: string | null
}

const loginAction = async ({
  next,
  ...request
}: LoginRequest): Promise<api.ActionResult<void>> => {
  const loginResponse = await api.POST<AuthResponse>(
    api.LOGIN_ENDPOINT,
    request,
  )

  if (loginResponse.state === 'error') {
    return {
      state: 'error',
      error: loginResponse.error,
    }
  }

  const url = new URL(api.GET_SELF_STAFF_DETAILS_ENDPOINT)

  url.searchParams.append('isIncludePractice', 'true')

  const userResponse = await api.GET<StaffResource>(url.toString(), {
    headers: api.createAuthzHeader(loginResponse.data.accessToken),
  })

  if (userResponse.state === 'error') {
    return {
      state: 'error',
      error: userResponse.error,
    }
  }

  const decoded = jwtDecode<{ role: string | string[] }>(
    loginResponse.data.accessToken,
  )

  const roles = Array.isArray(decoded.role) ? decoded.role : [decoded.role]

  if (!roles.includes(STAFF_ROLE)) {
    return {
      state: 'error',
      error: 'Invalid credentials',
    }
  }

  const sessionId = userResponse.headers.get('psychplus-sessionid') ?? undefined
  const practiceId = userResponse?.data?.practiceIds?.[0] ?? undefined

  const sessionIdCookies: AuthSessionIds = {
    ...(sessionId && { sessionId }),
    ...(practiceId && { sessionPracticeId: practiceId }),
  }

  if (Object.keys(sessionIdCookies).length) {
    setSessionIdsCookies(sessionIdCookies)
  }

  const session = {
    user: {
      userId: loginResponse.data.userId,
      staffId: userResponse.data.id,
      firstName: userResponse.data.legalName.firstName,
      lastName: userResponse.data.legalName.lastName,
      honors: userResponse.data.legalName.honors,
      email: request?.username,
    },
    accessToken: loginResponse.data.accessToken,
    refreshToken: loginResponse.data.refreshToken,
    accessTokenExpiry: loginResponse.data.accessTokenExpiry,
  }

  setAuthCookies(session)
  const redirectPath = next ?? '/'
  redirect(redirectPath)
}

export { loginAction }
