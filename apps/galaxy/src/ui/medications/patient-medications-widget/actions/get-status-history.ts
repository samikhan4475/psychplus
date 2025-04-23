'use server'

import * as api from '@/api'
import { PatientMedication } from '../types'

const getStatusHistoryAction = async (
  patientId: number,
  id: string,
): Promise<api.ActionResult<PatientMedication[]>> => {
  const response = await api.POST<PatientMedication[]>(
    api.GET_PATIENT_MEDICATION_HISTORY_ENDPOINT(patientId, id),
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

export { getStatusHistoryAction }
