'use server'

import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { Appointment } from '@psychplus-v2/types'
import { BookAppointmentPayload } from '@psychplus/appointments'

interface BookAppointmentProps {
  payload: BookAppointmentPayload
  headers: HeadersInit
}

interface BookAppointmentResponse {
  appointments: Appointment[]
}

const bookAppointmentAction = async ({
  payload,
  headers,
}: BookAppointmentProps) => {
  const result = await api.POST<BookAppointmentResponse>(`${API_URL}/api/appointments/book`, payload, {
    headers,
  })

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  return {
    state: 'success',
    data: result.data,
  }
}

export { bookAppointmentAction }
