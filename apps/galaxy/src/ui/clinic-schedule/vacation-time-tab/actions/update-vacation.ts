'use server'

import * as api from '@/api'
import { VacationTime } from '../types'

const updateVacationAction = async (
  vacation: VacationTime,
): Promise<api.ActionResult<VacationTime>> => {
  const response = await api.PUT<VacationTime>(
    api.UPDATE_STAFF_VACATION_ENDPOINT(vacation.staffId, vacation.id),
    vacation,
  )
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }
  return { state: 'success', data: response.data }
}

export { updateVacationAction }
