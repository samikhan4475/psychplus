'use server'

import * as api from '@/api'
import { Addendum } from '../types'

const getAddendumDetailsAction = async (
  patientId: string,
  appointmentId: string | null,
  noteId: string,
): Promise<api.ActionResult<Addendum>> => {
  const response = await api.GET(
    api.GET_ADDENDUMS_AGAINST_NOTE_ID(patientId, appointmentId ?? '', noteId),
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
