'use server'

import * as api from '@/api'
import type { ClaimAuditHistory, PaymentHistoryPayload } from '../types'

const defaultPayload = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
  isIncludeCreateHistory: true,
}
const getPaymentHistoryListAction = async (
  payload: PaymentHistoryPayload,
): Promise<api.ActionResult<ClaimAuditHistory[]>> => {
  const response = await api.POST<ClaimAuditHistory[]>(
    api.GET_PAYMENTS_HISTORY_LIST_ENDPOINT(payload.id),
    { ...defaultPayload, ...payload },
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

export { getPaymentHistoryListAction }
