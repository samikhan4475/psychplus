'use server'

import * as api from '@/api'
import { PayerPlanAddressResponse } from '@/types'

const updatePayerPlanAddressAction = async (
  payload: Partial<PayerPlanAddressResponse>,
  payerId: string,
  payerAddressId: string,
): Promise<api.ActionResult<PayerPlanAddressResponse>> => {

  const response = await api.PUT<PayerPlanAddressResponse>(
    api.UPDATE_PAYER_PLAN_ADDRESS(payerId, payerAddressId),
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

export { updatePayerPlanAddressAction }
