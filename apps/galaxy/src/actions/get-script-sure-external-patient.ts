'use server'

import * as api from '@/api'

interface ExternalPatientResponse {
  id: number
  patientId: number
  externalPatientId: number
}
const getScriptSureExternalPatient = async (
  patientId: string,
): Promise<api.ActionResult<ExternalPatientResponse>> => {
  const response = await api.POST<ExternalPatientResponse>(
    api.GET_SCRIPT_SURE_EXTERNAL_PATIENT_ID(patientId),
  )
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
      status: response.status,
    }
  }
  return {
    state: 'success',
    data: response.data,
  }
}

export { getScriptSureExternalPatient }
