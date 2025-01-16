import * as api from '@/api'
import { PatientProfile } from '@/types'

interface PatientProfilePayload {
  isIncludeInsurance?: boolean
  isIncludeInsuranceVerification?: boolean
  isIncludeCardVerification?: boolean
  isIncludeConsentVerification?: boolean
  patientIds: string[]
}
const getPatientProfileDetails = async (
  payload: PatientProfilePayload,
): Promise<api.ActionResult<PatientProfile[]>> => {
  const response = await api.POST<PatientProfile[]>(
    api.SEARCH_PATIENTS_ENDPOINT,
    { ...payload },
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

export { getPatientProfileDetails }
