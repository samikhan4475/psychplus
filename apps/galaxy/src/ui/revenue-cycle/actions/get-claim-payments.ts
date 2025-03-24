'use server'

import * as api from '@/api'
import { ClaimPayment } from '../types'

const defaultPayload = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
  isIncludeClaim: true,
  isIncludeServiceLinePayment: true,
  isIncludePatient:true
}

const getClaimPaymentsAction = async (
  paymentId: string,
): Promise<api.ActionResult<ClaimPayment[]>> => {
  const response = await api.POST<ClaimPayment[]>(api.GET_CLAIM_PAYMENTS, {
    ...defaultPayload,
    paymentId,
  })

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

export { getClaimPaymentsAction }
