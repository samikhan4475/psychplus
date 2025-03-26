'use server'

import * as api from '@/api'

const deleteLinkAccount = async (
  linkedAccountId: string,
): Promise<api.ActionResult<void>> => {
  const result = await api.DELETE(api.DELETE_PATIENT_LINKS(linkedAccountId))

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

export { deleteLinkAccount }
