'use server'

import * as api from '@/api'
import { ClaimAuditHistory, ClaimNoteHistoryPayload } from '../../types'

const getClaimNoteHistoryAction = async (
  payload: ClaimNoteHistoryPayload,
): Promise<api.ActionResult<ClaimAuditHistory[]>> => {
  const response = await api.POST<ClaimAuditHistory[]>(
    api.GET_CLAIMS_CLAIM_NOTES_HISTORY,
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

export { getClaimNoteHistoryAction }
