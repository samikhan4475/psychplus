'use server'

import { redirect } from 'next/navigation'
import { clearAuthCookies } from '@/utils/auth'

const logoutAction = (redirectPath?: string) => {
  const path = redirectPath ? `/login?next=${redirectPath}` : '/login'
  clearAuthCookies()
  redirect(path)
}

export { logoutAction }
