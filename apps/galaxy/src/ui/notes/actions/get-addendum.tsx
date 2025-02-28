'use client'

import * as api from '@/api/api.client'
import { Addendum } from '../types'
import { GET_ADDENDUMS_AGAINST_NOTE_ID } from '@/api/endpoints'

const getAddendumDetailsAction = async (
  patientId: string,
  appointmentId: string | null,
  noteId: string,
): Promise<api.ActionResult<Addendum>> => {
  const response = await api.GET(
    GET_ADDENDUMS_AGAINST_NOTE_ID(patientId, appointmentId ?? '', noteId),
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: response.data as Addendum,
  }
}

export { getAddendumDetailsAction }
