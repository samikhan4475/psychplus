'use server'

import * as api from '@/api'
import { ClinicSchedule, ClinicScheduleForm } from '../types'

const updateClinicSchedule = async (
  staffId: string,
  clinicTimeId: string,
  formValues: ClinicScheduleForm,
): Promise<api.ActionResult<ClinicSchedule>> => {
  const response = await api.PUT<ClinicSchedule>(
    api.UPDATE_CLINIC_SCHEDULE(staffId, clinicTimeId),
    {
      ...formValues,
      id: Number(clinicTimeId),
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

export { updateClinicSchedule }
