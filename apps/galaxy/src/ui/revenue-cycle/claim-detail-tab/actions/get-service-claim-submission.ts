'use server'

import * as api from '@/api'
import { ClaimSubmissionResponse } from '@/types'

const getClaimSubmissionResponse = async (
  claimId: string,
): Promise<api.ActionResult<ClaimSubmissionResponse[]>> => {
  const url = new URL(api.GET_CLAIM_SUBMISSION_RESPONSE(claimId))
  const response = await api.POST<ClaimSubmissionResponse[]>(url.toString())
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

export { getClaimSubmissionResponse }
