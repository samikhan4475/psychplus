import * as api from '@psychplus-v2/api'
import { createAuthzHeader } from '@psychplus-v2/headers'
import { REFRESH_URL, SESSION_URL, USER_URL } from './constants'
import { getAuthCookies } from './cookies'
import type {
  AuthResponse,
  AuthSession,
  RefreshRequest,
  UserResponse,
} from './types'

type SessionResult = [boolean, AuthSession | null]

const getSession = async (): Promise<SessionResult> => {
  const auth = getAuthCookies()

  if (!auth) {
    return [false, null]
  }

  const sessionResponse = await api.GET(SESSION_URL)

  if (sessionResponse.state === 'success') {
    return [true, null]
  }

  try {
    const session = await refreshSession({
      userId: auth.user.userId,
      refreshToken: auth.refreshToken,
    })

    return [true, session]
  } catch (e) {
    return [false, null]
  }
}

const refreshSession = async (
  request: RefreshRequest,
): Promise<AuthSession> => {
  const refreshResponse = await api.POST<AuthResponse>(REFRESH_URL, {
    userId: request.userId,
    refreshToken: request.refreshToken,
  })

  if (refreshResponse.state === 'error') {
    throw refreshResponse
  }

  const userResponse = await api.GET<UserResponse>(USER_URL, {
    headers: createAuthzHeader(refreshResponse.data.accessToken),
  })

  if (userResponse.state === 'error') {
    throw userResponse
  }

  const session = {
    user: {
      userId: refreshResponse.data.userId,
      firstName: userResponse.data.legalName.firstName,
      lastName: userResponse.data.legalName.lastName,
      email: userResponse.data.contactInfo.email,
    },
    accessToken: refreshResponse.data.accessToken,
    refreshToken: refreshResponse.data.refreshToken,
    accessTokenExpiry: refreshResponse.data.accessTokenExpiry,
  }

  return session
}

export { getSession, refreshSession }
