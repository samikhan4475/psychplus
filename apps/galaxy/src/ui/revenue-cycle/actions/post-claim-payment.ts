'use server'

import * as api from '@/api'
import { PostApiResponse } from '../insurance-payment-detail-tab/types'

interface PostClaimPaymentActionParams {
  paymentId: string
  claimPaymentId: string
}

const postClaimPaymentAction = async ({
  claimPaymentId,
  paymentId,
}: PostClaimPaymentActionParams): Promise<
  api.ActionResult<PostApiResponse>
> => {
  const result = await api.POST<PostApiResponse>(
    api.POST_CLAIM_PAYMENT(paymentId, claimPaymentId),
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

export { postClaimPaymentAction }
