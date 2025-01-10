import * as api from '@/api'
import { StaffResource } from '@/types'

const getStaff = async (
  staffId: number,
): Promise<api.ActionResult<StaffResource>> => {
  const response = await api.GET<StaffResource>(
    api.GET_STAFF_USER_ENDPOINT(staffId),
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

export { getStaff }
