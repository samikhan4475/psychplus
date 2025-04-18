'use server'

import * as api from '@/api'
import { ClinicSchedule, ClinicScheduleForm } from '../types'

const addClinicVisit = async (
  staffId: string,
  formValues: ClinicScheduleForm,
): Promise<api.ActionResult<ClinicSchedule>> => {
  const response = await api.POST<ClinicSchedule>(
    api.ADD_CLINIC_SCHEDULE(staffId),
    {
      ...formValues,
    },
  )
  if (response.state === 'error') {
    return {
      state: 'error',
      status: response.status,
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

export { addClinicVisit }
