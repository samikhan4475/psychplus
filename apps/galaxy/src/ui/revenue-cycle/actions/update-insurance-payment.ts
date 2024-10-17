'use server'

import * as api from '@/api'
import type { InsurancePayment } from '../types'

const updateInsurancePaymentAction = async (
  payload: Partial<InsurancePayment>,
  id: string,
): Promise<api.ActionResult<InsurancePayment>> => {
  const response = await api.PUT<InsurancePayment>(
    api.UPDATE_INSURANCE_PAYMENT_ENDPOINT(id),
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

export { updateInsurancePaymentAction }
