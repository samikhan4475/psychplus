'use server'

import * as api from '@/api'
import { UpdateRatingReasonPayload } from '../types'

const updateRatingReasonAction = async (
  appointmentId: number,
  payload: UpdateRatingReasonPayload,
): Promise<api.ActionResult<UpdateRatingReasonPayload>> => {
  const response = await api.PUT<UpdateRatingReasonPayload>(
    api.UPDATE_APPOINTMENT_RATING_REASON_ENDPOINT(appointmentId),
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

export { updateRatingReasonAction }
