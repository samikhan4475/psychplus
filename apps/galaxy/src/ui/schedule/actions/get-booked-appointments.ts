'use server'

import * as api from '@/api'
import { AppointmentParams } from '../types'
import { Appointment } from '@/types'

const getBookedAppointmentsAction = async (params?: AppointmentParams): Promise<
  api.ActionResult<Appointment[]>
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
    ...params,
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
