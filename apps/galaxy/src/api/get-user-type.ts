import * as api from '@/api'
import { UserType } from '@/types'

const getUserType = async (userId: string) => {
  const response = await api.GET<UserType>(api.GET_USER_TYPE(userId))

  if (response.state === 'error') {
    throw new Error(response.error)
  }

  return response.data
}

export { getUserType }
