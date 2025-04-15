'use server'

import * as api from '@/api'
import { StaffResource } from '@/types'

const getStaffById = async (
  id: number,
): Promise<api.ActionResult<StaffResource>> => {
  const response = await api.GET<StaffResource>(api.GET_STAFF_BY_ID(id))
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

export { getStaffById }
