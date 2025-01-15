'use client'

import * as api from '@/api/api.client'
import { BOOK_APPOINTMENT } from '@/api/endpoints'
import { BookVisitPayload, BookVisitResponse } from '../types'

const bookVisitAction = async ({
  ...rest
}: BookVisitPayload): Promise<api.ActionResult<BookVisitResponse[]>> => {
  const payload = {
    ...rest,
  }
  const response = await api.POST<BookVisitResponse[]>(
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
