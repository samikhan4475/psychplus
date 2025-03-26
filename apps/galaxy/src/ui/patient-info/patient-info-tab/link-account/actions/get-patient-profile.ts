'use server'

import * as api from '@/api'
import { PatientProfile } from '@/types'

const getPatientProfileAction = async (
  patientId: string,
  IsIncludePatientLastLogin?: boolean,
): Promise<api.ActionResult<PatientProfile>> => {
  const url = new URL(api.PATIENT_PROFILE_ENDPOINT(patientId))
  url.searchParams.append(
    'IsIncludePatientLastLogin',
    String(IsIncludePatientLastLogin ?? false),
  )
  const response = await api.GET<PatientProfile>(url.toString())

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
