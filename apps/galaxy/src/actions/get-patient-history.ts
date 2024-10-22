'use server'

import * as api from '@/api'
import { PatientHistoryParams, PatientProfile } from '@/types'

const getPatientHistoryAction = async (
  patientId: string,
  payload: PatientHistoryParams,
): Promise<api.ActionResult<PatientProfile[]>> => {
  const response = await api.POST<PatientProfile[]>(
    api.GET_PATIENTS_INFO_HISTORY(patientId),
    payload,
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

export { getPatientHistoryAction }
