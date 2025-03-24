'use server'

import * as api from '@/api'
import { Appointment } from '@/types'

const getPatientVisitsAction = async (
  patientId: string,
): Promise<api.ActionResult<Appointment[]>> => {
  const payload = {
    isIncludeMetadataResourceChangeControl: true,
    isIncludeMetadataResourceIds: true,
    isIncludeMetadataResourceStatus: true,
    patientIds: [parseInt(patientId)],
    includePatientData: true,
    includeFinancialData: true,
    includeLocation: true,
    includeStaff: true,
    includeEncounterTypes: true,
    includeServiceUnit: true,
    includeServiceGroup: true,
    includeCptCodes: true,
    includePatientTransactions: true,
    includePatientNotes: true,
  }

  const response = await api.POST<Appointment[]>(
    api.SEARCH_BOOKED_APPOINTMENTS_ENDPOINT,
    payload,
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

export { getPatientVisitsAction }
