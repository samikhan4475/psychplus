'use server'

import * as api from '@/api'
import { ApiResponse } from '../create-note/types'

interface MarkErrorParams {
  patientId: string
  appointmentId?: string
  noteId?: string
}

const markToErrorAction = async (payload: MarkErrorParams) => {
  const endpoint = api.NOTE_MARK_ERROR_ENDPOINT(
    payload.appointmentId,
    payload.noteId,
    payload.patientId,
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

export { markToErrorAction }
