'use server'

import * as api from '@/api'
import type { ClaimPayment, UpdateClaimPaymentPayload } from '../types'

const addClaimPaymentAction = async (
  payload: UpdateClaimPaymentPayload,
): Promise<api.ActionResult<ClaimPayment>> => {
  const response = await api.POST<ClaimPayment>(
    api.ADD_CLAIM_PAYMENT(payload.paymentId ?? '0'),
    payload,
  )
  if (response.state === 'error') {
    return {
      state: 'error',
      error: JSON.stringify(response),
    }
  }

  return {
    state: 'success',
    data: response.data,
  }
}

export { addClaimPaymentAction }
