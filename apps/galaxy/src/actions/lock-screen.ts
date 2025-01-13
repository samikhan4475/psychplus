'use server'

import { redirect } from 'next/navigation'
import { clearAuthCookies, getAuthCookies } from '@/utils/auth'

const lockScreenAction = (previousPath: string) => {
  const auth = getAuthCookies()
  let path = '/login'
  if (auth?.user) {
    path = `/lock/${auth.user.email}?next=${previousPath}`
  }

  clearAuthCookies()
  redirect(path)
}

export { lockScreenAction }
