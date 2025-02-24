'use server'

import * as api from '@/api'
import { Code } from '@/ui/assigning-authorities/types'

const updateCodesetCode = async (
  payload: Code & { assigningAuthorityId: string },
): Promise<api.ActionResult<Code>> => {
  const { assigningAuthorityId, ...finalPayload } = payload

  const response = await api.PUT<Code>(
    api.UPDATE_CODSET_CODE(assigningAuthorityId, payload.codesetId, payload.id),
    finalPayload,
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

export { updateCodesetCode }
