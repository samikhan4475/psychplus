'use server'

import * as api from '@/api'
import type { StaffResource } from '@/types'

const getStaffAction = async (
  staffId: string,
): Promise<api.ActionResult<StaffResource>> => {
  const response = await api.GET<StaffResource>(
    api.GET_STAFF_PROFILE_ENDPOINT(staffId),
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

export { getStaffAction }
