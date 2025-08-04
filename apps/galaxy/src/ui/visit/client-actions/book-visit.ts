'use client'

import * as api from '@/api/api.client'
import { BOOK_APPOINTMENT } from '@/api/endpoints'
import { AppointmentData } from '../add-visit/types'
import { BookVisitPayload, BookVisitResponse } from '../types'

const bookVisitAction = async ({
  ...rest
}: BookVisitPayload): Promise<api.ActionResult<AppointmentData>> => {
  const payload = {
    ...rest,
  }
  const response = await api.POST<AppointmentData>(
    BOOK_APPOINTMENT(rest.patientId),
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

export { bookVisitAction }
