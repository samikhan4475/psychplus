'use client'

import * as api from '@/api/api.client'
import { GET_NOTES_ENDPOINT } from '@/api/endpoints'
import type {
  GetPatientNotesParams,
  GetPatientNotesResponse,
  PatientNotes,
} from '../types'

const getStaffNotesAction = async (
  payload: GetPatientNotesParams,
): Promise<api.ActionResult<GetPatientNotesResponse>> => {
  const response = await api.POST(`${GET_NOTES_ENDPOINT()}`, payload)

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

export { getStaffNotesAction }
