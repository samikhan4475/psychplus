'use server'

import * as api from '@/api'
import { Appointment } from '@/types'
import { SCHEDULER_PAGE_SIZE_LIMIT } from '../constants'
import { AppointmentParams } from '../types'

const getBookedAppointmentsAction = async (
  params?: AppointmentParams,
  page?: number,
): Promise<api.ActionResult<Appointment[]>> => {
  const { age, ...rest } = params ?? {}
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
    ageGroups: age ?? undefined,
    ...rest,
  }
  const pageSize = page ? SCHEDULER_PAGE_SIZE_LIMIT : 0
  const pages = page ? page : 1
  const offset = (pages - 1) * pageSize
  const url = new URL(api.SEARCH_BOOKED_APPOINTMENTS_ENDPOINT)
  url.searchParams.append('limit', String(pageSize))
  url.searchParams.append('offset', String(offset))

  const response = await api.POST<Appointment[]>(url.toString(), body)
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
