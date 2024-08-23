'use server'

import { redirect } from 'next/navigation'
import { clearAuthCookies } from '@/utils/auth'

const logoutAction = () => {
  clearAuthCookies()
  redirect('/login')
}

export { logoutAction }
