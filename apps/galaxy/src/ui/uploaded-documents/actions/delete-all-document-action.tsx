'use server'

import * as api from '@/api'
import { Documents } from '../types'

interface deleteAllDocumentsActionParams {
  patientId: number
  appointmentId: number
  data: string[]
}

const deleteAllDocumentsAction = async ({
  patientId,
  appointmentId,
  data
}: deleteAllDocumentsActionParams): Promise<api.ActionResult<Documents[]>> => {
  const response = await api.DELETE<Documents[]>(api.DELETE_QUICK_NOTE_DOCUMENT(patientId, appointmentId), data);
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }
  return {
    state: 'success',
    data: response.data,
  }
}

export { deleteAllDocumentsAction }

