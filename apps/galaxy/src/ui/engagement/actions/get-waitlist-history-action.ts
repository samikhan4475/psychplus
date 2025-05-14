'use client'

import * as api from '@/api/api.client'
import { GET_WAITLIST_HISTORY_ENDPOINT } from '@/api/endpoints'
import { WaitlistResponse } from '@/types'

const getWaitlistHistoryAction = async (payload: {
  id: number
}): Promise<api.ActionResult<WaitlistResponse[]>> => {
  const response = await api.POST<WaitlistResponse[]>(
    GET_WAITLIST_HISTORY_ENDPOINT(payload?.id),
    payload,
  )
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: response.data,
  }
}

export { getWaitlistHistoryAction }
