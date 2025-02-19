'use server'

import * as api from '@/api'
import { VacationPayload, VacationTime } from '../types'

const editVacationAction = async (
  vacationId: number,
  payload: VacationPayload,
): Promise<api.ActionResult<VacationTime>> => {
  const response = await api.PUT<VacationTime>(
    api.EDIT_VACATION_ENDPOINT(String(payload.staffId), vacationId),
    payload,
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }
  return { state: 'success', data: response.data }
}

export { editVacationAction }
