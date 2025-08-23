'use server'

import * as api from '@/api'
import { PostPaymentCheckResponse } from '../insurance-payment-detail-tab/types'

const postPaymentCheckAction = async (
  paymentId: string,
): Promise<api.ActionResult<PostPaymentCheckResponse>> => {
  const result = await api.POST<PostPaymentCheckResponse>(
    api.POST_PAYMENT_CHECK_ENDPOINT(paymentId),
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

export { postPaymentCheckAction }
