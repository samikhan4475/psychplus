'use server'

import * as api from '@/api'

const deleteEdiRecord = async (
  recordId: string,
): Promise<api.ActionResult<void>> => {
  const result = await api.DELETE(
    api.DELETE_CLEARNING_HOUSE_EDI_ENDPOINT(recordId),
  )

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

export { deleteEdiRecord }
