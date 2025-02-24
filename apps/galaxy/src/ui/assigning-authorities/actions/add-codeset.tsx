'use server'

import * as api from '@/api'
import { Codeset } from '@/ui/assigning-authorities/types'

interface AddCodesetPayload {
  assigningAuthorityId: string
  codeSystemName: string
  displayName: string
  version: string
  oid: string
  validFrom: string
  validTo: string
  sourceName: string
  sourceUrl: string
  sourceFormat: string
  sourceUpdateDays: number
}

const addCodeset = async (
  payload: AddCodesetPayload,
): Promise<api.ActionResult<Codeset>> => {
  const response = await api.POST<Codeset>(
    api.ADD_CODSET(payload.assigningAuthorityId),
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

export { addCodeset }
