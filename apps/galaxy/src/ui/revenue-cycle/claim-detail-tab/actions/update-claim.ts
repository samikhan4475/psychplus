'use server'

import * as api from '@/api'
import { ClaimUpdateApiResponse } from '@/types'

const updateClaimAction = async (
  claimId: string,
  payload: ClaimUpdateApiResponse,
): Promise<api.ActionResult<ClaimUpdateApiResponse>> => {
  const result = await api.PUT<ClaimUpdateApiResponse>(
    api.UPDATE_CLAIM(claimId),
    payload,
  )
  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
      status: result.status,
    }
  }
  return {
    state: 'success',
    data: result.data,
  }
}

export { updateClaimAction }
