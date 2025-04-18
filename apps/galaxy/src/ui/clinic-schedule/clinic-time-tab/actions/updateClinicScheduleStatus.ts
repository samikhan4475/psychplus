'use server'

import * as api from '@/api'
import { ClinicSchedule } from '../types'

const updateClinicScheduleStatus = async (
  staffId: string,
  clinicTimeId: number,
  status: string,
): Promise<api.ActionResult<ClinicSchedule>> => {
  const response = await api.PATCH<ClinicSchedule>(
    api.UPDATE_CLINIC_SCHEDULE_STATUS(staffId, clinicTimeId),
    {
      status,
    },
  )
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: {
      ...response.data,
    },
  }
}

export { updateClinicScheduleStatus }
