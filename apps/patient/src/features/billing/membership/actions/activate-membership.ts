'use server'

import * as api from '@psychplus-v2/api'
import { ActionResult } from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'

type ActivateMembershipParams = {
  type: string
  paymentMethod: string
  paymentDate: string
  permanentTransactionId: string
  subscriptionId: string
}

const activateMembership = async (
  params: ActivateMembershipParams,
): Promise<ActionResult<void>> => {
  const result = await api.POST(`${API_URL}/api/users/self/membership`, params)

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

export { activateMembership }
