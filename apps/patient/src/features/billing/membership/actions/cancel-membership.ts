'use server'

import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'

type CancelMembershipParams = {
  reason?: string
  type: string
}

const cancelMembership = async (
  params: CancelMembershipParams,
): Promise<api.ActionResult<void>> => {
  const result = await api.DELETE(
    `${API_URL}/api/users/self/membership`,
    params,
  )

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  return {
    state: 'success',
    data: undefined,
  }
}

export { cancelMembership }
