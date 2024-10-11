'use server'

import * as api from '@/api'
import { PatientProfile } from '@/types'
import { PatientHistoryParams } from '../patient-history-dialog/types'

const getPatientInfoHistoryAction = async (
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

export { getPatientInfoHistoryAction }
