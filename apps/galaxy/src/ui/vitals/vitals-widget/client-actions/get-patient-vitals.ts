'use client'

import * as api from '@/api/api.client'
import { GET_PATIENT_VITALS_ENDPOINT } from '@/api/endpoints'
import type { PatientVital } from '../types'

interface GetPatientVitalsParams {
  payload: {
    patientId: string
    recordStatuses?: string[]
    fromDateTime?: string
    toDateTime?: string
    vitalIds?: number[]
  }
}

const getPatientVitalsAction = async ({
  payload,
}: GetPatientVitalsParams): Promise<api.ActionResult<PatientVital[]>> => {
  const response = await api.POST<PatientVital[]>(
    GET_PATIENT_VITALS_ENDPOINT,
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
