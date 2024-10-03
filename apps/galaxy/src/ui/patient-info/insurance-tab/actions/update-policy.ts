'use server'

import * as api from '@/api'
import { Insurance } from '@/types'
import { InsuranceParams } from '../types'

const updatePolicyAction = async (
  patientId: string,
  policyId: string,
  payload: InsuranceParams,
): Promise<api.ActionResult<Insurance>> => {
  const result = await api.PUT<Insurance>(
    api.UPDATE_PATIENT_POLICY_ENDPOINT(patientId, policyId),
    payload,
  )

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }
  return {
    state: 'success',
    data: result.data,
  }
}

export { updatePolicyAction }
