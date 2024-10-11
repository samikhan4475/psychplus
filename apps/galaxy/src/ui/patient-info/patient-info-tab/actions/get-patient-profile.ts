'use server'

import * as api from '@/api'
import type { PatientProfile } from '@/types'

const getPatientProfileAction = async (
  id: string,
): Promise<api.ActionResult<PatientProfile>> => {
  const result = await api.GET<PatientProfile>(
    api.GET_PATIENT_PROFILE_ENDPOINT(id),
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

export { getPatientProfileAction }
