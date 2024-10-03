'use server'

import * as api from '@/api'
import { InsurancePayer } from '@/types'

const getInsurancePayerPlans = async (
  payerId: string,
): Promise<api.ActionResult<InsurancePayer>> => {
  const result = await api.GET<InsurancePayer>(
    api.GET_INSURANCE_PAYER_PLANS(payerId),
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

export { getInsurancePayerPlans }
