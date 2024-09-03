'use server'

import * as api from '@/api'
import type { PatientProfileRaw } from '@/types'
import { transformIn } from '../transform'
import type { PatientProfile } from '../types'

const savePatientProfileAction = async (
  id: string,
  data: PatientProfileRaw,
): Promise<api.ActionResult<PatientProfile>> => {
  const result = await api.PATCH<PatientProfileRaw>(
    api.GET_PATIENT_PROFILE_ENDPOINT(id),
    data,
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

export { savePatientProfileAction }
