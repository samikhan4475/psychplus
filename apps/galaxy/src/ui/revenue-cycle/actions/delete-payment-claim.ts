'use server'

import * as api from '@/api'
import { Claim } from '@/types'

const deletePaymentClaimAction = async (
  claimPaymentId: string,
): Promise<api.ActionResult<Claim>> => {
  const response = await api.DELETE<Claim>(
    api.DELETE_CLAIM_PAYMENT(claimPaymentId),
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
