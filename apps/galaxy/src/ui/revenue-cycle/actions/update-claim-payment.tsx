'use server'

import * as api from '@/api'
import type { ClaimPayment, UpdateClaimPaymentPayload } from '../types'

interface UpdateClaimActionParams {
  payload: UpdateClaimPaymentPayload
  paymentId: string
  id: string
}
const updateClaimPaymentAction = async ({
  payload,
  paymentId,
  id,
}: UpdateClaimActionParams): Promise<api.ActionResult<ClaimPayment>> => {
  const response = await api.PUT<ClaimPayment>(
    api.UPDATE_CLAIM_PAYMENT(paymentId, id),
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

export { updateClaimPaymentAction }
