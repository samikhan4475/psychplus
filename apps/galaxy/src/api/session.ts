import type {
  AuthResponse,
  AuthSession,
  RefreshRequest,
  UserResponse,
} from '@/types'
import { getAuthCookies } from '@/utils/auth'
import * as api from './api'
import { REFRESH_ENDPOINT, SESSION_ENDPOINT, USER_ENDPOINT } from './endpoints'
import { createAuthzHeader } from './headers'

type SessionResult = [boolean, AuthSession | null]

const apiGetSession = async (): Promise<SessionResult> => {
  const auth = getAuthCookies()

  if (!auth) {
    return [false, null]
  }

  const sessionResponse = await api.GET(SESSION_ENDPOINT)

  if (sessionResponse.state === 'success') {
    return [true, null]
  }

  try {
    const session = await apiRefreshSession({
      userId: auth.user.userId,
      refreshToken: auth.refreshToken,
    })

    return [true, session]
  } catch (e) {
    return [false, null]
  }
}

const apiRefreshSession = async (
  request: RefreshRequest,
): Promise<AuthSession> => {
  const refreshResponse = await api.POST<AuthResponse>(REFRESH_ENDPOINT, {
    userId: request.userId,
    refreshToken: request.refreshToken,
  })

  if (refreshResponse.state === 'error') {
    throw refreshResponse
  }

  const userResponse = await api.GET<UserResponse>(USER_ENDPOINT, {
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

export { apiGetSession, apiRefreshSession }
