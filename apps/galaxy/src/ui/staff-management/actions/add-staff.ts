'use server'

import * as api from '@/api'
import type { Staff } from '../types'

const addStaffAction = async (
  payload: Partial<Staff>,
): Promise<api.ActionResult<Staff>> => {
  const response = await api.POST<Staff>(api.GET_ALL_STAFF_ENDPOINT, payload)
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

export { addStaffAction }
