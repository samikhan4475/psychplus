'use server'

import * as api from '@/api'
import type { ClaimPayment, UpdateClaimPaymentPayload } from '../types'

const updateClaimPaymentAction = async (
  payload: UpdateClaimPaymentPayload,
): Promise<api.ActionResult<ClaimPayment>> => {
  const response = await api.PUT<ClaimPayment>(
    api.UPDATE_CLAIM_PAYMENT(payload.paymentId ?? '', payload.id ?? ''),
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

export { updateClaimPaymentAction }
