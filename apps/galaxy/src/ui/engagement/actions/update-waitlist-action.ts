'use server'

import * as api from '@/api'
import { CreateWaitlistPayload, UpdateWaitlistpayload } from '@/types'

const updateWaitlistAction = async (
  payload: UpdateWaitlistpayload,
): Promise<api.ActionResult<CreateWaitlistPayload>> => {
  const response = await api.PUT<CreateWaitlistPayload>(
    api.UPDATE_WAITLIST_ENDPOINT(payload.patientId, payload.id),
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

export { updateWaitlistAction }
