'use client'

import * as api from '@/api/api.client'
import { UPDATE_VISIT_VERIFICATION_STATUS } from '@/api/endpoints'
import { Appointment } from '@/types'

const updateVisitVerificationStatus = async (body: {
  appointmentId: number
  insuranceVerificationStatus: string
}): Promise<api.ActionResult<Appointment[]>> => {
  const result = await api.PUT<Appointment[]>(
    UPDATE_VISIT_VERIFICATION_STATUS(
      body.appointmentId,
      body.insuranceVerificationStatus,
    ),
    {},
  )

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  return {
    state: 'success',
    data: result.data,
  }
}

export { updateVisitVerificationStatus }
