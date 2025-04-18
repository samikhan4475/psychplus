'use server'

import * as api from '@psychplus-v2/api'
import { AppointmentStatus } from '@psychplus-v2/constants'
import { API_URL } from '@psychplus-v2/env'

export interface ConfirmOrCanelAppointmentParams {
  appointmentId: string
  status: AppointmentStatus
  consentToSignPolicies: boolean
}

const confirmOrCancelAppointment = async ({
  appointmentId,
  status,
  consentToSignPolicies,
}: ConfirmOrCanelAppointmentParams) => {
  const result = await api.POST(
    `${API_URL}/api/appointments/${appointmentId}/actions/updatestatusandsignpolicies/unauthenticated`,
    { status, consentToSignPolicies },
  )

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  return {
    state: 'success',
  }
}

export { confirmOrCancelAppointment }
