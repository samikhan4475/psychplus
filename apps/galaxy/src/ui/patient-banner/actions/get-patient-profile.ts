'use server'

import * as api from '@/api'
import type { PatientProfileRaw } from '@/types'
import { getPatientMRN } from '@/utils'
import type { PatientProfile } from '../types'

const getPatientProfileAction = async (
  id: string,
): Promise<api.ActionResult<PatientProfile>> => {
  const response = await api.GET<PatientProfileRaw>(
    api.PATIENT_PROFILE_ENDPOINT(id),
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: transformResponseData(response.data),
  }
}

const transformResponseData = (data: PatientProfileRaw): PatientProfile => ({
  id: String(data.id),
  mrn: getPatientMRN(data.id),
})

export { getPatientProfileAction }
