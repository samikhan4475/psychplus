'use server'

import * as api from '@/api'
import { Appointment } from '@/types'

interface RequestPayload {
  isFollowupDenied: boolean
  followupDenialReason: string
}

const updateFollowupDenialStatus = async (
  appointmentId: number,
  body: RequestPayload,
): Promise<api.ActionResult<Appointment>> => {
  const result = await api.POST<Appointment>(
    api.UPDATE_FOLLOW_UP_DENIAL_STATUS(appointmentId),
    body,
  )
  if (result.state === 'error') {
    return {
      error: result.error,
      state: 'error',
    }
  }

  return {
    data: result.data,
    state: 'success',
  }
}

export { updateFollowupDenialStatus }
