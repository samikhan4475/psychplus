'use client'

import * as api from '@/api/api.client'
import { PATIENT_PROFILE_ENDPOINT } from '@/api/endpoints'
import { PatientProfile } from '@/types'

const getPatientProfileAction = async (
  patientId: string,
): Promise<api.ActionResult<PatientProfile>> => {
  const response = await api.GET<PatientProfile>(
    PATIENT_PROFILE_ENDPOINT(patientId),
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
export { getPatientProfileAction }
