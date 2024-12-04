'use server'

import * as api from '@/api'
import { CreateSignNoteParams } from '../../types'

const getCreateNoteAction = async ({
  patientId,
  appointmentId,
  payload,
}: CreateSignNoteParams) => {
  const result = await api.POST(
    api.CREATE_NOTE_ENDPOINT(patientId, appointmentId),
    payload,
  )

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  return {
    state: 'success',
    data: result.data,
  }
}
export { getCreateNoteAction }
