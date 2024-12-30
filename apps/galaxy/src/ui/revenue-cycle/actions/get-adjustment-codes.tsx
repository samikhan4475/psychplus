'use server'

import * as api from '@/api'
import { PaymentAdjustment } from '../insurance-payment-detail-tab/types'

interface AdjustmentCodesParams {
  practiceIds: string[]
  recordStatuses: string[]
}
const getAdjustmentCodesAction = async (
  payload: AdjustmentCodesParams,
): Promise<api.ActionResult<PaymentAdjustment[]>> => {
  const response = await api.POST<PaymentAdjustment[]>(
    api.GET_PAYMENT_ADJUSTMENT_CODES,
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

export { getAdjustmentCodesAction }
