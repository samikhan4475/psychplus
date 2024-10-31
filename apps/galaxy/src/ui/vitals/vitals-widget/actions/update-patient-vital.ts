'use server'

import * as api from '@/api'
import type { PatientVital } from '../types'

const updatePatientVitalAction = async (
  payload: PatientVital,
): Promise<api.ActionResult<PatientVital>> => {
  const response = await api.PUT<PatientVital>(
    `${api.UPDATE_PATIENT_VITAL_ENDPOINT(
      String(payload.patientId),
      String(payload.id),
    )}`,
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

export { updatePatientVitalAction }
