'use server'

import * as api from '@/api'
import { Practice } from '@/ui/organization-practice/types'

const getAllPracticeHxListAction = async (
  practiceId: string,
): Promise<api.ActionResult<Practice[]>> => {
  const defaultParams = {
    isIncludePaymentAddressLocation: true,
    isIncludePracticeAddressLocation: true,
  }
  const response = await api.POST<Practice[]>(
    api.GET_PRACTICE_HISTORY_ENDPOINT(practiceId),
    {
      ...defaultParams,
    },
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

export { getAllPracticeHxListAction }
