'use server'

import * as api from '@/api'
import { Staff } from '@/ui/staff-management/types'
import { StaffUpdatePayload } from '../types'

interface StaffUpdateParams {
  staffId: string
  payload: Partial<StaffUpdatePayload>
}
const updateStaffAction = async ({
  staffId,
  payload,
}: StaffUpdateParams): Promise<api.ActionResult<Staff>> => {
  const response = await api.PUT<Staff>(
    api.DELETE_STAFF_ENDPOINT(staffId),
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

export { updateStaffAction }
