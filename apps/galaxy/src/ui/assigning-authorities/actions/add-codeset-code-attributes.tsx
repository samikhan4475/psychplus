'use server'

import * as api from '@/api'
import { CodeAttribute } from '@/ui/assigning-authorities/types'
import { sanitizeFormData } from '@/utils'

const addCodesetCodeAttributes = async (
  payload: CodeAttribute & {
    assigningAuthorityId: string
    codesetId: string
  },
): Promise<api.ActionResult<CodeAttribute>> => {
  const { assigningAuthorityId, codesetId, ...finalPayload } = payload

  const response = await api.POST<CodeAttribute[]>(
    api.ADD_CODSET_CODE_ATTRIBUTES(
      assigningAuthorityId,
      codesetId,
      payload.codeId,
    ),
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

export { addCodesetCodeAttributes }
