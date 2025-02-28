'use server'

import * as api from '@/api'

const deleteClaimNotesAction = async (
  noteId: string,
  claimId: string,
): Promise<api.ActionResult<void>> => {
  const result = await api.DELETE(api.DELETE_CLAIM_NOTES(noteId, claimId))

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  return {
    state: 'success',
    data: undefined,
  }
}

export { deleteClaimNotesAction }
