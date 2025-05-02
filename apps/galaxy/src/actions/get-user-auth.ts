'use server'

import { getAuthCookies } from '@/utils/auth'

const getUserAuthAction = async () => {
  return getAuthCookies()
}

export { getUserAuthAction }
