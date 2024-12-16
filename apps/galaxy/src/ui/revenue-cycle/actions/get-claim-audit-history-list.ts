'use server'

import * as api from '@/api'
import type { ClaimAuditHistory, ClaimAuditHistoryPayload } from '../types'

const getClaimAuditHistoryListAction = async (
  payload: ClaimAuditHistoryPayload,
): Promise<api.ActionResult<ClaimAuditHistory[]>> => {
  const response = await api.POST<ClaimAuditHistory[]>(
    api.GET_CLAIMS_AUDIT_HISTORY_LIST_ENDPOINT,
    {
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

export { getClaimAuditHistoryListAction }
