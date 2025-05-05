'use client'

import * as api from '@/api/api.client'
import { GET_ALL_STAFF_ENDPOINT } from '@/api/endpoints'
import { StaffResource } from '@/types'

const getStaffAction = async (
  signal: AbortSignal,
): Promise<api.ActionResult<StaffResource[]>> => {
  const result = await api.GET<StaffResource[]>(GET_ALL_STAFF_ENDPOINT, {
    signal,
  })

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

export { getStaffAction }
