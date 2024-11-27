'use server'

import * as api from '@/api'
import type { GetPatientNotesResponse, PatientNotes } from '../types'

interface GetPatientNotesParams {
  patientId: string
  dateFrom?: string
  dateTo?: string
  authorIds?: number[]
  visitTypeIds?: number[]
  locationIds?: string[]
  locationServicesIds?: string[]
  stateIds?: string[]
  practiceIds?: string[]
  organizationIds?: string[]
  status?: string
}

const getPatientNotesAction = async (
  payload: GetPatientNotesParams,
): Promise<api.ActionResult<GetPatientNotesResponse>> => {
  const response = await api.POST(
    `${api.GET_DETAILED_NOTE_ENDPOINT(payload.patientId)}`,
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
    data: {
      notes: response.data as PatientNotes[],
    },
  }
}

export { getPatientNotesAction, type GetPatientNotesParams }
