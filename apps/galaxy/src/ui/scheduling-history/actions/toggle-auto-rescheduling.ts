'use server'

import * as api from '@/api'

interface ToggleAutoReschedulingResponse {
  failures: object
}

const toggleAutoReScheduling = async (
  patientId: string,
  autoRescheduleEnabled: boolean,
): Promise<api.ActionResult<boolean>> => {
  const response = await api.POST<ToggleAutoReschedulingResponse>(
    api.TOGGLE_PATIENT_AUTO_RESCHEDULING(patientId, autoRescheduleEnabled),
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: true,
  }
}

export { toggleAutoReScheduling }
