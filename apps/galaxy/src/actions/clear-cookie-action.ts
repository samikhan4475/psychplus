'use server'

import { clearAuthCookies } from '@/utils/auth'

const clearAuthCookieAction = () => {
  clearAuthCookies()
}

export { clearAuthCookieAction }
