'use server'

import * as api from '@/api'
import { PatientDemographicResponse } from '../types'

interface PatientDemographicsActionParams {
  patientId: string
  appointmentId?: string
}
const getPatientDemographicsAction = async ({
  patientId,
  appointmentId }: PatientDemographicsActionParams
): Promise<api.ActionResult<PatientDemographicResponse>> => {
  const response = await api.GET<PatientDemographicResponse>(
    api.GET_PATIENT_DEMOGRAPHICS(patientId, appointmentId),
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

export { getPatientDemographicsAction }
