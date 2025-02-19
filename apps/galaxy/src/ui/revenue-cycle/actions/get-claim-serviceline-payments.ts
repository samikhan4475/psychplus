'use server'

import * as api from '@/api'
import { ClaimServiceLinePayment } from '../types'

const defaultPayload = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
  recordStatuses: ['Active'],
  isIncludeClaimServiceLine: true,
}
interface GetClaimServiceLinePaymentsParams {
  recordStatuses?: string[]
  claimPaymentId: string
}
const getClaimServiceLinePaymentsAction = async (
  payload: GetClaimServiceLinePaymentsParams,
): Promise<api.ActionResult<ClaimServiceLinePayment[]>> => {
  const response = await api.POST<ClaimServiceLinePayment[]>(
    api.GET_CLAIM_SERVICELINE_PAYMENTS,
    {
      ...defaultPayload,
      ...payload,
    },
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

export { getClaimServiceLinePaymentsAction }
