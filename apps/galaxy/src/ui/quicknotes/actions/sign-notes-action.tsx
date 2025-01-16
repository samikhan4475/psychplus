'use server'

import * as api from '@/api'
import { QuickNoteSectionItem } from '@/types'

interface signNoteActionParams {
  patientId: string
  appointmentId: string
  signedByUserId: number
  signedDate?: string
  isError?: boolean
  coSignedByUserId?: string
}

const signNoteAction = async (
  signPayload: signNoteActionParams,
): Promise<api.ActionResult<QuickNoteSectionItem[]>> => {
  const {
    patientId,
    appointmentId,
    isError,
    signedDate,
    coSignedByUserId,
    signedByUserId,
  } = signPayload

  const url = new URL(api.NOTE_SIGN_ENDPOINT(patientId, appointmentId))
  if (isError) url.searchParams.append('errormark', 'true')

  const response = await api.PUT<QuickNoteSectionItem[]>(url.toString(), {
    patientId: parseInt(patientId),
    appointmentId: parseInt(appointmentId),
    signedByUserId,
    coSignedByUserId,
    signedDate,
  })
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

export { signNoteAction }
