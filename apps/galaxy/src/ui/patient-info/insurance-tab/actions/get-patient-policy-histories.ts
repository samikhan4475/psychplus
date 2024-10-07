'use server'

import * as api from '@/api'
import { RawInsurance } from '@/types'
import { InsuranceHistoryParams } from '../types'

const getPatientPolicyHistoriesAction = async (
  patientId: string,
  policyId: string,
  payload: InsuranceHistoryParams,
): Promise<api.ActionResult<RawInsurance[]>> => {
  const response = await api.POST<RawInsurance[]>(
    api.GET_PATIENT_POLICY_HISTORY_ENDPOINT(patientId, policyId),
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

export { getPatientPolicyHistoriesAction }
