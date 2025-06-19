'use server'

import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { Appointment } from '../types'

interface AppointmentsResponse {
  appointments: Appointment[]
}

const getUpcomingAppointmentsAction = async () => {
  const result = await api.POST<AppointmentsResponse>(
    `${API_URL}/api/appointments/upcoming/search`,
    {},
  )

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

export { getUpcomingAppointmentsAction }
