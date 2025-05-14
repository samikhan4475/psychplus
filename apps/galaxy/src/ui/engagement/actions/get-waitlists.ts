'use client'

import * as api from '@/api/api.client'
import { GET_WAITLISTS_ENDPOINT } from '@/api/endpoints'
import { WaitlistPayload, WaitlistResponse } from '@/types'

const getWaitlistsAction = async (
  payload?: WaitlistPayload,
): Promise<api.ActionResult<WaitlistResponse[]>> => {
  const response = await api.POST<WaitlistResponse[]>(
    GET_WAITLISTS_ENDPOINT,
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

export { getWaitlistsAction }
