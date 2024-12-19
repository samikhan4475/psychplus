'use server'

import * as api from '@/api'
import { NoteDocuments } from '../types'

interface GetDocumentParams {
  patientId: string
  appointmentId: string
}

const getNoteDocumentsAction = async (
  payload: GetDocumentParams,
): Promise<api.ActionResult<NoteDocuments>> => {
  const { patientId, appointmentId, ...restPayload } = payload

  const response = await api.POST(
    api.GET_NOTE_DOCUMENTS_ENDPOINT(patientId, appointmentId || null),
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
    data: response.data as NoteDocuments,
  }
}

export { getNoteDocumentsAction }
