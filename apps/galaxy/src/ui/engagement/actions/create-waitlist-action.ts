'use server'

import * as api from '@/api'
import { CreateWaitlistPayload } from '@/types'

const createWaitlistAction = async (
  payload: CreateWaitlistPayload,
): Promise<api.ActionResult<CreateWaitlistPayload>> => {
  const response = await api.POST<CreateWaitlistPayload>(
    api.CREATE_WAITLIST_ENDPOINT(payload.patientId),
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

export { createWaitlistAction }
