'use server'

import { redirect } from 'next/navigation'
import { apiRefreshSession } from '@/api/session'
import { clearAuthCookies, getAuthCookies, setAuthCookies } from '@/utils/auth'

const refreshSessionAction = async ({
  redirectUrl,
  requireAuth,
}: {
  redirectUrl: string
  requireAuth?: boolean
}) => {
  const auth = getAuthCookies()

  if (!auth) {
    if (requireAuth) {
      redirectToLogin(redirectUrl)
    }

    return null
  }

  try {
    const session = await apiRefreshSession({
      userId: auth.user.userId,
      refreshToken: auth.refreshToken,
    })

    setAuthCookies(session)
    return session
  } catch (e) {
    /* We cannot perform a redirect within a try/catch block */
  }

  if (requireAuth) {
    redirectToLogin(redirectUrl)
  }

  return null
}

const redirectToLogin = (redirectUrl: string) => {
  clearAuthCookies()
  redirect(redirectUrl)
}

export { refreshSessionAction }
