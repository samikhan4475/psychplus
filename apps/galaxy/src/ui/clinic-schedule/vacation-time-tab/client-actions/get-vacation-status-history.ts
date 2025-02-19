'use client'

import * as api from '@/api/api.client'
import { VacationTime } from '../types'
import { GET_STAFF_VACATION_HISTORY_ENDPOINT } from '@/api/endpoints'

const getVacationStatusHistory = async (
  vacationId: string,
): Promise<api.ActionResult<VacationTime[]>> => {
  const response = await api.POST<VacationTime[]>(
    GET_STAFF_VACATION_HISTORY_ENDPOINT(vacationId),
    {},
  )
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }
  return { state: 'success', data: response.data }
}

export { getVacationStatusHistory }
