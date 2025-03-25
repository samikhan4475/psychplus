'use server'

import { AuthSession } from '@/types'
import { getAuthCookies } from '@/utils/auth'

const getUserAuthAction = (): AuthSession | undefined => {
  return getAuthCookies()
}

export { getUserAuthAction }
