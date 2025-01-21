'use server'

import * as api from '@/api'
import { Addendum } from '@/ui/notes/types'

interface SaveAddendumsAgainstNoteIdActionParams {
  patientId: string
  appointmentId: string
  noteId: string
  isCoSigner: boolean
  signerDescription: string
}

const SaveAddendumsAgainstNoteIdAction = async (
  payload: SaveAddendumsAgainstNoteIdActionParams,
) => {
  const result = await api.POST<api.ActionResult<Addendum>>(
    api.SAVE_ADDENDUMS_AGAINST_NOTE_ID(
      payload.patientId,
      payload.appointmentId,
      payload.noteId,
      payload.isCoSigner,
    ),
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

export { SaveAddendumsAgainstNoteIdAction }
