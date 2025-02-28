'use server'

import * as api from '@/api'
import { AddClaimNotes } from '@/types'

const addClaimNotesAction = async (
  payload: Partial<AddClaimNotes>,
  claimId: string,
): Promise<api.ActionResult<AddClaimNotes>> => {
  const response = await api.POST<AddClaimNotes>(
    api.ADD_CLAIM_NOTES(claimId),
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

export { addClaimNotesAction }
