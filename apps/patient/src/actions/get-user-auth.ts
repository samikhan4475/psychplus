'use server'

import { AuthSession, getAuthCookies } from '@psychplus-v2/auth'

const getUserAuthAction = (): AuthSession | undefined => {
  return getAuthCookies()
}

export { getUserAuthAction }
