import { cache } from 'react'
import { api } from '@psychplus/api'
import { MOCK_API_URL } from '@psychplus/utils/constants'
import { type User } from './types'

const getUser = async (): Promise<User> => api(`${MOCK_API_URL}/api/user`)

const getUserCached = cache(getUser)

export { getUserCached as getUser }
