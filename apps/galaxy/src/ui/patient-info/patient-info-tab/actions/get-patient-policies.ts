'use server'

import * as api from '@/api'
import { PatientInsuranceInfo } from '@/types'

const getPatientPoliciesAction = async (
  patientId: string,
): Promise<api.ActionResult<PatientInsuranceInfo>> => {
  const response = await api.GET<PatientInsuranceInfo>(
    api.GET_PATIENT_POLICIES(patientId),
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

export { getPatientPoliciesAction }
