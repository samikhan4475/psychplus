'use server'

import * as api from '@/api'
import { StaffResource } from '@/types'

const getStaffAction = async (): Promise<api.ActionResult<StaffResource[]>> => {
  const result = await api.GET<StaffResource[]>(api.GET_ALL_STAFF_ENDPOINT)

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
