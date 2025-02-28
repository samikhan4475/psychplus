'use server'

import * as api from '@/api'
import { ClaimNotesFilter, ClaimNotesResponse } from '@/types'

interface GetClaimNotesListParams {
  payload: ClaimNotesFilter
}

const getClaimNotesAction = async ({
  payload,
}: GetClaimNotesListParams): Promise<
  api.ActionResult<ClaimNotesResponse[]>
> => {
  const url = new URL(api.GET_CLAIM_NOTES_LIST)

  const updatedPayload = {
    ...payload,
  }
  const response = await api.POST<ClaimNotesResponse[]>(`${url}`, {
    ...updatedPayload,
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

export { getClaimNotesAction }
