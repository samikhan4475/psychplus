'use client'

import * as api from '@/api/api.client'
import { GET_NOTES_ENDPOINT } from '@/api/endpoints'
import { NOTES_TABLE_PAGE_SIZE } from '../constants'
import type {
  GetPatientNotesParams,
  GetPatientNotesResponse,
  PatientNotes,
} from '../types'

const getStaffNotesAction = async (
  payload: GetPatientNotesParams,
): Promise<api.ActionResult<GetPatientNotesResponse>> => {
  const { page, ...finalPayload } = payload
  let url = GET_NOTES_ENDPOINT
  const offset = ((payload?.page ?? 1) - 1) * NOTES_TABLE_PAGE_SIZE
  url += `?limit=${NOTES_TABLE_PAGE_SIZE}&offset=${offset}`

  const response = await api.POST(url, finalPayload)

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

export { getStaffNotesAction }
