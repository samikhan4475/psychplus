'use server'

import * as api from '@/api'
import { QuickNoteSectionItem } from '@/types'

interface signNoteActionParams {
  patientId: string
  appointmentId: string
  signedByUserId?: number
  signedDate?: string
  isError?: boolean
  coSignedByUserId?: string
  noteTitleCode?: string
  noteTypeCode?: string
  isAllowedFollowupForNextAvailableSlot?: boolean
  autoFollowUpDate?: string
}

interface signNoteActionPayload {
  patientId: number
  appointmentId: number
  signedByUserId?: number
  noteTitleCode?: string
  signedDate?: string
  coSignedByUserId?: string
  noteTypeCode?: string
  isAllowedFollowupForNextAvailableSlot?: boolean
  autoFollowUpDate?: string
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
    noteTitleCode,
    noteTypeCode,
    isAllowedFollowupForNextAvailableSlot,
    autoFollowUpDate,
  } = signPayload

  const url = new URL(api.NOTE_SIGN_ENDPOINT(patientId, appointmentId))
  if (isError) url.searchParams.append('errormark', 'true')
  const payload: signNoteActionPayload = {
    patientId: parseInt(patientId),
    appointmentId: parseInt(appointmentId),
    signedByUserId,
    noteTitleCode,
    signedDate,
    noteTypeCode,
  }
  const shouldAutoGenerateFollowup =
    isAllowedFollowupForNextAvailableSlot && autoFollowUpDate

  if (coSignedByUserId) {
    payload['coSignedByUserId'] = coSignedByUserId
  }

  const requestBody = shouldAutoGenerateFollowup
    ? { ...payload, isAllowedFollowupForNextAvailableSlot, autoFollowUpDate }
    : payload

  const response = await api.PUT<QuickNoteSectionItem[]>(
    url.toString(),
    requestBody,
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

export { signNoteAction }
