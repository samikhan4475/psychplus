'use server'

import * as api from '@/api'
import { CodeAttribute } from '@/ui/assigning-authorities/types'
import { sanitizeFormData } from '@/utils'

const updateCodesetCodeAttributes = async (
  payload: CodeAttribute & {
    assigningAuthorityId: string
    codesetId: string
  },
): Promise<api.ActionResult<CodeAttribute>> => {
  const { assigningAuthorityId, codesetId, ...finalPayload } = payload

  const response = await api.PUT<CodeAttribute>(
    api.UPDATE_CODSET_CODE_ATTRIBUTES(
      assigningAuthorityId,
      codesetId,
      payload.codeId,
      payload?.id ?? '',
    ),
    sanitizeFormData(finalPayload),
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

export { updateCodesetCodeAttributes }
