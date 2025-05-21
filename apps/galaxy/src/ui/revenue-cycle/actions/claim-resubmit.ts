'use server'

import * as api from '@/api'
import { Claim, InsurancePolicyPriority } from '@/types'

interface ClaimResubmitParams {
  claimId: string
  resubmissionReason: string
  insurancePolicyPriority:
    | InsurancePolicyPriority.Primary
    | InsurancePolicyPriority.Secondary
}

const claimResubmitAction = async ({
  claimId,
  resubmissionReason,
  insurancePolicyPriority,
}: ClaimResubmitParams): Promise<api.ActionResult<Claim>> => {
  const response = await api.PATCH<Claim>(api.CLAIM_RESUBMIT_ENDPOINT(claimId), {
    resubmissionReason,
    insurancePolicyPriority,
  })

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

export { claimResubmitAction }
