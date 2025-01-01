'use server'

import * as api from '@/api'
import { BookVisitPayload, BookVisitResponse } from '@/types'

const updateVisitAction = async ({
  ...rest
}: BookVisitPayload): Promise<api.ActionResult<BookVisitResponse[]>> => {
  const payload = {
    ...rest,
  }
  const response = await api.PUT<BookVisitResponse[]>(
    api.UPDATE_APPOINTMENT(rest.patientId, rest.appointmentId),
    payload,
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
    data: response.data,
  }
}

export { updateVisitAction }
