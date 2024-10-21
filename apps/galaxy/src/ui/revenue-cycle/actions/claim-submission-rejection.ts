'use server'

import * as api from '@/api'
import { ErrorMessage } from '../types'

const claimSubmissionRejectionAction = async (
  claimId: string,
): Promise<api.ActionResult<ErrorMessage[]>> => {
  const response = await api.POST<ErrorMessage[]>(
    api.CLAIM_SUBMISSION_REJECTION_DETAIL_ENDPOINT(claimId),
    {},
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

export { claimSubmissionRejectionAction }
