'use server'

import * as api from '@/api'
import { PayerPlanAddressResponse } from '@/types'

const addPayerPlanAddressAction = async (
  payload: Partial<PayerPlanAddressResponse>,
  payerId: string,
): Promise<api.ActionResult<PayerPlanAddressResponse>> => {
  const response = await api.POST<PayerPlanAddressResponse>(
    api.ADD_PAYER_PLAN_ADDRESS(payerId),
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

export { addPayerPlanAddressAction }
