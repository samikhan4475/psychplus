'use server'

import * as api from '@/api'
import { PatientAppointments, Sort } from '@/types'
import { AppointmentParams } from '@/ui/schedule/types'

const getPatientAppointments = async (
  params?: AppointmentParams,
  sort?: Sort,
): Promise<api.ActionResult<PatientAppointments[]>> => {
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
    includePatientTransactions: true,
    isShowActiveVisits: true,
    IsIncludeEncounterNotes: true,
    IsincludeLocation: true,
    IsIncludeEncounterTypes: true,
    ...params,
  }
  const patientId = body?.patientIds?.[0]

  const url = new URL(api.SEARCH_PATIENT_APPOINTMENTS(String(patientId)))
  if (sort) {
    url.searchParams.append('orderBy', `${sort.column} ${sort.direction}`)
  }
  const response = await api.POST<PatientAppointments[]>(url.toString(), body)
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
export { getPatientAppointments }
