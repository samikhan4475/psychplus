'use server'

import * as api from '@/api'
import { QuickNoteSectionItem } from '@/types'
import { getAuthCookies } from '@/utils/auth'

interface signNoteActionParams {
  patientId: string
  appointmentId: string
  isError?: boolean
  signedDate?: string
  coSignedByUserId?: string
}

const signNoteAction = async (
  signPayload: signNoteActionParams,
): Promise<api.ActionResult<QuickNoteSectionItem[]>> => {
  const { patientId, appointmentId, isError, signedDate, coSignedByUserId } =
    signPayload
  const auth = getAuthCookies()

  const url = new URL(api.NOTE_SIGN_ENDPOINT(patientId, appointmentId))
  if (isError) url.searchParams.append('errormark', 'true')

  const response = await api.PUT<QuickNoteSectionItem[]>(url.toString(), {
    patientId: parseInt(patientId),
    appointmentId: parseInt(appointmentId),
    signedByUserId: auth?.user.userId ? parseInt(auth?.user.userId) : undefined,
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
