'use server'

import * as api from '@/api'
import { AuthSession, AuthSessionIds, StaffResource } from '@/types'
import { getAuthCookies, setSessionIdsCookies } from '@/utils/auth'

const getUserSessionAction = async (): Promise<
  api.ActionResult<AuthSession | undefined>
> => {
  const url = new URL(api.GET_SELF_STAFF_DETAILS_ENDPOINT)

  url.searchParams.append('isIncludePractice', 'true')

  const userResponse = await api.GET<StaffResource>(url.toString())

  if (userResponse.state === 'error') {
    return {
      state: 'error',
      error: userResponse.error,
    }
  }

  const sessionId = userResponse.headers.get('psychplus-sessionid') ?? undefined
  const practiceId = userResponse?.data?.practiceIds?.[0] ?? undefined

  const newCookies: AuthSessionIds = {
    ...(sessionId && { sessionId }),
    ...(practiceId && { sessionPracticeId: practiceId }),
  }
  const existingCookies = getAuthCookies()
  const cookiesChanged =
    newCookies?.sessionId !== existingCookies?.sessionId ||
    newCookies?.sessionPracticeId !== existingCookies?.practiceId

  if (cookiesChanged && Object.keys(newCookies)?.length) {
    setSessionIdsCookies(newCookies)
  }

  const authCookies = getAuthCookies()

  return {
    state: 'success',
    data: authCookies,
  }
}

export { getUserSessionAction }
