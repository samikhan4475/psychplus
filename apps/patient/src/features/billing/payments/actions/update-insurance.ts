'use server'

import * as api from '@psychplus-v2/api'
import { type ActionResult } from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { Insurance } from '@/features/billing/payments/types'
import { InsuranceParams } from '.'

const updateInsuranceAction = async (
  params: InsuranceParams,
): Promise<ActionResult<Insurance>> => {
  const result = await api.PUT<Insurance>(
    `${API_URL}/api/patients/self/policies/${params.id}`,
    {
      ...params,
    },
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

export { updateInsuranceAction }
