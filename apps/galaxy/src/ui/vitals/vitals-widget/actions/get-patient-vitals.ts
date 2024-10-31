'use server'

import * as api from '@/api'
import type { PatientVital } from '../types'

interface GetPatientVitalsParams {
  payload: {
    patientId: string
    appointmentId: number
    recordStatuses?: string[]
    fromDateTime?: string
    toDateTime?: string
  }
}

const getPatientVitalsAction = async ({
  payload,
}: GetPatientVitalsParams): Promise<api.ActionResult<PatientVital[]>> => {
  const response = await api.POST<PatientVital[]>(
    `${api.GET_PATIENT_VITALS_ENDPOINT}`,
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

export { getPatientVitalsAction }
