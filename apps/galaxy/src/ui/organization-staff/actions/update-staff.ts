'use server'

import * as api from '@/api'
import type { Staff } from '../types'

const updateStaffAction = async (
  payload: Partial<Staff>,
  id: string,
): Promise<api.ActionResult<Staff>> => {
  const response = await api.PUT<Staff>(api.UPDATE_STAFF_ENDPOINT(id), payload)

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

export { updateStaffAction }
