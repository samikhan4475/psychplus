'use server'

import * as api from '@/api'
import { UpdateClaimNotes } from '@/types'

const updateClaimNotesAction = async (
  payload: Partial<UpdateClaimNotes>,
  claimId: string,
  claimNotesId: string,
): Promise<api.ActionResult<UpdateClaimNotes>> => {
  const response = await api.PUT<UpdateClaimNotes>(
    api.UPDATE_CLAIM_NOTES(claimId, claimNotesId),
    payload,
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

export { updateClaimNotesAction }
