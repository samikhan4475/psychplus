'use server'

import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'

const cancelAppointment = async (
  appointmentId: number,
): Promise<api.ActionResult<void>> => {
  const result = await api.DELETE(
    `${API_URL}/api/appointments/${appointmentId}`,
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

export { cancelAppointment }
