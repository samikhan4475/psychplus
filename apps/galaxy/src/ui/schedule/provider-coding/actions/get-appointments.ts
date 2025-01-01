'use server'

import { getLocalTimeZone, today } from '@internationalized/date'
import * as api from '@/api'
import { AppointmentParams } from '../../types'
import { Appointment } from '@/types'

const getAppointmentsAction = async (
  params?: AppointmentParams,
): Promise<api.ActionResult<Appointment[]>> => {
  const startDate = today(getLocalTimeZone())
  const year = startDate.year
  const month = `${startDate.month}`.padStart(2, '0')
  const day = `${startDate.day}`.padStart(2, '0')

  const body = {
    startingDate: `${year}-${month}-${day}`,
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
    isServiceTimeDependant: false,
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
export { getAppointmentsAction }
