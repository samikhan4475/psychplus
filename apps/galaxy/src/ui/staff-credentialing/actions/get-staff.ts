'use server'

import * as api from '@/api'
import type { Staff } from '../../staff-management/types'

const getStaffAction = async (
  staffId: string,
): Promise<api.ActionResult<Staff>> => {
  const response = await api.GET<Staff>(api.GET_STAFF_PROFILE_ENDPOINT(staffId))
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
