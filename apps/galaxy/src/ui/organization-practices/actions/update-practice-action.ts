'use server'

import * as api from '@/api'
import { Practice } from '@/ui/organization-practice/types'

const updatePracticeAction = async (
  payload: Partial<Practice>,
  organizationId: string,
  id: string,
): Promise<api.ActionResult<Practice>> => {
  const response = await api.PUT<Practice>(
    api.UPDATE_PRACTICE_ENDPOINT(organizationId,id),
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

export { updatePracticeAction }
