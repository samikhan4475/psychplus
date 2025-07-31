'use client'

import * as api from '@/api/api.client'
import { SEARCH_BOOKED_APPOINTMENTS_ENDPOINT } from '@/api/endpoints'
import { Appointment } from '@/types'
import { AppointmentParams } from '../../types'

const getAppointmentsAction = async (
  params?: AppointmentParams,
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
    isServiceTimeDependant: false,
    ageGroups: age ?? undefined,
    ...rest,
  }
  const response = await api.POST<Appointment[]>(
    SEARCH_BOOKED_APPOINTMENTS_ENDPOINT,
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
