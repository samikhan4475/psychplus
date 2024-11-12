'use server'

import * as api from '@/api'
import { PatientVital } from '@/ui/vitals'

const getPatientVitalsAction = async (
  patientId: string,
): Promise<api.ActionResult<PatientVital[]>> => {
  const response = await api.POST<PatientVital[]>(
    `${api.GET_PATIENT_VITALS_ENDPOINT}`,
    {
      patientId,
    },
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
