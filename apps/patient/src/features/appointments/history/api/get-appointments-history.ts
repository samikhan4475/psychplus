'use server'

import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { Appointment } from '@psychplus-v2/types'

interface AppointmentsHistoryApiResponse {
  previousAppointments: Appointment[]
}

const getAppointmentsHistory = (page: number, limit = 10) => {
  const offset = (page - 1) * limit
  const url = new URL(`${API_URL}/api/patients/self/appointments/history`)
  url.searchParams.append('limit', String(limit))
  url.searchParams.append('offset', String(offset))
  return api.POST<AppointmentsHistoryApiResponse>(url.toString(), {
    isIncludeEncounterTypes: true,
    isIncludePatientTransactions: true,
  })
}

export { getAppointmentsHistory }
