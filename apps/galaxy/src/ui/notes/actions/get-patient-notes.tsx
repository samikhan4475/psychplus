'use client'

import * as api from '@/api/api.client'
import { GET_DETAILED_NOTE_ENDPOINT } from '@/api/endpoints'
import type {
  GetPatientNotesParams,
  GetPatientNotesResponse,
  PatientNotes,
} from '../types'

const getPatientNotesAction = async (
  payload: GetPatientNotesParams,
): Promise<api.ActionResult<GetPatientNotesResponse>> => {
  const response = await api.POST(
    `${GET_DETAILED_NOTE_ENDPOINT(payload.patientId)}`,
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
      total: Number(response.headers.get('psychplus-totalresourcecount')),
    },
  }
}

export { getPatientNotesAction }
