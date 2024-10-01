'use server'

import { getLocalTimeZone, today } from '@internationalized/date'
import * as api from '@/api'
import { Appointment } from '../types'

const getBookedAppointmentsAction = async (): Promise<
  api.ActionResult<Appointment[]>
> => {
  const startDate = today(getLocalTimeZone())
  const year = startDate.year
  const month = `${startDate.month}`.padStart(2, '0')
  const day = `${startDate.day}`.padStart(2, '0')

  const body = {
    isIncludeMetadataResourceChangeControl: true,
    isIncludeMetadataResourceIds: true,
    isIncludeMetadataResourceStatus: true,
    startingDate: `${year}-${month}-${day}`,
    includePatientData: true,
    includeFinancialData: true,
    includeLocation: true,
    includeStaff: true,
    includeSpecialist: true,
    includeEncounterTypes: true,
    includeServiceUnit: true,
    includeServiceGroup: true,
    includePatientNotes: true,
  }

  const response = await api.POST<Appointment[]>(
    api.SEARCH_BOOKED_APPOINTMENTS_ENDPOINT,
    body,
  )
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: response.data,
  }
}

export { getBookedAppointmentsAction }
