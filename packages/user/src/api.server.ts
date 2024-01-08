import { cache } from 'react'
import { handleRequest } from '@psychplus/utils/api'
import { API_URL } from '@psychplus/utils/constants'
import { createHeaders } from '@psychplus/utils/server'
import type { Staff, User } from './types'

const getUser = async (): Promise<User> =>
  handleRequest(
    fetch(`${API_URL}/api/users/self`, {
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const getStaff = async (): Promise<Staff> =>
  handleRequest(
    fetch(`${API_URL}/api/staff/self`, {
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const getUserCached = cache(getUser)
const getStaffCached = cache(getStaff)

export { getUserCached as getUser, getStaffCached as getStaff }
