'use server'

import * as api from '@/api'
import { PracticeResource } from '@/types'

const updatePracticeAction = async (
  payload: Partial<PracticeResource>,
  organizationId: string,
  id: string,
): Promise<api.ActionResult<PracticeResource>> => {
  const response = await api.PUT<PracticeResource>(
    api.UPDATE_PRACTICE_ENDPOINT(organizationId, id),
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
