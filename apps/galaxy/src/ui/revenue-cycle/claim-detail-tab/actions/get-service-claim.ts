'use server'

import * as api from '@/api'
import { ClaimUpdateApiResponse } from '@/types'

const getClaimById = async (
  claimId: string,
): Promise<api.ActionResult<ClaimUpdateApiResponse>> => {
  const response = await api.GET<ClaimUpdateApiResponse>(
    api.GET_CLAIM_BY_ID(claimId),
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

export { getClaimById }
