'use server'

import * as api from '@/api'
import { BookedAppointment } from '../types/schedule'

const getBookedAppointmentsAction = async (): Promise<
  api.ActionResult<BookedAppointment[]>
> => {
  const body = {
    isIncludeMetadataResourceChangeControl: true,
    isIncludeMetadataResourceIds: true,
    isIncludeMetadataResourceStatus: true,
    includePatientData: true,
    includeFinancialData: true,
    includeLocation: true,
    includeStaff: true,
    includeSpecialist: true,
    includeEncounterTypes: true,
    includeServiceUnit: true,
    includeServiceGroup: true,
    includeCptCodes: true,
    includePatientTransactions: true,
    includePatientNotes: true,
  }
  const response = await api.POST<BookedAppointment[]>(
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
