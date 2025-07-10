'use server'

import * as api from '@/api'
import { sanitizeFormData } from '@/utils'
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
  isIncludeUnlinkedClaims?: boolean,
): Promise<api.ActionResult<ClaimPayment[]>> => {
  const payload = {
    ...defaultPayload,
    paymentId,
    ...(isIncludeUnlinkedClaims !== undefined && { isIncludeUnlinkedClaims }),
  }
  const response = await api.POST<ClaimPayment[]>(api.GET_CLAIM_PAYMENTS, {
    ...sanitizeFormData(payload),
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
