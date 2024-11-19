'use server'

import { redirect } from 'next/navigation'
import { jwtDecode } from 'jwt-decode'
import * as api from '@/api'
import type { AuthRequest, AuthResponse, UserResponse } from '@/types'
import { setAuthCookies } from '@/utils/auth'

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

  const userResponse = await api.GET<UserResponse>(api.USER_ENDPOINT, {
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

  const session = {
    user: {
      userId: loginResponse.data.userId,
      firstName: userResponse.data.legalName.firstName,
      lastName: userResponse.data.legalName.lastName,
      email: userResponse.data.contactInfo.email,
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
