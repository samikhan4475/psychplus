'use client'

import * as api from '@/api/api.client'
import { InboxSignNoteParams } from '../types'
import { INBOX_SIGN_NOTE_ENDPOINT } from '@/api/endpoints'

const getSignInboxNoteAction = async ({
  patientId,
  appointmentId,
  noteId,
  payload,
}: InboxSignNoteParams) => {
  const result = await api.POST(
    INBOX_SIGN_NOTE_ENDPOINT(patientId, appointmentId, noteId),
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

export { getSignInboxNoteAction }
