'use server'

import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { Insurance } from '@/features/billing/payments/types'

const deleteInsurance = async (
  policyId: string,
): Promise<api.ActionResult<Insurance>> => {
  const result = await api.DELETE<Insurance>(
    `${API_URL}/api/patients/self/policies/${policyId}`,
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

export { deleteInsurance }
