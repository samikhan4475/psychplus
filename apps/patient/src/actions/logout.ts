'use server'

import { redirect } from 'next/navigation'
import { clearAuthCookies } from '@psychplus-v2/auth'

const logoutAction = () => {
  clearAuthCookies()
  redirect(`/login`)
}

export { logoutAction }
