'use server'

import * as api from '@/api'
import { PayerPlanAddressResponse } from '@/types'

const getPayersPlanAddressesListAction = async (
  payerId: string,
): Promise<api.ActionResult<PayerPlanAddressResponse[]>> => {
  const response = await api.GET<PayerPlanAddressResponse[]>(
    api.GET_PAYER_PLAN_ADDRESS(payerId),
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

export { getPayersPlanAddressesListAction }
