'use server'

import { cookies } from 'next/headers'
import { getAuthCookies } from '@/utils/auth'

const copyMyPreviousAction = async () => {
  const cookieStore = await cookies()
  const auth = getAuthCookies()
  cookieStore.set('staff-id', String(auth?.user?.userId))
}

export { copyMyPreviousAction }
