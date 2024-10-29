'use server'

import * as api from '@/api'
import { PatientProfile } from '@/types'

const updatePatientProfileAction = async (
  patientId: number,
  payload: PatientProfile,
): Promise<api.ActionResult<PatientProfile>> => {
  const result = await api.PUT<PatientProfile>(
    api.UPDATE_PATIENT_PROFILE_ENDPOINT(patientId),
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
    data: result.data,
  }
}

export { updatePatientProfileAction }
