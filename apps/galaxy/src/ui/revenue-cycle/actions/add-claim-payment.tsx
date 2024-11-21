'use server'

import * as api from '@/api'
import type { ClaimPayment, UpdateClaimPaymentPayload } from '../types'

interface AddCaimPaymentActionParams {
  payload: UpdateClaimPaymentPayload
  paymentId: string
}

const addClaimPaymentAction = async ({
  payload,
  paymentId,
}: AddCaimPaymentActionParams): Promise<api.ActionResult<ClaimPayment>> => {
  const response = await api.POST<ClaimPayment>(
    api.ADD_CLAIM_PAYMENT(paymentId),
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

export { addClaimPaymentAction }
