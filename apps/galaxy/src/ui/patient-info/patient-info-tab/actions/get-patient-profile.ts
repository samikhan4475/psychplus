'use server'

import * as api from '@/api'
import type { PatientProfileRaw } from '@/types'
import { transformIn } from '../transform'
import type { PatientProfile } from '../types'

const getPatientProfileAction = async (
  id: string,
): Promise<api.ActionResult<PatientProfile>> => {
  const result = await api.GET<PatientProfileRaw>(
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
    data: transformIn(result.data),
  }
}

export { getPatientProfileAction }
