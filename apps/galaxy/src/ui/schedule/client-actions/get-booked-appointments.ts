'use client'

import * as api from '@/api/api.client'
import { SEARCH_BOOKED_APPOINTMENTS_ENDPOINT } from '@/api/endpoints'
import { Appointment } from '@/types'
import { SCHEDULER_PAGE_SIZE_LIMIT } from '../constants'
import { AppointmentParams } from '../types'

const getBookedAppointmentsAction = async (
  params?: AppointmentParams,
  page = 1,
): Promise<api.ActionResult<Appointment[]>> => {
  const body = {
    includePatientData: true,
    includeFinancialData: true,
    includeLocation: true,
    includeStaff: true,
    includeSpecialist: true,
    includeEncounterTypes: true,
    includeServiceUnit: true,
    includeServiceGroup: true,
    includeCptCodes: true,
    includePatientNotes: true,
    ...params,
  }

  let url = SEARCH_BOOKED_APPOINTMENTS_ENDPOINT
  if (page !== undefined) {
    const pageSize = SCHEDULER_PAGE_SIZE_LIMIT ?? 50
    const offset = (page - 1) * pageSize
    url += `?limit=${pageSize}&offset=${offset}`
  }

  const response = await api.POST<Appointment[]>(url, body)
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  const total = Number(response.headers.get('psychplus-totalresourcecount'))

  return {
    state: 'success',
    data: response.data,
    total,
  }
}
export { getBookedAppointmentsAction }
