'use server'

import * as api from '@/api'
import { PatientProfile } from '@/types'

const updatePatientAction = async (
  patientId: number,
  payload: Partial<PatientProfile>,
): Promise<api.ActionResult<void>> => {
  const result = await api.PATCH(
    api.UPDATE_PATIENT_ENDPOINT(patientId),
    payload,
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

export { updatePatientAction }
