'use server'

import * as api from '@/api'
import { Code } from '@/ui/assigning-authorities/types'
import { sanitizeFormData } from '@/utils'

const addCodesetCode = async (
  payload: Code & { assigningAuthorityId: string },
): Promise<api.ActionResult<Code>> => {
  const { assigningAuthorityId, ...finalPayload } = payload

  const response = await api.POST<Code[]>(
    api.ADD_CODSET_CODE(assigningAuthorityId, payload.codesetId),
    [sanitizeFormData(finalPayload)],
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: response.data[0],
  }
}

export { addCodesetCode }
