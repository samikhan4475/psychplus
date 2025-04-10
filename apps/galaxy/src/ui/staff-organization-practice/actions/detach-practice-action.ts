'use server'

import * as api from '@/api'
import { Practice } from '@/ui/organization-practice/types'

interface Payload {
  roleIds: string[]
}

const detachPracticeAction = async (
  payload: Payload,
  userId: string,
  id: string,
): Promise<api.ActionResult<Practice>> => {
  const response = await api.POST<Practice>(
    api.DETACH_PRACTICE_STAFF_ENDPOINT(userId, id),
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

export { detachPracticeAction }
