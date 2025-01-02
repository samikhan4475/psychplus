'use server'

import * as api from '@/api'
import { PatientFacilityHistory } from '../types'

const getFacilityAdmissionHistoryAction = async (
  patientId: string,
  appointmentId: number,
): Promise<api.ActionResult<PatientFacilityHistory[]>> => {
  const response = await api.POST<PatientFacilityHistory[]>(
    api.GET_PATIENT_FACILITY_HISTORY(patientId, appointmentId),
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

export { getFacilityAdmissionHistoryAction }
