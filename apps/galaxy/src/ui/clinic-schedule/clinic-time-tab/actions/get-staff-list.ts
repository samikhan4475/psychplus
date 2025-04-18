'use server'

import * as api from '@/api'
import { StaffResource } from '@/types'

const getStaffList = async (): Promise<api.ActionResult<StaffResource[]>> => {
  const response = await api.GET<StaffResource[]>(api.GET_STAFF_LIST)
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

export { getStaffList }
