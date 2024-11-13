'use server'

import * as api from '@/api'

const cancelAppointmentAction = async (
  patientId: number,
  appointmentId: number,
): Promise<api.ActionResult<void>> => {
  const result = await api.DELETE(
    `${api.DELETE_PATIENT_APPOINTMENT_ENDPOINT(patientId, appointmentId)}`,
  )

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  return {
    state: 'success',
    data: undefined,
  }
}

export { cancelAppointmentAction }
