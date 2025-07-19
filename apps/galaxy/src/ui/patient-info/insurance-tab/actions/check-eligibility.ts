'use server'

import * as api from '@/api'
import { Sort } from '@/types'
import {
  EligibilityDetailResponseModel,
  EligibilityRequestPayload,
} from '../dialogs/check-eligibility-dialog/types'

interface CheckEligibilityParams {
  payload?: Partial<EligibilityRequestPayload>
  page?: number
  sort?: Sort
  pageSize?: number
}

const checkEligibilityAction = async ({
  payload,
}: CheckEligibilityParams): Promise<
  api.ActionResult<EligibilityDetailResponseModel>
> => {
  const result = await api.POST<EligibilityDetailResponseModel>(
    api.ELIGIBILITY_CHECK_ENDPOINT(payload?.patientId ?? ''),
    payload,
  )

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

export { checkEligibilityAction }
