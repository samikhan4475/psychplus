'use server'

import * as api from '@/api'
import { AuthSession, AuthSessionIds, StaffResource } from '@/types'
import { getAuthCookies, setSessionIdsCookies } from '@/utils/auth'

const getUserSessionAction = async (): Promise<
  api.ActionResult<AuthSession | undefined>
> => {
  const url = new URL(api.GET_SELF_STAFF_DETAILS_ENDPOINT)

  url.searchParams.append('isIncludePractice', 'true')

  const userResponse = await api.GET<StaffResource>(
    api.GET_SELF_STAFF_DETAILS_ENDPOINT,
  )

  if (userResponse.state === 'error') {
    return {
      state: 'error',
      error: userResponse.error,
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

  const authCookies = getAuthCookies()

  return {
    state: 'success',
    data: authCookies,
  }
}

export { getUserSessionAction }
