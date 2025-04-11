'use server'

import * as api from '@psychplus-v2/api'
import { getAuthCookies } from '@psychplus-v2/auth'
import { API_URL } from '@psychplus-v2/env'
import { AuthSession, User } from '@/types'

const getUserSessionAction = async (): Promise<
  api.ActionResult<AuthSession | undefined>
> => {
  const userResponse = await api.GET<User>(
    `${API_URL}/api/users/self/initialinformation`,
  )

  if (userResponse.state === 'error') {
    return {
      state: 'error',
      error: userResponse.error,
    }
  }

  const sessionId = userResponse.headers.get('psychplus-sessionid') ?? undefined

  const authCookies = getAuthCookies()

  const sessionData: AuthSession = {
    user: userResponse.data,
    refreshToken: authCookies?.refreshToken ?? '',
    accessToken: authCookies?.accessToken ?? '',
    accessTokenExpiry: authCookies?.accessTokenExpiry ?? '',
    sessionId,
  }

  return {
    state: 'success',
    data: sessionData,
  }
}

export { getUserSessionAction }
