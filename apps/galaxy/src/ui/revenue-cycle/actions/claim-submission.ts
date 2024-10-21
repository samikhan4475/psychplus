'use server'

import * as api from '@/api'
import { ClaimSubmissionPayload, ClaimSubmissionResponse } from '../types'

const claimSubmissionAction = async (
  payload: ClaimSubmissionPayload,
): Promise<api.ActionResult<ClaimSubmissionResponse>> => {
  const response = await api.POST<ClaimSubmissionResponse>(
    api.CLAIM_SUBMIT_ENDPOINT,
    payload,
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

export { claimSubmissionAction }
