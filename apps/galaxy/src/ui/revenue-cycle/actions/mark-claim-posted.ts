'use server'

import * as api from '@/api'

const markClaimPostedAction = async (claimPaymentId: string) => {
  const response = await api.POST(api.MARK_CLAIM_POSTED(claimPaymentId), {})

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
  }
}

export { markClaimPostedAction }
