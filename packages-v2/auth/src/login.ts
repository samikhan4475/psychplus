import * as api from '@psychplus-v2/api'
import { type ActionResult } from '@psychplus-v2/api'
import { createAuthzHeader } from '@psychplus-v2/headers'
import { LOGIN_URL, USER_URL } from './constants'
import type {
  AuthRequest,
  AuthResponse,
  AuthSession,
  UserResponse,
} from './types'

const login = async (
  request: AuthRequest,
): Promise<ActionResult<AuthSession>> => {
  const loginResponse = await api.POST<AuthResponse>(LOGIN_URL, request)

  if (loginResponse.state === 'error') {
    return {
      state: 'error',
      error: loginResponse.error,
    }
  }

  const userResponse = await api.GET<UserResponse>(USER_URL, {
    headers: createAuthzHeader(loginResponse.data.accessToken),
  })

  if (userResponse.state === 'error') {
    return {
      state: 'error',
      error: userResponse.error,
    }
  }

  return {
    state: 'success',
    data: {
      user: {
        userId: loginResponse.data.userId,
        firstName: userResponse.data.legalName.firstName,
        lastName: userResponse.data.legalName.lastName,
        email: userResponse.data.contactInfo.email,
      },
      accessToken: loginResponse.data.accessToken,
      refreshToken: loginResponse.data.refreshToken,
      accessTokenExpiry: loginResponse.data.accessTokenExpiry,
    },
  }
}

export { login }
