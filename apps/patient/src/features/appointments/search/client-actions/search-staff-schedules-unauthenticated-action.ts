'use client'

import type { ActionResult } from '@psychplus-v2/api/client'
import * as api from '@psychplus-v2/api/client'
import { API_URL } from '@psychplus-v2/env'
import {
  SearhStaffAvailabilityPayload,
  StaffAppointmentAvailabilityResponse,
} from '@psychplus-v2/types'

const searchStaffSchedulesClientAction = async (
  payload: SearhStaffAvailabilityPayload,
  signal?: AbortSignal,
): Promise<ActionResult<StaffAppointmentAvailabilityResponse[]>> => {
  const { staffId, ...rest } = payload
  const response = await api.POST<StaffAppointmentAvailabilityResponse[]>(
    `${API_URL}/api/staff/${staffId}/schedules/actions/availability/unauthenticated`,
    rest,
    { signal },
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

export { searchStaffSchedulesClientAction }
