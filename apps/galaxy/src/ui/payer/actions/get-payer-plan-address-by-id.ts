'use server'

import * as api from '@/api'
import { PayerPlanAddressResponse } from '@/types'

const getPayerPlanAddressById = async (
  payerId: string,
  payerAddressId: string,
): Promise<api.ActionResult<PayerPlanAddressResponse>> => {

  const response = await api.GET<PayerPlanAddressResponse>(
    api.UPDATE_PAYER_PLAN_ADDRESS(payerId, payerAddressId)
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

export { getPayerPlanAddressById }
