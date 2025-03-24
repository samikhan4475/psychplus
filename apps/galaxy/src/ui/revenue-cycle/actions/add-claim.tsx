'use server'

import * as api from '@/api'
import { ClaimAddApiRequest } from '@/types'

const addClaimAction = async (payload: ClaimAddApiRequest): Promise<api.ActionResult<ClaimAddApiRequest>> => {
  const result = await api.POST<ClaimAddApiRequest>(api.ADD_CLAIM, payload)

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }
  return {
    state: 'success',
    data: result.data,
  }
}

export { addClaimAction }
