'use client'

import * as api from '@/api/api.client'
import { NoteDetail } from '../types'
import { GET_NOTE_VIEW_ENDPOINT } from '@/api/endpoints'

interface GetNoteDetailsParams {
  patientId: string
  appointmentId?: string | null
  isIncludeDetails?: boolean
  encounterSignedNoteQueryFilters: {
    encounterNoteId?: string
  }
}

const getNoteDetailsAction = async (
  payload: GetNoteDetailsParams,
): Promise<api.ActionResult<NoteDetail>> => {
  const { patientId, appointmentId, ...restPayload } = payload

  const response = await api.POST(
    GET_NOTE_VIEW_ENDPOINT(patientId, appointmentId || null),
    restPayload,
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: response.data as NoteDetail,
  }
}

export { getNoteDetailsAction, type GetNoteDetailsParams }
