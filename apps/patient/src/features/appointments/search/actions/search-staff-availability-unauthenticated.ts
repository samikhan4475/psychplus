'use server'

import * as api from '@psychplus-v2/api'
import type { ActionResult } from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { SearhStaffAvailabilityPayload, StaffAppointmentAvailabilityResponse } from '@psychplus-v2/types'

const searchStaffAvailabilityUnauthenticatedAction = async (
  payload: SearhStaffAvailabilityPayload,
): Promise<ActionResult<StaffAppointmentAvailabilityResponse[]>> => {
  const { staffId, ...rest } = payload
  const result = await api.POST<StaffAppointmentAvailabilityResponse[]>(
    `${API_URL}/api/staff/${staffId}/schedules/actions/availability/unauthenticated`,
    rest,
  )
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

export { searchStaffAvailabilityUnauthenticatedAction }
