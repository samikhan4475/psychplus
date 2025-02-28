'use client'

import * as api from '@/api/api.client'
import { ApiResponse } from '../create-note/types'
import { SENT_TO_COSIGNER_NOTE_ENDPOINT } from '@/api/endpoints'

interface SentToCosignerParams {
  patientId: string
  appointmentId?: string
  noteId?: string
  staffId: string
}

const sendToCosignerAction = async (payload: SentToCosignerParams) => {
  const endpoint = SENT_TO_COSIGNER_NOTE_ENDPOINT(
    payload.patientId,
    payload.appointmentId,
    payload.noteId,
    payload.staffId,
  )
  const response = await api.POST<ApiResponse>(endpoint)
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: {
      note: response.data,
    },
  }
}

export { sendToCosignerAction }
