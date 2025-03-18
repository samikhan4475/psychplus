'use client'

import * as api from '@/api/api.client'
import { GET_UNREAD_COUNT_SECURE_MESSAGES } from '@/api/endpoints'

const getUnreadCountAction = async (): Promise<
  api.ActionResult<{
    count: number
  }>
> => {
  const response = await api.GET<number>(GET_UNREAD_COUNT_SECURE_MESSAGES)
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }
  return {
    state: 'success',
    data: {
      count: response.data,
    },
  }
}

export { getUnreadCountAction }
