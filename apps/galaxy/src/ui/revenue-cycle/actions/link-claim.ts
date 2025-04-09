'use server'

import * as api from '@/api'

const linkClaimAction = async (
  claimId: string,
  appointmentId: string,
): Promise<api.ActionResult<void>> => {
  const result = await api.POST(api.LINK_CLAIM(claimId, appointmentId))

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

export { linkClaimAction }
