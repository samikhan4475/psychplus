'use server'

import * as api from '@/api'
import { Insurance } from '@/types'
import { InsuranceParams } from '../types'

const addPolicyAction = async (
  patientId: string,
  payload: InsuranceParams,
): Promise<api.ActionResult<Insurance>> => {
  const result = await api.POST<Insurance>(
    api.ADD_PATIENT_POLICY_ENDPOINT(patientId),
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

export { addPolicyAction }
