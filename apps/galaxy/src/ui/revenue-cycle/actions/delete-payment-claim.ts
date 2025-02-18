'use server'

import * as api from '@/api'
import { Claim } from '@/types'

interface DeletePaymentClaimParams {
  paymentId: string
  claimPaymentId: string
}
const deletePaymentClaimAction = async ({
  paymentId,
  claimPaymentId,
}: DeletePaymentClaimParams): Promise<api.ActionResult<Claim>> => {
  const response = await api.DELETE<Claim>(
    api.UPDATE_CLAIM_PAYMENT(paymentId, claimPaymentId),
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

export { deletePaymentClaimAction }
