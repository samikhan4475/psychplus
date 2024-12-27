'use server'

import * as api from '@/api'
import { Documents } from '../types'

interface getAllDocumentsActionParams {
  patientId: number
  appointmentId: number
  data: Documents
}

const getAllDocumentsAction = async ({
  patientId,
  appointmentId,
  data
}: getAllDocumentsActionParams): Promise<api.ActionResult<Documents[]>> => {
  const response = await api.POST<Documents[]>(api.GET_ALL_QUICK_NOTE_DOCUMENT(patientId, appointmentId), data,
    {
      ignoreHeaders: false
    },
  );
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

export { getAllDocumentsAction }

