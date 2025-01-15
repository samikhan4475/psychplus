'use client'

import * as api from '@/api/api.client'
import { GET_ALL_QUICK_NOTE_DOCUMENT } from '@/api/endpoints'
import { Documents } from '../types'

interface GetAllDocumentsActionParams {
  patientId: number
  appointmentId: number
  data: Documents
}

const getAllDocumentsAction = async ({
  patientId,
  appointmentId,
  data,
}: GetAllDocumentsActionParams): Promise<api.ActionResult<Documents[]>> => {
  const response = await api.POST<Documents[]>(
    GET_ALL_QUICK_NOTE_DOCUMENT(patientId, appointmentId),
    data,
    {
      ignoreHeaders: false,
    },
  )
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
