'use server'

import * as api from '@/api'
import {
  EligibilityDetailResponseModel,
  EligibilityRequestPayload,
} from '../types'

const checkEligibilityAction = async (
  payload: Partial<EligibilityRequestPayload>,
): Promise<api.ActionResult<EligibilityDetailResponseModel>> => {
  const response = await api.POST<EligibilityDetailResponseModel>(
    api.ELIGIBILITY_CHECK_ENDPOINT(payload.patientId ?? ''),
    payload,
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

export { checkEligibilityAction }
