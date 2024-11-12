'use server'

import * as api from '@/api'
import type { EdiItem } from '../types'

const updateEdiAction = async (
  payload: Partial<EdiItem>,
  id: string,
): Promise<api.ActionResult<EdiItem>> => {
  const response = await api.PUT<EdiItem>(
    api.UPDATE_CLEARNING_HOUSE_EDI_ENDPOINT(id),
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

export { updateEdiAction }
