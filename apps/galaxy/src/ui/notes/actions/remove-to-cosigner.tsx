'use server'

import * as api from '@/api'
import { ApiResponse } from '../create-note/types'

interface RemoveToCosignerParams {
  patientId: string
  appointmentId?: string
  noteId?: string
}

const removeToCosignerAction = async (payload: RemoveToCosignerParams) => {
  const endpoint = api.REMOVE_TO_COSIGNER_NOTE_ENDPOINT(
    payload.patientId,
    payload.appointmentId,
    payload.noteId,
  )

  const response = await api.DELETE<ApiResponse>(endpoint)

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

export { removeToCosignerAction }
