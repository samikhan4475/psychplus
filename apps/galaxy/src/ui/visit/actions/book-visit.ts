'use server'

import * as api from '@/api'
import { BookVisitPayload, BookVisitResponse } from '../types'

const bookVisitAction = async ({
  ...rest
}: BookVisitPayload): Promise<api.ActionResult<BookVisitResponse[]>> => {
  const payload = {
    ...rest,
  }
  const response = await api.POST<BookVisitResponse[]>(
    api.BOOK_APPOINTMENT(rest.patientId),
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
