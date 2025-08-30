'use server'

import * as api from '@/api'
import type { ClaimAuditHistory, PaymentHistoryPayload } from '../types'

const defaultPayload = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
  isIncludeCreateHistory: false,
}

const getClaimPaymentHistoryListAction = async (
  payload: PaymentHistoryPayload,
): Promise<api.ActionResult<ClaimAuditHistory[]>> => {
  const url = new URL(api.GET_CLAIMPAYMENTS_HISTORY_LIST_ENDPOINT(payload.id))
  url.searchParams.append('orderBy', 'updatedOn asc')

  const response = await api.POST<ClaimAuditHistory[]>(url.toString(), {
    ...defaultPayload,
    ...payload,
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

export { getClaimPaymentHistoryListAction }
