'use server'

import * as api from '@/api'
import { VacationPayload, VacationTime } from '../types'

const addVacationAction = async (
  payload: VacationPayload,
): Promise<api.ActionResult<VacationTime>> => {
  const response = await api.POST<VacationTime>(
    api.ADD_VACATION(String(payload.staffId)),
    {
      ...payload,
      duration: payload.duration.toString(),
    },
  )
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }
  return { state: 'success', data: response.data }
}

export { addVacationAction }
