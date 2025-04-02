'use server'

import * as api from '@/api'

const resolveDenialAction = async (
  claimServiceLinePaymentId: string,
): Promise<api.ActionResult<void>> => {
  const result = await api.PUT(api.RESOLVE_DENIAL_ENDPOINT(claimServiceLinePaymentId),{})

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

export { resolveDenialAction }
