'use server'

import * as api from '@/api'
import type { InsurancePayment } from '../types'

const addInsurancePaymentAction = async (
  payload: Partial<InsurancePayment>,
): Promise<api.ActionResult<InsurancePayment>> => {
  const response = await api.POST<InsurancePayment>(
    api.ADD_INSURANCE_PAYMENT_ENDPOINT,
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

export { addInsurancePaymentAction }
